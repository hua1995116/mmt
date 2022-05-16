import type { Arguments, CommandBuilder } from 'yargs';
import { getConfig } from '../utils';
import chalk from 'chalk';

type Options = {
  name: string;
};

export const command: string = 'ls';
export const desc: string = 'show all tasks.';

export const handler = async (argv: Arguments<Options>): Promise<void> => {
  const config = getConfig();

  const allTasks = Object.keys(config).map(item => "- " + (config[item].type === 'async' ? chalk.black.bgWhite(config[item].type) : chalk.black.bgGreen(config[item].type)) + " " + item).join("\n");

  console.log(allTasks);

  process.exit(0);
};
