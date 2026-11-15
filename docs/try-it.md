# Try it: apply, revisit and share

The paste-ready prompts that follow step 1 of each route in the [README](../README.md#try-it). Run
step 2 in the same session as step 1; run each revisit in a fresh session. Before applying
anything, check step 1's claims: a proposal can rest on a wrong reading of your project. The method,
the report and the record are in [applying-lessons.md](applying-lessons.md).

## Before an interface change

### Step 2: apply

To accept the agent's recommendations, paste:

```text
Apply the proposals you marked "do". Do the work the way this project normally runs work (yourself, or by briefing workers). Before changing anything, write each baseline the report gives to docs/interface-baselines/, and the record https://raw.githubusercontent.com/ntroccoli/ai-interfaces/main/docs/applying-lessons.md defines for the checklist in docs/interface-review.md with each chosen proposal's baseline: its count, or how often its problem has happened so far, with the evidence. For each proposal, first state its "Check now" and its "Event that proves it"; it is applied when the check now passes (waiting for first use), proven only once later work shows the event. Where the owner left a question unanswered, assume the default the report states and record the assumption. After the interface change, rerun every baselined count with the same command and list each that rose. Then complete the record, with every proposal, including the later and skipped ones, and the newest entry of https://raw.githubusercontent.com/ntroccoli/ai-interfaces/main/log.md this review covered.
```

To choose yourself, replace the first sentence with "Apply proposals 1, 3 and 5."

### Step 3: revisit later

When the collection has grown (llms.txt names a newer log entry than your record) or after a few
weeks of work, run a revisit in a fresh session. It stops at once if nothing is new or due; else
it reruns the baselined counts and re-checks the record, then measures and proposes only what is
new since your record's log entry. Paste:

```text
Read docs/interface-review.md and https://raw.githubusercontent.com/ntroccoli/ai-interfaces/main/llms.txt. Compare the log entry the record names (date and title) with the newest entry llms.txt names; if they match and no item is due for re-check (an item is due when it is waiting or open and the project has commits since the record's date), tell me and stop. Else read https://raw.githubusercontent.com/ntroccoli/ai-interfaces/main/docs/applying-lessons.md and follow its revisit section. Re-check each item: rerun its "Check now" unchanged (for a count, the command in its baseline file, same tool version), look for its "Event that proves it" in the work since, compare with its baseline, and mark it exactly "proven", "still waiting", "stopped holding" or "not shown" (its event cannot be seen yet), with the numbers. For each log.md entry newer than the record's, read its changes/ file (the lesson IDs and checklist questions it added, changed or removed); open only those, and measure them; do not judge from memory. List the applied lessons a newer lesson now contradicts or supersedes, and the items whose lesson or question changed. Propose only the new or changed ones, earlier "later" items, applied items that stopped holding and what that list found, each with exactly one word, do, later or skip, and a reason. Update the record in its existing layout and name in it the newest log.md entry you read, by date and title. Change nothing else until I choose.
```

## Learning from the lessons

### Step 2: apply

To accept the agent's recommendations, paste:

```text
Apply the proposals you marked "do". Do the work the way this project normally runs work (yourself, or by briefing workers). Before changing anything, write the record https://raw.githubusercontent.com/ntroccoli/ai-interfaces/main/docs/applying-lessons.md defines in docs/interface-lessons-review.md with each chosen proposal's baseline: how often its problem has happened so far, with the evidence, and for a count its baseline file in docs/interface-baselines/. For each proposal, first state its "Check now" and its "Event that proves it"; it is applied when the check now passes (waiting for first use), proven only once later work shows the event. Where the owner left a question unanswered, assume the default the report states and record the assumption. Then complete the record, with every proposal, including the later and skipped ones, and the newest entry of https://raw.githubusercontent.com/ntroccoli/ai-interfaces/main/log.md this review covered.
```

To choose yourself, replace the first sentence with "Apply proposals 1, 3 and 5."

### Step 3: revisit later

As in the other route, in a fresh session. Paste:

```text
Read docs/interface-lessons-review.md and https://raw.githubusercontent.com/ntroccoli/ai-interfaces/main/llms.txt. Compare the log entry the record names (date and title) with the newest entry llms.txt names; if they match and no item is due for re-check (an item is due when it is waiting or open and the project has commits since the record's date), tell me and stop. Else read https://raw.githubusercontent.com/ntroccoli/ai-interfaces/main/docs/applying-lessons.md and follow its revisit section. Re-check each item: rerun its "Check now" unchanged (for a count, the command in its baseline file, same tool version), look for its "Event that proves it" in the work since, compare with its baseline, and mark it exactly "proven", "still waiting", "stopped holding" or "not shown" (its event cannot be seen yet), with the numbers. For each log.md entry newer than the record's, read its changes/ file (the lesson IDs it added, changed or removed); open only those lessons, and measure them; do not judge from memory. List the applied lessons a newer lesson now contradicts or supersedes, and the items whose lesson changed. Propose only the new or changed ones, earlier "later" items, applied items that stopped holding and what that list found, each with exactly one word, do, later or skip, and a reason. Update the record in its existing layout and name in it the newest log.md entry you read, by date and title. Change nothing else until I choose.
```

## Share what you learned (optional)

A [field report](field-reports.md) says which questions and lessons foresaw the problems you hit
and which missed them; it is how the checklist and the lessons improve. Wait until an item has met
its problem since its baseline (proven, or stopped holding); until then the record says nothing
has happened yet. Nothing is posted until you say yes. Paste:

```text
Read https://raw.githubusercontent.com/ntroccoli/ai-interfaces/main/docs/field-reports.md and follow it. Draft a field report from the review record in docs/ (interface-review.md or interface-lessons-review.md), with the counts before and after from its baseline files, naming which questions and lessons held and which did not; scrub it, and show me the exact text before posting. If no item has met its problem since its baseline, write that in the record with the date and do not draft a field report yet.
```
