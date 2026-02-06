export interface Result {
    project: string;
    achievement: string;
    context: string;
    attribution: string;
    icon: string;
}

export const results: Result[] = [
    {
        project: "Campaña AeroBlack para Aerovan",
        achievement: "De $425k a $23.9M en 3 Días",
        context:
            "Se ejecutó una campaña de ventas de alto impacto con una inversión acotada, logrando un retorno sobre la inversión publicitaria (ROAS) de <strong>56 veces</strong>.",
        attribution: "Rol: Juan Alfaro (Dir. Comercial en Artífices Studio)",
        icon: "ph-duotone ph-rocket-launch",
    },
    {
        project: "Campaña Meta Ads para Aerovan",
        achievement: "Retorno de Inversión de 101x",
        context:
            "Durante el CyberDay, se implementó una campaña de catálogo en Meta Ads que superó todas las proyecciones, demostrando una eficiencia publicitaria excepcional.",
        attribution: "Rol: Juan Alfaro (Dir. Comercial en Artífices Studio)",
        icon: "ph-duotone ph-chart-line-up",
    },
    {
        project: "Crecimiento de Comunidad para Raptor",
        achievement: "Costo por Visita al Perfil de $19",
        context:
            "Se diseñó una estrategia de pauta en Meta para construir una audiencia de nicho, logrando un costo por visita ultra bajo y un costo de adquisición por seguidor de $199 CLP.",
        attribution: "Rol: Camilo Bustamante (Estratega en Artífices Studio)",
        icon: "ph-duotone ph-users",
    },
    {
        project: "Contenido de Alto Impacto para Blindatek",
        achievement: "147.000+ Visualizaciones en Reels",
        context:
            "Se idearon y produjeron piezas de video que rompieron con la comunicación tradicional de la marca, generando un alcance masivo y más de <strong>7.800 interacciones</strong>, validando una nueva línea creativa.",
        attribution:
            "Rol: Camilo Bustamante (Productor de Contenidos en Artífices Studio)",
        icon: "ph-duotone ph-video",
    },
];
