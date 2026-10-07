import { Container } from "@/components/shared/Container";
import { PartnerSupportBand } from "@/components/shared/PartnerSupportBand";
import { PARTNER_HIGHLIGHT, PARTNER_PILLARS } from "@/constants/partner";

const HEADING_ID = "partner-support-heading";

/** Homepage Section 05 — retailer & dealer support band. Content lives in constants/partner.ts. */
export function B2BHighlight() {
  return (
    <section aria-labelledby={HEADING_ID} className="py-section-sm lg:py-section">
      <Container>
        <PartnerSupportBand
          content={PARTNER_HIGHLIGHT}
          pillars={PARTNER_PILLARS}
          headingId={HEADING_ID}
        />
      </Container>
    </section>
  );
}
