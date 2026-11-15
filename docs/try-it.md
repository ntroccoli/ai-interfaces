# Try it: apply, revisit and share

What follows step 1 of each route in the [README](../README.md#try-it). Step 1 is one prompt that
serves the first review and every revisit: the agent looks for the route's record in your project
and says in its first line which path it took and why. Run step 1 in a fresh session and step 2 in
the same session. Before applying anything, check step 1's claims: a proposal can rest on a wrong
reading of your project. The method, the report, the record and the apply steps are in
[applying-lessons.md](applying-lessons.md).

## Before an interface change

### Step 2: apply

Answer the report with one line:

```text
Apply what you recommended.
```

To choose yourself, write "Apply proposals 1, 3 and 5." instead; to apply nothing yet, "Apply none;
write the record." The agent follows "[Apply](applying-lessons.md#apply-step-2)": it writes each
baseline to `docs/interface-baselines/` and the record to `docs/interface-review.md` (every
proposal, the later and skipped ones too), then applies one proposal at a time on a branch, stops
at the first failing check and reports it, and after the interface change reruns every baselined
count and lists each that rose.

### Step 3: revisit later

Paste the step 1 prompt of this route ([README](../README.md#before-an-interface-change)) again, in
a fresh session, when the collection has grown (`llms.txt` names a newer log entry than your
record) or after a few weeks of work. Because `docs/interface-review.md` exists, it does the
revisit: corrections first, then it reruns the baselined counts, re-checks the record and proposes
only what is new, earlier "later" items and items that stopped holding. Items you skipped or
declined stay closed unless a new lesson, a correction or a changed measurement bears on them, and
the agent says which. When nothing is new or due it says so and stops. Then step 2 as above.

## Learning from the lessons

### Step 2: apply

As in the other route: "Apply what you recommended.", "Apply proposals 1, 3 and 5." or "Apply
none; write the record." The record is `docs/interface-lessons-review.md`, with a baseline file in
`docs/interface-baselines/` for each count.

### Step 3: revisit later

Paste the step 1 prompt of this route ([README](../README.md#learning-from-the-lessons)) again, in
a fresh session. Because `docs/interface-lessons-review.md` exists, it does the revisit, as in the
other route.

Revisit prompts published before 2026-11-15 (they began "Read docs/interface-review.md" or "Read
docs/interface-lessons-review.md") still work: every file and section they name is kept.

## Share what you learned (optional)

A [field report](field-reports.md) says which questions and lessons foresaw the problems you hit
and which missed them; it is how the checklist and the lessons improve. Wait until an item has met
its problem since its baseline (proven, or stopped holding); until then the record says nothing
has happened yet. Nothing is posted until you say yes. Paste:

```text
Read https://raw.githubusercontent.com/ntroccoli/ai-interfaces/main/docs/field-reports.md and follow it. Draft a field report from the review record in docs/ (interface-review.md or interface-lessons-review.md), with the counts before and after from its baseline files, naming which questions and lessons held and which did not; scrub it, and show me the exact text before posting. If no item has met its problem since its baseline, write that in the record with the date and do not draft a field report yet.
```
