import fs from "node:fs/promises";
import path from "node:path";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
  apiKey: process.env.AI_INTEGRATIONS_ANTHROPIC_API_KEY,
  baseURL: process.env.AI_INTEGRATIONS_ANTHROPIC_BASE_URL,
});

const MODEL = "claude-sonnet-4-6";
const CONCURRENCY = 6;
const BATCH = 70;

async function callClaude(system, user, maxTokens = 4096) {
  for (let attempt = 0; attempt < 4; attempt++) {
    try {
      const res = await client.messages.create({
        model: MODEL,
        max_tokens: maxTokens,
        system,
        messages: [{ role: "user", content: user }],
      });
      const text = res.content.filter(b => b.type === "text").map(b => b.text).join("");
      const m = text.match(/\[[\s\S]*\]/);
      if (!m) return [];
      return JSON.parse(m[0]);
    } catch (e) {
      const status = e?.status || e?.response?.status;
      if (attempt === 3) {
        console.error("[claude] giving up:", e.message?.slice(0, 200));
        return [];
      }
      const wait = (status === 429 || status === 529) ? 5000 * (attempt + 1) : 1500 * (attempt + 1);
      console.error(`[claude] retry ${attempt + 1} in ${wait}ms (${e.message?.slice(0, 80)})`);
      await new Promise(r => setTimeout(r, wait));
    }
  }
  return [];
}

async function runConcurrent(tasks, concurrency) {
  const results = new Array(tasks.length);
  let i = 0;
  const workers = Array.from({ length: concurrency }, async () => {
    while (true) {
      const my = i++;
      if (my >= tasks.length) break;
      results[my] = await tasks[my]();
    }
  });
  await Promise.all(workers);
  return results;
}

function chunk(arr, n) {
  const out = [];
  for (let i = 0; i < arr.length; i += n) out.push(arr.slice(i, i + n));
  return out;
}

// ============================================================
// Reviewer 1: flashcards (Study Mode + Quiz Mode)
// ============================================================
async function reviewFlashcards(rows) {
  const sys = `You are an expert Arabic linguist and IELTS English teacher reviewing Arabic translations of single English vocabulary words for Arabic-speaking IELTS students.

For each entry, decide if the Arabic translation has any of these problems:
- INCORRECT MEANING: completely wrong
- WRONG SENSE FOR IELTS: word has multiple meanings and the chosen Arabic does not match the most academic/IELTS-relevant sense
- WRONG PART OF SPEECH: e.g. an adjective translated as a noun, or a noun translated as a verb
- UNNATURAL ARABIC: archaic, awkward, wrong dialect, grammatically odd
- POOR FLUENCY: a word an educated Arab speaker would not use here

Return a JSON array containing ONLY the entries that need fixing. For each fix:
{"id": <number>, "ar": "<corrected Arabic>", "reason": "<short, max 10 words>"}

Strict rules:
- Be CONSERVATIVE. If the existing translation is acceptable (even if not your absolute favorite), do NOT include it.
- Use Modern Standard Arabic (فصحى).
- Verbs: present-tense singular masculine (e.g. "يذهب", "يكتب").
- Adjectives: masculine singular form.
- Plural nouns stay plural; singular stay singular.
- Pick the sense most useful in IELTS academic English (essays, lectures, scientific texts).
- Output ONLY the JSON array. No prose. No markdown fences.`;

  const tasks = chunk(rows, BATCH).map(batch => async () => {
    const compact = batch.map(r => ({
      id: r._idx, en: r.english, ar: r.arabic, cat: r.category, lvl: r.level,
    }));
    const user = `Review these ${compact.length} entries (cat: n=noun, v=verb, adj=adjective, adv=adverb, prep=preposition, det=determiner, conj=conjunction):

${JSON.stringify(compact)}`;
    return await callClaude(sys, user, 6000);
  });
  const results = await runConcurrent(tasks, CONCURRENCY);
  return results.flat();
}

// ============================================================
// Reviewer 2: synonyms
// ============================================================
async function reviewSynonyms(rows) {
  const sys = `You are an expert Arabic linguist and IELTS English teacher reviewing Arabic translations of English vocabulary for IELTS students.

Each entry has an English word and its Arabic translation. The word also has a synonym used in the same sense.

Decide if the Arabic translation is:
- INCORRECT (wrong meaning), or
- WRONG SENSE: doesn't match the meaning shared by the word + its English synonym, or
- UNNATURAL Arabic, or
- WRONG PART OF SPEECH.

Return a JSON array with ONLY entries needing fixes:
{"id": <number>, "ar": "<corrected Arabic>", "reason": "<short, max 10 words>"}

Rules:
- Be conservative. Skip acceptable translations.
- Use Modern Standard Arabic (فصحى).
- Verbs: present-tense singular masculine.
- Adjectives: masculine singular.
- The Arabic must match the sense that is shared between the word and its synonym.
- Multiple Arabic equivalents separated by " / " are allowed when both are common.
- Output ONLY the JSON array.`;

  const tasks = chunk(rows, BATCH).map(batch => async () => {
    const compact = batch.map(r => ({
      id: r.id, en: r.word, syn: r.synonym, ar: r.translation,
    }));
    const user = `Review these ${compact.length} synonym pairs:\n\n${JSON.stringify(compact)}`;
    return await callClaude(sys, user, 6000);
  });
  const results = await runConcurrent(tasks, CONCURRENCY);
  return results.flat();
}

// ============================================================
// Reviewer 3: antonyms (two translation fields per row)
// ============================================================
async function reviewAntonyms(rows) {
  const sys = `You are an expert Arabic linguist and IELTS English teacher reviewing Arabic translations of English vocabulary for IELTS students.

Each entry has a WORD and an ANTONYM (opposite). Each has its own Arabic translation. The two Arabic translations should be opposites in the same sense.

For each entry, return fixes ONLY when needed:
{
  "id": <number>,
  "wordAr": "<corrected Arabic for the word>" (omit if word's Arabic is fine),
  "antAr":  "<corrected Arabic for the antonym>" (omit if antonym's Arabic is fine),
  "reason": "<short, max 10 words>"
}

Skip entries where BOTH translations are acceptable.

Rules:
- Be conservative.
- Modern Standard Arabic (فصحى).
- Verbs: present-tense singular masculine.
- Adjectives: masculine singular.
- The two translations should clearly be opposites in the same sense.
- Multiple equivalents separated by " / " are OK when both are common.
- Output ONLY the JSON array.`;

  const tasks = chunk(rows, BATCH).map(batch => async () => {
    const compact = batch.map(r => ({
      id: r.id, en: r.word, enAnt: r.antonym, ar: r.translation, antAr: r.antonymTranslation,
    }));
    const user = `Review these ${compact.length} antonym pairs:\n\n${JSON.stringify(compact)}`;
    return await callClaude(sys, user, 6000);
  });
  const results = await runConcurrent(tasks, CONCURRENCY);
  return results.flat();
}

// ============================================================
// Reviewer 4: phrasal verbs (idiomatic meaning matters most)
// ============================================================
async function reviewPhrasalVerbs(rows) {
  const sys = `You are an expert Arabic linguist and IELTS English teacher reviewing Arabic translations of English PHRASAL VERBS for IELTS students.

Phrasal verbs have an IDIOMATIC meaning that often differs from the literal meaning of the words. The Arabic translation must reflect the IDIOMATIC meaning as defined by the English meaning, NOT a literal word-by-word translation.

Each entry has:
- the phrasal verb (English)
- its English meaning
- "verbAr": short Arabic translation of the phrasal verb itself (the most important field)
- "meaningAr": Arabic explanation of the meaning

Return fixes ONLY when needed:
{
  "id": <number>,
  "verbAr": "<corrected verbAr>" (omit if fine),
  "meaningAr": "<corrected meaningAr>" (omit if fine),
  "reason": "<short, max 12 words>"
}

Skip entries where BOTH fields are acceptable.

Rules:
- Be conservative.
- The Arabic must capture the IDIOMATIC sense from the English meaning.
- verbAr: present-tense singular masculine verb (e.g. "يلغي" for "call off"). Multiple equivalents " / "-separated when both common.
- meaningAr: a short natural Arabic gloss matching the English meaning (a noun phrase or verb phrase, not a sentence).
- Modern Standard Arabic (فصحى).
- Output ONLY the JSON array.`;

  const tasks = chunk(rows, BATCH).map(batch => async () => {
    const compact = batch.map(r => ({
      id: r.id, en: r.phrasalVerb, meaning: r.meaning, verbAr: r.phrasalVerbAr, meaningAr: r.meaningAr,
    }));
    const user = `Review these ${compact.length} phrasal verbs:\n\n${JSON.stringify(compact)}`;
    return await callClaude(sys, user, 6000);
  });
  const results = await runConcurrent(tasks, CONCURRENCY);
  return results.flat();
}

// ============================================================
// Main
// ============================================================
async function main() {
  const flashPath = "artifacts/api-server/src/flashcards-seed.json";
  const synPath   = "artifacts/flashcards/src/data/synonyms-data.json";
  const antPath   = "artifacts/flashcards/src/data/antonyms-data.json";
  const phrPath   = "artifacts/flashcards/src/data/phrasal-verbs-data.json";

  const flashcards = JSON.parse(await fs.readFile(flashPath, "utf-8"));
  const syns       = JSON.parse(await fs.readFile(synPath, "utf-8"));
  const ants       = JSON.parse(await fs.readFile(antPath, "utf-8"));
  const phrs       = JSON.parse(await fs.readFile(phrPath, "utf-8"));

  console.log(`Loaded: ${flashcards.length} flashcards, ${syns.length} synonyms, ${ants.length} antonyms, ${phrs.length} phrasal verbs`);

  // Assign stable indices to flashcards (no native id)
  flashcards.forEach((f, i) => { f._idx = i; });

  console.log("\n=== Reviewing flashcards (Study + Quiz Mode)... ===");
  const flashFixes = await reviewFlashcards(flashcards);
  console.log(`flashcard fixes proposed: ${flashFixes.length}`);

  console.log("\n=== Reviewing synonyms... ===");
  const synFixes = await reviewSynonyms(syns);
  console.log(`synonym fixes proposed: ${synFixes.length}`);

  console.log("\n=== Reviewing antonyms... ===");
  const antFixes = await reviewAntonyms(ants);
  console.log(`antonym fixes proposed: ${antFixes.length}`);

  console.log("\n=== Reviewing phrasal verbs... ===");
  const phrFixes = await reviewPhrasalVerbs(phrs);
  console.log(`phrasal verb fixes proposed: ${phrFixes.length}`);

  // ------- Apply fixes -------
  let flashApplied = 0, synApplied = 0, antApplied = 0, phrApplied = 0;
  const log = [];

  for (const fix of flashFixes) {
    const row = flashcards[fix.id];
    if (!row || !fix.ar || typeof fix.ar !== "string") continue;
    if (row.arabic === fix.ar) continue;
    log.push(`flashcard #${fix.id} "${row.english}": "${row.arabic}" -> "${fix.ar}"  (${fix.reason || ""})`);
    row.arabic = fix.ar;
    flashApplied++;
  }
  for (const fix of synFixes) {
    const row = syns.find(r => r.id === fix.id);
    if (!row || !fix.ar || typeof fix.ar !== "string") continue;
    if (row.translation === fix.ar) continue;
    log.push(`synonym #${fix.id} "${row.word}": "${row.translation}" -> "${fix.ar}"  (${fix.reason || ""})`);
    row.translation = fix.ar;
    synApplied++;
  }
  for (const fix of antFixes) {
    const row = ants.find(r => r.id === fix.id);
    if (!row) continue;
    let touched = false;
    if (fix.wordAr && typeof fix.wordAr === "string" && row.translation !== fix.wordAr) {
      log.push(`antonym #${fix.id} word "${row.word}": "${row.translation}" -> "${fix.wordAr}"  (${fix.reason || ""})`);
      row.translation = fix.wordAr; touched = true;
    }
    if (fix.antAr && typeof fix.antAr === "string" && row.antonymTranslation !== fix.antAr) {
      log.push(`antonym #${fix.id} antonym "${row.antonym}": "${row.antonymTranslation}" -> "${fix.antAr}"  (${fix.reason || ""})`);
      row.antonymTranslation = fix.antAr; touched = true;
    }
    if (touched) antApplied++;
  }
  for (const fix of phrFixes) {
    const row = phrs.find(r => r.id === fix.id);
    if (!row) continue;
    let touched = false;
    if (fix.verbAr && typeof fix.verbAr === "string" && row.phrasalVerbAr !== fix.verbAr) {
      log.push(`phrasal #${fix.id} "${row.phrasalVerb}" verbAr: "${row.phrasalVerbAr}" -> "${fix.verbAr}"  (${fix.reason || ""})`);
      row.phrasalVerbAr = fix.verbAr; touched = true;
    }
    if (fix.meaningAr && typeof fix.meaningAr === "string" && row.meaningAr !== fix.meaningAr) {
      log.push(`phrasal #${fix.id} "${row.phrasalVerb}" meaningAr: "${row.meaningAr}" -> "${fix.meaningAr}"  (${fix.reason || ""})`);
      row.meaningAr = fix.meaningAr; touched = true;
    }
    if (touched) phrApplied++;
  }

  // Strip _idx
  flashcards.forEach(f => { delete f._idx; });

  // ------- Write back -------
  await fs.writeFile(flashPath, JSON.stringify(flashcards, null, 2));
  await fs.writeFile(synPath,   JSON.stringify(syns, null, 2));
  await fs.writeFile(antPath,   JSON.stringify(ants, null, 2));
  await fs.writeFile(phrPath,   JSON.stringify(phrs, null, 2));

  // ------- Save change log -------
  const logPath = "scripts/arabic-review-log.txt";
  await fs.writeFile(logPath, log.join("\n") + "\n");

  console.log("\n========== SUMMARY ==========");
  console.log(`Study/Quiz Mode flashcards: ${flashApplied} corrections`);
  console.log(`Synonyms:                   ${synApplied} corrections`);
  console.log(`Antonyms:                   ${antApplied} corrections`);
  console.log(`Phrasal Verbs:              ${phrApplied} corrections`);
  console.log(`TOTAL:                      ${flashApplied + synApplied + antApplied + phrApplied}`);
  console.log(`Detailed change log: ${logPath}`);
}

main().catch(e => { console.error(e); process.exit(1); });
