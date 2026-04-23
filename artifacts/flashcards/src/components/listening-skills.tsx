import { useState, useEffect, useMemo, useRef } from "react";
import {
  ArrowLeft, ChevronRight, CheckCircle2, XCircle, Trophy, RotateCcw,
  Lightbulb, Sparkles, Play, Pause, Square, Volume2, Headphones, Mic2
} from "lucide-react";
import {
  LISTENING_SECTIONS,
  LISTENING_SKILL_TESTS,
  scoreListeningItem,
  getTestsBySection,
  type LSection,
  type LSkillTest,
  type LItem,
  type AudioLine,
} from "@/data/listening-skills";
import { useAwardXp } from "@workspace/api-client-react";
import { markTaskDone } from "@/lib/daily-plan";

const STORAGE_KEY = "lexo:listening-skills:v1";

type Phase = "section-list" | "test-list" | "test" | "result";

type Progress = Record<string, { correct: number; total: number; ts: number }>;

function loadProgress(): Progress {
  if (typeof window === "undefined") return {};
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}"); } catch { return {}; }
}
function saveProgress(p: Progress) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(p)); } catch { /* noop */ }
}

interface Props {
  onBack: () => void;
}

export default function ListeningSkills({ onBack }: Props) {
  const [phase, setPhase] = useState<Phase>("section-list");
  const [section, setSection] = useState<LSection | null>(null);
  const [test, setTest] = useState<LSkillTest | null>(null);
  const [doneTick, setDoneTick] = useState(0);
  const [lastResult, setLastResult] = useState<{ correct: number; total: number; perItem: boolean[] } | null>(null);
  const store = useMemo(() => loadProgress(), [doneTick]);
  const { mutate: awardXp } = useAwardXp();

  const sectionStats = (sec: LSection) => {
    const tests = getTestsBySection(sec);
    let done = 0;
    tests.forEach(t => { if (store[t.id]) done++; });
    return { done, total: tests.length };
  };

  const openSection = (sec: LSection) => { setSection(sec); setPhase("test-list"); };
  const openTest    = (t: LSkillTest)  => { setTest(t); setPhase("test"); };
  const backToList  = ()               => { setTest(null); setPhase("test-list"); };
  const backToSecs  = ()               => { setSection(null); setTest(null); setPhase("section-list"); };

  const finishTest = (correct: number, total: number, perItem: boolean[]) => {
    if (!test) return;
    const xp = Math.min(20, correct * 3);
    if (xp > 0) awardXp({ activity: "listening_skill", amount: xp });
    markTaskDone("listening");
    const next = { ...store, [test.id]: { correct, total, ts: Date.now() } };
    saveProgress(next);
    setLastResult({ correct, total, perItem });
    setDoneTick(t => t + 1);
    setPhase("result");
  };

  // Section list
  if (phase === "section-list") {
    return (
      <div className="max-w-5xl mx-auto space-y-6">
        <button onClick={onBack} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="w-4 h-4" /> Back to Listening Practice
        </button>
        <div className="bg-card border border-border rounded-3xl p-8 text-center space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mx-auto">
            <Headphones className="w-8 h-8 text-purple-600 dark:text-purple-400" />
          </div>
          <h1 className="text-3xl font-black">Section Practice</h1>
          <p className="text-muted-foreground">Targeted practice for each of the 4 IELTS Listening sections.</p>
          <p className="text-sm text-muted-foreground" dir="rtl" lang="ar">تدرب على كل قسم من أقسام الاستماع الأربعة على حدة</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {LISTENING_SECTIONS.map(s => {
            const stats = sectionStats(s.section);
            return (
              <button
                key={s.section}
                onClick={() => openSection(s.section)}
                className="bg-card border border-border rounded-2xl p-6 text-left hover:border-purple-400 hover:shadow-lg hover:shadow-purple-500/10 transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${s.gradient} flex items-center justify-center text-3xl flex-shrink-0`}>
                    {s.emoji}
                  </div>
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-bold text-foreground group-hover:text-purple-600 transition-colors">{s.title}</h3>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${stats.done > 0 ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-muted text-muted-foreground"}`}>
                        {stats.done}/{stats.total}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground" dir="rtl" lang="ar">{s.arabic}</p>
                    <p className="text-sm text-muted-foreground">{s.description}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // Test list
  if (phase === "test-list" && section !== null) {
    const sec = LISTENING_SECTIONS.find(s => s.section === section)!;
    const tests = getTestsBySection(section);
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <button onClick={backToSecs} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="w-4 h-4" /> All Sections
        </button>
        <div className="bg-card border border-border rounded-3xl p-6">
          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${sec.gradient} flex items-center justify-center text-3xl`}>
              {sec.emoji}
            </div>
            <div>
              <h2 className="text-2xl font-black">{sec.title}</h2>
              <p className="text-sm text-muted-foreground">{sec.description}</p>
            </div>
          </div>
        </div>
        <div className="grid gap-3">
          {tests.length === 0 && (
            <div className="bg-card border border-border rounded-2xl p-8 text-center text-sm text-muted-foreground">
              More tests for this section are coming soon.
            </div>
          )}
          {tests.map((t, idx) => {
            const prog = store[t.id];
            return (
              <button
                key={t.id}
                onClick={() => openTest(t)}
                className="bg-card border border-border rounded-2xl p-5 text-left hover:border-purple-400 hover:shadow-md transition-all group"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-muted-foreground">Test {idx + 1}</span>
                      <span className="text-xs text-muted-foreground">·</span>
                      <span className="text-xs uppercase tracking-wide text-purple-600 dark:text-purple-400 font-semibold">{labelFor(t.qType)}</span>
                    </div>
                    <h4 className="font-bold mt-1 group-hover:text-purple-600 transition-colors">{t.title}</h4>
                    <p className="text-sm text-muted-foreground mt-0.5">{t.context}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {prog ? (
                      <span className={`text-xs font-bold px-2 py-1 rounded-full ${prog.correct === prog.total ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"}`}>
                        ✓ {prog.correct}/{prog.total}
                      </span>
                    ) : (
                      <span className="text-xs font-semibold px-2 py-1 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400">New</span>
                    )}
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // Test runner
  if (phase === "test" && test) {
    return <TestRunner key={test.id} test={test} onCancel={backToList} onFinish={finishTest} />;
  }

  // Result
  if (phase === "result" && test && lastResult) {
    return <ResultView test={test} result={lastResult} onRetry={() => openTest(test)} onMore={backToList} onSecs={backToSecs} />;
  }

  return null;
}

function labelFor(t: string): string {
  switch (t) {
    case "multiple_choice":     return "Multiple choice";
    case "matching":            return "Matching";
    case "map_labelling":       return "Map / plan labelling";
    case "form_completion":     return "Form completion";
    case "sentence_completion": return "Sentence completion";
    case "short_answer":        return "Short answer";
    default: return t;
  }
}

// ─────────────────────── TEST RUNNER ───────────────────────

function TestRunner({ test, onCancel, onFinish }:{ test: LSkillTest; onCancel: () => void; onFinish: (c: number, total: number, perItem: boolean[]) => void }) {
  const [userAnswers, setUserAnswers] = useState<(string | string[] | null)[]>(() =>
    test.items.map(it => Array.isArray(it.answer) ? [] : null)
  );
  const [played, setPlayed] = useState(false);

  const allAnswered = userAnswers.every((a, i) => {
    const it = test.items[i];
    if (Array.isArray(it.answer)) return Array.isArray(a) && a.length === it.answer.length;
    return typeof a === "string" && a.trim().length > 0;
  });

  const setItemAnswer = (i: number, v: string | string[]) => {
    setUserAnswers(prev => prev.map((p, idx) => idx === i ? v : p));
  };

  const submit = () => {
    const perItem = test.items.map((it, i) => scoreListeningItem(it, userAnswers[i]));
    const correct = perItem.filter(Boolean).length;
    onFinish(correct, test.items.length, perItem);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-5">
      <button onClick={onCancel} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="w-4 h-4" /> Back to test list
      </button>

      <div className="bg-gradient-to-br from-purple-500/10 via-card to-card border border-border rounded-3xl p-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wide">
          <Headphones className="w-3.5 h-3.5" /> Section {test.section} · {labelFor(test.qType)}
        </div>
        <h2 className="text-2xl font-black mt-2">{test.title}</h2>
        <p className="text-sm text-muted-foreground mt-1">{test.context}</p>
      </div>

      <AudioPlayer lines={test.audioLines} onFirstPlay={() => setPlayed(true)} />

      <div className="bg-card border border-border rounded-2xl p-6">
        <p className="text-sm font-semibold text-foreground">{test.instructions}</p>
        {test.wordLimit && (
          <p className="text-xs text-amber-700 dark:text-amber-400 font-semibold mt-2">⚠ {test.wordLimit}</p>
        )}
        {test.options && test.qType === "matching" && (
          <div className="mt-4 bg-muted/40 border border-border rounded-xl p-4 space-y-1.5">
            {test.options.map(o => (
              <p key={o.label} className="text-sm"><span className="font-bold text-purple-600 dark:text-purple-400">{o.label}</span> &nbsp; {o.text}</p>
            ))}
          </div>
        )}
        {test.options && test.qType === "map_labelling" && (
          <div className="mt-4 bg-muted/40 border border-border rounded-xl p-4 space-y-1.5">
            {test.options.map(o => (
              <p key={o.label} className="text-sm"><span className="font-bold text-purple-600 dark:text-purple-400">{o.label}</span> &nbsp; {o.text}</p>
            ))}
          </div>
        )}
        {test.visual && (
          <pre className="mt-4 bg-muted/40 border border-border rounded-xl p-4 text-xs overflow-x-auto whitespace-pre font-mono">
{test.visual}
          </pre>
        )}
        {!played && (
          <p className="mt-3 text-xs text-muted-foreground italic">▶ Press play above to hear the audio first.</p>
        )}
      </div>

      <div className="space-y-3">
        {test.items.map((it, i) => (
          <ItemEditor key={i} item={it} index={i} value={userAnswers[i]} onChange={(v) => setItemAnswer(i, v)} qType={test.qType} options={test.options} />
        ))}
      </div>

      <button
        disabled={!allAnswered}
        onClick={submit}
        className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-purple-500/30 transition-all"
      >
        {allAnswered ? "Submit answers" : `Answer all ${test.items.length} questions to submit`}
      </button>
    </div>
  );
}

function ItemEditor({ item, index, value, onChange, qType, options }:{
  item: LItem; index: number; value: string | string[] | null; onChange: (v: string | string[]) => void; qType: string;
  options?: { label: string; text: string }[];
}) {
  // Multiple choice with embedded options on the item itself
  if (item.options && item.options.length > 0) {
    return (
      <div className="bg-card border border-border rounded-2xl p-4 space-y-3">
        <p className="font-semibold text-sm">{index + 1}. {item.prompt}</p>
        <div className="space-y-2">
          {item.options.map(o => {
            const sel = value === o.label;
            return (
              <button
                key={o.label}
                onClick={() => onChange(o.label)}
                className={`w-full px-3 py-2.5 rounded-xl text-left text-sm transition-all border ${sel ? "bg-purple-600 text-white border-purple-600" : "bg-muted/40 hover:bg-muted text-foreground border-transparent"}`}
              >
                <span className="font-bold mr-2">{o.label}</span>{o.text}
              </button>
            );
          })}
        </div>
      </div>
    );
  }
  // Matching / Map labelling — pick from shared options at top level
  if ((qType === "matching" || qType === "map_labelling") && options) {
    return (
      <div className="bg-card border border-border rounded-2xl p-4 space-y-3">
        <p className="font-semibold text-sm">{index + 1}. {item.prompt}</p>
        <div className="flex gap-1.5 flex-wrap">
          {options.map(o => {
            const sel = value === o.label;
            return (
              <button
                key={o.label}
                onClick={() => onChange(o.label)}
                className={`min-w-[40px] px-3 py-2 rounded-lg font-bold text-sm transition-all ${sel ? "bg-purple-600 text-white" : "bg-muted/60 hover:bg-muted text-foreground"}`}
              >
                {o.label}
              </button>
            );
          })}
        </div>
      </div>
    );
  }
  // Text input (form/sentence/short-answer)
  return (
    <div className="bg-card border border-border rounded-2xl p-4 space-y-2">
      <label className="font-semibold text-sm block">{index + 1}. {item.prompt}</label>
      <input
        type="text"
        value={typeof value === "string" ? value : ""}
        onChange={e => onChange(e.target.value)}
        placeholder="Type your answer…"
        className="w-full px-3 py-2.5 rounded-xl bg-muted/40 border border-border focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
      />
    </div>
  );
}

// ─────────────────────── AUDIO PLAYER ───────────────────────

function AudioPlayer({ lines, onFirstPlay }:{ lines: AudioLine[]; onFirstPlay?: () => void }) {
  const [state, setState] = useState<"idle" | "playing" | "paused">("idle");
  const [currentLine, setCurrentLine] = useState(-1);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const playedOnce = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    const load = () => setVoices(window.speechSynthesis.getVoices());
    load();
    window.speechSynthesis.onvoiceschanged = load;
    return () => {
      window.speechSynthesis.cancel();
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  const femaleVoice = useMemo(() => {
    return voices.find(v => /female|samantha|victoria|karen|moira|tessa|fiona|zira/i.test(v.name) && /en/i.test(v.lang))
        || voices.find(v => /en-(GB|US|AU)/.test(v.lang) && /female|woman/i.test(v.name))
        || voices.find(v => /en-GB/i.test(v.lang))
        || voices.find(v => /en/i.test(v.lang))
        || voices[0];
  }, [voices]);

  const maleVoice = useMemo(() => {
    return voices.find(v => /male|daniel|alex|fred|tom|david|oliver|aaron/i.test(v.name) && /en/i.test(v.lang))
        || voices.find(v => /en-(GB|US|AU)/.test(v.lang) && v !== femaleVoice)
        || voices.find(v => /en/i.test(v.lang) && v !== femaleVoice)
        || femaleVoice;
  }, [voices, femaleVoice]);

  const stop = () => {
    if (typeof window === "undefined") return;
    window.speechSynthesis.cancel();
    setState("idle");
    setCurrentLine(-1);
  };

  const play = () => {
    if (typeof window === "undefined" || !window.speechSynthesis) {
      alert("Sorry, your browser does not support speech audio. Please try Chrome, Edge or Safari.");
      return;
    }
    window.speechSynthesis.cancel();
    if (!playedOnce.current) { playedOnce.current = true; onFirstPlay?.(); }
    setState("playing");

    let i = 0;
    const speakNext = () => {
      if (i >= lines.length) { setState("idle"); setCurrentLine(-1); return; }
      const line = lines[i];
      setCurrentLine(i);
      const u = new SpeechSynthesisUtterance(line.text);
      u.voice = line.voice === "f" ? femaleVoice : maleVoice;
      u.rate = 0.95;
      u.pitch = line.voice === "f" ? 1.05 : 0.95;
      u.onend = () => { i++; speakNext(); };
      u.onerror = () => { i++; speakNext(); };
      window.speechSynthesis.speak(u);
    };
    speakNext();
  };

  const pause = () => {
    if (typeof window === "undefined") return;
    window.speechSynthesis.pause();
    setState("paused");
  };
  const resume = () => {
    if (typeof window === "undefined") return;
    window.speechSynthesis.resume();
    setState("playing");
  };

  return (
    <div className="bg-gradient-to-br from-indigo-500/10 via-card to-card border border-border rounded-2xl p-5 space-y-3">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <Volume2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          <span className="font-bold text-foreground">Audio recording</span>
          {state === "playing" && (
            <span className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
              <span className="inline-block w-2 h-2 bg-emerald-500 rounded-full animate-pulse" /> Playing
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {state === "idle" && (
            <button onClick={play} className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-bold flex items-center gap-2 hover:bg-indigo-700 transition-colors">
              <Play className="w-4 h-4" /> Play
            </button>
          )}
          {state === "playing" && (
            <>
              <button onClick={pause} className="px-3 py-2 rounded-xl bg-amber-500 text-white text-sm font-bold flex items-center gap-2 hover:bg-amber-600 transition-colors">
                <Pause className="w-4 h-4" /> Pause
              </button>
              <button onClick={stop} className="px-3 py-2 rounded-xl bg-rose-500 text-white text-sm font-bold flex items-center gap-2 hover:bg-rose-600 transition-colors">
                <Square className="w-4 h-4" /> Stop
              </button>
            </>
          )}
          {state === "paused" && (
            <>
              <button onClick={resume} className="px-3 py-2 rounded-xl bg-emerald-600 text-white text-sm font-bold flex items-center gap-2 hover:bg-emerald-700 transition-colors">
                <Play className="w-4 h-4" /> Resume
              </button>
              <button onClick={stop} className="px-3 py-2 rounded-xl bg-rose-500 text-white text-sm font-bold flex items-center gap-2 hover:bg-rose-600 transition-colors">
                <Square className="w-4 h-4" /> Stop
              </button>
            </>
          )}
          {state !== "idle" && (
            <button onClick={() => { stop(); setTimeout(play, 200); }} className="px-3 py-2 rounded-xl bg-muted text-foreground text-sm font-bold flex items-center gap-2 hover:bg-muted/70 transition-colors">
              <RotateCcw className="w-4 h-4" /> Replay
            </button>
          )}
        </div>
      </div>
      {state !== "idle" && currentLine >= 0 && (
        <div className="bg-muted/40 rounded-xl p-3 border border-border text-sm">
          <span className="text-xs font-bold text-purple-600 dark:text-purple-400 mr-2">{lines[currentLine].speaker}:</span>
          <span className="text-muted-foreground">{lines[currentLine].text}</span>
        </div>
      )}
      <p className="text-xs text-muted-foreground italic">
        🎧 Audio is generated by your browser's text-to-speech. Use headphones for the best experience. In a real IELTS exam you only hear the audio once — but here you may replay it for practice.
      </p>
    </div>
  );
}

// ─────────────────────── RESULT VIEW ───────────────────────

function ResultView({ test, result, onRetry, onMore, onSecs }:{
  test: LSkillTest; result: { correct: number; total: number; perItem: boolean[] }; onRetry: () => void; onMore: () => void; onSecs: () => void;
}) {
  const correct = result.correct;
  const total   = result.total;
  const pct = Math.round((correct / total) * 100);
  const xp = Math.min(20, correct * 3);
  const tone =
    correct === total ? { bg: "from-emerald-500 to-teal-500", label: "Perfect!" } :
    pct >= 60        ? { bg: "from-amber-500 to-orange-500", label: "Good work" } :
                       { bg: "from-rose-500 to-pink-500", label: "Keep practising" };

  return (
    <div className="max-w-4xl mx-auto space-y-5">
      <div className={`rounded-3xl p-8 text-white text-center bg-gradient-to-br ${tone.bg}`}>
        <Trophy className="w-12 h-12 mx-auto mb-2" />
        <p className="text-sm uppercase tracking-wide opacity-90">{tone.label}</p>
        <p className="text-6xl font-black mt-2">{correct}<span className="text-3xl opacity-75"> / {total}</span></p>
        <p className="text-lg opacity-90 mt-1">{pct}% &nbsp;·&nbsp; +{xp} XP</p>
      </div>

      <div className="bg-card border border-border rounded-2xl p-5">
        <h3 className="font-bold mb-4 flex items-center gap-2"><Sparkles className="w-4 h-4 text-purple-500" /> Question-by-question</h3>
        <div className="space-y-2">
          {test.items.map((it, i) => {
            const isCorrect = result.perItem[i];
            return (
              <div key={i} className={`rounded-xl p-3 border ${isCorrect ? "bg-emerald-50 dark:bg-emerald-900/10 border-emerald-200 dark:border-emerald-800" : "bg-rose-50 dark:bg-rose-900/10 border-rose-200 dark:border-rose-800"}`}>
                <div className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-0.5">
                    {isCorrect
                      ? <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      : <XCircle className="w-4 h-4 text-rose-600" />}
                  </div>
                  <div className="flex-1 min-w-0 text-sm">
                    <p className="font-semibold">{i + 1}. {it.prompt}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Correct answer: <span className="font-bold text-emerald-700 dark:text-emerald-400">
                        {Array.isArray(it.answer) ? it.answer.join(", ") : it.answer}
                      </span>
                      {it.acceptable && it.acceptable.length > 0 && (
                        <span className="text-muted-foreground"> (also accepted: {it.acceptable.join(", ")})</span>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800 rounded-2xl p-5">
        <div className="flex items-start gap-3">
          <Lightbulb className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-amber-900 dark:text-amber-100 whitespace-pre-line leading-relaxed">
            <p className="font-bold mb-1">Detailed analysis</p>
            {test.analysis}
          </div>
        </div>
      </div>

      <details className="bg-card border border-border rounded-2xl p-5 group">
        <summary className="font-bold cursor-pointer flex items-center gap-2 text-foreground">
          <Mic2 className="w-4 h-4 text-purple-500" /> Show audio transcript
        </summary>
        <div className="mt-4 space-y-2 text-sm">
          {test.audioLines.map((l, i) => (
            <div key={i} className="bg-muted/40 rounded-lg p-2.5">
              <span className="text-xs font-bold text-purple-600 dark:text-purple-400 mr-2">{l.speaker}:</span>
              <span className="text-foreground">{l.text}</span>
            </div>
          ))}
        </div>
      </details>

      <div className="grid grid-cols-3 gap-3">
        <button onClick={onRetry} className="px-4 py-3 rounded-2xl bg-card border border-border font-semibold text-sm flex items-center justify-center gap-2 hover:bg-muted transition-colors">
          <RotateCcw className="w-4 h-4" /> Try again
        </button>
        <button onClick={onMore} className="px-4 py-3 rounded-2xl bg-card border border-border font-semibold text-sm hover:bg-muted transition-colors">
          More tests
        </button>
        <button onClick={onSecs} className="px-4 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-sm hover:shadow-lg transition-all">
          All sections
        </button>
      </div>
    </div>
  );
}
