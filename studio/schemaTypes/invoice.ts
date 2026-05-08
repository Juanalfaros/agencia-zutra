import {defineField, defineType} from 'sanity'
import {Receipt, CheckCircle, Clock, FileText} from '@phosphor-icons/react'
import React from 'react'

export const invoiceType = defineType({
  name: 'invoice',
  title: 'Factura',
  type: 'document',
  icon: () => React.createElement(Receipt, {size: 18, weight: 'duotone'}),
  fields: [
    defineField({
      name: 'invoiceNumber',
      title: 'Número de Factura',
      type: 'string',
      description: 'Ejemplo: 2026-001',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Descripción',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'date',
      title: 'Fecha',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'issuedDate',
      title: 'Fecha de Emisión',
      type: 'date',
    }),
    defineField({
      name: 'paidDate',
      title: 'Fecha de Pago',
      type: 'date',
    }),
    defineField({
      name: 'status',
      title: 'Estado',
      type: 'string',
      options: {
        list: [
          {title: 'Borrador', value: 'draft'},
          {title: 'Pendiente', value: 'pending'},
          {title: 'Pagada', value: 'paid'},
        ],
      },
      initialValue: 'pending',
    }),
    defineField({
      name: 'client',
      title: 'Cliente',
      type: 'object',
      fields: [
        defineField({name: 'name', title: 'Nombre', type: 'string'}),
        defineField({name: 'attn', title: 'Atención a', type: 'string'}),
        defineField({name: 'city', title: 'Ciudad', type: 'string'}),
        defineField({name: 'country', title: 'País', type: 'string'}),
      ],
    }),
    defineField({
      name: 'project',
      title: 'Proyecto',
      type: 'object',
      fields: [
        defineField({name: 'title', title: 'Título del Proyecto', type: 'string'}),
        defineField({name: 'description', title: 'Descripción del Proyecto', type: 'text', rows: 2}),
      ],
    }),
    defineField({
      name: 'phase',
      title: 'Fase',
      type: 'string',
    }),
    defineField({
      name: 'items',
      title: 'Ítems',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'title', title: 'Título', type: 'string'}),
            defineField({name: 'description', title: 'Descripción', type: 'string'}),
            defineField({name: 'netPrice', title: 'Precio Neto', type: 'number'}),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'netPrice',
            },
            prepare({title, subtitle}) {
              return {
                title,
                subtitle: subtitle ? `$${subtitle}` : '',
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'futureProjections',
      title: 'Proyecciones Futuras',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'phase', title: 'Fase', type: 'string'}),
            defineField({name: 'estimatedTotal', title: 'Total Estimado', type: 'number'}),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'invoiceNumber',
      subtitle: 'title',
      status: 'status',
    },
    prepare({title, subtitle, status}) {
      const icon =
        status === 'paid'
          ? React.createElement(CheckCircle, {size: 18, weight: 'fill', color: '#4ade80'})
          : status === 'pending'
            ? React.createElement(Clock, {size: 18, weight: 'fill', color: '#facc15'})
            : React.createElement(FileText, {size: 18, weight: 'fill', color: '#94a3b8'})
      return {title, subtitle, media: icon}
    },
  },
})
