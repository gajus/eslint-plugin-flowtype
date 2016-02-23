export default {
    invalid: [
        {
            code: '(foo) => { return "foo"; }',
            errors: [
                {
                    message: 'Missing return type annotation.'
                }
            ]
        },
        {
            code: '(foo) => { return "foo"; }',
            errors: [
                {
                    message: 'Missing return type annotation.'
                }
            ],
            options: [
                'always'
            ]
        },
        {
            code: '(foo): undefined => { return; }',
            errors: [
                {
                    message: 'Must not annotate undefined return type.'
                }
            ]
        },
        {
            code: '(foo): undefined => { return undefined; }',
            errors: [
                {
                    message: 'Must not annotate undefined return type.'
                }
            ]
        },
        {
            code: '(foo): undefined => { return; }',
            errors: [
                {
                    message: 'Must not annotate undefined return type.'
                }
            ],
            options: [
                'always',
                {
                    annotateUndefined: 'never'
                }
            ]
        },
        {
            code: '(foo) => { return; }',
            errors: [
                {
                    message: 'Must annotate undefined return type.'
                }
            ],
            options: [
                'always',
                {
                    annotateUndefined: 'always'
                }
            ]
        },
        {
            code: '(foo): undefined => { return undefined; }',
            errors: [
                {
                    message: 'Must not annotate undefined return type.'
                }
            ],
            options: [
                'always',
                {
                    annotateUndefined: 'never'
                }
            ]
        },
        {
            code: '(foo) => { return undefined; }',
            errors: [
                {
                    message: 'Must annotate undefined return type.'
                }
            ],
            options: [
                'always',
                {
                    annotateUndefined: 'always'
                }
            ]
        }
    ],
    valid: [
        {
            code: '(foo): string => {}'
        },
        {
            code: '(foo): string => {}',
            options: [
                'always'
            ]
        },
        {
            code: '(foo) => { return; }'
        },
        {
            code: '(foo) => { return undefined; }'
        },
        {
            code: '(foo): undefined => { return; }',
            options: [
                'always',
                {
                    annotateUndefined: 'always'
                }
            ]
        },
        {
            code: '(foo) => { return; }',
            options: [
                'always',
                {
                    annotateUndefined: 'never'
                }
            ]
        },
        {
            code: '(foo) => { return undefined; }',
            options: [
                'always',
                {
                    annotateUndefined: 'never'
                }
            ]
        },
        {
            code: '(foo): undefined => { return undefined; }',
            options: [
                'always',
                {
                    annotateUndefined: 'always'
                }
            ]
        }
    ]
};
