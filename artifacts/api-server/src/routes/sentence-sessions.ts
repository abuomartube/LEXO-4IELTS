import { Router, type IRouter } from "express";
import crypto from "node:crypto";
import { eq, desc, and } from "drizzle-orm";
import {
  db,
  sentenceSessionsTable,
  accessRequestsTable,
  settingsTable,
  type SentenceItem,
} from "@workspace/db";

const SESSION_SECRET = process.env["SESSION_SECRET"] ?? "fallback-secret";
const ENV_ADMIN_PASSWORD = process.env["ADMIN_PASSWORD"] ?? "";

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
  const ap = (req.headers["x-admin-password"] as string) ?? "";
  const correct = await getAdminPassword();
  if (!correct || ap !== correct) {
    res.status(403).json({ error: "Forbidden" });
    return false;
  }
  return true;
}

const router: IRouter = Router();

const MAX_ITEMS = 30;
const MAX_STR = 2000;
const ALLOWED_LEVELS = new Set(["A2", "B1", "B2", "C1"]);

function clampStr(v: unknown, max = MAX_STR): string {
  if (typeof v !== "string") return "";
  return v.slice(0, max);
}
function clampBand(v: unknown): number {
  const n = typeof v === "number" ? v : parseFloat(String(v));
  if (!Number.isFinite(n)) return 5;
  return Math.max(0, Math.min(9, Math.round(n * 10) / 10));
}
function sanitizeItem(raw: unknown): SentenceItem | null {
  if (!raw || typeof raw !== "object") return null;
  const r = raw as Record<string, unknown>;
  const word = clampStr(r["word"], 100);
  if (!word) return null;
  const attempts = Math.max(1, Math.min(20, Math.floor(Number(r["attempts"]) || 1)));
  const isCorrect = !!r["isCorrect"];
  return {
    word,
    arabic: clampStr(r["arabic"], 200),
    attempts,
    finalSentence: clampStr(r["finalSentence"], MAX_STR),
    isCorrect,
    errorHighlight: r["errorHighlight"] == null ? null : clampStr(r["errorHighlight"], 500),
    explanation: clampStr(r["explanation"], MAX_STR),
    corrected: clampStr(r["corrected"], MAX_STR),
    arabicCorrected: clampStr(r["arabicCorrected"], MAX_STR),
    vocabBand: clampBand(r["vocabBand"]),
    grammarBand: clampBand(r["grammarBand"]),
    firstAttemptCorrect: isCorrect && attempts === 1,
  };
}

function summarize(items: SentenceItem[]) {
  const total = items.length;
  const firstAttemptCorrect = items.filter((i) => i.firstAttemptCorrect).length;
  const neededCorrection = total - firstAttemptCorrect;
  const avgVocabBand = total ? items.reduce((s, i) => s + (i.vocabBand || 0), 0) / total : 0;
  const avgGrammarBand = total ? items.reduce((s, i) => s + (i.grammarBand || 0), 0) / total : 0;

  const patterns: Record<string, number> = {};
  const KEYS = [
    { key: "subject-verb agreement", re: /\bsubject[- ]verb\b|\bagreement\b/i },
    { key: "verb tense", re: /\btense\b|\bpast\b|\bpresent\b|\bfuture\b/i },
    { key: "articles (a/an/the)", re: /\barticle[s]?\b/i },
    { key: "prepositions", re: /\bpreposition[s]?\b/i },
    { key: "word order", re: /\bword order\b|\bsentence structure\b/i },
    { key: "spelling", re: /\bspelling\b|\bmisspell/i },
    { key: "wrong word use", re: /\bwrong word\b|\bnatural\b|\busage\b/i },
    { key: "missing the target word", re: /\bdid(n['’]?| not) use\b|\bmissing\b.*\bword\b/i },
    { key: "plural/singular", re: /\bplural\b|\bsingular\b/i },
    { key: "punctuation", re: /\bpunctuation\b|\bcomma\b/i },
  ];
  for (const it of items) {
    if (it.firstAttemptCorrect) continue;
    const text = `${it.explanation || ""} ${it.errorHighlight || ""}`;
    for (const { key, re } of KEYS) {
      if (re.test(text)) patterns[key] = (patterns[key] ?? 0) + 1;
    }
  }
  const commonMistakes = Object.entries(patterns)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(([k, n]) => `${k} (${n}×)`);

  return { firstAttemptCorrect, neededCorrection, avgVocabBand, avgGrammarBand, commonMistakes };
}

router.post("/sentence-sessions", async (req, res) => {
  const email = await verifyStudentEmail(req);
  if (!email) { res.status(401).json({ error: "Unauthorized" }); return; }

  const body = req.body as { level?: unknown; items?: unknown; endedEarly?: unknown };
  const level = typeof body.level === "string" ? body.level : "";
  if (!ALLOWED_LEVELS.has(level)) {
    res.status(400).json({ error: "Invalid level" });
    return;
  }
  if (!Array.isArray(body.items) || body.items.length === 0 || body.items.length > MAX_ITEMS) {
    res.status(400).json({ error: "Invalid items" });
    return;
  }
  const items: SentenceItem[] = [];
  for (const raw of body.items) {
    const it = sanitizeItem(raw);
    if (it) items.push(it);
  }
  if (items.length === 0) {
    res.status(400).json({ error: "No valid items" });
    return;
  }

  const summary = summarize(items);

  const [row] = await db.insert(sentenceSessionsTable).values({
    email,
    level,
    totalWords: items.length,
    firstAttemptCorrect: summary.firstAttemptCorrect,
    neededCorrection: summary.neededCorrection,
    avgVocabBand: Math.round(summary.avgVocabBand * 10) / 10,
    avgGrammarBand: Math.round(summary.avgGrammarBand * 10) / 10,
    commonMistakes: summary.commonMistakes,
    items,
    endedEarly: !!body.endedEarly,
  }).returning();

  res.json(row);
});

router.get("/sentence-sessions", async (req, res) => {
  const email = await verifyStudentEmail(req);
  if (!email) { res.json([]); return; }

  const rows = await db.select({
    id: sentenceSessionsTable.id,
    level: sentenceSessionsTable.level,
    totalWords: sentenceSessionsTable.totalWords,
    firstAttemptCorrect: sentenceSessionsTable.firstAttemptCorrect,
    neededCorrection: sentenceSessionsTable.neededCorrection,
    avgVocabBand: sentenceSessionsTable.avgVocabBand,
    avgGrammarBand: sentenceSessionsTable.avgGrammarBand,
    endedEarly: sentenceSessionsTable.endedEarly,
    completedAt: sentenceSessionsTable.completedAt,
  }).from(sentenceSessionsTable)
    .where(eq(sentenceSessionsTable.email, email))
    .orderBy(desc(sentenceSessionsTable.completedAt))
    .limit(50);

  res.json(rows);
});

router.get("/sentence-sessions/:id", async (req, res) => {
  const email = await verifyStudentEmail(req);
  if (!email) { res.status(401).json({ error: "Unauthorized" }); return; }
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) { res.status(400).json({ error: "Bad id" }); return; }

  const [row] = await db.select().from(sentenceSessionsTable)
    .where(and(eq(sentenceSessionsTable.id, id), eq(sentenceSessionsTable.email, email)));
  if (!row) { res.status(404).json({ error: "Not found" }); return; }
  res.json(row);
});

router.get("/teacher/sentence-sessions", async (req, res) => {
  if (!await requireAdmin(req, res)) return;
  const email = (req.query.email as string || "").trim().toLowerCase();
  if (!email) { res.status(400).json({ error: "Missing email" }); return; }

  const rows = await db.select().from(sentenceSessionsTable)
    .where(eq(sentenceSessionsTable.email, email))
    .orderBy(desc(sentenceSessionsTable.completedAt))
    .limit(50);
  res.json(rows);
});

export default router;
