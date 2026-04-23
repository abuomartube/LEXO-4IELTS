/**
 * Pre-generates OpenAI TTS MP3 files for every line in LISTENING_SKILL_TESTS.
 * Output: artifacts/flashcards/public/audio/listening/<testId>-<lineIdx>.mp3
 *
 * Run from artifacts/flashcards: pnpm exec tsx scripts/generate-listening-audio.ts
 *
 * - Skips files that already exist (resumable)
 * - Voice: nova for "f", alloy for "m"
 * - Speed: 0.92 (matches AudioPlayer)
 * - Model: tts-1
 *
 * Requires OPENAI_API_KEY in env.
 */
import { writeFile, access, mkdir } from "node:fs/promises";
import { constants } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { LISTENING_SKILL_TESTS } from "../src/data/listening-skills.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const OUT_DIR = path.resolve(__dirname, "..", "public", "audio", "listening");

const SPEED = 0.92;
const MODEL = "tts-1" as const;

async function exists(p: string): Promise<boolean> {
  try { await access(p, constants.F_OK); return true; } catch { return false; }
}

async function main() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.error("OPENAI_API_KEY is not set. Aborting.");
    process.exit(1);
  }

  await mkdir(OUT_DIR, { recursive: true });

  const countTotal = LISTENING_SKILL_TESTS.reduce((s, t) => s + t.audioLines.length, 0);
  const maxBatch = process.env.BATCH ? Number(process.env.BATCH) : Infinity;
  let total = 0;
  let generated = 0;
  let skipped = 0;
  let failed = 0;

  for (const test of LISTENING_SKILL_TESTS) {
    for (let i = 0; i < test.audioLines.length; i++) {
      total++;
      const line = test.audioLines[i];
      const file = path.join(OUT_DIR, `${test.id}-${i}.mp3`);

      if (await exists(file)) { skipped++; continue; }

      const voice = line.voice === "f" ? "nova" : "alloy";
      try {
        process.stdout.write(`[${total}/${countTotal}] ${test.id}-${i} (${voice}) ... `);
        const res = await fetch("https://api.openai.com/v1/audio/speech", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: MODEL,
            voice,
            input: line.text.slice(0, 4096),
            speed: SPEED,
            response_format: "mp3",
          }),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}: ${await res.text().catch(() => "")}`);
        const buf = Buffer.from(await res.arrayBuffer());
        await writeFile(file, buf);
        generated++;
        console.log(`${(buf.length / 1024).toFixed(1)} KB`);
      } catch (err) {
        failed++;
        const msg = err instanceof Error ? err.message : String(err);
        console.log(`FAILED: ${msg}`);
      }

      if (generated >= maxBatch) {
        console.log(`\nBatch limit ${maxBatch} reached. Re-run to continue.`);
        console.log(`Progress: total=${total} generated=${generated} skipped=${skipped} failed=${failed}`);
        return;
      }
      // Gentle pacing to avoid bursts
      await new Promise(r => setTimeout(r, 80));
    }
  }

  console.log(`\nDone. total=${total} generated=${generated} skipped=${skipped} failed=${failed}`);
  console.log(`Output: ${OUT_DIR}`);
}

main().catch(err => { console.error(err); process.exit(1); });
