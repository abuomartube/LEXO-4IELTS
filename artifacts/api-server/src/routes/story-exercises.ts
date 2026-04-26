import { Router, type IRouter } from "express";
import crypto from "node:crypto";
import { eq, and, sql } from "drizzle-orm";
import Anthropic from "@anthropic-ai/sdk";
import {
  db,
  storiesTable,
  storyQuizzesTable,
  xpEventsTable,
} from "@workspace/db";
import { logger } from "../lib/logger";

const router: IRouter = Router();

// ── Auth (same scheme as plan-pdf / change-password / flashcards) ─────────

const SESSION_SECRET = process.env["SESSION_SECRET"] ?? "fallback-secret";

function verifyStudentEmail(req: import("express").Request): string | null {
  const email = (req.headers["x-student-email"] as string || "").trim().toLowerCase();
  const token = (req.headers["x-student-token"] as string || "").trim();
  if (!email || !token) return null;
  const expected = crypto
    .createHmac("sha256", SESSION_SECRET)
    .update(email + ":approved")
    .digest("hex");
  if (token !== expected) return null;
  return email;
}

// ── Anthropic client ──────────────────────────────────────────────────────

function getAnthropicClient(): Anthropic {
  const apiKey = process.env["AI_INTEGRATIONS_ANTHROPIC_API_KEY"];
  const baseURL = process.env["AI_INTEGRATIONS_ANTHROPIC_BASE_URL"];
  if (!apiKey || !baseURL) {
    throw new Error("Anthropic env vars not configured.");
  }
  return new Anthropic({ apiKey, baseURL });
}

// ── XP awarding (mirrors caps in flashcards.ts) ───────────────────────────
//
// We intentionally call the DB directly here instead of POST /xp/award so
// quiz grading and writing analysis stay atomic with their own response.

const STORY_QUIZ_DAILY_CAP = 30;     // 5 questions × ~6 XP
const STORY_WRITING_DAILY_CAP = 25;  // one paid analysis per day cap

async function awardXp(
  email: string,
  activity: string,
  amount: number,
  cap: number,
): Promise<number> {
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const [todayRow] = await db
    .select({ total: sql<number>`coalesce(sum(${xpEventsTable.xp}),0)::int` })
    .from(xpEventsTable)
    .where(and(
      eq(xpEventsTable.email, email),
      eq(xpEventsTable.activity, activity),
      sql`${xpEventsTable.createdAt} >= ${todayStart}`,
    ));
  const todaySoFar = todayRow?.total ?? 0;
  const awarded = Math.max(0, Math.min(amount, cap - todaySoFar));
  if (awarded > 0) {
    await db.insert(xpEventsTable).values({ email, activity, xp: awarded });
  }
  return awarded;
}

// ── Types ─────────────────────────────────────────────────────────────────

type Choice = "A" | "B" | "C" | "D";

interface QuizQuestion {
  id: string;          // q1…q5
  question: string;
  choices: { A: string; B: string; C: string; D: string };
  correct: Choice;
  explanation: string; // 1-2 sentences explaining why `correct` is right
}

// What the client sees BEFORE submitting (no answers leaked).
interface PublicQuizQuestion {
  id: string;
  question: string;
  choices: { A: string; B: string; C: string; D: string };
}

// ── Quiz generation ───────────────────────────────────────────────────────

const QUIZ_SYSTEM_PROMPT = `You write IELTS-style reading comprehension quizzes.

Return ONLY a valid JSON object with this exact shape, no markdown, no commentary:
{
  "questions": [
    {
      "id": "q1",
      "question": "string",
      "choices": { "A": "string", "B": "string", "C": "string", "D": "string" },
      "correct": "A" | "B" | "C" | "D",
      "explanation": "1-2 sentences explaining WHY the correct answer is right, citing the story."
    }
  ]
}

RULES:
- Generate EXACTLY 5 questions, ids q1..q5.
- Each question must test a different skill, in this order:
  q1 = MAIN IDEA of the whole story
  q2 = a SPECIFIC DETAIL (a fact stated in the story)
  q3 = VOCABULARY IN CONTEXT (the meaning of one word/phrase as used in the story)
  q4 = CHARACTER ACTION or motive (what a character did and/or why)
  q5 = STORY CONCLUSION (how the story ends or what it leads to)
- All four choices must be plausible. The three distractors must be wrong but
  related to the story (not obviously absurd).
- Use simple English appropriate for the story's CEFR level.
- Each "explanation" is 1-2 sentences and references the story content.
- Do NOT mention the question number in the question text.
- Do NOT add any text outside the JSON object.`;

function parseJsonObject(text: string): unknown {
  try {
    return JSON.parse(text);
  } catch {
    const m = text.match(/\{[\s\S]*\}/);
    if (m) return JSON.parse(m[0]);
    throw new Error("AI did not return valid JSON.");
  }
}

function validateQuiz(raw: unknown): QuizQuestion[] {
  const obj = raw as { questions?: unknown };
  if (!obj || !Array.isArray(obj.questions) || obj.questions.length !== 5) {
    throw new Error("AI returned the wrong number of questions.");
  }
  const out: QuizQuestion[] = [];
  for (let i = 0; i < 5; i++) {
    const q = obj.questions[i] as Partial<QuizQuestion>;
    const id = `q${i + 1}`;
    if (
      !q ||
      typeof q.question !== "string" ||
      !q.choices ||
      typeof (q.choices as Record<Choice, unknown>).A !== "string" ||
      typeof (q.choices as Record<Choice, unknown>).B !== "string" ||
      typeof (q.choices as Record<Choice, unknown>).C !== "string" ||
      typeof (q.choices as Record<Choice, unknown>).D !== "string" ||
      (q.correct !== "A" && q.correct !== "B" && q.correct !== "C" && q.correct !== "D") ||
      typeof q.explanation !== "string"
    ) {
      throw new Error(`AI returned a malformed question at index ${i}.`);
    }
    out.push({
      id,
      question: q.question.trim(),
      choices: {
        A: (q.choices as Record<Choice, string>).A.trim(),
        B: (q.choices as Record<Choice, string>).B.trim(),
        C: (q.choices as Record<Choice, string>).C.trim(),
        D: (q.choices as Record<Choice, string>).D.trim(),
      },
      correct: q.correct,
      explanation: q.explanation.trim(),
    });
  }
  return out;
}

async function generateQuizForStory(
  storyId: number,
  storyTitle: string,
  storyContent: string,
  storyLevel: string,
): Promise<QuizQuestion[]> {
  const anthropic = getAnthropicClient();
  const userMessage =
    `Story title: ${storyTitle}\nStory CEFR level: ${storyLevel}\n\nStory:\n"""\n${storyContent}\n"""\n\n` +
    `Generate the 5 comprehension questions as specified.`;

  const message = await anthropic.messages.create({
    model: "claude-sonnet-4-5",
    max_tokens: 2048,
    system: QUIZ_SYSTEM_PROMPT,
    messages: [{ role: "user", content: userMessage }],
  });
  const block = message.content[0];
  if (!block || block.type !== "text") {
    throw new Error("Unexpected AI response shape.");
  }
  const parsed = parseJsonObject(block.text);
  const quiz = validateQuiz(parsed);

  // Cache so all students see the same set for this story and we don't pay
  // the AI again. Use UPSERT so an existing-but-invalid row is replaced
  // (self-healing) and the unique-constraint race between concurrent
  // generators is resolved consistently — after the upsert we re-read the
  // canonical cached row so all racing requests converge on the same set.
  try {
    await db
      .insert(storyQuizzesTable)
      .values({ storyId, questions: JSON.stringify(quiz) })
      .onConflictDoNothing({ target: storyQuizzesTable.storyId });
    const [canonical] = await db
      .select()
      .from(storyQuizzesTable)
      .where(eq(storyQuizzesTable.storyId, storyId));
    if (canonical) {
      try {
        return validateQuiz(JSON.parse(canonical.questions));
      } catch {
        // Canonical row is malformed (e.g. cached from a buggy older version).
        // Replace it with our freshly-validated quiz so future reads succeed.
        await db
          .update(storyQuizzesTable)
          .set({ questions: JSON.stringify(quiz) })
          .where(eq(storyQuizzesTable.storyId, storyId));
      }
    }
  } catch (err) {
    logger.warn({ err, storyId }, "Failed to cache story quiz (non-fatal)");
  }
  return quiz;
}

async function loadOrGenerateQuiz(storyId: number): Promise<QuizQuestion[]> {
  const [cached] = await db
    .select()
    .from(storyQuizzesTable)
    .where(eq(storyQuizzesTable.storyId, storyId));
  if (cached) {
    try {
      const parsed = JSON.parse(cached.questions);
      return validateQuiz(parsed);
    } catch (err) {
      // Self-heal: drop the invalid row so the regeneration below can repopulate
      // the canonical cache instead of looping on the same bad data forever.
      logger.warn({ err, storyId }, "Cached quiz invalid, regenerating");
      try {
        await db
          .delete(storyQuizzesTable)
          .where(eq(storyQuizzesTable.storyId, storyId));
      } catch (delErr) {
        logger.warn({ err: delErr, storyId }, "Failed to clear bad cached quiz");
      }
    }
  }
  const [story] = await db
    .select()
    .from(storiesTable)
    .where(eq(storiesTable.id, storyId));
  if (!story) throw new Error("story_not_found");
  return await generateQuizForStory(storyId, story.title, story.content, story.level);
}

function publicView(qs: QuizQuestion[]): PublicQuizQuestion[] {
  return qs.map((q) => ({ id: q.id, question: q.question, choices: q.choices }));
}

// ── Routes ────────────────────────────────────────────────────────────────

router.get("/stories/:id/quiz", async (req, res) => {
  const email = verifyStudentEmail(req);
  if (!email) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  const storyId = Number(req.params.id);
  if (!Number.isInteger(storyId) || storyId <= 0) {
    res.status(400).json({ error: "Invalid story id." });
    return;
  }
  try {
    const quiz = await loadOrGenerateQuiz(storyId);
    res.json({ questions: publicView(quiz) });
  } catch (err) {
    if ((err as Error).message === "story_not_found") {
      res.status(404).json({ error: "Story not found." });
      return;
    }
    logger.error({ err, storyId }, "Story quiz generation failed");
    res.status(500).json({ error: "Could not generate quiz. Please try again." });
  }
});

router.post("/stories/:id/quiz/grade", async (req, res) => {
  const email = verifyStudentEmail(req);
  if (!email) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  const storyId = Number(req.params.id);
  if (!Number.isInteger(storyId) || storyId <= 0) {
    res.status(400).json({ error: "Invalid story id." });
    return;
  }
  const body = req.body as { answers?: Record<string, unknown> };
  const answers = body?.answers;
  if (!answers || typeof answers !== "object") {
    res.status(400).json({ error: "Missing answers." });
    return;
  }
  try {
    const quiz = await loadOrGenerateQuiz(storyId);
    const results = quiz.map((q) => {
      const chosen = (answers[q.id] as string | undefined) ?? null;
      const isRight = chosen === q.correct;
      return {
        id: q.id,
        question: q.question,
        choices: q.choices,
        chosen,
        correct: q.correct,
        isRight,
        explanation: q.explanation,
      };
    });
    const correctCount = results.filter((r) => r.isRight).length;
    const xpAwarded = await awardXp(
      email,
      "story_quiz",
      correctCount * 6, // 6 XP per correct, max 30 (cap)
      STORY_QUIZ_DAILY_CAP,
    );
    res.json({
      correct: correctCount,
      total: 5,
      results,
      xpAwarded,
    });
  } catch (err) {
    if ((err as Error).message === "story_not_found") {
      res.status(404).json({ error: "Story not found." });
      return;
    }
    logger.error({ err, storyId, email }, "Story quiz grading failed");
    res.status(500).json({ error: "Could not grade quiz. Please try again." });
  }
});

// ── Written-response analysis ─────────────────────────────────────────────

const WRITING_SYSTEM_PROMPT = `You are an English writing coach analysing a student's short summary of a story.

Return ONLY a valid JSON object with this EXACT shape, no markdown, no commentary:
{
  "grammar": [
    { "original": "exact phrase from the student's text", "correction": "fixed version", "explanation": "1 sentence rule" }
  ],
  "vocabulary": [
    { "weak": "the weak word/phrase as it appears", "suggestions": ["stronger1", "stronger2"], "why": "1 sentence reason" }
  ],
  "coherence": {
    "rating": "Excellent" | "Good" | "Fair" | "Needs work",
    "comment": "1-3 sentences on logical structure and flow"
  },
  "linkingWords": {
    "comment": "1-2 sentences on the use of connectors",
    "suggestions": ["linker1", "linker2", "linker3"]
  },
  "betterVersion": "A polished rewrite of the SAME ideas in roughly the SAME length. It must keep the student's voice and not become a model answer.",
  "betterVersionArabic": "Modern Standard Arabic translation of betterVersion. Natural Arabic, not literal."
}

RULES:
- "grammar" array can be empty if there are no grammar errors. Otherwise list every error you find (max 8).
- "vocabulary" array can be empty if all word choices are good. Otherwise list weak words (max 6).
- The "original" / "weak" fields must be EXACT substrings of the student's response so the UI can highlight them.
- "betterVersion": same number of sentences ± 1 as the student's response. Improve grammar, vocabulary, cohesion, and linking — but DO NOT add new ideas the student didn't have. Keep first-person if the student used it.
- "betterVersionArabic": full Arabic translation of betterVersion. Do not insert English in this field.
- Output JSON only. No prose, no code fences.`;

interface WritingFeedback {
  grammar: Array<{ original: string; correction: string; explanation: string }>;
  vocabulary: Array<{ weak: string; suggestions: string[]; why: string }>;
  coherence: { rating: string; comment: string };
  linkingWords: { comment: string; suggestions: string[] };
  betterVersion: string;
  betterVersionArabic: string;
}

function validateWritingFeedback(raw: unknown): WritingFeedback {
  const r = raw as Partial<WritingFeedback>;
  if (
    !r ||
    !Array.isArray(r.grammar) ||
    !Array.isArray(r.vocabulary) ||
    !r.coherence ||
    typeof r.coherence.rating !== "string" ||
    typeof r.coherence.comment !== "string" ||
    !r.linkingWords ||
    typeof r.linkingWords.comment !== "string" ||
    !Array.isArray(r.linkingWords.suggestions) ||
    typeof r.betterVersion !== "string" ||
    typeof r.betterVersionArabic !== "string"
  ) {
    throw new Error("AI returned malformed writing feedback.");
  }
  // Trim/limit each free-text field to keep the UI safe.
  const clip = (s: string, n: number) => (s.length > n ? s.slice(0, n) : s);
  return {
    grammar: r.grammar.slice(0, 8).map((g) => ({
      original: String(g.original ?? "").slice(0, 200),
      correction: String(g.correction ?? "").slice(0, 200),
      explanation: String(g.explanation ?? "").slice(0, 240),
    })),
    vocabulary: r.vocabulary.slice(0, 6).map((v) => ({
      weak: String(v.weak ?? "").slice(0, 120),
      suggestions: Array.isArray(v.suggestions)
        ? v.suggestions.slice(0, 4).map((s) => String(s ?? "").slice(0, 60))
        : [],
      why: String(v.why ?? "").slice(0, 240),
    })),
    coherence: {
      rating: clip(r.coherence.rating, 32),
      comment: clip(r.coherence.comment, 400),
    },
    linkingWords: {
      comment: clip(r.linkingWords.comment, 300),
      suggestions: r.linkingWords.suggestions
        .slice(0, 6)
        .map((s) => String(s ?? "").slice(0, 40)),
    },
    betterVersion: clip(r.betterVersion, 1500),
    betterVersionArabic: clip(r.betterVersionArabic, 1500),
  };
}

router.post("/stories/:id/written-feedback", async (req, res) => {
  const email = verifyStudentEmail(req);
  if (!email) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  const storyId = Number(req.params.id);
  if (!Number.isInteger(storyId) || storyId <= 0) {
    res.status(400).json({ error: "Invalid story id." });
    return;
  }

  const body = req.body as { response?: unknown };
  const responseText = typeof body?.response === "string" ? body.response.trim() : "";
  if (responseText.length < 20) {
    res.status(400).json({ error: "Please write at least a couple of sentences." });
    return;
  }
  if (responseText.length > 2000) {
    res.status(400).json({ error: "Response is too long (max 2000 characters)." });
    return;
  }

  try {
    const [story] = await db
      .select()
      .from(storiesTable)
      .where(eq(storiesTable.id, storyId));
    if (!story) {
      res.status(404).json({ error: "Story not found." });
      return;
    }

    const anthropic = getAnthropicClient();
    const userMessage =
      `Story title: ${story.title}\nStory CEFR level: ${story.level}\n\n` +
      `Original story (for context only — do NOT quote it back):\n"""\n${story.content}\n"""\n\n` +
      `Student's written response:\n"""\n${responseText}\n"""\n\n` +
      `Analyse the response per the system instructions and return the JSON.`;

    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-5",
      max_tokens: 3000,
      system: WRITING_SYSTEM_PROMPT,
      messages: [{ role: "user", content: userMessage }],
    });
    const block = message.content[0];
    if (!block || block.type !== "text") {
      res.status(500).json({ error: "Unexpected AI response." });
      return;
    }
    const parsed = parseJsonObject(block.text);
    const feedback = validateWritingFeedback(parsed);

    const xpAwarded = await awardXp(email, "story_writing", 25, STORY_WRITING_DAILY_CAP);

    res.json({ ...feedback, xpAwarded });
  } catch (err) {
    logger.error({ err, storyId, email }, "Story written-feedback failed");
    res.status(500).json({ error: "Could not analyse your response. Please try again." });
  }
});

export default router;
