import type { APIRoute } from 'astro';
import { getSanityClient, groq } from '@/lib/sanity';

export const prerender = false;

const SITE = 'https://zutra.cl';

const STATIC_PATHS = [
  '/',
  '/servicios',
  '/portfolio',
  '/blog',
  '/nosotros',
  '/recursos',
  '/bio',
  '/privacidad',
  '/terminos',
];

const escapeXml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Sitemap generado desde Sanity en cada petición: los contenidos nuevos
// aparecen sin reconstruir el sitio.
export const GET: APIRoute = async () => {
  const client = await getSanityClient();
  const data = await client.fetch(
    groq`{
      "services": *[_type == "service" && defined(slug.current)]{ "slug": slug.current, _updatedAt },
      "cases": *[_type == "caseStudy" && defined(slug.current)]{ "slug": slug.current, _updatedAt },
      "posts": *[_type == "post" && defined(slug.current)]{ "slug": slug.current, _updatedAt },
      "resources": *[_type == "resource" && defined(slug.current)]{ "slug": slug.current, _updatedAt }
    }`
  );

  const urls: { loc: string; lastmod?: string }[] = [
    ...STATIC_PATHS.map((p) => ({ loc: `${SITE}${p}` })),
    ...data.services.map((d: any) => ({
      loc: `${SITE}/servicios/${d.slug}`,
      lastmod: d._updatedAt,
    })),
    ...data.cases.map((d: any) => ({
      loc: `${SITE}/portfolio/${d.slug}`,
      lastmod: d._updatedAt,
    })),
    ...data.posts.map((d: any) => ({
      loc: `${SITE}/blog/${d.slug}`,
      lastmod: d._updatedAt,
    })),
    ...data.resources.map((d: any) => ({
      loc: `${SITE}/recursos/${d.slug}`,
      lastmod: d._updatedAt,
    })),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) =>
      `  <url><loc>${escapeXml(u.loc)}</loc>${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ''}</url>`
  )
  .join('\n')}
</urlset>
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
