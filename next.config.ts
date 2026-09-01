import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: [
    'next-sanity',
    'sanity',
    '@sanity/sdk-react',
    '@sanity/workbench',
  ],
};

export default nextConfig;
