import type { Field } from 'payload';

import { accents } from '@/components/cms/accents';
import type { AccentSetName } from '@/components/cms/accents';
import { cmsIcons } from '@/components/icons/cmsIcons';
import type { IconSetName } from '@/components/icons/cmsIcons';

function toOptions(keys: string[]): { label: string; value: string }[] {
  return keys.map((key) => ({
    label: key
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' '),
    value: key,
  }));
}

/**
 * A select field whose options are the keys of `cmsIcons[set]` (src/components/icons/cmsIcons.tsx).
 * Stores only the key — never an SVG or a class string (R4).
 */
export function iconSelect(set: IconSetName, name = 'icon', overrides?: Partial<Field>): Field {
  return {
    name,
    type: 'select',
    options: toOptions(Object.keys(cmsIcons[set])),
    ...overrides,
  } as Field;
}

/**
 * A select field whose options are the keys of `accents[set]` (src/components/cms/accents.ts).
 */
export function accentSelect(set: AccentSetName, name = 'accent', overrides?: Partial<Field>): Field {
  return {
    name,
    type: 'select',
    options: toOptions(Object.keys(accents[set])),
    ...overrides,
  } as Field;
}
