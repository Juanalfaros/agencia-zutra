export const prerender = false;

import { sanitizeInput } from '@/lib/utils/sanitize';
import { checkRateLimit } from '@/lib/rate-limit';

export const POST = async ({
  request,
  locals,
}: {
  request: Request;
  locals: any;
}) => {
  // Rate limiting: 5 requests per 15 minutes per IP
  const clientIP = request.headers.get('cf-connecting-ip') ?? 'unknown';
  const kv = locals?.env?.ZUTRA_KV;
  const rateLimit = await checkRateLimit(
    `contact:${clientIP}`,
    5,
    15 * 60 * 1000,
    kv
  );

  if (!rateLimit.allowed) {
    return new Response(
      JSON.stringify({ message: 'Demasiados intentos. Inténtalo más tarde.' }),
      { status: 429 }
    );
  }
  // Aceptamos multipart/form-data para Turnstile automático o application/json
  const contentType = request.headers.get('Content-Type') || '';

  try {
    let name, email, message, phone, service, turnstileToken;

    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      name = formData.get('name')?.toString();
      email = formData.get('email')?.toString();
      message = formData.get('message')?.toString();
      phone = formData.get('phone')?.toString();
      service = formData.get('service')?.toString();
      turnstileToken = formData.get('cf-turnstile-response')?.toString();
    } else {
      const data = await request.json();
      name = data.name;
      email = data.email;
      message = data.message;
      phone = data.phone;
      service = data.service;
      turnstileToken = data.turnstileToken;
    }

    // Sanitizar inputs
    name = sanitizeInput(name);
    email = sanitizeInput(email);
    message = sanitizeInput(message);
    phone = sanitizeInput(phone);
    service = sanitizeInput(service);

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ message: 'Faltan campos requeridos' }),
        {
          status: 400,
        }
      );
    }

    // --- GESTIÓN DE VARIABLES DE ENTORNO (Astro 6 / Cloudflare v13) ---
    // En Cloudflare Pages, las variables de entorno están en locals.env
    const runtimeEnv = (locals?.env as any) || {};
    const getEnv = (key: string) =>
      runtimeEnv[key] ||
      (import.meta.env as any)[key] ||
      (process.env as any)[key] ||
      '';

    const TURNSTILE_SECRET_KEY = getEnv('TURNSTILE_SECRET_KEY');
    const BREVO_API_KEY = getEnv('BREVO_API_KEY').trim();
    const ADMIN_EMAIL = getEnv('ADMIN_EMAIL') || 'hola@zutra.agency';
    const TEMPLATE_CONFIRMATION = parseInt(
      getEnv('BREVO_TEMPLATE_CONFIRMATION') || '2'
    );
    const TEMPLATE_ADMIN = parseInt(getEnv('BREVO_TEMPLATE_ADMIN') || '1');

    // --- VERIFICACIÓN TURNSTILE ---
    const userIP = request.headers.get('cf-connecting-ip') || '';

    if (!TURNSTILE_SECRET_KEY) {
      console.error('TURNSTILE_SECRET_KEY no está definida.');
      return new Response(
        JSON.stringify({
          message: 'Error de configuración en el servidor (Turnstile)',
        }),
        {
          status: 500,
        }
      );
    }

    if (!turnstileToken) {
      return new Response(
        JSON.stringify({ message: 'Verificación de seguridad requerida' }),
        {
          status: 400,
        }
      );
    }

    const verifyResponse = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `secret=${encodeURIComponent(TURNSTILE_SECRET_KEY)}&response=${encodeURIComponent(turnstileToken)}&remoteip=${encodeURIComponent(userIP)}`,
      }
    );

    const verifyData = (await verifyResponse.json()) as {
      success: boolean;
      'error-codes'?: string[];
    };

    if (!verifyData.success) {
      return new Response(
        JSON.stringify({
          message: 'Error en la verificación de seguridad. Inténtalo de nuevo.',
          details: verifyData['error-codes'],
        }),
        {
          status: 400,
        }
      );
    }

    // --- ENVÍO A BREVO (Transactional) ---
    if (!BREVO_API_KEY || BREVO_API_KEY === 'undefined') {
      console.error('BREVO_API_KEY no definida o inválida.');
      return new Response(
        JSON.stringify({
          message: 'Error de configuración de mensajería (API Key faltante)',
        }),
        {
          status: 500,
        }
      );
    }

    // Procesar nombre para los parámetros
    const nameParts = name.trim().split(/\s+/);
    const firstName = nameParts[0] || '';
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';
    const phoneRaw = phone?.replace(/[^0-9]/g, '') || '';

    const sender = { name: 'Agencia Zutra', email: 'hola@zutra.agency' };

    // 1. Notificación para el Admin
    const adminEmailPromise = fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'api-key': BREVO_API_KEY,
      },
      body: JSON.stringify({
        sender,
        to: [{ email: ADMIN_EMAIL, name: 'Zutra Admin' }],
        templateId: TEMPLATE_ADMIN,
        subject: `Nuevo Lead: ${firstName} ${lastName}`,
        params: {
          first_name: firstName,
          last_name: lastName,
          email: email,
          phone: phone || 'No proporcionado',
          phone_raw: phoneRaw,
          service_interest: service || 'No especificado',
          message: message,
        },
      }),
    });

    // 2. Confirmación para el Usuario
    const userEmailPromise = fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'api-key': BREVO_API_KEY,
      },
      body: JSON.stringify({
        sender,
        to: [{ email: email, name: name }],
        templateId: TEMPLATE_CONFIRMATION,
        subject: `¡Hola ${firstName}! Hemos recibido tu mensaje`,
        params: {
          first_name: firstName,
        },
      }),
    });

    const [adminRes, userRes] = await Promise.all([
      adminEmailPromise,
      userEmailPromise,
    ]);

    if (!adminRes.ok || !userRes.ok) {
      const adminStatus = adminRes.status;
      const userStatus = userRes.status;

      // Log full errors internally but don't expose to client
      if (!adminRes.ok) {
        const adminError = await adminRes.json();
        console.error('Error Brevo SMTP Admin:', adminError);
      }
      if (!userRes.ok) {
        const userError = await userRes.json();
        console.error('Error Brevo SMTP User:', userError);
      }

      return new Response(
        JSON.stringify({
          message: 'Error al enviar correos. Inténtalo más tarde.',
        }),
        {
          status: 500,
        }
      );
    }

    return new Response(
      JSON.stringify({ message: 'Mensaje enviado con éxito' }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error en API Contact:', error);
    return new Response(
      JSON.stringify({ message: 'Error interno del servidor' }),
      {
        status: 500,
      }
    );
  }
};
