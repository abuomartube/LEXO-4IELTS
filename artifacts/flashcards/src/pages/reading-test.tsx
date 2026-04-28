import { useState, useRef, useEffect } from "react";
import { useAwardXp } from "@workspace/api-client-react";
import { Layout } from "@/components/layout";
import {
  BookOpen, ChevronRight, ChevronLeft, CheckCircle2, XCircle,
  Clock, Trophy, AlertTriangle, RotateCcw, ArrowUp, ListChecks, X,
  Sparkles, Target
} from "lucide-react";
import {
  readingTests,
  calculateBand,
  getRecommendation,
  getArabicRecommendation,
  type ReadingPassage,
  type ReadingTest,
  type QuestionSection
} from "@/data/reading-test";
import { ReadingSkills } from "@/components/reading-skills";
import { answerMatches } from "@/data/answer-matching";

type Answers = Record<number, string>;
type Mode = "menu" | "full" | "skills";
type Phase = "select" | "intro" | "test" | "results";

export default function ReadingTestPage() {
  const [mode, setMode] = useState<Mode>("menu");

  const [phase, setPhase] = useState<Phase>("select");
  const [selectedTest, setSelectedTest] = useState<ReadingTest | null>(null);

  // Hash deep-linking from the daily plan: #full / #skills
  // Query deep-linking from the scheduler: ?test=test1 jumps into that mock.
  useEffect(() => {
    const apply = () => {
      const h = (typeof window !== "undefined" ? window.location.hash : "").toLowerCase();
      if (h === "#full") setMode("full");
      else if (h === "#skills" || h.startsWith("#skills-")) setMode("skills");
    };
    apply();
    window.addEventListener("hashchange", apply);

    // One-shot query reception
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const testId = params.get("test");
      if (testId) {
        const match = readingTests.find((t) => t.id === testId);
        if (match) {
          setMode("full");
          setSelectedTest(match);
          setPhase("intro");
        }
        try {
          const url = new URL(window.location.href);
          url.searchParams.delete("test");
          window.history.replaceState({}, "", url.toString());
        } catch {}
      }
    }
    return () => window.removeEventListener("hashchange", apply);
  }, []);
  const [currentPassage, setCurrentPassage] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [timeLeft, setTimeLeft] = useState(60 * 60);
  const [timeUsed, setTimeUsed] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const { mutate: awardXp } = useAwardXp();

  const selectTest = (test: ReadingTest) => {
    setSelectedTest(test);
    setPhase("intro");
  };

  const startTest = () => {
    setPhase("test");
    setAnswers({});
    setCurrentPassage(0);
    setTimeLeft(60 * 60);
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleSubmit = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setTimeUsed(3600 - timeLeft);
    setPhase("results");
    topRef.current?.scrollIntoView({ behavior: "smooth" });
    awardXp({ activity: "reading_test", amount: 20 });
  };

  const goToSelect = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setPhase("select");
    setSelectedTest(null);
    setAnswers({});
    setCurrentPassage(0);
    setTimeLeft(60 * 60);
  };

  const retakeTest = () => {
    setAnswers({});
    setCurrentPassage(0);
    setTimeLeft(60 * 60);
    setPhase("intro");
  };

  const setAnswer = (qNum: number, value: string) => {
    setAnswers(prev => ({ ...prev, [qNum]: value }));
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  // ── Mode menu: Full Tests vs Skills Practice ──
  if (mode === "menu") {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="bg-card border border-border rounded-3xl p-8 text-center space-y-3">
            <div className="w-16 h-16 rounded-2xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mx-auto">
              <BookOpen className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h1 className="text-3xl font-black text-foreground">IELTS Reading Practice</h1>
            <p className="text-muted-foreground text-base">Choose how you want to practise today</p>
            <p className="text-sm text-muted-foreground" dir="rtl" lang="ar">اختر طريقة التدريب</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => setMode("skills")}
              className="group text-left bg-card border border-border rounded-3xl p-6 hover:border-violet-400 hover:shadow-xl hover:shadow-violet-600/10 transition-all"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 flex items-center justify-center text-white shadow-lg mb-4">
                <Target className="w-7 h-7" />
              </div>
              <h2 className="text-xl font-black text-foreground group-hover:text-violet-600 transition-colors flex items-center gap-2">
                Skills Practice by Question Type
                <Sparkles className="w-4 h-4 text-violet-500" />
              </h2>
              <p className="text-sm text-muted-foreground mt-1">Targeted exercises for each of the 14 IELTS Reading question types — with detailed analysis after every submission.</p>
              <p className="text-xs text-muted-foreground mt-1" dir="rtl" lang="ar">تمارين مركّزة لكل نوع من أنواع أسئلة القراءة الـ١٤</p>
              <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-violet-600">
                Choose a question type <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </button>

            <button
              onClick={() => setMode("full")}
              className="group text-left bg-card border border-border rounded-3xl p-6 hover:border-blue-400 hover:shadow-xl hover:shadow-blue-600/10 transition-all"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-lg mb-4">
                <ListChecks className="w-7 h-7" />
              </div>
              <h2 className="text-xl font-black text-foreground group-hover:text-blue-600 transition-colors">Full Reading Tests</h2>
              <p className="text-sm text-muted-foreground mt-1">Complete 3-passage, 40-question, 60-minute Cambridge-style exams.</p>
              <p className="text-xs text-muted-foreground mt-1" dir="rtl" lang="ar">اختبارات قراءة كاملة (٣ نصوص · ٤٠ سؤال · ٦٠ دقيقة)</p>
              <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-blue-600">
                Start full test <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  if (mode === "skills") {
    return (
      <Layout>
        <div className="max-w-5xl mx-auto">
          <ReadingSkills onBack={() => setMode("menu")} />
        </div>
      </Layout>
    );
  }

  // ── Full-test mode: existing flow ──
  if (phase === "select") {
    return (
      <Layout>
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="bg-card border border-border rounded-3xl p-8 text-center space-y-6">
            <button
              onClick={() => setMode("menu")}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground"
            >
              <ChevronLeft className="w-3.5 h-3.5" /> Back to Reading Practice
            </button>
            <div className="w-16 h-16 rounded-2xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mx-auto">
              <BookOpen className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h1 className="text-3xl font-black text-foreground">IELTS Reading Tests</h1>
            <p className="text-muted-foreground text-lg">Cambridge IELTS Official Past Exam Collection</p>
            <p className="text-muted-foreground text-sm">Authentic Practice Tests Academic Class</p>
            <p className="text-sm text-muted-foreground mt-1" dir="rtl" lang="ar">اختر اختباراً للبدء</p>
          </div>

          <div className="grid gap-4">
            {readingTests.map(test => (
              <button
                key={test.id}
                onClick={() => selectTest(test)}
                className="bg-card border border-border rounded-2xl p-6 text-left hover:border-blue-400 hover:shadow-lg hover:shadow-blue-600/10 transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                        <ListChecks className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h2 className="text-lg font-bold text-foreground group-hover:text-blue-600 transition-colors">{test.label}</h2>
                        <p className="text-xs text-muted-foreground">3 Passages · 40 Questions · 60 Minutes</p>
                      </div>
                    </div>
                    <div className="flex gap-2 flex-wrap ml-13">
                      {test.passages.map(p => (
                        <span key={p.id} className="text-xs bg-muted/60 text-muted-foreground rounded-lg px-2.5 py-1 border border-border">
                          {p.title}
                        </span>
                      ))}
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-blue-600 transition-colors shrink-0" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </Layout>
    );
  }

  if (phase === "intro" && selectedTest) {
    return (
      <Layout>
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="bg-card border border-border rounded-3xl p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mx-auto">
              <BookOpen className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h1 className="text-3xl font-black text-foreground">IELTS Reading — {selectedTest.label}</h1>
            <p className="text-muted-foreground text-lg">Academic Reading Test</p>
            <p className="text-sm text-muted-foreground" dir="rtl" lang="ar">اختبار القراءة الأكاديمية</p>

            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
              <div className="bg-muted/50 rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-foreground">3</p>
                <p className="text-xs text-muted-foreground">Passages</p>
              </div>
              <div className="bg-muted/50 rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-foreground">40</p>
                <p className="text-xs text-muted-foreground">Questions</p>
              </div>
              <div className="bg-muted/50 rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-foreground">60</p>
                <p className="text-xs text-muted-foreground">Minutes</p>
              </div>
            </div>

            <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4 text-left space-y-2">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                <p className="text-sm font-semibold text-amber-700 dark:text-amber-300">Instructions</p>
              </div>
              <ul className="text-sm text-amber-700 dark:text-amber-400 space-y-1.5 list-disc list-inside">
                <li>Read each passage carefully before answering questions</li>
                <li>You have 60 minutes for all 3 passages</li>
                <li>Answer all 40 questions</li>
                <li>For fill-in-the-blank questions, type your answer exactly</li>
                <li>For TRUE/FALSE/NOT GIVEN or YES/NO/NOT GIVEN, select one option</li>
                <li>For matching questions, select the correct letter</li>
              </ul>
            </div>

            <div className="flex gap-3 justify-center">
              <button
                onClick={goToSelect}
                className="px-6 py-3 rounded-xl bg-muted text-foreground font-semibold hover:bg-muted/80 transition-colors"
              >
                Back
              </button>
              <button
                onClick={startTest}
                className="px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg transition-colors shadow-lg shadow-blue-600/25"
              >
                Start Test
              </button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (phase === "results" && selectedTest) {
    return (
      <ResultsView
        test={selectedTest}
        answers={answers}
        timeUsed={timeUsed}
        onRetake={retakeTest}
        onSelectOther={goToSelect}
      />
    );
  }

  if (!selectedTest) return null;
  const passages = selectedTest.passages;
  const passage = passages[currentPassage];
  const answeredCount = Object.keys(answers).filter(k => answers[Number(k)]?.trim()).length;

  return (
    <Layout>
      <div ref={topRef} className="max-w-5xl mx-auto space-y-4">
        <div className="sticky top-0 z-20 bg-background/95 backdrop-blur-sm border-b border-border pb-3 pt-1 -mx-4 px-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <button
                onClick={goToSelect}
                className="w-8 h-8 rounded-lg bg-muted hover:bg-red-100 dark:hover:bg-red-900/30 flex items-center justify-center transition-colors group"
                title="Exit test"
              >
                <X className="w-4 h-4 text-muted-foreground group-hover:text-red-500" />
              </button>
              <BookOpen className="w-5 h-5 text-blue-600" />
              <h1 className="text-lg font-bold text-foreground">Reading — {selectedTest.label}</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 text-sm">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span className="text-muted-foreground">{answeredCount}/40</span>
              </div>
              <div className={`flex items-center gap-1.5 text-sm font-mono font-bold ${timeLeft < 300 ? "text-red-500" : "text-foreground"}`}>
                <Clock className="w-4 h-4" />
                {formatTime(timeLeft)}
              </div>
            </div>
          </div>

          <div className="flex gap-2 mt-3">
            {passages.map((p, i) => (
              <button
                key={p.id}
                onClick={() => { setCurrentPassage(i); topRef.current?.scrollIntoView({ behavior: "smooth" }); }}
                className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  i === currentPassage
                    ? "bg-blue-600 text-white"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                Passage {i + 1}
              </button>
            ))}
          </div>
        </div>

        <PassageView
          passage={passage}
          answers={answers}
          setAnswer={setAnswer}
        />

        <div className="flex items-center justify-between pt-4 pb-8">
          <button
            onClick={() => { setCurrentPassage(prev => prev - 1); topRef.current?.scrollIntoView({ behavior: "smooth" }); }}
            disabled={currentPassage === 0}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-muted text-foreground font-semibold hover:bg-muted/80 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>

          {currentPassage < 2 ? (
            <button
              onClick={() => { setCurrentPassage(prev => prev + 1); topRef.current?.scrollIntoView({ behavior: "smooth" }); }}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
            >
              Next Passage
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors shadow-lg shadow-green-600/25"
            >
              <CheckCircle2 className="w-4 h-4" />
              Submit Test
            </button>
          )}
        </div>
      </div>
    </Layout>
  );
}

function PassageView({
  passage,
  answers,
  setAnswer,
}: {
  passage: ReadingPassage;
  answers: Answers;
  setAnswer: (q: number, v: string) => void;
}) {
  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <div className="bg-card border border-border rounded-2xl p-6 space-y-4 lg:sticky lg:top-36 lg:self-start lg:max-h-[calc(100vh-10rem)] lg:overflow-y-auto">
        <div>
          <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold uppercase tracking-wide mb-1">{passage.questionRange}</p>
          <h2 className="text-xl font-black text-foreground">{passage.title}</h2>
          {passage.subtitle && (
            <p className="text-sm text-muted-foreground italic mt-1">{passage.subtitle}</p>
          )}
          <p className="text-xs text-muted-foreground mt-2">{passage.timeGuide}</p>
        </div>
        <div className="space-y-4 text-sm leading-relaxed text-foreground">
          {passage.paragraphs.map((p, i) => (
            <div key={i}>
              {p.label && (
                <span className="inline-block font-bold text-blue-600 dark:text-blue-400 mr-2 text-base">{p.label}</span>
              )}
              <p className="inline">{p.text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        {passage.questionSections.map((section, si) => (
          <QuestionSectionView
            key={si}
            section={section}
            answers={answers}
            setAnswer={setAnswer}
          />
        ))}
      </div>
    </div>
  );
}

function getTfngOptions(section: QuestionSection): string[] {
  const instruction = section.instruction.toUpperCase();
  if (instruction.includes("YES") && instruction.includes("NO")) {
    return ["YES", "NO", "NOT GIVEN"];
  }
  return ["TRUE", "FALSE", "NOT GIVEN"];
}

function QuestionSectionView({
  section,
  answers,
  setAnswer,
}: {
  section: QuestionSection;
  answers: Answers;
  setAnswer: (q: number, v: string) => void;
}) {
  const tfngOptions = section.type === "tfng" ? getTfngOptions(section) : [];

  return (
    <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
      <p className="text-sm text-muted-foreground whitespace-pre-line font-medium">{section.instruction}</p>

      {section.options && section.type !== "tfng" && (
        <div className="bg-muted/50 rounded-xl p-3">
          <p className="text-xs font-semibold text-muted-foreground mb-2">Options:</p>
          <div className="flex flex-wrap gap-2">
            {section.options.map(o => (
              <span key={o.label} className="text-xs bg-background border border-border rounded-lg px-2.5 py-1">
                <span className="font-bold">{o.label}</span>{o.text !== o.label ? ` — ${o.text}` : ""}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-3">
        {section.questions.map(q => (
          <div key={q.num} className="flex items-start gap-3">
            <span className="w-7 h-7 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-xs font-bold text-blue-600 dark:text-blue-400 shrink-0 mt-0.5">
              {q.num}
            </span>
            <div className="flex-1 space-y-1.5">
              <p className="text-sm text-foreground whitespace-pre-line">{q.text}</p>
              {section.type === "tfng" ? (
                <div className="flex gap-2 flex-wrap">
                  {tfngOptions.map(opt => (
                    <button
                      key={opt}
                      onClick={() => setAnswer(q.num, opt)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                        answers[q.num] === opt
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-background border-border text-muted-foreground hover:border-blue-400"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              ) : section.type === "multiSelect" ? (
                <div className="flex gap-1.5 flex-wrap">
                  {section.options!.map(o => {
                    const selected = (answers[q.num] || "").split(",").filter(Boolean);
                    const isSelected = selected.includes(o.label);
                    return (
                      <button
                        key={o.label}
                        onClick={() => {
                          let next: string[];
                          if (isSelected) {
                            next = selected.filter(s => s !== o.label);
                          } else if (selected.length < 2) {
                            next = [...selected, o.label].sort();
                          } else {
                            next = [selected[1], o.label].sort();
                          }
                          setAnswer(q.num, next.join(","));
                        }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                          isSelected
                            ? "bg-blue-600 text-white border-blue-600"
                            : "bg-background border-border text-muted-foreground hover:border-blue-400"
                        }`}
                      >
                        {o.label}
                      </button>
                    );
                  })}
                  <span className="text-xs text-muted-foreground self-center ml-1">(choose 2)</span>
                </div>
              ) : section.type === "mcParagraph" || section.type === "mcMatch" ? (
                <div className="flex gap-1.5 flex-wrap">
                  {section.options!.map(o => (
                    <button
                      key={o.label}
                      onClick={() => setAnswer(q.num, o.label)}
                      className={`w-8 h-8 rounded-lg text-xs font-bold border transition-colors ${
                        answers[q.num] === o.label
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-background border-border text-muted-foreground hover:border-blue-400"
                      }`}
                    >
                      {o.label}
                    </button>
                  ))}
                </div>
              ) : (
                <input
                  type="text"
                  value={answers[q.num] || ""}
                  onChange={e => setAnswer(q.num, e.target.value)}
                  placeholder="Type your answer..."
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ResultsView({
  test,
  answers,
  timeUsed,
  onRetake,
  onSelectOther,
}: {
  test: ReadingTest;
  answers: Answers;
  timeUsed: number;
  onRetake: () => void;
  onSelectOther: () => void;
}) {
  const passages = test.passages;
  const allQuestions = passages.flatMap(p =>
    p.questionSections.flatMap(s => s.questions)
  );

  const allSections = passages.flatMap(p => p.questionSections);

  const results = allQuestions.map(q => {
    const section = allSections.find(s => s.questions.some(sq => sq.num === q.num));
    if (section?.type === "multiSelect") {
      const userParts = (answers[q.num] || "").split(",").filter(Boolean).sort();
      const correctParts = q.answer.split(",").sort();
      const matchCount = userParts.filter(u => correctParts.includes(u)).length;
      return { ...q, userAnswer: answers[q.num] || "", isCorrect: matchCount === correctParts.length, partialCount: matchCount, totalParts: correctParts.length, isMulti: true as const };
    }
    const rawUserAnswer = answers[q.num] || "";
    const candidates = [q.answer, ...(q.alternateAnswers ?? [])];
    const isCorrect = answerMatches(rawUserAnswer, candidates);
    return { ...q, userAnswer: rawUserAnswer, isCorrect, partialCount: isCorrect ? 1 : 0, totalParts: 1, isMulti: false as const };
  });

  const correctCount = results.reduce((sum, r) => sum + (r.isMulti ? r.partialCount : (r.isCorrect ? 1 : 0)), 0);
  const { band, label } = calculateBand(correctCount);
  const recommendation = getRecommendation(band);
  const arabicRec = getArabicRecommendation(band);

  const passageResults = passages.map(p => {
    const nums = p.questionSections.flatMap(s => s.questions.map(q => q.num));
    const pResults = results.filter(r => nums.includes(r.num));
    const correct = pResults.reduce((s, r) => s + r.partialCount, 0);
    const total = pResults.reduce((s, r) => s + r.totalParts, 0);
    return { title: p.title, correct, total };
  });

  const formatTime2 = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}m ${sec}s`;
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-6 pb-12">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border border-blue-200 dark:border-blue-800 rounded-3xl p-8 text-center space-y-4">
          <Trophy className="w-12 h-12 text-amber-500 mx-auto" />
          <h1 className="text-3xl font-black text-foreground">{test.label} — Complete!</h1>

          <div className="flex items-center justify-center gap-8 flex-wrap">
            <div>
              <p className="text-5xl font-black text-blue-600 dark:text-blue-400">{band}</p>
              <p className="text-sm text-muted-foreground mt-1">Band Score</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-foreground">{correctCount}/40</p>
              <p className="text-sm text-muted-foreground mt-1">Correct Answers</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-foreground">{formatTime2(timeUsed)}</p>
              <p className="text-sm text-muted-foreground mt-1">Time Used</p>
            </div>
          </div>

          <div className="inline-block px-4 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-semibold">
            {label} User
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          {passageResults.map((pr, i) => (
            <div key={i} className="bg-card border border-border rounded-2xl p-5 text-center">
              <p className="text-xs text-muted-foreground font-semibold uppercase mb-1">Passage {i + 1}</p>
              <p className="text-sm font-medium text-foreground mb-2 line-clamp-1">{pr.title}</p>
              <p className="text-2xl font-bold text-foreground">{pr.correct}/{pr.total}</p>
              <div className="w-full bg-muted rounded-full h-2 mt-2">
                <div
                  className="bg-blue-600 rounded-full h-2 transition-all"
                  style={{ width: `${(pr.correct / pr.total) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="bg-card border border-border rounded-2xl p-6 space-y-3">
          <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            Recommendation
          </h2>
          <p className="text-sm text-foreground leading-relaxed">{recommendation}</p>
          <p className="text-sm text-muted-foreground leading-relaxed" dir="rtl" lang="ar">{arabicRec}</p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
          <h2 className="text-lg font-bold text-foreground">Answer Review</h2>

          {passages.map((passage, pi) => (
            <div key={pi} className="space-y-3">
              <h3 className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wide">
                Passage {pi + 1}: {passage.title}
              </h3>
              <div className="space-y-2">
                {passage.questionSections.flatMap(s => s.questions).map(q => {
                  const r = results.find(x => x.num === q.num)!;
                  const isPartial = r.isMulti && r.partialCount > 0 && r.partialCount < r.totalParts;
                  return (
                    <div
                      key={q.num}
                      className={`flex items-start gap-3 p-3 rounded-xl border ${
                        r.isCorrect
                          ? "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800"
                          : isPartial
                            ? "bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800"
                            : "bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800"
                      }`}
                    >
                      <div className="mt-0.5">
                        {r.isCorrect ? (
                          <CheckCircle2 className="w-5 h-5 text-green-500" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-500" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-foreground">
                          <span className="font-bold">Q{q.num}.</span> {q.text}
                        </p>
                        <div className="flex flex-wrap gap-3 mt-1">
                          <p className="text-xs">
                            <span className="text-muted-foreground">Your answer: </span>
                            <span className={`font-semibold ${r.isCorrect ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
                              {r.userAnswer || "(no answer)"}
                            </span>
                          </p>
                          {!r.isCorrect && (
                            <p className="text-xs">
                              <span className="text-muted-foreground">Correct: </span>
                              <span className="font-semibold text-green-600 dark:text-green-400">{q.answer}</span>
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-4 pt-4">
          <button
            onClick={onRetake}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Retake This Test
          </button>
          <button
            onClick={onSelectOther}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-muted text-foreground font-semibold hover:bg-muted/80 transition-colors"
          >
            <ArrowUp className="w-4 h-4" />
            Choose Another Test
          </button>
        </div>
      </div>
    </Layout>
  );
}
