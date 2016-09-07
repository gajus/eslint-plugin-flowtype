### `delimiter-dangle`

_The `--fix` option on the command line automatically fixes problems reported by this rule._

Enforces consistent use of trailing commas in Object and Tuple annotations.

This rule takes one argument which mirrors ESLint's default `comma-dangle` rule.

If it is `'never'` then a problem is raised when there is a trailing comma.

If it is `'always'` then a problem is raised when there is no trailing comma.

If it is `'always-multiline'` then a problem is raised when there is no trailing comma on a multi-line definition, or there _is_ a trailing comma on a single-line definition.

If it is `'only-multiline'` then a problem is raised when there is a trailing comma on a single-line definition. It allows, but does not enforce, trailing commas on multi-line definitions.

The default value is `'never'`.

<!-- assertions delimiterDangle -->
