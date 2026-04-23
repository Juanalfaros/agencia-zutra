export const prerender = false;

import type { APIRoute } from 'astro';
import { getEntry } from 'astro:content';
import { checkRateLimit } from '@/lib/rate-limit';
import { signToken } from '@/lib/report-auth';

export const POST: APIRoute = async ({ request, locals }) => {
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

    // 2. Env Variables (Runtime vs Build time)
    const env = (locals as any)?.runtime?.env || import.meta.env || {};
    const BREVO_API_KEY = (env.BREVO_API_KEY || '').trim();
    const OTP_SECRET = (env.OTP_SECRET || '').trim();

    if (!OTP_SECRET) {
      console.error('[OTP] OTP_SECRET no definida.');
      return new Response(
        JSON.stringify({ message: 'Error de configuración (Secret).' }),
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
      // Return ok to avoid enumeration
      return new Response(JSON.stringify({ ok: true }), { status: 200 });
    }

    // 5. Generate Token
    const otpToken = await signToken(
      { email, slug, exp: Date.now() + 10 * 60 * 1000 },
      OTP_SECRET
    );

    const origin = new URL(request.url).origin;
    const verifyLink = `${origin}/consultoria/verify?t=${encodeURIComponent(otpToken)}&s=${encodeURIComponent(slug)}`;

    if (!BREVO_API_KEY || BREVO_API_KEY === 'undefined') {
      console.error('[OTP] BREVO_API_KEY no definida.');
      return new Response(
        JSON.stringify({ message: 'Error de configuración de correo.' }),
        { status: 500 }
      );
    }

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
        subject: `Tu acceso al reporte de ${entry.data.client} — Zutra`,
        htmlContent: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
            <h2 style="color: #09090b;">Acceso al Reporte</h2>
            <p>Has solicitado acceso al reporte: <strong>${entry.data.title}</strong>.</p>
            <p>Haz clic en el siguiente botón para entrar. Este enlace expira en 10 minutos:</p>
            <div style="margin: 30px 0;">
              <a href="${verifyLink}" style="background: #3b82f6; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">Acceder al reporte →</a>
            </div>
            <hr style="border: 0; border-top: 1px solid #eee;" />
            <p style="font-size: 12px; color: #666;">Si no solicitaste este acceso, puedes ignorar este mensaje.</p>
          </div>
        `,
      }),
    });

    if (!emailRes.ok) {
      const errBody = await emailRes.json().catch(() => ({}));
      console.error('[OTP] Brevo Error:', errBody);
      return new Response(
        JSON.stringify({ message: 'Error al enviar el email.' }),
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
