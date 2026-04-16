export interface GrammarExercise {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  explanationAr: string;
}

export interface GrammarTopic {
  id: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  color: string;
  iconBg: string;
  rules: { rule: string; example: string; correction?: string }[];
  exercises: GrammarExercise[];
}

export const grammarTopics: GrammarTopic[] = [
  {
    id: "articles",
    title: "Articles (a, an, the)",
    titleAr: "أدوات التعريف والتنكير",
    description: "Arabic has no equivalent of 'a/an', so Arab learners often drop or misuse articles. Master when to use 'a', 'an', 'the', or no article.",
    descriptionAr: "لا يوجد في العربية ما يعادل a/an، لذا يخطئ كثير من الطلاب العرب في استخدام أدوات التعريف.",
    color: "text-sky-600",
    iconBg: "bg-sky-50 dark:bg-sky-900/20",
    rules: [
      { rule: "Use 'a/an' for singular countable nouns mentioned for the first time.", example: "I read a book yesterday." },
      { rule: "Use 'the' when both speaker and listener know which one.", example: "The book I read was fascinating." },
      { rule: "No article with uncountable nouns used in a general sense.", example: "Water is essential for life. (NOT: The water is essential...)" },
      { rule: "Use 'the' with superlatives and unique things.", example: "The sun rises in the east." },
      { rule: "No article before country names (usually), but use 'the' with republic/kingdom/states.", example: "She lives in France. He lives in the United Kingdom." },
    ],
    exercises: [
      {
        id: 1,
        question: "I need to buy ___ umbrella before it rains.",
        options: ["a", "an", "the", "no article"],
        correctIndex: 1,
        explanation: "'Umbrella' starts with a vowel sound, so we use 'an'. It's also the first mention.",
        explanationAr: "كلمة umbrella تبدأ بصوت متحرك، لذا نستخدم an.",
      },
      {
        id: 2,
        question: "___ education is important for everyone.",
        options: ["A", "An", "The", "No article"],
        correctIndex: 3,
        explanation: "When speaking about education in general (uncountable, general sense), no article is needed.",
        explanationAr: "عند الحديث عن التعليم بشكل عام لا نستخدم أداة تعريف.",
      },
      {
        id: 3,
        question: "She is ___ best student in our class.",
        options: ["a", "an", "the", "no article"],
        correctIndex: 2,
        explanation: "We use 'the' with superlatives (best, tallest, most important).",
        explanationAr: "نستخدم the مع صيغ التفضيل (best, tallest, most).",
      },
      {
        id: 4,
        question: "He wants to become ___ engineer.",
        options: ["a", "an", "the", "no article"],
        correctIndex: 1,
        explanation: "'Engineer' starts with a vowel sound. We use 'an' for professions with 'become'.",
        explanationAr: "كلمة engineer تبدأ بصوت متحرك، لذا نستخدم an.",
      },
      {
        id: 5,
        question: "Can you pass me ___ salt, please?",
        options: ["a", "an", "the", "no article"],
        correctIndex: 2,
        explanation: "Both speaker and listener know which salt — the one on the table. Use 'the'.",
        explanationAr: "كلا المتحدثين يعرف أي ملح — الموجود على الطاولة — لذا نستخدم the.",
      },
    ],
  },
  {
    id: "tense-consistency",
    title: "Tense Consistency",
    titleAr: "اتساق الأزمنة",
    description: "Shifting tenses mid-sentence or mid-paragraph is a common IELTS writing mistake. Keep your tenses consistent unless the time frame changes.",
    descriptionAr: "التنقل بين الأزمنة في الجملة أو الفقرة الواحدة خطأ شائع في كتابة الآيلتس.",
    color: "text-emerald-600",
    iconBg: "bg-emerald-50 dark:bg-emerald-900/20",
    rules: [
      { rule: "Stay in one tense within a paragraph unless the time frame genuinely changes.", example: "She studied hard and passed her exam. (Both past)" },
      { rule: "Use present tense for general truths, even when narrating past events.", example: "He learned that water boils at 100°C." },
      { rule: "Use past tense consistently when describing research findings.", example: "The study found that participants performed better under stress." },
      { rule: "Use present perfect for actions connecting past to now.", example: "The population has increased significantly since 2000." },
      { rule: "Avoid mixing 'will' with past tense in the same clause.", example: "Wrong: He said he will come. ✓ He said he would come." },
    ],
    exercises: [
      {
        id: 1,
        question: "Yesterday, she ___ to the library and studied for three hours.",
        options: ["goes", "went", "has gone", "is going"],
        correctIndex: 1,
        explanation: "'Yesterday' signals past tense. 'Went' matches 'studied' — both past simple.",
        explanationAr: "كلمة Yesterday تدل على الماضي. went تتوافق مع studied — كلاهما ماضٍ بسيط.",
      },
      {
        id: 2,
        question: "The graph shows that sales ___ dramatically in 2020.",
        options: ["rise", "rose", "have risen", "will rise"],
        correctIndex: 1,
        explanation: "'In 2020' is a specific past time, so we use past simple 'rose'.",
        explanationAr: "سنة 2020 وقت محدد في الماضي، لذا نستخدم الماضي البسيط rose.",
      },
      {
        id: 3,
        question: "Since the introduction of the internet, communication ___.",
        options: ["changed", "changes", "has changed", "is changing"],
        correctIndex: 2,
        explanation: "'Since' connects past to present — use present perfect 'has changed'.",
        explanationAr: "since تربط الماضي بالحاضر — نستخدم المضارع التام has changed.",
      },
      {
        id: 4,
        question: "He told me that he ___ the report the next day.",
        options: ["will finish", "would finish", "finishes", "finished"],
        correctIndex: 1,
        explanation: "Reported speech: 'will' shifts to 'would' after a past reporting verb ('told').",
        explanationAr: "الكلام المنقول: will تتحول إلى would بعد فعل ماضٍ (told).",
      },
      {
        id: 5,
        question: "The researcher argues that poverty ___ a major issue worldwide.",
        options: ["was", "is", "has been", "will be"],
        correctIndex: 1,
        explanation: "General truths use present tense even when the reporting verb is present ('argues').",
        explanationAr: "الحقائق العامة تستخدم المضارع حتى عند استخدام فعل في الحاضر (argues).",
      },
    ],
  },
  {
    id: "passive-voice",
    title: "Passive Voice",
    titleAr: "المبني للمجهول",
    description: "The passive voice is essential for IELTS Writing Task 1 (describing processes) and academic writing. Learn when and how to use it correctly.",
    descriptionAr: "المبني للمجهول ضروري في مهمة الكتابة 1 (وصف العمليات) والكتابة الأكاديمية.",
    color: "text-violet-600",
    iconBg: "bg-violet-50 dark:bg-violet-900/20",
    rules: [
      { rule: "Form: subject + be + past participle (+ by agent).", example: "The report was written by the committee." },
      { rule: "Use passive when the action is more important than who did it.", example: "The bridge was built in 1990." },
      { rule: "Use passive in processes: 'First, the materials are collected.'", example: "The water is filtered and then stored in tanks." },
      { rule: "Don't overuse passive — mix with active for better writing.", example: "While the data was collected by researchers, the analysis reveals new patterns." },
      { rule: "Match the passive tense to the time frame.", example: "Present: is done. Past: was done. Future: will be done. Perfect: has been done." },
    ],
    exercises: [
      {
        id: 1,
        question: "The new hospital ___ next year.",
        options: ["is built", "was built", "will be built", "has been built"],
        correctIndex: 2,
        explanation: "'Next year' = future time. Future passive = 'will be built'.",
        explanationAr: "next year تدل على المستقبل. المبني للمجهول المستقبلي = will be built.",
      },
      {
        id: 2,
        question: "English ___ in many countries around the world.",
        options: ["speaks", "is spoken", "was spoken", "has spoken"],
        correctIndex: 1,
        explanation: "General fact + the subject receives the action = present passive 'is spoken'.",
        explanationAr: "حقيقة عامة + الفاعل يتلقى الفعل = المضارع المبني للمجهول is spoken.",
      },
      {
        id: 3,
        question: "The results of the survey ___ last month.",
        options: ["publish", "are published", "were published", "have published"],
        correctIndex: 2,
        explanation: "'Last month' = past time. Past passive = 'were published'.",
        explanationAr: "last month تدل على الماضي. الماضي المبني للمجهول = were published.",
      },
      {
        id: 4,
        question: "Over 2 million copies ___ since the book was released.",
        options: ["sold", "are sold", "were sold", "have been sold"],
        correctIndex: 3,
        explanation: "'Since' = past to present. Present perfect passive = 'have been sold'.",
        explanationAr: "since تدل على الاستمرار من الماضي للحاضر = have been sold.",
      },
      {
        id: 5,
        question: "In the first stage, the raw materials ___.",
        options: ["collect", "collected", "are collected", "have collected"],
        correctIndex: 2,
        explanation: "Process descriptions use present passive: 'are collected'.",
        explanationAr: "وصف العمليات يستخدم المضارع المبني للمجهول: are collected.",
      },
    ],
  },
  {
    id: "conditionals",
    title: "Conditionals",
    titleAr: "الجمل الشرطية",
    description: "Conditionals are frequently tested in IELTS. Master the zero, first, second, and third conditionals to express different levels of possibility.",
    descriptionAr: "الجمل الشرطية تُختبر كثيراً في الآيلتس. أتقن الأنواع الأربعة للتعبير عن مستويات مختلفة من الاحتمال.",
    color: "text-amber-600",
    iconBg: "bg-amber-50 dark:bg-amber-900/20",
    rules: [
      { rule: "Zero conditional (facts): If + present, present.", example: "If you heat water to 100°C, it boils." },
      { rule: "First conditional (likely future): If + present, will + verb.", example: "If the government invests in education, literacy rates will improve." },
      { rule: "Second conditional (unlikely/hypothetical): If + past simple, would + verb.", example: "If I had more time, I would study another language." },
      { rule: "Third conditional (past unreal): If + past perfect, would have + past participle.", example: "If she had studied harder, she would have passed the exam." },
      { rule: "Don't use 'will' in the if-clause (common mistake).", example: "Wrong: If it will rain... ✓ If it rains, I will stay home." },
    ],
    exercises: [
      {
        id: 1,
        question: "If I ___ rich, I would travel the world.",
        options: ["am", "was/were", "will be", "had been"],
        correctIndex: 1,
        explanation: "Second conditional (hypothetical present): If + past simple. 'Were' is formally correct for all subjects.",
        explanationAr: "الشرطية الثانية (افتراضية): If + ماضٍ بسيط. were صحيحة لجميع الضمائر.",
      },
      {
        id: 2,
        question: "If you ___ ice in water, it floats.",
        options: ["put", "will put", "would put", "had put"],
        correctIndex: 0,
        explanation: "Zero conditional (scientific fact): If + present simple, present simple.",
        explanationAr: "الشرطية الصفرية (حقيقة علمية): If + مضارع بسيط، مضارع بسيط.",
      },
      {
        id: 3,
        question: "If she had left earlier, she ___ the bus.",
        options: ["will catch", "would catch", "would have caught", "catches"],
        correctIndex: 2,
        explanation: "Third conditional (past unreal): would have + past participle.",
        explanationAr: "الشرطية الثالثة (ماضٍ غير حقيقي): would have + التصريف الثالث.",
      },
      {
        id: 4,
        question: "If the weather ___ nice tomorrow, we will go to the beach.",
        options: ["is", "will be", "was", "would be"],
        correctIndex: 0,
        explanation: "First conditional (likely future): If + present simple, will + verb. Never use 'will' in the if-clause.",
        explanationAr: "الشرطية الأولى (مستقبل محتمل): If + مضارع بسيط. لا تستخدم will بعد if.",
      },
      {
        id: 5,
        question: "If I ___ you, I would accept the job offer.",
        options: ["am", "were", "will be", "had been"],
        correctIndex: 1,
        explanation: "Second conditional with advice: 'If I were you' (subjunctive mood).",
        explanationAr: "الشرطية الثانية للنصيحة: If I were you (صيغة الشرط).",
      },
    ],
  },
  {
    id: "relative-clauses",
    title: "Relative Clauses",
    titleAr: "جمل الوصل",
    description: "Relative clauses add detail to your sentences and are key to achieving Band 7+ in IELTS Writing. Master 'who', 'which', 'that', 'where', and 'whose'.",
    descriptionAr: "جمل الوصل تضيف تفاصيل لجملك وهي مفتاح الحصول على Band 7+ في كتابة الآيلتس.",
    color: "text-rose-600",
    iconBg: "bg-rose-50 dark:bg-rose-900/20",
    rules: [
      { rule: "'Who' for people, 'which' for things, 'that' for both (defining clauses).", example: "The student who scored highest received a scholarship." },
      { rule: "'Where' for places, 'when' for times, 'whose' for possession.", example: "The city where I grew up has changed a lot." },
      { rule: "Defining clauses (no commas) = essential information.", example: "People who exercise regularly live longer." },
      { rule: "Non-defining clauses (with commas) = extra information.", example: "My brother, who lives in London, is a doctor." },
      { rule: "Don't use 'that' in non-defining clauses.", example: "Wrong: My car, that is red, is fast. ✓ My car, which is red, is fast." },
    ],
    exercises: [
      {
        id: 1,
        question: "The woman ___ lives next door is a teacher.",
        options: ["which", "who", "whose", "where"],
        correctIndex: 1,
        explanation: "'Who' is used for people as the subject of the relative clause.",
        explanationAr: "نستخدم who للأشخاص كفاعل في جملة الوصل.",
      },
      {
        id: 2,
        question: "This is the restaurant ___ we had dinner last week.",
        options: ["which", "who", "whose", "where"],
        correctIndex: 3,
        explanation: "'Where' is used for places.",
        explanationAr: "نستخدم where للأماكن.",
      },
      {
        id: 3,
        question: "The book ___ I borrowed from the library was very useful.",
        options: ["who", "which", "where", "whose"],
        correctIndex: 1,
        explanation: "'Which' (or 'that') is used for things. Here it's a defining clause about the book.",
        explanationAr: "نستخدم which (أو that) للأشياء. هنا جملة وصل محددة عن الكتاب.",
      },
      {
        id: 4,
        question: "The student ___ essay won the competition is from Egypt.",
        options: ["who", "which", "whose", "that"],
        correctIndex: 2,
        explanation: "'Whose' shows possession — the student's essay.",
        explanationAr: "whose تدل على الملكية — مقال الطالب.",
      },
      {
        id: 5,
        question: "Paris, ___ is the capital of France, attracts millions of tourists.",
        options: ["that", "which", "who", "where"],
        correctIndex: 1,
        explanation: "Non-defining clause (with commas) about a thing — use 'which', never 'that'.",
        explanationAr: "جملة وصل غير محددة (مع فواصل) عن شيء — نستخدم which وليس that.",
      },
    ],
  },
];
