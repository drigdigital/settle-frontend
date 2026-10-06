import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/constants/site";
import { CATEGORIES } from "@/constants/categories";
import { getAllProducts } from "@/services/products";

const STATIC_ROUTES = [
  "",
  "/about",
  "/collections",
  "/business",
  "/experience-center",
  "/dealers",
  "/contact",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getAllProducts();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((path) => ({
    url: `${SITE_CONFIG.url}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));

  const categoryEntries: MetadataRoute.Sitemap = CATEGORIES.map((category) => ({
    url: `${SITE_CONFIG.url}/collections?category=${category.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const productEntries: MetadataRoute.Sitemap = products.map((product) => {
    const categorySlug =
      typeof product.category === "string" ? product.category : product.category.slug;
    return {
      url: `${SITE_CONFIG.url}/collections/${categorySlug}/${product.slug}`,
      lastModified: new Date(product.updatedAt),
      changeFrequency: "monthly",
      priority: product.isFeatured ? 0.9 : 0.5,
    };
  });

  return [...staticEntries, ...categoryEntries, ...productEntries];
}
