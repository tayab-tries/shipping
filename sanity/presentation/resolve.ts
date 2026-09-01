import { defineLocations } from 'sanity/presentation';

export const resolve = {
  locations: {
    homepage: defineLocations({
      select: {
        title: 'seo.metaTitle',
      },
      resolve: () => ({
        locations: [
          {
            title: 'Homepage',
            href: '/',
          },
        ],
      }),
    }),
    siteSettings: defineLocations({
      select: {
        title: 'businessName',
      },
      resolve: () => ({
        locations: [
          {
            title: 'Site Header & Footer Settings',
            href: '/',
          },
        ],
      }),
    }),
    service: defineLocations({
      select: {
        title: 'name',
        slug: 'slug.current',
      },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title ? `Service: ${doc.title}` : 'Service Page',
            href: doc?.slug ? `/services/${doc.slug}` : '/services',
          },
          {
            title: 'Services Portfolio Hub',
            href: '/services',
          },
        ],
      }),
    }),
    location: defineLocations({
      select: {
        title: 'name',
        slug: 'slug.current',
      },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title ? `Location: ${doc.title}` : 'Location Hub',
            href: doc?.slug ? `/locations/${doc.slug}` : '/locations',
          },
          {
            title: 'Locations Network Directory',
            href: '/locations',
          },
        ],
      }),
    }),
    destinationCountry: defineLocations({
      select: {
        title: 'name',
        slug: 'slug.current',
      },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title ? `Destination: ${doc.title}` : 'Destination Country',
            href: doc?.slug ? `/destinations/${doc.slug}` : '/destinations',
          },
          {
            title: 'Destinations Directory Hub',
            href: '/destinations',
          },
        ],
      }),
    }),
    destinationCity: defineLocations({
      select: {
        title: 'name',
        slug: 'slug.current',
        countrySlug: 'country->slug.current',
      },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title ? `City: ${doc.title}` : 'Destination City',
            href: doc?.countrySlug && doc?.slug ? `/destinations/${doc.countrySlug}/${doc.slug}` : '/destinations',
          },
        ],
      }),
    }),
    guide: defineLocations({
      select: {
        title: 'title',
        slug: 'slug.current',
      },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title ? `Guide: ${doc.title}` : 'Guide Article',
            href: doc?.slug ? `/guides/${doc.slug}` : '/guides',
          },
          {
            title: 'Customs & Shipping Guides Hub',
            href: '/guides',
          },
        ],
      }),
    }),
  },
};
