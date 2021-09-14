export default {
  invalid: [
    {
      code: 'var foo = "bar"',
      errors: [
        {
          message: 'Missing "foo" variable type annotation.',
        },
      ],
    },
    {
      code: 'var foo : string = "bar", bar = 1',
      errors: [
        {
          message: 'Missing "bar" variable type annotation.',
        },
      ],
    },
    {
      code: 'var _foo = "bar", bar = 1',
      errors: [
        {
          message: 'Missing "bar" variable type annotation.',
        },
      ],
      options: [
        {
          excludeVariableMatch: '^_',
        },
      ],
    },
    {
      code: 'var foo = "bar", bar = 1; const oob : string = "oob"; let hey = "yah"',
      errors: [
        {
          message: 'Missing "hey" variable type annotation.',
        },
      ],
      options: [
        {
          excludeVariableTypes: {
            let: false,
            var: true,
          },
        },
      ],
    },
  ],
  misconfigured: [
    {
      errors: [
        {
          data: {
            excludeOtherStuff: true,
          },
          dataPath: '[0]',
          keyword: 'additionalProperties',
          message: 'should NOT have additional properties',
          params: {
            additionalProperty: 'excludeOtherStuff',
          },
          parentSchema: {
            additionalProperties: false,
            properties: {
              excludeVariableMatch: {
                type: 'string',
              },
              excludeVariableTypes: {
                additionalProperties: false,
                properties: {
                  const: {
                    type: 'boolean',
                  },
                  let: {
                    type: 'boolean',
                  },
                  var: {
                    type: 'boolean',
                  },
                },
                type: 'object',
              },
            },
            type: 'object',
          },
          schema: false,
          schemaPath: '#/items/0/additionalProperties',
        },
      ],
      options: [{excludeOtherStuff: true}],
    },
    {
      errors: [
        {
          data: 99,
          dataPath: '[0].excludeVariableMatch',
          keyword: 'type',
          message: 'must be string',
          params: {
            type: 'string',
          },
          parentSchema: {
            type: 'string',
          },
          schema: 'string',
          schemaPath: '#/items/0/properties/excludeVariableMatch/type',
        },
      ],
      options: [{excludeVariableMatch: 99}],
    },
    {
      errors: [
        {
          data: {
            declare: false,
          },
          dataPath: '[0].excludeVariableTypes',
          keyword: 'additionalProperties',
          message: 'should NOT have additional properties',
          params: {
            additionalProperty: 'declare',
          },
          parentSchema: {
            additionalProperties: false,
            properties: {
              const: {
                type: 'boolean',
              },
              let: {
                type: 'boolean',
              },
              var: {
                type: 'boolean',
              },
            },
            type: 'object',
          },
          schema: false,
          schemaPath: '#/items/0/properties/excludeVariableTypes/additionalProperties',
        },
      ],
      options: [{excludeVariableTypes: {declare: false}}],
    },
    {
      errors: [
        {
          data: 'yes',
          dataPath: '[0].excludeVariableTypes.let',
          keyword: 'type',
          message: 'must be boolean',
          params: {
            type: 'boolean',
          },
          parentSchema: {
            type: 'boolean',
          },
          schema: 'boolean',
          schemaPath: '#/items/0/properties/excludeVariableTypes/properties/let/type',
        },
      ],
      options: [{excludeVariableTypes: {let: 'yes'}}],
    },
  ],
  valid: [
    {
      code: 'var foo : string = "bar"',
    },
    {
      code: 'var foo : string = "bar", bar : number = 1',
    },
    {
      code: 'var _foo = "bar", bar : number = 1',
      options: [
        {
          excludeVariableMatch: '^_',
        },
      ],
    },
    {
      code: 'var foo = "bar", bar = 1',
      options: [
        {
          excludeVariableTypes: {
            var: true,
          },
        },
      ],
    },
    {
      code: 'var foo = "bar", bar = 1; const oob : string = "oob"; let hey = "yah"',
      options: [
        {
          excludeVariableTypes: {
            let: true,
            var: true,
          },
        },
      ],
    },
  ],
};
