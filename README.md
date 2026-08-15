# @yutengjing/prettier-config

[![version](https://img.shields.io/npm/v/@yutengjing/prettier-config)](https://www.npmjs.com/package/@yutengjing/prettier-config) [![downloads](https://img.shields.io/npm/dm/@yutengjing/prettier-config)](https://www.npmjs.com/package/@yutengjing/prettier-config) [![test](https://github.com/tjx666/prettier-config/actions/workflows/test.yml/badge.svg)](https://github.com/tjx666/prettier-config/actions/workflows/test.yml)

My personal Prettier config.

## Installation

Install the config together with its Prettier peer dependency:

```shell
# npm
npm add -D prettier @yutengjing/prettier-config

# pnpm
pnpm add -D prettier @yutengjing/prettier-config

# yarn
yarn add -D prettier @yutengjing/prettier-config

# bun
bun add -d prettier @yutengjing/prettier-config
```

## Usage

Re-export the default config from an ESM `prettier.config.mjs` file:

```javascript
import prettierConfig from '@yutengjing/prettier-config';

export default prettierConfig;
```

Use `createPrettierConfig` to add project-specific options. Consumer plugins and overrides are
appended to the shared ones, and each call returns independent `plugins` and `overrides` arrays.

```javascript
import { createPrettierConfig } from '@yutengjing/prettier-config';

export default createPrettierConfig({
  overrides: [
    {
      files: '*.json',
      options: { tabWidth: 2 },
    },
  ],
  semi: false,
});
```

## Tailwind CSS v4

Tailwind class sorting is an optional integration. Install the plugin in each project that needs
it:

```shell
pnpm add -D prettier-plugin-tailwindcss
```

The supported `prettier-plugin-tailwindcss` 0.8 line requires Node.js 20.19 or newer. This config's
peer range requires Prettier 3.9.6 or newer within the Prettier 3 release line.

Then pass the project-specific options through `createPrettierConfig`:

```javascript
// prettier.config.mjs
import { createPrettierConfig } from '@yutengjing/prettier-config';

export default createPrettierConfig({
  tailwindFunctions: ['cn', 'cva'],
  tailwindStylesheet: './src/styles/app.css',
});
```

[`tailwindStylesheet`](https://github.com/tailwindlabs/prettier-plugin-tailwindcss#specifying-your-tailwind-stylesheet-path-tailwind-css-v4)
is resolved relative to `prettier.config.mjs`, so keep the path relative to that file. When
`prettier-plugin-tailwindcss` is installed, the config automatically loads it after all shared and
consumer plugins because [the Tailwind plugin must be
last](https://github.com/tailwindlabs/prettier-plugin-tailwindcss#compatibility-with-other-prettier-plugins).
Do not add it to `plugins` manually.

Without the optional plugin installed, the base config remains usable and the Tailwind integration
is not enabled.

## Related

- [@yutengjing/eslint-config](https://github.com/tjx666/eslint-config/tree/main)
