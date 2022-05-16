import type { Arguments, CommandBuilder } from 'yargs';
import { getConfig, saveConfig } from '../utils';
import { pkgRead } from 'package-io';

type Options = {
  task: string;
  name: string
};


export const command: string = 'add <name> <task>';
export const desc: string = 'add <name> <task> e.g., mmt add muji "npm run start" ';

export const builder: CommandBuilder<Options, Options> = (yargs) =>
  yargs
    .positional('name', { type: 'string', demandOption: true })
    .positional('task', { type: 'string', demandOption: true });

export const handler = (argv: Arguments<Options>): void => {
  const config = getConfig();
  const { name, task } = argv;

  if (!config[name]) {
    config[name] = {
      type: "async",
      cm: [],
    };
  }

  if (config[name].type !== 'async') {
    console.error("The current task has been set to <sync>, a task cannot be assigned multiple types.")
    process.exit(0);
  }


  let curTask = task;

  // 解析当前 package.json 优先
  const data = pkgRead() as any;
  if (data.name) {
    // 说明存在
    if (data.scripts[task]) {
      // 如果当前命令是 package.json 的命令，则直接添加
      curTask = `cd ${process.cwd()} && ` + data.scripts[task];
    }
  }

  config[name].cm.push(curTask);

  saveConfig(config);

  console.log("add success!");

  process.exit(0);
};