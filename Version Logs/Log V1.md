# Log V1

**Date:** 2026-09-15
**Live site:** https://selahpabon.github.io/portfolio/
**Repo:** https://github.com/selahpabon/portfolio
**Since:** Log V0

## Features

None this session — this was a copy update and process/documentation addition, not new functionality.

## Design/UX choices

### Marquee copy updated to reflect current part-time work
The home page marquee (added in Log V0) no longer says it's "looking for" work — it now names the actual part-time employers: *"Currently working part-time @: Woodard Cleaning & Restoration, The Gatesworth and Living Earth Collaborative. :)"* in [index.html](../index.html). All 13 occurrences (12 repeated `.marquee-item` spans + the wrapper's `aria-label`) were updated together so the visible ticker text and the screen-reader announcement stay in sync. "Restoraton" in the requested text was corrected to "Restoration" as an assumed typo.

## Bug fixes

None this session.

## Hosting/deployment

No changes to hosting, deploy process, or cache-busting scheme.

## Known pending work

Carried forward from Log V0:
- "Other Work" carousel (Work page) is still built but hidden behind a "coming soon" overlay — needs real photos, PDFs/demos/links, and copy per piece before re-enabling.
- No custom domain yet — still on the default `selahpabon.github.io/portfolio/` URL.

New from this session:
- If the "Restoration" spelling correction wasn't wanted, it should be reverted back to the literal requested text.
