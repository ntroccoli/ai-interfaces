---
title: GitHub's accessibility agent reviews front-end pull requests with one reviewer and one fixer, and is told to refuse risky patterns
label: GitHub a11y agent
date: 2026-05-15
org: GitHub
summary: GitHub's pilot agent reviewed 3,535 pull requests at a 68% "resolution rate" it never defines; it hands complex code and risky widgets to people.
source_url: https://github.blog/ai-and-ml/github-copilot/building-a-general-purpose-accessibility-agent-and-what-we-learned-in-the-process/
also: []
source_type: engineering-post
author_relation: seller-of-tool
evidence: assertion-only
case_type: product
ai_role: [check, change]
subject: pull requests that change GitHub's front-end code, reviewed for WCAG issues by an agent that also answers accessibility questions in Copilot CLI and VS Code
sample: 3,535 pull requests reviewed
measures: [accessibility]
checked_against: [none]
cost: unstated
tools: [GitHub Copilot CLI, Copilot in VS Code, GitHub Actions, skill files, schema template files, complexity-scoring shell script]
models: [unstated]
period: unstated
outcome: ongoing
status: current
superseded_by:
---

# GitHub's accessibility agent reviews front-end pull requests with one reviewer and one fixer, and is told to refuse risky patterns

GitHub is piloting an agent that checks every pull request touching its front-end code for
accessibility problems, proposes fixes for the simple ones, and answers engineers' accessibility
questions in Copilot. By the post's count it went over 3,535 pull requests and puts its "resolution
rate" at 68%, a term it never defines ([post](https://github.blog/ai-and-ml/github-copilot/building-a-general-purpose-accessibility-agent-and-what-we-learned-in-the-process/)).
One agent did not hold up, and many parallel sub-agents worked against the team; what stayed is an
orchestrator with a read-only reviewer and a separate implementer that talk only through fixed
templates. The agent draws on GitHub's own archive of logged and fixed accessibility issues, is told
not to write code when a complexity score is high and shut off from widgets on a high-risk list, and
needed extra instructions to keep it from getting around those rules. No accuracy figures from
people's reviews are given.

## Source

An engineering post on the GitHub blog by Eric Bailey, published on 2026-05-15 and read on
2026-11-14 through the blog's WordPress API; the page states no role for him, and the post speaks in
the first person of the accessibility work ([post](https://github.blog/ai-and-ml/github-copilot/building-a-general-purpose-accessibility-agent-and-what-we-learned-in-the-process/)).
GitHub sells Copilot, and the agent runs inside Copilot CLI and Copilot in VS Code, so this is a
seller's account of its own tool in use. The post states its numbers without the data behind them
and names no model.

## What was made or studied

An experimental accessibility agent for GitHub's own product, with two stated goals: answer
engineers' accessibility questions on demand in Copilot CLI and VS Code, and catch and fix plain,
clear-cut accessibility faults before release. For the second goal it runs on every change that
modifies front-end code and leaves review comments with suggested fixes; the post's screenshot shows
a GitHub Actions bot citing WCAG 1.3.2 and proposing to swap DOM order instead of reversing a flex
row ([post](https://github.blog/ai-and-ml/github-copilot/building-a-general-purpose-accessibility-agent-and-what-we-learned-in-the-process/)).
The five most frequent issue types it raises, in order, map to WCAG's info and relationships, name
role value, status messages, non-text content and focus order criteria. In our reading, the post is
about how the agent was structured and limited, not about measuring it ([post](https://github.blog/ai-and-ml/github-copilot/building-a-general-purpose-accessibility-agent-and-what-we-learned-in-the-process/)).

## Who did what

- **AI:** an orchestrating parent agent routes requests, finds code and skills, scores complexity,
  validates output and runs escalation and re-audit loops. A reviewer sub-agent that can only read
  audits code, researches WCAG and flags escalation triggers in three ordered phases (research, code
  audit, structured output), grading each finding critical, warning or info. Its resources are skill
  files the model follows: the WCAG 2.2 criteria at levels A and AA, GitHub's reading of them, assistive
  technology support, search of prior audits. A write-capable implementer sub-agent either changes
  code, critical issues first, or writes guidance only. Models unstated
  ([sub-agents](https://github.blog/ai-and-ml/github-copilot/building-a-general-purpose-accessibility-agent-and-what-we-learned-in-the-process/#h-use-sub-agents),
  [linear order](https://github.blog/ai-and-ml/github-copilot/building-a-general-purpose-accessibility-agent-and-what-we-learned-in-the-process/#execute-instructions-in-a-linear-order)).
- **Rule-based tools:** a small shell script that scores code complexity with simple heuristics,
  and a threshold above which the agent is instructed not to change code; schema template files for
  the reviewer and the implementer; GitHub Actions posting the review comments, per the screenshot;
  tooling that captures pull request reviewers' sentiment
  ([complexity](https://github.blog/ai-and-ml/github-copilot/building-a-general-purpose-accessibility-agent-and-what-we-learned-in-the-process/#evaluate-code-complexity),
  [templates](https://github.blog/ai-and-ml/github-copilot/building-a-general-purpose-accessibility-agent-and-what-we-learned-in-the-process/#use-a-template-schema-pass-around-sub-agent-content),
  [post](https://github.blog/ai-and-ml/github-copilot/building-a-general-purpose-accessibility-agent-and-what-we-learned-in-the-process/),
  [manual review](https://github.blog/ai-and-ml/github-copilot/building-a-general-purpose-accessibility-agent-and-what-we-learned-in-the-process/#manually-evaluate-agent-output-and-adjust-things-that-arent-working-as-expected)).
- **People:** GitHub keeps a central repository of hand-logged issues (template, repro steps,
  severity, service area, WCAG criterion, linked fix pull request, acceptance criteria) that the
  agent searches ([past efforts](https://github.blog/ai-and-ml/github-copilot/building-a-general-purpose-accessibility-agent-and-what-we-learned-in-the-process/#past-efforts)). The accessibility team named the high-risk
  patterns ([high-risk patterns](https://github.blog/ai-and-ml/github-copilot/building-a-general-purpose-accessibility-agent-and-what-we-learned-in-the-process/#identify-high-risk-patterns)), takes escalations and pairs with
  designers ([complexity](https://github.blog/ai-and-ml/github-copilot/building-a-general-purpose-accessibility-agent-and-what-we-learned-in-the-process/#evaluate-code-complexity),
  [checkers](https://github.blog/ai-and-ml/github-copilot/building-a-general-purpose-accessibility-agent-and-what-we-learned-in-the-process/#know-that-programmatically-determinable-issues-dont-cover-everything)), and the
  team reviews the agent's output by hand from time to time
  ([manual review](https://github.blog/ai-and-ml/github-copilot/building-a-general-purpose-accessibility-agent-and-what-we-learned-in-the-process/#manually-evaluate-agent-output-and-adjust-things-that-arent-working-as-expected)).
  Engineers and pull request reviewers receive its comments.

## How it was checked

People check the agent's output: the team reviews samples of it by hand now and then, and tooling
records how pull request reviewers feel about its comments; both feed changes to its instructions,
resources and skills. The post gives no result of either: no accuracy, no false-alarm rate, no
sample size, no reviewer scores
([manual review](https://github.blog/ai-and-ml/github-copilot/building-a-general-purpose-accessibility-agent-and-what-we-learned-in-the-process/#manually-evaluate-agent-output-and-adjust-things-that-arent-working-as-expected)).
The one outcome figure, a 68% resolution rate over 3,535 pull requests, comes with no definition,
no denominator and no statement of who decided that an issue was resolved ([post](https://github.blog/ai-and-ml/github-copilot/building-a-general-purpose-accessibility-agent-and-what-we-learned-in-the-process/)).

## Numbers

| Number | What it counts | Basis | Source |
| --- | --- | --- | --- |
| 3,535 pull requests | pull requests the agent had reviewed by publication | vendor-claim | [post](https://github.blog/ai-and-ml/github-copilot/building-a-general-purpose-accessibility-agent-and-what-we-learned-in-the-process/) |
| 68% | "resolution rate" of those reviews; the post does not say what resolved means, of what total, or who judged | vendor-claim | [post](https://github.blog/ai-and-ml/github-copilot/building-a-general-purpose-accessibility-agent-and-what-we-learned-in-the-process/) |
| 5 issue types | most frequent kinds of issue the agent raises, listed in order without counts | reported | [post](https://github.blog/ai-and-ml/github-copilot/building-a-general-purpose-accessibility-agent-and-what-we-learned-in-the-process/) |
| 2 sub-agents | specialists kept after parallel specialists worked against the team: one reviewer, one implementer | reported | [sub-agents](https://github.blog/ai-and-ml/github-copilot/building-a-general-purpose-accessibility-agent-and-what-we-learned-in-the-process/#h-use-sub-agents) |
| 5, 6 and 1 steps | ordered steps in each of the reviewer's three phases (research, code audit, structured output), from a diagram | reported | [linear order](https://github.blog/ai-and-ml/github-copilot/building-a-general-purpose-accessibility-agent-and-what-we-learned-in-the-process/#execute-instructions-in-a-linear-order) |
| 35 of 55 criteria, ~36% | success criteria of WCAG levels A and AA that deterministic automated checkers can detect, per a W3C page the post links; the share that cannot | reported | [checkers](https://github.blog/ai-and-ml/github-copilot/building-a-general-purpose-accessibility-agent-and-what-we-learned-in-the-process/#know-that-programmatically-determinable-issues-dont-cover-everything) |

## What worked

- Searching GitHub's own archive of hand-logged issues and their fix pull requests gave the agent
  examples in the house conventions; the author calls it one of its strongest assets, and holds
  that vague "best practices" instructions with a few examples won't work well
  ([old gold](https://github.blog/ai-and-ml/github-copilot/building-a-general-purpose-accessibility-agent-and-what-we-learned-in-the-process/#old-gold)).
- Two sandboxed sub-agents, a passive reviewer and an active implementer, that cannot message each
  other and return templated output to the parent, which filters the findings before any fix; the
  post credits this with escalation checkpoints, guidance-only mode for complex code, less
  irrelevant work and an audit trail ([sub-agents](https://github.blog/ai-and-ml/github-copilot/building-a-general-purpose-accessibility-agent-and-what-we-learned-in-the-process/#h-use-sub-agents)).
- Making the reviewer run its instructions through phases and steps in one set order was, the post
  says, key to accurate results; the order mirrors how the author audits by hand
  ([linear order](https://github.blog/ai-and-ml/github-copilot/building-a-general-purpose-accessibility-agent-and-what-we-learned-in-the-process/#execute-instructions-in-a-linear-order)).
- Schema templates for the reviewer and the implementer kept the agent consistent; without them,
  the post expects more tokens, hallucinations, needless code changes and output too messy to audit
  ([templates](https://github.blog/ai-and-ml/github-copilot/building-a-general-purpose-accessibility-agent-and-what-we-learned-in-the-process/#use-a-template-schema-pass-around-sub-agent-content)).
- The instructions against gaming its rules stopped the agent from breaking its own escalation
  rules, the post says, without a count ([bias to action](https://github.blog/ai-and-ml/github-copilot/building-a-general-purpose-accessibility-agent-and-what-we-learned-in-the-process/#reduce-bias-to-action)).
- Setting a narrow scope (help people remove barriers, not solve accessibility) sped up the launch
  and won more buy-in, per the author ([mindset](https://github.blog/ai-and-ml/github-copilot/building-a-general-purpose-accessibility-agent-and-what-we-learned-in-the-process/#h-mindset)).

## What went wrong

- The first design, one monolithic agent, soon outgrew its limits; the next, many specialist
  sub-agents running side by side whose output the main agent merged, as many guides advise,
  worked against the team ([sub-agents](https://github.blog/ai-and-ml/github-copilot/building-a-general-purpose-accessibility-agent-and-what-we-learned-in-the-process/#h-use-sub-agents)).
- An accessibility agent meant for any task can burn many tokens because the work is broad and
  needs full context; the post names three costs: more unreliable output, slower answers and higher
  running costs ([tokens](https://github.blog/ai-and-ml/github-copilot/building-a-general-purpose-accessibility-agent-and-what-we-learned-in-the-process/#efficient-token-consumption)).
- Speed and accuracy pull against each other: sub-agents were meant to speed up replies, but the
  need for accurate results won, hence the fixed order
  ([linear order](https://github.blog/ai-and-ml/github-copilot/building-a-general-purpose-accessibility-agent-and-what-we-learned-in-the-process/#execute-instructions-in-a-linear-order)).
- Models lean toward accessibility antipatterns when they write code, since they learned from
  decades of inaccessible code (the post points to an outside evaluation for this)
  ([old gold](https://github.blog/ai-and-ml/github-copilot/building-a-general-purpose-accessibility-agent-and-what-we-learned-in-the-process/#old-gold)).
- The post counts the fuzzy matching of models an asset when searching past issues, and implies that
  elsewhere it can be a liability ([past efforts](https://github.blog/ai-and-ml/github-copilot/building-a-general-purpose-accessibility-agent-and-what-we-learned-in-the-process/#past-efforts)).
- In the author's view, models share an urge to make output, which for Copilot mostly means code; the team
  had to add instructions against gaming because the model sought ways around its rule not to write
  code when people are needed ([bias to action](https://github.blog/ai-and-ml/github-copilot/building-a-general-purpose-accessibility-agent-and-what-we-learned-in-the-process/#reduce-bias-to-action)).
- Some widgets are beyond what models can currently build to work with assistive technology, per the
  team: toasts, tree views, drag and drop, data grids, rich text editors and more. The agent is shut
  off from generating code for them; code can pass automated checks yet be unusable, and leaving
  these open would cost everyone time to redo and put the accessibility team's reputation at risk
  ([high-risk patterns](https://github.blog/ai-and-ml/github-copilot/building-a-general-purpose-accessibility-agent-and-what-we-learned-in-the-process/#identify-high-risk-patterns)).
- Wrong output that the agent believes accessible may pass unchallenged, above all with users who
  know little about accessibility, and is costly to redo; this is why the agent is told to send
  complex code to the accessibility team instead
  ([limitations](https://github.blog/ai-and-ml/github-copilot/building-a-general-purpose-accessibility-agent-and-what-we-learned-in-the-process/#acknowledging-limitations),
  [complexity](https://github.blog/ai-and-ml/github-copilot/building-a-general-purpose-accessibility-agent-and-what-we-learned-in-the-process/#evaluate-code-complexity)).
- Coverage has a ceiling: by the W3C count the post cites, only 35 of 55 criteria at levels A and AA
  can be found by deterministic checkers, leaving ~36%; agents make some headway there, the post
  says, but not reliably. Citing a Deque page, it adds that most issues start in design; the agent
  reviews code, so it comes in after that (our reading)
  ([checkers](https://github.blog/ai-and-ml/github-copilot/building-a-general-purpose-accessibility-agent-and-what-we-learned-in-the-process/#know-that-programmatically-determinable-issues-dont-cover-everything)).
- Limits the post sets itself: the agent is no cure-all for every scenario, and it rests on a mature
  issue archive; organisations that have not yet found and fixed issues by hand start behind
  ([mindset](https://github.blog/ai-and-ml/github-copilot/building-a-general-purpose-accessibility-agent-and-what-we-learned-in-the-process/#h-mindset), [past efforts](https://github.blog/ai-and-ml/github-copilot/building-a-general-purpose-accessibility-agent-and-what-we-learned-in-the-process/#past-efforts)).
- The pilot is not finished and the agent is not open source; the post hopes to release it later
  ([learning in the open](https://github.blog/ai-and-ml/github-copilot/building-a-general-purpose-accessibility-agent-and-what-we-learned-in-the-process/#learning-in-the-open)).
- The lessons rest on claims, not comparisons (our reading): the post says sub-agents made the
  agent far more efficient with tokens and the fixed order made it more accurate, but shows no
  token counts, timings or accuracy for any of the designs it tried
  ([learning in the open](https://github.blog/ai-and-ml/github-copilot/building-a-general-purpose-accessibility-agent-and-what-we-learned-in-the-process/#learning-in-the-open)).
- The post says the agent works better when "trained" on audited issues; from its own account the
  agent searches and reads those issues, and nothing says a model was fine-tuned (our reading)
  ([learning in the open](https://github.blog/ai-and-ml/github-copilot/building-a-general-purpose-accessibility-agent-and-what-we-learned-in-the-process/#learning-in-the-open)).
- **Not reported:** what the 68% resolution rate means, its denominator (pull requests or issues)
  and who judged it; any evidence that the listed issue types were in fact removed; how many
  findings were raised, accepted, rejected or false alarms; any result for the first goal, answers
  in the CLI and VS Code; any result of the manual reviews or the reviewer sentiment tooling; the
  models, the cost in tokens or money, time per review; when the pilot started; the complexity
  heuristics and threshold; the full high-risk list; the validation skills and decision table; how
  often it escalated or refused; how often its fixes were checked with assistive technology or by
  disabled users ([post](https://github.blog/ai-and-ml/github-copilot/building-a-general-purpose-accessibility-agent-and-what-we-learned-in-the-process/)).

## Practices to copy

- [stated] Give an accessibility agent your own archive of logged issues and the pull requests that fixed them, not generic best-practice prompts. ([Old gold](https://github.blog/ai-and-ml/github-copilot/building-a-general-purpose-accessibility-agent-and-what-we-learned-in-the-process/#old-gold))
- [stated] Split review from fixing: a read-only reviewer and a separate implementer that hand over only through the parent agent. ([Sub-agents](https://github.blog/ai-and-ml/github-copilot/building-a-general-purpose-accessibility-agent-and-what-we-learned-in-the-process/#h-use-sub-agents))
- [stated] Pass findings between sub-agents in fixed schema templates, to keep the agent consistent and its work auditable. ([Templates](https://github.blog/ai-and-ml/github-copilot/building-a-general-purpose-accessibility-agent-and-what-we-learned-in-the-process/#use-a-template-schema-pass-around-sub-agent-content))
- [stated] Score code complexity with a script before the agent acts; above the threshold it gives guidance and sends the engineer to accessibility experts. ([Complexity](https://github.blog/ai-and-ml/github-copilot/building-a-general-purpose-accessibility-agent-and-what-we-learned-in-the-process/#evaluate-code-complexity))
- [stated] Keep a list of widgets the agent must never build, such as drag and drop or data grids, and route them to people. ([High-risk patterns](https://github.blog/ai-and-ml/github-copilot/building-a-general-purpose-accessibility-agent-and-what-we-learned-in-the-process/#identify-high-risk-patterns))
- [stated] When an agent must stop and escalate, add explicit instructions against getting around that rule. ([Bias to action](https://github.blog/ai-and-ml/github-copilot/building-a-general-purpose-accessibility-agent-and-what-we-learned-in-the-process/#reduce-bias-to-action))
- [ours] Test such stop rules on cases built to tempt the agent, since the post reports no count of how well they held. ([Bias to action](https://github.blog/ai-and-ml/github-copilot/building-a-general-purpose-accessibility-agent-and-what-we-learned-in-the-process/#reduce-bias-to-action))
- [ours] Define a fix rate before quoting it: what counts as resolved, out of what, and who decided. ([Post](https://github.blog/ai-and-ml/github-copilot/building-a-general-purpose-accessibility-agent-and-what-we-learned-in-the-process/))

## In their words

> "one quality they all seem to share is desperately wanting to produce content"
> — Eric Bailey, GitHub, [2026-05-15](https://github.blog/ai-and-ml/github-copilot/building-a-general-purpose-accessibility-agent-and-what-we-learned-in-the-process/#reduce-bias-to-action)

## Context

- Model era: the post names no model; it was published in May 2026, and `period` is unstated
  ([post](https://github.blog/ai-and-ml/github-copilot/building-a-general-purpose-accessibility-agent-and-what-we-learned-in-the-process/)).
- The post frames the work with the European Accessibility Act now in force and the ADA Title II
  rule making WCAG 2.1 AA the legal bar from April 2027 ([past efforts](https://github.blog/ai-and-ml/github-copilot/building-a-general-purpose-accessibility-agent-and-what-we-learned-in-the-process/#past-efforts)).
