"use client";

import { ProductEnquiryButton } from "@/components/shared/ProductEnquiryButton";
import { formatProductPrice } from "@/utils/formatPrice";
import type { Product } from "@/types/product";

/**
 * Sticky enquiry CTA for product detail pages — conversion-critical, do not
 * remove or bury in a redesign (CLAUDE.md §4).
 */
export function EnquiryCTA({ product }: { product: Product }) {
  return (
    <div className="border-border bg-surface/95 sticky bottom-0 z-30 border-t p-4 backdrop-blur sm:static sm:border-0 sm:bg-transparent sm:p-0 sm:backdrop-blur-none">
      <div className="flex items-center justify-between gap-4 sm:block">
        <div className="sm:mb-4">
          <p className="text-muted text-sm">Price</p>
          <p className="text-ink text-xl font-semibold">{formatProductPrice(product)}</p>
        </div>
        <ProductEnquiryButton
          product={product}
          label="Enquire about this piece"
          size="lg"
          className="sm:w-full"
        />
      </div>
    </div>
  );
}
