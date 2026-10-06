"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/utils/cn";
import type { ProductImage } from "@/types/product";

export function ProductGallery({
  images,
  productName,
}: {
  images: ProductImage[];
  productName: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = images[activeIndex] ?? images[0];

  if (!active) return null;

  return (
    <div>
      <div className="bg-ink/5 relative aspect-4/3 overflow-hidden rounded-lg">
        <Image
          src={active.url}
          alt={active.alt}
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover transition-transform duration-400 hover:scale-105"
        />
      </div>

      {images.length > 1 && (
        <div
          role="tablist"
          aria-label={`${productName} gallery`}
          className="mt-4 flex gap-3 overflow-x-auto"
        >
          {images.map((image, index) => (
            <button
              key={image.url + index}
              type="button"
              role="tab"
              aria-selected={index === activeIndex}
              aria-label={`Show image ${index + 1} of ${images.length}`}
              onClick={() => setActiveIndex(index)}
              className={cn(
                "relative h-20 w-20 flex-none overflow-hidden rounded border-2",
                index === activeIndex ? "border-accent" : "border-transparent",
              )}
            >
              <Image src={image.url} alt="" fill sizes="80px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
