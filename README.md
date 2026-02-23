# Zutra — La Estética Valiente

Zutra es una agencia de **Growth Marketing & Tecnología** con base en Chile. Este es su sitio web oficial, diseñado para el alto performance, conversiones optimizadas y una estética premium.

## 🚀 Tech Stack

- **Framework**: [Astro 5.0](https://astro.build/) (Modo Estático con Rutas Dinámicas).
- **Despliegue**: [Cloudflare Pages](https://pages.cloudflare.com/).
- **Estilos**: Vanilla CSS con un sistema de tokens globales y variables personalizadas para máxima velocidad.
- **Icons**: [Phosphor Icons](https://phosphoricons.com/) e [Iconify](https://iconify.design/).
- **Email Service**: [Brevo](https://www.brevo.com/) (SMTP Transactional API).
- **Security**: [Cloudflare Turnstile](https://www.cloudflare.com/products/turnstile/) (Bot Protection).
- **CMS**: [Contentful](https://www.contentful.com/) (Headless CMS).

## 📁 Estructura del Proyecto

```text
/
├── public/              # Assets estáticos, manifest, robots.txt, robots.txt, llms.txt
├── src/
│   ├── components/      # Componentes UI organizados por secciones y comunes
│   │   ├── common/      # Header, Footer, SEO, WhatsAppButton, StickyCTA, CookieConsent
│   │   └── sections/    # Hero, Servicios, Casos, Testimonios, Contacto
│   ├── data/            # Datos estáticos y constantes
│   ├── layouts/         # Layout.astro (Master Layout con GTM y SEO centralizado)
│   ├── lib/             # Cliente Contentful, Brevo API logic y adaptadores
│   ├── pages/           # Rutas dinámicas y estáticas (.astro)
│   │   ├── api/         # Endpoints dinámicos (contact.ts para Brevo/Turnstile)
│   │   └── ...
```

## 🔌 Integraciones Clave

### 📨 Brevo (Email Marketing)
El formulario de contacto utiliza la API SMTP de Brevo para enviar dos notificaciones:
1.  **Admin Notify**: Alerta instantánea a `hola@zutra.agency` con los detalles del lead.
2.  **User Confirm**: Confirmación automática al usuario con un diseño premium y enlaces de interés.

### 💬 WhatsApp Float
Botón flotante inteligente integrado en el Layout. En dispositivos móviles, detecta la presencia del `StickyCTA` y ajusta su posición vertical para evitar colisiones visuales.

### 🛡️ Cloudflare Turnstile
Protección contra bots invisible integrada en el formulario de contacto, validada en el servidor (SSR) mediante el endpoint `/api/contact`.

## 🛠️ Desarrollo Local

1. **Instalar dependencias**:
   ```bash
   pnpm install
   ```

2. **Configurar Entorno**:
   Crea un archivo `.env` basado en `.env.example`. Asegúrate de incluir las keys de Brevo, Turnstile y Contentful.

## 🌐 SEO & Indexación

- **Robots.txt**: Configurado con el dominio principal `zutra.agency`.
- **JsonLD**: Datos estructurados centralizados en el Layout para evitar duplicidad.
- **Sitemap**: Generación automática de `sitemap-index.xml` en cada build.

---
Hecho con obsesión técnica por **Zutra**.
