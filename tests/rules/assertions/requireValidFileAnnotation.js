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
          message: 'Malformed flow file annotation.'
        }
      ]
    },
    {
      code: '// @floweeeeeee',
      errors: [
        {
          message: 'Malformed flow file annotation.'
        }
      ]
    },
    {
      code: '// @NoFlow',
      errors: [
        {
          message: 'Malformed flow file annotation.'
        }
      ]
    },
    {
      code: '// @nofloweeeeeee',
      errors: [
        {
          message: 'Malformed flow file annotation.'
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
      code: 'this;',
      errors: [
        {
          message: 'Flow file annotation is missing.'
        }
      ],
      options: [
        'always'
      ],
      output: '/* @flow */\nthis;'
    }, {
      code: 'this;\r\n',
      errors: [
        {
          message: 'Flow file annotation is missing.'
        }
      ],
      options: [
        'always'
      ],
      output: '/* @flow */\r\nthis;\r\n'
    }, {
      code: 'this;\n',
      errors: [
        {
          message: 'Flow file annotation is missing.'
        }
      ],
      options: [
        'always'
      ],
      output: '/* @flow */\nthis;\n'
    }, {
      code: 'this;',
      errors: [
        {
          message: 'Flow file annotation is missing.'
        }
      ],
      options: [
        'always',
        {
          annotationStyle: 'line'
        }
      ],
      output: '// @flow\nthis;'
    }, {
      code: 'this;',
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
      output: '/* @flow */\nthis;'
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


