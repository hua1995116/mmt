#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
const updater = require('pkg-updater');
const pkg = require('../package.json');

updater({'pkg': pkg}) .then(() => { 
  yargs(hideBin(process.argv))
  // Use the commands directory to scaffold.
  .commandDir('commands')
  // Enable strict mode.
  .strict()
  // Useful aliases.
  .alias({ h: 'help' })
  .alias({ v: 'version' })
  .argv;
 });
