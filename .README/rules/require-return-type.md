### `require-return-type`

Requires that functions have return type annotation.

#### Options

You can skip all arrow functions by providing the `excludeArrowFunctions` option with `true`.

Alternatively, you can want to exclude only concise arrow functions (e.g. `() => 2`). Provide `excludeArrowFunctions` with `conciseOnly` for this.

```js
{
    "rules": {
        "flowtype/require-return-type": [
            2,
            "always",
            {
              "excludeArrowFunctions": true
            }
        ]
    }
}

{
    "rules": {
        "flowtype/require-return-type": [
            2,
            "always",
            {
              "excludeArrowFunctions": "conciseOnly"
            }
        ]
    }
}
```

<!-- assertions requireReturnType -->
