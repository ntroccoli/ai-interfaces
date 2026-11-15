# Evidence: the studio-go interface redesign with agents (November 2026)

## About this file

studio-go is the maintainer's own project, kept in a private repository. This file is our summary of its
records: the coordinator's event log, the audit and walkthrough reports, the job-walk test and its baseline, the
reports of the mock walks, the owner's dated decisions, the session status files, and a review of the work
measured with the published ai-migrations lessons as a yardstick (a self-review: the coordinator ran it itself,
after compacting its context, where that method expects a new session). It also draws on written answers to ten
questions this collection put to the project (the owner relayed them, 2026-11-14): the project's interface
coordinator wrote them from the repository as it stood on 2026-11-14 at 21:40 and from commands
run for them, says where a figure was only taken from its own earlier log, and notes that it ran the work it
describes. It was written on 2026-11-14 from copies of those records kept in the maintainer's private archive.
Nobody outside the project has checked it, so it is never independent evidence. Numbers appear as the records
give them; where two records disagree, both are shown. The owner's words are paraphrased.

## The product and why it was redesigned

studio-go is a single-owner pipeline that makes faceless videos (script, voice, pictures, clips, sound) on one
PC; its owner drives it every day from a local web UI (a Go server with htmx pages, dark theme). On 2026-11-13
the owner asked a coordinator session to audit the UI's workflow, design and options, and listed nine
complaints, such as too many choices when setting up a channel and a crowded review in which a redone picture
showed up somewhere else. A history drawn from two months of project records added how the owner had met the UI so far.
After the first round of fixes the owner still found the UI cluttered and asked for a redesign organised around what they come to the studio to do, with several looks to choose from.

## Timeline

| When | What happened |
| --- | --- |
| 2026-11-13, late evening | The coordinator starts round 1 (the audit). |
| 2026-11-14, overnight | Agent panels inventory and review the UI; a synthesis plans 40 packages; workers land 39 packages, in about 6 hours by the event log (from 00:40 until 05:30) or 01:06 to 05:20 by the first and last commits. |
| 2026-11-14, by early afternoon | The owner tries the result for roughly ten minutes and finds three misses; a read-only check covers every finding; the owner asks for a redesign by their jobs; a newcomer walkthrough and a prior-art survey per job run; the work is reviewed with the ai-migrations lessons as a yardstick and the owner picks the proposals to apply. |
| 2026-11-14, afternoon | A scripted walk of each job becomes a test, with committed counts as its baseline. |
| 2026-11-14, evening | Three clickable mocks, colour themes, typefaces, two sheets of layout sketch cards and further layout mocks; the owner picks the three-pane layout as the redesign and decides it is built whole before they test it; four losing mocks are removed. |
| 2026-11-14, late evening | The project answers this collection's questions from the repository as it stood that evening; the three-pane mock is still being completed and nothing of the redesign has been built. |

## Round 1 audit and build

- **Inventory.** Read-only Sonnet 5.5 subagents (five, per the event log) wrote four factual inventories of the pages
  and their controls, taken from the code, plus the history of the owner's experience. None of them ran the app.
- **Blind panel.** Six specialist sessions (information architecture, two interaction designers sharing one
  brief, forms and options, wording, visual design) each reported alone, never shown the owner's complaints.
  They worked from the inventories, the templates and 66 screenshot tiles covering 22 pages. Five seats used
  Opus 5.5 at high effort; one interaction seat used Fable 5.2 at high effort, so the two models could be
  compared on an identical brief.
- **Synthesis.** A Fable 5.2 session reduced the 69 seat findings to 33 problems, added 7 more from its own
  reading of the complaints (40 findings in all), set down 12 interface rules (R1 to R12), each to be enforced by
  tests (19 test functions in the end), and planned 40 packages. A fresh-context subagent then argued against that plan and caught files claimed
  by two lanes, a dependency pointing the wrong way, and a sweep that would have held up every package; by the
  synthesis's own account it helped on mechanics more than on design. The owner took all ten recommendations put
  to them.
- **Build.** 39 packages reached main overnight (timeline above), with as many as 8 worker sessions at a time,
  each working in a separate worktree. The rule tests came first; every template still breaking a rule carried a
  marker naming it, and the shared brief told packages to remove markers, never add them, so that violation counts
  would only fall. That was an instruction, not a guard: 13 packages edited the rule-test file itself, and a
  proposal to accept such edits separately was deferred. The inventories and the synthesis were read from code
  without running the app, and the build's tests used no browser; the records show no agent working through a job
  in the running UI before the owner did. Since then no commit message mentions a revert: the project's search of 271 commits from
  48 packages after 23:00 on 2026-11-13 found none (a revert worded otherwise would not show).

## What the owner found after round 1

Every rule test passed. Yet within roughly ten minutes the owner met three problems that none of them caught
(one slipped through because the test for rule R2 checked only half of what the rule asked):
the action to keep a new take was refused while a run was going; a size switch showed three letters with no
label; and a video's cast had no way in (it was filed beneath a pipeline step). In the owner's view the UI was still crowded,
its actions unclear, and boxes sat within boxes throughout.

A read-only check then compared each of the 40 findings with main. Six Sonnet helpers did a first pass and one
session re-read the gaps in the code. Verdict: 20 findings fully built, 14 nearly, 5 in part, 1 parked, with 17
gaps. Each package had been accepted against its brief alone, so parts of the plan were dropped between packages;
the owner had run into the first gap before the check existed. Two fix packages later, another session judged the
table again: 25 fully built, 13 nearly, 1 in part, 1 parked, with 8 gaps still open (1 of them in part).

In the decision log the coordinator gave three causes. Pages arranged around the pipeline were improved, not
rethought. Nothing left the screen, since its brief steered workers to hide options instead (the event log quotes
a blanket ban on removal; the build brief itself barred removing a creative capability and offered staging,
folding or a default instead). And the owner's own jobs were never the starting point. The crude counts of the
templates below agree, in the project's own reading: between the start of the interface work and the evening of
2026-11-14 (a span that also covers the fix packages after round 1), folds and buttons grew in number.

## What only the owner's use found

No agent and no test found these; the owner did, all on 2026-11-14:

- In roughly ten minutes of using the real studio once round 1 had landed: the refused keep action during a run, the unlabelled
  size switch, the cast of a video with no way in, and the verdict that the UI was still crowded.
- While following a research run in their own browser: the agent did not manage to copy out its final result.
- In a produced video: a thumbnail in one language whose lettering the image model got wrong, because a code path new since the
  day before bypassed the existing typed lettering.
- Clicking the mocks in the evening (none of them had been seen rendered by an agent): content should sit in the centre; text and
  buttons were too small; themes should use a pure black background; work in progress should always show in the left
  bar with small pictures and previews on hover, as the old bar had; a monospaced typeface still showed after
  they had picked another (as the coordinator read it, an earlier choice had been remembered); the typeface and colours of the editorial look
  did not suit; and the "themes" offered were colours, where they had asked for different layouts.

## The newcomer walkthrough

A Fable session at high effort played a first-time user (the coordinator's handoff file at the time names Fable
at high effort, with no version number; the walk's own report and the project's answers record no model). Its
brief barred it from the code, the templates, the tests, the docs and the README: it could learn the app only from what the screens showed. It
drove headless Chrome with Playwright in a 1440 by 900 pixel window. On a demo copy (sample data, simulated
engine) it could click anything; on the real studio it only loaded pages, with no clicks and no forms. It tried
the owner's six jobs, each from the home page, and wrote down every screen, click, hesitation and unfamiliar
word, backed by 187 screenshots.

| Job | Cost | Done |
| --- | --- | --- |
| 1 Set up a new channel until it can make a first video | 14 screens with 31 clicks, plus 4 typed fields | yes |
| 2 Turn an idea into a video | 3 screens with 7 clicks | yes |
| 3 Have one shot made again, compare, then keep one | 4 screens with 14 clicks, plus 2 reloads | no: the demo never showed a new take |
| 4 Find out what runs now and what is queued | 2 screens with 1 click | yes, though three places disagreed |
| 5 Move a queued job to the front, pause everything, resume it | 3 screens with 6 clicks, plus 5 clicks trying to queue a second job | no: the demo's queue buttons did nothing |
| 6 Styles: locate, make, blend two, favourite, assign to a channel | 7 distinct pages over 9 visits, some 20 clicks, plus 1 reload | yes, apart from blending: it found no control for it |

It also measured: a finished video's page ran 19 to 33 windows in height (17,494 pixels in the demo copy; 28,837 and
29,825 pixels in the real studio) and opened on numbers for engineers, a file location and a hash value; in the channel
job, 25 of 31 clicks only confirmed or adjusted what a two-message chat had already drafted; the form that starts
a video sat 2,800 pixels below the button for choosing an idea; the left sidebar carried 16 to 24 controls, rising
to 138 during a render because each of its 120 progress squares took keyboard focus; the sidebar, the queue page,
the home page and the page of the run each told a different story about what was running; and one concept went
by up to five labels (the queue). It ranked ten changes, worst first.

Limits it stated itself: the demo's engine was simulated, so it could not tell which contradictions also turn up
in the real studio; its clicks were scripted; the demo did not let it finish jobs 3 and 5, and most sample
videos there were empty, with no cast or sounds.

### Found by the walk, missed by the audit

For this collection's questions, the project's coordinator searched the audit's synthesis (40 findings drawn from
the reports of six specialists, who read templates and 66 screenshot tiles) for every main finding of the walk. Missing from the
synthesis: the page height (one finding mentions a single block of about 1,300 pixels), the channel set-up count
(no finding counts the channel set-up; the redo finding below holds the only click count), the gap between choosing an idea and the button that starts
the video, the four places disagreeing on what runs (the single disagreement the synthesis names concerns menu labels
and titles), the cast with no way in from its video, and the missing blend of two styles. Present: redoing one
picture (a finding that put it at about 9 clicks and 3 queued jobs) and one word per thing with no machine words.

Among the 10 changes the walk ranked, 5 changes are absent from the synthesis, 1 change is mostly absent (a home for
styles), 3 changes are in it, and 1 change was not checked. The rule tests check properties of the page code (where an
answer appears, whether a button can be disabled, how a dangerous action is confirmed, which words appear) and none counts a job, so what the walk
added was length, order, and whether pages agree.

## Prior art per job

Sonnet research subagents looked at how current products handle the six jobs (brand kits and style
libraries, prompt-to-video tools that show a plan before spending credits, job queues, redoing one part), giving
a link for every claim and marking each as a page read, a search excerpt only, or a guess. Some pages would not
open and no Reddit or Hacker News threads turned up (other forum posts were used), so part of the survey rests
on excerpts. The written design lists it as
one of its inputs.

## The scripted job walk

Since passing rule tests had not revealed how long the jobs were, an Opus 5.5 worker at high effort turned the
six jobs into an automated test. It first fixed the demo so every job could end: the demo's queue now drives the
simulation, and redoing a shot now yields a fresh take to review. The test runs the live demo inside the test process and
walks each job over HTTP, using nothing but controls present in the pages it gets back, and it merges partial
page updates into the page the way the browser does. The walk takes a control only if it can be seen, is enabled and is unique in the place the step names. The test counts screens (each full page fetched), clicks (following a link, sending a request,
opening a fold, changing a choice) and fields typed. A job that cannot end, or any count higher than the committed
baseline, fails the test; counts can only go down. Script-drawn controls and a bar hiding a button are beyond
what it sees. Run 54 times across three test processes at once, it gave the same counts every time, and a count
edited upward by hand was shown to fail. Its own limits: the six walks must run one after another (run in
parallel they timed out); the redo job assumes an idle studio, because while a production ran a card failed to
refresh itself in 3 of 30 runs (a product race, fixed later the same day). Writing the walk is how that bug was
found.

The baseline was committed once round 1 had landed: no tool counted the jobs on the pages in their state ahead of
the 39 packages, so round 1's effect on the jobs has no measured before and after. The walk at 21:40
on 2026-11-14 gives exactly the baseline, since no change since then touched a job's path.

The walk follows the shortest route and accepts every default, so its counts sit below the newcomer's: the
newcomer stepped through all ten channel set-up steps and tried the redo three times; the walk does neither.

## Mockups and the owner's choices

A written design came first: five menu places (Today, then Channels, Videos, Queue and Workshop); a video's page arranged
by its parts rather than by pipeline steps; one gesture for changing anything (select it, describe the problem,
see what gets remade and at what cost, confirm, then old next to new in its place); a new video on a single
screen; defaults that decide, with technical detail behind one line per page; and no nested frames. Unlike round
1, it listed what each job could lose, as candidates for the owner.

That design was mocked in three looks (quiet console, gallery, editorial workbench), each made by its own Opus
5.5 session. The project's answers give high effort for every mock session; two of the three status files log
low effort and "effort 15", and the answers count a status line reading low, for a session started at high effort, among the
guesses some workers wrote. Each look took 19 to 30 minutes of one session. The mocks are static clickable HTML with one
stylesheet built on variables for colour and size and one script that uses no library; each lets all six jobs
be clicked through from the home page. Every mock states the screens and clicks each job takes, by the job-walk test's rules. For the console and the
later layouts a jsdom script clicked each job through and counted; the gallery and editorial counts are each
worker's own step tables, checked by static scripts over the pages and by reviewers reading the files (Sonnet subagents with a clean context reviewed the console, the editorial mock and the two later layouts; the editorial review had 17 findings, 15 fixed; some review findings were left as drawn). The mocks are partial: just three of their videos can be opened, the Workshop draws no flows for voices, music or captions, and one later layout draws a few shots of a long video.
At first the jsdom walker stayed in a session's scratch folder; later the same day the walkers for the console and
the later layouts, a link and button check and the contrast script were committed with the mocks, so those counts
can be rerun; the gallery and editorial counts cannot. The contrast script computed ratios (the WCAG formula) of each
theme's colours for text, muted text and accent against its background. The owner had let agents
view pages headlessly, in a recorded decision, and the brief asked for screenshots; but that grant
was never written as a permission rule, so the agent tool's permission guard refused them, the workers did not
try to get around it, and no agent ever saw a mock rendered; the owner's look was the first. The mocks were drawn
for a 1440 by 900 pixel window only: no phone width, and in two of them no keyboard way to reorder the queue.

The owner clicked through all three and took the quiet console as the base, with changes: centre it, enlarge type and
controls, borrow the editorial spacing, use pure black, and keep the work in progress and the queue visible in
the left bar at all times; the gallery look was set aside. The base then came in seven colour themes. The owner
liked one of them, but said the themes they had asked for meant different layouts and components, not colours,
shown first as plain cards. Eleven layout cards and eight typefaces followed (drawn by the same session that made the
console mock), and a fresh Fable 5.2 session made a separate sheet of 18 more cards from a brief that named four
groups of ideas and asked for cards unlike the first design. From the first 11 cards the owner asked for 2 cards to be built out, and from
the other 18 cards, 7 cards; all 29 cards took a 19-minute session plus part of a second. The owner kept one theme and,
in the end, a single typeface. After seeing the three-pane layout (a rail holding the menu and the work in
progress, then a list, then the chosen item open beside it) with the parts they had liked from the second sheet, the
owner chose it as the redesign. The gallery, editorial and parts-in-columns mocks and the second card sheet
were then deleted, the console mock and the rail mock remain, since the panes reuse their files for now, and the two
sessions just starting on two more layouts were halted. The mock folders held 65 HTML pages at one count during the evening and 32 HTML
pages (2026-11-14, late evening).

When the coordinator asked which job should come first and how long each wave would be in use, the owner turned
the waves down: they will test the redesign once all of it exists, and then give feedback. To surface a wrong turn
earlier, the coordinator kept four things: the finished mock serves as the specification; each job's walk takes
the mock's count for that job as its target; an agent new to the code walks every job on the demo as soon as it is built;
and each plan item names the test that proves it. The owner also wanted fewer agent reviews of what they assess
by eye, such as looks, layouts, wording and flows, since they can point out problems at the end.

## Who did what

- **AI.** Coordination: one Fable 5.2 session at high effort (plans, briefs, acceptance, the event log).
  Inventories and research: Sonnet 5.5 subagents. Audit seats: Opus 5.5 at high effort, plus one seat on Fable 5.2.
  Synthesis: Fable 5.2 at high effort. Round 1 build workers: Opus 5.5 at medium or high effort and Sonnet 5.5 at medium (the event
  log's two Fable 5.2 sessions in that round are the panel seat and the synthesis). Newcomer walk: Fable at high effort (see above). Job-walk test: Opus 5.5. Mocks: Opus 5.5
  sessions, with the second card sheet on Fable 5.2 at high effort. Reviews: workers were to run a code review at medium effort on their own
  branch (4 of 28 large packages carry no review record), and Sonnet subagents with a clean context reviewed the mocks; a fresh-context subagent made the challenge pass. A
  later batch of process checks ran on Opus and Haiku.
- **Rule-based tools.** Tests for rules R1 to R12 over templates and handlers, with exception markers that can
  only be removed; the scripted job walk and its baseline; tests that cap the database statements of two pages; a
  test listing plan items that lack a passing test; jsdom walkers and link, button and contrast checks for the
  mocks; checks that block a large merge with no review line; headless Chrome and Playwright for the newcomer walk;
  the full Go test suite as the merge gate.
- **People.** The owner alone: the first complaints, the list of jobs, the ten audit choices, about ten minutes
  of use after round 1, every choice of look, and which review proposals to apply. The records name nobody else.
  The owner was the first and only one to see the mocks, and also launched the second research trial once the
  permission guard had blocked the coordinator.

### Where the model seemed to matter

The project's own observations, few and from one project, mostly recorded in the coordinator's log rather than
re-measured:

- Delivering reports: among the Sonnet workers with something to send, 3 of 4 workers missed a delivery step
  one or more times; every Opus, Fable and Haiku session delivered.
- One Sonnet worker skipped a required review on a change of 690 lines.
- On the same audit brief, two blind judging subagents each rated the Fable seat a little better than the Opus
  seat; the owner did not judge them.
- Layout cards: from the Opus set the owner wanted 2 cards of 11 cards shown in detail, and from the Fable set
  7 cards of 18 cards; the answers call this no clean comparison, since the two briefs differed, the Opus set was
  drawn by the session that made the mock itself, and the owner looked at one set after the other.
- Several Opus workers guessed status lines a tool should have supplied (low effort for a session started
  at high effort; context near 60% when the tool showed 18%).

## Counts

### Rule violations before and after round 1

Templates or handlers that broke each rule, as counted by the rule tests when they were written (the record gives
no count for R3 or R6). After round 1 every rule is at zero, and a test refuses any new exception marker.

| Rule, in short | Before | After |
| --- | --- | --- |
| R1 answers land where the click happened | 10 violations | 0 violations |
| R2 buttons reflect their pending work | 44 violations | 0 violations |
| R4 a single primary button per card | 18 violations | 0 violations |
| R5 one scale for destructive actions | 14 violations | 0 violations |
| R7 internal names kept off the screen | 3 violations | 0 violations |
| R8 a single word for each thing | 42 violations | 0 violations |
| R9 current location always shown | 19 violations | 0 violations |
| R10 forms open with required fields | 2 violations | 0 violations |
| R11 saves state their reach | 11 violations | 0 violations |
| R12 every waiting item gets a row | 2 violations | 0 violations |

Page load times, measured live on single loads: the home page fell from 1.0 to 2.2 seconds to 0.14 to 0.34
seconds, and an episode page with 37 shots from 1.6 to 2.2 seconds to 0.14 to 0.27 seconds. Two tests now cap
those pages at 112 and 170 database statements per load. Test functions in the web package grew from 241 functions
ahead of the interface work to 399 functions (2026-11-14, late evening).

### Findings built

| Check | Built | Mostly | Partly | Parked | Gaps open |
| --- | --- | --- | --- | --- | --- |
| First check after round 1 | 20 findings | 14 findings | 5 findings | 1 finding | 17 gaps |
| Second judgement, same day | 25 findings | 13 findings | 1 finding | 1 finding | 8 gaps (1 of them in part) |

A test now lists the plan items not yet built: 15 of the 40 findings (2026-11-14, late evening).

### Screens and clicks by job

Each cell is screens, then clicks, for jobs 1 to 6 as listed in the walkthrough table. "Newcomer" is the hand
walk on the UI after round 1; "Walk test" is the scripted walk on the same UI once the demo was fixed (its
baseline, still unchanged that late evening); the mock rows are each mock's own count (script-walked for the
console and the later layouts; counted by the worker and checked by review for the gallery and editorial mocks).
The owner's pick is the three-pane layout; its counts become what the build aims at, and the jobs it does
not yet draw have none. A dash means that mock does not draw the job.

| Walk | Job 1 | Job 2 | Job 3 | Job 4 | Job 5 | Job 6 |
| --- | --- | --- | --- | --- | --- | --- |
| Newcomer, after round 1 | 14 screens with 31 clicks | 3 screens with 7 clicks | 4 screens with 14 clicks (unfinished) | 2 screens with 1 click | 3 screens with 6 clicks (unfinished) | 9 visits with roughly 20 clicks (no blend) |
| Walk test, after round 1 | 10 screens with 12 clicks | 3 screens with 6 clicks | 3 screens with 7 clicks | 2 screens with 1 click | 3 screens with 6 clicks | 9 screens with 10 clicks (no blend) |
| Quiet console mock | 5 screens with 5 clicks | 3 screens with 3 clicks | 3 screens with 6 clicks | 1 screen with 0 clicks | 2 screens with 4 clicks | 6 screens with 12 clicks |
| Gallery mock | 5 screens with 6 clicks | 3 screens with 3 clicks | 2 screens with 5 clicks | 2 screens with 1 click | 2 screens with 4 clicks | 6 screens with 13 clicks |
| Editorial mock | 5 screens with 5 clicks | 3 screens with 3 clicks | 2 screens with 4 clicks | 2 screens with 1 click | 2 screens with 4 clicks | 6 screens with 10 clicks |
| Three-pane layout (picked) | - | 3 screens with 3 clicks | 1 screen with 6 clicks | 1 screen with 0 clicks | 2 screens with 4 clicks (1 screen with 3 clicks from the work cards in the rail) | - |
| Parts-in-columns layout | - | - | 2 screens with 6 clicks | 1 screen with 0 clicks | same as the console | - |

Typed fields in the walk test's baseline, jobs 1 to 6: 3, 0, 1, 0, 1, 1 fields; the three-pane layout needs 0
typed fields in the jobs it draws. The mocks need 2 typed fields to
set up a channel and no more than 1 field in any other job. The styles job in the console and gallery mocks takes more
clicks than the walk test because those mocks add blending two styles, which the old UI could not do at all;
leaving the blend out, the gallery needs 9 clicks over 4 screens. The mock counts are not quite like for like: the editorial styles job keeps the default weight and channel (12 clicks when both are changed, as the console counts them), and the gallery redo job leaves out returning to the shot, which would add a screen and a click. The coordinator's evening summary and the project's answers still list the console's job 4 at 2 screens and 1 click, the count
from before the left bar began showing the work. Mock counts follow the shortest route with no mistakes; as the
first two rows show, a newcomer's counts run higher: in the four jobs both completed (jobs 4 and 6, and jobs 1 and 2), the newcomer needed
1.0x to 2.6x the walk test's clicks (the project gives 1.2x to 2.6x, leaving out job 4, at 1 click each). No newcomer has walked any mock, so nobody knows whether a newcomer would
match a mock's counts.

### Consistency counts

Counted once by the project for this collection's questions, crudely, by text search over the templates and the
stylesheet source, before the interface work (2026-11-13) and as the
repository stood on 2026-11-14 at 21:40. Frames inside frames were left out of the count, since that needs the rendered pages; nothing of this is automated.

| Count | Before | Now |
| --- | --- | --- |
| Templates | 96 templates | 103 templates |
| Template lines | 6,392 lines | 7,075 lines |
| Elements with the card class | 303 elements | 305 elements |
| Folds (details elements) | 105 folds | 193 folds |
| Buttons | 352 buttons | 468 buttons |
| Actions posted by htmx | 249 actions | 279 actions |
| The old confirm pattern for dangerous actions | 2 uses | 0 uses |
| Text-size classes used across templates, each counted once | 7 classes | 7 classes |
| Hex colours written in the stylesheet source, each counted once | 36 colours | 36 colours |
| Font sizes written in the stylesheet source, each counted once | 13 sizes | 14 sizes |

### Automated checks and what is not measured

Automated late on 2026-11-14: 19 rule-test functions (every rule at zero), the job walk (six jobs,
all finished, counts as in the table above), the two statement caps, the plan-items test, and the mock walkers.
Not measured on the product itself: contrast (computed only for the mock themes), accessibility (no automated
accessibility checker runs; some tests assert aria attributes), and consistency (the table above comes from a
single crude text search).

### Process counts

| What | Count | Basis |
| --- | --- | --- |
| Round 1 packages merged | 39 of 40 packages | recorded (event log, status files) |
| Commits since round 1 began whose message mentions a revert | 0 commits, among 271 commits | measured (a search of commit messages, by the project) |
| Gate runs wasted because main moved mid-gate | 10 runs (7 full, 3 short), across 2 workers; the build brief counts 7 green gates | recorded (event log, build brief) |
| Worker requests to edit files not on their list | about 20 requests | counted from the conversation |
| Coordinator documentation commits | about 30 commits that moved main (event log); 46 commits in the review's somewhat longer window (git history) | two counts, both recorded |
| Packages above 300 changed lines merged with no review record | 4 of 28 packages (the review's wording) | 3 packages read from status files, 1 package from the event log |
| Sonnet workers with something to send that failed at least once to deliver it | 3 of 4 workers | recorded |
| Opus and Fable sessions whose messages all arrived | 13 of 13 sessions | recorded |
| Idle notices with no content | about 12 notices | counted from the conversation |
| Proposals from the review that used the ai-migrations lessons | 16 proposals: 14 chosen (12 passed their own checks, 2 failed them in part), 1 deferred, 1 skipped | recorded |

### Cost

- Sessions: nobody counted them exactly.
- Wall time, clock times from the evening of 2026-11-13 into 2026-11-14: from 23:30 until 00:36, the audit and the
  plan (7 sessions plus 5 subagent inventories); from 01:06 until 05:20, the round 1 build commits, with as many as
  8 workers at a time; from 12:15 until 19:30, fixes and checks; from 18:30 until 21:15, mocks, colour themes,
  layout cards and layouts, with 4 sessions done, 2 halted before use and 1 still at work.
- Packages since the job walk: 12 status files, with 11 runs of the full suite, of which 2 were wasted because
  main had moved; each package took between 14 minutes and roughly 2.5 hours of wall time.
- Tokens: not recorded for worker or coordinator sessions.
- Not measured: plan usage per phase, money, and the owner's hours.

## Events and failures

The coordinator wrote this log from its own session before a compaction; most counts were read from tools or
files at the time, a few were counted from the conversation. The log has 17 events; its second is split in two
here, and items 19 and 20 are taken from two other records: the lessons review and the coordinator's handoff.

1. **Green rule tests, long jobs.** With every rule test green, the owner found three misses in ten
   minutes and the newcomer walk then found ten more problems. The rules checked each page's conformance, never
   the cost of a job, and one rule's test covered only half of the rule.
2. **A plan that only polished the old structure.** It came from inventories of the existing pages, which followed the
   pipeline's steps, so the plan kept that shape.
3. **No removal allowed.** The event log says the coordinator's brief banned any removal (the build brief's
   written limit covered creative capabilities and offered staging, folding or a default instead); either way, 14
   ways of changing an episode turned into a menu of 11 choices.
4. **Plan items lost between packages.** 17 gaps, which only a review after every package had landed revealed.
5. **Racing merges.** Running 6 to 8 workers against a full suite lasting 7 to 10 minutes, main changed during nearly every
   gate; one worker threw away 3 green full runs, another 4 full runs and later 3 shorter runs (10 gate runs in all; the build brief counts 7 green gates lost), until the gate rule was changed.
6. **A stale generated stylesheet** that was committed to the repository came out of a merge out of date; one test
   failed on main for every session and 2 workers halted.
7. **Checks run in the main checkout** produced 5 false failures, because a merge altered a fixture while the suite
   was running.
8. **Lost messages**: among the Sonnet workers with something to send, 3 workers out of 4 missed a delivery step one or more times (a
   final report that never came, one that came only after a nudge, a question that never reached the coordinator
   while its worker sat waiting); two workers also marked themselves done before merging.
9. **Empty traffic**: about 12 idle notices with nothing in them and 4 opening messages with no question.
10. **File lists that did not match the work**, with about 20 requests to edit something beyond a worker's list; one worker
    dropped part of its package rather than ask.
11. **Reviews skipped**: of the packages above 300 changed lines, 4 out of 28 have no review record, one of them a Sonnet
    worker's episode-page change; for that one the coordinator tallied the page's actions, cards and ids on both
    sides of the change.
12. **A restart ran 22 minutes late**, against the owner's rule.
13. **Blame before data**: a new card on the home page was named as the reason it loaded slowly; once timed, it
    took 1 to 2 milliseconds and the delay came from two older causes.
14. **An outside tool where the app had its own**: the first research button ran through a separate tool for
    sessions, while the app could already start agents itself; the first trial also overwrote the owner's clipboard; a second trial,
    a headless agent call like the ones the app makes, worked in 15 minutes, started by the owner after the
    permission guard had blocked the coordinator's attempt. The owner asked why the app could not do this itself,
    and before the day ended the button ran on the agent runner the app already had.
15. **A working step replaced**: to keep the clipboard safe, the research skill lost a copy step that had
    succeeded on 6 runs, and the replacement visibly struggled in front of the owner.
16. **A naming choice made alone**: the final sweep fixed a term the owner had not yet ruled on; the owner later kept it.
17. **Proposals clashing with existing decisions** (3 proposals) reached the synthesis because the blind seats
    never received the decision digest; the synthesis and the challenge pass caught them, and none was built.
18. **An unrelated bug** in thumbnail lettering for one language surfaced along the way and was fixed.
19. **Overlap the lessons review found**: at least 20 files changed by packages of both coordinators within 15
    hours.
20. **The worker cap did not hold**: the plan for round 2 caps workers at four, yet the same evening the owner
    asked for as many as possible and 8 packages ran at once.

Who caught them, by the project's answers: the owner (the three misses in the interface, the detour in the
research button, the lost copy step, the wrong lettering on a thumbnail); a review that only read the code (the 17
gaps); the tests (the stale stylesheet); the coordinator, while reading what its tools printed (the lost messages
and the lost suite runs); the synthesis together with the challenge pass (the proposals that clashed with
decisions).

Also on record: the pair of interaction seats on one brief overlapped on roughly 10 of 12 findings; two blind model
judges (Opus and Sonnet, reading in opposite orders) each rated the Fable seat a little better, yet the synthesis
saw neither as clearly ahead once the findings were merged. Parts of four of the nine complaints were out of reach for
every blind seat, since they concern the owner's work off the page and what they expect of it; one complaint (how
good the writers are) was covered by nothing, and three pages (the light theme, a setup guide, a shot-matching
page) were reviewed by no seat. The mock
workers could not take screenshots, so no agent ever saw a mock rendered. Some workers guessed the model and context lines of their status files instead of reading them. One planned change rested on a field the app never had.

Designs the owner turned down, in order: the gallery look; the typeface and colours of the editorial look, though
its spacing stayed; seven colour variants presented as the themes; every typeface but one; a switch that would
have shown the script and the list of shots before any picture is made (left out on the coordinator's advice);
and building in waves with their use in between. Liked but not chosen: the parts-in-columns layout and a layout with the work in a rail.

## What worked

- Markers inside each template, plus a test for markers left behind, let 40 packages move in separate lanes while
  progress read as falling counts.
- Chaining packages on the same files to one session: later packages in a chain found cases the earlier ones
  missed.
- Arguing against the plan before the build, and a common brief that kept every package's own brief short.
- Code reviews by the workers themselves, which stopped real defects before they reached main.
- Taking measurements on a copy of the real data rather than on fixtures, and trying an idea before building it.
- The newcomer walk, which measured job costs (page height, clicks to set up a channel, conflicting status) that
  no rule test looked at, and half of whose ranked changes the 40-finding audit had missed.
- The job walk, which gives each job a count no merge may raise, and a target once a mock is chosen; writing it
  found a product bug.
- Mocks before building: the owner chose and corrected looks by clicking, before any production code changed.
- Layout ideas as plain cards: the owner chose by naming cards to see better, over three rounds, and 29 cards took
  one session of 19 minutes and part of another, where three full looks took three sessions and two were thrown away.

After the lessons review, the event log credits 7 events, out of the 10 that occurred twice or more, with a check (a
test that fails, or a count each status file must carry) and names three that rest on a sentence of instructions
(undelivered reports, marking done before merging, the coordinator's guesses); by its own table a fourth, the
proposals that clash with decisions, is also a sentence only.

## The method in the project's own view

In its answers the project's coordinator lists what held: working from the jobs as the owner named them; the
newcomer walk; the job walk kept as a test whose baseline must never go up; a one-page written design ahead of any
picture; static mocks of several looks, each made blind to the others and shown side by side on one page; and
saying outright what goes, rather than folding it away. What failed, or what the owner changed: complete mocks of
one design in several looks (the owner picked from layout cards instead); waves of building, each tried by the
owner (declined); agents viewing the pages they made (the permission guard stopped the mock sessions, so a
scripted page model could find script errors and count clicks while seeing nothing of the look); and more agent
reviews of things the owner checks by eye (the owner wants fewer). Nobody has yet built from a mock, so that step of
the method is untested here.

Its proposed changes: count the jobs with the tool before the first package lands; tell the audit's blind seats
which decisions already apply; before turning a mock into code, draw up a single table, built by reading the code, of everything the
product does now and where each piece sits in the new design, because a mock adds things (blending two styles)
and drops others; and have every session write down which model it ran and how many tokens it spent, from day one. The
owner's decision the same day, not to misread what the studio already does, was recorded as needing that table
before code is written.

## Still open

As the repository stood on 2026-11-14 at 21:40, with some items from the evening handoff and the review record:

- No part of the redesign has been built. The three panes the owner picked are being completed as a
  mock of the whole studio, and its counts per job become the build's targets (jobs 1 and 6 have none yet).
- Round 2 will be built in one piece and only then tested by the owner; the waves planned earlier, each with its own
  stop rule, will not run. Each job's walk against the mock's target, and a newcomer walk of each job as it
  lands, are meant to catch a wrong turn before the end.
- What each job loses is still a list of candidates; of the 12 rules, 6 are marked to keep and 6 to change, and
  none is rewritten yet.
- By the review record, of the 16 review proposals 12 awaited their first use, 3 remained open (two of them
  failed their own checks in part) and 1 was skipped; since then the owner declined the waves, so that proposal
  and the stop rule per wave will not get the use they planned.
- Of the 3 UI defects the owner reported after round 1, 2 are fixed; the missing way to a video's cast waits for the
  redesign.
- By the evening handoff, the rebuilt research button had not had its first real run.
- The newcomer walk has not been repeated on the fixed demo or on any mock; the mock counts are the shortest
  route.

## Limits of this record

- The maintainer's own project, with one owner who is also the only user; no other person used or rated the UI.
- The lessons review was run by the coordinator on its own work, not by a fresh session, and the answers to this
  collection's questions were written by the coordinator who ran the work.
- Counts marked as counted from the conversation are approximate, and the event log was written by the
  coordinator about its own work.
- The newcomer was a model, not a person, and the demo engine was simulated.
- The mock counts come from scripts and step tables on static pages, not from the owner. No time per job was
  measured for anyone, and the owner's hours were not recorded.
- The job-walk baseline was taken after round 1, so round 1 has no measured before and after per job.
- No token or money cost was recorded for the work.
- The consistency counts come from one crude text search, not from the rendered pages.
