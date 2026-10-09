import type {
  BulkOrderPoint,
  BusinessCtaContent,
  BusinessSection,
  IconTile,
  ProcessStep,
} from "@/types/business";
import type { EnquirySectionContent, PageHeroContent } from "@/types/page";

/**
 * For Businesses page content, from the approved Settle_Furniture_Website_Content
 * document (FOR BUSINESSES PAGE). Headings, body copy, list items, process
 * steps and form fields follow it verbatim; the numbered eyebrows are layout
 * labels only.
 *
 * PLACEHOLDER PHOTOGRAPHY — the hero image is an existing placeholder in
 * public/images/. Replace with photography of the Coimbatore facility or a
 * completed bulk installation, and update `alt` to match.
 */
export const BUSINESS_HERO: PageHeroContent = {
  eyebrow: "For Businesses",
  heading: "Furniture manufacturing you can build a business on.",
  intro:
    "Settle Furniture is the retail face of Vaanam Furniture's manufacturing strength, in Coimbatore. Beyond individual homes, we work directly with retailers, dealers, hospitality buyers, builders and institutions across South India who need furniture at scale, delivered on schedule, without compromising the finish quality every Settle piece is known for.",
  image: {
    src: "/images/gallery-bedroom.jpg",
    alt: "A wall of matching wooden wardrobe units with mirrored doors in a bright bedroom",
    objectPosition: "40% center",
  },
};

export const BULK_ORDER_SOLUTIONS: BusinessSection<BulkOrderPoint> = {
  eyebrow: "01",
  heading: "Bulk Order Solutions",
  description:
    "Whether it's twenty rooms or two hundred, our Coimbatore facility is built to take on volume without cutting corners. Every bulk order runs through the same in-house production line, material sourcing and quality checks as a single retail piece, just scaled to your numbers.",
  items: [
    {
      id: "custom-quantities",
      icon: "layers",
      title: "Custom quantities across wardrobes, sofas, cots, dining sets and more",
    },
    { id: "volume-pricing", icon: "tag", title: "Volume pricing scaled to order size" },
    {
      id: "batch-quality",
      icon: "badge-check",
      title: "Consistent batch-to-batch quality, even at scale",
    },
    {
      id: "production-timelines",
      icon: "factory",
      title: "Dedicated production timelines for large-volume clients",
    },
  ],
};

export const INDUSTRIES_SERVED: BusinessSection<IconTile> = {
  eyebrow: "02",
  heading: "Industries Served",
  description:
    "From hotels furnishing a new wing to builders handing over move-in-ready homes, Settle furniture already sits in a range of business settings across South India.",
  items: [
    { id: "hospitality", icon: "bed", label: "Hospitality & Hotels" },
    { id: "real-estate", icon: "building", label: "Real Estate & Builder Projects" },
    { id: "corporate", icon: "briefcase", label: "Corporate & Office Spaces" },
    { id: "education", icon: "graduation-cap", label: "Educational Institutions" },
    { id: "retail-dealer", icon: "store", label: "Furniture Retailers & Dealers" },
    { id: "interior-design", icon: "swatch", label: "Interior Design Firms" },
  ],
};

export const PROCESS_WORKFLOW: BusinessSection<ProcessStep> = {
  eyebrow: "03",
  heading: "Process Workflow",
  description:
    "Every B2B order follows the same straightforward path, from first enquiry to final handover.",
  items: [
    {
      id: "enquiry",
      title: "Enquiry & Requirement Review",
      body: "Share your space, quantity and finish requirements with our team.",
    },
    {
      id: "quote",
      title: "Quote & Timeline",
      body: "We return transparent pricing and a realistic production and delivery timeline.",
    },
    {
      id: "production",
      title: "Production",
      body: "Your order is manufactured in-house at our Coimbatore facility, under the same quality checks as every Settle piece.",
    },
    {
      id: "delivery",
      title: "Delivery & Handover",
      body: "Furniture is delivered and installed on the agreed schedule, ready for handover.",
    },
  ],
};

export const BUSINESS_ENQUIRY: EnquirySectionContent = {
  eyebrow: "04",
  heading: "B2B Enquiry Form",
  description:
    "Tell us what you need, and our team will get back to you with a quote and timeline.",
  submitLabel: "Submit Enquiry",
};

export const BUSINESS_CTA: BusinessCtaContent = {
  heading: "Settle Furniture. Built for retail. Built for business, too.",
  primaryCta: { label: "Talk To Our B2B Team", href: "/contact" },
};
