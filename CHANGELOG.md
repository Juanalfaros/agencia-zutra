# Changelog

Todos los cambios notables en este proyecto serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es/1.1.0/).

---

## [2.6.0] — 2026-06-13

### 🚀 Agregado

- **Cotización Comercial KR en Sanity**: Nuevo `auditReport` publicado (`cotizacion-comercial-kr`) con categoría `cotizacion-comercial`. Incluye 6 diapositivas (`consultoriaSlide`) y 4 opciones de propuesta (`slideOption`) creadas vía API.
- **Categoría `cotizacion-comercial`** añadida al schema `auditReport` en el Studio.
- **`SlidesModal`: render completo de opciones**: Las tarjetas de propuesta en el modo presentación ahora muestran `pros`, `cons`, `price` y `ctaText/ctaLink` además del título y descripción. Incluye estilos para lista de pros (icono verde), contras (icono gris) y footer con precio + CTA.
- **Scripts de seed/patch en `/scripts/`**: `seed-kr-cotizacion.mjs`, `patch-kr-content.mjs` y `patch-kr-plans.mjs` para crear y enriquecer el reporte KR vía Sanity API.

### ✅ Corregido

- **`SlidesModal`: HTML escapado en descripciones de opciones**: `{opt.description}` renderizaba el HTML de `renderPortableText` como texto plano (mostrando `<p>` literalmente). Corregido con `set:html` y cambiado de `<p>` a `<div>` para evitar HTML inválido al anidar bloques.
- **Descripción truncada en `slideOption` "Setup Autónomo"**: El seed inicial dejó "Sistema de Identidad Completo" como texto incompleto. Actualizado al texto descriptivo completo vía patch API.

---

## [2.5.0] — 2026-05-08

### 🚀 Agregado

- **Schema `plan` en Sanity**: Nuevo tipo de documento con 4 tabs — Tarjeta (título, precio, features, CTA), Visual (recomendado, badge, cupos, orden), Comparativa (filas por plan) y Formulario de Contacto (servicio y mensaje pre-llenado). Reemplaza el archivo estático `src/data/planes.ts`.
- **`Planes.astro` conectado a Sanity**: La sección de precios y la tabla comparativa se renderizan desde los documentos `plan` ordenados por `order`. La tabla se construye dinámicamente desde las filas de cada plan.
- **Coordinación plan → formulario dinámica**: Los botones CTA de planes ahora incluyen `data-service` y `data-message` desde Sanity. `Contacto.astro` ya no usa un `planMap` hardcodeado — lee los atributos directamente del botón clickeado o lo busca en el DOM para selección por URL.
- **`planId` como slug**: El campo de ID interno en planes usa tipo `slug` con generador automático desde el título.
- **Dashboard QuickLinks rediseñado**: Lista vertical con filas interactivas, iconos fill con color por categoría, etiqueta muted y flecha animada al hover. Incluye acceso directo a "Nuevo Plan". Estilos movidos a `QuickLinks.css`.
- **Acceso directo "Nuevo Plan"** en Acciones Rápidas del Studio.

### 🔒 Seguridad

- **OTP corregido en páginas `/consultoria/[slug]`**: El componente `ReportGate` estaba importado pero comentado y la variable `isLocked` nunca se usaba para bloquear el render. Se descomenta el import y se envuelve el contenido en un condicional `isLocked ? <ReportGate> : <Layout>`. Los reportes protegidos ahora requieren OTP correctamente en todas las rutas.

### ✅ Corregido

- **Emojis en previews del Studio**: Eliminados ⭐ en planes y ✅ ⏳ 📝 en facturas. Reemplazados por iconos Phosphor fill (`Star`, `CheckCircle`, `Clock`, `FileText`) en el campo `media` del preview.
- **Planes de Precios en sidebar del Studio**: Aparece como un solo ítem de lista de documentos `plan` bajo Sitio Web, en vez de dos documentos separados.

---

## [2.4.0] — 2026-05-07

### 🔥 Breaking Changes

- **Migración CMS: Contentful → Sanity**: Toda la capa de contenido migrada a Sanity Studio. El cliente Contentful y sus adapters ya no se usan en el frontend. Las variables `CONTENTFUL_*` ya no son requeridas en producción.

### 🚀 Agregado

- **Sanity Studio embebido**: Studio accesible en `/studio` con esquemas custom para todos los tipos de contenido (`auditReport`, `blogPost`, `portfolioCase`, `servicio`, `recurso`, `testimonial`).
- **`executiveSummary` y `conclusion`** renderizados en `/consultoria/[slug]`: Dos nuevas secciones visibles en el reporte cuando tienen contenido en Sanity.
- **Phosphor icon picker en OptionsGrid**: El campo `icon` en las opciones de comparación usa un selector visual de íconos Phosphor desde el Studio.
- **Rediseño `OptionCard`**: BEM completo (`ocard__*`), badge "Recomendado" flotante, icono de acento 3×3rem, listas pros/cons con íconos `ph-plus-circle`/`ph-minus-circle`, layout responsive mejorado desde 560px.
- **KV namespace `REPORT_LOGS`**: Creado y configurado en `wrangler.toml` con ID real para logs de acceso a reportes.

### 🔒 Seguridad

- **Protección OTP reactivada**: El bloque `if (entry.protected)` en `[slug].astro` está activo — los reportes marcados como protegidos vuelven a requerir verificación OTP o sesión admin para acceder. Incluye lógica de `accessExpiry` y `expiryWarning`.

### ✅ Corregido

- **4to card vacío en options grid**: Sanity generaba un objeto vacío de 4to elemento. Corregido con `.filter((opt) => opt.title)` en `OptionsGrid.astro`.
- **CSS duplicado en `[slug].astro`**: Eliminados ~750 líneas de estilos duplicados de todos los componentes viz (option cards, metric highlight, bar chart, vitals table, score grid, stack table, priority block, CTA, competitor table). Cada componente ya tiene sus estilos escopados.
- **`console.log` en dev**: Eliminados 3 logs de debug (Sanity Query, Slug parameter, Raw doc) que aparecían en cada request durante desarrollo.

### 🗑️ Eliminado

- **`@contentful/rich-text-types`**: Desinstalado, ya no se usa en ningún path activo.
- **`@portabletext/contentful-rich-text-to-portable-text`**: Desinstalado.

---

## [2.3.1] — 2026-04-28

### ✅ Corregido

- **Estilos perdidos en migración MDX → Contentful** (`[slug].astro`): Se añadieron las reglas CSS globales faltantes para todos los bloques de visualización generados por el adapter (`cta-text-wrapper`, `cta-action`, `custom-quote`, `split-block`, `threshold-value`, `company-info`, `company-domain`, `diff-text`, `col-*`, `ads-badge`, `comp-row`, `stack-row`, `list-section`, `text-good`, `text-poor`, `metric-val-wrapper`, `metric-text`, `priority-icon`, `text-muted` y variantes de color para `status-dot` y `gap-badge`).
- **Variables CSS RGB faltantes** (`global.css`): Se definen `--color-surface-rgb`, `--color-line-rgb` y `--color-surface-subtle-rgb` para los temas oscuro y claro. Sin estas, los fondos glassmorphism de `score-card` y `option-card` quedaban transparentes.
- **`--color-green-400` no definido** (`global.css`): Se agrega `#4ade80`. Era referenciado en los indicadores de estado `status-good` del metric highlight y el badge de pauta en la tabla de competidores.
- **Renderizado de `reportBlockOptionsGrid`** (`contentful-adapters.ts`): Se agrega el caso para el content type "Report Block: Grilla Comparativa de Opciones". Itera las referencias hijas (`options`) y genera el grid HTML con `<div class="options-grid">`. El bloque existía en Contentful pero era ignorado por el adapter (rendereaba vacío).
- **Campo `description` como Rich Text en option cards**: Tanto `reportBlockOption` como `reportBlockOptionsGrid` ahora detectan si `description` es un objeto Rich Text de Contentful y lo renderizan con `documentToHtmlString`. Antes imprimía `[object Object]`.

### 🚀 Agregado

- **`groupOptionCards()`** (`contentful-adapters.ts`): Post-procesamiento del HTML de `reportContent` que envuelve automáticamente `<article class="option-card">` consecutivos en un `<div class="options-grid">`, para compatibilidad con reportes que usen cards individuales embebidas en vez del content type grid.

---

## [2.3.0] — 2026-04-26

### 🚀 Agregado

- **Sección `/recursos`**: Marketplace de productos digitales propios (templates Astro, UI kits, auditorías y guías). Incluye índice con cards y página de detalle `/recursos/[slug]` con galería, features checklist, rich text y CTAs de Gumroad.
- **Content type `recurso` en Contentful**: Creado via script (`scripts/setup-recurso-model.ts`) con 15 campos tipados. Seeded con los dos primeros productos: _Zutra Real Estate_ y _Minimalist Portfolio Template_.
- **Product JSON-LD schema**: `ItemList` en el índice; `Product` con `Offer` en cada detalle. Estructurado para Google Shopping y Rich Results.
- **`/recursos` en navegación**: Agregado al menú principal.

### 🔒 Seguridad

- **Headers HTTP reforzados** (`public/_headers`): Se agregan `Strict-Transport-Security` (HSTS, preload), `Permissions-Policy`, `X-XSS-Protection` y `Referrer-Policy` en las rutas de preview. Se reemplaza el wildcard `*.contentful.com` por dominios exactos en el CSP de preview.
- **Rate limiter distribuido** (`src/lib/rate-limit.ts`): Reescrito para usar **Cloudflare KV** en lugar del store en-memoria por worker. Fallback en-memoria para dev local. El binding `ZUTRA_KV` ya estaba declarado en `wrangler.toml`.
- **IP extraction segura**: Se elimina el fallback a `x-forwarded-for` (spoofeable) — solo se confía en `cf-connecting-ip` de Cloudflare.
- **TTL de sesión admin reducido**: De 365 días a 30 días en `consultoria/verify.astro`.
- **Logout CSRF-safe**: `consultoria/logout.ts` convertido de GET a POST con verificación de `Origin` header. Los links de logout en `/consultoria` e `/consultoria/[slug]` actualizados a `<form method="POST">`.

### ⚡ Performance

- **Fuentes optimizadas** (`Layout.astro`): Eliminadas 6 familias no usadas (Unbounded, Orbitron, Space Grotesk, Oxanium, Azeret Mono, Bevellier). Solo se cargan Bricolage Grotesque y Outfit con `display=swap` y preload hint. Impacto estimado: −1 a 1.5s en FCP.
- **Imágenes WebP automáticas** (`adaptAsset()`): Todas las imágenes de Contentful ahora incluyen parámetros de optimización en la URL (`?fm=webp&q=80&w=...`). SVGs excluidos. Cero cambios necesarios en los templates.

### ✅ Corregido

- **`article:published_time` con fecha real**: El componente `SEO.astro` aceptaba `publishDate`/`updatedDate` como props opcionales. Antes devolvía `new Date()` para todos los artículos — ahora usa la fecha real del post pasada desde `blog/[slug].astro`.
- **Hash de integridad Sentry inválido**: Eliminado el atributo `integrity` con placeholder `sha384-7kKjF7...` que podía bloquear el script en algunos entornos.
- **Imports `Image` sin usar**: Eliminados de `Hero.astro` y `Casos.astro`.
- **Tests de rate limiter**: Actualizados a función async y sin dependencia de `cleanupRateLimitStore` eliminado.

---

## [2.2.0] — 2026-04-25

### 🚀 Agregado

- **Login admin desde índice**: `/consultoria` ahora muestra un formulario OTP para admins en lugar de redirigir a 404. El slug especial `__admin__` maneja el flujo sin requerir un reporte específico.
- **Acceso admin global a reportes**: Admins con cookie `zutra_admin` válida pueden acceder a cualquier reporte protegido sin necesidad de verificación individual por reporte.
- **Logs de acceso en panel**: El índice admin muestra último acceso, visitantes únicos y total de accesos por reporte (leídos desde Cloudflare KV).

### ✅ Corregido

- **Seguridad — HMAC-SHA256 en tokens**: Los tokens OTP y cookies de sesión ahora están firmados con HMAC-SHA256 via Web Crypto API. Antes eran Base64 puro y podían forjarse manualmente.
- **Imágenes de slides con 404**: Las imágenes en `src/content/consultoria/*/` ahora se resuelven correctamente a través de `import.meta.glob` con `eager: true`, obteniendo la URL procesada por Vite.
- **Imágenes lazy en dialog**: Cambiado `loading="lazy"` a `loading="eager"` en slides — Chrome reemplazaba las imágenes lazy dentro de `<dialog>` ocultos con placeholders.
- **TOC intermitente**: El generador de tabla de contenidos ahora usa `requestAnimationFrame` para asegurar que el contenido MDX está en el DOM antes de escanear los `h2`.
- **Validación de email en API OTP**: Se agrega validación de formato antes de llamar a Brevo.

### 🗑️ Eliminado

- **`downloadMode`**: Se eliminó el campo del schema, la lógica del botón de descarga PDF, el CSS asociado y el bloque `@media print` de slides y reporte. Toda referencia en MDX limpiada.
- **`signToken` (payload object)**: Reemplazado por la nueva API que firma strings directamente con HMAC.

---

## [2.1.0] — 2026-04-23

### 🚀 Agregado

- **Módulo de Consultoría**: Nuevo sistema de reportes y auditorías interactivas para clientes.
- **Reportes MDX**: Implementación de reportes dinámicos mediante MDX en `src/content/consultoria`.
- **Slides Presentation**: Sistema de diapositivas interactivas integradas en los reportes (`SlidesModal.astro`).
- **Protección de Reportes**: Sistema de autenticación mediante tokens OTP y verificación de acceso en `src/lib/report-auth.ts`.
- **Visualización de Datos**: Suite completa de componentes de visualización (`BarChart`, `StackTable`, `MetricHighlight`, etc.) bajo `src/components/consultoria/viz/`.
- **UX Improvements**: Apertura automática de presentaciones al entrar a un reporte y botón de cierre dinámico "Ver reporte completo".

### ✅ Corregido

- **Slides Transition**: Optimización de transiciones y reseteo de scroll al navegar entre diapositivas.

---

## [2.0.0] — 2026-04-10

### 🔥 Breaking Changes

- **Build script simplificado**: Se eliminó el script de build con `cp -r` + `mv` en `package.json`. Ahora `pnpm build` solo ejecuta `astro build` y `pnpm deploy` usa `wrangler pages deploy` nativo.
- **`Astro.locals.runtime.env` removido**: Se migró a `import { env } from "cloudflare:workers"` para compatibilidad con Astro v6.
- **`debug` alias**: Se reemplazó el paquete `debug` (CommonJS incompatible con Vite 7 SSR) por un stub ESM en `src/lib/mock-debug.js`.
- **Skip link global**: El `<main id="main">` se movió de páginas individuales a `Layout.astro`. Las páginas ya no deben envolver su contenido en `<main>`.

### 🚀 Agregado

- **Vitest**: Framework de testing con 23 tests en 4 suites (sanitize, slugify, rate-limit, contentful-adapters).
- **GitHub Actions CI**: Pipeline de calidad de código (lint + typecheck + test) en cada PR sin necesidad de secrets.
- **lint-staged + simple-git-hooks**: Pre-commit auto-formatea archivos y pre-push ejecuta typecheck + tests.
- **Sentry**: Error tracking client-side configurado en `Layout.astro` (se activa con `SENTRY_DSN`).
- **Preview pages**: Se crearon `/preview/portfolio/[slug]` y `/preview/servicios/[slug]` para vista previa de drafts.
- **Rate limiting**: Middleware en memoria para `/api/contact` (5 req/15min) y `/api/lead` (10 req/15min).
- **Structured data mejorada**: Schema `LocalBusiness` con `knowsAbout`, `makesOffer`, `areaServed`, `potentialAction`.
- **BlogPosting schema**: Cada post de blog ahora tiene structured data con `datePublished`, `dateModified`, `author`.
- **dateModified en posts**: Se muestra fecha de actualización cuando existe en Contentful.
- **Heading hierarchy fix**: Se agregó `<h2>` en `portfolio/index.astro` para corregir salto h1→h3.
- **aria-describedby**: Campo teléfono en formulario de contacto vinculado a su mensaje de error.
- **Clase `.sr-only`**: Utilidad de accesibilidad para texto solo visible por screen readers.
- **Scripts nuevos**: `typecheck`, `test`, `test:watch`, `test:coverage`, `deploy`, `deploy:dry`, `prepare`.

### ✅ Corregido

- **FAQ schema mismatch**: Ahora lee dinámicamente de `src/data/faqs.ts` en vez de contenido hardcoded diferente.
- **Twitter handle**: Actualizado de `@tuagenciazutra` a `@zutra_agency`.
- **Rutas de categoría**: Unificadas a `categoria` (español) en blog y servicios.
- **Carpeta `services`**: Renombrada a `servicios` para consistencia con URLs en español.
- **Contentful `readEnv`**: Ahora lee correctamente de `cloudflare:workers` en lugar del removido `locals.runtime.env`.
- **Cache con TTL**: El cache de Contentful ahora tiene TTL de 5 minutos con invalidación automática.
- **Error messages seguros**: Se eliminó leak de información interna en respuestas de API.
- **`.env.example`**: Todos los valores ahora están vacíos (sin defaults peligrosos).
- **Vars de entorno documentadas**: Se agregaron todas las variables necesarias al `.env.example`.
- **Open Graph article tags**: Agregados `article:published_time` y `article:modified_time` para posts.
- **Imports unificados**: Todos los imports del proyecto ahora usan el alias `@/`.
- **tsconfig.json**: Eliminado `baseUrl` deprecado, agregado `ignoreDeprecations: "6.0"`.

### 🗑️ Eliminado

- **Archivos muertos**: `gtm.ts`, `mock-debug.js` (original), `formatters.ts`, `utils/slugify.ts`, `resultados.ts`, `Resultados.astro`, `public/main.js`.
- **WhatsAppButton.astro**: Código muerto (se usa `WhatsAppBot.astro`).
- **Backup CSS**: `style-respaldo.css` (1360 líneas sin usar).
- **Assets duplicados**: 15 PNGs/JPGs reemplazados por versiones `.webp`.
- **Gallery images**: 16 imágenes de galería nunca importadas.
- **Archivos públicos inútiles**: `isotipo.png`, `.DS_Store`.
- **Orphan tsconfig excludes**: Referencias a archivos que no existen (`demo-zutra.astro`, `schedule.astro`).

---

## [1.0.0] — Pre-Refactor

### Notas

Versión anterior a la estandarización del proyecto. Incluye:

- Diseño original del sitio con Astro 6 + Cloudflare
- Integración con Contentful CMS
- WhatsApp Lead Bot ("El Zutro")
- Formulario de contacto con Brevo + Turnstile
- Preview en tiempo real para Contentful
- Sistema de acentos dinámicos "Zutra Energy"

---

[2.1.0]: https://github.com/zutra/agencia-zutra/releases/tag/v2.1.0
[2.0.0]: https://github.com/zutra/agencia-zutra/releases/tag/v2.0.0
