# Format and rules

The full format of every file in this repository and the rules the validator and the build check.
[AGENTS.md](../AGENTS.md) holds what every session needs; read this page when you write or change a
case, an evidence file, a lesson, the checklist, the log or the scripts.

## Case files

One file per case: `cases/YYYY-MM-DD-org-what.md`, where the date is the source's first
publication date (for a paper, its first version; the Source section says which version was read;
for a series, its first part). `node scripts/validate.mjs` checks the rules below; it must exit 0
before a commit, and so must the Markdown linter: `npx markdownlint-cli2@0.24.0 "**/*.md"`
(pinned; the version in markdownlint-cli2-action v25.0.0; rules in `.markdownlint-cli2.jsonc`). A
case staged outside `cases/` validates in place with
`node scripts/validate.mjs --cases-dir cases <staged case>` (its links to other cases resolve in
`cases/`). A new case comes with its lesson edits ("Upkeep" under Lessons) and a rebuild. After a
change to the validator or the build, `node scripts/test-validate.mjs`
(broken-copy tests on fixture cases) must exit 0; add a test for each new rule. `npm run check:all`
runs the validator, `build.mjs --check` and the tests in one call.

```markdown
---
title: People and LLM agents walk the same tasks; agents finish more and see fewer failures
label: UW walkthrough
date: 2025-12-03
org: Short name of the company, lab or the authors' institutions
summary: One sentence, at most 160 characters, for the index and llms-full.txt.
source_url: https://arxiv.org/abs/2512.03568
also: [https://arxiv.org/html/2512.03568v1]
source_type: paper
author_relation: independent
evidence: shown-in-source
case_type: study
ai_role: [simulate-user]
subject: a web app's sign-up and settings tasks
sample: 10 participants and 16 agent runs
measures: [task-cost, human-preference]
checked_against: [people]
cost: unstated
tools: [unstated]
models: [GPT-4 (simulate-user/judge), Gemini-2.5-pro (simulate-user/judge)]
period: 2025
outcome: completed
status: current
superseded_by:
---

# People and LLM agents walk the same tasks; agents finish more and see fewer failures

Summary in our own words, 40 to 150 words.

## Source
## What was made or studied
## Who did what
- **AI:** ...
- **Rule-based tools:** ...
- **People:** ...
## How it was checked
## Numbers
| Number | What it counts | Basis | Source |
| --- | --- | --- | --- |
## What worked
## What went wrong
- **Not reported:** ...
## Practices to copy
## In their words        (optional)
## Context
```

(The front matter above shows the shape; the values are illustrative.)

Field rules (all checked):

- `label`: the case's one short name, at most 32 characters (`LABEL_MAX`), no brackets or colon,
  unique across cases (checked). Every generated list, the lesson pages, the checklist and the docs
  name the case by it ("UW walkthrough", not the org or a nickname); the validator checks the link
  text on the lesson pages and in the checklist.
- `date`: `YYYY-MM-DD`, not in the future; the file name starts with it.
- `org`: who did the work: a company, a lab, or the authors' institutions, short. Two cases that
  supersede one another have the same `org` (checked).
- `source_url`: the primary source, `https://`. `also`: an inline list of the other URLs of the
  same source (the HTML version of a paper whose sections the case links, the other parts of a
  series, the official repository when the source links it), or `[]`.
- `source_type`: `engineering-post` (by the people who did the work, for a company or for
  themselves), `paper`, `talk`, `repo` (official repository or docs), `vendor-marketing` (written to
  sell), `evidence-file` (an evidence file in this repository; see "Evidence files").
- `author_relation`: `seller-of-tool` when the author's company sells, or promotes in the source, an
  AI model, tool or platform the case used or ranks (a lab that ranks its own model in its own
  benchmark counts), and also when a tool user writes the source in partnership with the tool's
  vendor; `user-of-tool`; `independent` (no stake in the work or the tools); `maintainer-own` (the
  maintainer's own project). A seller's case weighs less; its Source section says what is sold.
- `evidence`: how far a reader can check the claims. `independent-data` (someone outside the team
  measured it), `shown-in-source` (the source shows the data, logs, benchmark or method behind its
  numbers), `assertion-only` (numbers are stated, not shown).
- `case_type`: `product` (a team's story of an interface it made or changed), `benchmark` (a fixed
  set of tasks that ranks models or tools), `study` (an experiment with people, or models compared
  with people).
- `ai_role`: an inline list, no repeats, of what AI did: `design` (proposed a look, a layout or a
  flow), `build` (wrote the interface), `change` (edited an existing one), `check` (found problems
  against rules), `judge` (scored or ranked interfaces as a rater would), `simulate-user` (acted as a
  user walking through tasks).
- `subject`: the interface or the set of interfaces, short text. `sample`: how many pages, apps,
  people or runs, with units, or `unstated`. Every number carries a unit.
- `measures`: an inline list, no repeats, of what was measured: `accessibility`, `contrast`,
  `task-cost` (clicks, screens, steps or time per job), `function` (does it work), `visual-match`
  (does it look like a target), `consistency` (components and tokens used alike), `human-preference`
  (people's ratings or choices), `judge-agreement` (how often a model judge agrees with people),
  `issue-coverage` (the share of a reference list of issues found: heuristic reviews, audits),
  `run-stability` (how far repeat runs of the same setup agree), `sameness` (how alike the
  designs are: homogeneity only), `cost`.
- `checked_against`: an inline list of what the AI's output was compared with: `people` (real users
  or experts), `checker` (automated rules such as axe), `model` (an LLM judge), or `[none]` alone.
  `people` needs reported results of people's checks: users, experts or raters measured, or items
  coded to a stated protocol. An author judging their own work (an engineer trying the app, the
  maintainer using the project) is not people, nor is a team that reviews output without reporting
  what it found; such a case is `[none]` unless a checker or a model was also compared.
- `tools`, `models`: inline lists; `[unstated]` when the source names none. Models are named
  exactly as the source names them, in any role, each followed by its roles in the work in
  brackets, from the case's `ai_role`, joined by `/`: `GPT-4 (simulate-user/judge)`,
  `Gemma 4 (31B) (check)` (checked). A model under test in a benchmark is in the role it was tested
  in (`build` for the models that wrote the pages). "By model" lists each lesson under these roles.
  For a benchmark that ranks many models, list the judges, the models the case text discusses and
  the top of the ranking, and give the total in `sample`.
- `period`: when the work ran, `YYYY`, `YYYY-MM`, a range `A..B` of those, or `unstated`. With
  `models` it fixes the model era.
- `outcome`: `completed`, `partial`, `ongoing`, `abandoned`, as the source claims it; doubts go in
  "What went wrong". A published study or benchmark is `completed`.
- `cost`: what the work cost, with its unit (money, tokens, compute, people's hours), or `unstated`.
- `status`: `current` or `superseded`. A case is a past event: a newer case from another org does
  not make it wrong. Use `superseded` only when the same org publishes a later account of the same
  work (corrected numbers, a new version of the same benchmark); then `superseded_by` names the
  newer case file, both cases have the same `org` (checked), and the newer case's Context links
  back. When the field moves on, say so in the checklist's Evidence lines and keep the older case
  `current`.

Body rules (all checked):

- The first heading equals `title`; a summary of 40 to 150 words follows; the sections above appear
  in that order, none empty. "In their words" is optional.
- "Source": what was read and when; when part of the source was written by a model, which parts,
  and each claim is cited from the part that says it; a notes-only case says so.
- "What was made or studied": the interface, the tasks or the benchmark, and why.
- "Who did what" has the three bullets **AI:**, **Rule-based tools:** (checkers such as axe,
  scripted walks, test runners, browser automation), **People:** (participants, experts, raters,
  the team) (`unstated` is allowed).
- "How it was checked": what the AI's output was compared with, by whom, and how agreement was
  counted.
- "What went wrong" is never empty and always has a **Not reported:** bullet naming what the source
  leaves out (sample sizes, failure rates, cost, who judged). When the source names no failure, say
  "The source reports none." (survivor bias: most sources announce wins).
- "Practices to copy": one line per practice, `- [stated] text ([Section](source link))` or
  `- [ours] text ([Section](source link))`. `[stated]`: the source recommends it or reports it as
  what worked. `[ours]`: we infer it from what the source reports (often from a failure). The link
  goes to the source section it comes from. The text is at most 200 characters, with no number.
- "Numbers": one row per number as the source writes it, with its unit. Basis: `measured` (the
  source says how it counted), `reported` (stated as fact, method not given), `estimate` (the source
  calls it an estimate), `self-estimate` (a team estimating its own effort or savings),
  `vendor-claim` (a seller's claim about its tool). Source: a link to `source_url` or an `also` URL.
  A headline number that rests on a subset (a judge's agreement measured on part of a benchmark)
  says so in "What it counts".
- Every number in the text carries a unit, and every paragraph, list item or table row that holds
  one links to `source_url` or an `also` URL (a `#section` anchor is welcome).
- Quote: at most one per file, 15 words or fewer, as `> "text"` in "In their words", followed by
  `> — Name, role, [YYYY-MM-DD](source link)`, and listed in `NOTICE.md`. A quoted span of more than
  four words anywhere else counts as a quote.
- Relative links (to other cases) must resolve; a link to a file of this repository (an evidence
  file) must resolve to the file and, with an anchor, to one of its headings.

Units: every number needs a `%` or `x` suffix, a currency sign, or a word from `UNITS` in
`scripts/lib.mjs` within the next three words. Years, dates, version numbers after a name
(`GPT 4`, `Gemini 2.5`) and numbers after a label word (`round 2`, `table 3`) are exempt; numbers
written as words are not checked. The full rule is in the comment above `checkUnits` in
`scripts/validate.mjs`. Add a unit to `UNITS` when a case needs one.

Never sum or compare numbers across cases unless the units and the way they were counted match.

Own words, checked (**maintainer only**: it needs the source text):
`node scripts/check-copy.mjs <case> <source text files>` lists every run of 5 or more consecutive
words the case shares with its source, outside "In their words" and the front-matter values of
`models:` and `tools:` (exact names by rule). Run it on each new or changed
case and evidence file.

## Evidence files

A case from the maintainer's own private project cites a public evidence file in this repository,
`evidence/<case file name>`, as its `source_url` (`https://github.com/<owner>/<repo>/blob/main/evidence/<case>.md`).
Rules (checked): only a `maintainer-own` case may have a source in this repository, and then its
`source_type` is `evidence-file`; the evidence file exists and has the case's file name; every
evidence file is the source of a case; the case's links into it resolve to its headings.

The evidence file is our summary, in our own words, of the project's private records: the method,
the counts with their basis (tables before and after where they exist), the events and failures,
what is still open, and dates. It holds no private paths, file names of the private repository,
secrets, URLs to private things, personal data or product content (for studio-go: no channel
names, episode titles or episode content). **Maintainer only:** the private archive keeps a copy of
each record the file was written from, and `check-copy` runs on the evidence file against them. The
owner reads every evidence file before the repository is published.

## Lessons

One page per aspect in `lessons/` (`simulated-users.md`, `model-judges.md`, ...), listed in order
in `LESSON_PAGES` (`scripts/lib.mjs`). The pages are the source of truth; `lessons/index.md`
(counts, "By model", "May be outdated", where cases disagree) and `lessons/evidence.md` are
generated. A page is a `# Title`, a one-paragraph intro (used in the index and `llms.txt`), the
evidence note (the exact sentence in `LESSON_NOTE`), a legend (`LESSON_LEGEND`), the lessons, then
the reference definitions of its links:

```markdown
- **JDG-1** [stated] One line in our own words, at most 200 characters, no number.
  - Depends on model ability: yes. Checked against people: yes. Strength: medium. Era: 2025; newest: Gemini 2.x.  - Cases: [ArtifactsBench: how it was checked][ab-checked], [UW walkthrough: what went wrong][scw-wrong].
  - Against: counter-evidence from other cases with links ([Case][case-wrong]), or "None found."
  - Related view (karpathy-ideas): [idea][k-idea], agrees.
```

Rules (all checked by `node scripts/validate.mjs`; one broken-copy test each):

- IDs: three capital letters, a hyphen and a number; one prefix per page; unique across pages. IDs
  are never reused, so checklist and outside references do not break.
- `[stated]`: a source says it or reports it as what worked or failed; `[ours]`: our inference. A
  `[stated]` lesson cites at least one case section other than "Practices to copy"; when it cites
  only practices, the practice line closest to it (most content words shared, `closestPractices` in
  `scripts/lib.mjs`) must be `[stated]` too, since an `[ours]` practice is our inference. Failing
  that, cite the section the practice comes from, or tag the lesson `[ours]`.
- Sub-items in this order: "Depends on model ability: yes|partly|no. Checked against people:
  yes|partly|checker|model|none. Strength: strong|medium|weak. Era: YYYY[–YYYY]; newest: <model family>.", "Cases:"
  (at least one link), "Against:" (never empty; start it with "Disagree:" for a real split between
  cases, which the index lists; when it gives only a limit of the cases already cited, start it
  "None found;" and state the limit), then optional "Related view (karpathy-ideas):". No "Sceptic:"
  line: what a sceptic pass challenged is kept in the private archive by lesson ID (**maintainer
  only**); the page shows the tag it changed.
- "Depends on model ability" (owner's requirement): `yes` when the lesson states what models or
  agents can or cannot do (a failure mode, what they handle well or badly); `partly` when it is a
  process whose need comes from such a behaviour (a check, a rule, a tool built because agents do
  something); `no` when it holds whatever the model. Lessons about model limits age fast, process
  lessons barely; newer models still fail in old ways, so the cases decide the tag, not assumptions.
- "Checked against people": what told right from wrong in the lesson's evidence. `yes`: people's
  results (users or experts measured); `partly`: people's results for part of the claim, the rest
  from checkers, models or the author's account; `checker`: only deterministic checks (axe, contrast maths, tests, a
  scripted walk), which anyone can rerun; `model`: only model judges or simulated users, which the
  model-judges page questions; `none`: only the author's account (one engineer's judgement, a
  team's stated practice). Authors count as people when they code items to a stated protocol (a
  study's reference list), never when they judge their own work; the maintainer's own use of a
  project is the author's account. Where the claim mixes grounds without people, the tag names the ground
  behind the lesson's main advice. It says where the evidence came from, not where the lesson
  applies; a lesson whose evidence no person confirmed travels less far. The validator checks that
  at least one cited case was checked against that ground (`checked_against`: `people` for `yes` and
  `partly`, `checker` for `checker`, `model` for `model`).
- "Era": the years from the `period` of each case in "Cases" (its `date` when the period is
  `unstated`), as `YYYY` or `YYYY–YYYY` (en dash), then "; newest: " and the newest model family: the
  family (`modelFamily`) of the most recent cited case that names a model (the later of its `date`
  and the end of its `period`), its highest version when it names several (the first listed on a
  tie), `unstated` when no cited case names one (`expectedEra` in `scripts/lib.mjs`; the validator
  prints the expected value). Era is derived, never written freely.
- "May be outdated": `build.mjs` marks, in `lessons/index.md`, `lessons/evidence.md` and
  `llms.txt`, every lesson tagged `yes` whose most recent case in "Cases" is more than 12 months
  (`OUTDATED_MONTHS`) older than the date of the newest `log.md` entry, never today's date, so the
  output never changes by itself (`--today YYYY-MM-DD` is for tests only). The next update's log
  entry and rebuild refresh the mark; re-check each marked lesson against newer cases then.
- "Strength" is capped by the cases in "Cases" (`strengthCeiling` in `scripts/lib.mjs`): `strong`
  needs two or more cases, or one whose `evidence` is `shown-in-source` or `independent-data`, and at
  least one case whose `author_relation` is not `seller-of-tool`; `medium` needs two or more cases,
  or one that shows its data; any other lesson is `weak`. A `maintainer-own` case never counts toward
  the cap (it is not independent evidence), so a lesson resting on it alone is `weak`. A notes-only
  case (the site's terms forbid storing its text) counts like any other. Below the cap,
  grade by how well the cases support the lesson; recount as cases arrive. The legend on every page
  states this rule.
- Links in "Cases" and "Against" go to a case section, `../cases/<file>.md#<section>`, and must
  resolve to the file and a `##` section in it. Their text is the case's `label`, then a colon and
  the section in words: `[UW walkthrough: what went wrong]`. A lesson never links a source directly: the case is
  the checked summary. Lessons cite cases, never each other.
- "Related view" links one idea file under
  `https://github.com/ntroccoli/karpathy-ideas/blob/main/ideas/` and ends with `, agrees.` or
  `, contradicts: why.`; it copies nothing from that project, and only where the match is clear.
- Every number carries a unit (the Era is exempt); no quoted span over four words; every relative
  link resolves; a page stays at or under 20 KB (20,480 bytes).
- Every case is cited by at least one lesson or checklist question.

**Maintainer only:** each lesson was checked against the source lines it rests on, which the private
archive keeps by lesson ID. A new or changed lesson updates them, and `check-copy` runs on every
changed lesson page against all the source texts.

Upkeep: a new case comes with its lesson edits (new lessons, new citations, new "Against" lines,
strength changes), and the build is rerun. A sceptic pass from time to time challenges
"Checked against people" tags other than `yes`, `no` model-ability tags on lessons about agent behaviour, `[stated]`
tags and "None found" lines against the cases they cite, and checks that the case which lifts a
lesson to `strong` really supports it; its notes go to the private archive.

## Checklist

`checklist.md` comes after the first ten cases. Until it exists, the validator skips its rules and
says so; once it exists, every rule below applies (tested both ways).

Only what an agent can measure on a project: accessibility violations (an automated checker),
contrast pairs below the target, screens and clicks per job (a scripted walk), component and token
consistency counts, and before/after counts that may not rise. No question asks for a judgement of
taste. The questions guide; they impose nothing on a project, whose owner decides what applies. 5 to
12 questions; merge before adding. Each question has, in this order: a "Check:" an agent can run on
a project; an "Evidence:" line saying briefly, in our words, what the cases show, naming each case
by its reference link; "Ask:" (questions for the project); "Trade-offs:" (what it costs and when not
to apply it); a "Provenance:" line per threshold or rule; and a "Lessons:" line citing the lesson
IDs behind it (`Lessons: JDG-1, SIM-2`); detail lives in the lessons. Our own inferences are
allowed and marked "(ours)". One measurement per Check; examples, report skeletons and the record
live in [applying-lessons.md](applying-lessons.md).

Provenance (owner, 2026-11-15, after an unmeasured size limit spread from one project's test into
published checklists): a Check that holds a threshold (a number other than a question reference) or
a cut, cap or forbid word (`RULE_WORDS` in `scripts/lib.mjs`) needs a line
`Provenance: <the rule> — <level> (<source>). Prevents: <what>. Applied blindly: <how it fails>.`,
where the level is one of `published case` (link the case), `others' measurement`,
`standard or vendor guidance` (name it), `our single case` (studio-go: say so) or `our guess`
(checked, with broken-copy tests). Thresholds in the measuring notes and the report format carry
the same in prose. Before a release, each item that tells an agent to cut, cap, remove or forbid
gets a behaviour check (below).

`checklist.md` stays at or under 20 KB (20,480 bytes; agents read it whole; keep it near 17 KB so a
sweep has room; both numbers are guesses, see "Limits and where they come from") and has a
"## Report format" section that links the formats. Cases, where named, are named by their
`label` and cited by reference links defined once at the end of the file (`[UW walkthrough][]`). The validator checks the count, the size,
"Check:", "Evidence:", provenance, that each question cites lesson IDs that exist, case links and
the report format. **Maintainer only:** run `check-copy` on `checklist.md` against all the source texts after
changing it.

## Update log

`log.md`, newest entry first, prose for the why. `build.mjs` writes `changes/<date>-<title>.md` for
each entry: the lesson IDs and checklist questions it added, changed or removed since the previous
entry, and the fingerprints of the state after it. Only the newest entry's file is rebuilt (from the
previous file's fingerprints); older ones are frozen and must exist. So open a new log entry (its
heading first) before changing lessons for an update, or the changes land in the previous entry.
Every entry but the oldest has a `### Checklist and lessons impact` part with
`- **New lessons:**` and `- **Changed lessons:**` lines (lesson IDs, or "none"; "every lesson"
covers all changed ones) and a `- **Checklist:**` line naming changed questions by number. The
validator fails when the part misses an ID or question its changes file lists, and when its
lesson lines name an ID the changes file does not list (as new or changed, or gone). A revisit reads the
changes files newer than its record's entry, never the whole log; it names entries by date and
title, since two can share a date. Sweeps may run often; a release is tagged once a month,
`YYYY.MM`.

## Generated files

`node scripts/build.mjs` writes `index.md` (one line per case, newest first, and what the cases
cover by type, by what AI did and by what it was checked against), `lessons/index.md` (a short table
of contents for people: aspect pages with counts, "May be outdated", "By model", where cases
disagree; no list of every lesson), `lessons/evidence.md` (one line per lesson: tag, the lesson,
model-ability, people and strength tags, the "may be outdated" mark, the cases it cites by label,
"(own)" after a maintainer-own case, and those its "Against" cites), `llms.txt` (entry point for agents: the
no-warranty line right after the summary (owner, 2026-11-15; a test checks it), "Review a project" (the steps
README's step 1 prompts send the agent to: download the files and read them from disk, find the route's record, a
first review without one and a revisit with one, a "Path:" line naming which and why, and step 2's "Apply"; one prompt
for both, owner 2026-11-15; a test checks it), how to use, one line per lesson page, and one line pointing to `index.md` for the cases) and
`llms-full.txt` (the single opt-in file with everything: every lesson and case line, and the
checklist once it exists). It also keeps hand-written files in step: every URL to this repository
comes from `REPO_SLUGS` in `scripts/lib.mjs` (to rename the repository, put the new owner/name first
in that line and rebuild; the build rewrites the old name in `SYNCED` files, `lychee.toml`
included), and two blocks in `README.md` (the AI disclosure and the current counts) are written
between their comment markers. `llms-full.txt` carries each reference definition once. "By model"
in `lessons/index.md` groups the cases' `models` into families with `modelFamily` (`scripts/lib.mjs`;
add a rule there for a new maker) and lists the lessons tagged `yes` or `partly` whose cited cases
name each family, grouped by the roles the family's models played in those cases (from `models`;
for a case that names no model, its `ai_role`), so a model only tested as a builder is not read as
evidence about judges.

The disclosure (owner, 2026-11-14) is computed from the front matter and written into `README.md`
and `llms.txt` between `<!-- disclosure: generated by scripts/build.mjs -->` and
`<!-- /disclosure -->`, and into `llms-full.txt`: Claude, an Anthropic model, drafts the cases and
lessons and the maintainer reviews them; how many cases involve Claude models or Claude Code (in
`models` or `tools`), and which; every case whose `org` or `subject` names Anthropic; and the
maintainer's own cases, which are never independent evidence. A test proves an Anthropic case is
named.

Reading cost drives this layout: what an agent reads at the start is paid on every run. One agent
route: `llms.txt`, then `lessons/evidence.md`, then an aspect page only for the lessons used;
`index.md` only to choose cases. `llms.txt` lists no cases, so it does not grow with each case, and
stays at or under 20 KB (20,480 bytes, `LLMS_MAX_BYTES`, checked by the validator). Only
`lessons/evidence.md` and `llms-full.txt` list every lesson; keep it so (a test checks the index and
`llms.txt`). `lessons/index.md` stays at or under 12 KB (12,288 bytes, `INDEX_MAX_BYTES`, checked by
the validator): model families with the same lessons share a "By model" row, and "Where the cases
disagree" lists IDs per page. `node scripts/build.mjs --check` writes nothing and exits 1 when any of
them is out of date; it must exit 0 before a commit. Never edit these files by hand: change the
sources and rebuild.

## One line per case

`index.md` (and `llms-full.txt`) list each case on one line, so an agent can pick cases without
opening them; `llms.txt` points to `index.md` instead of repeating the lines. The line is built from
the front matter only:

```markdown
- **<label>**: [<title>](cases/<file>) — <case_type>: <subject>; AI: <ai_role>; measured: <measures>; checked against: <checked_against>; sample: <sample>; evidence: <evidence>; author: <author_relation>; cost: <cost>. <summary>
```

## Corrections

`corrections.md` (hand-written, linked from `llms.txt`, README and the revisit) lists what this
collection published wrong, newest first. It always exists, even with no entry, because every
revisit reads it first. An entry is `## YYYY-MM-DD — title` with five bullets in this order
(checked, with a broken-copy test): **Wrong:** (what, and how it was found), **Published:**
(between which releases, commits or dates), **Recognise it:** (what it leaves in a project's
record, baselines, tests or files), **Find what it changed:** (where to look and what to compare),
**Propose to the owner:** (the repair, never applied without the owner's yes). The project's record
names the entries it checked. An item a behaviour check finds harmful after it was released gets
an entry.

## Limits and where they come from

Every number this repository enforces on itself, with its source and evidence level, what it
prevents and how it fails when applied blindly. Most are guesses from our sibling projects
(ai-migrations, karpathy-ideas); none was measured. They suit this repository's own files; a reader
must not copy them as advice for another project.

| Limit | Source and level | Prevents | Fails when applied blindly |
| --- | --- | --- | --- |
| `AGENTS.md` at or under 8 KB (`AGENTS_MAX_BYTES`) | our guess: the karpathy-ideas coordinator's tip of 2026-11-14, resting on its own checklist's start-file sizes, which were never measured | every session paying to read rules it does not need | rules every session needs get cut to fit; the 2026-11-15 cut from 26.6 to 5.8 KB was compared with the template: nothing a session needs at start was lost, four writing rules were missing here and are restored |
| `checklist.md` at or under 20 KB, kept near 17 KB (`CHECKLIST_MAX_BYTES`) | our guess: ai-migrations' cap (2026-11-13) and its tip to trim to about 17 KB | a checklist too long to read whole on every run; growth by appending | questions merged or guidance cut to make room; a sweep trims a Check's caveat |
| `llms.txt` at or under 20 KB (`LLMS_MAX_BYTES`) | our guess: ai-migrations' reading budget (2026-11-14) | the entry file growing with every case | how-to-use lines dropped to fit; the fix used was moving the case list out |
| `lessons/index.md` at or under 12 KB (`INDEX_MAX_BYTES`) | our guess: ai-migrations (2026-11-14); the same figure as the unmeasured start-file limit that spread between projects | a table of contents for people that grows without bound | "By model" rows folded until a family's lessons are hard to find |
| a lesson page at or under 20 KB (`LESSON_MAX_BYTES`) | our guess: the ai-migrations template | a page an agent cannot read whole | lessons trimmed instead of the page split (the validator says split) |
| strength cap (`strengthCeiling`) | our guess at a rule, from the ai-migrations template; not tested against outcomes | one seller's or one anecdote's lesson called strong | it counts cases, not their quality: two thin cases outrank one careful study |
| "may be outdated" after 12 months (`OUTDATED_MONTHS`) | our guess: ai-migrations (2026-11-14) | model-ability lessons read as current long after models changed | a lesson that still holds gets doubted at 13 months; one about a retired model passes at 11 |
| text lengths: `label` 32 characters, `summary` 160 characters, lesson and practice lines 200 characters, case summary 40 to 150 words | our guesses, from the ai-migrations template | lines too long for one-line lists and indexes | a claim's limit or unit dropped to fit the length |
| one quote per file, 15 words or fewer; a quoted span over four words counts as a quote | our guess at a copyright caution, from ai-migrations; not legal advice | copying a source's words | none known beyond paraphrase that drifts from the source; the copy check guards that |
| `check-copy`: runs of 5 or more words shared with the source | our guess, from ai-migrations | close paraphrase passing as our own words | flags names and stock phrases; reworded by hand |
| 5 to 12 checklist questions | our guess, from ai-migrations | a checklist that grows past what a run can answer | a needed question merged into another until neither reads clearly |
| a unit within three words of a number | a parser heuristic of ours | numbers without units | a unit further away fails the check; reword or add the unit to `UNITS` |

## Behaviour checks

Before a release, each checklist item that tells an agent to cut, cap, remove or forbid is applied
by a fresh agent to a small prepared project, and the result is checked for the intended effect and
for the named harm (for a cap or a "may not rise" rule: was anything that changes behaviour or
serves a job removed to make the number hold?). The samples, prompts and results are kept in the
maintainer's private archive. The first round (2026-11-15) checked five items: the job default of
question 1 left five of fifteen jobs out of the baseline, the template note of question 3 made the
agent report no failure, and the look rule deferred two contrast failures; all three were reworded,
re-run without the harm, and listed in `corrections.md`. The "may not rise" rule of question 10
removed nothing (the agent raised the baseline itself and asked the owner), and the fold rule of
question 6 removed nothing (the agent asked about controls no job used). One run per item: a
sample, not proof.

A second round (2026-11-15, for the one review prompt) gave a fresh agent the README's prompts on
small git projects, with the public files served from a local copy, and a separate model judge
read each answer and every file change: a first review, a revisit whose record carries the job-list
damage of the first correction, a revisit with no damage, a revisit with skipped items and owner's
choices, step 2 with a check seeded to fail, and an old revisit prompt; three runs each. Two
wordings were changed and run again: an agent chained the three proposals in one command and
applied the third before the second's failure showed (step 4 of "Apply" now forbids it), and an
agent holding only the earlier report applied everything on the main branch without a record (every
report now ends with a "Next step" section linking to "Apply"). Every check then passed three runs
of three.

A third round (2026-11-15, the reopen rule) re-ran the revisit checks after the rule on reworded
questions: a new sample holds three skipped items whose questions were reworded, one only in
wording, one with a clause its old measuring note already asked, and one (in a made-up later entry
served from a local copy) whose Check now measures the item differently. In the first wording two
runs of six reopened the second item; the rule then gained "compare the Check and its measuring
note" and "a rule on how to carry out the proposal keeps it closed". On the final wording each of
five checks passed three runs of three, and the sample's three items were judged as intended.

A fourth round (2026-11-15, question 11) gave a fresh agent an owner's note to delete an old page,
with question 11 and its measuring note, on a small app whose new page lacks two functions nobody
had put to the owner and one the owner had dropped in a recorded decision. In three runs of three
the agent listed every line, kept the old page and asked about the two functions, deleted only what
the owner's decision covered, and sent no kept or moved line to the owner. The question was then
reworded (list inside each page, not only by route; a replacement that shows less is removed for
what it drops), the sample gained a photo gallery replaced by one cover photo, and three new runs
of three also asked about the dropped photos and nothing kept or moved.
