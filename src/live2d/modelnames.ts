/**
 * Optional localized display name overrides for models.
 *
 * Keyed by normalized model id (use forward slashes for paths).
 * Example:
 * {
 *   'CHA_Alf_SSR_01': { en: 'Alf', kr: '알프' },
 *   'StellarSora/assets/.../10301_L': { en: 'Unit 10301 L', kr: '10301 L' },
 * }
 */
export const ModelNameOverrides: Record<string, Record<string, string>> = {
  // Add overrides here as needed.
};

/**
 * Utility to normalize a model id so overrides are matched reliably.
 */
export function normalizeModelId(id: string): string {
  if (!id) {
    return '';
  }
  return id.replace(/\\/g, '/');
}
