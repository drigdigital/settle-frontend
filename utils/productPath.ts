/** Product detail route: `/collections/[category]/[slug]` (CLAUDE.md §8). */
export function productPath(categorySlug: string, slug: string): string {
  return `/collections/${categorySlug}/${slug}`;
}
