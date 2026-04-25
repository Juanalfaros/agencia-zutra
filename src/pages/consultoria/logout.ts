export const prerender = false;

import type { APIContext } from 'astro';

export const GET = async ({ cookies, url, redirect }: APIContext) => {
  const slug = url.searchParams.get('slug');

  // Borrar cookie de admin global
  cookies.delete('zutra_admin', { path: '/consultoria' });

  // Si viene con slug, borrar también la cookie de sesión de ese reporte
  if (slug) {
    cookies.delete(`rs_${slug}`, { path: `/consultoria/${slug}` });
  }

  // Redirigir al reporte si venía de uno, si no al índice
  return redirect(slug ? `/consultoria/${slug}` : '/consultoria');
};
