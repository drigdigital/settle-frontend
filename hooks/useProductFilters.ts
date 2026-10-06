"use client";

import { useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { ProductFilters } from "@/types/product";

const FILTER_KEYS: (keyof ProductFilters)[] = [
  "category",
  "subLine",
  "material",
  "finish",
  "size",
  "configuration",
  "search",
  "sort",
];

/**
 * Reads/writes product listing filters to and from the URL search params so
 * filtered collection views stay linkable and back-button friendly.
 */
export function useProductFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const filters = useMemo<ProductFilters>(() => {
    const result: ProductFilters = {};
    for (const key of FILTER_KEYS) {
      const value = searchParams.get(key);
      if (value) (result as Record<string, string>)[key] = value;
    }
    const page = searchParams.get("page");
    if (page) result.page = Number(page);
    return result;
  }, [searchParams]);

  const setFilter = useCallback(
    (key: keyof ProductFilters, value: string | undefined) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      params.delete("page");
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  const clearFilters = useCallback(() => {
    router.push(pathname, { scroll: false });
  }, [pathname, router]);

  return { filters, setFilter, clearFilters };
}
