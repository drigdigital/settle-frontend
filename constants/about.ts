import type { AboutCtaContent, AboutStory } from "@/types/about";
import type { PageHeroContent } from "@/types/page";

/**
 * About page content, from the approved "Settle Furniture content.docx"
 * (About page section). Headings and body copy are verbatim; the hero strip
 * and section eyebrows are not in that document.
 *
 * PLACEHOLDER PHOTOGRAPHY — images already in public/images/ (also used on
 * the homepage and Experience Center page). Replace with Settle's own
 * showroom, factory-floor and product photography, and update `alt` to match.
 */
export const ABOUT_HERO: PageHeroContent = {
  eyebrow: "About Settle",
  heading: "Furniture that feels like it was always meant to be in your home.",
  intro:
    "Settle makes everyday furniture for real, lived-in homes: wardrobes, sofas, cots, dining sets and more. Honest materials, clean design and fair prices, made in Coimbatore.",
  image: {
    src: "/images/experience-center-hero.jpg",
    alt: "Furniture showroom floor with a grey sectional sofa, recliners and lounge seating on display",
  },
  highlights: [
    {
      id: "made-in-coimbatore",
      icon: "factory",
      title: "Made in Coimbatore",
      line: "On Vaanam's own manufacturing floor",
    },
    {
      id: "real-homes",
      icon: "home",
      title: "For real, lived-in homes",
      line: "Across India",
    },
  ],
};

export const ABOUT_STORIES: AboutStory[] = [
  {
    id: "brand-story",
    eyebrow: "Our Story",
    heading: "An idea that started simple",
    body: "Furniture should feel like it belongs the moment it arrives, not after months of getting used to it. That one idea shaped everything about Settle: pieces that look good without trying too hard, fit the way families actually live, and don’t ask you to pay for things you don’t need.",
    images: [
      {
        src: "/images/hero/living-room-sofa-sunlit.jpg",
        alt: "Cushioned sofa and round wooden coffee table in a sunlit living room",
        objectPosition: "60% center",
      },
    ],
    imageSide: "left",
    tone: "linen",
  },
  {
    id: "manufacturing",
    eyebrow: "Manufacturing",
    heading: "Made in Coimbatore",
    body: "Every Settle piece is made in Coimbatore. Raw material sourcing, construction and finishing all happen in our own plants, so we know exactly what goes into each piece and who made it. Nothing is handed to a third party and nothing is left to chance.",
    // One frame per range the copy names: bedroom packages, sofas, recliners, dining sets.
    images: [
      {
        src: "/images/featured-range/essen-bedroom-package-wardrobe-and-bed.jpg",
        alt: "Full-height wooden wardrobe beside an upholstered bed in a bright bedroom",
      },
      {
        src: "/images/featured-range/marne-prime-cushioned-fabric-sofa.jpg",
        alt: "Light grey fabric sofa with deep cushions and a soft throw",
      },
      {
        src: "/images/featured-range/edinburgh-single-seater-recliner.jpg",
        alt: "Single-seater fabric recliner beside a small round side table",
      },
      {
        src: "/images/showcase/wales-dining-set-wood-table.jpg",
        alt: "Wooden dining table and chairs set for a meal",
      },
    ],
    imageSide: "right",
    tone: "paper",
  },
  {
    id: "range",
    eyebrow: "Our Range",
    heading: "Built for how homes really work",
    body: "A compact 2-door wardrobe for a smaller bedroom. A sofa-cum-bed for a living room that has to do double duty. A dining set that can take a family meal every single day. Our range is designed around real rooms and real routines, across three families of furniture:",
    points: [
      { id: "wooden", title: "Wooden", body: "cots, dining sets, wooden sofas and center tables" },
      { id: "modular", title: "Modular", body: "wardrobes and bedroom packages" },
      {
        id: "upholstered",
        title: "Upholstered",
        body: "sofas in our Eco, Prime and Ultra lines, plus sofa-cum-beds and recliners",
      },
    ],
    // One frame per family the copy names, plus the sofa-cum-bed it calls out.
    images: [
      {
        src: "/images/featured-range/brampton-wooden-cot-bedroom.jpg",
        alt: "Wooden cot with white bedding and a matching bedside table in a sunlit bedroom",
      },
      {
        src: "/images/showcase/wylam-round-wooden-center-table.jpg",
        alt: "Round wooden center table in a sunlit living room",
      },
      {
        src: "/images/featured-range/berlin-eco-grey-fabric-sofa.jpg",
        alt: "Grey fabric sofa on tapered wooden legs in a bright living room",
      },
      {
        src: "/images/featured-range/stockholm-grey-sofa-cum-bed.jpg",
        alt: "Grey tufted sofa cum bed with an adjustable back, in a compact living room",
      },
    ],
    imageSide: "left",
    tone: "linen",
  },
  {
    id: "quality",
    eyebrow: "Quality",
    heading: "One standard, every piece",
    body: "Quality at Settle isn’t a final inspection. It’s checked at each stage of production, from the first cut to the final finish, so the piece that reaches your home is held to the same standard as the one before it. Every piece also comes with a one-year manufacturing warranty.",
    // The two pieces the copy names.
    images: [
      {
        src: "/images/showcase/aura-two-door-wooden-wardrobe.jpg",
        alt: "Two-door wooden wardrobe with a drawer base in a bright room",
      },
      {
        src: "/images/showcase/munich-sofa-cum-bed-sunlit.jpg",
        alt: "Sofa with cushions and bedding in afternoon sunlight",
      },
    ],
    imageSide: "right",
    tone: "paper",
  },
];

export const ABOUT_CTA: AboutCtaContent = {
  heading: "Settle. Made in Coimbatore. Made for your home.",
  primaryCta: { label: "Discover Our Collection", href: "/collections" },
};
