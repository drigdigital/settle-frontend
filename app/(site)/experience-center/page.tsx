import { ExperienceCenterHero } from "@/sections/experience-center/ExperienceCenterHero";
import { StoreGallery } from "@/sections/experience-center/StoreGallery";
import { LocationAndMap } from "@/sections/experience-center/LocationAndMap";
import { WorkingHours } from "@/sections/experience-center/WorkingHours";
import { WalkthroughBookingForm } from "@/sections/experience-center/WalkthroughBookingForm";
import { ExperienceCenterFinalCTA } from "@/sections/experience-center/ExperienceCenterFinalCTA";
import { buildMetadata, localBusinessSchema } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Experience Center",
  description:
    "Visit the Settle Furnitures Experience Center in Coimbatore, browse the store gallery, and book a walkthrough.",
  path: "/experience-center",
});

export default function ExperienceCenterPage() {
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

      <ExperienceCenterHero />
      <StoreGallery />
      <LocationAndMap />
      <WorkingHours />
      <WalkthroughBookingForm />
      <ExperienceCenterFinalCTA />
    </>
  );
}
