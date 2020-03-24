### `require-exact-type`

_The `--fix` option on the command line automatically fixes problems reported by this rule._

This rule enforces [exact object types](https://flow.org/en/docs/types/objects/#toc-exact-object-types).

#### Options

The rule has one string option:

* `"always"` (default): Report all object type definitions that aren't exact.
* `"never"`: Report all object type definitions that are exact.

```js
{
  "rules": {
    "flowtype/require-exact-type": [
      2,
      "always"
    ]
  }
}

{
  "rules": {
    "flowtype/require-exact-type": [
      2,
      "never"
    ]
  }
}
```

<!-- assertions requireExactType -->
