# Measuring jobs

How the cost of a user's jobs (screens, clicks, steps, fields typed) was counted before and after
a change made with AI, and what rule checks on single pages miss.

Evidence base: every lesson here comes from the **cases** in [this collection](../index.md): products, benchmarks and studies of interfaces designed, built, changed or checked with AI. The maintainer's own projects are marked and never count toward a lesson's strength. The lessons measure; they never say which look is better.

`[stated]`: a source says it or reports it as what worked or failed. `[ours]`: our inference from what a source reports. "Depends on model ability" (`yes`, `partly`, `no`): `yes` when the lesson states what models or agents can or cannot do, `partly` when it is a process whose need comes from such a behaviour, `no` when it holds whatever the model; the index marks a `yes` lesson whose newest case is over a year old as possibly outdated. "Checked against people" (`yes`, `partly`, `checker`, `model`, `none`): what told right from wrong in the lesson's evidence: people's results, users or experts measured (`yes`); people's results for part of the claim, the rest from checkers, models or the author's account (`partly`); only deterministic checks such as axe, contrast maths, tests or a scripted walk (`checker`); only model judges or simulated users (`model`); only the author's account (`none`); authors count as people when they code items to a stated protocol, never when they judge their own work, and the maintainer's own use of a project is the author's account; it says where the evidence came from, not where the lesson applies. "Era": the years the cited cases ran (their publication year when they give no period), then the newest model family: the family of the most recent cited case that names a model (its highest version when it names several), `unstated` when none names one; each case lists its models. "Strength", capped by the cases in "Cases" (the validator checks it): `strong` needs two or more cases, or one whose source shows its data, and at least one case whose author does not sell the tool; `medium` needs two or more cases, or one that shows its data; any other lesson is `weak`. The maintainer's own projects never count toward the cap, and a lesson that rests only on cases whose authors sell the tool is at most `medium`.

- **JOB-1** [stated] Tests that every page follows the interface rules can all pass while the user's jobs stay long; count what each job costs in screens and clicks as well.
  - Depends on model ability: no. Checked against people: none. Strength: weak. Era: 2026; newest: Claude Fable 5.x.
  - Cases: [studio-go: what went wrong][sg-wrong].
  - Against: None found; the maintainer's own project, with one owner who is its only user, so it is not independent evidence.
- **JOB-2** [stated] Turn a scripted walk of each job into a test with a committed baseline, so a change that adds screens or clicks fails before it merges.
  - Depends on model ability: no. Checked against people: checker. Strength: weak. Era: 2026; newest: Claude Fable 5.x.
  - Cases: [studio-go: what worked][sg-worked].
  - Against: None found; the walk follows the shortest route on a demo, its baseline was taken only after the first round of changes, and in the redesign's build, where packages brought every job down to the mock's numbers under its ceilings, the lower counts are a script's, and the owner's first use of the build found misses no walk asked about.
- **JOB-3** [ours] Count each job twice, by its shortest route and as a newcomer walks it; the two differ, and an agent standing in for the newcomer takes fewer steps than people do.
  - Depends on model ability: yes. Checked against people: partly. Strength: medium. Era: 2025–2026; newest: Claude Fable 5.x.
  - Cases: [studio-go: numbers][sg-numbers], [UW walkthrough: what went wrong][scw-wrong].
  - Against: None found; the newcomer counts at studio-go come from a model and cover only the pages before the redesign, never a mock or the build, and the people in the walkthrough study used two mobile apps, not the interface counted.
- **JOB-4** [stated] An audit read from code and screenshots can miss what walking the jobs finds: the screens and clicks each job needs, in what order, and whether pages agree; walk the jobs as well.
  - Depends on model ability: partly. Checked against people: model. Strength: weak. Era: 2026; newest: Claude Fable 5.x.
  - Cases: [studio-go: how it was checked][sg-checked], [studio-go: numbers][sg-numbers].
  - Against: None found; one project, where models did both the audit and the walk and the project's own coordinator compared the two lists.
- **JOB-5** [stated] Count the jobs before the first change lands; a baseline taken afterwards cannot show what the change did to them.
  - Depends on model ability: no. Checked against people: none. Strength: weak. Era: 2026; newest: Claude Fable 5.x.
  - Cases: [studio-go: what went wrong][sg-wrong].
  - Against: None found; the maintainer's own project, where the missing count is one round of changes, not a measured harm.
- **JOB-6** [stated] Agents told only to fold options keep them and add controls; say in the design what each job loses.
  - Depends on model ability: partly. Checked against people: checker. Strength: weak. Era: 2026; newest: Claude Fable 5.x.
  - Cases: [studio-go: what went wrong][sg-wrong].
  - Against: None found; the counts come from one crude text search over the templates, and the records word the brief's limit more and less broadly.
- **JOB-7** [stated] A job walk that runs no scripts cannot see a control a script draws; draw the controls each job needs on the server, or the walk cannot count them.
  - Depends on model ability: no. Checked against people: checker. Strength: weak. Era: 2026; newest: Claude Fable 5.x.
  - Cases: [studio-go: what worked][sg-worked].
  - Against: None found; one project whose pages are drawn by the server, where a model's challenge pass found the gap before the build began.
- **JOB-8** [ours] Write down per job and moment (before it starts, as it runs, once it ends, if it fails) what the user expects to see, and check the running build against it; green rule tests and job walks do not.
  - Depends on model ability: partly. Checked against people: model. Strength: weak. Era: 2026; newest: Claude Fable 5.x.
  - Cases: [studio-go: what went wrong][sg-wrong], [studio-go: numbers][sg-numbers].
  - Against: None found; the maintainer's own project, where the coordinator wrote the expectations from the owner's recorded words and model subagents gave the verdicts, which the owner has not judged.
- **JOB-9** [ours] A job walk on a demo with a simulated backend can pass while the job fails on the real one; record when each job last ran for real, and run it where the project allows.
  - Depends on model ability: no. Checked against people: none. Strength: weak. Era: 2026; newest: Claude Fable 5.x.
  - Cases: [studio-go: what went wrong][sg-wrong].
  - Against: None found; one project and one real change on a test video, by the coordinator's account, whose causes a package then fixed with tests on fakes, not yet run again for real.
- **JOB-10** [ours] Before a redesign deletes a page, list what it shows or lets the user do that the new design lacks, and put each such line to the owner; a note of a known limit is not the owner's yes.
  - Depends on model ability: partly. Checked against people: none. Strength: weak. Era: 2026; newest: Claude Fable 5.x.
  - Cases: [studio-go: what went wrong][sg-wrong].
  - Against: None found; one project, where a table of every old route and its new home existed before the build and did not prevent the loss, the deleting package's own report listed the lost functions, and only the owner's use caught the run's lost squares.
- **JOB-11** [ours] Click counts can stay level across a rewritten form or across layouts that differ; add a measure that tells them apart, such as the settings a form shows that need no choice.
  - Depends on model ability: no. Checked against people: checker. Strength: weak. Era: 2026; newest: Claude Fable 5.x.
  - Cases: [studio-go: numbers][sg-numbers], [studio-go: what went wrong][sg-wrong].
  - Against: None found; one project, where the gain claimed for the rewritten form is the package's own account, and the owner picked by eye one of the two cards with the most clicks on the added measure [ours: the counts measured moving around, not whether content fits].

[sg-checked]: ../cases/2026-11-14-studio-go-interface-redesign.md#how-it-was-checked
[sg-wrong]: ../cases/2026-11-14-studio-go-interface-redesign.md#what-went-wrong
[sg-worked]: ../cases/2026-11-14-studio-go-interface-redesign.md#what-worked
[sg-numbers]: ../cases/2026-11-14-studio-go-interface-redesign.md#numbers
[scw-wrong]: ../cases/2025-12-03-uw-synthetic-cognitive-walkthrough.md#what-went-wrong
