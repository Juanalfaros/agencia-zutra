/**
 * Contentful Client
 *
 * Singleton client for fetching content from Contentful CMS.
 * Includes in-memory caching for build-time optimization.
 */

import { createClient, type EntrySkeletonType } from 'contentful';
import type { Entry, Asset, EntryCollection } from 'contentful';

function readEnv(key: string, locals?: any): string {
  // 1. Try locals.runtime.env (For Cloudflare Pages/Workers runtime)
  // Check if locals is the Astro object or the locals object itself
  const envSource = locals?.locals?.runtime?.env || locals?.runtime?.env;
  const fromRuntime = envSource?.[key];
  if (typeof fromRuntime === 'string' && fromRuntime.length > 0)
    return fromRuntime;

  // 2. Try process.env (Reliable in SSG/Build)
  const fromProcess =
    (typeof globalThis !== 'undefined' &&
      (globalThis as any).process?.env?.[key]) ||
    undefined;
  if (typeof fromProcess === 'string' && fromProcess.length > 0)
    return fromProcess;

  // 3. Fallback to import.meta.env (Astro/Vite)
  return (import.meta.env[key] as string) || '';
}

export const isPreviewEnabled = (locals?: any) => {
  // 1. Always trust the Environment Variable (Build-time override)
  if (import.meta.env.CONTENTFUL_USE_PREVIEW === 'true') return true;

  // 2. In the browser, we can safely check cookies/searchParams
  if (typeof document !== 'undefined') {
    return document.cookie.includes('contentful_preview=true') || 
           window.location.search.includes('preview=true') ||
           window.location.pathname.startsWith('/preview/');
  }

  // 3. Server-side (during build or SSR)
  let hasPreviewCookie = false;
  let isPreviewPath = false;

  // Safe check via Astro.url (doesn't trigger headers warning)
  if (locals?.url) {
    try {
      const url = typeof locals.url === 'string' ? new URL(locals.url) : locals.url;
      isPreviewPath = 
        url.pathname.startsWith('/preview/') || 
        url.searchParams.get('preview') === 'true';
    } catch (e) {
      isPreviewPath = false;
    }
  }

  // Header/Cookie check: ONLY if we are in a dynamic runtime context (SSR)
  // Accessing headers/cookies on static pages triggers [WARN] in Astro.
  // We check for locals.runtime (Cloudflare) or locals.locals.runtime.
  const isDynamicRuntime = !!(locals?.runtime || locals?.locals?.runtime);

  if (isDynamicRuntime && locals?.request?.headers) {
    try {
      const cookieHeader = locals.request.headers.get('cookie') || '';
      hasPreviewCookie = cookieHeader.includes('contentful_preview=true');
    } catch (e) {
      hasPreviewCookie = false;
    }
  }

  // In DEV mode, we might want to be more lenient, but Astro still warns.
  // So we stick to URL and Env vars for static pages.

  return isPreviewPath || hasPreviewCookie;
};

// Delivery Client (Published content) - Lazy initialization
let deliveryClient: ReturnType<typeof createClient> | null = null;

// Preview Client (Draft content) - Lazy initialization
let previewClient: ReturnType<typeof createClient> | null = null;

function createDeliveryClient(locals?: any) {
  const spaceId = readEnv('CONTENTFUL_SPACE_ID', locals);
  const accessToken = readEnv('CONTENTFUL_ACCESS_TOKEN', locals);

  if (!spaceId || !accessToken) {
    throw new Error(
      'CONTENTFUL_SPACE_ID and CONTENTFUL_ACCESS_TOKEN are required'
    );
  }

  return createClient({
    space: spaceId,
    accessToken: accessToken,
    host: 'cdn.contentful.com',
    environment: readEnv('CONTENTFUL_ENVIRONMENT', locals) || 'master',
  });
}

function createPreviewClient(locals?: any) {
  const spaceId = readEnv('CONTENTFUL_SPACE_ID', locals);
  const accessToken =
    readEnv('CONTENTFUL_PREVIEW_TOKEN', locals) ||
    readEnv('CONTENTFUL_ACCESS_TOKEN', locals);

  if (!spaceId || !accessToken) {
    throw new Error(
      'CONTENTFUL_SPACE_ID and CONTENTFUL_ACCESS_TOKEN/CONTENTFUL_PREVIEW_TOKEN are required'
    );
  }

  return createClient({
    space: spaceId,
    accessToken: accessToken,
    host: 'preview.contentful.com',
    environment: readEnv('CONTENTFUL_ENVIRONMENT', locals) || 'master',
  });
}

/**
 * Get the appropriate client
 * @param preview - Force preview mode
 * @param locals - Cloudflare runtime locals
 */
export function getClient(preview?: boolean, locals?: any) {
  const usePreview = preview ?? isPreviewEnabled(locals);

  if (usePreview) {
    // In serverless/dynamic contexts, re-initialize if environment variables change or if locals are provided
    // to ensure we are using the correct credentials from the current request context.
    if (!previewClient || locals) {
      previewClient = createPreviewClient(locals);
    }
    return previewClient;
  } else {
    if (!deliveryClient || locals) {
      deliveryClient = createDeliveryClient(locals);
    }
    return deliveryClient;
  }
}

// Simple in-memory cache for build-time optimization
const cache = new Map<string, any>();

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

    if (cache.has(cacheKey)) {
      return cache.get(cacheKey);
    }

    const clientInstance = getClient(isPreview, locals);
    const entries = await clientInstance.getEntries<T>({
      content_type: contentType,
      ...query,
    });

    cache.set(cacheKey, entries);
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

    if (cache.has(cacheKey)) {
      return cache.get(cacheKey);
    }

    const clientInstance = getClient(isPreview, locals);
    const entry = await clientInstance.getEntry<T>(entryId);
    cache.set(cacheKey, entry);
    return entry;
  } catch (error) {
    // If Contentful is not configured, throw a more descriptive error
    if (error instanceof Error && error.message.includes('required')) {
      console.warn('Contentful not configured, cannot fetch entry');
      throw new Error(
        'Contentful is not configured. Please set CONTENTFUL_SPACE_ID and CONTENTFUL_ACCESS_TOKEN environment variables.'
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
