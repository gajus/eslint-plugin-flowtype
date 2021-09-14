export default {
  invalid: [
    {
      code: '// $FlowFixMe I am doing something evil here\nconst text = \'HELLO\';',
      errors: [
        {
          message: '$FlowFixMe is treated as `any` and must be fixed.',
        },
      ],
    },
    {
      code: '// $FlowFixMe I am doing something evil here\nconst text = \'HELLO\';',
      errors: [
        {
          message: '$FlowFixMe is treated as `any` and must be fixed. Fix it or match `/TODO [0-9]+/`.',
        },
      ],
      options: [
        'TODO [0-9]+',
      ],
    },
    {
      code: '// $FlowFixMe TODO abc 47 I am doing something evil here\nconst text = \'HELLO\';',
      errors: [
        {
          message: '$FlowFixMe is treated as `any` and must be fixed. Fix it or match `/TODO [0-9]+/`.',
        },
      ],
      options: [
        'TODO [0-9]+',
      ],
    },
    {
      code: '// $$FlowFixMeProps I am doing something evil here\nconst text = \'HELLO\';',
      errors: [
        {
          message: '$FlowFixMe is treated as `any` and must be fixed.',
        },
      ],
    },
    {
      code: '// $FlowFixMeProps I am doing something evil here\nconst text = \'HELLO\';',
      errors: [
        {
          message: '$FlowFixMe is treated as `any` and must be fixed. Fix it or match `/TODO [0-9]+/`.',
        },
      ],
      options: [
        'TODO [0-9]+',
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
      code: 'const text = \'HELLO\';',
    },
    {
      code: '// $FlowFixMe TODO 48\nconst text = \'HELLO\';',
      options: [
        'TODO [0-9]+',
      ],
    },
  ],
};
