import { Router, type IRouter } from "express";
import crypto from "node:crypto";
import { db, settingsTable, accessRequestsTable, reviewsTable } from "@workspace/db";
import { eq, desc } from "drizzle-orm";

const router: IRouter = Router();

const SESSION_SECRET = process.env["SESSION_SECRET"] ?? "fallback-secret";
const ENV_ADMIN_PASSWORD = process.env["ADMIN_PASSWORD"] ?? "";
const DEFAULT_ACCESS_CODE = "ielts2025";

async function getAccessCode(): Promise<string> {
  const rows = await db.select().from(settingsTable).where(eq(settingsTable.key, "site_password"));
  if (rows.length > 0) return rows[0].value;
  await db.insert(settingsTable).values({ key: "site_password", value: DEFAULT_ACCESS_CODE }).onConflictDoNothing();
  return DEFAULT_ACCESS_CODE;
}

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

async function requireAdmin(req: import("express").Request, res: import("express").Response): Promise<boolean> {
  const ap = (req.headers["x-admin-password"] as string) ?? (req.body?.adminPassword ?? "");
  const correctPassword = await getAdminPassword();
  if (!correctPassword || ap !== correctPassword) {
    res.status(403).json({ error: "Forbidden" });
    return false;
  }
  return true;
}

function isExpired(row: { expiresAt: Date | null }): boolean {
  return row.expiresAt !== null && row.expiresAt < new Date();
}

// ── Access request & check ───────────────────────────────────────────────────

router.post("/access/request", async (req, res): Promise<void> => {
  const { email, accessCode } = req.body ?? {};
  if (!email || typeof email !== "string" || !email.includes("@")) {
    res.status(400).json({ error: "Valid email is required" });
    return;
  }
  if (!accessCode || typeof accessCode !== "string") {
    res.status(400).json({ error: "Access code is required" });
    return;
  }
  const correctCode = await getAccessCode();
  if (accessCode.trim() !== correctCode) {
    res.status(401).json({ error: "Incorrect access code. Please check with your instructor." });
    return;
  }
  const normalizedEmail = email.trim().toLowerCase();
  const existing = await db.select().from(accessRequestsTable).where(eq(accessRequestsTable.email, normalizedEmail));
  if (existing.length > 0) {
    const row = existing[0];
    if (row.status === "approved") {
      if (isExpired(row)) {
        res.json({ status: "expired" });
      } else {
        res.json({ status: "approved", token: makeToken(normalizedEmail) });
      }
    } else if (row.status === "rejected") {
      res.status(403).json({ error: "Your request was not approved. Please contact your instructor." });
    } else {
      res.json({ status: "pending" });
    }
    return;
  }
  await db.insert(accessRequestsTable).values({ email: normalizedEmail, status: "pending" });
  res.json({ status: "pending" });
});

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
      res.json({ status: "approved", token: makeToken(normalizedEmail) });
    }
  } else {
    res.json({ status: row.status });
  }
});

// ── Admin: requests ───────────────────────────────────────────────────────────

router.get("/admin/requests", async (req, res): Promise<void> => {
  if (!await requireAdmin(req, res)) return;
  const rows = await db.select().from(accessRequestsTable).orderBy(desc(accessRequestsTable.requestedAt));
  res.json(rows);
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

// ── Admin: access code & admin password ──────────────────────────────────────

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
  const code = await getAccessCode();
  res.json({ code });
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

export default router;
