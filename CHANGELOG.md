# Changelog

Todos los cambios notables en este proyecto serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es/1.1.0/).

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
