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
            code: '(foo:  string) => {}',
            errors: [
                {
                    message: 'There must be 1 space after "foo" parameter type annotation colon.'
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
            code: '(foo:string) => {}',
            options: [
                'never'
            ]
        },
        {
            code: '(foo: string) => {}',
            options: [
                'always'
            ]
        }
    ]
};
