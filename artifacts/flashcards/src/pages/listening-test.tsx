import { useState, useRef, useEffect } from "react";
import { Layout } from "@/components/layout";
import {
  Headphones, ChevronRight, ChevronLeft, CheckCircle2, XCircle,
  Clock, Trophy, AlertTriangle, RotateCcw, ArrowUp, ListChecks, X,
  Play, Pause, Volume2, Sparkles, Target
} from "lucide-react";
import {
  listeningTests,
  calculateListeningBand,
  getListeningRecommendation,
  getListeningArabicRecommendation,
  type ListeningPart,
  type ListeningTest,
  type ListeningQuestionSection,
} from "@/data/listening-test";
import { useAwardXp } from "@workspace/api-client-react";
import ListeningSkills from "@/components/listening-skills";

type Answers = Record<number, string>;
type Phase = "select" | "intro" | "test" | "results";
type Mode = "menu" | "full" | "skills";

export default function ListeningTestPage() {
  const [mode, setMode] = useState<Mode>("menu");
  const [phase, setPhase] = useState<Phase>("select");
  const [selectedTest, setSelectedTest] = useState<ListeningTest | null>(null);
  const [currentPart, setCurrentPart] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [initialSkillsSection, setInitialSkillsSection] = useState<1 | 2 | 3 | 4 | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const { mutate: awardXp } = useAwardXp();

  // Hash deep-linking: #full / #skills / #skills-1 .. #skills-4
  useEffect(() => {
    const apply = () => {
      const h = (typeof window !== "undefined" ? window.location.hash : "").toLowerCase();
      if (!h) return;
      if (h === "#full") setMode("full");
      else if (h.startsWith("#skills")) {
        setMode("skills");
        const m = h.match(/^#skills-([1-4])$/);
        setInitialSkillsSection(m ? (Number(m[1]) as 1 | 2 | 3 | 4) : null);
      }
    };
    apply();
    window.addEventListener("hashchange", apply);
    return () => window.removeEventListener("hashchange", apply);
  }, []);

  const selectTest = (test: ListeningTest) => {
    setSelectedTest(test);
    setPhase("intro");
  };

  const startTest = () => {
    setPhase("test");
    setAnswers({});
    setCurrentPart(0);
    setTimeElapsed(0);
    timerRef.current = setInterval(() => {
      setTimeElapsed(prev => prev + 1);
    }, 1000);
  };

  const handleSubmit = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setPhase("results");
    topRef.current?.scrollIntoView({ behavior: "smooth" });
    awardXp({ activity: "listening_test", amount: 20 });
  };

  const goToSelect = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setPhase("select");
    setSelectedTest(null);
    setAnswers({});
    setCurrentPart(0);
    setTimeElapsed(0);
  };

  const retakeTest = () => {
    setAnswers({});
    setCurrentPart(0);
    setTimeElapsed(0);
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

  // ───────── Mode menu ─────────
  if (mode === "menu") {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="bg-card border border-border rounded-3xl p-8 text-center space-y-3">
            <div className="w-16 h-16 rounded-2xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mx-auto">
              <Headphones className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            </div>
            <h1 className="text-3xl font-black">Listening Practice</h1>
            <p className="text-muted-foreground">Choose how you want to train your ear today.</p>
            <p className="text-sm text-muted-foreground" dir="rtl" lang="ar">اختر طريقة التدريب على الاستماع</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <button
              onClick={() => setMode("full")}
              className="group bg-card border border-border rounded-3xl p-6 text-left hover:border-purple-400 hover:shadow-xl hover:shadow-purple-500/10 transition-all"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center mb-4">
                <ListChecks className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-black mb-1 group-hover:text-purple-600 transition-colors">Full Listening Tests</h3>
              <p className="text-xs text-muted-foreground mb-2" dir="rtl" lang="ar">اختبارات استماع كاملة</p>
              <p className="text-sm text-muted-foreground">Complete Cambridge-style tests: 4 parts, 40 questions, ~30 minutes — exam conditions.</p>
            </button>
            <button
              onClick={() => setMode("skills")}
              className="group bg-card border border-border rounded-3xl p-6 text-left hover:border-purple-400 hover:shadow-xl hover:shadow-purple-500/10 transition-all"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mb-4">
                <Target className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-black mb-1 group-hover:text-emerald-600 transition-colors">Section Practice</h3>
              <p className="text-xs text-muted-foreground mb-2" dir="rtl" lang="ar">تدريب على كل قسم على حدة</p>
              <p className="text-sm text-muted-foreground">Targeted practice for Sections 1–4 individually — short, focused exercises with full analysis.</p>
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  // ───────── Skills practice ─────────
  if (mode === "skills") {
    return (
      <Layout>
        <ListeningSkills onBack={() => setMode("menu")} initialSection={initialSkillsSection} />
      </Layout>
    );
  }

  // ───────── Full tests (existing flow) ─────────
  if (phase === "select") {
    return (
      <Layout>
        <div className="max-w-3xl mx-auto space-y-8">
          <button
            onClick={() => setMode("menu")}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ChevronLeft className="w-4 h-4" /> Back to Listening Practice
          </button>
          <div className="bg-card border border-border rounded-3xl p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mx-auto">
              <Headphones className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            </div>
            <h1 className="text-3xl font-black text-foreground">IELTS Listening Tests</h1>
            <p className="text-muted-foreground text-lg">Cambridge IELTS Official Past Exam Collection</p>
            <p className="text-muted-foreground text-sm">Authentic Practice Tests · Academic Class</p>
            <p className="text-sm text-muted-foreground mt-1" dir="rtl" lang="ar">اختر اختباراً للبدء</p>
          </div>

          <div className="grid gap-4">
            {listeningTests.map(test => (
              <button
                key={test.id}
                onClick={() => selectTest(test)}
                className="bg-card border border-border rounded-2xl p-6 text-left hover:border-purple-400 hover:shadow-lg hover:shadow-purple-600/10 transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                        <ListChecks className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <h2 className="text-lg font-bold text-foreground group-hover:text-purple-600 transition-colors">{test.label}</h2>
                        <p className="text-xs text-muted-foreground">{test.source}</p>
                        <p className="text-xs text-muted-foreground">4 Parts · 40 Questions · ~30 Minutes</p>
                      </div>
                    </div>
                    <div className="flex gap-2 flex-wrap ml-13">
                      {test.parts.map(p => (
                        <span key={p.id} className="text-xs bg-muted/60 text-muted-foreground rounded-lg px-2.5 py-1 border border-border">
                          Part {p.id}: {p.title}
                        </span>
                      ))}
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-purple-600 transition-colors shrink-0" />
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
            <div className="w-16 h-16 rounded-2xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mx-auto">
              <Headphones className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            </div>
            <h1 className="text-3xl font-black text-foreground">IELTS Listening — {selectedTest.label}</h1>
            <p className="text-muted-foreground text-lg">{selectedTest.source}</p>
            <p className="text-sm text-muted-foreground" dir="rtl" lang="ar">اختبار الاستماع الأكاديمي</p>

            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
              <div className="bg-muted/50 rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-foreground">4</p>
                <p className="text-xs text-muted-foreground">Parts</p>
              </div>
              <div className="bg-muted/50 rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-foreground">40</p>
                <p className="text-xs text-muted-foreground">Questions</p>
              </div>
              <div className="bg-muted/50 rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-foreground">~30</p>
                <p className="text-xs text-muted-foreground">Minutes</p>
              </div>
            </div>

            <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4 text-left space-y-2">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                <p className="text-sm font-semibold text-amber-700 dark:text-amber-300">Instructions</p>
              </div>
              <ul className="text-sm text-amber-700 dark:text-amber-400 space-y-1.5 list-disc list-inside">
                <li>Use headphones for the best experience</li>
                <li>Each part has its own audio — play it and answer the questions</li>
                <li>You can pause, rewind and replay the audio</li>
                <li>Answer all 40 questions</li>
                <li>For fill-in-the-blank, type your answer exactly</li>
                <li>For multiple choice, select the correct letter</li>
                <li>For "choose TWO", select exactly two options</li>
              </ul>
              <ul className="text-sm text-amber-700 dark:text-amber-400 space-y-1.5 list-disc list-inside mt-2" dir="rtl" lang="ar">
                <li>استخدم سماعات للحصول على أفضل تجربة</li>
                <li>كل جزء له تسجيل صوتي خاص — شغّله وأجب عن الأسئلة</li>
                <li>يمكنك إيقاف التسجيل وإعادته</li>
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
                className="px-8 py-4 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-lg transition-colors shadow-lg shadow-purple-600/25"
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
        timeUsed={timeElapsed}
        onRetake={retakeTest}
        onSelectOther={goToSelect}
      />
    );
  }

  if (!selectedTest) return null;
  const parts = selectedTest.parts;
  const part = parts[currentPart];

  const totalQuestions = parts.flatMap(p => p.questionSections.flatMap(s => s.questions)).length;
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
              <Headphones className="w-5 h-5 text-purple-600" />
              <h1 className="text-lg font-bold text-foreground">Listening — {selectedTest.label}</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 text-sm">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span className="text-muted-foreground">{answeredCount}/{totalQuestions}</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm font-mono font-bold text-foreground">
                <Clock className="w-4 h-4" />
                {formatTime(timeElapsed)}
              </div>
            </div>
          </div>

          <div className="flex gap-2 mt-3">
            {parts.map((p, i) => (
              <button
                key={p.id}
                onClick={() => { setCurrentPart(i); topRef.current?.scrollIntoView({ behavior: "smooth" }); }}
                className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  i === currentPart
                    ? "bg-purple-600 text-white"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                Part {i + 1}
              </button>
            ))}
          </div>
        </div>

        <PartView
          part={part}
          answers={answers}
          setAnswer={setAnswer}
        />

        <div className="flex items-center justify-between pt-4 pb-8">
          <button
            onClick={() => { setCurrentPart(prev => prev - 1); topRef.current?.scrollIntoView({ behavior: "smooth" }); }}
            disabled={currentPart === 0}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-muted text-foreground font-semibold hover:bg-muted/80 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>

          {currentPart < 3 ? (
            <button
              onClick={() => { setCurrentPart(prev => prev + 1); topRef.current?.scrollIntoView({ behavior: "smooth" }); }}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-colors"
            >
              Next Part
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

function AudioPlayer({ src }: { src: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTime = () => setCurrentTime(audio.currentTime);
    const onMeta = () => setDuration(audio.duration);
    const onEnd = () => setPlaying(false);

    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onMeta);
    audio.addEventListener("ended", onEnd);
    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onMeta);
      audio.removeEventListener("ended", onEnd);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
    } else {
      audio.play();
    }
    setPlaying(!playing);
  };

  const seek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Number(e.target.value);
    setCurrentTime(audio.currentTime);
  };

  const fmt = (s: number) => {
    if (!isFinite(s)) return "0:00";
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const base = import.meta.env.BASE_URL.replace(/\/$/, "");

  return (
    <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-950/30 dark:to-indigo-950/30 border border-purple-200 dark:border-purple-800 rounded-2xl p-4 space-y-3">
      <audio ref={audioRef} src={`${base}${src}`} preload="metadata" />

      <div className="flex items-center gap-3">
        <button
          onClick={togglePlay}
          className="w-12 h-12 rounded-xl bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-center transition-colors shadow-lg shadow-purple-600/25 shrink-0"
        >
          {playing ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
        </button>

        <div className="flex-1 space-y-1">
          <input
            type="range"
            min={0}
            max={duration || 0}
            value={currentTime}
            onChange={seek}
            className="w-full h-2 rounded-full appearance-none bg-purple-200 dark:bg-purple-900 cursor-pointer accent-purple-600"
          />
          <div className="flex justify-between text-xs text-muted-foreground font-mono">
            <span>{fmt(currentTime)}</span>
            <span>{fmt(duration)}</span>
          </div>
        </div>

        <Volume2 className="w-4 h-4 text-purple-500 shrink-0" />
      </div>

      <p className="text-xs text-purple-600 dark:text-purple-400 font-medium flex items-center gap-1.5">
        <Headphones className="w-3.5 h-3.5" />
        Play the audio and answer the questions below
      </p>
    </div>
  );
}

function PartView({
  part,
  answers,
  setAnswer,
}: {
  part: ListeningPart;
  answers: Answers;
  setAnswer: (q: number, v: string) => void;
}) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <p className="text-xs text-purple-600 dark:text-purple-400 font-semibold uppercase tracking-wide">{part.questionRange}</p>
        <h2 className="text-xl font-black text-foreground">{part.title}</h2>
      </div>

      <AudioPlayer src={part.audioSrc} />

      {part.tableHtml && (
        <div className="bg-card border border-border rounded-2xl p-4 overflow-x-auto">
          <div dangerouslySetInnerHTML={{ __html: part.tableHtml }} />
        </div>
      )}

      {part.questionSections.map((section, si) => (
        <QuestionSectionView
          key={si}
          section={section}
          answers={answers}
          setAnswer={setAnswer}
        />
      ))}
    </div>
  );
}

function QuestionSectionView({
  section,
  answers,
  setAnswer,
}: {
  section: ListeningQuestionSection;
  answers: Answers;
  setAnswer: (q: number, v: string) => void;
}) {
  return (
    <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
      <p className="text-sm text-muted-foreground whitespace-pre-line font-medium">{section.instruction}</p>

      {section.options && section.type !== "mc" && section.type !== "multiSelect" && (
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

      {section.type === "multiSelect" && section.options && (
        <div className="bg-muted/50 rounded-xl p-3">
          <p className="text-xs font-semibold text-muted-foreground mb-2">Options:</p>
          <div className="space-y-1">
            {section.options.map(o => (
              <p key={o.label} className="text-sm text-foreground">
                <span className="font-bold">{o.label}.</span> {o.text}
              </p>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-3">
        {section.questions.map(q => (
          <div key={q.num} className="flex items-start gap-3">
            <span className="w-7 h-7 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-xs font-bold text-purple-600 dark:text-purple-400 shrink-0 mt-0.5">
              {q.num}
            </span>
            <div className="flex-1 space-y-1.5">
              <p className="text-sm text-foreground whitespace-pre-line">{q.text}</p>
              {section.type === "multiSelect" ? (
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
                            ? "bg-purple-600 text-white border-purple-600"
                            : "bg-background border-border text-muted-foreground hover:border-purple-400"
                        }`}
                      >
                        {o.label}
                      </button>
                    );
                  })}
                  <span className="text-xs text-muted-foreground self-center ml-1">(choose 2)</span>
                </div>
              ) : section.type === "mc" ? (
                <div className="flex gap-1.5 flex-wrap">
                  {section.options!.map(o => (
                    <button
                      key={o.label}
                      onClick={() => setAnswer(q.num, o.label)}
                      className={`w-8 h-8 rounded-lg text-xs font-bold border transition-colors ${
                        answers[q.num] === o.label
                          ? "bg-purple-600 text-white border-purple-600"
                          : "bg-background border-border text-muted-foreground hover:border-purple-400"
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
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-purple-500"
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
  test: ListeningTest;
  answers: Answers;
  timeUsed: number;
  onRetake: () => void;
  onSelectOther: () => void;
}) {
  const parts = test.parts;
  const allQuestions = parts.flatMap(p =>
    p.questionSections.flatMap(s => s.questions)
  );
  const allSections = parts.flatMap(p => p.questionSections);

  const results = allQuestions.map(q => {
    const section = allSections.find(s => s.questions.some(sq => sq.num === q.num));
    if (section?.type === "multiSelect") {
      const userParts = (answers[q.num] || "").split(",").filter(Boolean).sort();
      const correctParts = q.answer.split(",").sort();
      const matchCount = userParts.filter(u => correctParts.includes(u)).length;
      return { ...q, userAnswer: answers[q.num] || "", isCorrect: matchCount === correctParts.length, partialCount: matchCount, totalParts: correctParts.length, isMulti: true as const };
    }
    const userAnswer = (answers[q.num] || "").trim().toLowerCase();
    const correct = q.answer.toLowerCase();
    const alts = q.alternateAnswers?.map(a => a.toLowerCase()) || [];
    const isCorrect = userAnswer === correct || alts.includes(userAnswer);
    return { ...q, userAnswer: answers[q.num] || "", isCorrect, partialCount: isCorrect ? 1 : 0, totalParts: 1, isMulti: false as const };
  });

  const correctCount = results.reduce((sum, r) => sum + (r.isMulti ? r.partialCount : (r.isCorrect ? 1 : 0)), 0);
  const { band, label } = calculateListeningBand(correctCount);
  const recommendation = getListeningRecommendation(band);
  const arabicRec = getListeningArabicRecommendation(band);

  const partResults = parts.map(p => {
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
        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950/30 dark:to-indigo-950/30 border border-purple-200 dark:border-purple-800 rounded-3xl p-8 text-center space-y-4">
          <Trophy className="w-12 h-12 text-amber-500 mx-auto" />
          <h1 className="text-3xl font-black text-foreground">{test.label} — Complete!</h1>

          <div className="flex items-center justify-center gap-8 flex-wrap">
            <div>
              <p className="text-5xl font-black text-purple-600 dark:text-purple-400">{band}</p>
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

          <div className="inline-block px-4 py-1.5 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm font-semibold">
            {label} User
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {partResults.map((pr, i) => (
            <div key={i} className="bg-card border border-border rounded-2xl p-5 text-center">
              <p className="text-xs text-muted-foreground font-semibold uppercase mb-1">Part {i + 1}</p>
              <p className="text-sm font-medium text-foreground mb-2 line-clamp-1">{pr.title}</p>
              <p className="text-2xl font-bold text-foreground">{pr.correct}/{pr.total}</p>
              <div className="w-full bg-muted rounded-full h-2 mt-2">
                <div
                  className="bg-purple-600 rounded-full h-2 transition-all"
                  style={{ width: `${pr.total > 0 ? (pr.correct / pr.total) * 100 : 0}%` }}
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

          {parts.map((part, pi) => (
            <div key={pi} className="space-y-3">
              <h3 className="text-sm font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wide">
                Part {pi + 1}: {part.title}
              </h3>
              <div className="space-y-2">
                {part.questionSections.flatMap(s => s.questions).map(q => {
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
                          <span className="font-bold">Q{q.num}.</span> {q.text.split("\n")[0]}
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
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-colors"
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
