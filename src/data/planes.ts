export interface Plan {
    title: string;
    meta: string;
    price: string;
    priceMeta: string;
    ctaText: string;
    planId: string;
    recommended: boolean;
    badge?: string;
    features: string[];
}

export const plans: Plan[] = [
    {
        title: "Sprint de Leads",
        meta: "30 días · Inyección de Ventas",
        price: "$550.000",
        priceMeta: "+ inversión en ads",
        ctaText: "Iniciar Sprint",
        planId: "sprint",
        recommended: false,
        features: [
            "Landing Page de Choque (SPA)",
            "Estrategia Multi-Canal (Google/Meta)",
            "Optimización Agresiva de Costos",
        ],
    },
    {
        title: "Partner Digital",
        meta: "Tu CTO & Diseño Fractional",
        price: "$250.000",
        priceMeta: "/ mes",
        ctaText: "Asegurar cupo",
        planId: "partner",
        recommended: true,
        badge: "MOTOR",
        features: [
            "Bolsa de Horas (Según requerimientos)",
            "Infraestructura Gestionada (24/7)",
            "Prioridad VIP en requerimientos",
        ],
    },
    {
        title: "Email Revenue",
        meta: "Fidelización & Recompra",
        price: "$250.000",
        priceMeta: "/ mes",
        ctaText: "Activar canal",
        planId: "email",
        recommended: false,
        badge: "ROI",
        features: [
            "4 Newsletters de Venta / mes",
            "Ingeniería Anti-Spam (DNS)",
            "Limpieza y Segmentación de Base",
        ],
    },
];

export interface PlanComparisonRow {
    label: string;
    sprint: string;
    partner: string;
    email: string;
}

export const tableRows: PlanComparisonRow[] = [
    {
        label: "Objetivo Principal",
        sprint: "Captar Clientes Nuevos",
        partner: "Mantener y Escalar",
        email: "Fidelizar y Re-vender",
    },
    {
        label: "Desarrollo Web",
        sprint: "Landing Page de Venta",
        partner: "Evolución continua (Bolsa)",
        email: "—",
    },
    {
        label: "Gestión Técnica",
        sprint: "Setup Inicial",
        partner: "Gestión 24/7 (SLA)",
        email: "Entregabilidad (DNS)",
    },
    {
        label: "Diseño Gráfico",
        sprint: "Creativos para Ads",
        partner: "A demanda (Banners/Web)",
        email: "Piezas para Correo",
    },
    {
        label: "Reportabilidad",
        sprint: "Cierre de Campaña",
        partner: "Estado de Salud (Técnico)",
        email: "Retorno de Inversión (ROI)",
    },
    {
        label: "Ideal Para",
        sprint: "Validar ofertas rápido",
        partner: "Empresas operativas",
        email: "E-commerce / B2B",
    },
];