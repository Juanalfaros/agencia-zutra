export const prerender = false;

import { sanitizeInput } from '@/lib/utils/sanitize';
import { checkRateLimit } from '@/lib/rate-limit';
import { getRuntimeEnv } from '@/lib/runtime-env';
import { sendEmail } from '@/lib/email';
import { saveLead } from '@/lib/leads';
import { adminLeadEmail, confirmationEmail } from '@/lib/lead-emails';
import { resolveAccent } from '@/lib/brand';

export const POST = async ({ request }: { request: Request }) => {
  // Rate limiting: 5 requests per 15 minutes per IP
  const clientIP = request.headers.get('cf-connecting-ip') ?? 'unknown';
  const runtimeEnv = await getRuntimeEnv();
  const kv = runtimeEnv.ZUTRA_KV;
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
    let name,
      email,
      message,
      phone,
      service,
      timeline,
      budget,
      accentRaw,
      turnstileToken;

    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      name = formData.get('name')?.toString();
      email = formData.get('email')?.toString();
      message = formData.get('message')?.toString();
      phone = formData.get('phone')?.toString();
      service = formData.get('service')?.toString();
      timeline = formData.get('timeline')?.toString();
      accentRaw = formData.get('accent')?.toString();
      budget = formData.get('budget')?.toString();
      turnstileToken = formData.get('cf-turnstile-response')?.toString();
    } else {
      const data = await request.json();
      name = data.name;
      email = data.email;
      message = data.message;
      phone = data.phone;
      service = data.service;
      timeline = data.timeline;
      accentRaw = data.accent;
      budget = data.budget;
      turnstileToken = data.turnstileToken;
    }

    // Sanitizar inputs
    name = sanitizeInput(name);
    email = sanitizeInput(email);
    message = sanitizeInput(message);
    phone = sanitizeInput(phone);
    service = sanitizeInput(service);
    timeline = sanitizeInput(timeline);
    budget = sanitizeInput(budget);

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ message: 'Faltan campos requeridos' }),
        {
          status: 400,
        }
      );
    }

    // --- GESTIÓN DE VARIABLES DE ENTORNO (Astro 6 / Cloudflare v13) ---
    const getEnv = (key: string) =>
      runtimeEnv[key] ||
      (import.meta.env as any)[key] ||
      (process.env as any)[key] ||
      '';

    const TURNSTILE_SECRET_KEY = getEnv('TURNSTILE_SECRET_KEY');
    const ADMIN_EMAIL = getEnv('ADMIN_EMAIL') || 'hola@zutra.cl';

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

    // --- GUARDAR EL LEAD (Sanity) Y ENVIAR CORREOS (Resend) ---
    const lead = {
      name,
      email,
      phone: phone || undefined,
      service: service || undefined,
      timeline: timeline || undefined,
      budget: budget || undefined,
      message,
      source: 'formulario' as const,
    };
    // El color de acento que vio el visitante personaliza ambos correos.
    const accent = resolveAccent(accentRaw);

    // Primero se guarda, para que el aviso al admin pueda enlazar al lead en el Studio.
    const saved = await saveLead(lead);
    const adminMail = adminLeadEmail(lead, { accent, leadId: saved.id });
    const userMail = confirmationEmail(lead, { accent });

    const [adminRes, userRes] = await Promise.all([
      sendEmail({
        to: ADMIN_EMAIL,
        subject: adminMail.subject,
        html: adminMail.html,
        text: adminMail.text,
        replyTo: email,
      }),
      sendEmail({
        to: email,
        subject: userMail.subject,
        html: userMail.html,
        text: userMail.text,
        replyTo: ADMIN_EMAIL,
      }),
    ]);

    if (!saved.ok)
      console.error('Error guardando lead en Sanity:', saved.error);
    if (!adminRes.ok)
      console.error('Error correo al admin (Resend):', adminRes.error);
    if (!userRes.ok)
      console.error('Error correo de confirmación (Resend):', userRes.error);

    // El lead se considera recibido si quedó guardado o si el aviso llegó al admin.
    if (!saved.ok && !adminRes.ok) {
      return new Response(
        JSON.stringify({
          message: 'No pudimos enviar tu mensaje. Inténtalo más tarde.',
        }),
        { status: 500 }
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
