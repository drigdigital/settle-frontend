import { Container } from "@/components/shared/Container";
import { LocationMapCard } from "@/components/shared/LocationMapCard";

const EXPERIENCE_CENTER_NAME = "Vaanam Furnishings Pvt Ltd";

const EXPERIENCE_CENTER_ADDRESS_LINES = [
  "146/147, Pollachi Main Road,",
  "Near FIMS Hospital,",
  "Sundarapuram, Coimbatore – 641024",
];

const EXPERIENCE_CENTER_PHONE = "+91 90421 12233";

const EXPERIENCE_CENTER_EMAILS = ["sales@settlefurniture.in", "hello@settlefurniture.in"];

/**
 * Premium Location & Map card (components/shared/LocationMapCard), reused
 * as-is here — see the Contact page's LocationSection for the same
 * treatment applied to the head office address.
 */
export function LocationAndMap() {
  return (
    <section className="bg-paper py-section-sm">
      <Container>
        <LocationMapCard
          title="Find Us"
          description="Find us inside Vaanam Furniture's Coimbatore facility."
          name={EXPERIENCE_CENTER_NAME}
          addressLines={EXPERIENCE_CENTER_ADDRESS_LINES}
          phone={EXPERIENCE_CENTER_PHONE}
          emails={EXPERIENCE_CENTER_EMAILS}
          mapQuery={`${EXPERIENCE_CENTER_NAME}, ${EXPERIENCE_CENTER_ADDRESS_LINES.join(" ")}`}
        />
      </Container>
    </section>
  );
}
