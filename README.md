<div align="center">

# The Gradient

### Your Monthly AI Intelligence Brief

[![Deploy](https://github.com/ahbensalem/AI-newsletter/actions/workflows/deploy.yml/badge.svg)](https://github.com/ahbensalem/AI-newsletter/actions/workflows/deploy.yml)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)](https://vite.dev)
[![Tailwind](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Python](https://img.shields.io/badge/Python-3.11-3776AB?logo=python&logoColor=white)](https://python.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-F59E0B.svg)](LICENSE)

A beautifully crafted AI newsletter web app that curates the most important developments each month across **Infrastructure**, **Robotics**, **Dev Tools**, **Creative AI**, and **Industry**.

[**View Live**](https://ahbensalem.github.io/AI-newsletter/) | [**Add New Edition**](react-newsletter/README.md)

</div>

---

## Highlights

- **Editorial design** — Dark-themed, magazine-style layout with ambient glow effects and smooth scroll animations
- **Monthly editions** — Each issue is browsable with clickable article cards and a modal reading experience
- **Zero backend** — Fully static SPA, all content in JS data files, deploys anywhere
- **One-file content** — Adding a new month is just copying a template and filling in your articles
- **Auto-deploy** — Push to `main` and GitHub Actions handles the rest

## Quick Start

```bash
cd react-newsletter
npm install
npm run dev
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| UI Framework | React 19 |
| Build Tool | Vite 8 |
| Styling | Tailwind CSS 4 + custom theme tokens |
| Animations | Framer Motion |
| Routing | React Router 7 |
| Icons | Lucide React |
| Hosting | GitHub Pages |
| CI/CD | GitHub Actions |

## Project Structure

```
newsletter/
  react-newsletter/          The main React app
    src/
      pages/                 HomePage, EditionPage, ArchivePage
      components/            ArticleCard, ArticleModal, Navbar, ...
      data/editions/         Monthly content files (one per edition)
      utils/                 Shared helpers
    public/editions/         Per-month image folders
  app.py                     Legacy Streamlit version
```

## Adding a New Edition

> Full guide in [`react-newsletter/README.md`](react-newsletter/README.md)

**TL;DR** — three steps:

```bash
# 1. Copy the template
cp react-newsletter/src/data/editions/_template.js \
   react-newsletter/src/data/editions/february-2026.js

# 2. Add your images
mkdir -p react-newsletter/public/editions/february-2026

# 3. Register it in src/data/index.js (newest first)
```

Fill in your articles, push, done.

## Streamlit App (Original)

The project started as a Python Streamlit app before being redesigned as a React SPA. The Streamlit version is still functional and can be run independently.

```bash
pip install -r requirements.txt
streamlit run app.py
```

- **Requirements** — Python 3.11, Streamlit >= 1.31.0, Pillow >= 10.0.0
- **Content** — Monthly editions stored as Python dicts in `content/` (e.g., `content/january_2026.py`)
- **New editions** — Use `content/month_template.py` as a starting point
- **Port** — Runs on `localhost:8501`

## Deployment

Automatically deployed to **GitHub Pages** on every push to `main` via GitHub Actions.

## Codespaces

Open in GitHub Codespaces — both apps start automatically:

| App | Port | Description |
|-----|------|-------------|
| React (Vite) | 5173 | Main newsletter app |
| Streamlit | 8501 | Legacy Python version |

---

<div align="center">

Built with coffee, curiosity, and Claude

**[ahbensalem](https://github.com/ahbensalem)**

</div>
