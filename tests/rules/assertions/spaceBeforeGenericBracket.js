export default {
  invalid: [
    {
      code: 'type X = Promise <string>',
      errors: [{message: 'There must be no space before "Promise" generic type annotation bracket'}],
      output: 'type X = Promise<string>'
    },
    {
      code: 'type X = Promise <string>',
      errors: [{message: 'There must be no space before "Promise" generic type annotation bracket'}],
      options: ['never'],
      output: 'type X = Promise<string>'
    },
    {
      code: 'type X = Promise  <string>',
      errors: [{message: 'There must be no space before "Promise" generic type annotation bracket'}],
      output: 'type X = Promise<string>'
    },
    {
      code: 'type X = Promise<string>',
      errors: [{message: 'There must be a space before "Promise" generic type annotation bracket'}],
      options: ['always'],
      output: 'type X = Promise <string>'
    },
    {
      code: 'type X = Promise  <string>',
      errors: [{message: 'There must be one space before "Promise" generic type annotation bracket'}],
      options: ['always'],
      output: 'type X = Promise <string>'
    }
  ],
  valid: [
    {
      code: 'type X = Promise<string>'
    },
    {
      code: 'type X = Promise <string>',
      options: ['always']
    }
  ]
};
