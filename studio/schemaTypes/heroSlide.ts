import { defineType, defineField } from 'sanity'

export const heroSlideType = defineType({
  name: 'heroSlide',
  title: 'Slide de Portada (Hero)',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Título (acepta HTML como <span>)', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'subtitle', title: 'Subtítulo', type: 'text', validation: (rule) => rule.required() }),
    defineField({ name: 'image', title: 'Imagen del slide', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'imageAlt', title: 'Texto alternativo de la imagen', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'buttonText', title: 'Texto del botón', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'buttonLink', title: 'URL del botón', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'active', title: '¿Slide activo?', type: 'boolean', initialValue: true }),
    defineField({ name: 'order', title: 'Orden', type: 'number', validation: (rule) => rule.required() }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'order', media: 'image' },
    prepare({ title, subtitle, media }) {
      return { title, subtitle: subtitle !== undefined ? `Posición ${subtitle}` : '', media }
    },
  },
})
