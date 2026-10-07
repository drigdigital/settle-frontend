"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRightIcon } from "@/components/ui/icons";
import { formatPrice } from "@/utils/formatPrice";
import { cn } from "@/utils/cn";
import type { ShowcaseItem, WoodTone } from "@/types/showcase";

const TONE_CLASSES: Record<WoodTone, string> = {
  sand: "bg-wood-sand",
  oak: "bg-wood-oak",
  teak: "bg-wood-teak",
  cherry: "bg-wood-cherry",
  walnut: "bg-wood-walnut",
};

// Hidden at rest on hover-capable desktops (see `card-rest` in globals.css).
const REVEAL_CLASSES =
  "transition-[opacity,transform] duration-400 ease-out card-rest:translate-y-2 card-rest:opacity-0";

interface ShowcaseCardProps {
  item: ShowcaseItem;
  /** `next/image` sizes for the card's rendered width at each breakpoint. */
  sizes: string;
  className?: string;
}

/**
 * Tall full-bleed product card: category + name over a bottom scrim; the
 * description and "View Product" slide up on hover/focus (always visible on
 * touch and small screens). The whole card is one link, via a stretched
 * overlay, so the visible heading stays plain text.
 */
export function ShowcaseCard({ item, sizes, className }: ShowcaseCardProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const image = imageFailed ? undefined : item.image;

  return (
    <article
      className={cn(
        "group/card relative isolate aspect-3/4 overflow-hidden rounded-lg",
        TONE_CLASSES[item.tone],
        className,
      )}
    >
      {image && (
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          onError={() => setImageFailed(true)}
          className="-z-10 object-cover transition-transform duration-600 ease-out motion-safe:group-hover/card:scale-105"
        />
      )}

      <div
        aria-hidden="true"
        className="from-ink/90 via-ink/55 absolute inset-0 -z-10 bg-linear-to-t via-45% to-transparent"
      />
      {/* Deeper scrim behind the revealed description. Between `lg` and `xl` the five
          cards are narrow and the description sits high, so it stays dark to the top. */}
      <div
        aria-hidden="true"
        className="from-ink/90 via-ink/55 lg:to-ink/60 card-rest:opacity-0 absolute inset-0 -z-10 bg-linear-to-t via-55% to-transparent transition-opacity duration-400 xl:to-transparent"
      />

      <div className="text-paper absolute inset-x-0 bottom-0 p-5 lg:p-4 xl:p-5">
        <p className="text-paper/80 text-xs font-medium tracking-widest uppercase">
          {item.category}
        </p>
        <h3 className="mt-1 text-lg leading-snug font-semibold text-balance lg:text-base xl:text-lg">
          {item.name}
        </h3>
        {item.price?.display && (
          <p className="text-paper mt-1 text-sm font-medium">{formatPrice(item.price)}</p>
        )}
        {/* Below the name in reading order; lifted above the category on desktop. */}
        <p
          className={cn(
            "text-paper/85 mt-2 text-sm lg:absolute lg:inset-x-4 lg:bottom-full lg:mt-0 lg:text-xs xl:inset-x-5 xl:text-sm",
            REVEAL_CLASSES,
          )}
        >
          {item.description}
        </p>
        <span
          aria-hidden="true"
          className={cn("mt-4 inline-flex items-center gap-1 text-sm font-medium", REVEAL_CLASSES)}
        >
          View Product
          <ChevronRightIcon className="size-4" />
        </span>
      </div>

      <Link href={item.href} className="absolute inset-0 z-10 rounded-lg">
        <span className="sr-only">View product: {item.name}</span>
      </Link>
    </article>
  );
}
