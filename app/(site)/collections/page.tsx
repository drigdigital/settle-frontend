import { getAllProducts } from "@/services/products";
import { getAllCategories } from "@/services/categories";
import { Container } from "@/components/shared/Container";
import { CollectionsFilters } from "@/components/shared/CollectionsFilters";
import { SearchBox } from "@/components/shared/SearchBox";
import { ProductGrid } from "@/components/shared/ProductGrid";
import { buildMetadata } from "@/lib/seo";
import type { ProductFilters } from "@/types/product";

export const metadata = buildMetadata({
  title: "Collections",
  description:
    "Browse the full Settle Furnitures catalog — wardrobes, sofas, dining, cots, and more.",
  path: "/collections",
});

interface CollectionsPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

function toFilters(params: Record<string, string | string[] | undefined>): ProductFilters {
  const get = (key: string) => {
    const value = params[key];
    return Array.isArray(value) ? value[0] : value;
  };

  return {
    category: get("category"),
    subLine: get("subLine") as ProductFilters["subLine"],
    material: get("material"),
    finish: get("finish"),
    search: get("search"),
    sort: get("sort") as ProductFilters["sort"],
  };
}

export default async function CollectionsPage({ searchParams }: CollectionsPageProps) {
  const params = await searchParams;
  const filters = toFilters(params);

  const [products, categories] = await Promise.all([getAllProducts(filters), getAllCategories()]);

  return (
    <Container className="py-section">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-ink text-3xl font-semibold tracking-tight sm:text-4xl">
            Collections
          </h1>
          <p className="text-muted mt-2">{products.length} products</p>
        </div>
        <SearchBox />
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[240px_1fr]">
        <CollectionsFilters categories={categories} />
        <ProductGrid products={products} />
      </div>
    </Container>
  );
}
