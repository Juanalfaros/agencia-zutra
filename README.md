# Zutra Agency — La Estética Valiente

Sitio web oficial de **Zutra**, agencia de Growth Marketing & Tecnología con base en Santiago, Chile.

**[zutra.agency](https://zutra.agency)**

---

## 🚀 Tech Stack

| Capa          | Tecnología                                                                              |
| ------------- | --------------------------------------------------------------------------------------- |
| **Framework** | [Astro 6.0](https://astro.build/) (SSR + Prerendering híbrido)                          |
| **Deploy**    | [Cloudflare Pages](https://pages.cloudflare.com/) (Edge SSR con `nodejs_compat`)        |
| **CMS**       | [Contentful](https://www.contentful.com/) (Headless CMS + Preview en tiempo real)       |
| **Email**     | [Brevo](https://www.brevo.com/) (SMTP Transactional API)                                |
| **Seguridad** | [Cloudflare Turnstile](https://www.cloudflare.com/products/turnstile/) (Bot protection) |
| **Testing**   | [Vitest](https://vitest.dev/)                                                           |
| **CI/CD**     | GitHub Actions + Cloudflare Pages auto-deploy                                           |
| **Estilos**   | Vanilla CSS + Design tokens + acentos dinámicos ("Zutra Energy")                        |
| **Iconos**    | [Phosphor Icons](https://phosphoricons.com/) + [Iconify](https://iconify.design/)       |

## 📁 Estructura del Proyecto

```text
agencia-zutra/
├── .github/workflows/ci.yml      # CI: lint + typecheck + test
├── astro.config.mjs              # Configuración Astro + Cloudflare adapter
├── tsconfig.json                 # TypeScript con alias @/*
├── vitest.config.ts              # Configuración de Vitest
├── wrangler.toml                 # Cloudflare Pages config
│
├── public/                       # Assets estáticos
│   ├── robots.txt
│   ├── llms.txt                  # Machine-readable summary para IAs
│   ├── favicon.svg
│   └── manifest.webmanifest
│
├── src/
│   ├── components/
│   │   ├── blog/                 # BlogCard, BlogSearch
│   │   ├── common/               # Header, Footer, SEO, JsonLD, WhatsAppBot...
│   │   ├── consultoria/          # SlidesModal, ReportGate, viz/ (Charts)...
│   │   ├── nosotros/             # ManifestoHero, Philosophy, TeamSection...
│   │   ├── portfolio/            # CaseHero, CaseChallenge, CaseExecution...
│   │   ├── sections/             # Hero, Metodo, Planes, Faqs, Contacto...
│   │   └── ui/                   # ToggleTheme
│   ├── content/                  # Astro Content Layer (blog + consultoria)
│   ├── data/                     # Contenido estático (CTAs, faqs, founders...)
│   ├── icons/                    # SVGs locales para astro-icon
│   ├── layouts/                  # Layout.astro (Master con GTM, SEO, tema)
│   ├── lib/
│   │   ├── contentful.ts         # Cliente Contentful con cache TTL
│   │   ├── contentful-adapters.ts# Transform Contentful entries → tipos locales
│   │   ├── rate-limit.ts         # Rate limiter en memoria
│   │   └── utils/                # Sanitización, slugify
│   ├── pages/
│   │   ├── api/                  # /api/contact, /api/lead, /api/preview
│   │   ├── blog/                 # /blog, /blog/[slug], /blog/categoria/[cat]
│   │   ├── consultoria/          # /consultoria, /consultoria/[slug], verify
│   │   ├── preview/              # /preview/blog/[slug], /preview/portfolio/[slug]
│   │   ├── portfolio/            # /portfolio, /portfolio/[slug], /portfolio/tag/[tag]
│   │   ├── servicios/            # /servicios, /servicios/[slug], /servicios/categoria/[cat]
│   │   └── *.astro               # index, nosotros, 404, gracias, legales...
│   ├── styles/                   # Design tokens, componentes, responsive
│   └── types/                    # Blog, Portfolio, Services, Testimonials
│
└── scripts/                      # Migraciones a Contentful (uso interno)
```

## 🔌 Integraciones

### 🤖 El Zutro — WhatsApp Lead Bot

Bot conversacional flotante que califica leads antes de derivarlos a WhatsApp.

**Flujo**: Nombre → Email → Servicio → Urgencia → Redirect a WhatsApp + captura silenciosa en Brevo.

| Archivo                                   | Rol                      |
| ----------------------------------------- | ------------------------ |
| `src/components/common/WhatsAppBot.astro` | Widget UI                |
| `src/components/common/whatsapp-bot.ts`   | Motor de conversación    |
| `src/data/bot-content.ts`                 | Pasos, easter eggs, tono |
| `src/pages/api/lead.ts`                   | Captura en Brevo         |

### 📊 Plataforma de Consultoría

Sistema de entrega de auditorías y reportes técnicos mediante una experiencia de presentación interactiva.

- **Reportes MDX**: Contenido dinámico y altamente personalizable mediante componentes Astro.
- **Slides Presentation**: Vista de diapositivas integrada para presentaciones de alto impacto.
- **Seguridad HMAC-SHA256**: Tokens OTP y cookies de sesión firmados criptográficamente con Web Crypto API — no pueden forjarse manualmente.
- **Panel Admin**: `/consultoria` muestra un panel de control completo para admins; si no hay sesión activa, presenta un formulario de login OTP directamente.
- **Notificaciones de acceso**: Cuando un cliente abre un reporte, se envía un email de notificación a los admins con nombre del cliente, email y hora de acceso.
- **Log de accesos KV**: Cada acceso se registra en Cloudflare KV (`REPORT_LOGS`) con email, timestamp y user-agent.
- **Viz Suite**: Suite completa de componentes de visualización (BarCharts, StackTables, MetricHighlight, Scoreboards).

### 📨 Formulario de Contacto

Formulario con Turnstile (anti-bot) y envío dual vía Brevo SMTP:

1. **Notificación admin** → `hola@zutra.agency` con datos del lead
2. **Confirmación usuario** → Email de bienvenida personalizado

### �️ Contentful Preview

Sistema de vista previa en tiempo real para contenido borrador:

- **`/api/preview`** → Establece cookie de sesión preview
- **`/preview/blog/[slug]`** → Renderiza draft del blog
- **`/preview/portfolio/[slug]`** → Renderiza draft del portfolio
- **`/preview/servicios/[slug]`** → Renderiza draft del servicio
- Cliente Contentful "context-aware" que detecta cookie automáticamente

### 🎨 Zutra Energy

Acento de color aleatorio en cada carga (amarillo, verde menta, magenta o púrpura) — genera una experiencia de marca única y memorable.

## �️ Desarrollo Local

### Requisitos

- Node.js ≥ 22.12.0 (ver `.nvmrc`)
- pnpm

### Setup

```bash
# 1. Instalar dependencias
pnpm install

# 2. Configurar variables de entorno
cp .env.example .env
# Editar .env con las keys reales

# 3. Correr servidor de desarrollo
pnpm dev
```

### Scripts disponibles

| Comando           | Descripción                           |
| ----------------- | ------------------------------------- |
| `pnpm dev`        | Servidor de desarrollo con hot reload |
| `pnpm build`      | Construir para producción             |
| `pnpm preview`    | Preview local del build               |
| `pnpm lint`       | Ejecutar ESLint                       |
| `pnpm lint:fix`   | ESLint con auto-fix                   |
| `pnpm format`     | Formatear con Prettier                |
| `pnpm typecheck`  | Validar tipos TypeScript              |
| `pnpm test`       | Ejecutar tests (Vitest)               |
| `pnpm test:watch` | Tests en modo watch                   |
| `pnpm deploy`     | Build + deploy a Cloudflare Pages     |
| `pnpm deploy:dry` | Build + simulación de deploy          |

## 🧪 Testing

```bash
# Ejecutar todos los tests
pnpm test

# Tests con coverage
pnpm test:coverage

# Modo watch (desarrollo)
pnpm test:watch
```

Tests cubren: sanitización de inputs, rate limiter, slugify, y adaptadores de Contentful.

## 🚀 Deploy

El sitio se despliega automáticamente en **Cloudflare Pages** al hacer push a `main`.

### Variables de entorno (Cloudflare)

Configurar en Cloudflare Dashboard → Pages → Settings → Environment Variables:

| Variable                      | Propósito                                                              |
| ----------------------------- | ---------------------------------------------------------------------- |
| `CONTENTFUL_SPACE_ID`         | ID del espacio en Contentful                                           |
| `CONTENTFUL_ACCESS_TOKEN`     | Token de lectura (delivery)                                            |
| `CONTENTFUL_PREVIEW_TOKEN`    | Token de vista previa                                                  |
| `CONTENTFUL_ENVIRONMENT`      | Entorno (`master` por defecto)                                         |
| `CONTENTFUL_PREVIEW_SECRET`   | Secreto para habilitar preview                                         |
| `BREVO_API_KEY`               | Key de Brevo para emails transaccionales                               |
| `BREVO_LIST_ID`               | Lista de contactos por defecto                                         |
| `BREVO_LIST_WHATSAPP`         | Lista para leads del bot                                               |
| `BREVO_TEMPLATE_CONFIRMATION` | ID template confirmación usuario                                       |
| `BREVO_TEMPLATE_ADMIN`        | ID template notificación admin                                         |
| `TURNSTILE_SECRET_KEY`        | Validación server-side de Turnstile                                    |
| `PUBLIC_GTM_ID`               | Google Tag Manager ID                                                  |
| `SENTRY_DSN`                  | Error tracking (opcional)                                              |
| `OTP_SECRET`                  | Secreto HMAC para firmar tokens OTP y cookies de sesión de consultoría |
| `REPORT_LOGS`                 | Binding de Cloudflare KV para logs de acceso a reportes                |

## 📊 SEO & Accesibilidad

- **Structured data**: `LocalBusiness`, `FAQPage`, `BlogPosting`, `BreadcrumbList`
- **Open Graph + Twitter Cards**: Generados dinámicamente por página
- **Canonical URLs**: Siempre apuntan a `zutra.agency`
- **Sitemap**: Generado automáticamente (`/sitemap-index.xml`)
- **llms.txt**: Resumen machine-readable para IAs y LLM crawlers
- **Skip links**, **aria labels**, **semántica HTML5**

## 📝 Changelog

Ver [CHANGELOG.md](./CHANGELOG.md) para el historial completo de cambios.

---

Hecho con obsesión técnica por **Zutra**. 🫡
