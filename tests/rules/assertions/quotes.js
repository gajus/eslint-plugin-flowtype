export default {
  invalid: [
    {
      code: 'type T = \'hi\'',
      errors: [
        {
          message: 'String literals must use double quote.',
        },
      ],
      output: 'type T = "hi"',
    },
    {
      code: 'type T = { test: \'hello\' | \'test\' }',
      errors: [
        {
          message: 'String literals must use double quote.',
        },
        {
          message: 'String literals must use double quote.',
        },
      ],
      options: ['double'],
      output: 'type T = { test: "hello" | "test" }',
    },
    {
      code: 'type T = { test: "hello" | \'test\', t: \'hello\' }',
      errors: [
        {
          message: 'String literals must use double quote.',
        },
        {
          message: 'String literals must use double quote.',
        },
      ],
      options: ['double'],
      output: 'type T = { test: "hello" | "test", t: "hello" }',
    },
    {
      code: 'type T = "hi"',
      errors: [
        {
          message: 'String literals must use single quote.',
        },
      ],
      options: ['single'],
      output: 'type T = \'hi\'',
    },
    {
      code: 'type T = { test: "hello" | "test" }',
      errors: [
        {
          message: 'String literals must use single quote.',
        },
        {
          message: 'String literals must use single quote.',
        },
      ],
      options: ['single'],
      output: 'type T = { test: \'hello\' | \'test\' }',
    },
    {
      code: 'type T = { test: "hello" | \'test\', t: \'hello\' }',
      errors: [
        {
          message: 'String literals must use single quote.',
        },
      ],
      options: ['single'],
      output: 'type T = { test: \'hello\' | \'test\', t: \'hello\' }',
    },
  ],
  misconfigured: [
    {
      errors: [
        {
          data: 'temporarily',
          instancePath: '/0',
          keyword: 'enum',
          message: 'must be equal to one of the allowed values',
          params: {
            allowedValues: [
              'double',
              'single',
            ],
          },
          parentSchema: {
            enum: [
              'double',
              'single',
            ],
            type: 'string',
          },
          schema: [
            'double',
            'single',
          ],
          schemaPath: '#/items/0/enum',
        },
      ],
      options: ['temporarily'],
    },
  ],
  valid: [
    {
      code: 'type T = "hi"',
      options: ['double'],
    },
    {
      code: 'type T = { test: "hello" | "test" }',
      options: ['double'],
    },
    {
      code: 'type T = { test: "hello" | "test", t: "hello" }',
      options: ['double'],
    },
    {
      code: 'type FooType = \'hi\'',
      options: ['single'],
    },
    {
      code: 'type T = { test: \'hello\' | \'test\' }',
      options: ['single'],
    },
    {
      code: 'type T = { test: \'hello\' | \'test\', t: \'hello\' }',
      options: ['single'],
    },
  ],
};
