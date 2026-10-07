import type { HeroContent, HeroSlide } from "@/types/hero";

/**
 * Homepage hero (Section 01). Copy is shared by every slide; only the image
 * changes. Edit text, links and images here, never inside the component.
 */
export const HERO_CONTENT: HeroContent = {
  headline: "Furniture that feels like home from day one.",
  subtext:
    "We make wardrobes, sofas, cots and dining sets for real homes, every piece built in-house by Vaanam Furniture in Coimbatore. Nothing overpriced, nothing overdesigned, just furniture that holds up and looks good doing it.",
  primaryCta: { label: "Shop The Collection", href: "/collections" },
  secondaryCta: { label: "Find A Settle Dealer Near You", href: "/dealers" },
};

export const HERO_AUTOPLAY_MS = 6000;

/**
 * PLACEHOLDER PHOTOGRAPHY — royalty-free Unsplash images (Unsplash License),
 * stored in public/images/hero/. Swap for Settle's own lifestyle shoots by
 * replacing the files (or changing `src`) and updating `alt` to match.
 */
export const HERO_SLIDES: HeroSlide[] = [
  {
    id: "living-room",
    label: "Living Room",
    image: {
      src: "/images/hero/living-room-sofa-sunlit.jpg",
      alt: "Cushioned sofa and round wooden coffee table in a sunlit living room",
      objectPosition: "70% center",
    },
  },
  {
    id: "bedroom",
    label: "Bedroom",
    image: {
      src: "/images/hero/bedroom-wooden-cot-storage.jpg",
      alt: "Wooden cot beside a wood-topped storage unit in a bright, airy bedroom",
      objectPosition: "35% center",
    },
  },
  {
    id: "dining",
    label: "Dining",
    image: {
      src: "/images/hero/dining-room-wooden-dining-set.jpg",
      alt: "Solid wood dining table and chairs in an open dining room facing a garden",
      objectPosition: "55% center",
    },
  },
];
