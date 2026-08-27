export interface NavSubItem {
  title: string;
  href: string;
  description?: string;
}

export interface NavItem {
  title: string;
  href: string;
  children?: NavSubItem[];
  viewAllHref?: string;
  viewAllLabel?: string;
}

export interface FooterNavGroup {
  title: string;
  items: { label: string; href: string }[];
}

export const mainNavigation: NavItem[] = [
  {
    title: 'Services',
    href: '/services',
    viewAllHref: '/services',
    viewAllLabel: 'View all services',
    children: [
      {
        title: 'Air Freight',
        href: '/services/air-freight',
        description: 'Direct airport and door express air cargo dispatch.',
      },
      {
        title: 'Sea Cargo',
        href: '/services/sea-cargo',
        description: 'Economical containerized shipping (FCL/LCL).',
      },
      {
        title: 'Door-to-Door',
        href: '/services/door-to-door',
        description: 'End-to-end pickup and international delivery.',
      },
    ],
  },
  {
    title: 'Destinations',
    href: '/destinations',
    viewAllHref: '/destinations',
    viewAllLabel: 'View all destinations',
    children: [
      { title: 'United Kingdom', href: '/destinations/uk' },
      { title: 'United Arab Emirates', href: '/destinations/uae' },
      { title: 'United States', href: '/destinations/usa' },
      { title: 'Canada', href: '/destinations/canada' },
      { title: 'Saudi Arabia', href: '/destinations/ksa' },
    ],
  },
  {
    title: 'Locations',
    href: '/locations',
    viewAllHref: '/locations',
    viewAllLabel: 'View all locations',
    children: [
      { title: 'Lahore Hub', href: '/locations/lahore' },
      { title: 'Karachi Hub', href: '/locations/karachi' },
      { title: 'Islamabad Hub', href: '/locations/islamabad' },
      { title: 'Rawalpindi Hub', href: '/locations/rawalpindi' },
    ],
  },
  {
    title: 'Guides',
    href: '/guides',
    viewAllHref: '/guides',
    viewAllLabel: 'View all guides',
    children: [
      { title: 'Customs & Regulations', href: '/guides/customs' },
      { title: 'Packaging Guidelines', href: '/guides/packaging' },
      { title: 'Restricted Items', href: '/guides/restricted-items' },
    ],
  },
  {
    title: 'Track Shipment',
    href: '/track',
  },
];

export const primaryCta = {
  label: 'Get a Quote',
  href: '/quote',
};

export const footerNavigation: FooterNavGroup[] = [
  {
    title: 'Services',
    items: [
      { label: 'Air Freight', href: '/services/air-freight' },
      { label: 'Sea Cargo', href: '/services/sea-cargo' },
      { label: 'Door-to-Door', href: '/services/door-to-door' },
      { label: 'Excess Baggage', href: '/services/excess-baggage' },
      { label: 'Commercial Freight', href: '/services/commercial-freight' },
    ],
  },
  {
    title: 'Destinations',
    items: [
      { label: 'Cargo to UK', href: '/destinations/uk' },
      { label: 'Cargo to UAE', href: '/destinations/uae' },
      { label: 'Cargo to USA', href: '/destinations/usa' },
      { label: 'Cargo to Canada', href: '/destinations/canada' },
      { label: 'Cargo to KSA', href: '/destinations/ksa' },
    ],
  },
  {
    title: 'Locations',
    items: [
      { label: 'Lahore Office', href: '/locations/lahore' },
      { label: 'Karachi Office', href: '/locations/karachi' },
      { label: 'Islamabad Office', href: '/locations/islamabad' },
    ],
  },
  {
    title: 'Resources',
    items: [
      { label: 'Track Shipment', href: '/track' },
      { label: 'Request Quote', href: '/quote' },
      { label: 'Customs Guides', href: '/guides/customs' },
      { label: 'Packaging Tips', href: '/guides/packaging' },
      { label: 'Contact Us', href: '/contact' },
    ],
  },
];
