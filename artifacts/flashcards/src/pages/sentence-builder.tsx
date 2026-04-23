import { useState, useMemo, useEffect } from "react";
import { Link } from "wouter";
import { customFetch, useAwardXp } from "@workspace/api-client-react";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Brain, ArrowRight, ArrowLeft, Loader2, CheckCircle2,
  XCircle, Sparkles, Trophy, RefreshCw, Volume2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { markTaskDone } from "@/lib/daily-plan";

type Level = "A2" | "B1" | "B2" | "C1";
type Step = "level" | "count" | "practice" | "done";

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

const COUNT_OPTIONS = [5, 10, 15, 20] as const;
type Count = typeof COUNT_OPTIONS[number];

function speak(text: string) {
  if ("speechSynthesis" in window) {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "en-GB";
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
  }
}

function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
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
  const [completed, setCompleted] = useState(0);
  const [bandSum, setBandSum] = useState(0);

  const { mutate: awardXp } = useAwardXp();

  const currentWord = words[index];
  const progressPct = words.length > 0 ? Math.round((index / words.length) * 100) : 0;

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
      setCompleted(0);
      setBandSum(0);
      setStep("practice");
    } catch (e) {
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
      if ("error" in data) {
        setErr(data.error);
      } else {
        setResult(data);
        setBandSum((b) => b + ((data.vocabBand ?? 5) + (data.grammarBand ?? 5)) / 2);
      }
    } catch {
      setErr("Analysis failed. Please try again.");
    } finally {
      setAnalyzing(false);
    }
  }

  function next() {
    const newCompleted = completed + 1;
    setCompleted(newCompleted);

    if (index + 1 >= words.length) {
      // Session complete: award XP, mark daily-plan task done, save streak ping.
      const xpAmount = newCompleted * 8;
      awardXp({ activity: "sentence_builder", amount: xpAmount });
      markTaskDone("sentenceBuilder");

      // Save a quiz-score entry so it counts in the Teacher Dashboard.
      const correct = Math.round(bandSum / Math.max(1, newCompleted) >= 6 ? newCompleted : Math.round(newCompleted * 0.7));
      customFetch("/api/quiz-scores", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "sentence-builder",
          level,
          total: newCompleted,
          correct,
          wrong: Math.max(0, newCompleted - correct),
        }),
      }).catch(() => {});

      // Light streak-ping: mark the first word in the session as "seen" via progress.
      if (words[0]?.id) {
        customFetch("/api/progress", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ flashcardId: words[0].id, known: true }),
        }).catch(() => {});
      }

      setStep("done");
      return;
    }
    setIndex(index + 1);
    setSentence("");
    setResult(null);
    setErr(null);
  }

  // Highlight the error span inside the student's sentence (case-insensitive).
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
          </div>
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

  // ── Step 4: Done summary ──
  if (step === "done") {
    const avgBand = completed > 0 ? (bandSum / completed).toFixed(1) : "—";
    return (
      <Layout>
        <div className="max-w-lg mx-auto mt-12 animate-in fade-in zoom-in duration-500">
          <div className="bg-card border border-border rounded-3xl p-10 text-center shadow-lg">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Trophy className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-3xl font-extrabold mb-2">Session Complete!</h2>
            <p className="text-muted-foreground mb-8">
              You wrote {completed} sentences using {level} vocabulary.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-background rounded-2xl p-4 border border-border">
                <div className="text-3xl font-bold">{completed}</div>
                <div className="text-xs text-muted-foreground uppercase mt-1">Sentences</div>
              </div>
              <div className="bg-background rounded-2xl p-4 border border-border">
                <div className="text-3xl font-bold text-primary">{avgBand}</div>
                <div className="text-xs text-muted-foreground uppercase mt-1">Avg Band</div>
              </div>
            </div>

            <div className="text-lg font-semibold mb-8 text-muted-foreground">
              +{completed * 8} XP earned · streak protected 🔥
            </div>

            <div className="flex gap-3 justify-center flex-wrap">
              <Button onClick={() => { setStep("level"); }} className="rounded-full">
                <RefreshCw className="w-4 h-4 mr-2" /> Practice Again
              </Button>
              <Button variant="outline" className="rounded-full" asChild>
                <Link href="/quiz">Back to Quiz Mode</Link>
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // ── Step 3: Practice (one word at a time) ──
  return (
    <Layout>
      <div className="max-w-2xl mx-auto mt-6 animate-in fade-in duration-300">
        {/* Progress header */}
        <div className="flex items-center justify-between mb-3 text-sm text-muted-foreground">
          <span>Word {index + 1} of {words.length}</span>
          <span className="font-semibold">{level}</span>
        </div>
        <Progress value={progressPct} className="h-2 mb-6" />

        {/* Word card */}
        {currentWord && (
          <div className="bg-card border border-border rounded-3xl p-6 sm:p-8 shadow-sm">
            <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
              Your target word
            </div>
            <div className="flex items-center justify-between gap-3 mb-1">
              <h2 className="text-4xl sm:text-5xl font-extrabold text-foreground">
                {currentWord.english}
              </h2>
              <button
                onClick={() => speak(currentWord.english)}
                aria-label="Pronounce"
                className="w-11 h-11 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center text-primary"
              >
                <Volume2 className="w-5 h-5" />
              </button>
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

            {/* Action button */}
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
              <Button
                onClick={next}
                className="w-full mt-4 rounded-full h-12 text-base font-bold"
              >
                {index + 1 >= words.length ? "Finish" : "Next Word"} <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        )}

        {/* AI Result */}
        {result && (
          <div className="mt-5 bg-card border border-border rounded-3xl p-6 sm:p-8 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-400">
            {/* Header */}
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

            {/* Highlighted student sentence (if error found) */}
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

            {/* Corrected / improved */}
            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-4 mb-4">
              <div className="text-xs font-bold uppercase tracking-wider text-primary mb-1">
                {result.isCorrect ? "Even better" : "Suggested correction"}
              </div>
              <p className="text-base font-semibold">{result.corrected}</p>
              {result.arabicCorrected && (
                <p className="text-sm font-cairo text-muted-foreground mt-2 pt-2 border-t border-primary/10" dir="rtl">
                  {result.arabicCorrected}
                </p>
              )}
            </div>

            {/* Bands */}
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
