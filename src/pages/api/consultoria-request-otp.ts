export const prerender = false;

import { getEntry } from 'astro:content';
import { checkRateLimit } from '@/lib/rate-limit';
import { signToken } from '@/lib/report-auth';

export const POST = async ({ request }: { request: Request }) => {
  const clientIP =
    request.headers.get('cf-connecting-ip') ||
    request.headers.get('x-forwarded-for') ||
    'unknown';

  const rateLimit = checkRateLimit(`otp-req:${clientIP}`, 3, 15 * 60 * 1000);
  if (!rateLimit.allowed) {
    return new Response(
      JSON.stringify({ message: 'Demasiados intentos. Espera unos minutos.' }),
      { status: 429 }
    );
  }

  const BREVO_API_KEY = ((import.meta.env as any).BREVO_API_KEY || '').trim();
  const OTP_SECRET = ((import.meta.env as any).OTP_SECRET || '').trim();

  if (!OTP_SECRET) {
    console.error('OTP_SECRET no definida.');
    return new Response(
      JSON.stringify({ message: 'Error de configuración del servidor.' }),
      { status: 500 }
    );
  }

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

  // Always return ok if report not found or not protected — avoid info leak
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

  // Always return ok — don't reveal whether email exists in the list
  if (!isAllowed) {
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  }

  // Sign OTP token (10 min expiry)
  const otpToken = await signToken(
    { email, slug, exp: Date.now() + 10 * 60 * 1000 },
    OTP_SECRET
  );

  const origin = new URL(request.url).origin;
  const verifyLink = `${origin}/consultoria/verify?t=${encodeURIComponent(otpToken)}&s=${encodeURIComponent(slug)}`;

  if (!BREVO_API_KEY || BREVO_API_KEY === 'undefined') {
    console.error('BREVO_API_KEY no definida o inválida.');
    return new Response(
      JSON.stringify({ message: 'Error de configuración de mensajería.' }),
      { status: 500 }
    );
  }

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
      htmlContent: `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Acceso al reporte — Zutra</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);max-width:600px;width:100%;">
          <!-- Header -->
          <tr>
            <td style="background:#09090b;padding:32px 40px;text-align:center;">
              <span style="font-size:22px;font-weight:900;letter-spacing:-0.03em;color:#ffffff;">ZUTRA</span>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:40px;">
              <p style="margin:0 0 8px;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#3b82f6;">Acceso solicitado</p>
              <h1 style="margin:0 0 16px;font-size:26px;font-weight:900;color:#09090b;line-height:1.2;">${entry.data.title}</h1>
              <p style="margin:0 0 32px;font-size:16px;color:#52525b;line-height:1.6;">
                Haz clic en el botón de abajo para acceder al reporte de <strong>${entry.data.client}</strong>. Este enlace es personal y expira en <strong>10 minutos</strong>.
              </p>
              <table cellpadding="0" cellspacing="0" style="margin:0 0 32px;">
                <tr>
                  <td style="background:#3b82f6;border-radius:8px;">
                    <a href="${verifyLink}" style="display:inline-block;padding:14px 32px;font-size:16px;font-weight:700;color:#ffffff;text-decoration:none;border-radius:8px;">
                      Acceder al reporte →
                    </a>
                  </td>
                </tr>
              </table>
              <p style="margin:0;font-size:13px;color:#a1a1aa;">
                Si no solicitaste este acceso, puedes ignorar este email con seguridad. El enlace expirará automáticamente.
              </p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding:24px 40px;border-top:1px solid #e4e4e7;text-align:center;">
              <p style="margin:0;font-size:12px;color:#a1a1aa;">
                Agencia Zutra · Estrategia y tecnología digital
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`,
    }),
  });

  if (!emailRes.ok) {
    const errBody = await emailRes.json().catch(() => ({}));
    console.error('Error Brevo OTP:', errBody);
    return new Response(
      JSON.stringify({
        message: 'Error al enviar el email. Inténtalo más tarde.',
      }),
      { status: 500 }
    );
  }

  return new Response(JSON.stringify({ ok: true }), { status: 200 });
};
