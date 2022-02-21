import type { Arguments, CommandBuilder } from 'yargs';
import { getConfig, saveConfig } from '../utils';

type Options = {
  task: string;
  name: string
};


export const command: string = 'add-sync <name> <task>';
export const desc: string = 'add-sync <name> <task> e.g., mmt add-sync muji "npm run start" ';

export const builder: CommandBuilder<Options, Options> = (yargs) =>
  yargs
    .positional('name', { type: 'string', demandOption: true })
    .positional('task', { type: 'string', demandOption: true });

export const handler = (argv: Arguments<Options>): void => {
  const config = getConfig();
  const { name, task } = argv;

  if (!config[name]) {
    config[name] = {
      type: "sync",
      cm: [],
    };
	}

	if (config[name].type !== 'sync') {
		console.error("The current task has been set to <async>, a task cannot be assigned multiple types.")
		process.exit(0);
	}

  config[name].cm.push(task);

  saveConfig(config);

  console.log("add success!");

  process.exit(0);
};