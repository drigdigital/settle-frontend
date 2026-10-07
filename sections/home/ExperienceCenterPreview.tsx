import { Container } from "@/components/shared/Container";
import { ImmersiveBanner } from "@/components/shared/ImmersiveBanner";
import { EXPERIENCE_CENTER_BANNER, EXPERIENCE_CENTER_MEDIA } from "@/constants/experienceCenter";

const HEADING_ID = "experience-center-heading";

/**
 * Homepage Section 06 — Experience Center preview: a cinematic media banner
 * inviting a visit. Content, media paths and map link live in constants/experienceCenter.ts.
 */
export function ExperienceCenterPreview() {
  return (
    <section aria-labelledby={HEADING_ID} className="py-section-sm lg:py-section">
      <Container>
        <ImmersiveBanner
          content={EXPERIENCE_CENTER_BANNER}
          media={EXPERIENCE_CENTER_MEDIA}
          headingId={HEADING_ID}
        />
      </Container>
    </section>
  );
}
