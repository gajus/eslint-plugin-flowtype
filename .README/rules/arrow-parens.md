### `arrow-parens`

_The `--fix` option on the command line automatically fixes problems reported by this rule._

Enforces the consistent use of parentheses in arrow functions.

This rule has a string option and an object one.

String options are:

- `"always"` (default) requires parens around arguments in all cases.
- `"as-needed"` enforces no braces where they can be omitted.

Object properties for variants of the `"as-needed"` option:

- `"requireForBlockBody": true` modifies the as-needed rule in order to require parens if the function body is in an instructions block (surrounded by braces).

<!-- assertions arrowParens -->
