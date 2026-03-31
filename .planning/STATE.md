---
gsd_state_version: 1.0
milestone: v1.0
milestone_name: milestone
status: executing
last_updated: "2026-03-31T17:35:36.256Z"
progress:
  total_phases: 2
  completed_phases: 0
  total_plans: 6
  completed_plans: 5
  percent: 83
---

# Project State: The Gradient — Newsletter Redesign

**Last updated:** 2026-03-31
**Status:** Executing Phase 01

---

## Project Reference

**Core value:** Each monthly edition is beautifully browsable with clickable sub-articles and a sticky sidebar TOC — readers can effortlessly navigate between articles within any month

**Current focus:** Phase 01 — full-build

---

## Current Position

Phase: 01 (full-build) — EXECUTING
Plan: 4 of 6 (Plans 01, 02, and 03 complete)
**Phase:** 1 — Full Build
**Plan:** Plan 03 complete — moving to Plan 04
**Status:** Executing

**Progress:**

[████████░░] 83%

---

## Performance Metrics

| Metric | Value |
|--------|-------|
| Phases total | 2 |
| Phases complete | 0 |
| Plans total | 6 |
| Plans complete | 2 |
| Requirements mapped | 24/24 |

| Plan | Duration | Tasks | Files |
|------|----------|-------|-------|
| Phase 01-full-build P01 | 15min | 3 tasks | 10 files |
| Phase 01-full-build P02 | 10min | 2 tasks | 8 files |
| Phase 01-full-build P04 | 15min | 2 tasks | 4 files |
| Phase 01-full-build P03 | 18min | 1 tasks | 2 files |
| Phase 01-full-build P05 | 8min | 1 tasks | 1 files |

## Accumulated Context

### Key Decisions

| Decision | Rationale | Status |
|----------|-----------|--------|
| Readx-inspired, not pixel-copy | User wants own personality, readx as structural reference | Active |
| Sticky sidebar TOC for edition pages | User wants clickable sub-articles within editions | Active |
| No purple/blue palette — warm orange/amber + neutral grays | Avoids Claude/corporate AI cliché | Active |
| Skip testing entirely | UI is the main feature, testing deferred | Active |
| React-only, ignore Python app | Focused redesign scope | Active |
| Imperative `scrollIntoView` for TOC clicks (not hash URLs) | Avoids React Router scroll restoration conflicts | Active |
| Per-edition JS module pattern (`src/data/editions/`) | Prerequisite for archive, routing, and all multi-edition features | Active |
| `tailwind-merge` v3 required | Tailwind v4 compatibility — v2 silently breaks | Active |
| ArticleCard optional `editionSlug` prop | Flexible card linking — pages pass correct slug, falls back to / | Active |
| Placeholder pages for EditionPage and ArchivePage | Allow App.jsx import resolution before full implementation in later plans | Active |
| Legacy data.js acts as re-export bridge | Preserves ArticlePage backward compat while exposing new latestEdition/allEditions exports | Active |
| Featured hero card links to /edition/:slug | Edition page is the new canonical reading experience, not /article/:id | Active |

### Critical Implementation Notes

- **framer-motion**: DONE — moved to dependencies in Plan 01-01 (FOUND-04 complete)
- **Tailwind tokens**: DONE — all 14 dark variables replaced with 20 semantic light-theme tokens in Plan 01-01
- **Sticky TOC**: Parent grid must have NO `overflow: hidden` — use CSS Grid with `align-self: start` on the sidebar grid cell
- **scroll-spy rootMargin**: Use `rootMargin: "-80px 0px -85% 0px"` — 80px offset for navbar height
- **Firefox**: Test `backdrop-filter` + `position: sticky` combo; add `@supports` fallback

### Todos

- [ ] Decide mobile TOC pattern (drawer vs. toggle button vs. off-canvas) — resolve in Phase 1 or Phase 2 planning
- [x] Verify `@tailwindcss/typography` exact latest version during Phase 1 install — installed ^0.5.19 (Plan 01-01)
- [ ] Large images to remove: `llama4scout.png` (8.7MB), `soarxiz.png` (2.1MB)

### Blockers

None.

---

## Session Continuity

To resume work, run:

```

/gsd:plan-phase 1

```

Context files:

- `.planning/PROJECT.md` — project scope and decisions
- `.planning/REQUIREMENTS.md` — all v1 requirements with IDs
- `.planning/ROADMAP.md` — phase structure and success criteria
- `.planning/research/SUMMARY.md` — architecture, stack, and pitfalls
- `.planning/research/ARCHITECTURE.md` — component structure and routing
- `.planning/research/PITFALLS.md` — implementation traps to avoid
