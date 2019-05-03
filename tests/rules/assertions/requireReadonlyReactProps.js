export default {
  invalid: [

    // class components
    {
      code: 'type Props = { }; class Foo extends React.Component<Props> { }',
      errors: [
        {
          message: 'Props must be $ReadOnly'
        }
      ]
    },
    {
      code: 'type OtherProps = { foo: string }; class Foo extends React.Component<OtherProps> { }',
      errors: [
        {
          message: 'OtherProps must be $ReadOnly'
        }
      ]
    },
    {
      code: 'class Foo extends React.Component<{}> { }',
      errors: [
        {
          message: 'Foo class props must be $ReadOnly'
        }
      ]
    },
    {
      code: 'type Props = { bar: {} }; class Foo extends React.Component<Props, State> { }',
      errors: [
        {
          message: 'Props must be $ReadOnly'
        }
      ]
    },
    {
      code: 'type Props = { }; class Foo extends Component<Props> { }',
      errors: [
        {
          message: 'Props must be $ReadOnly'
        }
      ]
    },
    {
      code: 'type Props = { }; class Foo extends PureComponent<Props> { }',
      errors: [
        {
          message: 'Props must be $ReadOnly'
        }
      ]
    },
    {
      code: 'class Foo extends React.Component<UnknownProps> { }',
      errors: [
        {
          message: 'UnknownProps must be $ReadOnly'
        }
      ]
    },

    // functional components
    {
      code: 'type Props = { }; function Foo(props: Props) { return <p /> }',
      errors: [
        {
          message: 'Props must be $ReadOnly'
        }
      ]
    },
    {
      code: 'type Props = { }; function Foo(props: Props) { return foo ? <p /> : <span /> }',
      errors: [
        {
          message: 'Props must be $ReadOnly'
        }
      ]
    },
    {
      code: 'function Foo(props: {}) { return <p /> }',
      errors: [
        {
          message: 'Foo component props must be $ReadOnly'
        }
      ]
    },
    {
      code: 'function Foo(props: UnknownProps) { return <p /> }',
      errors: [
        {
          message: 'UnknownProps must be $ReadOnly'
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
    {
      code: 'class Foo { }'
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
    },
    {
      code: 'function Foo() { return <p /> }'
    }
  ]
};
