### `require-parameter-type`

Requires that all function parameters have type annotations.

#### Options

You can skip all arrow functions by providing the `excludeArrowFunctions` option with `true`.

Alternatively, you can want to exclude only concise arrow functions (e.g. `x => x * 2`). Provide `excludeArrowFunctions` with `conciseOnly` for this.

```js
{
    "rules": {
        "flowtype/require-parameter-type": [
            2,
            {
              "excludeArrowFunctions": true
            }
        ]
    }
}

{
    "rules": {
        "flowtype/require-parameter-type": [
            2,
            {
              "excludeArrowFunctions": "conciseOnly"
            }
        ]
    }
}
```

<!-- assertions requireParameterType -->
