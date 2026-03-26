import type { APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = async ({ request, redirect, cookies, locals }) => {
  const url = new URL(request.url);
  const params = url.searchParams;
  const slug = params.get('slug');
  const type = params.get('type');
  const secret = params.get('secret');
  const locale = params.get('locale') || 'es-ES';
  const isExit = params.get('exit') === 'true';

  // Exit preview mode: clear cookie and redirect to home
  if (isExit) {
    cookies.delete('contentful_preview', { path: '/' });
    return redirect('/');
  }

  // Read secret from Cloudflare runtime bindings OR build-time env
  const runtimeEnv = (locals as any)?.runtime?.env ?? {};
  const PREVIEW_SECRET =
    runtimeEnv.CONTENTFUL_PREVIEW_SECRET ||
    import.meta.env.CONTENTFUL_PREVIEW_SECRET ||
    '';

  if (!PREVIEW_SECRET) {
    console.error('CONTENTFUL_PREVIEW_SECRET is not configured');
    return new Response('Preview is not configured', { status: 503 });
  }

  if (secret !== PREVIEW_SECRET) {
    return new Response('Invalid secret', { status: 401 });
  }

  if (!slug || !type) {
    return new Response('Missing slug or type', { status: 400 });
  }

  try {
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

    return redirect(redirectPath);
  } catch (error) {
    console.error('Error enabling preview:', error);
    return new Response('Error enabling preview', { status: 500 });
  }
};
