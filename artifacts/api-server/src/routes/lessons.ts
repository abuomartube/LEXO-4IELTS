import { Router, type IRouter } from "express";
import crypto from "node:crypto";
import {
  db,
  accessRequestsTable,
  settingsTable,
  lessonsTable,
  lessonCompletionsTable,
} from "@workspace/db";
import { and, asc, desc, eq, sql } from "drizzle-orm";

const LIBRARY_TITLE = "Pro Tips";

// Allowed course identifiers stored in the DB. Display names live on the
// client (Brick by Brick / The Upper Leap) so admins can rebrand without a
// migration. Anything outside this set is rejected by the admin endpoints.
const ALLOWED_COURSES = new Set(["intro", "advanced"]);
function normalizeCourse(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const v = value.trim().toLowerCase();
  return ALLOWED_COURSES.has(v) ? v : null;
}

const router: IRouter = Router();

const SESSION_SECRET = process.env["SESSION_SECRET"] ?? "fallback-secret";
const ENV_ADMIN_PASSWORD = process.env["ADMIN_PASSWORD"] ?? "";

// ── Auth helpers (mirror the patterns used in orwell.ts / auth.ts) ────────
async function verifyStudentEmail(req: import("express").Request): Promise<string | null> {
  const email = (req.headers["x-student-email"] as string)?.trim().toLowerCase();
  const token = req.headers["x-student-token"] as string;
  if (!email || !token) return null;
  const expected = crypto.createHmac("sha256", SESSION_SECRET).update(email + ":approved").digest("hex");
  try {
    const a = Buffer.from(token, "hex");
    const b = Buffer.from(expected, "hex");
    if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
  } catch { return null; }
  const rows = await db.select().from(accessRequestsTable).where(eq(accessRequestsTable.email, email));
  if (rows.length === 0 || rows[0].status !== "approved") return null;
  if (rows[0].expiresAt && rows[0].expiresAt < new Date()) return null;
  return email;
}

async function getAdminPassword(): Promise<string> {
  try {
    const rows = await db.select().from(settingsTable).where(eq(settingsTable.key, "admin_password_override"));
    if (rows.length > 0 && rows[0].value) return rows[0].value;
  } catch { /* ignore */ }
  return ENV_ADMIN_PASSWORD;
}

async function requireAdmin(req: import("express").Request, res: import("express").Response): Promise<boolean> {
  const ap = (req.headers["x-admin-password"] as string) ?? (req.body?.adminPassword ?? "");
  const correctPassword = await getAdminPassword();
  if (!correctPassword || ap !== correctPassword) {
    res.status(403).json({ error: "Forbidden" });
    return false;
  }
  return true;
}

function isValidVimeoUrl(s: string): boolean {
  // Accept any URL containing vimeo.com or player.vimeo.com (also numeric ID alone).
  if (typeof s !== "string") return false;
  const t = s.trim();
  if (/^\d{6,12}$/.test(t)) return true;
  return /vimeo\.com\//i.test(t);
}

// Always return a player-embeddable URL (https://player.vimeo.com/video/<id>).
// Falls back to whatever the admin entered if we cannot extract an id.
function toEmbedUrl(input: string): string {
  const t = input.trim();
  if (/^\d{6,12}$/.test(t)) return `https://player.vimeo.com/video/${t}`;
  // Accept common Vimeo shapes:
  //   https://vimeo.com/123456789
  //   https://vimeo.com/123456789/abcdef (private hash)
  //   https://player.vimeo.com/video/123456789
  //   https://vimeo.com/channels/.../123456789
  //   https://vimeo.com/groups/.../videos/123456789
  const idMatch = t.match(/(?:vimeo\.com\/(?:video\/|channels\/[^/]+\/|groups\/[^/]+\/videos\/)?)(\d{6,12})(?:\/([a-zA-Z0-9]+))?/);
  if (idMatch) {
    const id = idMatch[1];
    const hash = idMatch[2];
    return hash ? `https://player.vimeo.com/video/${id}?h=${hash}` : `https://player.vimeo.com/video/${id}`;
  }
  return t;
}

// ── Student endpoints ─────────────────────────────────────────────────────

// GET /api/lessons → returns the single shared library + completion flags.
router.get("/lessons", async (req, res): Promise<void> => {
  const email = await verifyStudentEmail(req);
  if (!email) { res.status(401).json({ error: "Unauthorized" }); return; }

  const lessons = await db
    .select()
    .from(lessonsTable)
    .orderBy(asc(lessonsTable.orderIndex), asc(lessonsTable.id));

  const completed = await db
    .select({ lessonId: lessonCompletionsTable.lessonId })
    .from(lessonCompletionsTable)
    .where(eq(lessonCompletionsTable.email, email));
  const completedSet = new Set(completed.map((c) => c.lessonId));

  res.json({
    libraryTitle: LIBRARY_TITLE,
    lessons: lessons.map((l) => ({
      id: l.id,
      course: l.course,
      title: l.title,
      vimeoUrl: l.vimeoUrl,
      embedUrl: toEmbedUrl(l.vimeoUrl),
      orderIndex: l.orderIndex,
      completed: completedSet.has(l.id),
    })),
  });
});

// POST /api/lessons/:id/complete → mark a lesson done for the student.
router.post("/lessons/:id/complete", async (req, res): Promise<void> => {
  const email = await verifyStudentEmail(req);
  if (!email) { res.status(401).json({ error: "Unauthorized" }); return; }
  const lessonId = Number(req.params.id);
  if (!Number.isFinite(lessonId)) { res.status(400).json({ error: "Bad lesson id" }); return; }

  const [lesson] = await db.select().from(lessonsTable).where(eq(lessonsTable.id, lessonId));
  if (!lesson) { res.status(404).json({ error: "Lesson not found" }); return; }

  await db
    .insert(lessonCompletionsTable)
    .values({ email, lessonId })
    .onConflictDoNothing();

  res.json({ success: true, lessonId, completed: true });
});

// DELETE /api/lessons/:id/complete → un-mark a lesson.
router.delete("/lessons/:id/complete", async (req, res): Promise<void> => {
  const email = await verifyStudentEmail(req);
  if (!email) { res.status(401).json({ error: "Unauthorized" }); return; }
  const lessonId = Number(req.params.id);
  if (!Number.isFinite(lessonId)) { res.status(400).json({ error: "Bad lesson id" }); return; }

  await db
    .delete(lessonCompletionsTable)
    .where(and(eq(lessonCompletionsTable.email, email), eq(lessonCompletionsTable.lessonId, lessonId)));

  res.json({ success: true, lessonId, completed: false });
});

// ── Admin endpoints ───────────────────────────────────────────────────────

// GET /api/admin/lessons → flat list of all lessons.
router.get("/admin/lessons", async (req, res): Promise<void> => {
  if (!await requireAdmin(req, res)) return;
  const all = await db
    .select()
    .from(lessonsTable)
    .orderBy(asc(lessonsTable.orderIndex), asc(lessonsTable.id));

  res.json({
    libraryTitle: LIBRARY_TITLE,
    lessons: all.map((l) => ({ ...l, embedUrl: toEmbedUrl(l.vimeoUrl) })),
  });
});

// POST /api/admin/lessons → create a new lesson.
router.post("/admin/lessons", async (req, res): Promise<void> => {
  if (!await requireAdmin(req, res)) return;
  const { title, vimeoUrl, course } = req.body ?? {};

  if (!title || typeof title !== "string" || !title.trim()) {
    res.status(400).json({ error: "Title is required" });
    return;
  }
  if (!vimeoUrl || typeof vimeoUrl !== "string" || !isValidVimeoUrl(vimeoUrl)) {
    res.status(400).json({ error: "A valid Vimeo URL or numeric video ID is required" });
    return;
  }
  const courseKey = normalizeCourse(course) ?? "intro";

  // Order is per-course so each track has its own 1..N sequence.
  const [maxRow] = await db
    .select({ max: sql<number>`coalesce(max(${lessonsTable.orderIndex}), 0)::int` })
    .from(lessonsTable)
    .where(eq(lessonsTable.course, courseKey));
  const nextIndex = (maxRow?.max ?? 0) + 1;

  const [created] = await db
    .insert(lessonsTable)
    .values({ course: courseKey, title: title.trim(), vimeoUrl: vimeoUrl.trim(), orderIndex: nextIndex })
    .returning();

  res.json({ ...created, embedUrl: toEmbedUrl(created.vimeoUrl) });
});

// PATCH /api/admin/lessons/:id → update title / url / order.
router.patch("/admin/lessons/:id", async (req, res): Promise<void> => {
  if (!await requireAdmin(req, res)) return;
  const id = Number(req.params.id);
  if (!Number.isFinite(id)) { res.status(400).json({ error: "Bad id" }); return; }
  const { title, vimeoUrl, orderIndex, course } = req.body ?? {};

  const updates: Partial<{ title: string; vimeoUrl: string; orderIndex: number; course: string }> = {};
  if (typeof title === "string" && title.trim()) updates.title = title.trim();
  if (typeof vimeoUrl === "string" && isValidVimeoUrl(vimeoUrl)) updates.vimeoUrl = vimeoUrl.trim();
  if (typeof orderIndex === "number" && Number.isFinite(orderIndex)) updates.orderIndex = orderIndex;
  const normalizedCourse = normalizeCourse(course);
  if (normalizedCourse) updates.course = normalizedCourse;
  if (Object.keys(updates).length === 0) { res.status(400).json({ error: "Nothing to update" }); return; }

  const [updated] = await db
    .update(lessonsTable)
    .set(updates)
    .where(eq(lessonsTable.id, id))
    .returning();
  if (!updated) { res.status(404).json({ error: "Lesson not found" }); return; }
  res.json({ ...updated, embedUrl: toEmbedUrl(updated.vimeoUrl) });
});

// DELETE /api/admin/lessons/:id
router.delete("/admin/lessons/:id", async (req, res): Promise<void> => {
  if (!await requireAdmin(req, res)) return;
  const id = Number(req.params.id);
  if (!Number.isFinite(id)) { res.status(400).json({ error: "Bad id" }); return; }
  await db.delete(lessonsTable).where(eq(lessonsTable.id, id));
  res.json({ success: true });
});

// GET /api/admin/lesson-completion-counts → [{ email, completed }]
router.get("/admin/lesson-completion-counts", async (req, res): Promise<void> => {
  if (!await requireAdmin(req, res)) return;
  const rows = await db
    .select({
      email: lessonCompletionsTable.email,
      completed: sql<number>`count(*)::int`,
    })
    .from(lessonCompletionsTable)
    .groupBy(lessonCompletionsTable.email)
    .orderBy(desc(sql`count(*)`));
  res.json(rows);
});

export default router;
