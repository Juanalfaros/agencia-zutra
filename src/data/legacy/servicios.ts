export interface ServiceFeatures {
    title: string;
    description: string;
}

export interface Service {
    id: string;
    slug: string;
    title: string;
    badge?: string;
    category: string;
    tags: string[];
    description: string; // Short description for cards
    longDescription: string; // HTML/Markdown for detail page
    details: string[]; // Legacy/Quick list
    features: ServiceFeatures[]; // Detailed features
    benefits: string[]; // "What you get"
    deliverables?: string[];
    result?: string;
    icon?: string;
    featuredImage?: any;
    featured?: boolean;
    priceAmount?: string;
    priceMeta?: string;
    order: number;
}

export interface ServiceCategory {
    id: string; // slug
    label: string; // name
    order: number;
}

// Taxonomies for easier filtering
export const categories = [
    { id: 'desarrollo', label: 'Desarrollo & Web', order: 1 },
    { id: 'marketing', label: 'Marketing Directo', order: 2 },
    { id: 'visual', label: 'Identidad Visual', order: 3 }
];

export const services: Service[] = [
    {
        id: "web-landing",
        slug: "desarrollo-web-landings",
        title: "Web Corporativa & Landing Pages",
        badge: "CORE",
        category: "desarrollo",
        tags: ["Astro", "SEO Técnico", "Conversión", "Velocidad"],
        description: "Sitios rápidos y landings de venta. Sin vueltas, enfocados en convertir.",
        longDescription: `
            <p>Tu sitio web no es un adorno, es tu mejor vendedor. En Zutra nos enfocamos en el <strong>rendimiento técnico y la conversión</strong>. Olvídate de sitios pesados que nadie visita; desarrollamos plataformas ligeras, optimizadas para Google (SEO) y diseñadas para que el usuario tome acción.</p>
            <p>Ya sea una Landing Page para una campaña específica que necesitas sacar en 48 horas, o un sitio corporativo robusto para validar tu empresa, usamos tecnología moderna (Astro, Next.js) para asegurar que cargue al instante y no se rompa con mirarlo.</p>
        `,
        details: [
            "Landing Pages de alta conversión",
            "Sitios Corporativos autoadministrables",
            "SEO técnico avanzado desde el día 1"
        ],
        features: [
            {
                title: "Desarrollo a Medida (No Plantillas Lentas)",
                description: "Código limpio y optimizado. Usamos tecnologías modernas para que tu web vuele, no Wordpress pesados llenos de plugins basura."
            },
            {
                title: "Landing Pages de Venta",
                description: "Estructuras diseñadas para vender: título gancho, manejo de objeciones y llamados a la acción claros."
            },
            {
                title: "SEO Técnico & Semántico",
                description: "Dejamos tu sitio listo para que Google lo entienda perfectamente. Estructura de datos, sitemaps y metadatos correctos."
            }
        ],
        benefits: [
            "Cargas en menos de 1 segundo (Google ama esto).",
            "Diseño que se adapta perfecto a celulares.",
            "Independencia técnica: no necesitas llamarnos para cambiar un texto."
        ],
        result: "Resultado: Una web profesional que vende y posiciona.",
        priceAmount: "Desde $450.000",
        priceMeta: "CLP (Pago único)",
        order: 1
    },
    {
        id: "email-marketing",
        slug: "email-marketing-newsletters",
        title: "Email Marketing & Newsletters",
        badge: "RENTABILIDAD",
        category: "marketing",
        tags: ["HTML", "Automatización", "Newsletter", "Ventas"],
        description: "El canal con mayor retorno. Diseño HTML perfecto y automatización.",
        longDescription: `
            <p>Las redes sociales son prestadas, tu lista de correos es tuya. El <strong>Email Marketing</strong> es, estadísticamente, el canal que más retorno de inversión genera. Pero no sirve de nada si tus correos se ven mal o caen en Spam.</p>
            <p>En Zutra nos especializamos en la maquetación técnica (HTML/MJML) para asegurar que tu correo se vea perfecto en cualquier dispositivo, y en la configuración de flujos automatizados que venden por ti mientras duermes. Desde newsletters editoriales hasta secuencias de bienvenida y recuperación de carritos.</p>
        `,
        details: [
            "Diseño y maquetación HTML (MJML)",
            "Configuración de plataformas (Brevo/Mailchimp)",
            "Secuencias automatizadas de venta"
        ],
        features: [
            {
                title: "Maquetación HTML Perfecta",
                description: "Usamos código (MJML) para garantizar que tu diseño no se rompa en Outlook, Gmail o iPhone. Se ve bien donde sea."
            },
            {
                title: "Automatización de Flujos",
                description: "Configuramos secuencias: Bienvenida, Carrito Abandonado, Nutrición de Leads. Vende sin estar presente."
            },
            {
                title: "Setup de Entregabilidad",
                description: "Configuramos tus dominios (DKIM, SPF, DMARC) para que tus correos lleguen a la bandeja de entrada, no a Spam."
            }
        ],
        benefits: [
            "Canal de venta directa sin algoritmos de por medio.",
            "Diseños profesionales que elevan la percepción de tu marca.",
            "Recuperación de ventas que dabas por perdidas."
        ],
        result: "Resultado: Comunidad fiel y ventas recurrentes.",
        priceAmount: "Desde $200.000",
        priceMeta: "CLP / Mensual o por Pack",
        order: 2
    },
    {
        id: "ecommerce",
        slug: "ecommerce-tiendas-online",
        title: "E-Commerce & Tiendas Online",
        badge: "VENTAS",
        category: "desarrollo",
        tags: ["Shopify", "Woocommerce", "Pasarelas de Pago", "Catálogos"],
        description: "Vende productos 24/7. Tiendas robustas y fáciles de gestionar.",
        longDescription: `
            <p>Tener un e-commerce no es solo subir fotos de productos. Es tener una tienda que inspire confianza, facilite el pago y gestione el stock sin volverte loco. Desarrollamos tiendas online pensadas para la escalabilidad.</p>
            <p>Nos encargamos de lo difícil: pasarelas de pago chilenas, cálculo de envíos y estructura de categorías, para que tú solo te preocupes de despachar los pedidos.</p>
        `,
        details: [
            "Tiendas completas en Shopify o Woocommerce",
            "Integración de pagos y envíos locales",
            "Optimización de fichas de producto"
        ],
        features: [
            {
                title: "Pasarelas de Pago Locales",
                description: "Integración fluida con Webpay, MercadoPago o VentiPay. Cobra sin problemas."
            },
            {
                title: "Gestión de Catálogo",
                description: "Te entregamos el sistema listo para que cargar productos nuevos sea cosa de niños."
            },
            {
                title: "Experiencia de Compra (UX)",
                description: "Reducimos los clics necesarios para comprar. Menos fricción, más ventas."
            }
        ],
        benefits: [
            "Ventas automáticas 24/7.",
            "Control total de tu inventario y clientes.",
            "Sistema escalable que crece con tus ventas."
        ],
        result: "Resultado: Tu negocio facturando online.",
        priceAmount: "Desde $650.000",
        priceMeta: "CLP",
        order: 3
    },
    {
        id: "branding",
        slug: "identidad-corporativa",
        title: "Branding & Identidad Visual",
        badge: "DISEÑO",
        category: "visual",
        tags: ["Logotipos", "Papelería", "Manual de Marca", "Imagen"],
        description: "Marcas con carácter. Dejamos de lado lo genérico.",
        longDescription: `
            <p>Una marca no es solo un logo bonito. Es cómo te perciben tus clientes antes de hablar contigo. En Zutra creamos identidades visuales con carácter, diseñadas para destacar en un mercado saturado de plantillas iguales.</p>
            <p>Te entregamos un sistema visual completo: desde el logotipo hasta la papelería y los elementos gráficos que usarás en el día a día. Hacemos que tu empresa se vea más cara de lo que cobra.</p>
        `,
        details: [
            "Diseño de Logotipo",
            "Manual de uso de marca",
            "Papelería corporativa y digital"
        ],
        features: [
            {
                title: "Logotipos Versátiles",
                description: "Marcas que funcionan igual de bien en un icono de app de 1cm que en un letrero gigante."
            },
            {
                title: "Identidad Visual Completa",
                description: "Definición de colores, tipografías y tramas. Coherencia en todos lados."
            },
            {
                title: "Archivos Listos para Imprenta/Web",
                description: "Te entregamos todos los formatos (Vectores, PNG, PDF) para que nunca sufras pixelación."
            }
        ],
        benefits: [
            "Diferenciación inmediata de la competencia.",
            "Mayor confianza por parte de nuevos clientes.",
            "Facilidad para crear nuevos materiales gráficos en el futuro."
        ],
        result: "Resultado: Una marca que inspira respeto.",
        priceAmount: "Desde $300.000",
        priceMeta: "CLP",
        order: 4
    },
    {
        id: "social-assets",
        slug: "kits-redes-sociales",
        title: "Kits Visuales para RRSS",
        badge: "SOPORTE",
        category: "visual",
        tags: ["Plantillas Canva", "Diseño Feed", "Assets", "Autonomía"],
        description: "Tú gestionas, nosotros diseñamos. Plantillas y mantención estética.",
        longDescription: `
            <p>Seamos honestos: el crecimiento orgánico mágico no existe sin inversión o sin poner la cara en video. Por eso, no te vendemos humo. Te ofrecemos <strong>herramientas y diseño</strong>.</p>
            <p>Nuestro servicio de Redes Sociales está enfocado en la "Mantención Corporativa" y la "Autonomía". Diseñamos grillas profesionales y plantillas editables (Canva/Figma) para que tú o tu equipo mantengan las redes activas y estéticas sin depender de una agencia mes a mes para subir un post.</p>
        `,
        details: [
            "Diseño de Grillas / Feed Estático",
            "Plantillas editables en Canva/Figma",
            "Gestión corporativa (solo planes con inversión)"
        ],
        features: [
            {
                title: "Plantillas Editables (Autonomía)",
                description: "Te dejamos todo listo en Canva o Figma. Tú solo cambias la foto y el texto. Ahorra costos mensuales."
            },
            {
                title: "Diseño de Feed Corporativo",
                description: "Ideal para marcas que necesitan validación. Que quien te busque vea una empresa sólida, no un perfil abandonado."
            },
            {
                title: "Condición de Gestión",
                description: "Si deseas que nosotros gestionemos y publiquemos, trabajamos bajo esquemas de inversión publicitaria (Ads) para garantizar resultados."
            }
        ],
        benefits: [
            "Ahorro significativo en fees mensuales de agencia.",
            "Control total de tus tiempos de publicación.",
            "Imagen profesional constante sin depender de la creatividad diaria."
        ],
        result: "Resultado: Redes profesionales sin esclavitud mensual.",
        priceAmount: "Desde $250.000",
        priceMeta: "CLP (Pack de Activos)",
        order: 5
    },
    {
        id: "mantenimiento",
        slug: "partner-digital-mantenimiento",
        title: "Partner Digital & Mantenimiento",
        badge: "RECURRENTE",
        category: "tecnologia",
        tags: ["Soporte", "Hosting", "Actualizaciones", "Tranquilidad"],
        description: "Tu departamento digital externo. Soporte técnico y gráfico mensual.",
        longDescription: `
            <p>Este es el servicio que te da paz mental y a nosotros nos permite ser tu socio real. Sabemos que las webs se rompen, los plugins de Wordpress fallan, o simplemente necesitas cambiar un banner y no tienes tiempo de aprender a diseñar.</p>
            <p>Con este plan, nos convertimos en tu departamento digital externalizado. No es solo hosting; es tener a Zutra en marcación rápida para solucionar problemas técnicos, realizar ajustes gráficos pequeños o asegurarnos de que tu negocio no se caiga nunca. Es la base operativa para que tú te dediques a vender.</p>
        `,
        details: [
            "Hosting de alta velocidad incluido",
            "Bolsa de horas para ajustes gráficos/web",
            "Monitoreo de seguridad y respaldos"
        ],
        features: [
            {
                title: "Hosting & Dominio Gestionado",
                description: "Olvídate de configurar DNS o pelear con servidores. Nosotros ponemos la casa y nos aseguramos que sea rápida y segura."
            },
            {
                title: "Bolsa de Horas Mensual",
                description: "¿Necesitas cambiar una foto? ¿Subir un producto nuevo? ¿Rediseñar un banner? Lo hacemos nosotros. Sin cotizaciones lentas de por medio."
            },
            {
                title: "Seguridad y Actualizaciones",
                description: "Mantenemos el motor aceitado. Actualizaciones de seguridad, renovación de certificados SSL y copias de seguridad automáticas."
            }
        ],
        benefits: [
            "Respuesta prioritaria ante cualquier urgencia.",
            "Costos fijos: sabes exactamente cuánto pagas a fin de mes.",
            "Tu sitio web y activos digitales no envejecen, evolucionan mes a mes."
        ],
        result: "Resultado: Tu negocio digital siempre operativo y actualizado.",
        priceAmount: "$200.000",
        priceMeta: "CLP / Mensual (Cupos limitados)",
        order: 6
    }
];