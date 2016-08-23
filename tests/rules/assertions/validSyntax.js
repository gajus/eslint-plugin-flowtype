export default {
  invalid: [
    {
      code: 'function x(foo = "1": string) {}',
      errors: [
        {
          message: '"foo" parameter type annotation must be placed on left-hand side of assignment.'
        }
      ]
    },
    {
      code: 'function x(foo = bar(): Type, baz = []: []) {}',
      errors: [
        {
          message: '"foo" parameter type annotation must be placed on left-hand side of assignment.'
        },
        {
          message: '"baz" parameter type annotation must be placed on left-hand side of assignment.'
        }
      ]
    }
  ],
  valid: [
    {
      code: 'function x(foo: string = "1") {}'
    },
    {
      code: 'function x(foo: Type = bar()) {}'
    }
  ]
};
