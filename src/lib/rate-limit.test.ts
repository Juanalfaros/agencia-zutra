import { describe, it, expect } from 'vitest';
import { checkRateLimit } from './rate-limit';

// All tests use the in-memory fallback (no KV passed)

describe('rate-limit', () => {
  it('should allow first request', async () => {
    const result = await checkRateLimit(`test-${Date.now()}`, 3, 60000);
    expect(result.allowed).toBe(true);
    expect(result.remaining).toBe(2);
  });

  it('should block after max requests', async () => {
    const id = `block-${Date.now()}`;
    await checkRateLimit(id, 2, 60000);
    await checkRateLimit(id, 2, 60000);
    const result = await checkRateLimit(id, 2, 60000);
    expect(result.allowed).toBe(false);
    expect(result.remaining).toBe(0);
  });

  it('should reset after window expires', async () => {
    const id = `reset-${Date.now()}`;
    await checkRateLimit(id, 1, 10);
    await checkRateLimit(id, 1, 10);
    await new Promise((resolve) => setTimeout(resolve, 20));
    const result = await checkRateLimit(id, 1, 10);
    expect(result.allowed).toBe(true);
  });

  it('should track different identifiers separately', async () => {
    const ts = Date.now();
    const r1 = await checkRateLimit(`user-a-${ts}`, 1, 60000);
    const r2 = await checkRateLimit(`user-b-${ts}`, 1, 60000);
    expect(r1.allowed).toBe(true);
    expect(r2.allowed).toBe(true);
  });
});
