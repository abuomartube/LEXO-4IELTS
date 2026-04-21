import { useState, useEffect, useMemo, useCallback } from "react";
import { Link } from "wouter";
import {
  ArrowLeft, BookOpen, TrendingUp, TrendingDown, Minus,
  Loader2, Sparkles, RefreshCw, X, Calendar, FileText,
  Award, Lock, ChevronRight,
} from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer,
} from "recharts";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";

const EMAIL_STORAGE_KEY = "4ielts_email";

function getStudentAuthHeaders(): Record<string, string> {
  try {
    const raw = localStorage.getItem(EMAIL_STORAGE_KEY);
    if (!raw) return {};
    const { email, token } = JSON.parse(raw);
    if (!email || !token) return {};
    return { "X-Student-Email": email, "X-Student-Token": token };
  } catch { return {}; }
}

interface HistoryItem {
  id: number;
  category: string;
  taskTypeLabel: string | null;
  band: number | null;
  wordCount: number | null;
  createdAt: string;
  preview: string;
  hasFeedback: boolean;
}

interface ChartPoint { date: string; band: number; }
interface ChartSeries {
  task1: ChartPoint[]; task2: ChartPoint[];
  paragraph: ChartPoint[]; freecheck: ChartPoint[];
}

interface CompareReport {
  bandChange: "higher" | "lower" | "same";
  bandDelta: number;
  summary: string;
  improvedStrengths: string[];
  remainingWeaknesses: string[];
  newMistakes: string[];
  focusNext: string[];
  motivation: string;
  _olderBand?: number | null;
  _newerBand?: number | null;
  _olderDate?: string;
  _newerDate?: string;
  _generatedAt?: string;
}

interface CoachSummary {
  overallTrend: "improving" | "plateau" | "declining" | "mixed";
  averageBand: number;
  topStrengths: string[];
  topImprovements: string[];
  studyRecommendation: string;
  motivation: string;
}

interface CoachResponse {
  ok: true;
  summary: CoachSummary | null;
  submissionCount: number;
  milestone?: number;
  generatedAt?: string;
  nextMilestone?: number;
  message?: string;
}

interface DetailRow {
  id: number;
  category: string;
  taskTypeLabel: string | null;
  band: number | null;
  wordCount: number | null;
  text: string | null;
  prompt: string | null;
  feedback: Record<string, unknown> | null;
  compareReport: CompareReport | null;
  createdAt: string;
}

const CATEGORY_LABELS: Record<string, { label: string; emoji: string; color: string }> = {
  task1: { label: "Task 1", emoji: "📊", color: "#3b82f6" },
  task2: { label: "Task 2", emoji: "📝", color: "#8b5cf6" },
  paragraph: { label: "Paragraph", emoji: "✉️", color: "#10b981" },
  freecheck: { label: "Free Check", emoji: "✨", color: "#f59e0b" },
};

const FILTERS: Array<{ key: "all" | "task1" | "task2" | "paragraph" | "freecheck"; label: string }> = [
  { key: "all", label: "All" },
  { key: "task1", label: "Task 1" },
  { key: "task2", label: "Task 2" },
  { key: "paragraph", label: "Paragraph" },
  { key: "freecheck", label: "Free Check" },
];

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

function formatDateTime(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleString("en-GB", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

function bandColor(band: number | null): string {
  if (band === null) return "bg-muted text-muted-foreground";
  if (band >= 7) return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300";
  if (band >= 6) return "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300";
  if (band >= 5) return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300";
  return "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300";
}

export default function WritingHistory() {
  const [items, setItems] = useState<HistoryItem[] | null>(null);
  const [chart, setChart] = useState<ChartSeries | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<typeof FILTERS[number]["key"]>("all");

  const [openDetail, setOpenDetail] = useState<DetailRow | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);

  const [compareLoading, setCompareLoading] = useState(false);
  const [compareError, setCompareError] = useState<string | null>(null);

  const [coach, setCoach] = useState<CoachResponse | null>(null);
  const [coachLoading, setCoachLoading] = useState(false);
  const [coachError, setCoachError] = useState<string | null>(null);
  const [coachOpen, setCoachOpen] = useState(false);

  const loadAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const headers = getStudentAuthHeaders();
      const [listRes, chartRes, coachRes] = await Promise.all([
        fetch("/api/orwell/history", { headers }),
        fetch("/api/orwell/history/chart", { headers }),
        fetch("/api/orwell/coach-summary", { headers }),
      ]);
      if (!listRes.ok) throw new Error("Failed to load history");
      if (!chartRes.ok) throw new Error("Failed to load chart");
      const listData = await listRes.json();
      const chartData = await chartRes.json();
      setItems(listData.items ?? []);
      setChart(chartData);
      if (coachRes.ok) {
        const cData = await coachRes.json();
        setCoach(cData);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadAll(); }, [loadAll]);

  const openItem = useCallback(async (id: number) => {
    setOpenDetail(null);
    setDetailLoading(true);
    setCompareError(null);
    try {
      const res = await fetch(`/api/orwell/history/${id}`, { headers: getStudentAuthHeaders() });
      if (!res.ok) throw new Error("Failed to load submission");
      const data = await res.json();
      setOpenDetail(data);
    } catch (e) {
      setCompareError(e instanceof Error ? e.message : "Failed to load");
    } finally {
      setDetailLoading(false);
    }
  }, []);

  const runCompare = useCallback(async (force = false) => {
    if (!openDetail) return;
    setCompareLoading(true);
    setCompareError(null);
    try {
      const res = await fetch(`/api/orwell/history/${openDetail.id}/compare${force ? "?force=1" : ""}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...getStudentAuthHeaders() },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Comparison failed");
      setOpenDetail((prev) => prev ? { ...prev, compareReport: data.report } : prev);
    } catch (e) {
      setCompareError(e instanceof Error ? e.message : "Comparison failed");
    } finally {
      setCompareLoading(false);
    }
  }, [openDetail]);

  const generateCoach = useCallback(async (force = false) => {
    setCoachLoading(true);
    setCoachError(null);
    try {
      const res = await fetch(`/api/orwell/coach-summary${force ? "?force=1" : ""}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...getStudentAuthHeaders() },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      setCoach(data);
      setCoachOpen(true);
    } catch (e) {
      setCoachError(e instanceof Error ? e.message : "Failed");
    } finally {
      setCoachLoading(false);
    }
  }, []);

  const filteredItems = useMemo(() => {
    if (!items) return [];
    if (filter === "all") return items;
    return items.filter((it) => it.category === filter);
  }, [items, filter]);

  const chartData = useMemo(() => {
    if (!chart) return [];
    const buckets: Array<keyof ChartSeries> = ["task1", "task2", "paragraph", "freecheck"];
    const merged = new Map<string, Record<string, number | string>>();
    for (const k of buckets) {
      for (const p of chart[k]) {
        const day = p.date.slice(0, 10);
        const row = merged.get(day) ?? { date: day };
        row[k] = p.band;
        merged.set(day, row);
      }
    }
    return Array.from(merged.values()).sort((a, b) => String(a.date).localeCompare(String(b.date)));
  }, [chart]);

  const totalCount = items?.length ?? 0;

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        <div className="flex items-center gap-3">
          <Link href="/essay-checker">
            <a className="w-9 h-9 rounded-xl border border-border flex items-center justify-center text-muted-foreground hover:bg-accent">
              <ArrowLeft className="w-4 h-4" />
            </a>
          </Link>
          <div>
            <h1 className="text-2xl font-extrabold">Writing History</h1>
            <p className="text-sm text-muted-foreground">All your Orwell AI submissions, in one place.</p>
          </div>
        </div>

        {/* Coach Summary Card */}
        <div className="rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-primary/10 to-primary/5 p-5">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
              <Award className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-lg font-bold">Personal Writing Coach</h2>
                {coach?.summary && coach.milestone && (
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-primary text-primary-foreground">
                    Milestone {coach.milestone}
                  </span>
                )}
              </div>
              {coach?.summary ? (
                <p className="text-sm text-muted-foreground mt-1">
                  Cumulative summary of your writing journey ({totalCount} submissions).
                </p>
              ) : coach ? (
                <p className="text-sm text-muted-foreground mt-1">
                  {coach.message ?? `Submit ${5 - (coach.submissionCount ?? 0)} more pieces to unlock.`}
                </p>
              ) : loading ? (
                <p className="text-sm text-muted-foreground mt-1">Loading…</p>
              ) : (
                <p className="text-sm text-muted-foreground mt-1">Submit 5 pieces of writing to unlock your first summary.</p>
              )}
              <div className="flex flex-wrap gap-2 mt-3">
                {coach?.summary ? (
                  <>
                    <Button size="sm" onClick={() => setCoachOpen(true)}>
                      <Sparkles className="w-4 h-4 mr-1" /> View summary
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => generateCoach(true)} disabled={coachLoading}>
                      {coachLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4 mr-1" />}
                      Refresh
                    </Button>
                  </>
                ) : coach && coach.submissionCount >= 5 ? (
                  <Button size="sm" onClick={() => generateCoach(false)} disabled={coachLoading}>
                    {coachLoading ? <Loader2 className="w-4 h-4 animate-spin mr-1" /> : <Sparkles className="w-4 h-4 mr-1" />}
                    Generate my summary
                  </Button>
                ) : (
                  <span className="text-xs text-muted-foreground inline-flex items-center gap-1">
                    <Lock className="w-3 h-3" /> Locked until 5 submissions
                  </span>
                )}
              </div>
              {coachError && <p className="text-xs text-rose-600 mt-2">{coachError}</p>}
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="rounded-2xl border border-border bg-card p-4">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h2 className="font-bold">Band score over time</h2>
          </div>
          {chartData.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-12">
              No graded submissions yet — your progress chart will appear here.
            </p>
          ) : (
            <div className="w-full h-64">
              <ResponsiveContainer>
                <LineChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                  <YAxis domain={[0, 9]} tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Line type="monotone" dataKey="task1" stroke={CATEGORY_LABELS.task1.color} strokeWidth={2} connectNulls dot />
                  <Line type="monotone" dataKey="task2" stroke={CATEGORY_LABELS.task2.color} strokeWidth={2} connectNulls dot />
                  <Line type="monotone" dataKey="paragraph" stroke={CATEGORY_LABELS.paragraph.color} strokeWidth={2} connectNulls dot />
                  <Line type="monotone" dataKey="freecheck" stroke={CATEGORY_LABELS.freecheck.color} strokeWidth={2} connectNulls dot />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* Filter chips */}
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors ${
                filter === f.key
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card text-foreground border-border hover:bg-accent"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* List */}
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 dark:bg-rose-950/30 p-4 text-sm text-rose-700 dark:text-rose-300">
            {error}
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="rounded-2xl border border-border bg-card p-8 text-center text-sm text-muted-foreground">
            <BookOpen className="w-10 h-10 mx-auto mb-3 opacity-40" />
            <p>No submissions yet in this category.</p>
            <Link href="/essay-checker">
              <a className="inline-block mt-3 text-primary font-semibold underline">Start writing →</a>
            </Link>
          </div>
        ) : (
          <div className="space-y-2">
            {filteredItems.map((it) => {
              const meta = CATEGORY_LABELS[it.category] ?? CATEGORY_LABELS.task2;
              return (
                <button
                  key={it.id}
                  onClick={() => openItem(it.id)}
                  className="w-full text-left rounded-xl border border-border bg-card hover:border-primary hover:bg-primary/5 transition-all p-4 flex items-start gap-3 group"
                >
                  <span className="text-2xl shrink-0">{meta.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold">{it.taskTypeLabel ?? meta.label}</span>
                      {it.band !== null && (
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${bandColor(it.band)}`}>
                          Band {it.band.toFixed(1)}
                        </span>
                      )}
                      <span className="text-xs text-muted-foreground inline-flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> {formatDate(it.createdAt)}
                      </span>
                      {it.wordCount !== null && (
                        <span className="text-xs text-muted-foreground">{it.wordCount} words</span>
                      )}
                    </div>
                    {it.preview && (
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{it.preview}…</p>
                    )}
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary mt-1 shrink-0" />
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {(openDetail || detailLoading) && (
        <DetailModal
          detail={openDetail}
          loading={detailLoading}
          onClose={() => { setOpenDetail(null); setCompareError(null); }}
          compareLoading={compareLoading}
          compareError={compareError}
          onCompare={runCompare}
        />
      )}

      {/* Coach Modal */}
      {coachOpen && coach?.summary && (
        <CoachModal coach={coach} onClose={() => setCoachOpen(false)} onRefresh={() => generateCoach(true)} refreshing={coachLoading} />
      )}
    </Layout>
  );
}

// ── Detail Modal ─────────────────────────────────────────────────────────

function DetailModal({
  detail, loading, onClose, compareLoading, compareError, onCompare,
}: {
  detail: DetailRow | null;
  loading: boolean;
  onClose: () => void;
  compareLoading: boolean;
  compareError: string | null;
  onCompare: (force?: boolean) => void;
}) {
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-y-auto" onClick={onClose}>
      <div
        className="bg-background w-full sm:max-w-3xl max-h-[95vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl border border-border shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-background border-b border-border p-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-2 min-w-0">
            <FileText className="w-5 h-5 text-primary shrink-0" />
            <div className="min-w-0">
              <h3 className="font-bold truncate">{detail?.taskTypeLabel ?? "Submission"}</h3>
              {detail && <p className="text-xs text-muted-foreground">{formatDateTime(detail.createdAt)}</p>}
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg hover:bg-accent flex items-center justify-center">
            <X className="w-4 h-4" />
          </button>
        </div>

        {loading || !detail ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <div className="p-4 space-y-5">
            {/* Header band */}
            {detail.band !== null && (
              <div className="flex items-center gap-3">
                <div className={`text-2xl font-extrabold px-4 py-2 rounded-xl ${bandColor(detail.band)}`}>
                  Band {detail.band.toFixed(1)}
                </div>
                {detail.wordCount !== null && (
                  <span className="text-sm text-muted-foreground">{detail.wordCount} words</span>
                )}
              </div>
            )}

            {/* Prompt */}
            {detail.prompt && (
              <section>
                <h4 className="text-xs font-bold uppercase tracking-wide text-muted-foreground mb-2">Assignment</h4>
                <div className="rounded-xl border border-border bg-muted/30 p-3 text-sm whitespace-pre-wrap">
                  {detail.prompt}
                </div>
              </section>
            )}

            {/* Writing */}
            <section>
              <h4 className="text-xs font-bold uppercase tracking-wide text-muted-foreground mb-2">Your writing</h4>
              <div className="rounded-xl border border-border bg-card p-3 text-sm whitespace-pre-wrap leading-relaxed">
                {detail.text || <span className="italic text-muted-foreground">(No writing was saved for this older submission.)</span>}
              </div>
            </section>

            {/* Feedback */}
            {detail.feedback && (
              <FeedbackSection feedback={detail.feedback} />
            )}

            {/* Compare */}
            <section>
              <div className="flex items-center justify-between gap-2 mb-2">
                <h4 className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Progress comparison</h4>
                {detail.compareReport && (
                  <button
                    onClick={() => onCompare(true)}
                    disabled={compareLoading}
                    className="text-xs text-primary font-semibold hover:underline inline-flex items-center gap-1"
                  >
                    {compareLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : <RefreshCw className="w-3 h-3" />}
                    Refresh
                  </button>
                )}
              </div>
              {compareError && (
                <div className="rounded-xl border border-rose-200 bg-rose-50 dark:bg-rose-950/30 p-3 text-sm text-rose-700 dark:text-rose-300 mb-2">
                  {compareError}
                </div>
              )}
              {!detail.compareReport ? (
                <Button onClick={() => onCompare(false)} disabled={compareLoading || !detail.text}>
                  {compareLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Sparkles className="w-4 h-4 mr-2" />}
                  Compare with my latest {detail.taskTypeLabel ?? "submission"}
                </Button>
              ) : (
                <CompareReportCard report={detail.compareReport} />
              )}
            </section>
          </div>
        )}
      </div>
    </div>
  );
}

function FeedbackSection({ feedback }: { feedback: Record<string, unknown> }) {
  const f = feedback as {
    scores?: { taskResponse?: { band: number; feedback: string }; coherenceCohesion?: { band: number; feedback: string }; lexicalResource?: { band: number; feedback: string }; grammaticalRange?: { band: number; feedback: string } };
    strengths?: unknown;
    improvements?: unknown;
    corrections?: unknown[];
    corrected?: string;
    better?: string;
    formal?: string;
  };

  const renderList = (value: unknown): string[] => {
    if (Array.isArray(value)) return value.filter((v): v is string => typeof v === "string");
    if (typeof value === "string") {
      return value.split(/\n+/).map((l) => l.replace(/^[•\-*]\s*/, "").trim()).filter(Boolean);
    }
    return [];
  };

  const strengths = renderList(f.strengths);
  const improvements = renderList(f.improvements);

  return (
    <section>
      <h4 className="text-xs font-bold uppercase tracking-wide text-muted-foreground mb-2">Orwell AI feedback</h4>
      <div className="space-y-3">
        {f.scores && (
          <div className="grid grid-cols-2 gap-2">
            {([
              ["taskResponse", "Task / Response"],
              ["coherenceCohesion", "Coherence & Cohesion"],
              ["lexicalResource", "Lexical Resource"],
              ["grammaticalRange", "Grammar"],
            ] as const).map(([key, label]) => {
              const s = f.scores?.[key];
              if (!s) return null;
              return (
                <div key={key} className="rounded-xl border border-border bg-card p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-muted-foreground">{label}</span>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${bandColor(s.band)}`}>{s.band.toFixed(1)}</span>
                  </div>
                  <p className="text-xs text-foreground/80 leading-relaxed">{s.feedback}</p>
                </div>
              );
            })}
          </div>
        )}

        {strengths.length > 0 && (
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 dark:bg-emerald-950/30 dark:border-emerald-900 p-3">
            <p className="text-xs font-bold text-emerald-700 dark:text-emerald-300 mb-2">✅ Strengths</p>
            <ul className="text-sm text-foreground/80 space-y-1 list-disc list-inside">
              {strengths.map((s, i) => <li key={i}>{s}</li>)}
            </ul>
          </div>
        )}

        {improvements.length > 0 && (
          <div className="rounded-xl border border-amber-200 bg-amber-50 dark:bg-amber-950/30 dark:border-amber-900 p-3">
            <p className="text-xs font-bold text-amber-700 dark:text-amber-300 mb-2">⚠️ Areas to improve</p>
            <ul className="text-sm text-foreground/80 space-y-1 list-disc list-inside">
              {improvements.map((s, i) => <li key={i}>{s}</li>)}
            </ul>
          </div>
        )}

        {f.corrected && (
          <details className="rounded-xl border border-border bg-card p-3">
            <summary className="text-xs font-bold cursor-pointer">Corrected version</summary>
            <p className="mt-2 text-sm whitespace-pre-wrap">{f.corrected}</p>
          </details>
        )}
        {f.better && (
          <details className="rounded-xl border border-border bg-card p-3">
            <summary className="text-xs font-bold cursor-pointer">Better version</summary>
            <p className="mt-2 text-sm whitespace-pre-wrap">{f.better}</p>
          </details>
        )}
        {f.formal && (
          <details className="rounded-xl border border-border bg-card p-3">
            <summary className="text-xs font-bold cursor-pointer">Formal version</summary>
            <p className="mt-2 text-sm whitespace-pre-wrap">{f.formal}</p>
          </details>
        )}
      </div>
    </section>
  );
}

function CompareReportCard({ report }: { report: CompareReport }) {
  const TrendIcon = report.bandChange === "higher" ? TrendingUp
    : report.bandChange === "lower" ? TrendingDown : Minus;
  const trendColor = report.bandChange === "higher" ? "text-emerald-600"
    : report.bandChange === "lower" ? "text-rose-600" : "text-muted-foreground";

  return (
    <div className="rounded-xl border-2 border-primary/30 bg-primary/5 p-4 space-y-3">
      <div className="flex items-center gap-3">
        <TrendIcon className={`w-6 h-6 ${trendColor}`} />
        <div className="flex-1">
          <p className="text-sm font-bold">
            {report.bandChange === "higher" && "Your band has improved"}
            {report.bandChange === "lower" && "Your band has dropped"}
            {report.bandChange === "same" && "Your band is the same"}
            {typeof report.bandDelta === "number" && report.bandDelta !== 0 && (
              <span className={`ml-2 text-xs font-bold ${trendColor}`}>
                {report.bandDelta > 0 ? "+" : ""}{report.bandDelta.toFixed(1)}
              </span>
            )}
          </p>
          {(report._olderBand !== undefined && report._newerBand !== undefined) && (
            <p className="text-xs text-muted-foreground">
              Then: Band {report._olderBand ?? "—"} • Now: Band {report._newerBand ?? "—"}
            </p>
          )}
        </div>
      </div>

      {report.summary && <p className="text-sm leading-relaxed">{report.summary}</p>}

      {report.improvedStrengths?.length > 0 && (
        <div>
          <p className="text-xs font-bold text-emerald-700 dark:text-emerald-400 mb-1">📈 Improved strengths</p>
          <ul className="text-sm space-y-1 list-disc list-inside">
            {report.improvedStrengths.map((s, i) => <li key={i}>{s}</li>)}
          </ul>
        </div>
      )}
      {report.remainingWeaknesses?.length > 0 && (
        <div>
          <p className="text-xs font-bold text-amber-700 dark:text-amber-400 mb-1">⚠️ Still needs work</p>
          <ul className="text-sm space-y-1 list-disc list-inside">
            {report.remainingWeaknesses.map((s, i) => <li key={i}>{s}</li>)}
          </ul>
        </div>
      )}
      {report.newMistakes?.length > 0 && (
        <div>
          <p className="text-xs font-bold text-rose-700 dark:text-rose-400 mb-1">🆕 New mistakes</p>
          <ul className="text-sm space-y-1 list-disc list-inside">
            {report.newMistakes.map((s, i) => <li key={i}>{s}</li>)}
          </ul>
        </div>
      )}
      {report.focusNext?.length > 0 && (
        <div>
          <p className="text-xs font-bold text-blue-700 dark:text-blue-400 mb-1">🎯 Focus next</p>
          <ul className="text-sm space-y-1 list-disc list-inside">
            {report.focusNext.map((s, i) => <li key={i}>{s}</li>)}
          </ul>
        </div>
      )}
      {report.motivation && (
        <p className="text-sm italic text-primary font-medium">"{report.motivation}"</p>
      )}
    </div>
  );
}

function CoachModal({ coach, onClose, onRefresh, refreshing }: {
  coach: CoachResponse;
  onClose: () => void;
  onRefresh: () => void;
  refreshing: boolean;
}) {
  const s = coach.summary!;
  const TrendIcon = s.overallTrend === "improving" ? TrendingUp
    : s.overallTrend === "declining" ? TrendingDown : Minus;
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-y-auto" onClick={onClose}>
      <div
        className="bg-background w-full sm:max-w-2xl max-h-[95vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl border-2 border-primary/40 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-background border-b border-border p-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-primary" />
            <h3 className="font-bold">Personal Writing Coach Summary</h3>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg hover:bg-accent flex items-center justify-center">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-5 space-y-4">
          <div className="flex items-center gap-3">
            <TrendIcon className="w-6 h-6 text-primary" />
            <div>
              <p className="text-sm font-semibold capitalize">{s.overallTrend}</p>
              <p className="text-xs text-muted-foreground">
                Average band: {typeof s.averageBand === "number" ? s.averageBand.toFixed(1) : "—"} • Based on {coach.submissionCount} submissions
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-emerald-200 bg-emerald-50 dark:bg-emerald-950/30 dark:border-emerald-900 p-3">
            <p className="text-xs font-bold text-emerald-700 dark:text-emerald-300 mb-2">🌟 Top 3 strengths</p>
            <ol className="text-sm space-y-1 list-decimal list-inside">
              {s.topStrengths.map((x, i) => <li key={i}>{x}</li>)}
            </ol>
          </div>

          <div className="rounded-xl border border-amber-200 bg-amber-50 dark:bg-amber-950/30 dark:border-amber-900 p-3">
            <p className="text-xs font-bold text-amber-700 dark:text-amber-300 mb-2">🎯 Top 3 areas to improve</p>
            <ol className="text-sm space-y-1 list-decimal list-inside">
              {s.topImprovements.map((x, i) => <li key={i}>{x}</li>)}
            </ol>
          </div>

          <div className="rounded-xl border border-blue-200 bg-blue-50 dark:bg-blue-950/30 dark:border-blue-900 p-3">
            <p className="text-xs font-bold text-blue-700 dark:text-blue-300 mb-2">📚 Study recommendation</p>
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{s.studyRecommendation}</p>
          </div>

          {s.motivation && (
            <p className="text-sm italic text-primary font-medium text-center">"{s.motivation}"</p>
          )}

          <div className="flex items-center justify-between pt-2 text-xs text-muted-foreground">
            <span>{coach.generatedAt && `Generated ${formatDate(coach.generatedAt)}`}</span>
            <button onClick={onRefresh} disabled={refreshing} className="text-primary font-semibold hover:underline inline-flex items-center gap-1">
              {refreshing ? <Loader2 className="w-3 h-3 animate-spin" /> : <RefreshCw className="w-3 h-3" />}
              Regenerate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
