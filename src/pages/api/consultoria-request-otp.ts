export const prerender = false;
import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request, locals }) => {
  return new Response(
    JSON.stringify({
      status: 'API Reachable',
      has_locals: !!locals,
      method: request.method,
      url: request.url,
    }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }
  );
};
