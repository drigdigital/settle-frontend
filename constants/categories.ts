export interface CategoryDefinition {
  slug: string;
  name: string;
  goLiveCount: number;
  notes?: string;
  hasSizeChart?: boolean;
}

/**
 * The 13 launch categories from CLAUDE.md §5. Go-live counts are the target
 * catalog size, not a live count — the admin dashboard is the source of truth
 * once products are entered.
 */
export const CATEGORIES: CategoryDefinition[] = [
  {
    slug: "wardrobes",
    name: "Wardrobes",
    goLiveCount: 8,
    notes: "Includes Essen Queen/King bedroom packages",
  },
  { slug: "study-tables", name: "Study Tables", goLiveCount: 5 },
  { slug: "tv-units", name: "TV Units", goLiveCount: 9 },
  { slug: "shoe-racks", name: "Shoe Racks", goLiveCount: 5 },
  {
    slug: "upholstered-sofas",
    name: "Upholstered Sofas",
    goLiveCount: 24,
    notes: "ECO / PRIME / ULTRA sub-lines",
  },
  { slug: "recliners", name: "Recliners", goLiveCount: 8, notes: "RECLINE line" },
  { slug: "sofa-cum-beds", name: "Sofa Cum Beds", goLiveCount: 5 },
  { slug: "wooden-sofas", name: "Wooden Sofas", goLiveCount: 16 },
  { slug: "wooden-cots", name: "Wooden Cots", goLiveCount: 16, hasSizeChart: true },
  {
    slug: "dining-sets",
    name: "Dining Sets",
    goLiveCount: 30,
    hasSizeChart: true,
    notes: "Includes marble-top 4/6-seater variants",
  },
  { slug: "dining-chairs", name: "Dining Chairs", goLiveCount: 15 },
  { slug: "dining-tables", name: "Dining Tables", goLiveCount: 15 },
  { slug: "center-tables", name: "Center Tables", goLiveCount: 13, notes: "Includes teapoys" },
];

export const HERO_PRODUCT_NAMES = [
  "Aura",
  "Essen",
  "Munich",
  "Barnet",
  "Orlando L-Corner",
  "Cairo",
  "Brampton",
  "Lindsay",
  "Wales",
  "Montreal",
  "Garden",
  "Wylam",
] as const;

export const COT_SIZE_CHART = [
  { label: "King", dimensions: { width: 72, depth: 75, unit: "in" as const } },
  { label: "King (long)", dimensions: { width: 72, depth: 78, unit: "in" as const } },
  { label: "Queen", dimensions: { width: 60, depth: 75, unit: "in" as const } },
  { label: "Queen (long)", dimensions: { width: 60, depth: 78, unit: "in" as const } },
  { label: "Double", dimensions: { width: 48, depth: 75, unit: "in" as const } },
  { label: "Double (long)", dimensions: { width: 48, depth: 78, unit: "in" as const } },
  { label: "Single", dimensions: { width: 36, depth: 75, unit: "in" as const } },
  { label: "Single (long)", dimensions: { width: 36, depth: 78, unit: "in" as const } },
];

export const DINING_SIZE_CHART = [
  { label: "6-seater", dimensions: { width: 6, depth: 4, unit: "ft" as const } },
  { label: "4-seater", dimensions: { width: 5, depth: 3, unit: "ft" as const } },
  { label: "4-seater (square)", dimensions: { width: 4, depth: 4, unit: "ft" as const } },
  { label: "Round (4ft dia)", dimensions: { diameter: 4, unit: "ft" as const } },
];

export function getCategoryBySlug(slug: string): CategoryDefinition | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}
