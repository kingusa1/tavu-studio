import type { GlobalConfig } from 'payload';

import { isAdminOrEditor } from '../../access/isAdminOrEditor';
import { revalidateGlobalAfterChange } from '../../hooks/revalidateSite';

/**
 * Shared shape for every page-global stub below: slug + a `title` text field, per the F0
 * stub contract (CMS-Content-Model.md §6). The package that owns a page replaces its
 * `fields` with the real section-by-section schema from §3.5 — it never touches this
 * factory or `globals/index.ts`.
 */
export function pageGlobalStub(slug: string): GlobalConfig {
  return {
    slug,
    admin: {
      group: 'Pages',
    },
    access: {
      read: () => true,
      update: isAdminOrEditor,
    },
    versions: { max: 25 },
    hooks: {
      afterChange: [revalidateGlobalAfterChange],
    },
    fields: [{ name: 'title', type: 'text' }],
  };
}
