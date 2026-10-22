import { ContactHero } from "@/sections/contact/ContactHero";
import { ContactPageClient } from "@/sections/contact/ContactPageClient";
import { WhatsAppQuickConnect } from "@/sections/contact/WhatsAppQuickConnect";
import { LocationSection } from "@/sections/contact/LocationSection";
import { ContactFinalCTA } from "@/sections/contact/ContactFinalCTA";
import { buildMetadata, localBusinessSchema } from "@/lib/seo";

const CONTACT_TITLE = "Contact Settle | Sales, Support & Partnerships";

// `absolute` skips the root layout's "%s | Settle Furnitures" template so the approved title renders as written.
export const metadata = {
  ...buildMetadata({
    title: CONTACT_TITLE,
    description:
      "Get in touch with the Settle team for purchases, bulk orders, partnerships and plant visits.",
    path: "/contact",
  }),
  title: { absolute: CONTACT_TITLE },
};

export default function ContactPage() {
  const schema = localBusinessSchema({
    name: "Vaanam Furnishings Pvt Ltd",
    address: "146/147, Pollachi Main Road, Near FIMS Hospital, Sundarapuram, Coimbatore – 641024",
    telephone: "+91 90421 12233",
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <ContactHero />

      <ContactPageClient />
      <WhatsAppQuickConnect />
      <LocationSection />
      {/* DealerPrompt ("Looking for a dealer near you?") is hidden until the dealer locator exists. */}
      <ContactFinalCTA />
    </>
  );
}
