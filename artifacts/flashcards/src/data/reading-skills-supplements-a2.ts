import type { SkillExercise } from "./reading-skills";

/**
 * A2 (Elementary) supplement exercises for the IELTS Reading Skills practice.
 * Each (question_type × A2) bucket is topped up to ≥15 items overall when
 * combined with the existing exercises in `reading-skills.ts`.
 *
 * Style guide (mirrors existing A2 entries):
 *   • Short passages (50–90 words), simple grammar, high-frequency vocab.
 *   • Everyday topics: school, food, family, weather, animals, hobbies, transport, city life.
 *   • Concise but informative `analysis` blocks.
 */

const supplements: SkillExercise[] = [
  // ───────────────────── 1. Skimming (need +10) ─────────────────────
  {
    id: "sk-a2-101",
    type: "skimming",
    level: "A2",
    title: "My Dog Buddy",
    topic: "Pets · Daily life",
    passage:
`I have a dog. His name is Buddy. He is brown and white. Buddy is three years old. Every morning, I take him to the park. He runs and jumps with other dogs. After lunch, Buddy sleeps on the sofa. In the evening, my dad walks him again. Buddy is a happy and friendly dog.`,
    instructions: "Skim the passage and choose the BEST answer.",
    options: [
      { label: "A", text: "How to train a dog" },
      { label: "B", text: "A boy and his pet dog" },
      { label: "C", text: "Different kinds of dogs" },
      { label: "D", text: "Why dogs need exercise" },
    ],
    items: [{ prompt: "What is the passage mainly about?", answer: "B" }],
    analysis:
`B is correct. The whole text describes the writer's pet dog Buddy and his daily life.

A: training is never mentioned.
C: only Buddy is described, not different kinds.
D: exercise is shown as part of the routine, not the main topic.`,
  },
  {
    id: "sk-a2-102",
    type: "skimming",
    level: "A2",
    title: "My Town",
    topic: "City · Daily life",
    passage:
`I live in a small town. There is one big park near my house. In the centre, there is a market where people buy fresh food. The town has two schools and one library. The bus station is next to the supermarket. My town is quiet and friendly.`,
    instructions: "Skim the passage and choose the BEST answer.",
    options: [
      { label: "A", text: "Bus times in a town" },
      { label: "B", text: "A description of a small town" },
      { label: "C", text: "How to open a market" },
      { label: "D", text: "Schools in big cities" },
    ],
    items: [{ prompt: "What is the passage mainly about?", answer: "B" }],
    analysis:
`B is correct. The writer describes the main places (park, market, schools, library, bus station) of one small town.

A: bus times are not given.
C: opening a market is not discussed.
D: the text is about a SMALL town, not big cities.`,
  },
  {
    id: "sk-a2-103",
    type: "skimming",
    level: "A2",
    title: "Breakfast at Home",
    topic: "Food · Family",
    passage:
`In my family we eat breakfast at 7 o'clock. My mum makes tea. My dad makes eggs and toast. My little brother drinks milk. I eat cereal with fruit. We sit at the kitchen table and talk about our day. Breakfast is my favourite meal.`,
    instructions: "Skim the passage and choose the BEST answer.",
    options: [
      { label: "A", text: "How to make eggs and toast" },
      { label: "B", text: "Family breakfast at home" },
      { label: "C", text: "Different kinds of cereal" },
      { label: "D", text: "Why milk is good for you" },
    ],
    items: [{ prompt: "What is the passage mainly about?", answer: "B" }],
    analysis:
`B is correct. The text shows the family's breakfast routine and what each person eats.

A: making eggs is mentioned but not explained.
C: only one cereal (with fruit) is named.
D: the health value of milk is not discussed.`,
  },
  {
    id: "sk-a2-104",
    type: "skimming",
    level: "A2",
    title: "A Rainy Day",
    topic: "Weather · Free time",
    passage:
`It is Sunday and it is raining. I cannot go to the park today. I stay at home with my sister. We play board games and watch a film. My mum makes hot chocolate for us. The rain stops in the evening, but it is too late to go out. We have a nice day inside.`,
    instructions: "Skim the passage and choose the BEST answer.",
    options: [
      { label: "A", text: "A fun day at home in the rain" },
      { label: "B", text: "How to play board games" },
      { label: "C", text: "The history of hot chocolate" },
      { label: "D", text: "Sports for rainy days" },
    ],
    items: [{ prompt: "Best title for the passage:", answer: "A" }],
    analysis:
`A is correct. The text describes one rainy Sunday spent indoors with family.

B: games are mentioned but not explained.
C: hot chocolate is just a drink, not the topic.
D: no sports are mentioned.`,
  },
  {
    id: "sk-a2-105",
    type: "skimming",
    level: "A2",
    title: "My Best Friend",
    topic: "People · Friendship",
    passage:
`My best friend is Sara. We are both 11 years old. We go to the same school and we sit together in class. After school, we do our homework at her house. On Saturdays, we ride our bikes in the park. Sara is funny and kind. I am very lucky to have her as my friend.`,
    instructions: "Skim the passage and choose the BEST answer.",
    options: [
      { label: "A", text: "How to do homework" },
      { label: "B", text: "Riding bikes in the city" },
      { label: "C", text: "A girl and her best friend" },
      { label: "D", text: "School subjects in Year 6" },
    ],
    items: [{ prompt: "What is the main topic?", answer: "C" }],
    analysis:
`C is correct. The whole text is about the writer's friendship with Sara.

A: homework is one activity, not the topic.
B: bikes are mentioned once.
D: no school subjects are named.`,
  },
  {
    id: "sk-a2-106",
    type: "skimming",
    level: "A2",
    title: "The School Bus",
    topic: "Transport · School",
    passage:
`Every weekday, I take the school bus. It comes to my street at 7:45. I sit at the front with my friend Nora. The bus is yellow and big. There are 30 children on the bus. The driver is kind and he smiles at us. We get to school at 8:15.`,
    instructions: "Skim the passage and choose the BEST answer.",
    options: [
      { label: "A", text: "A trip on the school bus" },
      { label: "B", text: "How to drive a bus" },
      { label: "C", text: "Different colours of buses" },
      { label: "D", text: "School lunch ideas" },
    ],
    items: [{ prompt: "Best title for the passage:", answer: "A" }],
    analysis:
`A is correct. The passage describes the writer's daily school bus journey.

B: driving a bus is not discussed.
C: only yellow is mentioned.
D: lunch is not mentioned at all.`,
  },
  {
    id: "sk-a2-107",
    type: "skimming",
    level: "A2",
    title: "Painting Class",
    topic: "Hobbies · Art",
    passage:
`Every Wednesday I go to a painting class. The class is at 5 o'clock and it lasts one hour. There are six children in my class. The teacher is Miss Anna. She is very nice. Last week we painted flowers. Next week we will paint a cat. I love painting because it is fun and relaxing.`,
    instructions: "Skim the passage and choose the BEST answer.",
    options: [
      { label: "A", text: "A child's weekly painting class" },
      { label: "B", text: "How to paint a cat" },
      { label: "C", text: "Famous painters in history" },
      { label: "D", text: "Buying paint at a shop" },
    ],
    items: [{ prompt: "What is the passage mainly about?", answer: "A" }],
    analysis:
`A is correct. The text describes the writer's regular painting class on Wednesdays.

B: painting a cat is only a future plan.
C: no painters are named.
D: shops and prices are not mentioned.`,
  },
  {
    id: "sk-a2-108",
    type: "skimming",
    level: "A2",
    title: "Animals on a Farm",
    topic: "Animals · Countryside",
    passage:
`My grandfather has a small farm. He has cows, sheep and chickens. The cows give milk every morning. The sheep have soft white wool. The chickens give eggs. My grandfather wakes up early every day to feed all the animals. He works hard, but he likes his life on the farm.`,
    instructions: "Skim the passage and choose the BEST answer.",
    options: [
      { label: "A", text: "How to start a farm" },
      { label: "B", text: "The animals on a small farm" },
      { label: "C", text: "Why milk is good for children" },
      { label: "D", text: "Holidays in the countryside" },
    ],
    items: [{ prompt: "What is the passage mainly about?", answer: "B" }],
    analysis:
`B is correct. The text lists the farm animals and what each one gives.

A: starting a farm is not explained.
C: milk is just one product.
D: no holiday is described.`,
  },
  {
    id: "sk-a2-109",
    type: "skimming",
    level: "A2",
    title: "The Birthday Party",
    topic: "Celebrations · Family",
    passage:
`Yesterday was my sister's birthday. She is now 10 years old. We had a party at home. There were eight friends and a big chocolate cake with ten candles. We played games and danced to music. My sister got many presents. The best one was a new pink bicycle from our parents.`,
    instructions: "Skim the passage and choose the BEST answer.",
    options: [
      { label: "A", text: "How to make a chocolate cake" },
      { label: "B", text: "A girl's tenth birthday party" },
      { label: "C", text: "The best games for children" },
      { label: "D", text: "Buying a bicycle for a child" },
    ],
    items: [{ prompt: "Best title for the passage:", answer: "B" }],
    analysis:
`B is correct. The passage describes one specific event: the sister's tenth birthday party.

A: cake is mentioned but not the recipe.
C: games are listed only briefly.
D: the bicycle is one present, not the topic.`,
  },
  {
    id: "sk-a2-110",
    type: "skimming",
    level: "A2",
    title: "At the Library",
    topic: "Library · Reading",
    passage:
`Our city has a big library near the school. It is open from Monday to Saturday. Children can borrow up to five books for two weeks. There is a quiet room for reading and a small room for story time on Sunday afternoons. I go to the library every week with my mum. I love it.`,
    instructions: "Skim the passage and choose the BEST answer.",
    options: [
      { label: "A", text: "How books are printed" },
      { label: "B", text: "Story time for adults" },
      { label: "C", text: "What you can do at the city library" },
      { label: "D", text: "How to write a children's book" },
    ],
    items: [{ prompt: "What is the passage mainly about?", answer: "C" }],
    analysis:
`C is correct. The passage describes the library's opening days, borrowing rules and rooms.

A: printing is not mentioned.
B: story time is for children, not adults.
D: writing books is not discussed.`,
  },

  // ───────────────────── 2. Scanning (need +15 items) ─────────────────────
  {
    id: "scn-a2-101",
    type: "scanning",
    level: "A2",
    title: "Ben's Daily Routine",
    topic: "Daily life · Routines",
    passage:
`Ben is 14 years old. He lives in London. He wakes up at 6:30 every weekday. School starts at 8:00 and finishes at 3:30. His favourite subject is geography. After school, he plays the guitar for one hour. On Sundays, Ben goes swimming with his cousin Mark.`,
    instructions: "Scan the passage to find each answer. Type ONE word or a number.",
    items: [
      { prompt: "1. How old is Ben?", answer: "14", acceptable: ["14 years old", "fourteen"] },
      { prompt: "2. In which city does Ben live?", answer: "London", acceptable: ["in London"] },
      { prompt: "3. What time does Ben wake up?", answer: "6:30", acceptable: ["6.30", "half past six"] },
      { prompt: "4. What is his favourite subject?", answer: "geography", acceptable: ["Geography"] },
      { prompt: "5. Who does he go swimming with on Sundays?", answer: "Mark", acceptable: ["his cousin", "his cousin Mark", "cousin Mark"] },
    ],
    analysis:
`1. 14 — scan for the number near "old".
2. London — scan for a capital-letter place name.
3. 6:30 — scan for a clock time.
4. geography — scan for the word "favourite".
5. Mark — scan for "Sundays" or "swimming".

Tip: numbers, times and capitalised names jump out of the page when you scan.`,
  },
  {
    id: "scn-a2-102",
    type: "scanning",
    level: "A2",
    title: "The City Zoo",
    topic: "Animals · Places",
    passage:
`The city zoo opens at 9:00 in the morning and closes at 6:00 in the evening. Children under 5 do not pay. A ticket for an adult is 15 dollars. The zoo has more than 200 different animals. The most popular animal is the panda. There is also a small café near the lion area.`,
    instructions: "Scan the passage to find each answer. Type a short answer.",
    items: [
      { prompt: "1. What time does the zoo open?", answer: "9:00", acceptable: ["9.00", "9 o'clock", "9 am", "nine o'clock"] },
      { prompt: "2. How much is an adult ticket?", answer: "15 dollars", acceptable: ["$15", "15", "fifteen dollars"] },
      { prompt: "3. How many animals are there at the zoo?", answer: "200", acceptable: ["more than 200", "over 200", "two hundred"] },
      { prompt: "4. Which animal is the most popular?", answer: "panda", acceptable: ["the panda", "Panda"] },
      { prompt: "5. Near which animal area is the café?", answer: "lion", acceptable: ["the lion area", "lions"] },
    ],
    analysis:
`1. 9:00 — scan for a time.
2. 15 dollars — scan for a money amount.
3. 200 — scan for a large number.
4. panda — scan for "popular".
5. lion — scan for "café".`,
  },
  {
    id: "scn-a2-103",
    type: "scanning",
    level: "A2",
    title: "The New Restaurant",
    topic: "Food · Places",
    passage:
`A new Italian restaurant opened in our street last week. It is called "Bella Roma". The owner is a chef from Naples named Luigi. The restaurant has 20 tables. Pizza costs 9 dollars and pasta costs 8 dollars. The restaurant is open every day except Tuesday.`,
    instructions: "Scan the passage to find each answer. Type a short answer.",
    items: [
      { prompt: "1. What is the name of the restaurant?", answer: "Bella Roma", acceptable: ["bella roma", "\"Bella Roma\""] },
      { prompt: "2. Where is the chef from?", answer: "Naples", acceptable: ["from Naples"] },
      { prompt: "3. How many tables are there?", answer: "20", acceptable: ["twenty", "20 tables"] },
      { prompt: "4. How much is pizza?", answer: "9 dollars", acceptable: ["$9", "9", "nine dollars"] },
      { prompt: "5. On which day is the restaurant closed?", answer: "Tuesday", acceptable: ["on Tuesday", "tuesday", "Tuesdays"] },
    ],
    analysis:
`1. Bella Roma — scan for capital letters and quotation marks.
2. Naples — scan for "from".
3. 20 — scan for a number near "tables".
4. 9 dollars — scan for a money amount near "pizza".
5. Tuesday — scan for "except" or a day of the week.`,
  },

  // ───────────────────── 3. Matching Headings (need +12 items) ─────────────────────
  {
    id: "mh-a2-101",
    type: "matching_headings",
    level: "A2",
    title: "My School",
    topic: "School · Daily life",
    passage:
`[A] My school is a big building near the park. It has three floors. The classrooms are on the first and second floors. The library is on the top floor.

[B] We have many subjects. My favourites are maths and English. I am not very good at music, but I try.

[C] At lunch time we eat in a big room called the canteen. The food is hot and there is always fruit. After lunch we play in the playground.`,
    instructions: "Match each paragraph (A–C) with the correct heading from the list.",
    options: [
      { label: "i",   text: "Lunch and break time" },
      { label: "ii",  text: "The school bus driver" },
      { label: "iii", text: "The school building" },
      { label: "iv",  text: "School trips abroad" },
      { label: "v",   text: "The subjects we study" },
    ],
    items: [
      { prompt: "Paragraph A", answer: "iii" },
      { prompt: "Paragraph B", answer: "v" },
      { prompt: "Paragraph C", answer: "i" },
    ],
    analysis:
`A → iii: a description of the building (floors, classrooms, library).
B → v: a list of subjects.
C → i: lunch and the playground = lunch and break time.

ii (bus driver) and iv (school trips) are distractors not in the text.`,
  },
  {
    id: "mh-a2-102",
    type: "matching_headings",
    level: "A2",
    title: "A Family Holiday",
    topic: "Holidays · Travel",
    passage:
`[A] We left home very early on Saturday morning. We took a train to the coast. The trip was three hours long.

[B] Our hotel was small but clean. It had a swimming pool and a garden. Our room was on the third floor.

[C] Every day we went to the beach. We swam in the sea and built sandcastles. In the evening, we ate fish in a small restaurant.`,
    instructions: "Match each paragraph (A–C) with the correct heading from the list.",
    options: [
      { label: "i",   text: "Where we stayed" },
      { label: "ii",  text: "Going to the airport" },
      { label: "iii", text: "Activities at the seaside" },
      { label: "iv",  text: "Travelling by train" },
      { label: "v",   text: "Cooking on holiday" },
    ],
    items: [
      { prompt: "Paragraph A", answer: "iv" },
      { prompt: "Paragraph B", answer: "i" },
      { prompt: "Paragraph C", answer: "iii" },
    ],
    analysis:
`A → iv: the family takes a train.
B → i: a description of the hotel they stayed in.
C → iii: things they did at the beach.

ii (airport) and v (cooking) are distractors.`,
  },
  {
    id: "mh-a2-103",
    type: "matching_headings",
    level: "A2",
    title: "Our New Puppy",
    topic: "Pets · Family",
    passage:
`[A] Last month we got a new puppy. He is a small brown dog and his name is Coco.

[B] In the morning, Coco eats his food and then he goes for a short walk. In the afternoon he sleeps in the garden.

[C] All my friends love to play with Coco. He is very friendly. He likes to run after a small ball.`,
    instructions: "Match each paragraph (A–C) with the correct heading from the list.",
    options: [
      { label: "i",   text: "Going to the vet" },
      { label: "ii",  text: "Coco and our friends" },
      { label: "iii", text: "Choosing a name" },
      { label: "iv",  text: "Coco's daily routine" },
      { label: "v",   text: "Bringing the puppy home" },
    ],
    items: [
      { prompt: "Paragraph A", answer: "v" },
      { prompt: "Paragraph B", answer: "iv" },
      { prompt: "Paragraph C", answer: "ii" },
    ],
    analysis:
`A → v: the family gets a new puppy ("Last month we got…").
B → iv: morning and afternoon routine.
C → ii: friends play with Coco.

i (vet) and iii (choosing a name) are distractors.`,
  },
  {
    id: "mh-a2-104",
    type: "matching_headings",
    level: "A2",
    title: "Tom's Hobbies",
    topic: "People · Hobbies",
    passage:
`[A] Tom is 10 years old. He goes to a primary school in his town. He has a little sister and a big dog.

[B] Tom plays the piano. He started two years ago. He practises every day for 30 minutes.

[C] Tom also plays football in his school team. They train on Mondays and they have a match every Saturday morning.`,
    instructions: "Match each paragraph (A–C) with the correct heading from the list.",
    options: [
      { label: "i",   text: "Tom's football team" },
      { label: "ii",  text: "Tom's holiday plans" },
      { label: "iii", text: "About Tom" },
      { label: "iv",  text: "Music lessons" },
      { label: "v",   text: "Tom's favourite food" },
    ],
    items: [
      { prompt: "Paragraph A", answer: "iii" },
      { prompt: "Paragraph B", answer: "iv" },
      { prompt: "Paragraph C", answer: "i" },
    ],
    analysis:
`A → iii: general personal facts about Tom.
B → iv: Tom learns and practises the piano.
C → i: Tom's football team activities.

ii (holidays) and v (food) are distractors.`,
  },

  // ───────────────────── 4. Matching Information (need +11 items) ─────────────────────
  {
    id: "mi-a2-101",
    type: "matching_information",
    level: "A2",
    title: "Three Children and Their Schools",
    topic: "School · People",
    passage:
`[A] Lina is from Spain. She goes to a small school with only 60 students. She walks to school in 10 minutes.

[B] Yuki lives in Japan. Her school has 800 students. She takes a bus to school every morning.

[C] Adam is from Egypt. His school is near the sea. He loves his English teacher because she is very kind.`,
    instructions: "Which paragraph (A, B or C) contains the following information?",
    options: [
      { label: "A", text: "Lina" },
      { label: "B", text: "Yuki" },
      { label: "C", text: "Adam" },
    ],
    items: [
      { prompt: "1. A student who goes to school by bus.", answer: "B" },
      { prompt: "2. A student whose school is near the sea.", answer: "C" },
      { prompt: "3. A student from a school with very few students.", answer: "A" },
      { prompt: "4. A student who likes one of their teachers.", answer: "C" },
    ],
    analysis:
`1 → B: "She takes a bus to school every morning."
2 → C: "His school is near the sea."
3 → A: "only 60 students."
4 → C: "She loves her English teacher."`,
  },
  {
    id: "mi-a2-102",
    type: "matching_information",
    level: "A2",
    title: "Three Families at the Park",
    topic: "Free time · Family",
    passage:
`[A] The Smith family goes to the park every Saturday morning. The two children play on the swings while their mother reads a book.

[B] The Garcia family always brings food. They eat sandwiches under a big tree near the lake.

[C] The Patel family comes to the park to walk their dog. The dog runs after a ball for one hour.`,
    instructions: "Which paragraph (A, B or C) contains the following information?",
    options: [
      { label: "A", text: "Smith family" },
      { label: "B", text: "Garcia family" },
      { label: "C", text: "Patel family" },
    ],
    items: [
      { prompt: "1. A family that eats in the park.", answer: "B" },
      { prompt: "2. A family that brings their pet.", answer: "C" },
      { prompt: "3. A family with children who use the swings.", answer: "A" },
      { prompt: "4. A family that sits near water.", answer: "B" },
    ],
    analysis:
`1 → B: "They eat sandwiches…"
2 → C: "to walk their dog."
3 → A: "play on the swings."
4 → B: "near the lake."`,
  },
  {
    id: "mi-a2-103",
    type: "matching_information",
    level: "A2",
    title: "Three Workers in the Town",
    topic: "Work · Community",
    passage:
`[A] John is a baker. He starts work at 4 o'clock in the morning. He makes bread, cakes and biscuits.

[B] Maria is a doctor at the small hospital. She works long hours and helps many sick children.

[C] Omar is a bus driver. He drives the number 5 bus from the station to the airport ten times a day.`,
    instructions: "Which paragraph (A, B or C) contains the following information?",
    options: [
      { label: "A", text: "John (baker)" },
      { label: "B", text: "Maria (doctor)" },
      { label: "C", text: "Omar (bus driver)" },
    ],
    items: [
      { prompt: "1. A person whose job starts very early.", answer: "A" },
      { prompt: "2. A person who helps children.", answer: "B" },
      { prompt: "3. A person who drives between two places.", answer: "C" },
      { prompt: "4. A person who makes food.", answer: "A" },
    ],
    analysis:
`1 → A: "starts work at 4 o'clock."
2 → B: "helps many sick children."
3 → C: "from the station to the airport."
4 → A: "makes bread, cakes and biscuits."`,
  },

  // ───────────────────── 5. Matching Features (need +12 items) ─────────────────────
  {
    id: "mf-a2-101",
    type: "matching_features",
    level: "A2",
    title: "Four Friends and Their Sports",
    topic: "Sport · People",
    passage:
`Ali plays tennis every Saturday in the park.

Hana goes swimming three times a week at the city pool.

Pedro plays basketball with the school team.

Lily loves cycling. She rides her bike to school every day.`,
    instructions: "Match each sport with the person who does it.",
    options: [
      { label: "A", text: "Ali" },
      { label: "B", text: "Hana" },
      { label: "C", text: "Pedro" },
      { label: "D", text: "Lily" },
    ],
    items: [
      { prompt: "1. Tennis", answer: "A" },
      { prompt: "2. Swimming", answer: "B" },
      { prompt: "3. Basketball", answer: "C" },
    ],
    analysis:
`Each sport is named once next to its person. Lily (D) does cycling, which is not asked.`,
  },
  {
    id: "mf-a2-102",
    type: "matching_features",
    level: "A2",
    title: "Four Pets in My Class",
    topic: "Pets · School",
    passage:
`Sara has a cat. The cat is white and small.

Karim has a parrot. The parrot can say his name.

Mei has a goldfish in a big bowl.

Ben has a rabbit. The rabbit eats carrots every day.`,
    instructions: "Match each pet with its owner.",
    options: [
      { label: "A", text: "Sara" },
      { label: "B", text: "Karim" },
      { label: "C", text: "Mei" },
      { label: "D", text: "Ben" },
    ],
    items: [
      { prompt: "1. The pet that can speak", answer: "B" },
      { prompt: "2. The pet that lives in water", answer: "C" },
      { prompt: "3. The pet that eats carrots", answer: "D" },
    ],
    analysis:
`1 → B: "The parrot can say his name." Parrots can speak.
2 → C: a goldfish lives in a bowl of water.
3 → D: "The rabbit eats carrots."`,
  },
  {
    id: "mf-a2-103",
    type: "matching_features",
    level: "A2",
    title: "Four Countries and Their Food",
    topic: "Food · Geography",
    passage:
`Italy is famous for pizza and pasta.

Japan is famous for sushi.

Mexico is famous for tacos.

India is famous for curry.`,
    instructions: "Match each food with the country it is famous in.",
    options: [
      { label: "A", text: "Italy" },
      { label: "B", text: "Japan" },
      { label: "C", text: "Mexico" },
      { label: "D", text: "India" },
    ],
    items: [
      { prompt: "1. Sushi", answer: "B" },
      { prompt: "2. Tacos", answer: "C" },
      { prompt: "3. Curry", answer: "D" },
    ],
    analysis:
`Each food is named once with its country. Italy (A) is famous for pizza/pasta, but those are not in the questions.`,
  },
  {
    id: "mf-a2-104",
    type: "matching_features",
    level: "A2",
    title: "Four Teachers at School",
    topic: "School · People",
    passage:
`Mr Jones teaches science. His classroom has many plants.

Miss Park teaches art. There are colourful paintings on her walls.

Mr Lopez teaches sports. He is in the gym every day.

Miss Khan teaches music. She plays the piano in class.`,
    instructions: "Match each subject with the teacher.",
    options: [
      { label: "A", text: "Mr Jones" },
      { label: "B", text: "Miss Park" },
      { label: "C", text: "Mr Lopez" },
      { label: "D", text: "Miss Khan" },
    ],
    items: [
      { prompt: "1. Music", answer: "D" },
      { prompt: "2. Art", answer: "B" },
      { prompt: "3. Sports", answer: "C" },
    ],
    analysis:
`Each teacher is described with their subject in one short sentence. Mr Jones (science) is not asked.`,
  },

  // ───────────────────── 6. Matching Sentence Endings (need +11 items) ─────────────────────
  {
    id: "mse-a2-101",
    type: "matching_sentence_endings",
    level: "A2",
    title: "A Day at the Beach",
    topic: "Free time · Holidays",
    passage:
`Last weekend I went to the beach with my family. The sun was very hot. My brother built a big sandcastle. My sister collected small shells from the sand. My dad swam in the cold water. My mum read a book under a blue umbrella. We stayed until 5 o'clock.`,
    instructions: "Complete each sentence by choosing the correct ending (A–E).",
    options: [
      { label: "A", text: "swam in the cold water." },
      { label: "B", text: "read a book under an umbrella." },
      { label: "C", text: "built a sandcastle." },
      { label: "D", text: "drove the family car." },
      { label: "E", text: "collected shells." },
    ],
    items: [
      { prompt: "1. My brother…", answer: "C" },
      { prompt: "2. My sister…", answer: "E" },
      { prompt: "3. My dad…", answer: "A" },
      { prompt: "4. My mum…", answer: "B" },
    ],
    analysis:
`Each family member's action is in one sentence. D ("drove the family car") is the distractor — never said in the text.`,
  },
  {
    id: "mse-a2-102",
    type: "matching_sentence_endings",
    level: "A2",
    title: "My Favourite Foods",
    topic: "Food · Family",
    passage:
`In my family, everyone has a favourite food. My dad likes spicy curry. My mum prefers fresh salad. My little brother always asks for pizza on Fridays. My grandma cooks rice and chicken every Sunday for the whole family. I like ice cream more than anything else.`,
    instructions: "Complete each sentence by choosing the correct ending (A–E).",
    options: [
      { label: "A", text: "loves ice cream." },
      { label: "B", text: "prefers salad." },
      { label: "C", text: "asks for pizza." },
      { label: "D", text: "drinks coffee in the morning." },
      { label: "E", text: "cooks rice and chicken." },
    ],
    items: [
      { prompt: "1. My mum…", answer: "B" },
      { prompt: "2. My little brother…", answer: "C" },
      { prompt: "3. My grandma…", answer: "E" },
      { prompt: "4. The writer (I)…", answer: "A" },
    ],
    analysis:
`Each family member's preferred food is named once. D ("coffee in the morning") is the distractor — never mentioned.`,
  },
  {
    id: "mse-a2-103",
    type: "matching_sentence_endings",
    level: "A2",
    title: "Things in My Bedroom",
    topic: "Home · Objects",
    passage:
`My bedroom is small but I love it. There is a wooden bed near the window. My desk is next to the bed and I do my homework there. The bookshelf is full of comic books. My old guitar is in the corner. I have a soft white carpet on the floor.`,
    instructions: "Complete each sentence by choosing the correct ending (A–E).",
    options: [
      { label: "A", text: "is full of comic books." },
      { label: "B", text: "is in the corner." },
      { label: "C", text: "is next to the bed." },
      { label: "D", text: "is on the wall." },
      { label: "E", text: "is near the window." },
    ],
    items: [
      { prompt: "1. The bed…", answer: "E" },
      { prompt: "2. The desk…", answer: "C" },
      { prompt: "3. The bookshelf…", answer: "A" },
      { prompt: "4. The guitar…", answer: "B" },
    ],
    analysis:
`Each piece of furniture is described with its location or contents. D ("on the wall") is the distractor — nothing in this passage hangs on the wall.`,
  },

  // ───────────────────── 7. True / False / Not Given (need +10 items) ─────────────────────
  {
    id: "tfng-a2-101",
    type: "true_false_not_given",
    level: "A2",
    title: "Sara's Holiday in Italy",
    topic: "Holidays · Travel",
    passage:
`Last summer Sara went to Italy with her parents. They visited Rome for five days. The weather was very hot. Sara loved the ice cream. They did not go to the beach because Rome is not near the sea. Sara took many photos. Her favourite place was the Colosseum.`,
    instructions: "Decide if each statement is TRUE, FALSE, or NOT GIVEN.",
    items: [
      { prompt: "1. Sara went to Italy with her family.", answer: "TRUE" },
      { prompt: "2. They stayed in Rome for one week.", answer: "FALSE" },
      { prompt: "3. The weather in Rome was cold.", answer: "FALSE" },
      { prompt: "4. Sara bought a small souvenir for her brother.", answer: "NOT GIVEN" },
      { prompt: "5. Sara liked the Colosseum the most.", answer: "TRUE" },
    ],
    analysis:
`1 TRUE: "Sara went to Italy with her parents."
2 FALSE: "five days", not one week.
3 FALSE: "The weather was very hot."
4 NOT GIVEN: a brother and souvenirs are never mentioned.
5 TRUE: "Her favourite place was the Colosseum."`,
  },
  {
    id: "tfng-a2-102",
    type: "true_false_not_given",
    level: "A2",
    title: "The New Bookshop",
    topic: "City · Reading",
    passage:
`A new bookshop opened on our street last month. It is called "Page One". The shop is small but has many different books. The owner is a young woman named Lara. She also sells coffee and biscuits. The shop is closed on Mondays. My mum and I go there every Saturday.`,
    instructions: "Decide if each statement is TRUE, FALSE, or NOT GIVEN.",
    items: [
      { prompt: "1. The bookshop is called \"Page One\".", answer: "TRUE" },
      { prompt: "2. The owner of the shop is a man.", answer: "FALSE" },
      { prompt: "3. You can buy coffee in the bookshop.", answer: "TRUE" },
      { prompt: "4. The bookshop is open every day.", answer: "FALSE" },
      { prompt: "5. The bookshop has more than 1,000 books.", answer: "NOT GIVEN" },
    ],
    analysis:
`1 TRUE: "It is called Page One."
2 FALSE: "a young woman named Lara."
3 TRUE: "She also sells coffee and biscuits."
4 FALSE: "closed on Mondays."
5 NOT GIVEN: the exact number of books is never stated.`,
  },

  // ───────────────────── 8. Multiple Choice (need +8 items) ─────────────────────
  {
    id: "mc-a2-101",
    type: "multiple_choice",
    level: "A2",
    title: "Maria's Pet",
    topic: "Pets · Daily life",
    passage:
`Maria has a small white rabbit. Its name is Snowy. Snowy lives in a cage in the garden. Every morning Maria gives Snowy fresh carrots and water. Snowy likes to jump in the grass when Maria opens the cage.`,
    instructions: "Read the passage and choose the correct answer.",
    options: [
      { label: "A", text: "A black cat" },
      { label: "B", text: "A small dog" },
      { label: "C", text: "A white rabbit" },
      { label: "D", text: "A green parrot" },
    ],
    items: [{ prompt: "What pet does Maria have?", answer: "C" }],
    analysis:
`C is correct. The first sentence says: "Maria has a small white rabbit."

A, B and D describe animals not in the text.`,
  },
  {
    id: "mc-a2-102",
    type: "multiple_choice",
    level: "A2",
    title: "Going to the Cinema",
    topic: "Free time · City",
    passage:
`On Friday evening, John and his sister went to the cinema. The film started at 7 o'clock and finished at 9. They watched a funny film about a dog. After the film, they ate pizza in a small restaurant.`,
    instructions: "Read the passage and choose the correct answer.",
    options: [
      { label: "A", text: "A scary film" },
      { label: "B", text: "A funny film about a dog" },
      { label: "C", text: "A long film about cars" },
      { label: "D", text: "A cartoon for small children" },
    ],
    items: [{ prompt: "What kind of film did they watch?", answer: "B" }],
    analysis:
`B is correct. "They watched a funny film about a dog."

A, C and D are not supported by the passage.`,
  },
  {
    id: "mc-a2-103",
    type: "multiple_choice",
    level: "A2",
    title: "Pablo's Sport",
    topic: "Sport · People",
    passage:
`Pablo is 13 years old. After school every day, he plays basketball with his friends in the school yard. On Saturdays, he plays in a basketball team. His team won the city cup last year.`,
    instructions: "Read the passage and choose the correct answer.",
    options: [
      { label: "A", text: "Football" },
      { label: "B", text: "Tennis" },
      { label: "C", text: "Basketball" },
      { label: "D", text: "Swimming" },
    ],
    items: [{ prompt: "What sport does Pablo play?", answer: "C" }],
    analysis:
`C is correct. The text mentions basketball three times.

A, B and D are never mentioned.`,
  },
  {
    id: "mc-a2-104",
    type: "multiple_choice",
    level: "A2",
    title: "How Tom Goes to School",
    topic: "Transport · School",
    passage:
`Tom lives near his school. He does not take the bus and he does not have a bike. Every morning, his mum walks with him to school. The walk takes 15 minutes. After school, he walks home with his friend Sam.`,
    instructions: "Read the passage and choose the correct answer.",
    options: [
      { label: "A", text: "By bus" },
      { label: "B", text: "By bike" },
      { label: "C", text: "By car" },
      { label: "D", text: "On foot" },
    ],
    items: [{ prompt: "How does Tom get to school?", answer: "D" }],
    analysis:
`D is correct. He walks to school with his mum.

A and B are clearly rejected ("does not take the bus", "does not have a bike"). C (car) is not in the passage.`,
  },
  {
    id: "mc-a2-105",
    type: "multiple_choice",
    level: "A2",
    title: "The Weather Report",
    topic: "Weather · News",
    passage:
`This morning the sky was grey and there was a lot of wind. At 11 o'clock it started to rain. The rain stopped after lunch, but the sky is still grey. Tomorrow will be sunny and warm.`,
    instructions: "Read the passage and choose the correct answer.",
    options: [
      { label: "A", text: "Hot and sunny" },
      { label: "B", text: "Grey, windy and rainy" },
      { label: "C", text: "Cold with snow" },
      { label: "D", text: "Foggy and cool" },
    ],
    items: [{ prompt: "What was the weather like today?", answer: "B" }],
    analysis:
`B is correct. The passage says the sky was grey, there was wind and it rained.

A describes tomorrow. C and D are not mentioned.`,
  },
  {
    id: "mc-a2-106",
    type: "multiple_choice",
    level: "A2",
    title: "Lily's Job",
    topic: "Work · People",
    passage:
`Lily is 25 years old. Every morning she puts on a white coat and goes to the small animal hospital in her town. She loves her job because she helps cats and dogs. She wanted to be a doctor for animals when she was a little girl.`,
    instructions: "Read the passage and choose the correct answer.",
    options: [
      { label: "A", text: "A teacher" },
      { label: "B", text: "A nurse for people" },
      { label: "C", text: "A vet (doctor for animals)" },
      { label: "D", text: "A baker" },
    ],
    items: [{ prompt: "What is Lily's job?", answer: "C" }],
    analysis:
`C is correct. She works at an animal hospital and helps cats and dogs — she is a vet.

A and D are not in the text. B is wrong because she helps animals, not people.`,
  },
  {
    id: "mc-a2-107",
    type: "multiple_choice",
    level: "A2",
    title: "The School Trip",
    topic: "School · Travel",
    passage:
`Next Friday, our class will go on a school trip. We will not go to the museum or the zoo. We are going to a big park in the mountains. Our teacher said we will walk for two hours and then we will have a picnic.`,
    instructions: "Read the passage and choose the correct answer.",
    options: [
      { label: "A", text: "The museum" },
      { label: "B", text: "The zoo" },
      { label: "C", text: "A park in the mountains" },
      { label: "D", text: "The beach" },
    ],
    items: [{ prompt: "Where is the class going?", answer: "C" }],
    analysis:
`C is correct. "We are going to a big park in the mountains."

A and B are clearly rejected. D is not in the text.`,
  },
  {
    id: "mc-a2-108",
    type: "multiple_choice",
    level: "A2",
    title: "A Bad Cold",
    topic: "Health · Daily life",
    passage:
`Yesterday I felt fine, but today I am ill. I have a bad cold. My head hurts and my nose is running. My mum gave me some hot soup and a warm drink. I will stay in bed and read my book today. I cannot go to school.`,
    instructions: "Read the passage and choose the correct answer.",
    options: [
      { label: "A", text: "Go to school as usual" },
      { label: "B", text: "Visit the doctor" },
      { label: "C", text: "Stay in bed and read" },
      { label: "D", text: "Play football outside" },
    ],
    items: [{ prompt: "What will the writer do today?", answer: "C" }],
    analysis:
`C is correct. "I will stay in bed and read my book today."

A is rejected ("I cannot go to school"). B and D are not in the text.`,
  },

  // ───────────────────── 9. List Selection (need +10 items) ─────────────────────
  {
    id: "ls-a2-101",
    type: "list_selection",
    level: "A2",
    title: "Things on My Desk",
    topic: "Objects · Home",
    passage:
`On my desk I have many things. There is a small lamp, three pencils, a green notebook and a glass of water. I do not have a computer on my desk. There is also a photo of my family in a small frame. My phone is in my bag, not on the desk.`,
    instructions: "Which THREE things ARE on the desk? Choose THREE letters.",
    options: [
      { label: "A", text: "a lamp" },
      { label: "B", text: "pencils" },
      { label: "C", text: "a computer" },
      { label: "D", text: "a phone" },
      { label: "E", text: "a photo" },
      { label: "F", text: "a TV" },
    ],
    items: [{ prompt: "Choose THREE items on the desk.", answer: ["A", "B", "E"] }],
    analysis:
`A, B and E are correct (lamp, pencils, photo).

C: "I do not have a computer on my desk."
D: "My phone is in my bag, not on the desk."
F: a TV is never mentioned.`,
  },
  {
    id: "ls-a2-102",
    type: "list_selection",
    level: "A2",
    title: "Animals at the Pet Shop",
    topic: "Animals · Shopping",
    passage:
`Today I went to a pet shop with my mum. The shop sells small animals. We saw rabbits, hamsters, parrots and goldfish. We did not see any dogs. Cats are not sold there either. I wanted to buy a hamster, but my mum said no.`,
    instructions: "Which THREE animals are sold at the pet shop? Choose THREE letters.",
    options: [
      { label: "A", text: "Rabbits" },
      { label: "B", text: "Cats" },
      { label: "C", text: "Hamsters" },
      { label: "D", text: "Parrots" },
      { label: "E", text: "Dogs" },
      { label: "F", text: "Snakes" },
    ],
    items: [{ prompt: "Choose THREE animals on sale.", answer: ["A", "C", "D"] }],
    analysis:
`A, C and D are correct (and goldfish, which is not an option).

B and E are clearly rejected. F (snakes) is not mentioned.`,
  },
  {
    id: "ls-a2-103",
    type: "list_selection",
    level: "A2",
    title: "Saturday Activities",
    topic: "Free time · Family",
    passage:
`On Saturday, my family is very busy. My dad goes to the gym in the morning. My mum cleans the house and also cooks lunch. My brother plays football with his friends. I usually read a book or watch a film. We do not work on Saturdays. We never go shopping on Saturday.`,
    instructions: "Which THREE activities does the family do on Saturday? Choose THREE letters.",
    options: [
      { label: "A", text: "go to the gym" },
      { label: "B", text: "go shopping" },
      { label: "C", text: "clean the house" },
      { label: "D", text: "play football" },
      { label: "E", text: "do their work" },
      { label: "F", text: "go camping" },
    ],
    items: [{ prompt: "Choose THREE activities the family does.", answer: ["A", "C", "D"] }],
    analysis:
`A, C and D are correct.

B and E are clearly rejected. F (camping) is not mentioned.`,
  },
  {
    id: "ls-a2-104",
    type: "list_selection",
    level: "A2",
    title: "What Anna Eats for Breakfast",
    topic: "Food · Daily life",
    passage:
`Anna eats a healthy breakfast every morning. She has bread with cheese, an apple and a glass of milk. She does not drink coffee or tea. She never eats chocolate in the morning. Sometimes she also eats a small bowl of yogurt.`,
    instructions: "Which THREE foods or drinks does Anna usually have at breakfast? Choose THREE letters.",
    options: [
      { label: "A", text: "Bread with cheese" },
      { label: "B", text: "Coffee" },
      { label: "C", text: "An apple" },
      { label: "D", text: "Chocolate" },
      { label: "E", text: "Milk" },
      { label: "F", text: "Pizza" },
    ],
    items: [{ prompt: "Choose THREE items from Anna's breakfast.", answer: ["A", "C", "E"] }],
    analysis:
`A, C and E are correct.

B and D are clearly rejected. F (pizza) is not mentioned.`,
  },
  {
    id: "ls-a2-105",
    type: "list_selection",
    level: "A2",
    title: "Things in My Hotel Room",
    topic: "Travel · Hotels",
    passage:
`I am staying in a small hotel. My room has a comfortable bed and a TV. There is also a desk and a small fridge. The room does not have a balcony. There is no swimming pool in the hotel either. I have my own laptop with me.`,
    instructions: "Which THREE things are in the room? Choose THREE letters.",
    options: [
      { label: "A", text: "a bed" },
      { label: "B", text: "a balcony" },
      { label: "C", text: "a TV" },
      { label: "D", text: "a swimming pool" },
      { label: "E", text: "a fridge" },
      { label: "F", text: "a kitchen" },
    ],
    items: [{ prompt: "Choose THREE items in the room.", answer: ["A", "C", "E"] }],
    analysis:
`A, C and E are correct.

B and D are clearly rejected. F (kitchen) is not mentioned.`,
  },
  {
    id: "ls-a2-106",
    type: "list_selection",
    level: "A2",
    title: "School Subjects I Like",
    topic: "School · Subjects",
    passage:
`I like many subjects at school. My favourite is English because the teacher is funny. I also like art and music. I do not like maths because it is hard for me. I find history boring. Science is OK, but it is not one of my favourites.`,
    instructions: "Which THREE subjects does the writer like? Choose THREE letters.",
    options: [
      { label: "A", text: "English" },
      { label: "B", text: "Maths" },
      { label: "C", text: "Art" },
      { label: "D", text: "History" },
      { label: "E", text: "Music" },
      { label: "F", text: "Geography" },
    ],
    items: [{ prompt: "Choose THREE subjects the writer likes.", answer: ["A", "C", "E"] }],
    analysis:
`A, C and E are correct.

B is rejected ("I do not like maths"). D is rejected ("I find history boring"). F is not in the passage.`,
  },
  {
    id: "ls-a2-107",
    type: "list_selection",
    level: "A2",
    title: "Things in the Park",
    topic: "City · Free time",
    passage:
`The park near my house is very nice. There are many trees and beautiful flowers. There is a small lake with ducks. Children can play on the swings. There is no café in the park, and there is no bicycle area. There is also a long path where people walk their dogs.`,
    instructions: "Which THREE things ARE in the park? Choose THREE letters.",
    options: [
      { label: "A", text: "Trees and flowers" },
      { label: "B", text: "A café" },
      { label: "C", text: "A lake with ducks" },
      { label: "D", text: "A bicycle area" },
      { label: "E", text: "Swings for children" },
      { label: "F", text: "A train station" },
    ],
    items: [{ prompt: "Choose THREE items found in the park.", answer: ["A", "C", "E"] }],
    analysis:
`A, C and E are correct.

B and D are clearly rejected. F (train station) is not mentioned.`,
  },
  {
    id: "ls-a2-108",
    type: "list_selection",
    level: "A2",
    title: "Sports Day at School",
    topic: "School · Sport",
    passage:
`Last Friday was sports day at our school. We had four activities: running, jumping, throwing a ball and a tug-of-war game. We did not play football because there was no time. The school did not organise swimming this year either. Everyone got a small medal at the end of the day.`,
    instructions: "Which THREE activities took place on sports day? Choose THREE letters.",
    options: [
      { label: "A", text: "Running" },
      { label: "B", text: "Football" },
      { label: "C", text: "Jumping" },
      { label: "D", text: "Swimming" },
      { label: "E", text: "Tug-of-war" },
      { label: "F", text: "Tennis" },
    ],
    items: [{ prompt: "Choose THREE activities from sports day.", answer: ["A", "C", "E"] }],
    analysis:
`A, C and E are correct.

B and D are clearly rejected. F (tennis) is not mentioned.`,
  },
  {
    id: "ls-a2-109",
    type: "list_selection",
    level: "A2",
    title: "On the Bus",
    topic: "Transport · City",
    passage:
`I am sitting on the city bus. Around me I can see many things. There is an old woman with a brown bag. A young boy is reading a comic book. A man is talking on his phone. There are no children with their parents on this bus. The driver is wearing a blue uniform.`,
    instructions: "Which THREE people or things does the writer see? Choose THREE letters.",
    options: [
      { label: "A", text: "An old woman with a bag" },
      { label: "B", text: "Children with their parents" },
      { label: "C", text: "A boy reading" },
      { label: "D", text: "A driver in a blue uniform" },
      { label: "E", text: "A dog under a seat" },
      { label: "F", text: "Police officers" },
    ],
    items: [{ prompt: "Choose THREE things the writer sees.", answer: ["A", "C", "D"] }],
    analysis:
`A, C and D are correct.

B is rejected ("There are no children with their parents"). E and F are not in the text.`,
  },
  {
    id: "ls-a2-110",
    type: "list_selection",
    level: "A2",
    title: "Clothes for a Cold Day",
    topic: "Clothes · Weather",
    passage:
`Today is very cold. Before going outside, I put on a warm coat, a scarf and gloves. I also wear a hat to keep my ears warm. I do not wear sandals or shorts because it is too cold. My boots are very comfortable in the snow.`,
    instructions: "Which THREE clothes does the writer wear today? Choose THREE letters.",
    options: [
      { label: "A", text: "A warm coat" },
      { label: "B", text: "Sandals" },
      { label: "C", text: "A scarf" },
      { label: "D", text: "Shorts" },
      { label: "E", text: "Boots" },
      { label: "F", text: "A T-shirt" },
    ],
    items: [{ prompt: "Choose THREE items the writer wears.", answer: ["A", "C", "E"] }],
    analysis:
`A, C and E are correct (and a hat and gloves, not in the options).

B and D are clearly rejected. F (T-shirt) is not mentioned.`,
  },

  // ───────────────────── 10. Choose a Title (need +10) ─────────────────────
  {
    id: "ct-a2-101",
    type: "choose_title",
    level: "A2",
    title: "Best title?",
    topic: "Daily life · Family",
    passage:
`Every Sunday morning, my dad and I go to the local market. We buy fresh fruit, vegetables and bread for the week. The market is busy and noisy. We always meet our neighbours there. After the market, we walk home and have a big breakfast together.`,
    instructions: "Choose the BEST title for this passage.",
    options: [
      { label: "A", text: "Sunday morning at the market" },
      { label: "B", text: "How to choose fresh fruit" },
      { label: "C", text: "Living in a quiet town" },
      { label: "D", text: "Cooking with neighbours" },
    ],
    items: [{ prompt: "Best title for the passage:", answer: "A" }],
    analysis:
`A is correct. The whole passage describes a routine: every Sunday morning at the market.

B, C and D are details, not the main idea.`,
  },
  {
    id: "ct-a2-102",
    type: "choose_title",
    level: "A2",
    title: "Best title?",
    topic: "Animals · Pets",
    passage:
`Cats sleep a lot. A normal cat sleeps for 12 to 16 hours every day. They like to sleep in warm and quiet places. Some cats sleep on a soft chair, others on a sunny windowsill. Cats sleep so much because they need a lot of energy when they hunt or play.`,
    instructions: "Choose the BEST title for this passage.",
    options: [
      { label: "A", text: "How to feed a cat" },
      { label: "B", text: "Why cats sleep so much" },
      { label: "C", text: "Famous cats in films" },
      { label: "D", text: "Cats and dogs as pets" },
    ],
    items: [{ prompt: "Best title for the passage:", answer: "B" }],
    analysis:
`B is correct. The passage gives the number of hours and the reason: they need energy.

A, C and D are not the topic.`,
  },
  {
    id: "ct-a2-103",
    type: "choose_title",
    level: "A2",
    title: "Best title?",
    topic: "Health · Daily life",
    passage:
`Drinking water is very important for our body. Doctors say children should drink about six glasses every day. Water helps us think clearly and gives us energy. When the weather is hot or after sport, we need to drink more.`,
    instructions: "Choose the BEST title for this passage.",
    options: [
      { label: "A", text: "Sport in hot countries" },
      { label: "B", text: "Why water is important for us" },
      { label: "C", text: "How to make fruit juice" },
      { label: "D", text: "Schools that sell drinks" },
    ],
    items: [{ prompt: "Best title for the passage:", answer: "B" }],
    analysis:
`B is correct. The passage explains why water is important and how much to drink.

A, C and D are not in the text.`,
  },
  {
    id: "ct-a2-104",
    type: "choose_title",
    level: "A2",
    title: "Best title?",
    topic: "Hobbies · Sport",
    passage:
`Riding a bike is a fun activity. It is good exercise and it is also kind to the planet because it does not produce smoke. Many cities now have special roads for bikes. Children should always wear a helmet for safety.`,
    instructions: "Choose the BEST title for this passage.",
    options: [
      { label: "A", text: "Famous bike races" },
      { label: "B", text: "How to fix a bike" },
      { label: "C", text: "Bike riding — fun and good for you" },
      { label: "D", text: "City roads in the future" },
    ],
    items: [{ prompt: "Best title for the passage:", answer: "C" }],
    analysis:
`C is correct. The passage names the benefits (fun, exercise, good for the planet, safer with helmet).

A, B and D are not in the text.`,
  },
  {
    id: "ct-a2-105",
    type: "choose_title",
    level: "A2",
    title: "Best title?",
    topic: "Food · Health",
    passage:
`Eating fruit every day is very good for our health. Apples, bananas and oranges all give the body important vitamins. Fresh fruit also helps with digestion. Most doctors say we should eat at least three different fruits every day.`,
    instructions: "Choose the BEST title for this passage.",
    options: [
      { label: "A", text: "Why we should eat fruit every day" },
      { label: "B", text: "How to grow oranges" },
      { label: "C", text: "Vegetables and salads" },
      { label: "D", text: "Doctors in our town" },
    ],
    items: [{ prompt: "Best title for the passage:", answer: "A" }],
    analysis:
`A is correct. The passage explains the health benefits of eating fruit every day.

B, C and D are not the topic.`,
  },
  {
    id: "ct-a2-106",
    type: "choose_title",
    level: "A2",
    title: "Best title?",
    topic: "Animals · Nature",
    passage:
`Bees are small but very important insects. They fly from flower to flower and they make honey. They also help plants to grow new fruit and vegetables. Without bees, many gardens and farms would have less food.`,
    instructions: "Choose the BEST title for this passage.",
    options: [
      { label: "A", text: "Honey recipes from around the world" },
      { label: "B", text: "Why bees are important" },
      { label: "C", text: "How to keep bees safe at home" },
      { label: "D", text: "Insects that bite people" },
    ],
    items: [{ prompt: "Best title for the passage:", answer: "B" }],
    analysis:
`B is correct. The passage explains why bees matter (honey + helping plants).

A, C and D are not the topic.`,
  },
  {
    id: "ct-a2-107",
    type: "choose_title",
    level: "A2",
    title: "Best title?",
    topic: "School · People",
    passage:
`Mr Singh is the music teacher at our school. He is very patient and friendly. He teaches us how to play the guitar, the piano and the drums. Many students want to be in his class because he makes lessons fun.`,
    instructions: "Choose the BEST title for this passage.",
    options: [
      { label: "A", text: "Buying a new guitar" },
      { label: "B", text: "A school orchestra in the city" },
      { label: "C", text: "A popular music teacher" },
      { label: "D", text: "How to read music notes" },
    ],
    items: [{ prompt: "Best title for the passage:", answer: "C" }],
    analysis:
`C is correct. The whole passage describes Mr Singh and why students like him.

A, B and D are not the topic.`,
  },
  {
    id: "ct-a2-108",
    type: "choose_title",
    level: "A2",
    title: "Best title?",
    topic: "Travel · Holidays",
    passage:
`Camping is a cheap way to spend a holiday. Families can sleep in a tent under the stars. They cook simple food on a small fire. Children love to explore the forest and play near the river. The fresh air is good for everyone.`,
    instructions: "Choose the BEST title for this passage.",
    options: [
      { label: "A", text: "How to start a fire safely" },
      { label: "B", text: "Why camping is a great holiday" },
      { label: "C", text: "Famous national parks" },
      { label: "D", text: "Children who don't like outdoor sports" },
    ],
    items: [{ prompt: "Best title for the passage:", answer: "B" }],
    analysis:
`B is correct. The passage gives several reasons why camping is a good holiday.

A, C and D are not the topic.`,
  },
  {
    id: "ct-a2-109",
    type: "choose_title",
    level: "A2",
    title: "Best title?",
    topic: "City · Daily life",
    passage:
`Living in a big city has many good things. There are lots of jobs, big shops and many cinemas. People from different countries live together. However, life in the city can also be very busy and noisy.`,
    instructions: "Choose the BEST title for this passage.",
    options: [
      { label: "A", text: "Good and bad things about city life" },
      { label: "B", text: "How to find a job in a big city" },
      { label: "C", text: "Why villages are better than cities" },
      { label: "D", text: "Cinemas in different countries" },
    ],
    items: [{ prompt: "Best title for the passage:", answer: "A" }],
    analysis:
`A is correct. The passage gives both positives (jobs, shops) and a negative (busy, noisy).

B, C and D are not the main topic.`,
  },
  {
    id: "ct-a2-110",
    type: "choose_title",
    level: "A2",
    title: "Best title?",
    topic: "Sport · Daily life",
    passage:
`Walking every day is one of the easiest ways to stay healthy. You do not need any special clothes or equipment. A walk of 30 minutes is enough to make your heart and body strong. You can walk alone, with a friend, or with your dog.`,
    instructions: "Choose the BEST title for this passage.",
    options: [
      { label: "A", text: "Why you need running shoes" },
      { label: "B", text: "How dogs help people exercise" },
      { label: "C", text: "Walking — a simple way to stay healthy" },
      { label: "D", text: "Sports clubs in our city" },
    ],
    items: [{ prompt: "Best title for the passage:", answer: "C" }],
    analysis:
`C is correct. The passage explains the benefits of daily walking.

A, B and D are not the main topic.`,
  },

  // ───────────────────── 11. Short Answer (need +15 items) ─────────────────────
  {
    id: "sa-a2-101",
    type: "short_answer",
    level: "A2",
    title: "Lisa's New Job",
    topic: "Work · People",
    passage:
`Lisa is 22 years old. Last month she started a new job at a small bookshop in her town. She works five days a week, from Monday to Friday. The shop opens at 9 o'clock. Lisa loves reading, so this is her dream job. Her best friend Anna sometimes comes to visit her at work.`,
    instructions: "Answer the questions. Use NO MORE THAN TWO WORDS for each.",
    items: [
      { prompt: "1. How old is Lisa?", answer: "22", acceptable: ["22 years", "twenty-two"] },
      { prompt: "2. Where does Lisa work?", answer: "bookshop", acceptable: ["a bookshop", "small bookshop", "in a bookshop"] },
      { prompt: "3. How many days a week does she work?", answer: "five", acceptable: ["5", "five days"] },
      { prompt: "4. What time does the shop open?", answer: "9", acceptable: ["9 o'clock", "9:00", "nine"] },
      { prompt: "5. What is the name of her best friend?", answer: "Anna", acceptable: ["anna"] },
    ],
    analysis:
`Each answer is taken directly from the passage. Always check the word limit (max 2 words).`,
  },
  {
    id: "sa-a2-102",
    type: "short_answer",
    level: "A2",
    title: "The Football Match",
    topic: "Sport · Free time",
    passage:
`Last Saturday afternoon, Carlos played in a big football match. The match was at the city stadium. His team wore red shirts. They played against the blue team. Carlos scored two goals. His team won 3-1. After the match, his family took him for ice cream.`,
    instructions: "Answer the questions. Use NO MORE THAN TWO WORDS for each.",
    items: [
      { prompt: "1. When did the match take place?", answer: "Saturday", acceptable: ["last Saturday", "Saturday afternoon"] },
      { prompt: "2. What colour were the shirts of Carlos's team?", answer: "red" },
      { prompt: "3. How many goals did Carlos score?", answer: "two", acceptable: ["2", "two goals"] },
      { prompt: "4. What was the final score?", answer: "3-1", acceptable: ["3 to 1", "three-one", "3:1"] },
      { prompt: "5. What did his family give him after the match?", answer: "ice cream" },
    ],
    analysis:
`Find each keyword in the passage (Saturday, shirts, goals, score, family) and read the words around it.`,
  },
  {
    id: "sa-a2-103",
    type: "short_answer",
    level: "A2",
    title: "A Day in the Mountains",
    topic: "Travel · Nature",
    passage:
`Last weekend Pedro and his father went to the mountains. They left home at 6 o'clock in the morning. They drove for two hours and then walked for another three hours. They saw many birds, a small river and even a fox. They came home in the evening, very tired but happy.`,
    instructions: "Answer the questions. Use NO MORE THAN TWO WORDS for each.",
    items: [
      { prompt: "1. Who did Pedro go to the mountains with?", answer: "his father", acceptable: ["father", "dad", "his dad"] },
      { prompt: "2. What time did they leave home?", answer: "6", acceptable: ["6 o'clock", "6:00", "six"] },
      { prompt: "3. How many hours did they drive?", answer: "two", acceptable: ["2", "two hours"] },
      { prompt: "4. How many hours did they walk?", answer: "three", acceptable: ["3", "three hours"] },
      { prompt: "5. Which wild animal did they see?", answer: "fox", acceptable: ["a fox"] },
    ],
    analysis:
`Numbers and times are easy to scan for. The wild animal is named in the same line as the river and the birds.`,
  },

  // ───────────────────── 12. Sentence Completion (need +11 items) ─────────────────────
  {
    id: "sc-a2-101",
    type: "sentence_completion",
    level: "A2",
    title: "My Cousin the Singer",
    topic: "People · Music",
    passage:
`My cousin Lucia is a singer. She is 19 years old. She started to sing when she was eight. She sings in a small band with two friends. They play in cafés on Friday evenings. Lucia's favourite song is an old jazz song from her grandmother.`,
    instructions: "Complete each sentence. Use NO MORE THAN TWO WORDS from the passage.",
    items: [
      { prompt: "1. Lucia is a ______.", answer: "singer" },
      { prompt: "2. She started singing at ______ years old.", answer: "eight", acceptable: ["8"] },
      { prompt: "3. She sings in a small ______.", answer: "band" },
      { prompt: "4. The band plays in cafés on ______ evenings.", answer: "Friday", acceptable: ["friday"] },
    ],
    analysis:
`Use the exact word(s) from the passage. Don't add or change words.`,
  },
  {
    id: "sc-a2-102",
    type: "sentence_completion",
    level: "A2",
    title: "The Old Castle",
    topic: "History · Places",
    passage:
`Near my village there is an old castle. It was built more than 800 years ago. The walls of the castle are very thick. Today, the castle is a museum. About 20,000 people visit every year. Children under 10 do not pay.`,
    instructions: "Complete each sentence. Use NO MORE THAN TWO WORDS from the passage.",
    items: [
      { prompt: "1. The castle is more than ______ years old.", answer: "800", acceptable: ["eight hundred"] },
      { prompt: "2. The walls of the castle are very ______.", answer: "thick" },
      { prompt: "3. Today the castle is a ______.", answer: "museum" },
      { prompt: "4. ______ people visit every year.", answer: "20,000", acceptable: ["20000", "twenty thousand", "about 20,000"] },
    ],
    analysis:
`Each missing word is taken from the same sentence in the passage.`,
  },
  {
    id: "sc-a2-103",
    type: "sentence_completion",
    level: "A2",
    title: "My Grandmother's Garden",
    topic: "Nature · Family",
    passage:
`My grandmother has a beautiful garden. She grows tomatoes, lemons and many flowers. She works in the garden every morning before breakfast. Birds come to drink water from a small bowl. Her favourite plant is a big orange rose.`,
    instructions: "Complete each sentence. Use NO MORE THAN TWO WORDS from the passage.",
    items: [
      { prompt: "1. My grandmother grows tomatoes and ______.", answer: "lemons" },
      { prompt: "2. She works in the garden every ______.", answer: "morning" },
      { prompt: "3. Birds drink water from a small ______.", answer: "bowl" },
      { prompt: "4. Her favourite plant is a big orange ______.", answer: "rose" },
    ],
    analysis:
`Use the exact word from the passage. Stay within the two-word limit.`,
  },

  // ───────────────────── 13. Summary Completion (need +10 items) ─────────────────────
  {
    id: "sumc-a2-101",
    type: "summary_completion",
    level: "A2",
    title: "A Day in London",
    topic: "Travel · City",
    passage:
`Last summer, Maria went on a trip to London with her family. They stayed for four days. On the first day, they visited Buckingham Palace. On the second day, they went on the London Eye. The weather was rainy, but they enjoyed it. Maria's favourite food was fish and chips.`,
    instructions: "Complete the summary. Choose ONE letter (A–G) for each gap.",
    options: [
      { label: "A", text: "Buckingham Palace" },
      { label: "B", text: "rainy" },
      { label: "C", text: "fish and chips" },
      { label: "D", text: "four" },
      { label: "E", text: "Madrid" },
      { label: "F", text: "ten" },
      { label: "G", text: "sunny" },
    ],
    items: [
      { prompt: "Maria's family went to London for (1) ______ days. They visited (2) ______ on the first day. The weather was (3) ______. Maria liked (4) ______ best. Her trip was great.\n\nGap 1:", answer: "D" },
      { prompt: "Gap 2:", answer: "A" },
      { prompt: "Gap 3:", answer: "B" },
      { prompt: "Gap 4:", answer: "C" },
      { prompt: "Note: there is one extra letter in the box.", answer: "C" },
    ],
    analysis:
`(1) D four — "stayed for four days".
(2) A Buckingham Palace — "On the first day, they visited Buckingham Palace".
(3) B rainy — "The weather was rainy".
(4) C fish and chips — "Maria's favourite food was fish and chips".

E (Madrid), F (ten) and G (sunny) are distractors not used.`,
  },
  {
    id: "sumc-a2-102",
    type: "summary_completion",
    level: "A2",
    title: "Tom's New Bike",
    topic: "Daily life · Family",
    passage:
`Tom got a new bike for his birthday. The bike is blue. He is now 10 years old. Every Saturday, Tom rides his bike to the park with his sister Jane. They ride for one hour. After that, they buy ice cream.`,
    instructions: "Complete the summary. Choose ONE letter (A–G) for each gap.",
    options: [
      { label: "A", text: "blue" },
      { label: "B", text: "park" },
      { label: "C", text: "Jane" },
      { label: "D", text: "ten" },
      { label: "E", text: "two" },
      { label: "F", text: "ice cream" },
      { label: "G", text: "school" },
    ],
    items: [
      { prompt: "Tom got a (1) ______ bike for his birthday. He is (2) ______ years old. He rides with his sister (3) ______ to the (4) ______ every Saturday. Then they buy (5) ______.\n\nGap 1:", answer: "A" },
      { prompt: "Gap 2:", answer: "D" },
      { prompt: "Gap 3:", answer: "C" },
      { prompt: "Gap 4:", answer: "B" },
      { prompt: "Gap 5:", answer: "F" },
    ],
    analysis:
`(1) A blue. (2) D ten. (3) C Jane. (4) B park. (5) F ice cream.

E (two) and G (school) are distractors not used.`,
  },

  // ───────────────────── 14. Table Completion (need +12 items) ─────────────────────
  {
    id: "tbl-a2-101",
    type: "table_completion",
    level: "A2",
    title: "Cinema Times",
    topic: "Free time · Information",
    passage:
`The City Cinema shows three films today. "Sunny Days" starts at 4 o'clock and the ticket is 8 dollars. "Big Adventure" starts at 6 o'clock and the ticket is 9 dollars. "Funny Family" starts at 8 o'clock and the ticket is also 8 dollars.`,
    instructions: "Complete the table. Use ONE word or a number.",
    visual:
`┌──────────────────┬───────┬────────┐
│ Film             │ Time  │ Price  │
├──────────────────┼───────┼────────┤
│ Sunny Days       │ (1)__ │ $8     │
│ Big Adventure    │ 6:00  │ $(2)__ │
│ Funny Family     │ (3)__ │ $8     │
└──────────────────┴───────┴────────┘`,
    items: [
      { prompt: "Cell (1) — time of \"Sunny Days\"", answer: "4", acceptable: ["4:00", "4 o'clock", "four"] },
      { prompt: "Cell (2) — price of \"Big Adventure\"", answer: "9", acceptable: ["nine", "$9", "9 dollars"] },
      { prompt: "Cell (3) — time of \"Funny Family\"", answer: "8", acceptable: ["8:00", "8 o'clock", "eight"] },
    ],
    analysis:
`(1) 4 — "Sunny Days starts at 4 o'clock".
(2) 9 — "Big Adventure ticket is 9 dollars".
(3) 8 — "Funny Family starts at 8 o'clock".`,
  },
  {
    id: "tbl-a2-102",
    type: "table_completion",
    level: "A2",
    title: "Three Hotels in Town",
    topic: "Travel · Information",
    passage:
`There are three hotels in our town. The Sun Hotel has 30 rooms and a big swimming pool. The Sea Hotel has 50 rooms but no pool. The Garden Hotel has only 12 rooms, but it has a beautiful garden and a small pool.`,
    instructions: "Complete the table. Use ONE word or a number.",
    visual:
`┌────────────────┬────────┬───────────────┐
│ Hotel          │ Rooms  │ Pool? (Y/N)   │
├────────────────┼────────┼───────────────┤
│ Sun Hotel      │ (1)__  │ Yes           │
│ Sea Hotel      │ 50     │ (2)__         │
│ Garden Hotel   │ (3)__  │ Yes           │
└────────────────┴────────┴───────────────┘`,
    items: [
      { prompt: "Cell (1)", answer: "30", acceptable: ["thirty"] },
      { prompt: "Cell (2)", answer: "No", acceptable: ["no"] },
      { prompt: "Cell (3)", answer: "12", acceptable: ["twelve"] },
    ],
    analysis:
`(1) 30 — "Sun Hotel has 30 rooms".
(2) No — "Sea Hotel has 50 rooms but no pool".
(3) 12 — "Garden Hotel has only 12 rooms".`,
  },
  {
    id: "tbl-a2-103",
    type: "table_completion",
    level: "A2",
    title: "Sandwich Menu",
    topic: "Food · Information",
    passage:
`The school café has three sandwiches today. The Cheese Sandwich costs 3 dollars. The Egg Sandwich costs 4 dollars and is the most popular. The Tuna Sandwich is the most expensive: it costs 5 dollars.`,
    instructions: "Complete the table. Use ONE word or a number.",
    visual:
`┌───────────────┬───────┐
│ Sandwich      │ Price │
├───────────────┼───────┤
│ Cheese        │ $(1)__│
│ Egg           │ $(2)__│
│ Tuna          │ $(3)__│
└───────────────┴───────┘`,
    items: [
      { prompt: "Cell (1)", answer: "3", acceptable: ["three", "$3", "3 dollars"] },
      { prompt: "Cell (2)", answer: "4", acceptable: ["four", "$4", "4 dollars"] },
      { prompt: "Cell (3)", answer: "5", acceptable: ["five", "$5", "5 dollars"] },
    ],
    analysis:
`Each price is given clearly in the passage. Read carefully — the most expensive is the tuna at 5 dollars.`,
  },
  {
    id: "tbl-a2-104",
    type: "table_completion",
    level: "A2",
    title: "Three Friends and Their Pets",
    topic: "Pets · People",
    passage:
`Tina has a small black cat. Roberto has a big brown dog. Hina has a green parrot. They all love their pets.`,
    instructions: "Complete the table. Use ONE word.",
    visual:
`┌──────────┬──────────┬──────────┐
│ Owner    │ Pet      │ Colour   │
├──────────┼──────────┼──────────┤
│ Tina     │ cat      │ (1)____  │
│ Roberto  │ (2)____  │ brown    │
│ Hina     │ parrot   │ (3)____  │
└──────────┴──────────┴──────────┘`,
    items: [
      { prompt: "Cell (1)", answer: "black", acceptable: ["Black"] },
      { prompt: "Cell (2)", answer: "dog", acceptable: ["Dog"] },
      { prompt: "Cell (3)", answer: "green", acceptable: ["Green"] },
    ],
    analysis:
`(1) black — "Tina has a small black cat".
(2) dog — "Roberto has a big brown dog".
(3) green — "Hina has a green parrot".`,
  },

  // ───────────────────── 15. Flow Chart Completion (need +11 items) ─────────────────────
  {
    id: "fc-a2-101",
    type: "flow_chart_completion",
    level: "A2",
    title: "How to Make Tea",
    topic: "Food · Instructions",
    passage:
`Making a cup of tea is easy. First, boil some water in a kettle. Then, put a tea bag in your cup. Pour the hot water into the cup and wait for two minutes. Finally, add some milk or sugar if you want.`,
    instructions: "Complete the flow chart. Use ONE word for each answer.",
    visual:
`Boil some (1)______
        ↓
Put a (2)______ in the cup
        ↓
Pour the hot water into the cup
        ↓
Wait for (3)______ minutes
        ↓
Add (4)______ or sugar`,
    items: [
      { prompt: "Step (1)", answer: "water" },
      { prompt: "Step (2)", answer: "tea bag", acceptable: ["bag"] },
      { prompt: "Step (3)", answer: "two", acceptable: ["2"] },
      { prompt: "Step (4)", answer: "milk" },
    ],
    analysis:
`Each step follows the order in the passage: water → tea bag → wait two minutes → milk/sugar.`,
  },
  {
    id: "fc-a2-102",
    type: "flow_chart_completion",
    level: "A2",
    title: "How to Plant a Flower",
    topic: "Nature · Instructions",
    passage:
`Planting a small flower is fun and easy. First, choose a pot with a hole at the bottom. Then, put soil into the pot. After that, make a small hole in the soil and put the seed inside. Cover the seed with more soil. Finally, water the pot every day.`,
    instructions: "Complete the flow chart. Use ONE word for each answer.",
    visual:
`Choose a (1)______ with a hole
        ↓
Put (2)______ into the pot
        ↓
Make a small hole and add a (3)______
        ↓
Cover with more soil
        ↓
(4)______ the pot every day`,
    items: [
      { prompt: "Step (1)", answer: "pot" },
      { prompt: "Step (2)", answer: "soil" },
      { prompt: "Step (3)", answer: "seed" },
      { prompt: "Step (4)", answer: "Water", acceptable: ["water"] },
    ],
    analysis:
`Each step follows the order in the passage: pot → soil → seed → cover → water.`,
  },
  {
    id: "fc-a2-103",
    type: "flow_chart_completion",
    level: "A2",
    title: "Borrowing a Library Book",
    topic: "Library · Instructions",
    passage:
`Borrowing a book from our school library is easy. First, find the book you want on the shelf. Then, take the book to the desk. Show your library card to the librarian. The librarian will scan the book. Finally, you can take the book home for two weeks.`,
    instructions: "Complete the flow chart. Use ONE word for each answer.",
    visual:
`Find the (1)______ on the shelf
        ↓
Take it to the (2)______
        ↓
Show your (3)______ card
        ↓
Take the book home for (4)______ weeks`,
    items: [
      { prompt: "Step (1)", answer: "book" },
      { prompt: "Step (2)", answer: "desk" },
      { prompt: "Step (3)", answer: "library" },
      { prompt: "Step (4)", answer: "two", acceptable: ["2"] },
    ],
    analysis:
`Each step follows the order in the passage: book → desk → library card → two weeks.`,
  },

  // ───────────────────── 16. Diagram Completion (need +12 items) ─────────────────────
  {
    id: "dg-a2-101",
    type: "diagram_completion",
    level: "A2",
    title: "Parts of a Bicycle",
    topic: "Transport · Vocabulary",
    passage:
`A bicycle has many simple parts. At the front, there is a wheel. You hold the handlebars to control the bike. The seat is in the middle, where you sit. There is also a wheel at the back. The chain connects the pedals to the back wheel.`,
    instructions: "Label the diagram. Use ONE word for each answer.",
    visual:
`           handlebars
              │
   (1)____ ── frame ── (2)____
   FRONT             BACK
              │
            (3)____ (where you sit)`,
    items: [
      { prompt: "Label (1) — front part of the bike", answer: "wheel", acceptable: ["front wheel"] },
      { prompt: "Label (2) — back part of the bike", answer: "wheel", acceptable: ["back wheel"] },
      { prompt: "Label (3) — middle part where you sit", answer: "seat" },
    ],
    analysis:
`(1) wheel — "At the front, there is a wheel".
(2) wheel — "There is also a wheel at the back".
(3) seat — "The seat is in the middle, where you sit".`,
  },
  {
    id: "dg-a2-102",
    type: "diagram_completion",
    level: "A2",
    title: "Parts of a Tree",
    topic: "Nature · Vocabulary",
    passage:
`A tree has three main parts. Under the ground, the roots take water from the soil. Above the ground, the trunk is the long, brown body of the tree. At the top, there are many branches with green leaves.`,
    instructions: "Label the diagram. Use ONE word for each answer.",
    visual:
`        ╭─── (1)______ (green) ───╮
       (2)______ (top of tree)
            │
            │ (3)______
            │ (long brown body)
        ────┴────
       (roots — under ground)`,
    items: [
      { prompt: "Label (1) — green parts on the branches", answer: "leaves", acceptable: ["leaf"] },
      { prompt: "Label (2) — many of these grow at the top", answer: "branches", acceptable: ["branch"] },
      { prompt: "Label (3) — long brown body of the tree", answer: "trunk" },
    ],
    analysis:
`(1) leaves — "branches with green leaves".
(2) branches — "many branches with green leaves".
(3) trunk — "the trunk is the long, brown body".`,
  },
  {
    id: "dg-a2-103",
    type: "diagram_completion",
    level: "A2",
    title: "Parts of a Face",
    topic: "Body · Vocabulary",
    passage:
`The human face has many important parts. We have two eyes for seeing. The nose is in the middle of the face. We use the mouth to eat and to talk. Two ears, one on each side, help us hear sounds.`,
    instructions: "Label the diagram. Use ONE word for each answer.",
    visual:
`     ╭─── eye ─── (1)______ ───╮
     │                          │
     │          (2)______       │
     │      (in the middle)     │
     │                          │
     │          (3)______       │
     │      (we use to eat)     │
     ╰──────────────────────────╯`,
    items: [
      { prompt: "Label (1) — used for hearing", answer: "ear", acceptable: ["ears"] },
      { prompt: "Label (2) — in the middle of the face", answer: "nose" },
      { prompt: "Label (3) — used for eating and talking", answer: "mouth" },
    ],
    analysis:
`(1) ear — "Two ears … help us hear".
(2) nose — "The nose is in the middle".
(3) mouth — "We use the mouth to eat and to talk".`,
  },
  {
    id: "dg-a2-104",
    type: "diagram_completion",
    level: "A2",
    title: "A Simple Plant",
    topic: "Nature · Vocabulary",
    passage:
`A simple plant has three main parts. The roots are under the soil. They take water from the ground. The stem grows up from the soil. At the top of the stem, there is a colourful flower.`,
    instructions: "Label the diagram. Use ONE word for each answer.",
    visual:
`           ✿ (1)______ (colourful)
           │
           │ (2)______
           │ (long, going up)
           │
       ════╧════ ← soil
        ↘   ↙
         (3)______ (under the soil)`,
    items: [
      { prompt: "Label (1) — colourful top part", answer: "flower" },
      { prompt: "Label (2) — long part going up from the soil", answer: "stem" },
      { prompt: "Label (3) — part under the soil", answer: "roots", acceptable: ["root"] },
    ],
    analysis:
`(1) flower — "there is a colourful flower" at the top.
(2) stem — "The stem grows up from the soil".
(3) roots — "The roots are under the soil".`,
  },
];

export default supplements;
