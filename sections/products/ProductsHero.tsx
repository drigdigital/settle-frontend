"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ViewportSection } from "@/components/shared/ViewportSection";
import { buttonVariants } from "@/components/ui/Button";
import { ChevronRightIcon } from "@/components/ui/icons";
import { fadeUp, scaleIn, staggerContainer } from "@/lib/animations";
import { cn } from "@/utils/cn";
import { productPath } from "@/utils/productPath";
import type { ProductsHeroContent } from "@/types/page";
import type { Product } from "@/types/product";

const HEADING_ID = "products-heading";

/**
 * Products page hero: copy, live product/category counts and CTAs beside a
 * three-photo mosaic of real catalog products (tall first tile, two stacked),
 * each linking to its product page. Animates on load; the first photo is the
 * LCP element, so it's preloaded.
 */
export function ProductsHero({
  content,
  mosaic,
  productCount,
  categoryCount,
}: {
  content: ProductsHeroContent;
  /** Up to three products with photos, in display order. */
  mosaic: Product[];
  productCount: number;
  categoryCount: number;
}) {
  const { eyebrow, heading, intro, primaryCta, secondaryCta } = content;

  return (
    <ViewportSection labelledBy={HEADING_ID}>
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <motion.div variants={staggerContainer(0.12, 0.1)} initial="hidden" animate="visible">
          <motion.nav variants={fadeUp} aria-label="Breadcrumb" className="text-muted text-sm">
            <ol className="flex items-center gap-1.5">
              <li>
                <Link href="/" className="hover:text-navy underline-offset-4 hover:underline">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRightIcon className="size-3.5" />
              </li>
              <li aria-current="page" className="text-navy font-medium">
                {eyebrow}
              </li>
            </ol>
          </motion.nav>

          <motion.p
            variants={fadeUp}
            className="text-gold-deep mt-8 text-sm font-medium tracking-widest uppercase"
          >
            {eyebrow}
          </motion.p>
          <motion.h1
            variants={fadeUp}
            id={HEADING_ID}
            className="text-navy mt-4 text-4xl leading-tight font-semibold tracking-tight text-balance sm:text-5xl xl:text-6xl"
          >
            {heading}
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="text-muted mt-6 max-w-xl text-base leading-relaxed sm:text-lg"
          >
            {intro}
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="border-navy/10 text-navy mt-8 flex gap-8 border-t pt-6 text-sm"
          >
            <span>
              <span className="block text-3xl font-semibold tracking-tight">{productCount}</span>
              Products
            </span>
            <span>
              <span className="block text-3xl font-semibold tracking-tight">{categoryCount}</span>
              Categories
            </span>
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <Link
              href={primaryCta.href}
              className={cn(buttonVariants({ variant: "primary", size: "lg" }), "w-full sm:w-auto")}
            >
              {primaryCta.label}
            </Link>
            <Link
              href={secondaryCta.href}
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), "w-full sm:w-auto")}
            >
              {secondaryCta.label}
            </Link>
          </motion.div>
        </motion.div>

        {mosaic.length > 0 && (
          <motion.ul
            variants={staggerContainer(0.1, 0.2)}
            initial="hidden"
            animate="visible"
            className="mx-auto grid aspect-square w-full max-w-xl grid-cols-2 grid-rows-2 gap-3 sm:gap-4 lg:max-w-none"
          >
            {mosaic.slice(0, 3).map((product, index) => {
              const image = product.images.find((img) => img.isPrimary) ?? product.images[0];
              const categorySlug =
                typeof product.category === "string" ? product.category : product.category.slug;
              if (!image) return null;
              return (
                <motion.li
                  key={product._id}
                  variants={scaleIn}
                  className={cn(
                    "group bg-wood-sand relative overflow-hidden rounded-xl",
                    index === 0 && "row-span-2",
                  )}
                >
                  <Image
                    src={image.url}
                    alt={image.alt}
                    fill
                    preload={index === 0}
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    className="object-cover transition-transform duration-700 motion-safe:group-hover:scale-105"
                  />
                  <Link
                    href={productPath(categorySlug, product.slug)}
                    className="bg-paper/90 text-navy shadow-soft absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-sm font-medium after:absolute after:inset-0 sm:bottom-4 sm:left-4"
                  >
                    {product.name}
                    <ChevronRightIcon className="size-3.5" />
                  </Link>
                </motion.li>
              );
            })}
          </motion.ul>
        )}
      </div>
    </ViewportSection>
  );
}
