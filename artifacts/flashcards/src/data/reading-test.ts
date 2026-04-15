export interface ReadingPassage {
  id: number;
  title: string;
  subtitle?: string;
  timeGuide: string;
  questionRange: string;
  paragraphs: { label?: string; text: string }[];
  questionSections: QuestionSection[];
}

export type QuestionType = "fill" | "tfng" | "mcParagraph" | "mcMatch" | "multiSelect";

export interface QuestionSection {
  instruction: string;
  type: QuestionType;
  questions: Question[];
  options?: { label: string; text: string }[];
}

export interface Question {
  num: number;
  text: string;
  answer: string;
  alternateAnswers?: string[];
}

export interface ReadingTest {
  id: string;
  label: string;
  passages: ReadingPassage[];
}

export const readingTests: ReadingTest[] = [
  {
    id: "test1",
    label: "Test 1",
    passages: [
  {
    id: 1,
    title: "Urban farming",
    subtitle: "In Paris, urban farmers are trying a soil-free approach to agriculture that uses less space and fewer resources. Could it help cities face the threats to our food supplies?",
    timeGuide: "You should spend about 20 minutes on Questions 1–13",
    questionRange: "Questions 1–13",
    paragraphs: [
      {
        text: "On top of a striking new exhibition hall in southern Paris, the world's largest urban rooftop farm has started to bear fruit. Strawberries that are small, intensely flavoured and resplendently red sprout abundantly from large plastic tubes. Peer inside and you see the tubes are completely hollow, the roots of dozens of strawberry plants dangling down inside them. From identical vertical tubes nearby burst row upon row of lettuces; near those are aromatic herbs, such as basil, sage and peppermint. Opposite, in narrow, horizontal trays packed not with soil but with coconut fibre, grow cherry tomatoes, shiny aubergines and brightly coloured chards."
      },
      {
        text: "Pascal Hardy, an engineer and sustainable development consultant, began experimenting with vertical farming and aeroponic growing towers – as the soil-free plastic tubes are known – on his Paris apartment block roof five years ago. The urban rooftop space above the exhibition hall is somewhat bigger: 14,000 square metres and almost exactly the size of a couple of football pitches. Already, the team of young urban farmers who tend it have picked, in one day, 3,000 lettuces and 150 punnets of strawberries. When the remaining two thirds of the vast open area are in production, 20 staff will harvest up to 1,000 kg of perhaps 35 different varieties of fruit and vegetables, every day. 'We're not ever, obviously, going to feed the whole city this way,' cautions Hardy. 'In the urban environment you're working with very significant practical constraints, clearly, on what you can do and where. But if enough unused space can be developed like this, there's no reason why you shouldn't eventually target maybe between 5% and 10% of consumption.'"
      },
      {
        text: "Perhaps most significantly, however, this is a real-life showcase for the work of Hardy's flourishing urban agriculture consultancy, Agripolis, which is currently fielding enquiries from around the world to design, build and equip a new breed of soil-free inner-city farm. 'The method's advantages are many,' he says. 'First, I don't much like the fact that most of the fruit and vegetables we eat have been treated with something like 17 different pesticides, or that the intensive farming techniques that produced them are such huge generators of greenhouse gases. I don't much like the fact, either, that they've travelled an average of 2,000 refrigerated kilometres to my plate, that their quality is so poor, because the varieties are selected for their capacity to withstand such substantial journeys, or that 80% of the price I pay goes to wholesalers and transport companies, not the producers.'"
      },
      {
        text: "Produce grown using this soil-free method, on the other hand – which relies solely on a small quantity of water, enriched with organic nutrients, pumped around a closed circuit of pipes, towers and trays – is 'produced up here, and sold locally, just down there. It barely travels at all,' Hardy says. 'You can select crop varieties for their flavour, not their resistance to the transport and storage chain, and you can pick them when they're really at their best, and not before.' No soil is exhausted, and the water that gently showers the plants' roots every 12 minutes is recycled, so the method uses 90% less water than a classic intensive farm for the same yield."
      },
      {
        text: "Urban farming is not, of course, a new phenomenon. Inner-city agriculture is booming from Shanghai to Detroit and Tokyo to Bangkok. Strawberries are being grown in disused shipping containers, mushrooms in underground carparks. Aeroponic farming, he says, is 'virtuous'. The equipment weighs little, can be installed on almost any flat surface and is cheap to buy: roughly €100 to €150 per square metre. It is cheap to run, too, consuming a tiny fraction of the electricity used by some techniques."
      },
      {
        text: "Produce grown this way typically sells at prices that, while generally higher than those of classic intensive agriculture, are lower than soil-based organic growers. There are limits to what farmers can grow this way, of course, and much of the produce is suited to the summer months. 'Root vegetables we cannot do, at least not yet,' he says. 'Radishes are OK, but carrots, potatoes, that kind of thing – the roots are simply too long. Fruit trees are obviously not an option. And beans tend to take up a lot of space for not much return.' Nevertheless, urban farming of the kind being practised in Paris is one part of a bigger and fast-changing picture that is bringing food production closer to our lives."
      }
    ],
    questionSections: [
      {
        instruction: "Complete the sentences below.\nChoose NO MORE THAN TWO WORDS AND/OR A NUMBER from the passage for each answer.",
        type: "fill",
        questions: [
          { num: 1, text: "Vertical tubes are used to grow strawberries, __________ and herbs.", answer: "lettuces" },
          { num: 2, text: "There will eventually be a daily harvest of as much as __________ in weight of fruit and vegetables.", answer: "1,000 kg", alternateAnswers: ["1000 kg"] },
          { num: 3, text: "It may be possible that the farm's produce will account for as much as 10% of the city's __________ overall.", answer: "consumption", alternateAnswers: ["(food) consumption", "food consumption"] }
        ]
      },
      {
        instruction: "Complete the table below.\nChoose ONE WORD ONLY from the passage for each answer.\n\nIntensive farming versus aeroponic urban farming",
        type: "fill",
        questions: [
          { num: 4, text: "Intensive farming — Growth: wide range of __________ used; techniques pollute air", answer: "pesticides" },
          { num: 5, text: "Intensive farming — Selection: varieties of fruit and vegetables chosen that can survive long __________", answer: "journeys" },
          { num: 6, text: "Intensive farming — Sale: __________ receive very little of overall income", answer: "producers" },
          { num: 7, text: "Aeroponic urban farming — Selection: produce chosen because of its __________", answer: "flavour", alternateAnswers: ["flavor"] }
        ]
      },
      {
        instruction: "Do the following statements agree with the information given in Reading Passage 1?\nWrite TRUE if the statement agrees with the information.\nWrite FALSE if the statement contradicts the information.\nWrite NOT GIVEN if there is no information on this.",
        type: "tfng",
        questions: [
          { num: 8, text: "Urban farming can take place above or below ground.", answer: "TRUE" },
          { num: 9, text: "Some of the equipment used in aeroponic farming can be made by hand.", answer: "NOT GIVEN" },
          { num: 10, text: "Urban farming relies more on electricity than some other types of farming.", answer: "FALSE" },
          { num: 11, text: "Fruit and vegetables grown on an aeroponic urban farm are cheaper than traditionally grown organic produce.", answer: "TRUE" },
          { num: 12, text: "Most produce can be grown on an aeroponic urban farm at any time of the year.", answer: "FALSE" },
          { num: 13, text: "Beans take longer to grow on an urban farm than other vegetables.", answer: "NOT GIVEN" }
        ]
      }
    ]
  },
  {
    id: 2,
    title: "Forest management in Pennsylvania, USA",
    subtitle: "How managing low-quality wood (also known as low-use wood) for bioenergy can encourage sustainable forest management",
    timeGuide: "You should spend about 20 minutes on Questions 14–26",
    questionRange: "Questions 14–26",
    paragraphs: [
      {
        label: "A",
        text: "A tree's 'value' depends on several factors including its species, size, form, condition, quality, function, and accessibility, and depends on the management goals for a given forest. The same tree can be valued very differently by each person who looks at it. A large, straight black cherry tree has high value as timber to be cut into logs or made into furniture, but for a landowner more interested in wildlife habitat, the real value of that stem (or trunk) may be the food it provides to animals. Likewise, if the tree suffers from black knot disease, its value for timber decreases, but to a woodworker interested in making bowls, it brings an opportunity for a unique and beautiful piece of art."
      },
      {
        label: "B",
        text: "In the past, Pennsylvania landowners were solely interested in the value of their trees as high-quality timber. The norm was to remove the stems of highest quality and leave behind poorly formed trees that were not as well suited to the site where they grew. This practice, called 'high-grading', has left a legacy of 'low-use wood' in the forests. Some people even call these 'junk trees', and they are abundant in Pennsylvania. These trees have lower economic value for traditional timber markets, compete for growth with higher-value trees, shade out desirable regeneration and decrease the health of a stand, leaving it more vulnerable to poor weather and disease. Management that specifically targets low-use wood can help landowners manage these forest health issues, and wood energy markets help promote this."
      },
      {
        label: "C",
        text: "Wood energy markets can accept less expensive wood material of lower quality than would be suitable for traditional timber markets. Most wood used for energy in Pennsylvania is used to produce heat or electricity through combustion. Many schools and hospitals use wood boiler systems to heat and power their facilities, many homes are primarily heated with wood, and some coal plants incorporate wood into their coal streams to produce electricity. Wood can also be gasified for electrical generation and can even be made into liquid fuels like ethanol and gasoline for lorries and cars. All these products are made primarily from low-use wood. Several tree- and plant-cutting approaches, which could greatly improve the long-term quality of a forest, focus strongly or solely on the use of wood for those markets."
      },
      {
        label: "D",
        text: "One such approach is called a Timber Stand Improvement (TSI) Cut. In a TSI Cut, really poor-quality tree and plant material is cut down to allow more space, light, and other resources to the highest-valued stems that remain. Removing invasive plants might be another primary goal of a TSI Cut. The stems that are left behind might then grow in size and develop more foliage and larger crowns or tops that produce more coverage for wildlife; they have a better chance to regenerate in a less crowded environment. TSI Cuts can be tailored to one farmer's specific management goals for his or her land."
      },
      {
        label: "E",
        text: "Another approach that might yield a high amount of low-use wood is a Salvage Cut. With the many pests and pathogens visiting forests including hemlock wooly adelgid, Asian longhorned beetle, emerald ash borer, and gypsy moth, to name just a few, it is important to remember that those working in the forests can help ease these issues through cutting procedures. These types of cut reduce the number of sick trees and seek to manage the future spread of a pest problem. They leave vigorous trees that have stayed healthy enough to survive the outbreak."
      },
      {
        label: "F",
        text: "A Shelterwood Cut, which only takes place in a mature forest that has already been thinned several times, involves removing all the mature trees when other seedlings have become established. This then allows the forester to decide which tree species are regenerated. It leaves a young forest where all trees are at a similar point in their growth. It can also be used to develop a two-tier forest so that there are two harvests and the money that comes in is spread out over a decade or more."
      },
      {
        label: "G",
        text: "Thinnings and dense and dead wood removal for fire prevention also center on the production of low-use wood. However, it is important to remember that some retention of what many would classify as low-use wood is very important. The tops of trees that have been cut down should be left on the site so that their nutrients cycle back into the soil. In addition, trees with many cavities are extremely important habitats for insect predators like woodpeckers, bats and small mammals. They help control problem insects and increase the health and resilience of the forest. It is also important to remember that not all small trees are low-use. For example, many species like hawthorn provide food for wildlife. Finally, rare species of trees in a forest should also stay behind as they add to its structural diversity."
      }
    ],
    questionSections: [
      {
        instruction: "Reading Passage 2 has seven paragraphs, A–G.\nWhich paragraph contains the following information?\nWrite the correct letter, A–G, in boxes 14–18 on your answer sheet.\nNB You may use any letter more than once.",
        type: "mcParagraph",
        questions: [
          { num: 14, text: "bad outcomes for a forest when people focus only on its financial reward", answer: "B" },
          { num: 15, text: "reference to the aspects of any tree that contribute to its worth", answer: "A" },
          { num: 16, text: "mention of the potential use of wood to help run vehicles", answer: "C" },
          { num: 17, text: "examples of insects that attack trees", answer: "E" },
          { num: 18, text: "an alternative name for trees that produce low-use wood", answer: "B" }
        ],
        options: [
          { label: "A", text: "A" },
          { label: "B", text: "B" },
          { label: "C", text: "C" },
          { label: "D", text: "D" },
          { label: "E", text: "E" },
          { label: "F", text: "F" },
          { label: "G", text: "G" }
        ]
      },
      {
        instruction: "Look at the following purposes (Questions 19–21) and the list of timber cuts below.\nMatch each purpose with the correct timber cut, A, B or C.\nWrite the correct letter, A, B or C, in boxes 19–21 on your answer sheet.\nNB You may use any letter more than once.",
        type: "mcMatch",
        questions: [
          { num: 19, text: "to remove trees that are diseased", answer: "B" },
          { num: 20, text: "to generate income across a number of years", answer: "C" },
          { num: 21, text: "to create a forest whose trees are close in age", answer: "C" }
        ],
        options: [
          { label: "A", text: "a TSI Cut" },
          { label: "B", text: "a Salvage Cut" },
          { label: "C", text: "a Shelterwood Cut" }
        ]
      },
      {
        instruction: "Complete the sentences below.\nChoose ONE WORD ONLY from the passage for each answer.",
        type: "fill",
        questions: [
          { num: 22, text: "Some dead wood is removed to avoid the possibility of __________.", answer: "fire" },
          { num: 23, text: "The __________ from the tops of cut trees can help improve soil quality.", answer: "nutrients" },
          { num: 24, text: "Some damaged trees should be left, as their __________ provide habitats for a range of creatures.", answer: "cavities" },
          { num: 25, text: "Some trees that are small, such as __________, are a source of food for animals and insects.", answer: "hawthorn" },
          { num: 26, text: "Any trees that are __________ should be left to grow, as they add to the variety of species in the forest.", answer: "rare" }
        ]
      }
    ]
  },
  {
    id: 3,
    title: "Conquering Earth's space junk problem",
    subtitle: "Satellites, rocket shards and collision debris are creating major traffic risks in orbit around the planet. Researchers are working to reduce these threats",
    timeGuide: "You should spend about 20 minutes on Questions 27–40",
    questionRange: "Questions 27–40",
    paragraphs: [
      {
        label: "A",
        text: "Last year, commercial companies, military and civil departments and amateurs sent more than 400 satellites into orbit, over four times the yearly average in the previous decade. Numbers could rise even more sharply if leading space companies follow through on plans to deploy hundreds to thousands of large constellations of satellites to space in the next few years.\n\nAll that traffic can lead to disaster. Ten years ago, a US commercial Iridium satellite smashed into an inactive Russian communications satellite called Cosmos-2251, creating thousands of new pieces of space shrapnel that now threaten other satellites in low Earth orbit – the zone stretching up to 2,000 kilometres in altitude. Altogether, there are roughly 20,000 human-made objects in orbit, from working satellites to small rocket pieces. And satellite operators can't steer away from every potential crash, because each move consumes time and fuel that could otherwise be used for the spacecraft's main job."
      },
      {
        label: "B",
        text: "Concern about space junk goes back to the beginning of the satellite era, but the number of objects in orbit is rising so rapidly that researchers are investigating new ways of attacking the problem. Several teams are trying to improve methods for assessing what is in orbit, so that satellite operators can work more efficiently in ever-more-crowded space. Some researchers are now starting to compile a massive data set that includes the best possible information on where everything is in orbit. Others are developing taxonomies of space debris – working on measuring properties such as the shape and size of an object, so that satellite operators know how much to worry about what's coming their way.\n\nThe alternative, many say, is unthinkable. Just a few uncontrolled space crashes could generate enough debris to set off a runaway cascade of fragments, rendering near-Earth space unusable. 'If we go on like this, we will reach a point of no return,' says Carolin Frueh, an astrodynamical researcher at Purdue University in West Lafayette, Indiana."
      },
      {
        label: "C",
        text: "Even as our ability to monitor space objects increases, so too does the total number of items in orbit. That means companies, governments and other players in space are collaborating in new ways to avoid a shared threat. International groups such as the Inter-Agency Space Debris Coordination Committee have developed guidelines on space sustainability. Those include inactivating satellites at the end of their useful life by venting pressurised materials or leftover fuel that might lead to explosions. The intergovernmental groups also advise lowering satellites deep enough into the atmosphere that they will burn up or disintegrate within 25 years. But so far, only about half of all missions have abided by this 25-year goal, says Holger Krag, head of the European Space Agency's space-debris office in Darmstadt, Germany. Operators of the planned large constellations of satellites say they will be responsible stewards in their enterprises in space, but Krag worries that problems could increase, despite their best intentions. 'What happens to those that fail or go bankrupt?' he asks. 'They are probably not going to spend money to remove their satellites from space.'"
      },
      {
        label: "D",
        text: "In theory, given the vastness of space, satellite operators should have plenty of room for all these missions to fly safely without ever nearing another object. So some scientists are tackling the problem of space junk by trying to find out where all the debris is to a high degree of precision. That would alleviate the need for many of the unnecessary manoeuvres that are carried out to avoid potential collisions. 'If you knew precisely where everything was, you would almost never have a problem,' says Marlon Sorge, a space-debris specialist at the Aerospace Corporation in El Segundo, California."
      },
      {
        label: "E",
        text: "The field is called space traffic management, because it's similar to managing traffic on the roads or in the air. Think about a busy day at an airport, says Moriba Jah, an astrodynamicist at the University of Texas at Austin: planes line up in the sky, landing and taking off close to one another in a carefully choreographed routine. Air-traffic controllers know the location of the planes down to one metre in accuracy. The same can't be said for space debris. Not all objects in orbit are known, and even those included in databases are not tracked consistently."
      },
      {
        label: "F",
        text: "An additional problem is that there is no authoritative catalogue that accurately lists the orbits of all known space debris. Jah illustrates this with a web-based database that he has developed. It draws on several sources, such as catalogues maintained by the US and Russian governments, to visualise where objects are in space. When he types in an identifier for a particular space object, the database draws a purple line to designate its orbit. Only this doesn't quite work for a number of objects, such as a Russian rocket body designated in the database as object number 32280. When Jah enters that number, the database draws two purple lines: the US and Russian sources contain two completely different orbits for the same object. Jah says that it is almost impossible to tell which is correct, unless a third source of information made it possible to cross-correlate.\n\nJah describes himself as a space environmentalist: 'I want to make space a place that is safe to operate, that is free and useful for generations to come.' Until that happens, he argues, the space community will continue devolving into a tragedy in which all spaceflight operators are polluting a common resource."
      }
    ],
    questionSections: [
      {
        instruction: "Reading Passage 3 has six sections, A–F.\nWhich section contains the following information?\nWrite the correct letter, A–F, in boxes 27–31 on your answer sheet.",
        type: "mcParagraph",
        questions: [
          { num: 27, text: "a reference to the cooperation that takes place to try and minimise risk", answer: "C" },
          { num: 28, text: "an explanation of a person's aims", answer: "F" },
          { num: 29, text: "a description of a major collision that occurred in space", answer: "A" },
          { num: 30, text: "a comparison between tracking objects in space and the efficiency of a transportation system", answer: "E" },
          { num: 31, text: "a reference to efforts to classify space junk", answer: "B" }
        ],
        options: [
          { label: "A", text: "A" },
          { label: "B", text: "B" },
          { label: "C", text: "C" },
          { label: "D", text: "D" },
          { label: "E", text: "E" },
          { label: "F", text: "F" }
        ]
      },
      {
        instruction: "Complete the summary below.\nChoose ONE WORD ONLY from the passage for each answer.\n\nThe Inter-Agency Space Debris Coordination Committee",
        type: "fill",
        questions: [
          { num: 32, text: "The committee gives advice on how the __________ of space can be achieved.", answer: "sustainability" },
          { num: 33, text: "The committee advises that when satellites are no longer active, any unused __________ or pressurised material that could cause", answer: "fuel" },
          { num: 34, text: "__________ should be removed.", answer: "explosions" },
          { num: 35, text: "Although operators of large satellite constellations accept that they have obligations as stewards of space, Holger Krag points out that the operators that become __________ are unlikely to prioritise removing their satellites from space.", answer: "bankrupt" }
        ]
      },
      {
        instruction: "Look at the following statements (Questions 36–40) and the list of people below.\nMatch each statement with the correct person, A, B, C or D.\nWrite the correct letter, A, B, C or D, in boxes 36–40 on your answer sheet.\nNB You may use any letter more than once.",
        type: "mcMatch",
        questions: [
          { num: 36, text: "Knowing the exact location of space junk would help prevent any possible danger.", answer: "C" },
          { num: 37, text: "Space should be available to everyone and should be preserved for the future.", answer: "D" },
          { num: 38, text: "A recommendation regarding satellites is widely ignored.", answer: "B" },
          { num: 39, text: "There is conflicting information about where some satellites are in space.", answer: "D" },
          { num: 40, text: "There is a risk we will not be able to undo the damage that occurs in space.", answer: "A" }
        ],
        options: [
          { label: "A", text: "Carolin Frueh" },
          { label: "B", text: "Holger Krag" },
          { label: "C", text: "Marlon Sorge" },
          { label: "D", text: "Moriba Jah" }
        ]
      }
    ]
  }
    ]
  },
  {
    id: "test2",
    label: "Test 2",
    passages: [
      {
        id: 1,
        title: "The kākāpō",
        subtitle: "The kākāpō is a nocturnal, flightless parrot that is critically endangered and one of New Zealand's unique treasures",
        timeGuide: "You should spend about 20 minutes on Questions 1–13",
        questionRange: "Questions 1–13",
        paragraphs: [
          {
            text: "The kākāpō, also known as the owl parrot, is a large, forest-dwelling bird, with a pale owl-like face. Up to 64 cm in length, it has predominantly yellow-green feathers, forward-facing eyes, a large grey beak, large blue feet, and relatively short wings and tail. It is the world's only flightless parrot, and is also possibly one of the world's longest-living birds, with a reported lifespan of up to 100 years. Kākāpō are solitary birds and tend to occupy the same home range for many years. They forage on the ground and climb high into trees. They often leap from trees and flap their wings, but at best manage a controlled descent to the ground. They are entirely vegetarian, with their diet including the leaves, roots and bark of trees as well as bulbs, and fern fronds."
          },
          {
            text: "Kākāpō breed in summer and autumn, but only in years when food is plentiful. Males play no part in incubation or chick-rearing — females alone incubate eggs and feed the chicks. The 1–4 eggs are laid in soil, which is repeatedly turned over before and during incubation. The female kākāpō has to spend long periods away from the nest searching for food, which leaves the unattended eggs and chicks particularly vulnerable to predators."
          },
          {
            text: "Before humans arrived, kākāpō were common throughout New Zealand's forests. However, this all changed with the arrival of the first Polynesian settlers about 700 years ago. For the early settlers, the flightless kākāpō was easy prey. They ate its meat and used its feathers to make soft cloaks. With them came the Polynesian dog and rat, which also preyed on kākāpō. By the time European colonisers arrived in the early 1800s, kākāpō had become confined to the central North Island and forested parts of the South Island. The fall in kākāpō numbers was accelerated by European colonisation. A great deal of habitat was lost through forest clearance, and introduced species such as deer depleted the remaining forests of food. Other predators such as cats, stoats and two more species of rat were also introduced. The kākāpō were in serious trouble."
          },
          {
            text: "In 1894, the New Zealand government launched its first attempt to save the kākāpō. Conservationist Richard Henry led an effort to relocate several hundred of the birds to predator-free Resolution Island in Fiordland. Unfortunately, the island didn't remain predator free — stoats arrived within six years, eventually destroying the kākāpō population. By the mid-1900s, the kākāpō was practically a lost species. Only a few clung to life in the most isolated parts of New Zealand."
          },
          {
            text: "From 1949 to 1973, the newly formed New Zealand Wildlife Service made over 60 expeditions to find kākāpō, focusing mainly on Fiordland. Six were caught, but there were no females amongst them and all but one died within a few months of captivity. In 1974, a new initiative was launched, and by 1977, 18 more kākāpō were found in Fiordland. However, there were still no females. In 1977, a large population of males was spotted in Rakiura — a large island free from stoats, ferrets and weasels. There were about 200 individuals, and in 1980 it was confirmed females were also present. These birds have been the foundation of all subsequent work in managing the species."
          },
          {
            text: "Unfortunately, predation by feral cats on Rakiura Island led to a rapid decline in kākāpō numbers. As a result, during 1980–97, the surviving population was evacuated to three island sanctuaries: Codfish Island, Maud Island and Little Barrier Island. However, breeding success was hard to achieve. Rats were found to be a major predator of kākāpō chicks and an insufficient number of chicks survived to offset adult mortality. By 1995, although at least 12 chicks had been produced on the islands, only three had survived. The kākāpō population had dropped to 51 birds. The critical situation prompted an urgent review of kākāpō management in New Zealand."
          },
          {
            text: "In 1996, a new Recovery Plan was launched, together with a specialist advisory group called the Kākāpō Scientific and Technical Advisory Committee and a higher amount of funding. Renewed steps were taken to control predators on the three islands. Cats were eradicated from Little Barrier Island in 1980, and possums were eradicated from Codfish Island by 1986. However, the population did not start to increase until rats were removed from all three islands, and the birds were more intensively managed. This involved moving the birds between islands, supplementary feeding of adults and rescuing and hand-raising any failing chicks. After the first five years of the Recovery Plan, the population was on target. By 2000, five new females had been produced, and the total population had grown to 62 birds. For the first time, there was cautious optimism for the future of kākāpō and by June 2020, a total of 210 birds was recorded."
          },
          {
            text: "Today, kākāpō management continues to be guided by the kākāpō Recovery Plan. Its key goals are: minimise the loss of genetic diversity in the kākāpō population, restore or maintain sufficient habitat to accommodate the expected increase in the kākāpō population, and ensure stakeholders continue to be fully engaged in the preservation of the species."
          }
        ],
        questionSections: [
          {
            instruction: "Do the following statements agree with the information given in Reading Passage 1?\nWrite TRUE if the statement agrees with the information.\nWrite FALSE if the statement contradicts the information.\nWrite NOT GIVEN if there is no information on this.",
            type: "tfng",
            questions: [
              { num: 1, text: "There are other parrots that share the kākāpō's inability to fly.", answer: "FALSE" },
              { num: 2, text: "Adult kākāpō produce chicks every year.", answer: "FALSE" },
              { num: 3, text: "Adult male kākāpō bring food back to nesting females.", answer: "FALSE" },
              { num: 4, text: "The Polynesian rat was a greater threat to the kākāpō than Polynesian settlers.", answer: "NOT GIVEN" },
              { num: 5, text: "Kākāpō were transferred from Rakiura Island to other locations because they were at risk from feral cats.", answer: "TRUE" },
              { num: 6, text: "One Recovery Plan initiative that helped increase the kākāpō population size was caring for struggling young birds.", answer: "TRUE" }
            ]
          },
          {
            instruction: "Complete the notes below.\nChoose ONE WORD AND/OR A NUMBER from the passage for each answer.\n\nNew Zealand's kākāpō",
            type: "fill",
            questions: [
              { num: 7, text: "A type of parrot: diet consists of fern fronds, various parts of a tree and __________.", answer: "bulbs" },
              { num: 8, text: "Nests are created in __________ where eggs are laid.", answer: "soil" },
              { num: 9, text: "Arrival of Polynesian settlers: the __________ of the kākāpō were used to make clothes.", answer: "feathers" },
              { num: 10, text: "Arrival of European colonisers: __________ were an animal which they introduced that ate the kākāpō's food sources.", answer: "deer" },
              { num: 11, text: "A definite sighting of female kākāpō on Rakiura Island was reported in the year __________.", answer: "1980" },
              { num: 12, text: "The Recovery Plan included an increase in __________.", answer: "funding" },
              { num: 13, text: "A current goal of the Recovery Plan is to maintain the involvement of __________ in kākāpō protection.", answer: "stakeholders" }
            ]
          }
        ]
      },
      {
        id: 2,
        title: "Reintroducing elms to Britain",
        subtitle: "Mark Rowe investigates attempts to reintroduce elms to Britain",
        timeGuide: "You should spend about 20 minutes on Questions 14–26",
        questionRange: "Questions 14–26",
        paragraphs: [
          {
            label: "A",
            text: "Around 25 million elms, accounting for 90% of all elm trees in the UK, died during the 1960s and '70s of Dutch elm disease. In the aftermath, the elm, once so dominant in the British landscape, was largely forgotten. However, there's now hope the elm may be reintroduced to the countryside of central and southern England. Any reintroduction will start from a very low base. 'The impact of the disease is difficult to picture if you hadn't seen what was there before,' says Matt Elliot of the Woodland Trust. 'You look at old photographs from the 1960s and it's only then that you realise the impact [elms had] ... They were significant, large trees ... then they were gone.'"
          },
          {
            label: "B",
            text: "The disease is caused by a fungus that blocks the elms' vascular (water, nutrient and food transport) system, causing branches to wilt and die. A first epidemic, which occurred in the 1920s, gradually died down, but in the '70s a second epidemic was triggered by shipments of elm from Canada. The wood came in the form of logs destined for boat building and its intact bark was perfect for the elm bark beetles that spread the deadly fungus. This time, the beetles carried a much more virulent strain that destroyed the vast majority of British elms."
          },
          {
            label: "C",
            text: "Today, elms still exist in the southern English countryside but mostly only in low hedgerows between fields. 'We have millions of small elms in hedgerows but they get targeted by the beetle as soon as they reach a certain size,' says Karen Russell, co-author of the report 'Where we are with elm'. Once the trunk of the elm reaches 10–15 centimetres or so in diameter, it becomes a perfect size for beetles to lay eggs and for the fungus to take hold. Yet mature specimens have been identified, in counties such as Cambridgeshire, that are hundreds of years old, and have mysteriously escaped the epidemic.\n\nThe key, Russell says, is to identify and study those trees that have survived and work out why they stood tall when millions of others succumbed. Nevertheless, opportunities are limited as the number of these mature survivors is relatively small. 'What are the reasons for their survival?' asks Russell. 'Avoidance, tolerance, resistance? We don't know where the balance lies between the three. I don't see how it can be entirely down to luck.'"
          },
          {
            label: "D",
            text: "For centuries, elm ran a close second to oak as the hardwood tree of choice in Britain and was in many instances the most prominent tree in the landscape. Not only was elm common in European forests, it became a key component of birch, ash and hazel woodlands. The use of elm is thought to go back to the Bronze Age, when it was widely used for tools. Elm was also the preferred material for shields and early swords. In the 18th century, it was planted more widely and its wood was used for items such as storage crates and flooring. It was also suitable for items that experienced high levels of impact and was used to build the keel of the 19th-century sailing ship Cutty Sark as well as mining equipment."
          },
          {
            label: "E",
            text: "Given how ingrained elm is in British culture, it's unsurprising the tree has many advocates. Amongst them is Peter Bourne of the National Elm Collection in Brighton. 'I saw Dutch elm disease unfold as a small boy,' he says. 'The elm seemed to be part of rural England, but I remember watching trees just lose their leaves and that really stayed with me.' Today, the city of Brighton's elms total about 17,000. Local factors appear to have contributed to their survival. Strong winds from the sea make it difficult for the determined elm bark beetle to attack this coastal city's elm population. However, the situation is precarious. 'The beetles can just march in if we're not careful, as the threat is right on our doorstep,' says Bourne."
          },
          {
            label: "F",
            text: "Any prospect of the elm returning relies heavily on trees being either resistant to, or tolerant of, the disease. This means a widespread reintroduction would involve existing or new hybrid strains derived from resistant, generally non-native elm species. A new generation of seedlings have been bred and tested to see if they can withstand the fungus by cutting a small slit on the bark and injecting a tiny amount of the pathogen. 'The effects are very quick,' says Russell. 'You return in four to six weeks and trees that are resistant show no symptoms, whereas those that are susceptible show leaf loss and may even have died completely.'"
          },
          {
            label: "G",
            text: "All of this raises questions of social acceptance, acknowledges Russell. 'If we're putting elm back into the landscape, a small element of it is not native — are we bothered about that?' For her, the environmental case for reintroducing elm is strong. 'They will host wildlife, which is a good thing.' Others are more wary. 'On the face of it, it seems like a good idea,' says Elliot. The problem, he suggests, is that, 'You're replacing a native species with a horticultural analogue. You're effectively cloning.' There's also the risk of introducing new diseases. Rather than plant new elms, the Woodland Trust emphasises providing space to those elms that have survived independently. 'Sometimes the best thing you can do is just give nature time to recover ... over time, you might get resistance,' says Elliot."
          }
        ],
        questionSections: [
          {
            instruction: "Reading Passage 2 has seven sections, A–G.\nWhich section contains the following information?\nWrite the correct letter, A–G, in boxes 14–18 on your answer sheet.\nNB You may use any letter more than once.",
            type: "mcParagraph",
            questions: [
              { num: 14, text: "reference to the research problems that arise from there being only a few surviving large elms", answer: "C" },
              { num: 15, text: "details of a difference of opinion about the value of reintroducing elms to Britain", answer: "G" },
              { num: 16, text: "reference to how Dutch elm disease was brought into Britain", answer: "B" },
              { num: 17, text: "a description of the conditions that have enabled a location in Britain to escape Dutch elm disease", answer: "E" },
              { num: 18, text: "reference to the stage at which young elms become vulnerable to Dutch elm disease", answer: "C" }
            ],
            options: [
              { label: "A", text: "A" }, { label: "B", text: "B" }, { label: "C", text: "C" },
              { label: "D", text: "D" }, { label: "E", text: "E" }, { label: "F", text: "F" },
              { label: "G", text: "G" }
            ]
          },
          {
            instruction: "Look at the following statements (Questions 19–23) and the list of people below.\nMatch each statement with the correct person, A, B, or C.\nWrite the correct letter, A, B, or C, in boxes 19–23 on your answer sheet.\nNB You may use any letter more than once.",
            type: "mcMatch",
            questions: [
              { num: 19, text: "If a tree gets infected with Dutch elm disease, the damage rapidly becomes visible.", answer: "B" },
              { num: 20, text: "It may be better to wait and see if the mature elms that have survived continue to flourish.", answer: "A" },
              { num: 21, text: "There must be an explanation for the survival of some mature elms.", answer: "B" },
              { num: 22, text: "We need to be aware that insects carrying Dutch elm disease are not very far away.", answer: "C" },
              { num: 23, text: "You understand the effect Dutch elm disease has had when you see evidence of how prominent the tree once was.", answer: "A" }
            ],
            options: [
              { label: "A", text: "Matt Elliot" },
              { label: "B", text: "Karen Russell" },
              { label: "C", text: "Peter Bourne" }
            ]
          },
          {
            instruction: "Complete the summary below.\nChoose ONE WORD ONLY from the passage for each answer.\n\nUses of a popular tree",
            type: "fill",
            questions: [
              { num: 24, text: "For hundreds of years, the only tree that was more popular in Britain than elm was __________.", answer: "oak" },
              { num: 25, text: "Starting in the Bronze Age, many tools were made from elm and people also used it to make weapons. In the 18th century, it was grown to provide wood for boxes and __________.", answer: "flooring" },
              { num: 26, text: "Due to its strength, elm was often used for mining equipment and the Cutty Sark's __________ was also constructed from elm.", answer: "keel" }
            ]
          }
        ]
      },
      {
        id: 3,
        title: "How stress affects our judgement",
        subtitle: "Some of the most important decisions of our lives occur while we're feeling stressed and anxious",
        timeGuide: "You should spend about 20 minutes on Questions 27–40",
        questionRange: "Questions 27–40",
        paragraphs: [
          {
            text: "Some of the most important decisions of our lives occur while we're feeling stressed and anxious. From medical decisions to financial and professional ones, we are all sometimes required to weigh up information under stressful conditions. But do we become better or worse at processing and using information under such circumstances?"
          },
          {
            text: "My colleague and I, both neuroscientists, wanted to investigate how the mind operates under stress, so we visited some local fire stations. Firefighters' workdays vary quite a bit. Some are pretty relaxed; they'll spend their time washing the truck, cleaning equipment, cooking meals and reading. Other days can be hectic, with numerous life-threatening incidents to attend to; they'll enter burning homes to rescue trapped residents, and assist with medical emergencies. These ups and downs presented the perfect setting for an experiment on how people's ability to use information changes when they feel under pressure."
          },
          {
            text: "We found that perceived threat acted as a trigger for a stress reaction that made the task of processing information easier for the firefighters — but only as long as it conveyed bad news."
          },
          {
            text: "This is how we arrived at these results. We asked the firefighters to estimate their likelihood of experiencing 40 different adverse events in their life, such as being involved in an accident or becoming a victim of card fraud. We then gave them either good news (that their likelihood of experiencing these events was lower than they'd thought) or bad news (that it was higher) and asked them to provide new estimates."
          },
          {
            text: "People are normally quite optimistic — they will ignore bad news and embrace the good. This is what happened when the firefighters were relaxed; but when they were under stress, a different pattern emerged. Under these conditions, they became hyper-vigilant to bad news, even when it had nothing to do with their job (such as learning that the likelihood of card fraud was higher than they'd thought), and altered their beliefs in response. In contrast, stress didn't change how they responded to good news (such as learning that the likelihood of card fraud was lower than they'd thought)."
          },
          {
            text: "Back in our lab, we observed the same pattern in students who were told they had to give a surprise public speech, which would be judged by a panel, recorded and posted online. Sure enough, their cortisol levels spiked, their heart rates went up and they suddenly became better at processing unrelated, yet alarming, information about rates of disease and violence."
          },
          {
            text: "When we experience stressful events, a physiological change is triggered that causes us to take in warnings and focus on what might go wrong. Brain imaging reveals that this 'switch' is related to a sudden boost in a neural signal important for learning, specifically in response to unexpected warning signs, such as faces expressing fear."
          },
          {
            text: "Such neural engineering could have helped prehistoric humans to survive. When our ancestors found themselves surrounded by hungry animals, they would have benefited from an increased ability to learn about hazards. In a safe environment, however, it would have been wasteful to be on high alert constantly. So, a neural switch that automatically increases or decreases our ability to process warnings in response to changes in our environment could have been useful. In fact, people with clinical depression and anxiety seem unable to switch away from a state in which they absorb all the negative messages around them."
          },
          {
            text: "It is also important to realise that stress travels rapidly from one person to the next. If a co-worker is stressed, we are more likely to tense up and feel stressed ourselves. We don't even need to be in the same room with someone for their emotions to influence our behaviour. Studies show that if we observe positive feeds on social media, such as images of a pink sunset, we are more likely to post uplifting messages ourselves. If we observe negative posts, such as complaints about a long queue at the coffee shop, we will in turn create more negative posts."
          },
          {
            text: "In some ways, many of us now live as if we are in danger, constantly ready to tackle demanding emails and text messages, and respond to news alerts and comments on social media. Repeatedly checking your phone, according to a survey conducted by the American Psychological Association, is related to stress. In other words, a pre-programmed physiological reaction, which evolution has equipped us with to help us avoid famished predators, is now being triggered by an online post. Social media posting, according to one study, raises your pulse, makes you sweat, and enlarges your pupils more than most daily activities."
          },
          {
            text: "The fact that stress increases the likelihood that we will focus more on alarming messages, together with the fact that it spreads extremely rapidly, can create collective fear that is not always justified. After a stressful public event, such as a natural disaster or major financial crash, there is often a wave of alarming information in traditional and social media, which individuals become very aware of. But that has the effect of exaggerating existing danger. And so, a reliable pattern emerges — stress is triggered, spreading from one person to the next, which temporarily enhances the likelihood that people will take in negative reports, which increases stress further. As a result, trips are cancelled, even if the disaster took place across the globe; stocks are sold, even when holding on is the best thing to do."
          },
          {
            text: "The good news, however, is that positive emotions, such as hope, are contagious too, and are powerful in inducing people to act to find solutions. Being aware of the close relationship between people's emotional state and how they process information can help us frame our messages more effectively and become conscientious agents of change."
          }
        ],
        questionSections: [
          {
            instruction: "Choose the correct letter, A, B, C or D.",
            type: "mcMatch",
            questions: [
              { num: 27, text: "In the first paragraph, the writer introduces the topic of the text by\nA. defining some commonly used terms.\nB. questioning a widely held assumption.\nC. mentioning a challenge faced by everyone.\nD. specifying a situation which makes us most anxious.", answer: "C" },
              { num: 28, text: "What point does the writer make about firefighters in the second paragraph?\nA. The regular changes of stress levels in their working lives make them ideal study subjects.\nB. The strategies they use to handle stress are of particular interest to researchers.\nC. The stressful nature of their job is typical of many public service professions.\nD. Their personalities make them especially well-suited to working under stress.", answer: "A" },
              { num: 29, text: "What is the writer doing in the fourth paragraph?\nA. explaining their findings\nB. justifying their approach\nC. setting out their objectives\nD. describing their methodology", answer: "D" },
              { num: 30, text: "In the seventh paragraph, the writer describes a mechanism in the brain which\nA. enables people to respond more quickly to stressful situations.\nB. results in increased ability to control our levels of anxiety.\nC. produces heightened sensitivity to indications of external threats.\nD. is activated when there is a need to communicate a sense of danger.", answer: "C" }
            ],
            options: [
              { label: "A", text: "A" }, { label: "B", text: "B" },
              { label: "C", text: "C" }, { label: "D", text: "D" }
            ]
          },
          {
            instruction: "Complete each sentence with the correct ending, A–G, below.",
            type: "mcMatch",
            questions: [
              { num: 31, text: "At times when they were relaxed, the firefighters usually", answer: "B" },
              { num: 32, text: "The researchers noted that when the firefighters were stressed, they", answer: "G" },
              { num: 33, text: "When the firefighters were told good news, they always", answer: "F" },
              { num: 34, text: "The students' cortisol levels and heart rates were affected when the researchers", answer: "E" },
              { num: 35, text: "In both experiments, negative information was processed better when the subjects", answer: "D" }
            ],
            options: [
              { label: "A", text: "made them feel optimistic." },
              { label: "B", text: "took relatively little notice of bad news." },
              { label: "C", text: "responded to negative and positive information in the same way." },
              { label: "D", text: "were feeling under stress." },
              { label: "E", text: "put them in a stressful situation." },
              { label: "F", text: "behaved in a similar manner, regardless of the circumstances." },
              { label: "G", text: "thought it more likely that they would experience something bad." }
            ]
          },
          {
            instruction: "Do the following statements agree with the claims of the writer in Reading Passage 3?\nWrite YES if the statement agrees with the claims of the writer.\nWrite NO if the statement contradicts the claims of the writer.\nWrite NOT GIVEN if it is impossible to say what the writer thinks about this.",
            type: "tfng",
            questions: [
              { num: 36, text: "The tone of the content we post on social media tends to reflect the nature of the posts in our feeds.", answer: "YES" },
              { num: 37, text: "Phones have a greater impact on our stress levels than other electronic media devices.", answer: "NOT GIVEN" },
              { num: 38, text: "The more we read about a stressful public event on social media, the less able we are to take the information in.", answer: "NO" },
              { num: 39, text: "Stress created by social media posts can lead us to take unnecessary precautions.", answer: "YES" },
              { num: 40, text: "Our tendency to be affected by other people's moods can be used in a positive way.", answer: "YES" }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "test3",
    label: "Test 3",
    passages: [
      {
        id: 1,
        title: "Manatees",
        subtitle: "Manatees, also known as sea cows, are aquatic mammals that belong to a group of animals called Sirenia",
        timeGuide: "You should spend about 20 minutes on Questions 1–13",
        questionRange: "Questions 1–13",
        paragraphs: [
          {
            text: "Manatees, also known as sea cows, are aquatic mammals that belong to a group of animals called Sirenia. This group also contains dugongs. Dugongs and manatees look quite alike — they are similar in size, colour and shape, and both have flexible flippers for forelimbs. However, the manatee has a broad, rounded tail, whereas the dugong's is fluked, like that of a whale. There are three species of manatees: The West Indian manatee (Trichechus manatus), the African manatee (Trichechus senegalensis) and the Amazonian manatee (Trichechus inunguis)."
          },
          {
            text: "Unlike most mammals, manatees have only six bones in their neck — most others, including humans and giraffes, have seven. This short neck allows a manatee to move its head up and down, but not side to side. To see something on its left or its right, a manatee must turn its entire body, steering with its flippers. Manatees have pectoral flippers but no back limbs, only a tail for propulsion. They do have pelvic bones, however — a leftover from their evolution from a four-legged to a fully aquatic animal. Manatees share some visual similarities to elephants. Like elephants, manatees have thick, wrinkled skin. They also have some hairs covering their bodies which help them sense vibrations in the water around them."
          },
          {
            text: "Seagrasses and other marine plants make up most of a manatee's diet. Manatees spend about eight hours each day grazing and uprooting plants. They eat up to 15% of their weight in food each day. African manatees are omnivorous — studies have shown that molluscs and fish make up a small part of their diets. West Indian and Amazonian manatees are both herbivores."
          },
          {
            text: "Manatees' teeth are all molars — flat, rounded teeth for grinding food. Due to manatees' abrasive aquatic plant diet, these teeth get worn down and they eventually fall out, so they continually grow new teeth that get pushed forward to replace the ones they lose. Instead of having incisors to grasp their food, manatees have lips which function like a pair of hands to help tear food away from the seafloor."
          },
          {
            text: "Manatees are fully aquatic, but as mammals, they need to come up to the surface to breathe. When awake, they typically surface every two to four minutes, but they can hold their breath for much longer. Adult manatees sleep underwater for 10–12 hours a day, but they come up for air every 15–20 minutes. Active manatees need to breathe more frequently. It's thought that manatees use their muscular diaphragm and breathing to adjust their buoyancy. They may use diaphragm contractions to compress and store gas in folds in their large intestine to help them float."
          },
          {
            text: "The West Indian manatee reaches about 3.5 metres long and weighs on average around 500 kilogrammes. It moves between fresh water and salt water, taking advantage of coastal mangroves and coral reefs, rivers, lakes and inland lagoons. There are two subspecies of West Indian manatee: The Antillean manatee is found in waters from the Bahamas to Brazil, whereas the Florida manatee is found in US waters, although some individuals have been recorded in the Bahamas. In winter, the Florida manatee is typically restricted to Florida. When the ambient water temperature drops below 20°C, it takes refuge in naturally and artificially warmed water, such as at the warm-water outfalls from powerplants."
          },
          {
            text: "The African manatee is also about 3.5 metres long and found in the sea along the west coast of Africa, from Mauritania down to Angola. The species also makes use of rivers, with the mammals seen in landlocked countries such as Mali and Niger."
          },
          {
            text: "The Amazonian manatee is the smallest species, though it is still a big animal. It grows to about 2.5 metres long and 350 kilogrammes. Amazonian manatees favour calm, shallow waters that are above 23°C. This species is found in fresh water in the Amazon Basin in Brazil, as well as in Colombia, Ecuador and Peru."
          },
          {
            text: "All three manatee species are endangered or at a heightened risk of extinction. The African manatee and Amazonian manatee are both listed as Vulnerable by the International Union for Conservation of Nature (IUCN). It is estimated that 140,000 Amazonian manatees were killed between 1935 and 1954 for their meat, fat and skin, with the latter used to make leather. In more recent years, African manatee decline has been tied to incidental capture in fishing nets and hunting. Manatee hunting is now illegal in every country the African species is found in."
          },
          {
            text: "The two subspecies of West Indian manatee are listed as Endangered by the IUCN. Both are also expected to undergo a decline of 20% over the next 40 years. A review of almost 1,800 cases of entanglement in fishing nets and of plastic consumption among marine mammals in US waters from 2009 to 2020 found that at least 700 cases involved manatees. The chief cause of death in Florida manatees is boat strikes. However, laws in certain parts of Florida now limit boat speeds during winter, allowing slow-moving manatees more time to respond."
          }
        ],
        questionSections: [
          {
            instruction: "Complete the notes below.\nChoose ONE WORD AND/OR A NUMBER from the passage for each answer.\n\nManatees",
            type: "fill",
            questions: [
              { num: 1, text: "Appearance: look similar to dugongs, but with a differently shaped __________.", answer: "tail" },
              { num: 2, text: "Movement: need to use their __________ to help to turn their bodies around in order to look sideways.", answer: "flippers" },
              { num: 3, text: "Movement: sense vibrations in the water by means of __________ on their skin.", answer: "hairs", alternateAnswers: ["hair"] },
              { num: 4, text: "Feeding: eat mainly aquatic vegetation, such as __________.", answer: "seagrasses" },
              { num: 5, text: "Feeding: grasp and pull up plants with their __________.", answer: "lips" },
              { num: 6, text: "Breathing: may regulate the __________ of their bodies by using muscles of diaphragm to store air internally.", answer: "buoyancy" }
            ]
          },
          {
            instruction: "Do the following statements agree with the information given in Reading Passage 1?\nWrite TRUE if the statement agrees with the information.\nWrite FALSE if the statement contradicts the information.\nWrite NOT GIVEN if there is no information on this.",
            type: "tfng",
            questions: [
              { num: 7, text: "West Indian manatees can be found in a variety of different aquatic habitats.", answer: "TRUE" },
              { num: 8, text: "The Florida manatee lives in warmer waters than the Antillean manatee.", answer: "NOT GIVEN" },
              { num: 9, text: "The African manatee's range is limited to coastal waters between the West African countries of Mauritania and Angola.", answer: "FALSE" },
              { num: 10, text: "The extent of the loss of Amazonian manatees in the mid-twentieth century was only revealed many years later.", answer: "NOT GIVEN" },
              { num: 11, text: "It is predicted that West Indian manatee populations will fall in the coming decades.", answer: "TRUE" },
              { num: 12, text: "The risk to manatees from entanglement and plastic consumption increased significantly in the period 2009–2020.", answer: "NOT GIVEN" },
              { num: 13, text: "There is some legislation in place which aims to reduce the likelihood of boat strikes on manatees in Florida.", answer: "TRUE" }
            ]
          }
        ]
      },
      {
        id: 2,
        title: "Procrastination",
        subtitle: "A psychologist explains why we put off important tasks and how we can break this habit",
        timeGuide: "You should spend about 20 minutes on Questions 14–26",
        questionRange: "Questions 14–26",
        paragraphs: [
          {
            label: "A",
            text: "Procrastination is the habit of delaying a necessary task, usually by focusing on less urgent, more enjoyable, and easier activities instead. We all do it from time to time. We might be composing a message to a friend who we have to let down, or putting together an important report for college or work; we're doing our best to avoid doing the job at hand, but deep down we know that we should just be getting on with it. Unfortunately, berating ourselves won't stop us procrastinating again. In fact, it's one of the worst things we can do. This matters because, as my research shows, procrastination doesn't just waste time, but is actually linked to other problems, too."
          },
          {
            label: "B",
            text: "Contrary to popular belief, procrastination is not due to laziness or poor time management. Scientific studies suggest procrastination is, in fact, caused by poor mood management. This makes sense if we consider that people are more likely to put off starting or completing tasks that they are really not keen to do. If just thinking about the task threatens our sense of self-worth or makes us anxious, we will be more likely to put it off. Research involving brain imaging has found that areas of the brain linked to detection of threats and emotion regulation are actually different in people who chronically procrastinate compared to those who don't procrastinate frequently."
          },
          {
            label: "C",
            text: "Tasks that are emotionally loaded or difficult, such as preparing for exams, are prime candidates for procrastination. People with low self-esteem are more likely to procrastinate. Another group of people who tend to procrastinate are perfectionists, who worry their work will be judged harshly by others. We know that if we don't finish that report or complete those home repairs, then what we did can't be evaluated. When we avoid such tasks, we also avoid the negative emotions associated with them. This is rewarding, and it conditions us to use procrastination to repair our mood. If we engage in more enjoyable tasks instead, we get another mood boost. In the long run, however, procrastination isn't an effective way of managing emotions. The 'mood repair' we experience is temporary. Afterwards, people tend to be left with a sense of guilt that not only increases their negative mood, but also reinforces their tendency to procrastinate."
          },
          {
            label: "D",
            text: "So why is this such a problem? When most people think of the costs of procrastination, they think of the toll on productivity. For example, studies have shown that procrastination negatively impacts on student performance. But putting off reading textbooks and writing essays may affect other areas of students' lives. In one study of over 3,000 German students over a six-month period, those who reported procrastinating over their university work were also more likely to engage in study-related misconduct, such as cheating and plagiarism. But the behaviour that procrastination was most closely linked with was using fraudulent excuses to get deadline extensions. Other research shows that employees on average spend almost a quarter of their workday procrastinating, and again this is linked with negative outcomes. In fact, in one US survey of over 22,000 employees, participants who said they regularly procrastinated had less annual income and less employment stability. For every one-point increase on a measure of chronic procrastination, annual income decreased by US$15,000."
          },
          {
            label: "E",
            text: "Procrastination also correlates with serious health and well-being problems. A tendency to procrastinate is linked to poor mental health, including higher levels of depression and anxiety. Across numerous studies, I've found people who regularly procrastinate report a greater number of health issues, such as headaches, flu and colds, and digestive issues. They also experience higher levels of stress and poor sleep quality. They are less likely to practise healthy behaviours, such as eating a healthy diet and regularly exercising, and use destructive coping strategies to manage their stress. In one study of over 700 people, I found people prone to procrastination had a 63% greater risk of poor heart health after accounting for other personality traits and demographics."
          },
          {
            label: "F",
            text: "Finding better ways of managing our emotions is one route out of the vicious cycle of procrastination. An important first step is to manage our environment and how we view the task. There are a number of evidence-based strategies that can help us fend off distractions that can occupy our minds when we should be focusing on the thing we should be getting on with. For example, reminding ourselves about why the task is important and valuable can increase positive feelings towards it.\n\nForgiving ourselves and feeling compassion when we procrastinate can help break the procrastination cycle. We should admit that we feel bad, but not be overly critical of ourselves. We should remind ourselves that we're not the first person to procrastinate, nor the last. Doing this can take the edge off the negative feelings we have about ourselves when we procrastinate. This can all make it easier to get back on track."
          }
        ],
        questionSections: [
          {
            instruction: "Reading Passage 2 has six paragraphs, A–F.\nWhich paragraph contains the following information?\nWrite the correct letter, A–F, in boxes 14–16 on your answer sheet.\nNB You may use any letter more than once.",
            type: "mcParagraph",
            questions: [
              { num: 14, text: "mention of false assumptions about why people procrastinate", answer: "B" },
              { num: 15, text: "reference to the realisation that others also procrastinate", answer: "F" },
              { num: 16, text: "neurological evidence of a link between procrastination and emotion", answer: "B" }
            ],
            options: [
              { label: "A", text: "A" }, { label: "B", text: "B" }, { label: "C", text: "C" },
              { label: "D", text: "D" }, { label: "E", text: "E" }, { label: "F", text: "F" }
            ]
          },
          {
            instruction: "Complete the summary below.\nChoose ONE WORD ONLY from the passage for each answer.\n\nWhat makes us procrastinate?",
            type: "fill",
            questions: [
              { num: 17, text: "Many people think that procrastination is the result of __________.", answer: "laziness" },
              { num: 18, text: "The tasks we are most likely to put off are those that could damage our self-esteem or cause us to feel __________ when we think about them.", answer: "anxious" },
              { num: 19, text: "Research comparing chronic procrastinators with other people even found differences in the brain regions associated with regulating emotions and identifying __________.", answer: "threats" },
              { num: 20, text: "Getting ready to take __________ might be a typical example of a task that causes procrastination.", answer: "exams" },
              { num: 21, text: "People who are likely to procrastinate tend to be either __________ or those with low self-esteem.", answer: "perfectionists" },
              { num: 22, text: "Procrastination is only a short-term measure for managing emotions. It's often followed by a feeling of __________, which worsens our mood and leads to more procrastination.", answer: "guilt" }
            ]
          },
          {
            instruction: "Choose TWO letters, A–E.\nWhich TWO comparisons between employees who often procrastinate and those who do not are mentioned in the text?",
            type: "multiSelect",
            questions: [
              { num: 23, text: "A. Their salaries are lower.\nB. The quality of their work is inferior.\nC. They don't keep their jobs for as long.\nD. They don't enjoy their working lives as much.\nE. They have poorer relationships with colleagues.", answer: "A,C" }
            ],
            options: [
              { label: "A", text: "Their salaries are lower." },
              { label: "B", text: "The quality of their work is inferior." },
              { label: "C", text: "They don't keep their jobs for as long." },
              { label: "D", text: "They don't enjoy their working lives as much." },
              { label: "E", text: "They have poorer relationships with colleagues." }
            ]
          },
          {
            instruction: "Choose TWO letters, A–E.\nWhich TWO recommendations for getting out of a cycle of procrastination does the writer give?",
            type: "multiSelect",
            questions: [
              { num: 25, text: "A. not judging ourselves harshly\nB. setting ourselves manageable aims\nC. rewarding ourselves for tasks achieved\nD. prioritising tasks according to their importance\nE. avoiding things that stop us concentrating on our tasks", answer: "A,E" }
            ],
            options: [
              { label: "A", text: "not judging ourselves harshly" },
              { label: "B", text: "setting ourselves manageable aims" },
              { label: "C", text: "rewarding ourselves for tasks achieved" },
              { label: "D", text: "prioritising tasks according to their importance" },
              { label: "E", text: "avoiding things that stop us concentrating on our tasks" }
            ]
          }
        ]
      },
      {
        id: 3,
        title: "Invasion of the Robot Umpires",
        subtitle: "The introduction of the Automated Ball-Strike System (ABS) in baseball and the debate around it",
        timeGuide: "You should spend about 20 minutes on Questions 27–40",
        questionRange: "Questions 27–40",
        paragraphs: [
          {
            text: "A few years ago, Fred DeJesus from Brooklyn, New York became the first umpire in a minor league baseball game to use something called the Automated Ball-Strike System (ABS), often referred to as the 'robo-umpire'. Instead of making any judgments himself about a strike, DeJesus had decisions fed to him through an earpiece, connected to a modified missile-tracking system. The contraption looked like a large black pizza box with one glowing green eye; it was mounted above the press stand."
          },
          {
            text: "Major League Baseball (MLB), who had commissioned the system, wanted human umpires to announce the calls, just as they would have done in the past. When the first pitch came in, a recorded voice told DeJesus it was a strike. Previously, calling a strike was a judgment call on the part of the umpire. Even if the batter does not hit the ball, a pitch that passes through the 'strike zone' (an imaginary zone about seventeen inches wide, stretching from the batter's knees to the middle of his chest) is considered a strike. During that first game, when DeJesus announced calls, there was no heckling and no shouted disagreement. Nobody said a word."
          },
          {
            text: "For a hundred and fifty years or so, the strike zone has been the game's animating force — countless arguments between a team's manager and the umpire have taken place over its boundaries and whether a ball had crossed through it. The rules of play have evolved in various stages. Today, everyone knows that you may scream your disagreement in an umpire's face, but you must never shout personal abuse at them or touch them. That's a no-no. When the robo-umpires came, however, the arguments stopped."
          },
          {
            text: "During the first robo-umpire season, players complained about some strange calls. In response, MLB decided to tweak the dimensions of the zone, and the following year the consensus was that ABS is profoundly consistent. MLB says the device is near-perfect, precise to within fractions of an inch. \"It'll reduce controversy in the game, and be good for the game,\" says Rob Manfred, who is Commissioner for MLB. But the question is whether controversy is worth reducing, or whether it is the sign of a human hand."
          },
          {
            text: "A human, at least, yells back. When I spoke with Frank Viola, a coach for a North Carolina team, he said that ABS works as designed, but that it was also unforgiving and pedantic, almost legalistic. \"Manfred is a lawyer,\" Viola noted. Some pitchers have complained that, compared with a human's, the robot's strike zone seems too precise. Viola was once a major-league player himself. When he was pitching, he explained, umpires rewarded skill. \"Throw it where you aimed, and it would be a strike, even if it was an inch or two outside. There was a dialogue between pitcher and umpire.\""
          },
          {
            text: "The executive tasked with running the experiment for MLB is Morgan Sword, who's in charge of baseball operations. According to Sword, ABS was part of a larger project to make baseball more exciting since executives are terrified of losing younger fans, as has been the case with horse racing and boxing. He explains how they began the process by asking fans what version of baseball they found most exciting. The results showed that everyone wanted more action: more hits, more defense, more baserunning. This type of baseball essentially hasn't existed since the 1960s, when the hundred-mile-an-hour fastball, which is difficult to hit and control, entered the game. It flattened the game into strikeouts, walks, and home runs — a type of play lacking much action."
          },
          {
            text: "Sword's team brainstormed potential fixes. Any rule that existed, they talked about changing — from changing the bats to changing the geometry of the field. But while all of these were ruled out as potential fixes, ABS was seen as a perfect vehicle for change. According to Sword, once you get the technology right, you can load any strike zone you want into the system. \"It might be a triangle, or a blob, or something shaped like Texas. Over time, as baseball evolves, ABS can allow the zone to change with it.\""
          },
          {
            text: "\"In the past twenty years, sports have moved away from judgment calls. Soccer has Video Assistant Referees (for offside decisions, for example). Tennis has Hawk-Eye (for line calls, for example). For almost a decade, baseball has used instant replay on the base paths. This is widely liked, even if the precision can sometimes cause problems. But these applications deal with something physical: bases, lines, goals. The boundaries of action are precise, delineated like the keys of a piano. This is not the case with ABS and the strike zone. Historically, a certain discretion has been appreciated.\""
          },
          {
            text: "I decided to email Alva Noë, a professor at Berkeley University and a baseball fan, for his opinion. \"Hardly a day goes by that I don't wake up and run through the reasons that this [robo-umpires] is such a terrible idea,\" he replied. He later told me, \"This is part of a movement to use algorithms to take the hard choices of living out of life.\" Perhaps he's right. We watch baseball to kill time, not to maximize it. Some players I have met take a dissenting stance toward the robots too, believing that accuracy is not the answer. According to Joe Russo, who plays for a New Jersey team, \"With technology, people just want everything to be perfect. That's not reality. I think perfect would be weird. Your teams are always winning, work is always just great, there's always money in your pocket, your car never breaks down. What is there to talk about?\""
          }
        ],
        questionSections: [
          {
            instruction: "Do the following statements agree with the claims of the writer in Reading Passage 3?\nWrite YES if the statement agrees with the claims of the writer.\nWrite NO if the statement contradicts the claims of the writer.\nWrite NOT GIVEN if it is impossible to say what the writer thinks about this.",
            type: "tfng",
            questions: [
              { num: 27, text: "When DeJesus first used ABS, he shared decision-making about strikes with it.", answer: "NO" },
              { num: 28, text: "MLB considered it necessary to amend the size of the strike zone when criticisms were received from players.", answer: "YES" },
              { num: 29, text: "MLB is keen to justify the money spent on improving the accuracy of ABS's calculations.", answer: "NOT GIVEN" },
              { num: 30, text: "The hundred-mile-an-hour fastball led to a more exciting style of play.", answer: "NO" },
              { num: 31, text: "The differing proposals for alterations to the baseball bat led to fierce debate on Sword's team.", answer: "NOT GIVEN" },
              { num: 32, text: "ABS makes changes to the shape of the strike zone feasible.", answer: "YES" }
            ]
          },
          {
            instruction: "Complete the summary using the list of phrases, A–H, below.\n\nCalls by the umpire",
            type: "mcMatch",
            questions: [
              { num: 33, text: "Even after ABS was developed, MLB still wanted human umpires to shout out decisions as they had in their __________.", answer: "F" },
              { num: 34, text: "The umpire's job had, at one time, required a __________ about whether a ball was a strike.", answer: "D" },
              { num: 35, text: "A ball is considered a strike when the batter does not hit it and it crosses through a __________ extending approximately from the batter's knee to his chest.", answer: "H" },
              { num: 36, text: "In the past, __________ over strike calls were not uncommon.", answer: "B" },
              { num: 37, text: "One difference, however, is that during the first game DeJesus used ABS, strike calls were met with __________.", answer: "G" }
            ],
            options: [
              { label: "A", text: "pitch boundary" },
              { label: "B", text: "numerous disputes" },
              { label: "C", text: "team tactics" },
              { label: "D", text: "subjective assessment" },
              { label: "E", text: "widespread approval" },
              { label: "F", text: "former roles" },
              { label: "G", text: "total silence" },
              { label: "H", text: "perceived area" }
            ]
          },
          {
            instruction: "Choose the correct letter, A, B, C or D.",
            type: "mcMatch",
            questions: [
              { num: 38, text: "What does the writer suggest about ABS in the fifth paragraph?\nA. It is bound to make key decisions that are wrong.\nB. It may reduce some of the appeal of the game.\nC. It will lead to the disappearance of human umpires.\nD. It may increase calls for the rules of baseball to be changed.", answer: "B" },
              { num: 39, text: "Morgan Sword says that the introduction of ABS\nA. was regarded as an experiment without a guaranteed outcome.\nB. was intended to keep up with developments in other sports.\nC. was a response to changing attitudes about the role of sport.\nD. was an attempt to ensure baseball retained a young audience.", answer: "D" },
              { num: 40, text: "Why does the writer include the views of Noë and Russo?\nA. to show that attitudes to technology vary widely\nB. to argue that people have unrealistic expectations of sport\nC. to indicate that accuracy is not the same thing as enjoyment\nD. to suggest that the number of baseball fans needs to increase", answer: "C" }
            ],
            options: [
              { label: "A", text: "A" }, { label: "B", text: "B" },
              { label: "C", text: "C" }, { label: "D", text: "D" }
            ]
          }
        ]
      }
    ]
  }
];

export function calculateBand(correct: number): { band: number; label: string } {
  if (correct >= 39) return { band: 9, label: "Expert" };
  if (correct >= 37) return { band: 8.5, label: "Very Good" };
  if (correct >= 35) return { band: 8, label: "Very Good" };
  if (correct >= 33) return { band: 7.5, label: "Good" };
  if (correct >= 30) return { band: 7, label: "Good" };
  if (correct >= 27) return { band: 6.5, label: "Competent" };
  if (correct >= 23) return { band: 6, label: "Competent" };
  if (correct >= 19) return { band: 5.5, label: "Modest" };
  if (correct >= 15) return { band: 5, label: "Modest" };
  if (correct >= 13) return { band: 4.5, label: "Limited" };
  if (correct >= 10) return { band: 4, label: "Limited" };
  if (correct >= 7) return { band: 3.5, label: "Extremely Limited" };
  if (correct >= 4) return { band: 3, label: "Extremely Limited" };
  if (correct >= 2) return { band: 2.5, label: "Intermittent" };
  if (correct >= 1) return { band: 2, label: "Intermittent" };
  return { band: 0, label: "Did Not Attempt" };
}

export function getRecommendation(band: number): string {
  if (band >= 8) return "Excellent performance! You demonstrate a strong command of reading comprehension. Keep practicing with more challenging academic texts to maintain your edge. Focus on speed and accuracy for test-day confidence.";
  if (band >= 7) return "Great work! You have a good grasp of reading skills. To push higher, practice skimming and scanning techniques, and work on identifying paraphrased information more quickly. Pay close attention to NOT GIVEN vs FALSE distinctions.";
  if (band >= 6) return "You're on the right track! Focus on building your vocabulary, especially academic words. Practice identifying main ideas vs details. Work on time management — try to spend no more than 20 minutes per passage. Read more English newspapers and journals regularly.";
  if (band >= 5) return "Keep working! Focus on understanding paragraph structure and how ideas connect. Practice TRUE/FALSE/NOT GIVEN questions carefully — many students confuse FALSE with NOT GIVEN. Build your vocabulary with word lists and read English content daily for at least 30 minutes.";
  return "Don't give up! Start by reading simpler English texts (news articles, short stories) and gradually increase difficulty. Focus on understanding main ideas before tackling details. Learn key vocabulary and practice basic question types. Consider working with a tutor for targeted guidance.";
}

export function getArabicRecommendation(band: number): string {
  if (band >= 8) return "أداء ممتاز! استمر في التدرب على النصوص الأكاديمية المتقدمة للحفاظ على مستواك العالي.";
  if (band >= 7) return "عمل رائع! ركّز على تقنيات القراءة السريعة وتحديد المعلومات المُعاد صياغتها بشكل أسرع.";
  if (band >= 6) return "أنت على الطريق الصحيح! ركّز على بناء مفرداتك الأكاديمية وإدارة الوقت — لا تتجاوز ٢٠ دقيقة لكل نص.";
  if (band >= 5) return "استمر في العمل! تدرّب على فهم بنية الفقرات وتمييز الفرق بين FALSE و NOT GIVEN. اقرأ محتوى إنجليزي يومياً.";
  return "لا تستسلم! ابدأ بقراءة نصوص إنجليزية بسيطة وزد الصعوبة تدريجياً. تعلّم المفردات الأساسية وتدرّب على أنواع الأسئلة.";
}
