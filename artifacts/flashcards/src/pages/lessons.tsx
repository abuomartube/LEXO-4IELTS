import { useEffect, useState, useCallback } from "react";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle2, Circle, PlayCircle, BookOpen, AlertCircle, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

interface LessonItem {
  id: number;
  title: string;
  vimeoUrl: string;
  embedUrl: string;
  orderIndex: number;
  completed: boolean;
}

interface LessonsResponse {
  course: "intro" | "advanced";
  courseTitleAr: string;
  courseTitleEn: string;
  courseSubtitle: string;
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

export default function Lessons() {
  const [data, setData] = useState<LessonsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pendingId, setPendingId] = useState<number | null>(null);

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
    // Optimistic update
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
      // Revert on failure
      setData((prev) => prev ? {
        ...prev,
        lessons: prev.lessons.map((l) => l.id === lesson.id ? { ...l, completed: !newCompleted } : l),
      } : prev);
    } finally {
      setPendingId(null);
    }
  }

  const completedCount = data?.lessons.filter((l) => l.completed).length ?? 0;
  const totalCount = data?.lessons.length ?? 0;
  const pct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
              <PlayCircle className="w-6 h-6 text-primary" />
            </div>
            <div className="min-w-0">
              <h1 className="text-2xl font-extrabold text-foreground truncate">
                {data ? data.courseTitleAr : "Lessons"}
              </h1>
              {data && (
                <p className="text-sm text-muted-foreground">
                  {data.courseTitleEn} · {data.courseSubtitle}
                </p>
              )}
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={() => void fetchLessons()} disabled={loading} className="rounded-full shrink-0">
            <RefreshCw className={cn("w-4 h-4 mr-2", loading && "animate-spin")} />
            Refresh
          </Button>
        </div>

        {/* Progress strip */}
        {data && totalCount > 0 && (
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
              <div
                className="h-full bg-gradient-to-r from-primary to-primary/70 transition-all"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        )}

        {loading && (
          <div className="text-center py-16 text-muted-foreground">
            <Loader2 className="w-8 h-8 mx-auto mb-3 animate-spin opacity-60" />
            Loading your course…
          </div>
        )}

        {error && !loading && (
          <div className="flex items-start gap-3 p-4 rounded-2xl bg-destructive/10 border border-destructive/30 text-destructive text-sm">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <p>{error}</p>
          </div>
        )}

        {!loading && data && totalCount === 0 && (
          <div className="bg-card border border-border rounded-2xl p-10 text-center space-y-3">
            <BookOpen className="w-10 h-10 mx-auto text-muted-foreground/60" />
            <h3 className="font-bold text-foreground">No lessons yet</h3>
            <p className="text-sm text-muted-foreground">
              Your instructor hasn't added any lessons for this course yet. Check back soon!
            </p>
          </div>
        )}

        {/* Lesson list */}
        {!loading && data && data.lessons.map((lesson, idx) => (
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
                <h2 className="text-base font-bold text-foreground leading-snug pt-1">
                  {lesson.title}
                </h2>
              </div>
              {lesson.completed && (
                <span className="shrink-0 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300">
                  <CheckCircle2 className="w-3 h-3" />
                  Done
                </span>
              )}
            </div>

            <div className="relative bg-black" style={{ paddingTop: "56.25%" }}>
              <iframe
                src={lesson.embedUrl}
                className="absolute inset-0 w-full h-full"
                title={lesson.title}
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            </div>

            <div className="p-4 flex items-center justify-end">
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
