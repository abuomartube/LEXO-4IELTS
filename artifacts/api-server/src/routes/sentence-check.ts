import { Router } from "express";
import Anthropic from "@anthropic-ai/sdk";

const router = Router();

function getAnthropicClient() {
  const apiKey = process.env.AI_INTEGRATIONS_ANTHROPIC_API_KEY;
  const baseURL = process.env.AI_INTEGRATIONS_ANTHROPIC_BASE_URL;
  if (!apiKey || !baseURL) throw new Error("Anthropic env vars not configured.");
  return new Anthropic({ apiKey, baseURL });
}

const SYSTEM_PROMPT = `You are LEXO Sentence Coach — a fast, encouraging IELTS vocabulary tutor for Arabic-speaking students.

The student is given an English target word and must use it in their own sentence. Your job:

1. Decide if the sentence is correct (grammar + correct use of the target word).
2. If WRONG: pinpoint the single most important mistake, explain why briefly, and give a corrected version that still uses the target word naturally.
3. If CORRECT: praise it briefly and offer a more natural / advanced rephrasing that an upper-band IELTS candidate might use.
4. Estimate two IELTS sub-band scores out of 9: vocabulary (use of the target word) and grammar (sentence accuracy). Use halves (e.g. 6.0, 6.5).
5. Provide an Arabic translation of the corrected/improved sentence.
6. Keep tone encouraging, warm, and short — like a kind teacher. Never harsh.

CRITICAL CONSTRAINTS:
- Be FAST. Keep every text field short and direct.
- Always use the target word in the corrected/improved sentence.
- If the student didn't use the target word at all, mark as wrong with explanation: "You didn't use the target word."
- Bands: most learners score 5.0–6.5. Reserve 7+ for genuinely strong sentences.

Return ONLY a valid JSON object, no markdown, no extra text:

{
  "isCorrect": true,
  "errorHighlight": "exact wrong phrase from student's sentence, or null if correct",
  "explanation": "one short sentence explaining the error or praising the student",
  "corrected": "the corrected or improved English sentence using the target word",
  "arabicCorrected": "Arabic translation of the corrected sentence",
  "vocabBand": 6.0,
  "grammarBand": 6.0,
  "encouragement": "one short encouraging line in English (max 12 words)"
}`;

router.post("/sentence-check", async (req, res) => {
  try {
    const { word, arabic, sentence, level } = req.body as {
      word?: string; arabic?: string; sentence?: string; level?: string;
    };
    if (!word || !sentence || typeof sentence !== "string" || sentence.trim().length < 2) {
      res.status(400).json({ error: "Please write a sentence using the word." });
      return;
    }
    const anthropic = getAnthropicClient();
    const userMessage = [
      `Target word: ${word}`,
      arabic ? `Arabic meaning: ${arabic}` : null,
      level ? `Student level: ${level}` : null,
      ``,
      `Student's sentence:`,
      sentence.trim(),
    ].filter(Boolean).join("\n");

    const message = await anthropic.messages.create({
      model: "claude-haiku-4-5",
      max_tokens: 600,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: userMessage }],
    });
    const block = message.content[0];
    if (block.type !== "text") {
      res.status(500).json({ error: "Unexpected AI response." });
      return;
    }
    let parsed: any;
    try { parsed = JSON.parse(block.text); }
    catch {
      const m = block.text.match(/\{[\s\S]*\}/);
      if (m) parsed = JSON.parse(m[0]);
      else { res.status(500).json({ error: "Could not parse AI response." }); return; }
    }
    res.json(parsed);
  } catch (err) {
    console.error("Sentence check error:", err);
    res.status(500).json({ error: "AI analysis failed. Please try again." });
  }
});

export default router;
