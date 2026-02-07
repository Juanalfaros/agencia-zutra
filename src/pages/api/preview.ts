import type { APIRoute } from 'astro';
import { getEntry } from '@/lib/contentful';

export const GET: APIRoute = async ({ request, redirect, cookies }) => {
    const url = new URL(request.url);
    const params = url.searchParams;
    const slug = params.get('slug');
    const type = params.get('type');
    const secret = params.get('secret');

    // Simple security check (optional, but recommended)
    // You can set a PREVIEW_SECRET in your .env
    const PREVIEW_SECRET = import.meta.env.CONTENTFUL_PREVIEW_SECRET;
    if (PREVIEW_SECRET && secret !== PREVIEW_SECRET) {
        return new Response('Invalid secret', { status: 401 });
    }

    if (!slug || !type) {
        return new Response('Missing slug or type', { status: 400 });
    }

    try {
        // Verify the entry exists in Preview mode
        // Note: We need the entry ID for better reliability, but if we only have slug
        // we might need to search for it. For now, let's assume we redirect based on type.

        let redirectPath = '/';

        switch (type) {
            case 'blogPost':
                redirectPath = `/blog/${slug}`;
                break;
            case 'portfolioCase':
                redirectPath = `/portfolio/${slug}`;
                break;
            case 'service':
                redirectPath = `/servicios/${slug}`;
                break;
            default:
                redirectPath = '/';
        }

        // Set a cookie to enable preview mode for the browser session
        // This can be checked in Astro.request or used by the client SDK
        cookies.set('contentful_preview', 'true', {
            path: '/',
            httpOnly: true,
            sameSite: 'lax',
            maxAge: 3600, // 1 hour
        });

        return redirect(redirectPath);
    } catch (error) {
        return new Response('Error enabling preview', { status: 500 });
    }
};
