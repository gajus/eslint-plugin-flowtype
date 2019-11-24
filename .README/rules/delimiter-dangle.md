### `delimiter-dangle`

_The `--fix` option on the command line automatically fixes problems reported by this rule._

Enforces consistent use of trailing commas in Object and Tuple annotations.

This rule takes three arguments where the possible values are the same as ESLint's default `comma-dangle` rule:

1. The first argument is for Object and Tuple annotations. The default value is `'never'`.
2. The second argument is used for Interface annotations. This defaults to the value of the first argument.
3. The third argument is used for inexact object notation (trailing `...`). The default value is `'never'`.

If it is `'never'` then a problem is raised when there is a trailing comma.

If it is `'always'` then a problem is raised when there is no trailing comma.

If it is `'always-multiline'` then a problem is raised when there is no trailing comma on a multi-line definition, or there _is_ a trailing comma on a single-line definition.

If it is `'only-multiline'` then a problem is raised when there is a trailing comma on a single-line definition. It allows, but does not enforce, trailing commas on multi-line definitions.

<!-- assertions delimiterDangle -->
