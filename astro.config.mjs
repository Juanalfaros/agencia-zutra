// astro.config.mjs - VERSIÓN CORREGIDA

import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import icon from 'astro-icon';
import { fileURLToPath } from 'url';
import path from 'path';

import mdx from '@astrojs/mdx';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  site: 'https://zutra.cl',
  integrations: [icon(), mdx()],
  image: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  output: 'server',
  // Slugs antiguos de servicios (unificados en Marca, Web y Partner)
  redirects: {
    '/sitemap-0.xml': { status: 301, destination: '/sitemap-index.xml' },
    '/sitemap.xml': { status: 301, destination: '/sitemap-index.xml' },
    '/servicios/identidad-corporativa': {
      status: 301,
      destination: '/servicios/marca',
    },
    '/servicios/desarrollo-web-corporativo': {
      status: 301,
      destination: '/servicios/web',
    },
    '/servicios/landing-pages-conversion': {
      status: 301,
      destination: '/servicios/web',
    },
    '/servicios/ecommerce-tiendas-online': {
      status: 301,
      destination: '/servicios/web',
    },
    '/servicios/seo-posicionamiento-web': {
      status: 301,
      destination: '/servicios/web',
    },
    '/servicios/partner-digital-mantenimiento': {
      status: 301,
      destination: '/servicios/partner',
    },
  },
  devToolbar: {
    enabled: false,
  },
  adapter: cloudflare({
    imageService: 'passthrough',
    prerenderEnvironment: 'node',
  }),
  vite: {
    optimizeDeps: {
      include: [
        'astro-icon/components',
        'astro/virtual-modules/transitions.js',
        'debug',
      ],
      exclude: ['astro', '@astrojs/toolbar'],
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        debug: path.resolve(__dirname, './src/lib/mock-debug.js'),
      },
    },
    ssr: {
      external: [
        'node:fs',
        'node:path',
        'node:util',
        'node:events',
        'node:stream',
        'node:string_decoder',
        'node:buffer',
        'node:url',
      ],
    },
  },
});
