### `no-flow-fix-me-comments`

Disallows `$FlowFixMe` comment suppressions.

This is especially useful as a warning to ensure instances of `$FlowFixMe` in your codebase get fixed over time.

#### Options

This rule takes an optional RegExp that comments a text RegExp that makes the supression valid.

```js
{
    "rules": {
        "flowtype/no-flow-fix-me-comments": [
            1,
            "TODO\s+[0-9]+"
        ]
    }
}
```

<!-- assertions no-flow-fix-me-comments -->
