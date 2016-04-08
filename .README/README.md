# eslint-plugin-flowtype

[![NPM version](http://img.shields.io/npm/v/eslint-plugin-flowtype.svg?style=flat-square)](https://www.npmjs.org/package/eslint-plugin-flowtype)
[![Travis build status](http://img.shields.io/travis/gajus/eslint-plugin-flowtype/master.svg?style=flat-square)](https://travis-ci.org/gajus/eslint-plugin-flowtype)
[![js-canonical-style](https://img.shields.io/badge/code%20style-canonical-blue.svg?style=flat-square)](https://github.com/gajus/canonical)

[Flow type](http://flowtype.org/) linting rules for ESLint.

{"gitdown": "contents"}

## Installation

1. Install [ESLint](https://www.github.com/eslint/eslint).
1. Install [`babel-eslint`](https://github.com/babel/babel-eslint) parser (ESLint parser [does not support type annotations](https://github.com/eslint/eslint/issues/2157)).
1. Install [`eslint-plugin-flowtype`](https://github.com/gajus/eslint-plugin-flowtype) plugin.

<!-- -->

```sh
npm install eslint
npm install babel-eslint
npm install eslint-plugin-flowtype
```

## Configuration

1. Set `parser` property to `babel-eslint`.
1. Add `plugins` section and specify `eslint-plugin-flowtype` as a plugin.
1. Enable rules.

<!-- -->

```json
{
    "parser": "babel-eslint",
    "plugins": [
        "flowtype"
    ],
    "rules": {
        "flowtype/require-parameter-type": 1,
        "flowtype/require-return-type": [
            1,
            "always",
            {
                "annotateUndefined": "never"
            }
        ],
        "flowtype/space-after-type-colon": [
            1,
            "always"
        ],
        "flowtype/space-before-type-colon": [
            1,
            "never"
        ],
        "flowtype/type-id-match": [
            1,
            "^([A-Z][a-z0-9]+)+Type$"
        ]
    },
    "settings": {
        "flowtype": {
            "onlyFilesWithFlowAnnotation": false
        }
    }
}
```

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

{"gitdown": "include", "file": "./rules/require-parameter-type.md"}
{"gitdown": "include", "file": "./rules/require-return-type.md"}
{"gitdown": "include", "file": "./rules/space-after-type-colon.md"}
{"gitdown": "include", "file": "./rules/space-before-type-colon.md"}
{"gitdown": "include", "file": "./rules/type-id-match.md"}
