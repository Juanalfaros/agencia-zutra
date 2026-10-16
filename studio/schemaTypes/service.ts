import { defineType, defineField } from 'sanity'

export const serviceType = defineType({
  name: 'service',
  title: 'Servicio',
  type: 'document',
  groups: [
    { name: 'info', title: 'Información general', default: true },
    { name: 'content', title: 'Contenido' },
    { name: 'pricing', title: 'Precio & Entregables' },
    { name: 'meta', title: 'Categorización' },
  ],
  fields: [
    defineField({ name: 'title', title: 'Nombre del servicio', type: 'string', group: 'info', validation: (rule) => rule.required() }),
    defineField({ name: 'slug', title: 'Slug (URL)', type: 'slug', options: { source: 'title', maxLength: 96 }, group: 'info', validation: (rule) => rule.required() }),
    defineField({ name: 'badge', title: 'Etiqueta / Badge', type: 'string', group: 'info' }),
    defineField({ name: 'icon', title: 'Icono (nombre Phosphor)', type: 'string', group: 'info' }),
    defineField({ name: 'featuredImage', title: 'Imagen destacada', type: 'image', options: { hotspot: true }, group: 'info' }),
    defineField({ name: 'excerpt', title: 'Descripción corta', type: 'text', group: 'info', validation: (rule) => rule.required() }),

    defineField({ name: 'description', title: 'Descripción completa', type: 'array', of: [{ type: 'block' }], group: 'content', validation: (rule) => rule.required() }),
    defineField({ name: 'longDescription', title: 'Descripción extendida', type: 'array', of: [{ type: 'block' }], group: 'content' }),
    defineField({
      name: 'details',
      title: 'Detalles del servicio',
      type: 'array',
      group: 'content',
      of: [
        defineField({
          name: 'detail',
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Título', type: 'string' }),
            defineField({ name: 'description', title: 'Descripción', type: 'text' }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'features',
      title: 'Características del servicio',
      type: 'array',
      group: 'content',
      of: [
        defineField({
          name: 'feature',
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Título', type: 'string' }),
            defineField({ name: 'description', title: 'Descripción', type: 'text' }),
          ],
        }),
      ],
    }),
    defineField({ name: 'problem', title: 'El problema (en palabras del cliente)', type: 'text', group: 'content' }),
    defineField({
      name: 'variants',
      title: 'Variantes (ej: Landing, Corporativa, Tienda)',
      type: 'array',
      group: 'content',
      of: [
        defineField({
          name: 'variant',
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Nombre', type: 'string' }),
            defineField({ name: 'text', title: 'Para quién y para qué', type: 'text' }),
            defineField({ name: 'items', title: 'Incluye', type: 'array', of: [{ type: 'string' }] }),
          ],
        }),
      ],
    }),
    defineField({ name: 'notIncluded', title: 'Qué no incluye', type: 'array', of: [{ type: 'string' }], group: 'content' }),
    defineField({
      name: 'process',
      title: 'Proceso y plazos',
      type: 'array',
      group: 'content',
      of: [
        defineField({
          name: 'step',
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Paso', type: 'string' }),
            defineField({ name: 'time', title: 'Duración', type: 'string' }),
            defineField({ name: 'text', title: 'Descripción', type: 'text' }),
          ],
        }),
      ],
    }),
    defineField({ name: 'needs', title: 'Qué necesitamos de ti', type: 'array', of: [{ type: 'string' }], group: 'content' }),
    defineField({
      name: 'faqs',
      title: 'Preguntas frecuentes del servicio',
      type: 'array',
      group: 'content',
      of: [
        defineField({
          name: 'faq',
          type: 'object',
          fields: [
            defineField({ name: 'question', title: 'Pregunta', type: 'string' }),
            defineField({ name: 'answer', title: 'Respuesta', type: 'text' }),
          ],
        }),
      ],
    }),
    defineField({ name: 'relatedCases', title: 'Casos relacionados', type: 'array', of: [{ type: 'reference', to: [{ type: 'caseStudy' }] }], group: 'content' }),
    defineField({ name: 'benefits', title: 'Beneficios', type: 'array', of: [{ type: 'string' }], group: 'content' }),
    defineField({ name: 'result', title: 'Resultado / Outcome', type: 'string', group: 'content' }),

    defineField({ name: 'price', title: 'Precio (texto)', type: 'string', group: 'pricing' }),
    defineField({ name: 'priceAmount', title: 'Precio (número)', type: 'number', group: 'pricing' }),
    defineField({ name: 'priceMeta', title: 'Unidad de precio (ej: /mes, /proyecto)', type: 'string', group: 'pricing' }),
    defineField({ name: 'duration', title: 'Duración / Periodicidad', type: 'string', group: 'pricing' }),
    defineField({ name: 'deliverables', title: 'Entregables', type: 'array', of: [{ type: 'string' }], group: 'pricing' }),

    defineField({ name: 'category', title: 'Categoría', type: 'reference', to: [{ type: 'category' }], group: 'meta', validation: (rule) => rule.required() }),
    defineField({ name: 'tags', title: 'Etiquetas', type: 'array', of: [{ type: 'string' }], group: 'meta' }),
    defineField({ name: 'featured', title: '¿Servicio destacado?', type: 'boolean', group: 'meta', initialValue: false }),
    defineField({ name: 'order', title: 'Orden', type: 'number', group: 'meta' }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'category.title', price: 'price', media: 'featuredImage' },
    prepare({ title, subtitle, price, media }) {
      return { title, subtitle: [subtitle, price].filter(Boolean).join(' · '), media }
    },
  },
})
