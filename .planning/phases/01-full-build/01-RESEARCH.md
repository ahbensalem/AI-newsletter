# Phase 1: Full Build - Research

**Researched:** 2026-03-31
**Domain:** React 19 editorial newsletter SPA — dark-to-light theme migration, multi-edition data model, sticky sidebar TOC
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

- **D-01:** Charcoal + Electric palette. Primary: `#EA580C` (orange-600), Accent: `#0EA5E9` (sky-500), Dark/headings: `#1C1917` (stone-900), Body text: `#57534E` (stone-600), Light bg: `#FAFAF9` (stone-50), Borders: `#D6D3D1` (stone-300)
- **D-02:** Light overall theme with white/near-white backgrounds. Alternating white and stone-50 sections for visual rhythm. Dark footer.
- **D-03:** NOT purple/blue — user explicitly wants to avoid Claude/corporate AI cliché
- **D-04:** Hero section uses featured overlay card — large image with gradient overlay from transparent to near-black, white text on top. 2 secondary side-by-side cards below the hero.
- **D-05:** Below hero: 3-column card grid showing recent articles across all editions
- **D-06:** Newsletter signup placeholder section (visual only, not functional)
- **D-07:** Full articles displayed inline in sequence on one page (readx article page style). No accordion, no separate article detail pages.
- **D-08:** Sticky sidebar TOC on the right with article titles grouped/tagged by category. Scroll-spy highlights the currently visible article.
- **D-09:** Two-column layout: main content (wider) + sidebar TOC (narrower, sticky)
- **D-10:** Each article section includes: title, category badge, reading time, image (if exists), full body paragraphs, source links
- **D-11:** Claude's Discretion — follow readx patterns: 24px border-radius, card borders, hover lift (translateY -6px + shadow), generous whitespace (100px section padding, 64px gaps). Adapt to charcoal+electric palette.
- **D-12:** Migrate flat `data.js` to per-edition module files (e.g., `data/editions/january-2026.js`) with a central registry. Adding a new edition = adding one file + one registry entry.

### Claude's Discretion

- D-11 (card visual style): Follow readx patterns and adapt to charcoal+electric palette. Specific hover values, radius, padding are Claude's call within the readx reference.

### Deferred Ideas (OUT OF SCOPE)

None — discussion stayed within phase scope.

</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| FOUND-01 | Multi-edition data model supports multiple months with per-edition files, easy to add new editions | Per-edition module pattern in `data/editions/` + `data/index.js` registry fully designed in ARCHITECTURE.md |
| FOUND-02 | Semantic color token system in Tailwind v4 `@theme` with custom AI-tech palette (NOT purple/blue) | Full token set defined in UI-SPEC.md; complete `@theme` block replacement of dark tokens documented |
| FOUND-03 | Professional typography with Manrope font, clear heading hierarchy, readable body text (18px+) | `@fontsource-variable/manrope` v5.2.8 verified; 4-role type scale defined in UI-SPEC.md |
| FOUND-04 | Framer Motion moved from devDependencies to dependencies | One-line fix: `npm install framer-motion --save`; confirmed root cause in CONCERNS.md |
| LAYOUT-01 | Frosted glass sticky navbar with blur effect and smooth navigation links | `backdrop-blur-md bg-white/75 sticky top-0 z-50` pattern; Firefox `@supports` fallback documented |
| LAYOUT-02 | Modern editorial home page with hero section and featured article highlight | Hero overlay card pattern + secondary cards + 3-col grid; referenced from readx |
| LAYOUT-03 | Card-based article presentation with rounded corners (24px), borders, and content padding | `rounded-2xl border border-border bg-card-bg p-6` pattern established |
| LAYOUT-04 | Card hover lift animations (translateY + shadow on hover) | Framer Motion `whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(0,0,0,0.10)" }}` confirmed |
| LAYOUT-05 | Dark branded footer with newsletter info, navigation links, and social icons | `bg-footer-bg` token; stateless `Footer.jsx` component in `src/components/layout/` |
| LAYOUT-06 | Alternating section backgrounds (white / light grey) for visual rhythm | Odd: `bg-page-bg` (stone-50); even: `bg-section-alt` (white) |
| LAYOUT-07 | Generous whitespace — 100px section padding, 64px title gaps, 40px card gaps | Documented in UI-SPEC spacing scale; 100px exceptions noted |
| LAYOUT-08 | Scroll-reveal animations on cards and sections using Framer Motion | `initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}` pattern; `viewport={{ once: true }}` |
| PAGE-01 | Home page displays featured articles, recent edition highlights, and newsletter signup placeholder | `HeroSection` + `RecentArticlesGrid` + `NewsletterSignup` sub-sections defined |
| PAGE-02 | Edition page shows all articles for a month with two-column layout (content + sidebar) | `grid-cols-[1fr_260px]` at `lg:`; single column below lg; `EditionPage.jsx` |
| PAGE-03 | Sticky sidebar table of contents with scroll-spy highlighting current article | `react-intersection-observer` v10.0.3 + `useScrollSpy` hook; `rootMargin: "-80px 0px -85% 0px"` |
| PAGE-04 | Clickable TOC entries scroll smoothly to corresponding article sections | Imperative `element.scrollIntoView({ behavior: "smooth", block: "start" })`; `scroll-margin-top: 80px` on sections |
| PAGE-05 | Archive page lists all monthly editions in a card grid with edition metadata | `ArchivePage.jsx` with `EditionCard` grid; data from `data/index.js` registry |
| PAGE-06 | Category badges with color coding displayed on article cards and within editions | `CategoryPill.jsx` with `utils/colorClasses.js`; 5-category color map documented in UI-SPEC |
| RESP-01 | Responsive layout adapts cleanly to mobile, tablet, and desktop viewports | Mobile-first Tailwind breakpoints; edition TOC hidden below `lg:` (Phase 2 adds toggle) |
| CONT-01 | Reading time displayed on article cards | `readTime` field already in `data.js` articles; rendered in `ArticleCard` meta row |
| CONT-02 | Article source links displayed within article sections | `sources[]` field in article data; rendered in `ArticleSection` footer |
| CONT-03 | Edition metadata (month, year, issue number, article count) displayed on edition and archive cards | `edition.month`, `edition.year`, `edition.issue` + derived `articleCount`; `EditionCard` props |

</phase_requirements>

---

## Summary

This phase delivers the complete redesign of The Gradient newsletter from a dark-themed, single-edition SPA to a light-themed, multi-edition editorial platform with a sticky sidebar TOC. All major technical decisions are already locked via extensive prior research (STACK.md, ARCHITECTURE.md, PITFALLS.md, UI-SPEC.md). The research phase confirms those findings are still current and adds specific implementation guidance for the build order, wave structure, and key gotchas.

The existing React stack (React 19, Vite 8, Tailwind v4, React Router v7, Framer Motion v12) requires no changes. Four packages need to be added: `@fontsource-variable/manrope` (5.2.8), `clsx` (2.1.1), `tailwind-merge` (3.5.0), `react-intersection-observer` (10.0.3), and `@tailwindcss/typography` (0.5.19) as a dev dependency. All versions verified against npm registry as of 2026-03-31.

The build must proceed in strict dependency order: data layer first (migrating `data.js` to per-edition modules), then CSS token replacement (dark `@theme` variables renamed semantically), then layout shells (Navbar, Footer), then atomic components, then pages. The most complex deliverable is `EditionPage` with its sticky two-column layout and scroll-spy TOC — this has three documented failure modes that require specific prevention techniques.

**Primary recommendation:** Execute in three waves: (1) foundations — packages, data migration, CSS tokens, (2) shared components + home page, (3) edition and archive pages. Never start component work before the data model and CSS tokens are finalized.

---

## Standard Stack

### Core (already installed — no changes)
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| React | ^19.2.4 | UI framework | Already installed; React 19 stable with no breaking changes for this project |
| Vite | ^8.0.1 | Build tool + dev server | Already installed; `@tailwindcss/vite` integration in place |
| Tailwind CSS | ^4.2.2 | Utility-first CSS | Already installed; CSS-first `@theme` block — no `tailwind.config.js` |
| React Router DOM | ^7.13.2 | Client-side routing | Already installed; add two new routes (`/archive`, `/edition/:slug`) |
| Framer Motion | ^12.38.0 | Animations | Already installed; FIX: move from `devDependencies` to `dependencies` |
| Lucide React | ^1.7.0 | Icons | Already installed; current stable version |

### Additions Required
| Library | Version | Purpose | Why |
|---------|---------|---------|-----|
| `@fontsource-variable/manrope` | 5.2.8 | Self-hosted variable font (300–800 weight) | Eliminates Google Fonts CDN render-blocking; bundles into Vite build |
| `clsx` | 2.1.1 | Conditional class construction | Clean conditional `className` logic in components |
| `tailwind-merge` | 3.5.0 | Tailwind class conflict resolution | v3 required for Tailwind v4 compatibility; v2 silently breaks |
| `react-intersection-observer` | 10.0.3 | Scroll-spy for sticky TOC active state | Wraps IntersectionObserver; pools observers; O(1) per scroll frame |
| `@tailwindcss/typography` | 0.5.19 | `prose` classes for article body text | Editorial-quality typography defaults; activated via `@plugin` in CSS |

**Version verification:** All versions confirmed via `npm view [package] version` on 2026-03-31.

**Installation:**
```bash
# In react-newsletter/ directory

# Fix framer-motion miscategorization
npm install framer-motion --save

# New production dependencies
npm install @fontsource-variable/manrope clsx tailwind-merge react-intersection-observer

# New dev dependency
npm install -D @tailwindcss/typography
```

### Alternatives Considered
| Instead of | Could Use | Why Not |
|------------|-----------|---------|
| `react-intersection-observer` | Native `IntersectionObserver` | Native API works but requires boilerplate ref management and manual cleanup; `react-intersection-observer` pools observers and handles unmount automatically |
| `@fontsource-variable/manrope` | Google Fonts CDN | CDN is render-blocking; Fontsource bundles into Vite build with zero network dependency |
| Imperative `scrollIntoView` for TOC clicks | `react-router-hash-link` | Hash URL changes conflict with React Router's scroll restoration; imperative scroll is simpler and avoids the conflict entirely |
| `tailwind-merge` v3 | `tailwind-merge` v2 | v2 does not support Tailwind v4 class semantics; silently produces wrong output |

---

## Architecture Patterns

### Recommended Project Structure
```
react-newsletter/src/
├── pages/
│   ├── HomePage.jsx          # Rewrite with new design; hero + cards + signup
│   ├── EditionPage.jsx       # New: two-column layout + sticky TOC
│   └── ArchivePage.jsx       # New: edition card grid
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx        # Extract from HomePage; frosted glass sticky
│   │   └── Footer.jsx        # Extract from HomePage; dark branded footer
│   ├── article/
│   │   ├── ArticleCard.jsx   # Extract from HomePage; reused across pages
│   │   ├── ArticleSection.jsx # New: full article block within EditionPage
│   │   └── CategoryPill.jsx  # Extract from both pages; color-coded pill
│   └── edition/
│       ├── EditionCard.jsx   # New: archive card with edition metadata
│       └── SidebarTOC.jsx    # New: sticky right sidebar with scroll-spy
├── data/
│   ├── index.js              # Registry: allEditions[], getEdition(slug), latestEdition
│   └── editions/
│       └── january-2026.js   # Migrated from src/data.js
├── hooks/
│   └── useScrollSpy.js       # IntersectionObserver hook for TOC active state
├── lib/
│   └── cn.js                 # clsx + tailwind-merge combinator
├── utils/
│   └── colorClasses.js       # Single source of truth for category color map
├── App.jsx                   # Add /archive and /edition/:slug routes
├── main.jsx                  # Add @fontsource-variable/manrope import
└── index.css                 # Complete @theme replacement with semantic tokens
```

### Pattern 1: Multi-Edition Data Registry
**What:** Each edition lives in its own JS module. A central `data/index.js` exports an ordered array and a `getEdition(slug)` lookup. Pages import from the registry only, never from individual edition files.

**When to use:** Any feature that needs edition-level data (archive, routing, TOC, homepage "latest").

**Example:**
```js
// src/data/editions/january-2026.js
export default {
  slug: "january-2026",
  month: "January",
  year: "2026",
  issue: "01",
  coverImage: "/molthub.png",
  articles: [
    {
      id: "molthub",
      category: "infrastructure",
      featured: true,
      title: "MoltHub: The Internet's First Platform Built for AI Agents",
      excerpt: "...",
      image: "/molthub.png",
      readTime: "5 min",
      date: "Jan 15, 2026",
      body: ["..."],
      sources: [{ name: "Visit MoltHub", url: "https://molthub.studio" }],
    },
    // ... all 9 current articles migrated verbatim
  ]
};

// src/data/index.js
import january2026 from "./editions/january-2026";

export const allEditions = [january2026];
export const latestEdition = allEditions[0];
export const getEdition = (slug) => allEditions.find(e => e.slug === slug);
export const categories = [/* shared category definitions */];
```

### Pattern 2: Semantic Color Token System (Tailwind v4 `@theme`)
**What:** Complete replacement of all dark-named CSS variables with semantically correct names. Never change hex values in-place on old names — rename the variables themselves.

**When to use:** Before any component work begins in Wave 1.

**Example:**
```css
/* src/index.css — FULL REPLACEMENT of existing @theme block */
@import "tailwindcss";
@plugin "@tailwindcss/typography";

@theme {
  /* Page backgrounds */
  --color-page-bg: #FAFAF9;        /* stone-50 — dominant bg */
  --color-section-alt: #FFFFFF;     /* alternating white sections */
  --color-card-bg: #FFFFFF;         /* card surfaces */
  --color-sidebar-bg: #F5F4F2;      /* sidebar/TOC bg */
  --color-nav-bg: rgba(255,255,255,0.75); /* frosted glass navbar */
  --color-footer-bg: #1C1917;       /* stone-900 — dark footer */

  /* Borders */
  --color-border: #D6D3D1;          /* stone-300 */
  --color-border-subtle: #E7E5E4;   /* stone-200 */

  /* Text */
  --color-text: #1C1917;            /* stone-900 — headings */
  --color-text-2: #57534E;          /* stone-600 — body copy */
  --color-text-3: #A8A29E;          /* stone-400 — meta/muted */
  --color-footer-text: #A8A29E;

  /* Accent (orange) — reserved for CTAs, active states, Infrastructure category */
  --color-accent: #EA580C;          /* orange-600 */
  --color-accent-soft: rgba(234,88,12,0.10);

  /* Secondary accent (sky) — Robotics category */
  --color-sky: #0EA5E9;             /* sky-500 */
  --color-sky-soft: rgba(14,165,233,0.10);

  /* Category colors (3 additional) */
  --color-violet: #7C3AED;
  --color-violet-soft: rgba(124,58,237,0.10);
  --color-pink: #DB2777;
  --color-pink-soft: rgba(219,39,119,0.10);
  --color-emerald: #059669;
  --color-emerald-soft: rgba(5,150,105,0.10);

  /* Typography */
  --font-sans: "Manrope Variable", ui-sans-serif, system-ui, sans-serif;
}

/* Global resets */
* { margin: 0; padding: 0; box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  background: var(--color-page-bg);
  color: var(--color-text);
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
  min-height: 100vh;
}

/* TOC scroll offset compensation for sticky navbar */
section[id] { scroll-margin-top: 80px; }

/* Text selection */
::selection { background: var(--color-accent); color: white; }

/* Firefox frosted glass fallback */
@supports not (backdrop-filter: blur(1px)) {
  .navbar-frosted { background: rgba(255,255,255,0.95) !important; }
}
```

### Pattern 3: Sticky Sidebar TOC with Scroll-Spy
**What:** Edition page uses CSS Grid with `grid-cols-[1fr_260px]`. Sidebar cell has `align-self: start` so sticky has room to travel. `useScrollSpy` hook uses `react-intersection-observer` to detect which article section is in view.

**When to use:** EditionPage only.

**Critical constraint:** Parent grid must have NO `overflow: hidden` or `overflow: auto`. This silently breaks `position: sticky`.

**Example:**
```jsx
// src/hooks/useScrollSpy.js
import { useState } from "react";
import { useInView } from "react-intersection-observer";

// Use inside ArticleSection — one hook call per section
export function useScrollSpy(id, onInView) {
  const { ref } = useInView({
    rootMargin: "-80px 0px -85% 0px",
    onChange: (inView) => { if (inView) onInView(id); },
  });
  return ref;
}

// src/pages/EditionPage.jsx — two-column layout
function EditionPage() {
  const [activeId, setActiveId] = useState(null);
  // ...
  return (
    // NO overflow: hidden on this element
    <div className="max-w-[1240px] mx-auto px-6">
      <div className="grid lg:grid-cols-[1fr_260px] gap-8">
        <main>
          {articles.map(article => (
            <ArticleSection
              key={article.id}
              article={article}
              onInView={setActiveId}
            />
          ))}
        </main>
        {/* align-self: start is critical for sticky to work */}
        <aside className="hidden lg:block self-start sticky top-[80px]">
          <SidebarTOC articles={articles} activeId={activeId} />
        </aside>
      </div>
    </div>
  );
}
```

### Pattern 4: TOC Click Scroll (Imperative — NOT Hash URLs)
**What:** TOC link clicks use `document.getElementById(id).scrollIntoView({ behavior: "smooth", block: "start" })` rather than `href="#id"` anchor links. This bypasses React Router's scroll restoration entirely.

**Why:** React Router's scroll restoration conflicts with hash-based anchor scrolling. The imperative approach is simpler and has no side effects.

```jsx
// src/components/edition/SidebarTOC.jsx
function TOCEntry({ article, isActive }) {
  const handleClick = (e) => {
    e.preventDefault();
    const el = document.getElementById(article.id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return (
    <button
      onClick={handleClick}
      className={isActive
        ? "border-l-2 border-accent text-accent font-bold pl-3"
        : "text-text-3 hover:text-text pl-3 transition-colors"}
    >
      {article.title}
    </button>
  );
}
```

### Pattern 5: Card Hover Lift (Framer Motion)
**What:** Cards use `motion.article` with `whileHover` spring. Animate only GPU-composited properties (`y`, `opacity`, `scale`) — never `height`, `width`, `padding`, or `backgroundColor`.

```jsx
// Source: STACK.md, verified against motion.dev docs
import { motion } from "framer-motion";

<motion.article
  whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(0,0,0,0.10)" }}
  transition={{ type: "spring", stiffness: 400, damping: 30 }}
  className="rounded-2xl border border-border bg-card-bg overflow-hidden"
>
```

### Pattern 6: Category Color Map (Single Source of Truth)
**What:** `utils/colorClasses.js` exports a lookup object used by `CategoryPill` and anywhere else category colors are needed. The current codebase duplicates this in both page files — this phase extracts it once.

```js
// src/utils/colorClasses.js
export const colorClasses = {
  infrastructure: {
    pill: "bg-accent-soft text-accent",
    dot: "bg-accent",
    label: "Infrastructure",
  },
  robotics: {
    pill: "bg-sky-soft text-sky",
    dot: "bg-sky",
    label: "Robotics",
  },
  tools: {
    pill: "bg-violet-soft text-violet",
    dot: "bg-violet",
    label: "Dev Tools",
  },
  creative: {
    pill: "bg-pink-soft text-pink",
    dot: "bg-pink",
    label: "Creative AI",
  },
  industry: {
    pill: "bg-emerald-soft text-emerald",
    dot: "bg-emerald",
    label: "Industry",
  },
};
```

### Pattern 7: `cn()` Utility
```js
// src/lib/cn.js
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
```

### Anti-Patterns to Avoid

- **Dark CSS variable names with light values:** Never change hex values in-place on `--color-bg`, `--color-surface` etc. Rename to semantic names. Wrong: `--color-bg: #FAFAF9`. Right: `--color-page-bg: #FAFAF9`.
- **`tailwind.config.js` in Tailwind v4 project:** All tokens in `@theme {}` in `index.css`. A JS config file is silently ignored by Tailwind v4.
- **`overflow: hidden` on sticky TOC parent:** Any ancestor between the sidebar and scroll container with `overflow` set breaks `position: sticky`. Use CSS Grid, no overflow.
- **Scroll event listeners for TOC:** `window.addEventListener('scroll', getBoundingClientRect)` causes layout thrashing on every frame. Use `IntersectionObserver` via `react-intersection-observer` instead.
- **Hash URL anchors for TOC clicks:** `<a href="#article-id">` triggers React Router scroll restoration conflicts. Use imperative `scrollIntoView`.
- **Framer Motion animating layout properties on cards:** `whileHover` must only use `y`, `scale`, `opacity` — not `width`, `height`, `padding`, `backgroundColor`. Layout properties cause repaint jank on card grids.
- **Hardcoded category list in JSX:** Do not hardcode which categories render. Derive from `categories.filter(c => articles.some(a => a.category === c.id))`.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Conditional Tailwind class merging | Custom string concat / template literals | `clsx` + `tailwind-merge` | `tailwind-merge` resolves class conflicts (e.g., `p-4` vs `p-6`) that naive string concat cannot |
| TOC active section detection | `scroll` event + `getBoundingClientRect` | `react-intersection-observer` (useInView) | Scroll listeners cause layout thrashing; IntersectionObserver is async/off-main-thread |
| Variable font self-hosting | Manual WOFF2 file management | `@fontsource-variable/manrope` | Fontsource integrates with Vite build pipeline, handles `font-display: swap`, correct subset loading |
| Article body typography | Manually styled `<p>` and `<h2>` tags | `@tailwindcss/typography` (`prose` classes) | 50+ lines of CSS for line-height, measure, rhythm — typography plugin gives editorial-quality defaults |
| Smooth scroll to section | `react-scroll` library | CSS `scroll-behavior: smooth` + imperative `scrollIntoView` | Native CSS; zero bundle cost; `react-scroll` last updated 2023 and adds ~12kB for nothing |

**Key insight:** The hard problems in this phase (scroll-spy, class merging, font loading) all have well-maintained 3–4kB packages that handle edge cases. The "roll your own" temptation is highest for scroll-spy — resist it.

---

## Common Pitfalls

### Pitfall 1: Dark CSS Variable Names Left After Light Theme Migration
**What goes wrong:** Renaming hex values but not the variable names. `--color-bg: #FAFAF9` is semantically wrong and prevents future dark mode. Tailwind utility classes like `bg-bg` become meaningless.
**Why it happens:** Feels faster to change values than names since names are already wired through components.
**How to avoid:** In Wave 1, replace the entire `@theme` block with the semantic token set from the UI-SPEC. Do NOT patch old tokens. Remove all 14 existing dark-named variables.
**Warning signs:** `var(--color-bg)` appears in CSS but the value is a light hex. `--color-surface` exists alongside `--color-card-bg`.

### Pitfall 2: `overflow: hidden` on the Edition Page Two-Column Parent
**What goes wrong:** The sticky TOC sidebar scrolls away with the page content. No error is thrown — it just doesn't stick. This is only detectable by scrolling the full page.
**Why it happens:** Developers often add `overflow: hidden` to two-column wrappers to prevent horizontal scroll bleed. This silently invalidates `position: sticky`.
**How to avoid:** The `grid lg:grid-cols-[1fr_260px]` wrapper must have NO overflow constraints. Confirm with Chrome DevTools "Sticky" badge on the sidebar element. Set `self-start` (Tailwind: `self-start`) on the sidebar grid cell.
**Warning signs:** Sidebar scrolls away despite `sticky top-[80px]` class. Parent elements have `overflow-hidden` or `overflow-x-hidden`.

### Pitfall 3: Tailwind v4 — `tailwind.config.js` Silently Ignored
**What goes wrong:** Custom colors/fonts defined in a JS config file have no effect. Build succeeds but tokens are missing.
**Why it happens:** Every pre-2025 tutorial uses `tailwind.config.js`. Muscle memory creates the file.
**How to avoid:** All tokens in `@theme {}` in `index.css`. Verify Tailwind v4 is active by checking `vite.config.js` uses `@tailwindcss/vite` (confirmed present). Never create `tailwind.config.js`.

### Pitfall 4: `framer-motion` in `devDependencies` Breaks Production CI
**What goes wrong:** CI pipeline running `npm install --production` does not install framer-motion. Build fails with "Cannot find module 'framer-motion'".
**Why it happens:** Vite bundles devDeps locally, masking the miscategorization entirely during dev.
**How to avoid:** First action in Wave 1 — `npm install framer-motion --save`. One-line fix.

### Pitfall 5: Scroll-Spy `rootMargin` Misconfigured
**What goes wrong:** TOC highlights wrong section. Last section may never activate. Sections jump erratically during fast scroll.
**Why it happens:** Default IntersectionObserver threshold `0` fires at viewport edge, not at reading position.
**How to avoid:** Use `rootMargin: "-80px 0px -85% 0px"`. The `80px` matches the navbar height (64px h-16 + 16px buffer). This value is documented in STATE.md and UI-SPEC.md. Do not use the value from ARCHITECTURE.md (`-50%`) — it's the earlier less-accurate version.

### Pitfall 6: React Router Scroll Restoration Conflict with TOC Anchors
**What goes wrong:** TOC clicks change URL hash, React Router's scroll restoration fires and scrolls to a different position than expected.
**Why it happens:** Using `<a href="#article-id">` for TOC links triggers both browser native hash scroll and React Router's `ScrollRestoration` component.
**How to avoid:** Use `<button onClick={() => document.getElementById(id).scrollIntoView(...)}` — no href, no hash URL change. Document this decision in code comments.

### Pitfall 7: Google Fonts `<link>` Left in `index.html` After Fontsource Migration
**What goes wrong:** Both the Fontsource-bundled font AND the Google Fonts CDN request load. Users get the CDN FOUT plus an unnecessary external DNS lookup.
**Why it happens:** `index.html` currently has `<link href="https://fonts.googleapis.com/...">` which is easy to forget to remove.
**How to avoid:** When adding `@fontsource-variable/manrope` import to `main.jsx`, simultaneously remove the Google Fonts `<link>` from `index.html`. These are paired actions.

### Pitfall 8: `ArticlePage` Route Left Alive After Edition Page Migration
**What goes wrong:** The old `/article/:id` route still renders the dark-themed `ArticlePage.jsx`. If any existing links point there, users land on the old dark page.
**Why it happens:** `App.jsx` currently has `<Route path="/article/:id" element={<ArticlePage />} />`. If not removed or redirected, both old and new routes coexist.
**How to avoid:** In Wave 3 when adding new routes, simultaneously remove the old `/article/:id` route from `App.jsx` and delete `ArticlePage.jsx`. The new EditionPage with inline article sections replaces it entirely.

---

## Code Examples

### Complete `index.css` Structure (Wave 1)
```css
@import "tailwindcss";
@plugin "@tailwindcss/typography";

@theme {
  --color-page-bg: #FAFAF9;
  --color-section-alt: #FFFFFF;
  --color-card-bg: #FFFFFF;
  --color-sidebar-bg: #F5F4F2;
  --color-nav-bg: rgba(255,255,255,0.75);
  --color-footer-bg: #1C1917;
  --color-footer-text: #A8A29E;
  --color-border: #D6D3D1;
  --color-border-subtle: #E7E5E4;
  --color-text: #1C1917;
  --color-text-2: #57534E;
  --color-text-3: #A8A29E;
  --color-accent: #EA580C;
  --color-accent-soft: rgba(234,88,12,0.10);
  --color-sky: #0EA5E9;
  --color-sky-soft: rgba(14,165,233,0.10);
  --color-violet: #7C3AED;
  --color-violet-soft: rgba(124,58,237,0.10);
  --color-pink: #DB2777;
  --color-pink-soft: rgba(219,39,119,0.10);
  --color-emerald: #059669;
  --color-emerald-soft: rgba(5,150,105,0.10);
  --font-sans: "Manrope Variable", ui-sans-serif, system-ui, sans-serif;
}

* { margin: 0; padding: 0; box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  background: var(--color-page-bg);
  color: var(--color-text);
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
  min-height: 100vh;
}
section[id] { scroll-margin-top: 80px; }
::selection { background: var(--color-accent); color: white; }
@supports not (backdrop-filter: blur(1px)) {
  .navbar-frosted { background: rgba(255,255,255,0.95) !important; }
}
```

### `main.jsx` Updates (Wave 1)
```jsx
// Add at top of imports — BEFORE any React/Router imports
import "@fontsource-variable/manrope";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
```

### `App.jsx` Route Updates (Wave 3)
```jsx
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import EditionPage from "./pages/EditionPage";
import ArchivePage from "./pages/ArchivePage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/edition/:slug" element={<EditionPage />} />
      <Route path="/archive" element={<ArchivePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
```

### Frosted Glass Navbar (Wave 2)
```jsx
// src/components/layout/Navbar.jsx
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar-frosted sticky top-0 z-50 backdrop-blur-md bg-nav-bg border-b border-border-subtle h-16">
      <div className="max-w-[1240px] mx-auto px-6 h-full flex items-center justify-between">
        <Link to="/" className="text-[13px] font-[800] text-text tracking-tight">
          The Gradient
        </Link>
        <div className="flex items-center gap-6">
          <Link to="/" className="text-[13px] font-[800] text-text-3 hover:text-text transition-colors">Home</Link>
          <Link to="/archive" className="text-[13px] font-[800] text-text-3 hover:text-text transition-colors">Archive</Link>
        </div>
      </div>
    </nav>
  );
}
```

### Edition Page Layout (Wave 3)
```jsx
// src/pages/EditionPage.jsx — critical layout rules
export default function EditionPage() {
  const { slug } = useParams();
  const edition = getEdition(slug);
  const [activeId, setActiveId] = useState(null);

  if (!edition) {
    return <div>Edition not found. <Link to="/archive">Return to archive.</Link></div>;
  }

  return (
    <>
      <Navbar />
      {/* NO overflow: hidden on this wrapper */}
      <div className="max-w-[1240px] mx-auto px-6 py-[100px]">
        <div className="grid lg:grid-cols-[1fr_260px] gap-8">
          <main>
            {edition.articles.map(article => (
              <ArticleSection
                key={article.id}
                article={article}
                onInView={setActiveId}
              />
            ))}
          </main>
          {/* self-start + sticky — both required */}
          <aside className="hidden lg:block self-start sticky top-20">
            <SidebarTOC articles={edition.articles} activeId={activeId} />
          </aside>
        </div>
      </div>
      <Footer />
    </>
  );
}
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `framer-motion` package | `motion` package (`motion/react` import) | 2025 — Motion v11 rebrand | `framer-motion@12` still works; migration to `motion` is optional for this phase, keep existing |
| Tailwind `tailwind.config.js` | Tailwind v4 `@theme {}` in CSS | Tailwind v4 (Jan 2025) | JS config silently ignored; all tokens in CSS |
| Google Fonts `<link>` in HTML | `@fontsource-variable/manrope` import in JS | Fontsource self-hosting best practice | Zero CDN dependency; bundled with Vite |
| `tailwind-merge` v2 | `tailwind-merge` v3 | March 2025 — v3.0.0 release | v2 silently breaks with Tailwind v4 class semantics |

**Deprecated/outdated in scope of this phase:**
- `src/data.js` (flat): Replaced by `src/data/editions/january-2026.js` + `src/data/index.js`
- `src/pages/ArticlePage.jsx`: Replaced by `EditionPage.jsx` with inline article sections
- All 14 dark-named `@theme` variables: Replaced by semantic token set
- Google Fonts `<link>` in `index.html`: Replaced by Fontsource import in `main.jsx`

---

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js >= 22 | Vite dev server, npm scripts | Yes | v22.20.0 | — |
| npm >= 11 | Package installs | Yes | 11.6.2 | — |
| `@fontsource-variable/manrope` | Font import | Not installed yet | 5.2.8 on npm | Google Fonts CDN (already in index.html as fallback during install) |
| `clsx` | `cn()` utility | Not installed yet | 2.1.1 on npm | — |
| `tailwind-merge` v3 | `cn()` utility | Not installed yet | 3.5.0 on npm | — |
| `react-intersection-observer` | Scroll-spy TOC | Not installed yet | 10.0.3 on npm | Native IntersectionObserver (more boilerplate but viable) |
| `@tailwindcss/typography` | Article body `prose` | Not installed yet | 0.5.19 on npm | Manual prose CSS (viable but ~50 lines extra CSS) |
| Chrome DevTools | Sticky badge for verifying TOC | Yes | (browser) | Firefox also has sticky debugging |

**Missing dependencies with no fallback:** None — all missing packages are available on npm and the install commands are documented above.

**Missing dependencies with fallback (usable alternatives if npm is unavailable):**
- `react-intersection-observer`: Native `IntersectionObserver` API works without the package; adds ~20 lines of cleanup boilerplate per component.
- `@tailwindcss/typography`: Can style article body manually with Tailwind utilities; not recommended but not blocking.

---

## Open Questions

1. **`ArticlePage.jsx` deprecation strategy**
   - What we know: The old `/article/:id` route will be replaced by `/edition/:slug` with inline article sections.
   - What's unclear: Should `ArticlePage.jsx` be deleted immediately or kept temporarily as a redirect component?
   - Recommendation: Delete immediately when adding new routes in Wave 3. There are no inbound links to preserve (static site, no SEO URLs to protect yet).

2. **Hero card image for EditionPage — is one needed?**
   - What we know: `edition.coverImage` is in the data model shape. The current January edition's most logical cover is `molthub.png`.
   - What's unclear: Should the edition page have a hero/cover image above the TOC + articles layout?
   - Recommendation: Use `articles.find(a => a.featured)?.image` as the cover. No separate `coverImage` field needed for Phase 1.

3. **`dist/` directory committed to git**
   - What we know: `react-newsletter/dist/` is tracked (CONCERNS.md confirms). Root `.gitignore` doesn't exclude it.
   - What's unclear: Should this be cleaned up in Phase 1?
   - Recommendation: Add `react-newsletter/dist/` to root `.gitignore` and untrack it as part of Wave 1 project setup. Low effort, eliminates 13MB of build artifact noise.

---

## Project Constraints (from CLAUDE.md)

These directives are mandatory. Planner must verify compliance before marking any task complete.

| Constraint | Source | Applies To |
|------------|--------|------------|
| React 19, Vite, Tailwind CSS 4, React Router — keep existing stack | CLAUDE.md Tech Stack | All waves |
| No testing — user wants UI focus, no test infrastructure | CLAUDE.md Constraints | Entire phase; no vitest, jest, or testing-library |
| Static content — all content in JS data files, no backend | CLAUDE.md Constraints | Data layer design |
| Color palette must NOT be purple/blue | CLAUDE.md Constraints | CSS tokens, any color decisions |
| PascalCase `.jsx` for components, camelCase `.js` for utilities | CLAUDE.md Naming | Every new file |
| `function` declarations (not arrow functions) for components | CLAUDE.md Code Style | All component files |
| `export default function` for page-level components | CLAUDE.md Code Style | `HomePage`, `EditionPage`, `ArchivePage` |
| Double quotes for JSX string attributes and JS strings | CLAUDE.md Code Style | All files |
| 2-space indentation | CLAUDE.md Code Style | All files |
| Tailwind utility classes exclusively — no inline `style` props | CLAUDE.md CSS/Styling | All component JSX |
| No TypeScript — plain JavaScript JSX | CLAUDE.md Notable Characteristics | All new files must be `.js` or `.jsx` |
| No state management (no Redux, Zustand, Context) — data imported directly | CLAUDE.md Architecture | Data layer; only `useState` for activeId in EditionPage |
| Section separators: `/* ═══════════════ Section Name ═══════════════ */` | CLAUDE.md Comments | Multi-section files |
| Framer Motion `motion.div` with `initial/whileInView` for scroll-reveal | CLAUDE.md Component Patterns | All scroll-reveal animations |
| All custom tokens in `@theme {}` in `index.css` — no `tailwind.config.js` | CLAUDE.md Configuration | CSS token work |

**nyquist_validation:** `false` in `.planning/config.json` — Validation Architecture section omitted as directed.

---

## Sources

### Primary (HIGH confidence)
- Project CONTEXT.md — Locked decisions D-01 through D-12
- Project UI-SPEC.md — Complete design contract (colors, typography, spacing, components, interactions)
- `.planning/research/STACK.md` — All package versions verified; architecture choices documented
- `.planning/research/ARCHITECTURE.md` — Component structure, data flow, build order
- `.planning/research/PITFALLS.md` — 15 documented pitfalls with prevention strategies
- `.planning/codebase/CONCERNS.md` — Direct codebase audit findings
- `.planning/codebase/STRUCTURE.md` — Current file layout
- `npm view [package] version` — All 5 package versions verified live on 2026-03-31
- `react-newsletter/src/data.js` — Current data shape confirmed (9 articles, 5 categories)
- `react-newsletter/src/index.css` — Current dark `@theme` block confirmed (14 dark tokens to replace)
- `react-newsletter/src/App.jsx` — Current routes confirmed (2 routes to be replaced/extended)

### Secondary (MEDIUM confidence)
- readx-template.webflow.io — Primary visual reference (direct site inspection per CONTEXT.md)
- Tailwind CSS v4 official docs — `@theme`, `@plugin`, `backdrop-blur` utilities
- motion.dev official docs — `whileHover`, `whileInView`, animation API
- react-intersection-observer GitHub — v10 API, `useInView` hook signature

### Tertiary (LOW confidence)
- None — all critical claims verified via primary sources or direct code inspection.

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all versions confirmed via npm registry
- Architecture: HIGH — patterns verified in prior research against official docs; cross-checked with existing codebase
- Pitfalls: HIGH — directly observed in existing codebase (framer-motion devDeps, dark tokens, overflow issues documented in CONCERNS.md)
- Color tokens: HIGH — full token set locked in UI-SPEC.md by user decision D-01
- Build order: HIGH — dependency-driven logic verified in ARCHITECTURE.md

**Research date:** 2026-03-31
**Valid until:** 2026-05-01 (stable ecosystem; package versions unlikely to change meaningfully within 30 days)
