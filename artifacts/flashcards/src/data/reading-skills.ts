/**
 * IELTS Reading Skills Practice — targeted exercises by question type.
 *
 * Organised across 17 question types × 3 CEFR levels (A2, B1, B2):
 *   • A2 — short, simple passages on everyday topics for elementary learners.
 *   • B1 — clear, factual passages on familiar topics (intermediate).
 *   • B2 — Cambridge IELTS-style passages: academic register, complex syntax,
 *          abstract or specialised topics (upper-intermediate).
 *
 * Each exercise has a passage, instructions, items with correct answers, and a
 * detailed analysis shown after submission. Use `getExercisesForType()` to load
 * all exercises for a type, then filter by `level` in the UI as needed.
 */

import a2Supplements from "./reading-skills-supplements-a2";
import b1Supplements from "./reading-skills-supplements-b1";
import b2Part1Supplements from "./reading-skills-supplements-b2-part1";
import b2Part2Supplements from "./reading-skills-supplements-b2-part2";
import patchSupplements from "./reading-skills-supplements-patch";
import coherenceCohesion from "./reading-skills-coherence-cohesion";

export type SkillQuestionType =
  | "skimming"
  | "scanning"
  | "coherence_and_cohesion"
  | "matching_headings"
  | "matching_information"
  | "matching_features"
  | "matching_sentence_endings"
  | "true_false_not_given"
  | "multiple_choice"
  | "list_selection"
  | "choose_title"
  | "short_answer"
  | "sentence_completion"
  | "summary_completion"
  | "table_completion"
  | "flow_chart_completion"
  | "diagram_completion";

export interface QTypeMeta {
  id: SkillQuestionType;
  number: number;
  label: string;
  arabicLabel: string;
  emoji: string;
  shortDesc: string;
  inputKind: "single_select" | "single_select_per_item" | "multi_select" | "text";
  color: string;
}

export const QUESTION_TYPES: QTypeMeta[] = [
  { id: "skimming",                 number: 1,  label: "Skimming",                   arabicLabel: "القراءة السريعة",          emoji: "👀", shortDesc: "Quickly identify the main topic, idea, or writer's purpose of a passage.",                  inputKind: "single_select",          color: "from-pink-500 to-rose-500" },
  { id: "scanning",                 number: 2,  label: "Scanning",                   arabicLabel: "البحث عن التفاصيل",        emoji: "🔎", shortDesc: "Find specific facts (dates, numbers, names) quickly inside a passage.",                     inputKind: "text",                   color: "from-amber-500 to-yellow-500" },
  { id: "coherence_and_cohesion",   number: 3,  label: "Coherence and Cohesion",     arabicLabel: "ترابط الأفكار وأدوات الربط", emoji: "🪡", shortDesc: "Logical flow of ideas (coherence) and the linking words and pronouns that tie sentences together (cohesion).", inputKind: "single_select_per_item", color: "from-lime-500 to-green-600" },
  { id: "matching_headings",        number: 4,  label: "Matching Headings",          arabicLabel: "مطابقة العناوين",          emoji: "🗂️", shortDesc: "Match each paragraph to a heading from a list (more headings than paragraphs).",            inputKind: "single_select_per_item", color: "from-indigo-500 to-violet-500" },
  { id: "matching_information",     number: 5,  label: "Matching Information",       arabicLabel: "مطابقة المعلومات",         emoji: "🔍", shortDesc: "Match statements to the paragraph (A, B, C…) that contains the information.",              inputKind: "single_select_per_item", color: "from-sky-500 to-blue-500" },
  { id: "matching_features",        number: 6,  label: "Matching Features",          arabicLabel: "مطابقة الخصائص",           emoji: "🧩", shortDesc: "Match facts to categories (e.g. researcher → discovery, event → date).",                    inputKind: "single_select_per_item", color: "from-teal-500 to-cyan-500" },
  { id: "matching_sentence_endings",number: 7,  label: "Matching Sentence Endings",  arabicLabel: "مطابقة نهايات الجمل",      emoji: "✂️", shortDesc: "Complete each sentence by picking the correct ending from a list.",                        inputKind: "single_select_per_item", color: "from-emerald-500 to-teal-500" },
  { id: "true_false_not_given",     number: 8,  label: "True / False / Not Given",   arabicLabel: "صح / خطأ / غير مذكور",     emoji: "✅", shortDesc: "Decide whether each statement is True, False, or Not Given based on the passage.",         inputKind: "single_select_per_item", color: "from-green-500 to-emerald-500" },
  { id: "multiple_choice",          number: 9,  label: "Multiple Choice",            arabicLabel: "اختيار من متعدد",          emoji: "🎯", shortDesc: "Choose the correct answer from four options (A, B, C, D).",                                inputKind: "single_select",          color: "from-amber-500 to-orange-500" },
  { id: "list_selection",           number: 10, label: "List Selection",             arabicLabel: "اختيار من قائمة",          emoji: "☑️", shortDesc: "Pick multiple correct answers from a list (e.g. THREE that are mentioned).",               inputKind: "multi_select",           color: "from-orange-500 to-red-500" },
  { id: "choose_title",             number: 11, label: "Choose a Title",             arabicLabel: "اختيار العنوان",           emoji: "📌", shortDesc: "Select the most appropriate title for the whole passage.",                                  inputKind: "single_select",          color: "from-rose-500 to-pink-500" },
  { id: "short_answer",             number: 12, label: "Short Answer Questions",     arabicLabel: "إجابات قصيرة",             emoji: "✏️", shortDesc: "Answer specific questions in a few words taken from the passage.",                          inputKind: "text",                   color: "from-fuchsia-500 to-purple-500" },
  { id: "sentence_completion",      number: 13, label: "Sentence Completion",        arabicLabel: "إكمال الجمل",              emoji: "📝", shortDesc: "Fill the gaps in sentences with words taken directly from the passage.",                    inputKind: "text",                   color: "from-purple-500 to-indigo-500" },
  { id: "summary_completion",       number: 14, label: "Summary Completion",         arabicLabel: "إكمال الملخص",             emoji: "📄", shortDesc: "Complete a paragraph summary using words from the passage or a word box.",                  inputKind: "text",                   color: "from-violet-500 to-fuchsia-500" },
  { id: "table_completion",         number: 15, label: "Table Completion",           arabicLabel: "إكمال الجدول",             emoji: "📊", shortDesc: "Fill missing cells in a table using information from the passage.",                        inputKind: "text",                   color: "from-cyan-500 to-sky-500" },
  { id: "flow_chart_completion",    number: 16, label: "Flow Chart Completion",      arabicLabel: "إكمال المخطط",             emoji: "🔁", shortDesc: "Fill missing steps in a flow chart based on the passage.",                                  inputKind: "text",                   color: "from-blue-500 to-indigo-500" },
  { id: "diagram_completion",       number: 17, label: "Diagram Completion",         arabicLabel: "إكمال الرسم التوضيحي",     emoji: "🖼️", shortDesc: "Label parts of a diagram with information from the passage.",                              inputKind: "text",                   color: "from-pink-500 to-rose-500" },
];

export interface SkillItem {
  /** Item label shown to user (e.g. "i", "ii", "Question 1", "Step 2", or the statement itself for TFNG). */
  prompt: string;
  /** Correct answer. For multi-select use string[] (option labels); for everything else string. */
  answer: string | string[];
  /** Optional acceptable alternate spellings (case-insensitive, trimmed) for text inputs. */
  acceptable?: string[];
  /**
   * Optional per-item options (used by question types where every question has its
   * OWN choices, e.g. coherence_and_cohesion). When present, the runner shows these
   * directly under the item rather than from a shared `exercise.options` list.
   */
  options?: { label: string; text: string }[];
  /** Optional brief explanation shown next to this item on the results screen. */
  explanation?: string;
}

/** CEFR level for an exercise. A2 = elementary, B1 = intermediate, B2 = upper-intermediate (Cambridge IELTS standard). */
export type SkillLevel = "A2" | "B1" | "B2";

export const LEVELS: { id: SkillLevel; label: string; arabicLabel: string; shortDesc: string; color: string }[] = [
  { id: "A2", label: "A2 · Elementary",          arabicLabel: "مبتدئ",          shortDesc: "Short, simple passages on everyday topics. Basic grammar and high-frequency vocabulary.",                color: "from-emerald-500 to-teal-500" },
  { id: "B1", label: "B1 · Intermediate",        arabicLabel: "متوسط",          shortDesc: "Clear, factual passages on familiar topics. Standard register, some abstract ideas.",                  color: "from-sky-500 to-blue-500"     },
  { id: "B2", label: "B2 · Upper-Intermediate",  arabicLabel: "متوسط متقدم",    shortDesc: "Cambridge IELTS-style passages: academic register, complex syntax, abstract and specialised topics.", color: "from-violet-500 to-purple-600" },
];

export interface SkillExercise {
  id: string;
  type: SkillQuestionType;
  /** CEFR level of the passage and questions. */
  level: SkillLevel;
  title: string;
  topic: string;
  /** Passage text. Use `\n\n` between paragraphs. Prefix paragraphs with "[A] ", "[B] " etc. when paragraph labels matter. */
  passage: string;
  instructions: string;
  /** Choices used for matching/MCQ/headings/list selection. Each item: {label, text}. label is what the user picks. */
  options?: { label: string; text: string }[];
  /** One or more question items. */
  items: SkillItem[];
  /** Detailed analysis shown after submission. */
  analysis: string;
  /** Optional ASCII/visual hint for table/flow/diagram types. */
  visual?: string;
}

const E: SkillExercise[] = [
  // ───────────────────── 1. Skimming ─────────────────────
  {
    id: "sk-001",
    type: "skimming",
    level: "B1",
    title: "Smartwatches in Modern Life",
    topic: "Technology · Lifestyle",
    passage:
`Smartwatches have become incredibly popular over the last decade. Unlike traditional watches that only tell time, smartwatches act like mini-computers on your wrist. They can track your daily steps, monitor your heart rate, and even measure how well you sleep. In addition to health tracking, they allow users to receive text messages, answer phone calls, and control music without looking at their smartphones. While some people worry that these devices cause distractions, many users find that smartwatches help them stay organised and maintain a healthier lifestyle.`,
    instructions: "Skim the passage quickly (don't read every word) and choose the BEST answer.",
    options: [
      { label: "A", text: "The history of traditional watches" },
      { label: "B", text: "Smartwatches — their features and benefits" },
      { label: "C", text: "How to connect a watch to a smartphone" },
      { label: "D", text: "The negative effects of modern technology" },
    ],
    items: [
      { prompt: "What is the main topic of the passage?", answer: "B" },
    ],
    analysis:
`B is correct. The first sentence introduces smartwatches, and the rest of the text lists their features (tracking steps, receiving messages) and benefits (healthier lifestyle).

A is wrong: traditional watches are mentioned only briefly as a contrast.
C is wrong: connecting to a smartphone is never explained.
D is wrong: distractions are mentioned only in passing — the overall focus is positive.

Skimming tip: read the FIRST sentence (the topic sentence) and the FINAL sentence — they almost always reveal the main idea.`,
  },
  {
    id: "sk-002",
    type: "skimming",
    level: "B1",
    title: "Working from Home",
    topic: "Work · Lifestyle",
    passage:
`Working from home has changed dramatically since high-speed internet became widely available. Employees now save hours every week by avoiding long commutes, and many report having more time for family and personal hobbies. Companies, in turn, often save money on office rent and electricity. However, working from home is not without its challenges. Some people find it difficult to separate work from rest, and others miss the social atmosphere of an office. Despite these drawbacks, surveys show that a majority of remote workers would prefer to keep this arrangement, at least part of the time.`,
    instructions: "Skim the passage and choose the BEST answer.",
    options: [
      { label: "A", text: "To convince readers to quit their office jobs" },
      { label: "B", text: "To explain how to install high-speed internet at home" },
      { label: "C", text: "To describe the benefits and challenges of remote work" },
      { label: "D", text: "To compare salaries of remote and office workers" },
    ],
    items: [
      { prompt: "The writer's main purpose is to…", answer: "C" },
    ],
    analysis:
`C is correct. The text balances both sides: time saved, money saved (benefits) AND difficulty separating work from rest, missing social contact (challenges).

A is wrong: the writer doesn't try to convince anyone to quit — the tone is neutral.
B is wrong: internet is mentioned in one phrase, not explained.
D is wrong: salary comparisons are never made.

Skimming tip: when a passage gives BOTH positives and negatives, the purpose is usually to INFORM or DESCRIBE, not to PERSUADE.`,
  },
  {
    id: "sk-003",
    type: "skimming",
    level: "B1",
    title: "Plastic in the Oceans",
    topic: "Environment",
    passage:
`Every year, more than eight million tonnes of plastic end up in the world's oceans. Bottles, bags and tiny pieces of broken-down packaging now reach even the deepest parts of the sea. Marine animals frequently mistake plastic for food, and scientists have found microplastics inside fish that humans eat. Cleaning up the ocean is extremely expensive and slow, so most experts agree that the real solution lies on land — reducing the amount of plastic we produce, reusing what we already have, and recycling whenever possible. Without urgent action, the volume of plastic in the sea may soon outweigh that of fish.`,
    instructions: "Skim the passage and choose the BEST answer.",
    options: [
      { label: "A", text: "To explain how plastic bottles are recycled" },
      { label: "B", text: "To warn readers about the seriousness of ocean plastic pollution" },
      { label: "C", text: "To advertise a new ocean-cleaning machine" },
      { label: "D", text: "To describe the diet of marine animals" },
    ],
    items: [
      { prompt: "What is the writer's main purpose?", answer: "B" },
    ],
    analysis:
`B is correct. The shocking statistics ("eight million tonnes", "may soon outweigh fish") and the call for "urgent action" make this a clear warning.

A is wrong: recycling is mentioned only as one possible solution, not explained.
C is wrong: no specific machine or product is advertised.
D is wrong: marine animals are mentioned only to show the harm caused.

Skimming tip: phrases like "without urgent action" or "the real solution" often reveal that the writer's purpose is to WARN or PERSUADE.`,
  },
  {
    id: "sk-004",
    type: "skimming",
    level: "B1",
    title: "The Rise of Online Learning",
    topic: "Education · Technology",
    passage:
`Online learning has grown rapidly over the past few years. Students of all ages can now take university courses, learn a new language, or study coding from their own homes. Teachers record video lessons, share notes online, and use chat tools to answer questions in real time. Many learners enjoy the flexibility, since they can study at any hour that suits them. On the other hand, online classes require a great deal of self-discipline, and weak internet connections can make learning frustrating. Most schools today combine online and classroom teaching to give students the advantages of both.`,
    instructions: "Skim the passage and choose the BEST answer.",
    options: [
      { label: "A", text: "Online learning — its growth, benefits and difficulties" },
      { label: "B", text: "How to become a computer programmer" },
      { label: "C", text: "The cost of university tuition fees" },
      { label: "D", text: "Why traditional classrooms should be closed" },
    ],
    items: [
      { prompt: "What is the main topic of the passage?", answer: "A" },
    ],
    analysis:
`A is correct. The passage covers growth ("grown rapidly"), benefits ("flexibility") and difficulties ("self-discipline", "weak internet"), then ends with a balanced conclusion.

B is wrong: coding is mentioned in just one example.
C is wrong: tuition fees are never discussed.
D is wrong: the passage in fact says schools COMBINE both methods, not close classrooms.

Skimming tip: a balanced final sentence ("combine both") usually means the topic itself is balanced — choose a balanced title.`,
  },
  {
    id: "sk-005",
    type: "skimming",
    level: "B1",
    title: "The Power of a Good Night's Sleep",
    topic: "Health",
    passage:
`Sleep is often described as one of the most important pillars of good health, alongside diet and exercise. During sleep, the brain processes the day's experiences, strengthens memories, and clears out waste chemicals that build up while we are awake. Adults who consistently sleep fewer than six hours a night are more likely to suffer from heart disease, weakened immunity, and difficulty concentrating during the day. Doctors recommend a regular bedtime, a cool dark bedroom, and avoiding screens for at least an hour before bed. Such simple habits can have a powerful effect on both physical and mental wellbeing.`,
    instructions: "Skim the passage and choose the BEST answer.",
    options: [
      { label: "A", text: "To sell a new mattress brand" },
      { label: "B", text: "To inform readers about the importance of sleep and how to sleep better" },
      { label: "C", text: "To compare sleep habits in different countries" },
      { label: "D", text: "To argue that exercise is more important than sleep" },
    ],
    items: [
      { prompt: "The writer's main purpose is to…", answer: "B" },
    ],
    analysis:
`B is correct. The passage explains WHY sleep matters (memory, health) and HOW to sleep better (regular bedtime, cool room, no screens) — the classic structure of an informative health article.

A is wrong: no product is mentioned.
C is wrong: no countries are compared.
D is wrong: the passage actually places sleep ALONGSIDE exercise, not above it.

Skimming tip: when a passage explains BOTH a problem and practical solutions, its purpose is almost always to INFORM or ADVISE.`,
  },

  // ───────────────────── 2. Scanning ─────────────────────
  {
    id: "scn-001",
    type: "scanning",
    level: "B1",
    title: "The Great Wall of China",
    topic: "History · Landmarks",
    passage:
`The Great Wall of China is one of the most famous landmarks in the world. It is not just one long wall, but a series of walls built over many centuries to protect the Chinese Empire. The first parts of the wall were constructed as early as the 7th century BC. However, the most famous and well-preserved sections were built during the Ming Dynasty, between 1368 and 1644. The total length of the wall is estimated to be about 21,196 kilometres. Today, it attracts over 10 million visitors every year. The most popular section for tourists to visit is Badaling, which is located near Beijing.`,
    instructions: "Scan the passage to find each answer. Type short answers (numbers or short words only).",
    items: [
      {
        prompt: "1. In which century were the first parts of the wall constructed?",
        answer: "7th century BC",
        acceptable: ["7th century", "7th", "the 7th century BC", "the 7th century", "seventh century BC", "seventh century"],
      },
      {
        prompt: "2. What is the estimated total length of the wall (in kilometres)?",
        answer: "21,196",
        acceptable: ["21196", "21,196 kilometres", "21,196 km", "21196 km", "21196 kilometres", "about 21,196", "about 21196"],
      },
      {
        prompt: "3. How many visitors does the wall attract each year?",
        answer: "10 million",
        acceptable: ["over 10 million", "10,000,000", "ten million", "more than 10 million", "10 million visitors", "over 10 million visitors"],
      },
    ],
    analysis:
`1. 7th century BC — Scan for "first parts" / "constructed" → "the first parts of the wall were constructed as early as the 7th century BC."

2. 21,196 kilometres — Scan for "length" or a large number → "total length of the wall is estimated to be about 21,196 kilometres."

3. Over 10 million — Scan for "visitors" or "every year" → "attracts over 10 million visitors every year."

Scanning tip: when a question asks about a TIME, NUMBER or QUANTITY, your eyes can jump straight to digits on the page — no need to read every word.`,
  },
  {
    id: "scn-002",
    type: "scanning",
    level: "B1",
    title: "The Eiffel Tower",
    topic: "Landmarks · Architecture",
    passage:
`The Eiffel Tower is one of the most recognised structures in the world and the symbol of Paris. It was designed by the engineer Gustave Eiffel and built for the 1889 World Fair, which celebrated the 100th anniversary of the French Revolution. At the time of completion, the tower stood 300 metres tall — by far the tallest building in the world — and held this record for 41 years. Today, with its broadcasting antenna, it reaches a height of 330 metres. Around 7 million people visit the Eiffel Tower every year, making it the most-visited paid monument on the planet.`,
    instructions: "Scan the passage to find each answer. Type short answers only.",
    items: [
      {
        prompt: "1. In which year was the Eiffel Tower built?",
        answer: "1889",
        acceptable: ["in 1889", "the year 1889"],
      },
      {
        prompt: "2. Who designed the Eiffel Tower?",
        answer: "Gustave Eiffel",
        acceptable: ["Eiffel", "the engineer Gustave Eiffel", "gustave eiffel"],
      },
      {
        prompt: "3. How tall is the tower today, including its broadcasting antenna (in metres)?",
        answer: "330",
        acceptable: ["330 metres", "330m", "330 m"],
      },
    ],
    analysis:
`1. 1889 — Scan for "built" or any 4-digit year → "built for the 1889 World Fair."

2. Gustave Eiffel — Scan for "designed" or capitalised names → "designed by the engineer Gustave Eiffel."

3. 330 metres — Scan for "antenna" or "height" → "with its broadcasting antenna, it reaches a height of 330 metres." Be careful: 300 m was the ORIGINAL height — the question asks about today.

Scanning tip: dates appear as 4-digit numbers and names start with capital letters — both are easy targets for the eyes.`,
  },
  {
    id: "scn-003",
    type: "scanning",
    level: "B1",
    title: "Mount Everest",
    topic: "Geography · Mountains",
    passage:
`Mount Everest, known in Nepali as Sagarmatha and in Tibetan as Chomolungma, is the highest mountain on Earth above sea level. Its summit lies on the border between Nepal and the Tibet Autonomous Region of China. According to the most recent measurement, agreed jointly by China and Nepal in 2020, Everest stands 8,849 metres tall. The first confirmed climbers to reach the summit were Edmund Hillary of New Zealand and Tenzing Norgay, a Nepalese Sherpa, on 29 May 1953. Today, hundreds of climbers attempt the dangerous ascent each spring season.`,
    instructions: "Scan the passage to find each answer. Type short answers only.",
    items: [
      {
        prompt: "1. How tall is Mount Everest, in metres?",
        answer: "8,849",
        acceptable: ["8849", "8,849 metres", "8849 metres", "8,849 m", "8849 m"],
      },
      {
        prompt: "2. In what year did China and Nepal agree on the most recent measurement?",
        answer: "2020",
        acceptable: ["in 2020", "the year 2020"],
      },
      {
        prompt: "3. What is the Nepali name for Mount Everest?",
        answer: "Sagarmatha",
        acceptable: ["sagarmatha"],
      },
    ],
    analysis:
`1. 8,849 metres — Scan for "tall", "height" or large numbers → "Everest stands 8,849 metres tall."

2. 2020 — Scan for "measurement" or "agreed" → "agreed jointly by China and Nepal in 2020."

3. Sagarmatha — Scan for "Nepali" → "known in Nepali as Sagarmatha." Don't confuse it with Chomolungma, which is the TIBETAN name.

Scanning tip: you don't need to understand every word in the passage — just match the keyword in the question (e.g. "Nepali") to the same word in the text.`,
  },
  {
    id: "scn-004",
    type: "scanning",
    level: "B1",
    title: "The Modern Olympic Games",
    topic: "Sport · History",
    passage:
`The modern Olympic Games are the world's largest sporting event. They were revived by a French educator named Pierre de Coubertin, who believed that sport could promote peace and understanding between nations. The first modern Olympic Games were held in Athens, Greece, in 1896, with athletes from 14 countries competing in 43 events. Since then, the Games have taken place every four years, except during the two World Wars. Today, more than 200 countries take part, and the Olympics are watched by an audience of around 3 billion people worldwide.`,
    instructions: "Scan the passage to find each answer. Type short answers only.",
    items: [
      {
        prompt: "1. In which city were the first modern Olympic Games held?",
        answer: "Athens",
        acceptable: ["Athens, Greece", "in Athens"],
      },
      {
        prompt: "2. Who revived the modern Olympic Games?",
        answer: "Pierre de Coubertin",
        acceptable: ["de Coubertin", "Coubertin", "pierre de coubertin"],
      },
      {
        prompt: "3. How many countries took part in the first modern Olympic Games?",
        answer: "14",
        acceptable: ["14 countries", "fourteen", "fourteen countries"],
      },
    ],
    analysis:
`1. Athens — Scan for "first" or "held in" → "The first modern Olympic Games were held in Athens, Greece, in 1896."

2. Pierre de Coubertin — Scan for "revived" or capitalised names → "revived by a French educator named Pierre de Coubertin."

3. 14 — Scan for "countries" or numbers → "athletes from 14 countries competing in 43 events." Be careful not to confuse 14 (countries) with 43 (events).

Scanning tip: when two numbers appear close together, read the words AROUND each number to be sure which one answers the question.`,
  },
  {
    id: "scn-005",
    type: "scanning",
    level: "B1",
    title: "The Amazon Rainforest",
    topic: "Geography · Environment",
    passage:
`The Amazon Rainforest is the largest tropical forest on Earth. It covers an area of about 5.5 million square kilometres and stretches across nine countries in South America, with most of it lying inside Brazil. Scientists estimate that the Amazon is home to around 10% of all known species on the planet, including the famous jaguar, the giant otter and over 2,500 species of fish. The forest also plays a crucial role in regulating the world's climate, as its trees absorb roughly 2 billion tonnes of carbon dioxide every year. However, deforestation remains a serious threat, with thousands of square kilometres of forest lost annually to farming and logging.`,
    instructions: "Scan the passage to find each answer. Type short answers only.",
    items: [
      {
        prompt: "1. How many countries does the Amazon Rainforest stretch across?",
        answer: "9",
        acceptable: ["nine", "9 countries", "nine countries"],
      },
      {
        prompt: "2. What percentage of all known species on the planet live in the Amazon?",
        answer: "10%",
        acceptable: ["10", "10 percent", "ten percent", "ten %", "around 10%", "about 10%"],
      },
      {
        prompt: "3. Roughly how many tonnes of carbon dioxide do its trees absorb each year?",
        answer: "2 billion",
        acceptable: ["two billion", "2 billion tonnes", "2,000,000,000", "roughly 2 billion"],
      },
    ],
    analysis:
`1. Nine — Scan for "countries" → "stretches across nine countries in South America."

2. 10% — Scan for "species" or "%" → "home to around 10% of all known species on the planet."

3. 2 billion (tonnes) — Scan for "carbon dioxide" or "tonnes" → "trees absorb roughly 2 billion tonnes of carbon dioxide every year."

Scanning tip: words like "around", "about" and "roughly" often appear right next to the number you need — they are reliable signposts when scanning for quantities.`,
  },

  // ───────────────────── 3. Matching Headings ─────────────────────
  {
    id: "mh-001",
    type: "matching_headings",
    level: "B1",
    title: "The Spread of Coffee Cultivation",
    topic: "History · Agriculture",
    passage:
`[A] Coffee was first cultivated in the highlands of Ethiopia, where wild coffee plants had grown for centuries. By the 15th century, traders had carried the beans across the Red Sea to Yemen, where Sufi monasteries roasted and brewed them to support long nights of prayer. From these monasteries, the practice of coffee drinking gradually entered everyday Arabian society.

[B] As demand grew, Yemeni authorities tried to keep the trade strictly under their control, forbidding the export of fertile beans. Despite these restrictions, smugglers and pilgrims succeeded in carrying living seedlings out of the country. Within a few generations, coffee plantations had been established in India, Java and the Caribbean, ending Yemen's monopoly forever.

[C] The drink itself provoked controversy wherever it spread. Religious authorities in some cities argued that it had intoxicating effects and should be banned, while others praised it as a tool for concentration and study. Coffeehouses, in particular, were viewed with suspicion by rulers who feared the political conversations they hosted.

[D] Today, coffee is one of the most heavily traded agricultural commodities in the world, supporting the livelihoods of millions of small farmers. Yet the price paid to growers remains highly volatile, and many producers earn only a tiny fraction of the final retail price of a cup of coffee in Europe or North America.`,
    instructions: "Choose the most suitable heading for each paragraph A–D from the list of headings i–vii. There are more headings than paragraphs, so you will not use them all.",
    options: [
      { label: "i",   text: "Modern economic challenges for growers" },
      { label: "ii",  text: "An accidental scientific discovery" },
      { label: "iii", text: "From religious ritual to popular drink" },
      { label: "iv",  text: "Government attempts to control trade" },
      { label: "v",   text: "Health benefits confirmed by research" },
      { label: "vi",  text: "Social and political opposition to the drink" },
      { label: "vii", text: "The role of immigration in cuisine" },
    ],
    items: [
      { prompt: "Paragraph A", answer: "iii" },
      { prompt: "Paragraph B", answer: "iv" },
      { prompt: "Paragraph C", answer: "vi" },
      { prompt: "Paragraph D", answer: "i" },
    ],
    analysis:
`A → iii. Paragraph A traces coffee's path from Ethiopian wild plants to Sufi religious use, then into "everyday Arabian society" — exactly the move "from religious ritual to popular drink".

B → iv. The keywords "Yemeni authorities tried to keep the trade strictly under their control" and "forbidding the export" point to government attempts to control trade.

C → vi. The paragraph describes religious authorities arguing it should be banned, and rulers fearing political conversations — that is "social and political opposition".

D → i. Paragraph D moves to the present day and focuses on volatile prices and low farmer earnings — modern economic challenges for growers.

Distractors ii (accidental discovery), v (health research) and vii (immigration) describe ideas the passage never raises. Always check the heading is supported by the WHOLE paragraph, not just one sentence.`,
  },
  {
    id: "mh-002",
    type: "matching_headings",
    level: "B1",
    title: "How Cities Shape Their Climate",
    topic: "Environment · Urban science",
    passage:
`[A] Concrete, asphalt and brick absorb solar energy during the day and release it slowly at night. As a result, the centre of a large city is often several degrees warmer than the surrounding countryside, a phenomenon scientists call the urban heat island effect. The temperature difference is greatest on still, cloudless evenings.

[B] In response, urban planners around the world are beginning to redesign streets and rooftops. Painting roofs white, planting more street trees and replacing dark paving with lighter materials have all been shown to lower local temperatures by a measurable amount. Some cities now require new buildings to include green roofs by law.

[C] Heat islands are not only uncomfortable; they have serious public-health consequences. During severe heatwaves, mortality rates in dense urban districts can double, and the elderly and chronically ill are especially vulnerable. Hospitals report sharp rises in admissions for heat stroke and cardiovascular complaints.`,
    instructions: "Choose the most suitable heading for each paragraph A–C from the list of headings i–v. There are more headings than paragraphs.",
    options: [
      { label: "i",   text: "The dangers heat poses to vulnerable people" },
      { label: "ii",  text: "Why urban areas trap heat" },
      { label: "iii", text: "Designing cooler streets and buildings" },
      { label: "iv",  text: "Predicting future global temperatures" },
      { label: "v",   text: "The economic cost of air conditioning" },
    ],
    items: [
      { prompt: "Paragraph A", answer: "ii" },
      { prompt: "Paragraph B", answer: "iii" },
      { prompt: "Paragraph C", answer: "i" },
    ],
    analysis:
`A → ii. The paragraph explains the MECHANISM by which materials absorb and release heat, naming the "urban heat island effect" — i.e. why urban areas trap heat.

B → iii. Keywords "urban planners… redesign streets and rooftops", "white roofs", "green roofs" all describe designing cooler streets and buildings.

C → i. The paragraph focuses on health consequences: doubled mortality, vulnerable elderly, hospital admissions. That maps to "dangers heat poses to vulnerable people".

Distractors iv (future temperatures) and v (economic cost of AC) are tempting because they are climate-related, but the passage never discusses global predictions or the cost of running air conditioning. Always anchor your choice in specific words from the paragraph itself.`,
  },

  // ───────────────────── 2. Matching Information ─────────────────────
  {
    id: "mi-001",
    type: "matching_information",
    level: "B1",
    title: "The Forgotten History of the Bicycle",
    topic: "History · Technology",
    passage:
`[A] The earliest two-wheeled "running machines" appeared in Germany in 1817, propelled by riders pushing their feet against the ground. They were a curiosity for the wealthy rather than a practical means of transport, and few examples survived more than a decade.

[B] The breakthrough came in the 1860s, when French inventors fitted pedals directly to the front wheel. The new "velocipedes" sold in their thousands, but were notoriously uncomfortable: their iron-rimmed wheels rolling over cobbled streets earned them the nickname "boneshakers".

[C] Two later innovations transformed the bicycle into the machine we know today. First, the chain drive separated pedalling effort from steering and allowed wheels of equal size. Second, John Boyd Dunlop's pneumatic tyre, patented in 1888, made cycling smooth enough to attract mass commuters as well as racing enthusiasts.

[D] Beyond transport, the bicycle had unexpected social effects. Historians credit it with widening the social circles of young people in rural areas and, perhaps more importantly, with accelerating women's mobility and dress reform in the late nineteenth century.`,
    instructions: "Which paragraph (A, B, C or D) contains the following information? Each paragraph may be used more than once.",
    items: [
      { prompt: "1. A description of why early bicycles were uncomfortable", answer: "B" },
      { prompt: "2. A reference to the bicycle's effect on women's lives",  answer: "D" },
      { prompt: "3. A mention of the inventor of the pneumatic tyre",       answer: "C" },
      { prompt: "4. The country where two-wheeled machines were first built", answer: "A" },
    ],
    analysis:
`1 → B. The "boneshaker" nickname and the description of iron-rimmed wheels on cobbles directly explain the discomfort.
2 → D. Paragraph D explicitly says the bicycle accelerated "women's mobility and dress reform".
3 → C. John Boyd Dunlop's pneumatic tyre is named in paragraph C.
4 → A. Paragraph A says the earliest two-wheeled "running machines" appeared in Germany in 1817.

Tip: with Matching Information, scan for SPECIFIC details (proper nouns, dates, numbers, technical words) — they're the anchors that point you straight to the right paragraph. Information may not appear in the same order as the questions, and one paragraph can answer several questions, so read each statement independently.`,
  },
  {
    id: "mi-002",
    type: "matching_information",
    level: "B1",
    title: "Saving the World's Seed Diversity",
    topic: "Agriculture · Conservation",
    passage:
`[A] Agricultural diversity has fallen sharply over the past century. According to the United Nations, three quarters of the genetic variety once present in farmers' fields has been lost as commercial varieties have replaced traditional ones. The narrowing of the gene pool leaves global food supplies vulnerable to new pests and diseases.

[B] To combat this loss, more than 1,700 seed banks have been established around the world. Most are run by governments or universities, but a growing number are managed by farmer cooperatives that exchange seeds locally. The largest of all is the Svalbard Global Seed Vault, buried inside a mountain on a Norwegian island.

[C] Seed banks face their own difficulties. Power failures, funding cuts and even war can quickly destroy decades of stored material. The Aleppo seed bank in Syria, for example, was forced to evacuate during the country's civil conflict, and many of its accessions had to be regrown elsewhere from frozen samples.

[D] In recent years, conservationists have argued that storing seeds in freezers is not enough. They want farmers to keep growing traditional varieties in the soil where they evolved, a strategy known as in-situ conservation, so that crops can continue to adapt to a changing climate.`,
    instructions: "Which paragraph (A, B, C or D) contains the following information? Each paragraph may be used more than once.",
    items: [
      { prompt: "1. The reason for promoting cultivation rather than storage", answer: "D" },
      { prompt: "2. A statistic about how much diversity has disappeared",     answer: "A" },
      { prompt: "3. An example of a seed bank threatened by conflict",         answer: "C" },
      { prompt: "4. The location of the world's largest seed bank",            answer: "B" },
    ],
    analysis:
`1 → D. Paragraph D promotes growing crops in soil so they can keep adapting to climate change — the reason for in-situ conservation.
2 → A. The statistic "three quarters of the genetic variety… has been lost" is in paragraph A.
3 → C. Paragraph C names the Aleppo seed bank evacuated during Syria's civil conflict.
4 → B. The Svalbard Global Seed Vault is described as the largest, located on a Norwegian island.

Common trap: in question 4, paragraph A also mentions seed banks, but only paragraph B identifies the LARGEST one. Always match the FULL statement, not just a keyword.`,
  },

  // ───────────────────── 3. Matching Features ─────────────────────
  {
    id: "mf-001",
    type: "matching_features",
    level: "B1",
    title: "Pioneers of Antibiotics",
    topic: "Science · Medicine",
    passage:
`The discovery of antibiotics is often credited to a single moment, but in fact involved several scientists working over decades. In 1928, the Scottish bacteriologist Alexander Fleming noticed that a stray mould growing on a culture plate at St Mary's Hospital in London was killing the surrounding bacteria. He named the active substance "penicillin" but, lacking the means to purify it in useful quantities, he eventually set the work aside.

A decade later, the pharmacologist Howard Florey, an Australian working at Oxford, recognised the wartime potential of Fleming's neglected discovery. With his collaborator Ernst Chain, a German-born biochemist who had fled to Britain, Florey developed methods to produce stable, concentrated penicillin and conducted the first successful human trials in 1941.

Quite separately, the American microbiologist Selman Waksman searched systematically through soil organisms in his New Jersey laboratory. In 1943 his team isolated streptomycin, the first effective treatment for tuberculosis. Waksman is also credited with coining the term "antibiotic" to describe such substances.`,
    instructions: "Match each scientist (1–4) with the achievement (A–F). There are more achievements than scientists.",
    options: [
      { label: "A", text: "First observed penicillin's antibacterial effect" },
      { label: "B", text: "Developed methods to mass-produce stable penicillin" },
      { label: "C", text: "Discovered the first effective tuberculosis drug" },
      { label: "D", text: "Coined the word 'antibiotic'" },
      { label: "E", text: "Won a Nobel Prize for synthetic chemistry" },
      { label: "F", text: "Identified the cause of bubonic plague" },
    ],
    items: [
      { prompt: "1. Alexander Fleming", answer: "A" },
      { prompt: "2. Howard Florey",     answer: "B" },
      { prompt: "3. Ernst Chain",       answer: "B" },
      { prompt: "4. Selman Waksman",    answer: "C" },
    ],
    analysis:
`Fleming → A. The passage states he "noticed that a stray mould… was killing the surrounding bacteria" — the first observation of penicillin's antibacterial effect.

Florey & Chain → both B. They worked together: "Florey developed methods to produce stable, concentrated penicillin" with "his collaborator Ernst Chain". Matching Features questions can assign the SAME feature to two different people if the text justifies it.

Waksman → C. The passage attributes the discovery of streptomycin, "the first effective treatment for tuberculosis", to him. Note that D ("coined antibiotic") is ALSO true of Waksman, but Waksman's primary feature in the question set is C, and you can only choose one. When two features fit, pick the one that is most strongly emphasised — here, the tuberculosis breakthrough.

Distractors E and F are not mentioned in the passage at all — never pick a feature that does not appear in the text, even if it sounds plausible.`,
  },
  {
    id: "mf-002",
    type: "matching_features",
    level: "B1",
    title: "Three Schools of Architectural Thought",
    topic: "Architecture · Design history",
    passage:
`Twentieth-century architecture was shaped by competing visions of how buildings should serve society. The Bauhaus, founded in Germany in 1919, sought to merge art, craft and industrial production. Its instructors stripped away ornament and championed flat roofs, glass curtain walls and the use of new materials such as steel and reinforced concrete. Function, they insisted, must dictate form.

The Brutalist movement, which emerged after the Second World War, took a more sculptural approach. Its architects deliberately exposed raw, unfinished concrete and emphasised heavy geometric forms. Buildings such as London's National Theatre were intended to express the honesty of their materials, although the style attracted critics who found the structures cold and forbidding.

A third tradition, often called Critical Regionalism, argued that buildings should respond to their local climate, culture and landscape rather than imitating an international style. Designers in this school used local stone, traditional roof shapes and indoor courtyards to reconnect modern architecture with regional identity.`,
    instructions: "Match each architectural movement (1–3) with the design feature (A–E). There are more features than movements.",
    options: [
      { label: "A", text: "Use of exposed, unfinished concrete" },
      { label: "B", text: "Designs adapted to local climate and culture" },
      { label: "C", text: "A focus on flat roofs and steel-and-glass walls" },
      { label: "D", text: "A revival of medieval Gothic ornament" },
      { label: "E", text: "Underground construction to save energy" },
    ],
    items: [
      { prompt: "1. The Bauhaus",         answer: "C" },
      { prompt: "2. Brutalism",           answer: "A" },
      { prompt: "3. Critical Regionalism", answer: "B" },
    ],
    analysis:
`Bauhaus → C. The text says it favoured "flat roofs, glass curtain walls and… steel and reinforced concrete" with no ornament.

Brutalism → A. The defining feature given in the passage is "raw, unfinished concrete".

Critical Regionalism → B. The passage explicitly defines this school by buildings that "respond to their local climate, culture and landscape".

Distractors D (Gothic ornament) and E (underground construction) are not mentioned at all. With Matching Features, the right answer must be SUPPORTED by specific words in the passage — not by your prior architecture knowledge.`,
  },

  // ───────────────────── 4. Matching Sentence Endings ─────────────────────
  {
    id: "mse-001",
    type: "matching_sentence_endings",
    level: "B1",
    title: "Why Bees Dance",
    topic: "Biology · Animal behaviour",
    passage:
`When a honeybee returns to her hive after finding a rich source of nectar, she communicates the location to other workers through a remarkable performance known as the "waggle dance". The dance was first decoded in the 1940s by the Austrian ethologist Karl von Frisch, whose work later earned him the Nobel Prize.

The choreography encodes two pieces of information. The angle at which the bee waggles relative to vertical inside the dark hive corresponds to the angle of the food source relative to the sun outside. The duration of each waggle phase, meanwhile, encodes the distance: longer waggles mean a more distant source.

Recent research has shown that bees can also adjust their dance to take account of obstacles, such as a hill or a lake, that would force a flying bee to take a longer path. Even more surprisingly, scout bees searching for new nest sites use a similar dance to debate the merits of competing locations until the swarm reaches a consensus.`,
    instructions: "Complete each sentence (1–4) with the correct ending (A–F). There are more endings than you need.",
    options: [
      { label: "A", text: "indicates the distance to the food." },
      { label: "B", text: "is performed only by very young bees." },
      { label: "C", text: "shows the direction of the food relative to the sun." },
      { label: "D", text: "was first deciphered by an Austrian scientist." },
      { label: "E", text: "is used to choose between possible nest sites." },
      { label: "F", text: "warns the colony of approaching predators." },
    ],
    items: [
      { prompt: "1. The waggle dance",                      answer: "D" },
      { prompt: "2. The angle of the dance inside the hive", answer: "C" },
      { prompt: "3. The length of each waggle phase",       answer: "A" },
      { prompt: "4. A similar dance performed by scout bees", answer: "E" },
    ],
    analysis:
`1 → D. The passage states the dance "was first decoded in the 1940s by the Austrian ethologist Karl von Frisch".
2 → C. "The angle at which the bee waggles… corresponds to the angle of the food source relative to the sun".
3 → A. "The duration of each waggle phase… encodes the distance".
4 → E. Scout bees use a "similar dance to debate the merits of competing locations" — i.e. choosing between nest sites.

Matching Sentence Endings tests both reading and grammar: the chosen ending must complete the sentence into a grammatically correct statement that ALSO matches the passage. Endings B and F are grammatical but not supported by the text; never choose an ending the passage does not back up.`,
  },
  {
    id: "mse-002",
    type: "matching_sentence_endings",
    level: "B1",
    title: "The Origins of Paper",
    topic: "History · Materials",
    passage:
`Paper as we know it was invented in China around 105 CE, traditionally credited to a court official named Cai Lun. Earlier writing surfaces had included silk, which was expensive, and bamboo strips, which were heavy. Cai Lun's innovation was to soak plant fibres until they broke down, then drain and dry the resulting pulp into thin, flexible sheets.

For centuries, the technique remained a closely guarded secret. It travelled west only after Chinese papermakers were captured during the Battle of Talas in 751 CE; the prisoners reportedly taught their craft to their captors in Samarkand. From there, paper-making spread through the Islamic world to Spain, finally reaching most of Europe by the late twelfth century.

The arrival of paper transformed European intellectual life. Books that had once required hundreds of animal skins could now be produced more cheaply and in greater numbers. By the time Gutenberg's press appeared in the mid-fifteenth century, paper was the obvious medium on which to print.`,
    instructions: "Complete each sentence (1–4) with the correct ending (A–F). There are more endings than you need.",
    options: [
      { label: "A", text: "had relied on materials such as silk and bamboo." },
      { label: "B", text: "is traditionally attributed to Cai Lun." },
      { label: "C", text: "spread west after a battle in 751 CE." },
      { label: "D", text: "was used in Egyptian tomb paintings." },
      { label: "E", text: "made books much cheaper to produce in Europe." },
      { label: "F", text: "is mainly produced from cotton today." },
    ],
    items: [
      { prompt: "1. The invention of paper",                  answer: "B" },
      { prompt: "2. Chinese writing before paper",            answer: "A" },
      { prompt: "3. Knowledge of paper-making",               answer: "C" },
      { prompt: "4. The arrival of paper in Europe",          answer: "E" },
    ],
    analysis:
`1 → B. "Cai Lun" is named as the inventor traditionally credited with paper.
2 → A. The passage lists silk and bamboo strips as earlier surfaces.
3 → C. Knowledge spread west after the Battle of Talas in 751 CE.
4 → E. Paper made books cheaper than animal-skin manuscripts.

Trap to avoid: option D mentions Egyptian tomb paintings — that sounds historical and plausible, but the passage NEVER discusses Egypt. Stick to what the text actually states.`,
  },

  // ───────────────────── 5. True / False / Not Given ─────────────────────
  {
    id: "tfng-001",
    type: "true_false_not_given",
    level: "B1",
    title: "The Discovery of Vitamin C",
    topic: "Science · Medicine",
    passage:
`Scurvy, a disease caused by a lack of fresh fruit and vegetables, killed more sailors during long sea voyages than enemy action throughout the seventeenth and eighteenth centuries. In 1747, the Scottish naval surgeon James Lind ran what is now considered one of the first controlled clinical trials. He divided twelve sick sailors into pairs and gave each pair a different supposed remedy, including cider, vinegar and seawater. Only the pair given oranges and lemons recovered quickly.

Despite Lind's clear results, the British Navy did not officially adopt lemon juice as a daily ration until 1795 — almost half a century later. The delay was partly due to the difficulty of preserving citrus juice on long voyages, and partly to scepticism among senior officers.

The active ingredient was not isolated until 1932, when the Hungarian biochemist Albert Szent-Györgyi extracted what he called "ascorbic acid" — vitamin C — from paprika peppers. He won the Nobel Prize in 1937 for his work on biological combustion, of which the discovery of vitamin C was a part.`,
    instructions: "Decide whether each statement agrees with the information in the passage. Choose TRUE if the statement agrees, FALSE if the statement contradicts, or NOT GIVEN if there is no information.",
    items: [
      { prompt: "1. Scurvy killed more sailors than combat in the 1600s and 1700s.",        answer: "TRUE" },
      { prompt: "2. Lind tested his remedies on a total of twenty sailors.",                 answer: "FALSE" },
      { prompt: "3. The British Navy began issuing lemon juice within ten years of Lind's experiment.", answer: "FALSE" },
      { prompt: "4. Szent-Györgyi later moved to the United States to continue his research.", answer: "NOT GIVEN" },
      { prompt: "5. Ascorbic acid was first extracted from paprika peppers.",                answer: "TRUE" },
    ],
    analysis:
`1 → TRUE. "Scurvy… killed more sailors during long sea voyages than enemy action throughout the seventeenth and eighteenth centuries."

2 → FALSE. The passage clearly says he divided TWELVE sick sailors into pairs, not twenty.

3 → FALSE. The passage says the Navy didn't officially adopt lemon juice until 1795 — "almost half a century" after 1747, NOT within ten years.

4 → NOT GIVEN. The passage tells us Szent-Györgyi was Hungarian and won the Nobel Prize, but says NOTHING about him moving to the United States. "Not Given" means the passage simply doesn't address the claim — even if it might be true historically.

5 → TRUE. "Albert Szent-Györgyi extracted what he called 'ascorbic acid'… from paprika peppers."

Golden rule for TFNG: a statement is FALSE only if the passage clearly contradicts it. If the passage is silent — even if you think you know the answer from outside knowledge — choose NOT GIVEN.`,
  },
  {
    id: "tfng-002",
    type: "true_false_not_given",
    level: "B1",
    title: "Sleep and Memory",
    topic: "Neuroscience · Psychology",
    passage:
`A growing body of research suggests that sleep does far more than simply rest the body. During deep, slow-wave sleep, the brain appears to actively reorganise the memories it has acquired during waking hours, transferring information from short-term storage in the hippocampus to long-term storage in the cortex. Subjects who learn new material and then sleep typically perform 20 to 30 per cent better on tests the next day than those kept awake the same length of time.

REM sleep — the lighter phase associated with vivid dreams — appears to play a different role. It seems particularly important for emotional processing and for tasks that require creative problem-solving. Volunteers woken at the start of every REM phase, while still allowed slow-wave sleep, performed worse on tests that required novel insight than those whose REM sleep was undisturbed.

Researchers caution, however, that the precise mechanisms remain poorly understood, and that individual sleep needs vary widely.`,
    instructions: "Decide whether each statement agrees with the information in the passage. Choose TRUE, FALSE, or NOT GIVEN.",
    items: [
      { prompt: "1. Slow-wave sleep helps move memories from the hippocampus to the cortex.", answer: "TRUE" },
      { prompt: "2. Sleep improves test performance by exactly 50 per cent.",                  answer: "FALSE" },
      { prompt: "3. REM sleep is mainly linked to physical recovery.",                          answer: "FALSE" },
      { prompt: "4. Most adults need eight hours of sleep per night.",                          answer: "NOT GIVEN" },
      { prompt: "5. Scientists fully understand how sleep consolidates memory.",                answer: "FALSE" },
    ],
    analysis:
`1 → TRUE. The passage explicitly describes information being transferred from "short-term storage in the hippocampus to long-term storage in the cortex" during slow-wave sleep.

2 → FALSE. The passage gives a range of "20 to 30 per cent", not 50.

3 → FALSE. REM sleep is linked to "emotional processing" and "creative problem-solving" — not physical recovery, which would contradict the passage.

4 → NOT GIVEN. The passage notes that "individual sleep needs vary widely" but never states a specific number of hours. Watch out — "not given" sometimes appears when the topic is mentioned but the specific claim is not.

5 → FALSE. The final paragraph explicitly states the mechanisms "remain poorly understood" — the opposite of "fully understand".`,
  },

  // ───────────────────── 6. Multiple Choice ─────────────────────
  {
    id: "mc-001",
    type: "multiple_choice",
    level: "B1",
    title: "How Volcanoes Cool the Climate",
    topic: "Earth science",
    passage:
`When a large volcano erupts explosively, it can launch millions of tonnes of sulphur dioxide gas into the stratosphere, the layer of the atmosphere that begins about ten kilometres above the Earth's surface. Once there, the gas reacts with water vapour to form a haze of microscopic sulphate droplets that can spread around the globe within weeks. These droplets reflect a small fraction of incoming sunlight back into space, causing a measurable cooling effect at ground level.

The 1991 eruption of Mount Pinatubo in the Philippines provides one of the best-studied examples. In the eighteen months that followed, average global temperatures dropped by roughly half a degree Celsius, briefly masking the warming trend caused by greenhouse gases. The cooling persisted until the sulphate haze gradually settled out of the stratosphere, after which temperatures rebounded.

Some climate scientists have proposed deliberately injecting sulphur particles into the stratosphere as an emergency response to global warming — an approach known as solar geoengineering. Critics argue that it would treat only the symptoms, not the cause, and could disrupt monsoon rainfall patterns in unpredictable ways.`,
    instructions: "Choose the correct letter, A, B, C or D.",
    options: [
      { label: "A", text: "Sulphate droplets warm the lower atmosphere by trapping heat." },
      { label: "B", text: "After the Pinatubo eruption, global warming permanently stopped." },
      { label: "C", text: "Sulphate haze can spread around the world within a few weeks." },
      { label: "D", text: "Solar geoengineering has been adopted as official climate policy." },
    ],
    items: [
      { prompt: "Which of the following statements is supported by the passage?", answer: "C" },
    ],
    analysis:
`Correct answer: C. The passage states the haze "can spread around the globe within weeks".

A is wrong: the droplets REFLECT sunlight, causing COOLING, not warming.

B is wrong: cooling was temporary; "temperatures rebounded" once the haze settled. The warming trend resumed.

D is wrong: solar geoengineering is described only as a PROPOSAL with critics — not as adopted policy.

In MCQ, eliminate options that contradict the passage (A, B), then options that go beyond what the passage actually says (D). What remains is the answer the text directly supports.`,
  },
  {
    id: "mc-002",
    type: "multiple_choice",
    level: "B1",
    title: "The Octopus's Distributed Brain",
    topic: "Marine biology",
    passage:
`The octopus has been described as the closest thing on Earth to an intelligent alien. With around 500 million neurons — comparable to a dog — it solves puzzles, opens jars and recognises individual humans. What sets the octopus apart, however, is the way its neurons are arranged. Only about a third sit in the central brain; the rest are distributed through its eight arms, each of which can taste, touch and react with a striking degree of independence.

Experiments have shown that a severed octopus arm continues to grasp at objects placed near it for several minutes after separation. While alive in the body, each arm seems to coordinate its own basic movements without waiting for instructions from the central brain, freeing up the brain for higher-level decisions such as where to go or what to attack.

Researchers think this distributed architecture may have evolved because of the octopus's soft, infinitely flexible body. A central brain alone could not process every possible bend, twist and stretch of eight near-boneless limbs.`,
    instructions: "Choose the correct letter, A, B, C or D.",
    options: [
      { label: "A", text: "The octopus has fewer neurons than most other invertebrates." },
      { label: "B", text: "Most of an octopus's neurons are located in its arms, not its central brain." },
      { label: "C", text: "Octopus arms stop moving immediately when removed from the body." },
      { label: "D", text: "The octopus's intelligence comes mainly from its strong skeleton." },
    ],
    items: [
      { prompt: "Which of the following statements is supported by the passage?", answer: "B" },
    ],
    analysis:
`Correct answer: B. The passage says "Only about a third sit in the central brain; the rest are distributed through its eight arms" — i.e. most neurons are in the arms.

A is wrong: 500 million neurons is described as "comparable to a dog", which is a LOT for an invertebrate.

C is wrong: a severed arm "continues to grasp at objects… for several minutes after separation".

D is wrong: the passage describes the octopus body as "near-boneless" — it has no strong skeleton.`,
  },

  // ───────────────────── 7. List Selection ─────────────────────
  {
    id: "ls-001",
    type: "list_selection",
    level: "B1",
    title: "Designing for Walkable Cities",
    topic: "Urban planning",
    passage:
`Researchers studying urban design have identified a number of features that consistently make neighbourhoods more walkable. Short blocks, with frequent intersections, encourage pedestrians by offering more route choices and more stimulation along the way. Continuous shopfronts at street level give walkers something to look at, while wide pavements separated from traffic by a row of trees both shade pedestrians and slow vehicles down. Mixed land use — homes, shops, schools and offices within the same area — reduces the need to drive in the first place.

Other features matter less than people often assume. Decorative pavement patterns or sculptural street furniture, for example, have been shown in surveys to have little influence on whether people choose to walk. Free or generous car parking, meanwhile, actively discourages walking by making driving cheaper and more convenient than the alternatives.

The most powerful single predictor of walking, however, may simply be the perception of safety: well-lit streets that feel watched by surrounding buildings consistently attract more pedestrians than empty boulevards, regardless of architectural beauty.`,
    instructions: "Which THREE of the following are mentioned in the passage as features that increase walkability? Select THREE answers (A–F).",
    options: [
      { label: "A", text: "Short blocks with frequent intersections" },
      { label: "B", text: "Decorative pavement patterns" },
      { label: "C", text: "Continuous shopfronts at street level" },
      { label: "D", text: "Free car parking" },
      { label: "E", text: "Mixed-use neighbourhoods" },
      { label: "F", text: "Wide motorways through the city" },
    ],
    items: [
      { prompt: "Choose THREE letters.", answer: ["A", "C", "E"] },
    ],
    analysis:
`Correct answers: A, C, E.

A — directly stated: "Short blocks, with frequent intersections, encourage pedestrians."
C — directly stated: "Continuous shopfronts at street level give walkers something to look at."
E — directly stated: "Mixed land use… reduces the need to drive in the first place."

Why the others are wrong:
B (Decorative pavement) is explicitly listed under features that "have little influence" on walking.
D (Free car parking) is described as something that "actively discourages walking".
F (Wide motorways) isn't mentioned at all and would intuitively reduce walkability.

In List Selection, the test usually pairs a few correct items with at least one item that's the OPPOSITE of correct (D here). Always read carefully — a feature appearing in the passage isn't always positive.`,
  },
  {
    id: "ls-002",
    type: "list_selection",
    level: "B1",
    title: "Why Coral Reefs Are Dying",
    topic: "Marine ecology",
    passage:
`Coral reefs cover less than one per cent of the ocean floor, yet they support around a quarter of all known marine species. In recent decades, however, reefs have been disappearing at an alarming rate. Marine biologists list several converging causes. Rising sea temperatures, driven by climate change, force corals to expel the symbiotic algae that give them both their colour and most of their food, leaving them bleached and starving. Ocean acidification, caused by seawater absorbing carbon dioxide from the atmosphere, weakens the limestone skeletons that corals build over decades.

Local pressures matter just as much. Run-off from coastal farms carries fertilisers that fuel algae blooms, smothering young corals. Overfishing of grazers such as parrotfish allows seaweed to take over, denying coral larvae a place to settle. And tourist boats that drop anchor on living reefs cause damage that can take centuries to repair.

A few stresses once feared have proved less significant. Direct collection of coral for the souvenir trade, while damaging in particular places, is now thought to play only a minor role in global decline compared with the larger threats described above.`,
    instructions: "Which THREE of the following are listed as MAJOR threats to coral reefs? Select THREE answers (A–F).",
    options: [
      { label: "A", text: "Rising sea temperatures" },
      { label: "B", text: "Souvenir collection by divers" },
      { label: "C", text: "Fertiliser run-off from farmland" },
      { label: "D", text: "Anchor damage from tourist boats" },
      { label: "E", text: "Volcanic eruptions on the seabed" },
      { label: "F", text: "Migration of polar species into tropical waters" },
    ],
    items: [
      { prompt: "Choose THREE letters.", answer: ["A", "C", "D"] },
    ],
    analysis:
`Correct answers: A, C, D.

A — "Rising sea temperatures, driven by climate change…" is named as a major cause.
C — "Run-off from coastal farms carries fertilisers" — a major local pressure.
D — "Tourist boats that drop anchor… cause damage that can take centuries to repair."

Why not B: souvenir collection IS mentioned, but the passage explicitly says it now plays "only a minor role" — it's a trap for skim-readers.
Why not E or F: neither volcanic eruptions nor polar species migration appears in the text at all.`,
  },

  // ───────────────────── 8. Choose a Title ─────────────────────
  {
    id: "ct-001",
    type: "choose_title",
    level: "B1",
    title: "(See passage)",
    topic: "Linguistics",
    passage:
`When a child grows up hearing two languages from birth, the brain handles each language in subtly different ways depending on context, but it does not — as some popular books still claim — confuse them. Bilingual children typically reach the same major language milestones as monolingual children, although they may temporarily produce slightly smaller vocabularies in each individual language while their combined vocabulary grows ahead.

The cognitive consequences last well into adulthood. Imaging studies show that lifelong bilinguals develop denser grey matter in regions of the brain associated with attention and conflict resolution. Many studies report that bilinguals are slightly faster at switching between mental tasks and that the onset of dementia symptoms in elderly bilinguals is, on average, delayed by several years compared with monolingual peers.

Bilingualism is not, however, a guarantee of academic success or higher intelligence. Researchers stress that the advantages are specific and modest, and that they depend on actively using both languages throughout life. A language learned in childhood and then abandoned brings few of the documented benefits.`,
    instructions: "Choose the most appropriate title for the whole passage.",
    options: [
      { label: "A", text: "How children learn to read in two scripts" },
      { label: "B", text: "The benefits and limits of growing up bilingual" },
      { label: "C", text: "The decline of minority languages in modern Europe" },
      { label: "D", text: "Why translation jobs are increasingly automated" },
    ],
    items: [
      { prompt: "Choose A, B, C or D.", answer: "B" },
    ],
    analysis:
`Correct answer: B. The passage covers BOTH the cognitive benefits of bilingualism (denser grey matter, delayed dementia, faster task-switching) AND its limits (not a guarantee of higher intelligence, requires active use). Title B captures both halves.

A is too narrow: the passage isn't about reading or scripts at all.
C is unrelated: there is no discussion of minority languages or Europe.
D is unrelated: translation jobs and automation are not mentioned.

A title must cover the WHOLE passage, not just one paragraph. If a title only fits one part of the text, it's wrong.`,
  },
  {
    id: "ct-002",
    type: "choose_title",
    level: "B1",
    title: "(See passage)",
    topic: "Engineering · History",
    passage:
`The Roman Empire's roads, harbours and aqueducts were not merely impressive feats of engineering; they were also, for centuries, the longest-lasting infrastructure ever built. Modern researchers analysing Roman concrete have found that it grows STRONGER over time as seawater triggers the slow growth of mineral crystals within the material. By contrast, today's Portland cement begins to weaken as soon as it sets.

Some of the empire's secrets have only recently been recovered. The exact composition of "Roman concrete" was unknown until 2017, when a team using electron microscopes identified a distinctive mineral, aluminous tobermorite, forming inside ancient harbour walls. Researchers are now experimenting with similar mixes to see whether modern coastal structures could be made to last centuries rather than decades.

Imitating Roman engineering is not always practical. The volcanic ash the Romans used is rare outside the Mediterranean, and modern construction schedules cannot wait for concrete to develop the slow, self-healing chemistry that gives Roman material its endurance.`,
    instructions: "Choose the most appropriate title for the whole passage.",
    options: [
      { label: "A", text: "The lost art of Roman shipbuilding" },
      { label: "B", text: "Why Roman concrete outlasts modern cement" },
      { label: "C", text: "The decline of the Roman Empire" },
      { label: "D", text: "How Portland cement was invented" },
    ],
    items: [
      { prompt: "Choose A, B, C or D.", answer: "B" },
    ],
    analysis:
`Correct answer: B. The whole passage compares Roman concrete with modern Portland cement, explains why the Roman material lasts longer, and discusses both the recent scientific discovery and the practical limits of imitating it. B is the most accurate summary.

A is wrong — shipbuilding isn't discussed.
C is wrong — the empire's decline isn't the topic.
D is wrong — Portland cement is mentioned only briefly as a contrast; its invention isn't covered.`,
  },

  // ───────────────────── 9. Short Answer ─────────────────────
  {
    id: "sa-001",
    type: "short_answer",
    level: "B1",
    title: "The Story of Penicillin",
    topic: "Medicine · History",
    passage:
`Although Alexander Fleming made his observation about penicillin in 1928, the drug was not produced in clinically useful quantities until 1941, when Howard Florey's team at Oxford carried out the first successful human trials. Fleming had abandoned the work in part because penicillin was extremely difficult to purify; the active substance broke down quickly and was lost during the early extraction techniques he had available.

The Second World War transformed both the urgency and the scale of penicillin production. With wounded soldiers dying from infections that the drug could cure, the United States government invested heavily in industrial methods, and by 1944 American factories were producing enough penicillin to treat every Allied soldier wounded after D-Day. Production cost per dose fell from around twenty dollars to less than a dollar within five years.`,
    instructions: "Answer the questions below using NO MORE THAN THREE WORDS from the passage for each answer.",
    items: [
      { prompt: "1. In which year did Alexander Fleming make his observation about penicillin?", answer: "1928" },
      { prompt: "2. Where did Howard Florey's team carry out the first human trials?",          answer: "Oxford", acceptable: ["at Oxford"] },
      { prompt: "3. Which conflict caused production of penicillin to expand rapidly?",          answer: "Second World War", acceptable: ["the Second World War", "World War 2", "World War II", "WWII"] },
    ],
    analysis:
`1 → 1928. The first sentence states Fleming "made his observation about penicillin in 1928".

2 → Oxford. "Howard Florey's team at Oxford carried out the first successful human trials." Both "Oxford" and "at Oxford" stay within three words.

3 → Second World War. The second paragraph says the war "transformed both the urgency and the scale of penicillin production". Note the word limit: "the Second World War" is exactly three words. Adding "during" would push you over the limit and lose the mark.

Always use the EXACT words from the passage, and respect the word limit precisely. Numbers and hyphenated words count as one word each.`,
  },
  {
    id: "sa-002",
    type: "short_answer",
    level: "B1",
    title: "The Atacama Desert",
    topic: "Geography",
    passage:
`Stretching for more than 1,000 kilometres along the Pacific coast of South America, the Atacama Desert is one of the driest places on Earth. Some of its weather stations have never recorded rainfall in over a century of measurement. The aridity is caused by a combination of factors: the cold Humboldt Current chills moisture out of the air before it reaches land, while the towering Andes Mountains to the east block any rain clouds drifting in from the Amazon basin.

Despite these conditions, the desert is far from lifeless. Lichens cling to coastal cliffs, drawing moisture directly from sea fog known locally as camanchaca. Several species of cactus survive on this fog alone, and the desert blooms spectacularly with wildflowers in years when the rare rains do fall. Scientists also study the Atacama because its dry, mineral-rich soils resemble those on Mars more closely than any other terrestrial environment.`,
    instructions: "Answer the questions below using NO MORE THAN TWO WORDS for each answer.",
    items: [
      { prompt: "1. What is the local name for the sea fog that lichens depend on?",        answer: "camanchaca" },
      { prompt: "2. Which mountain range blocks rain clouds from reaching the Atacama?",   answer: "the Andes", acceptable: ["Andes", "the Andes Mountains", "Andes Mountains"] },
      { prompt: "3. Which planet's surface does the desert's soil chemistry resemble?",    answer: "Mars" },
    ],
    analysis:
`1 → camanchaca. The passage says "sea fog known locally as camanchaca" — the local name. Spelling matters in short-answer questions, so copy exactly from the passage.

2 → the Andes. "The towering Andes Mountains to the east block any rain clouds." Both "Andes" and "the Andes" fit within two words.

3 → Mars. "Its dry, mineral-rich soils resemble those on Mars."`,
  },

  // ───────────────────── 10. Sentence Completion ─────────────────────
  {
    id: "sc-001",
    type: "sentence_completion",
    level: "B1",
    title: "The Great Library of Alexandria",
    topic: "History",
    passage:
`The Library of Alexandria, founded in the third century BCE under the patronage of the Egyptian pharaoh Ptolemy I, was probably the largest collection of writings in the ancient world. At its peak it is thought to have housed several hundred thousand papyrus scrolls, gathered through a deliberate state policy. Ships docking at Alexandria were searched and any books on board were borrowed, copied by official scribes and — only after copying — returned. The scribes' copies were often kept in the library while the originals were given back to their owners.

The library's destruction has been the subject of debate for centuries. Roman writers blamed a fire during Julius Caesar's siege in 48 BCE; later Christian and Muslim sources blamed religious conflicts that broke out in the city in subsequent centuries. Most modern historians believe the collapse was gradual, the result of declining funding and shifting political power, rather than a single catastrophic event.`,
    instructions: "Complete the sentences below with words taken from the passage. Use NO MORE THAN TWO WORDS for each gap.",
    items: [
      { prompt: "1. The library was founded under the patronage of pharaoh ___.", answer: "Ptolemy I", acceptable: ["Ptolemy"] },
      { prompt: "2. Books on visiting ships were copied by official ___.",          answer: "scribes" },
      { prompt: "3. Most modern historians believe the library's collapse was ___, not sudden.", answer: "gradual" },
    ],
    analysis:
`1 → Ptolemy I. The passage states the library was founded "under the patronage of the Egyptian pharaoh Ptolemy I". Both "Ptolemy" and "Ptolemy I" are within the two-word limit.

2 → scribes. "Borrowed, copied by official scribes."

3 → gradual. "Most modern historians believe the collapse was gradual, the result of declining funding and shifting political power."

Sentence Completion ALWAYS uses words copied directly from the passage. Do not paraphrase. Watch the word limit — answers exceeding it score zero.`,
  },
  {
    id: "sc-002",
    type: "sentence_completion",
    level: "B1",
    title: "Carbon Dating",
    topic: "Science · Archaeology",
    passage:
`The technique of radiocarbon dating, developed by the American chemist Willard Libby in 1949, allows archaeologists to estimate the age of organic remains up to about 50,000 years old. The method depends on a property of the carbon-14 isotope, which is created in the upper atmosphere when cosmic rays collide with nitrogen atoms. Carbon-14 enters the food chain through plants and exists in all living tissue at a roughly constant level.

Once an organism dies, however, no new carbon-14 is taken in, and the isotope already present begins to decay at a known rate. By measuring how much remains in a sample, scientists can calculate how long ago the organism died. The technique is most reliable for samples between a few hundred and 30,000 years old; beyond that, the amount of carbon-14 left becomes too small to measure accurately.`,
    instructions: "Complete the sentences below with NO MORE THAN TWO WORDS taken from the passage for each gap.",
    items: [
      { prompt: "1. Radiocarbon dating was developed by ___ in 1949.",                       answer: "Willard Libby" },
      { prompt: "2. Carbon-14 is created when cosmic rays collide with ___.",                answer: "nitrogen atoms" },
      { prompt: "3. The technique works on samples up to about ___ years old.",              answer: "50,000", acceptable: ["50000", "fifty thousand"] },
    ],
    analysis:
`1 → Willard Libby. "Developed by the American chemist Willard Libby in 1949."

2 → nitrogen atoms. "Created in the upper atmosphere when cosmic rays collide with nitrogen atoms."

3 → 50,000. "Up to about 50,000 years old." Numbers count as one word.`,
  },

  // ───────────────────── 11. Summary Completion ─────────────────────
  {
    id: "smc-001",
    type: "summary_completion",
    level: "B1",
    title: "How Dolphins Sleep",
    topic: "Marine biology",
    passage:
`Unlike land mammals, dolphins cannot afford to lose consciousness completely, because they would suffocate without surfacing to breathe. Their solution is a state called unihemispheric sleep, in which one half of the brain rests while the other remains active, controlling breathing and watching for danger. After about two hours, the two hemispheres switch roles, and over a 24-hour period each half typically receives roughly four hours of rest in total.

During unihemispheric sleep, the eye on the opposite side of the resting hemisphere is closed, while the other eye stays open and alert. Mothers and newborn calves take this strategy further: for the first month after birth, both stay almost continuously in motion, sleeping only in very brief bursts of a few minutes at a time. This pattern is thought to help the calf learn essential survival skills and avoid predators during its most vulnerable period.`,
    instructions: "Complete the summary below using words from the box. Each word may be used only once.",
    options: [
      { label: "A", text: "hemisphere" },
      { label: "B", text: "predators" },
      { label: "C", text: "minutes" },
      { label: "D", text: "calves" },
      { label: "E", text: "kilometres" },
      { label: "F", text: "fish" },
      { label: "G", text: "weeks" },
    ],
    items: [
      { prompt: "1. Dolphins use unihemispheric sleep so that one ___ can keep watching for danger.", answer: "A" },
      { prompt: "2. New-born ___ and their mothers move almost continuously for about a month.",     answer: "D" },
      { prompt: "3. They sleep only in very brief bursts of a few ___ at a time.",                    answer: "C" },
      { prompt: "4. This helps the young dolphin avoid ___ during its most vulnerable weeks.",        answer: "B" },
    ],
    analysis:
`1 → A (hemisphere). "One half of the brain rests while the other remains active" = the active hemisphere keeps watching.

2 → D (calves). "Mothers and newborn calves take this strategy further."

3 → C (minutes). "Sleeping only in very brief bursts of a few minutes at a time."

4 → B (predators). "Help the calf… avoid predators during its most vulnerable period."

Distractors E (kilometres), F (fish) and G (weeks) all sound plausible but are not what the passage actually says. With Summary Completion using a word box, the answer must be both a logical fit AND specifically mentioned in the passage.`,
  },
  {
    id: "smc-002",
    type: "summary_completion",
    level: "B1",
    title: "The Spread of Tea",
    topic: "History · Trade",
    passage:
`Tea drinking originated in China at least 2,000 years ago, and was already a sophisticated culture by the time it began to spread west. Buddhist monks travelling between China and Japan in the eighth century carried the practice with them, establishing tea as part of Japanese ritual life. Long before any European had tasted the drink, tea was already big business in Asia, with merchants moving compressed bricks of tea by camel along the Silk Road.

European traders only encountered tea in the seventeenth century. The Dutch East India Company shipped the first commercial cargoes to Amsterdam in the early 1600s, and within a few decades the drink had become fashionable in London. Heavy taxes on imported tea encouraged smuggling on a massive scale; one historian has estimated that more than half of all tea consumed in Britain in the 1770s entered the country illegally.`,
    instructions: "Complete the summary below using NO MORE THAN TWO WORDS from the passage for each gap.",
    items: [
      { prompt: "1. Tea drinking began in ___ at least 2,000 years ago.",        answer: "China" },
      { prompt: "2. ___ monks introduced tea to Japan in the eighth century.",   answer: "Buddhist" },
      { prompt: "3. The Dutch East India Company first shipped tea to ___.",     answer: "Amsterdam" },
      { prompt: "4. Heavy taxes encouraged ___ on a large scale.",                answer: "smuggling" },
    ],
    analysis:
`1 → China. "Tea drinking originated in China at least 2,000 years ago."

2 → Buddhist. "Buddhist monks travelling between China and Japan in the eighth century."

3 → Amsterdam. "The Dutch East India Company shipped the first commercial cargoes to Amsterdam."

4 → smuggling. "Heavy taxes on imported tea encouraged smuggling on a massive scale."

When Summary Completion has no word box, you copy directly from the passage — exactly as written. Watch spelling.`,
  },

  // ───────────────────── 12. Table Completion ─────────────────────
  {
    id: "tc-001",
    type: "table_completion",
    level: "B1",
    title: "Renewable Energy in Three Countries",
    topic: "Environment · Policy",
    passage:
`The role that renewable sources play in national electricity systems varies enormously between countries. Iceland is in many ways an exceptional case: thanks to its abundant geothermal and hydroelectric resources, around 99 per cent of the country's electricity comes from renewable sources. Costa Rica relies heavily on hydroelectricity, which accounts for around 70 per cent of its mix, supplemented by wind and geothermal power.

Germany is often cited as a more typical industrial example. Its renewable share, dominated by wind power both onshore and offshore, has risen from less than 10 per cent in 2000 to nearly 50 per cent today. The country has set an ambitious target of 80 per cent renewable electricity by 2030, although critics warn that grid upgrades and storage capacity are not keeping pace.`,
    instructions: "Complete the table below. Write NO MORE THAN TWO WORDS OR A NUMBER from the passage for each gap.",
    visual:
`┌─────────────┬────────────────────────┬───────────────────────────────┐
│ Country     │ Main renewable source  │ Renewable share of electricity│
├─────────────┼────────────────────────┼───────────────────────────────┤
│ Iceland     │ (1) ___ & hydro        │ around 99 %                   │
│ Costa Rica  │ hydroelectricity       │ around (2) ___ %              │
│ Germany     │ (3) ___                │ nearly 50 %                   │
└─────────────┴────────────────────────┴───────────────────────────────┘`,
    items: [
      { prompt: "Cell (1) — Iceland's main renewable source besides hydro",   answer: "geothermal" },
      { prompt: "Cell (2) — Costa Rica's renewable share (number)",           answer: "70" },
      { prompt: "Cell (3) — Germany's main renewable source",                 answer: "wind power", acceptable: ["wind"] },
    ],
    analysis:
`(1) → geothermal. "Iceland… abundant geothermal and hydroelectric resources."

(2) → 70. "Hydroelectricity, which accounts for around 70 per cent of its mix" in Costa Rica.

(3) → wind power. "Its renewable share, dominated by wind power both onshore and offshore."

In Table Completion, the table headings tell you what TYPE of word you need (a percentage, a noun, a date, etc.). Let the column header guide you to the right kind of answer.`,
  },
  {
    id: "tc-002",
    type: "table_completion",
    level: "B1",
    title: "Three Famous Long Walks",
    topic: "Geography · Tourism",
    passage:
`Long-distance hiking trails have become one of the fastest-growing forms of adventure tourism. The Camino de Santiago, an ancient pilgrimage route across northern Spain, runs about 800 kilometres from the French border to the Atlantic coast and is typically completed in around five weeks. Pilgrims have walked it since the ninth century, originally for religious reasons.

The Appalachian Trail in the eastern United States is roughly 3,500 kilometres long and crosses fourteen states between Georgia and Maine. Most "thru-hikers" need around six months to complete it. Established by volunteer hiking clubs in the 1920s and 1930s, the trail is now maintained by a partnership of federal agencies and non-profit organisations.

In New Zealand, the Te Araroa is much newer: officially opened only in 2011, it stretches about 3,000 kilometres along the entire length of the country, from the northern tip of North Island to the southern coast of South Island.`,
    instructions: "Complete the table below. Write NO MORE THAN TWO WORDS OR A NUMBER from the passage for each gap.",
    visual:
`┌────────────────────┬──────────────────┬───────────────────────┐
│ Trail              │ Approx. length   │ Country / Region      │
├────────────────────┼──────────────────┼───────────────────────┤
│ Camino de Santiago │ (1) ___ km       │ northern Spain        │
│ Appalachian Trail  │ 3,500 km         │ (2) ___                │
│ Te Araroa          │ 3,000 km         │ (3) ___                │
└────────────────────┴──────────────────┴───────────────────────┘`,
    items: [
      { prompt: "Cell (1) — Camino de Santiago length", answer: "800" },
      { prompt: "Cell (2) — Appalachian Trail country", answer: "United States", acceptable: ["the United States", "USA", "the USA", "U.S.", "America"] },
      { prompt: "Cell (3) — Te Araroa country",         answer: "New Zealand" },
    ],
    analysis:
`(1) → 800. "The Camino de Santiago… runs about 800 kilometres."
(2) → United States. "The Appalachian Trail in the eastern United States."
(3) → New Zealand. "In New Zealand, the Te Araroa…"`,
  },

  // ───────────────────── 13. Flow Chart Completion ─────────────────────
  {
    id: "fc-001",
    type: "flow_chart_completion",
    level: "B1",
    title: "How Lightning Forms",
    topic: "Atmospheric science",
    passage:
`Lightning develops inside towering cumulonimbus clouds when warm, moist air rises rapidly from the ground. As this air climbs, water vapour cools and condenses into droplets and tiny ice crystals. Within the cloud, lighter ice crystals are carried upward by strong updrafts while heavier hail-like particles, called graupel, fall toward the base. Collisions between these rising and falling particles transfer electric charge: the upper region of the cloud becomes positively charged while the lower region becomes strongly negative.

When the voltage difference between the cloud's negative base and the positively charged ground below grows large enough, the electric field overcomes the air's natural insulation. A faint, invisible "stepped leader" descends from the cloud in jumps, and once it reaches close to the ground, an upward streamer rises from a tall object such as a tree. The two meet, completing the circuit, and a brilliant return stroke surges back up the channel, producing the visible flash of lightning and a sudden expansion of air that we hear as thunder.`,
    instructions: "Complete the flow chart below using NO MORE THAN TWO WORDS from the passage for each gap.",
    visual:
`Step 1: Warm, moist air RISES rapidly from the ground.
   ↓
Step 2: Water vapour cools and condenses into droplets and (1) ___.
   ↓
Step 3: Updrafts carry ice crystals upward; heavier graupel falls down. Charges separate.
   ↓
Step 4: Voltage difference grows; electric field overcomes the air's natural (2) ___.
   ↓
Step 5: A stepped leader descends and meets an upward (3) ___ from the ground.
   ↓
Step 6: Return stroke surges up the channel — visible flash + thunder.`,
    items: [
      { prompt: "Gap (1)", answer: "ice crystals", acceptable: ["tiny ice crystals"] },
      { prompt: "Gap (2)", answer: "insulation" },
      { prompt: "Gap (3)", answer: "streamer" },
    ],
    analysis:
`(1) → ice crystals. "Water vapour cools and condenses into droplets and tiny ice crystals."

(2) → insulation. "The electric field overcomes the air's natural insulation."

(3) → streamer. "An upward streamer rises from a tall object such as a tree."

Flow charts test your ability to follow a SEQUENCE. The order of the boxes always matches the order of events in the passage, so read in order and check each gap against the corresponding sentence.`,
  },
  {
    id: "fc-002",
    type: "flow_chart_completion",
    level: "B1",
    title: "How Bread Is Made in a Bakery",
    topic: "Food science",
    passage:
`Industrial bread-making follows a remarkably consistent sequence. The baker first weighs flour, water, salt and yeast and combines them in a large mechanical mixer. The dough is then kneaded for several minutes until it becomes smooth and elastic. Next comes the first rising stage, called bulk fermentation, during which the dough is left in a warm, humid room while the yeast produces carbon dioxide and develops the bread's flavour.

After bulk fermentation, the dough is divided into individual portions and shaped, either by hand or by machine. The shaped pieces are placed on trays and given a second, shorter rising period known as proofing. Finally, the proofed loaves are loaded into a hot oven, where they bake until the crust turns golden brown and the internal temperature reaches around 95 °C. The finished bread is then cooled on racks before slicing and packaging.`,
    instructions: "Complete the flow chart below using NO MORE THAN TWO WORDS from the passage for each gap.",
    visual:
`Step 1: Weigh ingredients and combine them in a (1) ___.
   ↓
Step 2: Knead the dough until smooth and elastic.
   ↓
Step 3: Bulk fermentation — yeast produces (2) ___ and develops flavour.
   ↓
Step 4: Divide and shape the dough into portions.
   ↓
Step 5: Second rising period, called (3) ___.
   ↓
Step 6: Bake until golden brown.
   ↓
Step 7: Cool on racks, then slice and package.`,
    items: [
      { prompt: "Gap (1)", answer: "mixer", acceptable: ["mechanical mixer", "large mixer"] },
      { prompt: "Gap (2)", answer: "carbon dioxide" },
      { prompt: "Gap (3)", answer: "proofing" },
    ],
    analysis:
`(1) → mixer. "Combines them in a large mechanical mixer." Both "mixer" and "mechanical mixer" stay within the two-word limit.

(2) → carbon dioxide. "The yeast produces carbon dioxide and develops the bread's flavour."

(3) → proofing. "A second, shorter rising period known as proofing."`,
  },

  // ───────────────────── 14. Diagram Completion ─────────────────────
  {
    id: "dc-001",
    type: "diagram_completion",
    level: "B1",
    title: "The Structure of a Wind Turbine",
    topic: "Engineering",
    passage:
`A modern horizontal-axis wind turbine consists of three main external parts. At the top, three long aerodynamic blades — typically made of fibreglass-reinforced plastic — capture the energy of the wind and rotate around a central hub. Behind the hub sits a streamlined enclosure called the nacelle, which houses the gearbox and the generator. The nacelle can rotate horizontally on a system known as the yaw mechanism, allowing the blades to face directly into changing wind directions.

Below the nacelle, a steel tubular tower rises eighty metres or more above the ground. The tower must be strong enough to resist powerful side forces and tall enough to reach the steadier, faster winds found above the surface turbulence caused by buildings and trees. Inside the base of the tower, transformers step the generator's electricity up to the high voltage required for transmission across the grid.`,
    instructions: "Label the diagram below. Write NO MORE THAN TWO WORDS from the passage for each gap.",
    visual:
`            ╱╲           ← (1) ___ (3 of them)
       ╲   ╱  ╲   ╱
        ╲ ╱    ╲ ╱
       ┌─┴──────┴─┐
       │  (2) ___  │   ← houses gearbox & generator
       └─────┬────┘
             │
             │
             │           ← steel tubular tower
             │
             │
       ┌─────┴────┐
       │ (3) ___  │     ← step electricity up to grid voltage
       └──────────┘`,
    items: [
      { prompt: "Label (1) — long aerodynamic parts that capture the wind", answer: "blades", acceptable: ["aerodynamic blades"] },
      { prompt: "Label (2) — streamlined enclosure behind the hub",         answer: "nacelle" },
      { prompt: "Label (3) — devices at the base of the tower",             answer: "transformers" },
    ],
    analysis:
`(1) → blades. "Three long aerodynamic blades… capture the energy of the wind."
(2) → nacelle. "A streamlined enclosure called the nacelle, which houses the gearbox and the generator."
(3) → transformers. "Inside the base of the tower, transformers step the generator's electricity up."

In Diagram Completion the visual position of each label hints at the part of the passage you need. Look for the same TYPE of noun (component, layer, organ, etc.) the diagram is asking about.`,
  },
  {
    id: "dc-002",
    type: "diagram_completion",
    level: "B1",
    title: "The Layers of the Atmosphere",
    topic: "Earth science",
    passage:
`The Earth's atmosphere is divided into five distinct layers based on temperature changes with altitude. The lowest layer, the troposphere, extends from the surface up to roughly 12 kilometres and is where almost all weather takes place. Above it lies the stratosphere, reaching to about 50 kilometres, which contains the ozone layer that absorbs ultraviolet radiation from the Sun.

Higher still is the mesosphere, where most meteors entering the atmosphere burn up due to friction with the increasingly thin air. Above 80 kilometres lies the thermosphere, which can reach extraordinary temperatures of more than 1,500 °C as a result of intense solar radiation; this is also where many auroras occur. The outermost layer is the exosphere, which gradually fades into the vacuum of space.`,
    instructions: "Label the diagram below. Write NO MORE THAN TWO WORDS from the passage for each gap.",
    visual:
`Highest ↑
          ┌────────────────────────┐
          │ Exosphere              │
          ├────────────────────────┤
          │ (1) ___                │ ← auroras occur here
          ├────────────────────────┤
          │ Mesosphere             │ ← meteors burn up
          ├────────────────────────┤
          │ Stratosphere           │ ← contains the (2) ___
          ├────────────────────────┤
          │ (3) ___                │ ← almost all weather
          └────────────────────────┘
Earth's surface`,
    items: [
      { prompt: "Label (1)", answer: "thermosphere" },
      { prompt: "Label (2)", answer: "ozone layer" },
      { prompt: "Label (3)", answer: "troposphere" },
    ],
    analysis:
`(1) → thermosphere. "Above 80 kilometres lies the thermosphere… this is also where many auroras occur."

(2) → ozone layer. "The stratosphere… which contains the ozone layer."

(3) → troposphere. "The lowest layer, the troposphere, extends from the surface up to roughly 12 kilometres and is where almost all weather takes place."`,
  },

  // ═════════════════════ ROUND 2 (one more per type) ═════════════════════

  // 1. Matching Headings — extra
  {
    id: "mh-003",
    type: "matching_headings",
    level: "B1",
    title: "The Rise of Electric Vehicles",
    topic: "Technology · Transport",
    passage:
`[A] Although they often seem like a recent invention, electric cars in fact predate the internal combustion engine. Working prototypes were demonstrated in Europe and the United States as early as the 1830s, and by 1900 around a third of all vehicles on American roads were electric. Cheaper petrol and longer driving ranges, however, soon pushed them aside.

[B] Modern interest in electric vehicles is driven by two converging pressures: tightening air-quality rules in major cities, and the global commitment to cut greenhouse-gas emissions. Several European countries have announced that the sale of new petrol and diesel cars will be banned within the next decade.

[C] The remaining obstacles are practical rather than technical. Charging networks are still patchy outside large cities, and second-hand buyers worry about the long-term cost of replacing a battery pack. Governments are responding with grants for chargers and warranties on battery life, but progress remains uneven from country to country.`,
    instructions: "Choose the most suitable heading for each paragraph A–C from the list of headings i–v. There are more headings than paragraphs.",
    options: [
      { label: "i",   text: "An older history than people assume" },
      { label: "ii",  text: "Why fossil-fuel cars first won out" },
      { label: "iii", text: "Pressures pushing the modern revival" },
      { label: "iv",  text: "Practical barriers that still remain" },
      { label: "v",   text: "How electric motors actually work" },
    ],
    items: [
      { prompt: "Paragraph A", answer: "i" },
      { prompt: "Paragraph B", answer: "iii" },
      { prompt: "Paragraph C", answer: "iv" },
    ],
    analysis:
`A → i. The whole paragraph stresses that EVs "predate the internal combustion engine" and were already common around 1900 — they have a longer history than people assume.

B → iii. The paragraph names two converging pressures: city air-quality rules and the climate commitment to cut emissions.

C → iv. The paragraph focuses on the remaining "practical rather than technical" obstacles: charging networks and battery cost.

Distractor ii is tempting because A briefly mentions cheaper petrol pushing EVs aside, but that's only one sentence — not the main point of A. v (how motors work) isn't in the passage at all.`,
  },

  // 2. Matching Information — extra
  {
    id: "mi-003",
    type: "matching_information",
    level: "B1",
    title: "Reviving the Wolf",
    topic: "Ecology · Conservation",
    passage:
`[A] By the early twentieth century, grey wolves had been almost entirely eliminated from the contiguous United States. Hunters and farmers, encouraged by federal bounties, had targeted the species relentlessly because of attacks on livestock. By 1960, fewer than a thousand individuals were thought to survive south of the Canadian border.

[B] Attitudes began to shift in the 1970s. The Endangered Species Act of 1973 gave wolves federal protection, and ecologists began to argue that their absence had unbalanced entire ecosystems. Without wolves to control them, deer and elk populations had grown so large that young trees and riverside vegetation were being stripped bare.

[C] The clearest demonstration came in 1995, when biologists released 31 wolves into Yellowstone National Park. Within a decade, elk numbers had fallen, willows and aspens had begun to regrow, and beavers had returned to streams that had lost them. Even rivers ran differently as stabilised banks slowed their flow.

[D] Not everyone has welcomed the wolves' return. Ranchers near the park complain about livestock losses, and some state governments have authorised limited hunting once wolf numbers exceed a certain threshold. Compensation schemes for farmers have eased — but not ended — the conflict.`,
    instructions: "Which paragraph (A, B, C or D) contains the following information?",
    items: [
      { prompt: "1. A specific number of wolves released into a park",       answer: "C" },
      { prompt: "2. A reason farmers traditionally opposed wolves",          answer: "A" },
      { prompt: "3. The name of a law that protected the species",            answer: "B" },
      { prompt: "4. A measure used to reduce conflict with farmers today",    answer: "D" },
    ],
    analysis:
`1 → C. Paragraph C says biologists "released 31 wolves into Yellowstone National Park" in 1995.
2 → A. Paragraph A explains farmers targeted wolves "because of attacks on livestock".
3 → B. Paragraph B names the "Endangered Species Act of 1973".
4 → D. Paragraph D mentions "Compensation schemes for farmers" as a tool to ease conflict.`,
  },

  // 3. Matching Features — extra
  {
    id: "mf-003",
    type: "matching_features",
    level: "B1",
    title: "Three Pioneers of Flight",
    topic: "Engineering · History",
    passage:
`In December 1903, the American brothers Orville and Wilbur Wright achieved the first sustained, controlled flight of a powered aircraft on a beach in North Carolina. Their machine flew for just twelve seconds, but the principles they had worked out — a movable rudder, wing-warping for roll control, and a lightweight engine of their own design — set the pattern for almost all later aeroplanes.

A different breakthrough came in 1927, when the American aviator Charles Lindbergh became the first person to fly solo, non-stop across the Atlantic Ocean, from New York to Paris. The 33-hour flight made aviation a global news story and convinced governments to invest seriously in passenger air services.

The third name often added to the list is the British engineer Frank Whittle, who in 1937 ran the first successful jet engine on a test bench. Although the technology was not used in commercial flight until after the Second World War, jet propulsion eventually replaced piston engines on almost every airliner.`,
    instructions: "Match each pioneer (1–3) with the achievement (A–E). There are more achievements than pioneers.",
    options: [
      { label: "A", text: "First powered, controlled flight" },
      { label: "B", text: "Built the first commercial helicopter" },
      { label: "C", text: "First solo non-stop crossing of the Atlantic" },
      { label: "D", text: "Successful test of the first jet engine" },
      { label: "E", text: "Invented the parachute" },
    ],
    items: [
      { prompt: "1. The Wright Brothers", answer: "A" },
      { prompt: "2. Charles Lindbergh",   answer: "C" },
      { prompt: "3. Frank Whittle",       answer: "D" },
    ],
    analysis:
`Wright Brothers → A. "First sustained, controlled flight of a powered aircraft."
Lindbergh → C. "First person to fly solo, non-stop across the Atlantic Ocean."
Whittle → D. "Ran the first successful jet engine on a test bench."

Distractors B (helicopter) and E (parachute) are not mentioned in the passage at all — never pick a feature that doesn't appear in the text.`,
  },

  // 4. Matching Sentence Endings — extra
  {
    id: "mse-003",
    type: "matching_sentence_endings",
    level: "B1",
    title: "Why We Yawn",
    topic: "Biology · Psychology",
    passage:
`Yawning is one of the most familiar behaviours in the animal kingdom, yet its function remains debated. The oldest theory held that yawning increases the supply of oxygen to the brain, but careful experiments have shown that breathing high-oxygen air does not reduce the urge to yawn at all. A more recent hypothesis suggests that yawning helps cool the brain by drawing air into the mouth and nose; supporters point to studies in which subjects yawned more often when their foreheads were warmed than when they were cooled.

Whatever its physiological purpose, yawning has a striking social dimension. People who watch others yawn — even on screen — are far more likely to yawn themselves, and the effect is strongest between close friends and family members. Researchers believe that contagious yawning may have evolved as a way of synchronising rest periods within a social group.`,
    instructions: "Complete each sentence (1–3) with the correct ending (A–E). There are more endings than you need.",
    options: [
      { label: "A", text: "is strongest between people who know each other well." },
      { label: "B", text: "helps cool the brain by drawing in air." },
      { label: "C", text: "is unique to human beings." },
      { label: "D", text: "may keep a social group's rest patterns in step." },
      { label: "E", text: "has been disproved by modern experiments." },
    ],
    items: [
      { prompt: "1. The old idea that yawning brings more oxygen to the brain", answer: "E" },
      { prompt: "2. Contagious yawning",                                          answer: "A" },
      { prompt: "3. The evolutionary purpose of contagious yawning",              answer: "D" },
    ],
    analysis:
`1 → E. The passage says careful experiments showed extra oxygen "does not reduce the urge to yawn at all" — i.e. the old idea has been disproved.

2 → A. "The effect is strongest between close friends and family members."

3 → D. "Contagious yawning may have evolved as a way of synchronising rest periods within a social group."

Don't choose B for question 3: cooling the brain is a personal, physiological theory — not specifically about contagious yawning.`,
  },

  // 5. True / False / Not Given — extra
  {
    id: "tfng-003",
    type: "true_false_not_given",
    level: "B1",
    title: "Easter Island's Statues",
    topic: "Archaeology",
    passage:
`Easter Island, a remote volcanic outcrop in the South Pacific, is famous for the nearly 900 giant stone figures known as moai that line its coast. The statues were carved from compressed volcanic ash between roughly 1100 and 1600 CE by the island's Polynesian inhabitants. Most stand between three and five metres tall, although the largest ever erected is more than nine metres high. Recent archaeological work has shown that almost all moai once carried separate cylindrical "topknots" carved from a different, redder stone.

How the islanders moved the heavy figures from the quarry to their final platforms has been debated for centuries. Early European visitors assumed wooden rollers must have been used, but no large trees survived on the island by the time of contact. Experiments in 2012 demonstrated that small teams of people could "walk" a five-tonne replica upright, using ropes attached to its sides — matching local oral traditions that the moai "walked" to their positions.`,
    instructions: "Decide whether each statement agrees with the information in the passage. Choose TRUE, FALSE, or NOT GIVEN.",
    items: [
      { prompt: "1. The moai were carved from volcanic ash.",                                answer: "TRUE" },
      { prompt: "2. All moai are exactly the same height.",                                  answer: "FALSE" },
      { prompt: "3. The topknots were made of the same stone as the bodies.",                answer: "FALSE" },
      { prompt: "4. The Polynesians arrived on the island from New Zealand.",                answer: "NOT GIVEN" },
      { prompt: "5. The 2012 experiment supported one of the island's oral traditions.",     answer: "TRUE" },
    ],
    analysis:
`1 → TRUE. "Carved from compressed volcanic ash."
2 → FALSE. The passage gives a range (3–5 m, with the largest 9+ m), so they are NOT all the same height.
3 → FALSE. The passage says topknots were carved from "a different, redder stone".
4 → NOT GIVEN. The Polynesians are mentioned, but the passage never says where they came from.
5 → TRUE. The 2012 experiment matched local oral traditions that the moai "walked" to their positions.`,
  },

  // 6. Multiple Choice — extra
  {
    id: "mc-003",
    type: "multiple_choice",
    level: "B1",
    title: "Memory and Music",
    topic: "Neuroscience",
    passage:
`Songs encountered in adolescence appear to occupy a special place in human memory. Surveys of older adults consistently find that the music they remember most vividly, and report enjoying most strongly even decades later, was the music popular when they were aged roughly 12 to 22. Psychologists call this pattern the "reminiscence bump", and it has been observed in many cultures where the question has been studied.

One leading explanation is biological: brain regions involved in emotional response and memory consolidation are still maturing during adolescence, so musical experiences in those years are encoded with unusual depth. A second, social explanation suggests that adolescence is when people most actively form their identities, and the soundtrack of that process becomes inseparable from how they remember themselves. The two explanations are not mutually exclusive — most researchers believe both factors contribute.`,
    instructions: "Choose the correct letter, A, B, C or D.",
    options: [
      { label: "A", text: "Older adults usually prefer the music of their childhood years (ages 0–10)." },
      { label: "B", text: "The reminiscence bump occurs because adolescents listen to more music." },
      { label: "C", text: "Researchers think both biological and social factors are responsible." },
      { label: "D", text: "The reminiscence bump has only been observed in Western countries." },
    ],
    items: [
      { prompt: "Which statement is supported by the passage?", answer: "C" },
    ],
    analysis:
`C is correct. The final sentence states "most researchers believe both factors contribute".

A is wrong: the bump covers ages 12–22, not childhood.
B is wrong: the passage gives biological and social reasons, not "more listening".
D is wrong: it's been "observed in many cultures", not only Western ones.`,
  },

  // 7. List Selection — extra
  {
    id: "ls-003",
    type: "list_selection",
    level: "B1",
    title: "Effective Language Learning",
    topic: "Education",
    passage:
`Studies of adult language learners have identified several practices that significantly accelerate progress. Distributed practice — short, regular sessions rather than long, occasional ones — produces stronger long-term retention. Active retrieval, in which learners try to recall vocabulary or grammar from memory before checking, also outperforms passive review such as re-reading a list. Speaking with native speakers, even for short conversations, gives the learner real-time pronunciation feedback that classroom drills cannot easily reproduce.

Other widely advertised techniques are less helpful than they appear. Watching films in a target language without subtitles is enjoyable but, for beginners, often produces only minimal vocabulary gain. Listening to language recordings while sleeping has been investigated repeatedly and shown no measurable benefit. And paying for very expensive software does not, on its own, guarantee faster results.`,
    instructions: "Which THREE practices are described as effective ways to learn a language? Choose THREE answers (A–F).",
    options: [
      { label: "A", text: "Short, regular study sessions" },
      { label: "B", text: "Listening to recordings while asleep" },
      { label: "C", text: "Trying to recall vocabulary before checking" },
      { label: "D", text: "Watching films without subtitles as a beginner" },
      { label: "E", text: "Speaking with native speakers" },
      { label: "F", text: "Buying very expensive learning software" },
    ],
    items: [
      { prompt: "Choose THREE letters.", answer: ["A", "C", "E"] },
    ],
    analysis:
`A — "Distributed practice — short, regular sessions… produces stronger long-term retention."
C — "Active retrieval… outperforms passive review."
E — "Speaking with native speakers… gives the learner real-time pronunciation feedback."

B, D and F are all explicitly listed under "less helpful than they appear" — classic List Selection traps.`,
  },

  // 8. Choose a Title — extra
  {
    id: "ct-003",
    type: "choose_title",
    level: "B1",
    title: "(See passage)",
    topic: "History · Food",
    passage:
`Few foods have travelled as widely as the chilli pepper. Native to Central and South America, where it had been cultivated for at least six thousand years, it was unknown elsewhere until Spanish and Portuguese ships carried it across the Atlantic in the late 1400s. Within a single century the chilli had spread along trade routes from Lisbon to West Africa, India, China and Korea — often becoming so deeply embedded in local cooking that people now think of it as native.

The reasons for its rapid adoption are practical. Chilli plants grow easily in many climates, dry well for storage, and add intense flavour to otherwise plain staple grains. They also contain capsaicin, a chemical that triggers the brain's pain receptors but, paradoxically, releases endorphins that produce a mild sense of pleasure. That combination of cheap, storable bulk and addictive flavour is hard to match.`,
    instructions: "Choose the most appropriate title for the whole passage.",
    options: [
      { label: "A", text: "How chillies became a global ingredient" },
      { label: "B", text: "The medical benefits of capsaicin" },
      { label: "C", text: "Spanish exploration of the Americas" },
      { label: "D", text: "Why some people dislike spicy food" },
    ],
    items: [
      { prompt: "Choose A, B, C or D.", answer: "A" },
    ],
    analysis:
`A is correct: the passage covers the chilli's American origin, its rapid spread by ship, and the practical reasons for its global adoption — all aspects of becoming a global ingredient.

B is too narrow (capsaicin is one detail). C is the means, not the topic. D isn't discussed.`,
  },

  // 9. Short Answer — extra
  {
    id: "sa-003",
    type: "short_answer",
    level: "B1",
    title: "The Story of Aspirin",
    topic: "Medicine · History",
    passage:
`The pain-relieving properties of willow bark were known to physicians as early as ancient Egypt. In 1828, the German pharmacist Johann Buchner isolated the active compound, salicin, from willow extract. Pure salicin and its derivative salicylic acid, however, badly irritated the stomachs of patients who took them.

The breakthrough came in 1897 at the German chemical firm Bayer, where the chemist Felix Hoffmann produced a less aggressive form known as acetylsalicylic acid. Bayer began marketing it under the trade name Aspirin in 1899, and it quickly became one of the most widely used medicines in the world. Today, daily low-dose aspirin is also prescribed to reduce the risk of heart attacks in adults at high cardiovascular risk.`,
    instructions: "Answer the questions below using NO MORE THAN THREE WORDS from the passage for each answer.",
    items: [
      { prompt: "1. Who first isolated salicin from willow extract?",   answer: "Johann Buchner" },
      { prompt: "2. What chemical name describes Aspirin?",              answer: "acetylsalicylic acid" },
      { prompt: "3. Which company began marketing Aspirin in 1899?",     answer: "Bayer" },
    ],
    analysis:
`1 → Johann Buchner. "The German pharmacist Johann Buchner isolated the active compound, salicin."
2 → acetylsalicylic acid. "A less aggressive form known as acetylsalicylic acid."
3 → Bayer. "Bayer began marketing it under the trade name Aspirin in 1899."`,
  },

  // 10. Sentence Completion — extra
  {
    id: "sc-003",
    type: "sentence_completion",
    level: "B1",
    title: "The Mona Lisa",
    topic: "Art · History",
    passage:
`Painted by Leonardo da Vinci between approximately 1503 and 1519, the Mona Lisa is probably the most famous portrait in the world. It is unusually small — only 77 by 53 centimetres — and is painted in oil on a thin panel of poplar wood. The subject is widely believed to be Lisa Gherardini, the wife of a Florentine merchant, although the identification has never been confirmed beyond doubt.

The painting was acquired by the French king François I and has hung in the Louvre Museum since 1797. Its global fame, however, dates only from 1911, when an Italian workman named Vincenzo Peruggia stole the painting and hid it for two years before being caught while trying to sell it. The dramatic theft transformed the Mona Lisa from a respected artwork into a household name.`,
    instructions: "Complete the sentences below using NO MORE THAN TWO WORDS OR A NUMBER from the passage for each gap.",
    items: [
      { prompt: "1. The Mona Lisa was painted on a panel of ___.",                  answer: "poplar wood", acceptable: ["poplar"] },
      { prompt: "2. The painting has hung in the Louvre Museum since ___.",          answer: "1797" },
      { prompt: "3. The thief who took the painting in 1911 was named ___.",         answer: "Vincenzo Peruggia", acceptable: ["Peruggia"] },
    ],
    analysis:
`1 → poplar wood. "Painted in oil on a thin panel of poplar wood."
2 → 1797. "Has hung in the Louvre Museum since 1797."
3 → Vincenzo Peruggia. The thief is named in the second paragraph.`,
  },

  // 11. Summary Completion — extra
  {
    id: "smc-003",
    type: "summary_completion",
    level: "B1",
    title: "Why Glaciers Are Retreating",
    topic: "Environment · Geology",
    passage:
`Mountain glaciers around the world are losing mass faster than at any time in recorded history. Satellite measurements taken over the past forty years show that the average glacier is now thinner by several metres each decade, and many small glaciers in the European Alps are expected to disappear entirely within the next century. The main driver is well established: rising air temperatures caused by greenhouse-gas emissions melt more ice in summer than fresh snow can replace in winter.

The consequences extend far beyond the mountains themselves. Roughly two billion people, most of them in Asia, depend on rivers fed by glacier meltwater for drinking water, agriculture and hydroelectric power. As glaciers shrink, river flows will at first increase and then, once the ice is largely gone, fall dramatically — particularly during dry seasons.`,
    instructions: "Complete the summary using NO MORE THAN TWO WORDS from the passage for each gap.",
    items: [
      { prompt: "1. The main cause of glacier retreat is rising ___.",                              answer: "air temperatures", acceptable: ["temperatures"] },
      { prompt: "2. Many small glaciers in the European ___ may vanish within a century.",          answer: "Alps" },
      { prompt: "3. Around ___ people depend on glacier-fed rivers.",                                answer: "two billion" },
      { prompt: "4. Once the ice is gone, river flows will fall sharply, especially in ___ seasons.", answer: "dry" },
    ],
    analysis:
`1 → air temperatures. "Rising air temperatures caused by greenhouse-gas emissions."
2 → Alps. "Small glaciers in the European Alps are expected to disappear."
3 → two billion. "Roughly two billion people… depend on rivers fed by glacier meltwater."
4 → dry. "Fall dramatically — particularly during dry seasons."`,
  },

  // 12. Table Completion — extra
  {
    id: "tc-003",
    type: "table_completion",
    level: "B1",
    title: "Three of the World's Tallest Buildings",
    topic: "Architecture · Engineering",
    passage:
`The race to build the world's tallest skyscraper has accelerated since the turn of the century, with cities in the Middle East and East Asia now leading the field. Completed in Dubai in 2010, the Burj Khalifa stands 828 metres tall and held the world record for over a decade. Its 163 floors are served by some of the fastest elevators ever built, climbing at up to 10 metres per second.

The Shanghai Tower, completed in 2015, has a twisted form that engineers calculated would reduce wind load by around a quarter compared with a square design. At 632 metres it is China's tallest building. In Saudi Arabia, the Jeddah Tower has been under construction for over a decade and is planned to reach more than 1,000 metres on completion, which would make it the first building anywhere to exceed one kilometre in height.`,
    instructions: "Complete the table below. Write NO MORE THAN TWO WORDS OR A NUMBER from the passage for each gap.",
    visual:
`┌────────────────┬───────────┬────────────────┬───────────────────────────┐
│ Building       │ City      │ Height (metres)│ Notable feature           │
├────────────────┼───────────┼────────────────┼───────────────────────────┤
│ Burj Khalifa   │ Dubai     │ (1) ___        │ very fast elevators       │
│ Shanghai Tower │ Shanghai  │ 632            │ twisted form reduces (2) ___│
│ Jeddah Tower   │ Jeddah    │ over (3) ___   │ first to exceed one km    │
└────────────────┴───────────┴────────────────┴───────────────────────────┘`,
    items: [
      { prompt: "Cell (1)", answer: "828" },
      { prompt: "Cell (2)", answer: "wind load" },
      { prompt: "Cell (3)", answer: "1,000", acceptable: ["1000", "one thousand"] },
    ],
    analysis:
`(1) → 828. "The Burj Khalifa stands 828 metres tall."
(2) → wind load. The twisted form was calculated "would reduce wind load by around a quarter."
(3) → 1,000. The Jeddah Tower "is planned to reach more than 1,000 metres."`,
  },

  // 13. Flow Chart Completion — extra
  {
    id: "fc-003",
    type: "flow_chart_completion",
    level: "B1",
    title: "Recycling an Aluminium Can",
    topic: "Industry · Environment",
    passage:
`Aluminium drinks cans are among the most efficiently recycled products in the world; recycling them uses about 95 per cent less energy than producing new aluminium from raw ore. The process begins when discarded cans are collected and transported to a recycling plant. There they are shredded into small flakes and passed under a powerful magnet, which removes any steel cans accidentally mixed in.

The cleaned aluminium flakes are then heated in a large furnace until they melt at around 660 °C. Any paint or lacquer left on the surface burns off as the metal liquefies. The molten aluminium is poured into moulds to form solid blocks called ingots, which are rolled into thin sheets at a separate mill. The new sheets are sold to can makers, who can press them into fresh drinks cans within as little as sixty days from the original can being thrown away.`,
    instructions: "Complete the flow chart below using NO MORE THAN TWO WORDS from the passage for each gap.",
    visual:
`Step 1: Used cans collected and taken to a recycling plant.
   ↓
Step 2: Cans shredded into flakes.
   ↓
Step 3: A (1) ___ removes any steel mixed in.
   ↓
Step 4: Flakes melted in a furnace at around 660 °C.
   ↓
Step 5: Molten aluminium poured into moulds to form (2) ___.
   ↓
Step 6: Ingots rolled into thin (3) ___ at a separate mill.
   ↓
Step 7: Sheets sold to can makers and pressed into new cans.`,
    items: [
      { prompt: "Gap (1)", answer: "magnet", acceptable: ["powerful magnet"] },
      { prompt: "Gap (2)", answer: "ingots" },
      { prompt: "Gap (3)", answer: "sheets" },
    ],
    analysis:
`(1) → magnet. "Passed under a powerful magnet, which removes any steel cans."
(2) → ingots. "Solid blocks called ingots."
(3) → sheets. "Rolled into thin sheets at a separate mill."`,
  },

  // 14. Diagram Completion — extra
  {
    id: "dc-003",
    type: "diagram_completion",
    level: "B1",
    title: "The Human Ear",
    topic: "Biology",
    passage:
`The human ear consists of three connected regions, each with a distinct role in hearing. Sound waves first enter the visible outer ear and travel down the ear canal until they strike the eardrum, a thin membrane that vibrates in response. These vibrations are passed across the air-filled middle ear by three of the smallest bones in the body — the hammer, the anvil and the stirrup — which together amplify the signal.

The amplified vibrations then enter the cochlea, a fluid-filled spiral structure in the inner ear. Tiny hair cells lining the cochlea convert the mechanical movement into electrical signals, which travel along the auditory nerve to the brain. Damage to these hair cells, often caused by loud noise over many years, is the most common reason for permanent hearing loss in adults.`,
    instructions: "Label the diagram below. Write NO MORE THAN TWO WORDS from the passage for each gap.",
    visual:
`Outer ear                Middle ear                    Inner ear
  ┌─────────┐  ┌──────────────────────┐  ┌─────────────────────────┐
  │ ear     │  │ (1) ___ vibrates     │  │ (2) ___ contains hair   │
  │ canal   │→│ → 3 small bones      │→│   cells → electrical     │
  │         │  │ amplify the signal   │  │   signals               │
  └─────────┘  └──────────────────────┘  └────────┬────────────────┘
                                                   │
                                          (3) ___ nerve → brain`,
    items: [
      { prompt: "Label (1) — thin membrane at the end of the ear canal", answer: "eardrum" },
      { prompt: "Label (2) — fluid-filled spiral in the inner ear",       answer: "cochlea" },
      { prompt: "Label (3) — nerve carrying signals to the brain",         answer: "auditory" },
    ],
    analysis:
`(1) → eardrum. "Strike the eardrum, a thin membrane that vibrates."
(2) → cochlea. "The cochlea, a fluid-filled spiral structure in the inner ear."
(3) → auditory. "Travel along the auditory nerve to the brain."`,
  },

  // ═════════════════════ ROUND 3 (4 more per type → 7 per type total) ═════════════════════

  // ───────── 1. Matching Headings ─────────
  {
    id: "mh-004", type: "matching_headings", level: "B1", title: "Plastic in the Ocean", topic: "Environment",
    passage:
`[A] Around 8 million tonnes of plastic enter the world's oceans each year. Most of it originates not at sea but on land, washed down rivers from poorly managed waste in coastal cities. The five rivers responsible for the largest share of this flow are all in Asia.

[B] Once in the ocean, plastic does not biodegrade. Instead, sunlight and waves break larger pieces into microplastics smaller than five millimetres. These tiny fragments are now found in every part of the ocean, from tropical reefs to deep Arctic ice cores.

[C] The damage to wildlife is well documented. Seabirds and turtles mistake floating plastic for food, and tiny zooplankton ingest microplastics that pass on through the food chain. Researchers warn that the long-term effects on human health, who sit at the top of that chain, are still poorly understood.`,
    instructions: "Choose the most suitable heading for each paragraph A–C from the list i–v. There are more headings than paragraphs.",
    options: [
      { label: "i",   text: "Where most ocean plastic comes from" },
      { label: "ii",  text: "How plastic breaks down at sea" },
      { label: "iii", text: "Recent fishing-net technology" },
      { label: "iv",  text: "Effects on animals and possibly people" },
      { label: "v",   text: "Government recycling targets" },
    ],
    items: [
      { prompt: "Paragraph A", answer: "i" },
      { prompt: "Paragraph B", answer: "ii" },
      { prompt: "Paragraph C", answer: "iv" },
    ],
    analysis:
`A → i (sources: rivers, coastal cities, Asian rivers).
B → ii (sunlight/waves break plastic into microplastics).
C → iv (effects on wildlife and possibly humans).
iii and v don't appear in the passage.`,
  },
  {
    id: "mh-005", type: "matching_headings", level: "B1", title: "Antarctic Exploration", topic: "History",
    passage:
`[A] For most of human history, Antarctica was unknown. Although ancient Greek geographers had speculated about a great southern continent, the first confirmed sighting was made by a Russian naval expedition in 1820.

[B] The early decades of the twentieth century became the so-called "Heroic Age" of Antarctic exploration. Teams led by Robert Falcon Scott of Britain, Roald Amundsen of Norway and Ernest Shackleton of Ireland competed to reach the South Pole and to map the continent's coast.

[C] Modern Antarctic activity is governed by the 1959 Antarctic Treaty, which set the continent aside for peaceful science. Forty-six nations now operate research bases there, studying everything from climate change to extreme biology.`,
    instructions: "Choose the most suitable heading for each paragraph A–C from the list i–v.",
    options: [
      { label: "i", text: "An age of competing expeditions" },
      { label: "ii", text: "Tourism on the continent" },
      { label: "iii", text: "From speculation to discovery" },
      { label: "iv", text: "International cooperation today" },
      { label: "v", text: "Wildlife of the polar seas" },
    ],
    items: [
      { prompt: "Paragraph A", answer: "iii" },
      { prompt: "Paragraph B", answer: "i" },
      { prompt: "Paragraph C", answer: "iv" },
    ],
    analysis:
`A → iii (ancient speculation → first confirmed sighting in 1820).
B → i (Scott vs Amundsen vs Shackleton — competing expeditions).
C → iv (the 1959 treaty and 46 nations cooperating).`,
  },
  {
    id: "mh-006", type: "matching_headings", level: "B1", title: "The Origins of Writing", topic: "History · Linguistics",
    passage:
`[A] Writing was invented independently in only a handful of places. The earliest known system, cuneiform, appeared in Mesopotamia around 3200 BCE and used wedge-shaped marks pressed into wet clay. Egyptian hieroglyphs and Chinese script developed later but probably without contact with cuneiform.

[B] Most early writing was developed not for literature but for administration. The first cuneiform tablets are records of grain, livestock and taxes — the bookkeeping of expanding cities that could no longer rely on memory alone.

[C] As writing spread, simpler systems gradually replaced the elaborate originals. Around 1500 BCE, traders in the eastern Mediterranean developed the first true alphabet, in which a small set of signs represented sounds rather than whole words. Almost every modern alphabet descends from that single innovation.`,
    instructions: "Choose the most suitable heading for each paragraph A–C from i–v.",
    options: [
      { label: "i", text: "Why people first started writing" },
      { label: "ii", text: "The independent birth of several scripts" },
      { label: "iii", text: "How books are printed today" },
      { label: "iv", text: "From complex symbols to the alphabet" },
      { label: "v", text: "The art of calligraphy" },
    ],
    items: [
      { prompt: "Paragraph A", answer: "ii" },
      { prompt: "Paragraph B", answer: "i" },
      { prompt: "Paragraph C", answer: "iv" },
    ],
    analysis:
`A → ii (cuneiform, hieroglyphs, Chinese all invented independently).
B → i (administration, taxes — the first reasons people wrote).
C → iv (the move from elaborate scripts to a small-sign alphabet around 1500 BCE).`,
  },
  {
    id: "mh-007", type: "matching_headings", level: "B1", title: "Storing Renewable Energy", topic: "Engineering · Environment",
    passage:
`[A] Wind and solar power share an awkward feature: they generate electricity only when the wind blows or the sun shines. To match supply with demand, modern grids must store surplus energy and release it later. Without storage, much renewable generation is simply lost.

[B] The dominant technology today is the lithium-ion battery. Falling costs over the past decade have made battery farms commercially viable in many countries, and they can deliver bursts of power within milliseconds — useful for stabilising the grid.

[C] For longer-duration storage, engineers are returning to older ideas. Pumped hydroelectric schemes use surplus electricity to lift water into a high reservoir, then release it through turbines when demand peaks. Some new designs use compressed air or molten salt instead of water.`,
    instructions: "Choose the most suitable heading for each paragraph A–C.",
    options: [
      { label: "i", text: "Why storage matters for renewables" },
      { label: "ii", text: "The leading short-term technology" },
      { label: "iii", text: "Older methods adapted for long durations" },
      { label: "iv", text: "Public opposition to wind farms" },
      { label: "v", text: "How nuclear plants are decommissioned" },
    ],
    items: [
      { prompt: "Paragraph A", answer: "i" },
      { prompt: "Paragraph B", answer: "ii" },
      { prompt: "Paragraph C", answer: "iii" },
    ],
    analysis:
`A → i (without storage renewable generation is lost).
B → ii (lithium-ion is the leading current technology).
C → iii (pumped hydro, compressed air, molten salt — older ideas reused for longer-duration storage).`,
  },

  // ───────── 2. Matching Information ─────────
  {
    id: "mi-004", type: "matching_information", level: "B1", title: "A Brief History of Vaccination", topic: "Medicine",
    passage:
`[A] Long before modern medicine, observers in China and Turkey noticed that people who had survived smallpox never caught it again. By the seventeenth century, parents in both regions were deliberately exposing children to mild cases of the disease in the hope of protecting them — a practice known as variolation.

[B] In 1796, the English country doctor Edward Jenner replaced this risky procedure with a safer alternative. He noticed that milkmaids who had caught the much milder cowpox seemed immune to smallpox, and showed that deliberately infecting people with cowpox produced the same protection without the same danger. The Latin word for cow, vacca, gave the new practice its name.

[C] In the late nineteenth century, the French chemist Louis Pasteur extended the principle to other diseases. By weakening or killing the microbes responsible for rabies, anthrax and chicken cholera, he produced vaccines that could be made in a laboratory rather than relying on a natural infection.

[D] Smallpox, the disease that started it all, was finally declared eradicated by the World Health Organization in 1980 after a global vaccination campaign — the only human disease so far entirely wiped out.`,
    instructions: "Which paragraph (A, B, C or D) contains the following information?",
    items: [
      { prompt: "1. The year a major disease was declared eradicated",   answer: "D" },
      { prompt: "2. The Latin origin of the word 'vaccine'",              answer: "B" },
      { prompt: "3. A risky technique called variolation",                answer: "A" },
      { prompt: "4. Vaccines made by weakening microbes in a laboratory", answer: "C" },
    ],
    analysis:
`1 → D (smallpox eradicated 1980).
2 → B (vacca = cow).
3 → A (variolation in China and Turkey).
4 → C (Pasteur weakening microbes).`,
  },
  {
    id: "mi-005", type: "matching_information", level: "B1", title: "Exploring Mars", topic: "Science · Space",
    passage:
`[A] The first successful flyby of Mars was carried out by NASA's Mariner 4 in 1965. The mission returned 21 grainy photographs that showed a cratered, dry surface and put an end to popular speculation about Martian canals.

[B] The first soft landing on the Martian surface came in 1971 with the Soviet Union's Mars 3 probe, although it transmitted for only fifteen seconds before failing. Five years later, NASA's Viking 1 became the first lander to operate successfully for an extended period.

[C] Modern rover missions, beginning with Sojourner in 1997 and continuing through Spirit, Opportunity, Curiosity and Perseverance, have shifted the focus from photography to chemistry. Their on-board laboratories test rocks and soil for evidence that liquid water and possibly microbial life once existed on the planet.

[D] Future plans involve returning samples to Earth. Rock cores collected by Perseverance have been carefully sealed in tubes and left on the surface for a future mission, perhaps in the 2030s, to retrieve and bring home for detailed analysis.`,
    instructions: "Which paragraph (A, B, C or D) contains the following information?",
    items: [
      { prompt: "1. The first successful long-duration lander on Mars", answer: "B" },
      { prompt: "2. Plans to bring Martian rocks back to Earth",         answer: "D" },
      { prompt: "3. The end of speculation about Martian canals",         answer: "A" },
      { prompt: "4. The shift from photography to chemical analysis",     answer: "C" },
    ],
    analysis:
`1 → B (Viking 1 first long-duration lander).
2 → D (Perseverance samples for future return).
3 → A (Mariner 4 photographs ended canal speculation).
4 → C (rover labs test for water and life).`,
  },
  {
    id: "mi-006", type: "matching_information", level: "B1", title: "The Mediterranean Diet", topic: "Nutrition",
    passage:
`[A] In the 1950s, the American physiologist Ancel Keys noticed that men in southern Italy and Greece had unusually low rates of heart disease compared with their counterparts in the United States. His Seven Countries Study, launched in 1958, was the first large research programme to link diet directly with cardiovascular health.

[B] The traditional Mediterranean diet is characterised more by what it includes than by what it forbids. It is rich in vegetables, fruit, whole grains, beans, nuts, fish and olive oil, while red meat and processed foods appear only occasionally. Wine is consumed in small amounts with meals.

[C] Modern clinical trials have largely confirmed Keys's observations. A landmark Spanish study published in 2013 found that a Mediterranean-style diet reduced the risk of heart attack and stroke by around 30 per cent in high-risk patients, even compared with a standard low-fat regime.

[D] Researchers caution that simply eating more olive oil while otherwise following a typical Western diet does not produce the same results. The benefits appear to come from the overall pattern, not from any single food.`,
    instructions: "Which paragraph (A, B, C or D) contains the following information?",
    items: [
      { prompt: "1. A 30% reduction in cardiovascular risk",             answer: "C" },
      { prompt: "2. The role of wine in the diet",                        answer: "B" },
      { prompt: "3. A warning that one food alone is not enough",         answer: "D" },
      { prompt: "4. The first major study linking diet to heart disease", answer: "A" },
    ],
    analysis:
`1 → C (2013 Spanish study).
2 → B (wine in small amounts with meals).
3 → D (single-food approach doesn't work).
4 → A (Keys's Seven Countries Study).`,
  },
  {
    id: "mi-007", type: "matching_information", level: "B1", title: "The Birth of the Internet", topic: "Technology",
    passage:
`[A] The internet's earliest ancestor, ARPANET, was funded by the US Department of Defense in the late 1960s. Its goal was practical: to allow computers at different research universities to share data without constantly being routed through a single central machine.

[B] A crucial design choice was packet switching, in which messages are broken into small, independently routed pieces that are reassembled at the destination. This made the network unusually robust — data could find its way around damaged links rather than failing completely.

[C] The transition from a research tool to a public service began in the 1990s. The British computer scientist Tim Berners-Lee, working at the CERN laboratory in Switzerland, designed the World Wide Web — a system of linked documents accessible through a "browser" — and released it free of charge in 1991.

[D] Commercial growth then accelerated rapidly. By 2000, more than 400 million people were online. Today, more than five billion people use the internet, and roughly half the world's population accesses it primarily through a mobile phone.`,
    instructions: "Which paragraph (A, B, C or D) contains the following information?",
    items: [
      { prompt: "1. The fact that the Web was released free of charge", answer: "C" },
      { prompt: "2. Statistics about modern internet use",               answer: "D" },
      { prompt: "3. The original military funding source",                answer: "A" },
      { prompt: "4. A design that made the network resilient",            answer: "B" },
    ],
    analysis:
`1 → C (Berners-Lee released the Web free in 1991).
2 → D (5 billion users, ~half via mobile).
3 → A (US Department of Defense funded ARPANET).
4 → B (packet switching).`,
  },

  // ───────── 3. Matching Features ─────────
  {
    id: "mf-004", type: "matching_features", level: "B1", title: "Three Great Composers", topic: "Music · History",
    passage:
`Johann Sebastian Bach, born in 1685 in the small German town of Eisenach, spent most of his career as a church organist and choirmaster. His enormous output of religious music, including the St Matthew Passion and hundreds of cantatas, was largely forgotten for almost a century after his death until Mendelssohn revived it in 1829.

Wolfgang Amadeus Mozart, born seventy years later in Salzburg, was a child prodigy who performed for European royalty by the age of six. He composed prolifically in every genre of his time but is perhaps best known for his operas, including The Marriage of Figaro and The Magic Flute.

Ludwig van Beethoven, born in Bonn in 1770, bridged the Classical and Romantic eras. Famously, he continued composing major works after going almost entirely deaf — a tragedy that did not prevent the creation of his Ninth Symphony, with its choral final movement that has since been adopted as the anthem of the European Union.`,
    instructions: "Match each composer (1–3) with the description (A–E). There are more descriptions than composers.",
    options: [
      { label: "A", text: "Famous for operas including The Magic Flute" },
      { label: "B", text: "Largely forgotten until revived in 1829" },
      { label: "C", text: "Composed major works after losing his hearing" },
      { label: "D", text: "Wrote the world's first symphony" },
      { label: "E", text: "Invented the modern piano" },
    ],
    items: [
      { prompt: "1. Bach",      answer: "B" },
      { prompt: "2. Mozart",    answer: "A" },
      { prompt: "3. Beethoven", answer: "C" },
    ],
    analysis:
`Bach → B (forgotten until Mendelssohn revived in 1829).
Mozart → A (operas including The Magic Flute).
Beethoven → C (Ninth Symphony composed while deaf).
D and E aren't supported by the passage.`,
  },
  {
    id: "mf-005", type: "matching_features", level: "B1", title: "Founders of Modern Economics", topic: "Economics · History",
    passage:
`The Scottish philosopher Adam Smith published The Wealth of Nations in 1776. In it he argued that an "invisible hand" of self-interested exchange in free markets tended to produce outcomes that benefited the whole of society — provided that markets were not distorted by monopoly or unjust laws.

In the nineteenth century, the German thinker Karl Marx took a sharply different view. In his three-volume Das Kapital, he argued that industrial capitalism inevitably exploited labour and would ultimately collapse under its own contradictions, to be replaced by a workers' state.

The British economist John Maynard Keynes, writing in the wake of the 1929 stock-market crash, defended capitalism but rejected the idea that it was self-correcting. In times of severe recession, he argued, governments should borrow and spend in order to restore demand and employment.`,
    instructions: "Match each economist (1–3) with the idea (A–E).",
    options: [
      { label: "A", text: "Free markets, guided by self-interest, benefit society" },
      { label: "B", text: "Capitalism would inevitably collapse" },
      { label: "C", text: "Governments should spend during recessions" },
      { label: "D", text: "All international trade should be banned" },
      { label: "E", text: "Money should be replaced by gold" },
    ],
    items: [
      { prompt: "1. Adam Smith",      answer: "A" },
      { prompt: "2. Karl Marx",       answer: "B" },
      { prompt: "3. John Maynard Keynes", answer: "C" },
    ],
    analysis:
`Smith → A (invisible hand, self-interest benefits society).
Marx → B (capitalism's contradictions, eventual collapse).
Keynes → C (government spending during recessions).`,
  },
  {
    id: "mf-006", type: "matching_features", level: "B1", title: "Inventors of Communication", topic: "Technology",
    passage:
`Samuel Morse, an American painter turned inventor, demonstrated his electric telegraph in 1844 with the famous message "What hath God wrought?" sent from Washington to Baltimore. Within decades, Morse code and the telegraph had connected continents through undersea cables.

The Scottish-born Alexander Graham Bell patented the telephone in 1876, narrowly ahead of his rival Elisha Gray. Within ten years, telephone exchanges were operating in major cities, beginning the slow shift from written telegrams to live voice communication.

The Italian engineer Guglielmo Marconi sent the first transatlantic radio signal — the letter S in Morse code — across the ocean from Cornwall to Newfoundland in 1901. His success demonstrated that information could travel without wires at all and laid the foundation for modern broadcasting.`,
    instructions: "Match each inventor (1–3) with the achievement (A–E).",
    options: [
      { label: "A", text: "Patented the telephone" },
      { label: "B", text: "Sent the first transatlantic radio signal" },
      { label: "C", text: "Demonstrated the electric telegraph in 1844" },
      { label: "D", text: "Built the first computer" },
      { label: "E", text: "Invented the printing press" },
    ],
    items: [
      { prompt: "1. Samuel Morse",          answer: "C" },
      { prompt: "2. Alexander Graham Bell", answer: "A" },
      { prompt: "3. Guglielmo Marconi",     answer: "B" },
    ],
    analysis:
`Morse → C (telegraph 1844).
Bell → A (telephone patent 1876).
Marconi → B (transatlantic radio 1901).`,
  },
  {
    id: "mf-007", type: "matching_features", level: "B1", title: "Pioneers of Climate Science", topic: "Science",
    passage:
`As early as 1824, the French mathematician Joseph Fourier suggested that the Earth's atmosphere acts like a glass enclosure, trapping heat from the Sun. He was the first to describe what we now call the greenhouse effect, although he could not measure it.

Several decades later, the Irish physicist John Tyndall demonstrated experimentally that water vapour and carbon dioxide absorb infrared radiation more strongly than the main components of air. His 1859 measurements identified the specific gases responsible for Fourier's effect.

In 1896, the Swedish chemist Svante Arrhenius took the next step. He calculated that doubling the carbon-dioxide concentration of the atmosphere would warm the planet by several degrees — the first numerical estimate of human-caused climate change.`,
    instructions: "Match each scientist (1–3) with the contribution (A–E).",
    options: [
      { label: "A", text: "Calculated how much CO₂ doubling would warm the planet" },
      { label: "B", text: "First proposed that the atmosphere traps heat" },
      { label: "C", text: "Identified specific greenhouse gases experimentally" },
      { label: "D", text: "Discovered the ozone layer" },
      { label: "E", text: "Mapped ocean currents" },
    ],
    items: [
      { prompt: "1. Joseph Fourier",   answer: "B" },
      { prompt: "2. John Tyndall",     answer: "C" },
      { prompt: "3. Svante Arrhenius", answer: "A" },
    ],
    analysis:
`Fourier → B (1824, atmosphere as a glass enclosure).
Tyndall → C (1859 lab measurements identifying CO₂ and water vapour).
Arrhenius → A (1896 calculation of warming from CO₂ doubling).`,
  },

  // ───────── 4. Matching Sentence Endings ─────────
  {
    id: "mse-004", type: "matching_sentence_endings", level: "B1", title: "How Birds Migrate", topic: "Biology",
    passage:
`Each year, billions of birds undertake long migrations between breeding and wintering grounds, sometimes covering more than ten thousand kilometres. How they navigate has fascinated biologists for over a century.

Daytime migrants such as storks rely partly on the position of the sun, adjusting for its movement across the sky as the hours pass. Night-flying songbirds appear to use the pattern of stars, particularly those near the celestial pole that rotate the least. Recent experiments have also demonstrated that many species can sense the Earth's magnetic field, possibly through specialised molecules in their eyes that respond to magnetism in the presence of light.

Migration is not entirely instinctive. Young birds raised in captivity often start out in roughly the right direction but cannot complete the journey accurately without experience. Travelling with adults appears to be essential for fine-tuning the route.`,
    instructions: "Complete each sentence (1–3) with the correct ending (A–E).",
    options: [
      { label: "A", text: "use the position of the sun, adjusted for time of day." },
      { label: "B", text: "navigate using the pattern of stars near the celestial pole." },
      { label: "C", text: "rely entirely on instinct and need no experience." },
      { label: "D", text: "appears to involve magnetism sensed through the eyes." },
      { label: "E", text: "is now thought to be controlled by the Moon." },
    ],
    items: [
      { prompt: "1. Daytime migrants such as storks",          answer: "A" },
      { prompt: "2. Night-flying songbirds",                    answer: "B" },
      { prompt: "3. The Earth's magnetic field",                answer: "D" },
    ],
    analysis:
`1 → A (storks use the sun, adjusting for time).
2 → B (songbirds use stars near celestial pole).
3 → D (magnetism sensed through molecules in the eyes).
C is wrong because young birds need experience; E isn't mentioned.`,
  },
  {
    id: "mse-005", type: "matching_sentence_endings", level: "B1", title: "What Coffee Does to the Brain", topic: "Biology",
    passage:
`The active ingredient in coffee, caffeine, works by blocking the brain's adenosine receptors. Adenosine normally accumulates throughout the day and produces a feeling of drowsiness; blocking it makes us feel more alert. Caffeine reaches peak concentration in the blood about 45 minutes after consumption and is broken down by enzymes in the liver over the following four to six hours.

Regular drinkers develop tolerance, producing more receptors so that the same dose has less effect. They may also experience withdrawal headaches when caffeine is suddenly stopped. Despite these effects, moderate consumption — around three to four cups a day — has been linked in large studies to a slightly lower risk of several diseases, including type 2 diabetes and Parkinson's.`,
    instructions: "Complete each sentence (1–3) with the correct ending (A–E).",
    options: [
      { label: "A", text: "by blocking adenosine receptors in the brain." },
      { label: "B", text: "between four and six hours after drinking." },
      { label: "C", text: "may produce more receptors over time." },
      { label: "D", text: "is mostly stored in the bones." },
      { label: "E", text: "removes vitamins from the body." },
    ],
    items: [
      { prompt: "1. Caffeine produces alertness",     answer: "A" },
      { prompt: "2. Caffeine is broken down",         answer: "B" },
      { prompt: "3. The brain of a regular drinker",  answer: "C" },
    ],
    analysis:
`1 → A (blocking adenosine).
2 → B (4–6 hours by liver enzymes).
3 → C (tolerance: more receptors).`,
  },
  {
    id: "mse-006", type: "matching_sentence_endings", level: "B1", title: "Stages of Sleep", topic: "Neuroscience",
    passage:
`A typical adult passes through four or five sleep cycles each night, with each cycle lasting roughly 90 minutes. The first stages of every cycle are known as non-REM sleep and are dominated by slow brain waves. During the deepest non-REM stage the body releases growth hormone, repairs tissues and consolidates factual memories.

REM sleep, which usually appears toward the end of each cycle, is associated with vivid dreaming and rapid eye movements beneath closed eyelids. The brain is highly active during REM, but most muscles are temporarily paralysed — a safety mechanism that prevents the sleeper from acting out dreams.

Both kinds of sleep are essential. Subjects deprived of REM in laboratory studies show poor performance on tasks requiring creativity, while those deprived of deep non-REM struggle with simple recall the next day.`,
    instructions: "Complete each sentence (1–3) with the correct ending (A–E).",
    options: [
      { label: "A", text: "the body releases growth hormone and repairs tissue." },
      { label: "B", text: "most muscles are temporarily paralysed." },
      { label: "C", text: "are usually only twenty minutes long." },
      { label: "D", text: "show poor performance on creative tasks." },
      { label: "E", text: "remember every dream perfectly the next morning." },
    ],
    items: [
      { prompt: "1. During the deepest non-REM stage",   answer: "A" },
      { prompt: "2. During REM sleep",                    answer: "B" },
      { prompt: "3. Subjects deprived of REM",            answer: "D" },
    ],
    analysis:
`1 → A (deep non-REM: hormone, tissue repair).
2 → B (REM: muscles paralysed).
3 → D (REM-deprived: weaker creativity).`,
  },
  {
    id: "mse-007", type: "matching_sentence_endings", level: "B1", title: "The Ancient Olympics", topic: "History",
    passage:
`The original Olympic Games were held at Olympia in southern Greece every four years from 776 BCE for nearly twelve centuries. They began as a religious festival in honour of Zeus and only gradually expanded into the multi-event athletics competition recorded by later Greek writers.

Married women were forbidden to attend on pain of death, although unmarried girls were allowed in the stadium. The athletes competed naked and were exclusively male; the only winners' prizes were olive wreaths, although victorious cities often rewarded their champions with money and honours on their return home.

The Roman emperor Theodosius I banned the games in 393 CE as part of a wider campaign against pagan festivals. They were not revived until 1896, when the modern Olympics opened in Athens with athletes from fourteen nations.`,
    instructions: "Complete each sentence (1–3) with the correct ending (A–E).",
    options: [
      { label: "A", text: "were prizes given to victorious athletes." },
      { label: "B", text: "were forbidden to attend on pain of death." },
      { label: "C", text: "took place every two years." },
      { label: "D", text: "ended the games in 393 CE." },
      { label: "E", text: "introduced women's events for the first time." },
    ],
    items: [
      { prompt: "1. Married women",                          answer: "B" },
      { prompt: "2. Olive wreaths",                           answer: "A" },
      { prompt: "3. The emperor Theodosius I",                answer: "D" },
    ],
    analysis:
`1 → B (forbidden on pain of death).
2 → A (only prizes were olive wreaths).
3 → D (banned the games in 393 CE).`,
  },

  // ───────── 5. True / False / Not Given ─────────
  {
    id: "tfng-004", type: "true_false_not_given", level: "B1", title: "Stonehenge", topic: "Archaeology",
    passage:
`The stone circle at Stonehenge, on Salisbury Plain in southern England, was built in several phases between roughly 3000 and 1500 BCE. Its largest stones, called sarsens, weigh up to 25 tonnes and were dragged from a quarry about 30 kilometres away. The smaller "bluestones" set inside the circle are far more remarkable: geological analysis has shown they came from quarries in west Wales, more than 200 kilometres distant.

The exact purpose of the monument remains uncertain. Its main axis is aligned with the rising sun on the summer solstice and the setting sun on the winter solstice, which strongly suggests an astronomical or ritual function. Older theories that the circle was a calendar capable of predicting eclipses are no longer widely accepted.`,
    instructions: "Choose TRUE, FALSE or NOT GIVEN.",
    items: [
      { prompt: "1. Stonehenge was built in a single phase.",                                    answer: "FALSE" },
      { prompt: "2. The bluestones come from quarries in west Wales.",                            answer: "TRUE" },
      { prompt: "3. The monument's main axis aligns with the sunrise on the summer solstice.",   answer: "TRUE" },
      { prompt: "4. Most archaeologists now believe Stonehenge predicted eclipses.",              answer: "FALSE" },
      { prompt: "5. Tickets to visit Stonehenge today must be booked online.",                    answer: "NOT GIVEN" },
    ],
    analysis:
`1 → FALSE (built in several phases).
2 → TRUE (bluestones from west Wales).
3 → TRUE (axis aligned with summer-solstice sunrise).
4 → FALSE (eclipse-prediction theory "no longer widely accepted").
5 → NOT GIVEN (no information about modern tickets).`,
  },
  {
    id: "tfng-005", type: "true_false_not_given", level: "B1", title: "The Industrial Revolution", topic: "History",
    passage:
`The Industrial Revolution began in the British Midlands in the second half of the eighteenth century and spread across Europe and North America over the following hundred years. James Watt's improved steam engine of 1769 transformed mining, manufacturing and, eventually, transport, by replacing animal and water power with a movable source of mechanical energy.

Cities grew rapidly as workers moved from countryside to factory. London's population trebled between 1800 and 1850, while smaller industrial towns such as Manchester grew even faster. Living conditions in these new cities were often appalling: contemporary observers described overcrowded housing, polluted water and child labour as routine.

Wages, however, gradually rose. By 1900, a British factory worker earned roughly four times what an agricultural labourer of 1800 had received in real terms.`,
    instructions: "Choose TRUE, FALSE or NOT GIVEN.",
    items: [
      { prompt: "1. The Industrial Revolution began in the British Midlands.",        answer: "TRUE" },
      { prompt: "2. James Watt invented the steam engine in 1769.",                    answer: "FALSE" },
      { prompt: "3. London's population doubled between 1800 and 1850.",               answer: "FALSE" },
      { prompt: "4. Manchester was the most polluted city in Europe.",                 answer: "NOT GIVEN" },
      { prompt: "5. Real wages of British factory workers rose substantially by 1900.", answer: "TRUE" },
    ],
    analysis:
`1 → TRUE.
2 → FALSE (Watt IMPROVED the steam engine; he didn't invent it).
3 → FALSE (it TREBLED, not doubled).
4 → NOT GIVEN (the passage never compares Manchester with other cities for pollution).
5 → TRUE (four times an 1800 labourer's pay).`,
  },
  {
    id: "tfng-006", type: "true_false_not_given", level: "B1", title: "Photosynthesis", topic: "Biology",
    passage:
`All green plants produce their own food through photosynthesis, a chemical reaction that takes place mainly in their leaves. Tiny structures called chloroplasts capture energy from sunlight using a green pigment, chlorophyll. The captured energy is used to convert water drawn up by the roots and carbon dioxide absorbed from the air into glucose, releasing oxygen as a by-product.

The rate at which a plant photosynthesises depends on three main factors: light intensity, temperature and the concentration of carbon dioxide in the air. Inside greenhouses, growers often deliberately raise the carbon-dioxide level to accelerate plant growth. Without photosynthesis, the oxygen on which animals depend would not be replenished, and the energy stored in plants would not exist to power the rest of the food chain.`,
    instructions: "Choose TRUE, FALSE or NOT GIVEN.",
    items: [
      { prompt: "1. Photosynthesis takes place mainly in plant leaves.",            answer: "TRUE" },
      { prompt: "2. Chlorophyll is found in chloroplasts.",                          answer: "TRUE" },
      { prompt: "3. Higher CO₂ levels always slow plant growth.",                    answer: "FALSE" },
      { prompt: "4. Photosynthesis was first described by Aristotle.",               answer: "NOT GIVEN" },
      { prompt: "5. Oxygen is a product of photosynthesis.",                         answer: "TRUE" },
    ],
    analysis:
`1 → TRUE.
2 → TRUE (chlorophyll is the pigment in chloroplasts).
3 → FALSE (greenhouses RAISE CO₂ to accelerate growth — opposite).
4 → NOT GIVEN.
5 → TRUE ("releasing oxygen as a by-product").`,
  },
  {
    id: "tfng-007", type: "true_false_not_given", level: "B1", title: "Antarctic Ice", topic: "Earth science",
    passage:
`Antarctica holds about 90 per cent of the world's fresh water, locked up in an ice sheet that averages two kilometres in thickness. Despite the ice's vast size, satellite measurements taken since the 1990s show that it is losing mass at an accelerating rate, particularly along the western coast.

The greatest concern is the West Antarctic ice sheet, parts of which sit on bedrock below sea level. Warming ocean water can flow underneath the floating edges and melt them from below, allowing the inland ice to slide more rapidly toward the sea. Some glaciologists believe that long-term collapse of West Antarctica is now inevitable, although the process is likely to take centuries rather than decades.

If all the ice on the continent were to melt, global sea level would rise by approximately 58 metres — submerging most of the world's largest cities.`,
    instructions: "Choose TRUE, FALSE or NOT GIVEN.",
    items: [
      { prompt: "1. Antarctica contains about 90% of Earth's fresh water.",                  answer: "TRUE" },
      { prompt: "2. The Antarctic ice sheet is gaining mass overall.",                        answer: "FALSE" },
      { prompt: "3. Most West Antarctic bedrock lies above sea level.",                       answer: "FALSE" },
      { prompt: "4. The full collapse of West Antarctica would happen within fifty years.",   answer: "FALSE" },
      { prompt: "5. Penguin populations have declined sharply in recent years.",              answer: "NOT GIVEN" },
    ],
    analysis:
`1 → TRUE.
2 → FALSE (it is LOSING mass at an accelerating rate).
3 → FALSE (bedrock is BELOW sea level).
4 → FALSE (centuries, not decades).
5 → NOT GIVEN (no mention of penguins).`,
  },

  // ───────── 6. Multiple Choice ─────────
  {
    id: "mc-004", type: "multiple_choice", level: "B1", title: "Why Sharks Don't Get Cancer", topic: "Biology",
    passage:
`A persistent popular belief, particularly common in the 1990s, claims that sharks "do not get cancer" and that powdered shark cartilage may therefore prevent or treat the disease in humans. Researchers have investigated both halves of this claim, and both turn out to be wrong.

Sharks do, in fact, develop tumours: more than forty cases have been documented in different species, including malignant cancers in great whites and dogfish. The misconception arose partly because cancers in fish are simply less often noticed than in mammals, and partly because the cartilage industry deliberately promoted the myth to sell supplements.

Clinical trials of shark-cartilage supplements as cancer treatments have shown no benefit and have been blamed for delaying patients from accessing effective therapies. The trade has also driven sharp declines in some shark populations, contributing to over-fishing of species already vulnerable.`,
    instructions: "Choose the correct letter, A, B, C or D.",
    options: [
      { label: "A", text: "Sharks have a complete natural immunity to cancer." },
      { label: "B", text: "Shark-cartilage supplements have been shown to cure tumours." },
      { label: "C", text: "The cancer-free shark myth has been disproved by documented tumours." },
      { label: "D", text: "Demand for shark cartilage has helped shark populations recover." },
    ],
    items: [
      { prompt: "Which statement is supported by the passage?", answer: "C" },
    ],
    analysis:
`C is correct (40+ documented tumours in sharks). A is the myth being debunked. B is contradicted ("no benefit"). D is the opposite of the truth.`,
  },
  {
    id: "mc-005", type: "multiple_choice", level: "B1", title: "DNA: The Double Helix", topic: "Science",
    passage:
`In April 1953 the journal Nature published a one-page paper by James Watson and Francis Crick, then both at the University of Cambridge, proposing that the molecule of inheritance — DNA — has the shape of a double helix. The model elegantly explained how genetic information could be both stored and copied: each strand carries a sequence of four chemical bases, and the rules by which the bases pair up mean that one strand can act as a template for replicating the other.

Crick and Watson did not work in isolation. The X-ray photographs of crystallised DNA taken by Rosalind Franklin at King's College London were essential to their discovery, although her contribution was not formally credited until decades later. Franklin died of cancer in 1958, four years before Watson, Crick and her former colleague Maurice Wilkins shared the 1962 Nobel Prize for the discovery.`,
    instructions: "Choose the correct letter, A, B, C or D.",
    options: [
      { label: "A", text: "Watson and Crick worked entirely without help from other scientists." },
      { label: "B", text: "Rosalind Franklin received the 1962 Nobel Prize for the discovery of DNA." },
      { label: "C", text: "Each DNA strand can serve as a template for copying the other." },
      { label: "D", text: "The double-helix model was published in Science magazine." },
    ],
    items: [
      { prompt: "Which statement is supported by the passage?", answer: "C" },
    ],
    analysis:
`C is correct (template replication is exactly what the passage describes).
A wrong: Franklin's X-ray photos were essential.
B wrong: Franklin died in 1958, before the prize.
D wrong: published in Nature, not Science.`,
  },
  {
    id: "mc-006", type: "multiple_choice", level: "B1", title: "Honeybee Colony Collapse", topic: "Biology",
    passage:
`Since around 2006, beekeepers across North America and Europe have reported sudden, unexplained losses of entire honeybee colonies — a phenomenon labelled colony collapse disorder. Affected hives are typically empty of adult workers, although the queen and brood are left behind, suggesting that the workers fly off and fail to return.

Researchers have not identified a single cause. The most plausible explanation is a combination of factors: parasitic varroa mites that weaken bees and spread viruses, exposure to certain pesticides such as neonicotinoids, loss of varied wildflower habitat as monoculture agriculture expands, and the stress of being trucked long distances for commercial pollination work. Each factor on its own may be tolerable; in combination, they appear to overwhelm the colony.

Practical responses have included tighter rules on pesticide use, diversified planting and selective breeding for mite-resistant bees.`,
    instructions: "Choose the correct letter, A, B, C or D.",
    options: [
      { label: "A", text: "Colony collapse is now believed to have a single, well-identified cause." },
      { label: "B", text: "Affected hives are usually full of dead adult bees." },
      { label: "C", text: "Multiple stresses combined appear to overwhelm honeybee colonies." },
      { label: "D", text: "Beekeepers have stopped transporting bees for pollination." },
    ],
    items: [
      { prompt: "Which statement is supported by the passage?", answer: "C" },
    ],
    analysis:
`C is correct (passage explicitly says factors COMBINE).
A wrong: no single cause.
B wrong: hives are EMPTY of workers, not full of dead bees.
D wrong: passage says trucking is one of the stresses, not that it has stopped.`,
  },
  {
    id: "mc-007", type: "multiple_choice", level: "B1", title: "Quantum Computing", topic: "Technology",
    passage:
`Conventional computers store information as bits — switches that are either 0 or 1. A quantum computer, by contrast, uses qubits that can occupy a combination of the two states simultaneously, a property known as superposition. When a quantum algorithm is run, the machine in effect explores many possible solutions in parallel before "collapsing" to a single answer when measured.

The technology is still in its infancy. Today's largest experimental machines have only a few hundred working qubits, and they must be cooled to within a fraction of a degree of absolute zero to keep their quantum states stable. They cannot yet outperform conventional computers on most everyday tasks.

For specific problems, however, quantum machines hold extraordinary promise. They could in theory crack the encryption that currently protects most of the world's online communications, simulate the behaviour of complex molecules and accelerate certain searches that would take conventional computers thousands of years.`,
    instructions: "Choose the correct letter, A, B, C or D.",
    options: [
      { label: "A", text: "Quantum computers have already replaced conventional computers in everyday use." },
      { label: "B", text: "Qubits can hold a combination of 0 and 1 at the same time." },
      { label: "C", text: "Quantum computers operate best at very high temperatures." },
      { label: "D", text: "Modern encryption is impossible to crack on any machine." },
    ],
    items: [
      { prompt: "Which statement is supported by the passage?", answer: "B" },
    ],
    analysis:
`B is correct (superposition).
A wrong: technology still in infancy.
C wrong: must be cooled near absolute zero.
D wrong: passage says quantum machines could in theory crack current encryption.`,
  },

  // ───────── 7. List Selection ─────────
  {
    id: "ls-004", type: "list_selection", level: "B1", title: "What Makes a Tree Useful for Cities", topic: "Urban planning",
    passage:
`Urban foresters select street trees with care, because not every species thrives among traffic and pavement. Researchers consistently rank a few qualities at the top of their list. A useful city tree should tolerate compacted, polluted soil; have a deep root system that does not damage drains; offer a broad canopy that shades pavements in summer; and be tough enough to resist common pests and diseases.

A few tempting features actually make species unsuitable. Trees that drop large quantities of fruit can stain vehicles and cause slips. Species with shallow, spreading roots commonly crack pavements and pipes. And tree forms that need extensive pruning every year are expensive for cities to maintain.

Beauty matters less than people often assume. Surveys of residents show that overall canopy COVERAGE — total shade — affects perceived quality of life far more than individual leaf colour or flower display.`,
    instructions: "Which THREE features are listed as DESIRABLE in a city street tree? Choose THREE answers (A–F).",
    options: [
      { label: "A", text: "Tolerance of compacted, polluted soil" },
      { label: "B", text: "Heavy fruit production" },
      { label: "C", text: "A broad canopy for shading pavements" },
      { label: "D", text: "Shallow, spreading roots" },
      { label: "E", text: "Resistance to common pests and diseases" },
      { label: "F", text: "A need for annual heavy pruning" },
    ],
    items: [
      { prompt: "Choose THREE letters.", answer: ["A", "C", "E"] },
    ],
    analysis:
`A, C, E are listed as desirable. B (heavy fruit), D (shallow roots) and F (heavy pruning) are explicitly listed as unsuitable.`,
  },
  {
    id: "ls-005", type: "list_selection", level: "B1", title: "What Helps Children Learn to Read", topic: "Education",
    passage:
`Decades of research into early literacy have identified several practices that reliably help young children become confident readers. Daily shared reading at home, even just twenty minutes, dramatically expands a child's vocabulary. Systematic phonics teaching — explicit, structured instruction in the relationship between letters and sounds — produces especially strong gains for early readers. Access to a wide range of books, fiction and non-fiction alike, sustains motivation and broadens background knowledge.

Other widely tried approaches show little or no benefit. Forcing children to memorise long lists of sight words in isolation, without phonics instruction, has poor outcomes for most learners. Punishing slow readers in the classroom is associated with reduced motivation. And paid commercial "speed-reading" courses for under-tens have not been shown to improve comprehension at all.`,
    instructions: "Which THREE practices are described as effective in helping children learn to read? Choose THREE answers (A–F).",
    options: [
      { label: "A", text: "Daily shared reading at home" },
      { label: "B", text: "Memorising long sight-word lists in isolation" },
      { label: "C", text: "Systematic phonics instruction" },
      { label: "D", text: "Punishing slow readers in class" },
      { label: "E", text: "Access to a wide range of books" },
      { label: "F", text: "Paid commercial speed-reading courses for under-tens" },
    ],
    items: [
      { prompt: "Choose THREE letters.", answer: ["A", "C", "E"] },
    ],
    analysis:
`A, C, E are the effective practices. B, D, F are listed under "little or no benefit".`,
  },
  {
    id: "ls-006", type: "list_selection", level: "B1", title: "What Improves Workplace Productivity", topic: "Business",
    passage:
`Researchers studying workplace performance have repeatedly identified several conditions that boost productivity in office work. Predictable, uninterrupted blocks of focused time — usually called "deep work" — are strongly associated with higher output. Adequate natural daylight in the workspace measurably reduces fatigue and errors. And clear, measurable goals, agreed in advance, help employees set sensible priorities.

Some commonly tried interventions show little effect. Rearranging an office into an open plan, despite its popularity, often INCREASES distraction and reduces concentrated work. Lengthy weekly status meetings frequently consume more time than they save. And providing free snacks may improve morale slightly but has no measurable impact on productivity itself.`,
    instructions: "Which THREE conditions are described as effective for improving productivity? Choose THREE answers (A–F).",
    options: [
      { label: "A", text: "Long uninterrupted blocks of focused time" },
      { label: "B", text: "Open-plan office layouts" },
      { label: "C", text: "Adequate natural daylight" },
      { label: "D", text: "Lengthy weekly status meetings" },
      { label: "E", text: "Clear, measurable goals agreed in advance" },
      { label: "F", text: "Free office snacks" },
    ],
    items: [
      { prompt: "Choose THREE letters.", answer: ["A", "C", "E"] },
    ],
    analysis:
`A, C, E are described as effective. B, D, F are listed under "little effect" or even counterproductive.`,
  },
  {
    id: "ls-007", type: "list_selection", level: "B1", title: "Reducing Household Food Waste", topic: "Environment",
    passage:
`Roughly a third of all food produced for human consumption is thrown away, and a significant share of that waste happens in homes. Studies of households that successfully reduce their waste have identified several practical habits. Planning meals in advance for the week dramatically reduces over-buying. Storing fruit and vegetables correctly extends their useful life by days or even weeks. And using a "first in, first out" rule when filling the refrigerator helps ensure older items are eaten before they spoil.

A few popular tactics are less effective. Buying in bulk to "save money" routinely leads to MORE waste in small households. Shopping while hungry tends to encourage impulse purchases that go uneaten. And relying on the printed "best before" date — rather than smell or appearance — causes households to discard food that is still perfectly safe.`,
    instructions: "Which THREE habits are described as effective in reducing household food waste? Choose THREE answers (A–F).",
    options: [
      { label: "A", text: "Planning meals in advance for the week" },
      { label: "B", text: "Buying food in bulk to save money" },
      { label: "C", text: "Storing fruit and vegetables correctly" },
      { label: "D", text: "Shopping while hungry" },
      { label: "E", text: "Using a 'first in, first out' rule for the fridge" },
      { label: "F", text: "Strictly throwing away food on its 'best before' date" },
    ],
    items: [
      { prompt: "Choose THREE letters.", answer: ["A", "C", "E"] },
    ],
    analysis:
`A, C, E are the effective practices. B, D, F are explicitly described as counterproductive or unhelpful.`,
  },

  // ───────── 8. Choose a Title ─────────
  {
    id: "ct-004", type: "choose_title", level: "B1", title: "(See passage)", topic: "Cryptozoology",
    passage:
`The story of the Loch Ness Monster, said to inhabit a long, deep lake in the Scottish Highlands, has become one of the world's most enduring modern legends. The first widely reported "sighting" appeared in a local newspaper in 1933, and within months the loch had drawn hundreds of curious visitors, photographers and amateur monster-hunters.

Since then, multiple scientific surveys — using sonar, underwater cameras and, most recently, environmental DNA sampling — have failed to find evidence of any large unknown animal in the loch. The 2019 eDNA project, which sampled water at numerous depths, identified plenty of eel DNA but nothing resembling a plesiosaur or other prehistoric creature.

Despite the negative results, tourism around the loch flourishes. Local businesses estimate that "Nessie" attracts more than a million visitors a year and supports a substantial part of the regional economy.`,
    instructions: "Choose the most appropriate title for the whole passage.",
    options: [
      { label: "A", text: "How the eel population of Loch Ness was discovered" },
      { label: "B", text: "A myth that survives despite the science" },
      { label: "C", text: "Rules for protecting endangered freshwater species" },
      { label: "D", text: "Why tourism in the Scottish Highlands has declined" },
    ],
    items: [
      { prompt: "Choose A, B, C or D.", answer: "B" },
    ],
    analysis:
`B captures both halves: science finds nothing, yet the legend (and its tourism) thrives.
A is a detail. C and D are contradicted by the passage.`,
  },
  {
    id: "ct-005", type: "choose_title", level: "B1", title: "(See passage)", topic: "Science · History",
    passage:
`Before the late eighteenth century, almost every region of Europe used its own units of length, weight and volume — and even within a single country these often varied between cities. A bushel of grain in one French town might be twenty per cent larger than a bushel in another, making trade slow and prone to dispute.

The metric system, introduced in revolutionary France in 1795, set out to replace this patchwork with a single, decimal-based set of units derived from features of the natural world. The metre, originally defined as one ten-millionth of the distance from the equator to the North Pole along the meridian through Paris, was the foundation of the entire system.

Adoption was uneven. France itself reverted briefly to older units under Napoleon, and Britain still uses miles for road distances today. Even so, by the late twentieth century the metric system had been adopted as the official basis of measurement in almost every country in the world, and it underpins virtually all modern science.`,
    instructions: "Choose the most appropriate title for the whole passage.",
    options: [
      { label: "A", text: "The history and global spread of the metric system" },
      { label: "B", text: "Why Britain still uses miles" },
      { label: "C", text: "The revolutionary politics of eighteenth-century France" },
      { label: "D", text: "How the speed of light is measured" },
    ],
    items: [
      { prompt: "Choose A, B, C or D.", answer: "A" },
    ],
    analysis:
`A covers the whole passage (origin, definition, uneven adoption, eventual global use).
B is a single detail. C is background, not the topic. D isn't discussed.`,
  },
  {
    id: "ct-006", type: "choose_title", level: "B1", title: "(See passage)", topic: "Environment",
    passage:
`Microplastics are tiny fragments of plastic, typically smaller than five millimetres, that have appeared in alarming quantities in oceans, rivers, soils and even the atmosphere. They come from many sources: the breakdown of larger plastic litter, the abrasion of tyres on roads, fibres released when synthetic clothes are washed, and microbeads added to some cosmetics until recent bans.

Studies have detected microplastic particles in tap water, table salt, the lungs of city dwellers and the placentas of newborn babies. The long-term health consequences for humans are still poorly understood; researchers are particularly concerned about the chemicals — both from the plastic itself and substances it absorbs from the environment — that may leach out inside the body.

Mitigation strategies include filters on washing machines, cleaner alternatives to synthetic fabrics, road designs that capture tyre dust, and bans on microbeads in cosmetics.`,
    instructions: "Choose the most appropriate title for the whole passage.",
    options: [
      { label: "A", text: "Microplastics: sources, presence and possible solutions" },
      { label: "B", text: "Recycling household plastics at home" },
      { label: "C", text: "Banning all plastic packaging by 2030" },
      { label: "D", text: "Why ocean fish are declining" },
    ],
    items: [
      { prompt: "Choose A, B, C or D.", answer: "A" },
    ],
    analysis:
`A best summarises the whole text (sources, where they're found, mitigation).
B, C, D are off-topic for this passage.`,
  },
  {
    id: "ct-007", type: "choose_title", level: "B1", title: "(See passage)", topic: "History · Engineering",
    passage:
`At its height in the second century CE, the Roman road network covered more than 80,000 kilometres and connected every part of an empire that stretched from the Atlantic coast of Spain to the deserts of modern Iraq. The roads were built primarily for the rapid movement of legions and government couriers; trade and tourism benefited as a side-effect.

Roman engineers used a remarkably consistent technique. They first dug a trench, packed the bottom with large stones for drainage, added layers of gravel and concrete, and finished with a slightly cambered surface of fitted paving stones to shed rain. Many roads ran in long, almost dead-straight sections, slicing through hills and across valleys rather than detouring around them.

Some Roman roads remain in use today, often as the foundations of modern motorways across France, Italy and Britain.`,
    instructions: "Choose the most appropriate title for the whole passage.",
    options: [
      { label: "A", text: "How the Roman road network was built and used" },
      { label: "B", text: "The decline of the Roman army" },
      { label: "C", text: "Modern motorway construction techniques" },
      { label: "D", text: "Tourism in the modern Mediterranean" },
    ],
    items: [
      { prompt: "Choose A, B, C or D.", answer: "A" },
    ],
    analysis:
`A captures the whole passage (network, technique, lasting use).`,
  },

  // ───────── 9. Short Answer ─────────
  {
    id: "sa-004", type: "short_answer", level: "B1", title: "Inventing the Telephone", topic: "Technology · History",
    passage:
`Alexander Graham Bell, born in Scotland in 1847, emigrated first to Canada and later to the United States to teach the deaf. His interest in the mechanics of speech led him to experiment with sending vibrations along an electric wire. On 10 March 1876, in his Boston laboratory, he transmitted the first intelligible telephone message — "Mr Watson, come here, I want to see you" — to his assistant in the next room.

Bell narrowly beat the rival inventor Elisha Gray to the patent office; Gray filed a similar design only hours later. By 1885, Bell's company, AT&T, was operating the first long-distance telephone line, between New York and Philadelphia.`,
    instructions: "Answer the questions below using NO MORE THAN THREE WORDS for each answer.",
    items: [
      { prompt: "1. In which city did Bell make his first call?", answer: "Boston" },
      { prompt: "2. Who was the rival who filed a similar patent hours later?", answer: "Elisha Gray", acceptable: ["Gray"] },
      { prompt: "3. By what year did Bell's company operate a long-distance line?", answer: "1885" },
    ],
    analysis:
`1 → Boston. 2 → Elisha Gray. 3 → 1885.`,
  },
  {
    id: "sa-005", type: "short_answer", level: "B1", title: "Discovery of the South Pole", topic: "History",
    passage:
`The first person confirmed to have reached the geographic South Pole was the Norwegian explorer Roald Amundsen, who arrived with a small team of dog sledges on 14 December 1911. Amundsen's expedition had carefully studied earlier polar journeys and prioritised speed, equipment that worked in extreme cold, and reliance on dog teams.

The British party led by Robert Falcon Scott reached the same spot just over a month later, on 17 January 1912, only to find Amundsen's tent and a letter waiting for them. Demoralised, exhausted and short of supplies, Scott and his four companions died on the return journey, less than twenty kilometres from a depot of food and fuel.`,
    instructions: "Answer the questions below using NO MORE THAN THREE WORDS OR A NUMBER for each answer.",
    items: [
      { prompt: "1. Who was the first person to reach the South Pole?", answer: "Roald Amundsen", acceptable: ["Amundsen"] },
      { prompt: "2. What kind of animals did Amundsen's expedition rely on?", answer: "dogs", acceptable: ["dog teams", "sledge dogs"] },
      { prompt: "3. How many companions of Scott died on the return journey?", answer: "four" },
    ],
    analysis:
`1 → Roald Amundsen. 2 → dogs / dog teams. 3 → four ("Scott and his four companions died").`,
  },
  {
    id: "sa-006", type: "short_answer", level: "B1", title: "The Black Death", topic: "History",
    passage:
`The Black Death, the most devastating pandemic in European history, swept through the continent between 1347 and 1351. Modern genetic analysis of skeletons buried in mass graves has confirmed that the disease was bubonic plague, caused by the bacterium Yersinia pestis and spread mainly by fleas living on rats.

Estimates of the death toll vary, but most historians now accept that between one third and one half of the European population died within just four years. The labour shortage that followed gave surviving peasants greater bargaining power and is widely thought to have weakened the feudal system across western Europe.`,
    instructions: "Answer the questions below using NO MORE THAN THREE WORDS for each answer.",
    items: [
      { prompt: "1. What is the name of the bacterium that caused the Black Death?", answer: "Yersinia pestis" },
      { prompt: "2. Which animals carried the fleas that spread the disease?", answer: "rats" },
      { prompt: "3. Which social system was weakened by the labour shortage?", answer: "feudal system", acceptable: ["the feudal system", "feudalism"] },
    ],
    analysis:
`1 → Yersinia pestis. 2 → rats. 3 → feudal system / feudalism.`,
  },
  {
    id: "sa-007", type: "short_answer", level: "B1", title: "The Suez Canal", topic: "Engineering · History",
    passage:
`The Suez Canal, an artificial waterway cutting through the Egyptian desert to link the Mediterranean and Red Seas, was opened in November 1869 after a decade of construction supervised by the French engineer Ferdinand de Lesseps. Although Egyptian and French interests had financed it, control passed to Britain in 1875 when the Egyptian government, near bankruptcy, sold its shares.

The canal transformed global shipping by removing the need to sail around Africa to reach Asia. A modern oil tanker travelling from the Persian Gulf to Europe can now save more than 6,000 nautical miles by using the canal.`,
    instructions: "Answer the questions below using NO MORE THAN THREE WORDS OR A NUMBER for each answer.",
    items: [
      { prompt: "1. Which French engineer supervised construction of the canal?", answer: "Ferdinand de Lesseps", acceptable: ["de Lesseps", "Lesseps"] },
      { prompt: "2. In which year did Britain gain control of the canal?", answer: "1875" },
      { prompt: "3. How many nautical miles can a modern tanker save?", answer: "6,000", acceptable: ["6000", "more than 6,000", "more than 6000"] },
    ],
    analysis:
`1 → Ferdinand de Lesseps. 2 → 1875. 3 → 6,000.`,
  },

  // ───────── 10. Sentence Completion ─────────
  {
    id: "sc-004", type: "sentence_completion", level: "B1", title: "The Eiffel Tower", topic: "History · Engineering",
    passage:
`The Eiffel Tower was built between 1887 and 1889 as the centrepiece of the World Fair held in Paris to mark the centenary of the French Revolution. Designed by the engineer Gustave Eiffel and his team, it was originally intended to stand for only twenty years before being dismantled. At 300 metres tall, it remained the world's tallest structure for over four decades, until the completion of New York's Chrysler Building in 1930.

Many Parisians initially hated the tower, signing a petition that called it a "useless and monstrous" iron column. It was saved from demolition because it proved to be unexpectedly useful as a radio antenna — a function that has continued ever since.`,
    instructions: "Complete the sentences below using NO MORE THAN TWO WORDS OR A NUMBER from the passage for each gap.",
    items: [
      { prompt: "1. The tower was built for the ___ in Paris.",                     answer: "World Fair", acceptable: ["the World Fair"] },
      { prompt: "2. The tower stands ___ metres tall.",                              answer: "300" },
      { prompt: "3. It was saved from demolition by becoming a useful ___.",         answer: "radio antenna", acceptable: ["antenna"] },
    ],
    analysis:
`1 → World Fair. 2 → 300. 3 → radio antenna.`,
  },
  {
    id: "sc-005", type: "sentence_completion", level: "B1", title: "Marie Curie", topic: "Science",
    passage:
`Born Maria Skłodowska in Warsaw in 1867, Marie Curie moved to Paris as a young woman to study physics and chemistry. With her husband Pierre she discovered two new radioactive elements — polonium, named after her native Poland, and radium — and shared the 1903 Nobel Prize in Physics with him and Henri Becquerel.

After Pierre's accidental death in 1906, Marie continued the research alone and in 1911 became the first person to receive a second Nobel Prize, this time in Chemistry, for her work on the chemical properties of radium. She remains the only person to have won Nobel Prizes in two different sciences.`,
    instructions: "Complete the sentences below using NO MORE THAN TWO WORDS OR A NUMBER from the passage for each gap.",
    items: [
      { prompt: "1. Marie Curie was born in ___.",                          answer: "Warsaw" },
      { prompt: "2. Polonium was named after her native country, ___.",      answer: "Poland" },
      { prompt: "3. She received her second Nobel Prize in ___.",            answer: "1911" },
    ],
    analysis:
`1 → Warsaw. 2 → Poland. 3 → 1911.`,
  },
  {
    id: "sc-006", type: "sentence_completion", level: "B1", title: "The Great Wall of China", topic: "History",
    passage:
`The structure popularly called the Great Wall is in fact a series of fortifications built and rebuilt over more than two thousand years. The earliest sections were constructed in the seventh century BCE, but most of what tourists visit today dates from the Ming dynasty in the fourteenth to seventeenth centuries.

Together, the walls stretch for an estimated 21,000 kilometres across northern China, making the entire system the longest defensive structure ever built. Its primary purpose was to slow rather than stop attacks from nomadic peoples to the north — defenders needed time to gather their forces, and the wall provided it.`,
    instructions: "Complete the sentences below using NO MORE THAN TWO WORDS OR A NUMBER from the passage for each gap.",
    items: [
      { prompt: "1. Most surviving sections were built during the ___ dynasty.",   answer: "Ming" },
      { prompt: "2. The walls stretch for an estimated ___ kilometres.",            answer: "21,000", acceptable: ["21000"] },
      { prompt: "3. The wall's main purpose was to slow attacks from ___ to the north.", answer: "nomadic peoples", acceptable: ["nomads"] },
    ],
    analysis:
`1 → Ming. 2 → 21,000. 3 → nomadic peoples.`,
  },
  {
    id: "sc-007", type: "sentence_completion", level: "B1", title: "How Solar Panels Work", topic: "Science · Energy",
    passage:
`A solar panel converts sunlight directly into electricity using the photovoltaic effect, first observed by the French physicist Edmond Becquerel in 1839. A modern panel consists of dozens of silicon cells, each treated with chemical impurities that create a layer with extra electrons and a layer that is short of them. When sunlight strikes the cell, the energy frees electrons from the silicon atoms; the chemical layout pushes them through an external circuit, producing an electric current.

The efficiency of commercial silicon panels is currently around 22 per cent, meaning that just over a fifth of the sunlight hitting the panel is converted into electricity. The rest is reflected or lost as heat. Researchers are testing newer materials such as perovskite that may push efficiency above 30 per cent in the next decade.`,
    instructions: "Complete the sentences below using NO MORE THAN TWO WORDS OR A NUMBER from the passage for each gap.",
    items: [
      { prompt: "1. The photovoltaic effect was first observed by ___ in 1839.",     answer: "Edmond Becquerel", acceptable: ["Becquerel"] },
      { prompt: "2. Modern solar panels are made from cells of ___.",                  answer: "silicon" },
      { prompt: "3. Commercial silicon panels currently have an efficiency of around ___ per cent.", answer: "22" },
    ],
    analysis:
`1 → Edmond Becquerel. 2 → silicon. 3 → 22.`,
  },

  // ───────── 11. Summary Completion ─────────
  {
    id: "smc-004", type: "summary_completion", level: "B1", title: "Why Bee Numbers Are Falling", topic: "Ecology",
    passage:
`Honeybees and many wild bee species have suffered sharp population declines in recent decades. Researchers point to several converging causes: parasitic mites that weaken individual bees and spread viruses through colonies; widespread use of pesticides, particularly the family known as neonicotinoids; loss of varied wildflower habitat as agriculture turns to large monoculture fields; and warmer winters that disrupt natural cycles of overwintering.

Practical responses are spreading. Several European countries have restricted neonicotinoid use, farmers are being paid to leave wildflower strips at field edges, and beekeepers are breeding bees that are naturally resistant to varroa mites. The combined effect is modest but encouraging.`,
    instructions: "Complete the summary using NO MORE THAN TWO WORDS from the passage for each gap.",
    items: [
      { prompt: "1. Bee colonies are weakened by parasitic ___.",                    answer: "mites", acceptable: ["varroa mites"] },
      { prompt: "2. The pesticide family of greatest concern is the ___.",            answer: "neonicotinoids" },
      { prompt: "3. Modern farming reduces wildflower habitat by relying on ___.",   answer: "monoculture", acceptable: ["monoculture fields"] },
      { prompt: "4. Farmers are being paid to leave wildflower ___ at field edges.", answer: "strips" },
    ],
    analysis:
`1 → mites. 2 → neonicotinoids. 3 → monoculture. 4 → strips.`,
  },
  {
    id: "smc-005", type: "summary_completion", level: "B1", title: "The Amazon Rainforest", topic: "Environment",
    passage:
`The Amazon rainforest covers around 5.5 million square kilometres of South America, almost two thirds of which lies within Brazil. It contains an estimated 10 per cent of the world's known plant and animal species and stores billions of tonnes of carbon in its trees and soils. The forest also generates much of its own rainfall, recycling moisture released by transpiration from leaves.

Deforestation, primarily for cattle ranching and soybean farming, has cleared roughly a fifth of the original area. Scientists warn that further loss could push the system past a "tipping point" beyond which large parts of the Amazon would convert to drier savanna, releasing the carbon they had stored and worsening climate change.`,
    instructions: "Complete the summary using NO MORE THAN TWO WORDS OR A NUMBER from the passage for each gap.",
    items: [
      { prompt: "1. The Amazon contains roughly ___ per cent of known species.", answer: "10" },
      { prompt: "2. The forest recycles moisture released by ___ from leaves.",   answer: "transpiration" },
      { prompt: "3. The main drivers of deforestation are cattle ranching and ___ farming.", answer: "soybean", acceptable: ["soy"] },
      { prompt: "4. Beyond a tipping point, parts of the Amazon could become ___.", answer: "savanna", acceptable: ["drier savanna"] },
    ],
    analysis:
`1 → 10. 2 → transpiration. 3 → soybean. 4 → savanna.`,
  },
  {
    id: "smc-006", type: "summary_completion", level: "B1", title: "Kelp Forests", topic: "Marine ecology",
    passage:
`Kelp forests are dense underwater stands of large brown algae that grow along temperate coastlines around the world. They thrive in cool, nutrient-rich water and can grow more than 30 centimetres in a single day, forming towering canopies that shelter fish, sea otters, urchins and many other species.

In recent decades, several kelp forests have been damaged or destroyed by warming ocean temperatures and population explosions of sea urchins, which graze the kelp down to bare rock. The loss of natural predators such as sea otters has worsened these urchin outbreaks. Conservation projects in California and Tasmania are now reintroducing predators and even harvesting urchins by hand to allow the kelp to recover.`,
    instructions: "Complete the summary using NO MORE THAN TWO WORDS OR A NUMBER from the passage for each gap.",
    items: [
      { prompt: "1. Kelp can grow more than ___ centimetres in a single day.", answer: "30" },
      { prompt: "2. Population explosions of ___ have damaged many kelp forests.", answer: "sea urchins", acceptable: ["urchins"] },
      { prompt: "3. The loss of natural predators such as ___ has worsened the problem.", answer: "sea otters", acceptable: ["otters"] },
      { prompt: "4. Conservation projects are even ___ urchins by hand.",      answer: "harvesting" },
    ],
    analysis:
`1 → 30. 2 → sea urchins. 3 → sea otters. 4 → harvesting.`,
  },
  {
    id: "smc-007", type: "summary_completion", level: "B1", title: "The Rise of Renewable Electricity", topic: "Energy",
    passage:
`Worldwide, the share of electricity coming from renewable sources has more than doubled since 2000. Solar and wind power, in particular, have benefited from rapid falls in cost: a unit of solar electricity now costs around a tenth of what it cost in 2010. Many countries now generate more than half of their electricity from low-carbon sources, although progress varies sharply by region.

Two challenges remain. The intermittent nature of solar and wind requires investment in storage and grid upgrades, while the rapid expansion of renewables has not yet fully displaced fossil fuels. Total global emissions from electricity generation continue to fall, but more slowly than climate scientists had hoped.`,
    instructions: "Complete the summary using NO MORE THAN TWO WORDS from the passage for each gap.",
    items: [
      { prompt: "1. The share of renewable electricity has more than ___ since 2000.", answer: "doubled" },
      { prompt: "2. Solar electricity now costs about ___ of its 2010 price.",          answer: "a tenth" },
      { prompt: "3. The intermittent nature of solar and wind requires investment in ___.", answer: "storage" },
      { prompt: "4. Renewables have not yet fully displaced ___.",                       answer: "fossil fuels" },
    ],
    analysis:
`1 → doubled. 2 → a tenth. 3 → storage. 4 → fossil fuels.`,
  },

  // ───────── 12. Table Completion ─────────
  {
    id: "tc-004", type: "table_completion", level: "B1", title: "Three Great Rivers", topic: "Geography",
    passage:
`The world's longest rivers flow across continents and shape the cultures along their banks. The Nile, traditionally regarded as the longest, runs roughly 6,650 kilometres from sources in East Africa to its delta on the Mediterranean. It supports more than 250 million people in eleven countries.

The Amazon, in South America, is shorter at about 6,400 kilometres but discharges by far the largest volume of water — roughly one fifth of all river water flowing into the world's oceans. It is fed by more than a thousand tributaries.

The Yangtze in China, at around 6,300 kilometres, is the longest river entirely within a single country. The Three Gorges Dam, completed on the Yangtze in 2006, is the world's largest hydroelectric power station by capacity.`,
    instructions: "Complete the table using NO MORE THAN TWO WORDS OR A NUMBER for each gap.",
    visual:
`┌─────────┬─────────────────────┬──────────┬──────────────────────────────────┐
│ River   │ Continent           │ Length   │ Notable feature                  │
├─────────┼─────────────────────┼──────────┼──────────────────────────────────┤
│ Nile    │ Africa              │ (1) ___ km│ supports 11 countries            │
│ Amazon  │ South America       │ 6,400 km │ largest (2) ___ of any river     │
│ Yangtze │ Asia                │ 6,300 km │ Three Gorges (3) ___ completed 2006│
└─────────┴─────────────────────┴──────────┴──────────────────────────────────┘`,
    items: [
      { prompt: "Cell (1)", answer: "6,650", acceptable: ["6650"] },
      { prompt: "Cell (2)", answer: "volume", acceptable: ["water volume", "discharge"] },
      { prompt: "Cell (3)", answer: "Dam", acceptable: ["dam"] },
    ],
    analysis:
`(1) → 6,650. (2) → volume (or discharge). (3) → Dam.`,
  },
  {
    id: "tc-005", type: "table_completion", level: "B1", title: "Three Major World Religions", topic: "History · Religion",
    passage:
`Three of the world's largest religions trace their origins to specific regions and individuals. Christianity emerged in the first century CE in Roman-controlled Judea, founded on the teachings of Jesus of Nazareth, and now claims around 2.4 billion followers worldwide. Islam was founded in the seventh century in the Arabian city of Mecca by the prophet Muhammad and has approximately 1.9 billion adherents today. Buddhism began in northern India in the fifth century BCE through the teachings of the Buddha, Siddhartha Gautama, and counts roughly 500 million followers, mostly in Asia.

The three traditions also share certain characteristics: scriptures considered authoritative by their followers, regular communal worship, and ethical teachings that have shaped law and culture across continents.`,
    instructions: "Complete the table using NO MORE THAN TWO WORDS OR A NUMBER for each gap.",
    visual:
`┌────────────┬────────────────────┬────────────┬──────────────────────┐
│ Religion   │ Founded in / by    │ Century    │ Approx. followers    │
├────────────┼────────────────────┼────────────┼──────────────────────┤
│ Christianity│ (1) ___           │ 1st CE     │ 2.4 billion          │
│ Islam      │ Muhammad / Mecca   │ (2) ___ CE │ 1.9 billion          │
│ Buddhism   │ Siddhartha Gautama │ 5th BCE    │ (3) ___ million      │
└────────────┴────────────────────┴────────────┴──────────────────────┘`,
    items: [
      { prompt: "Cell (1)", answer: "Jesus", acceptable: ["Jesus of Nazareth"] },
      { prompt: "Cell (2)", answer: "7th", acceptable: ["seventh"] },
      { prompt: "Cell (3)", answer: "500" },
    ],
    analysis:
`(1) → Jesus. (2) → 7th. (3) → 500.`,
  },
  {
    id: "tc-006", type: "table_completion", level: "B1", title: "Three National Space Agencies", topic: "Science · Technology",
    passage:
`Three of the world's most active space agencies operate from very different contexts. NASA, the United States agency, was founded in 1958 in response to the Soviet launch of Sputnik. It currently has the largest space-exploration budget of any single agency, at roughly 25 billion dollars a year.

The European Space Agency, ESA, founded in 1975, is funded jointly by 22 member states and operates major launch facilities in French Guiana. China's national space programme, formally called the China National Space Administration or CNSA, was created in 1993 and has carried out the country's lunar and Mars missions, including a successful soft landing on the far side of the Moon in 2019.`,
    instructions: "Complete the table using NO MORE THAN TWO WORDS OR A NUMBER for each gap.",
    visual:
`┌────────┬──────────┬──────────────────────────────────────┐
│ Agency │ Founded  │ Notable feature                       │
├────────┼──────────┼──────────────────────────────────────┤
│ NASA   │ (1) ___  │ largest budget at $25 billion         │
│ ESA    │ 1975     │ funded by (2) ___ member states       │
│ CNSA   │ 1993     │ landed on the (3) ___ of the Moon     │
└────────┴──────────┴──────────────────────────────────────┘`,
    items: [
      { prompt: "Cell (1)", answer: "1958" },
      { prompt: "Cell (2)", answer: "22" },
      { prompt: "Cell (3)", answer: "far side" },
    ],
    analysis:
`(1) → 1958. (2) → 22. (3) → far side.`,
  },
  {
    id: "tc-007", type: "table_completion", level: "B1", title: "Three Olympic Host Cities", topic: "Sport · History",
    passage:
`The modern Summer Olympic Games are held every four years in a different host city. The 2008 Games in Beijing, China, are remembered for their elaborate opening ceremony watched by an estimated 1.5 billion television viewers. The 2012 Games in London made the city the first to have hosted the Games three times, after earlier turns in 1908 and 1948. The 2020 Games, held in Tokyo, Japan, were postponed by a year because of the global Covid-19 pandemic and took place in 2021 with no spectators in the stands.`,
    instructions: "Complete the table using NO MORE THAN TWO WORDS OR A NUMBER for each gap.",
    visual:
`┌────────┬──────────┬───────────────────────────────────┐
│ Year   │ Host city│ Notable feature                    │
├────────┼──────────┼───────────────────────────────────┤
│ 2008   │ Beijing  │ opening watched by 1.5 (1) ___    │
│ 2012   │ (2) ___  │ first city to host three times    │
│ 2020   │ Tokyo    │ held in 2021 due to (3) ___       │
└────────┴──────────┴───────────────────────────────────┘`,
    items: [
      { prompt: "Cell (1)", answer: "billion" },
      { prompt: "Cell (2)", answer: "London" },
      { prompt: "Cell (3)", answer: "Covid-19", acceptable: ["the pandemic", "Covid", "the Covid-19 pandemic"] },
    ],
    analysis:
`(1) → billion. (2) → London. (3) → Covid-19.`,
  },

  // ───────── 13. Flow Chart Completion ─────────
  {
    id: "fc-004", type: "flow_chart_completion", level: "B1", title: "From Coffee Cherry to Roasted Bean", topic: "Agriculture · Food",
    passage:
`Coffee begins as a small red fruit called a cherry, which grows in clusters on tropical shrubs. Once ripe, the cherries are picked — by hand on the best estates — and taken to a processing plant within a few hours. There, the outer flesh is removed in one of two ways. In the "wet" method, water washes away the pulp; in the "dry" method, the cherries are spread out in the sun to shrivel for several weeks before the pulp is mechanically separated from the inner beans.

The freshly extracted beans are still covered by a thin parchment layer and are dried again until their moisture content falls to around 11 per cent. The parchment is then mechanically removed, exposing the green coffee bean that is shipped around the world.

At its destination, a roastery applies high heat for several minutes, causing dramatic chemical changes — the bean turns brown, releases volatile aromas and gives up much of its weight as steam. The cooled beans are packed and sold for grinding and brewing.`,
    instructions: "Complete the flow chart using NO MORE THAN TWO WORDS from the passage for each gap.",
    visual:
`Step 1: Ripe cherries are picked.
   ↓
Step 2: At the plant, pulp is removed by the wet or (1) ___ method.
   ↓
Step 3: Beans are dried until moisture reaches around (2) ___ per cent.
   ↓
Step 4: Parchment layer mechanically removed → green beans shipped.
   ↓
Step 5: At a (3) ___, high heat turns the beans brown and aromatic.
   ↓
Step 6: Cooled beans packed and sold.`,
    items: [
      { prompt: "Gap (1)", answer: "dry" },
      { prompt: "Gap (2)", answer: "11" },
      { prompt: "Gap (3)", answer: "roastery" },
    ],
    analysis:
`(1) → dry. (2) → 11. (3) → roastery.`,
  },
  {
    id: "fc-005", type: "flow_chart_completion", level: "B1", title: "How Wine Is Made", topic: "Food science",
    passage:
`Winemaking begins with the harvest. Ripe grapes are picked, sorted to remove leaves and damaged fruit, and transferred to a crusher that gently breaks the skins without smashing the pips. The resulting mixture of juice, skins and pulp, called must, is then transferred to fermentation tanks.

Yeast — either added by the winemaker or naturally present on the grape skins — converts the sugar in the must into alcohol and carbon dioxide over the next one to two weeks. For red wine the skins remain in the tank during this stage, releasing colour and tannin; for white wine they are removed first.

After fermentation, the wine is pressed to separate the liquid from the solids and aged in either steel tanks or oak barrels for months or years. Finally it is filtered, bottled and held for further ageing before sale.`,
    instructions: "Complete the flow chart using NO MORE THAN TWO WORDS from the passage for each gap.",
    visual:
`Step 1: Grapes harvested and sorted.
   ↓
Step 2: A (1) ___ gently breaks the skins.
   ↓
Step 3: Mixture (must) moved to fermentation tanks.
   ↓
Step 4: Yeast converts sugar into alcohol and (2) ___.
   ↓
Step 5: Wine pressed and aged in steel tanks or (3) ___ barrels.
   ↓
Step 6: Filtered, bottled and stored.`,
    items: [
      { prompt: "Gap (1)", answer: "crusher" },
      { prompt: "Gap (2)", answer: "carbon dioxide" },
      { prompt: "Gap (3)", answer: "oak" },
    ],
    analysis:
`(1) → crusher. (2) → carbon dioxide. (3) → oak.`,
  },
  {
    id: "fc-006", type: "flow_chart_completion", level: "B1", title: "Steel Production", topic: "Industry",
    passage:
`Modern steel begins with iron ore extracted from open-cast mines. The crushed ore is fed into a blast furnace along with coke (a treated form of coal) and limestone. Inside the furnace, hot air is blown up through the mixture; the coke burns at extremely high temperatures, releasing carbon monoxide that strips oxygen from the iron oxide and produces molten iron known as pig iron.

The pig iron is too brittle for most uses because it contains around 4 per cent carbon. To turn it into steel, oxygen is blown through the molten metal in a basic oxygen furnace, burning off most of the carbon and reducing it to less than 2 per cent. Other elements — such as nickel, chromium or manganese — can be added at this stage to give the steel specific properties.

The molten steel is finally poured into moulds, cooled into solid slabs, and rolled or shaped into the products demanded by industry.`,
    instructions: "Complete the flow chart using NO MORE THAN TWO WORDS from the passage for each gap.",
    visual:
`Step 1: Iron ore mined and crushed.
   ↓
Step 2: Ore, (1) ___ and limestone fed into a blast furnace.
   ↓
Step 3: Hot air blown through; molten "pig iron" produced.
   ↓
Step 4: In a basic oxygen furnace, oxygen burns off most of the (2) ___.
   ↓
Step 5: Other elements added to make specific steel grades.
   ↓
Step 6: Molten steel poured into moulds, cooled into (3) ___ and rolled.`,
    items: [
      { prompt: "Gap (1)", answer: "coke" },
      { prompt: "Gap (2)", answer: "carbon" },
      { prompt: "Gap (3)", answer: "slabs", acceptable: ["solid slabs"] },
    ],
    analysis:
`(1) → coke. (2) → carbon. (3) → slabs.`,
  },
  {
    id: "fc-007", type: "flow_chart_completion", level: "B1", title: "How Tap Water Is Treated", topic: "Engineering",
    passage:
`Treating raw water from a river or reservoir for safe drinking involves several stages. The water first enters large tanks where it is mixed with a chemical called a coagulant. The coagulant causes tiny suspended particles of mud and organic matter to clump together into larger flakes, which then settle to the bottom of the tank during a slower process called sedimentation.

The clearer water above the settled sludge is drawn off and passed through filters of fine sand and gravel that trap any remaining particles. Finally, a small amount of chlorine is added to kill bacteria and other pathogens, and the pH may be adjusted before the water enters the distribution network of pipes that carries it to homes and businesses.`,
    instructions: "Complete the flow chart using NO MORE THAN TWO WORDS from the passage for each gap.",
    visual:
`Step 1: Raw water mixed with a (1) ___ in large tanks.
   ↓
Step 2: Particles clump into flakes; flakes settle (sedimentation).
   ↓
Step 3: Clearer water passed through filters of sand and (2) ___.
   ↓
Step 4: A small amount of (3) ___ added to kill bacteria.
   ↓
Step 5: pH adjusted; water sent through distribution pipes.`,
    items: [
      { prompt: "Gap (1)", answer: "coagulant" },
      { prompt: "Gap (2)", answer: "gravel" },
      { prompt: "Gap (3)", answer: "chlorine" },
    ],
    analysis:
`(1) → coagulant. (2) → gravel. (3) → chlorine.`,
  },

  // ───────── 14. Diagram Completion ─────────
  {
    id: "dc-004", type: "diagram_completion", level: "B1", title: "A Plant Cell", topic: "Biology",
    passage:
`A typical plant cell is enclosed by a rigid cell wall made of cellulose, which gives the cell its shape. Just inside the wall lies the cell membrane, a thin layer that controls the movement of substances in and out of the cell. The inside of the cell is filled with a jelly-like fluid called cytoplasm, in which numerous specialised structures are suspended.

The largest of these structures, the nucleus, contains the cell's genetic material and directs all cellular activity. Scattered throughout the cytoplasm are smaller green bodies called chloroplasts, which carry out photosynthesis. A large central vacuole, filled with watery sap, helps maintain the cell's pressure and stores essential nutrients and waste products.`,
    instructions: "Label the diagram using NO MORE THAN TWO WORDS from the passage for each gap.",
    visual:
`┌─────────────────────────────────────┐ ← (1) ___ (rigid, made of cellulose)
│ ┌─────────────────────────────────┐ │ ← cell membrane
│ │       ●  ●                       │ │
│ │    ●       ●  (2) ___ (green)    │ │
│ │       ●                          │ │
│ │  ┌──────────┐                    │ │
│ │  │ (3) ___  │  ← contains DNA    │ │
│ │  └──────────┘                    │ │
│ │     [ large central vacuole ]    │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘`,
    items: [
      { prompt: "Label (1) — outermost rigid layer", answer: "cell wall" },
      { prompt: "Label (2) — green body that does photosynthesis", answer: "chloroplasts", acceptable: ["chloroplast"] },
      { prompt: "Label (3) — structure containing genetic material", answer: "nucleus" },
    ],
    analysis:
`(1) → cell wall. (2) → chloroplasts. (3) → nucleus.`,
  },
  {
    id: "dc-005", type: "diagram_completion", level: "B1", title: "Cross-Section of a Volcano", topic: "Earth science",
    passage:
`Inside the Earth, partially molten rock called magma collects in a large underground pool known as the magma chamber, often several kilometres beneath the surface. From the chamber, a roughly vertical channel called the main vent rises through the volcano's cone and reaches the open air at an opening called the crater.

When pressure in the chamber becomes high enough, magma is forced up the vent and erupts as lava, gas and ash. Some volcanoes also release smaller eruptions through side branches called secondary vents, which open out as small cones on the main slopes.`,
    instructions: "Label the diagram using NO MORE THAN TWO WORDS from the passage for each gap.",
    visual:
`           (3) ___
            ▼
       ╱──────╲       ← cone with secondary vents
      ╱   ║    ╲
     ╱    ║     ╲
   ─╱─────║──────╲─
          ║              ← (2) ___ (rises through the cone)
          ║
          ║
       ┌──╨──┐
       │     │           ← (1) ___ (pool of magma underground)
       └─────┘`,
    items: [
      { prompt: "Label (1)", answer: "magma chamber" },
      { prompt: "Label (2)", answer: "main vent", acceptable: ["vent"] },
      { prompt: "Label (3)", answer: "crater" },
    ],
    analysis:
`(1) → magma chamber. (2) → main vent. (3) → crater.`,
  },
  {
    id: "dc-006", type: "diagram_completion", level: "B1", title: "Inside a Camera", topic: "Optics",
    passage:
`A digital camera collects light through a curved glass lens at the front, which bends incoming rays so they converge at a single plane inside the body. Between the lens and the rest of the camera lies an adjustable aperture, an opening that can be made wider or narrower to control how much light enters in any moment.

Behind the aperture, a thin shutter blocks the light path until the photographer presses the button. When the shutter opens for a fraction of a second, the focused light reaches a digital image sensor at the back of the camera, where millions of tiny photodetectors record the brightness and colour of each point in the scene.`,
    instructions: "Label the diagram using NO MORE THAN TWO WORDS from the passage for each gap.",
    visual:
`Light entering →   (1) ___    (2) ___    shutter    (3) ___
                    [ () ]      [ ◇ ]      [ █ ]      [ ▣ ]
                  curved      controls               records the
                  glass        amount                 brightness
                  at front    of light                & colour`,
    items: [
      { prompt: "Label (1) — curved glass at the front", answer: "lens" },
      { prompt: "Label (2) — adjustable opening that controls light", answer: "aperture" },
      { prompt: "Label (3) — surface that records the image", answer: "image sensor", acceptable: ["sensor"] },
    ],
    analysis:
`(1) → lens. (2) → aperture. (3) → image sensor.`,
  },
  {
    id: "dc-007", type: "diagram_completion", level: "B1", title: "Chambers of the Human Heart", topic: "Biology",
    passage:
`The human heart has four chambers — two smaller upper chambers called atria, and two larger lower chambers called ventricles. Blood returning from the body, low in oxygen, enters the right atrium and then drops into the right ventricle, which pumps it through the pulmonary artery to the lungs to pick up oxygen.

The newly oxygenated blood returns to the left atrium and passes into the left ventricle. The left ventricle, which has the thickest muscle wall, then pumps the oxygen-rich blood out through the aorta to circulate around the entire body.`,
    instructions: "Label the diagram using NO MORE THAN TWO WORDS from the passage for each gap.",
    visual:
`            ↑ to lungs (pulmonary artery)
            │              ↑ to body (aorta)
   ┌────────┴──┐       ┌───┴──────────┐
   │ right     │       │ (3) ___      │   ← receives oxygenated
   │ (1) ___   │       │ atrium       │      blood from the lungs
   ├───────────┤       ├──────────────┤
   │ right     │       │ left         │
   │ ventricle │       │ (2) ___      │   ← thickest muscle wall;
   └───────────┘       └──────────────┘     pumps blood to body`,
    items: [
      { prompt: "Label (1)", answer: "atrium" },
      { prompt: "Label (2)", answer: "ventricle" },
      { prompt: "Label (3)", answer: "left" },
    ],
    analysis:
`(1) → atrium. (2) → ventricle. (3) → left.`,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ░░░░░░░░░░░░░░░░░░░░░░░░░  A2 ELEMENTARY LEVEL  ░░░░░░░░░░░░░░░░░░░░░░░░░
  // ═══════════════════════════════════════════════════════════════════════════

  // ── A2 · 1. Skimming ──
  {
    id: "sk-a2-001",
    type: "skimming",
    level: "A2",
    title: "My Cat Milo",
    topic: "Pets · Daily life",
    passage:
`I have a cat. His name is Milo. He is two years old and he is black and white. Milo likes to sleep on my bed in the morning. In the afternoon, he plays with a small ball. Milo eats fish food two times a day. I love my cat very much.`,
    instructions: "Skim the passage and choose the BEST answer.",
    options: [
      { label: "A", text: "How to buy a cat" },
      { label: "B", text: "A girl and her pet cat" },
      { label: "C", text: "Different kinds of cat food" },
      { label: "D", text: "Why cats sleep a lot" },
    ],
    items: [{ prompt: "What is the passage mainly about?", answer: "B" }],
    analysis:
`B is correct. The whole text is about the writer's pet cat Milo — his colour, what he does, and what he eats.

A: buying a cat is not mentioned.
C: only one type of food (fish) is named, not different kinds.
D: the cat sleeps in the morning, but the text is not really about why cats sleep.`,
  },

  // ── A2 · 2. Scanning ──
  {
    id: "scn-a2-001",
    type: "scanning",
    level: "A2",
    title: "Anna's School Day",
    topic: "School · Routines",
    passage:
`Anna is 12 years old. She lives in Madrid. She goes to school by bus at 8 o'clock. School starts at 8:30 and finishes at 3 o'clock. Her favourite subject is art. After school, she does her homework for one hour. On Saturdays, Anna plays football with her friends in the park.`,
    instructions: "Scan the passage to find the answers. Write ONE word or a number for each.",
    items: [
      { prompt: "How old is Anna?", answer: "12", acceptable: ["12 years old", "twelve"] },
      { prompt: "What time does school start?", answer: "8:30", acceptable: ["8.30", "half past eight"] },
      { prompt: "What is Anna's favourite subject?", answer: "art", acceptable: ["Art"] },
      { prompt: "On what day does she play football?", answer: "Saturday", acceptable: ["Saturdays", "saturday"] },
    ],
    analysis:
`Scanning means looking for specific words like numbers, times and names. You don't need to read every word — just look for the key word in the question and check the line near it.`,
  },

  // ── A2 · 3. Matching Headings ──
  {
    id: "mh-a2-001",
    type: "matching_headings",
    level: "A2",
    title: "My Family",
    topic: "Family · Personal",
    passage:
`[A] My name is Tom. I live in a small house with my mum, my dad and my little sister Lily. We are a happy family.

[B] My dad is a teacher. He works at a school in our town. My mum works at a hospital. She is a nurse.

[C] On Sundays, we always eat lunch together. My mum cooks pasta and my dad makes a salad. Lily and I help to put the plates on the table.`,
    instructions: "Match each paragraph (A–C) with the correct heading from the list.",
    options: [
      { label: "i",   text: "Sunday lunch at home" },
      { label: "ii",  text: "What my parents do for work" },
      { label: "iii", text: "A family holiday at the beach" },
      { label: "iv",  text: "The people in my family" },
      { label: "v",   text: "How I get to school" },
    ],
    items: [
      { prompt: "Paragraph A", answer: "iv" },
      { prompt: "Paragraph B", answer: "ii" },
      { prompt: "Paragraph C", answer: "i" },
    ],
    analysis:
`A → iv: Tom lists the people he lives with (mum, dad, sister).
B → ii: Both parents and their jobs (teacher, nurse).
C → i: A description of Sunday lunch.

iii (holiday) and v (school) are distractors — they are never mentioned in the text.`,
  },

  // ── A2 · 4. Matching Information ──
  {
    id: "mi-a2-001",
    type: "matching_information",
    level: "A2",
    title: "Three Friends and Their Hobbies",
    topic: "People · Hobbies",
    passage:
`[A] Sara is from Brazil. She loves football. She plays in a team every Saturday morning. Her favourite player is Marta.

[B] Kenji lives in Tokyo. He likes to draw. He has a small notebook and he draws people in the park every weekend.

[C] Emma is from Ireland. She enjoys reading. She reads two books every week, usually stories about animals.`,
    instructions: "Which paragraph (A, B or C) contains the following information?",
    options: [
      { label: "A", text: "Sara — football" },
      { label: "B", text: "Kenji — drawing" },
      { label: "C", text: "Emma — reading" },
    ],
    items: [
      { prompt: "1. The name of a person who plays in a team.", answer: "A" },
      { prompt: "2. A person who reads many books in a week.", answer: "C" },
      { prompt: "3. A person who uses a notebook for their hobby.", answer: "B" },
      { prompt: "4. A person whose favourite player is named.", answer: "A" },
    ],
    analysis:
`1 → A: "She plays in a team every Saturday morning."
2 → C: "She reads two books every week."
3 → B: "He has a small notebook and he draws."
4 → A: "Her favourite player is Marta."`,
  },

  // ── A2 · 5. Matching Features ──
  {
    id: "mf-a2-001",
    type: "matching_features",
    level: "A2",
    title: "Three Cities",
    topic: "Geography · Cities",
    passage:
`Paris is in France. It is famous for the Eiffel Tower. Many people visit Paris every year.

Cairo is in Egypt. It is famous for the pyramids. The pyramids are very old.

Sydney is in Australia. It is famous for the Opera House, a big white building near the sea.`,
    instructions: "Match each city (A–C) with the famous place that is in that city.",
    options: [
      { label: "A", text: "Paris" },
      { label: "B", text: "Cairo" },
      { label: "C", text: "Sydney" },
    ],
    items: [
      { prompt: "1. The Eiffel Tower", answer: "A" },
      { prompt: "2. The pyramids",     answer: "B" },
      { prompt: "3. The Opera House",  answer: "C" },
    ],
    analysis:
`Each landmark is named once in the passage, right next to its city. Look for the landmark name in the text and check the city in the same sentence.`,
  },

  // ── A2 · 6. Matching Sentence Endings ──
  {
    id: "mse-a2-001",
    type: "matching_sentence_endings",
    level: "A2",
    title: "A Trip to the Zoo",
    topic: "Animals · Free time",
    passage:
`Last Sunday I went to the zoo with my brother. We saw many animals. The elephants were very big and they ate a lot of fruit. The monkeys were funny because they jumped from tree to tree. My favourite animal was the lion. It was sleeping in the sun. We took photos of the giraffes too. They are tall and have long necks. We had a great day.`,
    instructions: "Complete each sentence by choosing the correct ending (A–E) from the list.",
    options: [
      { label: "A", text: "ate a lot of fruit." },
      { label: "B", text: "have long necks." },
      { label: "C", text: "was sleeping in the sun." },
      { label: "D", text: "live in cold countries." },
      { label: "E", text: "jumped from tree to tree." },
    ],
    items: [
      { prompt: "1. The elephants…", answer: "A" },
      { prompt: "2. The monkeys…",   answer: "E" },
      { prompt: "3. The lion…",      answer: "C" },
      { prompt: "4. The giraffes…",  answer: "B" },
    ],
    analysis:
`Each animal action is in the same sentence as the animal name. D ("live in cold countries") is the distractor — no animal in this passage is described that way.`,
  },

  // ── A2 · 7. True / False / Not Given ──
  {
    id: "tfng-a2-001",
    type: "true_false_not_given",
    level: "A2",
    title: "Pizza for Dinner",
    topic: "Food · Family",
    passage:
`Every Friday, my family eats pizza for dinner. My dad makes the pizza at home. He puts cheese, tomato and mushrooms on top. My little sister doesn't like mushrooms, so dad puts only cheese on her piece. We eat the pizza in front of the TV and watch a film together. My mum drinks tea, but the children drink water.`,
    instructions: "Decide if each statement is TRUE, FALSE, or NOT GIVEN.",
    items: [
      { prompt: "1. The family eats pizza every Friday.",            answer: "TRUE" },
      { prompt: "2. The pizza is made at a restaurant.",             answer: "FALSE" },
      { prompt: "3. The little sister likes mushrooms on her pizza.", answer: "FALSE" },
      { prompt: "4. The pizza costs ten dollars.",                   answer: "NOT GIVEN" },
      { prompt: "5. The family watches TV while they eat.",          answer: "TRUE" },
    ],
    analysis:
`1 TRUE: "Every Friday, my family eats pizza for dinner."
2 FALSE: "My dad makes the pizza at home" — not at a restaurant.
3 FALSE: "My little sister doesn't like mushrooms."
4 NOT GIVEN: the price is never mentioned.
5 TRUE: "We eat the pizza in front of the TV."`,
  },

  // ── A2 · 8. Multiple Choice ──
  {
    id: "mc-a2-001",
    type: "multiple_choice",
    level: "A2",
    title: "The Weather Today",
    topic: "Weather · Daily life",
    passage:
`Today the weather is cold but sunny. There are no clouds in the sky. It is 8 degrees in the morning and 12 degrees in the afternoon. There is no rain today, but tomorrow it will rain all day. People in the city are wearing warm coats and hats.`,
    instructions: "Read the passage and choose the correct answer.",
    options: [
      { label: "A", text: "It is hot and rainy." },
      { label: "B", text: "It is cold and sunny." },
      { label: "C", text: "It is warm and cloudy." },
      { label: "D", text: "It is cold and rainy." },
    ],
    items: [{ prompt: "What is the weather like today?", answer: "B" }],
    analysis:
`B is correct. The first sentence says clearly: "Today the weather is cold but sunny."

D is wrong: rain is for TOMORROW, not today. A and C contradict the cold/sunny description.`,
  },

  // ── A2 · 9. List Selection ──
  {
    id: "ls-a2-001",
    type: "list_selection",
    level: "A2",
    title: "What's in My Bag?",
    topic: "Objects · School",
    passage:
`I am a student. Every day I take my school bag with me. Inside my bag there is a notebook, three pens, my English book and a small bottle of water. I do not have a laptop in my bag because it is too heavy. I also bring an apple to eat at break time. My phone is in my pocket, not in my bag.`,
    instructions: "Which THREE items are in the writer's bag? Choose THREE letters.",
    options: [
      { label: "A", text: "a notebook" },
      { label: "B", text: "a laptop" },
      { label: "C", text: "an apple" },
      { label: "D", text: "a phone" },
      { label: "E", text: "an English book" },
      { label: "F", text: "a sandwich" },
    ],
    items: [{ prompt: "Choose THREE items that are in the bag.", answer: ["A", "C", "E"] }],
    analysis:
`A, C and E are correct (notebook, apple, English book — and water and pens, which are not options).

B is wrong: "I do not have a laptop in my bag."
D is wrong: "My phone is in my pocket, not in my bag."
F is wrong: a sandwich is never mentioned.`,
  },

  // ── A2 · 10. Choose a Title ──
  {
    id: "ct-a2-001",
    type: "choose_title",
    level: "A2",
    title: "Best title?",
    topic: "Holidays · Travel",
    passage:
`Last summer my family went to the beach for one week. We stayed in a small hotel near the sea. Every morning we swam in the warm water and built castles in the sand. In the afternoon we ate ice cream. In the evening we walked along the beach and looked at the stars. It was the best holiday of my life.`,
    instructions: "Choose the BEST title for this passage.",
    options: [
      { label: "A", text: "How to swim in the sea" },
      { label: "B", text: "A perfect week at the beach" },
      { label: "C", text: "The history of ice cream" },
      { label: "D", text: "Hotels in my country" },
    ],
    items: [{ prompt: "Best title for the passage:", answer: "B" }],
    analysis:
`B is correct. The passage describes one happy week at the beach (swimming, sandcastles, ice cream, evening walks).

A: swimming is mentioned, but it is just one activity.
C and D: never the topic.`,
  },

  // ── A2 · 11. Short Answer Questions ──
  {
    id: "sa-a2-001",
    type: "short_answer",
    level: "A2",
    title: "Tom's New Bike",
    topic: "Daily life · Family",
    passage:
`Last week, Tom's father bought him a new bike for his birthday. The bike is red. Tom is eight years old. Now he rides his bike to school every day with his best friend Jack. They take ten minutes to get there. On Saturdays, Tom rides his bike to the park.`,
    instructions: "Answer the questions. Use NO MORE THAN TWO WORDS for each answer.",
    items: [
      { prompt: "1. Who bought the bike?",         answer: "his father", acceptable: ["father", "Tom's father"] },
      { prompt: "2. What colour is the bike?",     answer: "red" },
      { prompt: "3. How old is Tom?",              answer: "eight", acceptable: ["8", "eight years"] },
      { prompt: "4. Who does Tom ride to school with?", answer: "Jack", acceptable: ["his friend", "best friend"] },
    ],
    analysis:
`Each answer is a single word or short phrase taken directly from the passage. Stay within the word limit (max 2 words).`,
  },

  // ── A2 · 12. Sentence Completion ──
  {
    id: "sc-a2-001",
    type: "sentence_completion",
    level: "A2",
    title: "My Brother the Footballer",
    topic: "Sport · Family",
    passage:
`My brother Mark is 15 years old and he loves football. He plays for his school team every Wednesday. His coach says Mark is the best player in the team. Mark trains for two hours every day after school. His dream is to be a famous football player one day.`,
    instructions: "Complete the sentences. Use NO MORE THAN TWO WORDS from the passage.",
    items: [
      { prompt: "1. Mark plays football for his ______ team.",        answer: "school" },
      { prompt: "2. The team plays every ______.",                   answer: "Wednesday", acceptable: ["wednesday"] },
      { prompt: "3. Mark trains for ______ every day.",              answer: "two hours" },
      { prompt: "4. He wants to be a famous ______ one day.",        answer: "football player", acceptable: ["footballer"] },
    ],
    analysis:
`Pick the exact word(s) from the passage. Don't change form (no plural/singular changes) and respect the word limit.`,
  },

  // ── A2 · 13. Summary Completion ──
  {
    id: "smc-a2-001",
    type: "summary_completion",
    level: "A2",
    title: "A Visit to the Park",
    topic: "Free time · Daily life",
    passage:
`On Saturday morning, Lina went to the park with her dog Max. The park was very busy. Many children were playing on the grass. Lina sat on a bench and read her book for one hour. Max ran after a small ball. After lunch, they walked home together. Lina was tired but happy.`,
    instructions: "Complete the summary. Choose ONE letter (A–G) for each gap.",
    options: [
      { label: "A", text: "school" },
      { label: "B", text: "park" },
      { label: "C", text: "happy" },
      { label: "D", text: "ball" },
      { label: "E", text: "morning" },
      { label: "F", text: "tea" },
      { label: "G", text: "book" },
    ],
    items: [
      { prompt: "On Saturday (1) ______, Lina went to the (2) ______ with her dog. She sat on a bench and read her (3) ______ while Max played with a (4) ______. At the end of the day Lina felt tired but (5) ______.", answer: "E" },
      { prompt: "Gap 2:", answer: "B" },
      { prompt: "Gap 3:", answer: "G" },
      { prompt: "Gap 4:", answer: "D" },
      { prompt: "Gap 5:", answer: "C" },
    ],
    analysis:
`(1) E morning — "On Saturday morning". (2) B park. (3) G book. (4) D ball. (5) C happy — "Lina was tired but happy."

A (school) and F (tea) are distractors not used.`,
  },

  // ── A2 · 14. Table Completion ──
  {
    id: "tc-a2-001",
    type: "table_completion",
    level: "A2",
    title: "School Timetable",
    topic: "School · Information",
    passage:
`Maria is at primary school. On Monday morning at 9 o'clock she has English. On Tuesday morning at 9 o'clock she has Maths. On Wednesday morning she has Science. The Maths teacher is Mr Brown and the English teacher is Miss Lopez. Maria's favourite teacher is Miss Lopez.`,
    instructions: "Complete the table. Use ONE word for each answer.",
    visual:
`┌───────────┬──────────┬─────────────┐
│ Day       │ Subject  │ Teacher     │
├───────────┼──────────┼─────────────┤
│ Monday    │ English  │ Miss (1)___ │
│ Tuesday   │ (2)___   │ Mr Brown    │
│ Wednesday │ (3)___   │ —           │
└───────────┴──────────┴─────────────┘`,
    items: [
      { prompt: "Cell (1)", answer: "Lopez", acceptable: ["lopez"] },
      { prompt: "Cell (2)", answer: "Maths", acceptable: ["maths", "math"] },
      { prompt: "Cell (3)", answer: "Science", acceptable: ["science"] },
    ],
    analysis:
`(1) Lopez — "the English teacher is Miss Lopez". (2) Maths — Tuesday is Maths. (3) Science — Wednesday is Science.`,
  },

  // ── A2 · 15. Flow Chart Completion ──
  {
    id: "fc-a2-001",
    type: "flow_chart_completion",
    level: "A2",
    title: "How to Make a Sandwich",
    topic: "Food · Instructions",
    passage:
`Making a cheese sandwich is very easy. First, take two pieces of bread. Then, put butter on one side of each piece. After that, put a slice of cheese in the middle. Finally, cut the sandwich in two pieces and eat it.`,
    instructions: "Complete the flow chart. Use ONE word for each answer.",
    visual:
`Take two pieces of (1)______
            ↓
Put (2)______ on one side of each piece
            ↓
Put a slice of (3)______ in the middle
            ↓
(4)______ the sandwich in two pieces`,
    items: [
      { prompt: "Step (1)", answer: "bread" },
      { prompt: "Step (2)", answer: "butter" },
      { prompt: "Step (3)", answer: "cheese" },
      { prompt: "Step (4)", answer: "Cut", acceptable: ["cut"] },
    ],
    analysis:
`Each step matches the order in the passage: bread → butter → cheese → cut.`,
  },

  // ── A2 · 16. Diagram Completion ──
  {
    id: "dc-a2-001",
    type: "diagram_completion",
    level: "A2",
    title: "Parts of a House",
    topic: "Home · Vocabulary",
    passage:
`My house has four main rooms. When you open the front door, you go into the living room. Next to the living room is the kitchen, where we cook. Upstairs there are two bedrooms — one for my parents and one for me. There is also a small bathroom upstairs.`,
    instructions: "Label the diagram. Use ONE word for each answer.",
    visual:
`        ┌─────────────────┐
UPSTAIRS│ bedroom │(2)____│
        ├─────────┼───────┤
        │ (3)____ room    │
        └────────┬────────┘
                 │
        ┌────────┴────────┐
GROUND  │ living  │(1)____│
FLOOR   │ room    │       │
        └─────────┴───────┘`,
    items: [
      { prompt: "Label (1) — next to the living room", answer: "kitchen" },
      { prompt: "Label (2) — second room upstairs",    answer: "bedroom" },
      { prompt: "Label (3) — small room upstairs",     answer: "bath", acceptable: ["bathroom"] },
    ],
    analysis:
`(1) kitchen — "Next to the living room is the kitchen".
(2) bedroom — "Upstairs there are two bedrooms".
(3) bath/bathroom — "There is also a small bathroom upstairs".`,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ░░░░░░░░░░░░░░░  B2 UPPER-INTERMEDIATE — CAMBRIDGE IELTS STYLE  ░░░░░░░░░░
  // ═══════════════════════════════════════════════════════════════════════════

  // ── B2 · 1. Skimming ──
  {
    id: "sk-b2-001",
    type: "skimming",
    level: "B2",
    title: "The Decline of Honeybees",
    topic: "Environment · Biology",
    passage:
`Over the past two decades, populations of the western honeybee, Apis mellifera, have suffered alarming declines across Europe and North America. Researchers initially attributed the losses to a single pathogen, but a growing consensus now points to the combined effect of several stressors: the parasitic Varroa mite, viral infections it transmits, large-scale exposure to neonicotinoid pesticides, and the loss of diverse forage caused by industrial monoculture. Beekeepers report unusually high winter mortality, sometimes losing entire colonies in a single season. Although managed hives can be rebuilt, the implications for agriculture are profound: an estimated three-quarters of leading global food crops depend, at least in part, on insect pollination. Without coordinated action — from reducing pesticide use to restoring wildflower margins — economists warn of substantial declines in yields of fruit, nuts and vegetables within a generation.`,
    instructions: "Skim the passage and choose the BEST answer.",
    options: [
      { label: "A", text: "How honey is produced commercially in Europe" },
      { label: "B", text: "The reasons behind honeybee decline and its agricultural consequences" },
      { label: "C", text: "A new pesticide that has eliminated the Varroa mite" },
      { label: "D", text: "The history of beekeeping in North America" },
    ],
    items: [{ prompt: "What is the writer's main purpose?", answer: "B" }],
    analysis:
`B is correct. The passage identifies multiple causes of decline (mites, viruses, pesticides, monoculture) and links them to consequences for food crops.

A: production methods are not discussed.
C: no new pesticide is mentioned — the opposite, pesticides are part of the problem.
D: history is not the focus.

Cambridge tip: when a passage moves from CAUSES to CONSEQUENCES, the main idea usually combines both.`,
  },

  // ── B2 · 2. Scanning ──
  {
    id: "scn-b2-001",
    type: "scanning",
    level: "B2",
    title: "The Voyager Missions",
    topic: "Space · Science",
    passage:
`NASA launched Voyager 2 on 20 August 1977, followed by Voyager 1 on 5 September 1977. Despite the order of launch, Voyager 1 reached Jupiter first, in March 1979, taking advantage of a faster trajectory. Each spacecraft carried a Golden Record, curated by a committee chaired by astronomer Carl Sagan, containing 116 images and a wide range of natural sounds. Voyager 1 crossed the heliopause — the boundary marking the edge of the Sun's influence — in August 2012 and is now travelling at roughly 17 kilometres per second. Voyager 2 followed in November 2018. Mission engineers expect that the on-board radioisotope generators will continue to provide power until around 2027, after which both probes will fall silent but continue to drift through interstellar space.`,
    instructions: "Scan the passage and answer with NO MORE THAN THREE WORDS or a number.",
    items: [
      { prompt: "1. On what exact date was Voyager 1 launched?", answer: "5 September 1977", acceptable: ["September 5 1977", "5 September, 1977"] },
      { prompt: "2. How many images are on the Golden Record?",  answer: "116" },
      { prompt: "3. Who chaired the Golden Record committee?",   answer: "Carl Sagan" },
      { prompt: "4. In what year did Voyager 2 cross the heliopause?", answer: "2018" },
      { prompt: "5. Until roughly which year will the generators provide power?", answer: "2027" },
    ],
    analysis:
`Scan for the type of information in each question — dates for 1, 4 and 5; a number for 2; a proper name for 3. Capital letters and numerals stand out visually, which makes scanning faster.`,
  },

  // ── B2 · 3. Matching Headings ──
  {
    id: "mh-b2-001",
    type: "matching_headings",
    level: "B2",
    title: "The Rise of Solar Power",
    topic: "Energy · Technology",
    passage:
`[A] In the late 1950s, photovoltaic cells were prohibitively expensive and produced electricity at roughly three hundred times the cost of conventional generation. Their use was therefore restricted to specialised applications such as powering early communications satellites, where weight and reliability outweighed cost.

[B] The picture changed dramatically as manufacturing scale increased and silicon-processing techniques matured. Between 2010 and 2020, the price of solar modules fell by more than ninety per cent, transforming the technology from a niche product into one of the cheapest sources of new electricity in many regions of the world.

[C] Yet the dramatic fall in module prices alone does not guarantee a smooth transition. Solar generation is intermittent: panels produce nothing at night and far less under heavy cloud. Integrating large quantities of solar power into national grids therefore requires substantial investment in storage, demand management, and long-distance transmission lines.

[D] Looking ahead, analysts expect solar capacity to continue its rapid growth, particularly in countries with abundant sunshine and rising electricity demand. Several governments now treat solar deployment as a central pillar of their climate strategy, although the pace of progress remains highly uneven between regions.`,
    instructions: "Match each paragraph (A–D) with the correct heading from the list.",
    options: [
      { label: "i",   text: "Early uses limited by high costs" },
      { label: "ii",  text: "How solar panels are manufactured today" },
      { label: "iii", text: "Why integrating solar into the grid is difficult" },
      { label: "iv",  text: "A dramatic collapse in module prices" },
      { label: "v",   text: "Solar power and the destruction of habitats" },
      { label: "vi",  text: "An uneven future driven by policy choices" },
      { label: "vii", text: "The discovery of the photovoltaic effect" },
    ],
    items: [
      { prompt: "Paragraph A", answer: "i" },
      { prompt: "Paragraph B", answer: "iv" },
      { prompt: "Paragraph C", answer: "iii" },
      { prompt: "Paragraph D", answer: "vi" },
    ],
    analysis:
`A → i: high prices restricted use to satellites.
B → iv: 90%+ price collapse 2010–2020.
C → iii: intermittency requires grid investment.
D → vi: uneven future, government policies.

ii (manufacturing process), v (habitats) and vii (discovery) are distractors not supported by the text.`,
  },

  // ── B2 · 4. Matching Information ──
  {
    id: "mi-b2-001",
    type: "matching_information",
    level: "B2",
    title: "The Story of Modern Antarctica",
    topic: "Geography · History",
    passage:
`[A] Although early Polynesian voyagers may have glimpsed Antarctic ice, the first confirmed sighting of the continent itself is generally credited to a Russian expedition led by Fabian von Bellingshausen in January 1820. Even then, several decades passed before any human set foot on the mainland.

[B] Throughout the late nineteenth and early twentieth centuries, exploration was driven largely by national pride. Expeditions led by figures such as Roald Amundsen and Robert Falcon Scott raced to reach the geographic South Pole, with mixed and sometimes tragic results.

[C] After the Second World War, scientific cooperation gradually replaced competition. The 1959 Antarctic Treaty, signed initially by twelve nations, set aside the entire continent below 60° South for peaceful, scientific use, and prohibited military activity, mineral mining and the disposal of nuclear waste.

[D] Today more than fifty countries participate in the Treaty system, and around forty year-round research stations operate across the continent. Climate scientists value Antarctica for the long environmental record preserved in its ice cores, which can stretch back hundreds of thousands of years.`,
    instructions: "Which paragraph (A–D) contains the following information?",
    options: [
      { label: "A", text: "Paragraph A" },
      { label: "B", text: "Paragraph B" },
      { label: "C", text: "Paragraph C" },
      { label: "D", text: "Paragraph D" },
    ],
    items: [
      { prompt: "1. A reference to bans on certain activities in Antarctica.", answer: "C" },
      { prompt: "2. The number of countries currently involved in Antarctic governance.", answer: "D" },
      { prompt: "3. A mention of competition between national expeditions.", answer: "B" },
      { prompt: "4. The name of the leader of the first confirmed sighting.", answer: "A" },
      { prompt: "5. A scientific use of Antarctic ice.", answer: "D" },
    ],
    analysis:
`1 → C: prohibitions on military, mining, nuclear waste.
2 → D: "more than fifty countries".
3 → B: Amundsen vs. Scott race to the Pole.
4 → A: Bellingshausen, January 1820.
5 → D: ice cores preserve a long environmental record.`,
  },

  // ── B2 · 5. Matching Features ──
  {
    id: "mf-b2-001",
    type: "matching_features",
    level: "B2",
    title: "Three Pioneers of Computing",
    topic: "History · Science",
    passage:
`Charles Babbage, working in early-Victorian London, designed the Difference Engine and later the more ambitious Analytical Engine, conceived as a fully mechanical, programmable calculator. Although the latter was never completed in his lifetime, its conceptual leap is widely regarded as the first description of a general-purpose computer.

Ada Lovelace, the daughter of the poet Lord Byron, collaborated closely with Babbage. In 1843 she published a set of detailed notes on the Analytical Engine that included an algorithm for computing Bernoulli numbers, often cited as the world's first computer program.

A century later, the British mathematician Alan Turing transformed the field by formalising what computation actually is. His 1936 paper introduced the abstract Turing machine, providing the theoretical foundation on which all modern programmable computers rest.`,
    instructions: "Match each statement with the correct person (A, B or C).",
    options: [
      { label: "A", text: "Charles Babbage" },
      { label: "B", text: "Ada Lovelace" },
      { label: "C", text: "Alan Turing" },
    ],
    items: [
      { prompt: "1. Provided the theoretical foundation of modern computing.", answer: "C" },
      { prompt: "2. Designed a fully mechanical programmable calculator.",     answer: "A" },
      { prompt: "3. Wrote what is often called the first computer program.",   answer: "B" },
      { prompt: "4. Published an influential paper in 1936.",                  answer: "C" },
      { prompt: "5. Worked on the Analytical Engine but never finished it.",   answer: "A" },
    ],
    analysis:
`Each statement maps to one person via a key term (Turing machine → C; Analytical Engine designer → A; algorithm for Bernoulli numbers → B; 1936 paper → C; never completed → A). Cambridge tip: features can be re-used, so check each statement on its own.`,
  },

  // ── B2 · 6. Matching Sentence Endings ──
  {
    id: "mse-b2-001",
    type: "matching_sentence_endings",
    level: "B2",
    title: "Coral Bleaching",
    topic: "Marine biology · Climate",
    passage:
`Reef-building corals live in a remarkable symbiotic partnership with single-celled algae known as zooxanthellae. The algae shelter inside coral tissue and, through photosynthesis, supply most of the host's energy. When sea surface temperatures rise even one or two degrees above the local seasonal maximum and remain elevated for several weeks, the partnership breaks down. Stressed corals expel their algal partners, exposing the white limestone skeleton beneath and producing the dramatic phenomenon known as bleaching. Bleached corals are not necessarily dead; if cooler conditions return quickly, the algae can recolonise the tissue and the reef recovers. Repeated, prolonged events, however, frequently lead to mass mortality, and recovery is further hampered when corals are also weakened by ocean acidification or coastal pollution.`,
    instructions: "Complete each sentence with the best ending (A–F).",
    options: [
      { label: "A", text: "supply most of the coral's energy through photosynthesis." },
      { label: "B", text: "is exposed when the algae are expelled." },
      { label: "C", text: "produce poisonous chemicals to defend the reef." },
      { label: "D", text: "if cooler conditions return quickly enough." },
      { label: "E", text: "are usually destroyed by deep-sea predators." },
      { label: "F", text: "is made worse by acidification and pollution." },
    ],
    items: [
      { prompt: "1. The zooxanthellae living inside coral tissue…", answer: "A" },
      { prompt: "2. The white limestone skeleton…",                 answer: "B" },
      { prompt: "3. A bleached reef may still recover…",            answer: "D" },
      { prompt: "4. The damage caused by repeated bleaching…",      answer: "F" },
    ],
    analysis:
`1 → A: algae provide energy via photosynthesis.
2 → B: skeleton is exposed when algae are lost.
3 → D: recovery depends on cool conditions returning.
4 → F: acidification + pollution worsen the impact.

C and E describe events not in the passage and are distractors.`,
  },

  // ── B2 · 7. True / False / Not Given ──
  {
    id: "tfng-b2-001",
    type: "true_false_not_given",
    level: "B2",
    title: "The Lost Library of Alexandria",
    topic: "History · Culture",
    passage:
`Founded in the third century BCE under the Ptolemaic rulers of Egypt, the Great Library of Alexandria came to symbolise the intellectual ambitions of the ancient Mediterranean. At its height, the library is thought to have housed several hundred thousand scrolls and to have employed scholars whose work shaped fields ranging from geography to literary criticism. Recent historians, however, have urged caution about the most dramatic accounts of its destruction. The popular image of a single catastrophic fire — often blamed on Julius Caesar in 48 BCE — does not fit the scattered surviving evidence, which instead suggests a long, uneven decline driven by political instability, shifting patronage and physical neglect. By the time Arab armies reached the city in the seventh century CE, the library as an institution had probably ceased to function for some time.`,
    instructions: "Decide if each statement is TRUE, FALSE, or NOT GIVEN according to the passage.",
    items: [
      { prompt: "1. The library was founded under Greek-speaking rulers of Egypt.", answer: "TRUE" },
      { prompt: "2. Modern historians agree that Julius Caesar destroyed the library in a single fire.", answer: "FALSE" },
      { prompt: "3. The library's scholars contributed to several different academic fields.", answer: "TRUE" },
      { prompt: "4. The library held more scrolls than any other library of its time.", answer: "NOT GIVEN" },
      { prompt: "5. The library was probably no longer functioning by the time Arab armies arrived.", answer: "TRUE" },
    ],
    analysis:
`1 TRUE: "Ptolemaic rulers" were Greek-speaking Macedonians.
2 FALSE: the passage explicitly questions that account.
3 TRUE: "geography to literary criticism".
4 NOT GIVEN: no comparison to other libraries is made.
5 TRUE: "had probably ceased to function for some time".`,
  },

  // ── B2 · 8. Multiple Choice ──
  {
    id: "mc-b2-001",
    type: "multiple_choice",
    level: "B2",
    title: "Why Languages Disappear",
    topic: "Linguistics · Society",
    passage:
`Linguists estimate that of the roughly seven thousand languages spoken today, nearly half may fall silent before the end of the century. Although natural change has always reshaped the world's linguistic map, the current rate of loss is historically exceptional. Migration to cities, schooling delivered exclusively in dominant national languages, and economic incentives that reward fluency in English, Mandarin or Spanish all encourage parents to bring up their children in the dominant tongue rather than the one their grandparents spoke. The damage is rarely the result of overt prohibition; far more often, it follows from a quiet, generational drift in which a language is gradually used in fewer settings, learnt by fewer children, and finally remembered only by elderly speakers.`,
    instructions: "Choose the BEST answer.",
    options: [
      { label: "A", text: "The main cause of language loss today is government bans on minority languages." },
      { label: "B", text: "Most language loss happens slowly, through choices made by ordinary families." },
      { label: "C", text: "Languages have always died at the same rate as today." },
      { label: "D", text: "Migration to cities has had no measurable effect on language use." },
    ],
    items: [{ prompt: "Which statement best reflects the writer's view?", answer: "B" }],
    analysis:
`B is correct: "rarely the result of overt prohibition... a quiet, generational drift" — i.e. ordinary family choices.

A directly contradicts the text. C is wrong: the rate is "historically exceptional". D is wrong: migration is listed as a cause.`,
  },

  // ── B2 · 9. List Selection ──
  {
    id: "ls-b2-001",
    type: "list_selection",
    level: "B2",
    title: "What Drives Volcanic Eruptions",
    topic: "Geology · Science",
    passage:
`Volcanologists draw a basic distinction between two main eruption styles. Effusive eruptions occur when magma is relatively low in dissolved gas and viscosity is moderate; lava streams from a vent and travels downslope at walking pace, posing limited danger to people who can move out of its path. Explosive eruptions, by contrast, involve viscous, gas-rich magma that fragments violently as it nears the surface. They can hurl ash and pumice many kilometres into the stratosphere, generate fast-moving pyroclastic flows that incinerate everything in their path, and trigger lahars when fresh ash mixes with rainwater or melting snow. Tsunamis are a further hazard when an eruption occurs underwater or causes a flank of the volcano to collapse into the sea.`,
    instructions: "Which THREE hazards of EXPLOSIVE eruptions are mentioned in the passage? Choose THREE letters.",
    options: [
      { label: "A", text: "Pyroclastic flows" },
      { label: "B", text: "Slow-moving lava streams" },
      { label: "C", text: "Lahars (mudflows)" },
      { label: "D", text: "Geyser eruptions" },
      { label: "E", text: "Earthquakes lasting several days" },
      { label: "F", text: "Ash thrown into the stratosphere" },
    ],
    items: [{ prompt: "Choose THREE explosive-eruption hazards.", answer: ["A", "C", "F"] }],
    analysis:
`A pyroclastic flows, C lahars, F ash to the stratosphere — all explicitly listed.

B describes effusive (not explosive) eruptions.
D and E are not mentioned at all.`,
  },

  // ── B2 · 10. Choose a Title ──
  {
    id: "ct-b2-001",
    type: "choose_title",
    level: "B2",
    title: "Best title?",
    topic: "Society · Cities",
    passage:
`The recent revival of interest in urban cycling owes as much to public policy as to changing personal taste. In cities that have invested heavily in protected lanes, secure parking and integrated public-transport links — Copenhagen, Bogotá and Utrecht among them — cycling has shifted from a marginal activity into a mainstream form of transport, used daily by people of all ages and incomes. Where infrastructure has been neglected, by contrast, even strong environmental motivations have failed to produce comparable change. The lesson, planners increasingly argue, is that travel choices are shaped less by individual virtue than by the streets and networks that surround the traveller.`,
    instructions: "Choose the BEST title for the passage.",
    options: [
      { label: "A", text: "How Copenhagen invented modern cycling" },
      { label: "B", text: "Why infrastructure matters more than virtue in shaping how people travel" },
      { label: "C", text: "The health benefits of riding a bicycle to work" },
      { label: "D", text: "A history of public transport in European capitals" },
    ],
    items: [{ prompt: "Best title:", answer: "B" }],
    analysis:
`B captures the central thesis: infrastructure and policy, not personal virtue, drive cycling uptake.

A: Copenhagen is one example, not the topic.
C: health benefits are never discussed.
D: only one mode (cycling) is the focus.`,
  },

  // ── B2 · 11. Short Answer Questions ──
  {
    id: "sa-b2-001",
    type: "short_answer",
    level: "B2",
    title: "The Discovery of Penicillin",
    topic: "Medicine · History",
    passage:
`In September 1928, the Scottish bacteriologist Alexander Fleming returned from holiday to his laboratory at St Mary's Hospital in London to find a stack of culture plates contaminated by a stray mould. Around one colony of the mould, the bacteria he had been growing had been destroyed. Fleming identified the contaminant as a Penicillium species and named the antibacterial substance it produced "penicillin". Although he published his findings in 1929, the chemical was unstable and difficult to purify, and clinical use only became possible after a team at Oxford, led by Howard Florey and Ernst Chain, developed reliable purification methods in the early 1940s. The three men shared the Nobel Prize for Physiology or Medicine in 1945.`,
    instructions: "Answer the questions with NO MORE THAN THREE WORDS or a number from the passage.",
    items: [
      { prompt: "1. In what month and year did Fleming make the discovery?", answer: "September 1928" },
      { prompt: "2. Which type of mould produced the antibacterial substance?", answer: "Penicillium", acceptable: ["a Penicillium species", "Penicillium species"] },
      { prompt: "3. Which university hosted the team that purified penicillin?", answer: "Oxford" },
      { prompt: "4. In which year was the Nobel Prize awarded?", answer: "1945" },
    ],
    analysis:
`Each answer comes directly from the passage. Stay within the word limit and do not paraphrase — the markers expect text from the passage.`,
  },

  // ── B2 · 12. Sentence Completion ──
  {
    id: "sc-b2-001",
    type: "sentence_completion",
    level: "B2",
    title: "The Spread of Printing",
    topic: "History · Technology",
    passage:
`Although movable type had been used in East Asia for centuries, Johannes Gutenberg's introduction of a metal-type printing press in Mainz around 1450 transformed the production of books in Europe. Within fifty years, presses had been established in more than two hundred European cities. The cost of producing a substantial volume fell to a small fraction of the manuscript price, allowing texts to circulate among an expanding class of literate readers. Historians often link the resulting "print revolution" to the Reformation, the rise of vernacular literature and the gradual standardisation of national languages.`,
    instructions: "Complete the sentences with NO MORE THAN TWO WORDS from the passage.",
    items: [
      { prompt: "1. Gutenberg's press used pieces of ______ type.",                          answer: "metal" },
      { prompt: "2. Within fifty years, presses had appeared in more than ______ cities.",   answer: "two hundred", acceptable: ["200"] },
      { prompt: "3. Printing greatly reduced the cost compared with the ______ price.",      answer: "manuscript" },
      { prompt: "4. Printing helped lead to the standardisation of national ______.",        answer: "languages" },
    ],
    analysis:
`Each gap is filled by a word taken directly from the passage. Make sure the word fits both grammatically and within the word limit.`,
  },

  // ── B2 · 13. Summary Completion ──
  {
    id: "smc-b2-001",
    type: "summary_completion",
    level: "B2",
    title: "Sleep and Memory",
    topic: "Neuroscience · Health",
    passage:
`Recent research has shown that sleep plays an active rather than a passive role in the formation of long-term memories. During slow-wave sleep, the brain replays patterns of activity recorded earlier in the day, gradually transferring information from temporary storage in the hippocampus to more durable networks in the cortex — a process known as consolidation. Subsequent rapid-eye-movement (REM) sleep appears to favour the integration of new material with existing knowledge, supporting both creative problem solving and emotional regulation. Conversely, even a single night of severely restricted sleep impairs the ability to form new memories the following day and dulls performance on tasks that depend on flexible thinking.`,
    instructions: "Complete the summary using letters from the box. Each option may be used ONCE.",
    options: [
      { label: "A", text: "consolidation" },
      { label: "B", text: "REM" },
      { label: "C", text: "hippocampus" },
      { label: "D", text: "cortex" },
      { label: "E", text: "creativity" },
      { label: "F", text: "exercise" },
      { label: "G", text: "blood pressure" },
    ],
    items: [
      { prompt: "During slow-wave sleep, memories are transferred from the (1) ______ to the (2) ______ in a process called (3) ______. (4) ______ sleep then helps integrate new material with existing knowledge and supports (5) ______. — Gap 1:", answer: "C" },
      { prompt: "Gap 2:", answer: "D" },
      { prompt: "Gap 3:", answer: "A" },
      { prompt: "Gap 4:", answer: "B" },
      { prompt: "Gap 5:", answer: "E" },
    ],
    analysis:
`(1) C hippocampus → (2) D cortex; (3) A consolidation; (4) B REM sleep; (5) E creative problem solving.

F (exercise) and G (blood pressure) are distractors not discussed in the passage.`,
  },

  // ── B2 · 14. Table Completion ──
  {
    id: "tc-b2-001",
    type: "table_completion",
    level: "B2",
    title: "Three Renewable Sources Compared",
    topic: "Energy · Environment",
    passage:
`Among renewable sources of electricity, hydropower remains the largest contributor worldwide, supplying roughly sixteen per cent of global generation. It depends on the controlled release of water through turbines and is therefore concentrated in countries with major river systems. Wind power, by contrast, exploits atmospheric movement and has expanded fastest in coastal Europe and the central United States; modern offshore turbines now exceed twelve megawatts of capacity each. Solar photovoltaic, which converts sunlight directly into electricity using semiconductor cells, has experienced the steepest cost reductions of the three since 2010 and is the dominant new source being added each year in tropical and subtropical regions.`,
    instructions: "Complete the table. Use NO MORE THAN TWO WORDS from the passage.",
    visual:
`┌─────────────────┬───────────────────────┬─────────────────────────────┐
│ Source          │ Resource exploited    │ Strongest growth region     │
├─────────────────┼───────────────────────┼─────────────────────────────┤
│ Hydropower      │ (1) ______            │ countries with major rivers │
│ Wind            │ atmospheric movement  │ coastal Europe / central (2)│
│ Solar PV        │ (3) ______            │ (4) ______ regions          │
└─────────────────┴───────────────────────┴─────────────────────────────┘`,
    items: [
      { prompt: "Cell (1)", answer: "water" },
      { prompt: "Cell (2)", answer: "United States", acceptable: ["US", "USA"] },
      { prompt: "Cell (3)", answer: "sunlight" },
      { prompt: "Cell (4)", answer: "tropical", acceptable: ["subtropical", "tropical and subtropical"] },
    ],
    analysis:
`(1) water — "controlled release of water through turbines".
(2) United States — "coastal Europe and the central United States".
(3) sunlight — "converts sunlight directly into electricity".
(4) tropical (or subtropical) — "tropical and subtropical regions".`,
  },

  // ── B2 · 15. Flow Chart Completion ──
  {
    id: "fc-b2-001",
    type: "flow_chart_completion",
    level: "B2",
    title: "How a Volcano is Born",
    topic: "Geology · Process",
    passage:
`Most of the world's volcanoes form along plate boundaries. At a subduction zone, an oceanic plate is forced beneath a lighter continental plate. As the descending slab reaches depths of around one hundred kilometres, water trapped in its sediments is released into the overlying mantle wedge. This water lowers the melting point of the surrounding rock, generating buoyant magma. The magma rises through fractures in the crust and accumulates in shallow reservoirs known as magma chambers. When pressure in the chamber eventually exceeds the strength of the overlying rock, an eruption occurs, building a volcanic edifice over many cycles.`,
    instructions: "Complete the flow chart. Use NO MORE THAN TWO WORDS from the passage.",
    visual:
`Oceanic plate is forced beneath a continental plate
            ↓
Slab releases (1) ______ into the mantle wedge
            ↓
The melting point of nearby rock is (2) ______
            ↓
Buoyant magma rises and collects in (3) ______
            ↓
(4) ______ exceeds the strength of overlying rock
            ↓
Eruption occurs`,
    items: [
      { prompt: "Step (1)", answer: "water" },
      { prompt: "Step (2)", answer: "lowered", acceptable: ["reduced"] },
      { prompt: "Step (3)", answer: "magma chambers", acceptable: ["shallow reservoirs", "a magma chamber"] },
      { prompt: "Step (4)", answer: "pressure" },
    ],
    analysis:
`(1) water — released from the descending slab.
(2) lowered — "lowers the melting point".
(3) magma chambers — "accumulates in shallow reservoirs known as magma chambers".
(4) pressure — "When pressure in the chamber eventually exceeds the strength of the overlying rock".`,
  },

  // ── B2 · 16. Diagram Completion ──
  {
    id: "dc-b2-001",
    type: "diagram_completion",
    level: "B2",
    title: "The Water Cycle",
    topic: "Earth science · Process",
    passage:
`Solar energy drives the global water cycle. Heat from the Sun causes water at the surface of the oceans to change from liquid to vapour, a process called evaporation. The vapour rises, cools as it ascends and condenses into tiny droplets that form clouds. When these droplets coalesce and become heavy enough, they fall as precipitation — rain, snow or hail. A portion of the precipitation that lands on the ground returns to rivers and lakes through surface run-off, while the rest soaks into the soil and slowly recharges underground reservoirs called aquifers, eventually flowing back to the sea.`,
    instructions: "Label the diagram. Use NO MORE THAN TWO WORDS from the passage.",
    visual:
`           ☁ ☁ ☁  ←  (3) ______ falls as rain/snow
            ↑
   (2) ______ → forms clouds
            ↑
   (1) ______ from ocean surface
            ↑
        ☼ Sun ☼
                                    ↓
                ground ──→ surface (4) ______ → rivers
                       └─→ soaks into soil → (5) ______`,
    items: [
      { prompt: "Label (1) — process at the ocean surface", answer: "Evaporation", acceptable: ["evaporation"] },
      { prompt: "Label (2) — vapour cools and turns to droplets", answer: "Condensation", acceptable: ["condensation"] },
      { prompt: "Label (3) — water falling from clouds",   answer: "Precipitation", acceptable: ["precipitation"] },
      { prompt: "Label (4) — water flowing across ground", answer: "run-off", acceptable: ["runoff", "surface run-off"] },
      { prompt: "Label (5) — underground reservoirs",      answer: "aquifers", acceptable: ["aquifer"] },
    ],
    analysis:
`(1) Evaporation — surface water becomes vapour.
(2) Condensation — vapour cools and forms droplets/clouds.
(3) Precipitation — droplets fall as rain/snow/hail.
(4) run-off — surface flow back to rivers.
(5) aquifers — underground reservoirs.`,
  },
];

E.push(
  ...a2Supplements,
  ...b1Supplements,
  ...b2Part1Supplements,
  ...b2Part2Supplements,
  ...patchSupplements,
  ...coherenceCohesion,
);

export const SKILL_EXERCISES: SkillExercise[] = E;

export function getExercisesForType(type: SkillQuestionType): SkillExercise[] {
  return SKILL_EXERCISES.filter((e) => e.type === type);
}

export function getExerciseById(id: string): SkillExercise | undefined {
  return SKILL_EXERCISES.find((e) => e.id === id);
}

import { answerMatches } from "./answer-matching";

/** Score one exercise: returns {correct, total, perItem: boolean[]}. */
export function scoreExercise(
  exercise: SkillExercise,
  userAnswers: (string | string[] | null)[],
): { correct: number; total: number; perItem: boolean[] } {
  const perItem = exercise.items.map((item, i) => {
    const ua = userAnswers[i];
    if (ua === null || ua === undefined) return false;
    const expected = item.answer;
    if (Array.isArray(expected)) {
      const provided = Array.isArray(ua) ? ua : [];
      if (provided.length !== expected.length) return false;
      const sortedExp = [...expected].map((s) => s.trim().toLowerCase()).sort();
      const sortedProv = [...provided].map((s) => s.trim().toLowerCase()).sort();
      return sortedExp.every((v, idx) => v === sortedProv[idx]);
    }
    const userStr = Array.isArray(ua) ? ua.join(",") : ua;
    if (typeof userStr !== "string" || !userStr.trim()) return false;
    const candidates = [expected, ...(item.acceptable ?? [])];
    return answerMatches(userStr, candidates);
  });
  const correct = perItem.filter(Boolean).length;
  return { correct, total: exercise.items.length, perItem };
}
