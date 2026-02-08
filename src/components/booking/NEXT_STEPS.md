# 🚀 Próximos Pasos - Integración Cal.com

## 📋 Checklist de Producción

### 1. Configuración de Cal.com

- [ ] **Crear cuenta en Cal.com**
  - Registrarse en [cal.com](https://cal.com)
  - Configurar tipos de eventos (45 min, Google Meet, etc.)
  - Obtener API Key desde Settings → Developer

- [ ] **Variables de Entorno**
  ```bash
  # .env
  CAL_API_KEY=cal_live_xxxxxxxxxxxxx
  CAL_EVENT_TYPE_ID=123456
  CAL_API_URL=https://api.cal.com/v1
  ```

### 2. Reemplazar Mock Service

#### Crear `booking.service.cal.ts`

```typescript
// src/components/booking/booking.service.cal.ts
import type { BookingSlot, BookingState } from "./booking.types";

const CAL_API_KEY = import.meta.env.CAL_API_KEY;
const CAL_EVENT_TYPE_ID = import.meta.env.CAL_EVENT_TYPE_ID;

export const fetchCalSlots = async (date: string): Promise<BookingSlot[]> => {
    const response = await fetch(
        `https://api.cal.com/v1/slots?eventTypeId=${CAL_EVENT_TYPE_ID}&startTime=${date}T00:00:00Z`,
        {
            headers: {
                'Authorization': `Bearer ${CAL_API_KEY}`,
            },
        }
    );
    
    const data = await response.json();
    return data.slots.map((slot: any) => ({
        startTime: slot.time,
        endTime: slot.endTime,
        available: true,
    }));
};

export const submitCalBooking = async (formData: BookingState['formData']) => {
    const response = await fetch('https://api.cal.com/v1/bookings', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${CAL_API_KEY}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            eventTypeId: CAL_EVENT_TYPE_ID,
            name: formData.name,
            email: formData.email,
            metadata: {
                phone: formData.phone,
                company: formData.company,
                rut: formData.rut,
                notes: formData.notes,
            },
            // ... otros campos según Cal.com API
        }),
    });
    
    if (!response.ok) {
        return { success: false, message: 'Error al crear la reserva' };
    }
    
    return { success: true };
};
```

#### Actualizar `booking.store.ts`

```diff
- import { fetchMockSlots, submitMockBooking } from './booking.service.mock';
+ import { fetchCalSlots, submitCalBooking } from './booking.service.cal';

export const fetchSlotsForDate = async (date: string) => {
-    return await fetchMockSlots(date);
+    return await fetchCalSlots(date);
};

export const submitBookingInformation = async () => {
    const { formData } = bookingStore.get();
    setStatus('submitting');
    
    try {
-        const result = await submitMockBooking(formData);
+        const result = await submitCalBooking(formData);
        // ...
    }
};
```

### 3. Validación de Datos

- [ ] **Validación de Email**
  ```typescript
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailInput.value)) {
      // mostrar error
  }
  ```

- [ ] **Validación de RUT (Chile)**
  ```typescript
  import { validateRut } from '@/utils/rut-validator';
  ```

- [ ] **Validación de Teléfono**
  ```typescript
  const phoneRegex = /^\+?56\s?9\s?\d{4}\s?\d{4}$/;
  ```

### 4. Notificaciones por Email

- [ ] **Integrar Resend o SendGrid**
  - Enviar confirmación al usuario
  - Enviar notificación al equipo
  - Incluir enlace de cancelación

- [ ] **Template de Email**
  ```html
  <!-- emails/booking-confirmation.html -->
  <h1>¡Reserva Confirmada!</h1>
  <p>Tu reunión está agendada para:</p>
  <strong>{{ date }} a las {{ time }}</strong>
  ```

### 5. Manejo de Errores Avanzado

- [ ] **Pantalla de Error Dedicada**
  - Crear `ErrorSection.astro` como Paso 4
  - Mostrar mensaje personalizado según tipo de error
  - Botón "Reintentar" o "Volver al inicio"

- [ ] **Logging de Errores**
  ```typescript
  // Integrar Sentry o similar
  Sentry.captureException(error, {
      tags: { module: 'booking' },
      extra: { formData },
  });
  ```

### 6. Testing

- [ ] **Tests Unitarios**
  ```bash
  npm install -D vitest @testing-library/astro
  ```
  - Testear `booking.store.ts`
  - Testear formateo de hora 12h/24h
  - Testear validaciones

- [ ] **Tests E2E**
  ```bash
  npm install -D playwright
  ```
  - Flujo completo de reserva
  - Validación de formulario
  - Add to Calendar

### 7. Optimizaciones

- [ ] **Persistencia de Estado**
  ```typescript
  import { persistentMap } from '@nanostores/persistent';
  
  export const bookingStore = persistentMap('booking:', {
      // ... estado inicial
  });
  ```

- [ ] **Debounce en Validaciones**
  ```typescript
  import { debounce } from '@/utils/debounce';
  
  const validateEmail = debounce((email) => {
      // validar
  }, 300);
  ```

- [ ] **Lazy Loading de Iconos**
  - Optimizar bundle size
  - Cargar solo iconos necesarios

### 8. Accesibilidad

- [ ] **ARIA Labels**
  ```html
  <button aria-label="Seleccionar 15 de febrero, disponible">15</button>
  ```

- [ ] **Gestión de Foco**
  ```typescript
  // Al cambiar de paso, mover foco al primer elemento
  document.querySelector('.step-container.active input')?.focus();
  ```

- [ ] **Anuncios para Lectores de Pantalla**
  ```html
  <div role="status" aria-live="polite" class="sr-only">
      Paso 2 de 3: Complete sus datos
  </div>
  ```

### 9. Analytics

- [ ] **Tracking de Eventos**
  ```typescript
  // Google Analytics / Plausible
  trackEvent('booking_step_completed', { step: 1 });
  trackEvent('booking_submitted', { meetingType: 'google_meet' });
  ```

### 10. Deployment

- [ ] **Variables de Entorno en Cloudflare Pages**
  - Configurar `CAL_API_KEY` en dashboard
  - Configurar `CAL_EVENT_TYPE_ID`

- [ ] **Build de Producción**
  ```bash
  npm run build
  npm run preview # Verificar antes de deploy
  ```

## 🔄 Migración Gradual (Recomendado)

1. **Fase 1**: Mantener mock, agregar logging de lo que se enviaría
2. **Fase 2**: Dual mode (flag de feature para usar Cal.com en staging)
3. **Fase 3**: Producción completa con Cal.com

```typescript
const USE_CAL_COM = import.meta.env.PUBLIC_USE_CAL_COM === 'true';

export const fetchSlots = USE_CAL_COM ? fetchCalSlots : fetchMockSlots;
```

## 📚 Recursos

- [Cal.com API Docs](https://cal.com/docs/api-reference)
- [Nanostores Persistent](https://github.com/nanostores/persistent)
- [Astro Environment Variables](https://docs.astro.build/en/guides/environment-variables/)

---

**Estimación de Tiempo**: 2-3 días de desarrollo + 1 día de testing  
**Prioridad**: 🔴 Alta (bloqueante para producción)
