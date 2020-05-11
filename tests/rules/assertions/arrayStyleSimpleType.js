export default {
  invalid: [
    {
      code: 'type X = string[]',
      errors: [{message: 'Use "Array<string>", not "string[]"'}],
      output: 'type X = Array<string>',
    },
    {
      code: 'type X = string[]',
      errors: [{message: 'Use "Array<string>", not "string[]"'}],
      options: ['verbose'],
      output: 'type X = Array<string>',
    },
    {
      code: 'type X = Array<string>',
      errors: [{message: 'Use "string[]", not "Array<string>"'}],
      options: ['shorthand'],
      output: 'type X = string[]',
    },
    {
      code: 'type X = Date[]',
      errors: [{message: 'Use "Array<Date>", not "Date[]"'}],
      output: 'type X = Array<Date>',
    },
    {
      code: 'type X = Promise<string>[]',
      errors: [{message: 'Use "Array<Promise<string>>", not "Promise<string>[]"'}],
      output: 'type X = Array<Promise<string>>',
    },
    {
      code: 'type X = $Keys<{foo: string}>[]',
      errors: [{message: 'Use "Array<$Keys<{foo: string}>>", not "$Keys<{foo: string}>[]"'}],
      output: 'type X = Array<$Keys<{foo: string}>>',
    },
    {
      code: 'type X = any[]',
      errors: [{message: 'Use "Array<any>", not "any[]"'}],
      output: 'type X = Array<any>',
    },
    {
      code: 'type X = mixed[]',
      errors: [{message: 'Use "Array<mixed>", not "mixed[]"'}],
      output: 'type X = Array<mixed>',
    },
    {
      code: 'type X = void[]',
      errors: [{message: 'Use "Array<void>", not "void[]"'}],
      output: 'type X = Array<void>',
    },
    {
      code: 'type X = null[]',
      errors: [{message: 'Use "Array<null>", not "null[]"'}],
      output: 'type X = Array<null>',
    },
    {
      code: 'type X = string[][]',
      errors: [
        {message: 'Use "Array<string[]>", not "string[][]"'},
        {message: 'Use "Array<string>", not "string[]"'},
      ],
      output: 'type X = Array<string[]>',
    },
    {
      code: 'type X = Promise<{\n    foo: string,\n    bar: number\n}>[]',
      errors: [{message: 'Use "Array<Promise<{ foo: string, bar: number }>>", not "Promise<{ foo: string, bar: number }>[]"'}],
      output: 'type X = Array<Promise<{\n    foo: string,\n    bar: number\n}>>',
    },
    {
      code: 'type X = Promise<{\n    foo: string,\n    bar: number,\n    quo: boolean\n}>[]',
      errors: [{message: 'Use "Array<Type>", not "Type[]"'}],
      output: 'type X = Array<Promise<{\n    foo: string,\n    bar: number,\n    quo: boolean\n}>>',
    },
  ],
  misconfigured: [
    {
      errors: [
        {
          data: 'normal',
          dataPath: '[0]',
          keyword: 'enum',
          message: 'should be equal to one of the allowed values',
          params: {
            allowedValues: [
              'verbose',
              'shorthand',
            ],
          },
          parentSchema: {
            enum: [
              'verbose',
              'shorthand',
            ],
            type: 'string',
          },
          schema: [
            'verbose',
            'shorthand',
          ],
          schemaPath: '#/items/0/enum',
        },
      ],
      options: ['normal'],
    },
  ],
  valid: [
    {
      code: 'type X = Array<string>',
    },
    {
      code: 'type X = Array<string>',
      options: ['verbose'],
    },
    {
      code: 'type X = string[]',
      options: ['shorthand'],
    },
    {
      code: 'type X = Array<Array<string>>',
    },
    {
      code: 'type X = (?string)[]',
      options: ['verbose'],
    },
    {
      code: 'type X = string[]',
      options: ['verbose'],
      settings: {
        flowtype: {
          onlyFilesWithFlowAnnotation: true,
        },
      },
    },

    // While this isn't valid flow, we shouldn't disallow it.
    {
      code: 'type X = Array',
    },

    // Valid flow.
    {
      code: 'type X = typeof Array',
    },
  ],
};
