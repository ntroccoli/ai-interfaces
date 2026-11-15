// SPDX-License-Identifier: MIT
// Validate case files, lesson pages and the checklist. Rules: docs/format.md "Case files", "Lessons"
// and "Checklist".
// Usage: node scripts/validate.mjs            (all of cases/, evidence/, lessons/, log.md and, once it
//                                              exists, checklist.md)
//        node scripts/validate.mjs <file|dir>  (only those cases; no checklist check)
//        node scripts/validate.mjs --cases-dir cases <staged case>  (its links resolve in cases/)
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, dirname, resolve, basename } from 'node:path';
import {
  ROOT, CASES_DIR, EVIDENCE_DIR, CHECKLIST, NOTICE, SOURCE_TYPES, RELATIONS, EVIDENCE, OUTCOMES,
  STATUSES, BASES, REQUIRED, CASE_TYPES, AI_ROLES, MEASURES, CHECKED_AGAINST, SECTIONS, NUMBERS_HEADER, UNITS, SCALES,
  CHECKLIST_MAX_BYTES, REPO_SLUGS, REPO_BLOB,
  parseCase, listCases, sections, refDefs, linksIn, anchor, practices, closestPractices,
  LESSONS_DIR, LESSON_PAGES, LESSON_MAX_BYTES, INDEX_MAX_BYTES, LLMS_MAX_BYTES, LESSON_NOTE, LESSON_LEGEND, KARPATHY_IDEAS,
  PEOPLE_CHECK, PEOPLE_GROUND, AGENTS_MAX_BYTES, MODEL_DEPENDENCE, STRENGTHS, META_LABEL, META_LINE, parseLessonPage, strengthCeiling, lessonMeta,
  casesOf, expectedEra, eraText, parseEra, LOG, CHANGES_DIR, logEntries, parseChanges,
  LABEL_MAX, splitModel,
} from './lib.mjs';
// A URL to a file of this repository (any slug in REPO_SLUGS): its path inside the repository, or undefined.
const inRepo = u => REPO_SLUGS.map(REPO_BLOB).map(b => (u || '').startsWith(b) ? (u || '').slice(b.length) : undefined).find(Boolean);

const errors = [];
const warnings = [];
const err = (file, msg) => errors.push(`${file}: ${msg}`);
const pad = n => String(n).padStart(2, '0');
const localDate = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const today = localDate(new Date()); // local, not UTC: the maintainer works at UTC-3
// A real calendar date: Date.parse accepts 2025-02-30 and rolls it over, so compare the round trip.
const realDate = s => /^\d{4}-\d{2}-\d{2}$/.test(s || '') && new Date(`${s}T00:00:00Z`).toISOString().slice(0, 10) === s;
const isHttps = u => /^https:\/\/[^\s<>"]+$/.test(u || '');
const words = s => s.trim().split(/\s+/).filter(Boolean).length;
const notice = existsSync(NOTICE) ? readFileSync(NOTICE, 'utf8').replace(/\r\n/g, '\n') : '';

// ---- Units ----------------------------------------------------------------------------------
// The units rule (docs/format.md "Case files" points here). A number is a word that starts with a digit,
// after an optional ~ ≈ $ € £ or opening bracket: 3,500, 3.5K, 4.0x, 60–90%. Not numbers: digits
// inside a word (GPT-5.6, E0425, o200k), inline code, link targets, dates (2025-04-01, 2025-04),
// periods (2023..2024), list markers, ordinals (4th) and digit-led names (1Password: a digit then a
// capitalised word). Exempt: a year (1900-2099) or a range of years (2023–2026) with no unit after
// it; a number of up to three digits right after a capitalised name that does not start a sentence
// (Opus 4.8, Java 21, August 21; also inside a bracket, (Claude 2.1); and the second of a pair
// after such a name, JUnit 4 and 5, Java 17 or 21); and a number after a label word (part 4,
// step 2, day 5; see LABELS). Every other number needs a unit: a % or x suffix, a currency sign, or a word
// from UNITS (scripts/lib.mjs) within the next three words; scale words such as "million" or "K"
// may sit between. In "5 to 10 files", "120 of 140 files" or "10 versus 3 points" the first number
// takes the unit of the second, and in a list ("10.37, 7.56, 7.50 steps") every number takes the unit
// of the last. A number after "study", "experiment" or "condition" is a label. It is a heuristic: it catches a bare number, not a wrong unit, and numbers written as
// words ("three") are not checked. Returns the numbers that lack a unit and the count of numbers
// that need a source.
const NUM = /^[~≈(]*([$€£]?)(\d+(?:,\d{3})*(?:\.\d+)?(?:[–-]\d+(?:,\d{3})*(?:\.\d+)?)?)([a-zA-Z%]*)\+?[)\]]*[.,;:!?)]*$/;
const CONNECTORS = new Set(['to', 'of', 'and', 'or', 'out', 'in', 'from', 'the', 'by', '–', '-', '/', 'vs', 'versus']);
const STARTERS = new Set(['The', 'A', 'An', 'In', 'By', 'Over', 'About', 'Only', 'All', 'Each', 'Some',
  'Of', 'For', 'With', 'After', 'Before', 'Its', 'Their', 'These', 'Those', 'At', 'On', 'To', 'From',
  'Up', 'Nearly', 'Around', 'Roughly', 'Just', 'And', 'But', 'Then', 'Within', 'Across', 'Under']);
// Words after which a number is a label, not a quantity: part 4, step 2, version 3.
const LABELS = new Set(['part', 'parts', 'step', 'phase', 'version', 'figure', 'table', 'section', 'chapter', 'round', 'day', 'week',
  'study', 'experiment', 'condition', 'severity']);
// A plural is accepted: "-s" ("files"), "-es" ("misses"), and "-ies" for a unit ending in "y" ("dependencies").
const isUnit = w => {
  const x = w.toLowerCase().split('-').pop();
  return UNITS.has(x) || (x.endsWith('ies') && UNITS.has(x.slice(0, -3) + 'y')) || (x.endsWith('s') && UNITS.has(x.slice(0, -1)))
    || (x.endsWith('es') && UNITS.has(x.slice(0, -2)));
};
const bare = t => t.replace(/^[^\p{L}\p{N}%]+|[^\p{L}\p{N}%]+$/gu, '');

function checkUnits(text) {
  const clean = text
    .replace(/`[^`]*`/g, ' ')
    .replace(/\]\([^)]*\)/g, ']')
    .replace(/https?:\/\/\S+/g, ' ')
    .replace(/\b\d{4}(-\d{2}){1,2}\b/g, ' ')
    .replace(/\b\d{4}(-\d{2})?\.\.\d{4}(-\d{2})?\b/g, ' ')
    .replace(/\*+|_{2,}|\[|\]/g, ' ')
    .replace(/^\s*(\d+\.|[-|>])\s/gm, ' ');
  const toks = clean.split(/\s+/).filter(Boolean);
  const endsClause = t => /[.,;:!?)]$/.test(t);
  // Does the number at toks[i] have a unit? `hops` limits how far "5 to 10 files" may chain.
  const look = (i, hops = 0) => {
    const [, currency, , suffix] = toks[i].match(NUM);
    if (currency || suffix === '%' || /^x$/i.test(suffix) || isUnit(suffix)) return true;
    if (suffix && !SCALES.has(suffix.toLowerCase())) return false;
    // A list of numbers that share the unit after the last one: "10.37, 7.56, 7.50 steps".
    if (/,$/.test(toks[i]) && toks[i + 1] && NUM.test(toks[i + 1])) return hops < 5 && look(i + 1, hops + 1);
    if (endsClause(toks[i])) return false;
    for (let j = i + 1, n = 0; j < toks.length && n < 3; j++) {
      if (!SCALES.has(bare(toks[j]).toLowerCase())) n++; // scale words do not use up the three
      if (NUM.test(toks[j])) {
        const between = toks.slice(i + 1, j).map(t => bare(t).toLowerCase());
        return hops < 3 && between.every(b => CONNECTORS.has(b)) && look(j, hops + 1);
      }
      if (toks[j] === '|') return false; // a table cell ends here
      if (isUnit(bare(toks[j]))) return true;
      if (endsClause(toks[j])) return false;
    }
    return false;
  };
  let need = 0;
  const missing = [];
  const named = new Set(); // indices of numbers exempted as part of a name (Opus 4.8)
  toks.forEach((t, i) => {
    const m = t.match(NUM);
    if (!m) return;
    const core = m[2];
    if (/^(st|nd|rd|th)$/i.test(m[3])) return; // an ordinal: 4th
    if (/^[A-Z][a-z]{2,}$/.test(m[3])) return; // a digit-led name: 1Password
    const hasUnit = look(i);
    // A year or a range of years (1999 files is a quantity).
    if (!m[1] && !m[3] && /^(19|20)\d\d([–-](19|20)\d\d)?$/.test(core) && !hasUnit) return;
    const prev = (toks[i - 1] || '').replace(/^[([]+/, ''); // (Claude 2.1): the name is inside the bracket
    if (LABELS.has(bare(prev).toLowerCase())) return; // part 4
    // A name before a small number (Opus 4.8), but not a word that starts a sentence.
    const sentenceStart = i < 2 || /[.!?:]$/.test(toks[i - 2]);
    const small = /^\d{1,3}(\.\d+)?$/.test(core);
    if (small && /^[A-Z][\p{L}.-]*$/u.test(prev) && !STARTERS.has(prev) && !sentenceStart) { named.add(i); return; }
    // The second of a pair after a name: JUnit 4 and 5, Java 17 or 21, Python 2 to 3.
    if (small && ['and', 'or', 'to'].includes(prev) && named.has(i - 2)) { named.add(i); return; }
    need++;
    if (!hasUnit) missing.push(t.replace(/[.,;:!?)]+$/, ''));
  });
  return { need, missing };
}

// Split a body into blocks: headings, paragraphs, list items, table rows, quote lines.
// `offset` is the number of file lines before the body, so reported lines match the file.
function blocks(body, offset = 0) {
  const out = [];
  let cur = null;
  let inCode = false;
  body.split('\n').forEach((l, i) => {
    if (/^```/.test(l)) { inCode = !inCode; cur = null; return; }
    if (inCode) return;
    const start = { text: l, line: offset + i + 1 };
    if (!l.trim()) cur = null;
    else if (/^#{1,6} /.test(l)) { out.push({ ...start, heading: true }); cur = null; }
    else if (/^\|/.test(l) || /^>/.test(l)) { out.push({ ...start, quote: /^>/.test(l) }); cur = null; }
    else if (/^\s*([-*]|\d+\.)\s/.test(l) && !/^\s{2,}/.test(l)) { cur = { ...start }; out.push(cur); }
    else if (cur) cur.text += '\n' + l;
    else { cur = { ...start }; out.push(cur); }
  });
  return out;
}

// ---- Cases ----------------------------------------------------------------------------------
function validateCase(c) {
  const { file, path, meta, body, error } = c;
  if (error) return err(file, error);
  for (const k of REQUIRED) if (!(k in meta)) err(file, `missing key "${k}"`);
  for (const k of Object.keys(meta)) if (!REQUIRED.includes(k)) err(file, `unknown key "${k}"`);

  if (!/^\d{4}-\d{2}-\d{2}-[a-z0-9]+(-[a-z0-9]+)*\.md$/.test(file)) err(file, 'file name must be YYYY-MM-DD-org-what.md');
  if (!realDate(meta.date)) err(file, 'date must be a real date, YYYY-MM-DD');
  else {
    if (!file.startsWith(meta.date)) err(file, 'file name must start with the date');
    if (meta.date > today) err(file, `date ${meta.date} is in the future`);
  }
  if (!meta.title) err(file, 'title is empty');
  if (!meta.org) err(file, 'org is empty');
  // label: the case's one short name in every generated list, lesson page, the checklist and the docs.
  if (typeof meta.label !== 'string' || !meta.label || meta.label.length > LABEL_MAX || /[[\]:]/.test(meta.label)) {
    err(file, `label: a short name, at most ${LABEL_MAX} characters, with no brackets or colon`);
  } else if ((labelCount.get(meta.label.toLowerCase()) || 0) > 1) err(file, `label "${meta.label}" is used by another case; labels are unique`);
  if (!meta.summary || meta.summary.length > 160) err(file, 'summary: one sentence, at most 160 characters');
  if (!isHttps(meta.source_url)) err(file, 'source_url must be an https URL');
  if (!Array.isArray(meta.also)) err(file, 'also must be an inline list, e.g. []');
  else for (const u of meta.also) if (!isHttps(u)) err(file, `also: bad URL ${u}`);
  const enums = { source_type: SOURCE_TYPES, author_relation: RELATIONS, evidence: EVIDENCE, case_type: CASE_TYPES,
    outcome: OUTCOMES, status: STATUSES };
  for (const [k, vals] of Object.entries(enums)) if (k in meta && !vals.includes(meta[k])) err(file, `${k} must be one of ${vals.join(', ')}`);
  // A source in this repository is an evidence file (evidence/<case>.md), written from the maintainer's own
  // private records; only the maintainer's own cases may cite one, and only they use source_type evidence-file.
  const own = inRepo(meta.source_url);
  if (own !== undefined || meta.source_type === 'evidence-file') {
    if (meta.author_relation !== 'maintainer-own') err(file, 'a source in this repository (evidence-file) is allowed only for author_relation: maintainer-own');
    if (meta.source_type !== 'evidence-file') err(file, 'a source in this repository needs source_type: evidence-file');
    if (own === undefined) err(file, `source_type evidence-file needs a source_url in this repository: ${REPO_BLOB(REPO_SLUGS[0])}evidence/<case>.md`);
    else if (own !== `evidence/${file}`) err(file, `an evidence file is evidence/${file}, named like its case (found ${own})`);
    else if (!existsSync(join(ROOT, own))) err(file, `evidence file not found: ${own}`);
  }
  // Inline lists from a fixed vocabulary: at least one value, no repeats; `none` stands alone.
  const lists = { ai_role: AI_ROLES, measures: MEASURES, checked_against: CHECKED_AGAINST };
  for (const [k, vals] of Object.entries(lists)) {
    const v = meta[k];
    if (!Array.isArray(v) || !v.length) { err(file, `${k}: an inline list of ${vals.join(', ')}`); continue; }
    for (const x of v) if (!vals.includes(x)) err(file, `${k}: "${x}" must be one of ${vals.join(', ')}`);
    if (new Set(v).size !== v.length) err(file, `${k}: a value is listed twice`);
    if (v.includes('none') && v.length > 1) err(file, `${k}: [none] stands alone`);
  }
  for (const k of ['subject', 'sample']) {
    if (typeof meta[k] !== 'string' || !meta[k] || (k === 'subject' && meta[k] === 'unstated')) {
      err(file, `${k}: short text${k === 'sample' ? ', or "unstated"' : ''}`); continue;
    }
    for (const n of checkUnits(meta[k]).missing) err(file, `${k}: number "${n}" has no unit`);
  }
  // cost: the spend with its unit (money, tokens, compute), or "unstated".
  if (typeof meta.cost !== 'string' || !meta.cost) err(file, 'cost: the spend with its unit, or "unstated"');
  else if (meta.cost !== 'unstated') {
    const { need, missing } = checkUnits(meta.cost);
    if (!need) err(file, 'cost: give an amount with its unit (for example ~$120,000), or "unstated"');
    for (const n of missing) err(file, `cost: number "${n}" has no unit`);
  }
  for (const k of ['tools', 'models']) if (!Array.isArray(meta[k]) || !meta[k].length) err(file, `${k}: an inline list, or [unstated]`);
  // Each model carries its roles in the work, from the case's ai_role: "GPT-4 (simulate-user/judge)".
  if (Array.isArray(meta.models)) for (const x of meta.models.filter(x => x !== 'unstated')) {
    const { name, roles } = splitModel(x);
    if (!roles.length) err(file, `models: "${x}" needs its roles in brackets after the name, from ai_role, joined by /: "${name} (judge)"`);
    else for (const r of roles) if (![meta.ai_role].flat().includes(r)) err(file, `models: "${x}" has role ${r}, which ai_role does not list`);
  }
  if (!/^(unstated|\d{4}(-\d{2})?(\.\.\d{4}(-\d{2})?)?)$/.test(meta.period || '')) err(file, 'period: YYYY, YYYY-MM, a range A..B, or unstated');
  if (meta.status === 'superseded') {
    if (!meta.superseded_by) err(file, 'superseded needs superseded_by');
    else if (!/^\d{4}-\d{2}-\d{2}-[a-z0-9-]+\.md$/.test(meta.superseded_by) || meta.superseded_by === file) err(file, `superseded_by must name another case file`);
    else if (!existsSync(join(linkBase(path), meta.superseded_by))) err(file, `superseded_by "${meta.superseded_by}" not found`);
    else if (statusOf.has(meta.superseded_by) && statusOf.get(meta.superseded_by) !== 'current') err(file, `superseded_by "${meta.superseded_by}" is itself superseded; point to the current case`);
    // Only a later account of the same work by the same org supersedes a case.
    else if (orgOf.has(meta.superseded_by) && orgOf.get(meta.superseded_by) !== meta.org) err(file, `superseded_by "${meta.superseded_by}" is another org's case; only the same org's later account of the same work supersedes`);
  } else if (meta.superseded_by) err(file, 'superseded_by set but status is current');

  // Title, summary paragraph, sections in order.
  const lines = body.split('\n');
  const h1 = lines.findIndex(l => /^# /.test(l));
  if (h1 < 0 || lines[h1].slice(2).trim() !== meta.title) err(file, 'first heading must equal the title');
  const firstH2 = lines.findIndex(l => /^## /.test(l));
  const summaryWords = words(lines.slice(h1 + 1, firstH2 < 0 ? undefined : firstH2).join(' '));
  if (summaryWords < 40 || summaryWords > 150) err(file, `summary paragraph has ${summaryWords} words (40 to 150)`);
  const secs = sections(body);
  const names = secs.map(s => s.name);
  const expected = SECTIONS.filter(s => !s.optional || names.includes(s.name)).map(s => s.name);
  if (names.join('|') !== expected.join('|')) err(file, `sections must be, in order: ${expected.join(', ')} (found: ${names.join(', ')})`);
  const sec = n => secs.find(s => s.name === n)?.text ?? '';
  for (const s of secs) if (!s.text) err(file, `section "${s.name}" is empty`);

  // The case's own source URLs: links to them count as source links.
  const sources = [meta.source_url, ...(Array.isArray(meta.also) ? meta.also : [])]
    .filter(u => typeof u === 'string' && u).map(u => u.replace(/\/$/, ''));
  const isSource = u => sources.some(s => u.split('#')[0].replace(/\/$/, '') === s);

  // Who did what: the three bullets.
  for (const who of ['AI', 'Rule-based tools', 'People']) {
    if (!new RegExp(`^- \\*\\*${who}:\\*\\*\\s+\\S`, 'm').test(sec('Who did what'))) err(file, `"Who did what" needs "- **${who}:** ..."`);
  }
  // What went wrong: never empty, and it names what the source leaves out.
  const wrong = sec('What went wrong');
  if (!wrong) err(file, '"What went wrong" is empty; write "The source reports none." when it does');
  if (!/^- \*\*Not reported:\*\*\s+\S/m.test(wrong)) err(file, '"What went wrong" needs "- **Not reported:** ..." (what the source leaves out)');
  // Practices: one line each.
  const prac = sec('Practices to copy').split('\n').filter(l => l.trim());
  if (!prac.length) err(file, '"Practices to copy" needs at least one item');
  // Each: `- [stated] text ([Section](source-url#anchor))` or `- [ours] ...`, one line.
  for (const l of prac) {
    const p = l.trimEnd().match(/^- \[(stated|ours)\] (.+) \(\[[^\]]+\]\((https:[^)\s]+)\)\)$/);
    if (!p) { err(file, `practice must be one line: "- [stated] or [ours] text ([Section](source link))": "${l.slice(0, 50)}"`); continue; }
    if (p[2].length > 200) err(file, `practice text longer than 200 characters: "${p[2].slice(0, 50)}..."`);
    if (checkUnits(p[2]).need) err(file, `practice holds a number (keep numbers in the Numbers table): "${p[2].slice(0, 50)}"`);
    if (!isSource(p[3])) err(file, `practice must link a section of this case's source: "${p[2].slice(0, 50)}"`);
  }

  // Links: well-formed external links, relative links that resolve.
  const noCode = body.replace(/```[\s\S]*?```/g, '').replace(/`[^`]*`/g, '');
  for (const [, target] of noCode.matchAll(/\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g)) {
    if (/^https?:/.test(target)) {
      if (!isHttps(target)) err(file, `link must be https: ${target}`);
      // A link to a file of this repository (an evidence file) must resolve here, anchor included,
      // since the URL exists only once the repository is published.
      const rel = inRepo(target);
      if (rel !== undefined) {
        const [p, a] = rel.split('#');
        if (!existsSync(join(ROOT, p))) err(file, `link to this repository: ${p} not found`);
        else if (a && !headingAnchors(join(ROOT, p)).has(a)) err(file, `link to this repository: no heading #${a} in ${p}`);
      }
      continue;
    }
    if (/^[a-z][a-z0-9+.-]*:/i.test(target)) continue; // mailto: and other schemes are not files
    const t = target.split('#')[0];
    if (t && !existsSync(resolve(linkBase(path), t))) err(file, `broken link ${target}`);
  }

  // Numbers table.
  const tbl = sec('Numbers').split('\n').filter(l => l.startsWith('|'));
  if (tbl[0] !== NUMBERS_HEADER) err(file, `"Numbers" table header must be: ${NUMBERS_HEADER}`);
  if (!/^\|(\s*:?-{3,}:?\s*\|){4}$/.test(tbl[1] || '')) err(file, '"Numbers" table needs a | --- | separator row under the header');
  const rows = tbl.slice(2); // a cell must not contain "|": write it out instead
  if (!rows.length) err(file, '"Numbers" table has no rows');
  for (const r of rows) {
    const cells = r.split('|').slice(1, -1).map(x => x.trim());
    if (cells.length !== 4) { err(file, `Numbers row needs 4 cells: ${r.slice(0, 60)}`); continue; }
    if (!cells[0]) err(file, `Numbers row has an empty Number: ${r.slice(0, 60)}`);
    if (!BASES.includes(cells[2])) err(file, `Numbers row Basis "${cells[2]}" must be one of ${BASES.join(', ')}`);
    if (![...cells[3].matchAll(/\]\((https:[^)\s]+)\)/g)].some(m => isSource(m[1]))) err(file, `Numbers row needs a source link: ${r.slice(0, 60)}`);
  }

  // Every number has a unit; every block with a number links to the source.
  for (const b of blocks(body, c.bodyOffset)) {
    if (b.quote) continue; // quoted words are kept as written
    const { need, missing } = checkUnits(b.text);
    for (const n of missing) err(file, `line ${b.line}: number "${n}" has no unit`);
    if (need && !b.heading && ![...b.text.matchAll(/\]\((https:[^)\s]+)\)/g)].some(m => isSource(m[1]))) {
      err(file, `line ${b.line}: a block with a number needs a link to the source`);
    }
  }

  // Quotes: at most one, 15 words or fewer, in "In their words", linked, listed in NOTICE.md.
  // A quote is a run of "> " lines (the "> —" attribution line excepted), joined, whatever its marks.
  const quoteLines = [];
  let run = null;
  for (const l of noCode.split('\n')) {
    if (/^>/.test(l) && !/^>\s*—/.test(l)) { if (run === null) { run = quoteLines.length; quoteLines.push(''); } quoteLines[run] += ' ' + l.replace(/^>\s*/, ''); }
    else run = null;
  }
  const prose = noCode.split('\n').filter(l => !/^>/.test(l)).join('\n');
  const spans = [/"([^"\n]+)"/g, /“([^”\n]+)”/g, /‘([^’\n]+)’/g].flatMap(re => [...prose.matchAll(re)].map(m => m[1]));
  const inline = spans.filter(q => words(q) > 4);
  const nQuotes = quoteLines.length + inline.length;
  if (nQuotes > 1) err(file, `${nQuotes} quotes (at most one; a quoted span over four words counts)`);
  for (const q of inline) err(file, `quote outside "In their words": "${q.slice(0, 50)}"`);
  for (const l of quoteLines) {
    const q = l.trim().replace(/^["“]/, '').replace(/["”]$/, '').trim();
    if (words(q) > 15) err(file, `quote has ${words(q)} words (max 15)`);
    if (!sec('In their words').includes(q)) err(file, 'the quote belongs in "In their words"');
    if (!notice.includes(q)) err(file, 'the quote is not listed in NOTICE.md');
  }
  if (quoteLines.length) {
    const attr = sec('In their words').split('\n').find(l => /^>\s*—/.test(l)) || '';
    if (![...attr.matchAll(/\]\((https:[^)\s]+)\)/g)].some(m => isSource(m[1]))) err(file, 'quote needs "> — Name, role, date" with a source link');
  }
}

// The anchors of a Markdown file's headings (any level, outside code blocks), as GitHub makes them;
// a repeated heading gets -1, -2 after it.
function headingAnchors(path) {
  const seen = new Map();
  const out = new Set();
  let fence = false;
  for (const l of readFileSync(path, 'utf8').replace(/\r\n/g, '\n').split('\n')) {
    if (/^```/.test(l)) { fence = !fence; continue; }
    const h = !fence && l.match(/^#{1,6} (.+?)\s*$/);
    if (!h) continue;
    const a = anchor(h[1].replace(/\[([^\]]*)\]\([^)]*\)/g, '$1').replace(/[`*_]/g, ''));
    const n = seen.get(a) ?? 0;
    seen.set(a, n + 1);
    out.add(n ? `${a}-${n}` : a);
  }
  return out;
}

// ---- Evidence files -------------------------------------------------------------------------
// evidence/<case>.md: the public source of a maintainer-own case, written in our words from the
// maintainer's private records. Each has a title and is the source_url of the case of the same name.
function validateEvidence(cases) {
  if (!existsSync(EVIDENCE_DIR)) return;
  const cited = new Set(cases.map(c => inRepo(c.meta.source_url)).filter(Boolean));
  for (const f of readdirSync(EVIDENCE_DIR).filter(f => !f.startsWith('.'))) {
    const rel = `evidence/${f}`;
    if (!f.endsWith('.md')) { err(rel, 'an evidence file is Markdown, evidence/<case>.md'); continue; }
    if (!cited.has(rel)) err(rel, 'no case has this evidence file as its source_url');
    const text = readFileSync(join(EVIDENCE_DIR, f), 'utf8').replace(/\r\n/g, '\n');
    if (!/^# \S/m.test(text)) err(rel, 'needs a "# Title" heading');
    for (const t of brokenLinks(text, EVIDENCE_DIR)) err(rel, `broken link ${t}`);
  }
}

// ---- Checklist ------------------------------------------------------------------------------
// A case link is inline, [GitHub](cases/x.md), or by reference, [GitHub][] or [text][GitHub],
// with the definition `[GitHub]: cases/x.md` anywhere in the file.
const caseTarget = t => t.match(/^(?:\.\/)?cases\/([^#\s]+\.md)/)?.[1];
function caseLinks(text, refs) {
  const inline = [...text.matchAll(/\]\(([^)\s]+)[^)]*\)/g)].map(m => caseTarget(m[1]));
  const byRef = [...text.matchAll(/\[([^\]]+)\]\[([^\]]*)\]/g)].map(m => caseTarget(refs.get((m[2] || m[1]).toLowerCase()) ?? ''));
  return [...inline, ...byRef].filter(Boolean);
}
// Case links with their text: [{ text, file }].
function caseLinkTexts(text, refs) {
  const inline = [...text.matchAll(/\[([^\]]+)\]\(([^)\s]+)[^)]*\)/g)].map(m => ({ text: m[1], file: caseTarget(m[2]) }));
  const byRef = [...text.matchAll(/\[([^\]]+)\]\[([^\]]*)\]/g)].map(m => ({ text: m[1], file: caseTarget(refs.get((m[2] || m[1]).toLowerCase()) ?? '') }));
  return [...inline, ...byRef].filter(x => x.file);
}
// Relative link targets (inline and definitions) that do not resolve from `dir`.
function brokenLinks(text, dir) {
  const t = text.replace(/```[\s\S]*?```/g, '').replace(/`[^`]*`/g, '');
  const targets = [...t.matchAll(/\]\(([^)\s]+)[^)]*\)/g)].map(m => m[1]);
  targets.push(...refDefs(t.split('\n')).values());
  return targets.filter(x => !/^[a-z][a-z0-9+.-]*:/i.test(x) && x.split('#')[0] && !existsSync(resolve(dir, x.split('#')[0])));
}

// ---- Lessons --------------------------------------------------------------------------------
// One page per aspect (LESSON_PAGES). Returns the lesson IDs (ID -> page file) and the case files
// the lessons cite, in "Cases" or "Against".
const ID = /^([A-Z]{3})-[1-9]\d*$/;
const SUBS = new RegExp(`^${META_LABEL}\\|Cases\\|Against(\\|Related view)?$`);
const caseSections = new Map(); // case file -> Set of section anchors
const caseMetas = new Map(); // case file -> front matter
const casePractices = new Map(); // case file -> its "Practices to copy" lines, [{ tag, text }]
function sectionsOf(file) {
  if (!caseSections.has(file)) {
    const p = join(CASES_DIR, file);
    const c = existsSync(p) ? parseCase(p) : null;
    caseSections.set(file, c ? new Set(sections(c.body).map(s => anchor(s.name))) : null);
    if (c) { caseMetas.set(file, c.meta); casePractices.set(file, practices(c.body)); }
  }
  return caseSections.get(file);
}
const RANK = { weak: 0, medium: 1, strong: 2 };

function validateLessons() {
  const ids = new Map();
  const cited = new Set();
  const prefixes = new Map();
  if (!existsSync(LESSONS_DIR)) { err('lessons/', 'missing'); return { ids, cited }; }
  const present = readdirSync(LESSONS_DIR).filter(f => f.endsWith('.md') && !['index.md', 'evidence.md'].includes(f)).map(f => basename(f, '.md'));
  for (const s of present) if (!LESSON_PAGES.includes(s)) err(`lessons/${s}.md`, 'not listed in LESSON_PAGES (scripts/lib.mjs)');
  for (const s of LESSON_PAGES) if (!present.includes(s)) err(`lessons/${s}.md`, 'listed in LESSON_PAGES but missing');

  for (const slug of LESSON_PAGES.filter(s => present.includes(s))) {
    const page = parseLessonPage(join(LESSONS_DIR, `${slug}.md`));
    const f = page.file;
    const e = (line, msg) => err(f, line ? `line ${line}: ${msg}` : msg);
    const size = Buffer.byteLength(page.text, 'utf8');
    if (size > LESSON_MAX_BYTES) e(0, `${size} bytes (at most ${LESSON_MAX_BYTES}); split the page or trim lessons`);
    if (!page.title) e(0, 'needs a "# Title" heading');
    if (!page.intro || page.intro === LESSON_NOTE || /^[-*] /.test(page.intro)) e(0, 'needs a one-paragraph intro under the title');
    if (!page.lines.includes(LESSON_NOTE)) e(0, `needs the evidence note as its own paragraph: "${LESSON_NOTE.slice(0, 60)}..."`);
    if (!page.lines.includes(LESSON_LEGEND)) e(0, `needs the legend as its own paragraph (LESSON_LEGEND in scripts/lib.mjs): "${LESSON_LEGEND.slice(0, 40)}..."`);
    if (!page.lessons.length) e(0, 'has no lessons ("- **ID** [stated] text")');
    for (const s of page.stray) e(s.line, `not a lesson, a sub-item or a reference definition: "${s.text.slice(0, 50)}"`);

    // A link in "Cases" or "Against": to a case file and one of its ## sections.
    const caseLink = (l, x, where) => {
      if (!x.target) return e(l.line, `${l.id} ${where}: link "${x.text}" has no reference definition`);
      const m = x.target.match(/^\.\.\/cases\/([^#/\s]+\.md)#(.+)$/);
      if (!m) return e(l.line, `${l.id} ${where}: link must go to a case section, ../cases/<file>.md#<section>: ${x.target}`);
      const secs = sectionsOf(m[1]);
      if (!secs) return e(l.line, `${l.id} ${where}: case not found: ${m[1]}`);
      if (!secs.has(m[2])) return e(l.line, `${l.id} ${where}: no section #${m[2]} in ${m[1]}`);
      const label = caseMetas.get(m[1])?.label;
      if (label && x.text !== label && !x.text.startsWith(`${label}: `)) e(l.line, `${l.id} ${where}: name the case by its label, "[${label}: <section>]" (found "[${x.text}]")`);
      cited.add(m[1]);
      return m[1];
    };

    for (const l of page.lessons) {
      const id = l.id.match(ID);
      if (!id) e(l.line, `lesson ID "${l.id}" must be three capital letters, a hyphen and a number (TST-1)`);
      else {
        const first = prefixes.get(id[1]);
        if (first && first !== f) e(l.line, `${l.id}: prefix ${id[1]} already belongs to ${first}`);
        else prefixes.set(id[1], f);
        const pagePrefix = page.lessons.map(x => x.id.match(ID)?.[1]).find(Boolean); // first well-formed ID
        if (id[1] !== pagePrefix) e(l.line, `${l.id}: every lesson on a page shares one prefix (${pagePrefix})`);
      }
      if (ids.has(l.id)) e(l.line, `${l.id} is used twice (also in ${ids.get(l.id)}); IDs are never reused`);
      ids.set(l.id, f);
      if (!['stated', 'ours'].includes(l.tag)) e(l.line, `${l.id}: tag must be [stated] or [ours]`);
      if (!l.text || l.text.length > 200) e(l.line, `${l.id}: lesson text must be one line of 1 to 200 characters (${l.text.length})`);
      if (checkUnits(l.text).need) e(l.line, `${l.id}: lesson text holds a number; put numbers in the cases`);

      const labels = l.subs.map(s => s.label).join('|');
      // Sceptic notes live in the maintainer's private archive (lessons-raw), keyed by lesson ID; the
      // tag they changed is what the page shows.
      if (l.subs.some(s => s.label === 'Sceptic')) e(l.line, `${l.id}: a "Sceptic:" line belongs in the private archive, not on the page; the tag it changed stays here`);
      else if (!SUBS.test(labels)) e(l.line, `${l.id}: sub-items must be, in order: ${META_LABEL}, Cases, Against, optional Related view (found: ${labels || 'none'})`);
      for (const s of l.subs) {
        if (!s.text) e(s.line, `${l.id}: "${s.label}" is empty`);
        if (s.label === META_LABEL) {
          const m = s.text.match(META_LINE);
          if (!m) e(s.line, `${l.id}: write "${META_LABEL}: ${MODEL_DEPENDENCE.join('|')}. Checked against people: ${PEOPLE_CHECK.join('|')}. Strength: ${STRENGTHS.join('|')}. Era: YYYY[–YYYY]; newest: <model family>."`);
          else {
            if (!MODEL_DEPENDENCE.includes(m[1])) e(s.line, `${l.id}: "Depends on model ability" must be one of ${MODEL_DEPENDENCE.join(', ')}`);
            if (!PEOPLE_CHECK.includes(m[2])) e(s.line, `${l.id}: "Checked against people" must be one of ${PEOPLE_CHECK.join(', ')}`);
            if (!STRENGTHS.includes(m[3])) e(s.line, `${l.id}: strength must be one of ${STRENGTHS.join(', ')}`);
            // Era: one comparable form, exactly the years and the newest model family of the cases in "Cases".
            const era = parseEra(m[4]);
            const metas = casesOf(l, page.refs).map(f => sectionsOf(f) && caseMetas.get(f)).filter(Boolean); // a missing case is reported under "Cases"
            // The people tag names a ground at least one cited case was checked against (none: the author's account).
            const ground = PEOPLE_GROUND[m[2]];
            if (ground && metas.length && !metas.some(c => [c.checked_against].flat().includes(ground))) {
              e(s.line, `${l.id}: "Checked against people: ${m[2]}" needs a cited case whose checked_against holds ${ground}`);
            }
            if (!era) e(s.line, `${l.id}: write the Era as "YYYY" or "YYYY–YYYY" (en dash), then "; newest: " and the newest model family of its cases, or unstated`);
            else if (metas.length) {
              const want = expectedEra(metas);
              if (era.years !== want.years || era.newest !== want.newest) e(s.line, `${l.id}: the Era must give the years and the newest model family of the cases in "Cases": "Era: ${eraText(want)}."`);
            }
          }
        } else if (s.label === 'Cases' || s.label === 'Against') {
          const links = linksIn(s.text, page.refs);
          if (s.label === 'Cases' && !links.length) e(s.line, `${l.id}: "Cases" needs at least one link to a case section`);
          // Exactly "Disagree:" puts the lesson in the index's list of splits; a near miss would drop it silently.
          if (s.label === 'Against' && /^disagree/i.test(s.text) && !/^Disagree: \S/.test(s.text)) e(s.line, `${l.id}: start a split with "Against: Disagree: ..."`);
          const files = new Set(links.map(x => caseLink(l, x, s.label)).filter(Boolean));
          // A [stated] lesson rests on what a source says: when "Cases" links only "Practices to copy"
          // sections, the practice line closest to the lesson (most content words shared) must be [stated]
          // too, since an [ours] practice is our inference, not the source's.
          if (s.label === 'Cases' && l.tag === 'stated' && links.length && links.every(x => /#practices-to-copy$/.test(x.target || ''))) {
            const lines = [...files].flatMap(f => casePractices.get(f) || []);
            const top = closestPractices(l.text, lines);
            if (!top.some(x => x.tag === 'stated')) {
              e(s.line, `${l.id}: [stated] but "Cases" links only "Practices to copy", and the closest practice line is not [stated]${top[0] ? ` ("${top[0].text.slice(0, 50)}")` : ''}; cite the case section the practice comes from, or tag the lesson [ours]`);
            }
          }
          // Strength follows the evidence: the cases behind the lesson set its ceiling.
          const strength = lessonMeta(l).strength;
          if (s.label === 'Cases' && STRENGTHS.includes(strength)) {
            const ceiling = strengthCeiling([...files].map(f => caseMetas.get(f)).filter(Boolean));
            if (RANK[strength] > RANK[ceiling]) {
              e(s.line, `${l.id}: strength ${strength} needs more evidence; its cases allow at most ${ceiling} (strong: two or more cases, or one that shows its data, not all from sellers of the tool; medium: two or more cases, or one that shows its data; the maintainer's own cases do not count)`);
            }
          }
        } else if (s.label === 'Related view') {
          const links = linksIn(s.text, page.refs);
          if (!/^ {2}- Related view \(karpathy-ideas\): /.test(s.raw)) e(s.line, `${l.id}: write "Related view (karpathy-ideas): [idea][ref], agrees." or "..., contradicts: why."`);
          if (links.length !== 1 || !links[0].target?.startsWith(KARPATHY_IDEAS) || !links[0].target.endsWith('.md')) {
            e(s.line, `${l.id}: "Related view" links one idea file under ${KARPATHY_IDEAS}`);
          }
          if (!/, (agrees|contradicts: \S.*)\.$/.test(s.text)) e(s.line, `${l.id}: "Related view" ends with ", agrees." or ", contradicts: why."`);
        }
      }
    }

    // Numbers carry units (the Era names models and years, like a case's models and period);
    // lessons are our own words (no quoted span over four words).
    for (const b of blocks(page.text)) {
      for (const n of checkUnits(b.text.replace(/Era: .*$/gm, '')).missing) e(b.line, `number "${n}" has no unit`);
    }
    const prose = page.text.replace(/```[\s\S]*?```/g, '').replace(/`[^`]*`/g, '');
    const spans = [/"([^"\n]+)"/g, /“([^”\n]+)”/g].flatMap(re => [...prose.matchAll(re)].map(m => m[1]));
    for (const q of spans.filter(q => words(q) > 4)) e(0, `quoted span over four words (lessons are in our own words): "${q.slice(0, 50)}"`);
    for (const t of brokenLinks(page.text, LESSONS_DIR)) e(0, `broken link ${t}`);
  }
  return { ids, cited };
}

// The checklist arrives after the first ten cases (docs/format.md "Checklist"): until checklist.md exists,
// its rules are skipped and the run says so; once it exists, every rule applies.
function validateChecklist(caseFiles, lessonIds) {
  const f = 'checklist.md';
  if (!existsSync(CHECKLIST)) return null;
  const text = readFileSync(CHECKLIST, 'utf8').replace(/\r\n/g, '\n');
  // Bytes with LF line ends, so a Windows checkout (CRLF) measures the same as the repository.
  const size = Buffer.byteLength(text, 'utf8');
  if (size > CHECKLIST_MAX_BYTES) err(f, `${size} bytes (at most ${CHECKLIST_MAX_BYTES}); move detail to the lessons or merge questions`);
  const lines = text.split('\n');
  const refs = refDefs(lines);
  const cited = new Set();
  const qs = [];
  let cur = null;
  for (const l of lines) {
    const q = l.match(/^(\d+)\. \*\*(.+?)\*\*/);
    if (q) { cur = { title: q[2], text: l }; qs.push(cur); } else if (/^#/.test(l)) cur = null; else if (cur) cur.text += '\n' + l;
  }
  if (qs.length < 5 || qs.length > 12) err(f, `${qs.length} questions (5 to 12)`);
  for (const q of qs) {
    if (!/\bCheck:/.test(q.text)) err(f, `"${q.title}" has no "Check:" step`);
    if (!/\bEvidence:\s+\S/.test(q.text)) err(f, `"${q.title}" has no "Evidence:" line (what the cases show, in our words)`);
    // "Lessons: TST-1, REV-3." on a line of its own; only IDs on that line count (GPT-5 elsewhere is a model).
    const ids = [...q.text.matchAll(/^\s*Lessons:([^\n]*)$/gm)]
      .flatMap(m => m[1].match(/\b[A-Z]{3}-\d+\b/g) || []);
    if (!ids.length) err(f, `"${q.title}" cites no lesson ("Lessons: TST-1, REV-3")`);
    for (const id of ids) if (!lessonIds.has(id)) err(f, `"${q.title}" cites lesson ${id}, which no lesson page holds`);
    for (const l of caseLinks(q.text, refs)) { if (!caseFiles.has(l)) err(f, `"${q.title}" links to missing case ${l}`); cited.add(l); }
  }
  for (const { text: t, file: cf } of caseLinkTexts(lines.join('\n'), refs)) {
    const label = caseMetas.get(cf)?.label;
    if (label && t !== label && !t.startsWith(`${label}: `)) err(f, `a link to ${cf} must name the case by its label, "[${label}]" (found "[${t}]")`);
  }
  for (const t of brokenLinks(lines.join('\n'), dirname(CHECKLIST))) err(f, `broken link ${t}`);
  if (!lines.some(l => /^## Report format/.test(l))) err(f, 'needs a "## Report format" section');
  return { n: qs.length, cited };
}

// log.md: every entry but the oldest (the first collection) has a "### Checklist and lessons impact"
// part with "- **New lessons:**" and "- **Changed lessons:**" lines naming lesson IDs, or "none", and
// it names everything its generated changes/<entry>.md lists: each added or changed lesson ID in
// those two lines ("every lesson" in the second covers all changed ones), each lesson gone anywhere in
// the part, and each added, changed or gone question by number in its "- **Checklist:**" line ("every
// question" covers all). A revisit reads only what these list since its record's entry.
function validateLog(ids) {
  if (!existsSync(LOG)) { err('log.md', 'missing'); return; }
  const entries = logEntries(readFileSync(LOG, 'utf8'));
  const bullet = (part, label) => part.match(new RegExp(`^- \\*\\*${label}:\\*\\*([\\s\\S]*?)(?=^- \\*\\*|^### |(?![\\s\\S]))`, 'm'))?.[1];
  const idsIn = s => s.match(/\b[A-Z]{3}-\d+\b/g) || [];
  for (const e of entries.slice(0, -1)) {
    const f = join(CHANGES_DIR, `${e.slug}.md`);
    const lists = existsSync(f) ? parseChanges(readFileSync(f, 'utf8')).lists : null;
    if (!lists) err('log.md', `${e.head}: no changes/${e.slug}.md; run node scripts/build.mjs`);
    const impact = e.body.split(/^### Checklist and lessons impact\n/m)[1]?.split(/^### /m)[0];
    if (impact === undefined) { err('log.md', `${e.head}: needs a "### Checklist and lessons impact" part`); continue; }
    const gone = new Set(lists?.['Lessons gone'] || []);
    const named = {};
    for (const label of ['New lessons', 'Changed lessons']) {
      const b = bullet(impact, label);
      if (b === undefined) { err('log.md', `${e.head}: its impact part needs a "- **${label}:**" line (lesson IDs, or none)`); continue; }
      named[label] = b;
      if (!idsIn(b).length && !/\bnone\b|\bevery lesson\b/i.test(b)) err('log.md', `${e.head}: "${label}" names no lesson ID; write none`);
      for (const id of idsIn(b)) if (!ids.has(id) && !gone.has(id)) err('log.md', `${e.head}: "${label}" names ${id}, which no lesson page has`);
    }
    if (!lists) continue;
    const lessonIds = new Set(idsIn(`${named['New lessons'] || ''} ${named['Changed lessons'] || ''}`));
    const every = /\bevery lesson\b/i.test(named['Changed lessons'] || '');
    const miss = [...lists['Added lessons'], ...(every ? [] : lists['Changed lessons'])].filter(id => !lessonIds.has(id))
      .concat([...gone].filter(id => !idsIn(impact).includes(id)));
    if (miss.length) err('log.md', `${e.head}: the impact part misses ${miss.join(', ')} (listed in changes/${e.slug}.md)`);
    // And names nothing its changes file does not list: a new lesson that was not added, a change that did not happen.
    const extra = [['New lessons', lists['Added lessons']], ['Changed lessons', lists['Changed lessons']]].flatMap(([label, listed]) =>
      idsIn(named[label] || '').filter(id => !listed.includes(id) && !gone.has(id)).map(id => `${id} (${label})`));
    if (extra.length) err('log.md', `${e.head}: the impact part names ${extra.join(', ')}, which changes/${e.slug}.md does not list`);
    const checklist = bullet(impact, 'Checklist') || '';
    const qs = [...lists['Added questions'], ...lists['Changed questions'], ...lists['Questions gone']];
    const qmiss = /\bevery question\b/i.test(checklist) ? [] : qs.filter(q => !new RegExp(`\\b${q.slice(1)}\\b`).test(checklist));
    if (qmiss.length) err('log.md', `${e.head}: its "- **Checklist:**" line misses question ${qmiss.join(', ')} (listed in changes/${e.slug}.md)`);
  }
}

// ---- Run ------------------------------------------------------------------------------------
const args = process.argv.slice(2);
// --cases-dir <dir>: resolve a case's relative links there instead of beside the file, so a
// staged case that links to published cases validates where it is.
const cd = args.indexOf('--cases-dir');
let casesDir = null;
if (cd >= 0) {
  casesDir = args.splice(cd, 2)[1];
  if (!casesDir || !existsSync(casesDir) || !statSync(casesDir).isDirectory()) { console.error(`--cases-dir needs a folder: ${casesDir}`); process.exit(2); }
  casesDir = resolve(casesDir);
}
function linkBase(path) { return casesDir ?? dirname(path); }
const paths = [];
for (const a of args.length ? args : [CASES_DIR]) {
  if (!existsSync(a)) { console.error(`not found: ${a}`); process.exit(2); }
  if (statSync(a).isDirectory()) paths.push(...listCases(a));
  else if (a.endsWith('.md')) paths.push(resolve(a));
  else { console.error(`not a case file (.md): ${a}`); process.exit(2); }
}
const cases = paths.map(parseCase);
const statusOf = new Map(cases.map(c => [c.file, c.meta.status]));
const orgOf = new Map(cases.map(c => [c.file, c.meta.org]));
// Labels are unique among the cases checked and, for a staged case, the cases in --cases-dir.
const labelCount = new Map();
{
  const byFile = new Map(cases.map(c => [c.file, c.meta.label]));
  if (casesDir) for (const q of listCases(casesDir)) { const c = parseCase(q); if (!byFile.has(c.file)) byFile.set(c.file, c.meta.label); }
  for (const l of byFile.values()) if (typeof l === 'string' && l) labelCount.set(l.toLowerCase(), (labelCount.get(l.toLowerCase()) || 0) + 1);
}
cases.forEach(validateCase);
let summary = '';
if (!args.length) {
  // The whole repository: evidence files, lessons, checklist, log, and every case cited somewhere.
  const files = new Set(cases.map(c => c.file));
  validateEvidence(cases);
  const lessons = validateLessons();
  const list = validateChecklist(files, lessons.ids);
  validateLog(lessons.ids);
  const index = join(LESSONS_DIR, 'index.md');
  if (existsSync(index)) {
    const size = Buffer.byteLength(readFileSync(index, 'utf8').replace(/\r\n/g, '\n'), 'utf8');
    if (size > INDEX_MAX_BYTES) err('lessons/index.md', `${size} bytes (at most ${INDEX_MAX_BYTES}); shorten what build.mjs writes there`);
  }
  const llms = join(ROOT, 'llms.txt');
  if (existsSync(llms)) {
    const size = Buffer.byteLength(readFileSync(llms, 'utf8').replace(/\r\n/g, '\n'), 'utf8');
    if (size > LLMS_MAX_BYTES) err('llms.txt', `${size} bytes (at most ${LLMS_MAX_BYTES}); shorten what build.mjs writes there`);
  }
  // Every session loads AGENTS.md (CLAUDE.md imports it): only what every session needs stays there.
  const agents = join(ROOT, 'AGENTS.md');
  if (existsSync(agents)) {
    const size = Buffer.byteLength(readFileSync(agents, 'utf8').replace(/\r\n/g, '\n'), 'utf8');
    if (size > AGENTS_MAX_BYTES) err('AGENTS.md', `${size} bytes (at most ${AGENTS_MAX_BYTES}); move detail to docs/format.md`);
  }
  for (const c of files) if (!lessons.cited.has(c) && !list?.cited.has(c)) err(c, 'no lesson and no checklist question cites this case');
  summary = ` ${lessons.ids.size} lessons valid. ` + (list ? `checklist.md valid: ${list.n} questions, each citing lessons.`
    : 'checklist.md absent: its rules are skipped until it exists.');
}

for (const w of warnings) console.warn(`note: ${w}`);
if (errors.length) {
  console.error(`${errors.length} problem(s):\n` + errors.map(e => '  ' + e).join('\n'));
  process.exit(1);
}
console.log(`${cases.length} case file(s) valid.${summary}`);
