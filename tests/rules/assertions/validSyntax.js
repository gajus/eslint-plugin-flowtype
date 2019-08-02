export default {
  invalid: [

    // removed, as Babylon now prevents the invalid syntax
  ],
  valid: [
    {
      code: 'function x(foo: string = "1") {}',
    },
    {
      code: 'function x(foo: Type = bar()) {}',
    },
  ],
};
