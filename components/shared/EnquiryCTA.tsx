"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { EnquiryForm } from "@/components/shared/EnquiryForm";
import { formatPrice } from "@/utils/formatPrice";
import type { Product } from "@/types/product";

/**
 * Sticky enquiry CTA for product detail pages — conversion-critical, do not
 * remove or bury in a redesign (CLAUDE.md §4).
 */
export function EnquiryCTA({ product }: { product: Product }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="border-border bg-surface/95 sticky bottom-0 z-30 border-t p-4 backdrop-blur sm:static sm:border-0 sm:bg-transparent sm:p-0 sm:backdrop-blur-none">
        <div className="flex items-center justify-between gap-4 sm:block">
          <div className="sm:mb-4">
            <p className="text-muted text-sm">Starting from</p>
            <p className="text-ink text-xl font-semibold">{formatPrice(product.price)}</p>
          </div>
          <Button size="lg" className="sm:w-full" onClick={() => setOpen(true)}>
            Enquire about this piece
          </Button>
        </div>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title={`Enquire about ${product.name}`}>
        <EnquiryForm
          type="b2c"
          page={`/collections/${typeof product.category === "string" ? product.category : product.category.slug}/${product.slug}`}
          product={{ id: product._id, name: product.name, slug: product.slug }}
        />
      </Modal>
    </>
  );
}
