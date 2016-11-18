export default {
  invalid: [
    {
      code: 'type FooType = { a: number, b: string, a: number }',
      errors: [{message: 'Duplicate property.'}]
    },
    {
      code: 'type FooType = { a: number, b: string, a: string }',
      errors: [{message: 'Duplicate property.'}]
    }
  ],
  valid: [
    {
      code: 'type FooType = { a: number, b: string, c: number }'
    },
    {
      code: 'type FooType = { a: number, b: string, a: number }',
      settings: {
        flowtype: {
          onlyFilesWithFlowAnnotation: true
        }
      }
    }
  ]
};
