export interface BotState {
  step: number;
  isBoss?: boolean;
  bossResponseIndex?: number;
  data: {
    name: string;
    email: string;
    service: string;
    urgency: string;
    [key: string]: string;
  };
}

export interface Step {
  id: string;
  type: 'text' | 'email' | 'chips' | 'cta';
  question: string | ((state: BotState) => string);
  reiteration?: string;
  placeholder?: string;
  options?: string[];
  buttonText?: string;
  condition?: (state: BotState) => boolean;
}

export const bossEasterEggs = {
  // Solo con nombre y apellido: "Juan" o "Camilo" a secas son nombres de clientes.
  keywords: ['juan alfaro', 'camilo bustamante'],
  responses: [
    '¡Chuta! ¿Jefe, es usted? 😅 Me pongo firme de inmediato.',
    '¡Identidad validada! Mis respetos, jefe. ¿Qué misión ejecutamos? ⚡',
    '¡Epa! No lo vi entrar. Mande usted, que aquí yo solo obedezco. 🫡',
    '¡Se acabó el recreo! 😅 Jefe, dígame qué necesita y lo saco en tiempo récord.',
  ],
};

export const easterEggs = {
  precio: {
    keywords: [
      'precio',
      'cuanto vale',
      'cuánto vale',
      'cuanto cuesta',
      'cuánto cuesta',
      'cuanto sale',
      'cuánto sale',
      'costo',
      'cotizar',
      'presupuesto',
    ],
    responses: [
      'El valor depende del alcance y no te lo voy a inventar. Lo definimos juntos en el diagnóstico gratuito de 30 minutos: si no te llevas claridad y próximos pasos, no seguimos.',
      'Cada proyecto es distinto, así que no tengo una tabla de precios. Cuéntame qué necesitas y, en el diagnóstico gratuito, te damos un valor claro antes de que decidas.',
    ],
  },
  competencia: {
    keywords: ['otras agencias', 'otra agencia', 'mas barato', 'más barato'],
    responses: [
      'Es normal comparar. Nosotros no competimos por precio: hablas directo con quienes diseñan y programan, y partes con un diagnóstico gratuito.',
    ],
  },
};

export const getSteps = (botState: BotState): Step[] => [
  {
    id: 'name',
    question: () => {
      const hour = new Date().getHours();
      let greeting = '¡Wena!';
      if (hour < 12) greeting = '¡Buenos días!';
      else if (hour < 20) greeting = '¡Buenas tardes!';

      return `${greeting} Soy **El Zutro**, el asistente de Zutra. ¿Cómo te llamas?`;
    },
    reiteration: '¿Cómo era tu nombre entonces?',
    type: 'text',
    placeholder: 'Tu nombre o apodo...',
  },
  {
    id: 'email',
    question: (state: BotState) =>
      state.isBoss
        ? `Ya Jefe, ¿su mejor correo? ✉️`
        : `¡Mucho gusto, ${state.data.name.split(' ')[0]}! ¿Cuál es tu correo? Lo usamos solo para responderte, nada de spam. ✉️`,
    reiteration:
      '¿Cuál es tu correo? Lo usamos solo para responderte, nada de spam. ✉️',
    type: 'email',
    placeholder: 'tu@email.com',
  },
  {
    id: 'service',
    question: () => '¿Qué necesitas? Elige lo que más se parezca.',
    reiteration: '¿Qué necesitas? Elige una opción.',
    type: 'chips',
    options: [
      'Marca',
      'Web',
      'Marca + Web',
      'Partner',
      'Complemento',
      'No estoy seguro',
    ],
  },
  {
    id: 'custom_service',
    condition: (state: BotState) => state.data.service === 'No estoy seguro',
    question: () =>
      'No hay problema, para eso es el diagnóstico gratuito. Cuéntame en una línea qué quieres lograr.',
    reiteration: 'Cuéntame en una línea qué quieres lograr.',
    type: 'text',
    placeholder: 'Ej: una web nueva, mejorar mi logo...',
  },
  {
    id: 'urgency',
    question: () => '¿Para cuándo lo necesitas?',
    reiteration: '¿Para cuándo lo necesitas?',
    type: 'chips',
    options: ['Lo antes posible', 'En 1 a 2 meses', 'Sin apuro'],
  },
  {
    id: 'final',
    question: () =>
      '¡Listo! Toca el botón y seguimos por WhatsApp con los fundadores. Te respondemos en menos de 24 h hábiles.',
    type: 'cta',
    buttonText: 'Seguir por WhatsApp →',
  },
];
