# Zutra Agency — La Estética Valiente

Sitio web oficial de **Zutra**, agencia de Growth Marketing & Tecnología con base en Santiago, Chile.

**[zutra.agency](https://zutra.agency)**

---

## 🚀 Tech Stack

| Capa          | Tecnología                                                                              |
| ------------- | --------------------------------------------------------------------------------------- |
| **Framework** | [Astro 6.0](https://astro.build/) (SSR + Prerendering híbrido)                          |
| **Deploy**    | [Cloudflare Pages](https://pages.cloudflare.com/) (Edge SSR con `nodejs_compat`)        |
| **CMS**       | [Sanity](https://www.sanity.io/) (Headless CMS + Studio embebido en `/studio`)          |
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
│   ├── data/                     # Contenido estático (CTAs, faqs, founders... — planes migrados a Sanity)
│   ├── icons/                    # SVGs locales para astro-icon
│   ├── layouts/                  # Layout.astro (Master con GTM, SEO, tema)
│   ├── lib/
│   │   ├── sanity.ts             # Cliente Sanity (con soporte preview)
│   │   ├── sanity-adapters.ts    # Transform Sanity entries → tipos locales + HTML
│   │   ├── sanity-queries.ts     # GROQ queries reutilizables
│   │   ├── rate-limit.ts         # Rate limiter distribuido (Cloudflare KV)
│   │   └── utils/                # Sanitización, slugify
│   ├── pages/
│   │   ├── api/                  # /api/contact, /api/lead, /api/preview
│   │   ├── blog/                 # /blog, /blog/[slug], /blog/categoria/[cat]
│   │   ├── consultoria/          # /consultoria, /consultoria/[slug], verify
│   │   ├── preview/              # /preview/blog/[slug], /preview/portfolio/[slug]
│   │   ├── portfolio/            # /portfolio, /portfolio/[slug], /portfolio/tag/[tag]
│   │   ├── recursos/             # /recursos, /recursos/[slug] (marketplace)
│   │   ├── servicios/            # /servicios, /servicios/[slug], /servicios/categoria/[cat]
│   │   └── *.astro               # index, nosotros, 404, gracias, legales...
│   ├── styles/                   # Design tokens, componentes, responsive
│   └── types/                    # Blog, Portfolio, Services, Testimonials, Recurso
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

Sistema de entrega de auditorías y reportes técnicos mediante una experiencia de presentación interactiva. El contenido vive 100% en **Sanity** — los reportes se crean y editan desde el Studio sin tocar código.

- **Reportes en Sanity**: Documento `auditReport` con Portable Text y bloques embebidos. El adapter `sanity-adapters.ts` convierte cada bloque a HTML o componente Astro listo para renderizar.
- **Viz Suite (11 block types)**: `findingBlock`, `metricBlock`, `scoreGridBlock`, `barChartBlock`, `vitalsTableBlock`, `stackTableBlock`, `priorityBlock`, `optionsGridBlock`, `competitorTableBlock`, `ctaBlock` — más bloques de texto enriquecido, `executiveSummary` y `conclusion`.
- **`optionsGridBlock`**: Grilla comparativa de opciones con soporte de íconos Phosphor, pros/cons, precio y CTA. Selector visual de ícono desde Sanity Studio.
- **Slides Presentation**: Vista de diapositivas integrada para presentaciones de alto impacto.
- **Seguridad HMAC-SHA256**: Tokens OTP y cookies de sesión firmados criptográficamente con Web Crypto API — no pueden forjarse manualmente.
- **Panel Admin**: `/consultoria` muestra un panel de control completo para admins; si no hay sesión activa, presenta un formulario de login OTP directamente.
- **OTP en slugs**: Las rutas `/consultoria/[slug]` también están protegidas — si el reporte tiene `protected: true` y el usuario no tiene cookie válida, se renderiza el gate OTP en vez del contenido.
- **Notificaciones de acceso**: Cuando un cliente abre un reporte, se envía un email de notificación a los admins con nombre del cliente, email y hora de acceso.
- **Log de accesos KV**: Cada acceso se registra en Cloudflare KV (`REPORT_LOGS`) con email, timestamp y user-agent.

### 🛍️ Marketplace de Recursos (`/recursos`)

Catálogo de productos digitales propios (templates Astro, UI kits, auditorías y guías) vendidos via Gumroad.

- **Índice** `/recursos` — grid de cards con imagen, precio, categoría y CTAs de compra/demo.
- **Detalle** `/recursos/[slug]` — galería interactiva, features checklist, descripción rich text y sidebar con precio + CTA de Gumroad.
- **SEO**: `ItemList` schema en el índice; `Product` + `Offer` JSON-LD en cada detalle.
- **Documento `recurso`** en Sanity con campos (título, slug, precio, isFree, techStack, features, gallery, longDescription...).

### 📨 Formulario de Contacto

Formulario con Turnstile (anti-bot) y envío dual vía Brevo SMTP:

1. **Notificación admin** → `hola@zutra.agency` con datos del lead
2. **Confirmación usuario** → Email de bienvenida personalizado

### 🗺️ Sanity Preview

Sistema de vista previa en tiempo real para contenido borrador:

- **`/api/preview`** → Establece cookie de sesión preview con token de Sanity
- **`/preview/blog/[slug]`** → Renderiza draft del blog
- **`/preview/portfolio/[slug]`** → Renderiza draft del portfolio
- **`/preview/servicios/[slug]`** → Renderiza draft del servicio
- Cliente Sanity "context-aware" que usa `perspective: "previewDrafts"` automáticamente

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

Tests cubren: sanitización de inputs, rate limiter, slugify, y adaptadores de Sanity.

## 🚀 Deploy

El sitio se despliega automáticamente en **Cloudflare Pages** al hacer push a `main`.

### Variables de entorno (Cloudflare)

Configurar en Cloudflare Dashboard → Pages → Settings → Environment Variables:

| Variable                      | Propósito                                                              |
| ----------------------------- | ---------------------------------------------------------------------- |
| `SANITY_API_TOKEN`            | Token de Sanity con permisos de lectura (viewer)                       |
| `SANITY_PREVIEW_TOKEN`        | Token de Sanity para vista previa de drafts                            |
| `PUBLIC_SANITY_PROJECT_ID`    | ID del proyecto Sanity (público)                                       |
| `PUBLIC_SANITY_DATASET`       | Dataset de Sanity (`production` por defecto)                           |
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
| `ZUTRA_KV`                    | Binding de Cloudflare KV para rate limiting distribuido                |

## 📊 SEO & Accesibilidad

- **Structured data**: `LocalBusiness`, `FAQPage`, `BlogPosting`, `BreadcrumbList`, `Product`, `ItemList`
- **Open Graph + Twitter Cards**: Generados dinámicamente por página
- **Canonical URLs**: Siempre apuntan a `zutra.agency`
- **Sitemap**: Generado automáticamente (`/sitemap-index.xml`)
- **llms.txt**: Resumen machine-readable para IAs y LLM crawlers
- **Skip links**, **aria labels**, **semántica HTML5**

## 📝 Changelog

Ver [CHANGELOG.md](./CHANGELOG.md) para el historial completo de cambios.

---

Hecho con obsesión técnica por **Zutra**. 🫡
