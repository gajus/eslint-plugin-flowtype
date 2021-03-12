export default {
  invalid: [
    {
      code: 'type X = React$AbstractComponent<Config, Instance>',
      errors: [
        'Type identifier \'React$AbstractComponent\' is not allowed. Use \'React.AbstractComponent\' instead.',
      ],
    },
    {
      code: 'type X = React$ChildrenArray<string>',
      errors: [
        'Type identifier \'React$ChildrenArray\' is not allowed. Use \'React.ChildrenArray\' instead.',
      ],
    },
    {
      code: 'type X = React$ComponentType<Props>',
      errors: [
        'Type identifier \'React$ComponentType\' is not allowed. Use \'React.ComponentType\' instead.',
      ],
    },
    {
      code: 'type X = React$Config<Prosp, DefaultProps>',
      errors: ['Type identifier \'React$Config\' is not allowed. Use \'React.Config\' instead.'],
    },
    {
      code: 'type X = React$Element<typeof Component>',
      errors: ['Type identifier \'React$Element\' is not allowed. Use \'React.Element\' instead.'],
    },
    {
      code: 'type X = React$ElementConfig<typeof Component>',
      errors: [
        'Type identifier \'React$ElementConfig\' is not allowed. Use \'React.ElementConfig\' instead.',
      ],
    },
    {
      code: 'type X = React$ElementProps<typeof Component>',
      errors: [
        'Type identifier \'React$ElementProps\' is not allowed. Use \'React.ElementProps\' instead.',
      ],
    },
    {
      code: 'type X = React$ElementRef<typeof Component>',
      errors: [
        'Type identifier \'React$ElementRef\' is not allowed. Use \'React.ElementRef\' instead.',
      ],
    },
    {
      code: 'type X = React$ElementType',
      errors: [
        'Type identifier \'React$ElementType\' is not allowed. Use \'React.ElementType\' instead.',
      ],
    },
    {
      code: 'type X = React$Key',
      errors: ['Type identifier \'React$Key\' is not allowed. Use \'React.Key\' instead.'],
    },
    {
      code: 'type X = React$Node',
      errors: ['Type identifier \'React$Node\' is not allowed. Use \'React.Node\' instead.'],
    },
    {
      code: 'type X = React$Ref<typeof Component>',
      errors: ['Type identifier \'React$Ref\' is not allowed. Use \'React.Ref\' instead.'],
    },
    {
      code: 'type X = React$StatelessFunctionalComponent<Props>',
      errors: [
        'Type identifier \'React$StatelessFunctionalComponent\' is not allowed. Use \'React.StatelessFunctionalComponent\' instead.',
      ],
    },
  ],

  valid: [
    {code: 'type X = React.AbstractComponent<Config, Instance>'},
    {code: 'type X = React.ChildrenArray<string>'},
    {code: 'type X = React.ComponentType<Props>'},
    {code: 'type X = React.Config<Props, DefaultProps>'},
    {code: 'type X = React.Element<typeof Component>'},
    {code: 'type X = React.ElementConfig<typeof Component>'},
    {code: 'type X = React.ElementProps<typeof Component>'},
    {code: 'type X = React.ElementRef<typeof Component>'},
    {code: 'type X = React.ElementType'},
    {code: 'type X = React.Key'},
    {code: 'type X = React.Node'},
    {code: 'type X = React.Ref<typeof Component>'},
    {code: 'type X = React.StatelessFunctionalComponent<Props>'},

    // valid custom type:
    {code: 'type X = React$Rocks'},
  ],
};
