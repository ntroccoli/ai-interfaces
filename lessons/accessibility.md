# Accessibility

When a language model or an agent writes, fixes or audits an interface for accessibility: what it
catches next to a rule checker such as axe and next to expert audits, what its fixes leave behind
or break, how its results were counted, and where people stay in the loop.

Evidence base: every lesson here comes from the **cases** in [this collection](../index.md): products, benchmarks and studies of interfaces designed, built, changed or checked with AI. The maintainer's own projects are marked and never count toward a lesson's strength. The lessons measure; they never say which look is better.

`[stated]`: a source says it or reports it as what worked or failed. `[ours]`: our inference from what a source reports. "Depends on model ability" (`yes`, `partly`, `no`): `yes` when the lesson states what models or agents can or cannot do, `partly` when it is a process whose need comes from such a behaviour, `no` when it holds whatever the model; the index marks a `yes` lesson whose newest case is over a year old as possibly outdated. "Checked against people" (`yes`, `partly`, `checker`, `model`, `none`): what told right from wrong in the lesson's evidence: people's results, users or experts measured (`yes`); people's results for part of the claim, the rest from checkers, models or the author's account (`partly`); only deterministic checks such as axe, contrast maths, tests or a scripted walk (`checker`); only model judges or simulated users (`model`); only the author's account (`none`); authors count as people when they code items to a stated protocol, never when they judge their own work, and the maintainer's own use of a project is the author's account; it says where the evidence came from, not where the lesson applies. "Era": the years the cited cases ran (their publication year when they give no period), then the newest model family: the family of the most recent cited case that names a model (its highest version when it names several), `unstated` when none names one; each case lists its models. "Strength", capped by the cases in "Cases" (the validator checks it): `strong` needs two or more cases, or one whose source shows its data, and at least one case whose author does not sell the tool; `medium` needs two or more cases, or one that shows its data; any other lesson is `weak`. The maintainer's own projects never count toward the cap, and a lesson that rests only on cases whose authors sell the tool is at most `medium`.

- **ACC-1** [stated] Code models writing pages without being asked for accessibility handle basic rules such as contrast and alt text better than the human code they replaced, and do worse on ARIA.
  - Depends on model ability: yes. Checked against people: checker. Strength: medium. Era: 2025; newest: GPT-4o.
  - Cases: [UCI code study: what worked][hol-worked], [UCI code study: what went wrong][hol-wrong].
  - Against: None found; one study of rewritten pages from two models, scored only by two checkers, where contrast makes up most of the violations and the win holds on the mean, not in every project.
- **ACC-2** [stated] Asking a model for accessible code, with rules, examples or a self-review, almost never beat the plain prompt; the broad instructions added attributes that broke other rules.
  - Depends on model ability: yes. Checked against people: checker. Strength: medium. Era: 2025; newest: GPT-4o.
  - Cases: [UCI code study: what went wrong][hol-wrong].
  - Against: None found; one study with two models and one run per setup, no prompt tried beyond the three techniques, and inside the fix loop accessibility instructions did help.
- **ACC-3** [stated] Model-written accessibility fixes lowered the checker's count on most pages but left only about a quarter of pages clean; count what remains after each fix, not only what went away.
  - Depends on model ability: yes. Checked against people: checker. Strength: medium. Era: 2026; newest: Kimi K2.x.
  - Cases: [Concordia repair: numbers][car-numbers], [Concordia repair: what went wrong][car-wrong].
  - Against: None found; one model on static HTML, run once and judged only by axe, which covers part of WCAG; no person tried the fixed pages.
- **ACC-4** [stated] A model's fix that is right for one element can break the rest of the page (duplicate IDs, ARIA that hides focusable content, misused roles); re-check the whole page after each fix.
  - Depends on model ability: yes. Checked against people: checker. Strength: medium. Era: 2025–2026; newest: Kimi K2.x.
  - Cases: [Concordia repair: what went wrong][car-wrong], [UCI code study: what went wrong][hol-wrong].
  - Against: None found; the repair examples come from three pages and neither study counts how many pages gained violations; the second study's fix loop raised a few rules' failures, while its prompted rewrites broke rules by adding accessibility attributes.
- **ACC-5** [stated] A falling checker rate, or code that passes the checks, is no proof a page works for disabled users: such rates count all violations alike, and checkers miss ARIA meaning and keyboard use.
  - Depends on model ability: no. Checked against people: partly. Strength: medium. Era: 2025–2026; newest: GPT-5.x.
  - Cases: [UCI code study: what went wrong][hol-wrong], [GitHub a11y agent: what went wrong][gha-wrong], [Agentic audit: numbers][maa-numbers].
  - Against: None found; two sources state it as a limit (one a seller's account without figures), the third measures a checker against expert audits, and no case here tests checker-clean pages with disabled users themselves.
- **ACC-6** [stated] As a detector, a model matched a rule checker on whole pages and agreed with it most on roles and labels, but flagged far more markup problems and diverged on layout.
  - Depends on model ability: yes. Checked against people: checker. Strength: medium. Era: 2026; newest: Kimi K2.x.
  - Cases: [Concordia repair: numbers][car-numbers], [Concordia repair: what went wrong][car-wrong].
  - Against: None found; the model was scored against axe, not experts, and most pages labelled clean were not clean by axe; against expert audits in another benchmark, a single-pass model found more of the reported failures than axe-core, at lower precision ([Agentic audit: numbers][maa-numbers]).
- **ACC-7** [stated] An agent per WCAG criterion that operates the page found more of the failures expert audits reported than axe-core or a single-pass model, and raised more findings the audits never listed.
  - Depends on model ability: yes. Checked against people: yes. Strength: medium. Era: 2026; newest: GPT-5.x.
  - Cases: [Agentic audit: numbers][maa-numbers], [Agentic audit: what worked][maa-worked].
  - Against: None found; one benchmark on saved scholarly pages, recall known for a minority of the criteria, no pages held out from development, and the extra findings never settled by a person; scored against axe and a dataset's labels instead, a single model call only matched axe on whole pages ([Concordia repair: numbers][car-numbers]); a batch model with hints matched the agents' F1 for far less money ([Agentic audit: what worked][maa-worked]).
- **ACC-8** [stated] Per-criterion browser agents matched both reported keyboard traps and nearly all keyboard failures; every batch model reading a screenshot and the accessibility tree missed both traps.
  - Depends on model ability: yes. Checked against people: yes. Strength: weak. Era: 2026; newest: GPT-5.x.
  - Cases: [Agentic audit: what worked][maa-worked], [Agentic audit: numbers][maa-numbers].
  - Against: None found; few keyboard failures in the set, matched per criterion and not issue by issue, and interaction, instructions and tools changed together, so the gain is not tied to key presses alone; a radio button's focus was also misread as a trap, and the paper does not say whether the two counted trap finds rest on valid traces ([Agentic audit: what went wrong][maa-wrong]).
- **ACC-9** [stated] Listing the criteria in a coding agent's audit request raised both the reported failures it found and its findings the audits never listed; measure both when changing the request.
  - Depends on model ability: yes. Checked against people: yes. Strength: weak. Era: 2026; newest: GPT-5.x.
  - Cases: [Agentic audit: what worked][maa-worked], [Agentic audit: what went wrong][maa-wrong].
  - Against: None found; two products with one short and one listing request each, different models and built-in system prompts, run in an isolated setting narrower than a developer's own.
- **ACC-10** [stated] Score a checker that may decline against every known failure and keep what it declines as open work; recall on the items it answered hides the failures it skipped.
  - Depends on model ability: partly. Checked against people: yes. Strength: medium. Era: 2026; newest: GPT-5.x.
  - Cases: [Agentic audit: what went wrong][maa-wrong], [Agentic audit: practices][maa-practices].
  - Against: None found; the single-pass model declined there, and the paper does not test whether its declines marked items that needed key presses or simply hard ones.
- **ACC-11** [stated] An audit report's silence is a weak pass: score a checker's findings on unlisted items against it, but keep them as candidates for a person to settle and never fold them into the labels.
  - Depends on model ability: no. Checked against people: partly. Strength: medium. Era: 2026; newest: GPT-5.x.
  - Cases: [Agentic audit: what went wrong][maa-wrong], [Agentic audit: practices][maa-practices].
  - Against: None found; the candidates were reviewed by the authors from logs and screenshots only, so how many are real is unknown.
- **ACC-12** [ours] Before scoring a detector, confirm with the same checker that the pages labelled clean are clean; otherwise its precision partly measures the labels, not the detector.
  - Depends on model ability: no. Checked against people: checker. Strength: medium. Era: 2026; newest: Kimi K2.x.
  - Cases: [Concordia repair: what went wrong][car-wrong].
  - Against: None found; one study, where the clean set came from an automated fix script, per its repository.
- **ACC-13** [ours] Before quoting or comparing an accessibility agent's fix rate, find out what counts as fixed, out of what total, and who decided; a seller's headline rate may define none of them.
  - Depends on model ability: no. Checked against people: none. Strength: weak. Era: 2026; newest: unstated.
  - Cases: [GitHub a11y agent: how it was checked][gha-checked], [GitHub a11y agent: numbers][gha-numbers].
  - Against: None found; one case, and the undefined rate may be well defined inside the company.
- **ACC-14** [stated] Give an accessibility agent your own archive of logged issues and the changes that fixed them; the author holds generic best-practice prompts fall short, as models lean toward inaccessible code.
  - Depends on model ability: partly. Checked against people: none. Strength: weak. Era: 2025–2026; newest: GPT-4o.
  - Cases: [GitHub a11y agent: what worked][gha-worked], [GitHub a11y agent: what went wrong][gha-wrong], [UCI code study: what went wrong][hol-wrong].
  - Against: None found; the archive half rests on one seller's account with no figures, the second half also on a study where rules and examples in the prompt rarely helped, and the archive was years of hand-logged issues few teams have.
- **ACC-15** [stated] Keep an accessibility agent off complex code and off widgets experts mark high-risk, such as drag and drop or data grids, and send them to people.
  - Depends on model ability: partly. Checked against people: none. Strength: weak. Era: 2026; newest: unstated.
  - Cases: [GitHub a11y agent: what went wrong][gha-wrong].
  - Against: None found; the high-risk list and the complexity threshold are the team's judgement, and the post does not say how often either fired.

[car-numbers]: ../cases/2026-05-26-concordia-llm-accessibility-repair.md#numbers
[car-wrong]: ../cases/2026-05-26-concordia-llm-accessibility-repair.md#what-went-wrong
[gha-checked]: ../cases/2026-05-15-github-accessibility-agent.md#how-it-was-checked
[gha-numbers]: ../cases/2026-05-15-github-accessibility-agent.md#numbers
[gha-worked]: ../cases/2026-05-15-github-accessibility-agent.md#what-worked
[gha-wrong]: ../cases/2026-05-15-github-accessibility-agent.md#what-went-wrong
[hol-worked]: ../cases/2025-03-20-uci-human-or-llm-accessible-code.md#what-worked
[hol-wrong]: ../cases/2025-03-20-uci-human-or-llm-accessible-code.md#what-went-wrong
[maa-numbers]: ../cases/2026-09-08-mishra-agentic-a11y-audit.md#numbers
[maa-practices]: ../cases/2026-09-08-mishra-agentic-a11y-audit.md#practices-to-copy
[maa-worked]: ../cases/2026-09-08-mishra-agentic-a11y-audit.md#what-worked
[maa-wrong]: ../cases/2026-09-08-mishra-agentic-a11y-audit.md#what-went-wrong
