/**
 * Shared, forgiving learner-answer matching used by every IELTS scorer
 * (Reading skills, Listening skills, Reading mock test, Listening mock test).
 *
 * Goal: accept answers that are semantically correct but differ from the
 * answer-key in harmless ways, while still rejecting genuinely wrong answers.
 *
 * Accepted differences:
 *   - case ("December" / "december")
 *   - leading / trailing whitespace, collapsed inner spaces
 *   - wrapping or trailing punctuation, quotes, brackets
 *   - leading articles / prepositions ("the Pacific Ocean" → "Pacific Ocean",
 *     "on 24 April 1990" → "24 April 1990", "in December 1993" → "December 1993")
 *   - trailing length-style units glued to a number ("2.4m" → "2.4",
 *     "5km" → "5", "20%" → "20"). Mass / volume units like kg, g, ml, l are
 *     deliberately NOT stripped, so a wrong-unit answer ("2.4kg" for a metres
 *     question) stays wrong.
 *   - thousands separators inside numbers ("19,000" / "19000")
 *   - curly vs straight quotes and en/em dashes
 *
 * Rejected (still wrong):
 *   - missing key tokens ("1993" for "December 1993")
 *   - different numeric value ("3" for "2.4")
 *   - wrong unit family ("2.4kg" for a metres question)
 *   - empty / whitespace-only answers
 */

const FILLER_PREFIXES = [
  "the", "a", "an",
  "in", "on", "at", "to", "of", "by", "for", "from", "with",
  "into", "about", "around", "as", "is", "was", "are",
];

// Only length-style units + percent. Mass / volume / temperature units are
// excluded on purpose so wrong-unit answers stay wrong.
const TRAILING_UNITS = ["mm", "cm", "km", "m", "ft", "in", "yd", "mi", "%"];

/** Forgiving normalisation. */
export function normaliseAnswer(raw: string): string {
  let s = String(raw ?? "").toLowerCase();
  s = s
    .replace(/[\u2010-\u2015\u2212]/g, "-")
    .replace(/[\u2018\u2019\u02bc\u2032`]/g, "'")
    .replace(/[\u201c\u201d\u2033]/g, '"');
  s = s.replace(/^[\s"'`(\[]+|[\s"'`)\]]+$/g, "");
  s = s.replace(/^[\s$€£¥]+/, "").replace(/[\s$€£¥]+$/, "");
  s = s.replace(/[.,;:!?]+$/g, "");
  s = s.replace(/\s+/g, " ").trim();

  let changed = true;
  while (changed) {
    changed = false;
    for (const p of FILLER_PREFIXES) {
      const re = new RegExp("^" + p + "\\s+");
      if (re.test(s)) {
        s = s.replace(re, "");
        changed = true;
        break;
      }
    }
  }

  for (const u of TRAILING_UNITS) {
    const re = new RegExp(
      "^([\\d][\\d.,]*)\\s*" + u.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "$",
    );
    if (re.test(s)) {
      s = s.replace(re, "$1");
      break;
    }
  }

  if (/^-?\d[\d,]*(\.\d+)?$/.test(s)) {
    s = s.replace(/,/g, "");
  }
  return s.trim();
}

/** Strict (case + trim) compare — used as the first pass before normalisation. */
export function strictAnswer(s: string): string {
  return String(s ?? "").trim().toLowerCase();
}

/**
 * Returns true if `userRaw` matches any candidate answer.
 * Tries strict equality first, then forgiving normalisation.
 */
export function answerMatches(userRaw: string, candidates: string[]): boolean {
  if (typeof userRaw !== "string" || !userRaw.trim()) return false;
  const u1 = strictAnswer(userRaw);
  if (candidates.some((c) => strictAnswer(c) === u1)) return true;
  const u2 = normaliseAnswer(userRaw);
  if (!u2) return false;
  return candidates.some((c) => normaliseAnswer(c) === u2);
}
