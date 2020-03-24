export default {
  invalid: [
    // Always

    {
      code: 'type foo = {};',
      errors: [
        {
          message: 'Object type must be exact.',
        },
      ],
      output: 'type foo = {||};',
    },
    {
      code: 'type foo = { bar: string };',
      errors: [
        {
          message: 'Object type must be exact.',
        },
      ],
      output: 'type foo = {| bar: string |};',
    },
    {
      code: 'type foo = Array<{bar: string}>;',
      errors: [
        {
          message: 'Object type must be exact.',
        },
      ],
      options: ['always'],
      output: 'type foo = Array<{|bar: string|}>;',
    },
    {
      code: '(foo: Array<{bar: string}>) => {};',
      errors: [
        {
          message: 'Object type must be exact.',
        },
      ],
      options: ['always'],
      output: '(foo: Array<{|bar: string|}>) => {};',
    },

    // Never

    {
      code: 'type foo = {| |};',
      errors: [
        {
          message: 'Object type must not be exact.',
        },
      ],
      options: ['never'],
      output: 'type foo = { };',
    },
    {
      code: 'type foo = {| bar: string |};',
      errors: [
        {
          message: 'Object type must not be exact.',
        },
      ],
      options: ['never'],
      output: 'type foo = { bar: string };',
    },
    {
      code: 'type foo = { bar: {| baz: string |} };',
      errors: [
        {
          message: 'Object type must not be exact.',
        },
      ],
      options: ['never'],
      output: 'type foo = { bar: { baz: string } };',
    },
    {
      code: 'type foo = Array<{| bar: string |}>;',
      errors: [
        {
          message: 'Object type must not be exact.',
        },
      ],
      options: ['never'],
      output: 'type foo = Array<{ bar: string }>;',
    },
    {
      code: '(foo: Array<{| bar: string |}>) => {};',
      errors: [
        {
          message: 'Object type must not be exact.',
        },
      ],
      options: ['never'],
      output: '(foo: Array<{ bar: string }>) => {};',
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
      code: 'type foo = {| bar: {| baz: string |} |};',
      options: ['always'],
    },
    {
      code: 'type foo = Array<{| bar: string |}>;',
      options: ['always'],
    },
    {
      code: 'type foo = number;',
      options: ['always'],
    },

    {
      code: `interface StackFrame {
          colno?: number;
          lineno?: number;
          filename?: string;
          function?: {| name: string |};
      }`,
      options: ['always'],
      output: `interface StackFrame {
          colno?: number;
          lineno?: number;
          filename?: string;
          function?: {| name: string |};
      }`,
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
      code: 'type foo = { bar: { baz: string } };',
      options: ['never'],
    },
    {
      code: 'type foo = Array<{bar: string}>;',
      options: ['never'],
    },
    {
      code: 'type foo = number;',
      options: ['never'],
    },

    {
      code: `interface StackFrame {
          colno?: number;
          lineno?: number;
          filename?: string;
          function?: {| name: string |};
      }`,
      options: ['always'],
      output: `interface StackFrame {
          colno?: number;
          lineno?: number;
          filename?: string;
          function?: {| name: string |};
      }`,
    },
  ],
};
