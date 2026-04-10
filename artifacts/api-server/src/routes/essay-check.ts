import { Router } from "express";
import Anthropic from "@anthropic-ai/sdk";

const router = Router();

function getAnthropicClient() {
  const apiKey = process.env.AI_INTEGRATIONS_ANTHROPIC_API_KEY;
  const baseURL = process.env.AI_INTEGRATIONS_ANTHROPIC_BASE_URL;
  if (!apiKey || !baseURL) {
    throw new Error("Anthropic env vars not configured.");
  }
  return new Anthropic({ apiKey, baseURL });
}

const SYSTEM_PROMPT = `You are an expert IELTS examiner with 20 years of experience.
Analyze the essay strictly based on the four official IELTS scoring criteria.
Return ONLY a valid JSON object, no markdown, no extra text.

{
  "taskType": "Task 1 or Task 2",
  "overallBand": 6.5,
  "scores": {
    "taskResponse": { "band": 6, "feedback": "..." },
    "coherenceCohesion": { "band": 7, "feedback": "..." },
    "lexicalResource": { "band": 6, "feedback": "..." },
    "grammaticalRange": { "band": 6, "feedback": "..." }
  },
  "grammarErrors": [
    {
      "original": "exact wrong phrase from essay",
      "correction": "corrected version",
      "explanation": "why it is wrong",
      "type": "grammar"
    }
  ],
  "vocabularyUpgrades": [
    {
      "original": "basic word used",
      "better": "advanced alternative",
      "example": "example sentence using the better word",
      "reason": "why this upgrade improves the score"
    }
  ],
  "coherenceIssues": [
    {
      "original": "exact phrase with weak linking",
      "correction": "improved version",
      "explanation": "why this affects coherence score"
    }
  ],
  "strengths": ["strength 1", "strength 2"],
  "improvements": ["improvement 1", "improvement 2"],
  "revisedIntroduction": "rewritten version of the introduction only",
  "exampleEssayBand6": "A complete rewritten version of the student's essay at Band 5.5-6 level. Fix the most critical grammar and structure errors, improve basic vocabulary slightly, but keep the writing style relatively simple and accessible. The essay should feel like a real student wrote it after some improvement — not perfect, but clearly better than the original.",
  "exampleEssayBand8": "A complete rewritten version of the student's essay at Band 7-8 level. Use sophisticated vocabulary, complex grammatical structures, strong cohesive devices, well-developed arguments with specific examples, and a clear academic tone. This should demonstrate what an advanced IELTS candidate writes."
}

IMPORTANT:
- For grammarErrors, vocabularyUpgrades, and coherenceIssues, the original field must contain the exact phrase as it appears in the essay so it can be located and highlighted in the text.
- exampleEssayBand6 and exampleEssayBand8 must be COMPLETE full essays (all paragraphs), not just introductions. They must address the same topic as the student's essay.`;

const PARAGRAPH_SYSTEM_PROMPT = `You are an expert English writing coach.
The student has written a paragraph, message, or email — NOT an IELTS task.
Do NOT apply IELTS band score criteria.
Evaluate based on: Grammar, Punctuation, Vocabulary, and Coherence.

Return ONLY a valid JSON object with these exact keys (all values are plain text strings):
{
  "strengths": "A clear list of what the student did well. Use bullet points with • for each point.",
  "improvements": "A clear list of specific issues found. Use ❌ original → ✅ correction format for each issue.",
  "annotated": "The full original text with every error marked inline. Format: ❌ [wrong word/phrase] → ✅ [correction]. Show the complete text with all corrections embedded naturally.",
  "corrected": "The original paragraph fully corrected, keeping the student's original voice and style. No explanations — just the clean corrected version.",
  "better": "An improved version with more sophisticated vocabulary and varied sentence structures. Same meaning, more impressive language.",
  "formal": "A professional/formal version suitable for work, email, or academic submission. Polished and authoritative tone."
}

IMPORTANT: Return only the JSON object. No markdown, no extra text.`;

router.post("/paragraph-check", async (req, res) => {
  try {
    const { text } = req.body as { text: string };
    if (!text || typeof text !== "string" || text.trim().length < 5) {
      res.status(400).json({ error: "Please enter some text to analyse." });
      return;
    }
    const anthropic = getAnthropicClient();
    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 4096,
      system: PARAGRAPH_SYSTEM_PROMPT,
      messages: [{ role: "user", content: `Please correct this paragraph:\n\n${text}` }],
    });
    const block = message.content[0];
    if (block.type !== "text") { res.status(500).json({ error: "Unexpected AI response." }); return; }
    let parsed: unknown;
    try { parsed = JSON.parse(block.text); }
    catch {
      const jsonMatch = block.text.match(/\{[\s\S]*\}/);
      if (jsonMatch) { parsed = JSON.parse(jsonMatch[0]); }
      else { res.status(500).json({ error: "Could not parse AI response." }); return; }
    }
    res.json(parsed);
  } catch (err) {
    console.error("Paragraph check error:", err);
    res.status(500).json({ error: "AI analysis failed. Please try again." });
  }
});

router.post("/essay-check", async (req, res) => {
  try {
    const { essay, taskType } = req.body as { essay: string; taskType: string };

    if (!essay || typeof essay !== "string" || essay.trim().length < 10) {
      res.status(400).json({ error: "Please enter some text to analyse." });
      return;
    }

    const anthropic = getAnthropicClient();
    const userMessage = `Please analyze this IELTS ${taskType} essay:\n\n${essay}`;

    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 8192,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: userMessage }],
    });

    const block = message.content[0];
    if (block.type !== "text") {
      res.status(500).json({ error: "Unexpected response from AI." });
      return;
    }

    let parsed: unknown;
    try {
      parsed = JSON.parse(block.text);
    } catch {
      const jsonMatch = block.text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsed = JSON.parse(jsonMatch[0]);
      } else {
        res.status(500).json({ error: "Could not parse AI response as JSON." });
        return;
      }
    }

    res.json(parsed);
  } catch (err) {
    console.error("Essay check error:", err);
    res.status(500).json({ error: "AI analysis failed. Please try again." });
  }
});

export default router;
