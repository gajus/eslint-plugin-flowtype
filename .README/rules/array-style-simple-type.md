### `array-style-simple-type`

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
