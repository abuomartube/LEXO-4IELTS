import { Router, type IRouter } from "express";
import crypto from "node:crypto";
import { db, aiUsageEventsTable } from "@workspace/db";
import { gte, sql } from "drizzle-orm";

const router: IRouter = Router();

function verifyAdmin(req: import("express").Request): boolean {
  const provided = (req.headers["x-admin-password"] as string || "").trim();
  const expected = (process.env["ADMIN_PASSWORD"] || "Target8").trim();
  if (!provided || !expected) return false;
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

// Per-student AI usage for the current UTC day. Returns one row per student
// who has made at least one AI call today, with total calls + per-route
// breakdown + total estimated cost.
router.get("/admin/ai-usage/today", async (req, res): Promise<void> => {
  if (!verifyAdmin(req)) { res.status(401).json({ error: "Unauthorized" }); return; }

  const since = new Date();
  since.setUTCHours(0, 0, 0, 0);

  const rows = await db
    .select({
      email: aiUsageEventsTable.email,
      route: aiUsageEventsTable.route,
      calls: sql<number>`count(*)::int`,
      costUsd: sql<number>`coalesce(sum(${aiUsageEventsTable.costUsd}), 0)::float8`,
    })
    .from(aiUsageEventsTable)
    .where(gte(aiUsageEventsTable.createdAt, since))
    .groupBy(aiUsageEventsTable.email, aiUsageEventsTable.route);

  // Roll up per-student
  const byEmail = new Map<string, { email: string; calls: number; churchillCalls: number; orwellCalls: number; costUsd: number }>();
  let totalCalls = 0;
  let totalCost = 0;
  for (const r of rows) {
    const cur = byEmail.get(r.email) ?? { email: r.email, calls: 0, churchillCalls: 0, orwellCalls: 0, costUsd: 0 };
    const calls = Number(r.calls) || 0;
    const cost = Number(r.costUsd) || 0;
    cur.calls += calls;
    cur.costUsd += cost;
    if (r.route === "churchill") cur.churchillCalls += calls;
    if (r.route === "orwell") cur.orwellCalls += calls;
    byEmail.set(r.email, cur);
    totalCalls += calls;
    totalCost += cost;
  }

  const students = Array.from(byEmail.values()).sort((a, b) => b.calls - a.calls);

  res.json({
    date: since.toISOString().slice(0, 10),
    totalCalls,
    totalCostUsd: Number(totalCost.toFixed(4)),
    students,
  });
});

export default router;
