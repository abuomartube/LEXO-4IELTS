import { useState, useRef, useEffect } from "react";
import { Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";

// Module-level cache — one AudioBuffer per word, persists for the whole session
const ttsCache = new Map<string, AudioBuffer>();

interface PronounceButtonProps {
  word: string;
  className?: string;
  variant?: "default" | "ghost" | "inverted";
}

export function PronounceButton({ word, className, variant = "default" }: PronounceButtonProps) {
  const [state, setState] = useState<"idle" | "loading" | "playing">("idle");
  const ctxRef = useRef<AudioContext | null>(null);
  const srcRef = useRef<AudioBufferSourceNode | null>(null);

  const cleanup = () => {
    try { srcRef.current?.stop(); } catch { /* ok */ }
    ctxRef.current?.close().catch(() => {});
    ctxRef.current = null;
    srcRef.current = null;
  };

  useEffect(() => () => cleanup(), []);

  const handleClick = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (state !== "idle") {
      cleanup();
      setState("idle");
      return;
    }

    // Create AudioContext during user gesture — no expiry risk
    const ctx = new AudioContext();
    ctxRef.current = ctx;
    setState("loading");

    try {
      const key = word.toLowerCase().trim();
      let buffer = ttsCache.get(key) ?? null;

      if (!buffer) {
        const res = await fetch("/api/speaking/tts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          // tts-1-hd = highest quality native speaker voice; single word is very fast (~1s)
          body: JSON.stringify({ text: word, speed: 0.9, model: "tts-1-hd" }),
        });
        if (!res.ok) throw new Error("tts_failed");
        const ab = await res.arrayBuffer();
        if (ctx.state === "closed") return;
        buffer = await ctx.decodeAudioData(ab);
        ttsCache.set(key, buffer);
      }

      if (ctx.state === "suspended") await ctx.resume();

      const src = ctx.createBufferSource();
      src.buffer = buffer;
      src.connect(ctx.destination);
      src.onended = () => {
        setState("idle");
        ctx.close().catch(() => {});
        ctxRef.current = null;
        srcRef.current = null;
      };
      src.start(0);
      srcRef.current = src;
      setState("playing");
    } catch {
      setState("idle");
      ctx.close().catch(() => {});
      ctxRef.current = null;
    }
  };

  if (variant === "ghost") {
    return (
      <button
        onClick={handleClick}
        aria-label={`Pronounce ${word}`}
        className={cn(
          "inline-flex items-center justify-center w-7 h-7 rounded-full transition-all duration-200",
          state === "playing"
            ? "bg-primary text-primary-foreground"
            : state === "loading"
            ? "bg-muted text-muted-foreground"
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
            : state === "loading"
            ? "bg-white/10 text-white/50"
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
          : state === "loading"
          ? "bg-muted border-muted text-muted-foreground"
          : "bg-background text-muted-foreground border-border hover:border-primary hover:text-primary hover:bg-primary/5",
        className
      )}
    >
      <Volume2 className={cn("w-4 h-4", state === "playing" && "animate-pulse")} />
      {state === "loading" ? "Loading..." : state === "playing" ? "Playing..." : "Listen"}
    </button>
  );
}
