// Variables y bindings de Cloudflare. Desde Astro 6 / @astrojs/cloudflare 13,
// `Astro.locals.runtime.env` ya no existe: se lee con `cloudflare:workers`.
let cached: Record<string, any> | null = null;

export async function getRuntimeEnv(): Promise<Record<string, any>> {
  if (cached) return cached;
  try {
    const { env } = await import('cloudflare:workers');
    cached = env as Record<string, any>;
  } catch {
    cached = {};
  }
  return cached;
}

export async function getEnvVar(key: string): Promise<string> {
  const runtime = await getRuntimeEnv();
  const value =
    runtime[key] ||
    (import.meta.env as any)[key] ||
    (globalThis as any).process?.env?.[key] ||
    '';
  return typeof value === 'string' ? value : '';
}
