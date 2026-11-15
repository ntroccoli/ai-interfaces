---
title: Kimi K2.5 repairs 308 scraped pages; most improve, a quarter pass axe, and a retry loop adds cost but no fixes
label: Concordia repair
date: 2026-05-26
org: Concordia University
summary: Kimi K2.5 cut axe violations from 3.98 violations to 1.7 violations per page; a quarter of 308 pages came out clean; a retry loop cost 52% more, fixed no more.
source_url: https://arxiv.org/abs/2605.27716
also: [https://arxiv.org/html/2605.27716v1, https://github.com/toyosi12/ai4se, https://github.com/toyosi12/ai4se/blob/8e691fecea1a4f1ee84a790505abd1e8cf3e2cf0/src/remediation_runner.py, https://github.com/toyosi12/ai4se/blob/8e691fecea1a4f1ee84a790505abd1e8cf3e2cf0/src/cost_tracker.py, https://github.com/toyosi12/ai4se/blob/8e691fecea1a4f1ee84a790505abd1e8cf3e2cf0/dataset/rq1_evaluation_report.json, https://github.com/toyosi12/ai4se/blob/8e691fecea1a4f1ee84a790505abd1e8cf3e2cf0/dataset/rq3_evaluation_report.json, https://github.com/toyosi12/ai4se/blob/8e691fecea1a4f1ee84a790505abd1e8cf3e2cf0/lighthouse/README.md, https://github.com/toyosi12/ai4se/blob/8e691fecea1a4f1ee84a790505abd1e8cf3e2cf0/src/remediation_evaluator.py]
source_type: paper
author_relation: independent
evidence: shown-in-source
case_type: study
ai_role: [check, change]
subject: static HTML of scraped real-world web pages (news, education, standards sites), checked for accessibility violations and then repaired
sample: 662 pages for detection (331 pages with violations, 331 corrected pages); 308 pages repaired by each of two strategies; 1 model, 1 run reported
measures: [accessibility, issue-coverage, cost]
checked_against: [checker]
cost: $4.92 for the single-pass repair of 308 pages and $7.50 for the agent loop, as reported; the code prices tokens at fixed GPT-4o-mini rates
tools: [axe-core 4.10.2, Playwright, HTML parser, LangGraph, Lighthouse]
models: [Kimi K2.5 (check/change)]
period: 2026-03..2026-04
outcome: completed
status: current
superseded_by:
---

# Kimi K2.5 repairs 308 scraped pages; most improve, a quarter pass axe, and a retry loop adds cost but no fixes

Five Concordia University researchers had one model, Kimi K2.5, first spot accessibility problems
in the HTML of scraped web pages and then rewrite the pages to fix them, with the axe-core checker
as the yardstick ([abstract](https://arxiv.org/html/2605.27716v1#S1)). As a detector the model
roughly matched axe on whole pages (F1 0.65 score against 0.66 score); the paper reads the low precision of both as false
alarms, though most of the pages labelled clean still failed axe. As a repairer it left 80.2% of 308 pages with fewer violations, from 3.98 violations to
about 1.7 violations per page on average, but only about a quarter of the pages ended with none,
and about 30% of patches changed the page structure. A loop that retried failed patches cost 52%
more and fixed nothing extra ([results](https://arxiv.org/html/2605.27716v1#S7.SS2.SSS2),
[cost](https://arxiv.org/html/2605.27716v1#S7.SS3.SSS1)). The authors' public code and data show
some gaps between the paper and the runs.

## Source

A paper by Oyelayo, Abushaqra, Asadi, Dey and Costa (first author Oluwatoyosi Oyelayo) of
Concordia University, Montreal, posted to arXiv on 2026-05-26; only that first version exists, and
this case was written from its HTML form, read on 2026-11-14
([paper](https://arxiv.org/abs/2605.27716)). No venue is given. Licence: arXiv's non-exclusive
distribution licence, not Creative Commons. The authors sell no model or tool. The paper shows its
tables; its artifact repository holds the data, prompts, code and result files
([repository](https://github.com/toyosi12/ai4se)), read at its last commit (2026-04-24), 32 days
before the paper. Statements below marked "the code" or "the result file" come from that
repository, not from the paper.

## What was made or studied

Three questions: how well a model detects accessibility violations next to axe-core, how well it
repairs them without breaking the page, and what an iterating agent costs compared with a single
prompt ([research questions](https://arxiv.org/html/2605.27716v1#S5)). The detection set had 662
pages: 331 pages with violations and 331 corrected pages treated as clean
([data](https://arxiv.org/html/2605.27716v1#S6.SS3)). Detection was scored as a yes or no per page,
then by three kinds of violation the authors defined: syntactic (missing attributes, bad nesting),
semantic (ARIA roles, labels) and layout (contrast, navigation order)
([taxonomy](https://arxiv.org/html/2605.27716v1#S6.SS5)). Repair ran on 308 pages in two ways: one
prompt per page, and an agent that checked its patch and retried up to 3 attempts
([remediation](https://arxiv.org/html/2605.27716v1#S7.SS2)).

## Who did what

- **AI:** Kimi K2.5 read cleaned, chunked HTML and judged whether each chunk had violations, by
  category; a page counted as violating when any chunk did
  ([LLM detection](https://arxiv.org/html/2605.27716v1#S6.SS4.SSS2)). Given a page and the list of
  its violations, the same model wrote the repaired HTML, once in the single-pass strategy and in
  up to 3 attempts in the agent strategy
  ([prompts in the code](https://github.com/toyosi12/ai4se/blob/8e691fecea1a4f1ee84a790505abd1e8cf3e2cf0/src/remediation_runner.py#L47)).
  The paper names no dated version or provider; the code reaches `kimi-k2.5` through Alibaba's
  DashScope, but its default is GPT-4o-mini, and the repository's README still presents the
  agent as GPT-4o-mini ([repository](https://github.com/toyosi12/ai4se)).
- **Rule-based tools:** axe-core 4.10.2, injected into each page rendered with Playwright, gave the
  reference violations ([axe](https://arxiv.org/html/2605.27716v1#S6.SS4.SSS1)) and re-checked
  every patch ([procedure](https://arxiv.org/html/2605.27716v1#S7), [remediation](https://arxiv.org/html/2605.27716v1#S7.SS2)); an HTML parser checked that a patch
  parsed, and a comparison of the page's element sequence before and after checked structure, with
  0.85 score as the pass mark in the code
  ([validation](https://arxiv.org/html/2605.27716v1#S6.SS7),
  [code](https://github.com/toyosi12/ai4se/blob/8e691fecea1a4f1ee84a790505abd1e8cf3e2cf0/src/remediation_runner.py#L116)).
  The LangGraph library ran the agent loop. Per the repository, the corrected pages came from a
  script that patched pages using Lighthouse audits until they scored 100/100
  ([Lighthouse pipeline](https://github.com/toyosi12/ai4se/blob/8e691fecea1a4f1ee84a790505abd1e8cf3e2cf0/lighthouse/README.md#L45)).
- **People:** the five authors designed the study and the categories. The paper says authors with
  frontend expertise corrected the pages used as clean examples
  ([approach](https://arxiv.org/html/2605.27716v1#S7.SS1)); the repository describes an automated
  fix script instead (see What went wrong). No users, assistive-technology users or accessibility
  experts judged any fix.

## How it was checked

Against the checker only. For detection, each system's yes or no per page was scored against the
page's label (precision, recall, F1); per category, the model was also scored against axe as the
reference ([metrics](https://arxiv.org/html/2605.27716v1#S6.SS9),
[Table IV](https://arxiv.org/html/2605.27716v1#S7.T4)). For repair, a fix counted as good only if
axe found fewer violations after it, the HTML parsed, and the structure held ([validation](https://arxiv.org/html/2605.27716v1#S6.SS7),
[Table V](https://arxiv.org/html/2605.27716v1#S7.T5)); in the code, "fully fixed" means axe found
none after the fix ([code](https://github.com/toyosi12/ai4se/blob/8e691fecea1a4f1ee84a790505abd1e8cf3e2cf0/src/remediation_evaluator.py#L58)). Cost was counted from API calls, tokens and
a price per token ([cost method](https://arxiv.org/html/2605.27716v1#S6.SS8)). One run of each
strategy is reported.

## Numbers

| Number | What it counts | Basis | Source |
| --- | --- | --- | --- |
| 662 pages | detection set: 331 pages with violations, 331 corrected pages | reported | [Table I](https://arxiv.org/html/2605.27716v1#S6.T1) |
| 0.51 and 0.50 score | precision on whole pages: axe, then the model | measured | [Table II](https://arxiv.org/html/2605.27716v1#S7.T2) |
| 0.93 and 0.94 score | recall on whole pages: axe, then the model | measured | [Table II](https://arxiv.org/html/2605.27716v1#S7.T2) |
| 0.66 and 0.65 score | F1 on whole pages: axe, then the model | measured | [Table II](https://arxiv.org/html/2605.27716v1#S7.T2) |
| 293 of 331 pages | corrected ("clean") pages that axe still flagged; the model flagged 308 pages of them | measured | [result file](https://github.com/toyosi12/ai4se/blob/8e691fecea1a4f1ee84a790505abd1e8cf3e2cf0/dataset/rq1_evaluation_report.json#L13) |
| 45%, 82%, 40% | share of all 662 pages where axe found a syntactic, semantic, layout violation | measured | [Table III](https://arxiv.org/html/2605.27716v1#S7.T3) |
| 91%, 85%, 57% | the same shares for the model | measured | [Table III](https://arxiv.org/html/2605.27716v1#S7.T3) |
| 48%, 71%, 50% | pages where axe and the model agreed, per category in the same order | measured | [Table III](https://arxiv.org/html/2605.27716v1#S7.T3) |
| 0.62, 0.83, 0.48 score | the model's F1 per category with axe as the reference: syntactic, semantic, layout | measured | [Table IV](https://arxiv.org/html/2605.27716v1#S7.T4) |
| 0.47 and 0.41 score | the model's precision against axe on syntactic and on layout violations | measured | [Table IV](https://arxiv.org/html/2605.27716v1#S7.T4) |
| 308 pages | pages repaired by each strategy | measured | [Table VI](https://arxiv.org/html/2605.27716v1#S7.T6) |
| 99.7% and 100% | patches that parsed: single pass, agent | measured | [Table V](https://arxiv.org/html/2605.27716v1#S7.T5) |
| 80.2% | pages with fewer axe violations after the fix, both strategies | measured | [Table V](https://arxiv.org/html/2605.27716v1#S7.T5) |
| 25.7% and 23.7% | pages with no axe violation left: single pass, agent | measured | [Table V](https://arxiv.org/html/2605.27716v1#S7.T5) |
| 68.2% and 69.5% | patches that kept the structure (similarity at least 0.85 score): single pass, agent | measured | [Table V](https://arxiv.org/html/2605.27716v1#S7.T5) |
| 0.83 score | mean structure similarity of the patches, both strategies | measured | [Table VI](https://arxiv.org/html/2605.27716v1#S7.T6) |
| 3.98 violations | mean axe violations per page before repair | measured | [Table V](https://arxiv.org/html/2605.27716v1#S7.T5) |
| 1.68 and 1.71 violations | mean axe violations per page after repair: single pass, agent | measured | [Table V](https://arxiv.org/html/2605.27716v1#S7.T5) |
| 67%, 2%, 31% | agent pages that passed its check on the first attempt, on the second, or reached the cap of 3 attempts without passing | measured | [agent attempts](https://arxiv.org/html/2605.27716v1#S7.SS2.SSS1) |
| 308 and 504 calls | API calls: single pass, agent (196 retries) | measured | [Table VII](https://arxiv.org/html/2605.27716v1#S7.T7) |
| 14.2 and 21.2 million tokens | tokens used: single pass, agent | measured | [Table VII](https://arxiv.org/html/2605.27716v1#S7.T7) |
| $4.92 and $7.50 | total cost: single pass, agent (52% more); the code prices tokens at $0.15 and $0.60 per million tokens, GPT-4o-mini rates | measured | [Table VII](https://arxiv.org/html/2605.27716v1#S7.T7) |
| $0.016 and $0.024 | cost per page: single pass, agent | measured | [Table VIII](https://arxiv.org/html/2605.27716v1#S7.T8) |
| 474 and 433 ms | mean latency per call as printed: single pass, agent; the result file stores 474,124 ms and 432,774 ms | measured | [Table VII](https://arxiv.org/html/2605.27716v1#S7.T7) |

## What worked

- The model produced patches that parsed almost every time (99.7% and 100%) and lowered the axe
  count on 80.2% of the 308 pages, from 3.98 violations to about 1.7 violations per page
  ([Table V](https://arxiv.org/html/2605.27716v1#S7.T5)).
- Element-level fixes went well in the authors' reading: adding a missing alt attribute to an
  image or a label to a button ([discussion](https://arxiv.org/html/2605.27716v1#S10)).
- On semantic violations (ARIA roles, labels) the model agreed most with axe: F1 0.83 score, with
  precision 0.82 score and recall 0.84 score
  ([Table IV](https://arxiv.org/html/2605.27716v1#S7.T4)).
- A single prompt per page did as well as the agent loop for about a third less money (the agent's $7.50
  against $4.92), so the authors recommend the single pass
  ([cost](https://arxiv.org/html/2605.27716v1#S7.SS3.SSS2),
  [Table VII](https://arxiv.org/html/2605.27716v1#S7.T7)).
- The three-part acceptance test (fewer violations, valid HTML, structure kept) measures more than
  a violation count: the structure check flagged about 30% of patches; the source does not say how
  many of those also had fewer violations
  ([validation](https://arxiv.org/html/2605.27716v1#S6.SS7),
  [results](https://arxiv.org/html/2605.27716v1#S7.SS2.SSS2)).

## What went wrong

- Few pages came out clean: 25.7% with one pass and 23.7% with the agent; about 1.7 violations per
  page remained on average; the authors think the rest need context that static HTML lacks
  ([Table V](https://arxiv.org/html/2605.27716v1#S7.T5), [results](https://arxiv.org/html/2605.27716v1#S7.SS2.SSS2)).
- About 30% of patches changed the page structure beyond the 0.85 score similarity mark, and the
  mean similarity, 0.83 score, sits below that mark
  ([Table VI](https://arxiv.org/html/2605.27716v1#S7.T6)).
- The model added new violations while fixing others: invalid or unsupported ARIA, roles that
  repeat what the HTML already says, empty labels and structural changes; the examples include
  duplicate IDs, `aria-hidden` on containers with focusable children, radio buttons outside a
  radio group, and a `div` nested in a `p`. In the category sample, five of six pages kept exactly
  the violations they had, and on the sixth semantic violations rose from 11 violations to 15
  violations. The authors trace this to fixes that are right for one element but
  ignore page-wide rules such as unique IDs, heading order and unique landmarks
  ([new violations](https://arxiv.org/html/2605.27716v1#S8.SS3),
  [Table XI](https://arxiv.org/html/2605.27716v1#S8.T11),
  [discussion](https://arxiv.org/html/2605.27716v1#S10)).
- The agent loop did not help: 31% of its pages used all 3 attempts without passing, only 2%
  passed on the second, and its results matched the single pass while using 1.64x the calls, 1.49x
  the tokens and 52% more money. The authors suspect their feedback was too general, and that
  naming the exact failing DOM node might work better; they did not test it
  ([agent attempts](https://arxiv.org/html/2605.27716v1#S7.SS2.SSS1),
  [Table VII](https://arxiv.org/html/2605.27716v1#S7.T7),
  [internal validity](https://arxiv.org/html/2605.27716v1#S9.SS2)).
- The loop's feedback in the code names only a parse failure or a structure similarity below the
  mark, never the violations that remain, although the agent's prompt promises that list; so the
  loop retried for structure, not for accessibility (our reading of the code)
  ([code](https://github.com/toyosi12/ai4se/blob/8e691fecea1a4f1ee84a790505abd1e8cf3e2cf0/src/remediation_runner.py#L306)).
  The parse check in the code passes any patch that yields non-empty output
  ([code](https://github.com/toyosi12/ai4se/blob/8e691fecea1a4f1ee84a790505abd1e8cf3e2cf0/src/remediation_runner.py#L94)).
- The paper reads both detectors' precision (about 0.50 score) as many false alarms. The model
  over-reported syntactic violations (precision 0.47 score against axe) and diverged on layout
  (F1 0.48 score, 50% agreement) ([Table II](https://arxiv.org/html/2605.27716v1#S7.T2),
  [Table IV](https://arxiv.org/html/2605.27716v1#S7.T4)).
- The "clean" half of the detection set was not clean by axe: the result file shows axe flagging
  293 of the 331 corrected pages and the model 308 pages, which explains most of the low
  precision; the paper's Table I lists those pages as having no violation (our reading of the
  result file) ([result file](https://github.com/toyosi12/ai4se/blob/8e691fecea1a4f1ee84a790505abd1e8cf3e2cf0/dataset/rq1_evaluation_report.json#L13),
  [Table I](https://arxiv.org/html/2605.27716v1#S6.T1)). The paper says residual violations may
  remain in them ([data](https://arxiv.org/html/2605.27716v1#S6.SS3)).
- The paper and the repository describe the data differently (our reading): the paper says the
  detection set drew snippets from the AccessGuru dataset and that authors corrected the clean
  examples ([approach](https://arxiv.org/html/2605.27716v1#S7.SS1)); the repository describes 564
  scraped pages run through an automated Lighthouse fix script, of which 332 pages reached 100/100
  ([Lighthouse pipeline](https://github.com/toyosi12/ai4se/blob/8e691fecea1a4f1ee84a790505abd1e8cf3e2cf0/lighthouse/README.md#L420)),
  and its commit log removes 232 pages scoring below 100%
  ([repository](https://github.com/toyosi12/ai4se)).
- The dollar figures are not Kimi K2.5 prices (our reading): the code prices every token at
  $0.15 and $0.60 per million tokens, GPT-4o-mini rates, and those rates reproduce the reported
  $4.92 exactly; the ratio between the strategies would move only a little at other prices
  ([code](https://github.com/toyosi12/ai4se/blob/8e691fecea1a4f1ee84a790505abd1e8cf3e2cf0/src/cost_tracker.py#L16),
  [result file](https://github.com/toyosi12/ai4se/blob/8e691fecea1a4f1ee84a790505abd1e8cf3e2cf0/dataset/rq3_evaluation_report.json#L17)).
- Latency is off by a factor of a thousand (our reading): the paper prints 474 ms per call, the
  result file stores 474,124 ms, about 8 minutes
  ([Table VII](https://arxiv.org/html/2605.27716v1#S7.T7),
  [result file](https://github.com/toyosi12/ai4se/blob/8e691fecea1a4f1ee84a790505abd1e8cf3e2cf0/dataset/rq3_evaluation_report.json#L18)).
- Smaller slips (our reading): the attempt chart's bars (208, 7 and 95 pages) add up to 310 pages,
  not 308 pages ([Figure 3](https://arxiv.org/html/2605.27716v1#S7.F3)); the rule table of
  "selected pages" uses file names (site_home.html, checkout.html) that match no other table, and
  65% of its rows drop by exactly 4 violations, with no source given
  ([Table X](https://arxiv.org/html/2605.27716v1#S8.T10)).
- Limits the authors state: axe stands in for the truth, yet automated checkers cover about 30% to
  50% of WCAG criteria, so visual, cognitive and keyboard problems are out; the structure score
  may miss visual regressions; prompts and settings may drive the loop's failure; the model is not
  deterministic even with temperature set to zero; one model only; static HTML only, not React or Vue
  components ([construct](https://arxiv.org/html/2605.27716v1#S9.SS1),
  [internal](https://arxiv.org/html/2605.27716v1#S9.SS2),
  [external](https://arxiv.org/html/2605.27716v1#S9.SS3)).
- **Not reported:** Kimi K2.5's dated version, provider and real price; how many pages gained new
  violations; fix rates per rule across all 308 pages; variation between runs (one run each);
  which 308 pages of the 331 pages were repaired (the paper says the pages flagged as violating; axe
  flagged 308 pages of them in the result file, a match in count only); who checked the corrected pages and how; whether any fix was tried with a screen
  reader or by people; when the runs took place (the repository's commits put them in
  March and April 2026) ([repository](https://github.com/toyosi12/ai4se)).

## Practices to copy

- [stated] Accept a model's accessibility fix only when the checker finds fewer violations, the HTML parses, and the page structure holds. ([Validation](https://arxiv.org/html/2605.27716v1#S6.SS7))
- [stated] Prefer a single repair prompt to a retry loop whose feedback is general; it fixed as much for less money. ([Cost](https://arxiv.org/html/2605.27716v1#S7.SS3.SSS2))
- [stated] Pair model fixes with rule-based checks that enforce page-wide rules: unique IDs, heading order, unique landmarks. ([Discussion](https://arxiv.org/html/2605.27716v1#S10))
- [stated] When a repair loop is used, tell the model exactly which element failed and why, not a general verdict. ([Internal validity](https://arxiv.org/html/2605.27716v1#S9.SS2))
- [ours] Re-run the checker on the whole page after each fix and count new violations, not only the ones that went away. ([New violations](https://arxiv.org/html/2605.27716v1#S8.SS3))
- [ours] Before scoring a detector, confirm with the same checker that the pages labelled clean really are clean. ([Result file](https://github.com/toyosi12/ai4se/blob/8e691fecea1a4f1ee84a790505abd1e8cf3e2cf0/dataset/rq1_evaluation_report.json#L13))
- [ours] Price a study's tokens with the model it actually ran, and read the result files before quoting cost or latency. ([Code](https://github.com/toyosi12/ai4se/blob/8e691fecea1a4f1ee84a790505abd1e8cf3e2cf0/src/cost_tracker.py#L16))

## Context

- Model era: Kimi K2.5, paper posted May 2026; the paper does not date the runs, and
  `period: 2026-03..2026-04` comes from the repository's commits, which add the repair and cost
  results on 2026-04-05 ([repository](https://github.com/toyosi12/ai4se)).
- The paper places itself after AccessGuru, which reported violation scores up to 84% lower after
  model fixes, and after multi-agent repair systems with planner, fixer and validator
  roles; it argues those were mostly judged by a checker and seldom counted cost
  ([introduction](https://arxiv.org/html/2605.27716v1#S2), [related work](https://arxiv.org/html/2605.27716v1#S3)).
- The most frequent axe rules in the set were missing landmarks (`region`), colour contrast, link
  and button names, and image alt text ([Table IX](https://arxiv.org/html/2605.27716v1#S8.T9)).
