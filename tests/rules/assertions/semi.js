export default {
  invalid: [
    {
      code: 'type FooType = {}',
      errors: [
        {
          message: 'Missing semicolon.'
        }
      ],
      options: [],
      output: 'type FooType = {};'
    },
    {
      code: 'type FooType = {}',
      errors: [
        {
          message: 'Missing semicolon.'
        }
      ],
      options: ['always'],
      output: 'type FooType = {};'
    },
    {
      code: 'type FooType = {};',
      errors: [
        {
          message: 'Extra semicolon.'
        }
      ],
      options: ['never'],
      output: 'type FooType = {}'
    }
  ],
  valid: [
    {
      code: 'type FooType = {};'
    },
    {
      code: 'type FooType = {};',
      options: ['always']
    },
    {
      code: 'type FooType = { a: number;\n b: string;\n };',
      options: ['always']
    },
    {
      code: 'type FooType = { a: number;\n b: string;\n }',
      options: ['never']
    },
    {
      code: 'type FooType = {}',
      options: ['never']
    }
  ]
};
