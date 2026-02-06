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
    result?: string;
    priceAmount?: string;
    priceMeta?: string;
    order: number;
}

// Taxonomies for easier filtering
export const categories = [
    { id: 'estrategia', label: 'Estrategia & Growth' },
    { id: 'creatividad', label: 'Creatividad & Diseño' },
    { id: 'tecnologia', label: 'Tecnología & Operaciones' }
];

export const services: Service[] = [
    {
        id: "plataforma",
        slug: "plataforma-de-lanzamiento",
        title: "Plataforma de lanzamiento",
        badge: "FUNDACIONAL",
        category: "tecnologia",
        tags: ["Desarrollo Web", "SEO", "Analytics", "Ecommerce"],
        description: "De cero a presencia que convierte. Tu base digital sólida.",
        longDescription: `
            <p>No hacemos webs "bonitas"; construimos <strong>activos digitales de alto rendimiento</strong>. En un ecosistema donde la atención dura milisegundos, tu sitio web no puede ser solo una tarjeta de presentación: debe ser tu mejor vendedor, operativo 24/7.</p>
            <p>Este servicio es la base fundacional para cualquier negocio que tome en serio su crecimiento. Combinamos arquitectura de información persuasiva, diseño visual agresivo y una infraestructura técnica impecable para asegurar que cada visita tenga la máxima probabilidad de convertirse en cliente.</p>
            <h3>¿Por qué "Plataforma" y no solo "Web"?</h3>
            <p>Porque una web aislada no sirve. Entregamos un ecosistema conectado: pixel de seguimiento, eventos de conversión configurados, CRM integrado y velocidad de carga optimizada para Core Web Vitals. Es el portaaviones desde donde despegan todas tus campañas.</p>
        `,
        details: [
            "Brand kit con criterio comercial",
            "Web (corporativa o e-commerce) lista para crecer",
            "SEO base + analítica y tracking"
        ],
        features: [
            {
                title: "Arquitectura Persuasiva",
                description: "Diseñamos flujos de navegación pensados para la conversión, no para el ego del diseñador."
            },
            {
                title: "Stack Tecnológico Moderno",
                description: "Astro, React o Next.js. Nada de plantillas de Wordpress lentas e inseguras que se rompen solas."
            },
            {
                title: "Analítica Avanzada",
                description: "Google Analytics 4 y Tag Manager configurados profesionales para medir lo que importa: dinero, no clicks."
            },
            {
                title: "SEO Técnico Impecable",
                description: "Estructura semántica, metadatos optimizados y sitemaps listos para indexar desde el día 1."
            }
        ],
        benefits: [
            "Velocidad de carga < 2s para mejorar Quality Score en Ads.",
            "Autonomía total para editar contenidos básicos.",
            "Integración nativa con tu CRM o herramientas de email marketing.",
            "Seguridad robusta sin necesidad de plugins constantes."
        ],
        result: "Resultado: capta, mide y mejora desde el día 1.",
        priceAmount: "Desde $850.000",
        priceMeta: "CLP",
        order: 1
    },
    {
        id: "identidad",
        slug: "identidad-y-diseno",
        title: "Identidad & diseño",
        badge: "CREATIVO",
        category: "creatividad",
        tags: ["Branding", "Diseño Gráfico", "UI Kit", "Social Media"],
        description: "Estética valiente, hecha para vender. Diferenciación radical.",
        longDescription: `
            <p>El mercado es ruidoso. <strong>La timidez es un suicidio comercial.</strong> Nuestra filosofía de diseño se basa en la "Diferenciación Radical": creamos identidades visuales que polarizan, que se recuerdan y que comunican autoridad inmediata.</p>
            <p>No te entregamos un logo y "buena suerte". Te armamos un arsenal visual operativo. Desde la tipografía que grita tu nombre hasta las plantillas de redes sociales que tu equipo usará el lunes por la mañana. Todo está diseñado con un propósito: vender la visión de tu empresa antes de que leas la primera línea de texto.</p>
        `,
        details: [
            "Logo + manual accionable",
            "Plantillas sociales que rinden",
            "Piezas impresas/digitales con foco en KPIs"
        ],
        features: [
            {
                title: "Sistema Visual Escalable",
                description: "No solo un logo, sino un lenguaje visual completo (colores, tipografías, tramas) listo para usar."
            },
            {
                title: "Assets Operativos",
                description: "Plantillas de Instagram, LinkedIn, presentaciones de ventas y firmas de correo. Herramientas, no adornos."
            },
            {
                title: "Manual de Marca 'Anti-Bullshit'",
                description: "Reglas claras y directas de cómo usar la marca. Sin teoría del color aburrida, solo ejecución."
            },
            {
                title: "Dirección de Arte",
                description: "Curaduría de estilo fotográfico e iconografía para que nunca más uses fotos de stock genéricas."
            }
        ],
        benefits: [
            "Reconocimiento de marca instantáneo en el scroll infinito.",
            "Coherencia visual que aumenta la percepción de valor de tus precios.",
            "Ahorro de tiempo para tu equipo con plantillas listas para usar.",
            "Diferenciación real vs. competidores genéricos."
        ],
        result: "Resultado: reconocimiento y coherencia en cada punto de contacto.",
        priceAmount: "Desde $350.000",
        priceMeta: "CLP",
        order: 2
    },
    {
        id: "organico",
        slug: "contenido-organico",
        title: "Contenido orgánico",
        badge: "CRECIMIENTO",
        category: "estrategia",
        tags: ["Social Media Management", "Content Marketing", "Copywriting", "Video"],
        description: "Contenido que engancha y empuja demanda sin pagar ads.",
        longDescription: `
            <p>Publicar por publicar es quemar dinero. Nosotros operamos bajo la metodología de <strong>"Content as a Service"</strong>. Transformamos tu expertise técnico en piezas de contenido digeribles, entretenidas y altamente compartibles.</p>
            <p>Olvídate del "post del día de la madre". Creamos narrativas que educan a tu mercado, derriban objeciones de venta y posicionan a tu marca como la única opción lógica. Video corto vertical (Reels/TikTok), carruseles educativos de LinkedIn y copy persuasivo: todo enfocado en generar conversaciones de negocio.</p>
        `,
        details: [
            "Estrategia + calendario con hipótesis",
            "Video corto, carruseles y copies valientes",
            "Diseño y publicación con aprendizaje continuo"
        ],
        features: [
            {
                title: "Estrategia de Pilares de Contenido",
                description: "Definimos de qué hablar para atraer a tu cliente ideal, no likes vacíos."
            },
            {
                title: "Producción Multimedia Ágil",
                description: "Edición de video dinámico y diseño gráfico de alto impacto optimizado para algoritmos actuales."
            },
            {
                title: "Copywriting de Respuesta Directa",
                description: "Textos que no solo suenan bien, sino que invitan a la acción (hacer clic, comentar, comprar)."
            },
            {
                title: "Gestión y Publicación",
                description: "Nos encargamos de subir, etiquetar y gestionar la comunidad. Tú te enfocas en tu negocio."
            }
        ],
        benefits: [
            "Creación de audiencia propia que no depende de pagar pauta siempre.",
            "Nutrición de leads: vende sin vender mientras educas.",
            "Posicionamiento de autoridad para los fundadores/líderes.",
            "Feedback loop constante con el mercado para mejorar productos."
        ],
        result: "Resultado: engagement que convierte en conversaciones.",
        priceAmount: "Desde $450.000",
        priceMeta: "CLP / mes",
        order: 3
    },
    {
        id: "sprint",
        slug: "sprint-de-leads",
        title: "Sprint de leads (30 días)",
        badge: "ALTO IMPACTO",
        category: "estrategia",
        tags: ["Google Ads", "Meta Ads", "Landing Pages", "CRO"],
        description: "Oferta clara + pauta + landing CRO. Resultados rápidos.",
        longDescription: `
            <p>¿Necesitas caja rápido? El Sprint de Leads es nuestra <strong>operación de asalto comercial.</strong> En 30 días, diseñamos, lanzamos y optimizamos un embudo de ventas simplificado para capturar demanda existente.</p>
            <p>No hay teoría, solo ejecución. Creamos una oferta irresistible, montamos una Landing Page de alta conversión (separada de tu web si es necesario) e inyectamos tráfico cualificado vía Google o Meta Ads. Es la forma más rápida de validar una oferta o llenar el pipeline de ventas.</p>
        `,
        details: [
            "Landing con pruebas A/B",
            "Creatividades valientes + ads",
            "Tracking, optimización y reporte final"
        ],
        features: [
            {
                title: "Diseño de Oferta Irresistible",
                description: "Te ayudamos a empaquetar tu servicio para que sea estúpido decir que no."
            },
            {
                title: "High-Converting Landing Page",
                description: "Una sola página, un solo objetivo. Copywriting agresivo y diseño enfocado en el formulario."
            },
            {
                title: "Setup de Campañas Multicanal",
                description: "Google Ads (intención) y Meta Ads (interrupción) configurados con estructuras de prueba A/B."
            },
            {
                title: "Iteración Semanal",
                description: "No 'seteamos y olvidamos'. Ajustamos pujas, creativos y copys cada semana basándonos en datos."
            }
        ],
        benefits: [
            "Validación de mercado con dinero real en tiempo récord.",
            "Inyección inmediata de oportunidades al equipo de ventas.",
            "Datos claros sobre tu Costo por Adquisición (CPA).",
            "Sin contratos a largo plazo forzosos: probamos, ganamos, seguimos."
        ],
        result: "Resultado: pipeline medible y leads calificados en 30 días.",
        priceAmount: "Desde $550.000",
        priceMeta: "CLP + pauta",
        order: 4
    },
    {
        id: "web",
        slug: "soporte-web-evolutivo",
        title: "Soporte web evolutivo",
        badge: "CONTINUO",
        category: "tecnologia",
        tags: ["Mantenimiento", "Seguridad", "CRO", "Performance"],
        description: "Velocidad con criterio: tu web siempre lista para vender.",
        longDescription: `
            <p>Una web lanzada no es una web terminada. El <strong>Soporte Evolutivo</strong> es nuestro seguro contra la obsolescencia. No es solo 'actualizar plugins'; es mejorar proactivamente tu activo digital mes a mes.</p>
            <p>Nos convertimos en tu departamento IT externo. ¿Necesitas una landing para Black Friday? Hecho. ¿El sitio cargó lento ayer? Ya lo arreglamos. ¿Quieres probar un nuevo copy en el home? Subido. Mantén tu foco en el negocio, nosotros mantenemos la máquina aceitada.</p>
        `,
        details: [
            "Actualizaciones y contenidos sin fricción",
            "Promos, cupones y soporte a campañas",
            "Monitoreo de seguridad y performance"
        ],
        features: [
            {
                title: "Cambios Ilimitados de Contenido",
                description: "Sube posts, cambia precios, actualiza fotos. Solo mándanos un correo."
            },
            {
                title: "Optimización de Velocidad Continua",
                description: "Monitoreamos Core Web Vitals y ajustamos código para que Google te siga amando."
            },
            {
                title: "Seguridad Bancaria",
                description: "Backups diarios, firewalls y protección contra malware. Tu negocio no puede permitirse estar offline."
            },
            {
                title: "Consultoría Técnica",
                description: "Te asesoramos sobre nuevas integraciones o herramientas antes de que gastes dinero."
            }
        ],
        benefits: [
            "Paz mental total: tu web no se va a caer.",
            "Agilidad comercial: lanza campañas cuando quieras, nosotros respondemos.",
            "Mejora constante del SEO gracias a la frescura técnica.",
            "Costo predecible vs. pagar horas sueltas a precios de urgencia."
        ],
        result: "Resultado: una web que siempre funciona, sin dolores de cabeza.",
        priceAmount: "Desde $200.000",
        priceMeta: "CLP / mes",
        order: 5
    },
    {
        id: "automatizacion",
        slug: "auditoria-automatizacion",
        title: "Auditoría de automatización",
        badge: "EFICIENCIA",
        category: "tecnologia",
        tags: ["Zapier", "Make", "CRM", "IA"],
        description: "Menos horas manuales, más output. Escala sin contratar.",
        longDescription: `
            <p>Escalar no significa contratar a más personas para hacer tareas repetitivas. Significa <strong>automatizar lo aburrido para humanizar lo valioso</strong>. Nuestra auditoría entra en tus procesos, detecta vampiros de tiempo y los elimina con código y flujos.</p>
            <p>Conectamos tus herramientas (CRM, Email, Web, Facturación) para que hablen entre ellas. Desde que entra un lead hasta que se emite la factura, diseñamos  autopistas de datos invisibles que ahorran cientos de horas hombre al año. Tu equipo te lo agradecerá.</p>
        `,
        details: [
            "Mapeo de procesos y cuellos de botella",
            "Diseño de solución y automatización",
            "Implementación + training para el equipo"
        ],
        features: [
            {
                title: "Mapeo de Procesos (Blueprint)",
                description: "Visualizamos tu operación actual y encontramos dónde estás perdiendo dinero."
            },
            {
                title: "Integraciones No-Code/Low-Code",
                description: "Expertos en Make (Integromat), Zapier y APIs personalizadas."
            },
            {
                title: "Centralización de Datos",
                description: "Adiós a los Excel dispersos. Creamos una única fuente de verdad (CRM/Database)."
            },
            {
                title: "Capacitación de Equipo",
                description: "No solo entregamos el robot, enseñamos a tu equipo a operarlo y mantenerlo."
            }
        ],
        benefits: [
            "Reducción drástica de errores humanos en entrada de datos.",
            "Respuesta inmediata a clientes 24/7 (bots inteligentes).",
            "Escalabilidad real: atiende 10 o 1000 clientes con el mismo equipo.",
            "Mayor satisfacción del empleado al eliminar tareas robotizadas."
        ],
        result: "Resultado: costos operativos abajo, capacidad de entrega arriba.",
        priceAmount: "Desde $750.000",
        priceMeta: "CLP",
        order: 6
    }
];
