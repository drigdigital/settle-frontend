/** The three families the Settle range is merchandised in. */
export type ProductFamilyId = "wooden" | "modular" | "upholstered";

/**
 * A browsable subcategory inside a family ("Cots", "Bedroom Packages"). It
 * groups one or more catalog categories, so the admin keeps managing the 13
 * catalog categories while the site presents the approved structure.
 */
export interface ProductSubcategory {
  id: string;
  name: string;
  description?: string;
  /** Catalog category slugs whose products belong here. */
  categorySlugs: string[];
  /** true: only packages (Essen); false: packages excluded; omit: both. */
  isPackage?: boolean;
  /** Tile photo used until one of the subcategory's own products has a photo. */
  coverImage?: { url: string; alt: string };
}

export interface ProductFamily {
  id: ProductFamilyId;
  name: string;
  description: string;
  subcategories: ProductSubcategory[];
}

/** A subcategory with what the catalog currently holds for it, for the range overview. */
export interface SubcategorySummary extends ProductSubcategory {
  count: number;
  image?: { url: string; alt: string };
}

export interface FamilySummary extends Omit<ProductFamily, "subcategories"> {
  count: number;
  subcategories: SubcategorySummary[];
}
