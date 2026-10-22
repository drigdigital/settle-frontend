import type { ProductFamily } from "@/types/productFamily";

/**
 * The Settle range as the Products page presents it: three families, each
 * with its subcategories. Names and descriptions are verbatim from the
 * approved "Settle Furniture content.docx" (PRODUCTS PAGE). Each subcategory
 * maps onto the catalog categories in constants/categories.ts, so products
 * entered in the admin dashboard land in the right place automatically.
 *
 * CLIENT TO CONFIRM — Study Tables, TV Units and Shoe Racks are catalog
 * categories the content document doesn't place. They sit under Modular
 * (storage furniture, sized in feet like wardrobes) without descriptions.
 * Dining Chairs are grouped into "Dining Sets & Tables".
 *
 * PLACEHOLDER PHOTOGRAPHY — `coverImage` is a royalty-free stock photo shown
 * on a tile only while none of its products has a photo. Replace with Settle
 * photography (or remove once products with photos exist).
 */
export const PRODUCT_FAMILIES: ProductFamily[] = [
  {
    id: "wooden",
    name: "Wooden",
    description: "Solid, dependable furniture for bedrooms, living rooms and dining spaces.",
    subcategories: [
      {
        id: "cots",
        name: "Cots",
        description: "Sturdy wooden frames, with storage options built right in.",
        categorySlugs: ["wooden-cots"],
      },
      {
        id: "dining",
        name: "Dining Sets & Tables",
        description: "From everyday family tables to larger sets for homes that gather often.",
        categorySlugs: ["dining-sets", "dining-tables", "dining-chairs"],
      },
      {
        id: "wooden-sofas",
        name: "Wooden Sofas",
        description: "Carved and framed wood seating with a presence of its own.",
        categorySlugs: ["wooden-sofas"],
      },
      {
        id: "center-tables",
        name: "Center Tables",
        description: "The finishing piece that ties a living room together.",
        categorySlugs: ["center-tables"],
      },
    ],
  },
  {
    id: "modular",
    name: "Modular",
    description:
      "Smart, space-conscious furniture designed to fit your room, not the other way round.",
    subcategories: [
      {
        id: "wardrobes",
        name: "Wardrobes",
        description:
          "From compact 2-door units to full-height designs, in finishes that suit every room.",
        categorySlugs: ["wardrobes"],
        isPackage: false,
      },
      {
        id: "bedroom-packages",
        name: "Bedroom Packages",
        description: "A matched wardrobe, dressing unit, cot and bedside table, planned together.",
        categorySlugs: ["wardrobes"],
        isPackage: true,
      },
      { id: "study-tables", name: "Study Tables", categorySlugs: ["study-tables"] },
      { id: "tv-units", name: "TV Units", categorySlugs: ["tv-units"] },
      { id: "shoe-racks", name: "Shoe Racks", categorySlugs: ["shoe-racks"] },
    ],
  },
  {
    id: "upholstered",
    name: "Upholstered",
    description: "Soft, comfortable seating, from everyday value to a more upscale feel.",
    subcategories: [
      {
        id: "sofas",
        name: "Sofas",
        description:
          "Three lines to match your budget and taste: Eco for affordable everyday comfort, Prime for deeper cushioning, Ultra for premium fabric and comfort.",
        categorySlugs: ["upholstered-sofas"],
        coverImage: {
          url: "/images/featured-range/marne-prime-cushioned-fabric-sofa.jpg",
          alt: "Light grey fabric sofa with deep cushions and a soft throw",
        },
      },
      {
        id: "sofa-cum-beds",
        name: "Sofa Cum Beds",
        description: "One piece that seats the family by day and sleeps guests at night.",
        categorySlugs: ["sofa-cum-beds"],
      },
      {
        id: "recliners",
        name: "Recliners",
        description: "A single-seater built for doing absolutely nothing.",
        categorySlugs: ["recliners"],
        coverImage: {
          url: "/images/featured-range/edinburgh-single-seater-recliner.jpg",
          alt: "Single-seater fabric recliner beside a small round side table",
        },
      },
    ],
  },
];
