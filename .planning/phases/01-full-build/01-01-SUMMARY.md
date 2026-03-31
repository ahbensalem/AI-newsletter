---
phase: 01-full-build
plan: 01
subsystem: ui
tags: [react, tailwindcss, vite, framer-motion, fontsource, clsx, tailwind-merge, react-intersection-observer]

# Dependency graph
requires: []
provides:
  - Semantic light-theme CSS token system (20 tokens replacing 14 dark tokens)
  - Self-hosted Manrope Variable font via Fontsource (Google Fonts CDN removed)
  - Per-edition data model: src/data/editions/january-2026.js with 9 articles
  - Edition registry: src/data/index.js with allEditions, latestEdition, getEdition
  - cn() utility: clsx + tailwind-merge combinator
  - colorClasses utility: 5-category color map with pill/dot/label
affects: [01-02, 01-03, 01-04, 01-05, 01-06]

# Tech tracking
tech-stack:
  added:
    - "@fontsource-variable/manrope ^5.2.8 — self-hosted variable weight font"
    - "clsx ^2.1.1 — conditional class combinator"
    - "tailwind-merge ^3.5.0 — Tailwind v4 compatible class deduplication"
    - "react-intersection-observer ^10.0.3 — scroll-spy for TOC"
    - "@tailwindcss/typography ^0.5.19 (dev) — prose styles for article body"
    - "framer-motion moved from devDependencies to dependencies"
  patterns:
    - "Per-edition JS module pattern: default export with slug/month/year/issue/coverImage/articles; named export categories"
    - "Edition registry pattern: allEditions array, latestEdition, getEdition(slug) function"
    - "cn() utility for safe Tailwind class merging via clsx + twMerge"
    - "colorClasses map keyed by category ID with pill/dot/label per entry"

key-files:
  created:
    - react-newsletter/src/data/editions/january-2026.js
    - react-newsletter/src/data/index.js
    - react-newsletter/src/lib/cn.js
    - react-newsletter/src/utils/colorClasses.js
  modified:
    - react-newsletter/src/index.css
    - react-newsletter/package.json
    - react-newsletter/package-lock.json
    - react-newsletter/index.html
    - react-newsletter/src/main.jsx
    - .gitignore

key-decisions:
  - "tailwind-merge v3 required (not v2) for Tailwind v4 CSS variable resolution compatibility"
  - "framer-motion moved to dependencies — it is a runtime animation dependency, not dev-only"
  - "Manrope loaded via @fontsource-variable/manrope — eliminates CDN dependency, enables variable weight axis"
  - "src/lib/cn.js path required .gitignore negation rule — Python lib/ ignore rule was blocking it"

patterns-established:
  - "Edition module: export default { slug, month, year, issue, coverImage, articles }; export const categories"
  - "Registry: import editions, expose allEditions, latestEdition, getEdition(slug)"
  - "Tailwind class tokens: bg-page-bg, text-text, text-text-2, text-text-3, bg-accent, text-accent, bg-footer-bg, etc."
  - "Category color tokens: accent/sky/violet/pink/emerald (not blue/purple/green)"

requirements-completed: [FOUND-01, FOUND-02, FOUND-03, FOUND-04]

# Metrics
duration: 15min
completed: 2026-03-31
---

# Phase 1 Plan 1: Foundation — Packages, CSS Tokens, Data Model Summary

**Semantic light-theme token system, self-hosted Manrope Variable font, per-edition data model, and cn/colorClasses utilities installed and ready for all subsequent component work**

## Performance

- **Duration:** ~15 min
- **Started:** 2026-03-31T17:20:00Z
- **Completed:** 2026-03-31T17:36:00Z
- **Tasks:** 3
- **Files modified:** 10

## Accomplishments
- Replaced all 14 dark-themed CSS variables with 20 semantic light-theme tokens per UI-SPEC color table
- Moved framer-motion to dependencies, installed 4 new packages (Fontsource, clsx, tailwind-merge v3, react-intersection-observer), removed Google Fonts CDN
- Migrated January 2026 edition data (9 articles) to per-edition module pattern with edition registry

## Task Commits

Each task was committed atomically:

1. **Task 1: Install packages, fix framer-motion, set up font and entry files** - `a134a78` (chore)
2. **Task 2: Replace CSS tokens and create index.css with semantic light theme** - `ccfe4ce` (feat)
3. **Task 3: Migrate data model to per-edition modules and create utilities** - `4be514b` (feat)

## Files Created/Modified
- `react-newsletter/src/index.css` - Full rewrite: 20 semantic light-theme tokens, Manrope Variable font stack, typography plugin, TOC scroll-margin, Firefox frosted-glass fallback
- `react-newsletter/package.json` - framer-motion moved to deps; @fontsource-variable/manrope, clsx, tailwind-merge@3, react-intersection-observer added to deps; @tailwindcss/typography added to devDeps
- `react-newsletter/index.html` - Google Fonts CDN preconnect and stylesheet links removed
- `react-newsletter/src/main.jsx` - @fontsource-variable/manrope added as first import
- `react-newsletter/src/data/editions/january-2026.js` - Created: 9 articles migrated verbatim, categories with updated color tokens (sky/violet/emerald)
- `react-newsletter/src/data/index.js` - Created: edition registry with allEditions, latestEdition, getEdition, categories
- `react-newsletter/src/lib/cn.js` - Created: clsx + tailwind-merge cn() utility
- `react-newsletter/src/utils/colorClasses.js` - Created: 5-category color map with pill/dot/label
- `.gitignore` - Added negation rule to allow react-newsletter/src/lib/ (Python lib/ rule was too broad)

## Decisions Made
- tailwind-merge v3 installed (not v2) — Tailwind v4 changed CSS variable format; v2 silently breaks class deduplication
- framer-motion moved from devDependencies to dependencies — it is imported in page components at runtime
- Manrope loaded via @fontsource-variable/manrope — eliminates CDN network dependency, variable weight font (300-800 single file)
- data/index.js uses named import of categories from january-2026.js rather than accessing .categories on the default export — categories is a separate named export, not a property on the default object

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Fixed .gitignore blocking src/lib/ directory**
- **Found during:** Task 3 (creating src/lib/cn.js)
- **Issue:** Root .gitignore has `lib/` entry (Python packaging convention) which matched react-newsletter/src/lib/ — git refused to add cn.js
- **Fix:** Added negation rules `!react-newsletter/src/lib/` and `!react-newsletter/src/lib/**` to .gitignore
- **Files modified:** .gitignore
- **Verification:** git add succeeded after change; Task 3 commit completed
- **Committed in:** 4be514b (Task 3 commit)

---

**Total deviations:** 1 auto-fixed (1 blocking)
**Impact on plan:** Necessary fix — src/lib/cn.js is a required artifact per plan spec. No scope creep.

## Issues Encountered
- npm install framer-motion --save added it to dependencies but did NOT automatically remove it from devDependencies (npm behavior). Manually edited package.json to remove from devDependencies, then ran npm install to sync.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- All color tokens are in place — component work can reference bg-page-bg, text-accent, bg-footer-bg, etc.
- Edition data model is live — components import from src/data/index.js for latestEdition and allEditions
- cn() utility ready for component JSX class merging
- colorClasses utility ready for CategoryPill and card components
- npm run build passes cleanly — no regressions

## Self-Check: PASSED

All created files verified to exist on disk. All task commits (a134a78, ccfe4ce, 4be514b) confirmed present in git log.

---
*Phase: 01-full-build*
*Completed: 2026-03-31*
