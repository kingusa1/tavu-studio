import * as migration_20261021_062849_initial from './20261021_062849_initial';
import * as migration_20261021_111850_cms_full_site from './20261021_111850_cms_full_site';
import * as migration_20261021_112659_media_drop_dev_prefix from './20261021_112659_media_drop_dev_prefix';
import * as migration_20261021_123428_authors_kind from './20261021_123428_authors_kind';
import * as migration_20261105_120000_contrast_intro_offer from './20261105_120000_contrast_intro_offer';
import * as migration_20261105_130000_compression_flush_15min_copy from './20261105_130000_compression_flush_15min_copy';

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
    name: '20261021_112659_media_drop_dev_prefix',
  },
  {
    up: migration_20261021_123428_authors_kind.up,
    down: migration_20261021_123428_authors_kind.down,
    name: '20261021_123428_authors_kind'
  },
  {
    up: migration_20261105_120000_contrast_intro_offer.up,
    down: migration_20261105_120000_contrast_intro_offer.down,
    name: '20261105_120000_contrast_intro_offer',
  },
  {
    up: migration_20261105_130000_compression_flush_15min_copy.up,
    down: migration_20261105_130000_compression_flush_15min_copy.down,
    name: '20261105_130000_compression_flush_15min_copy',
  },
];
