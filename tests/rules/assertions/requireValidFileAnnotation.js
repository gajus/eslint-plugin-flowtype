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
      ],
      output: '// @flow\na;'
    },
    {
      code: 'a;',
      errors: [
        {
          message: 'Flow file annotation is missing.'
        }
      ],
      options: [
        'always',
        {
          annotationStyle: 'block'
        }
      ],
      output: '/* @flow */\na;'
    }
  ],
  misconfigured: [
    {
      errors: [
        {
          data: 'sometimes',
          dataPath: '[0]',
          keyword: 'enum',
          message: 'should be equal to one of the allowed values',
          params: {
            allowedValues: [
              'always',
              'never'
            ]
          },
          parentSchema: {
            enum: [
              'always',
              'never'
            ],
            type: 'string'
          },
          schema: [
            'always',
            'never'
          ],
          schemaPath: '#/items/0/enum'
        }
      ],
      options: ['sometimes']
    },
    {
      errors: [
        {
          data: 'upside-down',
          dataPath: '[1].annotationStyle',
          keyword: 'enum',
          message: 'should be equal to one of the allowed values',
          params: {
            allowedValues: [
              'none',
              'line',
              'block'
            ]
          },
          parentSchema: {
            enum: [
              'none',
              'line',
              'block'
            ],
            type: 'string'
          },
          schema: [
            'none',
            'line',
            'block'
          ],
          schemaPath: '#/items/1/properties/annotationStyle/enum'
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
