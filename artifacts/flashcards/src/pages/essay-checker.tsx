import { useState, useRef, useCallback, useEffect } from "react";
import { ChartRenderer } from "@/data/orwell-charts";
import {
  ASSIGNMENTS_BY_CATEGORY,
  CATEGORY_META,
  type Category,
  type OrwellAssignment,
} from "@/data/orwell-assignments";
import { SkipForward } from "lucide-react";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  FileText, Loader2, RotateCcw, Copy, CheckCircle2,
  AlertCircle, ChevronDown, ChevronUp, Sparkles, X, ArrowRight
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Screen = "intro" | "select" | "writing" | "result" | "freechoose" | "freewriting" | "freeresult";
type TaskType = "Task 1" | "Task 2" | "Paragraph" | "Free Check";

interface GrammarError {
  original: string;
  correction: string;
  explanation: string;
  type: string;
}

interface VocabUpgrade {
  original: string;
  better: string;
  example: string;
  reason: string;
}

interface CoherenceIssue {
  original: string;
  correction: string;
  explanation: string;
}

interface ScoreBand {
  band: number;
  feedback: string;
}

interface EssayResult {
  taskType: string;
  wordCount?: number;
  wordCountWarning?: string | null;
  overallBand: number;
  scores: {
    taskResponse: ScoreBand;
    coherenceCohesion: ScoreBand;
    lexicalResource: ScoreBand;
    grammaticalRange: ScoreBand;
  };
  grammarErrors: GrammarError[];
  vocabularyUpgrades: VocabUpgrade[];
  coherenceIssues: CoherenceIssue[];
  strengths: string[];
  improvements: string[];
  revisedIntroduction: string;
  exampleEssayBand6?: string;
  exampleEssayBand8?: string;
}

interface ParagraphCorrection {
  original: string;
  correction: string;
  explanation: string;
  type: string;
}

interface ParagraphResult {
  strengths: string;
  improvements: string;
  corrections: ParagraphCorrection[];
  corrected: string;
  better: string;
  formal: string;
}

// ─── Popup component ──────────────────────────────────────────────────────────

interface PopupData {
  kind: "grammar" | "vocab" | "coherence";
  original: string;
  correction: string;
  explanation: string;
  x: number;
  y: number;
}

function HighlightPopup({ popup, onClose }: { popup: PopupData; onClose: () => void }) {
  const [copied, setCopied] = useState(false);

  const kindLabel: Record<string, string> = {
    grammar: "Grammar Error",
    vocab: "Vocabulary Upgrade",
    coherence: "Coherence Issue",
  };

  const kindColor: Record<string, string> = {
    grammar: "bg-red-50 border-red-200 dark:bg-red-950/40 dark:border-red-800",
    vocab: "bg-yellow-50 border-yellow-200 dark:bg-yellow-950/40 dark:border-yellow-800",
    coherence: "bg-blue-50 border-blue-200 dark:bg-blue-950/40 dark:border-blue-800",
  };

  const badgeColor: Record<string, string> = {
    grammar: "bg-red-100 text-red-700 dark:bg-red-900/60 dark:text-red-300",
    vocab: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/60 dark:text-yellow-300",
    coherence: "bg-blue-100 text-blue-700 dark:bg-blue-900/60 dark:text-blue-300",
  };

  const copyText = `Original: ${popup.original}\nSuggestion: ${popup.correction}\nNote: ${popup.explanation}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(copyText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };

  return (
    <div
      className={`fixed z-50 w-80 rounded-2xl border shadow-2xl p-4 ${kindColor[popup.kind]}`}
      style={{ left: Math.min(popup.x, window.innerWidth - 340), top: popup.y + 12 }}
      onClick={e => e.stopPropagation()}
    >
      <div className="flex items-center justify-between mb-3">
        <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${badgeColor[popup.kind]}`}>
          {kindLabel[popup.kind]}
        </span>
        <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-2 mb-3">
        <div>
          <p className="text-[10px] font-semibold uppercase text-muted-foreground tracking-wider mb-0.5">Original</p>
          <p className="text-sm font-medium line-through text-muted-foreground">"{popup.original}"</p>
        </div>
        <div>
          <p className="text-[10px] font-semibold uppercase text-muted-foreground tracking-wider mb-0.5">
            {popup.kind === "vocab" ? "Better word" : "Correction"}
          </p>
          <p className="text-sm font-semibold text-foreground">"{popup.correction}"</p>
        </div>
        <div>
          <p className="text-[10px] font-semibold uppercase text-muted-foreground tracking-wider mb-0.5">Why</p>
          <p className="text-xs text-muted-foreground leading-relaxed">{popup.explanation}</p>
        </div>
      </div>

      <button
        onClick={handleCopy}
        className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
      >
        {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
        {copied ? "Copied!" : "Copy suggestion"}
      </button>
    </div>
  );
}

// ─── Highlighted Essay ────────────────────────────────────────────────────────

function buildSegments(essay: string, result: EssayResult) {
  type Annotation = {
    start: number; end: number;
    kind: "grammar" | "vocab" | "coherence";
    correction: string;
    explanation: string;
  };

  const annotations: Annotation[] = [];

  const addAnnotations = (
    items: { original: string; correction: string; explanation: string }[],
    kind: "grammar" | "vocab" | "coherence"
  ) => {
    for (const item of items) {
      const phrase = item.original;
      let searchFrom = 0;
      while (searchFrom < essay.length) {
        const idx = essay.toLowerCase().indexOf(phrase.toLowerCase(), searchFrom);
        if (idx === -1) break;
        annotations.push({ start: idx, end: idx + phrase.length, kind, correction: item.correction, explanation: item.explanation });
        searchFrom = idx + phrase.length;
        break;
      }
    }
  };

  addAnnotations(result.grammarErrors, "grammar");
  addAnnotations(result.vocabularyUpgrades.map(v => ({ original: v.original, correction: v.better, explanation: v.reason })), "vocab");
  addAnnotations(result.coherenceIssues, "coherence");

  annotations.sort((a, b) => a.start - b.start);

  const merged: Annotation[] = [];
  for (const ann of annotations) {
    if (merged.length && ann.start < merged[merged.length - 1].end) continue;
    merged.push(ann);
  }

  const segments: Array<{ text: string; ann?: Annotation }> = [];
  let cursor = 0;
  for (const ann of merged) {
    if (ann.start > cursor) segments.push({ text: essay.slice(cursor, ann.start) });
    segments.push({ text: essay.slice(ann.start, ann.end), ann });
    cursor = ann.end;
  }
  if (cursor < essay.length) segments.push({ text: essay.slice(cursor) });

  return segments;
}

const hlBg: Record<string, string> = {
  grammar: "bg-red-200/80 dark:bg-red-800/50 hover:bg-red-300/80 dark:hover:bg-red-700/60",
  vocab: "bg-yellow-200/80 dark:bg-yellow-800/50 hover:bg-yellow-300/80 dark:hover:bg-yellow-700/60",
  coherence: "bg-blue-200/80 dark:bg-blue-800/50 hover:bg-blue-300/80 dark:hover:bg-blue-700/60",
};

function HighlightedEssay({ essay, result }: { essay: string; result: EssayResult }) {
  const [popup, setPopup] = useState<PopupData | null>(null);

  const segments = buildSegments(essay, result);

  const handleSpanClick = (e: React.MouseEvent, seg: { text: string; ann?: { kind: "grammar" | "vocab" | "coherence"; correction: string; explanation: string } }) => {
    e.stopPropagation();
    if (!seg.ann) return;
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    setPopup({
      kind: seg.ann.kind,
      original: seg.text,
      correction: seg.ann.correction,
      explanation: seg.ann.explanation,
      x: rect.left,
      y: rect.bottom + window.scrollY,
    });
  };

  return (
    <div onClick={() => setPopup(null)} className="relative">
      <div className="bg-card border border-border rounded-2xl p-6 leading-relaxed text-sm whitespace-pre-wrap font-medium">
        {segments.map((seg, i) =>
          seg.ann ? (
            <span
              key={i}
              className={`cursor-pointer rounded px-0.5 transition-colors ${hlBg[seg.ann.kind]}`}
              onClick={(e) => handleSpanClick(e, seg)}
              title="Click for details"
            >
              {seg.text}
            </span>
          ) : (
            <span key={i}>{seg.text}</span>
          )
        )}
      </div>

      <div className="flex items-center gap-6 mt-3 text-xs text-muted-foreground flex-wrap">
        <span className="flex items-center gap-1.5"><span className="inline-block w-3 h-3 rounded bg-red-300 dark:bg-red-700" /> Grammar errors</span>
        <span className="flex items-center gap-1.5"><span className="inline-block w-3 h-3 rounded bg-yellow-300 dark:bg-yellow-700" /> Vocabulary upgrades</span>
        <span className="flex items-center gap-1.5"><span className="inline-block w-3 h-3 rounded bg-blue-300 dark:bg-blue-700" /> Coherence issues</span>
        <span className="italic">· Click any highlight for details</span>
      </div>

      {popup && <HighlightPopup popup={popup} onClose={() => setPopup(null)} />}
    </div>
  );
}

// ─── Band score card ──────────────────────────────────────────────────────────

function BandCard({ label, band, feedback }: { label: string; band: number; feedback: string }) {
  const [open, setOpen] = useState(false);
  const color =
    band >= 8 ? "text-green-600" :
    band >= 7 ? "text-teal-600" :
    band >= 6 ? "text-amber-600" :
    "text-orange-500";

  return (
    <div className="bg-card border border-border rounded-2xl p-4">
      <div className="flex items-center justify-between mb-1">
        <p className="text-sm font-semibold text-foreground">{label}</p>
        <span className={`text-2xl font-extrabold ${color}`}>{band}</span>
      </div>
      <Progress value={(band / 9) * 100} className="h-1.5 mb-2" />
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
      >
        {open ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
        {open ? "Hide" : "Show"} feedback
      </button>
      {open && <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{feedback}</p>}
    </div>
  );
}

// ─── Essay Example Box ────────────────────────────────────────────────────────

function EssayExampleBox({
  label, band, text, accentClass, badgeClass,
}: {
  label: string;
  band: string;
  text: string;
  accentClass: string;
  badgeClass: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className={`rounded-2xl border p-5 flex flex-col gap-3 ${accentClass}`}>
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2">
          <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${badgeClass}`}>
            {label}
          </span>
          <span className="text-xs text-muted-foreground font-medium">Band {band}</span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border border-border bg-background hover:bg-muted transition-colors shrink-0"
        >
          {copied
            ? <><CheckCircle2 className="w-3.5 h-3.5 text-green-500" /> Copied!</>
            : <><Copy className="w-3.5 h-3.5" /> Copy</>}
        </button>
      </div>
      <p className="text-sm leading-relaxed text-foreground whitespace-pre-wrap">{text}</p>
    </div>
  );
}

// ─── Paragraph Result Card ────────────────────────────────────────────────────

function ParagraphCard({
  emoji, title, content, accentClass,
}: {
  emoji: string;
  title: string;
  content: string;
  accentClass: string;
}) {
  const [copied, setCopied] = useState(false);

  return (
    <div className={`rounded-2xl border p-5 space-y-3 ${accentClass}`}>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold flex items-center gap-2">
          <span>{emoji}</span> {title}
        </h3>
        <button
          onClick={() => {
            navigator.clipboard.writeText(content).then(() => {
              setCopied(true);
              setTimeout(() => setCopied(false), 1800);
            });
          }}
          className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border border-border bg-background hover:bg-muted transition-colors shrink-0"
        >
          {copied ? <><CheckCircle2 className="w-3.5 h-3.5 text-green-500" /> نُسخ!</> : <><Copy className="w-3.5 h-3.5" /> نسخ</>}
        </button>
      </div>
      <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">{content}</p>
    </div>
  );
}

// ─── Annotated Paragraph (interactive highlights) ────────────────────────────

interface ParaPopupData {
  original: string;
  correction: string;
  explanation: string;
  type: string;
  x: number;
  y: number;
}

const paraKindColor: Record<string, string> = {
  Grammar:    "bg-red-50 border-red-200 dark:bg-red-950/40 dark:border-red-800",
  Vocabulary: "bg-yellow-50 border-yellow-200 dark:bg-yellow-950/40 dark:border-yellow-800",
  Coherence:  "bg-blue-50 border-blue-200 dark:bg-blue-950/40 dark:border-blue-800",
};
const paraBadgeColor: Record<string, string> = {
  Grammar:    "bg-red-100 text-red-700 dark:bg-red-900/60 dark:text-red-300",
  Vocabulary: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/60 dark:text-yellow-300",
  Coherence:  "bg-blue-100 text-blue-700 dark:bg-blue-900/60 dark:text-blue-300",
};

function ParaPopup({ popup, onClose }: { popup: ParaPopupData; onClose: () => void }) {
  const kind = popup.type in paraKindColor ? popup.type : "Grammar";
  return (
    <div
      className={`fixed z-50 w-80 rounded-2xl border shadow-2xl p-4 ${paraKindColor[kind]}`}
      style={{ left: Math.min(popup.x, window.innerWidth - 340), top: popup.y + 12 }}
      onClick={e => e.stopPropagation()}
    >
      <div className="flex items-center justify-between mb-3">
        <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${paraBadgeColor[kind]}`}>
          {popup.type}
        </span>
        <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
          <X className="w-4 h-4" />
        </button>
      </div>
      <div className="space-y-2">
        <div>
          <p className="text-[10px] font-semibold uppercase text-muted-foreground tracking-wider mb-0.5">Original</p>
          <p className="text-sm font-medium line-through text-muted-foreground">"{popup.original}"</p>
        </div>
        <div>
          <p className="text-[10px] font-semibold uppercase text-muted-foreground tracking-wider mb-0.5">Correction</p>
          <p className="text-sm font-semibold text-foreground">"{popup.correction}"</p>
        </div>
        <div>
          <p className="text-[10px] font-semibold uppercase text-muted-foreground tracking-wider mb-0.5">Why</p>
          <p className="text-xs text-muted-foreground leading-relaxed">{popup.explanation}</p>
        </div>
      </div>
    </div>
  );
}

function buildParaSegments(text: string, corrections: ParagraphCorrection[]) {
  type Ann = { start: number; end: number; correction: ParagraphCorrection };
  const annotations: Ann[] = [];

  for (const c of corrections) {
    const idx = text.toLowerCase().indexOf(c.original.toLowerCase());
    if (idx !== -1) {
      annotations.push({ start: idx, end: idx + c.original.length, correction: c });
    }
  }

  annotations.sort((a, b) => a.start - b.start);
  const merged: Ann[] = [];
  for (const ann of annotations) {
    if (merged.length && ann.start < merged[merged.length - 1].end) continue;
    merged.push(ann);
  }

  const segments: Array<{ text: string; ann?: Ann["correction"] }> = [];
  let cursor = 0;
  for (const ann of merged) {
    if (ann.start > cursor) segments.push({ text: text.slice(cursor, ann.start) });
    segments.push({ text: text.slice(ann.start, ann.end), ann: ann.correction });
    cursor = ann.end;
  }
  if (cursor < text.length) segments.push({ text: text.slice(cursor) });
  return segments;
}

const paraHlBg: Record<string, string> = {
  Grammar:    "bg-red-200/80 dark:bg-red-800/50 hover:bg-red-300/80 dark:hover:bg-red-700/60",
  Vocabulary: "bg-yellow-200/80 dark:bg-yellow-800/50 hover:bg-yellow-300/80 dark:hover:bg-yellow-700/60",
  Coherence:  "bg-blue-200/80 dark:bg-blue-800/50 hover:bg-blue-300/80 dark:hover:bg-blue-700/60",
};

function AnnotatedParagraph({ text, corrections }: { text: string; corrections: ParagraphCorrection[] }) {
  const [popup, setPopup] = useState<ParaPopupData | null>(null);
  const segments = buildParaSegments(text, corrections);

  const handleClick = (e: React.MouseEvent, ann: ParagraphCorrection) => {
    e.stopPropagation();
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    setPopup({
      original: ann.original,
      correction: ann.correction,
      explanation: ann.explanation,
      type: ann.type,
      x: rect.left,
      y: rect.bottom,
    });
  };

  const hlColor = (type: string) => paraHlBg[type] ?? paraHlBg["Grammar"];

  return (
    <div onClick={() => setPopup(null)} className="relative">
      <div className="bg-card border border-border rounded-2xl p-5 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold flex items-center gap-2">🔍 Annotated Version</h3>
          {corrections.length > 0 && (
            <span className="text-xs text-muted-foreground font-medium">
              {corrections.length} error{corrections.length !== 1 ? "s" : ""} · click to inspect
            </span>
          )}
        </div>

        <div className="bg-muted/30 rounded-xl p-4 text-sm leading-relaxed whitespace-pre-wrap font-medium">
          {segments.map((seg, i) =>
            seg.ann ? (
              <span
                key={i}
                onClick={(e) => handleClick(e, seg.ann!)}
                className={`cursor-pointer rounded px-0.5 transition-colors ${hlColor(seg.ann.type)}`}
                title="Click for correction"
              >
                {seg.text}
              </span>
            ) : (
              <span key={i}>{seg.text}</span>
            )
          )}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-5 flex-wrap text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5"><span className="inline-block w-3 h-3 rounded bg-red-300 dark:bg-red-700" /> Grammar</span>
          <span className="flex items-center gap-1.5"><span className="inline-block w-3 h-3 rounded bg-yellow-300 dark:bg-yellow-700" /> Vocabulary</span>
          <span className="flex items-center gap-1.5"><span className="inline-block w-3 h-3 rounded bg-blue-300 dark:bg-blue-700" /> Coherence</span>
          <span className="italic">· Click any highlight for details</span>
        </div>
      </div>
      {popup && <ParaPopup popup={popup} onClose={() => setPopup(null)} />}
    </div>
  );
}


const EMAIL_STORAGE_KEY = "4ielts_email";

function getStudentAuthHeaders(): Record<string, string> {
  try {
    const raw = localStorage.getItem(EMAIL_STORAGE_KEY);
    if (!raw) return {};
    const { email, token } = JSON.parse(raw);
    if (!email || !token) return {};
    return { "X-Student-Email": email, "X-Student-Token": token };
  } catch {
    return {};
  }
}

interface CategoryProgress {
  submittedIds: string[];
  skippedIds: string[];
}

function pickNextAssignment(category: Category, progress: CategoryProgress | null): OrwellAssignment | null {
  const all = ASSIGNMENTS_BY_CATEGORY[category];
  const submitted = new Set(progress?.submittedIds ?? []);
  const skipped = new Set(progress?.skippedIds ?? []);
  // Prefer never-touched, then skipped (but never re-show submitted)
  const untouched = all.filter((a) => !submitted.has(a.id) && !skipped.has(a.id));
  if (untouched.length) return untouched[Math.floor(Math.random() * untouched.length)];
  const onlySkipped = all.filter((a) => skipped.has(a.id));
  if (onlySkipped.length) return onlySkipped[Math.floor(Math.random() * onlySkipped.length)];
  return null;
}

export default function EssayChecker() {
  const [screen, setScreen] = useState<Screen>("intro");
  const [category, setCategory] = useState<Category>("task2");
  const [assignment, setAssignment] = useState<OrwellAssignment | null>(null);
  const [essay, setEssay] = useState("");
  const [loading, setLoading] = useState(false);
  const [streamingPreview, setStreamingPreview] = useState<string>("");
  const [result, setResult] = useState<EssayResult | null>(null);
  const [paragraphResult, setParagraphResult] = useState<ParagraphResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [progress, setProgress] = useState<Record<Category, { submitted: number; skipped: number }>>({
    task1: { submitted: 0, skipped: 0 },
    task2: { submitted: 0, skipped: 0 },
    paragraph: { submitted: 0, skipped: 0 },
  });
  // Free Check is independent of the assignment-driven categories.
  type FreeMode = "task1" | "task2" | "paragraph";
  const [freeText, setFreeText] = useState("");
  const [freeMode, setFreeMode] = useState<FreeMode>("task2");
  const [freeResult, setFreeResult] = useState<EssayResult | null>(null);
  const [freeParagraphResult, setFreeParagraphResult] = useState<ParagraphResult | null>(null);
  const freeWordCount = freeText.trim().split(/\s+/).filter(Boolean).length;
  const canSubmitFree = freeText.trim().length >= 10 && !loading;

  const FREE_MODE_META: Record<FreeMode, { label: string; emoji: string; sub: string }> = {
    task1: { label: "Task 1", emoji: "📊", sub: "Report / letter (≥150 words)" },
    task2: { label: "Task 2", emoji: "📝", sub: "Opinion essay (≥250 words)" },
    paragraph: { label: "Paragraph", emoji: "💬", sub: "Letter, email, or paragraph" },
  };
  const [categoryProgress, setCategoryProgress] = useState<CategoryProgress | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  // Abort the in-flight grading stream when the user navigates away or
  // submits again. Prevents stale streams from setting screen state out
  // from under the user.
  const abortRef = useRef<AbortController | null>(null);
  useEffect(() => () => { abortRef.current?.abort(); }, []);

  const wordCount = essay.trim().split(/\s+/).filter(Boolean).length;
  const minWords = assignment?.minWords ?? 250;
  const canSubmit = essay.trim().length >= 10 && !loading && !!assignment;
  const taskType: TaskType = assignment?.category === "task1" ? "Task 1" : assignment?.category === "task2" ? "Task 2" : "Paragraph";

  const totalForCat: Record<Category, number> = {
    task1: ASSIGNMENTS_BY_CATEGORY.task1.length,
    task2: ASSIGNMENTS_BY_CATEGORY.task2.length,
    paragraph: ASSIGNMENTS_BY_CATEGORY.paragraph.length,
  };

  // Load global progress whenever we land on the select screen
  useEffect(() => {
    if (screen !== "select") return;
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/orwell/progress", { headers: getStudentAuthHeaders() });
        if (!res.ok) return;
        const data = await res.json();
        if (!cancelled) setProgress(data);
      } catch {
        // silently ignore
      }
    })();
    return () => { cancelled = true; };
  }, [screen]);

  const loadNextForCategory = useCallback(async (cat: Category) => {
    setError(null);
    let prog: CategoryProgress | null = null;
    try {
      const res = await fetch(`/api/orwell/next?category=${cat}`, { headers: getStudentAuthHeaders() });
      if (res.ok) prog = await res.json();
    } catch {
      // ignore — pick from full list
    }
    setCategoryProgress(prog);
    const next = pickNextAssignment(cat, prog);
    setAssignment(next);
    setEssay("");
    setResult(null);
    setParagraphResult(null);
  }, []);

  const handleChooseCategory = async (cat: Category) => {
    setCategory(cat);
    setScreen("writing");
    await loadNextForCategory(cat);
  };

  const handleSkip = useCallback(async () => {
    if (!assignment) return;
    try {
      await fetch("/api/orwell/skip", {
        method: "POST",
        headers: { "Content-Type": "application/json", ...getStudentAuthHeaders() },
        body: JSON.stringify({ assignmentId: assignment.id, category: assignment.category }),
      });
    } catch {
      // ignore
    }
    const updated: CategoryProgress = {
      submittedIds: categoryProgress?.submittedIds ?? [],
      skippedIds: Array.from(new Set([...(categoryProgress?.skippedIds ?? []), assignment.id])),
    };
    setCategoryProgress(updated);
    setEssay("");
    setError(null);
    setAssignment(pickNextAssignment(assignment.category, updated));
  }, [assignment, categoryProgress]);

  const handleSubmit = useCallback(async () => {
    if (!canSubmit || !assignment) return;
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    setLoading(true);
    setStreamingPreview("");
    setError(null);
    setResult(null);
    setParagraphResult(null);

    try {
      const res = await fetch("/api/orwell/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "text/event-stream",
          ...getStudentAuthHeaders(),
        },
        body: JSON.stringify({
          assignmentId: assignment.id,
          category: assignment.category,
          prompt: assignment.prompt,
          text: essay,
          taskType: taskType === "Paragraph" ? undefined : taskType,
        }),
        signal: controller.signal,
      });

      // Non-streaming error responses (auth, validation, lock conflicts) come
      // back as JSON with a non-2xx status code BEFORE the stream starts.
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error((data as { error?: string }).error ?? "Analysis failed.");
      }
      if (!res.body) throw new Error("Streaming not supported in this browser.");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let accumulated = "";
      let finalResult: Record<string, unknown> | null = null;
      let streamError: string | null = null;

      // Parse incoming Server-Sent-Events frames. Each event is "data: {...}\n\n".
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        let sepIdx;
        while ((sepIdx = buffer.indexOf("\n\n")) !== -1) {
          const frame = buffer.slice(0, sepIdx);
          buffer = buffer.slice(sepIdx + 2);
          for (const line of frame.split("\n")) {
            if (!line.startsWith("data:")) continue;
            const payload = line.slice(5).trim();
            if (!payload) continue;
            try {
              const evt = JSON.parse(payload) as { delta?: string; done?: Record<string, unknown>; error?: string };
              if (typeof evt.delta === "string") {
                accumulated += evt.delta;
                setStreamingPreview(accumulated);
              } else if (evt.done) {
                finalResult = evt.done;
              } else if (evt.error) {
                streamError = evt.error;
              }
            } catch {
              // ignore malformed frame
            }
          }
        }
      }

      if (streamError) throw new Error(streamError);
      if (!finalResult) throw new Error("Grading ended unexpectedly. Please try again.");

      if (assignment.category === "paragraph") {
        setParagraphResult(finalResult as ParagraphResult);
      } else {
        setResult(finalResult as EssayResult);
      }
      // Track that this assignment is now submitted (not just skipped)
      setCategoryProgress((prev) => {
        const submittedIds = Array.from(new Set([...(prev?.submittedIds ?? []), assignment.id]));
        const skippedIds = (prev?.skippedIds ?? []).filter((id) => id !== assignment.id);
        return { submittedIds, skippedIds };
      });
      if (controller.signal.aborted) return;
      setScreen("result");
      setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
    } catch (err) {
      if (controller.signal.aborted) return;
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      if (abortRef.current === controller) abortRef.current = null;
      if (!controller.signal.aborted) {
        setLoading(false);
        setStreamingPreview("");
      }
    }
  }, [canSubmit, assignment, essay, taskType]);

  const handleSubmitFreeCheck = useCallback(async () => {
    if (!canSubmitFree) return;
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    setLoading(true);
    setStreamingPreview("");
    setError(null);
    setFreeResult(null);
    setFreeParagraphResult(null);
    const submittedMode = freeMode;

    try {
      const res = await fetch("/api/orwell/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "text/event-stream",
          ...getStudentAuthHeaders(),
        },
        body: JSON.stringify({
          category: "freecheck",
          mode: submittedMode,
          text: freeText,
        }),
        signal: controller.signal,
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error((data as { error?: string }).error ?? "Analysis failed.");
      }
      if (!res.body) throw new Error("Streaming not supported in this browser.");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let accumulated = "";
      let finalResult: Record<string, unknown> | null = null;
      let streamError: string | null = null;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        let sepIdx;
        while ((sepIdx = buffer.indexOf("\n\n")) !== -1) {
          const frame = buffer.slice(0, sepIdx);
          buffer = buffer.slice(sepIdx + 2);
          for (const line of frame.split("\n")) {
            if (!line.startsWith("data:")) continue;
            const payload = line.slice(5).trim();
            if (!payload) continue;
            try {
              const evt = JSON.parse(payload) as { delta?: string; done?: Record<string, unknown>; error?: string };
              if (typeof evt.delta === "string") {
                accumulated += evt.delta;
                setStreamingPreview(accumulated);
              } else if (evt.done) {
                finalResult = evt.done;
              } else if (evt.error) {
                streamError = evt.error;
              }
            } catch {
              // ignore malformed frame
            }
          }
        }
      }

      if (streamError) throw new Error(streamError);
      if (!finalResult) throw new Error("Grading ended unexpectedly. Please try again.");

      if (controller.signal.aborted) return;
      if (submittedMode === "paragraph") {
        setFreeParagraphResult(finalResult as ParagraphResult);
      } else {
        setFreeResult(finalResult as EssayResult);
      }
      setScreen("freeresult");
      setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
    } catch (err) {
      if (controller.signal.aborted) return;
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      if (abortRef.current === controller) abortRef.current = null;
      if (!controller.signal.aborted) {
        setLoading(false);
        setStreamingPreview("");
      }
    }
  }, [canSubmitFree, freeText, freeMode]);

  const handleCopyFreeReport = () => {
    if (!freeResult) return;
    const lines = [
      `Orwell AI — Free Check Feedback`,
      `Overall Band: ${freeResult.overallBand}`,
      "",
      `Task Response: ${freeResult.scores.taskResponse.band} — ${freeResult.scores.taskResponse.feedback}`,
      `Coherence & Cohesion: ${freeResult.scores.coherenceCohesion.band} — ${freeResult.scores.coherenceCohesion.feedback}`,
      `Lexical Resource: ${freeResult.scores.lexicalResource.band} — ${freeResult.scores.lexicalResource.feedback}`,
      `Grammatical Range & Accuracy: ${freeResult.scores.grammaticalRange.band} — ${freeResult.scores.grammaticalRange.feedback}`,
      "",
      "GRAMMAR ERRORS",
      ...freeResult.grammarErrors.map(e => `• "${e.original}" → "${e.correction}" — ${e.explanation}`),
      "",
      "VOCABULARY UPGRADES",
      ...freeResult.vocabularyUpgrades.map(v => `• "${v.original}" → "${v.better}" — ${v.reason}`),
      "",
      "COHERENCE ISSUES",
      ...freeResult.coherenceIssues.map(c => `• "${c.original}" → "${c.correction}" — ${c.explanation}`),
      "",
      "STRENGTHS",
      ...freeResult.strengths.map(s => `✓ ${s}`),
      "",
      "AREAS FOR IMPROVEMENT",
      ...freeResult.improvements.map(i => `→ ${i}`),
    ];
    navigator.clipboard.writeText(lines.join("\n")).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleNextAssignment = async () => {
    if (!assignment) { setScreen("select"); return; }
    setScreen("writing");
    await loadNextForCategory(assignment.category);
  };

  const handleBackToCategories = () => {
    setScreen("select");
    setEssay("");
    setResult(null);
    setParagraphResult(null);
    setError(null);
  };

  const handleCopyReport = () => {
    if (!result) return;
    const lines = [
      `Orwell AI — IELTS ${result.taskType} Feedback`,
      `Assignment: ${assignment?.title ?? ""}`,
      `Overall Band: ${result.overallBand}`,
      "",
      `Task Response: ${result.scores.taskResponse.band} — ${result.scores.taskResponse.feedback}`,
      `Coherence & Cohesion: ${result.scores.coherenceCohesion.band} — ${result.scores.coherenceCohesion.feedback}`,
      `Lexical Resource: ${result.scores.lexicalResource.band} — ${result.scores.lexicalResource.feedback}`,
      `Grammatical Range & Accuracy: ${result.scores.grammaticalRange.band} — ${result.scores.grammaticalRange.feedback}`,
      "",
      "GRAMMAR ERRORS",
      ...result.grammarErrors.map(e => `• "${e.original}" → "${e.correction}" — ${e.explanation}`),
      "",
      "VOCABULARY UPGRADES",
      ...result.vocabularyUpgrades.map(v => `• "${v.original}" → "${v.better}" — ${v.reason}`),
      "",
      "COHERENCE ISSUES",
      ...result.coherenceIssues.map(c => `• "${c.original}" → "${c.correction}" — ${c.explanation}`),
      "",
      "STRENGTHS",
      ...result.strengths.map(s => `✓ ${s}`),
      "",
      "AREAS FOR IMPROVEMENT",
      ...result.improvements.map(i => `→ ${i}`),
    ];
    navigator.clipboard.writeText(lines.join("\n")).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleCopyParagraphAll = () => {
    if (!paragraphResult) return;
    const lines = [
      "Orwell AI — Paragraph Correction",
      `Assignment: ${assignment?.title ?? ""}`,
      "",
      "✅ STRENGTHS", paragraphResult.strengths, "",
      "⚠️ AREAS FOR IMPROVEMENT", paragraphResult.improvements, "",
      "🔍 CORRECTIONS",
      ...(paragraphResult.corrections ?? []).map(c => `• "${c.original}" → "${c.correction}" (${c.type}): ${c.explanation}`),
      "",
      "📄 CORRECTED VERSION", paragraphResult.corrected, "",
      "⭐ BETTER VERSION", paragraphResult.better, "",
      "🎩 FORMAL VERSION", paragraphResult.formal,
    ];
    navigator.clipboard.writeText(lines.join("\n")).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto animate-in fade-in duration-500">

        {/* ── INTRO SCREEN ── */}
        {screen === "intro" && (
          <div
            className="rounded-3xl overflow-hidden"
            style={{ background: "linear-gradient(160deg, hsl(177,83%,28%) 0%, hsl(177,83%,32%) 60%, hsl(177,83%,28%) 100%)" }}
          >
            <div className="flex flex-col items-center text-center px-6 pt-10 pb-8 gap-6">
              <div>
                <h1 style={{ color: "#C9A84C" }} className="text-4xl font-extrabold tracking-tight">Orwell AI</h1>
                <p className="text-white/70 text-sm mt-1 font-medium">Structured IELTS Writing Assignments</p>
                <p style={{ color: "#C9A84C" }} className="text-xs mt-0.5 font-semibold opacity-80">Powered by 4IELTS.com</p>
              </div>
              <div className="rounded-full overflow-hidden shrink-0 border-4" style={{ width: 180, height: 180, borderColor: "#C9A84C" }}>
                <img src="/orwell.png" alt="Orwell AI" className="w-full h-full object-cover object-top" />
              </div>
              <p className="text-white/80 text-sm leading-relaxed max-w-sm">
                Practise real IELTS-style writing prompts. Choose a category, get an assignment, write your response,
                and Orwell AI will grade it like an examiner. One assignment at a time — no copy-pasting essays you've
                already written.
              </p>
              <button
                onClick={() => setScreen("select")}
                className="flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-base transition-all hover:opacity-90 active:scale-95 shadow-lg"
                style={{ background: "#C9A84C", color: "#0D1B3E" }}
              >
                ✍️ ابدأ التدريب
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* ── CATEGORY SELECT ── */}
        {screen === "select" && (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-extrabold text-foreground">Orwell AI Assignments</h1>
                <p className="text-sm text-muted-foreground">Choose what you want to practise today</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {(["task1", "task2", "paragraph"] as Category[]).map((cat) => {
                const meta = CATEGORY_META[cat];
                const done = progress[cat].submitted;
                const total = totalForCat[cat];
                const pct = total > 0 ? Math.round((done / total) * 100) : 0;
                return (
                  <button
                    key={cat}
                    onClick={() => handleChooseCategory(cat)}
                    className="flex items-center gap-4 p-5 rounded-2xl border-2 border-border bg-card hover:border-primary hover:bg-primary/5 transition-all text-left group"
                  >
                    <span className="text-4xl shrink-0">{meta.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-foreground group-hover:text-primary transition-colors">{meta.label}</p>
                      <p className="text-sm text-muted-foreground">{meta.description}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Progress value={pct} className="h-1.5 flex-1" />
                        <span className="text-xs font-semibold text-muted-foreground shrink-0">{done}/{total}</span>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                  </button>
                );
              })}

              {/* Free Check — 4th card. No assignment, no progress tracking. */}
              <button
                onClick={() => {
                  setFreeText("");
                  setFreeResult(null);
                  setFreeParagraphResult(null);
                  setError(null);
                  setScreen("freechoose");
                }}
                className="flex items-center gap-4 p-5 rounded-2xl border-2 border-dashed border-primary/40 bg-primary/5 hover:border-primary hover:bg-primary/10 transition-all text-left group"
              >
                <span className="text-4xl shrink-0">✨</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-bold text-foreground group-hover:text-primary transition-colors">Free Check</p>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary text-primary-foreground">New</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Paste any essay, paragraph, or writing — get instant Orwell AI feedback &amp; band score.</p>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
              </button>
            </div>

            <div className="bg-muted/30 border border-border rounded-2xl p-4 text-xs text-muted-foreground leading-relaxed">
              <p className="font-semibold text-foreground mb-1">How it works</p>
              <ul className="space-y-1 list-disc list-inside">
                <li>Each category has 15 assignments — you'll get one at a time.</li>
                <li>Hit <strong>Refresh</strong> to skip and get a new one.</li>
                <li>Your teacher can see how many you've completed.</li>
              </ul>
            </div>
          </div>
        )}

        {/* ── WRITING SCREEN ── */}
        {screen === "writing" && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <button
                onClick={handleBackToCategories}
                className="w-9 h-9 rounded-xl border border-border flex items-center justify-center text-muted-foreground hover:bg-accent transition-colors"
                aria-label="Back to categories"
              >
                ←
              </button>
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-2xl">{CATEGORY_META[category].emoji}</span>
                <div className="min-w-0">
                  <h2 className="font-extrabold text-foreground truncate">{CATEGORY_META[category].label}</h2>
                  <p className="text-xs text-muted-foreground">
                    {(categoryProgress?.submittedIds.length ?? 0)} of {totalForCat[category]} completed
                  </p>
                </div>
              </div>
            </div>

            {!assignment && (
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl p-6 text-center">
                <CheckCircle2 className="w-10 h-10 text-green-600 mx-auto mb-3" />
                <h3 className="font-bold text-green-800 dark:text-green-300 mb-1">All assignments completed!</h3>
                <p className="text-sm text-green-700 dark:text-green-400">
                  You've finished every assignment in this category. Great work — try another category.
                </p>
                <Button onClick={handleBackToCategories} className="rounded-full mt-4">
                  Choose another category
                </Button>
              </div>
            )}

            {assignment && (
              <>
                <div className="bg-card border border-border rounded-2xl p-5 space-y-3">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-primary/10 text-primary">
                        {assignment.subtype}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-muted text-muted-foreground">
                        Min {assignment.minWords} words
                      </span>
                    </div>
                    <button
                      onClick={handleSkip}
                      disabled={loading}
                      className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border border-border bg-background hover:bg-muted transition-colors disabled:opacity-50"
                      title="Skip and get another assignment"
                    >
                      <SkipForward className="w-3.5 h-3.5" />
                      Refresh
                    </button>
                  </div>
                  <h3 className="font-bold text-foreground">{assignment.title}</h3>
                  <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">{assignment.prompt}</p>
                </div>

                {assignment.chart && (
                  <div className="text-foreground">
                    <ChartRenderer spec={assignment.chart} />
                  </div>
                )}

                <div className="relative">
                  <textarea
                    className="w-full h-72 p-4 rounded-2xl border border-border bg-card text-foreground text-sm leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-primary/40 transition-shadow"
                    placeholder="Write your response here. Address every part of the prompt."
                    value={essay}
                    onChange={(e) => setEssay(e.target.value)}
                    disabled={loading}
                  />
                  <div className={`absolute bottom-3 right-4 text-xs font-semibold transition-colors ${
                    wordCount >= minWords ? "text-green-600" : "text-muted-foreground"
                  }`}>
                    {wordCount} / {minWords} words
                  </div>
                </div>

                <Button
                  onClick={handleSubmit}
                  disabled={!canSubmit}
                  className="w-full rounded-full h-12 text-base font-semibold"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Orwell AI is grading…
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 mr-2" />
                      Submit for grading
                    </>
                  )}
                </Button>

                {wordCount > 0 && wordCount < minWords && !loading && (
                  <p className="text-center text-xs text-muted-foreground">
                    Recommended at least {minWords} words — you have {wordCount}
                  </p>
                )}

                {loading && (
                  <div className="rounded-2xl border border-primary/30 bg-primary/5 p-4 space-y-2">
                    <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Orwell AI is writing your feedback…
                    </div>
                    {streamingPreview ? (
                      <pre className="whitespace-pre-wrap break-words text-xs text-muted-foreground font-mono max-h-64 overflow-y-auto leading-relaxed">
                        {streamingPreview}
                        <span className="inline-block w-2 h-3 bg-primary/60 ml-0.5 animate-pulse align-baseline" />
                      </pre>
                    ) : (
                      <p className="text-xs text-muted-foreground italic">
                        Reviewing your essay against the official IELTS band descriptors…
                      </p>
                    )}
                  </div>
                )}

                {error && (
                  <div className="flex items-start gap-3 p-4 rounded-2xl bg-destructive/10 border border-destructive/30 text-destructive text-sm">
                    <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                    <p>{error}</p>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* ── RESULT SCREEN ── */}
        {screen === "result" && (
          <div ref={resultRef} className="space-y-6">

            {/* Assignment context */}
            {assignment && (
              <div className="bg-muted/30 border border-border rounded-2xl px-4 py-3 text-xs text-muted-foreground">
                <span className="font-semibold text-foreground">{assignment.title}</span>
                <span className="mx-2">·</span>
                {CATEGORY_META[assignment.category].label}
              </div>
            )}

            {/* PARAGRAPH RESULTS */}
            {taskType === "Paragraph" && paragraphResult && (
              <>
                <div className="flex items-center gap-3 pb-2 border-b border-border">
                  <span className="text-2xl">💬</span>
                  <div>
                    <h2 className="font-extrabold text-foreground">Paragraph Correction</h2>
                    <p className="text-xs text-muted-foreground">Orwell AI · {wordCount} words analysed</p>
                  </div>
                </div>

                <ParagraphCard emoji="✅" title="Strengths" content={paragraphResult.strengths}
                  accentClass="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800" />
                <ParagraphCard emoji="⚠️" title="Areas for Improvement" content={paragraphResult.improvements}
                  accentClass="bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800" />
                <AnnotatedParagraph text={essay} corrections={paragraphResult.corrections ?? []} />
                <ParagraphCard emoji="📄" title="Corrected Version" content={paragraphResult.corrected}
                  accentClass="bg-card border-border" />
                <ParagraphCard emoji="⭐" title="Better Version" content={paragraphResult.better}
                  accentClass="bg-primary/5 border-primary/20" />
                <ParagraphCard emoji="🎩" title="Formal Version" content={paragraphResult.formal}
                  accentClass="bg-slate-50 dark:bg-slate-900/30 border-slate-200 dark:border-slate-700" />

                <div className="flex gap-3 flex-wrap pb-6">
                  <Button onClick={handleCopyParagraphAll} variant="outline" className="rounded-full flex-1">
                    {copied ? <CheckCircle2 className="w-4 h-4 mr-2 text-green-500" /> : <Copy className="w-4 h-4 mr-2" />}
                    {copied ? "Copied!" : "Copy all"}
                  </Button>
                  <Button onClick={handleNextAssignment} className="rounded-full flex-1">
                    <ArrowRight className="w-4 h-4 mr-2" />
                    Next assignment
                  </Button>
                </div>
              </>
            )}

            {/* IELTS ESSAY RESULTS (Task 1 / Task 2) */}
            {(taskType === "Task 1" || taskType === "Task 2") && result && (
              <>
                <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-3xl p-6 text-center">
                  <p className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-1">Overall Band Score</p>
                  <div className="text-8xl font-extrabold text-primary mb-1">{result.overallBand}</div>
                  <p className="text-sm text-muted-foreground">{result.taskType} · {result.wordCount ?? wordCount} words analysed</p>
                </div>

                {result.wordCountWarning && (
                  <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-700 rounded-2xl px-5 py-3 text-sm text-amber-800 dark:text-amber-300 font-medium">
                    {result.wordCountWarning}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <BandCard label="Task Response" band={result.scores.taskResponse.band} feedback={result.scores.taskResponse.feedback} />
                  <BandCard label="Coherence & Cohesion" band={result.scores.coherenceCohesion.band} feedback={result.scores.coherenceCohesion.feedback} />
                  <BandCard label="Lexical Resource" band={result.scores.lexicalResource.band} feedback={result.scores.lexicalResource.feedback} />
                  <BandCard label="Grammatical Range & Accuracy" band={result.scores.grammaticalRange.band} feedback={result.scores.grammaticalRange.feedback} />
                </div>

                <div>
                  <h2 className="text-base font-bold mb-3 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-primary" />
                    Your Essay — Annotated
                  </h2>
                  <HighlightedEssay essay={essay} result={result} />
                </div>

                {result.grammarErrors.length > 0 && (
                  <div>
                    <h2 className="text-base font-bold mb-3 flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-red-400 inline-block" />
                      Grammar Errors ({result.grammarErrors.length})
                    </h2>
                    <div className="space-y-2">
                      {result.grammarErrors.map((e, i) => (
                        <div key={i} className="bg-card border border-border rounded-xl p-4 text-sm">
                          <div className="flex flex-wrap gap-2 items-center mb-1">
                            <span className="line-through text-muted-foreground">"{e.original}"</span>
                            <span className="text-muted-foreground">→</span>
                            <span className="font-semibold text-foreground">"{e.correction}"</span>
                            <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300">{e.type}</span>
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed">{e.explanation}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {result.vocabularyUpgrades.length > 0 && (
                  <div>
                    <h2 className="text-base font-bold mb-3 flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-yellow-400 inline-block" />
                      Vocabulary Upgrades ({result.vocabularyUpgrades.length})
                    </h2>
                    <div className="space-y-2">
                      {result.vocabularyUpgrades.map((v, i) => (
                        <div key={i} className="bg-card border border-border rounded-xl p-4 text-sm">
                          <div className="flex flex-wrap gap-2 items-center mb-1">
                            <span className="line-through text-muted-foreground">"{v.original}"</span>
                            <span className="text-muted-foreground">→</span>
                            <span className="font-semibold text-foreground">"{v.better}"</span>
                          </div>
                          <p className="text-xs text-muted-foreground italic mb-1">"{v.example}"</p>
                          <p className="text-xs text-muted-foreground leading-relaxed">{v.reason}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {result.coherenceIssues.length > 0 && (
                  <div>
                    <h2 className="text-base font-bold mb-3 flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-blue-400 inline-block" />
                      Coherence Issues ({result.coherenceIssues.length})
                    </h2>
                    <div className="space-y-2">
                      {result.coherenceIssues.map((c, i) => (
                        <div key={i} className="bg-card border border-border rounded-xl p-4 text-sm">
                          <div className="flex flex-wrap gap-2 items-center mb-1">
                            <span className="line-through text-muted-foreground">"{c.original}"</span>
                            <span className="text-muted-foreground">→</span>
                            <span className="font-semibold text-foreground">"{c.correction}"</span>
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed">{c.explanation}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl p-5">
                    <h3 className="text-sm font-bold text-green-700 dark:text-green-400 mb-3 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" /> Strengths
                    </h3>
                    <ul className="space-y-1.5">
                      {result.strengths.map((s, i) => (
                        <li key={i} className="text-xs text-green-800 dark:text-green-300 leading-relaxed flex gap-2">
                          <span className="shrink-0">✓</span>{s}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-5">
                    <h3 className="text-sm font-bold text-amber-700 dark:text-amber-400 mb-3 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" /> To Improve
                    </h3>
                    <ul className="space-y-1.5">
                      {result.improvements.map((item, i) => (
                        <li key={i} className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed flex gap-2">
                          <span className="shrink-0">→</span>{item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {(result.exampleEssayBand6 || result.exampleEssayBand8) && (
                  <div>
                    <h2 className="text-base font-bold mb-1 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-primary" />
                      Example Essays
                    </h2>
                    <p className="text-xs text-muted-foreground mb-4">
                      See how this assignment can be answered at two different levels. Use these as a study guide — not to copy.
                    </p>
                    <div className="space-y-4">
                      <EssayExampleBox label="Your Original Essay" band="—" text={essay}
                        accentClass="bg-card border-border" badgeClass="bg-muted text-muted-foreground" />
                      {result.exampleEssayBand6 && (
                        <EssayExampleBox label="Improved — Intermediate" band="5.5 – 6" text={result.exampleEssayBand6}
                          accentClass="bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800"
                          badgeClass="bg-amber-100 text-amber-700 dark:bg-amber-900/60 dark:text-amber-300" />
                      )}
                      {result.exampleEssayBand8 && (
                        <EssayExampleBox label="Improved — Advanced" band="7 – 8" text={result.exampleEssayBand8}
                          accentClass="bg-teal-50 dark:bg-teal-900/20 border-teal-200 dark:border-teal-800"
                          badgeClass="bg-teal-100 text-teal-700 dark:bg-teal-900/60 dark:text-teal-300" />
                      )}
                    </div>
                  </div>
                )}

                <div className="flex gap-3 flex-wrap pb-6">
                  <Button onClick={handleCopyReport} variant="outline" className="rounded-full flex-1">
                    {copied ? <CheckCircle2 className="w-4 h-4 mr-2 text-green-500" /> : <Copy className="w-4 h-4 mr-2" />}
                    {copied ? "Copied!" : "Copy feedback"}
                  </Button>
                  <Button onClick={handleNextAssignment} className="rounded-full flex-1">
                    <ArrowRight className="w-4 h-4 mr-2" />
                    Next assignment
                  </Button>
                </div>
              </>
            )}
          </div>
        )}

        {/* ── FREE CHECK — CHOOSE ASSIGNMENT TYPE ── */}
        {screen === "freechoose" && (
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <button
                onClick={handleBackToCategories}
                className="w-9 h-9 rounded-xl border border-border flex items-center justify-center text-muted-foreground hover:bg-accent transition-colors"
                aria-label="Back to categories"
              >
                ←
              </button>
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-2xl">✨</span>
                <div className="min-w-0">
                  <h2 className="font-extrabold text-foreground truncate">Free Check</h2>
                  <p className="text-xs text-muted-foreground">Step 1 of 2 — choose what you want graded.</p>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-5">
              <p className="text-sm text-muted-foreground leading-relaxed">
                Tell Orwell AI what kind of writing you're submitting so it can use the right rubric.
              </p>
            </div>

            <div className="space-y-3">
              {(Object.keys(FREE_MODE_META) as FreeMode[]).map((m) => {
                const meta = FREE_MODE_META[m];
                return (
                  <button
                    key={m}
                    type="button"
                    onClick={() => {
                      setFreeMode(m);
                      setError(null);
                      setScreen("freewriting");
                    }}
                    className="w-full flex items-center gap-4 p-5 rounded-2xl border border-border bg-card hover:border-primary hover:bg-primary/5 transition-all text-left group"
                  >
                    <span className="text-4xl shrink-0">{meta.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-foreground group-hover:text-primary transition-colors">{meta.label}</p>
                      <p className="text-sm text-muted-foreground">{meta.sub}</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ── FREE CHECK — WRITING ── */}
        {screen === "freewriting" && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <button
                onClick={handleBackToCategories}
                className="w-9 h-9 rounded-xl border border-border flex items-center justify-center text-muted-foreground hover:bg-accent transition-colors"
                aria-label="Back to categories"
              >
                ←
              </button>
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-2xl">✨</span>
                <div className="min-w-0">
                  <h2 className="font-extrabold text-foreground truncate">Free Check</h2>
                  <p className="text-xs text-muted-foreground">Paste any writing — Orwell AI will give feedback &amp; an IELTS band score.</p>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-primary/10 text-primary">
                    {FREE_MODE_META[freeMode].emoji} {FREE_MODE_META[freeMode].label}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-muted text-muted-foreground">
                    {freeMode === "paragraph" ? "Writing Coach" : "IELTS Band Analysis"}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => !loading && setScreen("freechoose")}
                  disabled={loading}
                  className="text-[11px] font-semibold text-primary hover:underline disabled:opacity-50"
                >
                  Change
                </button>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {freeMode === "task1" && "Paste your IELTS Task 1 response (report or letter). Orwell AI will grade it using the official Task 1 rubric."}
                {freeMode === "task2" && "Paste your IELTS Task 2 essay. Orwell AI will grade it using the official Task 2 band descriptors."}
                {freeMode === "paragraph" && "Paste your paragraph, letter, or email. Orwell AI will give you grammar, vocabulary, and improved-version feedback."}
              </p>
            </div>

            <div className="relative">
              <textarea
                className="w-full h-72 p-4 rounded-2xl border border-border bg-card text-foreground text-sm leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-primary/40 transition-shadow"
                placeholder="Paste or type your writing here…"
                value={freeText}
                onChange={(e) => setFreeText(e.target.value)}
                disabled={loading}
              />
              <div className="absolute bottom-3 right-4 text-xs font-semibold text-muted-foreground">
                {freeWordCount} words
              </div>
            </div>

            <Button
              onClick={handleSubmitFreeCheck}
              disabled={!canSubmitFree}
              className="w-full rounded-full h-12 text-base font-semibold"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Orwell AI is grading…
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Submit for grading
                </>
              )}
            </Button>

            {loading && (
              <div className="rounded-2xl border border-primary/30 bg-primary/5 p-4 space-y-2">
                <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Orwell AI is writing your feedback…
                </div>
                {streamingPreview ? (
                  <pre className="whitespace-pre-wrap break-words text-xs text-muted-foreground font-mono max-h-64 overflow-y-auto leading-relaxed">
                    {streamingPreview}
                    <span className="inline-block w-2 h-3 bg-primary/60 ml-0.5 animate-pulse align-baseline" />
                  </pre>
                ) : (
                  <p className="text-xs text-muted-foreground italic">
                    Reviewing your writing against the official IELTS band descriptors…
                  </p>
                )}
              </div>
            )}

            {error && (
              <div className="flex items-start gap-3 p-4 rounded-2xl bg-destructive/10 border border-destructive/30 text-destructive text-sm">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <p>{error}</p>
              </div>
            )}
          </div>
        )}

        {/* ── FREE CHECK — PARAGRAPH RESULT ── */}
        {screen === "freeresult" && freeParagraphResult && (
          <div ref={resultRef} className="space-y-5">
            <div className="flex items-center gap-3">
              <button
                onClick={handleBackToCategories}
                className="w-9 h-9 rounded-xl border border-border flex items-center justify-center text-muted-foreground hover:bg-accent transition-colors"
                aria-label="Back to categories"
              >
                ←
              </button>
              <div>
                <h2 className="font-extrabold text-foreground">Free Check · Paragraph</h2>
                <p className="text-xs text-muted-foreground">{freeWordCount} words analysed</p>
              </div>
            </div>

            <ParagraphCard emoji="✅" title="Strengths" content={freeParagraphResult.strengths}
              accentClass="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800" />
            <ParagraphCard emoji="⚠️" title="Areas for Improvement" content={freeParagraphResult.improvements}
              accentClass="bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800" />
            <AnnotatedParagraph text={freeText} corrections={freeParagraphResult.corrections ?? []} />
            <ParagraphCard emoji="📄" title="Corrected Version" content={freeParagraphResult.corrected}
              accentClass="bg-card border-border" />
            <ParagraphCard emoji="⭐" title="Better Version" content={freeParagraphResult.better}
              accentClass="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800" />
            <ParagraphCard emoji="🎩" title="Formal Version" content={freeParagraphResult.formal}
              accentClass="bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800" />

            <div className="flex gap-3 flex-wrap pb-6">
              <Button
                onClick={() => {
                  setFreeText("");
                  setFreeParagraphResult(null);
                  setError(null);
                  setScreen("freewriting");
                }}
                variant="outline"
                className="rounded-full flex-1"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Check another piece
              </Button>
              <Button onClick={handleBackToCategories} className="rounded-full flex-1">
                <ArrowRight className="w-4 h-4 mr-2" />
                Back to categories
              </Button>
            </div>
          </div>
        )}

        {/* ── FREE CHECK — IELTS RESULT (Task 1 / Task 2) ── */}
        {screen === "freeresult" && freeResult && (
          <div ref={resultRef} className="space-y-6">
            <div className="bg-muted/30 border border-border rounded-2xl px-4 py-3 text-xs text-muted-foreground">
              <span className="font-semibold text-foreground">Free Check · {freeResult.taskType ?? "IELTS"}</span>
              <span className="mx-2">·</span>
              No assignment — your own writing
            </div>

            <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-3xl p-6 text-center">
              <p className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-1">Overall Band Score</p>
              <div className="text-8xl font-extrabold text-primary mb-1">{freeResult.overallBand}</div>
              <p className="text-sm text-muted-foreground">Free Check · {freeResult.wordCount ?? freeWordCount} words analysed</p>
            </div>

            {freeResult.wordCountWarning && (
              <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-700 rounded-2xl px-5 py-3 text-sm text-amber-800 dark:text-amber-300 font-medium">
                {freeResult.wordCountWarning}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <BandCard label="Task Response" band={freeResult.scores.taskResponse.band} feedback={freeResult.scores.taskResponse.feedback} />
              <BandCard label="Coherence & Cohesion" band={freeResult.scores.coherenceCohesion.band} feedback={freeResult.scores.coherenceCohesion.feedback} />
              <BandCard label="Lexical Resource" band={freeResult.scores.lexicalResource.band} feedback={freeResult.scores.lexicalResource.feedback} />
              <BandCard label="Grammatical Range & Accuracy" band={freeResult.scores.grammaticalRange.band} feedback={freeResult.scores.grammaticalRange.feedback} />
            </div>

            <div>
              <h2 className="text-base font-bold mb-3 flex items-center gap-2">
                <FileText className="w-4 h-4 text-primary" />
                Your Writing — Annotated
              </h2>
              <HighlightedEssay essay={freeText} result={freeResult} />
            </div>

            {freeResult.grammarErrors.length > 0 && (
              <div>
                <h2 className="text-base font-bold mb-3 flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-400 inline-block" />
                  Grammar Errors ({freeResult.grammarErrors.length})
                </h2>
                <div className="space-y-2">
                  {freeResult.grammarErrors.map((e, i) => (
                    <div key={i} className="bg-card border border-border rounded-xl p-4 text-sm">
                      <div className="flex flex-wrap gap-2 items-center mb-1">
                        <span className="line-through text-muted-foreground">"{e.original}"</span>
                        <span className="text-muted-foreground">→</span>
                        <span className="font-semibold text-foreground">"{e.correction}"</span>
                        <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300">{e.type}</span>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">{e.explanation}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {freeResult.vocabularyUpgrades.length > 0 && (
              <div>
                <h2 className="text-base font-bold mb-3 flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-yellow-400 inline-block" />
                  Vocabulary Upgrades ({freeResult.vocabularyUpgrades.length})
                </h2>
                <div className="space-y-2">
                  {freeResult.vocabularyUpgrades.map((v, i) => (
                    <div key={i} className="bg-card border border-border rounded-xl p-4 text-sm">
                      <div className="flex flex-wrap gap-2 items-center mb-1">
                        <span className="line-through text-muted-foreground">"{v.original}"</span>
                        <span className="text-muted-foreground">→</span>
                        <span className="font-semibold text-foreground">"{v.better}"</span>
                      </div>
                      <p className="text-xs text-muted-foreground italic mb-1">"{v.example}"</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">{v.reason}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {freeResult.coherenceIssues.length > 0 && (
              <div>
                <h2 className="text-base font-bold mb-3 flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-blue-400 inline-block" />
                  Coherence Issues ({freeResult.coherenceIssues.length})
                </h2>
                <div className="space-y-2">
                  {freeResult.coherenceIssues.map((c, i) => (
                    <div key={i} className="bg-card border border-border rounded-xl p-4 text-sm">
                      <div className="flex flex-wrap gap-2 items-center mb-1">
                        <span className="line-through text-muted-foreground">"{c.original}"</span>
                        <span className="text-muted-foreground">→</span>
                        <span className="font-semibold text-foreground">"{c.correction}"</span>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">{c.explanation}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl p-5">
                <h3 className="text-sm font-bold text-green-700 dark:text-green-400 mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> Strengths
                </h3>
                <ul className="space-y-1.5">
                  {freeResult.strengths.map((s, i) => (
                    <li key={i} className="text-xs text-green-800 dark:text-green-300 leading-relaxed flex gap-2">
                      <span className="shrink-0">✓</span>{s}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-5">
                <h3 className="text-sm font-bold text-amber-700 dark:text-amber-400 mb-3 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" /> To Improve
                </h3>
                <ul className="space-y-1.5">
                  {freeResult.improvements.map((item, i) => (
                    <li key={i} className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed flex gap-2">
                      <span className="shrink-0">→</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {(freeResult.exampleEssayBand6 || freeResult.exampleEssayBand8) && (
              <div>
                <h2 className="text-base font-bold mb-1 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  Improved Versions
                </h2>
                <p className="text-xs text-muted-foreground mb-4">
                  Orwell AI rewrote your piece at two stronger levels — use them as a study guide, not to copy.
                </p>
                <div className="space-y-4">
                  <EssayExampleBox label="Your Original Writing" band="—" text={freeText}
                    accentClass="bg-card border-border" badgeClass="bg-muted text-muted-foreground" />
                  {freeResult.exampleEssayBand6 && (
                    <EssayExampleBox label="Improved — Intermediate" band="5.5 – 6" text={freeResult.exampleEssayBand6}
                      accentClass="bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800"
                      badgeClass="bg-amber-100 text-amber-700 dark:bg-amber-900/60 dark:text-amber-300" />
                  )}
                  {freeResult.exampleEssayBand8 && (
                    <EssayExampleBox label="Improved — Advanced" band="7 – 8" text={freeResult.exampleEssayBand8}
                      accentClass="bg-teal-50 dark:bg-teal-900/20 border-teal-200 dark:border-teal-800"
                      badgeClass="bg-teal-100 text-teal-700 dark:bg-teal-900/60 dark:text-teal-300" />
                  )}
                </div>
              </div>
            )}

            <div className="flex gap-3 flex-wrap pb-6">
              <Button onClick={handleCopyFreeReport} variant="outline" className="rounded-full flex-1">
                {copied ? <CheckCircle2 className="w-4 h-4 mr-2 text-green-500" /> : <Copy className="w-4 h-4 mr-2" />}
                {copied ? "Copied!" : "Copy feedback"}
              </Button>
              <Button
                onClick={() => {
                  setFreeText("");
                  setFreeResult(null);
                  setError(null);
                  setScreen("freewriting");
                }}
                variant="outline"
                className="rounded-full flex-1"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Check another piece
              </Button>
              <Button onClick={handleBackToCategories} className="rounded-full flex-1">
                <ArrowRight className="w-4 h-4 mr-2" />
                Back to categories
              </Button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

