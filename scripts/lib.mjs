// SPDX-License-Identifier: MIT
// Shared helpers for the scripts. No dependencies.
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

// The public repository, owner/name, newest first. To rename it, put the new owner/name first in
// this one line and run the build: build.mjs writes every URL from the first entry and rewrites the
// older ones in the hand-written files it keeps in step (SYNCED in build.mjs).
export const REPO_SLUGS = ['ntroccoli/ai-interfaces'];
export const REPO_SLUG = REPO_SLUGS[0];
// A case's source in this repository (only for `maintainer-own` cases): a file under evidence/,
// linked by its GitHub URL, which exists once the repository is published.
export const REPO_BLOB = slug => `https://github.com/${slug}/blob/main/`;
export const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
export const CASES_DIR = join(ROOT, 'cases');
export const EVIDENCE_DIR = join(ROOT, 'evidence');
export const CHECKLIST = join(ROOT, 'checklist.md');
export const NOTICE = join(ROOT, 'NOTICE.md');
// Agents read checklist.md whole before measuring a project: keep it small.
export const CHECKLIST_MAX_BYTES = 20 * 1024;
// A checklist threshold's evidence level (docs/format.md "Checklist", provenance), and the words that make a
// Check a threshold or a cut, cap or forbid rule that needs one.
export const PROVENANCE_LEVELS = ['published case', "others' measurement", 'standard or vendor guidance', 'our single case', 'our guess'];
export const RULE_WORDS = /\b(cut|cuts|cap|caps|capped|delete|deletes|remove|removes|forbid|forbids|forbidden|drop|drops|limit|limits|at most|at least|may not|must not|never|no more than|more than|fewer than|less than|below|above|rise|rises|exceed|exceeds|threshold)\b/i;

// Field values. Keep in sync with docs/format.md "Case files".
export const SOURCE_TYPES = ['engineering-post', 'paper', 'talk', 'repo', 'vendor-marketing', 'evidence-file'];
export const RELATIONS = ['seller-of-tool', 'user-of-tool', 'independent', 'maintainer-own'];
export const EVIDENCE = ['independent-data', 'shown-in-source', 'assertion-only'];
export const OUTCOMES = ['completed', 'partial', 'ongoing', 'abandoned'];
export const STATUSES = ['current', 'superseded'];
export const BASES = ['measured', 'reported', 'estimate', 'self-estimate', 'vendor-claim'];
// What kind of case: a team's story, a benchmark, or a study (an experiment with people, or models
// compared with people).
export const CASE_TYPES = ['product', 'benchmark', 'study'];
// What AI did in the work.
export const AI_ROLES = ['design', 'build', 'change', 'check', 'judge', 'simulate-user'];
// What was measured. `task-cost`: clicks, screens, steps or time per job. `issue-coverage`: the
// share of a reference list of issues found (heuristic reviews, audits). `run-stability`: how far
// repeat runs of the same setup agree. `sameness`: how alike the designs are (homogeneity only).
export const MEASURES = ['accessibility', 'contrast', 'task-cost', 'function', 'visual-match', 'consistency',
  'human-preference', 'judge-agreement', 'issue-coverage', 'run-stability', 'sameness', 'cost'];
// What the AI's output was compared with: real users or experts, automated rules, a model judge, nothing.
export const CHECKED_AGAINST = ['people', 'checker', 'model', 'none'];
export const REQUIRED = ['title', 'label', 'date', 'org', 'summary', 'source_url', 'also', 'source_type', 'author_relation',
  'evidence', 'case_type', 'ai_role', 'subject', 'sample', 'measures', 'checked_against', 'cost', 'tools', 'models',
  'period', 'outcome', 'status', 'superseded_by'];
// Sections in order; `optional` ones may be left out.
export const SECTIONS = [
  { name: 'Source' }, { name: 'What was made or studied' }, { name: 'Who did what' }, { name: 'How it was checked' },
  { name: 'Numbers' },
  { name: 'What worked' }, { name: 'What went wrong' }, { name: 'Practices to copy' },
  { name: 'In their words', optional: true }, { name: 'Context' },
];
// A case's short label: the one name every generated list, lesson page, the checklist and the docs use
// for it (unique, at most LABEL_MAX characters).
export const LABEL_MAX = 32;
export const NUMBERS_HEADER = '| Number | What it counts | Basis | Source |';

// Units: a number in a case must be followed, within three words, by one of these (a measure or
// a counted noun; the plural is accepted: "-s", and "-ies" for a unit ending in "y"). Add a unit
// here, in the singular, when a case needs it.
export const UNITS = new Set(`
  % x percent usd dollar
  ms s second minute hour day week month year
  kb mb gb tb byte token
  line file pr pull request commit branch repo repository package dependency
  component module function route block test build run check
  session subagent agent message call prompt turn attempt retry step wave
  release pipeline dataset change error regression issue bug migration gate
  people person user participant expert rater designer developer engineer team
  product app application screen page view click tap form field button menu control link
  task job query item criterion criteria heuristic violation walkthrough point
  model judge benchmark score rating pair comparison vote kappa
  character word example comment review event rule instruction
  method project library cent mockup round panel finding
  rate sprint iteration feature sentence row platform operation
  worker gap window miss proposal complaint problem choice sheet card theme typeface layout seat screenshot failure millisecond pixel fault expectation
`.trim().split(/\s+/));
// Words that may sit between a number and its unit without being units themselves.
export const SCALES = new Set(['thousand', 'million', 'billion', 'k', 'm', 'b']);

// Parse the simple front matter: one `key: value` per line, inline lists `[a, b]` (items may not
// contain commas), booleans, values optionally in double quotes. Anything else is an error, so a
// YAML form this parser does not read is reported, never dropped.
export function parseCase(path) {
  const text = readFileSync(path, 'utf8').replace(/^﻿/, '').replace(/\r\n/g, '\n');
  const file = basename(path);
  const m = text.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) return { file, path, error: 'missing front matter', meta: {}, body: text };
  const meta = {};
  const problems = [];
  for (const line of m[1].split('\n')) {
    if (!line.trim()) continue;
    const kv = line.match(/^([a-z_]+):\s*(.*)$/);
    if (!kv) { problems.push(`front matter line not understood: "${line.slice(0, 50)}"`); continue; }
    if (kv[1] in meta) problems.push(`duplicate key "${kv[1]}"`);
    let v = kv[2].trim();
    if (v.startsWith('[') && v.endsWith(']')) v = v.slice(1, -1).split(',').map(s => s.trim()).filter(Boolean);
    else if (v === 'true' || v === 'false') v = v === 'true';
    else if (/^".*"$/.test(v)) v = v.slice(1, -1);
    meta[kv[1]] = v;
  }
  const bodyOffset = m[1].split('\n').length + 2; // the two --- lines
  return { file, path, meta, body: m[2], bodyOffset, error: problems.join('; ') || undefined };
}

export function listCases(dir = CASES_DIR) {
  return readdirSync(dir).filter(f => f.endsWith('.md')).sort().map(f => join(dir, f));
}

// Split a markdown body into `## ` sections: { name, text, line }.
export function sections(body) {
  const out = [];
  let cur = null;
  body.split('\n').forEach((l, i) => {
    const h = l.match(/^## (.+?)\s*$/);
    if (h) { cur = { name: h[1], lines: [], line: i + 1 }; out.push(cur); } else if (cur) cur.lines.push(l);
  });
  return out.map(s => ({ name: s.name, line: s.line, text: s.lines.join('\n').trim() }));
}

// The lines of "Practices to copy": [{ tag, text }] (lines that do not parse are left out; validate.mjs
// reports them).
export const practices = body => (sections(body).find(s => s.name === 'Practices to copy')?.text ?? '').split('\n')
  .map(l => l.match(/^- \[(stated|ours)\] (.+) \(\[[^\]]+\]\([^)\s]+\)\)\s*$/)).filter(Boolean)
  .map(m => ({ tag: m[1], text: m[2] }));
// Content words of a line, for matching a lesson to the practice it rests on: lower case, four
// letters or more, a final "s" dropped and "ie" read as "y" (dependencies, dependency; cookies, cookie).
const STOP = new Set(['that', 'this', 'with', 'from', 'when', 'then', 'than', 'each', 'into', 'only', 'have', 'they',
  'their', 'them', 'what', 'which', 'before', 'after', 'every', 'more', 'most', 'some', 'there', 'where', 'while']);
export const contentWords = s => new Set(s.toLowerCase().split(/[^\p{L}]+/u).filter(w => w.length >= 4 && !STOP.has(w))
  .map(w => w.replace(/s$/, '').replace(/ie$/, 'y')));
// The practice lines closest to a lesson's text (most content words shared); [] when none shares one.
export function closestPractices(text, lines) {
  const want = contentWords(text);
  const scored = lines.map(p => ({ ...p, score: [...contentWords(p.text)].filter(w => want.has(w)).length }));
  const top = Math.max(0, ...scored.map(p => p.score));
  return top ? scored.filter(p => p.score === top) : [];
}

// ---- Lessons ----------------------------------------------------------------------------------
// One page per aspect in lessons/, in this order (the order of the index and llms.txt). The pages
// are the source of truth; lessons/index.md is generated by scripts/build.mjs.
export const LESSONS_DIR = join(ROOT, 'lessons');
export const LESSON_PAGES = ['build-loops', 'accessibility', 'model-judges', 'simulated-users', 'measuring-jobs'];
export const LESSON_MAX_BYTES = 20 * 1024; // an agent reads a page whole
// lessons/index.md (generated) is a table of contents for people; its size is checked so "By model" and
// "Where the cases disagree" stay short as cases arrive.
export const INDEX_MAX_BYTES = 12 * 1024;
// llms.txt (generated) is what an agent reads first on every run; it lists no cases (index.md does), so it
// does not grow with each case. Checked by validate.mjs.
export const LLMS_MAX_BYTES = 20 * 1024;
// Every lesson page opens with this sentence (after its title and intro); validate.mjs matches it.
export const LESSON_NOTE = 'Evidence base: every lesson here comes from the **cases** in [this collection](../index.md): products, benchmarks and studies of interfaces designed, built, changed or checked with AI. The maintainer\'s own projects are marked and never count toward a lesson\'s strength. The lessons measure; they never say which look is better.';
// Every lesson page holds this legend as its own paragraph, after the evidence note; validate.mjs
// matches it, and build.mjs repeats it in lessons/index.md and llms-full.txt.
export const LESSON_LEGEND = "`[stated]`: a source says it or reports it as what worked or failed. `[ours]`: our inference from what a source reports. \"Depends on model ability\" (`yes`, `partly`, `no`): `yes` when the lesson states what models or agents can or cannot do, `partly` when it is a process whose need comes from such a behaviour, `no` when it holds whatever the model; the index marks a `yes` lesson whose newest case is over a year old as possibly outdated. \"Checked against people\" (`yes`, `partly`, `checker`, `model`, `none`): what told right from wrong in the lesson's evidence: people's results, users or experts measured (`yes`); people's results for part of the claim, the rest from checkers, models or the author's account (`partly`); only deterministic checks such as axe, contrast maths, tests or a scripted walk (`checker`); only model judges or simulated users (`model`); only the author's account (`none`); authors count as people when they code items to a stated protocol, never when they judge their own work, and the maintainer's own use of a project is the author's account; it says where the evidence came from, not where the lesson applies. \"Era\": the years the cited cases ran (their publication year when they give no period), then the newest model family: the family of the most recent cited case that names a model (its highest version when it names several), `unstated` when none names one; each case lists its models. \"Strength\", capped by the cases in \"Cases\" (the validator checks it): `strong` needs two or more cases, or one whose source shows its data, and at least one case whose author does not sell the tool; `medium` needs two or more cases, or one that shows its data; any other lesson is `weak`. The maintainer's own projects never count toward the cap, and a lesson that rests only on cases whose authors sell the tool is at most `medium`.";
export const KARPATHY_IDEAS = 'https://github.com/ntroccoli/karpathy-ideas/blob/main/ideas/';
// "Checked against people" (coordinator, 2026-11-15): people's results behind the evidence (yes), in part
// (partly), only deterministic checks (checker), only model judges or simulated users (model), or only the
// author's account (none).
export const PEOPLE_CHECK = ['yes', 'partly', 'checker', 'model', 'none'];
// The checked_against value at least one cited case must carry for each "Checked against people" tag.
export const PEOPLE_GROUND = { yes: 'people', partly: 'people', checker: 'checker', model: 'model' };
// AGENTS.md is loaded by every session (CLAUDE.md imports it): what every session needs; the rest is in
// docs/format.md. Bytes with LF line ends.
export const AGENTS_MAX_BYTES = 8192;
// "Depends on model ability": the lesson states what models or agents can or cannot do (yes), is a
// process whose need comes from such a behaviour (partly), or holds whatever the model (no).
export const MODEL_DEPENDENCE = ['yes', 'partly', 'no'];
// A lesson tagged `yes` whose newest case in "Cases" was published more than this many months before
// the date of the newest log.md entry is marked "may be outdated" in lessons/index.md and llms.txt.
export const OUTDATED_MONTHS = 12;
export const STRENGTHS = ['strong', 'medium', 'weak'];
// The highest strength the cases in a lesson's "Cases" line allow (docs/format.md "Lessons"): `strong`
// needs two or more cases, or one whose source shows its data (`evidence` other than
// `assertion-only`), and at least one case whose author does not sell the tool; `medium` needs the
// same without the seller condition; anything else is `weak`. The maintainer's own cases
// (`author_relation: maintainer-own`) do not count. `metas` are the cases' front matter.
export function strengthCeiling(metas) {
  metas = metas.filter(m => m.author_relation !== 'maintainer-own');
  if (!metas.length) return 'weak';
  const shown = metas.some(m => m.evidence && m.evidence !== 'assertion-only');
  if (metas.length < 2 && !shown) return 'weak';
  return metas.every(m => m.author_relation === 'seller-of-tool') ? 'medium' : 'strong';
}

// GitHub's heading anchor: lower case, punctuation dropped, spaces to hyphens.
export const anchor = h => h.trim().toLowerCase().replace(/[^\p{L}\p{N} _-]/gu, '').replace(/ /g, '-');
// Reference definitions `[label]: target`, label in lower case.
export const refDefs = lines => new Map(lines.map(l => l.match(/^\[([^\]]+)\]:\s*(\S+)/)).filter(Boolean)
  .map(m => [m[1].toLowerCase(), m[2]]));
// Links in a line, inline or by reference: [{ text, target }] (target undefined when the label is not defined).
export const linksIn = (text, refs) => [
  ...[...text.matchAll(/\[([^\]]+)\]\(([^)\s]+)\)/g)].map(m => ({ text: m[1], target: m[2] })),
  ...[...text.matchAll(/\[([^\]]+)\]\[([^\]]*)\]/g)].map(m => ({ text: m[1], target: refs.get((m[2] || m[1]).toLowerCase()) })),
];

// Parse a lesson page. A lesson is a top-level item `- **ID** [tag] text` followed by sub-items
// `  - Label: text`. Returns { slug, file, path, text, title, intro, refs, lessons, stray } where
// each lesson is { id, tag, text, line, subs: [{ label, text, line }] } and `stray` lists lines
// inside the lesson list that are neither lessons, sub-items, blank lines nor reference definitions.
export function parseLessonPage(path) {
  return parseLessonText(readFileSync(path, 'utf8'), path);
}
// The same from text in memory.
export function parseLessonText(raw, path) {
  const text = raw.replace(/^﻿/, '').replace(/\r\n/g, '\n');
  const lines = text.split('\n');
  const slug = basename(path, '.md');
  const page = { slug, file: `lessons/${slug}.md`, path, text, lines, title: '', intro: '', refs: refDefs(lines), lessons: [], stray: [] };
  const h1 = lines.findIndex(l => /^# /.test(l));
  if (h1 >= 0) {
    page.title = lines[h1].slice(2).trim();
    const para = [];
    for (let i = h1 + 1; i < lines.length; i++) { if (lines[i].trim()) para.push(lines[i].trim()); else if (para.length) break; }
    page.intro = para.join(' ');
  }
  let cur = null;
  lines.forEach((l, i) => {
    const line = i + 1;
    const m = l.match(/^- \*\*([^*]+)\*\* \[([^\]]*)\] (.*)$/);
    if (m) { cur = { id: m[1], tag: m[2], text: m[3].trim(), line, subs: [] }; page.lessons.push(cur); return; }
    if (!cur) { if (/^[-*] /.test(l)) page.stray.push({ line, text: l }); return; }
    const s = l.match(/^ {2}- ([^:]+?)(?: \([^)]*\))?: (.*)$/);
    if (s) { cur.subs.push({ label: s[1], text: s[2].trim(), line, raw: l }); return; }
    if (!l.trim() || /^\[[^\]]+\]:\s*\S/.test(l)) return;
    page.stray.push({ line, text: l });
  });
  return page;
}

// All lesson pages in LESSON_PAGES order (missing files are skipped; validate.mjs reports them).
export function loadLessons(dir = LESSONS_DIR) {
  return LESSON_PAGES.map(s => join(dir, `${s}.md`)).filter(p => existsSync(p)).map(parseLessonPage);
}
// The value of one sub-item of a lesson, by label.
export const sub = (lesson, label) => lesson.subs.find(s => s.label === label)?.text;
// The first sub-item, labelled "Depends on model ability": "yes. Checked against people: no.
// Strength: medium. Era: 2025–2026; newest: Claude Opus 5.x."
export const META_LABEL = 'Depends on model ability';
export const META_LINE = /^(\w+)\. Checked against people: (\w+)\. Strength: (\w+)\. Era: (.+)\.$/;
export function lessonMeta(lesson) {
  const m = (sub(lesson, META_LABEL) || '').match(META_LINE);
  return m ? { model: m[1], people: m[2], strength: m[3], era: m[4] } : {};
}
// The case files a lesson's "Cases" line links (`refs` resolves reference links).
export const casesOf = (lesson, refs) => [...new Set(linksIn(sub(lesson, 'Cases') || '', refs)
  .map(x => x.target?.match(/^\.\.\/cases\/([^#/\s]+\.md)#/)?.[1]).filter(Boolean))];
// A model in a case's `models` ends with its roles in the work, from AI_ROLES joined by "/", in
// brackets: "GPT-4 (simulate-user/judge)", "Gemma 4 (31B) (check)". splitModel returns the name as the
// source writes it and the roles ([] when the item carries none).
const ROLE_SUFFIX = /\s+\(([a-z-]+(?:\/[a-z-]+)*)\)$/;
export function splitModel(item) {
  const s = String(item ?? '').trim();
  const m = s.match(ROLE_SUFFIX);
  const roles = m ? m[1].split('/') : [];
  return m && roles.every(r => AI_ROLES.includes(r)) ? { name: s.slice(0, m.index).trim(), roles } : { name: s, roles: [] };
}
// The models a case names (`unstated` left out), without their roles.
export const namedModels = m => [m.models].flat().filter(x => x && x !== 'unstated').map(x => splitModel(x).name);
// The Era a lesson must carry, from the front matter of the cases in its "Cases" line: the years
// from each case's `period` (its `date` when the period is unstated), as `YYYY` or `YYYY–YYYY`,
// and the newest model family: the family (modelFamily) of the most recent case (caseRecency, then
// date) that names a model; when it names several, the one with the highest version number, the
// first listed on a tie; `unstated` when no case names a model. The full model lists stay in the
// cases. Returns { years, newest }.
export function expectedEra(metas) {
  const ys = metas.flatMap(m => String(m.period && m.period !== 'unstated' ? m.period : m.date).match(/\d{4}/g) || []).map(Number);
  const lo = Math.min(...ys), hi = Math.max(...ys);
  const named = metas.filter(m => namedModels(m).length)
    .sort((a, b) => caseRecency(b).localeCompare(caseRecency(a)) || String(b.date).localeCompare(String(a.date)));
  let newest = 'unstated';
  if (named.length) {
    const version = f => Number(f.match(/(\d+)(?:\.x|o)?$/)?.[1] ?? -1);
    newest = namedModels(named[0]).map(n => modelFamily(n) ?? n).reduce((best, f) => (version(f) > version(best) ? f : best));
  }
  return { years: lo === hi ? String(lo) : `${lo}–${hi}`, newest };
}
// The model family of a model name as a case (or a field report) writes it, for "By model" in
// lessons/index.md: only obvious families, by maker, line and major version ("Claude Opus 4.6" and
// "Opus 4.8" are "Claude Opus 4.x"; "gpt-5.5" and "GPT-5.6 Sol" are "GPT-5.x"; "Gemini-2.5-pro" is
// "Gemini 2.x"). A name with a line but no version is "<line> (version unstated)"; an internal model
// is "<maker> (internal)". `unstated` stays `unstated`. A name whose maker is not in MODEL_FAMILIES
// returns undefined: build.mjs then keeps the name as its own family. Add a rule here when a case or
// a report names a new maker.
export const MODEL_FAMILIES = [
  // Claude: the line (Opus, Sonnet, Haiku, Fable, Mythos), with or without "Claude" before it, and
  // the version before or after the line ("Claude 3.5 Sonnet", "Claude Sonnet 4").
  [/\bClaude[\s-]+(\d+)(?:\.\d+)?[\s-]+(Opus|Sonnet|Haiku)\b/i, m => `Claude ${cap(m[2])} ${m[1]}.x`],
  [/\b(?:Claude[\s-]+)?(Opus|Sonnet|Haiku|Fable|Mythos)\b(?:[\s-]+(\d+))?/i, m => `Claude ${cap(m[1])} ${m[2] ? `${m[2]}.x` : '(version unstated)'}`],
  [/\bClaude[\s-]+(\d+)/i, m => `Claude ${m[1]}.x`],
  [/\bClaude\b/i, () => 'Claude (version unstated)'],
  // "GPT-5.3 Codex" is the Codex line ("Codex 5.3" in the same source), not the GPT chat line.
  [/\bGPT[- ]?(\d+)(?:\.\d+)?[- ]Codex\b/i, m => `OpenAI Codex ${m[1]}.x`],
  [/\bGPT[- ]?(\d+)o\b/i, m => `GPT-${m[1]}o`],
  // "GPT-o4-mini" is OpenAI's o-series, written with a GPT prefix.
  [/\bGPT-o(\d)\b/i, m => `OpenAI o${m[1]}`],
  [/\bGPT[- ]?(\d+)/i, m => `GPT-${m[1]}.x`],
  [/\bGPT\b/i, () => 'GPT (version unstated)'],
  [/\bo(\d)(?:-mini|-pro)?\b/, m => `OpenAI o${m[1]}`],
  [/\bCodex[- ]?(\d+)/i, m => `OpenAI Codex ${m[1]}.x`],
  [/\bCodex\b/i, () => 'OpenAI Codex (version unstated)'],
  [/\binternal\b.*\bGemini\b|\bGemini\b.*\binternal\b/i, () => 'Gemini (internal)'],
  [/\bGemini[\s-]+(\d+)/i, m => `Gemini ${m[1]}.x`],
  [/\bGemini\b/i, () => 'Gemini (version unstated)'],
  [/\bGrok[- ]?(\d+)/i, m => `Grok ${m[1]}.x`],
  [/\bGrok\b/i, () => 'Grok (version unstated)'],
  // Kimi writes its version after a K ("Kimi K2.6" is Kimi K2.x); Gemma after a space ("Gemma 4 (31B)").
  [/\bKimi[\s-]+K(\d+)/i, m => `Kimi K${m[1]}.x`],
  [/\bGemma[\s-]+(\d+)/i, m => `Gemma ${m[1]}.x`],
  [/\b(Llama|Mistral|Codestral|Devstral|DeepSeek|Qwen|Kimi|GLM|Hunyuan|Doubao|Seed)(?![a-z])[- ]?[Vv]?(\d+)?/i,
    m => `${OPEN_NAMES.find(x => x.toLowerCase() === m[1].toLowerCase())} ${m[2] ? `${m[2]}.x` : '(version unstated)'}`],
];
const OPEN_NAMES = ['Llama', 'Mistral', 'Codestral', 'Devstral', 'DeepSeek', 'Qwen', 'Kimi', 'GLM', 'Hunyuan', 'Doubao', 'Seed'];
const cap = s => s[0].toUpperCase() + s.slice(1).toLowerCase();
export function modelFamily(name) {
  const n = String(name ?? '').trim();
  if (/^unstated$/i.test(n)) return 'unstated';
  for (const [re, f] of MODEL_FAMILIES) { const m = n.match(re); if (m) return f(m); }
  return undefined;
}
// A Claude model or Claude Code (which runs Claude models): for the disclosure.
export const isClaude = s => /\b(Claude|Opus|Sonnet|Haiku|Fable|Mythos)\b/i.test(String(s ?? ''));
// Anthropic named as the organisation behind a case or in its subject: for the disclosure.
export const isAnthropic = s => /\bAnthropic\b/i.test(String(s ?? ''));
export const eraText = e => `${e.years}; newest: ${e.newest}`;
// An Era value as { years, newest }; undefined when it is not "YYYY[–YYYY]; newest: <family>".
export function parseEra(text) {
  const m = (text || '').match(/^(\d{4}(?:–\d{4})?); newest: (\S.*)$/);
  return m ? { years: m[1], newest: m[2] } : undefined;
}
// How recent a case is: the later of its publication `date` and the end of its `period` (a series is
// dated by its first part, so its work can run past that date). Partial dates compare as prefixes:
// "2026-04" sorts after "2025-11-14" and before "2026-04-01".
export const caseRecency = m => [String(m.date), m.period && m.period !== 'unstated' ? String(m.period).split('..').at(-1) : '']
  .sort().at(-1);
// "May be outdated": tagged `yes` for model ability, and the most recent case in "Cases"
// (caseRecency) is more than OUTDATED_MONTHS months before `today` (YYYY-MM-DD). `metas`: those
// cases' front matter.
export function mayBeOutdated(lesson, metas, today) {
  if (lessonMeta(lesson).model !== 'yes' || !metas.length) return false;
  const newest = metas.map(caseRecency).sort().at(-1);
  const t = new Date(`${today}T00:00:00Z`);
  t.setUTCMonth(t.getUTCMonth() - OUTDATED_MONTHS);
  return newest < t.toISOString().slice(0, 10);
}

// Update log entries and what each added or changed (docs/format.md "Update log"). Each entry of log.md
// has a generated changes/<slug>.md: the lesson IDs and checklist questions added, changed or gone
// since the previous entry, and the fingerprints of the state after it. The newest entry's file is
// rebuilt from the sources; an older one is frozen, since its state can no longer be rebuilt.
export const LOG = join(ROOT, 'log.md');
export const CHANGES_DIR = join(ROOT, 'changes');
export function logEntries(text) {
  return text.replace(/\r\n/g, '\n').split(/^(?=## \d{4}-\d{2}-\d{2})/m).slice(1).map(body => {
    const head = body.split('\n')[0].slice(3).trim();
    const date = head.slice(0, 10);
    const title = head.replace(/^\d{4}-\d{2}-\d{2}\s*—\s*/, '');
    const slug = `${date}-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`;
    return { head, date, title, slug, body };
  });
}
// The part of a lesson a revisit cares about: its tag and words, model-ability, people and strength
// tags, the cases it cites and its Against line (not the Era, which follows the cases, nor Related view).
const print = s => createHash('sha256').update(s.replace(/\s+/g, ' ').trim()).digest('hex').slice(0, 8);
export function lessonPrints(pages) {
  const out = new Map();
  for (const p of pages) for (const l of p.lessons) {
    const m = lessonMeta(l);
    out.set(l.id, print([l.tag, l.text, m.model, m.people, m.strength, casesOf(l, p.refs).sort().join(' '), sub(l, 'Against') || ''].join('\n')));
  }
  return out;
}
// The checklist's questions, Q1..Qn, each with its whole text (title, Check, Evidence, Lessons); an
// empty map while checklist.md does not exist.
export function questionPrints(text) {
  const out = new Map();
  let cur = null;
  for (const l of String(text ?? '').replace(/\r\n/g, '\n').split('\n')) {
    const q = l.match(/^(\d+)\. \*\*/);
    if (q) { cur = `Q${q[1]}`; out.set(cur, l); } else if (/^#/.test(l)) cur = null; else if (cur) out.set(cur, `${out.get(cur)}\n${l}`);
  }
  for (const [k, v] of out) out.set(k, print(v));
  return out;
}
// Compare two states (Map id -> fingerprint); `before` empty for the oldest entry.
export function diffPrints(before, after) {
  const ids = m => [...m.keys()];
  return {
    added: ids(after).filter(k => !before.has(k)),
    changed: ids(after).filter(k => before.has(k) && before.get(k) !== after.get(k)),
    gone: ids(before).filter(k => !after.has(k)),
  };
}
export const CHANGE_LINES = { 'Added lessons': 'lessons.added', 'Changed lessons': 'lessons.changed', 'Lessons gone': 'lessons.gone',
  'Added questions': 'questions.added', 'Changed questions': 'questions.changed', 'Questions gone': 'questions.gone' };
// Read a changes file: its lists and its fingerprints (the state after its entry).
export function parseChanges(text) {
  const t = text.replace(/\r\n/g, '\n');
  const lists = {};
  for (const label of Object.keys(CHANGE_LINES)) {
    const m = t.match(new RegExp(`^- ${label}: (.*)$`, 'm'));
    lists[label] = !m || m[1] === 'none' ? [] : m[1].split(', ').map(s => s.trim());
  }
  const state = new Map((t.split(/^## State after this entry$/m)[1] || '').split('\n')
    .map(l => l.match(/^((?:[A-Z]{3}-|Q)\d+) ([0-9a-f]{8})$/)).filter(Boolean).map(m => [m[1], m[2]]));
  return { lists, state };
}
// Write a changes file. `prev` is the previous entry ({ head, state }) or null for the oldest.
export function renderChanges(entry, prev, lessons, questions, generated) {
  const before = prev?.state ?? new Map();
  const pick = re => new Map([...before].filter(([k]) => re.test(k)));
  const l = diffPrints(pick(/^[A-Z]{3}-/), lessons), q = diffPrints(pick(/^Q/), questions);
  const list = xs => xs.length ? xs.join(', ') : 'none';
  return [
    generated, '',
    `# Changes: ${entry.head}`, '',
    `What this [log.md](../log.md) entry added, changed or removed, ${prev ? `since "${prev.head}"` : 'from nothing (the first entry)'}: ` +
      'lesson IDs and checklist questions (Q1 is question 1). A revisit reads these lines for every entry newer than ' +
      'the one its record names, then only the lessons and questions they list.', '',
    `- Added lessons: ${list(l.added)}`,
    `- Changed lessons: ${list(l.changed)}`,
    `- Lessons gone: ${list(l.gone)}`,
    `- Added questions: ${list(q.added)}`,
    `- Changed questions: ${list(q.changed)}`,
    `- Questions gone: ${list(q.gone)}`, '',
    'A lesson counts as changed when its tag, words, model-ability, people or strength tag, cited cases or Against ' +
      'line changed; a question, when any of its text did.', '',
    '## State after this entry', '',
    'Fingerprints (a short hash of each lesson and question) the next entry is compared with.', '',
    '```text', ...[...lessons, ...questions].map(([k, v]) => `${k} ${v}`), '```', '',
  ].join('\n');
}
