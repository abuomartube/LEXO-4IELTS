import express from "express";
import cors from "cors";
import multer from "multer";
import OpenAI, { toFile } from "openai";

const app = express();
const PORT = process.env.PORT ?? 3001;

app.use(cors());
app.use(express.json());

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 25 * 1024 * 1024 } });

function getOpenAI() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("OPENAI_API_KEY is not set");
  return new OpenAI({ apiKey });
}

// ── Examiner chat (GPT-4o) ────────────────────────────────────────────────────

app.post("/api/message", async (req, res) => {
  try {
    const { messages, topic, part, questionNum, isStart } = req.body as {
      messages: { role: "user" | "assistant"; content: string }[];
      topic: string;
      part: number;
      questionNum: number;
      isStart: boolean;
    };

    if (!topic || !part) { res.status(400).json({ error: "Missing fields" }); return; }

    const systemPrompt = buildSystemPrompt(topic, part, questionNum, isStart ?? false);
    const openai = getOpenAI();

    let ctx = messages.slice(-10);
    if (ctx.length === 0) ctx = [{ role: "user", content: "Please begin." }];

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders();

    const stream = await openai.chat.completions.create({
      model: "gpt-4o",
      max_tokens: 300,
      stream: true,
      messages: [{ role: "system", content: systemPrompt }, ...ctx],
    });

    for await (const chunk of stream) {
      const delta = chunk.choices[0]?.delta?.content ?? "";
      if (delta) res.write(`data: ${JSON.stringify({ delta })}\n\n`);
    }
    res.write("data: [DONE]\n\n");
    res.end();
  } catch (err) {
    console.error("Message error:", err);
    if (!res.headersSent) res.status(500).json({ error: "ai_failed" });
    else { res.write("data: [ERROR]\n\n"); res.end(); }
  }
});

// ── Final report (GPT-4o) ─────────────────────────────────────────────────────

app.post("/api/report", async (req, res) => {
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

    const openai = getOpenAI();
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      max_tokens: 1200,
      messages: [{ role: "system", content: systemPrompt }, ...messages.slice(-30)],
    });

    const text = response.choices[0]?.message?.content ?? "{}";
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) { res.status(500).json({ error: "Invalid report format" }); return; }
    res.json({ report: JSON.parse(jsonMatch[0]) });
  } catch (err) {
    console.error("Report error:", err);
    res.status(500).json({ error: "report_failed" });
  }
});

// ── Whisper transcription ─────────────────────────────────────────────────────

app.post("/api/transcribe", upload.single("audio"), async (req, res) => {
  try {
    if (!req.file) { res.status(400).json({ error: "No audio file" }); return; }
    const openai = getOpenAI();
    const ext = req.file.mimetype.includes("webm") ? "webm"
      : req.file.mimetype.includes("ogg") ? "ogg"
      : req.file.mimetype.includes("mp4") ? "mp4"
      : req.file.mimetype.includes("wav") ? "wav" : "webm";
    const audioFile = await toFile(req.file.buffer, `recording.${ext}`, { type: req.file.mimetype });
    const result = await openai.audio.transcriptions.create({ file: audioFile, model: "whisper-1", language: "en" });
    res.json({ text: result.text });
  } catch (err: unknown) {
    console.error("Transcribe error:", err);
    const status = (err as { status?: number })?.status;
    if (status === 429) res.status(402).json({ error: "quota_exceeded" });
    else res.status(500).json({ error: "transcription_failed" });
  }
});

// ── TTS ───────────────────────────────────────────────────────────────────────

app.post("/api/tts", async (req, res) => {
  try {
    const { text, speed } = req.body as { text: string; speed?: number };
    if (!text?.trim()) { res.status(400).json({ error: "No text" }); return; }
    const openai = getOpenAI();
    const rate = Math.max(0.25, Math.min(4.0, typeof speed === "number" ? speed : 1.0));
    const speech = await openai.audio.speech.create({ model: "tts-1-hd", voice: "onyx", input: text.slice(0, 4096), speed: rate });
    res.setHeader("Content-Type", "audio/mpeg");
    res.setHeader("Cache-Control", "no-cache");
    const stream = speech.body as ReadableStream<Uint8Array>;
    const reader = stream.getReader();
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        res.write(Buffer.from(value));
      }
      res.end();
    } finally { reader.releaseLock(); }
  } catch (err) {
    console.error("TTS error:", err);
    if (!res.headersSent) res.status(500).json({ error: "tts_failed" });
  }
});

// ── System prompts ────────────────────────────────────────────────────────────

const CUE_CARDS: Record<string, string> = {
  "Weather": "a time when the weather had a strong effect on your plans or mood",
  "Seasons": "a season of the year that is special or meaningful to you",
  "Nature": "a place in nature that you find beautiful or peaceful",
  "Animals": "an animal that you find interesting or that has been important to you",
  "Environment": "something you or others do to help protect the environment",
  "Plants": "a plant, flower, or garden that you find meaningful",
  "Oceans": "a memorable experience you had near the sea or ocean",
  "Mountains": "a mountain or outdoor landscape you have visited or would like to visit",
  "Forests": "a forest, park, or green area that you enjoy or find interesting",
  "Climate change": "something you have noticed about climate change or its effects",
  "Daily routine": "a typical day in your life",
  "Food & cooking": "a meal or dish that is special to you",
  "Sports": "a sport or physical activity you enjoy or have tried",
  "Music": "a song, artist, or type of music that is meaningful to you",
  "Reading": "a book, article, or story that impressed or influenced you",
  "Shopping": "a purchase or shopping experience you remember well",
  "Fashion": "an item of clothing or style that is meaningful to you",
  "Sleep habits": "a sleep habit or bedtime routine that you follow",
  "Morning routines": "your morning routine or a morning that stands out in your memory",
  "Cooking": "a dish you enjoy cooking or a cooking experience you remember",
  "Eating out": "a restaurant or café that you have enjoyed visiting",
  "Street food": "a type of street food or local snack that you enjoy",
  "Diets": "a change in eating habits or diet that has affected your life",
  "Exercise habits": "a form of exercise or physical activity you do regularly",
  "Weekend activities": "something you enjoy doing at the weekend",
  "Friends": "a close friend and your friendship with them",
  "Family": "a family member who has been important to you",
  "Neighbors": "a neighbour or someone who lives near you that you find interesting",
  "Childhood": "a memory or experience from your childhood that stands out",
  "Relationships": "an important relationship in your life and what makes it special",
  "Social media": "a social media platform or online community you use",
  "Festivals": "a festival or cultural event you have attended or celebrated",
  "Celebrations": "a celebration or special occasion that you remember well",
  "Weddings": "a wedding or marriage ceremony you have attended or know about",
  "Traditions": "a tradition in your family or culture that is meaningful to you",
  "Community": "a community group, club, or organisation you are part of or know about",
  "Volunteering": "a time when you or someone you know volunteered to help others",
  "Hometown": "a place you grew up in or know very well",
  "Travel": "a journey or trip that was particularly memorable",
  "Cities": "a city you have visited or would like to visit",
  "Villages": "a village or small town you have visited or heard about",
  "Parks": "a park or outdoor public space you enjoy",
  "Museums": "a museum, gallery, or cultural site you have visited",
  "Restaurants": "a restaurant or place to eat that you have enjoyed",
  "Airports": "an experience you had at an airport or while travelling",
  "Hotels": "a hotel or place you have stayed that was memorable",
  "Beaches": "a beach or coastal area you have visited or would like to visit",
  "Markets": "a market or street bazaar you have visited",
  "Landmarks": "a famous landmark or historical site you have seen",
  "School": "a school, teacher, or learning experience from your past",
  "University": "a university or higher education experience",
  "Teachers": "a teacher or mentor who has had a positive impact on you",
  "Studying": "a subject or topic you have studied and found interesting",
  "Online learning": "an online course, video, or learning platform you have used",
  "Libraries": "a library or place where you like to study or read",
  "Exams": "an important exam or test you have taken",
  "Scholarships": "a scholarship, award, or academic achievement you know about",
  "Subjects": "a school subject you found interesting or challenging",
  "Homework": "a homework task or assignment you remember from school",
  "Work": "a job or work experience that has been important to you",
  "Career goals": "a career goal or professional ambition you have",
  "Money": "something money-related that has taught you an important lesson",
  "Success": "a success or achievement you are proud of",
  "Ambition": "an ambition or dream you have for the future",
  "Retirement": "an older person you know and their life after retirement",
  "Future plans": "a plan or goal you have for the near or distant future",
  "Business": "a business idea you have or an entrepreneur you admire",
  "Job interviews": "a job interview or application process you have experienced",
  "Salaries": "a job or career that you think should be better paid",
  "Working from home": "an experience of working or studying from home",
  "Entrepreneurship": "an entrepreneur or small business that you admire",
  "Internet": "a website, app, or online service that has changed your daily life",
  "Phones": "a mobile phone or device that has been important to you",
  "AI": "a use of artificial intelligence that you find interesting or useful",
  "Games": "a video game, board game, or online game you enjoy",
  "Transportation": "a form of transport or journey that stands out in your memory",
  "Space": "something related to space exploration that fascinates you",
  "Innovation": "a recent invention or technological innovation you find impressive",
  "Social apps": "a social media app or online platform you use regularly",
  "Online shopping": "an experience you have had with online shopping",
  "Robots": "a robot or automated machine that you have seen or read about",
  "Electric cars": "an electric vehicle or new type of transport you find interesting",
  "Smart homes": "a smart device or home technology you use or find interesting",
  "Health": "a health habit or practice that has been important in your life",
  "Exercise": "a form of exercise or physical activity that you enjoy",
  "Mental health": "something that helps you relax or maintain your mental wellbeing",
  "Hobbies": "a hobby or free-time activity that you enjoy",
  "Relaxation": "a way you like to relax and unwind after a busy day",
  "Happiness": "something or someone that makes you feel genuinely happy",
  "Stress": "a stressful situation and how you dealt with it",
  "Sleep": "a sleep routine or experience related to sleep that you remember",
  "Hospitals": "an experience you or someone close to you had in a hospital",
  "Medicine": "a medical advance or treatment that you find impressive",
  "Healthy eating": "a healthy food or eating habit that you practice or admire",
  "Work-life balance": "something you do to maintain a healthy balance between work and personal life",
  "Movies": "a film or movie that has had an impact on you",
  "Art": "a painting, sculpture, or work of art that you find meaningful",
  "Photography": "a photograph or photographer that has impressed you",
  "Languages": "a language you have learned or would like to learn",
  "Cultural heritage": "a cultural tradition or heritage that you find fascinating",
  "History": "a historical event or period that you find fascinating",
  "Books": "a book that has made a strong impression on you",
  "Music genres": "a style of music or genre that you enjoy",
  "Theater": "a live performance or theatre show you have seen",
  "Dance": "a type of dance or dancing experience you enjoy or admire",
  "Crafts": "a craft, art project, or creative activity you enjoy",
  "Architecture": "a building or architectural style that you find impressive",
  "Kindness": "an act of kindness that you have witnessed or experienced",
  "Leadership": "a leader or person in authority you admire",
  "Patience": "a time when patience helped you or someone else succeed",
  "Honesty": "a time when honesty made an important difference in a situation",
  "Personal ambition": "a personal ambition or aspiration that drives you forward",
  "Creativity": "a creative person or creative project that you admire",
  "Decision making": "an important decision you have made that changed your life",
  "Risk taking": "a risk you or someone you know took and what happened as a result",
  "Role models": "a person who has been a role model or inspiration to you",
  "Heroes": "a hero or admirable person from real life or history",
  "Memories": "a childhood or family memory that is special to you",
  "Dreams": "a dream or aspiration you have had since you were young",
  "Personal goals": "a personal goal you are working towards right now",
};

function buildSystemPrompt(topic: string, part: number, questionNum: number, isStart: boolean): string {
  if (part === 1) {
    const isFinal = !isStart && questionNum > 8;
    const intro = isStart
      ? `Begin by warmly welcoming the student to the IELTS Speaking test and then immediately ask your first question about ${topic}.`
      : isFinal
        ? `The student has just answered the FINAL question of Part 1. Give ONLY your feedback on their answer. Do NOT ask another question. End your response with "— **[PART1_DONE]**".`
        : `You are on question ${questionNum} of 8 in Part 1. Ask ONE specific, natural question about ${topic}.`;
    return `You are Churchill AI, a certified IELTS examiner. Your name is Churchill AI — never introduce yourself as anyone else.

You are conducting IELTS Speaking Part 1 (Introduction & Interview) on the topic: "${topic}".

${intro}

After each student answer, respond with:
1. One brief acknowledging sentence (professional, encouraging)
2. Feedback block — always include ALL THREE lines:
   — If there is a real grammar or usage ERROR: ❌ [the error] → ✅ [correction]
   — If there is NO error but room for improvement: 💡 Alternative: [better phrasing option 1] / [option 2]
   📝 Better vocabulary: [IELTS-level word or phrase 1], [IELTS-level word or phrase 2]
   ⭐ Band estimate: X/9
3. Then ask the NEXT question (or if this is the FINAL answer, end your response with "— **[PART1_DONE]**" and do NOT ask another question)

Keep each response under 80 words. Be concise and direct.`;
  }

  if (part === 2) {
    const cue = CUE_CARDS[topic] ?? `something related to ${topic}`;
    return `You are Churchill AI, a certified IELTS examiner. Your name is Churchill AI — never use any other name.

The student just completed their Part 2 long turn about "${topic}".

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
   — If there is a real grammar or usage ERROR: ❌ [the error] → ✅ [correction]
   — If there is NO error but room for improvement: 💡 Alternative: [better phrasing option 1] / [option 2]
   📝 Better vocabulary: [word1], [word2]
   ⭐ Band estimate: X/9
3. End with: "Thank you. — **[PART2_DONE]**"

Keep response under 80 words.`;
  }

  const isFinal3 = !isStart && questionNum > 4;
  const intro3 = isStart
    ? `Begin with a short transition statement (e.g. "We'll now move on to Part 3…") and immediately ask your first discussion question related to ${topic}.`
    : isFinal3
      ? `The student has just answered the FINAL question of Part 3. Give ONLY your feedback. Do NOT ask another question. End with "Excellent. — **[PART3_DONE]**".`
      : `You are on discussion question ${questionNum} of 4. Ask ONE abstract, analytical question about society or the wider world, related to "${topic}".`;

  return `You are Churchill AI, a certified IELTS examiner. Your name is Churchill AI — never introduce yourself as anyone else.

You are conducting IELTS Speaking Part 3 (Two-Way Discussion) on the theme: "${topic}".

${intro3}

After each student answer, respond with:
1. One brief acknowledgment sentence
2. Feedback:
   — If there is a real grammar or usage ERROR: ❌ [the error] → ✅ [correction]
   — If there is NO error but room for improvement: 💡 Alternative: [better phrasing option 1] / [option 2]
   📝 Better vocabulary: [academic/IELTS word 1], [academic/IELTS word 2]
   ⭐ Band estimate: X/9
3. Then ask the NEXT discussion question (or if this is the FINAL answer, end with "Excellent. — **[PART3_DONE]**")

Keep responses under 80 words. Target B2–C1 vocabulary.`;
}

// ── Realtime API (WebRTC ephemeral token) ────────────────────────────────────

function buildRealtimeSystemPrompt(topic: string, cue: string): string {
  return `You are Churchill AI, a certified IELTS Speaking Examiner. Speak in a professional, clear, warm British examiner voice.

You are conducting a complete IELTS Speaking test. The topic is: "${topic}".

Follow this EXACT structure — do not skip any part:

══════════════════════════════════════
PART 1 — Introduction (8 questions)
══════════════════════════════════════
Open with: "Welcome. I'm Churchill AI, your IELTS Speaking Examiner. Let's begin Part 1. The topic today is ${topic}."

Ask exactly 8 different personal questions about "${topic}". After EACH student answer:
- One brief acknowledgment sentence (1–2 words max like "Good." or "Interesting.")
- If there is a grammar or vocabulary mistake, note it briefly: say "You could say [correction] instead"
- Then ask the next question immediately

After the 8th answer: "Thank you. That completes Part 1. Now let me give you your Part 2 cue card."

══════════════════════════════════════
PART 2 — Long Turn (1–2 min talk)
══════════════════════════════════════
Read the cue card aloud: "Describe ${cue}. You should say: what it is or who they are, when and where you experienced it, why it is important or special to you, and how it has affected your life. You have one minute to prepare, then please speak for one to two minutes. Begin whenever you are ready."

Stay silent while the student prepares and speaks. After their talk:
- Give 2–3 sentences of specific feedback on their performance
- Then say: "Thank you. We will now move on to Part 3."

══════════════════════════════════════
PART 3 — Discussion (4 questions)
══════════════════════════════════════
Open with: "In Part 3, I'll ask you some broader questions about ${topic} and society."

Ask exactly 4 abstract, analytical questions about society or the wider world related to "${topic}". After EACH answer:
- One brief acknowledgment
- Note any grammar or vocabulary improvement briefly if needed
- Ask the next question

After the 4th answer, say: "Excellent. That concludes our IELTS Speaking test today. You have done very well. Keep practising consistently and your band score will improve. Goodbye and good luck."

══════════════════════════════════════
RULES
══════════════════════════════════════
- Speak naturally — you are the voice examiner, this is an audio session
- Keep all feedback brief: never more than 2 sentences after each answer
- Do NOT use emoji, markdown, bullet points, or written formatting in your speech
- If the student is silent more than 5 seconds after a question, gently prompt: "Please go ahead when you are ready."
- Occasionally give a band estimate spoken naturally: "That answer would be around Band 6 to 7."
- Never break character`;
}

app.post("/api/realtime-session", async (req, res) => {
  try {
    const { topic, cue } = req.body as { topic: string; cue?: string };
    if (!topic) { res.status(400).json({ error: "Missing topic" }); return; }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) { res.status(500).json({ error: "OPENAI_API_KEY not configured" }); return; }

    const instructions = buildRealtimeSystemPrompt(topic, cue ?? `something related to ${topic}`);

    const response = await fetch("https://api.openai.com/v1/realtime/sessions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-realtime-preview-2024-12-17",
        modalities: ["audio", "text"],
        instructions,
        voice: "echo",
        input_audio_transcription: { model: "whisper-1" },
        turn_detection: {
          type: "server_vad",
          threshold: 0.5,
          prefix_padding_ms: 300,
          silence_duration_ms: 700,
        },
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Realtime session error:", errText);
      res.status(response.status).json({ error: "Failed to create realtime session" });
      return;
    }

    const data = await response.json() as { client_secret: { value: string }; id: string };
    res.json({ client_secret: data.client_secret, session_id: data.id });
  } catch (err) {
    console.error("Realtime session error:", err);
    res.status(500).json({ error: "Failed to create realtime session" });
  }
});

app.listen(PORT, () => {
  console.log(`Churchill AI server running on http://localhost:${PORT}`);
});

export default app;
