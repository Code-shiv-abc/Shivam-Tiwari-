import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Images configuration commented out to prevent accidental Image Optimization usage
  // which counts against Vercel Hobby Plan limits.
  // images: {
  //   remotePatterns: [
  //     {
  //       protocol: 'https',
  //       hostname: 'avatars.githubusercontent.com',
  //     },
  //     {
  //       protocol: 'https',
  //       hostname: 'github.com',
  //     }
  //   ],
  // },
};

export default nextConfig;
