import { Router, type IRouter } from "express";
import crypto from "node:crypto";
import Anthropic from "@anthropic-ai/sdk";
import { eq, and, sql, or, lt, inArray } from "drizzle-orm";
import { db, orwellSubmissionsTable, xpEventsTable, accessRequestsTable } from "@workspace/db";
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

// ── Free Check system prompt ─────────────────────────────────────────────
// No fixed assignment — the student pasted their own writing. We still grade
// against IELTS Task 2 band descriptors (Task Response / Coherence / Lexical
// Resource / Grammatical Range), since that's the broadest essay rubric and
// works for any free-form essay-style writing the student supplies.
const FREECHECK_SYSTEM_PROMPT = `You are Orwell AI, a strict certified IELTS examiner following British Council official band descriptors.

NEVER inflate scores. Most intermediate students score between 4.5 and 6.0 — this is normal. Be honest and strict.

The student has NOT been given a specific assignment. They have pasted a piece of their own writing — it could be an essay, a paragraph, a letter, a story, or any English text. Your job is to evaluate it on its own merits using IELTS Task 2 band descriptors:
- Task Response (TR) — does the writing have a clear position/purpose, develop ideas, and stay on topic?
- Coherence & Cohesion (CC)
- Lexical Resource (LR)
- Grammatical Range & Accuracy (GRA)

STRICT PENALTIES:
- No clear position or purpose = MAX Band 5 for TR
- Simple/basic vocabulary only = MAX Band 5 for LR
- Only simple sentences = MAX Band 5 for GRA
- Overall band = average of 4 criteria, rounded to nearest 0.5

Word-count guidance:
- If the writing is under ~150 words, set wordCountWarning to a short note ("This piece is quite short — for a full IELTS Task 2 essay, aim for at least 250 words.")
- Otherwise wordCountWarning = null
- Do NOT deduct band marks for length in Free Check mode (the student chose what to submit).

Return ONLY a valid JSON object, no markdown:
{
  "taskType": "Free Check",
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
  "revisedIntroduction": "A rewritten opening sentence/paragraph that demonstrates a stronger version of the same idea.",
  "exampleEssayBand6": "A version of the SAME piece rewritten at Band 5.5–6 level, preserving the student's topic and intent.",
  "exampleEssayBand8": "A version of the SAME piece rewritten at Band 7–8 level, preserving the student's topic and intent."
}

IMPORTANT:
- grammarErrors/vocabularyUpgrades/coherenceIssues.original must be EXACT phrase from the writing so it can be highlighted.
- exampleEssayBand6 and exampleEssayBand8 must be COMPLETE rewrites of the student's piece.
- Grammar explanations must include the underlying rule.
- After each criterion feedback, add one short Arabic tip in parentheses.`;

// Stream a Free Check grading directly back to the client over SSE. No DB
// persistence, no concurrency lock, no XP — each request is independent.
async function streamFreeCheck(
  res: import("express").Response,
  req: import("express").Request,
  text: string,
  taskType?: string,
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
    const userMessage = `The student has pasted the following piece of writing and would like Orwell AI feedback. There is no fixed assignment — evaluate it on its own merits.\n\nStudent's writing:\n${text}`;
    const stream = anthropic.messages.stream({
      model: "claude-sonnet-4-6",
      max_tokens: 8192,
      system: FREECHECK_SYSTEM_PROMPT,
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

  // Always honour the Free Check label client-side regardless of model output.
  if (taskType) {
    (parsed as { taskType?: string }).taskType = taskType;
  } else {
    (parsed as { taskType?: string }).taskType = "Free Check";
  }
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  sseSend({ done: { ...parsed, wordCount } });
  res.end();
}

// How long a "grading" lock is allowed to stay before another request can take it over.
// Anthropic calls typically finish in <30s; 5 minutes is a generous safety net.
const GRADING_LOCK_TIMEOUT_MS = 5 * 60 * 1000;

router.post("/orwell/submit", async (req, res): Promise<void> => {
  const email = await verifyStudentEmail(req);
  if (!email) { res.status(401).json({ error: "Unauthorized" }); return; }

  const { assignmentId, text, taskType, category: bodyCategory } = req.body as {
    assignmentId?: string;
    text?: string;
    taskType?: string;
    category?: string;
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
    const slot = freeCheckTryAcquire(email);
    if (!slot.ok) {
      if (slot.retryAfterMs) res.setHeader("Retry-After", String(Math.ceil(slot.retryAfterMs / 1000)));
      res.status(429).json({ error: slot.reason });
      return;
    }
    try {
      await streamFreeCheck(res, req, text, taskType);
    } finally {
      freeCheckRelease(email);
    }
    return;
  }

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
  const finalize = await db
    .update(orwellSubmissionsTable)
    .set({ status: "submitted", band: overallBand ?? null, wordCount, createdAt: new Date() })
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

export default router;
