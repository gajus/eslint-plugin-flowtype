### `require-indexer-name`

This rule validates Flow object indexer name.

#### Options

The rule has a string option:

* `"never"` (default): Never report files that are missing an indexer key name.
* `"always"`: Always report files that are missing an indexer key name.

```js
{
  "rules": {
    "flowtype/require-indexer-name": [
      2,
      "always"
    ]
  }
}
```

<!-- assertions requireIndexerName -->
