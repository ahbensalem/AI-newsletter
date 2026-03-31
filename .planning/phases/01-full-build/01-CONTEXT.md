# Phase 1: Full Build - Context

**Gathered:** 2026-03-31
**Status:** Ready for planning

<domain>
## Phase Boundary

Complete editorial redesign of The Gradient newsletter app. Deliver the design system (color tokens, typography, spacing), all shared components (navbar, footer, cards), and all three pages (home, edition, archive) with the sticky sidebar TOC. Desktop-first, responsive layout must not break on mobile/tablet but mobile-specific components (hamburger nav, TOC collapse) are Phase 2.

</domain>

<decisions>
## Implementation Decisions

### Color Palette
- **D-01:** Charcoal + Electric palette. Primary: `#EA580C` (orange-600), Accent: `#0EA5E9` (sky-500), Dark/headings: `#1C1917` (stone-900), Body text: `#57534E` (stone-600), Light bg: `#FAFAF9` (stone-50), Borders: `#D6D3D1` (stone-300)
- **D-02:** Light overall theme with white/near-white backgrounds. Alternating white and stone-50 sections for visual rhythm. Dark footer.
- **D-03:** NOT purple/blue — user explicitly wants to avoid Claude/corporate AI cliché

### Home Page
- **D-04:** Hero section uses featured overlay card — large image with gradient overlay from transparent to near-black, white text on top. 2 secondary side-by-side cards below the hero.
- **D-05:** Below hero: 3-column card grid showing recent articles across all editions
- **D-06:** Newsletter signup placeholder section (visual only, not functional)

### Edition Page
- **D-07:** Full articles displayed inline in sequence on one page (readx article page style). No accordion, no separate article detail pages.
- **D-08:** Sticky sidebar TOC on the right with article titles grouped/tagged by category. Scroll-spy highlights the currently visible article.
- **D-09:** Two-column layout: main content (wider) + sidebar TOC (narrower, sticky)
- **D-10:** Each article section includes: title, category badge, reading time, image (if exists), full body paragraphs, source links

### Card & Visual Style
- **D-11:** Claude's Discretion — follow readx patterns: 24px border-radius, card borders, hover lift (translateY -6px + shadow), generous whitespace (100px section padding, 64px gaps). Adapt to charcoal+electric palette.

### Data Structure
- **D-12:** Migrate flat `data.js` to per-edition module files (e.g., `data/editions/january-2026.js`) with a central registry. Adding a new edition = adding one file + one registry entry.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Design Reference
- `readx-template.webflow.io` — Primary visual reference site. Match structure/spacing patterns but with charcoal+electric palette, not readx blue.

### Codebase Context
- `.planning/codebase/ARCHITECTURE.md` — Current app architecture (2-page SPA, flat data.js)
- `.planning/codebase/CONVENTIONS.md` — Code style (PascalCase components, functional-only, double quotes, 2-space indent)
- `.planning/codebase/STRUCTURE.md` — File layout (src/pages/, src/components/ empty, src/data.js)
- `.planning/codebase/CONCERNS.md` — Known issues (12.7MB images, framer-motion in devDeps)

### Research
- `.planning/research/STACK.md` — Stack additions: clsx, tailwind-merge, @fontsource/manrope, react-intersection-observer
- `.planning/research/ARCHITECTURE.md` — Per-edition data model, routing strategy, useScrollSpy hook pattern
- `.planning/research/PITFALLS.md` — Tailwind v4 @theme traps, Firefox backdrop-filter bug, font loading
- `.planning/research/SUMMARY.md` — Synthesized findings

### Project
- `.planning/PROJECT.md` — Project vision and requirements
- `.planning/REQUIREMENTS.md` — 22 requirements mapped to this phase

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/data.js` — Current article/category/edition data. Will be migrated to per-edition modules but data shape (articles array with id, category, title, excerpt, body[], sources[]) is good.
- `src/pages/HomePage.jsx` — Contains inline sub-components (Navbar, HeroSection, CategorySection, ArticleCard, Footer) that will be extracted to shared components
- `src/pages/ArticlePage.jsx` — Article detail rendering patterns (body paragraphs, source links, image gallery)
- Color utility functions (`getCatColor`, `getCatName`, `CategoryPill`) — reusable pattern for category badges

### Established Patterns
- Functional components only, `export default function` for pages
- Framer Motion `motion.div` with `initial/whileInView` for scroll-reveal animations
- Tailwind CSS utility classes exclusively (no CSS modules, no styled-components)
- Section separator comments: `/* ═══════════════ Section Name ═══════════════ */`
- Lucide React for icons

### Integration Points
- `src/App.jsx` — Route definitions. Will add `/archive` and `/edition/:slug` routes
- `src/main.jsx` — BrowserRouter provider wraps App
- `src/index.css` — Tailwind `@theme` block for color tokens. Will be completely rewritten with new palette
- `src/components/` — Currently empty. This is where shared components go.

</code_context>

<specifics>
## Specific Ideas

- User wants the edition page to feel like the readx article page — full articles in sequence with sidebar navigation
- The "gradient" overlay on hero cards should use the new charcoal colors, not readx blue
- Category badges should be color-coded (existing pattern has accent/blue/green/purple/pink — remap to new palette)
- Manrope font from research recommendation (same as readx, clean geometric sans-serif)
- Frosted glass navbar effect (backdrop-blur + semi-transparent background)

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 01-full-build*
*Context gathered: 2026-03-31*
