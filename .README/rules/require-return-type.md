### `require-return-type`

Requires that functions have return type annotation.

#### Options

You can skip all arrow functions by providing the `excludeArrowFunctions` option with `true`.

Alternatively, you can exclude a concise arrow function (e.g. `() => 2`). Provide `excludeArrowFunctions` with `expressionsOnly` for this.

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
              "excludeArrowFunctions": "expressionsOnly"
            }
        ]
    }
}
```

You can exclude or include specific tests with the `includeOnlyMatching` and `excludeMatching` rules.

```js
{
    "rules": {
        "flowtype/require-return-type": [
            2,
            "always",
            {
              "includeOnlyMatching": [
                  "^F.*",
                  "Ba(r|z)"
              ]
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
              "excludeMatching": [
                  "^F.*",
                  "Ba(r|z)"
              ]
            }
        ]
    }
}

```

Both rules take an array that can contain either strings or valid RegExp statements.

<!-- assertions requireReturnType -->
