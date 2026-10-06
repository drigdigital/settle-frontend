"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";

const GALLERY = [
  {
    image: "/images/gallery-living.jpg",
    title: "Living & Sofas",
    caption: "Eco, Prime and Ultra line setups",
  },
  {
    image: "/images/gallery-bedroom.jpg",
    title: "Bedroom & Wardrobes",
    caption: "Including the Essen package",
  },
  {
    image: "/images/gallery-dining.jpg",
    title: "Dining",
    caption: "Everyday sets to statement tables",
  },
  {
    image: "/images/gallery-recliner.jpg",
    title: "Recliners & Sofa-cum-Beds",
    caption: "A dedicated comfort corner",
  },
];

/**
 * Pure image gallery — same card/grid technique as the homepage's
 * FeaturedCollections (image + bottom-left caption overlay, hover zoom), with
 * no product names or prices since this showcases the showroom floor itself.
 */
export function StoreGallery() {
  return (
    <section className="bg-surface py-section-sm">
      <Container>
        <SectionHeading
          eyebrow="Store Gallery"
          title="Store Gallery"
          description="A look inside the Experience Center, room by room. Browse full wardrobe, living, dining and bedroom setups exactly as they stand on the floor in Coimbatore."
        />

        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4"
        >
          {GALLERY.map((item) => (
            <motion.div key={item.title} variants={fadeUp} className="group">
              <div className="bg-ink/5 relative aspect-4/3 overflow-hidden rounded-lg">
                <Image
                  src={item.image}
                  alt={`${item.title} display at the Settle Experience Center`}
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover transition-transform duration-400 group-hover:scale-105"
                />
                <div className="bg-ink/20 group-hover:bg-ink/30 absolute inset-0 transition-colors duration-300" />
                <div className="absolute bottom-4 left-4">
                  <p className="text-paper text-sm font-medium">{item.title}</p>
                  <p className="text-paper/80 mt-0.5 text-xs">{item.caption}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
