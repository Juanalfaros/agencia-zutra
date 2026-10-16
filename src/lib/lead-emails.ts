import { escapeHtml } from '@/lib/email';
import type { Lead } from '@/lib/leads';
import { DEFAULT_ACCENT, SITE_ORIGIN, type Accent } from '@/lib/brand';

const WHATSAPP_NUMBER = '56942009050';
const STUDIO_URL = 'https://zutra.sanity.studio';

interface Rendered {
  subject: string;
  html: string;
  text: string;
}

const nl2br = (s: string) => escapeHtml(s).replace(/\n/g, '<br>');
const firstName = (name: string) => name.trim().split(/\s+/)[0] || 'hola';

// Qué conviene tener a mano para el diagnóstico, según el servicio elegido
// (coincide con "Qué necesitamos de ti" de cada página de servicio).
function prepFor(service?: string): string[] {
  const marca = [
    'A quién le vendes y qué hace especial a tu negocio',
    'Referencias de marcas que te gusten (o que no quieras parecer)',
  ];
  const web = [
    'Tu sitio actual, si ya tienes uno',
    'Ejemplos de sitios que te gusten',
    'Textos y fotos que ya tengas, si los hay',
  ];
  switch (service) {
    case 'Marca':
      return marca;
    case 'Web':
      return web;
    case 'Marca + Web':
      return [...marca, 'Tu sitio actual, si ya tienes uno'];
    case 'Partner':
      return [
        'La dirección de tu sitio y, si la tienes, quién lo mantiene hoy',
        'Una lista de cambios o mejoras pendientes',
      ];
    case 'Complemento':
      return [
        'Qué pieza necesitas: kit para redes, presentación o correos en HTML',
        'Tu marca (logo, colores y tipografías), si ya la tienes',
      ];
    default:
      return [];
  }
}

function shell(
  accent: Accent,
  opts: { preheader: string; badge: string; body: string; footer: string }
) {
  const logo = `${SITE_ORIGIN}/logos-png/${accent.logo}`;
  return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background-color:#09090b;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">${escapeHtml(opts.preheader)}&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;</div>
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#09090b;padding:40px 16px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">
        <tr><td align="center" style="padding-bottom:28px;">
          <img src="${logo}" alt="Zutra" width="120" height="auto" style="display:block;border:0;max-width:120px;" />
        </td></tr>
        <tr><td style="background:#111113;border:1px solid #27272a;border-radius:16px;padding:36px 32px;">
          <p style="margin:0 0 20px;text-align:center;">
            <span style="display:inline-block;background:${accent.color}1a;color:${accent.color};font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:0.12em;padding:5px 14px;border-radius:999px;border:1px solid ${accent.color}40;">${escapeHtml(opts.badge)}</span>
          </p>
          ${opts.body}
        </td></tr>
        <tr><td align="center" style="padding-top:24px;">
          <p style="margin:0;font-size:12px;line-height:1.6;color:#52525b;">${opts.footer}</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

const button = (accent: Accent, href: string, label: string) =>
  `<a href="${href}" style="display:inline-block;background:${accent.color};color:${accent.textColor};text-decoration:none;padding:14px 30px;border-radius:999px;font-weight:800;font-size:15px;">${label}</a>`;

const ghostButton = (href: string, label: string) =>
  `<a href="${href}" style="display:inline-block;border:1px solid #3f3f46;color:#e4e4e7;text-decoration:none;padding:13px 26px;border-radius:999px;font-weight:700;font-size:14px;">${label}</a>`;

const row = (label: string, value?: string, last = false) =>
  value
    ? `<tr>
        <td style="padding:10px 0;${last ? '' : 'border-bottom:1px solid #27272a;'}font-size:13px;color:#71717a;width:34%;vertical-align:top;">${label}</td>
        <td style="padding:10px 0;${last ? '' : 'border-bottom:1px solid #27272a;'}font-size:14px;color:#e4e4e7;font-weight:600;">${nl2br(value)}</td>
      </tr>`
    : '';

/* ───────────────────────── Aviso al admin ───────────────────────── */

export function adminLeadEmail(
  lead: Lead,
  opts: { accent?: Accent; leadId?: string } = {}
): Rendered {
  const accent = opts.accent ?? DEFAULT_ACCENT;
  const via = lead.source === 'bot' ? 'bot de WhatsApp' : 'formulario';
  const urgent = lead.timeline === 'Lo antes posible';
  const phoneDigits = (lead.phone ?? '').replace(/[^0-9]/g, '');
  const first = firstName(lead.name);

  const replyBody = `Hola ${first}, gracias por escribirnos.\n\nSoy de Zutra. Te propongo agendar tu diagnóstico gratuito de 30 minutos. ¿Qué día y horario te acomoda esta semana?\n\nSaludos,`;
  const mailto = `mailto:${encodeURIComponent(lead.email)}?subject=${encodeURIComponent('Tu diagnóstico gratuito con Zutra')}&body=${encodeURIComponent(replyBody)}`;
  const wa = phoneDigits
    ? `https://wa.me/${phoneDigits}?text=${encodeURIComponent(`Hola ${first}, te escribo de Zutra por tu mensaje en zutra.cl.`)}`
    : '';
  const studio = opts.leadId
    ? `${STUDIO_URL}/intent/edit/id=${opts.leadId};type=lead`
    : '';

  const tagline = [lead.service, lead.timeline].filter(Boolean).join(' · ');
  const body = `
    <h1 style="margin:0 0 6px;font-size:24px;font-weight:900;color:#fafafa;text-align:center;letter-spacing:-0.02em;line-height:1.2;">${escapeHtml(lead.name)}</h1>
    <p style="margin:0 0 24px;font-size:14px;color:#a1a1aa;text-align:center;">${escapeHtml(tagline || 'Sin servicio indicado')}</p>
    ${urgent ? `<p style="margin:0 0 22px;text-align:center;"><span style="display:inline-block;background:#ef44441a;color:#f87171;font-size:12px;font-weight:800;padding:6px 14px;border-radius:999px;border:1px solid #ef444440;">Lo necesita lo antes posible</span></p>` : ''}
    <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin-bottom:26px;">
      ${row('Correo', lead.email)}
      ${row('Teléfono', lead.phone)}
      ${row('Interés', lead.service)}
      ${row('Plazo', lead.timeline)}
      ${row('Presupuesto', lead.budget)}
      ${row('Mensaje', lead.message, true)}
    </table>
    <table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding-bottom:12px;">
      ${button(accent, mailto, 'Responder por correo &rarr;')}
    </td></tr>
    <tr><td align="center">
      ${wa ? ghostButton(wa, 'WhatsApp') : ''}
      ${studio ? ` ${ghostButton(studio, 'Abrir en el Studio')}` : ''}
    </td></tr></table>
    <p style="margin:24px 0 0;padding-top:20px;border-top:1px solid #27272a;font-size:12px;color:#52525b;text-align:center;line-height:1.6;">
      Prometimos responder en menos de 24 horas hábiles.
    </p>`;

  const subjectTag = urgent ? 'URGENTE · ' : '';
  return {
    subject: `${subjectTag}Nuevo lead (${via}): ${lead.name}${lead.service ? ` · ${lead.service}` : ''}`,
    html: shell(accent, {
      preheader: `${lead.name} escribió desde el ${via}${lead.service ? ` por ${lead.service}` : ''}.`,
      badge: `Nuevo lead · ${via}`,
      body,
      footer:
        'Aviso interno de zutra.cl · responde a este correo para escribirle al cliente.',
    }),
    text: [
      `Nuevo lead (${via})`,
      `Nombre: ${lead.name}`,
      `Correo: ${lead.email}`,
      lead.phone && `Teléfono: ${lead.phone}`,
      lead.service && `Interés: ${lead.service}`,
      lead.timeline && `Plazo: ${lead.timeline}`,
      lead.budget && `Presupuesto: ${lead.budget}`,
      lead.message && `Mensaje: ${lead.message}`,
      studio && `Studio: ${studio}`,
    ]
      .filter(Boolean)
      .join('\n'),
  };
}

/* ─────────────────────── Confirmación al cliente ─────────────────────── */

export function confirmationEmail(
  lead: Lead,
  opts: { accent?: Accent } = {}
): Rendered {
  const accent = opts.accent ?? DEFAULT_ACCENT;
  const first = firstName(lead.name);
  const prep = prepFor(lead.service);
  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hola, escribí desde zutra.cl y quiero mi diagnóstico gratuito')}`;

  const prepBlock = prep.length
    ? `<p style="margin:0 0 10px;font-size:13px;font-weight:800;letter-spacing:.06em;text-transform:uppercase;color:${accent.color};">Para aprovechar la conversación</p>
       <ul style="margin:0 0 26px;padding-left:20px;font-size:14px;line-height:1.7;color:#d4d4d8;">
         ${prep.map((p) => `<li>${escapeHtml(p)}</li>`).join('')}
       </ul>`
    : `<p style="margin:0 0 26px;font-size:14px;line-height:1.7;color:#d4d4d8;">No necesitas preparar nada: en el diagnóstico te hacemos las preguntas.</p>`;

  const body = `
    <h1 style="margin:0 0 12px;font-size:26px;font-weight:900;color:#fafafa;text-align:center;letter-spacing:-0.02em;line-height:1.2;">
      Hola, ${escapeHtml(first)}.<br>Recibimos tu mensaje
    </h1>
    <p style="margin:0 0 26px;font-size:15px;line-height:1.7;color:#a1a1aa;text-align:center;">
      Te respondemos en <strong style="color:#e4e4e7;">menos de 24 horas hábiles</strong>, directo con quienes van a hacer el trabajo, para coordinar tu diagnóstico gratuito de 30 minutos.
    </p>
    <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin-bottom:26px;">
      ${row('Interés', lead.service)}
      ${row('Plazo', lead.timeline)}
      ${row('Tu mensaje', lead.message, true)}
    </table>
    ${prepBlock}
    <p style="margin:0 0 24px;padding:14px 16px;background:${accent.color}12;border:1px solid ${accent.color}33;border-radius:12px;font-size:14px;line-height:1.6;color:#e4e4e7;">
      Si en esos 30 minutos no te llevas claridad y próximos pasos, <strong>no seguimos</strong>. Así de simple.
    </p>
    <table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center">
      ${button(accent, waUrl, 'Escríbenos por WhatsApp &rarr;')}
    </td></tr></table>`;

  return {
    subject: `${first}, recibimos tu mensaje`,
    html: shell(accent, {
      preheader:
        'Te respondemos en menos de 24 horas hábiles para coordinar tu diagnóstico gratuito.',
      badge: 'Mensaje recibido',
      body,
      footer: `Si no escribiste tú, puedes ignorar este correo.<br>© ${new Date().getFullYear()} Zutra · Estudio de marca y web · Puente Alto, Chile — zutra.cl`,
    }),
    text: [
      `Hola, ${first}. Recibimos tu mensaje.`,
      '',
      'Te respondemos en menos de 24 horas hábiles para coordinar tu diagnóstico gratuito de 30 minutos.',
      prep.length
        ? `\nPara aprovechar la conversación:\n- ${prep.join('\n- ')}`
        : '',
      '',
      'Si en esos 30 minutos no te llevas claridad y próximos pasos, no seguimos.',
      `WhatsApp: ${waUrl}`,
    ].join('\n'),
  };
}
