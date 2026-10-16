import type { APIRoute } from 'astro';

export const prerender = false;

import { sanitizeInput } from '@/lib/utils/sanitize';
import { checkRateLimit } from '@/lib/rate-limit';
import { getRuntimeEnv, getEnvVar } from '@/lib/runtime-env';
import { sendEmail } from '@/lib/email';
import { saveLead } from '@/lib/leads';
import { adminLeadEmail } from '@/lib/lead-emails';

export const POST: APIRoute = async ({ request }) => {
  // Rate limiting: 10 requests per 15 minutes per IP
  const clientIP = request.headers.get('cf-connecting-ip') ?? 'unknown';
  const kv = (await getRuntimeEnv()).ZUTRA_KV;
  const rateLimit = await checkRateLimit(
    `lead:${clientIP}`,
    10,
    15 * 60 * 1000,
    kv
  );

  if (!rateLimit.allowed) {
    return new Response(
      JSON.stringify({ error: 'Too many requests. Try again later.' }),
      { status: 429 }
    );
  }
  if (request.headers.get('Content-Type') !== 'application/json') {
    return new Response(JSON.stringify({ error: 'Invalid Content-Type' }), {
      status: 400,
    });
  }

  try {
    const data = (await request.json()) as {
      name: string;
      email: string;
      service: string;
      urgency: string;
    };
    const { name, email, service, urgency } = data;

    // Sanitizar inputs
    const sanitizedName = sanitizeInput(name);
    const sanitizedEmail = sanitizeInput(email);
    const sanitizedService = sanitizeInput(service);
    const sanitizedUrgency = sanitizeInput(urgency);

    if (
      !sanitizedName ||
      !sanitizedEmail ||
      !sanitizedService ||
      !sanitizedUrgency
    ) {
      return new Response(
        JSON.stringify({ error: 'Todos los campos son obligatorios' }),
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(sanitizedEmail)) {
      return new Response(JSON.stringify({ error: 'Email inválido' }), {
        status: 400,
      });
    }

    // --- GUARDAR EL LEAD (Sanity) Y AVISAR POR CORREO (Resend) ---
    const ADMIN_EMAIL = (await getEnvVar('ADMIN_EMAIL')) || 'hola@zutra.cl';
    const lead = {
      name: sanitizedName,
      email: sanitizedEmail,
      service: sanitizedService,
      timeline: sanitizedUrgency,
      source: 'bot' as const,
    };
    const adminMail = adminLeadEmail(lead);

    const [saved, mailed] = await Promise.all([
      saveLead(lead),
      sendEmail({
        to: ADMIN_EMAIL,
        subject: adminMail.subject,
        html: adminMail.html,
        replyTo: sanitizedEmail,
      }),
    ]);

    if (!saved.ok) console.error('Error guardando lead del bot:', saved.error);
    if (!mailed.ok)
      console.error('Error aviso del bot (Resend):', mailed.error);

    // Aunque falle el guardado, el usuario ya siguió por WhatsApp: no se le muestra error.
    return new Response(JSON.stringify({ success: saved.ok || mailed.ok }), {
      status: saved.ok || mailed.ok ? 200 : 502,
    });
  } catch (error) {
    console.error('Unhandled Error in API Route:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
    });
  }
};
