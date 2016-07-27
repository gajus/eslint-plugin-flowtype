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
    * [Rules](#eslint-plugin-flowtype-rules)
        * [`define-flow-type`](#eslint-plugin-flowtype-rules-define-flow-type)
        * [`require-parameter-type`](#eslint-plugin-flowtype-rules-require-parameter-type)
        * [`require-return-type`](#eslint-plugin-flowtype-rules-require-return-type)
        * [`require-valid-file-annotation`](#eslint-plugin-flowtype-rules-require-valid-file-annotation)
        * [`space-after-type-colon`](#eslint-plugin-flowtype-rules-space-after-type-colon)
        * [`space-before-type-colon`](#eslint-plugin-flowtype-rules-space-before-type-colon)
        * [`type-id-match`](#eslint-plugin-flowtype-rules-type-id-match)
        * [`use-flow-type`](#eslint-plugin-flowtype-rules-use-flow-type)


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
        "flowtype/define-flow-type": 1,
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
        ],
        "flowtype/use-flow-type": 1
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

<h2 id="eslint-plugin-flowtype-rules">Rules</h2>

<h3 id="eslint-plugin-flowtype-rules-define-flow-type"><code>define-flow-type</code></h3>

Marks Flow type identifiers as defined.

Used to suppress [`no-undef`](http://eslint.org/docs/rules/no-undef) reporting of type identifiers.

The following patterns are not considered problems:

```js
var a: AType
// Additional rules: {"no-undef":2}

var a: AType; var b: AType
// Additional rules: {"no-undef":2}

var a; (a: AType)
// Additional rules: {"no-undef":2}

var a: AType<BType>
// Additional rules: {"no-undef":2}

type A = AType
// Additional rules: {"no-undef":2}

function f(a: AType) {}
// Additional rules: {"no-undef":2}

function f(a: AType.a) {}
// Additional rules: {"no-undef":2}

function f(a: AType.a.b) {}
// Additional rules: {"no-undef":2}

function f(a): AType {}; var a: AType
// Additional rules: {"no-undef":2}

function f(a): AType {}
// Additional rules: {"no-undef":2}

class C { a: AType }
// Additional rules: {"no-undef":2}

class C { a: AType.a }
// Additional rules: {"no-undef":2}

class C { a: AType.a.b }
// Additional rules: {"no-undef":2}

class C implements AType {}
// Additional rules: {"no-undef":2}

interface AType {}
// Additional rules: {"no-undef":2}

({ a: ({b() {}}: AType) })
// Additional rules: {"no-undef":2}

type X = {Y<AType>(): BType}
// Additional rules: {"no-undef":2}

interface AType<BType> {}
// Additional rules: {"no-undef":2}

var a: AType
// Additional rules: {"no-undef":2,"no-use-before-define":[2,"nofunc"]}

var a: AType; var b: AType
// Additional rules: {"no-undef":2,"no-use-before-define":[2,"nofunc"]}

var a; (a: AType)
// Additional rules: {"no-undef":2,"no-use-before-define":[2,"nofunc"]}

var a: AType<BType>
// Additional rules: {"no-undef":2,"no-use-before-define":[2,"nofunc"]}

type A = AType
// Additional rules: {"no-undef":2,"no-use-before-define":[2,"nofunc"]}

function f(a: AType) {}
// Additional rules: {"no-undef":2,"no-use-before-define":[2,"nofunc"]}

function f(a: AType.a) {}
// Additional rules: {"no-undef":2,"no-use-before-define":[2,"nofunc"]}

function f(a: AType.a.b) {}
// Additional rules: {"no-undef":2,"no-use-before-define":[2,"nofunc"]}

function f(a): AType {}; var a: AType
// Additional rules: {"no-undef":2,"no-use-before-define":[2,"nofunc"]}

function f(a): AType {}
// Additional rules: {"no-undef":2,"no-use-before-define":[2,"nofunc"]}

class C { a: AType }
// Additional rules: {"no-undef":2,"no-use-before-define":[2,"nofunc"]}

class C { a: AType.a }
// Additional rules: {"no-undef":2,"no-use-before-define":[2,"nofunc"]}

class C { a: AType.a.b }
// Additional rules: {"no-undef":2,"no-use-before-define":[2,"nofunc"]}

class C implements AType {}
// Additional rules: {"no-undef":2,"no-use-before-define":[2,"nofunc"]}

interface AType {}
// Additional rules: {"no-undef":2,"no-use-before-define":[2,"nofunc"]}

({ a: ({b() {}}: AType) })
// Additional rules: {"no-undef":2,"no-use-before-define":[2,"nofunc"]}

type X = {Y<AType>(): BType}
// Additional rules: {"no-undef":2,"no-use-before-define":[2,"nofunc"]}

interface AType<BType> {}
// Additional rules: {"no-undef":2,"no-use-before-define":[2,"nofunc"]}
```



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



<h3 id="eslint-plugin-flowtype-rules-require-return-type"><code>require-return-type</code></h3>

Requires that functions have return type annotation.

The following patterns are considered problems:

```js
(foo) => { return "foo"; }
// Message: Missing return type annotation.

// Options: ["always"]
(foo) => { return "foo"; }
// Message: Missing return type annotation.

// Options: ["always"]
(foo) => "foo"
// Message: Missing return type annotation.

(foo) => ({})
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

(foo): Object => ( {} )

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



<h3 id="eslint-plugin-flowtype-rules-require-valid-file-annotation"><code>require-valid-file-annotation</code></h3>

Makes sure that files have a valid `@flow` annotation. It will report annotations with typos (such as `// @floww`) or not placed at the top of the file, and optionaly missing annotations.

<h4 id="eslint-plugin-flowtype-rules-require-valid-file-annotation-options">Options</h4>

By default, this rule won't complain if there is no `@flow` annotation at all in the file. Passing a `"always"` option reports files missing those annotations as well.

```js
{
    "rules": {
        "flowtype/require-valid-file-annotation": [
            2,
            "always"
        ]
    }
}
```

The following patterns are considered problems:

```js
;// @flow
// Message: Flow file annotation not at the top of the file.

;
// @flow
// Message: Flow file annotation not at the top of the file.

// @Flow
// Message: Malformed flow file annotation.

// @floweeeeeee
// Message: Malformed flow file annotation.

// Options: ["always"]
a;
// Message: Flow file annotation is missing.
```

The following patterns are not considered problems:

```js
a;

// @flow
a;

//@flow
a;

//**@flow
a;

/* foo @flow bar */
a;



// @flow
a;

// @flow
// @FLow

// Options: ["always"]
a;
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

// Options: ["always"]
(foo:(() => void)) => {}
// Message: There must be a space after "foo" parameter type annotation colon.

// Options: ["never"]
(foo: (() => void)) => {}
// Message: There must be no space after "foo" parameter type annotation colon.

// Options: ["always"]
(foo:  (() => void)) => {}
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

// Options: ["always"]
():(() => void) => {}
// Message: There must be a space after return type colon.

// Options: ["never"]
(): (() => void) => {}
// Message: There must be no space after return type colon.

// Options: ["always"]
():  (() => void) => {}
// Message: There must be 1 space after return type colon.
```

The following patterns are not considered problems:

```js
(foo) => {}

(foo: string) => {}

(foo: (string|number)) => {}

// Options: ["never"]
(foo:string) => {}

// Options: ["always"]
(foo: string) => {}

// Options: ["never"]
(foo:(() => void)) => {}

// Options: ["always"]
(foo: (() => void)) => {}

// Options: ["never"]
():Object => {}

// Options: ["always"]
(): Object => {}

// Options: ["never"]
():(number | string) => {}

// Options: ["always"]
(): (number | string) => {}

// Options: ["never"]
():number|string => {}

// Options: ["always"]
(): number|string => {}

// Options: ["never"]
():(() => void) => {}

// Options: ["always"]
(): (() => void) => {}

// Options: ["never"]
():( () => void ) => {}

// Options: ["always"]
(): ( () => void ) => {}
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

<h4 id="eslint-plugin-flowtype-rules-type-id-match-options">Options</h4>

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

`'^([A-Z][a-z0-9]+)+Type$'` is the default pattern.

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



<h3 id="eslint-plugin-flowtype-rules-use-flow-type"><code>use-flow-type</code></h3>

Marks Flow [type alias](https://flowtype.org/docs/type-aliases.html) declarations as used.

Used to suppress [`no-unused-vars`](http://eslint.org/docs/rules/no-unused-vars) errors that are triggered by type aliases.

The following patterns are not considered problems:

```js
declare class A {}
// Additional rules: {"no-unused-vars":1}

declare function A(): Y
// Additional rules: {"no-unused-vars":1}

declare module A {}
// Additional rules: {"no-unused-vars":1}

declare module A { declare var a: Y }
// Additional rules: {"no-unused-vars":1}

declare var A: Y
// Additional rules: {"no-unused-vars":1}

import type A from "a"; (function<T: A>(): T {})
// Additional rules: {"no-unused-vars":1}

(function<T: A>(): T {}); import type A from "a"
// Additional rules: {"no-unused-vars":1}

import type {A} from "a"; (function<T: A>(): T {})
// Additional rules: {"no-unused-vars":1}

(function<T: A>(): T {}); import type {A} from "a"
// Additional rules: {"no-unused-vars":1}

(function<T: A>(): T {}); import type {a as A} from "a"
// Additional rules: {"no-unused-vars":1}

type A = {}; function x<Y: A>(i: Y) { i }; x()
// Additional rules: {"no-unused-vars":1}

function x<Y: A>(i: Y) { i }; type A = {}; x()
// Additional rules: {"no-unused-vars":1}

type A = {}; function x<Y: A.B.C>(i: Y) { i }; x()
// Additional rules: {"no-unused-vars":1}

function x<Y: A.B.C>(i: Y) { i }; type A = {}; x()
// Additional rules: {"no-unused-vars":1}
```



