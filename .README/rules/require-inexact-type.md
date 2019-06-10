### `require-inexact-type`

This rule enforces explicit inexact object types.

#### Options

The rule has one string option:

- `"always"` (default): Report all object type definitions that aren't explicit inexact, but ignore exact objects.
- `"never"`: Report all object type definitions that are explicit inexact.

```js
{
  "rules": {
    "flowtype/require-inexact-type": [
      2,
      "always"
    ]
  }
}

{
  "rules": {
    "flowtype/require-inexact-type": [
      2,
      "never"
    ]
  }
}
```

<!-- assertions requireInexactType -->
