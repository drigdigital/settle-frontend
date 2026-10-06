"use client";

import { useProductFilters } from "@/hooks/useProductFilters";
import { FINISHES } from "@/constants/site";
import { cn } from "@/utils/cn";
import type { Category, SubLine } from "@/types/product";

const SUB_LINES: SubLine[] = ["ECO", "PRIME", "ULTRA", "RECLINE"];
const SORT_OPTIONS: { value: string; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name-asc", label: "Name: A to Z" },
];

export function CollectionsFilters({ categories }: { categories: Category[] }) {
  const { filters, setFilter, clearFilters } = useProductFilters();
  const hasActiveFilters = Object.keys(filters).length > 0;

  return (
    <aside aria-label="Product filters" className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-ink text-sm font-semibold">Filters</h2>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="text-muted hover:text-ink text-sm"
          >
            Clear all
          </button>
        )}
      </div>

      <div>
        <label htmlFor="sort" className="text-ink mb-2 block text-sm font-medium">
          Sort by
        </label>
        <select
          id="sort"
          value={filters.sort ?? "featured"}
          onChange={(event) => setFilter("sort", event.target.value)}
          className="border-border bg-surface text-ink h-11 w-full rounded border px-3 text-sm"
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <fieldset>
        <legend className="text-ink mb-2 text-sm font-medium">Category</legend>
        <div className="space-y-2">
          {categories.map((category) => (
            <label
              key={category.slug}
              className="text-ink flex cursor-pointer items-center gap-2 text-sm"
            >
              <input
                type="radio"
                name="category"
                checked={filters.category === category.slug}
                onChange={() => setFilter("category", category.slug)}
                className="accent-accent h-4 w-4"
              />
              {category.name}
              {typeof category.productCount === "number" && (
                <span className="text-muted">({category.productCount})</span>
              )}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="text-ink mb-2 text-sm font-medium">Sub-line</legend>
        <div className="flex flex-wrap gap-2">
          {SUB_LINES.map((subLine) => (
            <button
              key={subLine}
              type="button"
              onClick={() =>
                setFilter("subLine", filters.subLine === subLine ? undefined : subLine)
              }
              aria-pressed={filters.subLine === subLine}
              className={cn(
                "border-border rounded-full border px-3 py-1.5 text-xs font-medium",
                filters.subLine === subLine
                  ? "border-ink bg-ink text-paper"
                  : "text-ink hover:bg-ink/5",
              )}
            >
              {subLine}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="text-ink mb-2 text-sm font-medium">Finish</legend>
        <div className="flex flex-wrap gap-2">
          {FINISHES.map((finish) => (
            <button
              key={finish}
              type="button"
              onClick={() => setFilter("finish", filters.finish === finish ? undefined : finish)}
              aria-pressed={filters.finish === finish}
              className={cn(
                "border-border rounded-full border px-3 py-1.5 text-xs font-medium",
                filters.finish === finish
                  ? "border-ink bg-ink text-paper"
                  : "text-ink hover:bg-ink/5",
              )}
            >
              {finish}
            </button>
          ))}
        </div>
      </fieldset>
    </aside>
  );
}
