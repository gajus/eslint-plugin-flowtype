export default {
    invalid: [
        {
            code: '(foo) => {}',
            errors: [
                {
                    message: 'Missing "foo" parameter type annotation.'
                }
            ]
        },
        {
            code: 'function x(foo) {}',
            errors: [
                {
                    message: 'Missing "foo" parameter type annotation.'
                }
            ]
        },
        {
            code: 'function x(foo) {}',
            errors: [
                {
                    message: 'Missing "foo" parameter type annotation.'
                }
            ],
            options: [
                {
                    excludeArrowFunctions: true
                }
            ]
        },
        {
            code: '(foo = \'FOO\') => {}',
            errors: [
                {
                    message: 'Missing "foo" parameter type annotation.'
                }
            ]
        },
        {
            code: '(...foo) => {}',
            errors: [
                {
                    message: 'Missing "foo" parameter type annotation.'
                }
            ]
        },
        {
            code: '({foo}) => {}',
            errors: [
                {
                    message: 'Missing "{foo}" parameter type annotation.'
                }
            ]
        },
        {
            code: '([foo]) => {}',
            errors: [
                {
                    message: 'Missing "[foo]" parameter type annotation.'
                }
            ]
        },
        {
            code: '({foo = 1} = {}) => {}',
            errors: [
                {
                    message: 'Missing "{foo = 1}" parameter type annotation.'
                }
            ]
        },
        {
            code: '// @flow\n(foo) => {}',
            errors: [
                {
                    message: 'Missing "foo" parameter type annotation.'
                }
            ],
            settings: {
                flowtype: {
                    onlyFilesWithFlowAnnotation: true
                }
            }
        },
        {
            code: '(foo) => {}',
            deprecated: true,
            errors: [
                {
                    message: 'Missing "foo" parameter type annotation.'
                }
            ],
            options: [
                {
                    excludeArrowFunctions: 'expressionsOnly'
                }
            ]
        },
        {
            code: 'function x(foo) {}',
            deprecated: true,
            errors: [
                {
                    message: 'Missing "foo" parameter type annotation.'
                }
            ],
            options: [
                {
                    excludeArrowFunctions: 'expressionsOnly'
                }
            ]
        },
        {
            code: '(foo) => {}',
            errors: [
                {
                    message: 'Missing "foo" parameter type annotation.'
                }
            ],
            options: [
                {
                    excludeArrowFunctions: 'conciseOnly'
                }
            ]
        },
        {
            code: 'function x(foo) {}',
            errors: [
                {
                    message: 'Missing "foo" parameter type annotation.'
                }
            ],
            options: [
                {
                    excludeArrowFunctions: 'conciseOnly'
                }
            ]
        }
    ],
    valid: [
        {
            code: '(foo: string) => {}'
        },
        {
            code: '(foo: string = \'FOO\') => {}'
        },
        {
            code: '(...foo: string) => {}'
        },
        {
            code: '({foo}: {foo: string}) => {}'
        },
        {
            code: '([foo]: Array) => {}'
        },
        {
            code: '(foo) => {}',
            settings: {
                flowtype: {
                    onlyFilesWithFlowAnnotation: true
                }
            }
        },
        {
            code: '(foo) => {}',
            options: [
                {
                    excludeArrowFunctions: true
                }
            ]
        },
        {
            code: '(foo) => 3',
            deprecated: true,
            options: [
                {
                    excludeArrowFunctions: 'expressionsOnly'
                }
            ]
        },
        {
            code: '(foo) => 3',
            options: [
                {
                    excludeArrowFunctions: 'conciseOnly'
                }
            ]
        }
    ]
};
