import { useEffect, useMemo, useRef, useState } from "react";
import { customFetch } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, XCircle, Sparkles, Loader2, RefreshCcw } from "lucide-react";
import { cn } from "@/lib/utils";

type Choice = "A" | "B" | "C" | "D";

interface PublicQuestion {
  id: string;
  question: string;
  choices: Record<Choice, string>;
}

interface GradedQuestion extends PublicQuestion {
  chosen: Choice | null;
  correct: Choice;
  isRight: boolean;
  explanation: string;
}

interface GradeResponse {
  correct: number;
  total: number;
  results: GradedQuestion[];
  xpAwarded: number;
}

interface StoryQuizProps {
  storyId: number;
  /** Called once the quiz is graded (used to mark the daily-plan task complete). */
  onComplete?: () => void;
}

const LETTERS: Choice[] = ["A", "B", "C", "D"];

function encouragement(score: number): string {
  if (score === 5) return "Perfect score — outstanding work! 🌟";
  if (score === 4) return "Great job! You really understood the story. 🎉";
  if (score === 3) return "Solid effort — keep practising and you'll nail it next time. 💪";
  if (score === 2) return "Good try. Re-read the story and have another go — you're learning!";
  if (score === 1) return "Don't give up! Re-read the story carefully and try again.";
  return "Re-read the story carefully — every attempt makes you stronger.";
}

export function StoryQuiz({ storyId, onComplete }: StoryQuizProps) {
  const [questions, setQuestions] = useState<PublicQuestion[] | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const [answers, setAnswers] = useState<Record<string, Choice>>({});
  const [submitting, setSubmitting] = useState(false);
  const [results, setResults] = useState<GradeResponse | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Generation token: every call to loadQuiz() bumps this; in-flight fetches
  // from older calls discard their results when they finally resolve. This
  // prevents a slow earlier request from clobbering the current question set
  // (which used to cause "results show choices I never saw" — students would
  // answer one set of questions but the grader was given the next set).
  const loadGenRef = useRef(0);
  const submitGenRef = useRef(0);

  const allAnswered = useMemo(
    () => questions !== null && questions.every((q) => answers[q.id] !== undefined),
    [questions, answers],
  );

  async function loadQuiz() {
    const myGen = ++loadGenRef.current;
    // Also invalidate any in-flight submission — its answers belong to the
    // OLD question set and would be graded against the NEW one.
    submitGenRef.current++;
    setLoading(true);
    setLoadError(null);
    setResults(null);
    setAnswers({});
    setQuestions(null);
    try {
      const data = await customFetch<{ questions: PublicQuestion[] }>(
        `/api/stories/${storyId}/quiz`,
      );
      if (loadGenRef.current !== myGen) return; // stale — superseded
      setQuestions(data.questions);
    } catch (err) {
      if (loadGenRef.current !== myGen) return;
      const e = err as { data?: { error?: string }; message?: string } | null;
      setLoadError(e?.data?.error ?? e?.message ?? "Could not load the quiz.");
    } finally {
      if (loadGenRef.current === myGen) setLoading(false);
    }
  }

  useEffect(() => {
    loadQuiz();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storyId]);

  async function handleSubmit() {
    if (!questions || !allAnswered || submitting) return;
    const myGen = ++submitGenRef.current;
    // Snapshot the (questions, answers) pair the student actually saw, so
    // the results we render can't drift if state changes mid-request.
    const submittedQuestions = questions;
    const submittedAnswers = answers;
    setSubmitting(true);
    setSubmitError(null);
    try {
      const data = await customFetch<GradeResponse>(
        `/api/stories/${storyId}/quiz/grade`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ answers: submittedAnswers }),
        },
      );
      if (submitGenRef.current !== myGen) return;

      // Defense-in-depth: validate the server's response against the exact
      // questions+choices the student saw. If anything drifted (e.g. the
      // server-side cache was regenerated mid-flight), the verdicts and
      // "correct" letters reference a different choice set — rendering them
      // would be the very bug we're trying to fix. Force a clean reload
      // rather than display contradictory results.
      const byId = new Map(submittedQuestions.map((q) => [q.id, q]));
      const drift =
        data.results.length !== submittedQuestions.length ||
        data.results.some((r) => {
          const original = byId.get(r.id);
          if (!original) return true;
          return (
            original.choices.A !== r.choices.A ||
            original.choices.B !== r.choices.B ||
            original.choices.C !== r.choices.C ||
            original.choices.D !== r.choices.D
          );
        });
      if (drift) {
        setSubmitError(
          "We refreshed this quiz while you were answering. Loading the latest version…",
        );
        // Reload (which bumps both gen tokens, clearing this submission).
        loadQuiz();
        return;
      }

      // Trust the server's verdicts, but always echo the answers we
      // actually submitted (snapshot) so a malformed server `chosen` value
      // can't show the student a choice they didn't pick.
      const reconciled: GradedQuestion[] = data.results.map((r) => ({
        ...r,
        chosen: submittedAnswers[r.id] ?? null,
      }));
      setResults({ ...data, results: reconciled });
      onComplete?.();
    } catch (err) {
      if (submitGenRef.current !== myGen) return;
      const e = err as { data?: { error?: string }; message?: string } | null;
      setSubmitError(e?.data?.error ?? e?.message ?? "Could not submit your answers.");
    } finally {
      if (submitGenRef.current === myGen) setSubmitting(false);
    }
  }

  function handleTryAgain() {
    loadQuiz();
  }

  // ── render ──

  if (loading) {
    return (
      <Card className="p-6 flex items-center justify-center gap-3 text-muted-foreground">
        <Loader2 className="h-5 w-5 animate-spin" />
        <span>Generating your comprehension quiz…</span>
      </Card>
    );
  }

  if (loadError) {
    return (
      <Card className="p-6">
        <p className="text-sm text-destructive mb-3">{loadError}</p>
        <Button variant="outline" size="sm" onClick={loadQuiz}>
          <RefreshCcw className="h-4 w-4 mr-2" />
          Try again
        </Button>
      </Card>
    );
  }

  if (!questions) return null;

  if (results) {
    return (
      <Card className="p-6 space-y-6">
        <div className="text-center">
          <div className="text-3xl font-bold">
            {results.correct} / {results.total}
          </div>
          <p className="mt-1 text-base">{encouragement(results.correct)}</p>
          {results.xpAwarded > 0 && (
            <p className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-amber-600 dark:text-amber-400">
              <Sparkles className="h-4 w-4" />
              +{results.xpAwarded} XP earned
            </p>
          )}
        </div>

        <div className="space-y-4">
          {results.results.map((r, i) => (
            <div
              key={r.id}
              className={cn(
                "rounded-lg border p-4",
                r.isRight
                  ? "border-emerald-300 bg-emerald-50 dark:border-emerald-900 dark:bg-emerald-950/30"
                  : "border-rose-300 bg-rose-50 dark:border-rose-900 dark:bg-rose-950/30",
              )}
            >
              <div className="flex items-start gap-2">
                {r.isRight ? (
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="h-5 w-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm mb-2">
                    {i + 1}. {r.question}
                  </p>
                  <div className="space-y-1.5 text-sm">
                    {LETTERS.map((L) => {
                      const isCorrect = L === r.correct;
                      const isChosen = L === r.chosen;
                      return (
                        <div
                          key={L}
                          className={cn(
                            "rounded px-2 py-1.5 flex gap-2",
                            isCorrect && "bg-emerald-200/60 dark:bg-emerald-900/50 font-medium",
                            !isCorrect && isChosen && "bg-rose-200/60 dark:bg-rose-900/50",
                          )}
                        >
                          <span className="font-semibold w-5">{L}.</span>
                          <span className="flex-1">{r.choices[L]}</span>
                          {isCorrect && <CheckCircle2 className="h-4 w-4 text-emerald-700 dark:text-emerald-300 shrink-0" />}
                          {!isCorrect && isChosen && <XCircle className="h-4 w-4 text-rose-700 dark:text-rose-300 shrink-0" />}
                        </div>
                      );
                    })}
                  </div>
                  {!r.isRight && (
                    <p className="mt-2 text-xs text-muted-foreground italic">
                      <span className="font-semibold not-italic">Why {r.correct}: </span>
                      {r.explanation}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <Button variant="outline" onClick={handleTryAgain}>
            <RefreshCcw className="h-4 w-4 mr-2" />
            Try again
          </Button>
        </div>
      </Card>
    );
  }

  // Unsubmitted quiz
  return (
    <Card className="p-6 space-y-5">
      <div className="space-y-5">
        {questions.map((q, i) => {
          const chosen = answers[q.id];
          return (
            <div key={q.id}>
              <p className="font-medium text-sm mb-2">
                {i + 1}. {q.question}
              </p>
              <div className="space-y-2">
                {LETTERS.map((L) => {
                  const isChosen = chosen === L;
                  return (
                    <button
                      type="button"
                      key={L}
                      onClick={() =>
                        setAnswers((prev) => ({ ...prev, [q.id]: L }))
                      }
                      className={cn(
                        "w-full text-left rounded-md border px-3 py-2 text-sm transition flex gap-2 items-start",
                        "hover:bg-accent",
                        isChosen
                          ? "border-primary bg-primary/10 ring-2 ring-primary/30"
                          : "border-border",
                      )}
                    >
                      <span
                        className={cn(
                          "font-semibold w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs",
                          isChosen
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted",
                        )}
                      >
                        {L}
                      </span>
                      <span className="flex-1 pt-0.5">{q.choices[L]}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {submitError && (
        <p className="text-sm text-destructive">{submitError}</p>
      )}

      <div className="flex justify-center">
        <Button
          onClick={handleSubmit}
          disabled={!allAnswered || submitting}
          size="lg"
        >
          {submitting ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Checking your answers…
            </>
          ) : (
            <>Submit answers</>
          )}
        </Button>
      </div>
      {!allAnswered && (
        <p className="text-center text-xs text-muted-foreground">
          Answer all 5 questions to submit.
        </p>
      )}
    </Card>
  );
}
