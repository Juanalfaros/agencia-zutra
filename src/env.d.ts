/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
  readonly PUBLIC_GTM_ID?: string;
  readonly PUBLIC_TURNSTILE_SITE_KEY?: string;
  readonly TURNSTILE_SECRET_KEY?: string;
  readonly RESEND_API_KEY?: string;
  readonly ADMIN_EMAIL?: string;
  readonly NODE_ENV?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare namespace App {
  interface Locals extends Record<string, any> {
    runtime: {
      env: ImportMetaEnv;
      cfContext: {
        waitUntil: (promise: Promise<any>) => void;
      };
    };
  }
}

declare module 'cloudflare:workers' {
  export const env: Record<string, any>;
}

// TS 6 exige declaración para imports de efecto secundario (CSS de Phosphor).
declare module '@phosphor-icons/web/*';
