import type { Arguments, CommandBuilder } from 'yargs';
import { getConfig, saveConfig, run } from '../utils';

type Options = {
  name: string;
};

export const command: string = 'rm <name>';
export const desc: string = 'rm <name> with task';

export const builder: CommandBuilder<Options, Options> = (yargs) =>
  yargs
    .positional('name', { type: 'string', demandOption: true });

export const handler = async (argv: Arguments<Options>): Promise<void> => {
  const config = getConfig();
  const { name } = argv;

  if (!config[name]) {
    console.log(`No task with ${name} found.`);
    return;
  }

  delete config[name];

  saveConfig(config);

  console.log(`remove ${name} success!`);

  process.exit(0);
};
