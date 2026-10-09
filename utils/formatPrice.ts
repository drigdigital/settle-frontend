import type { Price, Product } from "@/types/product";

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

/** Price line for cards and CTAs: "From ₹31,500" when the product has separately priced variants. */
export function formatProductPrice(product: Pick<Product, "price" | "priceOptions">): string {
  const base = formatPrice(product.price);
  return product.price?.display && product.priceOptions?.length ? `From ${base}` : base;
}

/** A single variant's price, e.g. Essen's King package. */
export function formatAmount(amount: number): string {
  return INR_FORMATTER.format(amount);
}
