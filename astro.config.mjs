// astro.config.mjs - VERSIÓN CORREGIDA

import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import icon from "astro-icon";
import { fileURLToPath } from 'url';
import path from 'path';

import sitemap from '@astrojs/sitemap';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  site: 'https://www.zutra.cl',
  integrations: [icon(), sitemap()],
  output: 'static',
  adapter: cloudflare(),
  vite: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  },
});