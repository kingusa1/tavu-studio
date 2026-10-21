import type { CollectionAfterChangeHook, CollectionConfig } from 'payload';

const MIN_PASSWORD_LENGTH = 12;

import { loadEmailContext } from '../../lib/email/context';
import { passwordResetEmail, userInvitationEmail } from '../../lib/email/templates';
import { fieldError } from '../errors';

const INVITE_CONTEXT_KEY = 'sendCmsInvitation';
const INVITE_VALID_HOURS = 72;

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

/** Payload's own minimum is 3 characters (fields/validations.js) — enforce 12+ on create and on any password change. */
const enforcePasswordLength: CollectionConfig['hooks'] = {
  beforeValidate: [
    ({ data }) => {
      if (typeof data?.password === 'string' && data.password.length < MIN_PASSWORD_LENGTH) {
        throw fieldError('users', 'password', `Password must be at least ${MIN_PASSWORD_LENGTH} characters`);
      }
      return data;
    },
  ],
  // "Reset password" hashes the new password before beforeValidate runs (payload
  // auth/operations/resetPassword.js), so the same rule is enforced on the operation's input.
  beforeOperation: [
    ({ args, operation }) => {
      const password = (args as { data?: { password?: unknown } })?.data?.password;
      if (operation === 'resetPassword' && (typeof password !== 'string' || password.length < MIN_PASSWORD_LENGTH)) {
        throw fieldError('users', 'password', `Password must be at least ${MIN_PASSWORD_LENGTH} characters`);
      }
      return args;
    },
  ],
};

/**
 * "Email this person a sign-in invitation": a virtual (never stored) tick box. beforeChange notes the
 * request, afterChange creates a one-time set-your-password link (72 hours) and sends the branded
 * invitation. The password itself is never emailed; a failed email never undoes the save.
 */
const noteInvitation: NonNullable<CollectionConfig['hooks']>['beforeChange'] = [
  ({ data, req }) => {
    if (data?.sendInvite === true && req.user?.role === 'admin') req.context[INVITE_CONTEXT_KEY] = true;
    return data;
  },
];

const sendInvitation: CollectionAfterChangeHook = async ({ doc, req }) => {
  if (!req.context[INVITE_CONTEXT_KEY]) return doc;
  delete req.context[INVITE_CONTEXT_KEY];
  try {
    const token = await req.payload.forgotPassword({
      collection: 'users',
      data: { email: String(doc.email) },
      disableEmail: true,
      expiration: INVITE_VALID_HOURS * 60 * 60 * 1000,
      req,
    });
    if (!token) throw new Error('no token returned');
    const ctx = await loadEmailContext(req.payload);
    const email = userInvitationEmail(
      {
        name: doc.name,
        email: String(doc.email),
        role: doc.role,
        setPasswordUrl: `${ctx.siteUrl}/admin/reset/${encodeURIComponent(token)}`,
        loginUrl: `${ctx.siteUrl}/admin`,
        validHours: INVITE_VALID_HOURS,
      },
      ctx,
    );
    await req.payload.sendEmail({ to: String(doc.email), subject: email.subject, html: email.html, text: email.text });
    req.payload.logger.info({ msg: 'CMS invitation sent', userId: doc.id });
  } catch (error) {
    req.payload.logger.error({ msg: 'CMS invitation failed', userId: doc.id, err: String(error) });
  }
  return doc;
};

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'name', 'role'],
  },
  auth: {
    forgotPassword: {
      expiration: 60 * 60 * 1000,
      generateEmailSubject: () => 'Reset your TAVÚ CMS password',
      // Branded email; the link is always built from the configured site URL, never from the
      // request's Host header (prevents reset-link poisoning).
      generateEmailHTML: async (args) => {
        const { req, token, user } = args ?? {};
        if (!req || !token) return '';
        const ctx = await loadEmailContext(req.payload);
        const resetUrl = `${ctx.siteUrl}/admin/reset/${encodeURIComponent(token)}`;
        return passwordResetEmail({ name: user?.name, email: String(user?.email ?? ''), resetUrl }, ctx).html;
      },
    },
    cookies: {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Lax',
    },
    maxLoginAttempts: 5,
    lockTime: 15 * 60_000,
  },
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
      name: 'sendInvite',
      type: 'checkbox',
      label: 'Email this person a sign-in invitation when I save',
      virtual: true,
      defaultValue: false,
      admin: {
        description:
          'They receive a TAVÚ email with their sign-in address and a button to choose their own password (the link works for 72 hours; after that they can use “Forgot password?”). Their password is never sent by email.',
      },
      access: {
        read: ({ req }) => req.user?.role === 'admin',
        create: ({ req }) => req.user?.role === 'admin',
        update: ({ req }) => req.user?.role === 'admin',
      },
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
  hooks: {
    beforeChange: [...(forceFirstUserToAdmin?.beforeChange ?? []), ...noteInvitation],
    afterChange: [sendInvitation],
    beforeOperation: [...(enforcePasswordLength?.beforeOperation ?? [])],
    beforeValidate: [...(enforcePasswordLength?.beforeValidate ?? [])],
  },
};
