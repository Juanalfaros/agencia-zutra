import type { ImageMetadata } from 'astro';

// Imágenes principales (asegúrate que las rutas sean correctas en tu proyecto)
import camiloImg from "../assets/img/fundadores/camilo-bustamante.webp";
import juanImg from "../assets/img/fundadores/juan-alfaro.webp";

// Avatares
import camiloAvatar from "../assets/img/fundadores/camilo-avatar.webp";
import juanAvatar from "../assets/img/fundadores/juan-avatar.webp";

export interface Founder {
    id: string;
    name: string;
    role: string;
    bio: string;
    image: ImageMetadata;
    avatar: ImageMetadata;
    bullets: string[]; // Cambiado de 'expertise' a 'bullets' para coincidir con el componente
    social?: {
        linkedin?: string;
        instagram?: string;
        twitter?: string;
    };
}

export const founders: Founder[] = [
    {
        id: "camilo",
        name: "Camilo Bustamante",
        role: "Co-fundador · Estratega Creativo",
        bio: "Camilo lidera la narrativa visual. Su enfoque no es solo estético, sino psicológico: entender qué detiene el scroll y qué convierte una marca en un referente de mercado, alejándose de lo genérico.",
        image: camiloImg,
        avatar: camiloAvatar,
        bullets: [ // Coincide con Astro
            "Identidad Visual & Branding",
            "Dirección de Arte Digital",
            "Estrategia de Contenidos B2B"
        ],
        social: {
            linkedin: "https://linkedin.com/in/camilobustamante",
            instagram: "https://instagram.com/camilo.zutra"
        }
    },
    {
        id: "juan",
        name: "Juan Alfaro S.",
        role: "Co-fundador · Tech Lead",
        bio: "Juan une el diseño con la precisión técnica. Su misión es eliminar la fricción digital: sitios rápidos, correos que llegan a la bandeja de entrada y automatizaciones que ahorran horas de trabajo manual.",
        image: juanImg,
        avatar: juanAvatar,
        bullets: [ // Coincide con Astro
            "Arquitectura Web (Astro/Headless)",
            "Automatización de Procesos (CRM)",
            "Infraestructura & Performance"
        ],
        social: {
            linkedin: "https://linkedin.com/in/juanalfaro",
            instagram: "https://instagram.com/juan.zutra"
        }
    }
];

// Value chips para la sección de confianza
export interface ValueChip {
    icon: string;
    text: string;
    primary?: boolean;
}

export const chips: ValueChip[] = [
    { icon: "ph-duotone ph-flag", text: "Sin permanencia", primary: true },
    { icon: "ph-duotone ph-list-checks", text: "Reportes de ROI" },
    { icon: "ph-duotone ph-lightning", text: "Ejecución rápida" },
    { icon: "ph-duotone ph-handshake", text: "Trato directo" },
];