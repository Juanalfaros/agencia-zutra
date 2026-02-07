/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
  readonly CONTENTFUL_USE_PREVIEW?: string;
  readonly CONTENTFUL_SPACE_ID?: string;
  readonly CONTENTFUL_ACCESS_TOKEN?: string;
  readonly CONTENTFUL_PREVIEW_TOKEN?: string;
  readonly CONTENTFUL_ENVIRONMENT?: string;
  readonly CONTENTFUL_PREVIEW_SECRET?: string;
  readonly PUBLIC_GTM_ID?: string;
  readonly NODE_ENV?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
