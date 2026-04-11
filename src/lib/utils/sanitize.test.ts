import { describe, it, expect } from 'vitest';
import { sanitizeInput } from './sanitize';

describe('sanitizeInput', () => {
  it('should trim whitespace', () => {
    expect(sanitizeInput('  hello  ')).toBe('hello');
  });

  it('should limit to 500 characters', () => {
    const long = 'a'.repeat(600);
    const result = sanitizeInput(long);
    expect(result.length).toBe(500);
  });

  it('should escape dangerous characters', () => {
    expect(sanitizeInput('<script>alert(1)</script>')).toBe('scriptalert(1)/script');
    expect(sanitizeInput('`whoami`')).toBe('whoami');
    expect(sanitizeInput('hello<>world')).toBe('helloworld');
  });

  it('should handle null and undefined', () => {
    expect(sanitizeInput(null)).toBe('');
    expect(sanitizeInput(undefined)).toBe('');
  });

  it('should return empty string for empty input', () => {
    expect(sanitizeInput('')).toBe('');
    expect(sanitizeInput('   ')).toBe('');
  });
});
