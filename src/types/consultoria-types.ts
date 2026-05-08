/**
 * Consultoria Types
 *
 * TypeScript types for consultancy reports and slides
 */

export interface AuditSlideOption {
  variant: string;
  title: string;
  description: string;
  recommended?: boolean;
  pros?: string[];
  cons?: string[];
  price?: string;
  ctaText?: string;
  ctaLink?: string;
}

export interface AuditSlide {
  title: string;
  type: 'finding' | 'data' | 'recommendation' | 'summary' | 'cta' | 'options';
  priority?: 'urgent' | 'short-term' | 'medium-term';
  highlight?: string;
  content: string;
  image?: string;
  bullets?: string[];
  options?: AuditSlideOption[];
  ctaText?: string;
  ctaLink?: string;
  order?: number;
}

export interface AuditAnalyst {
  name: string;
  role?: string;
  avatar?: string;
}

export interface AuditReport {
  id: string;
  slug: string;
  title: string;
  client: string;
  clientWebsite?: string;
  analyst: string;
  analystRef?: AuditAnalyst;
  date: string;
  status: 'draft' | 'published' | 'archived';
  category:
    | 'auditoria-web'
    | 'seo'
    | 'performance'
    | 'accesibilidad'
    | 'ux'
    | 'estrategia';
  description: string;
  headerImage?: string;
  executiveSummary?: string;
  conclusion?: string;
  protected?: boolean;
  accessExpiry?: string;
  allowedEmails?: string[];
  presentationEnabled?: boolean;
  slides?: AuditSlide[];
  bodyHtml?: string;
  reportContent?: any[];
}

// Legacy aliases — mantienen compatibilidad con el resto del código
export type ConsultoriaReport = AuditReport;
export type ConsultoriaSlide = AuditSlide;
export type SlideOption = AuditSlideOption;

export interface ConsultoriaReportWithInternal extends ConsultoriaReport {
  internal: {
    entryId: string;
    contentType: 'consultoriaReport';
  };
}
