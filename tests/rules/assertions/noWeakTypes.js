export default {
  invalid: [
    {
      code: 'function foo(thing): any {}',
      errors: [{
        message: 'Unexpected use of weak type "any"'
      }]
    },
    {
      code: 'function foo(thing): Promise<any> {}',
      errors: [{
        message: 'Unexpected use of weak type "any"'
      }]
    },
    {
      code: 'function foo(thing): Promise<Promise<any>> {}',
      errors: [{
        message: 'Unexpected use of weak type "any"'
      }]
    },
    {
      code: 'function foo(thing): Object {}',
      errors: [{
        message: 'Unexpected use of weak type "Object"'
      }]
    },
    {
      code: 'function foo(thing): Promise<Object> {}',
      errors: [{
        message: 'Unexpected use of weak type "Object"'
      }]
    },
    {
      code: 'function foo(thing): Promise<Promise<Object>> {}',
      errors: [{
        message: 'Unexpected use of weak type "Object"'
      }]
    },
    {
      code: 'function foo(thing): Function {}',
      errors: [{
        message: 'Unexpected use of weak type "Function"'
      }]
    },
    {
      code: 'function foo(thing): Promise<Function> {}',
      errors: [{
        message: 'Unexpected use of weak type "Function"'
      }]
    },
    {
      code: 'function foo(thing): Promise<Promise<Function>> {}',
      errors: [{
        message: 'Unexpected use of weak type "Function"'
      }]
    },
    {
      code: '(foo: any) => {}',
      errors: [{
        message: 'Unexpected use of weak type "any"'
      }]
    },
    {
      code: '(foo: Function) => {}',
      errors: [{
        message: 'Unexpected use of weak type "Function"'
      }]
    },
    {
      code: '(foo?: any) => {}',
      errors: [{
        message: 'Unexpected use of weak type "any"'
      }]
    },
    {
      code: '(foo?: Function) => {}',
      errors: [{
        message: 'Unexpected use of weak type "Function"'
      }]
    },
    {
      code: '(foo: { a: any }) => {}',
      errors: [{
        message: 'Unexpected use of weak type "any"'
      }]
    },
    {
      code: '(foo: { a: Object }) => {}',
      errors: [{
        message: 'Unexpected use of weak type "Object"'
      }]
    },
    {
      code: '(foo: any[]) => {}',
      errors: [{
        message: 'Unexpected use of weak type "any"'
      }]
    },
    {
      code: 'type Foo = any',
      errors: [{
        message: 'Unexpected use of weak type "any"'
      }]
    },
    {
      code: 'type Foo = Function',
      errors: [{
        message: 'Unexpected use of weak type "Function"'
      }]
    },
    {
      code: 'type Foo = { a: any }',
      errors: [{
        message: 'Unexpected use of weak type "any"'
      }]
    },
    {
      code: 'type Foo = { a: Object }',
      errors: [{
        message: 'Unexpected use of weak type "Object"'
      }]
    },
    {
      code: 'type Foo = { (a: Object): string }',
      errors: [{
        message: 'Unexpected use of weak type "Object"'
      }]
    },
    {
      code: 'type Foo = { (a: string): Function }',
      errors: [{
        message: 'Unexpected use of weak type "Function"'
      }]
    },
    {
      code: 'function foo(thing: any) {}',
      errors: [{
        message: 'Unexpected use of weak type "any"'
      }]
    },
    {
      code: 'function foo(thing: Object) {}',
      errors: [{
        message: 'Unexpected use of weak type "Object"'
      }]
    },
    {
      code: 'var foo: Function',
      errors: [{
        message: 'Unexpected use of weak type "Function"'
      }]
    },
    {
      code: 'var foo: Object',
      errors: [{
        message: 'Unexpected use of weak type "Object"'
      }]
    },
    {
      code: 'class Foo { props: any }',
      errors: [{
        message: 'Unexpected use of weak type "any"'
      }]
    },
    {
      code: 'class Foo { props: Object }',
      errors: [{
        message: 'Unexpected use of weak type "Object"'
      }]
    },
    {
      code: 'var foo: any',
      errors: [{
        message: 'Unexpected use of weak type "any"'
      }]
    },
    {
      code: 'type X = any; type Y = Function; type Z = Object',
      errors: [
        {message: 'Unexpected use of weak type "any"'},
        {message: 'Unexpected use of weak type "Object"'}
      ],
      options: [{
        Function: false
      }]
    },
    {
      code: 'type X = any; type Y = Function; type Z = Object',
      errors: [{message: 'Unexpected use of weak type "Function"'}],
      options: [{
        Object: false,
        any: false
      }]
    }
  ],
  valid: [
    {
      code: 'function foo(thing): string {}'
    },
    {
      code: 'function foo(thing): Promise<string> {}'
    },
    {
      code: 'function foo(thing): Promise<Promise<string>> {}'
    },
    {
      code: '(foo?: string) => {}'
    },
    {
      code: '(foo: ?string) => {}'
    },
    {
      code: '(foo: { a: string }) => {}'
    },
    {
      code: '(foo: { a: ?string }) => {}'
    },
    {
      code: '(foo: string[]) => {}'
    },
    {
      code: 'type Foo = string'
    },
    {
      code: 'type Foo = { a: string }'
    },
    {
      code: 'type Foo = { (a: string): string }'
    },
    {
      code: 'function foo(thing: string) {}'
    },
    {
      code: 'var foo: string'
    },
    {
      code: 'class Foo { props: string }'
    },
    {
      code: 'type X = any; type Y = Object',
      options: [{
        Object: false,
        any: false
      }]
    },
    {
      code: 'type X = Function',
      options: [{Function: false}]
    }
  ]
};
