import * as migration_20261021_062849_initial from './20261021_062849_initial';
import * as migration_20261021_111850_cms_full_site from './20261021_111850_cms_full_site';

export const migrations = [
  {
    up: migration_20261021_062849_initial.up,
    down: migration_20261021_062849_initial.down,
    name: '20261021_062849_initial',
  },
  {
    up: migration_20261021_111850_cms_full_site.up,
    down: migration_20261021_111850_cms_full_site.down,
    name: '20261021_111850_cms_full_site'
  },
];
