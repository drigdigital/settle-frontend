import type {
  ExperienceCenterCtaContent,
  StoreGalleryContent,
  VisitDetailsContent,
} from "@/types/experienceCenter";
import type { EnquirySectionContent, PageHeroContent, PageImage } from "@/types/page";

/**
 * Experience Center page content, from the approved
 * Settle_Furniture_Website_Content document (EXPERIENCE CENTER PAGE).
 * Headings, body copy, gallery captions, address, phone, emails and hours
 * follow it verbatim; the numbered eyebrows are layout labels only.
 * (The homepage's Experience Center banner lives in constants/experienceCenter.ts.)
 *
 * PLACEHOLDER PHOTOGRAPHY — existing showroom and room images in
 * public/images/. Replace with photos of the actual Experience Center floor
 * in Coimbatore, and update `alt` to match.
 */
export const EXPERIENCE_CENTER_HERO: PageHeroContent = {
  eyebrow: "Experience Center",
  heading: "Walk through Settle before it's in your home.",
  intro:
    "Our Experience Center sits inside Vaanam Furniture's own manufacturing facility in Coimbatore, the same floor where every Settle piece is built. It's where retailers, dealers and customers come to see full room setups, run a hand over real finishes, and get a feel for the range before committing to an order.",
  image: {
    src: "/images/experience-center-hero.jpg",
    alt: "Furniture showroom floor with a grey sectional sofa, recliners and lounge seating on display",
  },
};

export const STORE_GALLERY: StoreGalleryContent = {
  eyebrow: "01",
  heading: "Store Gallery",
  description:
    "A look inside the Experience Center, room by room. Browse full wardrobe, living, dining and bedroom setups exactly as they stand on the floor in Coimbatore.",
  items: [
    {
      id: "living",
      image: {
        src: "/images/gallery-living.jpg",
        alt: "Grey fabric sofa and low wooden media console in a calm, light-filled living room",
        objectPosition: "center 70%",
      },
      caption: "Living room and sofa setups across the Eco, Prime and Ultra lines",
    },
    {
      id: "bedroom",
      image: {
        src: "/images/gallery-bedroom.jpg",
        alt: "A wall of matching wooden wardrobe units with mirrored doors",
        objectPosition: "38% center",
      },
      caption: "Bedroom and wardrobe displays, including the Essen package",
    },
    {
      id: "dining",
      image: {
        src: "/images/gallery-dining.jpg",
        alt: "Solid wood dining table with bentwood chairs beside a large window",
        objectPosition: "45% center",
      },
      caption: "Dining room layouts, from everyday sets to statement tables",
    },
    {
      id: "recliner",
      image: {
        src: "/images/gallery-recliner.jpg",
        alt: "Beige fabric recliner with stitched panels beside a small side table",
      },
      caption: "Recliner and sofa-cum-bed corner",
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
  heading: "Location And Map",
  description: "Find us inside Vaanam Furniture's Coimbatore facility.",
  location: {
    name: LOCATION_NAME,
    addressLines: ADDRESS_LINES,
    phone: "+91 90421 12233",
    emails: ["sales@settlefurniture.in", "hello@settlefurniture.in"],
  },
  hours: {
    heading: "Working Hours",
    description:
      "The Experience Center is open through the week, with visits best booked in advance so a team member can walk you through the range.",
    slots: [{ day: "Monday – Saturday", time: "10:00 AM – 7:00 PM" }],
    note: "Closed on public holidays",
  },
};

export const WALKTHROUGH_BOOKING: EnquirySectionContent = {
  eyebrow: "03",
  heading: "Walkthrough Booking Form",
  description: "Reserve a slot and a member of our team will be ready for you at the door.",
  submitLabel: "Book A Walkthrough",
};

export const WALKTHROUGH_BOOKING_IMAGE: PageImage = {
  src: "/images/walkthrough-booking.jpg",
  alt: "Showroom dining setup with a wooden table and mustard upholstered chairs",
};

export const EXPERIENCE_CENTER_CTA: ExperienceCenterCtaContent = {
  heading: "Settle Furniture. See it, touch it, then take it home.",
  primaryCta: { label: "Plan Your Visit", href: "#book" },
};
