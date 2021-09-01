### `object-type-curly-newline`

_The `--fix` option on the command line automatically fixes problems reported by this rule._

This rule enforce consistent line breaks after opening and before closing braces of type objects.

#### Options

The rule has a string option:

* `"never"`: disallows multiline type objects.
* `"always"`: requires multiline type objects.
* `"multiline"`(default): acts as `never` until there is a multiline, then acts as `always`

<!-- assertions objectTypeCurlyNewline -->
