import type { DealerBenefitsContent, DealersCtaContent } from "@/types/dealers";
import type { EnquirySectionContent, PageHeroContent, StoryContent } from "@/types/page";

/**
 * Dealers page content, from the approved "Settle Furniture content.docx"
 * (DEALERS PAGE). Headings, body copy, benefit and support items and the
 * closing line follow it verbatim; the numbered eyebrows, the benefits intro
 * and the support intro are not in that document.
 *
 * NOT YET BUILT — the "Find a Settle Dealer" locator (map + list). The client
 * is to supply the dealer list and locations.
 *
 * PLACEHOLDER PHOTOGRAPHY — existing images in public/images/. Replace with
 * photos of a Settle dealer floor and the partnerships team, and update `alt`.
 */
export const DEALERS_HERO: PageHeroContent = {
  eyebrow: "Dealers & Partners",
  heading: "Become a Settle partner.",
  intro:
    "Settle is made in Coimbatore and supplied across South India through our dealer and distribution network. We’re looking for partners who want furniture people actually return for, and a manufacturer that backs them.",
  image: {
    src: "/images/walkthrough-booking.jpg",
    alt: "Showroom floor with a wooden dining table, mustard upholstered chairs and a sideboard on display",
  },
};

export const DEALER_BENEFITS: DealerBenefitsContent = {
  eyebrow: "01",
  heading: "What you get",
  description: "Partnering with Settle means more than stocking furniture.",
  items: [
    {
      id: "three-ranges",
      icon: "layers",
      title: "Three ranges, one relationship",
      description: "wooden, modular and upholstered furniture from a single partner",
    },
    {
      id: "dealer-pricing",
      icon: "tag",
      title: "Competitive pricing",
      description: "margins built for a sustainable retail business",
    },
    {
      id: "marketing-support",
      icon: "megaphone",
      title: "Marketing and launch support",
      description: "co-branded campaigns and material for new collections",
    },
    {
      id: "reliable-supply",
      icon: "truck",
      title: "Reliable supply",
      description: "consistent stock from our own plants, delivered zone-wise from five warehouses",
    },
  ],
};

export const SUPPORT_STRUCTURE: StoryContent = {
  id: "support",
  eyebrow: "02",
  heading: "How we support you",
  body: "Every dealer is backed by a dedicated support structure at each stage of the relationship.",
  points: [
    {
      id: "onboarding",
      title: "Onboarding and store setup",
      body: "layout, merchandising and opening stock selection",
    },
    {
      id: "account-support",
      title: "Dedicated account support",
      body: "one point of contact for orders, queries and escalations",
    },
    {
      id: "delivery",
      title: "Delivery you can plan around",
      body: "so your floor is never short of stock",
    },
    {
      id: "training",
      title: "Product training",
      body: "briefings on every new collection so your team sells with confidence",
    },
    {
      id: "after-sales",
      title: "After-sales service",
      body: "support that protects your customer relationships",
    },
  ],
  images: [
    {
      src: "/images/dealers-partnership.jpg",
      alt: "Two people shaking hands across a desk in a bright office",
      objectPosition: "60% center",
    },
  ],
  imageSide: "left",
  tone: "navy",
};

export const DEALER_APPLICATION: EnquirySectionContent = {
  eyebrow: "03",
  heading: "Partner Application Form",
  description: "Tell us about your business and our partnerships team will be in touch.",
  submitLabel: "Submit Application",
};

export const DEALERS_CTA: DealersCtaContent = {
  heading: "Settle. Built to grow with the people who sell it.",
  primaryCta: { label: "Become A Dealer", href: "#apply" },
};
