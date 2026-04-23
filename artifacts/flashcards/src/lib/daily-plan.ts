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
  wordOfDay:        { id: "wordOfDay",        label: "Word of the Day",            arabicLabel: "كلمة اليوم",         emoji: "✨", href: "/",                          hash: "#word-of-day", estimatedMinutes: 3,  color: "from-purple-500 to-fuchsia-500" },
  studyMode:        { id: "studyMode",        label: "Study Mode",                 arabicLabel: "وضع الدراسة",        emoji: "📖", href: "/study",                                           estimatedMinutes: 15, color: "from-teal-500 to-emerald-500" },
  quizMode:         { id: "quizMode",         label: "Quiz Mode",                  arabicLabel: "اختبار سريع",         emoji: "🎯", href: "/quiz",                                            estimatedMinutes: 10, color: "from-sky-500 to-cyan-500" },
  weakWords:        { id: "weakWords",        label: "Weak Words",                 arabicLabel: "الكلمات الصعبة",      emoji: "🔥", href: "/weak-words",                                      estimatedMinutes: 8,  color: "from-rose-500 to-orange-500" },
  paragraph:        { id: "paragraph",        label: "Paragraph Writing (Orwell)", arabicLabel: "فقرة كتابية",         emoji: "✍️", href: "/essay-checker",                                   estimatedMinutes: 15, color: "from-violet-500 to-purple-500" },
  synonyms:         { id: "synonyms",         label: "Synonyms",                   arabicLabel: "المرادفات",           emoji: "🔁", href: "/synonyms",                                        estimatedMinutes: 8,  color: "from-teal-500 to-sky-500" },
  antonyms:         { id: "antonyms",         label: "Antonyms",                   arabicLabel: "الأضداد",             emoji: "↔️", href: "/antonyms",                                        estimatedMinutes: 8,  color: "from-orange-500 to-amber-500" },
  phrasalVerbs:     { id: "phrasalVerbs",     label: "Phrasal Verbs",              arabicLabel: "الأفعال المركبة",    emoji: "🧩", href: "/phrasal-verbs",                                   estimatedMinutes: 8,  color: "from-indigo-500 to-blue-500" },
  grammar:          { id: "grammar",          label: "Grammar",                    arabicLabel: "القواعد",             emoji: "📚", href: "/grammar",                                         estimatedMinutes: 12, color: "from-indigo-500 to-violet-500" },
  orwellTask1:      { id: "orwellTask1",      label: "Orwell — Task 1",            arabicLabel: "أورويل المهمة ١",    emoji: "📊", href: "/essay-checker",                                   estimatedMinutes: 25, color: "from-violet-500 to-fuchsia-500" },
  orwellTask2:      { id: "orwellTask2",      label: "Orwell — Task 2",            arabicLabel: "أورويل المهمة ٢",    emoji: "📝", href: "/essay-checker",                                   estimatedMinutes: 40, color: "from-fuchsia-500 to-pink-500" },
  churchillP1:      { id: "churchillP1",      label: "Churchill — Part 1",         arabicLabel: "تشرشل الجزء ١",      emoji: "🎙️", href: "/speaking",                                        estimatedMinutes: 10, color: "from-rose-500 to-pink-500" },
  churchillP2:      { id: "churchillP2",      label: "Churchill — Part 2",         arabicLabel: "تشرشل الجزء ٢",      emoji: "🎤", href: "/speaking",                                        estimatedMinutes: 12, color: "from-pink-500 to-rose-500" },
  churchillP3:      { id: "churchillP3",      label: "Churchill — Part 3",         arabicLabel: "تشرشل الجزء ٣",      emoji: "🎙️", href: "/speaking",                                        estimatedMinutes: 15, color: "from-pink-500 to-fuchsia-500" },
  topicBank:        { id: "topicBank",        label: "Topic Bank",                 arabicLabel: "بنك المواضيع",        emoji: "🏛️", href: "/speaking-topics",                                 estimatedMinutes: 8,  color: "from-amber-500 to-orange-500" },
  // Reading
  readingSkillsEasy:{ id: "readingSkillsEasy",label: "Reading Skills (Easy)",      arabicLabel: "مهارات القراءة (سهل)",emoji: "📖", href: "/reading-test",       hash: "#skills",     estimatedMinutes: 15, color: "from-emerald-500 to-lime-500" },
  readingSkills:    { id: "readingSkills",    label: "Reading Section Practice",   arabicLabel: "تمرين قسم القراءة",   emoji: "📖", href: "/reading-test",       hash: "#skills",     estimatedMinutes: 25, color: "from-emerald-500 to-teal-500" },
  // Listening per-section
  listeningS1:      { id: "listeningS1",      label: "Listening — Section 1",      arabicLabel: "الاستماع — القسم ١",  emoji: "🎧", href: "/listening-test",     hash: "#skills-1",   estimatedMinutes: 15, color: "from-sky-500 to-blue-500" },
  listeningS2:      { id: "listeningS2",      label: "Listening — Section 2",      arabicLabel: "الاستماع — القسم ٢",  emoji: "🎧", href: "/listening-test",     hash: "#skills-2",   estimatedMinutes: 20, color: "from-emerald-500 to-teal-500" },
  listeningS3:      { id: "listeningS3",      label: "Listening — Section 3",      arabicLabel: "الاستماع — القسم ٣",  emoji: "🎧", href: "/listening-test",     hash: "#skills-3",   estimatedMinutes: 25, color: "from-amber-500 to-orange-500" },
  listeningS4:      { id: "listeningS4",      label: "Listening — Section 4",      arabicLabel: "الاستماع — القسم ٤",  emoji: "🎧", href: "/listening-test",     hash: "#skills-4",   estimatedMinutes: 30, color: "from-rose-500 to-pink-500" },
  writingTemplates: { id: "writingTemplates", label: "Writing Templates",          arabicLabel: "قوالب الكتابة",       emoji: "📋", href: "/writing-templates",                               estimatedMinutes: 10, color: "from-amber-500 to-yellow-500" },
  sentenceBuilder:  { id: "sentenceBuilder",  label: "Sentence Builder",           arabicLabel: "بناء الجمل",          emoji: "🧠", href: "/sentence-builder",                                estimatedMinutes: 10, color: "from-cyan-500 to-blue-500" },
};

/**
 * Per-CEFR-level task pools — built from the user's onboarding level.
 * The daily plan rotates a window of TASKS_PER_DAY items through each pool, so
 * the student covers different sections each day without repeating themselves.
 */
export const LEVEL_POOLS_BY_LEVEL: Record<CefrLevel, PlanTask[]> = {
  A1: [
    TASKS.wordOfDay,
    TASKS.studyMode,
    TASKS.quizMode,
    TASKS.sentenceBuilder,
    TASKS.weakWords,
    TASKS.paragraph,
    TASKS.readingSkillsEasy,
  ],
  A2: [
    TASKS.wordOfDay,
    TASKS.quizMode,
    TASKS.sentenceBuilder,
    TASKS.weakWords,
    TASKS.grammar,
    TASKS.paragraph,
    TASKS.readingSkills,
    TASKS.listeningS1,
  ],
  B1: [
    TASKS.wordOfDay,
    TASKS.quizMode,
    TASKS.sentenceBuilder,
    TASKS.weakWords,
    TASKS.grammar,
    TASKS.orwellTask1,
    TASKS.churchillP1,
    TASKS.readingSkills,
    TASKS.listeningS1,
    TASKS.listeningS2,
  ],
  B2: [
    TASKS.wordOfDay,
    TASKS.quizMode,
    TASKS.sentenceBuilder,
    TASKS.weakWords,
    TASKS.orwellTask2,
    TASKS.churchillP2,
    TASKS.readingSkills,
    TASKS.listeningS2,
    TASKS.listeningS3,
    TASKS.writingTemplates,
  ],
  C1: [
    TASKS.wordOfDay,
    TASKS.quizMode,
    TASKS.sentenceBuilder,
    TASKS.weakWords,
    TASKS.orwellTask2,
    TASKS.churchillP3,
    TASKS.readingSkills,
    TASKS.listeningS3,
    TASKS.listeningS4,
    TASKS.writingTemplates,
  ],
};

const TASKS_PER_DAY = 5;

/** Normalize any incoming string to a valid CefrLevel. Defaults to B1. */
export function normalizeLevel(level: CefrLevel | string | null | undefined): CefrLevel {
  const lvl = (level ?? "B1").toString().toUpperCase();
  if (lvl === "A1" || lvl === "A2" || lvl === "B1" || lvl === "B2" || lvl === "C1") return lvl;
  return "B1";
}

export function levelGroup(level: CefrLevel | string | null | undefined): LevelGroup {
  const lvl = normalizeLevel(level);
  if (lvl === "A1" || lvl === "A2") return "beginner";
  if (lvl === "B1") return "intermediate";
  return "advanced";
}

export function levelGroupLabel(group: LevelGroup): string {
  return group === "beginner" ? "Beginner (A1/A2)" : group === "intermediate" ? "Intermediate (B1)" : "Advanced (B2/C1)";
}

/** Friendly per-CEFR label (e.g. "A1 — Beginner", "B2 — Upper Intermediate"). */
export function levelLabel(level: CefrLevel | string | null | undefined): string {
  const lvl = normalizeLevel(level);
  switch (lvl) {
    case "A1": return "A1 — Beginner";
    case "A2": return "A2 — Elementary";
    case "B1": return "B1 — Intermediate";
    case "B2": return "B2 — Upper Intermediate";
    case "C1": return "C1 — Advanced";
  }
}

/** Generate today's plan: a rotating window of TASKS_PER_DAY items from the level pool, sliding by day-of-year so each day is different. */
export function getDailyPlan(level: CefrLevel | string | null | undefined, date: Date = new Date()): PlanTask[] {
  const pool = LEVEL_POOLS_BY_LEVEL[normalizeLevel(level)];
  // Day-of-year offset so the rotation advances every calendar day, not just weekly.
  const start = new Date(date.getFullYear(), 0, 0);
  const dayOfYear = Math.floor((date.getTime() - start.getTime()) / 86_400_000);
  const offset = dayOfYear % pool.length;
  const result: PlanTask[] = [];
  const count = Math.min(TASKS_PER_DAY, pool.length);
  for (let i = 0; i < count; i++) {
    result.push(pool[(offset + i) % pool.length]);
  }
  return result;
}

/** Full pool for the level — used for weekly progress bars (one bar per section). */
export function getWeeklySections(level: CefrLevel | string | null | undefined): PlanTask[] {
  return LEVEL_POOLS_BY_LEVEL[normalizeLevel(level)];
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
