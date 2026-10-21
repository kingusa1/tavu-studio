import type { CollectionConfig } from 'payload';

/**
 * The very first user ever created has no admin to grant them the role, so
 * beforeChange forces role: 'admin' when the collection is still empty.
 * Every user created after that keeps whatever role was requested (defaulting
 * to 'editor'), and only an existing admin can promote someone afterwards
 * (see the `role` field's own access.update below).
 */
const forceFirstUserToAdmin: CollectionConfig['hooks'] = {
  beforeChange: [
    async ({ data, operation, req }) => {
      if (operation !== 'create') {
        return data;
      }
      const { totalDocs } = await req.payload.count({ collection: 'users', overrideAccess: true });
      if (totalDocs === 0) {
        return { ...data, role: 'admin' };
      }
      return data;
    },
  ],
};

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'name', 'role'],
  },
  auth: true,
  access: {
    create: ({ req }) => Boolean(req.user?.role === 'admin'),
    delete: ({ req }) => Boolean(req.user?.role === 'admin'),
    read: ({ req }) => {
      if (req.user?.role === 'admin') return true;
      if (req.user) return { id: { equals: req.user.id } };
      return false;
    },
    update: ({ req }) => {
      if (req.user?.role === 'admin') return true;
      if (req.user) return { id: { equals: req.user.id } };
      return false;
    },
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'editor',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
      ],
      // Field-level access, separate from the collection-level update access above: an editor
      // can update their own document (name, password) but never their own role — only an
      // admin may promote/demote a user. Without this, "editors can update themselves" would
      // let an editor grant themselves admin.
      access: {
        update: ({ req }) => Boolean(req.user?.role === 'admin'),
      },
    },
  ],
  hooks: forceFirstUserToAdmin,
};
