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
