### `type-import-style`

_The `--fix` option on the command line automatically fixes problems reported by this rule._

Enforces a particular style for type imports:

```
// 'identifier' style
import {type T, type U, type V} from '...';

// 'declaration' style
import type {T, U, V} from '...';

// 'mixed' style
import {T, type U, type V} from '...';
```

The rule has a string option:

* `"identifier"` (default): Enforces that type imports are all in the
  'identifier' style.
* `"declaration"`: Enforces that type imports are all in the 'declaration'
* `"prefer-declaration"`: Less restrictive than 'declaration'. Allow mixture of types and non-types imports. But if all
  imported are types the 'declaration' style is allowed only.


<!-- assertions typeImportStyle -->
