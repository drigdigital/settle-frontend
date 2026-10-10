"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { productPath } from "@/utils/productPath";
import { cn } from "@/utils/cn";
import type { Finish, RangeProduct } from "@/types/featuredRange";
import type { SubLine } from "@/types/product";

const LINE_LABELS: Record<SubLine, string> = {
  ECO: "Eco",
  PRIME: "Prime",
  ULTRA: "Ultra",
  RECLINE: "Recline",
};

const FINISH_SWATCHES: Partial<Record<Finish, string>> = {
  Sand: "bg-wood-sand",
  Oak: "bg-wood-oak",
  Teak: "bg-wood-teak",
  Cherry: "bg-wood-cherry",
  Walnut: "bg-wood-walnut",
};

interface FeaturedProductCardProps {
  product: RangeProduct;
  /** `next/image` sizes for the card's rendered width at each breakpoint. */
  sizes: string;
  className?: string;
}

/**
 * Product card on a white mat (photo square on phones, 4:5 on tablets, 4:3
 * from `lg` so the whole carousel fits one screen): category + line pill, name,
 * two-line description and a "View Details" link whose hit area stretches
 * over the whole card. On hover or keyboard focus the card lifts, the photo
 * slow-zooms and the link underline draws in; zoom and lift are dropped under
 * prefers-reduced-motion. A missing or broken image falls back to a sand
 * panel with the product name.
 */
export function FeaturedProductCard({ product, sizes, className }: FeaturedProductCardProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const image = imageFailed ? undefined : product.image;
  const { name, category, line, description, finishes, isNew } = product;

  return (
    <article
      className={cn(
        "group/product bg-surface shadow-soft relative flex w-full flex-col rounded-xl p-3",
        "ease-gentle transition-transform duration-600 motion-safe:hover:-translate-y-1.5 motion-safe:has-focus-visible:-translate-y-1.5",
        // Hover shadow lives on a pseudo-element so only its opacity animates.
        "after:shadow-large after:pointer-events-none after:absolute after:inset-0 after:rounded-xl after:opacity-0 after:transition-opacity after:duration-600 hover:after:opacity-100 has-focus-visible:after:opacity-100",
        "has-focus-visible:outline-accent has-focus-visible:outline-2 has-focus-visible:outline-offset-4",
        className,
      )}
    >
      <div className="bg-wood-sand relative aspect-square overflow-hidden rounded-lg sm:aspect-4/5 lg:aspect-4/3">
        {image ? (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes={sizes}
            onError={() => setImageFailed(true)}
            className="ease-gentle object-cover transition-transform duration-700 motion-safe:group-hover/product:scale-106 motion-safe:group-has-focus-visible/product:scale-106"
          />
        ) : (
          <div
            aria-hidden="true"
            className="absolute inset-0 flex items-center justify-center p-6 text-center"
          >
            <span className="text-ink/70 text-xl font-semibold tracking-tight text-balance">
              {name}
            </span>
          </div>
        )}

        {isNew && (
          <span className="bg-ink text-paper absolute top-3 left-3 rounded-full px-3 py-1 text-xs font-medium tracking-widest uppercase">
            New
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col px-2 pt-4 pb-2">
        {/* min-h matches the line pill, so names align across cards with and without one. */}
        <div className="flex min-h-6 flex-wrap items-center gap-x-3 gap-y-2">
          <p className="text-accent text-xs font-semibold tracking-widest uppercase">{category}</p>
          {line && (
            <span className="border-accent/30 text-accent rounded-full border px-2.5 py-0.5 text-xs font-medium">
              {LINE_LABELS[line]} Line
            </span>
          )}
        </div>

        <h3 className="text-ink mt-3 text-xl leading-snug font-semibold tracking-tight text-balance">
          {name}
        </h3>
        <p className="text-muted mt-2 line-clamp-2 text-sm leading-relaxed">{description}</p>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-4">
          {/* `before:` stretches the link over the whole card; the visible text stays the label. */}
          <Link
            href={productPath(product.categorySlug, product.slug)}
            className="text-ink group-hover/product:text-accent inline-flex items-center gap-1.5 text-sm font-medium transition-colors duration-300 before:absolute before:inset-0 before:z-10 before:rounded-xl focus-visible:outline-none"
          >
            <span className="relative pb-1">
              View Details<span className="sr-only">: {name}</span>
              <span
                aria-hidden="true"
                className="bg-accent ease-gentle absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 transition-transform duration-400 group-hover/product:scale-x-100 group-has-focus-visible/product:scale-x-100"
              />
            </span>
            <span
              aria-hidden="true"
              className="ease-gentle pb-1 transition-transform duration-400 motion-safe:group-hover/product:translate-x-1"
            >
              →
            </span>
          </Link>

          {finishes && finishes.length > 0 && (
            <p className="text-muted flex items-center gap-1.5 text-xs">
              {finishes.map((finish) => (
                <span
                  key={finish}
                  aria-hidden="true"
                  className={cn(
                    "ring-ink/10 size-3 rounded-full ring-1",
                    FINISH_SWATCHES[finish] ?? "bg-border",
                  )}
                />
              ))}
              <span className="ml-0.5">{finishes.join(" · ")}</span>
            </p>
          )}
        </div>
      </div>
    </article>
  );
}
