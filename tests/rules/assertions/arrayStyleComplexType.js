export default {
  invalid: [
    {
      code: 'type X = (?string)[]',
      errors: [{message: 'Use "Array<ComplexType>", not "ComplexType[]"'}],
      output: 'type X = Array<?string>'
    },
    {
      code: 'type X = (?string)[]',
      errors: [{message: 'Use "Array<ComplexType>", not "ComplexType[]"'}],
      options: ['verbose'],
      output: 'type X = Array<?string>'
    },
    {
      code: 'type X = Array<?string>',
      errors: [{message: 'Use "ComplexType[]", not "Array<ComplexType>"'}],
      options: ['shorthand'],
      output: 'type X = (?string)[]'
    },
    {
      code: 'type X = Array<{foo: string}>',
      errors: [{message: 'Use "ComplexType[]", not "Array<ComplexType>"'}],
      options: ['shorthand'],
      output: 'type X = {foo: string}[]'
    },
    {
      code: 'type X = (string | number)[]',
      errors: [{message: 'Use "Array<ComplexType>", not "ComplexType[]"'}],
      output: 'type X = Array<string | number>'
    },
    {
      code: 'type X = (string & number)[]',
      errors: [{message: 'Use "Array<ComplexType>", not "ComplexType[]"'}],
      output: 'type X = Array<string & number>'
    },
    {
      code: 'type X = [string, number][]',
      errors: [{message: 'Use "Array<ComplexType>", not "ComplexType[]"'}],
      output: 'type X = Array<[string, number]>'
    },
    {
      code: 'type X = {foo: string}[]',
      errors: [{message: 'Use "Array<ComplexType>", not "ComplexType[]"'}],
      output: 'type X = Array<{foo: string}>'
    },
    {
      code: 'type X = (string => number)[]',
      errors: [{message: 'Use "Array<ComplexType>", not "ComplexType[]"'}],
      output: 'type X = Array<string => number>'
    }
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
              'shorthand'
            ]
          },
          parentSchema: {
            enum: [
              'verbose',
              'shorthand'
            ],
            type: 'string'
          },
          schema: [
            'verbose',
            'shorthand'
          ],
          schemaPath: '#/items/0/enum'
        }
      ],
      options: ['normal']
    }
  ],
  valid: [
    {
      code: 'type X = Array<?string>'
    },
    {
      code: 'type X = Array<?string>',
      options: ['verbose']
    },
    {
      code: 'type X = (?string)[]',
      options: ['shorthand']
    },
    {
      code: 'type X = Array<string>',
      options: ['shorthand']
    },
    {
      code: 'type X = Array<?string>',
      options: ['shorthand'],
      settings: {
        flowtype: {
          onlyFilesWithFlowAnnotation: true
        }
      }
    }
  ]
};
