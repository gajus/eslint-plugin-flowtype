### `newline-after-flow-annotation`

This rule requires an empty line after the Flow annotation.

#### Options

The rule has a string option:

* `"always"` (default): Enforces that `@flow` annotations be followed by an empty line, separated by newline (LF)
* `"always-windows"`: Identical to "always", but will use a CRLF when autofixing
* `"never"`: Enforces that `@flow` annotations are not followed by empty lines

```js
{
  "rules": {
    "flowtype/newline-after-flow-annotation": [
      2,
      "always"
    ]
  }
}
```


<!-- assertions newlineAfterFlowAnnotation -->
