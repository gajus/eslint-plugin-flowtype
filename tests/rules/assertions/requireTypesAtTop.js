export default {
  invalid: [
    {
      code: 'const foo = 3;\ntype Foo = number;',
      errors: [{message: 'All type declaration must be at the top of the file, after any import declarations.'}],
    },
    {
      code: 'const foo = 3;\nopaque type Foo = number;',
      errors: [{message: 'All type declaration must be at the top of the file, after any import declarations.'}],
    },
    {
      code: 'const foo = 3;\nexport type Foo = number;',
      errors: [{message: 'All type declaration must be at the top of the file, after any import declarations.'}],
    },
    {
      code: 'const foo = 3;\nexport opaque type Foo = number;',
      errors: [{message: 'All type declaration must be at the top of the file, after any import declarations.'}],
    },
    {
      code: 'const foo = 3;\ntype Foo = number | string;',
      errors: [{message: 'All type declaration must be at the top of the file, after any import declarations.'}],
    },
    {
      code: 'import bar from "./bar";\nconst foo = 3;\ntype Foo = number;',
      errors: [{message: 'All type declaration must be at the top of the file, after any import declarations.'}],
    },
  ],
  misconfigured: [
    {
      errors: [
        {
          data: 'sometimes',
          instancePath: '/0',
          keyword: 'enum',
          message: 'must be equal to one of the allowed values',
          params: {
            allowedValues: [
              'always',
              'never',
            ],
          },
          parentSchema: {
            enum: [
              'always',
              'never',
            ],
            type: 'string',
          },
          schema: [
            'always',
            'never',
          ],
          schemaPath: '#/items/0/enum',
        },
      ],
      options: ['sometimes'],
    },
  ],
  valid: [
    {
      code: 'type Foo = number;\nconst foo = 3;',
    },
    {
      code: 'opaque type Foo = number;\nconst foo = 3;',
    },
    {
      code: 'export type Foo = number;\nconst foo = 3;',
    },
    {
      code: 'export opaque type Foo = number;\nconst foo = 3;',
    },
    {
      code: 'type Foo = number;\nconst foo = 3;',
    },
    {
      code: 'import bar from "./bar";\ntype Foo = number;',
    },
    {
      code: 'type Foo = number;\nimport bar from "./bar";',
    },
    {
      code: 'const foo = 3;\ntype Foo = number;',
      options: ['never'],
    },
  ],
};
