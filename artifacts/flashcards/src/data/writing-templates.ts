export interface LinkingPhrase {
  phrase: string;
  usage: string;
  example: string;
}

export interface LinkingCategory {
  name: string;
  icon: string;
  phrases: LinkingPhrase[];
}

export interface SampleParagraph {
  label: string;
  band: string;
  text: string;
  highlightedPhrases: string[];
  commentary: string;
}

export interface TemplateStep {
  step: string;
  description: string;
  sentenceStarters: string[];
  sample: SampleParagraph;
}

export interface EssayTemplate {
  id: string;
  title: string;
  titleAr: string;
  icon: string;
  taskType: "Task 1" | "Task 2";
  description: string;
  questionExample: string;
  structure: TemplateStep[];
  doList: string[];
  dontList: string[];
}

export const LINKING_PHRASES: LinkingCategory[] = [
  {
    name: "Adding Information",
    icon: "➕",
    phrases: [
      { phrase: "Furthermore,", usage: "Adding a stronger, more formal point", example: "Furthermore, the government has allocated additional funds to address this issue." },
      { phrase: "Moreover,", usage: "Adding an equally important point", example: "Moreover, research suggests that early intervention yields the best results." },
      { phrase: "In addition to this,", usage: "Building on a previous point", example: "In addition to this, schools should implement anti-bullying programmes." },
      { phrase: "What is more,", usage: "Emphasising an additional point", example: "What is more, the environmental benefits are significant." },
      { phrase: "On top of that,", usage: "Semi-formal addition", example: "On top of that, employees report higher job satisfaction." },
      { phrase: "Not only... but also...", usage: "Emphasising two connected points", example: "Not only does exercise improve physical health, but it also enhances mental wellbeing." },
      { phrase: "Equally important is the fact that", usage: "Balancing two points of equal weight", example: "Equally important is the fact that cultural preservation strengthens national identity." },
    ],
  },
  {
    name: "Contrasting Ideas",
    icon: "⚖️",
    phrases: [
      { phrase: "However,", usage: "Introducing an opposing point", example: "However, this approach has several significant drawbacks." },
      { phrase: "On the other hand,", usage: "Presenting the opposite perspective", example: "On the other hand, some argue that tradition should be preserved." },
      { phrase: "Nevertheless,", usage: "Conceding a point but maintaining position", example: "Nevertheless, the advantages far outweigh the disadvantages." },
      { phrase: "Conversely,", usage: "Directly opposing the previous point", example: "Conversely, rural areas offer a more relaxed pace of life." },
      { phrase: "Despite this,", usage: "Acknowledging then moving past a point", example: "Despite this, many countries continue to invest heavily in space exploration." },
      { phrase: "While it is true that..., it is also important to consider...", usage: "Balanced concession", example: "While it is true that technology creates jobs, it is also important to consider the roles it eliminates." },
      { phrase: "Although... ,", usage: "Subordinate contrast clause", example: "Although the initial costs are high, the long-term savings are substantial." },
      { phrase: "In contrast,", usage: "Showing clear difference between two things", example: "In contrast, developing nations face entirely different challenges." },
    ],
  },
  {
    name: "Giving Examples",
    icon: "💡",
    phrases: [
      { phrase: "For instance,", usage: "Introducing a specific example", example: "For instance, countries like Sweden have successfully implemented this policy." },
      { phrase: "To illustrate,", usage: "Providing a clarifying example", example: "To illustrate, consider the case of Japan's ageing population." },
      { phrase: "A case in point is", usage: "Highlighting a specific, relevant example", example: "A case in point is the rapid development of renewable energy in Germany." },
      { phrase: "This is evidenced by", usage: "Providing supporting evidence", example: "This is evidenced by the dramatic rise in online learning enrolments." },
      { phrase: "One notable example is", usage: "Highlighting a significant example", example: "One notable example is Singapore's transformation from a developing to a developed nation." },
      { phrase: "As demonstrated by", usage: "Referring to proof or evidence", example: "As demonstrated by recent studies, bilingual children develop stronger cognitive skills." },
    ],
  },
  {
    name: "Cause & Effect",
    icon: "🔗",
    phrases: [
      { phrase: "As a result,", usage: "Showing a direct consequence", example: "As a result, unemployment rates have fallen significantly." },
      { phrase: "Consequently,", usage: "Formal cause-effect link", example: "Consequently, many families are unable to afford basic necessities." },
      { phrase: "This leads to", usage: "Showing a chain of cause and effect", example: "This leads to increased pressure on healthcare systems." },
      { phrase: "The primary reason for this is", usage: "Identifying the main cause", example: "The primary reason for this is the lack of investment in public infrastructure." },
      { phrase: "This can be attributed to", usage: "Formally assigning cause", example: "This can be attributed to the growing influence of social media." },
      { phrase: "Owing to", usage: "Formal cause at the start of a sentence", example: "Owing to rapid urbanisation, many cities face severe housing shortages." },
      { phrase: "As a consequence of", usage: "Formal result", example: "As a consequence of globalisation, cultural boundaries have become increasingly blurred." },
    ],
  },
  {
    name: "Expressing Opinion",
    icon: "🎯",
    phrases: [
      { phrase: "In my view,", usage: "Direct personal opinion", example: "In my view, education is the most effective tool for reducing poverty." },
      { phrase: "I am of the opinion that", usage: "Formal opinion statement", example: "I am of the opinion that governments should prioritise renewable energy." },
      { phrase: "From my perspective,", usage: "Softer personal opinion", example: "From my perspective, cultural exchange programmes are invaluable." },
      { phrase: "I firmly believe that", usage: "Strong, confident opinion", example: "I firmly believe that access to clean water is a fundamental human right." },
      { phrase: "It seems to me that", usage: "Tentative, considered opinion", example: "It seems to me that the benefits of technology are often overstated." },
      { phrase: "I would argue that", usage: "Academic opinion with implied evidence", example: "I would argue that early childhood education has the greatest impact on future success." },
    ],
  },
  {
    name: "Concluding",
    icon: "🏁",
    phrases: [
      { phrase: "In conclusion,", usage: "Standard conclusion opener", example: "In conclusion, both individuals and governments have a role to play." },
      { phrase: "To sum up,", usage: "Brief summary conclusion", example: "To sum up, the advantages of remote work clearly outweigh the drawbacks." },
      { phrase: "All things considered,", usage: "Balanced final assessment", example: "All things considered, I believe that a combination of approaches is most effective." },
      { phrase: "Taking everything into account,", usage: "Comprehensive conclusion", example: "Taking everything into account, it is clear that urgent action is needed." },
      { phrase: "Ultimately,", usage: "Final, decisive statement", example: "Ultimately, the responsibility lies with each individual to make informed choices." },
      { phrase: "On balance,", usage: "Weighing both sides before concluding", example: "On balance, the evidence suggests that the policy has been largely successful." },
    ],
  },
  {
    name: "Describing Trends (Task 1)",
    icon: "📈",
    phrases: [
      { phrase: "rose sharply / increased dramatically", usage: "Large upward movement", example: "The number of tourists rose sharply from 2 million to 8 million." },
      { phrase: "declined steadily / decreased gradually", usage: "Consistent downward movement", example: "Sales declined steadily over the five-year period." },
      { phrase: "remained relatively stable / plateaued", usage: "Little or no change", example: "Expenditure on healthcare remained relatively stable at around 12%." },
      { phrase: "fluctuated between... and...", usage: "Irregular changes", example: "Temperatures fluctuated between 15 and 25 degrees throughout the year." },
      { phrase: "peaked at / reached a peak of", usage: "Highest point", example: "Unemployment peaked at 12% in 2010 before falling." },
      { phrase: "hit a low of / bottomed out at", usage: "Lowest point", example: "Production hit a low of 500 units in the third quarter." },
      { phrase: "There was a significant increase/decrease in", usage: "Noun phrase for trend", example: "There was a significant increase in the proportion of households with internet access." },
      { phrase: "By contrast, / In comparison,", usage: "Comparing two data sets", example: "By contrast, expenditure on defence showed a marked decline." },
    ],
  },
];

export const ESSAY_TEMPLATES: EssayTemplate[] = [
  {
    id: "opinion",
    title: "Opinion Essay",
    titleAr: "مقال الرأي",
    icon: "💬",
    taskType: "Task 2",
    description: "You are given a statement and asked to what extent you agree or disagree, OR asked to give your opinion on an issue.",
    questionExample: "Some people believe that university students should pay the full cost of their education. To what extent do you agree or disagree?",
    structure: [
      {
        step: "Introduction (2-3 sentences)",
        description: "Paraphrase the question + state your clear position. Never copy the question word-for-word.",
        sentenceStarters: [
          "It is often argued that...",
          "There is a growing belief that...",
          "A widely debated issue in today's society is whether...",
          "I am of the opinion that... / I firmly believe that...",
        ],
        sample: {
          label: "Introduction",
          band: "7-8",
          text: "The question of whether university students should bear the full financial burden of their education is a contentious one. While I acknowledge that higher education is a significant investment, I strongly disagree with the notion that students should be solely responsible for covering all costs.",
          highlightedPhrases: ["bear the full financial burden", "contentious", "I strongly disagree with the notion that", "solely responsible"],
          commentary: "Paraphrases the question effectively (pay → bear the financial burden). States a clear position. Uses sophisticated vocabulary (contentious, notion, solely). Two sentences — concise but complete.",
        },
      },
      {
        step: "Body Paragraph 1 — Main Argument (5-6 sentences)",
        description: "Present your strongest argument supporting your position. Topic sentence → explanation → example → link back.",
        sentenceStarters: [
          "The primary reason I hold this view is that...",
          "First and foremost, it is important to consider...",
          "One of the most compelling arguments is that...",
          "This is clearly demonstrated by...",
        ],
        sample: {
          label: "Body 1 — Main argument (against full fees)",
          band: "7-8",
          text: "The primary reason I oppose full student funding is that it would create a two-tier education system. If students are required to pay the entirety of their tuition fees, those from lower-income backgrounds would be effectively excluded from higher education. This would perpetuate existing social inequalities rather than addressing them. For instance, in countries where tuition fees have risen substantially, such as the United States, student debt has reached alarming levels, forcing many graduates to delay major life decisions including buying homes and starting families. A society that limits access to education based on financial means is ultimately undermining its own future workforce.",
          highlightedPhrases: ["two-tier education system", "perpetuate existing social inequalities", "student debt has reached alarming levels", "undermining its own future workforce"],
          commentary: "Clear topic sentence. Develops the idea fully with explanation + cause/effect + specific example (US). Final sentence links back to the wider impact. Good vocabulary range throughout.",
        },
      },
      {
        step: "Body Paragraph 2 — Supporting Argument (5-6 sentences)",
        description: "Add a second distinct argument. Don't repeat your first point — approach from a different angle.",
        sentenceStarters: [
          "Furthermore, it is worth noting that...",
          "Another significant consideration is...",
          "Equally important is the fact that...",
          "In addition to this, one cannot overlook...",
        ],
        sample: {
          label: "Body 2 — Second argument (public benefit)",
          band: "7-8",
          text: "Furthermore, it is worth noting that society as a whole benefits from an educated population, which justifies public investment in higher education. Graduates contribute to the economy through higher tax revenues, innovation, and increased productivity. Research from the OECD consistently demonstrates that countries with higher rates of university education enjoy stronger economic growth and lower unemployment. Therefore, it would be short-sighted for governments to shift the entire financial responsibility onto individual students when the returns on education investment are shared by the wider community.",
          highlightedPhrases: ["society as a whole benefits", "public investment", "higher tax revenues, innovation, and increased productivity", "short-sighted"],
          commentary: "New angle (public benefit) distinct from Paragraph 1 (inequality). Cites evidence (OECD). Sophisticated vocabulary (short-sighted, shift the financial responsibility). Logical chain: premise → evidence → conclusion.",
        },
      },
      {
        step: "Concession Paragraph (Optional, 3-4 sentences)",
        description: "Briefly acknowledge the opposing view, then explain why your position is stronger. This boosts your Coherence & Cohesion score.",
        sentenceStarters: [
          "Admittedly, there are those who argue that...",
          "While it is true that..., this argument fails to account for...",
          "Some might contend that..., however...",
          "Although there is some merit to the opposing view...",
        ],
        sample: {
          label: "Concession",
          band: "7-8",
          text: "Admittedly, proponents of full student funding argue that those who benefit directly from a degree should bear its cost, and that this would encourage students to choose courses with better employment prospects. While there is some validity to this argument, it fails to account for the broader social returns of education and risks creating a society where only the privileged few have access to knowledge and opportunity.",
          highlightedPhrases: ["proponents", "bear its cost", "some validity to this argument", "risks creating", "privileged few"],
          commentary: "Acknowledges the other side fairly, then dismantles it. Shows balanced thinking = higher CC score. Doesn't spend too long on the opposing view.",
        },
      },
      {
        step: "Conclusion (2-3 sentences)",
        description: "Restate your position in different words. DO NOT introduce new ideas. Optionally suggest a solution or future outlook.",
        sentenceStarters: [
          "In conclusion, I firmly believe that...",
          "To sum up, while... , I maintain that...",
          "All things considered, the evidence strongly suggests that...",
          "Taking everything into account,...",
        ],
        sample: {
          label: "Conclusion",
          band: "7-8",
          text: "In conclusion, while I understand the argument for students contributing to their education costs, I firmly believe that requiring them to pay the full amount would be both socially unjust and economically counterproductive. A balanced approach, involving shared funding between governments and students, would better serve both individual aspirations and national interests.",
          highlightedPhrases: ["socially unjust and economically counterproductive", "balanced approach", "shared funding", "individual aspirations and national interests"],
          commentary: "Restates position without repeating the introduction word-for-word. Offers a practical solution. Ends on a forward-looking note. No new arguments introduced.",
        },
      },
    ],
    doList: [
      "Paraphrase the question — never copy it",
      "State your position clearly in the introduction",
      "Develop each paragraph with a topic sentence + explanation + example",
      "Use a range of cohesive devices (furthermore, however, consequently)",
      "Include at least one specific example per body paragraph",
      "Write 260-290 words (slightly over the 250 minimum)",
    ],
    dontList: [
      "Don't sit on the fence — 'I partly agree' is weak for agree/disagree questions",
      "Don't memorise full essays — examiners can tell",
      "Don't use 'firstly, secondly, thirdly' as your only linking words",
      "Don't introduce new ideas in the conclusion",
      "Don't write more than 300 words — quality over quantity",
      "Don't start body paragraphs with 'I think' — use topic sentences about the issue",
    ],
  },

  {
    id: "discussion",
    title: "Discussion Essay",
    titleAr: "مقال المناقشة",
    icon: "🗣️",
    taskType: "Task 2",
    description: "You are asked to discuss both views on an issue and then give your own opinion.",
    questionExample: "Some people think children should start formal education at a very early age. Others believe they should not begin until they are older. Discuss both views and give your own opinion.",
    structure: [
      {
        step: "Introduction (2-3 sentences)",
        description: "Paraphrase the topic + mention both views + give your position.",
        sentenceStarters: [
          "The question of when children should begin... is widely debated.",
          "There are differing views on whether...",
          "While some people advocate for..., others maintain that...",
          "This essay will examine both perspectives before presenting my own view.",
        ],
        sample: {
          label: "Introduction",
          band: "7-8",
          text: "The appropriate age at which children should commence formal education is a subject of considerable debate. While some advocate for early schooling to give children a head start, others argue that delaying formal education allows for more natural development. In my view, a balanced approach that prioritises play-based learning in the early years is most beneficial.",
          highlightedPhrases: ["commence formal education", "subject of considerable debate", "advocate for", "a balanced approach", "play-based learning"],
          commentary: "Three sentences covering: topic paraphrase, both views, and clear personal position. Sophisticated paraphrasing (start → commence, begin → delaying). Shows the examiner exactly what the essay will discuss.",
        },
      },
      {
        step: "Body Paragraph 1 — First View (5-6 sentences)",
        description: "Present the first view fairly and fully. Even if you disagree, develop it with reasons and examples.",
        sentenceStarters: [
          "Those who support early formal education argue that...",
          "Proponents of this view contend that...",
          "On one hand, there are compelling reasons to believe that...",
        ],
        sample: {
          label: "Body 1 — View A (early education)",
          band: "7-8",
          text: "Proponents of early formal education contend that it provides children with essential foundational skills at a critical stage of cognitive development. Research in developmental psychology suggests that children's brains are most receptive to learning between the ages of three and six, making this an ideal window for introducing literacy and numeracy. Furthermore, early schooling can help identify learning difficulties at a stage when intervention is most effective. In countries such as France, where compulsory education begins at age three, children from disadvantaged backgrounds have shown improved academic outcomes compared to their peers in nations with later start ages.",
          highlightedPhrases: ["foundational skills", "cognitive development", "most receptive to learning", "identify learning difficulties", "compulsory education"],
          commentary: "Develops View A fully even though the writer disagrees. Uses evidence (developmental psychology, France). Specific age references show precision. Academic vocabulary throughout.",
        },
      },
      {
        step: "Body Paragraph 2 — Second View (5-6 sentences)",
        description: "Present the opposing view with equal depth. Then show why you lean towards this view (or neither).",
        sentenceStarters: [
          "On the other hand, opponents of early schooling maintain that...",
          "Conversely, those who favour a later start argue that...",
          "However, there is a compelling counter-argument that...",
        ],
        sample: {
          label: "Body 2 — View B (later start)",
          band: "7-8",
          text: "On the other hand, advocates of delayed formal education argue that young children learn most effectively through play rather than structured lessons. Countries renowned for their educational excellence, such as Finland, do not begin formal schooling until age seven, yet consistently rank among the highest in international assessments. This suggests that early academic pressure is not necessarily beneficial and may, in fact, be counterproductive. Children who are allowed to develop social and emotional skills through play tend to be more resilient, creative, and intrinsically motivated when they do enter formal education.",
          highlightedPhrases: ["learn most effectively through play", "renowned for their educational excellence", "counterproductive", "resilient, creative, and intrinsically motivated"],
          commentary: "Equally developed as Body 1 — this is essential for a high CC score. Specific example (Finland). Challenges the first view directly. Final sentence provides a strong concluding idea.",
        },
      },
      {
        step: "Conclusion with Opinion (2-3 sentences)",
        description: "Summarise both views briefly, then clearly state which you support and why.",
        sentenceStarters: [
          "In conclusion, while both perspectives have merit,...",
          "Having considered both arguments, I believe that...",
          "On balance, although early education has advantages,...",
        ],
        sample: {
          label: "Conclusion",
          band: "7-8",
          text: "In conclusion, while both early and delayed formal education have their merits, I believe that the evidence from high-performing education systems like Finland supports a more gradual approach. Rather than rushing children into academic study, investing in high-quality play-based programmes during the early years would better prepare them for lifelong learning.",
          highlightedPhrases: ["both... have their merits", "the evidence from high-performing education systems", "a more gradual approach", "lifelong learning"],
          commentary: "References both views. Clear personal position supported by evidence mentioned in the essay. Forward-looking final sentence. No new arguments.",
        },
      },
    ],
    doList: [
      "Develop BOTH views equally — don't just list the view you disagree with",
      "Give your opinion clearly — either in the introduction, conclusion, or both",
      "Use reporting language for views: 'advocates argue', 'proponents contend'",
      "Include evidence or examples for each view",
      "Use a clear paragraph structure: View A → View B → Your opinion",
    ],
    dontList: [
      "Don't spend 80% on one view and 20% on the other — balance is key",
      "Don't forget to give YOUR opinion — this is required by the question",
      "Don't use 'I' in the body paragraphs presenting other people's views",
      "Don't simply list views without developing them",
      "Don't use the same examples for both views",
    ],
  },

  {
    id: "problem-solution",
    title: "Problem-Solution Essay",
    titleAr: "مقال المشكلة والحل",
    icon: "🔧",
    taskType: "Task 2",
    description: "You are asked to identify problems caused by an issue and suggest solutions.",
    questionExample: "In many cities, the increasing number of cars is causing serious problems. What are the problems associated with this? What solutions can you suggest?",
    structure: [
      {
        step: "Introduction (2-3 sentences)",
        description: "Paraphrase the issue + indicate you will discuss problems and solutions.",
        sentenceStarters: [
          "The proliferation of... has become a pressing concern in many...",
          "It is widely recognised that... poses significant challenges...",
          "This essay will examine the key problems arising from... and propose practical solutions.",
        ],
        sample: {
          label: "Introduction",
          band: "7-8",
          text: "The proliferation of private vehicles in urban areas has given rise to a host of serious issues affecting both the environment and quality of life. This essay will examine the key problems stemming from increased car usage and propose viable solutions to address them.",
          highlightedPhrases: ["proliferation of private vehicles", "given rise to", "a host of serious issues", "viable solutions"],
          commentary: "Effective paraphrasing (cars → private vehicles, cities → urban areas). Clear roadmap for the essay. Formal academic register.",
        },
      },
      {
        step: "Body Paragraph 1 — Problems (5-6 sentences)",
        description: "Identify 2-3 problems with explanation and specific consequences.",
        sentenceStarters: [
          "Perhaps the most significant problem is...",
          "One of the most pressing issues is...",
          "This is compounded by the fact that...",
          "The consequences of this are far-reaching,...",
        ],
        sample: {
          label: "Body 1 — Problems",
          band: "7-8",
          text: "Perhaps the most significant problem associated with the surge in car numbers is the deterioration of air quality. Vehicle emissions are a primary contributor to urban pollution, which has been linked to a range of respiratory illnesses, including asthma and bronchitis. According to the World Health Organisation, air pollution causes approximately 4.2 million premature deaths annually. This is compounded by the issue of traffic congestion, which not only wastes commuters' time but also reduces economic productivity. In cities like Cairo and Jakarta, workers can spend upwards of three hours per day in traffic, significantly diminishing their quality of life.",
          highlightedPhrases: ["deterioration of air quality", "primary contributor", "respiratory illnesses", "compounded by", "diminishing their quality of life"],
          commentary: "Two clear problems: pollution + congestion. Each developed with causes and effects. WHO statistic adds authority. Specific city examples (Cairo, Jakarta). Connected with 'compounded by'.",
        },
      },
      {
        step: "Body Paragraph 2 — Solutions (5-6 sentences)",
        description: "Propose 2-3 realistic solutions with explanation of how they would work.",
        sentenceStarters: [
          "One effective solution would be to...",
          "To address this issue, governments could...",
          "Another practical measure is...",
          "This approach has already proven successful in...",
        ],
        sample: {
          label: "Body 2 — Solutions",
          band: "7-8",
          text: "To address these challenges, governments should prioritise investment in efficient and affordable public transportation systems. When reliable alternatives to driving are available, citizens are more inclined to leave their cars at home. This approach has proven remarkably successful in cities like Tokyo and London, where comprehensive metro networks have significantly reduced private car dependency. Additionally, implementing congestion charges in city centres, as pioneered by Stockholm, can serve as an effective financial deterrent while generating revenue that can be reinvested in sustainable infrastructure. Finally, urban planning policies that promote mixed-use development can reduce the need for long commutes by bringing workplaces, homes, and amenities closer together.",
          highlightedPhrases: ["prioritise investment", "more inclined to", "proven remarkably successful", "financial deterrent", "mixed-use development"],
          commentary: "Three distinct solutions, each with explanation + evidence. Real-world examples (Tokyo, London, Stockholm). Solutions match the problems in Body 1. Progressive complexity: transport → pricing → urban planning.",
        },
      },
      {
        step: "Conclusion (2-3 sentences)",
        description: "Summarise the key problems and solutions. Optionally add a final recommendation.",
        sentenceStarters: [
          "In conclusion, while the problems caused by... are significant,...",
          "To sum up, although... poses considerable challenges,...",
          "Ultimately, a combination of... would be the most effective approach.",
        ],
        sample: {
          label: "Conclusion",
          band: "7-8",
          text: "In conclusion, while the problems caused by excessive car use — namely pollution and congestion — are undeniably serious, they are far from insurmountable. Through strategic investment in public transport, congestion pricing, and thoughtful urban planning, cities can create more sustainable and liveable environments for their residents.",
          highlightedPhrases: ["undeniably serious", "far from insurmountable", "strategic investment", "sustainable and liveable"],
          commentary: "Briefly restates problems and solutions. Optimistic but realistic tone. No new ideas. Strong final sentence.",
        },
      },
    ],
    doList: [
      "Match each problem with a relevant solution",
      "Use specific examples or statistics to support your points",
      "Explain HOW solutions would work, not just what they are",
      "Use cause-effect language: 'this leads to', 'as a result'",
    ],
    dontList: [
      "Don't just list problems without explaining their impact",
      "Don't propose unrealistic solutions ('ban all cars')",
      "Don't mix problems and solutions in the same paragraph",
      "Don't forget to explain how the solution addresses the specific problem",
    ],
  },

  {
    id: "advantages-disadvantages",
    title: "Advantages & Disadvantages",
    titleAr: "المزايا والعيوب",
    icon: "⚖️",
    taskType: "Task 2",
    description: "You discuss the pros and cons of a given situation, trend, or proposal.",
    questionExample: "More and more people are choosing to work from home. What are the advantages and disadvantages of this trend?",
    structure: [
      {
        step: "Introduction (2-3 sentences)",
        description: "Paraphrase the topic + indicate you will examine both sides.",
        sentenceStarters: [
          "In recent years, there has been a growing trend towards...",
          "The shift towards... has sparked considerable discussion.",
          "While this development offers several benefits, it also presents notable challenges.",
        ],
        sample: {
          label: "Introduction",
          band: "7-8",
          text: "The shift towards remote working has accelerated dramatically in recent years, fundamentally altering the traditional workplace model. While this trend offers several compelling advantages, it also presents challenges that merit careful consideration.",
          highlightedPhrases: ["accelerated dramatically", "fundamentally altering", "compelling advantages", "merit careful consideration"],
          commentary: "Strong paraphrase (working from home → remote working). Acknowledges both sides. 'Merit careful consideration' signals balanced analysis.",
        },
      },
      {
        step: "Body Paragraph 1 — Advantages (5-6 sentences)",
        description: "Present 2-3 advantages with clear explanations and examples.",
        sentenceStarters: [
          "One of the most significant advantages is...",
          "Perhaps the greatest benefit of... is...",
          "This is particularly advantageous because...",
        ],
        sample: {
          label: "Body 1 — Advantages",
          band: "7-8",
          text: "One of the most significant advantages of remote work is the flexibility it affords employees. Without the constraints of a fixed schedule and a daily commute, workers can organise their time more efficiently, leading to improved work-life balance. Studies by Stanford University found that remote workers were 13% more productive than their office-based counterparts, largely because they experienced fewer distractions and took shorter breaks. Furthermore, remote work eliminates commuting costs and reduces carbon emissions, benefiting both individual finances and the environment.",
          highlightedPhrases: ["flexibility it affords", "without the constraints of", "improved work-life balance", "counterparts", "eliminates commuting costs"],
          commentary: "Two clear advantages: flexibility + reduced commuting. Evidence from Stanford adds credibility. Connected ideas (productivity → financial → environmental).",
        },
      },
      {
        step: "Body Paragraph 2 — Disadvantages (5-6 sentences)",
        description: "Present 2-3 disadvantages with equal depth.",
        sentenceStarters: [
          "However, remote working is not without its drawbacks.",
          "On the other hand, there are notable disadvantages...",
          "Perhaps the most concerning aspect is...",
        ],
        sample: {
          label: "Body 2 — Disadvantages",
          band: "7-8",
          text: "However, remote working is not without its drawbacks. Perhaps the most concerning issue is the potential for social isolation. Working from home eliminates the informal interactions and collaborative atmosphere of a shared office, which can lead to feelings of loneliness and disconnection from colleagues. This, in turn, may negatively impact team cohesion and the exchange of creative ideas. Additionally, the blurring of boundaries between work and personal life can paradoxically result in employees working longer hours, as the absence of a clear 'end of day' makes it difficult to switch off.",
          highlightedPhrases: ["not without its drawbacks", "social isolation", "collaborative atmosphere", "team cohesion", "blurring of boundaries", "paradoxically"],
          commentary: "Two disadvantages matching the depth of Body 1. 'Paradoxically' shows sophisticated word choice. Cause-effect chains clearly expressed.",
        },
      },
      {
        step: "Conclusion (2-3 sentences)",
        description: "Summarise both sides. If the question asks for your opinion, give it clearly.",
        sentenceStarters: [
          "In conclusion, remote work presents both opportunities and challenges.",
          "On balance, I believe that the advantages outweigh the disadvantages, provided that...",
          "All things considered,...",
        ],
        sample: {
          label: "Conclusion",
          band: "7-8",
          text: "On balance, while remote work offers undeniable benefits in terms of flexibility and efficiency, the challenges it poses to social wellbeing and work-life boundaries should not be underestimated. A hybrid model, combining the best elements of both remote and office-based work, may represent the most pragmatic solution for the modern workforce.",
          highlightedPhrases: ["undeniable benefits", "should not be underestimated", "hybrid model", "pragmatic solution"],
          commentary: "Balanced summary. Offers a practical middle-ground. 'Pragmatic solution' — excellent vocabulary. Forward-looking ending.",
        },
      },
    ],
    doList: [
      "Give equal weight to advantages and disadvantages",
      "Develop each point with explanation + example/evidence",
      "Use contrast language between paragraphs (however, on the other hand)",
      "If asked for your opinion, state it clearly",
    ],
    dontList: [
      "Don't list advantages and disadvantages without explaining them",
      "Don't heavily favour one side unless the question specifically asks for your view",
      "Don't use the word 'advantages/disadvantages' repeatedly — paraphrase",
      "Don't forget linking words between and within paragraphs",
    ],
  },

  {
    id: "line-graph",
    title: "Line / Bar Graph Report",
    titleAr: "تقرير الرسم البياني",
    icon: "📊",
    taskType: "Task 1",
    description: "Describe the main trends, comparisons, and key features of data presented in a line graph, bar chart, or similar visual.",
    questionExample: "The graph below shows the consumption of three types of fast food in Britain from 1970 to 2010.",
    structure: [
      {
        step: "Introduction (1-2 sentences)",
        description: "Paraphrase what the graph/chart shows. NEVER copy the question.",
        sentenceStarters: [
          "The line graph illustrates...",
          "The bar chart compares...",
          "The given graph presents information regarding...",
        ],
        sample: {
          label: "Introduction",
          band: "7-8",
          text: "The line graph illustrates changes in the consumption of three fast food categories — hamburgers, pizza, and fish and chips — in Britain over a forty-year period from 1970 to 2010.",
          highlightedPhrases: ["illustrates changes in", "fast food categories", "over a forty-year period"],
          commentary: "Single sentence paraphrasing the question. Specifies the time period. Uses 'illustrates changes in' instead of 'shows'.",
        },
      },
      {
        step: "Overview (2-3 sentences) — ESSENTIAL",
        description: "Summarise 2-3 main trends or key features. NO specific numbers here. This paragraph is CRITICAL — no overview = max Band 5.",
        sentenceStarters: [
          "Overall, it is clear that...",
          "The most striking trend is...",
          "In general, while... experienced growth, ... showed a decline.",
        ],
        sample: {
          label: "Overview",
          band: "7-8",
          text: "Overall, the most notable trend is the dramatic rise in pizza and hamburger consumption over the period, while fish and chips experienced a significant decline. By 2010, pizza had overtaken both other categories to become the most popular fast food choice in Britain.",
          highlightedPhrases: ["most notable trend", "dramatic rise", "significant decline", "overtaken both other categories"],
          commentary: "Two key trends identified without specific numbers. Shows the examiner you can identify the 'big picture'. The word 'Overall' at the start signals this is the overview paragraph.",
        },
      },
      {
        step: "Body Paragraph 1 — Detail Group A (3-4 sentences)",
        description: "Describe specific data for one group/period. Include numbers, dates, and comparisons.",
        sentenceStarters: [
          "In 1970, ... stood at approximately...",
          "Between 1970 and 1990, ...",
          "By [year], the figure had risen/fallen to...",
        ],
        sample: {
          label: "Body 1 — Hamburgers & Pizza",
          band: "7-8",
          text: "In 1970, hamburger consumption stood at approximately 30 grams per person per week, while pizza consumption was negligible at just 5 grams. Over the following two decades, both categories saw substantial growth. By 1990, hamburger consumption had more than tripled to around 100 grams, whereas pizza intake had risen steadily to approximately 60 grams. The upward trajectory continued until 2000, when pizza consumption surpassed hamburgers at roughly 130 grams, and it continued to climb to approximately 150 grams by 2010.",
          highlightedPhrases: ["stood at approximately", "negligible", "more than tripled", "upward trajectory", "surpassed"],
          commentary: "Specific data points with appropriate language (approximately, roughly). Trend vocabulary (tripled, surpassed, upward trajectory). Comparisons between categories.",
        },
      },
      {
        step: "Body Paragraph 2 — Detail Group B (3-4 sentences)",
        description: "Describe the remaining data. Draw comparisons where relevant.",
        sentenceStarters: [
          "In contrast, ...",
          "Turning to ..., the data reveals a different pattern.",
          "By comparison, ...",
        ],
        sample: {
          label: "Body 2 — Fish & Chips",
          band: "7-8",
          text: "In stark contrast, fish and chips — which was the most popular fast food in 1970 at around 300 grams per person per week — experienced a dramatic and sustained decline throughout the period. By 1990, consumption had fallen to approximately 180 grams, and this downward trend continued until 2010, when it reached a low of just under 100 grams. This represents a decline of roughly two-thirds from its 1970 level.",
          highlightedPhrases: ["in stark contrast", "sustained decline", "downward trend", "reached a low of", "represents a decline of roughly two-thirds"],
          commentary: "Clear contrast with Body 1. Quantifies the change (two-thirds). Uses appropriate trend language (sustained decline, downward trend, reached a low).",
        },
      },
    ],
    doList: [
      "ALWAYS include an overview — it's worth up to 2 band points",
      "Use 'approximately', 'roughly', 'around' with numbers",
      "Group data logically — don't describe every single data point",
      "Compare and contrast between categories/groups",
      "Use a variety of trend verbs: rose, surged, declined, plummeted, plateaued",
      "Write 160-180 words — don't over-write Task 1",
    ],
    dontList: [
      "Don't give your opinion or speculate about reasons",
      "Don't describe every data point — select KEY features",
      "Don't forget the overview — this is the most common Band 5 mistake",
      "Don't use 'the graph shows' more than once — vary your language",
      "Don't copy numbers without context — say what they mean",
    ],
  },

  {
    id: "process",
    title: "Process Diagram Report",
    titleAr: "تقرير مخطط العملية",
    icon: "⚙️",
    taskType: "Task 1",
    description: "Describe the stages of a natural or man-made process shown in a diagram.",
    questionExample: "The diagram below shows the process by which bricks are manufactured for the building industry.",
    structure: [
      {
        step: "Introduction (1-2 sentences)",
        description: "Paraphrase what the diagram shows and mention the number of stages.",
        sentenceStarters: [
          "The diagram illustrates the process of...",
          "The flow chart depicts the various stages involved in...",
          "The given diagram presents the step-by-step procedure for...",
        ],
        sample: {
          label: "Introduction",
          band: "7-8",
          text: "The diagram illustrates the step-by-step process involved in the manufacture of bricks for the construction industry, from the initial extraction of raw materials to the final delivery of the finished product.",
          highlightedPhrases: ["step-by-step process", "manufacture of bricks", "initial extraction", "finished product"],
          commentary: "Paraphrases 'made' → 'manufacture', 'building' → 'construction'. Mentions the scope from start to finish. Single, clear sentence.",
        },
      },
      {
        step: "Overview (2 sentences)",
        description: "Summarise the overall process — how many stages, what it transforms from/to.",
        sentenceStarters: [
          "Overall, the process comprises... distinct stages.",
          "It is evident that the procedure involves...",
          "In general, the entire process transforms... into...",
        ],
        sample: {
          label: "Overview",
          band: "7-8",
          text: "Overall, the brick-making process comprises seven distinct stages, beginning with the digging of clay and culminating in the delivery of finished bricks. It is a largely mechanised process that involves shaping, drying, and firing the raw material at high temperatures.",
          highlightedPhrases: ["comprises seven distinct stages", "culminating in", "largely mechanised", "firing the raw material"],
          commentary: "States total number of stages. Indicates start and end points. Describes the nature of the process (mechanised).",
        },
      },
      {
        step: "Body 1 — First Half of Process (4-5 sentences)",
        description: "Describe the first stages using passive voice and sequencing language.",
        sentenceStarters: [
          "In the first stage, ... is/are...",
          "Following this, the material is...",
          "Once this is complete, ...",
          "Subsequently, ...",
        ],
        sample: {
          label: "Body 1 — Stages 1-4",
          band: "7-8",
          text: "In the first stage, clay is extracted from the ground using a large digger. The clay is then transported to a roller, where it is crushed and ground into a fine, uniform consistency. Following this, the processed clay is mixed with sand and water in a mould to form individual bricks. These are subsequently left to dry in an open-air environment for a period of one to two days.",
          highlightedPhrases: ["is extracted from", "uniform consistency", "processed clay", "subsequently", "open-air environment"],
          commentary: "Consistent use of passive voice (is extracted, is transported, is crushed). Sequencing words (then, following this, subsequently). Precise descriptions.",
        },
      },
      {
        step: "Body 2 — Second Half of Process (4-5 sentences)",
        description: "Continue describing the remaining stages to the end of the process.",
        sentenceStarters: [
          "At the next stage, ...",
          "The... is/are then placed in...",
          "Finally, ...",
          "Once... has been completed, ...",
        ],
        sample: {
          label: "Body 2 — Stages 5-7",
          band: "7-8",
          text: "Once the bricks have dried sufficiently, they are placed in a kiln and heated to a temperature of between 200°C and 1300°C. The duration and temperature of the firing process vary depending on the type of brick being produced. After cooling, the finished bricks undergo a quality inspection before being packaged and loaded onto trucks for delivery to building sites.",
          highlightedPhrases: ["dried sufficiently", "placed in a kiln", "the duration and temperature", "undergo a quality inspection"],
          commentary: "Continues the logical sequence. Includes specific data (temperatures). 'Undergo a quality inspection' — strong vocabulary. Ends at the natural conclusion of the process.",
        },
      },
    ],
    doList: [
      "Use passive voice throughout (bricks are made, clay is extracted)",
      "Use sequencing language (firstly, subsequently, following this, finally)",
      "Describe every stage — don't skip steps",
      "Include specific details from the diagram (temperatures, times, materials)",
    ],
    dontList: [
      "Don't use active voice with a personal subject ('workers dig the clay')",
      "Don't give your opinion about the process",
      "Don't add information not shown in the diagram",
      "Don't forget the overview — even process diagrams need one",
    ],
  },
];
