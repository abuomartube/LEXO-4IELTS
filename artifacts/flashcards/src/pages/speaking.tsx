import { useState, useEffect, useRef, useCallback } from "react";
import { Layout } from "@/components/layout";
import {
  Mic, MicOff, Send, ChevronRight, RotateCcw, Timer, Trophy,
  MessageSquare, Loader2, CheckCircle, AlertCircle, BookOpen, Sparkles,
  Volume2, VolumeX
} from "lucide-react";

// ─── Constants ───────────────────────────────────────────────────────────────

const TOPICS = [
  "Hometown", "Daily routine", "Food & cooking", "Sports", "Music",
  "Reading", "Weather", "Shopping", "Travel", "Technology",
  "Friends", "Family", "Work/Study", "Mornings", "Free time",
];

const CUE_CARDS: Record<string, string> = {
  "Hometown": "a place you grew up in or know very well",
  "Daily routine": "a typical day in your life",
  "Food & cooking": "a meal or dish that is special to you",
  "Sports": "a sport or physical activity you enjoy or have tried",
  "Music": "a song, artist, or type of music that is meaningful to you",
  "Reading": "a book, article, or story that impressed or influenced you",
  "Weather": "a time when the weather had a strong effect on your plans or mood",
  "Shopping": "a purchase or shopping experience you remember well",
  "Travel": "a journey or trip that was particularly memorable",
  "Technology": "a piece of technology that has changed your daily life",
  "Friends": "a close friend and your friendship with them",
  "Family": "a family member who has been important to you",
  "Work/Study": "a job, task, or subject you have studied or worked on",
  "Mornings": "your morning routine or a morning that stands out in your memory",
  "Free time": "a hobby or activity you enjoy doing in your free time",
};

const PART_LIMITS = { 1: 5, 2: 1, 3: 4 };
const PREP_TIME = 60;

const USED_TOPICS_KEY = "ielts_speaking_used_topics";

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

function pickTopic(): string {
  const raw = localStorage.getItem(USED_TOPICS_KEY);
  let used: string[] = [];
  try { used = JSON.parse(raw ?? "[]"); } catch { used = []; }
  const available = TOPICS.filter((t) => !used.includes(t));
  const pool = available.length > 0 ? available : TOPICS;
  const chosen = pool[Math.floor(Math.random() * pool.length)];
  const newUsed = available.length > 0
    ? [...used, chosen]
    : [chosen];
  localStorage.setItem(USED_TOPICS_KEY, JSON.stringify(newUsed));
  return chosen;
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

  // Auto-scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [session.messages, isLoading, streamingContent]);

  // Keep refs in sync
  useEffect(() => { sessionRef.current = session; }, [session]);

  // ── TTS ──────────────────────────────────────────────────────────────────────

  const stopTts = useCallback(() => {
    if (ttsAudioRef.current) {
      ttsAudioRef.current.pause();
      ttsAudioRef.current.src = "";
      ttsAudioRef.current = null;
    }
    setIsSpeaking(false);
  }, []);

  const playTts = useCallback(async (text: string) => {
    if (!text.trim()) return;
    stopTts();
    const clean = stripForTts(text);
    if (!clean) return;
    setLastTtsText(clean);

    try {
      const res = await fetch("/api/speaking/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: clean }),
      });
      if (!res.ok) return;

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      ttsAudioRef.current = audio;
      setIsSpeaking(true);

      audio.onended = () => {
        URL.revokeObjectURL(url);
        ttsAudioRef.current = null;
        setIsSpeaking(false);
        // No auto-mic — student types or taps mic when ready
      };
      audio.onerror = () => {
        URL.revokeObjectURL(url);
        ttsAudioRef.current = null;
        setIsSpeaking(false);
      };
      await audio.play();
    } catch {
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
  const startSession = useCallback(async () => {
    stopTts();
    const topic = pickTopic();
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
      const reply = await callSpeakingAPIStream([], topic, 1, 1, true, setStreamingContent);
      setStreamingContent(null);
      setSession((s) => ({
        ...s,
        messages: [{ role: "assistant", content: reply }],
      }));
      const { examinerText } = parseFeedback(reply);
      playTts(examinerText || reply);
    } catch {
      setStreamingContent(null);
      setError("Could not connect to the AI examiner. Please try again.");
      setSession((s) => ({ ...s, phase: "idle" }));
    } finally {
      setIsLoading(false);
    }
  }, [stopTts, playTts]);

  // ── Core send logic (shared by manual send + auto-send after voice) ──
  const processAnswer = useCallback(async (text: string) => {
    if (!text.trim() || isLoading) return;

    stopTts();
    setInput("");
    setError(null);

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
      setStreamingContent(null);
      setSession((s) => ({
        ...s,
        messages: [...newMessages, { role: "assistant", content: reply }],
        partDone: partDoneNow,
      }));
      const { examinerText } = parseFeedback(reply);
      playTts(examinerText || reply);
    } catch {
      setStreamingContent(null);
      setError("Failed to get AI response. Please try again.");
    } finally {
      setIsLoading(false);
      setTimeout(() => inputRef.current?.focus(), 100);
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

  // ── New session ──
  const newSession = useCallback(() => {
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
  }, [stopTts, stopRecording]);

  const startRecording = useCallback(async () => {
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
            // Put transcribed text in the input box — student edits & sends manually
            setInput((prev) => prev ? prev + " " + data.text.trim() : data.text.trim());
            setTimeout(() => {
              inputRef.current?.focus();
              // Move cursor to end
              const el = inputRef.current;
              if (el) el.setSelectionRange(el.value.length, el.value.length);
            }, 50);
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
                <h1 className="text-xl font-extrabold text-foreground">IELTS Speaking Practice</h1>
                {session.topic ? (
                  <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                    Topic: {session.topic}
                  </span>
                ) : (
                  <p className="text-xs text-muted-foreground">AI-powered mock speaking test</p>
                )}
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
          <div className="flex-1 flex flex-col items-center justify-center text-center gap-6 px-4">
            <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center">
              <Mic className="w-10 h-10 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-foreground mb-2">IELTS Speaking Mock Test</h2>
              <p className="text-muted-foreground max-w-md leading-relaxed">
                Practise all 3 parts of the IELTS Speaking test with an AI examiner.
                Get real-time feedback on grammar, vocabulary, and band scores after every answer.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 text-sm text-muted-foreground">
              {[
                { icon: "1️⃣", text: "Part 1 — 5 personal questions" },
                { icon: "2️⃣", text: "Part 2 — 1 minute long turn" },
                { icon: "3️⃣", text: "Part 3 — 4 discussion questions" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-2 bg-muted/50 px-3 py-2 rounded-xl">
                  <span>{item.icon}</span>
                  <span className="font-medium">{item.text}</span>
                </div>
              ))}
            </div>
            <button
              onClick={startSession}
              className="flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 rounded-2xl font-bold text-base hover:bg-primary/90 transition-colors shadow-md"
            >
              <Mic className="w-5 h-5" />
              Start Practice
            </button>
            <p className="text-xs text-muted-foreground max-w-xs">
              Type your answers or tap the 🎤 mic to speak. You choose when to send each answer.
            </p>
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
          <div className="flex-1 overflow-y-auto">
            <FinalReport report={session.report} topic={session.topic} onNewSession={newSession} />
          </div>
        )}

        {/* ── ACTIVE SESSION ── */}
        {(session.phase === "part1" || session.phase === "part2-prep" || session.phase === "part2-answer" || session.phase === "part3") && (
          <>
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

            {/* Input area */}
            {!showNextPartBtn && !showViewReportBtn && (
              <div className="shrink-0 mt-3 space-y-2">
                {/* TTS speaking indicator */}
                {isSpeaking && (
                  <div className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium bg-primary/10 border border-primary/30 text-primary">
                    <Volume2 className="w-4 h-4 shrink-0 animate-pulse" />
                    Examiner is speaking — you can type your answer or tap 🎤 to interrupt and speak
                  </div>
                )}
                {/* Recording / transcribing indicator */}
                {(isRecording || isTranscribing) && (
                  <div className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium ${
                    isTranscribing
                      ? "bg-sky-50 dark:bg-sky-950/20 border border-sky-200 dark:border-sky-800 text-sky-700 dark:text-sky-300"
                      : "bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400"
                  }`}>
                    {isTranscribing ? (
                      <><Loader2 className="w-4 h-4 animate-spin shrink-0" /> Converting voice to text — it will appear in the box below for you to edit…</>
                    ) : (
                      <><span className="w-2 h-2 rounded-full bg-red-500 animate-pulse shrink-0" /> Recording… tap 🎤 again to stop. Auto-stops after 3 s of silence.</>
                    )}
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
                          : isRecording
                          ? "Recording… your words will appear here when done"
                          : isTranscribing
                          ? "Processing your voice…"
                          : "Type your answer here, then press Send ↗"
                      }
                      rows={3}
                      className="w-full px-4 py-3 text-sm bg-transparent text-foreground placeholder:text-muted-foreground resize-none focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>
                  {/* Mic button — tap to interrupt examiner or toggle recording */}
                  <button
                    onClick={isSpeaking ? stopTts : toggleRecording}
                    disabled={!isSpeaking && (inputDisabled || isTranscribing)}
                    title={
                      isSpeaking
                        ? "Tap to stop examiner and respond"
                        : isRecording
                        ? "Tap to stop recording"
                        : "Tap to record your answer"
                    }
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all shrink-0 shadow-sm disabled:opacity-40 disabled:cursor-not-allowed ${
                      isSpeaking
                        ? "bg-primary/20 text-primary border border-primary/40 animate-pulse"
                        : isRecording
                        ? "bg-red-500 text-white hover:bg-red-600 animate-pulse"
                        : "bg-muted text-muted-foreground hover:bg-accent hover:text-foreground border border-border"
                    }`}
                  >
                    {isSpeaking ? (
                      <VolumeX className="w-5 h-5" />
                    ) : isRecording ? (
                      <MicOff className="w-5 h-5" />
                    ) : (
                      <Mic className="w-5 h-5" />
                    )}
                  </button>
                  {/* Replay TTS button */}
                  {lastTtsText && !isRecording && !isSpeaking && !isLoading && (
                    <button
                      onClick={replayTts}
                      title="Replay examiner's last message"
                      className="w-12 h-12 rounded-2xl bg-muted text-muted-foreground hover:bg-accent hover:text-foreground border border-border flex items-center justify-center transition-all shrink-0 shadow-sm"
                    >
                      <Volume2 className="w-5 h-5" />
                    </button>
                  )}
                  {/* Send button */}
                  <button
                    onClick={sendMessage}
                    disabled={inputDisabled || !input.trim() || isTranscribing}
                    className="w-12 h-12 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0 shadow-sm"
                  >
                    {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            )}

            {/* Part 2 note */}
            {session.phase === "part2-answer" && !session.partDone && (
              <p className="shrink-0 text-xs text-center text-muted-foreground mt-1">
                Speak for 1–2 minutes. Type your full response, then press Send.
              </p>
            )}

            {/* Hint */}
            {session.phase !== "part2-prep" && !session.partDone && !isLoading && streamingContent === null && session.messages.length > 0 && (
              <div className="shrink-0 flex items-center justify-between text-xs text-muted-foreground mt-1 px-1">
                <span className="flex items-center gap-1">
                  <MessageSquare className="w-3 h-3" />
                  Part {session.part} · {session.answeredCount}/{PART_LIMITS[session.part]} answered
                </span>
                <span className="flex items-center gap-1">
                  <Mic className="w-3 h-3" /> tap to speak · or type + Enter
                </span>
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  );
}
