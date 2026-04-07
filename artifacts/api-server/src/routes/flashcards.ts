import { Router, type IRouter } from "express";
import { eq, and, ilike, sql } from "drizzle-orm";
import { db, flashcardsTable, progressTable } from "@workspace/db";
import {
  ListFlashcardsQueryParams,
  GetFlashcardParams,
  UpsertProgressBody,
  ListFlashcardsResponse,
  GetFlashcardLevelStatsResponse,
  ListCategoriesResponse,
  GetFlashcardResponse,
  GetProgressResponse,
  UpsertProgressResponse,
  GetProgressSummaryResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/flashcards", async (req, res): Promise<void> => {
  const parsed = ListFlashcardsQueryParams.safeParse(req.query);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const { level, category, search } = parsed.data;

  const conditions = [];
  if (level) conditions.push(eq(flashcardsTable.level, level));
  if (category) conditions.push(eq(flashcardsTable.category, category));
  if (search) {
    conditions.push(
      sql`(${ilike(flashcardsTable.english, `%${search}%`)} OR ${ilike(flashcardsTable.arabic, `%${search}%`)})`
    );
  }

  const cards = conditions.length
    ? await db.select().from(flashcardsTable).where(and(...conditions)).orderBy(flashcardsTable.id)
    : await db.select().from(flashcardsTable).orderBy(flashcardsTable.id);

  res.json(ListFlashcardsResponse.parse(cards));
});

router.get("/flashcards/levels", async (_req, res): Promise<void> => {
  const levels = ["A1", "A2", "B1", "B2"];
  const stats = await Promise.all(
    levels.map(async (level) => {
      const [totalResult] = await db
        .select({ count: sql<number>`count(*)::int` })
        .from(flashcardsTable)
        .where(eq(flashcardsTable.level, level));

      const knownCardIds = await db
        .selectDistinctOn([progressTable.flashcardId], {
          flashcardId: progressTable.flashcardId,
          known: progressTable.known,
        })
        .from(progressTable)
        .orderBy(progressTable.flashcardId, sql`${progressTable.reviewedAt} desc`);

      const knownForLevel = knownCardIds.filter((p) => p.known);

      const levelCards = await db
        .select({ id: flashcardsTable.id })
        .from(flashcardsTable)
        .where(eq(flashcardsTable.level, level));

      const levelCardIds = new Set(levelCards.map((c) => c.id));
      const knownCount = knownForLevel.filter((p) => levelCardIds.has(p.flashcardId)).length;

      return { level, total: totalResult?.count ?? 0, known: knownCount };
    })
  );

  res.json(GetFlashcardLevelStatsResponse.parse(stats));
});

router.get("/flashcards/categories", async (_req, res): Promise<void> => {
  const rows = await db
    .selectDistinct({ category: flashcardsTable.category })
    .from(flashcardsTable)
    .orderBy(flashcardsTable.category);

  const categories = rows.map((r) => r.category);
  res.json(ListCategoriesResponse.parse(categories));
});

router.get("/flashcards/:id", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const parsed = GetFlashcardParams.safeParse({ id: parseInt(raw, 10) });
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [card] = await db.select().from(flashcardsTable).where(eq(flashcardsTable.id, parsed.data.id));
  if (!card) {
    res.status(404).json({ error: "Flashcard not found" });
    return;
  }

  res.json(GetFlashcardResponse.parse(card));
});

router.get("/progress", async (_req, res): Promise<void> => {
  const records = await db
    .select()
    .from(progressTable)
    .orderBy(sql`${progressTable.reviewedAt} desc`);

  res.json(GetProgressResponse.parse(records));
});

router.post("/progress", async (req, res): Promise<void> => {
  const parsed = UpsertProgressBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const { flashcardId, known } = parsed.data;

  const [record] = await db
    .insert(progressTable)
    .values({ flashcardId, known, reviewedAt: new Date() })
    .returning();

  res.json(UpsertProgressResponse.parse(record));
});

router.get("/progress/summary", async (_req, res): Promise<void> => {
  const levels = ["A1", "A2", "B1", "B2"];

  const [totalResult] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(flashcardsTable);

  const latestProgress = await db
    .selectDistinctOn([progressTable.flashcardId], {
      flashcardId: progressTable.flashcardId,
      known: progressTable.known,
    })
    .from(progressTable)
    .orderBy(progressTable.flashcardId, sql`${progressTable.reviewedAt} desc`);

  const knownIds = new Set(latestProgress.filter((p) => p.known).map((p) => p.flashcardId));
  const totalKnown = knownIds.size;

  const byLevel = await Promise.all(
    levels.map(async (level) => {
      const [levelTotal] = await db
        .select({ count: sql<number>`count(*)::int` })
        .from(flashcardsTable)
        .where(eq(flashcardsTable.level, level));

      const levelCards = await db
        .select({ id: flashcardsTable.id })
        .from(flashcardsTable)
        .where(eq(flashcardsTable.level, level));

      const levelCardIds = new Set(levelCards.map((c) => c.id));
      const knownInLevel = [...knownIds].filter((id) => levelCardIds.has(id)).length;

      return { level, total: levelTotal?.count ?? 0, known: knownInLevel };
    })
  );

  res.json(
    GetProgressSummaryResponse.parse({
      totalCards: totalResult?.count ?? 0,
      totalKnown,
      byLevel,
    })
  );
});

export default router;
