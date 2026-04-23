export const prerender = false;

import type { APIRoute } from 'astro';
import { getEntry } from 'astro:content';
import { checkRateLimit } from '@/lib/rate-limit';
import { signToken } from '@/lib/report-auth';

export const POST: APIRoute = async (context) => {
  const { request, locals } = context;

  try {
    const clientIP =
      request.headers.get('cf-connecting-ip') ||
      request.headers.get('x-forwarded-for') ||
      'unknown';

    // 1. Rate Limit
    const rateLimit = checkRateLimit(`otp-req:${clientIP}`, 3, 15 * 60 * 1000);
    if (!rateLimit.allowed) {
      return new Response(
        JSON.stringify({
          message: 'Demasiados intentos. Espera unos minutos.',
        }),
        { status: 429 }
      );
    }

    // 2. Env Variables - Compatibilidad extendida para Cloudflare Workers/Pages
    const env =
      (locals as any)?.runtime?.env ||
      (locals as any)?.env ||
      (globalThis as any) ||
      import.meta.env ||
      {};
    const BREVO_API_KEY = (env.BREVO_API_KEY || '').trim();
    const OTP_SECRET = (env.OTP_SECRET || '').trim();

    if (!OTP_SECRET || !BREVO_API_KEY) {
      console.error('[OTP Error] Configuración incompleta:', {
        secret: !!OTP_SECRET,
        brevo: !!BREVO_API_KEY,
      });
      return new Response(
        JSON.stringify({
          message: 'Error de configuración del servidor.',
          debug: { s: !!OTP_SECRET, b: !!BREVO_API_KEY },
        }),
        { status: 500 }
      );
    }

    // 3. Payload Validation
    let email: string, slug: string;
    try {
      const data = await request.json();
      email = String(data.email || '')
        .toLowerCase()
        .trim();
      slug = String(data.slug || '').trim();
    } catch {
      return new Response(JSON.stringify({ message: 'Solicitud inválida.' }), {
        status: 400,
      });
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(JSON.stringify({ message: 'Email inválido.' }), {
        status: 400,
      });
    }
    if (!slug) {
      return new Response(JSON.stringify({ message: 'Slug requerido.' }), {
        status: 400,
      });
    }

    // 4. Content Check
    const entry = await getEntry('consultoria', slug);
    if (!entry || !entry.data.protected) {
      return new Response(JSON.stringify({ ok: true }), { status: 200 });
    }

    const allowedEmails = (entry.data.allowedEmails ?? []).map((e: string) =>
      e.toLowerCase()
    );
    const adminEmails = (entry.data.adminEmails ?? []).map((e: string) =>
      e.toLowerCase()
    );
    const isAllowed =
      allowedEmails.includes(email) || adminEmails.includes(email);

    if (!isAllowed) {
      return new Response(JSON.stringify({ ok: true }), { status: 200 });
    }

    // 5. Generate Token
    const otpToken = await signToken(
      { email, slug, exp: Date.now() + 10 * 60 * 1000 },
      OTP_SECRET
    );

    const origin = new URL(request.url).origin;
    const verifyLink = `${origin}/consultoria/verify?t=${encodeURIComponent(otpToken)}&s=${encodeURIComponent(slug)}`;

    // 6. Send Email via Brevo
    const emailRes = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'api-key': BREVO_API_KEY,
      },
      body: JSON.stringify({
        sender: { name: 'Agencia Zutra', email: 'hola@zutra.agency' },
        to: [{ email }],
        subject: `Acceso al reporte de ${entry.data.client} — Zutra`,
        htmlContent: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; border: 1px solid #e4e4e7; border-radius: 12px; background: #fff;">
            <h1 style="color: #09090b; font-size: 24px; font-weight: 800; margin-bottom: 16px;">Verifica tu acceso</h1>
            <p style="color: #52525b; font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
              Has solicitado acceso al reporte de <strong>${entry.data.client}</strong>. Haz clic en el botón de abajo para entrar. El enlace es válido por 10 minutos.
            </p>
            <a href="${verifyLink}" style="display: inline-block; background: #3b82f6; color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 700; font-size: 16px;">
              Acceder al reporte ahora →
            </a>
            <p style="color: #a1a1aa; font-size: 13px; margin-top: 32px; border-top: 1px solid #f4f4f5; padding-top: 24px;">
              Si no solicitaste este acceso, puedes ignorar este correo.
            </p>
          </div>
        `,
      }),
    });

    if (!emailRes.ok) {
      const errBody = await emailRes.json().catch(() => ({}));
      console.error('[OTP] Brevo API Error:', errBody);
      return new Response(
        JSON.stringify({ message: 'Error en el servicio de correo.' }),
        { status: 500 }
      );
    }

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (error) {
    console.error('[OTP Critical Error]:', error);
    return new Response(
      JSON.stringify({ message: 'Error interno del servidor.' }),
      { status: 500 }
    );
  }
};
