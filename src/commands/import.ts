import type { Arguments, CommandBuilder } from 'yargs';
import { getConfig, saveConfig } from '../utils';
import * as npath from 'path';
import axios from 'axios';
import * as fs from 'fs';

type Options = {
  path: string
};

export const command: string = 'import <path>';
export const desc: string = 'import <path> e.g., mmt import ./mmt-export.json';

export const builder: CommandBuilder<Options, Options> = (yargs) =>
  yargs
    .positional('path', { type: 'string', demandOption: true });

export const handler = async (argv: Arguments<Options>): Promise<void> => {
  let config = getConfig();
  const { path } = argv;

  // must be json
  if (!path.endsWith(".json")) {
    console.error(`Must be a json file.`);
    return;
  }

  let importJSON;

  if (/(http|https):\/\/([\w.]+\/?)\S*/.test(path)) {
    try {
      // case remote url
      const result = await axios.get(path);
      importJSON = result.data;
    } catch (e) {
      console.error(`download ${path} error!`)
      return;
    }
  } else if (path.startsWith("/")) {
    try {
      // case absolute path
      const result = fs.readFileSync(path, 'utf-8');
      importJSON = JSON.parse(result);

    } catch (e) {
      console.error(e);
    }
  } else {
    // case relative path
    try {
      // case absolute path
      const result = fs.readFileSync(npath.join(process.cwd(), path), 'utf-8');
      importJSON = JSON.parse(result);

    } catch (e) {
      console.error(e);
    }
  }

  if (importJSON.name) {
    // single
    config[importJSON.name] = importJSON.task;
  } else {
    // all
    config = importJSON;
  }

  saveConfig(config);

  console.log("import success!");

  process.exit(0);
};