import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { formatMessages, lintCode, reportedRules } from './helpers.mjs';

/**
 * Each case is formatted with Prettier so that only the rules under test are
 * reported. `rules` must match the reported rules exactly; an empty list means
 * the code must pass.
 */
const cases = [
  // base
  {
    name: 'disallows console',
    presets: ['base'],
    file: 'a.ts',
    code: "console.log('debug');\n",
    rules: ['no-console'],
  },
  {
    name: 'requires strict equality',
    presets: ['base'],
    file: 'a.ts',
    code: 'export const isOne = (value: number): boolean => value == 1;\n',
    rules: ['eqeqeq'],
  },
  {
    name: 'requires template literals instead of string concatenation',
    presets: ['base'],
    file: 'a.ts',
    code: "export const greet = (name: string): string => 'Hello ' + name;\n",
    rules: ['prefer-template'],
  },
  {
    name: 'disallows var in JavaScript files',
    presets: ['base'],
    file: 'a.js',
    code: 'export function getCount() {\n  var count = 1;\n\n  return count;\n}\n',
    rules: ['no-var'],
  },
  {
    name: 'orders imports',
    presets: ['base'],
    file: 'a.ts',
    code: "import { DEFAULT_NAME } from '../user';\nimport path from 'node:path';\n\nexport const file = path.join(DEFAULT_NAME, 'a');\n",
    rules: ['import/order'],
  },
  {
    name: 'disallows packages missing from package.json',
    presets: ['base'],
    file: 'a.ts',
    code: "import ts from 'typescript';\n\nexport default ts;\n",
    rules: ['import/no-extraneous-dependencies'],
  },
  {
    name: 'disallows dev dependencies outside test files',
    presets: ['base'],
    file: 'a.ts',
    code: "import { format } from 'prettier';\n\nexport default format;\n",
    rules: ['import/no-extraneous-dependencies'],
  },
  {
    name: 'enforces naming conventions for variables',
    presets: ['base'],
    file: 'a.ts',
    code: 'export const my_value = 1;\n',
    rules: ['@typescript-eslint/naming-convention'],
  },
  {
    name: 'reports unnecessary conditions with type information',
    presets: ['base'],
    file: 'a.ts',
    code: 'export function getLength(value: string): number {\n  return value?.length;\n}\n',
    rules: ['@typescript-eslint/no-unnecessary-condition'],
  },
  {
    name: 'requires dot notation with type information',
    presets: ['base'],
    file: 'a.ts',
    code: "export const getName = (user: { name: string }): string => user['name'];\n",
    rules: ['@typescript-eslint/dot-notation'],
  },
  {
    name: 'does not run type-aware rules on JavaScript files',
    presets: ['base'],
    file: 'a.js',
    code: "export const getName = (user) => user?.['name'];\n",
    rules: [],
  },
  {
    name: 'defines globals shared by browsers and Node.js in JavaScript files',
    presets: ['base'],
    file: 'a.js',
    code: "export const parse = (value) => new URL(value, 'https://example.com');\n",
    rules: [],
  },
  {
    name: 'does not define browser globals without the react preset',
    presets: ['base'],
    file: 'a.js',
    code: 'export const getWidth = () => window.innerWidth;\n',
    rules: ['no-undef'],
  },
  {
    name: 'does not define Node.js globals without the node preset',
    presets: ['base'],
    file: 'a.js',
    code: 'export const getMode = () => process.env.NODE_ENV;\n',
    rules: ['no-undef'],
  },
  {
    name: 'reports unused variables',
    presets: ['base'],
    file: 'a.ts',
    code: 'const unused = 1;\n',
    rules: ['@typescript-eslint/no-unused-vars'],
  },
  {
    name: 'allows unused arguments starting with an underscore',
    presets: ['base'],
    file: 'a.ts',
    code: 'export const noop = (_event: unknown): void => {};\n',
    rules: [],
  },
  {
    name: 'formats code with Prettier',
    presets: ['base'],
    file: 'a.ts',
    code: 'export const value = "double";\n',
    rules: ['prettier/prettier'],
  },
  {
    name: 'disallows eslint-disable comments without rule names',
    presets: ['base'],
    file: 'a.ts',
    code: "// eslint-disable-next-line\nconsole.log('debug');\n",
    rules: ['@eslint-community/eslint-comments/no-unlimited-disable'],
  },

  // node
  {
    name: 'disallows default exports in Node.js',
    presets: ['node'],
    file: 'a.ts',
    code: 'const value = 1;\n\nexport default value;\n',
    rules: ['import/no-default-export'],
  },
  {
    name: 'disallows deprecated Node.js APIs',
    presets: ['node'],
    file: 'a.ts',
    code: "import { parse } from 'node:url';\n\nexport const url = parse('https://example.com');\n",
    rules: ['n/no-deprecated-api'],
  },
  {
    name: 'defines Node.js globals in JavaScript files',
    presets: ['node'],
    file: 'a.js',
    code: 'export const getMode = () => process.env.NODE_ENV;\n',
    rules: [],
  },
  {
    name: 'does not define browser globals in Node.js',
    presets: ['node'],
    file: 'a.js',
    code: 'export const getWidth = () => window.innerWidth;\n',
    rules: ['no-undef'],
  },

  // react
  {
    name: 'disallows conditional hooks',
    presets: ['react'],
    file: 'Example.tsx',
    code: "import { useState } from 'react';\n\nexport function Example({ enabled }: { enabled: boolean }): React.JSX.Element | null {\n  if (!enabled) {\n    return null;\n  }\n\n  const [value] = useState(0);\n\n  return <p>{value}</p>;\n}\n",
    rules: ['react-hooks/rules-of-hooks'],
  },
  {
    name: 'requires complete hook dependencies',
    presets: ['react'],
    file: 'Example.tsx',
    code: "import { useEffect } from 'react';\n\nexport function Example({ title }: { title: string }): React.JSX.Element {\n  useEffect(() => {\n    document.title = title;\n  }, []);\n\n  return <h1>{title}</h1>;\n}\n",
    rules: ['react-hooks/exhaustive-deps'],
  },
  {
    name: 'requires keys in lists',
    presets: ['react'],
    file: 'Example.tsx',
    code: 'export function Example({ items }: { items: string[] }): React.JSX.Element {\n  return (\n    <ul>\n      {items.map((item) => (\n        <li>{item}</li>\n      ))}\n    </ul>\n  );\n}\n',
    rules: ['react/jsx-key'],
  },
  {
    name: 'disallows array indexes as keys',
    presets: ['react'],
    file: 'Example.tsx',
    code: 'export function Example({ items }: { items: string[] }): React.JSX.Element {\n  return (\n    <ul>\n      {items.map((item, index) => (\n        <li key={index}>{item}</li>\n      ))}\n    </ul>\n  );\n}\n',
    rules: ['react/no-array-index-key'],
  },
  {
    name: 'requires self-closing components without children',
    presets: ['react'],
    file: 'Example.tsx',
    code: 'export function Example(): React.JSX.Element {\n  return <div></div>;\n}\n',
    rules: ['react/self-closing-comp'],
  },
  {
    name: 'requires function declarations for components',
    presets: ['react'],
    file: 'Example.tsx',
    code: 'export const Example = (): React.JSX.Element => <div />;\n',
    rules: ['react/function-component-definition'],
  },
  {
    name: 'allows JSX only in .jsx and .tsx files',
    presets: ['react'],
    file: 'example.js',
    code: 'export function Example() {\n  return <div />;\n}\n',
    rules: ['react/jsx-filename-extension'],
  },
  {
    name: 'requires alt text for images',
    presets: ['react'],
    file: 'Example.tsx',
    code: 'export function Example(): React.JSX.Element {\n  return <img src="/logo.png" />;\n}\n',
    rules: ['jsx-a11y/alt-text'],
  },
  {
    name: 'allows fragments that wrap an expression',
    presets: ['react'],
    file: 'Example.tsx',
    code: 'export function Example({ children }: { children: React.ReactNode }): React.JSX.Element {\n  return <>{children}</>;\n}\n',
    rules: [],
  },
  {
    name: 'defines browser globals in JavaScript files',
    presets: ['react'],
    file: 'a.js',
    code: 'export const getWidth = () => window.innerWidth;\n',
    rules: [],
  },

  // next
  {
    name: 'disallows img elements in Next.js',
    presets: ['next'],
    file: 'Example.tsx',
    code: 'export function Example(): React.JSX.Element {\n  return <img src="/logo.png" alt="Logo" />;\n}\n',
    rules: ['@next/next/no-img-element'],
  },
  {
    name: 'requires Link for internal pages in Next.js',
    presets: ['next'],
    file: 'Example.tsx',
    code: 'export function Example(): React.JSX.Element {\n  return <a href="/">Home</a>;\n}\n',
    rules: ['@next/next/no-html-link-for-pages'],
  },

  // jest
  {
    name: 'disallows focused tests in Jest',
    presets: ['react', 'jest'],
    file: 'Example.test.tsx',
    code: "it.only('works', () => {\n  expect(1).toBe(1);\n});\n",
    rules: ['jest/no-focused-tests'],
  },
  {
    name: 'prefers jest-dom matchers',
    presets: ['react', 'jest'],
    file: 'Example.test.tsx',
    code: "import { render, screen } from '@testing-library/react';\n\nimport { Counter } from '../Counter';\n\nit('shows the label', () => {\n  render(<Counter label=\"Clicks\" />);\n\n  expect(screen.getByRole('button').hasAttribute('disabled')).toBe(false);\n});\n",
    rules: ['jest-dom/prefer-to-have-attribute'],
  },
  {
    name: 'prefers screen queries in Testing Library',
    presets: ['react', 'jest'],
    file: 'Example.test.tsx',
    code: "import { render } from '@testing-library/react';\n\nimport { Counter } from '../Counter';\n\nit('shows the label', () => {\n  const { getByRole } = render(<Counter label=\"Clicks\" />);\n\n  expect(getByRole('button')).toBeInTheDocument();\n});\n",
    rules: ['testing-library/prefer-screen-queries'],
  },

  // vitest
  {
    name: 'disallows focused tests in Vitest',
    presets: ['base', 'vitest'],
    file: 'example.test.ts',
    code: "import { expect, it } from 'vitest';\n\nit.only('works', () => {\n  expect(1).toBe(1);\n});\n",
    rules: ['vitest/no-focused-tests'],
  },
  {
    name: 'prefers toBe for primitives in Vitest',
    presets: ['base', 'vitest'],
    file: 'example.test.ts',
    code: "import { expect, it } from 'vitest';\n\nit('works', () => {\n  expect(1).toEqual(1);\n});\n",
    rules: ['vitest/prefer-to-be'],
  },
  {
    name: 'defines Vitest globals in JavaScript files',
    presets: ['base', 'vitest'],
    file: 'example.test.js',
    code: "it('works', () => {\n  expect(1).toBe(1);\n});\n",
    rules: [],
  },

  // storybook
  {
    name: 'requires PascalCase story names',
    presets: ['react'],
    file: 'Counter.stories.tsx',
    code: "import type { Meta } from '@storybook/react-vite';\n\nimport { Counter } from '../Counter';\n\nconst meta: Meta<typeof Counter> = {\n  component: Counter,\n};\n\nexport default meta;\n\nexport const primary = {};\n",
    rules: ['storybook/prefer-pascal-case'],
  },
  {
    name: 'requires a default export in stories',
    presets: ['base', 'storybook'],
    file: 'Counter.stories.tsx',
    code: 'export const Primary = {};\n',
    rules: ['storybook/default-exports'],
  },
];

describe('rules', () => {
  for (const { name, presets, file, code, rules } of cases) {
    it(`${name} (${presets.join(' + ')})`, async () => {
      const result = await lintCode(presets, code, file);

      assert.equal(result.fatalErrorCount, 0, formatMessages(result).join('\n'));
      assert.deepEqual(reportedRules(result), rules, formatMessages(result).join('\n'));
    });
  }
});
