import { defineType, defineField } from 'sanity'

export const testimonialType = defineType({
  name: 'testimonial',
  title: 'Testimonio',
  type: 'document',
  fields: [
    defineField({
      name: 'author',
      title: 'Autor',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Cargo / Rol',
      type: 'string',
    }),
    defineField({
      name: 'company',
      title: 'Empresa',
      type: 'string',
    }),
    defineField({
      name: 'quote',
      title: 'Testimonio',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'avatar',
      title: 'Foto de perfil',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'featured',
      title: '¿Destacado?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Orden',
      type: 'number',
      initialValue: 99,
    }),
  ],
  preview: {
    select: {
      title: 'author',
      subtitle: 'company',
      media: 'avatar',
    },
  },
})
