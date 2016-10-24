### `object-type-delimiter`

_The `--fix` option on the command line automatically fixes problems reported by this rule._

Enforces consistent separators between properties in Flow object types.

This rule takes one argument.

If it is `'comma'` then a problem is raised when using `;` as a separator.

If it is `'semicolon'` then a problem is raised when using `,` as a separator.

The default value is `'comma'`.

_This rule is ported from `babel/flow-object-type`, however the default option was changed._

<!-- assertions objectTypeDelimiter -->
