export default {
  invalid: [
    {
      code: 'type Foo = { a: Foo, b: Bar }',
      errors: [{message: 'Prefer semicolons to commas in object and class types'}],
      options: ['semicolon'],
      output: 'type Foo = { a: Foo; b: Bar }'
    },
    {
      code: 'type Foo = { a: Foo; b: Bar }',
      errors: [{message: 'Prefer commas to semicolons in object and class types'}],
      options: ['comma'],
      output: 'type Foo = { a: Foo, b: Bar }'
    },
    {
      code: 'declare class Foo { a: Foo, }',
      errors: [{message: 'Prefer semicolons to commas in object and class types'}],
      options: ['semicolon'],
      output: 'declare class Foo { a: Foo; }'
    },
    {
      code: 'declare class Foo { a: Foo; }',
      errors: [{message: 'Prefer commas to semicolons in object and class types'}],
      options: ['comma'],
      output: 'declare class Foo { a: Foo, }'
    }
  ],
  valid: [
    {
      code: 'type Foo = { a: Foo; b: Bar }',
      options: ['semicolon']
    },
    {
      code: 'type Foo = { a: Foo, b: Bar }',
      options: ['comma']
    },
    {
      code: 'type Foo = { a: Foo, b: Bar }'
    },
    {
      code: 'declare class Foo { a: Foo; }',
      options: ['semicolon']
    },
    {
      code: 'declare class Foo { a: Foo, }',
      options: ['comma']
    }
  ]
};
