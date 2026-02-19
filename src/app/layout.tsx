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
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: `${SITE_CONFIG.name} - ${SITE_CONFIG.role}`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  applicationName: SITE_CONFIG.name,
  authors: [{ name: SITE_CONFIG.name, url: SITE_CONFIG.url }],
  creator: SITE_CONFIG.creator,
  publisher: SITE_CONFIG.publisher,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: SITE_CONFIG.name,
  },
  alternates: {
    canonical: "/",
  },
  category: "technology",
  classification: "Executive Portfolio",
  keywords: SITE_CONFIG.keywords,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "profile",
    locale: "en_US",
    url: SITE_CONFIG.url,
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: "/og-image.jpg", // Assuming an image exists or will be added
        width: 1200,
        height: 630,
        alt: `${SITE_CONFIG.name} - ${SITE_CONFIG.role}`,
      },
    ],
    firstName: SITE_CONFIG.name.split(" ")[0],
    lastName: SITE_CONFIG.name.split(" ")[1],
    username: SITE_CONFIG.social.twitter,
    gender: "male", // Assuming based on name, adjust if needed or remove
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    creator: SITE_CONFIG.social.twitter,
    images: ["/og-image.jpg"],
  },
  verification: {
    google: "google-site-verification=PLACEHOLDER", // Add actual code here
    yandex: "yandex-verification=PLACEHOLDER",
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
    "image": `${SITE_CONFIG.url}/og-image.jpg`,
    "sameAs": [
      SITE_CONFIG.social.github,
      SITE_CONFIG.social.linkedin,
      SITE_CONFIG.social.twitter ? `https://twitter.com/${SITE_CONFIG.social.twitter.replace('@', '')}` : null,
    ].filter(Boolean),
    "jobTitle": SITE_CONFIG.role,
    "worksFor": {
      "@type": "Organization",
      "name": SITE_CONFIG.geo.worksFor.name,
      "url": SITE_CONFIG.geo.worksFor.url
    },
    "alumniOf": {
      "@type": "CollegeOrUniversity",
      "name": SITE_CONFIG.geo.alumniOf
    },
    "homeLocation": {
      "@type": "Place",
      "name": SITE_CONFIG.geo.location
    },
    "knowsAbout": SITE_CONFIG.geo.knowsAbout,
    "description": SITE_CONFIG.description,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": SITE_CONFIG.url
    }
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
