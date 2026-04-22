import { Router, type IRouter } from "express";
import crypto from "node:crypto";
import Anthropic from "@anthropic-ai/sdk";
import OpenAI from "openai";
import multer from "multer";
import heicConvert from "heic-convert";
import { eq, and, sql, or, lt, gt, inArray, desc, ne } from "drizzle-orm";
import { db, orwellSubmissionsTable, orwellCoachSummariesTable, xpEventsTable, accessRequestsTable } from "@workspace/db";
import { getOrwellEntry } from "../data/orwell-catalog.js";

const SESSION_SECRET = process.env["SESSION_SECRET"] ?? "fallback-secret";

// Tiny in-process cache of approved-and-unexpired emails to avoid hitting the
// access_requests table on every request. Entries expire after 60s.
const APPROVAL_CACHE_TTL_MS = 60_000;
const approvalCache = new Map<string, number>(); // email -> expiry epoch ms

async function isStudentApproved(email: string): Promise<boolean> {
  const now = Date.now();
  const cached = approvalCache.get(email);
  if (cached !== undefined && cached > now) return true;
  const rows = await db
    .select({ status: accessRequestsTable.status, expiresAt: accessRequestsTable.expiresAt })
    .from(accessRequestsTable)
    .where(eq(accessRequestsTable.email, email))
    .limit(1);
  const row = rows[0];
  if (!row || row.status !== "approved") {
    approvalCache.delete(email);
    return false;
  }
  if (row.expiresAt && row.expiresAt.getTime() < now) {
    approvalCache.delete(email);
    return false;
  }
  // Cache for the shorter of 60s or until expiry.
  const ttlExpiry = now + APPROVAL_CACHE_TTL_MS;
  const cacheUntil = row.expiresAt ? Math.min(ttlExpiry, row.expiresAt.getTime()) : ttlExpiry;
  approvalCache.set(email, cacheUntil);
  return true;
}

async function verifyStudentEmail(req: import("express").Request): Promise<string | null> {
  const email = (req.headers["x-student-email"] as string || "").trim().toLowerCase();
  const token = (req.headers["x-student-token"] as string || "").trim();
  if (!email || !token) return null;
  const expected = crypto.createHmac("sha256", SESSION_SECRET).update(email + ":approved").digest("hex");
  // Constant-time compare to mitigate timing attacks.
  const a = Buffer.from(token, "hex");
  const b = Buffer.from(expected, "hex");
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
  if (!(await isStudentApproved(email))) return null;
  return email;
}

function getAnthropicClient() {
  const apiKey = process.env.AI_INTEGRATIONS_ANTHROPIC_API_KEY;
  const baseURL = process.env.AI_INTEGRATIONS_ANTHROPIC_BASE_URL;
  if (!apiKey || !baseURL) throw new Error("Anthropic env vars not configured.");
  return new Anthropic({ apiKey, baseURL });
}

const CATEGORIES = new Set(["task1", "task2", "paragraph", "freecheck"]);

const router: IRouter = Router();

// ── Next assignment ───────────────────────────────────────────────────────
router.get("/orwell/next", async (req, res): Promise<void> => {
  const email = await verifyStudentEmail(req);
  if (!email) { res.status(401).json({ error: "Unauthorized" }); return; }
  const category = String(req.query.category || "");
  if (!CATEGORIES.has(category)) { res.status(400).json({ error: "Invalid category" }); return; }

  const rows = await db
    .select({ id: orwellSubmissionsTable.assignmentId, status: orwellSubmissionsTable.status })
    .from(orwellSubmissionsTable)
    .where(and(
      eq(orwellSubmissionsTable.email, email),
      eq(orwellSubmissionsTable.category, category),
      // Hide in-progress "grading" rows from the client — they're not user-visible state.
      inArray(orwellSubmissionsTable.status, ["submitted", "skipped"]),
    ));

  const submittedIds = new Set(rows.filter((r) => r.status === "submitted").map((r) => r.id));
  const skippedIds = new Set(rows.filter((r) => r.status === "skipped").map((r) => r.id));
  res.json({ submittedIds: [...submittedIds], skippedIds: [...skippedIds] });
});

// ── Skip assignment ───────────────────────────────────────────────────────
router.post("/orwell/skip", async (req, res): Promise<void> => {
  const email = await verifyStudentEmail(req);
  if (!email) { res.status(401).json({ error: "Unauthorized" }); return; }
  const { assignmentId, category } = req.body as { assignmentId: string; category: string };
  if (!assignmentId || !CATEGORIES.has(category)) { res.status(400).json({ error: "Invalid payload" }); return; }
  const entry = getOrwellEntry(assignmentId);
  if (!entry || entry.category !== category) {
    res.status(400).json({ error: "Unknown assignment" });
    return;
  }

  // Only record skip if not already submitted/grading
  await db
    .insert(orwellSubmissionsTable)
    .values({ email, assignmentId, category, status: "skipped" })
    .onConflictDoNothing({ target: [orwellSubmissionsTable.email, orwellSubmissionsTable.assignmentId] });

  res.json({ ok: true });
});

// ── Submit assignment ─────────────────────────────────────────────────────
const ESSAY_SYSTEM_PROMPT = `You are Orwell AI, a strict certified IELTS examiner following British Council official band descriptors.

NEVER inflate scores. Most intermediate students score between 4.5 and 6.0 — this is normal. Be honest and strict.

STEP 1 — WORD COUNT CHECK:
- Task 1 under 150 words → wordCountWarning message + deduct 0.5 from Task Achievement
- Task 2 under 250 words → wordCountWarning message + deduct 0.5 from Task Response
- Otherwise wordCountWarning = null

STEP 2 — EVALUATE using official IELTS criteria:
- Task 1: Task Achievement (TA), Coherence & Cohesion (CC), Lexical Resource (LR), Grammatical Range & Accuracy (GRA)
- Task 2: Task Response (TR), Coherence & Cohesion (CC), Lexical Resource (LR), Grammatical Range & Accuracy (GRA)

STRICT PENALTIES:
- No overview in Task 1 = MAX Band 5 for TA
- No clear position in Task 2 = MAX Band 5 for TR
- Simple/basic vocabulary only = MAX Band 5 for LR
- Only simple sentences = MAX Band 5 for GRA
- Under word count = −0.5 from TA/TR
- Overall band = average of 4 criteria, rounded to nearest 0.5

The student has been given a specific assignment (prompt) — grade how well their writing addresses THAT prompt.

Return ONLY a valid JSON object, no markdown:
{
  "taskType": "Task 1 or Task 2",
  "wordCount": 187,
  "wordCountWarning": null,
  "overallBand": 5.5,
  "scores": {
    "taskResponse": { "band": 5.5, "feedback": "..." },
    "coherenceCohesion": { "band": 5.5, "feedback": "..." },
    "lexicalResource": { "band": 5.0, "feedback": "..." },
    "grammaticalRange": { "band": 5.5, "feedback": "..." }
  },
  "grammarErrors": [{"original": "...", "correction": "...", "explanation": "...", "type": "grammar"}],
  "vocabularyUpgrades": [{"original": "...", "better": "...", "example": "...", "reason": "..."}],
  "coherenceIssues": [{"original": "...", "correction": "...", "explanation": "..."}],
  "strengths": ["..."],
  "improvements": ["..."],
  "revisedIntroduction": "...",
  "exampleEssayBand6": "Full essay at Band 5.5-6 level addressing the SAME assignment prompt.",
  "exampleEssayBand8": "Full essay at Band 7-8 level addressing the SAME assignment prompt."
}

IMPORTANT:
- grammarErrors/vocabularyUpgrades/coherenceIssues.original must be EXACT phrase from the essay so it can be highlighted.
- exampleEssayBand6 and exampleEssayBand8 must be COMPLETE full essays addressing the assignment prompt.
- Grammar explanations must include the underlying rule.
- After each criterion feedback, add one short Arabic tip in parentheses.`;

const PARAGRAPH_SYSTEM_PROMPT = `You are an expert English writing coach.
The student has been given a specific paragraph/letter/email assignment. Evaluate their response.
Do NOT apply IELTS band score criteria. Evaluate on Grammar, Punctuation, Vocabulary, Coherence, and whether they addressed the bullet-point requirements.

Return ONLY a valid JSON object:
{
  "strengths": "Clear list with • bullets of what the student did well, including whether they covered the required points.",
  "improvements": "Clear list using ❌ original → ✅ correction format.",
  "corrections": [{"original": "...", "correction": "...", "explanation": "...", "type": "Grammar"}],
  "corrected": "Original text fully corrected, student's voice preserved.",
  "better": "Improved version with richer vocabulary and varied structures.",
  "formal": "Professional/formal version."
}
- type must be exactly Grammar, Vocabulary or Coherence.
- original must be the EXACT phrase as it appears in the student's text so it can be highlighted.
- No markdown, no extra text.`;

// ── Free Check abuse guards ──────────────────────────────────────────────
// Free Check has no DB lock or XP, so each request is a free pass to call
// Anthropic. Without a guard, an approved student could hammer concurrent
// streams and amplify our cost. We enforce two in-process limits per email:
//   - max 1 concurrent active stream (any further request → 429)
//   - max 5 completed/started requests per rolling 60s window (→ 429)
//   - max ~6000 chars of input text (avoids huge prompt-token bills)
const FREECHECK_MAX_CONCURRENT_PER_EMAIL = 1;
const FREECHECK_RATE_WINDOW_MS = 60_000;
const FREECHECK_RATE_MAX = 5;
const FREECHECK_MAX_INPUT_CHARS = 6000;
const freeCheckActive = new Map<string, number>(); // email → in-flight count
const freeCheckRecent = new Map<string, number[]>(); // email → request start timestamps

function freeCheckTryAcquire(email: string): { ok: true } | { ok: false; reason: string; retryAfterMs?: number } {
  const now = Date.now();
  const recent = (freeCheckRecent.get(email) ?? []).filter((t) => now - t < FREECHECK_RATE_WINDOW_MS);
  if (recent.length >= FREECHECK_RATE_MAX) {
    const retryAfterMs = FREECHECK_RATE_WINDOW_MS - (now - recent[0]!);
    freeCheckRecent.set(email, recent);
    return { ok: false, reason: "Free Check is rate-limited. Please wait a moment and try again.", retryAfterMs };
  }
  const active = freeCheckActive.get(email) ?? 0;
  if (active >= FREECHECK_MAX_CONCURRENT_PER_EMAIL) {
    return { ok: false, reason: "You already have a Free Check in progress. Please wait for it to finish." };
  }
  recent.push(now);
  freeCheckRecent.set(email, recent);
  freeCheckActive.set(email, active + 1);
  return { ok: true };
}

function freeCheckRelease(email: string): void {
  const active = freeCheckActive.get(email) ?? 0;
  if (active <= 1) freeCheckActive.delete(email);
  else freeCheckActive.set(email, active - 1);
}

// ── Free Check system prompts ────────────────────────────────────────────
// No fixed assignment — the student pasted their own writing. The student
// chooses which rubric to grade against: Task 1, Task 2, or Paragraph.

const FREECHECK_TASK2_PROMPT = `You are Orwell AI, a strict certified IELTS examiner following British Council official band descriptors.

NEVER inflate scores. Most intermediate students score between 4.5 and 6.0 — this is normal. Be honest and strict.

The student has NOT been given a specific assignment. They have pasted a piece of their own writing and asked you to grade it as an IELTS Task 2 essay (opinion / discussion / problem-solution).

EVALUATE using official IELTS Task 2 criteria:
- Task Response (TR) — does the writing have a clear position, develop ideas, and stay on topic?
- Coherence & Cohesion (CC)
- Lexical Resource (LR)
- Grammatical Range & Accuracy (GRA)

STRICT PENALTIES:
- No clear position or purpose = MAX Band 5 for TR
- Simple/basic vocabulary only = MAX Band 5 for LR
- Only simple sentences = MAX Band 5 for GRA
- Overall band = average of 4 criteria, rounded to nearest 0.5

Word-count guidance:
- If under ~250 words, set wordCountWarning to a short note ("This piece is shorter than a full IELTS Task 2 essay — aim for at least 250 words.")
- Otherwise wordCountWarning = null
- Do NOT deduct band marks for length in Free Check mode (the student chose what to submit).

Return ONLY a valid JSON object, no markdown:
{
  "taskType": "Task 2",
  "wordCount": 187,
  "wordCountWarning": null,
  "overallBand": 5.5,
  "scores": {
    "taskResponse": { "band": 5.5, "feedback": "..." },
    "coherenceCohesion": { "band": 5.5, "feedback": "..." },
    "lexicalResource": { "band": 5.0, "feedback": "..." },
    "grammaticalRange": { "band": 5.5, "feedback": "..." }
  },
  "grammarErrors": [{"original": "...", "correction": "...", "explanation": "...", "type": "grammar"}],
  "vocabularyUpgrades": [{"original": "...", "better": "...", "example": "...", "reason": "..."}],
  "coherenceIssues": [{"original": "...", "correction": "...", "explanation": "..."}],
  "strengths": ["..."],
  "improvements": ["..."],
  "revisedIntroduction": "A rewritten opening that demonstrates a stronger version of the same idea.",
  "exampleEssayBand6": "A version of the SAME piece rewritten at Band 5.5–6 level, preserving the student's topic and intent.",
  "exampleEssayBand8": "A version of the SAME piece rewritten at Band 7–8 level, preserving the student's topic and intent."
}

IMPORTANT:
- grammarErrors/vocabularyUpgrades/coherenceIssues.original must be EXACT phrase from the writing so it can be highlighted.
- exampleEssayBand6 and exampleEssayBand8 must be COMPLETE rewrites of the student's piece.
- Grammar explanations must include the underlying rule.
- After each criterion feedback, add one short Arabic tip in parentheses.`;

const FREECHECK_TASK1_PROMPT = `You are Orwell AI, a strict certified IELTS examiner following British Council official band descriptors.

NEVER inflate scores. Most intermediate students score between 4.5 and 6.0 — this is normal. Be honest and strict.

The student has NOT been given a specific assignment or a chart. They have pasted a piece of their own writing and asked you to grade it as an IELTS Task 1 (academic report or general training letter).

EVALUATE using official IELTS Task 1 criteria. Use the SAME JSON keys as Task 2 grading so the client can render results consistently:
- Task Achievement (TA) — report this in the "taskResponse" key
- Coherence & Cohesion (CC) — "coherenceCohesion"
- Lexical Resource (LR) — "lexicalResource"
- Grammatical Range & Accuracy (GRA) — "grammaticalRange"

STRICT PENALTIES:
- No clear overview / no clear purpose = MAX Band 5 for Task Achievement
- Simple/basic vocabulary only = MAX Band 5 for LR
- Only simple sentences = MAX Band 5 for GRA
- Overall band = average of 4 criteria, rounded to nearest 0.5

Free Check note: because no chart or letter scenario was provided, do NOT penalise the student for missing data references — judge their writing on what they produced, the structure, the language, and the inferred purpose.

Word-count guidance:
- If under ~150 words, set wordCountWarning to a short note ("This piece is shorter than a full IELTS Task 1 — aim for at least 150 words.")
- Otherwise wordCountWarning = null
- Do NOT deduct band marks for length in Free Check mode.

Return ONLY a valid JSON object, no markdown:
{
  "taskType": "Task 1",
  "wordCount": 152,
  "wordCountWarning": null,
  "overallBand": 5.5,
  "scores": {
    "taskResponse": { "band": 5.5, "feedback": "Task Achievement feedback…" },
    "coherenceCohesion": { "band": 5.5, "feedback": "..." },
    "lexicalResource": { "band": 5.0, "feedback": "..." },
    "grammaticalRange": { "band": 5.5, "feedback": "..." }
  },
  "grammarErrors": [{"original": "...", "correction": "...", "explanation": "...", "type": "grammar"}],
  "vocabularyUpgrades": [{"original": "...", "better": "...", "example": "...", "reason": "..."}],
  "coherenceIssues": [{"original": "...", "correction": "...", "explanation": "..."}],
  "strengths": ["..."],
  "improvements": ["..."],
  "revisedIntroduction": "A rewritten opening that demonstrates a stronger version of the same idea.",
  "exampleEssayBand6": "A version of the SAME piece rewritten at Band 5.5–6 level (Task 1 style), preserving the student's topic and intent.",
  "exampleEssayBand8": "A version of the SAME piece rewritten at Band 7–8 level (Task 1 style), preserving the student's topic and intent."
}

IMPORTANT:
- grammarErrors/vocabularyUpgrades/coherenceIssues.original must be EXACT phrase from the writing so it can be highlighted.
- exampleEssayBand6 and exampleEssayBand8 must be COMPLETE rewrites of the student's piece in IELTS Task 1 style.
- Grammar explanations must include the underlying rule.
- After each criterion feedback, add one short Arabic tip in parentheses.`;

const FREECHECK_PARAGRAPH_PROMPT = `You are an expert English writing coach.

The student has NOT been given a specific assignment. They have pasted a paragraph, letter, email, or short text and asked for general writing feedback. Do NOT apply IELTS band score criteria. Evaluate on Grammar, Punctuation, Vocabulary, and Coherence.

Return ONLY a valid JSON object:
{
  "strengths": "Clear list with • bullets of what the student did well.",
  "improvements": "Clear list using ❌ original → ✅ correction format.",
  "corrections": [{"original": "...", "correction": "...", "explanation": "...", "type": "Grammar"}],
  "corrected": "Original text fully corrected, student's voice preserved.",
  "better": "Improved version with richer vocabulary and varied structures.",
  "formal": "Professional/formal version."
}
- type must be exactly Grammar, Vocabulary or Coherence.
- original must be the EXACT phrase as it appears in the student's text so it can be highlighted.
- No markdown, no extra text.`;

type FreeCheckMode = "task1" | "task2" | "paragraph";

// Stream a Free Check grading directly back to the client over SSE. No DB
// persistence, no concurrency lock, no XP — each request is independent.
async function streamFreeCheck(
  res: import("express").Response,
  req: import("express").Request,
  text: string,
  mode: FreeCheckMode,
  email: string,
): Promise<void> {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("X-Accel-Buffering", "no");
  res.flushHeaders?.();

  const sseSend = (payload: Record<string, unknown>) => {
    res.write(`data: ${JSON.stringify(payload)}\n\n`);
  };

  let clientGone = false;
  req.on("close", () => { clientGone = true; });

  let fullText = "";
  let parsed: Record<string, unknown>;
  try {
    const anthropic = getAnthropicClient();

    let systemPrompt: string;
    let userMessage: string;
    let maxTokens: number;
    if (mode === "paragraph") {
      systemPrompt = FREECHECK_PARAGRAPH_PROMPT;
      userMessage = `The student has pasted the following text and would like writing feedback. There is no fixed assignment.\n\nStudent's writing:\n${text}`;
      maxTokens = 4096;
    } else if (mode === "task1") {
      systemPrompt = FREECHECK_TASK1_PROMPT;
      userMessage = `The student has pasted the following piece of writing and would like Orwell AI to grade it as an IELTS Task 1 response. There is no fixed assignment or chart — judge their writing on its own merits.\n\nStudent's writing:\n${text}`;
      maxTokens = 8192;
    } else {
      systemPrompt = FREECHECK_TASK2_PROMPT;
      userMessage = `The student has pasted the following piece of writing and would like Orwell AI to grade it as an IELTS Task 2 essay. There is no fixed assignment — evaluate it on its own merits.\n\nStudent's writing:\n${text}`;
      maxTokens = 8192;
    }

    const stream = anthropic.messages.stream({
      model: "claude-sonnet-4-6",
      max_tokens: maxTokens,
      system: systemPrompt,
      messages: [{ role: "user", content: userMessage }],
    });

    for await (const event of stream) {
      if (clientGone) break;
      if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
        const chunk = event.delta.text;
        fullText += chunk;
        sseSend({ delta: chunk });
      }
    }

    if (clientGone) {
      try { res.end(); } catch { /* already closed */ }
      return;
    }

    try { parsed = JSON.parse(fullText); }
    catch {
      const m = fullText.match(/\{[\s\S]*\}/);
      if (!m) throw new Error("Could not parse AI response");
      parsed = JSON.parse(m[0]);
    }
  } catch (err) {
    console.error("Orwell free-check error:", err);
    sseSend({ error: "AI grading failed. Please try again." });
    res.end();
    return;
  }

  // Stamp a deterministic taskType label so the client can route to the right
  // result layout without trusting the model's free-text output.
  const stampLabel = mode === "task1" ? "Task 1" : mode === "task2" ? "Task 2" : "Paragraph";
  (parsed as { taskType?: string }).taskType = stampLabel;
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;

  // Persist this Free Check as a history row so the student can see it later.
  // Use a unique random assignmentId since Free Check has no canonical assignment.
  try {
    const overall = (parsed as { overallBand?: number }).overallBand ?? null;
    const assignmentId = `freecheck-${Date.now()}-${crypto.randomBytes(6).toString("hex")}`;
    await db.insert(orwellSubmissionsTable).values({
      email,
      assignmentId,
      category: "freecheck",
      status: "submitted",
      band: typeof overall === "number" ? overall : null,
      wordCount,
      text,
      feedback: JSON.stringify(parsed),
      taskTypeLabel: `Free Check (${stampLabel})`,
      prompt: null,
    });
  } catch (err) {
    console.error("Failed to persist free-check submission:", err);
  }

  sseSend({ done: { ...parsed, wordCount, mode } });
  res.end();
}

// ── OCR for handwritten essays (Free Check photo upload) ──────────────────
// Accepts JPG / JPEG / PNG / HEIC / HEIF up to 10 MB.
// HEIC/HEIF (iPhone) is auto-converted to JPEG before sending to OpenAI Vision.
const OCR_MAX_BYTES = 10 * 1024 * 1024; // 10 MB
const OCR_ALLOWED_MIME = new Set([
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/heic",
  "image/heif",
]);

const ocrUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: OCR_MAX_BYTES, files: 1 },
  fileFilter: (_req, file, cb) => {
    const m = (file.mimetype || "").toLowerCase();
    const ext = (file.originalname || "").toLowerCase().split(".").pop() ?? "";
    if (OCR_ALLOWED_MIME.has(m) || ["jpg", "jpeg", "png", "heic", "heif"].includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error("unsupported_format"));
    }
  },
});

// In-memory throttle so a single student can't burn unlimited Vision credits.
const ocrInFlight = new Map<string, number>(); // email -> startedAt
const OCR_LOCK_TIMEOUT_MS = 60_000;
function ocrTryAcquire(email: string): boolean {
  const now = Date.now();
  const existing = ocrInFlight.get(email);
  if (existing !== undefined && now - existing < OCR_LOCK_TIMEOUT_MS) return false;
  ocrInFlight.set(email, now);
  return true;
}
function ocrRelease(email: string) { ocrInFlight.delete(email); }

router.post("/orwell/ocr", ocrUpload.single("image"), async (req, res): Promise<void> => {
  const email = await verifyStudentEmail(req);
  if (!email) { res.status(401).json({ error: "Unauthorized" }); return; }

  const file = req.file;
  if (!file || !file.buffer || file.buffer.length === 0) {
    res.status(400).json({ error: "No image uploaded." });
    return;
  }

  if (!ocrTryAcquire(email)) {
    res.status(429).json({ error: "Another upload is still being processed. Please wait." });
    return;
  }

  try {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      res.status(500).json({ error: "OpenAI API key not configured." });
      return;
    }

    let imageBuffer = file.buffer;
    let mimeType = (file.mimetype || "").toLowerCase();
    const lowerName = (file.originalname || "").toLowerCase();
    const isHeic =
      mimeType === "image/heic" ||
      mimeType === "image/heif" ||
      lowerName.endsWith(".heic") ||
      lowerName.endsWith(".heif");

    if (isHeic) {
      try {
        const converted = await heicConvert({
          // heic-convert accepts an ArrayBuffer-like — pass the underlying ArrayBuffer
          buffer: imageBuffer as unknown as ArrayBufferLike,
          format: "JPEG",
          quality: 0.92,
        });
        imageBuffer = Buffer.from(converted);
        mimeType = "image/jpeg";
      } catch (err) {
        console.error("HEIC conversion failed:", err);
        res.status(400).json({ error: "Could not read this HEIC photo. Try saving it as JPEG and uploading again." });
        return;
      }
    } else if (mimeType === "image/jpg") {
      mimeType = "image/jpeg";
    } else if (!mimeType.startsWith("image/")) {
      // Best-effort fallback when browser didn't send a mime
      mimeType = "image/jpeg";
    }

    const dataUrl = `data:${mimeType};base64,${imageBuffer.toString("base64")}`;

    const openai = new OpenAI({ apiKey });
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      max_tokens: 4000,
      temperature: 0,
      messages: [
        {
          role: "system",
          content:
            "You are an OCR engine that transcribes handwritten English essays from photos. " +
            "Output ONLY the transcribed text — no commentary, no explanations, no markdown. " +
            "Preserve original line breaks between paragraphs. " +
            "If a word is unreadable, write [?]. If the photo contains no readable English text, output exactly: NO_TEXT_FOUND",
        },
        {
          role: "user",
          content: [
            { type: "text", text: "Transcribe the handwritten essay in this photo exactly as written." },
            { type: "image_url", image_url: { url: dataUrl, detail: "high" } },
          ],
        },
      ],
    });

    const raw = completion.choices[0]?.message?.content ?? "";
    const text = (typeof raw === "string" ? raw : "").trim();

    if (!text || text === "NO_TEXT_FOUND") {
      res.status(422).json({ error: "Couldn't read any text from this photo. Try a clearer, better-lit picture." });
      return;
    }

    const wordCount = text.split(/\s+/).filter(Boolean).length;
    res.json({ text, wordCount });
  } catch (err: unknown) {
    const status = (err as { status?: number })?.status;
    if (status === 429) {
      res.status(429).json({ error: "Vision service is busy. Please try again in a moment." });
      return;
    }
    if (status === 401 || status === 402) {
      res.status(502).json({ error: "Vision service is unavailable right now." });
      return;
    }
    console.error("OCR failed:", err);
    res.status(500).json({ error: "Could not extract text from that photo. Please try again." });
  } finally {
    ocrRelease(email);
  }
});

// Multer error handler — converts file-too-large / wrong-type into clean JSON.
router.use("/orwell/ocr", (err: unknown, _req: import("express").Request, res: import("express").Response, next: import("express").NextFunction) => {
  if (err && typeof err === "object" && "code" in err) {
    const code = (err as { code?: string }).code;
    if (code === "LIMIT_FILE_SIZE") {
      res.status(413).json({ error: "Image is too large. Maximum size is 10 MB." });
      return;
    }
  }
  if (err instanceof Error && err.message === "unsupported_format") {
    res.status(415).json({ error: "Unsupported file format. Please upload JPG, JPEG, PNG, or HEIC." });
    return;
  }
  next(err);
});

// How long a "grading" lock is allowed to stay before another request can take it over.
// Anthropic calls typically finish in <30s; 5 minutes is a generous safety net.
const GRADING_LOCK_TIMEOUT_MS = 5 * 60 * 1000;

router.post("/orwell/submit", async (req, res): Promise<void> => {
  const email = await verifyStudentEmail(req);
  if (!email) { res.status(401).json({ error: "Unauthorized" }); return; }

  const { assignmentId, text, taskType, category: bodyCategory, mode: bodyMode } = req.body as {
    assignmentId?: string;
    text?: string;
    taskType?: string;
    category?: string;
    mode?: string;
  };

  if (!text || typeof text !== "string" || text.trim().length < 10) {
    res.status(400).json({ error: "Missing or invalid payload." });
    return;
  }

  // ── Free Check mode ────────────────────────────────────────────────────
  // Student pasted arbitrary writing — no assignmentId, no canonical prompt,
  // no DB persistence (so it can't be tracked/farmed for XP) and no concurrency
  // lock (each request is independent). We still stream feedback the same way.
  const isFreeCheck = bodyCategory === "freecheck";
  if (isFreeCheck) {
    if (text.length > FREECHECK_MAX_INPUT_CHARS) {
      res.status(413).json({
        error: `Free Check input is too long (${text.length} chars). Maximum is ${FREECHECK_MAX_INPUT_CHARS}.`,
      });
      return;
    }
    // Validate the chosen rubric. Default to Task 2 if missing/invalid for
    // backward compatibility with the very first Free Check release.
    const allowedModes: FreeCheckMode[] = ["task1", "task2", "paragraph"];
    const mode: FreeCheckMode = (allowedModes as string[]).includes(bodyMode ?? "")
      ? (bodyMode as FreeCheckMode)
      : "task2";
    const slot = freeCheckTryAcquire(email);
    if (!slot.ok) {
      if (slot.retryAfterMs) res.setHeader("Retry-After", String(Math.ceil(slot.retryAfterMs / 1000)));
      res.status(429).json({ error: slot.reason });
      return;
    }
    try {
      await streamFreeCheck(res, req, text, mode, email);
    } finally {
      freeCheckRelease(email);
    }
    return;
  }
  // Silence unused-var warning when bodyMode is only consumed in freecheck branch
  void taskType;

  if (!assignmentId || typeof assignmentId !== "string") {
    res.status(400).json({ error: "Missing or invalid payload." });
    return;
  }

  // Server-side validation against canonical catalog.
  const entry = getOrwellEntry(assignmentId);
  if (!entry) {
    res.status(400).json({ error: "Unknown assignment." });
    return;
  }
  const category = entry.category;
  const prompt = entry.prompt; // canonical prompt — ignore any client-supplied prompt

  // ── Idempotency / concurrency lock ─────────────────────────────────────
  // Atomically claim a "grading" slot. We take ownership only when there is
  // no row yet, OR the row is "skipped", OR the row is a stale "grading"
  // older than GRADING_LOCK_TIMEOUT_MS. Otherwise (status='submitted' or
  // a fresh 'grading' from a concurrent request) the upsert no-ops and we
  // return 409.
  const staleCutoff = new Date(Date.now() - GRADING_LOCK_TIMEOUT_MS);
  const claim = await db
    .insert(orwellSubmissionsTable)
    .values({ email, assignmentId, category, status: "grading" })
    .onConflictDoUpdate({
      target: [orwellSubmissionsTable.email, orwellSubmissionsTable.assignmentId],
      set: { status: "grading", category, createdAt: new Date() },
      setWhere: or(
        eq(orwellSubmissionsTable.status, "skipped"),
        and(
          eq(orwellSubmissionsTable.status, "grading"),
          lt(orwellSubmissionsTable.createdAt, staleCutoff),
        ),
      ),
    })
    .returning({ id: orwellSubmissionsTable.id });

  if (claim.length === 0) {
    // Either already submitted or another request is currently grading it.
    const [existing] = await db
      .select({ status: orwellSubmissionsTable.status })
      .from(orwellSubmissionsTable)
      .where(and(
        eq(orwellSubmissionsTable.email, email),
        eq(orwellSubmissionsTable.assignmentId, assignmentId),
      ))
      .limit(1);
    if (existing?.status === "submitted") {
      res.status(409).json({ error: "This assignment has already been submitted." });
    } else {
      res.status(409).json({ error: "This assignment is currently being graded. Please wait a moment and try again." });
    }
    return;
  }

  // ── Stream the AI response back to the client via SSE ──────────────────
  // We accumulate the full text server-side (we still need it to extract JSON
  // for parsing/XP/persistence), but we forward each delta to the client so
  // the UI can render the response as it's generated, instead of waiting for
  // the full payload.
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("X-Accel-Buffering", "no"); // disable proxy buffering
  res.flushHeaders?.();

  const sseSend = (payload: Record<string, unknown>) => {
    res.write(`data: ${JSON.stringify(payload)}\n\n`);
  };

  // Releases the grading lock so the student can retry. Best-effort.
  const releaseLock = async () => {
    try {
      await db
        .delete(orwellSubmissionsTable)
        .where(and(
          eq(orwellSubmissionsTable.email, email),
          eq(orwellSubmissionsTable.assignmentId, assignmentId),
          eq(orwellSubmissionsTable.status, "grading"),
        ));
    } catch (cleanupErr) {
      console.error("Failed to release Orwell grading lock:", cleanupErr);
    }
  };

  // If the client disconnects mid-stream, abort the AI call and release lock.
  let clientGone = false;
  req.on("close", () => { clientGone = true; });

  let fullText = "";
  let parsed: Record<string, unknown>;
  try {
    const anthropic = getAnthropicClient();
    const isParagraph = category === "paragraph";
    const taskLabel = taskType || (category === "task1" ? "Task 1" : "Task 2");
    const systemPrompt = isParagraph ? PARAGRAPH_SYSTEM_PROMPT : ESSAY_SYSTEM_PROMPT;
    const userMessage = isParagraph
      ? `Assignment:\n${prompt}\n\nStudent's response:\n${text}`
      : `Assignment:\n${prompt}\n\nStudent's ${taskLabel} response:\n${text}`;

    const stream = anthropic.messages.stream({
      model: "claude-sonnet-4-6",
      max_tokens: isParagraph ? 4096 : 8192,
      system: systemPrompt,
      messages: [{ role: "user", content: userMessage }],
    });

    for await (const event of stream) {
      if (clientGone) break;
      if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
        const chunk = event.delta.text;
        fullText += chunk;
        sseSend({ delta: chunk });
      }
    }

    if (clientGone) {
      await releaseLock();
      try { res.end(); } catch { /* already closed */ }
      return;
    }

    try { parsed = JSON.parse(fullText); }
    catch {
      const m = fullText.match(/\{[\s\S]*\}/);
      if (!m) throw new Error("Could not parse AI response");
      parsed = JSON.parse(m[0]);
    }
  } catch (err) {
    console.error("Orwell submit error:", err);
    await releaseLock();
    sseSend({ error: "AI grading failed. Please try again." });
    res.end();
    return;
  }

  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  const scores = (parsed as { scores?: { taskResponse?: { band?: number } } }).scores;
  const band = typeof scores?.taskResponse?.band === "number" ? scores.taskResponse.band : null;
  const overallBand = typeof (parsed as { overallBand?: number }).overallBand === "number"
    ? (parsed as { overallBand: number }).overallBand
    : band;

  // Promote our grading lock to a finalized submission. Only update rows we own
  // (status='grading') so a concurrent finalize from elsewhere can't be clobbered.
  const taskLabelForRow = category === "task1" ? "Task 1"
    : category === "task2" ? "Task 2"
    : "Paragraph";
  const finalize = await db
    .update(orwellSubmissionsTable)
    .set({
      status: "submitted",
      band: overallBand ?? null,
      wordCount,
      text,
      feedback: JSON.stringify(parsed),
      taskTypeLabel: taskLabelForRow,
      prompt,
      createdAt: new Date(),
    })
    .where(and(
      eq(orwellSubmissionsTable.email, email),
      eq(orwellSubmissionsTable.assignmentId, assignmentId),
      eq(orwellSubmissionsTable.status, "grading"),
    ))
    .returning({ id: orwellSubmissionsTable.id });

  if (finalize.length === 0) {
    // Lock was stolen by a stale-takeover or already finalized; don't double-award XP.
    sseSend({ done: { ...parsed, wordCount } });
    res.end();
    return;
  }

  // Award XP (capped at 20/day for essay_check)
  try {
    const todayStart = new Date(); todayStart.setHours(0, 0, 0, 0);
    const [todayRow] = await db
      .select({ total: sql<number>`coalesce(sum(${xpEventsTable.xp}),0)::int` })
      .from(xpEventsTable)
      .where(and(
        eq(xpEventsTable.email, email),
        eq(xpEventsTable.activity, "essay_check"),
        sql`${xpEventsTable.createdAt} >= ${todayStart}`,
      ));
    const todayActivity = todayRow?.total ?? 0;
    const cap = 20;
    const awarded = Math.max(0, Math.min(10, cap - todayActivity));
    if (awarded > 0) {
      await db.insert(xpEventsTable).values({ email, activity: "essay_check", xp: awarded });
    }
  } catch (err) {
    console.error("XP award failed:", err);
  }

  sseSend({ done: { ...parsed, wordCount } });
  res.end();
});

// ── Progress ─────────────────────────────────────────────────────────────
router.get("/orwell/progress", async (req, res): Promise<void> => {
  const email = await verifyStudentEmail(req);
  if (!email) { res.status(401).json({ error: "Unauthorized" }); return; }

  const rows = await db
    .select({
      category: orwellSubmissionsTable.category,
      status: orwellSubmissionsTable.status,
    })
    .from(orwellSubmissionsTable)
    .where(eq(orwellSubmissionsTable.email, email));

  const progress: Record<string, { submitted: number; skipped: number }> = {
    task1: { submitted: 0, skipped: 0 },
    task2: { submitted: 0, skipped: 0 },
    paragraph: { submitted: 0, skipped: 0 },
  };
  for (const r of rows) {
    const cat = progress[r.category];
    if (!cat) continue;
    if (r.status === "submitted") cat.submitted++;
    else if (r.status === "skipped") cat.skipped++;
  }
  res.json(progress);
});

// ── Writing History ─────────────────────────────────────────────────────
// Helpers used by both student-facing and admin-facing history endpoints.

const HISTORY_CATEGORIES = ["task1", "task2", "paragraph", "freecheck"] as const;
type HistoryCategory = typeof HISTORY_CATEGORIES[number];

interface HistoryListItem {
  id: number;
  category: string;
  taskTypeLabel: string | null;
  band: number | null;
  wordCount: number | null;
  createdAt: string;
  preview: string;
  hasFeedback: boolean;
}

async function fetchHistoryList(emailParam: string): Promise<HistoryListItem[]> {
  const rows = await db
    .select({
      id: orwellSubmissionsTable.id,
      category: orwellSubmissionsTable.category,
      taskTypeLabel: orwellSubmissionsTable.taskTypeLabel,
      band: orwellSubmissionsTable.band,
      wordCount: orwellSubmissionsTable.wordCount,
      text: orwellSubmissionsTable.text,
      feedback: orwellSubmissionsTable.feedback,
      createdAt: orwellSubmissionsTable.createdAt,
    })
    .from(orwellSubmissionsTable)
    .where(and(
      eq(orwellSubmissionsTable.email, emailParam),
      eq(orwellSubmissionsTable.status, "submitted"),
    ))
    .orderBy(desc(orwellSubmissionsTable.createdAt))
    .limit(500);

  return rows.map((r) => ({
    id: r.id,
    category: r.category,
    taskTypeLabel: r.taskTypeLabel,
    band: r.band,
    wordCount: r.wordCount,
    createdAt: r.createdAt.toISOString(),
    preview: (r.text ?? "").slice(0, 140).trim(),
    hasFeedback: !!r.feedback,
  }));
}

interface ChartPoint { date: string; band: number; }
interface ChartSeries {
  task1: ChartPoint[];
  task2: ChartPoint[];
  paragraph: ChartPoint[];
  freecheck: ChartPoint[];
}

async function fetchHistoryChart(emailParam: string): Promise<ChartSeries> {
  const rows = await db
    .select({
      category: orwellSubmissionsTable.category,
      band: orwellSubmissionsTable.band,
      createdAt: orwellSubmissionsTable.createdAt,
    })
    .from(orwellSubmissionsTable)
    .where(and(
      eq(orwellSubmissionsTable.email, emailParam),
      eq(orwellSubmissionsTable.status, "submitted"),
    ))
    .orderBy(orwellSubmissionsTable.createdAt);

  const out: ChartSeries = { task1: [], task2: [], paragraph: [], freecheck: [] };
  for (const r of rows) {
    if (typeof r.band !== "number") continue;
    const bucket = (out as Record<string, ChartPoint[]>)[r.category];
    if (!bucket) continue;
    bucket.push({ date: r.createdAt.toISOString(), band: r.band });
  }
  return out;
}

async function fetchHistoryDetail(emailParam: string, id: number) {
  const [row] = await db
    .select()
    .from(orwellSubmissionsTable)
    .where(and(
      eq(orwellSubmissionsTable.id, id),
      eq(orwellSubmissionsTable.email, emailParam),
      eq(orwellSubmissionsTable.status, "submitted"),
    ))
    .limit(1);
  if (!row) return null;
  let feedback: unknown = null;
  if (row.feedback) {
    try { feedback = JSON.parse(row.feedback); } catch { feedback = null; }
  }
  let compareReport: unknown = null;
  if (row.compareReport) {
    try { compareReport = JSON.parse(row.compareReport); } catch { compareReport = null; }
  }
  return {
    id: row.id,
    category: row.category,
    taskTypeLabel: row.taskTypeLabel,
    band: row.band,
    wordCount: row.wordCount,
    text: row.text,
    prompt: row.prompt,
    feedback,
    compareReport,
    createdAt: row.createdAt.toISOString(),
  };
}

router.get("/orwell/history", async (req, res): Promise<void> => {
  const email = await verifyStudentEmail(req);
  if (!email) { res.status(401).json({ error: "Unauthorized" }); return; }
  const items = await fetchHistoryList(email);
  res.json({ items });
});

router.get("/orwell/history/chart", async (req, res): Promise<void> => {
  const email = await verifyStudentEmail(req);
  if (!email) { res.status(401).json({ error: "Unauthorized" }); return; }
  const series = await fetchHistoryChart(email);
  res.json(series);
});

router.get("/orwell/history/:id", async (req, res): Promise<void> => {
  const email = await verifyStudentEmail(req);
  if (!email) { res.status(401).json({ error: "Unauthorized" }); return; }
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) { res.status(400).json({ error: "Bad id" }); return; }
  const detail = await fetchHistoryDetail(email, id);
  if (!detail) { res.status(404).json({ error: "Not found" }); return; }
  res.json(detail);
});

// ── Comparison report ─────────────────────────────────────────────────────
// Compare a past submission against the most recent submission of the same
// category. The result is cached on the past submission row to avoid hitting
// the model on repeat reads.
const COMPARE_PROMPT = `You are an IELTS writing coach. Compare two pieces of writing by the same student, both of the same task type. The "older" piece was written earlier; the "newer" piece is the student's most recent submission of that type. Be honest, specific, and warm.

Return ONLY a valid JSON object, no markdown, no extra text:
{
  "bandChange": "higher" | "lower" | "same",
  "bandDelta": 0.5,
  "summary": "1-2 sentence overview comparing the two pieces.",
  "improvedStrengths": ["Concrete strength now visible in the newer piece that was weaker before"],
  "remainingWeaknesses": ["Specific issue that is still present"],
  "newMistakes": ["Specific mistake that appears in the newer piece but not the older one"],
  "focusNext": ["Concrete area to work on next"],
  "motivation": "1-2 sentence encouraging message in English."
}

Rules:
- Use 0 for bandDelta if either band is missing.
- Each list should have 1-4 short items.
- Quote short snippets from the writing where useful, in double quotes.`;

async function generateCompareReport(opts: {
  older: { text: string; band: number | null; date: Date; taskTypeLabel: string | null };
  newer: { text: string; band: number | null; date: Date };
}): Promise<Record<string, unknown>> {
  const anthropic = getAnthropicClient();
  const userMessage = `Task type: ${opts.older.taskTypeLabel ?? "Writing"}

OLDER submission (date: ${opts.older.date.toISOString()}, band: ${opts.older.band ?? "N/A"}):
"""
${opts.older.text}
"""

NEWER submission (date: ${opts.newer.date.toISOString()}, band: ${opts.newer.band ?? "N/A"}):
"""
${opts.newer.text}
"""

Produce the JSON progress report comparing OLDER → NEWER.`;
  const message = await anthropic.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 2048,
    system: COMPARE_PROMPT,
    messages: [{ role: "user", content: userMessage }],
  });
  const block = message.content[0];
  if (!block || block.type !== "text") throw new Error("Unexpected AI response");
  let parsed: Record<string, unknown>;
  try { parsed = JSON.parse(block.text); }
  catch {
    const m = block.text.match(/\{[\s\S]*\}/);
    if (!m) throw new Error("Could not parse AI response");
    parsed = JSON.parse(m[0]);
  }
  return parsed;
}

async function buildCompareForId(emailParam: string, id: number, force: boolean) {
  const [older] = await db
    .select()
    .from(orwellSubmissionsTable)
    .where(and(
      eq(orwellSubmissionsTable.id, id),
      eq(orwellSubmissionsTable.email, emailParam),
      eq(orwellSubmissionsTable.status, "submitted"),
    ))
    .limit(1);
  if (!older) return { error: "Submission not found", status: 404 } as const;
  if (!older.text) return { error: "This submission has no saved writing to compare.", status: 400 } as const;

  // Find the most recent submission of the same category that is strictly NEWER than this one.
  const [newer] = await db
    .select()
    .from(orwellSubmissionsTable)
    .where(and(
      eq(orwellSubmissionsTable.email, emailParam),
      eq(orwellSubmissionsTable.category, older.category),
      eq(orwellSubmissionsTable.status, "submitted"),
      ne(orwellSubmissionsTable.id, older.id),
      gt(orwellSubmissionsTable.createdAt, older.createdAt),
    ))
    .orderBy(desc(orwellSubmissionsTable.createdAt))
    .limit(1);

  if (!newer || !newer.text) {
    return {
      error: "You haven't submitted a newer piece of this type yet — once you do, you'll be able to compare progress.",
      status: 409,
    } as const;
  }

  // Cache hit?
  if (!force && older.compareReport) {
    try {
      const cached = JSON.parse(older.compareReport);
      if (cached && typeof cached === "object" && (cached as { _newerId?: number })._newerId === newer.id) {
        return { ok: true, report: cached } as const;
      }
    } catch { /* fall through and regenerate */ }
  }

  try {
    const report = await generateCompareReport({
      older: { text: older.text, band: older.band, date: older.createdAt, taskTypeLabel: older.taskTypeLabel },
      newer: { text: newer.text, band: newer.band, date: newer.createdAt },
    });
    const stamped = {
      ...report,
      _newerId: newer.id,
      _olderBand: older.band,
      _newerBand: newer.band,
      _olderDate: older.createdAt.toISOString(),
      _newerDate: newer.createdAt.toISOString(),
      _generatedAt: new Date().toISOString(),
    };
    await db
      .update(orwellSubmissionsTable)
      .set({ compareReport: JSON.stringify(stamped) })
      .where(eq(orwellSubmissionsTable.id, older.id));
    return { ok: true, report: stamped } as const;
  } catch (err) {
    console.error("Compare report generation failed:", err);
    return { error: "AI comparison failed. Please try again.", status: 500 } as const;
  }
}

router.post("/orwell/history/:id/compare", async (req, res): Promise<void> => {
  const email = await verifyStudentEmail(req);
  if (!email) { res.status(401).json({ error: "Unauthorized" }); return; }
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) { res.status(400).json({ error: "Bad id" }); return; }
  const force = req.query.force === "1" || (req.body && (req.body as { force?: boolean }).force === true);
  const result = await buildCompareForId(email, id, !!force);
  if ("error" in result) { res.status(result.status).json({ error: result.error }); return; }
  res.json({ report: result.report });
});

// ── Personal Writing Coach Summary ────────────────────────────────────────
const COACH_PROMPT = `You are a personal IELTS writing coach. The student has just completed a milestone of submissions. Look across their full writing journey (most recent first) and produce a warm, honest, actionable summary.

Return ONLY a valid JSON object, no markdown, no extra text:
{
  "overallTrend": "improving" | "plateau" | "declining" | "mixed",
  "averageBand": 5.5,
  "topStrengths": ["Strength 1", "Strength 2", "Strength 3"],
  "topImprovements": ["Improvement 1", "Improvement 2", "Improvement 3"],
  "studyRecommendation": "A specific, multi-step plan tailored to the student's pattern of mistakes (3-6 sentences).",
  "motivation": "1-2 sentence encouraging message."
}

Rules:
- topStrengths and topImprovements MUST each contain exactly 3 items.
- Be specific: reference recurring mistake types or skill gaps when relevant.
- Average band is the mean of all available overall bands rounded to nearest 0.5.`;

interface CoachInputItem {
  taskTypeLabel: string | null;
  band: number | null;
  wordCount: number | null;
  date: Date;
  textExcerpt: string;
  feedbackExcerpt: string;
}

async function generateCoachSummary(items: CoachInputItem[]): Promise<Record<string, unknown>> {
  const anthropic = getAnthropicClient();
  const lines = items.map((it, i) => {
    return `--- Submission #${i + 1} (${it.taskTypeLabel ?? "Writing"}, ${it.date.toISOString()}, band ${it.band ?? "N/A"}, ${it.wordCount ?? "?"} words) ---
WRITING (excerpt):
${it.textExcerpt}

FEEDBACK (excerpt):
${it.feedbackExcerpt}
`;
  }).join("\n");
  const userMessage = `Here are this student's last ${items.length} submissions, most recent first:\n\n${lines}\n\nProduce the JSON personal writing coach summary.`;
  const message = await anthropic.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 2048,
    system: COACH_PROMPT,
    messages: [{ role: "user", content: userMessage }],
  });
  const block = message.content[0];
  if (!block || block.type !== "text") throw new Error("Unexpected AI response");
  let parsed: Record<string, unknown>;
  try { parsed = JSON.parse(block.text); }
  catch {
    const m = block.text.match(/\{[\s\S]*\}/);
    if (!m) throw new Error("Could not parse AI response");
    parsed = JSON.parse(m[0]);
  }
  return parsed;
}

async function buildCoachSummary(emailParam: string, force: boolean) {
  const rows = await db
    .select({
      taskTypeLabel: orwellSubmissionsTable.taskTypeLabel,
      band: orwellSubmissionsTable.band,
      wordCount: orwellSubmissionsTable.wordCount,
      text: orwellSubmissionsTable.text,
      feedback: orwellSubmissionsTable.feedback,
      createdAt: orwellSubmissionsTable.createdAt,
    })
    .from(orwellSubmissionsTable)
    .where(and(
      eq(orwellSubmissionsTable.email, emailParam),
      eq(orwellSubmissionsTable.status, "submitted"),
    ))
    .orderBy(desc(orwellSubmissionsTable.createdAt));

  const total = rows.length;
  if (total < 5) {
    return {
      ok: true,
      summary: null,
      submissionCount: total,
      nextMilestone: 5,
      message: `Submit ${5 - total} more piece${5 - total === 1 ? "" : "s"} of writing to unlock your first Personal Writing Coach Summary.`,
    } as const;
  }

  // Round down to nearest milestone (every 5 submissions)
  const milestone = Math.floor(total / 5) * 5;

  if (!force) {
    const [cached] = await db
      .select()
      .from(orwellCoachSummariesTable)
      .where(and(
        eq(orwellCoachSummariesTable.email, emailParam),
        eq(orwellCoachSummariesTable.atSubmissionCount, milestone),
      ))
      .limit(1);
    if (cached) {
      let parsed: unknown = null;
      try { parsed = JSON.parse(cached.summary); } catch { /* corrupt; regenerate */ }
      if (parsed) {
        return {
          ok: true,
          summary: parsed,
          submissionCount: total,
          milestone,
          generatedAt: cached.createdAt.toISOString(),
          nextMilestone: milestone + 5,
        } as const;
      }
    }
  }

  // Build a cost-bounded payload — keep the most recent 15 submissions, with
  // truncated excerpts of the writing and feedback.
  const recent = rows.slice(0, 15);
  const items: CoachInputItem[] = recent.map((r) => {
    let feedbackExcerpt = "";
    if (r.feedback) {
      try {
        const f = JSON.parse(r.feedback) as Record<string, unknown>;
        const strengths = Array.isArray(f.strengths) ? f.strengths.join(" • ") : (typeof f.strengths === "string" ? f.strengths : "");
        const improvements = Array.isArray(f.improvements) ? f.improvements.join(" • ") : (typeof f.improvements === "string" ? f.improvements : "");
        feedbackExcerpt = `Strengths: ${strengths}\nImprovements: ${improvements}`.slice(0, 500);
      } catch {
        feedbackExcerpt = r.feedback.slice(0, 500);
      }
    }
    return {
      taskTypeLabel: r.taskTypeLabel,
      band: r.band,
      wordCount: r.wordCount,
      date: r.createdAt,
      textExcerpt: (r.text ?? "").slice(0, 500),
      feedbackExcerpt,
    };
  });

  try {
    const summary = await generateCoachSummary(items);
    await db
      .insert(orwellCoachSummariesTable)
      .values({ email: emailParam, atSubmissionCount: milestone, summary: JSON.stringify(summary) })
      .onConflictDoUpdate({
        target: [orwellCoachSummariesTable.email, orwellCoachSummariesTable.atSubmissionCount],
        set: { summary: JSON.stringify(summary), createdAt: new Date() },
      });
    return {
      ok: true,
      summary,
      submissionCount: total,
      milestone,
      generatedAt: new Date().toISOString(),
      nextMilestone: milestone + 5,
    } as const;
  } catch (err) {
    console.error("Coach summary generation failed:", err);
    return { error: "AI summary failed. Please try again.", status: 500 } as const;
  }
}

router.post("/orwell/coach-summary", async (req, res): Promise<void> => {
  const email = await verifyStudentEmail(req);
  if (!email) { res.status(401).json({ error: "Unauthorized" }); return; }
  const force = req.query.force === "1" || (req.body && (req.body as { force?: boolean }).force === true);
  const result = await buildCoachSummary(email, !!force);
  if ("error" in result) { res.status(result.status).json({ error: result.error }); return; }
  res.json(result);
});

router.get("/orwell/coach-summary", async (req, res): Promise<void> => {
  const email = await verifyStudentEmail(req);
  if (!email) { res.status(401).json({ error: "Unauthorized" }); return; }
  const result = await buildCoachSummary(email, false);
  if ("error" in result) { res.status(result.status).json({ error: result.error }); return; }
  res.json(result);
});

// ── Admin: per-student writing history ────────────────────────────────────
function verifyAdmin(req: import("express").Request): boolean {
  const provided = (req.headers["x-admin-password"] as string || "").trim();
  const expected = (process.env["ADMIN_PASSWORD"] || "Target8").trim();
  if (!provided || !expected) return false;
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

router.get("/admin/students/:email/orwell-history", async (req, res): Promise<void> => {
  if (!verifyAdmin(req)) { res.status(401).json({ error: "Unauthorized" }); return; }
  const studentEmail = req.params.email.trim().toLowerCase();
  if (!studentEmail) { res.status(400).json({ error: "Bad email" }); return; }
  const [items, chart] = await Promise.all([
    fetchHistoryList(studentEmail),
    fetchHistoryChart(studentEmail),
  ]);
  res.json({ items, chart });
});

router.get("/admin/students/:email/orwell-history/:id", async (req, res): Promise<void> => {
  if (!verifyAdmin(req)) { res.status(401).json({ error: "Unauthorized" }); return; }
  const studentEmail = req.params.email.trim().toLowerCase();
  const id = Number(req.params.id);
  if (!studentEmail || !Number.isInteger(id) || id <= 0) { res.status(400).json({ error: "Bad request" }); return; }
  const detail = await fetchHistoryDetail(studentEmail, id);
  if (!detail) { res.status(404).json({ error: "Not found" }); return; }
  res.json(detail);
});

router.get("/admin/students/:email/orwell-coach-summary", async (req, res): Promise<void> => {
  if (!verifyAdmin(req)) { res.status(401).json({ error: "Unauthorized" }); return; }
  const studentEmail = req.params.email.trim().toLowerCase();
  if (!studentEmail) { res.status(400).json({ error: "Bad email" }); return; }
  const result = await buildCoachSummary(studentEmail, false);
  if ("error" in result) { res.status(result.status).json({ error: result.error }); return; }
  res.json(result);
});

void HISTORY_CATEGORIES;
void (null as unknown as HistoryCategory);

export default router;
