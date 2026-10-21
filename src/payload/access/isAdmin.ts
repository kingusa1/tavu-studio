import type { Access, FieldAccess } from 'payload';

/** Collection/global-level access: only an authenticated admin. */
export const isAdmin: Access = ({ req }) => Boolean(req.user?.role === 'admin');

/** Field-level access: only an authenticated admin (e.g. Mindbody IDs, analytics IDs). */
export const isAdminField: FieldAccess = ({ req }) => Boolean(req.user?.role === 'admin');
