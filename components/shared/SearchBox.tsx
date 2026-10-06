"use client";

import { useState } from "react";
import { useProductFilters } from "@/hooks/useProductFilters";

export function SearchBox() {
  const { filters, setFilter } = useProductFilters();
  const [value, setValue] = useState(filters.search ?? "");

  return (
    <form
      role="search"
      onSubmit={(event) => {
        event.preventDefault();
        setFilter("search", value || undefined);
      }}
      className="flex w-full max-w-sm items-center gap-2"
    >
      <label htmlFor="collection-search" className="sr-only">
        Search products
      </label>
      <input
        id="collection-search"
        type="search"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Search products…"
        className="border-border bg-surface text-ink placeholder:text-muted focus-visible:border-accent h-11 w-full rounded border px-4 text-sm"
      />
      <button
        type="submit"
        className="border-border text-ink hover:bg-ink/5 h-11 rounded border px-4 text-sm font-medium"
      >
        Search
      </button>
    </form>
  );
}
