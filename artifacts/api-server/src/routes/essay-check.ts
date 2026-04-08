import { Router } from "express";
import { anthropic } from "@workspace/integrations-anthropic-ai";

const router = Router();

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
  "revisedIntroduction": "rewritten version of the introduction only"
}

IMPORTANT: For grammarErrors, vocabularyUpgrades, and coherenceIssues,
the original field must contain the exact phrase as it appears in the
essay so it can be located and highlighted in the text.`;

router.post("/api/essay-check", async (req, res) => {
  try {
    const { essay, taskType } = req.body as { essay: string; taskType: string };

    if (!essay || typeof essay !== "string" || essay.trim().length < 50) {
      res.status(400).json({ error: "Essay is too short." });
      return;
    }

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

    let parsed;
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
