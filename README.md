# eslint-config

> Shareable ESLint config for TypeScript, React, Next.js and Node.js, with Jest, Vitest and Storybook presets and Prettier formatting.

Comprehensive ESLint configuration with built-in support for TypeScript, React, Next.js, Storybook, and Node.js. Includes optional presets for Jest and Vitest, automatic code formatting with Prettier, and best practices for modern JavaScript/TypeScript development.

> **Migrating from `@atolye15/eslint-config`?** This package is its continuation under a new name. Replace the package in your `package.json` and update the imports in your ESLint config to `@hsnaydd/eslint-config`. The rules are unchanged and the version numbers continue from where they left off.

## Available Presets

- **`base`**: Core ESLint rules with TypeScript support, import management, and Prettier integration
- **`react`**: React, JSX a11y, React Hooks, Testing Library, and Storybook configurations
- **`next`**: Next.js-specific rules (extends `react` preset with Core Web Vitals)
- **`jest`**: Jest-specific rules for test files
- **`vitest`**: Vitest-specific rules for test files (alternative to Jest preset)
- **`node`**: Node.js-specific rules and best practices
- **`storybook`**: Storybook-specific rules for story files

## Installation

```console
pnpm add -D @hsnaydd/eslint-config eslint prettier typescript

# Or with npm:

npm install @hsnaydd/eslint-config eslint prettier typescript --save-dev

# Or with yarn:

yarn add @hsnaydd/eslint-config eslint prettier typescript --dev
```

_`@hsnaydd/eslint-config` does not install ESLint, Prettier or TypeScript for you. You must install these yourself._

This package requires the following peer dependencies to be installed in your project:

- ESLint `^10.0.0`
- TypeScript `^6.0.0` (`typescript-eslint` does not support TypeScript 7 yet)
- Prettier `^3.8.1`
- Jest `^30.2.0` (optional, only needed if using the Jest preset)
- Storybook `^10.2.9` (optional, only needed if using the Storybook preset)

The Vitest preset needs `vitest` to be installed in your project.

## Usage

Create an `eslint.config.mjs` file in your project root and extend this configuration:

```javascript
import config from '@hsnaydd/eslint-config';

// Use a single preset
export default [...config.react];

// For Next.js projects
export default [...config.next];

// Add a testing preset (Jest or Vitest)
export default [
  ...config.react,
  ...config.jest,
];

// Or with Vitest
export default [
  ...config.react,
  ...config.vitest,
];

// Combine multiple presets
export default [
  ...config.base,
  ...config.jest,
  // Add your custom rules...
];
```

### TypeScript

Some rules for `.ts` and `.tsx` files need type information, so tell the TypeScript parser where to find your `tsconfig.json`:

```javascript
import config from '@hsnaydd/eslint-config';

export default [
  ...config.react,
  {
    files: ['**/*.ts?(x)'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
];
```

Without this, ESLint stops with a "You have used a rule which requires type information" error on TypeScript files. JavaScript-only projects can skip this step, but they still need `typescript` installed, because the config parses all files with the TypeScript parser.

### Globals

Global variables are defined for JavaScript files depending on the preset: `base` only defines the globals that browsers and Node.js share (such as `console`, `setTimeout` and `URL`), `react` and `next` add the browser globals, `node` adds the Node.js globals, and `jest` and `vitest` add the test globals. If your code runs somewhere else, add its globals with `languageOptions.globals`. TypeScript files are not affected, because TypeScript checks undefined variables itself.

## Customizing Rules

You can override or extend the default configuration by adding your own rules:

```javascript
import config from '@hsnaydd/eslint-config';

export default [
  ...config.react,
  {
    files: ['**/*.tsx'],
    rules: {
      // other configs...
    },
  },
];
```

## [Changelog](https://github.com/hsnaydd/eslint-config/releases)

## [License](LICENSE)
