export default {
    invalid: [
        {
            code: 'type foo = {};',
            errors: [
                {
                    message: 'Type identifier \'foo\' does not match pattern \'/^([A-Z][a-z0-9]+)+Type$/\'.'
                }
            ]
        },
        {
            code: 'type FooType = {};',
            errors: [
                {
                    message: 'Type identifier \'FooType\' does not match pattern \'/^foo$/\'.'
                }
            ],
            options: [
                '^foo$'
            ]
        }
    ],
    valid: [
        {
            code: 'type FooType = {};'
        },
        {
            code: 'type foo = {};',
            options: [
                '^foo$'
            ]
        }
    ]
};
