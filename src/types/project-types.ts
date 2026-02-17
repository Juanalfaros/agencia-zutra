// Portfolio type definitions
import type { ImageMetadata } from 'astro';

export interface ProjectImage {
    src: ImageMetadata;
    alt: string;
    caption?: string;
    category?: 'hero' | 'desktop' | 'mobile' | 'detail' | 'process' | 'brand' | 'digital';
}

export interface TeamMember {
    name: string;
    role: string;
    avatar?: string;
}

export interface ProjectPhase {
    name: string;
    duration?: string;
    highlights?: string;
    deliverables?: string[];
}

export interface KeyFeature {
    title: string;
    description: string;
    impact?: string;
    icon?: string;
}

/**
 * Core interface for a Portfolio Case Study.
 * Used across the entire site for consistent project representation.
 */
export interface ZutraCaseStudy {
    // Identificación
    id: string;
    slug: string;
    title: string;
    description: string;

    // Imágenes enriquecidas
    featuredImage: ProjectImage;
    gallery: ProjectImage[];

    // Taxonomías expandidas
    industry: string;
    services: string[];
    techStack: string[];

    // Metadata de proyecto
    year: string;
    projectType: 'Web Development' | 'E-commerce' | 'Branding' | 'Product Design' | 'Mobile App' | 'Marketing' | 'Consulting';

    // Contenido estratégico
    challenge: string;
    problemStatement?: string;
    challenges?: string[]; // Lista de desafíos específicos
    solution: string;

    // Ahora son referencias resueltas
    process?: ProjectPhase[];
    keyFeatures?: KeyFeature[];

    // Orden
    order: number;
}
