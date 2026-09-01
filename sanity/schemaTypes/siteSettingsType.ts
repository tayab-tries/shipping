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
      name: 'legalName',
      title: 'Legal Business Name',
      type: 'string',
      initialValue: 'Raahi International Cargo & Freight Services',
    }),
    defineField({
      name: 'logo',
      title: 'Default Logo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'logoDark',
      title: 'Dark Mode Logo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'logoLight',
      title: 'Light Mode Logo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
    }),
    defineField({
      name: 'whatsapp',
      title: 'WhatsApp Number',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Support Email Address',
      type: 'string',
    }),
    defineField({
      name: 'address',
      title: 'Physical Address',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'operatingHours',
      title: 'Operating Hours',
      type: 'string',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'platform', title: 'Platform Name', type: 'string' }),
            defineField({ name: 'url', title: 'URL', type: 'url' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'defaultSeoTitle',
      title: 'Default SEO Title',
      type: 'string',
      initialValue: 'Raahi International — Door-to-Door Cargo Shipping From Pakistan',
    }),
    defineField({
      name: 'defaultSeoDescription',
      title: 'Default SEO Meta Description',
      type: 'text',
      rows: 3,
      initialValue: 'Door-to-door cargo shipping services from Pakistan worldwide by air and sea freight.',
    }),
    defineField({
      name: 'defaultOgImage',
      title: 'Default OpenGraph Image',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
});
