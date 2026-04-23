export const prerender = false;

// cloudflare:workers is the only reliable way to access runtime env vars
// in Cloudflare Pages SSR (import.meta.env is build-time only for non-PUBLIC vars).
// .dev.vars provides these values locally; CF Pages dashboard provides them in production.
import { env as cfEnv } from 'cloudflare:workers';

export const POST = async ({ request }: any) => {
  try {
    const BREVO_API_KEY = (
      String((cfEnv as any).BREVO_API_KEY || '') ||
      String((import.meta.env as any).BREVO_API_KEY || '')
    ).trim();

    const body = await request.json().catch(() => ({}));
    const { email, slug } = body;

    if (!email || !slug) {
      return new Response(JSON.stringify({ error: 'Incomplete' }), {
        status: 400,
      });
    }

    console.log('[OTP] Key debug:', {
      length: BREVO_API_KEY.length,
      prefix: BREVO_API_KEY.substring(0, 15),
      suffix: BREVO_API_KEY.slice(-4),
      startsCorrectly: BREVO_API_KEY.startsWith('xkeysib-'),
    });

    if (!BREVO_API_KEY) {
      console.error(
        '[OTP] BREVO_API_KEY no definida — configura .dev.vars (local) o CF Pages dashboard (producción)'
      );
      return new Response(
        JSON.stringify({ error: 'Server misconfiguration' }),
        { status: 500 }
      );
    }

    const timestamp = Date.now();
    const token = btoa(`${email}|${slug}|${timestamp}|secure`);
    const origin = new URL(request.url).origin;
    const verifyLink = `${origin}/consultoria/verify?t=${encodeURIComponent(token)}&s=${encodeURIComponent(slug)}`;

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
        subject: 'Tu enlace de acceso — Zutra',
        htmlContent: `
          <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:32px;background:#09090b;border-radius:12px;color:#fff;">
            <p style="font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#3b82f6;margin:0 0 8px;">Agencia Zutra</p>
            <h1 style="font-size:22px;font-weight:900;margin:0 0 16px;color:#fff;">Acceso al reporte</h1>
            <p style="color:#a1a1aa;margin:0 0 28px;line-height:1.6;">
              Haz clic en el botón de abajo para acceder. El enlace expira en <strong style="color:#fff;">15 minutos</strong>.
            </p>
            <a href="${verifyLink}" style="display:inline-block;background:#3b82f6;color:#fff;text-decoration:none;padding:14px 28px;border-radius:8px;font-weight:700;font-size:15px;">
              Entrar al reporte →
            </a>
            <p style="color:#52525b;font-size:12px;margin:24px 0 0;">
              Si no solicitaste este acceso, ignora este correo.
            </p>
          </div>
        `,
      }),
    });

    if (!emailRes.ok) {
      const errBody = await emailRes.text().catch(() => '');
      console.error('[OTP] Brevo error:', emailRes.status, errBody);
      return new Response(JSON.stringify({ error: 'Email delivery failed' }), {
        status: 502,
      });
    }

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (err: any) {
    console.error('[OTP] Unexpected error:', err?.message);
    return new Response(JSON.stringify({ error: err?.message }), {
      status: 500,
    });
  }
};
