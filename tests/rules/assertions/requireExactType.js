export default {
  invalid: [
    // Always

    {
      code: 'type foo = {};',
      errors: [
        {
          message: 'Type identifier \'foo\' must be exact.',
        },
      ],
    },
    {
      code: 'type foo = { bar: string };',
      errors: [
        {
          message: 'Type identifier \'foo\' must be exact.',
        },
      ],
    },
    {
      code: 'type foo = {};',
      errors: [
        {
          message: 'Type identifier \'foo\' must be exact.',
        },
      ],
      options: ['always'],
    },
    {
      code: 'type foo = { bar: string };',
      errors: [
        {
          message: 'Type identifier \'foo\' must be exact.',
        },
      ],
      options: ['always'],
    },

    // Never

    {
      code: 'type foo = {| |};',
      errors: [
        {
          message: 'Type identifier \'foo\' must not be exact.',
        },
      ],
      options: ['never'],
    },
    {
      code: 'type foo = {| bar: string |};',
      errors: [
        {
          message: 'Type identifier \'foo\' must not be exact.',
        },
      ],
      options: ['never'],
    },
  ],
  valid: [

    // Always

    {
      code: 'type foo = {| |};',
    },
    {
      code: 'type foo = {| bar: string |};',
    },
    {
      code: 'type foo = { [key: string]: string };',
    },
    {
      code: 'type foo = number;',
    },
    {
      code: 'type foo = {| |};',
      options: ['always'],
    },
    {
      code: 'type foo = {| bar: string |};',
      options: ['always'],
    },
    {
      code: 'type foo = number;',
      options: ['always'],
    },

    // Never

    {
      code: 'type foo = { };',
      options: ['never'],
    },
    {
      code: 'type foo = { bar: string };',
      options: ['never'],
    },
    {
      code: 'type foo = number;',
      options: ['never'],
    },
  ],
};
