import type { PriceOption, Product, ProductImage } from "@/types/product";
import { buildProductSlug } from "@/utils/slugify";
import { getCategoryBySlug } from "@/constants/categories";

/**
 * PLACEHOLDER CATALOG DATA — the 12 featured products from
 * SETTLE_FURNITURE_TOP_FEATURED_PRODUCTS.md, the source of truth for names,
 * categories, descriptions, finishes, dimensions and prices. Nothing here
 * goes beyond that file: no invented specs, materials or finishes.
 *
 * Stands in for MongoDB Atlas content so the site is browsable before the
 * admin dashboard holds real products. `services/products.ts` only reaches
 * for this when MONGODB_URI is unset — never imported by a component.
 *
 * PLACEHOLDER PHOTOGRAPHY — the five images below are stock photos that
 * resemble each product's description; they are not Settle product shots.
 * Barnet, Orlando (L Corner), Cairo, Brampton, Lindsay, Montreal and Garden
 * have no photo yet and show a "photo coming soon" panel. Replace with real
 * product photography (studio + lifestyle) via the admin dashboard.
 */

let idCounter = 1;
function nextId() {
  return `placeholder-${idCounter++}`;
}

interface SeedInput {
  categorySlug: string;
  name: string;
  tagline?: string;
  description: string;
  highlights?: string[];
  finishes?: string[];
  material?: string;
  configuration?: string;
  dimensionsText?: string;
  isPackage?: boolean;
  priceAmount?: number;
  priceOptions?: PriceOption[];
  image?: { url: string; alt: string };
}

const now = new Date().toISOString();

function seed(input: SeedInput): Product {
  const category = getCategoryBySlug(input.categorySlug);
  if (!category) throw new Error(`Unknown category slug: ${input.categorySlug}`);

  const images: ProductImage[] = input.image
    ? [{ ...input.image, isPrimary: true, type: "lifestyle" }]
    : [];

  return {
    _id: nextId(),
    name: input.name,
    slug: buildProductSlug(input.categorySlug, input.name),
    category: {
      _id: `cat-${input.categorySlug}`,
      name: category.name,
      slug: category.slug,
    },
    subLine: null,
    tagline: input.tagline,
    description: input.description,
    highlights: input.highlights ?? [],
    dimensionsText: input.dimensionsText,
    finishes: input.finishes ?? [],
    material: input.material,
    configuration: input.configuration,
    price:
      input.priceAmount !== undefined
        ? { amount: input.priceAmount, currency: "INR", display: true }
        : { amount: 0, currency: "INR", display: false },
    priceOptions: input.priceOptions,
    isPackage: input.isPackage ?? false,
    images,
    isFeatured: true,
    status: "active",
    seo: { title: input.name, description: input.description },
    createdAt: now,
    updatedAt: now,
  };
}

export const PLACEHOLDER_PRODUCTS: Product[] = [
  seed({
    categorySlug: "wardrobes",
    name: "Aura",
    description:
      "Our flagship 2-door wardrobe, the piece that opens the Settle catalog, offered in six finishes.",
    highlights: ["2-door wardrobe (2WR)", "Offered in six finishes"],
    finishes: ["Wallnut", "Cherry", "Oak", "Sand", "Baverian", "Teak"],
    configuration: "2-door (2WR)",
    dimensionsText: `Ht.-6'4" x Wt.-3' x D-1'37"`,
    priceAmount: 8500,
    image: {
      url: "/images/showcase/aura-two-door-wooden-wardrobe.jpg",
      alt: "Two-door wooden wardrobe with two drawers beneath, against a white wall",
    },
  }),
  seed({
    categorySlug: "wardrobes",
    name: "Essen",
    description:
      "A complete bedroom bundle: 3D wardrobe, dressing unit, cot and bedside table, in Teak and Sand finishes.",
    highlights: ["3D wardrobe", "Dressing unit", "Cot (Queen or King)", "Bedside table"],
    finishes: ["Teak", "Sand"],
    configuration: "Queen / King package",
    isPackage: true,
    priceAmount: 31500,
    priceOptions: [
      { label: "Queen package", amount: 31500 },
      { label: "King package", amount: 33300 },
    ],
    image: {
      url: "/images/featured-range/essen-bedroom-package-wardrobe-and-bed.jpg",
      alt: "Bedroom with full-height wooden wardrobes behind an upholstered bed and bench",
    },
  }),
  seed({
    categorySlug: "sofa-cum-beds",
    name: "Munich",
    tagline: "Crafting the luxury you deserve.",
    description: "Our hero sofa-cum-bed: a 3-seater that folds flat for everyday and guest use.",
    highlights: ["3-seater", "Folds flat for everyday and guest use"],
    configuration: "3-seater",
    image: {
      url: "/images/showcase/munich-sofa-cum-bed-sunlit.jpg",
      alt: "Sofa with cushions and folded bedding in afternoon sunlight",
    },
  }),
  seed({
    categorySlug: "wooden-sofas",
    name: "Barnet",
    tagline: "Classic Charm Meets Modern Design",
    description:
      "An angular wooden-frame sofa set in a 3+1+1 configuration, with tufted cushioning.",
    highlights: ["Angular wooden frame", "Tufted cushioning"],
    configuration: "3+1+1",
  }),
  seed({
    categorySlug: "wooden-sofas",
    name: "Orlando (L Corner)",
    tagline: "Elegance Carved in Wood.",
    description: "Our signature carved wooden L-shaped corner sofa, in a 3+3+C configuration.",
    highlights: ["Carved wooden frame", "L-shaped corner layout"],
    configuration: "3+3+C",
    dimensionsText: `83.5" x 83.5" x 36"`,
  }),
  seed({
    categorySlug: "wooden-cots",
    name: "Cairo",
    tagline: "A Wooden Note of Sophistication",
    description: "Our hero cot design, with a decorative slatted headboard in solid seasoned wood.",
    highlights: ["Decorative slatted headboard"],
    material: "Solid seasoned wood",
  }),
  seed({
    categorySlug: "wooden-cots",
    name: "Brampton",
    tagline: "Elevate Your Furniture Aesthetics Effortlessly.",
    description: "A storage cot with pull-out drawers.",
    highlights: ["Pull-out storage drawers"],
  }),
  seed({
    categorySlug: "dining-sets",
    name: "Lindsay",
    tagline: "Backing You with the Opulence of Craft.",
    description: "An 8-seater dining set with a rectangle top.",
    highlights: ["8-seater", "Rectangle top"],
    configuration: "8-seater",
  }),
  seed({
    categorySlug: "dining-sets",
    name: "Wales",
    tagline: "Explore the Epitome of Dining Luxury",
    description: "A dining set with matching upholstered chairs.",
    highlights: ["Matching upholstered chairs"],
    image: {
      url: "/images/showcase/wales-dining-set-wood-table.jpg",
      alt: "Wooden dining table with chairs with dark upholstered seats",
    },
  }),
  seed({
    categorySlug: "dining-tables",
    name: "Montreal",
    tagline: "The Lasting Impression of Craft.",
    description: "A rectangle wood-top dining table, pictured with a matching bench.",
    highlights: ["Rectangle wood top"],
  }),
  seed({
    categorySlug: "dining-tables",
    name: "Garden",
    tagline: "Adaptable Style, Timeless Appeal!",
    description: "A cross-leg dining table with an heirloom-style solid wood build.",
    highlights: ["Cross-leg base", "Heirloom-style solid wood build"],
    material: "Solid wood",
  }),
  seed({
    categorySlug: "center-tables",
    name: "Wylam",
    tagline: "A Touch of Grace for Your Living Space.",
    description: "A round center table with a cross-base.",
    highlights: ["Round top", "Cross-base"],
    image: {
      url: "/images/showcase/wylam-round-wooden-center-table.jpg",
      alt: "Round wooden center table with a cross base in a sunlit living room",
    },
  }),
];

export function getFeaturedPlaceholderProducts(): Product[] {
  return PLACEHOLDER_PRODUCTS.filter((p) => p.isFeatured);
}
