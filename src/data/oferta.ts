export interface OfertaNucleo {
  title: string;
  tagline: string;
  items: string[];
  href: string;
  cta: string;
  featured?: boolean;
}

export interface Complemento {
  title: string;
  href: string;
}

export const ofertaNucleo: OfertaNucleo[] = [
  {
    title: 'Marca',
    tagline: 'Que te reconozcan y te recuerden.',
    items: [
      'Logo y sus variaciones',
      'Paleta y tipografías',
      'Manual de marca para usarla sin errores',
    ],
    href: '/servicios/marca',
    cta: 'Ver Marca',
  },
  {
    title: 'Web',
    tagline: 'Un sitio rápido que tu equipo puede editar.',
    items: [
      'Landing, sitio corporativo o tienda online',
      'Diseño a medida, sin plantillas',
      'Posicionamiento en buscadores incluido',
    ],
    href: '/servicios/web',
    cta: 'Ver Web',
  },
  {
    title: 'Marca + Web',
    tagline: 'Identidad completa y sitio en un solo proyecto.',
    items: [
      'Un solo equipo de principio a fin',
      'Marca y sitio pensados juntos',
      'Una sola conversación, un solo plazo',
    ],
    href: '/servicios/marca-web',
    cta: 'Ver Marca + Web',
    featured: true,
  },
];

export const complementos: Complemento[] = [
  { title: 'Kit para redes', href: '/servicios/kits-redes-sociales' },
  {
    title: 'Presentaciones',
    href: '/servicios/diseno-presentaciones-pitch-decks',
  },
  { title: 'Email en HTML', href: '/servicios/email-marketing-newsletters' },
];

export const partner = {
  title: 'Partner',
  text: 'Después del lanzamiento: mantención, hosting y horas mensuales de diseño y código.',
  href: '/servicios/partner',
};
