import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    // Capped at 2560px (default goes to 3840) to avoid oversized variants for full-bleed heroes
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2560],
    minimumCacheTTL: 31536000,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/**',
      },
    ],
  },
  transpilePackages: [
    'next-sanity',
    'sanity',
    '@sanity/sdk-react',
    '@sanity/workbench',
  ],
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/',
        has: [
          {
            type: 'host',
            value: 'www.raahiinternational.com',
          },
        ],
        destination: 'https://raahiinternational.com/',
        permanent: true,
      },
      {
        source: '/:path+',
        has: [
          {
            type: 'host',
            value: 'www.raahiinternational.com',
          },
        ],
        destination: 'https://raahiinternational.com/:path+',
        permanent: true,
      },
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
