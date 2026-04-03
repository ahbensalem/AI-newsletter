# The Gradient — React App

The frontend for **The Gradient**, a monthly AI newsletter. Built with React 19, Vite, and Tailwind CSS 4.

## Quick Start

```bash
cd react-newsletter
npm install
npm run dev
```

Open `http://localhost:5173`.

## Adding a New Monthly Edition

### 1. Create the edition file

Copy the template and rename it:

```bash
cp src/data/editions/_template.js src/data/editions/february-2026.js
```

Edit the file — fill in the edition metadata and articles. The template has inline comments explaining every field.

### 2. Add images

Create a folder for the edition's images:

```bash
mkdir -p public/editions/february-2026
```

Drop your article images there. Reference them in the data file as:

```js
image: "/editions/february-2026/my-image.jpg"
```

Use `null` for articles without an image.

### 3. Register the edition

Open `src/data/index.js` and add the import:

```js
import february2026 from "./editions/february-2026";
import january2026, { categories as jan2026Categories } from "./editions/january-2026";

export const allEditions = [february2026, january2026]; // newest first
export const latestEdition = allEditions[0];
```

The first entry in `allEditions` becomes the homepage edition.

### Available Categories

| ID | Label | Color |
|----|-------|-------|
| `infrastructure` | Infrastructure | amber |
| `robotics` | Robotics | cyan |
| `tools` | Dev Tools | violet |
| `creative` | Creative AI | pink |
| `industry` | Industry | green |

### Article Fields

| Field | Required | Description |
|-------|----------|-------------|
| `id` | Yes | Unique URL-safe identifier |
| `category` | Yes | One of the category IDs above |
| `featured` | No | Set `true` on exactly one article per edition |
| `title` | Yes | Article headline |
| `excerpt` | Yes | 1-2 sentence summary for cards |
| `image` | No | Path to image in `public/editions/` or `null` |
| `readTime` | Yes | e.g. `"4 min"` |
| `date` | Yes | Display date, e.g. `"Feb 10, 2026"` |
| `body` | Yes | Array of paragraph strings |
| `gallery` | No | Array of image paths |
| `galleryTitles` | No | Array of captions matching gallery |
| `sources` | No | Array of `{ name, url }` objects |

## Build & Deploy

```bash
npm run build
```

Output goes to `dist/`. Deployed automatically to GitHub Pages on push to `main`.
