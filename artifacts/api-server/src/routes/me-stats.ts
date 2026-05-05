import { Router, type IRouter } from "express";
import crypto from "node:crypto";
import {
  db,
  accessRequestsTable,
  xpEventsTable,
  lessonCompletionsTable,
} from "@workspace/db";
import { eq, sql } from "drizzle-orm";

const router: IRouter = Router();

const SESSION_SECRET = process.env["SESSION_SECRET"] ?? "fallback-secret";

// Mirrors the helper used in lessons.ts / orwell.ts so this module
// stays self-contained.
async function verifyStudentEmail(req: import("express").Request): Promise<string | null> {
  const email = (req.headers["x-student-email"] as string)?.trim().toLowerCase();
  const token = req.headers["x-student-token"] as string;
  if (!email || !token) return null;
  const expected = crypto
    .createHmac("sha256", SESSION_SECRET)
    .update(email + ":approved")
    .digest("hex");
  try {
    const a = Buffer.from(token, "hex");
    const b = Buffer.from(expected, "hex");
    if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
  } catch {
    return null;
  }
  const rows = await db
    .select()
    .from(accessRequestsTable)
    .where(eq(accessRequestsTable.email, email));
  if (rows.length === 0 || rows[0].status !== "approved") return null;
  if (rows[0].expiresAt && rows[0].expiresAt < new Date()) return null;
  return email;
}

// Estimated minutes of effort per XP-earning activity event. We deliberately
// count XP events instead of just lesson completions so flashcards / quizzes
// / essays — which is where students actually spend most of their time —
// show up in the dashboard. These numbers are calibrated estimates, not
// measured time; we'll replace them with real heartbeat tracking later.
const MINUTES_PER_LESSON = 10;
const MINUTES_PER_ACTIVITY: Record<string, number> = {
  flashcard_review: 0.5, // one card flipped/marked
  quiz_correct: 0.5,     // one quiz answer
  story_quiz: 5,         // a full story comprehension quiz
  story_writing: 10,     // a written story exercise
  essay_check: 15,       // a full IELTS essay submission
};
// Fallback for any future activity type that hasn't been calibrated yet.
const MINUTES_PER_ACTIVITY_DEFAULT = 1;

// ── GET /api/me/xp ────────────────────────────────────────────────────────
// Returns the student's lifetime XP total and the timestamp of their most
// recent XP-earning activity. messagesSent was intentionally dropped for
// Phase 1; we'll add granular activity counts later if needed.
router.get("/me/xp", async (req, res): Promise<void> => {
  const email = await verifyStudentEmail(req);
  if (!email) {
    res.status(401).json({ error: "unauthorized" });
    return;
  }
  const [row] = await db
    .select({
      totalXp: sql<number>`coalesce(sum(${xpEventsTable.xp}), 0)::int`,
      // Cast in SQL so we get a stable ISO 8601 string regardless of whether
      // the pg driver returns a Date object or a raw text value here.
      lastActivityAt: sql<string | null>`to_char(max(${xpEventsTable.createdAt}) AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"')`,
    })
    .from(xpEventsTable)
    .where(eq(xpEventsTable.email, email));

  res.json({
    totalXp: row?.totalXp ?? 0,
    lastActivityAt: row?.lastActivityAt ?? null,
  });
});

// ── GET /api/english/me/streak ────────────────────────────────────────────
// A "day" is any UTC date on which the student earned XP (any activity)
// OR completed a lesson. currentStreak counts back from today (or
// yesterday, if today is empty but yesterday isn't); longestStreak is
// the longest consecutive run ever.
router.get("/english/me/streak", async (req, res): Promise<void> => {
  const email = await verifyStudentEmail(req);
  if (!email) {
    res.status(401).json({ error: "unauthorized" });
    return;
  }

  // Pull distinct active dates from both sources in a single round trip.
  const rows = await db.execute<{ day: string }>(sql`
    SELECT DISTINCT (created_at AT TIME ZONE 'UTC')::date::text AS day
      FROM xp_events
     WHERE email = ${email}
    UNION
    SELECT DISTINCT (completed_at AT TIME ZONE 'UTC')::date::text AS day
      FROM lesson_completions
     WHERE email = ${email}
    ORDER BY day DESC
  `);

  const days: string[] = (rows as unknown as { rows: { day: string }[] }).rows.map(r => r.day);

  if (days.length === 0) {
    res.json({ currentStreak: 0, longestStreak: 0 });
    return;
  }

  // Helper: parse YYYY-MM-DD → ms since epoch (UTC midnight).
  const toMs = (d: string): number => Date.parse(d + "T00:00:00Z");
  const ONE_DAY = 86_400_000;

  // Current streak — start from today's UTC date and walk backwards.
  const todayMs = toMs(new Date().toISOString().slice(0, 10));
  const set = new Set(days);
  let cursor = todayMs;
  // If they didn't study today yet, the streak still counts if yesterday
  // is present (we don't break their streak until a full day has passed).
  if (!set.has(new Date(cursor).toISOString().slice(0, 10))) {
    cursor -= ONE_DAY;
  }
  let currentStreak = 0;
  while (set.has(new Date(cursor).toISOString().slice(0, 10))) {
    currentStreak++;
    cursor -= ONE_DAY;
  }

  // Longest streak — single pass over the sorted-desc list.
  let longestStreak = 1;
  let run = 1;
  for (let i = 1; i < days.length; i++) {
    const prev = toMs(days[i - 1]);
    const curr = toMs(days[i]);
    if (prev - curr === ONE_DAY) {
      run++;
      if (run > longestStreak) longestStreak = run;
    } else {
      run = 1;
    }
  }
  if (currentStreak > longestStreak) longestStreak = currentStreak;

  res.json({ currentStreak, longestStreak });
});

// ── GET /api/english/me/study-time?range=week ─────────────────────────────
// Sums lesson completions per day over the requested window and converts
// them into minutes using MINUTES_PER_LESSON. range=week → last 7 UTC
// days (today inclusive). Other ranges can be added later.
router.get("/english/me/study-time", async (req, res): Promise<void> => {
  const email = await verifyStudentEmail(req);
  if (!email) {
    res.status(401).json({ error: "unauthorized" });
    return;
  }

  const range = (typeof req.query.range === "string" ? req.query.range : "week").toLowerCase();
  if (range !== "week") {
    res.status(400).json({ error: "unsupported range; only 'week' is supported" });
    return;
  }

  const days = 7;
  const dayWindow = sql.raw(String(days - 1));

  // Pull XP events bucketed by (day, activity) and lesson completions
  // bucketed by day, both filtered to the last `days` UTC days. Two small
  // queries in parallel are simpler than one UNION ALL with mixed columns.
  const [xpRowsRaw, lessonRowsRaw] = await Promise.all([
    db.execute<{ day: string; activity: string; n: number }>(sql`
      SELECT (created_at AT TIME ZONE 'UTC')::date::text AS day,
             activity,
             COUNT(*)::int                                AS n
        FROM xp_events
       WHERE email = ${email}
         AND created_at >= (now() AT TIME ZONE 'UTC')::date - INTERVAL '${dayWindow} days'
       GROUP BY day, activity
    `),
    db.execute<{ day: string; n: number }>(sql`
      SELECT (completed_at AT TIME ZONE 'UTC')::date::text AS day,
             COUNT(*)::int                                  AS n
        FROM lesson_completions
       WHERE email = ${email}
         AND completed_at >= (now() AT TIME ZONE 'UTC')::date - INTERVAL '${dayWindow} days'
       GROUP BY day
    `),
  ]);

  const xpRows = (xpRowsRaw as unknown as { rows: { day: string; activity: string; n: number }[] }).rows;
  const lessonRows = (lessonRowsRaw as unknown as { rows: { day: string; n: number }[] }).rows;

  const minutesPerDay = new Map<string, number>();
  const add = (day: string, mins: number): void => {
    minutesPerDay.set(day, (minutesPerDay.get(day) ?? 0) + mins);
  };
  for (const r of xpRows) {
    const perEvent = MINUTES_PER_ACTIVITY[r.activity] ?? MINUTES_PER_ACTIVITY_DEFAULT;
    add(r.day, r.n * perEvent);
  }
  for (const r of lessonRows) {
    add(r.day, r.n * MINUTES_PER_LESSON);
  }

  // Always emit a row per day in the window so the client can render a
  // bar chart without having to backfill empty days itself.
  const ONE_DAY = 86_400_000;
  const todayMs = Date.parse(new Date().toISOString().slice(0, 10) + "T00:00:00Z");
  const dailyBreakdown: { date: string; minutes: number }[] = [];
  let totalMinutes = 0;
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(todayMs - i * ONE_DAY).toISOString().slice(0, 10);
    const minutes = Math.round(minutesPerDay.get(date) ?? 0);
    dailyBreakdown.push({ date, minutes });
    totalMinutes += minutes;
  }

  res.json({ totalMinutes, dailyBreakdown });
});

export default router;
