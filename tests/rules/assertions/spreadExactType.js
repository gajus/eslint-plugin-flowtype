export default {
  invalid: [
    {
      code: 'type bar = {...{test: string}}',
      errors: [{message: 'Use $Exact to make type spreading safe.'}]
    },
    {
      code: 'type foo = {test: number}; type bar = {...foo}',
      errors: [{message: 'Use $Exact to make type spreading safe.'}]
    }
  ],
  valid: [
    {
      code: 'type bar = {...$Exact<{test: string}>}'
    },
    {
      code: 'type foo = {test: number}; type bar = {...$Exact<foo>}'
    }
  ]
};
