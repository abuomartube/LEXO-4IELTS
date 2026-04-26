import { useEffect, useRef, useState } from "react";
import { customFetch } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Loader2,
  Sparkles,
  Volume2,
  Square,
  RefreshCcw,
  AlertCircle,
  BookOpen,
  Languages,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface GrammarItem { original: string; correction: string; explanation: string; }
interface VocabItem { weak: string; suggestions: string[]; why: string; }
interface FeedbackResponse {
  grammar: GrammarItem[];
  vocabulary: VocabItem[];
  coherence: { rating: string; comment: string };
  linkingWords: { comment: string; suggestions: string[] };
  betterVersion: string;
  betterVersionArabic: string;
  xpAwarded: number;
}

interface StoryWritingProps {
  storyId: number;
  /** Called once feedback is shown (used to mark the daily-plan task complete). */
  onComplete?: () => void;
}

const MIN_CHARS = 60;
const MAX_CHARS = 2000;

export function StoryWriting({ storyId, onComplete }: StoryWritingProps) {
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<FeedbackResponse | null>(null);
  const [showArabic, setShowArabic] = useState(false);

  // ── Audio (instant playback via Web Audio + pre-fetched MP3 bytes) ──────
  const audioCtxRef = useRef<AudioContext | null>(null);
  const audioBufferRef = useRef<AudioBuffer | null>(null);
  const audioRawRef = useRef<ArrayBuffer | null>(null);
  // Promise for the in-flight prefetch (raw bytes). Allows the Listen button
  // to be clickable BEFORE the prefetch finishes — the click handler simply
  // awaits this promise instead of being disabled.
  const audioPrefetchRef = useRef<Promise<ArrayBuffer> | null>(null);
  const sourceRef = useRef<AudioBufferSourceNode | null>(null);
  const [audioState, setAudioState] = useState<"idle" | "loading" | "playing">("idle");
  const [audioError, setAudioError] = useState<string | null>(null);

  // Eagerly fetch & decode TTS the moment we receive a betterVersion so the
  // user's first click plays instantly with no perceptible loading.
  useEffect(() => {
    if (!feedback?.betterVersion) return;

    let cancelled = false;
    setAudioState("idle");
    setAudioError(null);
    audioBufferRef.current = null;
    audioRawRef.current = null;
    audioPrefetchRef.current = null;

    const ctx =
      audioCtxRef.current ??
      new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    audioCtxRef.current = ctx;

    const fetchPromise = fetch("/api/speaking/tts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: feedback.betterVersion,
        voice: "onyx",
        model: "tts-1-hd",
        speed: 1.0,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("tts_failed");
        return res.arrayBuffer();
      })
      .then((ab) => {
        if (!cancelled) audioRawRef.current = ab;
        return ab;
      });

    audioPrefetchRef.current = fetchPromise;

    fetchPromise
      .then(async (ab) => {
        if (cancelled) return;
        // decodeAudioData is destructive on the ArrayBuffer in some browsers;
        // pass a slice so the original bytes survive for repeated playback.
        try {
          const buffer = await ctx.decodeAudioData(ab.slice(0));
          if (!cancelled) audioBufferRef.current = buffer;
        } catch {
          // Decoding failure here is non-fatal — the click handler will retry.
        }
      })
      .catch(() => {
        if (!cancelled) {
          audioPrefetchRef.current = null;
          setAudioError("Audio unavailable. Try again in a moment.");
        }
      });

    return () => {
      cancelled = true;
    };
  }, [feedback?.betterVersion]);

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      try { sourceRef.current?.stop(); } catch { /* ok */ }
      const ctx = audioCtxRef.current;
      if (ctx) setTimeout(() => ctx.close().catch(() => {}), 200);
      audioCtxRef.current = null;
      sourceRef.current = null;
    };
  }, []);

  async function handlePlay() {
    // Toggle: stop currently-playing audio.
    if (audioState === "playing") {
      try { sourceRef.current?.stop(); } catch { /* ok */ }
      setAudioState("idle");
      return;
    }
    const ctx = audioCtxRef.current;
    if (!ctx) return;
    // Browser autoplay policies require resume() inside a user gesture.
    try { await ctx.resume(); } catch { /* ok */ }

    let buffer = audioBufferRef.current;

    // Fast path: decoded buffer ready — play instantly.
    // Slow path: raw bytes ready but not decoded yet (or decode failed before).
    // Slowest path: prefetch still in flight — show "Loading…" and await it.
    if (!buffer && !audioRawRef.current && audioPrefetchRef.current) {
      setAudioState("loading");
      try {
        await audioPrefetchRef.current;
      } catch {
        setAudioError("Audio unavailable. Try again in a moment.");
        setAudioState("idle");
        return;
      }
    }
    if (!buffer && audioRawRef.current) {
      try {
        buffer = await ctx.decodeAudioData(audioRawRef.current.slice(0));
        audioBufferRef.current = buffer;
      } catch {
        setAudioError("Audio unavailable. Try again in a moment.");
        setAudioState("idle");
        return;
      }
    }
    if (!buffer) {
      setAudioError("Audio unavailable. Try again in a moment.");
      setAudioState("idle");
      return;
    }

    try { sourceRef.current?.stop(); } catch { /* ok */ }
    const src = ctx.createBufferSource();
    src.buffer = buffer;
    src.connect(ctx.destination);
    src.onended = () => {
      if (sourceRef.current === src) {
        sourceRef.current = null;
        setAudioState("idle");
      }
    };
    sourceRef.current = src;
    setAudioState("playing");
    src.start(0);
  }

  async function handleSubmit() {
    if (submitting) return;
    const trimmed = text.trim();
    if (trimmed.length < MIN_CHARS) {
      setError(`Please write at least ${MIN_CHARS} characters (a few sentences).`);
      return;
    }
    if (trimmed.length > MAX_CHARS) {
      setError(`Please keep your response under ${MAX_CHARS} characters.`);
      return;
    }
    setError(null);
    setSubmitting(true);
    try {
      const data = await customFetch<FeedbackResponse>(
        `/api/stories/${storyId}/written-feedback`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ response: trimmed }),
        },
      );
      setFeedback(data);
      onComplete?.();
    } catch (err) {
      const e = err as { data?: { error?: string }; message?: string } | null;
      setError(e?.data?.error ?? e?.message ?? "Could not analyse your response.");
    } finally {
      setSubmitting(false);
    }
  }

  function handleReset() {
    setFeedback(null);
    setText("");
    setError(null);
    setShowArabic(false);
    audioBufferRef.current = null;
    audioRawRef.current = null;
    audioPrefetchRef.current = null;
    setAudioState("idle");
    setAudioError(null);
  }

  // ── render ──

  if (feedback) {
    return (
      <Card className="p-6 space-y-6">
        <div className="text-center">
          <h3 className="text-lg font-bold inline-flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Your writing analysis
          </h3>
          {feedback.xpAwarded > 0 && (
            <p className="mt-1 inline-flex items-center gap-1 text-sm font-medium text-amber-600 dark:text-amber-400">
              <Sparkles className="h-4 w-4" />
              +{feedback.xpAwarded} XP earned
            </p>
          )}
        </div>

        {/* Grammar */}
        <FeedbackSection
          title="Grammar"
          emoji="✏️"
          empty={feedback.grammar.length === 0}
          emptyText="No grammar issues — great work!"
        >
          <ul className="space-y-2 text-sm">
            {feedback.grammar.map((g, i) => (
              <li key={i} className="rounded-md border border-border/60 bg-background p-3">
                <div className="flex flex-wrap items-baseline gap-2">
                  <span className="line-through text-rose-600 dark:text-rose-400">{g.original}</span>
                  <span className="text-muted-foreground">→</span>
                  <span className="font-medium text-emerald-700 dark:text-emerald-400">{g.correction}</span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{g.explanation}</p>
              </li>
            ))}
          </ul>
        </FeedbackSection>

        {/* Vocabulary */}
        <FeedbackSection
          title="Vocabulary"
          emoji="📚"
          empty={feedback.vocabulary.length === 0}
          emptyText="Solid word choices throughout!"
        >
          <ul className="space-y-2 text-sm">
            {feedback.vocabulary.map((v, i) => (
              <li key={i} className="rounded-md border border-border/60 bg-background p-3">
                <div className="flex flex-wrap items-baseline gap-2">
                  <span className="font-medium text-amber-700 dark:text-amber-300">{v.weak}</span>
                  <span className="text-muted-foreground">→</span>
                  <span className="text-emerald-700 dark:text-emerald-400">
                    {v.suggestions.join(", ")}
                  </span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{v.why}</p>
              </li>
            ))}
          </ul>
        </FeedbackSection>

        {/* Coherence */}
        <FeedbackSection title="Coherence & Cohesion" emoji="🧩">
          <div className="text-sm rounded-md border border-border/60 bg-background p-3">
            <div className="text-xs uppercase tracking-wide text-muted-foreground">
              Rating
            </div>
            <div className="font-semibold mb-1">{feedback.coherence.rating}</div>
            <p className="text-sm text-foreground/90">{feedback.coherence.comment}</p>
          </div>
        </FeedbackSection>

        {/* Linking words */}
        <FeedbackSection title="Linking Words" emoji="🔗">
          <div className="text-sm rounded-md border border-border/60 bg-background p-3 space-y-2">
            <p>{feedback.linkingWords.comment}</p>
            {feedback.linkingWords.suggestions.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {feedback.linkingWords.suggestions.map((s, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center rounded-full bg-primary/10 text-primary text-xs font-medium px-2 py-0.5"
                  >
                    {s}
                  </span>
                ))}
              </div>
            )}
          </div>
        </FeedbackSection>

        {/* Better version */}
        <FeedbackSection title="Better Version" emoji="🌟">
          <div className="rounded-md border border-primary/30 bg-primary/5 p-4 space-y-3">
            <div className="flex flex-wrap gap-2 justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePlay}
                disabled={audioState === "loading"}
                aria-label={audioState === "playing" ? "Stop audio" : "Listen to better version"}
              >
                {audioState === "playing" ? (
                  <>
                    <Square className="h-4 w-4 mr-2" />
                    Stop
                  </>
                ) : audioState === "loading" ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Loading…
                  </>
                ) : (
                  <>
                    <Volume2 className="h-4 w-4 mr-2" />
                    Listen
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowArabic((v) => !v)}
              >
                <Languages className="h-4 w-4 mr-2" />
                {showArabic ? "Hide Arabic" : "Show Arabic"}
              </Button>
            </div>
            <p className="text-sm leading-relaxed whitespace-pre-wrap">
              {feedback.betterVersion}
            </p>
            {audioError && (
              <p className="text-xs text-destructive flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {audioError}
              </p>
            )}
            {showArabic && (
              <div
                dir="rtl"
                lang="ar"
                className="border-t border-primary/20 pt-3 text-sm leading-relaxed whitespace-pre-wrap font-[system-ui]"
              >
                {feedback.betterVersionArabic}
              </div>
            )}
          </div>
        </FeedbackSection>

        <div className="flex justify-center">
          <Button variant="outline" onClick={handleReset}>
            <RefreshCcw className="h-4 w-4 mr-2" />
            Write a new response
          </Button>
        </div>
      </Card>
    );
  }

  // Unsubmitted form
  const charCount = text.trim().length;
  return (
    <Card className="p-6 space-y-4">
      <div className="flex items-start gap-2">
        <BookOpen className="h-5 w-5 text-primary shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium">
            In your own words, what was this story about? Write 3-5 sentences.
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            Your response will be analysed for grammar, vocabulary, coherence, and
            linking words.
          </p>
        </div>
      </div>

      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write your summary here…"
        rows={6}
        maxLength={MAX_CHARS}
        className="text-sm leading-relaxed"
      />

      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>
          {charCount} / {MAX_CHARS} characters
          {charCount < MIN_CHARS && (
            <span className="ml-1">(min {MIN_CHARS})</span>
          )}
        </span>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <div className="flex justify-center">
        <Button
          onClick={handleSubmit}
          disabled={submitting || charCount < MIN_CHARS}
          size="lg"
        >
          {submitting ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Analysing your writing…
            </>
          ) : (
            <>Submit for analysis</>
          )}
        </Button>
      </div>
    </Card>
  );
}

function FeedbackSection({
  title,
  emoji,
  children,
  empty,
  emptyText,
}: {
  title: string;
  emoji: string;
  children: React.ReactNode;
  empty?: boolean;
  emptyText?: string;
}) {
  return (
    <div>
      <h4 className="text-sm font-semibold mb-2 flex items-center gap-1.5">
        <span aria-hidden>{emoji}</span>
        <span>{title}</span>
      </h4>
      {empty ? (
        <div
          className={cn(
            "text-xs italic rounded-md border border-emerald-200 bg-emerald-50 dark:border-emerald-900 dark:bg-emerald-950/30 px-3 py-2 text-emerald-800 dark:text-emerald-300",
          )}
        >
          {emptyText ?? "Looks good."}
        </div>
      ) : (
        children
      )}
    </div>
  );
}
