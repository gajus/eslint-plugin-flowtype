### `require-compound-type-alias`

Requires to make a type alias for all [union](https://flow.org/en/docs/types/unions/) and [intersection](https://flow.org/en/docs/types/intersections/) types. If these are used in "raw" forms it might be tempting to just copy&paste them around the code. However, this brings sort of a source code pollution and unnecessary changes on several parts when these compound types need to be changed.

#### Options

The rule has a string option:

* `"never"`
* `"always"`

The default value is `"always"`.

<!-- assertions requireCompoundTypeAlias -->
