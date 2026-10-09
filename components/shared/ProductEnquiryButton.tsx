"use client";

import { useState } from "react";
import { Button, type ButtonSize, type ButtonVariant } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { EnquiryForm } from "@/components/shared/EnquiryForm";
import { productPath } from "@/utils/productPath";
import type { Product } from "@/types/product";

/**
 * Opens the shared EnquiryForm in a modal, pre-tagged with the product so the
 * lead records which piece it's about. Used on product cards and in the
 * product page's sticky EnquiryCTA. Enquiry only — there is no checkout.
 */
export function ProductEnquiryButton({
  product,
  label = "Enquire",
  variant = "primary",
  size = "md",
  className,
}: {
  product: Product;
  label?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const categorySlug =
    typeof product.category === "string" ? product.category : product.category.slug;

  return (
    <>
      <Button
        variant={variant}
        size={size}
        className={className}
        aria-label={label === "Enquire" ? `Enquire about ${product.name}` : undefined}
        onClick={() => setOpen(true)}
      >
        {label}
      </Button>

      <Modal open={open} onClose={() => setOpen(false)} title={`Enquire about ${product.name}`}>
        <EnquiryForm
          type="b2c"
          page={productPath(categorySlug, product.slug)}
          product={{ id: product._id, name: product.name, slug: product.slug }}
        />
      </Modal>
    </>
  );
}
