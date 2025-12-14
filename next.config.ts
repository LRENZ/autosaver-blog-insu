import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'i.imgur.com',
      },
    ],
    domains: [
      // Vercel Blob Storage domains (fallback for wildcard support)
      'uwc3yxl7ru9r1y0r.public.blob.vercel-storage.com',
    ],
    // Allow external images without optimization to avoid 400 errors
    unoptimized: true,
  },
  // Enable experimental features for Cloudflare Pages
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
};

export default nextConfig;
