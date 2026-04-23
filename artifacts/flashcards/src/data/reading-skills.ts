/**
 * IELTS Reading Skills Practice — targeted exercises by question type.
 *
 * Currently seeded with 2 high-quality exercises per type (28 total).
 * Each exercise: real IELTS-Academic-style passage (~200–260 words), one question
 * matching the type, correct answer(s), and a detailed analysis.
 */

export type SkillQuestionType =
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
  { id: "matching_headings",        number: 1,  label: "Matching Headings",          arabicLabel: "مطابقة العناوين",          emoji: "🗂️", shortDesc: "Match each paragraph to a heading from a list (more headings than paragraphs).",            inputKind: "single_select_per_item", color: "from-indigo-500 to-violet-500" },
  { id: "matching_information",     number: 2,  label: "Matching Information",       arabicLabel: "مطابقة المعلومات",         emoji: "🔍", shortDesc: "Match statements to the paragraph (A, B, C…) that contains the information.",              inputKind: "single_select_per_item", color: "from-sky-500 to-blue-500" },
  { id: "matching_features",        number: 3,  label: "Matching Features",          arabicLabel: "مطابقة الخصائص",           emoji: "🧩", shortDesc: "Match facts to categories (e.g. researcher → discovery, event → date).",                    inputKind: "single_select_per_item", color: "from-teal-500 to-cyan-500" },
  { id: "matching_sentence_endings",number: 4,  label: "Matching Sentence Endings",  arabicLabel: "مطابقة نهايات الجمل",      emoji: "✂️", shortDesc: "Complete each sentence by picking the correct ending from a list.",                        inputKind: "single_select_per_item", color: "from-emerald-500 to-teal-500" },
  { id: "true_false_not_given",     number: 5,  label: "True / False / Not Given",   arabicLabel: "صح / خطأ / غير مذكور",     emoji: "✅", shortDesc: "Decide whether each statement is True, False, or Not Given based on the passage.",         inputKind: "single_select_per_item", color: "from-green-500 to-emerald-500" },
  { id: "multiple_choice",          number: 6,  label: "Multiple Choice",            arabicLabel: "اختيار من متعدد",          emoji: "🎯", shortDesc: "Choose the correct answer from four options (A, B, C, D).",                                inputKind: "single_select",          color: "from-amber-500 to-orange-500" },
  { id: "list_selection",           number: 7,  label: "List Selection",             arabicLabel: "اختيار من قائمة",          emoji: "☑️", shortDesc: "Pick multiple correct answers from a list (e.g. THREE that are mentioned).",               inputKind: "multi_select",           color: "from-orange-500 to-red-500" },
  { id: "choose_title",             number: 8,  label: "Choose a Title",             arabicLabel: "اختيار العنوان",           emoji: "📌", shortDesc: "Select the most appropriate title for the whole passage.",                                  inputKind: "single_select",          color: "from-rose-500 to-pink-500" },
  { id: "short_answer",             number: 9,  label: "Short Answer Questions",     arabicLabel: "إجابات قصيرة",             emoji: "✏️", shortDesc: "Answer specific questions in a few words taken from the passage.",                          inputKind: "text",                   color: "from-fuchsia-500 to-purple-500" },
  { id: "sentence_completion",      number: 10, label: "Sentence Completion",        arabicLabel: "إكمال الجمل",              emoji: "📝", shortDesc: "Fill the gaps in sentences with words taken directly from the passage.",                    inputKind: "text",                   color: "from-purple-500 to-indigo-500" },
  { id: "summary_completion",       number: 11, label: "Summary Completion",         arabicLabel: "إكمال الملخص",             emoji: "📄", shortDesc: "Complete a paragraph summary using words from the passage or a word box.",                  inputKind: "text",                   color: "from-violet-500 to-fuchsia-500" },
  { id: "table_completion",         number: 12, label: "Table Completion",           arabicLabel: "إكمال الجدول",             emoji: "📊", shortDesc: "Fill missing cells in a table using information from the passage.",                        inputKind: "text",                   color: "from-cyan-500 to-sky-500" },
  { id: "flow_chart_completion",    number: 13, label: "Flow Chart Completion",      arabicLabel: "إكمال المخطط",             emoji: "🔁", shortDesc: "Fill missing steps in a flow chart based on the passage.",                                  inputKind: "text",                   color: "from-blue-500 to-indigo-500" },
  { id: "diagram_completion",       number: 14, label: "Diagram Completion",         arabicLabel: "إكمال الرسم التوضيحي",     emoji: "🖼️", shortDesc: "Label parts of a diagram with information from the passage.",                              inputKind: "text",                   color: "from-pink-500 to-rose-500" },
];

export interface SkillItem {
  /** Item label shown to user (e.g. "i", "ii", "Question 1", "Step 2", or the statement itself for TFNG). */
  prompt: string;
  /** Correct answer. For multi-select use string[] (option labels); for everything else string. */
  answer: string | string[];
  /** Optional acceptable alternate spellings (case-insensitive, trimmed) for text inputs. */
  acceptable?: string[];
}

export interface SkillExercise {
  id: string;
  type: SkillQuestionType;
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
  // ───────────────────── 1. Matching Headings ─────────────────────
  {
    id: "mh-001",
    type: "matching_headings",
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
];

export const SKILL_EXERCISES: SkillExercise[] = E;

export function getExercisesForType(type: SkillQuestionType): SkillExercise[] {
  return SKILL_EXERCISES.filter((e) => e.type === type);
}

export function getExerciseById(id: string): SkillExercise | undefined {
  return SKILL_EXERCISES.find((e) => e.id === id);
}

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
    const userStr = (Array.isArray(ua) ? ua.join(",") : ua).trim().toLowerCase();
    if (userStr === expected.trim().toLowerCase()) return true;
    if (item.acceptable?.some((alt) => alt.trim().toLowerCase() === userStr)) return true;
    return false;
  });
  const correct = perItem.filter(Boolean).length;
  return { correct, total: exercise.items.length, perItem };
}
