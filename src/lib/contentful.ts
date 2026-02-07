/**
 * Contentful Client
 *
 * Singleton client for fetching content from Contentful CMS.
 * Includes in-memory caching for build-time optimization.
 */

import { createClient, type EntrySkeletonType } from "contentful";
import type { Entry, Asset, EntryCollection } from "contentful";
import { env } from "node:process";

function readEnv(key: string): string {
  // Try to get variable from node:process (Reliable in SSG/Build)
  const fromProcess = env[key];

  // Debug logging
  // if (key === "CONTENTFUL_SPACE_ID" && !fromProcess) {
  //   console.log(`DEBUG: node:process.env.${key} is missing/empty`);
  // }

  if (typeof fromProcess === "string" && fromProcess.length > 0)
    return fromProcess;

  // Fallback to import.meta.env (for Dev/Vite contexts)
  // Note: Dynamic access import.meta.env[key] often fails in Vite for non-public vars
  const fromImportMeta = (import.meta as any)?.env?.[key];
  if (typeof fromImportMeta === "string" && fromImportMeta.length > 0)
    return fromImportMeta;

  return "";
}

// Check if we should use the Preview API by default (env var)
export const isPreviewEnabled =
  import.meta.env.CONTENTFUL_USE_PREVIEW === "true" ||
  import.meta.env.NODE_ENV === "development";

// Delivery Client (Published content) - Lazy initialization
let deliveryClient: ReturnType<typeof createClient> | null = null;

// Preview Client (Draft content) - Lazy initialization
let previewClient: ReturnType<typeof createClient> | null = null;

function createDeliveryClient() {
  const spaceId = readEnv("CONTENTFUL_SPACE_ID");
  const accessToken = readEnv("CONTENTFUL_ACCESS_TOKEN");

  if (!spaceId || !accessToken) {
    throw new Error(
      "CONTENTFUL_SPACE_ID and CONTENTFUL_ACCESS_TOKEN are required",
    );
  }

  return createClient({
    space: spaceId,
    accessToken: accessToken,
    host: "cdn.contentful.com",
    environment: readEnv("CONTENTFUL_ENVIRONMENT") || "master",
  });
}

function createPreviewClient() {
  const spaceId = readEnv("CONTENTFUL_SPACE_ID");
  const accessToken =
    readEnv("CONTENTFUL_PREVIEW_TOKEN") || readEnv("CONTENTFUL_ACCESS_TOKEN");

  if (!spaceId || !accessToken) {
    throw new Error(
      "CONTENTFUL_SPACE_ID and CONTENTFUL_ACCESS_TOKEN/CONTENTFUL_PREVIEW_TOKEN are required",
    );
  }

  return createClient({
    space: spaceId,
    accessToken: accessToken,
    host: "preview.contentful.com",
    environment: readEnv("CONTENTFUL_ENVIRONMENT") || "master",
  });
}

/**
 * Get the appropriate client
 * @param preview - Force preview mode
 */
export function getClient(preview?: boolean) {
  const usePreview = preview ?? isPreviewEnabled;

  if (usePreview) {
    if (!previewClient) {
      previewClient = createPreviewClient();
    }
    return previewClient;
  } else {
    if (!deliveryClient) {
      deliveryClient = createDeliveryClient();
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
 * @returns Entry collection
 */
export async function getEntries<T extends EntrySkeletonType>(
  contentType: string,
  query: Record<string, any> = {},
  preview?: boolean,
): Promise<EntryCollection<T, undefined, string>> {
  try {
    const isPreview = preview ?? isPreviewEnabled;
    const cacheKey = `${contentType}-${JSON.stringify(query)}-${isPreview}`;

    if (cache.has(cacheKey)) {
      return cache.get(cacheKey);
    }

    const clientInstance = getClient(isPreview);
    const entries = await clientInstance.getEntries<T>({
      content_type: contentType,
      ...query,
    });

    cache.set(cacheKey, entries);
    return entries;
  } catch (error) {
    // If Contentful is not configured, return empty collection
    if (error instanceof Error && error.message.includes("required")) {
      console.warn("Contentful not configured, returning empty collection");
      return {
        items: [],
        total: 0,
        skip: 0,
        limit: 0,
        sys: { type: "Array" as const },
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
 * @returns Single entry
 */
export async function getEntry<T extends EntrySkeletonType>(
  entryId: string,
  preview?: boolean,
): Promise<Entry<T, undefined, string>> {
  try {
    const isPreview = preview ?? isPreviewEnabled;
    const cacheKey = `${entryId}-${isPreview}`;

    if (cache.has(cacheKey)) {
      return cache.get(cacheKey);
    }

    const clientInstance = getClient(isPreview);
    const entry = await clientInstance.getEntry<T>(entryId);
    cache.set(cacheKey, entry);
    return entry;
  } catch (error) {
    // If Contentful is not configured, throw a more descriptive error
    if (error instanceof Error && error.message.includes("required")) {
      console.warn("Contentful not configured, cannot fetch entry");
      throw new Error(
        "Contentful is not configured. Please set CONTENTFUL_SPACE_ID and CONTENTFUL_ACCESS_TOKEN environment variables.",
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
): Promise<EntryCollection<T, undefined, string>> {
  return getEntries<T>(
    contentType,
    {
      [`fields.${field}`]: value,
    },
    preview,
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
