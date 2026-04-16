export interface TopicQuestion {
  question: string;
  modelAnswer: string;
  keyVocabulary: { word: string; meaning: string }[];
  tips: string[];
}

export interface SpeakingTopic {
  id: string;
  theme: string;
  icon: string;
  part1: TopicQuestion[];
  part2: {
    cueCard: string;
    bullets: string[];
    modelAnswer: string;
    keyVocabulary: { word: string; meaning: string }[];
    tips: string[];
  };
  part3: TopicQuestion[];
}

export const SPEAKING_TOPICS: SpeakingTopic[] = [
  {
    id: "hometown",
    theme: "Hometown & Living",
    icon: "🏠",
    part1: [
      {
        question: "Where is your hometown?",
        modelAnswer: "My hometown is Riyadh, the capital city of Saudi Arabia. It's a sprawling metropolis in the heart of the Arabian Peninsula, known for its modern skyline and rich cultural heritage. I've lived there for most of my life, and I'm quite fond of the way the city blends tradition with modernity.",
        keyVocabulary: [
          { word: "sprawling", meaning: "spreading over a large area" },
          { word: "metropolis", meaning: "a very large, busy city" },
          { word: "heritage", meaning: "traditions and culture passed down" },
          { word: "fond of", meaning: "having affection for" },
        ],
        tips: [
          "Don't just name the place — describe it briefly with adjectives",
          "Show personal connection to make your answer more engaging",
          "Aim for 3-4 sentences, not just one",
        ],
      },
      {
        question: "What do you like about your hometown?",
        modelAnswer: "What I appreciate most about my hometown is the sense of community. People are genuinely welcoming and hospitable, which creates a warm atmosphere. Additionally, the city has undergone tremendous development in recent years, so there are world-class shopping malls, restaurants, and entertainment venues. It's the perfect combination of traditional values and modern conveniences.",
        keyVocabulary: [
          { word: "hospitable", meaning: "friendly and welcoming to guests" },
          { word: "undergone", meaning: "experienced or gone through" },
          { word: "tremendous", meaning: "very great in amount or intensity" },
          { word: "venues", meaning: "places where events or activities happen" },
        ],
        tips: [
          "Use linking words like 'additionally', 'moreover', 'furthermore'",
          "Give specific examples to support your points",
          "Vary your vocabulary — don't repeat 'nice' or 'good'",
        ],
      },
      {
        question: "Is there anything you dislike about your hometown?",
        modelAnswer: "If I had to mention one drawback, it would be the scorching summer heat. Temperatures can soar above 45 degrees, which makes it quite challenging to do outdoor activities for several months. However, people have adapted by spending more time in air-conditioned spaces, and the cooler winter months more than make up for it.",
        keyVocabulary: [
          { word: "drawback", meaning: "a disadvantage or negative aspect" },
          { word: "scorching", meaning: "extremely hot" },
          { word: "soar", meaning: "rise rapidly to a high level" },
          { word: "make up for", meaning: "compensate for something negative" },
        ],
        tips: [
          "Use conditional phrasing: 'If I had to mention...'",
          "Always balance negatives with a positive point",
          "Show maturity by acknowledging both sides",
        ],
      },
    ],
    part2: {
      cueCard: "Describe a place you have lived in that you particularly liked.",
      bullets: [
        "Where the place was",
        "How long you lived there",
        "What you liked about it",
        "And explain why it was special to you",
      ],
      modelAnswer: "I'd like to talk about the neighbourhood I grew up in, which is in the eastern part of Riyadh. I lived there from the time I was born until I was about eighteen, so roughly eighteen years.\n\nWhat made this place so special was the incredibly tight-knit community. All the families in our street knew each other, and there was a genuine sense of belonging. During Ramadan, neighbours would exchange dishes, and children would play together in the evenings until late at night. The streets would come alive with the sound of laughter and conversation.\n\nThe area itself was quite modest — it wasn't a fancy neighbourhood by any means — but it had everything we needed within walking distance: a local bakery, a small grocery shop, and a beautiful mosque with stunning Islamic architecture. I particularly loved the spacious courtyard in our home where we'd gather as a family for meals under the stars.\n\nThe reason this place holds such a special place in my heart is that it shaped who I am today. The values of generosity, community spirit, and simplicity that I learned there have stayed with me throughout my life. Even though I've moved to a more modern part of the city, I still visit regularly and feel a wave of nostalgia every time I walk through those familiar streets.",
      keyVocabulary: [
        { word: "tight-knit", meaning: "closely connected, with strong bonds" },
        { word: "genuine", meaning: "real, authentic" },
        { word: "modest", meaning: "not grand or expensive; humble" },
        { word: "stunning", meaning: "extremely impressive or beautiful" },
        { word: "courtyard", meaning: "an open area surrounded by walls or buildings" },
        { word: "nostalgia", meaning: "a feeling of longing for the past" },
      ],
      tips: [
        "Structure your answer: introduction → description → feelings → conclusion",
        "Use sensory language: sights, sounds, smells",
        "Include personal anecdotes to make your answer memorable",
        "Speak for the full 2 minutes — practice timing yourself",
        "Use past tenses correctly when describing memories",
      ],
    },
    part3: [
      {
        question: "What factors do people consider when choosing a place to live?",
        modelAnswer: "I think people weigh up several factors when deciding where to live. First and foremost, affordability plays a crucial role — people need to find housing that fits within their budget. Beyond that, proximity to workplaces and schools is essential, as nobody wants to spend hours commuting. Safety is another paramount concern, particularly for families with young children. In recent years, I've noticed that access to amenities such as parks, gyms, and shopping centres has also become increasingly important, as people seek a higher quality of life.",
        keyVocabulary: [
          { word: "weigh up", meaning: "carefully consider before deciding" },
          { word: "affordability", meaning: "how cheap or expensive something is" },
          { word: "proximity", meaning: "nearness in distance" },
          { word: "paramount", meaning: "more important than anything else" },
          { word: "amenities", meaning: "useful features or facilities" },
        ],
        tips: [
          "List multiple factors and explain each briefly",
          "Use phrases like 'first and foremost', 'beyond that', 'another concern'",
          "Give your personal observation: 'I've noticed that...'",
        ],
      },
      {
        question: "Do you think cities will become more or less attractive in the future?",
        modelAnswer: "That's an interesting question. I believe cities will continue to attract people, but their appeal may shift. With the rise of remote work, some professionals might opt for suburban or rural areas where the cost of living is lower. However, cities will likely remain magnets for young people seeking career opportunities, cultural experiences, and social connections. I think the key challenge will be making cities more sustainable and liveable — reducing pollution, improving public transport, and creating green spaces — so that they can accommodate growing populations without sacrificing quality of life.",
        keyVocabulary: [
          { word: "appeal", meaning: "attractiveness or interest" },
          { word: "opt for", meaning: "choose or decide on" },
          { word: "magnets", meaning: "things that strongly attract" },
          { word: "sustainable", meaning: "able to continue without damaging the environment" },
          { word: "accommodate", meaning: "provide space or room for" },
        ],
        tips: [
          "Acknowledge the question: 'That's an interesting question'",
          "Present both sides of the argument",
          "Use future language: 'will likely', 'might', 'I believe'",
          "End with a thoughtful conclusion",
        ],
      },
    ],
  },

  {
    id: "education",
    theme: "Education & Learning",
    icon: "📚",
    part1: [
      {
        question: "What subject did you enjoy most at school?",
        modelAnswer: "I was always drawn to English literature. There was something captivating about analysing texts and discovering hidden meanings in stories and poems. My teacher was exceptionally passionate, which made the subject come alive. I think that early exposure to literature helped develop my critical thinking skills and sparked my love for reading.",
        keyVocabulary: [
          { word: "drawn to", meaning: "attracted to or interested in" },
          { word: "captivating", meaning: "very interesting and attractive" },
          { word: "exceptionally", meaning: "to an unusual degree; very" },
          { word: "sparked", meaning: "caused to start or begin" },
        ],
        tips: [
          "Use past tenses correctly for school memories",
          "Explain WHY you enjoyed it, not just what it was",
          "Connect it to how it benefited you",
        ],
      },
      {
        question: "Do you prefer studying alone or with others?",
        modelAnswer: "It depends on the situation, to be honest. For subjects that require deep concentration, like mathematics or programming, I prefer studying alone because I can work at my own pace without distractions. However, for subjects like history or social studies, I find group discussions incredibly beneficial because hearing different perspectives helps me understand the material more thoroughly.",
        keyVocabulary: [
          { word: "concentration", meaning: "the ability to focus your attention" },
          { word: "distractions", meaning: "things that take your attention away" },
          { word: "beneficial", meaning: "helpful, producing good results" },
          { word: "thoroughly", meaning: "completely and carefully" },
        ],
        tips: [
          "Use 'it depends' to show balanced thinking",
          "Give examples for both sides",
          "Use comparative structures: 'more thoroughly', 'incredibly beneficial'",
        ],
      },
      {
        question: "How has technology changed education?",
        modelAnswer: "Technology has revolutionised education in numerous ways. Online platforms have made learning accessible to people regardless of their location, which has been a game-changer for students in remote areas. Interactive tools like educational apps and virtual classrooms have made lessons more engaging. That said, I think the human element — having a dedicated teacher who can inspire and motivate students — remains irreplaceable.",
        keyVocabulary: [
          { word: "revolutionised", meaning: "changed completely and dramatically" },
          { word: "accessible", meaning: "easy to reach or use" },
          { word: "game-changer", meaning: "something that significantly alters a situation" },
          { word: "irreplaceable", meaning: "impossible to replace" },
        ],
        tips: [
          "Use present perfect for changes that started in the past and continue: 'has revolutionised'",
          "Balance positive points with a thoughtful caveat using 'that said'",
        ],
      },
    ],
    part2: {
      cueCard: "Describe a teacher who has had a significant influence on you.",
      bullets: [
        "Who this teacher was",
        "When and where they taught you",
        "What they taught you",
        "And explain why they had such an influence on you",
      ],
      modelAnswer: "I'd like to describe my high school English teacher, Mr. Ahmed, who taught me during my final two years of secondary school.\n\nMr. Ahmed was unlike any teacher I'd had before. He had this remarkable ability to make even the most complex literary concepts accessible and fascinating. Rather than simply lecturing, he would pose thought-provoking questions that encouraged us to think independently and form our own opinions.\n\nWhat set him apart was his unwavering belief in his students' potential. I remember a time when I was struggling with essay writing — I couldn't seem to organise my ideas coherently. Instead of simply marking my work with a low grade, he sat down with me after class and patiently walked me through the process of structuring an argument. He taught me techniques for brainstorming, creating outlines, and using evidence effectively.\n\nThe influence he had on me goes far beyond academic achievement. He instilled in me a genuine love for learning and a belief that with dedication and the right approach, I could overcome any challenge. His famous phrase was 'Every expert was once a beginner,' and that philosophy has stayed with me throughout my academic journey and beyond. Today, whenever I face a daunting task, I think of Mr. Ahmed and remind myself that perseverance and patience are the keys to success.",
      keyVocabulary: [
        { word: "remarkable", meaning: "worthy of attention; extraordinary" },
        { word: "thought-provoking", meaning: "making you think carefully about something" },
        { word: "unwavering", meaning: "steady, not changing or becoming weaker" },
        { word: "coherently", meaning: "in a clear, logical way" },
        { word: "instilled", meaning: "gradually put an idea or attitude into someone" },
        { word: "daunting", meaning: "seeming difficult and frightening" },
        { word: "perseverance", meaning: "continuing effort despite difficulties" },
      ],
      tips: [
        "Tell a story — the examiner wants to hear narrative skills",
        "Include direct speech or quotes to add authenticity",
        "Show emotions: 'I remember a time when...'",
        "Connect past influence to present behaviour",
        "Use a range of past tenses: simple past, past perfect, past continuous",
      ],
    },
    part3: [
      {
        question: "What qualities make a good teacher?",
        modelAnswer: "In my view, the most essential quality is the ability to communicate clearly and make complex ideas digestible for students of varying abilities. Beyond that, patience is absolutely vital — every student learns at a different pace, and a good teacher must be willing to explain concepts multiple times without showing frustration. I'd also argue that enthusiasm is contagious; when a teacher is genuinely passionate about their subject, it rubs off on the students. Finally, adaptability is becoming increasingly important in today's diverse classrooms, as teachers need to cater to different learning styles and cultural backgrounds.",
        keyVocabulary: [
          { word: "digestible", meaning: "easy to understand" },
          { word: "vital", meaning: "absolutely necessary" },
          { word: "contagious", meaning: "spreading from person to person" },
          { word: "rubs off on", meaning: "gradually influences someone" },
          { word: "cater to", meaning: "provide what is needed or wanted" },
        ],
        tips: [
          "Structure your answer with listing phrases",
          "Use sophisticated vocabulary to describe qualities",
          "Give brief justification for each quality",
        ],
      },
      {
        question: "Should university education be free for everyone?",
        modelAnswer: "This is quite a contentious issue. On one hand, making university education free would remove financial barriers and give everyone an equal opportunity to pursue higher education, regardless of their socioeconomic background. This could lead to a more educated workforce and reduce inequality in society.\n\nOn the other hand, there are practical concerns. Universities need substantial funding to maintain high standards, and if the government bears the entire cost, it could strain public finances. Some argue that students who pay for their education tend to be more committed and value it more.\n\nPersonally, I think a middle ground would be ideal — perhaps subsidised tuition with scholarships for those who truly cannot afford it. This way, education remains accessible without placing an unsustainable burden on taxpayers.",
        keyVocabulary: [
          { word: "contentious", meaning: "causing disagreement or argument" },
          { word: "socioeconomic", meaning: "relating to social and financial factors" },
          { word: "substantial", meaning: "large in amount or importance" },
          { word: "strain", meaning: "put pressure on; stretch to the limit" },
          { word: "subsidised", meaning: "partly paid for by the government" },
        ],
        tips: [
          "Use 'on one hand... on the other hand' for balanced arguments",
          "Show your own opinion with 'personally, I think'",
          "Suggest a compromise or middle ground — this shows maturity",
        ],
      },
    ],
  },

  {
    id: "technology",
    theme: "Technology & Internet",
    icon: "💻",
    part1: [
      {
        question: "How often do you use the internet?",
        modelAnswer: "I use the internet on a daily basis — it's become an integral part of my routine. From checking emails and browsing social media in the morning to streaming educational content in the evening, I'd say I'm online for at least five or six hours a day. While I'm aware that excessive screen time can be detrimental, I try to use the internet productively for learning and staying connected with family abroad.",
        keyVocabulary: [
          { word: "integral", meaning: "essential, necessary for completeness" },
          { word: "streaming", meaning: "watching or listening to content online in real time" },
          { word: "excessive", meaning: "more than is necessary or desirable" },
          { word: "detrimental", meaning: "causing harm or damage" },
        ],
        tips: [
          "Quantify your answer: 'five or six hours'",
          "Show self-awareness about habits",
          "Use present tenses for habits and routines",
        ],
      },
      {
        question: "What is your favourite app on your phone?",
        modelAnswer: "I'd have to say my favourite app is a language learning platform called LEXO. I find it incredibly user-friendly and well-designed. What I particularly like about it is the way it combines flashcards, quizzes, and AI-powered speaking practice all in one place. I use it every day to prepare for my IELTS exam, and I've noticed a significant improvement in my vocabulary since I started using it a few months ago.",
        keyVocabulary: [
          { word: "user-friendly", meaning: "easy to learn and use" },
          { word: "well-designed", meaning: "made in a way that works effectively" },
          { word: "significant", meaning: "large enough to be noticed or important" },
          { word: "improvement", meaning: "the process of getting better" },
        ],
        tips: [
          "Name the app specifically — don't be vague",
          "Explain what makes it stand out",
          "Share a personal result or benefit",
        ],
      },
    ],
    part2: {
      cueCard: "Describe a piece of technology that you find very useful.",
      bullets: [
        "What the technology is",
        "When you started using it",
        "How often you use it",
        "And explain why you find it useful",
      ],
      modelAnswer: "I'd like to talk about my laptop, which has been an indispensable tool in both my academic and personal life.\n\nI first got my own laptop when I started university about three years ago. Before that, I had to share the family computer, which was often frustrating because there were always scheduling conflicts with my siblings.\n\nI use my laptop virtually every day. In the morning, I typically use it for studying — watching lectures, taking notes, and working on assignments. In the afternoon, I might use it for research or to join online study groups. And in the evening, I'll admit I use it for leisure — streaming series or video calling friends.\n\nThe reason I find it so useful is that it has essentially become my portable office and entertainment centre. The ability to carry it anywhere means I can study at a café, in the library, or even outdoors. It's also allowed me to develop valuable digital skills — I've taught myself basic graphic design and video editing, which have been incredibly useful for university presentations. Furthermore, during the pandemic, my laptop was literally my lifeline to education when everything moved online overnight.\n\nI think what I appreciate most is the independence it gives me. I can manage my own schedule, access information instantly, and connect with people around the world — all from a single device.",
      keyVocabulary: [
        { word: "indispensable", meaning: "absolutely necessary; cannot do without" },
        { word: "scheduling conflicts", meaning: "when two people need the same thing at the same time" },
        { word: "virtually", meaning: "almost; nearly" },
        { word: "portable", meaning: "easy to carry around" },
        { word: "lifeline", meaning: "something essential for survival" },
      ],
      tips: [
        "Don't choose something too simple — show you can discuss complex topics",
        "Include time markers: 'three years ago', 'in the morning', 'during the pandemic'",
        "Show impact on your life, not just description",
        "Use a mix of present simple (habits) and present perfect (experiences)",
      ],
    },
    part3: [
      {
        question: "Do you think technology makes people lazier?",
        modelAnswer: "That's a thought-provoking question. I think the answer is nuanced. On the surface, it might appear that technology makes people lazier — for instance, we can order food, shop, and even exercise at home without stepping outside. However, I'd argue that technology has actually enabled people to be more productive in meaningful ways. Tasks that used to take hours, like research or communication, can now be done in minutes, freeing up time for creative pursuits. The real issue isn't the technology itself but how people choose to use it. Those who use technology as a tool tend to achieve more, while those who use it purely for passive entertainment may indeed become less active.",
        keyVocabulary: [
          { word: "nuanced", meaning: "having subtle differences; not simple" },
          { word: "enabled", meaning: "made possible" },
          { word: "pursuits", meaning: "activities or interests" },
          { word: "passive", meaning: "accepting without active response" },
        ],
        tips: [
          "Challenge the premise of the question — don't just agree",
          "Use conditional language: 'might appear', 'I'd argue'",
          "Make a distinction: technology vs. how people use it",
        ],
      },
      {
        question: "How do you think artificial intelligence will change our lives?",
        modelAnswer: "I believe artificial intelligence will fundamentally transform virtually every aspect of our lives. In healthcare, AI is already being used to diagnose diseases more accurately and develop personalised treatment plans. In education, adaptive learning platforms can tailor content to individual students' needs, making learning more efficient. In the workplace, AI will likely automate repetitive tasks, which could eliminate some jobs but also create entirely new industries and roles.\n\nHowever, I think we need to approach AI development with caution. There are legitimate concerns about privacy, bias in algorithms, and the widening gap between those who have access to AI technology and those who don't. The key will be establishing ethical guidelines and regulations to ensure AI benefits society as a whole rather than just a privileged few.",
        keyVocabulary: [
          { word: "fundamentally", meaning: "in a basic and important way" },
          { word: "adaptive", meaning: "able to change and adjust" },
          { word: "automate", meaning: "make a process operate by itself" },
          { word: "legitimate", meaning: "reasonable and acceptable" },
          { word: "privileged", meaning: "having special advantages" },
        ],
        tips: [
          "Give concrete examples from different fields",
          "Balance optimism with caution",
          "Use future predictions: 'will likely', 'could', 'I believe'",
        ],
      },
    ],
  },

  {
    id: "health",
    theme: "Health & Fitness",
    icon: "🏃",
    part1: [
      {
        question: "What do you do to stay healthy?",
        modelAnswer: "I try to maintain a balanced lifestyle. I go jogging three or four times a week, usually early in the morning before it gets too hot. I also pay attention to my diet — I've cut down on processed food and sugary drinks, and I try to incorporate more fruits, vegetables, and lean protein into my meals. Beyond physical health, I make a conscious effort to manage stress through meditation, even if it's just ten minutes a day.",
        keyVocabulary: [
          { word: "balanced", meaning: "having different elements in equal amounts" },
          { word: "cut down on", meaning: "reduce the amount of" },
          { word: "incorporate", meaning: "include as part of something" },
          { word: "conscious effort", meaning: "deliberate, intentional attempt" },
        ],
        tips: [
          "Cover multiple aspects: exercise, diet, mental health",
          "Use specific details: 'three or four times', 'ten minutes'",
          "Show that you're proactive about your health",
        ],
      },
      {
        question: "Do you think young people today are less healthy than in the past?",
        modelAnswer: "To a certain extent, yes, I think there's some truth to that. Many young people today lead sedentary lifestyles, spending hours glued to their screens rather than engaging in physical activity. The prevalence of fast food has also contributed to rising obesity rates. However, I'd also point out that there's a growing health consciousness among younger generations — many of my peers are avid gym-goers and follow strict dietary regimes. So it's really a mixed picture.",
        keyVocabulary: [
          { word: "sedentary", meaning: "involving a lot of sitting; not active" },
          { word: "prevalence", meaning: "how common something is" },
          { word: "consciousness", meaning: "awareness and understanding" },
          { word: "avid", meaning: "very enthusiastic and keen" },
        ],
        tips: [
          "Show partial agreement: 'to a certain extent'",
          "Support claims with evidence",
          "Present counterarguments to show balanced thinking",
        ],
      },
    ],
    part2: {
      cueCard: "Describe a healthy habit that you have.",
      bullets: [
        "What the habit is",
        "When you started doing it",
        "How often you do it",
        "And explain why you think it is good for your health",
      ],
      modelAnswer: "I'd like to talk about my habit of going for a morning jog, which has become an essential part of my daily routine.\n\nI started jogging about two years ago, after a health check revealed that my cholesterol levels were slightly elevated. My doctor recommended regular cardiovascular exercise, and jogging seemed like the most practical option since it doesn't require any special equipment or gym membership.\n\nI jog five mornings a week, typically between 5:30 and 6:15 in the morning. I follow a route through my neighbourhood that takes me past a beautiful park and along a quiet riverside path. I usually cover about five kilometres, though on weekends I sometimes push myself to do seven or eight.\n\nThe health benefits have been remarkable. Within just a few months, my cholesterol dropped to normal levels, and I lost about five kilograms. But the physical benefits are only part of the story. What I value most is the mental clarity jogging gives me. Starting the day with exercise clears my mind, reduces anxiety, and puts me in a positive frame of mind for the rest of the day. I've also noticed that my sleep quality has improved dramatically — I fall asleep faster and wake up feeling more refreshed.\n\nHonestly, if someone had told me three years ago that I'd become a morning jogger, I would have laughed. But now I genuinely look forward to it, and on the rare occasions I skip a day, I feel like something is missing.",
      keyVocabulary: [
        { word: "elevated", meaning: "higher than normal" },
        { word: "cardiovascular", meaning: "relating to the heart and blood vessels" },
        { word: "remarkable", meaning: "extraordinary; worthy of attention" },
        { word: "mental clarity", meaning: "clearness of thought" },
        { word: "frame of mind", meaning: "mood or mental state" },
        { word: "dramatically", meaning: "greatly, significantly" },
      ],
      tips: [
        "Tell the story of how the habit started",
        "Be specific about frequency, timing, and details",
        "Discuss both physical and mental benefits",
        "Add a personal reflection at the end",
        "Use past tenses for backstory, present for current habit",
      ],
    },
    part3: [
      {
        question: "What role should governments play in promoting public health?",
        modelAnswer: "I firmly believe governments have a significant responsibility in promoting public health. They can implement policies such as taxing unhealthy products like sugary drinks and tobacco, which has been proven effective in reducing consumption. They should also invest in public infrastructure — building parks, sports facilities, and cycling lanes encourages people to be more active.\n\nMoreover, governments can run public awareness campaigns to educate citizens about nutrition, mental health, and the importance of regular check-ups. School curricula should include comprehensive health education from an early age.\n\nThat said, there's a fine line between promoting health and being overly intrusive. People should ultimately have the freedom to make their own choices, even if those choices aren't always the healthiest ones.",
        keyVocabulary: [
          { word: "implement", meaning: "put a plan or decision into action" },
          { word: "infrastructure", meaning: "basic physical structures needed for society" },
          { word: "comprehensive", meaning: "complete, including everything" },
          { word: "intrusive", meaning: "interfering in someone's personal life" },
        ],
        tips: [
          "Give concrete policy examples",
          "Show awareness of both sides: government role vs. personal freedom",
          "Use modal verbs for suggestions: 'should', 'can', 'could'",
        ],
      },
      {
        question: "Why do some people find it difficult to maintain a healthy lifestyle?",
        modelAnswer: "There are multiple factors at play. Firstly, modern life is incredibly hectic, and many people simply don't have the time to cook nutritious meals or exercise regularly. They work long hours and have family responsibilities, so convenience foods and sedentary activities become the default.\n\nSecondly, there's the issue of cost. Healthy, organic food tends to be more expensive than processed alternatives, and gym memberships can be prohibitively costly for lower-income families.\n\nAnother significant factor is the lack of education. Many people genuinely don't know what constitutes a healthy diet or how to exercise safely. Finally, I think the addictive nature of unhealthy foods — particularly those high in sugar and salt — makes it psychologically challenging to break bad habits, even when people know they should.",
        keyVocabulary: [
          { word: "hectic", meaning: "very busy and full of activity" },
          { word: "prohibitively", meaning: "to such a degree that it prevents something" },
          { word: "constitutes", meaning: "makes up or forms" },
          { word: "addictive", meaning: "causing a strong desire to keep doing something" },
        ],
        tips: [
          "Identify multiple causes systematically",
          "Use transition words: 'firstly', 'secondly', 'another factor', 'finally'",
          "Show empathy — don't blame people for their choices",
        ],
      },
    ],
  },

  {
    id: "travel",
    theme: "Travel & Tourism",
    icon: "✈️",
    part1: [
      {
        question: "Do you enjoy travelling?",
        modelAnswer: "Absolutely, I'm an avid traveller. There's something incredibly enriching about immersing yourself in a different culture, trying local cuisine, and seeing historical landmarks in person. I try to take at least one international trip a year, and I also enjoy exploring lesser-known destinations within my own country. Each trip broadens my perspective and gives me memories that last a lifetime.",
        keyVocabulary: [
          { word: "avid", meaning: "very keen and enthusiastic" },
          { word: "enriching", meaning: "making your experience fuller and better" },
          { word: "immersing", meaning: "involving yourself deeply in something" },
          { word: "broadens", meaning: "makes wider or more extensive" },
        ],
        tips: [
          "Show enthusiasm naturally — don't overdo it",
          "Be specific about frequency: 'at least one trip a year'",
          "Connect travel to personal growth",
        ],
      },
      {
        question: "What place would you most like to visit?",
        modelAnswer: "I've always dreamt of visiting Japan, particularly during the cherry blossom season in spring. I'm fascinated by Japanese culture — the way it seamlessly blends ancient traditions with cutting-edge technology. I'd love to explore Tokyo's vibrant neighbourhoods, visit traditional temples in Kyoto, and of course, try authentic Japanese cuisine. Several friends have been there and they all say it exceeded their expectations, which makes me even more eager to go.",
        keyVocabulary: [
          { word: "fascinated", meaning: "very interested and attracted" },
          { word: "seamlessly", meaning: "smoothly, without any breaks" },
          { word: "cutting-edge", meaning: "the most advanced; state-of-the-art" },
          { word: "exceeded", meaning: "went beyond what was expected" },
        ],
        tips: [
          "Be specific — name cities, seasons, activities",
          "Use present perfect for life experiences: 'I've always dreamt'",
          "Include what others have told you for added detail",
        ],
      },
    ],
    part2: {
      cueCard: "Describe a memorable trip or holiday you have had.",
      bullets: [
        "Where you went",
        "Who you went with",
        "What you did there",
        "And explain why it was memorable",
      ],
      modelAnswer: "I'd like to describe a trip I took to Istanbul, Turkey, about two years ago with my university friends. It was a graduation trip, and we spent five wonderful days exploring the city.\n\nIstanbul is an extraordinary city that straddles two continents — Europe and Asia — which gives it a unique character unlike anywhere else I've been. We stayed in the Sultanahmet district, which is the historic heart of the city, and from there we could walk to most of the major attractions.\n\nWe visited iconic landmarks like the Hagia Sophia, the Blue Mosque, and Topkapi Palace, each of which left me utterly awestruck by their architectural grandeur. The Grand Bazaar was another highlight — it's one of the oldest and largest covered markets in the world, and the atmosphere was absolutely electric with the sounds of vendors calling out and the smell of spices filling the air.\n\nWhat made this trip truly unforgettable, though, was the combination of cultural richness and the bond I shared with my friends. We'd sit in traditional tea houses overlooking the Bosphorus, sipping Turkish tea and talking for hours about our futures and memories. Those conversations, set against the stunning backdrop of the strait at sunset, are moments I'll cherish forever.\n\nThis trip was memorable because it marked the end of an important chapter in our lives and the beginning of a new one. It reminded me that the best investments aren't material — they're the experiences and connections we make along the way.",
      keyVocabulary: [
        { word: "straddles", meaning: "extends across both sides of" },
        { word: "awestruck", meaning: "filled with wonder and amazement" },
        { word: "grandeur", meaning: "impressive beauty and magnificence" },
        { word: "electric", meaning: "exciting and thrilling" },
        { word: "backdrop", meaning: "the background or setting" },
        { word: "cherish", meaning: "hold dear; treasure" },
      ],
      tips: [
        "Paint a vivid picture with descriptive language",
        "Engage the senses: sight, sound, smell, taste",
        "Include emotional reflections, not just facts",
        "End with a meaningful conclusion about why it mattered",
      ],
    },
    part3: [
      {
        question: "How has tourism changed in recent years?",
        modelAnswer: "Tourism has undergone significant transformations. The most obvious change is the influence of social media, which has turned previously unknown destinations into overnight sensations. Platforms like Instagram have created a culture of 'travelling for the photo' rather than for genuine cultural experience. Additionally, budget airlines and online booking platforms have democratised travel, making it accessible to people who couldn't afford it before. However, this surge in tourism has also led to overtourism in popular destinations, causing environmental damage and putting pressure on local communities.",
        keyVocabulary: [
          { word: "transformations", meaning: "major changes in form or character" },
          { word: "democratised", meaning: "made available to everyone" },
          { word: "surge", meaning: "a sudden, large increase" },
          { word: "overtourism", meaning: "too many tourists in one place" },
        ],
        tips: [
          "Discuss multiple changes, not just one",
          "Use present perfect for changes: 'has undergone', 'has created'",
          "Show awareness of both positive and negative impacts",
        ],
      },
      {
        question: "Do you think international travel makes people more open-minded?",
        modelAnswer: "Generally speaking, yes, I believe travel can broaden one's horizons and foster greater tolerance and understanding. When you experience different cultures first-hand — their customs, values, and ways of life — it challenges your preconceptions and helps you see the world from multiple perspectives.\n\nHowever, I wouldn't say travel automatically makes everyone more open-minded. Some travellers stay within their comfort zones, sticking to tourist resorts and never truly engaging with the local culture. The key is how you travel — if you make an effort to interact with locals, learn some of the language, and step outside your comfort zone, then travel can be truly transformative.",
        keyVocabulary: [
          { word: "foster", meaning: "encourage the development of" },
          { word: "preconceptions", meaning: "ideas formed before having full knowledge" },
          { word: "transformative", meaning: "causing a great and positive change" },
          { word: "comfort zone", meaning: "situation where you feel safe and unchallenged" },
        ],
        tips: [
          "Agree but with conditions: 'generally speaking, yes, but...'",
          "Distinguish between types of travellers",
          "Use conditional structures to add depth",
        ],
      },
    ],
  },

  {
    id: "work",
    theme: "Work & Career",
    icon: "💼",
    part1: [
      {
        question: "What kind of work do you do, or what are you studying?",
        modelAnswer: "I'm currently pursuing a degree in Computer Science at King Saud University. I'm in my final year, so I'm quite focused on my graduation project, which involves developing a mobile application for language learning. I chose this field because I've always been fascinated by how technology can solve real-world problems, and I'm particularly interested in artificial intelligence and its applications in education.",
        keyVocabulary: [
          { word: "pursuing", meaning: "actively working towards" },
          { word: "graduation project", meaning: "final academic project to complete a degree" },
          { word: "fascinated", meaning: "very interested and attracted" },
          { word: "applications", meaning: "practical uses of something" },
        ],
        tips: [
          "Provide context: year of study, subject, university",
          "Show your interest and motivation",
          "Connect your studies to your future plans",
        ],
      },
      {
        question: "What job would you like to do in the future?",
        modelAnswer: "Ideally, I'd like to work as a software engineer at a technology company, preferably one that's working on innovative products. In the long run, I'd love to launch my own startup focused on educational technology, because I believe there's enormous potential to improve how people learn through AI and personalised content. I know it's ambitious, but I think the combination of technical skills and a clear vision can make it achievable.",
        keyVocabulary: [
          { word: "ideally", meaning: "in a perfect situation" },
          { word: "innovative", meaning: "introducing new ideas or methods" },
          { word: "enormous", meaning: "very large; huge" },
          { word: "ambitious", meaning: "having a strong desire to succeed" },
        ],
        tips: [
          "Use future structures: 'I'd like to', 'I'd love to'",
          "Show both short-term and long-term goals",
          "Be realistic while showing ambition",
        ],
      },
    ],
    part2: {
      cueCard: "Describe a job you would like to do in the future.",
      bullets: [
        "What the job is",
        "What qualifications or skills it requires",
        "Why you are interested in it",
        "And explain what you would enjoy about it",
      ],
      modelAnswer: "I'd like to describe my dream of becoming the founder and CEO of an educational technology startup.\n\nThis role would require a diverse set of skills. Obviously, I'd need strong technical knowledge in software development, which I'm currently gaining through my Computer Science degree. But beyond that, I'd need business acumen — understanding finance, marketing, and operations — as well as leadership skills to build and manage a team. I'm planning to pursue an MBA or take business courses after graduation to fill that gap.\n\nWhat draws me to this career path is the opportunity to combine my passion for technology with my desire to make a positive impact on society. I've seen firsthand how educational apps can transform the learning experience — I use several myself for IELTS preparation — and I believe there's a significant gap in the market for high-quality, AI-powered learning tools tailored to Arabic-speaking students.\n\nWhat I'd enjoy most is the creative aspect of building something from scratch. The idea of identifying a problem, designing a solution, and watching it come to life is incredibly exciting to me. I'd also relish the variety — no two days would be the same, and I'd constantly be learning and adapting. Of course, entrepreneurship comes with risks and challenges, but I think that's what makes it so rewarding when you eventually succeed.",
      keyVocabulary: [
        { word: "acumen", meaning: "the ability to make good judgments" },
        { word: "draws me to", meaning: "attracts me towards" },
        { word: "firsthand", meaning: "from personal experience, directly" },
        { word: "tailored", meaning: "made or adapted for a specific purpose" },
        { word: "relish", meaning: "enjoy greatly" },
        { word: "entrepreneurship", meaning: "starting and running businesses" },
      ],
      tips: [
        "Be ambitious but realistic about challenges",
        "Show awareness of what skills you need and how you'll get them",
        "Use a range of conditionals and future forms",
        "Include personal motivation and values",
      ],
    },
    part3: [
      {
        question: "Is it better to work for yourself or for a company?",
        modelAnswer: "Both options have their merits, and the best choice really depends on the individual. Working for a company offers stability, a regular income, benefits like health insurance, and a clear career progression path. It also allows you to learn from experienced colleagues and work within established systems.\n\nSelf-employment, on the other hand, offers freedom and flexibility. You can set your own hours, pursue your own vision, and potentially earn more if your business succeeds. However, it comes with significant risks — financial instability, no safety net, and the pressure of being solely responsible for everything.\n\nIn my opinion, the ideal approach might be to start by working for a company to gain experience, build a network, and save capital, then transition to self-employment when you're better prepared. That way, you get the best of both worlds.",
        keyVocabulary: [
          { word: "merits", meaning: "good qualities or advantages" },
          { word: "progression", meaning: "gradual development or advancement" },
          { word: "instability", meaning: "lack of steadiness; uncertainty" },
          { word: "capital", meaning: "money available for investment" },
          { word: "transition", meaning: "the process of changing from one state to another" },
        ],
        tips: [
          "Compare systematically: benefits of A, then benefits of B",
          "Suggest a compromise or personal preference at the end",
          "Use academic vocabulary: 'merits', 'progression', 'transition'",
        ],
      },
      {
        question: "How important is job satisfaction compared to salary?",
        modelAnswer: "This is a question many people grapple with. I believe job satisfaction should take precedence over salary, but with some caveats. If someone is struggling to meet their basic needs, then salary understandably becomes the priority — you can't think about fulfilment when you're worried about paying rent.\n\nHowever, once your basic financial needs are met, I think satisfaction becomes far more important for long-term wellbeing. Research consistently shows that beyond a certain income level, additional money contributes very little to happiness. People who feel passionate about their work, who find it meaningful and challenging, tend to be healthier, more motivated, and more productive.\n\nUltimately, the happiest professionals I know are those who've managed to find a balance — work that pays reasonably well AND provides a sense of purpose.",
        keyVocabulary: [
          { word: "grapple with", meaning: "struggle to deal with or understand" },
          { word: "take precedence", meaning: "be more important than" },
          { word: "caveats", meaning: "warnings or conditions" },
          { word: "fulfilment", meaning: "satisfaction from achieving something" },
        ],
        tips: [
          "Reference research or common findings",
          "Use nuanced language: 'with some caveats', 'understandably'",
          "Show that you can consider different perspectives",
        ],
      },
    ],
  },

  {
    id: "environment",
    theme: "Environment & Climate",
    icon: "🌍",
    part1: [
      {
        question: "Are you concerned about the environment?",
        modelAnswer: "Yes, I'm genuinely concerned. Climate change is no longer a distant threat — we can already see its effects in the form of extreme weather events, rising sea levels, and loss of biodiversity. In my own region, water scarcity has become an increasingly pressing issue. I try to do my part by reducing plastic use, conserving water, and supporting sustainable products, though I acknowledge that individual actions alone aren't sufficient — we need systemic change at a governmental and corporate level.",
        keyVocabulary: [
          { word: "biodiversity", meaning: "the variety of plant and animal life" },
          { word: "scarcity", meaning: "shortage; not enough of something" },
          { word: "conserving", meaning: "using carefully to prevent waste" },
          { word: "systemic", meaning: "relating to the whole system" },
        ],
        tips: [
          "Show genuine concern with specific examples",
          "Connect global issues to your local experience",
          "Balance personal action with bigger-picture awareness",
        ],
      },
    ],
    part2: {
      cueCard: "Describe something you do to help protect the environment.",
      bullets: [
        "What you do",
        "When you started doing it",
        "How it helps the environment",
        "And explain how you feel about doing it",
      ],
      modelAnswer: "I'd like to talk about my habit of reducing single-use plastic, which I started about a year and a half ago after watching a documentary about ocean pollution.\n\nThe documentary showed harrowing footage of marine animals entangled in plastic waste, and it was a real wake-up call for me. The very next day, I went out and bought a reusable water bottle, a set of cloth shopping bags, and a metal straw. Since then, I've made a conscious effort to refuse plastic bags at shops, avoid buying bottled water, and choose products with minimal packaging.\n\nIn terms of environmental impact, while my individual contribution might seem small, the statistics are encouraging. By using a reusable bottle, I estimate I've prevented about 500 plastic bottles from going to landfill over the past year alone. When you multiply that by thousands of people making similar changes, the collective impact is substantial.\n\nEmotionally, this lifestyle change has given me a sense of empowerment. Before, I felt overwhelmed by the scale of environmental problems and helpless to make a difference. Now, every time I choose a sustainable option, I feel I'm casting a vote for the kind of world I want to live in. It's also influenced those around me — several friends and family members have started bringing their own bags to shops after seeing me do it, which is really gratifying.",
      keyVocabulary: [
        { word: "harrowing", meaning: "extremely distressing and disturbing" },
        { word: "wake-up call", meaning: "an event that makes you realise you need to act" },
        { word: "empowerment", meaning: "the feeling of having power and control" },
        { word: "collective", meaning: "done by people acting as a group" },
        { word: "gratifying", meaning: "giving pleasure and satisfaction" },
      ],
      tips: [
        "Include the trigger — what motivated you to start",
        "Use statistics or estimates to show impact",
        "Discuss emotional response, not just actions",
        "Mention influence on others — this shows leadership",
      ],
    },
    part3: [
      {
        question: "Should companies be responsible for reducing their environmental impact?",
        modelAnswer: "Absolutely. I believe companies bear a significant share of responsibility for environmental degradation, and they should be held accountable. Large corporations are responsible for a disproportionate amount of pollution and carbon emissions, so it's only fair that they take the lead in finding solutions.\n\nThis could take various forms: investing in renewable energy, reducing waste in production processes, using sustainable materials, and offsetting their carbon footprint. Some companies are already doing this voluntarily, which is commendable, but I think government regulation is necessary to ensure all companies meet minimum environmental standards, not just those motivated by public image.\n\nUltimately, companies that fail to adapt to sustainable practices will find themselves at a competitive disadvantage as consumers become more environmentally conscious and are willing to pay more for eco-friendly products.",
        keyVocabulary: [
          { word: "degradation", meaning: "the process of becoming worse" },
          { word: "disproportionate", meaning: "too large or too small relative to something else" },
          { word: "offsetting", meaning: "compensating for something by doing something else" },
          { word: "commendable", meaning: "deserving praise" },
        ],
        tips: [
          "State your position clearly at the start",
          "Give specific examples of what companies can do",
          "Discuss both voluntary action and regulation",
          "End with a forward-looking statement",
        ],
      },
    ],
  },

  {
    id: "food",
    theme: "Food & Cooking",
    icon: "🍽️",
    part1: [
      {
        question: "What kind of food do you like?",
        modelAnswer: "I have quite an eclectic taste when it comes to food. I'm a big fan of traditional Arabic cuisine, particularly dishes like kabsa and mandi, which are fragrant rice dishes cooked with tender meat and aromatic spices. I also enjoy trying international cuisines — Japanese sushi, Italian pasta, and Indian curries are some of my favourites. Recently, I've developed an interest in healthy eating, so I've been experimenting with salads and grilled dishes.",
        keyVocabulary: [
          { word: "eclectic", meaning: "deriving ideas from a broad range of sources" },
          { word: "fragrant", meaning: "having a pleasant, sweet smell" },
          { word: "aromatic", meaning: "having a strong, pleasant smell" },
          { word: "experimenting", meaning: "trying new things to see what happens" },
        ],
        tips: [
          "Use descriptive adjectives for food: 'fragrant', 'tender', 'aromatic'",
          "Name specific dishes to show detailed vocabulary",
          "Mention evolving tastes to show personal development",
        ],
      },
      {
        question: "Can you cook? What do you like to cook?",
        modelAnswer: "I'd say I'm a competent home cook, though I'm far from a chef. I learned the basics from my mother, and I can prepare straightforward meals like pasta, grilled chicken, and rice dishes. My speciality is probably scrambled eggs with vegetables, which might sound simple, but I've perfected it over the years. I find cooking therapeutic — it's a creative process that helps me unwind after a long day of studying.",
        keyVocabulary: [
          { word: "competent", meaning: "having enough skill to do something well" },
          { word: "straightforward", meaning: "simple and easy to understand" },
          { word: "speciality", meaning: "something someone is particularly good at" },
          { word: "therapeutic", meaning: "helping you feel calmer and more relaxed" },
        ],
        tips: [
          "Be honest about your skill level — modesty is natural",
          "Use a range of food-related vocabulary",
          "Connect cooking to emotions or lifestyle",
        ],
      },
    ],
    part2: {
      cueCard: "Describe a meal you enjoyed having with friends or family.",
      bullets: [
        "When and where you had the meal",
        "Who was there",
        "What you ate",
        "And explain why you enjoyed it",
      ],
      modelAnswer: "I'd like to describe a memorable dinner I had with my extended family during Eid Al-Fitr, which marks the end of Ramadan.\n\nIt was last year, and we gathered at my grandmother's house, which is where the family always comes together for celebrations. There must have been about thirty of us — aunts, uncles, cousins, and my grandparents — all crowded into her spacious living room, sitting on cushions around a massive spread of food laid out on a traditional cloth on the floor.\n\nThe feast was absolutely spectacular. My grandmother had prepared her legendary lamb kabsa, which takes her nearly three hours to cook. The rice was perfectly seasoned with saffron, cardamom, and dried lime, and the lamb was so tender it fell off the bone. There were also bowls of fresh salad, warm flatbread, and several side dishes. For dessert, we had kunafa — a sweet cheese pastry soaked in sugar syrup — and Arabic coffee with dates.\n\nWhat made this meal so special wasn't just the food, though that was exceptional. It was the atmosphere of warmth and togetherness. After a month of fasting, sitting down together felt like a celebration in every sense. My grandmother was beaming with pride, the children were running around excitedly, and there was constant laughter and conversation. Those moments of genuine family connection are becoming rarer as life gets busier, which makes them all the more precious.",
      keyVocabulary: [
        { word: "extended family", meaning: "relatives beyond parents and siblings" },
        { word: "spectacular", meaning: "impressively beautiful or dramatic" },
        { word: "legendary", meaning: "famous, well-known" },
        { word: "seasoned", meaning: "flavoured with spices" },
        { word: "beaming", meaning: "smiling broadly with happiness" },
        { word: "precious", meaning: "of great value; not to be wasted" },
      ],
      tips: [
        "Set the scene with cultural context",
        "Describe food in detail — flavours, textures, aromas",
        "Emphasise the social aspect, not just the food",
        "Use emotive language to show how you felt",
      ],
    },
    part3: [
      {
        question: "Why do many young people prefer fast food?",
        modelAnswer: "There are several interconnected reasons. The most obvious one is convenience — fast food is quick to order, requires no preparation, and is available virtually everywhere. For students and young professionals with demanding schedules, the speed and accessibility of fast food is highly appealing.\n\nAnother factor is marketing. Fast food companies invest billions in advertising specifically targeting young people through social media, celebrity endorsements, and attractive promotions. This constant exposure normalises fast food consumption.\n\nFinally, there's the taste factor. Fast food is engineered to be highly palatable — the combination of salt, sugar, and fat triggers pleasure responses in the brain, making it almost addictive. Many young people simply haven't developed a taste for healthier alternatives because they haven't been exposed to them.",
        keyVocabulary: [
          { word: "interconnected", meaning: "connected to each other" },
          { word: "endorsements", meaning: "public support or approval" },
          { word: "normalises", meaning: "makes something seem normal or acceptable" },
          { word: "palatable", meaning: "pleasant to taste" },
          { word: "engineered", meaning: "designed and created carefully" },
        ],
        tips: [
          "Identify multiple interconnected causes",
          "Use academic language: 'engineered', 'normalises'",
          "Show understanding without being judgmental",
        ],
      },
    ],
  },

  {
    id: "family",
    theme: "Family & Relationships",
    icon: "👨‍👩‍👧‍👦",
    part1: [
      {
        question: "How much time do you spend with your family?",
        modelAnswer: "I try to spend as much time as possible with my family, though it can be challenging with my study commitments. We always have dinner together, which is a non-negotiable tradition in our household. On Fridays, which is our weekend, we usually gather at my grandparents' house for a family lunch. I find these regular family interactions incredibly grounding — they remind me of what truly matters in life.",
        keyVocabulary: [
          { word: "commitments", meaning: "things you must do; responsibilities" },
          { word: "non-negotiable", meaning: "not open to discussion or change" },
          { word: "grounding", meaning: "helping you feel stable and connected" },
        ],
        tips: [
          "Be honest about the balance between family and other commitments",
          "Mention specific traditions or routines",
          "Show appreciation for family time",
        ],
      },
      {
        question: "Who are you closest to in your family?",
        modelAnswer: "I'd say I'm closest to my mother. She's been my confidante and biggest supporter throughout my life. What I admire most about her is her ability to remain calm and optimistic, even during difficult times. She has this remarkable way of making everyone around her feel valued and understood. We can talk about absolutely anything, from everyday matters to deeper philosophical questions about life.",
        keyVocabulary: [
          { word: "confidante", meaning: "a person you trust with private matters" },
          { word: "optimistic", meaning: "hopeful and positive about the future" },
          { word: "remarkable", meaning: "worthy of attention; extraordinary" },
          { word: "philosophical", meaning: "relating to deep questions about life and existence" },
        ],
        tips: [
          "Describe the person's character, not just who they are",
          "Use adjectives that show emotional intelligence",
          "Give a specific quality you admire",
        ],
      },
    ],
    part2: {
      cueCard: "Describe a family member you admire.",
      bullets: [
        "Who this person is",
        "What they are like",
        "What they have achieved",
        "And explain why you admire them",
      ],
      modelAnswer: "The family member I admire most is my father, who has been an extraordinary role model throughout my life.\n\nMy father is a civil engineer who has been working in the construction industry for over twenty-five years. He's a quiet, thoughtful man — not the type to seek attention or praise — but his actions speak volumes about his character.\n\nWhat I find most admirable about him is his unwavering work ethic. He grew up in modest circumstances and was the first person in his family to attend university. He worked part-time jobs throughout his studies to support himself, and after graduating, he steadily built his career from an entry-level position to a senior management role. He never took shortcuts or compromised his integrity.\n\nBeyond his professional achievements, what truly sets him apart is his dedication to our family. Despite his demanding career, he always made time for us. He attended every school event, helped with homework, and made sure we never felt his absence. He taught me the value of discipline, perseverance, and treating people with respect regardless of their status.\n\nI admire him because he proves that success and decency are not mutually exclusive. In a world that often rewards self-promotion, he demonstrates that quiet competence and genuine kindness can take you just as far, if not further.",
      keyVocabulary: [
        { word: "role model", meaning: "a person whose behaviour is copied by others" },
        { word: "speaks volumes", meaning: "expresses a lot without words" },
        { word: "integrity", meaning: "the quality of being honest and moral" },
        { word: "mutually exclusive", meaning: "cannot both be true at the same time" },
        { word: "competence", meaning: "the ability to do something well" },
      ],
      tips: [
        "Build a narrative arc: background → achievements → qualities",
        "Use specific examples rather than vague praise",
        "Connect their qualities to lessons you've learned",
        "End with a reflection on why they matter to you",
      ],
    },
    part3: [
      {
        question: "How have family structures changed in your country?",
        modelAnswer: "Family structures in my country have undergone notable changes over the past few decades. Traditionally, extended families would live together or very close to each other, with grandparents, parents, and children all under one roof. This arrangement provided a built-in support system and reinforced cultural values.\n\nHowever, urbanisation and modernisation have gradually shifted this pattern. More young couples now prefer nuclear family arrangements — just parents and children — especially in major cities. This is partly due to career mobility, as people move to different cities for work, and partly because of changing attitudes about independence and privacy.\n\nThat said, the cultural emphasis on family bonds remains strong. Even when family members live separately, they maintain close contact through regular visits, group chats, and family gatherings during holidays and religious occasions.",
        keyVocabulary: [
          { word: "undergone", meaning: "experienced a process of change" },
          { word: "reinforced", meaning: "strengthened or supported" },
          { word: "urbanisation", meaning: "the process of people moving to cities" },
          { word: "nuclear family", meaning: "parents and children only" },
          { word: "mobility", meaning: "the ability to move easily" },
        ],
        tips: [
          "Compare past and present using appropriate tenses",
          "Use academic vocabulary for social changes",
          "Show cultural awareness and sensitivity",
        ],
      },
    ],
  },

  {
    id: "media",
    theme: "Media & Social Media",
    icon: "📱",
    part1: [
      {
        question: "How do you usually get your news?",
        modelAnswer: "I primarily get my news through online sources and social media platforms. I follow several reputable news outlets on Twitter and have a few news apps on my phone that send me notifications about breaking stories. I also listen to news podcasts during my commute, which I find more convenient than watching television. However, I always try to verify information by cross-checking multiple sources, as misinformation has become a significant problem online.",
        keyVocabulary: [
          { word: "reputable", meaning: "having a good reputation; respected" },
          { word: "breaking stories", meaning: "news that is happening right now" },
          { word: "cross-checking", meaning: "verifying by comparing different sources" },
          { word: "misinformation", meaning: "false or inaccurate information" },
        ],
        tips: [
          "Show media literacy — mention fact-checking",
          "Use a variety of media-related vocabulary",
          "Explain why you prefer certain sources",
        ],
      },
    ],
    part2: {
      cueCard: "Describe a time when you read or heard a piece of news that made you happy.",
      bullets: [
        "What the news was about",
        "Where you heard or read it",
        "When it happened",
        "And explain why it made you happy",
      ],
      modelAnswer: "I'd like to talk about a piece of news that genuinely lifted my spirits. It was about six months ago when I read that Saudi Arabia had been awarded the right to host the 2034 FIFA World Cup.\n\nI came across the news on social media first — my phone was practically buzzing non-stop with notifications and messages from friends. I then switched on the television and watched the official announcement ceremony. The atmosphere, even through the screen, was absolutely electrifying.\n\nThis news made me incredibly happy for several reasons. First, as a football enthusiast, the idea of attending World Cup matches in my own country was a dream I never thought would come true. The prospect of experiencing the world's biggest sporting event without having to travel abroad is tremendously exciting.\n\nBut beyond football, this event represents so much more. It's a recognition of how far Saudi Arabia has come in terms of modernisation, infrastructure development, and global engagement. It means billions in investment, thousands of new jobs, and an opportunity to showcase our culture and hospitality to the entire world.\n\nWhat made me most proud was the sense of unity it created. For those few days after the announcement, everyone seemed to forget their differences and celebrate together. It was a reminder that positive events have the power to bring people together like nothing else.",
      keyVocabulary: [
        { word: "lifted my spirits", meaning: "made me feel happier" },
        { word: "electrifying", meaning: "causing great excitement" },
        { word: "prospect", meaning: "the possibility of something happening" },
        { word: "showcase", meaning: "display proudly to others" },
        { word: "unity", meaning: "the state of being together as one" },
      ],
      tips: [
        "Build excitement gradually in your narrative",
        "Connect the news to both personal and broader significance",
        "Show emotional range in your vocabulary",
        "Use descriptive language to convey atmosphere",
      ],
    },
    part3: [
      {
        question: "Do you think social media has more positive or negative effects on society?",
        modelAnswer: "I think the effects are genuinely mixed, and it would be an oversimplification to say one outweighs the other. On the positive side, social media has democratised information sharing, given marginalised voices a platform, and connected people across geographical boundaries. It's been instrumental in social movements and has created economic opportunities through influencer marketing and small business promotion.\n\nOn the negative side, the impact on mental health is well-documented — particularly among young people. The constant comparison, cyberbullying, and addictive design of these platforms can lead to anxiety, depression, and low self-esteem. There's also the issue of echo chambers, where algorithms feed users content that reinforces their existing beliefs, making society more polarised.\n\nUltimately, I believe social media is a tool, and like any tool, its impact depends on how it's used. The responsibility lies with both individuals — to use it mindfully — and with companies — to design their platforms more ethically.",
        keyVocabulary: [
          { word: "oversimplification", meaning: "making something seem simpler than it is" },
          { word: "marginalised", meaning: "treated as unimportant by society" },
          { word: "instrumental", meaning: "important in making something happen" },
          { word: "echo chambers", meaning: "environments where only similar opinions are heard" },
          { word: "polarised", meaning: "divided into two opposing groups" },
        ],
        tips: [
          "Present a balanced, nuanced view",
          "Use evidence-based language: 'well-documented'",
          "End with a thoughtful conclusion about responsibility",
        ],
      },
    ],
  },

  {
    id: "culture",
    theme: "Culture & Traditions",
    icon: "🎭",
    part1: [
      {
        question: "What is the most important festival or celebration in your country?",
        modelAnswer: "I'd say Eid Al-Fitr is the most significant celebration in my country. It marks the end of Ramadan, the holy month of fasting, and it's a time of immense joy and gratitude. Families come together, people wear new clothes, children receive gifts and money, and there's an atmosphere of generosity throughout the community. What I love most is that it transcends social classes — everyone celebrates together, and people make a point of helping those who are less fortunate.",
        keyVocabulary: [
          { word: "significant", meaning: "important, meaningful" },
          { word: "immense", meaning: "extremely large or great" },
          { word: "gratitude", meaning: "the feeling of being thankful" },
          { word: "transcends", meaning: "goes beyond the limits of" },
        ],
        tips: [
          "Describe the cultural significance, not just activities",
          "Use emotive vocabulary to convey the atmosphere",
          "Show personal connection to the celebration",
        ],
      },
    ],
    part2: {
      cueCard: "Describe a cultural event or tradition you have enjoyed participating in.",
      bullets: [
        "What the event or tradition is",
        "When and where it takes place",
        "What happens during it",
        "And explain why you enjoy it",
      ],
      modelAnswer: "I'd like to describe a tradition that's very close to my heart — the Ramadan family gatherings that take place every evening during the holy month.\n\nRamadan occurs annually, based on the Islamic lunar calendar, and lasts for approximately thirty days. Every evening at sunset, families break their fast with a meal called iftar. In our family, this is a daily ritual that we take very seriously and joyfully.\n\nThe evening begins with the call to prayer at sunset, when we break our fast with dates and water, following the tradition of the Prophet. After the sunset prayer, we sit together — usually fifteen to twenty family members — around a table laden with a variety of dishes. My mother and aunts prepare different specialities each day, and there's always an element of surprise about what will be served.\n\nAfter iftar, we usually sit together drinking Arabic coffee and chatting. The conversation ranges from reminiscing about past Ramadans to discussing current events and family news. Later in the evening, many people go to the mosque for special Ramadan prayers called Taraweeh.\n\nWhat I enjoy most about this tradition is the sense of spiritual renewal and family bonding. In our regular lives, everyone is busy with work and study, and it's hard to gather everyone together. Ramadan creates a framework that brings the family together every single day for a month, strengthening bonds and creating memories. There's also a beautiful emphasis on charity and compassion during this month, which brings out the best in people.",
      keyVocabulary: [
        { word: "ritual", meaning: "a ceremony or action performed regularly" },
        { word: "laden with", meaning: "heavily loaded with" },
        { word: "reminiscing", meaning: "thinking or talking about past experiences" },
        { word: "spiritual renewal", meaning: "refreshing one's religious or inner feelings" },
        { word: "compassion", meaning: "sympathy and concern for others' suffering" },
        { word: "framework", meaning: "a structure that supports something" },
      ],
      tips: [
        "Explain cultural context for the examiner who may not know your traditions",
        "Use temporal language: 'every evening', 'after iftar', 'later in the evening'",
        "Include sensory details: food, conversation, atmosphere",
        "Reflect on the deeper meaning of the tradition",
      ],
    },
    part3: [
      {
        question: "Do you think traditional customs are disappearing?",
        modelAnswer: "I think some traditions are indeed evolving or fading, while others remain remarkably resilient. The traditions most at risk are those that rely on face-to-face community gatherings, as urbanisation and busy modern lifestyles make it harder for people to come together regularly.\n\nHowever, I've noticed that many cultures are finding creative ways to preserve their traditions by adapting them to modern contexts. For example, families now use video calls to include relatives who live far away in celebrations. Social media has also become a tool for sharing and promoting cultural practices, particularly among younger generations who might otherwise be disconnected from their heritage.\n\nI believe the traditions that carry genuine emotional and spiritual significance will survive, even if their form changes. The ones that were maintained purely out of obligation, without deep personal meaning, are more likely to fade.",
        keyVocabulary: [
          { word: "evolving", meaning: "gradually developing and changing" },
          { word: "resilient", meaning: "able to recover and continue; tough" },
          { word: "preserve", meaning: "keep alive; maintain" },
          { word: "disconnected", meaning: "having lost the feeling of connection" },
        ],
        tips: [
          "Avoid a simple yes/no — show nuance",
          "Give examples of how traditions adapt",
          "End with a thoughtful prediction or principle",
        ],
      },
    ],
  },

  {
    id: "leisure",
    theme: "Hobbies & Leisure",
    icon: "🎨",
    part1: [
      {
        question: "What do you enjoy doing in your free time?",
        modelAnswer: "In my free time, I'm quite drawn to reading — mainly non-fiction books about psychology and self-improvement. I find it fascinating to learn about how the human mind works. I also enjoy playing football with friends on weekends, which is a great way to stay active and socialise. When I'm in the mood for something more relaxing, I'll watch documentaries or listen to podcasts about science and technology. I think it's important to have a mix of active and passive hobbies.",
        keyVocabulary: [
          { word: "drawn to", meaning: "attracted towards" },
          { word: "fascinating", meaning: "extremely interesting" },
          { word: "socialise", meaning: "spend time with others socially" },
          { word: "in the mood for", meaning: "wanting to do something" },
        ],
        tips: [
          "Mention 2-3 different hobbies to show range",
          "Explain WHY you enjoy each one",
          "Use varied vocabulary — avoid repeating 'like'",
        ],
      },
      {
        question: "Do you prefer indoor or outdoor activities?",
        modelAnswer: "It really depends on the weather and my energy levels. During the milder months, I gravitate towards outdoor activities — I love going for walks, playing football, or simply sitting in a park with a good book. However, during our scorching summers when temperatures can reach 50 degrees, outdoor activities become impractical, so I tend to opt for indoor alternatives like going to the gym, reading, or visiting shopping malls. If I had to choose one, I'd probably lean slightly towards outdoor activities because there's something rejuvenating about being in nature and breathing fresh air.",
        keyVocabulary: [
          { word: "gravitate towards", meaning: "be naturally attracted to" },
          { word: "impractical", meaning: "not sensible or realistic" },
          { word: "opt for", meaning: "choose; decide on" },
          { word: "rejuvenating", meaning: "making you feel young and energetic again" },
        ],
        tips: [
          "Use 'it depends' to show flexibility",
          "Give context-specific examples",
          "Express a slight preference rather than an absolute one",
        ],
      },
    ],
    part2: {
      cueCard: "Describe a hobby or activity you enjoy doing.",
      bullets: [
        "What the hobby is",
        "When and how you started it",
        "How often you do it",
        "And explain why you enjoy it",
      ],
      modelAnswer: "I'd like to talk about my passion for reading, which has been a constant companion throughout my life.\n\nI first developed a love for reading when I was about eight years old. My father gave me a collection of short stories in Arabic, and I was completely captivated by the magical worlds within those pages. From that point on, I became an insatiable reader, gradually progressing from children's stories to novels and eventually to non-fiction.\n\nNowadays, I read almost every day, typically for about an hour before bed. I find it's the perfect way to wind down after a busy day. I also carry a book with me wherever I go, so I can read during any idle moments — waiting for an appointment, commuting, or sitting in a café. On average, I finish about two to three books per month.\n\nThe genres I'm most drawn to are self-improvement and psychology. Books like 'Atomic Habits' by James Clear and 'Thinking, Fast and Slow' by Daniel Kahneman have profoundly influenced my thinking and daily habits. I also enjoy historical fiction because it allows me to learn about different eras and cultures while being entertained.\n\nWhat I enjoy most about reading is the sense of continuous growth it provides. Every book teaches me something new — a different perspective, a useful concept, or simply a beautiful way of expressing an idea. It's also a form of mental escape — when I'm absorbed in a good book, the stress and noise of daily life fade away completely.",
      keyVocabulary: [
        { word: "insatiable", meaning: "impossible to satisfy; always wanting more" },
        { word: "wind down", meaning: "relax after a period of activity" },
        { word: "profoundly", meaning: "in a very deep and significant way" },
        { word: "absorbed", meaning: "deeply focused and engaged in something" },
      ],
      tips: [
        "Tell the origin story of your hobby",
        "Be specific: name books, give frequencies, mention routines",
        "Show how the hobby has evolved over time",
        "Connect it to personal growth and wellbeing",
      ],
    },
    part3: [
      {
        question: "Why is it important for people to have hobbies?",
        modelAnswer: "Having hobbies is crucial for several reasons. First and foremost, they provide a much-needed outlet for stress relief. In today's fast-paced world, people are under constant pressure from work and daily responsibilities, and hobbies offer a healthy escape that recharges the mind.\n\nSecondly, hobbies contribute to personal development. Whether it's learning a musical instrument, painting, or playing chess, hobbies challenge the brain, build new neural pathways, and keep the mind sharp. Studies have shown that people who engage in regular leisure activities have better cognitive function as they age.\n\nAdditionally, hobbies can foster social connections. Joining a sports team, a book club, or an art class introduces you to like-minded people, which can combat loneliness and build a sense of community.\n\nFinally, I'd argue that hobbies are essential for maintaining a sense of identity beyond work. People who define themselves solely by their profession often struggle when they retire or face career setbacks. Hobbies provide a richer, more multifaceted identity.",
        keyVocabulary: [
          { word: "outlet", meaning: "a way of expressing or releasing feelings" },
          { word: "recharges", meaning: "restores energy or vitality" },
          { word: "neural pathways", meaning: "connections in the brain" },
          { word: "multifaceted", meaning: "having many different aspects" },
        ],
        tips: [
          "Present multiple reasons in a structured way",
          "Reference studies or evidence to support claims",
          "Cover different dimensions: mental, social, personal",
        ],
      },
    ],
  },
];
