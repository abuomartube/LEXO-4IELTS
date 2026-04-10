import { useState, useRef, useEffect, useCallback } from "react";
import { Layout } from "@/components/layout";
import {
  BookOpen, ChevronLeft, EyeOff, Eye, Loader2, BookMarked,
  Play, Pause, Square, Volume2, Mic,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";

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

function VoiceReader({ content }: { content: string }) {
  const [speed, setSpeed] = useState<SpeedValue>(1.0);
  const [playerState, setPlayerState] = useState<PlayerState>("idle");
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const blobUrlRef = useRef<string | null>(null);

  const cleanupAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
      audioRef.current = null;
    }
    if (blobUrlRef.current) {
      URL.revokeObjectURL(blobUrlRef.current);
      blobUrlRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => cleanupAudio();
  }, [cleanupAudio]);

  const handlePlay = async () => {
    setError(null);

    if (playerState === "paused" && audioRef.current) {
      await audioRef.current.play();
      setPlayerState("playing");
      return;
    }

    cleanupAudio();
    setPlayerState("loading");

    try {
      const res = await fetch("/api/speaking/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: content, speed }),
      });

      if (!res.ok) {
        throw new Error("Failed to generate audio");
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      blobUrlRef.current = url;

      const audio = new Audio(url);
      audioRef.current = audio;

      audio.onended = () => {
        setPlayerState("idle");
        cleanupAudio();
      };

      audio.onerror = () => {
        setPlayerState("idle");
        setError("Playback error. Please try again.");
        cleanupAudio();
      };

      await audio.play();
      setPlayerState("playing");
    } catch {
      setPlayerState("idle");
      setError("Could not load audio. Please try again.");
      cleanupAudio();
    }
  };

  const handlePause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setPlayerState("paused");
    }
  };

  const handleStop = () => {
    cleanupAudio();
    setPlayerState("idle");
    setError(null);
  };

  const handleSpeedChange = (newSpeed: SpeedValue) => {
    setSpeed(newSpeed);
    if (playerState === "playing" || playerState === "paused") {
      handleStop();
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

function StoryReader({ story, onBack }: { story: Story; onBack: () => void }) {
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

        {/* English Content */}
        <div className="p-6 md:p-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-5 rounded-full bg-primary" />
            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">English</span>
          </div>
          <div
            className="text-base leading-[2] text-foreground whitespace-pre-wrap"
            lang="en"
          >
            {story.content}
          </div>
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
      </div>
    </div>
  );
}

function StoryCard({ story, onClick }: { story: Story; onClick: () => void }) {
  const preview = story.content.slice(0, 110).trim() + "…";

  return (
    <button
      onClick={onClick}
      className={`text-left bg-card border-2 rounded-2xl p-5 transition-all hover:shadow-md hover:-translate-y-0.5 hover:border-primary/40 active:scale-[0.99] ${levelBorder[story.level]}`}
    >
      <div className="flex items-center justify-between gap-2 mb-3">
        <LevelBadge level={story.level} />
        <BookOpen className="w-4 h-4 text-muted-foreground" />
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

  if (selectedStory) {
    return (
      <Layout>
        <div className="max-w-3xl mx-auto">
          <StoryReader story={selectedStory} onBack={() => setSelectedStory(null)} />
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
              />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
