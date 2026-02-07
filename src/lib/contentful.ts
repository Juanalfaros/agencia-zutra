/**
 * Contentful Client
 * 
 * Singleton client for fetching content from Contentful CMS.
 * Includes in-memory caching for build-time optimization.
 */

import { createClient, type EntrySkeletonType } from 'contentful';
import type { Entry, Asset, EntryCollection } from 'contentful';

// Check if we should use the Preview API by default (env var)
export const isPreviewEnabled = import.meta.env.CONTENTFUL_USE_PREVIEW === 'true' ||
    import.meta.env.NODE_ENV === 'development';

// Delivery Client (Published content)
const deliveryClient = createClient({
    space: import.meta.env.CONTENTFUL_SPACE_ID || '',
    accessToken: import.meta.env.CONTENTFUL_ACCESS_TOKEN || '',
    host: 'cdn.contentful.com',
    environment: import.meta.env.CONTENTFUL_ENVIRONMENT || 'master',
});

// Preview Client (Draft content)
const previewClient = createClient({
    space: import.meta.env.CONTENTFUL_SPACE_ID || '',
    accessToken: import.meta.env.CONTENTFUL_PREVIEW_TOKEN || import.meta.env.CONTENTFUL_ACCESS_TOKEN || '',
    host: 'preview.contentful.com',
    environment: import.meta.env.CONTENTFUL_ENVIRONMENT || 'master',
});

/**
 * Get the appropriate client
 * @param preview - Force preview mode
 */
export function getClient(preview?: boolean) {
    return (preview ?? isPreviewEnabled) ? previewClient : deliveryClient;
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
    preview?: boolean
): Promise<EntryCollection<T, undefined, string>> {
    const isPreview = preview ?? isPreviewEnabled;
    const cacheKey = `${contentType}-${JSON.stringify(query)}-${isPreview}`;

    if (cache.has(cacheKey)) {
        return cache.get(cacheKey);
    }

    try {
        const clientInstance = getClient(isPreview);
        const entries = await clientInstance.getEntries<T>({
            content_type: contentType,
            ...query,
        });

        cache.set(cacheKey, entries);
        return entries;
    } catch (error) {
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
    preview?: boolean
): Promise<Entry<T, undefined, string>> {
    const isPreview = preview ?? isPreviewEnabled;
    const cacheKey = `${entryId}-${isPreview}`;

    if (cache.has(cacheKey)) {
        return cache.get(cacheKey);
    }

    try {
        const clientInstance = getClient(isPreview);
        const entry = await clientInstance.getEntry<T>(entryId);
        cache.set(cacheKey, entry);
        return entry;
    } catch (error) {
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
    preview?: boolean
): Promise<EntryCollection<T, undefined, string>> {
    return getEntries<T>(contentType, {
        [`fields.${field}`]: value,
    }, preview);
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
