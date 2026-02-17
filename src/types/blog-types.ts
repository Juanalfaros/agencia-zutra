import type { ImageMetadata } from "astro";

export interface Author {
    id: string;
    name: string;
    role: string;
    avatar: ImageMetadata | string;
    bio: string;
    social?: {
        linkedin?: string;
        twitter?: string;
        instagram?: string;
    };
}

export interface SEO {
    title?: string;
    description?: string;
    image?: string;
    keywords?: string[];
}

export interface Post {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    publishDate: string;
    updatedDate?: string;
    image: string;
    author: Author;
    category: string;
    tags: string[];
    readingTime: string;
    featured?: boolean;
    seo?: SEO;
    cta?: any;
}
