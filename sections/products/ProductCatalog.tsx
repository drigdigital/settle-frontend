"use client";

import { useMemo, useState } from "react";
import { AnimatedSectionHeading } from "@/components/shared/AnimatedSectionHeading";
import { ProductGrid } from "@/components/shared/ProductGrid";
import { ViewportSection } from "@/components/shared/ViewportSection";
import { PRODUCT_FAMILIES } from "@/constants/productFamilies";
import { cn } from "@/utils/cn";
import { placeProduct } from "@/utils/productFamily";
import type { Product } from "@/types/product";
import type { ProductFamilyId } from "@/types/productFamily";

const HEADING_ID = "catalog-heading";
const ALL = "all";

type FamilyFilter = ProductFamilyId | typeof ALL;

/**
 * Products page catalog: family tabs (Wooden / Modular / Upholstered), then
 * that family's subcategory chips, above the ProductGrid. Filtering is
 * instant and client-side — every card is server-rendered for SEO — and the
 * choice is mirrored to ?family=&sub= so the range tiles and shared links
 * open pre-filtered. Products in a catalog category the range doesn't place
 * yet still show under "All". Grows past one screen when the grid needs it.
 */
export function ProductCatalog({
  id,
  content,
  products,
  initialFamily,
  initialSubcategory,
}: {
  /** Anchor target for the hero's "Browse Products" link and the range tiles. */
  id: string;
  content: { eyebrow: string; heading: string; description?: string };
  products: Product[];
  initialFamily?: ProductFamilyId;
  initialSubcategory?: string;
}) {
  const placements = useMemo(
    () => new Map(products.map((product) => [product._id, placeProduct(product)])),
    [products],
  );

  const families = useMemo(
    () =>
      PRODUCT_FAMILIES.map((family) => {
        const members = products.filter(
          (product) => placements.get(product._id)?.family.id === family.id,
        );
        const subcategories = family.subcategories
          .map((sub) => ({
            ...sub,
            count: members.filter(
              (product) => placements.get(product._id)?.subcategory.id === sub.id,
            ).length,
          }))
          .filter((sub) => sub.count > 0);
        return { ...family, count: members.length, subcategories };
      }).filter((family) => family.count > 0),
    [products, placements],
  );

  const startFamily = families.find((family) => family.id === initialFamily);
  const [familyId, setFamilyId] = useState<FamilyFilter>(startFamily?.id ?? ALL);
  const [subcategoryId, setSubcategoryId] = useState<string>(
    startFamily?.subcategories.some((sub) => sub.id === initialSubcategory)
      ? (initialSubcategory ?? ALL)
      : ALL,
  );

  const activeFamily = families.find((family) => family.id === familyId);
  const activeSubcategory = activeFamily?.subcategories.find((sub) => sub.id === subcategoryId);

  const visible = products.filter((product) => {
    if (!activeFamily) return true;
    const placement = placements.get(product._id);
    if (placement?.family.id !== activeFamily.id) return false;
    return !activeSubcategory || placement.subcategory.id === activeSubcategory.id;
  });

  const syncUrl = (family: FamilyFilter, subcategory: string) => {
    const url = new URL(window.location.href);
    url.searchParams.delete("category");
    url.searchParams.delete("family");
    url.searchParams.delete("sub");
    if (family !== ALL) url.searchParams.set("family", family);
    if (family !== ALL && subcategory !== ALL) url.searchParams.set("sub", subcategory);
    window.history.replaceState(null, "", url);
  };

  const selectFamily = (family: FamilyFilter) => {
    setFamilyId(family);
    setSubcategoryId(ALL);
    syncUrl(family, ALL);
  };

  const selectSubcategory = (subcategory: string) => {
    setSubcategoryId(subcategory);
    syncUrl(familyId, subcategory);
  };

  const tabs = [
    { id: ALL as FamilyFilter, name: "All", count: products.length },
    ...families.map((family) => ({
      id: family.id as FamilyFilter,
      name: family.name,
      count: family.count,
    })),
  ];

  const contextTitle = activeSubcategory?.name ?? activeFamily?.name;
  const contextText = activeSubcategory ? activeSubcategory.description : activeFamily?.description;
  const filterKey = `${familyId}-${subcategoryId}`;

  return (
    <ViewportSection id={id} labelledBy={HEADING_ID}>
      <AnimatedSectionHeading
        id={HEADING_ID}
        eyebrow={content.eyebrow}
        heading={content.heading}
        description={content.description}
      />

      <div className="mt-8 flex justify-center">
        <div
          role="group"
          aria-label="Filter products by range"
          className="bg-surface ring-border flex max-w-full gap-1 overflow-x-auto rounded-full p-1 ring-1"
        >
          {tabs.map((tab) => {
            const isActive = tab.id === familyId;
            return (
              <button
                key={tab.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => selectFamily(tab.id)}
                className={cn(
                  "shrink-0 rounded-full px-4 py-2 text-sm font-semibold whitespace-nowrap transition-colors duration-200 sm:px-6",
                  isActive ? "bg-primary text-ink" : "text-navy hover:bg-navy/5",
                )}
              >
                {tab.name}
                <span className={cn("ml-1.5 font-medium", isActive ? "text-ink/80" : "text-muted")}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {activeFamily && activeFamily.subcategories.length > 1 && (
        <div
          role="group"
          aria-label={`Filter ${activeFamily.name} products by type`}
          className="mt-4 flex flex-wrap justify-center gap-2"
        >
          {[
            { id: ALL, name: `All ${activeFamily.name}`, count: activeFamily.count },
            ...activeFamily.subcategories,
          ].map((chip) => {
            const isActive = chip.id === subcategoryId;
            return (
              <button
                key={chip.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => selectSubcategory(chip.id)}
                className={cn(
                  "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors duration-200",
                  isActive
                    ? "border-gold bg-gold/15 text-navy"
                    : "border-navy/15 text-navy hover:border-navy/40 bg-surface",
                )}
              >
                {chip.name}
                <span className="text-muted ml-1.5">{chip.count}</span>
              </button>
            );
          })}
        </div>
      )}

      {contextTitle && (
        <div className="border-border mt-8 border-b pb-4 text-center">
          <p className="text-navy text-lg font-semibold">{contextTitle}</p>
          {contextText && (
            <p className="text-muted mx-auto mt-1 max-w-2xl text-sm">{contextText}</p>
          )}
        </div>
      )}

      <p className="sr-only" aria-live="polite">
        {`Showing ${visible.length} ${visible.length === 1 ? "product" : "products"}${contextTitle ? ` in ${contextTitle}` : ""}`}
      </p>

      {/* Keyed by the filter so the cards stagger in afresh on each change. The
          prefix keeps the key unique among this section's children. */}
      <ProductGrid key={`grid-${filterKey}`} products={visible} className="mt-8" />
    </ViewportSection>
  );
}
