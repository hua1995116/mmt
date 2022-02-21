import home from 'user-home';
import * as path from 'path';

export const INIT_CONFIG = {};
export const CACHE = path.join(home, '.mmt');
export const CACHE_JSON = path.join(home, '.mmt', 'cache.json');
export const TTAB = path.join(__dirname, '../node_modules/ttab/bin/ttab');
