// astro.config.mjs - VERSIÓN CORREGIDA

import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import icon from 'astro-icon';
import { fileURLToPath } from 'url';
import path from 'path';

import sitemap from '@astrojs/sitemap';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  site: 'https://zutra.agency',
  integrations: [
    icon({
      include: {
        phosphor: ['ph-lightning', 'ph-lightning-fill'],
      },
    }),
    sitemap(),
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
  output: 'static',
  devToolbar: {
    enabled: false,
  },
  adapter: cloudflare({
    imageService: 'passthrough', // Previene el uso de 'IMAGES' o configuraciones automáticas de imagen
    prerenderEnvironment: 'node',
  }),
  vite: {
    optimizeDeps: {
      include: ['astro-icon/components', '@contentful/live-preview', 'astro/virtual-modules/transitions.js'],
      exclude: ['astro', '@astrojs/toolbar'],
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        'debug': path.resolve(__dirname, './src/lib/mock-debug.js'),
      },
    },
    ssr: {
      external: ['node:fs', 'node:path', 'node:util', 'node:events', 'node:stream', 'node:string_decoder', 'node:buffer', 'node:url'],
      noExternal: ['debug', 'contentful', 'axios'],
    },
  },
});
