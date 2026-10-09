import { ClosingCta } from "@/components/shared/ClosingCta";
import { PRODUCTS_CATALOG, PRODUCTS_CTA, PRODUCTS_HERO } from "@/constants/products";
import { SITE_CONFIG } from "@/constants/site";
import { breadcrumbSchema, buildMetadata } from "@/lib/seo";
import { ProductCatalog } from "@/sections/products/ProductCatalog";
import { ProductsHero } from "@/sections/products/ProductsHero";
import { getAllProducts } from "@/services/products";

export const metadata = buildMetadata({
  title: "Products",
  description:
    "Browse Settle Furniture's featured products: wardrobes, bedroom packages, sofas, cots, dining and center tables, with prices where listed and an enquiry on every piece.",
  path: "/collections",
});

interface ProductsPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

/**
 * Products page (served at /collections, the catalog route in CLAUDE.md §8):
 * hero → category-filtered product grid → closing CTA. Server-rendered from
 * the catalog (services/products.ts) for SEO; [data-snap-page] opts into the
 * site's gentle section snapping. Every product path ends in an enquiry —
 * there is no cart or checkout.
 */
export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const { category } = await searchParams;
  const products = await getAllProducts();

  const mosaic = products.filter((product) => product.images.length > 0).slice(0, 3);
  const categoryCount = new Set(
    products.map((product) =>
      typeof product.category === "string" ? product.category : product.category.slug,
    ),
  ).size;

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
        categoryCount={categoryCount}
      />
      <ProductCatalog
        id="products"
        content={PRODUCTS_CATALOG}
        products={products}
        initialCategory={typeof category === "string" ? category : undefined}
      />
      <ClosingCta content={PRODUCTS_CTA} className="snap-start" />
    </div>
  );
}
