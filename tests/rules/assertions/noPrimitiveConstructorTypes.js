export default {
  invalid: [
    {
      code: 'type x = Number',
      errors: [{message: 'Unexpected use of Number constructor type.'}]
    },
    {
      code: 'type x = String',
      errors: [{message: 'Unexpected use of String constructor type.'}]
    },
    {
      code: 'type x = Boolean',
      errors: [{message: 'Unexpected use of Boolean constructor type.'}]
    },
    {
      code: 'type x = { a: Number }',
      errors: [{message: 'Unexpected use of Number constructor type.'}]
    },
    {
      code: 'type x = { a: String }',
      errors: [{message: 'Unexpected use of String constructor type.'}]
    },
    {
      code: 'type x = { a: Boolean }',
      errors: [{message: 'Unexpected use of Boolean constructor type.'}]
    },
    {
      code: '(x: Number) => {}',
      errors: [{message: 'Unexpected use of Number constructor type.'}]
    },
    {
      code: '(x: String) => {}',
      errors: [{message: 'Unexpected use of String constructor type.'}]
    },
    {
      code: '(x: Boolean) => {}',
      errors: [{message: 'Unexpected use of Boolean constructor type.'}]
    }
  ],
  valid: [
    {
      code: 'type x = number'
    },
    {
      code: 'type x = string'
    },
    {
      code: 'type x = boolean'
    },
    {
      code: 'type x = { a: number }'
    },
    {
      code: 'type x = { a: string }'
    },
    {
      code: 'type x = { a: boolean }'
    },
    {
      code: '(x: number) => {}'
    },
    {
      code: '(x: string) => {}'
    },
    {
      code: '(x: boolean) => {}'
    },
    {
      code: 'type x = MyNumber'
    },
    {
      code: 'type x = MyString'
    },
    {
      code: 'type x = MyBoolean'
    }
  ]
};
