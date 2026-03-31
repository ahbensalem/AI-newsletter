# Feature Research

**Domain:** Editorial AI newsletter web app (curated monthly editions, multi-category)
**Researched:** 2026-03-31
**Confidence:** MEDIUM-HIGH — patterns drawn from Ghost, Substack, Smashing Magazine, UX Collective, and editorial design analysis. React-specific implementation details verified via CSS-Tricks and npm sources.

---

## Feature Landscape

### Table Stakes (Users Expect These)

Features users assume exist. Missing these = product feels incomplete or amateurish.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Frosted-glass sticky navbar | Standard on every premium editorial site since 2023; users notice its absence immediately | LOW | `backdrop-blur` + `bg-white/80` in Tailwind CSS 4; already planned |
| Hero section on Home | Sets brand tone; all premium publications (Ghost, Substack, Verge) open with bold hero | LOW | Large headline, tagline, issue date, CTA; scrolls into article cards |
| Article cards with image, title, excerpt, read-time | Card-grid is the universal browsing pattern; users scan thumbnails before clicking | LOW | Existing `readTime` field in data model supports this directly |
| Category visual grouping | With 5 categories, uncategorized lists feel chaotic; readers expect to know the topic immediately | LOW | Color-coded labels already in `data.js`; surface as pill badges on cards |
| Individual article/edition page | Users click in; they need a destination | LOW | Exists; being redesigned |
| Archive / past editions listing | Newsletters publish over time; readers expect to browse history | MEDIUM | New page needed; edition cards with month/year/issue number |
| Responsive design (mobile, tablet, desktop) | 60%+ of reading happens on mobile; broken layouts = lost readers | MEDIUM | Tailwind responsive prefixes; test sticky sidebar collapse on mobile |
| Dark footer with branding | Every credible publication has a footer; absence signals "unfinished site" | LOW | Brand mark, edition tagline, links |
| Readable typography hierarchy | Editorial credibility lives in type; body text too small or compressed loses readers | LOW | Manrope or similar geometric sans; `text-base` / `text-lg` body, generous `leading-relaxed` |
| Estimated reading time on articles | Readers pre-decide time investment; Ghost and Medium both surface this prominently | LOW | `readTime` field already in data model — just render it |

### Differentiators (Competitive Advantage)

Features that set The Gradient apart. Not required by convention, but they create a premium impression.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Sticky sidebar Table of Contents (TOC) with scroll-spy | The core UX promise of this redesign — readers can jump between articles within an edition without losing context | MEDIUM | IntersectionObserver API; `position: sticky`; `react-scrollspy` package or custom hook; active state highlight as user scrolls |
| Featured / hero article slot per edition | Elevates one story per month; signals editorial curation rather than aggregation | LOW | `featured: true` flag already exists in `data.js`; render differently in the edition layout |
| Category color-coded sidebar anchors | Fast visual wayfinding within a long edition page; each category gets its own color node in the TOC | LOW | Reuse the category color system from `data.js` in the TOC item style |
| Edition "cover" design | Each monthly edition feels like a magazine issue, not a blog post list | MEDIUM | Edition header with month/year, a short editorial note, and featured article preview |
| Reading progress indicator | Subtle top-bar progress shows how far into the edition you are; keeps readers engaged | LOW | CSS `scaleX` transform bound to `window.scrollY` / `document.body.scrollHeight`; Framer Motion makes this trivial |
| Smooth scroll-to-section within edition | Clicking a TOC entry scrolls the article into view; no full page reload | LOW | Native `scroll-behavior: smooth` + anchor `id`s; or Framer Motion scroll helpers |
| Card hover reveal (lift + excerpt preview) | Cards that react to hover feel alive; reinforces premium brand perception | LOW | Tailwind `group-hover`, `translate-y`, `shadow-xl` transitions; Framer Motion `whileHover` |
| AI-native aesthetic — fresh, techy, non-purple palette | Every other AI newsletter is teal/purple; a distinct palette (amber/slate, green/charcoal, orange/off-white) immediately differentiates | LOW | Pure CSS/Tailwind — decision is about choosing the right colors, not building anything new |
| Category filter tabs on edition page | Readers who only care about Dev Tools or Robotics can surface just those; reduces scroll fatigue | MEDIUM | Client-side filter on `articles` array; filter state in React `useState`; no back-end needed |
| Scalable edition data model | Easy to add February, March, etc. without code changes to page components | MEDIUM | Structured `editions/` data directory; each month is a self-contained JS module; `index.js` exports all editions as an array |

### Anti-Features (Commonly Requested, Often Problematic)

Features that seem good but create problems — avoid these for this milestone.

| Feature | Why Requested | Why Problematic | Alternative |
|---------|---------------|-----------------|-------------|
| Newsletter email subscription (functional) | Obvious CTA for a newsletter | Requires back-end, GDPR/CAN-SPAM compliance, email provider integration — none of which are in scope | Render the signup form visually; wire it up in a future milestone when back-end exists |
| Full-text search across editions | Power users want to find past articles | Requires search index (Fuse.js at minimum, Algolia at best); adds non-trivial state management; distraction from redesign goal | Add in a future milestone after content volume justifies it; PROJECT.md explicitly lists it as out of scope |
| Dark mode toggle | 91% of users prefer dark mode; feels like a quick win | Two full themes require duplicating every color decision; doubles QA surface; distracts from getting the light theme right first | Ship a clean, well-lit theme with proper contrast; add dark mode in v2 when the design language is stable |
| Pagination or infinite scroll for archive | Archive will eventually be long | Current content volume (1 edition) doesn't need it; premature optimization; adds state complexity | Render all editions as cards; revisit when there are 12+ editions |
| Social sharing buttons (Twitter, LinkedIn etc.) | Standard on editorial sites | Third-party scripts add weight and privacy concerns; links can go stale; low ROI for a static site at this stage | Provide a plain "Copy link" button per article; zero dependencies, always works |
| Comments / reader reactions | Community building | Requires auth, moderation, a real-time system — all out of scope | Ghost / Substack integration can be evaluated in a future milestone |
| User accounts / personalization | Bookmarks, saved articles | Full authentication system is a project of its own; drags the team away from UI work | Defer entirely; content is curated enough that bookmarking adds little value at MVP |

---

## Feature Dependencies

```
[Archive Page]
    └──requires──> [Multi-Edition Data Model]
                       └──requires──> [Per-Edition Data Files]

[Sticky TOC with Scroll-Spy]
    └──requires──> [Article anchor IDs on edition page]
                       └──requires──> [Edition page layout]

[Category Filter Tabs]
    └──requires──> [Edition page layout]
    └──enhances──> [Sticky TOC] (filter changes which TOC entries are shown)

[Reading Progress Bar]
    └──requires──> [Edition page layout] (long-scroll context)

[Featured Article Slot]
    └──requires──> [featured: true flag in data model] (already exists)
    └──enhances──> [Hero Section on Home] (featured article drives hero content)

[Hero Section]
    └──requires──> [Multi-Edition Data Model] (to pull latest edition metadata)

[Card Hover Interactions]
    └──requires──> [Card-based article layout]

[Edition Cover Design]
    └──enhances──> [Archive Page] (same cover component reused as archive card thumbnail)
```

### Dependency Notes

- **Archive Page requires Multi-Edition Data Model:** You cannot build an archive of one month; the data structure must support multiple editions before the archive renders meaningfully.
- **Sticky TOC requires anchor IDs:** Each article rendered on the edition page needs a stable `id` attribute so TOC links can scroll to it. This is a markup concern that must be baked into the edition page template from day one.
- **Category Filter enhances Sticky TOC:** If a user filters to "Dev Tools only," the TOC should also collapse to only Dev Tools entries. This means filter state must be accessible to both the article list and the TOC — a shared state or context.
- **Reading Progress Bar requires long-scroll context:** This feature only makes sense on an edition page (10+ articles). It would be noise on the 2-3 card Home page.
- **Edition Cover Design can be reused as Archive Card:** Building the cover component once and rendering it both on the edition page header and as a card in the archive page saves duplication. Design the component with this dual use in mind.

---

## MVP Definition

### Launch With (v1 — this milestone)

Minimum set to deliver the redesign goal: a visually premium, fully browsable AI newsletter.

- [ ] Frosted-glass sticky navbar — baseline credibility
- [ ] Home page: hero section + featured article highlight + article card grid
- [ ] Multi-edition data model — unlocks everything else
- [ ] Archive page — edition cards with month/year/article count
- [ ] Monthly edition page — all articles, category-grouped, readable typography
- [ ] Sticky sidebar TOC with scroll-spy — the defining UX feature; non-negotiable
- [ ] Smooth scroll-to-section for TOC links — pairs with sticky TOC
- [ ] Card hover interactions (lift + shadow) — low effort, high perceived quality
- [ ] Responsive design across breakpoints — required for launch credibility
- [ ] Dark footer with branding

### Add After Validation (v1.x)

Features to add once the core design is working and stable.

- [ ] Reading progress indicator — low complexity; add in same sprint if time allows, or next
- [ ] Category filter tabs on edition page — moderate complexity; useful once there are 8+ articles per edition
- [ ] Edition "cover" editorial note slot — content-driven; requires editorial decision on format

### Future Consideration (v2+)

Features to defer until content volume and usage patterns justify the investment.

- [ ] Functional newsletter subscription (requires back-end)
- [ ] Full-text search (requires content index, Fuse.js or Algolia)
- [ ] Dark mode (requires full design-token audit)
- [ ] Social sharing beyond copy-link
- [ ] Comments / reader reactions (requires auth)

---

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority |
|---------|------------|---------------------|----------|
| Sticky navbar (frosted glass) | HIGH | LOW | P1 |
| Home hero section | HIGH | LOW | P1 |
| Multi-edition data model | HIGH | MEDIUM | P1 |
| Archive page | HIGH | MEDIUM | P1 |
| Edition page layout | HIGH | MEDIUM | P1 |
| Sticky TOC with scroll-spy | HIGH | MEDIUM | P1 |
| Article cards + hover interactions | HIGH | LOW | P1 |
| Responsive design | HIGH | MEDIUM | P1 |
| Smooth TOC scroll-to-section | HIGH | LOW | P1 |
| Dark footer | MEDIUM | LOW | P1 |
| Reading progress bar | MEDIUM | LOW | P2 |
| Category filter tabs | MEDIUM | MEDIUM | P2 |
| Edition cover / editorial note | MEDIUM | LOW | P2 |
| Featured article hero slot | MEDIUM | LOW | P2 |
| Functional email subscription | HIGH | HIGH | P3 |
| Full-text search | MEDIUM | HIGH | P3 |
| Dark mode | MEDIUM | HIGH | P3 |

**Priority key:**
- P1: Must have for this milestone
- P2: Should have — include if sprint capacity allows
- P3: Future milestone

---

## Competitor Feature Analysis

Reference sites analyzed to ground the feature list.

| Feature | Ghost / Substack | Smashing / UX Collective | The Gradient (Our Approach) |
|---------|-----------------|--------------------------|------------------------------|
| Navigation | Sticky header, minimal links | Sticky top bar, search prominent | Frosted glass navbar; Home, Archive, Edition links |
| Home page | Hero + recent posts grid | Category grid + featured article | Hero with latest edition + curated card grid |
| Archive | Chronological list or grid | Category-filtered article index | Edition cards grid (monthly granularity, not per-article) |
| Article / edition | Single-column body, author bio | Multi-column with sidebar, TOC | Multi-column: article list body + sticky TOC sidebar |
| TOC | Ghost has native TOC block | Smashing does sticky TOC for long posts | Scroll-spy TOC per edition; highlights active section |
| Category system | Tags, collections | Topic pages | 5 fixed categories; color-coded pills + TOC grouping |
| Reading time | Yes, on every post | Yes | Yes — already in data model, surface on cards and article headers |
| Hover interactions | Minimal | Card lift on hover | Card lift + shadow; category color accent on hover |
| Mobile | Single-column reflow | Collapsed sidebar, hamburger menu | TOC collapses to drawer/toggle on mobile |
| Email subscription | Core product (functional) | Prominent but goes to external form | Visual placeholder only; functional deferred |

---

## Sources

- Ghost vs Substack feature comparison: [expressionbytes.com](https://expressionbytes.com/ghost-vs-substack/), [ghost.org](https://ghost.org/vs/substack/)
- Sticky TOC with IntersectionObserver: [CSS-Tricks](https://css-tricks.com/table-of-contents-with-intersectionobserver/), [emgoto.com React TOC guide](https://www.emgoto.com/react-table-of-contents/)
- react-scrollspy package: [github.com/toviszsolt/react-scrollspy](https://github.com/toviszsolt/react-scrollspy)
- Glassmorphism / frosted glass navbar: [braydoncoyer.dev Tailwind glassmorphic navbar](https://www.braydoncoyer.dev/blog/build-a-glassmorphic-navbar-with-tailwindcss-backdrop-filter-and-backdrop-blur)
- Newsletter archive UX: [Smashing Magazine archive best practices](https://www.smashingmagazine.com/2010/05/website-archives-best-practices-and-showcase/), [newsletterglue.com](https://newsletterglue.com/blog/build/create-seo-newsletter-archive/)
- AI brand web design trends 2026: [entrustechinc.com](https://entrustechinc.com/top-ai-driven-website-design-trends-that-will-dominate-2026/)
- Dark mode UX 2025: [Smashing Magazine inclusive dark mode](https://www.smashingmagazine.com/2025/04/inclusive-dark-mode-designing-accessible-dark-themes/)
- Newsletter design trends 2025: [curatedletters.com](https://curatedletters.com/10-newsletter-design-trends-2025-to-captivate/)
- Existing app data model: `/mnt/c/Users/ah.bensalem/Documents/projects/newsletter/react-newsletter/src/data.js`

---
*Feature research for: The Gradient — AI Newsletter Redesign (React)*
*Researched: 2026-03-31*
