export interface ServiceFeatures {
    title: string;
    description: string;
}

export interface Service {
    id: string;
    slug: string;
    title: string;
    badge?: string;
    category: string;
    tags: string[];
    description: string;
    longDescription: string;
    details: string[];
    features: ServiceFeatures[];
    benefits: string[];
    deliverables?: string[];
    result?: string;
    icon?: string;
    featuredImage?: any;
    featured?: boolean;
    priceAmount?: string;
    priceMeta?: string;
    order: number;
}

export interface ServiceCategory {
    id: string;
    label: string;
    order: number;
}
