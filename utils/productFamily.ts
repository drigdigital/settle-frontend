import { PRODUCT_FAMILIES } from "@/constants/productFamilies";
import type { Product } from "@/types/product";
import type {
  FamilySummary,
  ProductFamily,
  ProductFamilyId,
  ProductSubcategory,
} from "@/types/productFamily";

export interface ProductPlacement {
  family: ProductFamily;
  subcategory: ProductSubcategory;
}

function categorySlugOf(product: Product): string {
  return typeof product.category === "string" ? product.category : product.category.slug;
}

/** Where a product sits in the range, or null for a catalog category the range doesn't place yet. */
export function placeProduct(product: Product): ProductPlacement | null {
  const slug = categorySlugOf(product);
  for (const family of PRODUCT_FAMILIES) {
    for (const subcategory of family.subcategories) {
      if (!subcategory.categorySlugs.includes(slug)) continue;
      if (subcategory.isPackage !== undefined && subcategory.isPackage !== product.isPackage) {
        continue;
      }
      return { family, subcategory };
    }
  }
  return null;
}

/**
 * Resolves the legacy `?category=<catalog slug>` links (sitemap, product
 * breadcrumbs) to a family and subcategory.
 */
export function placeCategorySlug(
  slug: string,
): { familyId: ProductFamilyId; subcategoryId: string } | null {
  for (const family of PRODUCT_FAMILIES) {
    const subcategory = family.subcategories.find((sub) => sub.categorySlugs.includes(slug));
    if (subcategory) return { familyId: family.id, subcategoryId: subcategory.id };
  }
  return null;
}

/** Per-family and per-subcategory counts, plus a cover photo taken from the subcategory's own products. */
export function summarizeFamilies(products: Product[]): FamilySummary[] {
  const placed = products.map((product) => ({ product, placement: placeProduct(product) }));

  return PRODUCT_FAMILIES.map((family) => {
    const subcategories = family.subcategories.map((subcategory) => {
      const members = placed
        .filter(({ placement }) => placement?.subcategory.id === subcategory.id)
        .map(({ product }) => product);
      const cover = members
        .map((product) => product.images.find((img) => img.isPrimary) ?? product.images[0])
        .find(Boolean);
      return {
        ...subcategory,
        count: members.length,
        image: cover ? { url: cover.url, alt: cover.alt } : subcategory.coverImage,
      };
    });
    return {
      ...family,
      count: subcategories.reduce((total, sub) => total + sub.count, 0),
      subcategories,
    };
  });
}

/** Catalog URL filtered to a family (and optionally one subcategory). */
export function rangeHref(familyId: ProductFamilyId, subcategoryId?: string): string {
  const params = new URLSearchParams({ family: familyId });
  if (subcategoryId) params.set("sub", subcategoryId);
  return `/collections?${params.toString()}#products`;
}
