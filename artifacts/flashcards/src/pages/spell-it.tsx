import { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "wouter";
import { customFetch, useAwardXp, useAddWeakWords } from "@workspace/api-client-react";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import {
  SpellCheck2, ArrowRight, ArrowLeft, Loader2, Volume2, Square,
  RefreshCw, StopCircle, Trophy, CheckCircle2, XCircle, Plus,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Level = "A2" | "B1" | "B2" | "C1";
type Step = "setup" | "card" | "report";
type Phase = "playing" | "revealed";

interface Flashcard {
  id: number;
  english: string;
  arabic: string;
  level: string;
  category: string;
}

interface Clue {
  definition: string;
  hint: string;
}

const TIME_OPTIONS = [5, 10, 15] as const;
type Seconds = typeof TIME_OPTIONS[number];

const API_BASE = (import.meta.env.VITE_API_URL as string | undefined) || "";

// ── OpenAI TTS (onyx, normal speed for spelling clarity) ────────────────
const ttsCache = new Map<string, string>();
let currentAudio: HTMLAudioElement | null = null;

async function fetchTtsUrl(text: string): Promise<string> {
  const key = text.trim();
  const cached = ttsCache.get(key);
  if (cached) return cached;
  const res = await fetch(`${API_BASE}/api/speaking/tts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    // Normal speed (1.0) for clear British-English spelling pronunciation.
    body: JSON.stringify({ text: key, voice: "onyx", model: "tts-1-hd", speed: 1.0 }),
  });
  if (!res.ok) throw new Error("tts_failed");
  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  ttsCache.set(key, url);
  return url;
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

function playCorrect() {
  const ctx = getCtx();
  if (!ctx) return;
  const t = ctx.currentTime;
  // Two ascending sine notes — bright, friendly chime.
  const notes = [
    { freq: 660, start: 0,    dur: 0.18 },  // E5
    { freq: 988, start: 0.14, dur: 0.26 },  // B5
  ];
  for (const n of notes) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(n.freq, t + n.start);
    gain.gain.setValueAtTime(0.0001, t + n.start);
    gain.gain.exponentialRampToValueAtTime(0.25, t + n.start + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + n.start + n.dur);
    osc.connect(gain).connect(ctx.destination);
    osc.start(t + n.start);
    osc.stop(t + n.start + n.dur + 0.02);
  }
}

function playWrong() {
  const ctx = getCtx();
  if (!ctx) return;
  const t = ctx.currentTime;
  // Descending square buzz — gentle but clearly negative.
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "square";
  osc.frequency.setValueAtTime(220, t);
  osc.frequency.exponentialRampToValueAtTime(90, t + 0.32);
  gain.gain.setValueAtTime(0.0001, t);
  gain.gain.exponentialRampToValueAtTime(0.22, t + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.34);
  osc.connect(gain).connect(ctx.destination);
  osc.start(t);
  osc.stop(t + 0.36);
}

function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Letters in the target word (a-z). We render one input box per letter.
// Non-letter chars (spaces, hyphens, apostrophes) are shown as fixed dividers
// so the student doesn't have to type them.
interface Slot {
  index: number;        // index in the original word
  isLetter: boolean;
  ch: string;           // original character
}

function buildSlots(word: string): Slot[] {
  return word.split("").map((ch, i) => ({
    index: i,
    isLetter: /[a-z]/i.test(ch),
    ch,
  }));
}

function letterPositions(slots: Slot[]): number[] {
  return slots.map((s, i) => (s.isLetter ? i : -1)).filter((i) => i >= 0);
}

export default function SpellIt() {
  const [step, setStep] = useState<Step>("setup");
  const [level, setLevel] = useState<Level>("B1");
  const [seconds, setSeconds] = useState<Seconds>(10);

  const [pool, setPool] = useState<Flashcard[]>([]);
  const [seenIds, setSeenIds] = useState<Set<number>>(new Set());
  const [card, setCard] = useState<Flashcard | null>(null);
  const [clue, setClue] = useState<Clue | null>(null);
  const [phase, setPhase] = useState<Phase>("playing");
  const [remaining, setRemaining] = useState<number>(seconds);

  const [letters, setLetters] = useState<string[]>([]);
  const [reveal, setReveal] = useState<{ correct: boolean; word: string } | null>(null);

  const [audioLoading, setAudioLoading] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const [wordsAttempted, setWordsAttempted] = useState(0);
  const [wordsCorrect, setWordsCorrect] = useState(0);
  const [weakAdded, setWeakAdded] = useState(0);
  const [savingWeak, setSavingWeak] = useState(false);
  const [reportXp, setReportXp] = useState(0);

  const tickTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const revealTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const cardSeqRef = useRef<number>(0);

  const { mutate: awardXp } = useAwardXp();
  const { mutate: addWeakWords } = useAddWeakWords();

  const clearTimers = useCallback(() => {
    if (tickTimerRef.current) { clearInterval(tickTimerRef.current); tickTimerRef.current = null; }
    if (revealTimerRef.current) { clearTimeout(revealTimerRef.current); revealTimerRef.current = null; }
  }, []);

  useEffect(() => () => {
    clearTimers();
    audioRef.current?.pause();
  }, [clearTimers]);

  const drawNextCard = useCallback((source: Flashcard[], seen: Set<number>): Flashcard | null => {
    const remainingPool = source.filter((c) => !seen.has(c.id));
    if (remainingPool.length === 0) return null;
    return remainingPool[Math.floor(Math.random() * remainingPool.length)];
  }, []);

  const slots = card ? buildSlots(card.english) : [];
  const letterIdxs = letterPositions(slots);

  // Build the combined TTS script for the current word + clue.
  function buildScript(word: string, c: Clue): string {
    return `Spell this word. ${word}. ${word}. Definition: ${c.definition} Hint: ${c.hint}`;
  }

  async function playClue() {
    if (!card || !clue) return;
    if (audioPlaying) {
      audioRef.current?.pause();
      setAudioPlaying(false);
      return;
    }
    setAudioLoading(true);
    try {
      const script = buildScript(card.english, clue);
      const url = await fetchTtsUrl(script);
      if (currentAudio && currentAudio !== audioRef.current) currentAudio.pause();
      const audio = new Audio(url);
      audioRef.current = audio;
      currentAudio = audio;
      audio.onended = () => setAudioPlaying(false);
      audio.onpause = () => setAudioPlaying(false);
      audio.onplay = () => setAudioPlaying(true);
      await audio.play();
    } catch { /* silent */ }
    finally { setAudioLoading(false); }
  }

  const revealAnswer = useCallback((correct: boolean, currentCard: Flashcard) => {
    clearTimers();
    audioRef.current?.pause();
    setPhase("revealed");
    setReveal({ correct, word: currentCard.english });
    setWordsAttempted((n) => n + 1);
    if (correct) {
      setWordsCorrect((n) => n + 1);
      playCorrect();
    } else {
      playWrong();
    }
    // Record progress for the daily streak.
    customFetch("/api/flashcards/progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ flashcardId: currentCard.id, known: correct }),
    }).catch(() => {});
  }, [clearTimers]);

  const startCard = useCallback(async (nextCard: Flashcard) => {
    clearTimers();
    audioRef.current?.pause();
    // Bump the sequence so any in-flight clue from the previous card is ignored.
    cardSeqRef.current += 1;
    const seq = cardSeqRef.current;
    setCard(nextCard);
    setClue(null);
    setReveal(null);
    setPhase("playing");
    setRemaining(seconds);
    const lettersOnly = nextCard.english.split("").filter((ch) => /[a-z]/i.test(ch));
    setLetters(new Array(lettersOnly.length).fill(""));

    // Fetch clue in background — speaker button will wait if needed.
    customFetch<Clue>("/api/spell-it/clue", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ word: nextCard.english, level }),
    }).then((c) => {
      // Drop stale responses from previous cards.
      if (cardSeqRef.current === seq) setClue(c);
    }).catch(() => {
      if (cardSeqRef.current !== seq) return;
      // Fallback clue using fields we already have.
      setClue({
        definition: `A ${nextCard.category} word.`,
        hint: `It has ${lettersOnly.length} letters.`,
      });
    });

    // Focus the first letter box on next paint.
    setTimeout(() => { inputRefs.current[0]?.focus(); }, 50);

    // Start the countdown.
    let r = seconds;
    playTick();
    tickTimerRef.current = setInterval(() => {
      r -= 1;
      setRemaining(r);
      if (r > 0) playTick();
      if (r <= 0) {
        if (tickTimerRef.current) { clearInterval(tickTimerRef.current); tickTimerRef.current = null; }
      }
    }, 1000);

    revealTimerRef.current = setTimeout(() => {
      // Re-read state from refs — `letters` here is stale, so we have to compute correctness inside.
      // We use a second timeout-tracked check via DOM by reading inputs.
      const currentLetters = inputRefs.current.map((el) => (el?.value ?? "").toLowerCase());
      const target = nextCard.english.split("").filter((ch) => /[a-z]/i.test(ch)).map((c) => c.toLowerCase());
      const isCorrect = currentLetters.length === target.length && currentLetters.every((l, i) => l === target[i]);
      revealAnswer(isCorrect, nextCard);
    }, seconds * 1000);
  }, [seconds, clearTimers, revealAnswer, level]);

  async function startSession() {
    setLoading(true);
    setErr(null);
    try {
      const all = await customFetch<Flashcard[]>(`/api/flashcards?level=${level}`);
      if (!all || all.length === 0) {
        setErr(`No ${level} words available right now.`);
        return;
      }
      // Filter to words with at least one letter.
      const usable = all.filter((c) => /[a-z]/i.test(c.english));
      const shuffled = shuffle(usable);
      setPool(shuffled);
      const seen = new Set<number>();
      setSeenIds(seen);
      setWordsAttempted(0);
      setWordsCorrect(0);
      setWeakAdded(0);
      const first = drawNextCard(shuffled, seen);
      if (!first) { setErr("No words to show."); return; }
      seen.add(first.id);
      setSeenIds(new Set(seen));
      // Warm up audio context on user gesture.
      getCtx();
      setStep("card");
      setTimeout(() => startCard(first), 30);
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
      onSuccess: () => { setWeakAdded((n) => n + 1); },
      onSettled: () => {
        setSavingWeak(false);
        nextRandomCard();
      },
    });
  }

  function endSession() {
    clearTimers();
    audioRef.current?.pause();
    if (currentAudio) { currentAudio.pause(); currentAudio = null; }
    // XP: 10 per correct + 2 per attempted (incorrect counts too) + 5 per weak.
    const wrong = wordsAttempted - wordsCorrect;
    const earned = Math.min(120, wordsCorrect * 10 + wrong * 2 + weakAdded * 5);
    if (earned > 0) {
      awardXp({ activity: "spell_it", amount: earned });
    }
    if (wordsAttempted > 0) {
      customFetch("/api/quiz-scores", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "spell-it",
          level,
          total: wordsAttempted,
          correct: wordsCorrect,
          wrong: Math.max(0, wrong),
        }),
      }).catch(() => {});
    }
    setReportXp(earned);
    setStep("report");
  }

  // Letter-input helpers.
  function setLetter(i: number, value: string) {
    const v = value.replace(/[^a-zA-Z]/g, "").slice(-1).toLowerCase();
    setLetters((prev) => {
      const next = prev.slice();
      next[i] = v;
      return next;
    });
    if (v && i < letterIdxs.length - 1) {
      // Move to next box.
      setTimeout(() => inputRefs.current[i + 1]?.focus(), 0);
    }
    // Auto-check when all boxes filled.
    if (v && i === letterIdxs.length - 1) {
      setTimeout(() => {
        const all = inputRefs.current.map((el) => (el?.value ?? "").toLowerCase());
        if (all.length === letterIdxs.length && all.every((c) => c.length === 1)) {
          checkAnswerNow();
        }
      }, 30);
    }
  }

  function checkAnswerNow() {
    if (!card || phase !== "playing") return;
    const currentLetters = inputRefs.current.map((el) => (el?.value ?? "").toLowerCase());
    const target = card.english.split("").filter((ch) => /[a-z]/i.test(ch)).map((c) => c.toLowerCase());
    if (currentLetters.length !== target.length) return;
    if (!currentLetters.every((c) => c.length === 1)) return;
    const isCorrect = currentLetters.every((l, i) => l === target[i]);
    if (isCorrect) {
      revealAnswer(true, card);
    }
    // If wrong but timer still running, do nothing — user can keep editing.
  }

  function onKeyDownLetter(i: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && !letters[i] && i > 0) {
      setTimeout(() => inputRefs.current[i - 1]?.focus(), 0);
    } else if (e.key === "ArrowLeft" && i > 0) {
      e.preventDefault();
      inputRefs.current[i - 1]?.focus();
    } else if (e.key === "ArrowRight" && i < letterIdxs.length - 1) {
      e.preventDefault();
      inputRefs.current[i + 1]?.focus();
    } else if (e.key === "Enter") {
      e.preventDefault();
      checkAnswerNow();
    }
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
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/15 flex items-center justify-center mx-auto mb-4">
              <SpellCheck2 className="w-8 h-8 text-emerald-500" />
            </div>
            <h1 className="text-3xl font-extrabold mb-2">Spell It</h1>
            <p className="text-muted-foreground">
              Listen to the word, the definition, and a hint — then race the clock to spell it correctly.
            </p>
            <p className="text-sm text-muted-foreground mt-2 font-cairo" dir="rtl">
              استمع إلى الكلمة والتعريف والتلميح، ثم تسابق مع الوقت لتهجئتها بشكل صحيح.
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
                      level === lvl ? "border-emerald-500 bg-emerald-500/10 scale-[1.02]" : "border-border hover:border-emerald-400/40"
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
                Step 2 — Time per word
              </h2>
              <div className="grid grid-cols-3 gap-3">
                {TIME_OPTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSeconds(s as Seconds)}
                    className={cn(
                      "min-h-[80px] rounded-2xl border-2 p-4 transition-all flex flex-col items-center justify-center",
                      seconds === s ? "border-emerald-500 bg-emerald-500/10 scale-[1.02]" : "border-border hover:border-emerald-400/40"
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
              className="w-full rounded-full h-12 text-base font-bold bg-emerald-500 hover:bg-emerald-600 text-white"
              onClick={startSession}
              disabled={loading}
            >
              {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Loading…</>
                : <><SpellCheck2 className="w-4 h-4 mr-2" /> Start Spelling</>}
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  // ── Report screen ──
  if (step === "report") {
    const accuracy = wordsAttempted > 0 ? Math.round((wordsCorrect / wordsAttempted) * 100) : 0;
    return (
      <Layout>
        <div className="max-w-md mx-auto mt-10 animate-in fade-in duration-300">
          <div className="bg-card border border-border rounded-3xl p-8 shadow-lg text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-500/15 flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-8 h-8 text-emerald-500" />
            </div>
            <h2 className="text-2xl font-extrabold mb-1">Session Complete!</h2>
            <p className="text-sm text-muted-foreground mb-6">
              {accuracy}% accuracy on {level} spelling.
            </p>

            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="bg-background border border-border rounded-2xl p-4">
                <div className="text-3xl font-extrabold">{wordsAttempted}</div>
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground mt-1">Words</div>
              </div>
              <div className="bg-background border border-border rounded-2xl p-4">
                <div className="text-3xl font-extrabold text-emerald-500">{wordsCorrect}</div>
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground mt-1">Correct</div>
              </div>
              <div className="bg-background border border-border rounded-2xl p-4">
                <div className="text-3xl font-extrabold text-amber-500">+{reportXp}</div>
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground mt-1">XP</div>
              </div>
            </div>

            <div className="flex gap-2 flex-col sm:flex-row">
              <Button
                className="rounded-full flex-1 bg-emerald-500 hover:bg-emerald-600 text-white"
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
  const isPlaying = phase === "playing";
  const lowSeconds = isPlaying && remaining > 0 && remaining <= 3;
  const numberColor = lowSeconds ? "text-red-500" : "text-emerald-500";

  return (
    <Layout>
      <div className="max-w-xl mx-auto mt-4 sm:mt-6 animate-in fade-in duration-300">
        <div className="flex items-center justify-between mb-4 gap-2 flex-wrap">
          <div className="text-xs text-muted-foreground">
            <span className="font-bold text-foreground">{wordsCorrect}</span> / {wordsAttempted} correct · Level {level}
          </div>
          <button
            onClick={endSession}
            className="text-xs font-semibold text-rose-500 hover:text-rose-600 flex items-center gap-1 px-3 py-1.5 rounded-full border border-rose-200 dark:border-rose-900/40 hover:border-rose-400 transition-colors min-h-[36px]"
          >
            <StopCircle className="w-3.5 h-3.5" /> End Game
          </button>
        </div>

        {/* Countdown indicator */}
        {isPlaying && (
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
              {lowSeconds ? "Hurry…" : "Spell the word"}
            </div>
          </div>
        )}

        {/* Card */}
        {card && (
          <div className="bg-card border-2 border-border rounded-3xl shadow-lg p-6 sm:p-8">
            {/* Hear It button */}
            <div className="flex justify-center mb-6">
              <button
                type="button"
                onClick={playClue}
                disabled={audioLoading || !clue}
                className="flex items-center gap-2 px-5 py-3 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-base transition-colors disabled:opacity-60 min-h-[48px] shadow-md"
              >
                {audioLoading ? <Loader2 className="w-5 h-5 animate-spin" />
                  : audioPlaying ? <Square className="w-5 h-5 fill-current" />
                  : <Volume2 className="w-5 h-5" />}
                <span>{audioPlaying ? "Stop" : "Hear It"}</span>
              </button>
            </div>

            {/* Letter boxes */}
            <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center mb-2" dir="ltr">
              {slots.map((s, slotIdx) => {
                if (!s.isLetter) {
                  // Render a small divider for spaces / hyphens / apostrophes.
                  return (
                    <div
                      key={slotIdx}
                      className="flex items-end justify-center w-4 sm:w-5 text-2xl sm:text-3xl font-extrabold text-muted-foreground select-none"
                      style={{ height: "3.5rem" }}
                    >
                      {s.ch === " " ? "\u00A0" : s.ch}
                    </div>
                  );
                }
                // Find this letter's index among letters[].
                const letterIdx = letterIdxs.indexOf(slotIdx);
                const value = letters[letterIdx] ?? "";
                const target = s.ch.toLowerCase();
                const revealed = phase === "revealed";
                const isMatch = revealed && value === target;
                return (
                  <input
                    key={slotIdx}
                    ref={(el) => { inputRefs.current[letterIdx] = el; }}
                    type="text"
                    inputMode="text"
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="none"
                    spellCheck={false}
                    maxLength={1}
                    aria-label={`Letter ${letterIdx + 1} of ${letterIdxs.length}`}
                    value={revealed ? target.toUpperCase() : value.toUpperCase()}
                    disabled={revealed}
                    onChange={(e) => setLetter(letterIdx, e.target.value)}
                    onKeyDown={(e) => onKeyDownLetter(letterIdx, e)}
                    onFocus={(e) => e.target.select()}
                    className={cn(
                      "w-9 h-14 sm:w-11 sm:h-16 text-center text-2xl sm:text-3xl font-extrabold uppercase rounded-xl border-2 bg-background transition-all",
                      "focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-500",
                      !revealed && "border-border",
                      revealed && isMatch && "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300",
                      revealed && !isMatch && "border-rose-400 bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-300",
                    )}
                  />
                );
              })}
            </div>

            {/* Reveal block */}
            {phase === "revealed" && reveal && (
              <div className="mt-6 text-center animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div
                  className={cn(
                    "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold mb-3",
                    reveal.correct
                      ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300"
                      : "bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300"
                  )}
                >
                  {reveal.correct
                    ? <><CheckCircle2 className="w-4 h-4" /> Correct!</>
                    : <><XCircle className="w-4 h-4" /> Time's up</>}
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-foreground mb-1">
                  {reveal.word}
                </div>
                <div
                  className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 font-cairo leading-snug"
                  dir="rtl"
                >
                  {card.arabic}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Action row — only after reveal */}
        {phase === "revealed" && card && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <Button
              onClick={nextRandomCard}
              className="rounded-full h-12 bg-emerald-500 hover:bg-emerald-600 text-white font-bold"
            >
              <ArrowRight className="w-4 h-4 mr-2" /> Next Word
            </Button>
            <Button
              onClick={addCurrentToWeak}
              variant="outline"
              disabled={savingWeak}
              className="rounded-full h-12 font-bold border-rose-300 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20"
            >
              {savingWeak ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Plus className="w-4 h-4 mr-2" />}
              Add to Weak Words
            </Button>
            <Button
              onClick={endSession}
              variant="outline"
              className="rounded-full h-12 font-bold"
            >
              <StopCircle className="w-4 h-4 mr-2" /> End Game
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
}
