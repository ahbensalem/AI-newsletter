# Architecture Research

**Domain:** React editorial newsletter SPA — multi-edition with sticky sidebar TOC
**Researched:** 2026-03-31
**Confidence:** HIGH

## Standard Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                        Pages (Route Layer)                   │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────┐  ┌───────────────┐  ┌──────────┐              │
│  │HomePage  │  │ EditionPage   │  │ Archive  │              │
│  │          │  │ (sticky TOC)  │  │ Page     │              │
│  └────┬─────┘  └───────┬───────┘  └────┬─────┘              │
│       │                │               │                    │
├───────┴────────────────┴───────────────┴────────────────────┤
│                     UI Components (Shared)                   │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────────┐ │
│  │ Navbar  │ │ Footer   │ │ArticleCard│ │SidebarTOC        │ │
│  └─────────┘ └──────────┘ └──────────┘ └──────────────────┘ │
│  ┌──────────────┐ ┌────────────┐ ┌───────────────────────┐  │
│  │ EditionCard  │ │CategoryBadge│ │ ArticleSection       │  │
│  └──────────────┘ └────────────┘ └───────────────────────┘  │
├─────────────────────────────────────────────────────────────┤
│                        Data Layer                            │
│  ┌───────────────────┐  ┌──────────────────────────────────┐ │
│  │ data/index.js     │  │ data/editions/january-2026.js    │ │
│  │ (registry)        │  │ data/editions/february-2026.js   │ │
│  └───────────────────┘  └──────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

### Component Responsibilities

| Component | Responsibility | Communicates With |
|-----------|----------------|-------------------|
| `Navbar` | Frosted glass top bar, site nav links, branding | React Router `Link`, all pages |
| `Footer` | Dark brand footer, newsletter signup placeholder | Standalone — no children |
| `ArticleCard` | Card for a single article (title, excerpt, category badge, image) | Used by `HomePage`, `EditionPage` |
| `EditionCard` | Card summarizing one month's edition (cover, issue #, article count) | Used by `ArchivePage` |
| `CategoryBadge` | Pill/tag showing category with color from data | Used by `ArticleCard`, `EditionPage` |
| `SidebarTOC` | Sticky left/right list of article titles with scroll-spy active state | Used only by `EditionPage` |
| `ArticleSection` | Full article block within an edition (title, body, sources, anchor target) | Used by `EditionPage` |
| `HomePage` | Hero, featured articles, recent edition preview | Data layer, shared components |
| `EditionPage` | Two-column layout: article list + sticky TOC | Data layer, `SidebarTOC`, `ArticleSection` |
| `ArchivePage` | Grid of all past editions | Data layer, `EditionCard` |

## Recommended Project Structure

```
src/
├── pages/
│   ├── HomePage.jsx          # Hero + featured articles + edition preview
│   ├── EditionPage.jsx       # Two-column: articles + sticky sidebar TOC
│   └── ArchivePage.jsx       # Grid of all past editions
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx        # Frosted glass top navigation
│   │   └── Footer.jsx        # Dark brand footer
│   ├── article/
│   │   ├── ArticleCard.jsx   # Card used on Home and Archive views
│   │   ├── ArticleSection.jsx # Full article block within an edition page
│   │   └── CategoryBadge.jsx  # Color-coded category pill
│   ├── edition/
│   │   ├── EditionCard.jsx    # Summary card for archive listing
│   │   └── SidebarTOC.jsx     # Sticky TOC with scroll-spy
│   └── ui/
│       └── (shared primitives if needed — buttons, etc.)
├── data/
│   ├── index.js              # Registry: exports allEditions[], categories[]
│   └── editions/
│       ├── january-2026.js   # January edition articles + metadata
│       └── february-2026.js  # February edition articles + metadata
├── hooks/
│   └── useScrollSpy.js       # Intersection Observer hook for TOC active state
├── utils/
│   └── colorClasses.js       # Deduplicated category → Tailwind class map
├── App.jsx                   # Route definitions
├── main.jsx                  # Entry: BrowserRouter + StrictMode
└── index.css                 # Tailwind v4 @theme tokens, global resets
```

### Structure Rationale

- **`data/editions/`:** One file per month. Adding a new edition = creating one file and adding one entry to `data/index.js`. No existing file is touched.
- **`components/article/` vs `components/edition/`:** Article-level components (cards, badges) are reused across pages. Edition-level components (`SidebarTOC`, `ArticleSection`) are specific to the month view.
- **`hooks/`:** `useScrollSpy` encapsulates Intersection Observer complexity outside of `SidebarTOC`, keeping the component focused on rendering.
- **`utils/colorClasses.js`:** The current codebase duplicates this map in both page files. Extracting it removes the duplication and makes category color theming a single source of truth.

## Architectural Patterns

### Pattern 1: Multi-Edition Data Registry

**What:** Each edition lives in its own JS module (`january-2026.js`). A central `data/index.js` imports and re-exports all editions as an ordered array. Pages import from the registry, never from individual edition files.

**When to use:** Any time content units (editions) are independently addable without modifying existing code.

**Trade-offs:** Adding a new edition requires touching only two files (new edition file + registry import). The registry file grows linearly, but at one edition per month it stays manageable indefinitely.

**Example:**
```js
// data/editions/january-2026.js
export default {
  slug: "january-2026",
  month: "January",
  year: "2026",
  issue: "01",
  coverImage: "/covers/jan-2026.jpg",
  articles: [
    {
      id: "molthub",
      category: "infrastructure",
      featured: true,
      title: "...",
      // ... same shape as current data.js articles
    }
  ]
};

// data/index.js
import january2026 from "./editions/january-2026";
// import february2026 from "./editions/february-2026";

export const allEditions = [
  january2026,
  // february2026,
];

export const categories = [ /* shared across all editions */ ];

export const getEdition = (slug) =>
  allEditions.find(e => e.slug === slug);

export const latestEdition = allEditions[0];
```

### Pattern 2: Scroll-Spy Sidebar TOC via Intersection Observer

**What:** `EditionPage` renders article sections each with a unique `id` matching their article slug. `SidebarTOC` uses a `useScrollSpy` hook that observes each section heading via `IntersectionObserver`. When a heading enters the viewport, the TOC entry for that article becomes visually active.

**When to use:** Any page with multiple named sections and a fixed navigation panel.

**Trade-offs:** Intersection Observer is performant (no scroll event listeners). The `rootMargin` must account for the fixed navbar height (e.g., `-80px 0px -50% 0px`). Using `useRef` to store visibility avoids re-render thrashing.

**Example:**
```js
// hooks/useScrollSpy.js
export function useScrollSpy(ids) {
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-80px 0px -50% 0px" }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [ids]);

  return activeId;
}
```

### Pattern 3: Hash Anchor Navigation via react-router-hash-link

**What:** TOC items and any cross-page links to a specific article use `<HashLink to="/edition/january-2026#molthub">`. React Router does not natively scroll to hash fragments; `react-router-hash-link` adds this behavior with smooth scroll support.

**When to use:** Whenever a link must scroll to a named section within a page. Handles asynchronous renders correctly (waits for the target element to appear before scrolling).

**Trade-offs:** Small dependency (~3kB). The alternative (manual `useEffect` + `scrollIntoView`) requires more boilerplate and is more fragile on initial page load.

## Routing Structure

```
/                          → HomePage
/archive                   → ArchivePage
/edition/:slug             → EditionPage  (e.g., /edition/january-2026)
/edition/:slug#article-id  → EditionPage scrolled to article section
```

**App.jsx route definition:**
```jsx
<Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/archive" element={<ArchivePage />} />
  <Route path="/edition/:slug" element={<EditionPage />} />
  <Route path="*" element={<NotFoundPage />} />
</Routes>
```

**No nested routes needed.** `EditionPage` handles its own two-column layout internally. Nesting routes would add unnecessary complexity for what is effectively a single page with a sidebar.

## Data Flow

### Home Page Flow

```
data/index.js (latestEdition, allEditions)
    ↓ import
HomePage
    ├── latestEdition.articles.find(featured)    → hero ArticleCard
    ├── latestEdition.articles.filter(non-featured) → secondary ArticleCard grid
    └── allEditions.slice(1, 4)                 → recent EditionCards
```

### Edition Page Flow

```
useParams() → slug
    ↓
getEdition(slug) from data/index.js
    ↓
EditionPage
    ├── articles.map(a => <ArticleSection id={a.id} ... />)   [right column]
    └── <SidebarTOC articles={articles} activeId={...} />     [left column]
                              ↑
                    useScrollSpy(article ids)
                    (IntersectionObserver watching section headings)
```

### Archive Page Flow

```
data/index.js (allEditions)
    ↓ import
ArchivePage
    └── allEditions.map(e => <EditionCard edition={e} />)
```

### State Management

No global state needed. The data layer is static imports. The only runtime state is:

| State | Location | Why Here |
|-------|----------|----------|
| `activeId` (TOC scroll position) | `useScrollSpy` hook | Local to edition page — not shared |
| Route params (`slug`) | React Router `useParams` | Framework-managed |

No Context, Redux, or Zustand is needed. This is a read-only display app with one piece of UI state (which TOC entry is active) that is scoped to a single page.

## Component Boundaries

| Boundary | Rule |
|----------|------|
| Pages → Data | Pages import from `data/index.js` only, never directly from edition files |
| Components → Data | Shared components receive data as props — they do not import from data layer |
| `SidebarTOC` → DOM | `SidebarTOC` reads DOM element positions via `useScrollSpy` — no other component does this |
| `colorClasses` | Single import from `utils/colorClasses.js` — never duplicated inline |
| `Navbar` / `Footer` | Stateless — no props needed, no data imports. Pure layout shells |

## Suggested Build Order

Dependencies flow upward (build foundations before consumers):

1. **Data layer first** — `utils/colorClasses.js`, `data/editions/january-2026.js`, `data/index.js`. Nothing else can be built correctly until the data shape is finalized.
2. **Layout shells** — `Navbar`, `Footer`. These appear on every page but have zero dependencies.
3. **Atomic components** — `CategoryBadge`, then `ArticleCard`, then `EditionCard`. Each depends on the previous for color utilities.
4. **`useScrollSpy` hook** — Required by `SidebarTOC`. Implement and test in isolation before wiring into the page.
5. **`SidebarTOC`** — Depends on `useScrollSpy` + `ArticleCard` shape for title rendering.
6. **`ArticleSection`** — Full in-page article block. Depends on data shape + `CategoryBadge`.
7. **`EditionPage`** — Depends on `SidebarTOC` + `ArticleSection` + routing. The most complex page, built last.
8. **`ArchivePage`** — Depends on `EditionCard` + `data/index.js`. Simpler page, can be built in parallel with `EditionPage`.
9. **`HomePage`** — Depends on `ArticleCard` + `EditionCard` + `data/index.js`. Can be built or retrofitted at any point after step 3.

## Anti-Patterns

### Anti-Pattern 1: Per-Edition Routes via Hardcoded Path Strings

**What people do:** Add a new route entry in `App.jsx` for each edition (`/january`, `/february`...).

**Why it's wrong:** Route file grows with content. Adding a new edition requires a code change in three places (edition file, data index, App.jsx). The `:slug` dynamic route makes edition discovery data-driven.

**Do this instead:** One dynamic route `/edition/:slug`. Edition files are discovered via the registry.

### Anti-Pattern 2: Duplicating colorClasses in Every Component

**What people do:** Copy the `{ accent: { pill: "...", dot: "..." } }` object into each component that needs category theming (current codebase already does this in both page files).

**Why it's wrong:** Color changes require finding every duplicate. With a component library, the duplication multiplies.

**Do this instead:** Single `utils/colorClasses.js` export imported wherever needed.

### Anti-Pattern 3: Scroll Event Listeners for TOC Active State

**What people do:** Add `window.addEventListener('scroll', ...)` with `getBoundingClientRect()` calculations to detect which section is visible.

**Why it's wrong:** Fires on every scroll tick, causes layout thrashing from `getBoundingClientRect()` reads. Performance degrades noticeably at 60fps scrolling.

**Do this instead:** `IntersectionObserver` in `useScrollSpy`. Fires only when visibility crosses the threshold — O(1) per frame.

### Anti-Pattern 4: Fetching Article Body in ArticlePage (Current Pattern)

**What people do (current):** Keep the separate `/article/:id` route for full article detail views.

**Why it's wrong for this redesign:** The target design is edition-centric. Sub-articles within a monthly edition should be experienced as sections of the edition page, not separate page navigations. A separate `ArticlePage` breaks the editorial "reading an issue" flow and makes the sticky TOC irrelevant.

**Do this instead:** Articles live as sections within `EditionPage`. Full article bodies render inline with smooth scroll navigation. The old `ArticlePage` route can be deprecated or repurposed as a redirect to `/edition/:slug#article-id`.

## Scaling Considerations

| Scale | Architecture Adjustments |
|-------|--------------------------|
| 1-12 editions | Current static data/index.js registry is fine. All imports happen at build time. |
| 12-50 editions | Consider dynamic `import()` for edition files (code-split by route). Vite handles this automatically if lazy-loaded in `EditionPage`. |
| 50+ editions | Move to a markdown/MDX file-system approach or a headless CMS. Out of scope per PROJECT.md constraints. |

The first scaling consideration is bundle size, not performance. At 12+ editions, lazy-loading edition data modules via `React.lazy` + Vite's dynamic import eliminates the need to bundle all article content on initial load.

## Integration Points

### Internal Boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| Pages ↔ Data | Direct ES import | Static — no async, no loaders |
| `EditionPage` ↔ `useScrollSpy` | React hook | Hook owns IntersectionObserver lifecycle |
| `SidebarTOC` ↔ DOM | Via hook return value | `SidebarTOC` never queries DOM directly |
| Routing ↔ Pages | React Router v7 `useParams` | `slug` is the only URL-derived state |

### External Dependencies

| Dependency | Usage | Notes |
|------------|-------|-------|
| `react-router-hash-link` | TOC links that scroll to article sections | Handles async rendering edge case on initial load |
| `framer-motion` | Keep existing scroll-reveal animations | Applied at `ArticleSection` and card entry level |
| `lucide-react` | Icons (existing) | Keep for nav icons, external link indicators |

## Sources

- [React Router v7 Guide — LogRocket, Jan 2026](https://blog.logrocket.com/react-router-v7-guide/)
- [React Router Nested Routes — Robin Wieruch](https://www.robinwieruch.de/react-router-nested-routes/)
- [Table of Contents with IntersectionObserver — CSS-Tricks](https://css-tricks.com/table-of-contents-with-intersectionobserver/)
- [Sticky TOC with Scrolling Active States — CSS-Tricks](https://css-tricks.com/sticky-table-of-contents-with-scrolling-active-states/)
- [Building a TOC with IntersectionObserver API — tj.ie](https://tj.ie/building-a-table-of-contents-with-the-intersection-observer-api/)
- [react-router-hash-link — npm](https://www.npmjs.com/package/react-router-hash-link)
- [Modularizing React Applications — Martin Fowler](https://martinfowler.com/articles/modularizing-react-apps.html)
- [React Project Structure for Scale — Developer Way](https://www.developerway.com/posts/react-project-structure)

---
*Architecture research for: React editorial newsletter SPA (The Gradient)*
*Researched: 2026-03-31*
