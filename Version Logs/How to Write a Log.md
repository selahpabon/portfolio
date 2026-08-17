# How to Write a Version Log

This file is instructions for whoever (or whatever AI) writes the next version log in this folder. Read this before creating a new one. `Log V0.md` is the reference example — when in doubt, match its structure and tone.

## When to create a new log

Create a new log at the end of a work session (or a natural stopping point) once real changes have landed — not for a single trivial tweak. Use judgment: a handful of small related tweaks in one sitting (e.g. "resize the marquee, fix the copy, slow it down") can be one log entry; a single unrelated one-line fix probably doesn't need its own log unless the user asks for one.

## Naming

- File name: `Log V<N>.md`, incrementing from the highest existing number in this folder (`Log V0.md`, `Log V1.md`, `Log V2.md`, ...). Check the folder first — don't guess the next number.
- Keep it in this same `Version Logs/` folder, as a sibling to the others.

## Required header

Every log starts with the same three lines, in this order:

```
# Log V<N>

**Date:** YYYY-MM-DD
**Live site:** <current live URL>
**Repo:** <current repo URL>
**Since:** Log V<N-1>
```

- Use the actual current date (ask for it or check system context — don't guess).
- `Since:` links this log to the previous one so the series reads as a continuous chain. (`Log V0` is the exception — it's a baseline snapshot of everything up to that point, so it has no `Since:` line and documents cumulative state instead of a delta. Every log after V0 should describe a *delta* — what changed since the last log — not repeat the whole site's history again.)

## Sections, in this order

Only include a section if it has real content for this log — omit empty sections rather than writing "N/A" or leaving a header with nothing under it.

1. **Features** — new user-facing functionality added or existing functionality substantively extended. One subsection (`###`) per feature, named after the feature, with a short paragraph of what it does and where it lives (link the file).
2. **Design/UX choices** — decisions worth remembering that aren't obvious from reading the code: *why* something was built a particular way, tradeoffs considered, things intentionally left as placeholder/deferred. This is the section most worth being careful and complete about — code review shows *what* changed, this section is the only place *why* survives.
3. **Bug fixes** — anything broken that got fixed. For each: what was broken, the root cause (be specific — this is what saves the next debugging session time), and the fix.
4. **Hosting/deployment** — only if something about how the site is built, deployed, or configured changed (new cache-busting scheme, new host, new domain, changed deploy process, etc.). Routine `git push`es don't need a mention.
5. **Known pending work** — anything intentionally left unfinished or deferred, so it isn't forgotten. Carry forward items from the previous log's "Known pending work" that are still true, and remove ones that got resolved.

## Writing style

- Match `Log V0.md`'s voice: plain, factual, technical, no marketing language, no filler ("we're excited to announce..."). Write like an engineer leaving notes for the next engineer (or AI) picking this up cold.
- Prefer specific detail over vague summary. "Slowed the marquee scroll from 22s to 38s per loop" beats "made the marquee slower."
- Link to real files using relative markdown links (e.g. `[style.css](../style.css)`) so entries are clickable/navigable, same as the rest of this codebase's conventions.
- Keep it a changelog, not a transcript — describe the end state and reasoning, not the back-and-forth it took to get there (no "the user asked for X, then I tried Y, then...").
- It's fine (encouraged) to cross-reference an earlier log by name if a fix builds on or revisits something documented there, e.g. "see the flex-sizing bug in Log V0."

## Before writing

Skim the diff/commits since the last log (`git log <last-log-commit>..HEAD --oneline`, or just recall the session's changes) so nothing gets missed or misdescribed. If unsure what actually shipped vs. what was discussed but not implemented, check the current files rather than relying on conversation memory alone.
