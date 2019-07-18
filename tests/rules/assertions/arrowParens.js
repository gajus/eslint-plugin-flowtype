/* eslint-disable sort-keys */
const type = 'ArrowFunctionExpression';

export default {
  invalid: [

    // "always" (by default)
    {
      code: 'a => {}',
      output: '(a) => {}',
      errors: [{
        line: 1,
        column: 1,
        endColumn: 2,
        messageId: 'expectedParens',
        type
      }]
    },
    {
      code: 'a => a',
      output: '(a) => a',
      errors: [{
        line: 1,
        column: 1,
        endColumn: 2,
        messageId: 'expectedParens',
        type
      }]
    },
    {
      code: 'a => {\n}',
      output: '(a) => {\n}',
      errors: [{
        line: 1,
        column: 1,
        endColumn: 2,
        messageId: 'expectedParens',
        type
      }]
    },
    {
      code: 'a.then(foo => {});',
      output: 'a.then((foo) => {});',
      errors: [{
        line: 1,
        column: 8,
        endColumn: 11,
        messageId: 'expectedParens',
        type
      }]
    },
    {
      code: 'a.then(foo => a);',
      output: 'a.then((foo) => a);',
      errors: [{
        line: 1,
        column: 8,
        endColumn: 11,
        messageId: 'expectedParens',
        type
      }]
    },
    {
      code: 'a(foo => { if (true) {}; });',
      output: 'a((foo) => { if (true) {}; });',
      errors: [{
        line: 1,
        column: 3,
        endColumn: 6,
        messageId: 'expectedParens',
        type
      }]
    },
    {
      code: 'a(async foo => { if (true) {}; });',
      output: 'a(async (foo) => { if (true) {}; });',
      parserOptions: {ecmaVersion: 8},
      errors: [{
        line: 1,
        column: 9,
        endColumn: 12,
        messageId: 'expectedParens',
        type
      }]
    },

    // "as-needed"
    {
      code: '(a) => a',
      output: 'a => a',
      options: ['as-needed'],
      errors: [{
        line: 1,
        column: 2,
        endColumn: 3,
        messageId: 'unexpectedParens',
        type
      }]
    },
    {
      code: '(a,) => a',
      output: 'a => a',
      options: ['as-needed'],
      parserOptions: {ecmaVersion: 8},
      errors: [{
        line: 1,
        column: 2,
        endColumn: 3,
        messageId: 'unexpectedParens',
        type
      }]
    },
    {
      code: 'async (a) => a',
      output: 'async a => a',
      options: ['as-needed'],
      parserOptions: {ecmaVersion: 8},
      errors: [{
        line: 1,
        column: 8,
        endColumn: 9,
        messageId: 'unexpectedParens',
        type
      }]
    },
    {
      code: 'async(a) => a',
      output: 'async a => a',
      options: ['as-needed'],
      parserOptions: {ecmaVersion: 8},
      errors: [{
        line: 1,
        column: 7,
        endColumn: 8,
        messageId: 'unexpectedParens',
        type
      }]
    },

    // "as-needed", { "requireForBlockBody": true }
    {
      code: 'a => {}',
      output: '(a) => {}',
      options: ['as-needed', {requireForBlockBody: true}],
      errors: [{
        line: 1,
        column: 1,
        endColumn: 2,
        messageId: 'expectedParensBlock',
        type
      }]
    },
    {
      code: '(a) => a',
      output: 'a => a',
      options: ['as-needed', {requireForBlockBody: true}],
      errors: [{
        line: 1,
        column: 2,
        endColumn: 3,
        messageId: 'unexpectedParensInline',
        type
      }]
    },
    {
      code: 'async a => {}',
      output: 'async (a) => {}',
      options: ['as-needed', {requireForBlockBody: true}],
      parserOptions: {ecmaVersion: 8},
      errors: [{
        line: 1,
        column: 7,
        endColumn: 8,
        messageId: 'expectedParensBlock',
        type
      }]
    },
    {
      code: 'async (a) => a',
      output: 'async a => a',
      options: ['as-needed', {requireForBlockBody: true}],
      parserOptions: {ecmaVersion: 8},
      errors: [{
        line: 1,
        column: 8,
        endColumn: 9,
        messageId: 'unexpectedParensInline',
        type
      }]
    },
    {
      code: 'async(a) => a',
      output: 'async a => a',
      options: ['as-needed', {requireForBlockBody: true}],
      parserOptions: {ecmaVersion: 8},
      errors: [{
        line: 1,
        column: 7,
        endColumn: 8,
        messageId: 'unexpectedParensInline',
        type
      }]
    }
  ],

  // can't figure out how to get this working
  // misconfigured: [
  //   {
  //     errors: [
  //       {
  //         keyword: 'enum',
  //         dataPath: '[0]',
  //         schemaPath: '#/items/0/enum',
  //         params: {
  //           allowedValues: [
  //             'always',
  //             'as-needed'
  //           ]
  //         },
  //         message: 'should be equal to one of the allowed values',
  //         schema: [
  //           'always',
  //           'as-needed'
  //         ],
  //         parentSchema: {
  //           enum: [
  //             'always',
  //             'as-needed'
  //           ]
  //         }
  //       }
  //     ],
  //     options: ['temporarily']
  //   }
  // ],
  valid: [
    // "always" (by default)
    {code: '() => {}'},
    {code: '(a) => {}'},
    {code: '(a) => a'},
    {code: '(a) => {\n}'},
    {code: 'a.then((foo) => {});'},
    {code: 'a.then((foo) => { if (true) {}; });'},
    {code: 'a.then(async (foo) => { if (true) {}; });',
      parserOptions: {ecmaVersion: 8}},

    // "always" (explicit)
    {code: '() => {}',
      options: ['always']},
    {code: '(a) => {}',
      options: ['always']},
    {code: '(a) => a',
      options: ['always']},
    {code: '(a) => {\n}',
      options: ['always']},
    {code: 'a.then((foo) => {});',
      options: ['always']},
    {code: 'a.then((foo) => { if (true) {}; });',
      options: ['always']},
    {code: 'a.then(async (foo) => { if (true) {}; });',
      options: ['always'],
      parserOptions: {ecmaVersion: 8}},

    // "as-needed"
    {code: '() => {}',
      options: ['as-needed']},
    {code: 'a => {}',
      options: ['as-needed']},
    {code: 'a => a',
      options: ['as-needed']},
    {code: '([a, b]) => {}',
      options: ['as-needed']},
    {code: '({ a, b }) => {}',
      options: ['as-needed']},
    {code: '(a = 10) => {}',
      options: ['as-needed']},
    {code: '(...a) => a[0]',
      options: ['as-needed']},
    {code: '(a, b) => {}',
      options: ['as-needed']},
    {code: 'async ([a, b]) => {}',
      options: ['as-needed'],
      parserOptions: {ecmaVersion: 8}},
    {code: 'async (a, b) => {}',
      options: ['as-needed'],
      parserOptions: {ecmaVersion: 8}},
    {code: '(a: T) => a',
      options: ['as-needed']
    },
    {code: '(a): T => a',
      options: ['as-needed']
    },

    // "as-needed", { "requireForBlockBody": true }
    {code: '() => {}',
      options: ['as-needed', {requireForBlockBody: true}]},
    {code: 'a => a',
      options: ['as-needed', {requireForBlockBody: true}]},
    {code: '([a, b]) => {}',
      options: ['as-needed', {requireForBlockBody: true}]},
    {code: '([a, b]) => a',
      options: ['as-needed', {requireForBlockBody: true}]},
    {code: '({ a, b }) => {}',
      options: ['as-needed', {requireForBlockBody: true}]},
    {code: '({ a, b }) => a + b',
      options: ['as-needed', {requireForBlockBody: true}]},
    {code: '(a = 10) => {}',
      options: ['as-needed', {requireForBlockBody: true}]},
    {code: '(...a) => a[0]',
      options: ['as-needed', {requireForBlockBody: true}]},
    {code: '(a, b) => {}',
      options: ['as-needed', {requireForBlockBody: true}]},
    {code: 'a => ({})',
      options: ['as-needed', {requireForBlockBody: true}]},
    {code: 'async a => ({})',
      options: ['as-needed', {requireForBlockBody: true}],
      parserOptions: {ecmaVersion: 8}},
    {code: 'async a => a',
      options: ['as-needed', {requireForBlockBody: true}],
      parserOptions: {ecmaVersion: 8}},
    {code: '(a: T) => a',
      options: ['as-needed', {requireForBlockBody: true}]},
    {code: '(a): T => a',
      options: ['as-needed', {requireForBlockBody: true}]},

    // flow-specific
    {code: '<T>(a: T) => a',
      options: ['always', {requireForBlockBody: true}]},
    {code: '<T>(a: T) => { return a; }',
      options: ['as-needed', {requireForBlockBody: false}]},
    {code: '<T>(a: T) => { return a; }',
      options: ['always', {requireForBlockBody: true}]},
    {code: '<T>(a: T) => { return a; }',
      options: ['as-needed', {requireForBlockBody: true}]},
    {code: '(a): %checks => typeof a === "number"',
      options: ['as-needed', {requireForBlockBody: true}]}

  ]
};
