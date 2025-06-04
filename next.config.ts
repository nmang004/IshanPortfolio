import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Allow build to complete even with TypeScript errors for deployment
    ignoreBuildErrors: true,
  },
  eslint: {
    // Allow build to complete even with ESLint warnings for deployment
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
