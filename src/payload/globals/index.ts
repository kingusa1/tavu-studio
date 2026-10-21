import type { GlobalConfig } from 'payload';

/**
 * Empty for now — the content architect owns the real globals (site settings,
 * header/footer, etc.). payload.config.ts imports this array so adding a
 * global later is a one-line change there, not a payload.config.ts edit.
 */
export const globals: GlobalConfig[] = [];
