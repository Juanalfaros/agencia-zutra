# Zutra — La Estética Valiente

Zutra es una agencia de **Growth Marketing & Tecnología** con base en Chile. Este es su sitio web oficial, diseñado para alto performance, conversiones optimizadas y una estética premium.

## 🚀 Tech Stack

- **Framework**: [Astro 6.0](https://astro.build/) (Modo Estático con Assets dinámicos)
- **Despliegue**: [Cloudflare Workers](https://workers.cloudflare.com/) (Arquitectura de alto rendimiento)
- **Estilos**: Vanilla CSS con un sistema de tokens globales, variables personalizadas y "Zutra Energy" (Acentos dinámicos)
- **Icons**: [Phosphor Icons](https://phosphoricons.com/) e [Iconify](https://iconify.design/)
- **Email Service**: [Brevo](https://www.brevo.com/) (SMTP Transactional API)
- **Security**: [Cloudflare Turnstile](https://www.cloudflare.com/products/turnstile/) (Bot Protection)
- **CMS**: [Contentful](https://www.contentful.com/) (Headless CMS con sistema de Preview en tiempo real)

## 📁 Estructura del Proyecto

```text
/
├── public/              # Assets estáticos, manifest, robots.txt, llms.txt
├── src/
│   ├── components/
│   │   ├── common/      # Header, Footer, SEO, WhatsAppBot, JsonLD, BreadcrumbSchema
│   │   └── sections/    # Hero, Servicios, Casos, Testimonios, Contacto, Faqs
│   ├── data/            # Contenido centralizado del bot y constantes
│   ├── layouts/         # Layout.astro (Master Layout con GTM y SEO)
│   ├── lib/             # Cliente Contentful, Brevo API logic y adaptadores
│   └── pages/
│       ├── api/         # Endpoints dinámicos (contact.ts, lead.ts)
│       └── ...
```

## 🔌 Integraciones Clave

### 🤖 El Zutro — WhatsApp Lead Bot

Mini-bot conversacional flotante que califica leads de forma interactiva y los redirige a WhatsApp con contexto completo.

**Flujo**: Nombre → Email → Servicio → Urgencia → Redirect a WhatsApp + captura en Brevo.

**Características:**

- **Boss Mode**: Detecta a los jefes (Juan/Camilo) y cambia el tono a respetuoso.
- **Easter Eggs**: Respuestas personalizadas para palabras clave como "precio" o "agencia".
- **Reiteración Fluida**: Tras un desvío, el bot retoma la conversación sin repetir saludos.
- **Persistencia**: Estado guardado en `sessionStorage` para retomar la conversación al reabrir.
- **Anti-Popup Blocker**: Redirección a WhatsApp sincrónica para compatibilidad total.

| Archivo                                   | Rol                                          |
| ----------------------------------------- | -------------------------------------------- |
| `src/components/common/WhatsAppBot.astro` | Estructura HTML y estilos del widget         |
| `src/components/common/whatsapp-bot.ts`   | Motor de conversación y gestión de estado    |
| `src/data/bot-content.ts`                 | Contenido, easter eggs y pasos centralizados |
| `src/pages/api/lead.ts`                   | Captura silenciosa de leads en Brevo         |

### 📨 Brevo (Email Marketing)

El formulario de contacto utiliza la API SMTP de Brevo para enviar dos notificaciones:

1.  **Admin Notify**: Alerta instantánea a `hola@zutra.agency` con los detalles del lead.
2.  **User Confirm**: Confirmación automática al usuario con un diseño premium.

### 💬 WhatsApp Button

Botón flotante también integrado en el Layout. En dispositivos móviles, detecta el `StickyCTA` y ajusta su posición para evitar colisiones visuales.

### 🛡️ Cloudflare Turnstile

Protección contra bots invisible integrada en el formulario de contacto, validada en el servidor mediante el endpoint `/api/contact`.

### 👁️ Contentful Preview

Sistema de vista previa en tiempo real para contenido borrador que funciona en producción (Cloudflare) y desarrollo.

**Arquitectura**:

- **Ruta API**: `/api/preview` establece una cookie de sesión para habilitar el modo preview.
- **Ruta Dinámica**: `/preview/blog/[slug]` renderiza el contenido directamente desde la API de Preview de Contentful, saltándose el cache estático.
- **Cliente SSR**: El cliente de Contentful es "context-aware" y detecta la cookie de preview en cada request dinámica.

## 🛠️ Desarrollo Local

1. **Instalar dependencias**:

   ```bash
   pnpm install
   ```

2. **Configurar Entorno**:
   Crea un archivo `.env` basado en `.env.example`. Requiere keys de Brevo, Turnstile y Contentful.

3. **Correr en Local**:
   ```bash
   pnpm dev
   ```

## 🌐 SEO & Indexación

- **Robots.txt**: Configurado con el dominio principal `zutra.agency` y sitemap sincronizado.
- **JsonLD**: Datos estructurados modulares (Organization, FAQPage condicional, BreadcrumbList).
- **Sitemap**: Generación automática de `sitemap-index.xml` en cada build.
- **Asset Optimization**: Uso masivo de Astro `<Image />` para optimización automática de formatos (WebP/AVIF) y redimensionamiento dinámico.
- **PWA Ready**: Soporte nativo para iOS y Android con iconos generados a medida y `manifest.webmanifest`.

---

Hecho con obsesión técnica por **Zutra**. 🫡
