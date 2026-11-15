// SPDX-License-Identifier: MIT
// Broken-copy tests for scripts/validate.mjs and scripts/build.mjs: copy the repository into
// .test-tmp/ (git-ignored), add fixture cases and a fixture lesson where a test needs them, break one
// thing per test, and check the exit code and the message. The fixtures keep the tests independent
// of the live cases and lessons, which change as cases arrive.
// Usage: node scripts/test-validate.mjs   (exit 1 when a test fails; .test-tmp/ is removed)
import { cpSync, mkdirSync, readFileSync, rmSync, writeFileSync, existsSync, appendFileSync } from 'node:fs';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { ROOT, parseCase, expectedEra, eraText, modelFamily, LESSON_PAGES, REPO_SLUG, REPO_BLOB, logEntries, splitModel } from './lib.mjs';

const TMP = join(ROOT, '.test-tmp');
const PARTS = ['scripts', 'AGENTS.md', 'cases', 'evidence', 'lessons', 'NOTICE.md', 'index.md', 'llms.txt', 'llms-full.txt',
  'README.md', 'CONTRIBUTING.md', 'docs', 'changes', 'LICENSE-CONTENT.md', '.github', 'lychee.toml', 'log.md', 'checklist.md', 'corrections.md'];
let n = 0;
const failed = [];

// A fresh copy of the repository; returns its root.
function copy() {
  const dir = join(TMP, String(++n));
  for (const p of PARTS) if (existsSync(join(ROOT, p))) cpSync(join(ROOT, p), join(dir, p), { recursive: true });
  return dir;
}
const read = f => readFileSync(f, 'utf8').replace(/\r\n/g, '\n'); // a Windows checkout may hold CRLF
const edit = (file, from, to) => {
  const t = read(file);
  if (!t.includes(from)) throw new Error(`test setup: "${from}" not in ${file}`);
  writeFileSync(file, t.replace(from, to));
};
const node = (dir, script, args) => spawnSync(process.execPath, [join(dir, 'scripts', script), ...args], { cwd: dir, encoding: 'utf8' });
// expect: 0 (valid), 1 (problems), 2 (usage); `want` must appear in the output when given.
// `script` runs another script than validate.mjs (build.mjs for the --check tests).
function test(name, expect, setup, args, want, script = 'validate.mjs') {
  const dir = copy();
  let r;
  try { r = node(dir, script, setup(dir) || args || []); } catch (e) { failed.push(`${name}: ${e.message}`); console.log(`FAIL ${name} (setup)`); return; }
  const out = r.stdout + r.stderr;
  const ok = r.status === expect && (!want || out.includes(want));
  console.log(`${ok ? 'ok  ' : 'FAIL'} ${name} (exit ${r.status})`);
  if (!ok) failed.push(`${name}: wanted exit ${expect}${want ? ` with "${want}"` : ''}, got ${r.status}\n${out}`);
}
const check = (name, ok, detail) => { console.log(`${ok ? 'ok  ' : 'FAIL'} ${name}`); if (!ok) failed.push(`${name}: ${detail}`); };

// ---- Fixtures ---------------------------------------------------------------------------------
// Fixture cases, each valid on its own: what differs is what the strength cap, the Era and the
// disclosure read. `own` is a maintainer-own case whose source is an evidence file in this repository.
const FX = {
  user: { date: '2025-03-01', org: 'Fixture User', author_relation: 'user-of-tool', evidence: 'assertion-only', models: '[GPT-4o (judge)]', period: '2025' },
  seller1: { date: '2025-04-01', org: 'Fixture Seller One', author_relation: 'seller-of-tool', evidence: 'shown-in-source', models: '[Claude Sonnet 4 (judge)]', period: '2025' },
  seller2: { date: '2025-05-01', org: 'Fixture Seller Two', author_relation: 'seller-of-tool', evidence: 'shown-in-source', models: '[Gemini-2.5-pro (judge)]', period: '2025' },
  shown: { date: '2026-02-01', org: 'Fixture Lab', author_relation: 'independent', evidence: 'shown-in-source', models: '[GPT-5 (judge)]', period: '2026' },
  own: { date: '2026-03-01', org: 'Fixture Own', author_relation: 'maintainer-own', evidence: 'shown-in-source', models: '[Claude Opus 5 (judge)]', period: '2026', source_type: 'evidence-file' },
  anthropic: { date: '2026-04-01', org: 'Anthropic', author_relation: 'seller-of-tool', evidence: 'shown-in-source', models: '[Claude Opus 4.6 (judge)]', period: '2026', subject: 'a harness that builds web apps' },
};
const fxFile = k => `${FX[k].date}-fixture-${k}.md`;
const fxSource = k => FX[k].author_relation === 'maintainer-own' ? `${REPO_BLOB(REPO_SLUG)}evidence/${fxFile(k)}` : `https://example.com/${k}`;
function caseText(k, over = {}) {
  const f = { ...FX[k], ...over };
  const src = fxSource(k);
  const anchor = f.author_relation === 'maintainer-own' ? '#method' : '#s2';
  return `---
title: Fixture case ${k}
label: ${f.label ?? `Fixture ${k}`}
date: ${f.date}
org: ${f.org}
summary: A fixture case for the validator's tests.
source_url: ${src}
also: []
source_type: ${f.source_type ?? 'paper'}
author_relation: ${f.author_relation}
evidence: ${f.evidence}
case_type: ${f.case_type ?? 'study'}
ai_role: ${f.ai_role ?? '[judge]'}
subject: ${f.subject ?? 'a fixture web app'}
sample: ${f.sample ?? '12 pages'}
measures: ${f.measures ?? '[judge-agreement]'}
checked_against: ${f.checked_against ?? '[people]'}
cost: unstated
tools: [unstated]
models: ${f.models}
period: ${f.period}
outcome: completed
status: current
superseded_by:
---

# Fixture case ${k}

A fixture case written by the tests. A model judged the pages of a small web app, and experts judged
the same pages, so the two could be compared page by page. It exists only so that the validator's
rules can be broken one at a time without touching the real cases, which change as cases arrive
([source](${src}${anchor})).

## Source

A fixture source ([source](${src}${anchor})).

## What was made or studied

A small web app.

## Who did what

- **AI:** a model judged the pages.
- **Rule-based tools:** unstated.
- **People:** experts judged the same pages.

## How it was checked

The judge's scores were compared with the experts' ([source](${src}${anchor})).

## Numbers

| Number | What it counts | Basis | Source |
| --- | --- | --- | --- |
| 12 pages | pages judged by both | measured | [source](${src}${anchor}) |

## What worked

- The judge agreed with the experts on most pages.

## What went wrong

- **Not reported:** the cost of the runs.

## Practices to copy

- ${f.practiceTag ?? '[stated]'} Compare a model judge with experts on the same pages before trusting it. ([Method](${src}${anchor}))

## Context

- A fixture.
`;
}
// Write fixture cases (and the evidence file of a maintainer-own one).
function addCases(d, keys, over = {}) {
  for (const k of keys) {
    writeFileSync(join(d, 'cases', fxFile(k)), caseText(k, over[k]));
    if (FX[k].author_relation === 'maintainer-own') {
      mkdirSync(join(d, 'evidence'), { recursive: true });
      writeFileSync(join(d, 'evidence', fxFile(k)), '# Fixture evidence\n\n## Method\n\nA fixture method.\n');
    }
  }
}
// The page the fixture lesson goes on, and its prefix (from the page's first lesson).
const PAGE = LESSON_PAGES[0];
const L = (d, page = PAGE) => join(d, 'lessons', `${page}.md`);
const prefixOf = d => read(L(d)).match(/^- \*\*([A-Z]{3})-\d+\*\*/m)[1];
const FXID = d => `${prefixOf(d)}-99`;
// Add the fixture cases `keys` and a fixture lesson citing them ("What went wrong" by default).
function lesson(strength, keys, { model = 'no', people = 'yes', tag = 'ours', section = 'what-went-wrong', write = true } = {}) {
  return d => {
    if (write) addCases(d, keys);
    const f = L(d);
    const t = read(f);
    const id = FXID(d);
    const cites = keys.map(k => `[Fixture ${k}][fx-${k}]`).join(', ');
    const era = eraText(expectedEra(keys.map(k => parseCase(join(d, 'cases', fxFile(k))).meta)));
    const text = `- **${id}** [${tag}] Compare a model judge with experts on the same pages before trusting it.\n`
      + `  - Depends on model ability: ${model}. Checked against people: ${people}. Strength: ${strength}. Era: ${era}.\n`
      + `  - Cases: ${cites}.\n  - Against: None found.\n`;
    const refs = keys.map(k => `[fx-${k}]: ../cases/${fxFile(k)}#${section}`).join('\n');
    const i = t.search(/^\[[a-z0-9-]+\]: /m); // the first reference definition; the lessons end before it
    if (i < 0) throw new Error(`test setup: lessons/${PAGE}.md has no reference definitions`);
    writeFileSync(f, `${t.slice(0, i).replace(/\n+$/, '\n')}${text}\n${t.slice(i).replace(/\n*$/, '\n')}${refs}\n`);
    // When the newest log entry is not the oldest, it must name the new lesson, as the validator asks.
    const log = join(d, 'log.md');
    // The list may wrap onto lines indented by two spaces.
    writeFileSync(log, read(log).replace(/^(- \*\*New lessons:\*\* )none\.$|^(- \*\*New lessons:\*\* (?:[^\n]|\n {2})*?)\.$/m,
      (_, none, list) => none ? `${none}${id}.` : `${list}, ${id}.`));
    // ... and its changes file, when built, lists it as a rebuild would, so the validator finds no extra ID.
    const newest = logEntries(read(log))[0];
    const ch = newest && join(d, 'changes', `${newest.slug}.md`);
    if (ch && existsSync(ch)) writeFileSync(ch, read(ch).replace(/^- Added lessons: (.*)$/m, (_, v) => `- Added lessons: ${v === 'none' ? id : `${v}, ${id}`}`));
  };
}
const base = lesson('weak', ['user']); // one fixture case and one lesson citing it
// Edit the fixture lesson only (from its ID on), so a string a real lesson also holds is never touched.
const fx = (d, from, to) => {
  const id = FXID(d), t = read(L(d)), i = t.indexOf(`- **${id}**`);
  const f = from.replace('ID', id);
  if (i < 0 || !t.slice(i).includes(f)) throw new Error(`test setup: "${f}" not in the fixture lesson`);
  writeFileSync(L(d), t.slice(0, i) + t.slice(i).replace(f, to.replace('ID', id)));
};
const caseOf = (d, k) => join(d, 'cases', fxFile(k));

rmSync(TMP, { recursive: true, force: true });
mkdirSync(TMP, { recursive: true });

test('baseline copy is valid', 0, () => {});
test('baseline with fixtures is valid', 0, d => { lesson('weak', ['user', 'own'])(d); });
test('baseline build --check passes', 0, () => ['--check'], null, null, 'build.mjs');

// ---- Front matter (docs/format.md "Case files") -----------------------------------------------------
test('missing org fails', 1, d => { base(d); edit(caseOf(d, 'user'), 'org: Fixture User\n', ''); }, null, 'missing key "org"');
test('a migration-era key is unknown', 1, d => { base(d); edit(caseOf(d, 'user'), 'cost: unstated\n', 'cost: unstated\nkind: framework\n'); }, null, 'unknown key "kind"');
test('unknown case_type fails', 1, d => { base(d); edit(caseOf(d, 'user'), 'case_type: study', 'case_type: survey'); }, null, 'case_type must be one of product, benchmark, study');
test('unknown ai_role value fails', 1, d => { base(d); edit(caseOf(d, 'user'), 'ai_role: [judge]', 'ai_role: [judge, paint]'); }, null, 'ai_role: "paint" must be one of');
test('empty ai_role fails', 1, d => { base(d); edit(caseOf(d, 'user'), 'ai_role: [judge]', 'ai_role: []'); }, null, 'ai_role: an inline list of');
test('ai_role as plain text fails', 1, d => { base(d); edit(caseOf(d, 'user'), 'ai_role: [judge]', 'ai_role: judge'); }, null, 'ai_role: an inline list of');
test('unknown measure fails', 1, d => { base(d); edit(caseOf(d, 'user'), 'measures: [judge-agreement]', 'measures: [beauty]'); }, null, 'measures: "beauty" must be one of');
test('issue-coverage and run-stability are measures', 0, d => { base(d); edit(caseOf(d, 'user'), 'measures: [judge-agreement]', 'measures: [issue-coverage, run-stability]'); });
test('a measure listed twice fails', 1, d => { base(d); edit(caseOf(d, 'user'), 'measures: [judge-agreement]', 'measures: [cost, cost]'); }, null, 'measures: a value is listed twice');
test('unknown checked_against fails', 1, d => { base(d); edit(caseOf(d, 'user'), 'checked_against: [people]', 'checked_against: [vibes]'); }, null, 'checked_against: "vibes" must be one of');
test('a missing label fails', 1, d => { base(d); edit(caseOf(d, 'user'), 'label: Fixture user\n', ''); }, null, 'missing key "label"');
test('a label with a colon fails', 1, d => { base(d); edit(caseOf(d, 'user'), 'label: Fixture user', 'label: Fixture: user'); }, null, 'label: a short name');
test('a label another case uses fails', 1, d => { lesson('weak', ['user', 'seller1'])(d); edit(caseOf(d, 'seller1'), 'label: Fixture seller1', 'label: fixture USER'); }, null, 'is used by another case; labels are unique');
test('a staged case reusing a label in --cases-dir fails', 1, d => {
  base(d); const staged = join(d, 'staged.md');
  writeFileSync(staged, caseText('seller1', { label: 'Fixture user' }).replace('Fixture case seller1', 'Fixture case staged'));
  return ['--cases-dir', join(d, 'cases'), staged];
}, null, 'is used by another case');
test('a model without its roles fails', 1, d => { base(d); edit(caseOf(d, 'user'), 'models: [GPT-4o (judge)]', 'models: [GPT-4o]'); }, null, 'needs its roles in brackets');
test('a model role the case\'s ai_role lacks fails', 1, d => { base(d); edit(caseOf(d, 'user'), 'models: [GPT-4o (judge)]', 'models: [GPT-4o (build/judge)]'); }, null, 'has role build, which ai_role does not list');
check('a size in brackets is part of the model name, not a role',
  (({ name, roles }) => name === 'Gemma 4 (31B)' && roles.join() === 'check')(splitModel('Gemma 4 (31B) (check)')) && splitModel('Qwen3.5 (397B)').roles.length === 0,
  JSON.stringify([splitModel('Gemma 4 (31B) (check)'), splitModel('Qwen3.5 (397B)')]));
test('a lesson naming a case other than by its label fails', 1, d => { base(d); fx(d, '  - Cases: [Fixture user][fx-user].', '  - Cases: [User fixture][fx-user].'); }, null, 'name the case by its label, "[Fixture user: <section>]"');
test('a checklist link naming a case other than by its label fails', 1, d => {
  base(d); appendFileSync(join(d, 'checklist.md'), `\nSee [the user fixture](cases/${fxFile('user')}).\n`);
}, null, 'must name the case by its label, "[Fixture user]"');
test('checked_against mixing none and a value fails', 1, d => { base(d); edit(caseOf(d, 'user'), 'checked_against: [people]', 'checked_against: [none, people]'); }, null, 'checked_against: [none] stands alone');
test('checked_against [none] passes', 0, d => { base(d); fx(d, 'Checked against people: yes.', 'Checked against people: none.'); edit(caseOf(d, 'user'), 'checked_against: [people]', 'checked_against: [none]'); });
test('empty subject fails', 1, d => { base(d); edit(caseOf(d, 'user'), 'subject: a fixture web app', 'subject:'); }, null, 'subject: short text');
test('subject unstated fails', 1, d => { base(d); edit(caseOf(d, 'user'), 'subject: a fixture web app', 'subject: unstated'); }, null, 'subject: short text');
test('sample with a bare number fails', 1, d => { base(d); edit(caseOf(d, 'user'), 'sample: 12 pages', 'sample: 12 gizmos'); }, null, 'sample: number "12" has no unit');
test('sample unstated passes', 0, d => { base(d); edit(caseOf(d, 'user'), 'sample: 12 pages', 'sample: unstated'); });
test('section "What was migrated" fails', 1, d => { base(d); edit(caseOf(d, 'user'), '## What was made or studied', '## What was migrated'); }, null, 'sections must be, in order');

// ---- Evidence files: a source in this repository, only for the maintainer's own cases --------------
const OWN = d => { lesson('weak', ['user', 'own'])(d); return caseOf(d, 'own'); };
test('a source in this repository on an independent case fails', 1,
  d => edit(OWN(d), 'author_relation: maintainer-own', 'author_relation: independent'), null, 'allowed only for author_relation: maintainer-own');
test('evidence-file with a source outside this repository fails', 1, d => {
  const p = OWN(d);
  writeFileSync(p, read(p).replaceAll(`${REPO_BLOB(REPO_SLUG)}evidence/${fxFile('own')}`, 'https://example.com/own'));
}, null, 'source_type evidence-file needs a source_url in this repository');
test('a source in this repository without source_type evidence-file fails', 1,
  d => edit(OWN(d), 'source_type: evidence-file', 'source_type: repo'), null, 'needs source_type: evidence-file');
test('a missing evidence file fails', 1, d => { OWN(d); rmSync(join(d, 'evidence', fxFile('own'))); }, null, `evidence file not found: evidence/${fxFile('own')}`);
test('an evidence file named unlike its case fails', 1, d => {
  const p = OWN(d);
  writeFileSync(p, read(p).replaceAll(`evidence/${fxFile('own')}`, 'evidence/other-name.md'));
}, null, `an evidence file is evidence/${fxFile('own')}`);
test('a link to a missing heading of the evidence file fails', 1,
  d => { OWN(d); edit(join(d, 'evidence', fxFile('own')), '## Method', '## How'); }, null, 'no heading #method in evidence/');
test('an evidence file no case cites fails', 1,
  d => { base(d); mkdirSync(join(d, 'evidence'), { recursive: true }); writeFileSync(join(d, 'evidence', '2026-01-01-orphan.md'), '# Orphan\n'); },
  null, 'evidence/2026-01-01-orphan.md: no case has this evidence file as its source_url');

// ---- Units ------------------------------------------------------------------------------------
const UNIT_WORDS = ['page', 'screen', 'click', 'participant', 'expert', 'query', 'criterion', 'heuristic', 'violation', 'walkthrough', 'judge', 'mockup',
  'rate', 'sprint', 'iteration', 'feature', 'sentence', 'row', 'platform', 'operation', 'screenshot'];
test('interface units are accepted', 0, d => {
  base(d);
  appendFileSync(caseOf(d, 'user'), `- Units: ${UNIT_WORDS.map(w => `7 ${w}s,`).join(' ')} 3 criteria ([source](${fxSource('user')})).\n`);
});
test('a number before a non-unit word fails', 1, d => {
  base(d); appendFileSync(caseOf(d, 'user'), `- Units: 7 gizmos ([source](${fxSource('user')})).\n`);
}, null, 'number "7" has no unit');
test('a model name inside a bracket and a version pair are not quantities', 0, d => {
  base(d); appendFileSync(caseOf(d, 'user'), `- Names: compared GPT 4 and 5 with help from (Gemini 2.5) ([source](${fxSource('user')})).\n`);
});
test('a number after a label word is not a quantity', 0, d => {
  base(d); appendFileSync(caseOf(d, 'user'), `- In round 2 the judge ran again ([source](${fxSource('user')})).\n`);
});
test('a number after "severity" is a level, not a quantity', 0, d => {
  base(d); appendFileSync(caseOf(d, 'user'), `- Ratings ran from severity 0 to severity 4 ([source](${fxSource('user')})).\n`);
});
test('a number after a word that is not a label still needs a unit', 1, d => {
  base(d); appendFileSync(caseOf(d, 'user'), `- Ratings ran from gravity 0 to gravity 4 ([source](${fxSource('user')})).\n`);
}, null, 'has no unit');
test('a list of numbers takes the unit of the last', 0, d => {
  base(d); appendFileSync(caseOf(d, 'user'), `- Steps: 10.37, 7.56, 7.50 steps; 10 versus 3 points; in study 2 ([source](${fxSource('user')})).\n`);
});
test('a list of numbers with no unit at its end fails', 1, d => {
  base(d); appendFileSync(caseOf(d, 'user'), `- Values: 10.37, 7.56, 7.50 gizmos ([source](${fxSource('user')})).\n`);
}, null, 'number "10.37" has no unit');
// check-copy: the models: and tools: values are named exactly as the source names them, so they
// are skipped; the same words in the body are still a copied run.
const copySetup = body => d => {
  base(d);
  edit(caseOf(d, 'user'), 'models: [GPT-4o (judge)]', 'models: [Alpha-Beta-Gamma-Delta-Epsilon (judge)]');
  edit(caseOf(d, 'user'), 'tools: [unstated]', 'tools: [Zeta Eta Theta Iota Kappa]');
  if (body) appendFileSync(caseOf(d, 'user'), '- We ran alpha beta gamma delta epsilon.\n');
  writeFileSync(join(d, 'source.txt'), 'They ran Alpha-Beta-Gamma-Delta-Epsilon with Zeta Eta Theta Iota Kappa.\n');
  return [caseOf(d, 'user'), join(d, 'source.txt')];
};
test('check-copy skips the models and tools values', 0, copySetup(false), null, 'no run of 5+ words', 'check-copy.mjs');
test('check-copy still finds a model name copied into the body', 1, copySetup(true), null, 'alpha beta gamma delta epsilon', 'check-copy.mjs');
test('a block with a number but no source link fails', 1, d => {
  base(d); appendFileSync(caseOf(d, 'user'), '- The judge read 12 pages.\n');
}, null, 'a block with a number needs a link to the source');

// --cases-dir: a staged case outside cases/ links to published cases.
const stage = d => {
  base(d); addCases(d, ['shown']);
  edit(caseOf(d, 'user'), '- A fixture.\n', `- Related: [another fixture](${fxFile('shown')}).\n`);
  mkdirSync(join(d, 'staged'));
  cpSync(caseOf(d, 'user'), join(d, 'staged', fxFile('user')));
  return join(d, 'staged', fxFile('user'));
};
test('staged case without --cases-dir has broken links', 1, d => [stage(d)], null, 'broken link');
test('staged case with --cases-dir is valid', 0, d => ['--cases-dir', join(d, 'cases'), stage(d)]);
test('--cases-dir needs a folder', 2, d => ['--cases-dir', join(d, 'nowhere'), stage(d)]);

// ---- Checklist: skipped while absent, every rule once it exists -----------------------------------
const checklist = (questions, ids) => ['# Checklist', '', ...Array.from({ length: questions }, (_, i) =>
  `${i + 1}. **Question ${i + 1}?**\n   Check: count something.\n   Evidence: what the cases show.\n   Lessons: ${ids}.\n`),
'## Report format', '', 'One line per question.', ''].join('\n');
test('without checklist.md the run says its rules are skipped', 0, d => { rmSync(join(d, 'checklist.md'), { force: true }); }, null, 'checklist.md absent');
test('a checklist.md with too few questions fails', 1, d => { base(d); writeFileSync(join(d, 'checklist.md'), checklist(4, FXID(d))); }, null, '4 questions (5 to 12)');
test('a checklist.md citing an unknown lesson fails', 1, d => { base(d); writeFileSync(join(d, 'checklist.md'), checklist(5, 'ZZZ-1')); }, null, 'cites lesson ZZZ-1, which no lesson page holds');
test('a valid checklist.md passes and is counted', 0, d => { base(d); writeFileSync(join(d, 'checklist.md'), checklist(5, FXID(d))); }, null, 'checklist.md valid: 5 questions');
test('checklist over the size cap fails', 1,
  d => { base(d); writeFileSync(join(d, 'checklist.md'), `${checklist(5, FXID(d))}\n${'Padding words for the size test. '.repeat(700)}\n`); }, null, 'bytes (at most');

// Provenance (docs/format.md "Checklist"): a Check holding a threshold or a cut, cap or forbid word needs a
// "Provenance:" line with a level, "Prevents:" and "Applied blindly:"; a "published case" line links the case.
const withQ1 = (d, check, extra = '') => writeFileSync(join(d, 'checklist.md'),
  checklist(5, FXID(d)).replace('   Check: count something.\n', `   Check: ${check}\n${extra}`));
const PROV = '   Provenance: the limit — our guess (none). Prevents: drift. Applied blindly: things get cut to fit.\n';
test('a Check holding a number without provenance fails', 1, d => { base(d); withQ1(d, 'pages with more than 3 controls.'); }, null, 'its Check holds a number but the question has no "Provenance:" line');
test('a Check holding a cap word without provenance fails', 1, d => { base(d); withQ1(d, 'whether the count may not rise.'); }, null, 'its Check holds "may not"');
test('a Check naming only a question number needs no provenance', 0, d => { base(d); withQ1(d, 'the jobs of questions 1 to 3, by name.'); });
test('a Check with a full provenance line passes', 0, d => { base(d); withQ1(d, 'pages with more than 3 controls.', PROV); });
test('a provenance line without an evidence level fails', 1, d => { base(d); withQ1(d, 'pages with more than 3 controls.', PROV.replace('our guess', 'someone said')); }, null, 'names no evidence level');
test('a provenance line without "Applied blindly:" fails', 1, d => { base(d); withQ1(d, 'pages with more than 3 controls.', PROV.replace('Applied blindly:', 'Else:')); }, null, 'needs "Applied blindly: <how it fails>"');
test('a provenance line at "published case" without a case link fails', 1, d => { base(d); withQ1(d, 'pages with more than 3 controls.', PROV.replace('our guess', 'published case')); }, null, 'must link the case');

// corrections.md (docs/format.md "Corrections"): always present; each entry has its five parts in order.
test('without corrections.md the run fails', 1, d => { rmSync(join(d, 'corrections.md'), { force: true }); }, null, 'corrections.md: missing');
test('a corrections entry missing a part fails', 1, d => {
  appendFileSync(join(d, 'corrections.md'), '\n## 2027-01-01 — a test entry\n\n- **Wrong:** x.\n- **Published:** y.\n- **Recognise it:** z.\n- **Propose to the owner:** w.\n');
}, null, 'parts must be, in order');

// ---- Lessons (docs/format.md "Lessons"): one broken copy per rule, on the fixture lesson -------------------
test('lesson with an unknown tag fails', 1, d => { base(d); fx(d, '- **ID** [ours]', '- **ID** [maybe]'); }, null, 'tag must be [stated] or [ours]');
test('lesson text over 200 characters fails', 1,
  d => { base(d); fx(d, 'before trusting it.\n  - Depends', `before trusting it ${'and then some more words '.repeat(6)}.\n  - Depends`); }, null, 'lesson text must be one line of 1 to 200 characters');
test('lesson text with a number fails', 1, d => { base(d); fx(d, '[ours] Compare a model judge', '[ours] Compare 3 model judges'); }, null, 'lesson text holds a number');
test('duplicate lesson ID fails', 1, d => {
  base(d); const t = read(L(d)); const first = t.match(/^- \*\*([A-Z]{3}-\d+)\*\*/m)[1];
  fx(d, '- **ID**', `- **${first}**`);
}, null, 'is used twice');
test('lesson ID with another page\'s prefix fails', 1, d => { base(d); fx(d, '- **ID**', '- **ZZZ-1**'); }, null, 'every lesson on a page shares one prefix');
test('malformed lesson ID fails', 1, d => { base(d); fx(d, '- **ID**', `- **${prefixOf(d)}-099**`); }, null, 'must be three capital letters');
test('lesson without "Against" fails', 1, d => { base(d); fx(d, '\n  - Against: None found.\n', '\n'); }, null, 'sub-items must be, in order: Depends on model ability, Cases, Against');
test('unknown sub-item fails', 1, d => { base(d); fx(d, '  - Against: None found.\n\n','  - Against: None found.\n  - Note: an extra line.\n\n'); }, null, 'sub-items must be, in order');
test('bad model-ability value fails', 1, d => { base(d); fx(d, 'Depends on model ability: no. Checked', 'Depends on model ability: maybe. Checked'); }, null, '"Depends on model ability" must be one of');
test('bad "Checked against people" value fails', 1, d => { base(d); fx(d, 'Checked against people: yes.', 'Checked against people: some.'); }, null, '"Checked against people" must be one of');
test('the old oracle tag fails', 1,
  d => { base(d); fx(d, '  - Depends on model ability: no. Checked against people: yes.', '  - Old system as oracle: no. Depends on model ability: no.'); }, null, 'sub-items must be, in order: Depends on model ability');
test('meta line without "Checked against people" fails', 1,
  d => { base(d); fx(d, 'Depends on model ability: no. Checked against people: yes. Strength', 'Depends on model ability: no. Strength'); }, null, 'write "Depends on model ability: yes|partly|no. Checked against people');
// Five values (coordinator, 2026-11-15); the old "no" is gone, and each value but none needs a cited case
// checked against its ground.
test('the old "Checked against people: no" fails', 1, d => { base(d); fx(d, 'Checked against people: yes.', 'Checked against people: no.'); }, null, '"Checked against people" must be one of yes, partly, checker, model, none');
test('"Checked against people: checker" with no case checked against a checker fails', 1,
  d => { base(d); fx(d, 'Checked against people: yes.', 'Checked against people: checker.'); }, null, 'needs a cited case whose checked_against holds checker');
test('"Checked against people: model" with no case checked against a model fails', 1,
  d => { base(d); fx(d, 'Checked against people: yes.', 'Checked against people: model.'); }, null, 'needs a cited case whose checked_against holds model');
test('"Checked against people: partly" with no case checked against people fails', 1, d => {
  base(d); fx(d, 'Checked against people: yes.', 'Checked against people: partly.');
  edit(caseOf(d, 'user'), 'checked_against: [people]', 'checked_against: [checker]');
}, null, 'needs a cited case whose checked_against holds people');
test('"Checked against people: checker" with a case checked against a checker passes', 0, d => {
  base(d); fx(d, 'Checked against people: yes.', 'Checked against people: checker.');
  edit(caseOf(d, 'user'), 'checked_against: [people]', 'checked_against: [people, checker]');
});
test('"Checked against people: none" needs no ground and passes', 0, d => { base(d); fx(d, 'Checked against people: yes.', 'Checked against people: none.'); });
test('bad strength value fails', 1, d => { base(d); fx(d, 'Strength: weak.', 'Strength: huge.'); }, null, 'strength must be one of');
test('Era in free form fails', 1, d => { base(d); fx(d, 'Era: 2025; newest: GPT-4o.', 'Era: all model eras.'); }, null, 'write the Era as "YYYY" or "YYYY–YYYY"');
test('Era whose years do not match its cases fails', 1, d => { base(d); fx(d, 'Era: 2025; newest: GPT-4o.', 'Era: 2024–2025; newest: GPT-4o.'); },
  null, 'the Era must give the years and the newest model family of the cases in "Cases": "Era: 2025; newest: GPT-4o."');
test('a "Sceptic:" line on a lesson page fails', 1,
  d => { base(d); fx(d, '  - Against: None found.\n\n','  - Against: None found.\n  - Sceptic: tag kept.\n\n'); }, null, 'a "Sceptic:" line belongs in the private archive');
test('"Cases" with no link fails', 1, d => { base(d); fx(d, '  - Cases: [Fixture user][fx-user].', '  - Cases: Fixture user.'); }, null, '"Cases" needs at least one link');
test('lesson link to a missing case fails', 1, d => { base(d); edit(L(d), `[fx-user]: ../cases/${fxFile('user')}`, '[fx-user]: ../cases/2025-01-01-gone.md'); }, null, 'case not found: 2025-01-01-gone.md');
test('lesson link to a missing case section fails', 1, d => { base(d); edit(L(d), `${fxFile('user')}#what-went-wrong`, `${fxFile('user')}#what-failed`); }, null, 'no section #what-failed');
test('lesson link to a case with no section fails', 1, d => { base(d); edit(L(d), `${fxFile('user')}#what-went-wrong`, fxFile('user')); }, null, 'link must go to a case section');
test('undefined reference label fails', 1, d => { base(d); fx(d, '  - Cases: [Fixture user][fx-user].', '  - Cases: [Fixture user][fx-nowhere].'); }, null, 'has no reference definition');
test('"Against" with a near-miss "Disagree" fails', 1, d => { base(d); fx(d, '  - Against: None found.\n\n','  - Against: Disagrees: a fixture.\n\n'); }, null, 'start a split with "Against: Disagree: ..."');
test('"Related view" to another site fails', 1,
  d => { base(d); fx(d, '  - Against: None found.\n\n','  - Against: None found.\n  - Related view (karpathy-ideas): [idea](https://example.com/ideas/x.md), agrees.\n\n'); }, null, '"Related view" links one idea file');
test('"Related view" without agrees or contradicts fails', 1,
  d => { base(d); fx(d, '  - Against: None found.\n\n','  - Against: None found.\n  - Related view (karpathy-ideas): [idea](https://github.com/ntroccoli/karpathy-ideas/blob/main/ideas/x.md), related.\n\n'); }, null, 'ends with ", agrees." or ", contradicts: why."');
test('bare number in a lesson sub-item fails', 1, d => { base(d); fx(d, '  - Against: None found.\n\n','  - Against: None found in 7 gizmos.\n\n'); }, null, 'number "7" has no unit');
test('long quote in a lesson page fails', 1, d => { base(d); fx(d, '  - Against: None found.\n\n','  - Against: None found; "these words are copied from the source".\n\n'); }, null, 'quoted span over four words');
test('stray line in a lesson list fails', 1, d => { base(d); fx(d, '  - Against: None found.\n\n','  - Against: None found.\nA loose paragraph.\n\n'); }, null, 'not a lesson, a sub-item or a reference definition');
test('lesson page without the evidence note fails', 1, d => edit(L(d), 'Evidence base: every lesson here comes from', 'Evidence: every lesson here comes from'), null, 'needs the evidence note');
test('lesson page without the legend fails', 1, d => edit(L(d), '`[stated]`: a source says it', '`[stated]`: someone says it'), null, 'needs the legend');
test('lesson page without an intro fails', 1, d => {
  const t = read(L(d)); const lines = t.split('\n'); const h1 = lines.findIndex(l => /^# /.test(l));
  let j = h1 + 1; while (!lines[j].trim()) j++; let k = j; while (lines[k].trim()) k++;
  lines.splice(j, k - j + 1); writeFileSync(L(d), lines.join('\n'));
}, null, 'needs a one-paragraph intro');
test('lesson page over the size cap fails', 1, d => appendFileSync(L(d), `\n[pad]: ../index.md${' '.repeat(21000)}\n`), null, 'bytes (at most 20480)');
test('lessons/index.md over its size cap fails', 1, d => appendFileSync(join(d, 'lessons', 'index.md'), `\n${' '.repeat(13000)}\n`), null, 'bytes (at most 12288)');
test('llms.txt over its size cap fails', 1, d => appendFileSync(join(d, 'llms.txt'), `\n${' '.repeat(21000)}\n`), null, 'bytes (at most 20480)');
// Every session loads AGENTS.md: it stays at or under 8 KB, the format lives in docs/format.md.
test('AGENTS.md over its size cap fails', 1, d => appendFileSync(join(d, 'AGENTS.md'), `\n${'x'.repeat(8200)}\n`), null, 'AGENTS.md: ');
test('AGENTS.md at its size cap passes', 0, d => {
  const f = join(d, 'AGENTS.md'), t = read(f);
  writeFileSync(f, t + 'x'.repeat(8192 - Buffer.byteLength(t, 'utf8') - 1) + '\n');
});
test('lesson page not in LESSON_PAGES fails', 1, d => cpSync(L(d), L(d, 'extra')), null, 'lessons/extra.md: not listed in LESSON_PAGES');
test('lesson page in LESSON_PAGES but missing fails', 1, d => rmSync(L(d)), null, `lessons/${PAGE}.md: listed in LESSON_PAGES but missing`);
test('a case that no lesson cites fails', 1, d => addCases(d, ['shown']), null, `${fxFile('shown')}: no lesson and no checklist question cites this case`);

// A [stated] lesson that cites only "Practices to copy" rests on a [stated] practice line.
test('[stated] lesson resting only on an [ours] practice fails', 1, d => {
  addCases(d, ['user'], { user: { practiceTag: '[ours]' } });
  lesson('weak', ['user'], { tag: 'stated', section: 'practices-to-copy', write: false })(d);
}, null, '[stated] but "Cases" links only "Practices to copy"');
test('[stated] lesson resting on a [stated] practice passes', 0, lesson('weak', ['user'], { tag: 'stated', section: 'practices-to-copy' }));

// ---- Strength ceiling: the cases behind a lesson cap its strength --------------------------------
test('fixture lesson at its ceiling passes', 0, lesson('weak', ['user']));
test('medium on one assertion-only case fails', 1, lesson('medium', ['user']), null, 'strength medium needs more evidence; its cases allow at most weak');
test('strong on cases only from sellers of the tool fails', 1, lesson('strong', ['seller1', 'seller2']), null, 'strength strong needs more evidence; its cases allow at most medium');
test('strong on two cases, one not from a seller, passes', 0, lesson('strong', ['seller1', 'user']));
test('one case that shows its data, not from a seller, allows strong', 0, lesson('strong', ['shown']));
// The maintainer's own case never counts toward the cap (docs/format.md "Lessons").
test('a maintainer-own case alone allows only weak', 1, lesson('medium', ['own']), null, 'strength medium needs more evidence; its cases allow at most weak');
test('a maintainer-own case does not make two cases', 1, lesson('medium', ['own', 'user']), null, 'strength medium needs more evidence; its cases allow at most weak');
test('a maintainer-own case does not lift sellers to strong', 1, lesson('strong', ['own', 'seller1', 'seller2']), null, 'its cases allow at most medium');

// The Era: the newest family is that of the most recent cited case that names a model.
for (const [keys, want] of [[['user', 'shown'], '2025–2026; newest: GPT-5.x'], [['seller1'], '2025; newest: Claude Sonnet 4.x'], [['seller2'], '2025; newest: Gemini 2.x']]) {
  const got = eraText(expectedEra(keys.map(k => ({ ...FX[k], models: FX[k].models.slice(1, -1).split(', ').map(x => splitModel(x).name) }))));
  check(`expectedEra of ${keys.join(' + ')}`, got === want, `wanted "${want}", got "${got}"`);
}
for (const [name, want] of [['Gemini-2.5-pro', 'Gemini 2.x'], ['Claude 3.5 Sonnet', 'Claude Sonnet 3.x'], ['Claude 4.0 Sonnet', 'Claude Sonnet 4.x'],
  ['GPT-4', 'GPT-4.x'], ['GPT-4o', 'GPT-4o'], ['GPT-o4-mini', 'OpenAI o4'], ['Claude-opus-4-1', 'Claude Opus 4.x'], ['Hunyuan-TurboS', 'Hunyuan (version unstated)'], ['Qwen2.5-Coder-32B', 'Qwen 2.x'],
  ['Kimi K2.5', 'Kimi K2.x'], ['Kimi K2.6', 'Kimi K2.x'], ['Gemma 4 (31B)', 'Gemma 4.x'], ['Kimi', 'Kimi (version unstated)']]) {
  const got = modelFamily(name);
  check(`modelFamily("${name}") is ${want}`, got === want, `got ${got}`);
}

// ---- Build: generated files, the disclosure, may be outdated ------------------------------------
const generated = d => Object.fromEntries([['index', 'lessons/index.md'], ['llms', 'llms.txt'], ['evidence', 'lessons/evidence.md'],
  ['readme', 'README.md'], ['full', 'llms-full.txt'], ['cases', 'index.md']].map(([k, f]) => [k, read(join(d, f))]));
const built = d => { const r = node(d, 'build.mjs', []); if (r.status !== 0) throw new Error(r.stdout + r.stderr); return generated(d); };
const disclosureOf = t => t.split('<!-- disclosure: generated by scripts/build.mjs -->')[1]?.split('<!-- /disclosure -->')[0] ?? '';
// The disclosure names every case whose org or subject is Anthropic, in README.md and llms.txt.
test('the disclosure names a case whose author is Anthropic', 0, d => {
  lesson('weak', ['user', 'anthropic'])(d);
  const o = built(d);
  for (const [f, t] of [['README.md', o.readme], ['llms.txt', o.llms]]) {
    const x = disclosureOf(t);
    if (!/Anthropic is the author or the subject of (one case|\d+ cases): [^\n]*Fixture case anthropic/.test(x)) throw new Error(`${f}: ${x}`);
  }
  return ['--check'];
}, null, null, 'build.mjs');
test('the disclosure names a case whose subject is Anthropic', 0, d => {
  addCases(d, ['user']); addCases(d, ['shown'], { shown: { subject: 'Anthropic\'s harness for long-running apps' } });
  lesson('weak', ['user', 'shown'], { write: false })(d);
  const x = disclosureOf(built(d).readme);
  if (!/Anthropic is the author or the subject of (one case|\d+ cases): [^\n]*Fixture case shown/.test(x)) throw new Error(x);
});
test('the disclosure names the cases that involve Claude models', 0, d => {
  lesson('weak', ['user', 'seller1'])(d);
  const x = disclosureOf(built(d).llms);
  if (!/cases involve Claude models or Claude Code[^\n]*Fixture seller1/.test(x) || /cases involve Claude[^.]*Fixture user/.test(x)) throw new Error(x);
});
test('the disclosure names the maintainer\'s own cases', 0, d => {
  lesson('weak', ['user', 'own'])(d);
  const x = disclosureOf(built(d).readme);
  if (!/Fixture own[^\n]*marked maintainer-own\): never independent evidence/.test(x)) throw new Error(x);
});
test('build --check fails after hand-editing the README disclosure', 1,
  d => { edit(join(d, 'README.md'), 'Disclosure: the cases', 'Disclosure: some cases'); return ['--check']; }, null, 'out of date: README.md', 'build.mjs');
test('build --check fails after hand-editing the llms.txt disclosure', 1,
  d => { edit(join(d, 'llms.txt'), 'Disclosure: the cases', 'Disclosure: some cases'); return ['--check']; }, null, 'out of date: llms.txt', 'build.mjs');
test('build refuses a README without its block markers', 1, d => { edit(join(d, 'README.md'), '<!-- /contents -->', ''); return []; }, null, 'needs the markers', 'build.mjs');
test('evidence.md marks a maintainer-own case "(own)"', 0, d => {
  lesson('weak', ['user', 'own'])(d);
  const line = built(d).evidence.match(new RegExp(`^- \\*\\*${FXID(d)}\\*\\*.*$`, 'm'))?.[0] || '';
  if (!line.endsWith('Model no; people yes; weak. Cases: Fixture user, Fixture own (own). Against: none found.')) throw new Error(`line: ${line}`);
  return ['--check'];
}, null, null, 'build.mjs');
test('index.md gives each case its type, roles and what it was checked against', 0, d => {
  base(d);
  const line = built(d).cases.match(/^- \*\*Fixture user\*\*: \[Fixture case user\].*$/m)?.[0] || '';
  if (!line.includes('— study: a fixture web app; AI: judge; measured: judge-agreement; checked against: people; sample: 12 pages;')) throw new Error(line);
});

// "May be outdated": a lesson tagged yes for model ability whose most recent case is more than
// OUTDATED_MONTHS old at the reference date. Fixture "shown" is dated 2026-02-01, work 2026.
const marked = (o, id) => new RegExp(`^- \\*\\*${id}\\*\\*[^\\n]*; may be outdated\\. Cases:`, 'm').test(o.evidence)
  && new RegExp(`Marked now: [^\\n]*${id}`).test(o.llms);
const outdatedRun = (model, today) => d => {
  lesson('weak', ['shown'], { model })(d);
  const r = node(d, 'build.mjs', ['--today', today]);
  if (r.status !== 0) throw new Error(r.stdout + r.stderr);
  return generated(d);
};
test('a model-dependent lesson with an old newest case is marked may be outdated', 0, d => {
  if (!marked(outdatedRun('yes', '2027-03-02')(d), FXID(d))) throw new Error('not marked');
});
test('a model-dependent lesson with a recent case is not marked', 0, d => {
  if (marked(outdatedRun('yes', '2026-12-30')(d), FXID(d))) throw new Error('marked although its case is under a year old');
});
test('a lesson tagged partly is never marked', 0, d => {
  if (marked(outdatedRun('partly', '2030-01-01')(d), FXID(d))) throw new Error('marked although not tagged yes');
});

test('build --check fails after hand-editing llms.txt', 1, d => { appendFileSync(join(d, 'llms.txt'), '\nA hand edit.\n'); return ['--check']; }, null, 'out of date: llms.txt', 'build.mjs');
test('build --check fails after hand-editing lessons/index.md', 1, d => { appendFileSync(join(d, 'lessons', 'index.md'), '\nA hand edit.\n'); return ['--check']; }, null, 'out of date: lessons/index.md', 'build.mjs');
test('build --check fails after hand-editing lessons/evidence.md', 1, d => { appendFileSync(join(d, 'lessons', 'evidence.md'), '\nA hand edit.\n'); return ['--check']; }, null, 'out of date: lessons/evidence.md', 'build.mjs');
test('build --check fails after a lesson change without a rebuild', 1, d => { base(d); return ['--check']; }, null, 'out of date', 'build.mjs');
test('build refuses a case that does not parse', 1, d => { base(d); edit(caseOf(d, 'user'), 'case_type: study\n', 'case_type study\n'); return []; }, null, 'cannot build', 'build.mjs');
test('build refuses a lesson without its model-ability line', 1,
  d => { base(d); fx(d, 'before trusting it.\n  - Depends on model ability: no. Checked against people: yes. Strength: weak. Era: 2025; newest: GPT-4o.\n', 'before trusting it.\n'); return []; },
  null, 'no "Depends on model ability" line', 'build.mjs');
test('build refuses a log.md without a dated entry', 1, d => { writeFileSync(join(d, 'log.md'), '# Update log\n'); return []; }, null, 'log.md needs an entry', 'build.mjs');
test('build refuses a bad --today', 2, () => ['--today', 'tomorrow'], null, '--today takes a date', 'build.mjs');
test('without checklist.md the generated files say it comes later', 0, d => {
  // The questions gone land in a new entry, which names them.
  edit(join(d, 'log.md'), '\n## ', '\n## 2027-01-10 — a test update\n\n- A test entry.\n\n### Checklist and lessons impact\n\n' +
    '- **Checklist:** every question (removed).\n- **New lessons:** none.\n- **Changed lessons:** none.\n\n## ');
  rmSync(join(d, 'checklist.md'), { force: true });
  const o = built(d);
  if (!/no checklist yet/.test(o.readme) || !/comes after the first ten cases/.test(o.llms)) throw new Error('no note on the missing checklist');
});
test('llms-full.txt carries each reference definition once', 0, d => {
  base(d);
  const defs = built(d).full.match(/^\[[^\]]+\]:/gm) || [];
  const dup = defs.filter((x, i) => defs.indexOf(x) !== i);
  if (dup.length) throw new Error(`repeated: ${dup.join(' ')}`);
  return ['--check'];
}, null, null, 'build.mjs');
test('evidence.md has one line per lesson; index.md lists only marked ones, llms.txt none', 0, d => {
  base(d);
  const o = built(d);
  const pages = LESSON_PAGES.reduce((s, p) => s + (read(L(d, p)).match(/^- \*\*[A-Z]{3}-\d+\*\*/gm) || []).length, 0);
  const lines = (o.evidence.match(/^- \*\*[A-Z]{3}-\d+\*\*/gm) || []).length;
  const inIndex = (o.index.match(/^- \*\*[A-Z]{3}-\d+\*\*/gm) || []).length, inLlms = (o.llms.match(/\*\*[A-Z]{3}-\d+\*\*/g) || []).length;
  if (!pages || lines !== pages || inIndex >= pages / 2 || inLlms) throw new Error(`pages ${pages}, evidence ${lines}, index ${inIndex}, llms ${inLlms}`);
});
// The no-warranty notice (owner, 2026-11-15): llms.txt carries it right after the summary quote, written by
// the build (--check passes on the committed files), and README opens "Try it" with it, above both routes.
test('llms.txt and README carry the no-warranty notice', 0, d => {
  const o = generated(d);
  const line = 'No warranty: everything here is provided as it is. Before changing anything because of it, show the user ' +
    'each proposal with its source and evidence level and let the user choose; work on a branch or with a backup.';
  if (!new RegExp(`^> [^\\n]+\\n\\n${line.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\n`, 'm').test(o.llms)) throw new Error('llms.txt: no notice after the summary');
  const tryIt = o.readme.split(/^## Try it$/m)[1]?.split(/^### /m)[0] ?? '';
  if (!/^\*\*No warranty\.\*\* This collection is provided as it is, with no warranty\./.test(tryIt.trim())) throw new Error('README: "Try it" does not open with the notice');
  return ['--check'];
}, null, null, 'build.mjs');
// One review prompt (owner, 2026-11-15): README's step 1 prompts send the agent to llms.txt's "Review a project",
// which downloads the files, routes by each route's record and makes the agent name its path; old step 3
// anchors in docs/try-it.md stay so old links still land.
test('llms.txt routes the step 1 prompt by the record; README and try-it point there', 0, d => {
  const o = generated(d);
  const review = o.llms.split(/^## Review a project/m)[1]?.split(/^## /m)[0] ?? '';
  const missing = ['docs/interface-review.md', 'docs/interface-lessons-review.md', 'No record: a first review', 'A record: a revisit',
    'corrections.md', '`Path: first review (<route>)`', '`Path: revisit (<route>)`', 'curl', 'Read each file whole from disk',
    'Delete the folder', 'Change nothing', '"Apply none; write the record"'].filter(s => !review.includes(s));
  if (missing.length) throw new Error(`llms.txt "Review a project" lacks: ${missing.join(' | ')}`);
  const prompts = o.readme.split(/^## Try it$/m)[1]?.split(/^## /m)[0].match(/^```text\n(.+)\n```$/gm) || [];
  if (prompts.length !== 2 || !prompts.every(p => p.includes('llms.txt') && p.includes('"Review a project"') && p.includes('Change nothing until I choose')))
    throw new Error(`README step 1 prompts: ${prompts.length}, each must send to "Review a project"`);
  const apply = read(join(d, 'docs', 'applying-lessons.md'));
  const gone = ['How to run it', 'Revisit', 'Report format', 'Revisit report', 'The checklist report', 'Apply (step 2)']
    .filter(h => !new RegExp(`^## ${h.replace(/[()]/g, '\\$&')}$`, 'm').test(apply));
  if (gone.length) throw new Error(`docs/applying-lessons.md lacks the sections llms.txt names: ${gone.join(', ')}`);
  const tryIt = read(join(d, 'docs', 'try-it.md'));
  if ((tryIt.match(/^### Step 3: revisit later$/gm) || []).length !== 2) throw new Error('docs/try-it.md: the two "Step 3: revisit later" anchors are gone');
  return ['--check'];
}, null, null, 'build.mjs');
// One agent route (llms.txt, then evidence.md, then a page): the committed short files never list every
// lesson (copied from ai-migrations, 2026-11-15; the test above rebuilds with a fixture, this one reads
// the files as committed).
test('lessons/index.md and llms.txt do not list every lesson', 0, d => {
  const o = generated(d);
  const total = (o.evidence.match(/^- \*\*[A-Z]{3}-\d+\*\*/gm) || []).length;
  const inIndex = (o.index.match(/^- \*\*[A-Z]{3}-\d+\*\*/gm) || []).length, inLlms = (o.llms.match(/\*\*[A-Z]{3}-\d+\*\*/g) || []).length;
  if (!total || inIndex >= total / 2 || inLlms) throw new Error(`lesson lines: index ${inIndex}, llms.txt ${inLlms}, of ${total}`);
});
test('"By model" lists a lesson under the role the family played in its case', 0, d => {
  addCases(d, ['user'], { user: { ai_role: '[build, judge]', models: '[GPT-4o (build)]' } });
  lesson('weak', ['user'], { model: 'yes', write: false })(d);
  const row = built(d).index.match(/^\| GPT-4o \|.*$/m)?.[0] || '';
  if (!new RegExp(`\\| \\d+: [^|]*build: [^|]*${FXID(d)}`).test(row) || new RegExp(`judge: [^|]*${FXID(d)}`).test(row)) throw new Error(`row: ${row}`);
});
test('"By model" rows never repeat a newest case with the same lessons', 0, d => {
  lesson('weak', ['user', 'seller1', 'seller2', 'shown'])(d);
  const rows = (built(d).index.split(/^## By model$/m)[1]?.split(/^## /m)[0].match(/^\| (?!Model family|---).*$/gm) || [])
    .map(r => r.split(' | ').slice(2).join(' | '));
  if (rows.length < 2 || new Set(rows).size !== rows.length) throw new Error(`rows: ${rows.length}, distinct: ${new Set(rows).size}`);
});

// Synced hand-written files: one repository slug.
const rename = d => edit(join(d, 'scripts', 'lib.mjs'), 'export const REPO_SLUGS = [', "export const REPO_SLUGS = ['someone/new-name', ");
test('build --check fails after a repository rename until rebuilt', 1, d => { rename(d); return ['--check']; }, null, 'lychee.toml', 'build.mjs');
test('a rebuild after a rename rewrites the old name and leaves other URLs', 0, d => {
  rename(d);
  edit(join(d, 'CONTRIBUTING.md'), 'Thanks for helping', 'See https://github.com/other/repo. Thanks for helping');
  node(d, 'build.mjs', []);
  const t = read(join(d, 'CONTRIBUTING.md'));
  if (t.includes('ntroccoli/ai-interfaces') || !t.includes('someone/new-name/issues') || !t.includes('github.com/other/repo')) throw new Error('rename not applied as expected');
  return ['--check'];
}, null, null, 'build.mjs');

// ---- log.md and changes/: every entry but the oldest names what it added or changed -------------------
const SLUG = '2027-01-10-a-test-update';
const changes = (d, slug = SLUG) => read(join(d, 'changes', `${slug}.md`));
const impactEntry = (d, { checklist: q = 'no question changed', added = 'none', changed = 'none' } = {}) =>
  edit(join(d, 'log.md'), '\n## ', `\n## 2027-01-10 — a test update\n\n- A test entry.\n\n### Checklist and lessons impact\n\n` +
    `- **Checklist:** ${q}.\n- **New lessons:** ${added}.\n- **Changed lessons:** ${changed}.\n\n## `);
const newLogEntry = (d, date) => edit(join(d, 'log.md'), '\n## ', `\n## ${date} — a test update\n\n- A test entry.\n\n## `);
test('a log entry without its impact part fails', 1, d => { newLogEntry(d, '2027-01-10'); node(d, 'build.mjs', []); }, null, 'needs a "### Checklist and lessons impact" part');
test('a new log entry with nothing changed gets an empty changes file and passes', 0, d => {
  impactEntry(d); node(d, 'build.mjs', []);
  if (!/- Added lessons: none\n- Changed lessons: none\n/.test(changes(d))) throw new Error(changes(d).slice(0, 600));
});
test('a lesson added after the newest entry is listed, and the entry must name it', 1, d => {
  impactEntry(d); base(d); edit(join(d, 'log.md'), `- **New lessons:** ${FXID(d)}.`, '- **New lessons:** none.'); node(d, 'build.mjs', []);
  if (!new RegExp(`^- Added lessons: ${FXID(d)}$`, 'm').test(changes(d))) throw new Error(changes(d).slice(0, 600));
}, null, 'a test update: the impact part misses');
test('naming the added lesson in the entry passes', 0, d => { impactEntry(d); base(d); node(d, 'build.mjs', []); });
test('a log entry naming a lesson that does not exist fails', 1, d => { impactEntry(d, { added: 'ZZZ-9' }); node(d, 'build.mjs', []); }, null, '"New lessons" names ZZZ-9, which no lesson page has');
test('a log entry with an empty "New lessons" line fails', 1, d => { impactEntry(d, { added: 'to come' }); node(d, 'build.mjs', []); }, null, '"New lessons" names no lesson ID; write none');
test('a log entry naming a lesson its changes file does not list fails', 1, d => {
  impactEntry(d, { changed: read(L(d)).match(/^- \*\*([A-Z]{3}-\d+)\*\*/m)[1] }); node(d, 'build.mjs', []);
}, null, 'which changes/2027-01-10-a-test-update.md does not list');
test('build refuses a missing changes file of an older entry', 1, d => {
  impactEntry(d); node(d, 'build.mjs', []);
  const older = read(join(d, 'log.md')).match(/^## (\d{4}-\d{2}-\d{2}) — (.+)$/gm)[1];
  const slug = `${older.slice(3, 13)}-${older.slice(16).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`;
  rmSync(join(d, 'changes', `${slug}.md`)); return [];
}, null, 'is missing', 'build.mjs');
test('build --check fails after hand-editing the newest changes file', 1, d => {
  impactEntry(d); node(d, 'build.mjs', []); appendFileSync(join(d, 'changes', `${SLUG}.md`), '\nA hand edit.\n'); return ['--check'];
}, null, `out of date: changes/${SLUG}.md`, 'build.mjs');

rmSync(TMP, { recursive: true, force: true });
if (failed.length) { console.error(`\n${failed.length} test(s) failed:\n` + failed.join('\n\n')); process.exit(1); }
console.log(`\nall ${n} tests passed`);
