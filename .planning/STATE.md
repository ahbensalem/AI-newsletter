# Project State: The Gradient — Newsletter Redesign

**Last updated:** 2026-03-31
**Status:** Planning complete — ready to begin Phase 1

---

## Project Reference

**Core value:** Each monthly edition is beautifully browsable with clickable sub-articles and a sticky sidebar TOC — readers can effortlessly navigate between articles within any month

**Current focus:** Phase 1 — Full Build

---

## Current Position

**Phase:** 1 — Full Build
**Plan:** None started
**Status:** Not started

**Progress:**
```
Phase 1 [          ] 0%
Phase 2 [          ] 0%
Overall [          ] 0%
```

---

## Performance Metrics

| Metric | Value |
|--------|-------|
| Phases total | 2 |
| Phases complete | 0 |
| Plans total | 0 (TBD at planning) |
| Plans complete | 0 |
| Requirements mapped | 24/24 |

---

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

### Critical Implementation Notes

- **framer-motion**: Currently in devDependencies — must be moved to dependencies in Phase 1 (FOUND-04)
- **Tailwind tokens**: ALL dark-named CSS variables must be renamed semantically (`--color-bg` → `--color-page-bg`) before any component work
- **Sticky TOC**: Parent grid must have NO `overflow: hidden` — use CSS Grid with `align-self: start` on the sidebar grid cell
- **scroll-spy rootMargin**: Use `rootMargin: "-80px 0px -85% 0px"` — 80px offset for navbar height
- **Firefox**: Test `backdrop-filter` + `position: sticky` combo; add `@supports` fallback

### Todos

- [ ] Decide mobile TOC pattern (drawer vs. toggle button vs. off-canvas) — resolve in Phase 1 or Phase 2 planning
- [ ] Verify `@tailwindcss/typography` exact latest version during Phase 1 install (npm returned 403 during research; `^0.5.x` is confirmed stable line)
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
