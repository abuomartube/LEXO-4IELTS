import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(path.resolve("artifacts/api-server/package.json"));
const puppeteer = require("puppeteer-core");

const CHROMIUM = "/nix/store/qa9cnw4v5xkxyip6mb9kxqfq1z4x2dx1-chromium-138.0.7204.100/bin/chromium";

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>LEXO – 4IELTS — Technical Report</title>
<style>
  @page { size: A4; margin: 18mm 16mm; }
  * { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; }
  body {
    font-family: -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    color: #0f172a;
    font-size: 11pt;
    line-height: 1.55;
  }
  .cover {
    background: linear-gradient(135deg, #0d9488 0%, #0f172a 100%);
    color: #fff;
    border-radius: 14px;
    padding: 36px 32px;
    margin-bottom: 28px;
  }
  .cover .badge {
    display: inline-block;
    font-size: 10pt; letter-spacing: .15em; text-transform: uppercase;
    background: rgba(255,255,255,.14); padding: 6px 12px; border-radius: 999px;
    margin-bottom: 14px;
  }
  .cover h1 {
    font-size: 30pt; line-height: 1.1; margin: 0 0 10px 0; font-weight: 800;
    letter-spacing: -.5px;
  }
  .cover p.subtitle { font-size: 12pt; opacity: .9; margin: 0 0 18px 0; max-width: 60ch; }
  .cover .meta { display: flex; gap: 22px; flex-wrap: wrap; font-size: 10pt; opacity: .85; }
  .cover .meta span b { font-weight: 700; }

  h2 {
    font-size: 15pt; margin: 26px 0 10px 0;
    color: #0f766e; border-bottom: 2px solid #ccfbf1; padding-bottom: 6px;
  }
  h3 { font-size: 12pt; margin: 18px 0 6px 0; color: #0f172a; }
  p, li { font-size: 10.5pt; }
  ul { margin: 6px 0 10px 18px; padding: 0; }
  li { margin-bottom: 4px; }
  code, .mono { font-family: ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace; font-size: 9.5pt; background: #f1f5f9; padding: 1px 5px; border-radius: 4px; color: #0f172a; }
  .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px 22px; }
  .card { border: 1px solid #e2e8f0; border-radius: 10px; padding: 12px 14px; background: #fafafa; }
  .card h3 { margin-top: 0; color: #0f766e; }
  table { border-collapse: collapse; width: 100%; font-size: 10pt; margin-top: 6px; }
  th, td { text-align: left; padding: 6px 8px; border-bottom: 1px solid #e2e8f0; vertical-align: top; }
  th { background: #f1f5f9; color: #0f172a; font-weight: 700; }
  .pill { display: inline-block; font-size: 8.5pt; padding: 2px 8px; border-radius: 999px; background: #ccfbf1; color: #115e59; margin-right: 4px; font-weight: 600; }
  .pill.alt { background: #e0e7ff; color: #3730a3; }
  .pill.warn { background: #fef3c7; color: #92400e; }
  footer { margin-top: 30px; font-size: 8.5pt; color: #64748b; text-align: center; border-top: 1px solid #e2e8f0; padding-top: 10px; }
  .small { font-size: 9.5pt; color: #475569; }
  .nowrap { white-space: nowrap; }
  .keep { page-break-inside: avoid; }
</style>
</head>
<body>

<div class="cover keep">
  <div class="badge">Technical Report</div>
  <h1>LEXO – 4IELTS</h1>
  <p class="subtitle">A bilingual (English + Arabic) IELTS preparation platform — flashcards, mock tests, AI-graded writing, AI-assisted speaking, listening practice, and structured study plans.</p>
  <div class="meta">
    <span><b>Production:</b> lexo.4ielts.com</span>
    <span><b>Generated:</b> ${new Date().toISOString().slice(0,10)}</span>
    <span><b>Stack:</b> pnpm monorepo · TypeScript · React 19 · Express 5 · PostgreSQL</span>
  </div>
</div>

<h2>1. Project Overview</h2>
<p>LEXO is a comprehensive IELTS prep web app aimed at Arabic-speaking learners worldwide. It blends a vocabulary-first study system with full exam practice (Listening, Reading, Writing, Speaking), AI tutoring, structured daily plans, and a teacher dashboard for monitoring students. The platform is delivered as a Progressive Web App so students can install it to their home screen.</p>

<h2>2. Repository Architecture</h2>
<p>The codebase is a <b>pnpm monorepo</b> with three deployable artifacts and several shared libraries.</p>
<div class="grid">
  <div class="card keep">
    <h3>Artifacts</h3>
    <ul>
      <li><span class="pill">flashcards</span> Student-facing React 19 + Vite SPA (the LEXO web app).</li>
      <li><span class="pill">api-server</span> Express 5 backend, all REST endpoints under <code>/api</code>.</li>
      <li><span class="pill">mockup-sandbox</span> Internal design preview server for component prototyping.</li>
    </ul>
  </div>
  <div class="card keep">
    <h3>Shared libraries</h3>
    <ul>
      <li><span class="pill alt">@workspace/db</span> Drizzle schema + migrations.</li>
      <li><span class="pill alt">@workspace/api-spec</span> OpenAPI source of truth.</li>
      <li><span class="pill alt">@workspace/api-zod</span> Generated Zod validators.</li>
      <li><span class="pill alt">@workspace/api-client-react</span> Generated React Query hooks.</li>
      <li><span class="pill alt">@workspace/integrations-anthropic-ai</span> Claude integration helper.</li>
    </ul>
  </div>
</div>
<p class="small">Routing across services is handled by a global path-based reverse proxy: requests under <code>/api/*</code> reach the API server; everything else reaches the web app. The OpenAPI contract is the source of truth — running codegen produces the Zod validators on the server and the React Query hooks on the client, keeping the contract end-to-end type-safe.</p>

<h2>3. Backend (api-server)</h2>
<table class="keep">
  <tr><th>Layer</th><th>Technology</th></tr>
  <tr><td>Runtime</td><td>Node.js 24, ES modules, esbuild bundle</td></tr>
  <tr><td>Framework</td><td>Express 5</td></tr>
  <tr><td>Database</td><td>PostgreSQL via Drizzle ORM</td></tr>
  <tr><td>Validation</td><td>Zod (auto-generated from OpenAPI)</td></tr>
  <tr><td>Logging</td><td>Pino + pino-http (structured request logs)</td></tr>
  <tr><td>Auth</td><td>Email + access code · bcrypt hashing · client-stored session token · idle timeout</td></tr>
  <tr><td>AI</td><td>Anthropic Claude (writing &amp; chat) · OpenAI TTS · Orwell AI (essay grading)</td></tr>
  <tr><td>PDFs</td><td>puppeteer-core + system Chromium (cached on disk)</td></tr>
  <tr><td>Notifications</td><td>VAPID web-push, in-app + browser push</td></tr>
  <tr><td>Scheduling</td><td>node-cron (daily reminders, AI-usage rollups)</td></tr>
  <tr><td>File uploads</td><td>multer + heic-convert (avatars, attachments)</td></tr>
</table>
<h3>Route groups</h3>
<p><span class="pill">auth</span><span class="pill">flashcards</span><span class="pill">lessons</span><span class="pill">essay-check</span><span class="pill">orwell</span><span class="pill">lexo-ai</span><span class="pill">speaking</span><span class="pill">stories</span><span class="pill">story-exercises</span><span class="pill">notifications</span><span class="pill">plan-pdf</span><span class="pill">vocab-pdf</span><span class="pill">sentence-check</span><span class="pill">sentence-sessions</span><span class="pill">spell-it</span><span class="pill">admin-ai-usage</span><span class="pill">admin-data-fixes</span><span class="pill">admin-notifications</span><span class="pill">health</span></p>

<h2>4. Database Schema (highlights)</h2>
<table class="keep">
  <tr><th>Table</th><th>Purpose</th></tr>
  <tr><td><code>flashcards</code></td><td>2,198 CEFR-graded vocabulary cards with Arabic translations and bilingual examples.</td></tr>
  <tr><td><code>progress</code> · <code>bookmarks</code></td><td>Per-user learning state and saved cards.</td></tr>
  <tr><td><code>card_srs</code></td><td>Spaced repetition (SM-2 algorithm) — interval, ease, due date.</td></tr>
  <tr><td><code>activity_positions</code></td><td>Resume-where-you-left-off across all study modes.</td></tr>
  <tr><td><code>quiz_scores</code></td><td>Quiz history and analytics.</td></tr>
  <tr><td><code>weak_words</code></td><td>Auto-curated review deck of words the user struggles with.</td></tr>
  <tr><td><code>xp_events</code></td><td>Gamification — every XP-earning action is recorded.</td></tr>
  <tr><td><code>user_data</code></td><td>Profile, plan duration, settings, avatar.</td></tr>
  <tr><td><code>push_subscriptions</code></td><td>VAPID web-push endpoints per device.</td></tr>
  <tr><td><code>ai_usage_events</code> · <code>admin_alerts_sent</code></td><td>Per-call AI logging + cost-spike admin email alerts (SendGrid).</td></tr>
  <tr><td><code>reviews</code></td><td>Public student testimonials with admin reply support.</td></tr>
</table>

<h2>5. Frontend (flashcards artifact)</h2>
<div class="grid">
  <div class="card keep">
    <h3>Stack</h3>
    <ul>
      <li>React 19, Vite 7, TypeScript strict</li>
      <li>TanStack Query (data layer)</li>
      <li>Tailwind v4 + Radix UI primitives</li>
      <li>Framer Motion (animations)</li>
      <li>Wouter (routing) · next-themes (dark mode)</li>
      <li>react-hook-form + Zod (forms)</li>
      <li>Embla carousel · cmdk · input-otp · date-fns</li>
      <li>PWA installable, browser TTS, RTL Arabic support</li>
    </ul>
  </div>
  <div class="card keep">
    <h3>Engagement layer</h3>
    <ul>
      <li>XP system + daily streaks</li>
      <li>Weak-word recycling deck</li>
      <li>Guided onboarding tour</li>
      <li>Idle warning + auto-logout modal</li>
      <li>Floating <b>LEXO AI</b> chat bubble</li>
      <li>Public reviews on landing page</li>
      <li>Web push notifications</li>
    </ul>
  </div>
</div>
<h3>Major pages</h3>
<p><span class="pill alt">Home</span><span class="pill alt">Onboarding</span><span class="pill alt">Daily Plan</span><span class="pill alt">Study</span><span class="pill alt">Quiz</span><span class="pill alt">Browse</span><span class="pill alt">Spell It</span><span class="pill alt">Flip It</span><span class="pill alt">Sentence Builder</span><span class="pill alt">Reading Test</span><span class="pill alt">Listening Test</span><span class="pill alt">Mock Test</span><span class="pill alt">Speaking</span><span class="pill alt">Speaking Topics</span><span class="pill alt">Essay Checker</span><span class="pill alt">Writing Templates</span><span class="pill alt">Writing History</span><span class="pill alt">Stories</span><span class="pill alt">Story Quiz / Writing</span><span class="pill alt">Phrasal Verbs</span><span class="pill alt">Synonyms</span><span class="pill alt">Antonyms</span><span class="pill alt">Grammar</span><span class="pill alt">Lessons</span><span class="pill alt">Profile</span><span class="pill alt">Progress</span><span class="pill alt">Weak Words</span><span class="pill alt">Teacher Dashboard</span><span class="pill alt">Admin</span></p>

<h2>6. Reading Skills Practice (current focus)</h2>
<p>Targeted exercises for each of the <b>17 IELTS Reading question types</b>, organised across <b>3 CEFR levels (A2 / B1 / B2)</b>. The newest type is <b>Coherence and Cohesion</b>:</p>
<ul>
  <li>3 levels × 20 questions each (10 coherence + 10 cohesion).</li>
  <li>Per-question A/B/C/D options rendered as full-text choice cards.</li>
  <li>Brief italic “Why:” explanation under every item on the results screen.</li>
  <li>Partial submission allowed — students can submit at any time.</li>
  <li>Skipped items shown in amber, correct in green, incorrect in red.</li>
  <li>XP reward scales for the longer practice: 2 XP per correct, capped at 40.</li>
</ul>

<h2>7. AI Capabilities</h2>
<table class="keep">
  <tr><th>Feature</th><th>Model / Service</th><th>Use</th></tr>
  <tr><td>Essay grading (Orwell AI)</td><td>Anthropic Claude</td><td>Band scoring + feedback for IELTS writing tasks.</td></tr>
  <tr><td>LEXO AI Chat</td><td>Anthropic Claude</td><td>In-app IELTS tutor (vocab, grammar, exam tips).</td></tr>
  <tr><td>AI story exercises</td><td>Anthropic Claude</td><td>Generated comprehension questions for stories.</td></tr>
  <tr><td>Pronunciation</td><td>OpenAI TTS (onyx, tts-1-hd)</td><td>Spoken word + example sentences.</td></tr>
  <tr><td>Quiz generation</td><td>Faster Claude tier</td><td>On-demand question generation.</td></tr>
</table>
<p class="small">Every successful AI call is recorded in <code>ai_usage_events</code>. A nightly job aggregates spend; if usage crosses thresholds, an alert email is dispatched via SendGrid.</p>

<h2>8. Quality, Safety &amp; Operations</h2>
<ul>
  <li><b>Type safety end-to-end</b> — root <code>pnpm run typecheck</code> builds composite libs first, then leaf apps.</li>
  <li><b>Contract-first APIs</b> — OpenAPI generates Zod (server) and React Query hooks (client).</li>
  <li><b>Server logging</b> — <code>req.log</code> in handlers, singleton <code>logger</code> elsewhere; <code>console.log</code> is forbidden in server code.</li>
  <li><b>Admin-only writes</b> — destructive prod fixes go through password-gated admin endpoints (header check).</li>
  <li><b>Idle session timeout</b> with warning modal; tokens validated server-side on bootstrap.</li>
  <li><b>Build &amp; deploy</b> — Replit hosts each artifact as its own workflow; the global proxy routes by path; HTTPS is automatic.</li>
</ul>

<h2>9. Recent Highlights (last ~50 commits)</h2>
<ul>
  <li>Rebranded landing &amp; registration headline to <b>“LEXO - 4IELTS”</b>.</li>
  <li>Added <b>Coherence and Cohesion</b> reading practice; total reading question types now <b>17</b>.</li>
  <li>Reordered Reading Test to put Skills Practice first, Full Tests second.</li>
  <li>Decoded HTML entities in 41 production flashcard sentences via the admin endpoint.</li>
  <li>Added Skimming and Scanning question types with tiered difficulty levels.</li>
  <li>Improved answer matching to accept common spelling variants.</li>
  <li>Added AI-powered story exercises and improved streak tracking.</li>
  <li>Faster quiz generation by switching to a lighter AI tier.</li>
  <li>Added video embedding to registration / login pages.</li>
  <li>Added “mark as weak” across all study modes; fixed study-session resume blank-screen bug.</li>
  <li>Profile page with avatar upload, name editing, and password change.</li>
  <li>Server-rendered bilingual EN+AR study-plan PDF download.</li>
  <li>Manual audio playback buttons on flashcards.</li>
</ul>

<h2>10. Hosting</h2>
<ul>
  <li>Production domain: <b>lexo.4ielts.com</b>.</li>
  <li>Each artifact runs as an independent workflow under a global reverse proxy.</li>
  <li>Automatic HTTPS, environment-managed secrets, scheduled cron jobs, and on-demand PDF rendering.</li>
</ul>

<footer>
  LEXO – 4IELTS · Technical Report · Generated automatically from the live codebase on ${new Date().toISOString().slice(0,10)}.
</footer>

</body>
</html>`;

const outDir = path.resolve("exports");
await mkdir(outDir, { recursive: true });
const htmlPath = path.join(outDir, "lexo-4ielts-technical-report.html");
const pdfPath = path.join(outDir, "lexo-4ielts-technical-report.pdf");
await writeFile(htmlPath, html, "utf8");

const browser = await puppeteer.launch({
  executablePath: CHROMIUM,
  headless: "new",
  args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
});
try {
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "networkidle0" });
  await page.pdf({
    path: pdfPath,
    format: "A4",
    printBackground: true,
    margin: { top: "0mm", bottom: "0mm", left: "0mm", right: "0mm" },
  });
} finally {
  await browser.close();
}
console.log("PDF written to", pdfPath);
