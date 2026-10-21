import type { CollectionConfig } from 'payload';

import { authenticated } from '../access/authenticated';
import { isAdminOrEditor } from '../access/isAdminOrEditor';
import { revalidateAfterChange, revalidateAfterDelete } from '../hooks/revalidateSite';

/** Reformer and Breathing Room class types (CMS-Content-Model.md §2.5, package C). */
export const Classes: CollectionConfig = {
  slug: 'classes',
  admin: {
    group: 'Classes & Events',
    useAsTitle: 'name',
    defaultColumns: ['name', 'type', 'level', 'active', 'sortOrder'],
  },
  access: {
    read: authenticated,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  versions: { maxPerDoc: 25 },
  hooks: {
    afterChange: [revalidateAfterChange],
    afterDelete: [revalidateAfterDelete],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: { description: 'e.g. "TA: Gentle Flow", "TAVÚ MAT: Core"' },
    },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: 'Reformer', value: 'reformer' },
        { label: 'Breathing Room', value: 'breathing-room' },
      ],
    },
    {
      name: 'family',
      type: 'select',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'breathing-room',
        description: 'The small accent label shown above the class name (Breathing Room only).',
      },
      options: [
        { label: 'TAVÚ MAT', value: 'tavu-mat' },
        { label: 'TAVÚ RELEASE', value: 'tavu-release' },
        { label: 'TAVÚ STRETCH', value: 'tavu-stretch' },
      ],
    },
    {
      name: 'level',
      type: 'select',
      admin: {
        description:
          'Badge colour is fixed per level in code. The Breathing Room page always shows its badge in rose regardless of this value.',
      },
      options: [
        { label: 'Foundation', value: 'foundation' },
        { label: 'All Levels', value: 'all-levels' },
        { label: 'Intermediate', value: 'intermediate' },
        { label: 'Advanced', value: 'advanced' },
      ],
    },
    { name: 'description', type: 'textarea', required: true },
    {
      name: 'durationLabel',
      type: 'text',
      defaultValue: '50 min',
      admin: { description: 'Shown on the Reformer Pilates service page.' },
    },
    { name: 'active', type: 'checkbox', defaultValue: true, admin: { position: 'sidebar' } },
    { name: 'sortOrder', type: 'number', defaultValue: 0, admin: { position: 'sidebar' } },
  ],
};
