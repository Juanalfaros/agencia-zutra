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
    subtitle?: string;
    tagline?: string;
    description: string;

    // Imágenes enriquecidas
    featuredImage: ProjectImage;
    gallery: ProjectImage[];

    // Taxonomías expandidas
    industry: string;
    subIndustry?: string;
    services: string[];
    platforms?: string[];
    integrations?: string[];
    budget?: string;
    techStack: string[];

    // Metadata de proyecto
    year: string;
    projectType: 'Web Development' | 'E-commerce' | 'Branding' | 'Product Design' | 'Mobile App' | 'Marketing' | 'Consulting';
    role?: string;
    context?: string;
    clientSize?: string;
    duration?: string;
    liveDate?: string;
    websiteUrl?: string;

    // Contenido estratégico
    challenge: string;
    problemStatement?: string;
    challenges?: string[]; // Lista de desafíos específicos
    solution: string;
    agency?: string;
    approach?: string;
    performanceMetrics?: any;
    seoMetrics?: any;
    businessImpact?: any;
    conversionMetrics?: any;
    testimonial?: any;
    testimonials?: any;

    // Ahora son referencias resueltas
    process?: ProjectPhase[];
    keyFeatures?: KeyFeature[];
    team?: TeamMember[];

    // Métricas
    metrics?: {
        value: string;
        label: string;
        description?: string;
        icon?: string;
    }[];

    // Orden y Visibilidad
    order: number;
    status?: 'published' | 'draft' | 'archived';
    featured?: boolean;
    trending?: boolean;
    tags?: string[];
    [key: string]: any;
}
