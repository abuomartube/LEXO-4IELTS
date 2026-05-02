/**
 * Generates ORIGINAL IELTS-style audio for Cambridge Test 3 and Test 4 (8 parts total).
 *
 * IMPORTANT: scripts below are entirely original — they are NOT reproductions of
 * Cambridge IELTS audio content. They are written to be IELTS-realistic and to
 * weave each answer in the data file (artifacts/flashcards/src/data/listening-test.ts)
 * naturally into the script in the correct order at the correct question position.
 *
 * Output:
 *   artifacts/flashcards/public/listening3-part{1..4}.mp3
 *   artifacts/flashcards/public/listening4-part{1..4}.mp3
 *
 * Run from artifacts/flashcards: pnpm exec node scripts/generate-cambridge-test-audio.mjs
 * Requires OPENAI_API_KEY in env, ffmpeg on PATH.
 */
import { writeFile, mkdtemp, rm } from "node:fs/promises";
import { existsSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";
import os from "node:os";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PUBLIC_DIR = path.resolve(__dirname, "..", "public");

const SPEED = 0.95;
const MODEL = "tts-1";

// ─── ORIGINAL SCRIPTS (mine, not Cambridge) ──────────────────────────────────

// Each "dialogue" part is an array of {voice, text} segments (each rendered as
// a separate TTS call). Each "monologue" part is a single {voice, text}.

const T3_PART1_DIALOGUE = [
  { voice: "nova",  text: "Good morning, City Library. How can I help you?" },
  { voice: "alloy", text: "Hi, I'd like some information about joining the library, please." },
  { voice: "nova",  text: "Of course. We have two types of membership — standard and premium. Standard membership is completely free." },
  { voice: "alloy", text: "Free? That's great. Are there any limits on what I can borrow?" },
  { voice: "nova",  text: "Yes — with the standard membership, you can borrow up to eight books at a time." },
  { voice: "alloy", text: "Eight books — that's plenty. And what about the premium membership?" },
  { voice: "nova",  text: "Premium costs forty-five pounds per year." },
  { voice: "alloy", text: "Forty-five pounds. And what extra do I get for that?" },
  { voice: "nova",  text: "It includes everything from the standard plan, but you also get full access to our online databases. That's especially popular with students." },
  { voice: "alloy", text: "Online databases — perfect, I'm doing some research. Now, what services are available in the building? Do you have study rooms?" },
  { voice: "nova",  text: "Yes, we do. Study rooms can be booked, but the maximum booking is three hours per session." },
  { voice: "alloy", text: "Three hours, OK. And do you have computers I can use?" },
  { voice: "nova",  text: "Computers are free. Printing is free up to twenty pages. Just one thing — you'll need to bring your own headphones if you want to use any audio." },
  { voice: "alloy", text: "My own headphones — got it. My niece would love this place. Is there a children's section?" },
  { voice: "nova",  text: "Definitely. The children's section runs story time every Saturday morning." },
  { voice: "alloy", text: "Every Saturday morning — lovely." },
  { voice: "nova",  text: "And we run craft activities during the school holidays." },
  { voice: "alloy", text: "During the holidays — she'll love that. So what do I need to bring along to sign up?" },
  { voice: "nova",  text: "Just photo ID, and proof of your address. A recent utility bill works fine, or a bank statement." },
  { voice: "alloy", text: "A bill, no problem. And once I'm a member, how long can I keep books for?" },
  { voice: "nova",  text: "The standard loan period is three weeks." },
  { voice: "alloy", text: "Three weeks. And what happens if I'm late returning them?" },
  { voice: "nova",  text: "We charge a fine of fifty pence per day for each overdue book." },
  { voice: "alloy", text: "Per day, fair enough. I'll bring my paperwork in tomorrow. Thank you for your help." },
  { voice: "nova",  text: "You're very welcome. We'll see you then." },
];

const T3_PART2_MONOLOGUE = {
  voice: "alloy",
  text:
    "Welcome to Greenfield Wildlife Conservation Centre. Today I'd like to give you a quick overview of our work, our programmes for the public, and a few of the plans we have for the future. " +
    "The centre was founded forty years ago, and it had a clear and specific mission. While we do plenty of education and research now, our original purpose — and still our central focus — was to breed endangered species and protect them from extinction. " +
    "Many things have changed at the centre since then. Visitor numbers have grown gradually, and our animal collection has been refreshed several times — but the biggest change in recent years has been in the way the centre is funded. We used to rely almost entirely on government grants. Today, most of our income comes from private donations and corporate sponsorships. " +
    "We work very closely with local schools, and we offer a range of educational programmes for children of all ages. We have programmes about rainforest ecosystems and marine habitats, but by far the most popular with schools is the one focused on local wildlife — animals and plants the children can actually see in their own gardens and parks. " +
    "We also welcome adult volunteers. The work is rewarding, but quite intensive, so we ask for a minimum commitment of three months. Some volunteers stay much longer than that, of course, but three months is the minimum. " +
    "One thing that really surprised me when I first joined was the feeding programme. I expected the sheer volume of food to be the most striking thing — and it is impressive — but actually what surprised me most was just how carefully each animal's diet is planned, almost down to the gram. " +
    "Now, our biggest achievement this year — and we are very proud of this — has been successfully releasing a small group of rare birds back into the wild. That's exactly what a conservation centre exists for. " +
    "What do our visitors love most? We do regular surveys, and the same two answers come up again and again. The first is the chance to see rare animals close up. And the second, perhaps more surprisingly, is the natural setting of the centre itself — visitors love the woodland trails and the streams. " +
    "Looking ahead, we have two exciting plans for next year. We are going to introduce night-time safari experiences, where small groups can see the nocturnal animals at their most active. And we're also developing an online virtual tour, so people who can't easily visit in person can still see our work and our animals. We hope you'll come back and try them when they launch. ",
};

const T3_PART3_DIALOGUE = [
  { voice: "nova",  text: "Tom, I think we're nearly ready to write up the coral reef project. But we should talk through the challenges and the findings first. What was hardest for you?" },
  { voice: "alloy", text: "For me, the unpredictable weather conditions were a constant problem. We lost so many days to storms and rough seas." },
  { voice: "nova",  text: "That was tough. I'd say the second biggest challenge for me was just transporting the equipment to those remote locations. Some sites were hours by boat from anywhere with a road." },
  { voice: "alloy", text: "Yes, that was exhausting. But we did get some really useful data in the end." },
  { voice: "nova",  text: "We did. And two of the findings genuinely surprised me. The first was the rate of coral recovery in the warmer waters. I'd expected much slower regrowth." },
  { voice: "alloy", text: "Yes — that contradicts a lot of older research. And for me, the second surprise was how many new species we documented. I think we found more than we'd dared to hope for." },
  { voice: "nova",  text: "I agree. Right — let's talk about methods. Which were most effective in the end? Satellite imaging was useful for the wider context, but for fine detail —" },
  { voice: "alloy", text: "The underwater drone surveys, definitely. They reached places no diver could safely go." },
  { voice: "nova",  text: "Agreed. And I'd add the use of artificial intelligence to classify species. Honestly, that saved us months of manual work." },
  { voice: "alloy", text: "Couldn't agree more. Now, looking at the impact of all this — where do you think our work will land?" },
  { voice: "nova",  text: "I think the main effect will be on government environmental policy. Our data will hopefully shape future regulations on coastal management." },
  { voice: "alloy", text: "And what's the most important implication, in your view?" },
  { voice: "nova",  text: "For me it's about the need for stricter regulations on coastal development and overfishing. The reefs simply cannot recover if we don't protect them." },
  { voice: "alloy", text: "Speaking of next steps — Professor Lee said he'd drop in to give us his thoughts." },
  { voice: "nova",  text: "Hello, Professor — perfect timing. We were just about to discuss what we should do next." },
  { voice: "alloy", text: "Hi, you two. Sorry I'm late." },
  { voice: "nova",  text: "Professor, what would you suggest as our next step?" },
  { voice: "alloy", text: "My recommendation would be to conduct a follow-up study, but in a different location. Compare what you've found here with another reef system, perhaps in the Caribbean or the Pacific." },
  { voice: "nova",  text: "That's a brilliant idea. Thank you, Professor — we'll plan that for next year." },
  { voice: "alloy", text: "One last thing before we finish. What was the most rewarding part of the whole project for you?" },
  { voice: "nova",  text: "Honestly — and this might sound surprising — it was seeing the direct impact of our work. Local communities reading our recommendations, beginning to push for policy change. That's what made all of it worth it." },
  { voice: "alloy", text: "I agree with that completely. Right — let's start writing up." },
];

const T3_PART4_MONOLOGUE = {
  voice: "alloy",
  text:
    "In today's lecture I want to look at the history of public transport — how it developed, the obstacles it overcame, and where it might be heading next. " +
    "The first organised public bus services appeared in cities in the seventeenth and eighteenth centuries. They were nothing like today's buses, of course. The vehicles were pulled by horses, and they followed fixed routes through the streets at fixed times. " +
    "Now, who actually used these early services? Not ordinary working people — fares were too high. Early buses were mainly used by wealthy merchants who needed to move quickly between offices and warehouses across the growing cities. " +
    "The picture changed dramatically in the nineteenth century with the introduction of steam engines. Steam made long-distance travel possible for the first time, and railway networks began to expand rapidly across countries and continents. " +
    "A particular landmark came in eighteen sixty-three, when London opened the world's first underground railway. It was an instant success. Although passengers complained quite bitterly about the level of smoke that filled the tunnels — remember, these were steam-powered trains running underground. The smoke problem was only really solved when the lines were electrified decades later. " +
    "The next major change was the electric tram. Electric trams were first introduced in the city of Berlin, in eighteen eighty-one, and the technology spread quickly to other European and American cities. Trams were cheap, clean and quiet — and for a few decades they were the dominant form of urban transport. " +
    "However, by the mid-twentieth century, trams declined sharply in many countries. Why? Largely because cities chose to invest in roads instead of rails. The car was seen as the future, and tram lines were torn up to make space for cars. We are now, of course, slowly reversing that decision. " +
    "But buses adapted, and they survived. Modern bus rapid transit systems are designed to combine the speed of rail with the flexibility of buses. The key feature is that they have dedicated lanes which allow them to avoid traffic delays and run more like a metro line. " +
    "Buses are also becoming much cleaner. Many cities are now testing buses powered by hydrogen, which produces only water as a by-product. Battery-electric buses are also increasingly common, especially on shorter urban routes. " +
    "And finally — what comes next? Many transport experts predict that driverless vehicles will completely transform urban transport in the next two decades. Whether that prediction proves correct, only time will tell. " +
    "Now, in the second half of the lecture, I want to return briefly to the social impact of all these changes. ",
};

const T4_PART1_DIALOGUE = [
  { voice: "nova",  text: "Hello, Castle Home Insurance, this is Sarah speaking. How can I help you today?" },
  { voice: "alloy", text: "Hi there. I'd like to ask about your home contents insurance policies, please." },
  { voice: "nova",  text: "Sure, I can help with that. We offer three main policies — basic, standard and premium. Could I take a few details from you first?" },
  { voice: "alloy", text: "Yes, my name's David Wilson. So, what's covered by the basic policy?" },
  { voice: "nova",  text: "Basic cover protects you against fire and flood only. That's the simplest option we offer." },
  { voice: "alloy", text: "Just fire and flood. And how much does that one cost?" },
  { voice: "nova",  text: "Basic cover costs fifteen pounds per month." },
  { voice: "alloy", text: "Fifteen pounds per month — that's reasonable. What does the standard cover add to that?" },
  { voice: "nova",  text: "With standard cover, in addition to fire and flood, you're also protected against theft and water damage. That covers things like burst pipes, which actually cause a lot of claims." },
  { voice: "alloy", text: "Theft and water damage — useful. And what about the premium policy?" },
  { voice: "nova",  text: "Premium includes everything in standard, plus accidental damage. It covers individual items up to five thousand pounds in value, which is good if you have expensive electronics or jewellery." },
  { voice: "alloy", text: "Five thousand pounds, OK. Are there any other costs I should be aware of?" },
  { voice: "nova",  text: "Yes — there's an excess that applies to every claim. The standard excess is two hundred and fifty pounds per claim." },
  { voice: "alloy", text: "Two hundred and fifty. And are there any discounts available?" },
  { voice: "nova",  text: "We can offer a useful discount if your home has a burglar alarm fitted. It can save you up to fifteen percent on your premium." },
  { voice: "alloy", text: "I do have one, actually. Now — what about garden items? I have some quite expensive tools out there." },
  { voice: "nova",  text: "Garden items are only covered if they're kept in a locked shed. Items left out in the open or in an unlocked space are not protected." },
  { voice: "alloy", text: "A locked shed — I can sort that out. Now, suppose I do need to make a claim. What's the process?" },
  { voice: "nova",  text: "Claims must be reported to us within fourteen days of the incident. And in the case of a theft, you'll need to give us a crime reference number from the police." },
  { voice: "alloy", text: "A crime reference number, fine. And how do I pay for the policy?" },
  { voice: "nova",  text: "You can either pay annually for the full amount, or by monthly instalments. Most of our customers prefer the monthly option." },
  { voice: "alloy", text: "Monthly instalments would suit me best. That covers everything I needed to know — thank you very much." },
  { voice: "nova",  text: "You're very welcome. I'll email you a personalised quote within the hour." },
];

const T4_PART2_MONOLOGUE = {
  voice: "nova",
  text:
    "Welcome, everyone, to your first day as new tour guides at the National Museum. I'm going to take you through your responsibilities in each part of the museum, and then explain how the training programme works. " +
    "The museum is divided into six main areas, and each one has a slightly different focus for guides. Let me explain each in turn. " +
    "First, the Ancient Civilisations gallery. This is one of our oldest and most popular sections. Your main responsibility there will be explaining the historical context of the objects. Visitors really want to understand why these things matter — what world they came from. " +
    "Next, the Natural History wing. Here, your role is mostly answering visitors' questions. Children especially love asking about the dinosaurs, and you'll need to be ready with clear, simple answers. " +
    "The Science Discovery zone is our interactive area. Your main task there is demonstrating how the equipment works. You'll lead small groups through each exhibit, showing them what the buttons do and why. " +
    "The Art and Sculpture hall has many fragile and very valuable pieces. Your single most important duty in this hall is ensuring the safety of the exhibits. That means watching that visitors don't lean on the displays or touch the artworks — politely, of course. " +
    "In the Children's Learning Lab, your responsibility shifts entirely. Your role there is supervising children's activities. It's hands-on and needs patience — but it's very rewarding. " +
    "And finally, the Temporary Exhibition space. This is where we host special exhibitions, often very popular ones. Your main task there will be managing the queues at the popular exhibits, keeping things flowing safely and fairly. " +
    "Now — training. All new guides must complete a training course lasting two weeks. That course includes shadowing experienced guides, written tests, and practical assessments. " +
    "Some of you may be wondering what makes a good museum guide. We look for many qualities — historical knowledge, experience with children — but the single most important quality, in our view, is an ability to engage with different audiences. A guide who can connect with a school group at ten o'clock and an academic at three o'clock is a guide who succeeds here. " +
    "Once you're qualified, you'll need to attend refresher training every six months. This keeps your knowledge up to date, especially for new exhibitions. " +
    "Finally, a benefit you'll really appreciate — all guides at this museum receive free entry to other museums across the country, through our reciprocal membership scheme. We don't offer parking discounts, I'm afraid, but the entry scheme is genuinely very generous. " +
    "Right — are there any questions before we head out for the introductory tour? ",
};

const T4_PART3_DIALOGUE = [
  { voice: "nova",  text: "Ben, do you want to start by talking through the difficulties we had?" },
  { voice: "alloy", text: "Sure. The biggest one for me was just recruiting enough participants. We thought it would be easy on a university campus, but it was much harder than expected." },
  { voice: "nova",  text: "Yes, recruiting took weeks. The other big problem, I think, was getting ethical approval from the committee — they had so many questions about our methods." },
  { voice: "alloy", text: "Right, the ethics process was painful. Now, the surprising results. We had a few unexpected ones." },
  { voice: "nova",  text: "Yes. The most unexpected one for me was that music had no effect on concentration at all. We were certain it would slow people down." },
  { voice: "alloy", text: "I agree, that result was strange. And the second one — participants performed worse in the afternoon than in the morning. We hadn't predicted that either." },
  { voice: "nova",  text: "Now, if we did the experiment again, what would we change?" },
  { voice: "alloy", text: "I'd definitely use a larger sample size next time. Thirty participants is just too few for the kind of statistical power we wanted." },
  { voice: "nova",  text: "I agree. And we should carry out all the tests at the same time of day, to remove that variable. Maybe always run them at ten in the morning." },
  { voice: "alloy", text: "Good idea. So we'd want a bigger sample, and consistent timing." },
  { voice: "nova",  text: "Hi Professor — sorry to interrupt." },
  { voice: "alloy", text: "Hello you two. I read the draft of your report last night, on the train home actually." },
  { voice: "nova",  text: "Oh — what did you think of it, Professor?" },
  { voice: "alloy", text: "I think the main strength of the experiment is the clarity of the methodology. Anyone reading the report will know exactly what you did, step by step. That's harder to achieve than it looks." },
  { voice: "nova",  text: "Thank you, that means a lot. You also suggested something we genuinely hadn't expected." },
  { voice: "alloy", text: "Yes — I'd really encourage you to present the results at a student conference. There's one in March. It would be excellent experience for you both." },
  { voice: "nova",  text: "A student conference — wow, we'll definitely think about it. We were quite surprised by that suggestion, weren't we, Ben?" },
  { voice: "alloy", text: "Yes, completely. We weren't expecting that at all." },
  { voice: "nova",  text: "Thanks for the feedback, Professor — we'll be in touch." },
  { voice: "alloy", text: "I'll leave you to it. Good work, both of you." },
  { voice: "nova",  text: "So Ben — what do you think was the hardest part of the whole project for you?" },
  { voice: "alloy", text: "Honestly, it was analysing the statistical data. The numbers themselves were straightforward, but interpreting them properly took ages." },
  { voice: "nova",  text: "Same for me. And the most valuable thing you gained from the project?" },
  { voice: "alloy", text: "For me, the most valuable skill was teamwork. We argued sometimes, but we always reached an agreement, and that's a real skill to take into a job." },
  { voice: "nova",  text: "Couldn't agree more. Right — let's finish writing this up." },
];

const T4_PART4_MONOLOGUE = {
  voice: "alloy",
  text:
    "Good morning everyone. Today's lecture is an introduction to sustainable architecture — what it is, where it comes from, and the practical techniques architects use to design buildings that work with their surroundings rather than against them. " +
    "At its core, sustainable architecture aims to reduce a building's impact on the environment. That means cutting emissions during construction, during the building's day-to-day use, and even during its eventual demolition or recycling. " +
    "Now, this isn't a new idea. Long before the term sustainable architecture existed, traditional buildings around the world used local materials that were naturally available — clay, stone, timber from nearby forests. Local materials reduce transport emissions, and they also connect a building visually to its setting. " +
    "Let me run through several modern techniques. " +
    "The first is the green roof — a roof partially or fully covered with plants. Green roofs do many useful things, but their main practical benefit in cities is that they help to reduce flooding, by absorbing heavy rainfall before it can overwhelm the drainage system. " +
    "Second, building orientation. The way a building faces — north, south, east or west — has a huge effect on how much natural light it receives. A well-oriented building can dramatically cut artificial lighting costs and improve the wellbeing of the people who use it. " +
    "Third, windows. Modern double-glazed windows greatly improve a building's insulation, keeping warmth in during the winter and out during the summer. " +
    "Fourth, water. Rainwater is increasingly collected from rooftops and reused on-site. Most often it's used for watering gardens, but it can also be used to flush toilets or to wash vehicles. " +
    "Fifth, energy. Solar panels on a typical home roof, in many climates, can now generate enough electricity for the entire household. The technology has become surprisingly cheap in the last decade. " +
    "Sixth, materials again. Recycled steel is increasingly used in construction, especially for the structural framework of larger buildings. It saves enormous amounts of energy compared with producing new steel from scratch. " +
    "Seventh, smart systems. Modern buildings increasingly use sensors that automatically adjust the temperature inside the building, room by room. This avoids the waste of heating empty rooms or over-cooling busy ones. " +
    "And finally — the greatest challenge. The technology, in many cases, already exists. So why aren't sustainable buildings the norm? Because the greatest challenge is persuading developers to invest in sustainable design, given the higher upfront costs of doing so. Until that changes, progress will be slow. " +
    "Right, in the second half of the lecture I want to look at three case studies of sustainable buildings around the world. ",
};

const PARTS = [
  { file: "listening3-part1.mp3", title: "Test 3 Part 1: City Library", kind: "dialogue", segments: T3_PART1_DIALOGUE },
  { file: "listening3-part2.mp3", title: "Test 3 Part 2: Wildlife Conservation Centre", kind: "monologue", segment: T3_PART2_MONOLOGUE },
  { file: "listening3-part3.mp3", title: "Test 3 Part 3: Marine Biology Research", kind: "dialogue", segments: T3_PART3_DIALOGUE },
  { file: "listening3-part4.mp3", title: "Test 3 Part 4: History of Public Transport", kind: "monologue", segment: T3_PART4_MONOLOGUE },
  { file: "listening4-part1.mp3", title: "Test 4 Part 1: Home Insurance", kind: "dialogue", segments: T4_PART1_DIALOGUE },
  { file: "listening4-part2.mp3", title: "Test 4 Part 2: Museum Tour Guide Training", kind: "monologue", segment: T4_PART2_MONOLOGUE },
  { file: "listening4-part3.mp3", title: "Test 4 Part 3: Psychology Experiment", kind: "dialogue", segments: T4_PART3_DIALOGUE },
  { file: "listening4-part4.mp3", title: "Test 4 Part 4: Sustainable Architecture", kind: "monologue", segment: T4_PART4_MONOLOGUE },
];

// ─── TTS + assembly ──────────────────────────────────────────────────────────

async function tts(apiKey, voice, text) {
  const res = await fetch("https://api.openai.com/v1/audio/speech", {
    method: "POST",
    headers: { "Authorization": `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ model: MODEL, voice, input: text.slice(0, 4096), speed: SPEED, response_format: "mp3" }),
  });
  if (!res.ok) {
    const errText = await res.text().catch(() => "");
    throw new Error(`TTS HTTP ${res.status}: ${errText.slice(0, 200)}`);
  }
  return Buffer.from(await res.arrayBuffer());
}

function ffmpegConcat(inputFiles, outFile) {
  // ffmpeg concat demuxer requires a list file
  const listPath = path.join(path.dirname(inputFiles[0]), "concat-list.txt");
  const listContent = inputFiles.map(f => `file '${f.replace(/'/g, "'\\''")}'`).join("\n");
  writeFileSync(listPath, listContent);
  const r = spawnSync("ffmpeg", [
    "-y", "-loglevel", "error",
    "-f", "concat", "-safe", "0", "-i", listPath,
    "-c", "copy",
    outFile,
  ], { stdio: "inherit" });
  if (r.status !== 0) throw new Error(`ffmpeg concat failed (status ${r.status})`);
}

async function generatePart(apiKey, part, force = false) {
  const outFile = path.join(PUBLIC_DIR, part.file);
  if (existsSync(outFile) && !force) {
    console.log(`SKIP ${part.file} (already exists)`);
    return { skipped: true };
  }

  console.log(`▶ ${part.title} (${part.kind})`);
  const t0 = Date.now();

  if (part.kind === "monologue") {
    const buf = await tts(apiKey, part.segment.voice, part.segment.text);
    await writeFile(outFile, buf);
    console.log(`  saved ${part.file} (${(buf.length / 1024).toFixed(0)} KB) in ${(Date.now() - t0) / 1000}s`);
    return { ok: true };
  }

  // Dialogue: TTS each segment, then concat.
  const tmpDir = await mkdtemp(path.join(os.tmpdir(), "ielts-tts-"));
  const segFiles = [];
  for (let i = 0; i < part.segments.length; i++) {
    const seg = part.segments[i];
    const buf = await tts(apiKey, seg.voice, seg.text);
    const f = path.join(tmpDir, `seg-${i.toString().padStart(3, "0")}.mp3`);
    await writeFile(f, buf);
    segFiles.push(f);
    process.stdout.write(`  [${i + 1}/${part.segments.length}] ${seg.voice} ${(buf.length / 1024).toFixed(0)} KB\r`);
  }
  console.log("");
  ffmpegConcat(segFiles, outFile);
  await rm(tmpDir, { recursive: true, force: true });
  console.log(`  saved ${part.file} in ${((Date.now() - t0) / 1000).toFixed(1)}s`);
  return { ok: true };
}

async function main() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.error("OPENAI_API_KEY is not set. Aborting.");
    process.exit(1);
  }
  const force = process.argv.includes("--force");
  const only = process.argv.find(a => a.startsWith("--only="));
  const filter = only ? only.split("=")[1] : null;

  const parts = filter ? PARTS.filter(p => p.file.includes(filter)) : PARTS;
  console.log(`Generating ${parts.length} part(s)...`);

  let ok = 0, skipped = 0, failed = 0;
  for (const part of parts) {
    try {
      const r = await generatePart(apiKey, part, force);
      if (r.skipped) skipped++; else ok++;
    } catch (err) {
      failed++;
      console.error(`✗ ${part.file}: ${err instanceof Error ? err.message : String(err)}`);
    }
  }
  console.log(`\nDone. ok=${ok} skipped=${skipped} failed=${failed}`);
}

main().catch(err => { console.error(err); process.exit(1); });
