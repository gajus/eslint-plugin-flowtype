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
    },
    {
      code: 'var foo = "bar", bar = 1; const oob : string = "oob"; let hey = "yah"',
      errors: [
        {
          message: 'Missing "hey" variable type annotation.'
        }
      ],
      options: [
        {
          excludeVariableTypes: {
            let: false,
            var: true
          }
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
    },
    {
      code: 'var foo = "bar", bar = 1',
      options: [
        {
          excludeVariableTypes: {
            var: true
          }
        }
      ]
    },
    {
      code: 'var foo = "bar", bar = 1; const oob : string = "oob"; let hey = "yah"',
      options: [
        {
          excludeVariableTypes: {
            let: true,
            var: true
          }
        }
      ]
    }
  ]
};
