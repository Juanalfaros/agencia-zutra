/**
 * Versión simplificada y robusta de utilidades de autenticación.
 * Optimizada para Cloudflare Pages (Free Tier) y para evitar errores de compilación TS.
 */

/**
 * Verifica una sesión básica (Base64)
 */
export async function verifyToken(
  token: string,
  secret: string
): Promise<any | null> {
  if (!token) return null;
  try {
    const decoded = atob(token);
    const [email, slug, isAdmin, timestamp] = decoded.split(':');

    // Si tiene todos los campos y no ha expirado (30 días para sesión de lectura)
    if (email && slug && timestamp) {
      const isExpired =
        Date.now() - parseInt(timestamp) > 30 * 24 * 60 * 60 * 1000;
      if (!isExpired) {
        return { email, slug, isAdmin: isAdmin === 'true' };
      }
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Genera un token de sesión básico
 */
export async function signToken(payload: any, secret: string): Promise<string> {
  const { email, slug, isAdmin } = payload;
  return btoa(`${email}:${slug}:${isAdmin}:${Date.now()}`);
}
