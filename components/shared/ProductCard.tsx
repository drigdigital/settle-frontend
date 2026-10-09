"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ProductEnquiryButton } from "@/components/shared/ProductEnquiryButton";
import { ProductImageFallback } from "@/components/shared/ProductImageFallback";
import { ArrowRightIcon, HeartIcon } from "@/components/ui/icons";
import { useWishlist } from "@/hooks/useWishlist";
import { fadeUp } from "@/lib/animations";
import { cn } from "@/utils/cn";
import { formatProductPrice } from "@/utils/formatPrice";
import { productPath } from "@/utils/productPath";
import type { Product } from "@/types/product";

const IMAGE_SIZES =
  "(min-width: 1440px) 340px, (min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw";

/**
 * Product card: 4:5 photo (or a "photo coming soon" panel), category, name,
 * short description, price, and an Enquire button — no add-to-cart, this is
 * an enquiry site. The name is a stretched link, so the whole card opens the
 * product page while the wishlist and Enquire buttons stay separately
 * clickable above it.
 */
export function ProductCard({ product }: { product: Product }) {
  const { isWishlisted, toggle } = useWishlist();
  const category = typeof product.category === "string" ? null : product.category;
  const categorySlug =
    typeof product.category === "string" ? product.category : product.category.slug;
  const primaryImage = product.images.find((img) => img.isPrimary) ?? product.images[0];
  const wishlisted = isWishlisted(product.slug);
  const hasPrice = Boolean(product.price?.display);

  return (
    <motion.article
      variants={fadeUp}
      className="group bg-surface shadow-soft hover:shadow-medium relative flex h-full w-full flex-col overflow-hidden rounded-xl transition-shadow duration-300"
    >
      <div className="bg-wood-sand relative aspect-4/5 overflow-hidden">
        {primaryImage ? (
          <Image
            src={primaryImage.url}
            alt={primaryImage.alt}
            fill
            sizes={IMAGE_SIZES}
            className="object-cover transition-transform duration-700 motion-safe:group-hover:scale-105"
          />
        ) : (
          <ProductImageFallback name={product.name} />
        )}

        {product.isPackage && (
          <span className="bg-navy text-paper absolute top-3 left-3 rounded-full px-3 py-1 text-xs font-semibold tracking-wide uppercase">
            Package
          </span>
        )}

        <button
          type="button"
          onClick={() => toggle(product.slug)}
          aria-pressed={wishlisted}
          aria-label={
            wishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`
          }
          className={cn(
            "bg-surface/90 text-navy shadow-soft absolute top-3 right-3 z-10 flex size-9 items-center justify-center rounded-full transition-colors duration-200",
            wishlisted && "text-accent",
          )}
        >
          <HeartIcon filled={wishlisted} />
        </button>
      </div>

      <div className="flex flex-1 flex-col p-5">
        {category && (
          <p className="text-gold-deep text-xs font-medium tracking-widest uppercase">
            {category.name}
          </p>
        )}
        <h3 className="text-navy mt-2 text-lg font-semibold tracking-tight">
          <Link
            href={productPath(categorySlug, product.slug)}
            className="after:absolute after:inset-0 after:rounded-xl"
          >
            {product.name}
          </Link>
        </h3>
        <p className="text-muted mt-2 line-clamp-2 text-sm leading-relaxed">
          {product.description}
        </p>

        <div className="border-navy/10 mt-auto flex items-end justify-between gap-3 border-t pt-4">
          <div className="min-w-0">
            <p
              className={cn(
                "text-base font-semibold",
                hasPrice ? "text-navy" : "text-muted text-sm font-medium",
              )}
            >
              {formatProductPrice(product)}
            </p>
            <span
              aria-hidden="true"
              className="text-gold-deep mt-1 inline-flex items-center gap-1 text-xs font-medium"
            >
              View details
              <ArrowRightIcon className="size-3.5 transition-transform duration-300 motion-safe:group-hover:translate-x-0.5" />
            </span>
          </div>
          <ProductEnquiryButton product={product} size="sm" className="relative z-10 shrink-0" />
        </div>
      </div>
    </motion.article>
  );
}
