export default {
  invalid: [
    {
      code: 'type T1 = B | A;',
      errors: [{message: 'Expected union members to be in ascending order. "A" should be before "B".'}],
      output: 'type T1 = A | B;',
    },
    {
      code: 'type T2 = { b: string } & { a: string };',
      errors: [{message: 'Expected intersection members to be in ascending order. "{ a: string }" should be before "{ b: string }".'}],
      output: 'type T2 = { a: string } & { b: string };',
    },
    {
      code: 'type T3 = [1, 2, 4] & [1, 2, 3];',
      errors: [{message: 'Expected intersection members to be in ascending order. "[1, 2, 3]" should be before "[1, 2, 4]".'}],
      output: 'type T3 = [1, 2, 3] & [1, 2, 4];',
    },
    {
      code: `
        type T4 =
          | [1, 2, 4]
          | [1, 2, 3]
          | { b: string }
          | { a: string }
          | (() => void)
          | (() => string)
          | 'b'
          | 'a'
          | 'b'
          | 'a'
          | string[]
          | number[]
          | B
          | A
          | string
          | any;
      `,
      errors: [
        {message: 'Expected union members to be in ascending order. "[1, 2, 3]" should be before "[1, 2, 4]".'},
        {message: 'Expected union members to be in ascending order. "{ b: string }" should be before "[1, 2, 3]".'},
        {message: 'Expected union members to be in ascending order. "{ a: string }" should be before "{ b: string }".'},
        {message: 'Expected union members to be in ascending order. "() => void" should be before "{ a: string }".'},
        {message: 'Expected union members to be in ascending order. "() => string" should be before "() => void".'},
        {message: 'Expected union members to be in ascending order. "\'b\'" should be before "() => string".'},
        {message: 'Expected union members to be in ascending order. "\'a\'" should be before "\'b\'".'},
        {message: 'Expected union members to be in ascending order. "\'b\'" should be before "\'a\'".'},
        {message: 'Expected union members to be in ascending order. "\'a\'" should be before "\'b\'".'},
        {message: 'Expected union members to be in ascending order. "string[]" should be before "\'a\'".'},
        {message: 'Expected union members to be in ascending order. "number[]" should be before "string[]".'},
        {message: 'Expected union members to be in ascending order. "B" should be before "number[]".'},
        {message: 'Expected union members to be in ascending order. "A" should be before "B".'},
        {message: 'Expected union members to be in ascending order. "string" should be before "A".'},
        {message: 'Expected union members to be in ascending order. "any" should be before "string".'},
      ],
      output: `
        type T4 =
          any | string | A | B | number[] | string[] | 'a' | 'a' | 'b' | 'b' | () => string | () => void | { a: string } | { b: string } | [1, 2, 3] | [1, 2, 4];
      `,
    },
  ],
  valid: [
    {
      code: 'type T1 = A | B;',
    },
    {
      code: 'type T2 = { a: string } & { b: string };',
    },
    {
      code: 'type T3 = [1, 2, 3] & [1, 2, 4];',
    },
    {
      code: `
        type T4 =
          | any
          | string
          | A
          | B
          | number[]
          | string[]
          | 'a'
          | 'a'
          | 'b'
          | 'b'
          | (() => string)
          | (() => void)
          | { a: string }
          | { b: string }
          | [1, 2, 3]
          | [1, 2, 4];
      `,
    },
  ],
};
