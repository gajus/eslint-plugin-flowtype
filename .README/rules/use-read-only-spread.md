### `use-read-only-spread`

Warns against accidentally creating an object which is no longer read-only because of how spread operator works in Flow. Imagine the following code:

```flow js
type INode = {|
  +type: string,
|};

type Identifier = {|
  ...INode,
  +name: string,
|};
```

You might expect the identifier name to be read-only, however, that's not true ([flow.org/try](https://flow.org/try/#0C4TwDgpgBAkgcgewCbQLxQN4B8BQUoDUokAXFAM7ABOAlgHYDmANDlgL4DcOOx0MKdYDQBmNCFSjpseKADp58ZBBb4CdAIYBbCGUq1GLdlxwBjBHUpQAHmX4RBIsRKlQN2sgHIPTKL08eoTm4rWV5JKA8AZQALBABXABskVwRgKAAjaAB3WmB1dISIAEIPLhC3NAiY+KSUtMyoHJo8guLSnCA)):

```flow js
const x: Identifier = { name: '', type: '' };

x.type = 'must NOT be writable!'; // No Flow error
x.name = 'must NOT be writable!'; // No Flow error
```

This rule suggests to use `$ReadOnly<…>` to prevent accidental loss of readonly-ness:

```flow js
type Identifier = $ReadOnly<{|
  ...INode,
  +name: string,
|}>;

const x: Identifier = { name: '', type: '' };

x.type = 'must NOT be writable!'; // $FlowExpectedError[cannot-write]
x.name = 'must NOT be writable!'; // $FlowExpectedError[cannot-write]
```

<!-- assertions useReadOnlySpread -->
