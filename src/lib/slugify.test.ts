import { describe, it, expect } from 'vitest';
import { slugify } from './slugify';

describe('slugify', () => {
  it('should convert to lowercase', () => {
    expect(slugify('Hello World')).toBe('hello-world');
  });

  it('should remove accents', () => {
    expect(slugify('Café')).toBe('cafe');
    expect(slugify('María José')).toBe('maria-jose');
  });

  it('should replace spaces with dashes', () => {
    expect(slugify('hello world foo')).toBe('hello-world-foo');
  });

  it('should remove special characters', () => {
    expect(slugify('hello! world?')).toBe('hello-world');
  });

  it('should collapse multiple dashes', () => {
    expect(slugify('hello---world')).toBe('hello-world');
  });

  it('should trim leading and trailing dashes', () => {
    expect(slugify('-hello-world-')).toBe('hello-world');
  });

  it('should handle empty or whitespace input', () => {
    expect(slugify('')).toBe('');
    expect(slugify('   ')).toBe('');
  });
});
