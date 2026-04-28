import type { SkillExercise } from "./reading-skills";

/**
 * Top-up patch — fills the last gaps to reach ≥15 items in every (type × level) bucket.
 * Targets: A2 skimming(+4), B2 skimming(+5), A2 MC(+6), B2 MC(+6),
 *          A2 list_selection(+4), B2 list_selection(+4), A2 choose_title(+4), B2 choose_title(+4).
 */
const supplements: SkillExercise[] = [
  // ───────────────────── Skimming · A2 (need +4) ─────────────────────
  {
    id: "sk-a2-501", type: "skimming", level: "A2",
    title: "My Cat Milo", topic: "Pets",
    passage:
`I have a small cat called Milo. He is grey and white. Milo loves to sleep on my bed in the afternoon. In the morning, he eats fish and drinks water. When I come home from school, he runs to the door. Milo is a very friendly cat.`,
    instructions: "Skim the passage and choose the BEST answer.",
    options: [
      { label: "A", text: "How to feed a cat" },
      { label: "B", text: "A boy's pet cat" },
      { label: "C", text: "Cats around the world" },
      { label: "D", text: "A school in the morning" },
    ],
    items: [{ prompt: "What is the main idea?", answer: "B" }],
    analysis:
`B is correct. The whole passage describes one cat (Milo) and what he does each day. A is wrong (only one short sentence is about food). C is wrong (only one cat is mentioned, not many). D is wrong (school is mentioned in just one phrase).`,
  },
  {
    id: "sk-a2-502", type: "skimming", level: "A2",
    title: "Sara's Birthday", topic: "Family · Celebrations",
    passage:
`Yesterday was Sara's tenth birthday. Her mum made a big chocolate cake. Sara invited five friends to her house. They played games and danced. Sara got many nice presents — a doll, a book and a new bike. Everyone had a wonderful time.`,
    instructions: "Skim the passage and choose the BEST answer.",
    options: [
      { label: "A", text: "How to make a chocolate cake" },
      { label: "B", text: "Sara's tenth birthday party" },
      { label: "C", text: "A new bike for school" },
      { label: "D", text: "Five friends at school" },
    ],
    items: [{ prompt: "What is the passage about?", answer: "B" }],
    analysis:
`B is correct. The first sentence introduces the birthday and every other sentence describes the party. A is wrong (the cake is mentioned once, not how to make it). C is wrong (the bike is one of several presents). D is wrong (the friends are at the party, not at school).`,
  },
  {
    id: "sk-a2-503", type: "skimming", level: "A2",
    title: "Rain in Summer", topic: "Weather",
    passage:
`In our city, summer is usually hot and sunny. Most people go to the park or the beach. But this summer is different. It rains almost every day. The streets are wet and people carry umbrellas. Children cannot play football outside. Many shops have fewer customers.`,
    instructions: "Skim the passage and choose the BEST answer.",
    options: [
      { label: "A", text: "An unusual rainy summer in a city" },
      { label: "B", text: "How to choose a good umbrella" },
      { label: "C", text: "The history of the city park" },
      { label: "D", text: "Football clubs in summer" },
    ],
    items: [{ prompt: "What is the writer mainly describing?", answer: "A" }],
    analysis:
`A is correct. The text contrasts a normal sunny summer with this very rainy one. B is wrong (umbrellas are mentioned only as an example). C is wrong (no history is given). D is wrong (football is mentioned as one activity, not the topic).`,
  },
  {
    id: "sk-a2-504", type: "skimming", level: "A2",
    title: "A New Student", topic: "School",
    passage:
`Today a new student joined our class. Her name is Aya and she is from Egypt. She speaks Arabic and a little English. The teacher asked us to be kind and to help her. At lunch, three girls sat with Aya and showed her the school garden. Aya looked happy.`,
    instructions: "Skim the passage and choose the BEST answer.",
    options: [
      { label: "A", text: "Lunch at the school canteen" },
      { label: "B", text: "How to learn Arabic quickly" },
      { label: "C", text: "A new girl in class and how she was welcomed" },
      { label: "D", text: "The school garden plants" },
    ],
    items: [{ prompt: "The passage is mainly about…", answer: "C" }],
    analysis:
`C is correct. The text introduces Aya and describes how the class welcomed her. A is wrong (lunch is one moment, not the topic). B is wrong (Arabic is mentioned in passing). D is wrong (the garden is just where the girls went).`,
  },

  // ───────────────────── Skimming · B2 (need +5) ─────────────────────
  {
    id: "sk-b2-901", type: "skimming", level: "B2",
    title: "The Decline of Cursive Handwriting", topic: "Education · Society",
    passage:
`Once a near-universal skill in Western primary schools, cursive handwriting has steadily lost ground to keyboard literacy. Education ministries from Finland to several US states have removed it from compulsory curricula, arguing that classroom hours are better spent on coding or critical thinking. Yet a vocal minority of teachers and neuroscientists insists that the act of forming joined-up letters engages motor circuits which, in turn, support memory and reading fluency. Critics counter that such effects are modest and could be achieved through any tactile activity. The debate, ultimately, hinges less on handwriting itself than on what societies expect a literate citizen of the digital age to be able to do.`,
    instructions: "Skim the passage and choose the BEST answer.",
    options: [
      { label: "A", text: "To explain how cursive letters are formed" },
      { label: "B", text: "To examine the controversy over removing cursive from school curricula" },
      { label: "C", text: "To recommend that all schools restore handwriting lessons" },
      { label: "D", text: "To compare typing speeds across different languages" },
    ],
    items: [{ prompt: "The writer's main purpose is to…", answer: "B" }],
    analysis:
`B is correct. The passage presents both sides of the curriculum debate without taking a definitive stance. A is wrong (no instruction is given). C is wrong (the writer presents arguments without recommending). D is wrong (typing speeds are not discussed).

Tip: when the closing sentence frames a "debate" or asks what societies "expect", the purpose is usually analytical rather than instructional.`,
  },
  {
    id: "sk-b2-902", type: "skimming", level: "B2",
    title: "Vertical Farming", topic: "Agriculture · Technology",
    passage:
`Vertical farms — multi-storey indoor facilities in which leafy greens grow under LED lights without soil — were once heralded as the future of food production. By stacking crops, proponents argued, cities could grow lettuce metres from where it was eaten, slashing transport emissions and water use. A decade on, the picture is less rosy. Energy bills have proved punishing, and the narrow range of profitable crops (mostly basil and mixed salads) limits nutritional impact. Even so, some operators are quietly succeeding by integrating their warehouses with renewable power and supplying premium chefs. Vertical farming may not feed the world, but it is unlikely to disappear from it either.`,
    instructions: "Skim the passage and choose the BEST answer.",
    options: [
      { label: "A", text: "A balanced reassessment of vertical farming a decade after the hype" },
      { label: "B", text: "An advertisement for an indoor lettuce brand" },
      { label: "C", text: "A guide to building your own vertical farm at home" },
      { label: "D", text: "A history of LED lighting in agriculture" },
    ],
    items: [{ prompt: "What is the passage mainly doing?", answer: "A" }],
    analysis:
`A is correct. The text moves from past optimism ("heralded as the future") to current limits ("less rosy") to qualified survival ("not feed the world… unlikely to disappear"). B is wrong (no brand or product). C is wrong (no instructions). D is wrong (LEDs are a brief detail).`,
  },
  {
    id: "sk-b2-903", type: "skimming", level: "B2",
    title: "The Rise of Audiobooks", topic: "Media · Reading",
    passage:
`Audiobooks, once a niche format for commuters and the visually impaired, now account for roughly one in five trade-book sales in several markets. Streaming subscriptions, smartphone integration and an explosion of celebrity narrators have all contributed to their rapid mainstream adoption. Some literary critics worry that listening, however immersive, sidelines the close textual attention demanded by serious fiction. Cognitive researchers, however, find that comprehension of narrative is broadly comparable across audio and print, although note-taking and re-reading are clearly easier on the page. For most readers, the question is no longer whether audiobooks are "real" reading, but which format suits each book.`,
    instructions: "Skim the passage and choose the BEST answer.",
    options: [
      { label: "A", text: "An overview of audiobook growth and the debate it has provoked" },
      { label: "B", text: "Instructions on how to record your own audiobook" },
      { label: "C", text: "A ranking of the most famous audiobook narrators" },
      { label: "D", text: "Why printed books are about to disappear" },
    ],
    items: [{ prompt: "The passage is mainly about…", answer: "A" }],
    analysis:
`A is correct. The text traces growth, presents critic and researcher perspectives, and frames a current debate. B is wrong (no recording advice). C is wrong (no ranking). D is wrong — the passage in fact suggests both formats coexist.`,
  },
  {
    id: "sk-b2-904", type: "skimming", level: "B2",
    title: "Reintroducing the Wolf", topic: "Conservation",
    passage:
`When grey wolves were returned to Yellowstone National Park in 1995, ecologists hoped they would thin out the elk population that had been overgrazing willow and aspen along the rivers. The recovery exceeded expectations: streamside forests regenerated, beaver colonies returned, and the meandering rivers themselves regained shape. The story has become a parable of "trophic cascades" — far-reaching effects triggered by a single predator. More recent research, however, suggests that climate variability and shifts in human hunting played roles too, and that the wolf alone cannot account for every change. The rewilding movement now treats Yellowstone as inspiring but not easily replicable.`,
    instructions: "Skim the passage and choose the BEST answer.",
    options: [
      { label: "A", text: "A celebration of wolves as a complete ecological cure-all" },
      { label: "B", text: "A nuanced account of wolf reintroduction and the lessons it offers" },
      { label: "C", text: "Advice on how to hunt elk safely" },
      { label: "D", text: "A history of human settlement in Yellowstone" },
    ],
    items: [{ prompt: "Which best describes the writer's stance?", answer: "B" }],
    analysis:
`B is correct. The passage describes the success but explicitly qualifies it ("climate variability… cannot account for every change… not easily replicable"). A is wrong (the writer pushes back against the "cure-all" framing). C and D are wrong (neither hunting advice nor settlement history is given).`,
  },
  {
    id: "sk-b2-905", type: "skimming", level: "B2",
    title: "Universal Basic Income Trials", topic: "Economics · Society",
    passage:
`Universal basic income (UBI) — an unconditional cash transfer to every adult — has moved from the margins of economic debate to the agenda of pilot programmes in Finland, Kenya and parts of the United States. Supporters argue that, by separating survival from employment, UBI reduces stress, frees workers to retrain, and offers a buffer against automation. Sceptics warn of its cost and worry that, without conditions, it could weaken work incentives. The trials so far paint a mixed picture: recipients report better mental health and modest gains in entrepreneurial activity, but the schemes are too short and too small to settle the larger questions. UBI, in short, has become a serious experiment rather than a confirmed policy.`,
    instructions: "Skim the passage and choose the BEST answer.",
    options: [
      { label: "A", text: "A balanced summary of UBI debates and pilot results so far" },
      { label: "B", text: "A campaign speech in favour of universal basic income" },
      { label: "C", text: "A guide to applying for UBI in Finland" },
      { label: "D", text: "An attack on automation in the workplace" },
    ],
    items: [{ prompt: "What is the writer's main purpose?", answer: "A" }],
    analysis:
`A is correct. The passage presents both arguments and notes that trial evidence is mixed and inconclusive. B is wrong (the writer is balanced, not advocating). C is wrong (no application instructions). D is wrong (automation is just one mention).`,
  },

  // ───────────────────── Multiple Choice · A2 (need +6) ─────────────────────
  {
    id: "mc-a2-501", type: "multiple_choice", level: "A2",
    title: "A New Hobby", topic: "Hobbies",
    passage:
`Last year I began to learn the guitar. At first, my fingers hurt and the music sounded bad. After a few months of practice, I could play simple songs. Now I play for thirty minutes every evening. My family says my music is much better than before.`,
    instructions: "Choose the BEST answer.",
    options: [
      { label: "A", text: "The writer started learning the guitar last week." },
      { label: "B", text: "The writer practises every morning." },
      { label: "C", text: "The writer's playing has improved with practice." },
      { label: "D", text: "The writer's family does not like the music." },
    ],
    items: [{ prompt: "Which statement is true?", answer: "C" }],
    analysis:
`C is correct. "I could play simple songs" and "much better than before" show improvement. A is wrong (the writer began LAST YEAR, not last week). B is wrong (practice happens in the EVENING). D is wrong (the family says the music is much better — they like it).`,
  },
  {
    id: "mc-a2-502", type: "multiple_choice", level: "A2",
    title: "The School Trip", topic: "School · Travel",
    passage:
`On Friday, our class went on a trip to a farm. The bus left school at 8 a.m. and arrived at 9:30. We saw cows, sheep and many chickens. Lunch was a sandwich and an apple. We came back to school at 4 p.m. Everyone said the trip was great fun.`,
    instructions: "Choose the BEST answer.",
    options: [
      { label: "A", text: "The bus journey to the farm took 30 minutes." },
      { label: "B", text: "The class saw cows, sheep and chickens." },
      { label: "C", text: "The students had lunch at a restaurant." },
      { label: "D", text: "The trip was on a Saturday." },
    ],
    items: [{ prompt: "Which statement is true?", answer: "B" }],
    analysis:
`B is correct — the three animals are listed directly. A is wrong (the journey took 1 hour 30 minutes, from 8:00 to 9:30). C is wrong (lunch was a sandwich, not at a restaurant). D is wrong (the trip was on FRIDAY).`,
  },
  {
    id: "mc-a2-503", type: "multiple_choice", level: "A2",
    title: "My Brother Tom", topic: "Family",
    passage:
`My brother Tom is 17. He likes football and computer games. He does not like reading books. After school, he often goes to the park to play football with his friends. On Sundays, he helps our father wash the car. My mother says Tom is a good boy.`,
    instructions: "Choose the BEST answer.",
    options: [
      { label: "A", text: "Tom is younger than 15." },
      { label: "B", text: "Tom loves reading novels." },
      { label: "C", text: "Tom helps his father on Sundays." },
      { label: "D", text: "Tom plays football at home." },
    ],
    items: [{ prompt: "Which statement is true?", answer: "C" }],
    analysis:
`C is correct — "On Sundays, he helps our father wash the car." A is wrong (Tom is 17). B is wrong (he does NOT like reading). D is wrong (he plays football at the PARK).`,
  },
  {
    id: "mc-a2-504", type: "multiple_choice", level: "A2",
    title: "Maria the Doctor", topic: "Jobs · People",
    passage:
`Maria is a doctor in a small hospital. She begins work at 7 in the morning and finishes at 7 in the evening. She helps sick children. Maria likes her job, but she is often very tired. On her day off, she sleeps a lot and reads a book.`,
    instructions: "Choose the BEST answer.",
    options: [
      { label: "A", text: "Maria works for twelve hours each day." },
      { label: "B", text: "Maria is a teacher in a school." },
      { label: "C", text: "Maria works only with old people." },
      { label: "D", text: "Maria likes to play sports on her day off." },
    ],
    items: [{ prompt: "Which statement is true?", answer: "A" }],
    analysis:
`A is correct (7 a.m. to 7 p.m. = 12 hours). B is wrong (she is a doctor, not a teacher). C is wrong (she helps children, not old people). D is wrong (on her day off she sleeps and reads, not plays sports).`,
  },
  {
    id: "mc-a2-505", type: "multiple_choice", level: "A2",
    title: "The Lost Phone", topic: "Daily life",
    passage:
`Yesterday, I lost my phone in the park. I looked under the trees and on the bench but I could not find it. I went home and called my number. A kind woman answered. She found the phone and took it home. Today she gave it back to me.`,
    instructions: "Choose the BEST answer.",
    options: [
      { label: "A", text: "The writer lost the phone at school." },
      { label: "B", text: "A kind woman found the phone." },
      { label: "C", text: "The writer never found the phone again." },
      { label: "D", text: "The phone was broken." },
    ],
    items: [{ prompt: "Which statement is true?", answer: "B" }],
    analysis:
`B is correct — "A kind woman answered… She found the phone." A is wrong (the writer lost it in the PARK). C is wrong (today the phone was returned). D is wrong (no damage is mentioned).`,
  },
  {
    id: "mc-a2-506", type: "multiple_choice", level: "A2",
    title: "Cooking with Grandma", topic: "Family · Food",
    passage:
`Every Saturday, I cook with my grandma. She teaches me to make traditional dishes from her village. Last week we made bread and a vegetable soup. The bread was hot and very tasty. My grandma always says, "Cooking is love." She is the best teacher in the world.`,
    instructions: "Choose the BEST answer.",
    options: [
      { label: "A", text: "The writer cooks with grandma every day." },
      { label: "B", text: "Grandma teaches the writer modern recipes." },
      { label: "C", text: "Last week they made bread and soup." },
      { label: "D", text: "The bread was cold and bad." },
    ],
    items: [{ prompt: "Which statement is true?", answer: "C" }],
    analysis:
`C is correct — "Last week we made bread and a vegetable soup." A is wrong (only on Saturdays). B is wrong (TRADITIONAL dishes, not modern). D is wrong (the bread was hot and tasty).`,
  },

  // ───────────────────── Multiple Choice · B2 (need +6) ─────────────────────
  {
    id: "mc-b2-901", type: "multiple_choice", level: "B2",
    title: "The Slow Food Movement", topic: "Food · Culture",
    passage:
`Founded in Italy in the late 1980s as a protest against the opening of a fast-food chain near the Spanish Steps in Rome, the Slow Food movement has grown into a global network of "convivia" promoting regional cuisines, biodiversity in agriculture, and what its founders termed the right to "good, clean and fair" food. Critics complain that the movement is elitist — its produce often costs more than industrial alternatives — and that its romantic image of small-scale farming overlooks the economic realities facing rural communities. Supporters retort that paying the true price of food is precisely what protects soil, livelihoods and culinary heritage from being eroded by commodity markets.`,
    instructions: "Choose the BEST answer.",
    options: [
      { label: "A", text: "The movement was founded as opposition to a particular fast-food restaurant in Rome." },
      { label: "B", text: "The movement now exists only in Italy." },
      { label: "C", text: "Critics agree that the movement is universally affordable." },
      { label: "D", text: "Supporters claim that low prices are central to slow food values." },
    ],
    items: [{ prompt: "Which statement is supported by the passage?", answer: "A" }],
    analysis:
`A is correct — paraphrases "as a protest against the opening of a fast-food chain near the Spanish Steps in Rome." B is wrong (it is a "global network"). C is wrong (critics say it is ELITIST and EXPENSIVE). D is wrong (supporters in fact defend the higher "true price").`,
  },
  {
    id: "mc-b2-902", type: "multiple_choice", level: "B2",
    title: "Bioluminescence", topic: "Marine biology",
    passage:
`Bioluminescence — the production of light by living organisms — is overwhelmingly a feature of the deep ocean, where sunlight does not penetrate and animals must generate their own. The phenomenon serves a remarkable variety of purposes: anglerfish dangle glowing lures to attract prey, certain shrimps eject luminous clouds to confuse predators, and many fish carry counter-illuminating organs on their bellies that erase their silhouettes when viewed from below. On land, bioluminescence is far rarer; fireflies and a handful of fungi are the best-known examples, and even these have evolved their light-producing chemistry independently rather than from a shared ancestor.`,
    instructions: "Choose the BEST answer.",
    options: [
      { label: "A", text: "Most bioluminescent species live in shallow lit waters." },
      { label: "B", text: "Bioluminescence has only one biological function." },
      { label: "C", text: "Land-based bioluminescence evolved separately in different organisms." },
      { label: "D", text: "Anglerfish use light primarily to attract mates." },
    ],
    items: [{ prompt: "Which statement is supported by the passage?", answer: "C" }],
    analysis:
`C is correct — "even these have evolved their light-producing chemistry independently rather than from a shared ancestor." A is wrong (it is overwhelmingly a DEEP-OCEAN feature). B is wrong (the passage lists at least three different functions). D is wrong (anglerfish use it to attract PREY, not mates).`,
  },
  {
    id: "mc-b2-903", type: "multiple_choice", level: "B2",
    title: "The Hubble Telescope", topic: "Astronomy",
    passage:
`Launched in 1990 with high expectations, the Hubble Space Telescope nearly became one of NASA's most embarrassing failures: a manufacturing flaw left its primary mirror unable to focus light correctly. Three years later, a daring shuttle mission installed corrective optics, and Hubble began producing the deep-field images that have since reshaped our understanding of galaxy formation, the age of the universe and the existence of dark energy. Although newer instruments such as the James Webb Space Telescope now capture infrared light Hubble cannot, Hubble's continuing observations in visible and ultraviolet wavelengths remain scientifically irreplaceable.`,
    instructions: "Choose the BEST answer.",
    options: [
      { label: "A", text: "Hubble's mirror flaw was repaired by replacing the entire telescope." },
      { label: "B", text: "Corrective optics were installed on a later space-shuttle mission." },
      { label: "C", text: "The James Webb Telescope makes Hubble entirely obsolete." },
      { label: "D", text: "Hubble was launched in 1993." },
    ],
    items: [{ prompt: "Which statement is supported by the passage?", answer: "B" }],
    analysis:
`B is correct — "Three years later, a daring shuttle mission installed corrective optics." A is wrong (the mirror was corrected with optics, not replaced). C is wrong (the passage explicitly says Hubble remains "irreplaceable" in some wavelengths). D is wrong (it was launched in 1990, not 1993).`,
  },
  {
    id: "mc-b2-904", type: "multiple_choice", level: "B2",
    title: "The Birth of the Detective Novel", topic: "Literature",
    passage:
`Although crime stories existed long before the nineteenth century, the modern detective novel is generally traced to Edgar Allan Poe's 1841 tale "The Murders in the Rue Morgue", in which the eccentric Auguste Dupin solves an apparently impossible crime through pure ratiocination. The form was decisively popularised by Arthur Conan Doyle some four decades later, whose Sherlock Holmes added a clinical interest in physical evidence to Dupin's logical method. By the early twentieth century, writers such as Agatha Christie were elaborating elaborate puzzle plots that invited the reader to compete with the detective — a convention that still defines mainstream crime fiction today.`,
    instructions: "Choose the BEST answer.",
    options: [
      { label: "A", text: "Sherlock Holmes is identified as the very first fictional detective." },
      { label: "B", text: "Christie's novels rejected the puzzle-plot tradition." },
      { label: "C", text: "Holmes built on Dupin by adding emphasis on physical evidence." },
      { label: "D", text: "Crime stories did not exist before the nineteenth century." },
    ],
    items: [{ prompt: "Which statement is supported by the passage?", answer: "C" }],
    analysis:
`C is correct — "added a clinical interest in physical evidence to Dupin's logical method." A is wrong (the passage credits Poe's Dupin first). B is wrong (Christie elaborated puzzle plots). D is wrong (the passage notes crime stories existed long before the nineteenth century).`,
  },
  {
    id: "mc-b2-905", type: "multiple_choice", level: "B2",
    title: "Mass Transit and Air Quality", topic: "Urban planning",
    passage:
`Few interventions improve a city's air quality as quickly as a well-designed mass-transit network. When a single bus or metro train replaces dozens of private cars, the per-passenger emissions of nitrogen dioxide and fine particulate matter fall sharply. The benefits, however, depend heavily on whether the new service is fast and reliable enough to attract drivers out of their vehicles. Studies of metro openings in cities from Bangalore to Buenos Aires show clear short-term drops in pollution along affected corridors, but these gains can erode within years if road traffic itself rebounds, often because the freed-up space encourages new car journeys.`,
    instructions: "Choose the BEST answer.",
    options: [
      { label: "A", text: "All metro openings produce permanent pollution reductions." },
      { label: "B", text: "Pollution gains can be undone if road traffic rebounds." },
      { label: "C", text: "Mass-transit benefits are independent of service quality." },
      { label: "D", text: "Per-passenger emissions rise when buses replace cars." },
    ],
    items: [{ prompt: "Which statement is supported by the passage?", answer: "B" }],
    analysis:
`B is correct — "these gains can erode within years if road traffic itself rebounds." A is wrong (gains can erode). C is wrong (benefits depend on service being fast and reliable). D is wrong (emissions FALL).`,
  },
  {
    id: "mc-b2-906", type: "multiple_choice", level: "B2",
    title: "The Origin of Tea Drinking", topic: "Food · History",
    passage:
`Although legend traces tea to a Chinese emperor in the third millennium BCE, the earliest reliable evidence of cultivated tea consumption dates to the Han dynasty, where it was prized as a medicinal infusion before becoming an everyday beverage. By the Tang dynasty, tea had spread along trade routes to Tibet, Korea and Japan, each region developing its own preparation rituals. European traders encountered tea only in the seventeenth century, but within decades it had transformed British social life, prompting both an empire-wide trade in Chinese leaves and, eventually, the establishment of tea plantations in colonial India and Ceylon to break that monopoly.`,
    instructions: "Choose the BEST answer.",
    options: [
      { label: "A", text: "Reliable evidence places cultivated tea use in the Han dynasty rather than the third millennium BCE." },
      { label: "B", text: "Europeans encountered tea before the Han dynasty." },
      { label: "C", text: "Tea reached Japan only in the seventeenth century." },
      { label: "D", text: "Indian plantations were established to supply China with tea." },
    ],
    items: [{ prompt: "Which statement is supported by the passage?", answer: "A" }],
    analysis:
`A is correct — the writer contrasts the legendary date with "the earliest reliable evidence" in the Han dynasty. B is wrong (Europeans only encountered tea in the seventeenth century). C is wrong (Japan received it via Tang-dynasty trade routes). D is wrong (Indian plantations were set up to BREAK the Chinese monopoly).`,
  },

  // ───────────────────── List Selection · A2 (need +4) ─────────────────────
  {
    id: "ls-a2-501", type: "list_selection", level: "A2",
    title: "Things in Lily's Bag", topic: "Daily life",
    passage:
`Lily is going to school. In her school bag she has two books, a pencil case, an apple and a small bottle of water. She does not have her tablet today because she forgot it at home. She also has a pink umbrella because the sky is grey.`,
    instructions: "Which THREE items are in Lily's bag today? Choose three.",
    options: [
      { label: "A", text: "Books" },
      { label: "B", text: "A tablet" },
      { label: "C", text: "An apple" },
      { label: "D", text: "An umbrella" },
      { label: "E", text: "A laptop" },
    ],
    items: [{ prompt: "Choose THREE items in Lily's bag.", answer: ["A", "C", "D"] }],
    analysis:
`A — "two books". C — "an apple". D — "a pink umbrella". B is wrong: the tablet is at home. E is wrong: a laptop is never mentioned.`,
  },
  {
    id: "ls-a2-502", type: "list_selection", level: "A2",
    title: "What Sam Likes to Eat", topic: "Food",
    passage:
`Sam is six years old. For breakfast he loves milk and toast with butter. He also enjoys eating bananas and oranges. Sam does not like fish or onions. After dinner, his favourite thing is a small piece of chocolate.`,
    instructions: "Which THREE foods does Sam like? Choose three.",
    options: [
      { label: "A", text: "Toast" },
      { label: "B", text: "Fish" },
      { label: "C", text: "Bananas" },
      { label: "D", text: "Onions" },
      { label: "E", text: "Chocolate" },
    ],
    items: [{ prompt: "Choose THREE foods Sam likes.", answer: ["A", "C", "E"] }],
    analysis:
`A — "toast with butter". C — "bananas and oranges". E — "his favourite thing is a small piece of chocolate". B and D are wrong: Sam does NOT like fish or onions.`,
  },
  {
    id: "ls-a2-503", type: "list_selection", level: "A2",
    title: "At the Park", topic: "Free time",
    passage:
`On Sunday morning, my family went to the park. We saw children riding bikes, an old man feeding the ducks, and two women jogging together. There was no swimming pool, and we did not see any horses. Some boys were playing football near the trees.`,
    instructions: "Which THREE things happened at the park? Choose three.",
    options: [
      { label: "A", text: "Children rode bikes" },
      { label: "B", text: "People swam in a pool" },
      { label: "C", text: "Boys played football" },
      { label: "D", text: "An old man fed the ducks" },
      { label: "E", text: "Children rode horses" },
    ],
    items: [{ prompt: "Choose THREE things that happened at the park.", answer: ["A", "C", "D"] }],
    analysis:
`A, C and D are stated directly. B is wrong: "There was no swimming pool." E is wrong: "we did not see any horses."`,
  },
  {
    id: "ls-a2-504", type: "list_selection", level: "A2",
    title: "Things Mia Can Do", topic: "Skills",
    passage:
`Mia is eleven. She can speak two languages, English and Spanish. She is very good at swimming and can also ride a horse. However, Mia cannot drive a car (she is too young) and she cannot play the piano.`,
    instructions: "Which THREE things can Mia do? Choose three.",
    options: [
      { label: "A", text: "Drive a car" },
      { label: "B", text: "Speak Spanish" },
      { label: "C", text: "Swim" },
      { label: "D", text: "Play the piano" },
      { label: "E", text: "Ride a horse" },
    ],
    items: [{ prompt: "Choose THREE things Mia can do.", answer: ["B", "C", "E"] }],
    analysis:
`B — "She can speak two languages, English and Spanish." C — "good at swimming". E — "can also ride a horse". A is wrong: Mia "cannot drive a car". D is wrong: Mia "cannot play the piano".`,
  },

  // ───────────────────── List Selection · B2 (need +4) ─────────────────────
  {
    id: "ls-b2-901", type: "list_selection", level: "B2",
    title: "Designing Walkable Cities", topic: "Urban planning",
    passage:
`Urban planners increasingly judge a neighbourhood's quality of life by how easily its residents can complete daily errands on foot. Studies of "fifteen-minute" districts identify several recurring features: continuous and well-shaded pavements, building entrances that face the street rather than parking lots, a fine grain of small commercial premises rather than a single shopping centre, and traffic speeds low enough — typically under thirty kilometres per hour — for pedestrians to feel safe at junctions. By contrast, broad arterial roads, cul-de-sacs and large surface car parks have all been shown to depress walking, even when destinations exist within technical walking distance.`,
    instructions: "Which THREE features are described as supporting walkability? Choose three.",
    options: [
      { label: "A", text: "Continuous and shaded pavements" },
      { label: "B", text: "Single large shopping centres" },
      { label: "C", text: "A fine grain of small commercial premises" },
      { label: "D", text: "Traffic speeds below 30 km/h" },
      { label: "E", text: "Cul-de-sacs and large car parks" },
    ],
    items: [{ prompt: "Choose THREE walkability-supporting features.", answer: ["A", "C", "D"] }],
    analysis:
`A, C and D are listed directly as supportive features. B is the OPPOSITE — fine-grain commercial is preferred to a single large centre. E is described as DEPRESSING walking, not supporting it.`,
  },
  {
    id: "ls-b2-902", type: "list_selection", level: "B2",
    title: "Strategies for Mitigating Wildfires", topic: "Environment",
    passage:
`As fire seasons lengthen across temperate regions, land-management agencies have refocused on a portfolio of measures whose effectiveness is now well documented. Prescribed burns, conducted under controlled conditions, reduce the build-up of fuel that would otherwise feed catastrophic fires. Mechanical thinning of overgrown forests achieves a similar end where burning is impractical. Defensible-space programmes, which clear vegetation immediately around buildings, dramatically lower property losses. By contrast, blanket fire-suppression policies — once central to forestry doctrine — are now widely understood to have made many landscapes more, not less, vulnerable by allowing dense undergrowth to accumulate.`,
    instructions: "Which THREE measures are described as effective wildfire-mitigation strategies? Choose three.",
    options: [
      { label: "A", text: "Prescribed burns" },
      { label: "B", text: "Mechanical thinning of forests" },
      { label: "C", text: "Defensible-space clearing around buildings" },
      { label: "D", text: "Blanket fire-suppression policies" },
      { label: "E", text: "Allowing dense undergrowth to accumulate" },
    ],
    items: [{ prompt: "Choose THREE effective measures.", answer: ["A", "B", "C"] }],
    analysis:
`A, B and C are explicitly endorsed. D is rejected — blanket suppression has made landscapes MORE vulnerable. E describes the harmful CONSEQUENCE of D, not a strategy.`,
  },
  {
    id: "ls-b2-903", type: "list_selection", level: "B2",
    title: "Features of Effective Online Learning", topic: "Education",
    passage:
`Meta-analyses of online courses identify several design choices that consistently raise completion and learning outcomes. Short, segmented video lectures perform better than long monologues, particularly when paired with brief, frequent retrieval-practice quizzes. Active discussion forums moderated by an instructor sustain engagement far more effectively than purely solitary study. Crucially, courses that release content week by week — rather than dumping all material at once — produce higher completion rates by structuring learner time. By contrast, recorded face-to-face lectures simply uploaded to a server, with no further adaptation, have repeatedly been shown to be among the LEAST effective formats.`,
    instructions: "Which THREE design choices raise outcomes in online courses? Choose three.",
    options: [
      { label: "A", text: "Short segmented video lectures" },
      { label: "B", text: "Frequent retrieval-practice quizzes" },
      { label: "C", text: "Releasing all content at once" },
      { label: "D", text: "Moderated discussion forums" },
      { label: "E", text: "Plain uploads of long live lectures" },
    ],
    items: [{ prompt: "Choose THREE effective design choices.", answer: ["A", "B", "D"] }],
    analysis:
`A, B and D are listed as boosters. C is the OPPOSITE — courses that release content week by week perform better. E is identified as one of the LEAST effective formats.`,
  },
  {
    id: "ls-b2-904", type: "list_selection", level: "B2",
    title: "Conditions Favouring Coral Reef Recovery", topic: "Marine biology",
    passage:
`Reefs that recover after bleaching events tend to share a recognisable set of conditions. Cooler-than-average local water temperatures, often produced by strong upwelling, give heat-stressed corals breathing space. Healthy populations of grazing parrotfish keep algal overgrowth in check, allowing larvae to settle on bare substrate. Marine protected areas, which exclude destructive fishing practices, consistently host faster recoveries. By contrast, reefs near agricultural run-off — laden with nutrients that feed algae — and those subjected to repeated heat stress within a single decade show little capacity to bounce back.`,
    instructions: "Which THREE conditions favour reef recovery? Choose three.",
    options: [
      { label: "A", text: "Cooler local water temperatures from upwelling" },
      { label: "B", text: "Healthy populations of parrotfish" },
      { label: "C", text: "Heavy nutrient run-off from farms" },
      { label: "D", text: "Marine protected areas" },
      { label: "E", text: "Repeated heat stress within a decade" },
    ],
    items: [{ prompt: "Choose THREE recovery-favouring conditions.", answer: ["A", "B", "D"] }],
    analysis:
`A, B and D are listed directly as recovery-supporting. C is the OPPOSITE — agricultural run-off prevents recovery. E is also negative — repeated heat stress means little capacity to bounce back.`,
  },

  // ───────────────────── Choose a Title · A2 (need +4) ─────────────────────
  {
    id: "ct-a2-501", type: "choose_title", level: "A2",
    title: "Choose a title — Pets at Home", topic: "Pets",
    passage:
`Many people in our city keep pets. Cats are the most popular animal because they are quiet and clean. Dogs are also common, but they need more time and long walks. Some families have small birds or fish. Pets make the home a happier place.`,
    instructions: "Choose the BEST title for the whole passage.",
    options: [
      { label: "A", text: "Why dogs need long walks" },
      { label: "B", text: "Common pets in our city" },
      { label: "C", text: "How to clean a cat" },
      { label: "D", text: "Small birds in the wild" },
    ],
    items: [{ prompt: "What is the best title?", answer: "B" }],
    analysis:
`B covers the WHOLE passage (cats, dogs, birds, fish in the city). A, C and D each cover only ONE small detail.`,
  },
  {
    id: "ct-a2-502", type: "choose_title", level: "A2",
    title: "Choose a title — Healthy Breakfast", topic: "Health · Food",
    passage:
`Doctors say breakfast is very important. A good breakfast gives you energy for the morning. Try to eat fruit, eggs, and bread or rice. Drinking water or milk is better than sugary drinks. People who eat breakfast often feel happier and study better at school.`,
    instructions: "Choose the BEST title for the passage.",
    options: [
      { label: "A", text: "Why breakfast is important and what to eat" },
      { label: "B", text: "How to make bread at home" },
      { label: "C", text: "Sugary drinks for children" },
      { label: "D", text: "School timetables in our city" },
    ],
    items: [{ prompt: "What is the best title?", answer: "A" }],
    analysis:
`A covers BOTH the importance (energy, happier, study better) AND what to eat (fruit, eggs, bread). B, C and D each cover only one minor detail.`,
  },
  {
    id: "ct-a2-503", type: "choose_title", level: "A2",
    title: "Choose a title — Buses in Our City", topic: "Transport",
    passage:
`In our city, buses are the cheapest way to travel. A ticket costs only one dollar and you can use it all day. Buses are also good for the environment because one bus carries many people. The buses come every ten minutes from 6 a.m. to 11 p.m.`,
    instructions: "Choose the BEST title for the passage.",
    options: [
      { label: "A", text: "Why buses are a good way to travel in our city" },
      { label: "B", text: "How to drive a city bus" },
      { label: "C", text: "Dollar coins around the world" },
      { label: "D", text: "Trains in the morning" },
    ],
    items: [{ prompt: "What is the best title?", answer: "A" }],
    analysis:
`A covers all three reasons (price, environment, frequency). B, C and D are unrelated to the main topic.`,
  },
  {
    id: "ct-a2-504", type: "choose_title", level: "A2",
    title: "Choose a title — Helping at Home", topic: "Family · Daily life",
    passage:
`In my family, every person helps at home. My mother cooks and my father cleans the kitchen. My older brother washes the car. My little sister and I water the plants and feed our cat. We all enjoy our jobs because we work together.`,
    instructions: "Choose the BEST title for the passage.",
    options: [
      { label: "A", text: "How to wash a car at home" },
      { label: "B", text: "Cats and their food" },
      { label: "C", text: "How my family shares the housework" },
      { label: "D", text: "My mother's favourite recipes" },
    ],
    items: [{ prompt: "What is the best title?", answer: "C" }],
    analysis:
`C covers EVERYONE in the family doing different jobs. A, B and D each pick only one small detail.`,
  },

  // ───────────────────── Choose a Title · B2 (need +4) ─────────────────────
  {
    id: "ct-b2-901", type: "choose_title", level: "B2",
    title: "Choose a title — Algorithmic Bias", topic: "Technology · Ethics",
    passage:
`Machine-learning systems are increasingly used to screen job applications, set insurance premiums and inform criminal-justice decisions. Yet repeated audits have shown that, when trained on historical data, such systems can reproduce — and even amplify — patterns of human prejudice they were intended to remove. Mitigation strategies include curating more representative training sets, building "fairness constraints" directly into model objectives, and submitting deployed systems to independent statistical audits. None of these is a complete remedy, however, and many ethicists argue that some high-stakes decisions should remain firmly in human hands until accountability frameworks catch up with the technology.`,
    instructions: "Choose the BEST title for the whole passage.",
    options: [
      { label: "A", text: "How to write a machine-learning algorithm" },
      { label: "B", text: "Algorithmic bias: causes, mitigations and limits" },
      { label: "C", text: "Insurance premiums in modern markets" },
      { label: "D", text: "A history of automated job interviews" },
    ],
    items: [{ prompt: "What is the best title?", answer: "B" }],
    analysis:
`B captures the three movements of the passage: causes, mitigations and limits. A is wrong (no programming instruction). C and D each pick a minor example, not the topic.`,
  },
  {
    id: "ct-b2-902", type: "choose_title", level: "B2",
    title: "Choose a title — Microplastics in Drinking Water", topic: "Environment · Health",
    passage:
`Microplastic fragments — particles smaller than five millimetres — have now been detected in tap water, bottled water and even rainwater across every inhabited continent. Their source is varied: synthetic textile fibres released by washing machines, the gradual breakdown of larger plastic litter, and abrasion of vehicle tyres on road surfaces. The health implications remain only partially understood; small studies have linked microplastic exposure to inflammatory responses, but no large epidemiological trial has yet been completed. In the meantime, water utilities are exploring filtration upgrades while regulators debate whether to set the world's first legal limits on microplastic content.`,
    instructions: "Choose the BEST title for the passage.",
    options: [
      { label: "A", text: "How washing machines work" },
      { label: "B", text: "Microplastics in drinking water: sources, risks and responses" },
      { label: "C", text: "Why bottled water tastes different" },
      { label: "D", text: "A guide to home water-filter brands" },
    ],
    items: [{ prompt: "What is the best title?", answer: "B" }],
    analysis:
`B covers all three movements: sources, risks and responses. A and C are minor mentions. D is wrong (no brand guide).`,
  },
  {
    id: "ct-b2-903", type: "choose_title", level: "B2",
    title: "Choose a title — Gut Microbiome", topic: "Medicine",
    passage:
`The trillions of bacteria, archaea and fungi that inhabit the human digestive tract — collectively termed the gut microbiome — were long dismissed as inert passengers. The last two decades of research have rewritten that view: microbial communities are now implicated in immune training, vitamin synthesis, mood regulation and even the metabolism of many oral medicines. Yet the field is also marked by exaggerated claims, with commercial probiotics often promising benefits the underlying evidence does not support. Cautious clinicians distinguish between clear therapeutic uses, such as faecal transplants for stubborn intestinal infections, and the much wider, still-unproven marketplace of "gut-health" products.`,
    instructions: "Choose the BEST title for the passage.",
    options: [
      { label: "A", text: "How to start your own probiotic business" },
      { label: "B", text: "The gut microbiome: emerging science amid commercial hype" },
      { label: "C", text: "A cookbook for stomach health" },
      { label: "D", text: "The history of bacteria classification" },
    ],
    items: [{ prompt: "What is the best title?", answer: "B" }],
    analysis:
`B captures both the new science and the gap between evidence and marketing. A, C and D are unrelated or far too narrow.`,
  },
  {
    id: "ct-b2-904", type: "choose_title", level: "B2",
    title: "Choose a title — The Decline of Insect Populations", topic: "Ecology",
    passage:
`Long-running monitoring programmes in Germany, the United Kingdom and elsewhere have documented sharp declines — sometimes exceeding seventy per cent over thirty years — in the total biomass of flying insects in protected nature reserves. The causes appear to be multiple and interacting: agricultural intensification, neonicotinoid pesticides, light pollution, the loss of hedgerows and field margins, and a warming climate that disrupts the timing of life cycles. Because insects pollinate the majority of flowering plants and form the base of countless food webs, ecologists warn that the implications extend far beyond entomology — affecting crop yields, songbird populations and broader ecosystem stability.`,
    instructions: "Choose the BEST title for the passage.",
    options: [
      { label: "A", text: "Insect decline: extent, causes and wider consequences" },
      { label: "B", text: "How to identify British hedgerow plants" },
      { label: "C", text: "A history of German nature reserves" },
      { label: "D", text: "The biology of a single beetle species" },
    ],
    items: [{ prompt: "What is the best title?", answer: "A" }],
    analysis:
`A covers the three movements: scale of decline, causes and consequences. B, C and D each pick a minor reference rather than the central theme.`,
  },
];

export default supplements;
