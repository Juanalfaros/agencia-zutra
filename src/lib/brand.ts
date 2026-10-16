// Identidad visual de los correos: cada acento tiene su logo y el color de texto del botón.
// Debe mantenerse en sincronía con las paletas de Layout.astro.
export const SITE_ORIGIN = 'https://zutra.cl';

export interface Accent {
  color: string;
  logo: string;
  textColor: string;
}

export const ACCENT_MAP: Record<string, { logo: string; textColor: string }> = {
  '#EFD319': { logo: 'logo-zutra_amarillo.png', textColor: '#080501' },
  '#19EFB5': { logo: 'logo-zutra_verde-menta.png', textColor: '#080501' },
  '#FF0055': { logo: 'logo-zutra_magenta.png', textColor: '#ffffff' },
  '#811DBC': { logo: 'logo-zutra_purpura.png', textColor: '#ffffff' },
};

export const DEFAULT_ACCENT: Accent = {
  color: '#EFD319',
  logo: 'logo-zutra_amarillo.png',
  textColor: '#080501',
};

// Acepta solo colores de la paleta; cualquier otro valor cae al amarillo de marca.
export function resolveAccent(raw?: string | null): Accent {
  const normalized = (raw ?? '').trim().toUpperCase();
  const entry = Object.entries(ACCENT_MAP).find(
    ([key]) => key.toUpperCase() === normalized
  );
  return entry ? { color: entry[0], ...entry[1] } : DEFAULT_ACCENT;
}
