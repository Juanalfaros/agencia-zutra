export const prerender = false;

export const POST = async ({ request, locals }: any) => {
  try {
    const env =
      locals?.runtime?.env || locals?.env || (globalThis as any) || {};
    const BREVO_API_KEY = (env.BREVO_API_KEY || '').trim();

    const body = await request.json().catch(() => ({}));
    const { email, slug } = body;

    if (!email || !slug) return new Response('Incomplete', { status: 400 });

    const timestamp = Date.now();
    const token = btoa(`${email}|${slug}|${timestamp}|secure`);
    const origin = new URL(request.url).origin;
    const verifyLink = `${origin}/consultoria/verify?t=${encodeURIComponent(token)}&s=${encodeURIComponent(slug)}`;

    if (!BREVO_API_KEY) {
      return new Response(
        JSON.stringify({ ok: false, msg: 'Missing API Key' }),
        { status: 200 }
      );
    }

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
        subject: `Acceso al reporte solicitado`,
        htmlContent: `
          <div style="font-family:sans-serif;padding:20px;border:1px solid #eee;border-radius:12px;">
            <h2>Acceso al Reporte</h2>
            <p>Haz clic para entrar:</p>
            <a href="${verifyLink}" style="padding:10px 20px;background:#3b82f6;color:#fff;text-decoration:none;border-radius:6px;">Entrar al reporte →</a>
          </div>
        `,
      }),
    });

    return new Response(JSON.stringify({ ok: emailRes.ok }), { status: 200 });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
};
