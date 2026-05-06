import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { Layout } from "@/components/layout";
import { StoryQuiz } from "@/components/story-quiz";
import { StoryWriting } from "@/components/story-writing";
import { markTaskDone } from "@/lib/daily-plan";
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
// `firstEnd` is the position in the ORIGINAL text where chunk1 ends — we
// preserve char alignment (no trim) so word-highlight char→time math is exact.
function splitContent(text: string): { firstEnd: number; chunk1: string; chunk2: string } {
  const MAX = 350;
  if (text.length <= MAX) return { firstEnd: text.length, chunk1: text, chunk2: "" };
  for (let i = MAX; i >= 80; i--) {
    if (text[i] === "." || text[i] === "!" || text[i] === "?") {
      const end = i + 1;
      return { firstEnd: end, chunk1: text.slice(0, end), chunk2: text.slice(end) };
    }
  }
  // fallback: split at a space
  for (let i = MAX; i >= 80; i--) {
    if (text[i] === " ") {
      return { firstEnd: i, chunk1: text.slice(0, i), chunk2: text.slice(i) };
    }
  }
  return { firstEnd: MAX, chunk1: text.slice(0, MAX), chunk2: text.slice(MAX) };
}

const SPEEDS = [
  { label: "Slow", value: 0.75 },
  { label: "Normal", value: 1.0 },
  { label: "Fast", value: 1.5 },
] as const;

type SpeedValue = 0.75 | 1.0 | 1.5;
type PlayerState = "idle" | "loading" | "playing" | "paused";

function LevelBadge({ level }: { level: string }) {
  return (
    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${levelColors[level] ?? "bg-muted text-muted-foreground"}`}>
      {level}
    </span>
  );
}

// ── Tokenizer for word-by-word highlighting ───────────────────────────────
type WordToken = { text: string; isWord: boolean; start: number; end: number; wordIndex: number };

function tokenizeForHighlight(text: string): {
  tokens: WordToken[];
  wordSpans: Array<{ start: number; end: number; idx: number }>;
} {
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
  return { tokens, wordSpans };
}

function VoiceReader({ content }: { content: string }) {
  const { tokens, wordSpans } = useMemo(() => tokenizeForHighlight(content), [content]);
  const totalLen = content.length;

  const [speed, setSpeed] = useState<SpeedValue>(1.0);
  const [playerState, setPlayerState] = useState<PlayerState>("idle");
  const [error, setError] = useState<string | null>(null);
  const [highlightIdx, setHighlightIdx] = useState(-1);

  // Web Audio API refs
  const audioCtxRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<AudioBufferSourceNode | null>(null);

  // Per-speed audio cache — avoids re-fetching when switching back to a speed
  const audioCacheRef = useRef<Map<SpeedValue, AudioBuffer>>(new Map());

  // Position tracking — needed to resume from same spot after a speed change
  const sourceStartCtxTimeRef = useRef(0);
  const sourceStartOffsetRef = useRef(0);
  const fetchedSpeedRef = useRef<SpeedValue>(1.0);
  const chunkContentOffsetRef = useRef(0);

  // Char range covered by the currently-playing AudioBuffer.
  // Updated whenever a new source starts (chunk1, chunk2, or full-text).
  const bufCharStartRef = useRef(0);
  const bufCharEndRef = useRef(0);
  const firstEndRef = useRef(0); // cached split position for current play session

  // Highlight state refs (avoid stale closures inside rAF)
  const wordIdxRef = useRef(-1);
  const rafRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Generation counter to discard stale responses
  const genRef = useRef(0);

  // Clear cache + reset highlight whenever the story content changes
  useEffect(() => {
    audioCacheRef.current = new Map();
    wordIdxRef.current = -1;
    setHighlightIdx(-1);
  }, [content]);

  // ── Highlight rAF loop ────────────────────────────────────────────────
  const stopHighlightLoop = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  const startHighlightLoop = useCallback(() => {
    if (rafRef.current !== null) return; // already running
    const tick = () => {
      const ctx = audioCtxRef.current;
      const source = sourceRef.current;
      if (ctx && source && source.buffer) {
        const dur = source.buffer.duration;
        // ctx.currentTime is frozen while suspended (paused) → highlight stays put.
        const bufPos = Math.max(
          0,
          Math.min(dur, sourceStartOffsetRef.current + (ctx.currentTime - sourceStartCtxTimeRef.current)),
        );
        const ratio = dur > 0 ? bufPos / dur : 0;
        const cs = bufCharStartRef.current;
        const ce = bufCharEndRef.current;
        const charPos = cs + ratio * (ce - cs);

        // Binary search for word containing charPos
        let lo = 0, hi = wordSpans.length - 1, found = -1;
        while (lo <= hi) {
          const mid = (lo + hi) >> 1;
          const w = wordSpans[mid];
          if (charPos < w.start) hi = mid - 1;
          else if (charPos >= w.end) lo = mid + 1;
          else { found = w.idx; break; }
        }
        if (found < 0) {
          // Between words → highlight last completed word
          for (let i = wordSpans.length - 1; i >= 0; i--) {
            if (wordSpans[i].end <= charPos) { found = wordSpans[i].idx; break; }
          }
        }
        if (found >= 0 && found !== wordIdxRef.current) {
          wordIdxRef.current = found;
          setHighlightIdx(found);
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
  }, [wordSpans]);

  // Auto-scroll the highlighted word into view
  useEffect(() => {
    if (highlightIdx < 0) return;
    const el = containerRef.current?.querySelector<HTMLSpanElement>(`[data-w-idx="${highlightIdx}"]`);
    if (el) el.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [highlightIdx]);

  // ── Source / context lifecycle ────────────────────────────────────────
  const stopSource = useCallback(() => {
    if (sourceRef.current) {
      try { sourceRef.current.stop(); } catch { /* already stopped */ }
      sourceRef.current.disconnect();
      sourceRef.current = null;
    }
  }, []);

  const stopPlayback = useCallback(() => {
    stopHighlightLoop();
    stopSource();
    if (audioCtxRef.current) {
      audioCtxRef.current.close().catch(() => {});
      audioCtxRef.current = null;
    }
    wordIdxRef.current = -1;
    setHighlightIdx(-1);
  }, [stopSource, stopHighlightLoop]);

  useEffect(() => {
    return () => stopPlayback();
  }, [stopPlayback]);

  const startSource = useCallback((
    buffer: AudioBuffer,
    ctx: AudioContext,
    offset: number,
    charRange: { start: number; end: number },
    afterEnded?: () => void,
  ) => {
    stopSource();
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.playbackRate.value = 1.0;
    source.connect(ctx.destination);
    source.onended = () => {
      if (sourceRef.current === source) {
        sourceRef.current = null;
        if (afterEnded) {
          afterEnded();
        } else {
          stopHighlightLoop();
          wordIdxRef.current = -1;
          setHighlightIdx(-1);
          setPlayerState("idle");
        }
      }
    };
    source.start(0, offset);
    sourceRef.current = source;
    sourceStartCtxTimeRef.current = ctx.currentTime;
    sourceStartOffsetRef.current = offset;
    bufCharStartRef.current = charRange.start;
    bufCharEndRef.current = charRange.end;
  }, [stopSource, stopHighlightLoop]);

  // ── TTS fetching ──────────────────────────────────────────────────────
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

  const fetchAndPlay = useCallback(async (
    targetSpeed: SpeedValue,
    offset: number,
    ctx: AudioContext,
    myGen: number,
  ) => {
    let buffer = audioCacheRef.current.get(targetSpeed) ?? null;
    if (!buffer) {
      buffer = await fetchBuffer(content, targetSpeed, ctx, myGen);
      if (!buffer || genRef.current !== myGen) return;
      audioCacheRef.current.set(targetSpeed, buffer);
    }
    if (ctx.state === "suspended") await ctx.resume();
    if (genRef.current !== myGen) return;
    const safeOffset = Math.max(0, Math.min(offset, buffer.duration - 0.1));
    fetchedSpeedRef.current = targetSpeed;
    chunkContentOffsetRef.current = 0;
    startSource(buffer, ctx, safeOffset, { start: 0, end: totalLen });
    startHighlightLoop();
    setPlayerState("playing");
  }, [content, totalLen, fetchBuffer, startSource, startHighlightLoop]);

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
      startHighlightLoop();
      return;
    }

    stopPlayback();

    const ctx = new AudioContext();
    audioCtxRef.current = ctx;
    const myGen = ++genRef.current;
    fetchedSpeedRef.current = speed;
    chunkContentOffsetRef.current = 0;

    setPlayerState("loading");

    try {
      const { firstEnd, chunk1, chunk2 } = splitContent(content);
      firstEndRef.current = firstEnd;

      const chunk1Promise = fetchBuffer(chunk1, speed, ctx, myGen);
      const chunk2Promise = chunk2
        ? fetchBuffer(chunk2, speed, ctx, myGen)
        : Promise.resolve(null);

      const buffer1 = await chunk1Promise;
      if (!buffer1 || genRef.current !== myGen) return;

      if (ctx.state === "suspended") await ctx.resume();
      if (genRef.current !== myGen) return;

      let chunk2Buffer: AudioBuffer | null = null;
      let chunk2Pending = false;

      const chunk1ContentDuration = buffer1.duration * speed;

      startSource(buffer1, ctx, 0, { start: 0, end: firstEnd }, () => {
        if (genRef.current !== myGen) return;
        if (chunk2Buffer) {
          chunkContentOffsetRef.current = chunk1ContentDuration;
          startSource(chunk2Buffer, ctx, 0, { start: firstEnd, end: totalLen });
          startHighlightLoop();
          setPlayerState("playing");
        } else if (chunk2) {
          chunk2Pending = true;
          setPlayerState("loading");
        } else {
          stopHighlightLoop();
          wordIdxRef.current = -1;
          setHighlightIdx(-1);
          setPlayerState("idle");
        }
      });
      startHighlightLoop();
      setPlayerState("playing");

      prefetchOtherSpeeds(speed, ctx);

      if (chunk2) {
        const buffer2 = await chunk2Promise;
        if (genRef.current !== myGen) return;
        if (buffer2) {
          chunk2Buffer = buffer2;
          if (chunk2Pending) {
            chunk2Pending = false;
            if (ctx.state === "suspended") await ctx.resume();
            if (genRef.current !== myGen) return;
            chunkContentOffsetRef.current = chunk1ContentDuration;
            startSource(buffer2, ctx, 0, { start: firstEnd, end: totalLen });
            startHighlightLoop();
            setPlayerState("playing");
          }
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
      // rAF can keep running — ctx.currentTime is frozen so highlight won't drift
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
    if (playerState === "idle" || playerState === "loading") return;

    const ctx = audioCtxRef.current;
    if (!ctx) return;

    const currentBufferPos =
      sourceStartOffsetRef.current + (ctx.currentTime - sourceStartCtxTimeRef.current);
    const absoluteContentPos =
      chunkContentOffsetRef.current + currentBufferPos * fetchedSpeedRef.current;
    const newOffset = absoluteContentPos / newSpeed;

    if (playerState === "paused" && ctx.state === "suspended") {
      await ctx.resume();
    }

    const cached = audioCacheRef.current.get(newSpeed);
    if (cached) {
      const safeOffset = Math.max(0, Math.min(newOffset, cached.duration - 0.1));
      fetchedSpeedRef.current = newSpeed;
      chunkContentOffsetRef.current = 0;
      startSource(cached, ctx, safeOffset, { start: 0, end: totalLen });
      startHighlightLoop();
      setPlayerState("playing");
      return;
    }

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
    <div className={cn(
      "rounded-2xl border transition-all duration-200",
      isActive ? "bg-primary/5 border-primary/30 shadow-sm" : "bg-muted/40 border-border",
    )}>
      {/* Controls bar */}
      <div className="p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3 border-b border-border/60">
        <div className="flex items-center gap-2 shrink-0">
          <div className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
            playerState === "playing" ? "bg-primary animate-pulse" : "bg-primary/15",
          )}>
            <Mic className={cn("w-4 h-4", playerState === "playing" ? "text-primary-foreground" : "text-primary")} />
          </div>
          <div>
            <p className="text-xs font-bold text-foreground leading-none">Churchill AI</p>
            <p className="text-[10px] text-muted-foreground leading-none mt-0.5">British · {speed}x</p>
          </div>
        </div>

        <div className="hidden sm:block w-px h-8 bg-border shrink-0" />

        <div className="flex items-center gap-1">
          <Volume2 className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
          <div className="flex gap-1">
            {SPEEDS.map((s) => (
              <button
                key={s.label}
                onClick={() => handleSpeedChange(s.value as SpeedValue)}
                disabled={playerState === "loading"}
                className={cn(
                  "px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors disabled:opacity-50",
                  speed === s.value
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-background border border-border text-muted-foreground hover:text-foreground hover:border-primary/50",
                )}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <div className="hidden sm:block w-px h-8 bg-border shrink-0" />

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
                <Pause className="w-4 h-4" /> Pause
              </button>
              <button
                onClick={handleStop}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-border text-muted-foreground text-sm font-semibold hover:bg-accent hover:text-foreground transition-colors"
              >
                <Square className="w-4 h-4" /> Stop
              </button>
            </>
          ) : playerState === "paused" ? (
            <>
              <button
                onClick={handlePlay}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors shadow-sm"
              >
                <Play className="w-4 h-4" /> Resume
              </button>
              <button
                onClick={handleStop}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-border text-muted-foreground text-sm font-semibold hover:bg-accent hover:text-foreground transition-colors"
              >
                <Square className="w-4 h-4" /> Stop
              </button>
            </>
          ) : (
            <button
              onClick={handlePlay}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors shadow-sm"
            >
              <Play className="w-4 h-4" /> Read Aloud
            </button>
          )}
        </div>
      </div>

      {error && (
        <p className="px-4 pt-2 text-xs text-destructive font-medium">{error}</p>
      )}

      {/* Tokenized story content with synchronized word highlight */}
      <div
        ref={containerRef}
        className="p-4 md:p-6 text-base leading-[2] text-foreground whitespace-pre-wrap"
        lang="en"
      >
        {tokens.map((t, i) =>
          t.isWord ? (
            <span
              key={i}
              data-w-idx={t.wordIndex}
              className="rounded px-0.5 -mx-0.5"
              style={{
                transition: "background-color 50ms ease-out",
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


function StoryReader({ story, onBack, isCompleted, onMarkComplete }: { story: Story; onBack: () => void; isCompleted: boolean; onMarkComplete: () => void }) {
  // Track which exercises have been submitted for this story. When BOTH are
  // done we mark the daily-plan "storyExercises" task complete.
  const [quizDone, setQuizDone] = useState(false);
  const [writingDone, setWritingDone] = useState(false);
  useEffect(() => {
    // Reset whenever the user opens a different story.
    setQuizDone(false);
    setWritingDone(false);
  }, [story.id]);
  useEffect(() => {
    if (quizDone && writingDone) {
      markTaskDone("storyExercises");
    }
  }, [quizDone, writingDone]);
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

        </div>

        {/* English Content with synchronized word-by-word highlight via Churchill AI */}
        <div className="p-6 md:p-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-5 rounded-full bg-primary" />
            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">English</span>
          </div>
          <VoiceReader content={story.content} />
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

        {/* AI-powered exercises */}
        <div className="border-t-2 border-dashed border-border bg-muted/20 p-6 md:p-8 space-y-6">
          <div>
            <h3 className="text-base font-bold mb-1 flex items-center gap-2">
              <span aria-hidden>🧠</span> Comprehension Quiz
            </h3>
            <p className="text-xs text-muted-foreground mb-3">
              Answer 5 questions about the story to test your understanding.
            </p>
            {/* `key={story.id}` forces a clean remount whenever the student
                opens a different story — guarantees no in-flight fetches or
                answer state from the previous story can leak across. */}
            <StoryQuiz key={story.id} storyId={story.id} onComplete={() => setQuizDone(true)} />
          </div>

          <div>
            <h3 className="text-base font-bold mb-1 flex items-center gap-2">
              <span aria-hidden>✍️</span> Written Response
            </h3>
            <p className="text-xs text-muted-foreground mb-3">
              Summarise the story in your own words and get instant AI feedback.
            </p>
            <StoryWriting storyId={story.id} onComplete={() => setWritingDone(true)} />
          </div>
        </div>

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
