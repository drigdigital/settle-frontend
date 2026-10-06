"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Product } from "@/types/product";
import { formatPrice } from "@/utils/formatPrice";
import { Badge } from "@/components/ui/Badge";
import { HeartIcon } from "@/components/ui/icons";
import { useWishlist } from "@/hooks/useWishlist";
import { fadeUp } from "@/lib/animations";
import { cn } from "@/utils/cn";

export function ProductCard({ product }: { product: Product }) {
  const { isWishlisted, toggle } = useWishlist();
  const categorySlug =
    typeof product.category === "string" ? product.category : product.category.slug;
  const primaryImage = product.images.find((img) => img.isPrimary) ?? product.images[0];
  const wishlisted = isWishlisted(product.slug);

  return (
    <motion.article variants={fadeUp} className="group relative">
      <Link
        href={`/collections/${categorySlug}/${product.slug}`}
        className="bg-surface block overflow-hidden rounded-lg"
      >
        <div className="bg-ink/5 relative aspect-4/3 overflow-hidden">
          {primaryImage && (
            <Image
              src={primaryImage.url}
              alt={primaryImage.alt}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
              className="object-cover transition-transform duration-400 group-hover:scale-105"
            />
          )}
        </div>
        <div className="p-4">
          {product.subLine && (
            <Badge variant="accent" className="mb-2">
              {product.subLine}
            </Badge>
          )}
          <h3 className="text-ink text-base font-medium">{product.name}</h3>
          <p className="text-muted mt-1 text-sm">{formatPrice(product.price)}</p>
        </div>
      </Link>

      <button
        type="button"
        onClick={(event) => {
          event.preventDefault();
          toggle(product.slug);
        }}
        aria-pressed={wishlisted}
        aria-label={
          wishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`
        }
        className={cn(
          "bg-surface/90 text-ink shadow-soft absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full transition-colors duration-200",
          wishlisted && "text-accent",
        )}
      >
        <HeartIcon filled={wishlisted} />
      </button>
    </motion.article>
  );
}
