import { useState, useMemo, useRef, useEffect } from "react";
import { Link } from "wouter";
import { customFetch, useAwardXp } from "@workspace/api-client-react";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Brain, ArrowRight, ArrowLeft, Loader2, CheckCircle2,
  XCircle, Sparkles, Trophy, RefreshCw, Volume2, RotateCcw,
  StopCircle, History, Clock, FileText, Square,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { markTaskDone } from "@/lib/daily-plan";

type Level = "A2" | "B1" | "B2" | "C1";
type Step = "level" | "count" | "practice" | "report" | "history";

interface Flashcard {
  id: number;
  english: string;
  arabic: string;
  level: string;
  category: string;
  example_sentence?: string;
  example_sentence_arabic?: string;
}

interface CheckResult {
  isCorrect: boolean;
  errorHighlight: string | null;
  explanation: string;
  corrected: string;
  arabicCorrected: string;
  vocabBand: number;
  grammarBand: number;
  encouragement: string;
}

interface SentenceItem {
  word: string;
  arabic: string;
  attempts: number;
  finalSentence: string;
  isCorrect: boolean;
  errorHighlight: string | null;
  explanation: string;
  corrected: string;
  arabicCorrected: string;
  vocabBand: number;
  grammarBand: number;
  firstAttemptCorrect: boolean;
}

interface SessionReport {
  id: number;
  level: string;
  totalWords: number;
  firstAttemptCorrect: number;
  neededCorrection: number;
  avgVocabBand: number;
  avgGrammarBand: number;
  commonMistakes: string[];
  items: SentenceItem[];
  endedEarly: boolean;
  completedAt: string;
}

interface HistoryRow {
  id: number;
  level: string;
  totalWords: number;
  firstAttemptCorrect: number;
  neededCorrection: number;
  avgVocabBand: number;
  avgGrammarBand: number;
  endedEarly: boolean;
  completedAt: string;
}

const COUNT_OPTIONS = [5, 10, 15, 20] as const;
type Count = typeof COUNT_OPTIONS[number];

// ── OpenAI TTS (onyx voice — British, natural) ──────────────────────────
const API_BASE = (import.meta.env.VITE_API_URL as string | undefined) || "";

// Cache audio blobs by text so repeat presses are instant.
const ttsCache = new Map<string, string>();
let currentAudio: HTMLAudioElement | null = null;

async function fetchTtsUrl(text: string): Promise<string> {
  const key = text.trim();
  const cached = ttsCache.get(key);
  if (cached) return cached;
  const res = await fetch(`${API_BASE}/api/speaking/tts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: key, voice: "onyx", model: "tts-1-hd", speed: 0.95 }),
  });
  if (!res.ok) throw new Error("tts_failed");
  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  ttsCache.set(key, url);
  return url;
}

function SpeakerButton({
  text,
  size = "md",
  className,
}: {
  text: string;
  size?: "sm" | "md";
  className?: string;
}) {
  const [loading, setLoading] = useState(false);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => () => { audioRef.current?.pause(); }, []);

  const dim = size === "sm" ? "w-8 h-8" : "w-11 h-11";
  const icon = size === "sm" ? "w-4 h-4" : "w-5 h-5";

  async function handleClick(e: React.MouseEvent) {
    e.stopPropagation();
    if (!text?.trim()) return;
    if (playing) {
      audioRef.current?.pause();
      setPlaying(false);
      return;
    }
    setLoading(true);
    try {
      const url = await fetchTtsUrl(text);
      if (currentAudio && currentAudio !== audioRef.current) {
        currentAudio.pause();
      }
      const audio = new Audio(url);
      audioRef.current = audio;
      currentAudio = audio;
      audio.onended = () => setPlaying(false);
      audio.onpause = () => setPlaying(false);
      audio.onplay = () => setPlaying(true);
      await audio.play();
    } catch {
      // silent fail — keep UI clean
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
      aria-label={playing ? "Stop audio" : "Play audio"}
      className={cn(
        "rounded-full flex items-center justify-center shrink-0 transition-colors",
        "bg-primary/10 hover:bg-primary/20 text-primary disabled:opacity-50",
        dim,
        className
      )}
    >
      {loading ? <Loader2 className={cn(icon, "animate-spin")} />
        : playing ? <Square className={cn(icon, "fill-current")} />
        : <Volume2 className={icon} />}
    </button>
  );
}

function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function performanceRating(report: SessionReport): { label: string; color: string; emoji: string } {
  const avg = (report.avgVocabBand + report.avgGrammarBand) / 2;
  const accuracy = report.totalWords > 0 ? report.firstAttemptCorrect / report.totalWords : 0;
  const score = avg * 0.7 + accuracy * 9 * 0.3;
  if (score >= 7.5) return { label: "Excellent", color: "text-green-600", emoji: "🎉" };
  if (score >= 6.5) return { label: "Strong", color: "text-emerald-600", emoji: "💪" };
  if (score >= 5.5) return { label: "Good Progress", color: "text-primary", emoji: "👍" };
  if (score >= 4.5) return { label: "Keep Practising", color: "text-amber-600", emoji: "📚" };
  return { label: "Needs More Work", color: "text-rose-500", emoji: "🌱" };
}

export default function SentenceBuilder() {
  const [step, setStep] = useState<Step>("level");
  const [level, setLevel] = useState<Level>("B1");
  const [count, setCount] = useState<Count>(10);
  const [words, setWords] = useState<Flashcard[]>([]);
  const [loadingWords, setLoadingWords] = useState(false);

  const [index, setIndex] = useState(0);
  const [sentence, setSentence] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<CheckResult | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [attempts, setAttempts] = useState(1);
  const [items, setItems] = useState<SentenceItem[]>([]);
  const [report, setReport] = useState<SessionReport | null>(null);
  const [savingReport, setSavingReport] = useState(false);
  const [confirmEnd, setConfirmEnd] = useState(false);

  // History
  const [history, setHistory] = useState<HistoryRow[] | null>(null);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [openReport, setOpenReport] = useState<SessionReport | null>(null);

  const { mutate: awardXp } = useAwardXp();

  const currentWord = words[index];
  const progressPct = words.length > 0 ? Math.round((index / words.length) * 100) : 0;

  async function loadHistory() {
    setLoadingHistory(true);
    try {
      const data = await customFetch<HistoryRow[]>("/api/sentence-sessions");
      setHistory(data);
    } catch {
      setHistory([]);
    } finally {
      setLoadingHistory(false);
    }
  }

  async function startSession() {
    setLoadingWords(true);
    try {
      const all = await customFetch<Flashcard[]>(`/api/flashcards?level=${level}`);
      const picked = shuffle(all).slice(0, count);
      if (picked.length < count) {
        setErr(`Only ${picked.length} words available for ${level}.`);
      }
      setWords(picked);
      setIndex(0);
      setSentence("");
      setResult(null);
      setErr(null);
      setAttempts(1);
      setItems([]);
      setReport(null);
      setStep("practice");
    } catch {
      setErr("Could not load the word bank. Please try again.");
    } finally {
      setLoadingWords(false);
    }
  }

  async function analyze() {
    if (!currentWord || !sentence.trim() || analyzing) return;
    setAnalyzing(true);
    setErr(null);
    try {
      const data = await customFetch<CheckResult | { error: string }>("/api/sentence-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          word: currentWord.english,
          arabic: currentWord.arabic,
          sentence: sentence.trim(),
          level,
        }),
      });
      if ("error" in data) setErr(data.error);
      else setResult(data);
    } catch {
      setErr("Analysis failed. Please try again.");
    } finally {
      setAnalyzing(false);
    }
  }

  function tryAgain() {
    if (!result) return;
    setAttempts(attempts + 1);
    setSentence("");
    setResult(null);
    setErr(null);
  }

  function recordCurrent(): SentenceItem | null {
    if (!result || !currentWord) return null;
    return {
      word: currentWord.english,
      arabic: currentWord.arabic,
      attempts,
      finalSentence: sentence,
      isCorrect: result.isCorrect,
      errorHighlight: result.errorHighlight,
      explanation: result.explanation,
      corrected: result.corrected,
      arabicCorrected: result.arabicCorrected,
      vocabBand: result.vocabBand ?? 5,
      grammarBand: result.grammarBand ?? 5,
      firstAttemptCorrect: result.isCorrect && attempts === 1,
    };
  }

  async function saveReport(allItems: SentenceItem[], endedEarly: boolean): Promise<SessionReport | null> {
    if (allItems.length === 0) return null;
    setSavingReport(true);
    try {
      const saved = await customFetch<SessionReport>("/api/sentence-sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ level, items: allItems, endedEarly }),
      });
      const xp = allItems.length * 8;
      awardXp({ activity: "sentence_builder", amount: xp });
      markTaskDone("sentenceBuilder");
      // Quiz-score entry so it counts in Teacher Dashboard quizzesTaken
      const correct = allItems.filter((i) => i.firstAttemptCorrect).length;
      customFetch("/api/quiz-scores", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "sentence-builder",
          level,
          total: allItems.length,
          correct,
          wrong: allItems.length - correct,
        }),
      }).catch(() => {});
      return saved;
    } catch {
      return null;
    } finally {
      setSavingReport(false);
    }
  }

  async function nextWord() {
    const item = recordCurrent();
    const newItems = item ? [...items, item] : items;
    setItems(newItems);

    if (index + 1 >= words.length) {
      const saved = await saveReport(newItems, false);
      if (saved) setReport(saved);
      else setReport(buildLocalReport(newItems, false));
      setStep("report");
      return;
    }
    setIndex(index + 1);
    setSentence("");
    setResult(null);
    setErr(null);
    setAttempts(1);
  }

  async function endSession() {
    let allItems = items;
    // Include the current word's analysis if one exists.
    const item = recordCurrent();
    if (item) allItems = [...items, item];
    setItems(allItems);

    if (allItems.length === 0) {
      // Nothing to save — just go back.
      setStep("level");
      return;
    }
    const saved = await saveReport(allItems, true);
    if (saved) setReport(saved);
    else setReport(buildLocalReport(allItems, true));
    setStep("report");
  }

  function buildLocalReport(allItems: SentenceItem[], endedEarly: boolean): SessionReport {
    const total = allItems.length;
    const firstAttemptCorrect = allItems.filter((i) => i.firstAttemptCorrect).length;
    return {
      id: 0,
      level,
      totalWords: total,
      firstAttemptCorrect,
      neededCorrection: total - firstAttemptCorrect,
      avgVocabBand: total ? allItems.reduce((s, i) => s + i.vocabBand, 0) / total : 0,
      avgGrammarBand: total ? allItems.reduce((s, i) => s + i.grammarBand, 0) / total : 0,
      commonMistakes: [],
      items: allItems,
      endedEarly,
      completedAt: new Date().toISOString(),
    };
  }

  // Highlight error span inside student's sentence (case-insensitive).
  const highlightedSentence = useMemo(() => {
    if (!result || !result.errorHighlight || result.isCorrect) return null;
    const original = sentence;
    const idx = original.toLowerCase().indexOf(result.errorHighlight.toLowerCase());
    if (idx === -1) return null;
    return {
      before: original.slice(0, idx),
      hit: original.slice(idx, idx + result.errorHighlight.length),
      after: original.slice(idx + result.errorHighlight.length),
    };
  }, [result, sentence]);

  // ── Step 1: Level ──
  if (step === "level") {
    return (
      <Layout>
        <div className="max-w-xl mx-auto mt-8 animate-in fade-in duration-300">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Brain className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl font-extrabold mb-2">Sentence Builder</h1>
            <p className="text-muted-foreground">
              Write your own sentences and get instant AI feedback to improve your vocabulary and grammar.
            </p>
            <p className="text-sm text-muted-foreground mt-2 font-cairo" dir="rtl">
              اكتب جملك بنفسك واحصل على تصحيح فوري من الذكاء الاصطناعي.
            </p>
          </div>

          <div className="bg-card border border-border rounded-3xl p-6 sm:p-8 shadow-sm">
            <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">
              Step 1 — Choose your level
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {(["A2", "B1", "B2", "C1"] as Level[]).map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setLevel(lvl)}
                  className={cn(
                    "min-h-[80px] rounded-2xl border-2 p-4 transition-all flex flex-col items-center justify-center",
                    level === lvl
                      ? "border-primary bg-primary/10 scale-[1.02]"
                      : "border-border hover:border-primary/40"
                  )}
                >
                  <div className="text-2xl font-extrabold">{lvl}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {lvl === "A2" ? "Elementary" : lvl === "B1" ? "Intermediate" : lvl === "B2" ? "Upper" : "Advanced"}
                  </div>
                </button>
              ))}
            </div>

            <Button
              className="w-full rounded-full h-12 mt-6 text-base font-bold"
              onClick={() => setStep("count")}
            >
              Continue <ArrowRight className="w-4 h-4 ml-2" />
            </Button>

            <button
              onClick={() => { loadHistory(); setStep("history"); }}
              className="w-full mt-3 rounded-full h-11 text-sm font-semibold flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground border border-border hover:border-primary/40 transition-colors"
            >
              <History className="w-4 h-4" /> View Past Reports
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  // ── History list ──
  if (step === "history") {
    return (
      <Layout>
        <div className="max-w-2xl mx-auto mt-6 animate-in fade-in duration-300">
          <button
            onClick={() => { setOpenReport(null); setStep("level"); }}
            className="text-sm text-muted-foreground hover:text-foreground mb-4 flex items-center gap-1 min-h-[44px]"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>

          {openReport ? (
            <ReportView
              report={openReport}
              onBack={() => setOpenReport(null)}
              onPracticeMore={() => { setOpenReport(null); setStep("level"); }}
            />
          ) : (
            <div className="bg-card border border-border rounded-3xl p-6 sm:p-8 shadow-sm">
              <h2 className="text-xl font-extrabold flex items-center gap-2 mb-4">
                <History className="w-5 h-5 text-primary" /> Your Sentence Builder History
              </h2>

              {loadingHistory ? (
                <div className="flex items-center justify-center py-12 text-muted-foreground">
                  <Loader2 className="w-6 h-6 animate-spin" />
                </div>
              ) : !history || history.length === 0 ? (
                <div className="text-center py-10 text-sm text-muted-foreground">
                  No past sessions yet. Finish a session to see your report here.
                </div>
              ) : (
                <div className="space-y-2">
                  {history.map((h) => {
                    const accuracy = h.totalWords > 0 ? Math.round((h.firstAttemptCorrect / h.totalWords) * 100) : 0;
                    return (
                      <button
                        key={h.id}
                        onClick={async () => {
                          try {
                            const r = await customFetch<SessionReport>(`/api/sentence-sessions/${h.id}`);
                            setOpenReport(r);
                          } catch {}
                        }}
                        className="w-full text-left bg-background border border-border hover:border-primary/40 rounded-2xl p-4 transition-colors flex items-center justify-between gap-3"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className={cn(
                            "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 font-bold text-xs",
                            accuracy >= 80 ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                              : accuracy >= 60 ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400"
                                : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
                          )}>
                            {accuracy}%
                          </div>
                          <div className="min-w-0">
                            <div className="font-semibold text-sm truncate">
                              {h.totalWords} words · Level {h.level}
                              {h.endedEarly && <span className="text-xs text-amber-600 ml-1">(ended early)</span>}
                            </div>
                            <div className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                              <Clock className="w-3 h-3" />
                              {new Date(h.completedAt).toLocaleString("en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
                              <span className="mx-1">·</span>
                              Bands {((h.avgVocabBand + h.avgGrammarBand) / 2).toFixed(1)}
                            </div>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0" />
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </Layout>
    );
  }

  // ── Step 2: Word count ──
  if (step === "count") {
    return (
      <Layout>
        <div className="max-w-xl mx-auto mt-8 animate-in fade-in duration-300">
          <button
            onClick={() => setStep("level")}
            className="text-sm text-muted-foreground hover:text-foreground mb-4 flex items-center gap-1 min-h-[44px]"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>

          <div className="bg-card border border-border rounded-3xl p-6 sm:p-8 shadow-sm">
            <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-2">
              Step 2 — How many words today?
            </h2>
            <p className="text-sm text-muted-foreground mb-5">
              Level: <span className="font-bold text-foreground">{level}</span>
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {COUNT_OPTIONS.map((c) => (
                <button
                  key={c}
                  onClick={() => setCount(c)}
                  className={cn(
                    "min-h-[80px] rounded-2xl border-2 p-4 transition-all flex flex-col items-center justify-center",
                    count === c
                      ? "border-primary bg-primary/10 scale-[1.02]"
                      : "border-border hover:border-primary/40"
                  )}
                >
                  <div className="text-3xl font-extrabold">{c}</div>
                  <div className="text-xs text-muted-foreground mt-1">words</div>
                </button>
              ))}
            </div>

            {err && <p className="text-sm text-red-500 mt-4">{err}</p>}

            <Button
              className="w-full rounded-full h-12 mt-6 text-base font-bold"
              onClick={startSession}
              disabled={loadingWords}
            >
              {loadingWords ? (
                <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Loading…</>
              ) : (
                <>Start Practice <ArrowRight className="w-4 h-4 ml-2" /></>
              )}
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  // ── Step 4: Report ──
  if (step === "report" && report) {
    return (
      <Layout>
        <div className="max-w-2xl mx-auto mt-6 animate-in fade-in duration-300">
          <ReportView
            report={report}
            onBack={null}
            onPracticeMore={() => { setReport(null); setStep("level"); }}
          />
        </div>
      </Layout>
    );
  }

  // ── Step 3: Practice ──
  return (
    <Layout>
      <div className="max-w-2xl mx-auto mt-6 animate-in fade-in duration-300">
        {/* Progress header with End Session */}
        <div className="flex items-center justify-between mb-3 gap-3 flex-wrap">
          <span className="text-sm text-muted-foreground">Word {index + 1} of {words.length} · {level}</span>
          <button
            onClick={() => setConfirmEnd(true)}
            disabled={savingReport}
            className="text-xs font-semibold text-rose-500 hover:text-rose-600 flex items-center gap-1 px-3 py-1.5 rounded-full border border-rose-200 dark:border-rose-900/40 hover:border-rose-400 transition-colors min-h-[36px]"
          >
            <StopCircle className="w-3.5 h-3.5" /> End Session
          </button>
        </div>
        <Progress value={progressPct} className="h-2 mb-6" />

        {/* End-session confirm dialog */}
        {confirmEnd && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-card border border-border rounded-3xl p-6 max-w-sm w-full shadow-xl">
              <h3 className="text-lg font-extrabold mb-2">End this session?</h3>
              <p className="text-sm text-muted-foreground mb-5">
                You'll see your full report so far. {items.length === 0 && !result ? "Nothing to save yet." : `${items.length + (result ? 1 : 0)} sentence${(items.length + (result ? 1 : 0)) === 1 ? "" : "s"} will be saved.`}
              </p>
              <div className="flex gap-2 justify-end">
                <Button variant="outline" className="rounded-full" onClick={() => setConfirmEnd(false)}>
                  Continue Practising
                </Button>
                <Button
                  className="rounded-full"
                  disabled={savingReport}
                  onClick={async () => { setConfirmEnd(false); await endSession(); }}
                >
                  {savingReport ? <Loader2 className="w-4 h-4 animate-spin" /> : "End & See Report"}
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Word card */}
        {currentWord && (
          <div className="bg-card border border-border rounded-3xl p-6 sm:p-8 shadow-sm">
            <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
              Your target word
              {attempts > 1 && <span className="ml-2 text-amber-600">· Attempt #{attempts}</span>}
            </div>
            <div className="flex items-center justify-between gap-3 mb-1">
              <h2 className="text-4xl sm:text-5xl font-extrabold text-foreground">
                {currentWord.english}
              </h2>
              <SpeakerButton text={currentWord.english} />
            </div>
            <div className="text-xl font-bold text-primary font-cairo mb-2" dir="rtl">
              {currentWord.arabic}
            </div>
            <div className="text-xs text-muted-foreground italic">
              {currentWord.category}
            </div>

            {/* Sentence input */}
            <div className="mt-6">
              <label className="text-sm font-semibold mb-2 block">
                Write a sentence using <span className="text-primary">{currentWord.english}</span>:
              </label>
              <textarea
                value={sentence}
                onChange={(e) => setSentence(e.target.value)}
                placeholder={`Example: ${currentWord.example_sentence || `I will use the word "${currentWord.english}" in a sentence.`}`}
                disabled={!!result || analyzing}
                rows={3}
                className="w-full rounded-2xl border border-border bg-background p-4 text-base resize-none focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-70"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                    e.preventDefault();
                    if (!result) analyze();
                  }
                }}
              />
              {err && <p className="text-sm text-red-500 mt-2">{err}</p>}
            </div>

            {/* Action button(s) */}
            {!result ? (
              <Button
                onClick={analyze}
                disabled={analyzing || !sentence.trim()}
                className="w-full mt-4 rounded-full h-12 text-base font-bold"
              >
                {analyzing ? (
                  <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Analyzing…</>
                ) : (
                  <><Sparkles className="w-4 h-4 mr-2" /> Analyze</>
                )}
              </Button>
            ) : (
              <div className="grid grid-cols-2 gap-3 mt-4">
                <Button
                  variant="outline"
                  onClick={tryAgain}
                  className="rounded-full h-12 text-base font-bold"
                >
                  <RotateCcw className="w-4 h-4 mr-2" /> Try Again
                </Button>
                <Button
                  onClick={nextWord}
                  disabled={savingReport}
                  className="rounded-full h-12 text-base font-bold"
                >
                  {savingReport ? <Loader2 className="w-4 h-4 animate-spin" /> : (
                    <>{index + 1 >= words.length ? "Finish" : "Next Word"} <ArrowRight className="w-4 h-4 ml-2" /></>
                  )}
                </Button>
              </div>
            )}
          </div>
        )}

        {/* AI Result */}
        {result && (
          <div className="mt-5 bg-card border border-border rounded-3xl p-6 sm:p-8 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-400">
            <div className="flex items-center gap-3 mb-4">
              {result.isCorrect ? (
                <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
              ) : (
                <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600">
                  <XCircle className="w-5 h-5" />
                </div>
              )}
              <div>
                <div className="font-extrabold text-lg">
                  {result.isCorrect ? "Well done!" : "Let's improve this"}
                </div>
                <div className="text-sm text-muted-foreground">{result.explanation}</div>
              </div>
            </div>

            {!result.isCorrect && highlightedSentence && (
              <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-900/30 rounded-2xl p-4 mb-4">
                <div className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 mb-1">
                  Your sentence
                </div>
                <p className="text-base">
                  {highlightedSentence.before}
                  <span className="bg-amber-200 dark:bg-amber-700/40 px-1 rounded font-bold underline decoration-wavy decoration-amber-600">
                    {highlightedSentence.hit}
                  </span>
                  {highlightedSentence.after}
                </p>
              </div>
            )}

            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-4 mb-4">
              <div className="flex items-center justify-between gap-2 mb-1">
                <div className="text-xs font-bold uppercase tracking-wider text-primary">
                  {result.isCorrect ? "Even better" : "Suggested correction"}
                </div>
                {result.corrected && (
                  <SpeakerButton text={result.corrected} size="sm" />
                )}
              </div>
              <p className="text-base font-semibold">{result.corrected}</p>
              {result.arabicCorrected && (
                <p className="text-sm font-cairo text-muted-foreground mt-2 pt-2 border-t border-primary/10" dir="rtl">
                  {result.arabicCorrected}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-background border border-border rounded-2xl p-3 text-center">
                <div className="text-xs text-muted-foreground uppercase tracking-wider">Vocabulary</div>
                <div className="text-2xl font-extrabold text-primary mt-1">{result.vocabBand?.toFixed(1) ?? "—"}</div>
              </div>
              <div className="bg-background border border-border rounded-2xl p-3 text-center">
                <div className="text-xs text-muted-foreground uppercase tracking-wider">Grammar</div>
                <div className="text-2xl font-extrabold text-primary mt-1">{result.grammarBand?.toFixed(1) ?? "—"}</div>
              </div>
            </div>

            {result.encouragement && (
              <p className="text-sm text-center text-muted-foreground italic mt-4">
                💡 {result.encouragement}
              </p>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}

// ── Reusable Report View ──────────────────────────────────────────────────
function ReportView({
  report,
  onBack,
  onPracticeMore,
}: {
  report: SessionReport;
  onBack: (() => void) | null;
  onPracticeMore: () => void;
}) {
  const rating = performanceRating(report);
  const accuracy = report.totalWords > 0 ? Math.round((report.firstAttemptCorrect / report.totalWords) * 100) : 0;
  const avgBand = ((report.avgVocabBand + report.avgGrammarBand) / 2).toFixed(1);

  return (
    <div className="space-y-5">
      {onBack && (
        <button
          onClick={onBack}
          className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 min-h-[44px]"
        >
          <ArrowLeft className="w-4 h-4" /> Back to history
        </button>
      )}

      {/* Hero card */}
      <div className="bg-card border border-border rounded-3xl p-6 sm:p-8 shadow-lg text-center">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <Trophy className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold mb-1">
          Session Report
        </h2>
        <p className="text-muted-foreground text-sm mb-1">
          {new Date(report.completedAt).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" })}
          {report.endedEarly && <span className="text-amber-600 ml-1">· Ended early</span>}
        </p>
        <div className={cn("text-2xl font-extrabold mt-3", rating.color)}>
          {rating.emoji} {rating.label}
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-card border border-border rounded-2xl p-4 text-center">
          <div className="text-3xl font-extrabold">{report.totalWords}</div>
          <div className="text-[11px] text-muted-foreground uppercase tracking-wider mt-1">Words Practised</div>
        </div>
        <div className="bg-card border border-border rounded-2xl p-4 text-center">
          <div className="text-3xl font-extrabold text-green-600">{report.firstAttemptCorrect}</div>
          <div className="text-[11px] text-muted-foreground uppercase tracking-wider mt-1">Correct First Try</div>
        </div>
        <div className="bg-card border border-border rounded-2xl p-4 text-center">
          <div className="text-3xl font-extrabold text-amber-600">{report.neededCorrection}</div>
          <div className="text-[11px] text-muted-foreground uppercase tracking-wider mt-1">Needed Correction</div>
        </div>
        <div className="bg-card border border-border rounded-2xl p-4 text-center">
          <div className="text-3xl font-extrabold text-primary">{avgBand}</div>
          <div className="text-[11px] text-muted-foreground uppercase tracking-wider mt-1">Avg Band</div>
        </div>
      </div>

      {/* Common mistakes */}
      <div className="bg-card border border-border rounded-3xl p-5 sm:p-6">
        <h3 className="font-extrabold text-base mb-3 flex items-center gap-2">
          <FileText className="w-4 h-4 text-primary" />
          Most Common Mistakes
        </h3>
        {report.commonMistakes.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            {report.firstAttemptCorrect === report.totalWords
              ? "No mistakes — beautifully done!"
              : "No clear pattern — review the items below for specific feedback."}
          </p>
        ) : (
          <ul className="space-y-1.5">
            {report.commonMistakes.map((m) => (
              <li key={m} className="flex items-start gap-2 text-sm">
                <span className="text-amber-500 mt-0.5">•</span>
                <span>{m}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Sentence-by-sentence */}
      <div className="bg-card border border-border rounded-3xl p-5 sm:p-6">
        <h3 className="font-extrabold text-base mb-4 flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            All Your Sentences ({report.items.length})
          </span>
          <span className="text-xs font-semibold text-muted-foreground">
            {accuracy}% first-try accuracy
          </span>
        </h3>
        <div className="space-y-3">
          {report.items.map((it, i) => (
            <div
              key={i}
              className={cn(
                "rounded-2xl p-4 border",
                it.firstAttemptCorrect
                  ? "bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-900/30"
                  : it.isCorrect
                    ? "bg-yellow-50 dark:bg-yellow-900/10 border-yellow-200 dark:border-yellow-900/30"
                    : "bg-rose-50 dark:bg-rose-900/10 border-rose-200 dark:border-rose-900/30"
              )}
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="font-extrabold text-foreground flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">{i + 1}.</span>
                  {it.word}
                  <span className="text-xs font-normal font-cairo text-primary" dir="rtl">{it.arabic}</span>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  {it.firstAttemptCorrect ? (
                    <span className="text-[10px] font-bold uppercase bg-green-600 text-white px-1.5 py-0.5 rounded">First try ✓</span>
                  ) : it.attempts > 1 ? (
                    <span className="text-[10px] font-bold uppercase bg-amber-500 text-white px-1.5 py-0.5 rounded">{it.attempts} attempts</span>
                  ) : (
                    <span className="text-[10px] font-bold uppercase bg-rose-500 text-white px-1.5 py-0.5 rounded">Needs work</span>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between gap-2 mb-1">
                <div className="text-xs text-muted-foreground uppercase tracking-wider">Your sentence</div>
                {it.finalSentence && (
                  <SpeakerButton text={it.finalSentence} size="sm" />
                )}
              </div>
              <p className="text-sm mb-2 italic">"{it.finalSentence}"</p>

              {it.corrected && it.corrected.toLowerCase() !== it.finalSentence.toLowerCase() && (
                <>
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <div className="text-xs text-primary uppercase tracking-wider font-bold">
                      {it.isCorrect ? "Even better" : "Correction"}
                    </div>
                    <SpeakerButton text={it.corrected} size="sm" />
                  </div>
                  <p className="text-sm font-semibold mb-1">{it.corrected}</p>
                  {it.arabicCorrected && (
                    <p className="text-xs font-cairo text-muted-foreground" dir="rtl">{it.arabicCorrected}</p>
                  )}
                </>
              )}

              {it.explanation && (
                <p className="text-xs text-muted-foreground mt-2 pt-2 border-t border-border/50">
                  💡 {it.explanation}
                </p>
              )}

              <div className="flex gap-3 mt-2 text-[11px] text-muted-foreground">
                <span>Vocab: <span className="font-bold text-foreground">{it.vocabBand?.toFixed(1)}</span></span>
                <span>Grammar: <span className="font-bold text-foreground">{it.grammarBand?.toFixed(1)}</span></span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 justify-center flex-wrap pb-6">
        <Button onClick={onPracticeMore} className="rounded-full">
          <RefreshCw className="w-4 h-4 mr-2" /> Practice Again
        </Button>
        <Button variant="outline" className="rounded-full" asChild>
          <Link href="/quiz">Back to Quiz Mode</Link>
        </Button>
      </div>
    </div>
  );
}
