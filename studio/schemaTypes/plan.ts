import {defineField, defineType} from 'sanity'
import {Star} from '@phosphor-icons/react'
import React from 'react'

export const planType = defineType({
  name: 'plan',
  title: 'Plan de Precios',
  type: 'document',
  groups: [
    {name: 'card', title: 'Tarjeta', default: true},
    {name: 'display', title: 'Visual'},
    {name: 'comparison', title: 'Comparativa'},
    {name: 'contact', title: 'Formulario de Contacto'},
  ],
  fields: [
    // ── Tarjeta ──────────────────────────────────────────────────
    defineField({
      name: 'title',
      title: 'Nombre del plan',
      type: 'string',
      group: 'card',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'planId',
      title: 'ID interno (ej: sprint)',
      type: 'slug',
      group: 'card',
      options: {source: 'title', maxLength: 32},
      validation: (r) => r.required(),
      description: 'Identificador único. Se usa en analytics y como ancla del CTA.',
    }),
    defineField({
      name: 'meta',
      title: 'Meta (subtítulo bajo el nombre)',
      type: 'string',
      group: 'card',
    }),
    defineField({
      name: 'price',
      title: 'Precio (ej: $250.000)',
      type: 'string',
      group: 'card',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'priceMeta',
      title: 'Unidad de precio (ej: / mes)',
      type: 'string',
      group: 'card',
    }),
    defineField({
      name: 'features',
      title: 'Características incluidas',
      type: 'array',
      of: [{type: 'string'}],
      group: 'card',
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: 'ctaText',
      title: 'Texto del botón',
      type: 'string',
      group: 'card',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'recommended',
      title: '¿Plan recomendado?',
      type: 'boolean',
      group: 'display',
      initialValue: false,
    }),
    defineField({
      name: 'badgeLabel',
      title: 'Etiqueta del badge (si es recomendado)',
      type: 'string',
      group: 'display',
    }),
    defineField({
      name: 'stockAlert',
      title: 'Aviso de cupos limitados',
      type: 'string',
      group: 'display',
      description: 'Ej: Solo 3 cupos mensuales. Vacío para ocultar.',
    }),
    defineField({
      name: 'order',
      title: 'Orden de visualización',
      type: 'number',
      group: 'display',
      initialValue: 0,
    }),
    defineField({
      name: 'contactService',
      title: 'Servicio pre-seleccionado en el formulario',
      type: 'string',
      group: 'contact',
      description: 'Debe coincidir exactamente con una opción del selector de servicio en el formulario de contacto.',
    }),
    defineField({
      name: 'contactMessage',
      title: 'Mensaje pre-llenado en el formulario',
      type: 'text',
      rows: 3,
      group: 'contact',
      description: 'Mensaje que aparece automáticamente al hacer clic en el botón de este plan.',
    }),

    // ── Comparativa ──────────────────────────────────────────────
    defineField({
      name: 'comparisonSubtitle',
      title: 'Subtítulo en la tabla (ej: Caza)',
      type: 'string',
      group: 'comparison',
      description: 'Aparece bajo el nombre del plan en el encabezado de la tabla.',
    }),
    defineField({
      name: 'comparisonRows',
      title: 'Filas de comparativa',
      type: 'array',
      group: 'comparison',
      description: 'Cada fila es una característica con el valor que ofrece este plan.',
      of: [
        {
          type: 'object',
          name: 'comparisonRow',
          fields: [
            defineField({name: 'label', title: 'Característica', type: 'string', validation: (r) => r.required()}),
            defineField({name: 'value', title: 'Valor para este plan', type: 'string'}),
          ],
          preview: {
            select: {title: 'label', subtitle: 'value'},
            prepare({title, subtitle}: {title: string; subtitle: string}) {
              return {title, subtitle}
            },
          },
        },
      ],
    }),
  ],
  orderings: [
    {title: 'Orden de visualización', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]},
  ],
  preview: {
    select: {title: 'title', subtitle: 'price', recommended: 'recommended'},
    prepare({title, subtitle, recommended}: {title: string; subtitle: string; recommended: boolean}) {
      return {
        title,
        subtitle,
        media: recommended
          ? React.createElement(Star, {size: 18, weight: 'fill', color: '#f59e0b'})
          : undefined,
      }
    },
  },
})
