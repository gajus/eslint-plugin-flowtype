<h1 id="eslint-plugin-flowtype">eslint-plugin-flowtype</h1>

[![NPM version](http://img.shields.io/npm/v/eslint-plugin-flowtype.svg?style=flat-square)](https://www.npmjs.org/package/eslint-plugin-flowtype)
[![Travis build status](http://img.shields.io/travis/gajus/eslint-plugin-flowtype/master.svg?style=flat-square)](https://travis-ci.org/gajus/eslint-plugin-flowtype)
[![js-canonical-style](https://img.shields.io/badge/code%20style-canonical-blue.svg?style=flat-square)](https://github.com/gajus/canonical)

[Flow type](http://flowtype.org/) linting rules for ESLint.

* [eslint-plugin-flowtype](#eslint-plugin-flowtype)
    * [Installation](#eslint-plugin-flowtype-installation)
    * [Configuration](#eslint-plugin-flowtype-configuration)
    * [Settings](#eslint-plugin-flowtype-settings)
        * [`onlyFilesWithFlowAnnotation`](#eslint-plugin-flowtype-settings-onlyfileswithflowannotation)


<h2 id="eslint-plugin-flowtype-installation">Installation</h2>

1. Install [ESLint](https://www.github.com/eslint/eslint).
1. Install [`babel-eslint`](https://github.com/babel/babel-eslint) parser (ESLint parser [does not support type annotations](https://github.com/eslint/eslint/issues/2157)).
1. Install [`eslint-plugin-flowtype`](https://github.com/gajus/eslint-plugin-flowtype) plugin.

<!-- -->

```sh
npm install eslint
npm install babel-eslint
npm install eslint-plugin-flowtype
```

<h2 id="eslint-plugin-flowtype-configuration">Configuration</h2>

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

<h2 id="eslint-plugin-flowtype-settings">Settings</h2>

<h3 id="eslint-plugin-flowtype-settings-onlyfileswithflowannotation"><code>onlyFilesWithFlowAnnotation</code></h3>

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

### `require-parameter-type`

Requires that all function parameters have type annotations.

The following patterns are considered problems:

```js
(foo) => {}
// Message: Missing "foo" parameter type annotation.

(foo = 'FOO') => {}
// Message: Missing "foo" parameter type annotation.

(...foo) => {}
// Message: Missing "foo" parameter type annotation.

({foo}) => {}
// Message: Missing "{foo}" parameter type annotation.

([foo]) => {}
// Message: Missing "[foo]" parameter type annotation.

({foo = 1} = {}) => {}
// Message: Missing "{foo = 1}" parameter type annotation.

// @flow
(foo) => {}
// Message: Missing "foo" parameter type annotation.
```

The following patterns are not considered problems:

```js
(foo: string) => {}

(foo: string = 'FOO') => {}

(...foo: string) => {}

({foo}: {foo: string}) => {}

([foo]: Array) => {}

(foo) => {}
```


### `require-return-type`

Requires that functions have return type annotation.

The following patterns are considered problems:

```js
(foo) => { return "foo"; }
// Message: Missing return type annotation.

// Options: ["always"]
(foo) => { return "foo"; }
// Message: Missing return type annotation.

(foo): undefined => { return; }
// Message: Must not annotate undefined return type.

(foo): void => { return; }
// Message: Must not annotate undefined return type.

(foo): undefined => { return undefined; }
// Message: Must not annotate undefined return type.

(foo): void => { return void 0; }
// Message: Must not annotate undefined return type.

// Options: ["always",{"annotateUndefined":"never"}]
(foo): undefined => { return; }
// Message: Must not annotate undefined return type.

// Options: ["always",{"annotateUndefined":"never"}]
(foo): void => { return; }
// Message: Must not annotate undefined return type.

// Options: ["always",{"annotateUndefined":"always"}]
(foo) => { return; }
// Message: Must annotate undefined return type.

// Options: ["always",{"annotateUndefined":"never"}]
(foo): undefined => { return undefined; }
// Message: Must not annotate undefined return type.

// Options: ["always",{"annotateUndefined":"always"}]
(foo) => { return undefined; }
// Message: Must annotate undefined return type.

// Options: ["always",{"annotateUndefined":"always"}]
(foo) => { return void 0; }
// Message: Must annotate undefined return type.

// @flow
(foo) => { return 1; }
// Message: Missing return type annotation.

// Options: ["always",{"annotateUndefined":"always"}]
// @flow
 (foo) => { return undefined; }
// Message: Must annotate undefined return type.
```

The following patterns are not considered problems:

```js
(foo): string => {}

// Options: ["always"]
(foo): string => {}

(foo) => { return; }

(foo) => { return undefined; }

(foo) => { return void 0; }

// Options: ["always",{"annotateUndefined":"always"}]
(foo): undefined => { return; }

// Options: ["always",{"annotateUndefined":"always"}]
(foo): void => { return; }

// Options: ["always",{"annotateUndefined":"never"}]
(foo) => { return; }

// Options: ["always",{"annotateUndefined":"never"}]
(foo) => { return undefined; }

// Options: ["always",{"annotateUndefined":"never"}]
(foo) => { return void 0; }

// Options: ["always",{"annotateUndefined":"always"}]
(foo): undefined => { return undefined; }

// Options: ["always",{"annotateUndefined":"always"}]
(foo): void => { return void 0; }

// Options: ["always"]
(foo) => { return 1; }

// Options: ["always",{"annotateUndefined":"always"}]
(foo) => { return undefined; }
```


### `space-after-type-colon`

Enforces consistent spacing after the type annotation colon.

This rule takes one argument. If it is `'always'` then a problem is raised when there is no space after the type annotation colon. If it is `'never'` then a problem is raised when there is a space after the type annotation colon. The default value is `'always'`.

The following patterns are considered problems:

```js
// Options: ["never"]
(foo: string) => {}
// Message: There must be no space after "foo" parameter type annotation colon.

// Options: ["never"]
export default function (foo: string) {}
// Message: There must be no space after "foo" parameter type annotation colon.

// Options: ["never"]
function foo (foo: string) {}
// Message: There must be no space after "foo" parameter type annotation colon.

// Options: ["always"]
(foo:string) => {}
// Message: There must be a space after "foo" parameter type annotation colon.

// Options: ["always"]
(foo:  string) => {}
// Message: There must be 1 space after "foo" parameter type annotation colon.

// Options: ["always"]
():Object => {}
// Message: There must be a space after return type colon.

// Options: ["never"]
(): Object => {}
// Message: There must be no space after return type colon.

// Options: ["always"]
():  Object => {}
// Message: There must be 1 space after return type colon.
```

The following patterns are not considered problems:

```js
(foo) => {}

(foo: string) => {}

// Options: ["never"]
(foo:string) => {}

// Options: ["always"]
(foo: string) => {}

// Options: ["never"]
():Object => {}

// Options: ["always"]
(): Object => {}
```


### `space-before-type-colon`

Enforces consistent spacing before the type annotation colon.

This rule takes one argument. If it is `'always'` then a problem is raised when there is no space before the type annotation colon. If it is `'never'` then a problem is raised when there is a space before the type annotation colon. The default value is `'never'`.

The following patterns are considered problems:

```js
// Options: ["never"]
(foo : string) => {}
// Message: There must be no space before "foo" parameter type annotation colon.

// Options: ["always"]
(foo: string) => {}
// Message: There must be a space before "foo" parameter type annotation colon.

// Options: ["always"]
(foo  : string) => {}
// Message: There must be 1 space before "foo" parameter type annotation colon.
```

The following patterns are not considered problems:

```js
(foo) => {}

(foo: string) => {}

// Options: ["never"]
(foo: string) => {}

// Options: ["always"]
(foo : string) => {}
```


### `type-id-match`

Enforces a consistent naming pattern for type aliases.

#### Options

This rule needs a text RegExp to operate with Its signature is as follows:

```js
{
    "rules": {
        "flowtype/type-id-match": [
            2,
            "^([A-Z][a-z0-9]+)+Type$"
        ]
    }
}
```

`'^([A-Z][a-z0-9]+)+Type
` is the default pattern.

The following patterns are considered problems:

```js
type foo = {};
// Message: Type identifier 'foo' does not match pattern '/^Type([A-Z][a-z0-9]+)+$/'.

// Options: ["^foo$"]
type TypeFoo = {};
// Message: Type identifier 'TypeFoo' does not match pattern '/^foo$/'.
```

The following patterns are not considered problems:

```js
type TypeFoo = {};

// Options: ["^foo$"]
type foo = {};
```


