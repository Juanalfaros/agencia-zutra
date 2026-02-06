import type { ImageMetadata } from 'astro';
import produccionImg from "../assets/img/hero/produccion.webp";
import landingImg from "../assets/img/hero/landing.webp";
import logoImg from "../assets/img/hero/logo.webp";

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
        title: 'Contenido que <span class="accent-text">engancha y vende.</span>',
        subtitle:
            "Estrategia, calendario y producción de contenido valiente que genera demanda, domina la conversación y mueve KPIs reales.",
        buttonText: "Ver servicio de contenido",
        buttonLink: "#servicios",
        image: produccionImg,
        imageAlt: "Persona creando contenido de video con un smartphone",
    },
    {
        title: 'Leads calificados <span class="accent-text">en 30 días.</span>',
        subtitle:
            "Lanzamos una oferta irresistible con una landing optimizada y pauta precisa para llenar tu pipeline rápidamente. Vamos a todas.",
        buttonText: "Lanzar mi sprint",
        buttonLink: "#servicios",
        image: landingImg,
        imageAlt: "Equipo analizando un dashboard de resultados en una laptop",
    },
    {
        title:
            'Diseño valiente, <span class="accent-text">hecho para vender.</span>',
        subtitle:
            "Creamos una identidad visual memorable, desde el logo hasta las plantillas para redes sociales, con un foco claro en la conversión.",
        buttonText: "Crear mi identidad",
        buttonLink: "#servicios",
        image: logoImg,
        imageAlt: "Diseñadora trabajando en una tableta gráfica",
    },
];
