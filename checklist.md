# Interface checklist: measure before and after a change

Questions an agent answers about a project's interface before a change made with AI, and again
after it. The questions guide; they impose nothing: what applies is for the project's owner to
decide. Each has a **Check** (one measurement an agent runs), an **Evidence** line (what the cases
show, in our words, with links; "ours" marks our inference), **Ask** (questions for this project),
**Trade-offs** (what it costs, and when not to apply it), a **Provenance** line for each threshold
or rule (its source and evidence level: a published case, others' measurement, a standard or
vendor guidance, our single case, or our guess; what it prevents; how it fails when applied
blindly) and the **Lessons** behind it (`ACC-5`: lesson 5 on the accessibility page; listed in
[lessons/evidence.md](lessons/evidence.md)). Every answer is a count, a file or a command's output.
No question asks which look is better: taste stays with a person.

Where to start: questions 1 and 2 come before any design work, and question 11 before a redesign
deletes or replaces a page; the others measure the interface as it stands and again after each
change.

How to take each measurement (tools, the static route, server templates, examples) is in the
[measuring notes](docs/applying-lessons.md#measuring-notes); read the note of a question before
measuring it. A Check marked "running page" needs the served interface (a browser or an HTTP
client); without one, take the static route the note gives and mark the answer "static".

Cases named below, each by its label (all in [index.md](index.md)): [Agentic audit][],
[Anthropic harness][], [ArtifactsBench][], [Brazil heuristic review][], [Concordia repair][],
[GitHub a11y agent][], [UCI code study][], [UW heuristic review][], [UW walkthrough][], and
[studio-go][] (the maintainer's own project: never independent evidence).

1. **Which jobs does the interface serve, and what does each cost today?**
   Check: for each job, the screens, clicks or key presses and fields typed by its shortest route
   (a scripted walk on a running page, else static), and again as a newcomer walks it, written to
   a baseline file before any change.
   Evidence: at [studio-go][] every agent-written rule test passed while jobs stayed long; its job
   walk became a test with a committed baseline, taken only after the first round of changes. In
   the [UW walkthrough][] models finished more tasks in fewer steps than people, so an agent's
   newcomer count is a floor, not people's cost.
   Ask: which jobs do the docs, the navigation and the tests name, and does the owner know others?
   Trade-offs: a scripted walk costs set-up; a static count is a floor for multi-step flows. Not
   needed for a change that touches no job. A count that does not move can hide a gain or a loss
   in finding: where a fold hides a control, also record whether a newcomer found it and how many
   folds it opened ([studio-go][]: a form rewritten in words kept its clicks).
   Provenance: a baseline before any change — our single case ([studio-go][]: taken after its first
   round, whose effect then could not be shown). Prevents: a change whose effect cannot be shown.
   Applied blindly: a baseline of only some jobs leaves the rest unmeasured; list every job.
   Lessons: JOB-1, JOB-2, JOB-3, JOB-5, JOB-11, SIM-1.
2. **Do the jobs finish, end to end, in the running interface, and do the pages say so?**
   Check: per job of question 1: whether a passing test drives it from start to finish (no test,
   a failing test, or one that does not run, by name); its last run against the real backend
   (date, who, result; "simulated only" is a partial gap); and, on a running page, which of four
   moments a page the user is on states (that it started, where it is, that it ended, why it
   failed), each yes or no with the text and the page, as moments stated of moments.
   Evidence: in the [Anthropic harness][] a solo build looked finished while its core feature
   failed; a grading agent that drove the app against agreed criteria caught specific bugs. A
   build that passed its per-feature tests still kept a workflow the screen never explained (ours:
   walk whole jobs after the grader passes). At [studio-go][] every job's walk passed on a demo
   with a simulated engine; a change's first run for real failed twice and the queue called both
   failed jobs finished; the owner's expectations, checked line by line, held in 16 of 52 lines.
   Ask: does each job's test run on every change, who wrote its criteria, and when did each job
   last run for real?
   Trade-offs: whole-job tests run slower and break more often than unit tests; a real run may
   cost money, GPU time or the owner's data: run it where the project allows, else ask the owner.
   Provenance: the four moments — standard or vendor guidance (Nielsen's usability heuristics 1
   and 9: visibility of system status; help users recognise errors, diagnose them and recover) and
   our single case ([studio-go][]); "simulated only" as a partial gap — our single case. Prevents: a
   job that passes on a stand-in and fails for real, or ends or fails with nothing on the page
   saying so. Applied blindly: a paid or destructive real run made only to close the gap, or a
   status message added to every page; propose the run to the owner, and count a moment stated on
   any page the user is on.
   Lessons: BLD-1, BLD-8, JOB-1, JOB-8, JOB-9.
3. **How many accessibility violations does an automated checker find, by page and by rule?**
   Check: a named rule checker's violations by page, rule and impact, on every page and state the
   jobs reach (running page; static route in the note), written to a baseline file.
   Evidence: model-written fixes in [Concordia repair][] lowered axe's count on most pages but left
   only about a quarter of pages clean, and some broke other rules (duplicate IDs, ARIA hiding
   focusable content). In the [UCI code study][], asking models for accessible code added
   attributes that broke other rules. The [GitHub a11y agent][] post quotes a fix rate without
   defining it.
   Ask: which checker and version does the project already run, and on which pages and states?
   Trade-offs: a checker sees only part of what fails (question 5), and a total can fall while one
   rule rises. Failures read from code without a checker run are listed apart, as candidates.
   Lessons: ACC-2, ACC-3, ACC-4, ACC-13.
4. **How many text and control colour pairs fall below the contrast target, in each theme?**
   Check: the colour pairs below the WCAG contrast target, per theme and state, computed from the
   design tokens and stylesheets (static), written to a baseline file.
   Evidence: in the [UCI code study][] contrast made up most checker violations, and pages
   rewritten by models had fewer than the human code on average, not in every project. Counting
   pairs from the tokens is ours: it reaches themes and states a page checker never rendered.
   Ask: which themes and states ship, and is a brand colour behind a failing pair?
   Trade-offs: "possible" pairs no selector combines are not failures today.
   Provenance: 4.5:1 for normal text, 3:1 for large text and for control bounds and focus — standard
   or vendor guidance (WCAG 2.2, success criteria 1.4.3 and 1.4.11, level AA). Prevents: text and
   controls people with low vision cannot read. Applied blindly: AA read as enough where a project
   promises more; a failing pair deferred as a matter of look, when it is a measured gap (propose
   values that pass; the owner picks among them).
   Lessons: ACC-1.
5. **What can the checker not see here, and who covers it?**
   Check: per job, the keyboard traps and the controls a keyboard-only walk does not reach (running
   page; static proxies in the note), with each high-risk widget listed for a person.
   Evidence: a checker-clean page is no proof it works for disabled users: rates count every
   violation alike, and checkers miss ARIA meaning and keyboard use ([UCI code study][],
   [GitHub a11y agent][], [Agentic audit][]). There, one browser agent per WCAG criterion found
   more of the expert-reported failures than axe-core and both keyboard traps the batch models
   missed; its extra findings were never settled by a person. The [GitHub a11y agent][] keeps off
   high-risk widgets.
   Ask: which widgets are custom (drag and drop, grids, comboboxes, editors, canvas), and who tests
   them with a keyboard or a screen reader?
   Trade-offs: a scripted keyboard walk finds traps, not whether a screen-reader user understands
   the page.
   Lessons: ACC-5, ACC-7, ACC-8, ACC-10, ACC-11, ACC-15.
6. **How many controls does each page carry, and do the pages agree?**
   Check: per page, the interactive controls shown and those behind a fold, the style values and
   controls that bypass the design tokens and shared components, and the internal identifiers,
   file paths and raw error chains shown on the pages a job reaches, rendered with real data,
   written to a baseline file.
   Evidence: at [studio-go][] agents told only to fold options kept them and added controls, and a
   walk of the jobs found pages that disagreed where an audit from code and screenshots did not.
   There a check of the build found on its pages a source path, a channel id and a raw error. The
   token and component counts are ours, and so is counting names on rendered pages with real data:
   such names come from data and error paths, which a template read does not show.
   Ask: which job does each control serve, and which serve no job the owner listed?
   Trade-offs: fewer controls can cost a job more clicks, and a fold hides a control from
   newcomers. A control that serves no listed job is the owner's to decide, not a cut.
   Lessons: JOB-4, JOB-6.
7. **Where a model rates, reviews or grades the interface, was it checked against people?**
   Check: for each place a model scores, reviews or grades the interface, the set of items both it
   and people rated: its size, their agreement, and the judge version it was measured on.
   Evidence: [ArtifactsBench][] chose its judge by agreement with experts, measured on a subset;
   screenshots and code together agreed with experts more than either alone.
   [UW heuristic review][] and [Brazil heuristic review][] split on a model's coverage of expert
   issues (above pooled experts in one, a fifth in the other); both saw non-issues raised and
   cross-screen problems missed. In the [Anthropic harness][] the builder rated its own work too
   kindly, and its QA agent argued real bugs away until tuned on logs.
   Ask: who acts on the model's findings, and has a person ever rated the same items?
   Trade-offs: people's ratings cost their time; a small shared set is a start. Where no model
   reviews the interface, a model review of the running screens against a named heuristic set is a
   cheap check to add (ours), if a person sorts its non-issues and problems that span screens are
   walked apart (JDG-9, JDG-10).
   Lessons: JDG-1, JDG-2, JDG-3, JDG-4, JDG-5, JDG-6, JDG-7, JDG-9, JDG-10, JDG-11, JDG-13.
8. **Where a model walks the interface as a user, how far do its runs agree, and with people?**
   Check: for each agent walk used as usability evidence, the runs per setup, how far repeat runs
   agree, and whether its steps were ever compared with people's on the same tasks.
   Evidence: in the [UW walkthrough][] models finished more tasks, in fewer steps, than people and
   voiced far fewer doubts until asked to rate confusion per screen; screens rated one at a time,
   without the walk's history, gave weak ratings that changed between runs. Measuring how far runs
   agree is ours.
   Ask: what decisions rest on the simulated walk, and could people walk the same tasks once?
   Trade-offs: repeat runs cost tokens; one run says little about the next.
   Lessons: SIM-1, SIM-2, SIM-3, SIM-4, JOB-3.
9. **How do agents here build, fix and check interface work?**
   Check: which items of the build loop the project has, and which something enforces (the list
   is in the note): checker failures fed back by name, a check apart from the builder, a retry
   limit, rules that send high-risk work to people, and the cost of a run.
   Evidence: in [Concordia repair][] a retry loop, told only of structural failures, cost more and
   fixed no more; a [UCI code study][] loop fed a model-written violation report beat the plain
   prompt on average. [GitHub a11y agent][] runs one reviewer and one fixer, feeds its own archive
   of fixes, and saw its agent try to work round its stop rule. The [Anthropic harness][] criteria
   pulled designs toward one look, its harness cost many times a solo run, and it removed parts one
   at a time when the model changed.
   Ask: what does a run cost, and what stops a loop that is not converging?
   Trade-offs: each added check costs time and tokens on every run.
   Provenance: a retry limit as an item — published case ([Concordia repair][]: more retries cost
   more and fixed no more). Prevents: loops that spend without fixing. Applied blindly: a low
   fixed limit stops a loop that was converging; the question asks whether one exists, not its
   value.
   Lessons: BLD-2, BLD-3, BLD-4, BLD-5, BLD-6, BLD-7, ACC-14.
10. **Which counts may not rise, and does anything stop them rising?**
    Check: for each count of questions 1 to 6, whether a test the project reruns on every change
    fails when it rises above a committed baseline, and who may raise that baseline; the job walk
    of question 1 is kept as such a test.
    Evidence: [studio-go][]'s job walk is a test that fails when a job cannot finish or a count
    goes above its committed baseline, taken after the first round; through the redesign's build
    no line rose but one, where the job gained a step its mock planned. Fixes that lower a total
    can raise single rules ([Concordia repair][], [UCI code study][]). Gating every count, not
    only jobs, is ours.
    Ask: who may raise a baseline here, and does anything outside the agent's reach review it?
    Trade-offs: a gate makes needed growth (a new job's control) wait for a review; without one,
    counts drift unseen.
    Provenance: no count above its baseline — our single case ([studio-go][]: held through one
    build); gating every count is our guess. Prevents: a fix that lowers one count while another rises
    unseen. Applied blindly: a control, job or check removed or hidden to make the number hold; a
    rise a change needs is listed with the job it serves, for the owner to accept.
    Lessons: JOB-2, JOB-5, ACC-3, ACC-4.
11. **Before a redesign deletes or replaces a page, what would the user lose?**
    Check: per job, each thing the old pages show or let the user do, inside a page as well as by
    route, marked kept, moved (to where) or removed in the new design, a replacement that shows or
    does less counting as removed for what it drops; and the removed lines not yet put to the
    owner, counted before the old page is deleted.
    Evidence: at [studio-go][] a table drawn from the code gave every old route a home, yet
    deleting the old pages removed functions that lived inside them (the deleting package listed
    them and a later one restored most), and a run's live squares, given a card that shows less,
    went with a note of a known limit until the owner missed them in the first use.
    Ask: which old pages does the redesign replace, and who answers for each removed line?
    Trade-offs: the list costs a reading of the old pages and their code; a design drawn free of
    them did not thereby reject what it omits. Not needed when no page is deleted or replaced.
    Provenance: a removed line goes to the owner before the deletion — our single case
    ([studio-go][]). Prevents: a function lost with a page nobody meant to drop. Applied blindly:
    every small difference sent to the owner, or a deletion held for a line the owner already
    dropped in the design; ask only about removed lines, and cite the owner's earlier choice where
    one covers a line.
    Lessons: JOB-6, JOB-10.

## How to run this checklist

1. Run it in a fresh session on the project, changing nothing there, from the README's step 1
   prompt: `llms.txt` ("Review a project") makes it a first review when the project has no
   `docs/interface-review.md` and a revisit when it has one. The cases are few and most are single
   studies: read a case's "What went wrong" before relying on it.
2. Measure first: answer each Check with a number, a file or a command's output, never from
   memory or from how the interface looks to you. A count the project already records (a
   committed baseline, a dated report) may be cited with its file, commit and date, marked
   "recorded", with the command that measures it again under "Not run".
3. A check you may not run (no running page, no browser allowed, no tool run): write the exact
   command, mark it "not run" with the reason, take the static route if there is one, and never
   guess its result. Where rules allow a browser only inside tests, propose the Check as a test.
4. A fact only the owner knows (the jobs that matter, who reviews, which themes ship): write the
   question, mark it "ask the owner" and state a default; unanswered, assume it, note it in the
   record, go on.
5. Mark each question "gap", "partial gap", "no gap" or "not applicable", with the measurement.
   Give every count a baseline (date, commit, exact command, tool versions, values by job, page or
   rule).
6. Base proposals on the Evidence lines and, if you can, the cited lessons (their "Against" lines
   and "Checked against people" tags) and the case sections they link, above all "Practices to
   copy", weighing each question's Trade-offs. No proposal says which look is better; a question
   of look goes to the owner. A value below a standard's target is a measured gap, not a question
   of look: propose values that pass, and the owner picks among them. Order proposals by what the
   rest depends on: baselines first (questions 1 and 10), then a judge or simulated user checked
   against people before its ratings are used, then the rest.
7. Report as below, then stop until the owner picks. Proposals are options for the owner; the
   one-word recommendation is your suggestion. One change per proposal (or parts 3a, 3b).
8. Apply only what the owner chose, as [Apply](docs/applying-lessons.md#apply-step-2) says: the
   record first, one proposal at a time on a branch, and a stop at the first failing check.
9. Revisit as [applying the lessons](docs/applying-lessons.md#revisit) says, reading
   [corrections.md](corrections.md) first; share a [field report](docs/field-reports.md) once an
   item has met its problem (optional).

## Report format

Report, record and baseline files follow
[the checklist report](docs/applying-lessons.md#the-checklist-report): each answer with its
measurement, a baseline file per count in `docs/interface-baselines/` (written before anything
changes), a "Path" line first, numbered proposals with a link, a trade-off, a one-word suggestion
(do, later or skip), "Check now" and "Event that proves it", and the record in
`docs/interface-review.md` once the owner picks, where every open or waiting item has an owner and
a due date. In a read-only run, write no file: the report's Baselines section stands in for them.

[Agentic audit]: cases/2026-09-08-mishra-agentic-a11y-audit.md
[Anthropic harness]: cases/2026-03-24-anthropic-harness-design.md
[ArtifactsBench]: cases/2025-07-07-tencent-artifactsbench.md
[Concordia repair]: cases/2026-05-26-concordia-llm-accessibility-repair.md
[GitHub a11y agent]: cases/2026-05-15-github-accessibility-agent.md
[UW heuristic review]: cases/2025-07-03-uw-synthetic-heuristic-evaluation.md
[Brazil heuristic review]: cases/2025-06-19-unespar-gpt4o-heuristic-evaluation.md
[UCI code study]: cases/2025-03-20-uci-human-or-llm-accessible-code.md
[UW walkthrough]: cases/2025-12-03-uw-synthetic-cognitive-walkthrough.md
[studio-go]: cases/2026-11-14-studio-go-interface-redesign.md
