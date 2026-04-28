import { useState, useMemo } from "react";
import { useAwardXp } from "@workspace/api-client-react";
import {
  ChevronRight, ChevronLeft, BookOpen, CheckCircle2, XCircle,
  Trophy, Sparkles, Lightbulb, Clock,
} from "lucide-react";
import {
  QUESTION_TYPES,
  SKILL_EXERCISES,
  LEVELS,
  getExercisesForType,
  scoreExercise,
  type SkillQuestionType,
  type SkillExercise,
  type SkillLevel,
  type QTypeMeta,
} from "@/data/reading-skills";
import { markTaskDone } from "@/lib/daily-plan";

type Phase = "type-list" | "exercise-list" | "exercise" | "result";
type LevelFilter = SkillLevel | "ALL";

const STORAGE_KEY = "lexo:reading-skills:v1";
const LEVEL_FILTER_KEY = "lexo:reading-skills:level-filter:v1";

function readLevelFilter(): LevelFilter {
  if (typeof window === "undefined") return "ALL";
  try {
    const raw = localStorage.getItem(LEVEL_FILTER_KEY);
    if (raw === "A2" || raw === "B1" || raw === "B2" || raw === "ALL") return raw;
  } catch {}
  return "ALL";
}

function writeLevelFilter(v: LevelFilter) {
  if (typeof window === "undefined") return;
  try { localStorage.setItem(LEVEL_FILTER_KEY, v); } catch {}
}

const LEVEL_PILL_CLASS: Record<SkillLevel, string> = {
  A2: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  B1: "bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400",
  B2: "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400",
};

interface SkillsStore {
  /** Map of exerciseId → { correct, total, ts }. */
  done: Record<string, { correct: number; total: number; ts: number }>;
}

function readStore(): SkillsStore {
  if (typeof window === "undefined") return { done: {} };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { done: {} };
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" && parsed.done ? parsed : { done: {} };
  } catch {
    return { done: {} };
  }
}

function writeStore(s: SkillsStore) {
  if (typeof window === "undefined") return;
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(s)); } catch {}
}

export function ReadingSkills({ onBack }: { onBack: () => void }) {
  const [phase, setPhase] = useState<Phase>("type-list");
  const [selectedType, setSelectedType] = useState<SkillQuestionType | null>(null);
  const [selectedExercise, setSelectedExercise] = useState<SkillExercise | null>(null);
  const [userAnswers, setUserAnswers] = useState<(string | string[] | null)[]>([]);
  const [resultData, setResultData] = useState<{ correct: number; total: number; perItem: boolean[] } | null>(null);
  const [doneTick, setDoneTick] = useState(0);
  const [levelFilter, setLevelFilterState] = useState<LevelFilter>(() => readLevelFilter());
  const { mutate: awardXp } = useAwardXp();

  const store = useMemo(() => { void doneTick; return readStore(); }, [doneTick]);

  const setLevelFilter = (v: LevelFilter) => {
    setLevelFilterState(v);
    writeLevelFilter(v);
  };

  const pickType = (type: SkillQuestionType) => {
    setSelectedType(type);
    setPhase("exercise-list");
  };
  const pickExercise = (ex: SkillExercise) => {
    setSelectedExercise(ex);
    setUserAnswers(ex.items.map(() => (typeof ex.items[0]?.answer === "object" ? [] : null)));
    setResultData(null);
    setPhase("exercise");
  };
  const setItemAnswer = (idx: number, value: string | string[] | null) => {
    setUserAnswers((prev) => prev.map((v, i) => (i === idx ? value : v)));
  };
  const submit = () => {
    if (!selectedExercise) return;
    const result = scoreExercise(selectedExercise, userAnswers);
    setResultData(result);
    setPhase("result");
    // Persist
    const s = readStore();
    s.done[selectedExercise.id] = { correct: result.correct, total: result.total, ts: Date.now() };
    writeStore(s);
    setDoneTick((t) => t + 1);
    // XP: 1 XP per correct answer, capped reasonably
    if (result.correct > 0) {
      awardXp({ activity: "reading_skill", amount: Math.min(20, result.correct * 3) });
    }
    // Daily plan: mark Reading Practice as done today
    markTaskDone("reading");
  };
  const exitToTypes = () => {
    setPhase("type-list");
    setSelectedType(null);
    setSelectedExercise(null);
    setResultData(null);
  };
  const exitToList = () => {
    setPhase("exercise-list");
    setSelectedExercise(null);
    setResultData(null);
  };

  // ── Type-list ──
  if (phase === "type-list") {
    const activeLevelMeta = levelFilter !== "ALL" ? LEVELS.find((l) => l.id === levelFilter) : null;
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between gap-3">
          <button onClick={onBack} className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground">
            <ChevronLeft className="w-4 h-4" /> Back to Reading Practice
          </button>
        </div>
        <div className="bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 rounded-3xl p-6 sm:p-8 text-white shadow-xl">
          <div className="flex items-center gap-2 text-white/80 text-xs font-bold uppercase tracking-widest mb-2">
            <Sparkles className="w-4 h-4" /> Skills Practice
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold leading-tight">Reading by Question Type</h2>
          <p className="text-white/90 text-sm mt-2 max-w-2xl">
            Targeted exercises for each of the 16 IELTS Reading question types, now organised into 3 CEFR levels.
            Pick your level below, then choose a type to start practising.
          </p>
        </div>

        {/* Level filter */}
        <LevelTabs value={levelFilter} onChange={setLevelFilter} showAll />
        {activeLevelMeta && (
          <div className={`rounded-2xl p-4 text-white shadow-md bg-gradient-to-br ${activeLevelMeta.color}`}>
            <p className="text-xs font-bold uppercase tracking-widest text-white/80">{activeLevelMeta.label}</p>
            <p className="text-sm text-white/95 mt-1">{activeLevelMeta.shortDesc}</p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {QUESTION_TYPES.map((qt) => {
            const allExs = getExercisesForType(qt.id);
            const exs = levelFilter === "ALL" ? allExs : allExs.filter((e) => e.level === levelFilter);
            const completed = exs.filter((e) => store.done[e.id]).length;
            const counts: Record<SkillLevel, number> = {
              A2: allExs.filter((e) => e.level === "A2").length,
              B1: allExs.filter((e) => e.level === "B1").length,
              B2: allExs.filter((e) => e.level === "B2").length,
            };
            return (
              <button
                key={qt.id}
                onClick={() => pickType(qt.id)}
                className="group text-left bg-card border border-border rounded-2xl p-5 hover:border-primary/40 hover:shadow-lg transition-all"
              >
                <div className="flex items-start gap-3">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${qt.color} flex items-center justify-center shrink-0 text-2xl shadow-md`}>
                    <span aria-hidden>{qt.emoji}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Type {qt.number}</p>
                      <span className="text-[10px] font-bold tabular-nums px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                        {completed}/{exs.length}
                      </span>
                    </div>
                    <h3 className="font-extrabold text-foreground text-base leading-tight mt-0.5">{qt.label}</h3>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{qt.shortDesc}</p>
                    <div className="flex items-center justify-between gap-2 mt-2">
                      <p className="text-[11px] text-muted-foreground" dir="rtl" lang="ar">{qt.arabicLabel}</p>
                      <div className="flex gap-1 shrink-0">
                        {(["A2","B1","B2"] as const).map((lvl) => (
                          <span
                            key={lvl}
                            className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded ${LEVEL_PILL_CLASS[lvl]} ${counts[lvl] === 0 ? "opacity-30" : ""}`}
                            title={`${counts[lvl]} ${lvl} exercise${counts[lvl] === 1 ? "" : "s"}`}
                          >
                            {lvl} · {counts[lvl]}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0" />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // ── Exercise-list for one type ──
  if (phase === "exercise-list" && selectedType) {
    const meta = QUESTION_TYPES.find((q) => q.id === selectedType)!;
    const allExs = getExercisesForType(selectedType);
    const exs = levelFilter === "ALL" ? allExs : allExs.filter((e) => e.level === levelFilter);
    const counts: Record<SkillLevel, number> = {
      A2: allExs.filter((e) => e.level === "A2").length,
      B1: allExs.filter((e) => e.level === "B1").length,
      B2: allExs.filter((e) => e.level === "B2").length,
    };
    return (
      <div className="space-y-6">
        <button onClick={exitToTypes} className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground">
          <ChevronLeft className="w-4 h-4" /> Back to question types
        </button>
        <div className={`rounded-3xl p-6 sm:p-7 text-white shadow-xl bg-gradient-to-br ${meta.color}`}>
          <p className="text-xs font-bold uppercase tracking-widest text-white/80">Type {meta.number}</p>
          <h2 className="text-2xl sm:text-3xl font-extrabold mt-1 leading-tight">{meta.label}</h2>
          <p className="text-white/90 text-sm mt-2 max-w-2xl">{meta.shortDesc}</p>
        </div>

        {/* Level filter */}
        <LevelTabs value={levelFilter} onChange={setLevelFilter} showAll counts={counts} />

        {exs.length === 0 ? (
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-5 text-sm text-amber-700 dark:text-amber-300">
            No exercises at this level yet. Try a different level above, or check back later.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3">
            {exs.map((ex, i) => {
              const result = store.done[ex.id];
              return (
                <button
                  key={ex.id}
                  onClick={() => pickExercise(ex)}
                  className="group text-left bg-card border border-border rounded-2xl p-4 sm:p-5 hover:border-primary/40 hover:shadow-md transition-all flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center shrink-0 font-extrabold text-sm tabular-nums">
                    {i + 1}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded ${LEVEL_PILL_CLASS[ex.level]}`}>{ex.level}</span>
                      <h3 className="font-extrabold text-foreground text-sm sm:text-base truncate">{ex.title}</h3>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{ex.topic}</p>
                  </div>
                  {result ? (
                    <span className={`text-[11px] font-extrabold tabular-nums px-2.5 py-1 rounded-full shrink-0 ${
                      result.correct === result.total
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                        : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                    }`}>
                      ✓ {result.correct}/{result.total}
                    </span>
                  ) : (
                    <span className="text-[11px] font-bold text-muted-foreground bg-muted px-2.5 py-1 rounded-full shrink-0">New</span>
                  )}
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0" />
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  // ── Run an exercise ──
  if (phase === "exercise" && selectedExercise) {
    return (
      <ExerciseRunner
        exercise={selectedExercise}
        userAnswers={userAnswers}
        setItemAnswer={setItemAnswer}
        onSubmit={submit}
        onBack={exitToList}
      />
    );
  }

  // ── Result ──
  if (phase === "result" && selectedExercise && resultData) {
    return (
      <ResultView
        exercise={selectedExercise}
        userAnswers={userAnswers}
        result={resultData}
        onRetry={() => pickExercise(selectedExercise)}
        onBackToList={exitToList}
        onBackToTypes={exitToTypes}
      />
    );
  }

  return null;
}

// ─────────────────────────── Level Tabs ───────────────────────────

function LevelTabs({
  value, onChange, showAll, counts,
}: {
  value: LevelFilter;
  onChange: (v: LevelFilter) => void;
  showAll?: boolean;
  /** Optional per-level exercise counts to display next to each tab. */
  counts?: Record<SkillLevel, number>;
}) {
  const tabs: { id: LevelFilter; label: string }[] = [
    ...(showAll ? [{ id: "ALL" as LevelFilter, label: "All" }] : []),
    ...LEVELS.map((l) => ({ id: l.id as LevelFilter, label: l.label.split(" · ")[0] })),
  ];
  return (
    <div className="flex flex-wrap gap-2">
      {tabs.map((t) => {
        const active = value === t.id;
        const isLevel = t.id !== "ALL";
        const lvl = isLevel ? (t.id as SkillLevel) : null;
        const count = lvl && counts ? counts[lvl] : null;
        return (
          <button
            key={t.id}
            onClick={() => onChange(t.id)}
            className={`px-3 py-1.5 rounded-full text-xs font-extrabold border transition-colors flex items-center gap-1.5 ${
              active
                ? lvl
                  ? `${LEVEL_PILL_CLASS[lvl]} border-transparent ring-2 ring-offset-1 ring-offset-background ring-current`
                  : "bg-foreground text-background border-foreground"
                : "bg-background text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
            }`}
          >
            {t.label}
            {count !== null && count !== undefined && (
              <span className={`text-[10px] tabular-nums px-1.5 rounded-full ${active ? "bg-white/30" : "bg-muted"}`}>{count}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}

// ─────────────────────────── Runner ───────────────────────────

function ExerciseRunner({
  exercise, userAnswers, setItemAnswer, onSubmit, onBack,
}: {
  exercise: SkillExercise;
  userAnswers: (string | string[] | null)[];
  setItemAnswer: (i: number, v: string | string[] | null) => void;
  onSubmit: () => void;
  onBack: () => void;
}) {
  const meta = QUESTION_TYPES.find((q) => q.id === exercise.type)!;
  const allAnswered = userAnswers.every((v) =>
    v !== null && v !== undefined && (typeof v === "string" ? v.trim().length > 0 : v.length > 0)
  );

  return (
    <div className="space-y-5">
      <button onClick={onBack} className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground">
        <ChevronLeft className="w-4 h-4" /> Back to exercises
      </button>

      <div className="bg-card border border-border rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-1">
          <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full text-white bg-gradient-to-br ${meta.color}`}>
            {meta.emoji} {meta.label}
          </span>
          <span className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded ${LEVEL_PILL_CLASS[exercise.level]}`}>{exercise.level}</span>
          <span className="text-[10px] font-semibold text-muted-foreground">{exercise.topic}</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-foreground">{exercise.title}</h2>
      </div>

      {/* Passage */}
      <div className="bg-card border border-border rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <BookOpen className="w-4 h-4 text-primary" />
          <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Reading Passage</span>
        </div>
        <PassageText passage={exercise.passage} />
      </div>

      {/* Question */}
      <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
        <div>
          <p className="text-sm font-semibold text-foreground whitespace-pre-line">{exercise.instructions}</p>
        </div>

        {exercise.options && (exercise.type === "matching_headings" || exercise.type === "matching_information" || exercise.type === "matching_features" || exercise.type === "matching_sentence_endings" || exercise.type === "summary_completion" || exercise.type === "list_selection") && (
          <div className="bg-muted/40 rounded-xl p-3">
            <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-2">Options</p>
            <ul className="space-y-1">
              {exercise.options.map((o) => (
                <li key={o.label} className="text-sm">
                  <span className="font-extrabold text-primary mr-2">{o.label}.</span>
                  <span className="text-foreground">{o.text}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {exercise.visual && (
          <pre className="text-xs sm:text-sm font-mono whitespace-pre overflow-x-auto bg-muted/30 rounded-xl p-3 text-foreground border border-border">{exercise.visual}</pre>
        )}

        <ItemsRunner exercise={exercise} userAnswers={userAnswers} setItemAnswer={setItemAnswer} />
      </div>

      <div className="flex justify-end">
        <button
          onClick={onSubmit}
          disabled={!allAnswered}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-lg shadow-emerald-600/25"
        >
          <CheckCircle2 className="w-4 h-4" />
          Submit Answers
        </button>
      </div>
    </div>
  );
}

function PassageText({ passage }: { passage: string }) {
  const paragraphs = passage.split(/\n\n+/).filter((p) => p.trim().length > 0);
  return (
    <div className="space-y-3 text-sm sm:text-[15px] leading-relaxed text-foreground">
      {paragraphs.map((p, i) => {
        const m = p.match(/^\[([A-Z])\]\s*([\s\S]*)$/);
        if (m) {
          return (
            <p key={i}>
              <span className="inline-block font-extrabold text-primary mr-2">{m[1]}</span>
              {m[2]}
            </p>
          );
        }
        return <p key={i}>{p}</p>;
      })}
    </div>
  );
}

function ItemsRunner({
  exercise, userAnswers, setItemAnswer,
}: {
  exercise: SkillExercise;
  userAnswers: (string | string[] | null)[];
  setItemAnswer: (i: number, v: string | string[] | null) => void;
}) {
  const meta = QUESTION_TYPES.find((q) => q.id === exercise.type)!;

  // TFNG
  if (exercise.type === "true_false_not_given") {
    return (
      <div className="space-y-3">
        {exercise.items.map((item, i) => (
          <div key={i} className="space-y-2">
            <p className="text-sm text-foreground">{item.prompt}</p>
            <div className="flex gap-2 flex-wrap">
              {["TRUE", "FALSE", "NOT GIVEN"].map((opt) => {
                const selected = userAnswers[i] === opt;
                return (
                  <button
                    key={opt}
                    onClick={() => setItemAnswer(i, opt)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                      selected ? "bg-blue-600 text-white border-blue-600" : "bg-background border-border text-muted-foreground hover:border-blue-400"
                    }`}
                  >{opt}</button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    );
  }

  // List Selection (multi-select)
  if (exercise.type === "list_selection") {
    const expected = exercise.items[0].answer as string[];
    const need = expected.length;
    const selected = (userAnswers[0] as string[] | null) ?? [];
    return (
      <div className="space-y-2">
        <p className="text-xs text-muted-foreground">Select {need} answers.</p>
        <div className="flex flex-wrap gap-2">
          {exercise.options!.map((o) => {
            const isSel = selected.includes(o.label);
            return (
              <button
                key={o.label}
                onClick={() => {
                  let next: string[];
                  if (isSel) next = selected.filter((s) => s !== o.label);
                  else if (selected.length < need) next = [...selected, o.label].sort();
                  else next = [...selected.slice(1), o.label].sort();
                  setItemAnswer(0, next);
                }}
                className={`px-3 py-2 rounded-lg text-sm font-semibold border transition-colors ${
                  isSel ? "bg-blue-600 text-white border-blue-600" : "bg-background border-border text-muted-foreground hover:border-blue-400"
                }`}
              >
                <span className="font-bold mr-1">{o.label}.</span>{o.text}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // Single-select-one (MCQ, choose_title, skimming)
  if (exercise.type === "multiple_choice" || exercise.type === "choose_title" || exercise.type === "skimming") {
    const sel = userAnswers[0] as string | null;
    return (
      <div className="space-y-2">
        <p className="text-sm text-foreground">{exercise.items[0].prompt}</p>
        <div className="flex flex-col gap-2">
          {exercise.options!.map((o) => {
            const isSel = sel === o.label;
            return (
              <button
                key={o.label}
                onClick={() => setItemAnswer(0, o.label)}
                className={`text-left px-4 py-3 rounded-xl border transition-colors ${
                  isSel ? "bg-blue-600 text-white border-blue-600" : "bg-background border-border text-foreground hover:border-blue-400"
                }`}
              >
                <span className="font-extrabold mr-2">{o.label}.</span>{o.text}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // Per-item single-select (matching variants, summary_completion w/ word box)
  if (
    exercise.type === "matching_headings" ||
    exercise.type === "matching_information" ||
    exercise.type === "matching_features" ||
    exercise.type === "matching_sentence_endings" ||
    exercise.type === "summary_completion"
  ) {
    return (
      <div className="space-y-3">
        {exercise.items.map((item, i) => {
          const sel = userAnswers[i] as string | null;
          return (
            <div key={i} className="space-y-2">
              <p className="text-sm text-foreground">{item.prompt}</p>
              <div className="flex gap-2 flex-wrap">
                {exercise.options!.map((o) => {
                  const isSel = sel === o.label;
                  return (
                    <button
                      key={o.label}
                      onClick={() => setItemAnswer(i, o.label)}
                      className={`min-w-[2.25rem] h-8 px-2 rounded-lg text-xs font-bold border transition-colors ${
                        isSel ? "bg-blue-600 text-white border-blue-600" : "bg-background border-border text-muted-foreground hover:border-blue-400"
                      }`}
                    >{o.label}</button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  // Text inputs (short_answer, sentence_completion, table/flow/diagram)
  return (
    <div className="space-y-3">
      {exercise.items.map((item, i) => (
        <div key={i} className="space-y-1.5">
          <label className="text-sm text-foreground block">{item.prompt}</label>
          <input
            type="text"
            value={(userAnswers[i] as string) ?? ""}
            onChange={(e) => setItemAnswer(i, e.target.value)}
            placeholder="Type your answer…"
            className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm"
          />
        </div>
      ))}
      <p className="text-[11px] text-muted-foreground">{meta.shortDesc}</p>
    </div>
  );
}

// ─────────────────────────── Result ───────────────────────────

function ResultView({
  exercise, userAnswers, result, onRetry, onBackToList, onBackToTypes,
}: {
  exercise: SkillExercise;
  userAnswers: (string | string[] | null)[];
  result: { correct: number; total: number; perItem: boolean[] };
  onRetry: () => void;
  onBackToList: () => void;
  onBackToTypes: () => void;
}) {
  const meta = QUESTION_TYPES.find((q) => q.id === exercise.type)!;
  const pct = Math.round((result.correct / result.total) * 100);
  const perfect = result.correct === result.total;

  return (
    <div className="space-y-5">
      {/* Score banner */}
      <div className={`rounded-3xl p-6 sm:p-7 text-white shadow-xl ${
        perfect ? "bg-gradient-to-br from-emerald-500 to-teal-600" : pct >= 60 ? "bg-gradient-to-br from-amber-500 to-orange-500" : "bg-gradient-to-br from-rose-500 to-pink-600"
      }`}>
        <div className="flex items-center gap-3">
          <Trophy className="w-8 h-8" />
          <div>
            <p className="text-xs font-bold uppercase tracking-widest opacity-80">Result</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold leading-tight">
              {result.correct} / {result.total} correct · {pct}%
            </h2>
            <p className="text-sm text-white/90 mt-0.5">
              {perfect ? "Perfect — every answer matched the passage." : pct >= 60 ? "Solid work. Read the analysis to lock in the trickier ones." : "Keep going. The analysis below explains every answer."}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full text-white bg-gradient-to-br ${meta.color}`}>
            {meta.emoji} {meta.label}
          </span>
        </div>
        <h3 className="text-lg font-extrabold text-foreground mb-3">Your answers vs. correct answers</h3>
        <div className="space-y-2">
          {exercise.items.map((item, i) => {
            const ok = result.perItem[i];
            const ua = userAnswers[i];
            const userStr = ua === null || ua === undefined ? "—" : Array.isArray(ua) ? ua.join(", ") : ua;
            const corr = Array.isArray(item.answer) ? item.answer.join(", ") : item.answer;
            return (
              <div key={i} className={`rounded-xl border p-3 ${ok ? "border-emerald-200 bg-emerald-50/50 dark:border-emerald-800 dark:bg-emerald-900/15" : "border-rose-200 bg-rose-50/50 dark:border-rose-800 dark:bg-rose-900/15"}`}>
                <div className="flex items-start gap-2">
                  {ok ? <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" /> : <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />}
                  <div className="flex-1 min-w-0 text-sm">
                    <p className="font-semibold text-foreground">{item.prompt}</p>
                    <div className="mt-1 space-y-0.5">
                      <p className={ok ? "text-emerald-700 dark:text-emerald-400" : "text-rose-700 dark:text-rose-400"}>
                        <span className="font-bold">Your answer:</span> {userStr || "—"}
                      </p>
                      {!ok && (
                        <p className="text-emerald-700 dark:text-emerald-400">
                          <span className="font-bold">Correct:</span> {corr}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900/15 dark:to-yellow-900/15 border border-amber-200 dark:border-amber-800 rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-2">
          <Lightbulb className="w-5 h-5 text-amber-600" />
          <h3 className="text-base font-extrabold text-foreground">Detailed Analysis</h3>
        </div>
        <p className="text-sm text-foreground whitespace-pre-line leading-relaxed">{exercise.analysis}</p>
      </div>

      <div className="flex flex-wrap gap-3 justify-end pb-4">
        <button onClick={onBackToTypes} className="px-4 py-2.5 rounded-xl bg-muted text-foreground font-semibold hover:bg-muted/80 transition-colors text-sm">
          All Question Types
        </button>
        <button onClick={onBackToList} className="px-4 py-2.5 rounded-xl bg-muted text-foreground font-semibold hover:bg-muted/80 transition-colors text-sm">
          More from this type
        </button>
        <button onClick={onRetry} className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-colors text-sm">
          Try again
        </button>
      </div>
    </div>
  );
}
