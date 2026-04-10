import { useState, useEffect, useRef, useCallback } from "react";
import { Layout } from "@/components/layout";
import {
  Mic, MicOff, Send, ChevronRight, RotateCcw, Timer, Trophy,
  MessageSquare, Loader2, CheckCircle, AlertCircle, BookOpen, Sparkles,
  Volume2, VolumeX
} from "lucide-react";

// ─── Constants ───────────────────────────────────────────────────────────────

const TOPICS = [
  // Nature & Environment (10)
  "Weather", "Seasons", "Nature", "Animals", "Environment",
  "Plants", "Oceans", "Mountains", "Forests", "Climate change",
  // Lifestyle (15)
  "Daily routine", "Food & cooking", "Sports", "Music", "Reading",
  "Shopping", "Fashion", "Sleep habits", "Morning routines", "Cooking",
  "Eating out", "Street food", "Diets", "Exercise habits", "Weekend activities",
  // Social (12)
  "Friends", "Family", "Neighbors", "Childhood", "Relationships",
  "Social media", "Festivals", "Celebrations", "Weddings", "Traditions",
  "Community", "Volunteering",
  // Places (12)
  "Hometown", "Travel", "Cities", "Villages", "Parks",
  "Museums", "Restaurants", "Airports", "Hotels", "Beaches", "Markets", "Landmarks",
  // Education (10)
  "School", "University", "Teachers", "Studying", "Online learning",
  "Libraries", "Exams", "Scholarships", "Subjects", "Homework",
  // Work & Future (12)
  "Work", "Career goals", "Money", "Success", "Ambition",
  "Retirement", "Future plans", "Business", "Job interviews", "Salaries",
  "Working from home", "Entrepreneurship",
  // Technology (12)
  "Internet", "Phones", "AI", "Games", "Transportation",
  "Space", "Innovation", "Social apps", "Online shopping", "Robots",
  "Electric cars", "Smart homes",
  // Health & Wellbeing (12)
  "Health", "Exercise", "Mental health", "Hobbies", "Relaxation",
  "Happiness", "Stress", "Sleep", "Hospitals", "Medicine",
  "Healthy eating", "Work-life balance",
  // Arts & Culture (12)
  "Movies", "Art", "Photography", "Languages", "Cultural heritage",
  "History", "Books", "Music genres", "Theater", "Dance", "Crafts", "Architecture",
  // Personality & Values (13)
  "Kindness", "Leadership", "Patience", "Honesty", "Personal ambition",
  "Creativity", "Decision making", "Risk taking", "Role models", "Heroes",
  "Memories", "Dreams", "Personal goals",
];

const CUE_CARDS: Record<string, string> = {
  // Nature & Environment
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
  // Lifestyle
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
  // Social
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
  // Places
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
  // Education
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
  // Work & Future
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
  // Technology
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
  // Health & Wellbeing
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
  // Arts & Culture
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
  // Personality & Values
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

const TOTAL_TOPICS = TOPICS.length;

const PART_LIMITS = { 1: 5, 2: 1, 3: 4 };

const VOICE_INTRO = "Welcome to Churchill AI, your personal IELTS Speaking Examiner, powered by 4IELTS. I am here to help you reach your target band score. Please relax and speak naturally. Let's begin your practice session.";

const GOODBYE_MESSAGE = "This has been Churchill AI, your IELTS Speaking Examiner. Thank you for practicing with us today. Keep going, stay consistent, and your band score will improve. Goodbye and good luck from 4IELTS.";
const PREP_TIME = 60;

const USED_TOPICS_KEY = "ielts_speaking_used_topics";
const TTS_SPEED_KEY = "ielts_tts_speed";

const SPEED_OPTIONS = [
  { value: 0.75, label: "🐢 Slow", arabic: "بطيء (للمبتدئين)" },
  { value: 1.0,  label: "▶️ Normal", arabic: "طبيعي" },
  { value: 1.25, label: "🐇 Fast", arabic: "سريع (كالاختبار)" },
] as const;

// ─── Types ────────────────────────────────────────────────────────────────────

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ReportData {
  overallBand: number;
  fluencyCoherence: { band: number; comment: string };
  lexicalResource: { band: number; comment: string };
  grammaticalRange: { band: number; comment: string };
  pronunciation: { band: number; tips: string[] };
  topVocab: string[];
  strengths: string[];
  improvements: string[];
}

type SessionMode = "voice" | "text";

interface TranscriptEntry {
  part: 1 | 2 | 3;
  question: string;
  answer: string;
  correction: string | null;
  vocab: string | null;
  band: string | null;
}

type Phase =
  | "idle"
  | "part1"
  | "part2-prep"
  | "part2-answer"
  | "part3"
  | "report-loading"
  | "complete";

interface SessionState {
  topic: string;
  part: 1 | 2 | 3;
  answeredCount: number;
  messages: Message[];
  phase: Phase;
  report: ReportData | null;
  partDone: boolean;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function pickTopic(): { topic: string; sessionNumber: number } {
  const raw = localStorage.getItem(USED_TOPICS_KEY);
  let used: string[] = [];
  try { used = JSON.parse(raw ?? "[]"); } catch { used = []; }
  const available = TOPICS.filter((t) => !used.includes(t));
  const cycleComplete = available.length === 0;
  const pool = cycleComplete ? [...TOPICS] : available;
  const chosen = pool[Math.floor(Math.random() * pool.length)];
  const newUsed = cycleComplete ? [chosen] : [...used, chosen];
  localStorage.setItem(USED_TOPICS_KEY, JSON.stringify(newUsed));
  const sessionNumber = cycleComplete ? 1 : newUsed.length;
  return { topic: chosen, sessionNumber };
}

function loadTtsSpeed(): number {
  try {
    const v = parseFloat(localStorage.getItem(TTS_SPEED_KEY) ?? "");
    if ([0.75, 1.0, 1.25].includes(v)) return v;
  } catch { /* ignore */ }
  return 1.0;
}

function parseFeedback(text: string): {
  examinerText: string;
  correction: string | null;
  vocab: string | null;
  band: string | null;
} {
  const lines = text.split("\n");
  const examinerLines: string[] = [];
  let correction: string | null = null;
  let vocab: string | null = null;
  let band: string | null = null;

  for (const line of lines) {
    if (line.includes("❌") && line.includes("→")) {
      correction = line.trim();
    } else if (line.includes("📝")) {
      vocab = line.trim();
    } else if (line.includes("⭐")) {
      band = line.trim();
    } else {
      examinerLines.push(line);
    }
  }

  const examinerText = examinerLines.join("\n")
    .replace(/\*\*\[PART[123]_DONE\]\*\*/g, "")
    .replace(/—\s*$/gm, "")
    .trim();

  return { examinerText, correction, vocab, band };
}

function stripForTts(text: string): string {
  return text
    .replace(/\*\*\[PART[123]_DONE\]\*\*/g, "")
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\*(.*?)\*/g, "$1")
    .replace(/^---+$/gm, "")
    .replace(/^#{1,6}\s/gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

async function callSpeakingAPIStream(
  messages: Message[],
  topic: string,
  part: number,
  questionNum: number,
  isStart: boolean,
  onChunk: (text: string) => void,
): Promise<string> {
  const res = await fetch("/api/speaking/message", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages, topic, part, questionNum, isStart }),
  });
  if (!res.ok) throw new Error("API error");

  const reader = res.body!.getReader();
  const decoder = new TextDecoder();
  let fullText = "";
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";
    for (const line of lines) {
      if (!line.startsWith("data: ")) continue;
      const payload = line.slice(6).trim();
      if (payload === "[DONE]" || payload === "[ERROR]") continue;
      try {
        const { delta } = JSON.parse(payload) as { delta: string };
        fullText += delta;
        onChunk(fullText);
      } catch { /* ignore malformed chunks */ }
    }
  }
  return fullText;
}

async function callReportAPI(messages: Message[], topic: string): Promise<ReportData> {
  const res = await fetch("/api/speaking/report", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages, topic }),
  });
  if (!res.ok) throw new Error("API error");
  const data = await res.json();
  return data.report as ReportData;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function PartIndicator({ part, phase }: { part: 1 | 2 | 3; phase: Phase }) {
  const parts = [
    { n: 1, label: "Introduction", qs: "5 questions" },
    { n: 2, label: "Long Turn", qs: "1 minute" },
    { n: 3, label: "Discussion", qs: "4 questions" },
  ] as const;

  return (
    <div className="flex items-center gap-1 bg-muted/50 rounded-2xl p-1">
      {parts.map((p, i) => {
        const done = phase !== "idle" && p.n < part;
        const active = phase !== "idle" && p.n === part;
        return (
          <div key={p.n} className="flex items-center gap-1 flex-1">
            <div className={`flex-1 rounded-xl px-3 py-2 text-center transition-all ${
              active
                ? "bg-primary text-primary-foreground shadow-sm"
                : done
                ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                : "text-muted-foreground"
            }`}>
              <div className="flex items-center justify-center gap-1.5">
                {done && <CheckCircle className="w-3 h-3" />}
                <span className="text-xs font-bold">Part {p.n}</span>
              </div>
              <div className="text-[10px] opacity-75 hidden sm:block">{p.label}</div>
            </div>
            {i < 2 && <ChevronRight className="w-3 h-3 text-muted-foreground shrink-0" />}
          </div>
        );
      })}
    </div>
  );
}

function AIChatBubble({ content }: { content: string }) {
  const { examinerText, correction, vocab, band } = parseFeedback(content);
  const hasFeedback = correction || vocab || band;

  return (
    <div className="flex gap-3 justify-start">
      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0 mt-1">
        <Mic className="w-4 h-4 text-primary-foreground" />
      </div>
      <div className="max-w-[85%] space-y-2">
        {examinerText && (
          <div className="bg-card border border-border rounded-2xl rounded-tl-sm px-4 py-3 text-sm leading-relaxed text-foreground whitespace-pre-wrap">
            {examinerText}
          </div>
        )}
        {hasFeedback && (
          <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-2xl px-4 py-3 space-y-2">
            {correction && (
              <div className="text-sm flex items-start gap-2">
                <span className="shrink-0">{correction.split("→")[0].trim().includes("❌") ? "" : ""}</span>
                <span className="text-red-600 dark:text-red-400 font-medium">{correction.split("→")[0].trim()}</span>
                <span className="text-muted-foreground shrink-0">→</span>
                <span className="text-green-700 dark:text-green-400 font-medium">{correction.split("→")[1]?.trim()}</span>
              </div>
            )}
            {vocab && (
              <div className="text-sm text-blue-700 dark:text-blue-300">
                {vocab}
              </div>
            )}
            {band && (
              <div className="text-sm font-bold text-amber-700 dark:text-amber-400">
                {band}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function UserChatBubble({ content }: { content: string }) {
  return (
    <div className="flex gap-3 justify-end">
      <div className="max-w-[85%] bg-primary text-primary-foreground rounded-2xl rounded-tr-sm px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap">
        {content}
      </div>
    </div>
  );
}

function Part2CueCard({ topic }: { topic: string }) {
  const cue = CUE_CARDS[topic] ?? `something related to ${topic}`;
  return (
    <div className="bg-amber-50 dark:bg-amber-950/30 border-2 border-amber-300 dark:border-amber-700 rounded-2xl p-5 space-y-3">
      <div className="flex items-center gap-2">
        <BookOpen className="w-4 h-4 text-amber-600 dark:text-amber-400" />
        <span className="text-xs font-bold uppercase tracking-widest text-amber-700 dark:text-amber-400">Cue Card — Part 2</span>
      </div>
      <p className="font-bold text-foreground text-base">
        Describe {cue}.
      </p>
      <div className="space-y-1 text-sm text-muted-foreground">
        <p className="font-semibold text-foreground text-xs uppercase tracking-wider mb-2">You should say:</p>
        <p>• What it is / who they are</p>
        <p>• When and where you experienced it</p>
        <p>• Why it is important or special to you</p>
        <p>• How it has affected your life</p>
      </div>
      <p className="text-xs text-muted-foreground italic">
        You have 1 minute to prepare. Then speak for 1–2 minutes.
      </p>
    </div>
  );
}

function CountdownTimer({ seconds, onEnd }: { seconds: number; onEnd: () => void }) {
  const [remaining, setRemaining] = useState(seconds);
  const ref = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    ref.current = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(ref.current!);
          onEnd();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(ref.current!);
  }, [onEnd]);

  const pct = (remaining / seconds) * 100;
  const urgent = remaining <= 15;

  return (
    <div className={`flex items-center gap-3 px-4 py-3 rounded-2xl border-2 transition-colors ${
      urgent
        ? "bg-red-50 dark:bg-red-950/30 border-red-300 dark:border-red-700"
        : "bg-sky-50 dark:bg-sky-950/30 border-sky-300 dark:border-sky-700"
    }`}>
      <Timer className={`w-5 h-5 shrink-0 ${urgent ? "text-red-500 animate-pulse" : "text-sky-500"}`} />
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-semibold text-muted-foreground">Preparation time</span>
          <span className={`font-bold text-lg tabular-nums ${urgent ? "text-red-600 dark:text-red-400" : "text-sky-700 dark:text-sky-300"}`}>
            {remaining}s
          </span>
        </div>
        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-1000 ${urgent ? "bg-red-500" : "bg-sky-500"}`}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    </div>
  );
}

function BandBar({ label, band }: { label: string; band: number }) {
  const pct = (band / 9) * 100;
  const color = band >= 7 ? "bg-green-500" : band >= 6 ? "bg-amber-500" : "bg-orange-500";
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-foreground">{label}</span>
        <span className="text-sm font-bold tabular-nums">{band}/9</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div className={`h-full ${color} rounded-full transition-all duration-700`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function FinalReport({ report, topic, onNewSession }: { report: ReportData; topic: string; onNewSession: () => void }) {
  const band = report.overallBand;
  const bandColor = band >= 7 ? "text-green-600" : band >= 6 ? "text-amber-600" : "text-orange-600";
  const bgColor = band >= 7 ? "from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-green-200 dark:border-green-800"
    : band >= 6 ? "from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-yellow-950/20 border-amber-200 dark:border-amber-800"
    : "from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 border-orange-200 dark:border-orange-800";

  return (
    <div className="space-y-5 animate-in fade-in duration-500">
      {/* Band overview */}
      <div className={`bg-gradient-to-br ${bgColor} border-2 rounded-3xl p-6 text-center`}>
        <div className="flex items-center justify-center gap-2 mb-2">
          <Trophy className="w-5 h-5 text-primary" />
          <span className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Speaking Test Report</span>
        </div>
        <p className="text-sm text-muted-foreground mb-1">Topic: <strong>{topic}</strong></p>
        <div className={`text-7xl font-black ${bandColor} my-3`}>{band}</div>
        <p className="text-muted-foreground font-semibold">Estimated Band Score</p>
      </div>

      {/* Sub-scores */}
      <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
        <h3 className="font-bold text-foreground">Detailed Scores</h3>
        <BandBar label="Fluency & Coherence" band={report.fluencyCoherence.band} />
        <BandBar label="Lexical Resource" band={report.lexicalResource.band} />
        <BandBar label="Grammatical Range & Accuracy" band={report.grammaticalRange.band} />
        <BandBar label="Pronunciation (estimated)" band={report.pronunciation.band} />
      </div>

      {/* Detailed feedback */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-card border border-border rounded-2xl p-5 space-y-3">
          <h3 className="font-bold text-foreground text-sm uppercase tracking-wider text-primary">Examiner Feedback</h3>
          <div>
            <p className="text-xs font-semibold text-muted-foreground mb-1">Fluency & Coherence</p>
            <p className="text-sm text-foreground">{report.fluencyCoherence.comment}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-muted-foreground mb-1">Vocabulary</p>
            <p className="text-sm text-foreground">{report.lexicalResource.comment}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-muted-foreground mb-1">Grammar</p>
            <p className="text-sm text-foreground">{report.grammaticalRange.comment}</p>
          </div>
        </div>

        <div className="space-y-4">
          {/* Pronunciation tips */}
          <div className="bg-card border border-border rounded-2xl p-5">
            <h3 className="font-bold text-foreground text-sm mb-3 flex items-center gap-2">
              <span className="text-base">🗣️</span> Pronunciation Tips
            </h3>
            <ul className="space-y-1">
              {report.pronunciation.tips.map((tip, i) => (
                <li key={i} className="text-sm text-foreground flex items-start gap-2">
                  <span className="text-primary mt-0.5 shrink-0">•</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>

          {/* Strengths */}
          <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-2xl p-5">
            <h3 className="font-bold text-green-700 dark:text-green-400 text-sm mb-2 flex items-center gap-2">
              <CheckCircle className="w-4 h-4" /> What you did well
            </h3>
            <ul className="space-y-1">
              {report.strengths.map((s, i) => (
                <li key={i} className="text-sm text-foreground flex items-start gap-2">
                  <span className="text-green-500 mt-0.5 shrink-0">✓</span>
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Vocab upgrades */}
      <div className="bg-card border border-border rounded-2xl p-5">
        <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-primary" />
          Top 5 Vocabulary Improvements for Next Time
        </h3>
        <div className="flex flex-wrap gap-2">
          {report.topVocab.map((w, i) => (
            <span key={i} className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full border border-primary/20">
              {w}
            </span>
          ))}
        </div>
      </div>

      {/* Areas to improve */}
      <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-5">
        <h3 className="font-bold text-amber-700 dark:text-amber-400 text-sm mb-2 flex items-center gap-2">
          <AlertCircle className="w-4 h-4" /> Focus Areas for Next Session
        </h3>
        <ul className="space-y-1">
          {report.improvements.map((s, i) => (
            <li key={i} className="text-sm text-foreground flex items-start gap-2">
              <span className="text-amber-500 mt-0.5 shrink-0">→</span>
              {s}
            </li>
          ))}
        </ul>
      </div>

      {/* Actions */}
      <button
        onClick={onNewSession}
        className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3.5 rounded-2xl font-bold text-base hover:bg-primary/90 transition-colors shadow-sm"
      >
        <RotateCcw className="w-5 h-5" />
        Try Again with New Topic
      </button>
    </div>
  );
}

// ─── Transcript Viewer ───────────────────────────────────────────────────────

function buildTranscriptText(
  topic: string,
  entries: TranscriptEntry[],
  report: ReportData | null,
): string {
  const date = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" });
  const lines: string[] = [
    "🎤 CHURCHILL AI",
    "IELTS Speaking Session Report",
    "Powered by 4IELTS.com",
    "━━━━━━━━━━━━━━━━━━━━━",
    `Topic: ${topic}`,
    `Date: ${date}`,
    "━━━━━━━━━━━━━━━━━━━━━",
  ];
  let currentPart = 0;
  for (const e of entries) {
    if (e.part !== currentPart) {
      currentPart = e.part;
      const labels: Record<number, string> = { 1: "Part 1 - Introduction", 2: "Part 2 - Long Turn", 3: "Part 3 - Discussion" };
      lines.push("", labels[e.part] ?? `Part ${e.part}`, "");
    }
    if (e.question) lines.push(`Q: ${e.question}`);
    lines.push(`A: ${e.answer}`);
    if (e.correction) lines.push(`✅ Corrections: ${e.correction}`);
    if (e.vocab) lines.push(`📝 Better words: ${e.vocab}`);
    if (e.band) lines.push(`⭐ Band: ${e.band}`);
    lines.push("");
  }
  if (report) {
    lines.push("", "━━━━━━━━━━━━━━━━━━━━━", "FINAL REPORT", "━━━━━━━━━━━━━━━━━━━━━");
    lines.push(`Overall Band: ${report.overallBand}/9`);
    lines.push(`Fluency & Coherence: ${report.fluencyCoherence.band}/9`);
    lines.push(`Lexical Resource: ${report.lexicalResource.band}/9`);
    lines.push(`Grammatical Range: ${report.grammaticalRange.band}/9`);
    if (report.improvements?.length) {
      lines.push("", "Top improvements:");
      report.improvements.slice(0, 5).forEach((imp, idx) => lines.push(`${idx + 1}. ${imp}`));
    }
    lines.push("━━━━━━━━━━━━━━━━━━━━━");
  }
  return lines.join("\n");
}

function TranscriptViewer({
  topic, entries, report, onClose, onNewSession,
}: {
  topic: string;
  entries: TranscriptEntry[];
  report: ReportData | null;
  onClose: () => void;
  onNewSession?: () => void;
}) {
  const text = buildTranscriptText(topic, entries, report);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(text);
  };

  const download = () => {
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `IELTS_Speaking_${topic.replace(/\s+/g, "_")}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Count how many parts appear in transcript
  const partsInTranscript = [...new Set(entries.map((e) => e.part))].length;
  const date = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" });

  // Build per-part question counters
  const partCounters: Record<number, number> = {};

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex flex-col">
      {/* Header */}
      <div className="shrink-0 border-b border-border">
        <div className="flex items-center justify-between px-4 pt-4 pb-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center shrink-0">
              <Mic className="w-4 h-4 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-sm font-extrabold text-foreground tracking-wide">🎤 CHURCHILL AI</h2>
              <p className="text-xs text-primary font-semibold">IELTS Speaking Session Report</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-muted text-xs font-semibold text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
          >
            ✕
          </button>
        </div>
        <div className="px-4 pb-3 flex items-center gap-2 flex-wrap text-xs text-muted-foreground">
          <span className="font-medium">Powered by 4IELTS.com</span>
          <span>·</span>
          <span>{topic}</span>
          <span>·</span>
          <span>{date}</span>
          <span>·</span>
          <span>Completed: Part {partsInTranscript} of 3</span>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {entries.map((e, i) => {
          const isNewPart = e.part !== (entries[i - 1]?.part ?? 0);
          if (isNewPart) partCounters[e.part] = 0;
          partCounters[e.part] = (partCounters[e.part] ?? 0) + 1;
          const qNum = partCounters[e.part];
          const partLabels: Record<number, string> = { 1: "Part 1 — Introduction", 2: "Part 2 — Long Turn", 3: "Part 3 — Discussion" };
          return (
            <div key={i}>
              {isNewPart && (
                <h3 className="text-sm font-bold text-primary mb-2 border-b border-border pb-1">
                  {partLabels[e.part]}
                </h3>
              )}
              <div className="bg-card rounded-2xl border border-border p-3 space-y-1.5 text-sm">
                {e.question && (
                  <p className="text-muted-foreground text-xs">
                    <span className="font-semibold text-foreground">Q{qNum}:</span> {e.question}
                  </p>
                )}
                <p className="font-medium"><span className="text-primary font-semibold">Your answer:</span> {e.answer}</p>
                {e.correction && <p className="text-amber-600 dark:text-amber-400 text-xs">❌ {e.correction.split("→").map((s, idx) => idx === 0 ? `${s} →` : <strong key={idx}>{s}</strong>)}</p>}
                {e.vocab && <p className="text-sky-600 dark:text-sky-400 text-xs">📝 Better: {e.vocab}</p>}
                {e.band && <p className="text-green-600 dark:text-green-400 text-xs font-semibold">⭐ Band: {e.band}</p>}
              </div>
            </div>
          );
        })}
        {report && (
          <div className="bg-primary/5 rounded-2xl border border-primary/20 p-4 text-sm space-y-1.5">
            <h3 className="font-bold text-primary mb-2">📊 FINAL REPORT</h3>
            <p className="text-base font-bold">Overall Band: {report.overallBand}/9</p>
            <p>Fluency & Coherence: {report.fluencyCoherence.band}/9</p>
            <p>Lexical Resource: {report.lexicalResource.band}/9</p>
            <p>Grammatical Range: {report.grammaticalRange.band}/9</p>
            {report.improvements?.length > 0 && (
              <div className="mt-2">
                <p className="font-semibold text-xs mb-1">Top improvements:</p>
                {report.improvements.slice(0, 5).map((imp, idx) => (
                  <p key={idx} className="text-xs text-muted-foreground">{idx + 1}. {imp}</p>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer buttons */}
      <div className="shrink-0 flex gap-2 p-4 border-t border-border">
        <button
          onClick={copyToClipboard}
          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl border border-border text-sm font-semibold text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
        >
          📋 نسخ النص
        </button>
        <button
          onClick={download}
          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl border border-border text-sm font-semibold text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
        >
          💾 تحميل .txt
        </button>
        {onNewSession && (
          <button
            onClick={onNewSession}
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors"
          >
            🔄 جلسة جديدة
          </button>
        )}
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function SpeakingPage() {
  const [session, setSession] = useState<SessionState>({
    topic: "",
    part: 1,
    answeredCount: 0,
    messages: [],
    phase: "idle",
    report: null,
    partDone: false,
  });
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [streamingContent, setStreamingContent] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [lastTtsText, setLastTtsText] = useState<string | null>(null);
  const [ttsSpeed, setTtsSpeedState] = useState<number>(loadTtsSpeed);
  const [sessionNumber, setSessionNumber] = useState<number>(0);
  const [sessionMode, setSessionMode] = useState<SessionMode | null>(null);
  const [transcript, setTranscript] = useState<TranscriptEntry[]>([]);
  const [showTranscript, setShowTranscript] = useState(false);

  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const silenceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rafRef = useRef<number | null>(null);
  const sendTextRef = useRef<((text: string) => Promise<void>) | null>(null);
  const ttsAudioRef = useRef<HTMLAudioElement | null>(null);
  const sessionRef = useRef(session);
  const startRecordingRef = useRef<(() => Promise<void>) | null>(null);
  const sessionModeRef = useRef<SessionMode | null>(null);
  const isSpeakingRef = useRef(false);
  const lastTtsTextRef = useRef<string | null>(null);
  const ttsRequestIdRef = useRef(0);
  const ttsEndResolveRef = useRef<(() => void) | null>(null);
  const playTtsRef = useRef<((text: string) => Promise<void>) | null>(null);
  const ttsGeneratedSpeedRef = useRef(1.0); // speed the current audio was generated at
  const sessionGenRef = useRef(0);          // incremented on every new/reset session
  const isProcessingRef = useRef(false);    // prevents concurrent processAnswer calls

  // Auto-scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [session.messages, isLoading, streamingContent]);

  // Keep refs in sync
  useEffect(() => { sessionRef.current = session; }, [session]);
  useEffect(() => { sessionModeRef.current = sessionMode; }, [sessionMode]);

  // ── Cleanup on unmount (FIX 1) ────────────────────────────────────────────
  useEffect(() => {
    return () => {
      // Stop all audio when student navigates away
      if (ttsAudioRef.current) {
        ttsAudioRef.current.pause();
        ttsAudioRef.current.src = "";
        ttsAudioRef.current = null;
      }
      if (audioCtxRef.current) { audioCtxRef.current.close(); audioCtxRef.current = null; }
      if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = null; }
      if (silenceTimerRef.current) { clearTimeout(silenceTimerRef.current); silenceTimerRef.current = null; }
      mediaRecorderRef.current?.stop();
      mediaRecorderRef.current = null;
    };
  }, []);

  // ── TTS speed ────────────────────────────────────────────────────────────────

  const setTtsSpeed = useCallback((speed: number) => {
    setTtsSpeedState(speed);
    localStorage.setItem(TTS_SPEED_KEY, String(speed));
    ttsSpeedRef.current = speed; // Update immediately so next playTts fetch uses new speed
    // If audio is already playing, change playbackRate instantly — no re-fetch needed
    if (ttsAudioRef.current && isSpeakingRef.current) {
      const ratio = speed / ttsGeneratedSpeedRef.current;
      ttsAudioRef.current.playbackRate = Math.max(0.25, Math.min(4.0, ratio));
    }
  }, []);

  // Keep a ref so playTts always uses the latest speed value
  const ttsSpeedRef = useRef(ttsSpeed);
  useEffect(() => { ttsSpeedRef.current = ttsSpeed; }, [ttsSpeed]);

  // ── TTS ──────────────────────────────────────────────────────────────────────

  const stopTts = useCallback(() => {
    // Invalidate any in-flight TTS fetch so its result is discarded
    ttsRequestIdRef.current += 1;
    if (ttsAudioRef.current) {
      ttsAudioRef.current.pause();
      ttsAudioRef.current.src = "";
      ttsAudioRef.current = null;
    }
    isSpeakingRef.current = false;
    setIsSpeaking(false);
    // Unblock any caller that is awaiting playTts to finish
    if (ttsEndResolveRef.current) {
      ttsEndResolveRef.current();
      ttsEndResolveRef.current = null;
    }
  }, []);

  const playTts = useCallback(async (text: string) => {
    if (!text.trim()) return;
    // stopTts() increments ttsRequestIdRef, cancelling any previous in-flight fetch
    stopTts();
    const clean = stripForTts(text);
    if (!clean) return;
    setLastTtsText(clean);
    lastTtsTextRef.current = clean;

    // Capture this call's ID — if a newer call (or stopTts) runs before we
    // finish fetching, our ID will no longer match and we discard the result.
    const myId = ++ttsRequestIdRef.current;

    try {
      const res = await fetch("/api/speaking/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: clean, speed: ttsSpeedRef.current }),
      });

      // Bail out if a newer TTS request superseded this one while we were fetching
      if (myId !== ttsRequestIdRef.current) return;
      if (!res.ok) return;

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);

      // Check again after the blob conversion
      if (myId !== ttsRequestIdRef.current) { URL.revokeObjectURL(url); return; }

      const audio = new Audio(url);
      ttsAudioRef.current = audio;
      ttsGeneratedSpeedRef.current = ttsSpeedRef.current; // record what speed this was generated at
      isSpeakingRef.current = true;
      setIsSpeaking(true);

      // Await until audio actually ENDS (or is stopped/errored).
      // ttsEndResolveRef lets stopTts() unblock this await cleanly.
      await new Promise<void>((resolve) => {
        ttsEndResolveRef.current = resolve;

        audio.onended = () => {
          URL.revokeObjectURL(url);
          if (ttsAudioRef.current === audio) ttsAudioRef.current = null;
          isSpeakingRef.current = false;
          setIsSpeaking(false);
          ttsEndResolveRef.current = null;
          // Voice mode: auto-activate mic only after examiner finishes speaking
          // Guard: skip if another recorder is already running (prevents double-recording echo)
          if (sessionModeRef.current === "voice" && !mediaRecorderRef.current) {
            const s = sessionRef.current;
            if (!s.partDone && (s.phase === "part1" || s.phase === "part2-answer" || s.phase === "part3")) {
              startRecordingRef.current?.();
            }
          }
          resolve();
        };

        audio.onerror = () => {
          URL.revokeObjectURL(url);
          if (ttsAudioRef.current === audio) ttsAudioRef.current = null;
          isSpeakingRef.current = false;
          setIsSpeaking(false);
          ttsEndResolveRef.current = null;
          resolve();
        };

        audio.play().catch(() => {
          if (ttsAudioRef.current === audio) ttsAudioRef.current = null;
          isSpeakingRef.current = false;
          setIsSpeaking(false);
          ttsEndResolveRef.current = null;
          resolve();
        });
      });
    } catch {
      isSpeakingRef.current = false;
      setIsSpeaking(false);
    }
  }, [stopTts]);

  const replayTts = useCallback(() => {
    if (lastTtsText) playTts(lastTtsText);
  }, [lastTtsText, playTts]);

  const addMessage = useCallback((msg: Message) => {
    setSession((s) => ({ ...s, messages: [...s.messages, msg] }));
  }, []);

  // ── Start a new session ──
  const startSession = useCallback(async (mode: SessionMode) => {
    sessionGenRef.current += 1;
    isProcessingRef.current = false;
    stopTts();
    setSessionMode(mode);
    const { topic, sessionNumber: sNum } = pickTopic();
    setSessionNumber(sNum);
    setTranscript([]);
    setShowTranscript(false);
    setError(null);
    setIsLoading(true);
    setStreamingContent("");
    setLastTtsText(null);
    setSession({
      topic,
      part: 1,
      answeredCount: 0,
      messages: [],
      phase: "part1",
      report: null,
      partDone: false,
    });

    try {
      // FIX 2: Voice mode — play warm intro first, then get Q1
      if (mode === "voice") {
        await playTts(VOICE_INTRO);
      }
      const reply = await callSpeakingAPIStream([], topic, 1, 1, true, setStreamingContent);
      setStreamingContent(null);
      setSession((s) => ({
        ...s,
        messages: [{ role: "assistant", content: reply }],
      }));
      const { examinerText } = parseFeedback(reply);
      await playTts(examinerText || reply);
      // In voice mode, mic auto-activates after TTS ends (handled in playTts onended)
    } catch {
      setStreamingContent(null);
      setError("Could not connect to Churchill AI. Please try again.");
      setSession((s) => ({ ...s, phase: "idle" }));
    } finally {
      setIsLoading(false);
    }
  }, [stopTts, playTts]);

  // ── Core send logic (shared by manual send + auto-send after voice) ──
  const processAnswer = useCallback(async (text: string) => {
    // Ref-based lock: prevents concurrent calls even with React's async state batching
    if (!text.trim() || isLoading || isProcessingRef.current) return;
    isProcessingRef.current = true;

    // Capture session generation so stale callbacks from old sessions self-abort
    const myGen = sessionGenRef.current;

    stopTts();
    setInput("");
    setError(null);

    // Capture the AI's last question for the transcript
    const lastAiMsg = [...session.messages].reverse().find((m) => m.role === "assistant");
    const { examinerText: lastQuestion } = lastAiMsg ? parseFeedback(lastAiMsg.content) : { examinerText: "" };

    const userMsg: Message = { role: "user", content: text };
    const newMessages = [...session.messages, userMsg];
    const newAnsweredCount = session.answeredCount + 1;
    const limit = PART_LIMITS[session.part];
    const partDoneNow = newAnsweredCount >= limit;

    setSession((s) => ({
      ...s,
      messages: newMessages,
      answeredCount: newAnsweredCount,
    }));
    setIsLoading(true);
    setStreamingContent("");

    try {
      const reply = await callSpeakingAPIStream(
        newMessages,
        session.topic,
        session.part,
        newAnsweredCount + 1,
        false,
        setStreamingContent,
      );

      // Abort if session was reset while we were waiting for the API
      if (myGen !== sessionGenRef.current) return;

      setStreamingContent(null);
      setSession((s) => ({
        ...s,
        messages: [...newMessages, { role: "assistant", content: reply }],
        partDone: partDoneNow,
      }));
      const { examinerText, correction, vocab, band } = parseFeedback(reply);
      // Record transcript entry
      setTranscript((prev) => [
        ...prev,
        { part: session.part, question: lastQuestion || "", answer: text, correction, vocab, band },
      ]);
      playTts(examinerText || reply);
    } catch {
      setStreamingContent(null);
      setError("Failed to get AI response. Please try again.");
    } finally {
      isProcessingRef.current = false;
      setIsLoading(false);
      if (sessionModeRef.current === "text") {
        setTimeout(() => inputRef.current?.focus(), 100);
      }
    }
  }, [isLoading, session, stopTts, playTts]);

  // Keep refs in sync for use inside closures
  useEffect(() => { sendTextRef.current = processAnswer; }, [processAnswer]);

  // ── Send a user message (from the text box) ──
  const sendMessage = useCallback(async () => {
    if (!input.trim() || isLoading) return;
    await processAnswer(input.trim());
  }, [input, isLoading, processAnswer]);

  // ── Move to next part ──
  const nextPart = useCallback(async () => {
    if (session.part === 1) {
      // → Part 2: show cue card + timer
      const cue = CUE_CARDS[session.topic] ?? `something related to ${session.topic}`;
      const cueCardMsg: Message = {
        role: "assistant",
        content: `**Part 2 — Long Turn**\n\nDescribe ${cue}.\n\nYou should say:\n• What it is / who they are\n• When and where you experienced it\n• Why it is important or special to you\n• How it has affected your life\n\nYou have 1 minute to prepare.`,
      };
      setSession((s) => ({
        ...s,
        part: 2,
        answeredCount: 0,
        messages: [...s.messages, cueCardMsg],
        phase: "part2-prep",
        partDone: false,
      }));
    } else if (session.part === 2) {
      // → Part 3: call API for opening + Q1
      setError(null);
      setIsLoading(true);
      setStreamingContent("");
      setSession((s) => ({
        ...s,
        part: 3,
        answeredCount: 0,
        phase: "part3",
        partDone: false,
      }));

      try {
        const reply = await callSpeakingAPIStream(session.messages, session.topic, 3, 1, true, setStreamingContent);
        setStreamingContent(null);
        setSession((s) => ({
          ...s,
          messages: [...s.messages, { role: "assistant", content: reply }],
        }));
        const { examinerText } = parseFeedback(reply);
        playTts(examinerText || reply);
      } catch {
        setStreamingContent(null);
        setError("Failed to start Part 3. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
  }, [session, playTts]);

  // ── Timer ends for Part 2 prep ──
  const handleTimerEnd = useCallback(() => {
    setSession((s) => ({ ...s, phase: "part2-answer" }));
    setTimeout(() => inputRef.current?.focus(), 100);
  }, []);

  // ── Generate final report ──
  const viewReport = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setSession((s) => ({ ...s, phase: "report-loading" }));

    try {
      const report = await callReportAPI(session.messages, session.topic);
      setSession((s) => ({ ...s, phase: "complete", report }));
    } catch {
      setError("Failed to generate report. Please try again.");
      setSession((s) => ({ ...s, phase: "part3" }));
    } finally {
      setIsLoading(false);
    }
  }, [session.messages, session.topic]);

  // ── Voice recording with silence detection + auto-send ──
  const stopRecording = useCallback(() => {
    if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = null; }
    if (silenceTimerRef.current) { clearTimeout(silenceTimerRef.current); silenceTimerRef.current = null; }
    if (audioCtxRef.current) { audioCtxRef.current.close(); audioCtxRef.current = null; }
    mediaRecorderRef.current?.stop();
    mediaRecorderRef.current = null;
    setIsRecording(false);
  }, []);

  // ── Stop Practice (FIX 3) ──
  const stopSession = useCallback(async () => {
    stopRecording();
    stopTts();
    setIsLoading(false);
    // Play goodbye, then show transcript
    try {
      await playTts(GOODBYE_MESSAGE);
    } catch { /* ignore */ }
    setShowTranscript(true);
  }, [stopRecording, stopTts, playTts]);

  // ── New session ──
  const newSession = useCallback(() => {
    sessionGenRef.current += 1;
    isProcessingRef.current = false;
    stopTts();
    stopRecording();
    setSession({
      topic: "",
      part: 1,
      answeredCount: 0,
      messages: [],
      phase: "idle",
      report: null,
      partDone: false,
    });
    setInput("");
    setError(null);
    setLastTtsText(null);
    setSessionNumber(0);
    setSessionMode(null);
    setTranscript([]);
    setShowTranscript(false);
  }, [stopTts, stopRecording]);

  const startRecording = useCallback(async () => {
    // Guard: never start a second recorder while one is already active
    if (mediaRecorderRef.current) return;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunksRef.current = [];

      // ── Silence detection via Web Audio API ──
      const audioCtx = new AudioContext();
      audioCtxRef.current = audioCtx;
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 2048;
      const source = audioCtx.createMediaStreamSource(stream);
      source.connect(analyser);

      const dataBuffer = new Float32Array(analyser.fftSize);
      let speechStarted = false;
      let silenceStart: number | null = null;
      const SILENCE_THRESHOLD = 0.012;
      const SILENCE_DURATION = 3000;

      const checkSilence = () => {
        analyser.getFloatTimeDomainData(dataBuffer);
        const rms = Math.sqrt(dataBuffer.reduce((sum, v) => sum + v * v, 0) / dataBuffer.length);

        if (rms >= SILENCE_THRESHOLD) {
          speechStarted = true;
          silenceStart = null;
        } else if (speechStarted) {
          if (!silenceStart) silenceStart = Date.now();
          else if (Date.now() - silenceStart >= SILENCE_DURATION) {
            stopRecording();
            return;
          }
        }
        rafRef.current = requestAnimationFrame(checkSilence);
      };
      rafRef.current = requestAnimationFrame(checkSilence);

      const recorder = new MediaRecorder(stream);
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };
      recorder.onstop = async () => {
        stream.getTracks().forEach((t) => t.stop());
        const blob = new Blob(audioChunksRef.current, { type: recorder.mimeType || "audio/webm" });
        if (blob.size < 1000) return; // too short — ignore
        setIsTranscribing(true);
        try {
          const formData = new FormData();
          formData.append("audio", blob, "recording.webm");
          const res = await fetch("/api/speaking/transcribe", { method: "POST", body: formData });
          const data = await res.json();
          if (!res.ok) {
            if (data.error === "quota_exceeded") {
              setError("⚠️ OpenAI account has no credits. Please add billing at platform.openai.com to use voice input.");
            } else {
              setError(data.message || "Voice transcription failed. Please type your answer instead.");
            }
            return;
          }
          if (data.text?.trim()) {
            if (sessionModeRef.current === "voice") {
              // Voice mode: auto-send immediately
              sendTextRef.current?.(data.text.trim());
            } else {
              // Text mode: put in box for editing
              setInput((prev) => prev ? prev + " " + data.text.trim() : data.text.trim());
              setTimeout(() => {
                inputRef.current?.focus();
                const el = inputRef.current;
                if (el) el.setSelectionRange(el.value.length, el.value.length);
              }, 50);
            }
          }
        } catch {
          setError("Voice transcription failed. Please type your answer instead.");
        } finally {
          setIsTranscribing(false);
        }
      };
      mediaRecorderRef.current = recorder;
      recorder.start();
      setIsRecording(true);
    } catch {
      setError("Microphone access denied. Please allow microphone access and try again.");
    }
  }, [stopRecording]);

  // Sync ref so TTS.onended can start a new recording
  useEffect(() => { startRecordingRef.current = startRecording; }, [startRecording]);
  // Sync ref so setTtsSpeed can call playTts without a circular dependency
  useEffect(() => { playTtsRef.current = playTts; }, [playTts]);

  const toggleRecording = useCallback(() => {
    if (isRecording) {
      stopRecording();
    } else {
      stopTts(); // user taps mic = interrupt examiner
      startRecording();
    }
  }, [isRecording, startRecording, stopRecording, stopTts]);

  // ── Keyboard submit ──
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const inputDisabled =
    isLoading ||
    session.phase === "idle" ||
    session.phase === "part2-prep" ||
    session.phase === "report-loading" ||
    session.phase === "complete" ||
    (session.phase !== "part2-answer" && session.partDone);

  const showNextPartBtn =
    session.partDone &&
    !isLoading &&
    (session.phase === "part1" || session.phase === "part2-answer");

  const showViewReportBtn =
    session.partDone &&
    !isLoading &&
    session.phase === "part3";

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <Layout>
      <div className="max-w-3xl mx-auto flex flex-col h-[calc(100dvh-8rem)] md:h-[calc(100dvh-4rem)] animate-in fade-in duration-300">

        {/* Header */}
        <div className="space-y-3 mb-4 shrink-0">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shrink-0">
                <Mic className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-extrabold text-foreground">Churchill AI</h1>
                <div className="flex items-center gap-2 flex-wrap mt-0.5">
                  <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                    IELTS Speaking Examiner
                  </span>
                  {session.topic && (
                    <span className="text-xs font-semibold text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                      Topic: {session.topic}
                    </span>
                  )}
                  {sessionNumber > 0 && (
                    <span className="text-xs font-semibold text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                      Session {sessionNumber}/{TOTAL_TOPICS}
                    </span>
                  )}
                </div>
              </div>
            </div>
            {session.phase !== "idle" && (
              <button
                onClick={newSession}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-border text-xs font-semibold text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                New Session
              </button>
            )}
          </div>

          {session.phase !== "idle" && session.phase !== "complete" && session.phase !== "report-loading" && (
            <PartIndicator part={session.part} phase={session.phase} />
          )}
        </div>

        {/* ── IDLE STATE ── */}
        {session.phase === "idle" && (
          <div className="flex-1 flex flex-col items-center gap-5 px-2 pb-4">

            {/* Hero card */}
            <div
              className="w-full rounded-3xl overflow-hidden flex flex-col items-center text-center px-6 pt-6 pb-5 gap-4"
              style={{ background: "linear-gradient(160deg, hsl(177,83%,28%) 0%, hsl(177,83%,32%) 60%, hsl(177,83%,28%) 100%)" }}
            >
              {/* Portrait */}
              <div
                className="rounded-2xl overflow-hidden shrink-0 border-4 shadow-xl"
                style={{ width: 180, height: 220, borderColor: "rgba(255,255,255,0.25)" }}
              >
                <img
                  src="/churchill.png"
                  alt="Churchill AI"
                  className="w-full h-full object-cover object-top"
                />
              </div>

              {/* Name + greeting */}
              <div>
                <h2 className="text-2xl font-extrabold text-white mb-0.5">Churchill AI</h2>
                <p className="text-xs font-semibold mb-3" style={{ color: "rgba(255,255,255,0.65)" }}>
                  IELTS Speaking Examiner · Powered by 4IELTS
                </p>
                <div className="bg-white/10 rounded-2xl px-4 py-3 max-w-sm mx-auto">
                  <p className="text-sm text-white/90 leading-relaxed italic">
                    "Hi, this is Churchill AI. I am here to enhance your speaking skills and help you achieve your target IELTS band score. Let's begin."
                  </p>
                </div>
              </div>
            </div>

            {/* Part info pills */}
            <div className="flex flex-col sm:flex-row gap-2 text-sm text-muted-foreground w-full">
              {[
                { icon: "1️⃣", text: "Part 1 — 8 personal questions" },
                { icon: "2️⃣", text: "Part 2 — 1 minute long turn" },
                { icon: "3️⃣", text: "Part 3 — 4 discussion questions" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-2 bg-muted/50 px-3 py-2 rounded-xl flex-1 justify-center">
                  <span>{item.icon}</span>
                  <span className="font-medium">{item.text}</span>
                </div>
              ))}
            </div>

            {/* Mode buttons */}
            <div className="flex flex-col sm:flex-row gap-3 w-full">
              <button
                onClick={() => startSession("voice")}
                className="flex-1 flex flex-col items-center gap-1 bg-primary text-primary-foreground px-6 py-4 rounded-2xl font-bold hover:bg-primary/90 transition-colors shadow-md"
              >
                <span className="text-2xl">🎤</span>
                <span className="text-base">محادثة صوتية</span>
                <span className="text-xs font-normal opacity-80">تكلم والـ AI يرد تلقائياً</span>
              </button>
              <button
                onClick={() => startSession("text")}
                className="flex-1 flex flex-col items-center gap-1 bg-card border-2 border-border text-foreground px-6 py-4 rounded-2xl font-bold hover:bg-accent hover:border-primary/40 transition-colors shadow-sm"
              >
                <span className="text-2xl">⌨️</span>
                <span className="text-base">محادثة كتابية</span>
                <span className="text-xs font-normal opacity-60">اكتب إجاباتك يدوياً</span>
              </button>
            </div>
          </div>
        )}

        {/* ── REPORT LOADING ── */}
        {session.phase === "report-loading" && (
          <div className="flex-1 flex flex-col items-center justify-center gap-4">
            <Loader2 className="w-12 h-12 animate-spin text-primary" />
            <p className="text-muted-foreground font-medium">Generating your Speaking Report…</p>
          </div>
        )}

        {/* ── FINAL REPORT ── */}
        {session.phase === "complete" && session.report && (
          <div className="flex-1 overflow-y-auto space-y-3">
            <FinalReport report={session.report} topic={session.topic} onNewSession={newSession} />
            {transcript.length > 0 && (
              <button
                onClick={() => setShowTranscript(true)}
                className="w-full flex items-center justify-center gap-2 border border-border rounded-2xl py-3 text-sm font-semibold text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
              >
                📄 عرض النص الكامل للجلسة
              </button>
            )}
          </div>
        )}

        {/* ── ACTIVE SESSION ── */}
        {(session.phase === "part1" || session.phase === "part2-prep" || session.phase === "part2-answer" || session.phase === "part3") && (
          <>
            {/* Speed selector */}
            <div className="shrink-0 flex items-center gap-2 mb-2 flex-wrap">
              <span className="text-xs text-muted-foreground font-medium">Examiner speed:</span>
              <div className="flex gap-1">
                {SPEED_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setTtsSpeed(opt.value)}
                    title={opt.arabic}
                    className={`px-3 py-1 rounded-xl text-xs font-semibold border transition-all ${
                      ttsSpeed === opt.value
                        ? "bg-primary text-primary-foreground border-primary"
                        : "border-border text-muted-foreground hover:bg-accent hover:text-foreground"
                    }`}
                  >
                    {opt.label}
                    <span className="block text-[9px] font-normal opacity-70 leading-tight">{opt.arabic}</span>
                  </button>
                ))}
              </div>
            </div>
            {/* Chat area */}
            <div className="flex-1 overflow-y-auto space-y-4 py-2 pr-1">
              {session.messages.map((msg, i) =>
                msg.role === "assistant" ? (
                  <AIChatBubble key={i} content={msg.content} />
                ) : (
                  <UserChatBubble key={i} content={msg.content} />
                )
              )}

              {streamingContent !== null && (
                <AIChatBubble content={streamingContent || "…"} />
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Part 2 timer */}
            {session.phase === "part2-prep" && (
              <div className="shrink-0 mt-3">
                <CountdownTimer seconds={PREP_TIME} onEnd={handleTimerEnd} />
                <p className="text-xs text-muted-foreground text-center mt-2">
                  Read the cue card above. Your answer box will unlock when the timer ends.
                </p>
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="shrink-0 flex items-center gap-2 px-3 py-2 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-xl text-sm text-red-700 dark:text-red-400">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {error}
              </div>
            )}

            {/* Next Part / View Report button */}
            {(showNextPartBtn || showViewReportBtn) && (
              <div className="shrink-0 mt-3">
                {showNextPartBtn && (
                  <button
                    onClick={nextPart}
                    className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3.5 rounded-2xl font-bold hover:bg-primary/90 transition-colors shadow-sm"
                  >
                    <ChevronRight className="w-5 h-5" />
                    {session.part === 1 ? "Continue to Part 2 →" : "Continue to Part 3 →"}
                  </button>
                )}
                {showViewReportBtn && (
                  <button
                    onClick={viewReport}
                    className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-3.5 rounded-2xl font-bold transition-colors shadow-sm"
                  >
                    <Trophy className="w-5 h-5" />
                    View Full Speaking Report
                  </button>
                )}
              </div>
            )}

            {/* ── VOICE MODE input area ── */}
            {sessionMode === "voice" && !showNextPartBtn && !showViewReportBtn && (
              <div className="shrink-0 mt-3 flex flex-col items-center gap-3">
                {/* Status */}
                <div className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-2xl text-sm font-medium ${
                  isSpeaking
                    ? "bg-primary/10 border border-primary/30 text-primary"
                    : isLoading || streamingContent !== null
                    ? "bg-muted/60 border border-border text-muted-foreground"
                    : isTranscribing
                    ? "bg-sky-50 dark:bg-sky-950/20 border border-sky-200 dark:border-sky-800 text-sky-700 dark:text-sky-300"
                    : isRecording
                    ? "bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400"
                    : "bg-muted/40 border border-border text-muted-foreground"
                }`}>
                  {isSpeaking && <><Volume2 className="w-4 h-4 shrink-0 animate-pulse" /> المحكّم يتكلم…</>}
                  {!isSpeaking && (isLoading || streamingContent !== null) && <><Loader2 className="w-4 h-4 animate-spin shrink-0" /> يفكّر المحكّم…</>}
                  {!isSpeaking && !isLoading && streamingContent === null && isTranscribing && <><Loader2 className="w-4 h-4 animate-spin shrink-0" /> يحوّل الصوت لنص…</>}
                  {!isSpeaking && !isLoading && streamingContent === null && !isTranscribing && isRecording && <><span className="w-2 h-2 rounded-full bg-red-500 animate-pulse shrink-0" /> يسجّل… (صمت 3 ثوانٍ → يُرسَل تلقائياً)</>}
                  {!isSpeaking && !isLoading && streamingContent === null && !isTranscribing && !isRecording && <><Mic className="w-4 h-4 shrink-0" /> جاهز لإجابتك…</>}
                </div>
                {/* Large mic button */}
                <button
                  onClick={isSpeaking ? stopTts : toggleRecording}
                  disabled={isLoading || isTranscribing}
                  className={`w-20 h-20 rounded-full flex items-center justify-center transition-all shadow-lg disabled:opacity-40 disabled:cursor-not-allowed ${
                    isSpeaking
                      ? "bg-primary/20 text-primary border-2 border-primary/40 animate-pulse"
                      : isRecording
                      ? "bg-red-500 text-white animate-pulse scale-110"
                      : "bg-primary text-primary-foreground hover:bg-primary/90"
                  }`}
                >
                  {isSpeaking ? <VolumeX className="w-9 h-9" /> : isRecording ? <MicOff className="w-9 h-9" /> : <Mic className="w-9 h-9" />}
                </button>
                <p className="text-xs text-muted-foreground text-center">
                  {isRecording ? "اضغط مرة ثانية لإيقاف التسجيل" : isSpeaking ? "اضغط لمقاطعة المحكّم والإجابة" : "اضغط للتسجيل · يُرسَل تلقائياً"}
                </p>
                {/* Replay button */}
                {lastTtsText && !isRecording && !isSpeaking && !isLoading && !isTranscribing && (
                  <button onClick={replayTts} className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
                    <Volume2 className="w-3.5 h-3.5" /> إعادة سؤال المحكّم
                  </button>
                )}
                {/* FIX 3: Stop session button */}
                <button
                  onClick={stopSession}
                  disabled={isLoading && !isSpeaking}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm font-semibold hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors disabled:opacity-40"
                >
                  ⏹ إنهاء التمرين
                </button>
              </div>
            )}

            {/* ── TEXT MODE input area ── */}
            {sessionMode === "text" && !showNextPartBtn && !showViewReportBtn && (
              <div className="shrink-0 mt-3 space-y-2">
                {isSpeaking && (
                  <div className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium bg-primary/10 border border-primary/30 text-primary">
                    <Volume2 className="w-4 h-4 shrink-0 animate-pulse" />
                    المحكّم يتكلم — اكتب إجابتك أثناء الاستماع
                  </div>
                )}
                <div className="flex gap-2 items-end">
                  <div className="flex-1 bg-card border border-border rounded-2xl overflow-hidden focus-within:border-primary transition-colors">
                    <textarea
                      ref={inputRef}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      disabled={inputDisabled || isTranscribing}
                      placeholder={
                        session.phase === "part2-prep"
                          ? "Waiting for preparation time to end…"
                          : "Type your answer here, then press Send ↗"
                      }
                      rows={3}
                      className="w-full px-4 py-3 text-sm bg-transparent text-foreground placeholder:text-muted-foreground resize-none focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>
                  {/* Send button */}
                  <button
                    onClick={sendMessage}
                    disabled={inputDisabled || !input.trim() || isTranscribing}
                    className="w-12 h-12 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0 shadow-sm"
                  >
                    {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                  </button>
                </div>
                {lastTtsText && !isSpeaking && !isLoading && (
                  <button onClick={replayTts} className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors px-1">
                    <Volume2 className="w-3.5 h-3.5" /> Replay Churchill AI's last question
                  </button>
                )}
              </div>
            )}

            {/* Hint row */}
            {!session.partDone && !isLoading && streamingContent === null && session.messages.length > 0 && session.phase !== "part2-prep" && (
              <div className="shrink-0 flex items-center justify-between text-xs text-muted-foreground mt-1 px-1">
                <span className="flex items-center gap-1">
                  <MessageSquare className="w-3 h-3" />
                  Part {session.part} · {session.answeredCount}/{PART_LIMITS[session.part]} answered
                </span>
                <span className="text-xs opacity-60">{sessionMode === "voice" ? "🎤 وضع صوتي" : "⌨️ وضع كتابي"}</span>
              </div>
            )}
          </>
        )}
      </div>

      {/* ── TRANSCRIPT OVERLAY ── */}
      {showTranscript && (
        <TranscriptViewer
          topic={session.topic}
          entries={transcript}
          report={session.report}
          onClose={() => setShowTranscript(false)}
          onNewSession={() => { setShowTranscript(false); newSession(); }}
        />
      )}
    </Layout>
  );
}
