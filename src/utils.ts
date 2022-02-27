import { spawn, exec } from "child_process";
import { CACHE, CACHE_JSON, INIT_CONFIG } from './const';
import * as fs from 'fs';
import * as util from 'util';

const execPromise = util.promisify(exec);

export async function runAsync(command: string[]) {
  return new Promise((rev, rej) => {
    console.log(command.slice(0, 1)[0], command.slice(1));
    const cmd = spawn(command.slice(0, 1)[0], command.slice(1));

    cmd.stdout.on('data', (data) => {
      console.log(`${data}`);
    });

    cmd.stderr.on('data', (data) => {
      console.error(`${data}`);
    });

    cmd.on('close', () => {
      rev(0);
    });
  })
}

export async function run(command: string[]) {
  const { stdout, stderr } = await execPromise(command.join(" "));
  if (stdout) {
    console.log(stdout);
  }
  if (stderr) {
    console.error(stderr);
  }
}

export interface TaskInfo {
  type: string,
  cm: any[],
}

interface Config {
  [key: string]: TaskInfo
}

export function getConfig() {
  const dir = fs.existsSync(CACHE);
  if (!dir) {
    fs.mkdirSync(CACHE);
  };

  let config: Config = INIT_CONFIG;

  if (fs.existsSync(CACHE_JSON)) {
    config = JSON.parse(fs.readFileSync(CACHE_JSON, 'utf-8'));
  }
  return config;
}

export function saveConfig(config: Config) {
  downloadConfig(CACHE_JSON, JSON.stringify(config));
}

export function downloadConfig(path: string, config: any) {
  fs.writeFileSync(path, config);
}
