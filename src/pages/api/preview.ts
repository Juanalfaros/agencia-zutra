import type { APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = async ({ request, cookies, locals }) => {
  try {
    const url = new URL(request.url);
    const params = url.searchParams;
    const slug = params.get('slug');
    const type = params.get('type');
    const secret = params.get('secret');
    const locale = params.get('locale') || 'es-ES';
    const isExit = params.get('exit') === 'true';

    // Helper for raw redirect response (bypassing Astro's redirect which might throw)
    const rawRedirect = (location: string) => {
      return new Response(null, {
        status: 302,
        headers: { Location: location },
      });
    };

    // Exit preview mode: clear cookie and redirect to home
    if (isExit) {
      if (cookies.has('contentful_preview')) {
        cookies.delete('contentful_preview', { path: '/' });
      }
      return rawRedirect('/');
    }

    // Read secret from Cloudflare runtime bindings OR build-time env
    const runtimeEnv = (locals as any)?.runtime?.env ?? {};
    const PREVIEW_SECRET =
      runtimeEnv.CONTENTFUL_PREVIEW_SECRET ||
      import.meta.env.CONTENTFUL_PREVIEW_SECRET ||
      '';

    if (!PREVIEW_SECRET) {
      console.error('CONTENTFUL_PREVIEW_SECRET is not configured');
      return new Response('Preview is not configured [Missing Secret]', { status: 503 });
    }

    if (secret !== PREVIEW_SECRET) {
      return new Response('Invalid secret Key', { status: 401 });
    }

    if (!slug || !type) {
      return new Response('Missing slug or type', { status: 400 });
    }

    // sameSite: 'none' + secure: true required so Contentful iframe can send the cookie cross-origin
    cookies.set('contentful_preview', 'true', {
      path: '/',
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      maxAge: 3600, // 1 hour
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
    // Return a raw Response to prevent Astro from trying to render the 500.astro page
    // and potentially failing or obscuring the error.
    return new Response(
      `Fatal Error enabling preview: ${error instanceof Error ? error.message : String(error)}`,
      { status: 500 }
    );
  }
};
