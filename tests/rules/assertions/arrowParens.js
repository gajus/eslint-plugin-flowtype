/* eslint-disable sort-keys */
const type = 'ArrowFunctionExpression';

export default {
  invalid: [

    // "always" (by default)
    {
      code: 'a => {}',
      errors: [{
        column: 1,
        endColumn: 2,
        line: 1,
        messageId: 'expectedParens',
        type,
      }],
      output: '(a) => {}',
    },
    {
      code: 'a => a',
      errors: [{
        column: 1,
        endColumn: 2,
        line: 1,
        messageId: 'expectedParens',
        type,
      }],
      output: '(a) => a',
    },
    {
      code: 'a => {\n}',
      errors: [{
        column: 1,
        endColumn: 2,
        line: 1,
        messageId: 'expectedParens',
        type,
      }],
      output: '(a) => {\n}',
    },
    {
      code: 'a.then(foo => {});',
      errors: [{
        column: 8,
        endColumn: 11,
        line: 1,
        messageId: 'expectedParens',
        type,
      }],
      output: 'a.then((foo) => {});',
    },
    {
      code: 'a.then(foo => a);',
      errors: [{
        column: 8,
        endColumn: 11,
        line: 1,
        messageId: 'expectedParens',
        type,
      }],
      output: 'a.then((foo) => a);',
    },
    {
      code: 'a(foo => { if (true) {}; });',
      errors: [{
        column: 3,
        endColumn: 6,
        line: 1,
        messageId: 'expectedParens',
        type,
      }],
      output: 'a((foo) => { if (true) {}; });',
    },
    {
      code: 'a(async foo => { if (true) {}; });',
      errors: [{
        column: 9,
        endColumn: 12,
        line: 1,
        messageId: 'expectedParens',
        type,
      }],
      output: 'a(async (foo) => { if (true) {}; });',
      parserOptions: {ecmaVersion: 8},
    },

    // "as-needed"
    {
      code: '(a) => a',
      errors: [{
        column: 2,
        endColumn: 3,
        line: 1,
        messageId: 'unexpectedParens',
        type,
      }],
      options: ['as-needed'],
      output: 'a => a',
    },
    {
      code: '(a,) => a',
      errors: [{
        column: 2,
        endColumn: 3,
        line: 1,
        messageId: 'unexpectedParens',
        type,
      }],
      options: ['as-needed'],
      output: 'a => a',
      parserOptions: {ecmaVersion: 8},
    },
    {
      code: 'async (a) => a',
      errors: [{
        column: 8,
        endColumn: 9,
        line: 1,
        messageId: 'unexpectedParens',
        type,
      }],
      options: ['as-needed'],
      output: 'async a => a',
      parserOptions: {ecmaVersion: 8},
    },
    {
      code: 'async(a) => a',
      errors: [{
        column: 7,
        endColumn: 8,
        line: 1,
        messageId: 'unexpectedParens',
        type,
      }],
      options: ['as-needed'],
      output: 'async a => a',
      parserOptions: {ecmaVersion: 8},
    },

    // "as-needed", { "requireForBlockBody": true }
    {
      code: 'a => {}',
      errors: [{
        column: 1,
        endColumn: 2,
        line: 1,
        messageId: 'expectedParensBlock',
        type,
      }],
      options: ['as-needed', {requireForBlockBody: true}],
      output: '(a) => {}',
    },
    {
      code: '(a) => a',
      errors: [{
        column: 2,
        endColumn: 3,
        line: 1,
        messageId: 'unexpectedParensInline',
        type,
      }],
      options: ['as-needed', {requireForBlockBody: true}],
      output: 'a => a',
    },
    {
      code: 'async a => {}',
      errors: [{
        column: 7,
        endColumn: 8,
        line: 1,
        messageId: 'expectedParensBlock',
        type,
      }],
      options: ['as-needed', {requireForBlockBody: true}],
      output: 'async (a) => {}',
      parserOptions: {ecmaVersion: 8},
    },
    {
      code: 'async (a) => a',
      errors: [{
        column: 8,
        endColumn: 9,
        line: 1,
        messageId: 'unexpectedParensInline',
        type,
      }],
      options: ['as-needed', {requireForBlockBody: true}],
      output: 'async a => a',
      parserOptions: {ecmaVersion: 8},
    },
    {
      code: 'async(a) => a',
      errors: [{
        column: 7,
        endColumn: 8,
        line: 1,
        messageId: 'unexpectedParensInline',
        type,
      }],
      options: ['as-needed', {requireForBlockBody: true}],
      output: 'async a => a',
      parserOptions: {ecmaVersion: 8},
    },
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
      options: ['as-needed'],
    },
    {code: '(a): T => a',
      options: ['as-needed'],
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
      options: ['as-needed', {requireForBlockBody: true}]},

  ],
};
