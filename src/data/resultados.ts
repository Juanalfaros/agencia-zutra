// data/selectedCases.ts
// Importa las imágenes correctamente desde tu estructura de carpetas
import comprendemeImg from '../assets/img/casos/comprendeme.webp';
import flipeameImg from '../assets/img/casos/flipeame.webp';
import tubingerImg from '../assets/img/casos/tubinger.webp';
import iejImg from '../assets/img/casos/flipeame.webp'; // Ojo: Usaste flipeameImg para IEJ en tu código, asegúrate de tener la correcta.

export const selectedCases = [
    {
        title: "IEJ - Instituto Estudios Judiciales",
        category: "E-Commerce & Automatización",
        metric: "+150% Ventas Online",
        description: "Transformación de un sitio estático en una plataforma transaccional que automatizó matrículas y pagos.",
        image: iejImg, // Asegúrate de tener la imagen correcta
        tags: ["WooCommerce", "Automatización"],
        link: "/casos/iej-e-commerce"
    },
    {
        title: "Comprende.me",
        category: "Web App & Salud",
        metric: "100% Agenda Automática",
        description: "Ecosistema digital para psicología clínica. Desde la captación del paciente hasta el agendamiento sin fricción.",
        image: comprendemeImg,
        tags: ["Astro", "Reserva Online"],
        link: "/casos/comprendeme-psicologia"
    },
    {
        title: "Tübinger",
        category: "Branding & Estrategia",
        metric: "+25k Comunidad",
        description: "Modernización de una marca icónica. Rediseño de etiquetas y estrategia digital para el mercado craft.",
        image: tubingerImg,
        tags: ["Retail", "Branding"],
        link: "/casos/cerveza-tubinger"
    },
    {
        title: "Flipeame!",
        category: "Fintech Product Design",
        metric: "-50% Tiempos de Carga",
        description: "Diseño UX/UI para simplificar el factoring. Hicimos fácil y transparente un proceso financiero complejo.",
        image: flipeameImg,
        tags: ["Fintech", "UX/UI"],
        link: "/casos/flipeame-fintech"
    }
];