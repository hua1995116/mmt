import type { Arguments, CommandBuilder } from 'yargs';
import { getConfig, downloadConfig } from '../utils';
import * as path from 'path';

type Options = {
  name: string
};

export const command: string = 'export <name>';
export const desc: string = 'export <name> e.g., mmt export muji';

export const builder: CommandBuilder<Options, Options> = (yargs) =>
  yargs
    .positional('name', { type: 'string', demandOption: true });

export const handler = (argv: Arguments<Options>): void => {
  const config = getConfig();
  const { name } = argv;

  const epxortPath = path.join(process.cwd(), 'mmt-export.json')

  if (name === 'all') {
    downloadConfig(epxortPath, JSON.stringify(config, null, 4));
    console.log(`export success at ${epxortPath}`);
    return;
  }

  if (name && !config[name]) {
    console.error(`No task with ${name} found.`);
    return;
  }

  const exportSingle = {
    name, // single tag
    task: config[name],
  }

  const singlePath = path.join(process.cwd(), `mmt-export-${name}.json`)

  downloadConfig(singlePath, JSON.stringify(exportSingle, null, 4));

  console.log(`export success at ${singlePath}!`);

  process.exit(0);
};