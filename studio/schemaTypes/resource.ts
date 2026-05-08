import { defineType, defineField } from 'sanity'

export const resourceType = defineType({
  name: 'resource',
  title: 'Digital Resource',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Short Description (excerpt)',
      type: 'text',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'longDescription',
      title: 'Full Description',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Template', value: 'template' },
          { title: 'UI Kit', value: 'ui-kit' },
          { title: 'Auditoría', value: 'auditoria' },
          { title: 'Guía', value: 'guia' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'gallery',
      title: 'Image Gallery',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'demoUrl',
      title: 'Demo URL',
      type: 'url',
    }),
    defineField({
      name: 'gumroadUrl',
      title: 'Gumroad URL',
      type: 'url',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Price (e.g. $49 USD)',
      type: 'string',
    }),
    defineField({
      name: 'isFree',
      title: 'Is Free?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'techStack',
      title: 'Tech Stack',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'features',
      title: 'Features / What is included',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'featured',
      title: 'Featured Resource',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Published', value: 'published' },
          { title: 'Coming Soon', value: 'coming-soon' },
        ],
      },
      initialValue: 'published',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'featuredImage',
    },
  },
})
