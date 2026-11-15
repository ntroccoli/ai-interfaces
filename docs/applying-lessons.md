# Applying the lessons

Two routes apply this collection to a project, and both read alike: the same method, report and
record. The paste-ready prompts are in README "Try it" and [try-it.md](try-it.md): step 1 of each
route is one prompt that `llms.txt` ("Review a project") turns into a first review when the
project has no record and into a [revisit](#revisit) when it has one; step 2 is one line that
runs [Apply](#apply-step-2). The checklist route also reads, on this page, the
[measuring notes](#measuring-notes) and [the checklist report](#the-checklist-report).

- **Before an interface change:** run the [checklist](../checklist.md) on the project. It measures
  the interface (jobs, accessibility, contrast, controls and consistency) and how the project's
  agents check their work, so the same counts can be taken again after the change.
- **Learning from the lessons:** compare how agents build, change and check interfaces in the
  project with the [lessons](../lessons/index.md), propose changes, and keep a record of what
  held. This page describes that route.

Both routes measure; neither says which look is better. A question of look goes to the owner,
never into a proposal; a value below a standard's target (contrast) is a measured gap, not a
question of look: propose values that pass, and the owner picks among them. Proposals are options
for the project's owner: the one-word recommendation is the agent's suggestion, and nothing is
applied without the owner's yes.

## How to run it

1. Run it in a fresh session on the project, changing nothing there. If the session that did the
   interface work is still running, first ask it to write an events file with counts of what went
   wrong (builds that looked done but failed, fixes that broke other pages, reviews it
   overruled), each figure labelled "recorded"; measure everything else from the repository.
2. Choose lessons from [lessons/evidence.md](../lessons/evidence.md), one line each: the lesson,
   its model-ability tag, its "Checked against people" tag and strength, "may be outdated" on a
   lesson about model limits whose cases are over a year old (re-check those against recent
   work), the cases it cites and the cases its "Against" line cites. Keep the lessons whose words
   match work the project's agents do: building pages (BLD), accessibility (ACC), a model that
   rates or reviews screens (JDG), a model that walks the interface as a user (SIM), counting
   jobs (JOB). A lesson whose evidence no person confirmed (people: `checker`, `model` or
   `none`, the last resting only on its author's account) travels less far: judge each lesson by
   its own words.
   With a specific or a new model: process lessons (model ability `no`) apply as they are. Start
   with the `yes` and `partly` lessons whose cases name your model or its family ("By model" in
   [lessons/index.md](../lessons/index.md)); treat those from other models as things to re-check
   on yours, not tips. A model newer than every case has no evidence here yet. The lessons hold
   only what the cases show, never prompting advice.
3. Open the aspect page only for the lessons you use: its full "Against" line and its cases show
   where it did not hold, and its Era the years and the newest model family it rests on.
4. Measure: answer from the repository, its history, logs or CI, with a number, a file or a
   command's output, not from memory and not from how the interface looks to you. A count that
   needs a running page and has none: take the static route the checklist gives, mark it
   "static", and list the running-page command under "Not run". A check you may not run: write
   the exact command and mark it "not run" with the reason. A fact only the owner knows: mark it
   "ask the owner" and state the default you will assume; if the owner does not answer, assume
   it, write the assumption in the record, and go on (the owner can overturn it later).
5. Report in the template below, starting with its "Path" line, then stop until the owner picks.
   One change per proposal: split a proposal with several parts, or number its parts 3a, 3b, each
   with its own checks.
6. Record: after the owner picks, write `docs/interface-lessons-review.md` in the project
   (format below), and each baseline the record cites, as [Apply](#apply-step-2) says. In a
   read-only run, write no file; show the record after the report.
7. Revisit: the same step 1 prompt, in a fresh session; with the record it runs the revisit below.
8. Share what you learned (optional): a field report, as below.

## Revisit

The step 1 prompt runs this section when the project has the record a review wrote
(`docs/interface-review.md` for the checklist, `docs/interface-lessons-review.md` for the lessons):
when the collection has grown or after a few weeks of work, in a fresh session. It changes
nothing until the owner chooses, and reports in the [revisit report](#revisit-report) template.

- Path: begin the answer with `Path: revisit (<route>) — <the record found and the log entry it
  names>`.
- Corrections first, every time: read [corrections.md](../corrections.md). For each entry the
  record does not list as checked, follow its "Recognise it" on the project; where it matches,
  follow "Find what it changed" and put its "Propose to the owner" first among the proposals. Name
  every entry checked in the record's "Corrections checked" line, matched or not.
- Start: compare the log entry the record names (date and title) with the newest one
  [llms.txt](../llms.txt) names. If they match, no correction was new and no item is due for
  re-check (due: waiting or open, with commits in the project since the record's date, or its due
  date passed), say so and stop.
- Past due: list first the open and waiting rows whose due date has passed, with their owners.
- Re-check: rerun each item's "Check now" unchanged (for a count, the command in its baseline
  file, with the same tool version) and look for its "Event that proves it" in the work since;
  compare with its baseline. Mark each exactly proven, still waiting, stopped holding or not
  shown (its event cannot be seen yet), with the numbers; in the record, still waiting and not
  shown stay "waiting for first use". Date each change.
- Closed items stay closed: a proven, skipped or declined item, and an owner's choice recorded
  under the table, is not proposed again unless one of these holds, and the proposal names which:
  its check now fails (a proven item), a new or changed lesson or question bears on it (from the
  changes files), a correction matches it, or its measurement changed since the record (give both
  values). A reworded question or lesson reopens a closed item only when what it asks of this item
  changed; say what changed, old and new. It changed when the item would now be measured
  differently: a new or changed Check, measuring step or threshold. Compare the Check and its
  measuring note, old and new: a clause new to the Check that the old note already asked is no
  change. A rule on how to carry out the proposal once adopted, new wording, links, Evidence, Ask
  or Trade-offs keep the item closed. The old text is in the files at the commit the record names:
  `https://raw.githubusercontent.com/ntroccoli/ai-interfaces/<commit>/checklist.md` and
  `.../<commit>/docs/applying-lessons.md` (or the lesson's page); when the record names only a
  date, judge from the newer log entries' words and say so. An owner's choice that differs from a
  lesson stays the owner's: never propose the lesson against it for the same reason again.
- New: for each [log.md](../log.md) entry newer than the record's, read its file in `changes/`,
  named by the entry's date and title (`2026-11-14 — checklist and apply routes` is
  `changes/2026-11-14-checklist-and-apply-routes.md`): the lesson IDs and checklist questions
  added, changed or removed. Open only those, and measure them as in step 4.
- Lint: list the applied lessons that a newer lesson now contradicts or supersedes, and the
  record's items whose lesson or question changed.
- Propose only the corrections that matched, the new or changed lessons and questions, earlier
  "later" items, applied items that stopped holding and what the lint found, each with exactly one
  word, do, later or skip (a suggestion), and a reason.
- Record: once the owner has chosen ([Apply](#apply-step-2)), update the record in its existing
  layout, give each open or waiting row an owner and a new due date, and name in it the newest log
  entry read, by date and title, and every corrections.md entry checked. A revisit prompt published
  before 2026-11-15 asks for this update in the same step; it may do it then.
- The too-early rule below holds for the re-check only: new lessons can be proposed before
  anything has met its problem.

## Report format

```markdown
# Interface lessons review: <project>, <YYYY-MM-DD>

Path: first review (lessons route) — <no docs/interface-lessons-review.md in the project>.

Work measured: <what agents do to the interface here: build pages, fix accessibility, review or
rate screens, walk jobs as a user>.

## Limits of this run
- Session: fresh | not fresh (<why; a session that did the work is partly judging itself>).
- Figures: measured from the repository now, or recorded (taken from notes or logs, not re-measured); mark each "recorded" figure below.
- Running page: used | not used (<why>); figures marked "static" come from code only.
- Models: <the models this project uses>; any newer than every case, or with no row in "By model", makes its model-dependent lessons things to re-check, not evidence.

## Not run
- <lesson ID>: `<exact command>` — <why it was not run>.

## Ask the owner
- <lesson ID>: <question>. Default if unanswered: <what you will assume>.

## Proposals

1. <the change in a few words> — <lesson ID> ([<aspect page>](<link to the lesson's page>)).
   Today: <what the project does, with the measurement>.
   Change: <the proposal>.
   Trade-off: <what it costs or risks, and when not to do it>.
   Evidence: the lesson's strength and people tag, its "Against" line, and links to case sections you read.
   Depends on: <proposal numbers, or none>.
   Cost: S | M | L (S under a day of agent work, M a few days, L a week or more).
   Recommendation: do | later | skip (exactly one word, a suggestion for the owner), with a one-line reason.
   Baseline: <how often the problem happened so far, with the evidence; for a count, its baseline file>.
   Check now: <a command or count that passes once the change is applied>.
   Event that proves it: <what later work must show for the change to have held>.
2. ...

## Outside this review
- <what you found that no lesson or question covers (a security bug, a broken route), one line
  each, for the owner; never a numbered proposal>.

## Next step
Reply "Apply what you recommended", "Apply proposals <numbers from this report>" or "Apply none;
write the record". Step 2 follows "Apply" in <raw URL of docs/applying-lessons.md>: the record
first, one proposal at a time on a branch, a stop at the first failing check.
```

Every proposal fills every line; write "none" or "not known" rather than leave one out. The "Next
step" section ends every report, first review or revisit, so the next step is read even when the
files read earlier have left the session. Links go to
the raw URL of the lesson page or case section you read.

## Revisit report

Both routes, when the project has a record:

```markdown
# Interface review, revisit: <project>, <YYYY-MM-DD>

Path: revisit (<checklist | lessons> route) — <record path>, log entry "<date — title>".
Newest log entry now: "<date — title>". Changes files read: <names, or none>.

## Corrections
- <date — title>: matches | does not match — <what you looked at in the project>.

## Past due
- Row <n> (<ID or Q<n>>): due <date>, owner <who>. Or: none.

## Re-check
- Row <n> (<ID or Q<n>>): proven | still waiting | stopped holding | not shown — <check now and its
  value, beside the baseline>.

## Closed items
- Row <n> (<ID or Q<n>>): stays closed | reopened — <for a reopened one: the new lesson, what a
  changed lesson or question asks of this item before and now, the correction, or the measurement
  before and now; for a closed one whose question or lesson was reworded, why what it asks is
  unchanged>.

## Proposals
<numbered, in the first review's template; a correction that matches comes first; a reopened item
adds "Reopened by: <reason>">

## Next step
<as in the first review's template>
```

When nothing is new or due (see "Start" above), the report is the Path line, the Corrections
section, one line saying so, and the Next step section.

## The record

`docs/interface-lessons-review.md` in the project:

```markdown
# Interface lessons review record: <project>

Lessons: <ai-interfaces commit or date>.
Log entry: <date and title of the newest log.md entry this review covered>.
Corrections checked: <date and title of each corrections.md entry checked, or "none published">.

| # | Lesson | Proposal | Baseline | Status | Event that shows it | Owner | Due | Date |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | <ID> | <one line> | <how often, evidence> | <status> | <commit, test run, count or incident> | <who> | <YYYY-MM-DD> | <YYYY-MM-DD> |
| 3a | <ID> | <one part of a bundled proposal> | ... | ... | ... | ... | ... | ... |

Assumed: <question> — <default>, <YYYY-MM-DD>.
Owner's choice: row <n>, <YYYY-MM-DD> — <the owner's words>; reason: <reason, or "none given">.
```

One status per row: a proposal with parts gets a row per part (3a, 3b...), each with its own status
and event. Every open or waiting row has an owner (the person or session that acts or checks next)
and a due date (when it is checked next; default: four weeks after the record's date, our guess);
a revisit lists the rows past their due date first. Proven and skipped rows leave both as "—".
Assumed owner answers go under the table, one line each: "Assumed: <question> — <default>,
<date>". So does each owner's choice that differs from a lesson, a question or the agent's
recommendation (declining a "do", applying against a lesson), one line each: "Owner's choice: row
<n>, <date> — <the owner's words>; reason: <the owner's reason, or "none given">". A revisit keeps
these closed (see [Revisit](#revisit)).

Baseline: written before any change, how often the proposal's problem happened so far, with the
evidence (a count from the history, logs or a checker run), marked "(recorded)" when it comes from
notes rather than a fresh count. A count gets a baseline file,
`docs/interface-baselines/<ID>-<slug>.md`, with the date, the commit, the exact command, the tool
versions and the values, so a revisit reruns the same command and compares.

Status words: open, proven, waiting for first use, stopped holding,
skipped. A proposal marked "later" is open; one the owner declined is skipped; an applied change
whose check failed stays open, and its event names the failed check. A "do" that waits on an owner
action, or on work outside this session, stays open, and its event says what it waits on. An
applied change whose "Check now" passes is waiting for first use; once later work shows its
"Event that proves it", it is proven.

## Apply (step 2)

The owner answers the report in the same session with one line: "Apply what you recommended" (the
proposals marked do), "Apply proposals 1, 3 and 5", or "Apply none; write the record". Do the work
the way the project normally runs work (yourself, or by briefing workers).

1. Record first, once the owner has chosen and before changing anything: write each baseline the
   report gives to `docs/interface-baselines/`, then the route's record (`docs/interface-review.md`
   or `docs/interface-lessons-review.md`; on a revisit, update it in its existing layout) with every
   proposal of the report, chosen or not: chosen ones open, "later" ones open, declined ones
   skipped, with their baselines, the newest log entry the review covered and the corrections it
   checked (after a first review, "none: first review", so the first revisit checks every
   entry). Add the "Assumed" lines (where the owner left a question unanswered, assume the default
   the report states) and an "Owner's choice" line for each choice that differs from a lesson, a
   question or your recommendation.
2. "Apply none": stop here; the record is the whole step. Say what it holds.
3. Work on a branch (or, with no version control, ask for a backup first).
4. One proposal at a time, in the order of "Depends on": state its "Check now" and its "Event that
   proves it", make the change, then run its "Check now" and the project's own tests and checks,
   and read their result before you touch the next proposal. Never put the changes or checks of
   two proposals in one command or script: a chained run applies the next one before the failure
   shows (a behaviour check's agent did so, then had to revert it). Commit each proposal on the
   branch once its checks pass.
5. Stop at the first failing check. Do not start the next proposal, and never weaken, skip or
   remove the check, a test, a job or a control to make it pass. Leave the proposal open in the
   record with the failed check as its event, and report: which proposal stopped, the check and its
   output, what was applied before it, and which proposals were not started. The owner decides what
   comes next.
6. A proposal whose "Check now" passes is waiting for first use; it is proven only once later work
   shows its event.
7. Checklist route, after the interface change: rerun every baselined count with the same command
   and tool version, and list each that rose, by job, page or rule, beside its baseline.
8. Complete the record (each row's status, event and date) and report what was applied, what
   stopped and what waits, with owners and due dates.

Provenance (our guesses, from the sibling collection karpathy-ideas, 2026-11-15, where a behaviour
check ran these steps): one proposal at a time and the stop at the first failing check prevent a
batch of changes whose failures cannot be told apart; applied blindly, changes that only work
together stop at the first part, so number them 3a, 3b and say "Depends on".

## Share what you learned (optional)

A [field report](field-reports.md) says which questions and lessons held on the project. Draft one
only once an item has met its problem since its baseline (proven, or stopped holding); until then,
write in the record that nothing has happened yet, with the date, and revisit later (the too-early
rule). It tells the maintainer which questions, lessons and "Checked against people" tags to
re-check against their cases; it never changes a lesson by itself.

## Measuring notes

How to take each checklist Check. Static counts from server templates or components are per
template file, leave out included partials and loop repeats, and say so.

- **Q1 jobs.** List the jobs from the docs, the navigation and the end-to-end tests; none written:
  ask the owner (default: one job per top-level navigation entry, plus forms whose page exists to
  save them). Count every job in the baseline; when there are many, ask the owner which to walk on
  a running page first, and count the rest statically, never leaving one out. A screen is a full
  page load; a swapped fragment is no screen, but its trigger is a click. Walk with the project's
  end-to-end tool or Playwright on a running page; static from routes, links and forms, marked
  "static" ("static, floor" for flows of more than three server round trips). The newcomer starts
  from the start page, types no address and knows no code, where project rules allow; name who
  walked, else ask the owner. Provenance: the default job list and the three round trips are our
  guesses; a cap of ten jobs, published until 2026-11-15, made a behaviour check's agent leave five
  of fifteen jobs out of its baseline ([corrections](../corrections.md)).
- **Q2 jobs finish.** A whole-job test drives a browser or walks the HTTP requests and responses.
  Run the tests once (a running page or the project's harness). For work an agent built, also note
  whether a check apart from the builder used the running app against criteria in a file committed
  before the build's first commit; a review of the diff alone does not count (it feeds Q9).
- **Q3 checker.** axe-core through the project's browser tests, or `npx @axe-core/cli <url>` on a
  running page; states without their own address need the checker inside the walk of Q1 (list the
  states a run by address missed). Static: a component linter (`eslint-plugin-jsx-a11y` for JSX) or
  `html-validate` on HTML files, marked "static" (fewer rules). Server templates: render the routes
  through the project's tests and check the output; with no run allowed, write "no static checker
  for this template language" and give no checker count, then list apart, as "read from the code,
  not a checker count", the failures you can see in the templates (images without a text
  alternative, fields without a label, click handlers on elements that are not controls); a
  text-search count never stands in for a checker's count (our guess: a grep finds a fraction of
  what a checker does). Until 2026-11-15 this note said only the first part, and a behaviour
  check's agent then reported no failure at all ([corrections](../corrections.md)). Name the checker, its version and
  rule set; count the pages with none too. After a change, list rules that newly fail anywhere and
  pages that got worse, not only the total. A fix rate quoted for an agent states what counts as
  fixed, out of what total, and who decided.
- **Q4 contrast.** Pair each text, icon and placeholder colour with each surface, per theme (light,
  dark, high contrast) and state (hover, selected, focus); mark a pair "used" where a selector or
  class puts them together, else "possible". Composite translucent colours over their surface
  ("approximate" when the blend space differs). Targets: 4.5:1 for normal text, 3:1 for large text
  and focus indicators, and 3:1 for control borders where nothing else (a fill, a label) marks the
  control's bounds. Colours set at run time or inline need a running page and axe's
  `color-contrast` rule. List colours that preview the user's own content apart. Provenance: the
  targets are WCAG 2.2 success criteria 1.4.3 and 1.4.11 at level AA (standard guidance), "large"
  as WCAG defines it; a pair below its target is a gap to fix with values that pass, never a
  question of look to defer (a behaviour check saw two brand-colour failures marked "later").
- **Q5 keyboard.** What the checker cannot judge: keyboard operation (tab order, visible focus,
  traps), what ARIA roles and names mean, reading order, announcements. On a running page, script
  Tab, Shift+Tab, Enter and Escape through each job and count focus stops, traps and controls never
  reached. Static proxies, controls made by scripts included: click handlers on elements that are
  not buttons, links or inputs; `tabindex` above zero; roles that need arrow keys (tablist,
  radiogroup, grid, listbox, menu, combobox, tree, slider) with no key handler on them or an
  ancestor. High-risk widgets: drag and drop, data grids, custom comboboxes, rich text editors,
  canvas. Where an agent audits accessibility, count apart the known failures it found, those it
  declined or skipped, and its findings no audit lists, kept as candidates for a person.
  Provenance: `tabindex` above zero is WCAG failure technique F44 and the arrow-key roles follow
  the WAI-ARIA Authoring Practices (standard guidance); the high-risk list is a published case
  ([GitHub a11y agent](../cases/2026-05-15-github-accessibility-agent.md)) plus our guess (canvas,
  rich text). They are proxies: a hit is a place to test, not a proven failure.
- **Q6 controls.** Count the shared layout once, apart. Behind a fold: anything hidden until a
  click (menus, disclosures, tabs, dialogs, script-toggled parts). Consistency counts: style values
  outside the design tokens (colour literals, font sizes, pixel spacing, arbitrary utility values),
  controls of a kind that skip its shared component (the class or partial most of that kind uses),
  modifier classes or props in use per shared component, and action labels shown with more than
  one icon or icons with more than one label. Static from the code; shown counts are firmer on a
  running page. A change meant to remove or fold options states what each job loses; a control
  that serves no job the owner listed is a question for the owner, never removed on that ground
  (a behaviour check's agent held to this and asked).
- **Q7 judges.** Look in scripts, CI steps, prompts, agent instructions and past audit or review
  reports written by models; leave out models that rate the content the product makes. Note
  whether the shared items were held out from tuning, the judge version (changed since: not
  checked), what it sees (screenshots, code, both, the running page), whether it grades its own
  builder's work, whether its maker also made a model it ranks, and how each finding reaches a
  person before action. None checked against people: a gap; compare it with people on a small set
  before acting on its ratings. No model rates the interface: not applicable.
- **Q8 simulated users.** Only walks where a language model chooses the steps (a simulated
  newcomer, a think-aloud, a cognitive walkthrough); a scripted walk belongs to Q1 and Q2. Note
  whether it rates confusion screen by screen with its walk's history. Never compared with people:
  a gap; report its counts as an agent's, not as people's cost. No agent walks: not applicable.
- **Q9 build loop.** Look in agent instructions, skills, CI and review bots. Items: each checker's
  remaining failures go back to the agent by name (tests, linters, accessibility checker); the
  whole page, and every page sharing the component, is checked again after each fix; a retry
  limit; a reviewer or grader apart from the builder; grading criteria in the builder's prompt;
  rules that send complex or high-risk work to people, and what enforces them; the project's own
  record of past fixes given as context; the tokens or time a run costs (logs, CI timings, or "not
  recorded"). Gap: no checker result reaches the agent, or no check apart from the builder; partial
  gap: items only written down, with nothing enforcing them.
- **Q10 counts that may not rise.** Jobs failing in Q2 and keyboard counts in Q5 count too. Name
  who may update each baseline: an agent can, unless something outside its reach blocks a raised
  line (a protected branch, code owners, a hook); name it, or write "nothing". The job walk test
  reruns with the project's suite on every change, not only at a review. After a change, rerun
  each count with the same command and checker version and list each that rose, by job, page or
  rule, beside its baseline. No baseline taken before the change: say so; its effect cannot be
  shown. A rise a change needs (a new job's control) is listed with the job it serves for the
  owner to accept; never remove or hide a control, a job or a check to make a count hold. In a
  behaviour check an agent asked to add a needed control kept every control, raised the baseline
  itself and asked the owner to accept it: nothing blocked an agent there, which is the gap this
  question asks about.

## The checklist report

Baseline files: `docs/interface-baselines/Q<n>-<slug>.md` in the project (Q1-jobs,
Q3-accessibility, Q4-contrast, Q5-keyboard, Q6-controls), written by step 2 of the route before
anything changes, each with the date, the commit, the exact command, the tool versions and the
values by job, page or rule. Where the project's tests already hold a baseline, the file names that
file and its command instead of copying values.

```markdown
# Interface review: <project>, <YYYY-MM-DD>

Path: first review (checklist route) — <no docs/interface-review.md in the project>.

Interface: <kind; pages, states and themes in scope>. Jobs counted: <n>.
Change planned: <what, or none yet>. Running page: used | not used (<why>).

## Not run
- Q<n>: `<exact command>` — <why; "needs a running page" or "needs a tool run">.

## Ask the owner
- Q<n>: <question>. Default: <assumed if unanswered>.

## Answers
- Q<n> <question> — gap | partial gap | no gap | not applicable: <measurement>;
  static | running page | recorded. Baseline: docs/interface-baselines/Q<n>-<slug>.md.

## Baselines
- docs/interface-baselines/Q<n>-<slug>.md: <date>, <commit>, `<command>`, <tool and version>;
  <values by job, page or rule>.

## Proposals

1. <the change in a few words> — Q<n> ([checklist](<link to checklist.md>)), gap | partial gap.
   Today: <what the project does, with the measurement>.
   Change: <the proposal>.
   Trade-off: <from the question's Trade-offs and your measurement: what it costs, when not to do it>.
   Evidence: Q<n>, its lesson IDs, and links to case sections you read.
   Depends on: <proposal numbers, or none>.
   Cost: S | M | L (S under a day of agent work, M a few days, L a week or more).
   Recommendation: do | later | skip (exactly one word), with a one-line reason.
   Check now: <the count or command, and the value that passes once applied>.
   Event that proves it: <what later work must show>.
2. ...

## Outside this review
<as in the lessons route's template>

## Next step
<as in the lessons route's template: the three replies and the link to "Apply">
```

Every proposal fills every line, as in the lessons route. A revisit uses the
[revisit report](#revisit-report).

The record, `docs/interface-review.md` in the project, written after the owner picks
([Apply](#apply-step-2)):

```markdown
# Interface review record: <project>

Checklist: <ai-interfaces commit, or the date when run from an uncommitted copy>.
Log entry: <date and title of the newest log.md entry this review covered>.
Corrections checked: <date and title of each corrections.md entry checked, or "none published">.

| # | Question | Proposal | Baseline | Status | Event that shows it | Owner | Due | Date |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Q<n> | <one line> | <baseline file and its value> | <status> | <commit, test run or count> | <who> | <YYYY-MM-DD> | <YYYY-MM-DD> |

Assumed: <question> — <default>, <YYYY-MM-DD>.
Owner's choice: row <n>, <YYYY-MM-DD> — <the owner's words>; reason: <reason, or "none given">.
```

Statuses, owners, due dates, baselines, assumed owner answers and owner's choices work as in
[the record](#the-record) of the lessons route: one status per row (a proposal's parts: rows 3a,
3b), every open or waiting row with an owner and a due date, and a revisit reruns each baseline
file's command and compares.

Provenance of the report's rules (all our guesses, carried over from the sibling collection
ai-migrations, none measured): the S, M and L sizes (prevent proposals with no size; applied
blindly, an agent's day is not a person's day, so read them as relative), one word per
recommendation (prevents hedged advice; the reason line carries the nuance), one change per
proposal (keeps each check traceable; applied blindly, it can split changes that only work
together, so number them 3a, 3b and say "Depends on"), and the four-week default due date
(prevents rows that wait forever; applied blindly, a slow project gets reminders before anything
could have happened, so set a date that fits its pace).
