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
  details: { title: string; description: string }[];
  features: ServiceFeatures[];
  benefits: string[];
  deliverables?: string[];
  result?: string;
  icon?: string;
  featuredImage?: any;
  featured?: boolean;
  priceAmount?: string | number;
  priceMeta?: string;
  order: number;
  problem?: string;
  variants?: { title: string; text: string; items: string[] }[];
  notIncluded?: string[];
  process?: { title: string; time: string; text: string }[];
  needs?: string[];
  faqs?: { question: string; answer: string }[];
  relatedCases?: {
    _id: string;
    title: string;
    slug: string;
    industry?: string;
    image?: string;
  }[];
}

export interface ServiceCategory {
  id: string;
  label: string;
  order: number;
}
