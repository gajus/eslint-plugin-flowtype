# eslint-plugin-flowtype

[![NPM version](http://img.shields.io/npm/v/eslint-plugin-flowtype.svg?style=flat-square)](https://www.npmjs.org/package/eslint-plugin-flowtype)
[![Travis build status](http://img.shields.io/travis/gajus/eslint-plugin-flowtype/master.svg?style=flat-square)](https://travis-ci.com/github/gajus/eslint-plugin-flowtype)
[![js-canonical-style](https://img.shields.io/badge/code%20style-canonical-blue.svg?style=flat-square)](https://github.com/gajus/canonical)

[Flow type](http://flowtype.org/) linting rules for ESLint.

{"gitdown": "contents"}

## Installation

```bash
npm install eslint --save-dev
npm install @babel/eslint-parser --save-dev
npm install eslint-plugin-flowtype --save-dev
```

## Configuration

1. Set `parser` property to `@babel/eslint-parser`.
1. Add `plugins` section and specify `eslint-plugin-flowtype` as a plugin.
1. Enable rules.

<!-- -->

```json
{
  "parser": "@babel/eslint-parser",
  "plugins": [
    "flowtype"
  ],
  "rules": {
    "flowtype/boolean-style": [
      2,
      "boolean"
    ],
    "flowtype/define-flow-type": 1,
    "flowtype/delimiter-dangle": [
      2,
      "never"
    ],
    "flowtype/generic-spacing": [
      2,
      "never"
    ],
    "flowtype/interface-id-match": [
      2,
      "^([A-Z][a-z0-9]+)+Type$"
    ],
    "flowtype/no-mixed": 2,
    "flowtype/no-primitive-constructor-types": 2,
    "flowtype/no-types-missing-file-annotation": 2,
    "flowtype/no-weak-types": 2,
    "flowtype/object-type-delimiter": [
      2,
      "comma"
    ],
    "flowtype/require-parameter-type": 2,
    "flowtype/require-readonly-react-props": 0,
    "flowtype/require-return-type": [
      2,
      "always",
      {
        "annotateUndefined": "never"
      }
    ],
    "flowtype/require-valid-file-annotation": 2,
    "flowtype/semi": [
      2,
      "always"
    ],
    "flowtype/space-after-type-colon": [
      2,
      "always"
    ],
    "flowtype/space-before-generic-bracket": [
      2,
      "never"
    ],
    "flowtype/space-before-type-colon": [
      2,
      "never"
    ],
    "flowtype/type-id-match": [
      2,
      "^([A-Z][a-z0-9]+)+Type$"
    ],
    "flowtype/union-intersection-spacing": [
      2,
      "always"
    ],
    "flowtype/use-flow-type": 1,
    "flowtype/valid-syntax": 1
  },
  "settings": {
    "flowtype": {
      "onlyFilesWithFlowAnnotation": false
    }
  }
}
```

### Shareable configurations

#### Recommended

This plugin exports a [recommended configuration](./src/configs/recommended.json) that enforces Flow type good practices.

To enable this configuration use the extends property in your `.eslintrc` config file:

```json
{
  "extends": [
    "plugin:flowtype/recommended"
  ],
  "plugins": [
    "flowtype"
  ]
}
```

See [ESLint documentation](http://eslint.org/docs/user-guide/configuring#extending-configuration-files) for more information about extending configuration files.

### Community maintained configurations

The following are third-party submitted/ maintained configurations of `eslint-plugin-flowtype`:

* https://github.com/wemake-services/eslint-config-flowtype-essential

## Settings

### `onlyFilesWithFlowAnnotation`

When `true`, only checks files with a [`@flow` annotation](http://flowtype.org/docs/about-flow.html#gradual) in the first comment.

```js
{
  "settings": {
    "flowtype": {
      "onlyFilesWithFlowAnnotation": true
    }
  }
}
```

## Rules

<!-- Rules are sorted alphabetically. -->

{"gitdown": "include", "file": "./rules/array-style-complex-type.md"}
{"gitdown": "include", "file": "./rules/array-style-simple-type.md"}
{"gitdown": "include", "file": "./rules/arrow-parens.md"}
{"gitdown": "include", "file": "./rules/boolean-style.md"}
{"gitdown": "include", "file": "./rules/define-flow-type.md"}
{"gitdown": "include", "file": "./rules/delimiter-dangle.md"}
{"gitdown": "include", "file": "./rules/enforce-line-break.md"}
{"gitdown": "include", "file": "./rules/generic-spacing.md"}
{"gitdown": "include", "file": "./rules/interface-id-match.md"}
{"gitdown": "include", "file": "./rules/newline-after-flow-annotation.md"}
{"gitdown": "include", "file": "./rules/no-dupe-keys.md"}
{"gitdown": "include", "file": "./rules/no-duplicate-type-union-intersection-members.md"}
{"gitdown": "include", "file": "./rules/no-existential-type.md"}
{"gitdown": "include", "file": "./rules/no-flow-fix-me-comments.md"}
{"gitdown": "include", "file": "./rules/no-flow-fix-in-strict-files.md"}
{"gitdown": "include", "file": "./rules/no-internal-flow-type.md"}
{"gitdown": "include", "file": "./rules/no-mixed.md"}
{"gitdown": "include", "file": "./rules/no-mutable-array.md"}
{"gitdown": "include", "file": "./rules/no-primitive-constructor-types.md"}
{"gitdown": "include", "file": "./rules/no-types-missing-file-annotation.md"}
{"gitdown": "include", "file": "./rules/no-unused-expressions.md"}
{"gitdown": "include", "file": "./rules/no-weak-types.md"}
{"gitdown": "include", "file": "./rules/object-type-curly-spacing.md"}
{"gitdown": "include", "file": "./rules/object-type-delimiter.md"}
{"gitdown": "include", "file": "./rules/quotes.md"}
{"gitdown": "include", "file": "./rules/require-compound-type-alias.md"}
{"gitdown": "include", "file": "./rules/require-exact-type.md"}
{"gitdown": "include", "file": "./rules/require-indexer-name.md"}
{"gitdown": "include", "file": "./rules/require-inexact-type.md"}
{"gitdown": "include", "file": "./rules/require-parameter-type.md"}
{"gitdown": "include", "file": "./rules/require-readonly-react-props.md"}
{"gitdown": "include", "file": "./rules/require-return-type.md"}
{"gitdown": "include", "file": "./rules/require-types-at-top.md"}
{"gitdown": "include", "file": "./rules/require-valid-file-annotation.md"}
{"gitdown": "include", "file": "./rules/require-variable-type.md"}
{"gitdown": "include", "file": "./rules/semi.md"}
{"gitdown": "include", "file": "./rules/sort-keys.md"}
{"gitdown": "include", "file": "./rules/sort-type-union-intersection-members.md"}
{"gitdown": "include", "file": "./rules/space-after-type-colon.md"}
{"gitdown": "include", "file": "./rules/space-before-generic-bracket.md"}
{"gitdown": "include", "file": "./rules/space-before-type-colon.md"}
{"gitdown": "include", "file": "./rules/spread-exact-type.md"}
{"gitdown": "include", "file": "./rules/type-id-match.md"}
{"gitdown": "include", "file": "./rules/type-import-style.md"}
{"gitdown": "include", "file": "./rules/union-intersection-spacing.md"}
{"gitdown": "include", "file": "./rules/use-flow-type.md"}
{"gitdown": "include", "file": "./rules/use-read-only-spread.md"}
{"gitdown": "include", "file": "./rules/valid-syntax.md"}
