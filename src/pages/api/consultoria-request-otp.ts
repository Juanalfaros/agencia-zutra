export const prerender = false;

import type { APIRoute } from 'astro';
import { getEntry } from 'astro:content';
import { checkRateLimit } from '@/lib/rate-limit';
import { signToken } from '@/lib/report-auth';

export const POST: APIRoute = async ({ request, locals }) => {
  // 1. Obtener variables de entorno de forma ultra-segura
  const getVar = (key: string): string => {
    try {
      const rEnv = (locals as any)?.runtime?.env;
      const lEnv = (locals as any)?.env;
      const val =
        rEnv?.[key] ||
        lEnv?.[key] ||
        (globalThis as any)[key] ||
        (import.meta.env as any)[key];
      return String(val || '').trim();
    } catch {
      return '';
    }
  };

  const BREVO_API_KEY = getVar('BREVO_API_KEY');
  const OTP_SECRET = getVar('OTP_SECRET');

  // Si faltan llaves, devolvemos diagnóstico para el desarrollador
  if (!BREVO_API_KEY || !OTP_SECRET) {
    const runtimeEnv = (locals as any)?.runtime?.env || {};
    return new Response(
      JSON.stringify({
        error: 'Incomplete Configuration',
        message: 'No se encontraron las credenciales necesarias.',
        diagnostic: {
          has_brevo: !!BREVO_API_KEY,
          has_otp_secret: !!OTP_SECRET,
          detected_keys: Object.keys(runtimeEnv),
        },
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    const clientIP = request.headers.get('cf-connecting-ip') || '127.0.0.1';

    // 2. Rate Limit
    const rateLimit = checkRateLimit(`otp-req:${clientIP}`, 5, 15 * 60 * 1000);
    if (!rateLimit.allowed) {
      return new Response(
        JSON.stringify({ message: 'Demasiados intentos. Espera 15 minutos.' }),
        { status: 429 }
      );
    }

    // 3. Validar Body
    const body = await request.json().catch(() => ({}));
    const email = String(body.email || '')
      .toLowerCase()
      .trim();
    const slug = String(body.slug || '').trim();

    if (!email || !slug || !email.includes('@')) {
      return new Response(JSON.stringify({ message: 'Datos incompletos.' }), {
        status: 400,
      });
    }

    // 4. Verificar Reporte
    const entry = await getEntry('consultoria', slug);
    if (!entry) {
      return new Response(JSON.stringify({ ok: true }), { status: 200 });
    }

    // Si no es protegido, no enviamos email (ya tiene acceso directo)
    if (!entry.data.protected) {
      return new Response(JSON.stringify({ ok: true }), { status: 200 });
    }

    // Verificar si el email está en la lista
    const allowed = [
      ...(entry.data.allowedEmails || []),
      ...(entry.data.adminEmails || []),
    ].map((e) => String(e).toLowerCase());

    if (!allowed.includes(email)) {
      // Retornamos OK para no dar pistas de qué emails existen
      return new Response(JSON.stringify({ ok: true }), { status: 200 });
    }

    // 5. Generar Token de Acceso Temporal (10 min)
    const otpToken = await signToken(
      { email, slug, exp: Date.now() + 10 * 60 * 1000 },
      OTP_SECRET
    );

    const origin = new URL(request.url).origin;
    const verifyLink = `${origin}/consultoria/verify?t=${encodeURIComponent(otpToken)}&s=${encodeURIComponent(slug)}`;

    // 6. Enviar Email
    const emailRes = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': BREVO_API_KEY,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        sender: { name: 'Agencia Zutra', email: 'hola@zutra.agency' },
        to: [{ email }],
        subject: `Llave de acceso: ${entry.data.client}`,
        htmlContent: `
          <div style="font-family:sans-serif;max-width:500px;margin:0 auto;padding:20px;border:1px solid #eee;border-radius:12px;">
            <h2 style="margin-top:0;">Tu acceso al reporte</h2>
            <p>Hola, has solicitado entrar al reporte <strong>${entry.data.title}</strong>.</p>
            <p>Este enlace es válido por 10 minutos:</p>
            <a href="${verifyLink}" style="display:inline-block;padding:12px 24px;background:#3b82f6;color:#fff;text-decoration:none;border-radius:6px;font-weight:bold;">Entrar al reporte →</a>
            <p style="font-size:12px;color:#999;margin-top:20px;">Si no fuiste tú, ignora este mensaje.</p>
          </div>
        `,
      }),
    });

    if (!emailRes.ok) {
      const err = await emailRes.json().catch(() => ({}));
      console.error('[Brevo Error]', err);
      return new Response(
        JSON.stringify({ message: 'Error en el proveedor de email.' }),
        { status: 500 }
      );
    }

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (err: any) {
    console.error('[Critical Error]', err);
    return new Response(
      JSON.stringify({
        message: 'Error interno inesperado.',
        error: err.message,
      }),
      { status: 500 }
    );
  }
};
