import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 1. We removed 'output: export' completely.
  // 2. We allow images from ANY domain (like Supabase or Unsplash)
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', 
      },
    ],
  },
};

export default nextConfig;