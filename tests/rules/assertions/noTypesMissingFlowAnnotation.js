export default {
  invalid: [
    {
      code: 'const x: number = 42;',
      errors: [{
        message: 'Type annotations require valid Flow declaration.'
      }]
    },
    {
      code: 'type FooType = number;',
      errors: [{
        message: 'Type aliases require valid Flow declaration.'
      }]
    },
    {
      code: 'import type A from "a"',
      errors: [{
        message: 'Type imports require valid Flow declaration.'
      }]
    },
    {
      code: 'function t<T>(): T{}',
      errors: [{
        message: 'Type annotations require valid Flow declaration.'
      }]
    }
  ],
  valid: []
};
