---
title: GPT-4 heuristic reviews of two mobile apps cover more issues than five pooled experts but miss half the cross-screen ones
label: UW heuristic review
date: 2025-07-03
org: University of Washington
summary: GPT-4 covered 73% and 77% of known issues against 57% and 63% for five pooled UX experts, yet raised more non-issues and missed cross-screen problems.
source_url: https://arxiv.org/abs/2507.02306
also: [https://arxiv.org/html/2507.02306v1]
source_type: paper
author_relation: independent
evidence: shown-in-source
case_type: study
ai_role: [check]
subject: screenshots of two mobile apps, one for renting a flat and one for learning a language, four user tasks each, reviewed against Nielsen's 10 heuristics
sample: 2 apps, 8 tasks; 10 freelance UX experts (5 per app); five research assistants for the reference set; GPT-4 repeated on two accounts over 3 months; outputs from Claude 3.5 Sonnet and Gemini-1.5-pro (runs unstated)
measures: [issue-coverage, run-stability]
checked_against: [people]
cost: unstated
tools: [UpWork for recruiting, online document template]
models: [GPT-4 (check), Claude 3.5 Sonnet (check), Gemini-1.5-pro (check)]
period: 2024-03..2025-07
outcome: completed
status: current
superseded_by:
---

# GPT-4 heuristic reviews of two mobile apps cover more issues than five pooled experts but miss half the cross-screen ones

Three University of Washington researchers prompted GPT-4 to run a heuristic evaluation (Nielsen's
10 heuristics) on screenshots of two mobile apps and compared it with freelance UX experts
([paper](https://arxiv.org/html/2507.02306v1#S4)). Against a reference set of real problems,
GPT-4 covered 73% and 77% of them; the five experts per app, pooled, covered 57% and 63%; a single
expert covered 18% and 17% on average ([results](https://arxiv.org/html/2507.02306v1#S4.SS3)).
GPT-4's lead over the experts was widest on layout and visual detail, but it raised far more points the authors judged were no
problem at all, misread phone status icons and common app conventions, repeated issues on
every screen where they recurred, and caught only 3 of 7 and 3 of 6 problems that span screens, where the experts
caught 6 and 5 ([cross-screen](https://arxiv.org/html/2507.02306v1#S4.SS3.SSS4)). Given the same prompt,
Gemini-1.5-pro plus Claude 3.5 Sonnet covered 57% to 59% of the issues
([platforms](https://arxiv.org/html/2507.02306v1#S5.SS3.SSS2)).

## Source

A paper by three University of Washington authors (Ruican Zhong first, then David W. McDonald, then
Gary Hsieh), posted to arXiv on 2025-07-03; only that first version exists, and this case was
written from its HTML form, read on 2026-11-14 ([paper](https://arxiv.org/abs/2507.02306)). It is
a preprint: the title block is a blank ACM template with placeholder venue and DOI. Licence: CC BY 4.0. The
paper states no funding or ties, and the authors offer no product (our reading); they test commercial models from OpenAI, Google and Anthropic. The
paper shows its coverage counts per app, per heuristic and per severity in two tables, but
releases no issue lists, model outputs, coding sheets or screenshots beyond four examples. The same
authors later published the walkthrough study in this collection (see Context).

## What was made or studied

Whether a multimodal model can do a heuristic evaluation, where a reviewer checks an interface
against a list of usability principles and rates how bad each breach is (severity 0 means no problem,
severity 4 a catastrophe) ([heuristic evaluation](https://arxiv.org/html/2507.02306v1#S2.SS1)). The
authors took 3 to 9 screenshots of a person using an app for renting flats and one for
learning a language (names not given), four tasks per app, such as setting search preferences or
booking a visit ([procedure](https://arxiv.org/html/2507.02306v1#S4.SS1)). Study 1 compared
GPT-4 with experts; study 2 repeated GPT-4 on two accounts from March 20 to June 17, 2024, and ran
the same prompt on Claude 3.5 Sonnet and Gemini-1.5-pro
([study 2](https://arxiv.org/html/2507.02306v1#S5.SS1)).

## Who did what

- **AI:** GPT-4, named that way with no dated version, wrote the review: for each screen set it listed
  breaches of the first five heuristics, then of the second five, each with a reason and a
  severity from 0 to 4 ([prompts](https://arxiv.org/html/2507.02306v1#S3.T1)). The paper does not
  say how many GPT-4 runs make up the study 1 set, nor whether the models were reached by API or
  chat. The same prompt went to Gemini-1.5-pro plus Claude 3.5 Sonnet
  ([across platform](https://arxiv.org/html/2507.02306v1#S5.SS1.SSS2)).
- **Rule-based tools:** none. The statistics (a logistic mixed model for the drop over tasks, plus
  significance tests the paper does not name) were run by the authors
  ([results](https://arxiv.org/html/2507.02306v1#S4.SS3)).
- **People:** 10 freelance UX experts recruited on UpWork, 5 people per app, screened for
  usability and heuristic evaluation work (self-rated familiarity 4.3 points out of 5 points), each
  paid $30, worked alone in an online document template, with instructions like the model's
  ([expert set](https://arxiv.org/html/2507.02306v1#S4.SS1.SSS2)). Five research assistants
  trained in the method (4+ years of HCI research each) reviewed both apps and pooled their
  findings. The authors iterated the prompt, merged duplicates (one researcher coded, two others
  discussed), and coded each issue's heuristic and severity (the first author coded, three
  researchers agreed the ratings) ([master set](https://arxiv.org/html/2507.02306v1#S4.SS1.SSS3)).

## How it was checked

People curated the yardstick, partly from the model's own output. The reference ("master") set is the union of the experts' issues,
GPT-4's issues and the research assistants' issues, with duplicates merged: 182 issues (rental app)
and 168 issues (language app). The authors then rated each issue's severity
themselves; those rated 0 (not a problem) were set aside, leaving 133 issues and 113 issues
([master set](https://arxiv.org/html/2507.02306v1#S4.SS1.SSS3)). Coverage is the share of those
an evaluator found, for each expert alone, for the five experts pooled and for each model
([results](https://arxiv.org/html/2507.02306v1#S4.SS3)). Gemini and Claude outputs were added to
the set the same way; they brought no new real issue, only more severity 0 ones
([across platform](https://arxiv.org/html/2507.02306v1#S5.SS1.SSS2)). For repeat runs, the first
author coded which issues matched across runs (two researchers cross-checked)
([time and accounts](https://arxiv.org/html/2507.02306v1#S5.SS1.SSS1)); share of the first set
found again, and coverage of the reference set, were then measured
([analyses](https://arxiv.org/html/2507.02306v1#S5.SS2)).

## Numbers

| Number | What it counts | Basis | Source |
| --- | --- | --- | --- |
| 10 experts | freelance UX experts, 5 experts per app | reported | [expert set](https://arxiv.org/html/2507.02306v1#S4.SS1.SSS2) |
| $30 | pay per expert | reported | [expert set](https://arxiv.org/html/2507.02306v1#S4.SS1.SSS2) |
| 182 and 168 issues | unique issues in the reference set, rental then language app, before setting aside severity 0 | measured | [master set](https://arxiv.org/html/2507.02306v1#S4.SS1.SSS3) |
| 133 and 113 issues | real issues (severity 1 to severity 4) in the reference set, rental then language app | measured | [master set](https://arxiv.org/html/2507.02306v1#S4.SS1.SSS3) |
| 73% and 77% | GPT-4's coverage of the real issues, rental (97 of 133 issues) then language app (87 of 113 issues) | measured | [results](https://arxiv.org/html/2507.02306v1#S4.SS3) |
| 57% and 63% | coverage of the five experts pooled, rental (76 of 133 issues) then language app (71 of 113 issues) | measured | [results](https://arxiv.org/html/2507.02306v1#S4.SS3) |
| 18% and 17% | average coverage of one expert alone, rental then language app | measured | [results](https://arxiv.org/html/2507.02306v1#S4.SS3) |
| 43 and 52 issues | GPT-4 issues the authors rated severity 0 (not a problem), rental then language app; the experts had 6 and 3 issues | measured | [master set](https://arxiv.org/html/2507.02306v1#S4.SS1.SSS3) |
| 65%, 6%, 93%, 84% | share of all 147 issues rated severity 0 raised by GPT-4, the pooled experts, Gemini and Claude | measured | [Table 3](https://arxiv.org/html/2507.02306v1#S4.T3) |
| 64% and 71% | coverage of the 14 issues rated severity 4: GPT-4, pooled experts | measured | [Table 3](https://arxiv.org/html/2507.02306v1#S4.T3) |
| 8 and 9 issues | duplicates in GPT-4's output (one issue repeated across screens), rental then language app; the experts had none | measured | [master set](https://arxiv.org/html/2507.02306v1#S4.SS1.SSS3) |
| 86% and 74% | GPT-4's coverage of aesthetic and minimalist design issues, rental then language; pooled experts 38% and 42% | measured | [Table 2](https://arxiv.org/html/2507.02306v1#S4.T2) |
| 46% and 40% | GPT-4's coverage of consistency and standards issues, rental then language; pooled experts 54% and 60% | measured | [Table 2](https://arxiv.org/html/2507.02306v1#S4.T2) |
| 63% and 55% | GPT-4's coverage of user control and freedom issues, rental (5 of 8 issues) then language (6 of 11 issues); pooled experts 88% and 73% | measured | [Table 2](https://arxiv.org/html/2507.02306v1#S4.T2) |
| 82% and 100% | GPT-4's coverage of flexibility and efficiency issues, rental (9 of 11 issues) then language (6 of 6 issues); pooled experts 45% and 50% | measured | [Table 2](https://arxiv.org/html/2507.02306v1#S4.T2) |
| 3 of 7 and 3 of 6 issues | cross-screen issues GPT-4 found, rental then language; the experts found 6 and 5 issues | measured | [cross-screen](https://arxiv.org/html/2507.02306v1#S4.SS3.SSS4.Px2) |
| 31.6% | drop in the experts' performance across the four tasks as the paper states it, from a value printed as OR -0.316 (95% CI -0.60 to -0.03), which cannot be an odds ratio; GPT-4 stayed flat | reported | [over tasks](https://arxiv.org/html/2507.02306v1#S4.SS3.SSS1) |
| 94% to 96% | share of the first GPT-4 issue set found again on each of two accounts (denominators 182 and 164 issues, not explained) | measured | [time and accounts](https://arxiv.org/html/2507.02306v1#S5.SS3.SSS1) |
| 93.86% and 93.90% | mean share of the first set found again over three months, rental then language (SD 0.016 and 0.021 score) | measured | [time and accounts](https://arxiv.org/html/2507.02306v1#S5.SS3.SSS1) |
| 69.55% and 74.85% | mean coverage of the real issues by GPT-4 over three months, rental then language (SD 0.016 and 0.015 score) | measured | [time and accounts](https://arxiv.org/html/2507.02306v1#S5.SS3.SSS1) |
| 59% and 57% | rental coverage: Gemini-1.5-pro, then Claude 3.5 Sonnet | measured | [platforms](https://arxiv.org/html/2507.02306v1#S5.SS3.SSS2) |
| 59% and 58% | language coverage: Gemini-1.5-pro, then Claude 3.5 Sonnet | measured | [platforms](https://arxiv.org/html/2507.02306v1#S5.SS3.SSS2) |

## What worked

- Breaking the task into steps (name the breach, say why it is one, rate its severity) turned
  GPT-4 from praising the screens into listing real breaches
  ([prompt design](https://arxiv.org/html/2507.02306v1#S3)).
- Saying in the prompt that the screenshots come in app order, and to weigh the flow across them,
  made GPT-4 report some cross-screen issues, though not all; splitting the ten heuristics into two
  prompts of five stopped answers being cut off by the output limit
  ([prompts](https://arxiv.org/html/2507.02306v1#S3.T1)).
- GPT-4 alone covered more of the real issues than five experts pooled, on both apps (73% and 77%
  against 57% and 63%) ([results](https://arxiv.org/html/2507.02306v1#S4.SS3)).
- GPT-4 held steady from task to task, while the experts found less as they went on and, in
  examples the authors quote, wrote terser notes when a problem came back ([over tasks](https://arxiv.org/html/2507.02306v1#S4.SS3.SSS1)).
- It caught small layout faults the experts mostly missed, such as uneven padding and weak size
  contrast between two labels ([layout](https://arxiv.org/html/2507.02306v1#S4.SS3.SSS2)).
- Repeated on a second account, GPT-4 found 94% to 96% of its first issue set again (93.86% and
  93.90% on average over three months), and its coverage of the real issues moved little (SD 0.016 score or less)
  ([time and accounts](https://arxiv.org/html/2507.02306v1#S5.SS3.SSS1)).

## What went wrong

- The headline comparison is one model against five experts pooled. One expert alone covered 18%
  and 17% of the real issues; the authors stress that GPT-4 beat each expert, and beat the pool
  ([results](https://arxiv.org/html/2507.02306v1#S4.SS3)).
- GPT-4 raised many points that were no problem at all: 43 issues and 52 issues it raised were
  rated severity 0, against 6 and 3 from the experts; Gemini and Claude raised even more. The
  authors say practitioners must filter these out, and some hand work may remain
  ([master set](https://arxiv.org/html/2507.02306v1#S4.SS1.SSS3),
  [challenges](https://arxiv.org/html/2507.02306v1#S6.SS1)).
- It misread what was on screen: it treated the phone's Wi-Fi and battery icons as part of the
  app, took a banner for a button, and missed that clock icons labelled time options; 42% and
  27% of its severity 0 issues came from this
  ([components](https://arxiv.org/html/2507.02306v1#S4.SS3.SSS3.Px1)).
- It did not know common app conventions: it flagged a deliberately bright map and list toggle and
  a standard solid button beside a link-styled login as faults; 42% and 38% of its
  severity 0 issues came from this ([conventions](https://arxiv.org/html/2507.02306v1#S4.SS3.SSS3.Px2)).
- It repeated issues on every screen where they recurred (8 issues and 9 issues repeated), so
  outputs need merging by hand, and it found only 3 of 7 and 3 of 6 cross-screen issues against 6
  and 5 for the experts; every cross-screen issue it missed broke consistency and standards, its
  weakest heuristic. The authors think it may treat each screen as a separate item, and put the
  cross-screen gap at least partly down to their own prompt, which they say could be improved
  ([cross-screen](https://arxiv.org/html/2507.02306v1#S4.SS3.SSS4)).
- The experts beat GPT-4 on some heuristics, among them user control and freedom (88% and 73%
  against 63% and 55%), and on the 14 issues rated most severe (10 issues against 9 issues)
  ([Table 2](https://arxiv.org/html/2507.02306v1#S4.T2), [Table 3](https://arxiv.org/html/2507.02306v1#S4.T3)).
- First prompts failed: a short prompt drew praise instead of breaches, the first working prompt
  ignored the flow across screens, and long answers were cut off by the output limit
  ([prompt design](https://arxiv.org/html/2507.02306v1#S3)).
- The same prompt did worse on the other models: Gemini-1.5-pro plus Claude 3.5 Sonnet covered 57%
  to 59% of the real issues, about the pooled experts on the rental app and below them on the
  language app; the authors think the prompt, tuned on GPT-4, may need changing per model, or that
  the models' training differs
  ([platforms](https://arxiv.org/html/2507.02306v1#S5.SS3.SSS2),
  [discussion](https://arxiv.org/html/2507.02306v1#S6)).
- Limits the authors state: only two common kinds of app were tested, and model updates may change
  results and call for new prompts ([limitations](https://arxiv.org/html/2507.02306v1#S7)).
- The yardstick favours the model (our reading): GPT-4's own issues are part of the reference set,
  so any real issue only it raised counts for it, and the authors, not outside raters, decided
  which issues were real; no agreement figure between coders is given
  ([master set](https://arxiv.org/html/2507.02306v1#S4.SS1.SSS3)).
- On the rental app the study 1 figure sits above the repeat runs (our reading): 73% against
  70% and 71% on the two accounts and 69.55% on average over three months; on the language app
  both accounts matched the 77%, and only the three-month mean (74.85%) is lower
  ([time and accounts](https://arxiv.org/html/2507.02306v1#S5.SS3.SSS1)).
- The tasks differed (our reading): the model was told to list at least two problems for every
  heuristic, in two passes, while the experts got no minimum and were also asked for fixes
  ([prompts](https://arxiv.org/html/2507.02306v1#S3.T1),
  [expert set](https://arxiv.org/html/2507.02306v1#S4.SS1.SSS2)).
- Claims beyond the data (our reading): the authors call the method high in quality at very low
  cost and say task count and complexity need not worry practitioners, but measure no cost or
  time; they say all three models matched or beat the pooled experts, yet on the language app
  Claude and Gemini fell below them ([benefits](https://arxiv.org/html/2507.02306v1#S6.SS1),
  [discussion](https://arxiv.org/html/2507.02306v1#S6)).
- Small sample (our reading): two apps, 10 experts paid $30 each working from screenshots, and
  one reference set per app; the screenshots were taken by the authors, and the models never used
  a live app ([procedure](https://arxiv.org/html/2507.02306v1#S4.SS1)).
- Reporting slips (our reading): GPT-4's language coverage is 77% (87 of 113 issues) in section 4
  and 78% (88 of 113 issues) in section 5; the drop in expert performance is given as a negative
  odds ratio; the severity 0 total is called rental twice where the second is the language app;
  the text swaps Tables 2 and 3; it says GPT-4 beat Gemini and Claude on all heuristics, but
  Table 2 shows all three equal on five rows of twenty (error prevention, and help and
  documentation, on both apps; recognition on the rental app); and it calls the larger severity 0
  counts of Gemini and Claude not significant without naming a test; the repeat-run shares use
  denominators of 182 issues and 164 issues, the first the whole rental set and the second no count
  given anywhere; the Table 2 caption speaks of the average expert while its column is the pool of
  five; and the text cites Figure 4 twice where Figures 3 and 4 are meant
  ([over tasks](https://arxiv.org/html/2507.02306v1#S4.SS3.SSS1),
  [across platform](https://arxiv.org/html/2507.02306v1#S5.SS1.SSS2),
  [platforms](https://arxiv.org/html/2507.02306v1#S5.SS3.SSS2),
  [Table 2](https://arxiv.org/html/2507.02306v1#S4.T2),
  [time and accounts](https://arxiv.org/html/2507.02306v1#S5.SS3.SSS1)).
- **Not reported:** dated model versions, settings and access route (API or chat); how many GPT-4 runs
  make up the study 1 set, how many repeats ran over three months, and how many Claude and Gemini
  runs were made; API cost and time against
  the experts' hours; when study 1 and the cross-platform runs ran; the app names; how many issues
  only the research assistants found; agreement between coders on duplicates and severity; which
  test gave the p-values; how many issues the experts and GPT-4 raised that the other did not; the
  per-task values behind Figure 5 ([Figure 5](https://arxiv.org/html/2507.02306v1#S4.F5)).

## Practices to copy

- [stated] Ask the model to name each breach, say why it breaks the heuristic and rate its severity, not just to do a heuristic review. ([Prompt design](https://arxiv.org/html/2507.02306v1#S3))
- [stated] Give screenshots in the order the app shows them and tell the model to weigh the flow across screens. ([Prompts](https://arxiv.org/html/2507.02306v1#S3.T1))
- [stated] Split the heuristics over two prompts when long answers get cut off by the output limit. ([Prompt design](https://arxiv.org/html/2507.02306v1#S3))
- [stated] Merge a model's repeated issues and remove its non-issues before acting on its list; plan for that hand work. ([Challenges](https://arxiv.org/html/2507.02306v1#S6.SS1))
- [stated] Look hard at model findings about recognising components and app conventions, and at cross-screen consistency it may miss. ([Challenges](https://arxiv.org/html/2507.02306v1#S6.SS1))
- [stated] Repeat the model's review over time and accounts and measure how much of the first result comes back. ([Discussion](https://arxiv.org/html/2507.02306v1#S6))
- [ours] Compare a model reviewer with single experts as well as with a pool, and count its non-issues beside its coverage. ([Results](https://arxiv.org/html/2507.02306v1#S4.SS3))
- [ours] Build the reference list of issues with people who did not see the model's output, so its own findings do not set the bar. ([Master set](https://arxiv.org/html/2507.02306v1#S4.SS1.SSS3))
- [ours] Re-test a tuned review prompt on each new model before switching; the same prompt lost coverage on other models. ([Platforms](https://arxiv.org/html/2507.02306v1#S5.SS3.SSS2))

## Context

- Model era: GPT-4, Claude 3.5 Sonnet, Gemini-1.5-pro; the paper dates only the repeat runs
  (March 20 to June 17, 2024), so `period` runs from those to the posting in July 2025
  ([time and accounts](https://arxiv.org/html/2507.02306v1#S5.SS1.SSS1)).
- The same three authors later had LLM agents walk two mobile apps in place of people; that study
  found the models voiced far fewer doubts than people unless asked for a rating per screen:
  [Synthetic Cognitive Walkthrough](2025-12-03-uw-synthetic-cognitive-walkthrough.md#what-went-wrong).
- The paper cites the classic finding that one expert finds 20% to 50% of problems and five
  together 55% to 90%; this study's single experts (18% and 17%) sit below that range
  ([heuristic evaluation](https://arxiv.org/html/2507.02306v1#S2.SS1),
  [results](https://arxiv.org/html/2507.02306v1#S4.SS3)).
