#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { PDFParse } = require("pdf-parse");
const Anthropic = require("@anthropic-ai/sdk").default;

const PDF_PATH = path.join(
  __dirname,
  "../attached_assets/84f8c565-a19c-4d80-98b6-bbf697c76889_3000_academic_words_with__1775601640996.pdf"
);
const OUTPUT_JSON = path.join(
  __dirname,
  "../attached_assets/vocabulary-translated.json"
);
const PARSED_JSON = path.join(
  __dirname,
  "../attached_assets/vocabulary-parsed.json"
);

async function extractPDF() {
  console.log("Extracting PDF text...");
  const parser = new PDFParse({ url: PDF_PATH });
  const data = await parser.getText();
  return data.text;
}

function parseVocabularyText(text) {
  const lines = text.split("\n");
  
  const LEVEL_META = {
    A1: { name: "Foundational", totalWords: 750 },
    A2: { name: "Elementary", totalWords: 750 },
    B1: { name: "Intermediate", totalWords: 500 },
    B2: { name: "Upper-Intermediate", totalWords: 500 },
    C1: { name: "Advanced", totalWords: 500 },
  };
  
  const levels = {};
  for (const [k, v] of Object.entries(LEVEL_META)) {
    levels[k] = { name: v.name, totalWords: v.totalWords, entries: [] };
  }
  
  let currentLevel = null;
  let pendingEntry = null;

  const levelHeaderPattern = /^4ielts\.com\s+IELTS Vocabulary\s+·\s+(A1|A2|B1|B2|C1)\s+·/;
  const POS_OPTIONS = "(?:adj\\.|adv\\.|arti\\.|conj\\.|det\\.|excl\\.|idiom\\.|moda\\.|n\\.|n\\.pl\\.|prep\\.|pron\\.|v\\.)";
  const fullEntryPattern = new RegExp(`^(\\d+)\\s+(\\S+(?:\\s+\\S+)?)\\s+(${POS_OPTIONS})\\s+(.+)$`);
  const partialEntryPattern = new RegExp(`^(\\d+)\\s+(\\S+(?:\\s+\\S+)?)\\s+(${POS_OPTIONS})\\s*$`);
  
  const isSkipLine = (l) => {
    return !l || l.startsWith("www.4ielts.com") || l.startsWith("4ielts.com") ||
      l.startsWith("-- ") || l.startsWith("# WORD") ||
      l.match(/^Page \d+/) || l.includes("3,000 Words Total") ||
      l === "CEFR VOCABULARY SERIES" || l === "A1 A2 B1 B2 C1" ||
      l.match(/^(A1|A2|B1|B2|C1)\s*·\s*(Foundational|Elementary|Intermediate|Upper|Advanced)\s*—/) ||
      l.match(/^End of [A-C][12] Vocabulary/);
  };
  
  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i];
    const trimmed = raw.trim();
    
    if (!trimmed) continue;
    
    const levelMatch = levelHeaderPattern.exec(trimmed);
    if (levelMatch) {
      if (pendingEntry && currentLevel) {
        levels[currentLevel].entries.push(pendingEntry);
        pendingEntry = null;
      }
      currentLevel = levelMatch[1];
      continue;
    }
    
    if (!currentLevel) continue;
    
    if (isSkipLine(trimmed)) {
      continue;
    }
    
    const fullMatch = fullEntryPattern.exec(trimmed);
    if (fullMatch) {
      if (pendingEntry) {
        levels[currentLevel].entries.push(pendingEntry);
        pendingEntry = null;
      }
      const [, num, word, pos, sentence] = fullMatch;
      const entryNum = parseInt(num);
      const nextLine = (lines[i + 1] || "").trim();
      
      if (nextLine && !isSkipLine(nextLine) && !levelHeaderPattern.exec(nextLine) && !fullEntryPattern.exec(nextLine) && !partialEntryPattern.exec(nextLine)) {
        pendingEntry = {
          num: entryNum,
          word: word.trim(),
          pos: pos.trim(),
          sentence: sentence.trim() + " " + nextLine,
        };
        i++;
      } else {
        levels[currentLevel].entries.push({
          num: entryNum,
          word: word.trim(),
          pos: pos.trim(),
          sentence: sentence.trim(),
        });
      }
      continue;
    }
    
    const partialMatch = partialEntryPattern.exec(trimmed);
    if (partialMatch) {
      if (pendingEntry) {
        levels[currentLevel].entries.push(pendingEntry);
      }
      const [, num, word, pos] = partialMatch;
      const nextLine = (lines[i + 1] || "").trim();
      const nextNextLine = (lines[i + 2] || "").trim();
      
      let sentence = "";
      if (nextLine && !isSkipLine(nextLine) && !levelHeaderPattern.exec(nextLine) && !fullEntryPattern.exec(nextLine) && !partialEntryPattern.exec(nextLine)) {
        sentence = nextLine;
        i++;
        if (nextNextLine && !isSkipLine(nextNextLine) && !levelHeaderPattern.exec(nextNextLine) && !fullEntryPattern.exec(nextNextLine) && !partialEntryPattern.exec(nextNextLine)) {
          sentence += " " + nextNextLine;
          i++;
        }
      }
      
      pendingEntry = null;
      levels[currentLevel].entries.push({
        num: parseInt(num),
        word: word.trim(),
        pos: pos.trim(),
        sentence: sentence.trim(),
      });
      continue;
    }
  }
  
  if (pendingEntry && currentLevel) {
    levels[currentLevel].entries.push(pendingEntry);
  }
  
  for (const [level, data] of Object.entries(levels)) {
    const seen = new Set();
    data.entries = data.entries.filter(e => {
      if (seen.has(e.num)) return false;
      seen.add(e.num);
      return true;
    });
    data.entries.sort((a, b) => a.num - b.num);
    console.log(`  ${level}: ${data.entries.length} / ${data.totalWords} entries parsed`);
  }
  
  return levels;
}

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function translateBatch(client, entries, level) {
  const prompt = `You are a professional Arabic translator specializing in English language learning materials for Arabic-speaking IELTS students. Translate the following English vocabulary entries into Arabic.

For each entry, provide:
1. wordAr: Natural Arabic translation of the English word (single word or short phrase)
2. sentenceAr: Natural, clear Arabic translation of the example sentence

Return ONLY a JSON array (no markdown, no code blocks, no explanation) with exactly this format:
[
  {"num": 1, "wordAr": "قادر", "sentenceAr": "هي قادرة على القراءة والكتابة باللغة الإنجليزية."},
  ...
]

Vocabulary entries (Level ${level}):
${entries.map(e => `${e.num}. Word: "${e.word}" (${e.pos}) | Sentence: "${e.sentence}"`).join("\n")}`;

  let retries = 0;
  const maxRetries = 5;
  
  while (retries < maxRetries) {
    try {
      const message = await client.messages.create({
        model: "claude-haiku-4-5",
        max_tokens: 8192,
        messages: [{ role: "user", content: prompt }],
      });
      
      const responseText = message.content[0].type === "text" ? message.content[0].text : "";
      
      const jsonMatch = responseText.match(/\[[\s\S]*\]/);
      if (!jsonMatch) {
        console.error("  Bad response:", responseText.substring(0, 200));
        throw new Error("No JSON array found in response");
      }
      
      const translations = JSON.parse(jsonMatch[0]);
      return translations;
    } catch (err) {
      retries++;
      if (retries >= maxRetries) {
        console.error(`Failed after ${maxRetries} retries:`, err.message);
        return entries.map(e => ({ num: e.num, wordAr: "—", sentenceAr: "—" }));
      }
      const delay = Math.pow(2, retries) * 1000;
      console.log(`  Retry ${retries}/${maxRetries} in ${delay}ms...`);
      await sleep(delay);
    }
  }
}

async function translateAll(levels) {
  const client = new Anthropic({
    baseURL: process.env.AI_INTEGRATIONS_ANTHROPIC_BASE_URL,
    apiKey: process.env.AI_INTEGRATIONS_ANTHROPIC_API_KEY || "dummy",
  });
  
  let existing = {};
  if (fs.existsSync(OUTPUT_JSON)) {
    console.log("Loading existing translations...");
    existing = JSON.parse(fs.readFileSync(OUTPUT_JSON, "utf8"));
  }
  
  const BATCH_SIZE = 35;
  const result = JSON.parse(JSON.stringify(existing));
  
  for (const [level, data] of Object.entries(levels)) {
    if (!result[level]) {
      result[level] = { name: data.name, totalWords: data.totalWords, entries: [] };
    }
    
    const existingNums = new Set((result[level].entries || []).map(e => e.num));
    const toTranslate = data.entries.filter(e => !existingNums.has(e.num) && e.sentence);
    
    console.log(`\nLevel ${level} (${data.name}): ${toTranslate.length} entries to translate (${existingNums.size} already done)`);
    
    for (let i = 0; i < toTranslate.length; i += BATCH_SIZE) {
      const batch = toTranslate.slice(i, i + BATCH_SIZE);
      const batchNum = Math.floor(i / BATCH_SIZE) + 1;
      const totalBatches = Math.ceil(toTranslate.length / BATCH_SIZE);
      console.log(`  Batch ${batchNum}/${totalBatches}: entries ${batch[0].num}–${batch[batch.length - 1].num}...`);
      
      const translations = await translateBatch(client, batch, level);
      
      const translationMap = {};
      translations.forEach(t => { translationMap[t.num] = t; });
      
      batch.forEach(entry => {
        const trans = translationMap[entry.num] || { wordAr: "—", sentenceAr: "—" };
        result[level].entries.push({
          num: entry.num,
          word: entry.word,
          pos: entry.pos,
          sentence: entry.sentence,
          wordAr: trans.wordAr || "—",
          sentenceAr: trans.sentenceAr || "—",
        });
      });
      
      result[level].entries.sort((a, b) => a.num - b.num);
      fs.writeFileSync(OUTPUT_JSON, JSON.stringify(result, null, 2));
      
      if (i + BATCH_SIZE < toTranslate.length) {
        await sleep(300);
      }
    }
    
    const noSentence = data.entries.filter(e => !e.sentence && !existingNums.has(e.num));
    for (const entry of noSentence) {
      result[level].entries.push({
        num: entry.num,
        word: entry.word,
        pos: entry.pos,
        sentence: "",
        wordAr: "—",
        sentenceAr: "—",
      });
    }
    result[level].entries.sort((a, b) => a.num - b.num);
    fs.writeFileSync(OUTPUT_JSON, JSON.stringify(result, null, 2));
  }
  
  return result;
}

async function main() {
  try {
    let parsedLevels;
    
    if (fs.existsSync(PARSED_JSON)) {
      console.log("Loading previously parsed vocabulary...");
      parsedLevels = JSON.parse(fs.readFileSync(PARSED_JSON, "utf8"));
      for (const [level, data] of Object.entries(parsedLevels)) {
        console.log(`  ${level}: ${data.entries.length} entries`);
      }
    } else {
      const text = await extractPDF();
      parsedLevels = parseVocabularyText(text);
      fs.writeFileSync(PARSED_JSON, JSON.stringify(parsedLevels, null, 2));
      console.log(`Parsed vocabulary saved to ${PARSED_JSON}`);
    }
    
    await translateAll(parsedLevels);
    
    console.log("\nAll translations complete!");
    
    const finalData = JSON.parse(fs.readFileSync(OUTPUT_JSON, "utf8"));
    let total = 0;
    for (const [level, data] of Object.entries(finalData)) {
      const count = data.entries.length;
      total += count;
      console.log(`  ${level}: ${count} entries`);
    }
    console.log(`  Total: ${total} entries`);
    
  } catch (err) {
    console.error("Fatal error:", err);
    process.exit(1);
  }
}

main();
