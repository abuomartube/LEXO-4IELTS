import { sql } from "drizzle-orm";
import { db } from "@workspace/db";
import { logger } from "./lib/logger";
import seedData from "./flashcards-seed.json";

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
      example_sentence_arabic TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS progress (
      id SERIAL PRIMARY KEY,
      flashcard_id INTEGER NOT NULL REFERENCES flashcards(id) ON DELETE CASCADE,
      known BOOLEAN NOT NULL DEFAULT FALSE,
      reviewed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS bookmarks (
      id SERIAL PRIMARY KEY,
      flashcard_id INTEGER NOT NULL UNIQUE REFERENCES flashcards(id) ON DELETE CASCADE,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS card_srs (
      id SERIAL PRIMARY KEY,
      flashcard_id INTEGER NOT NULL UNIQUE REFERENCES flashcards(id) ON DELETE CASCADE,
      next_review_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      interval_days REAL NOT NULL DEFAULT 1,
      ease_factor REAL NOT NULL DEFAULT 2.5,
      review_count INTEGER NOT NULL DEFAULT 0,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
}

async function seedFlashcards() {
  const rows = seedData as SeedRow[];
  const BATCH = 100;
  for (let i = 0; i < rows.length; i += BATCH) {
    const batch = rows.slice(i, i + BATCH);
    const values = batch
      .map(
        (r) =>
          `(${escStr(r.english)}, ${escStr(r.arabic)}, ${escStr(r.level)}, ${escStr(r.category)}, ${escStr(r.example_sentence)}, ${escStr(r.example_sentence_arabic)})`
      )
      .join(", ");
    await db.execute(
      sql.raw(
        `INSERT INTO flashcards (english, arabic, level, category, example_sentence, example_sentence_arabic) VALUES ${values} ON CONFLICT DO NOTHING`
      )
    );
  }
}

function escStr(val: string | null | undefined): string {
  if (val == null) return "NULL";
  return `'${val.replace(/'/g, "''")}'`;
}

const EXPECTED_COUNT = 2198;

export async function runSeed() {
  try {
    await ensureTables();
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
  } catch (err) {
    logger.error({ err }, "Seed error");
    throw err;
  }
}
