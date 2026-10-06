import type { Metadata } from "next";
import type { ReactNode } from "react";
import Script from "next/script";
import { MotionConfig } from "framer-motion";
import { fontSans } from "@/lib/fonts";
import { SITE_CONFIG } from "@/constants/site";
import { organizationSchema } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: { default: SITE_CONFIG.name, template: `%s | ${SITE_CONFIG.name}` },
  description: SITE_CONFIG.description,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${fontSans.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <MotionConfig reducedMotion="user">{children}</MotionConfig>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema()) }}
        />

        {SITE_CONFIG.ga4MeasurementId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${SITE_CONFIG.ga4MeasurementId}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${SITE_CONFIG.ga4MeasurementId}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
