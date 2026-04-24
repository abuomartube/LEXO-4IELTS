import { Router } from "express";
import crypto from "node:crypto";
import cron from "node-cron";
import webpush from "web-push";
import { sql } from "drizzle-orm";
import { db } from "@workspace/db";
import { logger } from "../lib/logger";

const router = Router();

const SESSION_SECRET = process.env["SESSION_SECRET"] ?? "fallback-secret";

const VAPID_PUBLIC = process.env["VAPID_PUBLIC_KEY"] || "";
const VAPID_PRIVATE = process.env["VAPID_PRIVATE_KEY"] || "";
const VAPID_EMAIL = process.env["VAPID_EMAIL"] || "mailto:askabuomar@gmail.com";

if (VAPID_PUBLIC && VAPID_PRIVATE) {
  try {
    webpush.setVapidDetails(VAPID_EMAIL, VAPID_PUBLIC, VAPID_PRIVATE);
  } catch (err) {
    logger.error({ err }, "Failed to set VAPID details for admin notifications");
  }
}

const VALID_TYPES = new Set(["reminder", "feature", "announcement", "motivational"]);
const VALID_LEVELS = new Set(["A1", "A2", "B1", "B2", "C1"]);

async function isAdmin(req: import("express").Request): Promise<boolean> {
  const provided = (req.headers["x-admin-password"] as string || "").trim();
  if (!provided) return false;

  const envPass = (process.env["ADMIN_PASSWORD"] || "").trim();
  if (envPass && provided === envPass) return true;

  try {
    const result = await db.execute<{ value: string }>(
      sql`SELECT value FROM settings WHERE key = 'admin_password_override' LIMIT 1`
    );
    const override = result.rows[0]?.value?.trim();
    if (override && provided === override) return true;
  } catch (err) {
    logger.error({ err }, "isAdmin: failed to read settings override");
  }

  return false;
}

function verifyStudentEmail(req: import("express").Request): string | null {
  const email = (req.headers["x-student-email"] as string || "").trim().toLowerCase();
  const token = (req.headers["x-student-token"] as string || "").trim();
  if (!email || !token) return null;
  const expected = crypto.createHmac("sha256", SESSION_SECRET).update(email + ":approved").digest("hex");
  if (token !== expected) return null;
  return email;
}

async function getStudentLevel(email: string): Promise<string | null> {
  const result = await db.execute<{ value: string }>(
    sql`SELECT value FROM user_data WHERE email = ${email} AND key = 'current_level' LIMIT 1`
  );
  const v = result.rows[0]?.value?.trim().toUpperCase();
  return v && VALID_LEVELS.has(v) ? v : null;
}

type NotificationRow = {
  id: number;
  message: string;
  type: string;
  audience: string;
  level: string | null;
  scheduled_at: string | null;
  sent_at: string | null;
  created_at: string;
  created_by: string;
};

// ─── Admin endpoints ─────────────────────────────────────────────────────

// POST /api/admin/notifications  → create + (optionally) send immediately
router.post("/admin/notifications", async (req, res): Promise<void> => {
  if (!(await isAdmin(req))) { res.status(401).json({ error: "Unauthorized" }); return; }

  const body = req.body as {
    message?: unknown;
    type?: unknown;
    audience?: unknown;
    level?: unknown;
    scheduledAt?: unknown;
  };

  const message = typeof body.message === "string" ? body.message.trim() : "";
  const type = typeof body.type === "string" ? body.type.trim() : "";
  const audience = typeof body.audience === "string" ? body.audience.trim() : "all";
  const level = typeof body.level === "string" ? body.level.trim().toUpperCase() : null;
  const scheduledAtRaw = typeof body.scheduledAt === "string" ? body.scheduledAt.trim() : "";

  if (!message || message.length > 2000) {
    res.status(400).json({ error: "Message is required (max 2000 chars)" }); return;
  }
  if (!VALID_TYPES.has(type)) {
    res.status(400).json({ error: "Invalid type" }); return;
  }
  if (audience !== "all" && audience !== "level") {
    res.status(400).json({ error: "audience must be 'all' or 'level'" }); return;
  }
  if (audience === "level" && (!level || !VALID_LEVELS.has(level))) {
    res.status(400).json({ error: "Invalid level (A1, A2, B1, B2, C1)" }); return;
  }

  let scheduledAt: Date | null = null;
  if (scheduledAtRaw) {
    const d = new Date(scheduledAtRaw);
    if (Number.isNaN(d.getTime())) {
      res.status(400).json({ error: "Invalid scheduledAt timestamp" }); return;
    }
    scheduledAt = d;
  }

  // Send immediately when no schedule, or schedule is in the past.
  const now = new Date();
  const sendNow = !scheduledAt || scheduledAt.getTime() <= now.getTime();
  const sentAt = sendNow ? now : null;
  const levelValue = audience === "level" ? level : null;

  try {
    const result = await db.execute<NotificationRow>(sql`
      INSERT INTO notifications (message, type, audience, level, scheduled_at, sent_at)
      VALUES (${message}, ${type}, ${audience}, ${levelValue}, ${scheduledAt}, ${sentAt})
      RETURNING id, message, type, audience, level, scheduled_at, sent_at, created_at, created_by
    `);
    const created = result.rows[0];

    // If sent immediately, fan out web push notifications (fire-and-forget).
    if (created && created.sent_at) {
      dispatchPushForNotification(created.id).catch((err) =>
        logger.error({ err, id: created.id }, "Push dispatch failed (immediate)")
      );
    }

    res.json({ notification: created });
  } catch (err) {
    logger.error({ err }, "Failed to create notification");
    res.status(500).json({ error: "Failed to create notification" });
  }
});

// GET /api/admin/notifications  → list with read counts
router.get("/admin/notifications", async (req, res): Promise<void> => {
  if (!(await isAdmin(req))) { res.status(401).json({ error: "Unauthorized" }); return; }

  try {
    const result = await db.execute<NotificationRow & { open_count: number }>(sql`
      SELECT n.id, n.message, n.type, n.audience, n.level, n.scheduled_at, n.sent_at,
             n.created_at, n.created_by,
             COALESCE(COUNT(r.id)::int, 0) AS open_count
      FROM notifications n
      LEFT JOIN notification_reads r ON r.notification_id = n.id
      GROUP BY n.id
      ORDER BY n.created_at DESC
      LIMIT 200
    `);
    res.json({ notifications: result.rows });
  } catch (err) {
    logger.error({ err }, "Failed to list notifications");
    res.status(500).json({ error: "Failed to list notifications" });
  }
});

// DELETE /api/admin/notifications/:id
router.delete("/admin/notifications/:id", async (req, res): Promise<void> => {
  if (!(await isAdmin(req))) { res.status(401).json({ error: "Unauthorized" }); return; }
  const id = Number(req.params["id"]);
  if (!Number.isFinite(id) || id <= 0) { res.status(400).json({ error: "Invalid id" }); return; }
  try {
    await db.execute(sql`DELETE FROM notifications WHERE id = ${id}`);
    res.json({ success: true });
  } catch (err) {
    logger.error({ err, id }, "Failed to delete notification");
    res.status(500).json({ error: "Failed to delete" });
  }
});

// ─── Student endpoints ───────────────────────────────────────────────────

// GET /api/notifications  → list all sent notifications visible to this student
router.get("/notifications", async (req, res): Promise<void> => {
  const email = verifyStudentEmail(req);
  if (!email) { res.status(401).json({ error: "Unauthorized" }); return; }

  try {
    const studentLevel = await getStudentLevel(email);

    const result = await db.execute<{
      id: number;
      message: string;
      type: string;
      audience: string;
      level: string | null;
      sent_at: string;
      read_at: string | null;
    }>(sql`
      SELECT n.id, n.message, n.type, n.audience, n.level, n.sent_at,
             r.opened_at AS read_at
      FROM notifications n
      LEFT JOIN notification_reads r
        ON r.notification_id = n.id AND r.email = ${email}
      WHERE n.sent_at IS NOT NULL
        AND (
          n.audience = 'all'
          OR (n.audience = 'level' AND n.level = ${studentLevel})
        )
      ORDER BY n.sent_at DESC
      LIMIT 100
    `);

    res.json({ notifications: result.rows });
  } catch (err) {
    logger.error({ err, email }, "Failed to fetch student notifications");
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
});

// GET /api/notifications/unread-count
router.get("/notifications/unread-count", async (req, res): Promise<void> => {
  const email = verifyStudentEmail(req);
  if (!email) { res.status(401).json({ error: "Unauthorized" }); return; }

  try {
    const studentLevel = await getStudentLevel(email);
    const result = await db.execute<{ unread: number }>(sql`
      SELECT COUNT(*)::int AS unread
      FROM notifications n
      LEFT JOIN notification_reads r
        ON r.notification_id = n.id AND r.email = ${email}
      WHERE n.sent_at IS NOT NULL
        AND r.id IS NULL
        AND (
          n.audience = 'all'
          OR (n.audience = 'level' AND n.level = ${studentLevel})
        )
    `);
    res.json({ unread: result.rows[0]?.unread ?? 0 });
  } catch (err) {
    logger.error({ err, email }, "Failed to fetch unread count");
    res.status(500).json({ error: "Failed to fetch unread count" });
  }
});

// POST /api/notifications/:id/read
router.post("/notifications/:id/read", async (req, res): Promise<void> => {
  const email = verifyStudentEmail(req);
  if (!email) { res.status(401).json({ error: "Unauthorized" }); return; }

  const id = Number(req.params["id"]);
  if (!Number.isFinite(id) || id <= 0) { res.status(400).json({ error: "Invalid id" }); return; }

  try {
    // Confirm the notification exists & is visible to this student before
    // recording an open. Otherwise students could inflate open counts.
    const studentLevel = await getStudentLevel(email);
    const visible = await db.execute<{ id: number }>(sql`
      SELECT id FROM notifications
      WHERE id = ${id}
        AND sent_at IS NOT NULL
        AND (
          audience = 'all'
          OR (audience = 'level' AND level = ${studentLevel})
        )
      LIMIT 1
    `);
    if (visible.rows.length === 0) {
      res.status(404).json({ error: "Not found" }); return;
    }

    await db.execute(sql`
      INSERT INTO notification_reads (notification_id, email)
      VALUES (${id}, ${email})
      ON CONFLICT (notification_id, email) DO NOTHING
    `);
    res.json({ success: true });
  } catch (err) {
    logger.error({ err, email, id }, "Failed to mark notification read");
    res.status(500).json({ error: "Failed to mark read" });
  }
});

// ─── Web push fan-out ────────────────────────────────────────────────────

type PushTargetRow = {
  sub_id: number;
  endpoint: string;
  keys: string;
};

/**
 * Look up subscribers eligible for the given notification (by audience + level)
 * and send a real Web Push to each of their subscribed devices. Stale
 * subscriptions (HTTP 410/404) are removed automatically.
 *
 * Fire-and-forget: callers should not await result for request latency.
 */
async function dispatchPushForNotification(notificationId: number): Promise<void> {
  if (!VAPID_PUBLIC || !VAPID_PRIVATE) {
    logger.warn({ notificationId }, "VAPID keys not configured; skipping push fan-out");
    return;
  }

  // Re-read the notification to get authoritative fields (audience, level,
  // type, message). This also confirms it still exists (admin may have
  // deleted it before the scheduler tick fires).
  const nrows = await db.execute<NotificationRow>(sql`
    SELECT id, message, type, audience, level, scheduled_at, sent_at, created_at, created_by
    FROM notifications WHERE id = ${notificationId} LIMIT 1
  `);
  const notif = nrows.rows[0];
  if (!notif || !notif.sent_at) return;

  // Build the eligible-subscription list with the same audience/level rule
  // used by the student GET endpoints.
  let targets: { rows: PushTargetRow[] };
  try {
    if (notif.audience === "all") {
      targets = await db.execute<PushTargetRow>(sql`
        SELECT id AS sub_id, endpoint, keys
        FROM push_subscriptions
      `);
    } else {
      targets = await db.execute<PushTargetRow>(sql`
        SELECT ps.id AS sub_id, ps.endpoint, ps.keys
        FROM push_subscriptions ps
        JOIN user_data ud
          ON ud.email = ps.email
         AND ud.key = 'current_level'
         AND UPPER(TRIM(ud.value)) = ${notif.level}
      `);
    }
  } catch (err) {
    logger.error({ err, notificationId }, "Failed to load push targets");
    return;
  }

  if (targets.rows.length === 0) {
    logger.info({ notificationId, audience: notif.audience, level: notif.level }, "No push targets for notification");
    return;
  }

  // Send the full admin message as-is. Browsers/OSes will visually clip long
  // bodies in the collapsed notification, but the user can expand to see all.
  const payload = JSON.stringify({
    title: "LEXO",
    body: notif.message,
    icon: "/4ielts-logo.png",
    badge: "/4ielts-logo.png",
    tag: `lexo-notif-${notif.id}`,
    data: {
      url: "/",
      notificationId: notif.id,
      type: notif.type,
    },
  });

  let sent = 0;
  let removed = 0;
  let failed = 0;

  await Promise.all(
    targets.rows.map(async (sub) => {
      let parsedKeys: { p256dh: string; auth: string };
      try {
        parsedKeys = JSON.parse(sub.keys) as { p256dh: string; auth: string };
      } catch {
        return; // skip malformed row
      }
      try {
        await webpush.sendNotification(
          { endpoint: sub.endpoint, keys: parsedKeys },
          payload
        );
        sent++;
      } catch (err: unknown) {
        const statusCode = (err as { statusCode?: number })?.statusCode;
        if (statusCode === 410 || statusCode === 404) {
          // Subscription gone (browser uninstalled, user revoked, etc.).
          try {
            await db.execute(sql`DELETE FROM push_subscriptions WHERE id = ${sub.sub_id}`);
            removed++;
          } catch (delErr) {
            logger.error({ delErr, subId: sub.sub_id }, "Failed to delete stale push subscription");
          }
        } else {
          failed++;
          logger.error({ err, subId: sub.sub_id }, "Push send failed");
        }
      }
    })
  );

  logger.info(
    { notificationId, total: targets.rows.length, sent, removed, failed },
    "Admin notification push fan-out complete"
  );
}

// ─── Scheduler tick ──────────────────────────────────────────────────────

async function flushDueNotifications() {
  try {
    const result = await db.execute<{ id: number }>(sql`
      UPDATE notifications
      SET sent_at = NOW()
      WHERE sent_at IS NULL
        AND scheduled_at IS NOT NULL
        AND scheduled_at <= NOW()
      RETURNING id
    `);
    if (result.rows.length > 0) {
      logger.info({ count: result.rows.length }, "Delivered scheduled notifications");
      // Fan out push for each newly-flushed notification.
      for (const { id } of result.rows) {
        dispatchPushForNotification(id).catch((err) =>
          logger.error({ err, id }, "Push dispatch failed (scheduled)")
        );
      }
    }
  } catch (err) {
    logger.error({ err }, "Scheduled notifications tick failed");
  }
}

export function startNotificationsScheduler() {
  // Run every minute. cheap UPDATE; nothing happens unless rows are due.
  cron.schedule("* * * * *", () => {
    flushDueNotifications().catch((err) => logger.error({ err }, "Notifications scheduler error"));
  });
  logger.info("Admin notifications scheduler started (every minute)");
}

export default router;
