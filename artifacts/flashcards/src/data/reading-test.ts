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
  },
  {
    id: "test4",
    label: "Test 4",
    passages: [
      {
        id: 1,
        title: "The Rise of Vertical Forests",
        subtitle: "How sustainable architecture and urban greening are transforming city skylines around the world",
        timeGuide: "You should spend about 20 minutes on Questions 1–13",
        questionRange: "Questions 1–13",
        paragraphs: [
          {
            label: "A",
            text: "In 2014, two residential towers in Milan, Italy, became the subject of international fascination. Known collectively as the Bosco Verticale, or Vertical Forest, the buildings were the brainchild of Italian architect Stefano Boeri. The concept was deceptively simple yet profoundly ambitious: to integrate dense vegetation into the fabric of high-rise architecture. Each tower was designed to accommodate approximately 900 trees, along with over 20,000 smaller plants and shrubs distributed across cantilevered balconies on every floor. The result was a pair of structures that appeared to be draped in a living green mantle, a startling contrast to the steel and glass that dominate most modern cityscapes. Boeri described his vision as an attempt to create a building that could function as an extension of the natural environment rather than a replacement for it."
          },
          {
            label: "B",
            text: "The idea for the Vertical Forest emerged from Boeri's observations during a visit to Dubai in the mid-2000s. He noted that the city's rapid vertical expansion had produced impressive feats of engineering but left little room for nature. Boeri began to wonder whether trees could be incorporated directly into the design of tall buildings, creating what he called a form of biological architecture. Initial sketches were met with scepticism from structural engineers, who questioned whether balconies could support the weight of mature trees exposed to strong winds at height. Extensive wind-tunnel testing and collaboration with botanists eventually demonstrated that carefully selected species with flexible trunks and compact root systems could thrive in elevated positions, provided that adequate irrigation systems were installed."
          },
          {
            label: "C",
            text: "One of the most frequently cited benefits of vertical forests is their capacity to improve urban air quality. Trees and plants absorb carbon dioxide and release oxygen through photosynthesis, a process that is well understood. However, urban vegetation also captures fine particulate matter, including dust and pollutants generated by traffic and industry, on the surface of its leaves. Research conducted by the Politecnico di Milano estimated that the Bosco Verticale absorbs approximately 30 tonnes of carbon dioxide per year and filters a significant quantity of airborne particulates. Additionally, the vegetation acts as a natural sound barrier, reducing noise pollution for residents by several decibels compared to conventional buildings of similar height and location."
          },
          {
            label: "D",
            text: "Beyond air quality, vertical forests contribute to urban biodiversity in ways that conventional green spaces often cannot. The varied plant species selected for the Bosco Verticale were chosen not only for their aesthetic appeal but also for their ecological value. The trees and shrubs attract insects, birds and small mammals, effectively creating a vertical habitat corridor in the heart of a densely built environment. Ornithologists have documented the nesting of several bird species on the towers, including kestrels and various songbirds that had previously been absent from central Milan. This ecological enrichment challenges the assumption that biodiversity conservation is incompatible with high-density urban living."
          },
          {
            label: "E",
            text: "Despite these advantages, the vertical forest model faces significant practical and economic challenges. The initial construction cost of the Bosco Verticale was substantially higher than that of a comparable conventional tower, owing to the reinforced balcony structures, specialised irrigation networks and the logistics of transporting and installing large trees at height. Ongoing maintenance is also demanding: a team of qualified arborists, sometimes referred to as flying gardeners, must abseil down the facades several times a year to prune, inspect and treat the vegetation. Water consumption, although managed through a grey-water recycling system, remains a concern in regions prone to drought. Critics have also pointed out that the model is inherently suited to luxury residential developments, raising questions about whether its environmental benefits can realistically be extended to affordable housing."
          },
          {
            label: "F",
            text: "Nevertheless, the Bosco Verticale has inspired a wave of similar projects across the globe. Boeri's own firm has developed proposals for vertical forests in cities including Nanjing, Eindhoven, Tirana and Cairo. In Liuzhou, China, an entire Forest City has been planned, comprising dozens of plant-covered buildings designed to house approximately 30,000 residents. Other architects have adapted the concept to different climates and cultural contexts. In Singapore, where vertical greenery has long been encouraged through planning regulations, several residential and commercial buildings now feature extensive planted facades. In Medellín, Colombia, a network of green corridors connecting forested hillsides to urban centres has drawn on principles similar to those underlying the vertical forest concept. While the long-term ecological and economic viability of such projects remains to be fully demonstrated, the movement represents a significant shift in how architects and urban planners conceive the relationship between built environments and the natural world."
          }
        ],
        questionSections: [
          {
            instruction: "Complete the sentences below.\nChoose NO MORE THAN TWO WORDS from the passage for each answer.",
            type: "fill",
            questions: [
              { num: 1, text: "Stefano Boeri wanted to create buildings that would serve as an extension of the __________ rather than a substitute for it.", answer: "natural environment" },
              { num: 2, text: "Engineers initially doubted whether balconies could bear the weight of trees subjected to strong __________ at height.", answer: "winds" },
              { num: 3, text: "Research showed that the Bosco Verticale absorbs around 30 tonnes of __________ annually.", answer: "carbon dioxide" },
              { num: 4, text: "The ongoing care of the vegetation requires qualified __________ to descend the building facades.", answer: "arborists" },
              { num: 5, text: "In Liuzhou, China, an entire __________ has been planned with dozens of plant-covered buildings.", answer: "Forest City" }
            ]
          },
          {
            instruction: "Do the following statements agree with the information given in Reading Passage 1?\nWrite TRUE if the statement agrees with the information.\nWrite FALSE if the statement contradicts the information.\nWrite NOT GIVEN if there is no information on this.",
            type: "tfng",
            questions: [
              { num: 6, text: "The Bosco Verticale was the first building in the world to feature trees on its balconies.", answer: "NOT GIVEN" },
              { num: 7, text: "The vegetation on the Bosco Verticale helps to reduce noise levels for people living in the building.", answer: "TRUE" },
              { num: 8, text: "Kestrels had been commonly seen in central Milan before the Bosco Verticale was built.", answer: "FALSE" },
              { num: 9, text: "The grey-water recycling system on the Bosco Verticale has eliminated all concerns about water use.", answer: "FALSE" }
            ]
          },
          {
            instruction: "Reading Passage 1 has six paragraphs, A–F.\nWhich paragraph contains the following information?\nWrite the correct letter, A–F, in boxes 10–13 on your answer sheet.",
            type: "mcParagraph",
            questions: [
              { num: 10, text: "examples of how the vertical forest concept has been adopted in various countries", answer: "F" },
              { num: 11, text: "details of the financial and logistical difficulties associated with vertical forests", answer: "E" },
              { num: 12, text: "a description of the process used to test whether trees could survive on tall buildings", answer: "B" },
              { num: 13, text: "evidence that the vertical forest has attracted wildlife not previously found in the area", answer: "D" }
            ],
            options: [
              { label: "A", text: "A" }, { label: "B", text: "B" }, { label: "C", text: "C" },
              { label: "D", text: "D" }, { label: "E", text: "E" }, { label: "F", text: "F" }
            ]
          }
        ]
      },
      {
        id: 2,
        title: "Sleep and Memory Consolidation",
        subtitle: "What neuroscience research reveals about the critical role sleep plays in learning and memory formation",
        timeGuide: "You should spend about 20 minutes on Questions 14–26",
        questionRange: "Questions 14–26",
        paragraphs: [
          {
            text: "Sleep has long been recognised as essential to physical health, but it is only in recent decades that scientists have begun to understand its equally vital role in cognitive function, particularly in the consolidation of memory. Memory consolidation refers to the process by which newly acquired information is stabilised and integrated into long-term storage. Without adequate sleep, this process is significantly impaired, leading to poorer recall and reduced learning efficiency. The relationship between sleep and memory has become one of the most active areas of neuroscience research, with implications that extend from clinical medicine to educational policy."
          },
          {
            text: "Human sleep is not a uniform state but is composed of distinct stages that cycle throughout the night. These stages are broadly divided into two categories: non-rapid eye movement (NREM) sleep and rapid eye movement (REM) sleep. NREM sleep is further subdivided into three stages, with the deepest stage, known as slow-wave sleep, characterised by high-amplitude, low-frequency brain oscillations. REM sleep, by contrast, is marked by rapid eye movements, muscle atonia and brain activity patterns that closely resemble those observed during wakefulness. A typical night's sleep consists of four to five cycles, each lasting approximately 90 minutes, with the proportion of REM sleep increasing in later cycles."
          },
          {
            text: "Research has established that different types of memory are preferentially consolidated during different stages of sleep. Declarative memories, which encompass factual knowledge and the recollection of personal experiences, appear to benefit most from slow-wave sleep. During this stage, the hippocampus, a brain region critical for the initial encoding of new memories, replays recently acquired information, transferring it to the neocortex for long-term storage. This replay process has been observed in both animal and human studies using electroencephalography and functional magnetic resonance imaging. Procedural memories, such as motor skills and learned sequences of actions, are more strongly associated with REM sleep and the lighter stages of NREM sleep."
          },
          {
            text: "A landmark study conducted by researchers at Harvard University demonstrated the importance of sleep for memory in a particularly compelling way. Participants were trained on a visual discrimination task and then tested at various intervals. Those who were allowed to sleep between training and testing showed significant improvements in performance, whereas those who remained awake for an equivalent period did not. Crucially, the benefit of sleep was specific to the stages of sleep obtained: participants who were deprived of REM sleep showed impaired performance on the task, while those deprived of slow-wave sleep did not. This finding provided strong evidence that REM sleep plays a selective role in the consolidation of certain types of learning."
          },
          {
            text: "Subsequent research by Dr Matthew Walker at the University of California, Berkeley, has expanded our understanding of how sleep deprivation affects memory. Walker's experiments showed that even a single night of sleep loss can reduce the hippocampus's capacity to encode new information by as much as 40 per cent. In one study, participants who had been awake for 36 hours were asked to memorise a list of facts. Compared with a well-rested control group, the sleep-deprived participants recalled significantly fewer items and were more likely to form false memories, incorrectly believing they had learned information that had not been presented. Walker has described sleep as performing a filing function for the brain, sorting and storing the experiences of the day."
          },
          {
            text: "Professor Jessica Payne at the University of Notre Dame has investigated the relationship between sleep and emotional memory. Her research indicates that sleep preferentially consolidates memories with emotional significance, particularly those associated with negative emotions. In experiments where participants viewed images with varying emotional content before sleeping, Payne found that recall for emotionally charged images was enhanced after sleep, while recall for neutral images remained unchanged. This selective consolidation may have evolutionary advantages, ensuring that information relevant to survival, such as the location of threats, is retained more effectively."
          },
          {
            text: "The implications of this research for education are considerable. Studies have shown that students who obtain sufficient sleep perform better on examinations, demonstrate greater creativity in problem-solving tasks and exhibit improved attention in classroom settings. Despite this evidence, school start times in many countries remain early, often conflicting with the natural circadian rhythms of adolescents, whose biological clocks tend to shift towards later sleep and wake times during puberty. Several school districts in the United States have experimented with delayed start times, reporting improvements in both academic performance and student wellbeing. Researchers have also emphasised the value of napping as a tool for memory consolidation, with studies suggesting that even short naps of 20 to 30 minutes can enhance learning when taken shortly after the acquisition of new material."
          }
        ],
        questionSections: [
          {
            instruction: "Complete the notes below.\nChoose ONE WORD ONLY from the passage for each answer.\n\nSleep and Memory",
            type: "fill",
            questions: [
              { num: 14, text: "Memory consolidation is the process of stabilising new information into long-term __________.", answer: "storage" },
              { num: 15, text: "The deepest stage of NREM sleep is called __________ sleep.", answer: "slow-wave" },
              { num: 16, text: "During slow-wave sleep, the hippocampus __________ recently learned information.", answer: "replays" },
              { num: 17, text: "Procedural memories, such as motor skills, are linked to __________ sleep.", answer: "REM" },
              { num: 18, text: "Walker described sleep as performing a __________ function for the brain.", answer: "filing" },
              { num: 19, text: "Short __________ of 20–30 minutes can improve learning after new material is studied.", answer: "naps" }
            ]
          },
          {
            instruction: "Look at the following findings (Questions 20–22) and the list of researchers below.\nMatch each finding with the correct researcher, A–G.\nWrite the correct letter, A–G, in boxes 20–22 on your answer sheet.",
            type: "mcMatch",
            questions: [
              { num: 20, text: "Sleep-deprived people may develop memories of events that did not actually occur.", answer: "C" },
              { num: 21, text: "Depriving participants of a specific sleep stage impaired performance on a visual task.", answer: "A" },
              { num: 22, text: "Sleep strengthens memories of emotionally significant experiences more than neutral ones.", answer: "D" }
            ],
            options: [
              { label: "A", text: "Harvard University researchers" },
              { label: "B", text: "Politecnico di Milano researchers" },
              { label: "C", text: "Dr Matthew Walker" },
              { label: "D", text: "Professor Jessica Payne" },
              { label: "E", text: "University of Notre Dame students" },
              { label: "F", text: "US school district administrators" },
              { label: "G", text: "electroencephalography researchers" }
            ]
          },
          {
            instruction: "Do the following statements agree with the claims of the writer in Reading Passage 2?\nWrite YES if the statement agrees with the claims of the writer.\nWrite NO if the statement contradicts the claims of the writer.\nWrite NOT GIVEN if it is impossible to say what the writer thinks about this.",
            type: "tfng",
            questions: [
              { num: 23, text: "The proportion of REM sleep remains constant throughout the night.", answer: "NO" },
              { num: 24, text: "One night without sleep can reduce the brain's ability to take in new information by nearly half.", answer: "YES" },
              { num: 25, text: "The selective consolidation of emotional memories may have developed as a survival mechanism.", answer: "YES" },
              { num: 26, text: "All schools that adopted later start times saw improvements in student grades.", answer: "NOT GIVEN" }
            ]
          }
        ]
      },
      {
        id: 3,
        title: "The Economics of Happiness",
        subtitle: "How researchers and governments are rethinking the measurement of national wellbeing beyond traditional economic indicators",
        timeGuide: "You should spend about 20 minutes on Questions 27–40",
        questionRange: "Questions 27–40",
        paragraphs: [
          {
            text: "For much of the twentieth century, gross domestic product (GDP) served as the primary measure of a nation's success. Governments, international organisations and financial institutions used GDP growth as the definitive indicator of progress, assuming that rising economic output would translate into improved quality of life for citizens. This assumption, however, has come under increasing scrutiny. Critics argue that GDP measures only the total monetary value of goods and services produced within a country and fails to account for factors such as income distribution, environmental sustainability, social cohesion and individual wellbeing. The search for alternative indicators has given rise to a growing field sometimes referred to as the economics of happiness."
          },
          {
            text: "The intellectual origins of this field can be traced to a seminal paper published in 1974 by the American economist Richard Easterlin. Analysing data from multiple countries over several decades, Easterlin observed a striking paradox: while average incomes in wealthy nations had risen substantially since the Second World War, reported levels of happiness had remained largely flat. This finding, which became known as the Easterlin Paradox, challenged the prevailing economic orthodoxy that higher income necessarily leads to greater subjective wellbeing. Easterlin proposed that once basic material needs are met, additional income yields diminishing returns in terms of happiness, and that relative income — how one's earnings compare with those of others — matters more than absolute income."
          },
          {
            text: "One of the most ambitious attempts to move beyond GDP as a measure of national progress originated in the small Himalayan kingdom of Bhutan. In 1972, the fourth King of Bhutan, Jigme Singye Wangchuck, declared that Gross National Happiness (GNH) was more important than Gross National Product. The GNH framework encompasses nine domains, including psychological wellbeing, health, education, time use, cultural resilience, good governance, community vitality, ecological diversity and living standards. Surveys conducted by Bhutan's Centre for Bhutan Studies assess citizens' satisfaction across these domains, producing a composite index that informs government policy. While the concept has been praised for its holistic approach, some economists have questioned the reliability and comparability of its subjective measures."
          },
          {
            text: "In Europe, the Nordic countries — Denmark, Finland, Norway, Sweden and Iceland — consistently rank among the happiest nations in global surveys such as the World Happiness Report, published annually by the United Nations Sustainable Development Solutions Network. Researchers attribute this to a combination of factors including strong social safety nets, high levels of trust in government and fellow citizens, low levels of corruption, universal access to healthcare and education, and a cultural emphasis on work-life balance. The Nordic model demonstrates that national happiness is closely associated with institutional quality and social equality, rather than simply with wealth."
          },
          {
            text: "Measuring happiness, however, presents formidable methodological challenges. Subjective wellbeing is typically assessed through self-report surveys in which respondents rate their life satisfaction on a numerical scale. Critics point out that such responses are influenced by cultural norms, question framing, momentary mood and social desirability bias. A person's reported happiness on a given day may be affected by factors as trivial as the weather or a recent conversation. Cross-cultural comparisons are further complicated by linguistic differences in the interpretation of key terms such as happiness, satisfaction and wellbeing. Some researchers have advocated supplementing survey data with objective indicators, such as levels of social participation, access to green spaces and prevalence of mental health disorders."
          },
          {
            text: "Despite these difficulties, the movement to incorporate wellbeing metrics into public policy has gained considerable momentum. In 2010, the United Kingdom established the Office for National Statistics Measuring National Well-being programme, which tracks life satisfaction, anxiety levels and perceptions of life's worthwhileness alongside conventional economic data. New Zealand's Treasury introduced a Living Standards Framework that evaluates policy proposals against criteria including social capital, human capability and environmental quality. In 2019, New Zealand became one of the first countries to produce a national Wellbeing Budget, allocating resources according to priorities identified through wellbeing analysis rather than purely economic considerations."
          },
          {
            text: "The relationship between economic policy and happiness is not straightforward, however. While redistributive policies that reduce inequality tend to be associated with higher average happiness, excessive taxation can discourage enterprise and innovation, potentially reducing overall prosperity. Similarly, environmental regulations that protect natural resources and public health may impose short-term economic costs on particular industries. Policymakers must therefore navigate complex trade-offs, balancing the immediate demands of economic growth against the longer-term imperatives of social and environmental sustainability. The challenge is further compounded by the difficulty of establishing causal relationships between specific policies and changes in subjective wellbeing."
          },
          {
            text: "Looking ahead, advances in data science and behavioural economics offer new possibilities for understanding and promoting happiness. Large-scale analysis of social media posts, mobile phone usage patterns and wearable device data may provide real-time insights into population-level mood and wellbeing, supplementing traditional survey methods. Meanwhile, randomised controlled trials of happiness interventions, such as gratitude exercises, mindfulness programmes and community-building initiatives, are generating evidence on what works at the individual and group level. Whether governments will embrace these tools and the broader happiness agenda remains an open question, but the growing consensus among researchers is that the pursuit of wellbeing, rather than wealth alone, should be a central objective of public policy."
          }
        ],
        questionSections: [
          {
            instruction: "Do the following statements agree with the claims of the writer in Reading Passage 3?\nWrite YES if the statement agrees with the claims of the writer.\nWrite NO if the statement contradicts the claims of the writer.\nWrite NOT GIVEN if it is impossible to say what the writer thinks about this.",
            type: "tfng",
            questions: [
              { num: 27, text: "GDP is an adequate measure of a nation's overall quality of life.", answer: "NO" },
              { num: 28, text: "Easterlin found that increases in national income always led to corresponding increases in happiness.", answer: "NO" },
              { num: 29, text: "Bhutan's GNH framework has been universally accepted as superior to GDP.", answer: "NO" },
              { num: 30, text: "The Nordic countries' high happiness levels are primarily due to their natural resources.", answer: "NO" },
              { num: 31, text: "Self-report surveys of happiness can be affected by temporary factors such as the weather.", answer: "YES" },
              { num: 32, text: "New Zealand was the first country to allocate its entire national budget based on wellbeing criteria.", answer: "NOT GIVEN" }
            ]
          },
          {
            instruction: "Complete the summary using the list of phrases, A–H, below.\n\nMeasuring and promoting happiness",
            type: "mcMatch",
            questions: [
              { num: 33, text: "Easterlin observed that after basic needs are satisfied, more income produces __________ in happiness.", answer: "E" },
              { num: 34, text: "Bhutan's GNH index is compiled from surveys that assess __________ across nine areas.", answer: "A" },
              { num: 35, text: "The Nordic model shows that happiness correlates more with __________ than with national wealth.", answer: "G" },
              { num: 36, text: "The UK's well-being programme measures __________ together with standard economic statistics.", answer: "C" },
              { num: 37, text: "Policymakers face the difficulty of proving __________ between individual policies and wellbeing changes.", answer: "F" }
            ],
            options: [
              { label: "A", text: "citizens' satisfaction" },
              { label: "B", text: "economic productivity" },
              { label: "C", text: "life satisfaction and anxiety" },
              { label: "D", text: "population growth rates" },
              { label: "E", text: "diminishing returns" },
              { label: "F", text: "causal relationships" },
              { label: "G", text: "institutional quality and equality" },
              { label: "H", text: "cultural diversity" }
            ]
          },
          {
            instruction: "Choose the correct letter, A, B, C or D.",
            type: "mcMatch",
            questions: [
              { num: 38, text: "What is the main purpose of the passage?\nA. to argue that GDP should be abolished as an economic measure\nB. to examine efforts to measure and promote national wellbeing beyond GDP\nC. to prove that wealthy countries are always the happiest\nD. to compare the economic systems of Bhutan and the Nordic countries", answer: "B" },
              { num: 39, text: "According to the passage, what is a key limitation of using surveys to measure happiness?\nA. Surveys are too expensive to conduct on a large scale.\nB. People in different countries interpret happiness-related terms differently.\nC. Survey results consistently favour wealthier respondents.\nD. Governments refuse to act on survey findings.", answer: "B" },
              { num: 40, text: "What does the writer suggest about the future of happiness research?\nA. It will be entirely replaced by artificial intelligence.\nB. It is unlikely to influence government policy.\nC. New data sources and experiments may enhance our understanding of wellbeing.\nD. It will focus exclusively on individual-level interventions.", answer: "C" }
            ],
            options: [
              { label: "A", text: "A" }, { label: "B", text: "B" },
              { label: "C", text: "C" }, { label: "D", text: "D" }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "test5",
    label: "Test 5",
    passages: [
      {
        id: 1,
        title: "The Science of Soil",
        subtitle: "Why soil health is fundamental to global food security and environmental sustainability",
        timeGuide: "You should spend about 20 minutes on Questions 1–13",
        questionRange: "Questions 1–13",
        paragraphs: [
          {
            label: "A",
            text: "Beneath our feet lies one of the most complex and least understood ecosystems on the planet. Soil is far more than inert dirt; it is a dynamic mixture of minerals, organic matter, water, air and an astonishing diversity of living organisms. A single teaspoon of healthy soil may contain up to one billion bacteria, several metres of fungal filaments and thousands of protozoa and nematodes. These organisms interact in intricate food webs that drive the decomposition of organic material, the cycling of essential nutrients such as nitrogen and phosphorus, and the formation of soil structure. Without these biological processes, terrestrial plant life as we know it would be impossible, and the agricultural systems that feed the global population of over 8 billion people would collapse."
          },
          {
            label: "B",
            text: "The soil microbiome, a term borrowed from medical science to describe the community of microorganisms inhabiting soil, has become a major focus of research in recent years. Advances in DNA sequencing technology have allowed scientists to identify and catalogue soil organisms with unprecedented precision. Studies have revealed that the diversity of soil microbial communities rivals that of tropical rainforests, yet the vast majority of soil species remain unclassified. Mycorrhizal fungi, which form symbiotic relationships with the roots of approximately 90 per cent of all plant species, are among the best-studied soil organisms. These fungi extend the effective root area of plants, enhancing their ability to absorb water and nutrients, particularly phosphorus. In return, the plant provides the fungus with sugars produced through photosynthesis."
          },
          {
            label: "C",
            text: "Despite its critical importance, soil is being degraded at an alarming rate worldwide. The United Nations Food and Agriculture Organization (FAO) estimates that roughly 33 per cent of global soils are moderately to highly degraded, primarily as a result of erosion, nutrient depletion, compaction, salinisation and contamination. Intensive agricultural practices, including excessive tillage, monoculture cropping and heavy reliance on synthetic fertilisers and pesticides, have been identified as leading causes of soil degradation. Tillage, in particular, disrupts soil structure, exposes organic matter to rapid oxidation and accelerates erosion by wind and water. It is estimated that the world loses approximately 24 billion tonnes of fertile topsoil each year, a rate that far exceeds the natural pace of soil formation, which typically requires several hundred years to produce a single centimetre of new soil."
          },
          {
            label: "D",
            text: "In response to these challenges, a growing movement of farmers and researchers is advocating for regenerative agriculture, an approach that seeks to restore and enhance soil health rather than merely sustain it. Core practices include minimal or no tillage, the use of cover crops to protect and nourish the soil between harvests, diversified crop rotations that break pest and disease cycles, and the integration of livestock grazing to recycle nutrients naturally. Proponents argue that regenerative methods not only improve soil fertility and water retention but also reduce the need for costly chemical inputs, thereby increasing farm profitability over time. A landmark study published in the journal Nature Food found that farms practising regenerative techniques for more than five years achieved yields comparable to those of conventional farms while spending 50 per cent less on fertiliser and pesticide inputs."
          },
          {
            label: "E",
            text: "Perhaps the most compelling argument for soil restoration lies in its potential contribution to climate change mitigation. Soils constitute the largest terrestrial carbon reservoir, storing an estimated 2,500 gigatonnes of carbon globally — more than three times the amount held in the atmosphere and four times the amount stored in all living vegetation. When soils are degraded through deforestation, drainage of wetlands or intensive farming, this stored carbon is released into the atmosphere as carbon dioxide, contributing to global warming. Conversely, practices that increase soil organic matter, such as composting, agroforestry and the application of biochar, can draw carbon dioxide out of the atmosphere and lock it into the soil in a process known as carbon sequestration. Some scientists estimate that improved soil management could offset as much as 10 per cent of current annual greenhouse gas emissions."
          },
          {
            label: "F",
            text: "The challenge of scaling up soil restoration is considerable. Farmers in many developing countries lack access to the technical knowledge, financial resources and market incentives needed to transition away from conventional practices. Government subsidies in numerous nations continue to favour large-scale monoculture production over diversified, soil-friendly farming systems. Moreover, the benefits of regenerative agriculture often take several years to materialise, creating a period of financial uncertainty that smallholders may be unable to absorb. International initiatives such as the 4 per 1000 programme, launched at the Paris Climate Conference in 2015, aim to increase global soil carbon stocks by 0.4 per cent per year through changes in agricultural practice. Achieving this target would require coordinated action across governments, research institutions, the private sector and farming communities worldwide."
          }
        ],
        questionSections: [
          {
            instruction: "Complete the sentences below.\nChoose NO MORE THAN TWO WORDS AND/OR A NUMBER from the passage for each answer.",
            type: "fill",
            questions: [
              { num: 1, text: "A single teaspoon of healthy soil can contain as many as __________ bacteria.", answer: "one billion", alternateAnswers: ["1 billion"] },
              { num: 2, text: "Mycorrhizal fungi form symbiotic associations with the roots of about __________ of all plant species.", answer: "90 per cent", alternateAnswers: ["90 percent", "90%"] },
              { num: 3, text: "Each year, the world loses around __________ of fertile topsoil.", answer: "24 billion tonnes" },
              { num: 4, text: "Soils store approximately __________ of carbon globally, making them the largest land-based carbon reservoir.", answer: "2,500 gigatonnes" }
            ]
          },
          {
            instruction: "Do the following statements agree with the information given in Reading Passage 1?\nWrite TRUE if the statement agrees with the information.\nWrite FALSE if the statement contradicts the information.\nWrite NOT GIVEN if there is no information on this.",
            type: "tfng",
            questions: [
              { num: 5, text: "The majority of soil microorganism species have already been identified and classified.", answer: "FALSE" },
              { num: 6, text: "Excessive tillage helps to preserve organic matter in the soil.", answer: "FALSE" },
              { num: 7, text: "Regenerative farms studied in Nature Food produced lower yields than conventional farms.", answer: "FALSE" },
              { num: 8, text: "Biochar application is one method that can help lock carbon into the soil.", answer: "TRUE" },
              { num: 9, text: "The 4 per 1000 programme was established before the Paris Climate Conference.", answer: "FALSE" }
            ]
          },
          {
            instruction: "Reading Passage 1 has six paragraphs, A–F.\nWhich paragraph contains the following information?\nWrite the correct letter, A–F, in boxes 10–13 on your answer sheet.",
            type: "mcParagraph",
            questions: [
              { num: 10, text: "a description of the obstacles to widespread adoption of soil-friendly farming", answer: "F" },
              { num: 11, text: "statistics illustrating the rate at which soil is being lost globally", answer: "C" },
              { num: 12, text: "an explanation of how fungi assist plants in obtaining nutrients", answer: "B" },
              { num: 13, text: "details of farming methods designed to improve rather than merely maintain soil quality", answer: "D" }
            ],
            options: [
              { label: "A", text: "A" }, { label: "B", text: "B" }, { label: "C", text: "C" },
              { label: "D", text: "D" }, { label: "E", text: "E" }, { label: "F", text: "F" }
            ]
          }
        ]
      },
      {
        id: 2,
        title: "Artificial Intelligence in Healthcare",
        subtitle: "The promise and ethical challenges of AI-driven diagnostics and medical decision-making",
        timeGuide: "You should spend about 20 minutes on Questions 14–26",
        questionRange: "Questions 14–26",
        paragraphs: [
          {
            text: "Artificial intelligence is transforming the landscape of modern healthcare at a pace that few predicted even a decade ago. Among the most prominent applications is medical image recognition, where deep learning algorithms analyse radiological scans, pathology slides and retinal photographs to detect diseases such as cancer, diabetic retinopathy and cardiovascular conditions. In several peer-reviewed studies, AI systems have matched or exceeded the diagnostic accuracy of experienced clinicians. Researchers at Stanford University developed a neural network capable of classifying skin lesions with a level of accuracy comparable to that of board-certified dermatologists, a finding that attracted widespread attention when published in the journal Nature in 2017."
          },
          {
            text: "Beyond diagnostics, AI is accelerating the process of drug discovery, traditionally one of the most time-consuming and expensive stages of pharmaceutical development. Conventional drug development can take over a decade and cost billions of dollars, with a high failure rate at each stage of clinical trials. Machine learning models can now screen millions of potential molecular compounds in a fraction of the time previously required, identifying candidates most likely to interact effectively with biological targets. In 2020, the British AI company DeepMind made a breakthrough in protein structure prediction with its AlphaFold system, solving a problem that had eluded scientists for 50 years and opening new avenues for drug design."
          },
          {
            text: "Predictive analytics represents another frontier for AI in healthcare. By analysing vast quantities of electronic health records, wearable device data and genomic information, algorithms can identify patients at elevated risk of developing conditions such as sepsis, heart failure or type 2 diabetes before clinical symptoms manifest. Researchers at Mount Sinai Hospital in New York developed a deep learning system called Deep Patient, which was trained on the medical records of approximately 700,000 individuals and proved capable of predicting the onset of diseases including liver cancer and schizophrenia with notable accuracy. Such tools have the potential to shift healthcare from a reactive model, in which diseases are treated after onset, to a preventive model focused on early intervention."
          },
          {
            text: "However, the deployment of AI in clinical settings raises serious ethical concerns, foremost among which is the issue of algorithmic bias. AI systems learn from historical data, and if that data reflects existing disparities in healthcare access, diagnosis or treatment, the resulting algorithms may perpetuate or even amplify those inequalities. A widely cited study published by researchers at the University of California, Berkeley, found that a commercial algorithm used by major US hospitals to allocate healthcare resources systematically underestimated the needs of Black patients compared with white patients of equivalent health status. The bias arose because the algorithm used healthcare spending as a proxy for health needs, and historically lower spending on Black patients led the system to assign them lower risk scores."
          },
          {
            text: "The question of regulatory oversight is equally pressing. Medical devices and pharmaceutical products are subject to rigorous approval processes overseen by agencies such as the US Food and Drug Administration (FDA) and the European Medicines Agency (EMA). AI-based diagnostic tools, however, occupy an uncertain regulatory space. Unlike a conventional drug, whose chemical composition remains fixed after approval, a machine learning model may continue to evolve as it is exposed to new data, potentially altering its performance characteristics over time. The FDA has responded by developing a new framework for the regulation of AI and machine learning-based software as a medical device, but critics argue that existing regulatory structures are insufficiently agile to keep pace with the speed of technological change."
          },
          {
            text: "Patient trust constitutes another significant barrier to the widespread adoption of AI in healthcare. Surveys conducted across multiple countries indicate that while patients are generally receptive to AI being used as a support tool for clinicians, many express discomfort with the idea of decisions about their care being made solely by an algorithm. Transparency is a key concern: many state-of-the-art AI models operate as so-called black boxes, producing outputs without providing an interpretable explanation of how those outputs were reached. Professor Luciano Floridi of the Oxford Internet Institute has argued that the opacity of AI decision-making processes is fundamentally incompatible with the principles of informed consent that underpin modern medical ethics."
          },
          {
            text: "Despite these challenges, the integration of AI into healthcare systems appears inevitable and, if managed responsibly, holds the promise of significant benefits. Dr Eric Topol, director of the Scripps Research Translational Institute, has argued that AI will not replace physicians but will instead augment their capabilities, freeing them from routine tasks and allowing more time for the human dimensions of care: empathy, communication and shared decision-making. Achieving this vision will require investment in diverse and representative training datasets, robust regulatory frameworks, interdisciplinary collaboration between technologists and clinicians, and sustained public engagement to build the trust on which effective healthcare ultimately depends."
          }
        ],
        questionSections: [
          {
            instruction: "Look at the following statements (Questions 14–18) and the list of researchers/institutions below.\nMatch each statement with the correct researcher or institution, A–G.\nWrite the correct letter, A–G, in boxes 14–18 on your answer sheet.",
            type: "mcMatch",
            questions: [
              { num: 14, text: "Created an AI system that predicted disease onset by learning from hundreds of thousands of patient records.", answer: "C" },
              { num: 15, text: "Demonstrated that an AI tool for resource allocation disadvantaged certain patient groups.", answer: "D" },
              { num: 16, text: "Developed an AI model that identified skin conditions as accurately as specialist doctors.", answer: "A" },
              { num: 17, text: "Suggested that the lack of transparency in AI conflicts with principles of medical ethics.", answer: "F" },
              { num: 18, text: "Argued that AI will enhance rather than replace the work of doctors.", answer: "G" }
            ],
            options: [
              { label: "A", text: "Stanford University" },
              { label: "B", text: "DeepMind" },
              { label: "C", text: "Mount Sinai Hospital" },
              { label: "D", text: "University of California, Berkeley" },
              { label: "E", text: "US Food and Drug Administration" },
              { label: "F", text: "Professor Luciano Floridi" },
              { label: "G", text: "Dr Eric Topol" }
            ]
          },
          {
            instruction: "Complete the notes below.\nChoose ONE WORD ONLY from the passage for each answer.\n\nAI in Drug Discovery and Regulation",
            type: "fill",
            questions: [
              { num: 19, text: "Machine learning can screen millions of molecular __________ much faster than traditional methods.", answer: "compounds" },
              { num: 20, text: "AlphaFold solved a long-standing challenge related to predicting protein __________.", answer: "structure" },
              { num: 21, text: "Unlike conventional drugs, AI models may continue to __________ after receiving regulatory approval.", answer: "evolve" },
              { num: 22, text: "Many advanced AI models function as __________ boxes, making their reasoning difficult to interpret.", answer: "black" }
            ]
          },
          {
            instruction: "Do the following statements agree with the claims of the writer in Reading Passage 2?\nWrite YES if the statement agrees with the claims of the writer.\nWrite NO if the statement contradicts the claims of the writer.\nWrite NOT GIVEN if it is impossible to say what the writer thinks about this.",
            type: "tfng",
            questions: [
              { num: 23, text: "AI diagnostic systems have consistently outperformed human clinicians in all medical specialities.", answer: "NO" },
              { num: 24, text: "The bias in the healthcare allocation algorithm was partly caused by historical patterns of spending.", answer: "YES" },
              { num: 25, text: "Most patients are comfortable with AI making healthcare decisions without any human involvement.", answer: "NO" },
              { num: 26, text: "Dr Topol believes that AI will enable doctors to devote more attention to interpersonal aspects of patient care.", answer: "YES" }
            ]
          }
        ]
      },
      {
        id: 3,
        title: "The History and Future of Timekeeping",
        subtitle: "How the measurement of time has shaped human civilisation and continues to evolve",
        timeGuide: "You should spend about 20 minutes on Questions 27–40",
        questionRange: "Questions 27–40",
        paragraphs: [
          {
            text: "The desire to measure time is one of the oldest and most universal of human impulses. Long before the invention of mechanical clocks, ancient civilisations devised ingenious methods to track the passage of hours and seasons. The sundial, one of the earliest timekeeping devices, operated on a simple principle: a vertical rod, or gnomon, cast a shadow that moved across a calibrated surface as the sun traversed the sky. Sundials were used extensively in ancient Egypt, Greece and Rome, and their design grew increasingly sophisticated over centuries. However, they suffered from an obvious limitation: they were useless at night and on cloudy days, a constraint that spurred the development of alternative technologies."
          },
          {
            text: "Among the most elegant solutions to this problem was the water clock, or clepsydra, which measured time by the regulated flow of water from one vessel to another. Water clocks were used in ancient Babylon, Egypt, China and Greece, and some achieved remarkable precision. The Tower of the Winds in Athens, constructed around 50 BCE, housed an elaborate water clock mechanism alongside sundials and a wind vane. In medieval China, the polymath Su Song built a monumental astronomical clock tower in 1088 CE that combined a water-driven escapement mechanism with an armillary sphere for celestial observation. Despite their ingenuity, water clocks were vulnerable to fluctuations in water temperature and pressure, which affected the rate of flow and thus the accuracy of timekeeping."
          },
          {
            text: "The invention of the mechanical clock in medieval Europe, probably in the late thirteenth century, represented a transformative leap in timekeeping technology. Early mechanical clocks used a verge escapement driven by a falling weight to regulate the movement of gears. These devices were initially installed in church towers and public buildings, where they served not only to tell the time but also to regulate the rhythms of communal life, including the scheduling of prayers, markets and civic duties. The mechanical clock introduced the concept of equal hours, replacing the variable-length hours that had been used since antiquity, in which daytime and night-time were each divided into twelve hours regardless of the season."
          },
          {
            text: "The next major advance came in 1656, when the Dutch scientist Christiaan Huygens constructed the first pendulum clock. By exploiting the regular oscillation of a swinging weight, Huygens achieved a level of accuracy previously unattainable: his clock deviated by less than one minute per day, a dramatic improvement over earlier mechanical devices. The pendulum clock dominated precision timekeeping for nearly three centuries and was instrumental in the development of navigation, astronomy and scientific experimentation. Its reliability, however, was compromised by changes in temperature, which caused the pendulum rod to expand or contract, and by the effects of gravity variations at different latitudes."
          },
          {
            text: "The twentieth century brought two revolutions in timekeeping. The first was the quartz clock, developed in the late 1920s, which used the piezoelectric properties of a quartz crystal to generate a highly stable electrical signal. When an electric current is applied to a quartz crystal, it vibrates at a precise and consistent frequency, typically 32,768 times per second. This frequency can be divided electronically to drive a timekeeping mechanism of extraordinary accuracy. Quartz technology soon migrated from laboratory instruments to consumer wristwatches, fundamentally democratising access to precise time."
          },
          {
            text: "The second revolution was the atomic clock, first built in 1955 at the National Physical Laboratory in the United Kingdom. Atomic clocks measure time by detecting the electromagnetic radiation emitted or absorbed by atoms, typically caesium-133, as they transition between energy levels. The frequency of this radiation is extraordinarily stable, enabling atomic clocks to achieve accuracies measured in billionths of a second per day. In 1967, the International System of Units redefined the second in terms of the caesium atom's radiation frequency, effectively severing the connection between timekeeping and astronomical observation that had persisted for millennia. Today, atomic clocks underpin the operation of global positioning systems, telecommunications networks and financial trading platforms."
          },
          {
            text: "At the frontier of contemporary timekeeping research are optical lattice clocks, which use lasers to trap atoms of elements such as strontium or ytterbium in a lattice of light. These clocks measure atomic transitions at optical frequencies, which are far higher than the microwave frequencies used by caesium clocks, enabling even greater precision. Current optical lattice clocks are so accurate that they would neither gain nor lose a second over a period exceeding the age of the universe. Researchers at institutions including the National Institute of Standards and Technology in the United States and the University of Tokyo are working to refine these instruments, with the ultimate goal of redefining the second once again based on optical frequency standards."
          },
          {
            text: "The social impact of increasingly precise timekeeping has been profound. The standardisation of time zones in the late nineteenth century, driven largely by the expansion of railway networks, imposed a uniform temporal framework on societies that had previously operated according to local solar time. The telegraph and later the radio enabled the synchronisation of clocks across continents, facilitating international commerce and communication. In the digital age, the demand for ever-more-precise timekeeping continues to grow, driven by applications ranging from high-frequency financial trading, where transactions occur in microseconds, to fundamental physics experiments that probe the nature of gravity and spacetime. The history of timekeeping is, in many respects, a history of civilisation itself: each advance in the measurement of time has reshaped the way human beings organise their lives, coordinate their activities and understand the universe."
          }
        ],
        questionSections: [
          {
            instruction: "Complete the summary below.\nChoose ONE WORD ONLY from the passage for each answer.\n\nThe development of timekeeping",
            type: "fill",
            questions: [
              { num: 27, text: "Early sundials relied on a __________, or gnomon, to cast a shadow across a marked surface.", answer: "rod" },
              { num: 28, text: "Water clocks became inaccurate because changes in water __________ and pressure altered the flow rate.", answer: "temperature" },
              { num: 29, text: "Mechanical clocks introduced the idea of equal hours, replacing the __________ hours used in earlier times.", answer: "variable-length" },
              { num: 30, text: "Huygens's pendulum clock could be affected by changes in temperature and by __________ variations at different locations.", answer: "gravity" },
              { num: 31, text: "Quartz clocks work by applying an electric current to a crystal, causing it to __________ at a consistent frequency.", answer: "vibrate" }
            ]
          },
          {
            instruction: "Do the following statements agree with the information given in Reading Passage 3?\nWrite TRUE if the statement agrees with the information.\nWrite FALSE if the statement contradicts the information.\nWrite NOT GIVEN if there is no information on this.",
            type: "tfng",
            questions: [
              { num: 32, text: "Sundials were effective timekeeping devices regardless of weather conditions.", answer: "FALSE" },
              { num: 33, text: "Su Song's clock tower in China was built in the eleventh century.", answer: "TRUE" },
              { num: 34, text: "The pendulum clock was the dominant precision timekeeper for approximately 300 years.", answer: "TRUE" },
              { num: 35, text: "The first atomic clock was developed in the United States.", answer: "FALSE" },
              { num: 36, text: "The standardisation of time zones was primarily motivated by the needs of the railway industry.", answer: "TRUE" }
            ]
          },
          {
            instruction: "Choose the correct letter, A, B, C or D.",
            type: "mcMatch",
            questions: [
              { num: 37, text: "What was significant about the 1967 redefinition of the second?\nA. It was based on the rotation of the Earth.\nB. It disconnected timekeeping from astronomical observation.\nC. It was the first internationally agreed definition of a time unit.\nD. It made quartz clocks obsolete.", answer: "B" },
              { num: 38, text: "What makes optical lattice clocks superior to caesium atomic clocks?\nA. They use cheaper materials.\nB. They are smaller and more portable.\nC. They measure atomic transitions at higher frequencies.\nD. They do not require any external power source.", answer: "C" },
              { num: 39, text: "According to the passage, what drove the standardisation of time zones?\nA. the invention of the telegraph\nB. the growth of international trade\nC. the expansion of railway networks\nD. the demands of scientific research", answer: "C" },
              { num: 40, text: "What is the writer's main argument in the final paragraph?\nA. Modern timekeeping technology has made traditional methods irrelevant.\nB. The need for precise timekeeping will diminish in the future.\nC. Advances in timekeeping have consistently influenced human society and understanding.\nD. Financial trading is the most important application of precise timekeeping.", answer: "C" }
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
