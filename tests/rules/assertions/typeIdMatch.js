export default {
  invalid: [
    {
      code: 'opaque type foo = {};',
      errors: [
        {
          message: 'Type identifier \'foo\' does not match pattern \'/^([A-Z][a-z0-9]*)+Type$/\'.',
        },
      ],
    },
    {
      code: 'type foo = {};',
      errors: [
        {
          message: 'Type identifier \'foo\' does not match pattern \'/^([A-Z][a-z0-9]*)+Type$/\'.',
        },
      ],
    },
    {
      code: 'type FooType = {};',
      errors: [
        {
          message: 'Type identifier \'FooType\' does not match pattern \'/^foo$/\'.',
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
          message: 'must be string',
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
      code: 'type FooType = {};',
    },
    {
      code: 'type foo = {};',
      options: [
        '^foo$',
      ],
    },
    {
      code: 'type foo = {};',
      settings: {
        flowtype: {
          onlyFilesWithFlowAnnotation: true,
        },
      },
    },
  ],
};
