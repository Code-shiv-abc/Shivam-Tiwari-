import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SITE_CONFIG } from "@/lib/constants";
import Script from "next/script";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: `${SITE_CONFIG.name} - ${SITE_CONFIG.role}`,
  description: SITE_CONFIG.description,
  metadataBase: new URL(SITE_CONFIG.url),
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
          "min-h-screen bg-background font-sans antialiased flex flex-col",
          inter.className
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
