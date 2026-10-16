import { getEnvVar } from '@/lib/runtime-env';

export interface Lead {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  timeline?: string;
  budget?: string;
  message?: string;
  source: 'formulario' | 'bot';
}

// Guarda el lead como documento `lead` en Sanity (visible en el Studio).
// Requiere SANITY_AUTH_TOKEN con permiso de escritura.
export async function saveLead(
  lead: Lead
): Promise<{ ok: boolean; error?: string }> {
  const [projectId, dataset, token] = await Promise.all([
    getEnvVar('SANITY_PROJECT_ID'),
    getEnvVar('SANITY_DATASET'),
    getEnvVar('SANITY_AUTH_TOKEN'),
  ]);
  if (!projectId || !token)
    return { ok: false, error: 'Sanity sin credenciales de escritura' };

  try {
    const res = await fetch(
      `https://${projectId}.api.sanity.io/v2025-08-15/data/mutate/${dataset || 'production'}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mutations: [
            {
              create: {
                _type: 'lead',
                ...lead,
                status: 'nuevo',
                receivedAt: new Date().toISOString(),
              },
            },
          ],
        }),
      }
    );
    if (!res.ok) {
      const body = await res.text().catch(() => '');
      return { ok: false, error: `${res.status} ${body.slice(0, 200)}` };
    }
    return { ok: true };
  } catch (err: any) {
    return { ok: false, error: err?.message ?? 'fetch failed' };
  }
}
