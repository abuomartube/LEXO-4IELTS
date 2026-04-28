import type { SkillExercise } from "./reading-skills";

const supplements: SkillExercise[] = [
  // ───── 1. Skimming (B1) — 10 new items ─────
  {
    id: "sk-b1-201",
    type: "skimming",
    level: "B1",
    title: "Electric Cars Go Mainstream",
    topic: "Technology · Transport",
    passage:
`Electric cars were once a curiosity reserved for hobbyists and wealthy early adopters, but in the past decade they have become a familiar sight on city streets. Falling battery prices, longer driving ranges and a rapidly growing network of charging stations have all helped to push the technology into the mainstream. Many governments now offer tax breaks or grants to encourage drivers to switch, and several countries have announced plans to ban the sale of new petrol and diesel cars within the next fifteen years. Critics still point to long charging times and the environmental cost of producing batteries. Even so, most analysts agree that the shift away from fossil fuels is well under way, and that within a generation the petrol engine is likely to seem as old-fashioned as the steam locomotive does today.`,
    instructions: "Skim the passage and choose the BEST answer.",
    options: [
      { label: "A", text: "How petrol engines are manufactured" },
      { label: "B", text: "Why electric cars are becoming common and what that change means" },
      { label: "C", text: "A history of the steam locomotive" },
      { label: "D", text: "How to install a home charging station" },
    ],
    items: [
      { prompt: "What is the main topic of the passage?", answer: "B" },
    ],
    analysis:
`B is correct. The passage tracks the rise of electric cars (cheaper batteries, more chargers, government support) and discusses what the shift means for the future.

A is wrong: petrol engines are mentioned only as something being phased out.
C is wrong: the steam locomotive appears in a single comparison at the end.
D is wrong: charging stations are mentioned, but installation is never explained.

Skimming tip: a balanced text that covers causes AND consequences usually points to a "what is happening and why it matters" title.`,
  },
  {
    id: "sk-b1-202",
    type: "skimming",
    level: "B1",
    title: "The Return of City Bicycles",
    topic: "Urban life · Transport",
    passage:
`Cycling has made a remarkable comeback in many large cities. After decades in which traffic planning was designed almost entirely around the car, mayors from Paris to Bogotá have begun to redraw their streets, adding protected bike lanes, lowering urban speed limits and rolling out public bike-share schemes. The reasons are partly environmental, since bicycles produce no exhaust fumes and very little noise, and partly economic, because moving people on bikes takes far less expensive infrastructure than moving them in cars. Health authorities also point out that regular cycling reduces rates of heart disease and obesity. Of course, not every resident is convinced: shopkeepers sometimes worry that fewer parking spaces will hurt trade, and some drivers complain that road space has been taken away. Yet, in cities that have stuck with the changes, surveys show that quality of life ratings have generally risen.`,
    instructions: "Skim the passage and choose the BEST answer.",
    options: [
      { label: "A", text: "To advertise a new bike-share company" },
      { label: "B", text: "To argue that all cars should be banned from cities" },
      { label: "C", text: "To describe the comeback of cycling and the reasons behind it" },
      { label: "D", text: "To explain how to choose a bicycle for commuting" },
    ],
    items: [
      { prompt: "The writer's main purpose is to…", answer: "C" },
    ],
    analysis:
`C is correct. The text describes the comeback ("cycling has made a remarkable comeback") and gives the reasons (environmental, economic, health) plus the objections.

A is wrong: no specific company is named.
B is wrong: the passage never argues for banning cars; it presents both supporters and critics.
D is wrong: choosing a bike is never discussed.

Skimming tip: when a writer presents arguments FROM BOTH SIDES, the purpose is to INFORM or DESCRIBE, not to PERSUADE.`,
  },
  {
    id: "sk-b1-203",
    type: "skimming",
    level: "B1",
    title: "The Hidden Life of Soil",
    topic: "Science · Environment",
    passage:
`When we look at a handful of garden soil, it seems like simple brown earth. In reality, that handful contains more living organisms than there are humans on the planet. Bacteria, fungi, tiny worms and countless insects work continuously to break down dead leaves, recycle nutrients and create the dark, crumbly material that plants need to grow. Healthy soil also holds large amounts of water, helping fields survive periods of drought, and stores enormous quantities of carbon that would otherwise add to climate change. Unfortunately, intensive farming methods, heavy machinery and the overuse of chemical fertilisers have damaged soils in many parts of the world. Restoring them is now seen as one of the most important environmental tasks of the coming decades, and farmers are experimenting with cover crops, reduced ploughing and natural composts to bring their soils back to life.`,
    instructions: "Skim the passage and choose the BEST answer.",
    options: [
      { label: "A", text: "How to set up a small garden at home" },
      { label: "B", text: "Why soil is alive, important, and now in need of protection" },
      { label: "C", text: "The history of chemical fertilisers" },
      { label: "D", text: "Different types of insects found in gardens" },
    ],
    items: [
      { prompt: "What is the main idea of the passage?", answer: "B" },
    ],
    analysis:
`B is correct. The passage moves from "soil is full of life" to "soil is important" to "we have damaged it and must restore it" — three sides of one big idea.

A is wrong: setting up a garden is never explained.
C is wrong: chemical fertilisers are mentioned only as a cause of damage.
D is wrong: insects appear briefly in a list of organisms.

Skimming tip: read the topic sentence of each paragraph — together they often outline the main idea of the whole text.`,
  },
  {
    id: "sk-b1-204",
    type: "skimming",
    level: "B1",
    title: "Why People Volunteer",
    topic: "Society · Psychology",
    passage:
`Around the world, hundreds of millions of people give up time each week to help in soup kitchens, coach junior football teams, plant trees, or visit elderly neighbours. Researchers who study why people volunteer have found that motivations are surprisingly varied. Some volunteers are driven by religious or moral beliefs, others by a wish to repay help they themselves received in the past. Many younger volunteers are partly motivated by the hope of building skills, contacts and experience that will help them find paid work later. Whatever the reason for starting, regular volunteers report that the activity itself brings unexpected rewards. Studies consistently show lower rates of depression, stronger social networks and even slightly longer life expectancy among people who give time to others. Far from being purely selfless, volunteering seems to be one of those rare activities that benefits the giver almost as much as the receiver.`,
    instructions: "Skim the passage and choose the BEST answer.",
    options: [
      { label: "A", text: "How charities should advertise for new volunteers" },
      { label: "B", text: "The various reasons people volunteer and the benefits they gain" },
      { label: "C", text: "Why young people are uninterested in volunteer work" },
      { label: "D", text: "How religious organisations are losing members" },
    ],
    items: [
      { prompt: "What is the main topic of the passage?", answer: "B" },
    ],
    analysis:
`B is correct. The passage lists motivations (religious, gratitude, career-related) and then the benefits (better mental health, longer life).

A is wrong: advertising is not discussed.
C is wrong: the passage actually says many young people DO volunteer.
D is wrong: religious organisations are mentioned only as one motivation.

Skimming tip: when a passage answers two questions — WHY people do something and WHAT they get from it — choose the title that includes both halves.`,
  },
  {
    id: "sk-b1-205",
    type: "skimming",
    level: "B1",
    title: "The Surprising Benefits of Boredom",
    topic: "Psychology",
    passage:
`Boredom is usually treated as a problem to be avoided, especially in an age when smartphones offer endless entertainment within easy reach. Yet a small but growing group of psychologists argues that being bored from time to time is genuinely good for us. When the mind has nothing pressing to do, it tends to wander, and that wandering is often where new ideas appear. Many writers and inventors describe their best thoughts arriving during long walks, slow train journeys or sleepless nights — moments that most of us would now fill with a screen. Children, in particular, seem to need empty time in order to invent imaginative games and learn how to entertain themselves. The researchers do not suggest that we should make ourselves miserable on purpose; rather, they recommend leaving some pockets of the day deliberately unscheduled, so that boredom can do its quiet, creative work.`,
    instructions: "Skim the passage and choose the BEST answer.",
    options: [
      { label: "A", text: "To prove that smartphones are dangerous for everyone" },
      { label: "B", text: "To describe new entertainment apps for children" },
      { label: "C", text: "To explain why some boredom can actually be useful" },
      { label: "D", text: "To compare children's games in different countries" },
    ],
    items: [
      { prompt: "The writer's main purpose is to…", answer: "C" },
    ],
    analysis:
`C is correct. The passage argues that boredom helps creativity ("ideas appear" while the mind wanders) and recommends leaving pockets of unscheduled time.

A is wrong: smartphones are part of the discussion, but the writer doesn't claim they are universally dangerous.
B is wrong: no apps are described.
D is wrong: countries are not compared.

Skimming tip: a passage that suggests a NEW or SURPRISING way of looking at something usually aims to PERSUADE GENTLY or REFRAME, not to advertise or warn.`,
  },
  {
    id: "sk-b1-206",
    type: "skimming",
    level: "B1",
    title: "Coffee Around the World",
    topic: "Food · Culture",
    passage:
`Coffee may be drunk almost everywhere in the world, but the way people enjoy it varies widely from country to country. In Italy, an espresso is usually drunk standing at a small bar, finished in two or three sips, and almost never ordered after lunch. In Turkey, very fine grounds are boiled together with water and sugar and served in tiny cups, often alongside a sweet snack. In Vietnam, strong filter coffee is poured over ice and sweet condensed milk to produce a rich, almost dessert-like drink. Sweden has one of the highest per-person coffee consumption rates on Earth and a special tradition called "fika", in which colleagues stop work for coffee and a pastry. Even the size of a "regular" cup differs sharply from place to place, with American mugs often holding several times the volume of an Italian espresso.`,
    instructions: "Skim the passage and choose the BEST answer.",
    options: [
      { label: "A", text: "How coffee beans are grown and harvested" },
      { label: "B", text: "Different ways of drinking coffee in various countries" },
      { label: "C", text: "Why coffee is healthier than tea" },
      { label: "D", text: "The history of the espresso machine" },
    ],
    items: [
      { prompt: "What is the main topic of the passage?", answer: "B" },
    ],
    analysis:
`B is correct. Each example (Italy, Turkey, Vietnam, Sweden, USA) describes a different national way of drinking coffee.

A is wrong: growing and harvesting are not mentioned.
C is wrong: tea is never compared with coffee.
D is wrong: the espresso machine is not described.

Skimming tip: a series of country-by-country examples usually signals a passage about CULTURAL VARIATION.`,
  },
  {
    id: "sk-b1-207",
    type: "skimming",
    level: "B1",
    title: "The Art of Negotiation",
    topic: "Business · Communication",
    passage:
`Negotiation skills are useful in almost every part of life, from agreeing the price of a second-hand car to settling complex international trade deals. Experts say that successful negotiators share a few common habits. They prepare carefully, gathering information about the other side's needs and limits before any meeting begins. They listen far more than they speak, since asking the right questions is often more useful than making strong statements. They look for solutions in which both sides gain something, rather than trying to "win" at the other person's expense. Above all, they stay calm under pressure: experienced negotiators rarely raise their voices and almost never make important decisions while angry. These habits can be learned, and many companies now invest in training so that even junior employees can handle disagreements with customers and suppliers in a professional way.`,
    instructions: "Skim the passage and choose the BEST answer.",
    options: [
      { label: "A", text: "To recommend a specific negotiation training company" },
      { label: "B", text: "To explain the common habits of skilled negotiators" },
      { label: "C", text: "To describe legal rules for international trade" },
      { label: "D", text: "To argue that anger is a useful business tool" },
    ],
    items: [
      { prompt: "The writer's main purpose is to…", answer: "B" },
    ],
    analysis:
`B is correct. The passage lists several habits of effective negotiators (preparation, listening, win-win thinking, calmness).

A is wrong: no specific company is named.
C is wrong: legal rules are never mentioned.
D is wrong: the passage actually says good negotiators stay CALM, not angry.

Skimming tip: when a passage describes a list of "what successful X people do", its purpose is almost always to INFORM or ADVISE.`,
  },
  {
    id: "sk-b1-208",
    type: "skimming",
    level: "B1",
    title: "How Cities Cope With Heat",
    topic: "Environment · Urban planning",
    passage:
`Summers in many large cities are becoming noticeably hotter, and city governments are looking for practical ways to keep streets and buildings cooler. One simple measure is to plant more street trees, since their shade can reduce surface temperatures by several degrees on a sunny day. Another is to paint roofs and pavements in light colours that reflect sunlight rather than absorbing it. Some cities are also opening "cooling centres" — air-conditioned public buildings where vulnerable residents can spend the hottest hours of the day. Architects are returning to older ideas as well, such as narrow, shaded streets and water fountains in public squares. None of these measures alone is enough, but together they can make summer in the city far more bearable, especially for elderly residents and people without air conditioning at home.`,
    instructions: "Skim the passage and choose the BEST answer.",
    options: [
      { label: "A", text: "Practical ways cities are trying to cope with hotter summers" },
      { label: "B", text: "How to design a private swimming pool" },
      { label: "C", text: "Why air conditioning should be banned" },
      { label: "D", text: "The history of European architecture" },
    ],
    items: [
      { prompt: "What is the main topic of the passage?", answer: "A" },
    ],
    analysis:
`A is correct. The passage lists several strategies (more trees, light-coloured roofs, cooling centres, traditional architecture) that cities use to deal with heat.

B is wrong: private swimming pools are not discussed.
C is wrong: air conditioning is mentioned, but the passage never argues for a ban.
D is wrong: history is mentioned only briefly in connection with traditional design ideas.

Skimming tip: when a passage lists several DIFFERENT solutions to one problem, the title usually focuses on the problem and the variety of solutions.`,
  },
  {
    id: "sk-b1-209",
    type: "skimming",
    level: "B1",
    title: "The Comeback of Vinyl Records",
    topic: "Music · Technology",
    passage:
`For most of the 1990s and early 2000s, vinyl records seemed to be heading for extinction. CDs and then digital downloads dominated the music market, and many record shops closed. In the past ten years, however, vinyl has staged a surprising comeback. Annual sales in many countries have grown each year, and major artists now routinely release new albums on vinyl alongside the digital versions. Fans give several reasons for the revival. Some argue that vinyl produces a warmer, fuller sound. Others enjoy the large square cover art, which is much more impressive than a tiny screen image. Many simply like the ritual of placing the record on the turntable and listening to one side from start to finish, instead of skipping between tracks. The renewed interest has even brought a few small record-pressing factories back into business after decades of decline.`,
    instructions: "Skim the passage and choose the BEST answer.",
    options: [
      { label: "A", text: "Why CDs were invented in the first place" },
      { label: "B", text: "The unexpected return of vinyl records and the reasons fans love them" },
      { label: "C", text: "How to repair an old record player at home" },
      { label: "D", text: "The decline of all forms of physical music sales" },
    ],
    items: [
      { prompt: "What is the main idea of the passage?", answer: "B" },
    ],
    analysis:
`B is correct. The passage describes the comeback ("staged a surprising comeback") and lists the reasons fans give (sound, cover art, listening ritual).

A is wrong: the invention of CDs is not explained.
C is wrong: repair is never mentioned.
D is wrong: the passage actually shows physical sales (vinyl) are RISING, not declining.

Skimming tip: words like "comeback", "revival" or "return" often signal a passage about something that nearly disappeared and then became popular again.`,
  },
  {
    id: "sk-b1-210",
    type: "skimming",
    level: "B1",
    title: "Why We Forget What We Read",
    topic: "Education · Psychology",
    passage:
`Most students notice the same frustrating pattern: they finish reading a chapter, feel they understood every page, and then a few days later remember almost nothing of it. Memory researchers say this is completely normal. Information that we read passively — simply running our eyes across the words — is rarely transferred from short-term to long-term memory. To remember what we read, we have to do something active with it. Effective techniques include explaining the material in our own words, writing short summaries from memory, drawing simple diagrams, or testing ourselves with questions before checking the answers. These methods feel harder than re-reading, and that very effort is part of why they work. The brain treats information as worth keeping when we struggle a little to retrieve it, while smooth re-reading creates the comfortable illusion that we already know everything.`,
    instructions: "Skim the passage and choose the BEST answer.",
    options: [
      { label: "A", text: "To explain why we forget what we read and how to remember it better" },
      { label: "B", text: "To recommend specific brain-training apps" },
      { label: "C", text: "To compare paper books and e-books" },
      { label: "D", text: "To argue that reading is no longer useful" },
    ],
    items: [
      { prompt: "The writer's main purpose is to…", answer: "A" },
    ],
    analysis:
`A is correct. The passage explains the problem (passive reading is forgotten) and offers practical solutions (active techniques).

B is wrong: no apps are recommended.
C is wrong: paper books and e-books are not compared.
D is wrong: the passage assumes reading IS useful and explains how to do it better.

Skimming tip: when a passage describes a problem and then gives advice for solving it, its purpose is to INFORM AND ADVISE.`,
  },

  // ───── 2. Multiple Choice (B1) — 8 new items ─────
  {
    id: "mc-b1-201",
    type: "multiple_choice",
    level: "B1",
    title: "The Story of Penicillin",
    topic: "Medicine · History",
    passage:
`The discovery of penicillin in 1928 is often described as one of the luckiest accidents in the history of science. The Scottish bacteriologist Alexander Fleming returned from a holiday to find that a dish of bacteria he had left uncovered had become contaminated by a blue-green mould. To his surprise, the bacteria had been killed in a clear ring around the mould, suggesting that the mould was producing a natural antibacterial substance.

Fleming published his findings, but he could not produce the substance in usable quantities. It was not until the early 1940s that a team in Oxford, led by Howard Florey and Ernst Chain, found a way to grow the mould in large vats and extract the active drug. By the end of the Second World War, penicillin was being produced on an industrial scale and was saving the lives of soldiers who, only a few years earlier, would have died of infected wounds.`,
    instructions: "Choose the correct letter, A, B, C or D.",
    options: [
      { label: "A", text: "Fleming successfully produced penicillin in large quantities himself." },
      { label: "B", text: "The mould killed bacteria growing on a dish Fleming had left behind." },
      { label: "C", text: "Penicillin was first used widely during the First World War." },
      { label: "D", text: "Florey and Chain made the original discovery of the mould's effect." },
    ],
    items: [
      { prompt: "Which statement is supported by the passage?", answer: "B" },
    ],
    analysis:
`B is correct: the passage describes the bacteria being killed in a ring around the mould.

A is wrong: Fleming could NOT produce it in usable quantities.
C is wrong: penicillin was scaled up at the end of the Second World War, not the First.
D is wrong: Fleming made the discovery; Florey and Chain later made it usable.`,
  },
  {
    id: "mc-b1-202",
    type: "multiple_choice",
    level: "B1",
    title: "The Rise of E-Sports",
    topic: "Sport · Technology",
    passage:
`E-sports — competitive video gaming watched by large audiences — have grown from small basement tournaments into a multi-billion-dollar industry. Top players now train almost as athletes do, often spending eight hours a day practising tactics, reflexes and team coordination. The biggest events fill arenas around the world, and the most popular online streams attract more viewers than many traditional sports finals.

The rapid growth has not been without problems. Critics worry about the long-term physical effects of so many hours sitting in front of a screen, and several high-profile players have retired in their early twenties because of repetitive-strain injuries. Sports authorities also disagree about whether e-sports should be considered "real" sports, given the limited physical exertion involved. Even so, several universities now offer scholarships to e-sports stars, and a few national Olympic committees have already begun to discuss possible competitive categories.`,
    instructions: "Choose the correct letter, A, B, C or D.",
    options: [
      { label: "A", text: "E-sports remain a small underground hobby with little money involved." },
      { label: "B", text: "Top e-sports players typically train very few hours a week." },
      { label: "C", text: "Some e-sports players retire young because of repetitive-strain injuries." },
      { label: "D", text: "Universities have refused to offer any support to e-sports players." },
    ],
    items: [
      { prompt: "Which statement is supported by the passage?", answer: "C" },
    ],
    analysis:
`C is correct: the passage explicitly mentions early retirement caused by RSI.

A is wrong: it is now a multi-billion-dollar industry.
B is wrong: top players train around eight hours a day.
D is wrong: several universities offer scholarships to top players.`,
  },
  {
    id: "mc-b1-203",
    type: "multiple_choice",
    level: "B1",
    title: "Saving the Iberian Lynx",
    topic: "Conservation · Wildlife",
    passage:
`Twenty years ago, the Iberian lynx — a small wild cat found only in parts of Spain and Portugal — was the most endangered cat species in the world. Surveys in the early 2000s estimated that fewer than one hundred adults remained in the wild, scattered across two isolated populations. The main causes were the loss of the cat's natural prey (the European rabbit), road traffic accidents and the destruction of its woodland habitat.

A long-running recovery programme, jointly funded by Spain, Portugal and the European Union, has gradually turned the situation around. Captive-bred lynxes have been released into protected woodland, fenced underpasses now allow them to cross dangerous roads safely, and wildlife managers carefully boost local rabbit numbers. By the early 2020s, the wild population had grown to more than 1,500 animals. The species is no longer classed as critically endangered, although it remains vulnerable, and conservationists warn that a single disease outbreak among rabbits could quickly reverse the progress made.`,
    instructions: "Choose the correct letter, A, B, C or D.",
    options: [
      { label: "A", text: "The Iberian lynx has been completely removed from the endangered list." },
      { label: "B", text: "The recovery programme is funded by Spain alone." },
      { label: "C", text: "Captive-bred lynxes have been released to support the wild population." },
      { label: "D", text: "Conservationists believe no future threats to the lynx remain." },
    ],
    items: [
      { prompt: "Which statement is supported by the passage?", answer: "C" },
    ],
    analysis:
`C is correct: the passage clearly states that captive-bred lynxes have been released into protected woodland.

A is wrong: the species is still vulnerable, just not "critically endangered".
B is wrong: the programme is jointly funded by Spain, Portugal and the EU.
D is wrong: a rabbit disease outbreak could reverse the progress.`,
  },
  {
    id: "mc-b1-204",
    type: "multiple_choice",
    level: "B1",
    title: "How Sourdough Bread Works",
    topic: "Food · Science",
    passage:
`Sourdough is one of the oldest forms of leavened bread. Instead of using packets of commercial yeast, sourdough bakers rely on a "starter" — a simple mixture of flour and water that has been left to capture wild yeasts and bacteria from the air and from the flour itself. Once active, the starter contains billions of these microorganisms, which produce the gases that make the dough rise and the acids that give the bread its characteristic tangy flavour.

Compared with bread made from quick commercial yeast, sourdough usually takes much longer to prepare; the dough may be allowed to ferment slowly for twelve hours or more. This long fermentation appears to make the finished bread easier for many people to digest, partly because some of the more difficult components in the flour are broken down during the process. The crust is also typically thicker and crispier, while the interior tends to have an open structure of large, irregular holes.`,
    instructions: "Choose the correct letter, A, B, C or D.",
    options: [
      { label: "A", text: "Sourdough bakers depend mainly on packets of commercial yeast." },
      { label: "B", text: "A sourdough starter contains wild yeasts and bacteria." },
      { label: "C", text: "Sourdough is usually faster to prepare than bread made with commercial yeast." },
      { label: "D", text: "The interior of sourdough bread is famous for being very dense and uniform." },
    ],
    items: [
      { prompt: "Which statement is supported by the passage?", answer: "B" },
    ],
    analysis:
`B is correct: the starter captures wild yeasts and bacteria from the air and flour.

A is wrong: the whole point of sourdough is to AVOID commercial yeast.
C is wrong: sourdough takes LONGER to prepare than commercial-yeast bread.
D is wrong: the interior typically has LARGE, IRREGULAR holes — not a dense, uniform texture.`,
  },
  {
    id: "mc-b1-205",
    type: "multiple_choice",
    level: "B1",
    title: "The First Modern Lighthouses",
    topic: "History · Engineering",
    passage:
`Lighthouses have warned ships of dangerous coastlines for thousands of years, but the first truly modern lighthouse is usually said to be the Eddystone Light, built on a treacherous group of rocks off the south coast of England. The original wooden tower, completed in 1698, was the first lighthouse ever built far out on an exposed rock at sea. It survived for only five years before a violent storm destroyed it.

Several replacement towers followed. The most famous, designed by the engineer John Smeaton in 1759, used interlocking blocks of granite shaped like the curved trunk of an oak tree. Smeaton's tower stood firm for more than a century, and his design principles — a wide base, a curved profile and tightly fitted stones — were copied in countless lighthouses around the world. By the late nineteenth century, lighthouses had also begun to use rotating lenses and oil lamps so powerful that their beams could be seen from more than thirty kilometres out at sea.`,
    instructions: "Choose the correct letter, A, B, C or D.",
    options: [
      { label: "A", text: "The first Eddystone tower was built of stone in 1759." },
      { label: "B", text: "Smeaton's tower lasted for more than a hundred years." },
      { label: "C", text: "Smeaton's design was rarely used elsewhere in the world." },
      { label: "D", text: "Modern lighthouse beams cannot be seen more than five kilometres away." },
    ],
    items: [
      { prompt: "Which statement is supported by the passage?", answer: "B" },
    ],
    analysis:
`B is correct: "Smeaton's tower stood firm for more than a century."

A is wrong: the FIRST tower (1698) was wooden; the granite version was Smeaton's later design.
C is wrong: his principles were copied in countless lighthouses worldwide.
D is wrong: by the late 1800s beams could be seen MORE than 30 km away.`,
  },
  {
    id: "mc-b1-206",
    type: "multiple_choice",
    level: "B1",
    title: "Why Coral Reefs Matter",
    topic: "Environment · Biology",
    passage:
`Coral reefs cover less than one per cent of the world's ocean floor, yet they support roughly a quarter of all known marine species. They act as nurseries for young fish, protect coastlines from storm waves, and bring tens of billions of dollars a year to local economies through tourism and small-scale fishing.

Despite this importance, reefs around the world are in trouble. Higher water temperatures cause the colourful algae that live inside coral to leave, turning the coral white in a process called bleaching. Repeated bleaching events weaken or kill the coral, and large stretches of the Great Barrier Reef in Australia have already been seriously affected. Pollution from farm fertilisers and damage from destructive fishing methods make matters worse. Scientists are working on a range of recovery techniques, from breeding heat-resistant corals in laboratories to physically replanting fragments on damaged reefs, but most agree that the long-term health of reefs depends above all on slowing the rise in ocean temperatures.`,
    instructions: "Choose the correct letter, A, B, C or D.",
    options: [
      { label: "A", text: "Coral reefs cover roughly a quarter of the ocean floor." },
      { label: "B", text: "Bleaching turns coral bright green when waters cool." },
      { label: "C", text: "Pollution and destructive fishing add to the pressure on reefs." },
      { label: "D", text: "Scientists agree that no recovery techniques are possible." },
    ],
    items: [
      { prompt: "Which statement is supported by the passage?", answer: "C" },
    ],
    analysis:
`C is correct: pollution and destructive fishing are listed as additional threats.

A is wrong: reefs cover LESS than 1% of the ocean floor (and support ~25% of species).
B is wrong: bleaching turns coral WHITE when waters become TOO WARM, not green when cool.
D is wrong: scientists ARE working on recovery techniques such as heat-resistant corals.`,
  },
  {
    id: "mc-b1-207",
    type: "multiple_choice",
    level: "B1",
    title: "The Mystery of Stonehenge",
    topic: "Archaeology · History",
    passage:
`Stonehenge, the famous ring of huge standing stones on Salisbury Plain in southern England, was built in stages between roughly 3000 BC and 1500 BC. The tallest stones — known as sarsens — weigh up to twenty-five tonnes each and were quarried from a site about thirty kilometres away. The smaller "bluestones" are even more remarkable: chemical analysis has shown that they were brought from quarries in west Wales, more than two hundred kilometres from the monument.

Exactly how prehistoric people moved such heavy stones, without wheels or draft animals familiar today, remains the subject of debate among archaeologists. The purpose of the monument is also disputed. Some researchers believe Stonehenge was an astronomical calendar, since key stones align with the rising sun on the longest day of the year. Others argue that it was primarily a place of burial or religious ceremony, pointing to the human remains found in and around the site. Most likely, its meaning changed as the monument was rebuilt and reused over many centuries.`,
    instructions: "Choose the correct letter, A, B, C or D.",
    options: [
      { label: "A", text: "All the stones at Stonehenge were quarried within ten kilometres of the site." },
      { label: "B", text: "The bluestones were brought from west Wales, over 200 km away." },
      { label: "C", text: "Archaeologists agree that Stonehenge was used purely as a hospital." },
      { label: "D", text: "The monument was built in a single short construction phase." },
    ],
    items: [
      { prompt: "Which statement is supported by the passage?", answer: "B" },
    ],
    analysis:
`B is correct: chemical analysis traced the bluestones to Welsh quarries more than 200 km away.

A is wrong: the sarsens came from 30 km away and the bluestones from 200+ km.
C is wrong: a hospital is never mentioned; possible uses are calendar, burial site or religious centre.
D is wrong: it was built IN STAGES over roughly 1,500 years.`,
  },
  {
    id: "mc-b1-208",
    type: "multiple_choice",
    level: "B1",
    title: "How Vaccines Work",
    topic: "Medicine · Biology",
    passage:
`Vaccines work by training the body's immune system to recognise a particular germ before that germ has the chance to cause illness. A typical vaccine contains either a weakened form of the virus or bacterium, a few of its proteins, or, in the case of newer mRNA vaccines, a short genetic instruction that allows the body to produce one of those proteins by itself. The immune system reacts to whatever it encounters, learns to identify it, and stores that information in special "memory" cells.

If the real germ later enters the body, the memory cells respond far more quickly and strongly than a first-time encounter would allow, often stopping the infection before any symptoms appear. Vaccination has dramatically reduced once-common childhood diseases such as measles, and it has eliminated smallpox from the planet altogether. Side effects are usually mild — a sore arm, perhaps a low fever for a day — and serious reactions are extremely rare, especially compared with the diseases the vaccines prevent.`,
    instructions: "Choose the correct letter, A, B, C or D.",
    options: [
      { label: "A", text: "Vaccines work by attacking germs already growing in the body." },
      { label: "B", text: "Memory cells help the immune system respond quickly to a real infection later." },
      { label: "C", text: "Smallpox is still a common disease today despite vaccination." },
      { label: "D", text: "Serious reactions to vaccines occur in most patients." },
    ],
    items: [
      { prompt: "Which statement is supported by the passage?", answer: "B" },
    ],
    analysis:
`B is correct: memory cells store information so the body responds faster on a second encounter.

A is wrong: vaccines train the immune system BEFORE infection, not by attacking established disease.
C is wrong: vaccination has ELIMINATED smallpox from the planet.
D is wrong: serious reactions are EXTREMELY RARE.`,
  },

  // ───── 3. List Selection (B1) — 8 new items ─────
  {
    id: "ls-b1-201",
    type: "list_selection",
    level: "B1",
    title: "What Helps People Learn a New Language",
    topic: "Education · Languages",
    passage:
`Researchers who study how adults learn a foreign language have identified several habits that consistently produce strong progress. Regular short sessions — twenty to thirty minutes a day — are far more effective than occasional long ones, because the brain consolidates new vocabulary during sleep between sessions. Speaking the language out loud, even alone, dramatically improves pronunciation and fluency. Spending time with authentic materials such as films, songs and short news articles exposes learners to natural rhythms and current expressions.

Several popular shortcuts turn out to be much less helpful. Trying to memorise long lists of vocabulary in isolation, without ever using the words in real sentences, leads to quick forgetting. Relying entirely on automatic translation apps slows down genuine comprehension. And spending hours studying complex grammar rules without any practice in producing the language tends to leave learners able to analyse sentences on paper but unable to hold a basic conversation.`,
    instructions: "Which THREE habits are described as effective in learning a foreign language? Choose THREE answers (A–F).",
    options: [
      { label: "A", text: "Short daily study sessions of 20 to 30 minutes" },
      { label: "B", text: "Memorising long word lists in isolation" },
      { label: "C", text: "Speaking the language out loud regularly" },
      { label: "D", text: "Relying entirely on automatic translation apps" },
      { label: "E", text: "Spending time with films, songs and news articles" },
      { label: "F", text: "Studying grammar rules without any speaking practice" },
    ],
    items: [
      { prompt: "Choose THREE letters.", answer: ["A", "C", "E"] },
    ],
    analysis:
`A, C, E are listed as effective habits. B, D and F are explicitly described as much less helpful.`,
  },
  {
    id: "ls-b1-202",
    type: "list_selection",
    level: "B1",
    title: "What Makes a Successful Public Park",
    topic: "Urban planning",
    passage:
`Urban planners who study public parks consistently identify several features that distinguish a popular, well-used park from one that lies almost empty most of the day. A successful park has multiple safe entrances connected to the surrounding streets, so that people can pass through naturally on the way to other places. It offers a variety of activities for different ages — playgrounds for small children, open lawns for picnics or sport, and shaded benches for older visitors. Plenty of clean public toilets, drinking fountains and litter bins make longer visits comfortable.

Some design choices, by contrast, drive visitors away. Tall, dense walls or fences around a park reduce visibility and make casual passers-by feel unwelcome. A design that focuses entirely on a single age group, such as teenagers or toddlers, narrows the park's appeal. And a complete lack of lighting in the evening makes most parks feel unsafe and largely unused after dark.`,
    instructions: "Which THREE features are described as DESIRABLE in a public park? Choose THREE answers (A–F).",
    options: [
      { label: "A", text: "Multiple safe entrances connected to nearby streets" },
      { label: "B", text: "Tall, dense walls around the park" },
      { label: "C", text: "A variety of activities for different age groups" },
      { label: "D", text: "Designs aimed at a single age group only" },
      { label: "E", text: "Plenty of clean toilets, drinking fountains and bins" },
      { label: "F", text: "A complete lack of evening lighting" },
    ],
    items: [
      { prompt: "Choose THREE letters.", answer: ["A", "C", "E"] },
    ],
    analysis:
`A, C, E are described as features of successful parks. B, D and F are listed under "drive visitors away".`,
  },
  {
    id: "ls-b1-203",
    type: "list_selection",
    level: "B1",
    title: "What Makes Online Reviews Trustworthy",
    topic: "Business · Consumer behaviour",
    passage:
`Marketing researchers have studied which kinds of online reviews shoppers find most convincing. Reviews that describe both strengths and weaknesses of a product are generally seen as more trustworthy than purely positive or purely negative ones. Reviews written by verified buyers — readers who can see that the writer actually purchased the item — carry far more weight than anonymous opinions. Detailed descriptions of how, where and why the reviewer used the product also help, since they let other shoppers judge whether the experience matches their own situation.

A few features make reviews look suspicious. Identical or near-identical wording across many reviews suggests that they may have been copied or written by the same person. Reviews posted in large numbers within a short time after a product is launched are often dismissed as fake. And reviews that contain only emotional praise — "amazing!" or "the best ever!" — without any concrete detail are usually not enough to persuade thoughtful shoppers.`,
    instructions: "Which THREE features make an online review more trustworthy? Choose THREE answers (A–F).",
    options: [
      { label: "A", text: "A balanced description of strengths and weaknesses" },
      { label: "B", text: "Identical wording repeated across many reviews" },
      { label: "C", text: "A label showing the writer is a verified buyer" },
      { label: "D", text: "Large numbers of reviews appearing in a very short time" },
      { label: "E", text: "Detailed descriptions of how and why the product was used" },
      { label: "F", text: "Pure emotional praise with no specific detail" },
    ],
    items: [
      { prompt: "Choose THREE letters.", answer: ["A", "C", "E"] },
    ],
    analysis:
`A, C, E are described as trust-building features. B, D and F are explicitly described as suspicious.`,
  },
  {
    id: "ls-b1-204",
    type: "list_selection",
    level: "B1",
    title: "What Helps Job Interviews Go Well",
    topic: "Careers · Communication",
    passage:
`Career advisers who train new graduates for interviews consistently recommend several practical habits. Researching the company in advance — its products, recent news and main competitors — allows the candidate to ask informed questions and shows genuine interest. Preparing short, structured answers to common questions, especially using a simple "situation, action, result" format, makes responses clearer and easier to follow. Arriving at least ten minutes early, with a printed copy of the CV, removes a major source of last-minute stress.

Other widespread habits actually damage interview performance. Memorising long, word-for-word answers tends to make candidates sound robotic and unable to respond to follow-up questions. Criticising previous employers raises doubts about how the candidate would speak about the new company in the future. And checking a phone repeatedly in the waiting area, even out of nervousness, gives a poor first impression to staff who pass by.`,
    instructions: "Which THREE habits are described as helpful in a job interview? Choose THREE answers (A–F).",
    options: [
      { label: "A", text: "Researching the company before the interview" },
      { label: "B", text: "Memorising long, word-for-word answers" },
      { label: "C", text: "Preparing short structured answers using situation–action–result" },
      { label: "D", text: "Criticising previous employers" },
      { label: "E", text: "Arriving at least ten minutes early with a printed CV" },
      { label: "F", text: "Repeatedly checking a phone in the waiting area" },
    ],
    items: [
      { prompt: "Choose THREE letters.", answer: ["A", "C", "E"] },
    ],
    analysis:
`A, C, E are listed as helpful habits. B, D and F are explicitly described as damaging.`,
  },
  {
    id: "ls-b1-205",
    type: "list_selection",
    level: "B1",
    title: "What Keeps a Small Business Healthy",
    topic: "Business · Economics",
    passage:
`Studies of small businesses that survive their difficult first five years identify several recurring practices. Careful weekly tracking of cash flow — money actually coming in and going out — is regularly highlighted as the single most important habit, since profitable businesses can still fail if they run out of cash. Maintaining a small group of loyal repeat customers, rather than chasing endless new ones, keeps marketing costs low and provides reliable income. Investing modestly but consistently in staff training tends to reduce mistakes and increase the quality of service.

Some popular strategies are linked with poor outcomes. Borrowing heavily to fund rapid expansion before the basic business is profitable is a frequent cause of failure. Trying to compete only on the lowest possible price often leads to thin margins that cannot survive any economic downturn. And ignoring early customer complaints, in the hope that they will go away, usually leads to far larger reputation problems later.`,
    instructions: "Which THREE practices help a small business stay healthy? Choose THREE answers (A–F).",
    options: [
      { label: "A", text: "Tracking weekly cash flow carefully" },
      { label: "B", text: "Borrowing heavily for rapid expansion" },
      { label: "C", text: "Looking after a base of loyal repeat customers" },
      { label: "D", text: "Competing only on the lowest possible price" },
      { label: "E", text: "Investing modestly in regular staff training" },
      { label: "F", text: "Ignoring early customer complaints" },
    ],
    items: [
      { prompt: "Choose THREE letters.", answer: ["A", "C", "E"] },
    ],
    analysis:
`A, C, E are described as healthy habits. B, D and F are linked with poor outcomes.`,
  },
  {
    id: "ls-b1-206",
    type: "list_selection",
    level: "B1",
    title: "Healthy Habits for Long-Distance Travel",
    topic: "Travel · Health",
    passage:
`Frequent flyers and airline medical staff agree on several simple habits that make long flights easier on the body. Drinking water steadily throughout the flight is the single most useful step, since aircraft cabins are extremely dry and dehydration worsens almost every other discomfort. Standing up and walking the aisle every couple of hours reduces the small but real risk of blood clots in the legs. Wearing loose, layered clothing allows passengers to adjust to changing cabin temperatures without disturbance.

A few common habits make travel measurably worse. Drinking large amounts of alcohol on board increases dehydration and disrupts the natural body clock, which makes jet lag worse on arrival. Eating very heavy meals just before sleeping in the seat tends to cause indigestion. And keeping shoes laced tightly for the whole flight increases foot swelling, since the lower legs naturally retain fluid in flight.`,
    instructions: "Which THREE habits help passengers feel better on a long flight? Choose THREE answers (A–F).",
    options: [
      { label: "A", text: "Drinking water steadily throughout the flight" },
      { label: "B", text: "Drinking large amounts of alcohol on board" },
      { label: "C", text: "Standing up and walking the aisle every couple of hours" },
      { label: "D", text: "Eating very heavy meals just before sleeping in the seat" },
      { label: "E", text: "Wearing loose, layered clothing" },
      { label: "F", text: "Keeping shoes laced tightly for the whole flight" },
    ],
    items: [
      { prompt: "Choose THREE letters.", answer: ["A", "C", "E"] },
    ],
    analysis:
`A, C, E are listed as helpful habits. B, D and F are described as making travel measurably worse.`,
  },
  {
    id: "ls-b1-207",
    type: "list_selection",
    level: "B1",
    title: "What Helps Children Sleep Well",
    topic: "Health · Family",
    passage:
`Paediatricians who study children's sleep regularly identify a small set of routines that make a real difference. A consistent bedtime, kept within fifteen minutes each night including weekends, helps the body's natural clock settle into a steady rhythm. A short, calming bedtime routine — perhaps a warm bath followed by a story — signals to the brain that sleep is approaching. A bedroom that is cool, dark and quiet supports deeper, less interrupted sleep.

Several common practices have the opposite effect. Screen time in the half hour before bed exposes children to bright blue light, which delays the release of the natural sleep hormone melatonin. Sweet snacks or fizzy drinks late in the evening disturb digestion and increase nighttime waking. And using the bedroom as a place for noisy daytime play makes it harder for children to associate the room with rest.`,
    instructions: "Which THREE routines help children sleep well? Choose THREE answers (A–F).",
    options: [
      { label: "A", text: "A consistent bedtime kept within 15 minutes each night" },
      { label: "B", text: "Screen time in the half hour before bed" },
      { label: "C", text: "A short, calming bedtime routine like a bath and story" },
      { label: "D", text: "Sweet snacks or fizzy drinks late in the evening" },
      { label: "E", text: "A cool, dark, quiet bedroom" },
      { label: "F", text: "Using the bedroom as a place for noisy daytime play" },
    ],
    items: [
      { prompt: "Choose THREE letters.", answer: ["A", "C", "E"] },
    ],
    analysis:
`A, C, E are listed as helpful sleep routines. B, D and F are described as having the opposite effect.`,
  },
  {
    id: "ls-b1-208",
    type: "list_selection",
    level: "B1",
    title: "What Makes a Good School Library",
    topic: "Education",
    passage:
`Research into the role of school libraries in supporting learning highlights several features of libraries that students actually use. A wide and regularly updated collection of books across different genres and reading levels keeps interest high. A trained librarian, available to recommend titles and help with research, multiplies the value of the collection by guiding students towards books they would not find on their own. Quiet, comfortable seating, with a mix of individual and group spaces, encourages students to spend time there both during and after lessons.

Other arrangements consistently reduce use. Strict rules that allow students to borrow only one book at a time discourage heavier readers. A dusty, unchanging stock that has not been refreshed for years sends the message that the library has been forgotten by the school. And opening the library only during a single short break in the day prevents most students from visiting it at all.`,
    instructions: "Which THREE features make a school library more effective? Choose THREE answers (A–F).",
    options: [
      { label: "A", text: "A wide and regularly updated collection across genres and levels" },
      { label: "B", text: "A rule that allows students to borrow only one book at a time" },
      { label: "C", text: "A trained librarian who recommends titles and helps with research" },
      { label: "D", text: "A dusty, unchanging stock that has not been refreshed for years" },
      { label: "E", text: "Quiet, comfortable seating with both individual and group spaces" },
      { label: "F", text: "Opening the library only during a single short break each day" },
    ],
    items: [
      { prompt: "Choose THREE letters.", answer: ["A", "C", "E"] },
    ],
    analysis:
`A, C, E are described as features of effective libraries. B, D and F are explicitly described as reducing use.`,
  },

  // ───── 4. Choose a Title (B1) — 8 new items ─────
  {
    id: "ct-b1-201",
    type: "choose_title",
    level: "B1",
    title: "(See passage)",
    topic: "Health · Lifestyle",
    passage:
`Walking is sometimes treated as second-best to running or going to the gym, but a growing body of research suggests it deserves more respect. A daily brisk walk of about thirty minutes is linked with significantly lower rates of heart disease, type-2 diabetes and depression. Unlike many forms of exercise, walking is essentially free, requires no special equipment beyond comfortable shoes, and can be fitted into the journey to work or school.

Doctors increasingly recommend walking as a "first step" for patients who are out of shape or recovering from illness, since the risk of injury is very low and progress is easy to measure. City planners have noticed too: places where neighbourhoods, shops and schools are within walking distance not only have healthier residents but also stronger local economies, since people on foot tend to stop and spend more often than people driving past.`,
    instructions: "Choose the most appropriate title for the whole passage.",
    options: [
      { label: "A", text: "How to train for a marathon" },
      { label: "B", text: "The simple, underrated benefits of regular walking" },
      { label: "C", text: "Why driving is better than walking in modern cities" },
      { label: "D", text: "A guide to choosing running shoes" },
    ],
    items: [
      { prompt: "Choose A, B, C or D.", answer: "B" },
    ],
    analysis:
`B captures the whole passage: walking is sometimes underrated, brings clear health benefits, and even shapes neighbourhoods.

A is off-topic (marathon training is not mentioned).
C is the opposite of the passage's argument.
D focuses on shoes, only mentioned in passing.`,
  },
  {
    id: "ct-b1-202",
    type: "choose_title",
    level: "B1",
    title: "(See passage)",
    topic: "Technology · Society",
    passage:
`Smartphones have changed almost every part of daily life over the past fifteen years, but few areas have been transformed as completely as the way people take and share photographs. Where once a family might own a single camera reserved for holidays and special events, today most people carry a powerful camera in their pocket at all times. The result is an explosion in the sheer number of photos taken — far more in a single year now than in the entire twentieth century.

The change goes beyond quantity. Photo-sharing apps and instant messaging mean that pictures are routinely taken to communicate, not just to remember. People photograph receipts, train schedules, restaurant menus and street signs as a kind of visual note-taking. Critics worry that the constant urge to capture every moment can interfere with simply enjoying it. Defenders reply that the same technology has democratised photography and allowed millions of ordinary people to develop a real visual eye.`,
    instructions: "Choose the most appropriate title for the whole passage.",
    options: [
      { label: "A", text: "How smartphones changed the way we take and share photos" },
      { label: "B", text: "A history of professional film cameras" },
      { label: "C", text: "Why messaging apps should be banned at school" },
      { label: "D", text: "The decline of family holidays" },
    ],
    items: [
      { prompt: "Choose A, B, C or D.", answer: "A" },
    ],
    analysis:
`A best summarises the whole text: how smartphone cameras changed both how often and why people take photos, plus the debate around it.

B, C and D are off-topic for this passage.`,
  },
  {
    id: "ct-b1-203",
    type: "choose_title",
    level: "B1",
    title: "(See passage)",
    topic: "Environment · Cities",
    passage:
`Wildlife is moving into cities. Foxes, raccoons, herons, falcons and even small deer have become familiar sights in many large urban areas, where they often thrive in surprising ways. City temperatures are usually a few degrees warmer than the surrounding countryside, food waste from restaurants and households is plentiful, and there are fewer of the larger predators that would limit their numbers in wild areas.

Reactions among residents are mixed. Some welcome the wildlife and feed garden birds or set up nest boxes for bats. Others worry about damage to bins, noise at night or the spread of disease. City authorities increasingly try to encourage the harmless species — through urban tree planting, green roofs and protected ponds — while quietly managing those that cause real problems. Naturalists point out that many of these "urban animals" have become so well adapted that their city populations now outnumber those still living in the countryside.`,
    instructions: "Choose the most appropriate title for the whole passage.",
    options: [
      { label: "A", text: "Why wild animals are moving into cities — and how we react" },
      { label: "B", text: "Designing a private garden for songbirds" },
      { label: "C", text: "How to remove all rats from a city" },
      { label: "D", text: "The decline of national parks worldwide" },
    ],
    items: [
      { prompt: "Choose A, B, C or D.", answer: "A" },
    ],
    analysis:
`A captures both halves of the passage: why animals come to cities, and how residents and authorities respond.

B, C, D are off-topic for this passage.`,
  },
  {
    id: "ct-b1-204",
    type: "choose_title",
    level: "B1",
    title: "(See passage)",
    topic: "Music · Culture",
    passage:
`The earliest forms of recorded music could capture only a few minutes of sound, and listeners gathered around large mechanical horns to hear what now seem like extremely scratchy performances. Each generation of new technology — vinyl records, magnetic tape, compact discs and finally streaming services — extended the length of recordings, improved the quality of the sound and changed the way people listened.

Streaming has had perhaps the most dramatic effect. Listeners now have almost the entire history of recorded music available on a phone for the price of a magazine subscription. Habits have changed accordingly: full albums are listened to less often, while single tracks are skipped, repeated and added to personal playlists. Musicians, in turn, increasingly write songs that hold a listener's attention from the very first seconds, knowing that a finger on the skip button is never far away.`,
    instructions: "Choose the most appropriate title for the whole passage.",
    options: [
      { label: "A", text: "How recorded music has changed from horns to streaming" },
      { label: "B", text: "Why magazine subscriptions are dying out" },
      { label: "C", text: "How to write a number-one pop song" },
      { label: "D", text: "The rules of classical music composition" },
    ],
    items: [
      { prompt: "Choose A, B, C or D.", answer: "A" },
    ],
    analysis:
`A captures the entire passage: a journey from the earliest recordings to today's streaming services and its effects.

B, C, D are off-topic.`,
  },
  {
    id: "ct-b1-205",
    type: "choose_title",
    level: "B1",
    title: "(See passage)",
    topic: "Health · Workplace",
    passage:
`Office workers in many countries spend more than eight hours a day sitting, often with very little movement between meetings. A growing body of medical research links long unbroken periods of sitting with higher rates of back pain, weight gain, cardiovascular disease and even early death — risks that remain even for people who exercise regularly outside work.

Employers are responding in various ways. Some have introduced standing desks or treadmill workstations, while others encourage walking meetings, place printers far from desks on purpose, or provide free sports facilities at lunch. Health experts are clear that the most important change is simply breaking up long sitting periods: standing for two minutes every half hour, climbing stairs instead of taking the lift, or walking around during phone calls. None of these steps requires special equipment, and together they can cut some of the health risks of office life noticeably.`,
    instructions: "Choose the most appropriate title for the whole passage.",
    options: [
      { label: "A", text: "The dangers of sitting all day and how offices are responding" },
      { label: "B", text: "The history of the modern office building" },
      { label: "C", text: "Why printers should be banned in workplaces" },
      { label: "D", text: "How to win a marathon despite a desk job" },
    ],
    items: [
      { prompt: "Choose A, B, C or D.", answer: "A" },
    ],
    analysis:
`A captures both halves of the passage: the health risks of long sitting AND the steps offices and individuals can take.

B, C, D are off-topic.`,
  },
  {
    id: "ct-b1-206",
    type: "choose_title",
    level: "B1",
    title: "(See passage)",
    topic: "Food · Environment",
    passage:
`Demand for plant-based foods that look and taste like meat has grown rapidly in recent years. New burgers, sausages and chicken-style pieces made from peas, soya, wheat or mushrooms now appear on the menus of large fast-food chains and on supermarket shelves around the world. Many customers are not vegetarians; they simply want to eat less meat for reasons of health, environment or animal welfare without giving up familiar dishes.

The environmental case for these products is fairly clear. Producing a kilo of plant-based mince typically requires far less land, water and energy than producing the same amount of beef, and emits a small fraction of the greenhouse gases. The health picture is more complex, since many plant-based products are highly processed and contain a lot of salt or saturated fat. Even so, dieticians generally agree that replacing some red meat with these foods is a step in a healthier and more sustainable direction.`,
    instructions: "Choose the most appropriate title for the whole passage.",
    options: [
      { label: "A", text: "Plant-based meat alternatives: rapid growth and what they really mean" },
      { label: "B", text: "How to grow your own mushrooms at home" },
      { label: "C", text: "Why all fast food should be banned" },
      { label: "D", text: "A history of vegetarianism in ancient times" },
    ],
    items: [
      { prompt: "Choose A, B, C or D.", answer: "A" },
    ],
    analysis:
`A captures the whole passage: the rapid growth in plant-based meat alternatives and a balanced look at their environmental and health effects.

B, C, D are off-topic.`,
  },
  {
    id: "ct-b1-207",
    type: "choose_title",
    level: "B1",
    title: "(See passage)",
    topic: "History · Communication",
    passage:
`For most of human history, sending a message over a long distance was painfully slow. A letter from London to New York in the early 1800s might take six weeks by sailing ship, and the reply would take just as long. The arrival of the electric telegraph in the 1840s changed everything. Suddenly, news, business orders and personal greetings could cross continents in minutes.

The first transatlantic cable, laid across the floor of the ocean in 1858, broke down within weeks, but a stronger line installed in 1866 worked reliably and transformed international communication. Newspapers began carrying daily reports of foreign events. Stock markets in different countries began to react to the same news on the same day. Diplomats, who had previously had to make decisions on their own for months, now received detailed instructions from their governments overnight. Many historians regard the telegraph as the first true world-shrinking technology — a kind of Victorian internet.`,
    instructions: "Choose the most appropriate title for the whole passage.",
    options: [
      { label: "A", text: "How the electric telegraph transformed long-distance communication" },
      { label: "B", text: "The decline of letter writing in modern Britain" },
      { label: "C", text: "How to lay a fibre-optic cable today" },
      { label: "D", text: "Famous diplomats of the nineteenth century" },
    ],
    items: [
      { prompt: "Choose A, B, C or D.", answer: "A" },
    ],
    analysis:
`A captures the entire passage: from slow ship-borne letters to the telegraph's dramatic effects on news, business and diplomacy.

B, C, D are off-topic.`,
  },
  {
    id: "ct-b1-208",
    type: "choose_title",
    level: "B1",
    title: "(See passage)",
    topic: "Education · Technology",
    passage:
`Free online courses, often called MOOCs (Massive Open Online Courses), appeared in their modern form around 2012. Within a few years, leading universities had placed full lecture series on subjects from computer science to ancient history on the internet, and millions of learners around the world had signed up. For the first time, a teenager in a small town anywhere with a working internet connection could follow lectures from professors at famous institutions thousands of kilometres away.

The reality has been more mixed than the early excitement suggested. Most people who enrol in a free course never finish it, and the courses turned out to work best for adults who already had a degree and were looking to add specific skills, rather than for first-time university students. Even so, MOOCs have permanently changed expectations of what universities should offer. Today, many traditional courses include optional online components, and the line between distance learning and on-campus study has become much harder to draw.`,
    instructions: "Choose the most appropriate title for the whole passage.",
    options: [
      { label: "A", text: "MOOCs: their rise, real users and lasting impact" },
      { label: "B", text: "How to get a free university degree in two weeks" },
      { label: "C", text: "Why traditional universities will soon close" },
      { label: "D", text: "The history of computer science as a subject" },
    ],
    items: [
      { prompt: "Choose A, B, C or D.", answer: "A" },
    ],
    analysis:
`A captures the whole passage: where MOOCs came from, who actually used them and how they have changed traditional teaching.

B is contradicted (a degree in two weeks is not what the passage describes).
C is too extreme — the passage says universities have CHANGED, not that they will close.
D is a single example of a subject offered.`,
  },
];

export default supplements;
