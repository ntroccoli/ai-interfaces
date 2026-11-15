# Simulated users

What happens when a language model walks an interface in a person's place (a walkthrough, a
think-aloud, a usability test), and how its path, its doubts and its ratings compare with those
of real people on the same tasks.

Evidence base: every lesson here comes from the **cases** in [this collection](../index.md): products, benchmarks and studies of interfaces designed, built, changed or checked with AI. The maintainer's own projects are marked and never count toward a lesson's strength. The lessons measure; they never say which look is better.

`[stated]`: a source says it or reports it as what worked or failed. `[ours]`: our inference from what a source reports. "Depends on model ability" (`yes`, `partly`, `no`): `yes` when the lesson states what models or agents can or cannot do, `partly` when it is a process whose need comes from such a behaviour, `no` when it holds whatever the model; the index marks a `yes` lesson whose newest case is over a year old as possibly outdated. "Checked against people" (`yes`, `partly`, `checker`, `model`, `none`): what told right from wrong in the lesson's evidence: people's results, users or experts measured (`yes`); people's results for part of the claim, the rest from checkers, models or the author's account (`partly`); only deterministic checks such as axe, contrast maths, tests or a scripted walk (`checker`); only model judges or simulated users (`model`); only the author's account (`none`); authors count as people when they code items to a stated protocol, never when they judge their own work, and the maintainer's own use of a project is the author's account; it says where the evidence came from, not where the lesson applies. "Era": the years the cited cases ran (their publication year when they give no period), then the newest model family: the family of the most recent cited case that names a model (its highest version when it names several), `unstated` when none names one; each case lists its models. "Strength", capped by the cases in "Cases" (the validator checks it): `strong` needs two or more cases, or one whose source shows its data, and at least one case whose author does not sell the tool; `medium` needs two or more cases, or one that shows its data; any other lesson is `weak`. The maintainer's own projects never count toward the cap, and a lesson that rests only on cases whose authors sell the tool is at most `medium`.

- **SIM-1** [stated] A model that walks tasks in a person's place finishes more of them, in fewer steps and on straighter paths, so its run is no estimate of what the tasks cost people.
  - Depends on model ability: yes. Checked against people: yes. Strength: medium. Era: 2025; newest: GPT-4.x.
  - Cases: [UW walkthrough: what went wrong][scw-wrong].
  - Against: None found; one study of two mobile apps with ten people, on screens assembled by hand rather than a live app, and the models kept a full history people did not; on a live demo at studio-go (maintainer's own) a newcomer agent took up to 2.6x the shortest route's clicks ([studio-go: numbers][sg-numbers]).
- **SIM-2** [stated] Asked like people to say what confuses it, a simulated user voices far fewer doubts; an explicit confusion rating per screen during the walk recovers where people hesitate.
  - Depends on model ability: yes. Checked against people: yes. Strength: medium. Era: 2025; newest: GPT-4.x.
  - Cases: [UW walkthrough: what went wrong][scw-wrong], [UW walkthrough: what worked][scw-worked].
  - Against: None found; the ratings were tested against the doubts of the same ten people on tasks written around problems the authors had already found, and false alarms are not reported.
- **SIM-3** [stated] Give a simulated user the history of its walk when it rates screens; the same screens rated one at a time gave weak ratings that changed from run to run.
  - Depends on model ability: partly. Checked against people: yes. Strength: medium. Era: 2025; newest: GPT-4.x.
  - Cases: [UW walkthrough: what worked][scw-worked], [UW walkthrough: what went wrong][scw-wrong].
  - Against: None found; with and without history the models rated different sets of screens, so history is not the only difference.
- **SIM-4** [ours] Run a simulated user several times and measure how far the runs agree before acting on one run's ratings.
  - Depends on model ability: partly. Checked against people: partly. Strength: medium. Era: 2025; newest: GPT-4.x.
  - Cases: [UW walkthrough: how it was checked][scw-checked], [UW walkthrough: what went wrong][scw-wrong].
  - Against: None found; agreement between runs says the ratings are steady, not that they are right.

[scw-wrong]: ../cases/2025-12-03-uw-synthetic-cognitive-walkthrough.md#what-went-wrong
[scw-worked]: ../cases/2025-12-03-uw-synthetic-cognitive-walkthrough.md#what-worked
[scw-checked]: ../cases/2025-12-03-uw-synthetic-cognitive-walkthrough.md#how-it-was-checked
[sg-numbers]: ../cases/2026-11-14-studio-go-interface-redesign.md#numbers
