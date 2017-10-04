export default {
  invalid: [
    {
      code: 'type FooType = { a: number, c: number, b: string }',
      errors: [{message: 'Expected type annotations to be in ascending order. "b" should be before "c".'}]
    },
    {
      code: 'type FooType = { a: number, b: number, C: number }',
      errors: [{message: 'Expected type annotations to be in ascending order. "C" should be before "b".'}]
    },
    {
      code: 'type FooType = { 1: number, 2: number, 10: number }',
      errors: [{message: 'Expected type annotations to be in ascending order. "10" should be before "2".'}]
    },
    {
      code: 'type FooType = { a: number, b: number }',
      errors: [{message: 'Expected type annotations to be in descending order. "b" should be before "a".'}],
      options: ['desc']
    },
    {
      code: 'type FooType = { C: number, b: number, a: string }',
      errors: [{message: 'Expected type annotations to be in descending order. "b" should be before "C".'}],
      options: ['desc']
    },
    {
      code: 'type FooType = { 10: number, 2: number, 1: number }',
      errors: [{message: 'Expected type annotations to be in descending order. "2" should be before "10".'}],
      options: ['desc']
    },
    {
      code: 'type FooType = { a: number, c: number, C: number, b: string }',
      errors: [{message: 'Expected type annotations to be in insensitive ascending order. "b" should be before "C".'}],
      options: ['asc', {caseSensitive: false}]
    },
    {
      code: 'type FooType = { a: number, C: number, c: number, b: string }',
      errors: [{message: 'Expected type annotations to be in insensitive ascending order. "b" should be before "c".'}],
      options: ['asc', {caseSensitive: false}]
    },
    {
      code: 'type FooType = { 1: number, 10: number, 2: boolean }',
      errors: [{message: 'Expected type annotations to be in natural ascending order. "2" should be before "10".'}],
      options: ['asc', {natural: true}]
    },
    {
      code: 'type FooType = { a: number, c: number, b: string }',
      errors: [{message: 'Expected type annotations to be in ascending order. "b" should be before "c".'}],
      output: 'type FooType = { a: number, b: string, c: number }'
    },
    /* eslint-disable no-restricted-syntax */
    {
      code: `
        type FooType = {
          a: number,
          c: number,
          b: string,
        }
      `,
      errors: [{message: 'Expected type annotations to be in ascending order. "b" should be before "c".'}],
      output: `
        type FooType = {
          a: number,
          b: string,
          c: number,
        }
      `
    },
    {
      code: `
        type FooType = {
          a?: number,
          c: ?number,
          b: string,
        }
      `,
      errors: [{message: 'Expected type annotations to be in ascending order. "b" should be before "c".'}],
      output: `
        type FooType = {
          a?: number,
          b: string,
          c: ?number,
        }
      `
    },
    {
      code: `
        type FooType = {
          a: (number) => void,
          c: number,
          b: (param: string) => number,
        }
      `,
      errors: [{message: 'Expected type annotations to be in ascending order. "b" should be before "c".'}],
      output: `
        type FooType = {
          a: (number) => void,
          b: (param: string) => number,
          c: number,
        }
      `
    },
    {
      code: `
        type FooType = {
          a: number | string | boolean,
          c: number,
          b: (param: string) => number,
        }
      `,
      errors: [{message: 'Expected type annotations to be in ascending order. "b" should be before "c".'}],
      output: `
        type FooType = {
          a: number | string | boolean,
          b: (param: string) => number,
          c: number,
        }
      `
    },
    {
      code: `
        type FooType = {
          c: number,
          a: number | string | boolean,
          b: (param: string) => number,
        }
      `,
      errors: [{message: 'Expected type annotations to be in ascending order. "a" should be before "c".'}],
      output: `
        type FooType = {
          a: number | string | boolean,
          b: (param: string) => number,
          c: number,
        }
      `
    }
    /* eslint-enable no-restricted-syntax */
  ],
  misconfigured: [
    {
      errors: [
        {
          data: 'random',
          dataPath: '[0]',
          keyword: 'enum',
          message: 'should be equal to one of the allowed values',
          params: {
            allowedValues: [
              'asc',
              'desc'
            ]
          },
          parentSchema: {
            enum: [
              'asc',
              'desc'
            ],
            type: 'string'
          },
          schema: [
            'asc',
            'desc'
          ],
          schemaPath: '#/items/0/enum'
        }
      ],
      options: ['random']
    },
    {
      errors: [
        {
          data: {
            language: 'jp-JP'
          },
          dataPath: '[1]',
          keyword: 'additionalProperties',
          message: 'should NOT have additional properties',
          params: {
            additionalProperty: 'language'
          },
          parentSchema: {
            additionalProperties: false,
            properties: {
              caseSensitive: {
                type: 'boolean'
              },
              natural: {
                type: 'boolean'
              }
            },
            type: 'object'
          },
          schema: false,
          schemaPath: '#/items/1/additionalProperties'
        }
      ],
      options: ['asc', {language: 'jp-JP'}]
    },
    {
      errors: [
        {
          data: 'no',
          dataPath: '[1].caseSensitive',
          keyword: 'type',
          message: 'should be boolean',
          params: {
            type: 'boolean'
          },
          parentSchema: {
            type: 'boolean'
          },
          schema: 'boolean',
          schemaPath: '#/items/1/properties/caseSensitive/type'
        }
      ],
      options: ['desc', {caseSensitive: 'no'}]
    },
    {
      errors: [
        {
          data: 'no',
          dataPath: '[1].natural',
          keyword: 'type',
          message: 'should be boolean',
          params: {
            type: 'boolean'
          },
          parentSchema: {
            type: 'boolean'
          },
          schema: 'boolean',
          schemaPath: '#/items/1/properties/natural/type'
        }
      ],
      options: ['desc', {natural: 'no'}]
    }
  ],
  valid: [
    {
      code: 'type FooType = { a: number }'
    },
    {
      code: 'type FooType = { a: number, b: number, c: (boolean | number) }'
    },
    {
      code: 'type FooType = { C: number, a: string, b: foo }'
    },
    {
      code: 'type FooType = { 1: number, 10: number, 2: boolean }'
    },
    {
      code: 'type FooType = { c: number, b: number, a: number }',
      options: ['desc']
    },
    {
      code: 'type FooType = { b: string, a: {}, C: number }',
      options: ['desc']
    },
    {
      code: 'type FooType = { 2: number, 10: number, 1: boolean }',
      options: ['desc']
    },
    {
      code: 'type FooType = { a: number, b: number, c: number, C: number }',
      options: ['asc', {caseSensitive: false}]
    },
    {
      code: 'type FooType = { a: number, b: number, C: number, c: number }',
      options: ['asc', {caseSensitive: false}]
    },
    {
      code: 'type FooType = { 1:number, 2: number, 10: number }',
      options: ['asc', {natural: true}]
    },
    {
      code: 'type FooType = { b: number, a: number }',
      settings: {
        flowtype: {
          onlyFilesWithFlowAnnotation: true
        }
      }
    }
  ]
};
