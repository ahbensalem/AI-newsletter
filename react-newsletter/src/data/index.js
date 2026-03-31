import january2026, { categories as jan2026Categories } from "./editions/january-2026";

export const allEditions = [january2026];
export const latestEdition = allEditions[0];
export function getEdition(slug) {
  return allEditions.find(e => e.slug === slug);
}
export const categories = jan2026Categories;
