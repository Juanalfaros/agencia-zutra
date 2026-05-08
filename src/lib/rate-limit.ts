/**
 * Distributed rate limiter using Cloudflare KV.
 * Falls back to in-memory store when KV is unavailable (local dev).
 * Uses a fixed window counter per identifier.
 */

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

// In-memory fallback for local development
const memoryStore = new Map<string, RateLimitEntry>();

type KVNamespace = {
  get(key: string): Promise<string | null>;
  put(
    key: string,
    value: string,
    options?: { expirationTtl?: number }
  ): Promise<void>;
};

/**
 * Extract the real client IP from a Cloudflare request.
 * Only trusts cf-connecting-ip — never the spoofable x-forwarded-for.
 */
export function getClientIP(request: Request): string {
  return request.headers.get('cf-connecting-ip') ?? 'unknown';
}

/**
 * Check if a request is within rate limits.
 * @param identifier - Unique key (e.g., "contact:1.2.3.4")
 * @param max - Max requests allowed in the window
 * @param windowMs - Window duration in ms
 * @param kv - Optional Cloudflare KV namespace for distributed tracking
 */
export async function checkRateLimit(
  identifier: string,
  max: number = 10,
  windowMs: number = 15 * 60 * 1000,
  kv?: KVNamespace
): Promise<{ allowed: boolean; remaining: number; resetAt: number }> {
  const now = Date.now();
  const windowSecs = Math.ceil(windowMs / 1000);
  const kvKey = `rl:${identifier}`;

  if (kv) {
    try {
      const raw = await kv.get(kvKey);
      const entry: RateLimitEntry = raw
        ? JSON.parse(raw)
        : { count: 0, resetAt: now + windowMs };

      // Reset if window expired
      if (now > entry.resetAt) {
        entry.count = 0;
        entry.resetAt = now + windowMs;
      }

      entry.count += 1;

      await kv.put(kvKey, JSON.stringify(entry), { expirationTtl: windowSecs });

      if (entry.count > max) {
        return { allowed: false, remaining: 0, resetAt: entry.resetAt };
      }
      return {
        allowed: true,
        remaining: max - entry.count,
        resetAt: entry.resetAt,
      };
    } catch {
      // KV failure — fail open (don't block legitimate users)
    }
  }

  // In-memory fallback
  const entry = memoryStore.get(identifier);
  if (!entry || now > entry.resetAt) {
    memoryStore.set(identifier, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: max - 1, resetAt: now + windowMs };
  }

  entry.count += 1;
  if (entry.count > max) {
    return { allowed: false, remaining: 0, resetAt: entry.resetAt };
  }
  return {
    allowed: true,
    remaining: max - entry.count,
    resetAt: entry.resetAt,
  };
}
