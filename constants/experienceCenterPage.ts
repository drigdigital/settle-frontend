import type {
  ExperienceCenterCtaContent,
  StoreGalleryContent,
  VisitDetailsContent,
} from "@/types/experienceCenter";
import type { EnquirySectionContent, PageHeroContent, PageImage } from "@/types/page";

/**
 * Our Plants page content (/our-plants), from the approved
 * "Settle Furniture content.docx" (OUR PLANTS PAGE, which replaces the
 * Experience Center). Headings, body copy, list items, address, phone and
 * hours follow it verbatim; the numbered eyebrows are layout labels only.
 * (The homepage's Our Plants banner lives in constants/experienceCenter.ts.)
 *
 * CLIENT TO CONFIRM — the plant visit address, the visiting hours, and the
 * single primary email (the document leaves it as "[primary email]"; the
 * two addresses below are from the earlier draft).
 *
 * PLACEHOLDER PHOTOGRAPHY — existing showroom and room images in
 * public/images/. Replace with photos of the Coimbatore plants, the factory
 * display center and finish samples, and update `alt` to match.
 */
export const EXPERIENCE_CENTER_HERO: PageHeroContent = {
  eyebrow: "Our Plants",
  heading: "See where Settle is made.",
  intro:
    "Every Settle piece is made in Coimbatore. Visit a plant to watch furniture take shape, from raw wood to finished product, and see full room setups in our factory display center. Dealers, businesses and homeowners are all welcome.",
  image: {
    src: "/images/experience-center-hero.jpg",
    alt: "Furniture showroom floor with a grey sectional sofa, recliners and lounge seating on display",
  },
};

export const STORE_GALLERY: StoreGalleryContent = {
  eyebrow: "01",
  heading: "What you can see",
  items: [
    {
      id: "plant-walkthrough",
      image: {
        src: "/images/experience-center-hero.jpg",
        alt: "Furniture showroom floor with a grey sectional sofa, recliners and lounge seating on display",
      },
      title: "Plant walkthrough",
      caption: "cutting, assembly, finishing and quality checks on the floor",
    },
    {
      id: "display-center",
      image: {
        src: "/images/gallery-living.jpg",
        alt: "Grey fabric sofa and low wooden media console in a calm, light-filled living room",
        objectPosition: "center 70%",
      },
      title: "Factory display center",
      caption: "living, bedroom and dining setups across the full range",
    },
    {
      id: "upholstery",
      image: {
        src: "/images/gallery-recliner.jpg",
        alt: "Beige fabric recliner with stitched panels beside a small side table",
      },
      title: "Upholstery lines",
      caption: "Eco, Prime and Ultra sofas, recliners and sofa-cum-beds",
    },
    {
      id: "bedroom",
      image: {
        src: "/images/gallery-bedroom.jpg",
        alt: "A wall of matching wooden wardrobe units with mirrored doors",
        objectPosition: "38% center",
      },
      caption: "Bedroom and wardrobe displays, including the Essen bedroom package",
    },
    {
      id: "finish-samples",
      image: {
        src: "/images/gallery-dining.jpg",
        alt: "Solid wood dining table with bentwood chairs beside a large window",
        objectPosition: "45% center",
      },
      title: "Finish samples",
      caption: "touch the wood, fabric and finishes before you decide",
    },
  ],
};

const LOCATION_NAME = "Vaanam Furnishings Pvt Ltd";
const ADDRESS_LINES = [
  "146/147, Pollachi Main Road,",
  "Near FIMS Hospital,",
  "Sundarapuram, Coimbatore – 641024",
];

export const VISIT_DETAILS: VisitDetailsContent = {
  heading: "Location and map",
  location: {
    name: LOCATION_NAME,
    addressLines: ADDRESS_LINES,
    phone: "+91 90421 12233",
    emails: ["sales@settlefurniture.in", "hello@settlefurniture.in"],
  },
  hours: {
    heading: "Visiting hours",
    description: "Please book ahead so a team member can walk you through.",
    slots: [{ day: "Monday to Saturday", time: "10:00 AM – 7:00 PM" }],
    note: "Closed on public holidays",
  },
};

export const WALKTHROUGH_BOOKING: EnquirySectionContent = {
  eyebrow: "03",
  heading: "Plan Your Visit",
  description: "Reserve a slot and a member of our team will be ready for you at the door.",
  submitLabel: "Book A Plant Visit",
};

export const WALKTHROUGH_BOOKING_IMAGE: PageImage = {
  src: "/images/walkthrough-booking.jpg",
  alt: "Showroom dining setup with a wooden table and mustard upholstered chairs",
};

export const EXPERIENCE_CENTER_CTA: ExperienceCenterCtaContent = {
  heading: "Made in Coimbatore. See it, touch it, then take it home.",
  primaryCta: { label: "Plan Your Visit", href: "#book" },
};
