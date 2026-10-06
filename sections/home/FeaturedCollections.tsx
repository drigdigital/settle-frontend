"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";
import type { Category } from "@/types/product";

export function FeaturedCollections({ categories }: { categories: Category[] }) {
  return (
    <section className="py-section">
      <Container>
        <SectionHeading
          eyebrow="Collections"
          title="Every room, considered"
          description="From wardrobes to dining, browse the full catalog by category."
        />

        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
        >
          {categories.slice(0, 8).map((category) => (
            <motion.div key={category.slug} variants={fadeUp}>
              <Link
                href={`/collections?category=${category.slug}`}
                className="group bg-ink/5 block overflow-hidden rounded-lg"
              >
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={category.heroImage ?? "/images/placeholder.svg"}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    className="object-cover transition-transform duration-400 group-hover:scale-105"
                  />
                  <div className="bg-ink/20 group-hover:bg-ink/30 absolute inset-0 transition-colors duration-300" />
                  <p className="text-paper absolute bottom-4 left-4 text-sm font-medium">
                    {category.name}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-10 text-center">
          <Link
            href="/collections"
            className="text-ink text-sm font-medium underline underline-offset-4"
          >
            View all collections
          </Link>
        </div>
      </Container>
    </section>
  );
}
