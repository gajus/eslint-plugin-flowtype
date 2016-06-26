### `require-valid-file-annotation`

Makes sure that files have a valid `@flow` annotation. It will report annotations with typos (such as `// @floww`) or not placed at the top of the file, and optionaly missing annotations.

#### Options

By default, this rule won't complain if there is no `@flow` annotation at all in the file. Passing a `"always"` option reports files missing those annotations as well.

```js
{
    "rules": {
        "flowtype/require-valid-file-annotation": [
            2,
            "always"
        ]
    }
}
```

<!-- assertions requireValidFileAnnotation -->
