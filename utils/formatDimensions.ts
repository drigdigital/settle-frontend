import type { Dimensions } from "@/types/product";

/**
 * Formats a dimension set for display. Storage pieces are measured in feet,
 * sofas/cots in inches (CLAUDE.md §5) — the unit always travels with the
 * value and is only applied at render time.
 */
export function formatDimensions(dimensions: Dimensions | undefined | null): string {
  if (!dimensions) return "";

  const { height, width, depth, diameter, unit } = dimensions;

  if (diameter) {
    return `${diameter}${unit} diameter`;
  }

  const parts = [width, depth, height].filter((v): v is number => typeof v === "number");
  if (parts.length === 0) return "";

  return `${parts.join(" × ")} ${unit}`;
}

export function formatDimensionLabel(dimensions: Dimensions | undefined | null): string {
  if (!dimensions) return "";
  const segments: string[] = [];
  if (dimensions.width) segments.push(`W ${dimensions.width}${dimensions.unit}`);
  if (dimensions.depth) segments.push(`D ${dimensions.depth}${dimensions.unit}`);
  if (dimensions.height) segments.push(`H ${dimensions.height}${dimensions.unit}`);
  if (dimensions.diameter) segments.push(`⌀ ${dimensions.diameter}${dimensions.unit}`);
  return segments.join(" · ");
}
