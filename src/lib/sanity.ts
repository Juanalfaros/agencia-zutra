import { createClient } from '@sanity/client';
import groq from 'groq';

// Cloudflare Workers env binding
let cfEnv: Record<string, string> | null = null;

async function getCfEnv(): Promise<Record<string, string>> {
  if (cfEnv) return cfEnv;
  try {
    const { env } = await import('cloudflare:workers');
    cfEnv = env as Record<string, string>;
  } catch {
    cfEnv = {};
  }
  return cfEnv;
}

async function readEnv(key: string): Promise<string> {
  const cf = await getCfEnv();
  if (cf[key]) return cf[key];
  const fromImportMeta = (import.meta.env as any)[key];
  if (typeof fromImportMeta === 'string' && fromImportMeta.length > 0)
    return fromImportMeta;
  const fromProcess =
    (typeof globalThis !== 'undefined' &&
      (globalThis as any).process?.env?.[key]) ||
    undefined;
  if (typeof fromProcess === 'string' && fromProcess.length > 0)
    return fromProcess;
  return '';
}

export const isPreviewEnabled = (url?: URL | string) => {
  if (import.meta.env.SANITY_USE_PREVIEW === 'true') return true;
  if (typeof document !== 'undefined') {
    return (
      document.cookie.includes('sanity_preview=true') ||
      window.location.search.includes('preview=true')
    );
  }
  if (url) {
    const u = typeof url === 'string' ? new URL(url) : url;
    return u.searchParams.get('preview') === 'true';
  }
  return false;
};

let client: any = null;
let previewClient: any = null;

export async function getSanityClient(usePreview = false) {
  const projectId = await readEnv('SANITY_PROJECT_ID');
  const dataset = (await readEnv('SANITY_DATASET')) || 'production';
  const token = await readEnv('SANITY_AUTH_TOKEN');

  const config = {
    projectId,
    dataset,
    useCdn: !usePreview,
    apiVersion: '2024-04-28',
    token: usePreview ? token : undefined,
    perspective: (usePreview ? 'previewDrafts' : 'published') as
      | 'previewDrafts'
      | 'published',
  };

  if (usePreview) {
    if (!previewClient) previewClient = createClient(config);
    return previewClient;
  }

  if (!client) client = createClient(config);
  return client;
}

export { groq };
