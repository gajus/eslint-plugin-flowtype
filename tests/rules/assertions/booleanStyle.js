export default {
  invalid: [
    {
      code: 'type X = bool',
      errors: [{message: 'Use "boolean", not "bool"'}],
      output: 'type X = boolean',
    },
    {
      code: 'type X = bool',
      errors: [{message: 'Use "boolean", not "bool"'}],
      options: ['boolean'],
      output: 'type X = boolean',
    },
    {
      code: 'type X = boolean',
      errors: [{message: 'Use "bool", not "boolean"'}],
      options: ['bool'],
      output: 'type X = bool',
    },
  ],
  misconfigured: [
    {
      errors: [
        {
          data: 'integer',
          dataPath: '[0]',
          keyword: 'enum',
          message: 'must be equal to one of the allowed values',
          params: {
            allowedValues: [
              'bool',
              'boolean',
            ],
          },
          parentSchema: {
            enum: [
              'bool',
              'boolean',
            ],
            type: 'string',
          },
          schema: [
            'bool',
            'boolean',
          ],
          schemaPath: '#/items/0/enum',
        },
      ],
      options: ['integer'],
    },
  ],
  valid: [
    {
      code: 'type X = boolean',
    },
    {
      code: 'type X = boolean',
      options: ['boolean'],
    },
    {
      code: 'type X = bool',
      options: ['bool'],
    },
    {
      code: 'type X = bool',
      options: ['boolean'],
      settings: {
        flowtype: {
          onlyFilesWithFlowAnnotation: true,
        },
      },
    },
  ],
};
