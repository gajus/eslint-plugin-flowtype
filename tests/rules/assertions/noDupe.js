export default {
  invalid: [
    {
      code: 'type FooType = { a: number, b: string, a: number }',
      errors: [{message: 'Duplicate property.'}]
    }
  ],
  valid: [
    {
      code: 'type FooType = { a: number, b: string, c: number }'
    }
  ]
};
