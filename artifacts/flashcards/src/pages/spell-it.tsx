import { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "wouter";
import { customFetch, useAwardXp, useAddWeakWords } from "@workspace/api-client-react";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import {
  SpellCheck2, ArrowRight, ArrowLeft, Loader2, Volume2, Square,
  RefreshCw, StopCircle, Trophy, CheckCircle2, XCircle, Plus, Send,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Level = "A2" | "B1" | "B2" | "C1";
type Step = "setup" | "card" | "report";
// "ready"   — card on screen, timer NOT yet running; waiting for first audio play
// "playing" — timer running
// "revealed" — answer shown
type Phase = "ready" | "playing" | "revealed";

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
  example: string;
}

const TIME_OPTIONS = [5, 10, 15] as const;
type Seconds = typeof TIME_OPTIONS[number];

const API_BASE = (import.meta.env.VITE_API_URL as string | undefined) || "";

// ── Web Audio: shared AudioContext for TTS + sound effects ───────────────
// Using AudioContext (not HTMLAudioElement) for TTS playback because it
// guarantees zero-latency start: the MP3 is decoded into a PCM AudioBuffer
// once, then any number of plays start instantly with no codec/network delay.
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

// ── TTS audio buffer cache, keyed by word ────────────────────────────────
// AudioBuffers (decoded PCM) live in JS memory and are immediately playable.
// Bounded LRU so a long session can't OOM the tab.
const TTS_BUFFER_CACHE_MAX = 80;
const ttsBufferCache = new Map<string, AudioBuffer>();

function cachePut(key: string, buf: AudioBuffer) {
  if (ttsBufferCache.has(key)) ttsBufferCache.delete(key);
  ttsBufferCache.set(key, buf);
  while (ttsBufferCache.size > TTS_BUFFER_CACHE_MAX) {
    const oldestKey = ttsBufferCache.keys().next().value;
    if (oldestKey === undefined) break;
    ttsBufferCache.delete(oldestKey);
  }
}

// Fetch MP3 bytes from /speaking/tts and decode into a ready-to-play AudioBuffer.
// Always uses onyx voice. Cached by lower-cased word.
async function fetchAndDecodeTts(word: string, scriptText: string): Promise<AudioBuffer> {
  const key = word.toLowerCase();
  const cached = ttsBufferCache.get(key);
  if (cached) {
    // Refresh LRU position.
    ttsBufferCache.delete(key);
    ttsBufferCache.set(key, cached);
    return cached;
  }
  const ctx = getCtx();
  if (!ctx) throw new Error("audio_context_unavailable");

  const res = await fetch(`${API_BASE}/api/speaking/tts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: scriptText, voice: "onyx", model: "tts-1", speed: 1.0 }),
  });
  if (!res.ok) throw new Error("tts_failed");
  const arrayBuf = await res.arrayBuffer();
  // decodeAudioData returns a fully-decoded PCM buffer. Subsequent playback
  // via AudioBufferSourceNode starts on the next audio quantum (~3ms) — far
  // faster than HTMLAudioElement's variable preload/decode pipeline.
  const decoded: AudioBuffer = await new Promise((resolve, reject) => {
    // Some Safari versions only support the callback form, so use both APIs.
    try {
      const p = ctx.decodeAudioData(arrayBuf.slice(0), resolve, reject);
      if (p && typeof (p as Promise<AudioBuffer>).then === "function") {
        (p as Promise<AudioBuffer>).then(resolve, reject);
      }
    } catch (e) {
      reject(e);
    }
  });
  cachePut(key, decoded);
  return decoded;
}

// Play an AudioBuffer through the shared AudioContext. Returns the source so
// the caller can stop it early. onended fires both for natural completion and
// for explicit stop().
function playBuffer(buf: AudioBuffer, onEnded: () => void): AudioBufferSourceNode | null {
  const ctx = getCtx();
  if (!ctx) return null;
  const src = ctx.createBufferSource();
  src.buffer = buf;
  src.connect(ctx.destination);
  src.onended = onEnded;
  src.start(0);
  return src;
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
  const [phase, setPhase] = useState<Phase>("ready");
  const [remaining, setRemaining] = useState<number>(seconds);

  const [letters, setLetters] = useState<string[]>([]);
  const [reveal, setReveal] = useState<{ correct: boolean; word: string; reason: "correct" | "submit" | "timeout" } | null>(null);

  // True only while the *current* card's audio is still being preloaded
  // (clue + TTS roundtrip not yet complete). For the new pipeline this is
  // never expected to be true at click time — the first 5 cards are awaited
  // before the card screen renders, and subsequent cards are pulled off a
  // preloaded queue. We keep the flag as a defensive fallback.
  const [audioLoading, setAudioLoading] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);
  // Currently-playing AudioBufferSourceNode (Web Audio API). Stopping it is
  // synchronous and triggers `onended`, which kicks off the countdown.
  const sourceRef = useRef<AudioBufferSourceNode | null>(null);

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

  // ── Preload pipeline ─────────────────────────────────────────────
  // Up to 3 cards queued behind the current card (so total preloaded = 4).
  // First 5 are preloaded in parallel at session start.
  const upcomingRef = useRef<Flashcard[]>([]);
  // Per-card preload state. Audio is stored as a decoded AudioBuffer (PCM)
  // so playback starts on the next audio quantum (~3ms) with zero codec lag.
  type Preload = {
    state: "loading" | "ready" | "error";
    clue?: Clue;
    audioBuffer?: AudioBuffer;
    promise: Promise<void>;
  };
  const preloadsRef = useRef<Map<number, Preload>>(new Map());
  // True once the current card's audio has played at least once. Latches the timer.
  const audioPlayedRef = useRef<boolean>(false);

  // Force a re-render when a preload finishes so the Hear It button can swap
  // its spinner for the play icon without waiting for the next state change.
  const [, setPreloadTick] = useState(0);
  const bumpPreloadTick = useCallback(() => setPreloadTick((n) => n + 1), []);

  const { mutate: awardXp } = useAwardXp();
  const { mutate: addWeakWords } = useAddWeakWords();

  const clearTimers = useCallback(() => {
    if (tickTimerRef.current) { clearInterval(tickTimerRef.current); tickTimerRef.current = null; }
    if (revealTimerRef.current) { clearTimeout(revealTimerRef.current); revealTimerRef.current = null; }
  }, []);

  // Detach the onended handler then stop the source so a card-change doesn't
  // accidentally trigger the "first play finished" timer for a stale card.
  const stopCurrentAudio = useCallback(() => {
    const s = sourceRef.current;
    if (s) {
      s.onended = null;
      try { s.stop(); } catch {/* already stopped */}
      try { s.disconnect(); } catch {/* ignore */}
    }
    sourceRef.current = null;
    setAudioPlaying(false);
  }, []);

  useEffect(() => () => {
    clearTimers();
    stopCurrentAudio();
  }, [clearTimers, stopCurrentAudio]);

  const drawNextCard = useCallback((source: Flashcard[], seen: Set<number>): Flashcard | null => {
    const remainingPool = source.filter((c) => !seen.has(c.id));
    if (remainingPool.length === 0) return null;
    return remainingPool[Math.floor(Math.random() * remainingPool.length)];
  }, []);

  const slots = card ? buildSlots(card.english) : [];
  const letterIdxs = letterPositions(slots);

  // Build the TTS script for a word. Format is fixed: "{word} — as in, {example}".
  // Always this exact shape — never the verbose definition+hint form.
  function buildScript(word: string, c: Clue): string {
    return `${word}. As in, ${c.example.replace(/\.$/, "")}.`;
  }

  // Begin (or return existing) preload pipeline for a card. Idempotent.
  // Each preload: fetch clue → build TTS script → fetch+decode MP3 into PCM.
  const preloadCard = useCallback((target: Flashcard, lvl: Level): Preload => {
    const existing = preloadsRef.current.get(target.id);
    if (existing) return existing;

    const entry: Preload = { state: "loading", promise: Promise.resolve() };
    entry.promise = (async () => {
      // Step 1: clue + example sentence (with offline fallback).
      let theClue: Clue;
      try {
        theClue = await customFetch<Clue>("/api/spell-it/clue", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ word: target.english, level: lvl }),
        });
      } catch {
        const lettersOnly = target.english.split("").filter((ch) => /[a-z]/i.test(ch));
        theClue = {
          definition: `A ${target.category} word.`,
          hint: `It has ${lettersOnly.length} letters.`,
          example: `we use the word ${target.english} every day`,
        };
      }
      entry.clue = theClue;

      // Step 2: TTS — fetch MP3 bytes and decode into a ready-to-play PCM
      // AudioBuffer. After this resolves, playback start is essentially zero
      // latency (no codec init, no progressive download).
      try {
        const script = buildScript(target.english, theClue);
        const buf = await fetchAndDecodeTts(target.english, script);
        entry.audioBuffer = buf;
        entry.state = "ready";
      } catch {
        entry.state = "error";
      }
      bumpPreloadTick();
    })();

    preloadsRef.current.set(target.id, entry);
    return entry;
  }, [bumpPreloadTick]);

  // Reveal the answer (correct or timed-out) and stop everything.
  // Defined here (above beginCountdown) so it can be a clean dep.
  const revealAnswerImpl = useCallback((correct: boolean, currentCard: Flashcard, reason: "correct" | "submit" | "timeout" = correct ? "correct" : "timeout") => {
    clearTimers();
    stopCurrentAudio();
    setPhase("revealed");
    setReveal({ correct, word: currentCard.english, reason });
    setWordsAttempted((n) => n + 1);
    if (correct) {
      setWordsCorrect((n) => n + 1);
      playCorrect();
    } else {
      playWrong();
    }
    customFetch("/api/flashcards/progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ flashcardId: currentCard.id, known: correct }),
    }).catch(() => {});
  }, [clearTimers, stopCurrentAudio]);

  // Begin the per-word countdown. Idempotent for a given card sequence.
  const beginCountdown = useCallback((forCard: Flashcard, forSeq: number) => {
    if (cardSeqRef.current !== forSeq) return;       // stale card
    if (tickTimerRef.current) return;                // already running
    setPhase("playing");
    let r = seconds;
    setRemaining(r);
    playTick();
    tickTimerRef.current = setInterval(() => {
      r -= 1;
      setRemaining(r);
      if (r > 0) playTick();
      if (r <= 0 && tickTimerRef.current) {
        clearInterval(tickTimerRef.current);
        tickTimerRef.current = null;
      }
    }, 1000);
    revealTimerRef.current = setTimeout(() => {
      const currentLetters = inputRefs.current.map((el) => (el?.value ?? "").toLowerCase());
      const target = forCard.english.split("").filter((ch) => /[a-z]/i.test(ch)).map((c) => c.toLowerCase());
      const isCorrect = currentLetters.length === target.length && currentLetters.every((l, i) => l === target[i]);
      revealAnswerImpl(isCorrect, forCard);
    }, seconds * 1000);
  }, [seconds, revealAnswerImpl]);

  function playClue() {
    if (!card) return;
    // Toggle: clicking while playing stops playback (which triggers onended,
    // which starts the countdown if this was the first play).
    if (audioPlaying) {
      stopCurrentAudio();
      // stopCurrentAudio cleared the onended handler, so manually advance
      // the "first play finished" latch + start the timer if needed.
      const seq = cardSeqRef.current;
      if (!audioPlayedRef.current) {
        audioPlayedRef.current = true;
        beginCountdown(card, seq);
      }
      return;
    }

    const seq = cardSeqRef.current;
    let entry = preloadsRef.current.get(card.id) ?? preloadCard(card, level);
    // If a previous attempt failed, evict it and try again immediately so
    // the next click can succeed.
    if (entry.state === "error") {
      preloadsRef.current.delete(card.id);
      entry = preloadCard(card, level);
    }

    // Happy path: AudioBuffer is ready. Play instantly via Web Audio.
    if (entry.state === "ready" && entry.audioBuffer) {
      setClue(entry.clue ?? null);
      // Stop any leftover source first.
      stopCurrentAudio();
      const src = playBuffer(entry.audioBuffer, () => {
        // onended fires for both natural completion and explicit stop().
        if (sourceRef.current === src) sourceRef.current = null;
        setAudioPlaying(false);
        if (!audioPlayedRef.current && cardSeqRef.current === seq && card) {
          audioPlayedRef.current = true;
          beginCountdown(card, seq);
        }
      });
      if (src) {
        sourceRef.current = src;
        setAudioPlaying(true);
      } else if (!audioPlayedRef.current) {
        // AudioContext unavailable (rare — usually after a tab suspend). Don't
        // strand the student in a no-timer ready state; arm the countdown and
        // let them spell from memory.
        audioPlayedRef.current = true;
        beginCountdown(card, seq);
      }
      return;
    }

    // Slow / fallback path: preload not finished yet (shouldn't happen for
    // first 5 cards, but possible if the student is racing the queue).
    setAudioLoading(true);
    entry.promise.finally(() => {
      setAudioLoading(false);
      // The user could have advanced cards while we waited.
      if (cardSeqRef.current !== seq) return;
      const e = preloadsRef.current.get(card.id);
      if (e?.state === "ready" && e.audioBuffer) {
        // Re-enter to actually play. Safe because audioPlaying is still false.
        playClue();
      } else if (!audioPlayedRef.current) {
        // Audio decode failed — start the timer anyway so the student isn't stuck.
        audioPlayedRef.current = true;
        beginCountdown(card, seq);
      }
    });
  }

  // Show a card. Does NOT start the countdown — that begins after the
  // student has played the audio at least once. Also kicks preloads for
  // the queued upcoming cards so they're ready by the time we get there.
  const startCard = useCallback((nextCard: Flashcard) => {
    clearTimers();
    stopCurrentAudio();
    cardSeqRef.current += 1;
    const seq = cardSeqRef.current;
    audioPlayedRef.current = false;          // re-arm "play once before timer"
    setCard(nextCard);
    setReveal(null);
    setPhase("ready");
    setRemaining(seconds);                   // displayed but not counting down
    const lettersOnly = nextCard.english.split("").filter((ch) => /[a-z]/i.test(ch));
    setLetters(new Array(lettersOnly.length).fill(""));

    // Show the cached clue immediately if we already have it (so the student
    // sees the right text before pressing Hear It). Otherwise wait for preload.
    const entry = preloadsRef.current.get(nextCard.id) ?? preloadCard(nextCard, level);
    setClue(entry.clue ?? null);
    if (!entry.clue) {
      entry.promise.then(() => {
        // Use the sequence ref (captured at startCard time) instead of `card`
        // state — the latter is captured from the previous render and would be
        // stale by the time this callback fires.
        if (cardSeqRef.current !== seq) return;
        const e = preloadsRef.current.get(nextCard.id);
        if (e?.clue) setClue(e.clue);
      });
    }

    // Keep the queue warm: the next 3 upcoming cards should all be preloading
    // (or already loaded) so audio is instant when the student advances.
    for (const upc of upcomingRef.current) {
      preloadCard(upc, level);
    }

    // Focus the first letter box on next paint.
    setTimeout(() => { inputRefs.current[0]?.focus(); }, 50);
  }, [seconds, clearTimers, stopCurrentAudio, level, preloadCard]);

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

      // Reset session-scoped state.
      preloadsRef.current.clear();
      upcomingRef.current = [];
      audioPlayedRef.current = false;
      setWordsAttempted(0);
      setWordsCorrect(0);
      setWeakAdded(0);

      // Pick the first 5 unique words and start preloading ALL of them in
      // parallel before the student even sees the card screen. This guarantees
      // the first ~5 taps of "Hear It" are zero-latency.
      const seen = new Set<number>();
      const initial: Flashcard[] = [];
      for (const c of shuffled) {
        if (seen.has(c.id)) continue;
        initial.push(c);
        seen.add(c.id);
        if (initial.length >= 5) break;
      }
      if (initial.length === 0) { setErr("No words to show."); return; }
      setSeenIds(seen);

      // Warm up audio context on user gesture (must come before any TTS decode).
      getCtx();

      // Kick off all 5 preloads simultaneously. The card screen does NOT
      // appear until every one of them is ready (or hits a 10s safety cap),
      // so first-play audio is guaranteed instant.
      const firstCard = initial[0];
      upcomingRef.current = initial.slice(1);
      const allPreloads = initial.map((c) => preloadCard(c, level).promise);

      await Promise.race([
        Promise.allSettled(allPreloads),
        new Promise((r) => setTimeout(r, 10000)),
      ]);

      setStep("card");
      setTimeout(() => startCard(firstCard), 30);
    } catch {
      setErr("Could not load words. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function nextRandomCard() {
    // Pull the next preloaded card off the queue front. Then top the queue up
    // so the next 3 cards behind the new current one are always preloaded.
    const next = upcomingRef.current.shift();
    if (!next) {
      endSession();
      return;
    }

    const seen = new Set(seenIds);
    if (card) seen.add(card.id);
    seen.add(next.id);
    for (const upc of upcomingRef.current) seen.add(upc.id);
    while (upcomingRef.current.length < 3) {
      const fresh = drawNextCard(pool, seen);
      if (!fresh) break;
      upcomingRef.current.push(fresh);
      seen.add(fresh.id);
      preloadCard(fresh, level);
    }
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
    stopCurrentAudio();
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
    // No auto-submit: even when every box is filled, the student must press
    // Submit (or wait for the timer) before the answer is revealed.
  }

  // Explicit Submit. Reveals regardless of whether the answer is complete or
  // correct — used by the Submit button which appears after the first letter
  // and by the Enter keyboard shortcut. The student must always trigger this
  // explicitly; the answer is never revealed automatically when the last letter
  // box is filled.
  function submitAnswer() {
    if (!card || phase !== "playing") return;
    const currentLetters = inputRefs.current.map((el) => (el?.value ?? "").toLowerCase());
    const target = card.english.split("").filter((ch) => /[a-z]/i.test(ch)).map((c) => c.toLowerCase());
    const filled = currentLetters.length === target.length && currentLetters.every((c) => c.length === 1);
    const isCorrect = filled && currentLetters.every((l, i) => l === target[i]);
    revealAnswerImpl(isCorrect, card, isCorrect ? "correct" : "submit");
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
      submitAnswer();
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
  const isReady = phase === "ready";
  const isRevealed = phase === "revealed";
  const lowSeconds = isPlaying && remaining > 0 && remaining <= 3;
  const numberColor = lowSeconds
    ? "text-red-500"
    : isReady
    ? "text-muted-foreground/50"
    : "text-emerald-500";

  // Hear It button state. The audio is "ready" once preload finished. We
  // only show a spinner when (a) the user clicked Hear It while the preload
  // was still in flight, OR (b) the very first card hasn't preloaded yet
  // (the very common "first time on the screen" case). Errors are NOT shown
  // as a spinner — clicking will retry the preload.
  const currentPreload = card ? preloadsRef.current.get(card.id) : undefined;
  const audioReady = currentPreload?.state === "ready";
  const audioErrored = currentPreload?.state === "error";
  const hearItDisabled = isRevealed; // never disabled in ready/playing — user must be able to play to start
  const showSpinner = audioLoading || (isReady && !audioReady && !audioErrored && !audioPlaying);

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

        {/* Countdown indicator — visible in both ready (dimmed) and playing phases. */}
        {(isPlaying || isReady) && (
          <div className="text-center mb-4">
            <div
              key={isPlaying ? remaining : "ready"}
              className={cn(
                "inline-block text-6xl sm:text-7xl font-extrabold tabular-nums transition-colors",
                numberColor,
                lowSeconds && "animate-in zoom-in-50 duration-150"
              )}
            >
              {remaining}
            </div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">
              {isReady ? "Press Hear It to start" : lowSeconds ? "Hurry…" : "Spell the word"}
            </div>
          </div>
        )}

        {/* Card */}
        {card && (
          <div className="bg-card border-2 border-border rounded-3xl shadow-lg p-6 sm:p-8">
            {/* Hear It button. Always clickable while a card is on screen so the
                student can both START the timer (first play) and replay the audio.
                Spinner only shows if preload hasn't finished — never blocks the
                timer because the timer doesn't run until first audio plays. */}
            <div className="flex justify-center mb-6">
              <button
                type="button"
                onClick={playClue}
                disabled={hearItDisabled}
                className={cn(
                  "flex items-center gap-2 px-5 py-3 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-base transition-colors disabled:opacity-60 min-h-[48px] shadow-md",
                  isReady && !audioPlaying && "ring-2 ring-emerald-300 ring-offset-2 ring-offset-background animate-pulse"
                )}
              >
                {showSpinner ? <Loader2 className="w-5 h-5 animate-spin" />
                  : audioPlaying ? <Square className="w-5 h-5 fill-current" />
                  : <Volume2 className="w-5 h-5" />}
                <span>{showSpinner ? "Loading…" : audioPlaying ? "Stop" : "Hear It"}</span>
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
                    disabled={revealed || isReady}
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

            {/* Submit button — appears once at least one letter has been typed
                during the playing phase. Reveals the correct answer (with a
                fade-in red overlay if the answer is wrong/incomplete). */}
            {phase === "playing" && letters.some((l) => l && l.length > 0) && (
              <div className="flex justify-center mt-4 animate-in fade-in zoom-in-95 duration-200">
                <Button
                  onClick={submitAnswer}
                  className="rounded-full h-11 px-6 bg-emerald-500 hover:bg-emerald-600 text-white font-bold"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Submit
                </Button>
              </div>
            )}

            {/* Reveal block — fade-in for correct, time's-up, and submit-wrong. */}
            {phase === "revealed" && reveal && (
              <div className="mt-6 text-center animate-in fade-in slide-in-from-bottom-2 duration-500">
                <div
                  className={cn(
                    "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold mb-3 transition-all",
                    reveal.correct
                      ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300"
                      : "bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300"
                  )}
                >
                  {reveal.correct
                    ? <><CheckCircle2 className="w-4 h-4" /> Correct!</>
                    : reveal.reason === "submit"
                      ? <><XCircle className="w-4 h-4" /> Not quite</>
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
