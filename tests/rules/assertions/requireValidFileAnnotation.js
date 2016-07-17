export default {
    invalid: [
        {
            code: ';// @flow',
            errors: [
                {
                    message: 'Flow file annotation not at the top of the file.'
                }
            ]
        },
        {
            code: ';\n// @flow',
            errors: [
                {
                    message: 'Flow file annotation not at the top of the file.'
                }
            ]
        },
        {
            code: '// @Flow',
            errors: [
                {
                    message: 'Malformed flow file annotation.'
                }
            ]
        },
        {
            code: '// @floweeeeeee',
            errors: [
                {
                    message: 'Malformed flow file annotation.'
                }
            ]
        },
        {
            code: 'a;',
            errors: [
                {
                    message: 'Flow file annotation is missing.'
                }
            ],
            options: [
                'always'
            ]
        }
    ],
    valid: [
        {
            code: 'a;'
        },
        {
            code: '// @flow\na;'
        },
        {
            code: '// @no-flow\na;'
        },
        {
            code: '//@flow\na;'
        },
        {
            code: '//@no-flow\na;'
        },
        {
            code: '//**@flow\na;'
        },
        {
            code: '//**@no-flow\na;'
        },
        {
            code: '/* foo @flow bar */\na;'
        },
        {
            code: '\n\n// @flow\na;'
        },
        {
            code: '\n\n// @no-flow\na;'
        },
        {
            code: '// @flow\n// @FLow'
        },
        {
            code: 'a;',
            options: ['always'],
            settings: {
                flowtype: {
                    onlyFilesWithFlowAnnotation: true
                }
            }
        }
    ]
};
