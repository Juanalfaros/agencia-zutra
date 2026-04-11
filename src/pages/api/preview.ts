import type { APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = async ({ request, cookies }) => {
  try {
    const url = new URL(request.url);
    const params = url.searchParams;
    const slug = params.get('slug');
    const type = params.get('type');
    const secret = params.get('secret');
    const locale = params.get('locale') || 'es-ES';
    const isExit = params.get('exit') === 'true';

    // Helper for raw redirect response
    const rawRedirect = (location: string) => {
      return new Response(null, {
        status: 302,
        headers: { Location: location },
      });
    };

    if (isExit) {
      if (cookies.has('contentful_preview')) {
        cookies.delete('contentful_preview', { path: '/' });
      }
      return rawRedirect('/');
    }

    // Read secret from Cloudflare runtime bindings OR build-time env
    let runtimeEnv: any = {};
    try {
      // Astro v6 replaced locals.runtime.env with cloudflare:workers
      // We use await import to ensure it doesn't break local dev if the module is missing
      const cfWorkers = await import('cloudflare:workers');
      runtimeEnv = cfWorkers.env || {};
    } catch (e) {
      // Fallback for local development or environments without cloudflare:workers
    }

    const PREVIEW_SECRET =
      runtimeEnv.CONTENTFUL_PREVIEW_SECRET ||
      import.meta.env.CONTENTFUL_PREVIEW_SECRET ||
      '';

    if (!PREVIEW_SECRET) {
      console.error('CONTENTFUL_PREVIEW_SECRET is not configured');
      return new Response('Preview not available', { status: 503 });
    }

    if (secret !== PREVIEW_SECRET) {
      return new Response('Unauthorized', { status: 401 });
    }

    if (!slug || !type) {
      return new Response('Missing slug or type', { status: 400 });
    }

    cookies.set('contentful_preview', 'true', {
      path: '/',
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      maxAge: 3600 * 24, // 24 hours
    });

    let redirectPath = '/';
    switch (type) {
      case 'blogPost':
        redirectPath = `/preview/blog/${slug}?locale=${locale}`;
        break;
      case 'portfolioCase':
        redirectPath = `/preview/portfolio/${slug}?locale=${locale}`;
        break;
      case 'service':
        redirectPath = `/preview/servicios/${slug}?locale=${locale}`;
        break;
      default:
        redirectPath = `/?locale=${locale}`;
    }

    return rawRedirect(redirectPath);
  } catch (error) {
    console.error('API Preview Fatal Error:', error);
    return new Response('Internal server error', { status: 500 });
  }
};
