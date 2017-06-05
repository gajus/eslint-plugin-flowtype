export default {
  invalid: [
    {
      code: 'type FooType = Array<number>;',
      errors: [
        {
          message: 'Use $ReadOnlyArray instead of Array.'
        }
      ]
    }
  ],
  valid: [
    {
      code: 'type FooType = $ReadOnlyArray<number>;'
    }
  ]
};
