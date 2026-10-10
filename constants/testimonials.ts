import type { ClientLogo, Testimonial } from "@/types/testimonial";

/** Homepage Section 07 — testimonials and partner logo strip. */
export const TESTIMONIALS_CONTENT = {
  eyebrow: "Testimonials",
  heading: "What our dealers and customers say.",
  logoStripLabel: "Trusted by retailers across India",
} as const;

export const TESTIMONIALS_AUTOPLAY_MS = 6000;

/**
 * PLACEHOLDER TESTIMONIALS — real quotes are not collected yet. Every quote
 * starts with "[Placeholder]" so none can go live unnoticed. Shown only
 * while the database is unavailable (services/testimonials.ts); once real
 * testimonials are entered in the admin dashboard, those replace this list.
 * Names, quotes and products here are invented: do not publish them.
 */
export const PLACEHOLDER_TESTIMONIALS: Testimonial[] = [
  {
    _id: "placeholder-dealer-1",
    quote:
      "[Placeholder] Settle pieces move off our floor faster than anything else we stock. Deliveries arrive when they say, so we can plan our displays around them.",
    name: "Karthik R.",
    role: "Dealer, Madurai",
    type: "dealer",
    product: "Barnet Wooden Sofa",
    rating: 5,
    isFeatured: true,
    createdAt: "2026-01-01T00:00:00.000Z",
  },
  {
    _id: "placeholder-customer-1",
    quote:
      "[Placeholder] The wardrobe looked exactly like it did at the experience center, and the finish is even richer in our bedroom light.",
    name: "Priya S.",
    role: "Homeowner, Chennai",
    type: "customer",
    product: "Aura Wardrobe",
    rating: 5,
    isFeatured: true,
    createdAt: "2026-01-01T00:00:00.000Z",
  },
  {
    _id: "placeholder-dealer-2",
    quote:
      "[Placeholder] Their team helped us lay out a full Settle corner in our showroom. Footfall into that section has been our best this year.",
    name: "Anand M.",
    role: "Retail Partner, Tiruchirappalli",
    type: "dealer",
    rating: 5,
    isFeatured: true,
    createdAt: "2026-01-01T00:00:00.000Z",
  },
  {
    _id: "placeholder-customer-2",
    quote:
      "[Placeholder] We sat on every dining chair in the showroom before choosing. Two years on, the set still feels solid every single day.",
    name: "Meena V.",
    role: "Homeowner, Coimbatore",
    type: "customer",
    product: "Wales Dining Set",
    rating: 4,
    isFeatured: true,
    createdAt: "2026-01-01T00:00:00.000Z",
  },
  {
    _id: "placeholder-dealer-3",
    quote:
      "[Placeholder] Pricing that leaves room for a fair margin, and a team that actually picks up the phone. That's rare in this trade.",
    name: "Joseph T.",
    role: "Dealer, Kochi",
    type: "dealer",
    isFeatured: true,
    createdAt: "2026-01-01T00:00:00.000Z",
  },
  {
    _id: "placeholder-customer-3",
    quote:
      "[Placeholder] The sofa cum bed fits our compact flat perfectly and opens up in seconds when family visits.",
    name: "Rahul N.",
    role: "Homeowner, Bengaluru",
    type: "customer",
    product: "Munich Sofa Cum Bed",
    rating: 5,
    isFeatured: true,
    createdAt: "2026-01-01T00:00:00.000Z",
  },
];

/**
 * PLACEHOLDER LOGOS — generic "Dealer Logo" SVGs in public/images/logos/.
 * Replace each entry with the partner's real name, logo file (SVG or a
 * transparent PNG, roughly 4:1) and optional website once permission to
 * display it is confirmed.
 */
export const CLIENT_LOGOS: ClientLogo[] = Array.from({ length: 8 }, (_, index) => ({
  id: `placeholder-dealer-${index + 1}`,
  name: `Placeholder Dealer ${index + 1}`,
  image: { src: `/images/logos/placeholder-dealer-logo-${index + 1}.svg`, width: 160, height: 40 },
}));
