export default {
  invalid: [
    {
      code: 'type X = Array<string>',
      errors: [{message: 'Use "$ReadOnlyArray" instead of "Array"'}],
      output: 'type X = $ReadOnlyArray<string>',
    },
    {
      code: 'type X = string[]',
      errors: [{message: 'Use "$ReadOnlyArray" instead of array shorthand notation'}],
      output: 'type X = $ReadOnlyArray<string>',
    },
    {
      code: 'const values: Array<Array<string>> = [];',
      errors: [{message: 'Use "$ReadOnlyArray" instead of "Array"'}],
      output: 'const values: Array<$ReadOnlyArray<string>> = [];',
    },
    {
      code: 'let values: Array<Array<string>>;',
      errors: [
        {message: 'Use "$ReadOnlyArray" instead of "Array"'},
        {message: 'Use "$ReadOnlyArray" instead of "Array"'},
      ],
      output: 'let values: $ReadOnlyArray<$ReadOnlyArray<string>>;',
    },
  ],
  valid: [
    {
      code: 'type X = $ReadOnlyArray<string>',
    },
    {
      code: 'const values: Array<$ReadOnlyArray<string>> = [];',
    },
    {
      code: 'const values: $ReadOnlyArray<string>[] = [];',
    },
    {
      code: 'const values: Array<$ReadOnlyArray<string>> = new Array();',
    },
    {
      code: 'const values: Array<$ReadOnlyArray<string>> = Array();',
    },
  ],
};
