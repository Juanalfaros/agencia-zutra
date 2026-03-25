export const techIcons: Record<string, string> = {
  // Frontend Frameworks & Libraries
  React: 'react',
  'React.js': 'react',
  Vue: 'vuedotjs',
  'Vue.js': 'vuedotjs',
  Angular: 'angular',
  Svelte: 'svelte',
  Astro: 'astro',
  'Astro 5': 'astro',
  'Next.js': 'nextdotjs',
  Nuxt: 'nuxtdotjs',
  'Nuxt.js': 'nuxtdotjs',
  Preact: 'preact',
  SolidJS: 'solid',
  'Alpine.js': 'alpinedotjs',
  jQuery: 'jquery',
  Qwik: 'qwik',

  // Languages
  TypeScript: 'typescript',
  JavaScript: 'javascript',
  Python: 'python',
  PHP: 'php',
  'PHP Custom': 'php',
  Ruby: 'ruby',
  Go: 'go',
  Golang: 'go',
  Rust: 'rust',
  Java: 'openjdk',
  'C#': 'csharp',
  'C++': 'cplusplus',
  Swift: 'swift',
  Kotlin: 'kotlin',
  Dart: 'dart',
  HTML: 'html5',
  HTML5: 'html5',
  CSS: 'css3',
  CSS3: 'css3',
  'CSS Nativo': 'css3',

  // Backend & CMS
  'Node.js': 'nodedotjs',
  Node: 'nodedotjs',
  Express: 'express',
  NestJS: 'nestjs',
  Django: 'django',
  Flask: 'flask',
  FastAPI: 'fastapi',
  Laravel: 'laravel',
  Symfony: 'symfony',
  WordPress: 'wordpress',
  Drupal: 'drupal',
  Strapi: 'strapi',
  Contentful: 'contentful',
  'Contentful CMS': 'contentful',
  'Brevo CRM': 'brevo',
  Sanity: 'sanity',
  Ghost: 'ghost',
  Shopify: 'shopify',
  Magento: 'magento',
  WooCommerce: 'woocommerce',

  // Database
  PostgreSQL: 'postgresql',
  Postgres: 'postgresql',
  MySQL: 'mysql',
  MariaDB: 'mariadb',
  MongoDB: 'mongodb',
  Redis: 'redis',
  SQLite: 'sqlite',
  Supabase: 'supabase',
  Firebase: 'firebase',
  Oracle: 'oracle',
  DynamoDB: 'amazondynamodb',
  Prisma: 'prisma',

  // DevOps & Cloud
  AWS: 'amazonwebservices',
  'Google Cloud': 'googlecloud',
  GCP: 'googlecloud',
  Azure: 'microsoftazure',
  Docker: 'docker',
  Kubernetes: 'kubernetes',
  Vercel: 'vercel',
  Netlify: 'netlify',
  Heroku: 'heroku',
  DigitalOcean: 'digitalocean',
  Cloudflare: 'cloudflare',
  'Cloudflare Pages': 'cloudflare',
  Nginx: 'nginx',
  Apache: 'apache',
  Git: 'git',
  GitHub: 'github',
  GitLab: 'gitlab',

  // Design
  Figma: 'figma',
  'Adobe XD': 'adobexd',
  Sketch: 'sketch',
  Storybook: 'storybook',
  Canva: 'canva',
  Blender: 'blender',
  Inkscape: 'inkscape',
  'Adobe Photoshop': 'adobephotoshop',
  Photoshop: 'adobephotoshop',
  'Adobe Illustrator': 'adobeillustrator',
  Illustrator: 'adobeillustrator',
  'Adobe After Effects': 'adobeaftereffects',
  'After Effects': 'adobeaftereffects',
  'Adobe Premiere Pro': 'adobepremierepro',
  Premiere: 'adobepremierepro',
  'Adobe InDesign': 'adobeindesign',
  InDesign: 'adobeindesign',
  Indesign: 'adobeindesign',
  'Adobe Lightroom': 'adobelightroom',
  Lightroom: 'adobelightroom',
  'Adobe Suite': 'adobe',
  SketchUp: 'sketchup',
  AutoCAD: 'autodesk',
  'Design Systems': 'ph:swatches-duotone',

  // Marketing & Analytics
  'Google Analytics': 'googleanalytics',
  GA4: 'googleanalytics',
  'Google Tag Manager': 'googletagmanager',
  GTM: 'googletagmanager',
  'Meta Ads': 'meta',
  'Meta Business Suite': 'meta',
  'Facebook Ads': 'facebook',
  Instagram: 'instagram',
  'TikTok Ads': 'tiktok',
  LinkedIn: 'linkedin',
  Mailchimp: 'mailchimp',
  Brevo: 'brevo',
  Metricool: 'metricool',
  HubSpot: 'hubspot',
  Salesforce: 'salesforce',
  Semrush: 'semrush',
  Ahrefs: 'ahrefs',
  Hotjar: 'hotjar',
  Klaviyo: 'klaviyo',
  ManyChat: 'manychat',

  // Styling & UI
  'Tailwind CSS': 'tailwindcss',
  Tailwind: 'tailwindcss',
  Sass: 'sass',
  Bootstrap: 'bootstrap',
  'Material UI': 'mui',
  MUI: 'mui',
  'Chakra UI': 'chakraui',

  // Mobile
  'React Native': 'react',
  Flutter: 'flutter',
  Expo: 'expo',
  Android: 'android',
  iOS: 'apple',
  Ionic: 'ionic',

  // Other Tools
  Stripe: 'stripe',
  PayPal: 'paypal',
  'Webpay Plus': 'ph:credit-card-duotone',
  Algolia: 'algolia',
  Postman: 'postman',
  Sentry: 'sentry',
  Zapier: 'zapier',
  Slack: 'slack',
  Notion: 'notion',
  Trello: 'trello',
  Jira: 'jira',
  Ubuntu: 'ubuntu',
  Linux: 'linux',
  Windows: 'windows11',
  'Cal.com': 'caldotcom',
  'Cal.com API': 'caldotcom',
  Calendly: 'calendly',
};

export const getTechIcon = (techName: string) => {
  return techIcons[techName] || 'codeigniter'; // Fallback slug
};

/**
 * We consider "Simple Icons" any icon that DOES NOT have a prefix (like ph:).
 * This way, the bundler doesn't see "simple-icons:..." and doesn't try to bundle it.
 */
export const isSimpleIcon = (name: string): boolean => {
  return !name.includes(':');
};

export const getSimpleIconSlug = (name: string): string => {
  return name; // Already a slug now
};

// CDN de Simple Icons para evitar bundle masivo en el Worker (3MB limit)
export const getSimpleIconUrl = (name: string, color: string = 'currentColor') => {
  const slug = getSimpleIconSlug(name);
  if (color === 'currentColor') {
    return `https://cdn.simpleicons.org/${slug}`;
  }
  return `https://cdn.simpleicons.org/${slug}/${color}`;
};
