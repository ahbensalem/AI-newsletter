---
phase: 01-full-build
plan: 03
subsystem: ui
tags: [react, framer-motion, tailwind, homepage, hero, editorial]

# Dependency graph
requires:
  - phase: 01-01
    provides: CSS design tokens, data module (src/data/index.js), Tailwind config
  - phase: 01-02
    provides: Navbar, Footer, ArticleCard, CategoryPill shared components

provides:
  - Complete HomePage.jsx with hero overlay card, secondary cards, 3-column article grid, newsletter signup
  - Legacy data.js bridge re-exporting from new data module (backward compat for ArticlePage)

affects: [01-04, 01-05, 01-06]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Hero overlay card: absolute positioned image + gradient-to-t from-stone-900/90 + white text"
    - "Scroll-reveal: whileInView with viewport={{ once: true }} for below-fold cards"
    - "Above-fold hero: animate (not whileInView)"
    - "Alternating section backgrounds: bg-page-bg and bg-section-alt"
    - "data.js bridge pattern: file re-exports new module for backward compat"

key-files:
  created:
    - react-newsletter/src/pages/HomePage.jsx
    - react-newsletter/src/data.js
  modified: []

key-decisions:
  - "Legacy data.js acts as a re-export bridge — preserves ArticlePage backward compat while exposing new latestEdition/allEditions exports"
  - "Hero above-fold uses animate; card grids use whileInView — consistent with UI-SPEC interaction contracts"
  - "Featured hero card links to /edition/:slug (not /article/:id) — edition-level navigation per new routing structure"

patterns-established:
  - "Section padding pattern: py-[100px] on every major section"
  - "Hero overlay: absolute inset-0 image + gradient-to-t + absolute bottom-0 content"
  - "Secondary card grid: grid-cols-1 sm:grid-cols-2 with h-[260px] lg:h-[300px]"

requirements-completed: [LAYOUT-02, LAYOUT-06, LAYOUT-07, LAYOUT-08, PAGE-01, RESP-01]

# Metrics
duration: 18min
completed: 2026-03-31
---

# Phase 01 Plan 03: Home Page Summary

**Editorial home page with featured overlay hero card, 3-column responsive article grid, and newsletter signup using light-theme tokens and Framer Motion scroll-reveal**

## Performance

- **Duration:** 18 min
- **Started:** 2026-03-31T17:35:00Z
- **Completed:** 2026-03-31T17:53:00Z
- **Tasks:** 1
- **Files modified:** 2

## Accomplishments

- Complete rewrite of HomePage.jsx with three editorial sections: HeroSection, RecentArticlesGrid, NewsletterSignup
- Hero section with featured overlay card (gradient + white text) and two secondary side-by-side image cards
- 3-column responsive grid (1/2/3 cols) using shared ArticleCard component with scroll-reveal animation
- Newsletter signup with Mail icon, "Stay ahead of the curve" copy, and "Subscribe Free" button (visual only)
- Alternating section backgrounds (bg-page-bg / bg-section-alt) per LAYOUT-06

## Task Commits

1. **Task 1: Build HeroSection with featured overlay card and secondary cards** - `fbc8fe1` (feat)

## Files Created/Modified

- `react-newsletter/src/pages/HomePage.jsx` - Complete rewrite: HeroSection, RecentArticlesGrid, NewsletterSignup, main HomePage export
- `react-newsletter/src/data.js` - Bridge file re-exporting from new data/index.js while providing legacy article/edition/categories exports

## Decisions Made

- Legacy `data.js` kept as a compatibility bridge rather than deleted — ArticlePage.jsx uses old-style imports and is not being rewritten in this plan; this avoids a breaking change without scope creep
- Featured hero card links to `/edition/${latestEdition.slug}` rather than `/article/:id` — edition page is the new canonical reading experience
- Secondary cards also link to edition anchor URLs (`/edition/:slug#articleId`) for consistent navigation

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Fixed data.js / data/index.js module collision**
- **Found during:** Task 1 (build verification)
- **Issue:** Both `src/data.js` and `src/data/index.js` existed. Vite resolved `../data` imports to `data.js` (file takes priority over directory), causing `latestEdition` and `allEditions` to be "not exported" build errors
- **Fix:** Updated `src/data.js` to re-export all new exports from `data/index.js` while also providing legacy `articles`, `categories`, `edition` shape for backward compat with `ArticlePage.jsx`
- **Files modified:** `react-newsletter/src/data.js`
- **Verification:** `npm run build` passes cleanly
- **Committed in:** `fbc8fe1` (same task commit)

---

**Total deviations:** 1 auto-fixed (1 blocking)
**Impact on plan:** Essential fix — build was failing. No scope creep. ArticlePage backward compat preserved.

## Issues Encountered

- Module resolution conflict between `src/data.js` and `src/data/` directory — Vite picks the file over the directory. Resolved by making data.js a bridge re-exporter.

## User Setup Required

None - no external service configuration required.

## Known Stubs

None — all three sections render real data from `latestEdition`. NewsletterSignup form is intentionally non-functional (visual placeholder per project spec).

## Next Phase Readiness

- HomePage is fully built and builds cleanly
- Plan 04 (EditionPage) can import shared components and data without issues
- Plan 05 (ArchivePage) has its placeholder in place from Plan 02
- ArticlePage.jsx (legacy) still works via data.js bridge

---
*Phase: 01-full-build*
*Completed: 2026-03-31*
