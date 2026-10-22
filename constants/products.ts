import type { ClosingCtaContent } from "@/types/banner";
import type { ProductsHeroContent } from "@/types/page";

/**
 * Products page copy (/collections). The products themselves — names,
 * categories, descriptions, finishes, dimensions, prices — are catalog data
 * from SETTLE_FURNITURE_TOP_FEATURED_PRODUCTS.md, served by
 * services/products.ts, never hardcoded here. Headline and intro are verbatim
 * from "Settle Furniture content.docx" (PRODUCTS PAGE); the range families
 * and their copy live in constants/productFamilies.ts.
 */
export const PRODUCTS_HERO: ProductsHeroContent = {
  eyebrow: "Products",
  heading: "The Settle collection.",
  intro:
    "Three families of furniture, one standard of quality. Browse by category to find what your home needs.",
  primaryCta: { label: "Browse Products", href: "#products" },
  secondaryCta: { label: "Plan Your Visit", href: "/our-plants#book" },
};

export const PRODUCTS_CATALOG = {
  eyebrow: "Browse",
  heading: "Browse the collection",
} as const;

export const PRODUCTS_CTA: ClosingCtaContent = {
  heading: "Made in Coimbatore. See it, touch it, then take it home.",
  primaryCta: { label: "Plan Your Visit", href: "/our-plants#book" },
  secondaryCta: { label: "Get In Touch", href: "/contact" },
};
