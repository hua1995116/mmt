import type { Arguments, CommandBuilder } from 'yargs';
import { getConfig, saveConfig, run, runAsync } from '../utils';
import { TTAB } from '../const';

type Options = {
  name: string;
};

export const command: string = 'run <name>';
export const desc: string = 'run <name> with task';

export const builder: CommandBuilder<Options, Options> = (yargs) =>
  yargs
    .positional('name', { type: 'string', demandOption: true });

export const handler = async (argv: Arguments<Options>): Promise<void> => {
  const config = getConfig();
  const { name } = argv;

  const tasklist = config[name];
  if (!tasklist) {
    process.stdout.write("不存在当前task")
    return;
  }

  if (tasklist.type === 'sync') {
    await runAsync(tasklist.cm);
    return;
  }

  for (let i = 0; i < tasklist.cm.length; i++) {
    await run([
      TTAB,
      `'${tasklist.cm[i]}'`
    ]);
  }

  process.exit(0);
};
