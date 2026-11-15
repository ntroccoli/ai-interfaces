---
title: Anthropic adds a planner and a Playwright grading agent to Claude app builds; by the engineer's account the game maker works where a solo run broke, at over 20x the cost
label: Anthropic harness
date: 2026-03-24
org: Anthropic
summary: A Claude grader clicking through each sprint filed bugs and the game played where a solo run broke; the grader needed tuning, missed bugs, cost over 20x.
source_url: https://www.anthropic.com/research/harness-design-long-running-apps
also: [https://www.anthropic.com/engineering/harness-design-long-running-apps]
source_type: engineering-post
author_relation: seller-of-tool
evidence: assertion-only
case_type: product
ai_role: [design, build, check, judge]
subject: web front ends from a one-line prompt, then two full-stack browser apps (a retro game maker and a music workstation) built by Claude agents
sample: 2 full-stack apps built with the harness and 1 solo run for comparison; front-end runs of 5 to 15 iterations each, number of runs unstated
measures: [function, cost]
checked_against: [model]
cost: game maker $9 solo against $200 with the harness; music workstation $124.70 in tokens
tools: [Claude Agent SDK, Playwright MCP, frontend design skill, git, React, Vite, FastAPI, SQLite, PostgreSQL]
models: [Claude Opus 4.5 (design/build/check/judge), Opus 4.6 (design/build/check/judge)]
period: unstated
outcome: completed
status: current
superseded_by:
---

# Anthropic adds a planner and a Playwright grading agent to Claude app builds; by the engineer's account the game maker works where a solo run broke, at over 20x the cost

An Anthropic Labs engineer split Claude's work on interfaces between an agent that builds and a
separate agent that grades, after finding that a model judging its own output tends to praise it
([post](https://www.anthropic.com/research/harness-design-long-running-apps#why-naive-implementations-fall-short)).
For front ends the grader scored pages on four written criteria after driving them in a browser;
for whole apps a planner wrote the spec and the grader tested each chunk against agreed criteria.
On one prompt for a retro game maker, the solo run took 20 minutes and $9 and its game did not
respond to input; the harness took 6 hours and $200 and the game played
([running](https://www.anthropic.com/research/harness-design-long-running-apps#running-the-harness)).
The grader needed several rounds of prompt tuning and still missed bugs. For Opus 4.6 the
engineer dropped the sprint structure; a music workstation, its model implied but not named, then took 3 hours 50 minutes and
$124.70 ([results](https://www.anthropic.com/research/harness-design-long-running-apps#results-from-the-updated-harness)).

## Source

An engineering post by Prithvi Rajasekaran of the Anthropic Labs team, published on 2026-03-24 at
the engineering address, which now redirects to the research address used here; read on
2026-11-14 ([post](https://www.anthropic.com/research/harness-design-long-running-apps)).
Anthropic sells Claude models and its Agent SDK, both used here, publishes the frontend
design skill it used, and the post promotes them; this collection's own cases are drafted by Claude, an Anthropic
model. The post shows two cost tables, three example grader findings, two excerpts of QA feedback,
screenshots and two videos, but no full logs, scores or counts of bugs, and it states no licence. Its images have no alt text and
the videos were not watched for this case.

## What was made or studied

Two linked experiments in getting Claude to build interfaces without a person in the loop
([intro](https://www.anthropic.com/research/harness-design-long-running-apps)). First, single
front ends (HTML, CSS and JavaScript) from a user prompt, graded on design quality, originality,
craft and functionality, with design and originality weighted most because Claude already did
well on the other two
([front end](https://www.anthropic.com/research/harness-design-long-running-apps#frontend-design-making-subjective-quality-gradable)).
Second, full-stack apps built over hours from a prompt of 1 to 4 sentences: a two-dimensional retro game maker
(editors for levels and sprites, entity behaviours, a play mode), compared with a solo agent on the same
prompt, and later a music workstation in the browser on the Web Audio API
([architecture](https://www.anthropic.com/research/harness-design-long-running-apps#the-architecture),
[running](https://www.anthropic.com/research/harness-design-long-running-apps#running-the-harness),
[results](https://www.anthropic.com/research/harness-design-long-running-apps#results-from-the-updated-harness)).
The aim was a harness that holds up both where quality is a matter of taste and where it can be
tested.

## Who did what

- **AI:** Claude agents in three roles. A planner turned the short prompt into a product spec and,
  using the frontend design skill, a visual style for the whole app; it was also asked to add
  AI features. A generator built the app (React, Vite, FastAPI, SQLite, later PostgreSQL) one
  feature per sprint and checked its own work before handing over. An evaluator negotiated a
  contract with the generator before each sprint, then drove the running app through the
  Playwright MCP, tested interface, API and database, filed bugs and scored criteria (how deep
  the product went, whether it works, its look, its code) against thresholds
  ([architecture](https://www.anthropic.com/research/harness-design-long-running-apps#the-architecture)).
  The game maker ran on Claude Opus 4.5; the post does not name the model of the front-end runs,
  and says the later harness was simplified for Opus 4.6 without stating in so many words that the
  music run used it
  ([running](https://www.anthropic.com/research/harness-design-long-running-apps#running-the-harness),
  [iterating](https://www.anthropic.com/research/harness-design-long-running-apps#iterating-on-the-harness)).
- **Rule-based tools:** the Claude Agent SDK for orchestration, with its automatic compaction
  of context (a summary the model writes, triggered by the SDK); Playwright, driven by the evaluator; git for the generator; agents passing work through
  files they wrote and read in turn
  ([architecture](https://www.anthropic.com/research/harness-design-long-running-apps#the-architecture)).
  The post does not say whether code or the model applied the score thresholds.
- **People:** the engineer wrote the grading criteria, calibrated the evaluator with scored
  few-shot examples, read its logs and rewrote its prompt over several rounds where its verdicts
  differed from his, wrote the one-line app prompts, and judged the finished apps by using them
  ([front end](https://www.anthropic.com/research/harness-design-long-running-apps#frontend-design-making-subjective-quality-gradable),
  [running](https://www.anthropic.com/research/harness-design-long-running-apps#running-the-harness)).
  Colleagues are thanked for contributions without roles.

## How it was checked

Inside the loop a model checked the model: the evaluator agent clicked through the live app,
tested the criteria in each sprint contract and scored each grading criterion, and a sprint below
any threshold went back to the generator
([architecture](https://www.anthropic.com/research/harness-design-long-running-apps#the-architecture)).
The one person checking was the engineer: he tuned the evaluator against his own judgement, and
compared the solo and harness game makers by opening and using both on the same prompt; on
front ends he compared first iterations with an unprompted baseline and ranked iterations by
his own taste
([running](https://www.anthropic.com/research/harness-design-long-running-apps#running-the-harness),
[front end](https://www.anthropic.com/research/harness-design-long-running-apps#frontend-design-making-subjective-quality-gradable)).
No users, raters or counts of agreement are reported; the post reports one prompt per app and
one run per setup, judged by its author, and no solo run of the music workstation
([results](https://www.anthropic.com/research/harness-design-long-running-apps#results-from-the-updated-harness)).

## Numbers

| Number | What it counts | Basis | Source |
| --- | --- | --- | --- |
| 4 criteria | grading criteria for front ends, given to generator and evaluator | reported | [front end](https://www.anthropic.com/research/harness-design-long-running-apps#frontend-design-making-subjective-quality-gradable) |
| 5 to 15 iterations | generate-and-grade cycles per front-end generation | reported | [front end](https://www.anthropic.com/research/harness-design-long-running-apps#frontend-design-making-subjective-quality-gradable) |
| up to 4 hours | length of a full front-end run | reported | [front end](https://www.anthropic.com/research/harness-design-long-running-apps#frontend-design-making-subjective-quality-gradable) |
| 1 to 4 sentences | length of the prompt the planner expands | reported | [architecture](https://www.anthropic.com/research/harness-design-long-running-apps#the-architecture) |
| 20 minutes, $9 | solo agent run of the game maker: time and cost | reported | [running](https://www.anthropic.com/research/harness-design-long-running-apps#running-the-harness) |
| 6 hours, $200 | full harness run of the game maker: time and cost | reported | [running](https://www.anthropic.com/research/harness-design-long-running-apps#running-the-harness) |
| over 20x | cost of the harness run against the solo run | reported | [running](https://www.anthropic.com/research/harness-design-long-running-apps#running-the-harness) |
| 16 features in 10 sprints | the planner's spec for the game maker | reported | [running](https://www.anthropic.com/research/harness-design-long-running-apps#running-the-harness) |
| 27 criteria | contract test criteria for the level editor in the third sprint alone | reported | [running](https://www.anthropic.com/research/harness-design-long-running-apps#running-the-harness) |
| 3 findings | example evaluator findings shown, all fails with the code cause | reported | [running](https://www.anthropic.com/research/harness-design-long-running-apps#running-the-harness) |
| 4.7 minutes, $0.46 | music workstation: planner | reported | [results](https://www.anthropic.com/research/harness-design-long-running-apps#results-from-the-updated-harness) |
| 2 hours 7 minutes, $71.08 | music workstation: build, round 1 | reported | [results](https://www.anthropic.com/research/harness-design-long-running-apps#results-from-the-updated-harness) |
| 8.8 minutes, $3.24 | music workstation: QA, round 1 | reported | [results](https://www.anthropic.com/research/harness-design-long-running-apps#results-from-the-updated-harness) |
| 1 hour 2 minutes, $36.89 | music workstation: build, round 2 | reported | [results](https://www.anthropic.com/research/harness-design-long-running-apps#results-from-the-updated-harness) |
| 6.8 minutes, $3.09 | music workstation: QA, round 2 | reported | [results](https://www.anthropic.com/research/harness-design-long-running-apps#results-from-the-updated-harness) |
| 10.9 minutes, $5.88 | music workstation: build, round 3 | reported | [results](https://www.anthropic.com/research/harness-design-long-running-apps#results-from-the-updated-harness) |
| 9.6 minutes, $4.06 | music workstation: QA, round 3 | reported | [results](https://www.anthropic.com/research/harness-design-long-running-apps#results-from-the-updated-harness) |
| over 2 hours | how long the builder of the music workstation ran coherently without sprints | reported | [results](https://www.anthropic.com/research/harness-design-long-running-apps#results-from-the-updated-harness) |
| 3 hours 50 minutes, $124.70 | music workstation: whole run (the text rounds it to $124 in tokens over about 4 hours) | reported | [results](https://www.anthropic.com/research/harness-design-long-running-apps#results-from-the-updated-harness) |

## What worked

- In the game maker built with the harness the game could be played, which the solo run's could
  not; the canvas filled the window, panels were sized sensibly, the look stayed consistent with
  the spec's design direction, and the sprite editor offered more, with tidier tool palettes, an improved colour picker and
  easier zooming, by the engineer's account
  ([running](https://www.anthropic.com/research/harness-design-long-running-apps#running-the-harness)).
- The evaluator's findings named the failing criterion and the cause in the code (a fill tool
  that placed tiles only at the ends of a drag, a delete key handler with the wrong condition, an
  API route declared in an order that broke it), concrete enough that no further
  investigation was needed to act
  ([running](https://www.anthropic.com/research/harness-design-long-running-apps#running-the-harness)).
- Scoring against written criteria gave the grader something concrete: on front ends the evaluator's
  scores generally rose over iterations, and in one run for a museum site the 10th iteration replaced a polished
  dark page with a three-dimensional gallery walked through doorways, a leap the engineer had not seen from a
  single pass
  ([front end](https://www.anthropic.com/research/harness-design-long-running-apps#frontend-design-making-subjective-quality-gradable)).
- The criteria helped before any feedback: first iterations already looked better than an
  unprompted baseline, by the engineer's judgement
  ([front end](https://www.anthropic.com/research/harness-design-long-running-apps#frontend-design-making-subjective-quality-gradable)).
- The planner kept its value: without it the generator started building at once and made an app
  with fewer features
  ([sprints](https://www.anthropic.com/research/harness-design-long-running-apps#removing-the-sprint-construct)).
- For Opus 4.6 the sprints could go and the evaluator moved from one check per sprint to a pass
  at the end (the cost table shows three build and QA rounds); the builder ran coherently for
  over 2 hours; in the music workstation the evaluator still found core features that were missing
  or shown but inert, its three rounds costing $10.39, about 8% of the run's cost (our sum of the
  table)
  ([sprints](https://www.anthropic.com/research/harness-design-long-running-apps#removing-the-sprint-construct),
  [results](https://www.anthropic.com/research/harness-design-long-running-apps#results-from-the-updated-harness)).
- The music workstation had a mixer, transport controls and an arrangement view that worked, and its built-in
  agent could compose a short song through tools on request
  ([results](https://www.anthropic.com/research/harness-design-long-running-apps#results-from-the-updated-harness)).

## What went wrong

- Asked to grade their own work, agents tend to praise it, even when a person would plainly call
  it mediocre, most of all on design; even on tasks that can be tested, agents sometimes judge
  badly enough to hurt the result; a separate evaluator was still a model inclined to go easy on model
  output and had to be tuned to be sceptical
  ([naive](https://www.anthropic.com/research/harness-design-long-running-apps#why-naive-implementations-fall-short)).
- Without the harness, Claude's front ends drift to safe, predictable layouts that work but look
  plain, and on design and originality are bland
  ([front end](https://www.anthropic.com/research/harness-design-long-running-apps#frontend-design-making-subjective-quality-gradable)).
- Untuned, Claude made a poor QA agent: it found real problems, then argued itself into
  approving the work, and tested on the surface so subtler bugs got through. Several rounds of
  prompt tuning were needed, and even then small layout issues, awkward interactions and bugs in
  deeply nested features the evaluator had not exercised remained
  ([running](https://www.anthropic.com/research/harness-design-long-running-apps#running-the-harness)).
- The solo game maker looked right at first but its fixed-height panels left most of the window empty, gave no
  guidance through a rigid workflow, and its game ignored input because the wiring from entity
  definitions to the running game had broken, with nothing on screen showing where
  ([running](https://www.anthropic.com/research/harness-design-long-running-apps#running-the-harness)).
- The harness game maker kept part of that: nothing showed that sprites and entities had to exist
  before a level could be filled, which the engineer found by poking around and put down to the
  base model's product sense; a character overlapped a platform after a jump; and a level the
  app's AI built had a wall too high to pass
  ([running](https://www.anthropic.com/research/harness-design-long-running-apps#running-the-harness)).
- Cost: over 20x the solo run's money and 6 hours against 20 minutes for the game maker; the
  engineer calls the first harness bulky, slow and expensive, and the music workstation still
  took close to 4 hours and $124.70, which he calls lengthy and expensive; front-end runs took up
  to 4 hours because the grader drove the live page each cycle
  ([front end](https://www.anthropic.com/research/harness-design-long-running-apps#frontend-design-making-subjective-quality-gradable),
  [running](https://www.anthropic.com/research/harness-design-long-running-apps#running-the-harness),
  [results](https://www.anthropic.com/research/harness-design-long-running-apps#results-from-the-updated-harness),
  [iterating](https://www.anthropic.com/research/harness-design-long-running-apps#iterating-on-the-harness)).
- Front-end grading had limits: the engineer grants that no score fully captures looks, and that
  tastes vary; scores levelled off with room left, progress was not steady, the
  engineer often liked a middle iteration more than the last, the code grew more complex each
  round, and a phrase in the criteria about museum quality pulled designs toward one look
  ([front end](https://www.anthropic.com/research/harness-design-long-running-apps#frontend-design-making-subjective-quality-gradable)).
- A first attempt to simplify the harness by cutting it back hard did not match the original's
  results and made it hard to tell which parts mattered; he then removed one part at a time and
  reviewed the effect of each
  ([iterating](https://www.anthropic.com/research/harness-design-long-running-apps#iterating-on-the-harness)).
- With Opus 4.6 the evaluator was overhead for work the model already did well alone; it paid
  only where the work sat near the limit of the generator
  ([sprints](https://www.anthropic.com/research/harness-design-long-running-apps#removing-the-sprint-construct)).
- A working in-app agent, one that drives the app through tools, came out of the generator only after
  much prompt tuning, since Claude's training data covers that topic thinly
  ([sprints](https://www.anthropic.com/research/harness-design-long-running-apps#removing-the-sprint-construct)).
- The music workstation's generator left features as stubs: in round 1 clips could not be dragged
  and instrument panels and effect editors were missing; in round 2 recording was a stub, clip
  resize and split were missing and effects were plain sliders. The engineer says the result falls well
  short of a professional tool, the agent composes poorly, and Claude cannot hear, so the QA loop could not
  judge musical taste
  ([results](https://www.anthropic.com/research/harness-design-long-running-apps#results-from-the-updated-harness)).
- On complex tasks agents still drift over time and lose coherence as their context fills; earlier
  work found Claude Sonnet 4.5 wrapping up early near its context limit, compaction alone did not
  fix it, so context resets were needed, at a cost in complexity, tokens and latency; Opus 4.5 largely
  stopped doing so
  ([naive](https://www.anthropic.com/research/harness-design-long-running-apps#why-naive-implementations-fall-short),
  [architecture](https://www.anthropic.com/research/harness-design-long-running-apps#the-architecture)).
- One reported prompt per app, one reported run per setup, and the only person judging was the author, at the
  company that sells the model (our reading)
  ([running](https://www.anthropic.com/research/harness-design-long-running-apps#running-the-harness)).
- **Not reported:** any evaluator scores or threshold values; how many front-end runs there were
  and the model they used; how many bugs the evaluator found, how many it missed and how many of
  its findings were wrong; whether the final music workstation round passed; a solo run of the
  music workstation; token counts and the cost of the front-end runs; how many tuning rounds the
  evaluator took, and what that tuning and the failed simplification cost; the weights given to
  each criterion; when the work ran; whether the evaluator flagged the unclear game maker workflow
  ([post](https://www.anthropic.com/research/harness-design-long-running-apps)).

## Practices to copy

- [stated] Keep the agent that builds an interface apart from the agent that grades it, and tune the grader to be sceptical. ([Naive](https://www.anthropic.com/research/harness-design-long-running-apps#why-naive-implementations-fall-short))
- [stated] Write taste down as named grading criteria given to builder and grader, and calibrate the grader with scored examples. ([Front end](https://www.anthropic.com/research/harness-design-long-running-apps#frontend-design-making-subjective-quality-gradable))
- [stated] Let the grading agent use the running app in a browser before it scores. ([Front end](https://www.anthropic.com/research/harness-design-long-running-apps#frontend-design-making-subjective-quality-gradable))
- [stated] Before each piece of work, have builder and grader agree in a file on what done means and how it will be tested. ([Architecture](https://www.anthropic.com/research/harness-design-long-running-apps#the-architecture))
- [stated] Tune a grading agent by reading its logs for verdicts that differ from yours and rewriting its prompt. ([Running](https://www.anthropic.com/research/harness-design-long-running-apps#running-the-harness))
- [stated] When a new model arrives, remove harness parts one at a time and keep only those that still change the result. ([Iterating](https://www.anthropic.com/research/harness-design-long-running-apps#iterating-on-the-harness))
- [ours] Read the wording of grading criteria as part of the design brief: a single phrase can pull designs toward one look. ([Front end](https://www.anthropic.com/research/harness-design-long-running-apps#frontend-design-making-subjective-quality-gradable))
- [ours] Before paying for a multi-agent harness, run a solo agent on the same prompt and record both runs' time and cost. ([Running](https://www.anthropic.com/research/harness-design-long-running-apps#running-the-harness))
- [ours] Walk the whole job as a newcomer after the grader passes; the harness build kept a workflow the screen never explained. ([Running](https://www.anthropic.com/research/harness-design-long-running-apps#running-the-harness))

## Context

- Model era: Claude Opus 4.5 for the first full-stack harness, then a harness cut back for Claude
  Opus 4.6, released while the work ran; the post does not date the runs, so `period` is unstated
  ([running](https://www.anthropic.com/research/harness-design-long-running-apps#running-the-harness),
  [iterating](https://www.anthropic.com/research/harness-design-long-running-apps#iterating-on-the-harness)).
- The work builds on an earlier Anthropic post on harnesses for long-running agents and on the
  company's frontend design skill; the appendix shows the start of the planner's game maker spec
  ([intro](https://www.anthropic.com/research/harness-design-long-running-apps),
  [appendix](https://www.anthropic.com/research/harness-design-long-running-apps#appendix)).
- The evaluator clicks through the app as a user would, but as a tester filing bugs; the post
  reports no doubts or confusion it voiced, and no person other than the engineer using the apps
  ([architecture](https://www.anthropic.com/research/harness-design-long-running-apps#the-architecture)).
