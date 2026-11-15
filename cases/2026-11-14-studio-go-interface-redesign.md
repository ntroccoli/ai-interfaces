---
title: studio-go's video UI passes every agent-written rule test yet stays costly to use; a newcomer agent and a job walk count it
label: studio-go
date: 2026-11-14
org: studio-go
summary: Agents landed 39 of 40 UI packages (20 of 40 findings complete) with rule tests green, yet jobs stayed long; a newcomer agent and a job walk counted them.
source_url: https://github.com/ntroccoli/ai-interfaces/blob/main/evidence/2026-11-14-studio-go-interface-redesign.md
also: []
source_type: evidence-file
author_relation: maintainer-own
evidence: assertion-only
case_type: product
ai_role: [design, build, change, check, simulate-user]
subject: the local web UI of a single-owner video pipeline, its pages after a first round of fixes and the clickable mocks of a redesign
sample: 1 web app with 1 user (its owner), 6 jobs, 40 audit findings, 6 mockups (65 HTML pages at one count, 32 HTML pages later)
measures: [task-cost, function, consistency, contrast, human-preference, cost]
checked_against: [checker, model]
cost: wall time only, between 14 minutes and roughly 2.5 hours per package for the 12 packages after the job walk; tokens and money not recorded for this work
tools: [Playwright, headless Chrome, jsdom, Go test suite]
models: [Fable 5.2 (design/check/simulate-user), Opus 5.5 (design/build/change/check), Sonnet 5.5 (build/change/check)]
period: 2026-11
outcome: ongoing
status: current
superseded_by:
---

# studio-go's video UI passes every agent-written rule test yet stays costly to use; a newcomer agent and a job walk count it

The maintainer's video pipeline had its local web UI audited and fixed by agents in one night: inventories,
a blind panel of six model seats, 40 findings, 12 tested rules and 39 of 40 packages landed, though a later check found 20 of the 40 findings complete. Every rule test passed, yet the owner found three misses in minutes and
still found the UI cluttered. A model playing a newcomer needed 31 clicks over 14 screens
to set up a channel; half of its 10 ranked changes were new to the audit. A scripted walk of each job became a
test whose counts may never rise, and the owner picked a three-pane layout. Overnight on 2026-11-15, 15 or 16 of 21 build packages landed and most jobs fell to
the mock's counts (channel set-up from 12 clicks to 5 clicks); the owner has yet to try
it
([evidence](https://github.com/ntroccoli/ai-interfaces/blob/main/evidence/2026-11-14-studio-go-interface-redesign.md)).

## Source

The maintainer's own project, kept in a private repository. The source is an evidence file in this collection:
our summary of the project's records (the coordinator's event log, audit and walkthrough reports, the job-walk
test and its baseline, the mock walk reports, the owner's dated decisions, the session status files) and of the
project's written answers to ten questions from this collection, written on 2026-11-14 from copies held in the
maintainer's private archive, and updated on 2026-11-15 from the coordinator's review of the build's first night
and the build's records at that point (per-job counts, the plan, the completed mock's walk). The answers and the
review come from the coordinator who ran the work. Nobody outside the project
has checked any of it. It is never independent evidence and does not count toward a lesson's strength. The
evidence file describes how most counts were taken, but the records behind them are not public, so the case is
marked assertion-only.

## What was made or studied

The UI is a Go server with htmx pages, used every day by one person to run a pipeline that makes faceless videos.
Round 1 audited and polished the existing pages. Round 2 starts from the owner's six jobs (set up a channel,
turn an idea into a video, remake a single shot and pick a take, see what runs and waits, reorder and pause the
queue, handle styles): a written design of five places and one gesture for changing anything, then clickable
mocks in three looks, sheets of layout cards and further layouts, of which the owner picked three panes (a rail
holding the menu and the work in progress, then a list, then the chosen item beside it), now being built in 21
packages by parallel lanes, one per place plus a lane for pipeline and lab work
([Mockups](https://github.com/ntroccoli/ai-interfaces/blob/main/evidence/2026-11-14-studio-go-interface-redesign.md#mockups-and-the-owners-choices)).

## Who did what

- **AI:** a Fable 5.2 coordinator planned, briefed and accepted the work. Sonnet subagents wrote inventories of
  the pages and surveyed prior art per job. Six blind audit seats (five on Opus 5.5, one on Fable 5.2) reported
  alone; a Fable 5.2 session merged them into findings, rules and packages; a fresh-context subagent argued
  against the plan. Workers on Opus 5.5 and Sonnet 5.5 built the packages and reviewed their own code (4 of 28 large packages carry no review record). A Fable session acted as a
  newcomer (named only in the coordinator's handoff); an Opus 5.5 worker wrote the job-walk test; Opus 5.5 sessions built the mocks, Sonnet subagents reviewed mocks, while a Fable 5.2 session drew a second sheet of layout cards. In the round 2 build, a fresh Sonnet subagent argued
  against the plan and Opus 5.5 workers at high effort built the packages
  ([Who did what](https://github.com/ntroccoli/ai-interfaces/blob/main/evidence/2026-11-14-studio-go-interface-redesign.md#who-did-what)).
- **Rule-based tools:** rule tests (19 test functions for the 12 rules) over templates and handlers, with exception markers that
  briefs told workers only to remove; the scripted job walk over HTTP with a committed baseline; caps on database
  statements per page; jsdom walkers that click some of
  the mocks; a contrast script over the mock themes; plan and review-record checks; headless Chrome and Playwright for the newcomer; the Go test suite as the
  merge gate
  ([Who did what](https://github.com/ntroccoli/ai-interfaces/blob/main/evidence/2026-11-14-studio-go-interface-redesign.md#who-did-what)).
- **People:** the owner alone: their complaints, their list of jobs, the audit choices, a short use after round 1, and
  every choice of look after clicking through the mocks. No agent saw a mock rendered; the owner was the first to see one.

## How it was checked

Round 1 was checked by its rule tests (violation counts that may only fall), the Go test suite at each merge, and
a read-only check of every finding against main. Round 2 adds two task-cost measures. The newcomer walk ran on a
demo copy in headless Chrome, clicking freely there, and only loaded pages of the real studio; the project's
coordinator later looked up every main finding of the walk in the audit's synthesis. The job-walk test
drives each job over HTTP using nothing but the controls the pages offer, counts screens, clicks and fields typed, and
fails when a job cannot finish or a count goes above its baseline, which was taken after round 1. The mocks state their counts by the same rules:
script-walked for the console and the later layouts, counted by the worker and reviewed for the gallery and
editorial looks. In the round 2 build each job's count is a ceiling a merge may only lower, and the finished
mock's number for that job is what it aims at; the walk runs no scripts, so the rail's controls were drawn by the server to be
counted. Consistency was counted once by text search over the templates. The owner judged the looks; no one has
measured time per job, and nobody has yet looked at the build's pages
([The scripted job walk](https://github.com/ntroccoli/ai-interfaces/blob/main/evidence/2026-11-14-studio-go-interface-redesign.md#the-scripted-job-walk)).

## Numbers

| Number | What it counts | Basis | Source |
| --- | --- | --- | --- |
| 39 of 40 packages | round 1 packages merged overnight with as many as 8 workers in parallel | reported | [evidence](https://github.com/ntroccoli/ai-interfaces/blob/main/evidence/2026-11-14-studio-go-interface-redesign.md#round-1-audit-and-build) |
| 69 to 40 findings | seat findings merged into problems (33 problems from the seats plus 7 findings added) | reported | [evidence](https://github.com/ntroccoli/ai-interfaces/blob/main/evidence/2026-11-14-studio-go-interface-redesign.md#round-1-audit-and-build) |
| 44 to 0 violations | the largest rule count before and after round 1 (buttons that show their pending work); ten rules ended at zero; the before counts are taken from the coordinator's log, not re-measured | reported | [evidence](https://github.com/ntroccoli/ai-interfaces/blob/main/evidence/2026-11-14-studio-go-interface-redesign.md#rule-violations-before-and-after-round-1) |
| 3 misses | problems the owner found in about ten minutes of use with every rule test green | reported | [evidence](https://github.com/ntroccoli/ai-interfaces/blob/main/evidence/2026-11-14-studio-go-interface-redesign.md#what-the-owner-found-after-round-1) |
| 20 of 40 findings | findings fully built at the first check after round 1, with 17 gaps; 25 findings after a second judgement; verdicts by agents | reported | [evidence](https://github.com/ntroccoli/ai-interfaces/blob/main/evidence/2026-11-14-studio-go-interface-redesign.md#findings-built) |
| 105 to 193 controls | collapsible folds in the templates before and after the interface work, with buttons rising from 352 to 468 buttons; a crude text count | measured | [evidence](https://github.com/ntroccoli/ai-interfaces/blob/main/evidence/2026-11-14-studio-go-interface-redesign.md#consistency-counts) |
| 14 screens, 31 clicks | the newcomer setting up a channel after round 1; 25 of those clicks only confirmed what a chat had drafted | measured | [evidence](https://github.com/ntroccoli/ai-interfaces/blob/main/evidence/2026-11-14-studio-go-interface-redesign.md#the-newcomer-walkthrough) |
| 2 of 6 jobs | jobs the demo did not let the newcomer finish | measured | [evidence](https://github.com/ntroccoli/ai-interfaces/blob/main/evidence/2026-11-14-studio-go-interface-redesign.md#the-newcomer-walkthrough) |
| 5 of 10 changes | the newcomer's ranked changes absent from the 40-finding audit (1 change mostly absent, 3 changes present, 1 change not checked), by the coordinator's search | reported | [evidence](https://github.com/ntroccoli/ai-interfaces/blob/main/evidence/2026-11-14-studio-go-interface-redesign.md#found-by-the-walk-missed-by-the-audit) |
| 19 to 33 windows | height of a finished video's page | measured | [evidence](https://github.com/ntroccoli/ai-interfaces/blob/main/evidence/2026-11-14-studio-go-interface-redesign.md#the-newcomer-walkthrough) |
| 10 screens, 12 clicks | the job-walk test's baseline for setting up a channel, taken after round 1 and unchanged since | measured | [evidence](https://github.com/ntroccoli/ai-interfaces/blob/main/evidence/2026-11-14-studio-go-interface-redesign.md#screens-and-clicks-by-job) |
| 1.0x to 2.6x | the newcomer's clicks over the walk test's, in the four jobs both finished (the project gives 1.2x to 2.6x, leaving out a job at 1 click each) | measured | [evidence](https://github.com/ntroccoli/ai-interfaces/blob/main/evidence/2026-11-14-studio-go-interface-redesign.md#screens-and-clicks-by-job) |
| 5 screens, 5 clicks | setting up a channel in the console mock (shortest route, script-walked); the editorial mock's own count is the same | measured | [evidence](https://github.com/ntroccoli/ai-interfaces/blob/main/evidence/2026-11-14-studio-go-interface-redesign.md#screens-and-clicks-by-job) |
| 3 screens to 1 screen | remaking one shot: the walk test's baseline (7 clicks) against the picked three-pane mock (6 clicks), the build's target | measured | [evidence](https://github.com/ntroccoli/ai-interfaces/blob/main/evidence/2026-11-14-studio-go-interface-redesign.md#screens-and-clicks-by-job) |
| 12 to 5 clicks | setting up a channel in the job walk, from the baseline after round 1 to the round 2 build at the review (10 screens to 2 screens; switching a pane does not add a screen) | measured | [evidence](https://github.com/ntroccoli/ai-interfaces/blob/main/evidence/2026-11-14-studio-go-interface-redesign.md#round-2-build) |
| 4 of 6 jobs | jobs walking at the completed mock's counts by the process review; the count files at the review's commit show 5 of 6 jobs, with the redo job still above | reported | [evidence](https://github.com/ntroccoli/ai-interfaces/blob/main/evidence/2026-11-14-studio-go-interface-redesign.md#round-2-build) |
| 15 of 21 packages | round 2 build packages landed between 22:30 and 03:00 with as many as 6 sessions, by the review (16 packages by the coordinator's handoff); 28 items of 42 items done | reported | [evidence](https://github.com/ntroccoli/ai-interfaces/blob/main/evidence/2026-11-14-studio-go-interface-redesign.md#round-2-build) |
| about 25 requests | round 2 workers pausing for an edit beyond their file list; 3 requests were real design gaps | reported | [evidence](https://github.com/ntroccoli/ai-interfaces/blob/main/evidence/2026-11-14-studio-go-interface-redesign.md#round-2-build) |
| 8 of 15 files | round 2 status files recording low effort for workers all opened at high effort | reported | [evidence](https://github.com/ntroccoli/ai-interfaces/blob/main/evidence/2026-11-14-studio-go-interface-redesign.md#round-2-build) |
| 54 runs | repeats of the six job walks while three test processes ran at once, all with identical counts | measured | [evidence](https://github.com/ntroccoli/ai-interfaces/blob/main/evidence/2026-11-14-studio-go-interface-redesign.md#the-scripted-job-walk) |
| 0 commits | commits since round 1 began whose message mentions a revert, among 271 commits | measured | [evidence](https://github.com/ntroccoli/ai-interfaces/blob/main/evidence/2026-11-14-studio-go-interface-redesign.md#process-counts) |
| 10 runs | gate runs (7 runs full, 3 runs short) lost because main moved during a worker's gate | reported | [evidence](https://github.com/ntroccoli/ai-interfaces/blob/main/evidence/2026-11-14-studio-go-interface-redesign.md#process-counts) |
| 3 of 4 workers | Sonnet workers with something to send that failed at least once to deliver it (every one of the 13 sessions on Opus or Fable delivered) | reported | [evidence](https://github.com/ntroccoli/ai-interfaces/blob/main/evidence/2026-11-14-studio-go-interface-redesign.md#process-counts) |
| 14 minutes to 2.5 hours | wall time per package after the job walk (12 packages), the upper end rounded | reported | [evidence](https://github.com/ntroccoli/ai-interfaces/blob/main/evidence/2026-11-14-studio-go-interface-redesign.md#cost) |
| 29 cards | layout sketch cards in two sheets, made in one 19-minute session plus part of a second; three full looks needed three sessions | reported | [evidence](https://github.com/ntroccoli/ai-interfaces/blob/main/evidence/2026-11-14-studio-go-interface-redesign.md#mockups-and-the-owners-choices) |
| 65 pages | HTML pages in the mock folders at one count; 32 pages after four losing mocks were removed | measured | [evidence](https://github.com/ntroccoli/ai-interfaces/blob/main/evidence/2026-11-14-studio-go-interface-redesign.md#mockups-and-the-owners-choices) |

## What worked

- Rule tests carrying an exception marker in each file kept 40 parallel packages in line and turned progress into counts meant only to fall
  ([What worked](https://github.com/ntroccoli/ai-interfaces/blob/main/evidence/2026-11-14-studio-go-interface-redesign.md#what-worked)).
- A fresh-context challenge of the plan caught files shared by two lanes, a dependency pointing the wrong way and a sweep that would have blocked others before
  the build, though it helped more on mechanics than on design ([Round 1](https://github.com/ntroccoli/ai-interfaces/blob/main/evidence/2026-11-14-studio-go-interface-redesign.md#round-1-audit-and-build)).
- The newcomer walk, kept away from the code, measured what the rule tests and the audit did not: page heights, clicks
  per job, four places disagreeing on what was running; half of its ranked changes were new to the audit
  ([Newcomer](https://github.com/ntroccoli/ai-interfaces/blob/main/evidence/2026-11-14-studio-go-interface-redesign.md#found-by-the-walk-missed-by-the-audit)).
- The job walk turned each job's screens and clicks into a test that fails when a count rises, ran with identical counts on every repeat, and while being written found a product bug; it misses script-made controls and a button hidden under a bar, its walks cannot run in parallel, and the redo job needs an idle studio
  ([Job walk](https://github.com/ntroccoli/ai-interfaces/blob/main/evidence/2026-11-14-studio-go-interface-redesign.md#the-scripted-job-walk)).
- Static mocks walked by the same counting rules let the owner pick and correct a look by clicking before any
  production code changed; every mock job came out at or below the walk test except where it added blending two styles, which the old UI could not do; the mocks are partial, and two mock counts leave out steps the console counts
  ([Screens and clicks](https://github.com/ntroccoli/ai-interfaces/blob/main/evidence/2026-11-14-studio-go-interface-redesign.md#screens-and-clicks-by-job)).
- In the round 2 build the mock's counts became each job's target and the walk's ceilings held them: by the review most jobs matched it, and a ceiling blocked one attempt to shift where a job begins
  ([Round 2 build](https://github.com/ntroccoli/ai-interfaces/blob/main/evidence/2026-11-14-studio-go-interface-redesign.md#round-2-build)).
- A second challenge pass found that the walk, which runs no scripts, could not see the script-drawn side bar; the rail was then drawn by the server and the queue jobs could be counted and lowered
  ([Round 2 build](https://github.com/ntroccoli/ai-interfaces/blob/main/evidence/2026-11-14-studio-go-interface-redesign.md#round-2-build)).
- Old pages kept answering inside the new frame until each place's lane landed, so the product kept working after each merge, with a test that every route answers; the single shared list where lanes register their own entries drew no requests from them
  ([Round 2 build](https://github.com/ntroccoli/ai-interfaces/blob/main/evidence/2026-11-14-studio-go-interface-redesign.md#round-2-build)).
- Plain layout cards let the owner choose by naming which cards to see in detail, at a fraction of the sessions full looks took
  ([Mockups](https://github.com/ntroccoli/ai-interfaces/blob/main/evidence/2026-11-14-studio-go-interface-redesign.md#mockups-and-the-owners-choices)).

## What went wrong

- Counts that only fall were an instruction, not a guard: 13 packages edited the rule-test file itself, and a guard against it was deferred ([Round 1](https://github.com/ntroccoli/ai-interfaces/blob/main/evidence/2026-11-14-studio-go-interface-redesign.md#round-1-audit-and-build)).
- Every rule test was green while the jobs stayed long: the owner found 3 misses in about ten minutes; the
  rules had checked each page's conformance, never what a job costs, and one rule's test covered only half of the
  rule. No agent had worked through a job in the running UI before the owner did
  ([Events](https://github.com/ntroccoli/ai-interfaces/blob/main/evidence/2026-11-14-studio-go-interface-redesign.md#events-and-failures)).
- The job baseline was taken only after round 1, so round 1's effect on each job has no measured before and after
  ([Job walk](https://github.com/ntroccoli/ai-interfaces/blob/main/evidence/2026-11-14-studio-go-interface-redesign.md#the-scripted-job-walk)).
- The plan came from inventories of the existing pages, organised by pipeline step, so it polished that structure
  instead of serving the owner's jobs
  ([Events](https://github.com/ntroccoli/ai-interfaces/blob/main/evidence/2026-11-14-studio-go-interface-redesign.md#events-and-failures)).
- The coordinator's brief steered workers to fold options rather than remove them (the records word the limit
  more and less broadly), so the 14 controls for changing an episode were only
  regrouped into a menu holding 11 choices; across the templates, folds rose from 105 to 193 folds and buttons from 352 to 468 buttons between the start of the interface work and the latest count, which the project reads as the same pattern
  ([Consistency counts](https://github.com/ntroccoli/ai-interfaces/blob/main/evidence/2026-11-14-studio-go-interface-redesign.md#consistency-counts)).
- Every package was judged only by its own brief, and 17 gaps opened between packages; just 20 of the 40 findings
  were complete, and the owner ran into the first gap before anyone checked
  ([What the owner found](https://github.com/ntroccoli/ai-interfaces/blob/main/evidence/2026-11-14-studio-go-interface-redesign.md#what-the-owner-found-after-round-1)).
- The newcomer walk came only after the owner's complaints, and its demo could not finish 2 of 6 jobs until it
  was fixed
  ([Newcomer](https://github.com/ntroccoli/ai-interfaces/blob/main/evidence/2026-11-14-studio-go-interface-redesign.md#the-newcomer-walkthrough)).
- Parallel work cost turns: 10 gate runs wasted because main moved (another record counts 7 green gates), a stale generated stylesheet that broke main
  for everyone, 5 false failures from verifying in the main checkout, and about 20 requests to edit files beyond a
  worker's list
  ([Events](https://github.com/ntroccoli/ai-interfaces/blob/main/evidence/2026-11-14-studio-go-interface-redesign.md#events-and-failures)).
- Sonnet workers dropped messages (3 of the 4 workers with something to send, at least once), two workers marked
  themselves done before merging, and of the packages over 300 changed lines, 4 out of 28 carry no review record
  ([Events](https://github.com/ntroccoli/ai-interfaces/blob/main/evidence/2026-11-14-studio-go-interface-redesign.md#events-and-failures)).
- The coordinator guessed instead of measuring first (a slow page blamed on a card that cost 1 to 2 milliseconds), built a
  research button around an outside tool though the app itself already launches agents, overwrote the owner's clipboard in
  a trial, and replaced a skill step proven on 6 runs with one that failed in front of the owner
  ([Events](https://github.com/ntroccoli/ai-interfaces/blob/main/evidence/2026-11-14-studio-go-interface-redesign.md#events-and-failures)).
- Only the owner's use found several problems: the three misses, a research agent that could not copy out its result, a thumbnail lettered wrongly, and, in the mocks, small text and the wrong typeface
  ([Owner's use](https://github.com/ntroccoli/ai-interfaces/blob/main/evidence/2026-11-14-studio-go-interface-redesign.md#what-only-the-owners-use-found)).
- Blind seats, never given the decisions in force, made 3 proposals that contradicted them, which the synthesis and the challenge pass caught; three pages were reviewed by no seat; parts of 4 complaints of the owner's 9 complaints were out of every seat's reach, and one complaint was
  covered by nothing
  ([Events](https://github.com/ntroccoli/ai-interfaces/blob/main/evidence/2026-11-14-studio-go-interface-redesign.md#events-and-failures)).
- The owner's leave to view pages headlessly was a decision, not a permission rule, so the agent tool's guard
  blocked the mock workers' screenshots; no agent saw any mock rendered, the owner was the first look, and the
  walker behind the first mock counts was committed only later, while the gallery and editorial counts cannot be rerun
  ([Mockups](https://github.com/ntroccoli/ai-interfaces/blob/main/evidence/2026-11-14-studio-go-interface-redesign.md#mockups-and-the-owners-choices)).
- Full mocks in several looks did not match how the owner preferred to decide: they picked from layout cards, and two
  of the three full looks were thrown away; "themes" shown as colours missed a request for different layouts
  ([Method](https://github.com/ntroccoli/ai-interfaces/blob/main/evidence/2026-11-14-studio-go-interface-redesign.md#the-method-in-the-projects-own-view)).
- A word was settled without the owner while that very question was waiting for the owner, and some workers guessed the model and
  context lines in their status files
  ([Events](https://github.com/ntroccoli/ai-interfaces/blob/main/evidence/2026-11-14-studio-go-interface-redesign.md#events-and-failures)).
- Three of the repeated failures still have no automatic check, only a sentence of instructions (four, by the
  record's own table); 2 of the 14 proposals the owner chose failed their own checks in part, and the lessons
  review was the coordinator reviewing its own work
  ([What worked](https://github.com/ntroccoli/ai-interfaces/blob/main/evidence/2026-11-14-studio-go-interface-redesign.md#what-worked)).
- The round 2 plan capped workers at four, yet the same evening 8 packages ran at once at the owner's request; the owner then dropped its waves, each to be followed by their own use, and will test once everything is built
  ([Events](https://github.com/ntroccoli/ai-interfaces/blob/main/evidence/2026-11-14-studio-go-interface-redesign.md#events-and-failures)).
- In the round 2 build, ownership by file list cost about 25 requests from workers pausing for an edit beyond their list, mostly an entry in a shared list, another file's test fixing markup the package had altered deliberately, or a hook in a landed package; just 3 requests were real design gaps
  ([Round 2 build](https://github.com/ntroccoli/ai-interfaces/blob/main/evidence/2026-11-14-studio-go-interface-redesign.md#round-2-build)).
- Status files written by the workers guessed their own effort (8 files of 15 files wrong), the coordinator made three changes of its own without checking them (one left main failing for an hour), a rule against inline shell scripts written down days before was broken again in 16 status files, and the page tests number 422 tests that take four to five minutes per package, with the share that only pins words or markup unmeasured
  ([Round 2 build](https://github.com/ntroccoli/ai-interfaces/blob/main/evidence/2026-11-14-studio-go-interface-redesign.md#round-2-build)).
- No one viewed any page of the build and no new capability was tried with real models ahead of the owner's test, as the owner chose; in the three panes switching a pane does not add a screen, so the fall in screens is partly a change in what is counted [ours]
  ([Round 2 build](https://github.com/ntroccoli/ai-interfaces/blob/main/evidence/2026-11-14-studio-go-interface-redesign.md#round-2-build)).
- **Not reported:** any time per job, for the owner or anyone; the owner's use of the round 2 build; the owner's hours, money, or tokens for this work;
  whether the contradictions the newcomer saw on the
  demo also occur in the real studio; a newcomer walk of any mock or of the build; a count from a person other than
  the owner; whether the build's counts hold on real data rather than the demo; mock layouts at phone width;
  contrast or an accessibility check on the product itself; nested frames (the owner's cards within cards) were
  never counted; plan usage per phase
  ([Limits](https://github.com/ntroccoli/ai-interfaces/blob/main/evidence/2026-11-14-studio-go-interface-redesign.md#limits-of-this-record)).

## Practices to copy

- [stated] Measure what each of the user's jobs costs in screens and clicks, not only whether pages follow rules. ([Events](https://github.com/ntroccoli/ai-interfaces/blob/main/evidence/2026-11-14-studio-go-interface-redesign.md#events-and-failures))
- [stated] Have an agent barred from the code do the user's jobs on a demo copy and log every hesitation. ([Newcomer](https://github.com/ntroccoli/ai-interfaces/blob/main/evidence/2026-11-14-studio-go-interface-redesign.md#the-newcomer-walkthrough))
- [stated] Make the demo able to finish every job before walking it, by hand or by script. ([Job walk](https://github.com/ntroccoli/ai-interfaces/blob/main/evidence/2026-11-14-studio-go-interface-redesign.md#the-scripted-job-walk))
- [stated] Turn the job walk into a test with a committed baseline that a merge may not exceed. ([Job walk](https://github.com/ntroccoli/ai-interfaces/blob/main/evidence/2026-11-14-studio-go-interface-redesign.md#the-scripted-job-walk))
- [stated] Take the job baseline before the first change lands, so the round has a before and after. ([Method](https://github.com/ntroccoli/ai-interfaces/blob/main/evidence/2026-11-14-studio-go-interface-redesign.md#the-method-in-the-projects-own-view))
- [stated] State in the design what each job loses; a brief that only allows folding keeps every option. ([Mockups](https://github.com/ntroccoli/ai-interfaces/blob/main/evidence/2026-11-14-studio-go-interface-redesign.md#mockups-and-the-owners-choices))
- [stated] Offer layout ideas as plain cards and build full mocks only of those the owner names. ([Method](https://github.com/ntroccoli/ai-interfaces/blob/main/evidence/2026-11-14-studio-go-interface-redesign.md#the-method-in-the-projects-own-view))
- [stated] Mock each look as static clickable pages, count the jobs with the same rules, and let the owner pick before building. ([Mockups](https://github.com/ntroccoli/ai-interfaces/blob/main/evidence/2026-11-14-studio-go-interface-redesign.md#mockups-and-the-owners-choices))
- [stated] Before a mock is built for real, list from the code everything the product now does and where each part lands in the new design. ([Method](https://github.com/ntroccoli/ai-interfaces/blob/main/evidence/2026-11-14-studio-go-interface-redesign.md#the-method-in-the-projects-own-view))
- [stated] Check finished work item by item against the plan; a package passing its own brief is not enough. ([What the owner found](https://github.com/ntroccoli/ai-interfaces/blob/main/evidence/2026-11-14-studio-go-interface-redesign.md#what-the-owner-found-after-round-1))
- [stated] Give blind reviewers the decisions already in force. ([Events](https://github.com/ntroccoli/ai-interfaces/blob/main/evidence/2026-11-14-studio-go-interface-redesign.md#events-and-failures))
- [stated] Have every session log which model it ran and how many tokens it spent, in its status file, right from the start. ([Method](https://github.com/ntroccoli/ai-interfaces/blob/main/evidence/2026-11-14-studio-go-interface-redesign.md#the-method-in-the-projects-own-view))
- [stated] Take each session's model and effort from the tool that ran it, not from what the session writes about itself. ([Round 2 build](https://github.com/ntroccoli/ai-interfaces/blob/main/evidence/2026-11-14-studio-go-interface-redesign.md#round-2-build))
- [stated] Draw every control a job needs on the server, or the walker, which runs no scripts, cannot count it. ([Round 2 build](https://github.com/ntroccoli/ai-interfaces/blob/main/evidence/2026-11-14-studio-go-interface-redesign.md#round-2-build))
- [stated] Keep each old page answering inside the new frame until its replacement lands, and move the page's tests in that same merge. ([Round 2 build](https://github.com/ntroccoli/ai-interfaces/blob/main/evidence/2026-11-14-studio-go-interface-redesign.md#round-2-build))
- [stated] Let lanes add their own entries to shared lists by registration, and let a package edit one entry of a shared list without asking, naming it in its report. ([Round 2 build](https://github.com/ntroccoli/ai-interfaces/blob/main/evidence/2026-11-14-studio-go-interface-redesign.md#round-2-build))
- [ours] Report a mock's shortest-route counts beside a newcomer's counts; the two differ and both matter. ([Screens and clicks](https://github.com/ntroccoli/ai-interfaces/blob/main/evidence/2026-11-14-studio-go-interface-redesign.md#screens-and-clicks-by-job))
- [ours] Settle in the tool's settings whether agents may take screenshots before a brief asks for them; otherwise expect the owner's look to be the first. ([Mockups](https://github.com/ntroccoli/ai-interfaces/blob/main/evidence/2026-11-14-studio-go-interface-redesign.md#mockups-and-the-owners-choices))

## Context

- Model era: November 2026, with Fable 5.2, Opus 5.5 and Sonnet 5.5
  ([Who did what](https://github.com/ntroccoli/ai-interfaces/blob/main/evidence/2026-11-14-studio-go-interface-redesign.md#who-did-what)).
- The process changes after round 1 came from a review that measured the work with the
  [ai-migrations](https://github.com/ntroccoli/ai-migrations) lessons; the owner picked which proposals to adopt,
  and most have not yet been put to use, which round 2 will do.
- Still open: the build of the three panes is under way (15 of 21 packages by the review of 2026-11-15, 16 packages by the coordinator's handoff); it is
  built whole before the owner tries it, with each job's walk against the mock's count meant to catch a wrong
  turn earlier; no newcomer has walked the build
  ([Still open](https://github.com/ntroccoli/ai-interfaces/blob/main/evidence/2026-11-14-studio-go-interface-redesign.md#still-open)).
- The maintainer's own project: it shows what one owner met, with models as builders, reviewers and a stand-in
  newcomer.
