### `sort-keys`

Enforces sorting of Object annotations.

This rule mirrors ESlint's [sort-keys](http://eslint.org/docs/rules/sort-keys) rule.

#### Options

The first option specifies sort order.

* `"asc"` (default) - enforce ascending sort order.
* `"desc"` - enforce descending sort order.

The second option takes an object with two possible properties.

* `caseSensitive` - if `true`, enforce case-sensitive sort order. Default is `true`.
* `natural` - if `true`, enforce [natural sort order](https://en.wikipedia.org/wiki/Natural_sort_order). Default is `false`.

```js
{
  "rules": {
    "flowtype/sort-keys": [
      2,
      "asc", {
        "caseSensitive": true,
        "natural": false
      }
    ]
  }
}
```

<!-- assertions sortKeys -->
