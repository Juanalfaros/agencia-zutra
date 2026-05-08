import { defineType, defineField } from 'sanity'

export const caseStudyType = defineType({
  name: 'caseStudy',
  title: 'Caso de Portfolio',
  type: 'document',
  groups: [
    { name: 'info', title: 'Información del proyecto', default: true },
    { name: 'content', title: 'Contenido & Narrativa' },
    { name: 'media', title: 'Imágenes & Galería' },
    { name: 'meta', title: 'Categorización' },
  ],
  fields: [
    defineField({ name: 'title', title: 'Nombre del proyecto', type: 'string', group: 'info', validation: (rule) => rule.required() }),
    defineField({ name: 'slug', title: 'Slug (URL)', type: 'slug', options: { source: 'title', maxLength: 96 }, group: 'info', validation: (rule) => rule.required() }),
    defineField({ name: 'subtitle', title: 'Subtítulo', type: 'string', group: 'info' }),
    defineField({ name: 'description', title: 'Descripción breve', type: 'text', group: 'info', validation: (rule) => rule.required() }),
    defineField({ name: 'client', title: 'Cliente', type: 'string', group: 'info' }),
    defineField({ name: 'date', title: 'Fecha del proyecto', type: 'date', group: 'info' }),
    defineField({ name: 'year', title: 'Año', type: 'string', group: 'info', validation: (rule) => rule.required() }),
    defineField({ name: 'industry', title: 'Industria / Sector', type: 'string', group: 'info', validation: (rule) => rule.required() }),
    defineField({ name: 'projectType', title: 'Tipo de proyecto', type: 'string', group: 'info' }),
    defineField({ name: 'role', title: 'Rol de Zutra', type: 'string', group: 'info' }),
    defineField({ name: 'context', title: 'Contexto', type: 'string', group: 'info' }),
    defineField({ name: 'websiteUrl', title: 'URL del sitio', type: 'url', group: 'info' }),

    defineField({ name: 'challenge', title: 'El Desafío', type: 'array', of: [{ type: 'block' }], group: 'content', validation: (rule) => rule.required() }),
    defineField({ name: 'solution', title: 'La Solución', type: 'array', of: [{ type: 'block' }], group: 'content', validation: (rule) => rule.required() }),
    defineField({
      name: 'process',
      title: 'Proceso (fases)',
      type: 'array',
      group: 'content',
      of: [
        defineField({
          name: 'phase',
          type: 'object',
          fields: [
            defineField({ name: 'name', title: 'Nombre de la fase', type: 'string' }),
            defineField({ name: 'duration', title: 'Duración', type: 'string' }),
            defineField({ name: 'highlights', title: 'Descripción', type: 'text' }),
            defineField({ name: 'deliverables', title: 'Entregables', type: 'array', of: [{ type: 'string' }] }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'keyFeatures',
      title: 'Características clave',
      type: 'array',
      group: 'content',
      of: [
        defineField({
          name: 'feature',
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Título', type: 'string' }),
            defineField({ name: 'description', title: 'Descripción', type: 'text' }),
            defineField({ name: 'icon', title: 'Icono (Phosphor)', type: 'string' }),
          ],
        }),
      ],
    }),

    defineField({ name: 'featuredImage', title: 'Imagen principal', type: 'image', options: { hotspot: true }, group: 'media',
      fields: [
        defineField({ name: 'alt', title: 'Texto alternativo', type: 'string' }),
        defineField({ name: 'caption', title: 'Pie de foto', type: 'string' }),
      ],
    }),
    defineField({
      name: 'gallery',
      title: 'Galería de imágenes',
      type: 'array',
      group: 'media',
      of: [{
        type: 'image',
        options: { hotspot: true },
        fields: [defineField({ name: 'alt', title: 'Texto alternativo', type: 'string' })],
      }],
    }),

    defineField({ name: 'techStack', title: 'Stack tecnológico', type: 'array', of: [{ type: 'string' }], group: 'meta' }),
    defineField({ name: 'tags', title: 'Etiquetas', type: 'array', of: [{ type: 'string' }], group: 'meta' }),
    defineField({ name: 'order', title: 'Orden', type: 'number', group: 'meta' }),
  ],
  preview: {
    select: { title: 'title', client: 'client', industry: 'industry', media: 'featuredImage' },
    prepare({ title, client, industry, media }) {
      return { title, subtitle: [client, industry].filter(Boolean).join(' · '), media }
    },
  },
})
