export interface MethodStep {
    icon: string;
    title: string;
    text: string;
}

export const methodSteps: MethodStep[] = [
    {
        icon: "ph-duotone ph-clipboard-text",
        title: "Diagnóstico en Vivo",
        text: "En una sesión de 20 minutos, mapeamos juntos tu embudo, tus métricas y tus metas.",
    },
    {
        icon: "ph-duotone ph-traffic-cone",
        title: "KPIs en piedra",
        text: "Métricas desde el día 1 y tableros compartidos para decidir rápido. Transparencia radical.",
    },
    {
        icon: "ph-duotone ph-lightning",
        title: "Iteración ZUTRA",
        text: "Ciclos cortos de prueba y aprendizaje. Lo que funciona, se escala; lo que no, se mejora.",
    },
];
