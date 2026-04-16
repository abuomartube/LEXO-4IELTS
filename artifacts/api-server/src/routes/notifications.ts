import { Router } from "express";
import crypto from "node:crypto";
import webpush from "web-push";
import cron from "node-cron";
import { db, pushSubscriptionsTable, xpEventsTable } from "@workspace/db";
import { eq, and, gte } from "drizzle-orm";
import { logger } from "../lib/logger";

const router = Router();

const VAPID_PUBLIC = process.env["VAPID_PUBLIC_KEY"] || "";
const VAPID_PRIVATE = process.env["VAPID_PRIVATE_KEY"] || "";
const VAPID_EMAIL = process.env["VAPID_EMAIL"] || "mailto:askabuomar@gmail.com";
const SESSION_SECRET = process.env["SESSION_SECRET"] ?? "fallback-secret";

if (VAPID_PUBLIC && VAPID_PRIVATE) {
  webpush.setVapidDetails(VAPID_EMAIL, VAPID_PUBLIC, VAPID_PRIVATE);
}

function verifyStudentEmail(req: import("express").Request): string | null {
  const email = (req.headers["x-student-email"] as string || "").trim().toLowerCase();
  const token = (req.headers["x-student-token"] as string || "").trim();
  if (!email || !token) return null;
  const expected = crypto.createHmac("sha256", SESSION_SECRET).update(email + ":approved").digest("hex");
  if (token !== expected) return null;
  return email;
}

router.get("/notifications/vapid-key", (_req, res) => {
  res.json({ publicKey: VAPID_PUBLIC });
});

router.post("/notifications/subscribe", async (req, res): Promise<void> => {
  const email = verifyStudentEmail(req);
  if (!email) { res.status(401).json({ error: "Unauthorized" }); return; }

  const { subscription } = req.body as { subscription: { endpoint: string; keys: { p256dh: string; auth: string } } };
  if (!subscription?.endpoint || !subscription?.keys) {
    res.status(400).json({ error: "Invalid subscription" }); return;
  }

  try {
    await db.insert(pushSubscriptionsTable)
      .values({
        email,
        endpoint: subscription.endpoint,
        keys: JSON.stringify(subscription.keys),
      })
      .onConflictDoUpdate({
        target: [pushSubscriptionsTable.email, pushSubscriptionsTable.endpoint],
        set: { keys: JSON.stringify(subscription.keys), createdAt: new Date() },
      });
    res.json({ success: true });
  } catch (err) {
    logger.error({ err }, "Failed to save push subscription");
    res.status(500).json({ error: "Failed to save subscription" });
  }
});

router.post("/notifications/unsubscribe", async (req, res): Promise<void> => {
  const email = verifyStudentEmail(req);
  if (!email) { res.status(401).json({ error: "Unauthorized" }); return; }

  const { endpoint } = req.body as { endpoint?: string };
  try {
    if (endpoint) {
      await db.delete(pushSubscriptionsTable)
        .where(and(eq(pushSubscriptionsTable.email, email), eq(pushSubscriptionsTable.endpoint, endpoint)));
    } else {
      await db.delete(pushSubscriptionsTable)
        .where(eq(pushSubscriptionsTable.email, email));
    }
    res.json({ success: true });
  } catch (err) {
    logger.error({ err }, "Failed to remove push subscription");
    res.status(500).json({ error: "Failed" });
  }
});

async function sendDailyReminders() {
  if (!VAPID_PUBLIC || !VAPID_PRIVATE) {
    logger.warn("VAPID keys not configured, skipping push reminders");
    return;
  }

  logger.info("Running daily push notification reminder check...");

  try {
    const allSubs = await db.select().from(pushSubscriptionsTable);
    if (allSubs.length === 0) return;

    const todayStart = new Date();
    todayStart.setUTCHours(0, 0, 0, 0);

    const todayXp = await db.select({ email: xpEventsTable.email })
      .from(xpEventsTable)
      .where(gte(xpEventsTable.createdAt, todayStart));

    const activeEmails = new Set(todayXp.map((r) => r.email));

    let sent = 0;
    let skipped = 0;
    for (const sub of allSubs) {
      if (activeEmails.has(sub.email)) { skipped++; continue; }

      const pushSub = {
        endpoint: sub.endpoint,
        keys: JSON.parse(sub.keys) as { p256dh: string; auth: string },
      };

      try {
        await webpush.sendNotification(
          pushSub,
          JSON.stringify({
            title: "LEXO Study Reminder 📚",
            body: "You haven't studied today. Keep your streak alive! 🔥",
          })
        );
        sent++;
      } catch (err: unknown) {
        const statusCode = (err as { statusCode?: number })?.statusCode;
        if (statusCode === 410 || statusCode === 404) {
          await db.delete(pushSubscriptionsTable).where(eq(pushSubscriptionsTable.id, sub.id));
          logger.info({ email: sub.email }, "Removed expired push subscription");
        } else {
          logger.error({ err, email: sub.email }, "Failed to send push notification");
        }
      }
    }

    logger.info({ sent, skipped, total: allSubs.length }, "Daily push reminders completed");
  } catch (err) {
    logger.error({ err }, "Daily reminder job failed");
  }
}

export function startReminderScheduler() {
  cron.schedule("0 20 * * *", () => {
    sendDailyReminders().catch((err) => logger.error({ err }, "Reminder scheduler error"));
  }, { timezone: "UTC" });
  logger.info("Push notification reminder scheduler started (daily at 20:00 UTC)");
}

router.post("/notifications/test", async (req, res): Promise<void> => {
  const email = verifyStudentEmail(req);
  if (!email) { res.status(401).json({ error: "Unauthorized" }); return; }

  const subs = await db.select().from(pushSubscriptionsTable).where(eq(pushSubscriptionsTable.email, email));
  if (subs.length === 0) { res.json({ sent: 0 }); return; }

  let sent = 0;
  let failed = 0;
  for (const sub of subs) {
    try {
      await webpush.sendNotification(
        { endpoint: sub.endpoint, keys: JSON.parse(sub.keys) },
        JSON.stringify({ title: "LEXO Test 🔔", body: "Push notifications are working!" })
      );
      sent++;
    } catch (err) {
      failed++;
      logger.error({ err, email: sub.email }, "Test notification failed");
    }
  }
  res.json({ sent, failed });
});

export default router;
