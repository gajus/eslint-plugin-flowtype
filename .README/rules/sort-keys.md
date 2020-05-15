### `sort-keys`

_The `--fix` option on the command line automatically fixes problems reported by this rule._

Enforces natural, case-insensitive sorting of Object annotations.

#### Options

The first option specifies sort order.

* `"asc"` (default) - enforce ascending sort order.
* `"desc"` - enforce descending sort order.

```js
{
  "rules": {
    "flowtype/sort-keys": [
      2,
      "asc"
    ]
  }
}
```

<!-- assertions sortKeys -->
