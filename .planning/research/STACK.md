# Technology Stack

**Project:** The Gradient — Newsletter UI Redesign
**Researched:** 2026-03-31
**Overall confidence:** HIGH (all core choices verified against official docs or current npm)

---

## Existing Stack (Keep As-Is)

These are already installed. No changes needed.

| Technology | Version (installed) | Purpose |
|------------|--------------------|---------| 
| React | ^19.2.4 | UI framework |
| Vite | ^8.0.1 | Build tool |
| Tailwind CSS | ^4.2.2 | Utility styling |
| @tailwindcss/vite | ^4.2.2 | Vite integration for Tailwind v4 |
| React Router DOM | ^7.13.2 | Client-side routing |
| Framer Motion (devDep) | ^12.38.0 | Scroll + card animations |
| Lucide React | ^1.7.0 | Icons |

**Note on Framer Motion package name:** The `framer-motion` package was renamed to `motion` in 2025 (now `motion/react` import path). The installed `framer-motion@12` still works but is no longer actively developed. Migration to the `motion` package is optional for this milestone but recommended — it is a drop-in swap (`npm uninstall framer-motion && npm install motion`, then change imports to `"motion/react"`). The API is 100% identical.

**Note on Lucide React version:** The installed version `^1.7.0` is already the current stable version (v1.7.0, published March 2026). No action needed.

---

## Recommended Additions

### 1. Typography: Manrope Variable Font via Fontsource

| Package | Version | Purpose | Why |
|---------|---------|---------|-----|
| `@fontsource-variable/manrope` | `^5.x` | Self-hosted variable font | Exact font used by Readx. Fontsource bundles fonts into Vite build — no Google Fonts CDN request, no FOUC, works offline. Variable weight axis (300–800) enables rich editorial hierarchy with one font file. |

**Install:**
```bash
npm install @fontsource-variable/manrope
```

**Usage in `main.jsx` (or `index.css`):**
```js
import "@fontsource-variable/manrope";
```

**Tailwind CSS 4 theme token:**
```css
@theme {
  --font-sans: "Manrope Variable", ui-sans-serif, system-ui, sans-serif;
}
```

**Confidence:** HIGH — Fontsource is the canonical self-hosting solution for Vite projects. Manrope confirmed as Readx reference font via direct site inspection.

---

### 2. Class Merging Utilities: clsx + tailwind-merge

| Package | Version | Purpose | Why |
|---------|---------|---------|-----|
| `clsx` | `^2.1.1` | Conditional class construction | Clean conditional className logic in components |
| `tailwind-merge` | `^3.5.0` | Tailwind class conflict resolution | Tailwind v4 support added in v3.0.0. Required for component variant patterns where overrides must win without duplication bugs. |

**Install:**
```bash
npm install clsx tailwind-merge
```

**Create `src/lib/cn.ts` (or `cn.js`):**
```js
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
```

Why both: `clsx` handles conditionals cleanly (`cn("base", isActive && "text-red-500")`). `tailwind-merge` resolves class conflicts intelligently when caller overrides component defaults. Neither alone covers both needs. `tailwind-merge` v3 is required — v2 does not support Tailwind v4 class semantics.

**Confidence:** HIGH — tailwind-merge v3.5.0 is official; v3 Tailwind v4 support verified via GitHub releases. clsx v2.1.1 verified via GitHub.

---

### 3. Scroll-Spy for Sticky TOC: react-intersection-observer

| Package | Version | Purpose | Why |
|---------|---------|---------|-----|
| `react-intersection-observer` | `^10.0.3` | Active-section detection for TOC | Wraps the native Intersection Observer API. The `useInView` hook with `rootMargin: "-40% 0px -55% 0px"` fires as each article section enters the vertical midpoint of the viewport — this is the standard technique for sticky TOC highlight. Uses a pooled observer (one observer instance shared across all refs), so performance scales to 20+ section headings without cost. |

**Install:**
```bash
npm install react-intersection-observer
```

**Pattern for sticky TOC:**
```jsx
import { useInView } from "react-intersection-observer";

function Section({ id, onInView }) {
  const { ref } = useInView({
    rootMargin: "-40% 0px -55% 0px",
    onChange: (inView) => inView && onInView(id),
  });
  return <section id={id} ref={ref}>...</section>;
}
```

Why not useScroll from Motion: `useScroll` is better for scroll-progress bars and parallax. TOC active-highlighting requires knowing *which element* is in view — that is exactly what Intersection Observer provides. Combining both in the same page is fine (Motion for animations, react-intersection-observer for TOC spy).

Why not native `IntersectionObserver` directly: The native API works, but `react-intersection-observer` avoids ref-management boilerplate, handles unmount cleanup automatically, and pools observers for efficiency. The 3.7kB cost is justified.

**Confidence:** HIGH — v10.0.3 current as of March 2025. Pattern verified against official documentation and established community usage.

---

### 4. Typography Plugin for Article Body: @tailwindcss/typography

| Package | Version | Purpose | Why |
|---------|---------|---------|-----|
| `@tailwindcss/typography` | `^0.5.x` | `prose` classes for article body text | Article detail pages will render body copy as structured text with headings, paragraphs, lists, blockquotes. Manually styling all HTML typography is 50+ lines of CSS. The `prose` plugin gives editorial-quality defaults (line-height, measure, spacing rhythm) in one class. Tailwind v4 compatible via `@plugin` directive. |

**Install:**
```bash
npm install -D @tailwindcss/typography
```

**Activate in CSS (Tailwind v4 method — NO `tailwind.config.js` needed):**
```css
@import "tailwindcss";
@plugin "@tailwindcss/typography";
```

**Usage:**
```jsx
<article className="prose prose-lg prose-invert max-w-none">
  {/* article body */}
</article>
```

**Confidence:** MEDIUM — Tailwind v4 `@plugin` syntax verified via official GitHub README and community sources. Exact latest version not publicly queryable (npm 403), but `^0.5.x` is the stable release line with confirmed v4 support.

---

## Frosted Glass Navbar — No New Package Required

The frosted glass navbar is achieved entirely with Tailwind CSS 4 built-in utilities. No library needed.

**Pattern:**
```jsx
<nav className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-white/20 dark:bg-neutral-950/70">
```

Key classes:
- `backdrop-blur-md` — medium Gaussian blur on what's behind the element
- `bg-white/70` — white at 70% opacity (exposes blurred content beneath)
- `sticky top-0 z-50` — sticks to viewport top, above all content

Tailwind v4 ships `backdrop-blur-*` natively. No custom CSS or plugin required. Confirmed via official Tailwind docs.

**Confidence:** HIGH — native Tailwind v4 utility, verified via tailwindcss.com/docs.

---

## Responsive Grid Layouts — No New Package Required

Tailwind CSS 4's grid utilities cover all needed layouts. No CSS Grid library or additional package is necessary.

**Key patterns for this project:**
```jsx
// Home page: hero + 3-col article grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

// Edition page: sidebar TOC + main content
<div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-8">
```

Tailwind v4's `@theme` enables custom breakpoints if needed, but the default `sm/md/lg/xl/2xl` breakpoints are sufficient.

**Confidence:** HIGH

---

## Color System — Tailwind v4 CSS Custom Properties

No new package. Use Tailwind v4's `@theme` block in `index.css`.

**Recommended palette: Teal/Emerald + Warm Amber accent on neutral slate base**

This avoids purple/blue (Claude/corporate AI cliché) while feeling fresh and tech-forward. Teal reads as "trustworthy + modern tech." Amber reads as "energy + AI signal." Slate neutrals give editorial weight.

```css
@import "tailwindcss";

@theme {
  /* Brand colors */
  --color-brand-teal-50: oklch(97% 0.03 185);
  --color-brand-teal-500: oklch(65% 0.14 185);
  --color-brand-teal-600: oklch(55% 0.14 185);
  --color-brand-teal-900: oklch(25% 0.08 185);

  --color-brand-amber-400: oklch(80% 0.15 75);
  --color-brand-amber-500: oklch(72% 0.18 75);

  /* Neutral base */
  --color-surface-0: oklch(99% 0 0);      /* white */
  --color-surface-50: oklch(97% 0.005 240);  /* off-white */
  --color-surface-900: oklch(15% 0.01 240);  /* near-black */

  /* Typography */
  --font-sans: "Manrope Variable", ui-sans-serif, system-ui, sans-serif;
}
```

Using `oklch` aligns with Tailwind v4's upgraded default palette (all default colors were migrated to oklch in v4 for wider gamut). Custom tokens defined once, available as `text-brand-teal-500`, `bg-brand-amber-400`, etc.

**Confidence:** HIGH — Tailwind v4 oklch + CSS-first @theme verified via official blog post and docs.

---

## Card Hover Animations — Existing Framer Motion Sufficient

The installed `framer-motion@12` (or `motion@12`) handles all card hover effects natively. No new package.

**Pattern:**
```jsx
import { motion } from "framer-motion"; // or "motion/react" after migration

<motion.article
  whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(0,0,0,0.12)" }}
  transition={{ type: "spring", stiffness: 400, damping: 30 }}
  className="rounded-2xl overflow-hidden bg-white"
>
```

`whileHover` with a spring transition gives the "lift" effect used by premium editorial sites. This is identical between `framer-motion` v12 and `motion` v12 — same API, same output.

**Confidence:** HIGH

---

## Smooth Scroll to Section — CSS Only

For the TOC "click → scroll to section" behavior, CSS `scroll-behavior: smooth` combined with `href="#section-id"` anchor links is the correct approach. No react-scroll or scroll library needed.

```css
/* in index.css */
html {
  scroll-behavior: smooth;
}
```

```jsx
// TOC item
<a href="#infrastructure">Infrastructure</a>

// Target section
<section id="infrastructure">...</section>
```

For offset compensation (sticky navbar overlapping the target), use CSS `scroll-margin-top`:
```css
section[id] {
  scroll-margin-top: 80px; /* height of sticky navbar */
}
```

This approach requires zero JavaScript, zero libraries, has no bundle cost, and works perfectly in all modern browsers.

**Why not react-scroll:** `react-scroll` (last major update 2023) adds 12kB for functionality that CSS provides natively. The `react-scrollable-anchor` package was last published 7 years ago. Native CSS scroll is the correct 2025 recommendation.

**Confidence:** HIGH — CSS scroll-behavior is a W3C standard, fully supported in all target browsers.

---

## What NOT to Install

| Package | Why Not |
|---------|---------|
| `react-scroll` | Replaced by native CSS `scroll-behavior: smooth` + anchor links. Adds ~12kB for zero benefit. |
| `react-scrollable-anchor` | 7 years unmaintained. Dead package. |
| `react-anchor-link-smooth-scroll` | Last published 2018. Dead package. |
| `@headlessui/react` | Not needed — all UI primitives (navbar, TOC, cards) are custom with Tailwind. Use only if adding accessible modal/dropdown later. |
| `shadcn/ui` | Component library designed for Tailwind v3. As of research date, full Tailwind v4 support is not confirmed. For a custom editorial design, rolling components is more appropriate. |
| `framer-motion` (new install) | Already installed. Migrate to `motion` package when convenient. Do not add both. |
| `styled-components` or `emotion` | Tailwind v4 CSS-first architecture makes CSS-in-JS redundant. Mixing paradigms creates specificity conflicts. |

---

## Final Install Command

```bash
# Production dependencies
npm install @fontsource-variable/manrope clsx tailwind-merge react-intersection-observer

# Dev dependencies
npm install -D @tailwindcss/typography
```

Total bundle addition: ~35kB (Fontsource variable font WOFF2 loaded separately by browser, not in JS bundle).

---

## Sources

- Motion (formerly Framer Motion) docs: https://motion.dev/docs/react-upgrade-guide
- Motion scroll animations: https://motion.dev/docs/react-scroll-animations
- tailwind-merge v3 release (Tailwind v4 support): https://github.com/dcastil/tailwind-merge/releases
- react-intersection-observer v10.0.0 release: https://github.com/thebuilder/react-intersection-observer/releases/tag/v10.0.0
- Fontsource Manrope variable: https://fontsource.org/fonts/manrope/install
- @tailwindcss/typography v4 integration: https://github.com/tailwindlabs/tailwindcss-typography
- Tailwind CSS v4 @theme design tokens: https://tailwindcss.com/docs/theme
- Tailwind CSS v4 backdrop-blur: https://tailwindcss.com/docs/backdrop-filter-blur
- Tailwind CSS v4 oklch color upgrade: https://tailwindcss.com/blog/tailwindcss-v4
- Readx template reference (direct inspection): https://readx-template.webflow.io/
- clsx v2.1.1: https://github.com/lukeed/clsx
