export default {
  invalid: [
    {
      code: 'function foo(thing): mixed {}',
      errors: [{
        message: 'Unexpected use of mixed type'
      }]
    },
    {
      code: 'function foo(thing): Promise<mixed> {}',
      errors: [{
        message: 'Unexpected use of mixed type'
      }]
    },
    {
      code: 'function foo(thing): Promise<Promise<mixed>> {}',
      errors: [{
        message: 'Unexpected use of mixed type'
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
    }
  ]
};
