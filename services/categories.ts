import { connectToDatabase } from "@/lib/db";
import { Category as CategoryModel } from "@/models/Category";
import { Product as ProductModel } from "@/models/Product";
import { CATEGORIES } from "@/constants/categories";
import { PLACEHOLDER_PRODUCTS } from "@/lib/placeholder-data";
import type { Category } from "@/types/product";

export async function getAllCategories(): Promise<Category[]> {
  const connection = await connectToDatabase();

  if (!connection) {
    return CATEGORIES.map((c) => ({
      _id: `cat-${c.slug}`,
      name: c.name,
      slug: c.slug,
      productCount: PLACEHOLDER_PRODUCTS.filter(
        (p) => (typeof p.category === "string" ? p.category : p.category.slug) === c.slug,
      ).length,
    }));
  }

  const docs = await CategoryModel.find().lean();
  const counts = await ProductModel.aggregate<{ _id: unknown; count: number }>([
    { $match: { status: "active" } },
    { $group: { _id: "$category", count: { $sum: 1 } } },
  ]);
  const countMap = new Map(counts.map((c) => [String(c._id), c.count]));

  return docs.map((doc) => ({
    _id: String(doc._id),
    name: doc.name,
    slug: doc.slug,
    description: doc.description,
    heroImage: doc.heroImage,
    productCount: countMap.get(String(doc._id)) ?? 0,
  }));
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const categories = await getAllCategories();
  return categories.find((c) => c.slug === slug) ?? null;
}
