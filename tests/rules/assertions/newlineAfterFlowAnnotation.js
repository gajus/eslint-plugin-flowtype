export default {
  invalid: [
    {
      code: '// @flow\nimport Foo from \'./foo\';',
      errors: [{message: 'Expected newline after flow annotation'}],
      output: '// @flow\n\nimport Foo from \'./foo\';'
    },
    {
      code: '// @flow\nimport Foo from \'./foo\';',
      errors: [{message: 'Expected newline after flow annotation'}],
      options: ['always'],
      output: '// @flow\n\nimport Foo from \'./foo\';'
    },
    {
      code: '// @flow\r\nimport Foo from \'./foo\';',
      errors: [{message: 'Expected newline after flow annotation'}],
      options: ['always-windows'],
      output: '// @flow\r\n\r\nimport Foo from \'./foo\';'
    },
    {
      code: '// @flow\n\n',
      errors: [{message: 'Expected no newline after flow annotation'}],
      options: ['never'],
      output: '// @flow\n'
    }
  ],
  valid: [
    {
      code: '// @flow\n\nimport Foo from \'./foo\';',
      options: ['always']
    },
    {
      code: '// @flow\r\n\r\nimport Foo from \'./foo\';',
      options: ['always-windows']
    },
    {
      code: '// @flow\nimport Foo from \'./foo\';',
      options: ['never']
    }
  ]
};

