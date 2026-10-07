import type { ClosingCtaContent } from "@/types/banner";

/**
 * Homepage Section 08 — closing call to action above the footer.
 *
 * Solid navy with gold accents, so no image is needed. To use a photo
 * instead, add `image: { src: "/images/…jpg" }`; it shows faintly under a
 * 90% navy overlay.
 */
export const FINAL_CTA_CONTENT: ClosingCtaContent = {
  eyebrow: "Start With Settle",
  heading: "Furniture that's ready when you are.",
  subtext:
    "Furnishing a home or stocking a showroom, either way there's a place to start. Explore the collection, or talk to us about bringing Settle into your store.",
  primaryCta: { label: "Shop The Collection", href: "/collections" },
  secondaryCta: { label: "Get In Touch", href: "/contact" },
};
