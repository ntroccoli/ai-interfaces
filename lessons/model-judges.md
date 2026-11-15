# Model judges

When a language model scores, rates or reviews interfaces in place of people (a judge for a
benchmark, a rater of screens, a heuristic reviewer, a grader inside a build loop), what it needs
to see, how its agreement with people was measured, and where that measurement stops.

Evidence base: every lesson here comes from the **cases** in [this collection](../index.md): products, benchmarks and studies of interfaces designed, built, changed or checked with AI. The maintainer's own projects are marked and never count toward a lesson's strength. The lessons measure; they never say which look is better.

`[stated]`: a source says it or reports it as what worked or failed. `[ours]`: our inference from what a source reports. "Depends on model ability" (`yes`, `partly`, `no`): `yes` when the lesson states what models or agents can or cannot do, `partly` when it is a process whose need comes from such a behaviour, `no` when it holds whatever the model; the index marks a `yes` lesson whose newest case is over a year old as possibly outdated. "Checked against people" (`yes`, `partly`, `checker`, `model`, `none`): what told right from wrong in the lesson's evidence: people's results, users or experts measured (`yes`); people's results for part of the claim, the rest from checkers, models or the author's account (`partly`); only deterministic checks such as axe, contrast maths, tests or a scripted walk (`checker`); only model judges or simulated users (`model`); only the author's account (`none`); authors count as people when they code items to a stated protocol, never when they judge their own work, and the maintainer's own use of a project is the author's account; it says where the evidence came from, not where the lesson applies. "Era": the years the cited cases ran (their publication year when they give no period), then the newest model family: the family of the most recent cited case that names a model (its highest version when it names several), `unstated` when none names one; each case lists its models. "Strength", capped by the cases in "Cases" (the validator checks it): `strong` needs two or more cases, or one whose source shows its data, and at least one case whose author does not sell the tool; `medium` needs two or more cases, or one that shows its data; any other lesson is `weak`. The maintainer's own projects never count toward the cap, and a lesson that rests only on cases whose authors sell the tool is at most `medium`.

- **JDG-1** [stated] Before using a model as a rater of interfaces, compare its ratings with people's on the same items, and choose the judge and its inputs by that agreement.
  - Depends on model ability: partly. Checked against people: yes. Strength: medium. Era: 2024–2025; newest: GPT-4.x.
  - Cases: [ArtifactsBench: how it was checked][ab-checked], [UW walkthrough: how it was checked][scw-checked], [UW heuristic review: how it was checked][she-checked], [Brazil heuristic review: how it was checked][g4o-checked].
  - Against: None found; every check is small (a few hundred queries, ten people, or two or three experts per app), none reports how far the people agreed with one another, and in one heuristic review the model's own findings are part of the reference list.
- **JDG-2** [stated] A judge of generated pages agreed with experts more often when it saw screenshots of the rendered page and the code together than with either alone.
  - Depends on model ability: yes. Checked against people: yes. Strength: medium. Era: 2025; newest: GPT-5.x.
  - Cases: [ArtifactsBench: what worked][ab-worked].
  - Against: None found; one benchmark by a lab that ranks its own models, measured on a subset of its queries and the answers of a few models, with no held-out check.
- **JDG-3** [ours] Quote a judge's agreement with people only from items it was not tuned on, with the size of that set, and measure it again whenever the judge model changes.
  - Depends on model ability: partly. Checked against people: yes. Strength: medium. Era: 2024–2025; newest: GPT-5.x.
  - Cases: [ArtifactsBench: what went wrong][ab-wrong], [UW heuristic review: what went wrong][she-wrong].
  - Against: None found; ArtifactsBench shows the gap (one subset, the best of many setups, a replaced judge never re-measured), not a judge that failed on new items; in the heuristic review the same prompt lost coverage on two other models, measured on the same apps, one of them the app it was tuned on.
  - Related view (karpathy-ideas): [public benchmarks are gameable, so keep your own evals][k-private-evals], agrees.
- **JDG-4** [ours] When a judge ranks models that include its own maker's, check the top ranks with a judge from another maker before trusting the order.
  - Depends on model ability: partly. Checked against people: model. Strength: weak. Era: 2025; newest: GPT-5.x.
  - Cases: [ArtifactsBench: what went wrong][ab-wrong].
  - Against: None found; the second judge agreed with experts less often, so a changed order there is a reason to look, not proof of bias.
  - Related view (karpathy-ideas): [several models rank each other anonymously][k-llm-council], agrees.
- **JDG-5** [stated] A model grading its own interface work rates it too kindly; a separate grading agent is easier to make sceptical, though it starts out inclined to be lenient toward model output.
  - Depends on model ability: yes. Checked against people: none. Strength: weak. Era: 2026; newest: Claude Opus 4.x.
  - Cases: [Anthropic harness: what went wrong][hd-wrong].
  - Against: None found; one engineer at the model's seller compared the grader with his own judgement, and no rates of leniency are given; a model reviewing others' screens praised them under a short prompt and raised many non-issues once told to list breaches ([UW heuristic review: what went wrong][she-wrong]).
  - Related view (karpathy-ideas): [several models rank each other anonymously][k-llm-council], contradicts: in Karpathy's small tests, models ranking pooled answers with names hidden showed little bias toward their own text, while the harness grader knew it was judging its own build.
- **JDG-6** [stated] An untuned model acting as QA found real bugs, then argued them away and approved the build; tune it on logs where its verdict differs from a person's.
  - Depends on model ability: yes. Checked against people: none. Strength: weak. Era: 2026; newest: Claude Opus 4.x.
  - Cases: [Anthropic harness: what went wrong][hd-wrong], [Anthropic harness: who did what][hd-who].
  - Against: None found; after several rounds of tuning the grader still missed layout issues and bugs in features it did not exercise, and no counts are given.
- **JDG-7** [stated] Reviewing app screenshots against usability heuristics, one model covered more of the known issues than a single expert or a pool of five experts.
  - Depends on model ability: yes. Checked against people: yes. Strength: medium. Era: 2024–2025; newest: GPT-4.x.
  - Cases: [UW heuristic review: numbers][she-numbers], [UW heuristic review: what worked][she-worked].
  - Against: Disagree: GPT-4o found a fifth of three experts' issues on a web system and few of them on control, efficiency and memory load ([Brazil heuristic review: what went wrong][g4o-wrong]); the reference lists were built differently, only GPT-4 beat the pool while two other models with the same prompt fell below it on one app, and the reference list holds the model's own findings.
- **JDG-8** [stated] Reviewing still screens, a model found fewer of the experts' problems on user control in both studies, and in one study few on efficiency and memory load; keep people on those.
  - Depends on model ability: yes. Checked against people: yes. Strength: medium. Era: 2024–2025; newest: GPT-4.x.
  - Cases: [Brazil heuristic review: what went wrong][g4o-wrong], [UW heuristic review: numbers][she-numbers].
  - Against: Disagree: on flexibility and efficiency GPT-4 covered more of the reference issues than five experts pooled, on both apps ([UW heuristic review: numbers][she-numbers]); the reference lists were built differently, and both models missed problems that need use or several screens.
- **JDG-9** [stated] A model reviewing screenshots raises non-issues (problems not on the screen, misread status icons or banners, common conventions taken as faults); have a person confirm each finding.
  - Depends on model ability: yes. Checked against people: yes. Strength: strong. Era: 2024–2025; newest: GPT-4.x.
  - Cases: [UW heuristic review: what went wrong][she-wrong], [Brazil heuristic review: what went wrong][g4o-wrong].
  - Against: None found; in both studies the authors, not outside experts, decided which findings were false, each tested one main model on screenshots only, newer models may read screens better, and one prompt demanded at least two problems for every heuristic, which invites non-issues.
- **JDG-10** [stated] A model reviewing a sequence of screenshots repeats an issue on every screen where it recurs and misses about half the problems that span screens, even when told to weigh the flow.
  - Depends on model ability: yes. Checked against people: yes. Strength: medium. Era: 2024–2025; newest: GPT-4.x.
  - Cases: [UW heuristic review: what went wrong][she-wrong], [Brazil heuristic review: numbers][g4o-numbers].
  - Against: None found; the cross-screen misses come from one study (two apps, GPT-4 only) whose authors partly blame their own prompt; the second study shows repeats only, from one prompt per screenshot rather than a sequence.
- **JDG-11** [stated] A model's heuristic review adds issues experts did not list, with more on wording and visual design than the experts found; use it beside experts, not in place of them.
  - Depends on model ability: yes. Checked against people: yes. Strength: medium. Era: 2024–2025; newest: GPT-4.x.
  - Cases: [Brazil heuristic review: what worked][g4o-worked], [UW heuristic review: what worked][she-worked].
  - Against: None found; the extra issues were accepted by the study authors, not by the experts whose list they extend.
- **JDG-12** [stated] Across a review of several tasks a model reviewer kept its coverage from task to task while experts found less as they went, and repeat runs returned most of its first list.
  - Depends on model ability: yes. Checked against people: partly. Strength: medium. Era: 2024–2025; newest: GPT-4.x.
  - Cases: [UW heuristic review: what worked][she-worked].
  - Against: None found; four tasks per app, each expert on one app, and the repeat runs were matched to the first list by the authors; the experts' drop rests on a statistic printed in an impossible form, and the repeat shares use totals the paper does not explain.
- **JDG-13** [ours] Before quoting a model reviewer's overlap with an expert list, merge its repeats across screens and mark which expert issues could be seen in what the model was shown.
  - Depends on model ability: partly. Checked against people: yes. Strength: medium. Era: 2024; newest: GPT-4o.
  - Cases: [Brazil heuristic review: what went wrong][g4o-wrong].
  - Against: None found; one study, where the gap is our reading of what it leaves out, not a measured error.

[ab-checked]: ../cases/2025-07-07-tencent-artifactsbench.md#how-it-was-checked
[ab-worked]: ../cases/2025-07-07-tencent-artifactsbench.md#what-worked
[ab-wrong]: ../cases/2025-07-07-tencent-artifactsbench.md#what-went-wrong
[g4o-checked]: ../cases/2025-06-19-unespar-gpt4o-heuristic-evaluation.md#how-it-was-checked
[g4o-numbers]: ../cases/2025-06-19-unespar-gpt4o-heuristic-evaluation.md#numbers
[g4o-worked]: ../cases/2025-06-19-unespar-gpt4o-heuristic-evaluation.md#what-worked
[g4o-wrong]: ../cases/2025-06-19-unespar-gpt4o-heuristic-evaluation.md#what-went-wrong
[hd-who]: ../cases/2026-03-24-anthropic-harness-design.md#who-did-what
[hd-wrong]: ../cases/2026-03-24-anthropic-harness-design.md#what-went-wrong
[scw-checked]: ../cases/2025-12-03-uw-synthetic-cognitive-walkthrough.md#how-it-was-checked
[she-checked]: ../cases/2025-07-03-uw-synthetic-heuristic-evaluation.md#how-it-was-checked
[she-numbers]: ../cases/2025-07-03-uw-synthetic-heuristic-evaluation.md#numbers
[she-worked]: ../cases/2025-07-03-uw-synthetic-heuristic-evaluation.md#what-worked
[she-wrong]: ../cases/2025-07-03-uw-synthetic-heuristic-evaluation.md#what-went-wrong
[k-private-evals]: https://github.com/ntroccoli/karpathy-ideas/blob/main/ideas/2025-11-18-go-talk-to-the-model-private-evals.md
[k-llm-council]: https://github.com/ntroccoli/karpathy-ideas/blob/main/ideas/2025-11-22-llm-council-anonymous-peer-review.md
