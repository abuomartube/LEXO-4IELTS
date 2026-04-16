export interface WritingPrompt {
  id: string;
  taskType: "Task 1" | "Task 2";
  prompt: string;
  notes?: string;
}

export interface SpeakingQuestion {
  part: 1 | 2 | 3;
  text: string;
  cueCard?: string[];
}

export interface MockTestSet {
  id: string;
  label: string;
  writingTask1: WritingPrompt;
  writingTask2: WritingPrompt;
  speakingQuestions: SpeakingQuestion[];
}

export const MOCK_TEST_SETS: MockTestSet[] = [
  {
    id: "mock-1",
    label: "Mock Test 1",
    writingTask1: {
      id: "w1-1",
      taskType: "Task 1",
      prompt: "The bar chart below shows the percentage of households in owned and rented accommodation in England and Wales between 1918 and 2011.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.\n\nWrite at least 150 words.",
      notes: "Key data points: In 1918, roughly 23% owned homes and 77% rented. By 1971, ownership rose to about 51%. In 2001, ownership peaked at 69%. By 2011, ownership dropped slightly to 64% while renting increased to 36%.",
    },
    writingTask2: {
      id: "w2-1",
      taskType: "Task 2",
      prompt: "Some people believe that children should spend all of their free time with their families. Others believe that this is unnecessary or even negative.\n\nDiscuss both views and give your own opinion.\n\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.\n\nWrite at least 250 words.",
    },
    speakingQuestions: [
      { part: 1, text: "Where are you from?" },
      { part: 1, text: "Do you work or are you a student?" },
      { part: 1, text: "What do you enjoy most about your studies or work?" },
      { part: 1, text: "How do you usually spend your weekends?" },
      { part: 1, text: "Do you prefer spending time indoors or outdoors?" },
      {
        part: 2,
        text: "Describe a skill you would like to learn in the future.",
        cueCard: [
          "What the skill is",
          "Why you want to learn it",
          "How you would learn it",
          "And explain why you think this skill would be useful",
        ],
      },
      { part: 3, text: "Do you think schools should teach more practical skills? Why or why not?" },
      { part: 3, text: "How has technology changed the way people learn new skills?" },
      { part: 3, text: "Is it more important to have academic qualifications or practical skills in today's job market?" },
      { part: 3, text: "Do you think older people find it harder to learn new skills compared to younger people?" },
    ],
  },
  {
    id: "mock-2",
    label: "Mock Test 2",
    writingTask1: {
      id: "w1-2",
      taskType: "Task 1",
      prompt: "The line graph below shows the average monthly temperatures in three different cities — London, Dubai and Sydney — over the course of a year.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.\n\nWrite at least 150 words.",
      notes: "Key data: London ranges from 5°C (Jan) to 23°C (Jul). Dubai ranges from 19°C (Jan) to 42°C (Aug). Sydney ranges from 26°C (Jan/summer) to 13°C (Jul/winter). London and Dubai peak in summer months while Sydney's pattern is reversed (Southern Hemisphere).",
    },
    writingTask2: {
      id: "w2-2",
      taskType: "Task 2",
      prompt: "In many countries, the gap between the rich and the poor is increasing. What problems does this cause? What solutions can be proposed to address this issue?\n\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.\n\nWrite at least 250 words.",
    },
    speakingQuestions: [
      { part: 1, text: "What is your full name?" },
      { part: 1, text: "Where do you live?" },
      { part: 1, text: "Do you like the area where you live? Why or why not?" },
      { part: 1, text: "How often do you use public transport?" },
      { part: 1, text: "What kind of music do you enjoy listening to?" },
      {
        part: 2,
        text: "Describe a place you have visited that you found particularly interesting.",
        cueCard: [
          "Where the place is",
          "When you visited it",
          "What you did there",
          "And explain why you found it interesting",
        ],
      },
      { part: 3, text: "What are the benefits of travelling to different countries?" },
      { part: 3, text: "Do you think tourism can have negative effects on local communities?" },
      { part: 3, text: "How important is it for people to learn about other cultures?" },
      { part: 3, text: "Will virtual reality replace the need for physical travel in the future?" },
    ],
  },
  {
    id: "mock-3",
    label: "Mock Test 3",
    writingTask1: {
      id: "w1-3",
      taskType: "Task 1",
      prompt: "The pie charts below show the main reasons why agricultural land becomes less productive and how these causes vary by region worldwide.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.\n\nWrite at least 150 words.",
      notes: "Key data: Globally — over-grazing 35%, deforestation 30%, over-cultivation 28%, other 7%. In North America, deforestation is 45%. In Europe, over-cultivation is 40%. In Africa, over-grazing is 50%.",
    },
    writingTask2: {
      id: "w2-3",
      taskType: "Task 2",
      prompt: "Some people think that the best way to reduce crime is to give longer prison sentences. Others, however, believe there are better alternative ways of reducing crime.\n\nDiscuss both views and give your own opinion.\n\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.\n\nWrite at least 250 words.",
    },
    speakingQuestions: [
      { part: 1, text: "Can you tell me your full name?" },
      { part: 1, text: "What do you do — do you work or study?" },
      { part: 1, text: "Do you enjoy cooking? Why or why not?" },
      { part: 1, text: "How important is it to eat healthy food?" },
      { part: 1, text: "What is your favourite type of weather?" },
      {
        part: 2,
        text: "Describe a person who has had a significant influence on your life.",
        cueCard: [
          "Who the person is",
          "How you know them",
          "What they have done that influenced you",
          "And explain why they have had such a significant influence",
        ],
      },
      { part: 3, text: "Do you think celebrities have too much influence on young people?" },
      { part: 3, text: "What qualities make a good role model?" },
      { part: 3, text: "Is it better to be influenced by people you know personally or by public figures?" },
      { part: 3, text: "How has social media changed the way people influence each other?" },
    ],
  },
];

export const SECTION_DURATIONS = {
  listening: 30 * 60,
  reading: 60 * 60,
  writing: 60 * 60,
  speaking: 14 * 60,
} as const;

export type MockSection = "listening" | "reading" | "writing" | "speaking";

export const SECTION_ORDER: MockSection[] = ["listening", "reading", "writing", "speaking"];

export const SECTION_INFO: Record<MockSection, { label: string; icon: string; duration: string; description: string }> = {
  listening: { label: "Listening", icon: "🎧", duration: "30 minutes", description: "4 parts, 40 questions — audio-based comprehension" },
  reading: { label: "Reading", icon: "📖", duration: "60 minutes", description: "3 passages, 40 questions — academic reading comprehension" },
  writing: { label: "Writing", icon: "✍️", duration: "60 minutes", description: "Task 1 (report) + Task 2 (essay) — minimum 150 + 250 words" },
  speaking: { label: "Speaking", icon: "🎤", duration: "11–14 minutes", description: "Parts 1, 2, 3 — type your spoken responses" },
};

export function calculateOverallBand(scores: { listening: number; reading: number; writing: number; speaking: number }): number {
  const avg = (scores.listening + scores.reading + scores.writing + scores.speaking) / 4;
  return Math.round(avg * 2) / 2;
}
