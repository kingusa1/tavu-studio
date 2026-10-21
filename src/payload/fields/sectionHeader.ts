import type { Field } from 'payload';

export type SectionHeaderArgs = {
  withIntro?: boolean;
};

/**
 * Flat fields for a page section's heading block — spread directly into a tab's `fields`
 * array (a named tab already acts as the group, §3), not wrapped in its own group.
 */
export function sectionHeader({ withIntro = true }: SectionHeaderArgs = {}): Field[] {
  const fields: Field[] = [
    { name: 'eyebrow', type: 'text' },
    { name: 'heading', type: 'text' },
  ];
  if (withIntro) {
    fields.push({ name: 'intro', type: 'textarea' });
  }
  return fields;
}
