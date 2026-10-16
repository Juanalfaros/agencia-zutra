export interface MethodStep {
  icon: string;
  title: string;
  time: string;
  text: string;
}

export const methodSteps: MethodStep[] = [
  {
    icon: 'ph-duotone ph-chats-circle',
    title: 'Diagnóstico',
    time: '30 min · gratis',
    text: 'Conversamos con quienes van a diseñar y programar tu proyecto. Entendemos tu negocio y te decimos con honestidad qué necesitas y qué no.',
  },
  {
    icon: 'ph-duotone ph-file-text',
    title: 'Propuesta',
    time: '48 horas',
    text: 'Recibes un alcance claro: qué incluye, qué no, plazos y valor. Sin letra chica.',
  },
  {
    icon: 'ph-duotone ph-pencil-ruler',
    title: 'Diseño y desarrollo',
    time: '2 a 6 semanas',
    text: 'Trabajamos por etapas con revisiones. Hablas directo con nosotros, sin intermediarios.',
  },
  {
    icon: 'ph-duotone ph-rocket-launch',
    title: 'Lanzamiento y acompañamiento',
    time: 'Después del lanzamiento',
    text: 'Publicamos, te enseñamos a usarlo y, si quieres, seguimos como tu equipo externo con Partner.',
  },
];
