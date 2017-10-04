### `no-unused-expressions`

An extension of [ESLint's `no-unused-expressions`](https://eslint.org/docs/rules/no-unused-expressions).
This rule ignores type cast expressions, but otherwise behaves the same as ESLint's
`no-unused-expressions`.

Bare type casts are useful, for example to assert the exhaustiveness of a `switch`:

```js
type Action
  = { type: 'FOO', doFoo: (_: number) => void }
  | { type: 'BAR', doBar: (_: string) => void };

type State = { foo: number, bar: string };

function runFooBar(action: Action, state: State): void {
  switch (action.type) {
    case 'FOO':
      doFoo(state.foo);
      break;
    case 'BAR':
      doBar(state.bar);
      break;
    default:
      (action: empty);  // type error when `Action` is extended with new types
      console.error(`Impossible action: ${action.toString()}`);
  }
}
```

This rule takes the same arguments as ESLint's `no-unused-expressions`. See
[that rule's documentation](https://eslint.org/docs/rules/no-unused-expressions) for details.

<!-- assertions noUnusedExpressions -->
