import { useState, useRef, useCallback } from "react";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  FileText, Loader2, RotateCcw, Copy, CheckCircle2,
  AlertCircle, ChevronDown, ChevronUp, Sparkles, X
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

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
  label,
  band,
  text,
  accentClass,
  badgeClass,
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

// ─── Main component ───────────────────────────────────────────────────────────

export default function EssayChecker() {
  const [taskType, setTaskType] = useState<"Task 1" | "Task 2">("Task 2");
  const [essay, setEssay] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<EssayResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  const minWords = taskType === "Task 1" ? 150 : 250;
  const wordCount = essay.trim().split(/\s+/).filter(Boolean).length;
  const canSubmit = essay.trim().length >= 10 && !loading;

  const handleSubmit = useCallback(async () => {
    if (!canSubmit) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
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
    setError(null);
  };

  const handleCopyReport = () => {
    if (!result) return;
    const lines = [
      `IELTS ${result.taskType} — Essay Feedback Report`,
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

  return (
    <Layout>
      <div className="max-w-3xl mx-auto animate-in fade-in duration-500">

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-foreground">Orwell AI</h1>
            <p className="text-sm text-muted-foreground">AI-powered feedback from an expert IELTS examiner</p>
          </div>
        </div>

        {!result ? (
          <div className="space-y-4">
            {/* Task toggle */}
            <div className="flex gap-2">
              {(["Task 1", "Task 2"] as const).map(t => (
                <button
                  key={t}
                  onClick={() => setTaskType(t)}
                  className={`px-5 py-2 rounded-full text-sm font-semibold border transition-colors ${
                    taskType === t
                      ? "bg-primary text-primary-foreground border-primary shadow-sm"
                      : "bg-card text-muted-foreground border-border hover:border-primary/50"
                  }`}
                >
                  {t}
                </button>
              ))}
              <span className="ml-auto flex items-center text-xs text-muted-foreground">
                Min: {minWords} words
              </span>
            </div>

            {/* Textarea */}
            <div className="relative">
              <textarea
                className="w-full h-72 p-4 rounded-2xl border border-border bg-card text-foreground text-sm leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-primary/40 transition-shadow"
                placeholder={`Write or paste your IELTS ${taskType} essay here...\n\nMin ${minWords} words required.`}
                value={essay}
                onChange={e => setEssay(e.target.value)}
                disabled={loading}
              />
              <div className={`absolute bottom-3 right-4 text-xs font-semibold transition-colors ${
                wordCount >= minWords ? "text-green-600" : "text-muted-foreground"
              }`}>
                {wordCount} / {minWords} words
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
                  Analysing your essay…
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Check My Essay
                </>
              )}
            </Button>

            {wordCount > 0 && wordCount < minWords && !loading && (
              <p className="text-center text-xs text-muted-foreground">
                IELTS {taskType} recommends at least {minWords} words — you have {wordCount}
              </p>
            )}

            {/* Error */}
            {error && (
              <div className="flex items-start gap-3 p-4 rounded-2xl bg-destructive/10 border border-destructive/30 text-destructive text-sm">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <p>{error}</p>
              </div>
            )}
          </div>
        ) : (
          <div ref={resultRef} className="space-y-6">

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

            {/* Example Essays for Improvement */}
            {(result.exampleEssayBand6 || result.exampleEssayBand8) && (
              <div>
                <h2 className="text-base font-bold mb-1 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  Example Essays for Improvement
                </h2>
                <p className="text-xs text-muted-foreground mb-4">
                  See how your essay can be rewritten at two different levels. Use these as a study guide — not to copy, but to understand the difference in style, vocabulary, and structure.
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
                Check Another Essay
              </Button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
