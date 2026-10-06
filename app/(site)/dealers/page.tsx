import { DealersHero } from "@/sections/dealers/DealersHero";
import { DealerBenefits } from "@/sections/dealers/DealerBenefits";
import { SupportStructure } from "@/sections/dealers/SupportStructure";
import { DealerApplicationForm } from "@/sections/dealers/DealerApplicationForm";
import { DealersFinalCTA } from "@/sections/dealers/DealersFinalCTA";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Dealers & Partners",
  description:
    "Become a Settle Furniture dealer — backed by Vaanam Furniture's in-house manufacturing across Chera, Settle and Kov.",
  path: "/dealers",
});

export default function DealersPage() {
  return (
    <>
      <DealersHero />
      <DealerBenefits />
      <SupportStructure />
      <DealerApplicationForm />
      <DealersFinalCTA />
    </>
  );
}
