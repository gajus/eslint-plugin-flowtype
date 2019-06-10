export default {
  invalid: [
    // Always

    {
      code: 'type foo = {};',
      errors: [
        {
          message: 'Type must be explicit inexact.'
        }
      ]
    },
    {
      code: 'type foo = { bar: string };',
      errors: [
        {
          message: 'Type must be explicit inexact.'
        }
      ]
    },
    {
      code: 'type foo = {};',
      errors: [
        {
          message: 'Type must be explicit inexact.'
        }
      ],
      options: ['always']
    },
    {
      code: 'type foo = { bar: string };',
      errors: [
        {
          message: 'Type must be explicit inexact.'
        }
      ],
      options: ['always']
    },

    // Never

    {
      code: 'type foo = {...};',
      errors: [
        {
          message: 'Type must not be explicit inexact.'
        }
      ],
      options: ['never']
    },
    {
      code: 'type foo = { bar: string, ... };',
      errors: [
        {
          message: 'Type must not be explicit inexact.'
        }
      ],
      options: ['never']
    }
  ],
  valid: [

    // Always

    {
      code: 'type foo = { foo: string, ... };'
    },
    {
      code: 'type foo = {| |};'
    },
    {
      code: 'type foo = {| bar: string |};'
    },
    {
      code: 'type foo = { [key: string]: string, ... };'
    },
    {
      code: 'type foo = number;'
    },
    {
      code: 'type foo = {| |};',
      options: ['always']
    },
    {
      code: 'type foo = {...};',
      options: ['always']
    },
    {
      code: 'type foo = { bar: string, ... };',
      options: ['always']
    },
    {
      code: 'type foo = {| bar: string |};',
      options: ['always']
    },
    {
      code: 'type foo = number;',
      options: ['always']
    },

    // Never

    {
      code: 'type foo = { };',
      options: ['never']
    },
    {
      code: 'type foo = {| |};',
      options: ['never']
    },
    {
      code: 'type foo = { bar: string };',
      options: ['never']
    },
    {
      code: 'type foo = {| bar: string |};',
      options: ['never']
    },
    {
      code: 'type foo = number;',
      options: ['never']
    }
  ]
};
