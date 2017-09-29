### `array-style-complex-type`

_The `--fix` option on the command line automatically fixes problems reported by this rule._

Enforces a particular style for array type annotations for complex types. Type is considered complex in these cases:

* [Maybe type](https://flow.org/en/docs/types/maybe/)
* Function type
* Object type
* [Tuple type](https://flow.org/en/docs/types/tuples/)
* [Union type](https://flow.org/en/docs/types/unions/)
* [Intersection type](https://flow.org/en/docs/types/intersections/)

This rule takes one argument.

If it is `'verbose'` then a problem is raised when using `Type[]` instead of `Array<Type>`.

If it is `'shorthand'` then a problem is raised when using `Array<Type>` instead of `Type[]`.

The default value is `'verbose'`.

<!-- assertions arrayStyleComplexType -->
