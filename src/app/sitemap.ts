import { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/site-config";

// No longer force-static because we want standard Next.js behavior for Vercel Hobby
// We will let Next.js handle it normally.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_CONFIG.url,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    // We will later add dynamic routes here mapping to /projects/[slug]
  ];
}