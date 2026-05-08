export interface CTA {
  id: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  variant?: 'primary' | 'secondary' | 'accent';
}

export const globalCTAs: Record<string, CTA> = {
  audit: {
    id: 'audit',
    title: '¿Tu web está perdiendo dinero?',
    description:
      'Agenda una auditoría gratuita de 15 minutos. Sin ventas agresivas, solo análisis técnico honesto.',
    buttonText: 'Agendar Auditoría Gratis',
    buttonLink: '/#contacto',
    variant: 'accent',
  },
  sprint: {
    id: 'sprint',
    title: 'Inyecta leads en 30 días',
    description:
      'Lanzamos tu oferta con una landing optimizada y pauta precisa. Sin vueltas, solo ejecución.',
    buttonText: 'Ver Sprint de Leads',
    buttonLink: '/servicios/sprint-leads',
    variant: 'primary',
  },
  partner: {
    id: 'partner',
    title: 'Deja de sufrir con tu web',
    description:
      'Convierte a Zutra en tu departamento digital externo. Soporte, diseño y paz mental mes a mes.',
    buttonText: 'Ser Partner Digital',
    buttonLink: '/#contacto',
    variant: 'secondary',
  },
  geo_ready: {
    id: 'geo_ready',
    title: '¿Tu marca es invisible para la IA?',
    description:
      'Si no estás en el RAG, no existes. Preparamos tu arquitectura de datos para que seas la fuente que ChatGPT y Gemini recomiendan hoy.',
    buttonText: 'Zútrame el negocio',
    buttonLink: '/servicios/geo-optimization',
    variant: 'accent',
  },
};
