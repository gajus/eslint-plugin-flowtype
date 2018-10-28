<a name="eslint-plugin-flowtype"></a>
# eslint-plugin-flowtype

[![NPM version](http://img.shields.io/npm/v/eslint-plugin-flowtype.svg?style=flat-square)](https://www.npmjs.org/package/eslint-plugin-flowtype)
[![Travis build status](http://img.shields.io/travis/gajus/eslint-plugin-flowtype/master.svg?style=flat-square)](https://travis-ci.org/gajus/eslint-plugin-flowtype)
[![js-canonical-style](https://img.shields.io/badge/code%20style-canonical-blue.svg?style=flat-square)](https://github.com/gajus/canonical)

[Flow type](http://flowtype.org/) linting rules for ESLint.

* [eslint-plugin-flowtype](#eslint-plugin-flowtype)
    * [Installation](#eslint-plugin-flowtype-installation)
    * [Configuration](#eslint-plugin-flowtype-configuration)
        * [Shareable configurations](#eslint-plugin-flowtype-configuration-shareable-configurations)
        * [Community maintained configurations](#eslint-plugin-flowtype-configuration-community-maintained-configurations)
    * [Settings](#eslint-plugin-flowtype-settings)
        * [`onlyFilesWithFlowAnnotation`](#eslint-plugin-flowtype-settings-onlyfileswithflowannotation)
    * [Rules](#eslint-plugin-flowtype-rules)
        * [`array-style-complex-type`](#eslint-plugin-flowtype-rules-array-style-complex-type)
        * [`array-style-simple-type`](#eslint-plugin-flowtype-rules-array-style-simple-type)
        * [`boolean-style`](#eslint-plugin-flowtype-rules-boolean-style)
        * [`define-flow-type`](#eslint-plugin-flowtype-rules-define-flow-type)
        * [`delimiter-dangle`](#eslint-plugin-flowtype-rules-delimiter-dangle)
        * [`generic-spacing`](#eslint-plugin-flowtype-rules-generic-spacing)
        * [`newline-after-flow-annotation`](#eslint-plugin-flowtype-rules-newline-after-flow-annotation)
        * [`no-dupe-keys`](#eslint-plugin-flowtype-rules-no-dupe-keys)
        * [`no-existential-type`](#eslint-plugin-flowtype-rules-no-existential-type)
        * [`no-flow-fix-me-comments`](#eslint-plugin-flowtype-rules-no-flow-fix-me-comments)
        * [`no-mutable-array`](#eslint-plugin-flowtype-rules-no-mutable-array)
        * [`no-primitive-constructor-types`](#eslint-plugin-flowtype-rules-no-primitive-constructor-types)
        * [`no-types-missing-file-annotation`](#eslint-plugin-flowtype-rules-no-types-missing-file-annotation)
        * [`no-unused-expressions`](#eslint-plugin-flowtype-rules-no-unused-expressions)
        * [`no-weak-types`](#eslint-plugin-flowtype-rules-no-weak-types)
        * [`object-type-delimiter`](#eslint-plugin-flowtype-rules-object-type-delimiter)
        * [`require-compound-type-alias`](#eslint-plugin-flowtype-rules-require-compound-type-alias)
        * [`require-exact-type`](#eslint-plugin-flowtype-rules-require-exact-type)
        * [`require-parameter-type`](#eslint-plugin-flowtype-rules-require-parameter-type)
        * [`require-return-type`](#eslint-plugin-flowtype-rules-require-return-type)
        * [`require-types-at-top`](#eslint-plugin-flowtype-rules-require-types-at-top)
        * [`require-valid-file-annotation`](#eslint-plugin-flowtype-rules-require-valid-file-annotation)
        * [`require-variable-type`](#eslint-plugin-flowtype-rules-require-variable-type)
        * [`semi`](#eslint-plugin-flowtype-rules-semi)
        * [`sort-keys`](#eslint-plugin-flowtype-rules-sort-keys)
        * [`space-after-type-colon`](#eslint-plugin-flowtype-rules-space-after-type-colon)
        * [`space-before-generic-bracket`](#eslint-plugin-flowtype-rules-space-before-generic-bracket)
        * [`space-before-type-colon`](#eslint-plugin-flowtype-rules-space-before-type-colon)
        * [`type-id-match`](#eslint-plugin-flowtype-rules-type-id-match)
        * [`type-import-style`](#eslint-plugin-flowtype-rules-type-import-style)
        * [`union-intersection-spacing`](#eslint-plugin-flowtype-rules-union-intersection-spacing)
        * [`use-flow-type`](#eslint-plugin-flowtype-rules-use-flow-type)
        * [`valid-syntax`](#eslint-plugin-flowtype-rules-valid-syntax)


<a name="eslint-plugin-flowtype-installation"></a>
## Installation

1. Install [ESLint](https://www.github.com/eslint/eslint).
1. Install [`babel-eslint`](https://github.com/babel/babel-eslint) parser (ESLint parser [does not support type annotations](https://github.com/eslint/eslint/issues/2157)).
1. Install [`eslint-plugin-flowtype`](https://github.com/gajus/eslint-plugin-flowtype) plugin.

<!-- -->

```sh
npm install eslint --save-dev
npm install babel-eslint --save-dev
npm install eslint-plugin-flowtype --save-dev
```

<a name="eslint-plugin-flowtype-configuration"></a>
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
    "flowtype/no-primitive-constructor-types": 2,
    "flowtype/no-types-missing-file-annotation": 2,
    "flowtype/no-weak-types": 2,
    "flowtype/object-type-delimiter": [
      2,
      "comma"
    ],
    "flowtype/require-parameter-type": 2,
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

<a name="eslint-plugin-flowtype-configuration-shareable-configurations"></a>
### Shareable configurations

<a name="eslint-plugin-flowtype-configuration-shareable-configurations-recommended"></a>
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

<a name="eslint-plugin-flowtype-configuration-community-maintained-configurations"></a>
### Community maintained configurations

The following are third-party submitted/ maintained configurations of `eslint-plugin-flowtype`:

* https://github.com/wemake-services/eslint-config-flowtype-essential

<a name="eslint-plugin-flowtype-settings"></a>
## Settings

<a name="eslint-plugin-flowtype-settings-onlyfileswithflowannotation"></a>
### <code>onlyFilesWithFlowAnnotation</code>

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

<a name="eslint-plugin-flowtype-rules"></a>
## Rules

<!-- Rules are sorted alphabetically. -->

<a name="eslint-plugin-flowtype-rules-array-style-complex-type"></a>
### <code>array-style-complex-type</code>

_The `--fix` option on the command line automatically fixes problems reported by this rule._

Enforces a particular annotation style of complex types.

Type is considered complex in these cases:

* [Maybe type](https://flow.org/en/docs/types/maybe/)
* [Function type](https://flow.org/en/docs/types/functions/)
* [Object type](https://flow.org/en/docs/types/objects/)
* [Tuple type](https://flow.org/en/docs/types/tuples/)
* [Union type](https://flow.org/en/docs/types/unions/)
* [Intersection type](https://flow.org/en/docs/types/intersections/)

This rule takes one argument.

If it is `'verbose'` then a problem is raised when using `Type[]` instead of `Array<Type>`.

If it is `'shorthand'` then a problem is raised when using `Array<Type>` instead of `Type[]`.

The default value is `'verbose'`.

<!-- assertions arrayStyleComplexType -->

<a name="eslint-plugin-flowtype-rules-array-style-simple-type"></a>
### <code>array-style-simple-type</code>

_The `--fix` option on the command line automatically fixes problems reported by this rule._

Enforces a particular array type annotation style of simple types.

Type is considered simple in these cases:

* [Primitive types](https://flow.org/en/docs/types/primitives/)
* [Literal types](https://flow.org/en/docs/types/literals/)
* [Mixed type](https://flow.org/en/docs/types/mixed/)
* [Any type](https://flow.org/en/docs/types/any/)
* [Class type](https://flow.org/en/docs/types/classes/)
* [Generic type](https://flow.org/en/docs/types/generics/)
* Array type [shorthand notation](https://flow.org/en/docs/types/arrays/#toc-array-type-shorthand-syntax)

This rule takes one argument.

If it is `'verbose'` then a problem is raised when using `Type[]` instead of `Array<Type>`.

If it is `'shorthand'` then a problem is raised when using `Array<Type>` instead of `Type[]`.

The default value is `'verbose'`.

<!-- assertions arrayStyleSimpleType -->

<a name="eslint-plugin-flowtype-rules-boolean-style"></a>
### <code>boolean-style</code>

_The `--fix` option on the command line automatically fixes problems reported by this rule._

Enforces a particular style for boolean type annotations. This rule takes one argument.

If it is `'boolean'` then a problem is raised when using `bool` instead of `boolean`.

If it is `'bool'` then a problem is raised when using `boolean` instead of `bool`.

The default value is `'boolean'`.

<!-- assertions booleanStyle -->

<a name="eslint-plugin-flowtype-rules-define-flow-type"></a>
### <code>define-flow-type</code>

Marks Flow type identifiers as defined.

Used to suppress [`no-undef`](http://eslint.org/docs/rules/no-undef) reporting of type identifiers.

<!-- assertions defineFlowType -->

<a name="eslint-plugin-flowtype-rules-delimiter-dangle"></a>
### <code>delimiter-dangle</code>

_The `--fix` option on the command line automatically fixes problems reported by this rule._

Enforces consistent use of trailing commas in Object and Tuple annotations.

This rule takes one argument which mirrors ESLint's default `comma-dangle` rule.

If it is `'never'` then a problem is raised when there is a trailing comma.

If it is `'always'` then a problem is raised when there is no trailing comma.

If it is `'always-multiline'` then a problem is raised when there is no trailing comma on a multi-line definition, or there _is_ a trailing comma on a single-line definition.

If it is `'only-multiline'` then a problem is raised when there is a trailing comma on a single-line definition. It allows, but does not enforce, trailing commas on multi-line definitions.

The default value is `'never'`.

<!-- assertions delimiterDangle -->

<a name="eslint-plugin-flowtype-rules-generic-spacing"></a>
### <code>generic-spacing</code>

_The `--fix` option on the command line automatically fixes problems reported by this rule._

Enforces consistent spacing within generic type annotation parameters.

This rule takes one argument. If it is `'never'` then a problem is raised when there is a space surrounding the generic type parameters. If it is `'always'` then a problem is raised when there is no space surrounding the generic type parameters.

The default value is `'never'`.

<!-- assertions genericSpacing -->

<a name="eslint-plugin-flowtype-rules-newline-after-flow-annotation"></a>
### <code>newline-after-flow-annotation</code>

This rule requires an empty line after the Flow annotation.

<a name="eslint-plugin-flowtype-rules-newline-after-flow-annotation-options"></a>
#### Options

The rule has a string option:

* `"always"` (default): Enforces that `@flow` annotations be followed by an empty line, separated by newline (LF)
* `"always-windows"`: Identical to "always", but will use a CRLF when autofixing
* `"never"`: Enforces that `@flow` annotations are not followed by empty lines

```js
{
  "rules": {
    "flowtype/newline-after-flow-annotation": [
      2,
      "always"
    ]
  }
}
```


<!-- assertions newlineAfterFlowAnnotation -->

<a name="eslint-plugin-flowtype-rules-no-dupe-keys"></a>
### <code>no-dupe-keys</code>

Checks for duplicate properties in Object annotations.

This rule mirrors ESLint's [no-dupe-keys](http://eslint.org/docs/rules/no-dupe-keys) rule.

```js
{
    "rules": {
        "flowtype/no-dupe-keys": 2
    }
}
```

<!-- assertions noDupeKeys -->

<a name="eslint-plugin-flowtype-rules-no-existential-type"></a>
### <code>no-existential-type</code>

Disallows use of the existential type (*). [See more](https://flow.org/en/docs/types/utilities/#toc-existential-type)

```js
{
  "rules": {
    "flowtype/no-existential-type": 2
  }
}
```


<!-- assertions noExistentialType -->

<a name="eslint-plugin-flowtype-rules-no-flow-fix-me-comments"></a>
### <code>no-flow-fix-me-comments</code>

Disallows `$FlowFixMe` comment suppressions.

This is especially useful as a warning to ensure instances of `$FlowFixMe` in your codebase get fixed over time.

<a name="eslint-plugin-flowtype-rules-no-flow-fix-me-comments-options-1"></a>
#### Options

This rule takes an optional RegExp that comments a text RegExp that makes the supression valid.

```js
{
    "rules": {
        "flowtype/no-flow-fix-me-comments": [
            1,
            "TODO\s+[0-9]+"
        ]
    }
}
```

<!-- assertions noFlowFixMeComments -->

<a name="eslint-plugin-flowtype-rules-no-mutable-array"></a>
### <code>no-mutable-array</code>

_The `--fix` option on the command line automatically fixes problems reported by this rule._

Requires use of [`$ReadOnlyArray`](https://github.com/facebook/flow/blob/v0.46.0/lib/core.js#L185) instead of just `Array` or array [shorthand notation](https://flow.org/en/docs/types/arrays/#toc-array-type-shorthand-syntax). `$ReadOnlyArray` is immutable array collection type and the superclass of Array and tuple types in Flow. Use of `$ReadOnlyArray` instead of `Array` can solve some "problems" in typing with Flow (e.g., [1](https://github.com/facebook/flow/issues/3425), [2](https://github.com/facebook/flow/issues/4251)).

General reasons for using immutable data structures:

* They are simpler to construct, test, and use
* They help to avoid temporal coupling
* Their usage is side-effect free (no defensive copies)
* Identity mutability problem is avoided
* They always have failure atomicity
* They are much easier to cache

Note that initialization of a variable with an empty array is considered valid (e.g., `const values: Array<string> = [];`). This behavior resembles the behavior of Flow's [unsealed objects](https://flow.org/en/docs/types/objects/#toc-unsealed-objects), as it is assumed that empty array is intended to be mutated.

<!-- assertions noMutableArray -->

<a name="eslint-plugin-flowtype-rules-no-primitive-constructor-types"></a>
### <code>no-primitive-constructor-types</code>

Disallows use of primitive constructors as types, such as `Boolean`, `Number` and `String`. [See more](https://flowtype.org/docs/builtins.html).

```js
{
    "rules": {
        "flowtype/no-primitive-constructor-types": 2
    }
}
```

<!-- assertions noPrimitiveConstructorTypes -->

<a name="eslint-plugin-flowtype-rules-no-types-missing-file-annotation"></a>
### <code>no-types-missing-file-annotation</code>

Disallows Flow type imports, aliases, and annotations in files missing a valid Flow file declaration (or a @noflow annotation).

```js
{
    "rules": {
        "flowtype/no-types-missing-file-annotation": 2
    }
}
```

<!-- assertions noTypesMissingFileAnnotation -->

<a name="eslint-plugin-flowtype-rules-no-unused-expressions"></a>
### <code>no-unused-expressions</code>

An extension of [ESLint's `no-unused-expressions`](https://eslint.org/docs/rules/no-unused-expressions).
This rule ignores type cast expressions, but otherwise behaves the same as ESLint's
`no-unused-expressions`.

Bare type casts are useful, for example to assert the exhaustiveness of a `switch`:

```js
type Action
  = { type: 'FOO', doFoo: (_: number) => void }
  | { type: 'BAR', doBar: (_: string) => void };

type State = { foo: number, bar: string };

function runFooBar(action: Action, state: State): void {
  switch (action.type) {
    case 'FOO':
      doFoo(state.foo);
      break;
    case 'BAR':
      doBar(state.bar);
      break;
    default:
      (action: empty);  // type error when `Action` is extended with new types
      console.error(`Impossible action: ${action.toString()}`);
  }
}
```

This rule takes the same arguments as ESLint's `no-unused-expressions`. See
[that rule's documentation](https://eslint.org/docs/rules/no-unused-expressions) for details.

<!-- assertions noUnusedExpressions -->

<a name="eslint-plugin-flowtype-rules-no-weak-types"></a>
### <code>no-weak-types</code>

Warns against weak type annotations *any*, *Object* and *Function*.
These types can cause flow to silently skip over portions of your code,
which would have otherwise caused type errors.

This rule optionally takes one argument, an object to configure which type warnings to enable. By default, all of the
warnings are enabled. e.g. to disable the `any` warning (allowing it to exist in your code), while continuing to warn
about `Object` and `Function`:

```js
{
    "rules": {
        "flowtype/no-weak-types": [2, {
            "any": false,
            "Object": true,
            "Function": true
        }]
    }
}

// or, the following is equivalent as default is true:

{
    "rules": {
        "flowtype/no-weak-types": [2, {
            "any": false
        }]
    }
}
```

<!-- assertions noWeakTypes -->

<a name="eslint-plugin-flowtype-rules-object-type-delimiter"></a>
### <code>object-type-delimiter</code>

_The `--fix` option on the command line automatically fixes problems reported by this rule._

Enforces consistent separators between properties in Flow object types.

This rule takes one argument.

If it is `'comma'` then a problem is raised when using `;` as a separator.

If it is `'semicolon'` then a problem is raised when using `,` as a separator.

The default value is `'comma'`.

_This rule is ported from `babel/flow-object-type`, however the default option was changed._

<!-- assertions objectTypeDelimiter -->

<a name="eslint-plugin-flowtype-rules-require-compound-type-alias"></a>
### <code>require-compound-type-alias</code>

Requires to make a type alias for all [union](https://flow.org/en/docs/types/unions/) and [intersection](https://flow.org/en/docs/types/intersections/) types. If these are used in "raw" forms it might be tempting to just copy&paste them around the code. However, this brings sort of a source code pollution and unnecessary changes on several parts when these compound types need to be changed.

<a name="eslint-plugin-flowtype-rules-require-compound-type-alias-options-2"></a>
#### Options

The rule has a string option:

* `"never"`
* `"always"`

The default value is `"always"`.

<!-- assertions requireCompoundTypeAlias -->

<a name="eslint-plugin-flowtype-rules-require-exact-type"></a>
### <code>require-exact-type</code>

This rule enforces [exact object types](https://flow.org/en/docs/types/objects/#toc-exact-object-types).

<a name="eslint-plugin-flowtype-rules-require-exact-type-options-3"></a>
#### Options

The rule has one string option:

* `"always"` (default): Report all object type definitions that aren't exact.
* `"never"`: Report all object type definitions that are exact.

```js
{
  "rules": {
    "flowtype/require-exact-type": [
      2,
      "always"
    ]
  }
}

{
  "rules": {
    "flowtype/require-exact-type": [
      2,
      "never"
    ]
  }
}
```

<!-- assertions requireExactType -->

<a name="eslint-plugin-flowtype-rules-require-parameter-type"></a>
### <code>require-parameter-type</code>

Requires that all function parameters have type annotations.

<a name="eslint-plugin-flowtype-rules-require-parameter-type-options-4"></a>
#### Options

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

You can exclude parameters that match a certain regex by using `excludeParameterMatch`.

```js
{
    "rules": {
        "flowtype/require-parameter-type": [
            2,
            {
              "excludeParameterMatch": "^_"
            }
        ]
    }
}
```

This excludes all parameters that start with an underscore (`_`).
The default pattern is `a^`, which doesn't match anything, i.e., all parameters are checked.

<!-- assertions requireParameterType -->

<a name="eslint-plugin-flowtype-rules-require-return-type"></a>
### <code>require-return-type</code>

Requires that functions have return type annotation.

<a name="eslint-plugin-flowtype-rules-require-return-type-options-5"></a>
#### Options

You can skip all arrow functions by providing the `excludeArrowFunctions` option with `true`.

Alternatively, you can exclude a concise arrow function (e.g. `() => 2`). Provide `excludeArrowFunctions` with `expressionsOnly` for this.

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

You can exclude or include specific tests with the `includeOnlyMatching` and `excludeMatching` rules.

```js
{
    "rules": {
        "flowtype/require-return-type": [
            2,
            "always",
            {
              "includeOnlyMatching": [
                  "^F.*",
                  "Ba(r|z)"
              ]
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
              "excludeMatching": [
                  "^F.*",
                  "Ba(r|z)"
              ]
            }
        ]
    }
}

```

Both rules take an array that can contain either strings or valid RegExp statements.

<!-- assertions requireReturnType -->

<a name="eslint-plugin-flowtype-rules-require-types-at-top"></a>
### <code>require-types-at-top</code>

Requires all type declarations to be at the top of the file, after any import declarations.

<a name="eslint-plugin-flowtype-rules-require-types-at-top-options-6"></a>
#### Options

The rule has a string option:

* `"never"`
* `"always"`

The default value is `"always"`.

<!-- assertions requireTypesAtTop -->

<a name="eslint-plugin-flowtype-rules-require-valid-file-annotation"></a>
### <code>require-valid-file-annotation</code>

This rule validates Flow file annotations.

This rule can optionally report missing or missed placed annotations, common typos (e.g. `// @floww`), and enforce a consistant annotation style.

<a name="eslint-plugin-flowtype-rules-require-valid-file-annotation-options-7"></a>
#### Options

The rule has a string option:

* `"never"` (default): Never report files that are missing an `@flow` annotation.
* `"always"`: Always report files that are missing an `@flow` annotation

This rule has an object option:

* `"annotationStyle"` - Enforce a consistant file annotation style.
    * `"none"` (default): Either annotation style is accepted.
    * `"line"`: Require single line annotations (i.e. `// @flow`).
    * `"block"`: Require block annotations (i.e. `/* @flow */`).

```js
{
  "rules": {
    "flowtype/require-valid-file-annotation": [
      2,
      "always"
    ]
  }
}

{
  "rules": {
    "flowtype/require-valid-file-annotation": [
      2,
      "always", {
        "annotationStyle": "block"
      }
    ]
  }
}
```

<!-- assertions requireValidFileAnnotation -->

<a name="eslint-plugin-flowtype-rules-require-variable-type"></a>
### <code>require-variable-type</code>

Requires that all variable declarators have type annotations.

<a name="eslint-plugin-flowtype-rules-require-variable-type-options-8"></a>
#### Options

You can exclude variables that match a certain regex by using `excludeVariableMatch`.

This excludes all parameters that start with an underscore (`_`).
The default pattern is `a^`, which doesn't match anything, i.e., all parameters are checked.

```js
{
    "rules": {
        "flowtype/require-variable-type": [
            2,
            {
              "excludeVariableMatch": "^_"
            }
        ]
    }
}
```


You can choose specific variable types (`var`, `let`, and `const`) to ignore using `excludeVariableTypes`.

This excludes `var` and `let` declarations from needing type annotations, but forces `const` declarations to have it.
By default, all declarations are checked.

```js
{
    "rules": {
        "flowtype/require-variable-type": [
            2,
            {
              "excludeVariableTypes": {
                "var": true,
                "let": true,
                "const": false,
              }
            }
        ]
    }
}
```



<!-- assertions requireVariableType -->

<a name="eslint-plugin-flowtype-rules-semi"></a>
### <code>semi</code>

_The `--fix` option on the command line automatically fixes problems reported by this rule._

Enforces consistent use of semicolons after type aliases.

This rule takes one argument. If it is `'never'` then a problem is raised when there is a semicolon after a type alias. If it is `'always'` then a problem is raised when there is no semicolon after a type alias.

The default value is `'always'`.

<!-- assertions semi -->

<a name="eslint-plugin-flowtype-rules-sort-keys"></a>
### <code>sort-keys</code>

_The `--fix` option on the command line automatically fixes problems reported by this rule._

Enforces sorting of Object annotations.

This rule mirrors ESlint's [sort-keys](http://eslint.org/docs/rules/sort-keys) rule.

<a name="eslint-plugin-flowtype-rules-sort-keys-options-9"></a>
#### Options

The first option specifies sort order.

* `"asc"` (default) - enforce ascending sort order.
* `"desc"` - enforce descending sort order.

The second option takes an object with two possible properties.

* `caseSensitive` - if `true`, enforce case-sensitive sort order. Default is `true`.
* `natural` - if `true`, enforce [natural sort order](https://en.wikipedia.org/wiki/Natural_sort_order). Default is `false`.

```js
{
  "rules": {
    "flowtype/sort-keys": [
      2,
      "asc", {
        "caseSensitive": true,
        "natural": false
      }
    ]
  }
}
```

<!-- assertions sortKeys -->

<a name="eslint-plugin-flowtype-rules-space-after-type-colon"></a>
### <code>space-after-type-colon</code>

_The `--fix` option on the command line automatically fixes problems reported by this rule._

Enforces consistent spacing after the type annotation colon.

<a name="eslint-plugin-flowtype-rules-space-after-type-colon-options-10"></a>
#### Options

This rule has a string argument.

* `"always"` (default): Require a space after the type annotation colon (e.g. foo: BarType).
* `"never"`: Require no spaces after the type annotation colon (e.g. foo:BarType).

This rule has an option object.

* `"allowLineBreak"` - Allow a line break to count as a space following the annotation colon.
    * `"true"`: Enable
    * `"false"`: Disable

{
  "rules": {
    "flowtype/space-after-type-colon": [
      2,
      "always", {
        "allowLineBreak": false
      }
    ]
  }
}

<!-- assertions spaceAfterTypeColon -->

<a name="eslint-plugin-flowtype-rules-space-before-generic-bracket"></a>
### <code>space-before-generic-bracket</code>

_The `--fix` option on the command line automatically fixes problems reported by this rule._

Enforces consistent spacing before the opening `<` of generic type annotation parameters.

This rule takes one argument. If it is `'never'` then a problem is raised when there is a space before the `<`. If it is `'always'` then a problem is raised when there is no space before the `<`.

The default value is `'never'`.

<!-- assertions spaceBeforeGenericBracket -->

<a name="eslint-plugin-flowtype-rules-space-before-type-colon"></a>
### <code>space-before-type-colon</code>

_The `--fix` option on the command line automatically fixes problems reported by this rule._

Enforces consistent spacing before the type annotation colon.

This rule takes one argument. If it is `'always'` then a problem is raised when there is no space before the type annotation colon. If it is `'never'` then a problem is raised when there is a space before the type annotation colon. The default value is `'never'`.

<!-- assertions spaceBeforeTypeColon -->

<a name="eslint-plugin-flowtype-rules-type-id-match"></a>
### <code>type-id-match</code>

Enforces a consistent naming pattern for type aliases.

<a name="eslint-plugin-flowtype-rules-type-id-match-options-11"></a>
#### Options

This rule needs a text RegExp to operate with Its signature is as follows:

```js
{
    "rules": {
        "flowtype/type-id-match": [
            2,
            "^([A-Z][a-z0-9]*)+Type$"
        ]
    }
}
```

`'^([A-Z][a-z0-9]*)+Type$'` is the default pattern.

<!-- assertions typeIdMatch -->

<a name="eslint-plugin-flowtype-rules-type-import-style"></a>
### <code>type-import-style</code>

_The `--fix` option on the command line automatically fixes problems reported by this rule._

Enforces a particular style for type imports:

```
// 'identifier' style
import {type T, type U, type V} from '...';

// 'declaration' style
import type {T, U, V} from '...';
```

The rule has a string option:

* `"identifier"` (default): Enforces that type imports are all in the
  'identifier' style.
* `"declaration"`: Enforces that type imports are all in the 'declaration'
  style.

<!-- assertions typeImportStyle -->

<a name="eslint-plugin-flowtype-rules-union-intersection-spacing"></a>
### <code>union-intersection-spacing</code>

_The `--fix` option on the command line automatically fixes problems reported by this rule._

Enforces consistent spacing around union and intersection type separators (`|` and `&`).

This rule takes one argument. If it is `'always'` then a problem is raised when there is no space around the separator. If it is `'never'` then a problem is raised when there is a space around the separator.

The default value is `'always'`.

<!-- assertions unionIntersectionSpacing -->

<a name="eslint-plugin-flowtype-rules-use-flow-type"></a>
### <code>use-flow-type</code>

Marks Flow [type alias](https://flowtype.org/docs/type-aliases.html) declarations as used.

Used to suppress [`no-unused-vars`](http://eslint.org/docs/rules/no-unused-vars) errors that are triggered by type aliases.

<!-- assertions useFlowType -->

<a name="eslint-plugin-flowtype-rules-valid-syntax"></a>
### <code>valid-syntax</code>

**Deprecated** Babylon (the Babel parser) v6.10.0 fixes parsing of the invalid syntax this plugin warned against.

Checks for simple Flow syntax errors.

<!-- assertions validSyntax -->

