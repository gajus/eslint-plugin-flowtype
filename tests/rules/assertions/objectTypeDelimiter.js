/* eslint-disable no-undefined */

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
      code: 'type Foo = { [a: string]: Foo, [b: string]: Bar }',
      errors: [{message: 'Prefer semicolons to commas in object and class types'}],
      options: ['semicolon'],
      output: 'type Foo = { [a: string]: Foo; [b: string]: Bar }'
    },
    {
      code: 'type Foo = { [a: string]: Foo; [b: string]: Bar }',
      errors: [{message: 'Prefer commas to semicolons in object and class types'}],
      options: ['comma'],
      output: 'type Foo = { [a: string]: Foo, [b: string]: Bar }'
    },
    {
      code: 'type Foo = { (): Foo, (): Bar }',
      errors: [{message: 'Prefer semicolons to commas in object and class types'}],
      options: ['semicolon'],
      output: 'type Foo = { (): Foo; (): Bar }'
    },
    {
      code: 'type Foo = { (): Foo; (): Bar }',
      errors: [{message: 'Prefer commas to semicolons in object and class types'}],
      options: ['comma'],
      output: 'type Foo = { (): Foo, (): Bar }'
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
    },
    {
      code: 'declare class Foo { [a: string]: Foo, }',
      errors: [{message: 'Prefer semicolons to commas in object and class types'}],
      options: ['semicolon'],
      output: 'declare class Foo { [a: string]: Foo; }'
    },
    {
      code: 'declare class Foo { a: Foo; }',
      errors: [{message: 'Prefer commas to semicolons in object and class types'}],
      options: ['comma'],
      output: 'declare class Foo { a: Foo, }'
    },
    {
      code: 'declare class Foo { (): Foo, }',
      errors: [{message: 'Prefer semicolons to commas in object and class types'}],
      options: ['semicolon'],
      output: 'declare class Foo { (): Foo; }'
    },
    {
      code: 'declare class Foo { (): Foo; }',
      errors: [{message: 'Prefer commas to semicolons in object and class types'}],
      options: ['comma'],
      output: 'declare class Foo { (): Foo, }'
    },
    {
      code: 'declare class Foo { static (): Foo, }',
      errors: [{message: 'Prefer semicolons to commas in object and class types'}],
      options: ['semicolon'],
      output: 'declare class Foo { static (): Foo; }'
    },
    {
      code: 'declare class Foo { static (): Foo; }',
      errors: [{message: 'Prefer commas to semicolons in object and class types'}],
      options: ['comma'],
      output: 'declare class Foo { static (): Foo, }'
    }
  ],
  misconfigured: [
    {
      errors: [{
        field: 'data["0"]',
        message: 'must be an enum value',
        type: undefined,
        value: 'period'
      }],
      options: ['period']
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
      code: 'type Foo = { [a: string]: Foo; [b: string]: Bar }',
      options: ['semicolon']
    },
    {
      code: 'type Foo = { [a: string]: Foo, [b: string]: Bar }',
      options: ['comma']
    },
    {
      code: 'type Foo = { (): Foo; (): Bar }',
      options: ['semicolon']
    },
    {
      code: 'type Foo = { (): Foo, (): Bar }',
      options: ['comma']
    },
    {
      code: 'type Foo = { a: Foo, b: Bar }'
    },
    {
      code: 'type Foo = { [a: string]: Foo, [b: string]: Bar }'
    },
    {
      code: 'type Foo = { (): Foo, (): Bar }'
    },
    {
      code: 'declare class Foo { a: Foo; }',
      options: ['semicolon']
    },
    {
      code: 'declare class Foo { a: Foo, }',
      options: ['comma']
    },
    {
      code: 'declare class Foo { [a: string]: Foo; }',
      options: ['semicolon']
    },
    {
      code: 'declare class Foo { [a: string]: Foo, }',
      options: ['comma']
    },
    {
      code: 'declare class Foo { (): Foo; }',
      options: ['semicolon']
    },
    {
      code: 'declare class Foo { (): Foo, }',
      options: ['comma']
    },
    {
      code: 'type Foo = { a: Foo, b: Bar }',
      options: ['semicolon'],
      settings: {
        flowtype: {
          onlyFilesWithFlowAnnotation: true
        }
      }
    }
  ]
};
