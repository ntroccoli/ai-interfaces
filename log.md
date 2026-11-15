# Update log

Each update of the collection: when it ran, the sources it covered, and what changed. Newest
first.

## 2026-11-15 — studio-go suggestions

- **Why:** studio-go's coordinator read the checklist as someone starting a redesign and sent
  suggestions from the end of its build: every job walked at the mock's counts and every plan item
  was built, yet the owner's first use, a check against the owner's expectations and the first real
  run found what no test asked. The maintainer's own project: a single case, never independent
  evidence.
- **Cases:** studio-go updated from its records at the end of the build (the job walk held, what
  went wrong since).
- **Kept:** every question's existing Check; the new parts are added beside them.

### Checklist and lessons impact

- **Checklist:** questions 2, 6 and 11 change what they measure: question 2 adds each job's last
  run against the real backend and whether the pages say that a job started, where it is, that it
  ended and why it failed; question 6 adds a count of internal names, file paths and raw errors on
  rendered pages with real data; question 11 is new (what a redesign would remove, before an old
  page is deleted). Questions 1 and 7 gain a trade-off line only; three lines at the top say which
  questions come first. Question 10 changes only in its Evidence and Provenance (the job walk held
  through the build), which keeps a closed item closed.
- **New lessons:** JOB-8, JOB-9, JOB-10, JOB-11 and BLD-11, from the studio-go records, each
  `[ours]` and weak. One candidate was declined: that a rule checked on templates passes while
  rendered pages with real data break it (the records do not show which names came from data);
  question 6's measuring note takes the rendered route instead.
- **Changed lessons:** JOB-2 (its "Against" line: the owner has now used the build).

## 2026-11-15 — reopen rule

- **Why:** behaviour runs of the revisit disagreed on whether a reworded checklist question
  reopens an item the owner skipped: one of three runs reopened it, two kept it closed.
- **Rules:** a reworded question or lesson reopens a closed item only when what it asks of this
  item changed: the item would now be measured differently (a new or changed Check, measuring step
  or threshold, comparing the Check and its measuring note old and new). A rule on how to carry out
  the proposal once adopted, new wording, links, Evidence, Ask or Trade-offs keep the item closed.
  The agent says what changed, old and new, reading the old text at the commit the record names. Stated in "Revisit" of
  `docs/applying-lessons.md`, in its revisit report template, in `llms.txt` and in
  `docs/try-it.md`.
- **Kept:** the other reasons to reopen (a proven item's check fails, a new lesson, a matching
  correction, a changed measurement) and the rule on an owner's choice.

### Checklist and lessons impact

- **Checklist:** no question changed; the revisit rules above.
- **New lessons:** none.
- **Changed lessons:** none.

## 2026-11-15 — one review prompt

- **Why:** the owner asked that one step do both the first review and every later update. Until
  now each route had a step 1 prompt for the first review and a separate, much longer step 3
  prompt for the revisit, and the details of each step lived in the prompts.
- **Rules:** step 1 of each route is one short prompt that serves the first review and every
  revisit. `llms.txt` routes it by the project's record (`docs/interface-review.md` or
  `docs/interface-lessons-review.md`): no record, a first review that measures, proposes and changes
  nothing; a record, a revisit that reads `corrections.md` first, then the newer log entries, and
  proposes only what is new, what was left for later and what stopped holding. The agent says in
  one line which path it took and why. The old step 3 headings stay and point to step 1.
- **Rules:** the agent downloads the files into a temporary folder, reads them whole from disk and
  deletes the folder when done: a fetch tool may summarise a page and drop parts.
- **Rules:** step 2 is a short prompt ("Apply what you recommended", "Apply proposals 1, 3 and 5",
  "Apply none; write the record"); how to apply moved to a new "Apply" section of
  `docs/applying-lessons.md`: one proposal at a time on a branch, stop at the first failing check
  and report, write the record once the owner has chosen.
- **Rules:** the report and record formats are templates with a "Path" line, a trade-off line per
  proposal and, new, a revisit report. Closed items stay closed: a skipped or declined proposal
  returns only for a new or changed lesson or question, a correction that matches it, or a changed
  measurement, and the agent says which; an owner's choice that differs from a lesson is recorded
  with its date, reason and the owner's words.
- **Kept:** nothing an earlier step 1 or step 3 prompt relies on was removed; behaviour checks ran
  an old step 3 prompt against the new files.

### Checklist and lessons impact

- **Checklist:** no question changed; "How to run" now starts from the review prompt's routing and
  points to the "Apply" section.
- **New lessons:** none.
- **Changed lessons:** none.

## 2026-11-15 — no-warranty notice

- **Why:** agents apply proposals from this collection to other people's projects; the owner asked
  for a plain statement that it comes with no warranty and that the user chooses each change.
- **Added:** a no-warranty paragraph at the top of the README's "Try it", above both routes, and a
  line right after the summary in `llms.txt`, written by the build so it cannot drift; a test checks
  both. The checklist carries no copy.

### Checklist and lessons impact

- **Checklist:** none.
- **New lessons:** none.
- **Changed lessons:** none.

## 2026-11-15 — provenance and behaviour checks

- **Why:** a size limit nobody had measured travelled from one project's test into a published
  checklist and shipped instructions, and agents then cut text until the number held. Every
  threshold we publish now says where it comes from.
- **Rules:** each threshold, cap, default or "may not rise" rule in the checklist carries a
  "Provenance:" line: its source, its evidence level (a published case, others' measurement, a
  standard or vendor guidance, our single case, or our guess), what it prevents and how it fails
  when applied blindly. The validator refuses a Check that holds a number or a cut, cap or forbid
  word without one. The repository's own limits (file sizes, the strength cap, the "may be
  outdated" age) get the same in `docs/format.md`; most are guesses from sibling projects and say
  so.
- **Rules:** every checklist item that tells an agent to cut, cap, remove or forbid was applied by
  a fresh agent to a small prepared sample before release, looking for the intended effect and the
  named harm; the results are summarised in `docs/format.md`.
  Three did harm and were reworded: the default job list no longer stops at ten jobs, a template
  that no checker can read gets its failures listed as candidates instead of nothing, and a colour
  pair below the contrast target is a gap to fix, not a question of look. They are the first entry
  of the new `corrections.md`.
- **Rules:** the checklist guides rather than imposes: each question adds "Ask" (questions for the
  project) and "Trade-offs" (what it costs and when not to apply it), names its cases by link, and
  proposals are options for the owner, the one-word recommendation being the agent's suggestion.
- **Rules:** `corrections.md` lists what we published wrong, between which dates, how to recognise
  it in a project and what to propose to its owner; every revisit reads it first.
- **Rules:** in the review records, every open or waiting item has an owner and a due date, and the
  revisit lists the ones past their date first.

### Checklist and lessons impact

- **Checklist:** every question (Ask, Trade-offs and linked cases; provenance lines on questions 1,
  4, 9 and 10; questions 1, 3, 4, 6 and 10 reworded after the behaviour checks). A revisit checks
  the first entry of `corrections.md`.
- **New lessons:** none.
- **Changed lessons:** none.

## 2026-11-15 — studio-go process update

- **Covered:** the maintainer's own case (studio-go) after the first night of building its redesign:
  the coordinator's review of that night and the build's records at that point. It stays `ongoing`
  and, as the maintainer's own, lifts no lesson's strength.
- **Changed:** the case and its evidence file gain a round 2 build section: the job counts before,
  at the review and against the completed mock; the rail drawn by the server so the walk, which runs
  no scripts, can count it; old pages kept answering inside the new frame until each lane lands;
  the stops to ask that file lists caused; status lines that guessed their effort; and what is
  still unproven (the owner has not used the build). The picked mock's counts in the older table are
  now marked as those of its thin version.

### Checklist and lessons impact

- **Checklist:** none.
- **New lessons:** JOB-7; BLD-9, BLD-10.
- **Changed lessons:** JOB-2 (its ceilings held through a build and refused one change), JOB-3 (no
  newcomer has walked the build either).

## 2026-11-15 — outside review fixes

- **Rules:** a case is checked against `people` only when the source reports the results of
  people's checks (users, experts or raters measured); an author judging their own work, or a team
  that reviews output without reporting what it found, is not people. Two seller cases and the
  maintainer's own case were re-tagged, and the lessons resting on them re-tagged in turn.
- **Rules:** each case has a short `label`, used for it in every generated list, on the lesson
  pages, the checklist and the docs, so one case no longer appears under several names. The
  validator now also fails when a log entry's impact part names a lesson its changes file does not
  list.
- **Changed:** wording an outside reviewer flagged before the first publication (titles that stated
  a seller's claims as fact, counts written loosely); the evidence file of the maintainer's own case
  drops details that only the private project can check.

### Checklist and lessons impact

- **Checklist:** questions 1, 2, 3, 4, 5, 7, 8, 9 and 10 (cases named by their labels; question 3
  says how many pages the fixes left clean).
- **New lessons:** none.
- **Changed lessons:** ACC-3, ACC-5, ACC-6, ACC-7, ACC-10, JDG-5, JDG-7, JDG-8 (ACC-5 to medium, since no
  cited case tests checker-clean pages with people; the others in wording or link text).

## 2026-11-15 — tips from sibling collections

- **Rules:** the "Checked against people" tag now tells apart what checked the evidence when no
  person did: `yes` (people's results), `partly` (people's results for part of the claim),
  `checker` (deterministic checks only, such as axe or a scripted walk), `model` (model judges or
  simulated users only) and `none` (only the author's account). Before, a lesson resting on axe and
  one resting on a model's rating both read `no`, and a lesson resting on one engineer's own
  judgement read `partly`. Every lesson was re-tagged from its cited cases and a fresh reviewer
  checked the re-tags; a tag now needs a cited case checked against that ground.
- **Changed:** the file every agent loads first (`AGENTS.md`) keeps only what every session needs;
  the case, lesson and generated-file formats moved to `docs/format.md`. The checklist is shorter
  (one measurement per Check), its report and record formats moved to the apply-routes page, and it
  now asks that a project keep its job walks as a test rerun on every change. The README says what
  the collection covers today and what it does not yet.
- **Added:** "Related view" lines from the sibling collection karpathy-ideas where a lesson and an
  idea clearly say the same thing or the opposite.

### Checklist and lessons impact

- **Checklist:** every question (shorter Checks; question 10 asks for the job walk as a test).
- **New lessons:** none.
- **Changed lessons:** BLD-1, BLD-2, BLD-3, BLD-4, BLD-5, BLD-6, BLD-7, BLD-8, ACC-1, ACC-2,
  ACC-3, ACC-4, ACC-6, ACC-11, ACC-12, ACC-13, ACC-14, ACC-15, JDG-4, JDG-5, JDG-6, JDG-12, JOB-1,
  JOB-2, JOB-4, JOB-5, JOB-6 (the people tag).

## 2026-11-14 — checklist and apply routes

- **Added:** the checklist an agent runs on a project before and after an interface change: ten
  questions, each with a Check an agent can run (the jobs and what each costs in screens and
  clicks, whether the jobs finish, checker violations, contrast pairs, what the checker cannot
  see, controls and consistency, model judges and simulated users checked against people, the
  agents' own build and fix loop, and the counts that may not rise). It asks for no judgement of
  look or taste. Its report gives each answer with its measurement, a baseline file for every
  count so a revisit can compare, and proposals each marked do, later or skip with a reason.
- **Added:** two routes to apply the collection, as in the sibling collection ai-migrations:
  before an interface change, run the checklist; learning from the lessons, compare how agents
  build and check interfaces in a project with the lessons. Each has paste-ready prompts for
  review, apply and revisit (README "Try it", `docs/applying-lessons.md`). The field-report page,
  the form and the "How to use" part of llms.txt now cover the checklist.
- **Tried:** a read-only dry run of the review step on the maintainer's own project, static checks
  only; where a Check could not run without a running page or was unclear, the checklist now
  says so. The dry run is the maintainer's own project and is not evidence for any lesson.

### Checklist and lessons impact

- **Checklist:** every question is new (questions 1 to 10).
- **New lessons:** none.
- **Changed lessons:** none.

## 2026-11-14 — first ten cases

- **Covered:** seven new cases, which bring the collection to ten: Anthropic's planner, builder and
  grader harness for long-running app builds (a seller's account; Anthropic is its author); GitHub's
  accessibility agent (a seller's account); two heuristic reviews by models compared with experts,
  one where GPT-4 covered more of a reference list than pooled experts and one where GPT-4o found a
  fifth of the experts' issues, so the cases disagree and the lessons say so; a study of
  accessibility in pages written by code models against human code; a study of model-written
  accessibility repairs, read with its code repository; and a benchmark of per-criterion audit agents
  scored against expert audit reports. The maintainer's own studio-go case was updated in place from
  the project's written answers (still ongoing; never independent evidence).
- **Added:** two lesson pages, build loops and accessibility; new lessons on the model-judges and
  measuring-jobs pages. Where two writers proposed the same claim, one lesson cites both cases.
- **Rules:** two `measures` values, `issue-coverage` (the share of a reference list of issues found)
  and `run-stability` (how far repeat runs agree), so `sameness` means design homogeneity only; the
  heuristic-review and audit cases were re-tagged with them. New units (rate, sprint, iteration,
  feature, sentence, row, platform, operation); a number after "severity" is a level; Kimi and Gemma
  versions form families; the copy check skips the `models:` and `tools:` values, which are exact
  names by rule.
- **Sceptic pass:** a fresh reviewer read every lesson against its cases. It moved three people
  tags to partly (an author's view, not a result) and two model-ability tags to yes, and narrowed
  the lesson on what a model misses in heuristic reviews: the experts led on user control in both
  studies, while on efficiency GPT-4 covered more than the experts, so the split now names that. It
  also dropped one prescription no case states and added counter-evidence or limits to nine
  "Against" lines.

### Checklist and lessons impact

- **Checklist:** none yet; it comes after the first ten cases.
- **New lessons:** BLD-1, BLD-2, BLD-3, BLD-4, BLD-5, BLD-6, BLD-7, BLD-8 (new page build loops);
  ACC-1, ACC-2, ACC-3, ACC-4, ACC-5, ACC-6, ACC-7, ACC-8, ACC-9, ACC-10, ACC-11, ACC-12, ACC-13,
  ACC-14, ACC-15 (new page accessibility); JDG-5, JDG-6, JDG-7, JDG-8, JDG-9, JDG-10, JDG-11,
  JDG-12, JDG-13; JOB-4, JOB-5, JOB-6.
- **Changed lessons:** JDG-1 (two heuristic-review cases join its comparison with people), JDG-3
  (the same prompt lost coverage on other models), JOB-2 (its baseline came after the first round),
  JOB-3 (no newcomer has walked a mock), SIM-1 (a newcomer agent on a live demo took more clicks).

## 2026-11-14 — pilot

- **Covered:** three cases, one of each type: a study that compared people with LLM agents
  walking through the same tasks (Synthetic Cognitive Walkthrough); a benchmark of generated
  interactive pages scored by a multimodal model judge and checked against human experts
  (ArtifactsBench); and the maintainer's own redesign of studio-go's web interface with agents,
  measured as clicks and screens per job (marked maintainer-own: never independent evidence, never
  counted toward a lesson's strength).
- **Added:** the case format (case type, what AI did, what was measured and against whom), the
  scripts adapted from the sibling collection ai-migrations (validator, build, copy check and the
  validator's tests), the first lesson pages, and the evidence file that is the public source of
  the maintainer's own case.
- **Not yet:** the checklist; it comes after the first ten cases, and the validator skips its rules
  until `checklist.md` exists.
