import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import { customFetch } from "@workspace/api-client-react";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Circle,
  ClipboardList,
  Clock,
  Download,
  Flame,
  Loader2,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";
import { Layout } from "@/components/layout";
import { cn } from "@/lib/utils";
import { downloadPlanPdf } from "@/lib/plan-pdf-client";
import {
  addDays,
  daysUntilExam,
  ensurePlanStartDate,
  getCompletedForDate,
  getDayStatus,
  getPlanCompletionStats,
  getPlanCoverage,
  levelLabel,
  normalizePlanDuration,
  parsePlanISO,
  shortDate,
  todayISO,
  weekTitle,
  type DayStatus,
  type PlanDuration,
} from "@/lib/daily-plan";
import { LIBRARY_SIZES, PLAN_CONTENT_REFERENCE } from "@/lib/plan-content";

interface UserPlan {
  level: string | null;
  targetBand: string | null;
  examDate: string | null;
  startISO: string;
  duration: PlanDuration;
}

function useUserPlan() {
  const [plan, setPlan] = useState<UserPlan | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshTick, setRefreshTick] = useState(0);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [lvl, band, exam, dur, start] = await Promise.all([
          customFetch<{ value: string }>("/api/user-data/current_level").catch(() => null),
          customFetch<{ value: string }>("/api/user-data/target_band").catch(() => null),
          customFetch<{ value: string }>("/api/user-data/exam_date").catch(() => null),
          customFetch<{ value: string }>("/api/user-data/plan_duration_days").catch(() => null),
          customFetch<{ value: string }>("/api/user-data/plan_start_date").catch(() => null),
        ]);
        if (cancelled) return;
        const rawStart = start?.value;
        const hasStoredStart = typeof rawStart === "string" && /^\d{4}-\d{2}-\d{2}$/.test(rawStart);
        const startISO = ensurePlanStartDate(rawStart);
        const rawDur = dur?.value;
        const hasStoredDur = typeof rawDur === "string" && rawDur.length > 0;
        const duration = normalizePlanDuration(rawDur);

        // Persist defaults for legacy users so the plan anchor stops drifting on each visit.
        if (lvl?.value && (!hasStoredStart || !hasStoredDur)) {
          const writes: Promise<unknown>[] = [];
          if (!hasStoredStart) {
            writes.push(
              customFetch("/api/user-data/plan_start_date", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ value: startISO }),
              }).catch(() => undefined),
            );
          }
          if (!hasStoredDur) {
            writes.push(
              customFetch("/api/user-data/plan_duration_days", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ value: String(duration) }),
              }).catch(() => undefined),
            );
          }
          // Fire-and-forget; don't block UI on backfill.
          void Promise.all(writes);
        }

        setPlan({
          level: lvl?.value ?? null,
          targetBand: band?.value ?? null,
          examDate: exam?.value ?? null,
          duration,
          startISO,
        });
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [refreshTick]);

  // Re-derive completion when tasks are toggled elsewhere
  useEffect(() => {
    const refresh = () => setRefreshTick((t) => t + 1);
    window.addEventListener("lexo:plan-updated", refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener("lexo:plan-updated", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  return { plan, loading };
}

export default function PlanPage() {
  const { plan, loading } = useUserPlan();
  const [expandedDay, setExpandedDay] = useState<string | null>(todayISO());
  const [pdfBusy, setPdfBusy] = useState(false);
  const [pdfError, setPdfError] = useState<string | null>(null);

  async function handleDownloadPdf() {
    if (!plan) return;
    setPdfBusy(true);
    setPdfError(null);
    try {
      await downloadPlanPdf({
        level: plan.level,
        targetBand: plan.targetBand,
        examDate: plan.examDate,
        startISO: plan.startISO,
        duration: plan.duration,
      });
    } catch (e) {
      setPdfError(e instanceof Error ? e.message : "Could not download PDF.");
    } finally {
      setPdfBusy(false);
    }
  }

  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const weeks = useMemo(() => {
    if (!plan) return [];
    const start = parsePlanISO(plan.startISO);
    const totalWeeks = Math.ceil(plan.duration / 7);
    const result: { weekIndex: number; title: string; days: DayStatus[] }[] = [];
    for (let w = 0; w < totalWeeks; w++) {
      const days: DayStatus[] = [];
      for (let i = 0; i < 7; i++) {
        const idx = w * 7 + i;
        if (idx >= plan.duration) break;
        const date = addDays(start, idx);
        days.push(getDayStatus(plan.level, plan.startISO, date, today));
      }
      result.push({
        weekIndex: w + 1,
        title: weekTitle(w + 1, totalWeeks),
        days,
      });
    }
    return result;
  }, [plan, today]);

  const stats = useMemo(() => {
    if (!plan) return null;
    return getPlanCompletionStats(plan.level, plan.startISO, plan.duration, today);
  }, [plan, today]);

  const coverage = useMemo(() => {
    if (!plan) return null;
    return getPlanCoverage(plan.level, plan.startISO, plan.duration);
  }, [plan]);

  if (loading || !plan) {
    return (
      <Layout>
        <div className="max-w-5xl mx-auto px-4 py-10">
          <div className="h-64 bg-muted animate-pulse rounded-3xl" />
        </div>
      </Layout>
    );
  }

  if (!plan.level) {
    return (
      <Layout>
        <div className="max-w-md mx-auto px-4 py-12 text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
            <ClipboardList className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-extrabold text-foreground">No plan yet</h1>
          <p className="text-muted-foreground">Finish onboarding to generate your study plan.</p>
          <Link href="/" className="inline-block bg-primary text-primary-foreground font-bold px-5 py-2.5 rounded-xl">
            Go home
          </Link>
        </div>
      </Layout>
    );
  }

  const examDays = daysUntilExam(plan.examDate);

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
        {/* ── Back link + PDF download ── */}
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to dashboard
          </Link>
          <button
            onClick={handleDownloadPdf}
            disabled={pdfBusy || !plan.level}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-bold shadow-sm hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {pdfBusy ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
            {pdfBusy ? "Preparing PDF..." : "Download Plan (PDF)"}
          </button>
        </div>
        {pdfError && (
          <div className="rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 px-4 py-2 text-sm text-red-700 dark:text-red-400">
            {pdfError}
          </div>
        )}

        {/* ── Hero header ── */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-teal-500 via-sky-500 to-indigo-600 p-6 sm:p-8 shadow-xl text-white">
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="flex items-center gap-2 text-white/80 mb-1">
                <ClipboardList className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-widest">Your Study Plan</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight">{plan.duration}-Day Plan</h1>
              <p className="text-white/85 text-sm mt-1">
                {shortDate(parsePlanISO(plan.startISO))} → {shortDate(stats!.endDate)}
              </p>
              <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold">
                <span className="px-2.5 py-1 rounded-full bg-white/15">{levelLabel(plan.level)}</span>
                {plan.targetBand && (
                  <span className="px-2.5 py-1 rounded-full bg-white/15">Target Band {plan.targetBand}</span>
                )}
                {examDays !== null && (
                  <span className="px-2.5 py-1 rounded-full bg-white/15">
                    Exam in {examDays} day{examDays === 1 ? "" : "s"}
                  </span>
                )}
              </div>
            </div>

            <div className="md:col-span-2 md:border-l md:border-white/20 md:pl-6">
              <div className="flex items-center gap-2 text-white/80 mb-2">
                <TrendingUp className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-widest">Overall progress</span>
              </div>
              <div className="flex items-baseline gap-3">
                <span className="text-5xl sm:text-6xl font-extrabold leading-none">{stats!.percent}%</span>
                <span className="text-white/85 text-sm">
                  {stats!.doneDays} of {stats!.totalDays} days complete
                </span>
              </div>

              <div className="mt-4">
                <div className="h-2.5 rounded-full bg-white/20 overflow-hidden">
                  <div
                    className="h-full bg-white transition-all duration-700"
                    style={{ width: `${stats!.percent}%` }}
                  />
                </div>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                <Mini label="Completed" value={stats!.doneDays} icon={<CheckCircle2 className="w-3.5 h-3.5" />} />
                <Mini label="Today" value={`Day ${stats!.todayIndex}`} icon={<Sparkles className="w-3.5 h-3.5" />} />
                <Mini label="Missed" value={stats!.missedDays + stats!.partialDays} icon={<Flame className="w-3.5 h-3.5" />} />
              </div>
            </div>
          </div>
          <div className="absolute -right-12 -bottom-12 w-56 h-56 rounded-full bg-white/10" />
          <div className="absolute -right-4 top-4 w-24 h-24 rounded-full bg-white/5" />
        </div>

        {/* ── Catch-up suggestion ── */}
        {(stats!.missedDays > 0 || stats!.partialDays > 0) && (
          <div className="rounded-2xl border-2 border-amber-300 dark:border-amber-700/50 bg-amber-50 dark:bg-amber-950/20 p-4 flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0">
              <Flame className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-extrabold text-amber-900 dark:text-amber-200">
                Catch up on {stats!.missedDays + stats!.partialDays} day
                {stats!.missedDays + stats!.partialDays === 1 ? "" : "s"}
              </p>
              <p className="text-sm text-amber-800 dark:text-amber-300 mt-0.5">
                Try squeezing 1–2 extra short sessions (Word of the Day · Quiz Mode · Weak Words) into today and tomorrow to stay on track for your exam.
              </p>
            </div>
          </div>
        )}

        {/* ── Coverage panel ── */}
        {coverage && <CoveragePanel coverage={coverage} duration={plan.duration} />}

        {/* ── Legend ── */}
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <Legend swatch="bg-emerald-500" label="Completed" />
          <Legend swatch="bg-sky-500" label="Today" />
          <Legend swatch="bg-amber-500" label="Missed / partial" />
          <Legend swatch="bg-muted" label="Upcoming" outlined />
        </div>

        {/* ── Weeks ── */}
        <div className="space-y-5">
          {weeks.map((week) => (
            <WeekRow
              key={week.weekIndex}
              weekIndex={week.weekIndex}
              title={week.title}
              days={week.days}
              expandedIso={expandedDay}
              onToggleExpand={(iso) => setExpandedDay((prev) => (prev === iso ? null : iso))}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
}

function CoveragePanel({
  coverage,
  duration,
}: {
  coverage: Record<string, { scheduledCount: number; uniqueCovered: number; catalogSize: number }>;
  duration: PlanDuration;
}) {
  const orwellUnique =
    (coverage.orwellTask1?.uniqueCovered ?? 0) +
    (coverage.orwellTask2?.uniqueCovered ?? 0) +
    (coverage.paragraph?.uniqueCovered ?? 0);
  const orwellSize = LIBRARY_SIZES.orwellTotal;

  const speakingUnique = Math.max(
    coverage.topicBank?.uniqueCovered ?? 0,
    coverage.churchillP1?.uniqueCovered ?? 0,
    coverage.churchillP2?.uniqueCovered ?? 0,
    coverage.churchillP3?.uniqueCovered ?? 0,
  );
  const speakingSize = LIBRARY_SIZES.speakingThemes;

  const readingSkillsUnique =
    (coverage.readingSkills?.uniqueCovered ?? 0) + (coverage.readingSkillsEasy?.uniqueCovered ?? 0);
  const readingSkillsSize = LIBRARY_SIZES.readingSkillsTotal;

  const listeningSkillsUnique =
    (coverage.listeningS1?.uniqueCovered ?? 0) +
    (coverage.listeningS2?.uniqueCovered ?? 0) +
    (coverage.listeningS3?.uniqueCovered ?? 0) +
    (coverage.listeningS4?.uniqueCovered ?? 0);
  const listeningSkillsSize = LIBRARY_SIZES.listeningSkillsTotal;

  const rows: {
    key: string;
    emoji: string;
    label: string;
    detail: string;
    pct: number;
    color: string;
  }[] = [
    {
      key: "vocab",
      emoji: "✨",
      label: "Vocabulary deck",
      detail: `Continuous review · ${LIBRARY_SIZES.vocabWords.toLocaleString()} words`,
      pct: 100,
      color: "from-purple-500 to-fuchsia-500",
    },
    {
      key: "writing",
      emoji: "✍️",
      label: "Writing — Orwell prompts",
      detail: `${orwellUnique} of ${orwellSize} essays scheduled across the plan`,
      pct: orwellSize > 0 ? Math.round((orwellUnique / orwellSize) * 100) : 0,
      color: "from-violet-500 to-purple-500",
    },
    {
      key: "speaking",
      emoji: "🎤",
      label: "Speaking — Churchill themes",
      detail: `${speakingUnique} of ${speakingSize} themes touched`,
      pct: speakingSize > 0 ? Math.round((speakingUnique / speakingSize) * 100) : 0,
      color: "from-rose-500 to-pink-500",
    },
    {
      key: "readingSkills",
      emoji: "📖",
      label: "Reading — skill passages",
      detail: `${readingSkillsUnique} of ${readingSkillsSize} passages scheduled`,
      pct: readingSkillsSize > 0 ? Math.round((readingSkillsUnique / readingSkillsSize) * 100) : 0,
      color: "from-emerald-500 to-teal-500",
    },
    {
      key: "listeningSkills",
      emoji: "🎧",
      label: "Listening — skill sections",
      detail: `${listeningSkillsUnique} of ${listeningSkillsSize} practices scheduled`,
      pct: listeningSkillsSize > 0 ? Math.round((listeningSkillsUnique / listeningSkillsSize) * 100) : 0,
      color: "from-sky-500 to-blue-500",
    },
    {
      key: "readingMocks",
      emoji: "📝",
      label: "Reading mock tests",
      detail:
        (coverage.readingMock?.scheduledCount ?? 0) > 0
          ? `${coverage.readingMock?.uniqueCovered ?? 0} of ${LIBRARY_SIZES.readingMockTests} mocks scheduled (${coverage.readingMock?.scheduledCount ?? 0} sittings)`
          : `${LIBRARY_SIZES.readingMockTests} full mocks available — fit them in on rest days`,
      pct:
        LIBRARY_SIZES.readingMockTests > 0
          ? Math.round(((coverage.readingMock?.uniqueCovered ?? 0) / LIBRARY_SIZES.readingMockTests) * 100)
          : 0,
      color: "from-emerald-500 to-lime-500",
    },
    {
      key: "listeningMocks",
      emoji: "🎬",
      label: "Listening mock tests",
      detail:
        (coverage.listeningMock?.scheduledCount ?? 0) > 0
          ? `${coverage.listeningMock?.uniqueCovered ?? 0} of ${LIBRARY_SIZES.listeningMockTests} mocks scheduled (${coverage.listeningMock?.scheduledCount ?? 0} sittings)`
          : `${LIBRARY_SIZES.listeningMockTests} full mocks available — fit them in on rest days`,
      pct:
        LIBRARY_SIZES.listeningMockTests > 0
          ? Math.round(((coverage.listeningMock?.uniqueCovered ?? 0) / LIBRARY_SIZES.listeningMockTests) * 100)
          : 0,
      color: "from-amber-500 to-orange-500",
    },
  ];

  return (
    <section className="rounded-3xl border border-border bg-card overflow-hidden">
      <header className="px-5 py-4 border-b border-border bg-muted/30">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-primary" />
          <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">
            What you'll cover
          </p>
        </div>
        <h3 className="text-base font-extrabold text-foreground leading-tight mt-0.5">
          Your {duration}-day scope across the catalog
        </h3>
      </header>
      <div className="p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {rows.map((r) => (
          <div
            key={r.key}
            className="flex items-center gap-3 p-3 rounded-2xl border border-border bg-background"
          >
            <div
              className={cn(
                "w-10 h-10 rounded-xl bg-gradient-to-br flex items-center justify-center text-lg shrink-0 shadow-sm",
                r.color,
              )}
            >
              <span aria-hidden>{r.emoji}</span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-extrabold text-foreground truncate">{r.label}</p>
              <p className="text-[11px] text-muted-foreground truncate" title={r.detail}>
                {r.detail}
              </p>
              <div className="mt-1.5 h-1.5 rounded-full bg-muted overflow-hidden">
                <div
                  className={cn("h-full bg-gradient-to-r transition-all duration-500", r.color)}
                  style={{ width: `${Math.min(100, Math.max(0, r.pct))}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Mini({ label, value, icon }: { label: string; value: string | number; icon: React.ReactNode }) {
  return (
    <div className="rounded-xl bg-white/10 px-2 py-2 backdrop-blur-sm">
      <div className="flex items-center justify-center gap-1 text-white/85 text-[10px] font-bold uppercase tracking-wider">
        {icon}
        <span>{label}</span>
      </div>
      <div className="text-lg font-extrabold tabular-nums leading-tight mt-0.5">{value}</div>
    </div>
  );
}

function Legend({ swatch, label, outlined }: { swatch: string; label: string; outlined?: boolean }) {
  return (
    <div className="inline-flex items-center gap-1.5">
      <span className={cn("inline-block w-3 h-3 rounded-md", swatch, outlined && "border border-border")} />
      <span className="text-muted-foreground font-semibold">{label}</span>
    </div>
  );
}

function WeekRow({
  weekIndex,
  title,
  days,
  expandedIso,
  onToggleExpand,
}: {
  weekIndex: number;
  title: string;
  days: DayStatus[];
  expandedIso: string | null;
  onToggleExpand: (iso: string) => void;
}) {
  const expandedDay = days.find((d) => d.iso === expandedIso) ?? null;
  return (
    <section className="rounded-3xl border border-border bg-card overflow-hidden">
      <header className="px-5 py-3 border-b border-border bg-muted/30 flex items-center justify-between">
        <div>
          <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Week {weekIndex}</p>
          <h3 className="text-base font-extrabold text-foreground leading-tight">{title}</h3>
        </div>
        <div className="text-xs text-muted-foreground tabular-nums">
          Day {days[0]?.dayIndex}–{days[days.length - 1]?.dayIndex}
        </div>
      </header>

      <div className="p-3 sm:p-4 grid grid-cols-7 gap-2">
        {days.map((day) => (
          <DayCard key={day.iso} day={day} expanded={day.iso === expandedIso} onClick={() => onToggleExpand(day.iso)} />
        ))}
      </div>

      {expandedDay && (
        <div className="border-t border-border bg-background/60 px-5 py-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">
                Day {expandedDay.dayIndex} · {expandedDay.weekdayName}
              </p>
              <p className="text-sm font-bold text-foreground">{shortDate(expandedDay.date)}</p>
            </div>
            <span
              className={cn(
                "text-xs font-extrabold px-2.5 py-1 rounded-full",
                expandedDay.state === "completed" &&
                  "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
                expandedDay.state === "today" && "bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400",
                expandedDay.state === "upcoming" && "bg-muted text-muted-foreground",
                (expandedDay.state === "missed" || expandedDay.state === "partial") &&
                  "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
              )}
            >
              {expandedDay.doneCount}/{expandedDay.total}
            </span>
          </div>

          <ExpandedDayTasks day={expandedDay} />
        </div>
      )}
    </section>
  );
}

function ExpandedDayTasks({ day }: { day: DayStatus }) {
  const completedSet = getCompletedForDate(day.date);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
      {day.tasks.map((task, i) => {
        const done = completedSet.has(task.id);
        const href = task.scheduled?.href ?? (task.hash ? `${task.href}${task.hash}` : task.href);
        return (
                <Link
                  key={task.id}
                  href={href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-xl border transition-all",
                    done
                      ? "bg-muted/40 border-border opacity-70"
                      : "bg-card border-border hover:border-primary/40 hover:shadow-sm",
                  )}
                >
                  <div
                    className={cn(
                      "w-9 h-9 rounded-xl bg-gradient-to-br flex items-center justify-center text-base shrink-0 shadow-sm",
                      task.color,
                    )}
                  >
                    <span aria-hidden>{task.emoji}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-[10px] font-bold text-muted-foreground tabular-nums">{i + 1}.</span>
                      <p
                        className={cn(
                          "text-sm font-bold truncate",
                          done ? "line-through text-muted-foreground" : "text-foreground",
                        )}
                      >
                        {task.label}
                      </p>
                    </div>
                    {task.scheduled && (
                      <p className="text-[11px] text-muted-foreground truncate mt-0.5" title={task.scheduled.title}>
                        {task.scheduled.title}
                      </p>
                    )}
                    <div className="flex items-center gap-1 mt-0.5 text-[11px] text-muted-foreground">
                      <Clock className="w-3 h-3" />~{task.estimatedMinutes} min
                    </div>
                  </div>
                </Link>
        );
      })}
    </div>
  );
}

function DayCard({ day, expanded, onClick }: { day: DayStatus; expanded: boolean; onClick: () => void }) {
  const stateClass =
    day.state === "completed"
      ? "bg-emerald-500 text-white border-emerald-500"
      : day.state === "today"
      ? "bg-sky-500 text-white border-sky-500 ring-2 ring-sky-400/40"
      : day.state === "missed"
      ? "bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-700/50"
      : day.state === "partial"
      ? "bg-amber-500 text-white border-amber-500"
      : "bg-muted text-muted-foreground border-border";

  const Icon =
    day.state === "completed" ? CheckCircle2 : day.state === "today" ? Target : day.state === "partial" ? Flame : Circle;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={expanded}
      className={cn(
        "rounded-xl border-2 p-2 transition-all text-center flex flex-col items-center gap-0.5 hover:scale-105",
        stateClass,
        expanded && "ring-2 ring-foreground/30 scale-[1.02]",
      )}
    >
      <span className="text-[9px] font-bold uppercase tracking-wider opacity-80">
        {day.weekdayName.slice(0, 3)}
      </span>
      <span className="text-base font-extrabold leading-none tabular-nums">{day.dayIndex}</span>
      <Icon className="w-3 h-3 mt-0.5" />
      <span className="text-[9px] font-bold tabular-nums opacity-90">
        {day.doneCount}/{day.total}
      </span>
    </button>
  );
}
