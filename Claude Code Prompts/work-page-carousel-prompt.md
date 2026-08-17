## Task
On the Work page, build two sections: a 2x2 "Featured Case Studies" grid, and a horizontal swipeable "Other Work" carousel below it with a spread/blurred coverflow effect. Clicking a carousel card opens a detail panel with more photos, a caption, and an optional link.

## Success criteria
- Featured Case Studies renders as a 2x2 grid of 4 large cards, each linking to its own case study page (use placeholder `href="#"` and a `data-case-study` attribute if the target pages don't exist yet).
- Other Work renders as a horizontal carousel below the featured grid, one row, swipeable.
- The focused (centered) carousel card is fully sharp and slightly larger; adjacent cards are visible but smaller, spaced apart (not touching/overlapping), and blurred — like a coverflow, not a cropped edge peek.
- Carousel supports: mouse drag, touch swipe, and **left/right arrow key navigation** (arrow keys work when the carousel has focus — give it `tabindex="0"` and a visible focus outline).
- Carousel does NOT auto-rotate.
- A scroll position indicator (dots or a thin progress bar) shows how many cards there are and which is active.
- Clicking a card opens a panel (modal or slide-up drawer) showing: 3-5 photos, a title, a one-line medium/context caption, and a link if the card has one (omit the link element entirely if not applicable — don't show a dead link).
- Panel closes via: close button, `Escape` key, and clicking outside the panel. Closing returns focus to the carousel card that opened it, at the same scroll position.
- Panel and carousel are keyboard-navigable and screen-reader accessible: carousel cards are focusable buttons/links with descriptive `aria-label`s (e.g. "View The Art of the Blood Thieves, bound short story book"), the panel uses `role="dialog"` with `aria-modal="true"`, and focus is trapped inside the panel while open.
- No new dependencies/libraries — implement with vanilla HTML/CSS/JS to match the rest of the site.

## Scope
- Files to touch: `/Users/selahpabon/Desktop/Simple Portfolio/work.html`, and whichever CSS/JS files in `/Users/selahpabon/Desktop/Simple Portfolio/` are already linked from `work.html`'s `<head>`.
- First step: read `work.html` to see its current structure, and check its `<head>`/`<script>` tags to find the exact linked CSS and JS file names — don't guess file names, look them up.
- Do NOT touch other pages (home, about, resume) except to verify shared nav/footer markup you need to match.
- Do NOT introduce a JS framework, carousel library, or build step. This is a static plain HTML/CSS/JS site.

## Approach
1. Read `work.html` in full, plus its linked CSS/JS files, to learn existing class naming conventions, color variables, and spacing scale. Match them — don't invent a new visual system.
2. Replace the current placeholder "Project case studies are on their way" box with the Featured Case Studies grid, using these 4 placeholder entries (swap in real thumbnails/links later): Animal Indicators, Digital Disparities, DHSS, Instagram feed feature.
3. Below it, add the Other Work carousel with these placeholder entries: The Art of the Blood Thieves (bound short story book), screen-printed baby photo book, Visual Texts + Gallery site, digitally made book jacket, anthropology flyers, bookbinding project(s).
4. Build the coverflow spacing/blur effect with CSS transforms (`scale()`, `translateX()`, `filter: blur()`) driven by each card's distance from center — recalculate on scroll/swipe via a `scroll` or custom drag handler, not a heavy JS carousel library.
5. Wire up arrow-key navigation on the carousel container (`keydown` listener for `ArrowLeft`/`ArrowRight` scrolls to the previous/next card).
6. Build the detail panel as a single reusable `<dialog>` or modal `<div>`, populated dynamically from each card's data (use `data-*` attributes or a small JS array of objects — whichever matches how the rest of the site already handles content, if it does).
7. Test at mobile width (single-column featured grid, carousel still swipeable) since the site needs to work at 375px wide.

## Notes
- Use placeholder images/text for any project without final assets yet; keep it easy to swap in real content later (clear, commented placeholder blocks).
- Keep the panel's tone consistent with the rest of the site's copy style (warm, direct, not corporate).
