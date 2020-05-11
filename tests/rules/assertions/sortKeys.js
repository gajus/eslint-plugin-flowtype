export default {
  invalid: [
    {
      code: 'type FooType = { a: number, c: number, b: string }',
      errors: [{message: 'Expected type annotations to be in ascending order. "b" should be before "c".'}],
      output: 'type FooType = { a: number, b: string, c: number }',
    },
    {
      code: 'type FooType = { a: number, b: number, C: number }',
      errors: [{message: 'Expected type annotations to be in ascending order. "C" should be before "b".'}],
      output: 'type FooType = { C: number, a: number, b: number }',
    },
    {
      code: 'type FooType = { 1: number, 2: number, 10: number }',
      errors: [{message: 'Expected type annotations to be in ascending order. "10" should be before "2".'}],
      output: 'type FooType = { 1: number, 10: number, 2: number }',
    },
    {
      code: 'type FooType = { a: number, b: number }',
      errors: [{message: 'Expected type annotations to be in descending order. "b" should be before "a".'}],
      options: ['desc'],
      output: 'type FooType = { b: number, a: number }',
    },
    {
      code: 'type FooType = { C: number, b: number, a: string }',
      errors: [{message: 'Expected type annotations to be in descending order. "b" should be before "C".'}],
      options: ['desc'],
      output: 'type FooType = { b: number, a: string, C: number }',
    },
    {
      code: 'type FooType = { 10: number, 2: number, 1: number }',
      errors: [{message: 'Expected type annotations to be in descending order. "2" should be before "10".'}],
      options: ['desc'],
      output: 'type FooType = { 2: number, 10: number, 1: number }',
    },
    {
      code: 'type FooType = { a: number, c: number, C: number, b: string }',
      errors: [{message: 'Expected type annotations to be in insensitive ascending order. "b" should be before "C".'}],
      options: ['asc', {caseSensitive: false}],
      output: 'type FooType = { a: number, b: string, c: number, C: number }',
    },
    {
      code: 'type FooType = { a: number, C: number, c: number, b: string }',
      errors: [{message: 'Expected type annotations to be in insensitive ascending order. "b" should be before "c".'}],
      options: ['asc', {caseSensitive: false}],
      output: 'type FooType = { a: number, b: string, C: number, c: number }',
    },
    {
      code: 'type FooType = { 1: number, 10: number, 2: boolean }',
      errors: [{message: 'Expected type annotations to be in natural ascending order. "2" should be before "10".'}],
      options: ['asc', {natural: true}],
      output: 'type FooType = { 1: number, 2: boolean, 10: number }',
    },
    {
      code: 'type FooType = { a: number, c: number, b: string }',
      errors: [{message: 'Expected type annotations to be in ascending order. "b" should be before "c".'}],
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
      errors: [{message: 'Expected type annotations to be in ascending order. "b" should be before "c".'}],
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
      errors: [{message: 'Expected type annotations to be in ascending order. "b" should be before "c".'}],
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
        {message: 'Expected type annotations to be in ascending order. "x" should be before "y".'},
        {message: 'Expected type annotations to be in ascending order. "k" should be before "l".'},
        {message: 'Expected type annotations to be in ascending order. "b" should be before "c".'},
        {message: 'Expected type annotations to be in ascending order. "x" should be before "y".'},
        {message: 'Expected type annotations to be in ascending order. "k" should be before "l".'},
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
      errors: [{message: 'Expected type annotations to be in ascending order. "b" should be before "c".'}],
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
        {message: 'Expected type annotations to be in ascending order. "b" should be before "c".'},
        {message: 'Expected type annotations to be in ascending order. "d" should be before "e".'},
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
      errors: [{message: 'Expected type annotations to be in ascending order. "b" should be before "c".'}],
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
      errors: [{message: 'Expected type annotations to be in ascending order. "b" should be before "c".'}],
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
      errors: [{message: 'Expected type annotations to be in ascending order. "b" should be before "c".'}],
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
      errors: [{message: 'Expected type annotations to be in ascending order. "b" should be before "c".'}],
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
      errors: [{message: 'Expected type annotations to be in ascending order. "b" should be before "c".'}],
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
      errors: [{message: 'Expected type annotations to be in ascending order. "b" should be before "c".'}],
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
      errors: [{message: 'Expected type annotations to be in ascending order. "b" should be before "c".'}],
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
      errors: [{message: 'Expected type annotations to be in ascending order. "a" should be before "c".'}],
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
        {message: 'Expected type annotations to be in ascending order. "x" should be before "z".'},
        {message: 'Expected type annotations to be in ascending order. "a" should be before "c".'},
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
        {message: 'Expected type annotations to be in ascending order. "k" should be before "l".'},
        {message: 'Expected type annotations to be in ascending order. "x" should be before "z".'},
        {message: 'Expected type annotations to be in ascending order. "a" should be before "c".'},
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
        {message: 'Expected type annotations to be in ascending order. "b" should be before "c".'},
        {message: 'Expected type annotations to be in ascending order. "a" should be before "b".'},
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
        {message: 'Expected type annotations to be in ascending order. "b" should be before "c".'},
        {message: 'Expected type annotations to be in ascending order. "a" should be before "b".'},
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
  ],
  misconfigured: [
    {
      errors: [
        {
          data: 'random',
          dataPath: '[0]',
          keyword: 'enum',
          message: 'should be equal to one of the allowed values',
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
    {
      errors: [
        {
          data: {
            language: 'jp-JP',
          },
          dataPath: '[1]',
          keyword: 'additionalProperties',
          message: 'should NOT have additional properties',
          params: {
            additionalProperty: 'language',
          },
          parentSchema: {
            additionalProperties: false,
            properties: {
              caseSensitive: {
                type: 'boolean',
              },
              natural: {
                type: 'boolean',
              },
            },
            type: 'object',
          },
          schema: false,
          schemaPath: '#/items/1/additionalProperties',
        },
      ],
      options: ['asc', {language: 'jp-JP'}],
    },
    {
      errors: [
        {
          data: 'no',
          dataPath: '[1].caseSensitive',
          keyword: 'type',
          message: 'should be boolean',
          params: {
            type: 'boolean',
          },
          parentSchema: {
            type: 'boolean',
          },
          schema: 'boolean',
          schemaPath: '#/items/1/properties/caseSensitive/type',
        },
      ],
      options: ['desc', {caseSensitive: 'no'}],
    },
    {
      errors: [
        {
          data: 'no',
          dataPath: '[1].natural',
          keyword: 'type',
          message: 'should be boolean',
          params: {
            type: 'boolean',
          },
          parentSchema: {
            type: 'boolean',
          },
          schema: 'boolean',
          schemaPath: '#/items/1/properties/natural/type',
        },
      ],
      options: ['desc', {natural: 'no'}],
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
      code: 'type FooType = { C: number, a: string, b: foo }',
    },
    {
      code: 'type FooType = { 1: number, 10: number, 2: boolean }',
    },
    {
      code: 'type FooType = { c: number, b: number, a: number }',
      options: ['desc'],
    },
    {
      code: 'type FooType = { b: string, a: {}, C: number }',
      options: ['desc'],
    },
    {
      code: 'type FooType = { 2: number, 10: number, 1: boolean }',
      options: ['desc'],
    },
    {
      code: 'type FooType = { a: number, b: number, c: number, C: number }',
      options: ['asc', {caseSensitive: false}],
    },
    {
      code: 'type FooType = { a: number, b: number, C: number, c: number }',
      options: ['asc', {caseSensitive: false}],
    },
    {
      code: 'type FooType = { 1:number, 2: number, 10: number }',
      options: ['asc', {natural: true}],
    },
    {
      code: 'type FooType = { b: number, a: number }',
      settings: {
        flowtype: {
          onlyFilesWithFlowAnnotation: true,
        },
      },
    },
  ],
};
