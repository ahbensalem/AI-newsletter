# Project Research Summary

**Project:** The Gradient — AI Newsletter UI Redesign
**Domain:** React editorial newsletter SPA (dark-to-light theme migration, multi-edition)
**Researched:** 2026-03-31
**Confidence:** HIGH

## Executive Summary

The Gradient is a curated AI newsletter web app being redesigned from a dark-themed single-edition SPA into a premium, light-themed, multi-edition editorial platform. Experts in this domain (Ghost, Substack, Smashing Magazine) consistently deliver: a frosted-glass sticky navbar, hero section on the home page, card-grid article browsing, and — for long-form edition pages — a sticky sidebar Table of Contents with scroll-spy as the defining UX feature. The recommended approach is to build this as a clean React SPA with Tailwind CSS v4 CSS-first theming, static data imports per edition, and no backend or global state management. The full stack is already installed; the only additions needed are four small packages for fonts, class merging, scroll-spy, and article typography.

The most important architectural decision is the data model: the current flat `data.js` file must be migrated to a per-edition module pattern (`src/data/editions/`) before any new UI is built. Every other feature — the archive page, the edition routing, the TOC — depends on edition-scoped data. This refactor costs one sprint but is non-negotiable; attempting to bolt multi-edition support onto the flat-file structure creates permanent tech debt. A dynamic route (`/edition/:slug`) driven by a data registry replaces hardcoded routes, so adding a new month is a matter of creating one file.

The highest risks are: (1) dark-named CSS variables silently remaining in the token layer after the light theme migration, causing permanent naming confusion; (2) the sticky TOC sidebar failing silently because a parent container has `overflow: hidden`, which is invisible until scroll-tested; and (3) the `framer-motion` package being miscategorized as a devDependency, which breaks production builds in strict CI environments. All three are preventable in Phase 1 setup before any visual work begins.

---

## Key Findings

### Recommended Stack

The existing stack (React 19, Vite 8, Tailwind CSS v4, React Router v7, Framer Motion v12, Lucide React) is production-ready and requires no changes. Four additions are recommended: `@fontsource-variable/manrope` to self-host the editorial font and eliminate the Google Fonts render-blocking request; `clsx` + `tailwind-merge` for safe conditional class composition in components; `react-intersection-observer` as the scroll-spy engine for the sticky TOC; and `@tailwindcss/typography` (dev dependency) for the article body `prose` classes. Total JS bundle addition is negligible. CSS scroll-behavior handles smooth scrolling to TOC sections natively — no scroll library is needed.

See full details: `.planning/research/STACK.md`

**Core technologies:**
- React 19 + Vite 8: UI framework and build tool — already installed, no changes
- Tailwind CSS v4 (`@theme` block in CSS): design token system — CSS-first, no `tailwind.config.js`
- React Router v7 (`/edition/:slug`): dynamic edition routing — one route covers all editions
- Framer Motion v12: card hover lift + scroll-reveal animations — move to `dependencies` (currently miscategorized)
- `@fontsource-variable/manrope`: self-hosted variable font (wt 300–800) — eliminates Google Fonts CDN dependency
- `react-intersection-observer` v10: scroll-spy for sticky TOC — pools observers, O(1) per scroll frame
- `clsx` + `tailwind-merge` v3: conditional Tailwind class merging — `tailwind-merge` v3 required for Tailwind v4 compatibility
- `@tailwindcss/typography`: `prose` classes for article body text — activated via `@plugin` directive in CSS

### Expected Features

See full details: `.planning/research/FEATURES.md`

**Must have (table stakes — v1 this milestone):**
- Frosted-glass sticky navbar — users notice its absence immediately on any premium editorial site
- Home page: hero section + featured article highlight + article card grid — universal browsing pattern
- Multi-edition data model — unlocks archive, routing, and all edition-specific features
- Archive page — readers expect to browse past issues; its absence signals an unfinished product
- Monthly edition page with all articles, category-grouped, readable typography
- Sticky sidebar TOC with scroll-spy — the defining UX feature of this redesign; non-negotiable
- Smooth TOC scroll-to-section — pairs with sticky TOC
- Article cards with category badge, image, excerpt, read-time (data model already has `readTime`)
- Card hover interactions (lift + shadow) — low effort, high perceived quality signal
- Responsive design across breakpoints — TOC collapses on mobile
- Dark footer with branding

**Should have (competitive differentiators — v1.x if capacity allows):**
- Reading progress indicator — low complexity, adds perceived editorial quality
- Category filter tabs on edition page — useful once editions have 8+ articles
- Edition "cover" editorial note slot — requires editorial decision on format

**Defer (v2+):**
- Functional email subscription (requires backend, GDPR compliance)
- Full-text search (requires content index — Fuse.js or Algolia)
- Dark mode (requires full design-token audit; doubles QA surface)
- Comments / reader reactions (requires auth and moderation)
- Social sharing beyond copy-link

### Architecture Approach

The app follows a three-layer architecture: a route layer (three pages: HomePage, EditionPage, ArchivePage), a shared component library (Navbar, Footer, ArticleCard, EditionCard, CategoryBadge, SidebarTOC, ArticleSection), and a static data layer (per-edition JS modules aggregated through a registry index). No global state is needed — the only runtime state is the active TOC entry, which lives in a `useScrollSpy` hook scoped to EditionPage. State management is React local state; no Context, Redux, or Zustand is justified for this read-only display app.

See full details: `.planning/research/ARCHITECTURE.md`

**Major components:**
1. `data/index.js` (registry) + `data/editions/*.js` — single source of truth; pages import from registry only
2. `Navbar` + `Footer` — stateless layout shells; frosted glass via Tailwind's `backdrop-blur-md bg-white/70`
3. `ArticleCard` + `CategoryBadge` — reused across HomePage and EditionPage; color from `utils/colorClasses.js`
4. `SidebarTOC` — sticky sidebar driven by `useScrollSpy` hook; `align-self: start` on grid cell is required
5. `ArticleSection` — full article block within EditionPage; provides the anchor `id` that the TOC links to
6. `EditionCard` — summary card for ArchivePage; reuse the cover component as archive thumbnail
7. `useScrollSpy` hook — encapsulates IntersectionObserver logic; `rootMargin` tuned to navbar height

**Routing:**
```
/                         → HomePage
/archive                  → ArchivePage
/edition/:slug            → EditionPage
/edition/:slug#article-id → EditionPage scrolled to section
```

**Build order (dependency-driven):**
Data layer → Layout shells → Atomic components → `useScrollSpy` hook → SidebarTOC → ArticleSection → EditionPage → ArchivePage → HomePage

### Critical Pitfalls

See full details: `.planning/research/PITFALLS.md`

1. **Dark CSS tokens with light values** — rename ALL tokens semantically (`--color-bg` → `--color-page-bg`) before touching any component; do this in Phase 1 before any visual work
2. **`data.js` single-file architecture blocks multi-edition** — migrate to `src/data/editions/` per-edition module pattern in Phase 1; every downstream feature depends on this
3. **`overflow: hidden` on TOC parent breaks `position: sticky`** — two-column layout must use CSS Grid with no overflow constraints on the parent; set `align-self: start` on the sidebar grid cell; verify with DevTools "Sticky" badge
4. **`framer-motion` in `devDependencies`** — move to `dependencies` immediately with `npm install framer-motion --save`; CI pipelines running `npm install --production` will fail builds
5. **Tailwind config in JS instead of CSS** — all tokens belong in `@theme {}` in `index.css`; never create `tailwind.config.js`; v4 silently ignores it
6. **Firefox `position: sticky` + `backdrop-filter` bug** — avoid `overflow: hidden` + `border-radius` on navbar ancestors; add `@supports (backdrop-filter: blur(1px))` fallback; test Firefox during Phase 2
7. **Scroll-spy `rootMargin` misconfiguration** — use `rootMargin: "-80px 0px -85% 0px"` (80px = navbar height); this value cannot be finalized until navbar height is known from Phase 2

---

## Implications for Roadmap

### Phase 1: Foundation — Data Model, Design Tokens, Project Setup

**Rationale:** Everything else depends on having the right data structure and CSS token system in place first. Building UI on top of the wrong data shape or wrong token names requires rewrites. This phase has no visual output but unblocks all subsequent phases.

**Delivers:**
- Migrated data layer: `src/data/index.js` registry + `src/data/editions/january-2026.js` (migrated from `data.js`)
- Semantic CSS token system in `@theme {}`: all dark-named variables replaced with semantic names, Manrope variable font imported via Fontsource, oklch brand color palette locked (warm orange/amber + neutral grays — no blue/teal/purple family)
- `framer-motion` moved to `dependencies`
- `src/lib/cn.js` utility (`clsx` + `tailwind-merge`)
- `src/utils/colorClasses.js` — single source of truth for category color mapping
- Global resets: `scroll-behavior: smooth`, `scroll-margin-top` for anchor offset

**Addresses:** Data model (FEATURES.md), color token naming (PITFALLS 1, 11), font loading (PITFALLS 7), framer-motion miscategorization (PITFALL 10), Tailwind v4 CSS-first rule (PITFALL 2)

**Avoids:** Building UI on bad foundations that require rewrites in Phase 3

**Research flag:** No deeper research needed — patterns are well-documented and verified.

---

### Phase 2: Shared Components + Home Page

**Rationale:** Shared components (Navbar, Footer, ArticleCard, CategoryBadge) are consumed by all three pages. Building them before pages prevents duplicate implementation and establishes the visual design language. The home page is the lowest-complexity page and serves as the first end-to-end visual proof of the new design.

**Delivers:**
- `Navbar` — frosted glass (`backdrop-blur-md bg-white/70 sticky top-0`); Firefox `@supports` fallback; `will-change: transform` only during scroll; blur radius 8–12px
- `Footer` — dark brand footer with newsletter signup placeholder
- `ArticleCard` — card with image, title, excerpt, category badge, read-time, card hover lift (`whileHover={{ y: -4 }}` using `opacity`/`scale`/`y` only — no layout-affecting properties)
- `CategoryBadge` — color-coded pill from `colorClasses.js`
- `EditionCard` — month summary card for archive listing
- `HomePage` — hero section, featured article highlight, article card grid; categories derived from data (no hardcoded category list)
- Image audit: remove unused `llama4scout.png` (8.7MB) and `soarxiz.png` (2.1MB); convert remaining card images to WebP

**Uses:** Manrope variable font, Framer Motion `whileHover`, Tailwind `backdrop-blur-md`, brand color tokens from Phase 1

**Avoids:** Framer Motion animating `height`/`width`/`backgroundColor` (PITFALL 4); Firefox sticky + backdrop-filter bug (PITFALL 3); blue/purple color drift (PITFALL 11); hardcoded category list (PITFALL 15)

**Research flag:** No deeper research needed — component patterns are standard, verified.

---

### Phase 3: Edition Page + Archive Page (Core UX)

**Rationale:** The EditionPage is the most complex deliverable and has the most dependencies (SidebarTOC, useScrollSpy, ArticleSection, routing). It is built last among pages so all shared components are already stable. The ArchivePage is simpler and can be built in parallel. This phase delivers the defining UX feature of the redesign.

**Delivers:**
- `useScrollSpy` hook — IntersectionObserver with `rootMargin` calibrated to Phase 2 navbar height
- `SidebarTOC` — sticky sidebar (`align-self: start` on grid cell; parent grid has no `overflow` constraints); category-colored TOC entries; active entry highlighted
- `ArticleSection` — full article block with anchor `id`, category badge, body text with `prose` classes
- `EditionPage` — two-column grid layout (`grid-cols-[240px_1fr]`); articles + sticky TOC; TOC clicks use imperative `element.scrollIntoView({ behavior: 'smooth' })`, not hash URL changes
- `ArchivePage` — grid of all editions using `EditionCard`
- React Router route wiring: `/archive`, `/edition/:slug`

**Avoids:** `overflow: hidden` on TOC parent (PITFALL 5); incorrect `rootMargin` (PITFALL 9); React Router scroll restoration conflict (PITFALL 13); sticky-in-grid failure without `align-self: start` (PITFALL 12)

**Research flag:** Sticky TOC scroll-spy `rootMargin` value must be validated against the actual rendered navbar height from Phase 2 — this is a concrete cross-phase dependency, not a research gap.

---

### Phase 4: Polish, Performance, Responsive QA

**Rationale:** Performance optimization and cross-breakpoint QA are isolated to a final phase so they do not block feature delivery. Mobile TOC collapse, image lazy loading, and Lighthouse audit are here.

**Delivers:**
- Mobile responsive: TOC collapses to a drawer/toggle on mobile (`lg:hidden` sticky sidebar; mobile TOC as expandable panel)
- `LazyMotion` with `domAnimations` feature set — reduces Framer Motion bundle from ~34KB to ~6KB
- `<img loading="lazy">` on all below-the-fold card images; `loading="eager"` on hero featured image only
- `vite-plugin-image-optimizer` configured for WebP output
- Reading progress indicator (v1.x feature — add if capacity allows in this phase)
- Cross-browser QA: Firefox navbar blur, sticky sidebar, anchor scroll behavior
- Lighthouse audit — LCP target under 2.5s

**Research flag:** No deeper research needed — established performance patterns.

---

### Phase Ordering Rationale

- **Data before UI:** The multi-edition data model is a prerequisite for every feature. No edition-aware component can be correctly built until `data/index.js` and the per-edition module shape are finalized.
- **Design tokens before components:** CSS token renaming must happen before component construction or every component inherits semantically incorrect variable names.
- **Shared components before pages:** Pages compose components. Building components first prevents rework when a page discovers a component needs a different interface.
- **EditionPage last among pages:** It has the most component dependencies (SidebarTOC, ArticleSection, useScrollSpy). ArchivePage and HomePage can be built earlier.
- **Performance and QA last:** Premature optimization distracts from feature delivery. Isolating it to a final phase keeps scope clean.

---

### Research Flags

Phases needing deeper research during planning:
- **Phase 3 (EditionPage):** The `rootMargin` value for scroll-spy is a concrete implementation detail that depends on the rendered navbar height from Phase 2. Not a research gap — just a cross-phase measurement dependency. Flag this handoff explicitly in the roadmap.

Phases with standard, well-documented patterns (skip research-phase):
- **Phase 1:** Tailwind v4 CSS-first theming and per-edition data module patterns are fully documented.
- **Phase 2:** Frosted glass navbar, Framer Motion card hover, and Fontsource font integration are verified against official docs.
- **Phase 4:** Image optimization with Vite and Framer Motion `LazyMotion` are standard patterns.

---

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | All core packages verified against official docs or npm; version numbers confirmed as current |
| Features | MEDIUM-HIGH | Drawn from Ghost, Substack, Smashing Magazine analysis; React-specific details verified via CSS-Tricks and npm |
| Architecture | HIGH | Patterns verified via official React Router v7 docs, CSS-Tricks IntersectionObserver guide, Martin Fowler modularization article |
| Pitfalls | HIGH | Firefox sticky+backdrop bug, Tailwind v4 config model, IntersectionObserver rootMargin — all verified against official docs and direct codebase audit |

**Overall confidence:** HIGH

### Gaps to Address

- **`@tailwindcss/typography` exact latest version:** npm returned 403 during research; `^0.5.x` is the stable line with confirmed Tailwind v4 support via `@plugin` directive. Verify exact version during Phase 1 install.
- **Mobile TOC pattern:** The specific collapse pattern (drawer vs. toggle button vs. off-canvas) for the sticky TOC on mobile is a design decision not resolved by research. Decide during Phase 4 planning or Phase 2 component design.
- **`react-router-hash-link` vs. imperative `scrollIntoView`:** ARCHITECTURE.md recommends `react-router-hash-link`; PITFALLS.md recommends imperative `scrollIntoView` to avoid scroll restoration conflicts. The safer recommendation is imperative `scrollIntoView` — it avoids the React Router conflict entirely. Resolve this choice before Phase 3.

---

## Sources

### Primary (HIGH confidence)
- Tailwind CSS v4 official docs + upgrade guide — token system, backdrop-filter, oklch colors: https://tailwindcss.com/docs/upgrade-guide
- React Router v7 official docs — routing, ScrollRestoration: https://reactrouter.com/
- Motion (Framer Motion) official docs — animation API, LazyMotion: https://motion.dev/docs/react-upgrade-guide
- react-intersection-observer v10 — GitHub releases: https://github.com/thebuilder/react-intersection-observer/releases
- tailwind-merge v3 — GitHub releases (Tailwind v4 support): https://github.com/dcastil/tailwind-merge/releases
- Fontsource Manrope variable — official install guide: https://fontsource.org/fonts/manrope/install
- @tailwindcss/typography — GitHub README: https://github.com/tailwindlabs/tailwindcss-typography
- Project codebase audit — `.planning/codebase/CONCERNS.md` (direct inspection)

### Secondary (MEDIUM confidence)
- CSS-Tricks: Table of Contents with IntersectionObserver — https://css-tricks.com/table-of-contents-with-intersectionobserver/
- CSS-Tricks: Sticky TOC with scrolling active states — https://css-tricks.com/sticky-table-of-contents-with-scrolling-active-states/
- Readx template reference — direct inspection: https://readx-template.webflow.io/
- Josh W. Comeau: Frosted glass with backdrop-filter — https://www.joshwcomeau.com/css/backdrop-filter/
- Smashing Magazine: Newsletter archive UX — https://www.smashingmagazine.com/2010/05/website-archives-best-practices-and-showcase/
- Ghost vs Substack feature comparison — https://ghost.org/vs/substack/
- emgoto.com: React TOC guide — https://www.emgoto.com/react-table-of-contents/
- Martin Fowler: Modularizing React Applications — https://martinfowler.com/articles/modularizing-react-apps.html

### Tertiary (LOW confidence / inference)
- entrustechinc.com: AI brand web design trends 2026 — color palette direction: https://entrustechinc.com/top-ai-driven-website-design-trends-that-will-dominate-2026/

---
*Research completed: 2026-03-31*
*Ready for roadmap: yes*
