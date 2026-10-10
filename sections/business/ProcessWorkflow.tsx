import { ProcessSteps } from "@/components/shared/ProcessSteps";
import { ViewportSection } from "@/components/shared/ViewportSection";
import { AnimatedSectionHeading } from "@/components/shared/AnimatedSectionHeading";
import type { BusinessSection, ProcessStep } from "@/types/business";

const HEADING_ID = "process-heading";

/** For Businesses Section 03: the four-step order process. */
export function ProcessWorkflow({ content }: { content: BusinessSection<ProcessStep> }) {
  const { eyebrow, heading, description, items } = content;

  return (
    <ViewportSection labelledBy={HEADING_ID}>
      <AnimatedSectionHeading
        id={HEADING_ID}
        eyebrow={eyebrow}
        heading={heading}
        description={description}
      />
      <ProcessSteps steps={items} className="mt-8 lg:mt-12" />
    </ViewportSection>
  );
}
