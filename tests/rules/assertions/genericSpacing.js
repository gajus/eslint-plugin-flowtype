export default {
    invalid: [
        // Never

        {
            code: 'type X = Promise< string>',
            errors: [{message: 'There must be no space at start of "Promise" generic type annotation'}],
            output: 'type X = Promise<string>'
        },
        {
            code: 'type X = Promise<  string>',
            errors: [{message: 'There must be no space at start of "Promise" generic type annotation'}],
            options: ['never'],
            output: 'type X = Promise<string>'
        },
        {
            code: 'type X = FooBar<string >',
            errors: [{message: 'There must be no space at end of "FooBar" generic type annotation'}],
            output: 'type X = FooBar<string>'
        },
        {
            code: 'type X = Promise< string >',
            errors: [
                {message: 'There must be no space at start of "Promise" generic type annotation'},
                {message: 'There must be no space at end of "Promise" generic type annotation'}
            ],
            output: 'type X = Promise<string>'
        },
        {
            code: 'type X = Promise< (foo), bar, (((baz))) >',
            errors: [
                {message: 'There must be no space at start of "Promise" generic type annotation'},
                {message: 'There must be no space at end of "Promise" generic type annotation'}
            ],
            output: 'type X = Promise<(foo), bar, (((baz)))>'
        },

        // Always (given no space)

        {
            code: 'type X = Promise<string >',
            errors: [{message: 'There must be a space at start of "Promise" generic type annotation'}],
            options: ['always'],
            output: 'type X = Promise< string >'
        },
        {
            code: 'type X = FooBar< string>',
            errors: [{message: 'There must be a space at end of "FooBar" generic type annotation'}],
            options: ['always'],
            output: 'type X = FooBar< string >'
        },
        {
            code: 'type X = Promise<string>',
            errors: [
                {message: 'There must be a space at start of "Promise" generic type annotation'},
                {message: 'There must be a space at end of "Promise" generic type annotation'}
            ],
            options: ['always'],
            output: 'type X = Promise< string >'
        },
        {
            code: 'type X = Promise<(foo), bar, (((baz)))>',
            errors: [
                {message: 'There must be a space at start of "Promise" generic type annotation'},
                {message: 'There must be a space at end of "Promise" generic type annotation'}
            ],
            options: ['always'],
            output: 'type X = Promise< (foo), bar, (((baz))) >'
        },

        // Always (given too many spaces)

        {
            code: 'type X = FooBar<  string >',
            errors: [{message: 'There must be one space at start of "FooBar" generic type annotation'}],
            options: ['always'],
            output: 'type X = FooBar< string >'
        },
        {
            code: 'type X = FooBar< string  >',
            errors: [{message: 'There must be one space at end of "FooBar" generic type annotation'}],
            options: ['always'],
            output: 'type X = FooBar< string >'
        },
        {
            code: 'type X = Promise<  (foo), bar, (((baz)))  >',
            errors: [
                {message: 'There must be one space at start of "Promise" generic type annotation'},
                {message: 'There must be one space at end of "Promise" generic type annotation'}
            ],
            options: ['always'],
            output: 'type X = Promise< (foo), bar, (((baz))) >'
        }
    ],
    valid: [
        // Never

        {code: 'type X = Promise<string>'},
        {code: 'type X = Promise<(string)>'},
        {code: 'type X = Promise<(foo), bar, (((baz)))>'},

        // Always

        {
            code: 'type X = Promise< string >',
            options: ['always']
        },
        {
            code: 'type X = Promise< (string) >',
            options: ['always']
        },
        {
            code: 'type X = Promise< (foo), bar, (((baz))) >',
            options: ['always']
        }
    ]
};
