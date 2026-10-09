"use client";

import { useMemo, useState } from "react";
import { AnimatedSectionHeading } from "@/components/shared/AnimatedSectionHeading";
import { ProductGrid } from "@/components/shared/ProductGrid";
import { ViewportSection } from "@/components/shared/ViewportSection";
import { cn } from "@/utils/cn";
import type { Product } from "@/types/product";

const HEADING_ID = "catalog-heading";
const ALL = "all";

function categoryOf(product: Product): { slug: string; name: string } {
  return typeof product.category === "string"
    ? { slug: product.category, name: product.category }
    : { slug: product.category.slug, name: product.category.name };
}

/**
 * Products page catalog: category chips (built from the products' own
 * categories, in catalog order) above the ProductGrid. Filtering is instant
 * and client-side — every card is server-rendered for SEO — and the choice is
 * mirrored to ?category= so links like /collections?category=wardrobes (the
 * sitemap, product breadcrumbs) open pre-filtered. This section grows past one
 * screen when the grid needs it, rather than clipping cards.
 */
export function ProductCatalog({
  id,
  content,
  products,
  initialCategory,
}: {
  /** Anchor target for the hero's "Browse Products" link. */
  id: string;
  content: { eyebrow: string; heading: string; description: string };
  products: Product[];
  initialCategory?: string;
}) {
  const categories = useMemo(() => {
    const seen = new Map<string, { slug: string; name: string; count: number }>();
    for (const product of products) {
      const { slug, name } = categoryOf(product);
      const entry = seen.get(slug);
      if (entry) entry.count += 1;
      else seen.set(slug, { slug, name, count: 1 });
    }
    return [...seen.values()];
  }, [products]);

  const [active, setActive] = useState(
    initialCategory && categories.some((c) => c.slug === initialCategory) ? initialCategory : ALL,
  );

  const visible =
    active === ALL ? products : products.filter((product) => categoryOf(product).slug === active);
  const activeName = categories.find((c) => c.slug === active)?.name;

  const select = (slug: string) => {
    setActive(slug);
    const url = new URL(window.location.href);
    if (slug === ALL) url.searchParams.delete("category");
    else url.searchParams.set("category", slug);
    window.history.replaceState(null, "", url);
  };

  const chips = [{ slug: ALL, name: "All", count: products.length }, ...categories];

  return (
    <ViewportSection id={id} tone="linen" labelledBy={HEADING_ID}>
      <AnimatedSectionHeading
        id={HEADING_ID}
        eyebrow={content.eyebrow}
        heading={content.heading}
        description={content.description}
      />

      <div
        role="group"
        aria-label="Filter products by category"
        className="mt-8 flex flex-wrap justify-center gap-2"
      >
        {chips.map((chip) => {
          const isActive = chip.slug === active;
          return (
            <button
              key={chip.slug}
              type="button"
              aria-pressed={isActive}
              onClick={() => select(chip.slug)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-200",
                isActive
                  ? "border-navy bg-navy text-paper"
                  : "border-navy/15 text-navy hover:border-navy/40 bg-surface",
              )}
            >
              {chip.name}
              <span className={cn("ml-1.5", isActive ? "text-paper/80" : "text-muted")}>
                {chip.count}
              </span>
            </button>
          );
        })}
      </div>

      <p className="sr-only" aria-live="polite">
        {`Showing ${visible.length} ${visible.length === 1 ? "product" : "products"}${activeName ? ` in ${activeName}` : ""}`}
      </p>

      {/* Keyed by category so the cards stagger in afresh on each filter change. */}
      <ProductGrid key={active} products={visible} className="mt-10" />
    </ViewportSection>
  );
}
