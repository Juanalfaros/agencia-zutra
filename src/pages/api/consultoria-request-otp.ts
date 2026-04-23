export const prerender = false;

// cloudflare:workers is the only reliable way to access runtime env vars
// in Cloudflare Pages SSR (import.meta.env is build-time only for non-PUBLIC vars).
// .dev.vars provides these values locally; CF Pages dashboard provides them in production.
import { env as cfEnv } from 'cloudflare:workers';

// Maps each accent palette to its logo filename and button text color.
// Must stay in sync with the palettes array in Layout.astro.
const ACCENT_MAP: Record<string, { logo: string; textColor: string }> = {
  '#EFD319': { logo: 'logo-zutra_amarillo.png', textColor: '#080501' },
  '#19EFB5': { logo: 'logo-zutra_verde-menta.png', textColor: '#080501' },
  '#FF0055': { logo: 'logo-zutra_magenta.png', textColor: '#ffffff' },
  '#811DBC': { logo: 'logo-zutra_purpura.png', textColor: '#ffffff' },
};

const DEFAULT_ACCENT = {
  color: '#EFD319',
  logo: 'logo-zutra_amarillo.png',
  textColor: '#080501',
};

export const POST = async ({ request }: any) => {
  try {
    const BREVO_API_KEY = (
      String((cfEnv as any).BREVO_API_KEY || '') ||
      String((import.meta.env as any).BREVO_API_KEY || '')
    ).trim();

    const body = await request.json().catch(() => ({}));
    const { email, slug, accentColor } = body;

    if (!email || !slug) {
      return new Response(JSON.stringify({ error: 'Incomplete' }), {
        status: 400,
      });
    }

    if (!BREVO_API_KEY) {
      console.error(
        '[OTP] BREVO_API_KEY no definida — configura .dev.vars (local) o CF Pages dashboard (producción)'
      );
      return new Response(
        JSON.stringify({ error: 'Server misconfiguration' }),
        { status: 500 }
      );
    }

    // Resolve accent → logo + button text color
    const normalizedColor = (accentColor ?? '').trim().toUpperCase();
    const accentEntry = Object.entries(ACCENT_MAP).find(
      ([key]) => key.toUpperCase() === normalizedColor
    );
    const accent = accentEntry
      ? { color: accentEntry[0], ...accentEntry[1] }
      : DEFAULT_ACCENT;

    const timestamp = Date.now();
    const token = btoa(`${email}|${slug}|${timestamp}|secure`);
    const origin = new URL(request.url).origin;
    const verifyLink = `${origin}/consultoria/verify?t=${encodeURIComponent(token)}&s=${encodeURIComponent(slug)}`;
    const logoUrl = `${origin}/logos-png/${accent.logo}`;

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
        subject: 'Tu acceso al reporte — Zutra',
        htmlContent: `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background-color:#09090b;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#09090b;padding:40px 16px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">

        <!-- Logo -->
        <tr><td align="center" style="padding-bottom:32px;">
          <img src="${logoUrl}" alt="Zutra" width="120" height="auto"
               style="display:block;border:0;max-width:120px;" />
        </td></tr>

        <!-- Card -->
        <tr><td style="background:#111113;border:1px solid #27272a;border-radius:16px;padding:40px 36px;">

          <!-- Badge -->
          <p style="margin:0 0 20px;text-align:center;">
            <span style="display:inline-block;background:${accent.color}1a;color:${accent.color};font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:0.12em;padding:5px 14px;border-radius:999px;border:1px solid ${accent.color}40;">
              Acceso al Reporte
            </span>
          </p>

          <!-- Headline -->
          <h1 style="margin:0 0 12px;font-size:26px;font-weight:900;color:#fafafa;text-align:center;letter-spacing:-0.02em;line-height:1.2;">
            Tu enlace mágico<br>está listo
          </h1>

          <!-- Body -->
          <p style="margin:0 0 32px;font-size:15px;line-height:1.7;color:#a1a1aa;text-align:center;">
            Haz clic en el botón para acceder a tu reporte de consultoría.<br>
            El enlace <strong style="color:#e4e4e7;">expira en 15 minutos</strong>.
          </p>

          <!-- CTA Button -->
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr><td align="center" style="padding-bottom:32px;">
              <a href="${verifyLink}"
                 style="display:inline-block;background:${accent.color};color:${accent.textColor};text-decoration:none;padding:15px 36px;border-radius:999px;font-weight:800;font-size:15px;letter-spacing:0.01em;">
                Entrar al reporte &rarr;
              </a>
            </td></tr>
          </table>

          <!-- Divider -->
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr><td style="border-top:1px solid #27272a;padding-top:24px;">
              <p style="margin:0;font-size:12px;color:#52525b;text-align:center;line-height:1.6;">
                Si no solicitaste este acceso, puedes ignorar este correo con seguridad.<br>
                Este enlace solo funciona una vez y desde el mismo dispositivo.
              </p>
            </td></tr>
          </table>

        </td></tr>

        <!-- Footer -->
        <tr><td align="center" style="padding-top:24px;">
          <p style="margin:0;font-size:12px;color:#3f3f46;">
            © ${new Date().getFullYear()} Agencia Zutra — zutra.agency
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`,
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
