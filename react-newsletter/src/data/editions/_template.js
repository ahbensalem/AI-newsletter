/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║                    NEW EDITION TEMPLATE                         ║
 * ╠══════════════════════════════════════════════════════════════════╣
 * ║                                                                  ║
 * ║  How to add a new month:                                         ║
 * ║                                                                  ║
 * ║  1. Copy this file → rename to your edition slug:                ║
 * ║     e.g.  february-2026.js                                       ║
 * ║                                                                  ║
 * ║  2. Create an image folder in public/:                           ║
 * ║     e.g.  public/editions/february-2026/                         ║
 * ║     Drop all article images there.                               ║
 * ║                                                                  ║
 * ║  3. Fill in the edition metadata and articles below.             ║
 * ║                                                                  ║
 * ║  4. Register the edition in  src/data/index.js :                 ║
 * ║                                                                  ║
 * ║     import february2026 from "./editions/february-2026";         ║
 * ║                                                                  ║
 * ║     export const allEditions = [february2026, january2026];      ║
 * ║     //  ↑ newest first — the first entry becomes latestEdition   ║
 * ║                                                                  ║
 * ╚══════════════════════════════════════════════════════════════════╝
 *
 *  CATEGORY IDs (pick one per article):
 *    "infrastructure"  — Platforms, compute, systems
 *    "robotics"        — Physical AI, embodied agents
 *    "tools"           — Dev tools, workflows, coding assistants
 *    "creative"        — Image gen, video, creative AI
 *    "industry"        — Healthcare, consumer tech, adoption
 *
 *  IMAGE PATHS:
 *    All images go in  public/editions/{slug}/
 *    Reference them as  "/editions/{slug}/filename.ext"
 *    Use null for articles without an image.
 */

export default {
  // --- Edition metadata (all required) ---
  slug: "month-year",           // URL-safe: "february-2026", "march-2026", etc.
  month: "Month",               // Display name: "February", "March", etc.
  year: "2026",                 // Four-digit year
  issue: "02",                  // Two-digit issue number: "02", "03", etc.
  coverImage: "/editions/month-year/cover.jpg",  // Shown on archive page card (or null)

  articles: [
    // ─── FEATURED ARTICLE (exactly one must have featured: true) ──────
    {
      id: "unique-article-id",              // Required — URL-safe, unique across all editions
      category: "infrastructure",           // Required — one of the category IDs above
      featured: true,                       // Required — exactly ONE article per edition
      title: "Article Title Goes Here",     // Required
      excerpt: "A one or two sentence summary shown on cards.", // Required
      image: "/editions/month-year/article-image.jpg",         // Optional — null if no image
      readTime: "5 min",                    // Required — estimated read time
      date: "Feb 1, 2026",                  // Required — display date
      body: [                               // Required — array of paragraphs
        "First paragraph of the article body.",
        "Second paragraph. Each string becomes its own <p> tag.",
        "Add as many paragraphs as needed.",
      ],
      // Optional — image gallery (shown below the article body)
      gallery: [
        "/editions/month-year/gallery-1.jpg",
        "/editions/month-year/gallery-2.jpg",
        "/editions/month-year/gallery-3.jpg",
      ],
      galleryTitles: [                      // Optional — captions for each gallery image
        "Caption for image 1",
        "Caption for image 2",
        "Caption for image 3",
      ],
      // Optional — source links (shown at the bottom of the article)
      sources: [
        { name: "Source Name", url: "https://example.com/article" },
        { name: "Another Source", url: "https://example.com/other" },
      ],
    },

    // ─── REGULAR ARTICLE (minimal example) ────────────────────────────
    {
      id: "another-article-id",
      category: "tools",
      title: "Another Article Title",
      excerpt: "Short summary for the card view.",
      image: null,                          // No image — card shows a letter placeholder
      readTime: "3 min",
      date: "Feb 5, 2026",
      body: [
        "Article body paragraph one.",
        "Article body paragraph two.",
      ],
      sources: [
        { name: "Read More", url: "https://example.com" },
      ],
    },

    // Add more articles here...
    // Tip: aim for 6-10 articles per edition for a good layout.
  ],
};
