export interface ZutraRecurso {
  id: string;
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  category: 'template' | 'ui-kit' | 'auditoria' | 'guia' | string;
  tags: string[];
  featuredImage: { src: string; alt: string } | null;
  gallery: { src: string; alt: string }[];
  demoUrl?: string;
  gumroadUrl: string;
  price: string;
  isFree: boolean;
  techStack: string[];
  features: string[];
  featured: boolean;
  status: 'published' | 'coming-soon';
  order: number;
}
