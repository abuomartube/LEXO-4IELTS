import { Router, type IRouter } from "express";
import crypto from "node:crypto";
import bcrypt from "bcryptjs";
import { db, settingsTable, accessRequestsTable, accessCodesTable, reviewsTable, userDataTable, xpEventsTable, weakWordsTable, progressTable, quizScoresTable, orwellSubmissionsTable } from "@workspace/db";
import { eq, desc, and, isNull, sql } from "drizzle-orm";

const router: IRouter = Router();

const SESSION_SECRET = process.env["SESSION_SECRET"] ?? "fallback-secret";
const ENV_ADMIN_PASSWORD = process.env["ADMIN_PASSWORD"] ?? "";

async function getAdminPassword(): Promise<string> {
  try {
    const rows = await db.select().from(settingsTable).where(eq(settingsTable.key, "admin_password_override"));
    if (rows.length > 0 && rows[0].value) return rows[0].value;
  } catch { /* ignore */ }
  return ENV_ADMIN_PASSWORD;
}

function makeToken(email: string): string {
  return crypto.createHmac("sha256", SESSION_SECRET).update(email + ":approved").digest("hex");
}

function safeEqual(a: string, b: string): boolean {
  try {
    const ab = Buffer.from(a, "hex");
    const bb = Buffer.from(b, "hex");
    if (ab.length !== bb.length) return false;
    return crypto.timingSafeEqual(ab, bb);
  } catch { return false; }
}

async function requireAdmin(req: import("express").Request, res: import("express").Response): Promise<boolean> {
  const ap = String((req.headers["x-admin-password"] as string) ?? (req.body?.adminPassword ?? ""));
  const correctPassword = await getAdminPassword();
  if (!correctPassword) { res.status(403).json({ error: "Forbidden" }); return false; }
  // Constant-time comparison to avoid timing leaks.
  const a = Buffer.from(ap);
  const b = Buffer.from(correctPassword);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
    res.status(403).json({ error: "Forbidden" });
    return false;
  }
  return true;
}

function isExpired(row: { expiresAt: Date | null }): boolean {
  return row.expiresAt !== null && row.expiresAt < new Date();
}

function generateCode(): string {
  // 10-char uppercase alphanumeric, no confusing chars (0/O, 1/I, etc.)
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let out = "";
  const bytes = crypto.randomBytes(10);
  for (let i = 0; i < 10; i++) out += alphabet[bytes[i] % alphabet.length];
  return out;
}

// ── Registration: validate single-use code, create pending account ───────

router.post("/access/request", async (req, res): Promise<void> => {
  const { email, accessCode, password } = req.body ?? {};
  if (!email || typeof email !== "string" || !email.includes("@")) {
    res.status(400).json({ error: "Valid email is required" });
    return;
  }
  if (!password || typeof password !== "string" || password.length < 6) {
    res.status(400).json({ error: "Password must be at least 6 characters" });
    return;
  }
  if (!accessCode || typeof accessCode !== "string") {
    res.status(400).json({ error: "Access code is required" });
    return;
  }
  const normalizedEmail = email.trim().toLowerCase();
  const codeValue = accessCode.trim().toUpperCase();

  // Already-registered email? Tell them to log in instead.
  const existing = await db.select().from(accessRequestsTable).where(eq(accessRequestsTable.email, normalizedEmail));
  if (existing.length > 0) {
    res.status(409).json({
      error: "This email is already registered. Please log in instead.",
      status: existing[0].status,
    });
    return;
  }

  // Look up the code; must exist.
  const [codeRow] = await db.select().from(accessCodesTable).where(eq(accessCodesTable.code, codeValue));
  if (!codeRow) {
    res.status(401).json({ error: "Invalid access code. Please check with your instructor." });
    return;
  }
  if (codeRow.usedByEmail) {
    res.status(401).json({ error: "This access code has already been used." });
    return;
  }

  const passwordHash = await bcrypt.hash(password, 10);

  // Atomically consume the code FIRST with a conditional update; only proceed
  // if our update actually claimed the row (defends against concurrent requests).
  const claimed = await db.update(accessCodesTable)
    .set({ usedByEmail: normalizedEmail, usedAt: new Date() })
    .where(and(eq(accessCodesTable.id, codeRow.id), isNull(accessCodesTable.usedByEmail)))
    .returning({ id: accessCodesTable.id });
  if (claimed.length === 0) {
    res.status(401).json({ error: "This access code has already been used." });
    return;
  }

  try {
    await db.insert(accessRequestsTable).values({
      email: normalizedEmail,
      status: "pending",
      passwordHash,
      accessCodeId: codeRow.id,
    });
  } catch (e) {
    // Rollback the code consumption if account creation failed (e.g. unique email collision).
    await db.update(accessCodesTable)
      .set({ usedByEmail: null, usedAt: null })
      .where(eq(accessCodesTable.id, codeRow.id));
    throw e;
  }

  res.json({ status: "pending" });
});

// ── Login: email + password (after admin approval) ───────────────────────

router.post("/access/login", async (req, res): Promise<void> => {
  const { email, password } = req.body ?? {};
  if (!email || typeof email !== "string" || !email.includes("@")) {
    res.status(400).json({ error: "Valid email is required" });
    return;
  }
  if (!password || typeof password !== "string") {
    res.status(400).json({ error: "Password is required" });
    return;
  }
  const normalizedEmail = email.trim().toLowerCase();
  const [row] = await db.select().from(accessRequestsTable).where(eq(accessRequestsTable.email, normalizedEmail));
  if (!row) {
    res.status(404).json({ error: "No account found for this email. Please register with an access code first." });
    return;
  }
  if (row.status === "pending") {
    res.status(403).json({ status: "pending", error: "Your account is awaiting admin approval." });
    return;
  }
  if (row.status === "rejected") {
    res.status(403).json({ status: "rejected", error: "Your request was not approved. Please contact your instructor." });
    return;
  }
  if (row.status === "approved" && isExpired(row)) {
    res.status(403).json({ status: "expired", error: "Your subscription has expired." });
    return;
  }
  if (row.status !== "approved") {
    res.status(403).json({ error: "Account not active." });
    return;
  }

  // Legacy account with no password yet. We do NOT issue a setup token here:
  // doing so would let anyone who knows an approved email take over the account.
  // Setup is only authorised by proving possession of the existing browser
  // session (the legacy localStorage HMAC), enforced in /access/setup-password.
  if (!row.passwordHash) {
    res.status(403).json({
      status: "needs_password_setup",
      error: "Your account is from a previous version of LEXO. Please reopen the app on the device where you originally signed in, or contact your instructor.",
    });
    return;
  }

  const ok = await bcrypt.compare(password, row.passwordHash);
  if (!ok) {
    res.status(401).json({ error: "Incorrect password." });
    return;
  }
  res.json({ status: "approved", token: makeToken(normalizedEmail) });
});

// ── First-time password setup for legacy approved students ───────────────

router.post("/access/setup-password", async (req, res): Promise<void> => {
  const { email, setupToken, password } = req.body ?? {};
  if (!email || typeof email !== "string") { res.status(400).json({ error: "Email is required" }); return; }
  if (!setupToken || typeof setupToken !== "string") { res.status(400).json({ error: "Authentication required" }); return; }
  if (!password || typeof password !== "string" || password.length < 6) {
    res.status(400).json({ error: "Password must be at least 6 characters" });
    return;
  }
  const normalizedEmail = email.trim().toLowerCase();

  // Only accept the existing legacy session HMAC as proof of identity.
  // (We deliberately do NOT issue setup tokens via any public endpoint, to
  // prevent account takeover for legacy passwordless accounts.)
  const expectedSession = makeToken(normalizedEmail);
  if (!safeEqual(setupToken, expectedSession)) {
    res.status(401).json({ error: "Authentication failed. Please reopen LEXO from your usual device." });
    return;
  }

  const [row] = await db.select().from(accessRequestsTable).where(eq(accessRequestsTable.email, normalizedEmail));
  if (!row) { res.status(404).json({ error: "Account not found" }); return; }
  if (row.status !== "approved") { res.status(403).json({ error: "Account not active" }); return; }
  if (isExpired(row)) { res.status(403).json({ error: "Subscription expired" }); return; }
  // True one-time: once a password is set, this endpoint will not overwrite it.
  if (row.passwordHash) {
    res.status(403).json({ error: "Password is already set. Please log in instead." });
    return;
  }

  const passwordHash = await bcrypt.hash(password, 10);
  await db.update(accessRequestsTable)
    .set({ passwordHash })
    .where(eq(accessRequestsTable.id, row.id));

  res.json({ status: "approved", token: makeToken(normalizedEmail) });
});

// ── Polling endpoint (used by the pending screen) ────────────────────────

router.post("/access/check", async (req, res): Promise<void> => {
  const { email } = req.body ?? {};
  if (!email) { res.status(400).json({ status: "invalid" }); return; }
  const normalizedEmail = (email as string).trim().toLowerCase();
  const rows = await db.select().from(accessRequestsTable).where(eq(accessRequestsTable.email, normalizedEmail));
  if (rows.length === 0) { res.json({ status: "not_found" }); return; }
  const row = rows[0];
  if (row.status === "approved") {
    if (isExpired(row)) {
      res.json({ status: "expired" });
    } else {
      // Never auto-issue a session token or setup token over a public endpoint.
      // Students must log in with their password (or, for legacy passwordless
      // users, prove possession of their existing browser session).
      res.json({
        status: "approved",
        needsPasswordSetup: row.passwordHash ? false : true,
      });
    }
  } else {
    res.json({ status: row.status });
  }
});

// ── Admin: approval queue ────────────────────────────────────────────────

router.get("/admin/requests", async (req, res): Promise<void> => {
  if (!await requireAdmin(req, res)) return;
  const rows = await db.select().from(accessRequestsTable).orderBy(desc(accessRequestsTable.requestedAt));
  // Strip password hashes from admin view
  res.json(rows.map(({ passwordHash: _ph, ...r }) => r));
});

router.get("/admin/requests/pending-count", async (req, res): Promise<void> => {
  if (!await requireAdmin(req, res)) return;
  const [row] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(accessRequestsTable)
    .where(eq(accessRequestsTable.status, "pending"));
  res.json({ count: row?.count ?? 0 });
});

router.post("/admin/requests/:id/approve", async (req, res): Promise<void> => {
  if (!await requireAdmin(req, res)) return;
  const id = Number(req.params.id);
  const rows = await db.select().from(accessRequestsTable).where(eq(accessRequestsTable.id, id));
  if (rows.length === 0) { res.status(404).json({ error: "Not found" }); return; }
  const { expiresAt } = req.body ?? {};
  const expiryDate = expiresAt ? new Date(expiresAt as string) : null;
  await db.update(accessRequestsTable)
    .set({ status: "approved", reviewedAt: new Date(), expiresAt: expiryDate })
    .where(eq(accessRequestsTable.id, id));
  res.json({ success: true });
});

router.post("/admin/requests/:id/set-expiry", async (req, res): Promise<void> => {
  if (!await requireAdmin(req, res)) return;
  const id = Number(req.params.id);
  const { expiresAt } = req.body ?? {};
  const expiryDate = expiresAt ? new Date(expiresAt as string) : null;
  await db.update(accessRequestsTable)
    .set({ expiresAt: expiryDate })
    .where(eq(accessRequestsTable.id, id));
  res.json({ success: true });
});

router.post("/admin/requests/:id/reject", async (req, res): Promise<void> => {
  if (!await requireAdmin(req, res)) return;
  const id = Number(req.params.id);
  await db.update(accessRequestsTable)
    .set({ status: "rejected", reviewedAt: new Date() })
    .where(eq(accessRequestsTable.id, id));
  res.json({ success: true });
});

router.delete("/admin/requests/:id", async (req, res): Promise<void> => {
  if (!await requireAdmin(req, res)) return;
  const id = Number(req.params.id);
  await db.delete(accessRequestsTable).where(eq(accessRequestsTable.id, id));
  res.json({ success: true });
});

// ── Admin: single-use access codes ───────────────────────────────────────

router.get("/admin/access-codes", async (req, res): Promise<void> => {
  if (!await requireAdmin(req, res)) return;
  const rows = await db.select().from(accessCodesTable).orderBy(desc(accessCodesTable.createdAt));
  const [unusedRow] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(accessCodesTable)
    .where(isNull(accessCodesTable.usedByEmail));
  res.json({ codes: rows, unusedCount: unusedRow?.count ?? 0 });
});

router.post("/admin/access-codes", async (req, res): Promise<void> => {
  if (!await requireAdmin(req, res)) return;
  const { count, note } = req.body ?? {};
  const n = Math.max(1, Math.min(50, Number(count) || 1));
  const cleanNote = note && typeof note === "string" ? note.trim().slice(0, 200) : null;

  const created: Array<typeof accessCodesTable.$inferSelect> = [];
  for (let i = 0; i < n; i++) {
    // Retry up to 3 times in case of unique collision (very unlikely with 10 chars)
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        const code = generateCode();
        const [row] = await db.insert(accessCodesTable)
          .values({ code, note: cleanNote })
          .returning();
        created.push(row);
        break;
      } catch (e) {
        if (attempt === 2) throw e;
      }
    }
  }
  res.json({ created });
});

router.delete("/admin/access-codes/:id", async (req, res): Promise<void> => {
  if (!await requireAdmin(req, res)) return;
  const id = Number(req.params.id);
  if (!Number.isFinite(id)) { res.status(400).json({ error: "Bad id" }); return; }
  await db.delete(accessCodesTable).where(eq(accessCodesTable.id, id));
  res.json({ success: true });
});

// Legacy endpoints kept for backwards compat with the existing /admin page
// (they now read/manage the global "site_password" setting, which is no
// longer used for registration but is still surfaced in the admin UI).

router.post("/admin/change-access-code", async (req, res): Promise<void> => {
  if (!await requireAdmin(req, res)) return;
  const { newCode } = req.body ?? {};
  if (!newCode || typeof newCode !== "string" || newCode.trim().length < 4) {
    res.status(400).json({ error: "Access code must be at least 4 characters" });
    return;
  }
  await db.insert(settingsTable)
    .values({ key: "site_password", value: newCode.trim() })
    .onConflictDoUpdate({ target: settingsTable.key, set: { value: newCode.trim() } });
  res.json({ success: true });
});

router.get("/admin/access-code", async (req, res): Promise<void> => {
  if (!await requireAdmin(req, res)) return;
  const rows = await db.select().from(settingsTable).where(eq(settingsTable.key, "site_password"));
  res.json({ code: rows[0]?.value ?? "" });
});

router.post("/admin/change-password", async (req, res): Promise<void> => {
  if (!await requireAdmin(req, res)) return;
  const { newPassword } = req.body ?? {};
  if (!newPassword || typeof newPassword !== "string" || newPassword.trim().length < 6) {
    res.status(400).json({ error: "Password must be at least 6 characters" });
    return;
  }
  await db.insert(settingsTable)
    .values({ key: "admin_password_override", value: newPassword.trim() })
    .onConflictDoUpdate({ target: settingsTable.key, set: { value: newPassword.trim() } });
  res.json({ success: true });
});

// ── Reviews ───────────────────────────────────────────────────────────────────

router.post("/reviews", async (req, res): Promise<void> => {
  const { email, name, comment, rating } = req.body ?? {};
  if (!email || typeof email !== "string" || !email.includes("@")) {
    res.status(400).json({ error: "Valid email is required" });
    return;
  }
  if (!comment || typeof comment !== "string" || comment.trim().length < 10) {
    res.status(400).json({ error: "Comment must be at least 10 characters" });
    return;
  }
  const ratingNum = Number(rating);
  if (!ratingNum || ratingNum < 1 || ratingNum > 5) {
    res.status(400).json({ error: "Rating must be 1–5" });
    return;
  }
  const normalizedEmail = (email as string).trim().toLowerCase();
  await db.insert(reviewsTable).values({
    email: normalizedEmail,
    name: name ? String(name).trim().slice(0, 80) : null,
    comment: comment.trim().slice(0, 2000),
    rating: ratingNum,
    status: "pending",
  });
  res.json({ success: true });
});

router.get("/reviews/public", async (_req, res): Promise<void> => {
  const rows = await db.select().from(reviewsTable)
    .where(eq(reviewsTable.status, "approved"))
    .orderBy(desc(reviewsTable.createdAt));
  res.json(rows);
});

router.get("/admin/reviews", async (req, res): Promise<void> => {
  if (!await requireAdmin(req, res)) return;
  const rows = await db.select().from(reviewsTable).orderBy(desc(reviewsTable.createdAt));
  res.json(rows);
});

router.post("/admin/reviews/:id/approve", async (req, res): Promise<void> => {
  if (!await requireAdmin(req, res)) return;
  const id = Number(req.params.id);
  await db.update(reviewsTable)
    .set({ status: "approved", reviewedAt: new Date() })
    .where(eq(reviewsTable.id, id));
  res.json({ success: true });
});

router.post("/admin/reviews/:id/reject", async (req, res): Promise<void> => {
  if (!await requireAdmin(req, res)) return;
  const id = Number(req.params.id);
  await db.update(reviewsTable)
    .set({ status: "rejected", reviewedAt: new Date() })
    .where(eq(reviewsTable.id, id));
  res.json({ success: true });
});

router.delete("/admin/reviews/:id", async (req, res): Promise<void> => {
  if (!await requireAdmin(req, res)) return;
  const id = Number(req.params.id);
  await db.delete(reviewsTable).where(eq(reviewsTable.id, id));
  res.json({ success: true });
});

// ── Teacher Dashboard ───────────────────────────────────────────────────────

router.get("/teacher/students", async (req, res): Promise<void> => {
  if (!await requireAdmin(req, res)) return;

  const students = await db
    .select()
    .from(accessRequestsTable)
    .where(eq(accessRequestsTable.status, "approved"))
    .orderBy(desc(accessRequestsTable.requestedAt));

  const results = await Promise.all(
    students.map(async (s) => {
      const [xpRow] = await db
        .select({ total: sql<number>`coalesce(sum(${xpEventsTable.xp}),0)::int` })
        .from(xpEventsTable)
        .where(eq(xpEventsTable.email, s.email));
      const totalXp = xpRow?.total ?? 0;

      const xpLevels = [
        { min: 3500, level: 8, name: "Master" },
        { min: 2000, level: 7, name: "Expert" },
        { min: 1200, level: 6, name: "Advanced" },
        { min: 700, level: 5, name: "Upper Int." },
        { min: 350, level: 4, name: "Intermediate" },
        { min: 150, level: 3, name: "Pre-Int." },
        { min: 50, level: 2, name: "Elementary" },
        { min: 0, level: 1, name: "Starter" },
      ];
      const lvl = xpLevels.find((l) => totalXp >= l.min)!;

      const [weakRow] = await db
        .select({ count: sql<number>`count(*)::int` })
        .from(weakWordsTable)
        .where(eq(weakWordsTable.email, s.email));
      const weakCount = weakRow?.count ?? 0;

      const latestProgress = await db
        .selectDistinctOn([progressTable.flashcardId], {
          flashcardId: progressTable.flashcardId,
          known: progressTable.known,
        })
        .from(progressTable)
        .where(eq(progressTable.email, s.email))
        .orderBy(progressTable.flashcardId, sql`${progressTable.reviewedAt} desc`);
      const wordsKnown = latestProgress.filter((p) => p.known).length;

      const streakDays = await db
        .select({ day: sql<string>`date(${progressTable.reviewedAt})::text` })
        .from(progressTable)
        .where(eq(progressTable.email, s.email))
        .groupBy(sql`date(${progressTable.reviewedAt})`)
        .orderBy(sql`date(${progressTable.reviewedAt}) desc`);

      let streak = 0;
      if (streakDays.length > 0) {
        const today = new Date().toISOString().slice(0, 10);
        const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
        const days = streakDays.map((r) => r.day);
        let current = days[0] === today || days[0] === yesterday ? days[0] : null;
        if (current) {
          for (const day of days) {
            const diff = Math.round(
              (new Date(current).getTime() - new Date(day).getTime()) / 86400000
            );
            if (diff <= 1) { streak++; current = day; } else break;
          }
        }
      }

      const [quizRow] = await db
        .select({ count: sql<number>`count(*)::int` })
        .from(quizScoresTable)
        .where(eq(quizScoresTable.email, s.email));
      const quizzesTaken = quizRow?.count ?? 0;

      const lastActivity = streakDays.length > 0 ? streakDays[0].day : null;

      const [assignRow] = await db
        .select({ count: sql<number>`count(*)::int` })
        .from(orwellSubmissionsTable)
        .where(and(eq(orwellSubmissionsTable.email, s.email), eq(orwellSubmissionsTable.status, "submitted")));
      const assignmentsCompleted = assignRow?.count ?? 0;

      return {
        email: s.email,
        joinedAt: s.requestedAt,
        xp: totalXp,
        level: lvl.level,
        levelName: lvl.name,
        streak,
        weakWordsCount: weakCount,
        wordsKnown,
        quizzesTaken,
        assignmentsCompleted,
        lastActivity,
      };
    })
  );

  res.json(results);
});

// ── Persistent session ───────────────────────────────────────────────────────

const SESSION_KEY = "persistent_session";

router.post("/session/save", async (req, res): Promise<void> => {
  const { email, token } = req.body ?? {};
  if (!email || !token) { res.status(400).json({ error: "Missing email or token" }); return; }
  const normalizedEmail = (email as string).trim().toLowerCase();
  const expectedToken = makeToken(normalizedEmail);
  if (token !== expectedToken) { res.status(401).json({ error: "Invalid token" }); return; }
  await db.insert(userDataTable)
    .values({ email: normalizedEmail, key: SESSION_KEY, value: token, updatedAt: new Date() })
    .onConflictDoUpdate({
      target: [userDataTable.email, userDataTable.key],
      set: { value: token, updatedAt: new Date() },
    });
  res.json({ success: true });
});

router.post("/session/check", async (req, res): Promise<void> => {
  const { email } = req.body ?? {};
  if (!email) { res.json({ status: "none" }); return; }
  const normalizedEmail = (email as string).trim().toLowerCase();
  const [row] = await db.select().from(userDataTable)
    .where(and(eq(userDataTable.email, normalizedEmail), eq(userDataTable.key, SESSION_KEY)))
    .limit(1);
  if (!row || !row.value) { res.json({ status: "none" }); return; }
  const accessRows = await db.select().from(accessRequestsTable)
    .where(eq(accessRequestsTable.email, normalizedEmail));
  if (accessRows.length === 0) { res.json({ status: "none" }); return; }
  const access = accessRows[0];
  if (access.status !== "approved") { res.json({ status: "none" }); return; }
  if (isExpired(access)) {
    await db.delete(userDataTable)
      .where(and(eq(userDataTable.email, normalizedEmail), eq(userDataTable.key, SESSION_KEY)));
    res.json({ status: "expired" });
    return;
  }
  const expectedToken = makeToken(normalizedEmail);
  if (row.value !== expectedToken) { res.json({ status: "none" }); return; }
  res.json({ status: "active", token: expectedToken });
});

router.post("/session/clear", async (req, res): Promise<void> => {
  const { email, token } = req.body ?? {};
  if (!email) { res.json({ success: true }); return; }
  const normalizedEmail = (email as string).trim().toLowerCase();
  if (token) {
    const expectedToken = makeToken(normalizedEmail);
    if (token !== expectedToken) { res.status(401).json({ error: "Invalid token" }); return; }
  }
  await db.delete(userDataTable)
    .where(and(eq(userDataTable.email, normalizedEmail), eq(userDataTable.key, SESSION_KEY)));
  res.json({ success: true });
});

export default router;
