import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SITE_CONFIG } from "@/lib/constants";
import Script from "next/script";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: {
    default: `${SITE_CONFIG.name} - ${SITE_CONFIG.role}`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  metadataBase: new URL(SITE_CONFIG.url),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_CONFIG.url,
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    siteName: SITE_CONFIG.name,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": SITE_CONFIG.geo.type,
    "name": SITE_CONFIG.name,
    "url": SITE_CONFIG.url,
    "sameAs": [
      SITE_CONFIG.social.github,
      SITE_CONFIG.social.linkedin,
    ],
    "jobTitle": SITE_CONFIG.role,
    "knowsAbout": SITE_CONFIG.geo.knowsAbout,
    "alumniOf": SITE_CONFIG.geo.alumniOf,
  };

  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={cn(
          "min-h-screen bg-[#0A0A0A] text-white font-sans antialiased flex flex-col selection:bg-blue-500/20",
          inter.variable
        )}
      >
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
