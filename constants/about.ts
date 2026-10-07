import type {
  AboutCtaContent,
  AboutHeroContent,
  AboutLeadershipContent,
  AboutStory,
} from "@/types/about";

/**
 * About page content, from the approved Settle_Furniture_Website_Content
 * document (About page section). Headings and body copy are verbatim; the
 * hero strip and section eyebrows restate facts from that copy and add no
 * new claims.
 *
 * PLACEHOLDER PHOTOGRAPHY — images already in public/images/ (also used on
 * the homepage and Experience Center page). Replace with Settle's own
 * showroom, factory-floor and product photography, and update `alt` to match.
 */
export const ABOUT_HERO: AboutHeroContent = {
  eyebrow: "About Settle",
  heading: "Furniture that feels like it was always meant to be in your home.",
  intro:
    "Settle Furniture is a furniture brand under Vaanam Furniture, part of the Martin Group, Coimbatore that acts as a Subsidiary company of Vaanam. Where Vaanam brings the manufacturing scale behind three furniture brands, Settle brings that same strength into everyday homes, furniture for people furnishing real, lived-in spaces across South India.",
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
      id: "three-brands",
      icon: "layers",
      title: "One of three Vaanam brands",
      line: "Alongside Chera and Kov",
    },
    {
      id: "real-homes",
      icon: "home",
      title: "For real, lived-in homes",
      line: "Across South India",
    },
  ],
};

export const ABOUT_STORIES: AboutStory[] = [
  {
    id: "brand-story",
    eyebrow: "Our Story",
    heading: "A brand built to feel instantly at home.",
    body: "Settle Furniture was created on a simple idea: furniture should feel like it belongs the moment it arrives, not after months of getting used to it. As one of three brands under Vaanam, alongside Chera and Kov, Settle was designed for homes that want trend-aware style without the wait, and honest quality without the premium price tag.",
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
    heading: "Manufactured with intent, in Coimbatore.",
    body: "Every piece that carries the Settle Furniture name comes off Vaanam's own manufacturing floor in Coimbatore, from wardrobes and bedroom packages to sofas across the Eco, Prime and Ultra lines, recliners and dining sets. Raw material sourcing, construction and finishing all happen in-house, which keeps quality and consistency in Settle's hands at every stage, not outsourced to a third party.",
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
    id: "quality",
    eyebrow: "Quality",
    heading: "Quality held to one standard, always.",
    body: "Settle is checked against the same quality benchmark as every brand in the Vaanam group, verified at each stage of production rather than only at final inspection. Whether it's an entry-level Aura wardrobe or a Munich sofa-cum-bed, the piece that reaches a home is held to the same standard as the piece before it.",
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
    imageSide: "left",
    tone: "navy",
  },
];

/**
 * RESERVED — leadership names, designations, bios and photos have not been
 * shared yet. Add each person to `profiles` (name, title, 2–3 line bio,
 * square photo in public/images/leadership/) and the grid replaces the
 * reserved cards. Reserved titles are the examples listed in the content
 * document; adjust once the actual line-up is confirmed.
 */
export const ABOUT_LEADERSHIP: AboutLeadershipContent = {
  eyebrow: "Leadership",
  heading: "The people behind Settle.",
  profiles: [],
  reservedTitles: ["Founder / Promoter", "Manufacturing Head", "Design Lead"],
};

export const ABOUT_CTA: AboutCtaContent = {
  heading: "Settle Furniture. Built in Coimbatore. Made for your home.",
  primaryCta: { label: "Discover Our Collection", href: "/collections" },
};
