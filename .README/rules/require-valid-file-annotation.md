### `require-valid-file-annotation`

This rule validates Flow file annotations.

This rule can optionally report missing or missed placed annotations, common typos (e.g. `// @floww`), and enforce a consistent annotation style.

#### Options

The rule has a string option:

* `"never"` (default): Never report files that are missing an `@flow` annotation.
* `"always"`: Always report files that are missing an `@flow` annotation

This rule has an object option:

* `"annotationStyle"` - Enforce a consistent file annotation style.
    * `"none"` (default): Either annotation style is accepted.
    * `"line"`: Require single line annotations (i.e. `// @flow`).
    * `"block"`: Require block annotations (i.e. `/* @flow */`).

* `"strict"` - Enforce a strict flow file annotation.
    * `false` (default): strict flow annotation is not required.
    * `true`: Require strict flow annotation (i.e. `// @flow strict`).

```js
{
  "rules": {
    "flowtype/require-valid-file-annotation": [
      2,
      "always"
    ]
  }
}

{
  "rules": {
    "flowtype/require-valid-file-annotation": [
      2,
      "always", {
        "annotationStyle": "block",
        "strict": true,
      }
    ]
  }
}
```

<!-- assertions requireValidFileAnnotation -->
