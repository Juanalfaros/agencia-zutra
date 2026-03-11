import type { APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = async ({ request, redirect, cookies, locals }) => {
    const url = new URL(request.url);
    const params = url.searchParams;
    const slug = params.get('slug');
    const type = params.get('type');
    const entryId = params.get('entryId');
    const secret = params.get('secret');

    // Simple security check
    const PREVIEW_SECRET = import.meta.env.CONTENTFUL_PREVIEW_SECRET;
    if (PREVIEW_SECRET && secret !== PREVIEW_SECRET) {
        return new Response('Invalid secret', { status: 401 });
    }

    if (!slug || !type) {
        return new Response('Missing slug or type', { status: 400 });
    }

    try {
        // Set a cookie to enable preview mode for the browser session
        cookies.set('contentful_preview', 'true', {
            path: '/',
            httpOnly: true,
            sameSite: 'lax',
            maxAge: 3600, // 1 hour
        });

        let redirectPath = '/';

        switch (type) {
            case 'blogPost':
                // Redirect to a dedicated preview route that is NOT prerendered
                redirectPath = `/preview/blog/${slug}`;
                break;
            case 'portfolioCase':
                redirectPath = `/preview/portfolio/${slug}`;
                break;
            case 'service':
                redirectPath = `/preview/servicios/${slug}`;
                break;
            default:
                redirectPath = '/';
        }

        return redirect(redirectPath);
    } catch (error) {
        console.error('Error enabling preview:', error);
        return new Response('Error enabling preview', { status: 500 });
    }
};
