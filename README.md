<h1 id="eslint-plugin-flowtype">eslint-plugin-flowtype</h1>

[![NPM version](http://img.shields.io/npm/v/eslint-plugin-flowtype.svg?style=flat-square)](https://www.npmjs.org/package/eslint-plugin-flowtype)
[![Travis build status](http://img.shields.io/travis/gajus/eslint-plugin-flowtype/master.svg?style=flat-square)](https://travis-ci.org/gajus/eslint-plugin-flowtype)
[![js-canonical-style](https://img.shields.io/badge/code%20style-canonical-blue.svg?style=flat-square)](https://github.com/gajus/canonical)

[Flow type](http://flowtype.org/) linting rules for ESLint.

* [eslint-plugin-flowtype](#eslint-plugin-flowtype)
    * [Installation](#eslint-plugin-flowtype-installation)
    * [Configuration](#eslint-plugin-flowtype-configuration)
    * [Rules](#eslint-plugin-flowtype-rules)
        * [`require-parameter-type`](#eslint-plugin-flowtype-rules-require-parameter-type)
        * [`require-return-type`](#eslint-plugin-flowtype-rules-require-return-type)
        * [`space-after-type-colon`](#eslint-plugin-flowtype-rules-space-after-type-colon)
        * [`space-before-type-colon`](#eslint-plugin-flowtype-rules-space-before-type-colon)
        * [`type-id-match`](#eslint-plugin-flowtype-rules-type-id-match)
        * [Options](#eslint-plugin-flowtype-rules-options)


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
    }
}
```

<h2 id="eslint-plugin-flowtype-rules">Rules</h2>

<h3 id="eslint-plugin-flowtype-rules-require-parameter-type"><code>require-parameter-type</code></h3>

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
```

The following patterns are not considered problems:

```js
(foo: string) => {}

(foo: string = 'FOO') => {}

(...foo: string) => {}

({foo}: {foo: string}) => {}

([foo]: Array) => {}
```


<h3 id="eslint-plugin-flowtype-rules-require-return-type"><code>require-return-type</code></h3>

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

(foo): undefined => { return undefined; }
// Message: Must not annotate undefined return type.

// Options: ["always",{"annotateUndefined":"never"}]
(foo): undefined => { return; }
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
```

The following patterns are not considered problems:

```js
(foo): string => {}

// Options: ["always"]
(foo): string => {}

(foo) => { return; }

(foo) => { return undefined; }

// Options: ["always",{"annotateUndefined":"always"}]
(foo): undefined => { return; }

// Options: ["always",{"annotateUndefined":"never"}]
(foo) => { return; }

// Options: ["always",{"annotateUndefined":"never"}]
(foo) => { return undefined; }

// Options: ["always",{"annotateUndefined":"always"}]
(foo): undefined => { return undefined; }
```


<h3 id="eslint-plugin-flowtype-rules-space-after-type-colon"><code>space-after-type-colon</code></h3>

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
```

The following patterns are not considered problems:

```js
(foo) => {}

(foo: string) => {}

// Options: ["never"]
(foo:string) => {}

// Options: ["always"]
(foo: string) => {}
```


<h3 id="eslint-plugin-flowtype-rules-space-before-type-colon"><code>space-before-type-colon</code></h3>

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


<h3 id="eslint-plugin-flowtype-rules-type-id-match"><code>type-id-match</code></h3>

Enforces a consistent naming pattern for type aliases.

<h3 id="eslint-plugin-flowtype-rules-options">Options</h3>

This rule needs a text RegExp to operate with Its signature is as follows:

```js
{
    "rules": {
        "flowtype/type-id-match": [
            2,
            '^([A-Z][a-z0-9]+)+Type

        ]
    }
}
```

`'^([A-Z][a-z0-9]+)+Type
` is the default pattern.

The following patterns are considered problems:

```js
type foo = {};
// Message: Type identifier 'foo' does not match pattern '/^([A-Z][a-z0-9]+)+Type$/'.

// Options: ["^foo$"]
type FooType = {};
// Message: Type identifier 'FooType' does not match pattern '/^foo$/'.
```

The following patterns are not considered problems:

```js
type FooType = {};

// Options: ["^foo$"]
type foo = {};
```


