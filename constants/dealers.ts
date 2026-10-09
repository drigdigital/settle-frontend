import type { DealerBenefitsContent, DealersCtaContent } from "@/types/dealers";
import type { EnquirySectionContent, PageHeroContent, StoryContent } from "@/types/page";

/**
 * Dealers & Partners page content, from the approved
 * Settle_Furniture_Website_Content document (DEALERS & PARTNERS PAGE).
 * Headings, body copy, benefit and support items, form fields and CTA follow
 * it verbatim; the numbered eyebrows are layout labels only.
 *
 * PLACEHOLDER PHOTOGRAPHY — existing images in public/images/. Replace with
 * photos of a Settle dealer floor and the partnerships team, and update `alt`.
 */
export const DEALERS_HERO: PageHeroContent = {
  eyebrow: "Dealers & Partners",
  heading: "Grow with a manufacturer that backs its dealers.",
  intro:
    "Settle Furniture is one of three brands manufactured by Vaanam Furniture in Coimbatore, alongside Chera and Kov. As a dealer or partner, you're backed by that same in-house manufacturing strength, consistent quality, and a team invested in your store's success, not just your next order.",
  image: {
    src: "/images/walkthrough-booking.jpg",
    alt: "Showroom floor with a wooden dining table, mustard upholstered chairs and a sideboard on display",
  },
};

export const DEALER_BENEFITS: DealerBenefitsContent = {
  eyebrow: "01",
  heading: "Dealer Benefits",
  description: "Partnering with Settle means more than stocking furniture.",
  items: [
    {
      id: "three-brands",
      icon: "layers",
      title: "Three brands, one partner",
      description:
        "Access Chera, Settle and Kov through a single relationship, covering multiple price points and styles.",
    },
    {
      id: "dealer-pricing",
      icon: "tag",
      title: "Competitive dealer pricing",
      description: "Margins built for sustainable retail business.",
    },
    {
      id: "marketing-support",
      icon: "megaphone",
      title: "Marketing and launch support",
      description: "Co-branded campaigns and material to help new collections sell.",
    },
    {
      id: "reliable-supply",
      icon: "truck",
      title: "Reliable supply",
      description:
        "Consistent stock from an in-house manufacturing floor, not third-party sourcing.",
    },
  ],
};

export const SUPPORT_STRUCTURE: StoryContent = {
  id: "support",
  eyebrow: "02",
  heading: "Support Structure",
  body: "Every dealer is backed by a dedicated support structure at each stage of the relationship.",
  points: [
    {
      id: "onboarding",
      title: "Onboarding and store setup",
      body: "Guidance on layout, merchandising and initial stock selection.",
    },
    {
      id: "account-support",
      title: "Dedicated account support",
      body: "A single point of contact for orders, queries and escalations.",
    },
    {
      id: "logistics",
      title: "Logistics and fulfillment",
      body: "Planned delivery timelines so your floor is never short of stock.",
    },
    {
      id: "training",
      title: "Training and product knowledge",
      body: "Briefings on new collections so your team can sell with confidence.",
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
  heading: "Dealer Application Form",
  description: "Tell us about your business, and our partnerships team will be in touch.",
  submitLabel: "Submit Application",
};

export const DEALERS_CTA: DealersCtaContent = {
  heading: "Settle Furniture. Built to grow with the people who sell it.",
  primaryCta: { label: "Become A Dealer", href: "#apply" },
};
