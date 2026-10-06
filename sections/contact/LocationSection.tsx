import { Container } from "@/components/shared/Container";
import { LocationMapCard } from "@/components/shared/LocationMapCard";

const OFFICE_NAME = "Vaanam Furnishings Pvt Ltd";

const OFFICE_ADDRESS_LINES = [
  "146/147, Pollachi Main Road,",
  "Near FIMS Hospital,",
  "Sundarapuram, Coimbatore – 641024",
];

const OFFICE_PHONE = "+91 90421 12233";

/**
 * Premium Location & Map card (components/shared/LocationMapCard), split out
 * of the old WhatsApp + Location ConnectSection so it reads as its own
 * focused, editorial section — see the Experience Center page's
 * LocationAndMap for the same treatment applied to that address.
 */
export function LocationSection() {
  return (
    <section className="bg-paper py-section-sm">
      <Container>
        <LocationMapCard
          description="Find us at Settle's Coimbatore office."
          name={OFFICE_NAME}
          addressLines={OFFICE_ADDRESS_LINES}
          phone={OFFICE_PHONE}
          mapQuery={`${OFFICE_NAME}, ${OFFICE_ADDRESS_LINES.join(" ")}`}
        />
      </Container>
    </section>
  );
}
