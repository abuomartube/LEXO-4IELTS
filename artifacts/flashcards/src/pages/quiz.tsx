import { useState, useEffect, useCallback, useRef } from "react";
import { useQuiz, useFillBlank, customFetch, useAwardXp, useAddWeakWords } from "@workspace/api-client-react";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  CheckCircle2, XCircle, RefreshCw, HelpCircle,
  ArrowRight, Trophy, Volume2, PenLine, History, Clock
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface QuizScore {
  id: number;
  mode: string;
  level: string;
  total: number;
  correct: number;
  wrong: number;
  completedAt: string;
}

type QuizMode = "multiple-choice" | "fill-blank";
type Level = "ALL" | "A2" | "B1" | "B2" | "C1";

interface SessionResult { total: number; correct: number; wrong: number }

function speak(text: string) {
  if ("speechSynthesis" in window) {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "en-GB";
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
  }
}

export default function Quiz() {
  const [mode, setMode] = useState<QuizMode>("multiple-choice");
  const [level, setLevel] = useState<Level>("ALL");
  const [started, setStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [fillAnswer, setFillAnswer] = useState("");
  const [fillChecked, setFillChecked] = useState(false);
  const [fillCorrect, setFillCorrect] = useState(false);
  const [results, setResults] = useState<SessionResult>({ total: 0, correct: 0, wrong: 0 });
  const [done, setDone] = useState(false);
  const [history, setHistory] = useState<QuizScore[]>([]);
  const [scoreSaved, setScoreSaved] = useState(false);
  const { mutate: awardXp } = useAwardXp();
  const { mutate: addWeakWords } = useAddWeakWords();
  const wrongIdsRef = useRef<number[]>([]);

  const loadHistory = useCallback(async () => {
    try {
      const data = await customFetch<QuizScore[]>("/api/quiz-scores");
      setHistory(data);
    } catch {}
  }, []);

  useEffect(() => { loadHistory(); }, [loadHistory]);

  const mcCount = level === "ALL" ? 20 : 100;
  const fbCount = level === "ALL" ? 20 : 50;

  const { data: mcQuestions, isLoading: mcLoading, refetch: refetchMc } = useQuiz(
    level === "ALL" ? undefined : level, mcCount
  );
  const { data: fbQuestions, isLoading: fbLoading, refetch: refetchFb } = useFillBlank(
    level === "ALL" ? undefined : level, fbCount
  );

  const questions = mode === "multiple-choice" ? (mcQuestions ?? []) : (fbQuestions ?? []);
  const isLoading = mode === "multiple-choice" ? mcLoading : fbLoading;

  const currentQ = questions[currentIndex];

  const reset = async () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setFillAnswer("");
    setFillChecked(false);
    setFillCorrect(false);
    setResults({ total: 0, correct: 0, wrong: 0 });
    setDone(false);
    setScoreSaved(false);
    wrongIdsRef.current = [];
    if (mode === "multiple-choice") await refetchMc();
    else await refetchFb();
  };

  const goNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(i => i + 1);
      setSelectedOption(null);
      setFillAnswer("");
      setFillChecked(false);
      setFillCorrect(false);
    } else {
      setDone(true);
    }
  };

  const handleMcSelect = (idx: number) => {
    if (selectedOption !== null || !("correctIndex" in (currentQ as any))) return;
    const q = currentQ as any;
    const correct = idx === q.correctIndex;
    setSelectedOption(idx);
    setResults(r => ({
      total: r.total + 1,
      correct: correct ? r.correct + 1 : r.correct,
      wrong: !correct ? r.wrong + 1 : r.wrong,
    }));
    if (!correct && q.flashcard?.id) {
      wrongIdsRef.current.push(q.flashcard.id);
    }
  };

  const checkFillAnswer = () => {
    if (fillChecked || !fillAnswer.trim()) return;
    const q = currentQ as any;
    const correct = fillAnswer.trim().toLowerCase() === q.flashcard.english.toLowerCase();
    setFillCorrect(correct);
    setFillChecked(true);
    setResults(r => ({
      total: r.total + 1,
      correct: correct ? r.correct + 1 : r.correct,
      wrong: !correct ? r.wrong + 1 : r.wrong,
    }));
    if (!correct && q.flashcard?.id) {
      wrongIdsRef.current.push(q.flashcard.id);
    }
  };

  useEffect(() => {
    if (done && !scoreSaved && results.total > 0) {
      setScoreSaved(true);
      customFetch("/api/quiz-scores", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode, level, total: results.total, correct: results.correct, wrong: results.wrong }),
      }).then(() => loadHistory()).catch(() => {});
      if (results.correct > 0) {
        awardXp({ activity: "quiz_correct", amount: results.correct * 5 });
      }
      if (wrongIdsRef.current.length > 0) {
        addWeakWords([...new Set(wrongIdsRef.current)]);
      }
    }
  }, [done, scoreSaved, results, mode, level, loadHistory, awardXp, addWeakWords]);

  const pct = questions.length > 0 ? Math.round((currentIndex / questions.length) * 100) : 0;

  // ── Start Screen ──────────────────────────────────────────────────────────
  if (!started) {
    return (
      <Layout>
        <div className="max-w-xl mx-auto mt-8 animate-in fade-in duration-500">
          <div className="text-center mb-10">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl font-extrabold text-foreground mb-2">Quiz Mode</h1>
            <p className="text-muted-foreground">Test your vocabulary with multiple choice or fill-in-the-blank questions.</p>
          </div>

          <div className="bg-card border border-border rounded-3xl p-8 shadow-sm space-y-6">
            <div>
              <label className="text-sm font-semibold text-foreground mb-2 block">Quiz Type</label>
              <div className="grid grid-cols-2 gap-3">
                {(["multiple-choice", "fill-blank"] as QuizMode[]).map((m) => (
                  <button
                    key={m}
                    onClick={() => setMode(m)}
                    className={cn(
                      "p-4 rounded-2xl border-2 text-left transition-all",
                      mode === m ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"
                    )}
                  >
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-2 bg-primary/10">
                      {m === "multiple-choice" ? <HelpCircle className="w-4 h-4 text-primary" /> : <PenLine className="w-4 h-4 text-primary" />}
                    </div>
                    <div className="font-semibold text-foreground text-sm">
                      {m === "multiple-choice" ? "Multiple Choice" : "Fill in the Blank"}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {m === "multiple-choice" ? "Pick the correct Arabic translation" : "Type the missing English word"}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-foreground mb-2 block">Level</label>
              <Select value={level} onValueChange={(v) => setLevel(v as Level)}>
                <SelectTrigger className="w-full bg-background"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Levels</SelectItem>
                  <SelectItem value="A2">A2 – Elementary</SelectItem>
                  <SelectItem value="B1">B1 – Intermediate</SelectItem>
                  <SelectItem value="B2">B2 – Upper-Intermediate</SelectItem>
                  <SelectItem value="C1">C1 – Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-3 bg-primary/5 border border-primary/20 rounded-2xl px-5 py-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <HelpCircle className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground">
                  {mode === "multiple-choice"
                    ? (level === "ALL" ? "20 questions" : "100 questions")
                    : (level === "ALL" ? "20 questions" : "50 questions")} · {level === "ALL" ? "All Levels" : `Level ${level}`}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {mode === "multiple-choice"
                    ? "Pick the correct Arabic translation for each word"
                    : "Type the missing English word from the Arabic hint"}
                </p>
              </div>
            </div>

            <Button className="w-full rounded-full h-12 text-base font-bold" onClick={() => setStarted(true)}>
              Start Quiz <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          {history.length > 0 && (
            <div className="bg-card border border-border rounded-3xl p-6 shadow-sm mt-6">
              <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                <History className="w-4 h-4 text-primary" />
                Recent Quiz History
              </h3>
              <div className="space-y-3">
                {history.slice(0, 5).map((s) => {
                  const pct = s.total > 0 ? Math.round((s.correct / s.total) * 100) : 0;
                  return (
                    <div key={s.id} className="flex items-center justify-between bg-background rounded-xl px-4 py-3 border border-border">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center shrink-0", pct >= 80 ? "bg-green-100 dark:bg-green-900/30" : pct >= 60 ? "bg-yellow-100 dark:bg-yellow-900/30" : "bg-red-100 dark:bg-red-900/30")}>
                          <span className="text-xs font-bold">{pct}%</span>
                        </div>
                        <div className="min-w-0">
                          <div className="text-sm font-semibold text-foreground truncate">
                            {s.mode === "multiple-choice" ? "Multiple Choice" : "Fill in the Blank"} · {s.level === "ALL" ? "All" : s.level}
                          </div>
                          <div className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {new Date(s.completedAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground font-medium shrink-0 ml-2">
                        {s.correct}/{s.total}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </Layout>
    );
  }

  if (done) {
    const accuracy = results.total > 0 ? Math.round((results.correct / results.total) * 100) : 0;
    return (
      <Layout>
        <div className="max-w-lg mx-auto mt-12 animate-in fade-in zoom-in duration-500">
          <div className="bg-card border border-border rounded-3xl p-10 text-center shadow-lg">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Trophy className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-3xl font-extrabold text-foreground mb-2">Quiz Complete!</h2>
            <p className="text-muted-foreground mb-8">You answered {results.total} questions.</p>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-background rounded-2xl p-4 border border-border">
                <div className="text-3xl font-bold">{results.total}</div>
                <div className="text-xs text-muted-foreground uppercase mt-1">Total</div>
              </div>
              <div className="bg-background rounded-2xl p-4 border border-border">
                <div className="text-3xl font-bold text-green-600">{results.correct}</div>
                <div className="text-xs text-muted-foreground uppercase mt-1">Correct</div>
              </div>
              <div className="bg-background rounded-2xl p-4 border border-border">
                <div className="text-3xl font-bold text-red-500">{results.wrong}</div>
                <div className="text-xs text-muted-foreground uppercase mt-1">Wrong</div>
              </div>
            </div>

            <div className="mb-8">
              <div className="flex justify-between text-sm font-medium mb-2">
                <span className="text-muted-foreground">Score</span>
                <span className="font-bold">{accuracy}%</span>
              </div>
              <Progress value={accuracy} className="h-3" />
            </div>

            <div className="text-2xl font-bold mb-8">
              {accuracy >= 80 ? "🎉 Excellent!" : accuracy >= 60 ? "👍 Good work!" : "💪 Keep practising!"}
            </div>

            <div className="flex gap-3 justify-center flex-wrap">
              <Button onClick={async () => { await reset(); }} className="rounded-full">
                <RefreshCw className="w-4 h-4 mr-2" />
                Play Again
              </Button>
              <Button variant="outline" className="rounded-full" onClick={() => setStarted(false)}>
                Change Settings
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // ── Quiz Screen ───────────────────────────────────────────────────────────
  return (
    <Layout>
      <div className="max-w-2xl mx-auto animate-in fade-in duration-500">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-primary" />
            {mode === "multiple-choice" ? "Multiple Choice" : "Fill in the Blank"}
          </h1>
          <span className="text-sm font-medium text-muted-foreground">
            {currentIndex + 1} / {questions.length}
          </span>
        </div>

        <Progress value={pct} className="mb-8 h-2" />

        {isLoading ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <RefreshCw className="w-8 h-8 animate-spin text-primary/50" />
          </div>
        ) : !currentQ ? (
          <div className="text-center py-12 text-muted-foreground">No questions available for the selected level.</div>
        ) : mode === "multiple-choice" ? (
          <MultipleChoiceQuestion
            question={currentQ as any}
            selectedOption={selectedOption}
            onSelect={handleMcSelect}
            onNext={goNext}
          />
        ) : (
          <FillBlankQuestion
            question={currentQ as any}
            answer={fillAnswer}
            onChange={setFillAnswer}
            checked={fillChecked}
            correct={fillCorrect}
            onCheck={checkFillAnswer}
            onNext={goNext}
          />
        )}
      </div>
    </Layout>
  );
}

// ── Multiple Choice ──────────────────────────────────────────────────────────

function MultipleChoiceQuestion({
  question,
  selectedOption,
  onSelect,
  onNext,
}: {
  question: { flashcard: any; options: string[]; correctIndex: number };
  selectedOption: number | null;
  onSelect: (i: number) => void;
  onNext: () => void;
}) {
  return (
    <div className="bg-card border border-border rounded-3xl p-8 shadow-sm animate-in fade-in duration-300">
      <div className="text-center mb-8">
        <p className="text-sm font-medium text-muted-foreground mb-2 uppercase tracking-widest">What is the Arabic translation?</p>
        <div className="flex items-center justify-center gap-3">
          <h2 className="text-4xl font-extrabold text-foreground">{question.flashcard.english}</h2>
          <button
            onClick={() => speak(question.flashcard.english)}
            className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-colors"
          >
            <Volume2 className="w-5 h-5 text-primary" />
          </button>
        </div>
        {question.flashcard.exampleSentence && (
          <p className="text-muted-foreground italic mt-3 text-sm">{question.flashcard.exampleSentence}</p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
        {question.options.map((opt: string, i: number) => {
          const isSelected = selectedOption === i;
          const isCorrect = i === question.correctIndex;
          const showResult = selectedOption !== null;

          return (
            <button
              key={i}
              onClick={() => onSelect(i)}
              disabled={showResult}
              className={cn(
                "p-4 rounded-2xl border-2 text-right arabic-text text-lg font-bold transition-all",
                !showResult && "hover:border-primary/50 border-border",
                showResult && isCorrect && "border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300",
                showResult && isSelected && !isCorrect && "border-red-400 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300",
                showResult && !isSelected && !isCorrect && "border-border opacity-50",
                !showResult && "border-border"
              )}
            >
              <div className="flex items-center justify-between gap-3">
                {showResult && isCorrect && <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />}
                {showResult && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-red-500 shrink-0" />}
                {(!showResult || (!isCorrect && !isSelected)) && <span />}
                <span className="flex-1 text-right">{opt}</span>
              </div>
            </button>
          );
        })}
      </div>

      {selectedOption !== null && (
        <div className="space-y-4">
          {selectedOption === question.correctIndex ? (
            <div className="text-center text-green-600 font-bold text-lg">✅ Correct!</div>
          ) : (
            <div className="text-center text-red-600 font-bold text-lg">
              ❌ Incorrect — The answer is: <span className="arabic-text">{question.options[question.correctIndex]}</span>
            </div>
          )}
          <Button onClick={onNext} className="w-full rounded-full">
            Next Question <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      )}
    </div>
  );
}

// ── Fill in the Blank ─────────────────────────────────────────────────────────

function FillBlankQuestion({
  question,
  answer,
  onChange,
  checked,
  correct,
  onCheck,
  onNext,
}: {
  question: { flashcard: any; sentence: string };
  answer: string;
  onChange: (v: string) => void;
  checked: boolean;
  correct: boolean;
  onCheck: () => void;
  onNext: () => void;
}) {
  return (
    <div className="bg-card border border-border rounded-3xl p-8 shadow-sm animate-in fade-in duration-300">
      <p className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-widest text-center">Fill in the blank</p>

      <div className="bg-background border border-border rounded-2xl p-6 mb-6 text-center">
        <p className="text-xl font-semibold text-foreground leading-relaxed">{question.sentence}</p>
      </div>

      <div className="text-center mb-2">
        <p className="text-sm text-muted-foreground mb-1">Arabic hint:</p>
        <p className="text-xl arabic-text font-bold text-primary">{question.flashcard.arabic}</p>
      </div>

      {question.flashcard.exampleSentenceArabic && (
        <p className="text-sm text-muted-foreground arabic-text text-right mb-6 px-2">{question.flashcard.exampleSentenceArabic}</p>
      )}

      <div className="flex gap-3 mb-6">
        <Input
          value={answer}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !checked && onCheck()}
          placeholder="Type your answer..."
          className={cn(
            "text-center text-lg font-semibold h-12",
            checked && correct && "border-green-500 bg-green-50 dark:bg-green-900/20",
            checked && !correct && "border-red-400 bg-red-50 dark:bg-red-900/20"
          )}
          disabled={checked}
          autoFocus
        />
        {!checked && (
          <Button onClick={onCheck} className="rounded-xl h-12 px-6" disabled={!answer.trim()}>
            Check
          </Button>
        )}
      </div>

      {checked && (
        <div className="space-y-4">
          {correct ? (
            <div className="text-center text-green-600 font-bold text-lg">✅ Correct!</div>
          ) : (
            <div className="text-center text-red-600 font-bold text-lg">
              ❌ The answer was: <span className="underline">{question.flashcard.english}</span>
            </div>
          )}
          <Button onClick={onNext} className="w-full rounded-full">
            Next Question <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      )}
    </div>
  );
}
