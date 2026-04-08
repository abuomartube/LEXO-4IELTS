import { Router, type IRouter } from "express";
import path from "node:path";
import fs from "node:fs";
import { execSync } from "node:child_process";
import { logger } from "../lib/logger";

const router: IRouter = Router();

const WORKSPACE_ROOT = process.env["REPL_HOME"] || "/home/runner/workspace";

const HTML_FILE = path.join(WORKSPACE_ROOT, "artifacts/flashcards/public/vocabulary-bilingual.html");
const CACHE_DIR = path.join(WORKSPACE_ROOT, ".local/pdf-cache");
const CACHED_PDF = path.join(CACHE_DIR, "ielts-vocabulary-3000.pdf");

let generatingPdf = false;
let pdfGenerationError: Error | null = null;

async function generatePdf(): Promise<void> {
  if (!fs.existsSync(HTML_FILE)) {
    throw new Error(`HTML source not found: ${HTML_FILE}`);
  }

  if (!fs.existsSync(CACHE_DIR)) {
    fs.mkdirSync(CACHE_DIR, { recursive: true });
  }

  const puppeteer = await import("puppeteer-core");

  let chromiumPath = process.env["CHROMIUM_PATH"] || "";
  if (!chromiumPath) {
    try {
      chromiumPath = execSync("which chromium 2>/dev/null || which chromium-browser 2>/dev/null || which google-chrome 2>/dev/null", { encoding: "utf-8", shell: "/bin/sh" }).trim();
    } catch {
      throw new Error(
        "Chromium not found. Install it (e.g. nix: chromium) or set the CHROMIUM_PATH environment variable.",
      );
    }
  }
  if (!chromiumPath || !fs.existsSync(chromiumPath)) {
    throw new Error(
      `Chromium binary not found at "${chromiumPath}". Set CHROMIUM_PATH or install chromium.`,
    );
  }

  logger.info({ chromiumPath }, "Launching browser for PDF generation");

  const browser = await puppeteer.launch({
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

  try {
    const page = await browser.newPage();

    const htmlContent = fs.readFileSync(HTML_FILE, "utf-8");
    await page.setContent(htmlContent, { waitUntil: "networkidle0", timeout: 120000 });

    logger.info("Generating PDF...");

    await page.pdf({
      path: CACHED_PDF,
      format: "A4",
      landscape: true,
      printBackground: true,
      margin: { top: "12mm", bottom: "14mm", left: "8mm", right: "8mm" },
      displayHeaderFooter: true,
      headerTemplate: `<div style="font-size:8px;font-family:sans-serif;color:#6b7280;width:100%;padding:0 8mm;box-sizing:border-box;text-align:right;">IELTS Vocabulary · 3000 Words · A1–C1 · 4IELTS.com</div>`,
      footerTemplate: `<div style="font-size:8px;font-family:sans-serif;color:#6b7280;width:100%;padding:0 8mm;box-sizing:border-box;display:flex;justify-content:space-between;"><span>© 4IELTS.com</span><span><span class="pageNumber"></span> / <span class="totalPages"></span></span></div>`,
    });

    logger.info({ path: CACHED_PDF }, "PDF generated successfully");
  } finally {
    await browser.close();
  }
}

router.get("/vocab-pdf", async (req, res): Promise<void> => {
  if (fs.existsSync(CACHED_PDF)) {
    const stat = fs.statSync(CACHED_PDF);
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", 'attachment; filename="IELTS-Vocabulary-3000-Words-EN-AR.pdf"');
    res.setHeader("Content-Length", stat.size);
    res.setHeader("Cache-Control", "public, max-age=86400");
    fs.createReadStream(CACHED_PDF).pipe(res);
    return;
  }

  if (generatingPdf) {
    res.status(202).json({
      status: "generating",
      message: "PDF is being generated. Please try again in a moment.",
    });
    return;
  }

  generatingPdf = true;
  pdfGenerationError = null;

  generatePdf()
    .then(() => {
      generatingPdf = false;
    })
    .catch((err) => {
      generatingPdf = false;
      pdfGenerationError = err;
      logger.error({ err }, "PDF generation failed");
    });

  res.status(202).json({
    status: "generating",
    message: "PDF generation started. Please retry in 60–120 seconds.",
    retryAfter: 90,
  });
});

router.get("/vocab-pdf/status", (_req, res): void => {
  if (fs.existsSync(CACHED_PDF)) {
    res.json({ status: "ready", size: fs.statSync(CACHED_PDF).size });
  } else if (generatingPdf) {
    res.json({ status: "generating" });
  } else if (pdfGenerationError) {
    res.status(500).json({ status: "error", message: pdfGenerationError.message });
  } else {
    res.json({ status: "not_started" });
  }
});

export default router;
