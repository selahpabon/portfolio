# Log V0

**Date:** 2026-08-16
**Live site:** https://selahpabon.github.io/portfolio/
**Repo:** https://github.com/selahpabon/portfolio

This is the baseline log covering everything done on the site so far, from initial hosting setup through the current state. Future work should get its own `Log V1`, `Log V2`, etc. in this same folder, each describing what changed since the last log.

---

## Site structure

Plain HTML/CSS/vanilla JS, no build step, no dependencies.

- [index.html](../index.html) — Home page. Portrait photo, intro/quote/tagline, "About Me / Work / Resume" buttons, marquee banner, bottom nav.
- [about.html](../about.html) — About page.
- [work.html](../work.html) — Work page: "Featured Case Studies" grid + "Other Work" carousel.
- [resume.html](../resume.html) — Resume page.
- [case-studies/](../case-studies/) — One HTML page per featured case study (`animal-indicators.html`, `dhss.html`, `digital-disparities.html`, `instagram-feed.html`), sharing `case-study.css`.
- [style.css](../style.css) — Shared stylesheet for the whole site (cache-busted via `?v=` query param, bumped on every CSS change).
- [assets/](../assets/) — All images/videos/PDFs actually used by the live pages, organized in per-project subfolders (`animal-indicators/`, `dhss/`, `digital-disparities/`, `instagram-feed/`) plus shared assets (profile photo, eye-pattern SVGs, resume PDF).
- [assets/work.js](../assets/work.js) — Powers the "Other Work" coverflow carousel + detail panel on the Work page.

### Raw project folders (not part of the live site)

`Animal Indicators/`, `DHSS/`, `Digital Disparities/`, `Instagram Feed Feature/` at the repo root hold original source files (raw screenshots, .mov files, case study drafts, process PDFs) that the finished pages don't link to directly — the polished, renamed copies actually used live under `assets/`. These raw folders are `.gitignore`d (see Bug Fixes below) so they stay local-only and don't bloat the repo (~880MB combined vs. ~72MB for everything the site actually uses).

---

## Features

### Featured Case Studies (Work page)
2x2 grid linking to four full case study write-ups: SIDEKiC, Digital Disparities, WashU Care Navigation App (DHSS), and Instagram Feed Feature. Fully built out with real thumbnails, screenshots, and walkthrough videos.

### Other Work carousel (Work page)
A horizontally-scrolling "coverflow" carousel (scale/blur/opacity falloff by distance from center) for smaller, non-case-study design pieces, with a shared detail-panel modal (photo viewer, title/caption, conditional action buttons for PDF/demo/live-site links, and a 4-section accordion: Background & Why / Materials / Process / Reflection). Built with 6 placeholder entries (The Art of the Blood Thieves, Screen-Printed Baby Photo Book, Visual Texts + Gallery Site, Book Jacket, Anthropology Flyers, Bookbinding Projects) to exercise the layout with varied content combinations.

**Current state:** the carousel is fully built but not yet populated with real content, so it's blurred and marked `inert` behind a "Other design work coming soon" overlay until real photos/copy are ready to drop in. See `work.html` and `style.css` for the exact markup/CSS to remove when it's time to re-enable it.

### "Currently looking for work" marquee (Home page)
A continuous horizontally-scrolling ticker banner sitting just under the "About Me / Work / Resume" buttons, above the bottom nav. Reads: *"Currently looking for part-time or full-time UX/UI work — remote or based in STL, MO. :)"*

- Seamless infinite loop via two duplicated text blocks + a `translateX(-50%)` CSS animation (38s per loop).
- Positioned with `position: relative; top: -70px` (not margin) so it visually sits closer to the buttons without affecting the page's flexbox sizing (see Bug Fixes).
- Respects `prefers-reduced-motion` (animation disabled if set).
- Accessible: the repeated visual text is `aria-hidden`, screen readers get the message once via an `aria-label` on the wrapper.

---

## Design/UX choices worth remembering

- Home page (`body.home`) is a fixed single-viewport layout (`height: 100vh; overflow: hidden`, flex column) — no scrolling on desktop widths. Below an 800px breakpoint it switches to normal scrolling block layout instead of squeezing content in.
- The hero photo is positioned independently of the flexbox hero-text column (via viewport-height math), so it stays vertically centered regardless of other layout changes around it.
- Work page carousel and detail panel are driven entirely by `data-*` attributes on each card (title, caption, photo count, optional PDF/demo/link, optional accordion sections) — action buttons and accordion sections only render when the corresponding data is present, so adding/editing a piece never requires touching `work.js`.

---

## Bug fixes

- **`.gitignore` swallowing `assets/dhss/`:** the original `.gitignore` used an unanchored `DHSS/` pattern meant to exclude the raw root-level `DHSS/` folder, but it also matched `assets/dhss/` — case-insensitively, since macOS git defaults to `core.ignorecase=true`. That silently excluded the entire WashU Care Navigation App case study's images and walkthrough video from the repo, so they 404'd on the live site even though the HTML correctly referenced them. Fixed by anchoring all four raw-folder patterns to the repo root (`/DHSS/` instead of `DHSS/`, etc.).
- **Marquee-up shift also moving the hero buttons:** an early attempt to move the marquee closer to the hero buttons used a negative `margin-top` on `.marquee`. Since `.marquee` is a fixed-size (`flex: 0 0 auto`) sibling of `.hero` (a `flex: 1 1 auto` grower), shrinking its margin freed up space that `.hero` then grew into to compensate — which re-centered `.hero-text` (and the buttons) lower than before. Fixed by switching to `position: relative; top: -70px`, a paint-time offset that doesn't participate in flex sizing at all.

---

## Hosting/deployment

- Hosted on **GitHub Pages**, public repo `selahpabon/portfolio`, serving from `main` branch root.
- Deploy workflow: commit + `git push` to `main`; GitHub Pages rebuilds automatically (~1–2 min).
- CSS is cache-busted via a `?v=N` query param on the `<link>` tag in every HTML page, bumped on every `style.css` change so browsers don't serve a stale cached copy.

---

## Known pending work

- "Other Work" carousel (Work page) is built but hidden behind a "coming soon" overlay — needs real photos, PDFs/demos/links, and copy per piece before re-enabling.
- No custom domain yet — currently on the default `selahpabon.github.io/portfolio/` URL.
