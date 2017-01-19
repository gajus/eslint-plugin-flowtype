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
  valid: [
    {
      code: 'return;'
    },
    {
      code: '(foo): string => {}'
    },
    {
      code: 'const f: Foo = (a, b) => 42;'
    },
    {
      code: '(foo): string => {}',
      options: [
        'always'
      ]
    },
    {
      code: 'type fn = (a: string, b: number) => number;\nconst f: fn = (a, b) => { return 42; }'
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
