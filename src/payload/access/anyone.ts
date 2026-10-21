import type { Access } from 'payload';

/** Public read access — content collections and globals are readable by anyone. */
export const anyone: Access = () => true;
