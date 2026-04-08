import { Router, type IRouter } from "express";
import crypto from "node:crypto";
import { db, settingsTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router: IRouter = Router();

const SESSION_SECRET = process.env["SESSION_SECRET"] ?? "fallback-secret";
const ADMIN_PASSWORD = process.env["ADMIN_PASSWORD"] ?? "";
const DEFAULT_SITE_PASSWORD = "ielts2025";

async function getSitePassword(): Promise<string> {
  const rows = await db.select().from(settingsTable).where(eq(settingsTable.key, "site_password"));
  if (rows.length > 0) return rows[0].value;
  await db.insert(settingsTable).values({ key: "site_password", value: DEFAULT_SITE_PASSWORD }).onConflictDoNothing();
  return DEFAULT_SITE_PASSWORD;
}

function makeToken(password: string): string {
  return crypto.createHmac("sha256", SESSION_SECRET).update(password).digest("hex");
}

router.post("/auth/verify", async (req, res): Promise<void> => {
  const { password } = req.body ?? {};
  if (!password || typeof password !== "string") {
    res.status(400).json({ error: "Password is required" });
    return;
  }
  const sitePassword = await getSitePassword();
  if (password !== sitePassword) {
    res.status(401).json({ error: "Incorrect password" });
    return;
  }
  res.json({ token: makeToken(sitePassword) });
});

router.post("/auth/check", async (req, res): Promise<void> => {
  const { token } = req.body ?? {};
  if (!token || typeof token !== "string") {
    res.status(401).json({ valid: false });
    return;
  }
  const sitePassword = await getSitePassword();
  const expected = makeToken(sitePassword);
  res.json({ valid: token === expected });
});

router.post("/admin/change-password", async (req, res): Promise<void> => {
  const { adminPassword, newPassword } = req.body ?? {};
  if (!ADMIN_PASSWORD) {
    res.status(503).json({ error: "Admin password not configured on server" });
    return;
  }
  if (adminPassword !== ADMIN_PASSWORD) {
    res.status(403).json({ error: "Wrong admin password" });
    return;
  }
  if (!newPassword || typeof newPassword !== "string" || newPassword.length < 4) {
    res.status(400).json({ error: "New password must be at least 4 characters" });
    return;
  }
  await db.insert(settingsTable)
    .values({ key: "site_password", value: newPassword })
    .onConflictDoUpdate({ target: settingsTable.key, set: { value: newPassword } });
  res.json({ success: true });
});

router.get("/admin/current-password", async (req, res): Promise<void> => {
  const adminPassword = req.headers["x-admin-password"];
  if (!ADMIN_PASSWORD || adminPassword !== ADMIN_PASSWORD) {
    res.status(403).json({ error: "Forbidden" });
    return;
  }
  const sitePassword = await getSitePassword();
  res.json({ password: sitePassword });
});

export default router;
