/**
 * Contentful Type Adapters
 * 
 * Transforms Contentful entries into local TypeScript types.
 * Maintains compatibility with existing interfaces.
 */

import type { Entry, Asset } from 'contentful';
import type { Post, Author } from "@/data/legacy/blog";
import type { ZutraCaseStudy } from "@/types/project-types";
import type { HeroSlide } from '@/data/hero';
import type { Service, ServiceCategory } from '@/data/legacy/servicios';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import type { Document } from '@contentful/rich-text-types';
import { globalCTAs } from "@/data/ctas";

/**
 * Adapt Contentful Asset to local image format
 */
export function adaptAsset(asset: Asset | undefined | null): any {
    if (!asset || !asset.fields || !asset.fields.file) {
        // Return a placeholder for missing assets to avoid build crashes
        return "https://placehold.co/1200x800/222/fff?text=Imagen+en+Contentful";
    }

    const file = asset.fields.file;
    if (typeof file === 'string') {
        return "https://placehold.co/1200x800/222/fff?text=Invalid+File";
    }

    const details = file.details;
    const contentType = typeof file.contentType === 'string' ? file.contentType : '';

    return {
        src: `https:${file.url}`,
        width: details && typeof details === 'object' && 'image' in details && details.image ? details.image.width : 1200,
        height: details && typeof details === 'object' && 'image' in details && details.image ? details.image.height : 800,
        format: contentType.split('/')[1] || 'jpg',
        alt: typeof asset.fields.title === 'string' ? asset.fields.title : '',
        description: typeof asset.fields.description === 'string' ? asset.fields.description : '',
    };
}

/**
 * Adapt Author from Contentful
 */
export function adaptAuthor(entry: Entry<any, undefined, string>): Author {
    if (!entry || !entry.fields) {
        throw new Error('Invalid author entry');
    }

    const fields = entry.fields;

    return {
        id: entry.sys.id,
        name: typeof fields.name === 'string' ? fields.name : '',
        role: typeof fields.role === 'string' ? fields.role : '',
        avatar: adaptAsset(fields.avatar as Asset),
        bio: typeof fields.bio === 'string' ? fields.bio : '',
        social: {
            linkedin: typeof fields.linkedin === 'string' ? fields.linkedin : undefined,
            twitter: typeof fields.twitter === 'string' ? fields.twitter : undefined,
            instagram: typeof fields.instagram === 'string' ? fields.instagram : undefined,
        },
    };
}

/**
 * Calculate reading time from rich text content
 */
function calculateReadingTime(content: Document | string | undefined): string {
    if (!content) return '1 min';

    let text: string;

    if (typeof content === 'string') {
        text = content;
    } else {
        text = documentToHtmlString(content);
    }

    // Remove HTML tags for word count
    const plainText = text.replace(/<[^>]*>/g, '');
    const words = plainText.split(/\s+/).filter(word => word.length > 0).length;
    const minutes = Math.ceil(words / 200); // Average reading speed

    return `${minutes} min`;
}

/**
 * Adapt Blog Post from Contentful
 */
export function adaptBlogPost(entry: Entry<any, undefined, string>): Post {
    if (!entry || !entry.fields) {
        throw new Error('Invalid blog post entry');
    }

    const fields = entry.fields;

    // Adapt author if it's an Entry
    let author: Author | null = null;
    if (fields.author && typeof fields.author === 'object' && 'sys' in fields.author) {
        author = adaptAuthor(fields.author as Entry<any, undefined, string>);
    }

    const content = fields.content
        ? documentToHtmlString(fields.content as Document)
        : '';

    // Get featured image URL
    let imageUrl = "https://placehold.co/1200x800/111/fff?text=Blog+Image";
    if (fields.featuredImage && typeof fields.featuredImage === 'object' && 'fields' in fields.featuredImage) {
        const asset = fields.featuredImage as Asset;
        const file = asset.fields.file;
        if (file && typeof file !== 'string') {
            imageUrl = `https:${file.url}`;
        }
    }

    return {
        id: entry.sys.id,
        slug: typeof fields.slug === 'string' ? fields.slug : '',
        title: typeof fields.title === 'string' ? fields.title : '',
        excerpt: typeof fields.excerpt === 'string' ? fields.excerpt : '',
        content,
        publishDate: typeof fields.publishDate === 'string' ? fields.publishDate : new Date().toISOString(),
        updatedDate: typeof fields.updatedDate === 'string' ? fields.updatedDate : undefined,
        image: imageUrl,
        author: author!,
        category: typeof fields.category === 'string' ? fields.category : 'general',
        tags: Array.isArray(fields.tags) ? fields.tags.filter((t): t is string => typeof t === 'string') : [],
        readingTime: calculateReadingTime(fields.content as Document),
        featured: typeof fields.featured === 'boolean' ? fields.featured : false,
        seo: {
            title: typeof fields.seoTitle === 'string' ? fields.seoTitle : undefined,
            description: typeof fields.seoDescription === 'string' ? fields.seoDescription : undefined,
            keywords: Array.isArray(fields.seoKeywords) ? fields.seoKeywords.filter((k): k is string => typeof k === 'string') : undefined,
        },
        cta: typeof fields.ctaId === 'string' ? globalCTAs[fields.ctaId as keyof typeof globalCTAs] : undefined,
    };
}

/**
 * Adapt Portfolio Case from Contentful
 */
/**
 * Adapt Project Phase from Contentful
 */
export function adaptProjectPhase(entry: Entry<any, undefined, string>): any { // Returns ProjectPhase but using any to avoid circular strictness issues here
    if (!entry || !entry.fields) return null;
    const fields = entry.fields;
    return {
        name: typeof fields.name === 'string' ? fields.name : '',
        duration: typeof fields.duration === 'string' ? fields.duration : undefined,
        highlights: typeof fields.highlights === 'string' ? fields.highlights : undefined,
        deliverables: Array.isArray(fields.deliverables) ? fields.deliverables.filter((d): d is string => typeof d === 'string') : undefined,
    };
}

/**
 * Adapt Key Feature from Contentful
 */
export function adaptKeyFeature(entry: Entry<any, undefined, string>): any { // Returns KeyFeature
    if (!entry || !entry.fields) return null;
    const fields = entry.fields;
    return {
        title: typeof fields.title === 'string' ? fields.title : '',
        description: typeof fields.description === 'string' ? fields.description : '',
        impact: typeof fields.impact === 'string' ? fields.impact : undefined,
        icon: typeof fields.icon === 'string' ? fields.icon : undefined,
    };
}

/**
 * Adapt Portfolio Case from Contentful
 */
export function adaptPortfolioCase(entry: Entry<any, undefined, string>): ZutraCaseStudy {
    if (!entry || !entry.fields) {
        throw new Error('Invalid portfolio case entry');
    }

    const fields = entry.fields;

    return {
        id: entry.sys.id,
        slug: typeof fields.slug === 'string' ? fields.slug : '',
        title: typeof fields.title === 'string' ? fields.title : '',
        description: typeof fields.description === 'string' ? fields.description : '',
        industry: typeof fields.industry === 'string' ? fields.industry : '',
        year: typeof fields.year === 'string' ? fields.year : new Date().getFullYear().toString(),
        projectType: (typeof fields.projectType === 'string' ? fields.projectType : undefined) as any,

        featuredImage: {
            src: adaptAsset(fields.featuredImage as Asset),
            alt: typeof fields.title === 'string' ? fields.title : '',
            caption: typeof fields.featuredImageCaption === 'string' ? fields.featuredImageCaption : undefined,
        },

        challenge: typeof fields.challenge === 'string' ? fields.challenge : '',
        problemStatement: typeof fields.problemStatement === 'string' ? fields.problemStatement : undefined,
        challenges: Array.isArray(fields.challenges) ? fields.challenges.filter((c): c is string => typeof c === 'string') : undefined,

        solution: typeof fields.solution === 'string' ? fields.solution : '',

        techStack: Array.isArray(fields.techStack) ? fields.techStack.filter((t): t is string => typeof t === 'string') : [],
        services: (Array.isArray(fields.services) ? fields.services.filter((s): s is string => typeof s === 'string') : []) as string[],

        // Map resolved references. Contentful returns strict Entry types, so we check and map.
        process: Array.isArray(fields.processList)
            ? fields.processList.map((p: any) => adaptProjectPhase(p)).filter((p: any) => p !== null)
            : undefined,

        keyFeatures: Array.isArray(fields.keyFeaturesList)
            ? fields.keyFeaturesList.map((k: any) => adaptKeyFeature(k)).filter((k: any) => k !== null)
            : undefined,

        gallery: Array.isArray(fields.gallery)
            ? fields.gallery.map((asset: any) => ({
                src: adaptAsset(asset as Asset),
                alt: typeof asset.fields?.title === 'string' ? asset.fields.title : typeof fields.title === 'string' ? fields.title : '',
                caption: typeof asset.fields?.description === 'string' ? asset.fields.description : undefined,
                category: 'detail' as const,
            }))
            : [],

        order: typeof fields.order === 'number' ? fields.order : 999,
    };
}

/**
 * Adapt Hero Slide from Contentful
 */
export function adaptHeroSlide(entry: Entry<any, undefined, string>): HeroSlide {
    if (!entry || !entry.fields) {
        throw new Error('Invalid hero slide entry');
    }

    const fields = entry.fields;

    return {
        title: typeof fields.title === 'string' ? fields.title : '',
        subtitle: typeof fields.subtitle === 'string' ? fields.subtitle : '',
        buttonText: typeof fields.buttonText === 'string' ? fields.buttonText : '',
        buttonLink: typeof fields.buttonLink === 'string' ? fields.buttonLink : '#',
        image: adaptAsset(fields.image as Asset),
        imageAlt: typeof fields.imageAlt === 'string' ? fields.imageAlt : '',
    };
}

/**
 * Adapt Category from Contentful
 */
export function adaptCategory(entry: Entry<any, undefined, string>): ServiceCategory {
    if (!entry || !entry.fields) {
        throw new Error('Invalid category entry');
    }

    const fields = entry.fields;

    return {
        id: typeof fields.slug === 'string' ? fields.slug : '',
        label: typeof fields.name === 'string' ? fields.name : '',
        order: typeof fields.order === 'number' ? fields.order : 99,
    };
}

/**
 * Adapt Service from Contentful
 */
export function adaptService(entry: Entry<any, undefined, string>): Service {
    if (!entry || !entry.fields) {
        throw new Error('Invalid service entry');
    }

    const fields = entry.fields;
    const content = fields.description
        ? documentToHtmlString(fields.description as Document)
        : '';

    const deliverables = Array.isArray(fields.deliverables)
        ? fields.deliverables.filter((d): d is string => typeof d === 'string')
        : [];
    const features = Array.isArray(fields.features)
        ? (fields.features as any[]).filter(f => typeof f === 'object' && f !== null)
        : [];

    // Resolve category from reference if available, otherwise fallback to text field
    let categorySlug = typeof fields.category === 'string' ? fields.category : 'general';
    if (fields.categoryRef && typeof fields.categoryRef === 'object' && 'fields' in fields.categoryRef) {
        const catEntry = fields.categoryRef as Entry<any, undefined, string>;
        if (catEntry.fields && typeof catEntry.fields.slug === 'string') {
            categorySlug = catEntry.fields.slug;
        }
    }

    // Use first tag or featured status as badge since we won't add a new field
    let badge: string | undefined = undefined;
    if (fields.featured === true) {
        badge = 'Destacado';
    } else if (Array.isArray(fields.tags) && fields.tags.length > 0) {
        const firstTag = fields.tags[0];
        badge = typeof firstTag === 'string' ? firstTag : undefined;
    }

    return {
        id: entry.sys.id,
        slug: typeof fields.slug === 'string' ? fields.slug : '',
        title: typeof fields.title === 'string' ? fields.title : '',
        badge,
        description: typeof fields.excerpt === 'string' ? fields.excerpt : '',
        longDescription: content,
        category: categorySlug,
        tags: Array.isArray(fields.tags) ? fields.tags.filter((t): t is string => typeof t === 'string') : [],
        icon: typeof fields.icon === 'string' ? fields.icon : undefined,
        featuredImage: adaptAsset(fields.featuredImage as Asset),
        priceAmount: typeof fields.price === 'string' ? fields.price : undefined,
        priceMeta: typeof fields.duration === 'string' ? fields.duration : undefined,
        deliverables,
        benefits: deliverables, // Template might use benefits
        details: deliverables, // Used in card lists
        features, // Essential for .map() in detail pages
        result: typeof fields.result === 'string' ? fields.result : undefined,
        featured: typeof fields.featured === 'boolean' ? fields.featured : false,
        order: typeof fields.order === 'number' ? fields.order : 999,
    };
}
