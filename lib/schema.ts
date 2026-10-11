import { SITE } from "@/lib/site";

export function professionalServiceJsonLd() {
  const provider = { "@id": `${SITE.url}/#business` };
  const area = { "@type": "City", name: SITE.city };
  const business = {
    "@type": ["ProfessionalService", "LocalBusiness"],
    "@id": `${SITE.url}/#business`,
    name: SITE.name,
    url: SITE.url,
    email: SITE.email,
    telephone: SITE.phoneSchema,
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE.city,
      addressRegion: SITE.region,
      addressCountry: SITE.country,
    },
    location: {
      "@type": "Place",
      name: SITE.neighborhood,
      address: {
        "@type": "PostalAddress",
        addressLocality: SITE.city,
        addressRegion: SITE.region,
        addressCountry: SITE.country,
      },
    },
    areaServed: [
      {
        "@type": "Neighborhood",
        name: SITE.neighborhood,
        containedInPlace: {
          "@type": "City",
          name: SITE.city,
        },
      },
      {
        "@type": "City",
        name: SITE.city,
      },
      {
        "@type": "Place",
        name: "Chicagoland",
      },
    ],
  };

  return {
    "@context": "https://schema.org",
    "@graph": [
      business,
      {
        "@type": "Service",
        "@id": `${SITE.url}/#web-design`,
        name: "Custom website design for local businesses",
        serviceType: "Web design",
        description:
          "Custom websites for local businesses, live in 3\u20134 weeks. Flat fee, quoted before any work starts.",
        provider,
        areaServed: area,
        url: SITE.url,
        offers: {
          "@type": "Offer",
          price: "4000",
          priceCurrency: "USD",
          url: `${SITE.url}/#pricing`,
        },
      },
      {
        "@type": "Service",
        "@id": `${SITE.url}/ai-workflows#service`,
        name: "AI workflow consulting: busywork audit",
        serviceType: "AI workflow consulting",
        description:
          "A busywork audit and written plan for simple automations that answer, follow up, and keep track. Build quoted from the plan.",
        provider,
        areaServed: area,
        url: `${SITE.url}/ai-workflows`,
        offers: {
          "@type": "Offer",
          price: "1500",
          priceCurrency: "USD",
          url: `${SITE.url}/ai-workflows`,
        },
      },
    ],
  };
}
