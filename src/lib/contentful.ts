/**
 * Contentful Client
 *
 * Singleton client for fetching content from Contentful CMS.
 * Includes in-memory caching with TTL for build-time and SSR optimization.
 */

import { createClient, type EntrySkeletonType } from 'contentful';
import type { Entry, Asset, EntryCollection } from 'contentful';

// Cloudflare Workers env binding (Astro v6 / Cloudflare adapter v13+)
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

/**
 * Read environment variables with proper fallback chain:
 * 1. Cloudflare Workers env (cloudflare:workers)
 * 2. import.meta.env (Astro/Vite - inlined at build time)
 * 3. process.env (Node.js/Build)
 */
async function readEnv(key: string): Promise<string> {
  // 1. Cloudflare Workers/Pages runtime
  const cf = await getCfEnv();
  if (cf[key]) return cf[key];

  // 2. Astro/Vite build-time env
  const fromImportMeta = (import.meta.env as any)[key];
  if (typeof fromImportMeta === 'string' && fromImportMeta.length > 0)
    return fromImportMeta;

  // 3. Node.js process env
  const fromProcess =
    (typeof globalThis !== 'undefined' &&
      (globalThis as any).process?.env?.[key]) ||
    undefined;
  if (typeof fromProcess === 'string' && fromProcess.length > 0)
    return fromProcess;

  return '';
}

type AstroLike = {
  url?: string | URL;
  cookies?: { get?: (key: string) => { value?: string } | undefined };
  locals?: { runtime?: { env?: Record<string, unknown> } };
  request?: { headers?: { get: (key: string) => string | null } | null };
};

export const isPreviewEnabled = (locals?: AstroLike) => {
  // 1. Always trust the Environment Variable (Build-time override)
  if (import.meta.env.CONTENTFUL_USE_PREVIEW === 'true') return true;

  // 2. In the browser, we can safely check cookies/searchParams
  if (typeof document !== 'undefined') {
    return (
      document.cookie.includes('contentful_preview=true') ||
      window.location.search.includes('preview=true') ||
      window.location.pathname.startsWith('/preview/')
    );
  }

  // 3. Server-side (during build or SSR)
  let isPreviewPath = false;

  // Safe check via URL
  if (locals?.url) {
    try {
      const url =
        typeof locals.url === 'string' ? new URL(locals.url) : locals.url;
      isPreviewPath =
        url.pathname.startsWith('/preview/') ||
        url.searchParams.get('preview') === 'true';
    } catch (e) {
      isPreviewPath = false;
    }
  }

  // During prerender, we skip header checks entirely (Astro warns otherwise)
  if (!locals?.url) return isPreviewPath;

  // Header/Cookie check: ONLY in dynamic SSR runtime
  let hasPreviewCookie = false;
  try {
    const cookieHeader = locals.request?.headers?.get('cookie') || '';
    hasPreviewCookie = cookieHeader.includes('contentful_preview=true');
  } catch {
    /* ignore */
  }

  return isPreviewPath || hasPreviewCookie;
};

// Delivery Client (Published content) - Lazy initialization
let deliveryClient: ReturnType<typeof createClient> | null = null;

// Preview Client (Draft content) - Lazy initialization
let previewClient: ReturnType<typeof createClient> | null = null;

async function createDeliveryClient() {
  const spaceId = await readEnv('CONTENTFUL_SPACE_ID');
  const accessToken = await readEnv('CONTENTFUL_ACCESS_TOKEN');

  if (!spaceId || !accessToken) {
    throw new Error(
      'CONTENTFUL_SPACE_ID and CONTENTFUL_ACCESS_TOKEN are required'
    );
  }

  const environment = await readEnv('CONTENTFUL_ENVIRONMENT');
  return createClient({
    space: spaceId,
    accessToken: accessToken,
    host: 'cdn.contentful.com',
    environment: environment || 'master',
  });
}

async function createPreviewClient() {
  const spaceId = await readEnv('CONTENTFUL_SPACE_ID');
  const accessToken =
    (await readEnv('CONTENTFUL_PREVIEW_TOKEN')) ||
    (await readEnv('CONTENTFUL_ACCESS_TOKEN'));

  if (!spaceId || !accessToken) {
    throw new Error(
      'CONTENTFUL_SPACE_ID and CONTENTFUL_ACCESS_TOKEN/CONTENTFUL_PREVIEW_TOKEN are required'
    );
  }

  const environment = await readEnv('CONTENTFUL_ENVIRONMENT');
  return createClient({
    space: spaceId,
    accessToken: accessToken,
    host: 'preview.contentful.com',
    environment: environment || 'master',
  });
}

/**
 * Get the appropriate client
 * @param preview - Force preview mode
 * @param locals - Cloudflare runtime locals (used only for preview detection)
 */
export async function getClient(
  preview?: boolean,
  locals?: any
): Promise<ReturnType<typeof createClient>> {
  const usePreview = preview ?? isPreviewEnabled(locals);

  if (usePreview) {
    if (!previewClient) {
      previewClient = await createPreviewClient();
    }
    return previewClient;
  } else {
    if (!deliveryClient) {
      deliveryClient = await createDeliveryClient();
    }
    return deliveryClient;
  }
}

// Cache with TTL support (default 5 minutes)
const CACHE_TTL_MS = 5 * 60 * 1000;
const cache = new Map<string, { data: any; timestamp: number }>();

function getCached<T>(key: string): T | null {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.timestamp > CACHE_TTL_MS) {
    cache.delete(key);
    return null;
  }
  return entry.data as T;
}

function setCache(key: string, data: any): void {
  cache.set(key, { data, timestamp: Date.now() });
}

/**
 * Get entries from Contentful with caching
 * @param contentType - Content type ID
 * @param query - Additional query parameters
 * @param preview - Force preview mode
 * @param locals - Cloudflare runtime locals
 * @returns Entry collection
 */
export async function getEntries<T extends EntrySkeletonType>(
  contentType: string,
  query: Record<string, any> = {},
  preview?: boolean,
  locals?: any
): Promise<EntryCollection<T, undefined, string>> {
  try {
    const isPreview = preview ?? isPreviewEnabled(locals);
    const cacheKey = `${contentType}-${JSON.stringify(query)}-${isPreview}`;

    const cached = getCached<EntryCollection<T, undefined, string>>(cacheKey);
    if (cached) return cached;

    const clientInstance = await getClient(isPreview, locals);
    const entries = await clientInstance.getEntries<T>({
      content_type: contentType,
      ...query,
    });

    setCache(cacheKey, entries);
    return entries;
  } catch (error) {
    // If Contentful is not configured, return empty collection
    if (error instanceof Error && error.message.includes('required')) {
      console.warn('Contentful not configured, returning empty collection');
      return {
        items: [],
        total: 0,
        skip: 0,
        limit: 0,
        sys: { type: 'Array' as const },
      } as EntryCollection<T, undefined, string>;
    }
    console.error(`Error fetching entries for ${contentType}:`, error);
    throw error;
  }
}

/**
 * Get a single entry by ID with caching
 * @param entryId - Entry ID
 * @param preview - Force preview mode
 * @param locals - Cloudflare runtime locals
 * @returns Single entry
 */
export async function getEntry<T extends EntrySkeletonType>(
  entryId: string,
  preview?: boolean,
  locals?: any
): Promise<Entry<T, undefined, string>> {
  try {
    const isPreview = preview ?? isPreviewEnabled(locals);
    const cacheKey = `${entryId}-${isPreview}`;

    const cached = getCached<Entry<T, undefined, string>>(cacheKey);
    if (cached) return cached;

    const clientInstance = await getClient(isPreview, locals);
    const entry = await clientInstance.getEntry<T>(entryId);
    setCache(cacheKey, entry);
    return entry;
  } catch (error) {
    // If Contentful is not configured, throw a more descriptive error
    if (error instanceof Error && error.message.includes('required')) {
      console.warn('Contentful not configured, cannot fetch entry');
      throw new Error(
        'Contentful is not configured. Please set CONTENTFUL_SPACE_ID and CONTENTFUL_ACCESS_TOKEN environment variables.',
        { cause: error }
      );
    }
    console.error(`Error fetching entry ${entryId}:`, error);
    throw error;
  }
}

/**
 * Get entries by field value
 * @param contentType - Content type ID
 * @param field - Field name
 * @param value - Field value
 * @param preview - Force preview mode
 * @returns Entry collection
 */
export async function getEntriesByField<T extends EntrySkeletonType>(
  contentType: string,
  field: string,
  value: any,
  preview?: boolean,
  locals?: any
): Promise<EntryCollection<T, undefined, string>> {
  return getEntries<T>(
    contentType,
    {
      [`fields.${field}`]: value,
    },
    preview,
    locals
  );
}

/**
 * Clear the cache (useful for development)
 */
export function clearCache(): void {
  cache.clear();
}

/**
 * Export the client for advanced usage (default to delivery)
 */
export { deliveryClient as client };
export type { Entry, Asset, EntryCollection };
