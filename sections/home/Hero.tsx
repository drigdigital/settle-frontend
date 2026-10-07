import { Container } from "@/components/shared/Container";
import { HeroSlideshow } from "@/components/shared/HeroSlideshow";
import { HERO_AUTOPLAY_MS, HERO_CONTENT, HERO_SLIDES } from "@/constants/hero";
import { HeroCopy } from "./HeroCopy";

/**
 * Homepage Section 01. Full-bleed room slideshow (living / bedroom / dining)
 * behind fixed copy: text sits low over a bottom scrim on mobile/tablet and
 * centred-left over a side scrim from `lg` up. Content lives in constants/hero.ts.
 */
export function Hero() {
  return (
    <HeroSlideshow
      slides={HERO_SLIDES}
      intervalMs={HERO_AUTOPLAY_MS}
      label="Settle Furnitures in real homes"
    >
      <Container className="min-h-hero flex flex-col justify-end pt-32 pb-20 lg:justify-center lg:py-24">
        <HeroCopy content={HERO_CONTENT} />
      </Container>
    </HeroSlideshow>
  );
}
