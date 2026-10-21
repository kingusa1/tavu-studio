import * as migration_20261021_062849_initial from './20261021_062849_initial';

export const migrations = [
  {
    up: migration_20261021_062849_initial.up,
    down: migration_20261021_062849_initial.down,
    name: '20261021_062849_initial'
  },
];
