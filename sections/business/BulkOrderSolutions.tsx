import { ValueGrid } from "@/components/shared/ValueGrid";
import { ViewportSection } from "@/components/shared/ViewportSection";
import { AnimatedSectionHeading } from "@/components/shared/AnimatedSectionHeading";
import type { BulkOrderPoint, BusinessSection } from "@/types/business";

const HEADING_ID = "bulk-orders-heading";

/** For Businesses Section 01: intro plus the four bulk-order points, on the homepage ValueGrid. */
export function BulkOrderSolutions({ content }: { content: BusinessSection<BulkOrderPoint> }) {
  const { eyebrow, heading, description, items } = content;

  return (
    <ViewportSection tone="linen" labelledBy={HEADING_ID}>
      <AnimatedSectionHeading
        id={HEADING_ID}
        eyebrow={eyebrow}
        heading={heading}
        description={description}
      />
      <ValueGrid values={items} className="mt-10 lg:mt-14" />
    </ViewportSection>
  );
}
