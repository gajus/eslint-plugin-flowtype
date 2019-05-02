### `require-readonly-react-props`

This rule validates that React props are marked as $ReadOnly. React props are immutable and modifying them could lead to unexpected results. Marking prop shapes as $ReadOnly avoids these issues.

The rule tries its best to work with both class and functional components. For class components, it does a fuzzy check for one of "Component", "PureComponent", "React.Component" and "React.PureComponent". It doesn't actually infer that those identifiers resolve to a proper `React.Component` object. 

For example, this will NOT be checked:

```js
import MyReact from 'react';
class Foo extends MyReact.Component { }
```

As a result, you can safely use other classes without getting warnings from this rule:

```js
class MyClass extends MySuperClass { }
```

React's functional components are hard to detect statically. The way it's done here is by searching for JSX within a function. When present, a function is considered a React component:

```js
// this gets checked
type Props = { };
function MyComponent(props: Props) {
    return <p />;
}

// this doesn't get checked since no JSX is present in a function
type Options = { };
function SomeHelper(options: Options) {
    // ...
}

// this doesn't get checked since no JSX is present directly in a function
function helper() { return <p /> }
function MyComponent(props: Props) {
    return helper();
}
```

The rule only works for locally defined props that are marked with a `$ReadOnly`. It doesn't work with imported props or props marked as read-only via covariant notation:

```js
// the rule has no way of knowing whether ImportedProps are read-only
import { type ImportedProps } from './somewhere';
class Foo extends React.Component<ImportedProps> { }


// the rule doesn't check for covariant properties, even though technically this object is entirely read-only
type Props = {|
    +foo: string
|};
class Bar extends React.Component<Props> { }
```


```js
{
    "rules": {
        "flowtype/require-readonly-react-props": 2
    }
}
```


<!-- assertions requireReadOnlyReactProps -->