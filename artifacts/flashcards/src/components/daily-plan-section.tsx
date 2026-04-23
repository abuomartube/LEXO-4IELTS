import { useEffect, useState } from "react";
import { Link } from "wouter";
import { customFetch } from "@workspace/api-client-react";
import { CalendarDays, ClipboardList, CheckCircle2, Circle, ArrowRight, TrendingUp, Clock } from "lucide-react";
import {
  getDailyPlan,
  getWeeklySections,
  getTodayCompleted,
  getWeeklyCompletionCount,
  getWeeklyScheduledCount,
  markTaskDone,
  unmarkTaskDone,
  daysUntilExam,
  levelLabel,
  type PlanTask,
} from "@/lib/daily-plan";

const WEEKDAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export function DailyPlanSection() {
  const [level, setLevel] = useState<string | null>(null);
  const [examDate, setExamDate] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [completed, setCompleted] = useState<Set<string>>(() => getTodayCompleted());
  const [refreshTick, setRefreshTick] = useState(0);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [lvlRes, dateRes] = await Promise.all([
          customFetch<{ value: string }>("/api/user-data/current_level").catch(() => null),
          customFetch<{ value: string }>("/api/user-data/exam_date").catch(() => null),
        ]);
        if (cancelled) return;
        setLevel(lvlRes?.value ?? null);
        setExamDate(dateRes?.value ?? null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    const refresh = () => {
      setCompleted(getTodayCompleted());
      setRefreshTick((t) => t + 1);
    };
    window.addEventListener("lexo:plan-updated", refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener("lexo:plan-updated", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  if (loading) {
    return <div className="h-64 bg-muted animate-pulse rounded-3xl" />;
  }
  if (!level) {
    return null; // user hasn't completed onboarding
  }

  const today = new Date();
  const tasks = getDailyPlan(level, today);
  const weeklyPool = getWeeklySections(level);
  const days = daysUntilExam(examDate);
  const doneCount = tasks.filter((t) => completed.has(t.id)).length;
  const totalCount = tasks.length;
  const dayName = WEEKDAY_NAMES[today.getDay()];

  return (
    <section className="space-y-6" data-tour="daily-plan">
      {/* ── Top hero card: countdown + today's plan summary ── */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-teal-500 via-sky-500 to-indigo-600 p-6 sm:p-8 shadow-xl">
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Countdown */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 text-white/80 mb-2">
              <CalendarDays className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-widest">Exam Countdown</span>
            </div>
            {days !== null ? (
              <>
                <p className="text-5xl sm:text-6xl font-extrabold text-white leading-none">{days}</p>
                <p className="text-white/85 font-semibold mt-1">day{days === 1 ? "" : "s"} until your IELTS</p>
              </>
            ) : (
              <>
                <p className="text-2xl font-extrabold text-white leading-tight">Set your exam date</p>
                <p className="text-white/80 text-sm mt-1">to see your countdown.</p>
              </>
            )}
          </div>

          {/* Today summary */}
          <div className="md:col-span-2 md:border-l md:border-white/20 md:pl-6">
            <div className="flex items-center gap-2 text-white/80 mb-2">
              <ClipboardList className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-widest">Today · {dayName}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
              Your plan for today
            </h2>
            <p className="text-white/85 text-sm mt-1">
              {levelLabel(level)} · {totalCount} tasks · rotates daily
            </p>
            <div className="mt-4">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-semibold text-white/80">Progress</span>
                <span className="text-xs font-extrabold text-white tabular-nums">{doneCount} / {totalCount}</span>
              </div>
              <div className="h-2.5 rounded-full bg-white/20 overflow-hidden">
                <div
                  className="h-full bg-white transition-all duration-500"
                  style={{ width: `${totalCount > 0 ? (doneCount / totalCount) * 100 : 0}%` }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute -right-12 -bottom-12 w-56 h-56 rounded-full bg-white/10" />
        <div className="absolute -right-4 top-4 w-24 h-24 rounded-full bg-white/5" />
      </div>

      {/* ── Today's tasks ── */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-extrabold text-foreground flex items-center gap-2">
            <span className="text-2xl">📌</span>
            Today's Tasks
          </h3>
          {doneCount === totalCount && totalCount > 0 && (
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
              ✅ All done!
            </span>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {tasks.map((task, i) => (
            <DailyTaskCard
              key={task.id}
              task={task}
              index={i}
              done={completed.has(task.id)}
            />
          ))}
        </div>
      </div>

      {/* ── Weekly section progress ── */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-extrabold text-foreground flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            This Week's Coverage
          </h3>
          <span className="text-xs text-muted-foreground">completed vs scheduled this week</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {weeklyPool.map((section) => {
            // refreshTick forces re-read after toggles
            void refreshTick;
            const done = getWeeklyCompletionCount(section.id, today);
            const scheduled = Math.max(1, getWeeklyScheduledCount(section.id, level, today));
            const capped = Math.min(done, scheduled);
            const pct = (capped / scheduled) * 100;
            return (
              <div key={section.id} className="bg-card border border-border rounded-2xl p-4 flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${section.color} flex items-center justify-center shrink-0 text-lg shadow-sm`}>
                  <span aria-hidden>{section.emoji}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-bold text-sm text-foreground truncate">{section.label}</p>
                    <span className="text-xs font-extrabold text-muted-foreground tabular-nums shrink-0">{capped}/{scheduled}</span>
                  </div>
                  <div className="mt-1.5 h-1.5 rounded-full bg-muted overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${section.color} transition-all duration-500`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function DailyTaskCard({ task, index, done }: { task: PlanTask; index: number; done: boolean }) {
  const toggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (done) unmarkTaskDone(task.id);
    else markTaskDone(task.id);
  };

  return (
    <div
      className={`group rounded-2xl border overflow-hidden transition-all ${
        done
          ? "bg-muted/40 border-border opacity-70"
          : "bg-card border-border hover:border-primary/40 hover:shadow-lg"
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
          href={task.hash ? `${task.href}${task.hash}` : task.href}
          className="flex-1 flex items-center gap-3 px-4 py-4 min-w-0"
        >
          <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${task.color} flex items-center justify-center shrink-0 text-2xl shadow-md`}>
            <span aria-hidden>{task.emoji}</span>
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-[11px] font-extrabold text-muted-foreground tabular-nums">{index + 1}.</span>
              <p className={`font-extrabold text-sm sm:text-base truncate ${done ? "line-through text-muted-foreground" : "text-foreground"}`}>
                {task.label}
              </p>
            </div>
            <p className="text-xs text-muted-foreground truncate mt-0.5" dir="rtl" lang="ar">{task.arabicLabel}</p>
            <div className="flex items-center gap-1 mt-1 text-[11px] text-muted-foreground">
              <Clock className="w-3 h-3" />
              <span>~{task.estimatedMinutes} min</span>
            </div>
          </div>
          <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0" />
        </Link>
      </div>
    </div>
  );
}
