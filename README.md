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
    * [`eslint-plugin-flowtype` v1](#eslint-plugin-flowtype-eslint-plugin-flowtype-v1)


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
        "flowtype/require-return-type": 1,
        "flowtype/space-after-type-colon": 1,
        "flowtype/space-before-type-colon": 1
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
```

The following patterns are not considered problems:

```js
(foo: string) => {}

(foo: string = 'FOO') => {}

(...foo: string) => {}

({foo}: {foo: string}) => {}
```


<h3 id="eslint-plugin-flowtype-rules-require-return-type"><code>require-return-type</code></h3>

Requires that functions have return type annotation.

The following patterns are considered problems:

```js
(foo) => {}
// Message: Missing return type annotation.
```

The following patterns are not considered problems:

```js
(foo): string => {}
```


<h3 id="eslint-plugin-flowtype-rules-space-after-type-colon"><code>space-after-type-colon</code></h3>

Enforces consistent spacing after the type annotation colon.

This rule takes one argument. If it is `'always'` then a problem is raised when there is no space after the type annotation colon. If it is `'never'` then a problem is raised when there is a space after the type annotation colon. The default value is `'always'`.

The following patterns are considered problems:

```js
// Options: ["never"]
(foo: string) => {}
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



<h2 id="eslint-plugin-flowtype-eslint-plugin-flowtype-v1"><code>eslint-plugin-flowtype</code> v1</h2>

`eslint-plugin-flowtype` v1 served a different purpose:

> A plugin for ESLint that strips FlowType type annonations before linting the files.

You can find the source code for v1 at:

https://github.com/gcazaciuc/eslint-plugin-flowtype

Reference to the original codebase included for historical reference purposes.
