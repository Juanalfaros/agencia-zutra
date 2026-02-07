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
        answer: `<strong>Porque tratas directo con los dueños, sin intermediarios junior.</strong> 
        <p>A diferencia de agencias grandes donde te vende el senior y te atiende el practicante, en Zutra tus proyectos son ejecutados directamente por los fundadores.</p>
        <ul>
          <li><strong>Experiencia Técnica + Creativa:</strong> Combinamos desarrollo web de alto nivel con dirección de arte senior.</li>
          <li><strong>Sin Burocracia:</strong> No tenemos "Account Managers" que solo pasan recados. Si tienes un problema técnico, hablas con el técnico.</li>
          <li><strong>Transparencia Radical:</strong> Si algo no se puede hacer o no va a funcionar, te lo diremos antes de que gastes un peso.</li>
        </ul>`
    },
    {
        id: "rrss-organico",
        question: "¿Me aseguran subir de seguidores en Instagram/TikTok?",
        order: 2,
        answer: `<strong>Seremos honestos: No, a menos que inviertas.</strong>
        <p>El algoritmo actual (2026) ya no regala alcance. Prometer crecimiento orgánico sin inversión publicitaria o sin creación intensiva de contenido de video (donde tú pongas la cara) es vender humo.</p>
        <p><strong>Nuestra propuesta:</strong> Nosotros nos encargamos de que tu marca se vea impecable, profesional y genere confianza (Branding y Mantención). El crecimiento acelerado lo logramos mediante campañas de pago (Ads) o estrategias de contenido donde trabajamos en equipo contigo.</p>`
    },
    {
        id: "fit",
        question: "¿Para qué tipo de empresa es ideal Zutra?",
        order: 3,
        answer: `<strong>Para empresas que buscan un "Partner Digital" resolutivo.</strong> Somos el fit perfecto si:

<ul>
  <li>Tienes un negocio validado y necesitas profesionalizar tu presencia digital (Web, Mail, Marca).</li>
  <li>Buscas externalizar tu departamento de marketing/TI para tener soporte constante sin contratar personal fijo.</li>
  <li>Valoras la <strong>velocidad de implementación</strong> por sobre las reuniones interminables.</li>
</ul>

<p>No somos la mejor opción si buscas micromanagement diario o crecimiento viral gratuito.</p>`
    },
    {
        id: "reportes",
        question: "¿Cómo es el flujo de trabajo y reportes?",
        order: 4,
        answer: `<strong>Eficiente y asíncrono. Odiamos las "reuniones que pudieron ser un email".</strong>
        <p>Priorizamos el trabajo profundo sobre la "reunionitis".</p>
        <ul>
            <li><strong>Comunicación fluida:</strong> Usamos WhatsApp/Slack para el día a día.</li>
            <li><strong>Reportes Mensuales:</strong> Recibes un informe claro de rendimiento (ROI, Ventas, Estado del sitio) enfocado en métricas de negocio, no de vanidad.</li>
            <li><strong>Reuniones Estratégicas:</strong> Nos reunimos cuando hay que tomar decisiones importantes o lanzar campañas, no para leerte un PDF que podrías leer solo.</li>
        </ul>`
    },
    {
        id: "permanencia",
        question: "¿Hay contratos de permanencia?",
        order: 5,
        answer: `<strong>No. Creemos en la libertad comercial.</strong>
        <ul>
          <li><strong>Proyectos Web/Branding:</strong> Se cotizan, se pagan y se entregan. Son tuyos para siempre.</li>
          <li><strong>Planes Mensuales (Partner/Mailing):</strong> Funcionan como una suscripción. Si el servicio te aporta valor, sigues. Si no, puedes cancelar avisando con 15 días de anticipación. Sin letras chicas.</li>
        </ul>`
    },
    {
        id: "servicios-core",
        question: "¿Qué tecnologías utilizan?",
        order: 6,
        answer: `<strong>Estándares modernos y escalables.</strong> No usamos plantillas baratas que se rompen solas.
        <ul>
          <li><strong>Web:</strong> Astro, React y Tailwind para sitios ultrarrápidos.</li>
          <li><strong>E-commerce:</strong> WooCommerce personalizado o Shopify, según tu modelo de negocio.</li>
          <li><strong>Email:</strong> HTML/MJML puro para asegurar que tus correos se vean perfectos en cualquier bandeja de entrada.</li>
          <li><strong>Diseño:</strong> Figma y Adobe Suite para entregables de alta fidelidad.</li>
        </ul>`
    }
];