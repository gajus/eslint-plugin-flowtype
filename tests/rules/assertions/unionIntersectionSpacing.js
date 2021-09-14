const UNION = {
  invalid: [
    {
      code: 'type X = string| number;',
      errors: [{message: 'There must be a space before union type annotation separator'}],
      output: 'type X = string | number;',
    },
    {
      code: 'type X = string| number;',
      errors: [{message: 'There must be a space before union type annotation separator'}],
      options: ['always'],
      output: 'type X = string | number;',
    },
    {
      code: 'type X = string |number;',
      errors: [{message: 'There must be a space after union type annotation separator'}],
      output: 'type X = string | number;',
    },
    {
      code: 'type X = string|number;',
      errors: [
        {message: 'There must be a space before union type annotation separator'},
        {message: 'There must be a space after union type annotation separator'},
      ],
      output: 'type X = string | number;',
    },
    {
      code: 'type X = {x: string}|{y: number};',
      errors: [
        {message: 'There must be a space before union type annotation separator'},
        {message: 'There must be a space after union type annotation separator'},
      ],
      output: 'type X = {x: string} | {y: number};',
    },
    {
      code: 'type X = string | number |boolean;',
      errors: [{message: 'There must be a space after union type annotation separator'}],
      output: 'type X = string | number | boolean;',
    },
    {
      code: 'type X = string|number|boolean;',
      errors: [
        {message: 'There must be a space before union type annotation separator'},
        {message: 'There must be a space after union type annotation separator'},
        {message: 'There must be a space before union type annotation separator'},
        {message: 'There must be a space after union type annotation separator'},
      ],
      output: 'type X = string | number | boolean;',
    },
    {
      code: 'type X = (string)| number;',
      errors: [{message: 'There must be a space before union type annotation separator'}],
      output: 'type X = (string) | number;',
    },
    {
      code: 'type X = ((string))|(number | foo);',
      errors: [
        {message: 'There must be a space before union type annotation separator'},
        {message: 'There must be a space after union type annotation separator'},
      ],
      output: 'type X = ((string)) | (number | foo);',
    },
    {
      code: 'type X = string |number;',
      errors: [{message: 'There must be no space before union type annotation separator'}],
      options: ['never'],
      output: 'type X = string|number;',
    },
    {
      code: 'type X = string| number;',
      errors: [{message: 'There must be no space after union type annotation separator'}],
      options: ['never'],
      output: 'type X = string|number;',
    },
  ],
  valid: [
    {code: 'type X = string | number;'},
    {code: 'type X = string | number | boolean;'},
    {code: 'type X = (string) | number;'},
    {code: 'type X = ((string)) | (number | foo);'},
    {
      code: 'type X = string|number',
      options: ['never'],
    },
    {
      code: 'type X =\n| string\n| number',
    },
    {
      code: [
        'function x() {',
        'type X =',
        '| string',
        '| number',
        '}',
      ].join('\n'),
    },
    {
      code: 'type X = string| number;',
      settings: {
        flowtype: {
          onlyFilesWithFlowAnnotation: true,
        },
      },
    },
  ],
};

const INTERSECTION = {
  invalid: [
    {
      code: 'type X = string& number;',
      errors: [{message: 'There must be a space before intersection type annotation separator'}],
      output: 'type X = string & number;',
    },
    {
      code: 'type X = string& number;',
      errors: [{message: 'There must be a space before intersection type annotation separator'}],
      options: ['always'],
      output: 'type X = string & number;',
    },
    {
      code: 'type X = string &number;',
      errors: [{message: 'There must be a space after intersection type annotation separator'}],
      output: 'type X = string & number;',
    },
    {
      code: 'type X = {x: string}&{y: number};',
      errors: [
        {message: 'There must be a space before intersection type annotation separator'},
        {message: 'There must be a space after intersection type annotation separator'},
      ],
      output: 'type X = {x: string} & {y: number};',
    },
    {
      code: 'type X = string&number;',
      errors: [
        {message: 'There must be a space before intersection type annotation separator'},
        {message: 'There must be a space after intersection type annotation separator'},
      ],
      output: 'type X = string & number;',
    },
    {
      code: 'type X = string & number &boolean;',
      errors: [{message: 'There must be a space after intersection type annotation separator'}],
      output: 'type X = string & number & boolean;',
    },
    {
      code: 'type X = string&number&boolean;',
      errors: [
        {message: 'There must be a space before intersection type annotation separator'},
        {message: 'There must be a space after intersection type annotation separator'},
        {message: 'There must be a space before intersection type annotation separator'},
        {message: 'There must be a space after intersection type annotation separator'},
      ],
      output: 'type X = string & number & boolean;',
    },
    {
      code: 'type X = (string)& number;',
      errors: [{message: 'There must be a space before intersection type annotation separator'}],
      output: 'type X = (string) & number;',
    },
    {
      code: 'type X = ((string))&(number & foo);',
      errors: [
        {message: 'There must be a space before intersection type annotation separator'},
        {message: 'There must be a space after intersection type annotation separator'},
      ],
      output: 'type X = ((string)) & (number & foo);',
    },
    {
      code: 'type X = string &number;',
      errors: [{message: 'There must be no space before intersection type annotation separator'}],
      options: ['never'],
      output: 'type X = string&number;',
    },
    {
      code: 'type X = string& number;',
      errors: [{message: 'There must be no space after intersection type annotation separator'}],
      options: ['never'],
      output: 'type X = string&number;',
    },
  ],
  valid: [
    {code: 'type X = string & number;'},
    {code: 'type X = string & number & boolean;'},
    {code: 'type X = (string) & number;'},
    {code: 'type X = ((string)) & (number & foo);'},
    {
      code: 'type X = string&number',
      options: ['never'],
    },
    {
      code: 'type X =\n& string\n& number',
    },
    {
      code: [
        'function x() {',
        'type X =',
        '& string',
        '& number',
        '}',
      ].join('\n'),
    },
    {
      code: 'type X = string& number;',
      settings: {
        flowtype: {
          onlyFilesWithFlowAnnotation: true,
        },
      },
    },
  ],
};

const MISCONFIGURED = [
  {
    errors: [
      {
        data: 'however',
        instancePath: '/0',
        keyword: 'enum',
        message: 'must be equal to one of the allowed values',
        params: {
          allowedValues: [
            'always',
            'never',
          ],
        },
        parentSchema: {
          enum: [
            'always',
            'never',
          ],
          type: 'string',
        },
        schema: [
          'always',
          'never',
        ],
        schemaPath: '#/items/0/enum',
      },
    ],
    options: ['however'],
  },
];

export default {
  invalid: [...UNION.invalid, ...INTERSECTION.invalid],
  misconfigured: MISCONFIGURED,
  valid: [...UNION.valid, ...INTERSECTION.valid],
};
