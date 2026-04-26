/**
 * Catalog manifest for plan-scheduled tasks. For every PlanTask whose work is
 * drawn from a finite content library, this file lists the items in display
 * order and provides a deep-link href the daily-plan tile can navigate to.
 *
 * The scheduler in `daily-plan.ts` rotates through these arrays based on how
 * many times a task has appeared in the plan up to a given day, so a student
 * who completes their plan covers the entire library in order.
 */

export interface PlanContentItem {
  id: string;
  /** Short, plan-tile-friendly title. */
  title: string;
  /** Deep-link a daily-plan tile should navigate to when clicked. */
  href: string;
}

const orwellTask1: PlanContentItem[] = [
  { id: "task1-1",  title: "Bar chart: Car ownership",        href: "/essay-checker?id=task1-1" },
  { id: "task1-2",  title: "Bar chart: Leisure activities",   href: "/essay-checker?id=task1-2" },
  { id: "task1-3",  title: "Bar chart: University subjects",  href: "/essay-checker?id=task1-3" },
  { id: "task1-4",  title: "Line graph: Internet users",      href: "/essay-checker?id=task1-4" },
  { id: "task1-5",  title: "Line graph: Average temperatures",href: "/essay-checker?id=task1-5" },
  { id: "task1-6",  title: "Line graph: Crime trends",        href: "/essay-checker?id=task1-6" },
  { id: "task1-7",  title: "Pie chart: Household energy",     href: "/essay-checker?id=task1-7" },
  { id: "task1-8",  title: "Pie chart: Student spending",     href: "/essay-checker?id=task1-8" },
  { id: "task1-9",  title: "Pie chart: Waste composition",    href: "/essay-checker?id=task1-9" },
  { id: "task1-10", title: "Process: The water cycle",        href: "/essay-checker?id=task1-10" },
  { id: "task1-11", title: "Process: Paper recycling",        href: "/essay-checker?id=task1-11" },
  { id: "task1-12", title: "Task 1 prompt 12",                href: "/essay-checker?id=task1-12" },
  { id: "task1-13", title: "Task 1 prompt 13",                href: "/essay-checker?id=task1-13" },
  { id: "task1-14", title: "Task 1 prompt 14",                href: "/essay-checker?id=task1-14" },
  { id: "task1-15", title: "Task 1 prompt 15",                href: "/essay-checker?id=task1-15" },
  { id: "task1-16", title: "Task 1 prompt 16",                href: "/essay-checker?id=task1-16" },
  { id: "task1-17", title: "Task 1 prompt 17",                href: "/essay-checker?id=task1-17" },
  { id: "task1-18", title: "Task 1 prompt 18",                href: "/essay-checker?id=task1-18" },
  { id: "task1-19", title: "Task 1 prompt 19",                href: "/essay-checker?id=task1-19" },
  { id: "task1-20", title: "Task 1 prompt 20",                href: "/essay-checker?id=task1-20" },
];

const orwellTask2: PlanContentItem[] = Array.from({ length: 25 }, (_, i) => ({
  id: `task2-${i + 1}`,
  title: `Task 2 essay ${i + 1}`,
  href: `/essay-checker?id=task2-${i + 1}`,
}));

const orwellParagraph: PlanContentItem[] = Array.from({ length: 15 }, (_, i) => ({
  id: `para-${i + 1}`,
  title: `Paragraph prompt ${i + 1}`,
  href: `/essay-checker?id=para-${i + 1}`,
}));

const SPEAKING_THEME_LABELS: Record<string, string> = {
  hometown: "Hometown & Living",
  education: "Education",
  technology: "Technology",
  health: "Health & Fitness",
  travel: "Travel",
  work: "Work & Career",
  environment: "Environment",
  food: "Food & Cooking",
  family: "Family & Friends",
  media: "Media & News",
  culture: "Culture & Tradition",
  leisure: "Leisure & Hobbies",
};

const SPEAKING_THEME_ORDER = [
  "hometown", "education", "technology", "health", "travel", "work",
  "environment", "food", "family", "media", "culture", "leisure",
];

const speakingThemes: PlanContentItem[] = SPEAKING_THEME_ORDER.map((id) => ({
  id,
  title: SPEAKING_THEME_LABELS[id] ?? id,
  href: `/speaking-topics?topic=${id}`,
}));

const speakingPart1: PlanContentItem[] = SPEAKING_THEME_ORDER.map((id) => ({
  id,
  title: `Part 1 — ${SPEAKING_THEME_LABELS[id] ?? id}`,
  href: `/speaking-topics?topic=${id}&part=1`,
}));

const speakingPart2: PlanContentItem[] = SPEAKING_THEME_ORDER.map((id) => ({
  id,
  title: `Part 2 cue — ${SPEAKING_THEME_LABELS[id] ?? id}`,
  href: `/speaking-topics?topic=${id}&part=2`,
}));

const speakingPart3: PlanContentItem[] = SPEAKING_THEME_ORDER.map((id) => ({
  id,
  title: `Part 3 — ${SPEAKING_THEME_LABELS[id] ?? id}`,
  href: `/speaking-topics?topic=${id}&part=3`,
}));

const readingMockTests: PlanContentItem[] = [
  { id: "test1", title: "Mock Test 1: Urban farming, Forests, Space junk", href: "/reading-test?test=test1" },
  { id: "test2", title: "Mock Test 2: Kākāpō, Elms, Stress",                href: "/reading-test?test=test2" },
  { id: "test3", title: "Mock Test 3: Manatees, Procrastination, Robots",   href: "/reading-test?test=test3" },
  { id: "test4", title: "Mock Test 4: Vertical Forests, Sleep, Happiness",  href: "/reading-test?test=test4" },
  { id: "test5", title: "Mock Test 5: Soil, AI in Healthcare, Timekeeping", href: "/reading-test?test=test5" },
];

const listeningMockTests: PlanContentItem[] = [
  { id: "listening-1", title: "Mock 1: Restaurants, Pottery, Loneliness, Rivers",   href: "/listening-test?test=listening-1" },
  { id: "listening-2", title: "Mock 2: Carers, Volunteering, Geography, Food",      href: "/listening-test?test=listening-2" },
  { id: "listening-3", title: "Mock 3: Library, Wildlife, Marine Bio, Transport",   href: "/listening-test?test=listening-3" },
  { id: "listening-4", title: "Mock 4: Insurance, Museum, Psychology, Architecture",href: "/listening-test?test=listening-4" },
];

const READING_SKILLS_TYPES: Record<string, string> = {
  mh: "Matching Headings",
  mi: "Matching Information",
  mf: "Matching Features",
  mse: "Matching Sentence Endings",
  tfng: "True / False / Not Given",
  mc: "Multiple Choice",
  ls: "List Selection",
  ct: "Note Completion",
  sa: "Short Answer",
  sc: "Sentence Completion",
  smc: "Summary Completion",
  tc: "Table Completion",
  fc: "Flow-chart Completion",
  dc: "Diagram Completion",
};

function readingSkillItem(prefix: string, n: number): PlanContentItem {
  const id = `${prefix}-${String(n).padStart(3, "0")}`;
  return {
    id,
    title: `${READING_SKILLS_TYPES[prefix] ?? prefix} #${n}`,
    href: `/reading-test#skills`,
  };
}

const READING_SKILL_PREFIXES = Object.keys(READING_SKILLS_TYPES);

// Easy skill set: matching/heading/MC/T-F-NG types (gentler intro)
const EASY_PREFIXES = ["mh", "mi", "tfng", "mc"];
const HARDER_PREFIXES = READING_SKILL_PREFIXES.filter((p) => !EASY_PREFIXES.includes(p));

function expandSkillSet(prefixes: string[], perType: number): PlanContentItem[] {
  const out: PlanContentItem[] = [];
  for (let n = 1; n <= perType; n++) {
    for (const p of prefixes) out.push(readingSkillItem(p, n));
  }
  return out;
}

// 4 prefixes × 7 = 28 easy passages; 10 prefixes × 7 = 70 harder passages.
const readingSkillsEasy: PlanContentItem[] = expandSkillSet(EASY_PREFIXES, 7);
const readingSkillsAll: PlanContentItem[] = expandSkillSet(HARDER_PREFIXES, 7);

function listeningSkillSet(section: 1 | 2 | 3 | 4): PlanContentItem[] {
  return Array.from({ length: 5 }, (_, i) => {
    const n = i + 1;
    const id = `ls${section}-${String(n).padStart(3, "0")}`;
    return {
      id,
      title: `Section ${section} — Practice ${n}`,
      href: `/listening-test#skills-${section}`,
    };
  });
}

/**
 * Catalog keyed by PlanTask.id. Tasks not present here have no scheduled item
 * (e.g. wordOfDay, studyMode, quizMode — these are continuous, not catalog-bound).
 */
export const PLAN_CONTENT_CATALOGS: Record<string, PlanContentItem[]> = {
  orwellTask1,
  orwellTask2,
  paragraph: orwellParagraph,
  churchillP1: speakingPart1,
  churchillP2: speakingPart2,
  churchillP3: speakingPart3,
  topicBank: speakingThemes,
  readingSkills: readingSkillsAll,
  readingSkillsEasy,
  listeningS1: listeningSkillSet(1),
  listeningS2: listeningSkillSet(2),
  listeningS3: listeningSkillSet(3),
  listeningS4: listeningSkillSet(4),
  readingMock: readingMockTests,
  listeningMock: listeningMockTests,
};

/** Aggregate library sizes shown in coverage summaries. */
export const LIBRARY_SIZES = {
  vocabWords: 3000,
  orwellTask1: orwellTask1.length,    // 20
  orwellTask2: orwellTask2.length,    // 25
  orwellParagraph: orwellParagraph.length, // 15
  orwellTotal: orwellTask1.length + orwellTask2.length + orwellParagraph.length, // 60
  speakingThemes: speakingThemes.length, // 12
  readingMockTests: readingMockTests.length, // 5
  listeningMockTests: listeningMockTests.length, // 4
  readingSkillsTotal: readingSkillsEasy.length + readingSkillsAll.length, // 98
  listeningSkillsTotal: 4 * 5, // 20
} as const;

export const PLAN_CONTENT_REFERENCE = {
  readingMockTests,
  listeningMockTests,
};
