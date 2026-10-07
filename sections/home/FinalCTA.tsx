import { ClosingCta } from "@/components/shared/ClosingCta";
import { FINAL_CTA_CONTENT } from "@/constants/finalCta";

/** Homepage Section 08 — closing call to action above the footer. Content lives in constants/finalCta.ts. */
export function FinalCTA() {
  return <ClosingCta content={FINAL_CTA_CONTENT} />;
}
