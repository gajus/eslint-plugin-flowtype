### `sort-type-union-intersection-members`

_The `--fix` option on the command line automatically fixes problems reported by this rule._

Enforces that members of a type union/intersection are sorted alphabetically.

#### Options

You can specify the sort order using `order`.

* `"asc"` (default) - enforce ascending sort order.
* `"desc"` - enforce descending sort order.

```js
{
  "rules": {
    "flowtype/sort-type-union-intersection-members": [
      2,
      {
        "order": "asc"
      }
    ]
  }
}
```

You can disable checking intersection types using `checkIntersections`.

* `true` (default) - enforce sort order of intersection members.
* `false` - do not enforce sort order of intersection members.

```js
{
  "rules": {
    "flowtype/sort-type-union-intersection-members": [
      2,
      {
        "checkIntersections": true
      }
    ]
  }
}
```

You can disable checking union types using `checkUnions`.

* `true` (default) - enforce sort order of union members.
* `false` - do not enforce sort order of union members.

```js
{
  "rules": {
    "flowtype/sort-type-union-intersection-members": [
      2,
      {
        "checkUnions": true
      }
    ]
  }
}
```

You can specify the ordering of groups using `groupOrder`.

Each member of the type is placed into a group, and then the rule sorts alphabetically within each group.
The ordering of groups is determined by this option.

* `keyword` - Keyword types (`any`, `string`, etc)
* `named` - Named types (`A`, `A['prop']`, `B[]`, `Array<C>`)
* `literal` - Literal types (`1`, `'b'`, `true`, etc)
* `function` - Function types (`() => void`)
* `object` - Object types (`{ a: string }`, `{ [key: string]: number }`)
* `tuple` - Tuple types (`[A, B, C]`)
* `intersection` - Intersection types (`A & B`)
* `union` - Union types (`A | B`)
* `nullish` - `null` and `undefined`

```js
{
  "rules": {
    "flowtype/sort-type-union-intersection-members": [
      2,
      {
        "groupOrder": [
          'keyword',
          'named',
          'literal',
          'function',
          'object',
          'tuple',
          'intersection',
          'union',
          'nullish',
        ]
      }
    ]
  }
}
```

<!-- assertions sortTypeUnionIntersectionMembers -->
