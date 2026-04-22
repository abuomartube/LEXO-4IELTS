import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { Layout } from "@/components/layout";
import {
  BookOpen, ChevronLeft, EyeOff, Eye, Loader2, BookMarked,
  Play, Pause, Square, Volume2, Mic, CheckCircle2, Highlighter,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { customFetch } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";

interface Story {
  id: number;
  title: string;
  titleArabic: string;
  content: string;
  contentArabic: string;
  level: string;
  orderIndex: number;
}

const LEVELS = ["All", "A2", "B1", "B2", "C1"] as const;
type LevelFilter = typeof LEVELS[number];

const levelColors: Record<string, string> = {
  A2: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  B1: "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300",
  B2: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
  C1: "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300",
};

const levelBorder: Record<string, string> = {
  A2: "border-blue-200 dark:border-blue-800",
  B1: "border-orange-200 dark:border-orange-800",
  B2: "border-purple-200 dark:border-purple-800",
  C1: "border-rose-200 dark:border-rose-800",
};

// Split story text into [firstChunk, remainder] at a sentence boundary.
// firstChunk is kept short so TTS generates it in ~2 seconds.
function splitContent(text: string): [string, string] {
  const MAX = 350;
  if (text.length <= MAX) return [text, ""];
  for (let i = MAX; i >= 80; i--) {
    if (text[i] === "." || text[i] === "!" || text[i] === "?") {
      return [text.slice(0, i + 1).trim(), text.slice(i + 1).trim()];
    }
  }
  // fallback: split at a space
  for (let i = MAX; i >= 80; i--) {
    if (text[i] === " ") return [text.slice(0, i).trim(), text.slice(i).trim()];
  }
  return [text.slice(0, MAX), text.slice(MAX)];
}

const SPEEDS = [
  { label: "Slow", value: 0.75 },
  { label: "Normal", value: 1.0 },
  { label: "Fast", value: 1.5 },
] as const;

type SpeedValue = 0.75 | 1.0 | 1.5;

function LevelBadge({ level }: { level: string }) {
  return (
    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${levelColors[level] ?? "bg-muted text-muted-foreground"}`}>
      {level}
    </span>
  );
}

type PlayerState = "idle" | "loading" | "playing" | "paused";

// ── Word-by-word highlighted reader ───────────────────────────────────────
// Uses Web Speech API SpeechSynthesisUtterance with onboundary for
// frame-perfect word timing, with a char-proportional timer fallback for
// browsers that don't fire boundary events reliably (Safari, some mobile).

type WordToken = { text: string; isWord: boolean; start: number; end: number; wordIndex: number };

function tokenizeForHighlight(text: string): { tokens: WordToken[]; wordSpans: Array<{ start: number; end: number; idx: number }>; wordCount: number } {
  const tokens: WordToken[] = [];
  const wordSpans: Array<{ start: number; end: number; idx: number }> = [];
  const re = /\S+|\s+/g;
  let m: RegExpExecArray | null;
  let wIdx = 0;
  while ((m = re.exec(text)) !== null) {
    const isWord = !/^\s+$/.test(m[0]);
    const tok: WordToken = {
      text: m[0],
      isWord,
      start: m.index,
      end: m.index + m[0].length,
      wordIndex: isWord ? wIdx : -1,
    };
    tokens.push(tok);
    if (isWord) {
      wordSpans.push({ start: tok.start, end: tok.end, idx: wIdx });
      wIdx++;
    }
  }
  return { tokens, wordSpans, wordCount: wIdx };
}

const HIGHLIGHT_SPEEDS = [
  { label: "0.75×", value: 0.75 },
  { label: "1×", value: 1.0 },
  { label: "1.25×", value: 1.25 },
] as const;

function pickEnglishVoice(): SpeechSynthesisVoice | null {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return null;
  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) return null;
  const enGB = voices.find(v => /en[-_]GB/i.test(v.lang));
  if (enGB) return enGB;
  const enAny = voices.find(v => /^en/i.test(v.lang));
  return enAny ?? null;
}

function HighlightedReader({ content }: { content: string }) {
  const { tokens, wordSpans, wordCount } = useMemo(() => tokenizeForHighlight(content), [content]);

  const [rate, setRate] = useState(1.0);
  const [state, setState] = useState<"idle" | "playing" | "paused">("idle");
  const [highlightIdx, setHighlightIdx] = useState(-1);
  const [error, setError] = useState<string | null>(null);
  const [voiceReady, setVoiceReady] = useState(false);

  const supported = typeof window !== "undefined" && "speechSynthesis" in window;

  // Refs for live values (avoid stale closures)
  const rateRef = useRef(rate);
  const utterRef = useRef<SpeechSynthesisUtterance | null>(null);
  const voiceRef = useRef<SpeechSynthesisVoice | null>(null);
  const wordIdxRef = useRef(-1);
  const fallbackRafRef = useRef<number | null>(null);
  const fallbackActiveRef = useRef(false);
  const fallbackArmTimerRef = useRef<number | null>(null);
  const boundaryFiredRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => { rateRef.current = rate; }, [rate]);

  // Voices load asynchronously on most browsers
  useEffect(() => {
    if (!supported) return;
    const sync = () => {
      voiceRef.current = pickEnglishVoice();
      setVoiceReady(true);
    };
    sync();
    window.speechSynthesis.addEventListener("voiceschanged", sync);
    return () => window.speechSynthesis.removeEventListener("voiceschanged", sync);
  }, [supported]);

  const cancelFallback = useCallback(() => {
    if (fallbackRafRef.current !== null) {
      cancelAnimationFrame(fallbackRafRef.current);
      fallbackRafRef.current = null;
    }
    if (fallbackArmTimerRef.current !== null) {
      window.clearTimeout(fallbackArmTimerRef.current);
      fallbackArmTimerRef.current = null;
    }
    fallbackActiveRef.current = false;
  }, []);

  const stopAll = useCallback(() => {
    cancelFallback();
    if (supported) window.speechSynthesis.cancel();
    utterRef.current = null;
    wordIdxRef.current = -1;
    setHighlightIdx(-1);
    setState("idle");
  }, [supported, cancelFallback]);

  // Cleanup on unmount or content change
  useEffect(() => () => { stopAll(); }, [stopAll]);
  useEffect(() => { stopAll(); }, [content, stopAll]);

  // Auto-scroll the highlighted word into view (nearest, no jump)
  useEffect(() => {
    if (highlightIdx < 0) return;
    const el = containerRef.current?.querySelector<HTMLSpanElement>(`[data-w-idx="${highlightIdx}"]`);
    if (el) el.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [highlightIdx]);

  // Char-proportional fallback: schedule each word based on its char weight
  // and the elapsed time, using rAF so we never drift.
  const startFallback = useCallback((startWordIdx: number) => {
    if (startWordIdx >= wordCount) return;
    fallbackActiveRef.current = true;
    const totalCharsRemaining = wordSpans
      .slice(startWordIdx)
      .reduce((s, w) => s + (w.end - w.start) + 1, 0);
    // Empirically ~14 chars/sec at rate 1.0 for English speech synthesis
    const charsPerSec = 14 * rateRef.current;
    const totalDuration = totalCharsRemaining / charsPerSec; // seconds
    // Build cumulative timeline: word i finishes at this cumulative time
    const timeline: number[] = [];
    let acc = 0;
    for (let i = startWordIdx; i < wordCount; i++) {
      const w = wordSpans[i];
      const dur = ((w.end - w.start) + 1) / totalCharsRemaining * totalDuration;
      acc += dur;
      timeline.push(acc);
    }
    const startTs = performance.now();
    const tick = () => {
      if (!fallbackActiveRef.current) return;
      // Don't advance highlight while synthesis is paused
      if (window.speechSynthesis.paused) {
        fallbackRafRef.current = requestAnimationFrame(tick);
        return;
      }
      const elapsed = (performance.now() - startTs) / 1000;
      // Find first word whose cumulative end-time is >= elapsed
      let target = startWordIdx;
      for (let i = 0; i < timeline.length; i++) {
        if (timeline[i] >= elapsed) { target = startWordIdx + i; break; }
        target = startWordIdx + i;
      }
      if (target !== wordIdxRef.current) {
        wordIdxRef.current = target;
        setHighlightIdx(target);
      }
      if (elapsed < timeline[timeline.length - 1]) {
        fallbackRafRef.current = requestAnimationFrame(tick);
      }
    };
    fallbackRafRef.current = requestAnimationFrame(tick);
  }, [wordCount, wordSpans]);

  const playFromWord = useCallback((startWordIdx: number, useRate: number) => {
    if (!supported) { setError("This browser does not support speech synthesis."); return; }
    cancelFallback();
    window.speechSynthesis.cancel();

    const safeStart = Math.max(0, Math.min(startWordIdx, wordCount - 1));
    const startChar = wordCount === 0 ? 0 : (wordSpans[safeStart]?.start ?? 0);
    const text = content.slice(startChar);
    if (!text.trim()) { stopAll(); return; }

    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = useRate;
    utter.pitch = 1;
    utter.lang = "en-GB";
    if (voiceRef.current) utter.voice = voiceRef.current;
    utterRef.current = utter;
    boundaryFiredRef.current = false;

    utter.onstart = () => {
      if (utterRef.current !== utter) return;
      setState("playing");
      // Activate fallback if no boundary event fires within 1.2s.
      // Tracked so pause/stop can cancel before it fires.
      if (fallbackArmTimerRef.current !== null) window.clearTimeout(fallbackArmTimerRef.current);
      fallbackArmTimerRef.current = window.setTimeout(() => {
        fallbackArmTimerRef.current = null;
        // Gate on: still the active utterance, no real boundary yet, AND
        // synthesis isn't paused (don't progress highlight while paused).
        if (
          utterRef.current === utter &&
          !boundaryFiredRef.current &&
          !window.speechSynthesis.paused
        ) {
          startFallback(safeStart);
        }
      }, 1200);
    };

    utter.onboundary = (ev) => {
      if (utterRef.current !== utter) return;
      // Some engines send "sentence" boundaries; we only care about words
      if (ev.name && ev.name !== "word") return;
      boundaryFiredRef.current = true;
      // Boundary won — kill any fallback timer
      if (fallbackActiveRef.current) cancelFallback();

      const absChar = startChar + ev.charIndex;
      // Binary search for word containing absChar
      let lo = 0, hi = wordSpans.length - 1, found = -1;
      while (lo <= hi) {
        const mid = (lo + hi) >> 1;
        const w = wordSpans[mid];
        if (absChar < w.start) hi = mid - 1;
        else if (absChar >= w.end) lo = mid + 1;
        else { found = w.idx; break; }
      }
      if (found < 0) {
        // charIndex landed on whitespace — pick the next word
        for (let i = 0; i < wordSpans.length; i++) {
          if (wordSpans[i].start >= absChar) { found = wordSpans[i].idx; break; }
        }
      }
      if (found >= 0 && found !== wordIdxRef.current) {
        wordIdxRef.current = found;
        setHighlightIdx(found);
      }
    };

    utter.onend = () => {
      if (utterRef.current !== utter) return;
      cancelFallback();
      utterRef.current = null;
      wordIdxRef.current = -1;
      setHighlightIdx(-1);
      setState("idle");
    };

    utter.onerror = (ev) => {
      // canceled/interrupted are normal when restarting/stopping
      const err = (ev as SpeechSynthesisErrorEvent).error;
      if (err === "canceled" || err === "interrupted") return;
      cancelFallback();
      setError("Speech failed. Try again.");
      setState("idle");
    };

    window.speechSynthesis.speak(utter);
  }, [supported, content, wordCount, wordSpans, cancelFallback, startFallback, stopAll]);

  const handlePlay = () => {
    setError(null);
    if (state === "paused") {
      window.speechSynthesis.resume();
      setState("playing");
      // Restart fallback loop from current word if it was active
      if (fallbackActiveRef.current === false && !boundaryFiredRef.current && wordIdxRef.current >= 0) {
        startFallback(wordIdxRef.current);
      }
      return;
    }
    const from = wordIdxRef.current >= 0 ? wordIdxRef.current : 0;
    playFromWord(from, rateRef.current);
  };

  const handlePause = () => {
    if (state !== "playing") return;
    window.speechSynthesis.pause();
    cancelFallback();
    setState("paused");
  };

  const handleStop = () => {
    setError(null);
    stopAll();
  };

  const handleRateChange = (newRate: number) => {
    setRate(newRate);
    rateRef.current = newRate;
    if (state === "playing" || state === "paused") {
      const from = wordIdxRef.current >= 0 ? wordIdxRef.current : 0;
      // Cancel current speech and restart at new rate from current word
      // (browsers don't support changing rate mid-utterance)
      playFromWord(from, newRate);
    }
  };

  if (!supported) {
    // Graceful: just render plain text
    return (
      <div className="text-base leading-[2] text-foreground whitespace-pre-wrap" lang="en">
        {content}
      </div>
    );
  }

  return (
    <div>
      {/* Compact controls */}
      <div className="mb-4 rounded-xl border border-border bg-muted/40 p-2.5 flex items-center gap-2 flex-wrap">
        <div className="flex items-center gap-1.5 shrink-0 mr-1">
          <Highlighter className="w-3.5 h-3.5 text-amber-500" />
          <span className="text-xs font-bold text-foreground">Highlight Reader</span>
        </div>

        {state === "playing" ? (
          <button
            onClick={handlePause}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-colors"
          >
            <Pause className="w-3 h-3" /> Pause
          </button>
        ) : (
          <button
            onClick={handlePlay}
            disabled={!voiceReady && !window.speechSynthesis.getVoices().length}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            <Play className="w-3 h-3" /> {state === "paused" ? "Resume" : "Play"}
          </button>
        )}

        {(state === "playing" || state === "paused") && (
          <button
            onClick={handleStop}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg border border-border text-muted-foreground text-xs font-semibold hover:bg-accent hover:text-foreground transition-colors"
          >
            <Square className="w-3 h-3" /> Stop
          </button>
        )}

        <div className="flex items-center gap-1 ml-auto">
          <Volume2 className="w-3 h-3 text-muted-foreground" />
          {HIGHLIGHT_SPEEDS.map(s => (
            <button
              key={s.label}
              onClick={() => handleRateChange(s.value)}
              className={cn(
                "px-2 py-0.5 rounded-md text-[11px] font-semibold transition-colors",
                rate === s.value
                  ? "bg-amber-500 text-white"
                  : "bg-background border border-border text-muted-foreground hover:text-foreground",
              )}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {error && <p className="mb-2 text-xs text-destructive font-medium">{error}</p>}

      {/* Tokenized text */}
      <div
        ref={containerRef}
        className="text-base leading-[2] text-foreground whitespace-pre-wrap"
        lang="en"
      >
        {tokens.map((t, i) =>
          t.isWord ? (
            <span
              key={i}
              data-w-idx={t.wordIndex}
              className={cn(
                "rounded px-0.5 -mx-0.5 transition-colors ease-out",
                highlightIdx === t.wordIndex && "shadow-sm",
              )}
              style={{
                transitionDuration: "50ms",
                backgroundColor: highlightIdx === t.wordIndex ? "rgba(253, 224, 71, 0.55)" : "transparent",
              }}
            >
              {t.text}
            </span>
          ) : (
            <span key={i}>{t.text}</span>
          ),
        )}
      </div>
    </div>
  );
}

function VoiceReader({ content }: { content: string }) {
  const [speed, setSpeed] = useState<SpeedValue>(1.0);
  const [playerState, setPlayerState] = useState<PlayerState>("idle");
  const [error, setError] = useState<string | null>(null);

  // Web Audio API refs
  const audioCtxRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<AudioBufferSourceNode | null>(null);

  // Per-speed audio cache — avoids re-fetching when switching back to a speed
  const audioCacheRef = useRef<Map<SpeedValue, AudioBuffer>>(new Map());

  // Position tracking — needed to resume from same spot after a speed change
  const sourceStartCtxTimeRef = useRef(0);   // ctx.currentTime when source.start() was called
  const sourceStartOffsetRef = useRef(0);    // buffer offset used in source.start()
  const fetchedSpeedRef = useRef<SpeedValue>(1.0); // OpenAI speed the current buffer was fetched at
  // Content-time (at 1.0×) before the currently-playing chunk — for multi-chunk position maths
  const chunkContentOffsetRef = useRef(0);

  // Generation counter to discard stale responses
  const genRef = useRef(0);

  // Clear cache whenever the story content changes
  useEffect(() => {
    audioCacheRef.current = new Map();
  }, [content]);

  // Stop the source node only (keep AudioContext open for speed-change continuity)
  const stopSource = useCallback(() => {
    if (sourceRef.current) {
      try { sourceRef.current.stop(); } catch { /* already stopped */ }
      sourceRef.current.disconnect();
      sourceRef.current = null;
    }
  }, []);

  // Full stop — also closes and discards the AudioContext
  const stopPlayback = useCallback(() => {
    stopSource();
    if (audioCtxRef.current) {
      audioCtxRef.current.close().catch(() => {});
      audioCtxRef.current = null;
    }
  }, [stopSource]);

  useEffect(() => {
    return () => stopPlayback();
  }, [stopPlayback]);

  // Wire up a buffer to the context and start playback from `offset` seconds.
  // `afterEnded` fires when the source finishes naturally (not when stopped manually).
  const startSource = useCallback((
    buffer: AudioBuffer,
    ctx: AudioContext,
    offset = 0,
    afterEnded?: () => void,
  ) => {
    stopSource();
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.playbackRate.value = 1.0; // pitch preserved — speed comes from OpenAI
    source.connect(ctx.destination);
    source.onended = () => {
      if (sourceRef.current === source) {
        sourceRef.current = null;
        afterEnded ? afterEnded() : setPlayerState("idle");
      }
    };
    source.start(0, offset);
    sourceRef.current = source;
    sourceStartCtxTimeRef.current = ctx.currentTime;
    sourceStartOffsetRef.current = offset;
  }, [stopSource]);

  // Fetch (or serve from cache) at a given OpenAI speed then start playing
  // from `offset` seconds into that buffer.  Uses the existing `ctx`.
  const fetchAndPlay = useCallback(async (
    targetSpeed: SpeedValue,
    offset: number,
    ctx: AudioContext,
    myGen: number,
  ) => {
    let buffer = audioCacheRef.current.get(targetSpeed) ?? null;

    if (!buffer) {
      const res = await fetch("/api/speaking/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: content, speed: targetSpeed, model: "tts-1" }),
      });

      if (genRef.current !== myGen) return;

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error((errData as { error?: string }).error ?? "tts_failed");
      }

      const ab = await res.arrayBuffer();
      if (genRef.current !== myGen) return;

      buffer = await ctx.decodeAudioData(ab);
      if (genRef.current !== myGen) return;

      audioCacheRef.current.set(targetSpeed, buffer);
    }

    // Chrome auto-suspends idle AudioContext after long fetches
    if (ctx.state === "suspended") await ctx.resume();
    if (genRef.current !== myGen) return;

    // Clamp offset to valid range
    const safeOffset = Math.max(0, Math.min(offset, buffer.duration - 0.1));
    fetchedSpeedRef.current = targetSpeed;
    startSource(buffer, ctx, safeOffset);
    setPlayerState("playing");
  }, [content, startSource]);

  // Raw fetch helper — fetches TTS audio and decodes it, no cache interaction
  const fetchBuffer = useCallback(async (
    text: string,
    spd: SpeedValue,
    ctx: AudioContext,
    myGen: number,
  ): Promise<AudioBuffer | null> => {
    const res = await fetch("/api/speaking/tts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, speed: spd, model: "tts-1" }),
    });
    if (genRef.current !== myGen) return null;
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error((errData as { error?: string }).error ?? "tts_failed");
    }
    const ab = await res.arrayBuffer();
    if (genRef.current !== myGen) return null;
    if (ctx.state === "closed") return null;
    return ctx.decodeAudioData(ab);
  }, []);

  // Silently pre-fetch the other two speeds (full text) so speed switches are instant
  const prefetchOtherSpeeds = useCallback((playingSpeed: SpeedValue, ctx: AudioContext) => {
    const others = (SPEEDS.map(s => s.value) as SpeedValue[]).filter(s => s !== playingSpeed);
    others.forEach(async (s) => {
      if (audioCacheRef.current.has(s)) return;
      try {
        const res = await fetch("/api/speaking/tts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: content, speed: s, model: "tts-1" }),
        });
        if (!res.ok) return;
        const ab = await res.arrayBuffer();
        if (ctx.state === "closed") return;
        const buf = await ctx.decodeAudioData(ab);
        audioCacheRef.current.set(s, buf);
      } catch { /* silent */ }
    });
  }, [content]);

  const handlePlay = async () => {
    setError(null);

    // Resume from pause
    if (playerState === "paused" && audioCtxRef.current) {
      await audioCtxRef.current.resume();
      setPlayerState("playing");
      return;
    }

    stopPlayback();

    // Create AudioContext NOW (during user-gesture) — no expiry risk
    const ctx = new AudioContext();
    audioCtxRef.current = ctx;
    const myGen = ++genRef.current;
    fetchedSpeedRef.current = speed;
    chunkContentOffsetRef.current = 0;

    setPlayerState("loading");

    try {
      // ── Split story and fetch both chunks in parallel ──────────────────
      // chunk1 (~350 chars) generates in ~2s — user hears audio quickly.
      // chunk2 (rest) is fetched at the same time in the background.
      const [chunk1Text, chunk2Text] = splitContent(content);

      const chunk1Promise = fetchBuffer(chunk1Text, speed, ctx, myGen);
      // Start fetching chunk2 immediately in parallel (don't await chunk1 first)
      const chunk2Promise = chunk2Text
        ? fetchBuffer(chunk2Text, speed, ctx, myGen)
        : Promise.resolve(null);

      // Wait for chunk1 and start playing
      const buffer1 = await chunk1Promise;
      if (!buffer1 || genRef.current !== myGen) return;

      if (ctx.state === "suspended") await ctx.resume();
      if (genRef.current !== myGen) return;

      // Mutable box so the afterEnded closure and the chunk2 await can share state
      let chunk2Buffer: AudioBuffer | null = null;
      let chunk2Pending = false; // chunk1 ended before chunk2 was ready

      const chunk1ContentDuration = buffer1.duration * speed; // in 1.0× seconds

      startSource(buffer1, ctx, 0, () => {
        // chunk1 finished naturally
        if (genRef.current !== myGen) return;
        if (chunk2Buffer) {
          chunkContentOffsetRef.current = chunk1ContentDuration;
          startSource(chunk2Buffer, ctx, 0);
          setPlayerState("playing");
        } else if (chunk2Text) {
          chunk2Pending = true;
          setPlayerState("loading"); // brief gap while chunk2 finishes
        } else {
          setPlayerState("idle");
        }
      });
      setPlayerState("playing");

      // Pre-fetch other speeds (full text) in background for instant speed switching
      prefetchOtherSpeeds(speed, ctx);

      // Wait for chunk2 (already fetching in parallel)
      if (chunk2Text) {
        const buffer2 = await chunk2Promise;
        if (genRef.current !== myGen) return;
        if (buffer2) {
          chunk2Buffer = buffer2;
          if (chunk2Pending) {
            // chunk1 already ended — start chunk2 now
            chunk2Pending = false;
            if (ctx.state === "suspended") await ctx.resume();
            if (genRef.current !== myGen) return;
            chunkContentOffsetRef.current = chunk1ContentDuration;
            startSource(buffer2, ctx, 0);
            setPlayerState("playing");
          }
          // else: chunk2Buffer is set and afterEnded will use it when chunk1 ends
        }
      }

    } catch (err: unknown) {
      if (genRef.current !== myGen) return;
      stopPlayback();
      setPlayerState("idle");
      const msg = err instanceof Error ? err.message : "";
      setError(msg === "quota_exceeded"
        ? "Audio quota reached. Please try again later."
        : "Could not load audio. Please try again.");
    }
  };

  const handlePause = async () => {
    if (audioCtxRef.current && playerState === "playing") {
      await audioCtxRef.current.suspend();
      setPlayerState("paused");
    }
  };

  const handleStop = () => {
    genRef.current++;
    stopPlayback();
    setPlayerState("idle");
    setError(null);
  };

  const handleSpeedChange = async (newSpeed: SpeedValue) => {
    setSpeed(newSpeed);

    // Nothing active — just record the preference
    if (playerState === "idle" || playerState === "loading") return;

    const ctx = audioCtxRef.current;
    if (!ctx) return;

    // ── Compute absolute content position across chunks ────────────────
    // ctx.currentTime is frozen while suspended, so this works in both states.
    const currentBufferPos =
      sourceStartOffsetRef.current + (ctx.currentTime - sourceStartCtxTimeRef.current);
    // contentPosInChunk (at 1.0×) = bufferPos × fetchedSpeed
    // absoluteContentPos (at 1.0×) = chunkOffset + contentPosInChunk
    const absoluteContentPos =
      chunkContentOffsetRef.current + currentBufferPos * fetchedSpeedRef.current;
    // In the full-text buffer at newSpeed: offset = absoluteContentPos / newSpeed
    const newOffset = absoluteContentPos / newSpeed;
    // ──────────────────────────────────────────────────────────────────

    // If paused, resume context so we can start a new source
    if (playerState === "paused" && ctx.state === "suspended") {
      await ctx.resume();
    }

    // ── Cache hit → instant switch, no loading spinner ────────────────
    const cached = audioCacheRef.current.get(newSpeed);
    if (cached) {
      const safeOffset = Math.max(0, Math.min(newOffset, cached.duration - 0.1));
      fetchedSpeedRef.current = newSpeed;
      chunkContentOffsetRef.current = 0; // now playing full-text buffer from one chunk
      startSource(cached, ctx, safeOffset);
      setPlayerState("playing");
      return;
    }
    // ──────────────────────────────────────────────────────────────────

    // Cache miss (pre-fetch not done yet) — fetch full text at new speed
    const myGen = ++genRef.current;
    setPlayerState("loading");

    try {
      await fetchAndPlay(newSpeed, newOffset, ctx, myGen);
    } catch (err: unknown) {
      if (genRef.current !== myGen) return;
      stopPlayback();
      setPlayerState("idle");
      const msg = err instanceof Error ? err.message : "";
      setError(msg === "quota_exceeded"
        ? "Audio quota reached. Please try again later."
        : "Could not load audio. Please try again.");
    }
  };

  const isActive = playerState === "playing" || playerState === "paused" || playerState === "loading";

  return (
    <div className={`rounded-2xl border transition-all duration-200 ${
      isActive
        ? "bg-primary/5 border-primary/30 shadow-sm"
        : "bg-muted/40 border-border"
    } p-4`}>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">

        {/* Churchill label */}
        <div className="flex items-center gap-2 shrink-0">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
            playerState === "playing"
              ? "bg-primary animate-pulse"
              : "bg-primary/15"
          }`}>
            <Mic className={`w-4 h-4 ${playerState === "playing" ? "text-primary-foreground" : "text-primary"}`} />
          </div>
          <div>
            <p className="text-xs font-bold text-foreground leading-none">Churchill AI</p>
            <p className="text-[10px] text-muted-foreground leading-none mt-0.5">British · {speed}x</p>
          </div>
        </div>

        {/* Divider */}
        <div className="hidden sm:block w-px h-8 bg-border shrink-0" />

        {/* Speed selector */}
        <div className="flex items-center gap-1">
          <Volume2 className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
          <div className="flex gap-1">
            {SPEEDS.map((s) => (
              <button
                key={s.label}
                onClick={() => handleSpeedChange(s.value as SpeedValue)}
                disabled={playerState === "loading"}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors disabled:opacity-50 ${
                  speed === s.value
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-background border border-border text-muted-foreground hover:text-foreground hover:border-primary/50"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="hidden sm:block w-px h-8 bg-border shrink-0" />

        {/* Controls */}
        <div className="flex items-center gap-2 ml-auto">
          {playerState === "loading" ? (
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 text-primary text-sm font-semibold">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Loading…</span>
            </div>
          ) : playerState === "playing" ? (
            <>
              <button
                onClick={handlePause}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors shadow-sm"
              >
                <Pause className="w-4 h-4" />
                Pause
              </button>
              <button
                onClick={handleStop}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-border text-muted-foreground text-sm font-semibold hover:bg-accent hover:text-foreground transition-colors"
              >
                <Square className="w-4 h-4" />
                Stop
              </button>
            </>
          ) : playerState === "paused" ? (
            <>
              <button
                onClick={handlePlay}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors shadow-sm"
              >
                <Play className="w-4 h-4" />
                Resume
              </button>
              <button
                onClick={handleStop}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-border text-muted-foreground text-sm font-semibold hover:bg-accent hover:text-foreground transition-colors"
              >
                <Square className="w-4 h-4" />
                Stop
              </button>
            </>
          ) : (
            <button
              onClick={handlePlay}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors shadow-sm"
            >
              <Play className="w-4 h-4" />
              Read Aloud
            </button>
          )}
        </div>
      </div>

      {/* Playing animation bar */}
      {playerState === "playing" && (
        <div className="mt-3 flex items-end gap-0.5 h-5">
          {[0.4,0.7,1.0,0.6,0.9,0.5,0.8,1.0,0.7,0.4,0.9,0.6,1.0,0.8,0.5,0.7,1.0,0.6,0.9,0.4,0.8,1.0,0.7,0.5,0.9,0.6,0.8,0.4].map((maxH, i) => (
            <div
              key={i}
              className="bg-primary/70 rounded-full"
              style={{
                width: 2,
                height: `${maxH * 20}px`,
                animation: `wave-bar ${0.6 + (i % 5) * 0.12}s ease-in-out ${(i % 7) * 0.08}s infinite`,
                transformOrigin: "bottom",
              }}
            />
          ))}
        </div>
      )}

      {error && (
        <p className="mt-2 text-xs text-destructive font-medium">{error}</p>
      )}
    </div>
  );
}

function StoryReader({ story, onBack, isCompleted, onMarkComplete }: { story: Story; onBack: () => void; isCompleted: boolean; onMarkComplete: () => void }) {
  const [showArabic, setShowArabic] = useState(true);

  return (
    <div className="animate-in fade-in duration-300">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ChevronLeft className="w-4 h-4" />
        Back to Stories
      </button>

      <div className={`bg-card border-2 rounded-3xl overflow-hidden ${levelBorder[story.level]}`}>
        {/* Header */}
        <div className="p-6 md:p-8 border-b border-border">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <LevelBadge level={story.level} />
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-foreground leading-tight">
                {story.title}
              </h1>
              <p className="text-lg text-muted-foreground mt-1 font-medium" dir="rtl" lang="ar">
                {story.titleArabic}
              </p>
            </div>

            <button
              onClick={() => setShowArabic(!showArabic)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border transition-colors shrink-0 ${
                showArabic
                  ? "bg-primary/10 border-primary/30 text-primary hover:bg-primary/15"
                  : "border-border text-muted-foreground hover:bg-accent hover:text-foreground"
              }`}
            >
              {showArabic ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              {showArabic ? "إخفاء العربية" : "إظهار العربية"}
            </button>
          </div>

          {/* Voice Reader */}
          <div className="mt-5">
            <VoiceReader content={story.content} />
          </div>
        </div>

        {/* English Content with word-by-word highlight reader */}
        <div className="p-6 md:p-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-5 rounded-full bg-primary" />
            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">English</span>
          </div>
          <HighlightedReader content={story.content} />
        </div>

        {/* Arabic Translation */}
        {showArabic && (
          <div className="border-t-2 border-dashed border-border bg-muted/30 p-6 md:p-8 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="flex items-center justify-end gap-2 mb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">الترجمة العربية</span>
              <div className="w-1 h-5 rounded-full bg-amber-500" />
            </div>
            <div
              className="text-base leading-[2.2] text-foreground whitespace-pre-wrap font-cairo text-right"
              dir="rtl"
              lang="ar"
            >
              {story.contentArabic}
            </div>
          </div>
        )}

        {/* Mark as Complete button */}
        <div className="p-6 md:p-8 flex justify-center">
          {isCompleted ? (
            <div className="flex items-center gap-2 px-6 py-3 rounded-full bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 font-semibold">
              <CheckCircle2 className="w-5 h-5" />
              Completed
            </div>
          ) : (
            <button
              onClick={onMarkComplete}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors shadow-sm"
            >
              <CheckCircle2 className="w-5 h-5" />
              Mark as Read
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function StoryCard({ story, onClick, isCompleted }: { story: Story; onClick: () => void; isCompleted: boolean }) {
  const preview = story.content.slice(0, 110).trim() + "…";

  return (
    <button
      onClick={onClick}
      className={`text-left bg-card border-2 rounded-2xl p-5 transition-all hover:shadow-md hover:-translate-y-0.5 hover:border-primary/40 active:scale-[0.99] ${levelBorder[story.level]}`}
    >
      <div className="flex items-center justify-between gap-2 mb-3">
        <LevelBadge level={story.level} />
        {isCompleted ? (
          <CheckCircle2 className="w-5 h-5 text-green-500" />
        ) : (
          <BookOpen className="w-4 h-4 text-muted-foreground" />
        )}
      </div>
      <h3 className="font-bold text-foreground text-base leading-snug mb-1">{story.title}</h3>
      <p className="text-xs text-muted-foreground font-medium mb-3 font-cairo" dir="rtl" lang="ar">
        {story.titleArabic}
      </p>
      <p className="text-xs text-muted-foreground leading-relaxed">{preview}</p>
    </button>
  );
}

export default function StoriesPage() {
  const [levelFilter, setLevelFilter] = useState<LevelFilter>("All");
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const { toast } = useToast();
  const qc = useQueryClient();

  const { data: stories = [], isLoading } = useQuery<Story[]>({
    queryKey: ["stories", levelFilter],
    queryFn: async () => {
      const url = levelFilter === "All"
        ? "/api/stories"
        : `/api/stories?level=${levelFilter}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to load stories");
      return res.json();
    },
  });

  const { data: completedKeys = {} } = useQuery<Record<string, string>>({
    queryKey: ["story-completions"],
    queryFn: async () => {
      const res = await customFetch<{ keys: Record<string, string> }>("/api/user-data-prefix/story_completed_");
      return res.keys;
    },
  });

  const completedIds = new Set(
    Object.keys(completedKeys)
      .filter(k => completedKeys[k] === "1")
      .map(k => Number(k.replace("story_completed_", "")))
  );

  const markCompleteMutation = useMutation({
    mutationFn: (storyId: number) =>
      customFetch(`/api/user-data/story_completed_${storyId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ value: "1" }),
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["story-completions"] });
      toast({ title: "✅ Story completed!", description: "Great job finishing this story.", duration: 1500 });
    },
  });

  if (selectedStory) {
    return (
      <Layout>
        <div className="max-w-3xl mx-auto">
          <StoryReader
            story={selectedStory}
            onBack={() => setSelectedStory(null)}
            isCompleted={completedIds.has(selectedStory.id)}
            onMarkComplete={() => markCompleteMutation.mutate(selectedStory.id)}
          />
        </div>
      </Layout>
    );
  }

  const levelCounts: Record<string, number> = {};
  for (const s of stories) {
    levelCounts[s.level] = (levelCounts[s.level] ?? 0) + 1;
  }

  return (
    <Layout>
      <div className="max-w-5xl mx-auto animate-in fade-in duration-500">

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shrink-0">
            <BookMarked className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-foreground">IELTS Short Stories</h1>
            <p className="text-sm text-muted-foreground">
              Read and practise with stories built from your 3,000-word IELTS vocabulary — with Arabic translation
            </p>
          </div>
        </div>

        {/* Level filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {LEVELS.map((lvl) => {
            const count = lvl === "All"
              ? stories.length
              : (levelCounts[lvl] ?? 0);
            const isActive = levelFilter === lvl;
            return (
              <button
                key={lvl}
                onClick={() => setLevelFilter(lvl)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${
                  isActive
                    ? "bg-primary text-primary-foreground border-primary shadow-sm"
                    : "bg-card border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                }`}
              >
                {lvl}
                {!isLoading && (
                  <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${
                    isActive ? "bg-primary-foreground/20 text-primary-foreground" : "bg-muted"
                  }`}>
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : stories.length === 0 ? (
          <div className="text-center py-24">
            <BookOpen className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground">No stories found for this level.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {stories.map((story) => (
              <StoryCard
                key={story.id}
                story={story}
                onClick={() => setSelectedStory(story)}
                isCompleted={completedIds.has(story.id)}
              />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
