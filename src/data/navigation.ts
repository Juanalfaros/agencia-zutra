export interface NavLink {
  text: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { text: 'Servicios', href: '/servicios' },
  { text: 'Portfolio', href: '/portfolio' },
  { text: 'Blog', href: '/blog' },
  { text: 'Nosotros', href: '/nosotros' },
];
