import type { SkillExercise } from "./reading-skills";

const supplements: SkillExercise[] = [
  // ───── 9. List Selection (B2) — 10 new items ─────
  {
    id: "ls-b2-401",
    type: "list_selection",
    level: "B2",
    title: "The Promise of Renewable Energy",
    topic: "Energy · Environment",
    passage:
`Although renewable sources still provide a minority of global electricity, their share has been climbing steadily for two decades, and the underlying economics increasingly favour them over fossil fuels. Solar photovoltaic and onshore wind are now, in most regions, the cheapest forms of new generation, and their costs continue to fall as manufacturing scales up. Beyond price, supporters point to other advantages: renewables produce no direct carbon dioxide emissions during operation, they reduce a country's dependence on imported fuels, and the modular nature of solar and wind installations allows electricity to be generated close to the point of use, cutting transmission losses. Critics counter that the variability of sunshine and wind requires costly back-up generation or storage, but the rapid fall in battery prices is steadily eroding that objection.`,
    instructions: "Which THREE advantages of renewable energy are mentioned in the passage? Choose THREE letters.",
    options: [
      { label: "A", text: "Lower cost than most new fossil-fuel generation" },
      { label: "B", text: "Higher capacity factors than coal stations" },
      { label: "C", text: "Reduced reliance on imported fuels" },
      { label: "D", text: "Guaranteed continuous output day and night" },
      { label: "E", text: "Generation close to where electricity is used" },
      { label: "F", text: "Eliminating the need for an electricity grid" },
    ],
    items: [{ prompt: "Choose THREE advantages mentioned in the passage.", answer: ["A", "C", "E"] }],
    analysis:
`A — "the cheapest forms of new generation".
C — "reduce a country's dependence on imported fuels".
E — "modular nature of solar and wind installations allows electricity to be generated close to the point of use".

B is not stated; capacity factors are not discussed.
D contradicts the passage, which acknowledges variability.
F is wrong: nothing suggests grids will disappear.

Tip: in list selection, identify the part of the passage where the writer is explicitly listing advantages or features and tick off matches one by one.`,
  },
  {
    id: "ls-b2-402",
    type: "list_selection",
    level: "B2",
    title: "Why Coral Reefs Bleach",
    topic: "Marine science · Environment",
    passage:
`Coral reefs depend on a delicate symbiosis between coral polyps and tiny photosynthetic algae called zooxanthellae, which live inside coral tissues and supply most of the energy the corals need. When seawater becomes unusually warm, however, the relationship breaks down: the algae produce harmful by-products and the polyps expel them, leaving the colony pale or white — a condition known as bleaching. Although elevated temperature is the most common trigger, marine biologists also document bleaching in response to abnormally low salinity following heavy rainfall, increased ultraviolet radiation when the water is unusually clear, and pollution from agricultural run-off that disturbs the algae's chemistry. Reefs can recover from a single short bleaching event if conditions return to normal, but repeated or prolonged stress eventually kills the corals outright.`,
    instructions: "Which THREE triggers of coral bleaching are mentioned in the passage? Choose THREE letters.",
    options: [
      { label: "A", text: "Unusually warm seawater" },
      { label: "B", text: "An increase in predator fish populations" },
      { label: "C", text: "Lower than normal salinity after heavy rainfall" },
      { label: "D", text: "Earthquakes on the seabed" },
      { label: "E", text: "Agricultural run-off entering the sea" },
      { label: "F", text: "Excessive growth of seagrass meadows" },
    ],
    items: [{ prompt: "Choose THREE bleaching triggers mentioned.", answer: ["A", "C", "E"] }],
    analysis:
`A — "elevated temperature is the most common trigger".
C — "abnormally low salinity following heavy rainfall".
E — "pollution from agricultural run-off that disturbs the algae's chemistry".

B, D and F are never mentioned. Be cautious of plausible-sounding distractors that aren't actually in the text.`,
  },
  {
    id: "ls-b2-403",
    type: "list_selection",
    level: "B2",
    title: "The Costs of Constant Connectivity",
    topic: "Society · Technology",
    passage:
`Researchers studying the effects of heavy smartphone use have begun to document a consistent pattern of negative consequences, particularly among adolescents. Sleep is one of the clearest casualties: the blue light emitted by screens suppresses melatonin, and the temptation to check messages late at night cuts both the duration and quality of sleep. Continuous notifications fragment attention, training the brain to shift tasks every few minutes and reducing the capacity for sustained, focused work. Many users also report symptoms of anxiety linked to the curated images they see on social media, comparing themselves unfavourably with peers. Less obvious but increasingly recognised is the effect on posture and the muscles of the neck and upper back, as people spend hours each day looking down at small screens.`,
    instructions: "Which THREE negative consequences of heavy smartphone use are mentioned? Choose THREE letters.",
    options: [
      { label: "A", text: "Shorter and poorer-quality sleep" },
      { label: "B", text: "Permanent loss of hearing" },
      { label: "C", text: "Reduced capacity for sustained focus" },
      { label: "D", text: "Lower scores on memory tests in old age" },
      { label: "E", text: "Strain on the neck and upper back" },
      { label: "F", text: "Increased risk of skin cancer" },
    ],
    items: [{ prompt: "Choose THREE consequences mentioned in the passage.", answer: ["A", "C", "E"] }],
    analysis:
`A — sleep is "one of the clearest casualties".
C — notifications "reduce the capacity for sustained, focused work".
E — "the effect on posture and the muscles of the neck and upper back".

B, D and F are not mentioned. Memory tests in old age (D) is plausible but never stated; reject any option that does not appear in the text.`,
  },
  {
    id: "ls-b2-404",
    type: "list_selection",
    level: "B2",
    title: "The Hardships of Antarctic Exploration",
    topic: "History · Geography",
    passage:
`The early twentieth-century explorers who first attempted to reach the South Pole faced a combination of obstacles that made their expeditions some of the most demanding in human history. Average winter temperatures on the polar plateau fall below minus sixty degrees Celsius, low enough to freeze exposed skin in seconds. Persistent winds known as katabatics pour off the high interior at hurricane force, lifting fine snow into ground blizzards that reduce visibility to a few metres. The teams man-hauled sledges loaded with food and equipment for hundreds of kilometres, a physical effort that consumed huge numbers of calories and led to dangerous weight loss when supplies ran short. Crevasses concealed beneath thin snow bridges threatened to swallow whole sledging teams, and once on the plateau, severe altitude added breathlessness to every step.`,
    instructions: "Which THREE hardships faced by early Antarctic explorers are mentioned? Choose THREE letters.",
    options: [
      { label: "A", text: "Powerful katabatic winds and ground blizzards" },
      { label: "B", text: "Attacks by polar bears" },
      { label: "C", text: "Hidden crevasses beneath snow bridges" },
      { label: "D", text: "Tropical diseases brought from the ships" },
      { label: "E", text: "The physical strain of man-hauling sledges" },
      { label: "F", text: "A shortage of fresh drinking water in summer" },
    ],
    items: [{ prompt: "Choose THREE hardships mentioned in the passage.", answer: ["A", "C", "E"] }],
    analysis:
`A — katabatic winds and ground blizzards are described in detail.
C — crevasses "threatened to swallow whole sledging teams".
E — man-hauling sledges led to weight loss and dangerous calorie deficits.

B is wrong (polar bears live in the Arctic, not Antarctic).
D and F are not mentioned in the passage.`,
  },
  {
    id: "ls-b2-405",
    type: "list_selection",
    level: "B2",
    title: "Why Bee Populations Are Falling",
    topic: "Ecology · Agriculture",
    passage:
`Honey-bee colonies in many parts of the world have declined sharply over the past two decades, and ecologists trace the trend to several converging pressures. The varroa mite, an external parasite that feeds on the body fluids of bees, weakens individual workers and spreads viral diseases throughout a colony. The intensification of agriculture has eliminated much of the wildflower habitat that once provided continuous nectar through the year, leaving managed colonies dependent on a few brief crop blooms. Certain widely used insecticides, in particular the neonicotinoid family, impair the ability of foragers to navigate back to the hive even at sub-lethal doses. Climate change adds further stress by shifting the timing of flowering so that bees emerge before, or after, the plants on which they depend. By contrast, occasional warm winters appear to have little impact on healthy colonies.`,
    instructions: "Which THREE causes of bee decline are mentioned in the passage? Choose THREE letters.",
    options: [
      { label: "A", text: "The varroa mite parasite" },
      { label: "B", text: "Loss of wildflower habitat" },
      { label: "C", text: "Increased competition from wild bumblebees" },
      { label: "D", text: "Sub-lethal effects of neonicotinoid insecticides" },
      { label: "E", text: "Occasional warm winters" },
      { label: "F", text: "Decline in beekeepers' professional skills" },
    ],
    items: [{ prompt: "Choose THREE causes mentioned in the passage.", answer: ["A", "B", "D"] }],
    analysis:
`A — varroa mite "weakens individual workers and spreads viral diseases".
B — habitat loss is described as removing year-round forage.
D — neonicotinoids "impair the ability of foragers to navigate back to the hive".

C and F are not mentioned at all.
E is the opposite of what the passage says: warm winters are said to have "little impact on healthy colonies".`,
  },
  {
    id: "ls-b2-406",
    type: "list_selection",
    level: "B2",
    title: "Why Cities Need Parks",
    topic: "Urban planning · Health",
    passage:
`Urban planners increasingly view parks and other green spaces not as decorative extras but as essential infrastructure. The benefits, supported by a growing body of research, fall into several categories. Trees and large shrubs cool the surrounding air through shade and evapotranspiration, partially offsetting the urban heat-island effect that makes city centres several degrees warmer than the surrounding countryside. Vegetated surfaces absorb rainfall that would otherwise overwhelm storm drains, easing the burden on aging sewer networks. Time spent in green environments has been linked, in numerous controlled studies, with measurable reductions in stress, blood pressure and symptoms of mild depression. Less easily quantified, but frequently cited, is the social value of a park as a place where neighbours of different backgrounds encounter one another in the course of an ordinary day. Property values, by contrast, are rarely the chief argument made by planners.`,
    instructions: "Which THREE benefits of urban parks are mentioned? Choose THREE letters.",
    options: [
      { label: "A", text: "Reducing the urban heat-island effect" },
      { label: "B", text: "Generating significant tax revenue" },
      { label: "C", text: "Absorbing storm-water and easing pressure on drains" },
      { label: "D", text: "Lower stress and blood pressure for users" },
      { label: "E", text: "Eliminating air pollution from roads" },
      { label: "F", text: "Providing a free source of food for residents" },
    ],
    items: [{ prompt: "Choose THREE benefits mentioned in the passage.", answer: ["A", "C", "D"] }],
    analysis:
`A — trees "cool the surrounding air through shade and evapotranspiration".
C — vegetation "absorb[s] rainfall that would otherwise overwhelm storm drains".
D — green environments are linked with "reductions in stress, blood pressure and symptoms of mild depression".

B is not claimed (and the passage notes property values are "rarely the chief argument").
E overstates the case: pollution is not mentioned at all.
F is not mentioned.`,
  },
  {
    id: "ls-b2-407",
    type: "list_selection",
    level: "B2",
    title: "The Engineering of Roman Roads",
    topic: "History · Engineering",
    passage:
`The road network that knitted the Roman empire together remains one of the most remarkable engineering achievements of antiquity. Roman surveyors laid out routes in long, deliberate straight lines wherever the terrain allowed, accepting steep gradients in order to shorten journeys for marching legions. The roadway itself was constructed in distinct layers: a foundation of large stones, a middle layer of gravel bound with mortar, and a top surface of carefully fitted paving stones with a slight crown so that water ran off into ditches on either side. Mile-markers, inscribed columns set every Roman mile, told travellers their distance from the capital, and a chain of staging posts allowed official messengers to change horses and continue at pace. Many of the roads remained in continuous use for more than a thousand years after the empire's fall.`,
    instructions: "Which THREE features of Roman roads are mentioned in the passage? Choose THREE letters.",
    options: [
      { label: "A", text: "Long straight alignments accepting steep gradients" },
      { label: "B", text: "Wooden bridges over every river crossing" },
      { label: "C", text: "A multi-layer construction including a paved surface" },
      { label: "D", text: "Underground heating to prevent ice in winter" },
      { label: "E", text: "Mile-markers showing distance from Rome" },
      { label: "F", text: "Toll booths every fifty kilometres" },
    ],
    items: [{ prompt: "Choose THREE features mentioned in the passage.", answer: ["A", "C", "E"] }],
    analysis:
`A — "long, deliberate straight lines wherever the terrain allowed".
C — three-layer construction is described in detail.
E — "Mile-markers, inscribed columns set every Roman mile, told travellers their distance from the capital".

B, D and F are not mentioned. Resist the temptation to choose plausible features that the writer simply does not discuss.`,
  },
  {
    id: "ls-b2-408",
    type: "list_selection",
    level: "B2",
    title: "How Caffeine Acts on the Body",
    topic: "Pharmacology · Health",
    passage:
`Caffeine is the world's most widely consumed psychoactive substance, taken daily by an estimated eighty per cent of adults. Its principal mechanism is to block adenosine receptors in the brain; because adenosine ordinarily promotes drowsiness, blocking it produces a sense of alertness. Caffeine also stimulates the release of adrenaline, which raises heart rate and mobilises stored sugar into the bloodstream, providing short-term energy. At moderate doses, the substance modestly enhances reaction times and short-term memory, and many studies report a small reduction in perceived effort during endurance exercise. Side effects can include disturbed sleep when consumed late in the day, mild anxiety in sensitive individuals, and a temporary diuretic effect. Tolerance develops with regular use, so that habitual drinkers experience smaller stimulant effects than occasional consumers.`,
    instructions: "Which THREE physiological effects of caffeine are mentioned? Choose THREE letters.",
    options: [
      { label: "A", text: "Blocking adenosine receptors in the brain" },
      { label: "B", text: "Triggering long-term changes in DNA" },
      { label: "C", text: "Stimulating the release of adrenaline" },
      { label: "D", text: "A mild diuretic effect" },
      { label: "E", text: "Permanent damage to liver tissue" },
      { label: "F", text: "Lowering blood cholesterol" },
    ],
    items: [{ prompt: "Choose THREE effects mentioned in the passage.", answer: ["A", "C", "D"] }],
    analysis:
`A — "block[s] adenosine receptors in the brain".
C — "stimulates the release of adrenaline".
D — "a temporary diuretic effect".

B, E and F are not mentioned at all.`,
  },
  {
    id: "ls-b2-409",
    type: "list_selection",
    level: "B2",
    title: "Artificial Intelligence in Medicine",
    topic: "Technology · Healthcare",
    passage:
`Hospitals around the world are beginning to integrate artificial intelligence into routine clinical work. In radiology, deep-learning systems trained on millions of labelled images now flag suspicious nodules on lung scans with accuracy comparable to that of senior radiologists, allowing human experts to focus on the most ambiguous cases. Pathologists use similar models to detect early signs of cancer in tissue samples that would otherwise require painstaking microscopic review. In intensive-care units, predictive algorithms drawing on real-time vital signs warn staff hours before a patient is likely to deteriorate, enabling earlier intervention. Beyond diagnosis and prediction, machine-learning tools are speeding up the discovery of new drugs by ranking which molecules are most likely to bind to a given biological target. By contrast, the use of robots to perform autonomous surgery without human supervision remains, for now, more aspiration than reality.`,
    instructions: "Which THREE current applications of AI in medicine are mentioned? Choose THREE letters.",
    options: [
      { label: "A", text: "Detecting suspicious nodules on lung scans" },
      { label: "B", text: "Performing autonomous surgery without supervision" },
      { label: "C", text: "Predicting patient deterioration in intensive care" },
      { label: "D", text: "Replacing all junior doctors in hospitals" },
      { label: "E", text: "Ranking candidate drug molecules for a target" },
      { label: "F", text: "Setting hospital meal menus" },
    ],
    items: [{ prompt: "Choose THREE current applications mentioned in the passage.", answer: ["A", "C", "E"] }],
    analysis:
`A — "flag suspicious nodules on lung scans".
C — predictive algorithms warn of patient deterioration in ICUs.
E — machine learning is "ranking which molecules are most likely to bind to a given biological target".

B is explicitly described as "more aspiration than reality".
D and F are not mentioned.`,
  },
  {
    id: "ls-b2-410",
    type: "list_selection",
    level: "B2",
    title: "Glaciers in Retreat",
    topic: "Climate · Geography",
    passage:
`Mountain glaciers around the world have lost roughly nine trillion tonnes of ice since the early 1960s, and the pace of melting has accelerated in the last two decades. The consequences ripple far beyond the high valleys themselves. Hundreds of millions of people in Asia and South America rely on summer meltwater to irrigate fields and supply drinking water; as glaciers shrink, that flow will rise temporarily and then fall sharply, threatening agriculture in entire river basins. Sudden bursts of water from lakes that form behind unstable moraines can trigger devastating floods downstream. Globally, melting glaciers contribute about a third of observed sea-level rise, gradually reshaping coastlines. By contrast, ski tourism in the Alps has so far adapted with artificial snow rather than collapsing outright.`,
    instructions: "Which THREE consequences of glacier retreat are mentioned in the passage? Choose THREE letters.",
    options: [
      { label: "A", text: "Long-term reduction in summer meltwater for irrigation" },
      { label: "B", text: "The collapse of Alpine ski tourism" },
      { label: "C", text: "Glacial lake outburst floods" },
      { label: "D", text: "Cooling of nearby ocean currents" },
      { label: "E", text: "Contribution to global sea-level rise" },
      { label: "F", text: "Rapid expansion of mountain forests above the tree line" },
    ],
    items: [{ prompt: "Choose THREE consequences mentioned in the passage.", answer: ["A", "C", "E"] }],
    analysis:
`A — meltwater "will rise temporarily and then fall sharply".
C — outburst floods from glacial lakes are described.
E — glaciers contribute "about a third of observed sea-level rise".

B is contradicted: ski tourism "has so far adapted".
D and F are not mentioned.`,
  },

  // ───── 10. Choose a Title (B2) — 10 new items ─────
  {
    id: "ct-b2-401",
    type: "choose_title",
    level: "B2",
    title: "Best title?",
    topic: "Agriculture · Technology",
    passage:
`Vertical farms — multi-storey indoor facilities in which leafy crops are grown on stacked trays under coloured LED lighting — have attracted extravagant claims from their supporters, who argue that they will replace much of conventional outdoor agriculture. The reality is more modest. Such farms can produce predictable yields of high-value perishables close to urban consumers, eliminating long-distance freight and reducing water use by up to ninety per cent compared with field cultivation. However, the heavy electricity demand of artificial lighting limits the range of crops for which the economics work; staples such as wheat or rice will, for the foreseeable future, continue to come from open fields. Vertical farming is best understood not as a replacement for traditional agriculture but as a useful complement that suits a narrow band of leafy and herb crops in cities where land is scarce.`,
    instructions: "Choose the BEST title for the passage.",
    options: [
      { label: "A", text: "Why traditional agriculture is finished" },
      { label: "B", text: "Vertical farming: a complement to, not a replacement for, conventional agriculture" },
      { label: "C", text: "How to set up an indoor herb garden" },
      { label: "D", text: "The history of LED lighting in industry" },
    ],
    items: [{ prompt: "Best title:", answer: "B" }],
    analysis:
`B captures the writer's central judgement: vertical farms suit a narrow range of crops and complement (rather than replace) conventional agriculture.

A overstates the writer's claim.
C is a how-to topic the passage does not discuss.
D is a marginal detail.`,
  },
  {
    id: "ct-b2-402",
    type: "choose_title",
    level: "B2",
    title: "Best title?",
    topic: "History · Knowledge",
    passage:
`Ancient libraries — among them those at Alexandria, Pergamon, and Nineveh — were never simply collections of books. They functioned as research institutions, employing scholars to copy, edit and annotate texts gathered from across the known world. The librarians of Alexandria, for instance, were said to have inspected every ship arriving in the harbour, copied any unfamiliar manuscript on board, and returned only the duplicate to its owner. Although the famous fire that destroyed much of the Alexandrian collection has dominated popular imagination, historians now emphasise that decline was a gradual process: shifting patronage, civil disorder, and the steady migration of scholars to other centres of learning all contributed. The legacy of these libraries lies less in any single building than in the scholarly practices — cataloguing, comparison and emendation of texts — that they passed on.`,
    instructions: "Choose the BEST title for the passage.",
    options: [
      { label: "A", text: "How the Library of Alexandria was burned to the ground" },
      { label: "B", text: "Ancient libraries as research institutions and the slow nature of their decline" },
      { label: "C", text: "Why modern libraries should be free to enter" },
      { label: "D", text: "The lives of three Alexandrian poets" },
    ],
    items: [{ prompt: "Best title:", answer: "B" }],
    analysis:
`B reflects both halves of the passage: ancient libraries as scholarly institutions and the gradual nature of their decline.

A focuses on a detail the passage explicitly downplays.
C is unrelated.
D is not the topic at all.`,
  },
  {
    id: "ct-b2-403",
    type: "choose_title",
    level: "B2",
    title: "Best title?",
    topic: "Biology · Health",
    passage:
`The trillions of microbes that inhabit the human gut were until recently regarded as little more than passive lodgers. A wave of research over the past fifteen years has reframed them as an active organ in their own right, influencing not only digestion but also the immune system, drug metabolism and even mood. Different individuals carry strikingly different communities of microbes, shaped by diet, antibiotic exposure and early-life conditions; this diversity may help explain why the same medicine can have very different effects on different patients. While popular accounts often promise specific probiotic cures, most scientists working in the field stress how much remains unknown about which microbial mixtures benefit whom, and they urge caution against marketing claims that outrun the evidence.`,
    instructions: "Choose the BEST title for the passage.",
    options: [
      { label: "A", text: "Why probiotic yoghurts cure most digestive illnesses" },
      { label: "B", text: "The gut microbiome: an active organ whose effects we are only beginning to understand" },
      { label: "C", text: "How antibiotics were discovered" },
      { label: "D", text: "A diet plan for losing weight quickly" },
    ],
    items: [{ prompt: "Best title:", answer: "B" }],
    analysis:
`B matches the writer's two main points: the gut microbiome is biologically active and our understanding remains incomplete.

A is exactly the kind of overstatement the passage warns against.
C and D are not the topic.`,
  },
  {
    id: "ct-b2-404",
    type: "choose_title",
    level: "B2",
    title: "Best title?",
    topic: "Technology · Society",
    passage:
`Deepfake software, which uses neural networks to swap one person's face onto another's body or to fabricate audio of someone saying words they never spoke, has matured rapidly in the past five years. Early efforts were obvious to a careful viewer; current systems can deceive most casual audiences and many trained editors. Beyond the obvious risks of political disinformation and fraudulent video calls, the technology raises subtler questions: when convincing fake footage is cheap to make, even genuine recordings can be dismissed as forgeries by anyone they inconvenience. Detection tools, often based on the very networks used to create deepfakes, lag behind the latest generators. Some legal scholars argue that the most effective response will not be technical but social: cultivating habits of source verification and treating any viral video as a claim, not a proof.`,
    instructions: "Choose the BEST title for the passage.",
    options: [
      { label: "A", text: "How to make professional-quality deepfake videos" },
      { label: "B", text: "Deepfakes: rising capabilities and the social challenge of trusting evidence" },
      { label: "C", text: "Hollywood's use of computer-generated imagery in feature films" },
      { label: "D", text: "Why neural networks were invented" },
    ],
    items: [{ prompt: "Best title:", answer: "B" }],
    analysis:
`B captures the dual focus on advancing technology AND the resulting social problem of trusting visual evidence.

A is a "how to" the passage does not provide.
C and D drift into adjacent topics that the passage does not discuss.`,
  },
  {
    id: "ct-b2-405",
    type: "choose_title",
    level: "B2",
    title: "Best title?",
    topic: "History · Trade",
    passage:
`The so-called Silk Road was never a single road, nor primarily a route for silk. Rather, it was a shifting web of overland and maritime tracks linking China, Central Asia, Persia and the Mediterranean from roughly the second century BCE until the early modern period. Silk certainly travelled west along these arteries, but so did paper, glass, spices, horses, religions and disease. Recent archaeological work emphasises the role of intermediary cities such as Samarkand and Palmyra, whose merchants seldom undertook the entire journey themselves but specialised in long-distance exchange between adjacent zones. Far from being a steady highway, the network expanded and contracted with the rise and fall of empires that could keep its caravan stages safe.`,
    instructions: "Choose the BEST title for the passage.",
    options: [
      { label: "A", text: "How silk is woven in modern China" },
      { label: "B", text: "The Silk Road as a shifting network of exchange between empires" },
      { label: "C", text: "A guide to backpacking across Central Asia today" },
      { label: "D", text: "The lives of medieval Italian merchants" },
    ],
    items: [{ prompt: "Best title:", answer: "B" }],
    analysis:
`B reflects the writer's revisionist thesis: the Silk Road was a network, not a road, and far more than a silk route.

A, C and D are unrelated to the passage's argument.`,
  },
  {
    id: "ct-b2-406",
    type: "choose_title",
    level: "B2",
    title: "Best title?",
    topic: "Climate science",
    passage:
`When a hurricane, drought or heatwave causes severe damage, journalists routinely ask whether climate change was responsible. Until recently, climate scientists could give only general answers, noting that warmer air holds more moisture or that hotter summers raise the odds of extreme heat. A growing field known as attribution science has begun to provide much more specific estimates. Researchers run vast ensembles of climate models, comparing simulations of today's atmosphere with those of a hypothetical world in which industrial greenhouse-gas emissions had never occurred. The difference in the frequency or intensity of a particular event, taken across thousands of model runs, gives a measure of how much human influence has changed its odds. The results so far suggest that many recent heatwaves have been made several times more likely by climate change, while the link to individual hurricanes remains harder to pin down.`,
    instructions: "Choose the BEST title for the passage.",
    options: [
      { label: "A", text: "How attribution science quantifies the role of climate change in extreme events" },
      { label: "B", text: "Why hurricanes are becoming weaker" },
      { label: "C", text: "A history of weather forecasting" },
      { label: "D", text: "Why climate change has nothing to do with extreme weather" },
    ],
    items: [{ prompt: "Best title:", answer: "A" }],
    analysis:
`A captures both the new method (attribution science) and its purpose (quantifying climate change's role in extreme events).

B and D contradict the passage.
C is a different topic.`,
  },
  {
    id: "ct-b2-407",
    type: "choose_title",
    level: "B2",
    title: "Best title?",
    topic: "Work · Society",
    passage:
`The phrase "digital nomad" describes a worker who relies on a laptop and an internet connection rather than a fixed office, and whose travel is not a holiday but a way of life. The pattern was emerging slowly before 2020, but the sudden normalisation of remote work during the pandemic accelerated it dramatically. Cities such as Lisbon, Bali and Medellín have responded by creating special visas and co-working districts, hoping that a steady inflow of well-paid foreigners will boost local economies. The arrangement raises questions, however: locals complain that nomads inflate rents and rarely pay local taxes, while many of the workers themselves discover that constant relocation strains relationships and offers fewer career networks than a settled base. The future of nomadism, several commentators conclude, will depend less on technology than on host cities deciding how to manage its costs as well as its benefits.`,
    instructions: "Choose the BEST title for the passage.",
    options: [
      { label: "A", text: "How to work from a beach in Bali" },
      { label: "B", text: "The pandemic's effect on global tourism" },
      { label: "C", text: "Digital nomadism: rapid growth and the questions it raises for host cities" },
      { label: "D", text: "Why visas should be abolished worldwide" },
    ],
    items: [{ prompt: "Best title:", answer: "C" }],
    analysis:
`C captures both the rise of digital nomadism and the policy questions it raises for the cities receiving the workers.

A is a how-to that the passage does not provide.
B and D drift into related but different topics.`,
  },
  {
    id: "ct-b2-408",
    type: "choose_title",
    level: "B2",
    title: "Best title?",
    topic: "Language · Culture",
    passage:
`Of the roughly seven thousand languages spoken today, linguists estimate that close to half are no longer being learned by children. When a language ceases to be passed on, it normally disappears within a generation or two, taking with it a unique system for naming the surrounding world — its plants, ancestors, weather and emotions. Documentation projects, often led by linguists working alongside community members, race to record speakers and produce dictionaries before the last fluent users die. Revitalisation, by contrast, depends on creating settings where younger generations actively use the language: schools, broadcasts and online apps. A handful of cases — Welsh in Wales and Hebrew in Israel — show that decline is not inevitable, but they also show that revival demands sustained political will and funding far beyond a single recording project.`,
    instructions: "Choose the BEST title for the passage.",
    options: [
      { label: "A", text: "How linguists pronounce difficult sounds" },
      { label: "B", text: "Language extinction and the demanding work of revival" },
      { label: "C", text: "Why everyone should learn English" },
      { label: "D", text: "A grammar of modern Welsh" },
    ],
    items: [{ prompt: "Best title:", answer: "B" }],
    analysis:
`B reflects both halves of the passage: languages disappearing and the demanding effort that revival requires.

A, C and D are not the writer's topic.`,
  },
  {
    id: "ct-b2-409",
    type: "choose_title",
    level: "B2",
    title: "Best title?",
    topic: "Architecture · History",
    passage:
`Building a Gothic cathedral was the work of generations rather than a single lifetime. Construction at Chartres, for instance, spanned more than two and a half centuries, with successive master masons modifying earlier plans as engineering knowledge advanced and money came and went. The famously thin walls and soaring ribbed vaults required innovations such as the pointed arch and the flying buttress, which redirected the immense weight of the stone roof outwards onto external piers. Workers were drawn from surrounding villages and trained on site; surviving accounts suggest that wages absorbed a significant share of regional incomes. Far from being purely religious endeavours, these cathedrals were also civic projects, expressions of a town's wealth and ambition that drew pilgrims and trade for centuries afterwards.`,
    instructions: "Choose the BEST title for the passage.",
    options: [
      { label: "A", text: "Gothic cathedrals as multi-generational engineering and civic projects" },
      { label: "B", text: "How to carve a stone gargoyle" },
      { label: "C", text: "A short history of medieval European warfare" },
      { label: "D", text: "Why modern churches are made of concrete" },
    ],
    items: [{ prompt: "Best title:", answer: "A" }],
    analysis:
`A captures both the engineering scale of Gothic cathedrals and their civic significance.

B, C and D drift into unrelated subjects.`,
  },
  {
    id: "ct-b2-410",
    type: "choose_title",
    level: "B2",
    title: "Best title?",
    topic: "Economics · Psychology",
    passage:
`For most of the twentieth century, mainstream economic models assumed that consumers were broadly rational, weighing costs and benefits to maximise their own welfare. Behavioural economics, drawing on psychology, has accumulated a long list of systematic departures from that ideal. People treat losses as roughly twice as painful as equivalent gains, persistently undervalue future rewards, and are heavily influenced by how options are framed — choosing differently when the same choice is described as "ninety per cent fat-free" rather than "ten per cent fat". Public-policy designers increasingly use such insights, building "nudges" that exploit the framing of choices to steer people towards saving more for retirement or eating less sugar. Critics argue that nudges can be paternalistic; defenders reply that all choice environments shape behaviour, so it is better to design them deliberately than by accident.`,
    instructions: "Choose the BEST title for the passage.",
    options: [
      { label: "A", text: "How interest rates are set by central banks" },
      { label: "B", text: "Behavioural economics and the rise of policy nudges" },
      { label: "C", text: "Why advertisements should be banned" },
      { label: "D", text: "A mathematical proof of consumer rationality" },
    ],
    items: [{ prompt: "Best title:", answer: "B" }],
    analysis:
`B captures the writer's two main themes: behavioural economics' findings AND their use in nudge-based policy.

A is unrelated.
C is a stronger claim than the passage makes.
D contradicts the passage.`,
  },

  // ───── 11. Short Answer Questions (B2) — 15 new items ─────
  {
    id: "sa-b2-401",
    type: "short_answer",
    level: "B2",
    title: "The Origins of the Industrial Revolution",
    topic: "History · Economics",
    passage:
`Most historians locate the beginning of the Industrial Revolution in Britain during the second half of the eighteenth century. A combination of factors helped explain the country's lead. Britain enjoyed comparatively cheap coal, scattered across accessible seams, alongside relatively expensive labour, which gave inventors a clear incentive to mechanise. The country's overseas trade, expanded by an enormous merchant fleet, supplied raw cotton from the Americas and Asia, and offered ready markets for manufactured cloth. James Watt's improved steam engine, patented in 1769, allowed power to be applied where running water was unavailable. Within a single generation, the city of Manchester grew from a market town into the world's first major industrial centre, processing imported cotton on a scale that astonished foreign visitors. By 1851, when Britain hosted the Great Exhibition in London, the country produced roughly half of the world's iron and most of its cotton textiles.`,
    instructions: "Answer the questions with NO MORE THAN THREE WORDS or a number from the passage.",
    items: [
      { prompt: "1. In which country did the Industrial Revolution begin?", answer: "Britain", acceptable: ["the UK", "United Kingdom"] },
      { prompt: "2. In which year did James Watt patent his improved steam engine?", answer: "1769" },
      { prompt: "3. Which raw material was imported from the Americas and Asia?", answer: "cotton", acceptable: ["raw cotton"] },
      { prompt: "4. Which city became the first major industrial centre?", answer: "Manchester" },
      { prompt: "5. In which year was the Great Exhibition held?", answer: "1851" },
    ],
    analysis:
`Each answer comes directly from the passage. Stay within the word limit and copy the exact form used by the writer rather than paraphrasing.`,
  },
  {
    id: "sa-b2-402",
    type: "short_answer",
    level: "B2",
    title: "The Hubble Space Telescope",
    topic: "Astronomy · Science",
    passage:
`Launched into low Earth orbit by the space shuttle Discovery on 24 April 1990, the Hubble Space Telescope was the first major optical observatory placed above the distorting effects of the atmosphere. Initial images, however, were disappointingly fuzzy: a tiny imperfection in the curvature of the primary mirror, only about two micrometres at its edge, was preventing the instrument from focusing properly. A repair mission in December 1993 fitted corrective optics that restored the telescope's intended sharpness. Over the following three decades, Hubble produced some of the most influential images in the history of astronomy, from the deep-field surveys that revealed thousands of distant galaxies in a single tiny patch of sky to detailed pictures of nebulae such as the Eagle's "Pillars of Creation". Five servicing missions extended its operating life, and the observatory was finally joined in space by the James Webb Space Telescope in 2021.`,
    instructions: "Answer the questions with NO MORE THAN THREE WORDS or a number from the passage.",
    items: [
      { prompt: "1. Which space shuttle carried Hubble into orbit?", answer: "Discovery" },
      { prompt: "2. In what month and year was Hubble launched?", answer: "April 1990" },
      { prompt: "3. Which part of the telescope was found to be defective?", answer: "primary mirror", acceptable: ["the primary mirror", "mirror"] },
      { prompt: "4. In which year was the corrective repair mission flown?", answer: "1993" },
      { prompt: "5. Which famous nebula image is named the 'Pillars of Creation'?", answer: "Eagle", acceptable: ["the Eagle", "Eagle nebula", "the Eagle nebula"] },
    ],
    analysis:
`Each answer is taken directly from the passage. Be careful with proper nouns: "Discovery" (the shuttle) and "Eagle" (the nebula) appear capitalised, which can speed scanning.`,
  },
  {
    id: "sa-b2-403",
    type: "short_answer",
    level: "B2",
    title: "Marie Curie's Two Nobel Prizes",
    topic: "Science · Biography",
    passage:
`Born in Warsaw in 1867 as Maria Skłodowska, Marie Curie left occupied Poland for France in 1891 to pursue a scientific career denied to women in her homeland. Working with her husband Pierre in a converted shed in Paris, she identified two new chemical elements — polonium, named after her native country, and radium — both of which spontaneously emitted what Marie called "radioactivity". The Curies shared the Nobel Prize for Physics in 1903 with Henri Becquerel for their work on this phenomenon. Pierre's accidental death in 1906 left Marie to continue alone, and in 1911 she received a second Nobel Prize, this time in Chemistry, for the isolation of pure radium. She remained the only person to have won Nobel Prizes in two distinct scientific disciplines until well into the twenty-first century. During the First World War she developed mobile X-ray units, dubbed "petites Curies", that allowed surgeons at the front to locate shrapnel.`,
    instructions: "Answer the questions with NO MORE THAN THREE WORDS or a number from the passage.",
    items: [
      { prompt: "1. In which city was Marie Curie born?", answer: "Warsaw" },
      { prompt: "2. In which year did she move to France?", answer: "1891" },
      { prompt: "3. Which element is named after her native country?", answer: "polonium" },
      { prompt: "4. With whom did the Curies share the 1903 Nobel Prize?", answer: "Henri Becquerel", acceptable: ["Becquerel"] },
      { prompt: "5. What were her wartime mobile X-ray units nicknamed?", answer: "petites Curies", acceptable: ["petites curies", "the petites Curies"] },
    ],
    analysis:
`All five answers appear word-for-word in the passage. When the answer is a proper noun, copy the spelling exactly, including any accents or italics.`,
  },

  // ───── 12. Sentence Completion (B2) — 12 new items ─────
  {
    id: "sc-b2-401",
    type: "sentence_completion",
    level: "B2",
    title: "Printing Before Gutenberg",
    topic: "History · Technology",
    passage:
`Movable-type printing did not begin in Europe. As early as the eleventh century, the Chinese craftsman Bi Sheng was casting individual characters from baked clay and assembling them on iron plates to print pages. The technique was refined in Korea two centuries later, where artisans replaced clay with bronze and produced what is widely regarded as the world's first surviving book printed with movable metal type, the Jikji of 1377. East Asian writing systems, however, required tens of thousands of distinct characters, which limited the economic advantage of movable type compared with woodblocks. When Johannes Gutenberg adapted the technique in Mainz around 1450, the much smaller alphabet of European scripts allowed his press to spread astonishingly fast: within fifty years, an estimated twenty million printed books had been produced across Europe.`,
    instructions: "Complete the sentences with NO MORE THAN TWO WORDS from the passage.",
    items: [
      { prompt: "1. Bi Sheng cast individual characters from baked ______.", answer: "clay" },
      { prompt: "2. Korean artisans later used ______ instead of clay.", answer: "bronze" },
      { prompt: "3. The Korean book Jikji was printed in the year ______.", answer: "1377" },
      { prompt: "4. Within fifty years of Gutenberg's adaptation, around ______ million printed books had appeared.", answer: "twenty", acceptable: ["20"] },
    ],
    analysis:
`(1) clay — "casting individual characters from baked clay".
(2) bronze — "replaced clay with bronze".
(3) 1377 — date of the Jikji.
(4) twenty (or 20) — "an estimated twenty million printed books".`,
  },
  {
    id: "sc-b2-402",
    type: "sentence_completion",
    level: "B2",
    title: "Long-Distance Migration in Birds",
    topic: "Biology · Behaviour",
    passage:
`Among the most remarkable feats of animal navigation are the long-distance migrations of certain bird species. The bar-tailed godwit, for instance, has been tracked flying without rest from Alaska to New Zealand, a journey of roughly twelve thousand kilometres completed in around eight days. Before departure, the birds nearly double their body weight by storing fat that will fuel the trip and even reduce the size of digestive organs they will not need in flight. To maintain their course they appear to use a combination of cues, including the position of the sun, an internal magnetic compass and patterns of polarised light. Climate change is now altering the timing of food availability at key stopover sites, raising concerns about whether long-distance migrants can adjust their schedules quickly enough to avoid arriving when their preferred prey has already vanished.`,
    instructions: "Complete the sentences with NO MORE THAN TWO WORDS from the passage.",
    items: [
      { prompt: "1. Bar-tailed godwits travel roughly ______ kilometres on their flight.", answer: "twelve thousand", acceptable: ["12,000", "12000"] },
      { prompt: "2. The flight takes about ______ days to complete.", answer: "eight", acceptable: ["8"] },
      { prompt: "3. Before leaving they nearly double their body weight by storing ______.", answer: "fat" },
      { prompt: "4. Among the cues they use is an internal ______ compass.", answer: "magnetic" },
    ],
    analysis:
`Each answer is lifted directly from the passage. Watch the word limit: "magnetic compass" would exceed TWO WORDS only if you include "internal" — keep just the key descriptor.`,
  },
  {
    id: "sc-b2-403",
    type: "sentence_completion",
    level: "B2",
    title: "The Limits of Photosynthesis",
    topic: "Biology · Plants",
    passage:
`Photosynthesis, the process by which plants convert sunlight into chemical energy, is far less efficient than its biological importance might suggest. Of the solar energy reaching a leaf, only about one to two per cent is typically captured as biomass, with the rest reflected, wasted as heat, or used to drive water loss through transpiration. Several factors limit the rate of the reaction: the concentration of carbon dioxide in the air, the availability of water and key nutrients such as nitrogen, and the temperature of the leaf itself. The enzyme RuBisCO, which captures atmospheric carbon dioxide, is also notoriously slow and frequently reacts with oxygen instead, a side reaction known as photorespiration that wastes energy. Engineering crops with more efficient photosynthesis is therefore one of the most active areas of plant research, with a potential to raise yields without expanding cultivated land.`,
    instructions: "Complete the sentences with NO MORE THAN TWO WORDS from the passage.",
    items: [
      { prompt: "1. Only about ______ per cent of the solar energy reaching a leaf is captured as biomass.", answer: "one to two", acceptable: ["1 to 2", "1-2"] },
      { prompt: "2. Among the limiting nutrients is the element ______.", answer: "nitrogen" },
      { prompt: "3. The enzyme that captures carbon dioxide is called ______.", answer: "RuBisCO", acceptable: ["rubisco"] },
      { prompt: "4. RuBisCO's wasteful side reaction with oxygen is known as ______.", answer: "photorespiration" },
    ],
    analysis:
`(1) one to two — efficiency figure.
(2) nitrogen — listed as a "key nutrient".
(3) RuBisCO — the named enzyme.
(4) photorespiration — the side reaction with oxygen.`,
  },

  // ───── 13. Summary Completion (B2) — 10 new items ─────
  {
    id: "sumc-b2-401",
    type: "summary_completion",
    level: "B2",
    title: "How Plate Tectonics Reshapes the Earth",
    topic: "Geology · Earth science",
    passage:
`The outer shell of the Earth is not a single solid skin but is broken into a dozen or so rigid pieces called tectonic plates. Driven by slow currents in the underlying mantle, these plates inch across the surface at rates of a few centimetres a year. Where two plates pull apart at a divergent boundary, molten rock rises to fill the gap, forming new ocean floor along mid-ocean ridges. Where two plates collide at a convergent boundary, one is usually forced down beneath the other in a process called subduction, generating chains of volcanoes and triggering some of the planet's most powerful earthquakes. A third type of boundary, transform, occurs where two plates slide past each other horizontally, as along California's San Andreas Fault. Recognising these patterns has allowed geologists to explain phenomena that once seemed unrelated, from the matching coastlines of Africa and South America to the distribution of mountain ranges and earthquake zones.`,
    instructions: "Complete the summary using letters from the box. Each option may be used ONCE.",
    options: [
      { label: "A", text: "subduction" },
      { label: "B", text: "divergent" },
      { label: "C", text: "transform" },
      { label: "D", text: "mantle" },
      { label: "E", text: "ridges" },
      { label: "F", text: "earthquakes" },
      { label: "G", text: "rainfall" },
      { label: "H", text: "compass" },
    ],
    items: [
      { prompt: "Plates are driven by currents in the (1) ______. At (2) ______ boundaries molten rock forms new sea floor along mid-ocean (3) ______. At convergent boundaries, one plate slides under the other in a process called (4) ______, producing volcanoes and major (5) ______. — Gap 1:", answer: "D" },
      { prompt: "Gap 2:", answer: "B" },
      { prompt: "Gap 3:", answer: "E" },
      { prompt: "Gap 4:", answer: "A" },
      { prompt: "Gap 5:", answer: "F" },
    ],
    analysis:
`(1) D mantle — "slow currents in the underlying mantle".
(2) B divergent — "Where two plates pull apart at a divergent boundary".
(3) E ridges — "mid-ocean ridges".
(4) A subduction — "process called subduction".
(5) F earthquakes — convergent boundaries trigger "powerful earthquakes".

C (transform) and G/H are distractors.`,
  },
  {
    id: "sumc-b2-402",
    type: "summary_completion",
    level: "B2",
    title: "Why We Remember Emotional Events",
    topic: "Psychology · Neuroscience",
    passage:
`Most everyday experiences fade from memory within hours, yet emotionally charged events — a frightening accident, an unexpected joy — often remain vivid for decades. Neuroscientists trace this difference to a small almond-shaped structure called the amygdala, which lies adjacent to the hippocampus, the brain's main memory hub. When an experience triggers strong emotion, the amygdala releases stress hormones such as cortisol that strengthen the hippocampal encoding of the event. The result is a memory that is unusually rich in sensory detail and resistant to forgetting. However, this same mechanism explains why traumatic memories can become intrusive: the very vividness that helps us learn from danger can in some individuals lock distressing scenes into long-term storage. Modern therapies for post-traumatic stress aim to weaken these connections through controlled re-exposure or, more recently, drugs that interfere with hormone-driven consolidation.`,
    instructions: "Complete the summary using letters from the box. Each option may be used ONCE.",
    options: [
      { label: "A", text: "amygdala" },
      { label: "B", text: "hippocampus" },
      { label: "C", text: "cortisol" },
      { label: "D", text: "vivid" },
      { label: "E", text: "intrusive" },
      { label: "F", text: "muscles" },
      { label: "G", text: "appetite" },
      { label: "H", text: "rainfall" },
    ],
    items: [
      { prompt: "Strong emotion activates the (1) ______, which sits next to the brain's main memory hub, the (2) ______. The amygdala releases stress hormones such as (3) ______, producing memories that are unusually (4) ______. The same mechanism can make traumatic memories (5) ______. — Gap 1:", answer: "A" },
      { prompt: "Gap 2:", answer: "B" },
      { prompt: "Gap 3:", answer: "C" },
      { prompt: "Gap 4:", answer: "D" },
      { prompt: "Gap 5:", answer: "E" },
    ],
    analysis:
`(1) A amygdala — the named brain structure.
(2) B hippocampus — "the brain's main memory hub".
(3) C cortisol — example stress hormone.
(4) D vivid — "rich in sensory detail" and "vividness".
(5) E intrusive — "traumatic memories can become intrusive".

F, G and H are unrelated distractors.`,
  },

  // ───── 14. Table Completion (B2) — 12 new items ─────
  {
    id: "tbl-b2-401",
    type: "table_completion",
    level: "B2",
    title: "Three Ancient Civilisations Compared",
    topic: "History · Archaeology",
    passage:
`Three of the earliest urban civilisations developed in fertile river valleys, yet their cultures and writing systems differed sharply. The Sumerians, who flourished in southern Mesopotamia between roughly 3500 and 2000 BCE, lived in city-states irrigated by the Tigris and Euphrates and recorded transactions in a wedge-shaped script known as cuneiform, pressed into clay tablets with a reed stylus. Almost a thousand years later in the Indus Valley, the people of Harappa and Mohenjo-daro built remarkably uniform brick cities laid out on grid plans, with sophisticated drainage and standardised weights, but their script remains undeciphered. In Egypt, an enduring kingdom emerged along the Nile around 3100 BCE, sustained by the river's predictable annual flood; its scribes wrote in hieroglyphs on papyrus and stone, and its monumental architecture culminated in the pyramids of the Old Kingdom.`,
    instructions: "Complete the table. Use NO MORE THAN TWO WORDS from the passage.",
    visual:
`┌─────────────┬───────────────────────┬────────────────────────┬──────────────────────────────┐
│ Civilisation│ River basin           │ Writing system         │ Notable feature              │
├─────────────┼───────────────────────┼────────────────────────┼──────────────────────────────┤
│ Sumerian    │ (1) ______ & Euphrates│ cuneiform              │ recorded on clay tablets     │
│ Indus Valley│ Indus                 │ (2) ______             │ uniform brick (3) ______     │
│ Egyptian    │ (4) ______            │ hieroglyphs            │ pyramids of the Old Kingdom  │
└─────────────┴───────────────────────┴────────────────────────┴──────────────────────────────┘`,
    items: [
      { prompt: "Cell (1)", answer: "Tigris", acceptable: ["the Tigris"] },
      { prompt: "Cell (2)", answer: "undeciphered", acceptable: ["script undeciphered"] },
      { prompt: "Cell (3)", answer: "cities", acceptable: ["brick cities"] },
      { prompt: "Cell (4)", answer: "Nile", acceptable: ["the Nile"] },
    ],
    analysis:
`(1) Tigris — "irrigated by the Tigris and Euphrates".
(2) undeciphered — "their script remains undeciphered".
(3) cities — "uniform brick cities laid out on grid plans".
(4) Nile — Egypt "emerged along the Nile".`,
  },
  {
    id: "tbl-b2-402",
    type: "table_completion",
    level: "B2",
    title: "Three Movements in European Painting",
    topic: "Art history",
    passage:
`The Italian Renaissance, beginning in fifteenth-century Florence, prized balanced composition, anatomical accuracy and the systematic use of linear perspective; its leading figures included Leonardo da Vinci and Raphael. The Baroque style that followed in the seventeenth century, exemplified by Caravaggio in Rome, abandoned that calm symmetry in favour of dramatic contrasts of light and shadow — a technique known as chiaroscuro — and intense emotional expression intended to move the viewer. Two centuries later, the French Impressionists rejected studio convention altogether: artists such as Claude Monet and Pierre-Auguste Renoir worked outdoors in changing daylight, using rapid, visible brushstrokes to capture transient effects of colour and atmosphere rather than precise outline.`,
    instructions: "Complete the table. Use NO MORE THAN TWO WORDS from the passage.",
    visual:
`┌────────────────┬──────────────────────┬──────────────────────────┬──────────────────────────┐
│ Movement       │ Period / place       │ Key technique            │ Leading artist           │
├────────────────┼──────────────────────┼──────────────────────────┼──────────────────────────┤
│ Renaissance    │ 15c (1) ______       │ linear perspective       │ Leonardo da Vinci        │
│ Baroque        │ 17c Rome             │ (2) ______               │ (3) ______               │
│ Impressionism  │ 19c France           │ visible brushstrokes     │ (4) ______               │
└────────────────┴──────────────────────┴──────────────────────────┴──────────────────────────┘`,
    items: [
      { prompt: "Cell (1)", answer: "Florence" },
      { prompt: "Cell (2)", answer: "chiaroscuro" },
      { prompt: "Cell (3)", answer: "Caravaggio" },
      { prompt: "Cell (4)", answer: "Claude Monet", acceptable: ["Monet", "Pierre-Auguste Renoir", "Renoir"] },
    ],
    analysis:
`(1) Florence — "beginning in fifteenth-century Florence".
(2) chiaroscuro — the named technique used in Baroque painting.
(3) Caravaggio — "exemplified by Caravaggio in Rome".
(4) Claude Monet (or Renoir) — both are named as leading Impressionists.`,
  },
  {
    id: "tbl-b2-403",
    type: "table_completion",
    level: "B2",
    title: "Three Rocky Planets Compared",
    topic: "Astronomy",
    passage:
`The four innermost worlds of the Solar System are all rocky, but their atmospheres differ dramatically. Venus, almost identical in size to Earth, is shrouded in a dense atmosphere of carbon dioxide; the resulting greenhouse effect raises surface temperatures to around 465 degrees Celsius, hotter than Mercury despite Venus's greater distance from the Sun. Earth, the only known abode of life, has an atmosphere of nitrogen and oxygen and a mean surface temperature of about 15 degrees Celsius. Mars, considerably smaller, retains only a thin atmosphere — chiefly carbon dioxide at less than one per cent of Earth's pressure — and its average temperature hovers near minus 60 degrees Celsius. Although liquid water once flowed on the Martian surface, today it survives only as ice or in fleeting briny trickles.`,
    instructions: "Complete the table. Use NO MORE THAN TWO WORDS from the passage.",
    visual:
`┌────────┬──────────────────────────┬──────────────────────────┬─────────────────────────┐
│ Planet │ Main atmospheric gas     │ Surface temperature (°C) │ Notable feature         │
├────────┼──────────────────────────┼──────────────────────────┼─────────────────────────┤
│ Venus  │ (1) ______               │ around 465               │ extreme greenhouse effect│
│ Earth  │ nitrogen and oxygen      │ about (2) ______         │ only known life         │
│ Mars   │ carbon dioxide (thin)    │ near minus (3) ______    │ (4) ______ once flowed  │
└────────┴──────────────────────────┴──────────────────────────┴─────────────────────────┘`,
    items: [
      { prompt: "Cell (1)", answer: "carbon dioxide", acceptable: ["CO2"] },
      { prompt: "Cell (2)", answer: "15", acceptable: ["fifteen"] },
      { prompt: "Cell (3)", answer: "60", acceptable: ["sixty"] },
      { prompt: "Cell (4)", answer: "liquid water", acceptable: ["water"] },
    ],
    analysis:
`(1) carbon dioxide — Venus's "dense atmosphere of carbon dioxide".
(2) 15 — Earth's "mean surface temperature of about 15 degrees Celsius".
(3) 60 — Mars's "average temperature hovers near minus 60 degrees Celsius".
(4) liquid water — "liquid water once flowed on the Martian surface".`,
  },

  // ───── 15. Flow Chart Completion (B2) — 12 new items ─────
  {
    id: "fc-b2-401",
    type: "flow_chart_completion",
    level: "B2",
    title: "How a Hurricane Develops",
    topic: "Meteorology · Process",
    passage:
`Hurricanes form only over warm tropical oceans where the surface temperature exceeds about 26 degrees Celsius. Heated water evaporates rapidly, supplying moist air that rises in vigorous convection currents. As that air ascends and cools, the water vapour it carries condenses, releasing the latent heat that powers the storm. The Earth's rotation deflects the inflowing air, organising it into a spinning vortex around an area of low pressure called the eye. As long as the storm remains over warm water and is not torn apart by strong upper-level winds, the cycle of evaporation, condensation and inflow feeds itself, allowing wind speeds to grow. Once the hurricane reaches land or moves over cooler water, its energy supply is cut off and it weakens rapidly, although it may still cause severe flooding from rain.`,
    instructions: "Complete the flow chart. Use NO MORE THAN TWO WORDS from the passage.",
    visual:
`Sea surface temperature exceeds about (1) ______ °C
            ↓
Warm water evaporates and moist air (2) ______
            ↓
Vapour cools high up and (3) ______, releasing latent heat
            ↓
Earth's rotation deflects inflow into a spinning vortex around the (4) ______
            ↓
Storm sustained over warm water → wind speeds grow`,
    items: [
      { prompt: "Step (1)", answer: "26", acceptable: ["twenty-six"] },
      { prompt: "Step (2)", answer: "rises" },
      { prompt: "Step (3)", answer: "condenses" },
      { prompt: "Step (4)", answer: "eye", acceptable: ["the eye"] },
    ],
    analysis:
`(1) 26 — "exceeds about 26 degrees Celsius".
(2) rises — "moist air that rises in vigorous convection currents".
(3) condenses — "the water vapour it carries condenses".
(4) eye — "a spinning vortex around an area of low pressure called the eye".`,
  },
  {
    id: "fc-b2-402",
    type: "flow_chart_completion",
    level: "B2",
    title: "How a New Vaccine is Developed",
    topic: "Medicine · Process",
    passage:
`Bringing a new vaccine to the public is a multi-stage process that historically takes a decade or more. Researchers begin in the laboratory by selecting a target — typically a fragment of a virus or bacterium — capable of provoking a protective immune response without causing disease. Promising candidates then enter pre-clinical testing in cells and laboratory animals to assess basic safety and immunogenicity. Successful candidates progress to phase I clinical trials, in which a small group of healthy volunteers receives the vaccine to check tolerability. Phase II trials extend testing to several hundred people to refine the dose, while phase III trials compare the vaccine against a placebo in tens of thousands of participants to confirm efficacy. Only after a national regulator reviews the accumulated data is the vaccine licensed for public use, and even then the manufacturer must continue post-market surveillance to detect rare side effects.`,
    instructions: "Complete the flow chart. Use NO MORE THAN TWO WORDS from the passage.",
    visual:
`Researchers select a viral or bacterial (1) ______
            ↓
Pre-clinical testing in cells and laboratory animals
            ↓
Phase I trials in healthy (2) ______
            ↓
Phase II trials refine the (3) ______
            ↓
Phase III trials confirm efficacy against a (4) ______
            ↓
Regulator licenses vaccine; post-market surveillance begins`,
    items: [
      { prompt: "Step (1)", answer: "fragment", acceptable: ["target", "viral fragment"] },
      { prompt: "Step (2)", answer: "volunteers", acceptable: ["healthy volunteers"] },
      { prompt: "Step (3)", answer: "dose" },
      { prompt: "Step (4)", answer: "placebo" },
    ],
    analysis:
`(1) fragment — "selecting a target — typically a fragment of a virus or bacterium".
(2) volunteers — "a small group of healthy volunteers".
(3) dose — phase II trials "refine the dose".
(4) placebo — phase III trials "compare the vaccine against a placebo".`,
  },
  {
    id: "fc-b2-403",
    type: "flow_chart_completion",
    level: "B2",
    title: "How Wine is Made",
    topic: "Food science · Process",
    passage:
`The transformation of grapes into wine has been refined over centuries, but its essential steps remain the same. After harvest, the grapes are first crushed to release their juice, in a stage traditionally called pressing. The resulting must — juice, skins and seeds — is transferred to fermentation tanks, where naturally present or added yeast converts sugars into alcohol and carbon dioxide over one to two weeks. Once fermentation is complete, the young wine is racked off the sediment and moved to barrels, often of oak, where it is allowed to mature for periods ranging from a few months to several years; during this time subtle reactions develop the wine's flavour and complexity. The matured wine is finally clarified to remove suspended particles, blended to achieve a consistent style, and bottled. Many bottles continue to evolve in the cellar, with high-quality reds in particular benefiting from additional ageing.`,
    instructions: "Complete the flow chart. Use NO MORE THAN TWO WORDS from the passage.",
    visual:
`Harvested grapes are (1) ______ to release juice
            ↓
Must is transferred to fermentation tanks where (2) ______ converts sugars to alcohol
            ↓
Young wine is racked and matured in (3) ______, often oak
            ↓
Wine is clarified, blended and (4) ______`,
    items: [
      { prompt: "Step (1)", answer: "crushed", acceptable: ["pressed"] },
      { prompt: "Step (2)", answer: "yeast" },
      { prompt: "Step (3)", answer: "barrels" },
      { prompt: "Step (4)", answer: "bottled" },
    ],
    analysis:
`(1) crushed — "the grapes are first crushed to release their juice".
(2) yeast — "naturally present or added yeast converts sugars into alcohol".
(3) barrels — "moved to barrels, often of oak".
(4) bottled — "blended to achieve a consistent style, and bottled".`,
  },

  // ───── 16. Diagram Completion (B2) — 10 new items ─────
  {
    id: "dg-b2-401",
    type: "diagram_completion",
    level: "B2",
    title: "Anatomy of the Human Eye",
    topic: "Biology · Anatomy",
    passage:
`Light entering the human eye passes first through the cornea, the transparent dome that does most of the eye's focusing. Behind the cornea, the coloured iris adjusts the size of an opening called the pupil to control how much light reaches the interior. The lens, a flexible disc behind the pupil, makes fine focusing adjustments by changing shape, a process known as accommodation. Light then crosses the gel-filled chamber of the eye and falls on the retina, a thin layer of light-sensitive cells lining the inner back surface. Two main types of receptor are found there: rods, which work in dim light and detect movement, and cones, concentrated near the centre, which provide colour vision. Signals from these cells are gathered by the optic nerve, which carries them to the brain.`,
    instructions: "Label the diagram. Use NO MORE THAN TWO WORDS from the passage.",
    visual:
`         Light →  ╭──────────────╮
                  │              │
   (1) ______ ──→ │ ◯  ←── (2) ______ (coloured ring)
                  │              │
                  │ ◌  ←── (3) ______ (flexible focusing disc)
                  │              │
                  │   ▒▒▒▒▒▒▒▒   ──── (4) ______ (light-sensitive lining)
                  │              │
                  ╰─────╮────────╯
                        ╰──→  (5) ______  → brain`,
    items: [
      { prompt: "Label (1) — transparent front dome", answer: "cornea", acceptable: ["the cornea"] },
      { prompt: "Label (2) — coloured ring around the pupil", answer: "iris", acceptable: ["the iris"] },
      { prompt: "Label (3) — flexible focusing disc", answer: "lens", acceptable: ["the lens"] },
      { prompt: "Label (4) — light-sensitive lining at the back", answer: "retina", acceptable: ["the retina"] },
      { prompt: "Label (5) — nerve carrying signals to the brain", answer: "optic nerve", acceptable: ["the optic nerve"] },
    ],
    analysis:
`(1) cornea — "the transparent dome that does most of the eye's focusing".
(2) iris — "the coloured iris adjusts the size of an opening".
(3) lens — "a flexible disc behind the pupil".
(4) retina — "a thin layer of light-sensitive cells lining the inner back surface".
(5) optic nerve — "the optic nerve, which carries them to the brain".`,
  },
  {
    id: "dg-b2-402",
    type: "diagram_completion",
    level: "B2",
    title: "Parts of a Modern Wind Turbine",
    topic: "Engineering · Energy",
    passage:
`A modern utility-scale wind turbine consists of three main rotor blades attached to a horizontal hub, which together act as the propeller that captures the wind. The hub is mounted on a low-speed shaft that enters the nacelle, a streamlined housing at the top of the tower. Inside the nacelle, a gearbox steps the rotation up to the high speeds required by the generator, which converts the mechanical motion into electricity. A separate yaw mechanism rotates the entire nacelle to face the prevailing wind, while pitch motors at the hub adjust the angle of each blade for optimal efficiency. Power is conducted down the inside of the steel tower to a transformer at the base, which raises the voltage before feeding the electricity into the grid.`,
    instructions: "Label the diagram. Use NO MORE THAN TWO WORDS from the passage.",
    visual:
`        ╲      │      ╱   ←── three rotor (1) ______
         ╲     │     ╱
          ╲___╱│╲___╱
              │
        ┌─────╪─────┐  ←── (2) ______ (housing on top of tower)
        │  ⚙   ⚡   │
        └─────╪─────┘
              │       gearbox steps shaft up to high speed for the (3) ______
              │
              │  ←── steel (4) ______
              │
            ══╪══
              ▼
            ▢▢▢   ←── (5) ______ at base raises the voltage`,
    items: [
      { prompt: "Label (1) — three of these capture the wind", answer: "blades", acceptable: ["rotor blades"] },
      { prompt: "Label (2) — streamlined housing at the top", answer: "nacelle", acceptable: ["the nacelle"] },
      { prompt: "Label (3) — converts mechanical motion to electricity", answer: "generator", acceptable: ["the generator"] },
      { prompt: "Label (4) — vertical structure", answer: "tower", acceptable: ["the tower", "steel tower"] },
      { prompt: "Label (5) — raises the voltage before grid feed", answer: "transformer", acceptable: ["the transformer"] },
    ],
    analysis:
`(1) blades — "three main rotor blades".
(2) nacelle — "a streamlined housing at the top of the tower".
(3) generator — "the generator, which converts the mechanical motion into electricity".
(4) tower — "the steel tower".
(5) transformer — "a transformer at the base, which raises the voltage".`,
  },
];

export default supplements;
