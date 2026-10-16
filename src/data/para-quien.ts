export interface Perfil {
  icon: string;
  who: string;
  pain: string;
  offer: string;
  href: string;
}

export const perfiles: Perfil[] = [
  {
    icon: 'ph-duotone ph-seedling',
    who: 'Tu negocio está partiendo',
    pain: 'Necesitas nombre, marca y web, y no sabes por dónde empezar.',
    offer: 'Marca + Web',
    href: '/#contacto',
  },
  {
    icon: 'ph-duotone ph-storefront',
    who: 'Funciona, pero se ve amateur',
    pain: 'Vendes bien, pero tu imagen no está a la altura de tu trabajo.',
    offer: 'Marca o rediseño web',
    href: '/servicios',
  },
  {
    icon: 'ph-duotone ph-gauge',
    who: 'Tu web es lenta o difícil de editar',
    pain: 'Cada cambio es un problema y depender de alguien te frena.',
    offer: 'Web + Partner',
    href: '/servicios/partner-digital-mantenimiento',
  },
];
