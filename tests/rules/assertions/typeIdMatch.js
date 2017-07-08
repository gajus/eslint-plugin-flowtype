export default {
  invalid: [
    {
      code: 'type foo = {};',
      errors: [
        {
          message: 'Type identifier \'foo\' does not match pattern \'/^([A-Z][a-z0-9]*)+Type$/\'.'
        }
      ]
    },
    {
      code: 'type FooType = {};',
      errors: [
        {
          message: 'Type identifier \'FooType\' does not match pattern \'/^foo$/\'.'
        }
      ],
      options: [
        '^foo$'
      ]
    }
  ],
  misconfigured: [
    {
      errors: [
        {
          field: 'data["0"]',
          message: 'is the wrong type',
          type: 'string',
          value: 7
        }
      ],
      options: [7]
    }
  ],
  valid: [
    {
      code: 'type FooType = {};'
    },
    {
      code: 'type foo = {};',
      options: [
        '^foo$'
      ]
    },
    {
      code: 'type foo = {};',
      settings: {
        flowtype: {
          onlyFilesWithFlowAnnotation: true
        }
      }
    }
  ]
};
