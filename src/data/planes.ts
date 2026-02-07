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
        meta: "30 días · Landing + Ads",
        price: "$550.000",
        priceMeta: "+ pauta",
        ctaText: "Inyectar ventas",
        planId: "sprint",
        recommended: false,
        features: [
            "Landing Page de alta conversión",
            "Configuración Ads (Google/Meta)",
            "Optimización semanal de pauta",
        ],
    },
    {
        title: "Partner Digital",
        meta: "Soporte + Bolsa de horas",
        price: "$200.000",
        priceMeta: "/ mes",
        ctaText: "Asegurar cupo",
        planId: "partner", // Este es el plan "Core" de 200k
        recommended: true,
        badge: "CORE",
        features: [
            "Hosting alta velocidad incluido",
            "Bolsa de horas: Diseño y cambios",
            "Monitoreo, seguridad y respaldos",
        ],
    },
    {
        title: "Email Revenue",
        meta: "Newsletter & Automatización",
        price: "$250.000",
        priceMeta: "/ mes",
        ctaText: "Automatizar",
        planId: "email",
        recommended: false,
        badge: "NUEVO",
        features: [
            "Diseño HTML (MJML) perfecto",
            "Gestión de lista y segmentos",
            "4 envíos mensuales + reporte",
        ],
    },
];

// Actualizamos la interfaz para coincidir con los nuevos IDs de los planes
export interface PlanComparisonRow {
    label: string;
    sprint: string;
    partner: string;
    email: string;
}

export const tableRows: PlanComparisonRow[] = [
    {
        label: "Landing Page / Web",
        sprint: "✔ (Ventas)",
        partner: "—",
        email: "—",
    },
    {
        label: "Hosting & Mantenimiento",
        sprint: "—",
        partner: "✔",
        email: "—",
    },
    {
        label: "Producción Gráfica",
        sprint: "Creatividades Ads",
        partner: "Bolsa de horas",
        email: "Piezas HTML",
    },
    {
        label: "Gestión de Campañas",
        sprint: "✔ (Pauta)",
        partner: "—",
        email: "✔ (Mailing)",
    },
    {
        label: "Reporte de Resultados",
        sprint: "Al cierre",
        partner: "Mensual (Técnico)",
        email: "Mensual (ROI)",
    },
];