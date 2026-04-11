import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import astro from 'eslint-plugin-astro';
import globals from 'globals';

export default [
  js.configs.recommended,

  // ─── TypeScript & JS (default: Node env) ───
  {
    files: ['**/*.ts', '**/*.js'],
    ignores: ['**/*.astro'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        ...globals.node,
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
    },
  },

  // ─── Browser scripts (public/) ───
  {
    files: ['public/scripts/**/*.js'],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },

  // ─── Client-side lib (src/lib/ui/) ───
  {
    files: ['src/lib/ui/**/*.js'],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },

  // ─── Browser-side TS script ───
  {
    files: ['src/scripts/**/*.ts'],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },

  // ─── API routes ───
  {
    files: ['src/pages/api/**/*.ts'],
    languageOptions: {
      globals: {
        ...globals.node,
        fetch: 'readonly',
        Response: 'readonly',
        Request: 'readonly',
        URL: 'readonly',
        AbortController: 'readonly',
      },
    },
  },

  // ─── Astro files ───
  ...astro.configs['flat/recommended'].map((config) => ({
    ...config,
    languageOptions: {
      ...config.languageOptions,
      globals: {
        ...globals.browser,
        ...globals.node,
        Astro: 'readonly',
        Sentry: 'readonly',
      },
    },
    plugins: {
      ...config.plugins,
      '@typescript-eslint': tseslint,
    },
    rules: {
      ...config.rules,
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
    },
  })),

  // ─── Ignores ───
  {
    ignores: ['dist/**', 'node_modules/**', '.astro/**', 'scripts/**/*.ts'],
  },
];
