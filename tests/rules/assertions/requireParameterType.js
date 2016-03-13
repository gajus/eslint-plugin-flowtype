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
        }
    ]
};
