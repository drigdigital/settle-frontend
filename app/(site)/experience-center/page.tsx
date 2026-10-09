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

export const metadata = buildMetadata({
  title: "Experience Center",
  description:
    "Walk through Settle at the Experience Center inside Vaanam Furniture's Coimbatore facility: full room setups, real finishes, and walkthroughs by appointment.",
  path: "/experience-center",
});

/**
 * Experience Center page: hero → store gallery → location & hours →
 * walkthrough booking → closing CTA, one focused screen each.
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
    { name: "Experience Center", url: `${SITE_CONFIG.url}/experience-center` },
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
        breadcrumbLabel="Experience Center"
        headingId="experience-center-heading"
      />
      <StoreGallery content={STORE_GALLERY} />
      <VisitDetails content={VISIT_DETAILS} />
      {/* id="book" is the target of the homepage banner's "Book A Visit" link. */}
      <EnquirySection
        id="book"
        tone="paper"
        content={WALKTHROUGH_BOOKING}
        formType="walkthrough"
        page="/experience-center"
        image={WALKTHROUGH_BOOKING_IMAGE}
      />
      <ClosingCta content={EXPERIENCE_CENTER_CTA} className="snap-start" />
    </div>
  );
}
