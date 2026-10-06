"use client";

import { useCallback, useSyncExternalStore } from "react";

const STORAGE_KEY = "settle:wishlist";
const listeners = new Set<() => void>();

function readWishlist(): string[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

let cache: string[] = typeof window !== "undefined" ? readWishlist() : [];

function writeWishlist(next: string[]) {
  cache = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // localStorage unavailable (private browsing, quota) — in-memory state still updates
  }
  listeners.forEach((listener) => listener());
}

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  return () => listeners.delete(onChange);
}

function getSnapshot() {
  return cache;
}

const EMPTY: string[] = [];

function getServerSnapshot(): string[] {
  return EMPTY;
}

/** Client-only wishlist keyed by product slug, persisted to localStorage. */
export function useWishlist() {
  const slugs = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = useCallback((slug: string) => {
    writeWishlist(cache.includes(slug) ? cache.filter((s) => s !== slug) : [...cache, slug]);
  }, []);

  const isWishlisted = useCallback((slug: string) => slugs.includes(slug), [slugs]);

  return { slugs, toggle, isWishlisted };
}
