import type { ImageMetadata } from 'astro';
import produccionImg from "../assets/img/hero/produccion.webp"; // Usada ahora para Email/Automatización
import landingImg from "../assets/img/hero/landing.webp";     // Usada para Web/Performance
import logoImg from "../assets/img/hero/logo.webp";           // Usada para Branding

export interface HeroSlide {
    title: string;
    subtitle: string;
    buttonText: string;
    buttonLink: string;
    image: ImageMetadata;
    imageAlt: string;
}

export const heroSlides: HeroSlide[] = [
    {
        title: 'Tu web debe vender, <span class="accent-text">no solo estar.</span>',
        subtitle:
            "Desarrollamos sitios ultrarrápidos y Landing Pages diseñadas para convertir visitas en dinero. Tecnología moderna, cero plantillas lentas.",
        buttonText: "Ver soluciones web",
        buttonLink: "#servicios",
        image: landingImg, // Perfecta para hablar de web/datos
        imageAlt: "Dashboard de resultados y analítica web en laptop",
    },
    {
        title: 'El canal más rentable <span class="accent-text">es tuyo.</span>',
        subtitle:
            "Olvídate del algoritmo. Diseñamos estrategias de Email Marketing y automatizaciones que venden por ti mientras duermes. Directo a la bandeja de entrada.",
        buttonText: "Automatizar ventas",
        buttonLink: "#servicios",
        image: produccionImg, // Re-contextualizada: "Llegar al usuario"
        imageAlt: "Usuario interactuando con contenido digital en smartphone",
    },
    {
        title:
            'Diferenciación radical <span class="accent-text">o ser invisible.</span>',
        subtitle:
            "Creamos identidades visuales con carácter. Dejamos de lado lo genérico para que tu marca destaque, inspire respeto y pueda cobrar lo que realmente vale.",
        buttonText: "Crear mi identidad",
        buttonLink: "#servicios",
        image: logoImg, // Perfecta para branding
        imageAlt: "Diseñadora trabajando en identidad visual en tableta",
    },
];