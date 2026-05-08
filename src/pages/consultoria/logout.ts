export const prerender = false;

import type { APIContext } from 'astro';

export const POST = async ({ cookies, url, request, redirect }: APIContext) => {
  // CSRF: verify same-origin by checking the Origin header
  const origin = request.headers.get('origin') ?? '';
  const host = request.headers.get('host') ?? '';
  if (origin && !origin.includes(host)) {
    return new Response('Forbidden', { status: 403 });
  }

  const slug = url.searchParams.get('slug');

  cookies.delete('zutra_admin', { path: '/consultoria' });

  if (slug) {
    cookies.delete(`rs_${slug}`, { path: `/consultoria/${slug}` });
  }

  return redirect(slug ? `/consultoria/${slug}` : '/consultoria');
};
