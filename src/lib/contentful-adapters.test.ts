import { describe, it, expect } from 'vitest';
import { adaptAsset, adaptCategory } from './contentful-adapters';
import type { Asset } from 'contentful';

describe('contentful-adapters', () => {
  describe('adaptAsset', () => {
    it('should return placeholder for null asset', () => {
      const result = adaptAsset(null as any);
      expect(result.src).toContain('placehold.co');
      expect(result.width).toBe(1200);
      expect(result.height).toBe(800);
    });

    it('should return placeholder for undefined asset', () => {
      const result = adaptAsset(undefined as any);
      expect(result.src).toContain('placehold.co');
    });

    it('should extract url, dimensions and alt from valid asset', () => {
      const mockAsset = {
        sys: { id: 'asset-1' },
        fields: {
          title: 'Test Image',
          file: {
            url: '//images.ctfassets.net/test/image.jpg',
            contentType: 'image/jpeg',
            details: {
              image: { width: 800, height: 600 },
            },
          },
        },
      } as unknown as Asset;

      const result = adaptAsset(mockAsset);
      expect(result.src).toBe('https://images.ctfassets.net/test/image.jpg');
      expect(result.width).toBe(800);
      expect(result.height).toBe(600);
      expect(result.alt).toBe('Test Image');
    });

    it('should handle string file field', () => {
      const mockAsset = {
        sys: { id: 'asset-1' },
        fields: {
          title: 'Test',
          file: 'some-string',
        },
      } as unknown as Asset;

      const result = adaptAsset(mockAsset);
      expect(result.src).toContain('Invalid');
    });
  });

  describe('adaptCategory', () => {
    it('should extract slug and name', () => {
      const mockEntry = {
        sys: { id: 'cat-1' },
        fields: {
          slug: 'tecnologia',
          name: 'Tecnología',
          order: 1,
        },
      } as any;

      const result = adaptCategory(mockEntry);
      expect(result.id).toBe('tecnologia');
      expect(result.label).toBe('Tecnología');
      expect(result.order).toBe(1);
    });

    it('should handle missing fields with defaults', () => {
      const mockEntry = {
        sys: { id: 'cat-1' },
        fields: {},
      } as any;

      const result = adaptCategory(mockEntry);
      expect(result.id).toBe('');
      expect(result.label).toBe('');
      expect(result.order).toBe(99);
    });

    it('should throw for invalid entry', () => {
      expect(() => adaptCategory(null as any)).toThrow('Invalid category entry');
      expect(() => adaptCategory({} as any)).toThrow('Invalid category entry');
    });
  });
});
