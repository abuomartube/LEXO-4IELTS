#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const INPUT_JSON = path.join(
  __dirname,
  "../attached_assets/vocabulary-translated.json"
);
const OUTPUT_HTML = path.join(
  __dirname,
  "../artifacts/flashcards/public/vocabulary-bilingual.html"
);

const LEVEL_DESCRIPTIONS = {
  A1: "Essential everyday words to build a strong reading, writing, and listening foundation.",
  A2: "Building-block words that expand everyday communication and basic academic vocabulary.",
  B1: "Intermediate words common in IELTS topics, ideal for expressing academic and real-world ideas.",
  B2: "Upper-intermediate vocabulary for nuanced academic writing and complex IELTS tasks.",
  C1: "Advanced academic words for sophisticated expression and high-band IELTS performance.",
};

const LEVEL_NAMES = {
  A1: { abbr: "Foundational", pdftotal: 750 },
  A2: { abbr: "Elementary", pdftotal: 750 },
  B1: { abbr: "Intermediate", pdftotal: 500 },
  B2: { abbr: "Upper-Intermediate", pdftotal: 500 },
  C1: { abbr: "Advanced", pdftotal: 500 },
};

function getLevelFullName(level, entryCount) {
  const meta = LEVEL_NAMES[level] || { abbr: level, pdftotal: entryCount };
  return `${level} · ${meta.abbr} · ${entryCount} Words`;
}

const LEVEL_ORDER = ["A1", "A2", "B1", "B2", "C1"];

function escapeHtml(str) {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function generateLevelTable(level, levelData) {
  const entries = levelData.entries || [];
  const rows = entries
    .map(
      (e) => `
    <tr>
      <td class="col-num">${e.num}</td>
      <td class="col-word">${escapeHtml(e.word)}</td>
      <td class="col-pos">${escapeHtml(e.pos)}</td>
      <td class="col-sentence">${escapeHtml(e.sentence)}</td>
      <td class="col-word-ar" dir="rtl" lang="ar">${escapeHtml(e.wordAr || "")}</td>
      <td class="col-sentence-ar" dir="rtl" lang="ar">${escapeHtml(e.sentenceAr || "")}</td>
    </tr>`
    )
    .join("");

  return `
  <section class="level-section" id="level-${level}">
    <div class="level-header">
      <div class="level-badge">${level}</div>
      <div class="level-header-info">
        <h2 class="level-title">${getLevelFullName(level, entries.length)}</h2>
        <p class="level-desc">${LEVEL_DESCRIPTIONS[level] || ""}</p>
        <p class="level-meta">${entries.length} words &nbsp;·&nbsp; 4ielts.com &nbsp;·&nbsp; Supervised by 4ielts Platform | Authored by Abu Omar</p>
      </div>
    </div>
    <table class="vocab-table">
      <thead>
        <tr>
          <th class="col-num">#</th>
          <th class="col-word">Word</th>
          <th class="col-pos">POS</th>
          <th class="col-sentence">Example Sentence</th>
          <th class="col-word-ar" dir="rtl" lang="ar">الترجمة</th>
          <th class="col-sentence-ar" dir="rtl" lang="ar">الجملة بالعربية</th>
        </tr>
      </thead>
      <tbody>
        ${rows}
      </tbody>
    </table>
  </section>`;
}

function generateHTML(data) {
  const totalEntries = Object.values(data).reduce(
    (sum, d) => sum + (d.entries || []).length,
    0
  );

  const levelSections = LEVEL_ORDER.filter((l) => data[l])
    .map((level) => generateLevelTable(level, data[level]))
    .join("\n");

  const toc = LEVEL_ORDER.filter((l) => data[l])
    .map(
      (l) =>
        `<a href="#level-${l}" class="toc-item"><span class="toc-badge">${l}</span> ${data[l].name || l}</a>`
    )
    .join("\n");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>IELTS Vocabulary – Bilingual EN + AR | 4ielts.com</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Naskh+Arabic:wght@400;500;600;700&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    /* ── Reset & Base ── */
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --brand: #1a6fae;
      --brand-dark: #144e7f;
      --brand-light: #e8f2fb;
      --text: #1a1f2e;
      --text-muted: #6b7280;
      --border: #d1d9e3;
      --row-alt: #f7fafc;
      --header-bg: #1a6fae;
      --page-w: 297mm;   /* A4 landscape */
      --page-h: 210mm;
      --margin: 10mm;
    }

    html { font-size: 14px; }

    body {
      font-family: "Inter", sans-serif;
      color: var(--text);
      background: #fff;
      line-height: 1.5;
    }

    [lang="ar"] {
      font-family: "Noto Naskh Arabic", "Arial Unicode MS", serif;
      direction: rtl;
      text-align: right;
      line-height: 1.8;
    }

    /* ── Cover Page ── */
    .cover-page {
      width: var(--page-w);
      min-height: var(--page-h);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      background: linear-gradient(135deg, #1a6fae 0%, #0e4a7a 100%);
      color: white;
      padding: 20mm;
      page-break-after: always;
    }

    .cover-logo {
      font-size: 1rem;
      font-weight: 700;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      opacity: 0.8;
      margin-bottom: 8mm;
    }

    .cover-title {
      font-size: 2.8rem;
      font-weight: 800;
      line-height: 1.2;
      margin-bottom: 6mm;
    }

    .cover-subtitle {
      font-size: 1.1rem;
      opacity: 0.85;
      margin-bottom: 8mm;
    }

    .cover-ar {
      font-size: 1.4rem;
      margin-bottom: 10mm;
      opacity: 0.9;
    }

    .cover-levels {
      display: flex;
      gap: 8mm;
      justify-content: center;
      flex-wrap: wrap;
      margin-bottom: 10mm;
    }

    .cover-level-badge {
      background: rgba(255,255,255,0.2);
      border: 2px solid rgba(255,255,255,0.5);
      border-radius: 8px;
      padding: 3mm 6mm;
      font-size: 1.1rem;
      font-weight: 700;
    }

    .cover-stats {
      opacity: 0.75;
      font-size: 0.9rem;
      margin-bottom: 6mm;
    }

    .cover-author {
      opacity: 0.8;
      font-size: 0.9rem;
    }

    /* ── Table of Contents ── */
    .toc-page {
      width: var(--page-w);
      padding: var(--margin);
      page-break-after: always;
    }

    .toc-page h2 {
      font-size: 1.4rem;
      font-weight: 700;
      color: var(--brand);
      border-bottom: 3px solid var(--brand);
      padding-bottom: 3mm;
      margin-bottom: 6mm;
    }

    .toc-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(120mm, 1fr));
      gap: 4mm;
    }

    .toc-item {
      display: flex;
      align-items: center;
      gap: 3mm;
      padding: 3mm 4mm;
      border: 1px solid var(--border);
      border-radius: 6px;
      text-decoration: none;
      color: var(--text);
      font-size: 0.9rem;
      font-weight: 500;
      transition: background 0.15s;
    }

    .toc-item:hover { background: var(--brand-light); }

    .toc-badge {
      background: var(--brand);
      color: white;
      border-radius: 4px;
      padding: 1px 5px;
      font-size: 0.75rem;
      font-weight: 700;
      white-space: nowrap;
    }

    /* ── Level Sections ── */
    .level-section {
      page-break-before: always;
    }

    .level-header {
      display: flex;
      align-items: flex-start;
      gap: 6mm;
      background: linear-gradient(135deg, #1a6fae 0%, #0e4a7a 100%);
      color: white;
      padding: var(--margin) calc(var(--margin) * 1.5);
      page-break-inside: avoid;
    }

    .level-badge {
      font-size: 2.5rem;
      font-weight: 800;
      background: rgba(255,255,255,0.15);
      border: 3px solid rgba(255,255,255,0.4);
      border-radius: 10px;
      padding: 2mm 5mm;
      min-width: 22mm;
      text-align: center;
      flex-shrink: 0;
    }

    .level-header-info { flex: 1; }

    .level-title {
      font-size: 1.4rem;
      font-weight: 700;
      margin-bottom: 2mm;
    }

    .level-desc {
      font-size: 0.85rem;
      opacity: 0.85;
      margin-bottom: 2mm;
      line-height: 1.4;
    }

    .level-meta {
      font-size: 0.75rem;
      opacity: 0.7;
    }

    /* ── Vocabulary Table ── */
    .vocab-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.78rem;
      table-layout: fixed;
    }

    .vocab-table thead {
      position: sticky;
      top: 0;
      z-index: 10;
    }

    .vocab-table thead tr {
      background: #1a3a5c;
      color: white;
    }

    .vocab-table th {
      padding: 2.5mm 3mm;
      text-align: left;
      font-size: 0.7rem;
      font-weight: 600;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      border: 1px solid #2d5a8e;
    }

    .vocab-table th[dir="rtl"] { text-align: right; }

    .vocab-table td {
      padding: 2mm 3mm;
      border: 1px solid var(--border);
      vertical-align: top;
    }

    .vocab-table tbody tr:nth-child(even) td { background: var(--row-alt); }
    .vocab-table tbody tr:hover td { background: var(--brand-light); }

    /* Column widths — A4 landscape = ~277mm usable */
    .col-num       { width: 10mm; text-align: center; color: var(--text-muted); font-size: 0.7rem; }
    .col-word      { width: 30mm; font-weight: 600; color: var(--brand-dark); }
    .col-pos       { width: 16mm; font-style: italic; color: var(--text-muted); font-size: 0.72rem; }
    .col-sentence  { width: 82mm; }
    .col-word-ar   { width: 28mm; font-weight: 600; color: #7b3f00; font-size: 0.9rem; }
    .col-sentence-ar { width: 82mm; color: #4a2800; font-size: 0.88rem; }

    /* ── Print Optimization ── */
    @page {
      size: A4 landscape;
      margin: 8mm 10mm;
    }

    @page :first { margin: 0; }

    @media print {
      html { font-size: 11px; }

      .cover-page {
        width: 100%;
        min-height: 100vh;
      }

      .toc-page {
        width: 100%;
        padding: 15mm;
      }

      .level-section {
        page-break-before: always;
      }

      .level-header {
        page-break-inside: avoid;
      }

      .vocab-table thead {
        display: table-header-group;
      }

      .vocab-table tr {
        page-break-inside: avoid;
      }

      .toc-item:hover { background: transparent; }

      body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    }

    /* ── Screen only extras ── */
    @media screen {
      body {
        background: #f0f4f8;
        padding: 10mm;
      }

      .cover-page, .toc-page, .level-section {
        max-width: 297mm;
        margin: 0 auto 10mm;
        box-shadow: 0 2px 20px rgba(0,0,0,0.12);
        border-radius: 4px;
        overflow: hidden;
      }

      .level-section {
        background: white;
      }

      .toc-page {
        background: white;
        border-radius: 4px;
        padding: 12mm;
      }

      .vocab-table th, .vocab-table td {
        white-space: normal;
        word-break: break-word;
      }

      .col-sentence, .col-sentence-ar {
        word-wrap: break-word;
      }
    }
  </style>
</head>
<body>

  <!-- Cover Page -->
  <div class="cover-page">
    <div class="cover-logo">4ielts.com</div>
    <h1 class="cover-title">IELTS Vocabulary Series<br>Bilingual EN · AR</h1>
    <p class="cover-subtitle">3,000 Academic Words · 5 CEFR Levels · English + Arabic</p>
    <p class="cover-ar" lang="ar" dir="rtl">قاموس المفردات ثنائي اللغة · الإنجليزية والعربية</p>
    <div class="cover-levels">
      <span class="cover-level-badge">A1</span>
      <span class="cover-level-badge">A2</span>
      <span class="cover-level-badge">B1</span>
      <span class="cover-level-badge">B2</span>
      <span class="cover-level-badge">C1</span>
    </div>
    <p class="cover-stats">${totalEntries} words &nbsp;·&nbsp; ${totalEntries} Example Sentences &nbsp;·&nbsp; ${totalEntries} Arabic Translations</p>
    <p class="cover-author">Abu Omar · IELTS Trainer &amp; Educator<br>Supervised by 4ielts Platform · www.4ielts.com</p>
  </div>

  <!-- Table of Contents -->
  <div class="toc-page">
    <h2>Table of Contents · فهرس المستويات</h2>
    <div class="toc-grid">
      ${toc}
    </div>
  </div>

  <!-- Level Sections -->
  ${levelSections}

</body>
</html>`;
}

function main() {
  if (!fs.existsSync(INPUT_JSON)) {
    console.error("Error: vocabulary-translated.json not found. Run parse-vocabulary.cjs first.");
    process.exit(1);
  }
  
  const data = JSON.parse(fs.readFileSync(INPUT_JSON, "utf8"));
  
  let total = 0;
  for (const [level, info] of Object.entries(data)) {
    const count = (info.entries || []).length;
    total += count;
    console.log(`${level}: ${count} entries`);
  }
  console.log(`Total: ${total} entries`);
  
  if (total === 0) {
    console.error("No entries found. Check vocabulary-translated.json.");
    process.exit(1);
  }
  
  const EXPECTED_TOTAL = 3000;
  if (total < EXPECTED_TOTAL * 0.95) {
    console.error(`Validation error: Only ${total} entries found, expected at least ${Math.floor(EXPECTED_TOTAL * 0.95)}. Aborting HTML generation.`);
    process.exit(1);
  }
  console.log(`Validation passed: ${total} entries (expected ${EXPECTED_TOTAL})`);
  
  const html = generateHTML(data);
  
  const dir = path.dirname(OUTPUT_HTML);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  fs.writeFileSync(OUTPUT_HTML, html, "utf8");
  console.log(`\nHTML generated at ${OUTPUT_HTML}`);
  console.log(`File size: ${(fs.statSync(OUTPUT_HTML).size / 1024 / 1024).toFixed(2)} MB`);
}

main();
