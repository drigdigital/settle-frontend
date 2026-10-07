import { Carousel } from "@/components/shared/Carousel";
import { Container } from "@/components/shared/Container";
import { FeaturedProductCard } from "@/components/shared/FeaturedProductCard";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { FEATURED_RANGE_AUTOPLAY_MS, FEATURED_RANGE_CONTENT } from "@/constants/featuredRange";
import type { RangeProduct } from "@/types/featuredRange";

// Card widths at 1.2 / 2.5 / 3.5 visible slides, capped by the 1440px container.
const CARD_SIZES =
  "(min-width: 1440px) 380px, (min-width: 1024px) 26vw, (min-width: 640px) 38vw, 82vw";

/**
 * Homepage Section 04 — rotating carousel across the Settle range. Products
 * come from getFeaturedRange() (services/featuredRange.ts); copy lives in
 * constants/featuredRange.ts.
 */
export function FeaturedProductsCarousel({ products }: { products: RangeProduct[] }) {
  if (products.length === 0) return null;
  const { heading, subtext } = FEATURED_RANGE_CONTENT;

  return (
    <section className="bg-linen py-section-sm lg:py-section">
      <Container>
        <Carousel
          label="Settle range"
          slideLabels={products.map((product) => product.name)}
          autoplayMs={FEATURED_RANGE_AUTOPLAY_MS}
          header={<SectionHeading title={heading} description={subtext} className="text-balance" />}
        >
          {products.map((product) => (
            <FeaturedProductCard key={product.slug} product={product} sizes={CARD_SIZES} />
          ))}
        </Carousel>
      </Container>
    </section>
  );
}
