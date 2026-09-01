import { defineType, defineField } from 'sanity';

export const homepageType = defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Document Name',
      type: 'string',
      initialValue: 'Main Homepage',
      readOnly: true,
    }),

    // A. SEO Metadata
    defineField({
      name: 'seo',
      title: 'A. SEO Metadata',
      type: 'seoObject',
    }),

    // B. Hero Section
    defineField({
      name: 'hero',
      title: 'B. Hero Section',
      type: 'object',
      fields: [
        defineField({
          name: 'eyebrow',
          title: 'Eyebrow Badge Text',
          type: 'string',
          initialValue: 'DOOR-TO-DOOR CARGO SHIPPING FROM PAKISTAN',
        }),
        defineField({
          name: 'heading',
          title: 'Primary Heading',
          type: 'string',
          initialValue: 'SEND CARGO FROM PAKISTAN.',
        }),
        defineField({
          name: 'highlightedHeading',
          title: 'Highlighted Sub-Heading',
          type: 'string',
          initialValue: "WE'LL HANDLE THE REST.",
        }),
        defineField({
          name: 'description',
          title: 'Hero Description Copy',
          type: 'text',
          rows: 3,
          initialValue:
            'Door-to-door cargo delivery by air and sea. We pick up from Pakistan and deliver to destinations worldwide.',
        }),
        defineField({
          name: 'primaryCtaLabel',
          title: 'Primary CTA Button Text',
          type: 'string',
          initialValue: 'GET A QUOTE',
        }),
        defineField({
          name: 'primaryCtaHref',
          title: 'Primary CTA Link Destination',
          type: 'string',
          initialValue: '/quote',
        }),
        defineField({
          name: 'secondaryCtaLabel',
          title: 'Secondary CTA Button Text',
          type: 'string',
          initialValue: 'WHATSAPP US',
        }),
        defineField({
          name: 'secondaryCtaHref',
          title: 'Secondary CTA Link Destination',
          type: 'string',
          initialValue:
            'https://wa.me/923001234567?text=Assalam%20o%20Alaikum%2C%20I%20want%20to%20send%20cargo%20from%20Pakistan.%20Please%20give%20me%20a%20quote.',
        }),
        defineField({
          name: 'heroImage',
          title: 'Hero Background Image',
          type: 'image',
          options: { hotspot: true },
        }),
        defineField({
          name: 'heroImageAlt',
          title: 'Hero Background Image Alt Text',
          type: 'string',
          initialValue: 'Air and sea cargo shipping from Pakistan',
        }),
      ],
    }),

    // C. Hero Feature Chips
    defineField({
      name: 'heroFeatureChips',
      title: 'C. Hero Capability Chips',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Chip Label', type: 'string' }),
            defineField({ name: 'icon', title: 'Icon Key (Optional)', type: 'string' }),
          ],
        },
      ],
    }),

    // D. Quick Quote / Tracking Area
    defineField({
      name: 'quickQuote',
      title: 'D. Quick Quote Teaser Area',
      type: 'object',
      fields: [
        defineField({
          name: 'heading',
          title: 'Section Heading',
          type: 'string',
          initialValue: 'Quick Rate & Route Inquiry',
        }),
        defineField({
          name: 'description',
          title: 'Section Subtitle / Description',
          type: 'string',
          initialValue: 'Select shipment parameters to initiate a quote request',
        }),
        defineField({
          name: 'ctaText',
          title: 'Form Submit Button Text',
          type: 'string',
          initialValue: 'Continue to Quote',
        }),
      ],
    }),

    // E. Trust Metrics
    defineField({
      name: 'trustMetrics',
      title: 'E. Trust Metrics (Optional)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'value', title: 'Metric Value (e.g. 100%)', type: 'string' }),
            defineField({ name: 'label', title: 'Metric Label', type: 'string' }),
          ],
        },
      ],
    }),

    // F. Registrations & Associations
    defineField({
      name: 'registrations',
      title: 'F. Registrations & Global Affiliations',
      type: 'object',
      fields: [
        defineField({
          name: 'heading',
          title: 'Section Heading',
          type: 'string',
          initialValue: 'WE ARE REGISTERED WITH FBR AND ASSOCIATED WITH',
        }),
        defineField({
          name: 'items',
          title: 'Registration Items',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({ name: 'name', title: 'Short Name', type: 'string' }),
                defineField({ name: 'logo', title: 'Logo Image', type: 'image', options: { hotspot: true } }),
                defineField({ name: 'altText', title: 'Alt Text', type: 'string' }),
                defineField({ name: 'orgName', title: 'Full Organization Name', type: 'string' }),
                defineField({ name: 'description', title: 'Sub-text Description', type: 'string' }),
              ],
            },
          ],
        }),
      ],
    }),

    // G. Trusted by the Market
    defineField({
      name: 'trustedMarket',
      title: 'G. Trusted by the Market',
      type: 'object',
      fields: [
        defineField({
          name: 'heading',
          title: 'Section Heading',
          type: 'string',
          initialValue: 'TRUSTED BY THE MARKET',
        }),
        defineField({
          name: 'items',
          title: 'Client Logos',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({ name: 'companyName', title: 'Company Name', type: 'string' }),
                defineField({ name: 'logo', title: 'Logo Image', type: 'image', options: { hotspot: true } }),
                defineField({ name: 'altText', title: 'Alt Text', type: 'string' }),
              ],
            },
          ],
        }),
      ],
    }),

    // H. What Can You Send
    defineField({
      name: 'whatCanYouSend',
      title: 'H. What Can You Send Section',
      type: 'object',
      fields: [
        defineField({
          name: 'badge',
          title: 'Badge Label',
          type: 'string',
          initialValue: 'Cargo Types',
        }),
        defineField({
          name: 'heading',
          title: 'Section Heading',
          type: 'string',
          initialValue: 'WHAT CAN YOU SEND?',
        }),
        defineField({
          name: 'description',
          title: 'Section Subtitle',
          type: 'text',
          rows: 2,
          initialValue:
            'We handle personal belongings, luggage, gifts, and commercial export shipments.',
        }),
        defineField({
          name: 'items',
          title: 'Cargo Category Cards',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({ name: 'title', title: 'Card Title', type: 'string' }),
                defineField({ name: 'description', title: 'Card Description', type: 'text', rows: 2 }),
                defineField({ name: 'badgeText', title: 'Card Tag / Badge', type: 'string' }),
                defineField({ name: 'iconName', title: 'Icon Identifier (Package, Luggage, Building2)', type: 'string' }),
              ],
            },
          ],
        }),
      ],
    }),

    // I. Air + Sea Cargo Section (Strictly 2 Service Cards)
    defineField({
      name: 'servicesOverview',
      title: 'I. Air & Sea Cargo Section (2 Services Only)',
      type: 'object',
      fields: [
        defineField({
          name: 'badge',
          title: 'Section Badge',
          type: 'string',
          initialValue: 'Our Services',
        }),
        defineField({
          name: 'heading',
          title: 'Section Heading',
          type: 'string',
          initialValue: 'Air & Sea Cargo Services',
        }),
        defineField({
          name: 'description',
          title: 'Section Subtitle',
          type: 'text',
          rows: 2,
          initialValue:
            'Fast air cargo and economical sea cargo with complete door-to-door delivery from Pakistan.',
        }),
        defineField({
          name: 'airCargo',
          title: '1. Air Cargo Service Card',
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string', initialValue: 'AIR CARGO' }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
              initialValue:
                'Air cargo shipping with door-to-door delivery. Fast air dispatches for boxes, gifts, excess baggage, and urgent shipments.',
            }),
            defineField({ name: 'image', title: 'Card Photo Image', type: 'image', options: { hotspot: true } }),
            defineField({ name: 'imageAlt', title: 'Image Alt Text', type: 'string' }),
            defineField({ name: 'features', title: 'Feature Bullet Points', type: 'array', of: [{ type: 'string' }] }),
            defineField({ name: 'ctaLabel', title: 'CTA Button Text', type: 'string', initialValue: 'Air Cargo Details' }),
            defineField({ name: 'ctaHref', title: 'CTA Button Destination', type: 'string', initialValue: '/services/air-freight' }),
          ],
        }),
        defineField({
          name: 'seaCargo',
          title: '2. Sea Cargo Service Card',
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string', initialValue: 'SEA CARGO' }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
              initialValue:
                'Sea cargo shipping with door-to-door delivery. Economical ocean container shipping for heavy goods and large household shipments.',
            }),
            defineField({ name: 'image', title: 'Card Photo Image', type: 'image', options: { hotspot: true } }),
            defineField({ name: 'imageAlt', title: 'Image Alt Text', type: 'string' }),
            defineField({ name: 'features', title: 'Feature Bullet Points', type: 'array', of: [{ type: 'string' }] }),
            defineField({ name: 'ctaLabel', title: 'CTA Button Text', type: 'string', initialValue: 'Sea Cargo Details' }),
            defineField({ name: 'ctaHref', title: 'CTA Button Destination', type: 'string', initialValue: '/services/sea-cargo' }),
          ],
        }),
      ],
    }),

    // J. Popular Destinations
    defineField({
      name: 'popularDestinations',
      title: 'J. Popular Destinations Section',
      type: 'object',
      fields: [
        defineField({ name: 'badge', title: 'Badge', type: 'string', initialValue: 'Global Routes' }),
        defineField({ name: 'heading', title: 'Section Heading', type: 'string', initialValue: 'POPULAR DESTINATIONS FROM PAKISTAN' }),
        defineField({ name: 'description', title: 'Section Subtitle', type: 'text', rows: 2, initialValue: 'Direct cargo delivery connecting Pakistan to major international destination countries.' }),
        defineField({
          name: 'destinations',
          title: 'Destination Cards',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({ name: 'name', title: 'Destination Country Name', type: 'string' }),
                defineField({ name: 'countryCode', title: 'Country Code (uk, uae, usa, canada, ksa)', type: 'string' }),
                defineField({ name: 'flagImage', title: 'Flag / Image Asset', type: 'image', options: { hotspot: true } }),
                defineField({ name: 'shortText', title: 'Short Description Copy', type: 'string' }),
                defineField({ name: 'href', title: 'Destination Link Path', type: 'string' }),
              ],
            },
          ],
        }),
      ],
    }),

    // K. Pickup Cities
    defineField({
      name: 'pickupCities',
      title: 'K. Pickup Cities Across Pakistan',
      type: 'object',
      fields: [
        defineField({ name: 'badge', title: 'Badge', type: 'string', initialValue: 'Home Pickup' }),
        defineField({ name: 'heading', title: 'Section Heading', type: 'string', initialValue: 'WE PICK UP CARGO ACROSS PAKISTAN' }),
        defineField({ name: 'description', title: 'Section Subtitle', type: 'text', rows: 2, initialValue: 'Doorstep collection available across major commercial cities in Pakistan.' }),
        defineField({
          name: 'cities',
          title: 'City Links Array',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({ name: 'name', title: 'City Name', type: 'string' }),
                defineField({ name: 'href', title: 'City Link Path', type: 'string' }),
              ],
            },
          ],
        }),
      ],
    }),

    // L. How It Works
    defineField({
      name: 'howItWorks',
      title: 'L. How It Works (Process Steps)',
      type: 'object',
      fields: [
        defineField({ name: 'badge', title: 'Badge', type: 'string', initialValue: 'How It Works' }),
        defineField({ name: 'heading', title: 'Section Heading', type: 'string', initialValue: 'Simple 4-Step Cargo Shipping Process' }),
        defineField({ name: 'description', title: 'Section Subtitle', type: 'text', rows: 2, initialValue: 'From your initial quote to doorstep delivery at your destination address.' }),
        defineField({
          name: 'steps',
          title: 'Process Steps',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({ name: 'stepNumber', title: 'Step Number (01, 02, 03, 04)', type: 'string' }),
                defineField({ name: 'title', title: 'Step Title', type: 'string' }),
                defineField({ name: 'subtitle', title: 'Step Subtitle', type: 'string' }),
                defineField({ name: 'description', title: 'Step Description', type: 'text', rows: 2 }),
              ],
            },
          ],
        }),
      ],
    }),

    // M. Testimonials / Delivery Proof (Optional)
    defineField({
      name: 'testimonials',
      title: 'M. Testimonials / Delivery Proof (Optional)',
      type: 'object',
      fields: [
        defineField({ name: 'badge', title: 'Badge', type: 'string', initialValue: 'Customer Reviews' }),
        defineField({ name: 'heading', title: 'Section Heading', type: 'string', initialValue: 'What Our Customers Say' }),
        defineField({ name: 'description', title: 'Section Subtitle', type: 'text', rows: 2 }),
        defineField({
          name: 'items',
          title: 'Testimonial Cards / Delivery Photos',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({ name: 'name', title: 'Customer Name', type: 'string' }),
                defineField({ name: 'location', title: 'Customer Location', type: 'string' }),
                defineField({ name: 'quote', title: 'Testimonial Quote Text', type: 'text', rows: 3 }),
                defineField({ name: 'rating', title: 'Star Rating (1-5)', type: 'number' }),
                defineField({ name: 'image', title: 'Delivery Proof Photo', type: 'image', options: { hotspot: true } }),
                defineField({ name: 'caption', title: 'Photo Caption / Alt', type: 'string' }),
              ],
            },
          ],
        }),
      ],
    }),

    // N. FAQ Section
    defineField({
      name: 'faq',
      title: 'N. Frequently Asked Questions',
      type: 'object',
      fields: [
        defineField({ name: 'badge', title: 'Badge', type: 'string', initialValue: 'FAQ' }),
        defineField({ name: 'heading', title: 'Section Heading', type: 'string', initialValue: 'Frequently Asked Questions' }),
        defineField({ name: 'description', title: 'Section Subtitle', type: 'text', rows: 2, initialValue: 'Simple answers about cargo pickup, rates, personal belongings, and WhatsApp quotes.' }),
        defineField({
          name: 'items',
          title: 'FAQ Accordion Items',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({ name: 'question', title: 'Question', type: 'string' }),
                defineField({ name: 'answer', title: 'Answer', type: 'text', rows: 4 }),
              ],
            },
          ],
        }),
      ],
    }),

    // O. Final CTA
    defineField({
      name: 'finalCta',
      title: 'O. Final Bottom CTA Section',
      type: 'object',
      fields: [
        defineField({ name: 'eyebrow', title: 'Eyebrow Text', type: 'string', initialValue: 'Door-to-Door Delivery' }),
        defineField({ name: 'heading', title: 'Section Heading', type: 'string', initialValue: 'Ready to send cargo from Pakistan?' }),
        defineField({ name: 'description', title: 'Description Copy', type: 'text', rows: 2, initialValue: 'Get an instant quote online or message us on WhatsApp to discuss your cargo shipping requirements.' }),
        defineField({ name: 'primaryCtaLabel', title: 'Primary CTA Text', type: 'string', initialValue: 'GET A QUOTE' }),
        defineField({ name: 'primaryCtaHref', title: 'Primary CTA Link', type: 'string', initialValue: '/quote' }),
        defineField({ name: 'secondaryCtaLabel', title: 'Secondary CTA Text', type: 'string', initialValue: 'WHATSAPP US' }),
        defineField({ name: 'secondaryCtaHref', title: 'Secondary CTA Link', type: 'string', initialValue: 'https://wa.me/923001234567?text=Assalam%20o%20Alaikum%2C%20I%20want%20to%20send%20cargo%20from%20Pakistan.%20Please%20give%20me%20a%20quote.' }),
      ],
    }),

    // P. Mobile Bottom CTA
    defineField({
      name: 'mobileBottomCta',
      title: 'P. Mobile Sticky Bottom CTA Labels',
      type: 'object',
      fields: [
        defineField({ name: 'callLabel', title: 'Call Button Text', type: 'string', initialValue: 'Call Now' }),
        defineField({ name: 'whatsappLabel', title: 'WhatsApp Button Text', type: 'string', initialValue: 'WhatsApp' }),
        defineField({ name: 'quoteLabel', title: 'Quote Button Text', type: 'string', initialValue: 'Get Quote' }),
      ],
    }),
  ],
});
