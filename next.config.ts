import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: [
    'next-sanity',
    'sanity',
    '@sanity/sdk-react',
    '@sanity/workbench',
  ],
  async redirects() {
    return [
      {
        source: '/guides/air-vs-sea-cargo',
        destination: '/services/air-freight',
        permanent: true,
      },
      {
        source: '/cargo-services',
        destination: '/services/air-freight',
        permanent: true,
      },
      {
        source: '/services/cargo-services',
        destination: '/services/air-freight',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
