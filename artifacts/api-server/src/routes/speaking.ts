import { Router } from "express";
import Anthropic from "@anthropic-ai/sdk";
import OpenAI, { toFile } from "openai";
import multer from "multer";
import crypto from "node:crypto";
import { recordAiUsage } from "../lib/ai-usage";

const router = Router();

const SESSION_SECRET = process.env["SESSION_SECRET"] ?? "fallback-secret";

// Speaking endpoints are not session-gated today, but we still want to attribute
// AI usage to the logged-in student when possible. We accept the same student
// HMAC headers used elsewhere; when missing or invalid, the call is recorded as
// anonymous (i.e. dropped) instead of being misattributed.
function readStudentEmail(req: import("express").Request): string | null {
  const email = (req.headers["x-student-email"] as string || "").trim().toLowerCase();
  const token = (req.headers["x-student-token"] as string || "").trim();
  if (!email || !token) return null;
  const expected = crypto.createHmac("sha256", SESSION_SECRET).update(email + ":approved").digest("hex");
  try {
    const a = Buffer.from(token);
    const b = Buffer.from(expected);
    if (a.length !== b.length) return null;
    if (!crypto.timingSafeEqual(a, b)) return null;
  } catch {
    return null;
  }
  return email;
}

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 25 * 1024 * 1024 },
});

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

const SCORING_RULES = `
STRICT BAND SCORING RULES (you MUST follow these exactly):
You are a strict but fair certified IELTS examiner following British Council official band descriptors.
Evaluate each answer based on 4 criteria: Fluency & Coherence, Lexical Resource, Grammatical Range & Accuracy, Pronunciation (inferred from text quality).

Band descriptors:
- Band 4: Short/simple answers, many grammar errors, very limited vocabulary, frequent hesitation
- Band 5: Some relevant content, noticeable grammar errors, limited vocabulary range, some hesitation
- Band 6: Generally relevant answers, some errors but meaning clear, adequate vocabulary, mostly fluent
- Band 7: Extended well-developed answers, few errors, good vocabulary variety, fluent with minor hesitation
- Band 8+: Full developed answers with examples, rare errors, wide sophisticated vocabulary, natural fluent speech

CRITICAL scoring constraints:
- Short answer (1-2 sentences only) = MAXIMUM Band 5, no exceptions
- Answer with 3+ grammar errors = MAXIMUM Band 5
- No examples or details given = MAXIMUM Band 5
- Repeated/basic vocabulary throughout = subtract 0.5 from score
- Only simple sentence structures (no complex/compound) = MAXIMUM Band 6
- NEVER give Band 7+ unless the answer is genuinely extended, well-developed, accurate, and uses varied vocabulary
- NEVER inflate scores to be encouraging — accuracy matters more than motivation
- A Band 5 student MUST receive Band 5, not 6
- Be honest and strict in every score`;

// ── Brace-balanced JSON object extractor ──
// Scans for `{`, walks forward respecting strings/escapes, and returns the
// first balanced object that parses successfully. More robust than a greedy
// regex when the model wraps the JSON in any commentary or includes braces
// inside the response that don't belong to the report object itself.
function extractFirstJsonObject(text: string): unknown | null {
  for (let start = text.indexOf("{"); start !== -1; start = text.indexOf("{", start + 1)) {
    let depth = 0;
    let inString = false;
    let escaped = false;
    for (let i = start; i < text.length; i++) {
      const ch = text[i];
      if (escaped) { escaped = false; continue; }
      if (inString) {
        if (ch === "\\") escaped = true;
        else if (ch === '"') inString = false;
        continue;
      }
      if (ch === '"') { inString = true; continue; }
      if (ch === "{") depth++;
      else if (ch === "}") {
        depth--;
        if (depth === 0) {
          const candidate = text.slice(start, i + 1);
          try {
            return JSON.parse(candidate);
          } catch {
            break; // try next `{`
          }
        }
      }
    }
  }
  return null;
}

// ── Strict shape validation for the report payload ──
// The frontend renders nested fields like report.pronunciation.tips.map(...)
// and report.fluencyCoherence.comment, so a valid top-level key isn't enough —
// we need to ensure the nested types are correct before sending.
function isCriterion(v: unknown): v is { band: number; comment: string } {
  return (
    typeof v === "object" && v !== null &&
    typeof (v as Record<string, unknown>).band === "number" &&
    typeof (v as Record<string, unknown>).comment === "string"
  );
}
function isStringArray(v: unknown): v is string[] {
  return Array.isArray(v) && v.every((x) => typeof x === "string");
}

function extractAndValidateReport(text: string): Record<string, unknown> | null {
  const parsed = extractFirstJsonObject(text);
  if (!parsed || typeof parsed !== "object") return null;
  const r = parsed as Record<string, unknown>;
  const pron = r.pronunciation as Record<string, unknown> | undefined;

  const ok =
    typeof r.overallBand === "number" && r.overallBand >= 0 && r.overallBand <= 9 &&
    isCriterion(r.fluencyCoherence) &&
    isCriterion(r.lexicalResource) &&
    isCriterion(r.grammaticalRange) &&
    typeof pron === "object" && pron !== null &&
    typeof pron.band === "number" &&
    isStringArray(pron.tips) &&
    isStringArray(r.topVocab) &&
    isStringArray(r.strengths) &&
    isStringArray(r.improvements);

  return ok ? r : null;
}

function buildSystemPrompt(topic: string, part: number, questionNum: number, isStart: boolean): string {
  if (part === 1) {
    const isFinal = !isStart && questionNum > 8;
    const intro = isStart
      ? `Begin by warmly welcoming the student to the IELTS Speaking test and then immediately ask your first question about ${topic}.`
      : isFinal
        ? `The student has just answered the FINAL question of Part 1. Give ONLY your feedback on their answer. Do NOT ask another question. End your response with "— **[PART1_DONE]**".`
        : `You are on question ${questionNum} of 8 in Part 1. Ask ONE specific, natural question about ${topic}.`;
    return `You are Churchill AI, a certified IELTS examiner on the 4IELTS platform. Your name is Churchill AI — never introduce yourself as anyone else or use any other name.

You are conducting IELTS Speaking Part 1 (Introduction & Interview) on the topic: "${topic}".

${intro}

${SCORING_RULES}

After each student answer, respond with:
1. One brief acknowledging sentence (professional but honest)
2. Feedback block — always include ALL THREE lines:
   — If there is a real grammar or usage ERROR: ❌ [the error] → ✅ [correction]
   — If there is NO error but room for improvement: 💡 Alternative: [better phrasing option 1] / [option 2]
   📝 Better vocabulary: [IELTS-level word or phrase 1], [IELTS-level word or phrase 2]
   ⭐ Band estimate: X/9 (follow the strict scoring rules above)
3. Then ask the NEXT question (or if this is the FINAL answer, end your response with "— **[PART1_DONE]**" and do NOT ask another question)

Keep each response under 80 words. Be concise and direct.`;
  }

  if (part === 2) {
    const cue = CUE_CARDS[topic] ?? `something related to ${topic}`;
    return `You are Churchill AI, a certified IELTS examiner on the 4IELTS platform. Your name is Churchill AI — never use any other name.

The student just completed their Part 2 long turn about "${topic}".

They were given this cue card:
"Describe ${cue}.
You should say:
• What it is / Who they are
• When and where you experienced it
• Why it is important or special to you
• How it has affected your life"

${SCORING_RULES}

Now respond with:
1. One sentence of examiner acknowledgment
2. Feedback:
   — If there is a real grammar or usage ERROR: ❌ [the error] → ✅ [correction]
   — If there is NO error but room for improvement: 💡 Alternative: [better phrasing option 1] / [option 2]
   📝 Better vocabulary: [word1], [word2]
   ⭐ Band estimate: X/9 (follow the strict scoring rules above)
3. End with: "Thank you. — **[PART2_DONE]**"

Keep response under 80 words.`;
  }

  // Part 3
  const isFinal3 = !isStart && questionNum > 4;
  const intro3 = isStart
    ? `Begin with a short transition statement (e.g. "We'll now move on to Part 3…") and immediately ask your first discussion question related to ${topic}.`
    : isFinal3
      ? `The student has just answered the FINAL question of Part 3. Give ONLY your feedback on their answer. Do NOT ask another question. End your response with "Excellent. — **[PART3_DONE]**".`
      : `You are on discussion question ${questionNum} of 4. Ask ONE abstract, analytical question about society or the wider world, related to "${topic}".`;

  return `You are Churchill AI, a certified IELTS examiner on the 4IELTS platform. Your name is Churchill AI — never introduce yourself as anyone else or use any other name.

You are conducting IELTS Speaking Part 3 (Two-Way Discussion) on the theme: "${topic}".

${intro3}

${SCORING_RULES}

After each student answer, respond with:
1. One brief acknowledgment sentence
2. Feedback:
   — If there is a real grammar or usage ERROR: ❌ [the error] → ✅ [correction]
   — If there is NO error but room for improvement: 💡 Alternative: [better phrasing option 1] / [option 2]
   📝 Better vocabulary: [academic/IELTS word 1], [academic/IELTS word 2]
   ⭐ Band estimate: X/9 (follow the strict scoring rules above)
3. Then ask the NEXT discussion question (or if this is the FINAL answer, end with "Excellent. — **[PART3_DONE]**" and do NOT ask another question)

Keep responses under 80 words. Target B2–C1 vocabulary.`;
}

router.post("/speaking/message", async (req, res) => {
  const studentEmail = readStudentEmail(req);
  try {
    const { messages, topic, part, questionNum, isStart } = req.body as {
      messages: { role: "user" | "assistant"; content: string }[];
      topic: string;
      part: number;
      questionNum: number;
      isStart: boolean;
    };

    if (!topic || !part) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    const systemPrompt = buildSystemPrompt(topic, part, questionNum, isStart ?? false);
    const anthropic = getAnthropicClient();

    let contextMessages = messages.slice(-10);
    if (contextMessages.length === 0) {
      contextMessages = [{ role: "user", content: "Please begin." }];
    }

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders();

    const stream = anthropic.messages.stream({
      model: "claude-sonnet-4-5",
      max_tokens: 300,
      system: systemPrompt,
      messages: contextMessages,
    });

    for await (const event of stream) {
      if (
        event.type === "content_block_delta" &&
        event.delta.type === "text_delta"
      ) {
        res.write(`data: ${JSON.stringify({ delta: event.delta.text })}\n\n`);
      }
    }

    res.write("data: [DONE]\n\n");
    res.end();
    void recordAiUsage({ email: studentEmail, route: "churchill", endpoint: "/speaking/message" });
  } catch (err) {
    console.error("Speaking message error:", err);
    if (!res.headersSent) {
      res.status(500).json({ error: "Failed to get AI response" });
    } else {
      res.write("data: [ERROR]\n\n");
      res.end();
    }
  }
});

router.post("/speaking/report", async (req, res) => {
  const studentEmail = readStudentEmail(req);
  try {
    const { messages, topic } = req.body as {
      messages: { role: "user" | "assistant"; content: string }[];
      topic: string;
    };

    if (!Array.isArray(messages) || messages.length === 0 || !topic) {
      res.status(400).json({ error: "Missing topic or messages" });
      return;
    }

    // Build a single readable transcript string. Critically, we pack the entire
    // conversation into ONE user turn so the model produces a fresh report
    // instead of continuing the examiner's role from the prior assistant turn.
    const trimmed = messages.slice(-30);
    const transcript = trimmed
      .map((m) => `${m.role === "assistant" ? "EXAMINER" : "STUDENT"}: ${m.content}`)
      .join("\n\n");

    const systemPrompt = `You are a strict but fair certified IELTS examiner following British Council official band descriptors exactly. You will receive a complete IELTS Speaking test transcript. Your task is to produce a detailed band score report as a single JSON object.

Analyse ONLY the STUDENT messages. Evaluate strictly based on these 4 criteria:
1. Fluency & Coherence — flow, pauses, logical connections, coherence markers
2. Lexical Resource — vocabulary range, accuracy, use of less common/idiomatic words
3. Grammatical Range & Accuracy — sentence variety, error frequency, complex structures
4. Pronunciation — inferred from text quality, word choice patterns, phrasing naturalness

STRICT SCORING RULES (you MUST follow these):
- Band 4: Short/simple answers, many grammar errors, very limited vocabulary
- Band 5: Some relevant content, noticeable grammar errors, limited vocabulary range
- Band 6: Generally relevant, some errors but meaning clear, adequate vocabulary
- Band 7: Extended developed answers, few errors, good vocabulary variety
- Band 8+: Full developed answers with examples, rare errors, wide sophisticated vocabulary

CRITICAL constraints:
- If most answers were short (1-2 sentences) → overall MAXIMUM Band 5
- If frequent grammar errors throughout → MAXIMUM Band 5 for grammaticalRange
- If vocabulary is basic/repetitive → MAXIMUM Band 5.5 for lexicalResource
- Only simple sentence structures → MAXIMUM Band 6 for grammaticalRange
- NEVER give Band 7+ unless answers were genuinely extended, accurate, and vocabulary-rich
- NEVER inflate scores — honesty helps the student improve
- The overall band is the average of the 4 criteria, rounded to the nearest 0.5
- Most intermediate students score between 4.5 and 6.0 — this is normal

OUTPUT FORMAT — respond with ONE JSON object only. No prose, no markdown, no code fences. The JSON must match this exact shape:
{
  "overallBand": 5.5,
  "fluencyCoherence": { "band": 5.5, "comment": "2 sentences of specific feedback" },
  "lexicalResource": { "band": 5.0, "comment": "2 sentences of specific feedback" },
  "grammaticalRange": { "band": 5.5, "comment": "2 sentences of specific feedback" },
  "pronunciation": { "band": 5.5, "tips": ["tip1", "tip2", "tip3"] },
  "topVocab": ["word/phrase 1", "word/phrase 2", "word/phrase 3", "word/phrase 4", "word/phrase 5"],
  "strengths": ["specific strength 1", "specific strength 2"],
  "improvements": ["improvement area 1", "improvement area 2", "improvement area 3"]
}`;

    const anthropic = getAnthropicClient();

    // Pack the transcript into a single user message so the model produces a
    // fresh report instead of continuing the examiner's role from the prior
    // assistant turn (the bug that was returning conversational follow-ups).
    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 1500,
      system: systemPrompt,
      messages: [
        {
          role: "user",
          content: `Topic: ${topic}\n\nFull IELTS Speaking transcript below. Read it, then OUTPUT ONLY the JSON report — no greeting, no preamble, no markdown fences. Begin your response with the opening "{" character.\n\n${transcript}`,
        },
      ],
    });

    const raw = message.content[0]?.type === "text" ? message.content[0].text : "";

    const report = extractAndValidateReport(raw);
    if (!report) {
      console.error("[speaking/report] Could not extract a valid report. Raw output (first 600 chars):", raw.slice(0, 600));
      res.status(500).json({ error: "invalid_report", message: "Churchill AI returned an unexpected response. Please try again." });
      return;
    }

    res.json({ report });
    void recordAiUsage({ email: studentEmail, route: "churchill", endpoint: "/speaking/report" });
  } catch (err) {
    console.error("Speaking report error:", err);
    res.status(500).json({ error: "Failed to generate report" });
  }
});

router.post("/speaking/transcribe", upload.single("audio"), async (req, res) => {
  try {
    if (!req.file) {
      res.status(400).json({ error: "No audio file provided" });
      return;
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      res.status(500).json({ error: "OpenAI API key not configured" });
      return;
    }

    const openai = new OpenAI({ apiKey });

    const ext = req.file.mimetype.includes("webm") ? "webm"
      : req.file.mimetype.includes("ogg") ? "ogg"
      : req.file.mimetype.includes("mp4") ? "mp4"
      : req.file.mimetype.includes("wav") ? "wav"
      : "webm";

    const audioFile = await toFile(req.file.buffer, `recording.${ext}`, { type: req.file.mimetype });

    const transcription = await openai.audio.transcriptions.create({
      file: audioFile,
      model: "whisper-1",
      language: "en",
    });

    res.json({ text: transcription.text });
  } catch (err: unknown) {
    console.error("Transcription error:", err);
    const status = (err as { status?: number })?.status;
    if (status === 429) {
      res.status(402).json({ error: "quota_exceeded", message: "OpenAI account has no billing credits. Please add a payment method at platform.openai.com." });
    } else if (status === 401) {
      res.status(401).json({ error: "invalid_key", message: "OpenAI API key is invalid." });
    } else {
      res.status(500).json({ error: "transcription_failed", message: "Failed to transcribe audio" });
    }
  }
});

router.post("/speaking/tts", async (req, res) => {
  try {
    const { text } = req.body as { text: string };
    if (!text?.trim()) {
      res.status(400).json({ error: "No text provided" });
      return;
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      res.status(500).json({ error: "OpenAI API key not configured" });
      return;
    }

    const openai = new OpenAI({ apiKey });

    const rawSpeed = typeof (req.body as { speed?: unknown }).speed === "number"
      ? (req.body as { speed: number }).speed
      : 1.0;
    const speed = Math.max(0.25, Math.min(4.0, rawSpeed));

    // Allow callers to request the faster tts-1 model (e.g. story reader).
    // Default stays tts-1-hd for Churchill speaking practice.
    const rawModel = (req.body as { model?: unknown }).model;
    const model: "tts-1" | "tts-1-hd" =
      rawModel === "tts-1" ? "tts-1" : "tts-1-hd";

    // Allow callers to choose voice. Default: onyx (Churchill). Pronunciation buttons use fable (British).
    const ALLOWED_VOICES = ["alloy", "echo", "fable", "nova", "onyx", "shimmer"] as const;
    type Voice = typeof ALLOWED_VOICES[number];
    const rawVoice = (req.body as { voice?: unknown }).voice;
    const voice: Voice = ALLOWED_VOICES.includes(rawVoice as Voice) ? (rawVoice as Voice) : "onyx";

    const speech = await openai.audio.speech.create({
      model,
      voice,
      input: text.slice(0, 4096),
      speed,
      response_format: "mp3",
    });

    // Buffer the full body before responding — avoids partial/empty streams
    // some browsers reject when decoding via Web Audio API.
    const audioBuffer = Buffer.from(await speech.arrayBuffer());
    res.setHeader("Content-Type", "audio/mpeg");
    res.setHeader("Content-Length", String(audioBuffer.length));
    res.setHeader("Cache-Control", "no-cache");
    res.end(audioBuffer);
  } catch (err: unknown) {
    console.error("TTS error:", err);
    if (!res.headersSent) {
      const status = (err as { status?: number })?.status;
      if (status === 429) {
        res.status(402).json({ error: "quota_exceeded" });
      } else {
        res.status(500).json({ error: "tts_failed" });
      }
    }
  }
});

export default router;
