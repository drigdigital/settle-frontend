import { ContactHero } from "@/sections/contact/ContactHero";
import { ContactPageClient } from "@/sections/contact/ContactPageClient";
import { WhatsAppQuickConnect } from "@/sections/contact/WhatsAppQuickConnect";
import { LocationSection } from "@/sections/contact/LocationSection";
import { DepartmentDirectory } from "@/sections/contact/DepartmentDirectory";
import { ContactFinalCTA } from "@/sections/contact/ContactFinalCTA";
import { buildMetadata, localBusinessSchema } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact Us",
  description:
    "Get in touch with Settle Furnitures — sales, support, dealer, and showroom enquiries.",
  path: "/contact",
});

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
      <DepartmentDirectory />
      <ContactFinalCTA />
    </>
  );
}
