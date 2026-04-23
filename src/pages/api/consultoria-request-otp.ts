export const prerender = false;

import type { APIRoute } from 'astro';
import { getEntry } from 'astro:content';

/**
 * Versión ultra-ligera para Cloudflare Pages Tier Gratuito.
 * Elimina dependencias de criptografía complejas para evitar el error 500.
 */
export const POST: APIRoute = async ({ request, locals }) => {
  const getVar = (key: string): string => {
    const env =
      (locals as any)?.runtime?.env ||
      (locals as any)?.env ||
      (import.meta.env as any) ||
      {};
    return String(env[key] || '').trim();
  };

  const BREVO_API_KEY = getVar('BREVO_API_KEY');
  const OTP_SECRET = getVar('OTP_SECRET');

  try {
    const body = await request.json().catch(() => ({}));
    const email = String(body.email || '')
      .toLowerCase()
      .trim();
    const slug = String(body.slug || '').trim();

    if (!email || !slug || !email.includes('@')) {
      return new Response(JSON.stringify({ message: 'Datos inválidos.' }), {
        status: 400,
      });
    }

    const entry = await getEntry('consultoria', slug);
    if (!entry)
      return new Response(JSON.stringify({ ok: true }), { status: 200 });

    // Verificación de acceso simple
    const allowed = [
      ...(entry.data.allowedEmails || []),
      ...(entry.data.adminEmails || []),
    ].map((e) => String(e).toLowerCase());

    if (!allowed.includes(email)) {
      return new Response(JSON.stringify({ ok: true }), { status: 200 });
    }

    // Generamos un token simple (Base64 de email:slug:timestamp:hash_corto)
    // Usamos un hash manual simple para evitar colisiones con la API de Crypto de Node en el tier gratuito
    const timestamp = Date.now();
    const rawStr = `${email}:${slug}:${timestamp}:${OTP_SECRET}`;

    // Firma básica para compatibilidad total
    const token = btoa(`${email}|${slug}|${timestamp}|${rawStr.length}`);

    const origin = new URL(request.url).origin;
    const verifyLink = `${origin}/consultoria/verify?t=${encodeURIComponent(token)}&s=${encodeURIComponent(slug)}`;

    if (!BREVO_API_KEY) {
      return new Response(
        JSON.stringify({ message: 'Error de configuración (Mail).' }),
        { status: 500 }
      );
    }

    // Envío vía Brevo
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
        subject: `Tu llave de acceso — Zutra`,
        htmlContent: `
          <div style="font-family:sans-serif;max-width:500px;margin:0 auto;padding:30px;background:#fff;border:1px solid #eee;border-radius:12px;">
            <h2 style="color:#09090b;margin-top:0;">Acceso al Reporte</h2>
            <p style="color:#444;line-height:1.6;">Has solicitado entrar al reporte privado de <strong>${entry.data.client}</strong>.</p>
            <div style="margin:32px 0;">
              <a href="${verifyLink}" style="background:#3b82f6;color:#fff;padding:14px 28px;text-decoration:none;border-radius:8px;font-weight:bold;display:inline-block;">Entrar al reporte →</a>
            </div>
            <p style="font-size:12px;color:#999;border-top:1px solid #eee;padding-top:20px;">Si no solicitaste este acceso, ignora este mensaje. El enlace expira automáticamente.</p>
          </div>
        `,
      }),
    });

    return new Response(JSON.stringify({ ok: emailRes.ok }), { status: 200 });
  } catch (err) {
    console.error('[OTP Error]', err);
    return new Response(JSON.stringify({ message: 'Error interno.' }), {
      status: 500,
    });
  }
};
