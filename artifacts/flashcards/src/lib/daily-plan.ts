export type CefrLevel = "A1" | "A2" | "B1" | "B2" | "C1";
export type LevelGroup = "beginner" | "intermediate" | "advanced";

export interface PlanTask {
  id: string;
  label: string;
  arabicLabel: string;
  emoji: string;
  href: string;
  hash?: string;
  estimatedMinutes: number;
  color: string;
}

export const TASKS: Record<string, PlanTask> = {
  wordOfDay:        { id: "wordOfDay",        label: "Word of the Day",      arabicLabel: "كلمة اليوم",        emoji: "✨", href: "/",                  hash: "#word-of-day", estimatedMinutes: 3,  color: "from-purple-500 to-fuchsia-500" },
  studyMode:        { id: "studyMode",        label: "Study Mode",           arabicLabel: "وضع الدراسة",       emoji: "📖", href: "/study",                                   estimatedMinutes: 15, color: "from-teal-500 to-emerald-500" },
  quizMode:         { id: "quizMode",         label: "Quiz Mode",            arabicLabel: "اختبار سريع",        emoji: "🎯", href: "/quiz",                                    estimatedMinutes: 10, color: "from-sky-500 to-cyan-500" },
  weakWords:        { id: "weakWords",        label: "Weak Words",           arabicLabel: "الكلمات الصعبة",     emoji: "🔥", href: "/weak-words",                              estimatedMinutes: 8,  color: "from-rose-500 to-orange-500" },
  paragraph:        { id: "paragraph",        label: "Paragraph (Orwell)",   arabicLabel: "فقرة كتابية",        emoji: "✍️", href: "/essay-checker",                           estimatedMinutes: 15, color: "from-violet-500 to-purple-500" },
  synonyms:         { id: "synonyms",         label: "Synonyms",             arabicLabel: "المرادفات",          emoji: "🔁", href: "/synonyms",                                estimatedMinutes: 8,  color: "from-teal-500 to-sky-500" },
  antonyms:         { id: "antonyms",         label: "Antonyms",             arabicLabel: "الأضداد",            emoji: "↔️", href: "/antonyms",                                estimatedMinutes: 8,  color: "from-orange-500 to-amber-500" },
  phrasalVerbs:     { id: "phrasalVerbs",     label: "Phrasal Verbs",        arabicLabel: "الأفعال المركبة",   emoji: "🧩", href: "/phrasal-verbs",                           estimatedMinutes: 8,  color: "from-indigo-500 to-blue-500" },
  grammar:          { id: "grammar",          label: "Grammar",              arabicLabel: "القواعد",            emoji: "📚", href: "/grammar",                                 estimatedMinutes: 12, color: "from-indigo-500 to-violet-500" },
  orwellTask1:      { id: "orwellTask1",      label: "Orwell Task 1",        arabicLabel: "أورويل المهمة ١",   emoji: "📊", href: "/essay-checker",                           estimatedMinutes: 25, color: "from-violet-500 to-fuchsia-500" },
  orwellTask2:      { id: "orwellTask2",      label: "Orwell Task 2",        arabicLabel: "أورويل المهمة ٢",   emoji: "📝", href: "/essay-checker",                           estimatedMinutes: 40, color: "from-fuchsia-500 to-pink-500" },
  churchillP1:      { id: "churchillP1",      label: "Churchill Part 1",     arabicLabel: "تشرشل الجزء ١",     emoji: "🎙️", href: "/speaking",                                estimatedMinutes: 10, color: "from-rose-500 to-pink-500" },
  churchillP23:     { id: "churchillP23",     label: "Churchill Part 2 / 3", arabicLabel: "تشرشل الجزء ٢/٣",   emoji: "🎤", href: "/speaking",                                estimatedMinutes: 15, color: "from-pink-500 to-rose-500" },
  topicBank:        { id: "topicBank",        label: "Topic Bank",           arabicLabel: "بنك المواضيع",       emoji: "🏛️", href: "/speaking-topics",                         estimatedMinutes: 8,  color: "from-amber-500 to-orange-500" },
  listening:        { id: "listening",        label: "Listening Practice",   arabicLabel: "تمرين الاستماع",     emoji: "🎧", href: "/listening-test",                          estimatedMinutes: 30, color: "from-sky-500 to-blue-500" },
  reading:          { id: "reading",          label: "Reading Practice",     arabicLabel: "تمرين القراءة",      emoji: "📖", href: "/reading-test",                            estimatedMinutes: 30, color: "from-emerald-500 to-teal-500" },
  writingTemplates: { id: "writingTemplates", label: "Writing Templates",    arabicLabel: "قوالب الكتابة",      emoji: "📋", href: "/writing-templates",                       estimatedMinutes: 10, color: "from-amber-500 to-yellow-500" },
};

export const LEVEL_POOLS: Record<LevelGroup, PlanTask[]> = {
  beginner: [
    TASKS.wordOfDay,
    TASKS.studyMode,
    TASKS.quizMode,
    TASKS.weakWords,
    TASKS.paragraph,
    TASKS.synonyms,
    TASKS.antonyms,
  ],
  intermediate: [
    TASKS.wordOfDay,
    TASKS.quizMode,
    TASKS.weakWords,
    TASKS.phrasalVerbs,
    TASKS.grammar,
    TASKS.orwellTask1,
    TASKS.churchillP1,
    TASKS.topicBank,
  ],
  advanced: [
    TASKS.wordOfDay,
    TASKS.quizMode,
    TASKS.weakWords,
    TASKS.grammar,
    TASKS.orwellTask2,
    TASKS.churchillP23,
    TASKS.listening,
    TASKS.reading,
    TASKS.writingTemplates,
  ],
};

const TASKS_PER_DAY = 5;

export function levelGroup(level: CefrLevel | string | null | undefined): LevelGroup {
  const lvl = (level ?? "B1").toString().toUpperCase();
  if (lvl === "A1" || lvl === "A2") return "beginner";
  if (lvl === "B1") return "intermediate";
  return "advanced";
}

export function levelGroupLabel(group: LevelGroup): string {
  return group === "beginner" ? "Beginner (A1/A2)" : group === "intermediate" ? "Intermediate (B1)" : "Advanced (B2/C1)";
}

/** Generate today's plan: a rotating window of TASKS_PER_DAY items from the level pool, sliding by day-of-week. */
export function getDailyPlan(level: CefrLevel | string | null | undefined, date: Date = new Date()): PlanTask[] {
  const pool = LEVEL_POOLS[levelGroup(level)];
  const offset = date.getDay() % pool.length;
  const result: PlanTask[] = [];
  const count = Math.min(TASKS_PER_DAY, pool.length);
  for (let i = 0; i < count; i++) {
    result.push(pool[(offset + i) % pool.length]);
  }
  return result;
}

/** Full pool for the level — used for weekly progress bars (one bar per section). */
export function getWeeklySections(level: CefrLevel | string | null | undefined): PlanTask[] {
  return LEVEL_POOLS[levelGroup(level)];
}

export function daysUntilExam(examDate: string | null | undefined): number | null {
  if (!examDate || examDate === "not_set") return null;
  const exam = new Date(examDate);
  if (isNaN(exam.getTime())) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  exam.setHours(0, 0, 0, 0);
  return Math.max(0, Math.round((exam.getTime() - today.getTime()) / 86_400_000));
}

/** ── Per-day completion tracking via localStorage ── */
const STORAGE_KEY = "lexo:plan:v1";

interface PlanStore {
  /** Map of "YYYY-MM-DD" -> array of completed task ids on that day. */
  days: Record<string, string[]>;
}

function isoDate(d: Date = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function readStore(): PlanStore {
  if (typeof window === "undefined") return { days: {} };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { days: {} };
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || !parsed.days) return { days: {} };
    return parsed as PlanStore;
  } catch {
    return { days: {} };
  }
}

function writeStore(store: PlanStore) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch {}
}

/** Mark a task as completed for today. */
export function markTaskDone(taskId: string, date: Date = new Date()) {
  const store = readStore();
  const key = isoDate(date);
  const list = new Set(store.days[key] ?? []);
  list.add(taskId);
  store.days[key] = Array.from(list);
  writeStore(store);
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("lexo:plan-updated"));
  }
}

/** Unmark (toggle off) a task as completed for today. */
export function unmarkTaskDone(taskId: string, date: Date = new Date()) {
  const store = readStore();
  const key = isoDate(date);
  const list = (store.days[key] ?? []).filter((id) => id !== taskId);
  if (list.length === 0) delete store.days[key];
  else store.days[key] = list;
  writeStore(store);
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("lexo:plan-updated"));
  }
}

/** Set of task ids completed today. */
export function getTodayCompleted(date: Date = new Date()): Set<string> {
  const store = readStore();
  return new Set(store.days[isoDate(date)] ?? []);
}

/** Number of days in the past 7 days (incl. today) that the given task was completed. Returns 0..7. */
export function getWeeklyCompletionCount(taskId: string, date: Date = new Date()): number {
  const store = readStore();
  let n = 0;
  for (let i = 0; i < 7; i++) {
    const d = new Date(date);
    d.setDate(d.getDate() - i);
    if ((store.days[isoDate(d)] ?? []).includes(taskId)) n++;
  }
  return n;
}

/** How many times a given task was SCHEDULED in the past 7 days for the user's level. */
export function getWeeklyScheduledCount(
  taskId: string,
  level: CefrLevel | string | null | undefined,
  date: Date = new Date(),
): number {
  let n = 0;
  for (let i = 0; i < 7; i++) {
    const d = new Date(date);
    d.setDate(d.getDate() - i);
    if (getDailyPlan(level, d).some((t) => t.id === taskId)) n++;
  }
  return n;
}
