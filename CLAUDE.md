<!-- GSD:project-start source:PROJECT.md -->
## Project

**The Gradient — Newsletter Redesign**

A modern, eye-catching AI newsletter web app built with React. "The Gradient" curates monthly AI news across categories (Infrastructure, Robotics, Dev Tools, Creative AI, Industry) and presents them in a visually stunning editorial format. The redesign transforms the current dark-themed React app into a clean, readx-inspired design with its own unique identity.

**Core Value:** Each monthly edition is beautifully browsable with clickable sub-articles and a sticky sidebar TOC — readers can effortlessly navigate between articles within any month.

### Constraints

- **Tech stack**: React 19, Vite, Tailwind CSS 4, React Router — keep existing stack
- **No testing**: User explicitly wants UI focus, no test infrastructure
- **Static content**: No backend — all content in JS data files
- **Color palette**: Must NOT be purple/blue (avoid Claude/corporate AI cliché)
<!-- GSD:project-end -->

<!-- GSD:stack-start source:codebase/STACK.md -->
## Technology Stack

## Languages
- JavaScript (JSX) - All React application code in `react-newsletter/src/`
- Python 3.11 - Original Streamlit newsletter app (`app.py`, `content/*.py`)
- CSS - Tailwind CSS v4 with custom theme (`react-newsletter/src/index.css`)
- HTML - Single entry point (`react-newsletter/index.html`)
## Runtime
- Node.js v22.20.0 (detected on system)
- npm 11.6.2
- npm
- Lockfile: `react-newsletter/package-lock.json` (present)
- Python 3.11 (devcontainer: `mcr.microsoft.com/devcontainers/python:1-3.11-bookworm`)
- Streamlit server on port 8501
## Frameworks
- React ^19.2.4 - UI framework (latest React 19 with JSX, no TypeScript)
- React DOM ^19.2.4 - DOM rendering
- React Router DOM ^7.13.2 - Client-side routing (`BrowserRouter` in `react-newsletter/src/main.jsx`)
- Framer Motion ^12.38.0 - Page transitions and UI animations (listed in devDependencies but used in page components)
- Tailwind CSS ^4.2.2 - Utility-first CSS framework (v4 with `@import "tailwindcss"` syntax)
- `@tailwindcss/vite` ^4.2.2 - Vite plugin for Tailwind (replaces PostCSS config)
- Vite ^8.0.1 - Build tool and dev server
- `@vitejs/plugin-react` ^6.0.1 - React Fast Refresh and JSX transform
- ESLint ^9.39.4 - Flat config format (`react-newsletter/eslint.config.js`)
- `eslint-plugin-react-hooks` ^7.0.1 - React hooks rules
- `eslint-plugin-react-refresh` ^0.5.2 - React refresh boundary validation
- `@eslint/js` ^9.39.4 - ESLint recommended rules
- `globals` ^17.4.0 - Browser globals for ESLint
- Lucide React ^1.7.0 - Icon library (ArrowRight, Search, ChevronRight, ArrowLeft, Clock, ExternalLink)
- Streamlit >=1.31.0 - Python web app framework (`app.py`)
- Pillow >=10.0.0 - Image processing for Python app
## Key Dependencies
- `react` ^19.2.4 - Core UI rendering
- `react-dom` ^19.2.4 - DOM mounting (`createRoot` in `react-newsletter/src/main.jsx`)
- `react-router-dom` ^7.13.2 - Routes: `/` (HomePage) and `/article/:id` (ArticlePage)
- `lucide-react` ^1.7.0 - All UI icons throughout pages
- `framer-motion` ^12.38.0 - `motion` components used in `HomePage.jsx` and `ArticlePage.jsx`
- `vite` ^8.0.1 - Dev server, HMR, production bundler
- `tailwindcss` ^4.2.2 - All styling via utility classes
- `@tailwindcss/vite` ^4.2.2 - Tailwind integration as Vite plugin
- `@types/react` ^19.2.14 - React type definitions (no TypeScript in project)
- `@types/react-dom` ^19.2.3 - React DOM type definitions (no TypeScript in project)
## Configuration
- Plugins: `@vitejs/plugin-react`, `@tailwindcss/vite`
- No custom aliases, proxy, or build options configured
- Default output to `react-newsletter/dist/`
- Flat config format (ESLint 9)
- Target: `**/*.{js,jsx}` files
- ECMAScript 2020 with JSX
- Browser globals
- Custom rule: `no-unused-vars` ignores variables starting with uppercase or underscore
- Tailwind CSS v4 `@theme` directive (no separate config file)
- Custom color tokens: bg, surface (3 levels), border (2 levels), text (3 levels)
- Brand colors: accent (#FF4D00), blue, green, purple, pink (each with soft variants)
- Font: Manrope (Google Fonts, loaded in `index.html`)
- Prettier (no `.prettierrc`)
- `.nvmrc` / `.node-version`
- `.env` files
- Jest / Vitest (no test framework installed)
- CI/CD pipelines
- Python 3.11 Bookworm image
- Auto-runs `streamlit run app.py` on attach
- Port 8501 forwarded
- VS Code extensions: Python, Pylance
- Targets the legacy Python app, not the React app
## Build & Scripts
## Platform Requirements
- Node.js >= 22 (current system)
- npm >= 11
- No Docker required for React app (devcontainer is for Python app only)
- Static site - `react-newsletter/dist/` contains built assets
- No server-side rendering
- No API backend required (all data is embedded in `react-newsletter/src/data.js`)
- Requires a static file host that supports SPA routing (React Router uses `BrowserRouter`)
## Notable Characteristics
- **No TypeScript** - Pure JavaScript with JSX despite having `@types/react` installed
- **No test framework** - Zero test infrastructure
- **No formatting tool** - No Prettier or similar configured
- **Static data** - All newsletter content hardcoded in `react-newsletter/src/data.js` (169 lines)
- **No state management** - No Redux, Zustand, or Context API; data imported directly
- **framer-motion in devDependencies** - Listed as devDep but is a runtime dependency (should be in dependencies)
<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->
## Conventions

## Naming Patterns
- React components: PascalCase `.jsx` files — `HomePage.jsx`, `ArticlePage.jsx`
- Data/utility files: camelCase `.js` files — `data.js`
- CSS files: PascalCase matching component — `App.css`, or lowercase global — `index.css`
- Pages live in `src/pages/` directory with PascalCase names
- React components: PascalCase — `CategoryPill`, `HeroSection`, `ArticleCard`
- Helper/utility functions: camelCase — `getCatColor()`, `getCatName()`
- Use `function` declarations (not arrow functions) for components and named helpers
- Export default for page-level components: `export default function HomePage()`
- camelCase for local variables — `catArticles`, `coverArticle`, `currentIndex`
- UPPER_CASE for module-level constants is NOT used; instead use `const` with camelCase — `const colorClasses = {}`
- Destructured props: `{ article }`, `{ categoryId }`
- No TypeScript — project uses plain JavaScript (`.jsx` / `.js`)
- No PropTypes or runtime type checking
## Code Style
- No Prettier or other formatter configured
- Double quotes for JSX string attributes and JS strings (consistent throughout)
- 2-space indentation
- Trailing commas in multi-line objects and arrays
- No semicolons after function declarations; semicolons used in expressions
- ESLint 9 with flat config at `react-newsletter/eslint.config.js`
- Plugins: `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`
- Custom rule: `no-unused-vars` ignores variables matching `^[A-Z_]` pattern
- ECMAScript 2020 target with browser globals
## Component Patterns
- Multiple components defined in a single file (e.g., `HomePage.jsx` contains Navbar, HeroSection, CategorySection, ArticleCard, NewsletterSignup, FeaturedCategories, Footer)
- Section separators use decorative comments: `/* ═══════════════ Section Name ═══════════════ */`
- Only the page-level component is exported (`export default function HomePage()`)
- Sub-components are file-private (no export)
- Pages get their own files in `src/pages/`
- UI sub-components (Navbar, Footer, ArticleCard) are defined inline within the page file that uses them
- There are NO shared component files — components are duplicated across pages (e.g., Navbar and color utils exist in both `HomePage.jsx` and `ArticlePage.jsx`)
- Minimal hook usage — `useParams()`, `useNavigate()`, `useEffect()` from React/React Router
- No custom hooks
- No `useState` — app is entirely read-only from static data
- `useEffect` for scroll-to-top on route change in `ArticlePage.jsx`
## CSS / Styling Approach
- Use Tailwind utility classes exclusively in JSX — no inline `style` props
- Reference custom theme colors as `text-text`, `bg-surface`, `border-border`, `text-accent`, etc.
- Use arbitrary values in brackets for precise sizing: `text-[13px]`, `h-[180px]`, `max-w-[1240px]`
- Use `group` / `group-hover:` pattern for parent-child hover effects
- Responsive breakpoints: `sm:`, `md:`, `lg:` (mobile-first)
- Transitions: always include `transition-colors`, `transition-all`, or `transition-transform` with `duration-XXX`
- `App.css` is unused (contains only `/* unused */`)
## Import Organization
- Relative paths with `./` and `../` — no path aliases configured
- Explicit `.jsx` extension on local imports in `main.jsx`; omitted elsewhere
## Animation Patterns
- Use `initial` + `animate` for above-the-fold content
- Use `initial` + `whileInView` with `viewport={{ once: true }}` for scroll-triggered content
- Stagger children with `delay: i * 0.08` (or similar small increment)
- Standard fade-up: `{ opacity: 0, y: 16 }` to `{ opacity: 1, y: 0 }`
## Error Handling
- Article not found: renders a fallback UI with "Article not found" message and back link in `ArticlePage.jsx`
- Optional chaining used for safe access: `cat?.color`, `article.galleryTitles?.[i]`
- No try/catch blocks — no async operations exist
- No error boundaries
## Data Management
- `edition` — month/year metadata
- `categories` — category definitions with color mappings
- `articles` — full article content including body text
## Routing
- Two routes: `/` (HomePage) and `/article/:id` (ArticlePage)
- Navigation via `<Link to={...}>` components
- Programmatic navigation via `useNavigate()` for back button
- Article lookup by `id` string from URL params
## Python App Conventions (Parent Directory)
- Python with Streamlit framework
- Content stored as Python dicts in `content/*.py` files (e.g., `content/january_2026.py`)
- Template pattern: `content/month_template.py` provides EDITION dict structure for new months
- Heavy use of `st.markdown()` with raw HTML/CSS strings
- Helper functions: `load_edition()`, `render_link_button()`, `clean_text()`
- No type hints on functions
- Docstrings on public functions
## Comments
- Section separators for major UI blocks: `/* ═══════════════ Section Name ═══════════════ */`
- Inline comments for non-obvious logic: `// Related articles from same category`
- JSX comments for structural sections: `{/* Hero image — full-bleed */}`
## Module Design
- One default export per page file (the page component)
- Named exports for data: `export const edition`, `export const articles`, `export const categories`
- No barrel files (`index.js` re-exports)
<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->
## Architecture

## Pattern Overview
- Two-page SPA: home page (article listing) and article detail page
- All article content lives in a single static data file (`src/data.js`)
- No state management library -- component-local state only, data imported directly
- Page-level components contain all UI logic; no shared component library exists yet
- Dark-themed newsletter/magazine layout styled entirely with Tailwind CSS utility classes
- Framer Motion used for scroll-reveal and page-enter animations
## Relationship to Parent Python App
| Aspect | Python app (`app.py`) | React app (`react-newsletter/`) |
|--------|----------------------|-------------------------------|
| Framework | Streamlit | React 19 + Vite |
| Rendering | Server-side (Python) | Client-side SPA |
| Content format | Python dicts in `content/*.py` | JS objects in `src/data.js` |
| Styling | Inline CSS in Streamlit markdown | Tailwind CSS v4 |
| Routing | Streamlit pages/navigation | React Router v7 |
| Deployment | Streamlit Cloud / local | Static hosting (Vite build) |
## Layers
- Purpose: Full page compositions that own layout, sections, and all child components
- Location: `react-newsletter/src/pages/`
- Contains: `HomePage.jsx`, `ArticlePage.jsx`
- Depends on: `src/data.js`, `react-router-dom`, `framer-motion`, `lucide-react`
- Used by: `App.jsx` (route definitions)
- Purpose: Static content store for all articles, categories, and edition metadata
- Location: `react-newsletter/src/data.js`
- Contains: Three named exports: `edition`, `categories`, `articles`
- Depends on: Nothing (pure data)
- Used by: Both page components import directly
- Purpose: Client-side navigation between home and article pages
- Location: `react-newsletter/src/App.jsx` (route definitions), `react-newsletter/src/main.jsx` (BrowserRouter provider)
- Contains: Two routes only
- Depends on: `react-router-dom`
- Used by: Entry point renders it
- Purpose: Design tokens (colors, fonts) and global resets
- Location: `react-newsletter/src/index.css`
- Contains: Tailwind v4 `@theme` block with custom CSS variables, global resets, scrollbar styles
- Depends on: Tailwind CSS v4 via `@tailwindcss/vite` plugin
- Used by: All components via Tailwind utility classes referencing these tokens
## Data Flow
- No global state management (no Context, no Redux, no Zustand)
- All data is static imports -- no `useState` or `useEffect` for data fetching
- The only `useEffect` is in `ArticlePage` for scroll-to-top on navigation
- Component state is implicit through the data imports and route params
## Routing Structure
| Route | Component | Purpose |
|-------|-----------|---------|
| `/` | `HomePage` | Article listing with hero, category sections, newsletter signup |
| `/article/:id` | `ArticlePage` | Full article view with body, gallery, sources, prev/next nav |
## Key Abstractions
- Purpose: Central data entity representing one newsletter article
- Defined in: `react-newsletter/src/data.js`
- Shape:
- Purpose: Defines article groupings with associated color theming
- Defined in: `react-newsletter/src/data.js`
- Shape: `{ id, name, color, description }`
- The `color` field maps to a `colorClasses` lookup duplicated in both `HomePage.jsx` and `ArticlePage.jsx`
- Purpose: Maps category color names to Tailwind class strings for pills and dots
- Duplicated in: `react-newsletter/src/pages/HomePage.jsx` (line 8) and `react-newsletter/src/pages/ArticlePage.jsx` (line 7)
- Pattern: `{ accent: { pill: "bg-accent-soft text-accent", dot: "bg-accent" }, ... }`
## Entry Points
- Location: `react-newsletter/index.html`
- Triggers: `npm run dev` (Vite dev server)
- Loads: `src/main.jsx` via `<script type="module">`
- Location: `react-newsletter/src/main.jsx`
- Responsibilities: Creates React root, wraps app in StrictMode and BrowserRouter, renders `<App />`
- Location: `react-newsletter/src/App.jsx`
- Responsibilities: Defines all routes, maps URL paths to page components
## Error Handling
- `ArticlePage` handles missing article IDs with an inline fallback UI
- No error boundary components exist
- No network error handling (no network requests exist)
- Optional chaining (`?.`) used for nullable fields like `article.gallery`, `article.galleryTitles`
## Cross-Cutting Concerns
<!-- GSD:architecture-end -->

<!-- GSD:workflow-start source:GSD defaults -->
## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:
- `/gsd:quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd:debug` for investigation and bug fixing
- `/gsd:execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- GSD:workflow-end -->



<!-- GSD:profile-start -->
## Developer Profile

> Profile not yet configured. Run `/gsd:profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` -- do not edit manually.
<!-- GSD:profile-end -->
