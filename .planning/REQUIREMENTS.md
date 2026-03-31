# Requirements: The Gradient — Newsletter Redesign

**Defined:** 2026-03-31
**Core Value:** Each monthly edition is beautifully browsable with clickable sub-articles and a sticky sidebar TOC

## v1 Requirements

Requirements for initial release. Each maps to roadmap phases.

### Foundation

- [x] **FOUND-01**: Multi-edition data model supports multiple months with per-edition files, easy to add new editions
- [x] **FOUND-02**: Semantic color token system in Tailwind v4 `@theme` with custom AI-tech palette (NOT purple/blue)
- [x] **FOUND-03**: Professional typography with Manrope font, clear heading hierarchy, readable body text (18px+)
- [x] **FOUND-04**: Framer Motion moved from devDependencies to dependencies

### Layout & Design

- [x] **LAYOUT-01**: Frosted glass sticky navbar with blur effect and smooth navigation links
- [ ] **LAYOUT-02**: Modern editorial home page with hero section and featured article highlight
- [x] **LAYOUT-03**: Card-based article presentation with rounded corners (24px), borders, and content padding
- [x] **LAYOUT-04**: Card hover lift animations (translateY + shadow on hover)
- [x] **LAYOUT-05**: Dark branded footer with newsletter info, navigation links, and social icons
- [ ] **LAYOUT-06**: Alternating section backgrounds (white / light grey) for visual rhythm
- [ ] **LAYOUT-07**: Generous whitespace — 100px section padding, 64px title gaps, 40px card gaps
- [ ] **LAYOUT-08**: Scroll-reveal animations on cards and sections using Framer Motion

### Content Pages

- [ ] **PAGE-01**: Home page displays featured articles, recent edition highlights, and newsletter signup placeholder
- [ ] **PAGE-02**: Edition page shows all articles for a month with two-column layout (content + sidebar)
- [ ] **PAGE-03**: Sticky sidebar table of contents with scroll-spy highlighting current article
- [ ] **PAGE-04**: Clickable TOC entries scroll smoothly to corresponding article sections
- [ ] **PAGE-05**: Archive page lists all monthly editions in a card grid with edition metadata
- [x] **PAGE-06**: Category badges with color coding displayed on article cards and within editions

### Responsive Design

- [ ] **RESP-01**: Responsive layout adapts cleanly to mobile, tablet, and desktop viewports
- [ ] **RESP-02**: Mobile navigation with hamburger menu collapse
- [ ] **RESP-03**: Mobile edition page hides or collapses sidebar TOC appropriately

### Content Details

- [x] **CONT-01**: Reading time displayed on article cards
- [ ] **CONT-02**: Article source links displayed within article sections
- [x] **CONT-03**: Edition metadata (month, year, issue number, article count) displayed on edition and archive cards

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Enhanced Features

- **V2-01**: Functional newsletter email subscription (currently placeholder only)
- **V2-02**: Search/filter across articles and editions
- **V2-03**: Dark mode toggle
- **V2-04**: Category filter tabs within edition pages
- **V2-05**: Reading progress bar on edition pages
- **V2-06**: Image optimization pipeline (WebP conversion, lazy loading)

## Out of Scope

| Feature | Reason |
|---------|--------|
| Testing (unit, integration, e2e) | User explicitly deferred — UI is the focus |
| Python/Streamlit app changes | React-only redesign scope |
| Backend API / CMS | Content stays in static JS files |
| Authentication / user accounts | Not needed for a static newsletter |
| Real email subscription | Visual placeholder only for v1 |
| Search functionality | Deferred to v2 |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| FOUND-01 | Phase 1 | Complete |
| FOUND-02 | Phase 1 | Complete |
| FOUND-03 | Phase 1 | Complete |
| FOUND-04 | Phase 1 | Complete |
| LAYOUT-01 | Phase 1 | Complete |
| LAYOUT-02 | Phase 1 | Pending |
| LAYOUT-03 | Phase 1 | Complete |
| LAYOUT-04 | Phase 1 | Complete |
| LAYOUT-05 | Phase 1 | Complete |
| LAYOUT-06 | Phase 1 | Pending |
| LAYOUT-07 | Phase 1 | Pending |
| LAYOUT-08 | Phase 1 | Pending |
| PAGE-01 | Phase 1 | Pending |
| PAGE-02 | Phase 1 | Pending |
| PAGE-03 | Phase 1 | Pending |
| PAGE-04 | Phase 1 | Pending |
| PAGE-05 | Phase 1 | Pending |
| PAGE-06 | Phase 1 | Complete |
| RESP-01 | Phase 1 | Pending |
| RESP-02 | Phase 2 | Pending |
| RESP-03 | Phase 2 | Pending |
| CONT-01 | Phase 1 | Complete |
| CONT-02 | Phase 1 | Pending |
| CONT-03 | Phase 1 | Complete |

**Coverage:**
- v1 requirements: 24 total
- Mapped to phases: 24
- Unmapped: 0

---
*Requirements defined: 2026-03-31*
*Last updated: 2026-03-31 after roadmap creation*
