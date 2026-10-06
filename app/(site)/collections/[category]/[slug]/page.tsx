import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllProducts, getProductBySlug, getRelatedProducts } from "@/services/products";
import { Container } from "@/components/shared/Container";
import { ProductGallery } from "@/components/shared/ProductGallery";
import { ProductSpecs } from "@/components/shared/ProductSpecs";
import { EnquiryCTA } from "@/components/shared/EnquiryCTA";
import { ProductGrid } from "@/components/shared/ProductGrid";
import { Badge } from "@/components/ui/Badge";
import { buildMetadata, breadcrumbSchema, productSchema } from "@/lib/seo";
import { SITE_CONFIG } from "@/constants/site";

interface ProductPageProps {
  params: Promise<{ category: string; slug: string }>;
}

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((product) => ({
    category: typeof product.category === "string" ? product.category : product.category.slug,
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};

  const categorySlug =
    typeof product.category === "string" ? product.category : product.category.slug;
  return buildMetadata({
    title: product.seo?.title ?? product.name,
    description: product.seo?.description ?? product.description,
    path: `/collections/${categorySlug}/${product.slug}`,
    image: product.seo?.ogImage,
  });
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { category, slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product || (typeof product.category === "object" && product.category.slug !== category)) {
    notFound();
  }

  const categoryName =
    typeof product.category === "string" ? product.category : product.category.name;
  const relatedProducts = await getRelatedProducts(product);

  const breadcrumbs = breadcrumbSchema([
    { name: "Collections", url: `${SITE_CONFIG.url}/collections` },
    { name: categoryName, url: `${SITE_CONFIG.url}/collections?category=${category}` },
    { name: product.name, url: `${SITE_CONFIG.url}/collections/${category}/${product.slug}` },
  ]);

  return (
    <Container className="py-section">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema(product)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />

      <nav aria-label="Breadcrumb" className="text-muted mb-8 text-sm">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href="/collections" className="hover:text-ink">
              Collections
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href={`/collections?category=${category}`} className="hover:text-ink">
              {categoryName}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-ink">
            {product.name}
          </li>
        </ol>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        <ProductGallery images={product.images} productName={product.name} />

        <div>
          {product.subLine && <Badge variant="accent">{product.subLine}</Badge>}
          <h1 className="text-ink mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            {product.name}
          </h1>
          <p className="text-muted mt-4">{product.description}</p>

          {product.highlights.length > 0 && (
            <ul className="mt-6 space-y-2">
              {product.highlights.map((highlight) => (
                <li key={highlight} className="text-ink flex items-start gap-2 text-sm">
                  <span
                    aria-hidden="true"
                    className="bg-accent mt-2 h-1 w-1 flex-none rounded-full"
                  />
                  {highlight}
                </li>
              ))}
            </ul>
          )}

          {product.finishes.length > 0 && (
            <div className="mt-6">
              <p className="text-ink text-sm font-medium">Available finishes</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {product.finishes.map((finish) => (
                  <span
                    key={finish}
                    className="border-border text-ink rounded-full border px-3 py-1 text-xs"
                  >
                    {finish}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8">
            <EnquiryCTA product={product} />
          </div>
        </div>
      </div>

      <div className="mt-16 max-w-3xl">
        <ProductSpecs product={product} />
      </div>

      {relatedProducts.length > 0 && (
        <section className="mt-20">
          <h2 className="text-ink text-2xl font-semibold tracking-tight">You may also like</h2>
          <div className="mt-8">
            <ProductGrid products={relatedProducts} />
          </div>
        </section>
      )}
    </Container>
  );
}
