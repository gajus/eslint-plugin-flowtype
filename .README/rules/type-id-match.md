### `type-id-match`

Enforces a consistent naming pattern for type aliases.

### Options

This rule needs a text RegExp to operate with Its signature is as follows:

```js
{
    "rules": {
        "flowtype/type-id-match": [
            2,
            '^([A-Z][a-z0-9]+)+Type$'
        ]
    }
}
```

`'^([A-Z][a-z0-9]+)+Type$'` is the default pattern.

<!-- assertions typeIdMatch -->
