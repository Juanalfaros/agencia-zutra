// astro.config.mjs - VERSIÓN CORREGIDA

import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import icon from 'astro-icon';
import { fileURLToPath } from 'url';
import path from 'path';

import sitemap from '@astrojs/sitemap';
import sentry from '@sentry/astro';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  site: 'https://zutra.agency',
  integrations: [
    icon(),
    sitemap(),
    sentry.sentry({
      dsn: process.env.SENTRY_DSN,
      tracesSampleRate: 0.1,
      replaysSessionSampleRate: 0.05,
      replaysOnErrorSampleRate: 1.0,
    }),
  ],
  image: {
    service: { entrypoint: 'astro/assets/services/sharp' }, // Forzar sharp si es posible
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.ctfassets.net',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  output: 'server',
  devToolbar: {
    enabled: false,
  },
  adapter: cloudflare({
    imageService: 'passthrough',
    sessionKVBindingName: undefined,
    prerenderEnvironment: 'node',
  }),
  vite: {
    optimizeDeps: {
      include: [
        'astro-icon/components',
        '@contentful/live-preview',
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
      noExternal: ['contentful'],
    },
  },
});
