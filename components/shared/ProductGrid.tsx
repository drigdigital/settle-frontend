"use client";

import { motion } from "framer-motion";
import { ProductCard } from "@/components/shared/ProductCard";
import { staggerContainer, viewportOnce } from "@/lib/animations";
import { cn } from "@/utils/cn";
import type { Product } from "@/types/product";

/** Staggered grid of ProductCards: 2 columns on phones, 3 from `md`, 4 from `lg`. */
export function ProductGrid({ products, className }: { products: Product[]; className?: string }) {
  if (products.length === 0) {
    return <p className="text-muted py-16 text-center">No products in this category yet.</p>;
  }

  return (
    <motion.ul
      variants={staggerContainer(0.06)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className={cn(
        "grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 xl:gap-6",
        className,
      )}
    >
      {products.map((product) => (
        <li key={product._id} className="flex">
          <ProductCard product={product} />
        </li>
      ))}
    </motion.ul>
  );
}
