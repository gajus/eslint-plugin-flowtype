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
    },
    {
      code: 'opaque type FooType = {}',
      errors: [
        {
          message: 'Missing semicolon.'
        }
      ],
      options: [],
      output: 'opaque type FooType = {};'
    }
  ],
  misconfigured: [
    {
      errors: [
        {
          data: 'temporarily',
          dataPath: '[0]',
          keyword: 'enum',
          message: 'should be equal to one of the allowed values',
          params: {
            allowedValues: [
              'always',
              'never'
            ]
          },
          parentSchema: {
            enum: [
              'always',
              'never'
            ],
            type: 'string'
          },
          schema: [
            'always',
            'never'
          ],
          schemaPath: '#/items/0/enum'
        }
      ],
      options: ['temporarily']
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
    },
    {
      code: 'type FooType = {}',
      settings: {
        flowtype: {
          onlyFilesWithFlowAnnotation: true
        }
      }
    },
    {
      code: 'opaque type FooType = {};'
    }
  ]
};
