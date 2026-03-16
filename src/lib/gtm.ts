/**
 * GTM & GA4 Analytics Utilities
 * Includes support for Enhanced Conversions (SHA-256 hashing)
 */

declare global {
  interface Window {
    dataLayer: any[];
  }
}

/**
 * Hashes a string using SHA-256 for GTM Enhanced Conversions.
 * Uses the Web Crypto API (SubtleCrypto).
 */
export async function hashData(data: string): Promise<string> {
  const encoder = new TextEncoder();
  const dataUint8 = encoder.encode(data.trim().toLowerCase());
  const hashBuffer = await crypto.subtle.digest('SHA-256', dataUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

/**
 * Pushes a standard event to the dataLayer.
 */
export function pushToDataLayer(event: string, params: Record<string, any> = {}) {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event,
      ...params,
    });
    
    if (import.meta.env.DEV) {
      console.log(`[GTM] Event: ${event}`, params);
    }
  }
}

/**
 * Track an interaction event (select_content).
 * Used by the global click listener.
 */
export function trackInteraction(id: string, type: string = 'button', text?: string) {
  pushToDataLayer('select_content', {
    content_type: type,
    item_id: id,
    item_name: text?.trim(),
  });
}

/**
 * Track a lead generation event (generate_lead).
 * Supports Enhanced Conversions by passing hashed data.
 */
export interface LeadParams {
  id: string;
  email?: string; // Should be hashed BEFORE calling if privacy is a concern, or this helper can do it
  phone?: string;
  category?: string;
  value?: number;
  currency?: string;
}

export function trackLead(params: LeadParams) {
  pushToDataLayer('generate_lead', {
    ...params,
    currency: params.currency || 'USD',
  });
}

/**
 * Track a page/item view (view_item).
 * Aligns with GA4 standard for products/services.
 */
export interface ItemParams {
  item_id: string;
  item_name: string;
  item_category?: string;
  item_brand?: string;
  price?: number;
}

export function trackItemView(item: ItemParams) {
  pushToDataLayer('view_item', {
    items: [item]
  });
}
