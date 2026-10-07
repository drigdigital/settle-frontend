import type { ShowcaseItem } from "@/types/showcase";

/**
 * Homepage Section 03 — best-seller showcase.
 *
 * Links follow the product detail route `/collections/[category]/[category-name]`
 * (CLAUDE.md §5 slug rule). They resolve once these products exist in the
 * admin catalog under the same category.
 *
 * PLACEHOLDER PHOTOGRAPHY — royalty-free Unsplash images (Unsplash License)
 * in public/images/showcase/. Swap the files or `src`, and update `alt` to match.
 */
export const SHOWCASE_CONTENT = {
  heading: "Our five most-loved pieces.",
  subtext:
    "A quick showcase of the Settle designs customers return to, spanning bedroom, living and dining.",
  viewAll: { label: "View All Collections", href: "/collections" },
} as const;

export const SHOWCASE_ITEMS: ShowcaseItem[] = [
  {
    id: "aura-wardrobe",
    name: "Aura Wardrobe",
    category: "Wardrobes",
    description:
      "The wardrobe that opens our range: two doors, six finishes from warm Oak to deep Cherry, and no wasted detail.",
    href: "/collections/wardrobes/wardrobes-aura",
    tone: "sand",
    image: {
      src: "/images/showcase/aura-two-door-wooden-wardrobe.jpg",
      alt: "Two-door wooden wardrobe with a drawer base in a bright room",
    },
  },
  {
    id: "barnet-wooden-sofa",
    name: "Barnet Wooden Sofa",
    category: "Wooden Sofas",
    description:
      "Angular wood frame, tufted cushions, a 3+1+1 set that gives a living room some backbone.",
    href: "/collections/wooden-sofas/wooden-sofas-barnet",
    tone: "oak",
    image: {
      src: "/images/showcase/barnet-wooden-sofa-living-room.jpg",
      alt: "Three-seater sofa on a wooden frame in an open, sunlit living room",
    },
  },
  {
    id: "munich-sofa-cum-bed",
    name: "Munich Sofa Cum Bed",
    category: "Sofa Cum Beds",
    description:
      "Folds out into a full bed in seconds, for a living room that needs to pull double duty.",
    href: "/collections/sofa-cum-beds/sofa-cum-beds-munich",
    tone: "teak",
    image: {
      src: "/images/showcase/munich-sofa-cum-bed-sunlit.jpg",
      alt: "Sofa with cushions and bedding in afternoon sunlight",
    },
  },
  {
    id: "wales-dining-set",
    name: "Wales Dining Set",
    category: "Dining",
    description:
      "Built for gathering: a sturdy wood table paired with upholstered chairs that hold up to daily family meals.",
    href: "/collections/dining-sets/dining-sets-wales",
    tone: "cherry",
    image: {
      src: "/images/showcase/wales-dining-set-wood-table.jpg",
      alt: "Wooden dining table with upholstered wooden chairs in a bright dining room",
    },
  },
  {
    id: "wylam-center-table",
    name: "Wylam Center Table",
    category: "Center Tables",
    description:
      "Round top, crossed base, the kind of finishing piece a living room needs and rarely gets right.",
    href: "/collections/center-tables/center-tables-wylam",
    tone: "walnut",
    image: {
      src: "/images/showcase/wylam-round-wooden-center-table.jpg",
      alt: "Round wooden center table in a sunlit living room",
    },
  },
];
