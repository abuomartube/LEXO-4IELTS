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
  initialSection?: LSection | null;
}

export default function ListeningSkills({ onBack, initialSection = null }: Props) {
  const [phase, setPhase] = useState<Phase>(initialSection ? "test-list" : "section-list");
  const [section, setSection] = useState<LSection | null>(initialSection ?? null);
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

      <AudioPlayer testId={test.id} lines={test.audioLines} onFirstPlay={() => setPlayed(true)} />

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

function AudioPlayer({ testId, lines, onFirstPlay }:{ testId: string; lines: AudioLine[]; onFirstPlay?: () => void }) {
  const [state, setState] = useState<"idle" | "loading" | "playing" | "paused">("idle");
  const [loadProgress, setLoadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [showScript, setShowScript] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  // Single combined blob URL containing ALL lines stitched into one MP3 stream.
  // Browsers decode joined MP3 frames natively, so this lets us avoid the
  // fragile per-clip chaining (audio.src swap on `ended`) that previously
  // triggered cascading error events on multi-line tests.
  const combinedUrlRef = useRef<string | null>(null);
  // Generation token — incremented every time the test changes. Only the
  // latest generation may assign `combinedUrlRef`, preventing stale preloads
  // from overwriting a fresh build.
  const genRef = useRef(0);
  // Shared in-flight build promise so preload + play don't trigger duplicate
  // network/decode work and don't race to assign different URLs.
  const buildPromiseRef = useRef<Promise<string | null> | null>(null);
  const stoppedRef = useRef(false);

  // Replace the current combined URL, revoking any previous one to avoid leaks.
  const setCombinedUrl = (url: string | null) => {
    const prev = combinedUrlRef.current;
    if (prev && prev !== url) URL.revokeObjectURL(prev);
    combinedUrlRef.current = url;
  };

  const fetchBlob = async (line: AudioLine, idx: number): Promise<Blob> => {
    // 1) Try the pre-generated static MP3 first (instant, no API cost)
    const staticUrl = `${import.meta.env.BASE_URL}audio/listening/${testId}-${idx}.mp3`;
    try {
      const staticRes = await fetch(staticUrl);
      if (staticRes.ok) {
        const ct = staticRes.headers.get("content-type") || "";
        if (ct.includes("audio") || ct.includes("octet-stream")) {
          const blob = await staticRes.blob();
          if (blob.size > 1000) return blob;
        }
      }
    } catch { /* fall through to API */ }

    // 2) Fallback: live TTS via the API
    const voice = line.voice === "f" ? "nova" : "alloy";
    const res = await fetch("/api/speaking/tts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: line.text, voice, model: "tts-1", speed: 0.92 }),
    });
    if (!res.ok) {
      let msg = `TTS request failed (${res.status})`;
      try {
        const err = await res.json();
        if (err?.error === "quota_exceeded") msg = "OpenAI quota exceeded. Please try again later.";
        else if (err?.error) msg = err.error;
      } catch { /* noop */ }
      throw new Error(msg);
    }
    return await res.blob();
  };

  const buildCombinedBlob = async (
    onProgress?: (pct: number) => void,
  ): Promise<Blob> => {
    const blobs: Blob[] = new Array(lines.length);
    let done = 0;
    await Promise.all(
      lines.map(async (l, i) => {
        blobs[i] = await fetchBlob(l, i);
        done++;
        onProgress?.(Math.round((done / lines.length) * 100));
      }),
    );
    // Concatenate all MP3 byte streams into a single blob. MP3 decoders
    // sync to frame headers, so naive concatenation plays back as one
    // continuous audio stream in all modern browsers.
    return new Blob(blobs, { type: "audio/mpeg" });
  };

  // Build (or return the in-flight build for) the combined blob URL.
  // Single producer: preload and play share the same promise so they cannot
  // race and stomp on each other's URLs. The result is only assigned if the
  // generation token still matches (i.e. the user hasn't switched tests).
  const ensureCombinedUrl = (showLoading: boolean): Promise<string | null> => {
    if (combinedUrlRef.current) return Promise.resolve(combinedUrlRef.current);
    if (buildPromiseRef.current) return buildPromiseRef.current;

    const myGen = genRef.current;
    if (showLoading) {
      setState("loading");
      setError(null);
      setLoadProgress(0);
    }

    const run = async (): Promise<string | null> => {
      try {
        const combined = await buildCombinedBlob(pct => {
          if (genRef.current === myGen && showLoading) setLoadProgress(pct);
        });
        if (genRef.current !== myGen) return null;
        const url = URL.createObjectURL(combined);
        setCombinedUrl(url);
        return url;
      } catch (e) {
        if (genRef.current !== myGen) return null;
        const msg = e instanceof Error ? e.message : "Could not load audio.";
        setError(msg);
        setState("idle");
        return null;
      }
    };

    const p = run();
    buildPromiseRef.current = p;
    p.finally(() => {
      if (buildPromiseRef.current === p) buildPromiseRef.current = null;
    });
    return p;
  };

  // Preload + combine on test change. We DON'T touch the <audio> element
  // here — only when the user explicitly interacts with playback.
  useEffect(() => {
    genRef.current += 1;
    setCombinedUrl(null);
    buildPromiseRef.current = null;
    setState("idle");
    setError(null);
    setLoadProgress(0);
    stoppedRef.current = false;

    // Kick off background preload via the shared producer (silent — no
    // loading UI; the user only sees that when they explicitly hit Play
    // before preload has finished).
    void ensureCombinedUrl(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [testId]);

  // Cleanup on unmount only
  useEffect(() => {
    return () => {
      stoppedRef.current = true;
      genRef.current += 1;
      buildPromiseRef.current = null;
      const audio = audioRef.current;
      if (audio) audio.pause();
      setCombinedUrl(null);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const play = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    onFirstPlay?.();
    stoppedRef.current = false;

    // If preload is still in flight, surface a loading indicator while we
    // wait for the shared build promise to resolve.
    if (!combinedUrlRef.current && state !== "loading") setState("loading");
    const url = await ensureCombinedUrl(true);
    if (!url || stoppedRef.current || !audioRef.current) return;

    if (audio.src !== url) {
      audio.src = url;
      try { audio.currentTime = 0; } catch { /* noop */ }
    }
    setState("playing");
    audio.play().then(() => setState("playing")).catch(() => {
      // Surfaced via the audio element's `error` event handler.
    });
  };

  const pause = () => {
    audioRef.current?.pause();
    setState("paused");
  };
  const resume = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.play().then(() => setState("playing")).catch(() => { /* noop */ });
  };
  const stop = () => {
    stoppedRef.current = true;
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      try { audio.currentTime = 0; } catch { /* noop */ }
    }
    setState("idle");
  };
  const replay = () => {
    stoppedRef.current = false;
    const audio = audioRef.current;
    if (audio && combinedUrlRef.current) {
      try { audio.currentTime = 0; } catch { /* noop */ }
      setState("playing");
      audio.play().then(() => setState("playing")).catch(() => { /* noop */ });
    } else {
      void play();
    }
  };

  const handleEnded = () => {
    if (stoppedRef.current) return;
    setState("idle");
  };
  const handleError = () => {
    if (stoppedRef.current) return;
    const audio = audioRef.current;
    if (!audio || !audio.currentSrc) return;
    setError("Audio failed to load. Please try replaying or refreshing the page.");
    setState("idle");
  };

  // Stable now-playing indicator (reserved height to avoid layout jitter).
  const nowPlayingText =
    state === "playing" ? `Playing · ${lines.length} ${lines.length === 1 ? "clip" : "clips"} stitched together` :
    state === "paused"  ? "Paused" :
    "\u00A0";

  return (
    <div className="bg-gradient-to-br from-indigo-500/10 via-card to-card border border-border rounded-2xl p-5 space-y-3">
      <audio ref={audioRef} onEnded={handleEnded} onError={handleError} preload="auto" />
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <Volume2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          <span className="font-bold text-foreground">Audio recording</span>
          {state === "playing" && (
            <span className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
              <span className="inline-block w-2 h-2 bg-emerald-500 rounded-full animate-pulse" /> Playing
            </span>
          )}
          {state === "loading" && (
            <span className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold">
              Loading audio… {loadProgress}%
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {state === "idle" && (
            <button onClick={play} className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-bold flex items-center gap-2 hover:bg-indigo-700 transition-colors">
              <Play className="w-4 h-4" /> Play
            </button>
          )}
          {state === "loading" && (
            <button disabled className="px-4 py-2 rounded-xl bg-indigo-600/50 text-white text-sm font-bold flex items-center gap-2 cursor-wait">
              <span className="inline-block w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" /> Loading
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
          {(state === "playing" || state === "paused") && (
            <button onClick={replay} className="px-3 py-2 rounded-xl bg-muted text-foreground text-sm font-bold flex items-center gap-2 hover:bg-muted/70 transition-colors">
              <RotateCcw className="w-4 h-4" /> Replay
            </button>
          )}
        </div>
      </div>

      {/* Loading bar — fixed height container so it never collapses the layout. */}
      <div className="h-2">
        {state === "loading" && (
          <div className="w-full bg-muted/40 rounded-full h-2 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300" style={{ width: `${loadProgress}%` }} />
          </div>
        )}
      </div>

      {error && (
        <div className="bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800 rounded-xl p-3 text-sm text-rose-700 dark:text-rose-300">
          ⚠ {error}
        </div>
      )}

      {/* Stable now-playing indicator — single line, reserved height (no jitter). */}
      <div className="bg-muted/30 rounded-lg px-3 py-2 text-xs text-muted-foreground font-medium h-8 flex items-center">
        {nowPlayingText}
      </div>

      <div className="flex items-center justify-between gap-2">
        <p className="text-xs text-muted-foreground italic flex-1">
          🎧 AI voices (alloy &amp; nova). Use headphones for best results. You may replay the audio for practice.
        </p>
        <button
          onClick={() => setShowScript(s => !s)}
          className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline whitespace-nowrap"
        >
          {showScript ? "Hide" : "Show"} script
        </button>
      </div>

      {/* Static script panel — only shown when toggled. NO auto-scroll, NO highlight, no animation = no flicker. */}
      {showScript && <StaticScript lines={lines} />}
    </div>
  );
}

// ─────────── STATIC SCRIPT (toggle-only, no animation) ───────────

function StaticScript({ lines }: { lines: AudioLine[] }) {
  const isMonologue = lines.length === 1;
  const blocks = isMonologue
    ? lines[0].text.split(/\n\s*\n/).filter(p => p.trim()).map((p, i) => ({
        speaker: i === 0 ? lines[0].speaker : "", text: p.trim(),
      }))
    : lines.map(l => ({ speaker: l.speaker, text: l.text }));

  return (
    <div className="bg-muted/30 rounded-xl border border-border p-3 space-y-2 text-sm">
      {blocks.map((b, i) => (
        <div key={i} className="rounded-lg p-2 bg-card/50">
          {b.speaker && (
            <span className="text-xs font-bold mr-2 text-purple-600 dark:text-purple-400">{b.speaker}:</span>
          )}
          <span className="text-foreground">{b.text}</span>
        </div>
      ))}
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
          {test.audioLines.length === 1
            ? // Monologue: split by paragraph breaks for readability
              test.audioLines[0].text.split(/\n\s*\n/).filter(p => p.trim()).map((para, i) => (
                <div key={i} className="bg-muted/40 rounded-lg p-2.5">
                  {i === 0 && (
                    <span className="text-xs font-bold text-purple-600 dark:text-purple-400 mr-2">
                      {test.audioLines[0].speaker}:
                    </span>
                  )}
                  <span className="text-foreground">{para.trim()}</span>
                </div>
              ))
            : // Dialogue: one bubble per speaker turn
              test.audioLines.map((l, i) => (
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
