import { FEATURED_RANGE_PRODUCTS } from "@/constants/featuredRange";
import type { RangeProduct } from "@/types/featuredRange";

/**
 * Data source for the homepage range carousel. Currently the static list in
 * constants/featuredRange.ts; to move it to the admin API, a CMS or Shopify,
 * fetch here and map the response to `RangeProduct[]`. The UI only depends on
 * this function's return type.
 */
export async function getFeaturedRange(): Promise<RangeProduct[]> {
  return FEATURED_RANGE_PRODUCTS;
}
