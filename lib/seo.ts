import type { Metadata } from "next";
import { SITE_CONFIG } from "@/constants/site";
import type { Product } from "@/types/product";

interface PageMetadataInput {
  title: string;
  description: string;
  path: string;
  image?: string;
}

export function buildMetadata({ title, description, path, image }: PageMetadataInput): Metadata {
  const url = `${SITE_CONFIG.url}${path}`;
  const ogImage = image ?? `${SITE_CONFIG.url}/og-default.jpg`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_CONFIG.name,
      images: [{ url: ogImage }],
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_CONFIG.legalName,
    alternateName: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    sameAs: Object.values(SITE_CONFIG.social),
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function productSchema(product: Product) {
  const primaryImage = product.images.find((img) => img.isPrimary) ?? product.images[0];

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: primaryImage ? [primaryImage.url] : undefined,
    material: product.material,
    offers: product.price?.display
      ? {
          "@type": "Offer",
          priceCurrency: product.price.currency,
          price: product.price.amount,
          availability: "https://schema.org/InStock",
        }
      : undefined,
  };
}

export function localBusinessSchema(input: {
  name: string;
  address: string;
  telephone: string;
  latitude?: number;
  longitude?: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: input.name,
    address: input.address,
    telephone: input.telephone,
    ...(input.latitude && input.longitude
      ? { geo: { "@type": "GeoCoordinates", latitude: input.latitude, longitude: input.longitude } }
      : {}),
  };
}
