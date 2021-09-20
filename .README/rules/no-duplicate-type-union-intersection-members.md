### `no-duplicate-type-union-intersection-members`

_The `--fix` option on the command line automatically fixes problems reported by this rule._

Checks for duplicate members of a type union/intersection.

#### Options

You can disable checking intersection types using `checkIntersections`.

* `true` (default) - check for duplicate members of intersection members.
* `false` - do not check for duplicate members of intersection members.

```js
{
  "rules": {
    "flowtype/no-duplicate-type-union-intersection-members": [
      2,
      {
        "checkIntersections": true
      }
    ]
  }
}
```

You can disable checking union types using `checkUnions`.

* `true` (default) - check for duplicate members of union members.
* `false` - do not check for duplicate members of union members.

```js
{
  "rules": {
    "flowtype/no-duplicate-type-union-intersection-members": [
      2,
      {
        "checkUnions": true
      }
    ]
  }
}
```
