import { useState, useEffect, useRef, useCallback } from "react";
import { Layout } from "@/components/layout";
import {
  MOCK_TEST_SETS, SECTION_DURATIONS, SECTION_ORDER, SECTION_INFO,
  calculateOverallBand, type MockTestSet,
} from "@/data/mock-test";
import { listeningTests, calculateListeningBand, type ListeningTest } from "@/data/listening-test";
import { readingTests, calculateBand as calculateReadingBand, type ReadingTest } from "@/data/reading-test";
import {
  Play, Pause, ChevronRight, ChevronLeft, CheckCircle2,
  Trophy, Star, Send,
  Timer, FileText, BookOpen, Headphones, Mic, RefreshCw,
} from "lucide-react";
import { cn } from "@/lib/utils";

const API = import.meta.env.VITE_API_URL || "";
const base = import.meta.env.BASE_URL?.replace(/\/$/, "") || "";

type Phase = "select" | "section" | "break" | "results";

function formatTime(s: number): string {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

function SectionTimer({ timeLeft, total }: { timeLeft: number; total: number }) {
  const pct = (timeLeft / total) * 100;
  const urgent = timeLeft < 300;
  return (
    <div className="flex items-center gap-2">
      <Timer className={cn("w-4 h-4", urgent ? "text-red-500 animate-pulse" : "text-primary")} />
      <span className={cn("font-mono font-bold text-sm", urgent ? "text-red-500" : "text-foreground")}>
        {formatTime(timeLeft)}
      </span>
      <div className="w-20 h-1.5 bg-muted rounded-full overflow-hidden hidden sm:block">
        <div className={cn("h-full rounded-full transition-all", urgent ? "bg-red-500" : "bg-primary")} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function AudioPlayer({ src }: { src: string }) {
  const ref = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [cur, setCur] = useState(0);
  const [dur, setDur] = useState(0);

  useEffect(() => {
    const a = ref.current;
    if (!a) return;
    const onTime = () => setCur(a.currentTime);
    const onMeta = () => setDur(a.duration);
    const onEnd = () => setPlaying(false);
    a.addEventListener("timeupdate", onTime);
    a.addEventListener("loadedmetadata", onMeta);
    a.addEventListener("ended", onEnd);
    return () => { a.removeEventListener("timeupdate", onTime); a.removeEventListener("loadedmetadata", onMeta); a.removeEventListener("ended", onEnd); };
  }, []);

  const toggle = () => {
    if (!ref.current) return;
    if (playing) ref.current.pause(); else ref.current.play();
    setPlaying(!playing);
  };

  return (
    <div className="flex items-center gap-3 bg-muted/50 rounded-xl px-3 py-2">
      <audio ref={ref} src={`${base}${src}`} preload="metadata" />
      <button onClick={toggle} className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0">
        {playing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
      </button>
      <input
        type="range" min={0} max={dur || 1} value={cur} step={0.1}
        onChange={(e) => { if (ref.current) ref.current.currentTime = Number(e.target.value); }}
        className="flex-1 h-1 accent-primary"
      />
      <span className="text-xs text-muted-foreground font-mono w-20 text-right">
        {formatTime(Math.floor(cur))} / {formatTime(Math.floor(dur))}
      </span>
    </div>
  );
}

function ListeningSection({
  test, answers, setAnswer, currentPart, setCurrentPart,
}: {
  test: ListeningTest; answers: Record<number, string>;
  setAnswer: (n: number, v: string) => void;
  currentPart: number; setCurrentPart: (p: number) => void;
}) {
  const part = test.parts[currentPart];
  return (
    <div className="space-y-4">
      <div className="flex gap-1 overflow-x-auto pb-1">
        {test.parts.map((p, i) => (
          <button key={i} onClick={() => setCurrentPart(i)}
            className={cn("px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors",
              i === currentPart ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"
            )}
          >Part {i + 1}</button>
        ))}
      </div>
      <div className="bg-card border border-border rounded-2xl p-4 space-y-3">
        <h3 className="font-bold text-foreground">{part.title}</h3>
        <p className="text-xs text-muted-foreground">{part.questionRange}</p>
        <AudioPlayer src={part.audioSrc} />
        {part.tableHtml && (
          <div className="overflow-x-auto" dangerouslySetInnerHTML={{ __html: part.tableHtml }} />
        )}
        {part.questionSections.map((sec, si) => (
          <div key={si} className="space-y-2">
            <p className="text-sm font-medium text-foreground whitespace-pre-line">{sec.instruction}</p>
            {sec.type === "fill" && sec.questions.map((q) => (
              <div key={q.num} className="flex items-center gap-2">
                <span className="text-xs font-bold text-primary w-6">{q.num}.</span>
                <span className="text-sm text-foreground flex-1">{q.text.replace("________", "___")}</span>
                <input
                  type="text" value={answers[q.num] || ""} onChange={(e) => setAnswer(q.num, e.target.value)}
                  className="w-32 px-2 py-1 text-sm border border-border rounded-lg bg-background focus:ring-1 focus:ring-primary"
                  placeholder="Answer"
                />
              </div>
            ))}
            {sec.type === "mc" && sec.questions.map((q) => (
              <div key={q.num} className="space-y-1">
                <p className="text-sm text-foreground"><span className="font-bold text-primary mr-1">{q.num}.</span>{q.text}</p>
                <div className="flex flex-wrap gap-1.5 ml-5">
                  {(sec.options || []).map((o) => (
                    <button key={o.label} onClick={() => setAnswer(q.num, o.label)}
                      className={cn("px-3 py-1 rounded-lg text-xs font-bold border transition-colors",
                        answers[q.num] === o.label ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:border-primary"
                      )}
                    >{o.label}{o.text !== o.label ? ` — ${o.text}` : ""}</button>
                  ))}
                </div>
              </div>
            ))}
            {sec.type === "multiSelect" && sec.questions.map((q) => {
              const selected = (answers[q.num] || "").split(",").filter(Boolean);
              const toggle = (label: string) => {
                const set = new Set(selected);
                if (set.has(label)) set.delete(label); else if (set.size < 2) set.add(label);
                setAnswer(q.num, [...set].sort().join(","));
              };
              return (
                <div key={q.num} className="space-y-1">
                  <p className="text-sm text-foreground"><span className="font-bold text-primary mr-1">{q.num}.</span>{q.text}</p>
                  <div className="flex flex-wrap gap-1.5 ml-5">
                    {(sec.options || []).map((o) => (
                      <button key={o.label} onClick={() => toggle(o.label)}
                        className={cn("px-3 py-1 rounded-lg text-xs font-bold border transition-colors",
                          selected.includes(o.label) ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:border-primary"
                        )}
                      >{o.label} — {o.text}</button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

function ReadingSection({
  test, answers, setAnswer, currentPassage, setCurrentPassage,
}: {
  test: ReadingTest; answers: Record<number, string>;
  setAnswer: (n: number, v: string) => void;
  currentPassage: number; setCurrentPassage: (p: number) => void;
}) {
  const passage = test.passages[currentPassage];
  const isYesNo = (instr: string) => /yes.*no.*not given/i.test(instr);

  return (
    <div className="space-y-4">
      <div className="flex gap-1 overflow-x-auto pb-1">
        {test.passages.map((p, i) => (
          <button key={i} onClick={() => setCurrentPassage(i)}
            className={cn("px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors",
              i === currentPassage ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"
            )}
          >Passage {i + 1}</button>
        ))}
      </div>
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="bg-card border border-border rounded-2xl p-4 lg:sticky lg:top-36 lg:max-h-[70vh] lg:overflow-y-auto space-y-3">
          <h3 className="font-bold text-lg text-foreground">{passage.title}</h3>
          {passage.subtitle && <p className="text-sm text-muted-foreground italic">{passage.subtitle}</p>}
          {passage.paragraphs.map((p, i) => (
            <div key={i} className="text-sm text-foreground leading-relaxed">
              {p.label && <span className="font-bold text-primary mr-1">{p.label}</span>}
              {p.text}
            </div>
          ))}
        </div>
        <div className="space-y-4">
          <p className="text-xs text-muted-foreground">{passage.questionRange}</p>
          {passage.questionSections.map((sec, si) => (
            <div key={si} className="bg-card border border-border rounded-2xl p-4 space-y-2">
              <p className="text-sm font-medium text-foreground whitespace-pre-line">{sec.instruction}</p>
              {sec.type === "fill" && sec.questions.map((q) => (
                <div key={q.num} className="flex items-start gap-2">
                  <span className="text-xs font-bold text-primary w-6 mt-1">{q.num}.</span>
                  <span className="text-sm text-foreground flex-1">{q.text}</span>
                  <input type="text" value={answers[q.num] || ""} onChange={(e) => setAnswer(q.num, e.target.value)}
                    className="w-32 px-2 py-1 text-sm border border-border rounded-lg bg-background focus:ring-1 focus:ring-primary" placeholder="Answer"
                  />
                </div>
              ))}
              {sec.type === "tfng" && sec.questions.map((q) => {
                const opts = isYesNo(sec.instruction) ? ["YES", "NO", "NOT GIVEN"] : ["TRUE", "FALSE", "NOT GIVEN"];
                return (
                  <div key={q.num} className="space-y-1">
                    <p className="text-sm text-foreground"><span className="font-bold text-primary mr-1">{q.num}.</span>{q.text}</p>
                    <div className="flex gap-1.5 ml-5">
                      {opts.map((o) => (
                        <button key={o} onClick={() => setAnswer(q.num, o)}
                          className={cn("px-2.5 py-1 rounded-lg text-xs font-bold border transition-colors",
                            answers[q.num] === o ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:border-primary"
                          )}
                        >{o}</button>
                      ))}
                    </div>
                  </div>
                );
              })}
              {(sec.type === "mcParagraph" || sec.type === "mcMatch") && sec.questions.map((q) => (
                <div key={q.num} className="space-y-1">
                  <p className="text-sm text-foreground whitespace-pre-line"><span className="font-bold text-primary mr-1">{q.num}.</span>{q.text}</p>
                  <div className="flex flex-wrap gap-1.5 ml-5">
                    {(sec.options || []).map((o) => (
                      <button key={o.label} onClick={() => setAnswer(q.num, o.label)}
                        className={cn("px-2.5 py-1 rounded-lg text-xs font-bold border transition-colors",
                          answers[q.num] === o.label ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:border-primary"
                        )}
                      >{o.label}</button>
                    ))}
                  </div>
                </div>
              ))}
              {sec.type === "multiSelect" && sec.questions.map((q) => {
                const selected = (answers[q.num] || "").split(",").filter(Boolean);
                const toggle = (l: string) => {
                  const s = new Set(selected);
                  if (s.has(l)) s.delete(l); else if (s.size < 2) s.add(l);
                  setAnswer(q.num, [...s].sort().join(","));
                };
                return (
                  <div key={q.num} className="space-y-1">
                    <p className="text-sm text-foreground"><span className="font-bold text-primary mr-1">{q.num}.</span>{q.text}</p>
                    <div className="flex flex-wrap gap-1.5 ml-5">
                      {(sec.options || []).map((o) => (
                        <button key={o.label} onClick={() => toggle(o.label)}
                          className={cn("px-2.5 py-1 rounded-lg text-xs font-bold border transition-colors",
                            selected.includes(o.label) ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:border-primary"
                          )}
                        >{o.label} — {o.text}</button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function WritingSection({
  mockSet, task1Text, setTask1Text, task2Text, setTask2Text, activeTask, setActiveTask,
}: {
  mockSet: MockTestSet;
  task1Text: string; setTask1Text: (v: string) => void;
  task2Text: string; setTask2Text: (v: string) => void;
  activeTask: 1 | 2; setActiveTask: (t: 1 | 2) => void;
}) {
  const count = (t: string) => t.trim() ? t.trim().split(/\s+/).length : 0;
  const prompt = activeTask === 1 ? mockSet.writingTask1 : mockSet.writingTask2;
  const text = activeTask === 1 ? task1Text : task2Text;
  const setText = activeTask === 1 ? setTask1Text : setTask2Text;
  const minWords = activeTask === 1 ? 150 : 250;

  return (
    <div className="space-y-4">
      <div className="flex gap-1 bg-muted/50 rounded-xl p-1">
        <button onClick={() => setActiveTask(1)}
          className={cn("flex-1 rounded-lg px-3 py-2 text-sm font-bold transition-all",
            activeTask === 1 ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
          )}
        >Task 1 (150+ words)</button>
        <button onClick={() => setActiveTask(2)}
          className={cn("flex-1 rounded-lg px-3 py-2 text-sm font-bold transition-all",
            activeTask === 2 ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
          )}
        >Task 2 (250+ words)</button>
      </div>
      <div className="bg-card border border-border rounded-2xl p-4 space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold bg-primary/10 text-primary px-2 py-0.5 rounded-full">{prompt.taskType}</span>
          <span className="text-xs text-muted-foreground">Minimum {minWords} words</span>
        </div>
        <p className="text-sm text-foreground whitespace-pre-line leading-relaxed">{prompt.prompt}</p>
        {prompt.notes && (
          <div className="bg-muted/50 rounded-xl px-3 py-2 text-xs text-muted-foreground">
            <span className="font-bold">📊 Data: </span>{prompt.notes}
          </div>
        )}
      </div>
      <div className="relative">
        <textarea
          value={text} onChange={(e) => setText(e.target.value)}
          rows={14}
          className="w-full px-4 py-3 bg-card border border-border rounded-2xl text-sm text-foreground leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
          placeholder={`Write your ${prompt.taskType} response here...`}
        />
        <div className={cn("absolute bottom-3 right-3 text-xs font-bold rounded-full px-2 py-0.5",
          count(text) >= minWords ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300" : "bg-muted text-muted-foreground"
        )}>
          {count(text)} / {minWords} words
        </div>
      </div>
    </div>
  );
}

function SpeakingSection({
  mockSet, speakingResponses, setSpeakingResponse, currentQ, setCurrentQ,
}: {
  mockSet: MockTestSet;
  speakingResponses: Record<number, string>;
  setSpeakingResponse: (i: number, v: string) => void;
  currentQ: number; setCurrentQ: (q: number) => void;
}) {
  const questions = mockSet.speakingQuestions;
  const q = questions[currentQ];
  const partLabel = q.part === 1 ? "Part 1 — Introduction" : q.part === 2 ? "Part 2 — Cue Card" : "Part 3 — Discussion";

  return (
    <div className="space-y-4 max-w-2xl mx-auto">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold bg-primary/10 text-primary px-2.5 py-1 rounded-full">{partLabel}</span>
        <span className="text-xs text-muted-foreground">Question {currentQ + 1} of {questions.length}</span>
      </div>

      <div className="bg-card border border-border rounded-2xl p-5 space-y-3">
        <p className="text-lg font-bold text-foreground">{q.text}</p>
        {q.cueCard && (
          <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-xl px-4 py-3 space-y-1">
            <p className="text-xs font-bold text-amber-700 dark:text-amber-400">You should say:</p>
            {q.cueCard.map((c, i) => (
              <p key={i} className="text-sm text-foreground">• {c}</p>
            ))}
            <p className="text-xs text-muted-foreground mt-2">You have 1 minute to prepare and 1–2 minutes to speak.</p>
          </div>
        )}
      </div>

      <textarea
        value={speakingResponses[currentQ] || ""}
        onChange={(e) => setSpeakingResponse(currentQ, e.target.value)}
        rows={6}
        className="w-full px-4 py-3 bg-card border border-border rounded-2xl text-sm text-foreground leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
        placeholder="Type your spoken response here..."
      />

      <div className="flex justify-between">
        <button onClick={() => setCurrentQ(Math.max(0, currentQ - 1))} disabled={currentQ === 0}
          className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors"
        ><ChevronLeft className="w-4 h-4" /> Previous</button>
        <button onClick={() => setCurrentQ(Math.min(questions.length - 1, currentQ + 1))} disabled={currentQ === questions.length - 1}
          className="flex items-center gap-1 text-sm font-medium text-primary hover:opacity-80 disabled:opacity-30 transition-colors"
        >Next <ChevronRight className="w-4 h-4" /></button>
      </div>

      <div className="flex gap-1 flex-wrap justify-center">
        {questions.map((_, i) => (
          <button key={i} onClick={() => setCurrentQ(i)}
            className={cn("w-7 h-7 rounded-lg text-xs font-bold transition-colors",
              i === currentQ ? "bg-primary text-primary-foreground" :
                speakingResponses[i] ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300" :
                  "bg-muted text-muted-foreground"
            )}
          >{i + 1}</button>
        ))}
      </div>
    </div>
  );
}

function BandDisplay({ band, label }: { band: number; label: string }) {
  const color = band >= 7 ? "text-green-600 dark:text-green-400" : band >= 6 ? "text-amber-600 dark:text-amber-400" : "text-red-500";
  return (
    <div className="text-center">
      <div className={cn("text-3xl font-extrabold", color)}>{band.toFixed(1)}</div>
      <div className="text-xs text-muted-foreground mt-0.5">{label}</div>
    </div>
  );
}

function ResultsPage({
  scores, onRestart,
}: {
  scores: { listening: number; reading: number; writing: number; speaking: number };
  onRestart: () => void;
}) {
  const overall = calculateOverallBand(scores);
  const overallLabel = overall >= 8 ? "Expert" : overall >= 7 ? "Good" : overall >= 6 ? "Competent" : overall >= 5 ? "Modest" : "Limited";

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="bg-card border border-border rounded-3xl p-6 text-center space-y-4">
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
          <Trophy className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-3xl font-extrabold text-foreground">Mock IELTS Results</h1>
        <p className="text-muted-foreground">Your estimated overall band score</p>
        <div className="text-6xl font-extrabold text-primary">{overall.toFixed(1)}</div>
        <div className="text-lg font-bold text-muted-foreground">{overallLabel} User</div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-card border border-border rounded-2xl p-4">
          <div className="flex items-center gap-1.5 mb-2">
            <Headphones className="w-4 h-4 text-blue-500" />
            <span className="text-xs font-bold text-muted-foreground">Listening</span>
          </div>
          <BandDisplay band={scores.listening} label="/ 9.0" />
        </div>
        <div className="bg-card border border-border rounded-2xl p-4">
          <div className="flex items-center gap-1.5 mb-2">
            <BookOpen className="w-4 h-4 text-green-500" />
            <span className="text-xs font-bold text-muted-foreground">Reading</span>
          </div>
          <BandDisplay band={scores.reading} label="/ 9.0" />
        </div>
        <div className="bg-card border border-border rounded-2xl p-4">
          <div className="flex items-center gap-1.5 mb-2">
            <FileText className="w-4 h-4 text-amber-500" />
            <span className="text-xs font-bold text-muted-foreground">Writing</span>
          </div>
          <BandDisplay band={scores.writing} label="/ 9.0" />
        </div>
        <div className="bg-card border border-border rounded-2xl p-4">
          <div className="flex items-center gap-1.5 mb-2">
            <Mic className="w-4 h-4 text-rose-500" />
            <span className="text-xs font-bold text-muted-foreground">Speaking</span>
          </div>
          <BandDisplay band={scores.speaking} label="/ 9.0" />
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl p-5 space-y-3">
        <h3 className="font-bold text-foreground flex items-center gap-2">
          <Star className="w-4 h-4 text-amber-500" /> Band Score Breakdown
        </h3>
        <div className="space-y-2 text-sm">
          {[
            { label: "Listening", score: scores.listening, icon: "🎧" },
            { label: "Reading", score: scores.reading, icon: "📖" },
            { label: "Writing", score: scores.writing, icon: "✍️" },
            { label: "Speaking", score: scores.speaking, icon: "🎤" },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-3">
              <span className="text-lg">{s.icon}</span>
              <span className="flex-1 font-medium text-foreground">{s.label}</span>
              <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${(s.score / 9) * 100}%` }} />
              </div>
              <span className="font-bold text-primary w-8 text-right">{s.score.toFixed(1)}</span>
            </div>
          ))}
          <div className="border-t border-border pt-2 flex items-center gap-3">
            <span className="text-lg">🏆</span>
            <span className="flex-1 font-bold text-foreground">Overall Band</span>
            <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${(overall / 9) * 100}%` }} />
            </div>
            <span className="font-extrabold text-primary w-8 text-right">{overall.toFixed(1)}</span>
          </div>
        </div>
      </div>

      <div className="bg-muted/30 border border-border rounded-2xl p-4 text-sm text-muted-foreground space-y-2">
        <p className="font-bold text-foreground">📋 Notes:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Listening & Reading scores are auto-graded based on your answers</li>
          <li>Writing score is AI-estimated based on your essay analysis</li>
          <li>Speaking score is self-assessed — for a more accurate score, use Churchill AI</li>
          <li>This is an <span className="font-bold">estimate</span> — your actual IELTS score may vary</li>
        </ul>
      </div>

      <button onClick={onRestart}
        className="w-full bg-primary text-primary-foreground font-bold py-3 rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
      >
        <RefreshCw className="w-4 h-4" /> Take Another Mock Test
      </button>
    </div>
  );
}

export default function MockTestPage() {
  const [phase, setPhase] = useState<Phase>("select");
  const [mockSetIdx, setMockSetIdx] = useState(0);
  const [sectionIdx, setSectionIdx] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [listeningTestIdx, setListeningTestIdx] = useState(0);
  const [readingTestIdx, setReadingTestIdx] = useState(0);

  const [listeningAnswers, setListeningAnswers] = useState<Record<number, string>>({});
  const [readingAnswers, setReadingAnswers] = useState<Record<number, string>>({});
  const [task1Text, setTask1Text] = useState("");
  const [task2Text, setTask2Text] = useState("");
  const [speakingResponses, setSpeakingResponses] = useState<Record<number, string>>({});
  const [speakingBand, setSpeakingBand] = useState(6.0);

  const [currentPart, setCurrentPart] = useState(0);
  const [currentPassage, setCurrentPassage] = useState(0);
  const [activeWritingTask, setActiveWritingTask] = useState<1 | 2>(1);
  const [currentSpeakingQ, setCurrentSpeakingQ] = useState(0);

  const [scores, setScores] = useState({ listening: 0, reading: 0, writing: 0, speaking: 0 });
  const [writingLoading, setWritingLoading] = useState(false);

  const mockSet = MOCK_TEST_SETS[mockSetIdx];
  const currentSection = SECTION_ORDER[sectionIdx];
  const sectionDuration = SECTION_DURATIONS[currentSection];

  const clearTimer = useCallback(() => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
  }, []);

  const startTimer = useCallback((duration: number) => {
    clearTimer();
    setTimeLeft(duration);
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) { clearTimer(); return 0; }
        return prev - 1;
      });
    }, 1000);
  }, [clearTimer]);

  useEffect(() => () => clearTimer(), [clearTimer]);

  const finishSectionRef = useRef<(() => void) | undefined>(undefined);

  useEffect(() => {
    if (phase === "section" && timeLeft === 0) {
      finishSectionRef.current?.();
    }
  }, [phase, timeLeft]);

  function startMockTest(idx: number) {
    setMockSetIdx(idx);
    setSectionIdx(0);
    setListeningTestIdx(Math.floor(Math.random() * listeningTests.length));
    setReadingTestIdx(Math.floor(Math.random() * readingTests.length));
    setListeningAnswers({});
    setReadingAnswers({});
    setTask1Text("");
    setTask2Text("");
    setSpeakingResponses({});
    setSpeakingBand(6.0);
    setCurrentPart(0);
    setCurrentPassage(0);
    setActiveWritingTask(1);
    setCurrentSpeakingQ(0);
    setScores({ listening: 0, reading: 0, writing: 0, speaking: 0 });
    setPhase("section");
    startTimer(SECTION_DURATIONS.listening);
  }

  function gradeListening(): number {
    const test = listeningTests[listeningTestIdx];
    let correct = 0;
    for (const part of test.parts) {
      for (const sec of part.questionSections) {
        for (const q of sec.questions) {
          const userAns = (listeningAnswers[q.num] || "").trim().toLowerCase();
          if (!userAns) continue;
          if (sec.type === "multiSelect") {
            const correctSet = q.answer.split(",").map((a) => a.trim().toUpperCase());
            const userSet = userAns.split(",").map((a) => a.trim().toUpperCase());
            correct += userSet.filter((a) => correctSet.includes(a)).length;
          } else {
            const isCorrect = userAns === q.answer.toLowerCase() ||
              (q.alternateAnswers || []).some((a) => userAns === a.toLowerCase());
            if (isCorrect) correct++;
          }
        }
      }
    }
    return calculateListeningBand(correct).band;
  }

  function gradeReading(): number {
    const test = readingTests[readingTestIdx];
    let correct = 0;
    for (const passage of test.passages) {
      for (const sec of passage.questionSections) {
        for (const q of sec.questions) {
          const userAns = (readingAnswers[q.num] || "").trim().toLowerCase();
          if (!userAns) continue;
          if (sec.type === "multiSelect") {
            const correctSet = q.answer.split(",").map((a) => a.trim().toUpperCase());
            const userSet = userAns.split(",").map((a) => a.trim().toUpperCase());
            correct += userSet.filter((a) => correctSet.includes(a)).length;
          } else {
            const isCorrect = userAns === q.answer.toLowerCase() ||
              (q.alternateAnswers || []).some((a) => userAns === a.toLowerCase());
            if (isCorrect) correct++;
          }
        }
      }
    }
    return calculateReadingBand(correct).band;
  }

  async function gradeWriting(): Promise<number> {
    setWritingLoading(true);
    try {
      const scores: number[] = [];
      for (const [text, taskType] of [[task1Text, "Task 1"], [task2Text, "Task 2"]] as const) {
        if (text.trim().split(/\s+/).length < 30) {
          scores.push(4.0);
          continue;
        }
        try {
          const res = await fetch(`${API}/api/essay-check`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ essay: text, taskType }),
          });
          if (res.ok) {
            const data = await res.json();
            const s = data.scores || data;
            const avg = [
              s.taskResponse?.band, s.coherenceCohesion?.band,
              s.lexicalResource?.band, s.grammaticalRange?.band,
            ].filter((b): b is number => typeof b === "number");
            if (avg.length > 0) {
              scores.push(avg.reduce((a, b) => a + b, 0) / avg.length);
            } else {
              scores.push(5.0);
            }
          } else {
            scores.push(5.0);
          }
        } catch {
          scores.push(5.0);
        }
      }
      const task1Weight = 1 / 3;
      const task2Weight = 2 / 3;
      const band = scores[0] * task1Weight + scores[1] * task2Weight;
      return Math.round(band * 2) / 2;
    } finally {
      setWritingLoading(false);
    }
  }

  const finishSection = useCallback(async () => {
    clearTimer();
    const section = SECTION_ORDER[sectionIdx];

    if (section === "listening") {
      setScores((prev) => ({ ...prev, listening: gradeListening() }));
    } else if (section === "reading") {
      setScores((prev) => ({ ...prev, reading: gradeReading() }));
    } else if (section === "writing") {
      const writingBand = await gradeWriting();
      setScores((prev) => ({ ...prev, writing: writingBand }));
    } else if (section === "speaking") {
      setScores((prev) => ({ ...prev, speaking: speakingBand }));
    }

    if (sectionIdx < SECTION_ORDER.length - 1) {
      setPhase("break");
    } else {
      setPhase("results");
    }
  }, [sectionIdx, speakingBand, clearTimer]);

  useEffect(() => {
    finishSectionRef.current = finishSection;
  }, [finishSection]);

  function nextSection() {
    const nextIdx = sectionIdx + 1;
    setSectionIdx(nextIdx);
    setCurrentPart(0);
    setCurrentPassage(0);
    setActiveWritingTask(1);
    setCurrentSpeakingQ(0);
    setPhase("section");
    startTimer(SECTION_DURATIONS[SECTION_ORDER[nextIdx]]);
  }

  if (phase === "select") {
    return (
      <Layout>
        <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-300">
          <div className="bg-card border border-border rounded-3xl p-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
              <Trophy className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl font-extrabold text-foreground">Full Mock IELTS Test</h1>
            <p className="text-muted-foreground">Complete all 4 skills with official timing</p>
            <p className="text-sm text-muted-foreground" dir="rtl" lang="ar">اختبار IELTS تجريبي كامل — ٤ مهارات بالتوقيت الرسمي</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            {SECTION_ORDER.map((sec) => {
              const info = SECTION_INFO[sec];
              return (
                <div key={sec} className="bg-card border border-border rounded-2xl p-4 flex items-start gap-3">
                  <span className="text-2xl">{info.icon}</span>
                  <div>
                    <div className="font-bold text-foreground">{info.label}</div>
                    <div className="text-xs text-primary font-bold">{info.duration}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{info.description}</div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-2xl px-4 py-3 text-sm text-amber-700 dark:text-amber-400">
            <p className="font-bold">⏱️ Total test time: approximately 2 hours 45 minutes</p>
            <p className="text-xs mt-1">Listening (30 min) → Reading (60 min) → Writing (60 min) → Speaking (14 min)</p>
          </div>

          <div className="space-y-3">
            <h2 className="text-lg font-bold text-foreground">Choose a Mock Test</h2>
            {MOCK_TEST_SETS.map((set, i) => (
              <button key={set.id} onClick={() => startMockTest(i)}
                className="w-full bg-card border border-border rounded-2xl p-4 text-left hover:border-primary/40 hover:shadow-md transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-bold text-foreground group-hover:text-primary transition-colors">{set.label}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">4 skills • 160 questions • ~2h 45min</div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </Layout>
    );
  }

  if (phase === "break") {
    const nextSec = SECTION_ORDER[sectionIdx + 1];
    const info = SECTION_INFO[nextSec];
    const prevInfo = SECTION_INFO[SECTION_ORDER[sectionIdx]];
    return (
      <Layout>
        <div className="max-w-lg mx-auto text-center space-y-6 py-12 animate-in fade-in duration-300">
          <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <h2 className="text-2xl font-extrabold text-foreground">{prevInfo.label} Complete!</h2>
          <p className="text-muted-foreground">Take a short break before continuing.</p>

          <div className="bg-card border border-border rounded-2xl p-5 space-y-2">
            <span className="text-3xl">{info.icon}</span>
            <h3 className="text-xl font-bold text-foreground">Next: {info.label}</h3>
            <p className="text-sm text-primary font-bold">{info.duration}</p>
            <p className="text-xs text-muted-foreground">{info.description}</p>
          </div>

          <div className="flex gap-2 justify-center">
            {SECTION_ORDER.map((s, i) => (
              <div key={s} className={cn("w-3 h-3 rounded-full",
                i <= sectionIdx ? "bg-green-500" : i === sectionIdx + 1 ? "bg-primary" : "bg-muted"
              )} />
            ))}
          </div>

          <button onClick={nextSection}
            className="bg-primary text-primary-foreground font-bold px-8 py-3 rounded-xl hover:opacity-90 transition-opacity flex items-center gap-2 mx-auto"
          >
            Start {info.label} <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </Layout>
    );
  }

  if (phase === "results") {
    return (
      <Layout>
        <ResultsPage scores={scores} onRestart={() => setPhase("select")} />
      </Layout>
    );
  }

  const sectionInfo = SECTION_INFO[currentSection];

  return (
    <Layout>
      <div className="space-y-4 animate-in fade-in duration-200">
        <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-lg border-b border-border -mx-4 px-4 py-3">
          <div className="flex items-center justify-between max-w-5xl mx-auto">
            <div className="flex items-center gap-3">
              <span className="text-xl">{sectionInfo.icon}</span>
              <div>
                <h2 className="font-bold text-foreground text-sm">{sectionInfo.label}</h2>
                <div className="flex gap-1 mt-0.5">
                  {SECTION_ORDER.map((s, i) => (
                    <div key={s} className={cn("w-8 h-1 rounded-full",
                      i < sectionIdx ? "bg-green-500" : i === sectionIdx ? "bg-primary" : "bg-muted"
                    )} />
                  ))}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <SectionTimer timeLeft={timeLeft} total={sectionDuration} />
              <button onClick={finishSection} disabled={writingLoading}
                className="bg-primary text-primary-foreground font-bold text-sm px-4 py-2 rounded-xl hover:opacity-90 transition-opacity flex items-center gap-1.5 disabled:opacity-50"
              >
                {writingLoading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                {sectionIdx === SECTION_ORDER.length - 1 ? "Finish Test" : "Submit & Continue"}
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto">
          {currentSection === "listening" && (
            <ListeningSection
              test={listeningTests[listeningTestIdx]} answers={listeningAnswers}
              setAnswer={(n, v) => setListeningAnswers((p) => ({ ...p, [n]: v }))}
              currentPart={currentPart} setCurrentPart={setCurrentPart}
            />
          )}
          {currentSection === "reading" && (
            <ReadingSection
              test={readingTests[readingTestIdx]} answers={readingAnswers}
              setAnswer={(n, v) => setReadingAnswers((p) => ({ ...p, [n]: v }))}
              currentPassage={currentPassage} setCurrentPassage={setCurrentPassage}
            />
          )}
          {currentSection === "writing" && (
            <WritingSection
              mockSet={mockSet} task1Text={task1Text} setTask1Text={setTask1Text}
              task2Text={task2Text} setTask2Text={setTask2Text}
              activeTask={activeWritingTask} setActiveTask={setActiveWritingTask}
            />
          )}
          {currentSection === "speaking" && (
            <div className="space-y-6">
              <SpeakingSection
                mockSet={mockSet} speakingResponses={speakingResponses}
                setSpeakingResponse={(i, v) => setSpeakingResponses((p) => ({ ...p, [i]: v }))}
                currentQ={currentSpeakingQ} setCurrentQ={setCurrentSpeakingQ}
              />
              <div className="max-w-2xl mx-auto bg-card border border-border rounded-2xl p-4 space-y-3">
                <h4 className="font-bold text-foreground text-sm">Self-Assessment: Estimated Speaking Band</h4>
                <p className="text-xs text-muted-foreground">Rate your speaking performance honestly. For AI-graded speaking practice, use Churchill AI.</p>
                <div className="flex items-center gap-3">
                  <input type="range" min={3} max={9} step={0.5} value={speakingBand}
                    onChange={(e) => setSpeakingBand(Number(e.target.value))}
                    className="flex-1 accent-primary"
                  />
                  <span className="font-bold text-primary text-lg w-10 text-center">{speakingBand.toFixed(1)}</span>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>3.0 — Limited</span>
                  <span>6.0 — Competent</span>
                  <span>9.0 — Expert</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
