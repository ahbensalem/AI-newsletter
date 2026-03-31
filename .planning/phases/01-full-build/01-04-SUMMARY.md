---
phase: 01-full-build
plan: 04
subsystem: ui
tags: [react, framer-motion, react-intersection-observer, tailwind, sticky-sidebar, scroll-spy]

# Dependency graph
requires:
  - phase: 01-01
    provides: CSS tokens, cn() utility, data modules
  - phase: 01-02
    provides: Navbar, Footer, CategoryPill, colorClasses utility

provides:
  - useScrollSpy hook with IntersectionObserver rootMargin -80px 0px -85% 0px
  - SidebarTOC sticky right sidebar with imperative scrollIntoView
  - ArticleSection full article block with scroll-reveal animations
  - EditionPage two-column layout with sticky TOC and scroll-spy

affects: [01-05, 01-06, homepage, archive]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "useScrollSpy: named export hook wrapping react-intersection-observer useInView"
    - "Imperative scrollIntoView for TOC clicks (not hash URLs)"
    - "CSS Grid lg:grid-cols-[1fr_260px] with self-start on sidebar for sticky"
    - "scroll-margin-top: 80px via inline style on section elements"

key-files:
  created:
    - react-newsletter/src/hooks/useScrollSpy.js
    - react-newsletter/src/components/edition/SidebarTOC.jsx
    - react-newsletter/src/components/article/ArticleSection.jsx
  modified:
    - react-newsletter/src/pages/EditionPage.jsx

key-decisions:
  - "scrollIntoView imperative scroll confirmed over hash URLs to avoid React Router scroll restoration conflicts"
  - "rootMargin -80px 0px -85% 0px: 80px navbar offset, 85% bottom exclusion so only top 15% of viewport triggers"
  - "scroll-margin-top: 80px via inline style (not Tailwind) on section elements for TOC click accuracy"

patterns-established:
  - "useScrollSpy pattern: hook returns ref, caller attaches to section element"
  - "TOC entries: <button> elements not <a> anchors — imperative scroll only"
  - "Edition layout: NO overflow-hidden/overflow-auto on any ancestor of sticky sidebar"

requirements-completed: [PAGE-02, PAGE-03, PAGE-04, CONT-02]

# Metrics
duration: 15min
completed: 2026-03-31
---

# Phase 01 Plan 04: Edition Page Summary

**Edition page with two-column sticky TOC layout, scroll-spy via IntersectionObserver, and full inline ArticleSection rendering for all monthly articles**

## Performance

- **Duration:** 15 min
- **Started:** 2026-03-31T17:30:00Z
- **Completed:** 2026-03-31T17:45:00Z
- **Tasks:** 2
- **Files modified:** 4

## Accomplishments
- useScrollSpy hook using react-intersection-observer with exact rootMargin `-80px 0px -85% 0px` for scroll detection
- SidebarTOC with imperative `scrollIntoView({ behavior: "smooth", block: "start" })` on button click, active entry highlighted with `border-accent text-accent font-extrabold`
- ArticleSection renders full article content: CategoryPill, read time, image, body paragraphs, optional gallery, source links with ExternalLink icon
- EditionPage replaces placeholder with `grid lg:grid-cols-[1fr_260px]` layout, sidebar `self-start sticky top-[80px]`, hidden below lg, error state for invalid slugs

## Task Commits

Each task was committed atomically:

1. **Task 1: Create useScrollSpy hook and SidebarTOC component** - `e11c435` (feat)
2. **Task 2: Create ArticleSection component and EditionPage layout** - `43edfc0` (feat)

## Files Created/Modified
- `react-newsletter/src/hooks/useScrollSpy.js` - Named export hook using react-intersection-observer for TOC scroll-spy
- `react-newsletter/src/components/edition/SidebarTOC.jsx` - Sticky TOC with button entries and active state
- `react-newsletter/src/components/article/ArticleSection.jsx` - Full article block with scroll-reveal, gallery, sources
- `react-newsletter/src/pages/EditionPage.jsx` - Edition page replacing placeholder with full two-column layout

## Decisions Made
- Used inline `style={{ scrollMarginTop: "80px" }}` on section elements — Tailwind's `scroll-mt-[80px]` could also work but inline style is clearer for this exact use case
- Comment in EditionPage notes the NO overflow constraint — the word "overflow" appears in the comment but no overflow utility classes are applied

## Deviations from Plan
None - plan executed exactly as written.

## Issues Encountered
None.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Edition page is fully functional and renders at `/edition/january-2026`
- All articles display with scroll-spy TOC
- Ready for Plan 05 (Home Page) and Plan 06 (Archive Page)
- TOC mobile drawer pattern (Plan 02 decision) not yet implemented — TOC hidden on mobile as planned

---
*Phase: 01-full-build*
*Completed: 2026-03-31*
