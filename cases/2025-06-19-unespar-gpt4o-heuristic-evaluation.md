---
title: GPT-4o reviews 20 screenshots of a mining-data website against Nielsen's heuristics and finds a fifth of the experts' issues
label: Brazil heuristic review
date: 2025-06-19
org: Brazilian universities (UNESPAR, UTFPR, UFLA, UFRPE, UFSCar)
summary: From 20 screenshots GPT-4o raised 111 issues; 41 survived review, 14 of them among 66 expert issues (21.2%), and 27 were false positives.
source_url: https://arxiv.org/abs/2506.16345
also: [https://arxiv.org/html/2506.16345v1]
source_type: paper
author_relation: independent
evidence: shown-in-source
case_type: study
ai_role: [check]
subject: a public Brazilian web platform of maps and charts on mineral research and production, given to the model as 20 screenshots and reviewed against Nielsen's 10 heuristics
sample: 20 screenshots, one model run each; 66 issues from an earlier review by 3 experts; four researchers classified the model's issues
measures: [issue-coverage]
checked_against: [people]
cost: unstated
tools: [OpenAI playground]
models: [gpt-4o-2024-08-06 (check)]
period: 2024-11
outcome: completed
status: current
superseded_by:
---

# GPT-4o reviews 20 screenshots of a mining-data website against Nielsen's heuristics and finds a fifth of the experts' issues

Six researchers from Brazilian universities gave GPT-4o 20 screenshots of a public web platform on
mineral production, one prompt per screenshot, and asked for a heuristic evaluation against
Nielsen's 10 heuristics ([method](https://arxiv.org/html/2506.16345v1#S3)). The model returned 111
issues; after the authors merged 43 issues as repeats and set aside 27 issues as false positives, 41 issues remained
([overview](https://arxiv.org/html/2506.16345v1#S4.SS1)). Only 14 of the 66 issues three experts
had found in an earlier review (21.2%) were among them
([RQ1](https://arxiv.org/html/2506.16345v1#S4.SS2)). Next to the experts it found more on wording
and visual design and little about user control, efficiency or memory load
([Table 5](https://arxiv.org/html/2506.16345v1#S4.T5)); its false positives included problems absent
from the screen and guesses about behaviour a still image cannot show
([RQ3](https://arxiv.org/html/2506.16345v1#S4.SS4)). The authors call it a complement to experts,
never a replacement ([conclusion](https://arxiv.org/html/2506.16345v1#S6)).

## Source

A paper by Guilherme Guerino (first author; State University of Paraná), Luiz Rodrigues, Bruna
Capeleti, Rafael Ferreira Mello, André Freire and Luciana Zaina, at universities in Brazil, posted to arXiv on 2025-06-19; only that first version exists, and this case was
written from its HTML form, read on 2026-11-14 ([paper](https://arxiv.org/abs/2506.16345)). The
arXiv record says it was accepted at INTERACT 2025. Licence: CC BY 4.0. The authors sell no model or
tool; they test one commercial OpenAI model. The paper prints every issue the model kept, every
false positive, the matched pairs and the counts per heuristic; the full prompt and the raw sheets
are on figshare, linked from the paper and not read for this case. The expert results come from an
earlier published evaluation, cited as a 2023 master's thesis by Capeleti, by our reading the
co-author of that name; this case did not read it
([planning](https://arxiv.org/html/2506.16345v1#S3.SS1)).

## What was made or studied

Whether GPT-4o can do a heuristic evaluation, an inspection where reviewers list the problems an
interface has against a set of principles, as well as experts on a web system
([introduction](https://arxiv.org/html/2506.16345v1#S1)). The subject was a public Brazilian platform
that publishes maps and charts on mineral research and production.
Three experts had already inspected it with Nielsen's 10 heuristics and found 66 issues; this study
asked the model to do the same from 20 screenshots the authors chose to cover most of its functions
([planning](https://arxiv.org/html/2506.16345v1#S3.SS1),
[execution](https://arxiv.org/html/2506.16345v1#S3.SS2)). Three questions: how far the two lists
agree on issues, heuristics and severity; what the issues only the model found look like; and what
its false positives look like ([method](https://arxiv.org/html/2506.16345v1#S3)).

## Who did what

- **AI:** OpenAI's GPT-4o, version 2024-08-06, used through the OpenAI playground in November 2024, ran
  one prompt per screenshot, once each. The prompt set a role (a designer experienced in user
  experience), the context (an interactive website), step-by-step instructions, a rubric asking to
  justify each issue against the heuristics, and a CSV output: the problem, the heuristic it
  breaks, a severity rating between one and four, an explanation and where on the screen it is
  ([planning](https://arxiv.org/html/2506.16345v1#S3.SS1),
  [Table 1](https://arxiv.org/html/2506.16345v1#S3.T1)). A pilot on 2 other screenshots gave 11
  issues, and all the authors judged the prompt fit for the task.
- **Rule-based tools:** the statistics (a Pearson chi-square test on which issues each side
  found, a Mann-Whitney test on severities) ([data analysis](https://arxiv.org/html/2506.16345v1#S3.SS3)).
  The per-screenshot CSV sheets were joined into one; the paper does not say by what means.
- **People:** three experts (two with doctorates in human-computer interaction, one master's
  student specialised in it) had run a collaborative heuristic evaluation earlier and agreed the
  severities in discussion; their 66 issues are the reference
  ([planning](https://arxiv.org/html/2506.16345v1#S3.SS1)). The authors chose the screenshots,
  wrote the prompt, and four of them (three with doctorates, one holding a master's) sorted the
  model's issues: one grouped repeats and a second reviewed the grouping; one marked false
  positives and a second reviewed; one matched the rest to the expert list, a third reviewed, and
  two others settled the disagreements ([execution](https://arxiv.org/html/2506.16345v1#S3.SS2)).
  They also ran a thematic analysis of the model-only issues and the false positives
  ([data analysis](https://arxiv.org/html/2506.16345v1#S3.SS3)).

## How it was checked

Experts were the yardstick, through the list from their earlier review; they did not see the
model's output. The authors counted an issue as shared when they judged that a model issue and an
expert issue described the same problem; the matched pairs in Table 3 often name other heuristics
and severities ([Table 3](https://arxiv.org/html/2506.16345v1#S4.T3)). They did not weigh severity
while classifying ([execution](https://arxiv.org/html/2506.16345v1#S3.SS2)). A model
issue was a false positive when the reviewers found no such problem on the screenshot, when it could
only be seen by using the system, or when it was too vague to locate; for the second kind they
checked the live system ([RQ3](https://arxiv.org/html/2506.16345v1#S4.SS4)). Disagreements were
settled by discussion; no agreement statistic between the reviewers is given. A chi-square test
compared which issues each side found and a Mann-Whitney test compared the severities
([RQ1](https://arxiv.org/html/2506.16345v1#S4.SS2)).

## Numbers

| Number | What it counts | Basis | Source |
| --- | --- | --- | --- |
| 20 screenshots | screens of the platform given to the model, one run each | reported | [execution](https://arxiv.org/html/2506.16345v1#S3.SS2) |
| 2 screenshots, 11 issues | the pilot, kept out of the study | reported | [planning](https://arxiv.org/html/2506.16345v1#S3.SS1) |
| 66 issues | problems the three experts found in the earlier review, the reference list | reported | [planning](https://arxiv.org/html/2506.16345v1#S3.SS1) |
| 111 issues | all issues the model returned; 5.55 issues per screenshot on average (SD 1.14 issues) | measured | [overview](https://arxiv.org/html/2506.16345v1#S4.SS1) |
| 43 issues (38.7%) | model issues the authors merged as repeats of one another across screenshots | measured | [overview](https://arxiv.org/html/2506.16345v1#S4.SS1) |
| 27 issues (24.3%) | model issues judged false positives; the percentage is of the 111 issues | measured | [overview](https://arxiv.org/html/2506.16345v1#S4.SS1) |
| 15, 9, 3 issues | false positives by kind: problems the reviewers did not see or did not accept, guesses about behaviour, vague problems | measured | [Table 6](https://arxiv.org/html/2506.16345v1#S4.T6) |
| 41 issues (36.9%) | model issues left after both filters | measured | [overview](https://arxiv.org/html/2506.16345v1#S4.SS1) |
| 14 of 66 issues (21.2%) | expert issues the model also found | measured | [RQ1](https://arxiv.org/html/2506.16345v1#S4.SS2) |
| 27 issues | kept model issues no expert had listed (41 issues minus 14 issues) | measured | [abstract](https://arxiv.org/abs/2506.16345) |
| 31 of 66 issues versus 5 of 41 issues | issues under recognition rather than recall (H6): experts, model | measured | [Table 5](https://arxiv.org/html/2506.16345v1#S4.T5) |
| 14 versus 2 issues; 13 versus 3 issues | issues under flexibility and efficiency (H7), then user control and freedom (H3): experts, model | measured | [Table 5](https://arxiv.org/html/2506.16345v1#S4.T5) |
| 9 versus 6 issues; 7 versus 5 issues | issues under match with the real world (H2), then aesthetic and minimalist design (H8): model, experts | measured | [Table 5](https://arxiv.org/html/2506.16345v1#S4.T5) |
| 0 versus 2 issues | issues under helping users recover from errors (H9): model, experts | measured | [Table 5](https://arxiv.org/html/2506.16345v1#S4.T5) |
| 25 of 66 issues (37.8%) versus 1 of 41 issues | issues tagged with two or more heuristics: experts, model | measured | [RQ1](https://arxiv.org/html/2506.16345v1#S4.SS2) |
| 34.1 score, p < .001 | chi-square value of the test on which issues each side found | measured | [RQ1](https://arxiv.org/html/2506.16345v1#S4.SS2) |
| 11.7 score, p = .205 | Mann-Whitney U on severities, no significant difference | measured | [RQ1](https://arxiv.org/html/2506.16345v1#S4.SS2) |

## What worked

- Some of the issues matched the experts' closely, such as a "Home" link whose meaning is unclear
  and technical terms left unexplained for lay readers
  ([Table 3](https://arxiv.org/html/2506.16345v1#S4.T3)).
- The model added 27 issues the experts had not listed and the authors accepted, mostly about
  feedback and status, labels and navigation, visual clutter, small or unclear controls, and
  content out of context (a label left in English in a translated interface)
  ([RQ2](https://arxiv.org/html/2506.16345v1#S4.SS3)). The authors suggest experts may have grown
  used to the dense interface, while the model applied general design rules
  ([discussion](https://arxiv.org/html/2506.16345v1#S5)).
- It found more than the experts, in share and in count, under two heuristics: fit with real-world
  terms and conventions (9 versus 6 issues) and aesthetic and minimalist design (7 versus 5 issues)
  ([Table 5](https://arxiv.org/html/2506.16345v1#S4.T5)).
- Its severities did not differ significantly from the experts' (but see the reported U value under
  "What went wrong"); both sides rated most issues minor or major ([RQ1](https://arxiv.org/html/2506.16345v1#S4.SS2),
  [Figure 1](https://arxiv.org/html/2506.16345v1#S4.F1)).
- The authors publish the prompt for others to reuse and refine
  ([introduction](https://arxiv.org/html/2506.16345v1#S1)), and link the per-screenshot issues and
  their classification sheets ([overview](https://arxiv.org/html/2506.16345v1#S4.SS1)).

## What went wrong

- The model found only 14 of the 66 expert issues (21.2%), and the chi-square test says the two
  sides found significantly different issues ([RQ1](https://arxiv.org/html/2506.16345v1#S4.SS2)).
- Even on shared issues the two sides often named other heuristics and severities, and the model's
  descriptions were shorter and less argued than the experts', which the authors read as a lack of
  depth ([RQ1](https://arxiv.org/html/2506.16345v1#S4.SS2),
  [discussion](https://arxiv.org/html/2506.16345v1#S5)).
- It was weak on heuristics about using the system: 5 issues against 31 issues for recognition
  rather than recall, 2 issues against 14 issues for flexibility and efficiency, 3 issues against 13 for user control,
  and none for helping users recover from errors (both sides found few help or error issues, which
  the authors read as the system having few). They link the gap partly to the model only seeing
  screenshots ([Table 5](https://arxiv.org/html/2506.16345v1#S4.T5),
  [discussion](https://arxiv.org/html/2506.16345v1#S5)).
- 27 issues of the 111 issues were false positives: 15 issues the reviewers either could not find on the screen
  or did not accept as problems, 9 issues guessing at behaviour a still image cannot show (missing
  feedback on hover or click, missing confirmations), several of which the live system in fact handled, and 3 issues too
  vague to locate. The authors put part of this down to hallucination
  ([RQ3](https://arxiv.org/html/2506.16345v1#S4.SS4),
  [discussion](https://arxiv.org/html/2506.16345v1#S5)).
- 43 issues of the 111 issues (38.7%) repeated an issue already raised on another screenshot
  ([overview](https://arxiv.org/html/2506.16345v1#S4.SS1)).
- The authors name practical costs of the low agreement: less trust in the model, priorities
  pulled toward less critical issues, and more work for experts, who must review everything it
  reports ([discussion](https://arxiv.org/html/2506.16345v1#S5)).
- The severity result may not mean much, the authors say: the system may simply lack cosmetic or
  catastrophic issues, and both sides may favour the middle of the scale
  ([discussion](https://arxiv.org/html/2506.16345v1#S5)).
- Limits the authors state: hallucinations remained after filtering; one dated model version, and later
  versions may give other results with the same prompt; disagreements settled by discussion add
  subjectivity; one web system only; and changing models make the study hard to replicate
  ([limitations](https://arxiv.org/html/2506.16345v1#S5.SS1)).
- The comparison is not like for like (our reading): the experts reviewed the system in an earlier
  study, presumably using it, while the model saw 20 still screens chosen by the authors; the paper
  does not say how many of the 66 expert issues could be seen in those screenshots, so the 21.2%
  mixes misses with issues the model was never shown
  ([planning](https://arxiv.org/html/2506.16345v1#S3.SS1)).
- The judges are the authors (our reading): the same team decided which model issues were real,
  which were false and which matched an expert issue; the paper does not say the original experts
  reviewed the 27 model-only issues. Some matched pairs are loose, such as a dense side menu matched to filters by
  region that make no sense ([Table 3](https://arxiv.org/html/2506.16345v1#S4.T3)).
- One run per screenshot (our reading): the authors say the model behaved reliably and gave
  consistent answers, but report no repeat runs, so how much the list changes from run to run is
  unknown ([execution](https://arxiv.org/html/2506.16345v1#S3.SS2),
  [limitations](https://arxiv.org/html/2506.16345v1#S5.SS1)).
- The chi-square test cannot come out otherwise (our reading): an issue neither side found is not in
  the sample, so the cell for issues missed by both is always empty and the two sides will always
  look different ([Table 4](https://arxiv.org/html/2506.16345v1#S4.T5)).
- Reporting slips (our reading): the 27 issues judged false positives are given as 24.3%, a share of the 111
  issues, though the text says they are of the 68 issues left; the contingency table of the chi-square
  test (28 issues found by both, 80 issues by the experts, a grand total printed as 27 issues where N is 107 issues) does not match
  the 14, 66 and 41 issues reported elsewhere; the text names H7 for aesthetic design, which is H8;
  a U of 11.7 score is implausibly low for groups of 66 and 41 issues with no significant difference;
  the consolidation step says the last two reviewers settled disagreements raised by the second,
  where the third had raised them; the thematic categories list two issues twice and leave out four,
  one of which the text then discusses, and pin a message on the wrong issue ID; the discussion says
  the model found one issue under recognition rather than recall, where Table 5 gives 5 issues;
  Figure 1's severity shares do not fit the counts for the model's issues on that heuristic or the
  experts' on system status; and the body text, Tables 3 and 5 and Figure 1 call the model "GTP-4"
  ([RQ1](https://arxiv.org/html/2506.16345v1#S4.SS2),
  [Table 4](https://arxiv.org/html/2506.16345v1#S4.T5),
  [RQ2](https://arxiv.org/html/2506.16345v1#S4.SS3),
  [discussion](https://arxiv.org/html/2506.16345v1#S5),
  [Figure 1](https://arxiv.org/html/2506.16345v1#S4.F1),
  [execution](https://arxiv.org/html/2506.16345v1#S3.SS2)).
- **Not reported:** cost, tokens and time per screenshot; the playground settings (temperature and
  others); how many expert issues were visible in the screenshots; agreement between the four
  reviewers before discussion; when the experts' review ran and whether the system changed since;
  whether the co-author whose thesis holds the expert review was one of the three experts; the
  full prompt in the paper itself (it is off-site).

## Practices to copy

- [stated] Have a person check every issue a model raises before acting on it; it reports problems that are not there. ([Takeaways](https://arxiv.org/html/2506.16345v1#S5))
- [stated] Use the model as a first pass, then let experts filter it and cover the heuristics it handled poorly (proposed, not yet tested). ([Discussion](https://arxiv.org/html/2506.16345v1#S5))
- [stated] Ask the model for concrete, located examples of each issue, to cut vague findings (proposed, not yet tested). ([Discussion](https://arxiv.org/html/2506.16345v1#S5))
- [ours] Merge a model's repeats across screens before counting its findings; over a third of the raw list were repeats. ([Overview](https://arxiv.org/html/2506.16345v1#S4.SS1))
- [ours] Leave feedback and confirmations to people or a running interface; from still screens the model guessed at them. ([RQ3](https://arxiv.org/html/2506.16345v1#S4.SS4))
- [ours] Before quoting a model's overlap with an expert list, mark which expert issues are visible in what the model was shown. ([Planning](https://arxiv.org/html/2506.16345v1#S3.SS1))
- [ours] Run the model several times per screen before trusting one run's list. ([Execution](https://arxiv.org/html/2506.16345v1#S3.SS2))

## Context

- Model era: GPT-4o, version 2024-08-06, run in November 2024; the authors chose it as one of the leading
  models that could read images at the time ([planning](https://arxiv.org/html/2506.16345v1#S3.SS1)).
- The paper places itself beside a GPT-4o Figma plugin for feedback on mockups, an OpenAI model's review of a
  system's HTML compared with novice reviewers, and an earlier workshop paper by the University of
  Washington team whose later heuristic study is
  [another case here](2025-07-03-uw-synthetic-heuristic-evaluation.md#what-went-wrong)
  ([related work](https://arxiv.org/html/2506.16345v1#S2.SS3)).
- The two studies reach different headlines from a similar setup: there GPT-4 covered more of a
  reference list of problems than five experts pooled; here GPT-4o found a fifth of three experts'
  issues. The reference lists were built differently (our reading)
  ([RQ1](https://arxiv.org/html/2506.16345v1#S4.SS2)).
