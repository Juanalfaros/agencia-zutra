import { describe, it, expect } from 'vitest';
import {
  adaptCategory,
  adaptBlogPost,
  adaptCaseStudy,
} from './sanity-adapters';

describe('sanity-adapters', () => {
  describe('adaptCategory', () => {
    it('should extract slug and title', () => {
      const mockDoc = {
        _id: 'cat-1',
        slug: 'tecnologia',
        title: 'Tecnología',
        order: 1,
      };

      const result = adaptCategory(mockDoc);
      expect(result.id).toBe('tecnologia');
      expect(result.label).toBe('Tecnología');
      expect(result.order).toBe(1);
    });

    it('should handle missing fields with defaults', () => {
      const mockDoc = { _id: 'cat-1' };
      const result = adaptCategory(mockDoc);
      expect(result.label).toBe('');
      expect(result.order).toBe(99);
    });
  });

  describe('adaptBlogPost', () => {
    it('should map basic fields', () => {
      const mockDoc = {
        _id: 'post-1',
        slug: 'mi-post',
        title: 'Mi Post',
        excerpt: 'Un extracto',
        content: [
          {
            _type: 'block',
            children: [{ _type: 'span', text: 'Hola mundo' }],
            markDefs: [],
            style: 'normal',
          },
        ],
        _createdAt: '2024-01-01T00:00:00Z',
        category: 'tecnologia',
        tags: ['web', 'diseño'],
      };

      const result = adaptBlogPost(mockDoc);
      expect(result.id).toBe('post-1');
      expect(result.slug).toBe('mi-post');
      expect(result.title).toBe('Mi Post');
      expect(result.category).toBe('tecnologia');
      expect(result.tags).toEqual(['web', 'diseño']);
      expect(result.readingTime).toMatch(/\d+ min/);
    });
  });

  describe('adaptCaseStudy', () => {
    it('should map featuredImage with correct nested structure for components', () => {
      const mockDoc = {
        _id: 'case-1',
        slug: 'mi-proyecto',
        title: 'Mi Proyecto',
        description: 'Descripción',
        industry: 'Tecnología',
        year: '2024',
        featuredImage: 'https://cdn.sanity.io/images/test.jpg',
      };

      const result = adaptCaseStudy(mockDoc);
      expect(typeof result.featuredImage.src).toBe('object');
      expect((result.featuredImage.src as any).src).toBe(
        'https://cdn.sanity.io/images/test.jpg'
      );
    });

    it('should handle missing featuredImage gracefully', () => {
      const mockDoc = {
        _id: 'case-1',
        slug: 'sin-imagen',
        title: 'Sin Imagen',
        description: 'Test',
        industry: 'Web',
      };

      const result = adaptCaseStudy(mockDoc);
      expect((result.featuredImage.src as any).src).toBe('');
    });
  });
});
