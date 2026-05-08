import { defineType, defineField } from 'sanity'

export const authorType = defineType({
  name: 'author',
  title: 'Autor / Equipo',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre completo',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Cargo / Rol',
      type: 'string',
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
      name: 'bio',
      title: 'Biografía',
      type: 'text',
    }),
    defineField({
      name: 'social',
      title: 'Redes Sociales',
      type: 'object',
      fields: [
        defineField({ name: 'linkedin', title: 'LinkedIn', type: 'url' }),
        defineField({ name: 'twitter', title: 'Twitter', type: 'url' }),
        defineField({ name: 'instagram', title: 'Instagram', type: 'url' }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'avatar',
    },
  },
})
