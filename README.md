# @yutengjing/prettier-config

[![version](https://img.shields.io/npm/v/@yutengjing/prettier-config)](https://www.npmjs.com/package/@yutengjing/prettier-config) [![downloads](https://img.shields.io/npm/dm/@yutengjing/prettier-config)](https://www.npmjs.com/package/@yutengjing/prettier-config) [![test](https://github.com/tjx666/prettier-config/actions/workflows/test.yml/badge.svg)](https://github.com/tjx666/prettier-config/actions/workflows/test.yml)

my personal prettier config

## Usage

### Install

```shell
# npm
npm add -D @yutengjing/prettier-config

# pnpm
pnpm add -D @yutengjing/prettier-config

# yarn
yarn add -D @yutengjing/prettier-config

# bun
bun add -d @yutengjing/prettier-config
```

### Config .prettierrc.js

just re-export this package.

```javascript
module.exports = require('@yutengjing/prettier-config');
```

Or, you can add your custom options:

```javascript
module.exports = {
  ...require('@yutengjing/prettier-config'),
  semi: false,
};
```

## Related

- [@yutengjing/eslint-config](https://github.com/tjx666/eslint-config/tree/main)
