import type { FINISHES } from "@/constants/site";
import type { SubLine } from "./product";

export type Finish = (typeof FINISHES)[number];

/**
 * One card in the homepage "Settle range" carousel (Section 04). Kept close to
 * the catalog `Product` shape so the source can move to the admin API/CMS by
 * mapping fields in services/featuredRange.ts, without touching the UI.
 */
export interface RangeProduct {
  name: string;
  /** Unique product slug, "category-name" (CLAUDE.md §5). */
  slug: string;
  /** Route segment of the product's category ("upholstered-sofas"). */
  categorySlug: string;
  /** Display label above the name ("Upholstery"). */
  category: string;
  /** Merchandising sub-line, shown as a pill next to the category. */
  line?: SubLine;
  description: string;
  /** Omit (or leave the file missing) to show the sand fallback with the product name. */
  image?: {
    src: string;
    alt: string;
  };
  finishes?: Finish[];
  isNew?: boolean;
}
