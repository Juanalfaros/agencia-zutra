export interface FAQ {
    id: string; // for compatibility if needed
    question: string;
    answer: string; // HTML string
    order: number;
}

export const faqs: FAQ[] = [
    {
        id: "confianza",
        question: "Si Zutra es nueva, ¿por qué debería confiar en ustedes?",
        order: 1,
        answer: `<strong>Porque trabajas directo con los fundadores y su experiencia demostrada, sin burocracia.</strong> En lugar de promesas, te ofrecemos:

<ul>
  <li><strong>KPIs por escrito</strong> y tableros de resultados en tiempo real que puedes consultar cuando quieras.</li>
  <li><strong>Auditoría sin costo</strong> que te entrega un plan de acción concreto, sin compromiso de permanencia.</li>
  <li><strong>Nuestro éxito depende del tuyo.</strong> No hay contratos a largo plazo, solo resultados que justifican continuar.</li>
</ul>`
    },
    {
        id: "diferenciacion",
        question: "¿Qué los hace realmente diferentes a otras agencias?",
        order: 2,
        answer: `<strong>Somos un equipo de ejecución que combina audacia creativa con maestría técnica.</strong>

<ol>
  <li><strong>Fundadores involucrados:</strong> No delegamos tu estrategia. Hablas directamente con quienes ejecutan.</li>
  <li><strong>Creatividad que vende + Técnica impecable:</strong> Ideas valientes respaldadas por tracking y performance real.</li>
  <li><strong>Velocidad con criterio:</strong> Operamos en ciclos cortos para aprender y optimizar rápido. Menos reuniones, más resultados.</li>
  <li><strong>Foco en KPIs de negocio:</strong> Nos obsesionan las ventas y los leads calificados, no las métricas de vanidad.</li>
</ol>`
    },
    {
        id: "fit",
        question: "¿Para qué tipo de empresa es ideal Zutra?",
        order: 3,
        answer: `<strong>Somos ideales para empresas con un producto validado, listas para escalar de forma agresiva.</strong> Eres un buen fit si:

<ul>
  <li>Buscas un <strong>equipo que funcione como una extensión</strong> del tuyo.</li>
  <li>Valoras la <strong>velocidad</strong> y la toma de decisiones basada en <strong>datos</strong>.</li>
  <li>Quieres un sistema de marketing que genere <strong>demanda y ventas medibles</strong>.</li>
</ul>

<p>No somos la mejor opción si recién comienzas o solo buscas un community management básico para "tener presencia".</p>`
    },
    {
        id: "exito",
        question: "¿Cómo se mide el éxito y con qué frecuencia vemos reportes?",
        order: 4,
        answer: `<strong>No solo enviamos reportes, tenemos reuniones de avance.</strong> En nuestras sesiones quincenales, analizamos los datos contigo en vivo, respondemos tus dudas y tomamos las decisiones para las siguientes semanas en el mismo momento. <strong>Menos emails, más acción.</strong>`
    },
    {
        id: "permanencia",
        question: "¿Hay contratos de permanencia mínima?",
        order: 5,
        answer: `<strong>No. Categóricamente.</strong> Creemos que los resultados son el único contrato que importa.

<ul>
  <li><strong>Sprints:</strong> Proyectos con una entrega y fin definidos.</li>
  <li><strong>Planes Mensuales:</strong> Puedes cancelar en cualquier momento con 15 días de aviso.</li>
</ul>`
    },
    {
        id: "remoto",
        question: "¿Trabajan con clientes fuera de Santiago?",
        order: 6,
        answer: `<strong>Sí, nuestra operación es 100% remota y eficiente.</strong>

<ul>
  <li><strong>Herramientas:</strong> Usamos Slack, Notion y videollamadas para una comunicación fluida y constante.</li>
  <li><strong>Producción Presencial:</strong> Si tu proyecto lo requiere, viajamos o coordinamos con equipos locales de confianza, siempre con total transparencia.</li>
</ul>`
    }
];
