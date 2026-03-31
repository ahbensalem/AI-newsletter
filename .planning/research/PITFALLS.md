# Domain Pitfalls

**Domain:** React editorial/newsletter UI redesign (dark-to-light theme migration)
**Project:** The Gradient — AI Newsletter
**Researched:** 2026-03-31
**Confidence:** HIGH (verified against official docs and multiple sources)

---

## Critical Pitfalls

Mistakes that cause rewrites, broken builds, or fundamental rework.

---

### Pitfall 1: Stripping the Dark Color Tokens Without a Semantic Replacement System

**What goes wrong:** The current `index.css` defines all colors as dark-theme CSS variables (`--color-bg: #0B0B0F`, `--color-surface: #131318`, etc.) under the `@theme` block. When redesigning to a light theme, developers often do one of two things: (a) change the hex values in-place, leaving the variable names semantically incorrect (`--color-bg: #FFFFFF` on a dark-named token), or (b) add new variables for light colors while leaving dark ones in place, creating a polluted token namespace that confuses future contributors.

**Why it happens:** Momentum — the existing variables are already wired through all components, so it feels faster to just change the hex values. The renaming cost feels high relative to shipping visuals quickly.

**Consequences:** Any future dark-mode toggle becomes impossible without a full rewrite. Color naming diverges from reality, making maintenance opaque. Tailwind v4's `@theme` block means every variable is globally accessible — a misnamed token is a permanent hazard.

**Prevention:** In the first phase of the redesign, replace all dark-specific token names with semantic names before touching any component. Map old tokens to new semantic equivalents:
```
--color-bg           → --color-page-bg
--color-surface      → --color-card-bg
--color-text         → --color-text-primary
--color-text-2       → --color-text-secondary
--color-border       → --color-border-default
```
Define the new palette in semantic names from day one. This is a one-time cost that prevents permanent confusion.

**Warning signs:** You see `var(--color-bg)` with a light hex value in the CSS file. Variable names contain words like "surface" or "dark" that no longer match their values.

**Phase:** Address in Phase 1 (design tokens / CSS foundations), before any component work begins.

---

### Pitfall 2: Tailwind CSS v4 — Treating `tailwind.config.js` as Still Authoritative

**What goes wrong:** The project is already on Tailwind v4 (confirmed via `vite.config.js` using `@tailwindcss/vite` and `index.css` using `@import "tailwindcss"`). However, if a developer creates or edits a `tailwind.config.js` file out of habit from v3, that config is not automatically picked up — v4's CSS-first model ignores it unless explicitly bridged. This causes custom colors, fonts, and breakpoints defined in JS to silently have no effect.

**Why it happens:** The v3 → v4 shift is recent and counterintuitive. Every tutorial before early 2025 shows `tailwind.config.js`. Muscle memory is strong.

**Consequences:** Custom design tokens added to a JS config file are invisible to the build. Hours are spent debugging why custom colors "don't work" when the real issue is they were defined in the wrong place.

**Prevention:** All custom tokens belong in the `@theme { }` block inside `index.css` (already established in this project). Never create a `tailwind.config.js`. When looking up Tailwind docs or StackOverflow answers, verify whether the answer applies to v3 or v4 — the configuration model is completely different.

**Warning signs:** A `tailwind.config.js` file appears in the project root. Custom color tokens are defined in JS but produce no output. Arbitrary values like `bg-[#FF4D00]` are used in place of theme tokens — a sign someone gave up on configuration.

**Phase:** Relevant throughout all phases. Establish the rule explicitly in Phase 1.

---

### Pitfall 3: Frosted Glass Navbar — Firefox `position: sticky` + `backdrop-filter` Bug

**What goes wrong:** The frosted glass navbar effect (`backdrop-filter: blur()`) combined with `position: sticky` has a documented Firefox bug: if any ancestor of the sticky element has both `overflow` set and `border-radius` set, `backdrop-filter` stops working entirely. The blur disappears on Firefox and the navbar renders as fully transparent or with no blurring.

**Why it happens:** This is a browser implementation bug, not a developer error. It is invisible during development in Chrome/Safari, and only surfaces during cross-browser QA.

**Consequences:** The navbar looks broken on Firefox (approximately 4% of users). The frosted effect is a key visual component of the readx-inspired redesign — broken glass destroys the aesthetic.

**Prevention:** When implementing the frosted navbar:
1. Avoid nesting the navbar inside any element with both `overflow: hidden/auto` and `border-radius`.
2. Add `@supports (backdrop-filter: blur(1px))` fallback — solid semi-transparent background for browsers where the effect fails.
3. Test in Firefox explicitly during the navbar implementation phase, not at the end.
4. Add `-webkit-backdrop-filter` prefix alongside `backdrop-filter` for Safari compatibility.

**Warning signs:** Navbar appears fully transparent (no blur, no tint) in Firefox. The navbar ancestor has `overflow: hidden` plus `rounded-*`.

**Phase:** Address in Phase 2 (navbar component) during implementation, not post-launch QA.

---

### Pitfall 4: Framer Motion Animating Layout-Affecting Properties on Card Grids

**What goes wrong:** Framer Motion performs well when animating `opacity` and `transform` (GPU-composited). On a card grid with 9+ articles, animating `height`, `width`, `padding`, or `backgroundColor` instead forces the browser through layout recalculation and repaint on every animation frame, causing visible jank. The existing code uses `initial={{ opacity: 0, y: 20 }}` which is safe — but if card hover effects are added later using `whileHover={{ scale: 1.02, height: "..." }}`, the `height` animation breaks performance.

**Why it happens:** Hover animations on cards feel natural to add interactively. `scale` looks similar to a `width`/`height` change but is fundamentally different (compositor vs. layout). The distinction is not obvious to developers without animation optimization background.

**Consequences:** On pages with many cards (future multi-edition archive page), jank is visible even on mid-range hardware. Mobile devices with lower GPU memory are the worst affected.

**Prevention:** Restrict all Framer Motion card animations to `opacity`, `scale`, `x`, `y`, and `rotate` only. Never animate `width`, `height`, `padding`, `margin`, `backgroundColor`, or `borderRadius` via Framer Motion on repeating list items. For scale effects, ensure `transform-origin` is correct so cards scale toward their center, not a corner.

Use `LazyMotion` with `domAnimations` feature set to reduce bundle size from ~34KB to ~6KB:
```jsx
import { LazyMotion, domAnimations, m } from "framer-motion";
// wrap app root with <LazyMotion features={domAnimations}>
// use <m.div> instead of <motion.div>
```

**Warning signs:** FPS drops in Chrome DevTools Performance tab during card hover. `motion.div` elements have `whileHover` with non-transform CSS properties. The `framer-motion` bundle is not code-split.

**Phase:** Establish animation rules in Phase 2 (card components). The `LazyMotion` optimization is a Phase 1 concern (main.jsx setup).

---

### Pitfall 5: Sticky Sidebar TOC — `overflow: hidden` on Parent Breaks `position: sticky`

**What goes wrong:** `position: sticky` requires that no ancestor between the sticky element and the scroll container has `overflow: hidden` or `overflow: auto` set. On editorial layouts with multi-column designs, it is common to set `overflow: hidden` on a content wrapper to prevent horizontal scroll bleed. This silently prevents the sidebar TOC from sticking at all — it scrolls normally with the page content.

**Why it happens:** The overflow constraint on sticky is a browser spec detail that is easy to forget. The breakage is silent — the sidebar just scrolls away without any error.

**Consequences:** The sticky TOC, a core UX feature of the monthly edition pages, does not function. This is only detectable by scrolling the full page during testing.

**Prevention:**
1. The two-column layout wrapper must use `display: grid` or `display: flex` with no `overflow` constraints.
2. Use the browser DevTools "Sticky" badge in the Elements panel (Chrome) to verify sticky is active.
3. The sidebar height boundary: set a `max-height` + `overflow-y: auto` on the sidebar itself (not its parent) so long TOCs scroll independently.

**Warning signs:** Sidebar TOC scrolls away with page content despite `position: sticky`. Parent containers have `overflow: hidden` alongside flex/grid column layouts.

**Phase:** Address in Phase 3 (monthly edition page layout). Verify with scroll test before marking complete.

---

### Pitfall 6: `data.js` Single-File Architecture Breaks Multi-Edition Support

**What goes wrong:** The current `data.js` file holds all articles for a single edition flat in one export. Adding a February 2026 edition means either (a) replacing January's data entirely — destroying backward navigation — or (b) adding both months' articles into the same flat array with a manual `month` discriminator field, which makes the `data.js` file grow proportionally with each edition and has no structure for the archive page.

**Why it happens:** The flat-file approach was sufficient for the initial single-edition MVP. It was never designed for multi-edition support.

**Consequences:** The archive page (a project requirement) is impossible to build cleanly without a per-edition data structure. The monthly edition routing (`/edition/january-2026`) cannot work without edition-level identifiers. This is a blocker for the archive feature.

**Prevention:** Before building any new UI, migrate to a per-edition module structure:
```
src/data/
  index.js          ← re-exports all editions, edition registry
  january-2026.js   ← migrated from current data.js
  february-2026.js  ← future
```

Each edition module exports `{ edition, articles, categories }`. The index builds a `editions` array for the archive page. This is a non-breaking refactor that unlocks all multi-edition features.

**Warning signs:** The `data.js` file contains articles from multiple months mixed together. Route parameters reference edition dates but data has no corresponding edition identifiers. The archive page renders a hardcoded list.

**Phase:** Address in Phase 1 (data model refactor), before any new page components are built.

---

## Moderate Pitfalls

---

### Pitfall 7: Google Fonts Manrope — Render-Blocking Without `font-display: swap`

**What goes wrong:** The current `index.html` loads Manrope via Google Fonts with `display=swap` already appended (confirmed: `?family=Manrope:wght@300;400;500;600;700;800&display=swap`). This is correct. The moderate risk is the `<link rel="stylesheet">` for Google Fonts itself — while `preconnect` hints are present, the stylesheet is still a render-blocking external request. On slow connections, users see either invisible text (FOIT) or a fallback font flash (FOUT) for 100–300ms before Manrope loads.

**Why it happens:** External font loading inherently adds a network round-trip. The `preconnect` hints help but do not eliminate the dependency.

**Prevention for the redesign:** Switch to self-hosted fonts using `@fontsource/manrope`:
```bash
npm install @fontsource/manrope
```
```js
// main.jsx
import '@fontsource/manrope/400.css';
import '@fontsource/manrope/600.css';
import '@fontsource/manrope/700.css';
import '@fontsource/manrope/800.css';
```
Self-hosted fonts are bundled with the app, eliminating the external DNS lookup and stylesheet request. This also resolves GDPR concerns with Google Fonts tracking EU visitor IPs.

**Warning signs:** Lighthouse "Eliminate render-blocking resources" flags the Google Fonts stylesheet. Visible font swap flash on first load. `display=swap` is missing from the Google Fonts URL (not the case currently, but watch for accidental URL edits).

**Phase:** Address in Phase 1 (project setup), swap Google Fonts for `@fontsource/manrope` before building any components.

---

### Pitfall 8: Image Weight — WebP Conversion Skipped in Favor of Compression-Only

**What goes wrong:** A common shortcut is running PNG/JPEG images through a compressor (TinyPNG, etc.) and calling optimization done. The `llama4scout.png` at 8.7MB compressed to 3MB is still 3MB. The correct path is format conversion: PNG → WebP delivers ~30% size reduction over compressed PNG; PNG → AVIF delivers ~50% reduction. For images like `molthub.png` (284KB hero card image), WebP brings it under 100KB — meaningful for LCP score.

**Why it happens:** Format conversion requires a build-time tooling step that developers defer. The `vite-plugin-image-optimizer` is the right tool but requires configuration.

**Consequences:** LCP (Largest Contentful Paint) remains above 2.5s on average connections. Hero card images are the LCP element on the home page. Poor Core Web Vitals affect SEO.

**Prevention:** Install `vite-plugin-image-optimizer` and configure WebP/AVIF output. Remove the unused `llama4scout.png` (8.7MB) and `soarxiv.png` (2.1MB) before optimizing — do not waste cycles on unused assets. Use `<img loading="lazy">` on all below-the-fold article card images; only the hero featured article image should be `loading="eager"`.

**Warning signs:** `public/` contains `.png` files above 500KB. Lighthouse LCP is above 2.5s. No `srcset` attributes on article card images.

**Phase:** Address in Phase 2 (image audit and optimization), before the new card components are built. Removing unused images is Phase 1 cleanup.

---

### Pitfall 9: Scroll-Spy TOC — Debounce and `rootMargin` Misconfiguration

**What goes wrong:** `IntersectionObserver`-based scroll-spy highlights the wrong TOC entry when sections are tall (longer than one viewport) or when the user scrolls quickly past multiple sections. Without `rootMargin`, the observer fires when the section hits the very top of the viewport — but by the time the user reads the first line, the next section is already 50% visible, causing the TOC to jump ahead.

**Why it happens:** The default `IntersectionObserver` threshold of `0` triggers at the exact edge of the viewport. Editorial sections with long text need a `rootMargin: "-10% 0px -85% 0px"` or similar top-biased margin to make the active section match what the user is reading.

**Consequences:** The sticky TOC highlights the wrong section, confusing navigation. Users lose trust in the TOC as a navigation tool.

**Prevention:** Use `rootMargin: "-80px 0px -85% 0px"` (accounting for the frosted navbar height of ~64px plus buffer) so the active section is the one near the top of the reading area, not just any section in the viewport. The `80px` must match the actual navbar height — this is a concrete dependency between the navbar implementation and the TOC.

**Warning signs:** TOC highlights jump erratically during fast scrolling. The last TOC item never activates (section ends before it reaches the trigger zone). Multiple TOC items highlight simultaneously.

**Phase:** Address in Phase 3 (monthly edition page). The `rootMargin` value cannot be finalized until the navbar height is known from Phase 2.

---

### Pitfall 10: `framer-motion` Listed as `devDependency`

**What goes wrong:** `framer-motion` is currently in `devDependencies` in `package.json` (confirmed by CONCERNS.md). This is semantically wrong — Framer Motion is a runtime dependency. Some CI/CD pipelines that run `npm install --production` will not install it, causing build failures in deployment.

**Why it happens:** Vite bundles `devDependencies` the same as `dependencies` during local development, masking the miscategorization entirely.

**Consequences:** Production builds in strict CI environments fail with "Cannot find module 'framer-motion'" errors. The error only surfaces in deployment, not local dev.

**Prevention:** Move `framer-motion` to `dependencies` before any new deployment configuration is added. One-line fix: `npm install framer-motion --save`.

**Warning signs:** `package.json` shows `framer-motion` under `devDependencies`. CI pipeline fails on deploy step but not on local build.

**Phase:** Fix in Phase 1 (project setup). Zero-risk, zero-effort correction.

---

### Pitfall 11: Color Palette — Avoiding Purple/Blue But Accidentally Recreating Them via Adjacent Hues

**What goes wrong:** "No purple/blue" is a stated constraint. Adjacent hues — indigo, violet, lavender, slate-blue, cyan, teal — read as purple or blue to most viewers despite technically being different colors. An editorial palette built around indigo cards with teal accents still reads as "corporate tech blue." The constraint is about visual perception, not hex codes.

**Why it happens:** Designers trying to avoid blue pivot to teal (a blue-green), or trying to avoid purple pivot to indigo (a blue-purple). These are partial solutions that violate the spirit of the constraint.

**Consequences:** The redesign is completed but still reads as "another AI product with blue branding." The client goal of a fresh, distinct identity is not achieved.

**Prevention:** The existing orange accent (`#FF4D00`) is a strong foundation — warm, energetic, and genuinely distinct from tech-blue. A palette anchored by warm orange/amber accents with neutral grays, warm whites, and perhaps a forest green or earthy red for category colors achieves the "fresh, modern, techy" brief without triggering the blue-family perception. Avoid: indigo, teal, cyan, sky, violet, lavender, cerulean, cobalt.

**Warning signs:** The color palette review shows any hue with a blue undertone. Tailwind color names like `indigo-`, `sky-`, `cyan-`, `teal-`, `violet-`, `purple-` appear in the redesign's token file.

**Phase:** Decision in Phase 1 (color token definition). Lock palette before any component work.

---

## Minor Pitfalls

---

### Pitfall 12: `position: sticky` Fails Inside CSS Grid Cells on Some Browsers

**What goes wrong:** The sidebar TOC uses `position: sticky` inside a CSS grid cell. In some older browser versions, sticky inside a grid cell does not work unless the grid track has an explicit height or `align-self` is set correctly. Without `align-self: start` on the sticky sidebar grid cell, the cell stretches to match the content column height and sticky has no room to scroll within.

**Prevention:** Always set `align-self: start` on the sidebar grid column item. The grid row should be `min-height: 0` not `height: 100%`. Verify sticky activates using DevTools "Sticky" indicator.

**Phase:** Phase 3 (monthly edition layout).

---

### Pitfall 13: React Router v7 Anchor Link Navigation Conflicts With SPA Scroll Restoration

**What goes wrong:** The monthly edition page uses anchor links (`#section-id`) to scroll to article sections via the sticky TOC. React Router's `ScrollRestoration` component — when used — tries to restore scroll position on navigation, which conflicts with hash-based anchor scrolling. The browser's native hash navigation fires, then `ScrollRestoration` potentially overrides it.

**Prevention:** Implement scroll-to behavior imperatively for TOC clicks using `element.scrollIntoView({ behavior: 'smooth' })` via `useRef` or `document.getElementById`, rather than relying on URL hash changes. This bypasses React Router's scroll restoration entirely for within-page navigation. The `<ScrollRestoration>` component is not needed for this SPA since it lacks server-side rendering.

**Phase:** Phase 3 (monthly edition page and sticky TOC).

---

### Pitfall 14: `backdrop-filter` Performance on Low-End Mobile Devices

**What goes wrong:** `backdrop-filter: blur()` is GPU-intensive. A frosted navbar that blurs content behind it on scroll requires the GPU to re-composite on every scroll frame. On mid-range Android devices, this causes scroll jank if the blur radius is too high or the blurred area is too large.

**Prevention:** Keep blur radius between 8–12px (not 20px+). Add `will-change: transform` to the navbar element only when scrolling (add/remove class on scroll). Use `@supports (backdrop-filter: blur(1px))` to provide a solid fallback for devices where the GPU cost is prohibitive. Test scroll performance on a throttled device profile in Chrome DevTools.

**Phase:** Phase 2 (navbar component).

---

### Pitfall 15: Hardcoded Category List in Homepage Renders Only `["tools", "industry"]`

**What goes wrong:** The current `HomePage.jsx` (line 375 per CONCERNS.md) hardcodes which categories render as `CategorySection` components. Adding new articles to a new category in the data file has no visible effect on the homepage until the hardcoded array is updated. During the redesign, if category sections are rebuilt without removing this hardcode, new categories silently disappear.

**Prevention:** During the data model refactor (Phase 1), derive the category section list from the data itself: `categories.filter(c => articles.some(a => a.category === c.id))`. Never maintain a parallel hardcoded category list alongside the data-driven category registry.

**Phase:** Phase 1 (data model) and Phase 2 (home page category section rebuild).

---

## Phase-Specific Warnings

| Phase Topic | Likely Pitfall | Mitigation |
|---|---|---|
| Phase 1: Design tokens | Dark-named variables with light values | Rename all tokens semantically before touching components |
| Phase 1: Project setup | `framer-motion` in devDependencies | Move to `dependencies` immediately |
| Phase 1: Font loading | Google Fonts render-blocking | Swap to `@fontsource/manrope` in `main.jsx` |
| Phase 1: Data model | Single-file `data.js` blocking multi-edition | Migrate to `src/data/` per-edition module pattern |
| Phase 2: Navbar | Firefox sticky + backdrop-filter bug | Test in Firefox, use `@supports` fallback |
| Phase 2: Card animations | Framer Motion layout-affecting properties | Restrict to `opacity`/`scale`/`y` transforms only |
| Phase 2: Images | PNG files above 500KB in production | Remove unused images, convert used images to WebP |
| Phase 2: Color palette | Blue/purple-adjacent hues creeping in | Lock palette tokens in Phase 1, no blue-family hues |
| Phase 3: Sticky TOC | `overflow: hidden` on parent breaking sticky | Grid layout with no overflow constraints on parent |
| Phase 3: Scroll-spy | Wrong section highlighted | `rootMargin` tuned to navbar height from Phase 2 |
| Phase 3: Anchor links | React Router scroll restoration conflict | Imperative `scrollIntoView` not hash navigation |
| All phases | Tailwind config in JS instead of CSS | All tokens live in `@theme {}` in `index.css` only |

---

## Sources

- [Tailwind CSS v4 Upgrade Guide](https://tailwindcss.com/docs/upgrade-guide) — Official, HIGH confidence
- [Tailwind CSS v4.0 Release Blog](https://tailwindcss.com/blog/tailwindcss-v4) — Official, HIGH confidence
- [Next-level frosted glass with backdrop-filter — Josh W. Comeau](https://www.joshwcomeau.com/css/backdrop-filter/) — MEDIUM confidence
- [Glassmorphism Design: Implementation Guide 2025](https://playground.halfaccessible.com/blog/glassmorphism-design-trend-implementation-guide) — MEDIUM confidence
- [Table of Contents with IntersectionObserver — CSS-Tricks](https://css-tricks.com/table-of-contents-with-intersectionobserver/) — MEDIUM confidence
- [Framer Motion Performance Tips — Tillitsdone](https://tillitsdone.com/blogs/framer-motion-performance-tips/) — MEDIUM confidence
- [Self host Google fonts for better Core Web Vitals](https://www.corewebvitals.io/pagespeed/self-host-google-fonts) — MEDIUM confidence
- [vite-plugin-image-optimizer — npm](https://www.npmjs.com/package/vite-plugin-image-optimizer) — HIGH confidence
- [ScrollRestoration — React Router Docs](https://reactrouter.com/api/components/ScrollRestoration) — HIGH confidence
- Project codebase audit: `.planning/codebase/CONCERNS.md` — HIGH confidence (direct inspection)
