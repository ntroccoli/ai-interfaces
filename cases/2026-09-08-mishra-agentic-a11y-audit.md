---
title: One browser agent per WCAG criterion finds more audit-reported barriers than axe-core or a single-pass model, and more unlisted ones
label: Agentic audit
date: 2026-09-08
org: University of British Columbia and ETRI
summary: Per-criterion agents found 67 of 78 barriers in expert audits (axe-core 28) at 56% precision; their lead was largest on keyboard failures.
source_url: https://arxiv.org/abs/2609.09379
also: [https://arxiv.org/html/2609.09379v2]
source_type: paper
author_relation: independent
evidence: shown-in-source
case_type: benchmark
ai_role: [check]
subject: saved copies of 24 pages from eleven scholarly publishing platforms, audited against 40 WCAG success criteria
sample: 250 page-criterion pairs (78 reported failures, 172 pairs inferred to pass) on 24 pages; 40 criteria, 15 criteria with a reported failure; 9 compared runs in the main table, 4 later worker runs, 6 further batch model runs
measures: [accessibility, issue-coverage, cost]
checked_against: [people]
cost: USD 6.38 to USD 74.52 per 250-pair workload, estimates (API-equivalent for the coding agents); the reference worker run has no usage record
tools: [axe-core, headless Chromium, MCP tool server with 31 browser operations, SingleFile, Claude Code, Codex]
models: [GPT-5.5 (check), Claude Sonnet 5 (check), Gemini 3.1 Pro (check), Claude Opus 5 (check), Gemini 3.5 Flash (check), Kimi K2.6 (check), Gemma 4 (31B) (check), GLM-5.2 (check), Qwen3.5 (397B) (check)]
period: 2026-06..2026-09
outcome: completed
status: current
superseded_by:
---

# One browser agent per WCAG criterion finds more audit-reported barriers than axe-core or a single-pass model, and more unlisted ones

Researchers at the University of British Columbia and ETRI wrote 40 agents, one per WCAG success
criterion, each with its own instructions and browser tools, and scored them on 250 page-criterion
pairs labelled from professional audits
([paper](https://arxiv.org/html/2609.09379v2#S1)). The agents caught 67 of the 78 reported
failures (86% recall) against 28 failures for axe-core and 52 failures for a vision-language model making three calls per page, but at 56% precision: 53 of their findings hit pairs the audits did not list
([Table 3](https://arxiv.org/html/2609.09379v2#S6.T3)). The lead was largest on keyboard
failures: 9 of 10 failures, where axe-core and that model without hints found none
([criteria](https://arxiv.org/html/2609.09379v2#S6.SS2)). Only 15 of the 40 criteria had any
reported failure, so recall is unknown for the remaining 25 criteria
([coverage](https://arxiv.org/html/2609.09379v2#S3.SS3)), and the later agent runs were estimated at USD 36.65 to
USD 64.90 per workload; the reference run has no usage record ([costs](https://arxiv.org/html/2609.09379v2#S6.SS4)).

## Source

A preprint by three University of British Columbia authors (Arjun Mishra, Pranav Karthik, Dongwook
Yoon) and Byungjun Bae of ETRI (Daejeon, Korea), first posted to arXiv
on 2026-09-08; this case was written from version 2 (2026-09-10), whose arXiv note says the title,
abstract, conclusion and wording changed and the methods, the building of the dataset and the
reading of the results were made clearer, read in HTML on 2026-11-14
([paper](https://arxiv.org/abs/2609.09379)). Licence: CC BY 4.0. The paper names no product the authors sell;
they compare commercial and open models from several makers. The paper shows its confusion tables,
per-criterion counts and cost table; its ancillary files (row-level scores, prompts, worker
instructions, tool source) were not read for this case. OpenAI Codex helped write the reanalysis
scripts and figure code, which work on archived predictions and ask no model for new judgements
([metrics](https://arxiv.org/html/2609.09379v2#S5.SS3)).

## What was made or studied

Whether an agent that takes one WCAG criterion at a time, inspects a rendered page and operates it
(keys, pointer, screenshots, contrast measures, axe runs) finds accessibility failures that rule
engines and one-shot model calls miss ([framework](https://arxiv.org/html/2609.09379v2#S3)). The
40 workers cover 39 of 50 criteria at Level A and AA of WCAG 2.1, plus one WCAG 2.2 criterion
(Dragging Movements); the eleven 2.1 criteria left out include Focus Visible and Status Messages
([coverage](https://arxiv.org/html/2609.09379v2#S3.SS3)). The test set comes from audit reports
the Library Accessibility Alliance commissioned for scholarly platforms: a pair is positive when a
report lists a finding for that page and criterion, negative when it does not; the authors took
every positive plus five sampled negative pairs for each criterion, then dropped one platform whose site had
changed, leaving 250 pairs on 24 pages saved as single HTML files
([labels](https://arxiv.org/html/2609.09379v2#S4.SS1)).

## Who did what

- **AI:** the worker agents, whose reference run the archive attributes to GPT-5.5, plus September
  2026 runs with GPT-5.5 twice, Claude Sonnet 5 and Gemini 3.1 Pro; each worker reads its
  criterion's instruction file, picks tools in a loop whose current default cap is 30 steps, and returns true, false
  or error with a summary and an impact label ([configurations](https://arxiv.org/html/2609.09379v2#S5.SS2),
  [loop](https://arxiv.org/html/2609.09379v2#S3.SS2)). Comparison setups: a batch vision-language
  model making three calls per page over a screenshot and the accessibility tree, with and without
  hint counts (GPT, per Figure 5), six other batch models, a per-criterion model call that may
  decline to decide (its model is not named), and two coding agents, Claude Code (recording Claude
  Opus 5) and Codex (recording GPT-5.5), each given a short audit request and one listing the
  criteria ([conditions](https://arxiv.org/html/2609.09379v2#S5),
  [Figure 5](https://arxiv.org/html/2609.09379v2#S6.F5)). Codex also helped write the analysis
  scripts ([metrics](https://arxiv.org/html/2609.09379v2#S5.SS3)).
- **Rule-based tools:** axe-core with the WCAG 2 and 2.1 A/AA tags as a baseline, and inside the
  workers; headless Chromium; an MCP server exposing 31 registered browser operations, among them a widget probe
  that tabs through controls and records focus; SingleFile captures at a 1280 by 720 pixel viewport; hint
  counts from the authors' own preprocessing rules; the scoring scripts
  ([tools](https://arxiv.org/html/2609.09379v2#S3.SS2), [captures](https://arxiv.org/html/2609.09379v2#S4.SS2)).
- **People:** auditors at Deque and at Accessiblu wrote the reports the labels come
  from; some Deque findings were found with axe alone or with axe and manual review
  ([labels](https://arxiv.org/html/2609.09379v2#S4.SS1)). The authors wrote the 40 instruction
  files and revised them after watching runs, built the dataset, and jointly reviewed the workers'
  findings on unlisted pairs, 27 findings of which carry candidate flags, from the workers' generated reports,
  screenshots and logs, without opening the saved pages
  ([authoring](https://arxiv.org/html/2609.09379v2#S3.SS3),
  [failures](https://arxiv.org/html/2609.09379v2#S7)). No auditor was run as a comparison and no
  human review time was measured ([conditions](https://arxiv.org/html/2609.09379v2#S5.SS2)).

## How it was checked

Each setup's verdict per page-criterion pair was scored against the report-derived label with
micro-averaged precision, recall and F1; a declined or failed pair counts as a miss in recall and
is shown apart in the confusion tables ([metrics](https://arxiv.org/html/2609.09379v2#S5.SS3)). A
pair scores as found when both say the criterion fails, even if the agent points at another
element than the auditor ([worked example](https://arxiv.org/html/2609.09379v2#S3.SS4)). The
authors re-scored the same predictions on narrower sets: without pages touched during development, without
axe-sourced findings, without pairs needing behaviour the saved page cannot show, per vendor, and
leaving out each platform in turn; rows share pages and platforms, so these are descriptive, with no
significance tests ([sensitivity](https://arxiv.org/html/2609.09379v2#S6.SS5), [results](https://arxiv.org/html/2609.09379v2#S6.SS1)).
Costs are paired with the accuracy of the same run
([costs](https://arxiv.org/html/2609.09379v2#S6.SS4)).

## Numbers

| Number | What it counts | Basis | Source |
| --- | --- | --- | --- |
| 40 workers | criterion agents built: 39 criteria of WCAG version 2.1 at Level A and AA, one criterion of WCAG version 2.2 | reported | [coverage](https://arxiv.org/html/2609.09379v2#S3.SS3) |
| 15 of 40 criteria | criteria with at least one reported failure in the test set | measured | [coverage](https://arxiv.org/html/2609.09379v2#S3.SS3) |
| 250 pairs, 78 and 172 pairs | page-criterion pairs; reported failures; inferred passes | measured | [labels](https://arxiv.org/html/2609.09379v2#S4.SS1) |
| 24 pages on 11 platforms | saved pages and the scholarly platforms they come from | reported | [labels](https://arxiv.org/html/2609.09379v2#S4.SS1) |
| 0.90 and 0.36 score | precision and recall of axe-core, which found 28 of 78 failures | measured | [Table 3](https://arxiv.org/html/2609.09379v2#S6.T3) |
| 0.61 and 0.67 score | precision and recall of the batch model without hints, which found 52 failures | measured | [Table 3](https://arxiv.org/html/2609.09379v2#S6.T3) |
| 0.64 and 0.74 score | precision and recall of the batch model with hints, which found 58 failures | measured | [Table 3](https://arxiv.org/html/2609.09379v2#S6.T3) |
| 0.62 and 0.59 score | precision and recall of the per-criterion call, which declined 92 pairs | measured | [Table 3](https://arxiv.org/html/2609.09379v2#S6.T3) |
| 0.56 and 0.86 score | precision and recall of the reference worker run: 67 failures found, 53 findings on unlisted pairs | measured | [Table 3](https://arxiv.org/html/2609.09379v2#S6.T3) |
| 0.60 to 0.77 score | Claude Code recall, short request then criteria listed | measured | [Table 3](https://arxiv.org/html/2609.09379v2#S6.T3) |
| 0.32 to 0.54 score | Codex recall, short request then criteria listed | measured | [Table 3](https://arxiv.org/html/2609.09379v2#S6.T3) |
| 7 of 8, 2 of 2 failures | failures the workers found under Keyboard, then under No Keyboard Trap; the batch model without hints found none | measured | [Table 4](https://arxiv.org/html/2609.09379v2#S6.T4) |
| 0.47 to 0.77 score | recall of seven batch model setups; none found either keyboard trap | measured | [Table 5](https://arxiv.org/html/2609.09379v2#S6.T5) |
| 60 to 69 of 78 failures | found by workers in the September runs: 60 failures on Gemini 3.1 Pro, 62 failures on Claude Sonnet 5, 66 failures on GPT-5.5, 69 failures on its repeat | measured | [models](https://arxiv.org/html/2609.09379v2#S6.SS3) |
| 241 of 250 pairs (96.4%) | verdicts the two GPT-5.5 worker passes agreed on | measured | [models](https://arxiv.org/html/2609.09379v2#S6.SS3) |
| 92 of 250 pairs (36.8%) | pairs the per-criterion call declined, among them 27 reported failures | measured | [abstention](https://arxiv.org/html/2609.09379v2#S6.SS2) |
| $6.38, $7.29, $14.98 | per 250-pair workload: batch without hints, batch with hints, per-criterion call | estimate | [Table 6](https://arxiv.org/html/2609.09379v2#S6.T6) |
| USD 36.65 to USD 64.90 | worker runs per workload (Gemini 3.1 Pro lowest, GPT-5.5 repeat highest) | estimate | [Table 6](https://arxiv.org/html/2609.09379v2#S6.T6) |
| $32.76 up to $74.52 | coding agent runs per workload, API-equivalent under subscriptions | estimate | [Table 6](https://arxiv.org/html/2609.09379v2#S6.T6) |
| 78.0 seconds | summed processing per timed pair, first September GPT-5.5 worker run | measured | [costs](https://arxiv.org/html/2609.09379v2#S6.SS4) |
| 74 of 78 failures, 63 findings | union of worker and batch-without-hints findings: reported failures found, findings on unlisted pairs | measured | [combining](https://arxiv.org/html/2609.09379v2#S6.SS5) |
| 27 of 250 pairs, 19 of 24 pages | pairs and pages touched by development datasets | measured | [exposure](https://arxiv.org/html/2609.09379v2#S4.SS3) |
| 14 of 15 failures | found by workers on the 55 pairs of pages outside the development datasets (axe 6 failures) | measured | [sensitivity](https://arxiv.org/html/2609.09379v2#S6.SS5) |
| 27 of 53 findings | worker findings on unlisted pairs that carry candidate flags (possibly real, not adjudicated) | measured | [failures](https://arxiv.org/html/2609.09379v2#S7) |
| 0.78 and 0.90 score | worker precision and recall if all the candidate findings were real (not adjudicated) | estimate | [failures](https://arxiv.org/html/2609.09379v2#S7) |

## What worked

- Workers found 86% of the reported failures, axe-core 36% and the batch model without hints 67%;
  the order held per vendor (worker recall 0.82 and 0.89 score), without axe-sourced findings (0.88
  score against 0.28 score for axe) and with each platform left out (worker recall 0.84 to 0.90 score,
  axe 0.33 to 0.37 score; ranges, not significance tests)
  ([Table 3](https://arxiv.org/html/2609.09379v2#S6.T3),
  [sensitivity](https://arxiv.org/html/2609.09379v2#S6.SS5)).
- Workers led on keyboard criteria, with interaction, instructions and tools changed together: they
  found 7 of 8 Keyboard failures, and both failures under No Keyboard Trap; no batch model setup
  found either trap, and its Keyboard finds ranged from 0 to 4 of 8 failures. On Focus Order the
  batch model without hints still found 4 of 7 failures, the workers 6 failures ([criteria](https://arxiv.org/html/2609.09379v2#S6.SS2),
  [models](https://arxiv.org/html/2609.09379v2#S6.SS3)).
- On the 55 pairs whose pages appear in none of the development datasets, the workers found 14 of
  15 failures
  ([sensitivity](https://arxiv.org/html/2609.09379v2#S6.SS5)).
- Workers on three model makers' models found 60 to 69 of 78 failures, and two GPT-5.5 passes
  agreed on 96.4% of verdicts ([models](https://arxiv.org/html/2609.09379v2#S6.SS3)).
- Listing the criteria in the request raised recall for both coding agents, from 0.60 to 0.77
  score for Claude Code and 0.32 to 0.54 score for Codex
  ([results](https://arxiv.org/html/2609.09379v2#S6.SS1)).
- A cheap setup scored a slightly higher F1 than the workers, 0.69 score against 0.68 score: the batch
  model with hints reached 0.74 score recall and 0.64 score precision for USD 7.29 per workload
  ([Table 6](https://arxiv.org/html/2609.09379v2#S6.T6), [results](https://arxiv.org/html/2609.09379v2#S6.SS1)).
- Each run keeps every tool call, argument and observation, so a reviewer could check what a verdict
  rests on (not tested with reviewers); in the worked example the worker went on looking after axe
  returned nothing and flagged images with empty alt text it judged informative, a reading the paper
  did not validate ([worked example](https://arxiv.org/html/2609.09379v2#S3.SS4),
  [review](https://arxiv.org/html/2609.09379v2#S8.SS4)).

## What went wrong

- More findings the audits did not list: 53 of the workers' 120 positive findings fell on pairs the
  reports left out (precision 0.56 score against 0.90 score for axe), and listing criteria for
  the coding agents raised their unlisted findings too ([Table 3](https://arxiv.org/html/2609.09379v2#S6.T3)).
- Whether those findings are real is open: 27 findings carry candidate flags, reviewed jointly by the
  authors from the workers' generated reports, screenshots and logs, without opening the pages,
  without independent adjudication and with no agreement between reviewers reported; the 0.78 score precision if all were real is a
  what-if, not a result ([failures](https://arxiv.org/html/2609.09379v2#S7)).
- Recall is measured on 15 criteria only: 25 criteria, the WCAG 2.2 one among them, had no reported
  failure, two criteria hold 34 of the 78 failures, and several have a single case
  ([coverage](https://arxiv.org/html/2609.09379v2#S3.SS3),
  [criteria](https://arxiv.org/html/2609.09379v2#S6.SS2)).
- Browser tools did not help everywhere: on Non-text Content the single per-criterion call found 7 of 8
  failures and the workers 6 failures; on Contrast (Minimum) the batch model without hints found 4 of 5 failures and the workers 3 failures;
  the workers missed the single Label in Name failure that the GPT batch and per-criterion calls caught, and
  none of the five setups in Table 4 found the single Use of Color case; on Info and Relationships the
  batch model with hints found 17 of 17 failures, the workers 14 failures
  ([Table 4](https://arxiv.org/html/2609.09379v2#S6.T4)).
- On the pairs the per-criterion call answered, the workers found 42 failures, the same as the batch
  model without hints and fewer than the 45 failures of the batch model with hints
  ([abstention](https://arxiv.org/html/2609.09379v2#S6.SS2)).
- A radio button keeping focus when selected was read as a keyboard trap; the authors call that
  reading erroneous, and note that the repeated-focus summary from the widget probe only marks a candidate; the scored
  predictions are kept, and the paper does not say whether the two counted trap finds rest on valid
  traces ([failures](https://arxiv.org/html/2609.09379v2#S7),
  [review](https://arxiv.org/html/2609.09379v2#S8.SS4)).
- No held-out set: the datasets used to check worker and tool changes during development touched
  27 pairs on 19 pages of 24 pages, shared changes can reach the rest, and the subset without those
  pages is 55 pairs with 15 failures ([exposure](https://arxiv.org/html/2609.09379v2#S4.SS3)).
- Labels are weaker than an audit of each pair: a pass means only that the report lists nothing,
  reports are time-bounded and name some barriers, saved pages may differ from the audited service,
  and 11 of the 250 pairs rest on findings made with axe, the same engine as the baseline; the
  sample was enriched with failures, so precision is agreement with this sample, not a share of
  correct findings in use ([labels](https://arxiv.org/html/2609.09379v2#S4.SS1),
  [benchmark limits](https://arxiv.org/html/2609.09379v2#S8.SS2),
  [Table 7](https://arxiv.org/html/2609.09379v2#S6.T7)).
- Scoring is per criterion, not per issue: a pair counts as found when the agent names a different
  element or reason than the auditor ([worked example](https://arxiv.org/html/2609.09379v2#S3.SS4)).
- The per-criterion call declined 36.8% of pairs, every No Keyboard Trap pair among them; its 0.90
  score recall on the pairs it answered hides 27 declined failures, and it cost about twice the
  batch call with hints ([abstention](https://arxiv.org/html/2609.09379v2#S6.SS2),
  [costs](https://arxiv.org/html/2609.09379v2#S6.SS4)).
- Agents cost more: USD 36.65 to USD 64.90 per worker workload and up to USD 74.52 for a coding
  agent, against USD 6.38 to USD 14.98 for the single calls; the reference worker run has no usage
  record, the figures are estimates, and no human review cost was measured
  ([costs](https://arxiv.org/html/2609.09379v2#S6.SS4)).
- The axe-core baseline is one configured run, not what rule engines can do in general
  ([rule-based testing](https://arxiv.org/html/2609.09379v2#S2.SS2),
  [baselines](https://arxiv.org/html/2609.09379v2#S5.SS1)).
- Setups differ in tools, instructions and models at once, so no gain is tied to browser
  interaction alone; the coding agents keep their built-in system prompts and ran in an isolated environment narrower
  than a normal developer session, whose short request may not match what developers ask; a tool list given to
  a worker is not enforced, since the runtime can call other tools
  ([conditions](https://arxiv.org/html/2609.09379v2#S5.SS2),
  [tools](https://arxiv.org/html/2609.09379v2#S3.SS2), [limits](https://arxiv.org/html/2609.09379v2#S9)).
- A summary spreadsheet held axe verdicts that differed from the axe run output on 12 of 250 pairs;
  the authors scored from the run output ([baselines](https://arxiv.org/html/2609.09379v2#S5.SS1)).
- One platform was dropped because its site had changed before capture, removing 44 pairs
  ([labels](https://arxiv.org/html/2609.09379v2#S4.SS1)).
- Limits the authors state: scholarly pages only, saved pages without logins, live network state,
  or flows across pages, repeatability from two passes of one setup, and no study with auditors or with
  people who need the access features ([limits](https://arxiv.org/html/2609.09379v2#S9)).
- **Not reported:** the model behind the per-criterion call; usage and cost of the reference worker
  run; dated model versions and settings; time spent writing each instruction file (not measured); unlisted
  findings per criterion for the workers; how often workers called tools outside their list; how the
  candidate findings split by criterion; agreement between the two audit vendors on shared criteria.

## Practices to copy

- [stated] Give each accessibility criterion its own agent instructions: what to inspect, its exceptions, and which tool to call first. ([Framework](https://arxiv.org/html/2609.09379v2#S3.SS1))
- [ours] For keyboard criteria, let the agent press keys and record focus; the browser agents alone matched the traps, though tools and instructions also differed. ([Criteria](https://arxiv.org/html/2609.09379v2#S6.SS2))
- [stated] Log every tool call, its arguments and what came back, so a reviewer checks the observation, not the explanation. ([Evidence](https://arxiv.org/html/2609.09379v2#S3.SS4))
- [stated] Count declined items as misses and keep them as open work; recall on answered items alone looks better than it is. ([Abstention](https://arxiv.org/html/2609.09379v2#S8.SS1))
- [stated] Keep a checker's unlisted findings as candidates for a person to settle; never fold them into the reference labels. ([Benchmark limits](https://arxiv.org/html/2609.09379v2#S8.SS2))
- [stated] Set test pages apart before development starts; dropping touched pages afterwards is only a check, since shared changes reach the rest. ([Limits](https://arxiv.org/html/2609.09379v2#S9))
- [ours] Read per-criterion recall beside its count of known failures; a criterion with one case says little. ([Criteria](https://arxiv.org/html/2609.09379v2#S6.SS2))
- [stated] Expect a request that lists the criteria to raise both found failures and unlisted findings; measure both. ([Results](https://arxiv.org/html/2609.09379v2#S6.SS1))

## Context

- Model era: GPT-5.5, Claude Sonnet 5, Claude Opus 5 and Gemini 3.1 Pro, runs from June to
  September 2026 ([worked example](https://arxiv.org/html/2609.09379v2#S3.SS4),
  [configurations](https://arxiv.org/html/2609.09379v2#S5.SS2)).
- The authors propose, without testing it, a tiered audit: rule checks first, model review where
  meaning matters, browser operations for what stays open; they warn that the stages are not
  independent votes, since workers call axe and hinted models get rule counts
  ([allocation](https://arxiv.org/html/2609.09379v2#S8.SS3)).
- Related systems: GenA11y and the keyboard-testing work behind BAGEL, which the paper builds on, and
  AccessGuru, TaskAudit, ScreenAudit and AXNav; it cites a 2026 preprint that found repeated model
  repair calls raised cost without better fixes in its tested setting ([related work](https://arxiv.org/html/2609.09379v2#S2),
  [allocation](https://arxiv.org/html/2609.09379v2#S8.SS3)).
