import { useState, useRef, useCallback } from "react";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  FileText, Loader2, RotateCcw, Copy, CheckCircle2,
  AlertCircle, ChevronDown, ChevronUp, Sparkles, X, ArrowRight
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Screen = "intro" | "select" | "writing" | "result";
type TaskType = "Task 1" | "Task 2" | "Paragraph";

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

// ─── Main component ───────────────────────────────────────────────────────────

export default function EssayChecker() {
  const [screen, setScreen] = useState<Screen>("intro");
  const [taskType, setTaskType] = useState<TaskType>("Task 2");
  const [essay, setEssay] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<EssayResult | null>(null);
  const [paragraphResult, setParagraphResult] = useState<ParagraphResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  const minWords = taskType === "Task 1" ? 150 : taskType === "Task 2" ? 250 : 20;
  const wordCount = essay.trim().split(/\s+/).filter(Boolean).length;
  const canSubmit = essay.trim().length >= 10 && !loading;

  const handleSubmit = useCallback(async () => {
    if (!canSubmit) return;
    setLoading(true);
    setError(null);
    setResult(null);
    setParagraphResult(null);

    try {
      if (taskType === "Paragraph") {
        const res = await fetch("/api/paragraph-check", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: essay }),
        });
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error((data as { error?: string }).error ?? "Analysis failed.");
        }
        const data = await res.json() as ParagraphResult;
        setParagraphResult(data);
      } else {
        const res = await fetch("/api/essay-check", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ essay, taskType }),
        });
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error((data as { error?: string }).error ?? "Analysis failed.");
        }
        const data = await res.json() as EssayResult;
        setResult(data);
      }
      setScreen("result");
      setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [canSubmit, essay, taskType]);

  const handleReset = () => {
    setEssay("");
    setResult(null);
    setParagraphResult(null);
    setError(null);
    setScreen("select");
  };

  const handleCopyReport = () => {
    if (!result) return;
    const lines = [
      `Orwell AI — IELTS ${result.taskType} Feedback`,
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
      "",
      "REVISED INTRODUCTION",
      result.revisedIntroduction,
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
      "",
      "✅ STRENGTHS",
      paragraphResult.strengths,
      "",
      "⚠️ AREAS FOR IMPROVEMENT",
      paragraphResult.improvements,
      "",
      "🔍 CORRECTIONS",
      ...(paragraphResult.corrections ?? []).map(c => `• "${c.original}" → "${c.correction}" (${c.type}): ${c.explanation}`),
      "",
      "📄 CORRECTED VERSION",
      paragraphResult.corrected,
      "",
      "⭐ BETTER VERSION",
      paragraphResult.better,
      "",
      "🎩 FORMAL VERSION",
      paragraphResult.formal,
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
              {/* Logo text */}
              <div>
                <h1 style={{ color: "#C9A84C" }} className="text-4xl font-extrabold tracking-tight">
                  Orwell AI
                </h1>
                <p className="text-white/70 text-sm mt-1 font-medium">Your Personal Writing Corrector</p>
                <p style={{ color: "#C9A84C" }} className="text-xs mt-0.5 font-semibold opacity-80">
                  Powered by 4IELTS.com
                </p>
              </div>

              {/* Profile image */}
              <div
                className="rounded-full overflow-hidden shrink-0 border-4"
                style={{ width: 180, height: 180, borderColor: "#C9A84C" }}
              >
                <img
                  src="/orwell.png"
                  alt="Orwell AI"
                  className="w-full h-full object-cover object-top"
                />
              </div>

              {/* Description */}
              <p className="text-white/80 text-sm leading-relaxed max-w-sm">
                Meet Orwell AI — your expert writing corrector. Whether you're writing an IELTS Task 1,
                Task 2, or an everyday paragraph, Orwell AI gives you professional feedback,
                corrections, and better versions of your writing.
              </p>

              {/* CTA button */}
              <button
                onClick={() => setScreen("select")}
                className="flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-base transition-all hover:opacity-90 active:scale-95 shadow-lg"
                style={{ background: "#C9A84C", color: "#0D1B3E" }}
              >
                ✍️ ابدأ التصحيح
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* ── TASK SELECTION SCREEN ── */}
        {screen === "select" && (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-extrabold text-foreground">Orwell AI</h1>
                <p className="text-sm text-muted-foreground">IELTS Corrector · Powered by 4IELTS.com</p>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-bold text-foreground mb-1">ماذا تريد أن تصحّح؟</h2>
              <p className="text-sm text-muted-foreground">What would you like to correct?</p>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {[
                {
                  type: "Task 1" as TaskType,
                  emoji: "📊",
                  title: "Task 1",
                  subtitle: "Academic/General — report or letter",
                  arabic: "تقرير أو رسالة أكاديمية",
                },
                {
                  type: "Task 2" as TaskType,
                  emoji: "📝",
                  title: "Task 2",
                  subtitle: "Academic essay or argument",
                  arabic: "مقالة أكاديمية أو حجة",
                },
                {
                  type: "Paragraph" as TaskType,
                  emoji: "💬",
                  title: "Paragraph",
                  subtitle: "Message, email, or any paragraph",
                  arabic: "رسالة، بريد إلكتروني، أو فقرة عامة",
                },
              ].map((opt) => (
                <button
                  key={opt.type}
                  onClick={() => { setTaskType(opt.type); setScreen("writing"); }}
                  className="flex items-center gap-4 p-5 rounded-2xl border-2 border-border bg-card hover:border-primary hover:bg-primary/5 transition-all text-left group"
                >
                  <span className="text-4xl shrink-0">{opt.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-foreground group-hover:text-primary transition-colors">{opt.title}</p>
                    <p className="text-sm text-muted-foreground">{opt.subtitle}</p>
                    <p className="text-xs text-muted-foreground/70 mt-0.5">{opt.arabic}</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── WRITING SCREEN ── */}
        {screen === "writing" && (
          <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setScreen("select")}
                className="w-9 h-9 rounded-xl border border-border flex items-center justify-center text-muted-foreground hover:bg-accent transition-colors"
              >
                ←
              </button>
              <div className="flex items-center gap-2">
                <span className="text-2xl">
                  {taskType === "Task 1" ? "📊" : taskType === "Task 2" ? "📝" : "💬"}
                </span>
                <div>
                  <h2 className="font-extrabold text-foreground">{taskType}</h2>
                  <p className="text-xs text-muted-foreground">
                    {taskType === "Paragraph" ? "Paragraph, message, or email" : `IELTS ${taskType}`}
                  </p>
                </div>
              </div>
            </div>

            {/* Textarea */}
            <div className="relative">
              <textarea
                className="w-full h-72 p-4 rounded-2xl border border-border bg-card text-foreground text-sm leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-primary/40 transition-shadow"
                placeholder={
                  taskType === "Paragraph"
                    ? "اكتب أو الصق فقرتك هنا...\n\nWrite or paste your paragraph, message, or email here…"
                    : `Write or paste your IELTS ${taskType} here...\n\nMin ${minWords} words required.`
                }
                value={essay}
                onChange={e => setEssay(e.target.value)}
                disabled={loading}
              />
              <div className={`absolute bottom-3 right-4 text-xs font-semibold transition-colors ${
                taskType === "Paragraph" ? "text-muted-foreground" :
                wordCount >= minWords ? "text-green-600" : "text-muted-foreground"
              }`}>
                {wordCount} words{taskType !== "Paragraph" && ` / ${minWords}`}
              </div>
            </div>

            {/* Submit */}
            <Button
              onClick={handleSubmit}
              disabled={!canSubmit}
              className="w-full rounded-full h-12 text-base font-semibold"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  {taskType === "Paragraph" ? "Orwell AI يصحّح…" : "Analysing your essay…"}
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  {taskType === "Paragraph" ? "✍️ صحّح فقرتي" : "Check My Essay"}
                </>
              )}
            </Button>

            {taskType !== "Paragraph" && wordCount > 0 && wordCount < minWords && !loading && (
              <p className="text-center text-xs text-muted-foreground">
                IELTS {taskType} recommends at least {minWords} words — you have {wordCount}
              </p>
            )}

            {error && (
              <div className="flex items-start gap-3 p-4 rounded-2xl bg-destructive/10 border border-destructive/30 text-destructive text-sm">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <p>{error}</p>
              </div>
            )}
          </div>
        )}

        {/* ── RESULT SCREEN ── */}
        {screen === "result" && (
          <div ref={resultRef} className="space-y-6">

            {/* ── PARAGRAPH RESULTS ── */}
            {taskType === "Paragraph" && paragraphResult && (
              <>
                {/* Header */}
                <div className="flex items-center gap-3 pb-2 border-b border-border">
                  <span className="text-2xl">💬</span>
                  <div>
                    <h2 className="font-extrabold text-foreground">Paragraph Correction</h2>
                    <p className="text-xs text-muted-foreground">Orwell AI · {wordCount} words analysed</p>
                  </div>
                </div>

                <ParagraphCard
                  emoji="✅"
                  title="Strengths"
                  content={paragraphResult.strengths}
                  accentClass="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
                />
                <ParagraphCard
                  emoji="⚠️"
                  title="Areas for Improvement"
                  content={paragraphResult.improvements}
                  accentClass="bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800"
                />
                <AnnotatedParagraph
                  text={essay}
                  corrections={paragraphResult.corrections ?? []}
                />
                <ParagraphCard
                  emoji="📄"
                  title="Corrected Version"
                  content={paragraphResult.corrected}
                  accentClass="bg-card border-border"
                />
                <ParagraphCard
                  emoji="⭐"
                  title="Better Version"
                  content={paragraphResult.better}
                  accentClass="bg-primary/5 border-primary/20"
                />
                <ParagraphCard
                  emoji="🎩"
                  title="Formal Version"
                  content={paragraphResult.formal}
                  accentClass="bg-slate-50 dark:bg-slate-900/30 border-slate-200 dark:border-slate-700"
                />

                {/* Action buttons */}
                <div className="flex gap-3 flex-wrap pb-6">
                  <Button onClick={handleCopyParagraphAll} variant="outline" className="rounded-full flex-1">
                    {copied ? <CheckCircle2 className="w-4 h-4 mr-2 text-green-500" /> : <Copy className="w-4 h-4 mr-2" />}
                    {copied ? "نُسخ!" : "📋 نسخ الكل"}
                  </Button>
                  <Button onClick={handleReset} variant="outline" className="rounded-full flex-1">
                    <RotateCcw className="w-4 h-4 mr-2" />
                    🔄 تصحيح جديد
                  </Button>
                </div>
              </>
            )}

            {/* ── IELTS ESSAY RESULTS ── */}
            {(taskType === "Task 1" || taskType === "Task 2") && result && (
              <>
                {/* Overall Band */}
                <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-3xl p-6 text-center">
                  <p className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-1">Overall Band Score</p>
                  <div className="text-8xl font-extrabold text-primary mb-1">{result.overallBand}</div>
                  <p className="text-sm text-muted-foreground">{result.taskType} · {wordCount} words analysed</p>
                </div>

                {/* 4 Band Scores */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <BandCard label="Task Response" band={result.scores.taskResponse.band} feedback={result.scores.taskResponse.feedback} />
                  <BandCard label="Coherence & Cohesion" band={result.scores.coherenceCohesion.band} feedback={result.scores.coherenceCohesion.feedback} />
                  <BandCard label="Lexical Resource" band={result.scores.lexicalResource.band} feedback={result.scores.lexicalResource.feedback} />
                  <BandCard label="Grammatical Range & Accuracy" band={result.scores.grammaticalRange.band} feedback={result.scores.grammaticalRange.feedback} />
                </div>

                {/* Highlighted Essay */}
                <div>
                  <h2 className="text-base font-bold mb-3 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-primary" />
                    Your Essay — Annotated
                  </h2>
                  <HighlightedEssay essay={essay} result={result} />
                </div>

                {/* Grammar Errors */}
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

                {/* Vocabulary Upgrades */}
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

                {/* Coherence Issues */}
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

                {/* Strengths + Improvements */}
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

                {/* Revised Introduction */}
                {result.revisedIntroduction && (
                  <div>
                    <h2 className="text-base font-bold mb-3">Revised Introduction</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-card border border-border rounded-2xl p-4">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2">Original</p>
                        <p className="text-sm text-muted-foreground leading-relaxed italic">
                          {essay.split(/\n\n/)[0] || essay.slice(0, 300)}
                        </p>
                      </div>
                      <div className="bg-primary/5 border border-primary/20 rounded-2xl p-4">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-primary mb-2">Improved</p>
                        <p className="text-sm text-foreground leading-relaxed">{result.revisedIntroduction}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Example Essays */}
                {(result.exampleEssayBand6 || result.exampleEssayBand8) && (
                  <div>
                    <h2 className="text-base font-bold mb-1 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-primary" />
                      Example Essays for Improvement
                    </h2>
                    <p className="text-xs text-muted-foreground mb-4">
                      See how your essay can be rewritten at two different levels. Use these as a study guide — not to copy.
                    </p>
                    <div className="space-y-4">
                      <EssayExampleBox
                        label="Your Original Essay"
                        band="—"
                        text={essay}
                        accentClass="bg-card border-border"
                        badgeClass="bg-muted text-muted-foreground"
                      />
                      {result.exampleEssayBand6 && (
                        <EssayExampleBox
                          label="Improved — Intermediate"
                          band="5.5 – 6"
                          text={result.exampleEssayBand6}
                          accentClass="bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800"
                          badgeClass="bg-amber-100 text-amber-700 dark:bg-amber-900/60 dark:text-amber-300"
                        />
                      )}
                      {result.exampleEssayBand8 && (
                        <EssayExampleBox
                          label="Improved — Advanced"
                          band="7 – 8"
                          text={result.exampleEssayBand8}
                          accentClass="bg-teal-50 dark:bg-teal-900/20 border-teal-200 dark:border-teal-800"
                          badgeClass="bg-teal-100 text-teal-700 dark:bg-teal-900/60 dark:text-teal-300"
                        />
                      )}
                    </div>
                  </div>
                )}

                {/* Action buttons */}
                <div className="flex gap-3 flex-wrap pb-6">
                  <Button onClick={handleCopyReport} variant="outline" className="rounded-full flex-1">
                    {copied ? <CheckCircle2 className="w-4 h-4 mr-2 text-green-500" /> : <Copy className="w-4 h-4 mr-2" />}
                    {copied ? "Copied!" : "Copy Feedback"}
                  </Button>
                  <Button onClick={handleReset} variant="outline" className="rounded-full flex-1">
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Check Another
                  </Button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}
