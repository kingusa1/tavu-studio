import type { Access } from 'payload';

/** Collection/global-level access: any authenticated CMS user (admin or editor). Used for `read` so no content is public via REST/GraphQL. */
export const authenticated: Access = ({ req }) => Boolean(req.user);
