"use client";

import { useId, useState } from "react";
import { cn } from "@/utils/cn";
import { formatDimensionLabel } from "@/utils/formatDimensions";
import type { Product } from "@/types/product";

export function ProductSpecs({ product }: { product: Product }) {
  const [tab, setTab] = useState<"specs" | "dimensions">("specs");
  const specsId = useId();
  const dimensionsId = useId();

  return (
    <div>
      <div
        role="tablist"
        aria-label="Product details"
        className="border-border flex gap-6 border-b"
      >
        {(["specs", "dimensions"] as const).map((key) => (
          <button
            key={key}
            type="button"
            role="tab"
            id={`${key}-tab`}
            aria-selected={tab === key}
            aria-controls={key === "specs" ? specsId : dimensionsId}
            onClick={() => setTab(key)}
            className={cn(
              "border-b-2 pb-3 text-sm font-medium transition-colors duration-200",
              tab === key ? "border-ink text-ink" : "text-muted hover:text-ink border-transparent",
            )}
          >
            {key === "specs" ? "Specifications" : "Dimensions"}
          </button>
        ))}
      </div>

      {tab === "specs" && (
        <div id={specsId} role="tabpanel" aria-labelledby="specs-tab" className="py-6">
          <dl className="grid grid-cols-2 gap-y-3 text-sm sm:grid-cols-3">
            {product.material && (
              <>
                <dt className="text-muted">Material</dt>
                <dd className="text-ink col-span-1 sm:col-span-2">{product.material}</dd>
              </>
            )}
            {product.configuration && (
              <>
                <dt className="text-muted">Configuration</dt>
                <dd className="text-ink col-span-1 sm:col-span-2">{product.configuration}</dd>
              </>
            )}
            {product.finishes.length > 0 && (
              <>
                <dt className="text-muted">Finishes</dt>
                <dd className="text-ink col-span-1 sm:col-span-2">{product.finishes.join(", ")}</dd>
              </>
            )}
          </dl>
        </div>
      )}

      {tab === "dimensions" && (
        <div id={dimensionsId} role="tabpanel" aria-labelledby="dimensions-tab" className="py-6">
          {product.dimensions && (
            <p className="text-ink text-sm">{formatDimensionLabel(product.dimensions)}</p>
          )}
          {product.sizeOptions && product.sizeOptions.length > 0 && (
            <table className="mt-4 w-full text-left text-sm">
              <thead>
                <tr className="border-border text-muted border-b">
                  <th className="py-2 font-medium">Size</th>
                  <th className="py-2 font-medium">Dimensions</th>
                </tr>
              </thead>
              <tbody>
                {product.sizeOptions.map((size) => (
                  <tr key={size.label} className="border-border border-b">
                    <td className="text-ink py-2">{size.label}</td>
                    <td className="text-ink py-2">{formatDimensionLabel(size.dimensions)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {!product.dimensions && !product.sizeOptions?.length && (
            <p className="text-muted text-sm">Dimensions available on request.</p>
          )}
        </div>
      )}
    </div>
  );
}
