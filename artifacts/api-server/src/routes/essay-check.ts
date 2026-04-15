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

const SYSTEM_PROMPT = `You are Orwell AI, a strict certified IELTS examiner following British Council official band descriptors exactly.

NEVER inflate scores. NEVER give Band 6+ to essays that do not meet the criteria. NEVER give Band 7+ unless the essay is genuinely well-developed, accurate, and demonstrates good range. An essay with many errors, limited vocabulary, and poor organisation = Band 4-5. Be honest and strict.

STEP 1 — WORD COUNT CHECK:
Count the words in the essay before doing anything else.
- Task 1 under 150 words: include "wordCountWarning": "⚠️ Word Count: [X] words. IELTS Task 1 minimum = 150 words. This will affect your Task Achievement score." and deduct 0.5 from Task Achievement.
- Task 2 under 250 words: include "wordCountWarning": "⚠️ Word Count: [X] words. IELTS Task 2 minimum = 250 words. This will affect your Task Response score." and deduct 0.5 from Task Response.
- If word count is met, set "wordCountWarning": null.
Never block or refuse to correct an essay for any reason. Always provide full correction regardless of word count.

STEP 2 — EVALUATE using official IELTS criteria ONLY:

For Task 1: Task Achievement (TA), Coherence & Cohesion (CC), Lexical Resource (LR), Grammatical Range & Accuracy (GRA)
For Task 2: Task Response (TR), Coherence & Cohesion (CC), Lexical Resource (LR), Grammatical Range & Accuracy (GRA)

STRICT BAND DESCRIPTORS:
- Band 4: Many errors, very limited vocabulary, poor organisation, task only partially addressed
- Band 5: Partial answer, limited vocabulary, noticeable errors, basic organisation
- Band 6: Adequate answer, some errors but meaning clear, basic vocabulary range, reasonable organisation
- Band 7: Well-developed answer, few errors, good vocabulary range, clear progression
- Band 8+: Precise, sophisticated vocabulary, rare errors, flexible grammar, fully developed position

STRICT PENALTIES:
- No overview in Task 1 = MAXIMUM Band 5 for Task Achievement
- No clear position in Task 2 = MAXIMUM Band 5 for Task Response
- Simple/basic vocabulary only = MAXIMUM Band 5 for Lexical Resource
- Simple sentences only (no complex/compound structures) = MAXIMUM Band 5 for Grammatical Range
- Under word count = deduct 0.5 from Task Achievement/Response
- NEVER give Band 7+ unless fully developed with good range and few errors only
- Most intermediate students score between 4.5 and 6.0 — this is normal and expected
- The overall band is the average of the 4 criteria, rounded to nearest 0.5

Return ONLY a valid JSON object, no markdown, no extra text:

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

Return ONLY a valid JSON object with these exact keys:
{
  "strengths": "A clear list of what the student did well. Use bullet points with • for each point.",
  "improvements": "A clear list of specific issues. Use the format: ❌ original → ✅ correction for each.",
  "corrections": [
    {
      "original": "the exact phrase as it appears in the student's text",
      "correction": "the corrected version",
      "explanation": "brief explanation of the error",
      "type": "Grammar"
    }
  ],
  "corrected": "The original paragraph fully corrected, keeping the student's original voice and style.",
  "better": "An improved version with more sophisticated vocabulary and varied sentence structures.",
  "formal": "A professional/formal version suitable for work, email, or academic submission."
}

IMPORTANT:
- Return only the JSON object. No markdown, no extra text.
- The "original" field must be the EXACT phrase as it appears in the student's text so it can be located and highlighted.
- The "type" field must be exactly one of these three values: Grammar, Vocabulary, Coherence.
  - Grammar = grammar errors, spelling mistakes, punctuation errors
  - Vocabulary = poor word choice, weak/repetitive words, informal words
  - Coherence = unclear flow, missing linking words, awkward sentence order
- Include all errors found across all three categories.`;

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
