### `interface-id-match`

Enforces a consistent naming pattern for interfaces.

#### Options

This rule requires a text RegExp:

```js
{
    "rules": {
        "flowtype/interface-id-match": [
            2,
            "^([A-Z][a-z0-9]*)+Type$"
        ]
    }
}
```

`'^([A-Z][a-z0-9]*)+Type$$'` is the default pattern.

<!-- assertions interfaceIdMatch -->
