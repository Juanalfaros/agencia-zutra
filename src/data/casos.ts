import type { ImageMetadata } from 'astro';
import comprendemeImg from '../assets/img/casos/comprendeme.webp';
import cordoneriaChikeImg from '../assets/img/casos/cordoneria-chike.webp';
import feomalofeoImg from '../assets/img/casos/feomalofeo.webp';
import flipeameImg from '../assets/img/casos/flipeame.webp';
import tubingerImg from '../assets/img/casos/tubinger.webp';
import vibrandoKineImg from '../assets/img/casos/vibrando-kine.webp';

export interface CaseStudy {
    id: string;
    slug: string;
    title: string;
    description: string;
    image: ImageMetadata;
    gallery: ImageMetadata[];

    // Taxonomies
    industry: string; // e.g., "Salud & Bienestar", "Fintech", "Retail"
    services: string[]; // e.g., "Branding", "UI/UX", "Desarrollo"
    techStack: string[]; // e.g., "Astro", "React", "Figma"

    // Details
    role: string;
    context: string;
    year: string;
    websiteUrl?: string;

    // Rich Content
    challenge: string;
    solution: string;
    metrics?: {
        value: string;
        label: string;
    }[];
    testimonial?: {
        text: string;
        author: string;
        role: string;
    };

    order: number;
}

export const cases: CaseStudy[] = [
    {
        id: "iej",
        slug: "iej-e-commerce",
        title: "IEJ - Instituto Estudios Judiciales",
        description: "Lideramos la metamorfosis digital de una institución de prestigio, transformando un sitio estático en una plataforma transaccional de alto rendimiento que automatiza el ciclo de vida del estudiante.",
        image: flipeameImg,
        gallery: [flipeameImg],
        industry: "Educación & E-learning",
        services: ["Consultoría Estratégica", "Diseño UI/UX", "Desarrollo E-commerce", "Integración de Sistemas"],
        techStack: ["WordPress", "WooCommerce", "Figma", "PHP Custom", "Webpay Plus"],
        role: "Lead Designer & Full Stack Developer",
        context: "Agencia Zutra",
        year: "2023",
        websiteUrl: "https://www.iej.cl",
        challenge: "El Instituto de Estudios Judiciales enfrentaba una brecha crítica entre su prestigio académico y su presencia digital. El proceso de matriculación era una odisea de correos manuales, transferencias bancarias sin verificar y bases de datos fragmentadas. \n\nEl desafío no era solo estético; era operativo. Necesitábamos diseñar un flujo que permitiera la venta de programas académicos complejos (con diferentes modalidades de pago y requisitos de inscripción) mientras manteníamos una interfaz sobria que inspirara confianza en un público profesional jurídico altamente exigente.",
        solution: "Diseñamos una arquitectura de información centrada en la conversión, simplificando la navegación por un catálogo extenso de cursos y magísteres. Implementamos una solución robusta sobre WooCommerce con personalizaciones profundas en PHP para manejar las particularidades del sistema educativo chileno.\n\nLa solución incluyó la automatización completa de la pasarela de pagos y la generación de boletas, permitiendo que la administración se centrara en la calidad educativa en lugar de la burocracia. El resultado fue una plataforma donde la experiencia de usuario guía al profesional desde el descubrimiento del programa hasta el acceso inmediato a su aula virtual, eliminando cualquier fricción en el embudo de ventas.",
        metrics: [
            { value: "+150%", label: "Incremento en Ventas Online" },
            { value: "100%", label: "Automatización de Matrículas" },
            { value: "-70%", label: "Carga Administrativa" }
        ],
        order: 1
    },
    {
        id: "isinova",
        slug: "isinova-infraestructura-lms",
        title: "Isinova",
        description: "Construcción de una identidad tecnológica vanguardista y una plataforma web de alto performance diseñada para capturar leads en el competitivo sector de la infraestructura digital.",
        image: comprendemeImg,
        gallery: [comprendemeImg],
        industry: "Tecnología & SaaS",
        services: ["Branding Corporativo", "Product Design", "Desarrollo Web Headless", "Inbound Marketing"],
        techStack: ["Astro", "Tailwind CSS", "Brevo CRM", "Google Tag Manager", "Vercel"],
        role: "Branding & Tech Lead",
        context: "Agencia Zutra",
        year: "2024",
        websiteUrl: "https://www.isinova.cl",
        challenge: "Isinova, expertos en infraestructura para aprendizaje digital, operaba en un mercado saturado de consultoras TI con estéticas genéricas y webs lentas que no convertían. Su principal dolor era la falta de una voz propia que proyectara su capacidad técnica y su enfoque innovador. \n\nNecesitaban una herramienta de ventas que no solo fuera una 'cara bonita', sino una plataforma optimizada para el SEO y la generación de demanda, capaz de explicar conceptos técnicos complejos de forma visualmente atractiva y fácil de digerir para tomadores de decisiones.",
        solution: "Abordamos el proyecto desde el 'Core Web Vitals', utilizando Astro para garantizar una velocidad de carga instantánea y un SEO impecable. Desarrollamos una identidad visual 'jugada', con una paleta cromática vibrante y tipografías que comunican solidez y futuro. \n\nPara potenciar el negocio, integramos un ecosistema de marketing automation con Brevo y GTM, permitiendo a Isinova rastrear el comportamiento del usuario y nutrir leads de forma automática. El sitio web se transformó de un folleto digital a una máquina activa de prospección comercial que posiciona a la marca como líder indiscutido en su nicho.",
        order: 2
    },
    {
        id: "comprendeme",
        slug: "comprendeme-psicologia",
        title: "Comprende.me",
        description: "Digitalización de la práctica clínica mediante un ecosistema 'frictionless' que une diseño empático con automatización avanzada para la gestión de pacientes.",
        image: comprendemeImg,
        gallery: [comprendemeImg],
        industry: "Salud & Bienestar",
        services: ["Estrategia UX", "Desarrollo Web Full Stack", "Automatización de Procesos", "SEO de Contenidos"],
        techStack: ["Astro 5", "Contentful CMS", "Cal.com API", "Cloudflare Pages", "Tailwind"],
        role: "Diseño y Desarrollo Full Stack",
        context: "Agencia Zutra",
        year: "2024",
        websiteUrl: "https://www.comprende.me",
        challenge: "La psicóloga clínica detrás de Comprende.me sufría el 'burnout' de la gestión administrativa: coordinar citas por WhatsApp era una tarea interminable que interrumpía su labor terapéutica. Además, su presencia en redes sociales era volátil y necesitaba un 'hogar digital' donde su contenido educativo tuviera permanencia y autoridad. \n\nEl desafío era crear una plataforma que fuera acogedora y profesional, pero que tecnológicamente fuera lo suficientemente potente como para manejar agendas, recordatorios y pagos sin intervención humana.",
        solution: "Desarrollamos una Single Page Application (SPA) con Astro 5, priorizando la accesibilidad y la calma visual. La integración crítica se realizó con la API de Cal.com para un agendamiento inteligente que considera zonas horarias y tiempos de descanso, y Contentful como Headless CMS para que la especialista gestione su blog con total autonomía. \n\nEl flujo de usuario fue diseñado para reducir la ansiedad: desde que un paciente busca un síntoma en Google hasta que agenda su primera sesión, todo ocurre de forma fluida y automatizada. La plataforma no solo mejoró su calidad de vida, sino que elevó su tasa de conversión de pacientes orgánicos significativamente.",
        metrics: [
            { value: "0.2s", label: "Tiempo de Carga (LCP)" },
            { value: "100%", label: "Automatización de Agenda" },
            { value: "+40%", label: "Conversión de Leads" }
        ],
        order: 3
    },
    {
        id: "feomalofeo",
        slug: "feo-malo-feo-productora",
        title: "Feo Malo Feo",
        description: "Dirección de arte y branding disruptivo para una productora de contenidos que rompe los moldes de la comedia tradicional con una estética brutalista y memorable.",
        image: feomalofeoImg,
        gallery: [feomalofeoImg],
        industry: "Entretenimiento & Media",
        services: ["Brand Strategy", "Dirección de Arte", "Diseño de Sistema Visual", "Social Media Assets"],
        techStack: ["Illustrator", "Photoshop", "After Effects", "Figma"],
        role: "Creative Director",
        context: "Agencia Zutra",
        year: "2023",
        challenge: "El mercado del entretenimiento digital y el stand-up está saturado de visuales genéricos y coloridos infantiles. 'Feo Malo Feo' necesitaba una identidad que fuera un manifiesto en sí misma: irreverente, cruda y con una personalidad tan fuerte que fuera imposible de ignorar en el feed de Instagram o en un afiche callejero. \n\nEl reto era crear un sistema visual que pudiera escalar desde miniaturas de YouTube hasta escenografías para shows en vivo, manteniendo siempre una coherencia que comunicara profesionalismo detrás del caos creativo.",
        solution: "Creamos un lenguaje visual basado en el 'Brutalismo Pop'. Utilizamos tipografías de alto impacto (bold e industriales) y una paleta de colores ácidos que generan contraste inmediato. No diseñamos un logo, diseñamos un sistema de marca flexible que permite a los creadores de contenido 'romper' la gráfica manteniendo la esencia. \n\nEntregamos un kit de herramientas visuales modular que permite la producción rápida de assets para podcasts y eventos, asegurando que la marca sea reconocida instantáneamente por su audiencia, sin importar el formato o el canal.",
        order: 4
    },
    {
        id: "vibrando-kine",
        slug: "vibrando-kine",
        title: "Vibrando Kine",
        description: "Redefiniendo la identidad visual de la kinesiología a través de un concepto de marca basado en el movimiento, la vitalidad y la rehabilitación activa.",
        image: vibrandoKineImg,
        gallery: [vibrandoKineImg],
        industry: "Salud & Bienestar",
        services: ["Concept Design", "Identidad de Marca", "Visual Stationery"],
        techStack: ["Illustrator", "Figma", "Indesign"],
        role: "Diseñador de Marca",
        context: "Proyecto Freelance",
        year: "2023",
        challenge: "La mayoría de las clínicas de kinesiología utilizan una iconografía desgastada: columnas vertebrales, manos o siluetas humanas estáticas en tonos azules fríos. 'Vibrando' buscaba distanciarse de la idea de 'paciente enfermo' para enfocarse en la 'persona en movimiento'. \n\nEl desafío era proyectar seriedad clínica y conocimiento técnico, pero con una capa de calidez y energía que motivara a los pacientes en sus procesos de recuperación a menudo largos y tediosos.",
        solution: "Desarrollamos una identidad centrada en la 'vibración cinética'. El isotipo utiliza formas orgánicas que sugieren ondas de energía y progresión. La paleta cromática combina el equilibrio del verde menta con la energía del coral, creando un ambiente visual que se siente fresco y revitalizante. \n\nEste nuevo lenguaje visual se aplicó en toda la papelería corporativa y redes sociales, logrando una diferenciación inmediata en el sector y construyendo una percepción de marca premium que justifica el valor de sus servicios especializados.",
        metrics: [
            { value: "100%", label: "Diferenciación Visual" },
            { value: "Top-of-mind", label: "Posicionamiento Local" }
        ],
        order: 5
    },
    {
        id: "tubinger",
        slug: "cerveceria-tubinger",
        title: "Tübinger",
        description: "Modernización integral de una marca icónica de cerveza artesanal: del rediseño de packaging a la ejecución de una estrategia digital 'lifestyle'.",
        image: tubingerImg,
        gallery: [tubingerImg],
        industry: "Consumo Masivo (FMCG)",
        services: ["Dirección de Arte", "Packaging Design", "Estrategia Digital", "Fotografía de Producto"],
        techStack: ["Adobe Suite", "Shopify", "Meta Business Suite", "Lightroom"],
        role: "Director de Arte In-House",
        context: "Equipo Interno",
        year: "2019 - 2022",
        websiteUrl: "https://cerveza-tubinger.cl",
        challenge: "Tübinger es un pionero en Chile, pero la explosión de nuevas micro-cervecerías con etiquetas llamativas amenazaba su relevancia en góndola. Su imagen se percibía 'tradicional' en un sentido negativo para el nuevo consumidor joven de cerveza artesanal. \n\nNecesitábamos revitalizar la marca para competir en el retail moderno y en el canal directo al consumidor (D2C), sin perder la herencia de calidad y pureza alemana que la caracteriza.",
        solution: "Lideré un refresh de marca que incluyó el rediseño sistémico de más de 12 etiquetas, mejorando la jerarquía de información y el 'shelf-appeal'. Implementamos una dirección de arte fotográfica centrada en el consumo real y la frescura de los ingredientes. \n\nEn el ámbito digital, optimizamos su plataforma de e-commerce y lanzamos campañas segmentadas que no solo vendían cerveza, sino una cultura. Logramos construir una comunidad orgánica sólida y posicionar a Tübinger como una marca que equilibra perfectamente el oficio cervecero con la modernidad urbana.",
        metrics: [
            { value: "+25k", label: "Comunidad en Instagram" },
            { value: "12+", label: "Productos Rediseñados" },
            { value: "Premium", label: "Percepción de Marca" }
        ],
        order: 6
    },
    {
        id: "flipeame",
        slug: "flipeame-fintech",
        title: "Flipeame!",
        description: "Diseño de una experiencia Fintech centrada en la transparencia y la velocidad, facilitando el acceso al factoring para PYMEs mediante una interfaz intuitiva y humana.",
        image: flipeameImg,
        gallery: [flipeameImg],
        industry: "Fintech",
        services: ["UI/UX Strategy", "Branding Estratégico", "Diseño de Producto Digital"],
        techStack: ["Figma", "Illustrator", "Design Systems"],
        role: "UX/UI Design Lead",
        context: "Agencia MediaDream",
        year: "2022",
        challenge: "El factoring suele ser un mundo de letras chicas y procesos tediosos que intimidan a los dueños de pequeñas empresas. Flipeame nació para romper esa barrera. El reto era diseñar una marca y una plataforma que destilara confianza inmediata y que transformara un proceso financiero complejo en algo tan simple como un par de clics.",
        solution: "Adoptamos un enfoque de 'Diseño Centrado en el Usuario' para simplificar el flujo de carga de facturas y visualización de tasas. La interfaz utiliza un lenguaje visual limpio, con micro-interacciones que guían al usuario y reducen la carga cognitiva. \n\nLa marca 'Flipeame' fue construida sobre conceptos de agilidad y alivio financiero, utilizando una paleta de colores eléctrica que se aleja del aburrido 'azul banco'. El resultado fue una plataforma que no solo funciona impecablemente, sino que se siente cercana, logrando métricas de satisfacción de usuario sobresalientes.",
        metrics: [
            { value: "-50%", label: "Tiempo de Onboarding" },
            { value: "4.8/5", label: "Satisfacción del Usuario" }
        ],
        order: 7
    },
    {
        id: "cordoneria-chike",
        slug: "cordoneria-chike",
        title: "Cordonería Chike",
        description: "Revitalización de un negocio tradicional mediante el diseño de experiencia en tienda y una identidad visual que celebra el valor del oficio manual.",
        image: cordoneriaChikeImg,
        gallery: [cordoneriaChikeImg],
        industry: "Retail & DIY",
        services: ["Branding", "Retail Design", "Visual Merchandising", "Packaging"],
        techStack: ["SketchUp", "Illustrator", "AutoCAD"],
        role: "Branding & Retail Consultant",
        context: "Proyecto Freelance",
        year: "2023",
        challenge: "Cordonería Chike, un negocio con décadas de trayectoria, se encontraba estancado en un modelo de atención de mostrador antiguo que alejaba a las nuevas generaciones de tejedores y entusiastas del DIY. El espacio físico era oscuro y la marca no reflejaba la explosión de color y textura de sus productos.",
        solution: "Diseñamos un sistema de marca 'Heritage' que rescata la tipografía clásica pero la limpia para el ojo moderno. Para la tienda física, propusimos un cambio radical de 'Retail Design': eliminamos las barreras visuales y creamos un sistema de organización por gamas cromáticas que transforma el local en un showroom inspirador. \n\nEl proyecto incluyó el diseño de packaging eco-amigable y zonas de 'experiencia' donde los clientes pueden probar materiales. Esta transformación convirtió a la cordonería en un punto de referencia para la comunidad creativa local, aumentando el ticket promedio y atrayendo a un segmento de clientes mucho más joven.",
        order: 8
    }
];

export const allIndustries = [...new Set(cases.map(c => c.industry))];
export const allServices = [...new Set(cases.flatMap(c => c.services))];
