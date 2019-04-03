### `type-import-style`

_The `--fix` option on the command line automatically fixes problems reported by this rule._

Enforces a particular style for type imports:

```
// 'identifier' style
import {type T, type U, type V} from '...';

// 'declaration' style
import type {T, U, V} from '...';
```

#### Options

The rule has a string option:

* `"identifier"` (default): Enforces that type imports are all in the
  'identifier' style.
* `"declaration"`: Enforces that type imports are all in the 'declaration'
  style.

This rule has an object option:

* `ignoreTypeDefault` - if `true`, when in "identifier" mode, default type imports will be ignored. Default is `false`.

<!-- assertions typeImportStyle -->
