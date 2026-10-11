import type { Metadata } from "next";
import { Bricolage_Grotesque, Figtree } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { JsonLd } from "@/components/json-ld";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SITE } from "@/lib/site";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.ogTitle,
    template: "%s | Beverly Web Design",
  },
  description: SITE.ogDescription,
  keywords: ["Chicago web design", "Beverly Web Design", "AI workflows", "small business websites"],
  authors: [{ name: SITE.name }],
  openGraph: {
    title: SITE.ogTitle,
    description: SITE.ogDescription,
    url: SITE.url,
    siteName: SITE.name,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "A site that brings in work. Web design and AI workflows. Beverly Web Design, Chicago.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.ogTitle,
    description: SITE.ogDescription,
    images: ["/og.png"],
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bricolage.variable} ${figtree.variable}`}>
      <body className="min-h-screen bg-paper font-ui text-ink antialiased">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <JsonLd />
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  );
}
