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
  "(min-width: 1440px) 340px, (min-width: 1024px) 24vw, (min-width: 768px) 31vw, 46vw";

/**
 * Product card: photo (square on phones, 4:3 from `sm`; or a "photo coming
 * soon" panel), category, name, short description, price, and an Enquire
 * button — no add-to-cart, this is an enquiry site. Sized to sit two-up on
 * phones; price and button stack until the card is wide enough (`xl`). The name is a stretched link, so the whole card opens the
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
      <div className="bg-wood-sand relative aspect-square overflow-hidden sm:aspect-4/3">
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
          <span className="bg-navy text-paper absolute top-2 left-2 rounded-full px-3 py-1 text-xs font-semibold tracking-wide uppercase sm:top-3 sm:left-3">
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
            "bg-surface/90 text-navy shadow-soft absolute top-2 right-2 z-10 flex size-9 items-center justify-center rounded-full transition-colors duration-200 sm:top-3 sm:right-3",
            wishlisted && "text-accent",
          )}
        >
          <HeartIcon filled={wishlisted} />
        </button>
      </div>

      <div className="flex flex-1 flex-col p-3 sm:p-5">
        {category && (
          <p className="text-gold-deep text-xs font-medium tracking-widest uppercase">
            {category.name}
          </p>
        )}
        <h3 className="text-navy mt-1.5 text-base font-semibold tracking-tight sm:mt-2 sm:text-lg">
          <Link
            href={productPath(categorySlug, product.slug)}
            className="after:absolute after:inset-0 after:rounded-xl"
          >
            {product.name}
          </Link>
        </h3>
        <p className="text-muted mt-1.5 mb-3 line-clamp-2 text-sm leading-relaxed sm:mt-2 sm:mb-4">
          {product.description}
        </p>

        <div className="border-navy/10 mt-auto flex flex-col gap-3 border-t pt-3 sm:pt-4 xl:flex-row xl:items-end xl:justify-between">
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
          <ProductEnquiryButton
            product={product}
            size="sm"
            className="relative z-10 w-full shrink-0 xl:w-auto"
          />
        </div>
      </div>
    </motion.article>
  );
}
