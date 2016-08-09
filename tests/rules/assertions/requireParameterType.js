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
            code: '(_, foo) => {}',
            errors: [
                {
                    message: 'Missing "foo" parameter type annotation.'
                }
            ],
            options: [
                'always',
                {
                    ignoreParameterNames: ['_']
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
        }
    ],
    valid: [
        {
            code: '(foo: string) => {}'
        },
        {
            code: '(_) => {}',
            options: [
                'always',
                {
                    ignoreParameterNames: ['_']
                }
            ]
        },
        {
            code: '(_, foo: string) => {}',
            options: [
                'always',
                {
                    ignoreParameterNames: ['_']
                }
            ]
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
        }
    ]
};
