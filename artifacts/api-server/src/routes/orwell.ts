import { Router, type IRouter } from "express";
import crypto from "node:crypto";
import Anthropic from "@anthropic-ai/sdk";
import { eq, and, sql } from "drizzle-orm";
import { db, orwellSubmissionsTable, xpEventsTable } from "@workspace/db";

const SESSION_SECRET = process.env["SESSION_SECRET"] ?? "fallback-secret";

function verifyStudentEmail(req: import("express").Request): string | null {
  const email = (req.headers["x-student-email"] as string || "").trim().toLowerCase();
  const token = (req.headers["x-student-token"] as string || "").trim();
  if (!email || !token) return null;
  const expected = crypto.createHmac("sha256", SESSION_SECRET).update(email + ":approved").digest("hex");
  if (token !== expected) return null;
  return email;
}

function getAnthropicClient() {
  const apiKey = process.env.AI_INTEGRATIONS_ANTHROPIC_API_KEY;
  const baseURL = process.env.AI_INTEGRATIONS_ANTHROPIC_BASE_URL;
  if (!apiKey || !baseURL) throw new Error("Anthropic env vars not configured.");
  return new Anthropic({ apiKey, baseURL });
}

const CATEGORIES = new Set(["task1", "task2", "paragraph"]);

const router: IRouter = Router();

// ── Next assignment ───────────────────────────────────────────────────────
router.get("/orwell/next", async (req, res): Promise<void> => {
  const email = verifyStudentEmail(req);
  if (!email) { res.status(401).json({ error: "Unauthorized" }); return; }
  const category = String(req.query.category || "");
  if (!CATEGORIES.has(category)) { res.status(400).json({ error: "Invalid category" }); return; }

  const rows = await db
    .select({ id: orwellSubmissionsTable.assignmentId, status: orwellSubmissionsTable.status })
    .from(orwellSubmissionsTable)
    .where(and(eq(orwellSubmissionsTable.email, email), eq(orwellSubmissionsTable.category, category)));

  const submittedIds = new Set(rows.filter((r) => r.status === "submitted").map((r) => r.id));
  const skippedIds = new Set(rows.filter((r) => r.status === "skipped").map((r) => r.id));
  res.json({ submittedIds: [...submittedIds], skippedIds: [...skippedIds] });
});

// ── Skip assignment ───────────────────────────────────────────────────────
router.post("/orwell/skip", async (req, res): Promise<void> => {
  const email = verifyStudentEmail(req);
  if (!email) { res.status(401).json({ error: "Unauthorized" }); return; }
  const { assignmentId, category } = req.body as { assignmentId: string; category: string };
  if (!assignmentId || !CATEGORIES.has(category)) { res.status(400).json({ error: "Invalid payload" }); return; }

  // Only record skip if not already submitted
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

router.post("/orwell/submit", async (req, res): Promise<void> => {
  const email = verifyStudentEmail(req);
  if (!email) { res.status(401).json({ error: "Unauthorized" }); return; }

  const { assignmentId, category, prompt, text, taskType } = req.body as {
    assignmentId: string;
    category: string;
    prompt: string;
    text: string;
    taskType?: string;
  };

  if (!assignmentId || !CATEGORIES.has(category) || !prompt || !text || text.trim().length < 10) {
    res.status(400).json({ error: "Missing or invalid payload." });
    return;
  }

  // Reject if already submitted
  const [existing] = await db
    .select({ id: orwellSubmissionsTable.id, status: orwellSubmissionsTable.status })
    .from(orwellSubmissionsTable)
    .where(and(eq(orwellSubmissionsTable.email, email), eq(orwellSubmissionsTable.assignmentId, assignmentId)))
    .limit(1);
  if (existing && existing.status === "submitted") {
    res.status(409).json({ error: "This assignment has already been submitted." });
    return;
  }

  let parsed: Record<string, unknown>;
  try {
    const anthropic = getAnthropicClient();
    if (category === "paragraph") {
      const message = await anthropic.messages.create({
        model: "claude-sonnet-4-6",
        max_tokens: 4096,
        system: PARAGRAPH_SYSTEM_PROMPT,
        messages: [{ role: "user", content: `Assignment:\n${prompt}\n\nStudent's response:\n${text}` }],
      });
      const block = message.content[0];
      if (block.type !== "text") throw new Error("Unexpected AI response");
      try { parsed = JSON.parse(block.text); }
      catch {
        const m = block.text.match(/\{[\s\S]*\}/);
        if (!m) throw new Error("Could not parse AI response");
        parsed = JSON.parse(m[0]);
      }
    } else {
      const taskLabel = taskType || (category === "task1" ? "Task 1" : "Task 2");
      const userMessage = `Assignment:\n${prompt}\n\nStudent's ${taskLabel} response:\n${text}`;
      const message = await anthropic.messages.create({
        model: "claude-sonnet-4-6",
        max_tokens: 8192,
        system: ESSAY_SYSTEM_PROMPT,
        messages: [{ role: "user", content: userMessage }],
      });
      const block = message.content[0];
      if (block.type !== "text") throw new Error("Unexpected AI response");
      try { parsed = JSON.parse(block.text); }
      catch {
        const m = block.text.match(/\{[\s\S]*\}/);
        if (!m) throw new Error("Could not parse AI response");
        parsed = JSON.parse(m[0]);
      }
    }
  } catch (err) {
    console.error("Orwell submit error:", err);
    res.status(500).json({ error: "AI grading failed. Please try again." });
    return;
  }

  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  const scores = (parsed as { scores?: { taskResponse?: { band?: number } } }).scores;
  const band = typeof scores?.taskResponse?.band === "number" ? scores.taskResponse.band : null;
  const overallBand = typeof (parsed as { overallBand?: number }).overallBand === "number"
    ? (parsed as { overallBand: number }).overallBand
    : band;

  await db
    .insert(orwellSubmissionsTable)
    .values({
      email,
      assignmentId,
      category,
      status: "submitted",
      band: overallBand ?? null,
      wordCount,
    })
    .onConflictDoUpdate({
      target: [orwellSubmissionsTable.email, orwellSubmissionsTable.assignmentId],
      set: { status: "submitted", band: overallBand ?? null, wordCount, createdAt: new Date() },
    });

  // Award XP (capped by the global /xp/award logic semantics — we inline the capping here)
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

  res.json({ ...parsed, wordCount });
});

// ── Progress ─────────────────────────────────────────────────────────────
router.get("/orwell/progress", async (req, res): Promise<void> => {
  const email = verifyStudentEmail(req);
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
