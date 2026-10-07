import type { RangeProduct } from "@/types/featuredRange";

/**
 * Homepage Section 04 — "Settle range" carousel. The carousel renders every
 * entry below in order: add, remove or reorder products here, never in the
 * component. Read through getFeaturedRange() in services/featuredRange.ts.
 *
 * Links resolve to `/collections/[categorySlug]/[slug]`, so each slug must
 * match the product's slug in the admin catalog.
 *
 * PLACEHOLDER PHOTOGRAPHY — royalty-free Unsplash images (Unsplash License),
 * cropped to 4:5 in public/images/featured-range/. Swap for Settle's own
 * lifestyle shoots by replacing the files (or `src`) and updating `alt`.
 */
export const FEATURED_RANGE_CONTENT = {
  heading: "More of the Settle range, on rotation.",
  subtext:
    "Ten pieces spanning every major Settle category, rotating in as new collections launch.",
} as const;

export const FEATURED_RANGE_AUTOPLAY_MS = 5000;

export const FEATURED_RANGE_PRODUCTS: RangeProduct[] = [
  {
    name: "Essen Bedroom Package",
    slug: "wardrobes-essen",
    categorySlug: "wardrobes",
    category: "Bedroom",
    description:
      "Everything a bedroom needs in one matched set: 3D wardrobe, dressing unit, cot and bedside table, in Teak or Sand.",
    finishes: ["Teak", "Sand"],
    image: {
      src: "/images/featured-range/essen-bedroom-package-wardrobe-and-bed.jpg",
      alt: "Essen bedroom package with a full-height wooden wardrobe and upholstered bed in a bright bedroom",
    },
  },
  {
    name: "Berlin Sofa",
    slug: "upholstered-sofas-berlin",
    categorySlug: "upholstered-sofas",
    category: "Upholstery",
    line: "ECO",
    description:
      "From our Eco line: a short-rise 3+1+1 sofa set that keeps everyday comfort affordable.",
    image: {
      src: "/images/featured-range/berlin-eco-grey-fabric-sofa.jpg",
      alt: "Berlin grey fabric sofa in Eco line, on tapered wooden legs in a bright living room",
    },
  },
  {
    name: "Marne Sofa",
    slug: "upholstered-sofas-marne",
    categorySlug: "upholstered-sofas",
    category: "Upholstery",
    line: "PRIME",
    description:
      "Deep cushioning, Prime-line build, for whenever it's time to upgrade the centerpiece.",
    image: {
      src: "/images/featured-range/marne-prime-cushioned-fabric-sofa.jpg",
      alt: "Marne light grey fabric sofa in Prime line, with deep cushions and a soft throw",
    },
  },
  {
    name: "Barcelona Sofa",
    slug: "upholstered-sofas-barcelona",
    categorySlug: "upholstered-sofas",
    category: "Upholstery",
    line: "ULTRA",
    description:
      "Premium fabric, Ultra-line comfort, for a living room that leans a little upscale.",
    image: {
      src: "/images/featured-range/barcelona-ultra-plush-fabric-sofa.jpg",
      alt: "Barcelona fabric sofa in Ultra line, with plush cushions in a warmly lit living room",
    },
  },
  {
    name: "Edinburgh Recliner",
    slug: "recliners-edinburgh",
    categorySlug: "recliners",
    category: "Recliners",
    description:
      "A single-seater recliner chair, built for the one corner of the house reserved for doing absolutely nothing.",
    image: {
      src: "/images/featured-range/edinburgh-single-seater-recliner.jpg",
      alt: "Edinburgh single-seater fabric recliner beside a small round side table",
    },
  },
  {
    name: "Stockholm Sofa Cum Bed",
    slug: "sofa-cum-beds-stockholm",
    categorySlug: "sofa-cum-beds",
    category: "Sofa Cum Beds",
    description:
      "Adjustable back, 3-seater frame, built for homes where the space must work harder.",
    image: {
      src: "/images/featured-range/stockholm-grey-sofa-cum-bed.jpg",
      alt: "Stockholm grey tufted sofa cum bed with an adjustable back, in a compact living room",
    },
  },
  {
    name: 'Orlando "L" Corner Wooden Sofa',
    slug: "wooden-sofas-orlando-l-corner",
    categorySlug: "wooden-sofas",
    category: "Wooden Sofas",
    description:
      "A carved wooden corner sofa, 3+3+C, sized for the living rooms that want a statement piece and have the space for it.",
    image: {
      src: "/images/featured-range/orlando-carved-wooden-sofa.jpg",
      alt: "Carved wooden sofa with a red cushioned seat against a white wall, placeholder for the Orlando L-corner",
    },
  },
  {
    name: "Brampton Wooden Cot",
    slug: "wooden-cots-brampton",
    categorySlug: "wooden-cots",
    category: "Wooden Cots",
    description:
      "Pull-out storage drawers built right into the frame, comfort and practicality sharing the same cot.",
    image: {
      src: "/images/featured-range/brampton-wooden-cot-bedroom.jpg",
      alt: "Brampton wooden cot with white bedding and a matching bedside table in a sunlit bedroom",
    },
  },
];
