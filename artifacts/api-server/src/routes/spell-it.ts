import { Router, type IRouter } from "express";
import crypto from "node:crypto";
import Anthropic from "@anthropic-ai/sdk";

const router: IRouter = Router();

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

interface Clue {
  definition: string;
  hint: string;
  example: string;
}

const clueCache = new Map<string, Clue>();

router.post("/spell-it/clue", async (req, res): Promise<void> => {
  try {
    const email = verifyStudentEmail(req);
    if (!email) { res.status(401).json({ error: "Unauthorized" }); return; }
    const word = String((req.body as { word?: unknown }).word ?? "").trim();
    const level = String((req.body as { level?: unknown }).level ?? "B1").trim();
    if (!word) {
      res.status(400).json({ error: "Missing word" });
      return;
    }

    const cacheKey = `${level}::${word.toLowerCase()}`;
    const cached = clueCache.get(cacheKey);
    if (cached) {
      res.json(cached);
      return;
    }

    const anthropic = getAnthropicClient();
    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-5",
      max_tokens: 250,
      system: `You help an Arabic-speaking IELTS student spell a single English word.
You will be given the word and the student's CEFR level.

Return ONLY valid JSON in this exact shape:
{ "definition": "...", "hint": "...", "example": "..." }

Rules:
- "definition": one short British English sentence (<= 18 words) explaining the word's meaning. No quotes, no Arabic.
- "hint": one short British English clue (<= 14 words) that helps the student RECALL the word but does NOT spell it out. Use a category, synonym in simpler English, or a typical context. Never reveal individual letters or the word itself.
- "example": one VERY SHORT, natural British-English sentence (<= 9 words) that USES the word "${word}" naturally in everyday context, so it can be read aloud after "as in,". Examples of good "example" values: for "dessert" → "we have cake for dessert"; for "library" → "I borrow books from the library"; for "anxious" → "she felt anxious before the test". Must include the word "${word}" itself. Do NOT use quotes or capital letters at the start.
- All must be appropriate for the student's level (${level}).
- Tone: clear, warm, neutral British English.`,
      messages: [
        { role: "user", content: `Word: ${word}\nLevel: ${level}` },
      ],
    });

    const text = message.content[0]?.type === "text" ? message.content[0].text : "{}";
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      res.status(500).json({ error: "Invalid clue format" });
      return;
    }

    const parsed = JSON.parse(jsonMatch[0]) as Partial<Clue>;
    const definition = String(parsed.definition ?? "").trim();
    const hint = String(parsed.hint ?? "").trim();
    let example = String(parsed.example ?? "").trim().replace(/^["'`]+|["'`]+$/g, "");
    // Safety: if the example doesn't actually contain the word, fall back to a
    // simple deterministic sentence so the "as in" audio still makes sense.
    if (!example || !example.toLowerCase().includes(word.toLowerCase())) {
      example = `we use the word ${word} every day`;
    }
    if (!definition || !hint) {
      res.status(500).json({ error: "Empty clue" });
      return;
    }

    const clue: Clue = { definition, hint, example };
    clueCache.set(cacheKey, clue);
    res.json(clue);
  } catch (err) {
    console.error("Spell-it clue error:", err);
    res.status(500).json({ error: "clue_failed" });
  }
});

export default router;
