/**
 * Función para sanitizar inputs de usuario
 * - Trimea espacios
 * - Limita longitud a 500 caracteres
 * - Escapa caracteres peligrosos (<, >, `)
 */
export function sanitizeInput(input: string | undefined | null): string {
  if (!input) return '';
  return input.trim().slice(0, 500).replace(/[<>`]/g, '');
}
