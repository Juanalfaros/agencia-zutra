import { escapeHtml } from '@/lib/email';
import type { Lead } from '@/lib/leads';

const WRAP = (inner: string) => `<!DOCTYPE html>
<html lang="es"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:32px 16px;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#18181b;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #e4e4e7;border-radius:14px;">
    <tr><td style="padding:32px 32px 28px;">${inner}</td></tr>
  </table>
  <p style="max-width:560px;margin:16px auto 0;text-align:center;font-size:12px;color:#71717a;">Zutra · Estudio de marca y web · Puente Alto, Chile · zutra.cl</p>
</body></html>`;

const ROW = (label: string, value?: string) =>
  value
    ? `<tr><td style="padding:9px 0;border-bottom:1px solid #f0f0f2;font-size:13px;color:#71717a;width:34%;vertical-align:top;">${label}</td><td style="padding:9px 0;border-bottom:1px solid #f0f0f2;font-size:14px;color:#18181b;">${escapeHtml(value).replace(/\n/g, '<br>')}</td></tr>`
    : '';

const WHATSAPP_URL =
  'https://wa.me/56942009050?text=' +
  encodeURIComponent(
    'Hola, escribí desde zutra.cl y quiero mi diagnóstico gratuito'
  );

export function adminLeadEmail(lead: Lead) {
  const via = lead.source === 'bot' ? 'bot de WhatsApp' : 'formulario';
  const phoneDigits = (lead.phone ?? '').replace(/[^0-9]/g, '');
  return {
    subject: `Nuevo lead (${via}): ${lead.name}`,
    html: WRAP(`
      <p style="margin:0 0 6px;font-size:11px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;color:#71717a;">Nuevo lead · ${via}</p>
      <h1 style="margin:0 0 20px;font-size:22px;line-height:1.25;">${escapeHtml(lead.name)}</h1>
      <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
        ${ROW('Correo', lead.email)}
        ${ROW('Teléfono', lead.phone)}
        ${ROW('Interés', lead.service)}
        ${ROW('Plazo', lead.timeline)}
        ${ROW('Presupuesto', lead.budget)}
        ${ROW('Mensaje', lead.message)}
      </table>
      <p style="margin:24px 0 0;">
        <a href="mailto:${escapeHtml(lead.email)}" style="display:inline-block;background:#18181b;color:#fff;text-decoration:none;padding:11px 22px;border-radius:999px;font-weight:700;font-size:14px;">Responder por correo</a>
        ${phoneDigits ? `<a href="https://wa.me/${phoneDigits}" style="display:inline-block;margin-left:8px;border:1px solid #d4d4d8;color:#18181b;text-decoration:none;padding:10px 20px;border-radius:999px;font-weight:700;font-size:14px;">WhatsApp</a>` : ''}
      </p>
      <p style="margin:18px 0 0;font-size:12px;color:#71717a;">El lead también quedó guardado en el Studio, en "Leads".</p>
    `),
  };
}

export function confirmationEmail(lead: Lead) {
  const first = lead.name.trim().split(/\s+/)[0] || 'hola';
  return {
    subject: `${first}, recibimos tu mensaje`,
    html: WRAP(`
      <h1 style="margin:0 0 14px;font-size:22px;line-height:1.25;">Hola, ${escapeHtml(first)}. Recibimos tu mensaje.</h1>
      <p style="margin:0 0 14px;font-size:15px;line-height:1.65;color:#3f3f46;">
        Te respondemos en <strong>menos de 24 horas hábiles</strong>, directo con quienes van a hacer el trabajo, para coordinar tu diagnóstico gratuito de 30 minutos.
      </p>
      <p style="margin:0 0 20px;font-size:15px;line-height:1.65;color:#3f3f46;">
        Si en esos 30 minutos no te llevas claridad y próximos pasos, no seguimos. Así de simple.
      </p>
      <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
        ${ROW('Interés', lead.service)}
        ${ROW('Plazo', lead.timeline)}
        ${ROW('Tu mensaje', lead.message)}
      </table>
      <p style="margin:24px 0 0;">
        <a href="${WHATSAPP_URL}" style="display:inline-block;background:#18181b;color:#fff;text-decoration:none;padding:11px 22px;border-radius:999px;font-weight:700;font-size:14px;">¿Prefieres WhatsApp? Escríbenos</a>
      </p>
      <p style="margin:18px 0 0;font-size:12px;color:#71717a;">Si no escribiste tú, puedes ignorar este correo.</p>
    `),
  };
}
