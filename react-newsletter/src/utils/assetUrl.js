const base = import.meta.env.BASE_URL;

export function assetUrl(path) {
  if (!path || path.startsWith("http")) return path;
  return `${base}${path.startsWith("/") ? path.slice(1) : path}`;
}
