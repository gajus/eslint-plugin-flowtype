export default {
  invalid: [
    {
      code: 'const [state, setState] = useState<?string >(null);',
      errors: [
        {
          message: 'There must be no space at start of type annotations',
        },
      ],
      output: 'const [state, setState] = useState<?string>(null);',
    },
    {
      code: 'const [state, setState] = useState< ?string>(null);',
      errors: [
        {
          message: 'There must be no space at start of type annotations',
        },
      ],
      output: 'const [state, setState] = useState<?string>(null);',
    },
    {
      code: 'const [state, setState] = useState<? string>(null);',
      errors: [
        {
          message: 'There must be no space at start of type annotations',
        },
      ],
      output: 'const [state, setState] = useState<?string>(null);',
    },
    {
      code: 'const [state, setState] = useState< ? string>(null);',
      errors: [
        {
          message: 'There must be no space at start of type annotations',
        },
      ],
      output: 'const [state, setState] = useState<?string>(null);',
    },
    {
      code: 'const [state, setState] = useState< ? string >(null);',
      errors: [
        {
          message: 'There must be no space at start of type annotations',
        },
      ],
      output: 'const [state, setState] = useState<?string>(null);',
    },
    {
      code: 'const [state, setState] = useState<string >(null);',
      errors: [
        {
          message: 'There must be no space at start of type annotations',
        },
      ],
      output: 'const [state, setState] = useState<string>(null);',
    },
    {
      code: 'const [state, setState] = useState< string>(null);',
      errors: [
        {
          message: 'There must be no space at start of type annotations',
        },
      ],
      output: 'const [state, setState] = useState<string>(null);',
    },
    {
      code: 'const [state, setState] = useState< string >(null);',
      errors: [
        {
          message: 'There must be no space at start of type annotations',
        },
      ],
      output: 'const [state, setState] = useState<string>(null);',
    },
  ],
  misconfigured: [
    {
      errors: [
        {
          data: 'frequently',
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
      options: [
        'frequently',
      ],
    },
  ],
  valid: [
    {
      code: 'const [state, setState] = useState(null);',
    },
    {
      code: 'const [state, setState] = useState<string>("");',
    },
    {
      code: 'const [state, setState] = useState<?string>(null);',
    },
    {
      code: 'const [state, setState] = useState<string | null>(null);',
    },
    {
      code: 'const [state, setState] = useState<string | number>(2);',
    },
  ],
};
