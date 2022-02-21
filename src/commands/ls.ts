import type { Arguments, CommandBuilder } from 'yargs';
import { getConfig } from '../utils';

type Options = {
  name: string;
};

export const command: string = 'ls <name>';
export const desc: string = 'ls <name> with task';

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

  console.log(config[name].cm.join("\n"));

  process.exit(0);
};
