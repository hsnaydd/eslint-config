import { mkdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { ESLint } from 'eslint';

import config from '../index.js';

export const fixturesDir = fileURLToPath(new URL('./fixtures/', import.meta.url));

// `import/no-extraneous-dependencies` matches its `devDependencies` globs, like
// `test?(s)/**`, against paths relative to the working directory. Run from the
// fixtures directory, as a user's project would, so that the fixtures do not
// all count as test files.
process.chdir(fixturesDir);

/**
 * Type information for TypeScript files, set up the way the README tells
 * users to do it in their own config.
 */
const typedLinting = {
  files: ['**/*.ts?(x)'],
  languageOptions: {
    parserOptions: {
      projectService: {
        // Code snippets linted with `lintCode` are not part of the fixtures'
        // tsconfig, so they are type checked with its compiler options instead.
        allowDefaultProject: ['snippets/*.ts', 'snippets/*.tsx'],
        defaultProject: 'tsconfig.json',
      },
      tsconfigRootDir: fixturesDir,
    },
  },
};

const instances = new Map();

/**
 * Returns an ESLint instance for the given presets. It ignores any config file
 * in the repository and uses only the presets, like a user's config would.
 */
export function createESLint(presets) {
  const key = presets.join('+');

  if (!instances.has(key)) {
    instances.set(
      key,
      new ESLint({
        cwd: fixturesDir,
        overrideConfigFile: true,
        overrideConfig: [...presets.flatMap((name) => config[name]), typedLinting],
      }),
    );
  }

  return instances.get(key);
}

/**
 * Lints a fixture file with the given presets and returns its result.
 */
export async function lintFile(presets, fileName) {
  const [result] = await createESLint(presets).lintFiles(path.join(fixturesDir, fileName));

  return result;
}

/**
 * Lints a code snippet as a file in the fixtures' `snippets` directory, so the
 * fixtures' package.json and the repository's Prettier config apply to it,
 * and returns its result. The file is written to disk because some rules, like
 * `import/no-cycle`, need to resolve the file being linted.
 */
export async function lintCode(presets, code, fileName) {
  const filePath = path.join(fixturesDir, 'snippets', fileName);

  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, code);

  try {
    const [result] = await createESLint(presets).lintFiles(filePath);

    return result;
  } finally {
    await rm(filePath);
  }
}

/**
 * Formats the messages of a result as `line:column rule message` strings.
 */
export function formatMessages(result) {
  return result.messages.map(
    (message) => `${message.line}:${message.column} ${message.ruleId} ${message.message}`,
  );
}

/**
 * Returns the sorted, unique rule names reported in a result.
 */
export function reportedRules(result) {
  return [...new Set(result.messages.map((message) => message.ruleId))].sort();
}
