export default {
  invalid: [
    {
      code: 'type foo = { bar ?: string };',
      errors: [{
        message: 'Unexpected whitespace before optional type annotation.'
      }]
    },
    {
      code: 'type foo = { bar  ?: string };',
      errors: [{
        message: 'Unexpected whitespace before optional type annotation.'
      }],
      options: [{
        before: true
      }]
    },
    {
      code: 'type foo = { bar? : string };',
      errors: [{
        message: 'Unexpected whitespace after optional type annotation.'
      }]
    },
    {
      code: 'type foo = { bar?   : string };',
      errors: [{
        message: 'Unexpected whitespace after optional type annotation.'
      }],
      options: [{
        after: true
      }]
    },
    {
      code: 'function fn(bar ?: number) {}',
      errors: [{
        message: 'Unexpected whitespace before optional type annotation.'
      }]
    },
    {
      code: 'function fn(bar   ?: number) {}',
      errors: [{
        message: 'Unexpected whitespace before optional type annotation.'
      }],
      options: [{
        before: true
      }]
    },
    {
      code: 'function fn(bar? : number) {}',
      errors: [{
        message: 'Unexpected whitespace after optional type annotation.'
      }]
    },
    {
      code: 'function fn(bar?   : number) {}',
      errors: [{
        message: 'Unexpected whitespace after optional type annotation.'
      }],
      options: [{
        after: true
      }]
    }
  ],
  valid: [
    {
      code: 'type foo = { bar?: string };'
    },
    {
      code: 'function fn(bar?: number) {}'
    }
  ]
};
