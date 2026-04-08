import { Router, type IRouter } from "express";
import { eq, and, ilike, sql, lte, ne } from "drizzle-orm";
import { db, flashcardsTable, progressTable, bookmarksTable, cardSrsTable } from "@workspace/db";
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

// ── Flashcards ─────────────────────────────────────────────────────────────

router.get("/flashcards", async (req, res): Promise<void> => {
  const parsed = ListFlashcardsQueryParams.safeParse(req.query);
  if (!parsed.success) { res.status(400).json({ error: parsed.error.message }); return; }
  const { level, category, search } = parsed.data;
  const conditions = [];
  if (level) conditions.push(eq(flashcardsTable.level, level));
  if (category) conditions.push(eq(flashcardsTable.category, category));
  if (search) conditions.push(sql`(${ilike(flashcardsTable.english, `%${search}%`)} OR ${ilike(flashcardsTable.arabic, `%${search}%`)})`);
  const cards = conditions.length
    ? await db.select().from(flashcardsTable).where(and(...conditions)).orderBy(flashcardsTable.id)
    : await db.select().from(flashcardsTable).orderBy(flashcardsTable.id);
  res.json(ListFlashcardsResponse.parse(cards));
});

router.get("/flashcards/levels", async (_req, res): Promise<void> => {
  const levels = ["A1", "A2", "B1", "B2", "C1"];
  const stats = await Promise.all(levels.map(async (level) => {
    const [totalResult] = await db.select({ count: sql<number>`count(*)::int` }).from(flashcardsTable).where(eq(flashcardsTable.level, level));
    const knownCardIds = await db.selectDistinctOn([progressTable.flashcardId], { flashcardId: progressTable.flashcardId, known: progressTable.known }).from(progressTable).orderBy(progressTable.flashcardId, sql`${progressTable.reviewedAt} desc`);
    const knownForLevel = knownCardIds.filter((p) => p.known);
    const levelCards = await db.select({ id: flashcardsTable.id }).from(flashcardsTable).where(eq(flashcardsTable.level, level));
    const levelCardIds = new Set(levelCards.map((c) => c.id));
    const knownCount = knownForLevel.filter((p) => levelCardIds.has(p.flashcardId)).length;
    return { level, total: totalResult?.count ?? 0, known: knownCount };
  }));
  res.json(GetFlashcardLevelStatsResponse.parse(stats));
});

router.get("/flashcards/categories", async (_req, res): Promise<void> => {
  const rows = await db.selectDistinct({ category: flashcardsTable.category }).from(flashcardsTable).orderBy(flashcardsTable.category);
  res.json(ListCategoriesResponse.parse(rows.map((r) => r.category)));
});

router.get("/flashcards/:id", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const parsed = GetFlashcardParams.safeParse({ id: parseInt(raw, 10) });
  if (!parsed.success) { res.status(400).json({ error: parsed.error.message }); return; }
  const [card] = await db.select().from(flashcardsTable).where(eq(flashcardsTable.id, parsed.data.id));
  if (!card) { res.status(404).json({ error: "Flashcard not found" }); return; }
  res.json(GetFlashcardResponse.parse(card));
});

// ── Progress ───────────────────────────────────────────────────────────────

router.get("/progress", async (_req, res): Promise<void> => {
  const records = await db.select().from(progressTable).orderBy(sql`${progressTable.reviewedAt} desc`);
  res.json(GetProgressResponse.parse(records));
});

router.post("/progress", async (req, res): Promise<void> => {
  const parsed = UpsertProgressBody.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: parsed.error.message }); return; }
  const { flashcardId, known } = parsed.data;
  const [record] = await db.insert(progressTable).values({ flashcardId, known, reviewedAt: new Date() }).returning();
  res.json(UpsertProgressResponse.parse(record));
});

router.get("/progress/summary", async (_req, res): Promise<void> => {
  const levels = ["A1", "A2", "B1", "B2", "C1"];
  const [totalResult] = await db.select({ count: sql<number>`count(*)::int` }).from(flashcardsTable);
  const latestProgress = await db.selectDistinctOn([progressTable.flashcardId], { flashcardId: progressTable.flashcardId, known: progressTable.known }).from(progressTable).orderBy(progressTable.flashcardId, sql`${progressTable.reviewedAt} desc`);
  const knownIds = new Set(latestProgress.filter((p) => p.known).map((p) => p.flashcardId));
  const totalKnown = knownIds.size;
  const byLevel = await Promise.all(levels.map(async (level) => {
    const [levelTotal] = await db.select({ count: sql<number>`count(*)::int` }).from(flashcardsTable).where(eq(flashcardsTable.level, level));
    const levelCards = await db.select({ id: flashcardsTable.id }).from(flashcardsTable).where(eq(flashcardsTable.level, level));
    const levelCardIds = new Set(levelCards.map((c) => c.id));
    const knownInLevel = [...knownIds].filter((id) => levelCardIds.has(id)).length;
    return { level, total: levelTotal?.count ?? 0, known: knownInLevel };
  }));
  res.json(GetProgressSummaryResponse.parse({ totalCards: totalResult?.count ?? 0, totalKnown, byLevel }));
});

// ── Bookmarks ──────────────────────────────────────────────────────────────

router.get("/bookmarks", async (_req, res): Promise<void> => {
  const rows = await db.select({ flashcardId: bookmarksTable.flashcardId }).from(bookmarksTable);
  res.json(rows.map((r) => r.flashcardId));
});

router.post("/bookmarks/:id", async (req, res): Promise<void> => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) { res.status(400).json({ error: "Invalid id" }); return; }
  const existing = await db.select().from(bookmarksTable).where(eq(bookmarksTable.flashcardId, id));
  if (existing.length > 0) {
    await db.delete(bookmarksTable).where(eq(bookmarksTable.flashcardId, id));
    res.json({ bookmarked: false });
  } else {
    await db.insert(bookmarksTable).values({ flashcardId: id });
    res.json({ bookmarked: true });
  }
});

// ── Word of the Day ────────────────────────────────────────────────────────

router.get("/word-of-day", async (_req, res): Promise<void> => {
  const [totalResult] = await db.select({ count: sql<number>`count(*)::int` }).from(flashcardsTable);
  const total = totalResult?.count ?? 1;
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
  const offset = dayOfYear % total;
  const [card] = await db.select().from(flashcardsTable).orderBy(flashcardsTable.id).limit(1).offset(offset);
  res.json(card ?? null);
});

// ── Streak ─────────────────────────────────────────────────────────────────

router.get("/streak", async (_req, res): Promise<void> => {
  const rows = await db
    .select({ day: sql<string>`date(${progressTable.reviewedAt})::text` })
    .from(progressTable)
    .groupBy(sql`date(${progressTable.reviewedAt})`)
    .orderBy(sql`date(${progressTable.reviewedAt}) desc`);

  const days = rows.map((r) => r.day);
  let streak = 0;
  const today = new Date().toISOString().slice(0, 10);
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);

  if (days.length === 0) {
    res.json({ streak: 0, totalDays: 0 });
    return;
  }

  let current = days[0] === today || days[0] === yesterday ? days[0] : null;
  if (!current) {
    res.json({ streak: 0, totalDays: days.length });
    return;
  }

  for (const day of days) {
    const diff = Math.round((new Date(current).getTime() - new Date(day).getTime()) / 86400000);
    if (diff <= 1) {
      streak++;
      current = day;
    } else {
      break;
    }
  }

  res.json({ streak, totalDays: days.length });
});

// ── Quiz ───────────────────────────────────────────────────────────────────

router.get("/quiz", async (req, res): Promise<void> => {
  const level = req.query.level as string | undefined;
  const count = Math.min(parseInt(req.query.count as string ?? "10", 10), 100);

  const conditions = level && level !== "ALL" ? [eq(flashcardsTable.level, level)] : [];
  const allCards = conditions.length
    ? await db.select().from(flashcardsTable).where(and(...conditions))
    : await db.select().from(flashcardsTable);

  if (allCards.length < 4) { res.json([]); return; }

  const shuffled = [...allCards].sort(() => Math.random() - 0.5).slice(0, count);

  const questions = shuffled.map((card) => {
    const distractors = allCards
      .filter((c) => c.id !== card.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map((c) => c.arabic);
    const options = [...distractors, card.arabic].sort(() => Math.random() - 0.5);
    const correctIndex = options.indexOf(card.arabic);
    return { flashcard: card, options, correctIndex };
  });

  res.json(questions);
});

// ── Fill in the Blank ──────────────────────────────────────────────────────

router.get("/fill-blank", async (req, res): Promise<void> => {
  const level = req.query.level as string | undefined;
  const count = Math.min(parseInt(req.query.count as string ?? "10", 10), 100);

  const conditions = level && level !== "ALL" ? [eq(flashcardsTable.level, level)] : [];
  const pool = conditions.length
    ? await db.select().from(flashcardsTable).where(and(...conditions))
    : await db.select().from(flashcardsTable);

  const withSentences = pool.filter((c) => c.exampleSentence && c.exampleSentence.toLowerCase().includes(c.english.toLowerCase()));
  const sample = [...withSentences].sort(() => Math.random() - 0.5).slice(0, count);

  const questions = sample.map((card) => {
    const re = new RegExp(card.english, "gi");
    const sentence = card.exampleSentence!.replace(re, "______");
    return { flashcard: card, sentence };
  });

  res.json(questions);
});

// ── SRS ────────────────────────────────────────────────────────────────────

router.get("/srs/due", async (req, res): Promise<void> => {
  const level = req.query.level as string | undefined;
  const now = new Date();

  const srsRecords = await db.select().from(cardSrsTable).where(lte(cardSrsTable.nextReviewAt, now));
  const dueIds = new Set(srsRecords.map((r) => r.flashcardId));

  const conditions: any[] = [];
  if (level && level !== "ALL") conditions.push(eq(flashcardsTable.level, level));

  const allCards = conditions.length
    ? await db.select().from(flashcardsTable).where(and(...conditions))
    : await db.select().from(flashcardsTable);

  const allSrsIds = new Set((await db.select({ id: cardSrsTable.flashcardId }).from(cardSrsTable)).map((r) => r.id));
  const neverReviewed = allCards.filter((c) => !allSrsIds.has(c.id));
  const due = allCards.filter((c) => dueIds.has(c.id));

  const result = [...due, ...neverReviewed].slice(0, 50);
  res.json(result);
});

router.post("/srs/:id", async (req, res): Promise<void> => {
  const id = parseInt(req.params.id, 10);
  const known: boolean = req.body.known === true;
  if (isNaN(id)) { res.status(400).json({ error: "Invalid id" }); return; }

  const [existing] = await db.select().from(cardSrsTable).where(eq(cardSrsTable.flashcardId, id));

  let intervalDays: number;
  let easeFactor: number;
  let reviewCount: number;

  if (!existing) {
    reviewCount = known ? 1 : 0;
    intervalDays = known ? 1 : 1;
    easeFactor = known ? 2.5 : 2.3;
  } else {
    if (known) {
      reviewCount = existing.reviewCount + 1;
      if (reviewCount === 1) intervalDays = 1;
      else if (reviewCount === 2) intervalDays = 6;
      else intervalDays = Math.round(existing.intervalDays * existing.easeFactor);
      easeFactor = Math.min(2.5, existing.easeFactor + 0.1);
    } else {
      reviewCount = 0;
      intervalDays = 1;
      easeFactor = Math.max(1.3, existing.easeFactor - 0.2);
    }
  }

  const nextReviewAt = new Date(Date.now() + intervalDays * 86400000);

  if (!existing) {
    await db.insert(cardSrsTable).values({ flashcardId: id, nextReviewAt, intervalDays, easeFactor, reviewCount, updatedAt: new Date() });
  } else {
    await db.update(cardSrsTable).set({ nextReviewAt, intervalDays, easeFactor, reviewCount, updatedAt: new Date() }).where(eq(cardSrsTable.flashcardId, id));
  }

  res.json({ flashcardId: id, nextReviewAt: nextReviewAt.toISOString(), intervalDays, reviewCount });
});

export default router;
