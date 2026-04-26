import { useEffect, useState } from "react";
import { Link } from "wouter";
import { customFetch } from "@workspace/api-client-react";
import { CalendarDays, ClipboardList, X, CheckCircle2, Circle, Clock, ArrowRight, RotateCcw, LayoutGrid, Download, Loader2 } from "lucide-react";
import { downloadPlanPdf } from "@/lib/plan-pdf-client";
import {
  clearAllCompletions,
  ensurePlanStartDate,
  getPlanDayIndex,
  getScheduledDayTasks,
  getTodayCompleted,
  markTaskDone,
  unmarkTaskDone,
  daysUntilExam,
  levelLabel,
  todayISO,
  type PlanDuration,
  type ScheduledTask,
} from "@/lib/daily-plan";
import { PlanDurationPicker } from "@/components/plan-duration-picker";

function useUserPlanData() {
  const [level, setLevel] = useState<string | null>(null);
  const [examDate, setExamDate] = useState<string | null>(null);
  const [planStartISO, setPlanStartISO] = useState<string>(() => ensurePlanStartDate(undefined));
  const [loading, setLoading] = useState(true);
  const [refreshTick, setRefreshTick] = useState(0);
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [lvlRes, dateRes, startRes] = await Promise.all([
          customFetch<{ value: string }>("/api/user-data/current_level").catch(() => null),
          customFetch<{ value: string }>("/api/user-data/exam_date").catch(() => null),
          customFetch<{ value: string }>("/api/user-data/plan_start_date").catch(() => null),
        ]);
        if (cancelled) return;
        setLevel(lvlRes?.value || null);
        setExamDate(dateRes?.value || null);
        setPlanStartISO(ensurePlanStartDate(startRes?.value));
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [refreshTick]);
  useEffect(() => {
    const refresh = () => setRefreshTick((t) => t + 1);
    window.addEventListener("lexo:plan-updated", refresh);
    return () => window.removeEventListener("lexo:plan-updated", refresh);
  }, []);
  return { level, examDate, planStartISO, loading };
}

function useCompletedSet() {
  const [completed, setCompleted] = useState<Set<string>>(() => getTodayCompleted());
  useEffect(() => {
    const refresh = () => setCompleted(getTodayCompleted());
    window.addEventListener("lexo:plan-updated", refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener("lexo:plan-updated", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);
  return completed;
}

export function MyPlanButton() {
  const [open, setOpen] = useState(false);
  const { level, examDate, planStartISO, loading } = useUserPlanData();
  const completed = useCompletedSet();
  const [resetOpen, setResetOpen] = useState(false);
  const [resetDuration, setResetDuration] = useState<PlanDuration | null>(90);
  const [resetting, setResetting] = useState(false);
  const [resetError, setResetError] = useState(false);
  const [pdfBusy, setPdfBusy] = useState(false);
  const [pdfError, setPdfError] = useState<string | null>(null);

  async function handleDownloadPdf() {
    if (!level) return;
    setPdfBusy(true);
    setPdfError(null);
    try {
      await downloadPlanPdf({ level, examDate, startISO: planStartISO });
    } catch (e) {
      setPdfError(e instanceof Error ? e.message : "Could not download PDF.");
    } finally {
      setPdfBusy(false);
    }
  }

  async function handleReset() {
    if (!resetDuration) return;
    setResetting(true);
    setResetError(false);
    try {
      await Promise.all([
        customFetch("/api/user-data/plan_duration_days", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ value: String(resetDuration) }),
        }),
        customFetch("/api/user-data/plan_start_date", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ value: todayISO() }),
        }),
      ]);
      clearAllCompletions();
      setResetOpen(false);
      setOpen(false);
    } catch {
      setResetError(true);
    } finally {
      setResetting(false);
    }
  }

  const planDayIndex = Math.max(1, getPlanDayIndex(planStartISO, new Date()));
  const tasks = getScheduledDayTasks(level, planStartISO, planDayIndex);
  const doneCount = tasks.filter((t) => completed.has(t.id)).length;
  const totalCount = tasks.length;
  const days = daysUntilExam(examDate);

  // Hide if user hasn't set a level yet (onboarding not done)
  if (!loading && !level) return null;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Open my daily plan"
        className="fixed top-4 right-4 z-40 inline-flex items-center gap-2 px-4 h-10 rounded-full bg-gradient-to-br from-teal-500 to-sky-600 text-white shadow-lg shadow-teal-500/30 hover:shadow-xl hover:scale-105 transition-all focus:outline-none focus-visible:ring-4 focus-visible:ring-teal-500/40"
      >
        <ClipboardList className="w-4 h-4" />
        <span className="text-sm font-bold">My Plan</span>
        {totalCount > 0 && (
          <span className="ml-1 inline-flex items-center justify-center min-w-[1.5rem] h-5 px-1.5 rounded-full bg-white/25 text-[11px] font-extrabold tabular-nums">
            {doneCount}/{totalCount}
          </span>
        )}
      </button>

      {open && (
        <div className="fixed inset-0 z-[70] flex" role="dialog" aria-modal="true" aria-label="Today's study plan">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in"
            onClick={() => setOpen(false)}
          />
          <div className="relative ml-auto h-full w-full sm:w-[420px] bg-card border-l border-border shadow-2xl flex flex-col animate-in slide-in-from-right duration-200">
            {/* header */}
            <div className="px-5 py-4 border-b border-border flex items-center justify-between bg-gradient-to-br from-teal-500 to-sky-600 text-white">
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-widest opacity-80">Today's Plan</p>
                <h2 className="text-lg font-extrabold leading-tight">My Study Plan</h2>
                <p className="text-xs opacity-90">{levelLabel(level)}</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-9 h-9 rounded-lg bg-white/15 hover:bg-white/25 flex items-center justify-center transition-colors"
                aria-label="Close plan"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* exam countdown + progress */}
            <div className="px-5 py-4 border-b border-border bg-muted/30 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center shrink-0">
                  <CalendarDays className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                </div>
                <div className="min-w-0 flex-1">
                  {days !== null ? (
                    <>
                      <p className="text-2xl font-extrabold text-foreground leading-none">
                        {days} <span className="text-sm font-semibold text-muted-foreground">day{days === 1 ? "" : "s"} left</span>
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">until your IELTS exam</p>
                    </>
                  ) : (
                    <>
                      <p className="text-base font-bold text-foreground">Exam date not set</p>
                      <p className="text-xs text-muted-foreground">Set it in onboarding to see countdown.</p>
                    </>
                  )}
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-semibold text-muted-foreground">Today's progress</span>
                  <span className="text-xs font-bold text-foreground tabular-nums">{doneCount} / {totalCount}</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-teal-500 to-sky-500 transition-all duration-500"
                    style={{ width: `${totalCount > 0 ? (doneCount / totalCount) * 100 : 0}%` }}
                  />
                </div>
              </div>
            </div>

            {/* task list */}
            <div className="flex-1 overflow-y-auto px-3 py-3 space-y-2">
              {tasks.map((task, i) => (
                <PlanTaskRow
                  key={task.id}
                  task={task}
                  index={i}
                  done={completed.has(task.id)}
                  onClose={() => setOpen(false)}
                />
              ))}
              {doneCount === totalCount && totalCount > 0 && (
                <div className="mt-4 p-4 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border border-emerald-200 dark:border-emerald-800 text-center">
                  <div className="text-3xl mb-1">🎉</div>
                  <p className="font-extrabold text-emerald-700 dark:text-emerald-300">Day complete!</p>
                  <p className="text-xs text-muted-foreground mt-1">Great work — come back tomorrow for a fresh plan.</p>
                </div>
              )}
            </div>

            <div className="px-5 py-3 border-t border-border bg-muted/30 space-y-2">
              <div className="flex gap-2">
                <Link
                  href="/plan"
                  onClick={() => setOpen(false)}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-bold hover:opacity-90 transition-opacity"
                >
                  <LayoutGrid className="w-4 h-4" />
                  View Full Plan
                </Link>
                <button
                  onClick={() => { setResetError(false); setResetOpen(true); }}
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-muted text-foreground text-sm font-bold hover:bg-muted/70 transition-colors border border-border"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset
                </button>
              </div>
              <button
                onClick={handleDownloadPdf}
                disabled={pdfBusy || !level}
                className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-card border border-border text-foreground text-sm font-bold hover:border-primary/40 transition-colors disabled:opacity-50"
              >
                {pdfBusy ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                {pdfBusy ? "Preparing PDF..." : "Download Plan (PDF)"}
              </button>
              {pdfError && (
                <p className="text-[11px] text-red-600 dark:text-red-400 text-center">{pdfError}</p>
              )}
              <p className="text-[11px] text-muted-foreground text-center">
                The plan rotates every day so you cover every section across the week.
              </p>
            </div>
          </div>
        </div>
      )}

      {resetOpen && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Reset study plan">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in"
            onClick={() => { if (!resetting) setResetOpen(false); }}
          />
          <div className="relative w-full max-w-md bg-card border border-border rounded-2xl shadow-2xl p-5 space-y-4 animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center shrink-0">
                <RotateCcw className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="text-lg font-extrabold text-foreground">Reset your study plan?</h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  This clears all your task completions and starts a fresh plan today.
                </p>
              </div>
              <button
                onClick={() => { if (!resetting) setResetOpen(false); }}
                disabled={resetting}
                className="w-8 h-8 rounded-lg hover:bg-muted flex items-center justify-center transition-colors disabled:opacity-50"
                aria-label="Close reset dialog"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div>
              <p className="text-sm font-bold text-foreground mb-2">Pick a new duration:</p>
              <PlanDurationPicker value={resetDuration} onSelect={setResetDuration} />
            </div>

            {resetError && (
              <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-xl px-3 py-2 text-xs text-red-700 dark:text-red-400 text-center">
                Failed to reset. Please try again.
              </div>
            )}

            <div className="flex gap-2">
              <button
                onClick={() => setResetOpen(false)}
                disabled={resetting}
                className="flex-1 px-3 py-2.5 rounded-xl bg-muted text-foreground text-sm font-bold hover:bg-muted/70 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleReset}
                disabled={resetting || !resetDuration}
                className="flex-1 px-3 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-bold hover:opacity-90 transition-opacity disabled:opacity-50 inline-flex items-center justify-center gap-1.5"
              >
                {resetting ? "Resetting..." : resetError ? "Retry" : "Reset Plan"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function PlanTaskRow({ task, index, done, onClose }: { task: ScheduledTask; index: number; done: boolean; onClose: () => void }) {
  const toggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (done) unmarkTaskDone(task.id);
    else markTaskDone(task.id);
  };

  const linkHref = task.scheduled?.href ?? (task.hash ? `${task.href}${task.hash}` : task.href);
  const subtitle = task.scheduled?.title ?? task.arabicLabel;
  const subtitleIsArabic = !task.scheduled;

  return (
    <div
      className={`group rounded-2xl border transition-all overflow-hidden ${
        done
          ? "bg-muted/40 border-border opacity-70"
          : "bg-card border-border hover:border-primary/40 hover:shadow-md"
      }`}
    >
      <div className="flex items-stretch">
        <button
          onClick={toggle}
          aria-label={done ? `Mark ${task.label} as not done` : `Mark ${task.label} as done`}
          className={`shrink-0 w-12 flex items-center justify-center transition-colors ${
            done ? "bg-emerald-500/10 text-emerald-600" : "bg-muted/50 text-muted-foreground hover:bg-muted"
          }`}
        >
          {done ? <CheckCircle2 className="w-5 h-5" /> : <Circle className="w-5 h-5" />}
        </button>

        <Link
          href={linkHref}
          onClick={onClose}
          className="flex-1 flex items-center gap-3 px-3 py-3 min-w-0"
        >
          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${task.color} flex items-center justify-center shrink-0 text-lg shadow-sm`}>
            <span aria-hidden>{task.emoji}</span>
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-[10px] font-bold text-muted-foreground tabular-nums">{index + 1}.</span>
              <p className={`font-bold text-sm truncate ${done ? "line-through text-muted-foreground" : "text-foreground"}`}>
                {task.label}
              </p>
            </div>
            <p
              className="text-xs text-muted-foreground truncate"
              {...(subtitleIsArabic ? { dir: "rtl", lang: "ar" } : {})}
              title={subtitle}
            >
              {subtitle}
            </p>
            <div className="flex items-center gap-1 mt-0.5 text-[11px] text-muted-foreground">
              <Clock className="w-3 h-3" />
              <span>~{task.estimatedMinutes} min</span>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0" />
        </Link>
      </div>
    </div>
  );
}
