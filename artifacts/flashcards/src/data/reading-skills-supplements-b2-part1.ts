import type { SkillExercise } from "./reading-skills";

/**
 * B2 (Upper-Intermediate) supplement exercises — PART 1.
 * Covers the FIRST 8 question types only:
 *   1. skimming                  (+9)
 *   2. scanning                  (+15)
 *   3. matching_headings         (+11)
 *   4. matching_information      (+10)
 *   5. matching_features         (+10)
 *   6. matching_sentence_endings (+11)
 *   7. true_false_not_given      (+10)
 *   8. multiple_choice           (+8)
 *
 * Style: Cambridge IELTS Academic — 200–300 word passages, academic register,
 * complex syntax, nominalisation, passive voice, paraphrasing-heavy distractors.
 *
 * IDs in the 301+ range (A2 = 101+, B1 = 201+, B2 PART 1 = 301+, B2 PART 2 = 401+).
 */

const supplements: SkillExercise[] = [
  // ───────────────────── 1. Skimming (need +9) ─────────────────────
  {
    id: "sk-b2-301",
    type: "skimming",
    level: "B2",
    title: "The Quiet Revolution in Battery Storage",
    topic: "Energy · Technology",
    passage:
`The transformation of the global electricity system has been driven less by spectacular technological breakthroughs than by a steady, often overlooked decline in the cost of lithium-ion battery storage. Between 2010 and the early 2020s, the price of a kilowatt-hour of battery capacity fell by roughly ninety per cent, a trajectory that has fundamentally altered the economics of integrating intermittent renewable sources such as wind and solar into national grids. Utilities once dismissed batteries as too expensive for anything beyond niche applications; today, grid-scale installations regularly absorb surplus midday solar generation and release it after sunset, reducing the need for fossil-fuelled peaking plants. The same chemistry has reshaped transport, making electric vehicles cost-competitive with their internal-combustion equivalents in a growing number of markets. Critics caution that the supply chains for lithium, cobalt and nickel raise serious environmental and geopolitical questions, and that recycling capacity has not kept pace with deployment. Nevertheless, most independent analysts now treat continued cost reductions as the central assumption underpinning credible decarbonisation pathways for the coming decade.`,
    instructions: "Skim the passage and choose the BEST answer.",
    options: [
      { label: "A", text: "A history of lithium mining and its environmental impact" },
      { label: "B", text: "How falling battery costs are reshaping electricity and transport" },
      { label: "C", text: "Why electric vehicles will replace petrol cars within ten years" },
      { label: "D", text: "The chemistry of modern lithium-ion cells" },
    ],
    items: [{ prompt: "What is the writer's main purpose?", answer: "B" }],
    analysis:
`B is correct. The passage focuses on the consequences of cheaper batteries for both grids (storing solar) and transport (electric vehicles).

A: lithium supply concerns are mentioned only briefly as a caveat.
C: the writer makes no such firm prediction; EVs are simply "cost-competitive… in a growing number of markets".
D: the chemistry itself is never explained.

Cambridge tip: when a passage introduces a single trend (here, falling costs) and traces its effects across SEVERAL sectors, the main idea usually combines the trend with its consequences.`,
  },
  {
    id: "sk-b2-302",
    type: "skimming",
    level: "B2",
    title: "Rewilding Europe's Margins",
    topic: "Environment · Conservation",
    passage:
`Across parts of rural Europe, conservationists have begun to argue that the most effective response to ecological decline is not the careful management of small reserves but the deliberate withdrawal of human intervention from large blocks of marginal land. So-called rewilding projects, which now span territories from the Iberian Peninsula to the Carpathian Mountains, allow former farmland and degraded forest to recover under the influence of natural processes such as flooding, herbivory and predation. Where keystone species — beavers, lynx, wolves, vultures — have been reintroduced, surveys have recorded measurable rebounds in invertebrate, bird and amphibian populations within a decade. Supporters maintain that these benefits come at modest public cost compared with conventional agri-environment schemes, and that abandoned uplands are unlikely ever to return to economically viable farming. Critics, however, point to the displacement of traditional pastoral communities and to the difficulty of containing the reintroduced predators within project boundaries. The political debate, in short, is no longer about whether nature can recover, but about who should decide how, and at what social cost, the recovery is allowed to proceed.`,
    instructions: "Skim the passage and choose the BEST answer.",
    options: [
      { label: "A", text: "To explain the biology of European wolves and lynx" },
      { label: "B", text: "To argue that rewilding has no economic disadvantages" },
      { label: "C", text: "To describe the ecological promise of rewilding and the controversy surrounding it" },
      { label: "D", text: "To compare rewilding projects in Europe and North America" },
    ],
    items: [{ prompt: "What is the writer's main purpose?", answer: "C" }],
    analysis:
`C is correct. The passage presents the ecological case for rewilding (recovery of bird and amphibian populations) AND the social objections (displacement of pastoral communities).

A: predator biology is not discussed.
B: the text explicitly raises social costs, so this is too one-sided.
D: only Europe is covered; no comparison with North America.

Cambridge tip: a balanced final sentence that frames a "debate" almost always indicates a balanced overall purpose.`,
  },
  {
    id: "sk-b2-303",
    type: "skimming",
    level: "B2",
    title: "The Reinvention of the High Street",
    topic: "Society · Economics",
    passage:
`For much of the past two decades, commentary on Britain's traditional high streets has dwelt almost exclusively on decline: the closure of department stores, the spread of empty units and the steady migration of consumer spending to online platforms. A growing body of urban research, however, suggests that this picture is incomplete. In several mid-sized towns, vacant retail space has been converted into independent cafés, dental surgeries, exercise studios, co-working hubs and community libraries — uses that draw their customers from a shorter radius and depend less on impulse browsing than on planned visits. Where local councils have invested in widened pavements, secure cycle parking and frequent bus services, footfall measured at peak hours has begun to recover, even where overall retail floor-space continues to shrink. Researchers conclude that the high street of the next generation is unlikely to resemble its twentieth-century predecessor. It will instead function as a denser, more mixed urban setting in which retail is one ingredient among several, and in which proximity, sociability and convenience matter at least as much as choice or price.`,
    instructions: "Skim the passage and choose the BEST answer.",
    options: [
      { label: "A", text: "To prove that online shopping has destroyed the British high street" },
      { label: "B", text: "To argue that high streets are evolving rather than simply dying" },
      { label: "C", text: "To advertise a new shopping centre in a mid-sized town" },
      { label: "D", text: "To describe how to start an independent café" },
    ],
    items: [{ prompt: "What is the writer's main purpose?", answer: "B" }],
    analysis:
`B is correct. The text accepts the decline narrative ("incomplete") and then describes a reinvention through services, cafés and improved infrastructure.

A: the writer challenges this view, not endorses it.
C: no specific shopping centre is promoted.
D: opening a café is one example, not the topic.

Cambridge tip: words such as "incomplete", "instead" and "reinvention" signal a writer is correcting a familiar narrative — that correction is usually the main idea.`,
  },
  {
    id: "sk-b2-304",
    type: "skimming",
    level: "B2",
    title: "How Cities Adapt to Heat",
    topic: "Environment · Urban planning",
    passage:
`Urban heat islands — the well-documented tendency of densely built environments to retain heat long after sunset — have begun to receive sustained policy attention as climate projections point to longer, hotter summers across temperate latitudes. Conventional engineering responses such as widespread air-conditioning are unattractive at city scale because they consume large amounts of electricity and discharge waste heat back into the surrounding streets. A different family of interventions, often grouped under the banner of "passive cooling", has therefore gained ground. These measures range from the strategic planting of broadleaf street trees to the use of high-albedo paints on roofs, the daylighting of buried streams and the construction of so-called cool corridors that link parks, riversides and shaded courtyards. Pilot projects in Athens, Medellín and Singapore suggest that even modest combinations of such measures can lower perceived afternoon temperatures by several degrees while reducing demand on the electrical grid. Critics caution that without sustained maintenance — particularly the irrigation of new tree canopies during prolonged drought — the projected gains may erode within a few years.`,
    instructions: "Skim the passage and choose the BEST answer.",
    options: [
      { label: "A", text: "How to install efficient domestic air-conditioning" },
      { label: "B", text: "Passive ways cities are adapting to rising urban temperatures" },
      { label: "C", text: "Why temperate climates will become tropical within a decade" },
      { label: "D", text: "The history of urban park design in Europe" },
    ],
    items: [{ prompt: "Which option best summarises the passage?", answer: "B" }],
    analysis:
`B is correct. The passage describes a family of "passive cooling" measures (trees, reflective paint, cool corridors) and their results in pilot cities.

A: air-conditioning is mentioned only as an unattractive contrast.
C: no such specific prediction is made.
D: parks appear only as one ingredient, not the topic.

Cambridge tip: a list of related strategies inside one paragraph is often a clue that the passage is describing a category — choose the option that names the category.`,
  },
  {
    id: "sk-b2-305",
    type: "skimming",
    level: "B2",
    title: "The Slow Erosion of Coastal Wetlands",
    topic: "Environment · Geography",
    passage:
`Coastal wetlands — salt marshes, mangroves and tidal mudflats — perform a remarkable range of services for both humans and wildlife. They buffer shorelines from storm surges, trap sediment that would otherwise be lost to the open sea, and store carbon in their waterlogged soils at rates several times higher than terrestrial forests. Despite this acknowledged value, global cover has fallen by roughly half over the past century, the result of land reclamation for housing and aquaculture, the upstream damming of sediment-bearing rivers and, increasingly, the squeezing of marshes between fixed sea walls and rising tides. Restoration projects are now underway in dozens of countries, ranging from the controlled breaching of seventeenth-century embankments along the English east coast to the replanting of mangrove fringes around tropical aquaculture ponds. Early monitoring suggests that wetland functions can return surprisingly quickly when hydrology is restored, although the recovery of certain specialist invertebrates may take several decades. Conservationists argue that protecting and re-creating these habitats remains one of the most cost-effective forms of climate adaptation available to coastal communities.`,
    instructions: "Skim the passage and choose the BEST answer.",
    options: [
      { label: "A", text: "Coastal wetlands — their value, decline and the case for restoration" },
      { label: "B", text: "How to build a sea wall on the English east coast" },
      { label: "C", text: "Why mangrove timber is harvested for aquaculture" },
      { label: "D", text: "A history of land reclamation in seventeenth-century Europe" },
    ],
    items: [{ prompt: "Best title for the passage:", answer: "A" }],
    analysis:
`A is correct. The passage moves through value (storm buffering, carbon storage), decline (loss of half of global cover) and restoration efforts.

B: sea walls are mentioned only as a problem (squeezing marshes).
C: timber harvesting is not discussed.
D: seventeenth-century embankments appear in one phrase, not as the topic.

Cambridge tip: a three-part structure — VALUE → THREAT → RESPONSE — is extremely common in environmental passages; choose a title that captures all three stages.`,
  },
  {
    id: "sk-b2-306",
    type: "skimming",
    level: "B2",
    title: "The Rediscovery of Fermented Foods",
    topic: "Food science · Health",
    passage:
`Fermentation is among the oldest of human food technologies, predating recorded history in most regions of the world. For much of the twentieth century, however, traditional ferments such as sauerkraut, kefir, kimchi and miso were displaced in industrialised diets by foods that were pasteurised, preserved chemically or simply manufactured at scale. Recent advances in microbiology have prompted a partial reappraisal. Studies of the human gut microbiome have suggested that the bacterial communities living in the digestive tract influence not only digestion but also immune regulation and, plausibly, mood and behaviour. Although the clinical evidence for any specific fermented food remains uneven, regular consumption appears to increase microbial diversity in the gut, a marker that population studies have linked to lower rates of inflammatory disease. Food scientists caution that the heat-treated, mass-produced versions of these products often sold in supermarkets contain few live cultures and should not be confused with traditional unpasteurised preparations. Renewed interest has also revived household fermentation as a form of low-cost preservation, particularly in regions with unreliable refrigeration.`,
    instructions: "Skim the passage and choose the BEST answer.",
    options: [
      { label: "A", text: "How to brew sauerkraut and kimchi safely at home" },
      { label: "B", text: "The renewed scientific interest in traditional fermented foods" },
      { label: "C", text: "Why pasteurisation is dangerous to human health" },
      { label: "D", text: "A criticism of supermarket marketing techniques" },
    ],
    items: [{ prompt: "What is the writer's main purpose?", answer: "B" }],
    analysis:
`B is correct. The passage explains why fermentation has returned to scientific attention (gut microbiome research) and why traditional preparations differ from supermarket versions.

A: home recipes are not provided.
C: pasteurisation is criticised mildly in context, not condemned.
D: marketing is mentioned in passing, not as the focus.

Cambridge tip: when a passage frames a topic with words like "rediscovery" or "reappraisal", the main idea is usually about renewed attention rather than the topic itself.`,
  },
  {
    id: "sk-b2-307",
    type: "skimming",
    level: "B2",
    title: "Citizen Science and Bird Migration",
    topic: "Science · Nature",
    passage:
`The rapid expansion of citizen science platforms has transformed the study of bird migration. Until the late twentieth century, ornithologists relied on a relatively small network of professional observatories and on the labour-intensive ringing of individual birds to track seasonal movements. Smartphone applications such as eBird now allow tens of millions of amateur birdwatchers to log their sightings in standardised form, generating datasets vastly larger than any single research institution could assemble. Analyses of these records have already produced striking results: detailed maps of how the timing of spring arrivals has shifted earlier in response to warmer springs, the discovery of previously unrecognised migratory routes across the Caspian Sea, and the documentation of accelerating declines in once-common farmland species. Statisticians caution that the data are far from perfect — coverage is biased toward affluent regions with many participants, and rare species tend to be over-reported — but careful weighting of the records has produced reliable trends. Most professional researchers now treat this combined evidence as indispensable, particularly for monitoring change at continental scale.`,
    instructions: "Skim the passage and choose the BEST answer.",
    options: [
      { label: "A", text: "How citizen science platforms have reshaped the study of bird migration" },
      { label: "B", text: "A field guide to identifying common European birds" },
      { label: "C", text: "Why farmland birds are protected by international law" },
      { label: "D", text: "An advertisement for a new smartphone application" },
    ],
    items: [{ prompt: "Best summary of the passage:", answer: "A" }],
    analysis:
`A is correct. The text describes how amateur platforms generate enormous datasets that have changed migration research.

B: no identification information is given.
C: legal protection is not discussed.
D: eBird is named as one example, not promoted.

Cambridge tip: when a passage names a tool (eBird) and then traces its consequences for an entire field, the main idea is usually about the transformation, not the tool itself.`,
  },
  {
    id: "sk-b2-308",
    type: "skimming",
    level: "B2",
    title: "The Limits of Algorithmic Hiring",
    topic: "Technology · Society",
    passage:
`Over the past decade, large employers in many industries have begun to delegate the early stages of recruitment to automated screening systems. These tools typically rank applicants by parsing curricula vitae, scoring video interviews for tone and facial expression, or comparing candidate profiles against the historical patterns associated with successful employees. Their proponents argue that algorithmic screening reduces the time and cost of hiring while removing some of the unconscious bias that has long distorted human judgement. A growing body of evidence, however, suggests that the picture is considerably more complicated. When training data reflect the prejudices of past decisions, the resulting models tend to reproduce — and sometimes amplify — exactly those prejudices, while clothing the outcome in a misleading appearance of neutrality. Several European regulators have responded by drafting requirements for transparency and human oversight in any high-stakes automated decision. Most observers now agree that algorithmic tools can usefully support human recruiters, but that they should not replace them, particularly in decisions that materially affect a candidate's livelihood.`,
    instructions: "Skim the passage and choose the BEST answer.",
    options: [
      { label: "A", text: "Algorithms are always more objective than human recruiters" },
      { label: "B", text: "The promise and the limitations of automated hiring tools" },
      { label: "C", text: "How to write a strong curriculum vitae" },
      { label: "D", text: "Why European regulators ban automated decision-making outright" },
    ],
    items: [{ prompt: "Which option best reflects the writer's view?", answer: "B" }],
    analysis:
`B is correct. The passage acknowledges the appeal of automation (speed, reducing bias) AND its drawbacks (perpetuating training-data bias, false neutrality).

A directly contradicts the text.
C is unrelated.
D overstates: regulators are drafting transparency requirements, not outright bans.

Cambridge tip: when a passage offers BOTH a "proponents argue" sentence and an "evidence suggests" sentence, the main idea is the balance between them.`,
  },
  {
    id: "sk-b2-309",
    type: "skimming",
    level: "B2",
    title: "The Comeback of the Inland Waterway",
    topic: "Transport · Economics",
    passage:
`Although the great period of canal construction ended more than a century and a half ago, several European governments have begun to look again at their inland waterway networks as part of efforts to decarbonise freight transport. A modern barge can carry the equivalent payload of dozens of articulated lorries while consuming a fraction of the energy per tonne-kilometre, and waterways suffer none of the congestion that increasingly plagues motorway corridors near major cities. Realising this potential is far from straightforward. Many older canals are too shallow or narrow to accommodate the larger vessels now used elsewhere, locks are slow, and intermodal terminals where containers can be transferred between barge, rail and road are unevenly distributed. Recent investment in the Rhine and Danube basins, and in smaller schemes in Belgium and France, has nevertheless produced encouraging results: container volumes have grown steadily, and several urban distribution centres now receive goods directly from the water. Whether canals will ever return to the dominance they enjoyed in the early industrial age is doubtful, but their revival as a quiet, low-carbon supplement to road and rail looks increasingly plausible.`,
    instructions: "Skim the passage and choose the BEST answer.",
    options: [
      { label: "A", text: "A history of nineteenth-century canal construction" },
      { label: "B", text: "Why all freight should be moved off motorways onto canals" },
      { label: "C", text: "The case for, and the obstacles to, a modern revival of inland waterways" },
      { label: "D", text: "The engineering of locks on the river Rhine" },
    ],
    items: [{ prompt: "What is the writer's main purpose?", answer: "C" }],
    analysis:
`C is correct. The passage presents both the advantages of waterway freight (low energy use, no congestion) and the obstacles (shallow canals, scarce intermodal terminals).

A: history is touched on briefly, not the topic.
B: the writer never argues for total replacement; the closing sentence calls canals a "supplement" to road and rail.
D: lock engineering is not described.

Cambridge tip: words such as "case for, and obstacles to" or "advantages and challenges" almost always signal a balanced informational purpose.`,
  },

  // ───────────────────── 2. Scanning (need +15) ─────────────────────
  {
    id: "scn-b2-301",
    type: "scanning",
    level: "B2",
    title: "The Hubble Space Telescope",
    topic: "Astronomy · History",
    passage:
`The Hubble Space Telescope was launched aboard the Space Shuttle Discovery on 24 April 1990, becoming the first major optical telescope to be placed in orbit above the distorting effects of Earth's atmosphere. Its primary mirror, 2.4 metres in diameter, was found shortly after deployment to suffer from a small but consequential aberration that blurred its images. A repair mission in December 1993, conducted by astronauts aboard the Shuttle Endeavour, installed corrective optics and restored the telescope's intended performance. Over the subsequent three decades, Hubble has produced more than 1.5 million observations and has been cited in more than 19,000 peer-reviewed scientific papers, making it among the most productive scientific instruments ever built. The observatory has measured the expansion rate of the universe, identified candidate atmospheres around exoplanets and resolved the structure of distant galaxy clusters. NASA expects the telescope to remain operational into the late 2020s, after which a controlled re-entry over an unpopulated stretch of the Pacific Ocean is planned.`,
    instructions: "Scan the passage and answer with NO MORE THAN THREE WORDS or a number.",
    items: [
      { prompt: "1. On what exact date was Hubble launched?", answer: "24 April 1990", acceptable: ["April 24 1990", "24 April, 1990"] },
      { prompt: "2. What is the diameter of Hubble's primary mirror, in metres?", answer: "2.4", acceptable: ["2.4 metres", "2.4 m"] },
      { prompt: "3. In which month and year did the first repair mission take place?", answer: "December 1993" },
      { prompt: "4. How many peer-reviewed papers have cited Hubble observations?", answer: "19,000", acceptable: ["19000", "more than 19,000", "over 19,000"] },
      { prompt: "5. Where is the planned controlled re-entry to take place?", answer: "Pacific Ocean", acceptable: ["the Pacific Ocean", "Pacific"] },
    ],
    analysis:
`Each answer can be located by scanning for a distinctive feature: a date (1, 3), a numerical figure (2, 4) or a proper noun (5). Numerals and capitalised words leap off the page even before the surrounding sentence is read in detail.`,
  },
  {
    id: "scn-b2-302",
    type: "scanning",
    level: "B2",
    title: "The Building of the Channel Tunnel",
    topic: "Engineering · History",
    passage:
`The Channel Tunnel, which links Folkestone in southern England with Coquelles near Calais in northern France, was officially opened by Queen Elizabeth II and President François Mitterrand on 6 May 1994. Construction had begun in December 1987 and required the simultaneous operation of eleven tunnel-boring machines digging from both coasts. The completed system consists of three parallel tubes — two single-track rail tunnels and a smaller central service tunnel — running for 50.5 kilometres, of which approximately 38 kilometres lie beneath the seabed of the English Channel. The project ultimately cost around £4.65 billion, roughly 80 per cent more than its original estimate. In commercial service, the high-speed Eurostar passenger trains complete the journey from London to Paris in just over two hours, while heavy-goods vehicles are carried on dedicated shuttle trains operated by Eurotunnel. More than 500 million passengers had travelled through the tunnel by the time of its thirtieth anniversary.`,
    instructions: "Scan the passage and answer with NO MORE THAN THREE WORDS or a number.",
    items: [
      { prompt: "1. On what exact date was the Channel Tunnel officially opened?", answer: "6 May 1994", acceptable: ["May 6 1994", "6 May, 1994"] },
      { prompt: "2. How many tunnel-boring machines were used during construction?", answer: "11", acceptable: ["eleven"] },
      { prompt: "3. What is the total length of the tunnel, in kilometres?", answer: "50.5", acceptable: ["50.5 kilometres", "50.5 km"] },
      { prompt: "4. Approximately how much did the project cost (in pounds)?", answer: "£4.65 billion", acceptable: ["4.65 billion", "£4.65bn"] },
      { prompt: "5. How long does the Eurostar journey from London to Paris take?", answer: "two hours", acceptable: ["just over two hours", "2 hours"] },
    ],
    analysis:
`The questions ask for dates, quantities and a duration — each easily located by scanning for a distinctive numeral or proper noun rather than by reading the entire passage.`,
  },
  {
    id: "scn-b2-303",
    type: "scanning",
    level: "B2",
    title: "The Discovery of DNA's Structure",
    topic: "Science · History",
    passage:
`The double-helix model of deoxyribonucleic acid was published by James Watson and Francis Crick in the journal Nature on 25 April 1953, in a paper just over nine hundred words in length. The two researchers, both based at the Cavendish Laboratory in Cambridge, drew heavily on X-ray diffraction images produced by Rosalind Franklin and Maurice Wilkins at King's College London. Of particular importance was Franklin's image, known as Photograph 51, which provided unmistakable evidence of a helical structure. Watson, Crick and Wilkins were jointly awarded the Nobel Prize in Physiology or Medicine in 1962, four years after Franklin's death from cancer at the age of 37. The model proposed two intertwined sugar-phosphate strands held together by complementary base pairs — adenine with thymine, and cytosine with guanine — an arrangement that elegantly explained how genetic information could be both faithfully copied and occasionally mutated, providing the molecular foundation of modern biology.`,
    instructions: "Scan the passage and answer with NO MORE THAN THREE WORDS or a number.",
    items: [
      { prompt: "1. On what exact date was the double-helix paper published?", answer: "25 April 1953", acceptable: ["April 25 1953", "25 April, 1953"] },
      { prompt: "2. In which laboratory were Watson and Crick based?", answer: "Cavendish Laboratory", acceptable: ["the Cavendish Laboratory", "Cavendish"] },
      { prompt: "3. What is the popular name of Franklin's key X-ray image?", answer: "Photograph 51", acceptable: ["photograph 51"] },
      { prompt: "4. In which year was the Nobel Prize awarded?", answer: "1962" },
      { prompt: "5. With which base does adenine pair?", answer: "thymine" },
    ],
    analysis:
`Each answer is a discrete fact — a date, a place, a name, a year and a base pairing — that can be picked out at a glance by scanning for keywords (Nobel, photograph, adenine).`,
  },

  // ───────────────────── 3. Matching Headings (need +11) ─────────────────────
  {
    id: "mh-b2-301",
    type: "matching_headings",
    level: "B2",
    title: "The Rise of Microfinance",
    topic: "Economics · Development",
    passage:
`[A] In its earliest form, microfinance grew out of small experimental loans made to landless villagers in Bangladesh in the 1970s. Founders such as Muhammad Yunus argued that even very poor borrowers, lacking collateral and excluded from the formal banking system, could be reliably lent to in tiny amounts when group structures encouraged repayment.

[B] During the 1990s, the model spread rapidly across Asia, Africa and Latin America, often supported by donor agencies that saw it as a market-friendly route out of poverty. By the early 2000s, dozens of independent institutions had been founded, several of which evolved into licensed banks serving millions of customers.

[C] The expansion was not without difficulty. Investigations in some markets revealed extremely high effective interest rates, aggressive collection practices and waves of indebtedness affecting households that had borrowed from several lenders simultaneously. Regulators in India and elsewhere were forced to intervene, capping interest rates and tightening client-protection rules.

[D] More recent assessments suggest that microfinance is best understood as a useful financial tool rather than as a stand-alone cure for poverty. Where it has been combined with savings products, simple insurance and digital payments, it has improved household resilience; where it has been deployed as an isolated programme, results have been modest.`,
    instructions: "Match each paragraph (A–D) with the correct heading from the list.",
    options: [
      { label: "i",   text: "Origins among landless villagers in Bangladesh" },
      { label: "ii",  text: "How microfinance is calculated mathematically" },
      { label: "iii", text: "Rapid international expansion through donor support" },
      { label: "iv",  text: "Problems of over-indebtedness and regulatory response" },
      { label: "v",   text: "Why microfinance has been completely abandoned" },
      { label: "vi",  text: "A more measured view of its place in development policy" },
      { label: "vii", text: "The history of formal commercial banking in Asia" },
    ],
    items: [
      { prompt: "Paragraph A", answer: "i" },
      { prompt: "Paragraph B", answer: "iii" },
      { prompt: "Paragraph C", answer: "iv" },
      { prompt: "Paragraph D", answer: "vi" },
    ],
    analysis:
`A → i: Bangladesh origins, Yunus, group lending.
B → iii: spread across Asia, Africa, Latin America with donor support.
C → iv: high rates, over-indebtedness, regulators intervene.
D → vi: best understood as a useful tool, not a cure.

ii (mathematics), v (abandoned) and vii (commercial banking history) are distractors not supported by the text.`,
  },
  {
    id: "mh-b2-302",
    type: "matching_headings",
    level: "B2",
    title: "The Story of Antibiotics",
    topic: "Medicine · History",
    passage:
`[A] Although certain folk remedies based on mouldy bread had been used for centuries, the modern era of antibiotic medicine is conventionally dated to Alexander Fleming's chance observation in 1928 that a Penicillium mould inhibited bacterial growth on a contaminated culture plate.

[B] The clinical potential of penicillin was realised only a decade later, when Howard Florey, Ernst Chain and a small Oxford team developed reliable techniques to purify the substance in usable quantities. Wartime collaboration with American manufacturers then permitted mass production from 1944 onwards.

[C] In the decades that followed, dozens of further classes of antibiotics were isolated from soil bacteria, transforming the prognosis of infectious diseases that had previously killed millions. Operations and treatments that depend on a low risk of post-procedure infection — from open-heart surgery to organ transplantation — became routinely possible.

[D] The widespread, often indiscriminate use of these drugs in human medicine and animal agriculture has, however, accelerated the evolution of resistant bacterial strains. Public-health agencies now warn that without sustained investment in new antibiotic discovery and the careful stewardship of existing drugs, parts of modern medicine could once again become hazardous.`,
    instructions: "Match each paragraph (A–D) with the correct heading from the list.",
    options: [
      { label: "i",   text: "From a chance observation to a recognised discovery" },
      { label: "ii",  text: "Why traditional folk remedies are dangerous" },
      { label: "iii", text: "Industrial production becomes possible" },
      { label: "iv",  text: "A century of major medical advances" },
      { label: "v",   text: "Resistance and the threat of returning vulnerability" },
      { label: "vi",  text: "How antibiotics are administered intravenously" },
      { label: "vii", text: "The role of antibiotics in pet care" },
    ],
    items: [
      { prompt: "Paragraph A", answer: "i" },
      { prompt: "Paragraph B", answer: "iii" },
      { prompt: "Paragraph C", answer: "iv" },
      { prompt: "Paragraph D", answer: "v" },
    ],
    analysis:
`A → i: Fleming's chance observation in 1928.
B → iii: Florey/Chain purification → mass production by 1944.
C → iv: dozens of further classes; surgery and transplants made possible.
D → v: resistance threatens to undo the gains.

ii, vi and vii are distractors not supported by the text.`,
  },
  {
    id: "mh-b2-303",
    type: "matching_headings",
    level: "B2",
    title: "Tea: A Global Commodity",
    topic: "History · Trade",
    passage:
`[A] Although tea bushes are native to a region overlapping south-west China, north-east India and the upper reaches of Burma, the systematic cultivation of Camellia sinensis for drinking is generally traced to imperial China, where written records describe its use both as a beverage and as a herbal medicine more than two thousand years ago.

[B] From the seventeenth century onwards, European trading companies — Dutch, Portuguese and especially British — began to import dried leaves on a commercial scale, initially as a luxury reserved for the wealthiest households but, within a generation, as an everyday drink consumed across most social classes.

[C] The growing dependence on Chinese supplies eventually prompted Britain to establish vast plantations in colonised parts of India and Ceylon during the nineteenth century. The labour conditions on these estates, and the displacement of pre-existing landholders, left a complex social legacy that continues to shape rural communities in the region.

[D] In the twenty-first century, tea remains the second most consumed beverage in the world after water. Producer countries are increasingly experimenting with single-origin and speciality teas in an effort to capture more of the value of the supply chain, much of which has historically been retained by blenders and brand owners in importing countries.`,
    instructions: "Match each paragraph (A–D) with the correct heading from the list.",
    options: [
      { label: "i",   text: "Ancient origins in imperial China" },
      { label: "ii",  text: "Modern attempts to capture more value at source" },
      { label: "iii", text: "Entry into European trade and daily life" },
      { label: "iv",  text: "How tea is processed in modern factories" },
      { label: "v",   text: "Colonial plantations and their lasting legacy" },
      { label: "vi",  text: "The biology of the Camellia sinensis flower" },
      { label: "vii", text: "Why coffee has overtaken tea worldwide" },
    ],
    items: [
      { prompt: "Paragraph A", answer: "i" },
      { prompt: "Paragraph B", answer: "iii" },
      { prompt: "Paragraph C", answer: "v" },
      { prompt: "Paragraph D", answer: "ii" },
    ],
    analysis:
`A → i: ancient China, more than 2,000 years.
B → iii: 17th-century European trade, becomes daily.
C → v: colonial plantations in India and Ceylon, social legacy.
D → ii: single-origin/speciality teas attempt to capture more value.

iv, vi and vii are distractors with no textual support (note that the passage in fact says tea is SECOND only to water, not overtaken by coffee).`,
  },

  // ───────────────────── 4. Matching Information (need +10) ─────────────────────
  {
    id: "mi-b2-301",
    type: "matching_information",
    level: "B2",
    title: "Glaciers in a Warming Climate",
    topic: "Earth science · Climate",
    passage:
`[A] Mountain glaciers form wherever annual snowfall exceeds annual melt for long enough that compacted snow recrystallises into dense glacial ice. Once a glacier reaches sufficient thickness, gravity causes it to flow slowly downhill, sculpting the U-shaped valleys that characterise heavily glaciated landscapes.

[B] Detailed measurements over the past century show that the great majority of monitored glaciers in temperate latitudes have lost mass, often substantial mass, since the early twentieth century. The pace of retreat has accelerated noticeably since the 1980s, in step with the steady rise in summer temperatures.

[C] Glaciers function as natural reservoirs that release stored water gradually through the dry season. Their continuing shrinkage therefore poses serious challenges for downstream communities in regions such as the central Andes and the Hindu Kush–Himalaya, where summer river flows already depend heavily on glacier melt.

[D] Beyond water supply, retreating glaciers also expose unstable slopes that can fail catastrophically as glacial lakes form behind moraine dams. Several recent flood events in the Himalayas have been linked to such glacial-lake outburst floods, prompting investment in early-warning systems and dam-strengthening works.`,
    instructions: "Which paragraph (A–D) contains the following information?",
    options: [
      { label: "A", text: "Paragraph A" },
      { label: "B", text: "Paragraph B" },
      { label: "C", text: "Paragraph C" },
      { label: "D", text: "Paragraph D" },
    ],
    items: [
      { prompt: "1. A reference to investment in early-warning systems.", answer: "D" },
      { prompt: "2. The role of glaciers in maintaining river flow during the dry season.", answer: "C" },
      { prompt: "3. Evidence of accelerated glacier retreat since the 1980s.", answer: "B" },
      { prompt: "4. An explanation of how glacial ice is initially formed.", answer: "A" },
      { prompt: "5. A geographical region especially dependent on summer melt.", answer: "C" },
    ],
    analysis:
`1 → D: "investment in early-warning systems and dam-strengthening works".
2 → C: "release stored water gradually through the dry season".
3 → B: "the pace of retreat has accelerated noticeably since the 1980s".
4 → A: "compacted snow recrystallises into dense glacial ice".
5 → C: "central Andes and the Hindu Kush–Himalaya".`,
  },
  {
    id: "mi-b2-302",
    type: "matching_information",
    level: "B2",
    title: "The Story of Coffee",
    topic: "History · Trade",
    passage:
`[A] Coffee is generally believed to have been first cultivated as a beverage crop in the highlands of southern Ethiopia, with the most familiar legend attributing its discovery to a goatherd named Kaldi who noticed his animals grew unusually energetic after eating the red berries of a particular shrub.

[B] By the fifteenth century, coffee was being grown commercially across the Yemeni highlands and exported through the port of Mocha. Sufi communities valued the drink for the alertness it induced during long evening prayers, and its consumption spread through coffee houses across the Ottoman empire over the following century.

[C] European traders encountered coffee in the eastern Mediterranean and progressively transplanted seedlings to colonial possessions in the Americas and South-East Asia, where the climate was suitable for large-scale cultivation. Brazil, where coffee was introduced in the early eighteenth century, became — and remains — the world's largest producer.

[D] Today, coffee is among the most heavily traded agricultural commodities in the world. Demand for higher-quality, traceable beans has driven the rise of specialty coffee in importing countries, while producer cooperatives have begun to capture a larger share of value through direct trade and certification schemes.`,
    instructions: "Which paragraph (A–D) contains the following information?",
    options: [
      { label: "A", text: "Paragraph A" },
      { label: "B", text: "Paragraph B" },
      { label: "C", text: "Paragraph C" },
      { label: "D", text: "Paragraph D" },
    ],
    items: [
      { prompt: "1. The traditional story of how coffee's effects were first noticed.", answer: "A" },
      { prompt: "2. A reference to direct-trade and certification schemes.", answer: "D" },
      { prompt: "3. The reason Sufi communities valued coffee.", answer: "B" },
      { prompt: "4. The country that became the world's largest producer.", answer: "C" },
      { prompt: "5. The role of a particular Yemeni port in the early coffee trade.", answer: "B" },
    ],
    analysis:
`1 → A: the goatherd Kaldi.
2 → D: producer cooperatives, direct trade and certification.
3 → B: Sufi communities, alertness during long evening prayers.
4 → C: Brazil, eighteenth century, "world's largest producer".
5 → B: "exported through the port of Mocha".`,
  },

  // ───────────────────── 5. Matching Features (need +10) ─────────────────────
  {
    id: "mf-b2-301",
    type: "matching_features",
    level: "B2",
    title: "Three Modernist Architects",
    topic: "Architecture · History",
    passage:
`Le Corbusier, the Swiss-French architect born Charles-Édouard Jeanneret, is widely regarded as a defining figure of European modernism. His "Five Points" of architecture, set out in the 1920s, championed pilotis, free façades and roof gardens. He designed the Villa Savoye outside Paris and, much later, the master plan for the Indian city of Chandigarh.

Frank Lloyd Wright spent most of his long career in the United States, developing what he called "organic architecture" — buildings shaped by their landscape and constructed largely from local materials. Among his best-known works is Fallingwater, a house cantilevered over a Pennsylvania waterfall, and the Solomon R. Guggenheim Museum in New York.

Zaha Hadid, born in Baghdad and based for most of her career in London, became known in the early twenty-first century for fluid, parametric forms generated with the aid of digital modelling tools. In 2004 she became the first woman to receive the Pritzker Prize, the highest international award in architecture.`,
    instructions: "Match each statement with the correct architect (A, B or C).",
    options: [
      { label: "A", text: "Le Corbusier" },
      { label: "B", text: "Frank Lloyd Wright" },
      { label: "C", text: "Zaha Hadid" },
    ],
    items: [
      { prompt: "1. Designed a house built over a waterfall.", answer: "B" },
      { prompt: "2. Used digital modelling to generate fluid forms.", answer: "C" },
      { prompt: "3. Set out the famous \"Five Points\" of modern architecture.", answer: "A" },
      { prompt: "4. Was the first woman to win the Pritzker Prize.", answer: "C" },
      { prompt: "5. Drew up the master plan for an Indian city.", answer: "A" },
    ],
    analysis:
`Each statement maps to one architect via a unique signature: Fallingwater → B, parametric/digital forms → C, Five Points → A, first woman Pritzker → C, Chandigarh master plan → A. Cambridge tip: read all three biographies once, then return to each statement and look for the most distinctive keyword.`,
  },
  {
    id: "mf-b2-302",
    type: "matching_features",
    level: "B2",
    title: "Three Pioneers of Vaccination",
    topic: "Medicine · History",
    passage:
`Edward Jenner, an English country doctor, observed in the 1790s that milkmaids who had contracted cowpox seemed to be protected against the deadly smallpox virus. He demonstrated experimentally that deliberate inoculation with cowpox material could confer the same protection, an achievement now regarded as the foundation of vaccinology.

Louis Pasteur, working in late nineteenth-century France, extended the principle to a range of other diseases. Among his most celebrated successes was a vaccine against rabies, first administered in 1885 to a young boy bitten by a rabid dog. Pasteur also developed the technique of "pasteurisation" used to make milk and other liquids safe for consumption.

In the mid-twentieth century, the American virologist Jonas Salk led the development of the first effective vaccine against poliomyelitis, an inactivated-virus injection that was approved for general use in 1955. Salk famously declined to patent the vaccine, arguing that public-health benefits should not be limited by commercial considerations.`,
    instructions: "Match each statement with the correct scientist (A, B or C).",
    options: [
      { label: "A", text: "Edward Jenner" },
      { label: "B", text: "Louis Pasteur" },
      { label: "C", text: "Jonas Salk" },
    ],
    items: [
      { prompt: "1. Refused to patent the vaccine they developed.", answer: "C" },
      { prompt: "2. Used cowpox material to protect against smallpox.", answer: "A" },
      { prompt: "3. Treated a young boy bitten by a rabid dog in 1885.", answer: "B" },
      { prompt: "4. Developed a process for making milk safer to drink.", answer: "B" },
      { prompt: "5. Was active in late eighteenth-century rural England.", answer: "A" },
    ],
    analysis:
`1 → C: Salk, declined to patent.
2 → A: Jenner, cowpox → smallpox protection.
3 → B: Pasteur, rabies vaccine, 1885.
4 → B: Pasteur, pasteurisation of milk.
5 → A: Jenner, English country doctor in the 1790s. Cambridge tip: features can recur for the same person; check each statement on its own merits.`,
  },

  // ───────────────────── 6. Matching Sentence Endings (need +11) ─────────────────────
  {
    id: "mse-b2-301",
    type: "matching_sentence_endings",
    level: "B2",
    title: "How Ocean Currents Shape Climate",
    topic: "Earth science · Climate",
    passage:
`Major surface currents in the world's oceans transport vast quantities of heat from the equator towards the poles. The Gulf Stream, for example, carries warm water across the North Atlantic and is widely credited with keeping the climates of north-western Europe several degrees milder than would otherwise be expected at their latitude. Beneath the surface, deep-water currents driven by differences in salinity and temperature link the major ocean basins in a slow circulation that takes roughly a thousand years to complete one full loop. Together these surface and deep flows form what oceanographers call the global thermohaline circulation. Climate scientists are concerned that the addition of large quantities of fresh meltwater from the Greenland ice sheet may slow the North Atlantic component of this circulation, with consequences that are still incompletely understood but which could include sharper winters in parts of Europe and disruption to marine ecosystems that depend on regular nutrient upwelling.`,
    instructions: "Complete each sentence with the best ending (A–F).",
    options: [
      { label: "A", text: "carries warm water across the North Atlantic." },
      { label: "B", text: "are driven by differences in salinity and temperature." },
      { label: "C", text: "completes one full loop in roughly a thousand years." },
      { label: "D", text: "is reached only by submarines and deep-sea drones." },
      { label: "E", text: "may slow because of fresh meltwater from Greenland." },
      { label: "F", text: "are entirely unaffected by climate change." },
    ],
    items: [
      { prompt: "1. The Gulf Stream…", answer: "A" },
      { prompt: "2. Deep-water currents…", answer: "B" },
      { prompt: "3. The global thermohaline circulation…", answer: "C" },
      { prompt: "4. The North Atlantic component of the circulation…", answer: "E" },
    ],
    analysis:
`1 → A: Gulf Stream "carries warm water across the North Atlantic".
2 → B: deep-water currents "driven by differences in salinity and temperature".
3 → C: the full circulation "takes roughly a thousand years".
4 → E: the North Atlantic component "may slow" because of Greenland meltwater.

D and F are distractors: depth access is not discussed, and F directly contradicts the text.`,
  },
  {
    id: "mse-b2-302",
    type: "matching_sentence_endings",
    level: "B2",
    title: "The Spread of the Industrial Revolution",
    topic: "History · Economics",
    passage:
`The first sustained industrial transformation took place in late eighteenth-century Britain, where a fortunate combination of accessible coal, navigable waterways, an established overseas trade network and a relatively flexible system of property rights enabled the rapid mechanisation of textile production. Within decades, the steam engine had been adapted from its initial role in pumping water out of mines to drive looms, factories and, later, locomotives. The model spread unevenly across the rest of Europe and to North America during the nineteenth century, requiring everywhere significant social adjustments — the migration of millions from countryside to town, the rise of a wage-earning urban working class, and bitter debates over working hours, child labour and trade unions. By the late nineteenth century, Germany and the United States had overtaken Britain in several key industries, particularly steel and chemicals, partly because they invested more heavily in technical education and in close links between universities and industry.`,
    instructions: "Complete each sentence with the best ending (A–F).",
    options: [
      { label: "A", text: "began in late eighteenth-century Britain." },
      { label: "B", text: "was first used to pump water out of mines." },
      { label: "C", text: "required massive migration from countryside to town." },
      { label: "D", text: "had been completely abandoned by 1900." },
      { label: "E", text: "invested heavily in technical education and university–industry links." },
      { label: "F", text: "produced no social conflict whatever." },
    ],
    items: [
      { prompt: "1. The first sustained industrial transformation…", answer: "A" },
      { prompt: "2. The steam engine, before it was adapted to factories,…", answer: "B" },
      { prompt: "3. The spread of industry across Europe and North America…", answer: "C" },
      { prompt: "4. Germany and the United States, by the late nineteenth century,…", answer: "E" },
    ],
    analysis:
`1 → A: "first sustained industrial transformation took place in late eighteenth-century Britain".
2 → B: steam engine "initially…in pumping water out of mines".
3 → C: spread "required everywhere significant social adjustments — the migration of millions".
4 → E: Germany and the US "invested more heavily in technical education".

D and F are distractors; both directly contradict the text.`,
  },
  {
    id: "mse-b2-303",
    type: "matching_sentence_endings",
    level: "B2",
    title: "Sleep and the Modern Workplace",
    topic: "Health · Work",
    passage:
`Surveys conducted across industrialised economies suggest that average sleep duration has fallen by close to an hour per night since the mid-twentieth century, with the most pronounced declines among people in their twenties and thirties. The causes are widely debated but commonly cited factors include longer commutes, the colonisation of evening hours by personal screens and the cultural prestige still attached, in many professions, to demonstrating long working days. Occupational health researchers have documented clear consequences for performance: chronically sleep-deprived employees show measurable declines in concentration, decision-making and emotional regulation, and they are involved in workplace accidents at substantially higher rates than rested colleagues. A small number of employers have responded by introducing nap-friendly quiet rooms or by formally discouraging late-night email; results, while preliminary, have generally been positive. Most occupational physicians, however, argue that meaningful improvement requires a wider cultural shift away from the assumption that voluntarily reduced sleep is a marker of professional commitment.`,
    instructions: "Complete each sentence with the best ending (A–F).",
    options: [
      { label: "A", text: "have fallen by close to an hour per night since the mid-twentieth century." },
      { label: "B", text: "include long commutes, screen use and workplace culture." },
      { label: "C", text: "show declines in concentration and emotional regulation." },
      { label: "D", text: "have refused to consider any changes whatever." },
      { label: "E", text: "argue that a wider cultural shift is also required." },
      { label: "F", text: "have eliminated all workplace accidents." },
    ],
    items: [
      { prompt: "1. Average sleep durations…", answer: "A" },
      { prompt: "2. Commonly cited causes…", answer: "B" },
      { prompt: "3. Chronically sleep-deprived employees…", answer: "C" },
      { prompt: "4. Most occupational physicians…", answer: "E" },
    ],
    analysis:
`1 → A: "average sleep duration has fallen by close to an hour per night since the mid-twentieth century".
2 → B: long commutes, screens, prestige of long days.
3 → C: declines in "concentration, decision-making and emotional regulation".
4 → E: physicians "argue that meaningful improvement requires a wider cultural shift".

D and F are distractors that contradict the text.`,
  },

  // ───────────────────── 7. True / False / Not Given (need +10) ─────────────────────
  {
    id: "tfng-b2-301",
    type: "true_false_not_given",
    level: "B2",
    title: "The Fall of Constantinople",
    topic: "History",
    passage:
`Constantinople, the capital of the Eastern Roman — or Byzantine — Empire, fell to Ottoman forces under Sultan Mehmed II on 29 May 1453 after a siege of fifty-three days. The defenders, vastly outnumbered, made effective use of a heavy chain stretched across the entrance to the Golden Horn to deny the Ottoman fleet immediate access to the inner harbour. Mehmed responded by ordering teams of oxen and labourers to drag a smaller flotilla overland on greased logs, bypassing the chain entirely. The walls of Theodosius, which had protected the city for almost a thousand years, were eventually breached by sustained bombardment from massive cannon cast specifically for the campaign by a Hungarian engineer named Orban. Contemporary accounts disagree sharply on the conduct of the Ottoman troops in the days immediately following the city's surrender, and historians continue to debate the proportion of the population that was killed, enslaved or permitted to remain. Mehmed himself, however, formally protected the city's surviving Greek Orthodox patriarchate and encouraged repopulation from across his empire.`,
    instructions: "Decide if each statement is TRUE, FALSE, or NOT GIVEN according to the passage.",
    items: [
      { prompt: "1. The siege of Constantinople lasted less than two months.", answer: "TRUE" },
      { prompt: "2. The Ottoman fleet broke through the chain across the Golden Horn by ramming it.", answer: "FALSE" },
      { prompt: "3. The walls of Theodosius had previously withstood attacks for almost a thousand years.", answer: "TRUE" },
      { prompt: "4. The Hungarian engineer Orban had earlier worked for the Byzantines.", answer: "NOT GIVEN" },
      { prompt: "5. Mehmed II protected the Greek Orthodox patriarchate after the conquest.", answer: "TRUE" },
    ],
    analysis:
`1 TRUE: 53 days < two months.
2 FALSE: the chain was bypassed by dragging ships overland, not rammed.
3 TRUE: "had protected the city for almost a thousand years".
4 NOT GIVEN: the passage tells us only that Orban cast cannon for Mehmed; his earlier employers are not mentioned.
5 TRUE: "Mehmed himself…formally protected the city's surviving Greek Orthodox patriarchate".`,
  },
  {
    id: "tfng-b2-302",
    type: "true_false_not_given",
    level: "B2",
    title: "The Domestication of the Horse",
    topic: "Archaeology · History",
    passage:
`Recent archaeological and genetic studies suggest that the modern domestic horse, Equus caballus, descends from animals first tamed on the western Eurasian steppe around 4,200 years ago. From there, domestic horses spread rapidly across Eurasia, largely replacing the locally tamed but genetically distinct populations that earlier human groups had been keeping. Within a few centuries the horse had been incorporated into chariot warfare in the Near East, and by the first millennium BCE mounted nomadic societies were exerting decisive military and cultural pressure on settled neighbours from China to the Roman frontier. Horses transformed long-distance communication, allowing messages and small parties of travellers to cover distances in hours rather than days, and they reshaped agriculture once heavier breeds suited to pulling ploughs were developed in early medieval Europe. The arrival of horses in the Americas after 1492 likewise reshaped the cultures of the Great Plains within a generation, although the species had in fact roamed the continent in prehistoric times before becoming extinct there at the end of the last Ice Age.`,
    instructions: "Decide if each statement is TRUE, FALSE, or NOT GIVEN according to the passage.",
    items: [
      { prompt: "1. Modern domestic horses are descended from a single ancestral population first tamed on the western Eurasian steppe.", answer: "TRUE" },
      { prompt: "2. Earlier locally tamed horse populations elsewhere in Eurasia survived alongside the new domestic horse.", answer: "FALSE" },
      { prompt: "3. Horses had been used in chariot warfare for centuries before the steppe domestication began.", answer: "FALSE" },
      { prompt: "4. The fastest mounted couriers could cover several hundred kilometres in a single day.", answer: "NOT GIVEN" },
      { prompt: "5. Horses had lived in the Americas long before Europeans reintroduced them in the late fifteenth century.", answer: "TRUE" },
    ],
    analysis:
`1 TRUE: the passage states that the modern domestic horse descends from animals tamed there around 4,200 years ago.
2 FALSE: the new domestic population "largely replac[ed] the locally tamed but genetically distinct populations".
3 FALSE: the order in the text is the opposite — domestication first, then chariot warfare a few centuries later.
4 NOT GIVEN: specific daily distances are not provided.
5 TRUE: horses "had in fact roamed the continent in prehistoric times".`,
  },

  // ───────────────────── 8. Multiple Choice (need +8) ─────────────────────
  {
    id: "mc-b2-301",
    type: "multiple_choice",
    level: "B2",
    title: "The Limits of Carbon Offsetting",
    topic: "Environment · Policy",
    passage:
`Carbon-offset programmes invite individuals and companies to compensate for their greenhouse-gas emissions by paying for projects — typically forest protection, tree planting or renewable-energy installations — that are claimed to remove or avoid an equivalent quantity of carbon dioxide elsewhere. In principle, the arrangement allows hard-to-decarbonise activities, such as long-haul aviation, to continue while genuine reductions are achieved at lower cost in another sector. In practice, audits of the largest forest-based programmes have repeatedly suggested that a substantial proportion of the offsets sold do not represent additional carbon savings, either because the protected forest was not in fact under serious threat or because emissions are merely displaced to nearby unprotected areas. Recent reforms — including stricter baselines, satellite monitoring and the introduction of independent verification — have begun to address the most egregious failures. Most analysts now argue, however, that high-quality offsets can play only a supporting role in climate strategy and cannot substitute for direct reductions at source.`,
    instructions: "Choose the BEST answer.",
    options: [
      { label: "A", text: "All carbon-offset programmes are fraudulent and should be banned." },
      { label: "B", text: "Carbon offsets can usefully complement, but not replace, direct emission reductions." },
      { label: "C", text: "Forest-based offsets are technically perfect and require no further oversight." },
      { label: "D", text: "Offsets are most valuable when emissions are very easy to reduce at source." },
    ],
    items: [{ prompt: "Which statement best reflects the writer's view?", answer: "B" }],
    analysis:
`B is correct: the closing sentence says high-quality offsets "can play only a supporting role…cannot substitute for direct reductions at source".

A overstates the writer's case; the text describes reforms and high-quality offsets, not a blanket ban.
C contradicts the audit findings.
D inverts the logic — offsets are most attractive precisely where direct reductions are HARD, e.g. long-haul aviation.`,
  },
  {
    id: "mc-b2-302",
    type: "multiple_choice",
    level: "B2",
    title: "The Future of City Logistics",
    topic: "Transport · Cities",
    passage:
`The rapid growth of online retail has placed unprecedented pressure on urban delivery networks. Vans criss-cross dense neighbourhoods, often making only one or two stops before returning to a distribution centre on the outskirts. Researchers have begun to model alternative arrangements in which suppliers consolidate parcels at small in-city micro-hubs, from which final delivery is completed on foot, by cargo bicycle or by light electric vehicle. Pilot projects in cities including Paris, London and Seattle suggest that such schemes can substantially reduce van traffic and curb-side congestion in the busiest streets, while making little difference to overall delivery times. Critics caution that economic viability depends heavily on the price of suitable in-city real estate and on the willingness of competing carriers to share infrastructure they would normally regard as a competitive asset. Nevertheless, several municipal governments are now exploring zoning rules and procurement requirements designed to encourage micro-hub development.`,
    instructions: "Choose the BEST answer.",
    options: [
      { label: "A", text: "Online retail growth will inevitably make urban congestion worse." },
      { label: "B", text: "Micro-hub delivery schemes appear promising but face real-estate and competitive challenges." },
      { label: "C", text: "Cargo bicycles are the only future of urban delivery." },
      { label: "D", text: "Pilot projects have shown that delivery times always become much longer." },
    ],
    items: [{ prompt: "Which statement best reflects the writer's view?", answer: "B" }],
    analysis:
`B is correct: pilots have shown promise (less van traffic, similar delivery times) but viability is constrained by real-estate prices and competitive willingness.

A is too pessimistic — the passage describes credible alternatives.
C overstates the role of cargo bikes, which are one mode among several.
D inverts the finding — pilots show "little difference to overall delivery times".`,
  },
  {
    id: "mc-b2-303",
    type: "multiple_choice",
    level: "B2",
    title: "Bilingualism and the Brain",
    topic: "Linguistics · Neuroscience",
    passage:
`For much of the twentieth century, raising children in two languages from infancy was widely discouraged on the grounds that it would slow linguistic development and create lasting confusion. Subsequent research has thoroughly overturned this view. Bilingual children typically reach the major linguistic milestones — first words, two-word combinations, complete simple sentences — within the same broad windows as monolingual peers, although their vocabulary in each individual language may at any given moment be slightly smaller. More striking are the apparent cognitive consequences of routinely managing two languages. Bilingual speakers, particularly those who use both languages frequently throughout life, perform better on average on tasks requiring the inhibition of irrelevant information and rapid switching between mental sets. Imaging studies suggest that the brain regions responsible for executive control are recruited differently in habitual bilinguals. Some research has even tentatively associated lifelong bilingualism with a delayed onset of dementia symptoms, although these findings remain disputed.`,
    instructions: "Choose the BEST answer.",
    options: [
      { label: "A", text: "Bilingualism in children causes long-term linguistic confusion." },
      { label: "B", text: "Bilingualism appears to bring measurable cognitive advantages, especially in attention control." },
      { label: "C", text: "Bilingual children always have a larger combined vocabulary than monolingual peers." },
      { label: "D", text: "Imaging studies have proved beyond doubt that bilingualism prevents dementia." },
    ],
    items: [{ prompt: "Which statement best reflects the writer's view?", answer: "B" }],
    analysis:
`B is correct: bilinguals "perform better on average" on inhibition and switching tasks, and brain regions for executive control are recruited differently.

A reverses the modern view, which the text explicitly says was overturned.
C is not claimed; the text says vocabulary in each individual language may be slightly smaller, with no claim about combined totals.
D overstates the dementia evidence ("tentatively…remain disputed").`,
  },
  {
    id: "mc-b2-304",
    type: "multiple_choice",
    level: "B2",
    title: "The Reading Habits of the Young",
    topic: "Education · Society",
    passage:
`Concern about declining reading among young people has been a recurring feature of public commentary for at least the past two decades. Surveys, however, point to a more nuanced reality. While the time that adolescents devote specifically to reading printed books has fallen, the total volume of text they consume each day — across messaging platforms, social media, news feeds and educational resources — has almost certainly risen. The question for educators is therefore not whether the young read but how, and to what depth. Researchers have noted that sustained reading of long-form prose, the kind that demands continuous concentration over many minutes, exercises cognitive skills not engaged by skimming short bursts of text on a screen. Programmes that protect dedicated time for unhurried, often-paper-based reading appear to support those skills, while making no claim that digital reading is inherently inferior. The most thoughtful initiatives accept that contemporary literacy is plural and seek to cultivate both deep and rapid forms of engagement.`,
    instructions: "Choose the BEST answer.",
    options: [
      { label: "A", text: "Today's young people read significantly less text overall than previous generations." },
      { label: "B", text: "The amount young people read has not declined; what has changed is the form and depth." },
      { label: "C", text: "Digital reading is intrinsically harmful to cognitive development." },
      { label: "D", text: "Schools should ban smartphones to restore traditional reading habits." },
    ],
    items: [{ prompt: "Which statement best reflects the writer's view?", answer: "B" }],
    analysis:
`B is correct: total text consumption has "almost certainly risen"; what has changed is form (printed books → screens) and depth (long-form vs. skimming).

A contradicts the text.
C overstates: the writer notes only that long-form reading exercises distinct skills.
D is not proposed; the writer endorses programmes that protect time for unhurried reading, not bans.`,
  },
  {
    id: "mc-b2-305",
    type: "multiple_choice",
    level: "B2",
    title: "The Long Decline of Insect Populations",
    topic: "Environment · Biology",
    passage:
`Concern about a long-term decline in insect populations has been gathering force since a 2017 study, based on three decades of trapping data from German nature reserves, reported a fall of more than seventy per cent in the total flying insect biomass. Subsequent work in other parts of Europe and North America has produced a more uneven picture: declines are confirmed in many habitats, but rates vary substantially between regions, between insect orders and between groups specialised on particular plants. The principal causes most often identified are the intensification of agriculture, the steady loss of flower-rich field margins, the widespread use of certain pesticides and, increasingly, the pressures of a changing climate. Because insects pollinate crops, recycle nutrients and form the base of countless food chains, even a partial collapse of their abundance carries far-reaching ecological consequences. Several governments have begun to fund landscape-scale habitat restoration as a response, although ecologists warn that recovery — where it is possible at all — is likely to be measured in decades rather than years.`,
    instructions: "Choose the BEST answer.",
    options: [
      { label: "A", text: "All insect groups are declining at exactly the same rate." },
      { label: "B", text: "Insect declines are widespread but uneven, and recovery will be slow at best." },
      { label: "C", text: "The 2017 German study has been entirely refuted by later work." },
      { label: "D", text: "Restoration of insect populations can be expected within a few years." },
    ],
    items: [{ prompt: "Which statement best reflects the writer's view?", answer: "B" }],
    analysis:
`B is correct: declines are "confirmed in many habitats" but vary by region/order/group, and recovery is "likely to be measured in decades rather than years".

A contradicts the explicit point that rates vary substantially.
C is not claimed — later work has nuanced, not refuted, the German study.
D inverts the writer's caution about timescales.`,
  },
  {
    id: "mc-b2-306",
    type: "multiple_choice",
    level: "B2",
    title: "The Open-Plan Office Reconsidered",
    topic: "Work · Architecture",
    passage:
`The open-plan office, championed throughout the late twentieth century as a means of fostering collaboration, transparency and flexible use of space, has come under sustained criticism in recent years. Detailed observational studies have shown that the introduction of fully open layouts is often followed by a significant fall in face-to-face interaction, as employees retreat into headphones and asynchronous messaging in order to manage the noise and visual distraction around them. Cognitive performance on tasks requiring sustained concentration is consistently impaired in noisy open environments, and reported satisfaction with the workplace tends to fall. None of this means that traditional cellular offices, isolating each employee behind a closed door, are necessarily superior. The more promising direction, identified by both designers and occupational psychologists, is what is sometimes called "activity-based working": a varied environment in which different zones — quiet rooms, collaboration spaces, informal meeting areas — are matched to different tasks, and employees move between them as the demands of the day require.`,
    instructions: "Choose the BEST answer.",
    options: [
      { label: "A", text: "Open-plan offices have been shown to increase face-to-face interaction." },
      { label: "B", text: "Cellular offices isolating each employee are clearly the best solution." },
      { label: "C", text: "Activity-based working, providing varied zones for different tasks, is a more promising approach." },
      { label: "D", text: "Office design has no measurable effect on cognitive performance." },
    ],
    items: [{ prompt: "Which statement best reflects the writer's view?", answer: "C" }],
    analysis:
`C is correct: the writer endorses "activity-based working" as the more promising direction.

A is the opposite of what the studies show.
B is rejected explicitly: "None of this means that traditional cellular offices…are necessarily superior".
D contradicts the cognitive-performance findings.`,
  },
  {
    id: "mc-b2-307",
    type: "multiple_choice",
    level: "B2",
    title: "Why Some Languages Have Tiny Vocabularies",
    topic: "Linguistics",
    passage:
`Discussions of vocabulary size frequently treat very large dictionaries as a measure of a language's richness, and very small ones as a sign of impoverishment. Linguists, however, view such comparisons with caution. The actively used vocabulary of speakers in any community tends to fall within a remarkably similar range, regardless of the total number of words their language has formally coined; what varies is the way meanings are packaged. Languages that aggregate ideas into long, productively formed compounds — such as German or Finnish — generate enormous nominal totals because almost every novel concept can be expressed by a new combination of existing roots. Languages that prefer multi-word expressions or context-dependent reuse of common terms record fewer entries in dictionaries but are no less able to convey the same range of meanings. Modern field linguists therefore consider claims about a particular language's "primitive" vocabulary to be, almost without exception, an artefact either of inadequate documentation or of misunderstanding the principles by which words and phrases convey meaning.`,
    instructions: "Choose the BEST answer.",
    options: [
      { label: "A", text: "Languages with smaller dictionaries are clearly less expressive." },
      { label: "B", text: "Apparent differences in vocabulary size mostly reflect how meaning is packaged, not what can be expressed." },
      { label: "C", text: "Only German and Finnish can express complex ideas reliably." },
      { label: "D", text: "All speakers of all languages know the same number of words exactly." },
    ],
    items: [{ prompt: "Which statement best reflects the writer's view?", answer: "B" }],
    analysis:
`B is correct: vocabulary differences reflect "the way meanings are packaged", not differences in expressive capacity.

A directly contradicts the writer's position.
C overstates: German and Finnish are simply illustrative of the compounding strategy.
D overstates: the active vocabularies fall within a similar range, not exactly equal.`,
  },
  {
    id: "mc-b2-308",
    type: "multiple_choice",
    level: "B2",
    title: "The Economics of Public Libraries",
    topic: "Society · Economics",
    passage:
`Public libraries have repeatedly been written off as obsolete in the digital age, and yet usage figures in many countries tell a more complicated story. While loans of printed books have indeed fallen in absolute terms, visits to library buildings, attendance at organised events and the use of digital lending services have, in many places, more than compensated. Economists who have attempted to value the wider social benefits of libraries — including support for adult literacy, free internet access for low-income households, sheltered space for vulnerable users and informal community gathering — typically conclude that public investment generates returns several times its cost. Critics counter that such estimates inevitably depend on contested valuations and that scarce municipal funds might be more efficiently directed elsewhere. Most contemporary library managers therefore argue not for nostalgic preservation of a twentieth-century model, but for the steady reinvention of the library as a multi-purpose civic institution in which printed books are one important resource among many.`,
    instructions: "Choose the BEST answer.",
    options: [
      { label: "A", text: "Public libraries are unambiguously obsolete in the digital age." },
      { label: "B", text: "Library managers argue for nostalgic preservation of mid-twentieth-century models." },
      { label: "C", text: "Library use overall has not necessarily fallen, and the institution's social value is being reimagined." },
      { label: "D", text: "Economic valuations of libraries have proved entirely uncontested." },
    ],
    items: [{ prompt: "Which statement best reflects the writer's view?", answer: "C" }],
    analysis:
`C is correct: the passage argues that visits, events and digital lending often more than compensate for falling printed loans, and that managers favour reinvention.

A directly contradicts the text.
B inverts the closing argument, which is for reinvention rather than nostalgia.
D contradicts the explicit acknowledgement that valuations are "contested".`,
  },
];

export default supplements;
