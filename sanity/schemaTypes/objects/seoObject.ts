import { defineType, defineField } from 'sanity';

export const seoObject = defineType({
  name: 'seoObject',
  title: 'SEO Metadata',
  type: 'object',
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'socialImage',
      title: 'Social Share Image (OpenGraph)',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
});
