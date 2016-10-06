### `space-after-type-colon`

_The `--fix` option on the command line automatically fixes problems reported by this rule._

Enforces consistent spacing after the type annotation colon.

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
