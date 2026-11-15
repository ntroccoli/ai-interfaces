---
title: Qwen2.5-Coder and GPT-4o rewrite ten real websites with lower checker violation rates than the original code, but not on ARIA
label: UCI code study
date: 2025-03-20
org: University of California, Irvine
summary: Rewritten from summaries, model code had lower checker violation rates than human code; accessibility prompts rarely helped, a model-report fix loop mostly did.
source_url: https://arxiv.org/abs/2503.15885
also: [https://arxiv.org/html/2503.15885v1]
source_type: paper
author_relation: independent
evidence: shown-in-source
case_type: study
ai_role: [build, check, change]
subject: UI files (HTML, JavaScript, CSS) of ten open-source project websites, regenerated block by block from model-written summaries and rendered
sample: 10 projects; 473 sampled UI files; 10 pages per project; 2 newer projects in a leakage check; 2 models
measures: [accessibility, contrast, function]
checked_against: [checker]
cost: unstated
tools: [IBM Equal Access checker (AChecker), QualWeb, jsdom, css library]
models: [GPT-4o (build/change/check), Qwen2.5-Coder-32B-Instruct-AWQ (build/change/check)]
period: unstated
outcome: completed
status: current
superseded_by:
---

# Qwen2.5-Coder and GPT-4o rewrite ten real websites with lower checker violation rates than the original code, but not on ARIA

Four University of California, Irvine researchers had Qwen2.5-Coder and GPT-4o rewrite the UI code of ten
open-source project websites from summaries of it, then ran two accessibility checkers on the rendered pages
([paper](https://arxiv.org/html/2503.15885v1#S3)). Without any word about accessibility, both models left a lower
share of elements with violations than the original human code (0.347 and 0.348 rate against 0.425 rate with one
checker) and did well on contrast and alt text, but worse on several ARIA rules ([RQ1](https://arxiv.org/html/2503.15885v1#S4.SS1)).
Asking for accessible code, with rules, examples or a self-review, almost never beat the plain prompt
([RQ2](https://arxiv.org/html/2503.15885v1#S4.SS2)). A loop that fed a model-written report, built from one
checker's rules, back to the generator gave the lowest rates on the other checker, though on one model and one checker it
trailed the plain prompt ([RQ3](https://arxiv.org/html/2503.15885v1#S4.SS3)).

## Source

A paper by four University of California, Irvine authors (Hyunjae Suh first, then Mahan Tafreshipour, Sam Malek
and Iftekhar Ahmed), posted to arXiv on 2025-03-20; only that first version exists, and this case was written
from its HTML form, read on 2026-11-14 ([paper](https://arxiv.org/abs/2503.15885)). The HTML front matter keeps
template placeholders and names no venue. Licence: CC BY 4.0. The authors sell no model or tool; they test a
commercial OpenAI model and an open-weight Qwen model. The paper shows per-project rates for every setup in two
tables and points to a companion repository with code and data; that repository bars automated reading in its
robots.txt, so it was not read, and the per-rule breakdowns kept only there are not part of this case.

## What was made or studied

Whether code models write more accessible web code than people, whether prompting for accessibility helps,
and whether checker feedback in the loop helps more ([introduction](https://arxiv.org/html/2503.15885v1#S1)).
The authors picked ten active GitHub-hosted websites (Vue, Django, Bootstrap, Node.js, Express, Flutter,
PostgreSQL, Foundation, Dart and React Native docs or project sites), found 2,082 UI-related files, of which
1,716 files rendered, and sampled 473 files ([data](https://arxiv.org/html/2503.15885v1#S3.SS1)). Each file was
cut into blocks (HTML sections, JavaScript functions and classes, CSS rules); one model instance summarised each
block, and a separate instance of the same model rewrote it from the summary alone, so it never saw the original
([generation](https://arxiv.org/html/2503.15885v1#S3.SS2)). Five setups were compared: a plain prompt with no
mention of accessibility, Zero-Shot (an added line asking for WCAG compliance), Few-Shot (plus correct and broken
examples for each rule the checkers had flagged: 34 rules of one checker, 16 rules of the other), Self-Criticism (one review
round by the model), and FeedA11y, the authors' loop ([prompts](https://arxiv.org/html/2503.15885v1#S3.SS4),
[FeedA11y](https://arxiv.org/html/2503.15885v1#S3.SS5)).

## Who did what

- **AI:** two models, `Qwen2.5-Coder-32B-Instruct-AWQ` and GPT-4o, at their default temperature (one), wrote the block
  summaries and rewrote the code ([generation](https://arxiv.org/html/2503.15885v1#S3.SS2)). In FeedA11y the
  first draft is written with no accessibility instruction; a second model, the optimizer, reads the code, one
  checker's rule descriptions, the CSS styles applied to each element and WCAG test rules, and writes an
  accessibility report (no checker runs inside the loop; the comparison table also gives the loop accessibility
  instructions and code examples ([Table 4](https://arxiv.org/html/2503.15885v1#S3.T4))); the generator then reasons, fixes only the reported problems and checks its fix, for at
  most 3 rounds (2.4 rounds on average) ([FeedA11y](https://arxiv.org/html/2503.15885v1#S3.SS5)). The best setup
  had Qwen2.5-Coder generate and GPT-4o optimise ([RQ5](https://arxiv.org/html/2503.15885v1#S4.SS5)).
- **Rule-based tools:** AChecker (from IBM Equal Access) and QualWeb, against WCAG 2.1; only
  AChecker's confirmed violations and QualWeb's failures were counted
  ([evaluation](https://arxiv.org/html/2503.15885v1#S3.SS3)). The rules fed to the optimizer came from one
  checker and the scoring from the other. jsdom and the css library mapped each element to its CSS
  ([FeedA11y](https://arxiv.org/html/2503.15885v1#S3.SS5)). Parsers split files into blocks.
- **People:** the authors chose the projects and wrote the prompts; two authors read the code and its summary
  and adjusted a few summaries, and two authors compared each rendered page with the original by eye (main
  components in place, content unchanged) ([generation](https://arxiv.org/html/2503.15885v1#S3.SS2)). They
  checked by hand that the broken Few-Shot examples triggered their rules
  ([prompts](https://arxiv.org/html/2503.15885v1#S3.SS4)). The original project code, written by the projects'
  contributors, is the human baseline. No person with a disability or accessibility expert judged the pages.

## How it was checked

The yardstick is the two checkers; no person judged accessibility. For each rendered page the inaccessibility rate is the count of elements with
a violation divided by the count of elements open to one; a rate is given per project and as the mean
of the ten projects, without saying how page rates make up a project's rate ([evaluation](https://arxiv.org/html/2503.15885v1#S3.SS3)). People checked only that the rewritten
pages kept the original's structure and content, settling disagreements by discussion
([generation](https://arxiv.org/html/2503.15885v1#S3.SS2)). A leakage check reran FeedA11y on two projects made
after both models' training cutoffs ([RQ4](https://arxiv.org/html/2503.15885v1#S4.SS4)). An ablation removed one
FeedA11y input at a time ([RQ5](https://arxiv.org/html/2503.15885v1#S4.SS5)). The paper reports no repeated runs
and no statistical tests.

## Numbers

| Number | What it counts | Basis | Source |
| --- | --- | --- | --- |
| 10 projects, 473 files | websites studied; UI files sampled from 1,716 files that rendered (2,082 files found) | reported | [Table 1](https://arxiv.org/html/2503.15885v1#S3.T1) |
| 93.38% vs 14.98% | share of UI files that passed rendering, block-level against whole-file rewriting, on 3 projects | measured | [generation](https://arxiv.org/html/2503.15885v1#S3.SS2) |
| 0.425, 0.347, 0.348 rate | AChecker inaccessibility rate, mean of 10 projects: human code; plain prompt GPT-4o; plain prompt Qwen2.5-Coder | measured | [Table 5](https://arxiv.org/html/2503.15885v1#S4.T5) |
| 0.125, 0.105, 0.113 rate | the same with QualWeb | measured | [Table 6](https://arxiv.org/html/2503.15885v1#S4.T6) |
| 80% | share of AChecker violations that were text contrast | reported | [RQ1](https://arxiv.org/html/2503.15885v1#S4.SS1.SSS1) |
| nearly 49%, over 70% | drop against human code in contrast and in alt-text violations, plain prompt GPT-4o, AChecker | reported | [RQ1](https://arxiv.org/html/2503.15885v1#S4.SS1.SSS1) |
| 58% | drop in QualWeb colour-contrast failures, both models, plain prompt | reported | [RQ1](https://arxiv.org/html/2503.15885v1#S4.SS1.SSS2) |
| 0.381, 0.449, 0.386 rate | AChecker rate for GPT-4o with Self-Criticism, Few-Shot, Zero-Shot (in that order) | measured | [Table 5](https://arxiv.org/html/2503.15885v1#S4.T5) |
| 0.423, 0.444, 0.372 rate | the same for Qwen2.5-Coder, same order | measured | [Table 5](https://arxiv.org/html/2503.15885v1#S4.T5) |
| 0.292, 0.300 rate | AChecker rate for FeedA11y with GPT-4o and with Qwen2.5-Coder generating | measured | [Table 5](https://arxiv.org/html/2503.15885v1#S4.T5) |
| 0.112, 0.107 rate | QualWeb rate for FeedA11y with GPT-4o and with Qwen2.5-Coder generating | measured | [Table 6](https://arxiv.org/html/2503.15885v1#S4.T6) |
| 7 of 10 projects | projects where FeedA11y beat human code and the plain prompt, as the text states (our count of Table 5: 6 of 10 projects for either model) | reported | [RQ3](https://arxiv.org/html/2503.15885v1#S4.SS3.SSS1) |
| 53% | drop in contrast violations, FeedA11y with GPT-4o against human code, AChecker | reported | [RQ3](https://arxiv.org/html/2503.15885v1#S4.SS3.SSS1) |
| 2.4 rounds; 78% | mean FeedA11y rounds to converge (cap 3 rounds); share of cases that needed 2 or more rounds | reported | [FeedA11y](https://arxiv.org/html/2503.15885v1#S3.SS5) |
| 0.147, 0.155, 0.225 rate | leakage check on 2 newer projects, one pooled rate each, checker not named: FeedA11y GPT-4o, FeedA11y Qwen, human code | measured | [RQ4](https://arxiv.org/html/2503.15885v1#S4.SS4) |
| 15.01%, 14.83%, 9.02%, 2.23%, 0.99% | rise in mean inaccessibility rate when the ablation removed style properties, accessibility instructions, test rules, code examples, rule descriptions; one setup (Qwen2.5-Coder generating, GPT-4o optimising on QualWeb rules, scored by AChecker) | measured | [RQ5](https://arxiv.org/html/2503.15885v1#S4.SS5) |

## What worked

- Rewritten without any word about accessibility, both models' pages had lower mean rates than the human code
  on both checkers; the text names gains on contrast and alt text for both, and on form labels for GPT-4o
  ([RQ1](https://arxiv.org/html/2503.15885v1#S4.SS1)).
- FeedA11y gave the lowest mean AChecker rates of all setups, 0.292 rate with GPT-4o and 0.300 rate with
  Qwen2.5-Coder generating, against 0.425 rate for human code; with QualWeb its Qwen2.5-Coder run was the
  lowest of that model's setups ([Table 5](https://arxiv.org/html/2503.15885v1#S4.T5),
  [Table 6](https://arxiv.org/html/2503.15885v1#S4.T6)).
- The authors credit two design choices: start from a draft with no accessibility instruction, then fix only
  what the report names, since broad instructions had added attributes that clashed with the code
  ([FeedA11y](https://arxiv.org/html/2503.15885v1#S3.SS5)).
- Giving the optimizer the CSS applied to each element mattered most in the ablation, nearly tied with the
  accessibility instructions: dropping it raised the mean rate by 15.01% ([RQ5](https://arxiv.org/html/2503.15885v1#S4.SS5)).
- On two projects released after both models' cutoffs, FeedA11y still beat the human code (0.147 rate and
  0.155 rate against 0.225 rate), which the authors read as no memorisation
  ([RQ4](https://arxiv.org/html/2503.15885v1#S4.SS4)).
- Rewriting block by block rather than whole files kept far more files renderable: 93.38% against 14.98% on
  3 projects ([generation](https://arxiv.org/html/2503.15885v1#S3.SS2)).

## What went wrong

- ARIA was the weak spot: with the plain prompt GPT-4o broke more rules than the human code on SVG labels, link
  purpose, frame titles and form label position, and both models had trouble with ARIA rules; on QualWeb both struggled
  with font-size units, table header scope and heading structure, Qwen2.5-Coder also on link titles and
  focus removal ([RQ1](https://arxiv.org/html/2503.15885v1#S4.SS1)).
- Prompting for accessibility almost never helped: on AChecker every Self-Criticism, Few-Shot and
  Zero-Shot mean was above the plain prompt's, and Few-Shot (0.449 rate and 0.444 rate) was above the human
  code's 0.425 rate; on QualWeb only Few-Shot with Qwen2.5-Coder edged under the plain prompt. The authors trace it to accessibility
  attributes that clashed with the existing code and created new violations
  ([RQ2](https://arxiv.org/html/2503.15885v1#S4.SS2), [prompts](https://arxiv.org/html/2503.15885v1#S3.SS4)).
- The paper's second finding says the prompting setups always beat human code, but its own Table 5 shows Few-Shot
  above the human rate for both models ([RQ2](https://arxiv.org/html/2503.15885v1#S4.SS2.SSS1),
  [Table 5](https://arxiv.org/html/2503.15885v1#S4.T5)).
- FeedA11y did not win everywhere: with GPT-4o generating, its QualWeb rate (0.112 rate) was above the plain
  prompt's (0.105 rate), and it raised link-title and link-list failures; with Qwen2.5-Coder on QualWeb it
  raised other semantic and interaction issues; it still struggled with unique ARIA landmarks. The authors conclude that checker feedback alone cannot handle complex semantics or keyboard and
  focus behaviour ([RQ3](https://arxiv.org/html/2503.15885v1#S4.SS3)).
- Text and table disagree (our reading of Table 5): section 4.3.1 names Qwen2.5-Coder under FeedA11y,
  at 0.300 rate, as best on AChecker, while the GPT-4o run of the same loop scores 0.292 rate there; and the claim that FeedA11y
  beat both human code and the plain prompt in 7 of 10 projects holds in our count of Table 5 for neither
  model: it beats both in 6 of 10 projects (Qwen2.5-Coder beats human code alone in 7 of 10 projects). The
  ablation section calls Qwen2.5-Coder generating with GPT-4o optimising the setup with the lowest mean, yet
  Table 5's lowest FeedA11y mean is in the GPT-4o column
  ([RQ3](https://arxiv.org/html/2503.15885v1#S4.SS3.SSS1), [RQ5](https://arxiv.org/html/2503.15885v1#S4.SS5),
  [Table 5](https://arxiv.org/html/2503.15885v1#S4.T5)).
- The introduction says FeedA11y applies an evaluation tool to the code, while the method section has a model
  write the report from checker rules; and the loop's first draft carries no accessibility instruction, yet
  removing accessibility instructions from the loop raised the rate by 14.83% in the ablation (our reading)
  ([introduction](https://arxiv.org/html/2503.15885v1#S1), [FeedA11y](https://arxiv.org/html/2503.15885v1#S3.SS5),
  [RQ5](https://arxiv.org/html/2503.15885v1#S4.SS5)).
- The plain-prompt win over human code is a mean, not a rule (our count): on AChecker GPT-4o beat the human
  code in 6 of 10 projects and Qwen2.5-Coder in 7 of 10 projects, and on Bootstrap Qwen2.5-Coder scored 0.323
  rate against 0.108 rate; on QualWeb Qwen2.5-Coder beat it in only 3 of 10 projects, GPT-4o in 6 of 10 projects
  ([Table 5](https://arxiv.org/html/2503.15885v1#S4.T5), [Table 6](https://arxiv.org/html/2503.15885v1#S4.T6)).
- The paper's third finding says FeedA11y beat human code and all prompting setups consistently, yet in our count of Table 6
  FeedA11y beat the human code in only 5 of 10 projects with either model
  ([RQ3](https://arxiv.org/html/2503.15885v1#S4.SS3), [Table 6](https://arxiv.org/html/2503.15885v1#S4.T6)).
- Limits the authors state: the rate weighs every violation the same whatever its severity or harm and does
  not fully reflect what users meet, which they leave to future studies with users with disabilities; the results
  may not carry beyond these two models and ten projects
  ([threats](https://arxiv.org/html/2503.15885v1#S5)).
- Contrast is 80% of AChecker violations, so the headline rate mostly tracks contrast; only checker-confirmed
  violations were counted, while issues the checker leaves to manual review were ignored (our reading)
  ([evaluation](https://arxiv.org/html/2503.15885v1#S3.SS3), [RQ1](https://arxiv.org/html/2503.15885v1#S4.SS1.SSS1)).
- The model code is a rewrite of existing pages from summaries some of which the authors adjusted by hand, and
  files that failed to render dropped out, so the comparison is of rewritten working pages, not of models
  designing a site (our reading) ([generation](https://arxiv.org/html/2503.15885v1#S3.SS2)).
- The leakage check covers FeedA11y on two projects, one pooled rate per model with no checker named, and no
  other setup, the plain prompt included
  ([RQ4](https://arxiv.org/html/2503.15885v1#S4.SS4)).
- **Not reported:** runs per setup and spread between runs at temperature one, and any significance test,
  though the text says significantly; the dated model version of GPT-4o; which optimizer and rule set produced the
  FeedA11y columns of Tables 5 and 6; per-rule rates for most setups (on the companion site only); element
  counts behind each rate; cost, tokens and time; when the experiments ran; whether the ablation rises are
  relative or in points; how the pages per project were chosen (the text also says all extracted pages were
  checked); how page rates make up a project's rate; the severity breakdown the method section promises;
  why Few-Shot covers 16 QualWeb rules while Table 3 lists 17 rules
  ([evaluation](https://arxiv.org/html/2503.15885v1#S3.SS3), [RQ5](https://arxiv.org/html/2503.15885v1#S4.SS5)).

## Practices to copy

- [stated] Generate first without accessibility instructions, have a second model report violations against checker rules, and fix only what the report names. ([FeedA11y](https://arxiv.org/html/2503.15885v1#S3.SS5))
- [stated] Give the model fixing accessibility the CSS that applies to each element, not just the markup. ([RQ5](https://arxiv.org/html/2503.15885v1#S4.SS5))
- [stated] Feed rules from one checker and score with another, so the fix loop is not graded by its own guide. ([FeedA11y](https://arxiv.org/html/2503.15885v1#S3.SS5))
- [stated] Cap the fix loop at a few rounds and stop when a round changes nothing. ([FeedA11y](https://arxiv.org/html/2503.15885v1#S3.SS5))
- [ours] Do not trust a line in the prompt asking for accessible code: measure it, since such prompts here added violations. ([RQ2](https://arxiv.org/html/2503.15885v1#S4.SS2))
- [ours] Review ARIA roles, landmarks and keyboard focus by hand or with users even when the checker's rate falls. ([RQ3](https://arxiv.org/html/2503.15885v1#S4.SS3))
- [ours] Report checker results per rule, since one rule such as contrast can drive the whole rate. ([RQ1](https://arxiv.org/html/2503.15885v1#S4.SS1.SSS1))

## Context

- Model era: `Qwen2.5-Coder-32B-Instruct-AWQ` and GPT-4o, paper posted March 2025; the paper does not date the
  runs, and the paper's selection rule asked for a latest commit no later than that January 2025
  ([data](https://arxiv.org/html/2503.15885v1#S3.SS1)).
- An earlier study the paper cites, with 88 web developers prompting ChatGPT, found accessibility issues in 84% of
  the sites it made and had ChatGPT fix about 70% of them, by hand-driven prompting
  ([related work](https://arxiv.org/html/2503.15885v1#S2.SS2)).
- The checkers were chosen because an earlier study with three of the same authors found they flag the most issues
  ([evaluation](https://arxiv.org/html/2503.15885v1#S3.SS3)).
