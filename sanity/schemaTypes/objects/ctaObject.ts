import { defineType, defineField } from 'sanity';

export const ctaObject = defineType({
  name: 'ctaObject',
  title: 'Call to Action / Link',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Button / Link Text',
      type: 'string',
    }),
    defineField({
      name: 'href',
      title: 'Destination URL / Path',
      type: 'string',
    }),
  ],
});
