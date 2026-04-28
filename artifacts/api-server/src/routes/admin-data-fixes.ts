import { Router, type IRouter, type Request } from "express";
import crypto from "node:crypto";
import { db, flashcardsTable } from "@workspace/db";
import { sql } from "drizzle-orm";

const router: IRouter = Router();

function verifyAdmin(req: Request): boolean {
  const raw = req.headers["x-admin-password"];
  const provided = typeof raw === "string" ? raw : "";
  const expected = process.env["ADMIN_PASSWORD"] ?? "";
  if (!provided || !expected) return false;
  const a = crypto.createHash("sha256").update(provided).digest();
  const b = crypto.createHash("sha256").update(expected).digest();
  return crypto.timingSafeEqual(a, b);
}

router.post("/admin/fix-flashcard-sentences", async (req, res): Promise<void> => {
  if (!verifyAdmin(req)) { res.status(401).json({ error: "Unauthorized" }); return; }

  const fixes = req.body?.fixes;
  if (!Array.isArray(fixes)) {
    res.status(400).json({ error: "Body must contain { fixes: [{id, fixed}, ...] }" });
    return;
  }

  const valid = fixes.filter(f =>
    typeof f?.id === "number" && Number.isInteger(f.id) && f.id > 0 &&
    typeof f?.fixed === "string" && f.fixed.length > 0 && f.fixed.length < 500
  );

  if (valid.length === 0) {
    res.status(400).json({ error: "No valid fixes in payload", received: fixes.length });
    return;
  }

  const batchSize = 100;
  let applied = 0;
  let batchesDone = 0;
  try {
    await db.transaction(async (tx) => {
      for (let i = 0; i < valid.length; i += batchSize) {
        const batch = valid.slice(i, i + batchSize);
        const values = sql.join(
          batch.map(f => sql`(${f.id}::int, ${f.fixed}::text)`),
          sql`, `,
        );
        const result = await tx.execute(sql`
          UPDATE ${flashcardsTable} AS f
          SET example_sentence = v.fixed
          FROM (VALUES ${values}) AS v(id, fixed)
          WHERE f.id = v.id
        `);
        applied += result.rowCount ?? 0;
        batchesDone++;
      }
    });
  } catch (err) {
    req.log.error({ err, applied, batchesDone, requested: fixes.length }, "fix-flashcard-sentences failed; transaction rolled back");
    res.status(500).json({ error: "Update failed; no changes applied (transaction rolled back).", batchesAttempted: batchesDone });
    return;
  }

  req.log.info({ applied, requested: fixes.length, valid: valid.length }, "applied flashcard sentence fixes");
  res.json({ ok: true, applied, requested: fixes.length, validInBatch: valid.length });
});

export default router;
