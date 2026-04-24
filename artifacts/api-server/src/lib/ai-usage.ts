// AI usage tracking + admin alerts.
//
// Records every billable AI call (Churchill speaking + Orwell writing) and
// raises admin alerts when:
//   - any single student makes more than STUDENT_DAILY_CALL_THRESHOLD calls
//     in a UTC day, or
//   - the total daily AI cost across all students crosses DAILY_COST_ALERT_USD.
//
// Alerts are deduplicated through admin_alerts_sent so we never send the same
// alert twice on the same day. Tracking is best-effort: every call is wrapped
// in try/catch so usage logging never affects the actual AI response.
import { db, aiUsageEventsTable, adminAlertsSentTable } from "@workspace/db";
import { and, eq, gte, sql } from "drizzle-orm";
import { logger } from "./logger";
import { sendAdminAlert, getAdminAlertEmail } from "./email";

export type AiRoute = "churchill" | "orwell";

export const STUDENT_DAILY_CALL_THRESHOLD = Number(process.env["STUDENT_DAILY_CALL_THRESHOLD"] || 20);
export const DAILY_COST_ALERT_USD = Number(process.env["DAILY_COST_ALERT_USD"] || 10);

// Per-call cost estimates (USD). These are rough — Churchill = Claude Sonnet,
// Orwell = Claude Sonnet. We keep the math conservative and easy to override
// without a redeploy.
const COST_BY_ENDPOINT: Record<string, number> = {
  // Orwell (essay grading) — full essay rubric, ~8K-token completions
  "/orwell/submit": 0.05,
  "/orwell/freecheck": 0.04,
  "/orwell/coach-summary": 0.02,
  // Churchill (speaking) — short streamed turn or rubric report
  "/speaking/message": 0.005,
  "/speaking/report": 0.02,
};

function todayKeyUTC(): string {
  return new Date().toISOString().slice(0, 10); // YYYY-MM-DD
}

function startOfTodayUTC(): Date {
  const d = new Date();
  d.setUTCHours(0, 0, 0, 0);
  return d;
}

export interface RecordAiUsageParams {
  email: string | null | undefined;
  route: AiRoute;
  endpoint: string;
  costUsdOverride?: number;
}

/**
 * Record one AI call. Never throws — failures are logged and swallowed so the
 * caller's response path is unaffected.
 */
export async function recordAiUsage(params: RecordAiUsageParams): Promise<void> {
  const { email, route, endpoint, costUsdOverride } = params;
  if (!email) return; // anonymous calls aren't tracked

  const cost = typeof costUsdOverride === "number"
    ? costUsdOverride
    : (COST_BY_ENDPOINT[endpoint] ?? 0.01);

  try {
    await db.insert(aiUsageEventsTable).values({
      email: email.trim().toLowerCase(),
      route,
      endpoint,
      costUsd: cost,
    });
  } catch (err) {
    logger.error({ err, email, route, endpoint }, "Failed to record AI usage event");
    return;
  }

  // Run threshold check in the background — don't block the caller.
  void checkAndAlert(email.trim().toLowerCase()).catch((err) => {
    logger.error({ err, email }, "AI usage threshold check failed");
  });
}

async function alertAlreadySent(alertKey: string): Promise<boolean> {
  // We rely on the unique index on alert_key. `onConflictDoNothing` makes the
  // dedup explicit: if the row was inserted, this is a fresh alert; otherwise
  // (returning array empty) the alert was already sent today and we skip it.
  // Real DB errors (connection, etc.) propagate so we don't silently
  // suppress alerts in non-dedup failure modes.
  const inserted = await db
    .insert(adminAlertsSentTable)
    .values({ alertKey })
    .onConflictDoNothing({ target: adminAlertsSentTable.alertKey })
    .returning({ id: adminAlertsSentTable.id });
  return inserted.length === 0;
}

async function checkAndAlert(email: string): Promise<void> {
  const today = todayKeyUTC();
  const since = startOfTodayUTC();

  // 1. Per-student threshold
  const [studentCountRow] = await db
    .select({ c: sql<number>`count(*)::int` })
    .from(aiUsageEventsTable)
    .where(and(
      eq(aiUsageEventsTable.email, email),
      gte(aiUsageEventsTable.createdAt, since),
    ));
  const studentCount = studentCountRow?.c ?? 0;

  if (studentCount > STUDENT_DAILY_CALL_THRESHOLD) {
    const key = `student_threshold:${email}:${today}`;
    if (!(await alertAlreadySent(key))) {
      const subject = `[LEXO] High AI usage: ${email} (${studentCount} calls today)`;
      const text =
        `Heads up — student ${email} has made ${studentCount} AI calls today (UTC), ` +
        `which is above the threshold of ${STUDENT_DAILY_CALL_THRESHOLD}.\n\n` +
        `This is informational only — the student has not been blocked. ` +
        `Open the Teacher Dashboard to investigate.\n\n— LEXO`;
      const html =
        `<p>Heads up — student <strong>${email}</strong> has made ` +
        `<strong>${studentCount}</strong> AI calls today (UTC), which is above the ` +
        `threshold of ${STUDENT_DAILY_CALL_THRESHOLD}.</p>` +
        `<p>This is informational only — the student has not been blocked. ` +
        `Open the Teacher Dashboard to investigate.</p><p>— LEXO</p>`;
      await sendAdminAlert({ subject, text, html });
      logger.info({ email, studentCount, recipient: getAdminAlertEmail() }, "Student daily call threshold alert raised");
    }
  }

  // 2. Daily total cost threshold
  const [costRow] = await db
    .select({ total: sql<number>`coalesce(sum(${aiUsageEventsTable.costUsd}), 0)::float8` })
    .from(aiUsageEventsTable)
    .where(gte(aiUsageEventsTable.createdAt, since));
  const totalCost = Number(costRow?.total ?? 0);

  if (totalCost > DAILY_COST_ALERT_USD) {
    const key = `daily_cost:${today}`;
    if (!(await alertAlreadySent(key))) {
      const subject = `[LEXO] Daily AI cost over $${DAILY_COST_ALERT_USD.toFixed(2)} ($${totalCost.toFixed(2)} so far)`;
      const text =
        `Heads up — total estimated AI spend across all students today (UTC) ` +
        `has crossed $${DAILY_COST_ALERT_USD.toFixed(2)}. Current estimate: $${totalCost.toFixed(2)}.\n\n` +
        `This is informational only. Open the Teacher Dashboard to see per-student usage.\n\n— LEXO`;
      const html =
        `<p>Heads up — total estimated AI spend across all students today (UTC) ` +
        `has crossed <strong>$${DAILY_COST_ALERT_USD.toFixed(2)}</strong>. ` +
        `Current estimate: <strong>$${totalCost.toFixed(2)}</strong>.</p>` +
        `<p>This is informational only. Open the Teacher Dashboard to see per-student usage.</p><p>— LEXO</p>`;
      await sendAdminAlert({ subject, text, html });
      logger.info({ totalCost, recipient: getAdminAlertEmail() }, "Daily AI cost threshold alert raised");
    }
  }
}
