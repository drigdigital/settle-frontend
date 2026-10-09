import { IconTileGrid } from "@/components/shared/IconTileGrid";
import { ViewportSection } from "@/components/shared/ViewportSection";
import { AnimatedSectionHeading } from "@/components/shared/AnimatedSectionHeading";
import type { BusinessSection, IconTile } from "@/types/business";

const HEADING_ID = "industries-heading";

/** For Businesses Section 02: six industry tiles on navy. */
export function IndustriesServed({ content }: { content: BusinessSection<IconTile> }) {
  const { eyebrow, heading, description, items } = content;

  return (
    <ViewportSection tone="navy" labelledBy={HEADING_ID}>
      <AnimatedSectionHeading
        id={HEADING_ID}
        eyebrow={eyebrow}
        heading={heading}
        description={description}
        tone="inverse"
      />
      <IconTileGrid tiles={items} className="mt-10 lg:mt-14" />
    </ViewportSection>
  );
}
