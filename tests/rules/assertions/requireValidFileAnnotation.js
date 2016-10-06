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


