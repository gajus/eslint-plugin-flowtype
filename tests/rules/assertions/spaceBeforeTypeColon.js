export default {
    invalid: [
        {
            code: '(foo : string) => {}',
            errors: [
                {
                    message: 'There must be no space before "foo" parameter type annotation colon.'
                }
            ],
            options: [
                'never'
            ]
        },
        {
            code: '(foo ?: string) => {}',
            errors: [
                {
                    message: 'There must be no space before "foo" parameter type annotation colon.'
                }
            ],
            options: [
                'never'
            ]
        },
        {
            code: '(foo: string) => {}',
            errors: [
                {
                    message: 'There must be a space before "foo" parameter type annotation colon.'
                }
            ],
            options: [
                'always'
            ]
        },
        {
            code: '(foo  : string) => {}',
            errors: [
                {
                    message: 'There must be 1 space before "foo" parameter type annotation colon.'
                }
            ],
            options: [
                'always'
            ]
        },
        {
            code: '(foo?: string) => {}',
            errors: [
                {
                    message: 'There must be a space before "foo" parameter type annotation colon.'
                }
            ],
            options: [
                'always'
            ]
        },
        {
            code: '(foo  ?: string) => {}',
            errors: [
                {
                    message: 'There must be 1 space before "foo" parameter type annotation colon.'
                }
            ],
            options: [
                'always'
            ]
        },
        {
            code: 'function x(foo : string) {}',
            errors: [
                {
                    message: 'There must be no space before "foo" parameter type annotation colon.'
                }
            ]
        },
        {
            code: 'function x(foo: string) {}',
            errors: [
                {
                    message: 'There must be a space before "foo" parameter type annotation colon.'
                }
            ],
            options: [
                'always'
            ]
        },
        {
            code: 'var x = function (foo : string) {}',
            errors: [
                {
                    message: 'There must be no space before "foo" parameter type annotation colon.'
                }
            ]
        },
        {
            code: 'var x = function (foo: string) {}',
            errors: [
                {
                    message: 'There must be a space before "foo" parameter type annotation colon.'
                }
            ],
            options: [
                'always'
            ]
        },
        {
            code: 'class Foo { constructor(foo : string ) {} }',
            errors: [
                {
                    message: 'There must be no space before "foo" parameter type annotation colon.'
                }
            ]
        },
        {
            code: 'class Foo { constructor(foo: string ) {} }',
            errors: [
                {
                    message: 'There must be a space before "foo" parameter type annotation colon.'
                }
            ],
            options: [
                'always'
            ]
        },
        {
            code: 'async function foo({ lorem, ipsum, dolor } : SomeType) {}',
            errors: [
                {
                    message: 'There must be no space before "{ lorem, ipsum, dolor } : SomeType" parameter type annotation colon.'
                }
            ]
        },
        {
            code: '({ lorem, ipsum, dolor } : SomeType) => {}',
            errors: [
                {
                    // NOTE: this message is different because of a Babylon parser bug with arrow functions
                    // where the param ranges don't include the type annotation like other functions do
                    message: 'There must be no space before "{ lorem, ipsum, dolor }" parameter type annotation colon.'
                }
            ]
        },
        {
            code: '(foo : { a: string, b: number }) => {}',
            errors: [
                {
                    message: 'There must be no space before "foo" parameter type annotation colon.'
                }
            ]
        },
        {
            code: '({ a, b } : { a: string, b: number }) => {}',
            errors: [
                {
                    message: 'There must be no space before "{ a, b }" parameter type annotation colon.'
                }
            ]
        },
        {
            code: '([ a, b ] : string[]) => {}',
            errors: [
                {
                    message: 'There must be no space before "[ a, b ]" parameter type annotation colon.'
                }
            ]
        },
        {
            code: 'type X = { foo : string }',
            errors: [
                {
                    message: 'There must be no space before "foo" type annotation colon.'
                }
            ]
        },
        {
            code: 'type X = { foo : string }',
            errors: [
                {
                    message: 'There must be no space before "foo" type annotation colon.'
                }
            ],
            options: [
                'never'
            ]
        },
        {
            code: 'type X = { foo: string }',
            errors: [
                {
                    message: 'There must be a space before "foo" type annotation colon.'
                }
            ],
            options: [
                'always'
            ]
        },
        {
            code: 'type X = { foo  : string }',
            errors: [
                {
                    message: 'There must be 1 space before "foo" type annotation colon.'
                }
            ],
            options: [
                'always'
            ]
        },
        {
            code: 'type X = { foo? : string }',
            errors: [
                {
                    message: 'There must be no space before "foo" type annotation colon.'
                }
            ]
        },
        {
            code: 'type X = { foo?: string }',
            errors: [
                {
                    message: 'There must be a space before "foo" type annotation colon.'
                }
            ],
            options: [
                'always'
            ]
        },
        {
            code: 'type X = { foo?  : string }',
            errors: [
                {
                    message: 'There must be 1 space before "foo" type annotation colon.'
                }
            ],
            options: [
                'always'
            ]
        },
        {
            code: 'type X = { foo   ?: string }',
            errors: [
                {
                    message: 'There must be a space before "foo" type annotation colon.'
                }
            ],
            options: [
                'always'
            ]
        },
        {
            code: 'class X { foo :string }',
            errors: [
                {
                    message: 'There must be no space before "foo" class property type annotation colon.'
                }
            ]
        },
        {
            code: 'class X { foo: string }',
            errors: [
                {
                    message: 'There must be a space before "foo" class property type annotation colon.'
                }
            ],
            options: [
                'always'
            ]
        },
        {
            code: 'class X { foo :?string }',
            errors: [
                {
                    message: 'There must be no space before "foo" class property type annotation colon.'
                }
            ]
        },
        {
            code: 'class X { foo: ?string }',
            errors: [
                {
                    message: 'There must be a space before "foo" class property type annotation colon.'
                }
            ],
            options: [
                'always'
            ]
        }
    ],
    valid: [
        {
            code: '(foo) => {}'
        },
        {
            code: '(foo: string) => {}'
        },
        {
            code: '(foo?: string) => {}'
        },
        {
            code: '(foo: string) => {}',
            options: [
                'never'
            ]
        },
        {
            code: '(foo : string) => {}',
            options: [
                'always'
            ]
        },
        {
            code: '(foo ?: string) => {}',
            options: [
                'always'
            ]
        },
        {
            code: 'function x(foo: string) {}'
        },
        {
            code: 'function x(foo : string) {}',
            options: [
                'always'
            ]
        },
        {
            code: 'var x = function (foo: string) {}'
        },
        {
            code: 'var x = function (foo : string) {}',
            options: [
                'always'
            ]
        },
        {
            code: 'class Foo { constructor(foo: string ) {} }'
        },
        {
            code: 'class Foo { constructor(foo : string ) {} }',
            options: [
                'always'
            ]
        },
        {
            code: 'async function foo({ lorem, ipsum, dolor }: SomeType) {}'
        },
        {
            code: '({ lorem, ipsum, dolor }: SomeType) => {}'
        },
        {
            code: '(foo: { a: string, b: number }) => {}'
        },
        {
            code: '({ a, b }: ?{ a: string, b: number }) => {}'
        },
        {
            code: 'function x({ a, b }: { a: string, b: number }) {}'
        },
        {
            code: '(): { a: number, b: string } => {}'
        },
        {
            code: '() : { a : number, b : string } => {}',
            options: [
                'always'
            ]
        },
        {
            code: '([ a, b ]: string[]) => {}'
        },
        {
            code: 'type X = { foo: string }'
        },
        {
            code: 'type X = { foo : string }',
            options: [
                'always'
            ]
        },
        {
            code: 'type X = { foo?: string }'
        },
        {
            code: 'type X = { foo? : string }',
            options: [
                'always'
            ]
        },
        {
            code: 'class Foo { bar }'
        },
        {
            code: 'class Foo { bar = 3 }'
        },
        {
            code: 'class Foo { bar: string }'
        },
        {
            code: 'class Foo { bar: ?string }'
        },
        {
            code: 'class Foo { bar:?string }'
        },
        {
            code: 'class Foo { bar : string }',
            options: [
                'always'
            ]
        }
    ]
};
