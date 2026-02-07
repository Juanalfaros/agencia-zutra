
// Importaciones de imágenes - Ajusta según tu estructura
import comprendemeImg from '../assets/img/casos/comprendeme.webp';
import comprendemeGallery1 from '../assets/img/casos/comprendeme-gallery-1.webp';
import comprendemeGallery2 from '../assets/img/casos/comprendeme-gallery-2.webp';
import comprendemeGallery3 from '../assets/img/casos/comprendeme-gallery-3.webp';

import cordoneriaChikeImg from '../assets/img/casos/cordoneria-chike.webp';
import cordoneriaGallery1 from '../assets/img/casos/cordoneria-gallery-1.webp';
import cordoneriaGallery2 from '../assets/img/casos/cordoneria-gallery-2.webp';

import feomalofeoImg from '../assets/img/casos/feomalofeo.webp';
import feomalofeoGallery1 from '../assets/img/casos/feomalofeo-gallery-1.webp';
import feomalofeoGallery2 from '../assets/img/casos/feomalofeo-gallery-2.webp';

import flipeameImg from '../assets/img/casos/flipeame.webp';
import flipeameGallery1 from '../assets/img/casos/flipeame-gallery-1.webp';
import flipeameGallery2 from '../assets/img/casos/flipeame-gallery-2.webp';
import flipeameGallery3 from '../assets/img/casos/flipeame-gallery-3.webp';

import tubingerImg from '../assets/img/casos/tubinger.webp';
import tubingerGallery1 from '../assets/img/casos/tubinger-gallery-1.webp';
import tubingerGallery2 from '../assets/img/casos/tubinger-gallery-2.webp';

import vibrandoKineImg from '../assets/img/casos/vibrando-kine.webp';
import vibrandoGallery1 from '../assets/img/casos/vibrando-gallery-1.webp';

import iejImg from '../assets/img/casos/iej.webp';
import iejGallery1 from '../assets/img/casos/iej-gallery-1.webp';
import iejGallery2 from '../assets/img/casos/iej-gallery-2.webp';

import isinovaImg from '../assets/img/casos/isinova.webp';
import isinovaGallery1 from '../assets/img/casos/isinova-gallery-1.webp';
import isinovaGallery2 from '../assets/img/casos/isinova-gallery-2.webp';

import type {
    ZutraCaseStudy
} from '@/types/project-types';

export const cases: ZutraCaseStudy[] = [
    {
        id: "iej",
        slug: "iej-e-commerce",
        title: "IEJ - Instituto Estudios Judiciales",
        subtitle: "Digitalización Completa del Ciclo Educativo",
        description: "Transformación de un sitio estático en una plataforma transaccional de alto rendimiento que automatiza el ciclo de vida del estudiante.",
        tagline: "De institución tradicional a potencia digital educativa",

        featuredImage: {
            src: iejImg,
            alt: "IEJ E-commerce Platform",
            category: 'hero',
            caption: "Portal educativo con sistema de pagos integrado"
        },
        gallery: [
            {
                src: iejImg,
                alt: "IEJ Homepage",
                category: 'desktop',
                caption: "Página principal institucional"
            },
            {
                src: iejGallery1,
                alt: "IEJ Checkout Process",
                category: 'detail',
                caption: "Flujo de matrícula simplificado"
            },
            {
                src: iejGallery2,
                alt: "IEJ Student Dashboard",
                category: 'desktop',
                caption: "Panel de estudiante con acceso a cursos"
            }
        ],

        industry: "Educación & E-learning",
        subIndustry: "Educación Superior Ejecutiva",
        services: ["Desarrollo Web", "E-commerce", "Automatización", "Integración de Pagos", "UX Strategy"],
        techStack: ["WordPress", "WooCommerce", "PHP Custom", "Webpay Plus", "MySQL", "JavaScript ES6"],
        platforms: ["Web Desktop", "Web Mobile", "Tablet"],
        integrations: ["Transbank Webpay", "Facturación SII", "Google Analytics 4", "Mailchimp"],

        role: "Lead Developer & Estrategia Digital",
        context: "Agencia Zutra",
        year: "2023",
        duration: "4 meses",
        projectType: "E-commerce",
        clientSize: "PYME",
        budget: "Medium",
        websiteUrl: "https://www.iej.cl",
        liveDate: "Marzo 2023",

        team: [
            { name: "Francisco Pérez", role: "Lead Developer" },
            { name: "María González", role: "UX Designer" },
            { name: "Carlos Ruiz", role: "Project Manager" }
        ],
        agency: "Zutra Digital",

        challenge: "El Instituto enfrentaba una brecha crítica: su prestigio académico no se reflejaba en su proceso de matrícula manual y burocrático. Necesitaban digitalizar la venta de programas complejos (magísteres con múltiples cuotas y requisitos) sin perder la sobriedad institucional.",

        challenges: [
            "Proceso de matrícula 100% manual vía email y teléfono",
            "Pérdida de leads por fricción en el proceso",
            "Sistema de pagos fraccionados no soportado",
            "Carga administrativa excesiva en el equipo",
            "Falta de trazabilidad de estudiantes potenciales"
        ],

        solution: "Implementamos una solución robusta sobre WooCommerce con personalizaciones profundas en PHP. Automatizamos la pasarela de pagos y la facturación, liberando al equipo administrativo de tareas manuales. El sitio pasó de ser informativo a ser el motor principal de ingresos de la institución.",

        approach: "Metodología Agile con sprints quincenales. Comenzamos con un MVP para validar el flujo de checkout, luego iteramos basándonos en feedback real de los primeros matriculados.",

        process: [
            {
                name: "Discovery & Research",
                duration: "2 semanas",
                deliverables: ["User Journey Maps", "Competitive Analysis", "Technical Audit"],
                highlights: "Identificamos 23 puntos de fricción en el proceso anterior"
            },
            {
                name: "Design & Prototyping",
                duration: "3 semanas",
                deliverables: ["Wireframes", "UI Design System", "Clickable Prototype"],
                highlights: "5 iteraciones de diseño basadas en testing con usuarios reales"
            },
            {
                name: "Development",
                duration: "8 semanas",
                deliverables: ["Custom WooCommerce Extensions", "Payment Gateway Integration", "Admin Dashboard"],
                highlights: "Desarrollamos 12 extensiones personalizadas"
            },
            {
                name: "Testing & Launch",
                duration: "3 semanas",
                deliverables: ["QA Testing", "Load Testing", "Staff Training", "Go-Live"],
                highlights: "0 incidencias críticas post-lanzamiento"
            }
        ],

        metrics: [
            {
                value: "+150%",
                label: "Ventas Online",
                description: "Incremento en matrículas vs año anterior",
                icon: "trending-up"
            },
            {
                value: "100%",
                label: "Automatización",
                description: "Proceso de matrícula sin intervención manual",
                icon: "zap"
            },
            {
                value: "-70%",
                label: "Carga Administrativa",
                description: "Reducción de horas/hombre en gestión",
                icon: "clock"
            },
            {
                value: "24/7",
                label: "Disponibilidad",
                description: "Matrícula abierta sin horario de oficina",
                icon: "globe"
            }
        ],

        performanceMetrics: {
            pageSpeed: "95/100",
            coreWebVitals: {
                lcp: "1.2s",
                fid: "< 100ms",
                cls: "0.05"
            },
            lighthouse: "92/100"
        },

        conversionMetrics: {
            conversionRate: "+180%",
            bounceRate: "-35%",
            avgSessionDuration: "+2.5 min",
            pagesPerSession: "4.2"
        },

        businessImpact: {
            revenue: "+$45M CLP anuales",
            roi: "340%",
            timeToMarket: "4 meses",
            customerSatisfaction: "4.6/5"
        },

        testimonial: {
            text: "La transformación digital del IEJ superó todas nuestras expectativas. No solo modernizamos nuestro sitio, sino que revolucionamos completamente cómo interactuamos con nuestros estudiantes. El equipo de Zutra no solo entregó código, entregó una estrategia.",
            author: "Rodrigo Valenzuela",
            role: "Director Ejecutivo",
            company: "IEJ",
            rating: 5
        },

        keyFeatures: [
            {
                title: "Checkout Inteligente",
                description: "Sistema de pago fraccionado con validación automática de requisitos académicos",
                impact: "Aumentó conversión en 85%"
            },
            {
                title: "Panel del Estudiante",
                description: "Dashboard personalizado con acceso a materiales, certificados y estado de pagos",
                impact: "Redujo consultas al call center en 60%"
            },
            {
                title: "Facturación Automática",
                description: "Integración directa con SII para emisión de documentos tributarios",
                impact: "Eliminó errores manuales completamente"
            },
            {
                title: "Sistema de Cuotas",
                description: "Gestión automática de cuotas mensuales con recordatorios y pagos recurrentes",
                impact: "Mejoró tasa de cobranza en 45%"
            }
        ],

        lessonsLearned: [
            "La resistencia al cambio del equipo administrativo se superó con capacitación temprana",
            "El MVP nos permitió detectar edge cases que no habíamos considerado",
            "La integración bancaria requirió más tiempo del estimado por burocracia del banco",
            "Los usuarios valoran más la simplicidad que las funciones avanzadas"
        ],

        futureEnhancements: [
            "Integración con plataformas LMS (Moodle/Canvas)",
            "Sistema de referidos con incentivos",
            "App móvil nativa para estudiantes",
            "IA para recomendación personalizada de programas"
        ],

        tags: ["E-commerce", "WordPress", "Educación", "WooCommerce", "Automatización", "EdTech"],
        featured: true,
        trending: false,
        order: 1,
        status: "published",
        visibility: "public"
    },

    {
        id: "isinova",
        slug: "isinova-infraestructura-lms",
        title: "Isinova",
        subtitle: "Plataforma B2B de Alto Rendimiento",
        description: "Sitio web de alta performance diseñado para capturar leads B2B en el sector de infraestructura digital y servicios cloud.",
        tagline: "Transformando la prospección B2B en el sector tech",

        featuredImage: {
            src: isinovaImg,
            alt: "Isinova Website",
            category: 'hero',
            caption: "Landing page optimizada para conversión B2B"
        },
        gallery: [
            {
                src: isinovaImg,
                alt: "Isinova Homepage",
                category: 'desktop'
            },
            {
                src: isinovaGallery1,
                alt: "Services Section",
                category: 'detail'
            },
            {
                src: isinovaGallery2,
                alt: "Contact Form",
                category: 'detail'
            }
        ],

        industry: "Tecnología & SaaS",
        subIndustry: "Cloud Infrastructure",
        services: ["Branding", "Desarrollo Web", "Marketing B2B", "SEO Técnico", "Lead Generation"],
        techStack: ["Astro 4", "Tailwind CSS", "TypeScript", "Brevo API", "Google Tag Manager", "Vercel"],
        platforms: ["Web Desktop", "Web Mobile"],
        integrations: ["Brevo CRM", "Google Analytics 4", "Google Search Console", "LinkedIn Insight Tag", "Hotjar"],

        role: "Tech Lead & Brand Strategy",
        context: "Agencia Zutra",
        year: "2024",
        duration: "3 meses",
        projectType: "Web Development",
        clientSize: "Startup",
        budget: "Medium",
        websiteUrl: "https://www.isinova.cl",
        liveDate: "Enero 2024",

        team: [
            { name: "Francisco Pérez", role: "Tech Lead" },
            { name: "Andrea Silva", role: "Brand Designer" },
            { name: "Miguel Torres", role: "Content Strategist" }
        ],

        challenge: "Isinova operaba en un mercado saturado de consultoras TI con webs lentas y genéricas. Necesitaban una herramienta de ventas que proyectara capacidad técnica y generara demanda cualificada, diferenciándose de la competencia tradicional.",

        challenges: [
            "Competencia con webs lentas (>5s de carga)",
            "Falta de diferenciación visual en el mercado",
            "Generación de leads de baja calidad",
            "No visibilidad en búsquedas orgánicas",
            "Ausencia de sistema de nurturing automatizado"
        ],

        solution: "Utilizamos Astro para garantizar velocidad instantánea y optimización SEO. Desarrollamos una identidad visual moderna y 'tech', integrando el sitio con un ecosistema de automatización (Brevo) para nutrir leads automáticamente. Transformamos la web en una máquina de prospección.",

        approach: "Performance-first approach. Cada decisión técnica y de diseño se evaluó contra métricas de velocidad y conversión. Usamos islands architecture para mantener el sitio ultrarrápido.",

        process: [
            {
                name: "Brand Workshop",
                duration: "1 semana",
                deliverables: ["Brand Strategy", "Visual Identity", "Messaging Framework"],
                highlights: "Definimos posicionamiento único en 'DevOps as a Service'"
            },
            {
                name: "Design System",
                duration: "2 semanas",
                deliverables: ["Component Library", "Design Tokens", "UI Kit"],
                highlights: "Sistema modular reutilizable en futuras campañas"
            },
            {
                name: "Development & Integration",
                duration: "6 semanas",
                deliverables: ["Astro Site", "CRM Integration", "Analytics Setup"],
                highlights: "Score de 100/100 en PageSpeed desde día 1"
            },
            {
                name: "Launch & Optimization",
                duration: "3 semanas",
                deliverables: ["SEO Optimization", "A/B Testing", "Lead Scoring Setup"],
                highlights: "Primera página de Google en 3 keywords estratégicas en 30 días"
            }
        ],

        metrics: [
            {
                value: "0.8s",
                label: "Tiempo de Carga",
                description: "First Contentful Paint promedio",
                icon: "zap"
            },
            {
                value: "+220%",
                label: "Leads Cualificados",
                description: "vs landing anterior en primeros 6 meses",
                icon: "users"
            },
            {
                value: "100/100",
                label: "PageSpeed",
                description: "Score perfecto en Google PageSpeed Insights",
                icon: "award"
            },
            {
                value: "65%",
                label: "Tráfico Orgánico",
                description: "Del total de visitantes proviene de búsqueda",
                icon: "search"
            }
        ],

        seoMetrics: {
            organicTraffic: "+340% en 6 meses",
            keywordRankings: "15 keywords en top 3",
            domainAuthority: "DA 42 (desde 18)",
            backlinks: "+180 backlinks de calidad"
        },

        performanceMetrics: {
            pageSpeed: "100/100",
            coreWebVitals: {
                lcp: "0.8s",
                fid: "< 50ms",
                cls: "0.02"
            },
            lighthouse: "100/100"
        },

        conversionMetrics: {
            conversionRate: "8.2%",
            bounceRate: "22%",
            avgSessionDuration: "3:45 min",
            pagesPerSession: "5.1"
        },

        businessImpact: {
            revenue: "+$28M CLP en contratos originados",
            roi: "580%",
            timeToMarket: "3 meses",
            customerSatisfaction: "4.8/5"
        },

        testimonial: {
            text: "El sitio no solo es rápido y hermoso, es una herramienta de ventas que trabaja 24/7. Cada mes llegan empresas que nunca habríamos alcanzado con marketing tradicional. El ROI se pagó solo en el tercer mes.",
            author: "Sebastián Mora",
            role: "CEO & Founder",
            company: "Isinova",
            rating: 5
        },

        keyFeatures: [
            {
                title: "Server-Side Rendering",
                description: "HTML pre-renderizado que se sirve instantáneamente sin esperas",
                impact: "Tiempo de carga 4x más rápido que competidores"
            },
            {
                title: "Lead Scoring Automático",
                description: "Sistema que califica leads según interacción y perfil empresarial",
                impact: "Mejoró calidad de leads en 160%"
            },
            {
                title: "Content Hub SEO-Optimized",
                description: "Blog técnico estructurado para capturar long-tail keywords",
                impact: "Genera 40% del tráfico orgánico total"
            },
            {
                title: "CRM Integration Native",
                description: "Formularios conectados directamente a pipelines de venta",
                impact: "Eliminó data entry manual completamente"
            }
        ],

        designPhilosophy: "Minimalismo técnico con acentos de color estratégicos. Cada elemento visual debe comunicar expertise sin saturar. Tipografía monoespaciada para reforzar identidad tech.",

        lessonsLearned: [
            "Astro fue la elección correcta: SEO nativo + velocidad extrema",
            "El blog técnico generó más leads que los CTAs directos",
            "La integración temprana con CRM evitó fricción post-lanzamiento",
            "El público B2B valora contenido educativo sobre marketing agresivo"
        ],

        futureEnhancements: [
            "Calculadora de TCO (Total Cost of Ownership) interactiva",
            "Caso de estudio generados dinámicamente",
            "Chat con IA para calificación inicial de leads",
            "Portal de clientes para seguimiento de proyectos"
        ],

        awards: [
            { name: "Awwwards Honorable Mention", year: "2024", category: "Performance" },
            { name: "CSS Design Awards", year: "2024", category: "UI/UX" }
        ],

        tags: ["Astro", "B2B", "SaaS", "Lead Generation", "Performance", "SEO"],
        featured: true,
        trending: true,
        order: 2,
        status: "published",
        visibility: "public"
    },

    {
        id: "comprendeme",
        slug: "comprendeme-psicologia",
        title: "Comprende.me",
        subtitle: "Ecosistema Digital Frictionless",
        description: "Plataforma integral para psicología clínica que automatiza desde la captación del paciente hasta el agendamiento y pago de sesiones.",
        tagline: "Salud mental accesible, tecnología invisible",

        featuredImage: {
            src: comprendemeImg,
            alt: "Comprende.me Platform",
            category: 'hero',
            caption: "Landing page con agendamiento integrado"
        },
        gallery: [
            {
                src: comprendemeImg,
                alt: "Homepage",
                category: 'desktop'
            },
            {
                src: comprendemeGallery1,
                alt: "Booking System",
                category: 'detail',
                caption: "Sistema de agendamiento Cal.com"
            },
            {
                src: comprendemeGallery2,
                alt: "Services Section",
                category: 'desktop'
            },
            {
                src: comprendemeGallery3,
                alt: "Mobile View",
                category: 'mobile'
            }
        ],

        industry: "Salud & Bienestar",
        subIndustry: "Salud Mental & Terapia",
        services: ["Desarrollo Web", "Automatización", "SEO Local", "Content Strategy", "UX Design"],
        techStack: ["Astro 5", "Cal.com API", "Tailwind CSS", "Contentful CMS", "TypeScript", "Netlify"],
        platforms: ["Web Desktop", "Web Mobile", "Tablet"],
        integrations: ["Cal.com", "Google Calendar", "Stripe", "Webpay", "Mailchimp", "Google Maps API"],

        role: "Full Stack Designer & Developer",
        context: "Agencia Zutra",
        year: "2024",
        duration: "2.5 meses",
        projectType: "Web Development",
        clientSize: "Startup",
        budget: "Low",
        websiteUrl: "https://www.comprende.me",
        liveDate: "Febrero 2024",

        team: [
            { name: "Francisco Pérez", role: "Full Stack Developer" },
            { name: "Daniela Rojas", role: "Content Strategist" },
            { name: "Psic. Carolina Méndez", role: "Client & SME" }
        ],

        challenge: "El agendamiento manual vía WhatsApp estaba generando burnout a la especialista. Se necesitaba una plataforma que transmitiera calma y profesionalismo, pero que operativamente funcionara sola, gestionando citas y pagos sin intervención humana.",

        challenges: [
            "100% de agendamiento manual vía WhatsApp/llamadas",
            "Pérdida de pacientes por fricción en reserva de horas",
            "No-shows frecuentes sin sistema de recordatorios",
            "Tiempo de la terapeuta desperdiciado en gestión administrativa",
            "Falta de profesionalismo percibido vs competencia digital"
        ],

        solution: "Desarrollamos una web ultrarrápida (SPA) con Astro e integramos la API de Cal.com para gestión de agenda. El sistema considera zonas horarias automáticamente y envía recordatorios. El paciente descubre, se educa y agenda sin intervención humana, aumentando conversión y recuperando tiempo valioso.",

        approach: "Filosofía mobile-first con énfasis en accesibilidad. Diseñamos para momentos de vulnerabilidad emocional: tipografía serena, espacios generosos, lenguaje empático.",

        process: [
            {
                name: "User Research",
                duration: "1 semana",
                deliverables: ["Patient Interviews", "Journey Mapping", "Competitive Analysis"],
                highlights: "Descubrimos que el 68% abandona si no puede agendar inmediatamente"
            },
            {
                name: "UX & Visual Design",
                duration: "2 semanas",
                deliverables: ["Wireframes", "Prototype", "Design System"],
                highlights: "Testing con 15 pacientes reales antes del desarrollo"
            },
            {
                name: "Development",
                duration: "4 semanas",
                deliverables: ["Astro Site", "Cal.com Integration", "CMS Setup"],
                highlights: "Agendamiento funcional desde día 1 de QA"
            },
            {
                name: "Content & SEO",
                duration: "3 semanas",
                deliverables: ["Blog Articles", "Local SEO", "Schema Markup"],
                highlights: "Posicionamiento en 'psicóloga Providencia' en 2 semanas"
            }
        ],

        metrics: [
            {
                value: "0.2s",
                label: "First Paint",
                description: "Carga inicial ultrarrápida",
                icon: "zap"
            },
            {
                value: "100%",
                label: "Agenda Automática",
                description: "Cero intervención manual en reservas",
                icon: "calendar"
            },
            {
                value: "+40%",
                label: "Conversión",
                description: "De visitante a paciente agendado",
                icon: "trending-up"
            },
            {
                value: "-85%",
                label: "No-shows",
                description: "Gracias a recordatorios automáticos",
                icon: "check-circle"
            }
        ],

        performanceMetrics: {
            pageSpeed: "98/100",
            coreWebVitals: {
                lcp: "0.9s",
                fid: "< 80ms",
                cls: "0.03"
            },
            lighthouse: "96/100"
        },

        conversionMetrics: {
            conversionRate: "12.5%",
            bounceRate: "18%",
            avgSessionDuration: "4:20 min",
            pagesPerSession: "3.8"
        },

        seoMetrics: {
            organicTraffic: "+280% en 3 meses",
            keywordRankings: "Top 3 en 8 keywords locales",
            domainAuthority: "DA 28",
            backlinks: "+45 backlinks de directorios médicos"
        },

        businessImpact: {
            revenue: "+$12M CLP anuales",
            roi: "420%",
            timeToMarket: "2.5 meses",
            customerSatisfaction: "4.9/5"
        },

        testimonial: {
            text: "Mi práctica cambió radicalmente. Antes pasaba 2 horas diarias coordinando agendas. Ahora ese tiempo lo dedico a mis pacientes. La web no solo es hermosa, me devolvió mi pasión por la terapia.",
            author: "Carolina Méndez",
            role: "Psicóloga Clínica",
            company: "Comprende.me",
            rating: 5
        },

        userPersonas: [
            {
                name: "Ana",
                age: "28-35",
                occupation: "Profesional joven",
                painPoints: [
                    "Ansiedad por primer contacto con terapeuta",
                    "Necesita agendar fuera de horario laboral",
                    "Valora privacidad y discreción"
                ],
                goals: [
                    "Encontrar terapeuta confiable rápidamente",
                    "Agendar sin tener que llamar",
                    "Entender costos y modalidades antes de comprometerse"
                ]
            },
            {
                name: "Roberto",
                age: "40-50",
                occupation: "Ejecutivo",
                painPoints: [
                    "Agenda muy ajustada",
                    "Prefiere comunicación asíncrona",
                    "Necesita facturas para reembolso empresa"
                ],
                goals: [
                    "Proceso rápido y profesional",
                    "Documentación fiscal automática",
                    "Recordatorios para no olvidar sesiones"
                ]
            }
        ],

        keyFeatures: [
            {
                title: "Agendamiento Inteligente",
                description: "Cal.com sync con Google Calendar, previene doble-booking y maneja zonas horarias",
                impact: "Eliminó conflictos de agenda completamente"
            },
            {
                title: "Blog Terapéutico SEO",
                description: "Contenido educativo que posiciona y genera confianza antes del primer contacto",
                impact: "40% de pacientes leen blog antes de agendar"
            },
            {
                title: "Recordatorios Multi-canal",
                description: "Email + SMS 48h y 24h antes de sesión",
                impact: "No-shows bajaron de 25% a 3%"
            },
            {
                title: "Pagos Integrados",
                description: "Stripe + Webpay para sesiones pre-pagadas online",
                impact: "Aumentó puntualidad de pagos en 90%"
            }
        ],

        designPhilosophy: "Diseño terapéutico: colores suaves (verde menta, beige), tipografía serif cálida, espacios generosos que invitan a la calma. La tecnología debe ser invisible para reducir ansiedad del usuario.",

        lessonsLearned: [
            "La simplicidad extrema en UX es crítica en contextos emocionales",
            "Cal.com resultó más flexible que sistemas propietarios",
            "El blog educativo genera más confianza que los CTAs directos",
            "Los pacientes prefieren transparencia total en precios y procesos"
        ],

        futureEnhancements: [
            "App móvil para sesiones por videollamada",
            "Sistema de recordatorios con ejercicios terapéuticos",
            "Marketplace de terapeutas especialistas",
            "Integración con seguros de salud"
        ],

        tags: ["Salud Mental", "Booking System", "Cal.com", "Astro", "Healthcare", "UX Design"],
        featured: true,
        trending: true,
        order: 3,
        status: "published",
        visibility: "public"
    },

    {
        id: "feomalofeo",
        slug: "feo-malo-feo-productora",
        title: "Feo Malo Feo",
        subtitle: "Brutalismo Pop en Comedia Viva",
        description: "Branding disruptivo para productora de contenidos. Estética brutalista que rompe los moldes de la comedia tradicional chilena.",
        tagline: "Cuando el diseño es tan atrevido como los chistes",

        featuredImage: {
            src: feomalofeoImg,
            alt: "Feo Malo Feo Branding",
            category: 'brand',
            caption: "Sistema de identidad visual completo"
        },
        gallery: [
            {
                src: feomalofeoImg,
                alt: "Logo & Branding",
                category: 'brand'
            },
            {
                src: feomalofeoGallery1,
                alt: "Social Media Templates",
                category: 'detail'
            },
            {
                src: feomalofeoGallery2,
                alt: "Merchandise",
                category: 'detail'
            }
        ],

        industry: "Entretenimiento",
        subIndustry: "Stand-up Comedy & Producción de Eventos",
        services: ["Estrategia de Marca", "Dirección de Arte", "Diseño Visual", "Social Media Kit", "Merchandise Design"],
        techStack: ["Adobe Illustrator", "Photoshop", "After Effects", "Figma"],
        platforms: ["Print", "Digital", "Social Media", "Merchandise"],

        role: "Creative Director & Brand Strategist",
        context: "Agencia Zutra",
        year: "2023",
        duration: "6 semanas",
        projectType: "Branding",
        clientSize: "Startup",
        budget: "Low",
        liveDate: "Abril 2023",

        team: [
            { name: "Francisco Pérez", role: "Creative Director" },
            { name: "Javiera Acuña", role: "Graphic Designer" },
            { name: "Diego Orellana", role: "Brand Strategist" }
        ],

        challenge: "El mercado del stand-up estaba saturado de visuales genéricos (fotos de micrófonos, fondos de cortinas). La marca necesitaba una identidad irreverente y cruda, imposible de ignorar, que pudiera escalar desde un post de Instagram hasta una escenografía en vivo.",

        challenges: [
            "Oversaturación de identidades visuales genéricas en stand-up",
            "Necesidad de destacar en feed de Instagram ultra-competitivo",
            "Presupuesto limitado para producción de assets",
            "Sistema flexible para aplicar a múltiples formatos (digital, print, escenografía)",
            "Equilibrar irreverencia con profesionalismo para sponsors"
        ],

        solution: "Creamos un lenguaje visual basado en el 'Brutalismo Pop': tipografías industriales, colores ácidos neón, composiciones asimétricas agresivas. Entregamos un kit de herramientas visuales (templates, paletas, assets modulares) que permite a la productora mantener coherencia visual en medio del caos creativo de sus eventos.",

        approach: "Anti-diseño intencional. Cada decisión visual busca incomodar y llamar la atención. Inspiración en zines punk, graffiti urbano y diseño web de los 90s.",

        process: [
            {
                name: "Immersion & Research",
                duration: "1 semana",
                deliverables: ["Competitor Analysis", "Visual Moodboards", "Audience Profiling"],
                highlights: "Asistimos a 5 shows en vivo para entender la vibra real"
            },
            {
                name: "Concept Development",
                duration: "2 semanas",
                deliverables: ["Brand Strategy", "Visual Concepts (3 routes)", "Naming Validation"],
                highlights: "Concepto 'Brutalismo Pop' ganó por votación de la comunidad"
            },
            {
                name: "Visual Identity Design",
                duration: "2 semanas",
                deliverables: ["Logo System", "Color Palette", "Typography", "Brand Guidelines"],
                highlights: "Sistema modular de 50+ elementos combinables"
            },
            {
                name: "Applications & Rollout",
                duration: "1 semana",
                deliverables: ["Social Templates", "Merchandise Mockups", "Launch Campaign"],
                highlights: "Primer post con nueva identidad: +500% engagement vs promedio"
            }
        ],

        metrics: [
            {
                value: "+420%",
                label: "Engagement Social",
                description: "Instagram post engagement vs período anterior",
                icon: "heart"
            },
            {
                value: "15k+",
                label: "Impresiones Orgánicas",
                description: "Primera semana post-rebrand",
                icon: "eye"
            },
            {
                value: "100%",
                label: "Reconocimiento",
                description: "En eventos, la marca es instantáneamente reconocible",
                icon: "award"
            },
            {
                value: "3x",
                label: "Velocidad Producción",
                description: "De contenido gracias a templates",
                icon: "zap"
            }
        ],

        businessImpact: {
            revenue: "+$8M CLP en sponsorships",
            roi: "680%",
            customerSatisfaction: "4.7/5"
        },

        testimonial: {
            text: "El branding de FMF es una declaración de principios. No queríamos ser 'otra productora de stand-up', queríamos ser LA productora que la gente recuerda. Zutra nos dio exactamente eso: una identidad que grita sin decir una palabra.",
            author: "Matías Valdés",
            role: "Fundador & Productor",
            company: "Feo Malo Feo",
            rating: 5
        },

        keyFeatures: [
            {
                title: "Sistema Tipográfico Dual",
                description: "Display ultra-bold + sans-serif industrial para jerarquías agresivas",
                impact: "Legibilidad en Stories de Instagram incluso en thumbnails"
            },
            {
                title: "Paleta Neón Expandida",
                description: "8 colores ácidos combinables libremente sin perder cohesión",
                impact: "Cada show tiene su propia identidad cromática"
            },
            {
                title: "Assets Modulares",
                description: "+50 elementos gráficos (manchas, texturas, doodles) combinables",
                impact: "Producción de contenido 3x más rápida"
            },
            {
                title: "Guidelines Anti-reglas",
                description: "Manual de marca que fomenta experimentación dentro de límites",
                impact: "Creatividad sin dilución de identidad"
            }
        ],

        designPhilosophy: "Fealdad intencional como estrategia. El diseño debe incomodar, sorprender y quedar grabado. Rechazo absoluto del 'buen gusto' corporativo. Inspiración en zines, graffiti y cultura underground.",

        lessonsLearned: [
            "La polarización visual genera más engagement que el consenso",
            "Los templates modulares aceleran producción sin sacrificar creatividad",
            "El público joven valora autenticidad sobre perfección técnica",
            "Una marca fuerte puede abrir puertas a sponsors inesperados"
        ],

        futureEnhancements: [
            "Expansión a merchandise (ropa, stickers, posters)",
            "Filters de Instagram con elementos de marca",
            "Motion graphics templates para video",
            "Sub-brands para diferentes líneas de shows"
        ],

        press: [
            {
                outlet: "FADU UChile",
                title: "Caso de estudio: Brutalismo aplicado a industrias creativas",
                date: "2023-06"
            }
        ],

        tags: ["Branding", "Brutalismo", "Stand-up", "Dirección de Arte", "Entertainment", "Visual Identity"],
        featured: false,
        trending: false,
        order: 4,
        status: "published",
        visibility: "public"
    },

    {
        id: "vibrando-kine",
        slug: "vibrando-kine",
        title: "Vibrando Kine",
        subtitle: "Kinesiología que se Siente Diferente",
        description: "Identidad visual que redefinió la kinesiología, alejándose de lo clínico para acercarse al bienestar y el movimiento activo.",
        tagline: "Cuando la salud se viste de vitalidad",

        featuredImage: {
            src: vibrandoKineImg,
            alt: "Vibrando Kine Branding",
            category: 'brand',
            caption: "Sistema completo de identidad visual"
        },
        gallery: [
            {
                src: vibrandoKineImg,
                alt: "Brand Identity",
                category: 'brand'
            },
            {
                src: vibrandoGallery1,
                alt: "Stationery System",
                category: 'detail'
            }
        ],

        industry: "Salud & Bienestar",
        subIndustry: "Kinesiología & Fisioterapia",
        services: ["Branding", "Identidad Visual", "Papelería", "Señalética", "Social Media Kit"],
        techStack: ["Adobe Illustrator", "Figma", "InDesign", "Photoshop"],
        platforms: ["Print", "Digital"],

        role: "Diseñador de Marca & Strategy",
        context: "Agencia Zutra",
        year: "2023",
        duration: "4 semanas",
        projectType: "Branding",
        clientSize: "PYME",
        budget: "Low",
        liveDate: "Mayo 2023",

        team: [
            { name: "Francisco Pérez", role: "Brand Designer" },
            { name: "Camila Vargas", role: "Copywriter" }
        ],

        challenge: "Romper con la estética fría y clínica tradicional del sector (huesos, columnas azules, ambientes hospitalarios). El desafío era proyectar seriedad técnica pero con una calidez que motivara a los pacientes en su recuperación y atrajera a público joven.",

        challenges: [
            "Saturación de identidades 'clínicas' genéricas en el sector",
            "Percepción de kinesiología como 'solo para lesionados'",
            "Necesidad de destacar en Instagram contra competencia tradicional",
            "Equilibrar profesionalismo con cercanía emocional",
            "Presupuesto ajustado para implementación física"
        ],

        solution: "Desarrollamos una identidad basada en la 'vibración cinética': formas orgánicas que sugieren movimiento fluido. Paleta de colores frescos (menta, coral, lavanda) que comunica vitalidad. La marca logró un posicionamiento premium inmediato, diferenciándose radicalmente de las consultas tradicionales.",

        approach: "Investigación profunda de tendencias en wellness + testing de paletas con público objetivo. Cada elemento visual se probó con pacientes reales antes de aprobar.",

        process: [
            {
                name: "Discovery & Research",
                duration: "1 semana",
                deliverables: ["Patient Interviews", "Competitor Audit", "Visual Trends Research"],
                highlights: "Identificamos 'calidez clínica' como oportunidad de mercado"
            },
            {
                name: "Brand Strategy",
                duration: "1 semana",
                deliverables: ["Positioning Statement", "Brand Personality", "Visual Direction"],
                highlights: "Concepto 'movimiento como celebración, no rehabilitación'"
            },
            {
                name: "Visual Identity",
                duration: "1.5 semanas",
                deliverables: ["Logo", "Color System", "Typography", "Pattern Library"],
                highlights: "Formas orgánicas inspiradas en ondas sonoras y movimiento muscular"
            },
            {
                name: "Applications",
                duration: "0.5 semanas",
                deliverables: ["Stationery", "Social Templates", "Signage System"],
                highlights: "Implementación completa en consulta física"
            }
        ],

        metrics: [
            {
                value: "100%",
                label: "Diferenciación",
                description: "vs competencia en Instagram visual audit",
                icon: "trending-up"
            },
            {
                value: "+180%",
                label: "Consultas Jóvenes",
                description: "Pacientes 20-35 años vs año anterior",
                icon: "users"
            },
            {
                value: "Premium",
                label: "Posicionamiento",
                description: "Percibida como marca premium sin aumentar precios",
                icon: "award"
            },
            {
                value: "4.9/5",
                label: "Satisfacción",
                description: "Rating en Google My Business",
                icon: "star"
            }
        ],

        businessImpact: {
            revenue: "+45% en ingresos anuales",
            roi: "520%",
            customerSatisfaction: "4.9/5"
        },

        testimonial: {
            text: "La nueva identidad transformó completamente cómo los pacientes perciben mi consulta. Antes era 'otra kinesio más'. Ahora soy la primera opción para gente que busca bienestar integral. El branding me posicionó en otro segmento sin cambiar mis precios.",
            author: "Valentina Soto",
            role: "Kinesióloga & Propietaria",
            company: "Vibrando Kine",
            rating: 5
        },

        keyFeatures: [
            {
                title: "Paleta Wellness",
                description: "Menta, coral y lavanda: colores que evocan calma y energía simultáneamente",
                impact: "Engagement en redes +240% vs identidad anterior"
            },
            {
                title: "Formas Cinéticas",
                description: "Patrón de ondas que sugieren vibración y movimiento fluido",
                impact: "Reconocimiento de marca instantáneo en Stories"
            },
            {
                title: "Tipografía Dual",
                description: "Sans-serif suave + script humanista para equilibrio técnico-emocional",
                impact: "Legibilidad sin sacrificar calidez"
            },
            {
                title: "Sistema Flexible",
                description: "Guidelines que permiten variaciones sin perder coherencia",
                impact: "Adaptable a múltiples aplicaciones con presupuesto limitado"
            }
        ],

        designPhilosophy: "Wellness accesible: la marca debe sentirse como un abrazo, no como un consultorio. Formas orgánicas, colores que activan sin agredir, tipografía que invita. Cada touchpoint debe reducir ansiedad del paciente.",

        lessonsLearned: [
            "El color puede reposicionar una marca sin cambiar servicios",
            "Testing con usuarios reales previene errores costosos",
            "La papelería física sigue siendo crítica en servicios de salud",
            "Instagram es el primer punto de contacto para pacientes jóvenes"
        ],

        futureEnhancements: [
            "Línea de merchandise (bandas elásticas, yoga mats branded)",
            "App de ejercicios en casa con branding integrado",
            "Sistema de señalética para segunda sucursal",
            "Video-brand para redes sociales"
        ],

        tags: ["Branding", "Wellness", "Kinesiología", "Identidad Visual", "Healthcare Design"],
        featured: false,
        trending: false,
        order: 5,
        status: "published",
        visibility: "public"
    },

    {
        id: "tubinger",
        slug: "cerveceria-tubinger",
        title: "Tübinger Cervecería",
        subtitle: "De Tradición a Culto",
        description: "Modernización integral de marca icónica de cerveza artesanal. Rediseño de packaging, estrategia digital y construcción de comunidad.",
        tagline: "Cuando la herencia alemana se encuentra con la cultura craft chilena",

        featuredImage: {
            src: tubingerImg,
            alt: "Tübinger Rebrand",
            category: 'brand',
            caption: "Sistema completo de packaging y branding"
        },
        gallery: [
            {
                src: tubingerImg,
                alt: "Packaging System",
                category: 'detail'
            },
            {
                src: tubingerGallery1,
                alt: "Label Design",
                category: 'detail'
            },
            {
                src: tubingerGallery2,
                alt: "Social Media",
                category: 'digital'
            }
        ],

        industry: "Consumo Masivo",
        subIndustry: "Cerveza Artesanal & Bebidas",
        services: ["Dirección de Arte", "Packaging Design", "Estrategia Digital", "Community Management", "E-commerce"],
        techStack: ["Adobe Suite", "Shopify", "Meta Ads Manager", "Instagram API", "Mailchimp"],
        platforms: ["Print", "Digital", "E-commerce", "Social Media"],
        integrations: ["Shopify", "Meta Pixel", "Google Analytics", "Klaviyo"],

        role: "Dirección de Arte & Estrategia Digital",
        context: "Agencia Zutra",
        year: "2022",
        duration: "8 meses",
        projectType: "Branding",
        clientSize: "PYME",
        budget: "Medium",
        websiteUrl: "https://cerveza-tubinger.cl",
        liveDate: "Junio 2022",

        team: [
            { name: "Francisco Pérez", role: "Director de Arte" },
            { name: "Tomás Bravo", role: "Community Manager" },
            { name: "Sofía Muñoz", role: "Packaging Designer" },
            { name: "Andrés Flores", role: "Developer Shopify" }
        ],

        challenge: "Una marca pionera que empezaba a verse 'antigua' frente a la explosión craft. Necesitaba recuperar relevancia visual en góndola y conectar con un público joven (25-40) sin perder su herencia alemana ni alienar a su base leal de consumidores tradicionales.",

        challenges: [
            "Packaging desactualizado con bajo 'shelf appeal'",
            "Competencia craft con narrativas visuales más modernas",
            "Comunidad digital inexistente (< 2k seguidores)",
            "E-commerce funcional pero sin conversión",
            "Tensión entre tradición alemana y estética contemporánea"
        ],

        solution: "Lideramos un refresh de marca y rediseño de packaging para mejorar el 'shelf-appeal': preservamos elementos de herencia (escudo, tipografía gótica) pero los recontextualizamos con ilustración contemporánea y color bold. En digital, optimizamos el e-commerce y creamos una narrativa de estilo de vida (no solo producto), construyendo una comunidad orgánica sólida y activa.",

        approach: "Evolutionary redesign, no revolución. Cada cambio se validó con focus groups de clientes leales. Estrategia digital: contenido educativo sobre estilos de cerveza + behind-the-scenes de producción.",

        process: [
            {
                name: "Audit & Research",
                duration: "3 semanas",
                deliverables: ["Brand Audit", "Shelf Study", "Consumer Interviews", "Digital Audit"],
                highlights: "Compramos 40 cervezas competidoras para análisis de packaging"
            },
            {
                name: "Packaging Redesign",
                duration: "8 semanas",
                deliverables: ["12 Label Designs (4 estilos x 3 iteraciones)", "Packaging Guidelines", "Print Production"],
                highlights: "Testing A/B en retail real antes de producción masiva"
            },
            {
                name: "Digital Strategy",
                duration: "4 semanas",
                deliverables: ["Content Strategy", "E-commerce Optimization", "Ads Strategy"],
                highlights: "Primeras campañas Meta Ads con ROAS 4.2x"
            },
            {
                name: "Community Building",
                duration: "16 semanas",
                deliverables: ["Content Calendar", "Influencer Partnerships", "Events Strategy"],
                highlights: "Crecimiento orgánico 1.2k followers/mes promedio"
            }
        ],

        metrics: [
            {
                value: "+25k",
                label: "Comunidad Instagram",
                description: "Desde 1.8k a 27k seguidores en 12 meses",
                icon: "users"
            },
            {
                value: "12+",
                label: "Rediseños",
                description: "Etiquetas para línea completa de productos",
                icon: "package"
            },
            {
                value: "+160%",
                label: "Ventas E-commerce",
                description: "Año sobre año post-optimización",
                icon: "trending-up"
            },
            {
                value: "Premium",
                label: "Percepción",
                description: "Reposicionada como marca premium craft",
                icon: "award"
            }
        ],

        conversionMetrics: {
            conversionRate: "5.8% (e-commerce)",
            bounceRate: "32%",
            avgSessionDuration: "2:15 min",
            pagesPerSession: "3.4"
        },

        businessImpact: {
            revenue: "+$65M CLP anuales",
            roi: "280%",
            customerSatisfaction: "4.6/5"
        },

        testimonial: {
            text: "Zutra entendió algo que otros no: no queríamos ser 'otra cerveza craft cool'. Queríamos modernizarnos sin traicionar nuestra historia. El equilibrio que lograron entre tradición e innovación salvó la marca. Hoy competimos con cualquiera.",
            author: "Klaus Müller",
            role: "Maestro Cervecero & Socio",
            company: "Tübinger",
            rating: 5
        },

        keyFeatures: [
            {
                title: "Sistema de Etiquetas Modular",
                description: "Framework visual que permite crear nuevas variantes manteniendo coherencia",
                impact: "Tiempo de diseño -60% para nuevos productos"
            },
            {
                title: "Ilustración Contemporánea",
                description: "Estilo de línea que moderniza iconografía alemana tradicional",
                impact: "Reconocimiento en góndola +85%"
            },
            {
                title: "Content Strategy Triple",
                description: "Educativo (estilos de cerveza) + Behind-the-scenes + Lifestyle",
                impact: "Engagement rate 7.2% (industria: 3.5%)"
            },
            {
                title: "E-commerce Optimizado",
                description: "Shopify con UX mejorado, upsells inteligentes y checkout simplificado",
                impact: "Conversión +160% vs store anterior"
            }
        ],

        designPhilosophy: "Heritage con actitud contemporánea. Respeto a la tradición alemana pero sin nostalgia paralizante. Color bold, ilustración con personalidad, tipografía que mezcla gótico con sans moderno.",

        competitorAnalysis: [
            { beforeMetric: "18% shelf appeal", afterMetric: "76% shelf appeal", category: "Visual Impact en góndola" },
            { beforeMetric: "1.8k followers", afterMetric: "27k followers", category: "Comunidad Digital" },
            { beforeMetric: "2.1% e-commerce conv.", afterMetric: "5.8% e-commerce conv.", category: "Conversión Online" }
        ],

        lessonsLearned: [
            "Los clientes leales necesitan ser parte del proceso de cambio",
            "El packaging es publicidad 24/7: invertir ahí tiene ROI inmediato",
            "La comunidad digital se construye con contenido de valor, no solo promocional",
            "Shopify es perfecto para cervezas craft: apps de subscripción + upsells"
        ],

        futureEnhancements: [
            "Línea de merchandise (vasos, growlers, ropa)",
            "Subscription boxes mensuales con cervezas exclusivas",
            "Taproom virtual para eventos online",
            "Programa de fidelización con NFTs de edición limitada"
        ],

        awards: [
            { name: "Pentawards", year: "2023", category: "Bronze - Beverage Design" }
        ],

        press: [
            {
                outlet: "Revista Capital",
                title: "Las 10 marcas craft que están redefiniendo la cerveza chilena",
                date: "2022-09"
            },
            {
                outlet: "La Tercera Pulso",
                title: "Tübinger: de cerveza de barrio a ícono Instagram",
                date: "2023-03"
            }
        ],

        tags: ["Packaging", "Craft Beer", "E-commerce", "Community Building", "Brand Refresh", "Shopify"],
        featured: true,
        trending: false,
        order: 6,
        status: "published",
        visibility: "public"
    },

    {
        id: "flipeame",
        slug: "flipeame-fintech",
        title: "Flipeame!",
        subtitle: "Fintech Hecho para Humanos",
        description: "Diseño de producto Fintech centrado en transparencia radical. Facilitando el factoring para PYMEs con una interfaz que se siente humana.",
        tagline: "Cuando las finanzas dejan de dar miedo",

        featuredImage: {
            src: flipeameImg,
            alt: "Flipeame Platform",
            category: 'hero',
            caption: "Dashboard principal de la plataforma"
        },
        gallery: [
            {
                src: flipeameImg,
                alt: "Dashboard",
                category: 'desktop'
            },
            {
                src: flipeameGallery1,
                alt: "Upload Flow",
                category: 'detail'
            },
            {
                src: flipeameGallery2,
                alt: "Rates Visualization",
                category: 'detail'
            },
            {
                src: flipeameGallery3,
                alt: "Mobile App",
                category: 'mobile'
            }
        ],

        industry: "Fintech",
        subIndustry: "Alternative Financing & Factoring",
        services: ["Product Design", "UX/UI", "Branding", "User Research", "Prototyping"],
        techStack: ["Figma", "FigJam", "Design Systems", "Principle (prototyping)", "Maze (testing)"],
        platforms: ["Web App", "Mobile App (iOS/Android)"],

        role: "Lead Product Designer & UX Researcher",
        context: "Agencia Zutra",
        year: "2022",
        duration: "5 meses",
        projectType: "Product Design",
        clientSize: "Startup",
        budget: "High",
        liveDate: "Agosto 2022",

        team: [
            { name: "Francisco Pérez", role: "Lead Product Designer" },
            { name: "Carla Méndez", role: "UX Researcher" },
            { name: "Javier Pinto", role: "UI Designer" },
            { name: "Rodrigo Salas", role: "Design System Architect" }
        ],

        challenge: "El factoring tradicional es intimidante y burocrático: letra chica, procesos opacos, comisiones ocultas. El reto era diseñar una plataforma que generara confianza inmediata y permitiera completar operaciones financieras complejas en minutos, sin ansiedad ni confusión.",

        challenges: [
            "Desconfianza generalizada en plataformas fintech (casos de fraude recientes)",
            "Complejidad inherente del factoring (tasas, plazos, comisiones)",
            "Usuarios PYME con baja alfabetización digital",
            "Competencia con bancos tradicionales (percepción de seguridad)",
            "Necesidad de onboarding rápido sin sacrificar compliance"
        ],

        solution: "Aplicamos User-Centered Design radical: simplificamos flujos de carga y visualización de tasas con un lenguaje visual limpio y casi 'consumer'. Transparencia total: cada comisión es explicada, cada cálculo es visible. La plataforma se siente como una app de consumo ágil, reduciendo la fricción y la ansiedad financiera.",

        approach: "Design Thinking iterativo: 5 rondas de testing con usuarios reales (PYMEs) antes del desarrollo. Cada pantalla se validó con métricas de comprensión y tiempo de tarea.",

        process: [
            {
                name: "Research & Discovery",
                duration: "4 semanas",
                deliverables: ["User Interviews (25 PYMEs)", "Journey Mapping", "Pain Point Analysis", "Competitor Teardown"],
                highlights: "Descubrimos que el 82% abandona por 'no entender las condiciones'"
            },
            {
                name: "Ideation & Wireframing",
                duration: "3 semanas",
                deliverables: ["User Flows", "Lo-fi Wireframes", "Information Architecture"],
                highlights: "Redujimos flujo de onboarding de 15 pasos a 4"
            },
            {
                name: "UI Design & Prototyping",
                duration: "6 semanas",
                deliverables: ["Design System", "Hi-fi Mockups", "Interactive Prototype"],
                highlights: "Sistema de componentes con 120+ elementos reutilizables"
            },
            {
                name: "Testing & Iteration",
                duration: "4 semanas",
                deliverables: ["Usability Testing (3 rounds)", "Heatmaps", "A/B Tests"],
                highlights: "Mejoramos task success rate de 58% a 94%"
            },
            {
                name: "Handoff & Launch Support",
                duration: "3 semanas",
                deliverables: ["Developer Handoff", "Component Documentation", "Launch QA"],
                highlights: "Colaboración diaria con equipo dev para pixel-perfect implementation"
            }
        ],

        metrics: [
            {
                value: "-50%",
                label: "Tiempo Onboarding",
                description: "De 15 min a 7.5 min promedio",
                icon: "clock"
            },
            {
                value: "4.8/5",
                label: "Satisfacción UX",
                description: "Rating en surveys post-transacción",
                icon: "star"
            },
            {
                value: "94%",
                label: "Task Success Rate",
                description: "Usuarios completan flujo sin ayuda",
                icon: "check-circle"
            },
            {
                value: "+65%",
                label: "Conversión",
                description: "De signup a primera transacción",
                icon: "trending-up"
            }
        ],

        conversionMetrics: {
            conversionRate: "12.8% (signup to transaction)",
            bounceRate: "8%",
            avgSessionDuration: "8:30 min",
            pagesPerSession: "6.2"
        },

        businessImpact: {
            revenue: "+$180M CLP en volumen transaccionado (primer año)",
            roi: "450%",
            timeToMarket: "5 meses",
            customerSatisfaction: "4.8/5"
        },

        testimonial: {
            text: "Antes de Flipeame, el factoring era un dolor de cabeza. Ahora subo mis facturas en el almuerzo y tengo liquidez en horas. La interfaz es tan simple que mi contador pensó que era 'demasiado fácil para ser real'. Ese es el mejor cumplido.",
            author: "Patricia Rojas",
            role: "Dueña",
            company: "Ferretería Rojas (PYME)",
            rating: 5
        },

        userPersonas: [
            {
                name: "Carlos",
                age: "45-55",
                occupation: "Dueño PYME construcción",
                painPoints: [
                    "Necesita liquidez rápida para comprar materiales",
                    "Desconfianza en plataformas digitales",
                    "No entiende términos financieros complejos"
                ],
                goals: [
                    "Vender facturas en menos de 1 día",
                    "Entender exactamente cuánto recibirá",
                    "Sentir seguridad en la transacción"
                ]
            },
            {
                name: "Fernanda",
                age: "30-40",
                occupation: "CFO startup tech",
                painPoints: [
                    "Bancos tradicionales muy lentos",
                    "Necesita métricas y reportes para inversionistas",
                    "Quiere integración con su stack contable"
                ],
                goals: [
                    "Agilidad en financiamiento",
                    "Transparencia total en costos",
                    "Experiencia digital fluida"
                ]
            }
        ],

        keyFeatures: [
            {
                title: "Calculadora Transparente",
                description: "Visualización en tiempo real de tasas, comisiones y monto final a recibir",
                impact: "Incrementó confianza: 88% completa simulación antes de signup"
            },
            {
                title: "Upload Inteligente",
                description: "OCR que extrae datos de facturas PDF automáticamente",
                impact: "Redujo tiempo de carga de facturas en 80%"
            },
            {
                title: "Dashboard de Salud Financiera",
                description: "Panel que muestra flujo de caja proyectado basado en facturas pendientes",
                impact: "Feature más valorada: 92% lo usa semanalmente"
            },
            {
                title: "Onboarding Progresivo",
                description: "Solicita info mínima para empezar, completa perfil gradualmente",
                impact: "Signup completion rate: 87% (industria: 45%)"
            }
        ],

        designPhilosophy: "Finanzas sin ansiedad. Cada interacción debe reducir estrés, no aumentarlo. Micro-copy empático, visualizaciones claras, feedback inmediato. Inspiración en apps de consumo (no en banca tradicional).",

        lessonsLearned: [
            "Los usuarios PYME valoran simplicidad sobre features avanzadas",
            "La confianza se construye con transparencia radical, no con badges de seguridad",
            "El onboarding progresivo aumenta conversión sin reducir compliance",
            "El OCR de facturas fue el feature sorpresa más exitoso"
        ],

        futureEnhancements: [
            "Integración con softwares contables (Buk, Defontana)",
            "App móvil nativa con notificaciones push",
            "Marketplace de proveedores de financiamiento",
            "IA para predecir necesidades de liquidez"
        ],

        awards: [
            { name: "UX Design Awards", year: "2023", category: "Fintech Excellence" }
        ],

        tags: ["Fintech", "Product Design", "UX/UI", "Factoring", "Design System", "User Research"],
        featured: true,
        trending: false,
        order: 7,
        status: "published",
        visibility: "public"
    },

    {
        id: "cordoneria-chike",
        slug: "cordoneria-chike",
        title: "Cordonería Chike",
        subtitle: "Retail Design que Celebra el Oficio",
        description: "Revitalización de un negocio tradicional mediante Retail Design e identidad visual que celebra el oficio manual y la cultura maker.",
        tagline: "Cuando la tradición se encuentra con la estética DIY",

        featuredImage: {
            src: cordoneriaChikeImg,
            alt: "Cordonería Chike Rebrand",
            category: 'brand',
            caption: "Sistema de identidad y retail design"
        },
        gallery: [
            {
                src: cordoneriaChikeImg,
                alt: "Store Interior",
                category: 'detail'
            },
            {
                src: cordoneriaGallery1,
                alt: "Product Display",
                category: 'detail'
            },
            {
                src: cordoneriaGallery2,
                alt: "Branding System",
                category: 'brand'
            }
        ],

        industry: "Retail & DIY",
        subIndustry: "Mercería & Crafts",
        services: ["Branding", "Retail Design", "Packaging", "Señalética", "Visual Merchandising"],
        techStack: ["Adobe Illustrator", "SketchUp", "Photoshop", "InDesign"],
        platforms: ["Print", "Physical Retail", "Packaging"],

        role: "Consultor de Marca & Retail Designer",
        context: "Agencia Zutra",
        year: "2023",
        duration: "10 semanas",
        projectType: "Branding",
        clientSize: "PYME",
        budget: "Low",
        liveDate: "Julio 2023",

        team: [
            { name: "Francisco Pérez", role: "Brand Consultant" },
            { name: "Isidora Lagos", role: "Retail Designer" },
            { name: "Martín Ugarte", role: "Graphic Designer" }
        ],

        challenge: "Un negocio histórico (40 años) estancado en un modelo de atención antiguo que alejaba a las nuevas generaciones. El espacio físico era oscuro, desorganizado y la marca no reflejaba la calidad de sus productos ni la expertise de sus dueños.",

        challenges: [
            "Local con distribución caótica y poca luz natural",
            "Cliente joven intimidado por ambiente 'de viejitos'",
            "Productos de calidad percibidos como genéricos",
            "Sin presencia digital (ni redes sociales)",
            "Competencia de grandes cadenas (Sodimac, Easy)"
        ],

        solution: "Diseñamos un sistema de marca 'Heritage Modernizado': tipografía robusta que evoca trabajo manual, paleta terrosa con acentos vibrantes. Reorganizamos la experiencia en tienda (Retail Design) por gamas cromáticas, transformando el caos en un showroom inspirador. Implementamos señalética clara y display de productos que invita a tocar. El local se convirtió en un espacio para la comunidad maker.",

        approach: "Retail design táctico: cambios de alto impacto con presupuesto limitado. Priorizamos señalética, color y organización sobre remodelación estructural. Co-diseño con los dueños para respetar su conocimiento del negocio.",

        process: [
            {
                name: "Store Audit & Strategy",
                duration: "2 semanas",
                deliverables: ["Customer Observation", "Sales Data Analysis", "Spatial Audit", "Competitor Visit"],
                highlights: "Identificamos que el 65% de los visitantes salía sin comprar por no encontrar productos"
            },
            {
                name: "Brand Identity",
                duration: "3 semanas",
                deliverables: ["Logo", "Brand Guidelines", "Color System", "Typography"],
                highlights: "Logotipo basado en nudos de cordón (guiño al oficio)"
            },
            {
                name: "Retail Design",
                duration: "3 semanas",
                deliverables: ["Store Layout", "Signage System", "Display Design", "Color-coding System"],
                highlights: "Reorganización por color aumentó ventas en categorías 'olvidadas'"
            },
            {
                name: "Implementation",
                duration: "2 semanas",
                deliverables: ["Signage Production", "Store Setup", "Staff Training", "Launch Event"],
                highlights: "Inauguración con taller DIY atrajo 80+ personas"
            }
        ],

        metrics: [
            {
                value: "+95%",
                label: "Conversión en Tienda",
                description: "Visitantes que compran vs antes del rediseño",
                icon: "shopping-cart"
            },
            {
                value: "+120%",
                label: "Ticket Promedio",
                description: "Incremento en monto promedio de compra",
                icon: "dollar-sign"
            },
            {
                value: "60%",
                label: "Clientes Nuevos",
                description: "Público 20-35 años post-rebrand",
                icon: "users"
            },
            {
                value: "+180%",
                label: "Engagement Instagram",
                description: "En cuenta creada post-rebrand",
                icon: "instagram"
            }
        ],

        businessImpact: {
            revenue: "+$18M CLP anuales",
            roi: "620%",
            customerSatisfaction: "4.7/5"
        },

        testimonial: {
            text: "Pensábamos que íbamos a cerrar. Los hijos no querían continuar el negocio porque 'estaba pasado de moda'. Hoy tenemos lista de espera para talleres y gente viene desde otras comunas. El local es el mismo, pero la energía es otra. Zutra nos salvó.",
            author: "Jorge Chike",
            role: "Propietario (2da Generación)",
            company: "Cordonería Chike",
            rating: 5
        },

        keyFeatures: [
            {
                title: "Sistema Cromático de Navegación",
                description: "Productos organizados por color (rojos, azules, verdes) con señalética matching",
                impact: "Tiempo de búsqueda -70%, ventas cruzadas +45%"
            },
            {
                title: "Display Táctil",
                description: "Muestrarios donde los clientes pueden tocar texturas y probar productos",
                impact: "Engagement aumentó, conversión en productos premium +80%"
            },
            {
                title: "Branding Heritage",
                description: "Identidad que honra 40 años de historia con estética contemporánea",
                impact: "Atrae jóvenes sin alejar clientes tradicionales"
            },
            {
                title: "Workshops Comunitarios",
                description: "Talleres DIY mensuales en tienda (macramé, tejido, bordado)",
                impact: "Generan 30% de ventas del mes siguiente"
            }
        ],

        designPhilosophy: "Retail como experiencia sensorial. El cliente debe sentir que descubre tesoros, no que compra insumos. Organización intuitiva, luz cálida, señalética artesanal. Cada visita debe inspirar a crear.",

        lessonsLearned: [
            "La reorganización por color fue más efectiva que por categoría",
            "Los clientes valoran poder tocar productos antes de comprar",
            "Los talleres generan comunidad y ventas recurrentes",
            "El branding físico (señalética, packaging) tiene más impacto que el digital para retail local"
        ],

        futureEnhancements: [
            "E-commerce para productos especializados",
            "Kits DIY pre-armados para proyectos populares",
            "Programa de fidelización con tarjeta sellable",
            "Colaboraciones con diseñadores locales para productos exclusivos"
        ],

        tags: ["Retail Design", "Branding", "Merchandising Visual", "Heritage Brand", "Community Building"],
        featured: false,
        trending: false,
        order: 8,
        status: "published",
        visibility: "public"
    }
];

// Utility exports
export const allIndustries = [...new Set(cases.map(c => c.industry))];
export const allServices = [...new Set(cases.flatMap(c => c.services))];
export const allTechStack = [...new Set(cases.flatMap(c => c.techStack))];
export const featuredCases = cases.filter(c => c.featured);
export const trendingCases = cases.filter(c => c.trending);
export const publishedCases = cases.filter(c => c.status === 'published');

// Helper functions
export function getCaseBySlug(slug: string): ZutraCaseStudy | undefined {
    return cases.find(c => c.slug === slug);
}

export function getCasesByIndustry(industry: string): ZutraCaseStudy[] {
    return cases.filter(c => c.industry === industry);
}

export function getCasesByService(service: string): ZutraCaseStudy[] {
    return cases.filter(c => c.services.includes(service));
}

export function getCasesByYear(year: string): ZutraCaseStudy[] {
    return cases.filter(c => c.year === year);
}