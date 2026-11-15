# Interface checklist: measure before and after a change

Questions an agent answers about a project's interface before a change made with AI, and again
after it. Each has a **Check** (one measurement an agent runs), an **Evidence** line in our words
("ours" marks our inference) and the **Lessons** behind it (`ACC-5`: lesson 5 on the accessibility
page; listed in [lessons/evidence.md](lessons/evidence.md)). Every answer is a count, a file or a
command's output. No question asks which look is better: taste stays with a person.

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
   Evidence: at studio-go every agent-written rule test passed while jobs stayed long; its job walk
   became a test with a committed baseline, taken only after the first round of changes. In the UW
   walkthrough models finished more tasks in fewer steps than people, so an agent's newcomer count
   is a floor, not people's cost.
   Lessons: JOB-1, JOB-2, JOB-3, JOB-5, SIM-1.
2. **Do the jobs finish, end to end, in the running interface?**
   Check: the jobs of question 1 that no passing test drives from start to finish (no test, a
   failing test, or one that does not run), by name.
   Evidence: in the Anthropic harness a solo build looked finished while its core feature failed; a
   grading agent that drove the app against agreed criteria caught specific bugs. A build that
   passed its per-feature tests still kept a workflow the screen never explained (ours: walk whole
   jobs after the grader passes).
   Lessons: BLD-1, BLD-8, JOB-1.
3. **How many accessibility violations does an automated checker find, by page and by rule?**
   Check: a named rule checker's violations by page, rule and impact, on every page and state the
   jobs reach (running page; static route in the note), written to a baseline file.
   Evidence: model-written fixes in Concordia repair lowered axe's count on most pages but left only
   about a quarter of pages clean, and some broke other rules (duplicate IDs, ARIA hiding focusable
   content). In the UCI code study, asking models for accessible code added attributes that broke
   other rules. The GitHub a11y agent post quotes a fix rate without defining it.
   Lessons: ACC-2, ACC-3, ACC-4, ACC-13.
4. **How many text and control colour pairs fall below the contrast target, in each theme?**
   Check: the colour pairs below the WCAG contrast target, per theme and state, computed from the
   design tokens and stylesheets (static), written to a baseline file.
   Evidence: in the UCI code study contrast made up most checker violations, and pages rewritten by
   models had fewer than the human code on average, not in every project. Counting pairs from the
   tokens is ours: it reaches themes and states a page checker never rendered.
   Lessons: ACC-1.
5. **What can the checker not see here, and who covers it?**
   Check: per job, the keyboard traps and controls a keyboard-only walk never reaches (running
   page; static proxies in the note), with each high-risk widget listed for a person.
   Evidence: a checker-clean page is no proof it works for disabled users: rates count every
   violation alike, and checkers miss ARIA meaning and keyboard use (UCI code study, GitHub a11y
   agent, Agentic audit). There, one browser agent per WCAG criterion found more of the
   expert-reported failures than axe-core and both keyboard traps the batch models missed; its extra
   findings were never settled by a person. The GitHub a11y agent keeps off high-risk widgets.
   Lessons: ACC-5, ACC-7, ACC-8, ACC-10, ACC-11, ACC-15.
6. **How many controls does each page carry, and do the pages agree?**
   Check: per page, the interactive controls shown and those behind a fold, and the style values
   and controls that bypass the design tokens and shared components, written to a baseline file.
   Evidence: at studio-go agents told only to fold options kept them and added controls, and a walk
   of the jobs found pages that disagreed where an audit from code and screenshots did not. The
   token and component counts are ours.
   Lessons: JOB-4, JOB-6.
7. **Where a model rates, reviews or grades the interface, was it checked against people?**
   Check: for each place a model scores, reviews or grades the interface, the set of items both it
   and people rated: its size, their agreement, and the judge version it was measured on.
   Evidence: ArtifactsBench chose its judge by agreement with experts, measured on a subset;
   screenshots and code together agreed with experts more than either alone. UW heuristic review and
   Brazil heuristic review split on a model's coverage of expert issues (above pooled experts in
   one, a fifth in the other); both saw non-issues raised and cross-screen problems missed. In the
   Anthropic harness the builder rated its own work too kindly, and its QA agent argued real bugs
   away until tuned on logs.
   Lessons: JDG-1, JDG-2, JDG-3, JDG-4, JDG-5, JDG-6, JDG-9, JDG-10, JDG-13.
8. **Where a model walks the interface as a user, how far do its runs agree, and with people?**
   Check: for each agent walk used as usability evidence, the runs per setup, how far repeat runs
   agree, and whether its steps were ever compared with people's on the same tasks.
   Evidence: in the UW walkthrough models finished more tasks, in fewer steps, than people and
   voiced far fewer doubts until asked to rate confusion per screen; screens rated one at a time,
   without the walk's history, gave weak ratings that changed between runs. Measuring how far runs
   agree is ours.
   Lessons: SIM-1, SIM-2, SIM-3, SIM-4, JOB-3.
9. **How do agents here build, fix and check interface work?**
   Check: which items of the build loop the project has, and which something enforces (the list
   is in the note): checker failures fed back by name, a check apart from the builder, a retry
   limit, rules that send high-risk work to people, and the cost of a run.
   Evidence: in Concordia repair a retry loop, told only of structural failures, cost more and fixed
   no more; a UCI code study loop fed a model-written violation report beat the plain prompt on
   average. GitHub a11y agent runs one reviewer and one fixer, feeds its own archive of fixes, and
   saw its agent try to work round its stop rule. The Anthropic harness criteria pulled designs
   toward one look, its harness cost many times a solo run, and it removed parts one at a time when
   the model changed.
   Lessons: BLD-2, BLD-3, BLD-4, BLD-5, BLD-6, BLD-7, ACC-14.
10. **Which counts may not rise, and does anything stop them rising?**
    Check: for each count of questions 1 to 6, whether a test the project reruns on every change
    fails when it rises above a committed baseline; the job walk of question 1 is kept as such a
    test.
    Evidence: studio-go's job walk is a test that fails when a job cannot finish or a count goes
    above its committed baseline, taken after the first round and not yet tested by a change. Fixes
    that lower a total can raise single rules (Concordia repair, UCI code study). Gating every
    count, not only jobs, is ours.
    Lessons: JOB-2, JOB-5, ACC-3, ACC-4.

## How to run this checklist

1. Run it in a fresh session on the project, changing nothing there. The cases are few and most
   are single studies: read a case's "What went wrong" before relying on it.
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
   copy". No proposal says which look is better; a question of look goes to the owner. Order them
   by what the rest depends on: baselines first (questions 1 and 10), then a judge or simulated
   user checked against people before its ratings are used, then the rest.
7. Report as below, then stop until the owner picks. One change per proposal (or parts 3a, 3b).
8. Revisit as [applying the lessons](docs/applying-lessons.md#revisit) says; share a
   [field report](docs/field-reports.md) once an item has met its problem (optional).

## Report format

Report, record and baseline files follow
[the checklist report](docs/applying-lessons.md#the-checklist-report): each answer with its
measurement, a baseline file per count in `docs/interface-baselines/` (written before anything
changes), numbered proposals with a one-word recommendation (do, later or skip), "Check now" and
"Event that proves it", and the record in `docs/interface-review.md` once the owner picks. In a
read-only run, write no file: the report's Baselines section stands in for them.

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
