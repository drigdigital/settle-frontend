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

const HOME_TITLE = "Settle Furniture | Wardrobes, Sofas, Cots & Dining Sets Made in Coimbatore";

// `absolute` skips the root layout's "%s | Settle Furnitures" template so the approved title renders as written.
export const metadata = {
  ...buildMetadata({
    title: HOME_TITLE,
    description:
      "Furniture that feels like home from day one. Shop wardrobes, sofas, cots and dining sets made in Coimbatore, with a 1-year warranty.",
    path: "/",
  }),
  title: { absolute: HOME_TITLE },
};

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
