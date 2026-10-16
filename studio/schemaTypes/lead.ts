import { defineType, defineField } from 'sanity'

// Leads que llegan desde el formulario de contacto y el bot (los crea el sitio, no el Studio).
export const leadType = defineType({
  name: 'lead',
  title: 'Lead',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Nombre', type: 'string', readOnly: true }),
    defineField({ name: 'email', title: 'Correo', type: 'string', readOnly: true }),
    defineField({ name: 'phone', title: 'Teléfono / WhatsApp', type: 'string', readOnly: true }),
    defineField({ name: 'service', title: 'Interés', type: 'string', readOnly: true }),
    defineField({ name: 'timeline', title: 'Plazo deseado', type: 'string', readOnly: true }),
    defineField({ name: 'budget', title: 'Presupuesto', type: 'string', readOnly: true }),
    defineField({ name: 'message', title: 'Mensaje', type: 'text', rows: 5, readOnly: true }),
    defineField({
      name: 'source',
      title: 'Origen',
      type: 'string',
      readOnly: true,
      options: { list: ['formulario', 'bot'] },
    }),
    defineField({
      name: 'status',
      title: 'Estado',
      type: 'string',
      initialValue: 'nuevo',
      options: {
        list: [
          { title: 'Nuevo', value: 'nuevo' },
          { title: 'Contactado', value: 'contactado' },
          { title: 'Diagnóstico agendado', value: 'diagnostico' },
          { title: 'Propuesta enviada', value: 'propuesta' },
          { title: 'Cerrado — ganado', value: 'ganado' },
          { title: 'Cerrado — perdido', value: 'perdido' },
        ],
        layout: 'radio',
      },
    }),
    defineField({ name: 'notes', title: 'Notas internas', type: 'text', rows: 4 }),
    defineField({ name: 'receivedAt', title: 'Recibido', type: 'datetime', readOnly: true }),
  ],
  orderings: [
    { title: 'Más recientes', name: 'receivedDesc', by: [{ field: 'receivedAt', direction: 'desc' }] },
  ],
  preview: {
    select: { title: 'name', service: 'service', status: 'status', date: 'receivedAt' },
    prepare({ title, service, status, date }) {
      const d = date ? new Date(date).toLocaleDateString('es-CL') : ''
      return { title, subtitle: [status, service, d].filter(Boolean).join(' · ') }
    },
  },
})
