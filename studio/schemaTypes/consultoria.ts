import {defineType, defineField} from 'sanity'
import {VariantPicker} from '../components/inputs/VariantPicker'
import {BulletsInput} from '../components/inputs/BulletsInput'

export const slideOptionType = defineType({
  name: 'slideOption',
  title: 'Opción de Propuesta',
  type: 'document',
  groups: [
    {name: 'info', title: 'Información'},
    {name: 'pricing', title: 'Precio & CTA'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Nombre de la opción',
      type: 'string',
      group: 'info',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'variant',
      title: 'Variante',
      type: 'string',
      group: 'info',
      options: {
        list: [
          {title: 'Básico', value: 'basic'},
          {title: 'Recomendado', value: 'recommended'},
          {title: 'Premium', value: 'premium'},
          {title: 'Personalizado', value: 'custom'},
        ],
      },
      components: {
        input: VariantPicker,
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'description',
      title: 'Descripción',
      type: 'array',
      of: [{type: 'block'}],
      group: 'info',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'recommended',
      title: '¿Opción recomendada?',
      type: 'boolean',
      group: 'info',
      initialValue: false,
    }),
    defineField({
      name: 'pros',
      title: 'Ventajas',
      type: 'array',
      of: [{type: 'string'}],
      group: 'info',
      components: {
        input: BulletsInput,
      },
    }),
    defineField({
      name: 'cons',
      title: 'Limitaciones',
      type: 'array',
      of: [{type: 'string'}],
      group: 'info',
      components: {
        input: BulletsInput,
      },
    }),
    defineField({name: 'price', title: 'Precio', type: 'string', group: 'pricing'}),
    defineField({name: 'ctaText', title: 'Texto del botón', type: 'string', group: 'pricing'}),
    defineField({name: 'ctaLink', title: 'URL del botón', type: 'string', group: 'pricing'}),
  ],
  preview: {
    select: {title: 'title', subtitle: 'variant'},
  },
})

export const consultoriaSlideType = defineType({
  name: 'consultoriaSlide',
  title: 'Diapositiva',
  type: 'document',
  groups: [
    {name: 'content', title: 'Contenido'},
    {name: 'media', title: 'Imagen & CTA'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Título de la diapositiva',
      type: 'string',
      group: 'content',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'type',
      title: 'Tipo',
      type: 'string',
      group: 'content',
      options: {
        list: [
          {title: 'Hallazgo', value: 'finding'},
          {title: 'Dato / Métrica', value: 'data'},
          {title: 'Recomendación', value: 'recommendation'},
          {title: 'Resumen ejecutivo', value: 'summary'},
          {title: 'Llamada a la acción (CTA)', value: 'cta'},
          {title: 'Opciones de propuesta', value: 'options'},
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'priority',
      title: 'Prioridad',
      type: 'string',
      group: 'content',
      options: {
        list: [
          {title: 'Urgente', value: 'urgent'},
          {title: 'Corto plazo', value: 'short-term'},
          {title: 'Mediano plazo', value: 'medium-term'},
        ],
      },
    }),
    defineField({name: 'highlight', title: 'Frase destacada', type: 'string', group: 'content'}),
    defineField({
      name: 'content',
      title: 'Contenido',
      type: 'array',
      of: [{type: 'block'}],
      group: 'content',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'bullets',
      title: 'Puntos clave (bullets)',
      type: 'array',
      of: [{type: 'string'}],
      group: 'content',
      components: {
        input: BulletsInput,
      },
    }),
    defineField({
      name: 'options',
      title: 'Opciones de propuesta',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'slideOption'}]}],
      group: 'content',
    }),
    defineField({
      name: 'image',
      title: 'Imagen',
      type: 'image',
      options: {hotspot: true},
      group: 'media',
    }),
    defineField({name: 'ctaText', title: 'Texto del botón', type: 'string', group: 'media'}),
    defineField({name: 'ctaLink', title: 'URL del botón', type: 'string', group: 'media'}),
    defineField({name: 'order', title: 'Orden', type: 'number', group: 'content'}),
  ],
  preview: {
    select: {title: 'title', subtitle: 'type'},
    prepare({title, subtitle}) {
      const typeMap: Record<string, string> = {
        finding: 'Hallazgo',
        data: 'Dato / Métrica',
        recommendation: 'Recomendación',
        summary: 'Resumen',
        cta: 'CTA',
        options: 'Opciones',
      }
      return {title, subtitle: typeMap[subtitle] || subtitle}
    },
  },
})

export const auditReportType = defineType({
  name: 'auditReport',
  title: 'Reporte de Auditoría',
  type: 'document',
  groups: [
    {name: 'meta', title: 'Información general', default: true},
    {name: 'content', title: 'Contenido del reporte'},
    {name: 'access', title: 'Acceso & Protección'},
  ],
  fields: [
    // Meta
    defineField({
      name: 'title',
      title: 'Título del reporte',
      type: 'string',
      group: 'meta',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      group: 'meta',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'client',
      title: 'Cliente',
      type: 'string',
      group: 'meta',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'clientWebsite',
      title: 'Sitio web del cliente',
      type: 'url',
      group: 'meta',
    }),
    defineField({
      name: 'analyst',
      title: 'Nombre del analista',
      type: 'string',
      group: 'meta',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'analystRef',
      title: 'Perfil del analista',
      type: 'reference',
      to: [{type: 'author'}],
      group: 'meta',
    }),
    defineField({
      name: 'date',
      title: 'Fecha del reporte',
      type: 'datetime',
      group: 'meta',
      validation: (r) => r.required(),
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'status',
      title: 'Estado',
      type: 'string',
      group: 'meta',
      options: {
        list: [
          {title: 'Borrador', value: 'draft'},
          {title: 'Publicado', value: 'published'},
          {title: 'Archivado', value: 'archived'},
        ],
      },
      initialValue: 'draft',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'category',
      title: 'Categoría',
      type: 'string',
      group: 'meta',
      options: {
        list: [
          {title: 'Auditoría Web', value: 'auditoria-web'},
          {title: 'SEO', value: 'seo'},
          {title: 'Performance', value: 'performance'},
          {title: 'Accesibilidad', value: 'accesibilidad'},
          {title: 'UX / Experiencia', value: 'ux'},
          {title: 'Estrategia Digital', value: 'estrategia'},
          {title: 'Cotización Comercial', value: 'cotizacion-comercial'},
        ],
      },
      initialValue: 'auditoria-web',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'description',
      title: 'Descripción breve',
      type: 'text',
      group: 'meta',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'headerImage',
      title: 'Imagen de portada',
      type: 'image',
      options: {hotspot: true},
      group: 'meta',
    }),

    // Content
    defineField({
      name: 'executiveSummary',
      title: 'Resumen ejecutivo',
      type: 'array',
      of: [{type: 'block'}],
      group: 'content',
    }),
    defineField({
      name: 'reportContent',
      title: 'Contenido modular del reporte',
      type: 'reportContentBlock',
      group: 'content',
    }),
    defineField({
      name: 'conclusion',
      title: 'Conclusión',
      type: 'array',
      of: [{type: 'block'}],
      group: 'content',
    }),
    defineField({
      name: 'slides',
      title: 'Diapositivas (presentación)',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'consultoriaSlide'}]}],
      group: 'content',
    }),
    defineField({
      name: 'presentationEnabled',
      title: 'Activar modo presentación',
      type: 'boolean',
      group: 'content',
      initialValue: true,
    }),

    // Access
    defineField({
      name: 'protected',
      title: 'Reporte protegido con contraseña',
      type: 'boolean',
      group: 'access',
      initialValue: false,
    }),
    defineField({
      name: 'accessExpiry',
      title: 'Fecha de expiración del acceso',
      type: 'datetime',
      group: 'access',
    }),
    defineField({
      name: 'allowedEmails',
      title: 'Emails con acceso',
      type: 'array',
      of: [{type: 'string'}],
      group: 'access',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      client: 'client',
      status: 'status',
      category: 'category',
      media: 'headerImage',
    },
    prepare({title, client, status, category, media}) {
      const s: Record<string, string> = {
        draft: 'Borrador',
        published: 'Publicado',
        archived: 'Archivado',
      }
      return {
        title,
        subtitle: `${client || '—'} · ${s[status as keyof typeof s] || ''} · ${category || ''}`,
        media,
      }
    },
  },
})
