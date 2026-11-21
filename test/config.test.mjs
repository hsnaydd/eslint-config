import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { formatMessages, lintFile } from './helpers.mjs';

/**
 * Each preset is combined with the presets it is used with in practice and
 * linted against fixtures that follow all of its rules.
 */
const cases = [
  { presets: ['base'], files: ['price.js', 'user.ts'] },
  { presets: ['node'], files: ['read-config.ts'] },
  { presets: ['react'], files: ['greeting.jsx', 'Counter.tsx', 'Counter.stories.tsx'] },
  { presets: ['next'], files: ['Counter.tsx', 'pages/index.tsx'] },
  { presets: ['react', 'jest'], files: ['Counter.test.tsx'] },
  { presets: ['base', 'vitest'], files: ['user.test.ts'] },
  { presets: ['base', 'storybook'], files: ['Counter.stories.tsx'] },
];

describe('config', () => {
  for (const { presets, files } of cases) {
    describe(presets.join(' + '), () => {
      for (const fileName of files) {
        describe(fileName, () => {
          it('loads without fatal errors or deprecated rules', async () => {
            const result = await lintFile(presets, fileName);

            assert.equal(result.fatalErrorCount, 0, formatMessages(result).join('\n'));
            assert.deepEqual(
              result.usedDeprecatedRules.map((rule) => rule.ruleId),
              [],
            );
          });

          it('reports no problems', async () => {
            const result = await lintFile(presets, fileName);

            assert.deepEqual(formatMessages(result), []);
          });
        });
      }
    });
  }
});
