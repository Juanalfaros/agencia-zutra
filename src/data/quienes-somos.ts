import type { ImageMetadata } from 'astro';
import camiloImg from "../assets/img/fundadores/camilo-bustamante.webp";
import juanImg from "../assets/img/fundadores/juan-alfaro.webp";

export interface Founder {
    name: string;
    role: string;
    image: ImageMetadata;
    bio: string;
    bullets: string[];
}

export const founders: Founder[] = [
    {
        name: "Camilo Bustamante",
        role: "Co-fundador · Estratega Creativo",
        image: camiloImg,
        bio: "Camilo lidera la narrativa visual. Su enfoque no es solo estético, sino psicológico: entender qué detiene el scroll y qué convierte una marca en un referente de mercado.",
        bullets: [
            "Concepto y narrativa que venden.",
            "Sistemas de contenido: UGC, guiones de ads, parrillas.",
            "Dirección creativa y guidelines accionables.",
        ],
    },
    {
        name: "Juan Alfaro S.",
        role: "Co-fundador · Brand Manager",
        image: juanImg,
        bio: "Juan une el diseño con la precisión técnica. Su misión es eliminar la fricción digital: sitios rápidos, correos que llegan y automatizaciones que ahorran horas de trabajo.",
        bullets: [
            "Arquitectura web y performance real.",
            "Tracking/analytics, CRO y experimentos.",
            "Automatización y flujos n8n orientados a KPIs.",
        ],
    },
];

export interface ValueChip {
    icon: string;
    text: string;
    primary?: boolean;
}

export const chips: ValueChip[] = [
    { icon: "ph-duotone ph-flag", text: "Sin permanencia", primary: true },
    { icon: "ph-duotone ph-list-checks", text: "KPIs x escrito" },
    { icon: "ph-duotone ph-charts", text: "Tableros compartidos" },
    { icon: "ph-duotone ph-handshake", text: "Entrega accionable" },
];
