# Corrections

What this collection published wrong, so a project that applied it can find and repair what it
changed. A revisit ([applying the lessons](docs/applying-lessons.md#revisit)) reads this file
first, every time, even when it holds no entry newer than the project's record, and the record
then names the entries it checked. Whoever ran a route while an entry was published should run
the review prompt again (README "Try it", step 1); with a record it does the revisit. A correction is never applied to a project without its owner's yes. Format:
[docs/format.md](docs/format.md#corrections). Newest first.

## 2026-11-15 — three measuring rules that dropped or deferred findings

- **Wrong:** a behaviour check (a fresh agent applying each item to a small prepared project)
  found three items doing harm. The default list of jobs for question 1 stopped at ten, and the
  agent left five of fifteen jobs out of the baseline, reporting a lost library card among them.
  The note on question 3 forbade a text-search count for server templates without saying what to
  do instead, and the agent reported no failure at all, though images had no text alternative, a
  field no label and a clickable element no keyboard access. The rule that a question of look
  goes to the owner let two contrast failures below the WCAG target wait as "later" because they
  touched a brand colour.
- **Published:** release 2026.11 (commit a803016, 2026-11-15) until the update "2026-11-15 —
  provenance and behaviour checks" in [log.md](log.md).
- **Recognise it:** in the project's review record or baseline files, a job list of exactly ten
  jobs or jobs named as left out; question 3 answered only with "no static checker for this
  template language"; a contrast pair below its target with a proposal marked later or skip
  because it changes a colour.
- **Find what it changed:** compare the baseline's jobs with today's navigation entries and form
  pages; read the templates for images, form fields and click handlers on elements that are not
  controls; list the record's contrast rows below target that are open or skipped.
- **Propose to the owner:** add the missing jobs to the baseline and to its walk test; list the
  template failures as candidates read from the code, apart from any checker count; for each
  failing pair, values that pass, the owner choosing among them.
