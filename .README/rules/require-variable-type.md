### `require-variable-type`

Requires that all variable declarators have type annotations.

#### Options

You can exclude variables that match a certain regex by using `excludeVariableMatch`.

This excludes all parameters that start with an underscore (`_`).
The default pattern is `a^`, which doesn't match anything, i.e., all parameters are checked.

```js
{
    "rules": {
        "flowtype/require-variable-type": [
            2,
            {
              "excludeVariableMatch": "^_"
            }
        ]
    }
}
```


<!-- assertions requireVariableType -->
