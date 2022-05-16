import type { Arguments, CommandBuilder } from 'yargs';
import { getConfig, run } from '../utils';
// import { TTAB } from '../const';
import { parse } from '../parse';
const applescript = require("applescript");

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
    for (let i = 0; i < tasklist.cm.length; i++) {
      await run(tasklist.cm[i].split(" "));
    }
    return;
  }

  const script = parse(tasklist.cm);

  applescript.execString(script, function(err: any) {
    if (err) {
      // Something went wrong!
      console.error(err);
    }
    process.exit(0);
  });
};
