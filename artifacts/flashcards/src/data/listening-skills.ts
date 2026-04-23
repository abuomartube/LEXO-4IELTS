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
];

// ─────────────────── Scoring ───────────────────

function norm(s: string): string {
  return s.trim().toLowerCase().replace(/[.,!?;:"']/g, "").replace(/\s+/g, " ");
}

export function scoreListeningItem(item: LItem, ua: string | string[] | null): boolean {
  if (ua === null || ua === undefined) return false;
  const expected = item.answer;
  if (Array.isArray(expected)) {
    if (!Array.isArray(ua)) return false;
    if (ua.length !== expected.length) return false;
    const a = [...ua].map(norm).sort();
    const b = [...expected].map(norm).sort();
    return a.every((v, i) => v === b[i]);
  }
  const userText = Array.isArray(ua) ? ua.join(",") : ua;
  const u = norm(userText);
  if (u === norm(expected)) return true;
  if (item.acceptable) return item.acceptable.some(a => norm(a) === u);
  return false;
}

export function getTestsBySection(section: LSection): LSkillTest[] {
  return LISTENING_SKILL_TESTS.filter(t => t.section === section);
}
