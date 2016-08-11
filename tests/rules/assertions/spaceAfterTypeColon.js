export default {
    invalid: [
        {
            code: '(foo: string) => {}',
            errors: [
                {
                    message: 'There must be no space after "foo" parameter type annotation colon.'
                }
            ],
            options: [
                'never'
            ]
        },
        {
            code: 'export default function (foo: string) {}',
            errors: [
                {
                    message: 'There must be no space after "foo" parameter type annotation colon.'
                }
            ],
            options: [
                'never'
            ]
        },
        {
            code: 'function foo (foo: string) {}',
            errors: [
                {
                    message: 'There must be no space after "foo" parameter type annotation colon.'
                }
            ],
            options: [
                'never'
            ]
        },
        {
            code: '(foo:string) => {}',
            errors: [
                {
                    message: 'There must be a space after "foo" parameter type annotation colon.'
                }
            ],
            options: [
                'always'
            ]
        },
        {
            code: 'function foo (foo:string) {}',
            errors: [
                {
                    message: 'There must be a space after "foo" parameter type annotation colon.'
                }
            ]
        },
        {
            code: '(foo:  string) => {}',
            errors: [
                {
                    message: 'There must be 1 space after "foo" parameter type annotation colon.'
                }
            ],
            options: [
                'always'
            ]
        },
        {
            code: '(foo:(() => void)) => {}',
            errors: [
                {
                    message: 'There must be a space after "foo" parameter type annotation colon.'
                }
            ],
            options: [
                'always'
            ]
        },
        {
            code: '(foo: (() => void)) => {}',
            errors: [
                {
                    message: 'There must be no space after "foo" parameter type annotation colon.'
                }
            ],
            options: [
                'never'
            ]
        },
        {
            code: '(foo:  (() => void)) => {}',
            errors: [
                {
                    message: 'There must be 1 space after "foo" parameter type annotation colon.'
                }
            ],
            options: [
                'always'
            ]
        },
        {
            code: '():Object => {}',
            errors: [
                {
                    message: 'There must be a space after return type colon.'
                }
            ],
            options: [
                'always'
            ]
        }, {
            code: '(): Object => {}',
            errors: [
                {
                    message: 'There must be no space after return type colon.'
                }
            ],
            options: [
                'never'
            ]
        }, {
            code: '():  Object => {}',
            errors: [
                {
                    message: 'There must be 1 space after return type colon.'
                }
            ],
            options: [
                'always'
            ]
        },
        {
            code: '():(() => void) => {}',
            errors: [
                {
                    message: 'There must be a space after return type colon.'
                }
            ],
            options: [
                'always'
            ]
        }, {
            code: '(): (() => void) => {}',
            errors: [
                {
                    message: 'There must be no space after return type colon.'
                }
            ],
            options: [
                'never'
            ]
        }, {
            code: '():  (() => void) => {}',
            errors: [
                {
                    message: 'There must be 1 space after return type colon.'
                }
            ],
            options: [
                'always'
            ]
        },
        {
            code: 'async function foo({ lorem, ipsum, dolor }:SomeType) {}',
            errors: [
                {
                    message: 'There must be a space after "{ lorem, ipsum, dolor }:SomeType" parameter type annotation colon.'
                }
            ]
        },
        {
            code: '({ lorem, ipsum, dolor } :   SomeType) => {}',
            errors: [
                {
                    // NOTE: this message is different because of a Babylon parser bug with arrow functions
                    // where the param ranges don't include the type annotation like other functions do
                    message: 'There must be 1 space after "{ lorem, ipsum, dolor }" parameter type annotation colon.'
                }
            ]
        },
        {
            code: '(foo:{ a: string, b: number }) => {}',
            errors: [
                {
                    message: 'There must be a space after "foo" parameter type annotation colon.'
                }
            ]
        },
        {
            code: '({ a, b } :{ a: string, b: number }) => {}',
            errors: [
                {
                    message: 'There must be a space after "{ a, b }" parameter type annotation colon.'
                }
            ]
        },
        {
            code: '([ a, b ] :string[]) => {}',
            errors: [
                {
                    message: 'There must be a space after "[ a, b ]" parameter type annotation colon.'
                }
            ]
        },
        {
            code: 'type X = { foo:string }',
            errors: [
                {
                    message: 'There must be a space after "foo" type annotation colon.'
                }
            ]
        },
        {
            code: 'type X = { foo:string }',
            errors: [
                {
                    message: 'There must be a space after "foo" type annotation colon.'
                }
            ],
            options: [
                'always'
            ]
        },
        {
            code: 'type X = { foo: string }',
            errors: [
                {
                    message: 'There must be no space after "foo" type annotation colon.'
                }
            ],
            options: [
                'never'
            ]
        },
        {
            code: 'type X = { foo:  string }',
            errors: [
                {
                    message: 'There must be 1 space after "foo" type annotation colon.'
                }
            ]
        },
        {
            code: 'type X = { foo?:string }',
            errors: [
                {
                    message: 'There must be a space after "foo" type annotation colon.'
                }
            ]
        },
        {
            code: 'type X = { foo?: string }',
            errors: [
                {
                    message: 'There must be no space after "foo" type annotation colon.'
                }
            ],
            options: [
                'never'
            ]
        },
        {
            code: 'type X = { foo?:?string }',
            errors: [
                {
                    message: 'There must be a space after "foo" type annotation colon.'
                }
            ]
        },
        {
            code: 'type X = { foo?:  ?string }',
            errors: [
                {
                    message: 'There must be 1 space after "foo" type annotation colon.'
                }
            ]
        },
        {
            code: 'class X { foo:string }',
            errors: [
                {
                    message: 'There must be a space after "foo" class property type annotation colon.'
                }
            ]
        },
        {
            code: 'class X { foo: string }',
            errors: [
                {
                    message: 'There must be no space after "foo" class property type annotation colon.'
                }
            ],
            options: [
                'never'
            ]
        },
        {
            code: 'class X { foo:?string }',
            errors: [
                {
                    message: 'There must be a space after "foo" class property type annotation colon.'
                }
            ]
        },
        {
            code: 'class X { foo: ?string }',
            errors: [
                {
                    message: 'There must be no space after "foo" class property type annotation colon.'
                }
            ],
            options: [
                'never'
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
            code: 'function x(foo: string) {}'
        },
        {
            code: 'class Foo { constructor(foo: string) {} }'
        },
        {
            code: '(foo: (string|number)) => {}'
        },
        {
            code: '(foo:string) => {}',
            options: [
                'never'
            ]
        },
        {
            code: 'function x(foo:string) {}',
            options: [
                'never'
            ]
        },
        {
            code: 'class Foo { constructor(foo:string) {} }',
            options: [
                'never'
            ]
        },
        {
            code: '(foo: string) => {}',
            options: [
                'always'
            ]
        },
        {
            code: '(foo:(() => void)) => {}',
            options: [
                'never'
            ]
        },
        {
            code: '(foo: (() => void)) => {}',
            options: [
                'always'
            ]
        },
        {
            code: '():Object => {}',
            options: [
                'never'
            ]
        },
        {
            code: '(): Object => {}',
            options: [
                'always'
            ]
        },
        {
            code: '():(number | string) => {}',
            options: [
                'never'
            ]
        },
        {
            code: '(): (number | string) => {}',
            options: [
                'always'
            ]
        },
        {
            code: '():number|string => {}',
            options: [
                'never'
            ]
        },
        {
            code: '(): number|string => {}',
            options: [
                'always'
            ]
        },
        {
            code: '():(() => void) => {}',
            options: [
                'never'
            ]
        }, {
            code: '(): (() => void) => {}',
            options: [
                'always'
            ]
        }, {
            code: '():( () => void ) => {}',
            options: [
                'never'
            ]
        }, {
            code: '(): ( () => void ) => {}',
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
            code: '() :{ a:number, b:string } => {}',
            options: [
                'never'
            ]
        },
        {
            code: '([ a, b ]: string[]) => {}'
        },
        {
            code: 'type X = { foo: string }'
        },
        {
            code: 'type X = { foo:string }',
            options: [
                'never'
            ]
        },
        {
            code: 'type X = { foo?: string }'
        },
        {
            code: 'type X = { foo?: ?string }'
        },
        {
            code: 'type X = { foo?:?string }',
            options: [
                'never'
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
            code: 'class Foo { bar:string }',
            options: [
                'never'
            ]
        },
        {
            code: 'class Foo { bar:?string }',
            options: [
                'never'
            ]
        }
    ]
};
