import "../styles/tokens.css";
import "./globals.css";
import type { Metadata } from "next";
import { Syne, DM_Sans, DM_Mono } from "next/font/google";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SITE_CONFIG } from "@/lib/constants";
import Script from "next/script";
import { cn } from "@/lib/utils";

// Initialize fonts
const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-syne",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-dm-sans",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-mono",
});

export const metadata: Metadata = {
  title: {
    default: `${SITE_CONFIG.name} - ${SITE_CONFIG.title}`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.headline,
  metadataBase: new URL(SITE_CONFIG.url),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_CONFIG.url,
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.headline,
    siteName: SITE_CONFIG.name,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.headline,
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
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    sameAs: [SITE_CONFIG.social.github, SITE_CONFIG.social.linkedin],
    jobTitle: SITE_CONFIG.title,
    knowsAbout: SITE_CONFIG.geo.knowsAbout,
    alumniOf: SITE_CONFIG.geo.alumniOf,
  };

  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={cn(
          syne.variable,
          dmSans.variable,
          dmMono.variable,
          "min-h-screen font-body antialiased flex flex-col selection:bg-accent/30"
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
