## Task
Build four case study pages (Animal Indicators, Digital Disparities, DHSS, Instagram feed feature) using one shared 7-section template, with content depth and a specific data-privacy disclosure line varying per project. Link them from the Featured Case Studies grid on the Work page.

## Success criteria
- One shared HTML/CSS template structure is used across all four pages, in this exact section order for every page:
  1. Hero (title, one-line summary, role, tools, timeline)
  2. Hook (2-3 sentences, visible without scrolling: problem, why it was hard, what was done)
  3. Context/Problem (audience + constraint; this is where each project's specific disclosure line goes — see below)
  4. Process (key decisions with rationale; annotated screenshots; sped-up video montage placeholder where noted)
  5. Final Solution (polished annotated screenshots; clean walkthrough video placeholder where noted)
  6. Outcome (what it demonstrates — a real qualitative finding, or what a foundational phase established)
  7. Reflection (2-3 sentences, one honest "what I'd do differently")
- Each page includes its exact Context disclosure line (verbatim, don't paraphrase):
  - **Animal Indicators**: "The data shown has been replaced with placeholder values to protect the privacy of the original dataset; the visualization system and design decisions reflect the real project." Also include the Phase 1 framing: "This is the foundation phase of an ongoing initiative visualizing animal population trends for conservation audiences — future iterations will expand the dataset and scope, either by me or collaborating designers."
  - **Digital Disparities**: "This visualization displays real patient data with small-cell suppression applied — figures representing fewer than 10 patients are not shown, per standard data privacy practice." Also include Phase 1 framing (adapt the wording above to this project).
  - **DHSS**: "The facility/tool data shown is placeholder, pending integration with real data sources; this project does not use and will never involve patient-level data." Also include Phase 1 framing (adapt the wording above to this project).
  - **Instagram feed feature**: State plainly this was a course/class assignment. No data-privacy line needed (no sensitive data involved).
- Content depth per section varies by project — implement as different amounts of placeholder content, not different section structure:
  - Animal Indicators: full visual weight in Process (montage placeholder) and Final Solution.
  - Digital Disparities / DHSS: light Process section (1-2 key decisions, no forced video montage placeholder — image-annotation placeholders only); full weight in Final Solution.
  - Instagram feed feature: Process section uses research-artifact/insight placeholders (not screenshot placeholders); Final Solution section includes a walkthrough video placeholder.
- Video sections use two visually distinct placeholder treatments so it's obvious which type of clip goes where: a "process montage — sped-up, ~20-30 sec" placeholder block in Process, and a "final walkthrough — clean, under 90 sec" placeholder block in Final Solution. Use an HTML5 `<video>` tag with a placeholder `poster` image and a comment noting expected filename convention (e.g. `animal-indicators-process.mp4`).
- All screenshot placeholders use `<img>` with descriptive `alt` text (not filler alt text) and a visible caption element below each for annotation text, since annotated visuals are a stated requirement.
- Each of the four pages is a real file the Featured Case Studies grid on `work.html` links to (update the `href`/`data-case-study` placeholder links from the earlier carousel work to point to the real files).

## Scope
- Files to touch: create `/Users/selahpabon/Desktop/Simple Portfolio/case-studies/animal-indicators.html`, `digital-disparities.html`, `dhss.html`, `instagram-feed.html` (create the `case-studies/` folder if it doesn't exist). Update `work.html`'s Featured Case Studies grid links. Reuse existing CSS files already linked from `work.html` — add new shared classes for case-study sections there rather than creating a separate stylesheet, unless the existing CSS file is already very large, in which case create `case-studies/case-study.css` and link it from each new page.
- First step: read `work.html` and its linked CSS to confirm current class naming/spacing conventions and find the actual href placeholders from the carousel/grid build.
- Do NOT touch the Other Work carousel or its detail panel — that's already built and out of scope here.
- Do NOT invent metrics, outcomes, or research findings that weren't given above — use bracketed placeholder text like `[insert specific finding here]` for any content Selah needs to fill in herself, rather than writing plausible-sounding fake claims.

## Approach
1. Read `work.html` + linked CSS to match conventions.
2. Build the shared template first as the Animal Indicators page (it has the fullest content), matching the 7-section order above.
3. Duplicate the template for the other three pages, then adjust each one's Process/Final Solution content depth and Context disclosure line per the success criteria.
4. Update the four Featured Case Study card links on `work.html` to point to the new files.
5. Verify all four pages share identical section markup/class structure (same order, same class names) even though content length differs — this is a deliberate consistency requirement, not an oversight to "fix."
6. Test at mobile width (375px) since the rest of the site needs to work there.

## Notes
- Keep copy tone consistent with the rest of the site: warm, direct, not corporate.
- Reflection section text should be written as real placeholder prompts (e.g. "[What would you do differently with more time/resources?]") since this is personal reflection Selah needs to write herself, not something to fabricate.
