import { Router, type IRouter } from "express";
import path from "node:path";
import fs from "node:fs";
import crypto from "node:crypto";
import { execSync } from "node:child_process";
import { logger } from "../lib/logger";

const router: IRouter = Router();

const WORKSPACE_ROOT = process.env["REPL_HOME"] || "/home/runner/workspace";
const LOGO_PATH = path.join(WORKSPACE_ROOT, "artifacts/flashcards/public/4ielts-logo.png");
const SESSION_SECRET = process.env["SESSION_SECRET"] ?? "fallback-secret";

function makeStudentToken(email: string): string {
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

// Hard caps to keep this Puppeteer endpoint from being abused as a
// CPU/memory amplifier. These are well above what the real client needs.
const MAX_TASKS_PER_DAY = 24;
const MAX_COVERAGE_ROWS = 24;
const MAX_STR = 240;     // single field max length
const MAX_LONG_STR = 600; // labels that can carry a scheduledTitle

interface PlanTaskInput {
  label: string;
  labelAr: string;
  emoji: string;
  minutes: number;
  scheduledTitle: string | null;
}
interface PlanDayInput {
  dayIndex: number;
  weekday: string;
  dateLabel: string;
  tasks: PlanTaskInput[];
}
interface CoverageRowInput {
  emoji: string;
  label: string;
  labelAr: string;
  detail: string;
  detailAr: string;
  pct: number;
}
interface PlanPdfPayload {
  name: string;
  level: string;
  levelLabel: string;
  targetBand: string | null;
  examDate: string | null;
  duration: number;
  startISO: string;
  startLabel: string;
  endLabel: string;
  generatedAt: string;
  coverage: CoverageRowInput[];
  days: PlanDayInput[];
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function logoDataUrl(): string {
  try {
    if (fs.existsSync(LOGO_PATH)) {
      const b = fs.readFileSync(LOGO_PATH);
      return `data:image/png;base64,${b.toString("base64")}`;
    }
  } catch {}
  return "";
}

function renderHtml(p: PlanPdfPayload): string {
  const logo = logoDataUrl();
  const examLine = p.examDate && p.examDate !== "not_set"
    ? `<span class="meta-pill">Exam: ${escapeHtml(p.examDate)}</span>`
    : `<span class="meta-pill">Exam: not set</span>`;
  const targetLine = p.targetBand
    ? `<span class="meta-pill">Target Band ${escapeHtml(p.targetBand)}</span>`
    : "";

  const coverageHtml = p.coverage.map((c) => `
    <tr>
      <td class="cov-emoji">${escapeHtml(c.emoji)}</td>
      <td>
        <div class="cov-label">${escapeHtml(c.label)}</div>
        <div class="cov-label-ar" dir="rtl" lang="ar">${escapeHtml(c.labelAr)}</div>
        <div class="cov-detail">${escapeHtml(c.detail)}</div>
      </td>
      <td class="cov-pct">
        <div class="bar"><div class="bar-fill" style="width:${Math.max(0, Math.min(100, c.pct))}%"></div></div>
        <div class="bar-num">${Math.max(0, Math.min(100, c.pct))}%</div>
      </td>
    </tr>
  `).join("");

  const daysHtml = p.days.map((d) => {
    const totalMin = d.tasks.reduce((a, t) => a + t.minutes, 0);
    const tasksHtml = d.tasks.map((t) => `
      <tr class="task-row">
        <td class="task-emoji">${escapeHtml(t.emoji)}</td>
        <td class="task-label">
          <div class="task-en">${escapeHtml(t.label)}${t.scheduledTitle ? ` <span class="task-sub">— ${escapeHtml(t.scheduledTitle)}</span>` : ""}</div>
          <div class="task-ar" dir="rtl" lang="ar">${escapeHtml(t.labelAr)}</div>
        </td>
        <td class="task-min">~${t.minutes} min</td>
      </tr>
    `).join("");
    return `
      <section class="day">
        <header class="day-head">
          <div>
            <div class="day-num">Day ${d.dayIndex}</div>
            <div class="day-date">${escapeHtml(d.weekday)} · ${escapeHtml(d.dateLabel)}</div>
          </div>
          <div class="day-total">~${totalMin} min</div>
        </header>
        <table class="task-table"><tbody>${tasksHtml}</tbody></table>
      </section>
    `;
  }).join("");

  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <title>LEXO Study Plan — ${escapeHtml(p.name)}</title>
  <style>
    @page { size: A4 portrait; margin: 14mm 12mm 16mm 12mm; }
    * { box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", "Noto Sans Arabic", Arial, sans-serif;
      color: #1f2937;
      font-size: 10.5px;
      line-height: 1.4;
      margin: 0;
    }
    .page-header {
      display: flex;
      align-items: center;
      gap: 14px;
      padding: 10px 14px;
      background: linear-gradient(135deg, #0d9488, #0284c7);
      color: white;
      border-radius: 14px;
      margin-bottom: 14px;
    }
    .page-header img { height: 44px; width: auto; background: white; padding: 4px 6px; border-radius: 8px; }
    .page-header h1 { font-size: 22px; font-weight: 800; letter-spacing: -0.5px; margin: 0; }
    .page-header .sub { font-size: 9.5px; text-transform: uppercase; letter-spacing: 1.6px; opacity: 0.85; font-weight: 700; }
    .page-header .right { margin-left: auto; text-align: right; font-size: 9px; opacity: 0.85; }

    .meta {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-bottom: 14px;
    }
    .meta-pill {
      display: inline-block;
      background: #f1f5f9;
      border: 1px solid #e2e8f0;
      padding: 3px 10px;
      border-radius: 999px;
      font-size: 10px;
      font-weight: 600;
      color: #334155;
    }
    .meta-pill.primary { background: #ecfeff; border-color: #a5f3fc; color: #0e7490; }

    h2.section-title {
      font-size: 13.5px;
      margin: 14px 0 8px;
      color: #0f172a;
      border-bottom: 2px solid #e2e8f0;
      padding-bottom: 4px;
      font-weight: 800;
    }
    h2.section-title .ar {
      float: right;
      font-size: 11px;
      color: #64748b;
      font-weight: 600;
    }

    table.cov-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 6px;
    }
    table.cov-table td {
      padding: 6px 4px;
      border-bottom: 1px solid #f1f5f9;
      vertical-align: top;
    }
    .cov-emoji { font-size: 16px; width: 26px; text-align: center; }
    .cov-label { font-weight: 700; font-size: 10.5px; }
    .cov-label-ar { font-size: 10px; color: #64748b; }
    .cov-detail { font-size: 9.5px; color: #6b7280; margin-top: 1px; }
    .cov-pct { width: 110px; text-align: right; vertical-align: middle; }
    .bar { width: 90px; height: 6px; background: #e2e8f0; border-radius: 999px; overflow: hidden; display: inline-block; vertical-align: middle; }
    .bar-fill { height: 100%; background: linear-gradient(90deg, #0d9488, #0284c7); }
    .bar-num { font-size: 9px; font-weight: 700; color: #475569; margin-left: 4px; display: inline-block; vertical-align: middle; }

    .days-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
    }
    .day {
      border: 1px solid #e2e8f0;
      border-radius: 10px;
      padding: 8px 10px;
      background: #fafafa;
      page-break-inside: avoid;
      break-inside: avoid;
    }
    .day-head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 4px;
      margin-bottom: 5px;
    }
    .day-num { font-size: 11.5px; font-weight: 800; color: #0f172a; }
    .day-date { font-size: 9px; color: #64748b; }
    .day-total { font-size: 9px; color: #475569; font-weight: 700; background: #e0f2fe; padding: 2px 7px; border-radius: 999px; }

    table.task-table { width: 100%; border-collapse: collapse; }
    table.task-table td { padding: 3px 2px; vertical-align: top; }
    .task-emoji { width: 18px; font-size: 11px; text-align: center; }
    .task-en { font-size: 10px; font-weight: 600; color: #1e293b; }
    .task-sub { color: #64748b; font-weight: 500; font-size: 9.5px; }
    .task-ar { font-size: 9.5px; color: #64748b; }
    .task-min { width: 50px; text-align: right; font-size: 9px; color: #475569; font-weight: 600; }

    .student-block {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      padding: 10px 14px;
      margin-bottom: 14px;
      display: flex;
      gap: 16px;
      flex-wrap: wrap;
    }
    .student-block .label { font-size: 9px; text-transform: uppercase; letter-spacing: 1.4px; color: #64748b; font-weight: 700; }
    .student-block .value { font-size: 13px; color: #0f172a; font-weight: 700; }

    footer {
      margin-top: 16px;
      text-align: center;
      font-size: 9px;
      color: #64748b;
    }
  </style>
</head>
<body>
  <div class="page-header">
    ${logo ? `<img src="${logo}" alt="4IELTS" />` : ""}
    <div>
      <div class="sub">AI-Powered by 4IELTS</div>
      <h1>LEXO · Study Plan</h1>
    </div>
    <div class="right">
      Generated ${escapeHtml(p.generatedAt)}<br/>
      4ielts.com
    </div>
  </div>

  <div class="student-block">
    <div><div class="label">Student</div><div class="value">${escapeHtml(p.name || "—")}</div></div>
    <div><div class="label">Current Level</div><div class="value">${escapeHtml(p.levelLabel)}</div></div>
    ${p.targetBand ? `<div><div class="label">Target Band</div><div class="value">Band ${escapeHtml(p.targetBand)}</div></div>` : ""}
    <div><div class="label">Plan Length</div><div class="value">${p.duration} days</div></div>
    <div><div class="label">Starts</div><div class="value">${escapeHtml(p.startLabel)}</div></div>
    <div><div class="label">Ends</div><div class="value">${escapeHtml(p.endLabel)}</div></div>
  </div>

  <div class="meta">
    <span class="meta-pill primary">${escapeHtml(p.levelLabel)}</span>
    ${targetLine}
    ${examLine}
    <span class="meta-pill">${p.duration}-day plan</span>
  </div>

  <h2 class="section-title">What you'll cover <span class="ar" dir="rtl" lang="ar">ما الذي ستغطيه</span></h2>
  <table class="cov-table"><tbody>${coverageHtml}</tbody></table>

  <h2 class="section-title">Day-by-day schedule <span class="ar" dir="rtl" lang="ar">الجدول اليومي</span></h2>
  <div class="days-grid">${daysHtml}</div>

  <footer>
    LEXO · 4IELTS · Personalised IELTS preparation · www.4ielts.com
  </footer>
</body>
</html>`;
}

function findChromiumPath(): string {
  let chromiumPath = process.env["CHROMIUM_PATH"] || "";
  if (chromiumPath && fs.existsSync(chromiumPath)) return chromiumPath;
  try {
    chromiumPath = execSync(
      "which chromium 2>/dev/null || which chromium-browser 2>/dev/null || which google-chrome 2>/dev/null",
      { encoding: "utf-8", shell: "/bin/sh" },
    ).trim();
  } catch {
    throw new Error("Chromium not found. Set CHROMIUM_PATH or install chromium.");
  }
  if (!chromiumPath || !fs.existsSync(chromiumPath)) {
    throw new Error(`Chromium binary not found at "${chromiumPath}".`);
  }
  return chromiumPath;
}

router.post("/plan-pdf", async (req, res): Promise<void> => {
  // ── Auth: same x-student-email + x-student-token HMAC scheme used by
  // /api/access/change-password and /api/user-data. Without this the
  // Puppeteer pipeline below could be used as a DoS amplifier.
  const headerEmail = (req.headers["x-student-email"] as string || "").trim().toLowerCase();
  const headerToken = (req.headers["x-student-token"] as string || "").trim();
  if (!headerEmail || !headerToken || !safeEqual(headerToken, makeStudentToken(headerEmail))) {
    res.status(401).json({ error: "Please log in again to download your plan." });
    return;
  }

  const payload = req.body as Partial<PlanPdfPayload>;
  if (
    !payload ||
    typeof payload.name !== "string" ||
    typeof payload.level !== "string" ||
    typeof payload.duration !== "number" ||
    !Array.isArray(payload.days) ||
    !Array.isArray(payload.coverage)
  ) {
    res.status(400).json({ error: "Invalid plan payload" });
    return;
  }

  // Defensive structural caps so renderHtml can't be inflated unboundedly.
  if (payload.days.length === 0 || payload.days.length > 365) {
    res.status(400).json({ error: "Invalid day count" });
    return;
  }
  if (payload.coverage.length > MAX_COVERAGE_ROWS) {
    res.status(400).json({ error: "Too many coverage rows" });
    return;
  }
  if (!Number.isFinite(payload.duration) || payload.duration < 1 || payload.duration > 365) {
    res.status(400).json({ error: "Invalid duration" });
    return;
  }

  const isStr = (v: unknown, max: number) => typeof v === "string" && v.length <= max;
  for (const c of payload.coverage) {
    if (
      !isStr(c?.emoji, 8) || !isStr(c?.label, MAX_STR) || !isStr(c?.labelAr, MAX_STR) ||
      !isStr(c?.detail, MAX_STR) || !isStr(c?.detailAr, MAX_STR) ||
      typeof c?.pct !== "number" || !Number.isFinite(c.pct)
    ) {
      res.status(400).json({ error: "Invalid coverage row" });
      return;
    }
  }
  for (const d of payload.days) {
    if (
      typeof d?.dayIndex !== "number" || !Number.isFinite(d.dayIndex) ||
      !isStr(d?.weekday, MAX_STR) || !isStr(d?.dateLabel, MAX_STR) ||
      !Array.isArray(d?.tasks) || d.tasks.length > MAX_TASKS_PER_DAY
    ) {
      res.status(400).json({ error: "Invalid day entry" });
      return;
    }
    for (const t of d.tasks) {
      if (
        !isStr(t?.label, MAX_STR) || !isStr(t?.labelAr, MAX_STR) || !isStr(t?.emoji, 8) ||
        typeof t?.minutes !== "number" || !Number.isFinite(t.minutes) ||
        (t?.scheduledTitle != null && !isStr(t.scheduledTitle, MAX_LONG_STR))
      ) {
        res.status(400).json({ error: "Invalid task entry" });
        return;
      }
    }
  }
  if (
    !isStr(payload.name, MAX_STR) || !isStr(payload.levelLabel, MAX_STR) ||
    !isStr(payload.startISO, 64) || !isStr(payload.startLabel, MAX_STR) ||
    !isStr(payload.endLabel, MAX_STR) || !isStr(payload.generatedAt, MAX_STR) ||
    (payload.targetBand != null && !isStr(payload.targetBand, 32)) ||
    (payload.examDate != null && !isStr(payload.examDate, 64))
  ) {
    res.status(400).json({ error: "Invalid plan metadata" });
    return;
  }

  const html = renderHtml(payload as PlanPdfPayload);
  const filename = `LEXO-Study-Plan-${(payload.name || "student").replace(/[^A-Za-z0-9]+/g, "-").slice(0, 40) || "student"}.pdf`;

  let browser: Awaited<ReturnType<typeof import("puppeteer-core")["launch"]>> | null = null;
  try {
    const chromiumPath = findChromiumPath();
    const puppeteer = await import("puppeteer-core");
    browser = await puppeteer.launch({
      executablePath: chromiumPath,
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-gpu",
        "--no-first-run",
        "--no-zygote",
        "--single-process",
      ],
    });
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0", timeout: 60_000 });

    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "12mm", bottom: "14mm", left: "10mm", right: "10mm" },
      displayHeaderFooter: true,
      headerTemplate: `<div style="font-size:8px;font-family:sans-serif;color:#6b7280;width:100%;padding:0 10mm;box-sizing:border-box;display:flex;justify-content:space-between;"><span>LEXO Study Plan</span><span>${escapeHtml(payload.name || "")}</span></div>`,
      footerTemplate: `<div style="font-size:8px;font-family:sans-serif;color:#6b7280;width:100%;padding:0 10mm;box-sizing:border-box;display:flex;justify-content:space-between;"><span>© 4IELTS · www.4ielts.com</span><span>Page <span class="pageNumber"></span> / <span class="totalPages"></span></span></div>`,
    });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    res.setHeader("Content-Length", pdf.length);
    res.end(pdf);
  } catch (err) {
    logger.error({ err }, "Plan PDF generation failed");
    if (!res.headersSent) {
      res.status(500).json({ error: "PDF generation failed. Please try again." });
    }
  } finally {
    if (browser) {
      try { await browser.close(); } catch { /* ignore */ }
    }
  }
});

export default router;
