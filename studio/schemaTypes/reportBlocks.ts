import { defineType, defineField } from 'sanity'
import { PhosphorIconPicker } from '../components/inputs/PhosphorIconPicker'

export const findingBlockType = defineType({
  name: 'findingBlock',
  title: 'Finding Card',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'type',
      title: 'Criticality Level',
      type: 'string',
      options: { list: ['critical', 'warning', 'opportunity'] },
      initialValue: 'opportunity',
      validation: (r) => r.required(),
    }),
    defineField({ name: 'description', title: 'Description', type: 'text', validation: (r) => r.required() }),
  ],
  preview: { select: { title: 'title', subtitle: 'type' } }
})

export const metricBlockType = defineType({
  name: 'metricBlock',
  title: 'Metric Highlight',
  type: 'object',
  fields: [
    defineField({ name: 'internalTitle', title: 'Internal Title', type: 'string' }),
    defineField({ name: 'value', title: 'Value (e.g. 85%)', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'label', title: 'Main Label', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'sublabel', title: 'Secondary Label', type: 'string' }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: { list: ['critical', 'good', 'warning', 'opportunity'] },
      initialValue: 'good',
    }),
  ],
  preview: { select: { title: 'label', subtitle: 'value' } }
})

export const ctaBlockType = defineType({
  name: 'ctaBlock',
  title: 'Call to Action',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'description', title: 'Description', type: 'text', validation: (r) => r.required() }),
    defineField({ name: 'buttonText', title: 'Button Text', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'buttonLink', title: 'Button Link', type: 'url', validation: (r) => r.required() }),
  ],
})

export const barChartBlockType = defineType({
  name: 'barChartBlock',
  title: 'Bar Chart',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'Chart Title', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [
        defineField({
          name: 'item',
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'string' }),
            defineField({ name: 'value', title: 'Value Display (e.g. 95/100)', type: 'string' }),
            defineField({ name: 'percentage', title: 'Percentage (0-100)', type: 'number' }),
            defineField({ name: 'highlight', title: 'Highlight', type: 'boolean', initialValue: false }),
          ]
        })
      ]
    }),
  ],
})

export const vitalsTableBlockType = defineType({
  name: 'vitalsTableBlock',
  title: 'Core Web Vitals Table',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'Title (Device)', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'rows',
      title: 'Rows',
      type: 'array',
      of: [
        defineField({
          name: 'row',
          type: 'object',
          fields: [
            defineField({ name: 'metric', title: 'Metric (e.g. LCP)', type: 'string' }),
            defineField({ name: 'value', title: 'Value', type: 'string' }),
            defineField({ name: 'threshold', title: 'Threshold', type: 'string' }),
            defineField({ name: 'status', title: 'Status', type: 'string', options: { list: ['good', 'needs-improvement', 'poor'] } }),
          ]
        })
      ]
    }),
  ],
})

export const scoreGridBlockType = defineType({
  name: 'scoreGridBlock',
  title: 'Score Grid (Gauges)',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'Section Title', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'scores',
      title: 'Scores',
      type: 'array',
      of: [
        defineField({
          name: 'score',
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'string' }),
            defineField({ name: 'value', title: 'Value (0-100)', type: 'number' }),
          ]
        })
      ]
    }),
  ],
})

export const stackTableBlockType = defineType({
  name: 'stackTableBlock',
  title: 'Tech Stack Table',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'rows',
      title: 'Rows',
      type: 'array',
      of: [
        defineField({
          name: 'row',
          type: 'object',
          fields: [
            defineField({ name: 'component', title: 'Component', type: 'string' }),
            defineField({ name: 'installed', title: 'Installed Version', type: 'string' }),
            defineField({ name: 'current', title: 'Current Version', type: 'string' }),
            defineField({ name: 'gap', title: 'Gap', type: 'string' }),
            defineField({ name: 'status', title: 'Status', type: 'string', options: { list: ['good', 'warning', 'critical'] } }),
          ]
        })
      ]
    }),
  ],
})

export const priorityBlockType = defineType({
  name: 'priorityBlock',
  title: 'Priority List',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'level',
      title: 'Urgency Level',
      type: 'string',
      options: { list: ['urgent', 'short', 'medium'] },
      initialValue: 'urgent',
      validation: (r) => r.required()
    }),
    defineField({
      name: 'items',
      title: 'Task List',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
})

export const optionsGridBlockType = defineType({
  name: 'optionsGridBlock',
  title: 'Options Comparison Grid',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'options',
      title: 'Options',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'variant', title: 'Variant Label', type: 'string' }),
          defineField({ name: 'title', title: 'Title', type: 'string' }),
          defineField({ name: 'icon', title: 'Ícono (Phosphor)', type: 'string', components: { input: PhosphorIconPicker } }),
          defineField({ name: 'description', title: 'Description', type: 'array', of: [{ type: 'block' }] }),
          defineField({ name: 'recommended', title: 'Recommended', type: 'boolean', initialValue: false }),
          defineField({ name: 'pros', title: 'Pros', type: 'array', of: [{ type: 'string' }] }),
          defineField({ name: 'cons', title: 'Cons', type: 'array', of: [{ type: 'string' }] }),
          defineField({ name: 'price', title: 'Price', type: 'string' }),
          defineField({ name: 'ctaText', title: 'CTA Text', type: 'string' }),
          defineField({ name: 'ctaLink', title: 'CTA Link', type: 'string' }),
        ]
      }],
    }),
  ],
})

export const competitorTableBlockType = defineType({
  name: 'competitorTableBlock',
  title: 'Tabla de Análisis Competitivo',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'Título', type: 'string' }),
    defineField({ name: 'highlight', title: 'Nombre de la empresa del cliente (para resaltar)', type: 'string' }),
    defineField({
      name: 'rows',
      title: 'Competidores',
      type: 'array',
      of: [
        defineField({
          name: 'row',
          type: 'object',
          fields: [
            defineField({ name: 'rank', title: 'Posición (#)', type: 'number', validation: (r) => r.required() }),
            defineField({ name: 'name', title: 'Nombre de la empresa', type: 'string', validation: (r) => r.required() }),
            defineField({ name: 'domain', title: 'Dominio (ej: empresa.cl)', type: 'string', validation: (r) => r.required() }),
            defineField({ name: 'differentiator', title: 'Diferenciador / Mensaje', type: 'text', validation: (r) => r.required() }),
            defineField({ name: 'hasPaid', title: 'Tiene Ads activos', type: 'boolean', initialValue: false }),
          ],
          preview: {
            select: { rank: 'rank', name: 'name', domain: 'domain' },
            prepare({ rank, name, domain }) {
              return { title: `#${rank} ${name}`, subtitle: domain }
            }
          }
        })
      ]
    }),
  ],
  preview: { select: { title: 'title' } }
})

export const reportContentBlockType = defineType({
  name: 'reportContentBlock',
  title: 'Report Content',
  type: 'array',
  of: [
    { type: 'block' },
    { type: 'image' },
    { type: 'findingBlock' },
    { type: 'metricBlock' },
    { type: 'ctaBlock' },
    { type: 'barChartBlock' },
    { type: 'vitalsTableBlock' },
    { type: 'scoreGridBlock' },
    { type: 'stackTableBlock' },
    { type: 'priorityBlock' },
    { type: 'optionsGridBlock' },
    { type: 'competitorTableBlock' },
  ],
})
