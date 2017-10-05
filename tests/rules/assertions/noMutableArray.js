export default {
  invalid: [
    {
      code: 'type X = Array<string>',
      errors: [{message: 'Use "$ReadOnlyArray" instead of "Array"'}],
      output: 'type X = $ReadOnlyArray<string>'
    },
    {
      code: 'type X = string[]',
      errors: [{message: 'Use "$ReadOnlyArray" instead of array shorthand notation'}],
      output: 'type X = $ReadOnlyArray<string>'
    }
  ],
  valid: [
    {
      code: 'type X = $ReadOnlyArray<string>'
    }
  ]
};
