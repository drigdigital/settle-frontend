import { connectToDatabase } from "@/lib/db";
import { Product as ProductModel, type ProductDocument } from "@/models/Product";
import { Category as CategoryModel } from "@/models/Category";
import { PLACEHOLDER_PRODUCTS } from "@/lib/placeholder-data";
import type { Product, ProductFilters } from "@/types/product";

/**
 * Serializes a lean Mongoose product (with category populated) into the
 * plain `Product` shape components expect — ObjectIds and Dates don't
 * survive the server → client boundary as-is.
 */
function serializeProduct(
  doc: ProductDocument & { category: { _id: unknown; name: string; slug: string } },
): Product {
  return {
    ...doc,
    _id: String(doc._id),
    category: {
      _id: String(doc.category._id),
      name: doc.category.name,
      slug: doc.category.slug,
    },
    createdAt: doc.createdAt.toISOString(),
    updatedAt: doc.updatedAt.toISOString(),
  } as Product;
}

export async function getAllProducts(filters: ProductFilters = {}): Promise<Product[]> {
  const connection = await connectToDatabase();

  if (!connection) {
    return applyFilters(PLACEHOLDER_PRODUCTS, filters);
  }

  const query: Record<string, unknown> = { status: "active" };
  if (filters.subLine) query.subLine = filters.subLine;
  if (filters.material) query.material = filters.material;
  if (filters.finish) query.finishes = filters.finish;
  if (filters.search) query.$text = { $search: filters.search };

  if (filters.category) {
    const category = await CategoryModel.findOne({ slug: filters.category }).lean();
    if (!category) return [];
    query.category = category._id;
  }

  const docs = await ProductModel.find(query).populate("category").lean();
  return (
    docs as unknown as (ProductDocument & {
      category: { _id: unknown; name: string; slug: string };
    })[]
  ).map(serializeProduct);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const connection = await connectToDatabase();

  if (!connection) {
    return PLACEHOLDER_PRODUCTS.find((p) => p.slug === slug) ?? null;
  }

  const doc = await ProductModel.findOne({ slug, status: "active" }).populate("category").lean();
  if (!doc) return null;
  return serializeProduct(
    doc as unknown as ProductDocument & { category: { _id: unknown; name: string; slug: string } },
  );
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const connection = await connectToDatabase();

  if (!connection) {
    return PLACEHOLDER_PRODUCTS.filter((p) => p.isFeatured);
  }

  const docs = await ProductModel.find({ isFeatured: true, status: "active" })
    .populate("category")
    .lean();
  return (
    docs as unknown as (ProductDocument & {
      category: { _id: unknown; name: string; slug: string };
    })[]
  ).map(serializeProduct);
}

export async function getRelatedProducts(product: Product, limit = 4): Promise<Product[]> {
  const categorySlug =
    typeof product.category === "string" ? product.category : product.category.slug;
  const all = await getAllProducts({ category: categorySlug });
  return all.filter((p) => p.slug !== product.slug).slice(0, limit);
}

function applyFilters(products: Product[], filters: ProductFilters): Product[] {
  let result = products;

  if (filters.category) {
    result = result.filter(
      (p) => (typeof p.category === "string" ? p.category : p.category.slug) === filters.category,
    );
  }
  if (filters.subLine) result = result.filter((p) => p.subLine === filters.subLine);
  if (filters.material) result = result.filter((p) => p.material === filters.material);
  if (filters.finish) result = result.filter((p) => p.finishes.includes(filters.finish!));
  if (filters.search) {
    const q = filters.search.toLowerCase();
    result = result.filter(
      (p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q),
    );
  }

  switch (filters.sort) {
    case "price-asc":
      result = [...result].sort((a, b) => (a.price?.amount ?? 0) - (b.price?.amount ?? 0));
      break;
    case "price-desc":
      result = [...result].sort((a, b) => (b.price?.amount ?? 0) - (a.price?.amount ?? 0));
      break;
    case "name-asc":
      result = [...result].sort((a, b) => a.name.localeCompare(b.name));
      break;
    default:
      break;
  }

  return result;
}
