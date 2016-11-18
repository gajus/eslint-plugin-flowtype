export default {
  invalid: [
    {
      code: 'type X = bool',
      errors: [{message: 'Use "boolean", not "bool"'}],
      output: 'type X = boolean'
    },
    {
      code: 'type X = bool',
      errors: [{message: 'Use "boolean", not "bool"'}],
      options: ['boolean'],
      output: 'type X = boolean'
    },
    {
      code: 'type X = boolean',
      errors: [{message: 'Use "bool", not "boolean"'}],
      options: ['bool'],
      output: 'type X = bool'
    }
  ],
  valid: [
    {
      code: 'type X = boolean'
    },
    {
      code: 'type X = boolean',
      options: ['boolean']
    },
    {
      code: 'type X = bool',
      options: ['bool']
    },
    {
      code: 'type X = bool',
      options: ['boolean'],
      settings: {
        flowtype: {
          onlyFilesWithFlowAnnotation: true
        }
      }
    }
  ]
};
