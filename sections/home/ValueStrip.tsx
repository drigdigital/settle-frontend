import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ValueGrid } from "@/components/shared/ValueGrid";
import { BRAND_VALUES, BRAND_VALUES_HEADING } from "@/constants/values";

/** Homepage Section 02 — brand value strip directly under the hero. Content lives in constants/values.ts. */
export function ValueStrip() {
  return (
    <section className="bg-paper py-section-sm lg:py-section">
      <Container>
        <SectionHeading title={BRAND_VALUES_HEADING} align="center" className="text-balance" />
        <ValueGrid values={BRAND_VALUES} className="mt-10 lg:mt-12" />
      </Container>
    </section>
  );
}
