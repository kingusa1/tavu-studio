import type { Access } from 'payload';

/** Collection/global-level access: any authenticated CMS user (admin or editor). */
export const isAdminOrEditor: Access = ({ req }) => Boolean(req.user);
