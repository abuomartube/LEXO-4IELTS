import { Router } from "express";
import Anthropic from "@anthropic-ai/sdk";

const router = Router();

function getAnthropicClient() {
  const apiKey = process.env.AI_INTEGRATIONS_ANTHROPIC_API_KEY;
  const baseURL = process.env.AI_INTEGRATIONS_ANTHROPIC_BASE_URL;
  if (!apiKey || !baseURL) throw new Error("Anthropic env vars not configured.");
  return new Anthropic({ apiKey, baseURL });
}

const CUE_CARDS: Record<string, string> = {
  "Hometown": "a place you grew up in or know well",
  "Daily routine": "a typical day in your life",
  "Food & cooking": "a meal or dish that is special to you",
  "Sports": "a sport or physical activity you have tried",
  "Music": "a song or type of music that is meaningful to you",
  "Reading": "a book, article, or story that impressed you",
  "Weather": "a time when the weather had a strong effect on you",
  "Shopping": "a purchase or shopping experience you remember",
  "Travel": "a journey or trip that was memorable",
  "Technology": "a piece of technology that has changed your life",
  "Friends": "a close friend and your friendship",
  "Family": "a family member who has been important to you",
  "Work/Study": "a job, task, or course of study you have experienced",
  "Mornings": "your morning routine or a morning that stands out",
  "Free time": "a hobby or activity you enjoy in your free time",
};

function buildSystemPrompt(topic: string, part: number, questionNum: number, isStart: boolean): string {
  if (part === 1) {
    const intro = isStart
      ? `Begin by warmly welcoming the student to the IELTS Speaking test and then immediately ask your first question about ${topic}.`
      : `You are on question ${questionNum} of 5 in Part 1. Ask ONE specific, natural question about ${topic}.`;
    return `You are a certified IELTS examiner conducting IELTS Speaking Part 1 (Introduction & Interview) on the topic: "${topic}".

${intro}

After each student answer, respond with:
1. One brief acknowledging sentence (professional, encouraging)
2. Feedback block — always include ALL THREE lines even if minor:
   ❌ [grammar mistake or usage error] → ✅ [correction]
   📝 Better vocabulary: [IELTS-level word or phrase 1], [IELTS-level word or phrase 2]
   ⭐ Band estimate: X/9
3. Then ask the NEXT question (or if you just answered question 5, end your response with "— **[PART1_DONE]**")

Keep each response under 150 words. Use an encouraging, professional tone.`;
  }

  if (part === 2) {
    const cue = CUE_CARDS[topic] ?? `something related to ${topic}`;
    return `You are a certified IELTS examiner. The student just completed their Part 2 long turn about "${topic}".

They were given this cue card:
"Describe ${cue}.
You should say:
• What it is / Who they are
• When and where you experienced it
• Why it is important or special to you
• How it has affected your life"

Now respond with:
1. One sentence of examiner acknowledgment
2. Feedback:
   ❌ [grammar error or awkward phrasing] → ✅ [correction]
   📝 Better vocabulary: [word1], [word2]
   ⭐ Band estimate: X/9
3. End with: "Thank you. — **[PART2_DONE]**"

Keep response under 130 words.`;
  }

  // Part 3
  const intro3 = isStart
    ? `Begin with a short transition statement (e.g. "We'll now move on to Part 3…") and immediately ask your first discussion question related to ${topic}.`
    : `You are on discussion question ${questionNum} of 4. Ask ONE abstract, analytical question about society or the wider world, related to "${topic}".`;

  return `You are a certified IELTS examiner conducting IELTS Speaking Part 3 (Two-Way Discussion) on the theme: "${topic}".

${intro3}

After each student answer, respond with:
1. One brief acknowledgment sentence
2. Feedback:
   ❌ [grammar error or weak structure] → ✅ [correction]
   📝 Better vocabulary: [academic/IELTS word 1], [academic/IELTS word 2]
   ⭐ Band estimate: X/9
3. Then ask the NEXT discussion question (or if you just received the answer to question 4, end with "Excellent. — **[PART3_DONE]**")

Keep responses under 150 words. Target B2–C1 vocabulary.`;
}

router.post("/speaking/message", async (req, res) => {
  try {
    const { messages, topic, part, questionNum, isStart } = req.body as {
      messages: { role: "user" | "assistant"; content: string }[];
      topic: string;
      part: number;
      questionNum: number;
      isStart: boolean;
    };

    if (!topic || !part) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const systemPrompt = buildSystemPrompt(topic, part, questionNum, isStart ?? false);
    const anthropic = getAnthropicClient();

    // Use last 20 messages max to stay within token limits
    let contextMessages = messages.slice(-20);

    // Anthropic requires at least one message
    if (contextMessages.length === 0) {
      contextMessages = [{ role: "user", content: "Please begin." }];
    }

    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 700,
      system: systemPrompt,
      messages: contextMessages,
    });

    const reply = message.content[0].type === "text" ? message.content[0].text : "";
    res.json({ reply });
  } catch (err) {
    console.error("Speaking message error:", err);
    res.status(500).json({ error: "Failed to get AI response" });
  }
});

router.post("/speaking/report", async (req, res) => {
  try {
    const { messages, topic } = req.body as {
      messages: { role: "user" | "assistant"; content: string }[];
      topic: string;
    };

    const systemPrompt = `You are a certified IELTS examiner. Based on the IELTS Speaking test conversation on the topic "${topic}", generate a detailed band score report.

Analyse ONLY the student's (user) messages. Evaluate:
- Fluency & Coherence
- Lexical Resource
- Grammatical Range & Accuracy  
- Pronunciation (inferred from writing patterns)

Return ONLY a valid JSON object, no markdown, no extra text:
{
  "overallBand": 6.5,
  "fluencyCoherence": { "band": 6.5, "comment": "2 sentences of specific feedback" },
  "lexicalResource": { "band": 6.0, "comment": "2 sentences of specific feedback" },
  "grammaticalRange": { "band": 6.5, "comment": "2 sentences of specific feedback" },
  "pronunciation": { "band": 6.0, "tips": ["tip1", "tip2", "tip3"] },
  "topVocab": ["word/phrase 1", "word/phrase 2", "word/phrase 3", "word/phrase 4", "word/phrase 5"],
  "strengths": ["specific strength 1", "specific strength 2"],
  "improvements": ["improvement area 1", "improvement area 2", "improvement area 3"]
}`;

    const anthropic = getAnthropicClient();

    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 1200,
      system: systemPrompt,
      messages: messages.slice(-30),
    });

    const text = message.content[0].type === "text" ? message.content[0].text : "{}";
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) return res.status(500).json({ error: "Invalid report format" });

    const report = JSON.parse(jsonMatch[0]);
    res.json({ report });
  } catch (err) {
    console.error("Speaking report error:", err);
    res.status(500).json({ error: "Failed to generate report" });
  }
});

export default router;
