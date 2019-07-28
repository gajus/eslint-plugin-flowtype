export default {
  invalid: [
    {
      code: '(foo) => {}',
      errors: [
        {
          message: 'Missing "foo" parameter type annotation.',
        },
      ],
    },
    {
      code: 'function x(foo) {}',
      errors: [
        {
          message: 'Missing "foo" parameter type annotation.',
        },
      ],
    },
    {
      code: 'function x(foo) {}',
      errors: [
        {
          message: 'Missing "foo" parameter type annotation.',
        },
      ],
      options: [
        {
          excludeArrowFunctions: true,
        },
      ],
    },
    {
      code: '(foo = \'FOO\') => {}',
      errors: [
        {
          message: 'Missing "foo" parameter type annotation.',
        },
      ],
    },
    {
      code: '(...foo) => {}',
      errors: [
        {
          message: 'Missing "foo" parameter type annotation.',
        },
      ],
    },
    {
      code: '({foo}) => {}',
      errors: [
        {
          message: 'Missing "{foo}" parameter type annotation.',
        },
      ],
    },
    {
      code: '([foo]) => {}',
      errors: [
        {
          message: 'Missing "[foo]" parameter type annotation.',
        },
      ],
    },
    {
      code: '({foo = 1} = {}) => {}',
      errors: [
        {
          message: 'Missing "{foo = 1}" parameter type annotation.',
        },
      ],
    },
    {
      code: '// @flow\n(foo) => {}',
      errors: [
        {
          message: 'Missing "foo" parameter type annotation.',
        },
      ],
      settings: {
        flowtype: {
          onlyFilesWithFlowAnnotation: true,
        },
      },
    },
    {
      code: '(foo) => {}',
      errors: [
        {
          message: 'Missing "foo" parameter type annotation.',
        },
      ],
      options: [
        {
          excludeArrowFunctions: 'expressionsOnly',
        },
      ],
    },
    {
      code: 'function x(foo) {}',
      errors: [
        {
          message: 'Missing "foo" parameter type annotation.',
        },
      ],
      options: [
        {
          excludeArrowFunctions: 'expressionsOnly',
        },
      ],
    },
    {
      code: '(_foo: number, bar) => {}',
      errors: [
        {
          message: 'Missing "bar" parameter type annotation.',
        },
      ],
      options: [
        {
          excludeParameterMatch: '^_',
        },
      ],
    },
    {
      code: '(_foo, bar) => {}',
      errors: [
        {
          message: 'Missing "bar" parameter type annotation.',
        },
      ],
      options: [
        {
          excludeParameterMatch: '^_',
        },
      ],
    },
  ],
  misconfigured: [
    {
      errors: [
        {
          data: {
            excludeOtherStuff: true,
          },
          dataPath: '[0]',
          keyword: 'additionalProperties',
          message: 'should NOT have additional properties',
          params: {
            additionalProperty: 'excludeOtherStuff',
          },
          parentSchema: {
            additionalProperties: false,
            properties: {
              excludeArrowFunctions: {
                enum: [
                  false,
                  true,
                  'expressionsOnly',
                ],
              },
              excludeParameterMatch: {
                type: 'string',
              },
            },
            type: 'object',
          },
          schema: false,
          schemaPath: '#/items/0/additionalProperties',
        },
      ],
      options: [{excludeOtherStuff: true}],
    },
    {
      errors: [
        {
          data: 'everything',
          dataPath: '[0].excludeArrowFunctions',
          keyword: 'enum',
          message: 'should be equal to one of the allowed values',
          params: {
            allowedValues: [
              false,
              true,
              'expressionsOnly',
            ],
          },
          parentSchema: {
            enum: [
              false,
              true,
              'expressionsOnly',
            ],
          },
          schema: [
            false,
            true,
            'expressionsOnly',
          ],
          schemaPath: '#/items/0/properties/excludeArrowFunctions/enum',
        },
      ],
      options: [{excludeArrowFunctions: 'everything'}],
    },
    {
      errors: [
        {
          data: 3,
          dataPath: '[0].excludeParameterMatch',
          keyword: 'type',
          message: 'should be string',
          params: {
            type: 'string',
          },
          parentSchema: {
            type: 'string',
          },
          schema: 'string',
          schemaPath: '#/items/0/properties/excludeParameterMatch/type',
        },
      ],
      options: [{excludeParameterMatch: 3}],
    },
  ],
  valid: [
    {
      code: '(foo: string) => {}',
    },
    {
      code: '(foo: string = \'FOO\') => {}',
    },
    {
      code: '(...foo: string) => {}',
    },
    {
      code: 'const f: Foo = (a, b) => 42;',
    },
    {
      code: '({foo}: {foo: string}) => {}',
    },
    {
      code: '([foo]: Array) => {}',
    },
    {
      code: 'type fn = (a: string, b: number) => number;\nconst f: fn = (a, b) => {}',
    },
    {
      code: '(foo) => {}',
      settings: {
        flowtype: {
          onlyFilesWithFlowAnnotation: true,
        },
      },
    },
    {
      code: '(foo) => {}',
      options: [
        {
          excludeArrowFunctions: true,
        },
      ],
    },
    {
      code: '(foo) => 3',
      options: [
        {
          excludeArrowFunctions: 'expressionsOnly',
        },
      ],
    },
    {
      code: '(_foo, bar: string) => {}',
      options: [
        {
          excludeParameterMatch: '^_',
        },
      ],
    },
    {
      code: '(_foo: number, bar: string) => {}',
      options: [
        {
          excludeParameterMatch: '^_',
        },
      ],
    },
    {
      code: '(foo) => {}',
      settings: {
        flowtype: {
          onlyFilesWithFlowAnnotation: true,
        },
      },
    },
  ],
};
