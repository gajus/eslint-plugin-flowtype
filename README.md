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
        * [`space-before-generic-bracket`](#eslint-plugin-flowtype-rules-space-before-generic-bracket)
        * [`union-intersection-spacing`](#eslint-plugin-flowtype-rules-union-intersection-spacing)
        * [`generic-spacing`](#eslint-plugin-flowtype-rules-generic-spacing)
        * [`type-id-match`](#eslint-plugin-flowtype-rules-type-id-match)
        * [`use-flow-type`](#eslint-plugin-flowtype-rules-use-flow-type)
        * [`valid-syntax`](#eslint-plugin-flowtype-rules-valid-syntax)


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

<h4 id="eslint-plugin-flowtype-rules-require-parameter-type-options">Options</h4>

You can skip all arrow functions by providing the `excludeArrowFunctions` option with `true`.

Alternatively, you can want to exclude only concise arrow functions (e.g. `x => x * 2`). Provide `excludeArrowFunctions` with `expressionsOnly` for this.

```js
{
    "rules": {
        "flowtype/require-parameter-type": [
            2,
            {
              "excludeArrowFunctions": true
            }
        ]
    }
}

{
    "rules": {
        "flowtype/require-parameter-type": [
            2,
            {
              "excludeArrowFunctions": "expressionsOnly"
            }
        ]
    }
}
```

The following patterns are considered problems:

```js
(foo) => {}
// Message: Missing "foo" parameter type annotation.

function x(foo) {}
// Message: Missing "foo" parameter type annotation.

// Options: [{"excludeArrowFunctions":true}]
function x(foo) {}
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

// Options: [{"excludeArrowFunctions":"expressionsOnly"}]
(foo) => {}
// Message: Missing "foo" parameter type annotation.

// Options: [{"excludeArrowFunctions":"expressionsOnly"}]
function x(foo) {}
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

// Options: [{"excludeArrowFunctions":true}]
(foo) => {}

// Options: [{"excludeArrowFunctions":"expressionsOnly"}]
(foo) => 3
```



<h3 id="eslint-plugin-flowtype-rules-require-return-type"><code>require-return-type</code></h3>

Requires that functions have return type annotation.

<h4 id="eslint-plugin-flowtype-rules-require-return-type-options">Options</h4>

You can skip all arrow functions by providing the `excludeArrowFunctions` option with `true`.

Alternatively, you can want to exclude only concise arrow function (e.g. `() => 2`). Provide `excludeArrowFunctions` with `expressionsOnly` for this.

```js
{
    "rules": {
        "flowtype/require-return-type": [
            2,
            "always",
            {
              "excludeArrowFunctions": true
            }
        ]
    }
}

{
    "rules": {
        "flowtype/require-return-type": [
            2,
            "always",
            {
              "excludeArrowFunctions": "expressionsOnly"
            }
        ]
    }
}
```

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

// Options: ["always"]
async () => { return 2; }
// Message: Missing return type annotation.

// Options: ["always",{"annotateUndefined":"always"}]
async () => {}
// Message: Missing return type annotation.

// Options: ["always",{"annotateUndefined":"always"}]
async function x() {}
// Message: Missing return type annotation.

// Options: ["always"]
async () => { return; }
// Message: Missing return type annotation.

// Options: ["always"]
function* x() {}
// Message: Missing return type annotation.

// Options: ["always",{"excludeArrowFunctions":"expressionsOnly"}]
() => { return 3; }
// Message: Missing return type annotation.

// Options: ["always",{"excludeArrowFunctions":"expressionsOnly"}]
async () => { return 4; }
// Message: Missing return type annotation.
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

// Options: ["always",{"annotateUndefined":"always"}]
async function doThing(): Promise<void> {}

// Options: ["always",{"annotateUndefined":"always"}]
function* doThing(): Generator<number, void, void> { yield 2; }

async (foo): Promise<number> => { return 3; }

// Options: ["always",{"excludeArrowFunctions":true}]
() => 3

// Options: ["always",{"excludeArrowFunctions":true}]
() => { return 4; }

// Options: ["always",{"excludeArrowFunctions":true}]
() => undefined

// Options: ["always",{"annotateUndefined":"always","excludeArrowFunctions":true}]
() => undefined

// Options: ["always",{"annotateUndefined":"always","excludeArrowFunctions":true}]
() => { return undefined; }

// Options: ["always",{"excludeArrowFunctions":"expressionsOnly"}]
() => 3

// Options: ["always",{"excludeArrowFunctions":"expressionsOnly"}]
async () => 3
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

// @NoFlow
// Message: Malformed flow file annotation.

// @nofloweeeeeee
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

// @noflow
a;

// Options: ["always"]
a;
```



<h3 id="eslint-plugin-flowtype-rules-space-after-type-colon"><code>space-after-type-colon</code></h3>

_The `--fix` option on the command line automatically fixes problems reported by this rule._

Enforces consistent spacing after the type annotation colon.

This rule takes one argument. If it is `'always'` then a problem is raised when there is no space after the type annotation colon. If it is `'never'` then a problem is raised when there is a space after the type annotation colon. The default value is `'always'`.

The following patterns are considered problems:

```js
// Options: ["never"]
(foo: string) => {}
// Message: There must be no space after "foo" parameter type annotation colon.

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

({ lorem, ipsum, dolor } :   SomeType) => {}
// Message: There must be 1 space after "{ lorem, ipsum, dolor }" parameter type annotation colon.

(foo:{ a: string, b: number }) => {}
// Message: There must be a space after "foo" parameter type annotation colon.

({ a, b } :{ a: string, b: number }) => {}
// Message: There must be a space after "{ a, b }" parameter type annotation colon.

([ a, b ] :string[]) => {}
// Message: There must be a space after "[ a, b ]" parameter type annotation colon.

(i?:number) => {}
// Message: There must be a space after "i" parameter type annotation colon.

(i?:  number) => {}
// Message: There must be 1 space after "i" parameter type annotation colon.

// Options: ["never"]
(i?: number) => {}
// Message: There must be no space after "i" parameter type annotation colon.

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

// Options: ["never"]
export default function (foo: string) {}
// Message: There must be no space after "foo" parameter type annotation colon.

// Options: ["never"]
function foo (foo: string) {}
// Message: There must be no space after "foo" parameter type annotation colon.

// Options: ["always"]
(foo:string) => {}
// Message: There must be a space after "foo" parameter type annotation colon.

function foo (foo:string) {}
// Message: There must be a space after "foo" parameter type annotation colon.

async function foo({ lorem, ipsum, dolor }:SomeType) {}
// Message: There must be a space after "{ lorem, ipsum, dolor }" parameter type annotation colon.

function x(i?:number) {}
// Message: There must be a space after "i" parameter type annotation colon.

function x(i?:  number) {}
// Message: There must be 1 space after "i" parameter type annotation colon.

// Options: ["never"]
function x(i?: number) {}
// Message: There must be no space after "i" parameter type annotation colon.

type X = (foo:number) => string
// Message: There must be a space after "foo" parameter type annotation colon.

// Options: ["never"]
type X = (foo: number) => string
// Message: There must be no space after "foo" parameter type annotation colon.

type X = (foo:  number) => string
// Message: There must be 1 space after "foo" parameter type annotation colon.

type X = (foo:?number) => string
// Message: There must be a space after "foo" parameter type annotation colon.

type X = (foo:(number)) => string
// Message: There must be a space after "foo" parameter type annotation colon.

type X = (foo:((number))) => string
// Message: There must be a space after "foo" parameter type annotation colon.

type X = (foo:  ((number))) => string
// Message: There must be 1 space after "foo" parameter type annotation colon.

// Options: ["never"]
type X = (foo: ((number))) => string
// Message: There must be no space after "foo" parameter type annotation colon.

type X = (foo:?(number)) => string
// Message: There must be a space after "foo" parameter type annotation colon.

type TArrayPredicate = (el: T, i?:number) => boolean
// Message: There must be a space after "i" parameter type annotation colon.

type TArrayPredicate = (el: T, i?:  number) => boolean
// Message: There must be 1 space after "i" parameter type annotation colon.

// Options: ["never"]
type TArrayPredicate = (el:T, i?: number) => boolean
// Message: There must be no space after "i" parameter type annotation colon.

class X { foo:string }
// Message: There must be a space after "foo" class property type annotation colon.

// Options: ["never"]
class X { foo: string }
// Message: There must be no space after "foo" class property type annotation colon.

class X { foo:?string }
// Message: There must be a space after "foo" class property type annotation colon.

// Options: ["never"]
class X { foo: ?string }
// Message: There must be no space after "foo" class property type annotation colon.

class X { static foo:number }
// Message: There must be a space after "foo" class property type annotation colon.

// Options: ["never"]
class X { static foo: number }
// Message: There must be no space after "foo" class property type annotation colon.

class X { static foo :number }
// Message: There must be a space after "foo" class property type annotation colon.

// Options: ["never"]
class X { static foo : number }
// Message: There must be no space after "foo" class property type annotation colon.

declare class X { static foo:number }
// Message: There must be a space after "foo" type annotation colon.

// Options: ["never"]
declare class X { static foo: number }
// Message: There must be no space after "foo" type annotation colon.

declare class X { static foo :number }
// Message: There must be a space after "foo" type annotation colon.

// Options: ["never"]
declare class X { static foo : number }
// Message: There must be no space after "foo" type annotation colon.

type X = { foo:string }
// Message: There must be a space after "foo" type annotation colon.

// Options: ["always"]
type X = { foo:string }
// Message: There must be a space after "foo" type annotation colon.

// Options: ["never"]
type X = { foo: string }
// Message: There must be no space after "foo" type annotation colon.

type X = { foo:  string }
// Message: There must be 1 space after "foo" type annotation colon.

type X = { foo?:string }
// Message: There must be a space after "foo" type annotation colon.

// Options: ["never"]
type X = { foo?: string }
// Message: There must be no space after "foo" type annotation colon.

type X = { foo?:?string }
// Message: There must be a space after "foo" type annotation colon.

type X = { foo?:  ?string }
// Message: There must be 1 space after "foo" type annotation colon.

type Foo = { barType:(string | () => void) }
// Message: There must be a space after "barType" type annotation colon.

type Foo = { barType:(((string | () => void))) }
// Message: There must be a space after "barType" type annotation colon.

// Options: ["never"]
type Foo = { barType: (string | () => void) }
// Message: There must be no space after "barType" type annotation colon.

type Foo = { barType:  (string | () => void) }
// Message: There must be 1 space after "barType" type annotation colon.

type Foo = { barType:  ((string | () => void)) }
// Message: There must be 1 space after "barType" type annotation colon.

type X = { get:() => A; }
// Message: There must be a space after "get" type annotation colon.

type X = { get:<X>() => A; }
// Message: There must be a space after "get" type annotation colon.

// Options: ["never"]
type X = { get: () => A; }
// Message: There must be no space after "get" type annotation colon.

// Options: ["never"]
type X = { get: <X>() => A; }
// Message: There must be no space after "get" type annotation colon.

type X = { get:  () => A; }
// Message: There must be 1 space after "get" type annotation colon.

type X = { get:  <X>() => A; }
// Message: There must be 1 space after "get" type annotation colon.
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

({ lorem, ipsum, dolor }: SomeType) => {}

(foo: { a: string, b: number }) => {}

({ a, b }: ?{ a: string, b: number }) => {}

([ a, b ]: string[]) => {}

(i?: number) => {}

// Options: ["never"]
(i?:number) => {}

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

(): { a: number, b: string } => {}

// Options: ["never"]
() :{ a:number, b:string } => {}

function x(foo: string) {}

class Foo { constructor(foo: string) {} }

// Options: ["never"]
function x(foo:string) {}

// Options: ["never"]
class Foo { constructor(foo:string) {} }

async function foo({ lorem, ipsum, dolor }: SomeType) {}

function x({ a, b }: { a: string, b: number }) {}

function x(i?: number) {}

// Options: ["never"]
function x(i?:number) {}

type X = (foo: number) => string;

type X = (foo : number) => string;

type X = (foo: ?number) => string;

type X = (foo? : ?number) => string;

type X = (foo: ?{ x: number }) => string;

// Options: ["never"]
type X = (foo:number) => string;

// Options: ["never"]
type X = (foo:?{ x:number }) => string;

type X = (foo: (number)) => string

type X = (foo: ((number))) => string

// Options: ["never"]
type X = (foo:((number))) => string

type X = ?(foo: ((number))) => string

// Options: ["never"]
type X = ?(foo:((number))) => string

type TArrayPredicate = (el: T, i?: number) => boolean

// Options: ["never"]
type TArrayPredicate = (el:T, i?:number) => boolean

class Foo { bar }

class Foo { bar = 3 }

class Foo { bar: string }

class Foo { bar: ?string }

// Options: ["never"]
class Foo { bar:string }

// Options: ["never"]
class Foo { bar:?string }

class X { static foo : number }

// Options: ["never"]
class X { static foo :number }

declare class X { static foo : number }

// Options: ["never"]
declare class X { static foo :number }

type X = { foo: string }

// Options: ["never"]
type X = { foo:string }

type X = { foo?: string }

type X = { foo?: ?string }

// Options: ["never"]
type X = { foo?:?string }

type Foo = { barType: (string | () => void) }

type Foo = { barType: ((string | () => void)) }

// Options: ["never"]
type Foo = { barType:(string | () => void) }

// Options: ["never"]
type Foo = { barType:((string | () => void)) }

type X = { get(): A; }

type X = { get<X>(): A; }

// Options: ["never"]
type X = { get(): A; }

// Options: ["never"]
type X = { get<X>(): A; }

type X = { get: () => A; }

type X = { get: <X>() => A; }

// Options: ["never"]
type X = { get:() => A; }

// Options: ["never"]
type X = { get:<X>() => A; }
```



<h3 id="eslint-plugin-flowtype-rules-space-before-type-colon"><code>space-before-type-colon</code></h3>

_The `--fix` option on the command line automatically fixes problems reported by this rule._

Enforces consistent spacing before the type annotation colon.

This rule takes one argument. If it is `'always'` then a problem is raised when there is no space before the type annotation colon. If it is `'never'` then a problem is raised when there is a space before the type annotation colon. The default value is `'never'`.

The following patterns are considered problems:

```js
// Options: ["never"]
(foo : string) => {}
// Message: There must be no space before "foo" parameter type annotation colon.

// Options: ["never"]
(foo ? : string) => {}
// Message: There must be no space before "foo" parameter type annotation colon.

// Options: ["always"]
(foo: string) => {}
// Message: There must be a space before "foo" parameter type annotation colon.

// Options: ["always"]
(foo  : string) => {}
// Message: There must be 1 space before "foo" parameter type annotation colon.

// Options: ["always"]
(foo?: string) => {}
// Message: There must be a space before "foo" parameter type annotation colon.

// Options: ["always"]
(foo ?  : string) => {}
// Message: There must be 1 space before "foo" parameter type annotation colon.

// Options: ["always"]
(foo  ?: string) => {}
// Message: There must be a space before "foo" parameter type annotation colon.

({ lorem, ipsum, dolor } : SomeType) => {}
// Message: There must be no space before "{ lorem, ipsum, dolor }" parameter type annotation colon.

(foo : { a: string, b: number }) => {}
// Message: There must be no space before "foo" parameter type annotation colon.

({ a, b } : { a: string, b: number }) => {}
// Message: There must be no space before "{ a, b }" parameter type annotation colon.

([ a, b ] : string[]) => {}
// Message: There must be no space before "[ a, b ]" parameter type annotation colon.

function x(foo : string) {}
// Message: There must be no space before "foo" parameter type annotation colon.

// Options: ["always"]
function x(foo: string) {}
// Message: There must be a space before "foo" parameter type annotation colon.

var x = function (foo : string) {}
// Message: There must be no space before "foo" parameter type annotation colon.

// Options: ["always"]
var x = function (foo: string) {}
// Message: There must be a space before "foo" parameter type annotation colon.

class Foo { constructor(foo : string ) {} }
// Message: There must be no space before "foo" parameter type annotation colon.

// Options: ["always"]
class Foo { constructor(foo: string ) {} }
// Message: There must be a space before "foo" parameter type annotation colon.

async function foo({ lorem, ipsum, dolor } : SomeType) {}
// Message: There must be no space before "{ lorem, ipsum, dolor }" parameter type annotation colon.

type X = (foo :string) => string;
// Message: There must be no space before "foo" parameter type annotation colon.

// Options: ["always"]
type X = (foo:string) => string;
// Message: There must be a space before "foo" parameter type annotation colon.

// Options: ["always"]
type X = (foo  :string) => string;
// Message: There must be 1 space before "foo" parameter type annotation colon.

type X = (foo? :string) => string;
// Message: There must be no space before "foo" parameter type annotation colon.

type X = (foo?     :string) => string;
// Message: There must be no space before "foo" parameter type annotation colon.

// Options: ["always"]
type X = (foo?:string) => string;
// Message: There must be a space before "foo" parameter type annotation colon.

type X = (foo? :?string) => string;
// Message: There must be no space before "foo" parameter type annotation colon.

class X { foo :string }
// Message: There must be no space before "foo" class property type annotation colon.

// Options: ["always"]
class X { foo: string }
// Message: There must be a space before "foo" class property type annotation colon.

class X { foo :?string }
// Message: There must be no space before "foo" class property type annotation colon.

// Options: ["always"]
class X { foo: ?string }
// Message: There must be a space before "foo" class property type annotation colon.

class X { static foo : number }
// Message: There must be no space before "foo" class property type annotation colon.

class X { static foo :number }
// Message: There must be no space before "foo" class property type annotation colon.

// Options: ["always"]
class X { static foo: number }
// Message: There must be a space before "foo" class property type annotation colon.

// Options: ["always"]
class X { static foo:number }
// Message: There must be a space before "foo" class property type annotation colon.

declare class Foo { static bar :number; }
// Message: There must be no space before "bar" type annotation colon.

declare class Foo { static bar : number; }
// Message: There must be no space before "bar" type annotation colon.

// Options: ["always"]
declare class Foo { static bar:number; }
// Message: There must be a space before "bar" type annotation colon.

// Options: ["always"]
declare class Foo { static bar: number; }
// Message: There must be a space before "bar" type annotation colon.

type X = { foo : string }
// Message: There must be no space before "foo" type annotation colon.

// Options: ["never"]
type X = { foo : string }
// Message: There must be no space before "foo" type annotation colon.

// Options: ["always"]
type X = { foo: string }
// Message: There must be a space before "foo" type annotation colon.

// Options: ["always"]
type X = { foo  : string }
// Message: There must be 1 space before "foo" type annotation colon.

type X = { foo? : string }
// Message: There must be no space before "foo" type annotation colon.

// Options: ["always"]
type X = { foo?: string }
// Message: There must be a space before "foo" type annotation colon.

// Options: ["always"]
type X = { foo?  : string }
// Message: There must be 1 space before "foo" type annotation colon.

// Options: ["always"]
type X = { foo   ?: string }
// Message: There must be a space before "foo" type annotation colon.
```

The following patterns are not considered problems:

```js
(foo) => {}

(foo: string) => {}

(foo?: string) => {}

(foo ?: string) => {}

// Options: ["never"]
(foo: string) => {}

// Options: ["always"]
(foo : string) => {}

// Options: ["always"]
(foo? : string) => {}

// Options: ["always"]
(foo ? : string) => {}

// Options: ["always"]
(foo  ? : string) => {}

({ lorem, ipsum, dolor }: SomeType) => {}

(foo: { a: string, b: number }) => {}

({ a, b }: ?{ a: string, b: number }) => {}

(): { a: number, b: string } => {}

// Options: ["always"]
() : { a : number, b : string } => {}

([ a, b ]: string[]) => {}

function x(foo: string) {}

// Options: ["always"]
function x(foo : string) {}

var x = function (foo: string) {}

// Options: ["always"]
var x = function (foo : string) {}

class X { foo({ bar }: Props = this.props) {} }

class Foo { constructor(foo: string ) {} }

// Options: ["always"]
class Foo { constructor(foo : string ) {} }

async function foo({ lorem, ipsum, dolor }: SomeType) {}

function x({ a, b }: { a: string, b: number }) {}

type X = (foo:string) => number;

type X = (foo: string) => number;

type X = (foo: ?string) => number;

type X = (foo?: string) => number;

type X = (foo?: ?string) => number;

type X = (foo   ?: string) => number;

// Options: ["always"]
type X = (foo? : string) => number

// Options: ["always"]
type X = (foo? : ?string) => number

class Foo { bar }

class Foo { bar = 3 }

class Foo { bar: string }

class Foo { bar: ?string }

class Foo { bar:?string }

// Options: ["always"]
class Foo { bar : string }

class X { static foo:number }

class X { static foo: number }

// Options: ["always"]
class X { static foo :number }

// Options: ["always"]
class X { static foo : number }

declare class Foo { static bar:number; }

// Options: ["always"]
declare class Foo { static bar :number; }

declare class Foo { static bar: number; }

// Options: ["always"]
declare class Foo { static bar : number; }

type X = { foo: string }

// Options: ["always"]
type X = { foo : string }

type X = { foo?: string }

type X = { foo   ?: string }

// Options: ["always"]
type X = { foo? : string }
```



<h3 id="eslint-plugin-flowtype-rules-space-before-generic-bracket"><code>space-before-generic-bracket</code></h3>

_The `--fix` option on the command line automatically fixes problems reported by this rule._

Enforces consistent spacing before the opening `<` of generic type annotation parameters.

This rule takes one argument. If it is `'never'` then a problem is raised when there is a space before the `<`. If it is `'always'` then a problem is raised when there is no space before the `<`.

The default value is `'never'`.

The following patterns are considered problems:

```js
type X = Promise <string>
// Message: There must be no space before "Promise" generic type annotation bracket

// Options: ["never"]
type X = Promise <string>
// Message: There must be no space before "Promise" generic type annotation bracket

type X = Promise  <string>
// Message: There must be no space before "Promise" generic type annotation bracket

// Options: ["always"]
type X = Promise<string>
// Message: There must be a space before "Promise" generic type annotation bracket

// Options: ["always"]
type X = Promise  <string>
// Message: There must be one space before "Promise" generic type annotation bracket
```

The following patterns are not considered problems:

```js
type X = Promise<string>

// Options: ["always"]
type X = Promise <string>
```



<h3 id="eslint-plugin-flowtype-rules-union-intersection-spacing"><code>union-intersection-spacing</code></h3>

_The `--fix` option on the command line automatically fixes problems reported by this rule._

Enforces consistent spacing around union and intersection type separators (`|` and `&`).

This rule takes one argument. If it is `'always'` then a problem is raised when there is no space around the separator. If it is `'never'` then a problem is raised when there is a space around the separator.

The default value is `'always'`.

The following patterns are considered problems:

```js
type X = string| number;
// Message: There must be a space before union type annotation separator

// Options: ["always"]
type X = string| number;
// Message: There must be a space before union type annotation separator

type X = string |number;
// Message: There must be a space after union type annotation separator

type X = string|number;
// Message: There must be a space before union type annotation separator
// Message: There must be a space after union type annotation separator

type X = {x: string}|{y: number};
// Message: There must be a space before union type annotation separator
// Message: There must be a space after union type annotation separator

type X = string | number |boolean;
// Message: There must be a space after union type annotation separator

type X = string|number|boolean;
// Message: There must be a space before union type annotation separator
// Message: There must be a space after union type annotation separator
// Message: There must be a space before union type annotation separator
// Message: There must be a space after union type annotation separator

type X = (string)| number;
// Message: There must be a space before union type annotation separator

type X = ((string))|(number | foo);
// Message: There must be a space before union type annotation separator
// Message: There must be a space after union type annotation separator

// Options: ["never"]
type X = string |number;
// Message: There must be no space before union type annotation separator

// Options: ["never"]
type X = string| number;
// Message: There must be no space after union type annotation separator

type X = string& number;
// Message: There must be a space before intersection type annotation separator

// Options: ["always"]
type X = string& number;
// Message: There must be a space before intersection type annotation separator

type X = string &number;
// Message: There must be a space after intersection type annotation separator

type X = {x: string}&{y: number};
// Message: There must be a space before intersection type annotation separator
// Message: There must be a space after intersection type annotation separator

type X = string&number;
// Message: There must be a space before intersection type annotation separator
// Message: There must be a space after intersection type annotation separator

type X = string & number &boolean;
// Message: There must be a space after intersection type annotation separator

type X = string&number&boolean;
// Message: There must be a space before intersection type annotation separator
// Message: There must be a space after intersection type annotation separator
// Message: There must be a space before intersection type annotation separator
// Message: There must be a space after intersection type annotation separator

type X = (string)& number;
// Message: There must be a space before intersection type annotation separator

type X = ((string))&(number & foo);
// Message: There must be a space before intersection type annotation separator
// Message: There must be a space after intersection type annotation separator

// Options: ["never"]
type X = string &number;
// Message: There must be no space before intersection type annotation separator

// Options: ["never"]
type X = string& number;
// Message: There must be no space after intersection type annotation separator
```

The following patterns are not considered problems:

```js
type X = string | number;

type X = string | number | boolean;

type X = (string) | number;

type X = ((string)) | (number | foo);

// Options: ["never"]
type X = string|number

type X =
| string
| number

function x() {
type X =
| string
| number
}

type X = string & number;

type X = string & number & boolean;

type X = (string) & number;

type X = ((string)) & (number & foo);

// Options: ["never"]
type X = string&number

type X =
& string
& number

function x() {
type X =
& string
& number
}
```



<h3 id="eslint-plugin-flowtype-rules-generic-spacing"><code>generic-spacing</code></h3>

_The `--fix` option on the command line automatically fixes problems reported by this rule._

Enforces consistent spacing within generic type annotation parameters.

This rule takes one argument. If it is `'never'` then a problem is raised when there is a space surrounding the generic type parameters. If it is `'always'` then a problem is raised when there is no space surrounding the generic type parameters.

The default value is `'never'`.

The following patterns are considered problems:

```js
type X = Promise< string>
// Message: There must be no space at start of "Promise" generic type annotation

// Options: ["never"]
type X = Promise<  string>
// Message: There must be no space at start of "Promise" generic type annotation

type X = FooBar<string >
// Message: There must be no space at end of "FooBar" generic type annotation

type X = Promise< string >
// Message: There must be no space at start of "Promise" generic type annotation
// Message: There must be no space at end of "Promise" generic type annotation

type X = Promise< (foo), bar, (((baz))) >
// Message: There must be no space at start of "Promise" generic type annotation
// Message: There must be no space at end of "Promise" generic type annotation

// Options: ["always"]
type X = Promise<string >
// Message: There must be a space at start of "Promise" generic type annotation

// Options: ["always"]
type X = FooBar< string>
// Message: There must be a space at end of "FooBar" generic type annotation

// Options: ["always"]
type X = Promise<string>
// Message: There must be a space at start of "Promise" generic type annotation
// Message: There must be a space at end of "Promise" generic type annotation

// Options: ["always"]
type X = Promise<(foo), bar, (((baz)))>
// Message: There must be a space at start of "Promise" generic type annotation
// Message: There must be a space at end of "Promise" generic type annotation

// Options: ["always"]
type X = FooBar<  string >
// Message: There must be one space at start of "FooBar" generic type annotation

// Options: ["always"]
type X = FooBar< string  >
// Message: There must be one space at end of "FooBar" generic type annotation

// Options: ["always"]
type X = Promise<  (foo), bar, (((baz)))  >
// Message: There must be one space at start of "Promise" generic type annotation
// Message: There must be one space at end of "Promise" generic type annotation
```

The following patterns are not considered problems:

```js
type X = Promise<string>

type X = Promise<(string)>

type X = Promise<(foo), bar, (((baz)))>

// Options: ["always"]
type X = Promise< string >

// Options: ["always"]
type X = Promise< (string) >

// Options: ["always"]
type X = Promise< (foo), bar, (((baz))) >
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



<h3 id="eslint-plugin-flowtype-rules-valid-syntax"><code>valid-syntax</code></h3>

Checks for simple Flow syntax errors.

The following patterns are considered problems:

```js
function x(foo = "1": string) {}
// Message: "foo" parameter type annotation must be placed on left-hand side of assignment.

function x(foo = bar(): Type, baz = []: []) {}
// Message: "foo" parameter type annotation must be placed on left-hand side of assignment.
// Message: "baz" parameter type annotation must be placed on left-hand side of assignment.
```

The following patterns are not considered problems:

```js
function x(foo: string = "1") {}

function x(foo: Type = bar()) {}
```



