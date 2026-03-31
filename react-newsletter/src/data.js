/**
 * Compatibility bridge — re-exports from the new data module.
 * Old imports (articles, categories, edition) continue to work via this file.
 * New imports (latestEdition, allEditions, getEdition) are also available.
 */
export { allEditions, latestEdition, getEdition, categories } from "./data/index.js";

// Legacy shape compatibility for ArticlePage.jsx
import { latestEdition } from "./data/index.js";

export const edition = {
  month: latestEdition.month,
  year: latestEdition.year,
  issue: latestEdition.issue,
};

export const articles = latestEdition.articles;
