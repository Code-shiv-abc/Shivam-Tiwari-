import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: 'export' removed to support Vercel Node.js/Edge features (Server Actions, API routes, etc)
  // basePath and assetPrefix removed as we are deploying to the domain root on Vercel Hobby
  images: {
    // keeping formats and remote patterns, unoptimized may be removed later when we configure Vercel Blob
    formats: ['image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'github.com',
      }
    ],
  },
};

export default nextConfig;
