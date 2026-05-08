import { defineType, defineField } from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Artículo de Blog',
  type: 'document',
  groups: [
    { name: 'content', title: 'Contenido', default: true },
    { name: 'meta', title: 'Meta & Categorización' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({ name: 'title', title: 'Título', type: 'string', group: 'content', validation: (rule) => rule.required() }),
    defineField({ name: 'slug', title: 'Slug (URL)', type: 'slug', options: { source: 'title', maxLength: 96 }, group: 'content', validation: (rule) => rule.required() }),
    defineField({ name: 'excerpt', title: 'Extracto', type: 'text', group: 'content', validation: (rule) => rule.required() }),
    defineField({
      name: 'content',
      title: 'Contenido',
      type: 'array',
      group: 'content',
      of: [{ type: 'block' }, { type: 'image', options: { hotspot: true } }],
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'featuredImage', title: 'Imagen destacada', type: 'image', options: { hotspot: true }, group: 'content' }),
    defineField({ name: 'publishDate', title: 'Fecha de publicación', type: 'datetime', group: 'meta', validation: (rule) => rule.required(), initialValue: () => new Date().toISOString() }),
    defineField({ name: 'updatedDate', title: 'Fecha de actualización', type: 'datetime', group: 'meta' }),
    defineField({ name: 'author', title: 'Autor', type: 'reference', to: [{ type: 'author' }], group: 'meta', validation: (rule) => rule.required() }),
    defineField({ name: 'category', title: 'Categoría', type: 'reference', to: [{ type: 'category' }], group: 'meta' }),
    defineField({ name: 'tags', title: 'Etiquetas', type: 'array', of: [{ type: 'string' }], group: 'meta' }),
    defineField({ name: 'featured', title: 'Artículo destacado', type: 'boolean', group: 'meta', initialValue: false }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      group: 'seo',
      fields: [
        defineField({ name: 'title', title: 'Título SEO', type: 'string' }),
        defineField({ name: 'description', title: 'Descripción SEO', type: 'text' }),
        defineField({ name: 'keywords', title: 'Palabras clave', type: 'array', of: [{ type: 'string' }] }),
      ],
    }),
  ],
  preview: {
    select: { title: 'title', author: 'author.name', media: 'featuredImage' },
    prepare({ title, author, media }) {
      return { title, subtitle: author ? `por ${author}` : '', media }
    },
  },
})
