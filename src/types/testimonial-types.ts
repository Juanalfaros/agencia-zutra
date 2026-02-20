/**
 * Testimonial Types
 */

export interface Testimonial {
    id: string;
    quote: string;
    author: string;
    role: string;
    company: string;
    avatar?: {
        src: string;
        alt: string;
    };
    featured: boolean;
    order: number;
}
