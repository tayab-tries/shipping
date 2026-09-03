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
        source: '/services/air-freight',
        destination: '/cargo-services',
        permanent: true,
      },
      {
        source: '/services/sea-cargo',
        destination: '/cargo-services',
        permanent: true,
      },
      {
        source: '/guides/air-vs-sea-cargo',
        destination: '/cargo-services',
        permanent: true,
      },
      {
        source: '/services/cargo-services',
        destination: '/cargo-services',
        permanent: true,
      },
      {
        source: '/services/air-and-sea-cargo',
        destination: '/cargo-services',
        permanent: true,
      },
      {
        source: '/about-us',
        destination: '/about',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
