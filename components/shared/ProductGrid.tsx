"use client";

import { motion } from "framer-motion";
import { ProductCard } from "@/components/shared/ProductCard";
import { staggerContainer, viewportOnce } from "@/lib/animations";
import type { Product } from "@/types/product";

export function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return <p className="text-muted py-16 text-center">No products match these filters yet.</p>;
  }

  return (
    <motion.div
      variants={staggerContainer(0.06)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4"
    >
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </motion.div>
  );
}
