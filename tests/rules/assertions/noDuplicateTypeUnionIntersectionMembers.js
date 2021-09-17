export default {
  invalid: [
    {
      code: 'type A = 1 | 2 | 3 | 1;',
      errors: [{message: 'Duplicate union member found "1".'}],
      output: 'type A = 1 | 2 | 3;',
    },
    {
      code: 'type B = \'foo\' | \'bar\' | \'foo\';',
      errors: [{message: 'Duplicate union member found "\'foo\'".'}],
      output: 'type B = \'foo\' | \'bar\';',
    },
    {
      code: 'type C = A | B | A | B;',
      errors: [
        {message: 'Duplicate union member found "A".'},
        {message: 'Duplicate union member found "B".'},
      ],
      output: 'type C = A | B;',
    },
    {
      code: 'type C = A & B & A & B;',
      errors: [
        {message: 'Duplicate intersection member found "A".'},
        {message: 'Duplicate intersection member found "B".'},
      ],
      output: 'type C = A & B;',
    },
  ],
  valid: [
    {
      code: 'type A = 1 | 2 | 3;',
    },
    {
      code: 'type B = \'foo\' | \'bar\';',
    },
    {
      code: 'type C = A | B;',
    },
    {
      code: 'type C = A & B;',
    },
  ],
};
