import { ClosingCta } from "@/components/shared/ClosingCta";
import { PRODUCT_FAMILIES } from "@/constants/productFamilies";
import { PRODUCTS_CATALOG, PRODUCTS_CTA, PRODUCTS_HERO } from "@/constants/products";
import { SITE_CONFIG } from "@/constants/site";
import { breadcrumbSchema, buildMetadata } from "@/lib/seo";
import { ProductCatalog } from "@/sections/products/ProductCatalog";
import { ProductsHero } from "@/sections/products/ProductsHero";
import { RangeFamilies } from "@/sections/products/RangeFamilies";
import { getAllProducts } from "@/services/products";
import { placeCategorySlug, summarizeFamilies } from "@/utils/productFamily";
import type { ProductFamilyId } from "@/types/productFamily";

const PRODUCTS_TITLE = "Products | Settle Furniture";

// `absolute` skips the root layout's "%s | Settle Furnitures" template so the approved title renders as written.
export const metadata = {
  ...buildMetadata({
    title: PRODUCTS_TITLE,
    description:
      "Explore wooden, modular and upholstered furniture from Settle: cots, dining sets, wardrobes, sofas, recliners and more.",
    path: "/collections",
  }),
  title: { absolute: PRODUCTS_TITLE },
};

interface ProductsPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

function isFamilyId(value: unknown): value is ProductFamilyId {
  return PRODUCT_FAMILIES.some((family) => family.id === value);
}

/**
 * Products page (served at /collections, the catalog route in CLAUDE.md §8):
 * hero → one screen per range family (Wooden, Modular, Upholstered) with its
 * subcategory tiles → family/subcategory-filtered product grid → closing CTA.
 * Server-rendered from the catalog (services/products.ts) for SEO;
 * [data-snap-page] opts into the site's gentle section snapping. A catalogue,
 * not a shop: every product path ends in an enquiry, with no cart or checkout.
 */
export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const { family, sub, category } = await searchParams;
  const products = await getAllProducts();
  const families = summarizeFamilies(products);

  // ?family=&sub= from the range tiles; ?category= from the sitemap and product breadcrumbs.
  const legacy = typeof category === "string" ? placeCategorySlug(category) : null;
  const initialFamily = isFamilyId(family) ? family : legacy?.familyId;
  const initialSubcategory = typeof sub === "string" ? sub : legacy?.subcategoryId;

  const mosaic = products.filter((product) => product.images.length > 0).slice(0, 3);

  const breadcrumbs = breadcrumbSchema([
    { name: "Home", url: SITE_CONFIG.url },
    { name: "Products", url: `${SITE_CONFIG.url}/collections` },
  ]);

  return (
    <div data-snap-page>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />

      <ProductsHero
        content={PRODUCTS_HERO}
        mosaic={mosaic}
        productCount={products.length}
        rangeCount={families.length}
      />
      <RangeFamilies families={families} />
      {/* Keyed by the filter so a range tile link resets the catalog's selection. */}
      <ProductCatalog
        key={`${initialFamily ?? "all"}-${initialSubcategory ?? "all"}`}
        id="products"
        content={PRODUCTS_CATALOG}
        products={products}
        initialFamily={initialFamily}
        initialSubcategory={initialSubcategory}
      />
      <ClosingCta content={PRODUCTS_CTA} className="snap-start" />
    </div>
  );
}
