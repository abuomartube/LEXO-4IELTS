/**
 * Coherence & Cohesion practice — 3 levels (A2 / B1 / B2).
 * Each exercise contains 20 items in this order:
 *   • Items 1–10  → Coherence (logical flow of ideas)
 *   • Items 11–20 → Cohesion  (linking words, references, pronouns)
 *
 * Each item is a multiple-choice question with its OWN options and a
 * brief explanation shown after submission.
 */

import type { SkillExercise } from "./reading-skills";

const exercises: SkillExercise[] = [
  // ──────────────────────────── A2 ────────────────────────────
  {
    id: "cc-a2-001",
    type: "coherence_and_cohesion",
    level: "A2",
    title: "Coherence and Cohesion · A2",
    topic: "Everyday English · 20 questions",
    passage:
`Coherence (ترابط الأفكار) means the IDEAS in a paragraph follow a clear, logical order — every sentence supports the same topic.

Cohesion (أدوات الربط والضمائر) means the SENTENCES are tied together with the right linking words and clear pronouns.

This practice has 20 short questions:
  • Questions 1–10  →  Coherence
  • Questions 11–20 →  Cohesion

You can submit at any time — you don't have to answer all 20 first.`,
    instructions: "Read each question and choose the BEST answer (A, B or C). You will see a short explanation for every question after you submit.",
    items: [
      // ── Coherence 1–10 ──
      {
        prompt: "1. Which paragraph shows the ideas in the CORRECT logical order?",
        options: [
          { label: "A", text: "I passed my final exam. I studied hard for three months. I received my university degree." },
          { label: "B", text: "I studied hard for three months. I passed my final exam. I received my university degree." },
          { label: "C", text: "I received my university degree. I passed my final exam. I studied hard for three months." },
        ],
        answer: "B",
        explanation: "Events must follow time order: study → pass → degree.",
      },
      {
        prompt:
`2. Read the paragraph. Which sentence breaks the coherence and should be REMOVED?
"(1) Swimming is a great sport. (2) It makes your whole body strong. (3) I bought a new car yesterday. (4) It also helps you relax after a long day."`,
        options: [
          { label: "A", text: "Sentence 1" },
          { label: "B", text: "Sentence 2" },
          { label: "C", text: "Sentence 3" },
          { label: "D", text: "Sentence 4" },
        ],
        answer: "C",
        explanation: "The car sentence is off-topic. Every sentence in a paragraph must support the main idea (swimming).",
      },
      {
        prompt:
`3. Choose the correct sentence to fix the WRONG contradiction here:
"Smoking causes cancer and heart problems. Therefore, smoking is very good for your body."`,
        options: [
          { label: "A", text: "Therefore, smoking is very bad for your health." },
          { label: "B", text: "Furthermore, smoking is very good for your body." },
          { label: "C", text: "For example, smoking is very good for your body." },
        ],
        answer: "A",
        explanation: "The conclusion must agree with the negative facts. 'Therefore … bad for your health' fits the cause-and-effect logic.",
      },
      {
        prompt: "4. Which order of sentences is logical for a morning routine?",
        options: [
          { label: "A", text: "I went to school. I had breakfast. I woke up." },
          { label: "B", text: "I woke up. I went to school. I had breakfast." },
          { label: "C", text: "I woke up. I had breakfast. I went to school." },
        ],
        answer: "C",
        explanation: "A morning routine follows time order: wake up → eat → leave for school.",
      },
      {
        prompt:
`5. Which sentence does NOT belong in this paragraph?
"(1) My favourite hobby is reading. (2) I read at least one book every week. (3) Books help me learn new words. (4) My brother loves football."`,
        options: [
          { label: "A", text: "Sentence 1" },
          { label: "B", text: "Sentence 2" },
          { label: "C", text: "Sentence 3" },
          { label: "D", text: "Sentence 4" },
        ],
        answer: "D",
        explanation: "Sentence 4 jumps to a new topic (football). The paragraph is about reading, not the brother's hobbies.",
      },
      {
        prompt:
`6. Which sentence is the BEST opening (topic sentence) for this paragraph?
"… It has hot summers and cool winters. People grow olives, oranges and grapes there. Many tourists visit its beaches every year."`,
        options: [
          { label: "A", text: "I went shopping with my friends yesterday." },
          { label: "B", text: "Spain has a wonderful Mediterranean climate." },
          { label: "C", text: "Football is the most popular sport in the world." },
        ],
        answer: "B",
        explanation: "A topic sentence introduces the main idea. The rest of the paragraph describes Spain's climate, food and tourism.",
      },
      {
        prompt: "7. Which order is correct for making a cup of tea?",
        options: [
          { label: "A", text: "Drink the tea. Boil the water. Put the tea bag in the cup." },
          { label: "B", text: "Boil the water. Put the tea bag in the cup. Pour the water in. Drink the tea." },
          { label: "C", text: "Put the tea bag in the cup. Drink the tea. Boil the water." },
        ],
        answer: "B",
        explanation: "Process steps must follow real time order: boil → put bag → pour water → drink.",
      },
      {
        prompt:
`8. Read the paragraph. Which sentence is OFF-TOPIC?
"(1) Healthy eating is very important. (2) Fruits and vegetables give us vitamins. (3) Drinking water keeps the body strong. (4) My phone battery dies very quickly."`,
        options: [
          { label: "A", text: "Sentence 1" },
          { label: "B", text: "Sentence 2" },
          { label: "C", text: "Sentence 3" },
          { label: "D", text: "Sentence 4" },
        ],
        answer: "D",
        explanation: "The phone battery has nothing to do with healthy eating. Off-topic sentences break coherence.",
      },
      {
        prompt:
`9. Choose the sentence that fixes the contradiction:
"Exercise makes the body strong and the heart healthy. So, you should sit on the sofa all day."`,
        options: [
          { label: "A", text: "So, you should walk for at least thirty minutes every day." },
          { label: "B", text: "However, exercise is dangerous for everyone." },
          { label: "C", text: "For example, you should sit on the sofa all day." },
        ],
        answer: "A",
        explanation: "The conclusion must support the positive facts. Walking every day matches the idea that exercise is healthy.",
      },
      {
        prompt: "10. Which order is logical for getting ready in the morning?",
        options: [
          { label: "A", text: "I had a shower. I got out of bed. I put on my clothes." },
          { label: "B", text: "I got out of bed. I had a shower. I put on my clothes." },
          { label: "C", text: "I put on my clothes. I had a shower. I got out of bed." },
        ],
        answer: "B",
        explanation: "You get out of bed first, shower next, then dress. The actions must match real-life sequence.",
      },

      // ── Cohesion 11–20 ──
      {
        prompt:
`11. Choose the best linking words to complete the paragraph:
"The hotel was very expensive. _____, it was dirty. _____, we decided to leave."`,
        options: [
          { label: "A", text: "For example / Because" },
          { label: "B", text: "Furthermore / As a result" },
          { label: "C", text: "However / But" },
        ],
        answer: "B",
        explanation: "'Furthermore' adds a second negative point. 'As a result' shows the effect (leaving).",
      },
      {
        prompt:
`12. The linking word is WRONG. Which word should replace "For example"?
"It was raining heavily. For example, we stayed at home."`,
        options: [
          { label: "A", text: "Therefore" },
          { label: "B", text: "Moreover" },
          { label: "C", text: "However" },
        ],
        answer: "A",
        explanation: "Staying home is the RESULT of the rain, so we need a result word: 'Therefore'.",
      },
      {
        prompt:
`13. The pronoun is unclear. Which sentence makes the meaning CLEAR?
"John gave Mark his book, and then he went home." (Who went home?)`,
        options: [
          { label: "A", text: "John gave Mark his book, and then it went home." },
          { label: "B", text: "John gave Mark his book, and then John went home." },
          { label: "C", text: "John gave Mark his book, and then they went home." },
        ],
        answer: "B",
        explanation: "Pronouns must point to ONE clear person. 'He' is ambiguous, so naming John removes the confusion.",
      },
      {
        prompt: `14. Choose the best linker: "I was very tired. _____, I went to bed early."`,
        options: [
          { label: "A", text: "However" },
          { label: "B", text: "So" },
          { label: "C", text: "But" },
        ],
        answer: "B",
        explanation: "Going to bed is the RESULT of being tired. 'So' shows cause and effect.",
      },
      {
        prompt: `15. Choose the correct word: "I have two cats. _____ are very friendly."`,
        options: [
          { label: "A", text: "It" },
          { label: "B", text: "He" },
          { label: "C", text: "They" },
        ],
        answer: "C",
        explanation: "Two cats = plural, so we use 'They'. 'It' is for one thing only.",
      },
      {
        prompt: `16. Choose the best linker: "The shirt was cheap. _____, it looked beautiful."`,
        options: [
          { label: "A", text: "Therefore" },
          { label: "B", text: "However" },
          { label: "C", text: "Because" },
        ],
        answer: "B",
        explanation: "There is a CONTRAST between cheap and beautiful. 'However' shows surprise.",
      },
      {
        prompt:
`17. The linking word is WRONG. Which word should replace "Therefore"?
"I was hungry. Therefore, I drank a glass of water."`,
        options: [
          { label: "A", text: "However" },
          { label: "B", text: "Because" },
          { label: "C", text: "For example" },
        ],
        answer: "A",
        explanation: "Drinking water does NOT solve hunger — there is a contrast. 'However' shows the contrast.",
      },
      {
        prompt:
`18. Choose the best pronoun: "Cars produce a lot of pollution. _____ is very bad for the air we breathe."`,
        options: [
          { label: "A", text: "They" },
          { label: "B", text: "It" },
          { label: "C", text: "He" },
        ],
        answer: "B",
        explanation: "'It' refers to the whole IDEA of pollution (uncountable). 'They' would refer to the cars themselves.",
      },
      {
        prompt:
`19. Choose the best set of order words to complete:
"_____, boil the water. _____, add the rice. _____, cover the pot for ten minutes."`,
        options: [
          { label: "A", text: "First / Then / Finally" },
          { label: "B", text: "Because / However / Therefore" },
          { label: "C", text: "For example / In addition / Although" },
        ],
        answer: "A",
        explanation: "A list of cooking steps needs sequence words: First → Then → Finally.",
      },
      {
        prompt:
`20. The pronoun is unclear. Which version is CLEAREST?
"Sara called Lina because she was late."`,
        options: [
          { label: "A", text: "Sara called Lina because she was late." },
          { label: "B", text: "Sara called Lina because Lina was late." },
          { label: "C", text: "Sara called Lina because they was late." },
        ],
        answer: "B",
        explanation: "'She' is ambiguous (Sara or Lina?). Repeating the name 'Lina' removes the confusion.",
      },
    ],
    analysis:
`Coherence vs Cohesion at A2:

• COHERENCE means your ideas follow a logical order. Three quick checks:
   1. Do the events follow real time order? (wake → shower → dress)
   2. Do all sentences talk about the SAME topic? (no sudden jumps)
   3. Does the conclusion agree with the facts? (no contradictions)

• COHESION means your sentences are CONNECTED with the right tools:
   – RESULT  → so, therefore, as a result
   – ADD     → and, also, furthermore, in addition
   – CONTRAST → but, however, although
   – ORDER   → first, then, next, finally
   – PRONOUNS must point clearly to ONE person/thing.

Common A2 mistakes:
   ✗ Using 'However' when you mean 'Therefore' (and vice versa).
   ✗ Using 'It' for a plural noun, or 'They' for one thing.
   ✗ Putting an off-topic sentence in the middle of a paragraph.

Tip: read your paragraph aloud. If a sentence sounds like a sudden jump, REMOVE it.`,
  },

  // ──────────────────────────── B1 ────────────────────────────
  {
    id: "cc-b1-001",
    type: "coherence_and_cohesion",
    level: "B1",
    title: "Coherence and Cohesion · B1",
    topic: "Familiar topics · 20 questions",
    passage:
`At B1 level, paragraphs are longer and use compound sentences. Coherence and cohesion become trickier:

  • COHERENCE — order of events, supporting details that match the topic, conclusions that follow the evidence.
  • COHESION  — a wider range of linkers (although, in addition, as a result, on the other hand, instead) and clearer reference words (this, these, such, one).

This practice has 20 questions:
  • Questions 1–10  → Coherence
  • Questions 11–20 → Cohesion

Submit whenever you like.`,
    instructions: "Choose the BEST answer for each question. Each question is independent — you do not need to answer all 20 to submit.",
    items: [
      // ── Coherence 1–10 ──
      {
        prompt:
`1. Which version is in the most LOGICAL order?
(a) The team celebrated their victory. (b) They scored a goal in the last minute. (c) The match seemed to end in a draw.`,
        options: [
          { label: "A", text: "a → b → c" },
          { label: "B", text: "c → b → a" },
          { label: "C", text: "b → a → c" },
        ],
        answer: "B",
        explanation: "First the match seems drawn, then a late goal is scored, then the team celebrates. Time order: c → b → a.",
      },
      {
        prompt:
`2. Which sentence breaks the topic and should be REMOVED?
"(1) Recycling helps protect the environment. (2) It saves energy and reduces pollution. (3) My uncle owns a small bakery in town. (4) Many cities now have separate bins for paper and plastic."`,
        options: [
          { label: "A", text: "Sentence 1" },
          { label: "B", text: "Sentence 2" },
          { label: "C", text: "Sentence 3" },
          { label: "D", text: "Sentence 4" },
        ],
        answer: "C",
        explanation: "Sentence 3 introduces an unrelated topic (the uncle's bakery). The paragraph is about recycling.",
      },
      {
        prompt:
`3. Fix the contradiction:
"Plastic bags damage the ocean and kill marine animals. Therefore, governments should produce many more of them."`,
        options: [
          { label: "A", text: "Therefore, governments should ban or limit their use." },
          { label: "B", text: "However, governments should produce many more of them." },
          { label: "C", text: "Furthermore, governments should produce many more of them." },
        ],
        answer: "A",
        explanation: "The conclusion must follow the negative facts. Banning bags is the logical response to the harm they cause.",
      },
      {
        prompt: "4. Which is the most logical order for explaining how a plant grows?",
        options: [
          { label: "A", text: "The plant produces flowers. The seed is planted. Roots and a stem develop." },
          { label: "B", text: "The seed is planted. Roots and a stem develop. The plant produces flowers." },
          { label: "C", text: "Roots and a stem develop. The plant produces flowers. The seed is planted." },
        ],
        answer: "B",
        explanation: "A natural process must follow time order: seed → roots/stem → flowers.",
      },
      {
        prompt:
`5. Which sentence is OFF-TOPIC?
"(1) Reading every day improves your vocabulary. (2) It also helps you concentrate for longer. (3) My new headphones were really expensive. (4) Furthermore, regular reading reduces stress."`,
        options: [
          { label: "A", text: "Sentence 1" },
          { label: "B", text: "Sentence 2" },
          { label: "C", text: "Sentence 3" },
          { label: "D", text: "Sentence 4" },
        ],
        answer: "C",
        explanation: "Headphones are unrelated to the benefits of reading. The other three sentences all support the topic.",
      },
      {
        prompt:
`6. Choose the BEST topic sentence for this paragraph:
"_____ Many people now order groceries, clothes and even furniture from their phones. Delivery times have become shorter, and prices are often lower than in shops."`,
        options: [
          { label: "A", text: "I bought a new pair of running shoes last week." },
          { label: "B", text: "Online shopping has changed the way people buy everyday items." },
          { label: "C", text: "Furniture stores are usually open on Sundays." },
        ],
        answer: "B",
        explanation: "A topic sentence introduces the main idea. The rest of the paragraph develops the topic of online shopping.",
      },
      {
        prompt:
`7. Which sentence does NOT support the topic?
"(1) Tourism brings money into many small towns. (2) Local restaurants and hotels hire more staff in summer. (3) Tourists often help promote local crafts. (4) The new motorway opens next year."`,
        options: [
          { label: "A", text: "Sentence 1" },
          { label: "B", text: "Sentence 2" },
          { label: "C", text: "Sentence 3" },
          { label: "D", text: "Sentence 4" },
        ],
        answer: "D",
        explanation: "Sentence 4 talks about a motorway, not the economic benefits of tourism. It breaks coherence.",
      },
      {
        prompt:
`8. Fix the contradiction:
"Daily exercise improves both physical and mental health. As a result, doctors recommend avoiding any physical activity."`,
        options: [
          { label: "A", text: "As a result, doctors recommend at least 30 minutes of activity each day." },
          { label: "B", text: "However, doctors recommend at least 30 minutes of activity each day." },
          { label: "C", text: "In contrast, doctors recommend avoiding all physical activity." },
        ],
        answer: "A",
        explanation: "'As a result' must lead to a conclusion that MATCHES the positive facts about exercise.",
      },
      {
        prompt: "9. Which paragraph has the best LOGICAL FLOW?",
        options: [
          { label: "A", text: "I missed the bus, so I arrived late. I left my house at eight. I had to wait 20 minutes for the next one." },
          { label: "B", text: "I left my house at eight. I missed the bus, so I had to wait 20 minutes for the next one. I arrived late." },
          { label: "C", text: "I arrived late. I left my house at eight. I missed the bus." },
        ],
        answer: "B",
        explanation: "Time order: leave home → miss bus / wait → arrive late. The cause comes before the effect.",
      },
      {
        prompt:
`10. Which sentence is OFF-TOPIC and should be removed?
"(1) Wind energy is one of the cleanest forms of power. (2) It produces no carbon emissions. (3) Modern wind turbines can power thousands of homes. (4) My grandmother makes the best apple pie in the village."`,
        options: [
          { label: "A", text: "Sentence 1" },
          { label: "B", text: "Sentence 2" },
          { label: "C", text: "Sentence 3" },
          { label: "D", text: "Sentence 4" },
        ],
        answer: "D",
        explanation: "The grandmother's pie has nothing to do with wind energy. Off-topic sentences break coherence.",
      },

      // ── Cohesion 11–20 ──
      {
        prompt:
`11. Choose the best linker:
"Many young people prefer to live in big cities. _____, life there can be very stressful and expensive."`,
        options: [
          { label: "A", text: "Furthermore" },
          { label: "B", text: "However" },
          { label: "C", text: "For example" },
        ],
        answer: "B",
        explanation: "There is a CONTRAST between liking the city and finding it stressful. 'However' signals contrast.",
      },
      {
        prompt:
`12. Choose the best pair of linkers:
"The price of fuel has gone up sharply. _____, public transport tickets have also increased. _____, many families are spending less on holidays."`,
        options: [
          { label: "A", text: "However / Although" },
          { label: "B", text: "In addition / As a result" },
          { label: "C", text: "For example / Because" },
        ],
        answer: "B",
        explanation: "'In addition' adds a second related fact. 'As a result' shows the consequence (less spending on holidays).",
      },
      {
        prompt:
`13. The linking word is WRONG. What should replace it?
"He had studied very little. Therefore, he passed the exam easily."`,
        options: [
          { label: "A", text: "Furthermore" },
          { label: "B", text: "Nevertheless" },
          { label: "C", text: "For example" },
        ],
        answer: "B",
        explanation: "Passing the exam after little study is UNEXPECTED. 'Nevertheless' (= in spite of this) shows surprise/contrast.",
      },
      {
        prompt:
`14. Which version uses the reference word CORRECTLY?`,
        options: [
          { label: "A", text: "I read three books last month. This were all by the same author." },
          { label: "B", text: "I read three books last month. These were all by the same author." },
          { label: "C", text: "I read three books last month. It were all by the same author." },
        ],
        answer: "B",
        explanation: "'These' is the plural form for 'three books'. 'This' is singular and 'It' refers to one thing.",
      },
      {
        prompt:
`15. The pronoun is unclear. Which version is CLEAREST?
"When the manager spoke to the new employee, she looked very nervous."`,
        options: [
          { label: "A", text: "When the manager spoke to the new employee, she looked very nervous." },
          { label: "B", text: "When the manager spoke to the new employee, the new employee looked very nervous." },
          { label: "C", text: "When the manager spoke to the new employee, they looked very nervous." },
        ],
        answer: "B",
        explanation: "'She' could mean the manager OR the employee. Repeating the noun removes the ambiguity.",
      },
      {
        prompt:
`16. Choose the best linker:
"He missed the train. _____, he was an hour late for the meeting."`,
        options: [
          { label: "A", text: "Although" },
          { label: "B", text: "Consequently" },
          { label: "C", text: "Instead" },
        ],
        answer: "B",
        explanation: "Being late is the RESULT of missing the train. 'Consequently' = 'as a result'.",
      },
      {
        prompt:
`17. Choose the best linker:
"_____ the rain was heavy, the children continued playing outside."`,
        options: [
          { label: "A", text: "Because" },
          { label: "B", text: "Although" },
          { label: "C", text: "So" },
        ],
        answer: "B",
        explanation: "Playing in heavy rain is UNEXPECTED. 'Although' introduces a contrast clause.",
      },
      {
        prompt:
`18. Which version uses 'one/ones' CORRECTLY?
"My old phone was broken, so I bought a new _____."`,
        options: [
          { label: "A", text: "it" },
          { label: "B", text: "ones" },
          { label: "C", text: "one" },
        ],
        answer: "C",
        explanation: "'One' replaces a singular countable noun ('phone'). 'Ones' is plural; 'it' refers to a specific thing.",
      },
      {
        prompt:
`19. Choose the best linker:
"The team trained very hard for months. _____, they won the championship."`,
        options: [
          { label: "A", text: "On the other hand" },
          { label: "B", text: "As a result" },
          { label: "C", text: "Although" },
        ],
        answer: "B",
        explanation: "Winning is the OUTCOME of training. 'As a result' shows cause and effect.",
      },
      {
        prompt:
`20. The pronoun reference is unclear. Which sentence is CLEAREST?
"Sami told Karim that his bike had been stolen."`,
        options: [
          { label: "A", text: "Sami told Karim that his bike had been stolen." },
          { label: "B", text: "Sami told Karim, 'My bike has been stolen.'" },
          { label: "C", text: "Sami told Karim that they bike had been stolen." },
        ],
        answer: "B",
        explanation: "Whose bike is 'his' — Sami's or Karim's? Direct speech makes the owner crystal clear.",
      },
    ],
    analysis:
`Key B1 lessons:

COHERENCE
• Time / cause–effect order: action → result, not the other way round.
• Topic discipline: every sentence supports the same idea — remove any sudden jumps.
• Conclusions match evidence: 'Therefore / As a result' must follow what was just said.

COHESION
• ADD          → in addition, furthermore, moreover, also
• RESULT       → so, therefore, as a result, consequently
• CONTRAST     → however, although, nevertheless, on the other hand
• EXAMPLE      → for example, for instance, such as
• REFERENCE    → 'this' (singular), 'these' (plural), 'one/ones' (replace nouns)
• PRONOUNS     → if 'he/she/it/they' could mean two different things, repeat the noun.

Test technique: when an IELTS sentence offers four similar linkers, ask 'is this an addition, a result, a contrast, or an example?' The answer is almost always one of those four.`,
  },

  // ──────────────────────────── B2 ────────────────────────────
  {
    id: "cc-b2-001",
    type: "coherence_and_cohesion",
    level: "B2",
    title: "Coherence and Cohesion · B2",
    topic: "Academic English · 20 questions",
    passage:
`At B2 (Cambridge IELTS standard), paragraphs use complex syntax and a wide range of cohesive devices. Examiners reward writing where:

  • COHERENCE — paragraphs build a clear argument: claim → evidence → analysis → conclusion. No abrupt topic shifts; no contradictions between premises and conclusion.
  • COHESION  — sophisticated linkers (consequently, nevertheless, in contrast, conversely, hence) and varied reference (this approach, such findings, the latter, the former) create a smooth, academic flow.

This practice has 20 questions:
  • Questions 1–10  → Coherence
  • Questions 11–20 → Cohesion

You may submit at any moment without answering every question.`,
    instructions: "Choose the BEST answer for each item. After submitting, read the explanations carefully — they highlight the academic logic IELTS examiners look for.",
    items: [
      // ── Coherence 1–10 ──
      {
        prompt:
`1. Which order produces the most LOGICAL paragraph?
(a) Therefore, robust regulation is essential before driverless vehicles enter our streets.
(b) Driverless vehicles offer obvious benefits in terms of safety and efficiency.
(c) However, recent trials have revealed serious flaws in their decision-making software.`,
        options: [
          { label: "A", text: "a → b → c" },
          { label: "B", text: "b → c → a" },
          { label: "C", text: "c → a → b" },
        ],
        answer: "B",
        explanation: "Academic structure: (b) claim → (c) counter-evidence → (a) conclusion. The conclusion must come last.",
      },
      {
        prompt:
`2. Which sentence breaks coherence and should be REMOVED?
"(1) Plastic pollution now affects every ocean on the planet. (2) Microplastics have been detected in the deepest marine trenches. (3) Many coastal communities depend on tourism for their income. (4) Researchers warn that these particles are entering the human food chain."`,
        options: [
          { label: "A", text: "Sentence 1" },
          { label: "B", text: "Sentence 2" },
          { label: "C", text: "Sentence 3" },
          { label: "D", text: "Sentence 4" },
        ],
        answer: "C",
        explanation: "The paragraph develops one idea — the spread of plastic pollution. Tourism income is unrelated and breaks the flow.",
      },
      {
        prompt:
`3. Fix the contradiction in this argument:
"Studies consistently show that prolonged screen time damages children's sleep and concentration. Hence, parents should encourage unlimited device use."`,
        options: [
          { label: "A", text: "Hence, parents should set clear limits on device use." },
          { label: "B", text: "Nevertheless, parents should encourage unlimited device use." },
          { label: "C", text: "For example, parents should set clear limits on device use." },
        ],
        answer: "A",
        explanation: "'Hence' must lead to a conclusion that follows the negative evidence. Limits are the logical response.",
      },
      {
        prompt:
`4. Which paragraph builds a CLAIM → EVIDENCE → CONCLUSION structure correctly?`,
        options: [
          { label: "A", text: "Many cities are investing heavily in renewable energy. Solar capacity in Spain has tripled since 2018. This trend is likely to accelerate in the next decade." },
          { label: "B", text: "Solar capacity in Spain has tripled since 2018. This trend is likely to accelerate in the next decade. Many cities are investing heavily in renewable energy." },
          { label: "C", text: "This trend is likely to accelerate in the next decade. Many cities are investing heavily in renewable energy. Solar capacity in Spain has tripled since 2018." },
        ],
        answer: "A",
        explanation: "The standard academic order is claim (renewables investment) → evidence (Spain figure) → conclusion (acceleration).",
      },
      {
        prompt:
`5. Which sentence is OFF-TOPIC?
"(1) Sleep quality has a direct impact on cognitive performance. (2) Adults who sleep fewer than six hours show reduced memory retention. (3) The latest smartphone has a 200-megapixel camera. (4) Chronic sleep deprivation is also linked to weakened immunity."`,
        options: [
          { label: "A", text: "Sentence 1" },
          { label: "B", text: "Sentence 2" },
          { label: "C", text: "Sentence 3" },
          { label: "D", text: "Sentence 4" },
        ],
        answer: "C",
        explanation: "The paragraph is about sleep and health. The smartphone camera is irrelevant.",
      },
      {
        prompt:
`6. Choose the BEST topic sentence:
"_____ Wind farms supply almost half of the country's electricity, while subsidies for fossil fuels have been cut sharply. Carbon emissions per capita have fallen by more than 30% in a decade."`,
        options: [
          { label: "A", text: "Many tourists visit the country each summer." },
          { label: "B", text: "Denmark has emerged as a leader in the transition to clean energy." },
          { label: "C", text: "Wind speeds vary considerably between coastal and inland regions." },
        ],
        answer: "B",
        explanation: "A topic sentence frames the whole paragraph. The supporting sentences develop the idea of Denmark's clean-energy leadership.",
      },
      {
        prompt:
`7. Which sentence does NOT support the paragraph's argument?
"(1) Remote work has reshaped urban property markets. (2) Demand for offices in city centres has fallen sharply. (3) Conversely, suburban housing prices have surged. (4) The local football team finished third in the league this year."`,
        options: [
          { label: "A", text: "Sentence 1" },
          { label: "B", text: "Sentence 2" },
          { label: "C", text: "Sentence 3" },
          { label: "D", text: "Sentence 4" },
        ],
        answer: "D",
        explanation: "Sentences 1–3 form a coherent argument about property markets. The football result is irrelevant.",
      },
      {
        prompt:
`8. Fix the flawed reasoning:
"Although solar panels have become significantly cheaper, the global adoption rate remains disappointing. Therefore, the technology is clearly affordable for the average household."`,
        options: [
          { label: "A", text: "Therefore, additional incentives may be needed to accelerate adoption." },
          { label: "B", text: "Therefore, the technology is clearly affordable for the average household." },
          { label: "C", text: "Furthermore, the technology is clearly affordable for the average household." },
        ],
        answer: "A",
        explanation: "If adoption is 'disappointing', the conclusion cannot claim affordability. A call for incentives logically follows.",
      },
      {
        prompt: "9. Which paragraph shows the most COHERENT argument?",
        options: [
          { label: "A", text: "Therefore, urban green spaces should be expanded. Trees absorb pollutants and reduce city temperatures. Recent studies confirm that residents living near parks report better mental health." },
          { label: "B", text: "Recent studies confirm that residents living near parks report better mental health. Trees also absorb pollutants and reduce city temperatures. Therefore, urban green spaces should be expanded." },
          { label: "C", text: "Trees absorb pollutants and reduce city temperatures. Therefore, urban green spaces should be expanded. Recent studies confirm that residents living near parks report better mental health." },
        ],
        answer: "B",
        explanation: "Logical academic flow: evidence 1 → evidence 2 → conclusion. The conclusion ('Therefore') must come AFTER the evidence.",
      },
      {
        prompt:
`10. Which sentence is OFF-TOPIC?
"(1) Antibiotic resistance has become one of the most serious threats facing modern medicine. (2) Bacteria have evolved rapidly to defeat once-reliable drugs. (3) The 2026 cricket world cup will be held in three different countries. (4) Without urgent action, routine infections may again become life-threatening."`,
        options: [
          { label: "A", text: "Sentence 1" },
          { label: "B", text: "Sentence 2" },
          { label: "C", text: "Sentence 3" },
          { label: "D", text: "Sentence 4" },
        ],
        answer: "C",
        explanation: "The paragraph develops a single argument about antibiotic resistance. The cricket tournament is unrelated.",
      },

      // ── Cohesion 11–20 ──
      {
        prompt:
`11. Choose the best linker:
"The new policy was widely criticised. _____, the government refused to withdraw it."`,
        options: [
          { label: "A", text: "Therefore" },
          { label: "B", text: "Nevertheless" },
          { label: "C", text: "Furthermore" },
        ],
        answer: "B",
        explanation: "There is a CONTRAST between criticism and the government's refusal. 'Nevertheless' = in spite of this.",
      },
      {
        prompt:
`12. Choose the best pair of linkers:
"Birth rates in many developed countries have declined steadily. _____, life expectancy continues to rise. _____, the population is ageing rapidly."`,
        options: [
          { label: "A", text: "However / However" },
          { label: "B", text: "Meanwhile / As a result" },
          { label: "C", text: "Therefore / Although" },
        ],
        answer: "B",
        explanation: "'Meanwhile' adds a parallel trend. 'As a result' shows the consequence (an ageing population).",
      },
      {
        prompt:
`13. The linker is wrong. Which word should replace it?
"The medication had completed all clinical trials successfully. Consequently, regulators delayed its approval for further investigation."`,
        options: [
          { label: "A", text: "Furthermore" },
          { label: "B", text: "Nevertheless" },
          { label: "C", text: "Hence" },
        ],
        answer: "B",
        explanation: "A delay is UNEXPECTED after successful trials. 'Nevertheless' captures this contrast; 'Consequently' wrongly suggests the delay was caused by the success.",
      },
      {
        prompt:
`14. Which sentence uses reference correctly?`,
        options: [
          { label: "A", text: "The committee considered two proposals: a tax increase and a spending cut. The latter was eventually adopted." },
          { label: "B", text: "The committee considered two proposals: a tax increase and a spending cut. The latter were eventually adopted." },
          { label: "C", text: "The committee considered two proposals: a tax increase and a spending cut. The latter has eventually adopted." },
        ],
        answer: "A",
        explanation: "'The latter' = the second of two items (spending cut), singular → 'was'. Option B uses the wrong verb form.",
      },
      {
        prompt:
`15. The pronoun reference is unclear. Which version is CLEAREST?
"When the minister met the journalist, she revealed details of the new policy."`,
        options: [
          { label: "A", text: "When the minister met the journalist, she revealed details of the new policy." },
          { label: "B", text: "When the minister met the journalist, the minister revealed details of the new policy." },
          { label: "C", text: "When the minister met the journalist, they revealed details of the new policy." },
        ],
        answer: "B",
        explanation: "'She' could refer to either woman. Repeating 'the minister' eliminates the ambiguity.",
      },
      {
        prompt:
`16. Choose the best linker for ACADEMIC contrast:
"Northern regions have invested heavily in public transport. _____, southern regions have prioritised road expansion."`,
        options: [
          { label: "A", text: "In contrast" },
          { label: "B", text: "As a result" },
          { label: "C", text: "Moreover" },
        ],
        answer: "A",
        explanation: "Two different approaches are being compared. 'In contrast' highlights the difference precisely.",
      },
      {
        prompt:
`17. Choose the best concessive linker:
"_____ the report's conclusions were widely accepted, several leading economists disputed its central assumptions."`,
        options: [
          { label: "A", text: "Because" },
          { label: "B", text: "Despite" },
          { label: "C", text: "Although" },
        ],
        answer: "C",
        explanation: "'Although' begins a contrast clause with a verb. 'Despite' would need a noun phrase ('despite the acceptance').",
      },
      {
        prompt:
`18. Which sentence uses 'such' correctly?`,
        options: [
          { label: "A", text: "The survey identified rising costs, falling demand and supply shortages. Such factors have squeezed small businesses." },
          { label: "B", text: "The survey identified rising costs, falling demand and supply shortages. Such of factors have squeezed small businesses." },
          { label: "C", text: "The survey identified rising costs, falling demand and supply shortages. Such factor have squeezed small businesses." },
        ],
        answer: "A",
        explanation: "'Such + plural noun' refers back neatly to the list of three items. The other versions are ungrammatical.",
      },
      {
        prompt:
`19. Choose the best linker:
"The drug proved highly effective in laboratory tests. _____, the same results have not been achieved in human trials."`,
        options: [
          { label: "A", text: "Hence" },
          { label: "B", text: "However" },
          { label: "C", text: "In addition" },
        ],
        answer: "B",
        explanation: "Lab success vs. trial failure is a contrast. 'However' marks this academic contrast clearly.",
      },
      {
        prompt:
`20. Choose the version that improves cohesion:
"The government introduced strict emission limits. The government also offered tax breaks for electric vehicles. The government's strategy reduced air pollution within two years."`,
        options: [
          { label: "A", text: "The government introduced strict emission limits. It also offered tax breaks for electric vehicles. This strategy reduced air pollution within two years." },
          { label: "B", text: "The government introduced strict emission limits. They also offered tax breaks for electric vehicles. These strategy reduced air pollution within two years." },
          { label: "C", text: "The government introduced strict emission limits. The government also offered tax breaks for electric vehicles. The strategy them reduced air pollution within two years." },
        ],
        answer: "A",
        explanation: "Replacing 'the government' with 'it' and 'the government's strategy' with 'this strategy' avoids repetition while keeping the meaning clear.",
      },
    ],
    analysis:
`B2 / Cambridge IELTS standards:

COHERENCE
• Build a clear argument inside every paragraph: CLAIM → EVIDENCE → ANALYSIS → CONCLUSION.
• The conclusion (Therefore / Hence / Consequently / Thus) must NEVER contradict the evidence above it.
• Cut any sentence that does not advance the central argument — examiners penalise off-topic detail.

COHESION
• Result        → therefore, hence, consequently, thus
• Addition      → moreover, furthermore, in addition
• Contrast      → however, nevertheless, in contrast, on the other hand, conversely
• Concession    → although, even though, despite + noun
• Reference     → 'this approach', 'such findings', 'the former / the latter'
• Substitution  → 'one / ones', 'do so', 'such'
• Avoid noun repetition: replace with pronouns (it, they) or summary nouns (this trend, these measures).

A common Band 5–6 problem is overusing one linker (e.g. 'However' three times in a paragraph). Aim for VARIETY — pick the linker that fits the relationship (result vs contrast vs addition), not the first one you remember.`,
  },
];

export default exercises;
