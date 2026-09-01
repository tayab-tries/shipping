import { defineType, defineField } from 'sanity';

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'businessName',
      title: 'Business Name',
      type: 'string',
      initialValue: 'Raahi International',
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Business Summary',
      type: 'text',
      rows: 2,
      initialValue: 'Door-to-door cargo delivery by air and sea from Pakistan worldwide.',
    }),
    defineField({
      name: 'phone',
      title: 'Primary Phone Number',
      type: 'string',
      initialValue: '+92 300 1234567',
    }),
    defineField({
      name: 'whatsappNumber',
      title: 'WhatsApp Number',
      type: 'string',
      initialValue: '+92 300 1234567',
    }),
    defineField({
      name: 'email',
      title: 'Support Email Address',
      type: 'string',
      initialValue: 'info@raahiinternational.pk',
    }),
    defineField({
      name: 'address',
      title: 'Physical Address / Headquarters',
      type: 'text',
      rows: 3,
      initialValue: 'Lahore Hub, Pakistan',
    }),
    defineField({
      name: 'operatingHours',
      title: 'Operating Hours',
      type: 'string',
      initialValue: '24/7 Operations & Customer Support',
    }),
    // Header Settings
    defineField({
      name: 'logo',
      title: 'Header Logo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'logoDark',
      title: 'Header Logo (Dark Version)',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'logoLight',
      title: 'Header Logo (Light Version)',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'navigationItems',
      title: 'Header Navigation Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'string' }),
            defineField({ name: 'href', title: 'URL Path', type: 'string' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'primaryCta',
      title: 'Header Primary CTA Button',
      type: 'ctaObject',
    }),
    // Footer Settings
    defineField({
      name: 'footerDescription',
      title: 'Footer Summary Copy',
      type: 'text',
      rows: 3,
      initialValue:
        'International cargo delivery provider providing reliable air cargo, ocean sea cargo, and door-to-door shipping services connecting Pakistan worldwide.',
    }),
    defineField({
      name: 'footerGroups',
      title: 'Footer Navigation Columns',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Column Title', type: 'string' }),
            defineField({
              name: 'links',
              title: 'Links',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({ name: 'label', title: 'Label', type: 'string' }),
                    defineField({ name: 'href', title: 'URL Path', type: 'string' }),
                  ],
                },
              ],
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'copyrightText',
      title: 'Footer Copyright Text',
      type: 'string',
      initialValue: 'All rights reserved.',
    }),
    // Default SEO Settings
    defineField({
      name: 'defaultMetaTitle',
      title: 'Default SEO Title',
      type: 'string',
      initialValue: 'Raahi International — Door-to-Door Cargo Shipping From Pakistan',
    }),
    defineField({
      name: 'defaultMetaDescription',
      title: 'Default SEO Meta Description',
      type: 'text',
      rows: 3,
      initialValue:
        'Door-to-door cargo shipping services from Pakistan worldwide by air and sea freight. Home pickup, customs clearance, and global delivery.',
    }),
    defineField({
      name: 'defaultSocialImage',
      title: 'Default Social Share Image',
      type: 'image',
      options: { hotspot: true },
    }),
    // Social Links
    defineField({
      name: 'socialLinks',
      title: 'Social Media Profiles',
      type: 'object',
      fields: [
        defineField({ name: 'facebook', title: 'Facebook URL', type: 'url' }),
        defineField({ name: 'instagram', title: 'Instagram URL', type: 'url' }),
        defineField({ name: 'linkedin', title: 'LinkedIn URL', type: 'url' }),
        defineField({ name: 'tiktok', title: 'TikTok URL', type: 'url' }),
      ],
    }),
  ],
});
