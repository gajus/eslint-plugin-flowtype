export default {
    invalid: [
        {
            code: 'type foo = {};',
            errors: [
                {
                    message: 'Type identifier \'foo\' does not match pattern \'/^Type([A-Z][a-z0-9]+)+$/\'.'
                }
            ]
        },
        {
            code: 'type TypeFoo = {};',
            errors: [
                {
                    message: 'Type identifier \'TypeFoo\' does not match pattern \'/^foo$/\'.'
                }
            ],
            options: [
                '^foo$'
            ]
        }
    ],
    valid: [
        {
            code: 'type TypeFoo = {};'
        },
        {
            code: 'type foo = {};',
            options: [
                '^foo$'
            ]
        }
    ]
};
