### `no-mutable-array`

_The `--fix` option on the command line automatically fixes problems reported by this rule._

Requires use of [`$ReadOnlyArray`](https://github.com/facebook/flow/blob/v0.46.0/lib/core.js#L185) instead of just `Array` or array [shorthand notation](https://flow.org/en/docs/types/arrays/#toc-array-type-shorthand-syntax). `$ReadOnlyArray` is immutable array collection type and the superclass of Array and tuple types in Flow. Use of `$ReadOnlyArray` instead of `Array` can solve some "problems" in typing with Flow (e.g., [1](https://github.com/facebook/flow/issues/3425), [2](https://github.com/facebook/flow/issues/4251)).

General reasons for using immutable data structures:

* They are simpler to construct, test, and use
* They help to avoid temporal coupling
* Their usage is side-effect free (no defensive copies)
* Identity mutability problem is avoided
* They always have failure atomicity
* They are much easier to cache

Note that initialization of a variable with an empty array is considered valid (e.g., `const values: Array<string> = [];`). This behavior resembles the behavior of Flow's [unsealed objects](https://flow.org/en/docs/types/objects/#toc-unsealed-objects), as it is assumed that empty array is intended to be mutated.

<!-- assertions noMutableArray -->
