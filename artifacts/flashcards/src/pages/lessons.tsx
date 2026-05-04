import { useEffect, useMemo, useState, useCallback, useRef, type JSX } from "react";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  CheckCircle2,
  Circle,
  PlayCircle,
  BookOpen,
  AlertCircle,
  RefreshCw,
  ArrowLeft,
  ChevronRight,
  Clock,
  Layers,
  Sparkles,
  Gauge,
  Settings2,
  RotateCcw,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Player from "@vimeo/player";

type CourseKey = "intro" | "advanced";

interface CourseMeta {
  key: CourseKey;
  title: string;
  level: string;
  description: string;
  gradient: string;
  ring: string;
  icon: typeof Layers;
}

const COURSES: CourseMeta[] = [
  {
    key: "intro",
    title: "Brick by Brick",
    level: "A2 – B1",
    description:
      "Build your IELTS foundation step by step — vocabulary habits, sentence skills, and the core strategies you'll use in every section of the exam.",
    gradient: "from-teal-500 via-cyan-500 to-sky-600",
    ring: "ring-teal-500/30",
    icon: Layers,
  },
  {
    key: "advanced",
    title: "The Upper Leap",
    level: "B1 – C1",
    description:
      "Push from a confident intermediate to a top band score — advanced reading techniques, sophisticated writing, and exam-day timing.",
    gradient: "from-violet-500 via-fuchsia-500 to-rose-500",
    ring: "ring-violet-500/30",
    icon: Sparkles,
  },
];

interface LessonItem {
  id: number;
  course: CourseKey | string;
  title: string;
  vimeoUrl: string;
  embedUrl: string;
  orderIndex: number;
  completed: boolean;
}

interface LessonsResponse {
  libraryTitle: string;
  lessons: LessonItem[];
}

function getStudentAuthHeaders(): Record<string, string> {
  try {
    const raw = localStorage.getItem("4ielts_email");
    if (!raw) return {};
    const { email, token } = JSON.parse(raw);
    if (!email || !token) return {};
    return { "X-Student-Email": email, "X-Student-Token": token };
  } catch { return {}; }
}

function extractVimeoId(embedUrl: string): string | null {
  const m = embedUrl.match(/player\.vimeo\.com\/video\/(\d+)/);
  return m ? m[1] : null;
}

const SPEED_OPTIONS = [0.75, 1, 1.25, 1.5];
const QUALITY_OPTIONS = ["auto", "1080p", "720p", "540p", "360p"] as const;
type QualityOption = (typeof QUALITY_OPTIONS)[number];

function getSavedPosition(lessonId: number): number {
  try {
    const v = localStorage.getItem(`lexo:lesson_pos:${lessonId}`);
    return v ? parseFloat(v) || 0 : 0;
  } catch { return 0; }
}

function savePosition(lessonId: number, seconds: number) {
  try {
    localStorage.setItem(`lexo:lesson_pos:${lessonId}`, seconds.toFixed(1));
  } catch { /* ignore */ }
}

function clearPosition(lessonId: number) {
  try {
    localStorage.removeItem(`lexo:lesson_pos:${lessonId}`);
  } catch { /* ignore */ }
}

function formatTime(s: number): string {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

function VimeoPlayer({
  lesson,
  onReady,
}: {
  lesson: LessonItem;
  onReady?: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<Player | null>(null);
  const [playerState, setPlayerState] = useState<"loading" | "ready" | "error">("loading");
  const [buffering, setBuffering] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [quality, setQuality] = useState<QualityOption>("auto");
  const [showControls, setShowControls] = useState(false);
  const [progress, setProgress] = useState({ current: 0, duration: 0 });
  const [retryCount, setRetryCount] = useState(0);
  const saveTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const vid = extractVimeoId(lesson.embedUrl);
  const [useFallbackIframe, setUseFallbackIframe] = useState(false);

  const cleanVimeoUrl = useMemo(() => {
    try {
      const u = new URL(lesson.vimeoUrl);
      u.search = "";
      return u.toString();
    } catch {
      return lesson.vimeoUrl.split("?")[0];
    }
  }, [lesson.vimeoUrl]);

  useEffect(() => {
    if (useFallbackIframe || !containerRef.current || !vid) return;

    const el = containerRef.current;
    el.innerHTML = "";

    const opts: Record<string, unknown> = {
      url: cleanVimeoUrl,
      width: el.clientWidth || 640,
      autoplay: true,
      responsive: true,
      quality: quality === "auto" ? "auto" : quality,
      dnt: true,
      pip: true,
      speed: true,
      title: false,
      byline: false,
      portrait: false,
      badge: false,
    };

    const p = new Player(el, opts);
    playerRef.current = p;

    const readyTimeout = setTimeout(() => {
      setUseFallbackIframe(true);
    }, 15000);

    p.ready()
      .then(async () => {
        clearTimeout(readyTimeout);
        setPlayerState("ready");
        onReady?.();

        try { await p.setPlaybackRate(speed); } catch { /* noop */ }

        const saved = getSavedPosition(lesson.id);
        if (saved > 2) {
          try { await p.setCurrentTime(saved); } catch { /* noop */ }
        }
      })
      .catch(() => {
        clearTimeout(readyTimeout);
        setUseFallbackIframe(true);
      });

    p.on("bufferstart", () => setBuffering(true));
    p.on("bufferend", () => setBuffering(false));

    p.on("timeupdate", (data: { seconds: number; duration: number }) => {
      setProgress({ current: data.seconds, duration: data.duration });
    });

    p.on("ended", () => {
      clearPosition(lesson.id);
    });

    p.on("error", () => {
      clearTimeout(readyTimeout);
      setUseFallbackIframe(true);
    });

    saveTimerRef.current = setInterval(async () => {
      try {
        const t = await p.getCurrentTime();
        if (t > 2) savePosition(lesson.id, t);
      } catch { /* player destroyed */ }
    }, 5000);

    return () => {
      clearTimeout(readyTimeout);
      if (saveTimerRef.current) clearInterval(saveTimerRef.current);
      p.getCurrentTime()
        .then((t) => { if (t > 2) savePosition(lesson.id, t); })
        .catch(() => { /* noop */ });
      p.destroy().catch(() => { /* noop */ });
      playerRef.current = null;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vid, cleanVimeoUrl, retryCount, useFallbackIframe]);

  useEffect(() => {
    const p = playerRef.current;
    if (!p || playerState !== "ready") return;
    p.setPlaybackRate(speed).catch(() => { /* noop */ });
  }, [speed, playerState]);

  useEffect(() => {
    if (quality === "auto" || !playerRef.current || playerState !== "ready") return;
    playerRef.current.setQuality(quality).catch(() => { /* noop */ });
  }, [quality, playerState]);

  const handleRetry = () => {
    setPlayerState("loading");
    setRetryCount((c) => c + 1);
  };

  const savedPos = getSavedPosition(lesson.id);
  const pct = progress.duration > 0 ? (progress.current / progress.duration) * 100 : 0;

  if (useFallbackIframe) {
    return (
      <div className="space-y-0">
        <div className="relative bg-black rounded-lg overflow-hidden" style={{ paddingTop: "56.25%" }}>
          <iframe
            src={`${lesson.embedUrl}${lesson.embedUrl.includes("?") ? "&" : "?"}autoplay=1&quality=auto&speed=1&title=0&byline=0&portrait=0&badge=0&dnt=1`}
            className="absolute inset-0 w-full h-full"
            title={lesson.title}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-0">
      <div className="relative bg-black rounded-t-lg overflow-hidden" style={{ paddingTop: "56.25%" }}>
        <div ref={containerRef} className="absolute inset-0 w-full h-full [&>div]:!w-full [&>div]:!h-full [&>iframe]:!w-full [&>iframe]:!h-full" />

        {playerState === "loading" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 z-10">
            <Loader2 className="w-10 h-10 text-white animate-spin mb-3" />
            <span className="text-white/80 text-sm font-medium">Loading video…</span>
            {savedPos > 2 && (
              <span className="text-white/60 text-xs mt-1">
                Resuming from {formatTime(savedPos)}
              </span>
            )}
          </div>
        )}

        {buffering && playerState === "ready" && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 z-10 pointer-events-none">
            <Loader2 className="w-8 h-8 text-white animate-spin" />
          </div>
        )}
      </div>

      {progress.duration > 0 && (
        <div className="h-1 bg-muted/30 rounded-none overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${pct}%` }}
          />
        </div>
      )}

      {playerState === "ready" && (
        <div className="flex items-center justify-between gap-2 px-3 py-2 bg-card/80 border-x border-b border-border rounded-b-lg">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            {progress.duration > 0 && (
              <span className="font-mono tabular-nums">
                {formatTime(progress.current)} / {formatTime(progress.duration)}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setShowControls((v) => !v)}
              className={cn(
                "inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors",
                showControls
                  ? "bg-primary/15 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
              title="Playback settings"
            >
              <Settings2 className="w-3.5 h-3.5" />
              Settings
            </button>
          </div>
        </div>
      )}

      {showControls && playerState === "ready" && (
        <div className="border border-t-0 border-border rounded-b-lg bg-card/60 backdrop-blur-sm px-4 py-3 space-y-3 -mt-[1px]">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground shrink-0">
              <Gauge className="w-3.5 h-3.5" />
              Speed
            </div>
            <div className="flex gap-1">
              {SPEED_OPTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => setSpeed(s)}
                  className={cn(
                    "px-2.5 py-1 rounded-md text-xs font-bold transition-colors",
                    speed === s
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  {s === 1 ? "1x" : `${s}x`}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground shrink-0">
              <Settings2 className="w-3.5 h-3.5" />
              Quality
            </div>
            <div className="flex gap-1 flex-wrap">
              {QUALITY_OPTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => setQuality(q)}
                  className={cn(
                    "px-2.5 py-1 rounded-md text-xs font-bold transition-colors capitalize",
                    quality === q
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  {q === "auto" ? "Auto" : q === "1080p" ? "HD" : q === "720p" ? "720p" : q === "540p" ? "SD" : "Low"}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const SELECTED_COURSE_KEY = "lexo:selected_course";

export default function Lessons() {
  const [data, setData] = useState<LessonsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pendingId, setPendingId] = useState<number | null>(null);
  const [activeVideoId, setActiveVideoId] = useState<number | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<CourseKey | null>(() => {
    try {
      const v = sessionStorage.getItem(SELECTED_COURSE_KEY);
      return v === "intro" || v === "advanced" ? v : null;
    } catch { return null; }
  });

  useEffect(() => {
    try {
      if (selectedCourse) sessionStorage.setItem(SELECTED_COURSE_KEY, selectedCourse);
      else sessionStorage.removeItem(SELECTED_COURSE_KEY);
    } catch { /* ignore */ }
  }, [selectedCourse]);

  const fetchLessons = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/lessons", { headers: getStudentAuthHeaders() });
      if (res.status === 401) {
        setError("Please log in to view your lessons.");
        setLoading(false);
        return;
      }
      if (!res.ok) throw new Error("Failed to load lessons");
      const json = (await res.json()) as LessonsResponse;
      setData(json);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load lessons.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { void fetchLessons(); }, [fetchLessons]);

  async function toggleComplete(lesson: LessonItem) {
    if (pendingId !== null) return;
    setPendingId(lesson.id);
    const newCompleted = !lesson.completed;
    setData((prev) => prev ? {
      ...prev,
      lessons: prev.lessons.map((l) => l.id === lesson.id ? { ...l, completed: newCompleted } : l),
    } : prev);
    try {
      const res = await fetch(`/api/lessons/${lesson.id}/complete`, {
        method: newCompleted ? "POST" : "DELETE",
        headers: getStudentAuthHeaders(),
      });
      if (!res.ok) throw new Error();
    } catch {
      setData((prev) => prev ? {
        ...prev,
        lessons: prev.lessons.map((l) => l.id === lesson.id ? { ...l, completed: !newCompleted } : l),
      } : prev);
    } finally {
      setPendingId(null);
    }
  }

  const byCourse = useMemo(() => {
    const map: Record<CourseKey, LessonItem[]> = { intro: [], advanced: [] };
    if (!data) return map;
    for (const l of data.lessons) {
      const k: CourseKey = l.course === "advanced" ? "advanced" : "intro";
      map[k].push(l);
    }
    for (const k of Object.keys(map) as CourseKey[]) {
      map[k].sort((a, b) => a.orderIndex - b.orderIndex || a.id - b.id);
    }
    return map;
  }, [data]);

  if (loading) {
    return (
      <Layout>
        <div className="text-center py-20 text-muted-foreground">
          <Loader2 className="w-8 h-8 mx-auto mb-3 animate-spin opacity-60" />
          Loading your courses…
        </div>
      </Layout>
    );
  }
  if (error) {
    return (
      <Layout>
        <div className="flex items-start gap-3 p-4 rounded-2xl bg-destructive/10 border border-destructive/30 text-destructive text-sm">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <p>{error}</p>
        </div>
      </Layout>
    );
  }

  if (selectedCourse) {
    const meta = COURSES.find((c) => c.key === selectedCourse)!;
    const lessons = byCourse[selectedCourse];
    const completedCount = lessons.filter((l) => l.completed).length;
    const totalCount = lessons.length;
    const pct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
    const Icon = meta.icon;

    return (
      <Layout>
        <div className="space-y-5">
          <button
            onClick={() => { setSelectedCourse(null); setActiveVideoId(null); }}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            All courses
          </button>

          <div className={cn("relative overflow-hidden rounded-3xl p-6 sm:p-7 text-white bg-gradient-to-br", meta.gradient)}>
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <div className="absolute -right-16 -top-16 w-56 h-56 rounded-full bg-white/30 blur-3xl" />
              <div className="absolute -left-12 bottom-0 w-44 h-44 rounded-full bg-black/20 blur-2xl" />
            </div>
            <div className="relative">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-white/95 text-[11px] font-bold uppercase tracking-wider mb-3">
                <Icon className="w-3.5 h-3.5" />
                {meta.level}
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold leading-tight mb-1.5">{meta.title}</h1>
              <p className="text-white/85 text-sm max-w-2xl">{meta.description}</p>
            </div>
          </div>

          {totalCount > 0 && (
            <div className="bg-card border border-border rounded-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span className="font-bold text-foreground">{completedCount}</span>
                  <span className="text-muted-foreground">/ {totalCount} lessons completed</span>
                </div>
                <span className="text-sm font-bold text-primary">{pct}%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-primary to-primary/70 transition-all" style={{ width: `${pct}%` }} />
              </div>
            </div>
          )}

          <div className="flex justify-end">
            <Button variant="outline" size="sm" onClick={() => void fetchLessons()} className="rounded-full">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>

          {totalCount === 0 && (
            <div className="bg-card border border-dashed border-border rounded-3xl p-10 text-center space-y-3">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-muted flex items-center justify-center">
                <Clock className="w-7 h-7 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-extrabold text-foreground">Coming soon</h3>
              <p className="text-sm text-muted-foreground max-w-md mx-auto">
                The lessons for <b>{meta.title}</b> are being prepared. Check back here shortly — they'll appear automatically as soon as your instructor adds them.
              </p>
              <p className="text-xs text-muted-foreground" dir="rtl" lang="ar">قريباً — سيتم إضافة الدروس قريباً</p>
            </div>
          )}

          {lessons.map((lesson, idx) => (
            <article
              key={lesson.id}
              className={cn(
                "bg-card border rounded-2xl overflow-hidden transition-colors",
                lesson.completed ? "border-green-300 dark:border-green-800" : "border-border"
              )}
            >
              <div className="px-5 pt-5 pb-3 flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 min-w-0">
                  <span className="shrink-0 w-8 h-8 rounded-full bg-muted text-muted-foreground text-sm font-bold flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <h2 className="text-base font-bold text-foreground leading-snug pt-1">{lesson.title}</h2>
                </div>
                {lesson.completed && (
                  <span className="shrink-0 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300">
                    <CheckCircle2 className="w-3 h-3" />
                    Done
                  </span>
                )}
              </div>

              <div className="px-5 pb-4">
                {activeVideoId === lesson.id ? (
                  <VimeoPlayer lesson={lesson} />
                ) : (
                  <div className="relative bg-black rounded-lg overflow-hidden" style={{ paddingTop: "56.25%" }}>
                    <button
                      type="button"
                      onClick={() => setActiveVideoId(lesson.id)}
                      className="absolute inset-0 w-full h-full flex flex-col items-center justify-center gap-3 group cursor-pointer bg-gradient-to-b from-gray-900 to-black"
                      aria-label={`Play ${lesson.title}`}
                    >
                      {(() => {
                        const id = extractVimeoId(lesson.embedUrl);
                        return id ? (
                          <img
                            src={`https://vumbnail.com/${id}.jpg`}
                            alt=""
                            className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity"
                            loading="lazy"
                          />
                        ) : null;
                      })()}
                      <div className="relative z-10 w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/30 group-hover:scale-110 transition-all shadow-lg">
                        <PlayCircle className="w-10 h-10 text-white drop-shadow-md" />
                      </div>
                      <span className="relative z-10 text-white/80 text-sm font-medium group-hover:text-white transition-colors">
                        Tap to play
                      </span>
                      {getSavedPosition(lesson.id) > 2 && (
                        <span className="relative z-10 text-white/60 text-xs">
                          Resume from {formatTime(getSavedPosition(lesson.id))}
                        </span>
                      )}
                    </button>
                  </div>
                )}
              </div>

              <div className="px-5 pb-4 flex items-center justify-end">
                <Button
                  onClick={() => void toggleComplete(lesson)}
                  disabled={pendingId === lesson.id}
                  variant={lesson.completed ? "outline" : "default"}
                  className={cn(
                    "rounded-full",
                    lesson.completed && "border-green-300 text-green-700 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20"
                  )}
                >
                  {pendingId === lesson.id ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : lesson.completed ? (
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                  ) : (
                    <Circle className="w-4 h-4 mr-2" />
                  )}
                  {lesson.completed ? "Completed" : "Mark as completed"}
                </Button>
              </div>
            </article>
          ))}
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
              <PlayCircle className="w-6 h-6 text-primary" />
            </div>
            <div className="min-w-0">
              <h1 className="text-2xl font-extrabold text-foreground truncate">Lessons</h1>
              <p className="text-sm text-muted-foreground">
                Choose your course and learn at your own pace.
              </p>
              <p className="text-xs text-muted-foreground mt-0.5" dir="rtl" lang="ar">اختر مسارك وابدأ التعلّم</p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={() => void fetchLessons()} className="rounded-full shrink-0">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {COURSES.map((c) => {
            const lessons = byCourse[c.key];
            const total = lessons.length;
            const done = lessons.filter((l) => l.completed).length;
            const Icon = c.icon;
            return (
              <button
                key={c.key}
                onClick={() => setSelectedCourse(c.key)}
                className={cn(
                  "group text-left relative overflow-hidden rounded-3xl p-6 text-white bg-gradient-to-br shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 ring-1 ring-white/10",
                  c.gradient
                )}
              >
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                  <div className="absolute -right-12 -top-12 w-48 h-48 rounded-full bg-white/30 blur-3xl" />
                  <div className="absolute -left-10 bottom-0 w-40 h-40 rounded-full bg-black/20 blur-2xl" />
                </div>

                <div className="relative">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-white/95 text-[11px] font-bold uppercase tracking-wider">
                      <Icon className="w-3.5 h-3.5" />
                      {c.level}
                    </div>
                    {total === 0 ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full bg-white/20">
                        <Clock className="w-3 h-3" />
                        Coming soon
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full bg-white/20">
                        <BookOpen className="w-3 h-3" />
                        {total} {total === 1 ? "lesson" : "lessons"}
                      </span>
                    )}
                  </div>

                  <h2 className="text-2xl font-extrabold leading-tight mb-1.5">{c.title}</h2>
                  <p className="text-white/85 text-sm leading-relaxed mb-5">{c.description}</p>

                  {total > 0 && (
                    <div className="mb-5">
                      <div className="flex items-center justify-between text-[11px] font-semibold text-white/85 mb-1.5">
                        <span>{done} / {total} completed</span>
                        <span>{Math.round((done / total) * 100)}%</span>
                      </div>
                      <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
                        <div className="h-full bg-white transition-all" style={{ width: `${(done / total) * 100}%` }} />
                      </div>
                    </div>
                  )}

                  <div className="inline-flex items-center gap-1.5 text-sm font-bold text-white/95 group-hover:gap-2.5 transition-all">
                    {total === 0 ? "Take a peek" : "Start watching"}
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
