import type { ClosingCtaContent } from "@/types/banner";
import type { ProductsHeroContent } from "@/types/page";

/**
 * Products page copy (/collections). The products themselves — names,
 * categories, descriptions, finishes, dimensions, prices — are catalog data
 * from SETTLE_FURNITURE_TOP_FEATURED_PRODUCTS.md, served by
 * services/products.ts, never hardcoded here. The intro only lists the
 * categories in that file; the closing CTA reuses the approved Experience
 * Center line and labels from the content document.
 */
export const PRODUCTS_HERO: ProductsHeroContent = {
  eyebrow: "Products",
  heading: "Featured Products",
  intro:
    "Wardrobes, bedroom packages, sofas, cots, dining and center tables from the Settle range. Prices are shown where listed, and every piece can be enquired about directly.",
  primaryCta: { label: "Browse Products", href: "#products" },
  secondaryCta: { label: "Plan Your Visit", href: "/experience-center#book" },
};

export const PRODUCTS_CATALOG = {
  eyebrow: "Browse",
  heading: "Browse by category",
  description:
    "Pick a category, open any piece for its full details, or send an enquiry straight from the card.",
} as const;

export const PRODUCTS_CTA: ClosingCtaContent = {
  heading: "Settle Furniture. See it, touch it, then take it home.",
  primaryCta: { label: "Plan Your Visit", href: "/experience-center#book" },
  secondaryCta: { label: "Get In Touch", href: "/contact" },
};
