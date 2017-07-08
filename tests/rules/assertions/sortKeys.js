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
    }
  ],
  misconfigured: [
    {
      errors: [
        {
          field: 'data["0"]',
          message: 'must be an enum value',
          type: 'string',
          value: 'random'
        }
      ],
      options: ['random']
    },
    {
      errors: [
        {
          field: 'data["1"]',
          message: 'has additional properties',
          type: 'object',
          value: 'data["1"].language'
        }
      ],
      options: ['asc', {language: 'jp-JP'}]
    },
    {
      errors: [
        {
          field: 'data["1"].caseSensitive',
          message: 'is the wrong type',
          type: 'boolean',
          value: 'no'
        }
      ],
      options: ['desc', {caseSensitive: 'no'}]
    },
    {
      errors: [
        {
          field: 'data["1"].natural',
          message: 'is the wrong type',
          type: 'boolean',
          value: 'no'
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
