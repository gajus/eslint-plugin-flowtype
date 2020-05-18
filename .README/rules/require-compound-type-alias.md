### `require-compound-type-alias`

Requires to make a type alias for all [union](https://flow.org/en/docs/types/unions/) and [intersection](https://flow.org/en/docs/types/intersections/) types. If these are used in "raw" forms it might be tempting to just copy & paste them around the code. However, this brings sort of a source code pollution and unnecessary changes on several parts when these compound types need to be changed.

#### Options

The rule has two options:

1. a string option

* `"always"` (default)
* `"never"`

2. an object

```js
{
  "rules": {
    "flowtype/require-compound-type-alias": [
      2,
      "always",
      {
        "allowNull": true
      }
    ]
  }
}
```

* `allowNull` – allows compound types where one of the members is a `null`, e.g. `string | null`.

<!-- assertions requireCompoundTypeAlias -->
