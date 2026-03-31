# The Gradient — Newsletter Redesign

## What This Is

A modern, eye-catching AI newsletter web app built with React. "The Gradient" curates monthly AI news across categories (Infrastructure, Robotics, Dev Tools, Creative AI, Industry) and presents them in a visually stunning editorial format. The redesign transforms the current dark-themed React app into a clean, readx-inspired design with its own unique identity.

## Core Value

Each monthly edition is beautifully browsable with clickable sub-articles and a sticky sidebar TOC — readers can effortlessly navigate between articles within any month.

## Requirements

### Validated

- ✓ Article data model with categories, excerpts, body, sources — existing (`data.js`)
- ✓ Client-side routing between home and article detail — existing (React Router v7)
- ✓ Category system with 5 AI-focused categories — existing
- ✓ Scroll animations with Framer Motion — existing
- ✓ Tailwind CSS styling — existing

### Active

- [ ] Redesign to modern, readx-inspired editorial aesthetic (NOT purple/blue — fresh palette)
- [ ] Home page with hero section, featured articles, newsletter signup area
- [ ] Monthly edition pages with all articles and sticky sidebar table of contents
- [ ] Clickable sub-articles within each monthly edition (scroll-to or anchor links)
- [ ] Archive/listing page to browse all past monthly editions
- [ ] Frosted glass navbar with smooth navigation
- [ ] Card-based article presentation with hover interactions
- [ ] Responsive design (mobile, tablet, desktop)
- [ ] Dark footer with newsletter branding
- [ ] Scalable month/edition data structure (easy to add new months)
- [ ] Category filtering or visual grouping within editions

### Out of Scope

- Testing (unit, integration, e2e) — user explicitly deferred
- Python/Streamlit app changes — React-only focus
- Backend API / CMS — content stays hardcoded in JS for now
- Authentication / user accounts
- Newsletter email subscription (functional) — visual placeholder only
- Search functionality

## Context

- **Brownfield:** Existing React 19 + Vite + Tailwind CSS 4 app with 2 pages (Home, Article)
- **Reference site:** readx-template.webflow.io — clean editorial aesthetic with Manrope font, generous whitespace, rounded cards, frosted navbar, alternating section backgrounds
- **Design direction:** Inspired by readx but with own personality. Avoid purple/blue (too Claude-like). Fresh, modern, techy color palette that fits an AI newsletter
- **Content:** Currently single-edition (January 2026). Data model needs to support multiple editions
- **Legacy:** Python/Streamlit version exists in parent directory — not being modified
- **Current state:** Dark-themed, 2 pages, articles in flat data.js, no components folder content, no archive page

## Constraints

- **Tech stack**: React 19, Vite, Tailwind CSS 4, React Router — keep existing stack
- **No testing**: User explicitly wants UI focus, no test infrastructure
- **Static content**: No backend — all content in JS data files
- **Color palette**: Must NOT be purple/blue (avoid Claude/corporate AI cliché)

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Readx-inspired, not pixel-copy | User wants own personality, readx as structural reference | — Pending |
| Sticky sidebar TOC for month pages | User wants clickable sub-articles within editions | — Pending |
| No purple/blue palette | User finds it repetitive (Claude-like) | — Pending |
| Skip testing entirely | UI is the main feature, testing deferred | — Pending |
| React-only, ignore Python app | Focused redesign scope | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd:transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd:complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-03-31 after initialization*
