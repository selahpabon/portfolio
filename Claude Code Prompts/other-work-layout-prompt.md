## Task
Build out the visual layout of the Other Work carousel section and its detail panel on the Work page, matching the approved coverflow spacing/blur style and the accordion-based panel structure. This is a layout pass — use placeholder content everywhere; real photos, videos, PDFs, links, and copy will be dropped in project by project afterward.

## Success criteria

**Carousel section**
- Horizontal row of cards, one focused/centered card at a time.
- The centered card is sharp, not blurred, and slightly larger than its neighbors, with a visible border or shadow to mark it as focused.
- Cards one step out from center ("near") are slightly smaller and lightly blurred.
- Cards at the edge of view ("far") are smaller still and more blurred, but stay fully visible and spaced apart from neighboring cards — never cropped at the row's edge, never touching/overlapping adjacent cards.
- A dot row below the carousel shows total card count and marks the active card (active dot wider/pill-shaped, per the approved mockup).
- Small italic hint text below the dots: something like "Swipe, drag, or use arrow keys to browse. Click a card to open its panel."
- Left/right circular arrow buttons sit at the outer edges of the carousel for click-to-navigate, in addition to swipe/drag/arrow-key support already built (see existing carousel JS if already implemented from the earlier work-page-carousel-prompt build — extend it, don't rebuild it from scratch if it's already there).
- No auto-rotation.

**Detail panel (opens on card click)**
Layout, top to bottom:
1. Photo carousel (already implemented — multiple photos, user-scrollable/swipeable within the panel). Leave this as-is if already built; just confirm it sits at the top of the panel.
2. Title and a one-line subtitle/medium description directly below the photo carousel.
3. A row of action buttons directly below the title, only for fields that apply to that specific piece: "View PDF", "Watch demo" (video), "View live site" (link). These are plain buttons that open the asset in a new tab, not collapsible content. Only render the buttons for fields that have content for that specific piece, don't show empty/disabled buttons.
4. Below the action buttons, an accordion of up to four sections, in this order: **Background & Why**, **Materials**, **Process**, **Reflection**. Build these with native `<details>`/`<summary>` elements (not custom JS toggles), styled to match the site's visual language (custom disclosure icon instead of the browser default triangle, per the approved mockup's +/− style).
5. Only render an accordion section if that piece has real content for it — if a piece has no Process or Reflection content, that `<details>` element simply isn't included, not shown empty or disabled.
6. One section can default to open (Background & Why) with the rest collapsed by default; confirm this is easy to change per-piece if a different section should open first.

## Scope
- Files to touch: `/Users/selahpabon/Desktop/Simple Portfolio/work.html`, and its already-linked CSS/JS files.
- First step: read the current state of `work.html` and its CSS/JS to see what's already built from the earlier carousel/panel work (data-vis prompt, coverflow structure, etc.) — extend and restyle that existing implementation rather than starting over, unless it turns out nothing has been built yet.
- Do NOT touch the Featured Case Studies grid or the case study pages.
- Do NOT wire up real content yet — every field (photos, video, PDF, link, materials, background, process, reflection) should use clearly marked placeholder content/comments so it's obvious what needs to be swapped in per piece later.
- No new dependencies or libraries. Vanilla HTML/CSS/JS only, consistent with the rest of the site.

## Approach
1. Read `work.html` and linked CSS/JS in full to confirm what's already implemented for the carousel and panel, and match existing class/naming conventions.
2. Update or build the carousel's coverflow CSS (scale/blur/spacing by distance from center) to match the approved visual: sharp focused card, lightly blurred near cards, more blurred but still spaced-apart far cards.
3. Update the dot indicator and hint text styling to match the approved look.
4. Restructure the detail panel to the order above: photo carousel, title/subtitle, conditional action buttons, then the four-section accordion built with `<details>`/`<summary>`.
5. Build the accordion so any of the four sections can be omitted per piece without leaving a visual gap or empty header.
6. Style the `<details>`/`<summary>` disclosure indicator (+/−, or a custom icon) to match the site's visual language rather than using the default browser triangle.
7. Populate every piece (Anthropology flyers, book jacket, Visual Texts + Gallery site, bookbinding project(s), the screen-printed baby photo book, The Art of the Blood Thieves) with placeholder content across all fields, clearly marked as placeholder, so the layout can be visually tested with 6 varied cards before real content is dropped in.
8. Test at mobile width (375px): confirm the carousel is still swipeable and legible, and the panel's accordion and buttons stack cleanly on a narrow screen.

## Notes
- Keep the placeholder copy short and neutral (e.g. "[Background & Why placeholder text]") rather than writing plausible-sounding fake content for any piece.
- This is a pure layout/structure pass — don't write final copy or wire up final assets here; that happens per-piece afterward using the individual project prompts.
