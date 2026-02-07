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
    duration: string;
    deliverables: string[];
    highlights?: string;
}

export interface CompetitorAnalysis {
    beforeMetric: string;
    afterMetric: string;
    category: string;
}

export interface SEOMetrics {
    organicTraffic?: string;
    keywordRankings?: string;
    domainAuthority?: string;
    backlinks?: string;
}

export interface PerformanceMetrics {
    pageSpeed?: string;
    coreWebVitals?: {
        lcp: string; // Largest Contentful Paint
        fid: string; // First Input Delay
        cls: string; // Cumulative Layout Shift
    };
    lighthouse?: string;
}

export interface ConversionMetrics {
    conversionRate?: string;
    bounceRate?: string;
    avgSessionDuration?: string;
    pagesPerSession?: string;
}

export interface BusinessImpact {
    revenue?: string;
    roi?: string;
    timeToMarket?: string;
    costSavings?: string;
    customerSatisfaction?: string;
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
    description: string;
    tagline?: string;

    // Imágenes enriquecidas
    featuredImage: ProjectImage;
    gallery: ProjectImage[];
    thumbnail?: ImageMetadata;

    // Taxonomías expandidas
    industry: string;
    subIndustry?: string;
    services: string[];
    techStack: string[];
    platforms?: string[];
    integrations?: string[];

    // Metadata de proyecto
    role: string;
    context: string;
    year: string;
    duration?: string;
    projectType: 'Web Development' | 'E-commerce' | 'Branding' | 'Product Design' | 'Mobile App' | 'Marketing' | 'Consulting';
    clientSize?: 'Startup' | 'PYME' | 'Enterprise' | 'Corporación';
    budget?: 'Low' | 'Medium' | 'High' | 'Enterprise';
    websiteUrl?: string;
    liveDate?: string;

    // Equipo
    team?: TeamMember[];
    agency?: string;

    // Contenido estratégico
    challenge: string;
    challenges?: string[]; // Lista de desafíos específicos
    solution: string;
    approach?: string; // Metodología aplicada
    process?: ProjectPhase[];

    // Resultados cuantitativos
    metrics?: {
        value: string;
        label: string;
        description?: string;
        icon?: string;
    }[];

    // Métricas detalladas por categoría
    seoMetrics?: SEOMetrics;
    performanceMetrics?: PerformanceMetrics;
    conversionMetrics?: ConversionMetrics;
    businessImpact?: BusinessImpact;
    competitorAnalysis?: CompetitorAnalysis[];

    // Social Proof
    testimonial?: {
        text: string;
        author: string;
        role: string;
        company?: string;
        avatar?: string;
        rating?: number;
    };

    // Contenido narrativo
    problemStatement?: string;
    userPersonas?: {
        name: string;
        age?: string;
        occupation?: string;
        painPoints: string[];
        goals: string[];
    }[];

    designPhilosophy?: string;
    keyFeatures?: {
        title: string;
        description: string;
        impact?: string;
    }[];

    lessonsLearned?: string[];
    futureEnhancements?: string[];

    // Reconocimientos
    awards?: {
        name: string;
        year: string;
        category?: string;
    }[];

    press?: {
        outlet: string;
        title: string;
        url?: string;
        date?: string;
    }[];

    // SEO & Discovery
    tags?: string[];
    featured?: boolean;
    trending?: boolean;

    // Orden y visibilidad
    order: number;
    status?: 'published' | 'draft' | 'archived';
    visibility?: 'public' | 'private' | 'unlisted';

    // Metadata adicional
    createdAt?: Date;
    updatedAt?: Date;
    viewCount?: number;
}
