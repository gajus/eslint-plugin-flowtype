### `no-flow-fix-me-in-strict-files`

This rule validates that no error suppression comments (e.g. `$FlowFixMe`) are used in `// @flow strict` (or `// @flow strict-local`) files.

This codifies the best practices [as documented here](https://flow.org/en/docs/strict/#toc-adoption):

> _"Do not add `$FlowFixMe` to suppress the new errors as they appear; just add `@flow strict` once all issues have been resolved."_

#### Options

The rule has no options.

```js
{
  "rules": {
    "flowtype/no-flow-fix-me-in-strict-files": 2,
  }
}
```

<!-- assertions noFlowFixMeInStrictFiles -->
