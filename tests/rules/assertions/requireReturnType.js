export default {
  invalid: [
    {
      code: '(foo) => { return "foo"; }',
      errors: [
        {
          message: 'Missing return type annotation.'
        }
      ]
    },
    {
      code: '(foo) => { return "foo"; }',
      errors: [
        {
          message: 'Missing return type annotation.'
        }
      ],
      options: [
        'always'
      ]
    },
    {
      code: '(foo) => "foo"',
      errors: [
        {
          message: 'Missing return type annotation.'
        }
      ],
      options: [
        'always'
      ]
    },
    {
      code: '(foo) => ({})',
      errors: [
        {
          message: 'Missing return type annotation.'
        }
      ]
    },
    {
      code: '(foo): undefined => { return; }',
      errors: [
        {
          message: 'Must not annotate undefined return type.'
        }
      ]
    },
    {
      code: '(foo): void => { return; }',
      errors: [
        {
          message: 'Must not annotate undefined return type.'
        }
      ]
    },
    {
      code: '(foo): undefined => { return undefined; }',
      errors: [
        {
          message: 'Must not annotate undefined return type.'
        }
      ]
    },
    {
      code: '(foo): void => { return void 0; }',
      errors: [
        {
          message: 'Must not annotate undefined return type.'
        }
      ]
    },
    {
      code: '(foo): undefined => { return; }',
      errors: [
        {
          message: 'Must not annotate undefined return type.'
        }
      ],
      options: [
        'always',
        {
          annotateUndefined: 'never'
        }
      ]
    },
    {
      code: '(foo): void => { return; }',
      errors: [
        {
          message: 'Must not annotate undefined return type.'
        }
      ],
      options: [
        'always',
        {
          annotateUndefined: 'never'
        }
      ]
    },
    {
      code: '(foo) => { return; }',
      errors: [
        {
          message: 'Must annotate undefined return type.'
        }
      ],
      options: [
        'always',
        {
          annotateUndefined: 'always'
        }
      ]
    },
    {
      code: '(foo): undefined => { return undefined; }',
      errors: [
        {
          message: 'Must not annotate undefined return type.'
        }
      ],
      options: [
        'always',
        {
          annotateUndefined: 'never'
        }
      ]
    },
    {
      code: '(foo) => { return undefined; }',
      errors: [
        {
          message: 'Must annotate undefined return type.'
        }
      ],
      options: [
        'always',
        {
          annotateUndefined: 'always'
        }
      ]
    },
    {
      code: '(foo) => { return void 0; }',
      errors: [
        {
          message: 'Must annotate undefined return type.'
        }
      ],
      options: [
        'always',
        {
          annotateUndefined: 'always'
        }
      ]
    },
    {
      code: '// @flow\n(foo) => { return 1; }',
      errors: [
        {
          message: 'Missing return type annotation.'
        }
      ],
      settings: {
        flowtype: {
          onlyFilesWithFlowAnnotation: true
        }
      }
    },
    {
      code: '// @flow\n (foo) => { return undefined; }',
      errors: [
        {
          message: 'Must annotate undefined return type.'
        }
      ],
      options: [
        'always',
        {
          annotateUndefined: 'always'
        }
      ],
      settings: {
        flowtype: {
          onlyFilesWithFlowAnnotation: true
        }
      }
    },
    {
      code: 'async () => { return 2; }',
      errors: [
        {
          message: 'Missing return type annotation.'
        }
      ],
      options: [
        'always'
      ]
    },
    {
      code: 'async () => {}',
      errors: [
        {
          message: 'Missing return type annotation.'
        }
      ],
      options: [
        'always',
        {
          annotateUndefined: 'always'
        }
      ]
    },
    {
      code: 'async function x() {}',
      errors: [
        {
          message: 'Missing return type annotation.'
        }
      ],
      options: [
        'always',
        {
          annotateUndefined: 'always'
        }
      ]
    },
    {
      code: 'class Test { constructor() { } }',
      errors: [
        {
          message: 'Must annotate undefined return type.'
        }
      ],
      options: [
        'always',
        {
          annotateUndefined: 'always'
        }
      ]
    },
    {
      code: 'async () => { return; }',
      errors: [
        {
          message: 'Missing return type annotation.'
        }
      ],
      options: [
        'always'
      ]
    },
    {
      code: 'function* x() {}',
      errors: [
        {
          message: 'Missing return type annotation.'
        }
      ],
      options: [
        'always'
      ]
    },
    {
      code: '() => { return 3; }',
      errors: [
        {
          message: 'Missing return type annotation.'
        }
      ],
      options: [
        'always',
        {
          excludeArrowFunctions: 'expressionsOnly'
        }
      ]
    },
    {
      code: 'async () => { return 4; }',
      errors: [
        {
          message: 'Missing return type annotation.'
        }
      ],
      options: [
        'always',
        {
          excludeArrowFunctions: 'expressionsOnly'
        }
      ]
    },
    {
      code: 'function foo() { return 42; }\nfunction bar() { return 42; }',
      errors: [
        {
          message: 'Missing return type annotation.'
        }
      ],
      options: [
        'always',
        {
          includeOnlyMatching: [
            'bar'
          ]
        }
      ]
    },
    {
      code: 'const foo = () => { return 42; };\nconst bar = () => { return 42; }',
      errors: [
        {
          message: 'Missing return type annotation.'
        }
      ],
      options: [
        'always',
        {
          includeOnlyMatching: [
            'bar'
          ]
        }
      ]
    }
  ],
  misconfigured: [
    {
      errors: [
        {
          data: 'never',
          dataPath: '[0]',
          keyword: 'enum',
          message: 'should be equal to one of the allowed values',
          params: {
            allowedValues: [
              'always'
            ]
          },
          parentSchema: {
            enum: [
              'always'
            ],
            type: 'string'
          },
          schema: [
            'always'
          ],
          schemaPath: '#/items/0/enum'
        }
      ],
      options: ['never']
    },
    {
      errors: [
        {
          data: {
            excludeOtherStuff: true
          },
          dataPath: '[1]',
          keyword: 'additionalProperties',
          message: 'should NOT have additional properties',
          params: {
            additionalProperty: 'excludeOtherStuff'
          },
          parentSchema: {
            additionalProperties: false,
            properties: {
              annotateUndefined: {
                enum: [
                  'always',
                  'never'
                ],
                type: 'string'
              },
              excludeArrowFunctions: {
                enum: [
                  false,
                  true,
                  'expressionsOnly'
                ]
              },
              excludeMatching: {
                items: {
                  type: 'string'
                },
                type: 'array'
              },
              includeOnlyMatching: {
                items: {
                  type: 'string'
                },
                type: 'array'
              }
            },
            type: 'object'
          },
          schema: false,
          schemaPath: '#/items/1/additionalProperties'
        }
      ],
      options: ['always', {excludeOtherStuff: true}]
    },
    {
      errors: [
        {
          data: 'often',
          dataPath: '[1].annotateUndefined',
          keyword: 'enum',
          message: 'should be equal to one of the allowed values',
          params: {
            allowedValues: [
              'always',
              'never'
            ]
          },
          parentSchema: {
            enum: [
              'always',
              'never'
            ],
            type: 'string'
          },
          schema: [
            'always',
            'never'
          ],
          schemaPath: '#/items/1/properties/annotateUndefined/enum'
        }
      ],
      options: ['always', {annotateUndefined: 'often'}]
    },
    {
      errors: [
        {
          data: 'everything',
          dataPath: '[1].excludeArrowFunctions',
          keyword: 'enum',
          message: 'should be equal to one of the allowed values',
          params: {
            allowedValues: [
              false,
              true,
              'expressionsOnly'
            ]
          },
          parentSchema: {
            enum: [
              false,
              true,
              'expressionsOnly'
            ]
          },
          schema: [
            false,
            true,
            'expressionsOnly'
          ],
          schemaPath: '#/items/1/properties/excludeArrowFunctions/enum'
        }
      ],
      options: ['always', {excludeArrowFunctions: 'everything'}]
    },
    {
      errors: [
        {
          data: '^foo',
          dataPath: '[1].excludeMatching',
          keyword: 'type',
          message: 'should be array',
          params: {
            type: 'array'
          },
          parentSchema: {
            items: {
              type: 'string'
            },
            type: 'array'
          },
          schema: 'array',
          schemaPath: '#/items/1/properties/excludeMatching/type'
        }
      ],
      options: ['always', {excludeMatching: '^foo'}]
    },
    {
      errors: [
        {
          data: false,
          dataPath: '[1].includeOnlyMatching[0]',
          keyword: 'type',
          message: 'should be string',
          params: {
            type: 'string'
          },
          parentSchema: {
            type: 'string'
          },
          schema: 'string',
          schemaPath: '#/items/1/properties/includeOnlyMatching/items/type'
        }
      ],
      options: ['always', {includeOnlyMatching: [false]}]
    }
  ],
  valid: [
    {
      code: 'return;'
    },
    {
      code: '(foo): string => {}'
    },
    {
      code: '(foo): string => {}',
      options: [
        'always'
      ]
    },
    {
      code: '(foo) => { return; }'
    },
    {
      code: '(foo): Object => ( {} )'
    },
    {
      code: '(foo) => { return undefined; }'
    },
    {
      code: '(foo) => { return void 0; }'
    },
    {
      code: '(foo): undefined => { return; }',
      options: [
        'always',
        {
          annotateUndefined: 'always'
        }
      ]
    },
    {
      code: '(foo): void => { return; }',
      options: [
        'always',
        {
          annotateUndefined: 'always'
        }
      ]
    },
    {
      code: '(foo) => { return; }',
      options: [
        'always',
        {
          annotateUndefined: 'never'
        }
      ]
    },
    {
      code: '(foo) => { return undefined; }',
      options: [
        'always',
        {
          annotateUndefined: 'never'
        }
      ]
    },
    {
      code: '(foo) => { return void 0; }',
      options: [
        'always',
        {
          annotateUndefined: 'never'
        }
      ]
    },
    {
      code: '(foo): undefined => { return undefined; }',
      options: [
        'always',
        {
          annotateUndefined: 'always'
        }
      ]
    },
    {
      code: '(foo): void => { return void 0; }',
      options: [
        'always',
        {
          annotateUndefined: 'always'
        }
      ]
    },
    {
      code: '(foo) => { return 1; }',
      options: [
        'always'
      ],
      settings: {
        flowtype: {
          onlyFilesWithFlowAnnotation: true
        }
      }
    },
    {
      code: '(foo) => { return undefined; }',
      options: [
        'always',
        {
          annotateUndefined: 'always'
        }
      ],
      settings: {
        flowtype: {
          onlyFilesWithFlowAnnotation: true
        }
      }
    },
    {
      code: 'async function doThing(): Promise<void> {}',
      options: [
        'always',
        {
          annotateUndefined: 'always'
        }
      ]
    },
    {
      code: 'function* doThing(): Generator<number, void, void> { yield 2; }',
      options: [
        'always',
        {
          annotateUndefined: 'always'
        }
      ]
    },
    {
      code: 'class Test { constructor() { } }',
      options: [
        'always',
        {
          annotateUndefined: 'always',
          excludeMatching: [ 'constructor' ]
        }
      ]
    },
    {
      code: 'class Test { constructor() { } }'
    },
    {
      code: 'async (foo): Promise<number> => { return 3; }'
    },
    {
      code: '() => 3',
      options: [
        'always',
        {
          excludeArrowFunctions: true
        }
      ]
    },
    {
      code: '() => { return 4; }',
      options: [
        'always',
        {
          excludeArrowFunctions: true
        }
      ]
    },
    {
      code: '() => undefined',
      options: [
        'always',
        {
          excludeArrowFunctions: true
        }
      ]
    },
    {
      code: '() => undefined',
      options: [
        'always',
        {
          annotateUndefined: 'always',
          excludeArrowFunctions: true
        }
      ]
    },
    {
      code: '() => { return undefined; }',
      options: [
        'always',
        {
          annotateUndefined: 'always',
          excludeArrowFunctions: true
        }
      ]
    },
    {
      code: '() => 3',
      options: [
        'always',
        {
          excludeArrowFunctions: 'expressionsOnly'
        }
      ]
    },
    {
      code: 'async () => 3',
      options: [
        'always',
        {
          excludeArrowFunctions: 'expressionsOnly'
        }
      ]
    },
    {
      code: 'function foo() { return 42; }',
      options: [
        'always',
        {
          excludeMatching: [
            'foo'
          ]
        }
      ]
    },
    {
      code: 'function foo() { return 42; }',
      options: [
        'always',
        {
          includeOnlyMatching: [
            'bar'
          ]
        }
      ]
    },
    {
      code: 'function foo(): number { return 42; }\nfunction bar() { return 42; }',
      options: [
        'always',
        {
          excludeMatching: [
            'bar'
          ]
        }
      ]
    },
    {
      code: 'function foo(): number { return 42; }\nfunction bar() { return 42; }',
      options: [
        'always',
        {
          includeOnlyMatching: [
            'foo',
            'baz'
          ]
        }
      ]
    },
    {
      code: 'function foo(): number { return 42; }\nfunction bar() { return 42; }',
      options: [
        'always',
        {
          excludeMatching: [
            '^b.*',
            'qux'
          ]
        }
      ]
    },
    {
      code: 'function foo(): number { return 42; }\nfunction bar() { return 42; }',
      options: [
        'always',
        {
          includeOnlyMatching: [
            '^f.*'
          ]
        }
      ]
    }
  ]
};
