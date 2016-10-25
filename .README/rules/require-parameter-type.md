### `require-parameter-type`

Requires that all function parameters have type annotations.

#### Options

You can skip all arrow functions by providing the `excludeArrowFunctions` option with `true`.

Alternatively, you can want to exclude only concise arrow functions (e.g. `x => x * 2`). Provide `excludeArrowFunctions` with `expressionsOnly` for this.

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
              "excludeArrowFunctions": "expressionsOnly"
            }
        ]
    }
}
```

You can exclude parameters that match a certain regex by using `excludeParameterMatch`.

```js
{
    "rules": {
        "flowtype/require-parameter-type": [
            2,
            {
              "excludeParameterMatch": "^_"
            }
        ]
    }
}
```

This excludes all parameters that start with an underscore (`_`).
The default pattern is `a^`, which doesn't match anything, i.e., all parameters are checked.

<!-- assertions requireParameterType -->
