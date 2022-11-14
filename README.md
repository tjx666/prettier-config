# @yutengjing/prettier-config

my personal prettier config

## Usage

### Install

```sh
npm install -D @yutengjing/prettier-config

# pnpm
pnpm add -D @yutengjing/prettier-config
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

### VSCode Prettier extension

If you are using [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode):

First, we install this package in global:

```sh
npm install -g @yutengjing/prettier-config
```

Then modify `~/.prettierrc.js` to using this package.

Recommend vscode prettier settings:

```json
{
  "[javascript][javascriptreact][typescript][typescriptreact][vue][json][jsonc]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[html][css][less][scss][markdown][xml][yaml][svg]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "prettier.documentSelectors": ["**/*.svg"]
}
```
