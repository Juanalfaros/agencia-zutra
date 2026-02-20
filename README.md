# Zutra — La Estética Valiente

Zutra es una agencia de **Growth Marketing & Tecnología** con base en Chile. Este es su sitio web oficial, diseñado para el alto performance, conversiones optimizadas y una estética premium.

## 🚀 Tech Stack

- **Framework**: [Astro 5.0](https://astro.build/) (Modo Estático con Rutas Dinámicas).
- **Despliegue**: [Cloudflare Pages](https://pages.cloudflare.com/).
- **Estilos**: Vanilla CSS con un sistema de tokens globales y variables personalizadas para máxima velocidad.
- **Iconografía**: [Phosphor Icons](https://phosphoricons.com/) e [Iconify](https://iconify.design/).
- **Frontend Tools**: [Astro Icon](https://github.com/natemoo-re/astro-icon) para manejo eficiente de SVG.
- **CMS**: [Contentful](https://www.contentful.com/) (Headless CMS).
- **Preview System**: Integración nativa con Contentful Live Preview para edición en tiempo real.
- **Sitemap**: @astrojs/sitemap.

## 📁 Estructura del Proyecto

```text
/
├── public/              # Assets estáticos, manifest, robots.txt, robots.txt, llms.txt
├── src/
│   ├── components/      # Componentes UI organizados por secciones y comunes
│   │   ├── common/      # Header, Footer, SEO, Logo, CookieConsent
│   │   └── sections/    # Hero, Servicios, Casos, Testimonios, etc.
│   ├── data/            # Datos estáticos y constantes
│   ├── layouts/         # Layout.astro (Master Layout con SEO inyectable)
│   ├── lib/             # Cliente Contentful y adaptadores de datos
│   ├── pages/           # Rutas dinámicas y estáticas (.astro)
│   │   ├── api/         # Endpoints dinámicos (Forms)
│   │   ├── blog/        # Detalle de blog con Table of Contents dinámico
│   │   └── portfolio/   # Casos de estudio con métricas y tech stack
│   ├── scripts/         # Scripts de configuración y utilidad
│   ├── types/           # Definiciones de interfaces TypeScript
│   └── styles/          # CSS global y componentes
├── astro.config.mjs     # Configuración de Astro & Cloudflare
├── wrangler.toml        # Configuración de Cloudflare Pages
└── package.json         # Dependencias y scripts
```

## 🛠️ Desarrollo Local

1. **Instalar dependencias**:
   ```bash
   pnpm install
   ```

2. **Configurar Entorno**:
   Crea un archivo `.env` basado en `.env.example`:
   ```bash
   cp .env.example .env
   ```

3. **Ejecutar en modo Desarrollo**:
   ```bash
   pnpm run dev
   ```

4. **Construir para Producción**:
   ```bash
   pnpm run build
   ```

### 📄 Gestión de Contenido (Contentful)

El sitio utiliza Contentful para gestionar Blog, Portfolio, Servicios y Testimonios. 

1.  **Configuración de Modelos**: Para inicializar o actualizar los tipos de contenido en un nuevo espacio de Contentful:
    ```bash
    # Configuración general (Blog, Portfolio, Servicios, Hero)
    npx tsx scripts/setup-contentful-models.ts
    
    # Configuración específica de Testimonios
    npx tsx scripts/setup-testimonial-model.ts
    ```

2.  **Sincronización**: Para migrar datos locales a Contentful, usa el script de migración disponible.
3.  **Live Preview**: El sitio soporta previsualización en tiempo real. 
    - Para habilitarlo en local, asegúrate de tener `CONTENTFUL_PREVIEW_TOKEN` en tu `.env`.
    - En producción, usa el botón "Open Live Preview" desde Contentful.

## 🌐 SEO & Indexación

El proyecto incluye un sistema SEO integral:
- **SEO.astro**: Componente centralizado para Meta Tags, OG y Twitter Cards.
- **Sitemap**: Generación automática de `sitemap-index.xml`.
- **Robots & Manifest**: Ficheros optimizados para buscadores y apps móviles.
- **LLMs.txt**: Documentación estructurada para el rastreo de agentes de IA.

## ☁️ Despliegue en Cloudflare

El despliegue está automatizado vía GitHub Actions o conexión directa de Cloudflare Pages:
- **Build Command**: `pnpm run build`
- **Output Directory**: `dist`
- **Compatibility Date**: `2024-04-03`

---
Hecho con obsesión técnica por **Zutra**.
