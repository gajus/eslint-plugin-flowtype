export default {
  invalid: [
    {
      code: 'const foo: string | null = null;',
      errors: [{message: 'All union types must be declared with named type alias.'}],
      options: [
        'always',
        {
          allowNull: false,
        },
      ],
    },
    {
      code: 'function foo(bar: "A" | "B") {}',
      errors: [{message: 'All union types must be declared with named type alias.'}],
    },
    {
      code: 'const foo: "A" | "B" = "A";',
      errors: [{message: 'All union types must be declared with named type alias.'}],
    },
    {
      code: 'type Foo = { bar: "A" | "B" };',
      errors: [{message: 'All union types must be declared with named type alias.'}],
    },
    {
      code: 'function foo(bar: { n: number } | { s: string }) {}',
      errors: [{message: 'All union types must be declared with named type alias.'}],
    },
    {
      code: 'function foo(bar: { n: number } & { s: string }) {}',
      errors: [{message: 'All intersection types must be declared with named type alias.'}],
    },
    {
      code: 'const foo: { n: number } & { s: string } = { n: 0, s: "" };',
      errors: [{message: 'All intersection types must be declared with named type alias.'}],
    },
    {
      code: 'type Foo = { bar: { n: number } & { s: string } };',
      errors: [{message: 'All intersection types must be declared with named type alias.'}],
    },
    {
      code: 'function foo(bar: { n: number } & { s: string }) {}',
      errors: [{message: 'All intersection types must be declared with named type alias.'}],
    },
  ],
  misconfigured: [
    {
      errors: [
        {
          data: 'sometimes',
          dataPath: '[0]',
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
      code: 'const foo: string | null = null;',
    },
    {
      code: 'const foo: string | null = null;',
      options: [
        'always',
        {
          allowNull: true,
        },
      ],
    },
    {
      code: 'type Foo = "A" | "B";',
    },
    {
      code: 'type Bar = "A" | "B"; function foo(bar: Bar) {}',
    },
    {
      code: 'type Foo = { disjoint: "A", n: number } | { disjoint: "B", s: string };',
    },
    {
      code: 'type Foo = { n: number } & { s: string };',
    },
    {
      code: 'type Bar = { n: number } & { s: string }; function foo(bar: Bar) {}',
    },
    {
      code: 'function foo(bar: "A" | "B") {}',
      options: ['never'],
    },
    {
      code: 'function foo(bar: { n: number } & { s: string }) {}',
      options: ['never'],
    },
  ],
};
