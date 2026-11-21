import { readFile } from 'node:fs/promises';
import path from 'node:path';

export async function readConfig(dir: string): Promise<unknown> {
  const content = await readFile(path.join(dir, 'config.json'), 'utf8');

  return JSON.parse(content);
}
