import { sql } from "drizzle-orm";
import { db, storiesTable, flashcardsTable } from "@workspace/db";
import { logger } from "./lib/logger";
import seedData from "./flashcards-seed.json";
import storiesSeedData from "./stories-seed.json";

type SeedRow = {
  english: string;
  arabic: string;
  level: string;
  category: string;
  example_sentence: string | null;
  example_sentence_arabic: string | null;
};

async function ensureTables() {
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS flashcards (
      id SERIAL PRIMARY KEY,
      english TEXT NOT NULL,
      arabic TEXT NOT NULL,
      level TEXT NOT NULL,
      category TEXT NOT NULL,
      example_sentence TEXT,
      example_sentence_arabic TEXT
    )
  `);

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS progress (
      id SERIAL PRIMARY KEY,
      email TEXT NOT NULL,
      card_id INTEGER NOT NULL,
      status TEXT NOT NULL DEFAULT 'new',
      reviewed_at TIMESTAMPTZ,
      UNIQUE(email, card_id)
    )
  `);

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS bookmarks (
      id SERIAL PRIMARY KEY,
      email TEXT NOT NULL,
      card_id INTEGER NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      UNIQUE(email, card_id)
    )
  `);

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS card_srs (
      id SERIAL PRIMARY KEY,
      email TEXT NOT NULL,
      card_id INTEGER NOT NULL,
      interval INTEGER NOT NULL DEFAULT 1,
      ease_factor REAL NOT NULL DEFAULT 2.5,
      due_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      repetitions INTEGER NOT NULL DEFAULT 0,
      last_reviewed TIMESTAMPTZ,
      UNIQUE(email, card_id)
    )
  `);
}

async function seedFlashcards() {
  const rows = seedData as SeedRow[];
  const BATCH = 500;
  for (let i = 0; i < rows.length; i += BATCH) {
    const chunk = rows.slice(i, i + BATCH);
    await db.insert(flashcardsTable).values(
      chunk.map((r) => ({
        english: r.english,
        arabic: r.arabic,
        level: r.level,
        category: r.category,
        exampleSentence: r.example_sentence ?? null,
        exampleSentenceArabic: r.example_sentence_arabic ?? null,
      }))
    );
  }
}

const EXPECTED_COUNT = 3000;

// Reconciles existing flashcard rows with the seed JSON. Updates only the
// rows whose Arabic translation (or Arabic example) differs from the JSON.
// This lets us ship corrected translations without truncating user-progress
// references (which point to flashcard IDs).
async function reconcileFlashcardTranslations() {
  const rows = seedData as SeedRow[];
  const existing = await db.execute<{
    id: number;
    english: string;
    level: string;
    category: string;
    arabic: string;
    example_sentence_arabic: string | null;
  }>(sql`SELECT id, english, level, category, arabic, example_sentence_arabic FROM flashcards`);

  const byKey = new Map<string, { id: number; arabic: string; exampleAr: string | null }>();
  for (const r of existing.rows) {
    byKey.set(`${r.english}::${r.level}::${r.category}`, {
      id: r.id,
      arabic: r.arabic,
      exampleAr: r.example_sentence_arabic,
    });
  }

  let arabicUpdates = 0;
  let exampleUpdates = 0;
  for (const seed of rows) {
    const cur = byKey.get(`${seed.english}::${seed.level}::${seed.category}`);
    if (!cur) continue;
    const newArabic = seed.arabic;
    const newExample = seed.example_sentence_arabic ?? null;
    if (cur.arabic !== newArabic) {
      await db.execute(sql`UPDATE flashcards SET arabic = ${newArabic} WHERE id = ${cur.id}`);
      arabicUpdates++;
    }
    if (cur.exampleAr !== newExample) {
      await db.execute(sql`UPDATE flashcards SET example_sentence_arabic = ${newExample} WHERE id = ${cur.id}`);
      exampleUpdates++;
    }
  }

  if (arabicUpdates || exampleUpdates) {
    logger.info(
      { arabicUpdates, exampleUpdates },
      "Reconciled flashcard Arabic translations from seed JSON",
    );
  } else {
    logger.info("Flashcard Arabic translations already match seed JSON");
  }
}

async function ensureStoriesTable() {
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS stories (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      title_arabic TEXT NOT NULL,
      content TEXT NOT NULL,
      content_arabic TEXT NOT NULL,
      level TEXT NOT NULL,
      order_index INTEGER NOT NULL DEFAULT 0,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
}

async function seedStoriesData() {
  const expected = storiesSeedData.length;
  const result = await db.execute(sql`SELECT COUNT(*)::int AS cnt FROM stories`);
  const count = (result.rows[0] as { cnt: number }).cnt;

  if (count >= expected) {
    logger.info({ count }, "Stories already seeded, skipping");
    return;
  }

  if (count > 0) {
    // Upgrade: reseed from scratch with the full set
    await db.execute(sql`TRUNCATE stories RESTART IDENTITY`);
    logger.info({ old: count, new: expected }, "Reseeding stories with full set");
  }

  const BATCH = 20;
  for (let i = 0; i < storiesSeedData.length; i += BATCH) {
    const chunk = storiesSeedData.slice(i, i + BATCH);
    await db.insert(storiesTable).values(
      chunk.map((s) => ({
        level: s.level,
        orderIndex: s.orderIndex,
        title: s.title,
        titleArabic: s.titleArabic,
        content: s.content,
        contentArabic: s.contentArabic,
      }))
    );
  }

  logger.info({ count: storiesSeedData.length }, "Stories seeded successfully");
}

export async function runSeed() {
  try {
    await ensureTables();
    await ensureStoriesTable();

    const result = await db.execute(sql`SELECT COUNT(*)::int AS cnt FROM flashcards`);
    const count = (result.rows[0] as { cnt: number }).cnt;
    if (count < EXPECTED_COUNT) {
      logger.info({ existing: count, expected: EXPECTED_COUNT }, "Seeding flashcards database...");
      if (count > 0) {
        await db.execute(sql`TRUNCATE flashcards RESTART IDENTITY CASCADE`);
        logger.info("Cleared old flashcard data for re-seed");
      }
      await seedFlashcards();
      logger.info({ count: (seedData as SeedRow[]).length }, "Flashcards seeded successfully");
    } else {
      logger.info({ count }, "Flashcards already seeded, skipping");
    }

    const a1Result = await db.execute(sql`SELECT COUNT(*)::int AS cnt FROM flashcards WHERE level = 'A1'`);
    const a1Count = (a1Result.rows[0] as { cnt: number }).cnt;
    if (a1Count > 0) {
      await db.execute(sql`UPDATE flashcards SET level = 'A2' WHERE level = 'A1'`);
      logger.info({ updated: a1Count }, "Migrated A1 words to A2");
    }

    await reconcileFlashcardTranslations();
    await seedStoriesData();
  } catch (err) {
    logger.error({ err }, "Seed error");
    throw err;
  }
}
