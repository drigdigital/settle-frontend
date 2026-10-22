import type {
  BulkOrderPoint,
  BusinessAudience,
  BusinessCtaContent,
  BusinessSection,
  ProcessStep,
} from "@/types/business";
import type { EnquirySectionContent, PageHeroContent } from "@/types/page";

/**
 * For Businesses page content, from the approved "Settle Furniture content.docx"
 * (BUSINESS PAGE). Headings, body copy, list items and steps follow it
 * verbatim; the numbered eyebrows are layout labels only.
 *
 * PLACEHOLDER PHOTOGRAPHY — the hero image is an existing placeholder in
 * public/images/. Replace with photography of the Coimbatore plants or a
 * completed bulk installation, and update `alt` to match.
 */
export const BUSINESS_HERO: PageHeroContent = {
  eyebrow: "For Businesses",
  heading: "Furniture for business, made at scale.",
  intro:
    "Whether you’re stocking a showroom, supplying a region or furnishing a project, Settle gives you wooden, modular and upholstered furniture from a single manufacturer, delivered on schedule and made to one consistent standard.",
  image: {
    src: "/images/gallery-bedroom.jpg",
    alt: "A wall of matching wooden wardrobe units with mirrored doors in a bright bedroom",
    objectPosition: "40% center",
  },
};

export const WHY_BUSINESSES: BusinessSection<BulkOrderPoint> = {
  eyebrow: "01",
  heading: "Why businesses work with Settle",
  items: [
    {
      id: "three-ranges",
      icon: "layers",
      title: "Three ranges, one partner",
      description: "Wooden, modular and upholstered furniture through one relationship.",
    },
    {
      id: "five-warehouses",
      icon: "truck",
      title: "Five warehouses, zone-wise delivery",
      description: "Stock close to you and delivery timelines you can plan around.",
    },
    {
      id: "marketing-support",
      icon: "megaphone",
      title: "Marketing support",
      description: "Co-branded campaigns and launch material.",
    },
    {
      id: "reliable-supply",
      icon: "factory",
      title: "Reliable supply",
      description: "Steady stock from our own plants.",
    },
    {
      id: "consistent-quality",
      icon: "badge-check",
      title: "Consistent quality",
      description: "Checked at every stage of production, batch after batch.",
    },
    {
      id: "after-sales",
      icon: "shield-check",
      title: "After-sales service",
      description: "Support doesn’t end at delivery.",
    },
  ],
};

/**
 * CTA LINKS — "Become A Dealer" opens the dealer application on /dealers;
 * the distribution and quote buttons jump to the enquiry form below.
 */
export const WHO_WE_WORK_WITH: BusinessSection<BusinessAudience> = {
  eyebrow: "02",
  heading: "Who we work with",
  items: [
    {
      id: "dealers",
      title: "Dealers",
      audience: "For furniture retailers and showroom owners.",
      lead: "Stock the Settle range in your store with the support to make it sell.",
      points: [
        "Access to wooden, modular and upholstered ranges",
        "Competitive dealer pricing with healthy retail margins",
        "Showroom layout and merchandising guidance",
        "Co-branded marketing and launch support",
        "A dedicated account contact for orders and queries",
      ],
      cta: { label: "Become A Dealer", href: "/dealers#apply" },
    },
    {
      id: "distributors",
      title: "Distributors",
      audience: "For partners who supply a region or a network of stores.",
      lead: "A warehouse-backed supply line you can build a territory on.",
      points: [
        "Volume pricing scaled to commitment",
        "Zone-wise delivery from our five warehouses",
        "Planned, predictable supply across all three ranges",
        "Product and sales briefings on new collections",
        "Marketing support to build brand presence in your region",
      ],
      cta: { label: "Enquire About Distribution", href: "#enquiry" },
    },
    {
      id: "corporate",
      title: "Corporate & Commercial",
      audience: "For hotels, builders, offices, institutions and interior design firms.",
      lead: "Furniture in volume, without compromising on finish.",
      points: [
        "Bulk quantities across wardrobes, sofas, cots, dining sets and more",
        "Volume pricing scaled to order size",
        "Consistent quality across every unit in a batch",
        "Dedicated production timelines for large orders",
        "Delivery and installation on an agreed schedule",
      ],
      industries: {
        label: "Industries we serve",
        items: [
          "Hospitality & Hotels",
          "Real Estate & Builder Projects",
          "Corporate & Office Spaces",
          "Educational Institutions",
          "Interior Design Firms",
        ],
      },
      cta: { label: "Request A Quote", href: "#enquiry" },
    },
  ],
};

export const PROCESS_WORKFLOW: BusinessSection<ProcessStep> = {
  eyebrow: "03",
  heading: "How to get started",
  items: [
    {
      id: "tell-us",
      title: "Tell us what you need",
      body: "Share your business type, product categories and quantity.",
    },
    {
      id: "quote",
      title: "Get a quote and timeline",
      body: "We respond with clear pricing and a realistic delivery schedule.",
    },
    {
      id: "make-deliver",
      title: "We make and deliver",
      body: "Your order is made in our plants and delivered through the nearest warehouse.",
    },
  ],
};

export const BUSINESS_ENQUIRY: EnquirySectionContent = {
  eyebrow: "04",
  heading: "Tell us what you need.",
  description: "Our business team will get back to you with next steps.",
  submitLabel: "Submit Enquiry",
};

export const BUSINESS_CTA: BusinessCtaContent = {
  heading: "Settle Furniture. Built for retail. Built for business, too.",
  primaryCta: { label: "Talk To Our B2B Team", href: "/contact" },
};
