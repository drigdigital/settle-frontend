/**
 * Product names repeat across categories (CLAUDE.md §5) — slugs must be
 * `category-name` and uniqueness is enforced on the slug, never the name.
 */
export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function buildProductSlug(categorySlug: string, productName: string): string {
  return `${categorySlug}-${slugify(productName)}`;
}
