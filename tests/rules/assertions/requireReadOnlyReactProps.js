export default {
  invalid: [

    // class components
    {
      code: 'type Props = { }; class Foo extends React.Component<Props> { }',
      errors: [
        {
          message: 'You gotta use $ReadOnly for Props'
        }
      ]
    },
    {
      code: 'type OtherProps = { foo: string }; class Foo extends React.Component<OtherProps> { }',
      errors: [
        {
          message: 'You gotta use $ReadOnly for OtherProps'
        }
      ]
    },
    {
      code: 'class Foo extends React.Component<{}> { }',
      errors: [
        {
          message: 'You gotta use $ReadOnly for class Foo'
        }
      ]
    },
    {
      code: 'type Props = { bar: {} }; class Foo extends React.Component<Props, State> { }',
      errors: [
        {
          message: 'You gotta use $ReadOnly for Props'
        }
      ]
    },
    {
      code: 'type Props = { }; class Foo extends Component<Props> { }',
      errors: [
        {
          message: 'You gotta use $ReadOnly for Props'
        }
      ]
    },
    {
      code: 'type Props = { }; class Foo extends PureComponent<Props> { }',
      errors: [
        {
          message: 'You gotta use $ReadOnly for Props'
        }
      ]
    },
    {
      code: 'class Foo extends React.Component<UnknownProps> { }',
      errors: [
        {
          message: 'You gotta use $ReadOnly for UnknownProps'
        }
      ]
    },

    // functional components
    {
      code: 'type Props = { }; function Foo(props: Props) { return <p /> }',
      errors: [
        {
          message: 'You gotta use $ReadOnly for Props'
        }
      ]
    },
    {
      code: 'type Props = { }; function Foo(props: Props) { return foo ? <p /> : <span /> }',
      errors: [
        {
          message: 'You gotta use $ReadOnly for Props'
        }
      ]
    },
    {
      code: 'function Foo(props: {}) { return <p /> }',
      errors: [
        {
          message: 'You gotta use $ReadOnly for component Foo'
        }
      ]
    },
    {
      code: 'function Foo(props: UnknownProps) { return <p /> }',
      errors: [
        {
          message: 'You gotta use $ReadOnly for UnknownProps'
        }
      ]
    }
  ],
  valid: [

    // class components
    {
      code: 'class Foo extends React.Component<$ReadOnly<{}>> { }'
    },
    {
      code: 'type Props = $ReadOnly<{}>; class Foo extends React.Component<Props> { }'
    },
    {
      code: 'type Props = $ReadOnly<{}>; class Foo extends React.PureComponent<Props> { }'
    },
    {
      code: 'class Foo extends React.Component<$ReadOnly<{}, State>> { }'
    },
    {
      code: 'type Props = $ReadOnly<{}>; class Foo extends React.Component<Props, State> { }'
    },
    {
      code: 'type Props = $ReadOnly<{}>; class Foo extends Component<Props> { }'
    },
    {
      code: 'type Props = $ReadOnly<{}>; class Foo extends PureComponent<Props> { }'
    },
    {
      code: 'type FooType = {}; class Foo extends Bar<FooType> { }'
    },

    // functional components
    {
      code: 'type Props = {}; function Foo() { }'
    },
    {
      code: 'type Props = $ReadOnly<{}>; function Foo(props: Props) { }'
    },
    {
      code: 'type Props = {}; function Foo(props: OtherProps) { }'
    }
  ]
};
