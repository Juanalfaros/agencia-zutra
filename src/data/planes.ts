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
        title: "Sprint ZUTRA de Leads",
        meta: "30 días · entrega cerrada",
        price: "$550.000",
        priceMeta: "+ pauta",
        ctaText: "Quiero 30 días de leads",
        planId: "sprint",
        recommended: false,
        features: [
            "Landing CRO con hipótesis claras",
            "Ads valientes + tracking fino",
            "Reporte final y siguientes pasos",
        ],
    },
    {
        title: "Crecimiento Mensual",
        meta: "Contenido + optimización continua",
        price: "$450.000",
        priceMeta: "/ mes",
        ctaText: "Quiero mi plan de crecimiento",
        planId: "mensual",
        recommended: true,
        badge: "RECOMENDADO",
        features: [
            "Estrategia, calendario y producción",
            "Publicación con pruebas y aprendizajes",
            "Reportes quincenales con decisiones",
        ],
    },
    {
        title: "Soporte Web",
        meta: "Mantenimiento y mejoras",
        price: "$200.000",
        priceMeta: "/ mes",
        ctaText: "Agendar",
        planId: "soporte",
        recommended: false,
        features: [
            "Actualizaciones y fixes sin fricción",
            "Optimización de velocidad real",
            "Soporte técnico para campañas",
        ],
    },
];

export interface PlanComparisonRow {
    label: string;
    sprint: string;
    monthly: string;
    support: string;
}

export const tableRows: PlanComparisonRow[] = [
    { label: "Definición KPIs", sprint: "✔", monthly: "✔", support: "—" },
    {
        label: "Producción creativa",
        sprint: "✔ (ads)",
        monthly: "✔ (orgánico)",
        support: "—",
    },
    {
        label: "Optimización continua",
        sprint: "—",
        monthly: "✔",
        support: "✔ (web)",
    },
    {
        label: "Reporte",
        sprint: "Final",
        monthly: "Quincenal",
        support: "Mensual",
    },
];
