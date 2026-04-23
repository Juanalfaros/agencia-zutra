// Stateless JWT signing/verification using Web Crypto API (HMAC-SHA256).
// Compatible with Cloudflare Workers runtime — no external dependencies.

function uint8ToBase64url(bytes: Uint8Array): string {
  let bin = '';
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

function base64urlToUint8(str: string): Uint8Array {
  const padding = '=='.slice(0, (4 - (str.length % 4)) % 4);
  const b64 = str.replace(/-/g, '+').replace(/_/g, '/') + padding;
  const bin = atob(b64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return bytes;
}

async function getKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  );
}

export async function signToken(
  payload: Record<string, unknown>,
  secret: string
): Promise<string> {
  const header = uint8ToBase64url(
    new TextEncoder().encode(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
  );
  const body = uint8ToBase64url(
    new TextEncoder().encode(JSON.stringify(payload))
  );
  const input = `${header}.${body}`;
  const key = await getKey(secret);
  const sig = await crypto.subtle.sign(
    'HMAC',
    key,
    new TextEncoder().encode(input)
  );
  return `${input}.${uint8ToBase64url(new Uint8Array(sig))}`;
}

export async function verifyToken(
  token: string,
  secret: string
): Promise<Record<string, unknown> | null> {
  if (!token) return null;
  const parts = token.split('.');
  if (parts.length !== 3) return null;
  const [header, body, sig] = parts;
  const input = `${header}.${body}`;
  try {
    const key = await getKey(secret);
    const valid = await crypto.subtle.verify(
      'HMAC',
      key,
      base64urlToUint8(sig).buffer,
      new TextEncoder().encode(input).buffer
    );
    if (!valid) return null;
    const payload = JSON.parse(
      new TextDecoder().decode(base64urlToUint8(body))
    ) as Record<string, unknown>;
    if (typeof payload.exp === 'number' && Date.now() > payload.exp)
      return null;
    return payload;
  } catch {
    return null;
  }
}
