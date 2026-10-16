export interface FAQ {
  id: string; // for compatibility if needed
  question: string;
  answer: string; // HTML string
  order: number;
}

export const faqs: FAQ[] = [
  {
    id: 'confianza',
    question: 'Si Zutra es nueva, ¿por qué debería confiar en ustedes?',
    order: 1,
    answer: `<strong>Porque tratas directo con los dueños, sin intermediarios.</strong>
        <p>En Zutra tu proyecto lo diseñan y lo programan los fundadores. No hay ejecutivos de cuenta que pasen recados: si tienes un problema técnico, hablas con quien lo resuelve.</p>
        <ul>
          <li><strong>Marca y web en un solo lugar:</strong> diseño y desarrollo trabajan juntos desde el primer día.</li>
          <li><strong>Honestidad:</strong> si algo no se puede hacer o no te conviene, te lo decimos antes de que gastes un peso.</li>
          <li><strong>Pruebas reales:</strong> puedes ver los proyectos en el portfolio y hablar con quienes los hicieron.</li>
        </ul>`,
  },
  {
    id: 'redes-publicidad',
    question: '¿Hacen redes sociales o publicidad?',
    order: 2,
    answer: `<strong>Diseñamos las piezas; la pauta la derivamos.</strong>
        <p>Nos enfocamos en marca y web. Podemos entregarte un kit de plantillas editables para tus redes, pero no gestionamos cuentas ni prometemos seguidores.</p>
        <p>Si necesitas publicidad en Google o Meta, te recomendamos a un partner de confianza y dejamos tu sitio listo para medir los resultados.</p>`,
  },
  {
    id: 'duracion',
    question: '¿Cuánto demora un proyecto?',
    order: 3,
    answer: `<strong>Entre 2 y 6 semanas, según el alcance.</strong>
        <ul>
          <li><strong>Propuesta:</strong> la recibes dentro de 48 horas después del diagnóstico.</li>
          <li><strong>Marca o landing:</strong> los más cortos.</li>
          <li><strong>Sitio corporativo, tienda online o Marca + Web:</strong> los más largos.</li>
        </ul>
        <p>El plazo exacto queda escrito en la propuesta, antes de empezar.</p>`,
  },
  {
    id: 'que-necesito',
    question: '¿Qué necesito tener listo para empezar?',
    order: 4,
    answer: `<strong>Solo las ganas de empezar; el resto lo vemos en el diagnóstico.</strong>
        <p>Durante el proyecto te pediremos, según el caso, textos o ideas de lo que quieres comunicar, fotos de tu negocio, accesos (dominio, hosting, redes) y aprobaciones en cada etapa. Si no tienes algo, te ayudamos a resolverlo.</p>`,
  },
  {
    id: 'flujo',
    question: '¿Cómo es el flujo de trabajo?',
    order: 5,
    answer: `<strong>Simple, ordenado y sin reuniones de más.</strong>
        <ul>
            <li><strong>Comunicación fluida:</strong> usamos WhatsApp o correo para el día a día.</li>
            <li><strong>Revisiones por etapas:</strong> ves avances antes de que algo quede cerrado.</li>
            <li><strong>Reuniones cuando hacen falta:</strong> para decidir, no para leerte un informe.</li>
        </ul>`,
  },
  {
    id: 'despues',
    question: '¿Qué pasa después del lanzamiento?',
    order: 6,
    answer: `<strong>Tu proyecto es tuyo y te enseñamos a usarlo.</strong>
        <p>Al entregarlo te mostramos cómo editar y mantener lo que hicimos. Si prefieres no preocuparte, con <strong>Partner</strong> nos encargamos de la mantención, el hosting y las mejoras mes a mes.</p>`,
  },
  {
    id: 'pago',
    question: '¿Cómo se paga?',
    order: 7,
    answer: `<strong>Lo acordamos por escrito antes de empezar.</strong>
        <p>La propuesta incluye el valor, lo que está incluido, los plazos y la forma de pago. No hay cobros que no hayas aprobado antes.</p>`,
  },
  {
    id: 'permanencia',
    question: '¿Hay contratos de permanencia?',
    order: 8,
    answer: `<strong>No. Creemos en la libertad comercial.</strong>
        <ul>
          <li><strong>Proyectos de marca o web:</strong> se cotizan, se pagan y se entregan. Son tuyos para siempre.</li>
          <li><strong>Partner mensual:</strong> funciona como una suscripción. Si el servicio te aporta valor, sigues. Si no, puedes cancelar avisando con 15 días de anticipación. Sin letras chicas.</li>
        </ul>`,
  },
  {
    id: 'tecnologias',
    question: '¿Qué tecnologías utilizan?',
    order: 9,
    answer: `<strong>Estándares modernos, sin plantillas baratas que se rompen solas.</strong>
        <ul>
          <li><strong>Web:</strong> sitios rápidos hechos a medida, que tu equipo puede editar sin programar.</li>
          <li><strong>Tienda online:</strong> WooCommerce o Shopify, según tu modelo de negocio.</li>
          <li><strong>Email:</strong> plantillas en HTML que se ven bien en cualquier bandeja de entrada.</li>
          <li><strong>Diseño:</strong> Figma y Adobe para entregables de alta fidelidad.</li>
        </ul>`,
  },
];
