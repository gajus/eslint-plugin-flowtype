/* eslint-disable no-undefined */

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
          message: 'Malformed Flow file annotation.'
        }
      ]
    },
    {
      code: '// @NoFlow',
      errors: [
        {
          message: 'Malformed Flow file annotation.'
        }
      ]
    },
    {
      code: '// @Noflow',
      errors: [
        {
          message: 'Malformed Flow file annotation.'
        }
      ]
    },
    {
      code: '// @floweeeeeee',
      errors: [
        {
          message: 'Misspelled or malformed Flow file annotation.'
        }
      ]
    },
    {
      code: '// @nofloweeeeeee',
      errors: [
        {
          message: 'Misspelled or malformed Flow file annotation.'
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
    },
    {
      code: '/* @flow */',
      errors: [
        {
          message: 'Flow file annotation style must be `// @flow`'
        }
      ],
      options: [
        'always',
        {
          annotationStyle: 'line'
        }
      ]
    },
    {
      code: '// @flow',
      errors: [
        {
          message: 'Flow file annotation style must be `/* @flow */`'
        }
      ],
      options: [
        'always',
        {
          annotationStyle: 'block'
        }
      ]
    },
    {
      code: '/* @noflow */',
      errors: [
        {
          message: 'Flow file annotation style must be `// @noflow`'
        }
      ],
      options: [
        'always',
        {
          annotationStyle: 'line'
        }
      ]
    },
    {
      code: '// @noflow',
      errors: [
        {
          message: 'Flow file annotation style must be `/* @noflow */`'
        }
      ],
      options: [
        'always',
        {
          annotationStyle: 'block'
        }
      ]
    }
  ],
  misconfigured: [
    {
      errors: [
        {
          field: 'data["0"]',
          message: 'must be an enum value',
          type: undefined,
          value: 'sometimes'
        }
      ],
      options: ['sometimes']
    },
    {
      errors: [
        {
          field: 'data["1"].annotationStyle',
          message: 'must be an enum value',
          type: undefined,
          value: 'upside-down'
        }
      ],
      options: ['never', {annotationStyle: 'upside-down'}]
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
      code: '//@flow\na;'
    },
    {
      code: '//**@flow\na;'
    },
    {
      code: '/* foo @flow bar */\na;'
    },
    {
      code: '\n\n// @flow\na;'
    },
    {
      code: '// @flow\n// @FLow'
    },
    {
      code: '// @noflow\na;'
    },
    {
      code: 'a;',
      options: ['always'],
      settings: {
        flowtype: {
          onlyFilesWithFlowAnnotation: true
        }
      }
    },
    {
      code: '// @flow',
      options: [
        'always',
        {
          annotationStyle: 'line'
        }
      ]
    },
    {
      code: '// @function',
      options: [
        'never',
        {
          annotationStyle: 'none'
        }
      ]
    },
    {
      code: '// @fixable',
      options: ['never']
    },
    {
      code: '/* @flow */',
      options: [
        'always',
        {
          annotationStyle: 'block'
        }
      ]
    }
  ]
};
