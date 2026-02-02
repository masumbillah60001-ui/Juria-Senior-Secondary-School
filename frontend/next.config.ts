import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.ailandingpage.ai',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co', // Useful for placeholders
        pathname: '/**',
      }
    ],
  },
};

export default nextConfig;
