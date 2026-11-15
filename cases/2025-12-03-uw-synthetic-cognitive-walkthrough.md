---
title: GPT-4 and Gemini walk two mobile apps more directly than people and flag fewer failure points until asked to rate confusion
label: UW walkthrough
date: 2025-12-03
org: University of Washington
summary: LLM walkthroughs beat 10 people on app tasks yet raised 3 failure points to their 10; confusion ratings during the walk predicted where people doubted.
source_url: https://arxiv.org/abs/2512.03568
also: [https://arxiv.org/html/2512.03568v1]
source_type: paper
author_relation: independent
evidence: shown-in-source
case_type: study
ai_role: [simulate-user, judge]
subject: two mobile apps, one for learning a language and one for booking trips, given to the models as screenshot sets, six tasks each
sample: 10 participants; 16 LLM runs in study 1; 12 LLM runs in study 2 (3 per model per condition); 2 apps, 12 tasks
measures: [task-cost, judge-agreement]
checked_against: [people]
cost: unstated
tools: [facilitator and evaluator LLM agents, hand-built screen and transition database, Zoom, OtterAI]
models: [Gemini-2.5-pro (simulate-user/judge), GPT-4 (simulate-user/judge)]
period: 2025
outcome: completed
status: current
superseded_by:
---

# GPT-4 and Gemini walk two mobile apps more directly than people and flag fewer failure points until asked to rate confusion

Three University of Washington researchers built a pair of LLM agents, a facilitator and an
evaluator, that step through app screenshots the way a participant does in a cognitive
walkthrough, and compared them with 10 people on two mobile apps
([paper](https://arxiv.org/html/2512.03568v1#S4)). The models completed more tasks (GPT-4 at
100%, Gemini-2.5-pro at 97.2%, people at 88.2%), in fewer steps and on paths nearer the
reference ones, but voiced far less doubt: the people raised 10 failure points between them, all
16 model runs only 3 points ([results](https://arxiv.org/html/2512.03568v1#S4.SS4)). A second study had
the models rate each screen's confusion during the walk; in all six of those runs the ratings
predicted where people had voiced confusion or doubt, with odds ratios from 2.22x to 7.50x, while ratings of single
screens shown without the walk mostly did not
([study 2](https://arxiv.org/html/2512.03568v1#S5.SS4)).

## Source

A paper by three University of Washington authors (Ruican Zhong first, then David W. McDonald, then Gary Hsieh),
posted to arXiv on 2025-12-03; only that first version exists, and this case was written from its
HTML form, read on 2026-11-14 ([paper](https://arxiv.org/abs/2512.03568)). The HTML title block
lists CHI 2026 as the venue with a placeholder DOI. Licence: CC BY 4.0. The authors sell no model
or tool; they test commercial models from OpenAI and Google. The paper shows its statistical
tests, two tables and a results chart, but releases no transcripts, per-task data, screen
database or list of the failure points.

## What was made or studied

Whether LLM agents can stand in for people in a cognitive walkthrough, where an evaluator
narrates each step toward a task on an unfamiliar interface. The authors picked an
app for learning a language and one for booking trips (names not given), wrote 6 tasks per app needing 1 to
38 steps each, 7.4 steps on average, and listed every optimal path as a reference
([procedure](https://arxiv.org/html/2512.03568v1#S4.SS1)). They first explored the apps for likely
failure points and built the tasks around them. Study 1 compared task completion, steps per
completed task, Jensen-Shannon divergence from the reference paths, and the number of failure
points (any rationale showing confusion or doubt, coded by hand)
([measures](https://arxiv.org/html/2512.03568v1#S4.SS2)). Study 2 added a three-level confusion
rating per screen, collapsed to yes or no, and tested it against the screens where people had
voiced confusion or doubt ([study 2](https://arxiv.org/html/2512.03568v1#S5)).

## Who did what

- **AI:** two models, GPT-4 from OpenAI plus Gemini-2.5-pro from Google, named that way with no dated version or date, ran the
  agents (the paper does not say which model ran the facilitator in each run). The evaluator looked at a screenshot and the task, listed and rated the possible next
  actions, picked one and explained why; the facilitator kept it on format, asked why and how
  questions and picked the next screen from the database. Study 1 ran GPT-4 5 runs per app and
  Gemini-2.5-pro 3 runs per app, 16 runs in all; study 2 ran each model 3 runs with the walk
  history and 3 runs on single screens without it
  ([setup](https://arxiv.org/html/2512.03568v1#S4.SS1.SSS1),
  [study 2](https://arxiv.org/html/2512.03568v1#S5.SS1)).
- **Rule-based tools:** a hand-built database of each app's screens and the transitions between
  them; a fixed message sent to the evaluator whenever a loop is detected, and an end to the walk
  after more than 5 loop events (the paper credits the facilitator and does not say whether code or
  the model spots the loop) ([facilitator](https://arxiv.org/html/2512.03568v1#S3.SS1.SSS1), [pipeline](https://arxiv.org/html/2512.03568v1#S3.SS1.SSS3)); the statistics
  (ANOVA with t-tests, mixed-effect models, logistic regression, Cohen's kappa); Zoom to record
  the human sessions, transcribed with the OtterAI service.
- **People:** 10 participants recruited on social media, 5 people per app; no walkthrough
  experience was required and none had used the tested apps before; a researcher ran each session, operated the app on a
  shared screen as the participant directed and asked for more detail when needed. Sessions took
  55 minutes on average and each participant was paid $25
  ([human set](https://arxiv.org/html/2512.03568v1#S4.SS1.SSS2)). The authors designed the tasks
  ([procedure](https://arxiv.org/html/2512.03568v1#S4.SS1)), built the screen database, iterated the
  prompts ([prompt design](https://arxiv.org/html/2512.03568v1#S3.SS1)) and coded the failure points;
  the first author did the thematic analysis with a codebook the team refined
  ([analyses](https://arxiv.org/html/2512.03568v1#S4.SS3)).

## How it was checked

People were the yardstick. Participants got the same tasks and the same instructions the models
were prompted with. Completion was compared with an ANOVA and pairwise t-tests; steps and path
divergence with mixed-effect models at the task level, participant as a random effect
([analyses](https://arxiv.org/html/2512.03568v1#S4.SS3)). In study 2 a mixed-effect logistic
regression took the people's failure point on a screen as the outcome and the model's rating as
the predictor, with task and participant as nested random effects; pairwise Cohen's kappa between
runs measured how steady the ratings were
([study 2 analyses](https://arxiv.org/html/2512.03568v1#S5.SS3)).

## Numbers

| Number | What it counts | Basis | Source |
| --- | --- | --- | --- |
| 10 participants | people who walked the apps, 5 people per app | reported | [human set](https://arxiv.org/html/2512.03568v1#S4.SS1.SSS2) |
| 16 runs | LLM walkthroughs in study 1: GPT-4 5 runs per app, Gemini-2.5-pro 3 runs per app | reported | [LLM set](https://arxiv.org/html/2512.03568v1#S4.SS1.SSS1) |
| 6 tasks | tasks written for each app | reported | [procedure](https://arxiv.org/html/2512.03568v1#S4.SS1) |
| 1 to 38 steps, 7.4 steps on average | steps a task needs on the reference path | reported | [procedure](https://arxiv.org/html/2512.03568v1#S4.SS1) |
| 55 minutes | average length of a human session | reported | [human set](https://arxiv.org/html/2512.03568v1#S4.SS1.SSS2) |
| $25 | pay per participant | reported | [human set](https://arxiv.org/html/2512.03568v1#S4.SS1.SSS2) |
| 88.2%, 100%, 97.2% | mean task completion: people; GPT-4 runs; Gemini-2.5-pro runs | measured | [results](https://arxiv.org/html/2512.03568v1#S4.SS4) |
| 15 of 16 runs | LLM runs that completed every task | measured | [results](https://arxiv.org/html/2512.03568v1#S4.SS4) |
| 6 of 10 participants | people who ran into some difficulty | measured | [results](https://arxiv.org/html/2512.03568v1#S4.SS4) |
| 10.37, 7.56, 7.50 steps | mean steps per completed task: people; GPT-4 runs; Gemini-2.5-pro runs | measured | [results](https://arxiv.org/html/2512.03568v1#S4.SS4) |
| 0.28, 0.05, 0.10 score | mean JS divergence from the reference paths (lower is closer): people; GPT-4 runs; Gemini-2.5-pro runs | measured | [results](https://arxiv.org/html/2512.03568v1#S4.SS4) |
| 7.5, 0.6, 0.5 points | mean failure points voiced per person, per GPT run, per Gemini run | measured | [results](https://arxiv.org/html/2512.03568v1#S4.SS4) |
| 10 versus 3 points | distinct failure points: all people together, all LLM runs together | measured | [results](https://arxiv.org/html/2512.03568v1#S4.SS4) |
| 2 screens of 70 screens | screens rated "very confusing" per GPT run on average in study 2 | measured | [study 2 measures](https://arxiv.org/html/2512.03568v1#S5.SS2) |
| 5.45x to 7.50x | odds ratios of the with-context GPT-4 runs, all three significant | measured | [Table 1](https://arxiv.org/html/2512.03568v1#S5.T1) |
| 2.22x to 5.48x | odds ratios of the with-context Gemini runs in Table 1, all three significant (the text says 2.22x to 4.72x) | measured | [Table 1](https://arxiv.org/html/2512.03568v1#S5.T1) |
| 1.65x to 1.97x | Table 1 values of the without-context GPT-4 runs, one run in three significant | measured | [Table 1](https://arxiv.org/html/2512.03568v1#S5.T1) |
| 1.30x to 2.19x | Table 1 values of the without-context Gemini runs, one run in three significant | measured | [Table 1](https://arxiv.org/html/2512.03568v1#S5.T1) |
| 0.64 and 0.63 score | mean pairwise kappa between with-context runs, GPT-4 runs then Gemini-2.5-pro runs | measured | [results](https://arxiv.org/html/2512.03568v1#S5.SS4) |
| -0.09 to 0.62 score | pairwise kappa between without-context runs in Table 2 | measured | [Table 2](https://arxiv.org/html/2512.03568v1#S5.T2) |

## What worked

- Telling the evaluator to list every plausible next action and rate each before choosing turned
  its first, near-random wandering (it once tapped an advert) into much better navigation;
  it became steady only once loop handling was added too
  ([evaluator](https://arxiv.org/html/2512.03568v1#S3.SS1.SSS2)).
- A fixed facilitator message on detected loops, plus an evaluator rule that a repeated screen
  means a loop, got the agent unstuck ([facilitator](https://arxiv.org/html/2512.03568v1#S3.SS1.SSS1),
  [evaluator](https://arxiv.org/html/2512.03568v1#S3.SS1.SSS2)).
- In the examples the authors give, the models' reasons matched people's: both looked for currency settings under the
  profile, both scrolled to find a podcast, and both hesitated over where to change course level
  ([results](https://arxiv.org/html/2512.03568v1#S4.SS4)).
- Asking for a confusion rating on each screen during the walk made every one of the six
  with-context runs predict the people's failure points, with moderate agreement between runs
  (mean kappa 0.64 and 0.63 score in the text; Table 2 gives 0.61 score for GPT) ([study 2](https://arxiv.org/html/2512.03568v1#S5.SS4)).
- The walk history mattered: with it, the model knew which subtask a screen served and did not
  flag a plain city list as confusing; without it, it did
  ([context](https://arxiv.org/html/2512.03568v1#S5.SS4.SSS1)).

## What went wrong

- The models did not behave like people, which is the point of a walkthrough: they completed more
  tasks (100% and 97.2% against 88.2%), took fewer steps (7.56 and 7.50 steps against 10.37 steps)
  and kept closer to the reference paths (JS 0.05 and 0.10 score against 0.28 score), all
  differences significant ([results](https://arxiv.org/html/2512.03568v1#S4.SS4),
  [discussion](https://arxiv.org/html/2512.03568v1#S6)).
- Asked only to describe what confused them, as people were, the models found few of the problems: people voiced 7.5 failure points each on
  average, GPT runs 0.6 points and Gemini runs 0.5 points; together the people found 10 points and
  all 16 runs together found 3 points ([results](https://arxiv.org/html/2512.03568v1#S4.SS4)).
- Where people explored several plausible options one after another, the models always took the
  single likeliest one, even when they had noted that others were about as likely (one possible reason, the authors say, drawn from two participants' examples). The authors
  suspect their own prompt (weigh every option, then choose) made the model too rational, and did
  not test whether any prompt brings back human-like exploring. They also note the protocols
  differed: the models had to name one next action, while people did not expect to choose one
  ([breadth-first](https://arxiv.org/html/2512.03568v1#S4.SS4.SSS1),
  [discussion](https://arxiv.org/html/2512.03568v1#S6)).
- The comparison was not like for like on memory: the models got the full history of screens,
  moves and reasons, while people worked from memory and some recalled a feature's place wrongly,
  which sent them down wrong paths ([memory](https://arxiv.org/html/2512.03568v1#S4.SS4.SSS2)).
- Naive prompts failed at first: the facilitator gave thin guidance and could not break loops, and
  the evaluator chose paths almost at random and looped on confusing screens; both prompts needed
  several rounds of fixes ([prompt design](https://arxiv.org/html/2512.03568v1#S3.SS1)).
- The authors limit the claim: designers should use the models only where they line up with
  people, and the value rests on how designers read the output
  ([discussion](https://arxiv.org/html/2512.03568v1#S6), [conclusion](https://arxiv.org/html/2512.03568v1#S8)).
- Ratings of single screens without the walk were weak and unsteady: only one run in three per
  model reached significance, and pairwise kappa between those runs ran from -0.09 to 0.62 score
  ([study 2](https://arxiv.org/html/2512.03568v1#S5.SS4), [Table 2](https://arxiv.org/html/2512.03568v1#S5.T2)).
- The models seldom used the top rating: GPT runs called on average 2 screens of 70 screens "very
  confusing", so the three-level scale was cut to two levels
  ([study 2 measures](https://arxiv.org/html/2512.03568v1#S5.SS2)).
- Limits the authors state: each app's screens and transitions were assembled by hand, so the
  agent never drove a live app, and only mobile interfaces were tested; web interfaces may behave
  differently ([limitations](https://arxiv.org/html/2512.03568v1#S7)).
- Small and seeded sample (our reading; the paper does not discuss it): 10 participants, 2 apps,
  12 tasks, and 3 runs per model per condition in study 2; the tasks were written around failure
  points the authors had found, and the reference failure points come from these 10 people only
  ([procedure](https://arxiv.org/html/2512.03568v1#S4.SS1)).
- The two study 2 conditions differ in more than context (our reading): without context the
  models rated the screens people had walked, with context the screens their own walk reached
  ([study 2](https://arxiv.org/html/2512.03568v1#S5.SS1)).
- Reporting slips (our reading): the text gives 2.22x to 4.72x as the with-context Gemini range,
  but Table 1 shows 5.48x for its second run; the three GPT kappa pairs in Table 2 average 0.61
  score, not the 0.64 score in the text; and the text calls the without-context values log odds,
  while Table 1 lists them beside the odds ratios with one caption; and one memory example
  calls the same participant P3, then P1
  ([Table 1](https://arxiv.org/html/2512.03568v1#S5.T1), [Table 2](https://arxiv.org/html/2512.03568v1#S5.T2), [memory](https://arxiv.org/html/2512.03568v1#S4.SS4.SSS2)).
- **Not reported:** the dated model versions and settings; API cost and time per run; the app names;
  the list of the 10 failure points and which 3 the models raised; how many screens the models
  flagged that people did not (false alarms); agreement between coders of the failure points;
  per-task results; when the studies ran; what the error bars in Figure 3 show; which model
  ran the facilitator; how
  ratings on screens a model reached by its own path were matched to people's screens
  ([Figure 3](https://arxiv.org/html/2512.03568v1#S4.F3)).

## Practices to copy

- [stated] Have the simulated user list and rate every plausible next action before it picks one, so its path is not random. ([Evaluator](https://arxiv.org/html/2512.03568v1#S3.SS1.SSS2))
- [stated] Have the facilitator spot loops, answer with a fixed nudge, and end the walk if the agent stays stuck. ([Facilitator](https://arxiv.org/html/2512.03568v1#S3.SS1.SSS1))
- [stated] Ask the agent for an explicit confusion rating on every screen during the walk, besides the doubts it voices. ([Results](https://arxiv.org/html/2512.03568v1#S5.SS4))
- [stated] Give the agent its walk history (screens seen, moves, reasons) when it rates screens; single screens gave weak, unsteady ratings. ([Context](https://arxiv.org/html/2512.03568v1#S5.SS4.SSS1))
- [ours] Read an agent's easy task success in usability work as a warning, not a win: compare where it hesitates with where people do. ([Discussion](https://arxiv.org/html/2512.03568v1#S6))
- [ours] Run each model several times and measure agreement between runs before trusting a per-screen rating. ([Study 2](https://arxiv.org/html/2512.03568v1#S5.SS4))
- [ours] A prompt line asking the agent to be exploratory did not make it explore; test such instructions against people's paths. ([Prompts](https://arxiv.org/html/2512.03568v1#A1.SS1.SSS2))

## Context

- Model era: GPT-4 plus Gemini-2.5-pro, paper posted December 2025; the paper does not date the
  runs, and `period: 2025` is inferred from Gemini-2.5-pro being used
  ([LLM set](https://arxiv.org/html/2512.03568v1#S4.SS1.SSS1)).
- The final evaluator prompt already said to be exploratory, yet the models still picked the
  likeliest option each time ([prompts](https://arxiv.org/html/2512.03568v1#A1.SS1.SSS2)).
- The paper sets itself beside earlier LLM user simulators (SimUser, UXAgent) and an earlier paper
  by the same authors comparing LLM heuristic evaluation with people, which may make a case of its
  own ([related work](https://arxiv.org/html/2512.03568v1#S2.SS2)).
