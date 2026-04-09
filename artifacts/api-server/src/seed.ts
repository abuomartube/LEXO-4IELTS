import { sql } from "drizzle-orm";
import { db, storiesTable } from "@workspace/db";
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
    const values = chunk
      .map(
        (r) =>
          `(${[r.english, r.arabic, r.level, r.category, r.example_sentence, r.example_sentence_arabic]
            .map((v) => (v == null ? "NULL" : `'${String(v).replace(/'/g, "''")}'`))
            .join(",")})`
      )
      .join(",");
    await db.execute(
      sql.raw(
        `INSERT INTO flashcards (english,arabic,level,category,example_sentence,example_sentence_arabic) VALUES ${values}`
      )
    );
  }
}

const EXPECTED_COUNT = 3000;

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

    await seedStoriesData();
  } catch (err) {
    logger.error({ err }, "Seed error");
    throw err;
  }
}
