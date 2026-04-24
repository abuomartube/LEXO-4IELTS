import { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "wouter";
import { customFetch, useAwardXp, useAddWeakWords } from "@workspace/api-client-react";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import {
  Zap, ArrowRight, ArrowLeft, Loader2, Volume2, Square,
  RefreshCw, AlertTriangle, StopCircle, Trophy, CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Level = "A2" | "B1" | "B2" | "C1";
type Step = "setup" | "card" | "report";
type Phase = "counting" | "flipped";

interface Flashcard {
  id: number;
  english: string;
  arabic: string;
  level: string;
  category: string;
  exampleSentence?: string | null;
  exampleSentenceArabic?: string | null;
}

const TIME_OPTIONS = [5, 10, 15] as const;
type Seconds = typeof TIME_OPTIONS[number];

const API_BASE = (import.meta.env.VITE_API_URL as string | undefined) || "";

// ── OpenAI TTS (onyx) — cached in memory ────────────────────────────────
const ttsCache = new Map<string, string>();
let currentAudio: HTMLAudioElement | null = null;

async function fetchTtsUrl(text: string): Promise<string> {
  const key = text.trim();
  const cached = ttsCache.get(key);
  if (cached) return cached;
  const res = await fetch(`${API_BASE}/api/speaking/tts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: key, voice: "onyx", model: "tts-1-hd", speed: 0.95 }),
  });
  if (!res.ok) throw new Error("tts_failed");
  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  ttsCache.set(key, url);
  return url;
}

function SpeakerButton({ text, label }: { text: string; label: string }) {
  const [loading, setLoading] = useState(false);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => () => { audioRef.current?.pause(); }, []);

  async function handleClick() {
    if (!text?.trim()) return;
    if (playing) {
      audioRef.current?.pause();
      setPlaying(false);
      return;
    }
    setLoading(true);
    try {
      const url = await fetchTtsUrl(text);
      if (currentAudio && currentAudio !== audioRef.current) currentAudio.pause();
      const audio = new Audio(url);
      audioRef.current = audio;
      currentAudio = audio;
      audio.onended = () => setPlaying(false);
      audio.onpause = () => setPlaying(false);
      audio.onplay = () => setPlaying(true);
      await audio.play();
    } catch { /* silent */ }
    finally { setLoading(false); }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
      className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-primary/10 hover:bg-primary/20 text-primary font-semibold text-sm transition-colors disabled:opacity-50 min-h-[44px]"
    >
      {loading ? <Loader2 className="w-4 h-4 animate-spin" />
        : playing ? <Square className="w-4 h-4 fill-current" />
        : <Volume2 className="w-4 h-4" />}
      <span>{label}</span>
    </button>
  );
}

// ── Web Audio sound effects (synthesized — no asset files) ───────────────
let audioCtx: AudioContext | null = null;
function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const Ctor = (window as unknown as { AudioContext?: typeof AudioContext; webkitAudioContext?: typeof AudioContext }).AudioContext
      ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return null;
    audioCtx = new Ctor();
  }
  if (audioCtx.state === "suspended") audioCtx.resume().catch(() => {});
  return audioCtx;
}

function playTick() {
  const ctx = getCtx();
  if (!ctx) return;
  const t = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "square";
  osc.frequency.setValueAtTime(2200, t);
  osc.frequency.exponentialRampToValueAtTime(900, t + 0.04);
  gain.gain.setValueAtTime(0.0001, t);
  gain.gain.exponentialRampToValueAtTime(0.18, t + 0.005);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.06);
  osc.connect(gain).connect(ctx.destination);
  osc.start(t);
  osc.stop(t + 0.07);
}

function playWhoosh() {
  const ctx = getCtx();
  if (!ctx) return;
  const t = ctx.currentTime;
  // White noise burst with band-pass sweep — simulates a whoosh.
  const bufferSize = Math.floor(ctx.sampleRate * 0.45);
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
  const noise = ctx.createBufferSource();
  noise.buffer = buffer;
  const filter = ctx.createBiquadFilter();
  filter.type = "bandpass";
  filter.Q.value = 0.9;
  filter.frequency.setValueAtTime(300, t);
  filter.frequency.exponentialRampToValueAtTime(2400, t + 0.25);
  filter.frequency.exponentialRampToValueAtTime(400, t + 0.45);
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.0001, t);
  gain.gain.exponentialRampToValueAtTime(0.35, t + 0.05);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.45);
  noise.connect(filter).connect(gain).connect(ctx.destination);
  noise.start(t);
  noise.stop(t + 0.5);
}

function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function FlipIt() {
  const [step, setStep] = useState<Step>("setup");
  const [level, setLevel] = useState<Level>("B1");
  const [seconds, setSeconds] = useState<Seconds>(10);

  const [pool, setPool] = useState<Flashcard[]>([]);
  const [seenIds, setSeenIds] = useState<Set<number>>(new Set());
  const [card, setCard] = useState<Flashcard | null>(null);
  const [phase, setPhase] = useState<Phase>("counting");
  const [remaining, setRemaining] = useState<number>(seconds);

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const [cardsSeen, setCardsSeen] = useState(0);
  const [weakAdded, setWeakAdded] = useState(0);
  const [savingWeak, setSavingWeak] = useState(false);
  const [reportXp, setReportXp] = useState(0);

  const tickTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const flipTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const startTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { mutate: awardXp } = useAwardXp();
  const { mutate: addWeakWords } = useAddWeakWords();

  const clearTimers = useCallback(() => {
    if (tickTimerRef.current) { clearInterval(tickTimerRef.current); tickTimerRef.current = null; }
    if (flipTimerRef.current) { clearTimeout(flipTimerRef.current); flipTimerRef.current = null; }
    if (startTimerRef.current) { clearTimeout(startTimerRef.current); startTimerRef.current = null; }
  }, []);

  useEffect(() => () => clearTimers(), [clearTimers]);

  const drawNextCard = useCallback((source: Flashcard[], seen: Set<number>): Flashcard | null => {
    const remainingPool = source.filter((c) => !seen.has(c.id));
    if (remainingPool.length === 0) return null;
    return remainingPool[Math.floor(Math.random() * remainingPool.length)];
  }, []);

  const startCard = useCallback((nextCard: Flashcard) => {
    clearTimers();
    setCard(nextCard);
    setPhase("counting");
    setRemaining(seconds);

    let r = seconds;
    // First tick immediately (the visible number is already `seconds`, so we tick once on entry)
    playTick();
    tickTimerRef.current = setInterval(() => {
      r -= 1;
      setRemaining(r);
      if (r > 0) playTick();
      if (r <= 0) {
        if (tickTimerRef.current) { clearInterval(tickTimerRef.current); tickTimerRef.current = null; }
      }
    }, 1000);

    flipTimerRef.current = setTimeout(() => {
      playWhoosh();
      setPhase("flipped");
      setCardsSeen((n) => n + 1);
      // Record a progress event so the day counts toward the daily streak.
      customFetch("/api/flashcards/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ flashcardId: nextCard.id, known: false }),
      }).catch(() => {});
    }, seconds * 1000);
  }, [seconds, clearTimers]);

  async function startSession() {
    setLoading(true);
    setErr(null);
    try {
      const all = await customFetch<Flashcard[]>(`/api/flashcards?level=${level}`);
      if (!all || all.length === 0) {
        setErr(`No ${level} words available right now.`);
        return;
      }
      const shuffled = shuffle(all);
      setPool(shuffled);
      const seen = new Set<number>();
      setSeenIds(seen);
      setCardsSeen(0);
      setWeakAdded(0);
      const first = drawNextCard(shuffled, seen);
      if (!first) { setErr("No words to show."); return; }
      seen.add(first.id);
      setSeenIds(new Set(seen));
      // Warm up the audio context on the user-gesture (Start button click).
      getCtx();
      setStep("card");
      // Defer one tick so layout settles before timer starts.
      startTimerRef.current = setTimeout(() => startCard(first), 30);
    } catch {
      setErr("Could not load words. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function nextRandomCard() {
    const seen = new Set(seenIds);
    if (card) seen.add(card.id);
    const next = drawNextCard(pool, seen);
    if (!next) {
      // Pool exhausted — no repeats allowed in a session, so end gracefully.
      endSession();
      return;
    }
    seen.add(next.id);
    setSeenIds(seen);
    startCard(next);
  }

  function addCurrentToWeak() {
    if (!card || savingWeak) return;
    setSavingWeak(true);
    addWeakWords([card.id], {
      onSettled: () => {
        setSavingWeak(false);
        setWeakAdded((n) => n + 1);
        // Auto-advance after marking as weak.
        nextRandomCard();
      },
    });
  }

  function endSession() {
    clearTimers();
    if (currentAudio) { currentAudio.pause(); currentAudio = null; }
    // XP: 5 per card seen + 5 bonus per weak word added. Capped at 80.
    const earned = Math.min(80, cardsSeen * 5 + weakAdded * 5);
    if (earned > 0) {
      awardXp({ activity: "flip_it", amount: earned });
    }
    // Save a quiz-score entry so it counts in Teacher Dashboard.
    if (cardsSeen > 0) {
      customFetch("/api/quiz-scores", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "flip-it",
          level,
          total: cardsSeen,
          correct: cardsSeen,
          wrong: 0,
        }),
      }).catch(() => {});
    }
    setReportXp(earned);
    setStep("report");
  }

  // ── Setup screen ──
  if (step === "setup") {
    return (
      <Layout>
        <div className="max-w-xl mx-auto mt-8 animate-in fade-in duration-300">
          <Link
            href="/quiz"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-foreground mb-4 px-3 py-2 rounded-full hover:bg-muted/60 transition-colors min-h-[40px]"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Quiz Types
          </Link>
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/15 flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8 text-amber-500" />
            </div>
            <h1 className="text-3xl font-extrabold mb-2">Flip It</h1>
            <p className="text-muted-foreground">
              Race the clock. Read the English word, recall the meaning, then watch the card flip to reveal the answer.
            </p>
            <p className="text-sm text-muted-foreground mt-2 font-cairo" dir="rtl">
              تدرّب على المفردات بسرعة — تذكّر المعنى قبل أن تنقلب البطاقة.
            </p>
          </div>

          <div className="bg-card border border-border rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
            <div>
              <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3">
                Step 1 — Choose your level
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {(["A2", "B1", "B2", "C1"] as Level[]).map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setLevel(lvl)}
                    className={cn(
                      "min-h-[80px] rounded-2xl border-2 p-4 transition-all flex flex-col items-center justify-center",
                      level === lvl ? "border-amber-500 bg-amber-500/10 scale-[1.02]" : "border-border hover:border-amber-400/40"
                    )}
                  >
                    <div className="text-2xl font-extrabold">{lvl}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {lvl === "A2" ? "Elementary" : lvl === "B1" ? "Intermediate" : lvl === "B2" ? "Upper" : "Advanced"}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3">
                Step 2 — Time per card
              </h2>
              <div className="grid grid-cols-3 gap-3">
                {TIME_OPTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSeconds(s as Seconds)}
                    className={cn(
                      "min-h-[80px] rounded-2xl border-2 p-4 transition-all flex flex-col items-center justify-center",
                      seconds === s ? "border-amber-500 bg-amber-500/10 scale-[1.02]" : "border-border hover:border-amber-400/40"
                    )}
                  >
                    <div className="text-3xl font-extrabold">{s}</div>
                    <div className="text-xs text-muted-foreground mt-1">seconds</div>
                  </button>
                ))}
              </div>
            </div>

            {err && <p className="text-sm text-red-500">{err}</p>}

            <Button
              className="w-full rounded-full h-12 text-base font-bold bg-amber-500 hover:bg-amber-600 text-white"
              onClick={startSession}
              disabled={loading}
            >
              {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Loading…</>
                : <><Zap className="w-4 h-4 mr-2" /> Start Flipping</>}
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  // ── Report screen ──
  if (step === "report") {
    return (
      <Layout>
        <div className="max-w-md mx-auto mt-10 animate-in fade-in duration-300">
          <div className="bg-card border border-border rounded-3xl p-8 shadow-lg text-center">
            <div className="w-16 h-16 rounded-full bg-amber-500/15 flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-8 h-8 text-amber-500" />
            </div>
            <h2 className="text-2xl font-extrabold mb-1">Session Complete!</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Nice work flipping through {level} words.
            </p>

            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="bg-background border border-border rounded-2xl p-4">
                <div className="text-3xl font-extrabold">{cardsSeen}</div>
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground mt-1">Cards</div>
              </div>
              <div className="bg-background border border-border rounded-2xl p-4">
                <div className="text-3xl font-extrabold text-rose-500">{weakAdded}</div>
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground mt-1">Weak Saved</div>
              </div>
              <div className="bg-background border border-border rounded-2xl p-4">
                <div className="text-3xl font-extrabold text-amber-500">+{reportXp}</div>
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground mt-1">XP</div>
              </div>
            </div>

            <div className="flex gap-2 flex-col sm:flex-row">
              <Button
                className="rounded-full flex-1 bg-amber-500 hover:bg-amber-600 text-white"
                onClick={() => { setStep("setup"); setReportXp(0); }}
              >
                <RefreshCw className="w-4 h-4 mr-2" /> Play Again
              </Button>
              <Button asChild variant="outline" className="rounded-full flex-1">
                <Link href="/quiz">Back to Quiz</Link>
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // ── Card screen ──
  const isCounting = phase === "counting";
  const lowSeconds = isCounting && remaining > 0 && remaining <= 3;
  const numberColor = lowSeconds ? "text-red-500" : "text-amber-500";

  return (
    <Layout>
      <div className="max-w-xl mx-auto mt-4 sm:mt-6 animate-in fade-in duration-300">
        <div className="flex items-center justify-between mb-4 gap-2 flex-wrap">
          <div className="text-xs text-muted-foreground">
            <span className="font-bold text-foreground">{cardsSeen}</span> seen · Level {level}
          </div>
          <button
            onClick={endSession}
            className="text-xs font-semibold text-rose-500 hover:text-rose-600 flex items-center gap-1 px-3 py-1.5 rounded-full border border-rose-200 dark:border-rose-900/40 hover:border-rose-400 transition-colors min-h-[36px]"
          >
            <StopCircle className="w-3.5 h-3.5" /> End Session
          </button>
        </div>

        {/* Countdown indicator */}
        {isCounting && (
          <div className="text-center mb-4">
            <div
              key={remaining}
              className={cn(
                "inline-block text-6xl sm:text-7xl font-extrabold tabular-nums transition-colors",
                numberColor,
                lowSeconds && "animate-in zoom-in-50 duration-150"
              )}
            >
              {remaining}
            </div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">
              {lowSeconds ? "Flip incoming…" : "Recall the meaning"}
            </div>
          </div>
        )}

        {/* The 3D flip card */}
        {card && (
          <div className="perspective-1000">
            <div
              className={cn("flip-card", phase === "flipped" && "flipped")}
            >
              <div className="flip-card-inner relative w-full" style={{ minHeight: "min(60vh, 480px)" }}>
                {/* FRONT */}
                <div className="absolute inset-0 backface-hidden bg-card border-2 border-border rounded-3xl shadow-lg p-8 flex flex-col items-center justify-center text-center">
                  <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">
                    Read the word
                  </div>
                  <div className="text-5xl sm:text-6xl font-extrabold text-foreground break-words">
                    {card.english}
                  </div>
                  <div className="text-xs text-muted-foreground italic mt-4">
                    {card.category}
                  </div>
                  {/* Progress bar at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-muted/40 rounded-b-3xl overflow-hidden">
                    <div
                      className={cn("h-full transition-all duration-1000 ease-linear", lowSeconds ? "bg-red-500" : "bg-amber-500")}
                      style={{ width: `${(remaining / seconds) * 100}%` }}
                    />
                  </div>
                </div>

                {/* BACK */}
                <div className="absolute inset-0 backface-hidden rotate-y-180 bg-card border-2 border-amber-500/40 rounded-3xl shadow-lg p-5 sm:p-6 flex flex-col overflow-y-auto">
                  <div className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-2 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Answer
                  </div>

                  {/* English word — smaller, secondary */}
                  <div className="text-xl sm:text-2xl font-bold text-foreground mb-1">
                    {card.english}
                  </div>
                  {/* Arabic meaning — PROMINENT, larger than the English word */}
                  <div
                    className="text-4xl sm:text-5xl font-extrabold text-amber-600 dark:text-amber-400 font-cairo leading-tight mb-4"
                    dir="rtl"
                  >
                    {card.arabic}
                  </div>

                  {/* Example sentence block (always show — fall back if missing) */}
                  <div className="bg-muted/40 rounded-2xl p-4 mb-3 flex-1">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                      Example
                    </div>
                    {card.exampleSentence ? (
                      <>
                        <p className="text-base sm:text-lg font-semibold leading-snug text-foreground">
                          {card.exampleSentence}
                        </p>
                        {card.exampleSentenceArabic && (
                          <p
                            className="text-base sm:text-lg font-bold font-cairo text-muted-foreground mt-3 pt-3 border-t border-border/50 leading-snug"
                            dir="rtl"
                          >
                            {card.exampleSentenceArabic}
                          </p>
                        )}
                      </>
                    ) : (
                      <p className="text-sm text-muted-foreground italic">
                        No example available for this word.
                      </p>
                    )}
                  </div>

                  {/* Audio buttons — word + sentence (both onyx) */}
                  <div className="flex flex-wrap gap-2 mt-1">
                    <SpeakerButton text={card.english} label="Word" />
                    {card.exampleSentence && (
                      <SpeakerButton text={card.exampleSentence} label="Sentence" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action row — only after flip */}
        {phase === "flipped" && card && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <Button
              onClick={nextRandomCard}
              className="rounded-full h-12 text-sm font-bold bg-amber-500 hover:bg-amber-600 text-white"
            >
              <ArrowRight className="w-4 h-4 mr-1.5" /> Try a New Word
            </Button>
            <Button
              variant="outline"
              onClick={addCurrentToWeak}
              disabled={savingWeak}
              className="rounded-full h-12 text-sm font-bold border-rose-300 dark:border-rose-900/40 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/20"
            >
              {savingWeak ? <Loader2 className="w-4 h-4 mr-1.5 animate-spin" />
                : <AlertTriangle className="w-4 h-4 mr-1.5" />}
              Add to Weak Words
            </Button>
            <Button
              variant="outline"
              onClick={endSession}
              className="rounded-full h-12 text-sm font-bold"
            >
              <StopCircle className="w-4 h-4 mr-1.5" /> End Session
            </Button>
          </div>
        )}

        {/* Spacer hint while counting */}
        {isCounting && (
          <p className="text-center text-xs text-muted-foreground mt-4">
            Listen for the tick. Try to recall the Arabic meaning before the card flips.
          </p>
        )}

        {/* Back link only when on a fresh card */}
        {phase === "counting" && (
          <button
            onClick={() => { clearTimers(); setStep("setup"); }}
            className="mt-4 text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 mx-auto"
          >
            <ArrowLeft className="w-3 h-3" /> Change settings
          </button>
        )}
      </div>
    </Layout>
  );
}
