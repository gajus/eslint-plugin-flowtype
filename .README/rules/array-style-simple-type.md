### `array-style-simple-type`

Enforces a particular style for array type annotations for complex types. Type is considered simple in these cases:

* Primitive types
* Literal types
* [Mixed type](https://flow.org/en/docs/types/mixed/)
* [Any type](https://flow.org/en/docs/types/any/)
* Class type
* [Generic type](https://flow.org/en/docs/types/generics/)
* Array type [shorthand notation](https://flow.org/en/docs/types/arrays/#toc-array-type-shorthand-syntax)

This rule takes one argument.

If it is `'verbose'` then a problem is raised when using `Type[]` instead of `Array<Type>`.

If it is `'shorthand'` then a problem is raised when using `Array<Type>` instead of `Type[]`.

The default value is `'shorthand'`.

<!-- assertions arrayStyleSimpleType -->
