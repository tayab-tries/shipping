/**
 * Centralized Media & Photography Registry
 * Authoritative single source of truth for photographic asset slots.
 * Component layouts reference these slots rather than hardcoding image paths.
 */

export interface ImageSlotDefinition {
  src: string;
  fallbackSrc: string;
  alt: string;
  aspectRatio: string;
}

export const IMAGE_SLOTS = {
  hero: {
    src: '/images/hero-freight.jpg',
    fallbackSrc: '/images/hero-freight.svg',
    alt: 'International ocean container freighter vessel sailing at sea',
    aspectRatio: 'aspect-[16/9]',
  },
  serviceAir: {
    src: '/images/service-air.jpg',
    fallbackSrc: '/images/service-air.svg',
    alt: 'Express air cargo freighter loading palletized cargo on airport tarmac',
    aspectRatio: 'aspect-[16/9]',
  },
  serviceSea: {
    src: '/images/service-sea.jpg',
    fallbackSrc: '/images/service-sea.svg',
    alt: 'Ocean container freighter ship sailing open waters',
    aspectRatio: 'aspect-[4/3]',
  },
  serviceDoor: {
    src: '/images/service-door.jpg',
    fallbackSrc: '/images/service-door.svg',
    alt: 'Courier handing parcel package to recipient at doorstep',
    aspectRatio: 'aspect-[4/3]',
  },
  pakistanHub: {
    src: '/images/pakistan-hub.webp',
    fallbackSrc: '/images/pakistan-hub.svg',
    alt: 'Pakistan export cargo freight terminal handling facility',
    aspectRatio: 'aspect-[16/9]',
  },
  guideCover: {
    src: '/images/guide-cover.webp',
    fallbackSrc: '/images/guide-cover.svg',
    alt: 'Export customs documentation and international packaging guide',
    aspectRatio: 'aspect-[3/2]',
  },
} as const;

export type ImageSlotKey = keyof typeof IMAGE_SLOTS;
