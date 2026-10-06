"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ProductCard } from "@/components/shared/ProductCard";
import { ChevronRightIcon, ChevronDownIcon } from "@/components/ui/icons";
import { staggerContainer, viewportOnce } from "@/lib/animations";
import type { Product } from "@/types/product";

export function FeaturedProductsCarousel({ products }: { products: Product[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollBy = (direction: 1 | -1) => {
    scrollerRef.current?.scrollBy({ left: direction * 340, behavior: "smooth" });
  };

  if (products.length === 0) return null;

  return (
    <section className="bg-surface py-section">
      <Container>
        <div className="flex items-end justify-between gap-4">
          <SectionHeading eyebrow="Featured" title="Signature pieces" />
          <div className="hidden gap-2 sm:flex">
            <button
              type="button"
              aria-label="Scroll left"
              onClick={() => scrollBy(-1)}
              className="border-border text-ink hover:bg-ink/5 flex h-10 w-10 items-center justify-center rounded-full border"
            >
              <ChevronDownIcon className="rotate-90" />
            </button>
            <button
              type="button"
              aria-label="Scroll right"
              onClick={() => scrollBy(1)}
              className="border-border text-ink hover:bg-ink/5 flex h-10 w-10 items-center justify-center rounded-full border"
            >
              <ChevronRightIcon />
            </button>
          </div>
        </div>

        <motion.div
          ref={scrollerRef}
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-10 flex snap-x gap-5 overflow-x-auto pb-4"
        >
          {products.map((product) => (
            <div key={product._id} className="w-72 flex-none snap-start">
              <ProductCard product={product} />
            </div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
