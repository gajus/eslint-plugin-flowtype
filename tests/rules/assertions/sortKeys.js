export default {
  invalid: [
    {
      code: 'type FooType = { a: number, c: number, b: string }',
      errors: [{message: 'Expected type annotations to be in ascending order. "b" must be before "c".'}],
      output: 'type FooType = { a: number, b: string, c: number }',
    },
    {
      code: 'type FooType = { a: number, b: number }',
      errors: [{message: 'Expected type annotations to be in descending order. "b" must be before "a".'}],
      options: ['desc'],
      output: 'type FooType = { b: number, a: number }',
    },
    {
      code: 'type FooType = { b: number, C: number, a: string }',
      errors: [{message: 'Expected type annotations to be in descending order. "C" must be before "b".'}],
      options: ['desc'],
      output: 'type FooType = { C: number, b: number, a: string }',
    },
    {
      code: 'type FooType = { a: number, c: number, C: number, b: string }',
      errors: [{message: 'Expected type annotations to be in ascending order. "b" must be before "C".'}],
      options: ['asc'],
      output: 'type FooType = { a: number, b: string, c: number, C: number }',
    },
    {
      code: 'type FooType = { a: number, C: number, c: number, b: string }',
      errors: [{message: 'Expected type annotations to be in ascending order. "b" must be before "c".'}],
      options: ['asc'],
      output: 'type FooType = { a: number, b: string, C: number, c: number }',
    },
    {
      code: 'type FooType = { 1: number, 10: number, 2: boolean }',
      errors: [{message: 'Expected type annotations to be in ascending order. "2" must be before "10".'}],
      options: ['asc'],
      output: 'type FooType = { 1: number, 2: boolean, 10: number }',
    },
    {
      code: 'type FooType = { a: number, c: number, b: string }',
      errors: [{message: 'Expected type annotations to be in ascending order. "b" must be before "c".'}],
      output: 'type FooType = { a: number, b: string, c: number }',
    },
    /* eslint-disable no-restricted-syntax */
    {
      code: `
        type FooType = {
          a: number,
          c: number,
          b: string,
        }
      `,
      errors: [{message: 'Expected type annotations to be in ascending order. "b" must be before "c".'}],
      output: `
        type FooType = {
          a: number,
          b: string,
          c: number,
        }
      `,
    },
    {
      code: `
        type FooType = {
          a: $ReadOnlyArray<number>,
          c: $ReadOnlyMap<string, number>,
          b: Map<string, Array<Map<string, number>>>,
        }
      `,
      errors: [{message: 'Expected type annotations to be in ascending order. "b" must be before "c".'}],
      output: `
        type FooType = {
          a: $ReadOnlyArray<number>,
          b: Map<string, Array<Map<string, number>>>,
          c: $ReadOnlyMap<string, number>,
        }
      `,
    },
    {
      code: `
        type FooType = {
          ...ErrorsInRecursiveGenericTypeArgsButDoesNotFix<{
            y: boolean,
            x: string,
            z: {
              j: string,
              l: number,
              k: boolean,
            },
          }>,
          a: number,
          c: string,
          b: Map<string, Array<ErrorsInRecursiveGenericTypeArgsButDoesNotFix<{
            y: boolean,
            x: string,
            z: {
              j: string,
              l: number,
              k: boolean,
            },
          }>>>,
        }
      `,
      errors: [
        {message: 'Expected type annotations to be in ascending order. "x" must be before "y".'},
        {message: 'Expected type annotations to be in ascending order. "k" must be before "l".'},
        {message: 'Expected type annotations to be in ascending order. "b" must be before "c".'},
        {message: 'Expected type annotations to be in ascending order. "x" must be before "y".'},
        {message: 'Expected type annotations to be in ascending order. "k" must be before "l".'},
      ],
      output: `
        type FooType = {
          ...ErrorsInRecursiveGenericTypeArgsButDoesNotFix<{
            y: boolean,
            x: string,
            z: {
              j: string,
              l: number,
              k: boolean,
            },
          }>,
          a: number,
          b: Map<string, Array<ErrorsInRecursiveGenericTypeArgsButDoesNotFix<{
            y: boolean,
            x: string,
            z: {
              j: string,
              l: number,
              k: boolean,
            },
          }>>>,
          c: string,
        }
      `,
    },
    {
      code: `
        type FooType = {
          ...BPreservesSpreadOrder,
          ...APreservesSpreadOrder,
          c: string,
          b: number,
        }
      `,
      errors: [{message: 'Expected type annotations to be in ascending order. "b" must be before "c".'}],
      output: `
        type FooType = {
          ...BPreservesSpreadOrder,
          ...APreservesSpreadOrder,
          b: number,
          c: string,
        }
      `,
    },
    {
      code: `
        type FooType = {
          ...BPreservesSpreadSpans,
          ...APreservesSpreadSpans,
          c: string,
          b: number,
          ...CPreservesSpreadSpans,
          e: string,
          d: number,
        }
      `,
      errors: [
        {message: 'Expected type annotations to be in ascending order. "b" must be before "c".'},
        {message: 'Expected type annotations to be in ascending order. "d" must be before "e".'},
      ],
      output: `
        type FooType = {
          ...BPreservesSpreadSpans,
          ...APreservesSpreadSpans,
          b: number,
          c: string,
          ...CPreservesSpreadSpans,
          d: number,
          e: string,
        }
      `,
    },
    {
      code: `
        type FooType = {
          ...BPreservesSpreadOrderAndTypeArgs<string, number>,
          ...APreservesSpreadOrderAndTypeArgs<number>,
          c: string,
          b: number,
        }
      `,
      errors: [{message: 'Expected type annotations to be in ascending order. "b" must be before "c".'}],
      output: `
        type FooType = {
          ...BPreservesSpreadOrderAndTypeArgs<string, number>,
          ...APreservesSpreadOrderAndTypeArgs<number>,
          b: number,
          c: string,
        }
      `,
    },
    {
      code: `
        type FooType = {
          /* preserves block comment before spread BType */
          // preserves line comment before spread BType
          ... /* preserves comment in spread BType */ BType<Generic> /* preserves trailing comment in spread AType */,
          /* preserves block comment before spread AType */
          // preserves line comment before spread AType
          ... /* preserves comment in spread AType */ AType /* preserves trailing comment in spread AType */,
          /* preserves block comment before reordered key "c" */
          // preserves line comment before reordered key "c"
          c:/* preserves comment and white space or lack of it */string/* preserves trailing comment for key "c" */,
          b: number,
          dWithoutComma: boolean
        }
      `,
      errors: [{message: 'Expected type annotations to be in ascending order. "b" must be before "c".'}],
      output: `
        type FooType = {
          /* preserves block comment before spread BType */
          // preserves line comment before spread BType
          ... /* preserves comment in spread BType */ BType<Generic> /* preserves trailing comment in spread AType */,
          /* preserves block comment before spread AType */
          // preserves line comment before spread AType
          ... /* preserves comment in spread AType */ AType /* preserves trailing comment in spread AType */,
          b: number,
          /* preserves block comment before reordered key "c" */
          // preserves line comment before reordered key "c"
          c:/* preserves comment and white space or lack of it */string/* preserves trailing comment for key "c" */,
          dWithoutComma: boolean
        }
      `,
    },
    {
      code: `
        type FooType = {
          +a: number,
          c: number,
          b: string,
        }
      `,
      errors: [{message: 'Expected type annotations to be in ascending order. "b" must be before "c".'}],
      output: `
        type FooType = {
          +a: number,
          b: string,
          c: number,
        }
      `,
    },
    {
      code: `
        type FooType = {
          -a: number,
          c: number,
          b: string,
        }
      `,
      errors: [{message: 'Expected type annotations to be in ascending order. "b" must be before "c".'}],
      output: `
        type FooType = {
          -a: number,
          b: string,
          c: number,
        }
      `,
    },
    {
      code: `
        type FooType = {
          a?: number,
          c: ?number,
          b: string,
        }
      `,
      errors: [{message: 'Expected type annotations to be in ascending order. "b" must be before "c".'}],
      output: `
        type FooType = {
          a?: number,
          b: string,
          c: ?number,
        }
      `,
    },
    {
      code: `
        type FooType = {
          a: (number) => void,
          c: number,
          b: (param: string) => number,
        }
      `,
      errors: [{message: 'Expected type annotations to be in ascending order. "b" must be before "c".'}],
      output: `
        type FooType = {
          a: (number) => void,
          b: (param: string) => number,
          c: number,
        }
      `,
    },
    {
      code: `
        type FooType = {
          a: number | string | boolean,
          c: number,
          b: (param: string) => number,
        }
      `,
      errors: [{message: 'Expected type annotations to be in ascending order. "b" must be before "c".'}],
      output: `
        type FooType = {
          a: number | string | boolean,
          b: (param: string) => number,
          c: number,
        }
      `,
    },
    {
      code: `
        type FooType = {
          c: number,
          a: number | string | boolean,
          b: (param: string) => number,
        }
      `,
      errors: [{message: 'Expected type annotations to be in ascending order. "a" must be before "c".'}],
      output: `
        type FooType = {
          a: number | string | boolean,
          b: (param: string) => number,
          c: number,
        }
      `,
    },
    {
      code: `
        type FooType = {
          c: {
            z: number,
            x: string,
            y: boolean,
          },
          a: number | string | boolean,
          b: (param: string) => number,
        }
      `,
      errors: [
        {message: 'Expected type annotations to be in ascending order. "x" must be before "z".'},
        {message: 'Expected type annotations to be in ascending order. "a" must be before "c".'},
      ],
      output: `
        type FooType = {
          a: number | string | boolean,
          b: (param: string) => number,
          c: {
            x: string,
            y: boolean,
            z: number,
          },
        }
      `,
    },
    {
      code: `
        type FooType = {
          c: {
            z: {
              j: string,
              l: number,
              k: boolean,
            },
            x: string,
            y: boolean,
          },
          a: number | string | boolean,
          b: (param: string) => number,
        }
      `,
      errors: [
        {message: 'Expected type annotations to be in ascending order. "k" must be before "l".'},
        {message: 'Expected type annotations to be in ascending order. "x" must be before "z".'},
        {message: 'Expected type annotations to be in ascending order. "a" must be before "c".'},
      ],
      output: `
        type FooType = {
          a: number | string | boolean,
          b: (param: string) => number,
          c: {
            x: string,
            y: boolean,
            z: {
              j: string,
              k: boolean,
              l: number,
            },
          },
        }
      `,
    },
    {
      code: `
        type FooType = {
          +c: number,
          -b: number,
          a: number,
        }
      `,
      errors: [
        {message: 'Expected type annotations to be in ascending order. "b" must be before "c".'},
        {message: 'Expected type annotations to be in ascending order. "a" must be before "b".'},
      ],
      output: `
        type FooType = {
          a: number,
          -b: number,
          +c: number,
        }
      `,
    },
    {
      code: `
        type FooType = {|
          +c: number,
          -b: number,
          a: number,
        |}
      `,
      errors: [
        {message: 'Expected type annotations to be in ascending order. "b" must be before "c".'},
        {message: 'Expected type annotations to be in ascending order. "a" must be before "b".'},
      ],
      output: `
        type FooType = {|
          a: number,
          -b: number,
          +c: number,
        |}
      `,
    },
    /* eslint-enable no-restricted-syntax */

    // https://github.com/gajus/eslint-plugin-flowtype/issues/455
    {
      code: `
        type FooType = {
          a(number): void,
          c: number,
          b(param: string): number,
        }
      `,
      errors: [{message: 'Expected type annotations to be in ascending order. "b" must be before "c".'}],
      output: `
        type FooType = {
          a(number): void,
          b(param: string): number,
          c: number,
        }
      `,
    },
    {
      code: `
        type FooType = {
          a: number | string | boolean,
          c: number,
          b(param: string): number,
        }
      `,
      errors: [{message: 'Expected type annotations to be in ascending order. "b" must be before "c".'}],
      output: `
        type FooType = {
          a: number | string | boolean,
          b(param: string): number,
          c: number,
        }
      `,
    },
    {
      code: `
        type FooType = {
          c: number,
          a: number | string | boolean,
          b(param: string): number,
        }
      `,
      errors: [{message: 'Expected type annotations to be in ascending order. "a" must be before "c".'}],
      output: `
        type FooType = {
          a: number | string | boolean,
          b(param: string): number,
          c: number,
        }
      `,
    },
    {
      code: `
        type FooType = {
          c: {
            z: number,
            x: string,
            y: boolean,
          },
          a: number | string | boolean,
          b(param: string): number,
        }
      `,
      errors: [
        {message: 'Expected type annotations to be in ascending order. "x" must be before "z".'},
        {message: 'Expected type annotations to be in ascending order. "a" must be before "c".'},
      ],
      output: `
        type FooType = {
          a: number | string | boolean,
          b(param: string): number,
          c: {
            x: string,
            y: boolean,
            z: number,
          },
        }
      `,
    },
    {
      code: `
        type FooType = {
          c: {
            z: {
              j: string,
              l: number,
              k: boolean,
            },
            x: string,
            y: boolean,
          },
          a: number | string | boolean,
          b(param: string): number,
        }
      `,
      errors: [
        {message: 'Expected type annotations to be in ascending order. "k" must be before "l".'},
        {message: 'Expected type annotations to be in ascending order. "x" must be before "z".'},
        {message: 'Expected type annotations to be in ascending order. "a" must be before "c".'},
      ],
      output: `
        type FooType = {
          a: number | string | boolean,
          b(param: string): number,
          c: {
            x: string,
            y: boolean,
            z: {
              j: string,
              k: boolean,
              l: number,
            },
          },
        }
      `,
    },
    {
      code: `
        type FooType = {
          /* preserves block comment before a */
          a: number | string | boolean,
          /* preserves block comment before c */
          c: number,
          /* preserves block comment before b */
          b(param: string): number,
        }
      `,
      errors: [{message: 'Expected type annotations to be in ascending order. "b" must be before "c".'}],
      output: `
        type FooType = {
          /* preserves block comment before a */
          a: number | string | boolean,
          /* preserves block comment before b */
          b(param: string): number,
          /* preserves block comment before c */
          c: number,
        }
      `,
    },

    // https://github.com/gajus/eslint-plugin-flowtype/issues/493
    {
      code: `
        export type GroupOrdersResponseType = {|
          isSuccess: boolean,
          code: number,
          message?: string,
          errorMessage: string,
          result: {|
            OrderNumber: string,
            Orders: GroupOrderSummaryType[],
            PlacedOn: string,
            Status: string,
            ReturnText: string,
            IncludesLegacyOrder: boolean
          |}
        |};
      `,
      errors: [
        {message: 'Expected type annotations to be in ascending order. "code" must be before "isSuccess".'},
        {message: 'Expected type annotations to be in ascending order. "errorMessage" must be before "message".'},
        {message: 'Expected type annotations to be in ascending order. "ReturnText" must be before "Status".'},
        {message: 'Expected type annotations to be in ascending order. "IncludesLegacyOrder" must be before "ReturnText".'},
      ],
      output: `
        export type GroupOrdersResponseType = {|
          code: number,
          errorMessage: string,
          isSuccess: boolean,
          message?: string,
          result: {|
            IncludesLegacyOrder: boolean,
            OrderNumber: string,
            Orders: GroupOrderSummaryType[],
            PlacedOn: string,
            ReturnText: string,
            Status: string
          |}
        |};
      `,
    },
  ],
  misconfigured: [
    {
      errors: [
        {
          data: 'random',
          instancePath: '/0',
          keyword: 'enum',
          message: 'must be equal to one of the allowed values',
          params: {
            allowedValues: [
              'asc',
              'desc',
            ],
          },
          parentSchema: {
            enum: [
              'asc',
              'desc',
            ],
            type: 'string',
          },
          schema: [
            'asc',
            'desc',
          ],
          schemaPath: '#/items/0/enum',
        },
      ],
      options: ['random'],
    },
  ],
  valid: [
    {
      code: 'type FooType = { a: number }',
    },
    {
      code: 'type FooType = { a: number, b: number, c: (boolean | number) }',
    },
    {
      code: 'type FooType = { a: string, b: foo, C: number }',
    },
    {
      code: 'type FooType = { 1: number, 2: boolean, 10: number }',
    },
    {
      code: 'type FooType = { c: number, b: number, a: number }',
      options: ['desc'],
    },
    {
      code: 'type FooType = { C: number, b: string, a: {} }',
      options: ['desc'],
    },
    {
      code: 'type FooType = { 10: number, 2: number, 1: boolean }',
      options: ['desc'],
    },
    {
      code: 'type FooType = { b: number, a: number }',
      settings: {
        flowtype: {
          onlyFilesWithFlowAnnotation: true,
        },
      },
    },

    // https://github.com/gajus/eslint-plugin-flowtype/issues/455
    {
      code: 'type FooType = { a: string, b(): number, c: boolean }',
    },
    {
      code: 'type FooType = { a(): string, b: number, c: boolean }',
    },
  ],
};
