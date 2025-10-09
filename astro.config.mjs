// astro.config.mjs - VERSIÓN CORREGIDA

import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  output: 'static', // Cambiado de 'server' a 'static'
  // El adapter de Netlify se elimina, ya no es necesario para el modo estático.
  vite: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  },
});