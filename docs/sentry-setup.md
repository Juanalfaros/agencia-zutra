# Guía de Configuración de Sentry

## 1. Crear cuenta y proyecto

1. Ve a [sentry.io](https://sentry.io) y crea una cuenta (gratis hasta 5K errores/mes).
2. En el dashboard, haz clic en **"+ Create Project"**.
3. Selecciona plataforma: **JavaScript** → **Astro** (o **Browser** si no aparece Astro).
4. Ponle nombre: `agencia-zutra`.
5. Te dará un **DSN** similar a:
   ```
   https://abc123@o123456.ingest.sentry.io/789012
   ```

## 2. Configurar variables de entorno

### Local (`.env`)
```bash
SENTRY_DSN=https://abc123@o123456.ingest.sentry.io/789012
```

### Cloudflare Pages
1. Ve a **Cloudflare Dashboard** → **Pages** → `agencia-zutra` → **Settings** → **Environment Variables**
2. Agrega la variable `SENTRY_DSN` con tu DSN
3. Haz un nuevo deploy para que tome efecto

### GitHub Actions (opcional)
Solo si quieres enviar sourcemaps desde CI:
1. Settings → Secrets and variables → Actions
2. Agrega `SENTRY_DSN` y `SENTRY_AUTH_TOKEN`

## 3. Generar Sentry Auth Token (para sourcemaps)

1. Ve a [sentry.io/settings/auth-tokens](https://sentry.io/settings/auth-tokens/)
2. Crea un token con permisos: **`project:write`**, **`project:releases`**
3. Guárdalo en Cloudflare Pages como `SENTRY_AUTH_TOKEN`

## 4. Verificar que funciona

1. Abre la consola del navegador en tu sitio (`F12` → Console)
2. Ejecuta:
   ```js
   Sentry.captureMessage('Test desde consola');
   ```
3. Debería aparecer en tu dashboard de Sentry → Issues

## 5. Capturas automáticas

El script ya configurado en `Layout.astro` captura automáticamente:

| Tipo | Qué captura |
|------|-------------|
| **Errors** | `console.error`, excepciones no manejadas, promises rechazadas |
| **Replays** | Grabación de sesión del usuario cuando ocurre un error (5% sampling) |
| **Performance** | Tracing de navegación y peticiones fetch (10% sampling) |

## 6. Capturas manuales (uso avanzado)

En cualquier script del cliente:
```js
// Capturar un error con contexto extra
Sentry.captureException(new Error('Algo falló'), {
  tags: { section: 'checkout' },
  user: { email: 'usuario@ejemplo.com' }
});

// Capturar un mensaje informativo
Sentry.captureMessage('Usuario completó el formulario', 'info');

// Capturar una transacción de performance
const tx = Sentry.startTransaction({ name: 'checkout-flow' });
// ... tu código ...
tx.finish();
```

## 7. Alertas recomendadas

En Sentry → **Alerts** → **Create Rule**:

| Alerta | Condición | Canal |
|--------|-----------|-------|
| Error nuevo | Cualquier error nuevo | Email |
| Regresión | Error resuelto que vuelve a aparecer | Email + Slack |
| Spike de errores | +10 errores en 5 minutos | Slack |

## 8. Privacy / GDPR

El script actual tiene sampling bajo para proteger privacidad:
- `tracesSampleRate: 0.1` → solo 10% de requests se tracean
- `replaysSessionSampleRate: 0.05` → solo 5% de sesiones se graban
- `replaysOnErrorSampleRate: 1.0` → 100% cuando hay error (últimos 30s)

Si necesitas scrub de datos sensibles (emails, tokens), configúralo en Sentry → **Settings** → **Security & Privacy** → **Data Scrubbing**.
