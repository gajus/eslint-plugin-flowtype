export default {
  invalid: [
    {
      code: 'type X = (?string)[]',
      errors: [{message: 'Use "Array<?string>", not "(?string)[]"'}],
      output: 'type X = Array<?string>',
    },
    {
      code: 'type X = (?string)[]',
      errors: [{message: 'Use "Array<?string>", not "(?string)[]"'}],
      options: ['verbose'],
      output: 'type X = Array<?string>',
    },
    {
      code: 'type X = Array<?string>',
      errors: [{message: 'Use "(?string)[]", not "Array<?string>"'}],
      options: ['shorthand'],
      output: 'type X = (?string)[]',
    },
    {
      code: 'type X = Array<{foo: string}>',
      errors: [{message: 'Use "{foo: string}[]", not "Array<{foo: string}>"'}],
      options: ['shorthand'],
      output: 'type X = {foo: string}[]',
    },
    {
      code: 'type X = (string | number)[]',
      errors: [{message: 'Use "Array<string | number>", not "(string | number)[]"'}],
      output: 'type X = Array<string | number>',
    },
    {
      code: 'type X = (string & number)[]',
      errors: [{message: 'Use "Array<string & number>", not "(string & number)[]"'}],
      output: 'type X = Array<string & number>',
    },
    {
      code: 'type X = [string, number][]',
      errors: [{message: 'Use "Array<[string, number]>", not "[string, number][]"'}],
      output: 'type X = Array<[string, number]>',
    },
    {
      code: 'type X = {foo: string}[]',
      errors: [{message: 'Use "Array<{foo: string}>", not "{foo: string}[]"'}],
      output: 'type X = Array<{foo: string}>',
    },
    {
      code: 'type X = (string => number)[]',
      errors: [{message: 'Use "Array<string => number>", not "(string => number)[]"'}],
      output: 'type X = Array<string => number>',
    },
    {
      code: 'type X = {\n    foo: string,\n    bar: number\n}[]',
      errors: [{message: 'Use "Array<{ foo: string, bar: number }>", not "{ foo: string, bar: number }[]"'}],
      output: 'type X = Array<{\n    foo: string,\n    bar: number\n}>',
    },
    {
      code: 'type X = {\n    foo: string,\n    bar: number,\n    quo: boolean,\n    hey: Date\n}[]',
      errors: [{message: 'Use "Array<Type>", not "Type[]"'}],
      output: 'type X = Array<{\n    foo: string,\n    bar: number,\n    quo: boolean,\n    hey: Date\n}>',
    },
  ],
  misconfigured: [
    {
      errors: [
        {
          data: 'normal',
          dataPath: '[0]',
          keyword: 'enum',
          message: 'must be equal to one of the allowed values',
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
      code: 'type X = Array<?string>',
    },
    {
      code: 'type X = Array<?string>',
      options: ['verbose'],
    },
    {
      code: 'type X = (?string)[]',
      options: ['shorthand'],
    },
    {
      code: 'type X = Array<string>',
      options: ['shorthand'],
    },
    {
      code: 'type X = Array<?string>',
      options: ['shorthand'],
      settings: {
        flowtype: {
          onlyFilesWithFlowAnnotation: true,
        },
      },
    },
  ],
};
