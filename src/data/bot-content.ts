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
  keywords: ['juan', 'camilo'],
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
      'valor',
      'costo',
      'barato',
      'lucas',
      'cotizar',
    ],
    responses: [
      '¡Oye, qué ansioso/a! 😂 Primero invítame a un café digital (cuéntame tu idea) y ahí vemos si tienes que romper el chanchito o si estamos conversando en serio.',
      '¿Precio? Depende... ¿Buscas un gasto de 20 lucas que no sirve para nada o una inversión que te haga ganar plata? Sigamos y te cuento.',
      'Tranquilo/a, no soy de los que se venden a la primera. Déjame conocer tu ambición y te aseguro que el valor te va a gustar más que el precio. 😉',
    ],
  },
  competencia: {
    keywords: ['demas', 'agencia', 'barata'],
    responses: [
      'Sé lo que estás pensando... pero recuerda: lo barato sale caro y lo genérico no vende. Aquí hacemos **ejecución de autor**.',
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

      return `${greeting} Soy **El Zutro**. ¿Cómo te llamas para que no nos tratemos de 'usted'?`;
    },
    reiteration: '¿Cómo era tu nombre entonces?',
    type: 'text',
    placeholder: 'Tu nombre o apodo...',
  },
  {
    id: 'email',
    question: (state: BotState) =>
      state.isBoss
        ? `Ya Jefe, suélteme su mejor correo. Prometo que no es para spam, es por si el sistema se pone mañoso. ✉️`
        : `¡Buena onda, ${state.data.name.split(' ')[0]}! Suéltame tu mejor correo. Prometo que no es para spam, es por si el sistema se pone mañoso. ✉️`,
    reiteration:
      'Suéltame tu mejor correo. De verdad no es para spam, es por si el sistema se pone mañoso. ✉️',
    type: 'email',
    placeholder: 'tu@email.com',
  },
  {
    id: 'service',
    question: () =>
      'Ya directo al grano. ¿En qué módulo de crecimiento te interesa que le metamos mano hoy?',
    reiteration:
      '¿En qué módulo de crecimiento te interesa que trabajemos hoy?',
    type: 'chips',
    options: [
      'Arquitectura Web',
      'Identidad Visual',
      'Partner Digital',
      'Email Revenue',
      'Otro',
    ],
  },
  {
    id: 'custom_service',
    condition: (state: BotState) => state.data.service === 'Otro',
    question: () =>
      '¿Qué traes en mente? Cuéntame la firme para ver si te podemos ayudar.',
    reiteration: 'Cuéntame la firme, ¿qué traes en mente para tu proyecto?',
    type: 'text',
    placeholder: 'Ej: Una App, SEO, un milagro...',
  },
  {
    id: 'urgency',
    question: () =>
      'Dime la verdad: ¿Es uno de esos incendios que debemos apagar de inmediato o nos tomamos el tiempo de construir un imperio que no se queme?',
    reiteration: '¿Qué tan rápido necesitamos movernos con esto?',
    type: 'chips',
    options: ['¡Es para ayer!', 'Este mes', 'Sin apuro'],
  },
  {
    id: 'final',
    question: () =>
      '¡Estamos! Dale al botón de abajo y nos vemos en WhatsApp. Yo ya le pasé el chisme a los humanos para que te esperen con el café listo.',
    type: 'cta',
    buttonText: 'Hablar con los jefes →',
  },
];
