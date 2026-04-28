export type LSection = 1 | 2 | 3 | 4;
export type LQType =
  | "multiple_choice"
  | "matching"
  | "map_labelling"
  | "form_completion"
  | "sentence_completion"
  | "short_answer";

export type AudioLine = {
  speaker: string;
  voice: "f" | "m";
  text: string;
};

export type LItem = {
  prompt: string;
  options?: { label: string; text: string }[];
  answer: string | string[];
  acceptable?: string[];
};

export type LSkillTest = {
  id: string;
  section: LSection;
  title: string;
  context: string;
  audioLines: AudioLine[];
  qType: LQType;
  instructions: string;
  wordLimit?: string;
  visual?: string;
  options?: { label: string; text: string }[];
  items: LItem[];
  analysis: string;
};

export const LISTENING_SECTIONS: { section: LSection; title: string; arabic: string; description: string; emoji: string; gradient: string }[] = [
  {
    section: 1,
    title: "Section 1 — Everyday Conversation",
    arabic: "محادثة يومية",
    description: "A conversation between two people in a social context — booking a room, registering for a course, calling about a service.",
    emoji: "📞",
    gradient: "from-sky-500 to-blue-500",
  },
  {
    section: 2,
    title: "Section 2 — Social Monologue",
    arabic: "خطاب اجتماعي",
    description: "One speaker talking about a place, event or facility — a tour guide, a community announcement, a museum guide.",
    emoji: "🎤",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    section: 3,
    title: "Section 3 — Academic Discussion",
    arabic: "مناقشة أكاديمية",
    description: "A conversation between 2–4 people in an educational setting — a tutor and students discussing an assignment.",
    emoji: "🎓",
    gradient: "from-amber-500 to-orange-500",
  },
  {
    section: 4,
    title: "Section 4 — Academic Lecture",
    arabic: "محاضرة أكاديمية",
    description: "A university-style lecture by one speaker. The most challenging section, with academic vocabulary and dense content.",
    emoji: "📚",
    gradient: "from-rose-500 to-pink-500",
  },
];

export const LISTENING_SKILL_TESTS: LSkillTest[] = [

  // ═════════════════════ SECTION 1 ═════════════════════

  {
    id: "ls1-001",
    section: 1,
    title: "Booking a Hotel Room",
    context: "A man calls the Greenfield Hotel to book a room for a short stay.",
    qType: "form_completion",
    instructions: "Complete the booking form below.",
    wordLimit: "Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.",
    audioLines: [
      { speaker: "Receptionist", voice: "f", text: "Good afternoon, Greenfield Hotel, Sarah speaking. How can I help you?" },
      { speaker: "Caller",       voice: "m", text: "Hi, I'd like to book a room for next weekend, please." },
      { speaker: "Receptionist", voice: "f", text: "Of course. May I have your name?" },
      { speaker: "Caller",       voice: "m", text: "Yes, it's Daniel Foster. That's F-O-S-T-E-R." },
      { speaker: "Receptionist", voice: "f", text: "Thank you, Mr Foster. And which dates were you thinking of?" },
      { speaker: "Caller",       voice: "m", text: "Friday the fourteenth, checking out on Sunday morning." },
      { speaker: "Receptionist", voice: "f", text: "So that's two nights. Would you like a single, double or family room?" },
      { speaker: "Caller",       voice: "m", text: "A double, please. Is there one with a view of the garden?" },
      { speaker: "Receptionist", voice: "f", text: "Yes, the garden rooms are seventy-five pounds per night, including breakfast." },
      { speaker: "Caller",       voice: "m", text: "That sounds fine. Could I also book parking? I'll be driving." },
      { speaker: "Receptionist", voice: "f", text: "Certainly. Parking is free for guests. Could I take a contact number?" },
      { speaker: "Caller",       voice: "m", text: "Yes, it's oh-seven-eight-double-four, two-one-six, nine-three-oh." },
      { speaker: "Receptionist", voice: "f", text: "Thank you. I'll send confirmation to your email if you give it to me." },
      { speaker: "Caller",       voice: "m", text: "It's daniel.foster, all one word, at quickmail dot com." },
      { speaker: "Receptionist", voice: "f", text: "Perfect. Your booking is confirmed, Mr Foster. We look forward to seeing you." },
    ],
    visual:
`╔════════════════ GREENFIELD HOTEL — BOOKING FORM ════════════════╗
║ Guest name:        Daniel  (1) ___                              ║
║ Check-in date:     Friday  (2) ___                              ║
║ Number of nights:  (3) ___                                       ║
║ Room type:         Double, with garden view                      ║
║ Price per night:   £ (4) ___ (incl. breakfast)                   ║
║ Parking required:  Yes (free for guests)                         ║
║ Contact number:    07844 216 (5) ___                             ║
╚══════════════════════════════════════════════════════════════════╝`,
    items: [
      { prompt: "1. Guest surname",              answer: "Foster" },
      { prompt: "2. Check-in date",              answer: "14th", acceptable: ["fourteenth", "14"] },
      { prompt: "3. Number of nights",           answer: "2", acceptable: ["two"] },
      { prompt: "4. Price per night (£)",        answer: "75", acceptable: ["seventy-five", "seventy five"] },
      { prompt: "5. Last 3 digits of phone",     answer: "930", acceptable: ["nine three oh", "nine-three-oh"] },
    ],
    analysis:
`1 → Foster. The caller spells it: "F-O-S-T-E-R."
2 → 14th. "Friday the fourteenth."
3 → 2. Friday → Sunday morning = "two nights."
4 → 75. "Seventy-five pounds per night, including breakfast."
5 → 930. The full number is 07844 216 930.

Tip: Numbers and spellings are the most common Section 1 traps. Always write digits exactly as you hear them.`,
  },

  {
    id: "ls1-002",
    section: 1,
    title: "Registering for a Cookery Course",
    context: "A woman calls the Riverside Community Centre to enrol on a course.",
    qType: "multiple_choice",
    instructions: "For each question, choose the correct letter A, B or C.",
    audioLines: [
      { speaker: "Centre staff", voice: "m", text: "Riverside Community Centre, good morning." },
      { speaker: "Caller",       voice: "f", text: "Hello, I'm interested in joining one of your evening cookery courses." },
      { speaker: "Centre staff", voice: "m", text: "Lovely. We currently run three: Italian, Thai and a general beginners' class." },
      { speaker: "Caller",       voice: "f", text: "I think Thai would suit me best. I cook Italian at home already." },
      { speaker: "Centre staff", voice: "m", text: "Excellent choice. The Thai course runs for eight weeks, Tuesday evenings, from six-thirty to nine." },
      { speaker: "Caller",       voice: "f", text: "And what does it cost?" },
      { speaker: "Centre staff", voice: "m", text: "It's a hundred and twenty pounds, which includes all ingredients but not the recipe book." },
      { speaker: "Caller",       voice: "f", text: "Do I need to bring anything?" },
      { speaker: "Centre staff", voice: "m", text: "Just an apron. We provide knives, chopping boards and pans." },
      { speaker: "Caller",       voice: "f", text: "And how many people are in each class?" },
      { speaker: "Centre staff", voice: "m", text: "We keep it small — twelve students maximum, so everyone gets attention from the chef." },
      { speaker: "Caller",       voice: "f", text: "Where exactly does the class meet? In the main building?" },
      { speaker: "Centre staff", voice: "m", text: "No, it's in the kitchen of the annexe — the smaller building behind the car park." },
      { speaker: "Caller",       voice: "f", text: "Great. Do I need to pay today to reserve a place?" },
      { speaker: "Centre staff", voice: "m", text: "A fifty-pound deposit is enough for now. The rest is due on the first evening." },
    ],
    items: [
      {
        prompt: "1. The caller chooses the Thai course because",
        options: [
          { label: "A", text: "it is the cheapest." },
          { label: "B", text: "she already cooks Italian food." },
          { label: "C", text: "it has the best teacher." },
        ],
        answer: "B",
      },
      {
        prompt: "2. The course fee includes",
        options: [
          { label: "A", text: "ingredients but not a recipe book." },
          { label: "B", text: "ingredients and a recipe book." },
          { label: "C", text: "the recipe book only." },
        ],
        answer: "A",
      },
      {
        prompt: "3. Students must bring",
        options: [
          { label: "A", text: "their own knives." },
          { label: "B", text: "a chopping board." },
          { label: "C", text: "an apron." },
        ],
        answer: "C",
      },
      {
        prompt: "4. The class meets in",
        options: [
          { label: "A", text: "the main building." },
          { label: "B", text: "the annexe behind the car park." },
          { label: "C", text: "a hired hall in the town." },
        ],
        answer: "B",
      },
      {
        prompt: "5. To reserve a place, the caller must pay",
        options: [
          { label: "A", text: "the full £120 today." },
          { label: "B", text: "a £50 deposit today." },
          { label: "C", text: "nothing until the first lesson." },
        ],
        answer: "B",
      },
    ],
    analysis:
`1 → B. "I cook Italian at home already" — that's the reason for choosing Thai.
2 → A. "Includes all ingredients but not the recipe book."
3 → C. "Just an apron."
4 → B. "The kitchen of the annexe — the smaller building behind the car park."
5 → B. "A fifty-pound deposit is enough for now."

Tip: Distractors in Section 1 multiple choice often paraphrase wrong details from the same conversation. Listen for the WHY, not just the keyword.`,
  },

  // ═════════════════════ SECTION 2 ═════════════════════

  {
    id: "ls2-001",
    section: 2,
    title: "Tour of Greendale Country Park",
    context: "A guide gives visitors an introduction to a country park and points out features on a map.",
    qType: "map_labelling",
    instructions: "Label the map. Choose the correct letter A–G for each location.",
    audioLines: [
      { speaker: "Guide", voice: "f", text:
`Welcome, everyone, to Greendale Country Park. I'm Helen, your guide for this morning. Before we set off, let me orient you to the map you've been given.

We're standing right now at the visitor centre, which is at the bottom of the map, just inside the main entrance. From here, the path splits in two. If you take the path to the right, you'll quickly come to the children's playground — that's the open area in the bottom-right corner with the climbing equipment.

If, instead, you follow the wider path straight north from the visitor centre, you'll pass the picnic area on your left. It has covered tables and is the perfect spot for lunch later on.

Continuing north past the picnic area, the path divides again. The right fork leads to the lake, which sits in the centre of the park and is a popular spot for birdwatching. The left fork leads to the wildflower meadow, on the far west side, where you can see butterflies in summer.

Finally, in the north-east corner, accessible only by the small path that runs along the eastern edge of the lake, you'll find the bird hide — a small wooden building where you can sit quietly and watch the water birds without disturbing them. Please use this carefully and keep your voices low.`
      },
    ],
    options: [
      { label: "A", text: "north-east corner, beyond the lake" },
      { label: "B", text: "centre of the park" },
      { label: "C", text: "far west side" },
      { label: "D", text: "north of the visitor centre, to the left of the path" },
      { label: "E", text: "bottom-right corner, near the entrance" },
      { label: "F", text: "south-west corner" },
      { label: "G", text: "directly east of the visitor centre" },
    ],
    visual:
`            N
            ↑
   ┌──────────────────────────────────────┐
   │                              ╔═══╗   │
   │  wildflower         lake     ║   ║   │ ← (5) bird hide?
   │  meadow             ◯◯◯      ╚═══╝   │
   │                                       │
   │  ─── path ─────── path divides ──┐   │
   │                                  │   │
   │              (3) lake area       │   │
   │                                  │   │
   │  ┌───────────┐                   │   │
   │  │ picnic    │ ← (2) picnic area │   │
   │  │ tables    │                   │   │
   │  └───────────┘                   │   │
   │                                  │   │
   │              path                │   │
   │       ┌──────────┐               │   │
   │       │ visitor  │   playground  │   │
   │       │ centre   │   ◊◊◊◊◊       │   │
   │       └──────────┘               │   │
   │   main entrance ↓                    │
   └──────────────────────────────────────┘`,
    items: [
      { prompt: "1. Children's playground",  answer: "E" },
      { prompt: "2. Picnic area",            answer: "D" },
      { prompt: "3. Lake (birdwatching)",    answer: "B" },
      { prompt: "4. Wildflower meadow",      answer: "C" },
      { prompt: "5. Bird hide",              answer: "A" },
    ],
    analysis:
`1 → E. "Bottom-right corner with the climbing equipment."
2 → D. "Picnic area on your LEFT" as you walk north from the visitor centre.
3 → B. "Sits in the CENTRE of the park."
4 → C. "Far WEST side."
5 → A. "North-east corner, accessible only by the small path that runs along the eastern edge of the lake."

Tip: For map questions, ALWAYS find the starting point first ("we're standing here") and follow direction words (left/right/north/across from). Underline them as you listen.`,
  },

  {
    id: "ls2-002",
    section: 2,
    title: "Volunteer Opportunities at the Hospital",
    context: "A volunteer coordinator describes four roles available at a local hospital.",
    qType: "matching",
    instructions: "What does the coordinator say about each volunteer role? Match each role (1–5) with the correct description (A–G).",
    audioLines: [
      { speaker: "Coordinator", voice: "m", text:
`Good evening, and thank you for your interest in volunteering at St Margaret's Hospital. Tonight I'd like to outline five different roles you can apply for, and what's distinctive about each.

The first is the Ward Visitor. Ward visitors spend two afternoons a week chatting with patients who don't have many family visitors. The role requires no formal training — we provide a short introduction session — and is by far the most popular with our retired volunteers.

Our second role is the Reception Greeter. Greeters direct visitors who come into the main entrance, often a bit lost or anxious. We particularly need volunteers who speak a second language, as the hospital serves a very international community.

Third is the Garden Helper. Volunteers maintain the small therapy gardens used by patients recovering from surgery. This is a physically demanding role and only suitable for those comfortable with several hours outside in all weathers.

Our fourth role is the Driver. Drivers use their own car to bring elderly outpatients to and from appointments. We reimburse fuel costs but cannot pay a wage. A clean driving licence held for at least three years is essential.

Finally, we have the Library Trolley role. Volunteers wheel a small trolley of books and magazines around the wards twice a week. It's a good role for anyone who wants regular contact with patients but prefers shorter conversations than the Ward Visitor role involves.`
      },
    ],
    options: [
      { label: "A", text: "Most suitable for retired volunteers" },
      { label: "B", text: "Particularly needs second-language speakers" },
      { label: "C", text: "Physically demanding, outdoors in all weather" },
      { label: "D", text: "Requires a clean driving licence of 3+ years" },
      { label: "E", text: "Good for those who prefer shorter conversations" },
      { label: "F", text: "Only available at weekends" },
      { label: "G", text: "Requires a degree in psychology" },
    ],
    items: [
      { prompt: "1. Ward Visitor",      answer: "A" },
      { prompt: "2. Reception Greeter", answer: "B" },
      { prompt: "3. Garden Helper",     answer: "C" },
      { prompt: "4. Driver",            answer: "D" },
      { prompt: "5. Library Trolley",   answer: "E" },
    ],
    analysis:
`1 → A. "Most popular with our retired volunteers."
2 → B. "We particularly need volunteers who speak a second language."
3 → C. "Physically demanding role, several hours outside in all weathers."
4 → D. "A clean driving licence held for at least three years is essential."
5 → E. "Prefers shorter conversations than the Ward Visitor role."

F and G are distractors that aren't mentioned. The trick with Section 2 matching is that all five descriptions appear in roughly the order the speaker mentions them — but the answer choices are scrambled.`,
  },

  // ═════════════════════ SECTION 3 ═════════════════════

  {
    id: "ls3-001",
    section: 3,
    title: "Discussing a Geography Field Trip",
    context: "Two students, Maya and Tom, talk to their tutor about an upcoming geography field trip.",
    qType: "multiple_choice",
    instructions: "For each question, choose the correct letter A, B or C.",
    audioLines: [
      { speaker: "Tutor", voice: "f", text: "Right, Maya and Tom — the field trip to the coast. Have you decided which area you'd like to focus on?" },
      { speaker: "Maya",  voice: "f", text: "We were thinking about coastal erosion at first, but there's so much existing research on it that we'd struggle to add anything new." },
      { speaker: "Tom",   voice: "m", text: "So we're now planning to study the impact of small-scale tourism on the dune ecosystems instead." },
      { speaker: "Tutor", voice: "f", text: "Interesting. And how are you planning to gather your data?" },
      { speaker: "Maya",  voice: "f", text: "We'd originally planned interviews with local visitors, but we worried about people refusing or being rushed. So we're going to do systematic observations from a fixed point instead — counting people, noting where they walk, that sort of thing." },
      { speaker: "Tutor", voice: "f", text: "That's much more reliable. What about the practical side — accommodation?" },
      { speaker: "Tom",   voice: "m", text: "There's a youth hostel about three kilometres away, which is reasonably priced." },
      { speaker: "Maya",  voice: "f", text: "But we'd lose half the morning getting to and from the dunes. We've been offered space in the warden's caravan at the reserve itself, and I think we should take it." },
      { speaker: "Tom",   voice: "m", text: "It is more practical, even though it'll be cramped. Agreed." },
      { speaker: "Tutor", voice: "f", text: "Sensible. Now, your biggest worry — what is it?" },
      { speaker: "Maya",  voice: "f", text: "Honestly, the weather. Heavy rain would make the observation work almost impossible." },
      { speaker: "Tom",   voice: "m", text: "I'm more worried about whether the visitor numbers will be high enough to give us meaningful data. Late September is past peak season." },
      { speaker: "Tutor", voice: "f", text: "Both are fair concerns. Bring the back-up plan — interviews — in case Tom's worry materialises." },
    ],
    items: [
      {
        prompt: "1. The students decided NOT to study coastal erosion because",
        options: [
          { label: "A", text: "it is too dangerous to research." },
          { label: "B", text: "there is already a lot of existing research on it." },
          { label: "C", text: "their tutor advised against it." },
        ],
        answer: "B",
      },
      {
        prompt: "2. Their main method of collecting data will now be",
        options: [
          { label: "A", text: "interviews with visitors." },
          { label: "B", text: "questionnaires given to local residents." },
          { label: "C", text: "systematic observations from a fixed point." },
        ],
        answer: "C",
      },
      {
        prompt: "3. They have decided to stay in",
        options: [
          { label: "A", text: "the youth hostel three kilometres away." },
          { label: "B", text: "the warden's caravan at the reserve." },
          { label: "C", text: "a local bed-and-breakfast." },
        ],
        answer: "B",
      },
      {
        prompt: "4. Maya's biggest worry is",
        options: [
          { label: "A", text: "the weather." },
          { label: "B", text: "low visitor numbers." },
          { label: "C", text: "running out of money." },
        ],
        answer: "A",
      },
      {
        prompt: "5. Tom is most worried about",
        options: [
          { label: "A", text: "the weather." },
          { label: "B", text: "low visitor numbers." },
          { label: "C", text: "their accommodation." },
        ],
        answer: "B",
      },
    ],
    analysis:
`1 → B. "There's so much existing research on it."
2 → C. "Systematic observations from a fixed point."
3 → B. Maya: "I think we should take it." Tom: "Agreed."
4 → A. Maya: "Honestly, the weather."
5 → B. Tom: "I'm more worried about whether the visitor numbers will be high enough."

Tip: In Section 3, distractors often appear EARLIER in the conversation as plans the students change their minds about. The answer is what they FINALLY decide, not what they first considered.`,
  },

  {
    id: "ls3-002",
    section: 3,
    title: "Planning a Group Presentation",
    context: "Three students — Liam, Priya and Chen — discuss roles for their psychology presentation.",
    qType: "matching",
    instructions: "Match each student (1–3) with the responsibility (A–E) they will take. Two responsibilities are not used.",
    audioLines: [
      { speaker: "Liam",  voice: "m", text: "Right, we've got two weeks until the presentation. Let's split the work properly this time." },
      { speaker: "Priya", voice: "f", text: "I think we should each take a clear role, otherwise we'll keep doubling up." },
      { speaker: "Chen",  voice: "m", text: "Agreed. There are basically four jobs: the literature search, the actual slide design, the introduction script, and the practice runs to time it." },
      { speaker: "Liam",  voice: "m", text: "I'll do the literature search. I enjoy that part and I've got access to a couple of databases the others don't." },
      { speaker: "Priya", voice: "f", text: "Good. I'd be happy doing the slides — I did graphic design at sixth form, and I've got the software at home." },
      { speaker: "Chen",  voice: "m", text: "Then I'll write the introduction script. My English is the strongest in the group for that kind of thing." },
      { speaker: "Liam",  voice: "m", text: "And practising the timing? We need someone to keep us strict on the twelve-minute limit." },
      { speaker: "Priya", voice: "f", text: "Liam, you should do that. You're the most punctual of us!" },
      { speaker: "Chen",  voice: "m", text: "Wait — Liam will already be busy with the literature search. I can do timing as well." },
      { speaker: "Liam",  voice: "m", text: "Honestly, I'm fine with both. Chen, the introduction script will be enough on top of your other modules." },
      { speaker: "Chen",  voice: "m", text: "Fair enough. Then we're set." },
    ],
    options: [
      { label: "A", text: "Designing the slides" },
      { label: "B", text: "Writing the introduction script" },
      { label: "C", text: "Doing the literature search and timing the practice runs" },
      { label: "D", text: "Recording the presentation video" },
      { label: "E", text: "Booking the room" },
    ],
    items: [
      { prompt: "1. Liam",  answer: "C" },
      { prompt: "2. Priya", answer: "A" },
      { prompt: "3. Chen",  answer: "B" },
    ],
    analysis:
`1 → C. Liam takes both the literature search AND the timing ("I'm fine with both"). Note how the group nearly assigns timing to Chen — that's the trap.
2 → A. Priya takes the slides ("I did graphic design at sixth form").
3 → B. Chen writes the introduction script ("My English is the strongest for that").

D and E are distractors not discussed at all. The Section 3 challenge is that group plans CHANGE during the conversation — always wait for the final decision.`,
  },

  // ═════════════════════ SECTION 4 ═════════════════════

  {
    id: "ls4-001",
    section: 4,
    title: "Lecture: The Decline of the Honeybee",
    context: "A university lecture on the causes of honeybee population decline and possible solutions.",
    qType: "sentence_completion",
    instructions: "Complete each sentence using words from the recording.",
    wordLimit: "Write NO MORE THAN TWO WORDS for each answer.",
    audioLines: [
      { speaker: "Lecturer", voice: "f", text:
`Good morning. Today's lecture explores one of the more troubling environmental stories of the past two decades: the decline of the honeybee. As you'll see, no single explanation suffices — instead, we are dealing with what biologists now call a "stress stack."

Let's begin with the most direct threat: the parasite Varroa destructor. This tiny mite, originally confined to Asian bee species, spread to European honeybees in the late twentieth century. It feeds on the bees' fat bodies and, crucially, transmits a wide range of viruses. Colonies untreated for varroa rarely survive more than two or three winters.

A second factor is pesticide exposure, particularly to a class of chemicals called neonicotinoids. These were marketed in the nineteen-nineties as safer for bees than older sprays, but careful studies have since shown that even sub-lethal doses impair the bees' ability to navigate. A worker that cannot find its way back to the hive is, of course, lost to the colony.

The third factor is habitat loss. Industrial-scale agriculture has replaced the diverse mixture of wild plants on which bees depend with vast monocultures of a single crop. After flowering, these fields offer almost no nutrition for the rest of the season. Modern bees are, in effect, starving in the middle of summer.

Finally, climate change is causing the timing of flower blooms and bee emergence to drift apart. If a colony emerges before its main food source is in bloom, there's nothing for the workers to bring home. This is called phenological mismatch.

What can be done? Restrictions on neonicotinoid use have already produced measurable improvements in some regions of Europe. Beekeepers are also breeding strains of bees with natural resistance to varroa. And, perhaps surprisingly, urban areas are emerging as unexpected refuges: the variety of flowers in city parks and gardens often exceeds what is found in the surrounding countryside.`
      },
    ],
    items: [
      { prompt: "1. Biologists now describe the multiple causes of honeybee decline as a ___.",       answer: "stress stack" },
      { prompt: "2. The varroa mite originally infected only ___ bee species.",                       answer: "Asian" },
      { prompt: "3. Even sub-lethal doses of neonicotinoids impair the bees' ability to ___.",        answer: "navigate" },
      { prompt: "4. Modern monoculture farms leave bees with no food for most of the ___.",            answer: "season" },
      { prompt: "5. Climate change can cause a ___ between flower blooms and bee emergence.",         answer: "phenological mismatch", acceptable: ["mismatch"] },
      { prompt: "6. Surprisingly, ___ areas are now important refuges for bees.",                      answer: "urban" },
    ],
    analysis:
`1 → stress stack. "What biologists now call a 'stress stack'."
2 → Asian. "Originally confined to Asian bee species."
3 → navigate. "Impair the bees' ability to navigate."
4 → season. "Almost no nutrition for the rest of the season."
5 → phenological mismatch. "This is called phenological mismatch."
6 → urban. "Urban areas are emerging as unexpected refuges."

Tip: Section 4 lectures move fast and you only hear them once. Skim the questions BEFORE the audio plays so you know what words to listen for.`,
  },

  {
    id: "ls4-002",
    section: 4,
    title: "Lecture: How Memory Forms",
    context: "A neuroscience lecture explaining the stages of human memory formation.",
    qType: "short_answer",
    instructions: "Answer the questions using words from the recording.",
    wordLimit: "Write NO MORE THAN THREE WORDS for each answer.",
    audioLines: [
      { speaker: "Lecturer", voice: "m", text:
`Today we'll examine how human memory forms — a process that, although familiar in everyday life, is biologically remarkable.

Memory formation begins with a stage called encoding. When you experience an event, sensory information is processed in the relevant cortical areas — visual data in the back of the brain, sounds on the side, and so on — and converted into a neural pattern. The hippocampus, a small structure deep in the temporal lobe, then binds these scattered patterns into a single, retrievable memory.

Encoded memories are not yet permanent. They must undergo a second stage called consolidation, during which the brain replays the new patterns and strengthens the connections between the neurons involved. Most consolidation happens during sleep, particularly during the deep, slow-wave stages of non-REM sleep. Subjects deprived of deep sleep show striking impairments in their ability to recall what they learned the day before.

The third stage is retrieval — the process of bringing a stored memory back into conscious awareness. Retrieval is not a simple replay; each time we recall a memory, we partially rewrite it. This means that memories can drift over time, and that vivid certainty is a poor guide to accuracy. Eyewitness testimony, for example, is now treated with much greater caution by courts than it was fifty years ago.

Finally, not all memories are alike. Episodic memory — the memory of specific events — depends heavily on the hippocampus and is the first kind to suffer in conditions like Alzheimer's disease. Procedural memory, by contrast — the memory of how to ride a bicycle or play a piano piece — is stored in different brain regions and remains intact long after episodic memory has begun to fail.`
      },
    ],
    items: [
      { prompt: "1. What is the FIRST stage of memory formation called?",
        answer: "encoding" },
      { prompt: "2. Which brain structure binds scattered patterns into one memory?",
        answer: "hippocampus", acceptable: ["the hippocampus"] },
      { prompt: "3. During which type of sleep does most consolidation happen?",
        answer: "non-REM sleep", acceptable: ["non-REM", "slow-wave sleep", "deep sleep"] },
      { prompt: "4. What happens to a memory each time we retrieve it?",
        answer: "we rewrite it", acceptable: ["partially rewrite it", "we partially rewrite it", "rewrite"] },
      { prompt: "5. Which kind of memory is the FIRST to suffer in Alzheimer's disease?",
        answer: "episodic memory", acceptable: ["episodic"] },
      { prompt: "6. Which kind of memory remains intact after episodic memory fails?",
        answer: "procedural memory", acceptable: ["procedural"] },
    ],
    analysis:
`1 → encoding. "A stage called encoding."
2 → hippocampus. "The hippocampus… binds these scattered patterns."
3 → non-REM sleep. "Particularly during the deep, slow-wave stages of non-REM sleep."
4 → we rewrite it. "Each time we recall a memory, we partially rewrite it."
5 → episodic memory. "The first kind to suffer in conditions like Alzheimer's disease."
6 → procedural memory. "Remains intact long after episodic memory has begun to fail."

Tip: For short-answer questions, use the EXACT words from the audio if possible. Avoid paraphrasing — markers want to see the actual term you heard.`,
  },
  // ═════════════════════ SECTION 1 — round 2 ═════════════════════

  {
    id: "ls1-003",
    section: 1,
    title: "Joining a Sports Centre",
    context: "A woman calls the Westgate Sports Centre to enquire about membership.",
    qType: "sentence_completion",
    instructions: "Complete each sentence using words from the recording.",
    wordLimit: "Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.",
    audioLines: [
      { speaker: "Receptionist", voice: "m", text: "Westgate Sports Centre, good morning. How can I help?" },
      { speaker: "Caller",       voice: "f", text: "Hi, I'd like to ask about your membership options." },
      { speaker: "Receptionist", voice: "m", text: "Of course. We have three categories: standard, family and student." },
      { speaker: "Caller",       voice: "f", text: "I'd be the only one using it, so standard, I think." },
      { speaker: "Receptionist", voice: "m", text: "That's forty-five pounds a month, with no joining fee at the moment." },
      { speaker: "Caller",       voice: "f", text: "And what's included?" },
      { speaker: "Receptionist", voice: "m", text: "Unlimited use of the gym, swimming pool and all classes — except yoga, which is an extra five pounds per session." },
      { speaker: "Caller",       voice: "f", text: "What are your opening hours?" },
      { speaker: "Receptionist", voice: "m", text: "Six a.m. to ten p.m. on weekdays, and eight to eight at the weekend." },
      { speaker: "Caller",       voice: "f", text: "Do I need to book the pool in advance?" },
      { speaker: "Receptionist", voice: "m", text: "Only the swimming lanes between five and seven in the evening — that's our peak time." },
      { speaker: "Caller",       voice: "f", text: "Anything I need to bring on my first visit?" },
      { speaker: "Receptionist", voice: "m", text: "Just photo ID and a bank card to set up the direct debit. We'll give you a tour and a free fitness assessment." },
    ],
    items: [
      { prompt: "1. Standard membership costs £___ a month.",                                    answer: "45", acceptable: ["forty-five", "forty five"] },
      { prompt: "2. There is currently no ___ to pay.",                                          answer: "joining fee" },
      { prompt: "3. Yoga classes cost an extra £___ per session.",                                answer: "5", acceptable: ["five"] },
      { prompt: "4. The pool only requires booking between 5 and 7 p.m. because it is the ___.", answer: "peak time" },
      { prompt: "5. On the first visit, members receive a tour and a free ___.",                  answer: "fitness assessment" },
    ],
    analysis:
`1 → 45. "Forty-five pounds a month."
2 → joining fee. "No joining fee at the moment."
3 → 5. "An extra five pounds per session."
4 → peak time. "That's our peak time."
5 → fitness assessment. "We'll give you a tour and a free fitness assessment."

Tip: Section 1 sentence completion mirrors form completion — the words you write must match the recording EXACTLY. "Joining cost" or "fitness check" would be marked wrong.`,
  },

  {
    id: "ls1-004",
    section: 1,
    title: "Lost Property at the Train Station",
    context: "A man reports a lost bag at a city train station's lost property office.",
    qType: "form_completion",
    instructions: "Complete the lost property form below.",
    wordLimit: "Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.",
    audioLines: [
      { speaker: "Officer", voice: "f", text: "Lost property, good afternoon. How can I help?" },
      { speaker: "Caller",  voice: "m", text: "Hi, I think I left my bag on the train this morning." },
      { speaker: "Officer", voice: "f", text: "Let me take some details. Your full name, please?" },
      { speaker: "Caller",  voice: "m", text: "James Whitman — W-H-I-T-M-A-N." },
      { speaker: "Officer", voice: "f", text: "Thank you. Which train were you on?" },
      { speaker: "Caller",  voice: "m", text: "The eight forty-five from Bristol to Reading." },
      { speaker: "Officer", voice: "f", text: "Could you describe the bag?" },
      { speaker: "Caller",  voice: "m", text: "It's a small backpack, dark green, with a leather front pocket." },
      { speaker: "Officer", voice: "f", text: "Any contents that would help identify it?" },
      { speaker: "Caller",  voice: "m", text: "Yes — there's a laptop inside, a notebook, and a brown wallet." },
      { speaker: "Officer", voice: "f", text: "Where do you think you left it?" },
      { speaker: "Caller",  voice: "m", text: "Probably on the luggage rack above the seat." },
      { speaker: "Officer", voice: "f", text: "I'll log it. Best contact number?" },
      { speaker: "Caller",  voice: "m", text: "Oh-seven-three-three-one, six-double-two, four-eight-seven." },
      { speaker: "Officer", voice: "f", text: "Thank you. We'll text you within forty-eight hours." },
    ],
    visual:
`╔═══════════ LOST PROPERTY REPORT ═══════════╗
║ Owner name:        James (1) ___           ║
║ Train:             (2) ___ from Bristol     ║
║ Item:              Dark green backpack     ║
║                    with leather (3) ___     ║
║ Contents:          Laptop, notebook,        ║
║                    (4) ___                  ║
║ Likely location:   On the (5) ___           ║
║ Phone:             07331 622 487            ║
╚════════════════════════════════════════════╝`,
    items: [
      { prompt: "1. Owner surname",                  answer: "Whitman" },
      { prompt: "2. Train departure time",           answer: "8:45", acceptable: ["08:45", "0845", "8.45", "eight forty-five"] },
      { prompt: "3. Front pocket material",          answer: "leather" },
      { prompt: "4. Other contents (one item)",      answer: "brown wallet", acceptable: ["wallet"] },
      { prompt: "5. Likely location of bag",         answer: "luggage rack" },
    ],
    analysis:
`1 → Whitman. "W-H-I-T-M-A-N."
2 → 8:45. "The eight forty-five from Bristol."
3 → leather. "A leather front pocket."
4 → brown wallet. The brown wallet is the most distinctive item.
5 → luggage rack. "Probably on the luggage rack above the seat."

Tip: For times in IELTS, both "8.45" and "8:45" are accepted — but "845" without punctuation usually isn't.`,
  },

  {
    id: "ls1-005",
    section: 1,
    title: "Renting a Holiday Cottage",
    context: "A woman enquires about renting a cottage for a family holiday.",
    qType: "multiple_choice",
    instructions: "For each question, choose the correct letter A, B or C.",
    audioLines: [
      { speaker: "Owner",  voice: "m", text: "Hello, Coastal Cottages, this is Mark." },
      { speaker: "Caller", voice: "f", text: "Hi, I'm looking at your website. The Lighthouse Cottage — is it still free in August?" },
      { speaker: "Owner",  voice: "m", text: "Let me check… yes, the second week of August is open. Sleeps six." },
      { speaker: "Caller", voice: "f", text: "Perfect. We're four adults and two children. Is the beach close?" },
      { speaker: "Owner",  voice: "m", text: "It's a five-minute walk down a private path." },
      { speaker: "Caller", voice: "f", text: "Lovely. And what about parking?" },
      { speaker: "Owner",  voice: "m", text: "There's space for two cars right outside the cottage." },
      { speaker: "Caller", voice: "f", text: "And the price?" },
      { speaker: "Owner",  voice: "m", text: "August is peak season, so it's nine hundred pounds for the week. Off-peak it's six-fifty." },
      { speaker: "Caller", voice: "f", text: "We'll bring our dog. Is that OK?" },
      { speaker: "Owner",  voice: "m", text: "Yes, but with a sixty-pound cleaning supplement — small dogs only, please." },
      { speaker: "Caller", voice: "f", text: "She's a spaniel, so that's fine. What's the booking process?" },
      { speaker: "Owner",  voice: "m", text: "A twenty-five percent deposit secures the dates; the balance is due four weeks before arrival." },
    ],
    items: [
      {
        prompt: "1. The cottage will be free during",
        options: [
          { label: "A", text: "the first week of August." },
          { label: "B", text: "the second week of August." },
          { label: "C", text: "the whole of August." },
        ],
        answer: "B",
      },
      {
        prompt: "2. To get to the beach, guests",
        options: [
          { label: "A", text: "drive five minutes." },
          { label: "B", text: "walk five minutes along a private path." },
          { label: "C", text: "take a shuttle bus." },
        ],
        answer: "B",
      },
      {
        prompt: "3. The cost in peak season is",
        options: [
          { label: "A", text: "£650 per week." },
          { label: "B", text: "£900 per week." },
          { label: "C", text: "£1,200 per week." },
        ],
        answer: "B",
      },
      {
        prompt: "4. The pet supplement is",
        options: [
          { label: "A", text: "free of charge." },
          { label: "B", text: "£60 cleaning fee, small dogs only." },
          { label: "C", text: "£100 deposit, any dog." },
        ],
        answer: "B",
      },
      {
        prompt: "5. To secure the booking, the caller must pay",
        options: [
          { label: "A", text: "the full balance now." },
          { label: "B", text: "a 25% deposit." },
          { label: "C", text: "a 50% deposit." },
        ],
        answer: "B",
      },
    ],
    analysis:
`1 → B. "The second week of August is open."
2 → B. "A five-minute walk down a private path."
3 → B. "Nine hundred pounds for the week" in peak August (£650 is OFF-peak — that's the trap).
4 → B. "Sixty-pound cleaning supplement — small dogs only."
5 → B. "A twenty-five percent deposit secures the dates."

Tip: Numbers used as distractors (£650 here) are nearly always real numbers from the recording, just attached to the wrong thing.`,
  },

  // ═════════════════════ SECTION 2 — round 2 ═════════════════════

  {
    id: "ls2-003",
    section: 2,
    title: "Welcome Talk at a Summer Festival",
    context: "A festival organiser welcomes visitors and gives practical information.",
    qType: "multiple_choice",
    instructions: "For each question, choose the correct letter A, B or C.",
    audioLines: [
      { speaker: "Organiser", voice: "f", text:
`Welcome, everyone, to the Riverside Summer Festival. Before you head in, a few important pieces of information.

The festival runs until ten p.m. tonight, but the main music stage closes at nine, so plan accordingly. There are three stages: the main stage near the entrance, the acoustic stage by the river, and the family stage in the orchard.

Food is available at sixteen different stalls, all using compostable packaging — please use the green bins. We've doubled the number of bins this year following last year's complaints about litter.

If you need first aid, the medical tent is clearly marked with a red cross and is located behind the information point — not near the entrance, as it was last year.

Cash machines are available at the main entrance, but most stalls now accept card payments, including contactless. Please note that there is no longer a wristband-based payment system; this caused too many complaints last year and has been dropped.

Finally, the lost children's point is at the family stage. We strongly recommend taking a photo of your child this morning so you can show staff exactly what they're wearing.`
      },
    ],
    items: [
      {
        prompt: "1. The main music stage closes at",
        options: [
          { label: "A", text: "8 p.m." },
          { label: "B", text: "9 p.m." },
          { label: "C", text: "10 p.m." },
        ],
        answer: "B",
      },
      {
        prompt: "2. The number of rubbish bins this year is",
        options: [
          { label: "A", text: "the same as last year." },
          { label: "B", text: "double last year." },
          { label: "C", text: "fewer than last year." },
        ],
        answer: "B",
      },
      {
        prompt: "3. The medical tent is located",
        options: [
          { label: "A", text: "near the main entrance." },
          { label: "B", text: "behind the information point." },
          { label: "C", text: "next to the family stage." },
        ],
        answer: "B",
      },
      {
        prompt: "4. The wristband payment system",
        options: [
          { label: "A", text: "is being used again this year." },
          { label: "B", text: "has been dropped this year." },
          { label: "C", text: "is only used at food stalls." },
        ],
        answer: "B",
      },
      {
        prompt: "5. Parents are advised to",
        options: [
          { label: "A", text: "register their children at the entrance." },
          { label: "B", text: "give children a wristband with their phone number." },
          { label: "C", text: "take a photo of their child this morning." },
        ],
        answer: "C",
      },
    ],
    analysis:
`1 → B. "The main music stage closes at nine."
2 → B. "We've doubled the number of bins this year."
3 → B. "Located behind the information point — not near the entrance, as it was last year."
4 → B. "This caused too many complaints last year and has been dropped."
5 → C. "Take a photo of your child this morning."

Tip: Section 2 monologues frequently contrast THIS year vs LAST year. The current arrangement is always the answer — but the previous arrangement is offered as a distractor.`,
  },

  {
    id: "ls2-004",
    section: 2,
    title: "Tour of a New Office Building",
    context: "A facilities manager guides new staff around the company's new offices.",
    qType: "map_labelling",
    instructions: "Label the floor plan. Choose the correct letter A–G for each location.",
    audioLines: [
      { speaker: "Manager", voice: "m", text:
`Welcome to your new workplace. Let me walk you through the ground floor before you find your desks.

We've just come in through the main entrance, in the south of the building. The reception desk is directly in front of us. To your right, immediately as you enter, is the security office — that's where you'll collect your access cards on day one.

If you walk straight ahead past reception, you'll come to the central staircase. The lifts are tucked behind it, on the north wall. To the left of the staircase is the staff café, which seats around fifty and runs from seven a.m. to four p.m.

To the right of the staircase, opposite the café, is the meeting suite — three meeting rooms together. These can be booked through the intranet up to two weeks in advance.

In the south-east corner of the building, accessed by its own corridor from reception, is the wellness room — a quiet space for prayer, breastfeeding, or simply taking a break. Please respect the silence rule there.

Finally, the post room is in the south-west corner, again with its own corridor from reception. Internal post is delivered twice daily.`
      },
    ],
    options: [
      { label: "A", text: "north wall, behind the staircase" },
      { label: "B", text: "south-east corner" },
      { label: "C", text: "south-west corner" },
      { label: "D", text: "right of the staircase, opposite the café" },
      { label: "E", text: "left of the staircase" },
      { label: "F", text: "directly to the right of the entrance" },
      { label: "G", text: "north-east corner" },
    ],
    visual:
`            N
            ↑
   ┌──────────────────────────────────────┐
   │  ╔═════╗               (2) lifts?    │
   │  ║     ║                              │
   │  ║     ║  ─── stairs ───              │
   │  ╚═════╝                              │
   │                                       │
   │  (4) café?       (5) meetings?        │
   │                                       │
   │  ─── reception desk ───               │
   │                                       │
   │  ┌────────┐  ENTRANCE  ┌──────────┐   │
   │  │ post   │     ↓      │ security │   │
   │  │ room   │            │ office   │   │
   │  │ (1) ?  │            │ (3) ?    │   │
   │  └────────┘            └──────────┘   │
   │                          wellness     │
   │                          room         │
   │                          (6) ?        │
   └──────────────────────────────────────┘`,
    items: [
      { prompt: "1. Post room",        answer: "C" },
      { prompt: "2. Lifts",            answer: "A" },
      { prompt: "3. Security office",  answer: "F" },
      { prompt: "4. Staff café",       answer: "E" },
      { prompt: "5. Meeting suite",    answer: "D" },
      { prompt: "6. Wellness room",    answer: "B" },
    ],
    analysis:
`1 → C. "Post room is in the south-west corner."
2 → A. "The lifts are tucked behind it, on the north wall."
3 → F. "To your right, immediately as you enter, is the security office."
4 → E. "To the left of the staircase is the staff café."
5 → D. "To the right of the staircase, opposite the café, is the meeting suite."
6 → B. "South-east corner of the building."

Tip: For map labelling, anchor yourself with the speaker ("we've just come in through the main entrance"). Track every "left/right/opposite/behind" relative to that anchor.`,
  },

  {
    id: "ls2-005",
    section: 2,
    title: "Information About Local Recycling",
    context: "A council officer gives residents information about new recycling rules.",
    qType: "form_completion",
    instructions: "Complete the notes below.",
    wordLimit: "Write NO MORE THAN TWO WORDS for each answer.",
    audioLines: [
      { speaker: "Officer", voice: "f", text:
`Good evening, everyone. Tonight I'd like to explain the changes to our recycling collection that begin next month.

The biggest change is that we are switching to a four-bin system. Currently we have two bins; from the first of June, you'll have four. The black bin is for general waste, collected fortnightly. The green bin is for garden waste, collected weekly through summer and monthly in winter. The blue bin is for paper and cardboard. And the new fourth bin, brown, is exclusively for food waste, collected every week throughout the year.

The most common mistake we see is residents putting plastic bags in the food waste bin. Please use the compostable liners we'll deliver free of charge to every household. Plastic contaminates the whole load and means it has to go to landfill.

If you need extra bins — for example, large families — please apply through the council website. There is no charge for the first additional bin per household, but a fee of fifteen pounds applies for each one after that.

Finally, missed collections should be reported within twenty-four hours through our new app. Phone reports take much longer to process.`
      },
    ],
    visual:
`╔══════════ NEW RECYCLING NOTES ══════════╗
║ Start date:       (1) ___ June           ║
║ Number of bins:   (2) ___                ║
║ Food waste bin:   colour (3) ___,        ║
║                   collected weekly       ║
║ Common mistake:   putting (4) ___        ║
║                   in food waste bin      ║
║ Extra bins:       free for the (5) ___,  ║
║                   then £15 each          ║
║ Missed pickups:   report via the (6) ___ ║
╚═════════════════════════════════════════╝`,
    items: [
      { prompt: "1. Date the new system starts",                                   answer: "1st", acceptable: ["first", "1", "1 of"] },
      { prompt: "2. Total number of bins",                                          answer: "4", acceptable: ["four"] },
      { prompt: "3. Colour of the food waste bin",                                  answer: "brown" },
      { prompt: "4. Item that contaminates food waste",                             answer: "plastic bags", acceptable: ["plastic"] },
      { prompt: "5. Free additional bin per household — how many?",                 answer: "first", acceptable: ["1st", "first one"] },
      { prompt: "6. How to report missed collections",                              answer: "app", acceptable: ["new app", "council app"] },
    ],
    analysis:
`1 → 1st. "From the first of June."
2 → 4. "Switching to a four-bin system."
3 → brown. "The new fourth bin, brown, is exclusively for food waste."
4 → plastic bags. "The most common mistake we see is residents putting plastic bags in the food waste bin."
5 → first. "No charge for the FIRST additional bin per household."
6 → app. "Through our new app."

Tip: Section 2 form completion often hides answers in long sentences. Underline the QUESTION key word (e.g. "common mistake") and listen for paraphrases ("the most common mistake we see is…").`,
  },

  // ═════════════════════ SECTION 3 — round 2 ═════════════════════

  {
    id: "ls3-003",
    section: 3,
    title: "Reviewing a Research Methodology",
    context: "A tutor reviews a draft research proposal with two students.",
    qType: "sentence_completion",
    instructions: "Complete the sentences using words from the recording.",
    wordLimit: "Write NO MORE THAN THREE WORDS for each answer.",
    audioLines: [
      { speaker: "Tutor",   voice: "f", text: "I've read your draft proposal. The research question is excellent — clear, narrow, and answerable." },
      { speaker: "Sara",    voice: "f", text: "Thank you. We did struggle to narrow it down." },
      { speaker: "Tutor",   voice: "f", text: "The methodology section, however, needs more detail. You say you'll interview small business owners, but you don't say how many." },
      { speaker: "Marcus",  voice: "m", text: "We were thinking around fifteen, to keep it manageable." },
      { speaker: "Tutor",   voice: "f", text: "That's a reasonable number, but be sure to justify it in the proposal — refer to data saturation, the standard reason." },
      { speaker: "Sara",    voice: "f", text: "And how should we recruit them? We were going to ask the local Chamber of Commerce for contacts." },
      { speaker: "Tutor",   voice: "f", text: "That's fine, but be aware that gives you a non-random sample. Make this a stated limitation." },
      { speaker: "Marcus",  voice: "m", text: "What about the interview length? We thought thirty minutes." },
      { speaker: "Tutor",   voice: "f", text: "I'd push for forty-five — owners often need ten minutes to warm up before saying anything genuinely useful." },
      { speaker: "Sara",    voice: "f", text: "And recording? Audio only, or should we film?" },
      { speaker: "Tutor",   voice: "f", text: "Audio is sufficient. Filming makes participants self-conscious and produces little extra value for this kind of qualitative work." },
      { speaker: "Marcus",  voice: "m", text: "What about data analysis?" },
      { speaker: "Tutor",   voice: "f", text: "Use thematic analysis. It's well documented and appropriate for an undergraduate project." },
    ],
    items: [
      { prompt: "1. The tutor described the research question as ___, narrow and answerable.", answer: "clear" },
      { prompt: "2. The number of interviews must be justified by referring to ___.",            answer: "data saturation", acceptable: ["saturation"] },
      { prompt: "3. Recruiting via the Chamber of Commerce will give a ___ sample.",             answer: "non-random", acceptable: ["non random"] },
      { prompt: "4. The recommended interview length is ___ minutes.",                            answer: "45", acceptable: ["forty-five", "forty five"] },
      { prompt: "5. The tutor recommends recording in ___ only.",                                answer: "audio" },
      { prompt: "6. The recommended method of data analysis is ___.",                             answer: "thematic analysis", acceptable: ["thematic"] },
    ],
    analysis:
`1 → clear. "Clear, narrow, and answerable."
2 → data saturation. "Refer to data saturation, the standard reason."
3 → non-random. "That gives you a non-random sample."
4 → 45. "I'd push for forty-five."
5 → audio. "Audio is sufficient."
6 → thematic analysis. "Use thematic analysis."

Tip: In Section 3, the tutor often UPGRADES or CHANGES a student's plan. Listen for the FINAL recommendation, not the student's first suggestion ("thirty minutes" is a distractor here).`,
  },

  {
    id: "ls3-004",
    section: 3,
    title: "Choosing a Dissertation Topic",
    context: "A supervisor helps a student narrow down possible dissertation topics.",
    qType: "matching",
    instructions: "What does the supervisor say about each possible topic? Match each topic (1–5) with the correct comment (A–G).",
    audioLines: [
      { speaker: "Supervisor", voice: "m", text:
`Right, Hannah, let's go through the five topics you've shortlisted.

Your first idea — corporate social responsibility in fashion — is genuinely interesting, but the literature is enormous. You'd spend most of your year just reviewing what others have said. I'd avoid it for that reason.

Your second — sustainability in food packaging — has plenty of recent data, and you have personal contacts at a packaging firm who could give you interview access. That's the strongest practical advantage of any topic on your list.

The third — gender pay gap in start-ups — is currently very fashionable, but I'm worried that finding willing companies to share salary data will be very difficult. Access is your main risk here.

Your fourth — consumer attitudes to second-hand clothing — is fine in itself, but very similar to the dissertation Lara wrote last year. Originality may be marked down.

Finally, the fifth — remote working and team cohesion — is probably the safest bet. The methodology is well-established, the data is easy to gather through surveys, and your previous coursework already touches on the area.`
      },
    ],
    options: [
      { label: "A", text: "Excellent practical access via personal contacts" },
      { label: "B", text: "Avoid: literature is too vast" },
      { label: "C", text: "The safest topic, builds on previous coursework" },
      { label: "D", text: "Risk that originality will be marked down" },
      { label: "E", text: "Companies likely to refuse access to data" },
      { label: "F", text: "Requires expensive specialist software" },
      { label: "G", text: "Cannot be completed within the time available" },
    ],
    items: [
      { prompt: "1. CSR in fashion",                  answer: "B" },
      { prompt: "2. Sustainability in food packaging", answer: "A" },
      { prompt: "3. Gender pay gap in start-ups",     answer: "E" },
      { prompt: "4. Second-hand clothing",            answer: "D" },
      { prompt: "5. Remote working and team cohesion", answer: "C" },
    ],
    analysis:
`1 → B. "I'd avoid it for that reason" (the enormous literature).
2 → A. "Personal contacts at a packaging firm who could give you interview access."
3 → E. "Finding willing companies to share salary data will be very difficult."
4 → D. "Originality may be marked down."
5 → C. "Probably the safest bet… builds on previous coursework."

F and G are distractors. The challenge: every option in matching tasks SOUNDS plausible, so don't rely on intuition — wait for the explicit reason.`,
  },

  {
    id: "ls3-005",
    section: 3,
    title: "Feedback on a Lab Report",
    context: "A chemistry tutor gives two students feedback on their lab report.",
    qType: "multiple_choice",
    instructions: "For each question, choose the correct letter A, B or C.",
    audioLines: [
      { speaker: "Tutor",  voice: "f", text: "Overall, this report is a solid first attempt. Let me focus on what to improve." },
      { speaker: "Aiden",  voice: "m", text: "Was the introduction OK?" },
      { speaker: "Tutor",  voice: "f", text: "The introduction was strong, actually — well referenced and concise. The weakness is in the methodology: it reads like a recipe rather than scientific prose." },
      { speaker: "Priya",  voice: "f", text: "We did copy from the lab manual." },
      { speaker: "Tutor",  voice: "f", text: "I could tell. Rewrite it in your own words, in past passive — 'the solution was heated to 80 degrees', not 'heat the solution'." },
      { speaker: "Aiden",  voice: "m", text: "And the results section?" },
      { speaker: "Tutor",  voice: "f", text: "Your tables are clear, but you have no error bars on the graph. That's a serious omission in any quantitative work." },
      { speaker: "Priya",  voice: "f", text: "What about the discussion?" },
      { speaker: "Tutor",  voice: "f", text: "The discussion is your weakest section. You describe what happened but you don't explain why. Reference the underlying chemistry — bond energies, in this case." },
      { speaker: "Aiden",  voice: "m", text: "And the references?" },
      { speaker: "Tutor",  voice: "f", text: "Mostly fine, but two of your sources are popular blogs rather than peer-reviewed journals. Replace those with proper academic sources." },
    ],
    items: [
      {
        prompt: "1. The tutor's strongest praise was for the",
        options: [
          { label: "A", text: "introduction." },
          { label: "B", text: "methodology." },
          { label: "C", text: "discussion." },
        ],
        answer: "A",
      },
      {
        prompt: "2. The methodology should be rewritten",
        options: [
          { label: "A", text: "as a numbered list." },
          { label: "B", text: "in past passive in the students' own words." },
          { label: "C", text: "exactly as in the lab manual." },
        ],
        answer: "B",
      },
      {
        prompt: "3. The serious omission in the results section is",
        options: [
          { label: "A", text: "missing tables." },
          { label: "B", text: "no error bars on the graph." },
          { label: "C", text: "the wrong units." },
        ],
        answer: "B",
      },
      {
        prompt: "4. The weakest section of the report is the",
        options: [
          { label: "A", text: "introduction." },
          { label: "B", text: "results." },
          { label: "C", text: "discussion." },
        ],
        answer: "C",
      },
      {
        prompt: "5. Two of the references should be replaced because they are",
        options: [
          { label: "A", text: "popular blogs, not academic sources." },
          { label: "B", text: "out of date." },
          { label: "C", text: "in the wrong format." },
        ],
        answer: "A",
      },
    ],
    analysis:
`1 → A. "The introduction was strong, actually."
2 → B. "Rewrite it in your own words, in past passive."
3 → B. "You have no error bars on the graph."
4 → C. "The discussion is your weakest section."
5 → A. "Two of your sources are popular blogs rather than peer-reviewed journals."

Tip: Section 3 multiple choice often tests SUPERLATIVES (strongest, weakest, most serious). Listen specifically for the comparison.`,
  },

  // ═════════════════════ SECTION 4 — round 2 ═════════════════════

  {
    id: "ls4-003",
    section: 4,
    title: "Lecture: The Origins of Coffee",
    context: "A history lecture on how coffee spread around the world.",
    qType: "sentence_completion",
    instructions: "Complete each sentence using words from the recording.",
    wordLimit: "Write NO MORE THAN TWO WORDS for each answer.",
    audioLines: [
      { speaker: "Lecturer", voice: "m", text:
`Today's lecture traces the journey of coffee from its origins in north-east Africa to becoming the world's second-most-traded commodity, after oil.

Coffee's earliest documented use is in fifteenth-century Yemen, where Sufi monks drank an infusion to stay awake during long nightly prayers. The plant itself, Coffea arabica, originates from the highlands of Ethiopia, where it had been chewed for centuries — but Yemen was the first place to brew it.

For much of the sixteenth century, coffee remained almost exclusively a drink of the Arab and Ottoman worlds. The first European exposure came through Venetian merchants in the sixteen-hundreds. Coffeehouses opened in major European cities, and by sixteen-seventy London alone had more than three thousand of them. They became famous as places of intellectual exchange, sometimes called penny universities — the price of admission was the cost of a single cup.

The next stage was global cultivation. The Dutch were the first Europeans to grow coffee outside the Arab world, planting it in Indonesia in the late seventeenth century. The French and Portuguese soon followed, taking the plant to the Caribbean and Brazil respectively. By eighteen hundred, Brazil had emerged as the dominant world producer — a position it has retained, with only brief interruptions, ever since.

The economic and social impact has been immense, but so has the environmental cost. Modern monoculture coffee farming has been linked to deforestation in producer countries and to vulnerability to disease — most notably the coffee leaf rust epidemics of the past decade.`
      },
    ],
    items: [
      { prompt: "1. Coffee was first brewed by Sufi monks in fifteenth-century ___.",            answer: "Yemen" },
      { prompt: "2. The Coffea arabica plant originates from the highlands of ___.",              answer: "Ethiopia" },
      { prompt: "3. By 1670, London had over ___ coffeehouses.",                                  answer: "3000", acceptable: ["three thousand", "3,000"] },
      { prompt: "4. London coffeehouses were nicknamed ___ universities.",                        answer: "penny" },
      { prompt: "5. The first Europeans to grow coffee abroad were the ___.",                     answer: "Dutch" },
      { prompt: "6. Modern monoculture farming has been linked to ___ in producer countries.",    answer: "deforestation" },
    ],
    analysis:
`1 → Yemen. "Yemen was the first place to brew it."
2 → Ethiopia. "Originates from the highlands of Ethiopia."
3 → 3000. "By 1670 London alone had more than three thousand of them."
4 → penny. "Sometimes called penny universities."
5 → Dutch. "The Dutch were the first Europeans to grow coffee outside the Arab world."
6 → deforestation. "Linked to deforestation in producer countries."

Tip: Section 4 lectures often follow a chronological structure. Use the dates as anchors to track where you are in the lecture.`,
  },

  {
    id: "ls4-004",
    section: 4,
    title: "Lecture: How Volcanoes Form",
    context: "A geology lecture on the formation and types of volcanoes.",
    qType: "matching",
    instructions: "Match each volcano type (1–4) with its main characteristic (A–F).",
    audioLines: [
      { speaker: "Lecturer", voice: "f", text:
`In today's lecture I'll introduce the four main types of volcano. Each forms under different conditions and produces eruptions of very different character.

The first type is the shield volcano. These are formed by relatively gentle eruptions of low-viscosity basaltic lava, which flows over long distances before cooling. The result is a wide, gently sloping mountain — Mauna Loa in Hawaii is the textbook example. Shield volcanoes are the largest single mountains on Earth by volume, though they don't look dramatic.

The second type is the stratovolcano, also called a composite volcano. These are the steep, conical mountains most people picture when they hear the word — Fuji, Vesuvius, St Helens. They are built up of alternating layers of lava and ash from highly explosive eruptions. They're far smaller than shield volcanoes but vastly more dangerous to nearby populations.

The third type is the cinder cone. These are small, short-lived volcanoes — often less than three hundred metres high. They form quickly, sometimes in just months, from gas-rich eruptions that fragment lava into small pieces. The 1943 Paricutin volcano in Mexico, which erupted in a farmer's cornfield and grew over four hundred metres in a year, is the classic example.

The fourth type is the caldera. These are not really mountains at all but huge depressions left when a magma chamber empties and the ground above it collapses. The Yellowstone caldera in the United States is over fifty kilometres across. When such systems erupt, the consequences can be global, as happened with Toba seventy-four thousand years ago.`
      },
    ],
    options: [
      { label: "A", text: "Wide, gently sloping; gentle basaltic eruptions" },
      { label: "B", text: "Steep cone built from layers of lava and ash" },
      { label: "C", text: "Small, short-lived; forms in months from gas-rich eruptions" },
      { label: "D", text: "Huge depression left by collapsed magma chamber" },
      { label: "E", text: "Underwater volcano found at mid-ocean ridges" },
      { label: "F", text: "Always erupts on a regular yearly schedule" },
    ],
    items: [
      { prompt: "1. Shield volcano",       answer: "A" },
      { prompt: "2. Stratovolcano",        answer: "B" },
      { prompt: "3. Cinder cone",          answer: "C" },
      { prompt: "4. Caldera",              answer: "D" },
    ],
    analysis:
`1 → A. "Wide, gently sloping mountain… gentle eruptions of low-viscosity basaltic lava."
2 → B. "Built up of alternating layers of lava and ash from highly explosive eruptions."
3 → C. "Form quickly, sometimes in just months, from gas-rich eruptions."
4 → D. "Huge depressions left when a magma chamber empties and the ground above it collapses."

E and F are distractors. Tip: For Section 4 matching, the speaker usually presents items in the SAME ORDER as the question numbers, but the description options are scrambled.`,
  },

  {
    id: "ls4-005",
    section: 4,
    title: "Lecture: The Psychology of Habit Formation",
    context: "A psychology lecture explaining how habits form and how to change them.",
    qType: "short_answer",
    instructions: "Answer the questions using words from the recording.",
    wordLimit: "Write NO MORE THAN THREE WORDS for each answer.",
    audioLines: [
      { speaker: "Lecturer", voice: "m", text:
`Today's lecture explores the psychology of habit — how routines become automatic, and why they're so difficult to change.

Habits are not, strictly speaking, decisions. They're patterns of behaviour that, with sufficient repetition, become semi-automatic — performed with very little conscious thought. The psychologist William James, writing in eighteen ninety, called habit "the enormous flywheel of society." It is also, neuroscience now tells us, encoded in a deep brain structure called the basal ganglia, which sits beneath the cortex and operates largely outside our conscious awareness.

Modern research, much of it building on the work of Charles Duhigg, identifies what is called the habit loop: cue, routine, reward. A cue triggers the behaviour — perhaps the smell of coffee in the morning. The routine is the behaviour itself — drinking the coffee. The reward is the satisfaction that follows — the caffeine boost — which the brain learns to anticipate. With each repetition, the link between cue and routine strengthens.

Why are habits so hard to break? Two main reasons. Firstly, the underlying neural pattern in the basal ganglia does not disappear, even when the behaviour stops. It is, as researchers say, dormant — and easily reactivated by the original cue. Secondly, willpower, which is what we typically use to resist habits, has been shown in numerous studies to be a finite resource that depletes over the course of the day.

The most successful approach to behaviour change, supported by recent evidence, is therefore not to attack the routine directly but to identify and modify the cue. If the smell of coffee is the cue, removing the coffee maker from your kitchen is more effective than relying on willpower. This is sometimes called environmental design, and it underpins many modern behaviour-change programmes.`
      },
    ],
    items: [
      { prompt: "1. What did William James call habit?",
        answer: "the enormous flywheel", acceptable: ["enormous flywheel", "the flywheel of society", "flywheel of society"] },
      { prompt: "2. Which brain structure encodes habits?",
        answer: "basal ganglia", acceptable: ["the basal ganglia"] },
      { prompt: "3. What are the THREE parts of the habit loop?",
        answer: "cue routine reward", acceptable: ["cue, routine, reward", "cue routine and reward", "cue, routine and reward"] },
      { prompt: "4. The brain learns to anticipate the ___.",
        answer: "reward" },
      { prompt: "5. Willpower is described as a ___ that depletes during the day.",
        answer: "finite resource" },
      { prompt: "6. The most effective behaviour change approach is to modify the ___.",
        answer: "cue", acceptable: ["the cue"] },
    ],
    analysis:
`1 → the enormous flywheel. "William James… called habit 'the enormous flywheel of society.'"
2 → basal ganglia. "Encoded in a deep brain structure called the basal ganglia."
3 → cue routine reward. "The habit loop: cue, routine, reward."
4 → reward. "The brain learns to anticipate."
5 → finite resource. "Willpower… has been shown to be a finite resource."
6 → cue. "Identify and modify the cue."

Tip: Section 4 short-answer questions reward EXACT vocabulary from the lecture. Aim to write the words you literally heard, not synonyms.`,
  },

];

// ─────────────────── Scoring ───────────────────

import { answerMatches, strictAnswer } from "./answer-matching";

export function scoreListeningItem(item: LItem, ua: string | string[] | null): boolean {
  if (ua === null || ua === undefined) return false;
  const expected = item.answer;
  if (Array.isArray(expected)) {
    if (!Array.isArray(ua)) return false;
    if (ua.length !== expected.length) return false;
    // Multi-select labels — strict compare is appropriate (these are option labels).
    const a = [...ua].map(strictAnswer).sort();
    const b = [...expected].map(strictAnswer).sort();
    return a.every((v, i) => v === b[i]);
  }
  const userText = Array.isArray(ua) ? ua.join(",") : ua;
  if (typeof userText !== "string" || !userText.trim()) return false;
  const candidates = [expected, ...(item.acceptable ?? [])];
  return answerMatches(userText, candidates);
}

export function getTestsBySection(section: LSection): LSkillTest[] {
  return LISTENING_SKILL_TESTS.filter(t => t.section === section);
}
