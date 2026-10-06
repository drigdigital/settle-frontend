import type { Product, SubLine } from "@/types/product";
import { buildProductSlug } from "@/utils/slugify";
import { COT_SIZE_CHART, DINING_SIZE_CHART, getCategoryBySlug } from "@/constants/categories";

/**
 * PLACEHOLDER CATALOG DATA.
 *
 * This stands in for MongoDB Atlas content so the site is fully browsable
 * before the admin dashboard has real products loaded. `services/products.ts`
 * only reaches for this when MONGODB_URI is unset — it is never imported by
 * a component directly, and none of it is meant to ship to production.
 */

const PLACEHOLDER_IMAGE = "/images/placeholder.svg";

function image(alt: string, isPrimary = true, type: "studio" | "lifestyle" = "studio") {
  return { url: PLACEHOLDER_IMAGE, alt, isPrimary, type };
}

let idCounter = 1;
function nextId() {
  return `placeholder-${idCounter++}`;
}

interface SeedInput {
  categorySlug: string;
  name: string;
  description: string;
  highlights: string[];
  material?: string;
  configuration?: string;
  subLine?: SubLine;
  finishes?: string[];
  isPackage?: boolean;
  isFeatured?: boolean;
  priceAmount?: number;
  dimensions?: {
    width?: number;
    depth?: number;
    height?: number;
    diameter?: number;
    unit: "ft" | "in";
  };
  sizeOptions?: {
    label: string;
    dimensions: { width?: number; depth?: number; unit: "ft" | "in" };
  }[];
}

const now = new Date().toISOString();
const DEFAULT_FINISHES = ["Walnut", "Cherry", "Sand"];

function seed(input: SeedInput): Product {
  const category = getCategoryBySlug(input.categorySlug);
  if (!category) throw new Error(`Unknown category slug: ${input.categorySlug}`);

  return {
    _id: nextId(),
    name: input.name,
    slug: buildProductSlug(input.categorySlug, input.name),
    category: {
      _id: `cat-${input.categorySlug}`,
      name: category.name,
      slug: category.slug,
    },
    subLine: input.subLine ?? null,
    description: input.description,
    highlights: input.highlights,
    dimensions: input.dimensions,
    sizeOptions: input.sizeOptions,
    finishes: input.finishes ?? DEFAULT_FINISHES,
    material: input.material ?? "Seasoned Mahogany",
    configuration: input.configuration,
    price:
      input.priceAmount !== undefined
        ? { amount: input.priceAmount, currency: "INR", display: true }
        : { amount: 0, currency: "INR", display: false },
    isPackage: input.isPackage ?? false,
    images: [
      image(input.name, true, "studio"),
      image(`${input.name} lifestyle`, false, "lifestyle"),
    ],
    isFeatured: input.isFeatured ?? false,
    status: "active",
    seo: { title: `${input.name} | Settle Furnitures`, description: input.description },
    createdAt: now,
    updatedAt: now,
  };
}

export const PLACEHOLDER_PRODUCTS: Product[] = [
  // Wardrobes
  seed({
    categorySlug: "wardrobes",
    name: "Aura",
    description:
      "A clean-lined wardrobe in seasoned Mahogany with soft-close hinges and a generous hanging bay.",
    highlights: ["Soft-close hinges", "Adjustable interior shelving", "Solid wood frame"],
    dimensions: { width: 6, height: 7, depth: 2, unit: "ft" },
    priceAmount: 68000,
    isFeatured: true,
  }),
  seed({
    categorySlug: "wardrobes",
    name: "Essen",
    description:
      "The Essen bedroom package in Queen configuration — wardrobe, bed and nightstand as one cohesive set.",
    highlights: ["Matched grain across pieces", "Queen bed included", "Two-tone finish option"],
    dimensions: { width: 7, height: 7, depth: 2, unit: "ft" },
    isPackage: true,
    isFeatured: true,
  }),
  seed({
    categorySlug: "wardrobes",
    name: "Essen",
    description:
      "The Essen bedroom package in King configuration — wardrobe, bed and nightstand as one cohesive set.",
    highlights: ["Matched grain across pieces", "King bed included", "Two-tone finish option"],
    dimensions: { width: 8, height: 7, depth: 2, unit: "ft" },
    isPackage: true,
  }),

  // Study Tables
  seed({
    categorySlug: "study-tables",
    name: "Study Table – Model 1",
    description: "A compact study table with an integrated drawer, sized for smaller rooms.",
    highlights: ["Integrated drawer", "Cable-management cutout"],
    dimensions: { width: 3.5, depth: 2, height: 2.5, unit: "ft" },
    priceAmount: 14500,
  }),
  seed({
    categorySlug: "study-tables",
    name: "Study Table – Model 2",
    description: "A wide-top study table with open shelving for books and files.",
    highlights: ["Open side shelving", "Scratch-resistant top"],
    dimensions: { width: 4.5, depth: 2, height: 2.5, unit: "ft" },
    priceAmount: 17500,
  }),

  // TV Units
  seed({
    categorySlug: "tv-units",
    name: "TV Unit – Model 3",
    description: "A low-profile TV unit with closed storage and a floating shelf for the soundbar.",
    highlights: ["Closed cable storage", "Floating shelf"],
    dimensions: { width: 5, depth: 1.5, height: 1.5, unit: "ft" },
    priceAmount: 22000,
  }),
  seed({
    categorySlug: "tv-units",
    name: "Munich",
    description:
      "A wall-mounted TV unit with a warm walnut finish, designed for a floating, gallery-like look.",
    highlights: ["Wall-mounted", "Concealed wiring channel"],
    dimensions: { width: 6, depth: 1.3, height: 1.2, unit: "ft" },
    priceAmount: 28000,
    isFeatured: true,
  }),

  // Shoe Racks
  seed({
    categorySlug: "shoe-racks",
    name: "Shoe Rack – Model 1",
    description: "A slim entryway shoe rack with a lift-top bench seat.",
    highlights: ["Bench seat top", "Ventilated shelving"],
    dimensions: { width: 3, depth: 1.2, height: 1.5, unit: "ft" },
    priceAmount: 9500,
  }),
  seed({
    categorySlug: "shoe-racks",
    name: "Barnet",
    description: "A tall shoe cabinet with louvred doors for airflow and a mirrored top panel.",
    highlights: ["Louvred doors", "Mirrored top panel"],
    dimensions: { width: 3.5, depth: 1.3, height: 5, unit: "ft" },
    priceAmount: 16500,
    isFeatured: true,
  }),

  // Upholstered Sofas
  seed({
    categorySlug: "upholstered-sofas",
    name: "Denver",
    description:
      "An ECO-line three-seater upholstered sofa built for everyday comfort at an accessible price.",
    highlights: ["High-density foam", "Removable cushion covers"],
    subLine: "ECO",
    configuration: "3-seater",
    material: "Engineered hardwood frame",
  }),
  seed({
    categorySlug: "upholstered-sofas",
    name: "Cairo",
    description:
      "A PRIME-line sofa with a tailored silhouette and deep-seated comfort, in a 3+2 configuration.",
    highlights: ["Kiln-dried hardwood frame", "Pocketed spring seating"],
    subLine: "PRIME",
    configuration: "3+2",
    material: "Seasoned hardwood frame",
    isFeatured: true,
  }),
  seed({
    categorySlug: "upholstered-sofas",
    name: "Vienna",
    description:
      "An ULTRA-line high-density sofa designed for daily lounging, in a generous corner configuration.",
    highlights: ["High-resilience foam core", "Stain-resistant upholstery"],
    subLine: "ULTRA",
    configuration: "L-corner",
    material: "Seasoned hardwood frame",
  }),

  // Recliners
  seed({
    categorySlug: "recliners",
    name: "Brampton",
    description:
      "A RECLINE-line single-seater recliner with a smooth glide mechanism and padded headrest.",
    highlights: ["Smooth glide mechanism", "Padded headrest"],
    subLine: "RECLINE",
    configuration: "1-seater",
    isFeatured: true,
  }),
  seed({
    categorySlug: "recliners",
    name: "Shanghai",
    description:
      "A RECLINE-line three-seater recliner sofa for the whole family, with independent recline per seat.",
    highlights: ["Independent recline per seat", "Cup holders"],
    subLine: "RECLINE",
    configuration: "3-seater",
  }),

  // Sofa Cum Beds
  seed({
    categorySlug: "sofa-cum-beds",
    name: "Lindsay",
    description: "A sofa cum bed that converts in one motion, upholstered in a durable weave.",
    highlights: ["One-motion conversion", "Storage beneath the seat"],
    configuration: "2-seater to double bed",
    isFeatured: true,
  }),
  seed({
    categorySlug: "sofa-cum-beds",
    name: "Chicago",
    description: "A compact sofa cum bed suited to studio layouts, with a memory-foam topper.",
    highlights: ["Memory-foam topper", "Compact footprint"],
    configuration: "Single-seater to single bed",
  }),

  // Wooden Sofas
  seed({
    categorySlug: "wooden-sofas",
    name: "Orlando L-Corner",
    description:
      "A solid-wood L-corner sofa in a 3+3+C configuration, hand-carved detailing on the arms.",
    highlights: ["Hand-carved arm detailing", "Removable seat cushions"],
    configuration: "3+3+C",
    isFeatured: true,
  }),
  seed({
    categorySlug: "wooden-sofas",
    name: "Wylam",
    description:
      "A traditional solid-wood sofa set in a 3+1+1 configuration with a warm cherry finish option.",
    highlights: ["Traditional joinery", "Warm cherry finish option"],
    configuration: "3+1+1",
  }),

  // Wooden Cots
  seed({
    categorySlug: "wooden-cots",
    name: "Wales",
    description:
      "A solid-wood cot with a panelled headboard, available across the full size range.",
    highlights: ["Panelled headboard", "Center support slats"],
    sizeOptions: COT_SIZE_CHART,
    isFeatured: true,
  }),
  seed({
    categorySlug: "wooden-cots",
    name: "Garden",
    description:
      "A low-profile platform cot with clean lines, available across the full size range.",
    highlights: ["Low platform silhouette", "No box-spring required"],
    sizeOptions: COT_SIZE_CHART,
  }),

  // Dining Sets
  seed({
    categorySlug: "dining-sets",
    name: "Montreal",
    description: "A 6-seater dining set with a marble-top table and upholstered chairs.",
    highlights: ["Marble-top table", "Upholstered chair seats"],
    sizeOptions: DINING_SIZE_CHART,
    priceAmount: undefined,
    isFeatured: true,
  }),
  seed({
    categorySlug: "dining-sets",
    name: "Shanghai",
    description: "A 4-seater solid-wood dining set suited to compact dining spaces.",
    highlights: ["Compact 4-seater footprint", "Solid wood chairs"],
    sizeOptions: DINING_SIZE_CHART,
  }),

  // Dining Chairs
  seed({
    categorySlug: "dining-chairs",
    name: "Denver",
    description: "A solid-wood dining chair with a woven cane back panel, sold standalone.",
    highlights: ["Woven cane back panel", "Sold individually"],
  }),
  seed({
    categorySlug: "dining-chairs",
    name: "Vienna",
    description: "An upholstered-seat dining chair with a curved backrest, sold standalone.",
    highlights: ["Curved backrest", "Upholstered seat pad"],
  }),

  // Dining Tables
  seed({
    categorySlug: "dining-tables",
    name: "Wylam",
    description: "A solid-wood dining table sold standalone, pairs with any Settle dining chair.",
    highlights: ["Sold standalone", "Pairs with any dining chair"],
    dimensions: { width: 6, depth: 4, unit: "ft" },
  }),
  seed({
    categorySlug: "dining-tables",
    name: "Chicago",
    description: "A round dining table sold standalone, ideal for smaller dining rooms.",
    highlights: ["Round profile", "Seats 4 comfortably"],
    dimensions: { diameter: 4, unit: "ft" },
  }),

  // Center Tables
  seed({
    categorySlug: "center-tables",
    name: "Garden",
    description: "A solid-wood center table with a lower shelf for magazines and remotes.",
    highlights: ["Lower storage shelf", "Rounded corners"],
    dimensions: { width: 4, depth: 2, height: 1.5, unit: "ft" },
    priceAmount: 12000,
  }),
  seed({
    categorySlug: "center-tables",
    name: "Denver Teapoy",
    description:
      "A compact teapoy in solid wood, sized to sit beside a single recliner or sofa arm.",
    highlights: ["Compact teapoy footprint", "Solid wood top"],
    dimensions: { width: 1.5, depth: 1.5, height: 1.5, unit: "ft" },
    priceAmount: 5500,
  }),
];

export function getFeaturedPlaceholderProducts(): Product[] {
  return PLACEHOLDER_PRODUCTS.filter((p) => p.isFeatured);
}
