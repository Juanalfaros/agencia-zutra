/**
 * Autenticación con HMAC-SHA256 via Web Crypto API (disponible en Cloudflare Workers y navegadores).
 * Cada token es: base64url(payload) + '.' + base64url(hmac-sha256(payload, secret))
 */

async function importKey(secret: string): Promise<CryptoKey> {
  const enc = new TextEncoder();
  return crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  );
}

function b64url(buf: ArrayBuffer): string {
  return btoa(String.fromCharCode(...new Uint8Array(buf)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

function b64urlToBytes(str: string): Uint8Array {
  const b64 = str.replace(/-/g, '+').replace(/_/g, '/');
  const raw = atob(b64);
  return Uint8Array.from(raw, (c) => c.charCodeAt(0));
}

/** Firma un payload string y devuelve `payloadB64.signatureB64` */
export async function signToken(
  payload: string,
  secret: string
): Promise<string> {
  const enc = new TextEncoder();
  const key = await importKey(secret);
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(payload));
  const payloadB64 = b64url(enc.encode(payload).buffer);
  return `${payloadB64}.${b64url(sig)}`;
}

/** Verifica firma y devuelve el payload string, o null si inválido */
async function verifySignedToken(
  token: string,
  secret: string
): Promise<string | null> {
  const dot = token.lastIndexOf('.');
  if (dot === -1) return null;
  const payloadB64 = token.slice(0, dot);
  const sigB64 = token.slice(dot + 1);

  const key = await importKey(secret);

  let payloadBytes: Uint8Array;
  let sigBytes: Uint8Array;
  try {
    payloadBytes = b64urlToBytes(payloadB64);
    sigBytes = b64urlToBytes(sigB64);
  } catch {
    return null;
  }

  const valid = await crypto.subtle.verify(
    'HMAC',
    key,
    sigBytes.buffer as ArrayBuffer,
    payloadBytes.buffer as ArrayBuffer
  );
  if (!valid) return null;

  return new TextDecoder().decode(payloadBytes);
}

export interface SessionData {
  email: string;
  slug: string;
  isAdmin: boolean;
}

export interface OTPData {
  email: string;
  slug: string;
  timestamp: number;
}

/**
 * Verifica un token OTP firmado con HMAC.
 * Formato del payload: `${email}|${slug}|${timestamp}`
 * TTL: 15 minutos.
 */
export async function verifyOTP(
  token: string,
  secret: string
): Promise<OTPData | null> {
  if (!token || !secret) return null;
  try {
    const payload = await verifySignedToken(token, secret);
    if (!payload) return null;

    const [email, slug, tsStr] = payload.split('|');
    if (!email || !slug || !tsStr) return null;

    const timestamp = parseInt(tsStr);
    if (Date.now() - timestamp > 15 * 60 * 1000) return null;

    return { email, slug, timestamp };
  } catch {
    return null;
  }
}

/**
 * Verifica una cookie de sesión firmada con HMAC.
 * Formato del payload: `${email}:${slug}:${isAdmin}:${timestamp}`
 */
export async function verifyToken(
  token: string,
  secret: string
): Promise<SessionData | null> {
  if (!token || !secret) return null;
  try {
    const payload = await verifySignedToken(token, secret);
    if (!payload) return null;

    const [email, slug, isAdminStr, timestamp] = payload.split(':');
    if (!email || !slug || !timestamp) return null;

    const isExpired =
      Date.now() - parseInt(timestamp) > 365 * 24 * 60 * 60 * 1000;
    if (isExpired) return null;

    return { email, slug, isAdmin: isAdminStr === 'true' };
  } catch {
    return null;
  }
}
