import { ClosingCta } from "@/components/shared/ClosingCta";
import { EnquirySection } from "@/components/shared/EnquirySection";
import { SplitHero } from "@/components/shared/SplitHero";
import {
  EXPERIENCE_CENTER_CTA,
  EXPERIENCE_CENTER_HERO,
  STORE_GALLERY,
  VISIT_DETAILS,
  WALKTHROUGH_BOOKING,
  WALKTHROUGH_BOOKING_IMAGE,
} from "@/constants/experienceCenterPage";
import { SITE_CONFIG } from "@/constants/site";
import { breadcrumbSchema, buildMetadata, localBusinessSchema } from "@/lib/seo";
import { StoreGallery } from "@/sections/experience-center/StoreGallery";
import { VisitDetails } from "@/sections/experience-center/VisitDetails";

const PLANTS_TITLE = "Visit Our Plants | Settle Furniture, Coimbatore";

// `absolute` skips the root layout's "%s | Settle Furnitures" template so the approved title renders as written.
export const metadata = {
  ...buildMetadata({
    title: PLANTS_TITLE,
    description:
      "See where Settle is made. Book a plant walkthrough and visit our factory display center in Coimbatore.",
    path: "/our-plants",
  }),
  title: { absolute: PLANTS_TITLE },
};

/**
 * Our Plants page (formerly /experience-center, which redirects here): hero → what you can
 * see → location & hours → visit booking → closing CTA, one focused screen each.
 * [data-snap-page] opts this page into gentle scroll snapping
 * (app/globals.css). Content lives in constants/experienceCenterPage.ts.
 */
export default function ExperienceCenterPage() {
  const { location } = VISIT_DETAILS;
  const localBusiness = localBusinessSchema({
    name: location.name,
    address: location.addressLines.join(" "),
    telephone: location.phone,
  });
  const breadcrumbs = breadcrumbSchema([
    { name: "Home", url: SITE_CONFIG.url },
    { name: "Our Plants", url: `${SITE_CONFIG.url}/our-plants` },
  ]);

  return (
    <div data-snap-page>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />

      <SplitHero
        content={EXPERIENCE_CENTER_HERO}
        breadcrumbLabel="Our Plants"
        headingId="experience-center-heading"
      />
      <StoreGallery content={STORE_GALLERY} />
      <VisitDetails content={VISIT_DETAILS} />
      {/* id="book" is the target of the homepage banner's "Plan A Plant Visit" link. */}
      <EnquirySection
        id="book"
        tone="paper"
        content={WALKTHROUGH_BOOKING}
        formType="walkthrough"
        page="/our-plants"
        image={WALKTHROUGH_BOOKING_IMAGE}
      />
      <ClosingCta content={EXPERIENCE_CENTER_CTA} className="snap-start" />
    </div>
  );
}
