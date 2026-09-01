import { defineType, defineField } from 'sanity';

export const homepageType = defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Main Homepage',
      readOnly: true,
    }),
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        defineField({
          name: 'eyebrow',
          title: 'Eyebrow Badge Text',
          type: 'string',
          initialValue: 'DOOR-TO-DOOR CARGO SHIPPING FROM PAKISTAN',
        }),
        defineField({
          name: 'headline',
          title: 'Primary Headline',
          type: 'string',
          initialValue: 'SEND CARGO FROM PAKISTAN.',
        }),
        defineField({
          name: 'highlightedHeadline',
          title: 'Highlighted Sub-Headline',
          type: 'string',
          initialValue: "WE'LL HANDLE THE REST.",
        }),
        defineField({
          name: 'description',
          title: 'Supporting Description Copy',
          type: 'text',
          rows: 3,
          initialValue: 'Door-to-door cargo delivery by air and sea. We pick up from Pakistan and deliver to destinations worldwide.',
        }),
        defineField({
          name: 'primaryCtaLabel',
          title: 'Primary CTA Button Label',
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
          title: 'Secondary CTA Button Label',
          type: 'string',
          initialValue: 'WHATSAPP US',
        }),
        defineField({
          name: 'secondaryCtaHref',
          title: 'Secondary CTA Link Destination',
          type: 'string',
          initialValue: 'https://wa.me/923001234567?text=Assalam%20o%20Alaikum%2C%20I%20want%20to%20send%20cargo%20from%20Pakistan.%20Please%20give%20me%20a%20quote.',
        }),
        defineField({
          name: 'backgroundImage',
          title: 'Background Hero Image',
          type: 'image',
          options: { hotspot: true },
        }),
        defineField({
          name: 'backgroundImageAlt',
          title: 'Background Image Alt Text',
          type: 'string',
          initialValue: 'Air and sea cargo shipping from Pakistan',
        }),
      ],
    }),
  ],
});
