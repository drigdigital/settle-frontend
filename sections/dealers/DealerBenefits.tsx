import { AnimatedSectionHeading } from "@/components/shared/AnimatedSectionHeading";
import { ValueGrid } from "@/components/shared/ValueGrid";
import { ViewportSection } from "@/components/shared/ViewportSection";
import type { DealerBenefitsContent } from "@/types/dealers";

const HEADING_ID = "dealer-benefits-heading";

/**
 * Dealers Section 01: the four dealer benefits on the same ValueGrid as the
 * Business page's bulk-order points. Descriptions stay visible on phones,
 * since each one carries the benefit's substance.
 */
export function DealerBenefits({ content }: { content: DealerBenefitsContent }) {
  const { eyebrow, heading, description, items } = content;

  return (
    <ViewportSection tone="linen" labelledBy={HEADING_ID}>
      <AnimatedSectionHeading
        id={HEADING_ID}
        eyebrow={eyebrow}
        heading={heading}
        description={description}
      />
      <ValueGrid values={items} alwaysShowDescription className="mt-8 lg:mt-12" />
    </ViewportSection>
  );
}
