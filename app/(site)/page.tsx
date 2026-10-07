import { getFeaturedRange } from "@/services/featuredRange";
import { getFeaturedTestimonials } from "@/services/testimonials";
import { buildMetadata } from "@/lib/seo";
import { Hero } from "@/sections/home/Hero";
import { ValueStrip } from "@/sections/home/ValueStrip";
import { FeaturedCollections } from "@/sections/home/FeaturedCollections";
import { FeaturedProductsCarousel } from "@/sections/home/FeaturedProductsCarousel";
import { B2BHighlight } from "@/sections/home/B2BHighlight";
import { ExperienceCenterPreview } from "@/sections/home/ExperienceCenterPreview";
import { Testimonials } from "@/sections/home/Testimonials";
import { FinalCTA } from "@/sections/home/FinalCTA";

export const metadata = buildMetadata({
  title: "Premium Furniture Showroom",
  description:
    "Browse Settle Furnitures' collection of seasoned Mahogany and Teak wardrobes, sofas, dining sets and more.",
  path: "/",
});

export default async function HomePage() {
  const [rangeProducts, testimonials] = await Promise.all([
    getFeaturedRange(),
    getFeaturedTestimonials(),
  ]);

  return (
    <>
      <Hero />
      <ValueStrip />
      <FeaturedCollections />
      <FeaturedProductsCarousel products={rangeProducts} />
      <B2BHighlight />
      <ExperienceCenterPreview />
      <Testimonials testimonials={testimonials} />
      <FinalCTA />
    </>
  );
}
