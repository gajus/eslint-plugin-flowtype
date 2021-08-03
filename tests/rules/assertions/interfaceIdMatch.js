export default {
  invalid: [
    {
      code: 'interface foo{};',
      errors: [
        {
          message: 'Interface identifier \'foo\' does not match pattern \'/^([A-Z][a-z0-9]*)+Type$/\'.',
        },
      ],
    },
    {
      code: 'interface FooType{};',
      errors: [
        {
          message: 'Interface identifier \'FooType\' does not match pattern \'/^foo$/\'.',
        },
      ],
      options: [
        '^foo$',
      ],
    },
  ],
  misconfigured: [
    {
      errors: [
        {
          data: 7,
          dataPath: '[0]',
          keyword: 'type',
          message: 'should be string',
          params: {
            type: 'string',
          },
          parentSchema: {
            type: 'string',
          },
          schema: 'string',
          schemaPath: '#/items/0/type',
        },
      ],
      options: [7],
    },
  ],
  valid: [
    {
      code: 'interface FooType {};',
    },
    {
      code: 'interface foo {};',
      options: [
        '^foo$',
      ],
    },
    {
      code: 'interface foo {};',
      settings: {
        flowtype: {
          onlyFilesWithFlowAnnotation: true,
        },
      },
    },
  ],
};
