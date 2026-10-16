import { getEnvVar } from '@/lib/runtime-env';

// Envío de correos transaccionales con Resend (https://resend.com).
// El dominio zutra.cl está verificado en Resend: se puede enviar desde hola@zutra.cl.
const RESEND_URL = 'https://api.resend.com/emails';
export const DEFAULT_FROM = 'Zutra <hola@zutra.cl>';

export interface SendEmailInput {
  to: string | string[];
  subject: string;
  html: string;
  from?: string;
  replyTo?: string;
}

export interface SendEmailResult {
  ok: boolean;
  status?: number;
  error?: string;
}

export async function sendEmail(
  input: SendEmailInput
): Promise<SendEmailResult> {
  const apiKey = (await getEnvVar('RESEND_API_KEY')).trim();
  if (!apiKey) return { ok: false, error: 'RESEND_API_KEY no definida' };

  try {
    const res = await fetch(RESEND_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: input.from ?? DEFAULT_FROM,
        to: Array.isArray(input.to) ? input.to : [input.to],
        subject: input.subject,
        html: input.html,
        ...(input.replyTo ? { reply_to: input.replyTo } : {}),
      }),
    });
    if (!res.ok) {
      const body = await res.text().catch(() => '');
      return { ok: false, status: res.status, error: body.slice(0, 300) };
    }
    return { ok: true, status: res.status };
  } catch (err: any) {
    return { ok: false, error: err?.message ?? 'fetch failed' };
  }
}

export const escapeHtml = (s: string) =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
