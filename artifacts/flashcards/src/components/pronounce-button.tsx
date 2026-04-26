import { useState, useRef, useEffect } from "react";
import { Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";

// ── Module-level caches — survive card navigation ────────────────────────────

// Raw MP3 bytes fetched eagerly in the background (no user gesture needed)
const rawCache = new Map<string, ArrayBuffer>();
// Track in-flight fetches so multiple buttons for the same word share one request
const inflight = new Map<string, Promise<ArrayBuffer>>();

// British voice at natural speaking rate — sounds most human at 1.0×
const TTS_VOICE = "fable";
const TTS_SPEED = 1.0;
const TTS_MODEL = "tts-1-hd";

export async function fetchRaw(text: string): Promise<ArrayBuffer> {
  const key = text.toLowerCase().trim();
  if (rawCache.has(key)) return rawCache.get(key)!;
  if (inflight.has(key)) return inflight.get(key)!;

  const p = fetch("/api/speaking/tts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, speed: TTS_SPEED, model: TTS_MODEL, voice: TTS_VOICE }),
  })
    .then(r => {
      if (!r.ok) throw new Error("tts_failed");
      return r.arrayBuffer();
    })
    .then(ab => {
      rawCache.set(key, ab);
      inflight.delete(key);
      return ab;
    })
    .catch(err => {
      inflight.delete(key);
      throw err;
    });

  inflight.set(key, p);
  return p;
}

// ── Component ────────────────────────────────────────────────────────────────

interface PronounceButtonProps {
  word: string;
  className?: string;
  variant?: "default" | "ghost" | "inverted";
}

export function PronounceButton({ word, className, variant = "default" }: PronounceButtonProps) {
  const [state, setState] = useState<"idle" | "loading" | "playing">("idle");
  const ctxRef = useRef<AudioContext | null>(null);
  const srcRef = useRef<AudioBufferSourceNode | null>(null);

  // Pre-fetch audio the moment this button appears — so click is instant
  useEffect(() => {
    fetchRaw(word).catch(() => { /* silently ignore pre-fetch errors */ });
  }, [word]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      try { srcRef.current?.stop(); } catch { /* ok */ }
      // Small delay before close so any residual audio tail can finish
      const ctx = ctxRef.current;
      if (ctx) setTimeout(() => ctx.close().catch(() => {}), 300);
      ctxRef.current = null;
      srcRef.current = null;
    };
  }, []);

  const handleClick = async (e: React.MouseEvent) => {
    e.stopPropagation();

    // If already playing, stop it
    if (state !== "idle") {
      try { srcRef.current?.stop(); } catch { /* ok */ }
      const ctx = ctxRef.current;
      if (ctx) setTimeout(() => ctx.close().catch(() => {}), 300);
      ctxRef.current = null;
      srcRef.current = null;
      setState("idle");
      return;
    }

    // Create AudioContext on user gesture
    const ctx = new AudioContext();
    ctxRef.current = ctx;

    try {
      // fetchRaw hits cache if pre-fetch already finished → effectively instant
      const ab = await fetchRaw(word);

      // Guard: user might have stopped or navigated away during fetch
      if (ctxRef.current !== ctx) return;

      if (ctx.state === "suspended") await ctx.resume();

      // Clone the ArrayBuffer — decodeAudioData consumes (detaches) it
      const buffer = await ctx.decodeAudioData(ab.slice(0));

      if (ctxRef.current !== ctx) return;

      const src = ctx.createBufferSource();
      src.buffer = buffer;

      // Use a GainNode so we can fade out the last ~120 ms — eliminates the
      // abrupt breath-cut that happens when the buffer ends suddenly
      const gain = ctx.createGain();
      src.connect(gain);
      gain.connect(ctx.destination);

      const duration = buffer.duration;
      const fadeStart = Math.max(0, ctx.currentTime + duration - 0.12);
      gain.gain.setValueAtTime(1, fadeStart);
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + duration);

      src.onended = () => {
        setState("idle");
        srcRef.current = null;
        // Delay close so the fade tail is audible and the browser doesn't clip it
        setTimeout(() => {
          ctx.close().catch(() => {});
          if (ctxRef.current === ctx) ctxRef.current = null;
        }, 350);
      };

      src.start(0);
      srcRef.current = src;

      // Only show "loading" if the pre-fetch wasn't ready; skip straight to playing
      setState("playing");
    } catch {
      setState("idle");
      setTimeout(() => ctx.close().catch(() => {}), 100);
      if (ctxRef.current === ctx) ctxRef.current = null;
    }
  };

  // ── Render variants ──────────────────────────────────────────────────────

  if (variant === "ghost") {
    return (
      <button
        onClick={handleClick}
        aria-label={`Pronounce ${word}`}
        className={cn(
          "inline-flex items-center justify-center w-7 h-7 rounded-full transition-all duration-200",
          state === "playing"
            ? "bg-primary text-primary-foreground"
            : "bg-background/60 text-muted-foreground border border-border hover:text-primary hover:border-primary hover:bg-primary/5",
          className
        )}
      >
        <Volume2 className={cn("w-3.5 h-3.5", state === "playing" && "animate-pulse")} />
      </button>
    );
  }

  if (variant === "inverted") {
    return (
      <button
        onClick={handleClick}
        aria-label={`Pronounce ${word}`}
        className={cn(
          "inline-flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200",
          state === "playing"
            ? "bg-white/30 text-white"
            : "bg-white/15 hover:bg-white/25 text-white",
          className
        )}
      >
        <Volume2 className={cn("w-4 h-4", state === "playing" && "animate-pulse")} />
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      aria-label={`Pronounce ${word}`}
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border transition-all duration-200",
        state === "playing"
          ? "bg-primary text-primary-foreground border-primary scale-95"
          : "bg-background text-muted-foreground border-border hover:border-primary hover:text-primary hover:bg-primary/5",
        className
      )}
    >
      <Volume2 className={cn("w-4 h-4", state === "playing" && "animate-pulse")} />
      {state === "playing" ? "Playing..." : "Listen"}
    </button>
  );
}
