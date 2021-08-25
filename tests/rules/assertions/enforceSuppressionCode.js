export default {
  invalid: [
    {
      code: '// $FlowFixMe I am doing something evil here\nconst text = \'HELLO\';',
      errors: [
        {
          message: '$FlowFixMe is missing a suppression error code. Please update this suppression to use an error code: $FlowFixMe[…]',
        },
      ],
    },
    {
      code: '// $FlowExpectedError I am doing something evil here\nconst text = \'HELLO\';',
      errors: [
        {
          message: '$FlowExpectedError is missing a suppression error code. Please update this suppression to use an error code: $FlowExpectedError[…]',
        },
      ],
    },
    {
      code: '// $FlowIssue I am doing something evil here\nconst text = \'HELLO\';',
      errors: [
        {
          message: '$FlowIssue is missing a suppression error code. Please update this suppression to use an error code: $FlowIssue[…]',
        },
      ],
    },
    {
      code: '// $FlowIgnore I am doing something evil here\nconst text = \'HELLO\';',
      errors: [
        {
          message: '$FlowIgnore is missing a suppression error code. Please update this suppression to use an error code: $FlowIgnore[…]',
        },
      ],
    },
    {
      code: '/* $FlowIgnore I am doing something evil here */',
      errors: [
        {
          message: '$FlowIgnore is missing a suppression error code. Please update this suppression to use an error code: $FlowIgnore[…]',
        },
      ],
    },
    {
      code: '{ /* $FlowIgnore I am doing something evil here */ }',
      errors: [
        {
          message: '$FlowIgnore is missing a suppression error code. Please update this suppression to use an error code: $FlowIgnore[…]',
        },
      ],
    },
    {
      code: `/**
  * $FlowIgnore I am doing something evil here
  */`,
      errors: [
        {
          message: '$FlowIgnore is missing a suppression error code. Please update this suppression to use an error code: $FlowIgnore[…]',
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
    {
      code: '// $FlowIssue[incompatible-call] TODO 48\nconst text = \'HELLO\';',
    },
    {
      code: '// $FlowIgnore[incompatible-call] TODO 48\nconst text = \'HELLO\';',
    },
    {
      code: '/* $FlowIgnore[incompatible-call] TODO 48 */',
    },
    {
      code: `/**
 * $FlowIgnore[incompatible-call] TODO 48
 */`,
    },
    {
      code: '/* $FlowIgnore[incompatible-call] TODO 48 */',
    },
  ],
};
