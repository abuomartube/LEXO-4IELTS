/**
 * Story generation script using Anthropic AI.
 * Generates 45 more stories per level (A2, B1, B2, C1) to bring total to 50 per level.
 * Run: pnpm --filter @workspace/db exec tsx src/generate-stories.ts
 */
import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import { storiesTable } from "./schema";
import { eq, sql, count } from "drizzle-orm";
import Anthropic from "@anthropic-ai/sdk";

const { Pool } = pg;

if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL required");
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool, { schema: { storiesTable } });

const apiKey = process.env.AI_INTEGRATIONS_ANTHROPIC_API_KEY;
const baseURL = process.env.AI_INTEGRATIONS_ANTHROPIC_BASE_URL;
if (!apiKey || !baseURL) throw new Error("Anthropic env vars required");
const anthropic = new Anthropic({ apiKey, baseURL });

const TOPICS_A2 = [
  "going to the library", "cooking a simple meal", "taking a bus", "making new friends at work",
  "shopping for clothes", "a birthday party", "morning exercise routine", "visiting a doctor",
  "sending an email", "learning to ride a bicycle", "a rainy day at home", "a school trip",
  "a phone call with family", "painting a room", "a visit to the zoo", "eating at a restaurant",
  "a lost pet", "planting a garden", "writing a letter", "a football match",
  "a visit to the dentist", "preparing for an exam", "learning a new song", "a camping trip",
  "buying a gift", "helping a neighbour", "a family picnic", "finding a new job",
  "learning to swim", "a surprise visitor", "a broken bicycle", "the school library",
  "a train journey", "feeding the birds", "a weekend hobby", "a new classroom",
  "drinking tea with friends", "losing keys", "a shopping list", "baking bread",
  "a morning walk", "a new teacher", "a sunny afternoon", "washing clothes",
  "a visit to grandparents",
];

const TOPICS_B1 = [
  "changing careers at 35", "volunteering in the community", "social media habits",
  "a gap year experience", "learning a second language", "recycling at home",
  "online shopping habits", "moving to a new city", "a part-time job", "cultural festivals",
  "healthy eating on a budget", "working from home", "public transport systems",
  "a memorable holiday", "saving money for the future", "dealing with stress at work",
  "a university application", "renewable energy at home", "a local charity project",
  "travel insurance and safety", "a community garden", "digital detox weekends",
  "starting a small business", "lifelong learning", "sports and mental health",
  "city noise pollution", "a career change", "food waste reduction", "local tourism",
  "a job interview", "parenting and technology", "voting for the first time",
  "a cycling city", "learning to drive", "a book club", "healthcare in rural areas",
  "a scholarship application", "a neighbourhood watch programme", "studying abroad",
  "work-life balance", "social networking for professionals", "an apprenticeship",
  "saving the high street", "a science fair", "online learning platforms",
];

const TOPICS_B2 = [
  "the gig economy and worker rights", "social inequality in education",
  "the psychology of advertising", "migration and integration challenges",
  "artificial intelligence in the workplace", "the decline of biodiversity",
  "mental health stigma in society", "the future of newspapers",
  "food security in developing nations", "gender representation in media",
  "the obesity epidemic", "urban green spaces and wellbeing",
  "the dark side of social media", "space exploration costs",
  "antibiotic resistance", "the decline of reading culture",
  "electric vehicles and infrastructure", "data privacy in the digital age",
  "climate refugees", "the sharing economy",
  "criminal justice reform", "gene editing ethics",
  "the role of art in society", "animal testing in science",
  "the mental load of modern parenting", "loneliness in cities",
  "the future of retail", "income inequality",
  "cultural appropriation", "water scarcity",
  "algorithmic decision-making", "the rise of plant-based diets",
  "standardised testing debate", "indigenous language preservation",
  "the attention economy", "globalisation and local identity",
  "digital currency risks", "ageing populations",
  "the dropout crisis in universities", "access to clean energy",
  "journalism and fake news", "the impact of tourism",
  "poverty and urban crime", "the ethics of organ donation",
  "remote work and city centres",
];

const TOPICS_C1 = [
  "epistemic injustice in academia", "the philosophy of free will and determinism",
  "structural racism in institutional systems", "the commodification of education",
  "post-truth politics and democratic erosion", "the ethics of surveillance capitalism",
  "intergenerational trauma and public health", "the paradox of choice in consumer society",
  "cosmopolitanism versus nationalism", "the limits of utilitarianism",
  "automation, power, and labour rights", "biopolitics and state control",
  "the crisis of liberal democracy", "aesthetics and cultural value",
  "decolonising the curriculum", "the ethics of memory and historical accountability",
  "transhumanism and human dignity", "the sociology of risk",
  "catastrophising and media framing", "language and power asymmetry",
  "collective action problems in climate governance", "the neuroscience of bias",
  "financial globalisation and sovereignty", "the epistemology of expertise",
  "posthumanism and ethics of care", "contested narratives of progress",
  "the limits of free speech", "meritocracy as ideology",
  "resilience discourse and structural neglect", "the social determinants of health",
  "big data and democratic legitimacy", "the moral economy",
  "performativity and gender identity theory", "extractive capitalism in the Global South",
  "intergenerational justice and climate ethics", "the philosophy of punishment",
  "narrative and collective memory", "complexity theory and governance",
  "the philosophy of science and paradigm shifts", "the commons and digital enclosure",
  "cosmopolitanism and refugee law", "the attention economy and cognition",
  "labour alienation in platform capitalism", "urban informality and the right to the city",
  "the sociology of knowledge production",
];

interface GeneratedStory {
  title: string;
  titleArabic: string;
  content: string;
  contentArabic: string;
}

async function generateBatch(level: string, topics: string[]): Promise<GeneratedStory[]> {
  const wordCount = level === "A2" ? "80-110" : level === "B1" ? "110-140" : level === "B2" ? "140-170" : "170-200";
  const topicList = topics.map((t, i) => `${i + 1}. ${t}`).join("\n");

  const prompt = `Generate ${topics.length} short IELTS reading stories for English learners at level ${level} (CEFR). Each story should:
- Be ${wordCount} words in English
- Have 2-3 clear paragraphs
- Use vocabulary appropriate for ${level} level IELTS students
- Be engaging, informative, and natural-sounding
- Include an accurate, natural Arabic translation of similar length

Topics to cover (one story per topic):
${topicList}

Return ONLY a valid JSON array. Each object must have exactly these keys:
- "title": short English title (4-7 words)
- "titleArabic": accurate Arabic translation of the title
- "content": the English story text (${wordCount} words, paragraphs separated by \\n\\n)
- "contentArabic": complete Arabic translation of the story (paragraphs separated by \\n\\n)

Return only the JSON array, no other text.`;

  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 8000,
    messages: [{ role: "user", content: prompt }],
  });

  const text = response.content[0].type === "text" ? response.content[0].text : "";

  const jsonMatch = text.match(/\[[\s\S]*\]/);
  if (!jsonMatch) throw new Error(`No JSON found in response for level ${level}`);

  // Sanitise common JSON-breaking characters before parsing
  const sanitised = jsonMatch[0]
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g, "")  // control chars
    .replace(/\t/g, "\\t");  // unescaped tabs inside strings

  return JSON.parse(sanitised) as GeneratedStory[];
}

async function generateForLevel(level: string, topics: string[], startOrder: number) {
  const BATCH_SIZE = 5;
  let orderIndex = startOrder;

  for (let i = 0; i < topics.length; i += BATCH_SIZE) {
    const batch = topics.slice(i, i + BATCH_SIZE);
    console.log(`  Generating ${level} stories ${i + 1}-${Math.min(i + BATCH_SIZE, topics.length)} of ${topics.length}...`);

    try {
      const stories = await generateBatch(level, batch);

      for (const story of stories) {
        await db.insert(storiesTable).values({
          level,
          orderIndex: orderIndex++,
          title: story.title,
          titleArabic: story.titleArabic,
          content: story.content,
          contentArabic: story.contentArabic,
        });
      }

      console.log(`  ✓ Inserted ${stories.length} stories (total orderIndex now ${orderIndex})`);

      if (i + BATCH_SIZE < topics.length) {
        await new Promise((r) => setTimeout(r, 1500));
      }
    } catch (err) {
      console.error(`  ✗ Batch failed:`, err);
      throw err;
    }
  }
}

async function main() {
  console.log("Starting story generation...\n");

  const levelMap: Record<string, string[]> = {
    A2: TOPICS_A2,
    B1: TOPICS_B1,
    B2: TOPICS_B2,
    C1: TOPICS_C1,
  };

  for (const [level, topics] of Object.entries(levelMap)) {
    const result = await db
      .select({ cnt: count() })
      .from(storiesTable)
      .where(eq(storiesTable.level, level));
    const existing = result[0]?.cnt ?? 0;
    const needed = 50 - existing;

    if (needed <= 0) {
      console.log(`${level}: already has ${existing} stories. Skipping.`);
      continue;
    }

    console.log(`${level}: has ${existing} stories, generating ${Math.min(needed, topics.length)} more...`);
    const topicsToUse = topics.slice(0, needed);
    await generateForLevel(level, topicsToUse, existing + 1);
    console.log(`${level}: done.\n`);
  }

  console.log("All done!");
  await pool.end();
}

main().catch((err) => {
  console.error("Fatal error:", err);
  pool.end();
  process.exit(1);
});
