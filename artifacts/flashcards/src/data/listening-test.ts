export type ListeningQuestionType = "fill" | "mc" | "multiSelect";

export interface ListeningQuestion {
  num: number;
  text: string;
  answer: string;
  alternateAnswers?: string[];
}

export interface ListeningQuestionSection {
  instruction: string;
  type: ListeningQuestionType;
  questions: ListeningQuestion[];
  options?: { label: string; text: string }[];
}

export interface ListeningPart {
  id: number;
  title: string;
  audioSrc: string;
  questionRange: string;
  tableHtml?: string;
  questionSections: ListeningQuestionSection[];
}

export interface ListeningTest {
  id: string;
  label: string;
  source: string;
  parts: ListeningPart[];
}

export const listeningTests: ListeningTest[] = [
  {
    id: "listening-1",
    label: "Test 1",
    source: "Cambridge IELTS 20 — Test 1",
    parts: [
      {
        id: 1,
        title: "Restaurant Recommendations",
        audioSrc: "/listening-part1.mp3",
        questionRange: "Questions 1–10",
        tableHtml: `<table class="w-full text-sm border-collapse">
<thead><tr class="bg-muted/60"><th class="border border-border p-2 text-left font-bold">Name of restaurant</th><th class="border border-border p-2 text-left font-bold">Location</th><th class="border border-border p-2 text-left font-bold">Reason for recommendation</th><th class="border border-border p-2 text-left font-bold">Other comments</th></tr></thead>
<tbody>
<tr><td class="border border-border p-2 font-medium">The Junction</td><td class="border border-border p-2">Greyson Street, near the station</td><td class="border border-border p-2">Good for people who are especially keen on <strong>(1) ________</strong></td><td class="border border-border p-2">Quite expensive<br/>The <strong>(2) ________</strong> is a good place for a drink</td></tr>
<tr><td class="border border-border p-2 font-medium">Paloma</td><td class="border border-border p-2">In Bow Street next to the cinema</td><td class="border border-border p-2"><strong>(3) ________</strong> Food, good for sharing</td><td class="border border-border p-2">Staff are very friendly<br/>Need to pay £50 deposit<br/>A limited selection of <strong>(4) ________</strong> food on the menu</td></tr>
<tr><td class="border border-border p-2 font-medium">The <strong>(5) ________</strong></td><td class="border border-border p-2">At the top of a <strong>(6) ________</strong></td><td class="border border-border p-2">A famous chef<br/>All the <strong>(7) ________</strong> are very good<br/>Only uses <strong>(8) ________</strong> ingredients</td><td class="border border-border p-2">Set lunch costs <strong>(9) ________</strong> per person<br/>Portions probably of <strong>(10) ________</strong> size</td></tr>
</tbody></table>`,
        questionSections: [
          {
            instruction: "Complete the notes below.\nWrite ONE WORD AND/OR A NUMBER for each answer.",
            type: "fill",
            questions: [
              { num: 1, text: "Good for people who are especially keen on ________", answer: "fish" },
              { num: 2, text: "The ________ is a good place for a drink", answer: "roof" },
              { num: 3, text: "________ Food, good for sharing", answer: "Spanish" },
              { num: 4, text: "A limited selection of ________ food on the menu", answer: "vegetarian", alternateAnswers: ["vegetarians"] },
              { num: 5, text: "The ________ (name of restaurant)", answer: "Audley" },
              { num: 6, text: "At the top of a ________", answer: "hotel" },
              { num: 7, text: "All the ________ are very good", answer: "reviews" },
              { num: 8, text: "Only uses ________ ingredients", answer: "local" },
              { num: 9, text: "Set lunch costs ________ per person", answer: "30", alternateAnswers: ["thirty", "£30"] },
              { num: 10, text: "Portions probably of ________ size", answer: "average" },
            ],
          },
        ],
      },
      {
        id: 2,
        title: "Pottery & Kilns",
        audioSrc: "/listening-part2.mp3",
        questionRange: "Questions 11–20",
        questionSections: [
          {
            instruction: "Choose the correct letter, A, B or C.",
            type: "mc",
            options: [
              { label: "A", text: "A" },
              { label: "B", text: "B" },
              { label: "C", text: "C" },
            ],
            questions: [
              { num: 11, text: "Heather says pottery differs from other art forms because\nA. it lasts longer in the ground.\nB. it is practised by more people.\nC. it can be repaired more easily.", answer: "A" },
              { num: 12, text: "Archaeologists sometimes identify the use of ancient pottery from\nA. the clay it was made with.\nB. the marks that are on it.\nC. the basic shape of it.", answer: "B" },
              { num: 13, text: "Some people join Heather's pottery class because they want to\nA. create an item that looks very old.\nB. find something that they are good at.\nC. make something that will outlive them.", answer: "C" },
              { num: 14, text: "What does Heather value most about being a potter?\nA. its calming effect\nB. its messy nature\nC. its physical benefits", answer: "A" },
              { num: 15, text: "Most of the visitors to Edelman Pottery\nA. bring friends to join courses.\nB. have never made a pot before.\nC. try to learn techniques too quickly.", answer: "B" },
              { num: 16, text: "Heather reminds her visitors that they should\nA. put on their aprons.\nB. change their clothes.\nC. take off their jewellery.", answer: "C" },
            ],
          },
          {
            instruction: "Which TWO things does Heather explain about kilns?\nChoose TWO letters, A–E.",
            type: "multiSelect",
            options: [
              { label: "A", text: "what their function is" },
              { label: "B", text: "when they were invented" },
              { label: "C", text: "ways of keeping them safe" },
              { label: "D", text: "where to put one in your home" },
              { label: "E", text: "what some people use instead of one" },
            ],
            questions: [
              { num: 17, text: "Which TWO things does Heather explain about kilns? (Questions 17–18)", answer: "A,E" },
            ],
          },
          {
            instruction: "Which TWO points does Heather make about a potter's tools?\nChoose TWO letters, A–E.",
            type: "multiSelect",
            options: [
              { label: "A", text: "Some are hard to hold." },
              { label: "B", text: "Some are worth buying." },
              { label: "C", text: "Some are essential items." },
              { label: "D", text: "Some have memorable names." },
              { label: "E", text: "Some are available for use by participants." },
            ],
            questions: [
              { num: 19, text: "Which TWO points does Heather make about a potter's tools? (Questions 19–20)", answer: "C,E" },
            ],
          },
        ],
      },
      {
        id: 3,
        title: "Loneliness",
        audioSrc: "/listening-part3.mp3",
        questionRange: "Questions 21–30",
        questionSections: [
          {
            instruction: "Which TWO things do the students both believe are responsible for the increase in loneliness?\nChoose TWO letters, A–E.",
            type: "multiSelect",
            options: [
              { label: "A", text: "social media" },
              { label: "B", text: "smaller nuclear families" },
              { label: "C", text: "urban design" },
              { label: "D", text: "longer lifespans" },
              { label: "E", text: "a mobile workforce" },
            ],
            questions: [
              { num: 21, text: "Which TWO things are responsible for the increase in loneliness? (Questions 21–22)", answer: "C,E" },
            ],
          },
          {
            instruction: "Which TWO health risks associated with loneliness do the students agree are based on solid evidence?\nChoose TWO letters, A–E.",
            type: "multiSelect",
            options: [
              { label: "A", text: "a weakened immune system" },
              { label: "B", text: "dementia" },
              { label: "C", text: "cancer" },
              { label: "D", text: "obesity" },
              { label: "E", text: "cardiovascular disease" },
            ],
            questions: [
              { num: 23, text: "Which TWO health risks are based on solid evidence? (Questions 23–24)", answer: "A,E" },
            ],
          },
          {
            instruction: "Which TWO opinions do both the students express about the evolutionary theory of loneliness?\nChoose TWO letters, A–E.",
            type: "multiSelect",
            options: [
              { label: "A", text: "It has little practical relevance." },
              { label: "B", text: "It needs further investigation." },
              { label: "C", text: "It is misleading." },
              { label: "D", text: "It should be more widely accepted." },
              { label: "E", text: "It is difficult to understand." },
            ],
            questions: [
              { num: 25, text: "Which TWO opinions about the evolutionary theory of loneliness? (Questions 25–26)", answer: "A,B" },
            ],
          },
          {
            instruction: "Choose the correct letter, A, B or C.\nLoneliness and mental health",
            type: "mc",
            options: [
              { label: "A", text: "A" },
              { label: "B", text: "B" },
              { label: "C", text: "C" },
            ],
            questions: [
              { num: 27, text: "When comparing loneliness to depression, the students\nA. doubt that there will ever be a medical cure for loneliness.\nB. claim that the link between loneliness and mental health is overstated.\nC. express frustration that loneliness is not taken more seriously.", answer: "A" },
              { num: 28, text: "Why do the students decide to start their presentation with an example from their own experience?\nA. to explain how difficult loneliness can be\nB. to highlight a situation that most students will recognise\nC. to emphasise that feeling lonely is more common for men than women", answer: "B" },
              { num: 29, text: "The students agree that talking to strangers is a good strategy for dealing with loneliness because\nA. it creates a sense of belonging.\nB. it builds self-confidence.\nC. it makes people feel more positive.", answer: "A" },
              { num: 30, text: "The students find it difficult to understand why solitude is considered to be\nA. similar to loneliness.\nB. necessary for mental health.\nC. an enjoyable experience.", answer: "C" },
            ],
          },
        ],
      },
      {
        id: 4,
        title: "Reclaiming Urban Rivers",
        audioSrc: "/listening-part4.mp3",
        questionRange: "Questions 31–40",
        questionSections: [
          {
            instruction: "Complete the notes below.\nWrite ONE WORD ONLY for each answer.\n\nReclaiming urban rivers",
            type: "fill",
            questions: [
              { num: 31, text: "Industrial development led to pollution from ________ on the river bank.", answer: "factories" },
              { num: 32, text: "In 1957, the River Thames in London was declared biologically ________.", answer: "dead" },
              { num: 33, text: "Seals and even a ________ have been seen in the River Thames.", answer: "whale" },
              { num: 34, text: "Riverside warehouses are converted to restaurants and ________.", answer: "apartments" },
              { num: 35, text: "In Los Angeles, there are plans to build a riverside ________.", answer: "park" },
              { num: 36, text: "Display ________ projects.", answer: "art" },
              { num: 37, text: "In Paris, ________ are created on the sides of the river every summer.", answer: "beaches" },
              { num: 38, text: "Over 2 billion passengers already travel by ________ in cities round the world.", answer: "ferry" },
              { num: 39, text: "Goods could be transported by large freight barges and electric ________.", answer: "bikes" },
              { num: 40, text: "Or, in future, by ________.", answer: "drone", alternateAnswers: ["drones"] },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "listening-2",
    label: "Test 2",
    source: "Cambridge IELTS 20 — Test 2",
    parts: [
      {
        id: 1,
        title: "Support for Carers",
        audioSrc: "/listening2-part1.mp3",
        questionRange: "Questions 1–10",
        tableHtml: `<table class="w-full text-sm border-collapse">
<thead><tr class="bg-muted/60"><th class="border border-border p-2 text-left font-bold" colspan="2">Support for people caring for elderly relatives at home</th></tr></thead>
<tbody>
<tr><td class="border border-border p-2 font-medium w-1/3">Benefit for the carer</td><td class="border border-border p-2">Time for other responsibilities; a <strong>(1) ________</strong></td></tr>
<tr class="bg-muted/30"><td class="border border-border p-2 font-medium" colspan="2">Assessment of mother's needs — may include:</td></tr>
<tr><td class="border border-border p-2 pl-6">How much caring</td><td class="border border-border p-2">How much <strong>(2) ________</strong> it involves</td></tr>
<tr><td class="border border-border p-2 pl-6">Tasks involved</td><td class="border border-border p-2">Dressing · having a <strong>(3) ________</strong> · shopping · meals · dealing with <strong>(4) ________</strong></td></tr>
<tr><td class="border border-border p-2 pl-6">Especially difficult aspects</td><td class="border border-border p-2">Loss of <strong>(5) ________</strong> · <strong>(6) ________</strong> her · preventing a <strong>(7) ________</strong></td></tr>
<tr class="bg-muted/30"><td class="border border-border p-2 font-medium" colspan="2">Types of support that may be offered:</td></tr>
<tr><td class="border border-border p-2 pl-6">Transport costs</td><td class="border border-border p-2">Cost of a <strong>(8) ________</strong></td></tr>
<tr><td class="border border-border p-2 pl-6">Car-related costs</td><td class="border border-border p-2">Fuel and <strong>(9) ________</strong></td></tr>
<tr><td class="border border-border p-2 pl-6">Other support</td><td class="border border-border p-2">Help with housework · help to reduce <strong>(10) ________</strong></td></tr>
</tbody></table>`,
        questionSections: [
          {
            instruction: "Complete the table below.\nWrite ONE WORD AND/OR A NUMBER for each answer.",
            type: "fill",
            questions: [
              { num: 1, text: "Local councils can give the carer a ________ (time off)", answer: "break" },
              { num: 2, text: "Assessment includes how much ________ the caring involves", answer: "time" },
              { num: 3, text: "Tasks include helping her have a ________", answer: "shower" },
              { num: 4, text: "Tasks include dealing with ________", answer: "money" },
              { num: 5, text: "A difficult aspect: loss of ________", answer: "memory" },
              { num: 6, text: "A difficult aspect: ________ her", answer: "lifting" },
              { num: 7, text: "A difficult aspect: preventing a ________", answer: "fall" },
              { num: 8, text: "Transport costs: cost of a ________", answer: "taxi" },
              { num: 9, text: "Car-related costs: fuel and ________", answer: "insurance" },
              { num: 10, text: "Help to reduce ________", answer: "stress" },
            ],
          },
        ],
      },
      {
        id: 2,
        title: "Volunteering in the Community",
        audioSrc: "/listening2-part2.mp3",
        questionRange: "Questions 11–20",
        questionSections: [
          {
            instruction: "What is the role of the volunteers in each of the following activities?\nChoose the correct letter, A–I, next to Questions 11–16.\n\nA. providing entertainment\nB. providing publicity about a council service\nC. contacting local businesses\nD. giving advice to visitors\nE. collecting feedback on events\nF. selling tickets\nG. introducing guest speakers at an event\nH. encouraging cooperation between local organisations\nI. helping people find their seats",
            type: "mc",
            options: [
              { label: "A", text: "providing entertainment" },
              { label: "B", text: "providing publicity about a council service" },
              { label: "C", text: "contacting local businesses" },
              { label: "D", text: "giving advice to visitors" },
              { label: "E", text: "collecting feedback on events" },
              { label: "F", text: "selling tickets" },
              { label: "G", text: "introducing guest speakers at an event" },
              { label: "H", text: "encouraging cooperation between local organisations" },
              { label: "I", text: "helping people find their seats" },
            ],
            questions: [
              { num: 11, text: "Walking around the town centre", answer: "D" },
              { num: 12, text: "Helping at concerts", answer: "I" },
              { num: 13, text: "Getting involved with community groups", answer: "H" },
              { num: 14, text: "Helping with a magazine", answer: "E" },
              { num: 15, text: "Participating at lunches for retired people", answer: "A" },
              { num: 16, text: "Helping with the website", answer: "B" },
            ],
          },
          {
            instruction: "Choose the correct letter, A, B or C.",
            type: "mc",
            options: [
              { label: "A", text: "A" },
              { label: "B", text: "B" },
              { label: "C", text: "C" },
            ],
            questions: [
              { num: 17, text: "Which event requires the largest number of volunteers?\nA. the music festival\nB. the science festival\nC. the book festival", answer: "B" },
              { num: 18, text: "What is the most important requirement for volunteers at the festivals?\nA. interpersonal skills\nB. personal interest in the event\nC. flexibility", answer: "A" },
              { num: 19, text: "New volunteers will start working in the week beginning\nA. 2 September.\nB. 9 September.\nC. 23 September.", answer: "B" },
              { num: 20, text: "What is the next annual event for volunteers?\nA. a boat trip\nB. a barbecue\nC. a party", answer: "A" },
            ],
          },
        ],
      },
      {
        id: 3,
        title: "Human Geography Assignment",
        audioSrc: "/listening2-part3.mp3",
        questionRange: "Questions 21–30",
        questionSections: [
          {
            instruction: "What is Rosie and Colin's opinion about each of the following aspects of human geography?\nChoose the correct letter, A–G, next to Questions 21–25.\n\nA. The information given about this was too vague.\nB. This may not be relevant to their course.\nC. This will involve only a small number of statistics.\nD. It will be easy to find facts about this.\nE. The facts about this may not be reliable.\nF. No useful research has been done on this.\nG. The information provided about this was interesting.",
            type: "mc",
            options: [
              { label: "A", text: "The information given about this was too vague." },
              { label: "B", text: "This may not be relevant to their course." },
              { label: "C", text: "This will involve only a small number of statistics." },
              { label: "D", text: "It will be easy to find facts about this." },
              { label: "E", text: "The facts about this may not be reliable." },
              { label: "F", text: "No useful research has been done on this." },
              { label: "G", text: "The information provided about this was interesting." },
            ],
            questions: [
              { num: 21, text: "Population", answer: "D" },
              { num: 22, text: "Health", answer: "G" },
              { num: 23, text: "Economies", answer: "B" },
              { num: 24, text: "Culture", answer: "A" },
              { num: 25, text: "Poverty", answer: "E" },
            ],
          },
          {
            instruction: "Choose the correct letter, A, B or C.",
            type: "mc",
            options: [
              { label: "A", text: "A" },
              { label: "B", text: "B" },
              { label: "C", text: "C" },
            ],
            questions: [
              { num: 26, text: "Rosie says that in her own city the main problem is\nA. crime.\nB. housing.\nC. unemployment.", answer: "C" },
              { num: 27, text: "What recent additions to the outskirts of their cities are both students happy about?\nA. conference centres\nB. sports centres\nC. retail centres", answer: "A" },
              { num: 28, text: "The students agree that developing disused industrial sites may\nA. have unexpected costs.\nB. damage the urban environment.\nC. destroy valuable historical buildings.", answer: "A" },
              { num: 29, text: "The students will mention Masdar City as an example of an attempt to achieve\nA. daily collections for waste recycling.\nB. sustainable energy use.\nC. free transport for everyone.", answer: "B" },
              { num: 30, text: "When discussing the Eco town of Greenhill Abbots, Colin is uncertain about\nA. what its objectives were.\nB. why there was opposition to it.\nC. how much of it has actually been built.", answer: "C" },
            ],
          },
        ],
      },
      {
        id: 4,
        title: "Developing Food Trends",
        audioSrc: "/listening2-part4.mp3",
        questionRange: "Questions 31–40",
        questionSections: [
          {
            instruction: "Complete the notes below.\nWrite ONE WORD ONLY for each answer.\n\nDeveloping food trends",
            type: "fill",
            questions: [
              { num: 31, text: "The growth in interest in food fashions started with ________ of food being shared on social media.", answer: "photos", alternateAnswers: ["photographs", "pictures"] },
              { num: 32, text: "Sales of ________ food brands have grown through social media influencers.", answer: "vegan" },
              { num: 33, text: "Famous ________ are influential in food trends.", answer: "chefs", alternateAnswers: ["cooks"] },
              { num: 34, text: "________ were invited to visit avocado growers in South Africa.", answer: "journalists", alternateAnswers: ["reporters"] },
              { num: 35, text: "Avocado advertising focused on its ________ benefits.", answer: "health" },
              { num: 36, text: "Oat milk was promoted in the USA through ________ shops.", answer: "coffee" },
              { num: 37, text: "Oat milk appealed to consumers concerned about the ________.", answer: "environment" },
              { num: 38, text: "Norwegian skrei helped strengthen the ________ of Norwegian seafood.", answer: "reputation" },
              { num: 39, text: "Quinoa's success led to an increase in its ________.", answer: "price", alternateAnswers: ["cost"] },
              { num: 40, text: "Overuse of resources resulted in poor quality ________.", answer: "soil" },
            ],
          },
        ],
      },
    ],
  },
];

export function calculateListeningBand(correct: number): { band: number; label: string } {
  if (correct >= 39) return { band: 9, label: "Expert" };
  if (correct >= 37) return { band: 8.5, label: "Very Good" };
  if (correct >= 35) return { band: 8, label: "Very Good" };
  if (correct >= 32) return { band: 7.5, label: "Good" };
  if (correct >= 30) return { band: 7, label: "Good" };
  if (correct >= 26) return { band: 6.5, label: "Competent" };
  if (correct >= 23) return { band: 6, label: "Competent" };
  if (correct >= 18) return { band: 5.5, label: "Modest" };
  if (correct >= 16) return { band: 5, label: "Modest" };
  if (correct >= 13) return { band: 4.5, label: "Limited" };
  if (correct >= 11) return { band: 4, label: "Limited" };
  if (correct >= 8) return { band: 3.5, label: "Extremely Limited" };
  if (correct >= 6) return { band: 3, label: "Extremely Limited" };
  if (correct >= 4) return { band: 2.5, label: "Intermittent" };
  if (correct >= 1) return { band: 2, label: "Intermittent" };
  return { band: 0, label: "Did Not Attempt" };
}

export function getListeningRecommendation(band: number): string {
  if (band >= 8) return "Outstanding listening skills! You can follow complex discussions and extract specific details with ease. Keep practising with advanced academic lectures and fast-paced conversations to stay sharp.";
  if (band >= 7) return "Great work! You handle most listening tasks well. To move higher, focus on catching subtle details, numbers, and spelling in fast speech. Practise with varied accents and note-taking under time pressure.";
  if (band >= 6) return "You're progressing well! Work on identifying paraphrased information and distractors in multiple-choice questions. Listen to English podcasts, news, and lectures daily. Practise predicting answers before listening.";
  if (band >= 5) return "Keep going! Focus on following the flow of conversations and monologues. Practise spelling common words, recognising numbers and dates. Listen to English audio for at least 30 minutes daily and build your vocabulary.";
  return "Don't give up! Start with slower, clearer audio (BBC Learning English, TED-Ed) and work up to natural speed. Focus on understanding main ideas first, then details. Practise with transcripts to train your ear.";
}

export function getListeningArabicRecommendation(band: number): string {
  if (band >= 8) return "مهارات استماع متميزة! استمر في التدرب على المحاضرات الأكاديمية والمحادثات السريعة للحفاظ على مستواك.";
  if (band >= 7) return "عمل رائع! ركّز على التقاط التفاصيل الدقيقة والأرقام والهجاء في الكلام السريع. تدرّب مع لهجات متنوعة.";
  if (band >= 6) return "أنت تتقدم جيداً! اعمل على تحديد المعلومات المُعاد صياغتها. استمع للبودكاست والأخبار الإنجليزية يومياً.";
  if (band >= 5) return "استمر! ركّز على متابعة المحادثات وتدرّب على هجاء الكلمات والأرقام. استمع للإنجليزية ٣٠ دقيقة يومياً على الأقل.";
  return "لا تستسلم! ابدأ بتسجيلات بطيئة وواضحة ثم انتقل للسرعة الطبيعية. ركّز على فهم الأفكار الرئيسية أولاً.";
}
