export default {
  invalid: [
    {
      code: 'var o: ? string = null;',
      errors: [{
        message: 'Unexpected whitespace after nullable type annotation.'
      }]
    },
    {
      code: 'var o: ?   string = null;',
      errors: [{
        message: 'Unexpected whitespace after nullable type annotation.'
      }],
      options: [{
        after: true
      }]
    },
    {
      code: 'var o: ?string = null;',
      errors: [{
        message: 'Unexpected whitespace before nullable type annotation.'
      }],
      options: [{
        before: false
      }]
    },
    {
      code: 'var o:  ?string = null;',
      errors: [{
        message: 'Unexpected whitespace before nullable type annotation.'
      }],
      options: [{
        before: true
      }]
    },
    {
      code: 'type X = ?   string;',
      errors: [{
        message: 'Unexpected whitespace after nullable type annotation.'
      }]
    },
    {
      code: 'function x(a: ?  e) {};',
      errors: [{
        message: 'Unexpected whitespace after nullable type annotation.'
      }, {
        message: 'Unexpected whitespace before nullable type annotation.'       ,
      }],
      options: [{
        after: false,
        before: false
      }]
    }
  ],
  valid: [
    {
      code: 'var o: ?string = null;'
    },
    {
      code: 'function x(a: ?e) {};'
    }
  ]
};
