# Zutra — La Estética Valiente

Zutra es una agencia de **Growth Marketing & Tecnología** con base en Chile. Este es su sitio web oficial, diseñado para el alto performance, conversiones optimizadas y una estética premium.

## 🚀 Tech Stack

- **Framework**: [Astro 5.0](https://astro.build/) (Modo Estático con Rutas Dinámicas).
- **Despliegue**: [Cloudflare Pages](https://pages.cloudflare.com/).
- **Estilos**: Vanilla CSS con un sistema de tokens globales y variables personalizadas para máxima velocidad.
- **Iconografía**: [Phosphor Icons](https://phosphoricons.com/) e [Iconify](https://iconify.design/).
- **Frontend Tools**: [Astro Icon](https://github.com/natemoo-re/astro-icon) para manejo eficiente de SVG.
- **Backend/Integraciones**:
  - **Email & CRM**: Brevo (vía API nativa).
  - **Analytics**: Google Tag Manager.
  - **Sitemap**: @astrojs/sitemap.

## 📁 Estructura del Proyecto

```text
/
├── public/              # Assets estáticos, manifest, robots.txt, robots.txt, llms.txt
├── src/
│   ├── components/      # Componentes UI organizados por secciones y comunes
│   │   ├── common/      # Header, Footer, SEO, Logo, CookieConsent
│   │   └── sections/    # Hero, Servicios, Casos, Metodo, etc.
│   ├── data/            # Base de datos centralizada (Casos, Blog, Servicios)
│   ├── layouts/         # Layout.astro (Master Layout con SEO inyectable)
│   ├── pages/           # Rutas dinámicas y estáticas (.astro)
│   │   ├── api/         # Endpoints dinámicos (Forms)
│   │   ├── blog/        # Detalle de blog con Table of Contents dinámico
│   │   └── portfolio/   # Casos de estudio con métricas y tech stack
│   ├── scripts/         # Lógica JS (Mobile nav, forms, scroll animations)
│   └── styles/          # CSS global y componentes
├── astro.config.mjs     # Configuración de Astro & Cloudflare
├── wrangler.toml        # Configuración de Cloudflare Pages
└── package.json         # Dependencias y scripts
```

## 🛠️ Desarrollo Local

1. **Instalar dependencias**:
   ```bash
   npm install
   ```

2. **Configurar Entorno**:
   Crea un archivo `.env` basado en `.env.example`:
   ```bash
   cp .env.example .env
   ```

3. **Ejecutar en modo Desarrollo**:
   ```bash
   npm run dev
   ```

4. **Construir para Producción**:
   ```bash
   npm run build
   ```

## 🌐 SEO & Indexación

El proyecto incluye un sistema SEO integral:
- **SEO.astro**: Componente centralizado para Meta Tags, OG y Twitter Cards.
- **Sitemap**: Generación automática de `sitemap-index.xml`.
- **Robots & Manifest**: Ficheros optimizados para buscadores y apps móviles.
- **LLMs.txt**: Documentación estructurada para el rastreo de agentes de IA.

## ☁️ Despliegue en Cloudflare

El despliegue está automatizado vía GitHub Actions o conexión directa de Cloudflare Pages:
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Compatibility Date**: `2024-04-03`

---
Hecho con obsesión técnica por **Zutra**.
