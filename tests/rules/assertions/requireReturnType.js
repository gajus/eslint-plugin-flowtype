export default {
    invalid: [
        {
            code: '(foo) => {}',
            errors: [
                {
                    message: 'Missing return type annotation.'
                }
            ]
        }
    ],
    valid: [
        {
            code: '(foo): string => {}'
        }
    ]
};
