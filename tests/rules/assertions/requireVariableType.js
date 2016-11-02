export default {
  invalid: [
    {
      code: 'var foo = "bar"',
      errors: [
        {
          message: 'Missing "foo" variable type annotation.'
        }
      ]
    },
    {
      code: 'var foo : string = "bar", bar = 1',
      errors: [
        {
          message: 'Missing "bar" variable type annotation.'
        }
      ]
    },
    {
      code: 'var _foo = "bar", bar = 1',
      errors: [
        {
          message: 'Missing "bar" variable type annotation.'
        }
      ],
      options: [
        {
          excludeVariableMatch: '^_'
        }
      ]
    }
  ],
  valid: [
    {
      code: 'var foo : string = "bar"'
    },
    {
      code: 'var foo : string = "bar", bar : number = 1'
    },
    {
      code: 'var _foo = "bar", bar : number = 1',
      options: [
        {
          excludeVariableMatch: '^_'
        }
      ]
    }
  ]
};
