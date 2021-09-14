export default {
  invalid: [
    // Never
    {
      code: 'type obj = { "foo": "bar" }',
      errors: [
        {message: 'There must be no space after "{".'},
        {message: 'There must be no space before "}".'},
      ],
      output: 'type obj = {"foo": "bar"}',
    },
    {
      code: 'type obj = {"foo": "bar" }',
      errors: [
        {message: 'There must be no space before "}".'},
      ],
      output: 'type obj = {"foo": "bar"}',
    },
    {
      code: 'type obj = {"foo": "bar", ... }',
      errors: [
        {message: 'There must be no space before "}".'},
      ],
      output: 'type obj = {"foo": "bar", ...}',
    },
    {
      code: 'type obj = {|"foo": "bar" |}',
      errors: [
        {message: 'There must be no space before "|}".'},
      ],
      output: 'type obj = {|"foo": "bar"|}',
    },
    {
      code: 'type obj = {"foo": "bar", [key: string]: string }',
      errors: [
        {message: 'There must be no space before "}".'},
      ],
      output: 'type obj = {"foo": "bar", [key: string]: string}',
    },
    {
      code: 'type obj = {\n"foo": "bar", [key: string]: string }',
      errors: [
        {message: 'There must be no space before "}".'},
      ],
      output: 'type obj = {\n"foo": "bar", [key: string]: string}',
    },
    {
      code: 'type obj = { baz: {"foo": "qux"}, bar: 4}',
      errors: [
        {message: 'There must be no space after "{".'},
      ],
      output: 'type obj = {baz: {"foo": "qux"}, bar: 4}',
    },

    // Always
    {
      code: 'type obj = {"foo": "bar"}',
      errors: [
        {message: 'A space is required after "{".'},
        {message: 'A space is required before "}".'},
      ],
      options: ['always'],
      output: 'type obj = { "foo": "bar" }',
    },
    {
      code: 'type obj = {"foo": "bar" }',
      errors: [
        {message: 'A space is required after "{".'},
      ],
      options: ['always'],
      output: 'type obj = { "foo": "bar" }',
    },
    {
      code: 'type obj = { baz: {"foo": "qux"}, bar: 4}',
      errors: [
        {message: 'A space is required before "}".'},
        {message: 'A space is required after "{".'},
        {message: 'A space is required before "}".'},
      ],
      options: ['always'],
      output: 'type obj = { baz: { "foo": "qux" }, bar: 4 }',
    },
    {
      code: 'type obj = { baz: { "foo": "qux" }, bar: 4}',
      errors: [
        {message: 'A space is required before "}".'},
      ],
      options: ['always'],
      output: 'type obj = { baz: { "foo": "qux" }, bar: 4 }',
    },
    {
      code: 'type obj = { "foo": "bar", ...}',
      errors: [
        {message: 'A space is required before "}".'},
      ],
      options: ['always'],
      output: 'type obj = { "foo": "bar", ... }',
    },
    {
      code: 'type obj = {|"foo": "bar" |}',
      errors: [
        {message: 'A space is required after "{|".'},
      ],
      options: ['always'],
      output: 'type obj = {| "foo": "bar" |}',
    },
    {
      code: 'type obj = {"foo": "bar", [key: string]: string }',
      errors: [
        {message: 'A space is required after "{".'},
      ],
      options: ['always'],
      output: 'type obj = { "foo": "bar", [key: string]: string }',
    },
  ],
  misconfigured: [
    {
      errors: [
        {
          data: 'sometimes',
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
      options: ['sometimes'],
    },
  ],
  valid: [
    // Never
    {code: 'type obj = {baz: {"foo": "qux"}, bar: 4}'},
    {code: 'type obj = {foo: {"foo": "qux"}}'},
    {code: 'type obj = {foo: "bar"}'},
    {code: 'type obj = {foo: "bar"\n}'},
    {code: 'type obj = {\nfoo: "bar"}'},
    {code: 'type obj = {\nfoo: "bar"\n}'},
    {code: 'type obj = {\nfoo: "bar",\nee: "bar",\n}'},
    {code: 'type obj = {\nfoo: "bar",\nee: "bar",\n             }'},
    {code: 'type obj = {|"foo": "bar"|}'},
    {code: 'type obj = {"foo": "bar", [key: string]: string}'},

    // Always
    {
      code: 'type obj = { baz: { "foo": "qux" }, bar: 4 }',
      options: ['always'],
    },
    {
      code: 'type obj = {}',
      options: ['always'],
    },
    {
      code: 'type obj = {\nfoo: "bar"\n}',
      options: ['always'],
    },
    {
      code: 'type obj = { baz: 4 }',
      options: ['always'],
    },
    {
      code: 'type obj = {| "foo": "bar" |}',
      options: ['always'],
    },
    {
      code: 'type obj = { "foo": "bar", [key: string]: string }',
      options: ['always'],
    },
    {
      code: 'type obj = {  baz: { "foo": "qux" }, bar: 4  }',
      options: ['always'],
    },
    {
      code: 'type obj = {\n  baz: { "foo": "qux" }, bar: 4\n}',
      options: ['always'],
    },
  ],
};
