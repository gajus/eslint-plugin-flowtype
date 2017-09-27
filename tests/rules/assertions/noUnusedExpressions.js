export default {
  invalid: [
    {
      code: 'foo + 1',
      errors: [{
        message: 'Expected an assignment or function call and instead saw an expression.'
      }]
    }
  ],
  valid: [
    {
      code: '(foo: number)'
    }
  ]
};
