import type { Arguments, CommandBuilder } from 'yargs';
import { getConfig } from '../utils';

type Options = {
  name: string;
};

export const command: string = 'show <name>';
export const desc: string = 'show one task\'s details.';

export const handler = async (argv: Arguments<Options>): Promise<void> => {
  const config = getConfig();
  const { name } = argv;

  if (!config[name]) {
    console.log(`No task1 with ${name} found.`);
    console.log(`Which one did you want to show ?`);
    console.log(Object.keys(config).map(item => "- " + item).join("\n"));
    return;
  }

  // 找到对应的task
  console.log(`Task Name: ${name}`);
  console.log(`Task Type: ${config[name].type}`);
  console.log(`Task Commands: `);
  console.log(config[name].cm.map(item => "- " + item).join("\n"));

  process.exit(0);
};
