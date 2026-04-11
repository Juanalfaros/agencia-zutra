import { describe, it, expect, beforeEach } from 'vitest';
import { checkRateLimit, cleanupRateLimitStore } from './rate-limit';

describe('rate-limit', () => {
  beforeEach(() => {
    cleanupRateLimitStore();
  });

  it('should allow first request', () => {
    const result = checkRateLimit('test-ip', 3, 60000);
    expect(result.allowed).toBe(true);
    expect(result.remaining).toBe(2);
  });

  it('should block after max requests', () => {
    const id = 'block-test';
    checkRateLimit(id, 2, 60000);
    checkRateLimit(id, 2, 60000);
    const result = checkRateLimit(id, 2, 60000);
    expect(result.allowed).toBe(false);
    expect(result.remaining).toBe(0);
  });

  it('should reset after window expires', () => {
    const id = 'reset-test';
    checkRateLimit(id, 1, 10);
    checkRateLimit(id, 1, 10);
    // Window is 10ms — wait for it to expire
    return new Promise((resolve) => {
      setTimeout(() => {
        const result = checkRateLimit(id, 1, 10);
        expect(result.allowed).toBe(true);
        resolve(true);
      }, 20);
    });
  });

  it('should track different identifiers separately', () => {
    const r1 = checkRateLimit('user-a', 1, 60000);
    const r2 = checkRateLimit('user-b', 1, 60000);
    expect(r1.allowed).toBe(true);
    expect(r2.allowed).toBe(true);
  });
});
