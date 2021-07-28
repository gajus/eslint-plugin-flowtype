export default {
  invalid: [
    {
      code: '// $FlowFixMe I am doing something evil here\nconst text = \'HELLO\';',
      errors: [
        {
          message: '$FlowFixMe is missing a suppression code',
        },
      ],
    },
    {
      code: '// $FlowExpectedError I am doing something evil here\nconst text = \'HELLO\';',
      errors: [
        {
          message: '$FlowExpectedError is missing a suppression code',
        },
      ],
    },
  ],
  valid: [
    {
      code: 'const text = \'HELLO\';',
    },
    {
      code: '// $FlowFixMe[incompatible-call] TODO 48\nconst text = \'HELLO\';',
    },
    {
      code: '// $FlowExpectedError[incompatible-call] TODO 48\nconst text = \'HELLO\';',
    },
  ],
};
