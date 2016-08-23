const UNION = {
  invalid: [
    {
      code: 'type X = string| number;',
      errors: [{message: 'There must be a space before union type annotation separator'}],
      output: 'type X = string | number;'
    },
    {
      code: 'type X = string| number;',
      errors: [{message: 'There must be a space before union type annotation separator'}],
      options: ['always'],
      output: 'type X = string | number;'
    },
    {
      code: 'type X = string |number;',
      errors: [{message: 'There must be a space after union type annotation separator'}],
      output: 'type X = string | number;'
    },
    {
      code: 'type X = string|number;',
      errors: [
                {message: 'There must be a space before union type annotation separator'},
                {message: 'There must be a space after union type annotation separator'}
      ],
      output: 'type X = string | number;'
    },
    {
      code: 'type X = {x: string}|{y: number};',
      errors: [
                {message: 'There must be a space before union type annotation separator'},
                {message: 'There must be a space after union type annotation separator'}
      ],
      output: 'type X = {x: string} | {y: number};'
    },
    {
      code: 'type X = string | number |boolean;',
      errors: [{message: 'There must be a space after union type annotation separator'}],
      output: 'type X = string | number | boolean;'
    },
    {
      code: 'type X = string|number|boolean;',
      errors: [
                {message: 'There must be a space before union type annotation separator'},
                {message: 'There must be a space after union type annotation separator'},
                {message: 'There must be a space before union type annotation separator'},
                {message: 'There must be a space after union type annotation separator'}
      ],
      output: 'type X = string | number | boolean;'
    },
    {
      code: 'type X = (string)| number;',
      errors: [{message: 'There must be a space before union type annotation separator'}],
      output: 'type X = (string) | number;'
    },
    {
      code: 'type X = ((string))|(number | foo);',
      errors: [
                {message: 'There must be a space before union type annotation separator'},
                {message: 'There must be a space after union type annotation separator'}
      ],
      output: 'type X = ((string)) | (number | foo);'
    },
    {
      code: 'type X = string |number;',
      errors: [{message: 'There must be no space before union type annotation separator'}],
      options: ['never'],
      output: 'type X = string|number;'
    },
    {
      code: 'type X = string| number;',
      errors: [{message: 'There must be no space after union type annotation separator'}],
      options: ['never'],
      output: 'type X = string|number;'
    }
  ],
  valid: [
        {code: 'type X = string | number;'},
        {code: 'type X = string | number | boolean;'},
        {code: 'type X = (string) | number;'},
        {code: 'type X = ((string)) | (number | foo);'},
    {
      code: 'type X = string|number',
      options: ['never']
    },
    {
      code: 'type X =\n| string\n| number'
    },
    {
      code: [
        'function x() {',
        '	type X =',
        '	| string',
        '	| number',
        '}'
      ].join('\n')
    }
  ]
};

const INTERSECTION = {
  invalid: [
    {
      code: 'type X = string& number;',
      errors: [{message: 'There must be a space before intersection type annotation separator'}],
      output: 'type X = string & number;'
    },
    {
      code: 'type X = string& number;',
      errors: [{message: 'There must be a space before intersection type annotation separator'}],
      options: ['always'],
      output: 'type X = string & number;'
    },
    {
      code: 'type X = string &number;',
      errors: [{message: 'There must be a space after intersection type annotation separator'}],
      output: 'type X = string & number;'
    },
    {
      code: 'type X = {x: string}&{y: number};',
      errors: [
                {message: 'There must be a space before intersection type annotation separator'},
                {message: 'There must be a space after intersection type annotation separator'}
      ],
      output: 'type X = {x: string} & {y: number};'
    },
    {
      code: 'type X = string&number;',
      errors: [
                {message: 'There must be a space before intersection type annotation separator'},
                {message: 'There must be a space after intersection type annotation separator'}
      ],
      output: 'type X = string & number;'
    },
    {
      code: 'type X = string & number &boolean;',
      errors: [{message: 'There must be a space after intersection type annotation separator'}],
      output: 'type X = string & number & boolean;'
    },
    {
      code: 'type X = string&number&boolean;',
      errors: [
                {message: 'There must be a space before intersection type annotation separator'},
                {message: 'There must be a space after intersection type annotation separator'},
                {message: 'There must be a space before intersection type annotation separator'},
                {message: 'There must be a space after intersection type annotation separator'}
      ],
      output: 'type X = string & number & boolean;'
    },
    {
      code: 'type X = (string)& number;',
      errors: [{message: 'There must be a space before intersection type annotation separator'}],
      output: 'type X = (string) & number;'
    },
    {
      code: 'type X = ((string))&(number & foo);',
      errors: [
                {message: 'There must be a space before intersection type annotation separator'},
                {message: 'There must be a space after intersection type annotation separator'}
      ],
      output: 'type X = ((string)) & (number & foo);'
    },
    {
      code: 'type X = string &number;',
      errors: [{message: 'There must be no space before intersection type annotation separator'}],
      options: ['never'],
      output: 'type X = string&number;'
    },
    {
      code: 'type X = string& number;',
      errors: [{message: 'There must be no space after intersection type annotation separator'}],
      options: ['never'],
      output: 'type X = string&number;'
    }
  ],
  valid: [
        {code: 'type X = string & number;'},
        {code: 'type X = string & number & boolean;'},
        {code: 'type X = (string) & number;'},
        {code: 'type X = ((string)) & (number & foo);'},
    {
      code: 'type X = string&number',
      options: ['never']
    },
    {
      code: 'type X =\n& string\n& number'
    },
    {
      code: [
        'function x() {',
        '	type X =',
        '	& string',
        '	& number',
        '}'
      ].join('\n')
    }
  ]
};

export default {
  invalid: [...UNION.invalid, ...INTERSECTION.invalid],
  valid: [...UNION.valid, ...INTERSECTION.valid]
};
