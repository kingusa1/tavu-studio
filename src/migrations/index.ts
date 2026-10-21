import * as migration_20261021_062849_initial from './20261021_062849_initial';
import * as migration_20261021_111850_cms_full_site from './20261021_111850_cms_full_site';
import * as migration_20261021_112659_media_drop_dev_prefix from './20261021_112659_media_drop_dev_prefix';

export const migrations = [
  {
    up: migration_20261021_062849_initial.up,
    down: migration_20261021_062849_initial.down,
    name: '20261021_062849_initial',
  },
  {
    up: migration_20261021_111850_cms_full_site.up,
    down: migration_20261021_111850_cms_full_site.down,
    name: '20261021_111850_cms_full_site',
  },
  {
    up: migration_20261021_112659_media_drop_dev_prefix.up,
    down: migration_20261021_112659_media_drop_dev_prefix.down,
    name: '20261021_112659_media_drop_dev_prefix'
  },
];
