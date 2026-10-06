import type { Price } from "@/types/product";

const INR_FORMATTER = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

/**
 * Formats a product price for display. Prices are partial across the catalog
 * (CLAUDE.md §5) — absent or hidden prices resolve to "Price on request"
 * rather than a blank or ₹0, so the enquiry CTA stays the call to action.
 */
export function formatPrice(price: Price | undefined | null): string {
  if (!price || !price.display) return "Price on request";
  return INR_FORMATTER.format(price.amount);
}
