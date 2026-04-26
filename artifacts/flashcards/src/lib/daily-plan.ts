import { PLAN_CONTENT_CATALOGS, type PlanContentItem } from "./plan-content";

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
  flipIt:           { id: "flipIt",           label: "Flip It",                    arabicLabel: "اقلب البطاقة",         emoji: "⚡", href: "/flip-it",                                         estimatedMinutes: 6,  color: "from-amber-500 to-orange-500" },
  spellIt:          { id: "spellIt",          label: "Spell It",                   arabicLabel: "اِكتب التهجئة",       emoji: "🔤", href: "/spell-it",                                        estimatedMinutes: 6,  color: "from-emerald-500 to-teal-500" },
  // Short story + comprehension quiz + written-response analysis
  storyExercises:   { id: "storyExercises",   label: "Story + Exercises",          arabicLabel: "قصة وتمارين",          emoji: "📚", href: "/stories",                                         estimatedMinutes: 18, color: "from-rose-500 to-fuchsia-500" },
  // Full mock tests (one rotated mock per appearance — heavier, less frequent)
  readingMock:      { id: "readingMock",      label: "Reading Mock Test",          arabicLabel: "اختبار قراءة كامل",   emoji: "📝", href: "/reading-test",                                    estimatedMinutes: 60, color: "from-emerald-500 to-lime-500" },
  listeningMock:    { id: "listeningMock",    label: "Listening Mock Test",        arabicLabel: "اختبار استماع كامل",  emoji: "🎬", href: "/listening-test",                                  estimatedMinutes: 40, color: "from-amber-500 to-orange-500" },
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
    TASKS.storyExercises,
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
    TASKS.storyExercises,
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
    TASKS.readingMock,
    TASKS.listeningMock,
    TASKS.storyExercises,
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
    TASKS.readingMock,
    TASKS.listeningMock,
    TASKS.storyExercises,
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
    TASKS.readingMock,
    TASKS.listeningMock,
    TASKS.storyExercises,
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

/** ── Per-day content scheduling ─────────────────────────────────────────── */

export interface ScheduledTask extends PlanTask {
  /** Specific catalog item assigned to this task on this plan day, if the task has finite content. */
  scheduled?: PlanContentItem;
}

/**
 * Compute the full day-by-day schedule for a plan, with each task assigned to
 * a specific catalog item by occurrence-rotation. Iterates the plan once
 * (O(duration · TASKS_PER_DAY)) so the schedule is consistent across the UI.
 */
export function getPlanSchedule(
  level: CefrLevel | string | null | undefined,
  startISO: string,
  duration: number,
): ScheduledTask[][] {
  const start = parsePlanISO(startISO);
  const counts: Record<string, number> = {};
  const result: ScheduledTask[][] = [];
  for (let i = 1; i <= duration; i++) {
    const d = addDays(start, i - 1);
    const tasks = getDailyPlan(level, d);
    const dayTasks: ScheduledTask[] = tasks.map((t) => {
      const occurrenceIdx = counts[t.id] ?? 0;
      counts[t.id] = occurrenceIdx + 1;
      const catalog = PLAN_CONTENT_CATALOGS[t.id];
      if (!catalog || catalog.length === 0) return t;
      return { ...t, scheduled: catalog[occurrenceIdx % catalog.length] };
    });
    result.push(dayTasks);
  }
  return result;
}

/** Tasks for a single plan-day, with each task already mapped to its scheduled catalog item. */
export function getScheduledDayTasks(
  level: CefrLevel | string | null | undefined,
  startISO: string,
  dayIndex: number,
): ScheduledTask[] {
  if (dayIndex < 1) return [];
  const schedule = getPlanSchedule(level, startISO, dayIndex);
  return schedule[dayIndex - 1] ?? [];
}

export interface TaskCoverage {
  /** Number of times the task is scheduled in the plan (counts repeats). */
  scheduledCount: number;
  /** Number of distinct catalog items the student will encounter. */
  uniqueCovered: number;
  /** Total catalog size for this task. */
  catalogSize: number;
}

/**
 * Aggregate coverage per task across the entire plan. Used by the "What you'll
 * cover" panel and the duration-picker scope hints.
 */
export function getPlanCoverage(
  level: CefrLevel | string | null | undefined,
  startISO: string,
  duration: number,
): Record<string, TaskCoverage> {
  const schedule = getPlanSchedule(level, startISO, duration);
  const counts = new Map<string, number>();
  const seen = new Map<string, Set<string>>();
  for (const day of schedule) {
    for (const t of day) {
      counts.set(t.id, (counts.get(t.id) ?? 0) + 1);
      if (t.scheduled) {
        const set = seen.get(t.id) ?? new Set<string>();
        set.add(t.scheduled.id);
        seen.set(t.id, set);
      }
    }
  }
  const out: Record<string, TaskCoverage> = {};
  const allIds = new Set<string>([...counts.keys(), ...Object.keys(PLAN_CONTENT_CATALOGS)]);
  for (const id of allIds) {
    const catalog = PLAN_CONTENT_CATALOGS[id];
    out[id] = {
      scheduledCount: counts.get(id) ?? 0,
      uniqueCovered: seen.get(id)?.size ?? 0,
      catalogSize: catalog?.length ?? 0,
    };
  }
  return out;
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

/** ── Plan duration ──────────────────────────────────────────────────────── */

export type PlanDuration = 30 | 60 | 90 | 120;

export interface PlanDurationOption {
  days: PlanDuration;
  recommended?: boolean;
  warning?: string;
  tagline: string;
  taglineAr: string;
}

export const PLAN_DURATION_OPTIONS: PlanDurationOption[] = [
  {
    days: 30,
    warning: "Intensive plan — requires strong daily commitment and discipline",
    tagline: "Sprint pace · 60–90 min/day",
    taglineAr: "وتيرة سريعة · ٦٠–٩٠ دقيقة يومياً",
  },
  {
    days: 60,
    tagline: "Focused pace · 45–60 min/day",
    taglineAr: "وتيرة مركّزة · ٤٥–٦٠ دقيقة يومياً",
  },
  {
    days: 90,
    recommended: true,
    tagline: "Balanced pace · 30–45 min/day — best for most students",
    taglineAr: "وتيرة متوازنة · ٣٠–٤٥ دقيقة يومياً — الأنسب لمعظم الطلاب",
  },
  {
    days: 120,
    tagline: "Steady pace · 20–35 min/day",
    taglineAr: "وتيرة هادئة · ٢٠–٣٥ دقيقة يومياً",
  },
];

export function normalizePlanDuration(value: string | number | null | undefined): PlanDuration {
  const n = Number(value);
  if (n === 30 || n === 60 || n === 90 || n === 120) return n;
  return 90;
}

/** Strict ISO check `YYYY-MM-DD`. Anything else returns today's ISO. */
export function ensurePlanStartDate(value: string | null | undefined, fallback: Date = new Date()): string {
  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
  return isoDate(fallback);
}

export function todayISO(): string {
  return isoDate(new Date());
}

export function parsePlanISO(s: string): Date {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, (m || 1) - 1, d || 1);
}

export function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + days);
  return d;
}

/** Number of whole calendar days between two dates, computed via UTC to avoid DST drift. */
function calendarDaysBetween(from: Date, to: Date): number {
  const a = Date.UTC(from.getFullYear(), from.getMonth(), from.getDate());
  const b = Date.UTC(to.getFullYear(), to.getMonth(), to.getDate());
  return Math.round((b - a) / 86_400_000);
}

/** 1-based day index inside the plan (Day 1 = start date). May be <1 if you peek before start, or > duration if you peek after end. */
export function getPlanDayIndex(startISO: string, date: Date = new Date()): number {
  const start = parsePlanISO(startISO);
  return calendarDaysBetween(start, date) + 1;
}

/** Set of completed task ids on a given calendar date. */
export function getCompletedForDate(date: Date): Set<string> {
  const store = readStore();
  return new Set(store.days[isoDate(date)] ?? []);
}

/** Wipe all completion data — used when the student resets the plan. */
export function clearAllCompletions() {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new CustomEvent("lexo:plan-updated"));
  } catch {}
}

export type DayState = "completed" | "today" | "upcoming" | "missed" | "partial";

export interface DayStatus {
  date: Date;
  iso: string;
  dayIndex: number;
  weekIndex: number;
  weekdayName: string;
  tasks: ScheduledTask[];
  doneCount: number;
  total: number;
  state: DayState;
}

const FULL_WEEKDAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export function getDayStatus(
  level: CefrLevel | string | null | undefined,
  startISO: string,
  date: Date,
  todayDate: Date = new Date(),
): DayStatus {
  const dayIndex = getPlanDayIndex(startISO, date);
  const tasks: ScheduledTask[] =
    dayIndex >= 1
      ? getScheduledDayTasks(level, startISO, dayIndex)
      : getDailyPlan(level, date);
  const done = getCompletedForDate(date);
  const doneCount = tasks.filter((t) => done.has(t.id)).length;
  const total = tasks.length;
  const dIso = isoDate(date);
  const todayIso = isoDate(todayDate);

  let state: DayState;
  if (dIso === todayIso) state = "today";
  else if (dIso > todayIso) state = "upcoming";
  else if (total > 0 && doneCount === total) state = "completed";
  else if (doneCount > 0) state = "partial";
  else state = "missed";

  return {
    date,
    iso: dIso,
    dayIndex,
    weekIndex: Math.max(1, Math.ceil(dayIndex / 7)),
    weekdayName: FULL_WEEKDAY_NAMES[date.getDay()],
    tasks,
    doneCount,
    total,
    state,
  };
}

export interface PlanCompletionStats {
  percent: number;
  doneDays: number;
  partialDays: number;
  missedDays: number;
  upcomingDays: number;
  totalDays: number;
  todayIndex: number;
  endDate: Date;
}

export function getPlanCompletionStats(
  level: CefrLevel | string | null | undefined,
  startISO: string,
  duration: PlanDuration,
  todayDate: Date = new Date(),
): PlanCompletionStats {
  const start = parsePlanISO(startISO);
  const todayIso = isoDate(todayDate);
  let done = 0;
  let partial = 0;
  let missed = 0;
  let upcoming = 0;
  for (let i = 0; i < duration; i++) {
    const d = addDays(start, i);
    const status = getDayStatus(level, startISO, d, todayDate);
    // Bucket today by its actual completion (visual state stays "today";
    // accounting state is derived from doneCount/total).
    const accountingState: DayState =
      status.state !== "today"
        ? status.state
        : status.total > 0 && status.doneCount === status.total
          ? "completed"
          : status.doneCount > 0
            ? "partial"
            : status.iso === todayIso
              ? "upcoming"   // today, nothing started yet — not "missed"
              : "missed";
    if (accountingState === "completed") done++;
    else if (accountingState === "partial") partial++;
    else if (accountingState === "missed") missed++;
    else if (accountingState === "upcoming") upcoming++;
  }
  const percent = duration > 0 ? Math.round((done / duration) * 100) : 0;
  return {
    percent,
    doneDays: done,
    partialDays: partial,
    missedDays: missed,
    upcomingDays: upcoming,
    totalDays: duration,
    todayIndex: Math.min(duration, Math.max(1, getPlanDayIndex(startISO, todayDate))),
    endDate: addDays(start, duration - 1),
  };
}

/** Friendly week label ("Foundation", "Skill building", "Revision + Mock IELTS"). */
export function weekTitle(weekIndex: number, totalWeeks: number): string {
  if (weekIndex === 1) return "Foundation";
  if (weekIndex >= totalWeeks - 1) return "Revision + Mock IELTS";
  return "Skill building";
}

/** Human-friendly date "Mon, Apr 28". */
export function shortDate(date: Date): string {
  return date.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });
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
