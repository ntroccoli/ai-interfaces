# Build loops

How agents that build, review or fix an interface were set up to check their own work (a separate
grading agent, a reviewer and a fixer, a checker's findings fed back, written criteria): what each
part caught or missed, what it cost, and when the work must stop and go to people.

Evidence base: every lesson here comes from the **cases** in [this collection](../index.md): products, benchmarks and studies of interfaces designed, built, changed or checked with AI. The maintainer's own projects are marked and never count toward a lesson's strength. The lessons measure; they never say which look is better.

`[stated]`: a source says it or reports it as what worked or failed. `[ours]`: our inference from what a source reports. "Depends on model ability" (`yes`, `partly`, `no`): `yes` when the lesson states what models or agents can or cannot do, `partly` when it is a process whose need comes from such a behaviour, `no` when it holds whatever the model; the index marks a `yes` lesson whose newest case is over a year old as possibly outdated. "Checked against people" (`yes`, `partly`, `checker`, `model`, `none`): what told right from wrong in the lesson's evidence: people's results, users or experts measured (`yes`); people's results for part of the claim, the rest from checkers, models or the author's account (`partly`); only deterministic checks such as axe, contrast maths, tests or a scripted walk (`checker`); only model judges or simulated users (`model`); only the author's account (`none`); authors count as people when they code items to a stated protocol, never when they judge their own work, and the maintainer's own use of a project is the author's account; it says where the evidence came from, not where the lesson applies. "Era": the years the cited cases ran (their publication year when they give no period), then the newest model family: the family of the most recent cited case that names a model (its highest version when it names several), `unstated` when none names one; each case lists its models. "Strength", capped by the cases in "Cases" (the validator checks it): `strong` needs two or more cases, or one whose source shows its data, and at least one case whose author does not sell the tool; `medium` needs two or more cases, or one that shows its data; any other lesson is `weak`. The maintainer's own projects never count toward the cap, and a lesson that rests only on cases whose authors sell the tool is at most `medium`.

- **BLD-1** [stated] A single agent's interface build can look finished while its core feature fails; a second agent that used the running app and tested agreed criteria caught specific bugs, and the core feature worked.
  - Depends on model ability: yes. Checked against people: none. Strength: weak. Era: 2026; newest: Claude Opus 4.x.
  - Cases: [Anthropic harness: what went wrong][hd-wrong], [Anthropic harness: what worked][hd-worked].
  - Against: None found; one prompt and one run per setup, judged by the author at the company that sells the model, and the grader still missed bugs in features it did not reach.
  - Related view (karpathy-ideas): [success criteria, not steps][k-success-criteria-not-steps], agrees.
- **BLD-2** [stated] For an agent that reviews and fixes code, a read-only reviewer and a separate fixer that pass fixed templates through a parent worked better than many parallel specialists.
  - Depends on model ability: partly. Checked against people: none. Strength: weak. Era: 2026; newest: unstated.
  - Cases: [GitHub a11y agent: what went wrong][gha-wrong], [GitHub a11y agent: what worked][gha-worked].
  - Against: None found; one seller's account that shows no token counts, timings or accuracy for any of the designs it tried.
- **BLD-3** [stated] Tell a repair loop which violations remain: one told only of parse or structure failures cost more and fixed no more; one fed a model-written violation report beat the plain prompt on average.
  - Depends on model ability: partly. Checked against people: checker. Strength: medium. Era: 2025–2026; newest: Kimi K2.x.
  - Cases: [Concordia repair: what went wrong][car-wrong], [Concordia repair: what worked][car-worked], [UCI code study: what worked][hol-worked], [UCI code study: practices][hol-practices].
  - Against: None found; each loop ran once, on one model or two, scored only by checkers; the loop that named violations had a model write the report from one checker's rules, trailed the plain prompt on one model with one checker, and missed ARIA landmarks.
  - Related view (karpathy-ideas): [success criteria, not steps][k-success-criteria-not-steps], agrees.
- **BLD-4** [stated] An agent told to stop and hand work to people may look for ways to write code anyway; back the stop rule with explicit instructions against working around it.
  - Depends on model ability: yes. Checked against people: none. Strength: weak. Era: 2026; newest: unstated.
  - Cases: [GitHub a11y agent: what went wrong][gha-wrong].
  - Against: None found; the post names no model and says the added instructions worked without a count of how often the agent tried or slipped.
- **BLD-5** [stated] Grading criteria written into a builder's prompt steer its designs before any feedback, and one phrase in them can pull designs toward the same look.
  - Depends on model ability: yes. Checked against people: none. Strength: weak. Era: 2026; newest: Claude Opus 4.x.
  - Cases: [Anthropic harness: what worked][hd-worked], [Anthropic harness: what went wrong][hd-wrong].
  - Against: None found; the only judge of the designs was the engineer who wrote the criteria, and no scores are shown.
- **BLD-6** [stated] A planner, builder and grader harness cost many times a solo run, though the grader's own share was small; the grader paid off only on work beyond what the model built reliably alone.
  - Depends on model ability: partly. Checked against people: none. Strength: weak. Era: 2026; newest: Claude Opus 4.x.
  - Cases: [Anthropic harness: numbers][hd-numbers], [Anthropic harness: what went wrong][hd-wrong].
  - Against: None found; one comparison on one prompt, with the costs reported by the model's seller and no solo run for the second app; the grader's share is our sum for the second app only.
- **BLD-7** [stated] When the model changes, remove harness parts one at a time and keep those that still change the result; cutting many at once hid which parts mattered.
  - Depends on model ability: partly. Checked against people: none. Strength: weak. Era: 2026; newest: Claude Opus 4.x.
  - Cases: [Anthropic harness: what went wrong][hd-wrong], [Anthropic harness: what worked][hd-worked].
  - Against: None found; one engineer's account of one harness, with the results of each removal not shown.
- **BLD-8** [ours] After a grading agent passes a build, walk each whole job as a newcomer; a build that passed its per-feature tests kept a workflow the screen never explained.
  - Depends on model ability: partly. Checked against people: none. Strength: weak. Era: 2026; newest: Claude Opus 4.x.
  - Cases: [Anthropic harness: what went wrong][hd-wrong].
  - Against: None found; the source does not say whether the grader was asked about the workflow, blames the base model's product sense, and the one person who found the gap was the author.

[car-worked]: ../cases/2026-05-26-concordia-llm-accessibility-repair.md#what-worked
[car-wrong]: ../cases/2026-05-26-concordia-llm-accessibility-repair.md#what-went-wrong
[gha-worked]: ../cases/2026-05-15-github-accessibility-agent.md#what-worked
[gha-wrong]: ../cases/2026-05-15-github-accessibility-agent.md#what-went-wrong
[hd-numbers]: ../cases/2026-03-24-anthropic-harness-design.md#numbers
[hd-worked]: ../cases/2026-03-24-anthropic-harness-design.md#what-worked
[hd-wrong]: ../cases/2026-03-24-anthropic-harness-design.md#what-went-wrong
[hol-practices]: ../cases/2025-03-20-uci-human-or-llm-accessible-code.md#practices-to-copy
[hol-worked]: ../cases/2025-03-20-uci-human-or-llm-accessible-code.md#what-worked
[k-success-criteria-not-steps]: https://github.com/ntroccoli/karpathy-ideas/blob/main/ideas/2026-01-26-success-criteria-not-steps.md
